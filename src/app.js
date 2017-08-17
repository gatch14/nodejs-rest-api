import dbConfig from './config/db';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import methodOverride from 'method-override';
import RouteNotFoundError from './utils/errors/route-not-found';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import oauth from './routes/oauth';
import index from './routes/index';
import books from './routes/books';
import users from './routes/users';

const environment = process.env.NODE_ENV || 'development';
const dbConnConf = dbConfig[ environment ];
const app = express();

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

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(methodOverride());

app.use('/oauth', oauth);
app.use('/', index);
app.use('/books', books);
app.use('/users', users);

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
