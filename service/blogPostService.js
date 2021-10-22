const { BlogPost } = require('../models');
const { Category } = require('../models/index');
const { User } = require('../models');

const tokenUtil = require('../util/token');

// Busca categorias
const findCategoryId = async (id) => Category.findOne({ where: { id } });

// cria um array de categorias retornandos todas que forem null ou undefined
const verifyCategories = (categories) => categories.filter((validate) => !validate);

const addBlogPost = async ({ title, content, categoryIds }, token) => {
    // Promise.all torna-se fundamental para resolução de promise de varias consultas no banco
    // SRC https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all 
    // Não lembro de ter utilizado essa função, então recebi uma ajuda da kyssila
    const getAllCategories = await Promise.all(categoryIds.map((categoryID) => 
    findCategoryId(categoryID)));

    const arrayOfNullCategories = verifyCategories(getAllCategories);

    // Verifica se exister valores nulos no array de categorias nulas buscadas na getAllCategories
    if (arrayOfNullCategories.length > 0) {
        return { invalid: '"categoryIds" not found' };
    }
    // Ajuda de renato e carlos margato para relembrar o tópico!
    const { data } = tokenUtil.emailDecoder(token);
    const { id } = await User.findOne({ where: { email: data } });

    const newPost = await BlogPost.create({ title, content, categoryIds, userId: id });

    return newPost;
};

// Consulta ao repositório de : [Letícia Galvão] Vulgo legalvao
// Estava tendo dificuldades para entender a documentação do sequelize de como fazer um inner join

const getAllPost = async () => {
    const posts = await BlogPost.findAll(
      { 
        include: [ 
          { model: User, as: 'user' },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      },
    );
    return posts;
  };
// Estamos trabalhando com banco de dados relacional, a tabela blogpost tem ligação com a tabela de usuarios
// e também a tabela de intermediaria post categories
// https://sequelize.org/master/manual/eager-loading.html

module.exports = {
    addBlogPost,
    getAllPost,
};
