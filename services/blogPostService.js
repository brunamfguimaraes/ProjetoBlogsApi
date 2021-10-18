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

const checkUserId = async (id, user) => {
  const updatedPost = await BlogPost.findByPk(id, {
    include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
    attributes: { exclude: ['id', 'published', 'updated'] },
  });

  if (user !== updatedPost.userId) {        
    return { fieldError: true, message: 'Unauthorized user' };    
  }
  return { fieldError: false };
};

module.exports = {
  checkCategoryId,
  checkBlogPost,
  checkUserId,
};
