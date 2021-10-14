const express = require('express');
const CODE = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const secret = 'seusecretdetoken';

const router = express.Router();

router.post('/user', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const newUser = await User.create({ displayName, email, password, image });

    const token = jwt.sign({ data: newUser }, secret, jwtConfig);

    return res.status(CODE.CREATED).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(CODE.CONFLICT).json({ message: 'User already registered' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const login = await User.findOne({ email, password });
    console.log(login);
    if (!login) {
      return res.status(CODE.BAD_REQUEST).json({ message: 'Invalid fields' });
    }

    const token = jwt.sign({ data: login }, secret, jwtConfig);

    return res.status(CODE.OK).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(CODE.NOT_FOUND).json({ message: 'It is a problem' });
  }
});

module.exports = router;

/* Alguns exemplos:

Requisições que precisam de token mas não o receberam devem retornar um código de status 401;

Requisições que não seguem o formato pedido pelo servidor devem retornar um código de status 400;

Um problema inesperado no servidor deve retornar um código de status 500;

Um acesso ao criar um recurso, no nosso caso usuário ou post, deve retornar um código de status 201. */