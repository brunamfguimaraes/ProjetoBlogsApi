const User = (sequelize, DataTypes) => {
  const insertUser = sequelize.define('User',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    });

  insertUser.associate = (models) => {
    insertUser.hasMany(models.BlogPost, {
      foreginKey: 'userId',
    });
  };

  return insertUser;
};

module.exports = User;