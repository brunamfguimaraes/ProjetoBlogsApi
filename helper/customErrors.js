function RequestError(statusName, message) {
  this.name = statusName;
  this.message = message || 'Erro Interno';
  this.stack = (new Error()).stack;
}
RequestError.prototype = Object.create(RequestError.prototype);
RequestError.prototype.constructor = RequestError;

module.exports = RequestError;
