const { BlogPost, User, Category } = require('../models');

const creatPost = async (req, res) => {
  const { idUser: userId } = req;
  const { title, content, categoryIds } = req.body;

  const { dataValues } = await BlogPost.create({ userId, title, content, categoryIds });
  res.status(201).json(dataValues);
};

const getAllPosts = async (req, res) => {
  const dataValues = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  }).catch((err) => console.log(err));
  console.log(dataValues);
  res.status(200).json(dataValues);
};

module.exports = {
  creatPost,
  getAllPosts,
};