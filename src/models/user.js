const User = (seq, DataTypes) => {
  const user = seq.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false, tableName: 'Users',
  });

  user.associate = (models) => {
    user.hasMany(models.BlogPost, { as: 'blogPosts', foreignKey: 'userId' });
  };

  return user;
};

module.exports = User;
