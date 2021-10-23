const { BlogPost, Category, User } = require('../models');

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
  
  return { id: postId, userId, title, content };
};

const getAllPosts = async () => {
  /*
    Realizado com ajuda de Felippe Correa
  */
  const response = await BlogPost.findAll({
    include: [
    { model: User, as: 'user' },
    { model: Category, as: 'categories', through: { attributes: [] } }], 
  });

  return response;
};

module.exports = { createPostServices, getAllPosts };