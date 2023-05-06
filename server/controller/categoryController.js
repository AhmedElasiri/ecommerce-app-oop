const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const BaseController = require("./BaseController");
const Category = require("../models/categoryModel");
const { uploadSingleFile } = require("../middleware/uploadImageMiddleware");

class CategoryController extends BaseController {
    constructor() {
        super(Category);
    }

    // Upload single image
    uploadCategoryImage = uploadSingleFile("image");

    // Image processing
    resizeImage = asyncHandler(async (req, res, next) => {
        if (req.file) {
            const filename = `category-${uuidv4()}-${Date.now()}.png`;
            await sharp(req.file.buffer)
                .resize(600, 600)
                .toFormat("png")
                .png({ quality: 90 })
                .toFile(`./uploads/categories/${filename}`);

            // Save image into db
            req.body.image = filename;
        }
        next();
    });

    // Get list of categories
    getCategories = asyncHandler(async (req, res, next) => {
        await super.getAll(req, res, next);
    });

    // Get category
    getCategory = asyncHandler(async (req, res, next) => {
        await super.getOne(req, res, next);
    });

    // Create category
    createCategory = asyncHandler(async (req, res, next) => {
        await super.createOne(req, res, next);
    });

    // Update category
    updateCategory = asyncHandler(async (req, res, next) => {
        await super.updateOne(req, res, next);
    });

    // Delete category
    deleteCategory = asyncHandler(async (req, res, next) => {
        await super.deleteOne(req, res, next);
    });
}

module.exports = new CategoryController();
