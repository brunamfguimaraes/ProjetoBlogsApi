const { Categorie } = require('../../models');

const create = async ({ name }) => {
  const newCategorie = await Categorie.create(
    { name }, 
    { attribute: { exclude: ['createdAt', 'updatedAt'] } },
);
  return newCategorie;
};

module.exports = {
  create,
};
