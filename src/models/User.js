module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    ImageData: DataTypes.STRING,
  }, { timestamps: false, tableName: 'Users' });

  return user;
};