const { Category } = require('../models');
// const { validName, validEmail, validPassword } = require('../validations/validations');

const getCategories = async () => {
    const users = await Category.findAll();
    return users;
};

const createCategory = async (category) => {
    console.log('create category service');
    const response = await Category.create(category);
    return response;
};
module.exports = { createCategory, getCategories };