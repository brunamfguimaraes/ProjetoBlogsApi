const express = require('express');
const rescue = require('express-rescue');
const { StatusCodes } = require('http-status-codes');

const categoriesRouter = express.Router();
const loginValidate = require('../middlewares/validateJWT');
const categoriesValidate = require('../middlewares/categorieValidate');
const { createCategories } = require('../services/categoriesService');

categoriesRouter.post('/',
  categoriesValidate,
  loginValidate,
  rescue(async (req, res) => {
    const category = await createCategories(req.body);
    console.log(category);
    return res.status(StatusCodes.CREATED).json(category);
  }));

module.exports = categoriesRouter;