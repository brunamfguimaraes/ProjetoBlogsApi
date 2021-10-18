const { BlogPost } = require('../models');

const { tokenFindUserId } = require('../middlewares');

const servicePostCreated = async (postData, token) => {
const { id } = await tokenFindUserId(token);
const { title, content, categoryIds } = postData;
const postPublished = await BlogPost.create({ title, content, categoryIds, userId: id });
return { code: 201,
  postPublished };
};

module.exports = {
  servicePostCreated,
};