const { tokenInfo } = require('./token');
const { BlogPosts, Categories, User } = require('../models');

const ERROR = {
  titleErr: {
    titleMissing: { err: 400, message: '"title" is required' },
  },
  contentErr: {
    contentMissing: { err: 400, message: '"content" is required' },
  },
  categoryIdsErr: {
    categoryIdsMissing: { err: 400, message: '"categoryIds" is required' },
    categoryIdsRong: { err: 400, message: '"categoryIds" not found' },
  },
};

const checkBody = (req) => {
  const { title, content, categoryIds } = req.body;
  switch (true) {
    case !title:
      return ERROR.titleErr.titleMissing;
    case !content:
      return ERROR.contentErr.contentMissing;
    case !categoryIds:
      return ERROR.categoryIdsErr.categoryIdsMissing;
    default:
      return false;
  }
};

const checkCategory = async (categoryIds) => {
  const categorie = await Categories.findAll({ where: { id: categoryIds } });
  if (categorie.length !== categoryIds.length) { return ERROR.categoryIdsErr.categoryIdsRong; }
  return false;
};

const postPostServices = async (req) => {
  const checksIsOk = checkBody(req);
  if (checksIsOk) { return checksIsOk; }
  const { title, content, categoryIds } = req.body;
  const checkCateg = await checkCategory(categoryIds);
  if (checkCateg) { return checkCateg; }
  const returnToken = await tokenInfo(req);
  let id = returnToken;
  if (typeof id === 'string') { 
    const answer = await User.findOne({ where: { email: id } }); 
    id = answer.dataValues.id;
  }
  try {
    const post = await BlogPosts.create({ userId: id, title, content });
    return (post.dataValues);
  } catch (err) { return (err); }
};

const getAllPostServices = async () => {
  try {
    const post = await BlogPosts.findAll();
    console.log(post);
    return (post);
  } catch (err) { return (err); }
};

module.exports = {
  postPostServices,
  getAllPostServices,
};
