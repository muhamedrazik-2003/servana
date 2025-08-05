const express = require('express');
const jwt = require('../middlewares/jwtMiddleware')
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', jwt, categoryController.getCategories);
router.put('/update/:categoryId',jwt, categoryController.updateCategory);
router.delete('/delete/:categoryId',jwt, categoryController.deletCategory);
router.post('/new',jwt,categoryController.AddCategory);

module.exports = router;