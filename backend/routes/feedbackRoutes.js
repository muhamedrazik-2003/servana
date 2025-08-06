const express = require('express');
const router = express.Router();

const feedBackController = require("../controllers/feedbackController");

router.post('/new',feedBackController.addNewFeedback);
router.get('/all', feedBackController.getAllFeedbacks);

module.exports = router;