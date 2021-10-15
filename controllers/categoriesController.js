const express = require('express');
const statusCode = require('http-status-codes');
/* const jwt = require('jsonwebtoken'); */
const { Categorie } = require('../models');
const { createCategory } = require('../services/categoriesService');

const router = express.Router();

router.post('/categories', async (req, res) => {
    const { name } = req.body;
    const categories = await createCategory({ name });
    if (categories.message) {
        return res.status(statusCode.BAD_REQUEST).json({ message: categories.message });
    }
    return res.status(statusCode.CREATED).json(categories);
});

router.get('/categories', async (req, res) => {
    const category = await Categorie.findAll();
    return res.status(statusCode.OK).json(category);
});

module.exports = router;