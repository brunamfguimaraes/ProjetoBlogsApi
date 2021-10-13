const User = (sequelize, dataType) => {
  const user = sequelize.define('User', {
  id: { 
    type: dataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  displayName: dataType.STRING,
  email: dataType.STRING,
  password: dataType.STRING,
  image: dataType.STRING,
  },
  { timestamps: false });
  user.associate = (model) => {
    user.hasMany(model.BlogPost, {
      foreignKey: 'userId', as: 'Posts',
    });
  };
  return user;
};

module.exports = User;