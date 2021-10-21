const rescue = require('express-rescue');
const controller = require('../controllers/categories');
const { authentication } = require('../middlewares/authentication');

function categories(app) {
  app.route('/categories')
    .post(rescue(authentication), rescue(controller.createCategory));
}

module.exports = categories;
