const HTTP_REST = require('../HTTPErrosAndMessages');

const { statusCode } = HTTP_REST;
const postService = require('../service/blogPostService');

// Preciso Validar o usuario fazer o login e entregar o token
const addPost = async (req, res) => {
    const newPost = await postService.addBlogPost(req.body, req.headers.authorization);
    if (newPost.invalid) {
        return res.status(statusCode.WRONG_FORMAT).json({ message: newPost.invalid });
    }
   return res.status(statusCode.CREATED).json(newPost);
};

const getAllPost = async (_req, res) => {
    const allPost = await postService.getAllPost();
    console.log(allPost, 'todos os Posts');
   return res.status(statusCode.OK).json(allPost);
};

module.exports = {
    addPost,
    getAllPost,
};