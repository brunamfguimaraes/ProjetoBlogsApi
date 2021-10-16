const Categorie = (sequelize, DataTypes) => {
  const categories = sequelize.define('Categorie', {
    name: DataTypes.STRING,
  });

  return categories;
};

module.exports = Categorie;

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