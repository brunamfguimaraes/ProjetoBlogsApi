const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.INTEGER,
    image: DataTypes.STRING,
  }, { timestamps: false });

  user.associate = (models) => {
    user.hasOne(models.BlogPost, {
      foreignKey: 'userId', as: 'user',
    });
  };
  return user;
};

module.exports = User;