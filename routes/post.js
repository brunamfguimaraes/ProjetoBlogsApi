const route = require('express').Router();
const rescue = require('express-rescue');

const tokenValidation = require('../utils/validation/tokenValidation');
const controller = require('../controllers/postController');

route.post('/', rescue(tokenValidation), rescue(controller.createPost));

module.exports = route;
