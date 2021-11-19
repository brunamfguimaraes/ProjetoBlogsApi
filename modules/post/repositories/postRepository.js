const { PostCategory, BlogPost, User, Category } = require('../../../models');

const createPost = async (data) => {
  const { title, content, id: userId } = data;
  const blog = await BlogPost.create({ title, content, userId });
  return blog;
};

const createPostCategory = async (postId, categoryId) => {
  const data = { postId, categoryId };
  const created = await PostCategory.create({ ...data });
  return created;
};

const listPosts = async () => {
  const post = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }, {
      model: Category,
      as: 'categories',
      through: {
        attributes: [],
      },
    }],
  });
  return post;
};

const listPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

const getOnlyId = async (id) => {
  const blog = await BlogPost.findOne({
    where: { id },
  });

  return blog;
};

const editPost = async (data, id) => {
  await BlogPost.update({ ...data }, { where: { id } });
  const edited = await BlogPost.findOne({
    where: { id },
    attributes: { exclude: ['id', 'published', 'updated'] },
    include: [{
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      }],
  });
  return edited;
};

const findPost = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
  });

  return post;
};

const excludePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  createPost,
  listPosts,
  listPostById,
  editPost,
  findPost,
  excludePost,
  createPostCategory,
  getOnlyId,
};