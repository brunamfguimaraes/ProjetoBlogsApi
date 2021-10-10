class CategoryService {
  constructor(model, authService) {
    this.model = model;
    this.authService = authService;

    this.createCategory = this.createCategory.bind(this);
    this.listCategories = this.listCategories.bind(this);
  }

  async createCategory(category) {
    const result = await this.model.create({ name: category });
    return result;
  }

  async listCategories() {
    const result = await this.model.findAll();
    return result;
  }
}

module.exports = CategoryService;