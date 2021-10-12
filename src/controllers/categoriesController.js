const categoriesService = require('../services/categoriesService');

async function create(req, res) {
  try {
    const { body } = req;

    const newCategory = await categoriesService.create(body);

    return res.status(201).json(newCategory);
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

async function getAllCategories(_req, res) {
  try {
    const categories = await categoriesService.getAllCategories();

    return res.status(200).json(categories);
  } catch (error) {
    console.log(`An unknown error has occurred: ${error}`);
    return res.status(500).json({ message: 'An unknown error has occurred' });
  }
}

module.exports = {
  create,
  getAllCategories,
};