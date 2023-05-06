const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const BaseController = require("./BaseController");
const ApiError = require("../utils/apiError");
const User = require("../models/userModel");
const createToken = require("../utils/createToken");

class UserController extends BaseController {
    constructor() {
        super(User);
    }

    // getUsers = this.getAll();
    getUsers = asyncHandler(async (req, res, next) => {
        await super.getAll(req, res, next);
    });

    // getUser = this.getOne();
    getUser = asyncHandler(async (req, res, next) => {
        await super.getOne(req, res, next);
    });

    // createUser = this.createOne();
    createUser = asyncHandler(async (req, res, next) => {
        await super.createOne(req, res, next);
    });

    updateUser = asyncHandler(async (req, res, next) => {
        const user = await this.Model.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                slug: req.body.slug,
                phone: req.body.phone,
                email: req.body.email,
                profileImg: req.body.profileImg,
                role: req.body.role,
            },
            {
                new: true,
            }
        );

        if (!user) {
            return next(
                new ApiError(`No user for this id ${req.params.id}`, 404)
            );
        }
        res.status(200).json({ data: user });
    });

    updateUserPassword = asyncHandler(async (req, res, next) => {
        const user = await this.Model.findByIdAndUpdate(
            req.params.id,
            {
                password: await bcrypt.hash(req.body.password, 5),
                passwordChangedAt: Date.now(),
            },
            { new: true }
        );

        if (!user) {
            return next(
                new ApiError(`No user for this id ${req.params.id}`, 404)
            );
        }
        res.status(200).json({ data: user });
    });

    // deleteUser = this.deleteOne();
    deleteUser = asyncHandler(async (req, res, next) => {
        await super.deleteOne(req, res, next);
    });

    getLoggedUserData = asyncHandler(async (req, res, next) => {
        res.status(200).json({ data: req.user });
    });

    updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
        const user = await this.Model.findByIdAndUpdate(
            req.user._id,
            {
                password: await bcrypt.hash(req.body.password, 5),
                passwordChangedAt: Date.now(),
            },
            { new: true }
        );
        const token = createToken(user._id);
        res.status(200).json({ data: user, token });
    });

    updateLoggedUserData = asyncHandler(async (req, res, next) => {
        const user = await this.Model.findByIdAndUpdate(
            req.user._id,
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            },
            { new: true }
        );

        res.status(200).json({ data: user });
    });

    deleteLoggedUser = asyncHandler(async (req, res, next) => {
        await this.Model.findOneAndUpdate(req.user._id, { active: false });

        res.status(204).json({ status: "Success" });
    });
}

module.exports = new UserController();
