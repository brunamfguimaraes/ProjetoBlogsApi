const { BlogPost: PostModel, User: UserModel, Category: CategoriesModel } = require('../models');
const validations = require('../util/validations');

const createPost = async (title, content, categoryIds, userId) => {
  await validations.verifyPostData(title, content, categoryIds);

  const post = await PostModel.create({ title, content, userId });

  return post;
};

const getAllPosts = async () => {
  const post = await PostModel.findAll(
    {
      include: [
        { model: UserModel, as: 'user', attributes: { exclude: ['password'] } },
        { model: CategoriesModel, as: 'categories', through: { attributes: [] } },
      ],
    },
  );

  return post;
};

module.exports = {
  createPost,
  getAllPosts,
};