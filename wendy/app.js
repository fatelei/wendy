/**
 * Wendy application
 */

var restify = require('restify');

// Handlers
var shortUrl = require('./routes/short');
var redirect = require('./routes/redirect');

var server = restify.createServer({
  name: 'wendy'
});

// Add plugins
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

// Add handlers
server.get('/shorturl', shortUrl);
server.get('/:hash', redirect);


module.exports = server;