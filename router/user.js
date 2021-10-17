const express = require('express');
const { 
  controllerUserRegister,
  controllerUserList,
  controllerUserListById,
 } = require('../controller/user');
const { tokenValidator } = require('../middlewares');

const router = express.Router();

router.post('/', controllerUserRegister);

router.get('/', tokenValidator, controllerUserList);

router.get('/:id', tokenValidator, controllerUserListById);

module.exports = router;