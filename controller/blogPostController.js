const express = require('express');
const rescue = require('express-rescue');
const { titleIsRequired, contentIsRequired } = require('../middleware/infoValidationPost');
const { categoryIdIsRequired } = require('../middleware/infoValidationPost');
// const { idCategoryIsRequired } = require('../middleware/infoValidationPost');

const { tokenValidation } = require('../middleware/infoValidationUser');
const { getAllBlogPosts } = require('../service/postService');

const router = express.Router();

router.post('/',
titleIsRequired,
contentIsRequired,
categoryIdIsRequired,
tokenValidation,
// idCategoryIsRequired,
rescue(async (req, res) => {
    res.status(200).json('ok');
}));

router.get('/',
rescue(async (req) => {
    console.log(req);
    await getAllBlogPosts();
}));

module.exports = router;