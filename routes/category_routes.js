const router = require('express').Router();
const categoryController = require('../controller/category_controller');

router.post('/', categoryController.createCategory);
router.get('/', categoryController.fetchAllCategories);
router.get('/:id', categoryController.fetchCategoryById);

module.exports = router;