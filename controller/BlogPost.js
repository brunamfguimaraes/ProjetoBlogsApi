const { BlogPost } = require('../models');

const creatPost = async (req, res) => {
  const { idUser: userId } = req;
  const { title, content, categoryIds } = req.body;

  const { dataValues } = await BlogPost.create({ userId, title, content, categoryIds });
  res.status(201).json(dataValues);
};

module.exports = {
  creatPost,
};