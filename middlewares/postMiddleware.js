const { BlogPost } = require('../models');

// Comments: Lista de erros
const errors = {
  unauthorizeduser: 'Unauthorized user',
  categoryNotEdited: 'Categories cannot be edited',
  titleRequired: '"title" is required',
  contentRequired: '"content" is required',
  postDoesnotExist: 'Post does not exist',
};

// Comments: Valida se o Post a ser deletado existe.
const validatePostExist = async (req, res, next) => {
  const { id } = req.params;
  
  const post = await BlogPost.findOne({ where: { id } });

  if (!post) return res.status(404).json({ message: errors.postDoesnotExist });

  req.post = post;

  next();
};

// Comments: Valida se o Post a ser alterado pertence ao usuário da requisição.
const validatePostOwner = async (req, res, next) => {
  const { post } = req;
  const userId = req.user.id;
  
  if (post.userId !== userId) return res.status(401).json({ message: errors.unauthorizeduser });

  next();
};

// Comments: Valida que não é possível editar as categorias de um blogpost.
const validateNotEditCategory = async (req, res, next) => {
  const { categoryIds } = req.body;
   
  if (categoryIds) return res.status(400).json({ message: errors.categoryNotEdited });

  next();
};

// Comments: Valida que não possível editar um blogpost sem o campo title.
const validatePostTitleWasInformed = async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: errors.titleRequired }); 
}

  next();
};

// Comments: Valida que não possível editar um blogpost sem o campo content.
const validatePostContentWasInformed = async (req, res, next) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: errors.contentRequired }); 
}

  next();
};

module.exports = {
  validatePostExist,
  validatePostOwner,
  validateNotEditCategory,
  validatePostTitleWasInformed,
  validatePostContentWasInformed,
};