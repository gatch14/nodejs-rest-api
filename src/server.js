#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app';
import debugModule from 'debug';
import http from 'http';
const debug = debugModule('nodejs-rest-api:server');
const port = process.env.PORT || '5100';
const server = http.createServer(app);
/**
 * Get port from environment and store in Express.
 */

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
  if (error.syscall !== 'listen')
    throw error;

  const bind = typeof port === 'string' ? `Pipe ${ port}` : `Port ${ port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug.error(`${bind } requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug.error(`${bind } is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${ addr}` : `port ${ addr.port}`;

  debug(`Listening on ${ bind}`);
};

app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
