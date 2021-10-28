const User = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  UserModel.associate = (models) => {
    UserModel.hasMany(models.BlogPost,
      { foreignKey: 'userId', as: 'blogPosts' });
  };

  return UserModel;
};
module.exports = User;