const { BlogPost: PostModel, User: UserModel, Category: CategoriesModel } = require('../models');
const AppError = require('../util/appError');
const validations = require('../util/validations');

const codes = require('../util/httpCodes');
const messages = require('../util/errorMessages');

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

const getPostsById = async (id) => {
  const post = await PostModel.findOne(
    {
      where: { id },
      include: [
        { model: UserModel, as: 'user', attributes: { exclude: ['password'] } },
        { model: CategoriesModel, as: 'categories', through: { attributes: [] } },
      ],
    },
  );

  if (!post) throw new AppError(codes.notFound, messages.postNotFound);

  return post;
};

const updatePost = async (postId, userId, updateData) => {
  const post = await getPostsById(postId);
  if (post.userId !== userId) throw new AppError(codes.unauthorized, messages.wrongUser);

  const { title, content, categoryIds } = updateData;
  if (categoryIds) throw new AppError(codes.badRequest, 'Categories cannot be edited');
  validations.verifyUpdatePostData(title, content);

  await PostModel.update(
    { title, content },
    { where: { id: postId } },
  );
  const updatedPost = await getPostsById(postId);

  return updatedPost;
};

const deletePost = async (postId, userId) => {
  const post = await getPostsById(postId);
  if (post.userId !== userId) throw new AppError(codes.unauthorized, messages.wrongUser);

  // const { title, content, categoryIds } = updateData;
  // if (categoryIds) throw new AppError(codes.badRequest, 'Categories cannot be edited');
  // validations.verifyUpdatePostData(title, content);

  const deleteUser = await PostModel.destroy(
    { where: { id: postId } },
  );

  console.log('deleted user', deleteUser);
  // const updatedPost = await getPostsById(postId);

  // return updatedPost;

  return null;
};

module.exports = {
  createPost,
  deletePost,
  getAllPosts,
  getPostsById,
  updatePost,
};