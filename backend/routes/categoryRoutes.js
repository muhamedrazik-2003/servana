const express = require('express');
const jwt = require('../middlewares/jwtMiddleware')
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', jwt, categoryController.getCategories);
router.post('/update/:categoryId',jwt, categoryController.updateCategory);

module.exports = router;