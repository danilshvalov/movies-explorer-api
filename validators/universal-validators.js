const {celebrate, Joi} = require('celebrate');
const errorMessages = require('../errors/error-messages');
const {idPattern} = require('./validation-utils');

module.exports.idValidator = celebrate({
  params: Joi.object()
    .pattern(idPattern, [Joi.string().length(24).hex()])
    .error(new Joi.ValidationError(errorMessages.incorrectId)),
});
