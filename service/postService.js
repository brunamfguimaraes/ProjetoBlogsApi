const { BlogPost, PostsCategory, Category, User } = require('../models');
const { validPost } = require('../validations/validations');

const getById = async (id) => {
    console.log(id);
    const post = await BlogPost.findOne({ where: { id },
        include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } }],
      });
      console.log(post);
    return post;
};

const getAll = async () => {
    const posts = await BlogPost.findAll(
        {
            include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } }],
        },
);
    return posts;
};

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
module.exports = { createPost, getAll, getById };