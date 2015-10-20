'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var OpaqueView = (function () {
  function OpaqueView(storage) {
    _classCallCheck(this, OpaqueView);

    this._storage = storage;
  }

  OpaqueView.prototype.getItem = function getItem(index) {
    return this._storage.opaqueBuffer[index];
  };

  OpaqueView.prototype.setItem = function setItem(index, value) {
    this._storage.opaqueBuffer[index] = value;
  };

  return OpaqueView;
})();

var createOpaqueView = function createOpaqueView(storage) {
  return new OpaqueView(storage);
};
createOpaqueView.BYTES_PER_ELEMENT = 1;

var ReferenceType = (function () {
  function ReferenceType(name) {
    _classCallCheck(this, ReferenceType);

    this._name = name;
  }

  ReferenceType.prototype._getItem = function _getItem(view, offset) {
    return view.getItem(offset);
  };

  ReferenceType.prototype._setItem = function _setItem(view, offset, value) {
    view.setItem(offset, value);
  };

  return ReferenceType;
})();

exports['default'] = ReferenceType;

var proto = ReferenceType.prototype;

proto._size = proto._alignment = 1;
proto._opaque = true;
proto._clazz = _utils.TYPED_OBJECTS;
proto._createView = createOpaqueView;
module.exports = exports['default'];