const { Category } = require('../models');
require('dotenv');

const createCategories = async (req, res) => {
    const category = await Category.create(req.body);

    if (!category) {
     return res.status(400).json({ message: '"name" is requisred' });
    }
 
     return res.status(201).json(category);
 };

 module.exports = {
    createCategories,
 };