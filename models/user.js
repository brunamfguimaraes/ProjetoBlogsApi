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

  UserDefined.associate = (models) => {
    UserDefined.hasMany(models.BlogPost,
      { foreignKey: 'id', as: 'blogPost' });
  };

  return UserDefined;
};

module.exports = User;