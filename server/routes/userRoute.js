const express = require("express");

const router = express.Router();

const authController = require("../controller/authController");

const userController = require("../controller/userController");

const UserValidator = require("../utils/validators/userValidator");

router.use(authController.protect);

router.get("/getMe", userController.getLoggedUserData);
router.put(
    "/updateMe",
    UserValidator.updateLoggedUserValidator,
    userController.updateLoggedUserData
);
router.delete("/deleteMe", userController.deleteLoggedUser);
router.put(
    "/updateMyPassword",
    UserValidator.updateLoggedUserValidatorPass,
    userController.updateLoggedUserPassword
);

// Admin
router.use(authController.allowedTo("admin"));

router.put(
    "/ChangePassword/:id",
    UserValidator.updateUserPasswordValidator,
    userController.updateUserPassword
);
router
    .route("/")
    .get(userController.getUsers)
    .post(UserValidator.createUserValidator, userController.createUser);
router
    .route("/:id")
    .get(UserValidator.getUserValidator, userController.getUser)
    .put(UserValidator.updateUserValidator, userController.updateUser)
    .delete(UserValidator.deleteUserValidator, userController.deleteUser);

module.exports = router;
