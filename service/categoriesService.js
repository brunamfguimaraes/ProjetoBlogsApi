const Joi = require('joi');
const jwt = require('../auth/jwt');

const { Categorie } = require('../models');

const validCreatCategorie = (body) => {
  const { name } = body;
  const { error } = Joi.object({
    name: Joi.string().required(),
  }).validate({ name });
  return error;
};

const createCategorie = async (token, body) => {
  const { name } = body;

  const isValidToken = jwt.validateJwt(token);
  if (isValidToken.validToken) return isValidToken;

  const validForm = validCreatCategorie(body);
  if (validForm) return validForm;

  const categorieExist = await Categorie.findOne({ where: { name } });
  if (categorieExist) {
    return { categorieExist: true, error: { message: 'Categorie already registered' } };
  }
  
  const { id } = await Categorie.create({
    name,
  });
  
  return { id, name };
};

const getAllCategories = async (token) => {
  const isValidToken = jwt.validateJwt(token);
  if (isValidToken.status) return isValidToken;

  const getAll = await Categorie.findAll();

  return getAll;  
};

const getCategorieById = async (token, id) => {
  const isValidToken = jwt.validateJwt(token);
  if (isValidToken.status) return isValidToken;

  const getById = await Categorie.findOne({ where: { id } });

  return getById;
};

module.exports = {
  createCategorie,
  getAllCategories,
  getCategorieById,
};
