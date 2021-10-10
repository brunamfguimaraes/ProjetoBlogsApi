class AuthService {
  constructor({ jwt, jwtConfig, secret, constants, errorHandler }) {
    const { statusCode, errorMessage } = constants;
    this.jwt = jwt;
    this.config = jwtConfig;
    this.secret = secret;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.BAD_REQUEST = errorHandler;

    this.sign = this.sign.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  authenticateUser(databaseValue, reqValue) {
    if (!databaseValue
      || databaseValue.email !== reqValue.email
      || databaseValue.password !== reqValue.password) {
        throw new this.BAD_REQUEST(this.errorMessage.INVALID_FIELDS, this.statusCode.BAD_REQUEST);
    }

    const { displayName, email } = databaseValue;

    return this.sign({ displayName, email });
  }

  sign(data) {
    const token = this.jwt.sign(data, this.secret, this.config);

    return token;
  }
}

module.exports = AuthService;