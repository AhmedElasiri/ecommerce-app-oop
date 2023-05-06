const express = require("express");

const router = express.Router();

const authController = require("../controller/authController");

const ProductController = require("../controller/productController");

const ProductValidator = require("../utils/validators/productValidator");

const reviewRoute = require("./reviewRoute");

// Nested route
// POST  /products/:productId/reviews
// GET   /products/:productId/reviews
// GET   /products/:productId/reviews/:reviewId
router.use("/:productId/reviews", reviewRoute);

router
    .route("/")
    .get(ProductController.getProducts)
    .post(
        authController.protect,
        authController.allowedTo("admin", "manager"),
        ProductController.uploadProductImages,
        ProductController.resizeProductImages,
        ProductValidator.createProductValidator,
        ProductController.createProduct
    );

router
    .route("/:id")
    .get(ProductValidator.getProductValidator, ProductController.getProduct)
    .put(
        authController.protect,
        authController.allowedTo("admin", "manager"),
        ProductController.uploadProductImages,
        ProductController.resizeProductImages,
        ProductValidator.updateProductValidator,
        ProductController.updateProduct
    )
    .delete(
        authController.protect,
        authController.allowedTo("admin"),
        ProductValidator.deleteProductValidator,
        ProductController.deleteProduct
    );

module.exports = router;
