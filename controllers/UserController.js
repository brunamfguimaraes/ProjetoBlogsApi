class UserController {
  constructor(service, statusCode, errorMessage) {
    this.service = service;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.createUser = this.createUser.bind(this);
  }

  async createUser(req, res) {
      try {
        const { displayName, email, password, image } = req.body;
        const result = await this.service.createUser({ displayName, email, password, image });
        res.status(this.statusCode.CREATED).json({ token: result });
      } catch (error) {
        if (error.parent && error.parent.code === this.statusCode.ER_DUP_ENTRY) {
          res.status(this.statusCode.CONFLICT).json({ message: this.errorMessage.USER_CONFLICT });
        }
        
        res.status(500).json({ message: error.message });
      }
    }
}

module.exports = UserController;