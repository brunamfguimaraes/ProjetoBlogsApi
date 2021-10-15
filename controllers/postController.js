const rescue = require('express-rescue');
const { BlogPost, PostsCategorie } = require('../models');

const add = rescue(async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { payload } = req;
  const newCategory = await BlogPost.create({ title, content, userId: payload.id });
  categoryIds.forEach(async (categoryId) => PostsCategorie.create(
    { postId: payload.id, categoryId },
  ));
  res.status(201).json(newCategory);
});

module.exports = { add };