const { createNewCategory } = require('../services/categoriesService');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const response = await createNewCategory(name);
    return res.status(201).json(response);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { createCategory };
