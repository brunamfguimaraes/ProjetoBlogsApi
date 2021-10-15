const User = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false, tableName: 'Users', 
  });

  Usuario.associate = (models) => {
    models.BlogPost.hasMany(models.BlogPost, {
      foreignKey: 'userId', as: 'BlogPost',
    });
  };

  return Usuario;
};

module.exports = User;