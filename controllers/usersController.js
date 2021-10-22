const { Users } = require('../models');

const createUser = async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    console.log(newUser);

    // const { id, displayName, email, password, image } = newUser;
  } catch (error) {
    console.log(error.message);
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