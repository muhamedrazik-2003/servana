const express = require("express");
const userController = require("../controllers/userController");
const { profileUpload } = require("../middlewares/multer");
const jwt = require("../middlewares/jwtMiddleware");
const router = express.Router();

router.post("/login", userController.userLogin);
router.post("/register", userController.userRegister);
router.put('/update/:userId',jwt, profileUpload.single("profilePicture"),userController.updateUser);
router.patch('/update/status/:userId',jwt,userController.changeUserAccountStatus);
router.get('/seekers',jwt, userController.getAllseekers);
router.get('/providers',jwt, userController.getAllProviders);
router.delete('/delete/:userId',jwt, userController.deleteUser);

module.exports = router;
