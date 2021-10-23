module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'Users',
      underscored: false,
    });
  User.associate = (models) => {
    User.hasMany(models.BlogPosts, { foreignKey: 'userId', as: 'user' });
  };
  return User;
};
