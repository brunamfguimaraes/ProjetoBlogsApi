const CODE = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { BlogPost/* , Category  */ } = require('../models');

const createPost = async (req, res) => {
  try {
    const payload = jwt.decode(token)
    const { userId, title, content } = req.body;
    const post = await BlogPost.create({
      title,
      content,
      UserId: userId,
      // urilizar o where fazendo referência ao category id
      // where: { categoryIds: id }, 
      // include: [{ model: Category, as: 'Category' }],
    });

    if (post === null) {
      return res.status(CODE.NOT_FOUND).send({ message: 'Post não encontrado' });
    }
    res.status(CODE.CREATED).json(post);
  } catch (error) {
    res.status(CODE.INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  createPost,
};
