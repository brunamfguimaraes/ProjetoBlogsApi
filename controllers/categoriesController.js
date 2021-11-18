const categoriesServices = require('../services/categoriesServices');
require('dotenv');

const verifyCategoryName = (req, res, next) => {
    const { name } = req.body;
    if (!name) { return res.status(400).json({ message: '"name" is required' }); }
    next();
};

const createCategory = async (req, res) => {
    const result = await categoriesServices.createCategory(req.body);
    return res.status(201).json(result);
};

module.exports = {
    verifyCategoryName,
    createCategory,
};
