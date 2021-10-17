const status = require('http-status');
const { BlogPost, User } = require('../models');
const postService = require('../services/postService');

const validTitle = async (req, res, next) => {
  const { title } = req.body;

  const isValidTitle = postService.isValidTitle(title);
  
  if (isValidTitle) {
    return res.status(status.BAD_REQUEST).json({ message: isValidTitle });
  }
    
  next();
};

const validContent = async (req, res, next) => {
  const { content } = req.body;

  const isValidContent = postService.isValidContent(content);
  
  if (isValidContent) {
    return res.status(status.BAD_REQUEST).json({ message: isValidContent });
  }
    
  next();
};

const validCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;

  const isValidCategoryIds = postService.isValidCategoryIds(categoryIds);
  
  if (isValidCategoryIds) {
    return res.status(status.BAD_REQUEST).json({ message: isValidCategoryIds });
  }
    
  next();
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.email;
  const published = new Date('2011-08-01T19:58:00.000Z');
  const updated = new Date('2011-08-01T19:58:51.000Z');

  const user = await User.findOne({ where: { email } });
  const post = await BlogPost.create({ 
    userId: user.dataValues.id,
    title,
    content,
    published,
    updated });

  // const arrayPostCat = categoryIds.map((id) => ({ postId: post.id, categoryId: id,
  // }));

  // console.log(arrayPostCat);
  // await PostsCategory.create({ postId: 12, categoryId: 1 });
  return res.status(status.CREATED).json({ id: post.id,
    userId: user.dataVaslues.id,
    title,
    content, 
    });
};

const getPost = async (_req, _res) => {
  // const posts = await BlogPost.findAll();
  // const users = await User.findAll();
  // const categories = await Category.findAll();

  // const listPosts = posts.map((post) => {
  //   if(post.userId === users.id){
  //     return 
  //   } 
  // });

  // console.log(listPosts);

  // return res.status(status.OK).json(posts);
};

module.exports = { validTitle, getPost, validContent, validCategoryIds, createPost };