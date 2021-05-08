const MiddlewareError = require('../errors/MiddlewareError');

module.exports.thirdPartyLibErrorHandler = (err, req, res, next) => {
  if (err) {
    next(
      new MiddlewareError(
        'Во время обработки запроса произошла ошибка. Проверьте правильность запроса',
      ),
    );
  } else {
    next();
  }
};
