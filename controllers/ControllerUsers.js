const { StatusCodes } = require('http-status-codes');

const ServiceUsers = require('../services/ServiceUsers');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;

    const token = await ServiceUsers.create({
      displayName,
      email,
      password,
      image,
    });

    return res.status(StatusCodes.CREATED).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
