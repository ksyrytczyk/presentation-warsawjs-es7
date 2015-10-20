'use strict';

exports.__esModule = true;
exports['default'] = StructType;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utils = require('./utils');

var _structView = require('./structView');

var _structView2 = _interopRequireDefault(_structView);

var _Storage = require('./Storage');

var _Storage2 = _interopRequireDefault(_Storage);

function resize(size, elemSize) {
  var i = size % elemSize;
  return i === 0 ? size : size + elemSize - i;
}

function StructType(schema) {
  var props = Object.getOwnPropertyNames(schema);
  var internals = {};
  var viewTypes = [];
  var fieldOffsets = {};
  var fieldTypes = {};

  var size = 0;
  var maxElemAlign = 0;
  var opaque = false;

  for (var _iterator = props, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var k = _ref;

    var T = schema[k];

    _utils.assert(T._clazz !== _utils.TYPED_OBJECTS, 'property ' + k + ': unknown type');
    _utils.assert(typeof T._size === 'undefined', 'type ' + T._name + ' is variable-length');

    size = resize(size, T._alignment);

    var viewTypeIdx = viewTypes.indexOf(T._createView);
    if (viewTypeIdx < 0) {
      viewTypeIdx = viewTypes.length;
      viewTypes.push(T._createView);
    }

    internals[k] = {
      viewTypeIdx: viewTypeIdx,
      offset: size / T._alignment,
      byteOffset: size,
      type: T
    };

    fieldOffsets[k] = size;
    fieldTypes[k] = T;

    if (T._alignment > maxElemAlign) {
      maxElemAlign = T._alignment;
    }

    size += T._size;
    opaque = opaque || T._opaque;
  }

  size = resize(size, maxElemAlign);

  function structType(struct, offset, struct1) {
    var _this = this;

    var views = new Array(viewTypes.length);

    var storage = undefined;
    if (struct instanceof ArrayBuffer) {
      _utils.assert(opaque, 'cannot create opaque type over ArrayBuffer');

      struct = new _Storage2['default'](struct, false);
    }
    if (struct instanceof _Storage2['default']) {
      storage = struct;
      _utils.assert(opaque && !storage.opaque, 'cannot create opaque type over non-opaque storage');

      for (var i = 0; i < viewTypes.length; i++) {
        views[i] = viewTypes[i](storage, offset, size / viewTypes[i].BYTES_PER_ELEMENT);
      }
    } else {
      storage = new _Storage2['default'](new ArrayBuffer(size), opaque);
      for (var j = 0; j < viewTypes.length; j++) {
        views[j] = viewTypes[j](storage);
      }
    }
    var opaqueInstance = opaque || storage.opaque;

    var _loop = function () {
      if (_isArray2) {
        if (_i2 >= _iterator2.length) return 'break';
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) return 'break';
        _ref2 = _i2.value;
      }

      var name = _ref2;
      var _internals$name = internals[name];
      var viewTypeIdx = _internals$name.viewTypeIdx;
      var offset = _internals$name.offset;
      var type = _internals$name.type;

      var view = views[viewTypeIdx];

      Object.defineProperty(_this, name, {
        configurable: false,
        enumerable: true,
        get: function get() {
          return type._getItem(view, offset);
        },
        set: function set(value) {
          type._setItem(view, offset, value);
        }
      });
    };

    for (var _iterator2 = props, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      var _ret = _loop();

      if (_ret === 'break') break;
    }

    var structSrc = struct && !(struct instanceof _Storage2['default']) ? struct : struct1;

    if (structSrc) {
      for (var _iterator3 = props, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i3 >= _iterator3.length) break;
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) break;
          _ref3 = _i3.value;
        }

        var p = _ref3;

        this[p] = structSrc[p];
      }
    }

    this._opaque = opaqueInstance;

    if (!opaqueInstance) {
      this._storage = {
        buffer: storage.arrayBuffer,
        byteOffset: offset ? offset : 0,
        byteLength: size
      };
    }

    Object.preventExtensions(this);
  }

  structType._size = size;
  structType._alignment = maxElemAlign;
  structType._createView = _structView2['default'](structType);
  structType._createView.BYTES_PER_ELEMENT = size;
  structType._getItem = function (view, offset) {
    return view.getItem(offset);
  };
  structType._setItem = function (view, offset, value) {
    return view.setItem(offset, value);
  };
  structType._clazz = _utils.TYPED_OBJECTS;
  structType._opaque = opaque;

  _utils.setReadOnly(structType, 'variable', false);
  _utils.setReadOnly(structType, 'opaque', opaque);
  _utils.setReadOnly(structType, 'fieldTypes', fieldTypes);
  if (!opaque) {
    _utils.setReadOnly(structType, 'byteLength', size);
    _utils.setReadOnly(structType, 'byteAlignment', maxElemAlign);
    _utils.setReadOnly(structType, 'fieldOffsets', fieldOffsets);

    structType.storage = function (o) {
      _utils.assert(o._opaque, 'cannot access storage of opaque instance');
      return o._storage;
    };
  }

  return structType;
}

module.exports = exports['default'];