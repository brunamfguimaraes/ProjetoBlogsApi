const User = (sequelize, DataTypes) => {
  const userData = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false, tableName: 'Users', 
  });

  userData.associate = (models) => {
    models.BlogPost.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'BlogPost',
    });
  };

  return userData;
};

module.exports = User; 