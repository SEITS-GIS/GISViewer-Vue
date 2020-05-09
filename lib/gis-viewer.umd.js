(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["gis-viewer"] = factory(require("vue"));
	else
		root["gis-viewer"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "cdd8");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyNames = __webpack_require__("241c").f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "1276":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var isRegExp = __webpack_require__("44e7");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var speciesConstructor = __webpack_require__("4840");
var advanceStringIndex = __webpack_require__("8aa5");
var toLength = __webpack_require__("50c4");
var callRegExpExec = __webpack_require__("14c3");
var regexpExec = __webpack_require__("9263");
var fails = __webpack_require__("d039");

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),

/***/ "131a":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var setPrototypeOf = __webpack_require__("d2bb");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
$({ target: 'Object', stat: true }, {
  setPrototypeOf: setPrototypeOf
});


/***/ }),

/***/ "14c3":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var regexpExec = __webpack_require__("9263");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "14f0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainerArcgis3D_vue_vue_type_style_index_0_id_0b75cb3e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("245c");
/* harmony import */ var _C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainerArcgis3D_vue_vue_type_style_index_0_id_0b75cb3e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainerArcgis3D_vue_vue_type_style_index_0_id_0b75cb3e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainerArcgis3D_vue_vue_type_style_index_0_id_0b75cb3e_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "18a5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createHTML = __webpack_require__("857a");
var forcedStringHTMLMethod = __webpack_require__("af03");

// `String.prototype.anchor` method
// https://tc39.github.io/ecma262/#sec-string.prototype.anchor
$({ target: 'String', proto: true, forced: forcedStringHTMLMethod('anchor') }, {
  anchor: function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  }
});


/***/ }),

/***/ "19aa":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c0b":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "1c7e":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "1cdc":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("342f");

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);


/***/ }),

/***/ "1d6a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "2266":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var isArrayIteratorMethod = __webpack_require__("e95a");
var toLength = __webpack_require__("50c4");
var bind = __webpack_require__("0366");
var getIteratorMethod = __webpack_require__("35a1");
var callWithSafeIterationClosing = __webpack_require__("9bdd");

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "245c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var correctIsRegExpLogic = __webpack_require__("ab13");

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "25f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__("6eeb");
var anObject = __webpack_require__("825a");
var fails = __webpack_require__("d039");
var flags = __webpack_require__("ad6d");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "2626":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var definePropertyModule = __webpack_require__("9bf2");
var wellKnownSymbol = __webpack_require__("b622");
var DESCRIPTORS = __webpack_require__("83ab");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "2cf4":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");
var bind = __webpack_require__("0366");
var html = __webpack_require__("1be4");
var createElement = __webpack_require__("cc12");
var IS_IOS = __webpack_require__("1cdc");

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "3011":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainer_vue_vue_type_style_index_0_id_f620c4b2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a2b6");
/* harmony import */ var _C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainer_vue_vue_type_style_index_0_id_f620c4b2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainer_vue_vue_type_style_index_0_id_f620c4b2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainer_vue_vue_type_style_index_0_id_f620c4b2_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "3410":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toObject = __webpack_require__("7b0b");
var nativeGetPrototypeOf = __webpack_require__("e163");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "35a1":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");
var Iterators = __webpack_require__("3f8c");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "3a71":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapToolTip_vue_vue_type_style_index_0_id_55f93b81_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("dbe9");
/* harmony import */ var _C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapToolTip_vue_vue_type_style_index_0_id_55f93b81_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapToolTip_vue_vue_type_style_index_0_id_55f93b81_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapToolTip_vue_vue_type_style_index_0_id_55f93b81_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "3ca3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "3d44":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainerArcgis2D_vue_vue_type_style_index_0_id_546290f3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b74f");
/* harmony import */ var _C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainerArcgis2D_vue_vue_type_style_index_0_id_546290f3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainerArcgis2D_vue_vue_type_style_index_0_id_546290f3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainerArcgis2D_vue_vue_type_style_index_0_id_546290f3_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "3f8c":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "4037":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "4160":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var forEach = __webpack_require__("17c2");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "44de":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ "44e7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aFunction = __webpack_require__("1c0b");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "4d63":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var inheritIfRequired = __webpack_require__("7156");
var defineProperty = __webpack_require__("9bf2").f;
var getOwnPropertyNames = __webpack_require__("241c").f;
var isRegExp = __webpack_require__("44e7");
var getFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var setInternalState = __webpack_require__("69f3").set;
var setSpecies = __webpack_require__("2626");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
  re2[MATCH] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = getFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(
      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype,
      RegExpWrapper
    );

    if (UNSUPPORTED_Y && sticky) setInternalState(result, { sticky: sticky });

    return result;
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys.length > index) proxy(keys[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5135":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "5319":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.4',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");
var whitespaces = __webpack_require__("5899");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5a34":
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__("44e7");

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var has = __webpack_require__("5135");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__("c04e");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "857a":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

var quot = /"/g;

// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
// https://tc39.github.io/ecma262/#sec-createhtml
module.exports = function (string, tag, attribute, value) {
  var S = String(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};


/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8aa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "96cf":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "99af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var arraySpeciesCreate = __webpack_require__("65f0");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "9bdd":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9ed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var setToStringTag = __webpack_require__("d44e");
var Iterators = __webpack_require__("3f8c");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__("d039");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "a2b6":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var shared = __webpack_require__("5692");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");
var uid = __webpack_require__("90e3");
var wellKnownSymbol = __webpack_require__("b622");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineWellKnownSymbol = __webpack_require__("746f");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");
var $forEach = __webpack_require__("b727").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var has = __webpack_require__("5135");
var classof = __webpack_require__("c6b6");
var inheritIfRequired = __webpack_require__("7156");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var create = __webpack_require__("7c73");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "ab13":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "ae40":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__("e163");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "af03":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
module.exports = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};


/***/ }),

/***/ "afaa":
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? factory(exports) :
	undefined;
}(this, (function (exports) { 'use strict';

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var DEFAULT_VERSION = '4.14';
var NEXT = 'next';
function parseVersion(version) {
    if (version.toLowerCase() === NEXT) {
        return NEXT;
    }
    var match = version && version.match(/^(\d)\.(\d+)/);
    return match && {
        major: parseInt(match[1], 10),
        minor: parseInt(match[2], 10)
    };
}
/**
 * Get the CDN url for a given version
 *
 * @param version Ex: '4.14' or '3.31'. Defaults to the latest 4.x version.
 */
function getCdnUrl(version) {
    if (version === void 0) { version = DEFAULT_VERSION; }
    return "https://js.arcgis.com/" + version + "/";
}
/**
 * Get the CDN url for a the CSS for a given version and/or theme
 *
 * @param version Ex: '4.14', '3.31', or 'next'. Defaults to the latest 4.x version.
 */
function getCdnCssUrl(version) {
    if (version === void 0) { version = DEFAULT_VERSION; }
    var baseUrl = getCdnUrl(version);
    var parsedVersion = parseVersion(version);
    if (parsedVersion !== NEXT && parsedVersion.major === 3) {
        // NOTE: at 3.11 the CSS moved from the /js folder to the root
        var path = parsedVersion.minor <= 10 ? 'js/' : '';
        return "" + baseUrl + path + "esri/css/esri.css";
    }
    else {
        // assume 4.x
        return baseUrl + "esri/themes/light/main.css";
    }
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
function createStylesheetLink(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    return link;
}
function insertLink(link, before) {
    if (before) {
        // the link should be inserted before a specific node
        var beforeNode = document.querySelector(before);
        beforeNode.parentNode.insertBefore(link, beforeNode);
    }
    else {
        // append the link to then end of the head tag
        document.head.appendChild(link);
    }
}
// check if the css url has been injected or added manually
function getCss(url) {
    return document.querySelector("link[href*=\"" + url + "\"]");
}
function getCssUrl(urlOrVersion) {
    return !urlOrVersion || parseVersion(urlOrVersion)
        // if it's a valid version string return the CDN URL
        ? getCdnCssUrl(urlOrVersion)
        // otherwise assume it's a URL and return that
        : urlOrVersion;
}
// lazy load the CSS needed for the ArcGIS API
function loadCss(urlOrVersion, before) {
    var url = getCssUrl(urlOrVersion);
    var link = getCss(url);
    if (!link) {
        // create & load the css link
        link = createStylesheetLink(url);
        insertLink(link, before);
    }
    return link;
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var isBrowser = typeof window !== 'undefined';
// allow consuming libraries to provide their own Promise implementations
var utils = {
    Promise: isBrowser ? window['Promise'] : undefined
};

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
var defaultOptions = {};
function createScript(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.setAttribute('data-esri-loader', 'loading');
    return script;
}
// add a one-time load handler to script
// and optionally add a one time error handler as well
function handleScriptLoad(script, callback, errback) {
    var onScriptError;
    if (errback) {
        // set up an error handler as well
        onScriptError = handleScriptError(script, errback);
    }
    var onScriptLoad = function () {
        // pass the script to the callback
        callback(script);
        // remove this event listener
        script.removeEventListener('load', onScriptLoad, false);
        if (onScriptError) {
            // remove the error listener as well
            script.removeEventListener('error', onScriptError, false);
        }
    };
    script.addEventListener('load', onScriptLoad, false);
}
// add a one-time error handler to the script
function handleScriptError(script, callback) {
    var onScriptError = function (e) {
        // reject the promise and remove this event listener
        callback(e.error || new Error("There was an error attempting to load " + script.src));
        // remove this event listener
        script.removeEventListener('error', onScriptError, false);
    };
    script.addEventListener('error', onScriptError, false);
    return onScriptError;
}
// allow the user to configure default script options rather than passing options to `loadModules` each time
function setDefaultOptions(options) {
    if (options === void 0) { options = {}; }
    defaultOptions = options;
}
// get the script injected by this library
function getScript() {
    return document.querySelector('script[data-esri-loader]');
}
// has ArcGIS API been loaded on the page yet?
function isLoaded() {
    var globalRequire = window['require'];
    // .on() ensures that it's Dojo's AMD loader
    return globalRequire && globalRequire.on;
}
// load the ArcGIS API on the page
function loadScript(options) {
    if (options === void 0) { options = {}; }
    // we would have liked to use spread like { ...defaultOptions, ...options }
    // but TS would inject a polyfill that would require use to configure rollup w content: 'window'
    // if we have another occasion to use spread, let'd do that and replace this for...in
    var opts = {};
    [defaultOptions, options].forEach(function (obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                opts[prop] = obj[prop];
            }
        }
    });
    // URL to load
    var version = opts.version;
    var url = opts.url || getCdnUrl(version);
    return new utils.Promise(function (resolve, reject) {
        var script = getScript();
        if (script) {
            // the API is already loaded or in the process of loading...
            // NOTE: have to test against scr attribute value, not script.src
            // b/c the latter will return the full url for relative paths
            var src = script.getAttribute('src');
            if (src !== url) {
                // potentially trying to load a different version of the API
                reject(new Error("The ArcGIS API for JavaScript is already loaded (" + src + ")."));
            }
            else {
                if (isLoaded()) {
                    // the script has already successfully loaded
                    resolve(script);
                }
                else {
                    // wait for the script to load and then resolve
                    handleScriptLoad(script, resolve, reject);
                }
            }
        }
        else {
            if (isLoaded()) {
                // the API has been loaded by some other means
                // potentially trying to load a different version of the API
                reject(new Error("The ArcGIS API for JavaScript is already loaded."));
            }
            else {
                // this is the first time attempting to load the API
                var css = opts.css;
                if (css) {
                    var useVersion = css === true;
                    // load the css before loading the script
                    loadCss(useVersion ? version : css, opts.insertCssBefore);
                }
                if (opts.dojoConfig) {
                    // set dojo configuration parameters before loading the script
                    window['dojoConfig'] = opts.dojoConfig;
                }
                // create a script object whose source points to the API
                script = createScript(url);
                // _currentUrl = url;
                // once the script is loaded...
                handleScriptLoad(script, function () {
                    // update the status of the script
                    script.setAttribute('data-esri-loader', 'loaded');
                    // return the script
                    resolve(script);
                }, reject);
                // load the script
                document.body.appendChild(script);
            }
        }
    });
}

/* Copyright (c) 2017 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
// wrap Dojo's require() in a promise
function requireModules(modules) {
    return new utils.Promise(function (resolve, reject) {
        // If something goes wrong loading the esri/dojo scripts, reject with the error.
        var errorHandler = window['require'].on('error', reject);
        window['require'](modules, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // remove error handler
            errorHandler.remove();
            // Resolve with the parameters from dojo require as an array.
            resolve(args);
        });
    });
}
// returns a promise that resolves with an array of the required modules
// also will attempt to lazy load the ArcGIS API if it has not already been loaded
function loadModules(modules, loadScriptOptions) {
    if (loadScriptOptions === void 0) { loadScriptOptions = {}; }
    if (!isLoaded()) {
        // script is not yet loaded, is it in the process of loading?
        var script = getScript();
        var src = script && script.getAttribute('src');
        if (!loadScriptOptions.url && src) {
            // script is still loading and user did not specify a URL
            // in this case we want to default to the URL that's being loaded
            // instead of defaulting to the latest 4.x URL
            loadScriptOptions.url = src;
        }
        // attempt to load the script then load the modules
        return loadScript(loadScriptOptions).then(function () { return requireModules(modules); });
    }
    else {
        // script is already loaded, just load the modules
        return requireModules(modules);
    }
}

/*
  Copyright (c) 2017 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
// re-export the functions that are part of the public API
// NOTE: rollup ignores the default export
// and builds the UMD namespace out of the above named exports
// so this is only needed so that consumers of the ESM build
// can do esriLoader.loadModules(), etc
// TODO: remove this next breaking change
var esriLoader = {
    getScript: getScript,
    isLoaded: isLoaded,
    loadModules: loadModules,
    loadScript: loadScript,
    loadCss: loadCss,
    setDefaultOptions: setDefaultOptions,
    utils: utils
};

exports.getScript = getScript;
exports.isLoaded = isLoaded;
exports.loadModules = loadModules;
exports.loadScript = loadScript;
exports.loadCss = loadCss;
exports.setDefaultOptions = setDefaultOptions;
exports.utils = utils;
exports['default'] = esriLoader;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=esri-loader.js.map


/***/ }),

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b575":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var classof = __webpack_require__("c6b6");
var macrotask = __webpack_require__("2cf4").set;
var IS_IOS = __webpack_require__("1cdc");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !IS_IOS) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var has = __webpack_require__("5135");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "b74f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "baa5":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var lastIndexOf = __webpack_require__("e58c");

// `Array.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
$({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf
});


/***/ }),

/***/ "bde4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainerBaidu_vue_vue_type_style_index_0_id_da955b70_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1d6a");
/* harmony import */ var _C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainerBaidu_vue_vue_type_style_index_0_id_da955b70_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainerBaidu_vue_vue_type_style_index_0_id_da955b70_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_loaders_stylePostLoader_js_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_cache_loader_dist_cjs_js_ref_0_0_C_Users_lvl_AppData_Roaming_npm_node_modules_vue_cli_service_node_modules_vue_loader_lib_index_js_vue_loader_options_MapContainerBaidu_vue_vue_type_style_index_0_id_da955b70_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c975":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $indexOf = __webpack_require__("4d64").indexOf;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "caad":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $includes = __webpack_require__("4d64").includes;
var addToUnscopables = __webpack_require__("44d2");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: !USES_TO_LENGTH }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cdd8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("4037")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__("e439");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__("dbb4");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js









function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"588143aa-vue-loader-template"}!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/plugin/gis-viewer/MapContainer.vue?vue&type=template&id=f620c4b2&scoped=true&
var MapContainervue_type_template_id_f620c4b2_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"divMap"}},[(this.platform === 'arcgis3d')?_c('map-container-arcgis-three-d',{ref:"containerArcgis3D",attrs:{"map-config":this.mapConfig},on:{"map-loaded":_vm.mapLoaded}}):_vm._e(),(this.platform === 'arcgis2d')?_c('map-container-arcgis-two-d',{ref:"containerArcgis2D",attrs:{"map-config":this.mapConfig},on:{"map-loaded":_vm.mapLoaded}}):_vm._e(),(this.platform === 'bd')?_c('map-container-baidu',{ref:"containerBaidu",attrs:{"map-config":this.mapConfig},on:{"map-loaded":_vm.mapLoaded,"marker-click":_vm.showGisDeviceInfo}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapContainer.vue?vue&type=template&id=f620c4b2&scoped=true&

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js







function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-prototype-of.js
var es_object_get_prototype_of = __webpack_require__("3410");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.set-prototype-of.js
var es_object_set_prototype_of = __webpack_require__("131a");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js


function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
// CONCATENATED MODULE: ./node_modules/tslib/tslib.es6.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
/**
  * vue-class-component v7.2.1
  * (c) 2015-present Evan You
  * @license MIT
  */


function vue_class_component_esm_typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    vue_class_component_esm_typeof = function (obj) {
      return typeof obj;
    };
  } else {
    vue_class_component_esm_typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return vue_class_component_esm_typeof(obj);
}

function vue_class_component_esm_defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
function reflectionIsSupported() {
  return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}
function copyReflectionMetadata(to, from) {
  forwardMetadata(to, from);
  Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
    forwardMetadata(to.prototype, from.prototype, key);
  });
  Object.getOwnPropertyNames(from).forEach(function (key) {
    forwardMetadata(to, from, key);
  });
}

function forwardMetadata(to, from, propertyKey) {
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
  metaKeys.forEach(function (metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

    if (propertyKey) {
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
    } else {
      Reflect.defineMetadata(metaKey, metadata, to);
    }
  });
}

var fakeArray = {
  __proto__: []
};
var hasProto = fakeArray instanceof Array;
function createDecorator(factory) {
  return function (target, key, index) {
    var Ctor = typeof target === 'function' ? target : target.constructor;

    if (!Ctor.__decorators__) {
      Ctor.__decorators__ = [];
    }

    if (typeof index !== 'number') {
      index = undefined;
    }

    Ctor.__decorators__.push(function (options) {
      return factory(options, key, index);
    });
  };
}
function mixins() {
  for (var _len = arguments.length, Ctors = new Array(_len), _key = 0; _key < _len; _key++) {
    Ctors[_key] = arguments[_key];
  }

  return external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
    mixins: Ctors
  });
}
function isPrimitive(value) {
  var type = vue_class_component_esm_typeof(value);

  return value == null || type !== 'object' && type !== 'function';
}
function warn(message) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-class-component] ' + message);
  }
}

function collectDataFromConstructor(vm, Component) {
  // override _init to prevent to init as Vue instance
  var originalInit = Component.prototype._init;

  Component.prototype._init = function () {
    var _this = this;

    // proxy to actual vm
    var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

    if (vm.$options.props) {
      for (var key in vm.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }

    keys.forEach(function (key) {
      if (key.charAt(0) !== '_') {
        Object.defineProperty(_this, key, {
          get: function get() {
            return vm[key];
          },
          set: function set(value) {
            vm[key] = value;
          },
          configurable: true
        });
      }
    });
  }; // should be acquired class property values


  var data = new Component(); // restore original _init to avoid memory leak (#209)

  Component.prototype._init = originalInit; // create plain data object

  var plainData = {};
  Object.keys(data).forEach(function (key) {
    if (data[key] !== undefined) {
      plainData[key] = data[key];
    }
  });

  if (false) {}

  return plainData;
}

var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
];
function componentFactory(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options.name = options.name || Component._componentTag || Component.name; // prototype props.

  var proto = Component.prototype;
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return;
    } // hooks


    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key];
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        // typescript decorated data
        (options.mixins || (options.mixins = [])).push({
          data: function data() {
            return vue_class_component_esm_defineProperty({}, key, descriptor.value);
          }
        });
      }
    } else if (descriptor.get || descriptor.set) {
      // computed properties
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data: function data() {
      return collectDataFromConstructor(this, Component);
    }
  }); // decorate options

  var decorators = Component.__decorators__;

  if (decorators) {
    decorators.forEach(function (fn) {
      return fn(options);
    });
    delete Component.__decorators__;
  } // find super


  var superProto = Object.getPrototypeOf(Component.prototype);
  var Super = superProto instanceof external_commonjs_vue_commonjs2_vue_root_Vue_default.a ? superProto.constructor : external_commonjs_vue_commonjs2_vue_root_Vue_default.a;
  var Extended = Super.extend(options);
  forwardStaticMembers(Extended, Component, Super);

  if (reflectionIsSupported()) {
    copyReflectionMetadata(Extended, Component);
  }

  return Extended;
}
var reservedPropertyNames = [// Unique id
'cid', // Super Vue constructor
'super', // Component options that will be used by the component
'options', 'superOptions', 'extendOptions', 'sealedOptions', // Private assets
'component', 'directive', 'filter'];
var shouldIgnore = {
  prototype: true,
  arguments: true,
  callee: true,
  caller: true
};

function forwardStaticMembers(Extended, Original, Super) {
  // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
  Object.getOwnPropertyNames(Original).forEach(function (key) {
    // Skip the properties that should not be overwritten
    if (shouldIgnore[key]) {
      return;
    } // Some browsers does not allow reconfigure built-in properties


    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
    // the sub class properties may be inherited properties from the super class in TypeScript.
    // We need to exclude such properties to prevent to overwrite
    // the component options object which stored on the extended constructor (See #192).
    // If the value is a referenced value (object or function),
    // we can check equality of them and exclude it if they have the same reference.
    // If it is a primitive value, it will be forwarded for safety.

    if (!hasProto) {
      // Only `cid` is explicitly exluded from property forwarding
      // because we cannot detect whether it is a inherited property or not
      // on the no `__proto__` environment even though the property is reserved.
      if (key === 'cid') {
        return;
      }

      var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
        return;
      }
    } // Warn if the users manually declare reserved properties


    if (false) {}

    Object.defineProperty(Extended, key, descriptor);
  });
}

function vue_class_component_esm_Component(options) {
  if (typeof options === 'function') {
    return componentFactory(options);
  }

  return function (Component) {
    return componentFactory(Component, options);
  };
}

vue_class_component_esm_Component.registerHooks = function registerHooks(keys) {
  $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
};

/* harmony default export */ var vue_class_component_esm = (vue_class_component_esm_Component);


// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
/** vue-property-decorator verson 8.2.2 MIT LICENSE copyright 2019 kaorun343 */
/// <reference types='reflect-metadata'/>




/** Used for keying reactive provide/inject properties */
var reactiveInjectKey = '__reactiveInject__';
/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */
function Inject(options) {
    return createDecorator(function (componentOptions, key) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject[key] = options || key;
        }
    });
}
/**
 * decorator of a reactive inject
 * @param from key
 * @return PropertyDecorator
 */
function InjectReactive(options) {
    return createDecorator(function (componentOptions, key) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            var fromKey_1 = !!options ? options.from || options : key;
            var defaultVal_1 = (!!options && options.default) || undefined;
            if (!componentOptions.computed)
                componentOptions.computed = {};
            componentOptions.computed[key] = function () {
                var obj = this[reactiveInjectKey];
                return obj ? obj[fromKey_1] : defaultVal_1;
            };
            componentOptions.inject[reactiveInjectKey] = reactiveInjectKey;
        }
    });
}
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
function Provide(key) {
    return createDecorator(function (componentOptions, k) {
        var provide = componentOptions.provide;
        if (typeof provide !== 'function' || !provide.managed) {
            var original_1 = componentOptions.provide;
            provide = componentOptions.provide = function () {
                var rv = Object.create((typeof original_1 === 'function' ? original_1.call(this) : original_1) ||
                    null);
                for (var i in provide.managed)
                    rv[provide.managed[i]] = this[i];
                return rv;
            };
            provide.managed = {};
        }
        provide.managed[k] = key || k;
    });
}
/**
 * decorator of a reactive provide
 * @param key key
 * @return PropertyDecorator | void
 */
function ProvideReactive(key) {
    return createDecorator(function (componentOptions, k) {
        var provide = componentOptions.provide;
        // inject parent reactive services (if any)
        if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject = componentOptions.inject || {};
            componentOptions.inject[reactiveInjectKey] = { from: reactiveInjectKey, default: {} };
        }
        if (typeof provide !== 'function' || !provide.managedReactive) {
            var original_2 = componentOptions.provide;
            provide = componentOptions.provide = function () {
                var _this = this;
                var rv = typeof original_2 === 'function'
                    ? original_2.call(this)
                    : original_2;
                rv = Object.create(rv || null);
                // set reactive services (propagates previous services if necessary)
                rv[reactiveInjectKey] = this[reactiveInjectKey] || {};
                var _loop_1 = function (i) {
                    rv[provide.managedReactive[i]] = this_1[i]; // Duplicates the behavior of `@Provide`
                    Object.defineProperty(rv[reactiveInjectKey], provide.managedReactive[i], {
                        enumerable: true,
                        get: function () { return _this[i]; },
                    });
                };
                var this_1 = this;
                for (var i in provide.managedReactive) {
                    _loop_1(i);
                }
                return rv;
            };
            provide.managedReactive = {};
        }
        provide.managedReactive[k] = key || k;
    });
}
/** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */
var reflectMetadataIsSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';
function applyMetadata(options, target, key) {
    if (reflectMetadataIsSupported) {
        if (!Array.isArray(options) &&
            typeof options !== 'function' &&
            typeof options.type === 'undefined') {
            options.type = Reflect.getMetadata('design:type', target, key);
        }
    }
}
/**
 * decorator of model
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
function Model(event, options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        applyMetadata(options, target, key);
        createDecorator(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
            componentOptions.model = { prop: k, event: event || k };
        })(target, key);
    };
}
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
function Prop(options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        applyMetadata(options, target, key);
        createDecorator(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
        })(target, key);
    };
}
/**
 * decorator of a synced prop
 * @param propName the name to interface with from outside, must be different from decorated property
 * @param options the options for the synced prop
 * @return PropertyDecorator | void
 */
function PropSync(propName, options) {
    if (options === void 0) { options = {}; }
    // @ts-ignore
    return function (target, key) {
        applyMetadata(options, target, key);
        createDecorator(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[propName] = options;
            (componentOptions.computed || (componentOptions.computed = {}))[k] = {
                get: function () {
                    return this[propName];
                },
                set: function (value) {
                    // @ts-ignore
                    this.$emit("update:" + propName, value);
                },
            };
        })(target, key);
    };
}
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
function Watch(path, options) {
    if (options === void 0) { options = {}; }
    var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
    return createDecorator(function (componentOptions, handler) {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null);
        }
        var watch = componentOptions.watch;
        if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
            watch[path] = [watch[path]];
        }
        else if (typeof watch[path] === 'undefined') {
            watch[path] = [];
        }
        watch[path].push({ handler: handler, deep: deep, immediate: immediate });
    });
}
// Code copied from Vue/src/shared/util.js
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = function (str) { return str.replace(hyphenateRE, '-$1').toLowerCase(); };
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
function Emit(event) {
    return function (_target, key, descriptor) {
        key = hyphenate(key);
        var original = descriptor.value;
        descriptor.value = function emitter() {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var emit = function (returnValue) {
                if (returnValue !== undefined)
                    args.unshift(returnValue);
                _this.$emit.apply(_this, [event || key].concat(args));
            };
            var returnValue = original.apply(this, args);
            if (isPromise(returnValue)) {
                returnValue.then(function (returnValue) {
                    emit(returnValue);
                });
            }
            else {
                emit(returnValue);
            }
            return returnValue;
        };
    };
}
/**
 * decorator of a ref prop
 * @param refKey the ref key defined in template
 */
function Ref(refKey) {
    return createDecorator(function (options, key) {
        options.computed = options.computed || {};
        options.computed[key] = {
            cache: false,
            get: function () {
                return this.$refs[refKey || key];
            },
        };
    });
}
function isPromise(obj) {
    return obj instanceof Promise || (obj && typeof obj.then === 'function');
}

// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"588143aa-vue-loader-template"}!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/plugin/gis-viewer/MapContainerArcgis3D.vue?vue&type=template&id=0b75cb3e&scoped=true&
var MapContainerArcgis3Dvue_type_template_id_0b75cb3e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"divArcGISMap3D"}})}
var MapContainerArcgis3Dvue_type_template_id_0b75cb3e_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapContainerArcgis3D.vue?vue&type=template&id=0b75cb3e&scoped=true&

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js








function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js



function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/esri-loader/dist/umd/esri-loader.js
var esri_loader = __webpack_require__("afaa");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.last-index-of.js
var es_array_last_index_of = __webpack_require__("baa5");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.anchor.js
var es_string_anchor = __webpack_require__("18a5");

// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"588143aa-vue-loader-template"}!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/plugin/gis-viewer/widgets/MapToolTip.vue?vue&type=template&id=55f93b81&scoped=true&
var MapToolTipvue_type_template_id_55f93b81_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"MapText TextDiv"},[_c('div',{domProps:{"innerHTML":_vm._s(_vm.content)}}),_c('div',{staticClass:"TextTriTop"})])}
var MapToolTipvue_type_template_id_55f93b81_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/plugin/gis-viewer/widgets/MapToolTip.vue?vue&type=template&id=55f93b81&scoped=true&

// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--14-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!C:/Users/lvl/AppData/Roaming/npm/node_modules/babel-loader/lib!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_ts-loader@6.2.1@ts-loader??ref--14-3!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/plugin/gis-viewer/widgets/MapToolTip.vue?vue&type=script&lang=ts&







var MapToolTipvue_type_script_lang_ts_MapToolTip = /*#__PURE__*/function (_Vue) {
  _inherits(MapToolTip, _Vue);

  function MapToolTip() {
    _classCallCheck(this, MapToolTip);

    return _possibleConstructorReturn(this, _getPrototypeOf(MapToolTip).apply(this, arguments));
  }

  return MapToolTip;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  type: String
})], MapToolTipvue_type_script_lang_ts_MapToolTip.prototype, "content", void 0);

__decorate([Prop({
  type: String
})], MapToolTipvue_type_script_lang_ts_MapToolTip.prototype, "title", void 0);

__decorate([Ref()], MapToolTipvue_type_script_lang_ts_MapToolTip.prototype, "tp", void 0);

MapToolTipvue_type_script_lang_ts_MapToolTip = __decorate([vue_class_component_esm], MapToolTipvue_type_script_lang_ts_MapToolTip);
/* harmony default export */ var MapToolTipvue_type_script_lang_ts_ = (MapToolTipvue_type_script_lang_ts_MapToolTip);
// CONCATENATED MODULE: ./src/plugin/gis-viewer/widgets/MapToolTip.vue?vue&type=script&lang=ts&
 /* harmony default export */ var widgets_MapToolTipvue_type_script_lang_ts_ = (MapToolTipvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/plugin/gis-viewer/widgets/MapToolTip.vue?vue&type=style&index=0&id=55f93b81&scoped=true&lang=css&
var MapToolTipvue_type_style_index_0_id_55f93b81_scoped_true_lang_css_ = __webpack_require__("3a71");

// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/plugin/gis-viewer/widgets/MapToolTip.vue






/* normalize component */

var component = normalizeComponent(
  widgets_MapToolTipvue_type_script_lang_ts_,
  MapToolTipvue_type_template_id_55f93b81_scoped_true_render,
  MapToolTipvue_type_template_id_55f93b81_scoped_true_staticRenderFns,
  false,
  null,
  "55f93b81",
  null
  
)

/* harmony default export */ var widgets_MapToolTip = (component.exports);
// CONCATENATED MODULE: ./src/plugin/gis-viewer/widgets/ToolTip.ts





var ToolTip_ToolTip = /*#__PURE__*/function () {
  function ToolTip(view, content, graphic) {
    _classCallCheck(this, ToolTip);

    this.id = "tooltip1";
    this.view = view;
    this.postion = graphic.geometry;
    this.create(content);
  }

  _createClass(ToolTip, [{
    key: "create",
    value: function create(props) {
      this.vm = new external_commonjs_vue_commonjs2_vue_root_Vue_default.a({
        // 为什么不使用 template 要使用render 因为现在是webpack里面没有编译器 只能使用render
        render: function render(h) {
          return h(widgets_MapToolTip, {
            props: props
          });
        } // render 生成虚拟dom  {props: props}

      }).$mount(); // $mount 生成真实dom, 挂载dom 挂载在哪里, 不传参的时候只生成不挂载，需要手动挂载

      this.view.container.appendChild(this.vm.$el);
      this.changeText();
      this.init();
    } //计算tooltip，偏移位置；

  }, {
    key: "subLocate",
    value: function subLocate(location) {
      var xoffset = 0;
      var yoffset = 0;
      var width = this.vm.$el.clientWidth;
      var height = this.vm.$el.clientHeight;

      switch (location) {
        case "top":
          xoffset = 0 - width / 2 - 10;
          yoffset = 0 - height - 10;
      }

      return {
        xoffset: xoffset,
        yoffset: yoffset
      };
    }
  }, {
    key: "init",
    value: function init() {
      var o = this;
      o.view.watch("extent", function (event) {
        o.changeText();
      });
    }
  }, {
    key: "changeText",
    value: function changeText() {
      var point = this.view.toScreen(this.postion);
      var offset = this.subLocate("top");
      Object(this.vm.$el).style.left = point.x + 10 + offset.xoffset + "px";
      Object(this.vm.$el).style.top = point.y + offset.yoffset + "px";
    }
  }, {
    key: "remove",
    value: function remove() {
      // 回收组件
      this.view.container.removeChild(this.vm.$el); // 删除元素

      this.vm.$destroy(); // 销毁组件
    }
  }]);

  return ToolTip;
}();


// CONCATENATED MODULE: ./src/plugin/gis-viewer/widgets/OverlayArcgis3D.ts

















var OverlayArcgis3D_OverlayArcgis3D = /*#__PURE__*/function () {
  function OverlayArcgis3D(view) {
    _classCallCheck(this, OverlayArcgis3D);

    this.primitive2D = ["circle", "square", "cross", "x", "kite", "triangle"];
    this.primitive3D = ["sphere", "cylinder", "cube", "cone", "inverted-cone", "diamond", "tetrahedron"];
    this.view = view;
  }

  _createClass(OverlayArcgis3D, [{
    key: "createOverlayLayer",
    value: function () {
      var _createOverlayLayer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$loadModules, _yield$loadModules2, GraphicsLayer;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Object(esri_loader["loadModules"])(["esri/layers/GraphicsLayer"]);

              case 2:
                _yield$loadModules = _context.sent;
                _yield$loadModules2 = _slicedToArray(_yield$loadModules, 1);
                GraphicsLayer = _yield$loadModules2[0];
                this.overlayLayer = new GraphicsLayer();
                this.view.map.add(this.overlayLayer);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createOverlayLayer() {
        return _createOverlayLayer.apply(this, arguments);
      }

      return createOverlayLayer;
    }()
  }, {
    key: "makeSymbol",
    value: function makeSymbol(symbol) {
      if (!symbol) return undefined;
      var result;

      switch (symbol.type.toLowerCase()) {
        case "point-2d":
          //图元类型不匹配
          if (symbol.primitive && !this.primitive2D.includes(symbol.primitive)) {
            // console.error(`Wrong primitive: ${symbol.primitive}`);
            return undefined;
          }

          result = {
            type: "point-3d",
            symbolLayers: [{
              type: "icon",
              resource: symbol.primitive ? {
                primitive: symbol.primitive
              } : {
                href: symbol.url
              },
              size: symbol.size instanceof Array ? symbol.size[0] : symbol.size,
              material: {
                color: symbol.color
              },
              outline: symbol.outline,
              anchor: symbol.anchor
            }]
          };
          break;

        case "point-3d":
          //图元类型不匹配
          if (symbol.primitive && !this.primitive3D.includes(symbol.primitive)) {
            // console.error(`Wrong primitive: ${symbol.primitive}`);
            return undefined;
          }

          result = {
            type: "point-3d",
            symbolLayers: [{
              type: "object",
              resource: symbol.primitive ? {
                primitive: symbol.primitive
              } : {
                href: symbol.url
              },
              width: symbol.size instanceof Array ? symbol.size[0] : symbol.size,
              height: symbol.size instanceof Array ? symbol.size[1] : symbol.size,
              depth: symbol.size instanceof Array ? symbol.size[2] : symbol.size,
              material: {
                color: symbol.color
              },
              tilt: symbol.rotation instanceof Array ? symbol.rotation[0] : 0,
              roll: symbol.rotation instanceof Array ? symbol.rotation[1] : 0,
              heading: symbol.rotation instanceof Array ? symbol.rotation[2] : 0,
              anchor: symbol.anchor
            }]
          };
          break;
      }

      return result;
    }
    /**根据graphic的属性生成弹出框*/

  }, {
    key: "getInfoWindowContent",
    value: function getInfoWindowContent(graphic) {
      var content = ""; //键值对

      for (var fieldName in graphic.attributes) {
        if (graphic.attributes.hasOwnProperty(fieldName)) {
          content += "<b>" + fieldName + ": </b>" + graphic.attributes[fieldName] + "<br>";
        }
      } //去掉最后的<br>


      content = content.substring(0, content.lastIndexOf("<br>"));

      if (graphic.buttons !== undefined) {
        content += "<hr>";
        graphic.buttons.forEach(function (buttonConfig) {
          content += "<button type='button' class='btn btn-primary btn-sm' onclick='mapFeatureClicked(" + '"' + buttonConfig.type + '", "' + graphic.id + '"' + ")'>" + buttonConfig.label + "</button>  ";
        });
      }

      var divContent = document.createElement("div");
      divContent.innerHTML = content;
      return divContent;
    } //使popup中的content,支持html.

  }, {
    key: "getPopUpHtml",
    value: function getPopUpHtml(graphic, content) {
      var tipContent = content;

      for (var fieldName in graphic.attributes) {
        if (graphic.attributes.hasOwnProperty(fieldName)) {
          tipContent = tipContent.replace("{" + fieldName + "}", graphic.attributes[fieldName]);
        }
      }

      var divContent = document.createElement("div");
      divContent.innerHTML = tipContent;
      return divContent;
    } //使toolTip中支持{字段}的形式

  }, {
    key: "getToolTipContent",
    value: function getToolTipContent(graphic, content) {
      var tipContent = content;

      if (content) {
        //键值对
        for (var fieldName in graphic.attributes) {
          if (graphic.attributes.hasOwnProperty(fieldName)) {
            tipContent = tipContent.replace("{" + fieldName + "}", graphic.attributes[fieldName]);
          }
        }
      } else {
        tipContent = this.getInfoWindowContent(graphic).innerHTML;
      }

      return tipContent;
    }
  }, {
    key: "MoveToolTip",
    value: function MoveToolTip(content) {
      var view = this.view;
      var moveLayer = this.overlayLayer;
      var parent = this;
      var tip;
      view.on("pointer-move", function (event) {
        view.hitTest(event).then(function (response) {
          if (response.results.length > 0) {
            response.results.forEach(function (result) {
              if (result.graphic.layer === moveLayer) {
                if (!tip) {
                  tip = new ToolTip_ToolTip(view, {
                    title: "",
                    content: parent.getToolTipContent(result.graphic, content)
                  }, result.graphic);
                }
              }
            });
          } else {
            if (tip) {
              tip.remove();
              tip = null;
            }
          }
        });
      });
    }
  }, {
    key: "addOverlays",
    value: function () {
      var _addOverlays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
        var _yield$loadModules3, _yield$loadModules4, Graphic, geometryJsonUtils, PopupTemplate, defaultSymbol, showPopup, defaultInfoTemplate, autoPopup, showToolTip, toolTipContent, defaultButtons, addCount, i, overlay, overlaySymbol, geometry, fields, buttons, graphic;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.overlayLayer) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.createOverlayLayer();

              case 3:
                _context2.next = 5;
                return Object(esri_loader["loadModules"])(["esri/Graphic", "esri/geometry/support/jsonUtils", "esri/PopupTemplate"]);

              case 5:
                _yield$loadModules3 = _context2.sent;
                _yield$loadModules4 = _slicedToArray(_yield$loadModules3, 3);
                Graphic = _yield$loadModules4[0];
                geometryJsonUtils = _yield$loadModules4[1];
                PopupTemplate = _yield$loadModules4[2];
                defaultSymbol = this.makeSymbol(params.defaultSymbol);
                showPopup = params.showPopup;
                defaultInfoTemplate = params.defaultInfoTemplate;
                autoPopup = params.autoPopup;
                showToolTip = params.showToolTip;
                toolTipContent = params.toolTipContent;
                defaultButtons = params.defaultButtons;

                if (showToolTip && toolTipContent) {
                  this.MoveToolTip(toolTipContent);
                }

                addCount = 0;
                i = 0;

              case 20:
                if (!(i < params.overlays.length)) {
                  _context2.next = 36;
                  break;
                }

                overlay = params.overlays[i];
                overlaySymbol = this.makeSymbol(overlay.symbol); //TODO: 加入更详细的参数是否合法判断

                if (!(!defaultSymbol && !overlaySymbol)) {
                  _context2.next = 25;
                  break;
                }

                return _context2.abrupt("continue", 33);

              case 25:
                geometry = geometryJsonUtils.fromJSON(overlay.geometry);
                fields = overlay.fields;
                buttons = overlay.buttons;
                graphic = new Graphic({
                  geometry: geometry,
                  symbol: overlaySymbol || defaultSymbol,
                  attributes: fields || {}
                });
                graphic.buttons = buttons || defaultButtons;

                if (showPopup) {
                  if (defaultInfoTemplate === undefined) {
                    graphic.popupTemplate = new PopupTemplate({
                      content: this.getInfoWindowContent(graphic)
                    });
                  } else {
                    graphic.popupTemplate = {
                      title: defaultInfoTemplate.title,
                      content: this.getPopUpHtml(graphic, defaultInfoTemplate.content)
                    };
                  }

                  if (autoPopup) {
                    this.view.popup.open({
                      title: "",
                      content: this.getInfoWindowContent(graphic),
                      location: geometry
                    });
                    this.view.popup.dockOptions = {
                      buttonEnabled: false,
                      breakpoint: {
                        width: 400,
                        height: 30
                      }
                    };
                  }
                }

                this.overlayLayer.add(graphic);
                addCount++;

              case 33:
                i++;
                _context2.next = 20;
                break;

              case 36:
                return _context2.abrupt("return", {
                  status: 0,
                  message: "ok",
                  result: "\u6210\u529F\u6DFB\u52A0".concat(params.overlays.length, "\u4E2D\u7684").concat(addCount, "\u4E2A\u8986\u76D6\u7269")
                });

              case 37:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addOverlays(_x) {
        return _addOverlays.apply(this, arguments);
      }

      return addOverlays;
    }()
  }], [{
    key: "getInstance",
    value: function getInstance(view) {
      if (!OverlayArcgis3D.overlayArcgis3D) {
        OverlayArcgis3D.overlayArcgis3D = new OverlayArcgis3D(view);
      }

      return OverlayArcgis3D.overlayArcgis3D;
    }
  }]);

  return OverlayArcgis3D;
}();
// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapAppArcgis3D.ts











var MapAppArcgis3D_MapAppArcGIS3D = /*#__PURE__*/function () {
  function MapAppArcGIS3D() {
    _classCallCheck(this, MapAppArcGIS3D);
  }

  _createClass(MapAppArcGIS3D, [{
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(mapConfig, mapContainer) {
        var apiUrl, cssFile, _yield$loadModules, _yield$loadModules2, SceneView, Basemap, Map, TileLayer, Collection, baseLayers, basemap, view;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                apiUrl = mapConfig.arcgis_api || "https://js.arcgis.com/4.14/";
                Object(esri_loader["setDefaultOptions"])({
                  url: "".concat(apiUrl, "/init.js")
                });
                cssFile = mapConfig.theme ? "themes/".concat(mapConfig.theme, "/main.css") : "css/main.css";
                Object(esri_loader["loadCss"])("".concat(apiUrl, "/esri/").concat(cssFile));
                _context.next = 6;
                return Object(esri_loader["loadModules"])(["esri/views/SceneView", "esri/Basemap", "esri/Map", "esri/layers/TileLayer", "esri/core/Collection"]);

              case 6:
                _yield$loadModules = _context.sent;
                _yield$loadModules2 = _slicedToArray(_yield$loadModules, 5);
                SceneView = _yield$loadModules2[0];
                Basemap = _yield$loadModules2[1];
                Map = _yield$loadModules2[2];
                TileLayer = _yield$loadModules2[3];
                Collection = _yield$loadModules2[4];
                baseLayers = new Collection();
                baseLayers.addMany(mapConfig.baseLayers.map(function (layerConfig) {
                  if (layerConfig.type === "tiled") {
                    delete layerConfig.type;
                    return new TileLayer(layerConfig);
                  }
                }));
                basemap = new Basemap({
                  baseLayers: baseLayers
                });
                view = new SceneView(_objectSpread2({
                  map: new Map({
                    basemap: basemap
                  }),
                  container: mapContainer
                }, mapConfig.options));
                view.ui.remove("attribution");
                _context.next = 20;
                return view.when();

              case 20:
                this.view = view;

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initialize(_x, _x2) {
        return _initialize.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "addOverlays",
    value: function () {
      var _addOverlays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
        var overlay;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                overlay = OverlayArcgis3D_OverlayArcgis3D.getInstance(this.view);
                _context2.next = 3;
                return overlay.addOverlays(params);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addOverlays(_x3) {
        return _addOverlays.apply(this, arguments);
      }

      return addOverlays;
    }()
  }, {
    key: "addOverlaysCluster",
    value: function () {
      var _addOverlaysCluster = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function addOverlaysCluster(_x4) {
        return _addOverlaysCluster.apply(this, arguments);
      }

      return addOverlaysCluster;
    }()
  }, {
    key: "addHeatMap",
    value: function () {
      var _addHeatMap = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(params) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function addHeatMap(_x5) {
        return _addHeatMap.apply(this, arguments);
      }

      return addHeatMap;
    }()
  }, {
    key: "deleteAllOverlays",
    value: function () {
      var _deleteAllOverlays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteAllOverlays() {
        return _deleteAllOverlays.apply(this, arguments);
      }

      return deleteAllOverlays;
    }()
  }, {
    key: "deleteAllOverlaysCluster",
    value: function () {
      var _deleteAllOverlaysCluster = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteAllOverlaysCluster() {
        return _deleteAllOverlaysCluster.apply(this, arguments);
      }

      return deleteAllOverlaysCluster;
    }()
  }, {
    key: "deleteHeatMap",
    value: function () {
      var _deleteHeatMap = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function deleteHeatMap() {
        return _deleteHeatMap.apply(this, arguments);
      }

      return deleteHeatMap;
    }()
  }, {
    key: "deleteOverlays",
    value: function () {
      var _deleteOverlays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(params) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function deleteOverlays(_x6) {
        return _deleteOverlays.apply(this, arguments);
      }

      return deleteOverlays;
    }()
  }, {
    key: "deleteOverlaysCluster",
    value: function () {
      var _deleteOverlaysCluster = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(params) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function deleteOverlaysCluster(_x7) {
        return _deleteOverlaysCluster.apply(this, arguments);
      }

      return deleteOverlaysCluster;
    }()
  }, {
    key: "showLayer",
    value: function () {
      var _showLayer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(params) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function showLayer(_x8) {
        return _showLayer.apply(this, arguments);
      }

      return showLayer;
    }()
  }, {
    key: "hideLayer",
    value: function () {
      var _hideLayer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(params) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function hideLayer(_x9) {
        return _hideLayer.apply(this, arguments);
      }

      return hideLayer;
    }()
  }, {
    key: "setMapCenter",
    value: function () {
      var _setMapCenter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(params) {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function setMapCenter(_x10) {
        return _setMapCenter.apply(this, arguments);
      }

      return setMapCenter;
    }()
  }, {
    key: "setMapCenterAndLevel",
    value: function () {
      var _setMapCenterAndLevel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(params) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function setMapCenterAndLevel(_x11) {
        return _setMapCenterAndLevel.apply(this, arguments);
      }

      return setMapCenterAndLevel;
    }()
  }]);

  return MapAppArcGIS3D;
}();


// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--14-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!C:/Users/lvl/AppData/Roaming/npm/node_modules/babel-loader/lib!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_ts-loader@6.2.1@ts-loader??ref--14-3!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/plugin/gis-viewer/MapContainerArcgis3D.vue?vue&type=script&lang=ts&











var MapContainerArcgis3Dvue_type_script_lang_ts_MapContainerArcgis3D = /*#__PURE__*/function (_Vue) {
  _inherits(MapContainerArcgis3D, _Vue);

  function MapContainerArcgis3D() {
    _classCallCheck(this, MapContainerArcgis3D);

    return _possibleConstructorReturn(this, _getPrototypeOf(MapContainerArcgis3D).apply(this, arguments));
  }

  _createClass(MapContainerArcgis3D, [{
    key: "mounted",
    value: function () {
      var _mounted = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.mapApp = new MapAppArcgis3D_MapAppArcGIS3D();
                _context.next = 3;
                return this.mapApp.initialize(this.mapConfig, "divArcGISMap3D");

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function mounted() {
        return _mounted.apply(this, arguments);
      }

      return mounted;
    }()
  }, {
    key: "addOverlays",
    value: function addOverlays(params) {
      this.mapApp.addOverlays(params);
    }
  }, {
    key: "addHeatMap",
    value: function addHeatMap(params) {}
  }, {
    key: "addOverlaysCluster",
    value: function addOverlaysCluster(params) {}
  }, {
    key: "deleteOverlays",
    value: function deleteOverlays(params) {}
  }, {
    key: "deleteOverlaysCluster",
    value: function deleteOverlaysCluster(params) {}
  }, {
    key: "deleteAllOverlays",
    value: function deleteAllOverlays() {}
  }, {
    key: "deleteAllOverlaysCluster",
    value: function deleteAllOverlaysCluster() {}
  }, {
    key: "deleteHeatMap",
    value: function deleteHeatMap() {}
  }, {
    key: "showLayer",
    value: function showLayer(params) {}
  }, {
    key: "hideLayer",
    value: function hideLayer(params) {}
  }, {
    key: "setMapCenter",
    value: function setMapCenter(params) {}
  }, {
    key: "setMapCenterAndLevel",
    value: function setMapCenterAndLevel(params) {}
  }]);

  return MapContainerArcgis3D;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  type: Object
})], MapContainerArcgis3Dvue_type_script_lang_ts_MapContainerArcgis3D.prototype, "mapConfig", void 0);

__decorate([Emit("map-loaded")], MapContainerArcgis3Dvue_type_script_lang_ts_MapContainerArcgis3D.prototype, "mounted", null);

MapContainerArcgis3Dvue_type_script_lang_ts_MapContainerArcgis3D = __decorate([vue_class_component_esm({
  name: "MapContainerArcgisThreeD"
})], MapContainerArcgis3Dvue_type_script_lang_ts_MapContainerArcgis3D);
/* harmony default export */ var MapContainerArcgis3Dvue_type_script_lang_ts_ = (MapContainerArcgis3Dvue_type_script_lang_ts_MapContainerArcgis3D);
// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapContainerArcgis3D.vue?vue&type=script&lang=ts&
 /* harmony default export */ var gis_viewer_MapContainerArcgis3Dvue_type_script_lang_ts_ = (MapContainerArcgis3Dvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/plugin/gis-viewer/MapContainerArcgis3D.vue?vue&type=style&index=0&id=0b75cb3e&scoped=true&lang=css&
var MapContainerArcgis3Dvue_type_style_index_0_id_0b75cb3e_scoped_true_lang_css_ = __webpack_require__("14f0");

// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapContainerArcgis3D.vue






/* normalize component */

var MapContainerArcgis3D_component = normalizeComponent(
  gis_viewer_MapContainerArcgis3Dvue_type_script_lang_ts_,
  MapContainerArcgis3Dvue_type_template_id_0b75cb3e_scoped_true_render,
  MapContainerArcgis3Dvue_type_template_id_0b75cb3e_scoped_true_staticRenderFns,
  false,
  null,
  "0b75cb3e",
  null
  
)

/* harmony default export */ var gis_viewer_MapContainerArcgis3D = (MapContainerArcgis3D_component.exports);
// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"588143aa-vue-loader-template"}!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/plugin/gis-viewer/MapContainerArcgis2D.vue?vue&type=template&id=546290f3&scoped=true&
var MapContainerArcgis2Dvue_type_template_id_546290f3_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"divArcGISMap2D"}})}
var MapContainerArcgis2Dvue_type_template_id_546290f3_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapContainerArcgis2D.vue?vue&type=template&id=546290f3&scoped=true&

// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapAppArcgis2D.ts










var MapAppArcgis2D_MapAppArcGIS2D = /*#__PURE__*/function () {
  function MapAppArcGIS2D() {
    _classCallCheck(this, MapAppArcGIS2D);
  }

  _createClass(MapAppArcGIS2D, [{
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(mapConfig, mapContainer) {
        var apiUrl, cssFile, _yield$loadModules, _yield$loadModules2, MapView, Basemap, Map, TileLayer, Collection, baseLayers, basemap, view;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                apiUrl = mapConfig.arcgis_api || "https://js.arcgis.com/4.14/";
                Object(esri_loader["setDefaultOptions"])({
                  url: "".concat(apiUrl, "/init.js")
                });
                cssFile = mapConfig.theme ? "themes/".concat(mapConfig.theme, "/main.css") : "css/main.css";
                Object(esri_loader["loadCss"])("".concat(apiUrl, "/esri/").concat(cssFile));
                _context.next = 6;
                return Object(esri_loader["loadModules"])(["esri/views/MapView", "esri/Basemap", "esri/Map", "esri/layers/TileLayer", "esri/core/Collection"]);

              case 6:
                _yield$loadModules = _context.sent;
                _yield$loadModules2 = _slicedToArray(_yield$loadModules, 5);
                MapView = _yield$loadModules2[0];
                Basemap = _yield$loadModules2[1];
                Map = _yield$loadModules2[2];
                TileLayer = _yield$loadModules2[3];
                Collection = _yield$loadModules2[4];
                baseLayers = new Collection();
                baseLayers.addMany(mapConfig.baseLayers.map(function (layerConfig) {
                  if (layerConfig.type === "tiled") {
                    delete layerConfig.type;
                    return new TileLayer(layerConfig);
                  }
                }));
                basemap = new Basemap({
                  baseLayers: baseLayers
                });
                view = new MapView(_objectSpread2({
                  map: new Map({
                    basemap: basemap
                  }),
                  container: mapContainer
                }, mapConfig.options));
                view.ui.remove("attribution");
                _context.next = 20;
                return view.when();

              case 20:
                this.view = view;

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initialize(_x, _x2) {
        return _initialize.apply(this, arguments);
      }

      return initialize;
    }()
  }]);

  return MapAppArcGIS2D;
}();


// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--14-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!C:/Users/lvl/AppData/Roaming/npm/node_modules/babel-loader/lib!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_ts-loader@6.2.1@ts-loader??ref--14-3!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/plugin/gis-viewer/MapContainerArcgis2D.vue?vue&type=script&lang=ts&











var MapContainerArcgis2Dvue_type_script_lang_ts_MapContainerArcgis = /*#__PURE__*/function (_Vue) {
  _inherits(MapContainerArcgis, _Vue);

  function MapContainerArcgis() {
    _classCallCheck(this, MapContainerArcgis);

    return _possibleConstructorReturn(this, _getPrototypeOf(MapContainerArcgis).apply(this, arguments));
  }

  _createClass(MapContainerArcgis, [{
    key: "mounted",
    value: function () {
      var _mounted = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.mapApp = new MapAppArcgis2D_MapAppArcGIS2D();
                _context.next = 3;
                return this.mapApp.initialize(this.mapConfig, "divArcGISMap2D");

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function mounted() {
        return _mounted.apply(this, arguments);
      }

      return mounted;
    }()
  }, {
    key: "addOverlays",
    value: function addOverlays() {}
  }, {
    key: "addHeatMap",
    value: function addHeatMap(params) {}
  }, {
    key: "addOverlaysCluster",
    value: function addOverlaysCluster(params) {}
  }, {
    key: "deleteOverlays",
    value: function deleteOverlays(params) {}
  }, {
    key: "deleteOverlaysCluster",
    value: function deleteOverlaysCluster(params) {}
  }, {
    key: "deleteAllOverlays",
    value: function deleteAllOverlays() {}
  }, {
    key: "deleteAllOverlaysCluster",
    value: function deleteAllOverlaysCluster() {}
  }, {
    key: "deleteHeatMap",
    value: function deleteHeatMap() {}
  }, {
    key: "showLayer",
    value: function showLayer(params) {}
  }, {
    key: "hideLayer",
    value: function hideLayer(params) {}
  }, {
    key: "setMapCenter",
    value: function setMapCenter(params) {}
  }, {
    key: "setMapCenterAndLevel",
    value: function setMapCenterAndLevel(params) {}
  }]);

  return MapContainerArcgis;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  type: Object
})], MapContainerArcgis2Dvue_type_script_lang_ts_MapContainerArcgis.prototype, "mapConfig", void 0);

__decorate([Emit("mapLoaded")], MapContainerArcgis2Dvue_type_script_lang_ts_MapContainerArcgis.prototype, "mounted", null);

MapContainerArcgis2Dvue_type_script_lang_ts_MapContainerArcgis = __decorate([vue_class_component_esm({
  name: "MapContainerArcgisTwoD"
})], MapContainerArcgis2Dvue_type_script_lang_ts_MapContainerArcgis);
/* harmony default export */ var MapContainerArcgis2Dvue_type_script_lang_ts_ = (MapContainerArcgis2Dvue_type_script_lang_ts_MapContainerArcgis);
// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapContainerArcgis2D.vue?vue&type=script&lang=ts&
 /* harmony default export */ var gis_viewer_MapContainerArcgis2Dvue_type_script_lang_ts_ = (MapContainerArcgis2Dvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/plugin/gis-viewer/MapContainerArcgis2D.vue?vue&type=style&index=0&id=546290f3&scoped=true&lang=css&
var MapContainerArcgis2Dvue_type_style_index_0_id_546290f3_scoped_true_lang_css_ = __webpack_require__("3d44");

// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapContainerArcgis2D.vue






/* normalize component */

var MapContainerArcgis2D_component = normalizeComponent(
  gis_viewer_MapContainerArcgis2Dvue_type_script_lang_ts_,
  MapContainerArcgis2Dvue_type_template_id_546290f3_scoped_true_render,
  MapContainerArcgis2Dvue_type_template_id_546290f3_scoped_true_staticRenderFns,
  false,
  null,
  "546290f3",
  null
  
)

/* harmony default export */ var MapContainerArcgis2D = (MapContainerArcgis2D_component.exports);
// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"588143aa-vue-loader-template"}!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/plugin/gis-viewer/MapContainerBaidu.vue?vue&type=template&id=da955b70&scoped=true&
var MapContainerBaiduvue_type_template_id_da955b70_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"divBMap"}})}
var MapContainerBaiduvue_type_template_id_da955b70_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapContainerBaidu.vue?vue&type=template&id=da955b70&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.index-of.js
var es_array_index_of = __webpack_require__("c975");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__("4d63");

// CONCATENATED MODULE: ./src/plugin/gis-viewer/widgets/OverlayBaidu.ts














var OverlayBaidu_OverlayBaidu = /*#__PURE__*/function () {
  function OverlayBaidu(view) {
    _classCallCheck(this, OverlayBaidu);

    this.overlayers = new Array();
    this.markerClustererLayer = new Array();
    this.view = view;
  }

  _createClass(OverlayBaidu, [{
    key: "createOverlayLayer",
    value: function () {
      var _createOverlayLayer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createOverlayLayer() {
        return _createOverlayLayer.apply(this, arguments);
      }

      return createOverlayLayer;
    }()
  }, {
    key: "getMarker",
    value: function getMarker(overlay, symbol) {
      var marker;
      var geometry = overlay.geometry;
      var type;

      if (symbol) {
        type = symbol.type;
      }

      switch (type) {
        case "polyline":
          marker = new BMap.Polyline(this.getGeometry(geometry.paths[0]), symbol);
          break;

        case "polygon":
          marker = new BMap.Polygon(this.getGeometry(geometry.rings[0]), symbol);
          break;

        case "extent":
          break;

        case "circle":
          marker = new BMap.Circle(new BMap.Point(geometry.x, geometry.y), geometry.radius, {
            strokeColor: "blue",
            strokeWeight: 2,
            strokeOpacity: 0.5
          }); //创建圆

          break;

        case "point":
        default:
          marker = new BMap.Marker(new BMap.Point(geometry.x, geometry.y), symbol);
          break;
      }

      return marker;
    }
  }, {
    key: "getGeometry",
    value: function getGeometry(points) {
      var features = [];

      for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var point = new BMap.Point(pt[0], pt[1]);
        features.push(point);
      }

      return features;
    }
  }, {
    key: "makeSymbol",
    value: function makeSymbol(symbol) {
      if (!symbol) return undefined;
      var marker;
      var myIcon;
      var size;
      var xoffset;
      var yoffset;

      switch (symbol.type) {
        case "polyline":
          marker = {
            strokeColor: symbol.color,
            strokeWeight: symbol.size
          };
          break;

        case "polygon" || false || false:
          if (!symbol.outline) return undefined;
          marker = {
            strokeColor: symbol.outline.color,
            strokeWeight: symbol.outline.size,
            fillColor: symbol.color
          };
          break;

        case "point":
        default:
          if (symbol.size) {
            size = new BMap.Size(symbol.size instanceof Array ? symbol.size[0] : symbol.size, symbol.size instanceof Array ? symbol.size[1] : symbol.size);
          }

          if (symbol.width) {
            size = new BMap.Size(symbol.width, symbol.height);
          }

          xoffset = symbol.xoffset || 0;
          yoffset = symbol.yoffset || 0;
          myIcon = new BMap.Icon(symbol.url, size, {
            imageSize: size
          });
          marker = {
            icon: myIcon,
            offset: new BMap.Size(xoffset, yoffset)
          };
          break;
      }

      return marker;
    }
    /**根据graphic的属性生成弹出框*/

  }, {
    key: "getInfoWindowContent",
    value: function getInfoWindowContent(graphic) {
      var content = ""; //键值对

      for (var fieldName in graphic.attributes) {
        if (graphic.attributes.hasOwnProperty(fieldName)) {
          content += "<b>" + fieldName + ": </b>" + graphic.attributes[fieldName] + "<br>";
        }
      } //去掉最后的<br>


      content = content.substring(0, content.lastIndexOf("<br>"));

      if (graphic.buttons !== undefined) {
        content += "<hr>";
        graphic.buttons.forEach(function (buttonConfig) {
          content += "<button type='button' class='btn btn-primary btn-sm' onclick='mapFeatureClicked(" + '"' + buttonConfig.type + '", "' + graphic.id + '"' + ")'>" + buttonConfig.label + "</button>  ";
        });
      }

      return content;
    }
  }, {
    key: "getPopUpHtml",
    value: function getPopUpHtml(graphic, content) {
      var tipContent = content;

      for (var fieldName in graphic.attributes) {
        if (graphic.attributes.hasOwnProperty(fieldName)) {
          tipContent = tipContent.replace(new RegExp("{" + fieldName + "}", "g"), graphic.attributes[fieldName]);
        }
      }

      return tipContent;
    }
  }, {
    key: "_showGisDeviceInfo",
    value: function _showGisDeviceInfo(type, id) {
      this.showGisDeviceInfo(type, id);
    }
  }, {
    key: "addOverlays",
    value: function () {
      var _addOverlays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
        var _this2 = this;

        var _this, defaultSymbol, showPopup, defaultInfoTemplate, autoPopup, showToolTip, defaultType, toolTipContent, defaultButtons, addCount, _loop, i;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                //if (!this.overlayLayer) {
                //await this.createOverlayLayer();
                //}
                _this = this;
                defaultSymbol = this.makeSymbol(params.defaultSymbol);
                showPopup = params.showPopup;
                defaultInfoTemplate = params.defaultInfoTemplate;
                autoPopup = params.autoPopup;
                showToolTip = params.showToolTip;
                defaultType = params.type;
                toolTipContent = params.toolTipContent;
                defaultButtons = params.defaultButtons;

                if (showToolTip) {//this.MoveToolTip(toolTipContent);
                }

                addCount = 0;

                _loop = function _loop(i) {
                  var overlay = params.overlays[i];

                  var overlaySymbol = _this2.makeSymbol(overlay.symbol);

                  var fields = overlay.fields;
                  var buttons = overlay.buttons || defaultButtons;

                  var graphic = _this2.getMarker(overlay, overlaySymbol || defaultSymbol);

                  graphic.attributes = fields;
                  graphic.buttons = buttons;
                  graphic.id = overlay.id;
                  graphic.type = overlay.type || defaultType;
                  var mapView = _this2.view;
                  var title = void 0;
                  var content = "";

                  if (showPopup) {
                    if (defaultInfoTemplate === undefined) {
                      content = _this2.getInfoWindowContent(graphic);
                    } else {
                      title = defaultInfoTemplate.title;
                      content = _this2.getPopUpHtml(graphic, defaultInfoTemplate.content);
                    }

                    if (autoPopup) {
                      var infoWindow = new BMap.InfoWindow(content, {
                        //width : 270,     // 信息窗口宽度
                        //height: 50,     // 信息窗口高度
                        title: title,
                        enableMessage: true,
                        message: ""
                      });
                      graphic.isOpenInfo = true;

                      _this2.view.openInfoWindow(infoWindow, graphic.point);
                    }

                    graphic.addEventListener("click", function (e) {
                      var infoWindow = new BMap.InfoWindow(content, {
                        width: 0,
                        height: 0,
                        title: title,
                        enableMessage: true,
                        message: ""
                      }); // 创建信息窗口对象

                      e.target.isOpenInfo = true;
                      console.log(e);
                      mapView.openInfoWindow(infoWindow, e.point);

                      _this._showGisDeviceInfo(e.target.type, e.target.id);
                    });
                  }

                  _this2.overlayers.push(graphic);

                  _this2.view.addOverlay(graphic);

                  addCount++;

                  if (params.overlays.length == 1) {
                    _this2.view.panTo(graphic.getPosition());
                  }
                };

                for (i = 0; i < params.overlays.length; i++) {
                  _loop(i);
                }

                return _context2.abrupt("return", {
                  status: 0,
                  message: "ok",
                  result: "\u6210\u529F\u6DFB\u52A0".concat(params.overlays.length, "\u4E2D\u7684").concat(addCount, "\u4E2A\u8986\u76D6\u7269")
                });

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addOverlays(_x) {
        return _addOverlays.apply(this, arguments);
      }

      return addOverlays;
    }()
  }, {
    key: "addOverlaysCluster",
    value: function () {
      var _addOverlaysCluster = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
        var _this3 = this;

        var _this, defaultType, zoom, distance, defaultSymbol, defaultVisible, defaultTooltip, points, mapView, markers, _loop2, i, markerClusterer;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this = this;
                defaultType = params.type;
                zoom = params.zoom;
                distance = params.distance;
                defaultSymbol = this.makeSymbol(params.defaultSymbol);
                defaultVisible = params.defaultVisible;
                defaultTooltip = params.defaultTooltip;
                points = params.points;
                mapView = this.view;
                markers = new Array();

                _loop2 = function _loop2(i) {
                  var overlay = points[i];

                  var overlaySymbol = _this3.makeSymbol(overlay.symbol);

                  var fields = overlay.fields;

                  var graphic = _this3.getMarker(overlay, overlaySymbol || defaultSymbol);

                  graphic.attributes = fields;
                  graphic.id = overlay.id;
                  graphic.type = overlay.type || defaultType;

                  var content = _this3.getPopUpHtml(graphic, defaultTooltip);

                  graphic.addEventListener("click", function (e) {
                    var infoWindow = new BMap.InfoWindow(content, {
                      width: 0,
                      height: 0,
                      title: "",
                      enableMessage: true,
                      message: ""
                    }); // 创建信息窗口对象

                    mapView.openInfoWindow(infoWindow, e.point);

                    _this._showGisDeviceInfo(e.target.type, e.target.id);
                  });
                  markers.push(graphic);
                };

                for (i = 0; i < points.length; i++) {
                  _loop2(i);
                }

                markerClusterer = new BMapLib.MarkerClusterer(this.view, {
                  markers: markers,
                  styles: [{
                    url: "assets/image/m0.png",
                    size: new BMap.Size(53, 53)
                  }],
                  maxZoom: zoom,
                  gridSize: distance
                });
                markerClusterer.type = defaultType;
                this.markerClustererLayer.push(markerClusterer);
                return _context3.abrupt("return", {
                  status: 0,
                  message: "ok"
                });

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addOverlaysCluster(_x2) {
        return _addOverlaysCluster.apply(this, arguments);
      }

      return addOverlaysCluster;
    }()
  }, {
    key: "deleteAllOverlays",
    value: function () {
      var _deleteAllOverlays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var i;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.overlayers.length > 0) {
                  for (i = 0; i < this.overlayers.length; i++) {
                    this.view.removeOverlay(this.overlayers[i]);
                  }

                  this.overlayers = [];
                }

                this.view.closeInfoWindow();

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deleteAllOverlays() {
        return _deleteAllOverlays.apply(this, arguments);
      }

      return deleteAllOverlays;
    }()
  }, {
    key: "deleteOverlays",
    value: function () {
      var _deleteOverlays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(params) {
        var _this4 = this;

        var types, ids;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                types = params.types || [];
                ids = params.ids || [];
                this.overlayers = this.overlayers.filter(function (graphic) {
                  if ( //只判断type
                  types.length > 0 && ids.length === 0 && types.indexOf(graphic.type) >= 0 || //只判断id
                  types.length === 0 && ids.length > 0 && ids.indexOf(graphic.id) >= 0 || //type和id都要判断
                  types.length > 0 && ids.length > 0 && types.indexOf(graphic.type) >= 0 && ids.indexOf(graphic.id) >= 0) {
                    _this4.view.removeOverlay(graphic);

                    if (graphic.isOpenInfo === true) {
                      _this4.view.closeInfoWindow();
                    }

                    return false;
                  }

                  return true;
                });

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteOverlays(_x3) {
        return _deleteOverlays.apply(this, arguments);
      }

      return deleteOverlays;
    }()
  }, {
    key: "deleteOverlaysCluster",
    value: function () {
      var _deleteOverlaysCluster = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(params) {
        var types;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                types = params.types || [];

                if (this.markerClustererLayer && this.markerClustererLayer.length > 0) {
                  this.markerClustererLayer.forEach(function (layer) {
                    if (types.indexOf(layer.type) >= 0) {
                      layer.clearMarkers();
                    }
                  });
                }

                this.view.closeInfoWindow();

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function deleteOverlaysCluster(_x4) {
        return _deleteOverlaysCluster.apply(this, arguments);
      }

      return deleteOverlaysCluster;
    }()
  }, {
    key: "deleteAllOverlaysCluster",
    value: function () {
      var _deleteAllOverlaysCluster = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.markerClustererLayer && this.markerClustererLayer.length > 0) {
                  this.markerClustererLayer.forEach(function (layer) {
                    layer.clearMarkers();
                  });
                }

                this.view.closeInfoWindow();

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function deleteAllOverlaysCluster() {
        return _deleteAllOverlaysCluster.apply(this, arguments);
      }

      return deleteAllOverlaysCluster;
    }()
  }], [{
    key: "getInstance",
    value: function getInstance(view) {
      if (!OverlayBaidu.overlayBD) {
        OverlayBaidu.overlayBD = new OverlayBaidu(view);
      }

      return OverlayBaidu.overlayBD;
    }
  }]);

  return OverlayBaidu;
}();
// CONCATENATED MODULE: ./src/plugin/gis-viewer/widgets/BD/HeatMapBD.ts







var HeatMapBD_HeatMapBD = /*#__PURE__*/function () {
  function HeatMapBD(view) {
    _classCallCheck(this, HeatMapBD);

    this._state = "nomal";
    this.view = view;
  }

  _createClass(HeatMapBD, [{
    key: "isSupportCanvas",
    value: function isSupportCanvas() {
      var elem = document.createElement("canvas");
      return !!(elem.getContext && elem.getContext("2d"));
    }
  }, {
    key: "deleteHeatMap",
    value: function () {
      var _deleteHeatMap = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._clear();

                this.view.removeEventListener("zoomend", this.zoomEvent);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function deleteHeatMap() {
        return _deleteHeatMap.apply(this, arguments);
      }

      return deleteHeatMap;
    }()
  }, {
    key: "_clear",
    value: function _clear() {
      this.view.removeOverlay(this.heatmapOverlay);

      if (this.overlays) {
        this.overlays.deleteOverlays({
          types: ["heatpoint"]
        });
      }
    }
  }, {
    key: "addHeatLayer",
    value: function () {
      var _addHeatLayer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params) {
        var options, countField, radius, colors, maxValue, points, heatPoints, gradient;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = params.options;
                countField = options.field;
                radius = options.radius;
                colors = options.colors || undefined;
                maxValue = options.maxValue || 100;
                points = params.points;
                heatPoints = new Array();
                points.forEach(function (point) {
                  heatPoints.push({
                    lng: point.geometry.x,
                    lat: point.geometry.y,
                    count: point.fields[countField]
                  });
                });
                gradient = this.getHeatColor(colors);
                this.heatmapOverlay = new BMapLib.HeatmapOverlay({
                  radius: radius,
                  gradient: gradient
                });
                this.view.addOverlay(this.heatmapOverlay);
                this.heatmapOverlay.setDataSet({
                  data: heatPoints,
                  max: maxValue
                });
                return _context2.abrupt("return", {
                  status: 0,
                  message: "ok"
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addHeatLayer(_x) {
        return _addHeatLayer.apply(this, arguments);
      }

      return addHeatLayer;
    }()
  }, {
    key: "addHeatMap",
    value: function () {
      var _addHeatMap = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
        var options, zoom, _this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.isSupportCanvas()) {
                  alert("热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~");
                }

                options = params.options;
                zoom = options.zoom || 0;
                _this = this;

                if (zoom > 0) {
                  if (this.view.getZoom() <= zoom) {
                    this.addHeatLayer(params);
                    this._state = "hot";
                  } else {
                    this.addOverlays(params);
                    this._state = "nomal";
                  }

                  this.view.addEventListener("zoomend", this.zoomEvent = function (e) {
                    console.log(e.target.getZoom());

                    if (e.target.getZoom() <= zoom) {
                      if (_this._state == "nomal") {
                        _this._clear();

                        _this.addHeatLayer(params);

                        _this._state = "hot";
                      }
                    } else {
                      if (_this._state == "hot") {
                        _this._clear();

                        _this.addOverlays(params);

                        _this._state = "nomal";
                      }
                    }
                  });
                } else {
                  this.addHeatLayer(params);
                  this._state = "hot";
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addHeatMap(_x2) {
        return _addHeatMap.apply(this, arguments);
      }

      return addHeatMap;
    }()
  }, {
    key: "getHeatColor",
    value: function getHeatColor(colors) {
      var obj = {
        0.2: "rgb(0, 255, 255)",
        0.5: "rgb(0, 110, 255)",
        0.8: "rgb(100, 0, 255)"
      };

      if (colors && colors.length >= 4) {
        //"rgba(30,144,255,0)","rgba(30,144,255)","rgb(0, 255, 0)","rgb(255, 255, 0)", "rgb(254,89,0)"
        return {
          0.2: colors[0],
          0.4: colors[1],
          0.6: colors[2],
          0.8: colors[3]
        };
      }

      return obj;
    }
  }, {
    key: "addOverlays",
    value: function () {
      var _addOverlays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(params) {
        var points, options, renderer, symbol, overlayparams;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                points = params.points;
                options = params.options;
                renderer = options.renderer;

                if (options.renderer) {
                  symbol = {
                    type: "point",
                    url: renderer.symbol.url,
                    width: renderer.symbol.width,
                    height: renderer.symbol.height,
                    xoffset: renderer.symbol.xoffset || 0,
                    yoffset: renderer.symbol.yoffset || 0
                  };
                }

                overlayparams = {
                  defaultSymbol: symbol,
                  overlays: points,
                  type: "heatpoint"
                };
                this.overlays = OverlayBaidu_OverlayBaidu.getInstance(this.view);
                _context4.next = 8;
                return this.overlays.addOverlays(overlayparams);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function addOverlays(_x3) {
        return _addOverlays.apply(this, arguments);
      }

      return addOverlays;
    }()
  }], [{
    key: "getInstance",
    value: function getInstance(view) {
      if (!HeatMapBD.heatMapBD) {
        HeatMapBD.heatMapBD = new HeatMapBD(view);
      }

      return HeatMapBD.heatMapBD;
    }
  }]);

  return HeatMapBD;
}();
// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapAppBaidu.ts






















var MapAppBaidu_MapAppBaidu = /*#__PURE__*/function () {
  function MapAppBaidu() {
    _classCallCheck(this, MapAppBaidu);

    this.baseLayers = [];
  }

  _createClass(MapAppBaidu, [{
    key: "initialize",
    value: function () {
      var _initialize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(mapConfig, mapContainer) {
        var _this = this;

        var apiUrl, view, apiRoot, gisUrl, darklayer, maptype, zoom, center;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                apiUrl = mapConfig.arcgis_api; //"http://localhost:8090/baidu/BDAPI.js";

                _context.next = 3;
                return Object(esri_loader["loadScript"])({
                  url: "".concat(apiUrl)
                });

              case 3:
                apiRoot = mapConfig.arcgis_api.substring(0, apiUrl.lastIndexOf("/"));
                console.log(apiRoot);
                _context.next = 7;
                return this.loadOtherScripts([apiRoot + "/library/Heatmap/Heatmap_min.js", apiRoot + "/library/TextIconOverlay/TextIconOverlay_min.js", apiRoot + "/library/MarkerClusterer/MarkerClusterer_min.js"]).then(function (e) {
                  console.log("Load Scripts");
                });

              case 7:
                view = new BMap.Map(mapContainer);
                gisUrl = mapConfig.gisServer ? mapConfig.gisServer : this.getIpPort(apiUrl);

                if (mapConfig.theme === "dark") {
                  darklayer = new BMap.TileLayer();

                  darklayer["getTilesUrl"] = function (tileCoord, zoom, style) {
                    var x = Number((tileCoord.x + "").replace(/-/gi, "M"));
                    var y = Number((tileCoord.y + "").replace(/-/gi, "M"));
                    var z = zoom;
                    return gisUrl + "/customtile/" + z + "/" + ~~(x / 10) + "/" + ~~(y / 10) + "/" + x + "_" + y + ".png";
                  };

                  maptype = new BMap.MapType("地图", darklayer, {
                    tips: "显示午夜蓝地图",
                    maxZoom: 15
                  });
                  view.setMapType(maptype);
                }

                if (mapConfig.baseLayers) {
                  mapConfig.baseLayers.forEach(function (element) {
                    _this.createLayer(view, element);
                  });
                }

                zoom = 12;
                center = new BMap.Point(121.31, 31.2);

                if (mapConfig.options.zoom) {
                  zoom = mapConfig.options.zoom;
                }

                if (mapConfig.options.center) {
                  center = new BMap.Point(mapConfig.options.center[0], mapConfig.options.center[1]);
                }

                view.centerAndZoom(center, zoom);
                view.enableScrollWheelZoom();
                this.view = view;

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initialize(_x, _x2) {
        return _initialize.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "loadOtherScripts",
    value: function () {
      var _loadOtherScripts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(scriptUrls) {
        var promises;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                promises = scriptUrls.map(function (url) {
                  return new Promise(function (resolve, reject) {
                    var scriptElement = document.createElement("script");
                    scriptElement.src = url;
                    scriptElement.onload = resolve;
                    document.body.appendChild(scriptElement);
                  });
                });
                return _context2.abrupt("return", new Promise(function (resolve) {
                  Promise.all(promises).then(function (e) {
                    resolve(e);
                  });
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function loadOtherScripts(_x3) {
        return _loadOtherScripts.apply(this, arguments);
      }

      return loadOtherScripts;
    }() //得到url中的ip和port

  }, {
    key: "getIpPort",
    value: function getIpPort(url) {
      var urls = url.split("/");
      var ip = "";

      for (var el in urls) {
        if (el.indexOf(":") > 0 || el.indexOf(".") > 0) {
          ip = el;
          break;
        }
      }

      if (ip === "") {
        ip = urls[2];
      }

      return ip;
    }
  }, {
    key: "createLayer",
    value: function createLayer(view, layer) {
      switch (layer.type) {
        case "traffic":
          var trafficlayer = new BMap.TrafficLayer();

          if (layer.visible !== false) {
            view.addTileLayer(trafficlayer);
          }

          this.baseLayers.push({
            label: layer.label || "",
            type: layer.type || "",
            layer: trafficlayer,
            visible: layer.visible !== false
          });
          break;
      }
    }
  }, {
    key: "addOverlays",
    value: function () {
      var _addOverlays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(params) {
        var overlay;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                overlay = OverlayBaidu_OverlayBaidu.getInstance(this.view);
                overlay.showGisDeviceInfo = this.showGisDeviceInfo;
                _context3.next = 4;
                return overlay.addOverlays(params);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addOverlays(_x4) {
        return _addOverlays.apply(this, arguments);
      }

      return addOverlays;
    }()
  }, {
    key: "addOverlaysCluster",
    value: function () {
      var _addOverlaysCluster = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(params) {
        var overlay;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                overlay = OverlayBaidu_OverlayBaidu.getInstance(this.view);
                overlay.showGisDeviceInfo = this.showGisDeviceInfo;
                _context4.next = 4;
                return overlay.addOverlaysCluster(params);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function addOverlaysCluster(_x5) {
        return _addOverlaysCluster.apply(this, arguments);
      }

      return addOverlaysCluster;
    }()
  }, {
    key: "addHeatMap",
    value: function () {
      var _addHeatMap = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(params) {
        var heatmap;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                heatmap = HeatMapBD_HeatMapBD.getInstance(this.view);
                _context5.next = 3;
                return heatmap.addHeatMap(params);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addHeatMap(_x6) {
        return _addHeatMap.apply(this, arguments);
      }

      return addHeatMap;
    }()
  }, {
    key: "deleteOverlays",
    value: function () {
      var _deleteOverlays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(params) {
        var overlay;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                overlay = OverlayBaidu_OverlayBaidu.getInstance(this.view);
                _context6.next = 3;
                return overlay.deleteOverlays(params);

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function deleteOverlays(_x7) {
        return _deleteOverlays.apply(this, arguments);
      }

      return deleteOverlays;
    }()
  }, {
    key: "deleteOverlaysCluster",
    value: function () {
      var _deleteOverlaysCluster = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(params) {
        var overlay;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                overlay = OverlayBaidu_OverlayBaidu.getInstance(this.view);
                _context7.next = 3;
                return overlay.deleteOverlaysCluster(params);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function deleteOverlaysCluster(_x8) {
        return _deleteOverlaysCluster.apply(this, arguments);
      }

      return deleteOverlaysCluster;
    }()
  }, {
    key: "deleteAllOverlays",
    value: function () {
      var _deleteAllOverlays = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var overlay;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                overlay = OverlayBaidu_OverlayBaidu.getInstance(this.view);
                overlay.showGisDeviceInfo = this.showGisDeviceInfo;
                _context8.next = 4;
                return overlay.deleteAllOverlays();

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function deleteAllOverlays() {
        return _deleteAllOverlays.apply(this, arguments);
      }

      return deleteAllOverlays;
    }()
  }, {
    key: "deleteAllOverlaysCluster",
    value: function () {
      var _deleteAllOverlaysCluster = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var overlay;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                overlay = OverlayBaidu_OverlayBaidu.getInstance(this.view);
                overlay.showGisDeviceInfo = this.showGisDeviceInfo;
                _context9.next = 4;
                return overlay.deleteAllOverlaysCluster();

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function deleteAllOverlaysCluster() {
        return _deleteAllOverlaysCluster.apply(this, arguments);
      }

      return deleteAllOverlaysCluster;
    }()
  }, {
    key: "deleteHeatMap",
    value: function () {
      var _deleteHeatMap = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var heatmap;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                heatmap = HeatMapBD_HeatMapBD.getInstance(this.view);
                _context10.next = 3;
                return heatmap.deleteHeatMap();

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function deleteHeatMap() {
        return _deleteHeatMap.apply(this, arguments);
      }

      return deleteHeatMap;
    }()
  }, {
    key: "setMapCenter",
    value: function () {
      var _setMapCenter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(params) {
        var x, y, center;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                x = params.x;
                y = params.y;
                center = new BMap.Point(x, y);
                this.view.panTo(center);

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function setMapCenter(_x9) {
        return _setMapCenter.apply(this, arguments);
      }

      return setMapCenter;
    }()
  }, {
    key: "setMapCenterAndLevel",
    value: function () {
      var _setMapCenterAndLevel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(params) {
        var x, y, level, center;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                x = params.x;
                y = params.y;
                level = params.level || this.view.getZoom();
                center = new BMap.Point(x, y);
                this.view.centerAndZoom(center, level);

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function setMapCenterAndLevel(_x10) {
        return _setMapCenterAndLevel.apply(this, arguments);
      }

      return setMapCenterAndLevel;
    }()
  }, {
    key: "showLayer",
    value: function showLayer(params) {
      var _this2 = this;

      this.baseLayers.forEach(function (baselayer) {
        if (params.label && baselayer.label === params.label || params.type && baselayer.type === params.type) {
          if (!baselayer.visible) {
            _this2.view.addTileLayer(baselayer.layer);

            baselayer.visible = true;
          }
        }
      });
    }
  }, {
    key: "hideLayer",
    value: function hideLayer(params) {
      var _this3 = this;

      this.baseLayers.forEach(function (baselayer) {
        if (params.label && baselayer.label === params.label || params.type && baselayer.type === params.type) {
          if (baselayer.visible) {
            _this3.view.removeTileLayer(baselayer.layer);

            baselayer.visible = false;
          }
        }
      });
    }
  }]);

  return MapAppBaidu;
}();


// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--14-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!C:/Users/lvl/AppData/Roaming/npm/node_modules/babel-loader/lib!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_ts-loader@6.2.1@ts-loader??ref--14-3!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/plugin/gis-viewer/MapContainerBaidu.vue?vue&type=script&lang=ts&











var MapContainerBaiduvue_type_script_lang_ts_MapContainerArcgis = /*#__PURE__*/function (_Vue) {
  _inherits(MapContainerArcgis, _Vue);

  function MapContainerArcgis() {
    _classCallCheck(this, MapContainerArcgis);

    return _possibleConstructorReturn(this, _getPrototypeOf(MapContainerArcgis).apply(this, arguments));
  }

  _createClass(MapContainerArcgis, [{
    key: "mounted",
    value: function () {
      var _mounted = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.mapApp = new MapAppBaidu_MapAppBaidu();
                _context.next = 3;
                return this.mapApp.initialize(this.mapConfig, "divBMap");

              case 3:
                this.mapApp.showGisDeviceInfo = this.showGisDeviceInfo;

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function mounted() {
        return _mounted.apply(this, arguments);
      }

      return mounted;
    }()
  }, {
    key: "showGisDeviceInfo",
    value: function showGisDeviceInfo(type, id) {}
  }, {
    key: "addOverlays",
    value: function addOverlays(params) {
      this.mapApp.addOverlays(params);
    }
  }, {
    key: "addOverlaysCluster",
    value: function addOverlaysCluster(params) {
      this.mapApp.addOverlaysCluster(params);
    }
  }, {
    key: "addHeatMap",
    value: function addHeatMap(params) {
      this.mapApp.addHeatMap(params);
    }
  }, {
    key: "deleteOverlays",
    value: function deleteOverlays(params) {
      this.mapApp.deleteOverlays(params);
    }
  }, {
    key: "deleteOverlaysCluster",
    value: function deleteOverlaysCluster(params) {
      this.mapApp.deleteOverlaysCluster(params);
    }
  }, {
    key: "deleteAllOverlays",
    value: function deleteAllOverlays() {
      this.mapApp.deleteAllOverlays();
    }
  }, {
    key: "deleteAllOverlaysCluster",
    value: function deleteAllOverlaysCluster() {
      this.mapApp.deleteAllOverlaysCluster();
    }
  }, {
    key: "deleteHeatMap",
    value: function deleteHeatMap() {
      this.mapApp.deleteHeatMap();
    }
  }, {
    key: "showLayer",
    value: function showLayer(params) {
      this.mapApp.showLayer(params);
    }
  }, {
    key: "hideLayer",
    value: function hideLayer(params) {
      this.mapApp.hideLayer(params);
    }
  }, {
    key: "setMapCenter",
    value: function setMapCenter(params) {
      this.mapApp.setMapCenter(params);
    }
  }, {
    key: "setMapCenterAndLevel",
    value: function setMapCenterAndLevel(params) {
      this.mapApp.setMapCenterAndLevel(params);
    }
  }]);

  return MapContainerArcgis;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  type: Object
})], MapContainerBaiduvue_type_script_lang_ts_MapContainerArcgis.prototype, "mapConfig", void 0);

__decorate([Emit("map-loaded")], MapContainerBaiduvue_type_script_lang_ts_MapContainerArcgis.prototype, "mounted", null);

__decorate([Emit("marker-click")], MapContainerBaiduvue_type_script_lang_ts_MapContainerArcgis.prototype, "showGisDeviceInfo", null);

MapContainerBaiduvue_type_script_lang_ts_MapContainerArcgis = __decorate([vue_class_component_esm({
  name: "MapAppBaidu"
})], MapContainerBaiduvue_type_script_lang_ts_MapContainerArcgis);
/* harmony default export */ var MapContainerBaiduvue_type_script_lang_ts_ = (MapContainerBaiduvue_type_script_lang_ts_MapContainerArcgis);
// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapContainerBaidu.vue?vue&type=script&lang=ts&
 /* harmony default export */ var gis_viewer_MapContainerBaiduvue_type_script_lang_ts_ = (MapContainerBaiduvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/plugin/gis-viewer/MapContainerBaidu.vue?vue&type=style&index=0&id=da955b70&scoped=true&lang=css&
var MapContainerBaiduvue_type_style_index_0_id_da955b70_scoped_true_lang_css_ = __webpack_require__("bde4");

// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapContainerBaidu.vue






/* normalize component */

var MapContainerBaidu_component = normalizeComponent(
  gis_viewer_MapContainerBaiduvue_type_script_lang_ts_,
  MapContainerBaiduvue_type_template_id_da955b70_scoped_true_render,
  MapContainerBaiduvue_type_template_id_da955b70_scoped_true_staticRenderFns,
  false,
  null,
  "da955b70",
  null
  
)

/* harmony default export */ var MapContainerBaidu = (MapContainerBaidu_component.exports);
// CONCATENATED MODULE: ./src/types/map.ts
var Platforms;

(function (Platforms) {
  Platforms["ArcGIS3D"] = "arcgis3d";
  Platforms["ArcGIS2D"] = "arcgis2d";
  Platforms["BDMap"] = "bd";
})(Platforms || (Platforms = {}));
// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--14-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!C:/Users/lvl/AppData/Roaming/npm/node_modules/babel-loader/lib!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-plugin-typescript/node_modules/_ts-loader@6.2.1@ts-loader??ref--14-3!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/cache-loader/dist/cjs.js??ref--0-0!C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/node_modules/vue-loader/lib??vue-loader-options!./src/plugin/gis-viewer/MapContainer.vue?vue&type=script&lang=ts&












var MapContainervue_type_script_lang_ts_MapContainer = /*#__PURE__*/function (_Vue) {
  _inherits(MapContainer, _Vue);

  function MapContainer() {
    _classCallCheck(this, MapContainer);

    return _possibleConstructorReturn(this, _getPrototypeOf(MapContainer).apply(this, arguments));
  }

  _createClass(MapContainer, [{
    key: "mapLoaded",
    value: function mapLoaded() {}
  }, {
    key: "showGisDeviceInfo",
    value: function showGisDeviceInfo(type, id) {}
  }, {
    key: "addOverlays",
    value: function addOverlays(params) {
      this.mapContainer.addOverlays(params);
    }
  }, {
    key: "addOverlaysCluster",
    value: function addOverlaysCluster(params) {
      this.mapContainer.addOverlaysCluster(params);
    }
  }, {
    key: "addHeatMap",
    value: function addHeatMap(params) {
      this.mapContainer.addHeatMap(params);
    }
  }, {
    key: "deleteOverlays",
    value: function deleteOverlays(params) {
      this.mapContainer.deleteOverlays(params);
    }
  }, {
    key: "deleteOverlaysCluster",
    value: function deleteOverlaysCluster(params) {
      this.mapContainer.deleteOverlaysCluster(params);
    }
  }, {
    key: "deleteAllOverlays",
    value: function deleteAllOverlays() {
      this.mapContainer.deleteAllOverlays();
    }
  }, {
    key: "deleteAllOverlaysCluster",
    value: function deleteAllOverlaysCluster() {
      this.mapContainer.deleteAllOverlaysCluster();
    }
  }, {
    key: "deleteHeatMap",
    value: function deleteHeatMap() {
      this.mapContainer.deleteHeatMap();
    }
  }, {
    key: "showLayer",
    value: function showLayer(params) {
      this.mapContainer.showLayer(params);
    }
  }, {
    key: "hideLayer",
    value: function hideLayer(params) {
      this.mapContainer.hideLayer(params);
    }
  }, {
    key: "setMapCenter",
    value: function setMapCenter(params) {
      this.mapContainer.setMapCenter(params);
    }
  }, {
    key: "setMapCenterAndLevel",
    value: function setMapCenterAndLevel(params) {
      this.mapContainer.setMapCenterAndLevel(params);
    }
  }, {
    key: "mapContainer",
    //当前的地图容器
    get: function get() {
      switch (this.platform) {
        case Platforms.ArcGIS2D:
          return this.containerArcgis2D;

        case Platforms.ArcGIS3D:
          return this.containerArcgis3D;

        case Platforms.BDMap:
          return this.containerBaidu;

        default:
          return this.containerArcgis3D;
      }
    }
  }]);

  return MapContainer;
}(external_commonjs_vue_commonjs2_vue_root_Vue_default.a);

__decorate([Prop({
  default: Platforms.ArcGIS3D,
  type: String
})], MapContainervue_type_script_lang_ts_MapContainer.prototype, "platform", void 0);

__decorate([Prop({
  type: Object
})], MapContainervue_type_script_lang_ts_MapContainer.prototype, "mapConfig", void 0);

__decorate([Ref()], MapContainervue_type_script_lang_ts_MapContainer.prototype, "containerArcgis3D", void 0);

__decorate([Ref()], MapContainervue_type_script_lang_ts_MapContainer.prototype, "containerArcgis2D", void 0);

__decorate([Ref()], MapContainervue_type_script_lang_ts_MapContainer.prototype, "containerBaidu", void 0);

__decorate([Emit("map-loaded")], MapContainervue_type_script_lang_ts_MapContainer.prototype, "mapLoaded", null);

__decorate([Emit("marker-click")], MapContainervue_type_script_lang_ts_MapContainer.prototype, "showGisDeviceInfo", null);

MapContainervue_type_script_lang_ts_MapContainer = __decorate([vue_class_component_esm({
  components: {
    MapContainerArcgisThreeD: gis_viewer_MapContainerArcgis3D,
    MapContainerArcgisTwoD: MapContainerArcgis2D,
    MapContainerBaidu: MapContainerBaidu
  }
})], MapContainervue_type_script_lang_ts_MapContainer);
/* harmony default export */ var MapContainervue_type_script_lang_ts_ = (MapContainervue_type_script_lang_ts_MapContainer);
// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapContainer.vue?vue&type=script&lang=ts&
 /* harmony default export */ var gis_viewer_MapContainervue_type_script_lang_ts_ = (MapContainervue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./src/plugin/gis-viewer/MapContainer.vue?vue&type=style&index=0&id=f620c4b2&scoped=true&lang=css&
var MapContainervue_type_style_index_0_id_f620c4b2_scoped_true_lang_css_ = __webpack_require__("3011");

// CONCATENATED MODULE: ./src/plugin/gis-viewer/MapContainer.vue






/* normalize component */

var MapContainer_component = normalizeComponent(
  gis_viewer_MapContainervue_type_script_lang_ts_,
  MapContainervue_type_template_id_f620c4b2_scoped_true_render,
  staticRenderFns,
  false,
  null,
  "f620c4b2",
  null
  
)

/* harmony default export */ var gis_viewer_MapContainer = (MapContainer_component.exports);
// CONCATENATED MODULE: ./src/plugin/gis-viewer/index.ts

/* harmony default export */ var gis_viewer = (gis_viewer_MapContainer);
// CONCATENATED MODULE: ./src/plugin/index.ts





var components = {
  GisViewer: gis_viewer
};

var install = function install(vue) {
  // 安装全部的插件
  Object.keys(components).forEach(function (key) {
    vue.component(key, components[key]);
  });
};

/* harmony default export */ var src_plugin = (_objectSpread2({
  install: install
}, components));
// CONCATENATED MODULE: C:/Users/lvl/AppData/Roaming/npm/node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_plugin);



/***/ }),

/***/ "cdf9":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var isObject = __webpack_require__("861d");
var newPromiseCapability = __webpack_require__("f069");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var global = __webpack_require__("da84");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "d28b":
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__("746f");

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d3b7":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var redefine = __webpack_require__("6eeb");
var toString = __webpack_require__("b041");

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var regexpExec = __webpack_require__("9263");
var createNonEnumerableProperty = __webpack_require__("9112");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("f243")))

/***/ }),

/***/ "dbb4":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var ownKeys = __webpack_require__("56ef");
var toIndexedObject = __webpack_require__("fc6a");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var createProperty = __webpack_require__("8418");

// `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ "dbe9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "e01a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var has = __webpack_require__("5135");
var isObject = __webpack_require__("861d");
var defineProperty = __webpack_require__("9bf2").f;
var copyConstructorProperties = __webpack_require__("e893");

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "e163":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "e260":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var addToUnscopables = __webpack_require__("44d2");
var Iterators = __webpack_require__("3f8c");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "e2cc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("6eeb");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "e439":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
var DESCRIPTORS = __webpack_require__("83ab");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e58c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var toInteger = __webpack_require__("a691");
var toLength = __webpack_require__("50c4");
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf');
// For preventing possible almost infinite loop in non-standard implementations, test the forward version of the method
var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });
var FORCED = NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH;

// `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
module.exports = FORCED ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;
  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
  return -1;
} : nativeLastIndexOf;


/***/ }),

/***/ "e667":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ "e6cf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IS_PURE = __webpack_require__("c430");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var NativePromise = __webpack_require__("fea9");
var redefine = __webpack_require__("6eeb");
var redefineAll = __webpack_require__("e2cc");
var setToStringTag = __webpack_require__("d44e");
var setSpecies = __webpack_require__("2626");
var isObject = __webpack_require__("861d");
var aFunction = __webpack_require__("1c0b");
var anInstance = __webpack_require__("19aa");
var classof = __webpack_require__("c6b6");
var inspectSource = __webpack_require__("8925");
var iterate = __webpack_require__("2266");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");
var speciesConstructor = __webpack_require__("4840");
var task = __webpack_require__("2cf4").set;
var microtask = __webpack_require__("b575");
var promiseResolve = __webpack_require__("cdf9");
var hostReportErrors = __webpack_require__("44de");
var newPromiseCapabilityModule = __webpack_require__("f069");
var perform = __webpack_require__("e667");
var InternalStateModule = __webpack_require__("69f3");
var isForced = __webpack_require__("94ca");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    // https://github.com/zloirock/core-js/issues/640
    }, { unsafe: true });

    // wrap fetch result
    if (typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input /* , init */) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "e95a":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "f069":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__("1c0b");

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "f243":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "fea9":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global.Promise;


/***/ })

/******/ });
});
//# sourceMappingURL=gis-viewer.umd.js.map