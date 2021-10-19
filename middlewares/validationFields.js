const { User, Categorie } = require('../models');
const messages = require('../helpers/validationMessages');

const validateFields = (req, res, next) => {
  const { email, password } = req.body;

  if (email === undefined) return res.status(400).json(messages.REQUIRED_EMAIL);

  if (password === undefined) return res.status(400).json(messages.REQUIRED_PASSWORD);

  next();
};

const validateDisplayName = (req, res, next) => {
  try {
    const { displayName } = req.body;

    if (displayName.length < 8) return res.status(400).json(messages.DISPLAY_NAME_LENGTH);

    next();
  } catch (error) {
    return res.status(500).json(messages.ERROR);
  }
};

const validateEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) return res.status(400).json(messages.VALID_EMAIL);

    next();
  } catch (error) {
    return res.status(500).json(messages.ERROR);
  } 
};

const emptyFields = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email.length === 0) return res.status(400).json(messages.EMPTY_EMAIL);

    if (password.length === 0) return res.status(400).json(messages.EMPTY_PASSWORD);

    next();
  } catch (error) {
    return res.status(500).json(messages.ERROR);
  } 
};

const validatePassword = (req, res, next) => {
  try {
    const { password } = req.body; 
    const passwordLength = 6;

    if (password && password.length !== passwordLength) {
      return res.status(400).json(messages.PASSWORD_LENGTH);
    }

    next();
  } catch (error) {
    return res.status(500).json(messages.ERROR);
  }
};

const emailExists = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkEmailUser = await User.findOne({ where: { email } });

    if (checkEmailUser) return res.status(409).json(messages.ALREADY_EXISTS);
    
    next();
  } catch (error) {
    return res.status(500).json(messages.ERROR);
  }
};

const userExists = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkEmailUser = await User.findOne({ where: { email, password } });

    if (!checkEmailUser) return res.status(400).json(messages.FIELDS_NOT_EXISTS);
    
    next();
  } catch (error) {
    return res.status(500).json(messages.ERROR);
  }
};

const existCategories = async (categoryIds) => {
  const getIds = await Categorie.findAll();
  const getIdDb = getIds.map((id) => id.dataValues.id);

  if (!categoryIds) return false;

  const array2 = getIdDb.toString();
  const array1 = categoryIds.toString();
  const compare = array2.includes(array1);

  if (compare === false || categoryIds.length === 0) return null;

  return compare;
}; 

module.exports = {
  validateDisplayName,
  validateEmail,
  emptyFields,
  validatePassword,
  emailExists,
  userExists,
  validateFields,
  existCategories,
};