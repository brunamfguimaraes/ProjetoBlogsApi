const { Category } = require('../models');

const messageTitle = {
    message: '"title" is required',
};

const messageContent = {
    message: '"content" is required',
};

const messageCategoryId = {
    message: '"categoryIds" is required',
};

const messageCategoryIdNotFound = {
    message: '"categoryIds" not found',
};

const validateTitle = (req, res, next) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json(messageTitle);
    }

    next();
};

const validateContent = (req, res, next) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json(messageContent);
    }

    next();
};

const validateCategoryId = (req, res, next) => {
    const { categoryIds } = req.body;
    if (!categoryIds) {
        return res.status(400).json(messageCategoryId);
    }

    next();
};

// const findIds = categoryIds.every(async (id) => Category.findOne({ where: { id } }));
const validateIfCategoryIdExist = async (req, res, next) => {
    const { categoryIds } = req.body;
    const result = categoryIds.map(async (id) => {
        console.log('entrei no loop');
        const respon = await Category.findOne({ where: { id } });
        return respon;
    });
    Promise.all(result).then((resp) => {
        console.log(resp);
        for (let i = 0; i < resp.length; i += 1) {
            if (resp[i] === null) {
                return res.status(400).json(messageCategoryIdNotFound);
            }
        }
    });
    
    next();
};

module.exports = {
    validateCategoryId,
    validateContent,
    validateIfCategoryIdExist,
    validateTitle,
};
