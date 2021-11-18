const { listAll } = require('../../repositories/CategoryRepository');

const validateAuth = require('../../../../middlewares/validateAuth');

  const listCategory = async (auth) => {
    await validateAuth(auth);

    const categories = await listAll();

    return categories;
  };

module.exports = listCategory;