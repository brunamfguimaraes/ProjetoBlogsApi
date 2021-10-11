class PostService {
  constructor(
    { BlogPost, postCategoryService, categoryService, authService, Constants, BaseError },
  ) {
    const { statusCode, errorMessage } = Constants;
    this.model = BlogPost;
    this.postCategoryService = postCategoryService;
    this.categoryService = categoryService;
    this.authService = authService;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.BAD_REQUEST = BaseError;

    this.createPost = this.createPost.bind(this);
    this.verifyCategories = this.verifyCategories.bind(this);
  }

  async verifyCategories(categoryIds) {
    const categoryList = await this.categoryService.findByCategories(categoryIds);
    if (categoryList.length !== categoryIds.length) {
      throw new this.BAD_REQUEST(this.errorMessage.NOT_FOUND_IDS, this.statusCode.BAD_REQUEST);
    }
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
}

module.exports = PostService;