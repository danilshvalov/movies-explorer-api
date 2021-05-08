const mongoose = require('mongoose');
const {validateLink} = require('../validators/validation-utils');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: (link) => validateLink(link),
  },
  trailer: {
    type: String,
    required: true,
    validate: (link) => validateLink(link),
  },
  thumbnail: {
    type: String,
    required: true,
    validate: (link) => validateLink(link),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

// проверяем права пользователя, если все хорошо - возвращаем id фильма
movieSchema.statics.deleteAsOwner = function ({movieId, userId}) {
  if (!movieId || !userId) {
    throw new BadRequestError('Переданы некорректные данные для удаления фильма');
  }
  return this.findById(movieId).then((movie) => {
    if (!movie) {
      throw new NotFoundError(`Фильм с id «${movieId}» не найден`);
    }
    // сравнение не строгое, так как сравниваем разные типы
    // eslint-disable-next-line eqeqeq
    if (movie.owner != userId) {
      throw new ForbiddenError('У вас недостаточно прав для удаления этого фильма');
    }
    return this.findByIdAndDelete(movieId);
  });
};

module.exports = mongoose.model('movie', movieSchema);
