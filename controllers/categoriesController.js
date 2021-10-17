const HTTP_REST = require('../HTTPErrosAndMessages');

const { statusCode, message } = HTTP_REST;

const categoryService = require('../service/categoryService');

const addCategory = async (req, res) => {
    const name = req.body;
    const newCategory = await categoryService.addCategory(name);
    return res.status(statusCode.CREATED).json(newCategory.dataValues);
};

module.exports = {
    addCategory,
};