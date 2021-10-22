const userServices = require('../services/userServices');
require('dotenv');

const createUser = async (req, res) => {
  try {
    const newUser = await userServices.createUser(req.body);
    if (newUser.error) {
      const { status, message } = newUser.error;
      return res.status(status).json({ message });
    }
    res.status(201).json({ ...newUser });
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