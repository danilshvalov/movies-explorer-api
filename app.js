const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();

const {thirdPartyLibErrorHandler} = require('./utils/utils');
const {requestLogger, errorLogger} = require('./middlewares/logger');
const {dbConnectionLink} = require('./utils/config');

const app = express();

const {PORT = 3000} = process.env;

mongoose.connect(dbConnectionLink, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// middlewares
app.use(require('./middlewares/cors'));
app.use(require('./middlewares/rate-limiter'));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(thirdPartyLibErrorHandler);
// --------------------------

app.use(requestLogger);

// routing
app.use(require('./routes/index'));

app.use(errorLogger);

// main error handling
app.use(require('./middlewares/error-handler'));

app.listen(PORT);
