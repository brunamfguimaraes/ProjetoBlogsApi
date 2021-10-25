const { BlogPost } = require('../models');

const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;

const createPost = async (req, res) => {
  const { user } = req;
  try {
    const dataValues = await BlogPost.create({ userId: user.id, ...req.body });
    return res.status(CREATED).json(dataValues);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR);
  }
};

module.exports = { createPost };
