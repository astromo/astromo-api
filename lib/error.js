'use strict';

var ApiError = function(err) {
  this.message = err.message;
  this.code    = err.code;
  this.status  = err.status;
};

ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

module.exports = ApiError;