const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('Users',
  {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  User.associate = (_models) => {
    User.hasOne('BlogPost', 
    {
      foreignKey: 'userId',
      as: 'id',
    });
  };
  return User;
};

module.exports = createUser;