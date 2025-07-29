const express = require('express');
const router = express.Router();
const jwt = require("../middlewares/jwtMiddleware");
const reviewController = require("../controllers/reviewController");

router.post("/new", jwt, reviewController.addNewReview);

module.exports = router;