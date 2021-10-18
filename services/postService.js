const { emailUser } = require('../middleware/validateToken');
const { BlogPost, User, Categorie } = require('../models');

const erroMessage = (code, message) => ({ code, message });
const TITLE_REQUIRED = '"title" is required';
const CONTENT_REQUIRED = '"content" is required';
const CATEGORYIDS_REQUIRED = '"categoryIds" is required';
const CATEGORYIDS_NOT_FOUND = '"categoryIds" not found';

const valueExists = (value) => (!value);

const categoryNotExist = async (categoryIds) => {
    const categorie = await Categorie.findAll({ where: { id: categoryIds } });
    // console.log('categorie-------', categorie);
    if (categorie.length !== categoryIds.length) { return true; }
    return false;
};

const validValueExists = async ({ title, content, categoryIds }) => {
  if (valueExists(title)) { return erroMessage(400, TITLE_REQUIRED); }
  if (valueExists(content)) { return erroMessage(400, CONTENT_REQUIRED); }
  if (valueExists(categoryIds)) { return erroMessage(400, CATEGORYIDS_REQUIRED); }
  if (await categoryNotExist(categoryIds)) { return erroMessage(400, CATEGORYIDS_NOT_FOUND); }
  return false;
};

const create = async (post, token) => {
  const result = await validValueExists(post);
  
  if (result) { return result; }
  const email = emailUser(token);
  const { id: userId } = await User.findOne({ where: { email } });
  const { title, content, id } = await BlogPost.create({ ...post, userId });
  return { title, content, userId, id };
};

const getAll = () => BlogPost.findAll({ include: [
  { model: User, as: 'user' },
  { model: Categorie, as: 'categories', through: { attributes: [] } },
] });

module.exports = {
  create,
  getAll,
};