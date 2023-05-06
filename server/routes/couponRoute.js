const express = require("express");

const router = express.Router();

const CouponController = require("../controller/couponController");

const authController = require("../controller/authController");

router.use(
    authController.protect,
    authController.allowedTo("admin", "manager")
);

router
    .route("/")
    .get(CouponController.getCoupons)
    .post(CouponController.createCoupon);
router
    .route("/:id")
    .get(CouponController.getCoupon)
    .put(CouponController.updateCoupon)
    .delete(CouponController.deleteCoupon);

module.exports = router;
