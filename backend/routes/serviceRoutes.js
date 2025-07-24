const express = require("express");
const router = express.Router();
const jwt = require("../middlewares/jwtMiddleware");
const { servicesUpload } = require("../middlewares/multer");
const serviceController = require("../controllers/serviceController");

router.post("/add", jwt, servicesUpload.array("images", 6), serviceController.addService);
router.put("/update/:id", jwt, servicesUpload.array("images", 6), serviceController.updateService);
router.delete("/delete/:id", jwt, serviceController.deleteService);
router.get("/", jwt, serviceController.getUserServices);


module.exports = router;
