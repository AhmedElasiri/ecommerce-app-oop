const express = require("express");

const router = express.Router();

const BrandController = require("../controller/brandController");

const authController = require("../controller/authController");

const BrandValidator = require("../utils/validators/brandValidator");

router
    .route("/")
    .get(BrandController.getBrands)
    .post(
        authController.protect,
        authController.allowedTo("admin", "manager"),
        BrandController.uploadBrandImage,
        BrandController.resizeImage,
        BrandValidator.createBrandValidator,
        BrandController.createBrand
    );
router
    .route("/:id")
    .get(BrandValidator.getBrandValidator, BrandController.getBrand)
    .put(
        authController.protect,
        authController.allowedTo("admin", "manager"),
        BrandController.uploadBrandImage,
        BrandController.resizeImage,
        BrandValidator.updateBrandValidator,
        BrandController.updateBrand
    )
    .delete(
        authController.protect,
        authController.allowedTo("admin"),
        BrandValidator.deleteBrandValidator,
        BrandController.deleteBrand
    );

module.exports = router;
