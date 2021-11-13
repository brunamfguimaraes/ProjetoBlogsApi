const rescue = require('express-rescue');
const categorieController = require('../controllers/categorieController');
const { validateBody, authMiddleware } = require('../middlewares');
const { validateToken } = require('../utils');
const { validateName } = require('../validations/Categorie');

const router = (app) => {
  app.route('/categories')
  .get(authMiddleware(validateToken), rescue(categorieController.getAllCategories))
  .post(validateBody(validateName), authMiddleware(validateToken),
    rescue(categorieController.createCategorie));
};

module.exports = router;
