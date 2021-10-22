const service = require('../services/Categories');

const createCategories = async (req, res) => {
  try {
    const category = req.body;

    const newCategorie = await service.createCategories(category);

    return res.status(201).json(newCategorie);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createCategories,
};
