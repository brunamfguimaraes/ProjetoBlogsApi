const { ServiceUserRegister } = require('../services/user');

const controllerUserRegister = async (req, res) => {
  try {
    const userRecive = req.body;
    const result = await ServiceUserRegister(userRecive);
    console.log(result, 'resul cont');
    if (result.err) {
      const { code, err } = result;
      return res.status(code).json(err);
    }
    const { code, token } = result;
 return res.status(code).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  controllerUserRegister,
};