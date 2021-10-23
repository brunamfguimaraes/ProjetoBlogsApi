const { BlogPost, Categorie } = require('../models');

const validateField = (title, content, categoryIds) => {
    if (!title) {
        return { message: '"title" is required' };
    }

    if (!content) {
        return { message: '"content" is required' };
    }
   
    if (!categoryIds) {
        return { message: '"categoryIds" is required' };
    }
   
    return true;
};

const notFoundCategory = async (categoryIds) => {
    const categories = await Categorie.findAll({ where: { id: categoryIds } });
    if (categories.length !== categoryIds.length) {
        return { message: '"categoryIds" not found' };
    }

    return true;
};

const createPost = async ({ title, content, userId, categoryIds }) => {
    const fields = validateField(title, content, categoryIds);
    if (fields !== true) return { message: fields.message };
    
    const notCategory = await notFoundCategory(categoryIds);
    console.log(notCategory, 'validação');
    if (notCategory !== true) return { message: notCategory.message };

    const { id } = await BlogPost.create({
        title, content, userId,
    });

    return { id };    
};

module.exports = {
    createPost,
};
