const {celebrate, Joi} = require('celebrate');
const errorMessages = require('../errors/error-messages');

module.exports.userDataValidator = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email()
        .error(new Joi.ValidationError(errorMessages.incorrectEmail)),
      name: Joi.string()
        .required()
        .min(2)
        .max(30)
        .error(new Joi.ValidationError(errorMessages.incorrectName)),
    })
    .unknown(true),
});
