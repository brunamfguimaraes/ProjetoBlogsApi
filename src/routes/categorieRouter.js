const rescue = require('express-rescue');
const controller = require('../controllers/User');
const { checkBody, authMiddleware } = require('../middlewares');
const { validateToken } = require('../utils');
const { checkName } = require('../validations/Categorie');

const router = (app) => {
  app.route('/categories')
    .post(checkBody(checkName), authMiddleware(validateToken), (req, res) => res.send('ok'));
};

module.exports = router;