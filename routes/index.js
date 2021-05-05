const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use(require('./auth'));
router.use('/users', auth, require('./user'));
router.use('/movies', auth, require('./movie'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Ничего не найдено. Проверьте путь и метод запроса'));
});

module.exports = router;
