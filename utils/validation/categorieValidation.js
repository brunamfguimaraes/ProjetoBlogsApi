const erroMessage = require('../errosCode/erroMessage');

const err = (statusCode) => ({ statusCode });

const nameNotExist = (name) => {
  if (!name) throw err(erroMessage.NAME_NOT_EXIST);
};

module.exports = { nameNotExist };
