const jwt = require('jsonwebtoken');
const { BlogPost, User, Category } = require('../models');

const OK = 200;
const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;

const secret = 'mySuperPassword';

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const createPost = async (req, res) => {
  const { user } = req;
  const dataValues = await BlogPost.create({ userId: user.id, ...req.body });
  const token = jwt.sign({ data: dataValues }, secret, jwtConfig);

  if (!token) {
    return res.status(INTERNAL_SERVER_ERROR);
  }

  return res.status(CREATED).json(dataValues);
};

const findAllPosts = async (req, res) => {
  const allPosts = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

  if (!allPosts) {
    return res.status(INTERNAL_SERVER_ERROR);
  }

  return res.status(OK).json(allPosts);
};

module.exports = { createPost, findAllPosts };
