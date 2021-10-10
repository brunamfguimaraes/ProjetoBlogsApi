class CategoryService {
  constructor(model, authService) {
    this.model = model;
    this.authService = authService;
  }

  async createCategory(category) {
    const result = await this.model.create({ name: category });
    return result;
  }
}

module.exports = CategoryService;