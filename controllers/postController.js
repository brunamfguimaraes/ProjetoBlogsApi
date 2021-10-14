const rescue = require('express-rescue');
const { BlogPost } = require('../models');

const add = rescue(async (req, res) => {
  console.log('entrando no add');
  const { body } = req;
  console.log(body);
  // erro category
  const newCategory = await BlogPost.create(body);
  console.log('passando no ADD:', newCategory);
  res.status(201).json('newCategory');
});

module.exports = { add };