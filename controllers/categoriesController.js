const categoriesServices = require('../services/categoriesServices');

const createCategory = async (req, res) => {
  try {
    const newCategory = await categoriesServices.createCategory(req.body);
    if (newCategory.error) {
      const { status, message } = newCategory.error;
      return res.status(status).json({ message });
    }
    res.status(201).json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went Wrong. Please Try again');
  }
};

const getAllCategories = async (req, res) => {
  try {
    const users = await categoriesServices.getAllCategories();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong. Please try again');
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};

// getAll (findAll)
// getById (findByPk)
// create (create)
// update (update)
// remove (destroy)