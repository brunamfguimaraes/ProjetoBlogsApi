const { Categorie } = require('../models');
const categoriesService = require('../services/categories');

const serverError = 'server error';

const createCategories = async (req, res) => {
    const { name } = req.body;
    try {
    const result = await categoriesService.createCategories(name);

    if (result.status === 201) {
      const categorieData = await Categorie.findOne({ where: { name } });  
      return res.status(result.status).json(categorieData);
    }

    return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: serverError });
    }
};

module.exports = {
    createCategories,
};