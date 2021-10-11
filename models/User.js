module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    // A declaração da Foreign Key é opcional no model
  },
  {
    timestamps: false,
    // tableName: 'Users',
    // underscored: true,
  });

  return User;
};