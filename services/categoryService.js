const { Category } = require('../models');

const createNewCategory = async (name) => {
    console.log(name);
    const addCategory = await Category.create({ name });

    return addCategory;
};

module.exports = {
    createNewCategory,
};
