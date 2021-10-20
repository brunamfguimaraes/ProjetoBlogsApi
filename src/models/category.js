const Category = (sequelize, DataTypes) => {
  const categories = sequelize.define('Category', {
    name: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: 'Categories',
  });

  return categories;
};

module.exports = Category;

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Categorie extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Categorie.init({
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Categorie',
//   });
//   return Categorie;
// };