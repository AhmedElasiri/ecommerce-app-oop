const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");
const BaseController = require("./BaseController");
const { uploadMixOfFiles } = require("../middleware/uploadImageMiddleware");

class ProductController extends BaseController {
    constructor() {
        super(Product);
    }

    uploadProductImages = uploadMixOfFiles([
        { name: "imageCover", maxCount: 1 },
        { name: "image", maxCount: 5 },
    ]);

    resizeProductImages = asyncHandler(async (req, res, next) => {
        // 1- Image  processing for imageCover
        if (req.files.imageCover) {
            const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-covre.png`;

            await sharp(req.files.imageCover[0].buffer)
                .resize(2000, 1333)
                .toFormat("png")
                .png({ quality: 95 })
                .toFile(`uploads/products/${imageCoverFileName}`);
            // save image into db
            req.body.imageCover = imageCoverFileName;
        }
        // 1- Image  processing for image
        if (req.files.image) {
            req.body.image = [];
            await Promise.all(
                req.files.image.map((img, index) => {
                    const imageName = `product-${uuidv4()}-${Date.now()}-${
                        index + 1
                    }.png`;
                    sharp(img.buffer)
                        .resize(2000, 1333)
                        .toFormat("png")
                        .png({ quality: 90 })
                        .toFile(`uploads/products/${imageName}`);

                    // save image into db
                    req.body.image.push(imageName);
                })
            );
        }
        next();
    });

    /**
     *  @description Get list of products
     *  @route       GET /api/v1/products
     *  @access      Public
     */
    getProducts = asyncHandler(async (req, res, next) => {
        await super.getAll(req, res, next);
    });

    /**
     *  @description Get product
     *  @route       GET /api/v1/products/:id
     *  @access      Public
     */
    getProduct = asyncHandler(async (req, res, next) => {
        await super.getOne(req, res, next);
    });

    /**
     *  @description Create product
     *  @route       POST /api/v1/products
     *  @access      Private
     */
    createProduct = asyncHandler(async (req, res, next) => {
        await super.createOne(req, res, next);
    });

    /**
     *  @description Update product
     *  @route       PUT /api/products/:id
     *  @access      Private
     */
    updateProduct = asyncHandler(async (req, res, next) => {
        await super.updateOne(req, res, next);
    });

    /**
     *  @description Delete product
     *  @route       DELETE /api/products/:id
     *  @access      Private
     */
    deleteProduct = asyncHandler(async (req, res, next) => {
        await super.deleteOne(req, res, next);
    });
}

module.exports = new ProductController(Product);
