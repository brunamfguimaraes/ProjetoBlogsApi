const express = require('express');
const categoriesControllers = require('../controllers/categoriesControllers');
const { validateJWT } = require('../middlewares/jwt');

const router = express.Router();

router.post('/', validateJWT, categoriesControllers.addCategory);
router.get('/', validateJWT, categoriesControllers.getAll);

module.exports = router;
