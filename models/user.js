const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false });
  user.associate = (models) => {
    user.hasOne(models.BlogPosts, {
      foreignKey: 'userId', as: 'user',
    });
  };
  return user;
};

module.exports = User;