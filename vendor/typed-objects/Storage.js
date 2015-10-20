"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function Storage(arrayBuffer, isOpaque) {
  _classCallCheck(this, Storage);

  this.arrayBuffer = arrayBuffer;
  this.opaque = isOpaque;
  if (isOpaque) {
    this.opaqueBuffer = new Array(this.arrayBuffer.byteLength);
  }
};

exports["default"] = Storage;
module.exports = exports["default"];