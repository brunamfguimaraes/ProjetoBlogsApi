const { ServiceUserRegister, serviceUserList } = require('../services/user');

const controllerUserRegister = async (req, res) => {
  try {
    const userRecive = req.body;
    const result = await ServiceUserRegister(userRecive);
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

const controllerUserList = async (_req, res) => {
  const result = await serviceUserList();
  const { code, allUsers } = result;
  return res.status(code).json(allUsers.message);
};

module.exports = {
  controllerUserRegister,
  controllerUserList,
};