const express = require("express");

const router = express.Router();

const CartController = require("../controller/cartController");

const authController = require("../controller/authController");

router.use(authController.protect, authController.allowedTo("user"));

router
    .route("/")
    .get(CartController.getLoggedUserCart)
    .post(CartController.addProductToCart)
    .delete(CartController.clearCart);

router.put("/coupon", CartController.applyCoupon);

router
    .route("/:itemId")
    .put(CartController.updateCartItemQuantity)
    .delete(CartController.deleteCartItem);

module.exports = router;
