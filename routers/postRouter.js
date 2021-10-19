const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');

// Rota para Adicionar usuários
// O campo displayName deverá ser uma string com no mínimo de 8 caracteres;
// O campo email será considerado válido se tiver o formato <prefixo>@<domínio> e se for único. Ele é obrigatório.
// A senha deverá conter 6 caracteres. Ela é obrigatória.
// Status OK! retornar um token JWT:
const { 
    
    WrongTitle,
    WrongContent,
    WrongCategoryID,
     } = require('../middlewares/postValidate');
const { WrongToken } = require('../middlewares/auth');

router.post('/', WrongToken, WrongTitle, WrongContent, WrongCategoryID, postController.addPost); 

router.get('/', WrongToken, postController.getAllPost); 

module.exports = router;