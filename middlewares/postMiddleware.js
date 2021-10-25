const { BlogPost } = require('../models');

// Comments: Lista de erros
const errors = {
  unauthorizeduser: 'Unauthorized user',
};

// Comments: Valida se o Post a ser alterado pertence ao usuário da requisição.
const validatePostOwner = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  
  const post = await BlogPost.findOne({ where: { id } });
  
  if (post.userId !== userId) return res.status(404).json({ message: errors.unauthorizeduser });

  next();
};

module.exports = {
  validatePostOwner,
};