const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const servicesStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "servana/services",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
  },
});
const profileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "servana/profiles",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const servicesUpload = multer({ storage: servicesStorage });
const profileUpload = multer({ storage: profileStorage });
module.exports = { servicesUpload, profileUpload };
