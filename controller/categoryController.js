const express = require('express');
const { Category } = require('../models');
const categoryValidate = require('../middleware/categoryValidate');
const verifyToken = require('../middleware/verifyToken');

const categoryRouter = express.Router();

categoryRouter.post('/', verifyToken, categoryValidate, async (req, res) => {
  try {
    const { name } = req.body;
    // const { token } = req;

    const category = await Category.create({ name });
    res.status(201).json(category);  
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'invalid data',
    });   
  }
});

// validateUser, createToken,

module.exports = categoryRouter;