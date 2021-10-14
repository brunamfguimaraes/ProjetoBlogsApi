const User = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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

  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts, { foreignKey: 'userId', as: 'user' });
  };

  return Users;
};

module.exports = User;