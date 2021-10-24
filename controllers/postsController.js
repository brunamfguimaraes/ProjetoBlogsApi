const jwt = require('jsonwebtoken');
const { BlogPost, User, Categorie } = require('../models/index');
const postService = require('../services/postsService');
const { jwtConfig } = require('./userController');

const decodeToken = (token) => {
  const decode = jwt.decode(token, process.env.JWT_SECRET, jwtConfig);
  return decode;
};

const createPost = async (req, res, next) => {
  const { body } = req;
  const { title, content, categoryIds } = body;
  const token = req.headers.authorization;
  const validate = await postService.createPost(body, token);
  if (validate.message) {
    return next(validate);
  }
  const { data } = decodeToken(token);
  const { dataValues: { id: userId } } = await User.findOne({ where: { email: data.email } });
  const { dataValues: { id } } = await BlogPost.create({ title, content, categoryIds, userId });
  return res.status(201).json({ id, ...body, userId });
};

const getPosts = async (req, res, next) => {
  const token = req.headers.authorization;
  const validate = await postService.getPosts(token);
  if (validate.message) {
    return next(validate);
  }
  // https://sequelize.org/master/manual/eager-loading.html
  const findPosts = await BlogPost.findAll({ include: 
    [
      { model: User, as: 'User' },
      { model: Categorie, as: 'Categorie', through: { attributes: [] } },
    ] });
  console.log(findPosts, 'FIND');
  return res.status(200).json(findPosts);
};

module.exports = {
  createPost,
  getPosts,
};