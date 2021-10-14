// const jwt = require('jsonwebtoken');
const categoriesService = require('../service/categoriesService');

// const secret = 'seusecretdetoken';

// const jwtConfig = {
//     expiresIn: '10h',
//     algorithm: 'HS256',
//   };
const getCategories = async (req, res) => {
    console.log('token validado');
    try {
        const users = await categoriesService.getCategories();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

const createCategory = async (req, res) => {
    try { 
        console.log('create category controller');
        console.log(req.body);
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: '"name" is required' });
        }
        const result = await categoriesService.createCategory(req.body);

            return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

module.exports = { createCategory, getCategories };