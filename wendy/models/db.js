/**
 * Db connection
 */

var mysql = require('mysql');
var config = require('../../config/config.json');
var pool = mysql.createPool(config.database);

module.exports = pool;