const asyncHandler = require("express-async-handler");

const SubCategory = require("../models/subCategoryModel");
const BaseController = require("./BaseController");

class SubCategoryController extends BaseController {
    constructor() {
        super(SubCategory);
    }

    // Nested route
    // GET    /api/v1/categories/:categoryId/subcategories
    createFilterObject = (req, res, next) => {
        let filterObject = {};
        if (req.params.categoryId)
            filterObject = { mainCategory: req.params.categoryId };
        req.filterObject = filterObject;
        next();
    };

    /**
     *  @description    Get list of subcategories
     *  @route          GET/api/v1/subCategories
     *  @access         Public
     */
    getSubCategories = asyncHandler(async (req, res, next) => {
        await super.getAll(req, res, next);
    });

    /**
     *  @description    Get SubCategory
     *  @route          GET/api/v1/subCategories/:id
     *  @access         Public
     */
    getSubCategory = asyncHandler(async (req, res, next) => {
        await super.getOne(req, res, next);
    });

    setCategoryToBody = (req, res, next) => {
        // Nested route
        if (!req.body.mainCategory)
            req.body.mainCategory = req.params.categoryId;
        next();
    };

    /**
     *  @description Create SubCategory
     *  @route       POST /api/v1/subCategories
     *  @access      Private/Admin-Manager
     */
    createSubCategory = asyncHandler(async (req, res, next) => {
        await super.createOne(req, res, next);
    });

    /**
     *  @description Update SubCategory
     *  @route       POST /api/v1/subCategories/:id
     *  @access      Private/Admin-Manager
     */
    updateSubCategory = asyncHandler(async (req, res, next) => {
        await super.updateOne(req, res, next);
    });

    /**
     *  @description Delete SubCategory
     *  @route       POST /api/v1/subCategories/:id
     *  @access      Private/Admin
     */
    deleteSubCategory = asyncHandler(async (req, res, next) => {
        await super.deleteOne(req, res, next);
    });
}

module.exports = new SubCategoryController();
