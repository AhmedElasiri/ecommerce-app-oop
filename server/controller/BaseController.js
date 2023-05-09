const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");

class BaseController {
    constructor(Model) {
        this.Model = Model;
    }

    async deleteOne(req, res, next) {
        const { id } = req.params;
        const document = await this.Model.findByIdAndDelete(id);

        if (!document) {
            return next(new ApiError(`No document for this id ${id}`, 404));
        }

        // Trigger "remove" event when update document to get review details
        // Model.remove();
        res.status(204).send();
    }

    async updateOne(req, res, next) {
        const document = await this.Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        if (!document) {
            return next(
                new ApiError(`No document for this id ${req.params.id}`, 404)
            );
        }
        // Trigger "save" event when update document to get reviews
        res.status(200).json({ data: document });
    }

    async createOne(req, res) {
        const document = await this.Model.create(req.body);
        res.status(201).json({ data: document });
    }

    async getOne(req, res, next) {
        const { id } = req.params;
        let query = this.Model.findById(id);

        const document = await query;
        if (!document) {
            return next(new ApiError(`No document for this id ${id}`, 404));
        }
        res.status(200).json({ data: document });
    }

    async getAll(req, res, modelName = "") {
        // Build query
        const countDocments = await this.Model.countDocuments();
        const apiFeatures = new ApiFeatures(
            this.Model.find(req.filterObject),
            req.query
        )
            .paginate(countDocments)
            .sort()
            .filter()
            .limitFields()
            .search(modelName);

        // Execute query
        const { mongooseQuery, paginationResult } = apiFeatures;
        const document = await mongooseQuery;

        res.status(200).json({
            results: document.length,
            paginationResult,
            data: document,
        });
    }
}

module.exports = BaseController;
