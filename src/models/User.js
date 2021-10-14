const User = (sequelize, DataTypes) => {
  const myUser = sequelize.define(
    'User',
    {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );

  myUser.associate = (models) => {
    myUser.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
  };

  return myUser;
};

module.exports = User;
