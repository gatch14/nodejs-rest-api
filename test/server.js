import http from 'http';
import assert from 'assert';

import '../src/server.js';

describe('Node Server Running', () => {
  it('should status return 200', (done) => {
    http.get('http://127.0.0.1:3000', (res) => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});

describe('Route not found ', () => {
  it('should status return 404', (done) => {
    http.get('http://127.0.0.1:3000/mockroute', (res) => {
      assert.equal(404, res.statusCode);
      done();
    });
  });
});
