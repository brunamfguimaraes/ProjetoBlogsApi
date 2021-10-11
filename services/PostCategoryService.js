class PostCategoryService {
  constructor(model) {
    this.model = model;

    this.insertPostIds = this.insertPostIds.bind(this);
  }

  async insertPostIds(id, ids) {
    const postIds = ids.map((catId) => ({ postId: id, categoryId: Number(catId) }))[0];

    await this.model.create(postIds);
  }
}

module.exports = PostCategoryService;