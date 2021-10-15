const express = require('express');

const router = express.Router();
const controller = require('../controllers/categorieController');
const { checkToken, validateJWT } = require('../middlewares/jwtValidations');
const { validateName } = require('../middlewares/genericValidations');

router.post('/', checkToken, validateJWT, validateName, controller.createCategorie);

module.exports = router;
