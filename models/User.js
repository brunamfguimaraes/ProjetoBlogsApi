module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    image: DataTypes.STRING,

  }, { timestamps: false });
  
  user.associate = (models) => {
    user.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'blogposts' });
  };

  return user;
};