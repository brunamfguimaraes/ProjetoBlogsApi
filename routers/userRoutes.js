const express = require('express');

const { createUser } = require('../controllers/usersController');

const router = express.Router();

// router.post();

// router.put();

// router.delete();

router.get('/:id', validationDysplayName, createUser);

module.exports = router;