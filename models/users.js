const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { 
      timestamps: false,
      tableName: 'Users' });

  user.associate = (models) => {
    user.hasMany(models.BlogPost,
      { foreginKey: 'userId',
        as: 'user' });
  };
  return user;
};

module.exports = User;