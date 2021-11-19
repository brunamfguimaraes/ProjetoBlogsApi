const rescue = require('express-rescue');
const { Category } = require('../models');

const createCategory = rescue(async (req, res) => {
    try {
        const { name } = req.body;
        const result = await Category.create({ name });
    
        return res.status(201).json(result);
    } catch (e) {
        res.status(500).json({ message: 'Erro ao criar a categoria' });
    }
});

const getCategory = async (req, res) => {
    try {
        const result = await Category.findAll();

        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({ message: 'Erro ao pegar todas as categorias' });
    }
};

module.exports = {
    createCategory,
    getCategory,
};