const User = (sequelize, DataTypes) => {
  const userModel = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,

  }, {
    timestamps: false,
  });

  userModel.associate = (models) => {
    userModel.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'blogPostsModel' });
  };

  return userModel;
};

module.exports = User;

// hasOne
// belongsTo
// hasMany
// belongsToMany
// No caso de relacionamentos 1:1, utilizamos os métodos hasOne e belongsTo . A tradução literal desses métodos facilita o seu entendimento.
// hasOne = tem um
// belongsTo = pertencente a