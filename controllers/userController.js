const {
  createNewUser,
  fieldLength,
  validateEmail,
  emptyFields,
  registeredEmail,
  allUsers,
  oneUser,
} = require('../services/userService');

const verifyFieldsEmpty = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!password) await emptyFields('password');
    if (!email) await emptyFields('email');
    next();
  } catch (e) {
    if (e.name === 'emptyError') {
      const response = e.message;
      return res.status(400).json({ message: response });
    }
  }
};

const verifyFieldsLength = async (req, res, next) => {
  try {
    const { displayName, password } = req.body;
    await fieldLength(displayName, password);
    next();
  } catch (e) {
    if (e.name === 'lengthError') {
      const response = e.message;
      return res.status(400).json({ message: response });
      }
    }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    await validateEmail(email);
    next();
  } catch (e) {
    if (e.name === 'emailError') {
      const response = e.message;
      return res.status(400).json({ message: response });
      }
    }
};

const verifyRegisteredUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    await registeredEmail(email);
    next();
  } catch (e) {
    if (e.name === 'registeredUser') {
      const response = e.message;
      return res.status(409).json({ message: response });
      }
    }
};

const createUser = async (req, _res, next) => {
  const { displayName, email, password, image } = req.body;
  await createNewUser(displayName, email, password, image);
  req.statusCode = 201;
  next();
};

const getAllUsers = async (_req, res) => {
  const response = await allUsers();
  res.status(200).json(response);
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await oneUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  verifyFieldsLength,
  verifyEmail,
  verifyFieldsEmpty,
  verifyRegisteredUser,
  getAllUsers,
  getOneUser,
};
