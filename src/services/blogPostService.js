const { checkPostEntries, checkCategories } = require('../validations/blogPostValidation');
const { BlogPost, User, Category } = require('../models');

const createPost = async (postData) => {
  const entries = checkPostEntries(postData);
  if (entries.message) return entries;

  const categoryIsNull = await checkCategories(postData.categoryIds);

  if (categoryIsNull) {
    return { message: '"categoryIds" not found' };
  }
  const { title, userId, content } = postData;

  return BlogPost.create({ title, userId, content });
}; 

const getAllPosts = async () => BlogPost.findAll(
    { 
      include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ], 
    },
);

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, { include: [
        { model: User, as: 'user' },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ], 
  }); 

  if (!post) return { message: 'Post does not exist' };

  return post; 
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};