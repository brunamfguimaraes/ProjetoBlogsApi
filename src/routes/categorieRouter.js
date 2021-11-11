const rescue = require('express-rescue');
const categorieController = require('../controllers/categorieController');
const { validateBody, authMiddleware } = require('../middlewares');
const { validateToken } = require('../utils');
const { validateName } = require('../validations/Categorie');

const router = (app) => {
  app.route('/categories')
  .post(validateBody(validateName), authMiddleware(validateToken),
    rescue(categorieController.createCategorie))
  .get(authMiddleware(validateToken), rescue(categorieController.getAllCategories));
};

module.exports = router;
