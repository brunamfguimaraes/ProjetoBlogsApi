const rescue = require('express-rescue');
const { serviceCreateCategory } = require('../service/serviceCategory');

const createCategory = rescue(async (req, res) => {
    const result = await serviceCreateCategory(req, res);
    res.status(201).json(result);
  });

module.exports = { createCategory };
