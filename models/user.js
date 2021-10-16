const User = (sequelize, DataTypes) => {
  const UserDefined = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });
  return UserDefined;
};

module.exports = User;