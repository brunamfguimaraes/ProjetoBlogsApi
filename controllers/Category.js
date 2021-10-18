const { addCategory } = require('../services/Category');

const requestCreateCategory = async (req, res) => {
  const { name } = req.body;
  const create = await addCategory(name);

  return res.status(201).json(create);
};

module.exports = {
  requestCreateCategory,
};
