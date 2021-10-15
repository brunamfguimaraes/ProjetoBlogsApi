const { Category } = require('../models');
require('dotenv');

const createCategory = async (req, res) => {
    const category = await Category.create(req.body);
    console.log(category);
    if (!req.body) {
        return res.status(400).json({ message: '"name" is required' });
    }
    return res.status(201).json(category);
};

module.exports = { createCategory };