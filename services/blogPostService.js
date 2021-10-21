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
    console.log('updatepost console', updatedPost.userId, user);
    return { fieldError: true, message: 'Unauthorized user' };    
  }
  return { fieldError: false };
};

const checkUserForDelete = async (id, user) => {
  console.log('id console', id);
  
  const deletePost = await BlogPost.findByPk(id);
  
  if (user.id !== deletePost.userId) {        
    console.log('updatepost console', deletePost.userId, user.id);
    return { fieldError: true, message: 'Unauthorized user' };    
  }
  return { fieldError: false };
};

module.exports = {
  checkCategoryId,
  checkBlogPost,
  checkUserId,
  checkUserForDelete,
};
