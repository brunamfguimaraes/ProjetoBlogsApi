const rescue = require('express-rescue');
const express = require('express');
const controllers = require('../controllers/post');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post('/', checkToken, rescue(controllers.createPost));
router.get('/', checkToken, rescue(controllers.getPosts));

module.exports = router;