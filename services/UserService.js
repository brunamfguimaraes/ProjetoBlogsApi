class UserService {
  constructor(model, statusCode, errorMessage) {
    this.model = model;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }

  createUser(user) {
    this.model.insert(user);
  }
}

module.exports = UserService;