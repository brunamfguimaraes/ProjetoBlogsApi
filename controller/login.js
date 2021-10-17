const { serviceUserlogin } = require('../services/login');

const controllerUserLogin = async (req, res) => {
  const userRecive = req.body;
  const result = await serviceUserlogin(userRecive);
  if (result.err) {
        const { code, err } = result;
        return res.status(code).json(err);
        }
  const { code, token } = result;
   return res.status(code).json({ token });
};

module.exports = {
  controllerUserLogin,
};