const { BlogPost, User, Category } = require('../models');

const getUserId = async (email) => {
  const { id } = await User.findOne({ email });

  return id;
};

const addPost = async (title, content, userId) => {
  const post = await BlogPost.create({ title, content, userId });

  return post;
};

const getAllPosts = async () => {
  const postsLists = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    },
    {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return postsLists;
};

const checkPostOwner = async (email, id) => {
  const userId = await getUserId(email);
  const postOwner = await BlogPost.findOne({ where: { userId: id } });

  if (userId === postOwner.userId) {
    return true;
  }

  return false;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne(
    {
      include: [{
        where: { id },
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
    },
  );

  if (!post) return null;

  return post;
};

const updatePost = async (id, email, { title, content }) => {
  const checkOwner = await checkPostOwner(email, id);

  if (!checkOwner) return false;

  const [updateBlogPost] = await BlogPost.update(
    { title, content },
    { where: { id } },
  );

  if (!updateBlogPost) return null;

  const { userId, categories } = await BlogPost.findOne({
    include: [{
      where: { id },
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return { title, content, userId, categories };
};

module.exports = {
  addPost,
  getAllPosts,
  getUserId,
  getPostById,
  updatePost,
};
