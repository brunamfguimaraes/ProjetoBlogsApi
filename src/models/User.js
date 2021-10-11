const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('blogs_api', 'root', '123456', { dialect: 'mysql' });

const UserSchema = {
  userName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
};

const User = sequelize.define('User', UserSchema, { timestamps: false, tableName: 'users' });

module.exports = User;