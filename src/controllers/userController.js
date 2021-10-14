const express = require('express');

const router = express.Router();

const { User } = require('../../models/User');

router.get('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const { id } = await User.create({ displayName, email, password, image });

    return res.status(201).json({ id, displayName, email, image });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: '' });
  }
});

/* Alguns exemplos:

Requisições que precisam de token mas não o receberam devem retornar um código de status 401;

Requisições que não seguem o formato pedido pelo servidor devem retornar um código de status 400;

Um problema inesperado no servidor deve retornar um código de status 500;

Um acesso ao criar um recurso, no nosso caso usuário ou post, deve retornar um código de status 201. */