const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const {thirdPartyLibErrorHandler} = require('./utils/utils');
const {errorHandler} = require('./middlewares/error-handler');
const {requestLogger, errorLogger} = require('./middlewares/logger');
const {frontendLinks} = require('./utils/config');
const router = require('./routes/index');

const {dbConnectionLink} = require('./utils/config');
const rateLimiter = require('./middlewares/rate-limiter');

const app = express();

const {PORT = 3000} = process.env;

mongoose.connect(dbConnectionLink, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: frontendLinks,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  }),
);

app.use(rateLimiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(thirdPartyLibErrorHandler);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);
