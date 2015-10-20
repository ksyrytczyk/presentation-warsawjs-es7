'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _ArrayType = require('./ArrayType');

var _ArrayType2 = _interopRequireDefault(_ArrayType);

var _ReferenceType = require('./ReferenceType');

var _ReferenceType2 = _interopRequireDefault(_ReferenceType);

var _StructType = require('./StructType');

var _StructType2 = _interopRequireDefault(_StructType);

var _ValueType = require('./ValueType');

var _ValueType2 = _interopRequireDefault(_ValueType);

var types = {
  uint8clamped: new _ValueType2['default'](Uint8ClampedArray, 'uint8', 1),
  int8: new _ValueType2['default'](Int8Array, 'int8', 1),
  uint8: new _ValueType2['default'](Uint8Array, 'uint8', 1),
  int16: new _ValueType2['default'](Int16Array, 'int16', 2),
  uint16: new _ValueType2['default'](Uint16Array, 'uint16', 2),
  int32: new _ValueType2['default'](Int32Array, 'int32', 4),
  uint32: new _ValueType2['default'](Uint32Array, 'uint32', 4),
  float32: new _ValueType2['default'](Float32Array, 'float32', 4),
  float64: new _ValueType2['default'](Float64Array, 'float64', 8),
  object: new _ReferenceType2['default']('object'),
  string: new _ReferenceType2['default']('string'),
  any: new _ReferenceType2['default']('any'),
  StructType: _StructType2['default'],
  ArrayType: _ArrayType2['default']
};

module.exports = _utils.assign(function () {
  return _utils.assign(global, types);
}, types);