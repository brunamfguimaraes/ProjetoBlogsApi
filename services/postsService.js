const { BlogPost } = require('../models');
const categoriesServices = require('../services/categoriesService');

const genericError = {
  err: {
    status: 500,
    message: {
      message: 'Undefined error',
    },
} };

const verifyExistenceCategory = async (categoryId) => {
  const category = Category.
};

const createPost = async (postInfo, userInfo) => {
  const { title, content, categoryIds } = postInfo;
  const userId = userInfo.id;
  try {
    const { id } = await BlogPost.create({ userId, title, content });
    console.log(userInfo);
    return { resp: {
        status: 201,
        content: {
          id,
          userId,
          title,
          content,
        },
      },
    };
  } catch (e) {
    return genericError; 
} 
};

module.exports = {
  createPost,
};