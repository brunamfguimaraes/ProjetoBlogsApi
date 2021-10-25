const { Categories } = require('../models');

const haveFields = (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    if (!title) return res.status(400).json({ message: '"title" is required' });
    if (!content) return res.status(400).json({ message: '"content" is required' });
    if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });
    next();
};

const haveCategory = async (req, res, next) => {
    const { categoryIds } = req.body;
    const have = await categoryIds
    .map((category) => Categories.findOne({ where: { id: category } }));
    const result = await Promise.all(have);
    if (result.includes(null)) {
        return res
            .status(400).json({ message: '"categoryIds" not found' }); 
    }
    next();
};

module.exports = {
    haveFields,
    haveCategory,
};