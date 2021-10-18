const User = (sequelize, DataTypes) => {
    const myUser = sequelize.define('User', {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    });
  
    return myUser;
  };
  
  module.exports = User;
