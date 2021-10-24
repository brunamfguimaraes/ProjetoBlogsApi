const express = require('express');
const validateToken = require('../validations/validateJWT');

const router = express.Router();

const categorie = require('../services/categorieService');

router.post('/', validateToken, async (req, res) => {
  try {
    const { name } = req.body;
    const newCategorie = await categorie.createCategorie(name);

    if (typeof newCategorie.message === 'string') {
      return res.status(400).json(newCategorie);
    }

    return res.status(201).json(newCategorie);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

router.get('/', validateToken, async (req, res) => {
  try {
    const getCategories = await categorie.getAllCategories();
    
    return res.status(200).json(getCategories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;