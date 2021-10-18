const { Category } = require('../models/index');

const addCategory = async (name) => {
const newCategory = await Category.create({ ...name });
// console.log(newCategory, name, 'esotu no service pronto para retornar');
return newCategory;
};

const getAllCategory = async () => Category.findAll();

module.exports = {
    addCategory,
    getAllCategory,
};