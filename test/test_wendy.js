/**
 * Wendy unittest
 */

var assert = require('assert');
var request = require('request');

var app = require('../wendy/app');

describe('Wendy unittest', function () {
  before(function () {
    app.listen(8000);
  });

  describe('GET /shorturl', function () {
    it('should be ok', function (done) {
      var url = 'http://localhost:8000/shorturl?url=http://www.baidu.com';
      request.get(url, function (e, r, b) {
        assert.equal(r.statusCode, 200);
        done();
      });
    });
  });
}); 