const PostCategoryService = require('../services/PostCategoryService');

const newCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const response = await PostCategoryService.newCategory(name);

    if (response.message) {
      return res.status(400).json(response);
    }

    return res.status(201).json(response);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const response = await PostCategoryService.getCategories();

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message }); 
  }
};

module.exports = {
  newCategory,
  getCategories,
};
