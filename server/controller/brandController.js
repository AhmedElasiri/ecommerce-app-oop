const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const BaseController = require("./BaseController");
const { uploadSingleFile } = require("../middleware/uploadImageMiddleware");
const Brand = require("../models/brandModel");

class BrandController extends BaseController {
    constructor() {
        super(Brand);
    }

    // Upload single image
    uploadBrandImage = uploadSingleFile("image");

    // Image processing
    resizeImage = asyncHandler(async (req, res, next) => {
        if (req.file) {
            const filename = `brand-${uuidv4()}-${Date.now()}.png`;
            await sharp(req.file.buffer)
                .resize(600, 600)
                .toFormat("png")
                .png({ quality: 90 })
                .toFile(`uploads/brands/${filename}`);
            // Save image into db
            req.body.image = filename;
        }
        next();
    });
    // Get list of brands
    getBrands = asyncHandler(async (req, res, next) => {
        await super.getAll(req, res, next);
    });

    // Get brand
    getBrand = asyncHandler(async (req, res, next) => {
        await super.getOne(req, res, next);
    });

    // Create brand
    createBrand = asyncHandler(async (req, res, next) => {
        await super.createOne(req, res, next);
    });

    // Update brand
    updateBrand = asyncHandler(async (req, res, next) => {
        await super.updateOne(req, res, next);
    });

    // Delete brand
    deleteBrand = asyncHandler(async (req, res, next) => {
        await super.deleteOne(req, res, next);
    });
}

module.exports = new BrandController();
