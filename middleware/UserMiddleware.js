class UserMiddleware {
  constructor(validSchema, statusCode, messages, errorHandler) {
    this.validSchema = validSchema();
    this.errorMessages = messages;
    this.statusCode = statusCode;
    this.BadRequest = errorHandler;

    this.validateUser = this.validateUser.bind(this);
  }

  validateResult(result) {
    if (result.error) {
      const { message } = result.error.details[0];
      const { type } = result.error.details[0];
      if (type === 'string.regex.base') {
        throw new this.BadRequest(this.errorMessages.INVALID_EMAIL, this.statusCode.BAD_REQUEST);
      }
      throw new this.BadRequest(message, this.statusCode.BAD_REQUEST);
    }
  }

  validateUser(req, _res, next) {
    try {
      const { body } = req;
      const result = this.validSchema.validate(body);

      this.validateResult(result);

      next();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserMiddleware;