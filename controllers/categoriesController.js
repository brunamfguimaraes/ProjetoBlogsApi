const express = require('express');
const statusCode = require('http-status-codes');
/* const jwt = require('jsonwebtoken'); */
const { Categorie } = require('../models');

const router = express.Router();

router.post('/categories', async (req, res) => {
    const { name } = req.body;
    const categories = await Categorie.create({ name });
    return res.status(statusCode.CREATED).json(categories);
});

module.exports = router;