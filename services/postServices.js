const { BlogPost, Category } = require('../models');

const createPostServices = async ({ title, content, categoryIds, id: userId }) => {
  const searchCategories = await Category.findAll({ where: { id: categoryIds } });
  
  if (categoryIds.length !== searchCategories.length) {
    return { isError: true, message: '"categoryIds" not found' };
  }
  console.log(userId, 'OIOIOOOIOIOIOIOIOIOIO');
  
  const a = await BlogPost.create(title, content, userId);
};

module.exports = { createPostServices };