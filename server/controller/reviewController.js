const BaseController = require("./BaseController");
const Review = require("../models/reviewModel");

class ReviewController extends BaseController {
    constructor() {
        super(Review);
    }

    createFilterObject(req, res, next) {
        let filterObject = {};
        if (req.params.categoryId)
            filterObject = { mainCategory: req.params.categoryId };
        req.filterObject = filterObject;
        next();
    }

    setProductIdAndUserIdToBody(req, res, next) {
        if (!req.body.product) req.body.product = req.params.productId;
        if (!req.body.user) req.body.user = req.user._id;
        next();
    }

    /**
     *  @description Get list of reviews
     *  @route       GET /api/v1/reviews
     *  @access      Public
     */
    async getReviews(req, res, next) {
        await super.getAll(req, res, next);
    }

    /**
     *  @description Get review
     *  @route       GET /api/v1/reviews/:id
     *  @access      Public
     */
    async getReview(req, res, next) {
        await super.getOne(req, res, next);
    }

    /**
     *  @description Create review
     *  @route       POST /api/v1/reviews
     *  @access      Private/Protect/User
     */
    async createReview(req, res, next) {
        await super.createOne(req, res, next);
    }

    /**
     *  @description Update review
     *  @route       POST /api/v1/reviews/:id
     *  @access      Private/Protect/User
     */
    async updateReview(req, res, next) {
        await super.updateOne(req, res, next);
    }

    /**
     *  @description Delete review
     *  @route       DELETE /api/reviews/:id
     *  @access      Private/Protect/User-Admin-Manager
     */
    async deleteReview(req, res, next) {
        await super.deleteOne(req, res, next);
    }
}

module.exports = new ReviewController();
