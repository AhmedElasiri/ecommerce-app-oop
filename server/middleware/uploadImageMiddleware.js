const multer = require("multer");
const ApiError = require("../utils/apiError");

const multerOptions = (fieldName) => {
    // 1- DiskStorage engine
    // const multerStorage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, "./uploads/categories");
    //     },
    //     filename: function (req, file, cb) {
    //         // category-${id}-Date.now().png
    //         const ext = file.mimetype.split("/")[1];
    //         const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
    //         cb(null, filename);
    //     },
    // });.resizeImage

    // 2- Memory storage engine
    const multerSorage = multer.memoryStorage();

    const multerFileFilter = (req, file, cd) => {
        if (file.mimetype.startsWith("image")) {
            cd(null, true);
        } else {
            cd(new ApiError(`Only Images allowed`, 400), false);
        }
    };
    const upload = multer({
        storage: multerSorage,
        fileFilter: multerFileFilter,
    });
    return upload;
};

exports.uploadSingleFile = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfFiles = (arrayOfFields) =>
    multerOptions().fields(arrayOfFields);
