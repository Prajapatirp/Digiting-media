const Joi = require('joi');

module.exports = {
    idValidation: Joi.object({
    id: Joi.number().required().empty().messages({
      'number.base': 'Id should be a type of number',
      'number.empty': 'Id code cannot be an empty field',
      'any.required': 'Id is a required field',
    }),
  }),
};