const express = require("express");

const router = express.Router();

const authController = require("../controller/authController");

const AuthValidator = require("../utils/validators/authValidator");

router.post("/signup", AuthValidator.signupValidator, authController.signup);
router.post("/login", AuthValidator.loginValidator, authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/verifyResetCode", authController.verifyPassResetCode);
router.put("/resetPassword", authController.resetPassword);

module.exports = router;
