module.exports = (sequelize, dataTypes) => {
  const user = sequelize.define('User', {
    displayName: dataTypes.STRING,
    email: dataTypes.STRING,
    password: dataTypes.STRING,
    image: dataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Users',
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost,
      { foregnKey: 'userId', as: 'posts' });
  };

  return user;
};