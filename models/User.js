const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, { timestamps: false, tableName: 'Users' });
  User.associate = (_models) => {
    User.hasMany('BlogPost', 
    {
      foreignKey: 'userId',
      as: 'BlogPostID',
    });
  };
  return User;
};

module.exports = createUser;