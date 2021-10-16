const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');

const categoriesRouter = express.Router();
const validateJWT = require('../middlewares/validateJWT');
const categoriesValidate = require('../middlewares/categorieValidate');
const { createCategories, allCategories } = require('../services/categoriesService');

categoriesRouter.post('/',
  categoriesValidate,
  validateJWT,
  rescue(async (req, res) => {
    const category = await createCategories(req.body);
    return res.status(StatusCodes.CREATED).json(category);
  }));

  categoriesRouter.get('/',
    validateJWT,
    rescue(async (req, res) => {
      const categories = await allCategories();
      return res.status(StatusCodes.OK).json(categories);
    }));

module.exports = categoriesRouter;