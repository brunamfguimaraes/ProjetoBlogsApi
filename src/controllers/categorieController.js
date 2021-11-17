const express = require('express');

const CategorieController = express.Router();

CategorieController.post('/', async (req, res) => {
  try {    
    return res.status(200).send({ message: 'ok' });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = CategorieController;
