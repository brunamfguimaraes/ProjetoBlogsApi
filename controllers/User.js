const { User } = require('../models');

const requestCreateUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const createUser = await User.create({ displayName, email, password, image });

    return res.status(201).json(createUser);
  } catch (e) {
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  requestCreateUser,
};
