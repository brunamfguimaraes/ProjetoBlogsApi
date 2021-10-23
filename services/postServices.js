const { BlogPost, PostCategory, Category } = require('../models');

const createPostServices = async ({ title, content, categoryIds, id: userId }) => {
  /*
    Realizado com ajuda de Lucas Martins da Silva e Dangelo Silva Miranda 
  */
  const resultIdsInput = await categoryIds.map(async (id) => { 
    const result = await Category.findByPk(id); 
    return result;
  });
  const resultPromiseAll = await Promise.all(resultIdsInput); 
  
  const isNull = resultPromiseAll.some((e) => !e);

  if (isNull) {
     return { isError: true, message: '"categoryIds" not found' }; 
  }

  const { id: postId } = await BlogPost.create({ title, content, userId });

  await categoryIds.forEach(async (categoryId) => {
    await PostCategory.create({ postId, categoryId });
  });
  
  return { id: postId,
    userId,
    title,
    content,
  };
};

module.exports = { createPostServices };