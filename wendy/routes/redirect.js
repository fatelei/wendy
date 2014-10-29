/**
 * Redirect short url to long url
 */

var WendyStorage = require('../models/short');

/**
 * Redirect to long url
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
var redirect = function (req, res, next) {
  var hash = req.params.hash;

  WendyStorage.getUrl(hash, function (err, url) {
    if (err) {
      res.send(500, {
        err: 'Redirect failed'
      });
    } else {
      console.log('redirect to: ' + url);
      res.header('Location', url);
      res.send(301);
    }
    next();
  });
};

module.exports = redirect;