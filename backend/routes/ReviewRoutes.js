const express = require('express');
const router = express.Router();
const jwt = require("../middlewares/jwtMiddleware");
const reviewController = require("../controllers/reviewController");

router.post("/new", jwt, reviewController.addNewReview);
router.get("/all", jwt, reviewController.getAllReviews);
router.get("/all/provider", jwt, reviewController.getAllReviews);
router.get("/:serviceId", jwt, reviewController.getServiceReviews);
router.patch("/update/status/:reviewId",reviewController.changeReviewStatus);


module.exports = router;