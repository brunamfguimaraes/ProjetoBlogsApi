const { Category } = require('../models');

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await Category.create({ name });
    
        return res.status(201).json(result);
    } catch (e) {
        res.status(500).json({ message: 'Erro ao criar a categoria' });
    }
};

module.exports = {
    createCategory,
};