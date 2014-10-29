/**
 * Url <=> hash
 */

var pool = require('./db');

/**
 * Storage the relationship between url and short hash
 * @param {String} url The long url
 */
function WendyStorage(url) {
  this.url = url;
}

module.exports = WendyStorage;

/**
 * Add a new entry
 * @param  {Function} callback
 */
WendyStorage.prototype.save = function (callback) {
  var that = this;

  pool.getConnection(function (err, conn) {
    if (err) {
      return callback(err);
    }

    var data = {
      url: that.url
    };
    var sql = 'INSERT INTO wendy SET ?';
    conn.query(sql, data, function (err, result) {
      conn.release();
      if (err) {
        return callback(err);
      }
      console.log(result.insertId);
      return callback(null, result.insertId);
    });
  });
};


/**
 * Get long url's short hash
 * @param  {String}   url      The long url
 * @param  {Function} callback
 */
WendyStorage.getShortHash = function (url, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      return callback(err);
    }
    var sql = 'SELECT hash FROM wendy WHERE url = ?';
    conn.query(sql, [url], function (err, results) {
      conn.release();
      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(null, null);
      }

      return callback(null, results[0].hash);
    });
  });
};

/**
 * Add hash to related url
 * @param {Int}      id
 * @param {String}   hash
 * @param {Function} callback
 */
WendyStorage.addHash = function (id, hash, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      return callback(err);
    }

    var sql = 'UPDATE wendy SET hash = ? WHERE id = ?';
    conn.query(sql, [hash, id], function (err) {
      conn.release();
      if (err) {
        return callback(err);
      }
      return callback(null);
    });
  });
};

/**
 * Get long url by hash
 * @param  {String}   hash
 * @param  {Function} callback
 */
WendyStorage.getUrl = function (hash, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      return callback(err);
    }
    var sql = 'SELECT url FROM wendy WHERE hash = ?';
    conn.query(sql, [hash], function (err, results) {
      conn.release();

      if (err) {
        return callback(err);
      }

      if (results.length === 0) {
        return callback(null, null);
      }

      return callback(null, results[0].url);
    });
  });
};