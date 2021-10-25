const { Categorie } = require('../models');

const validateFieldName = (name) => {
    if (!name) return { status: 400, message: '"name" is required' };

    return true;
};
const createCategories = async (name) => {
    const resultvalidateFieldName = validateFieldName(name);
    if (resultvalidateFieldName !== true) {
        return resultvalidateFieldName;
    } 

    await Categorie.create({ name });

    return { status: 201 };
};

module.exports = {
    createCategories,
};