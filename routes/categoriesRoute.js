const express = require('express');

const {
  createCategory, getAllCategories,
} = require('../controllers/categoriesController');

const { validateJWT } = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', validateJWT, createCategory);
router.get('/', validateJWT, getAllCategories);

module.exports = router;
