const User = (sequelize, DataTypes) => {
  const table = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
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