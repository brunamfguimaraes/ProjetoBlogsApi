class UserController {
  constructor(service, statusCode, errorMessage) {
    this.service = service;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.createUser = this.createUser.bind(this);
  }

  createUser(req, res) {
      try {
        const { displayName, email, password, image } = req.body;
        res.status(this.statusCode.CREATED).json({ message: 'ok' });
      } catch (error) {
        console.log(error);
      }
    }
}

module.exports = UserController;