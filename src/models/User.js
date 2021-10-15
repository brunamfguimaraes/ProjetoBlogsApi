module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    displayName: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    underscore: true,
    tableName: 'Users',
  });

  return user;
};