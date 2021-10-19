const express = require('express');
const { tokenValidation } = require('../middleware');

const { createCategory, findAllCategories } = require('../service/categoryService');

const router = express.Router();

router.post('/', tokenValidation, async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).send({ message: '"name" is required' });
    return res.status(201).send(await createCategory(name));
});

router.get('/', tokenValidation, async (_req, res) => {
    return res.status(200).send(await findAllCategories());
});

module.exports = router;