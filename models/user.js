const User = (sequelize, DataTypes) => {
  const table = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { 
    timestamps: false,
    tableName: 'Users',
   });

   table.associate = (models) => {
     table.hasMany(models.BlogPost, 
      { foreignKey: 'userId', as: 'BlogPosts' });
   };

  return table;
};

module.exports = User;