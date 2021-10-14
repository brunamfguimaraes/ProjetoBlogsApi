const { Category } = require('../models');
require('dotenv');

const createCategories = async (req, res) => {
    const category = await Category.create(req.body);

    if (!category) {
     return res.status(400).json({ message: '"name" is requisred' });
    }
 
     return res.status(201).json(category);
 };

 const getAllCategories = async (req, res) => {
    const category = await Category.findAll();
 
     return res.status(200).json(category);
 };

 module.exports = {
    createCategories,
    getAllCategories,
 };