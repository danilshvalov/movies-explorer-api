const {celebrate, Joi} = require('celebrate');
const errorMessages = require('../errors/error-messages');

module.exports.signinValidator = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email()
        .error(new Joi.ValidationError(errorMessages.incorrectEmail)),
      password: Joi.string()
        .required()
        .min(8)
        .error(new Joi.ValidationError(errorMessages.incorrectPassword)),
    })
    .unknown(true),
});

module.exports.signupValidator = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .email()
        .error(new Joi.ValidationError(errorMessages.incorrectEmail)),
      password: Joi.string()
        .required()
        .min(8)
        .error(new Joi.ValidationError(errorMessages.incorrectPassword)),
      name: Joi.string()
        .required()
        .min(2)
        .max(30)
        .error(new Joi.ValidationError(errorMessages.incorrectName)),
    })
    .unknown(true),
});
