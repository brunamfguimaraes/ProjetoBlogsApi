const express = require('express');

const {
  createPost,
} = require('../controllers/postsController');

const { validateJWT } = require('../middlewares/tokenJwt');

const router = express.Router();

router.post('/', validateJWT, createPost);
router.get('/', validateJWT);

module.exports = router;
