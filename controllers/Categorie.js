const express = require('express');
const rescue = require('express-rescue');
const { Categorie } = require('../models');
const { ctgValidate, auth } = require('../middlewares');

const categories = express.Router();

categories.use(auth);

categories.post(        
  '/',
  ctgValidate,
  rescue(async (req, res) => {
    const { name } = req.body;
    const { id } = await Categorie.create({ name });
    return res.status(201).json({ id, name });
  }),
);

categories.get(
  '/',
  rescue(async (_req, res) => {
    const allCategories = await Categorie.findAll();
    return res.status(200).json(allCategories);
  }),
);

module.exports = categories;
