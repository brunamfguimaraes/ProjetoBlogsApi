const { StatusCodes } = require('http-status-codes');
const userService = require('../services/UserService');

const postNewUser = async (req, res) => {
  try {
    console.log('entrou');
    const { displayName, email, password, image } = req.body;
    const { token } = req;
    const payload = { displayName, email, password, image };
    console.log('info user', payload);

    const newUser = await userService.newUser(payload);
    console.log('novo usuario', newUser);
    
    if (newUser.error) {
      console.log('dentro do if');
      return res.status(StatusCodes.CONFLICT).json({ message: newUser.error.message });
    }
    
    return res.status(StatusCodes.CREATED).json({ token });
  } catch (e) {
    console.log('aqui');
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Erro tente mais tarde' });
  }
};

module.exports = postNewUser;
