const express = require('express');
const { validateFilds } = require('../middlewares/validationsCategory');
const { validateJWT } = require('../middlewares/validationToken');
const { createCategory, getAll } = require('../controller/Category');

const router = express.Router();

router.route('/')
 .post(validateFilds, validateJWT, createCategory)
 .get(validateJWT, getAll);

module.exports = router;