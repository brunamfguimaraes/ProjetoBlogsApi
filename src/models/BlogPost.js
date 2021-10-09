module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
  'BlogPost',
  {
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  userId: { type: DataTypes.INTEGER, foreignKey: true },
  published: DataTypes.DATE,
  updated: DataTypes.DATE,
  },
  { timestamps: false },
  );

  // timestamps: false, // remove a obrigatoriedade de utilizar os campos `createdAt` e `updatedAt`

  // Employee.associate = (models) => {
  // Employee.hasOne(models.Address,
  // { foreignKey: 'employee_id', as: 'addresses' });
  // };

  BlogPost.associate = (models) => {
  BlogPost.belongsTo(models.User, {
  foreignKey: 'userId',
  as: 'user',
  });
  };
  return BlogPost;
  };