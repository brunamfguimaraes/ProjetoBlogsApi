const { Categorie } = require('../models');

const validateField = (name) => {
    if (!name) {
        return { message: '"name" is required' };
    }
    return true;
};

const createCategory = async ({ name }) => {
    const validName = validateField(name);
    if (validName.message) {
        return { message: validName.message }; 
    }
    const category = await Categorie.create({ name });
    return category;
};

module.exports = { createCategory };