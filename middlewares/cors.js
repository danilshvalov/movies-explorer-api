const cors = require('cors');
const {frontendLinks} = require('../utils/config');

module.exports = cors({
  origin: frontendLinks,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
});
