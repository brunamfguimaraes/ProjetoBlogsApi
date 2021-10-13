const { BlogPost, Category, User } = require('../models');

function validateTitle(title) {
  if (!title) {
    return null;
  }

  return true;
} 

function validateContent(content) {
  if (!content) {
    return null;
  }

  return true;
}

async function validateContegoryIds(categoryIds) {
  if (!categoryIds) {
    return null;
  }

  const categories = await Promise.all(categoryIds
    .map((id) => Category.findOne({ where: { id } })));
    
  const categoriesExists = categories.every((category) => category !== null);
  if (!categoriesExists) {
    return false;
  }

  return categories;
} 

async function create(answer) {
  const { title, content, userId } = answer;
  const newPost = await BlogPost.create({ title, content, userId });

  return newPost;
}

// referência da "query" https://stackoverflow.com/questions/43419514/sequelize-join-models-include-many-to-many
async function getAllPosts() {
  const posts = await BlogPost.findAll(
    {
      include: [{
        model: User,
        as: 'user',
        
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
    },
);

  return posts;
}

module.exports = {
  validateTitle,
  validateContent,
  validateContegoryIds,
  create,
  getAllPosts,
};