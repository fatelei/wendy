/**
 * Base62 encode
 */


var config = require('../../config/config.json');

/**
 * Base62 encode
 * @param  {Int}      id
 * @param  {Function} callback
 */
var b62encode = function (id) {
  var hashDigits = [];
  var i = 0;
  var remainder = 0;

  while (id > 0) {
    remainder = id % 62;
    id = parseInt(id / 62, 10);
    hashDigits.push(remainder);
  }

  var hash = '';
  for (i = 0; i < hashDigits.length; i++) {
    hash += config.alphabet[hashDigits[i]];
  }
  return hash;
};

module.exports = {
  b62encode: b62encode
};