module.exports.secretKey = process.env.NODE_ENV !== 'production' ? 'super-secret-key' : process.env.JWT_SECRET;

module.exports.dbConnectionLink = 'mongodb://localhost:27017/bitfilmsdb';

module.exports.frontendLinks = /.*\/\/*.ds.movies-explorer.nomoredomains.icu/;
