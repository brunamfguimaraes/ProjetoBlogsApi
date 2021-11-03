const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
  timestamps: false,
  tableName: 'Users',
  underscored: false,
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost,
      { foreignKey: 'id', as: 'posts' });
  };

  return user;
};

module.exports = User;