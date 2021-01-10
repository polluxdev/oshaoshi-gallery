const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const config = require('./config');

const globalErrorHandler = require('./controllers/error');

const routes = require('./routes');

const AppError = require('./utils/appError');

const app = express();
const port = config.PORT || 3000;
const apiVersion = config.API_VERSION;

app.use('/public/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());

if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP! Please try again in an hour.'
});

app.use(apiVersion, limiter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use(cors());

app.use(apiVersion, routes);

app.all('*', (req, res, next) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(error);
});

app.use(globalErrorHandler);

const server = app.listen(port, () => {
  console.log(`Listening on PORT: ${port}`);
});

process.on('unhandledRejection', (error) => {
  console.log('UNHANDLED REJECTION!');
  console.log(error);

  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (error) => {
  console.log('UNCAUGHT EXCEPTION!');
  console.log(error.name, error.message);

  server.close(() => {
    process.exit(1);
  });
});
