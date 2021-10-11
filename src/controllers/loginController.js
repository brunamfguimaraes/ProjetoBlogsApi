const loginService = require('../services/loginService');

async function create(req, res) {
  try {
    const { body } = req;
    const { token } = req;
  
    const login = await loginService.create(body);
    if (!login) {
      return res.status(400).json({ message: 'Invalid fields' });
    }

    return res.status(200).json({ token });
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

module.exports = {
  create,
};