const express = require("express");

const authController = require("../controller/authController");

const SubCategoryController = require("../controller/subCategoryController");

const SubCategoryValidator = require("../utils/validators/subCategoryValidator");

const router = express.Router({ mergeParams: true });

router
    .route("/")
    .get(
        SubCategoryController.createFilterObject,
        SubCategoryController.getSubCategories
    )
    .post(
        authController.protect,
        authController.allowedTo("admin", "manager"),
        SubCategoryController.setCategoryToBody,
        SubCategoryValidator.createSubCategoryValidator,
        SubCategoryController.createSubCategory
    );

router
    .route("/:id")
    .get(
        SubCategoryValidator.getSubCategoryValidator,
        SubCategoryController.getSubCategory
    )
    .put(
        authController.protect,
        authController.allowedTo("admin", "manager"),
        SubCategoryValidator.updateSubCategoryValidator,
        SubCategoryController.updateSubCategory
    )
    .delete(
        authController.protect,
        authController.allowedTo("admin"),
        SubCategoryValidator.deleteSubCategoryValidator,
        SubCategoryController.deleteSubCategory
    );
module.exports = router;
