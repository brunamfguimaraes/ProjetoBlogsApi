const { User } = require('../models');
require('dotenv');

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log(newUser);
    res.status(201).json({ ...newUser.dataValues });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went Wrong. Please Try again');
  }
};

module.exports = {
  createUser,
};

// getAll (findAll)
// getById (findByPk)
// create (create)
// update (update)
// remove (destroy)