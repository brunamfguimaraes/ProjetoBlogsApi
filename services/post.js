const { BlogPost, User, Category } = require('../models');

const { tokenFindUserId } = require('../middlewares');

const servicePostCreated = async (postData, token) => {
const { id } = await tokenFindUserId(token);
const { title, content, categoryIds } = postData;
const postPublished = await BlogPost.create({ title, content, categoryIds, userId: id });
return { code: 201,
  postPublished };
};

const servicePostList = async () => {
  const allPost = await BlogPost.findAll({
    include: [
      { model: User, as: 'user' },
      { model: Category, as: 'categories' },
    ] });

  // recebi a ajuda da Leticia Galvão para iniciar o projeto e no requisito 8
  
     return {
       allPost, code: 200,
      };
};

module.exports = {
  servicePostCreated,
  servicePostList,
};