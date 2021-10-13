const User = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  return Usuario;
};

module.exports = User;