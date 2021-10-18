const HTTP_REST = require('../HTTPErrosAndMessages');

const { statusCode } = HTTP_REST;

const categoryService = require('../service/categoryService');

const addCategory = async (req, res) => {
    const name = req.body;
    const newCategory = await categoryService.addCategory(name);
    return res.status(statusCode.CREATED).json(newCategory.dataValues);
};

const getAllCategory = async (req, res) => {
    const allCategories = await categoryService.getAllCategory();
    const allCategoriesMapped = allCategories.map((category) => category.dataValues);
   return res.status(statusCode.OK).json(allCategoriesMapped);
};

module.exports = {
    addCategory,
    getAllCategory,
};