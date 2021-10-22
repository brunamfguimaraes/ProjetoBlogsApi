const Joi = require('joi');
const { Categories, PostsCategories } = require('../models');

const msg = 400;

const isValidTitleAndContent = (data) => {
    const validation = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryIds: Joi.array().required(),
    }).validate(data);
    if (validation.error) {
        return {
            isError: true, err: { message: validation.error.details[0].message }, status: msg,
        };
    }
};

const isValidCategory = async (categories) => {
    const notFound = '"categoryIds" not found';
    const validCategories = await Categories.findAll();

    if (categories === undefined) {
        return {
            isError: true,
            err: { message: notFound },
            status: msg,
        };
    }
    const categoriesId = validCategories.map((item) => item.id);

    const validCategory = categories.every((id) => categoriesId.includes(id));
    if (!validCategory) {
        return {
            isError: true,
            err: { message: notFound },
            status: msg,
        };
    }
};

const newPostCreate = async (categoryId, postId) => {
    await categoryId.map((id) => PostsCategories.create({ categoryId: id, postId }));
};

module.exports = {
    isValidTitleAndContent,
    isValidCategory,
    newPostCreate,
};