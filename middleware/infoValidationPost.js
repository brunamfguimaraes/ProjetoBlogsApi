const rescue = require('express-rescue');
// const { User } = require('../models');
const { Category } = require('../models');

const titleIsRequired = rescue((req, res, next) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: '"title" is required',
          });
        }
    next();
});

const contentIsRequired = rescue((req, res, next) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({
            message: '"content" is required',
          });
        }
    next();
});

const categoryIdIsRequired = rescue((req, res, next) => {
    const { categoryIds } = req.body;

    if (!categoryIds) {
        return res.status(400).json({
            message: '"categoryIds" is required',
          });
        }
    next();
});

const idCategoryIsRequired = rescue(async (req, res, next) => {
    const { categoryIds } = req.body;
    console.log(categoryIds);

    const getCategories = await Category.findAll();
    const checkCategory = getCategories.map((get) => categoryIds[0] === get.dataValues.id);
    console.log('checkCategory', checkCategory, 'checkCategory');
    if (checkCategory[0] === false && checkCategory[1] === false) {
        res.status(400).json({ message: '"categoryIds" not found' });
    }
    next();
});

module.exports = { 
    titleIsRequired,
    contentIsRequired,
    categoryIdIsRequired,
    idCategoryIsRequired,
};