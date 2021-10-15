const { User } = require('../models');
const { generateToken } = require('../Token/creatToke');

const createUser = async (req, res) => {
 console.log('chegei post');
 const { body } = req;
 const { id } = await User.create(body);
 const token = await generateToken({ ...body, id });
 res.status(201).json({ token });
};

module.exports = {
  createUser,
};