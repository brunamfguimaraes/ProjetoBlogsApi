const { User, BlogPost, Category } = require('../models');

const validateTitle = (title) => {
  if (!title || title === '') {
    return { err: { status: 400, message: '"title" is required' },
    };
  }
  return true;
};

const validateContent = (content) => {
  if (!content || content === '') {
    return { err: { status: 400, message: '"content" is required' },
    };
  }
  return true;
};

const getPostById = async ({ id }) => {
  const post = await BlogPost.findByPk(id,
    { 
      include: [ 
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

  if (post === null) {
    return { err: { status: 404, message: 'Post does not exist' },
    };
  }

  return post;
};

const editPostFunction = async ({ id }, { title, content, categoryIds }, req) => {
  if (validateTitle(title).err) return validateTitle(title);
  if (validateContent(content).err) return validateContent(content);
  if (categoryIds) return { err: { status: 400, message: 'Categories cannot be edited' } };

  const post = await getPostById({ id });
  const email = req.user;
  // console.log('post.UserId', post.userId);
      const { id: userId } = await User.findOne({ where: { email } }); 

  if (post.userId !== userId) return { err: { status: 401, message: 'Unauthorized user' } };

  await BlogPost.update(
    { ...BlogPost, title, content },
    { where: { id } },
  );

  const updatedPost = await BlogPost.findByPk(id, 
  { 
    include: { model: Category, as: 'categories', through: { attributes: [] } },
  });
  return updatedPost;
};

const editBlogPost = async (req, res) => {
  try {
    const post = await editPostFunction(req.params, req.body, req);
    if (post.err) {
      return res.status(post.err.status).json({ message: post.err.message });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  editBlogPost,
};