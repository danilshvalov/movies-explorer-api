module.exports.secretKey = process.env.NODE_ENV !== 'production' ? 'super-secret-key' : process.env.JWT_SECRET;

module.exports.dbConnectionLink = process.env.NODE_ENV !== 'production'
  ? 'mongodb://localhost:27017/bitfilmsdb'
  : process.env.DB_LINK;

module.exports.frontendLinks = /.*\/\/*.ds.movies-explorer.nomoredomains.icu/;
