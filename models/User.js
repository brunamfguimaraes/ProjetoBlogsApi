const User = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'Users',
    });
    user.associate = (models) => {
      user.hasMany(models.BlogPost,
        { foreignKey: 'user_id', as: 'posts' });
    };
  return user;
};

module.exports = User;