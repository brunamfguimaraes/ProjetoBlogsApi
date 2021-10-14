const User = (sequelize, DataTypes) => {
  const insertUser = sequelize.define('User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    });

  return insertUser;
};

module.exports = User;