const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const servicesStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder:"servana/services",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    }
})
const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder:"servana/profiles",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    }
})

const servicesUpload = multer({servicesStorage});
const profileUpload = multer({profileStorage});
module.exports = {servicesUpload, profileUpload};