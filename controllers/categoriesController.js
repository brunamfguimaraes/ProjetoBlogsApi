const express = require('express');
const statusCode = require('http-status-codes');
/* const jwt = require('jsonwebtoken'); */
/* const { Categorie } = require('../models'); */
const { createCategory } = require('../services/categoriesService');

const router = express.Router();

router.post('/categories', async (req, res) => {
    const { name } = req.body;
    const categories = await createCategory({ name });
    return res.status(statusCode.CREATED).json(categories);
});

module.exports = router;