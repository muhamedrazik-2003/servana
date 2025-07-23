const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/get', categoryController.getCategories);
router.post('/update', categoryController.updateCategories);

module.exports = router;