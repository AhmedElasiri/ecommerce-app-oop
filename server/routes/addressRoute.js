const express = require("express");

const authController = require("../controller/authController");

const AddressController = require("../controller/addressController");

const router = express.Router();

router.use(authController.protect, authController.allowedTo("user"));

router
    .route("/")
    .get(AddressController.getLoggedUserAddresses)
    .post(AddressController.addAddress);
router.route("/:addressId").delete(AddressController.deleteAddress);

module.exports = router;
