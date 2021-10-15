const { BlogPost, PostsCategory, Category } = require('../models');
const { validPost } = require('../validations/validations');

const createPost = async (post, userId) => {
    console.log('create category service');
    const listCategory = await Category.findAll();
    const valid = validPost(post, listCategory);
    console.log(typeof (valid));
    if (typeof (valid) === 'string') {
        return valid;
    } 
    const newPost = { ...post, userId };
    const { categoryIds } = newPost;
    const response = await BlogPost.create(newPost);
    const { dataValues: { id } } = response;
    categoryIds.forEach(async (category) => {
        const values = { postId: id, categoryId: category };
        await PostsCategory.create(values);
    });
    return response;
};
module.exports = { createPost };