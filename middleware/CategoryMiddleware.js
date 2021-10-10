class CategoryMiddleware {
  constructor(validSchema, constants, errorHandler) {
    const { statusCode, joiErrors } = constants;
    this.validSchema = validSchema();
    this.joiErrors = joiErrors;
    this.statusCode = statusCode;
    this.BadRequest = errorHandler;

    this.validateCategory = this.validateCategory.bind(this);
    this.validateResult = this.validateResult.bind(this);
    this.getErrorMessage = this.getErrorMessage.bind(this);
  }

  getErrorMessage(errorObj) {
    const { type } = errorObj;

    const errorInput = errorObj.path[0];

    return this.joiErrors[type][errorInput];
  }

  validateResult(result) {
    if (result.error) {
      const errorMessage = this.getErrorMessage(result.error.details[0]);
      throw new this.BadRequest(errorMessage, this.statusCode.BAD_REQUEST);
    }
  }

  validateCategory(req, _res, next) {
    try {
      const { body } = req;
      const result = this.validSchema.validate(body);

      this.validateResult(result);
      
      next();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategoryMiddleware;