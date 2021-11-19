const { Category } = require('../models');
const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await Category.create({ name });
    
        return res.status(201).json(result);
    } catch (e) {
        res.status(500).json({ message: 'Erro ao criar a categoria' });
    }
};

const getCategory = async (req, res) => {
    try {
        const result = await categoryService.getCategory();

        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ message: 'Erro ao pegar todas as categorias' });
    }
};

module.exports = {
    createCategory,
    getCategory,
};