const express = require('express');
const rescue = require('express-rescue');

const { createCategory, getAllCategories } = require('../service/categoryService');
const { tokenValidation } = require('../middleware/infoValidationUser');
const { nameIsRequired } = require('../middleware/infoValidationCategory');

const router = express.Router();

router.post('/',
tokenValidation,
nameIsRequired,
rescue(async (req, res) => {
    console.log(req.body, 'req.body');
    await createCategory(req, res);
}));

router.get('/',
tokenValidation,
rescue(async (req, res) => {
    console.log(req.body, 'req.body');
    await getAllCategories(req, res);
}));

module.exports = router;