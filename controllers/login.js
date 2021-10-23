const services = require('../services/login');
const { generateToken } = require('./user');

async function execLogin(req, res) {  
  await services.execLogin(req.body);
  const token = await generateToken(req.body);
  return res.status(200).json({ token });
}

module.exports = {
  execLogin,
};