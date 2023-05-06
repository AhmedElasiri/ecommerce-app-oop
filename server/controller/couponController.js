const BaseController = require("./BaseController");
const Coupon = require("../models/couponModel");

class CouponController extends BaseController {
    constructor() {
        super(Coupon);
    }

    /**
     *  @description Get list of Coupons
     *  @route       GET /api/v1/coupons
     *  @access      Private/Admin-Manager
     */
    async getCoupons(req, res, next) {
        await super.getAll(req, res, next);
    }

    /**
     *  @description Get Coupon
     *  @route       GET /api/v1/coupons/:id
     *  @access      Public
     */
    async getCoupon(req, res, next) {
        await super.getOne(req, res, next);
    }

    /**
     *  @description Create coupon
     *  @route       POST /api/v1/Coupon
     *  @access      Private/Admin-Manager
     */
    async createCoupon(req, res, next) {
        await super.createOne(req, res, next);
    }

    /**
     *  @description Update Coupon
     *  @route       POST /api/v1/Coupon/:id
     *  @access      Private/Admin-Manager
     */
    async updateCoupon(req, res, next) {
        await super.updateOne(req, res, next);
    }

    /**
     *  @description Delete Coupon
     *  @route       DELETE /api/brnad/:id
     *  @access      Private/Admin-Manager
     */
    async deleteCoupon(req, res, next) {
        await super.deleteOne(req, res, next);
    }
}

module.exports = new CouponController();
