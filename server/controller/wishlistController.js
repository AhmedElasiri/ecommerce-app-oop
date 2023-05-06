const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

class WishlistController {
    /**
     *  @description    Add product to wishlist
     *  @route          POST /api/v1/wishlist
     *  @access         Protected/User
     */
    async addProductToWishlist(req, res, next) {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $addToSet: { wishlist: req.body.productId },
            },
            { new: true }
        );
        res.status(200).json({
            status: "success",
            message: "Product added successfully to your wishlist",
            data: user.wishlist,
        });
    }

    /**
     *  @description    Remove product to wishlist
     *  @route          DELETE /api/v1/wishlist
     *  @access         Protected/User
     */
    async deleteProductFromWishlist(req, res, next) {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $pull: { wishlist: req.params.productId },
            },
            { new: true }
        );
        res.status(200).json({
            status: "success",
            message: "Product removed successfully from your wishlist",
            data: user.wishlist,
        });
    }

    /**
     *  @description    Get product from wishlist
     *  @route          GET /api/v1/wishlist
     *  @access         Protected/User
     */
    async getLoggedUserWishlist(req, res, next) {
        const user = await User.findById(req.user._id).populate("wishlist");

        res.status(200).json({
            status: "success",
            result: user.wishlist.length,
            data: user.wishlist,
        });
    }
}

module.exports = new WishlistController();
