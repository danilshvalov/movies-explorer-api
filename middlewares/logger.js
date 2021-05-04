const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');
const fs = require('fs');

// для удобства логи сохраняются в отдельную папку
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// включаем request.body в логирование
expressWinston.requestWhitelist.push('body');
// исключаем пароль пользователя
expressWinston.bodyBlacklist.push('password');

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({filename: path.join(logDir, 'request.log')}),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({filename: path.join(logDir, 'error.log')}),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
