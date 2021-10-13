const User = (sequelize, DataTypes) => {
  const UserIn = sequelize.define('User', {
    DisplayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  return UserIn;
};

module.exports = User;