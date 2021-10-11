class PostController {
  constructor(service, constants) {
    const { statusCode, errorMessage } = constants;
      this.service = service;
      // this.sequelize = sequelize;
      this.statusCode = statusCode;
      this.errorMessage = errorMessage;

      this.createPost = this.createPost.bind(this);
      this.listAllPosts = this.listAllPosts.bind(this);
      this.findById = this.findById.bind(this);
      this.updatePost = this.updatePost.bind(this);
  }

  async createPost(req, res) {
    // const t = await this.sequelize.transaction();
    try {
      const { title, categoryIds, content } = req.body;
      const token = req.headers.authorization;
      const payload = { title, content, categoryIds, token };
      const result = await this.service.createPost(payload);

      res.status(this.statusCode.CREATED).json(result);
    } catch (error) {
      // t.rollback();
      res.status(
        error.statusCode || this.statusCode.SERVER_ERROR,
        ).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const result = await this.service.findById(id);
      res.status(this.statusCode.OK).json(result);
    } catch (error) {
      res.status(error.statusCode || this.statusCode.SERVER_ERROR).json({ message: error.message });
    }
  }

  async listAllPosts(_req, res) {
    try {
      const list = await this.service.listPosts();
      res.status(this.statusCode.OK).json(list);
    } catch (error) {
      res.status(this.statusCode.SERVER_ERROR).json({ message: error.message });
    }
  } 

  async updatePost(req, res) {
    try {
      const { id } = req.params;
      const token = req.headers.authorization;
      const { title, content } = req.body;
      const result = await this.service.updatePost({ title, content }, token, id);
      res.status(200).json(result);
    } catch (error) {
      res.status(this.statusCode.SERVER_ERROR).json({ message: error.message });
    }
  }
}

module.exports = PostController;