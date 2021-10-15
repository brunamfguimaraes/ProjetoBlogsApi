const { Op } = require('sequelize');
const { BlogPost, PostsCategorie, Categorie } = require('../models');
const Error = require('../utils/createObjError');

const createPostCategory = (postId) => (categoryId) =>
  PostsCategorie.create({ postId, categoryId });

const categoryCheck = (categoryId) => Categorie.findByPk(categoryId);

const create = async (userId, title, categoryIds, content) => {
  const categories = categoryIds.map(categoryCheck);
  return Promise.all(categories).then(async (resolve) => {
    const categoryValid = resolve.every((item) => item);
    if (!categoryValid) return Error.badRequest('"categoryIds" not found');
    const { id } = await BlogPost.create({ userId, title, content });
    categoryIds.forEach(createPostCategory(id));
    return { id, userId, title, content };
  });
};

const include = ['user', 'categories'];

const findAll = async () => BlogPost.findAll({ include });

const findByPk = async (id) => {
  const post = await BlogPost.findByPk(id, { include });
  if (!post) return Error.notFound('Post does not exist');
  return post;
};

const update = async (id, updates) => {
  if (updates.categoryIds) return Error.badRequest('Categories cannot be edited');
  await BlogPost.update(updates, { where: { id } });
  const { title, content, userId, categories } = await findByPk(id);
  return { title, content, userId, categories };
};

const findTitle = async (text) =>
  BlogPost.findAll({
    where: {
      [Op.or]: [{ title: { [Op.regexp]: text } }, { content: { [Op.regexp]: text } }],
    },
    include,
  });

const destroy = async (id) => BlogPost.destroy({ where: { id } });

module.exports = {
  create,
  findAll,
  findByPk,
  findTitle,
  update,
  destroy,
};
