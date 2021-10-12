const express = require('express');

const router = express.Router();

const usersController = require('../controller/categoriesController');

router.post('/', usersController.createCategorie);

// router.get('/:id', usersController.getUserById);
router.get('/', usersController.getAllCategories);

module.exports = router;