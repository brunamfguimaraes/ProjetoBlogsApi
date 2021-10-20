const rescue = require('express-rescue');
const controller = require('../controllers/Category');
const { checkBody, authMiddleware } = require('../middlewares');
const { validateToken } = require('../utils');
const { checkName } = require('../validations/Categorie');

const router = (app) => {
  app.route('/categories')
    .get(authMiddleware(validateToken), rescue(controller.getAll))
    .post(checkBody(checkName), authMiddleware(validateToken), rescue(controller.create));
};

module.exports = router;