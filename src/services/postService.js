const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../sequelize/models');

const env = process.env.NODE_ENV || 'development';
const config = require('../sequelize/config/config')[env];

const sequelize = new Sequelize(config);

const createPost = async ({ title, content, userId }, t) => {
  const [published, updated] = [Date.now(), Date.now()];
  const newPost = await BlogPost.create(
    { title, content, userId, published, updated },
    { transaction: t },
  );

  return newPost;
};

const createCategoriesPost = async ({ categoryIds, postId }, t) => {
  console.log('CATEGORY ARRAY:', categoryIds);
  const categoriesCreated = categoryIds.map(
    (categoryId) => ({ postId, categoryId }),
  );
  console.log('CATEGORIESCREATED:', categoriesCreated);
  await PostCategory.bulkCreate(categoriesCreated, { transaction: t });
};

// source: https://github.com/tryber/sd-010-b-project-blogs-api/blob/lucas-martins-da-silva-010-b-project-blogs-api/BlogPost/blogPostService.js#L1
// const categoriesValidation = async (categoriesArr) => {
//   const findOnePromises = categoriesArr.map((id) => Category.findOne({ where: { id } }));
//   const promisesResults = await Promise.all(findOnePromises);
//   const hasAnyoneNull = promisesResults.some((promisesResult) => !promisesResult);
//   if (hasAnyoneNull) throw new RequestError('badRequest', '"categoryIds" not found');
// };

// const createPostTransaction = async ({ title, content, userId, categoryIds }) => {
//   await sequelize.transaction(async (t) => {
//     // await categoriesValidation(categoryIds);
//     const newPost = await createPost({ title, content, userId }, { transaction: t });
//     const postId = newPost.id;
//     await createCategoriesPost({ categoryIds, postId }, { transaction: t });
//     return newPost;
//   });
// };

const createPostTransaction = async ({ title, content, userId, categoryIds }) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const newPost = await createPost({ title, content, userId }, t);
      const postId = newPost.id;
      console.log('SERVICE POSTID:', postId);
      await createCategoriesPost({ categoryIds, postId }, t);
      // console.log('RESULT:', newPost.dataValues);
      return newPost;
    });
    return result;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  createPostTransaction,
};
