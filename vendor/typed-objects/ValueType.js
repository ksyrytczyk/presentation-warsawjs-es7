'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var ValueType = (function () {
  function ValueType(TypedArray, name, size) {
    _classCallCheck(this, ValueType);

    this._size = this._alignment = size;
    this._name = name;
    this._createView = function (s, byteOffset, length) {
      return new TypedArray(s.arrayBuffer, byteOffset, length);
    };
    this._createView.BYTES_PER_ELEMENT = TypedArray.BYTES_PER_ELEMENT;

    _utils.setReadOnly(this, 'byteLength', size);
    _utils.setReadOnly(this, 'byteAlignment', size);
  }

  ValueType.prototype._getItem = function _getItem(view, offset) {
    return view[offset];
  };

  ValueType.prototype._setItem = function _setItem(view, offset, value) {
    view[offset] = value;
  };

  return ValueType;
})();

exports['default'] = ValueType;

var proto = ValueType.prototype;

proto._opaque = false;
proto._clazz = _utils.TYPED_OBJECTS;
_utils.setReadOnly(proto, 'variable', false);
_utils.setReadOnly(proto, 'opaque', false);
module.exports = exports['default'];