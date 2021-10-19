const { Category } = require('../models/index');

const createCategory = async (name) => {
    const createdCategory = await Category.create({ name })
        .then(async () => {
            const category = await Category.findOne({ where: { name } });
            return category;
        });
    return createdCategory;
};

const findAllCategories = async () => {
    const AllCategories = await Category.findAll();
    return AllCategories;
};

const findCategoryById = async (id) => {
    const response = await Category.findByPk(id);
    if (!response) return null;
    return response;
};

module.exports = {
    createCategory,
    findAllCategories,
    findCategoryById,
};