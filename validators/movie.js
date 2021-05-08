const {celebrate, Joi} = require('celebrate');
const errorMessages = require('../errors/error-messages');
const {linkPattern} = require('./validation-utils');

module.exports.movieDataValidator = celebrate({
  body: Joi.object()
    .keys({
      country: Joi.string()
        .required()
        .error(new Joi.ValidationError(errorMessages.incorrectCountry)),
      director: Joi.string()
        .required()
        .error(new Joi.ValidationError(errorMessages.incorrectDirector)),
      duration: Joi.number()
        .required()
        .error(new Joi.ValidationError(errorMessages.incorrectDuration)),
      year: Joi.string().required().error(new Joi.ValidationError(errorMessages.incorrectYear)),
      description: Joi.string()
        .required()
        .error(new Joi.ValidationError(errorMessages.incorrectDescription)),
      image: Joi.string()
        .pattern(linkPattern)
        .required()
        .error(new Joi.ValidationError(errorMessages.incorrectImage)),
      trailer: Joi.string()
        .pattern(linkPattern)
        .required()
        .error(new Joi.ValidationError(errorMessages.incorrectTrailer)),
      thumbnail: Joi.string()
        .pattern(linkPattern)
        .required()
        .error(new Joi.ValidationError(errorMessages.incorrectThumbnail)),
      nameRU: Joi.string()
        .required()
        .error(new Joi.ValidationError(errorMessages.incorrectRussianName)),
      nameEN: Joi.string()
        .required()
        .error(new Joi.ValidationError(errorMessages.incorrectEnglishName)),
    })
    .unknown(true),
});
