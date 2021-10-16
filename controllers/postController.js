const rescue = require('express-rescue');
const { BlogPost, PostsCategorie } = require('../models');

const add = rescue(async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { payload } = req;
  const newCategory = await BlogPost.create({ title, content, userId: payload.id });
  // categoryIds.forEach(async (categoryId) => PostsCategorie.create(
  //   { postId: payload.id, categoryId },
  // ));
  categoryIds.map(async (categoryId) => PostsCategorie.create({ postId: payload.id, categoryId }));

  return res.status(201).json(newCategory);
});

const findAll = rescue(async (req, res) => {
  const findBlog = await BlogPost.findAll({
     include: [{ all: true, attributes: { exclude: ['password'] } }],
  });

  return res.status(200).json(findBlog);
});

module.exports = { add, findAll };