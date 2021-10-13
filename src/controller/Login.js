const express = require('express');
const bodyParser = require('body-parser');

const route = express.Router();
route.use(bodyParser.json());

const userService = require('../service/User');
const { validateLogin } = require('../middlewares/Login');
const httpStatus = require('../httpStatus');
const auth = require('../auth');

route.post('/',
  validateLogin,
  async (req, res) => {
    const { email, password } = req.body;
    const userDoesNotExist = await userService.userDoesNotExist(email, password);
    if (!userDoesNotExist) {
      return res.status(httpStatus.badRequest).json({ message: 'Invalid fields' });
    }
    const token = auth.createToken({ email, password });
    res.status(httpStatus.ok).json({ token });
});

module.exports = route;
