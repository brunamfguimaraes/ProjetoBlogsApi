const { BlogPost, Category, User } = require('../models');

const validateIfExists = (title, content, categoryIds) => {
  let resp = false;
  if (!title) {
    resp = { mess: '"title" is required' };
  }

  if (!content) {
    resp = { mess: '"content" is required' };
  }

  if (!categoryIds) {
    resp = { mess: '"categoryIds" is required' };
  }

  return resp;
};

// feito com a ajuda do repositório do Henrique Zózimo
// e pelo site: https://stackoverflow.com/questions/55225272/map-function-with-async-await
const findCategory = async (categoryIds) => {
  const result = await categoryIds.map((id) => Category.findByPk(id));

  return Promise.all(result).then((res) => res);
};

const create = async (userId, title, content, categoryIds) => {
  const validateExists = validateIfExists(title, content, categoryIds);

  if (validateExists.mess) {
    return validateExists;
  }

  const createPost = await BlogPost.create({ userId, title, content });

  console.log(createPost);

  return createPost;
};

const getAll = async () => {
  const listPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return listPosts;
};

const getById = async (id) => {
  const getpostId = await BlogPost.findByPk(
    id,
    {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    },
  );

  if (!getpostId) {
    const resp = { mess: 'Post does not exist' };
    return resp; 
  }

  return getpostId;
};

const validateTitleContent = (title, content) => {
  let resp = false;
  if (!title) {
    resp = { mess: '"title" is required', status: 400 };
  }

  if (!content) {
    resp = { mess: '"content" is required', status: 400 };
  }

  return resp;
};

const validateUser = async (idUser, id) => {
  let resp = false;

  const { userId } = await BlogPost.findByPk(id);

  if (idUser !== userId) {
    resp = { mess: 'Unauthorized user', status: 401 };
  }

  return resp;
};

const update = async (id, userId, reqBody) => {
  if (reqBody.categoryIds) {
    const resp = { mess: 'Categories cannot be edited', status: 400 };
    return resp;
  }

  const validates = validateTitleContent(reqBody.title, reqBody.content);
  if (validates.mess) {
    return validates;
  }

  const userValid = await validateUser(userId, id);
  if (userValid.mess) {
    return userValid;
  }

  await BlogPost.update({ title: reqBody.title, content: reqBody.content }, { where: { id } });

  const newPost = await BlogPost.findByPk(
    id,
    { include: { model: Category, as: 'categories', through: { attributes: [] } } },
  );

  return newPost;
};

module.exports = {
  create,
  findCategory,
  getAll,
  getById,
  update,
};
