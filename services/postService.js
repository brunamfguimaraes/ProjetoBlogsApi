const Joi = require('joi');
const { BlogPost, User, Category, PostsCategory } = require('../models');

  const createBlogPost = async (title, content, categoryIds, userId) => {
    const published = Date.now();
    const schema = Joi.object({ title: Joi.string().required(), 
      content: Joi.string().required(),
categoryIds: Joi.array().required(),
  }).validate({ title, content, categoryIds });
    if (schema.error) return { message: schema.error.message, status: 400 };
      const verifyCategory = await Category.findAll()
      .then((category) => category.map(({ id }) => id));
      const check = categoryIds.every((id) => verifyCategory.includes(id));
    if (!check) return { message: '"categoryIds" not found', status: 400 };
      const { id } = await BlogPost.create({ title, content, userId, published });
      // if (!verifyCategory) { check = { message: 'is required', status: 400 }; }
    // await categoryIds.forEach(async (categoryId) => {
    //   await PostsCategory.create({ categoryId, postId: id });
    // });
    return { id, userId, title, content };
    };
      
  const getAllBlogPost = async () => {
  const getBlogPost = await BlogPost.findAll({ 
    include: [ 
      { model: User,
        as: 'user',
        attributes: { exclude: ['password'] } },
      { model: Category,
        as: 'categories',
        through: { attributes: [] } },
    ],
  });
  return getBlogPost;
};

  module.exports = { createBlogPost, getAllBlogPost };