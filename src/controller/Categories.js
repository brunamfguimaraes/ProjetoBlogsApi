const express = require('express');
const bodyParser = require('body-parser');

const route = express.Router();
route.use(bodyParser.json());

const { verifyToken } = require('../middlewares/User');

const { verifyCategoryName } = require('../middlewares/Categories');

const categoriesService = require('../service/Categories');
const httpStatus = require('../httpStatus');

route.get('/',
verifyToken,
  async (req, res) => {
    const allCategories = await categoriesService.findAllCategories();
    res.status(httpStatus.ok).json(allCategories);
});

route.post('/',
  verifyToken,
  verifyCategoryName,
  async (req, res) => {
    const { name } = req.body;
    const id = await categoriesService.createCategorie(name);
    res.status(httpStatus.created).json({ id, name });
});

module.exports = route;
