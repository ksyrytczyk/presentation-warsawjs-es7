/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = __webpack_require__(1);

	var _ArrayType = __webpack_require__(3);

	var _ArrayType2 = _interopRequireDefault(_ArrayType);

	var _ReferenceType = __webpack_require__(6);

	var _ReferenceType2 = _interopRequireDefault(_ReferenceType);

	var _StructType = __webpack_require__(7);

	var _StructType2 = _interopRequireDefault(_StructType);

	var _ValueType = __webpack_require__(8);

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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.assert = assert;
	exports.setReadOnly = setReadOnly;
	exports.setMeta = setMeta;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _objectAssign = __webpack_require__(2);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function ownEnumerableKeys(obj) {
		var keys = Object.getOwnPropertyNames(obj);

		if (Object.getOwnPropertySymbols) {
			keys = keys.concat(Object.getOwnPropertySymbols(obj));
		}

		return keys.filter(function (key) {
			return propIsEnumerable.call(obj, key);
		});
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = ownEnumerableKeys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = ArrayType;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = __webpack_require__(1);

	var _structView = __webpack_require__(4);

	var _structView2 = _interopRequireDefault(_structView);

	var _Storage = __webpack_require__(5);

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

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utils = __webpack_require__(1);

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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = StructType;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _utils = __webpack_require__(1);

	var _structView = __webpack_require__(4);

	var _structView2 = _interopRequireDefault(_structView);

	var _Storage = __webpack_require__(5);

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _utils = __webpack_require__(1);

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

/***/ }
/******/ ]);