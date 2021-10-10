class UserService {
  constructor(model, authService, constants) {
    const { statusCode, errorMessage } = constants;
    this.model = model;
    this.authService = authService;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    
    this.createUser = this.createUser.bind(this);
  }

  async createUser({ displayName, email, password, image }) {
    const data = { displayName, email, password, image };
    const payload = { displayName, email };

    await this.model.create(data);
    const token = this.authService.sign(payload);
    
    return token;
  }
}

module.exports = UserService;