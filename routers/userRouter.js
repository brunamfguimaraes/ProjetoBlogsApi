const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

// Rota para Adicionar usuários
// O campo displayName deverá ser uma string com no mínimo de 8 caracteres;
// O campo email será considerado válido se tiver o formato <prefixo>@<domínio> e se for único. Ele é obrigatório.
// A senha deverá conter 6 caracteres. Ela é obrigatória.
// Status OK! retornar um token JWT:
const { 
    WrongdisplayName,
    WrongEmail,
    WrongPassword,
   
     } = require('../middlewares/userValidate');

router.post('/', WrongdisplayName, WrongEmail, WrongPassword, userController.addUser); 

router.get('/', userController.addUser); 

router.get('/:id', userController.addUser); 

module.exports = router;