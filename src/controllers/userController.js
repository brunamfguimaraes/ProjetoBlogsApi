const express = require('express');
const Sequelize = require('sequelize');
const { User } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);
const UserRouter = express.Router();

UserRouter.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const result = await sequelize.transaction(async (t) => {
      const user = await User.create({ displayName, email, password, image }, { transaction: t });

      return user;
    });
    
    return res.status(201).send({ message: 'Usuário criado com sucesso', user: result });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

module.exports = UserRouter;
