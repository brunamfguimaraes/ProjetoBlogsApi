const express = require('express');
const loginService = require('../services/loginService');
const auth = require('../auth/jwtFunctions');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const validatePass = loginService.validatePassword(password);
    if (validatePass.erro) {
      return res.status(validatePass.erro.code).json({ message: validatePass.erro.message });
    }

    const validateEmail = await loginService.validateEmail(email);
    if (validateEmail.erro) {
      return res.status(validateEmail.erro.code).json({ message: validateEmail.erro.message });
    }
    
    const token = auth.createJWT({ email });
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;