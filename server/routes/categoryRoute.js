const express = require("express");
const subCategoryRoute = require("./subCategoryRoute");

const authController = require("../controller/authController");

const categoryValidator = require("../utils/validators/categoryValidator");

const categoryController = require("../controller/categoryController");

const router = express.Router();

// Nested route
router.use("/:categoryId/subcategories", subCategoryRoute);

router
    .route("/")
    .get(categoryController.getCategories)
    .post(
        authController.protect,
        authController.allowedTo("admin", "manager"),
        categoryController.uploadCategoryImage,
        categoryController.resizeImage,
        categoryValidator.createCategoryValidator,
        categoryController.createCategory
    );
router
    .route("/:id")
    .get(categoryValidator.getCategoryValidator, categoryController.getCategory)
    .put(
        authController.protect,
        authController.allowedTo("admin", "manager"),
        categoryController.uploadCategoryImage,
        categoryController.resizeImage,
        categoryValidator.updateCategoryValidator,
        categoryController.updateCategory
    )
    .delete(
        authController.protect,
        authController.allowedTo("admin"),
        categoryValidator.deleteCategoryValidator,
        categoryController.deleteCategory
    );

module.exports = router;
