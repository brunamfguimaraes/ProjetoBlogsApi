class PostCategoryService {
  constructor(model) {
    this.model = model;

    this.insertPostIds = this.insertPostIds.bind(this);
  }

  async insertPostIds(id, ids) {
    const postIds = ids.map((catId) => ({ postId: id, categoryId: catId }));
    
    await this.model.bulkCreate(postIds);
  }
}

module.exports = PostCategoryService;