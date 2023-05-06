const User = require("../models/userModel");

class AddressController {
    /**
     *  @description    Add address to user address list
     *  @route          POST /api/v1/addresses
     *  @access         Protected/User
     */
    async addAddress(req, res, next) {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $addToSet: { addresses: req.body },
            },
            { new: true }
        );

        res.status(200).json({
            status: "success",
            message: "Address added successfully",
            data: user.addresses,
        });
    }

    /**
     *  @description    Remove address from user address list
     *  @route          DELETE /api/v1/addresses/:addressId
     *  @access         Protected/User
     */
    async deleteAddress(req, res, next) {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $pull: { addresses: { _id: req.params.addressId } },
            },
            { new: true }
        );

        res.status(200).json({
            status: "success",
            message: "Address removed successfully",
            data: user.addresses,
        });
    }

    /**
     *  @description    Get address from user addresses list
     *  @route          GET /api/v1/addresses
     *  @access         Protected/User
     */
    async getLoggedUserAddresses(req, res, next) {
        const user = await User.findById(req.user._id).populate("addresses");

        res.status(200).json({
            status: "success",
            result: user.wishlist.addresses,
            data: user.addresses,
        });
    }
}

module.exports = new AddressController();
