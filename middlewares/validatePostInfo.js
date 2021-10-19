const Joi = require('joi');

function existsErr(field) { 
  return {
  err: {
    status: 400,
    message: {
      message: `"${field}" is required`,
    },
  }, 
}; 
}

function validateTitle(title) {
  const validation = Joi.string().required().validate(title);
  if (validation.error) return existsErr('title'); 
  return false;
}

function validateContent(content) {
  const validation = Joi.string().required().validate(content);
  if (validation.error) return existsErr('content'); 
  return false;
}

function validateIds(categoryIds) {
  const validation = Joi.array().required().validate(categoryIds);
  if (validation.error) return existsErr('categoryIds');
  return false;
}

function validatePost(req, res, next) {
  const { title, content, categoryIds } = req.body;
  const titIsNotValid = validateTitle(title);
  const conIsNotValid = validateContent(content);
  const idsIsNotValid = validateIds(categoryIds);

  if (titIsNotValid) return res.status(titIsNotValid.err.status).json(titIsNotValid.err.message);
  if (conIsNotValid) return res.status(conIsNotValid.err.status).json(conIsNotValid.err.message);
  if (idsIsNotValid) return res.status(idsIsNotValid.err.status).json(idsIsNotValid.err.message);

  next();
}

module.exports = validatePost;