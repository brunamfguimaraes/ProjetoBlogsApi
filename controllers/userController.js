const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = await User.create({ displayName, email, password, image });
    
    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;

/* Alguns exemplos:

Requisições que precisam de token mas não o receberam devem retornar um código de status 401;

Requisições que não seguem o formato pedido pelo servidor devem retornar um código de status 400;

Um problema inesperado no servidor deve retornar um código de status 500;

Um acesso ao criar um recurso, no nosso caso usuário ou post, deve retornar um código de status 201. */