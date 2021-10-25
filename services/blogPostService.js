const { BlogPost, Categorie, PostsCategorie } = require('../models');

const verifyIfIdExists = async (categoryIds) => {
  const categories = await Categorie.findAll();
  const result = categoryIds.every((elem) => elem > 0 && elem <= categories.length);
  return result;
};

const validateFields = async (title, content, categoryIds) => {
    if (!title) return { status: 400, message: '"title" is required' };
    if (!content) return { status: 400, message: '"content" is required' };
    if (!categoryIds) return { status: 400, message: '"categoryIds" is required' };
    const result = await verifyIfIdExists(categoryIds);
    if (!result) return { status: 400, message: '"categoryIds" not found' };
    return true;
};

const createBlogPost = async (title, content, categoryIds, userId) => {
    const resultvalidateFields = await validateFields(title, content, categoryIds);
    if (resultvalidateFields !== true) {
        return resultvalidateFields;
    } 
    const post = await BlogPost.create({ title, content, userId });
    await PostsCategorie.bulkCreate(
      [...categoryIds.map((category) => ({ postId: post.id, categoryId: category }))],
    );
    return {
      status: 201,
      post,
    };
  };

  module.exports = {
    createBlogPost,
  };