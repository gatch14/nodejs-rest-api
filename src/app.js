import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import RouteNotFoundError from './utils/errors/route-not-found';
import index from './routes/index';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);

// catch 404
app.use((req, res, next) => {
  next(new RouteNotFoundError(`You have tried to access an API endpoint (${req.url}) that does not exist.`));
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  switch (err.name) {
    case 'BadRequestError':
      res.status(400).json({ name: err.name, message: err.message });
      break;
    case 'ForbiddenError':
      res.status(403).json({ name: err.name, message: err.message });
      break;
    case 'RouteNotFoundError':
      res.status(404).json({ name: err.name, message: err.message });
      break;
    default:
      res.status(400).json({ name: err.name, message: err.message });
  }
});

module.exports = app;
