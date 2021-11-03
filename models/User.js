const User = (sequelize, DataTypes) => {
  const newUser = sequelize.define(
    'User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      underscored: true,
      tableName: 'Users',
    },
  );

  return newUser;
};

module.exports = User;
