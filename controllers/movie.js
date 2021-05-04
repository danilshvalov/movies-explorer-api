const Movie = require('../models/movie');

module.exports.getUserMovies = (req, res, next) => Movie.find({owner: req.user._id})
  .then((data) => res.send(data))
  .catch(next);

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;

  Movie.create({
    owner: req.user._id,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  })
    .then((data) => res.send(data))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const {movieId} = req.params;
  Movie.deleteAsOwner({movieId, userId: req.user._id})
    .then((data) => res.send(data))
    .catch(next);
};
