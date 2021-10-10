class AuthService {
  constructor(jwt, jwtConfig, secret) {
    this.jwt = jwt;
    this.config = jwtConfig;
    this.secret = secret;
    this.sign = this.sign.bind(this);
  }

  sign(data) {
    const token = this.jwt.sign(data, this.secret, this.config);

    return token;
  }
}

module.exports = AuthService;