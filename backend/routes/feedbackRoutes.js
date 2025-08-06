const express = require('express');
const router = express.Router();
const jwt = require('../middlewares/jwtMiddleware')

const feedBackController = require("../controllers/feedbackController");

router.post('/new',feedBackController.addNewFeedback);
router.get('/all',jwt, feedBackController.getAllFeedbacks);

module.exports = router;