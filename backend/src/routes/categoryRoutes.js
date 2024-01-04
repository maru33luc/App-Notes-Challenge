const express = require('express');

const { getAllCategories, createCategory, updateCategoryById, deleteCategoryById, getCategoryById } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.get ('/:id', getCategoryById);
router.put('/:id', updateCategoryById);
router.delete('/:id', deleteCategoryById);

module.exports = router;