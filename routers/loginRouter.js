const express = require('express'); 
const { createLogin } = require('../controller/loginController');

const router = express.Router();
router.route('/') 
.post(createLogin);

module.exports = router;