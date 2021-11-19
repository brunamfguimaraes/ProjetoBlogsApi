const route = require('express').Router();
const rescue = require('express-rescue');

const tokenValidation = require('../utils/validation/tokenValidation');
const controller = require('../controllers/postController');

route.post('/', rescue(tokenValidation), rescue(controller.createPost));
route.get('/', rescue(tokenValidation), rescue(controller.getAll));

module.exports = route;
