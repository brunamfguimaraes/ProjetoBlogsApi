const { Category, BlogPost } = require('../models');

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

// const messageCategoryIdsEdit = {
//     message: 'Categories cannot be edited',
// };

const messageUserUnauthorized = {
    message: 'Unauthorized user',
};

// const messagePostNotFound = {
//     message: 'Post does not exist',
// };
const validateFields = (req, res, next) => {
    const { title, content } = req.body;
    if (!title) {
        return res.status(400).json(messageTitle);
    }

    if (!content) {
        return res.status(400).json(messageContent);
    }

    next();
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

const validateIfCategoryIdExist = async (req, res, next) => {
    const { categoryIds } = req.body;
    const result = categoryIds.map((id) => Category.findOne({ where: { id } }));
    const resolves = await Promise.all(result);
    if (!resolves.every((re) => re !== null)) {
        return res.status(400).json(messageCategoryIdNotFound);
    }
    
    next();
};

// const verifyFieldCategoriesIds = (req, res, next) => {
//     const { categoriesIds } = req.body;

//     if (categoriesIds) {
//         return res.status(400).json(messageCategoryIdsEdit);
//     }

//     next();
// };

const verifyIfIsRightUser = async (req, res, next) => {
    const { id } = req.params;
    const idUser = req.user;
    console.log('id do usuario', idUser);

    const getPost = await BlogPost.findOne({ where: { id } });

    console.log('o que vem no getPost', getPost);

    if (idUser.id !== getPost.userId) {
        return res.status(401).json(messageUserUnauthorized);
    }

    next();
};

module.exports = {
    validateCategoryId,
    validateContent,
    validateIfCategoryIdExist,
    validateTitle,
    // verifyFieldCategoriesIds,
    verifyIfIsRightUser,
    validateFields,
};
