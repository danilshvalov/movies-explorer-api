const router = require('express').Router();

const {createMovie, deleteMovie, getUserMovies} = require('../controllers/movie');
const {movieDataValidator} = require('../validators/movie');
const {idValidator} = require('../validators/universal-validators');

router.get('/', getUserMovies);
router.post('/', movieDataValidator, createMovie);
router.delete('/:movieId', idValidator, deleteMovie);

module.exports = router;
