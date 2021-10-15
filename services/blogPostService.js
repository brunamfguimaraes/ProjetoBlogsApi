const { Category, BlogPost } = require('../models');

const checkCategoryId = async (categoryIds) => {  
  const idCheck = await Promise.all(categoryIds.map((catId) => Category.findByPk(catId)));
 
  if (idCheck.some((idCategory) => idCategory === null)) {
    return { fieldError: true, message: '"categoryIds" not found' };
  }  

  return { fieldError: false };
};

const checkBlogPost = async (id) => {
  const blogId = await BlogPost.findByPk(id);

  if (!blogId) {
    return { fieldError: true, message: 'Post does not exist' };
  }
  return blogId;
};

module.exports = {
  checkCategoryId,
  checkBlogPost,
};
