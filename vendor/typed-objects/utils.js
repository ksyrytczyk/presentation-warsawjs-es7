'use strict';

exports.__esModule = true;
exports.assert = assert;
exports.setReadOnly = setReadOnly;
exports.setMeta = setMeta;

function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

var _objectAssign = require('object-assign');

exports.assign = _interopRequire(_objectAssign);
var TYPED_OBJECTS = {};

exports.TYPED_OBJECTS = TYPED_OBJECTS;

function assert(condition, message) {
  if (condition) {
    throw new TypeError(message);
  }
}

function setReadOnly(obj, key, value) {
  Object.defineProperty(obj, key, {
    value: value,
    writable: false,
    configurable: false
  });
}

function setMeta(obj, name, value) {
  Object.defineProperty(obj, name, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: value
  });
}