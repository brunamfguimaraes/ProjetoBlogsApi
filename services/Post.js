// const Joi = require('joi');
const { BlogPosts, Categories, Users } = require('../models');

/* const isValidPost = (data) => {
    const validation = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryIds: Joi.array().required(),
    }).validate(data);
    if (validation.error) {
        console.log(validation.erorr);
        return {
            isError: true, err: { message: validation.error.details[0].message }, status: 400,
        };
    }
}; */

/* const createPost = async (categoryId, postId) => {
    await categoryId.map((id) => PostsCategories.create({ categoryId: id, postId }));
    console.log(categoryId)
}; */

/*  const createPost = async (data, user) => {
    
    const checkPost = isValid(data);
    if (checkPost) { return checkPost; }
    const { id } = user;
    const { title, content, categoryIds } = data;
    const dataPostVal = await validateCategories(categoryIds);
    console.log(dataPostVal);
    if (dataPostVal) { return dataPostVal; }
    const result = await BlogPosts.create({
        title,
        content,
        userId: id,
        published: Date(),
    });
    await createPost(categoryIds, result.id);
    console.log(error)
    return result;
    
}; */

const getAllPosts = async () =>
    BlogPosts.findAll({
        include: [
            { model: Categories, as: 'categories', through: { attributes: [] } },
            { model: Users, as: 'user' },
        ],
    });

const findPost = async (findTerm) => {
    const posts = await BlogPosts.findAll({
        include:
            [{ model: Categories, as: 'categories', through: { attributes: [] } },
            { model: Users, as: 'user' }],
    });
    const resultTerm = posts.filter((data) =>
        data.dataValues.title.includes(findTerm) || data.dataValues.content.includes(findTerm));
    return resultTerm;
};
module.exports = {
    getAllPosts,
    findPost,
};
