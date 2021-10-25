const { Category } = require('../models');

const createNewCategory = async (name) => {
    console.log(name);
    const addCategory = await Category.create({ name });

    return addCategory;
};

const getAllCategories = async () => {
    const getCategories = await Category.findAll();

    return getCategories;
};

module.exports = {
    createNewCategory,
    getAllCategories,
};
