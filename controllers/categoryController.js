const express = require('express');

const router = express.Router();

const validate = require('../validations/validateCategory');
const categoryService = require('../services/categoryService');
const auth = require('../validations/validateToken');

router.post('/categories',
validate.validateName,
auth.verifyToken,
async (req, res) => {
    const { name } = req.body;
    const addCategory = await categoryService.createNewCategory(name);

    return res.status(201).json(addCategory);
});

module.exports = router;
