const userController = require('../controllers/userController');
const router = require('../controllers/userController');

const { 
  validateDisplayName,
   validatePassword,
    validateEmail, 
 } = require('../middlewares/userValidations');

 const jwtValidations = require('../middlewares/jwtValidations');

router.get('/:id', jwtValidations, userController);
router.post('/', validateDisplayName, validatePassword, validateEmail, userController);
router.get('/', jwtValidations, userController);

module.exports = router;