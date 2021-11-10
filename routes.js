const { getAllUsers } = require('./controllers/userController');
const { createUser } = require('./controllers/userController');
const { validateEmail } = require('./controllers/userController');
const { checkPassword } = require('./controllers/userController');
const { checkDisplayName } = require('./controllers/userController');

module.exports = {
  getAllUsers,
  createUser,
  validateEmail,
  checkPassword,
  checkDisplayName,
};