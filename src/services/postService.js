const { Post: PostModel } = require('../models');
const validations = require('../util/validations');

const createPost = async (title, content, categoryIds) => {
  await validations.verifyPostData(title, content, categoryIds);
  console.log('cheguei');
  const post = await PostModel.create({ title, content });
  console.log('cheguei 2');

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