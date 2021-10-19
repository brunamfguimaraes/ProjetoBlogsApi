const { BlogPost } = require('../models');

const genericError = {
  err: {
    status: 500,
    message: {
      message: 'Undefined error',
    },
} };

const createPost = async (postInfo, userInfo) => {
  const { title, content, categoryIds } = postInfo;
  try {
    const { id } = await BlogPost.create({ title, content });
    console.log(userInfo);
    return {
      resp: {
        status: 201,
        content: {
          id,
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