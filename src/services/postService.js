const { BlogPost: PostModel } = require('../models');
const validations = require('../util/validations');

const createPost = async (title, content, categoryIds, userId) => {
  await validations.verifyPostData(title, content, categoryIds);

  // console.log('userIdddddddddddddddddddddddddddddddddddddddddddddddddd', userId);
  const post = await PostModel.create({ title, content, userId });

  return post;
};

// const getCategories = async () => {
//   const categories = await CategoryModel.findAll();

//   return categories;
// };

module.exports = {
  createPost,
  // getCategories,
};