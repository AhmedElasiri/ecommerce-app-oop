const express = require("express");

const authController = require("../controller/authController");

const WishlistController = require("../controller/wishlistController");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router
    .route("/")
    .get(WishlistController.getLoggedUserWishlist)
    .post(WishlistController.addProductToWishlist);
router
    .route("/:productId")
    .delete(WishlistController.deleteProductFromWishlist);

module.exports = router;
