class PostService {
  constructor(
    { Post, User, Categ, postCategoryService, categoryService, authService, Constants, BaseError },
  ) {
    this.model = Post;
    this.userModel = User;
    this.categoryModel = Categ;

    this.postCategoryService = postCategoryService;
    this.categoryService = categoryService;
    this.authService = authService;
    
    this.statusCode = Constants.statusCode;
    this.errorMessage = Constants.errorMessage;
    this.ERROR = BaseError;

    this.createPost = this.createPost.bind(this);
    this.verifyCategories = this.verifyCategories.bind(this);
    this.listPosts = this.listPosts.bind(this);
    this.findById = this.findById.bind(this);
    this.updatePost = this.updatePost.bind(this);
  }

  async checkCredentials(postId, token) {
    const post = await this.findById(postId);
    const { id } = this.authService.decode(token);
    if (!post || id !== post.userId) {
      throw new this.ERROR(this.errorMessage.INVALID_USER, this.statusCode.UNAUTHORIZED);
    }
  }

  getAssociation() {
    return [
      { model: this.categoryModel, as: 'categories', through: { attributes: [] } },
      { model: this.userModel, as: 'user' },
    ];
  }

  async verifyCategories(categoryIds) {
    const categoryList = await this.categoryService.findByCategories(categoryIds);
    if (categoryList.length !== categoryIds.length) {
      throw new this.ERROR(this.errorMessage.NOT_FOUND_IDS, this.statusCode.BAD_REQUEST);
    }
  }

  async findById(id) {
    const post = await this.model.findOne({
      where: { id },
      include: this.getAssociation(),
    });
    if (!post) { 
      throw new this.ERROR(this.errorMessage.NOT_FOUND_POST, this.statusCode.NOT_FOUND);
    }
    return post;
  }

  async listPosts() {
    const posts = await this.model.findAll({
      include: this.getAssociation(),
    });
    return posts;
  }

  async createPost({ title, content, categoryIds, token }) {
    await this.verifyCategories(categoryIds);
    const { id } = this.authService.decode(token);
    // const transaction = { transaction: t };
    const date = new Date();
    const data = { title, content, userId: id, published: date, updated: date };
    const result = await this.model.create(data);
    await this.postCategoryService.insertPostIds(result.id, categoryIds);
    
    return { id: result.id, userId: result.userId, title: result.title, content: result.content };
  }

  async updatePost({ title, content }, token, postId) {
    this.checkCredentials(postId, token);
    const [updatedPost] = await this.model.update(
      { title, content },
      { where: { id: postId } },
    );
    const result = await this.findById(postId);
    return result;
  }
}

module.exports = PostService;