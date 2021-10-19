const rescue = require('express-rescue');
const controller = require('../controllers/Categorie');
const { checkBody, authMiddleware } = require('../middlewares');
const { validateToken } = require('../utils');
const { blogBody } = require('../validations/BlogPost');

const router = (app) => {
  app.route('/post')
    .post(checkBody(blogBody), (req, res) => res.send('ok'));
};

module.exports = router;