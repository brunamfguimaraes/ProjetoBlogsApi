const { Category } = require('../models/index');

const createCategory = async (name) => {
    const createdCategory = await Category.create({ name })
        .then(async () => {
            const category = await Category.findOne({ where: { name } });
            return category;
        });
    return createdCategory;
};

module.exports = {
    createCategory,
};