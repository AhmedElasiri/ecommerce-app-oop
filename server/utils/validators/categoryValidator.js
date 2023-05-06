const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

class CategoryValidator {
    getCategoryValidator = [
        check("id").isMongoId().withMessage("Invalid category id format"),
        validatorMiddleware,
    ];

    createCategoryValidator = [
        check("name")
            .notEmpty()
            .withMessage("Category name is required")
            .isLength({ min: 3 })
            .withMessage("Category name is too short")
            .isLength({ max: 32 })
            .withMessage("Category name is too long"),
        validatorMiddleware,
    ];

    getCategoryValidator = [
        check("id").isMongoId().withMessage("Invalid category id format"),
        validatorMiddleware,
    ];

    updateCategoryValidator = [
        check("id").isMongoId().withMessage("Invalid category id format"),
        body("name")
            .optional()
            .custom((val, { req }) => {
                req.body.slug = slugify(val);
                return true;
            }),
        validatorMiddleware,
    ];

    deleteCategoryValidator = [
        check("id").isMongoId().withMessage("Invalid category id format"),
        validatorMiddleware,
    ];
}

module.exports = new CategoryValidator();
