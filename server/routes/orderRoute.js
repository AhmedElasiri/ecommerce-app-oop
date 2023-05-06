const express = require("express");

const router = express.Router();

const authController = require("../controller/authController");
const OrderController = require("../controller/orderController");

router.use(authController.protect);

router.post(
    "/checkout-session/:cartId",
    authController.allowedTo("user"),
    OrderController.checkoutSession
);

router
    .route("/:cartId")
    .post(authController.allowedTo("user"), OrderController.createCachOrder);

router.get(
    "/",
    authController.allowedTo("user", "admin", "manager"),
    OrderController.filterOrderForLoggedUser,
    OrderController.getOrders
);
router.get(
    "/:id",
    authController.allowedTo("user", "admin", "manager"),
    OrderController.getOrder
);
router.put(
    "/:id/pay",
    authController.allowedTo("admin", "manager"),
    OrderController.updateOrderToPaid
);
router.put(
    "/:id/deliver",
    authController.allowedTo("admin", "manager"),
    OrderController.updateOrderToDelivered
);

module.exports = router;
