const service = require('../services/categorieService');
const { code: { HTTP_INTERNAL_SERVER_ERROR } } = require('../schema/index');

const createCategorie = async (req, res) => {
  try {
    const categorie = req.body;
    const { code, notification } = await service.createCatagorie(categorie);

    return res.status(code).json(notification);
  } catch (e) {
    console.log(e);
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Internal error' });
  }
};

const getCategories = async (_req, res) => {
  try {
    const { code, notification } = await service.getCategories();

    return res.status(code).json(notification);
  } catch (e) {
    console.log(e);
    return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ message: 'Internal error' });
  }
};

module.exports = {
  createCategorie,
  getCategories,
};
