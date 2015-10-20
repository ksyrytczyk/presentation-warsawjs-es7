// emulate typed array for structs and arrays

"use strict";

exports.__esModule = true;
exports["default"] = structView;

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseStructView = (function () {
  function BaseStructView(storage) {
    var offset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    _classCallCheck(this, BaseStructView);

    this._storage = storage;
    this._offset = offset;
  }

  BaseStructView.prototype.getItem = function getItem(index) {
    var T = this._Type;
    return new T(this._storage, this._offset + index * T._alignment);
  };

  BaseStructView.prototype.setItem = function setItem(index, value) {
    var T = this._Type;
    new T(this._storage, this._offset + index * T._alignment, value);
  };

  return BaseStructView;
})();

function structView(Type) {
  var StructView = (function (_BaseStructView) {
    _inherits(StructView, _BaseStructView);

    function StructView() {
      _classCallCheck(this, StructView);

      _BaseStructView.apply(this, arguments);
    }

    return StructView;
  })(BaseStructView);

  StructView.prototype._Type = Type;
  return function (storage, offset) {
    return new StructView(storage, offset);
  };
}

module.exports = exports["default"];