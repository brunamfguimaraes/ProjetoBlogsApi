const express = require('express');

const router = express.Router();
const { verifyToken } = require('../middlewares/validateUser');

const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/').get(verifyToken, getAllUsers).post(createUser);
router.route('/:id').get(verifyToken, getUser);
router.route('/me').delete(verifyToken, deleteUser);

module.exports = router;
