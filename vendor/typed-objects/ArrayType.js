'use strict';

exports.__esModule = true;
exports['default'] = ArrayType;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _structView = require('./structView');

var _structView2 = _interopRequireDefault(_structView);

var _Storage = require('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

function ArrayType(elementType, length) {
  _utils.assert(elementType._clazz !== _utils.TYPED_OBJECTS, 'not a type');
  _utils.assert(typeof elementType._size === 'undefined', 'element type cannot be of variable length');

  var fixedLength = typeof length !== 'undefined';
  var opaque = elementType._opaque;

  function arrayType(data, byteOffset, data1) {
    var _this = this;

    var view = undefined;
    var viewLength = undefined;
    byteOffset = byteOffset || 0;
    var storage = undefined;

    if (fixedLength) {
      viewLength = length;
      if (data instanceof ArrayBuffer) {
        _utils.assert(opaque, 'cannot create a view of opaque type over an array buffer');
        data = new _Storage2['default'](data, opaque);
      }
      if (data instanceof _Storage2['default']) {
        _utils.assert(byteOffset % elementType._size !== 0, 'ArrayBuffer size must be a multiple of ' + elementType._size);
        storage = data;
        view = elementType._createView(storage, byteOffset);
      } else {
        storage = new _Storage2['default'](new ArrayBuffer(viewLength * elementType._size), opaque);
        view = elementType._createView(storage);
      }
    } else {
      viewLength = data;
      storage = new _Storage2['default'](new ArrayBuffer(viewLength * elementType._size), opaque);
      view = elementType._createView(storage, 0);
    }

    var _loop = function (i) {
      var off = i * elementType._size / elementType._alignment;
      Object.defineProperty(_this, i, {
        configurable: false,
        enumerable: true,
        get: function get() {
          return elementType._getItem(view, off);
        },
        set: function set(value) {
          elementType._setItem(view, off, value);
        }
      });
    };

    for (var i = 0; i < viewLength; i++) {
      _loop(i);
    }

    var opaqueInstance = opaque || storage.opaque;
    this._opaque = opaqueInstance;

    _utils.setMeta(this, 'length', viewLength);

    if (!opaqueInstance) {
      var byteLength = elementType._size * viewLength;

      _utils.setMeta(this, 'byteOffset', byteOffset);
      _utils.setMeta(this, 'byteLength', byteLength);

      this._storage = {
        byteOffset: byteOffset,
        byteLength: byteLength,
        buffer: storage.arrayBuffer
      };
    }

    var dataSrc = fixedLength && !(data instanceof _Storage2['default']) && data || data1;

    if (dataSrc) {
      for (var i = 0, _length = Math.min(viewLength, dataSrc.length); i < _length; i++) {
        this[i] = dataSrc[i];
      }
    }

    Object.preventExtensions(this);
  }

  if (fixedLength) {
    arrayType._size = length * elementType._size;
  }
  arrayType._alignment = elementType._alignment;
  arrayType._createView = _structView2['default'](arrayType);
  arrayType._getItem = function (view, offset) {
    return view.getItem(offset);
  };
  arrayType._setItem = function (view, offset, value) {
    return view.setItem(offset, value);
  };
  arrayType._clazz = _utils.TYPED_OBJECTS;
  arrayType._opaque = opaque;

  _utils.setReadOnly(arrayType, 'variable', !fixedLength);
  _utils.setReadOnly(arrayType, 'elementType', elementType);
  _utils.setReadOnly(arrayType, 'opaque', opaque);
  if (!opaque) {
    if (fixedLength) {
      _utils.setReadOnly(arrayType, 'byteLength', arrayType._size);
    }
    _utils.setReadOnly(arrayType, 'byteAlignment', arrayType._alignment);

    arrayType.storage = function (o) {
      _utils.assert(o._opaque, 'cannot access storage of opaque instance');
      return o._storage;
    };
  }

  return arrayType;
}

module.exports = exports['default'];