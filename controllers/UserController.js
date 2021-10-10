class UserController {
  constructor(service, constants) {
    const { statusCode, errorMessage, sequelizeCodes } = constants;
    this.service = service;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.sequelizeCodes = sequelizeCodes;
    
    this.createUser = this.createUser.bind(this);
    this.listUsers = this.listUsers.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  async createUser(req, res) {
      try {
        const { displayName, email, password, image } = req.body;
        const token = await this.service.createUser({ displayName, email, password, image });
        res.status(this.statusCode.CREATED).json({ token });
      } catch (error) {
        if (error.parent && error.parent.code === this.sequelizeCodes.ER_DUP_ENTRY) {
          res.status(this.statusCode.CONFLICT).json({ message: this.errorMessage.USER_CONFLICT });
        }
    
        res.status(500).json({ message: error.message });
      }
    }

  async listUsers(_req, res) {
    try {
      const users = await this.service.listUsers();
      res.status(this.statusCode.OK).json(users);
    } catch (error) {
      res.status(this.statusCode.SERVER_ERROR).json({ message: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await this.service.getUser(id);
      res.status(this.statusCode.OK).json(user);
    } catch (e) {
      res.status(e.statusCode).json({ message: e.message });
    }
  }
}

module.exports = UserController;