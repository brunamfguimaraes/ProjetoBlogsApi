const { StatusCodes } = require('http-status-codes');
const userServices = require('../services/userServices');

const addUser = (req, res) => {
  try {
    const user = req.body;
    userServices.addUser(user);
    // console.log(response);
    return res.status(StatusCodes.OK).json({ message: 'ok' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addUser,
};