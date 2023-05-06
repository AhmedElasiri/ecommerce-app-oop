const express = require("express");

const router = express.Router({ mergeParams: true });

const ReviewValidator = require("../utils/validators/reviewValidator");

const ReviewController = require("../controller/reviewController");

const authController = require("../controller/authController");

router
    .route("/")
    .get(ReviewController.createFilterObject, ReviewController.getReviews)
    .post(
        authController.protect,
        authController.allowedTo("user"),
        ReviewController.setProductIdAndUserIdToBody,
        ReviewValidator.createReviewValidator,
        ReviewController.createReview
    );
router
    .route("/:id")
    .get(ReviewValidator.getReviewValidator, ReviewController.getReview)
    .put(
        authController.protect,
        authController.allowedTo("user"),
        ReviewValidator.updateReviewValidator,
        ReviewController.updateReview
    )
    .delete(
        authController.protect,
        authController.allowedTo("user", "admin", "manager"),
        ReviewValidator.deleteReviewValidator,
        ReviewController.deleteReview
    );

module.exports = router;
