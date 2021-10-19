const { Category } = require('../models');
require('dotenv');

const createCategory = async (req, res) => {
    const category = await Category.create(req.body);
    if (!req.body) {
        return res.status(400).json({ message: '"name" is required' });
    }
    return res.status(201).json(category);
};

const getAllCategories = async (_req, res) => {
    console.log('servicelogin');
    const check = await Category.findAll();
    console.log('check', check[1].dataValues, 'categoryService');
    return res.status(200).json(check);
};

module.exports = { createCategory, getAllCategories };