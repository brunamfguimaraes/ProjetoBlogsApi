const { BlogPost, Category/* , PostCategory */ } = require('../models');

const postService = async (title, content, userId, categoryIds) => {
  const published = new Date();
  const updated = new Date();

  const errorOnFindCategory = await Promise.all(categoryIds.map(async (id) => {
    const category = await Category.findByPk(id);
    if (!category) { 
      return { code: 'BAD_REQUEST', message: '"categoryIds" not found' }; 
    }
  }));

  function someFunction(element) {
    return typeof element === 'object';
  }

  if (errorOnFindCategory.some(someFunction)) {
     return { code: 'BAD_REQUEST', message: '"categoryIds" not found' }; 
  }

  const postData = { title, content, userId, published, updated };

  return BlogPost.create(postData);
};

module.exports = { postService };
