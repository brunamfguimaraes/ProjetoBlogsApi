const jwt = require('jsonwebtoken');
const { BlogPost, PostsCategorie, User, Categorie } = require('../models');
const schema = require('../schemas/postSchema');

const createPost = async (title, content, categoryIds, token) => {
  const validation = schema.validateNewPost(title, content, categoryIds);
  if (validation.err) return validation;
  const categoriesValidation = await schema.validateCategories(categoryIds);
  if (categoriesValidation.err) return categoriesValidation;
  try {
    const payload = jwt.decode(token);
    const { data } = payload;
    const { id: userId } = data;
    const newPost = await BlogPost.create({ title, content, userId });
    const { id: postId } = newPost;
    const postAndCategoryIds = categoryIds.map((categoryId) => ({ categoryId, postId }));
    await PostsCategorie.bulkCreate(postAndCategoryIds);
    return newPost;
  } catch (e) {
    console.log(e.message);
    return { err: { message: e.message }, status: 500 };
  }
};

const getAllPosts = async () => {
  try {
    const allPosts = await BlogPost.findAll({ include: [{ model: User, as: 'user' }, 
      { model: Categorie, as: 'categories' }] });
    return allPosts;
  } catch (e) {
    console.log(e.message);
    return { err: { message: 'Algo deu errado' }, status: 500 };
  }
};

module.exports = {
  createPost,
  getAllPosts,
};
