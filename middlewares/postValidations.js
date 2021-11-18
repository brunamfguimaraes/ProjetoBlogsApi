const Joi = require('joi');

const checkUpdateEntries = (updateEntries) => {
    const { error } = Joi.object({
        title: Joi.string().not().empty().required(),
        content: Joi.string().not().empty().required(),
    }).validate(updateEntries);
  
    if (error) {
        return { message: error.details[0].message };
    }
    return {};
};

module.exports = {
    checkUpdateEntries,
};