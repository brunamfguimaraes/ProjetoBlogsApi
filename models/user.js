module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, defaultValue: false },
    displayName: { type: DataTypes.STRING, defaultValue: 0, allowNull: false },
    email: { type: DataTypes.STRING, defaultValue: 0, allowNull: false },
    password: { type: DataTypes.STRING, defaultValue: 0, allowNull: false },
    image: { type: DataTypes.STRING, defaultValue: 0, allowNull: false },
  },
  {
    timestamps: false,
    tableName: 'Users',
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'BlogPosts' }); 
};
  return User;
};
