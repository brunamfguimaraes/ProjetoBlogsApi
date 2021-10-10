const { Op } = require('sequelize');
const { BlogPost, PostsCategory, User, Category } = require('../../models');
const { ApiError } = require('../utils/ApiError');

const checkIfOwns = (userId, user) => {
  if (userId !== user) {
    throw new ApiError('Unauthorized user', 401);
  }
};

const createPostService = async (body) => {
  const { categoryIds, title, content, userId } = body;
  const post = await BlogPost.create({
    title,
    content,
    userId,
    published: Date.now(),
    updated: Date.now(),
  });

  // for (let i = 0; i < categoryIds.length; i += 1) {
  //   PostCategory.create({ postId: post.id, categoryIds[i].id });
  // }

  categoryIds.forEach((categoryId) => {
    PostsCategory.create({ postId: post.id, categoryId });
  });

  return post;
};

// const user = await User.findOne({
// where: { userId: id },
// include: [{ model: Book, as: 'books', through: { attributes: [] } }],
// });

const getAllPostsService = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const getPostService = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const updatePostService = async (body, id, user) => {
  if (body.categoryIds) {
    throw new ApiError('Categories cannot be edited', 400);
  }
  const post = await BlogPost.findByPk(id);

  checkIfOwns(post.userId, user.id);

  await BlogPost.update({ ...body }, { where: { id } });
  return BlogPost.findByPk(id, {
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
};

const deletePostService = async (id, user) => {
  const post = await BlogPost.findByPk(id);

  if (!post) {
    throw new ApiError('Post does not exist', 404);
  }

  checkIfOwns(post.userId, user.id);

  return BlogPost.destroy({
    where: { id },
  });
};

const createByQueryService = async (query) => {
  if (!query) return getAllPostsService();

  // Based on https://stackoverflow.com/a/42352244/14362230

  return BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
};

module.exports = {
  createPostService,
  getAllPostsService,
  getPostService,
  updatePostService,
  deletePostService,
  createByQueryService,
};
