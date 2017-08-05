import dbConfig from './config/db';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import RouteNotFoundError from './utils/errors/route-not-found';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import index from './routes/index';
import book from './routes/book';

const environment = process.env.NODE_ENV || 'development';
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

const dbConnConf = dbConfig[ environment ];

mongoose.connect(`mongodb://${dbConnConf.username}:${dbConnConf.password}@${dbConnConf.host}:${dbConnConf.port}/${dbConnConf.database}`, {
  useMongoClient: true
});

if (dbConnConf.debug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    logger(`${collectionName}.${method}`, query, doc);
  });
}

mongoose.connection.on('connected', () => {
  logger(`Mongoose default connection open to ${dbConnConf.host}:${dbConnConf.port}`);
});

app.use('/', index);
app.use('/book', book);

// catch 404
app.use((req, res, next) => {
  next(new RouteNotFoundError(`You have tried to access an API endpoint (${req.url}) that does not exist.`));
});

// error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  switch (err.name) {
    case 'DatabaseError':
      res.status(500).json({ name: err.name, message: err.message });
      break;
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
