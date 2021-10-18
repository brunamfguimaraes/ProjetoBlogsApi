const { BlogPost } = require('../models');
const { Category } = require('../models/index');
const { User } = require('../models');

const tokenUtil = require('../util/token');

const findCategoryId = async (id) => Category.findOne({ where: { id } });

// SRC https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all 
// Help kyssila

const addBlogPost = async ({ title, content, categoryIds }, token) => {
    const validates = await Promise.all(categoryIds.map((categoryID) => 
    findCategoryId(categoryID)));
    const validateWithNullOrUndefined = validates.filter((validate) => !validate);
    if (validateWithNullOrUndefined.length > 0) {
        return { invalid: '"categoryIds" not found' };
    }
    // Ajuda de renato e carlos margato para relembrar o tópico!
    const { data } = tokenUtil.emailDecoder(token);
    const { id } = await User.findOne({ where: { email: data } });

    const newPost = await BlogPost.create({ title, content, categoryIds, userId: id });

    return newPost;
};

module.exports = {
    addBlogPost,
};

// {
//     title: 'Carros elétricos vão dominar o mundo?',
//     content: 'Já é possivel encontrar diversos carros elétricos em todo o mundo, será esse nosso futuro?',
//     categoryIds: [ 3 ]
//   }