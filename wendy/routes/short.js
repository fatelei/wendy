/**
 * Short handle
 */

var async = require('async');
var WendyStorage = require('../models/short');
var base62 = require('../core/base62');
var config = require('../../config/config.json');

/**
 * Make url to be shorter
 * @param  {Object}   req  The request object
 * @param  {Object}   res  The response object
 * @param  {Function} next
 */
var shortUrl = function (req, res, next) {
  var url = req.params.url;

  async.waterfall([
    function (callback) {
      WendyStorage.getShortHash(url, function (err, hash) {
        if (err) {
          callback(err);
        } else {
          callback(null, hash);
        }
      });
    },
    function (hash, callback) {
      if (hash === null) {
        var ws = new WendyStorage(url);
        ws.save(function (err, id) {
          if (err) {
            callback(err);
          } else {

            hash = base62.b62encode(id);

            WendyStorage.addHash(id, hash, function (err) {
              if (err) {
                callback(err);
              } else {
                callback(null, hash);
              }
            });

          }
        });
      } else {
        callback(null, hash);
      }
    }
  ], function (err, hash) {
    if (err) {
      res.send({
        err: 'Requst failed'
      });
    } else {
      res.send({
        'short': config.hostname + '/' + hash
      });
    }
    next();
  });
};

module.exports = shortUrl;