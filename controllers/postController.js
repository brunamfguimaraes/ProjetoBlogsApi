const jwt = require('jsonwebtoken');
const { BlogPost } = require('../models');

const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;

const secret = 'mySuperPassword';

const jwtConfig = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

// const createPost = async (req, res) => {
//   const { user } = req;
//   const { title, content } = req.body;
//   try {
//     const dataValues = await BlogPost.create({ title, content, userId: user.id });
//     return res.status(CREATED).json(dataValues);
//   } catch (error) {
//     console.log(error);
//     res.status(INTERNAL_SERVER_ERROR);
//   }
// };

const createPost = async (req, res) => {
  const { user } = req;
  const dataValues = await BlogPost.create({ userId: user.id, ...req.body });
  const token = jwt.sign({ data: dataValues }, secret, jwtConfig);

  if (!token) {
    return res.status(INTERNAL_SERVER_ERROR);
  }

  return res.status(CREATED).json(dataValues);
};

module.exports = { createPost };
