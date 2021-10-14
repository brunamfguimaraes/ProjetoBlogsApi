const express = require('express');

const { createCategory } = require('../controllers/categoriesController');

const { validateJWT } = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', validateJWT, createCategory);

module.exports = router;
