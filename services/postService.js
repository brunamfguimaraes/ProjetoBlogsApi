const { Category, BlogPost, PostsCategory, User } = require('../models');

const validateTitle = async (request, response, next) => {
  const { title } = request.body;

  if (title === '' || !title) {
    return response.status(400).json({ message: '"title" is required' });
  }
  next();
};

const validateContent = async (request, response, next) => {
  const { content } = request.body;

  if (content === '' || !content) {
    return response.status(400).json({ message: '"content" is required' });
  }
  next();
};

const validateCategoryId = async (request, response, next) => {
  const { categoryIds } = request.body;

  if (!categoryIds || !categoryIds.length) {
    return response.status(400).json({ message: '"categoryIds" is required' });
  }
  next();
};

const validateCategories = async (request, response, next) => {
  const { categoryIds } = request.body;
  const categories = await Category.findAll({ where: { id: categoryIds } });

  if (categoryIds.length !== categories.length) {
    return response.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

const creatPost = async (post, userId) => {
  const { title, content, categoryIds } = post;
  const newPost = await BlogPost.create({ title, content, userId });
  categoryIds.forEach(async (id) => { 
    await PostsCategory.create({ postId: newPost.id, categoryId: id }); 
  });
  return newPost;
};

const getPosts = async () => {
    const result = await BlogPost.findAll({ 
        include: [
            { model: User, as: 'user' },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });

    return result;
};

const editCategories = (request, response, next) => {
  const { categoryIds } = request.body;
  if (categoryIds) {
    return response.status(400).json({ message: 'Categories cannot be edited' });
  }
  next();
};

const validUser = async (request, response, next) => {
  const { id } = request.params;
 
  // const { id: userId } = request.user;
  const post = await BlogPost.findOne({ where: { id } });
  if (post.userId !== id) return response.status(401).json({ message: 'Unauthorized user' });

  next();
};

const updatePost = async (id, title, content) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const post = await BlogPost.findOne({ where: { id },
  include: [{ model: Category, as: 'categories', through: { attributes: [] } }] });

  return post;
};

const deletePost = async (id, userId) => {
  const post = await BlogPost.findOne({ where: { id } });

  if (!post) {
    return { error: { status: 404, message: 'Post does not exist' } };
  }

  if (post.userId !== userId) {
    return { error: { status: 401, message: 'Unauthorized user' } };
  }

  await BlogPost.destroy({ where: { userId: id } });

  return post;
};

module.exports = {
  validateTitle,
  validateContent,
  validateCategoryId,
  validateCategories,
  creatPost,
  getPosts,
  updatePost,
  editCategories,
  validUser,
  deletePost,
}; 