const Router = require('express');
const { validateToken } = require('../middleware/validateToken');
const categoriesControle = require('../controllers/categoriesController');

const router = Router();

router.post('/categories', validateToken, categoriesControle.create);
router.get('/categories', validateToken, categoriesControle.getAll);

module.exports = router;