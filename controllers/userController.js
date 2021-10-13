// const { User } = require('../models');
const { createNewUser } = require('../services/userService');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const response = await createNewUser(displayName, email, password, image);
  if (response.status === 'fieldLength') {
    return res.status(400).json(response.message);
  } if (response.status === 'emailInvalid') {
    return res.status(400).json(response.message);
  } if (response.status === 'emptyField') {
    return res.status(400).json(response.message);
  } if (response.status === 'registered') {
    return res.status(400).json(response.message);
  } 
  return res.status(201).json(response.message);
};

module.exports = { 
  createUser,
};
