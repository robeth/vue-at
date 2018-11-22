module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = scrollIntoView;
/* harmony export (immutable) */ __webpack_exports__["e"] = applyRange;
/* harmony export (immutable) */ __webpack_exports__["d"] = getRange;
/* harmony export (immutable) */ __webpack_exports__["a"] = getAtAndIndex;
/* harmony export (immutable) */ __webpack_exports__["b"] = getOffset;
/* harmony export (immutable) */ __webpack_exports__["g"] = closest;
/* harmony export (immutable) */ __webpack_exports__["c"] = getPrecedingRange;
// bug report: https://github.com/vuejs/awesome-vue/pull/1028
// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
function scrollIntoView(el, scrollParent) {
  if (el.scrollIntoViewIfNeeded) {
    el.scrollIntoViewIfNeeded(false); // alignToCenter=false
  } else {
    // should not use `el.scrollIntoView(false)` // alignToTop=false
    // bug report: https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move
    var diff = el.offsetTop - scrollParent.scrollTop;
    if (diff < 0 || diff > scrollParent.offsetHeight - el.offsetHeight) {
      scrollParent = scrollParent || el.parentElement;
      scrollParent.scrollTop = el.offsetTop;
    }
  }
}

function applyRange(range) {
  var selection = window.getSelection();
  if (selection) {
    // 容错
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
function getRange() {
  var selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    return selection.getRangeAt(0);
  }
}

function getAtAndIndex(text, ats) {
  return ats.map(function (at) {
    return { at: at, index: text.lastIndexOf(at) };
  }).reduce(function (a, b) {
    return a.index > b.index ? a : b;
  });
}

/* eslint-disable */
// http://stackoverflow.com/questions/26747240/plain-javascript-replication-to-offset-and-position
function getOffset(element, target) {
  // var element = document.getElementById(element),
  //     target  = target ? document.getElementById(target) : window;
  target = target || window;
  var offset = { top: element.offsetTop, left: element.offsetLeft },
      parent = element.offsetParent;
  while (parent != null && parent != target) {
    offset.left += parent.offsetLeft;
    offset.top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return offset;
}
// http://stackoverflow.com/questions/3972014/get-caret-position-in-contenteditable-div
function closest(el, predicate) {
  /* eslint-disable */
  do {
    if (predicate(el)) return el;
  } while (el = el && el.parentNode);
}
// http://stackoverflow.com/questions/15157435/get-last-character-before-caret-position-in-javascript
// 修复 "空格+表情+空格+@" range报错 应设(endContainer, 0)
// stackoverflow上的这段代码有bug
function getPrecedingRange() {
  var r = getRange();
  if (r) {
    var range = r.cloneRange();
    range.collapse(true);
    // var el = closest(range.endContainer, d => d.contentEditable)
    // range.setStart(el, 0)
    range.setStart(range.endContainer, 0);
    return range;
  }
}
/* eslint-enable */

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AtTemplate_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AtTemplate_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__AtTemplate_vue__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'At',
  mixins: [__WEBPACK_IMPORTED_MODULE_1__AtTemplate_vue___default.a],
  props: {
    at: {
      type: String,
      default: null
    },
    ats: {
      type: Array,
      default: function _default() {
        return ['@'];
      }
    },
    suffix: {
      type: String,
      default: ' '
    },
    loop: {
      type: Boolean,
      default: true
    },
    allowSpaces: {
      type: Boolean,
      default: true
    },
    avoidEmail: {
      type: Boolean,
      default: true
    },
    hoverSelect: {
      type: Boolean,
      default: true
    },
    members: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    nameKey: {
      type: String,
      default: ''
    },
    filterMatch: {
      type: Function,
      default: function _default(name, chunk, at) {
        // match at lower-case
        return name.toLowerCase().indexOf(chunk.toLowerCase()) > -1;
      }
    },
    deleteMatch: {
      type: Function,
      default: function _default(name, chunk, suffix) {
        return chunk === name + suffix;
      }
    },
    selectedItem: {
      type: Function,
      default: function _default(item) {}
    },
    scrollRef: {
      type: String,
      default: ''
    }
  },

  data: function data() {
    return {
      hasComposition: false,
      atwho: null
    };
  },

  computed: {
    atItems: function atItems() {
      return this.at ? [this.at] : this.ats;
    },
    style: function style() {
      if (this.atwho) {
        var _atwho = this.atwho,
            list = _atwho.list,
            cur = _atwho.cur,
            x = _atwho.x,
            y = _atwho.y;
        var wrap = this.$refs.wrap;

        if (wrap) {
          var offset = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* getOffset */])(wrap);
          var scrollLeft = this.scrollRef ? document.querySelector(this.scrollRef).scrollLeft : 0;
          var scrollTop = this.scrollRef ? document.querySelector(this.scrollRef).scrollTop : 0;
          var left = x + scrollLeft + window.pageXOffset - offset.left + 'px';
          var top = y + scrollTop + window.pageYOffset - offset.top + 'px';
          return { left: left, top: top };
        }
      }
      return null;
    }
  },
  watch: {
    'atwho.cur': function atwhoCur(index) {
      var _this = this;

      if (index != null) {
        // cur index exists
        this.$nextTick(function () {
          _this.scrollToCur();
        });
      }
    },
    members: function members() {
      this.handleInput(true);
    }
  },

  methods: {
    itemName: function itemName(v) {
      var nameKey = this.nameKey;

      return nameKey ? v[nameKey] : v;
    },
    isCur: function isCur(index) {
      return index === this.atwho.cur;
    },
    handleItemHover: function handleItemHover(e) {
      if (this.hoverSelect) {
        this.selectByMouse(e);
      }
    },
    handleItemClick: function handleItemClick(e) {
      this.selectByMouse(e);
      this.insertItem();
    },
    handleDelete: function handleDelete(e) {
      var range = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* getPrecedingRange */])();
      if (range) {
        var atItems = this.atItems,
            members = this.members,
            suffix = this.suffix,
            deleteMatch = this.deleteMatch,
            itemName = this.itemName;

        var text = range.toString();

        var _getAtAndIndex = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* getAtAndIndex */])(text, atItems),
            at = _getAtAndIndex.at,
            index = _getAtAndIndex.index;

        if (index > -1) {
          var chunk = text.slice(index + at.length);
          var has = members.some(function (v) {
            // comment revy
            // const name = itemName(v)
            // return deleteMatch(name, chunk, suffix)
            return deleteMatch(v, chunk, suffix);
          });
          if (has) {
            e.preventDefault();
            e.stopPropagation();
            var r = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["d" /* getRange */])();
            if (r) {
              r.setStart(r.endContainer, index);
              r.deleteContents();
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* applyRange */])(r);
              this.handleInput();
            }
          }
        }
      }
    },
    handleKeyDown: function handleKeyDown(e) {
      var _this2 = this;

      var atwho = this.atwho;

      if (atwho) {
        if (e.keyCode === 38 || e.keyCode === 40) {
          // ↑/↓
          if (!(e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            e.stopPropagation();
            this.selectByKeyboard(e);
          }
          return;
        }
        if (e.keyCode === 13) {
          // enter
          this.insertItem();
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (e.keyCode === 27) {
          // esc
          this.closePanel();
          return;
        }
      }

      // 为了兼容ie ie9~11 editable无input事件 只能靠keydown触发 textarea正常
      // 另 ie9 textarea的delete不触发input
      var isValid = e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 8;
      if (isValid) {
        setTimeout(function () {
          _this2.handleInput();
        }, 50);
      }

      if (e.keyCode === 8) {
        this.handleDelete(e);
      }
    },


    // compositionStart -> input -> compositionEnd
    handleCompositionStart: function handleCompositionStart() {
      this.hasComposition = true;
    },
    handleCompositionEnd: function handleCompositionEnd() {
      this.hasComposition = false;
      this.handleInput();
    },
    handleInput: function handleInput(keep) {
      if (this.hasComposition) return;
      var range = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["c" /* getPrecedingRange */])();
      if (range) {
        var atItems = this.atItems,
            avoidEmail = this.avoidEmail,
            allowSpaces = this.allowSpaces;


        var show = true;
        var text = range.toString();

        var _getAtAndIndex2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* getAtAndIndex */])(text, atItems),
            at = _getAtAndIndex2.at,
            index = _getAtAndIndex2.index;

        if (index < 0) show = false;
        var prev = text[index - 1];

        var chunk = text.slice(index + at.length, text.length);

        if (avoidEmail) {
          // 上一个字符不能为字母数字 避免与邮箱冲突
          // 微信则是避免 所有字母数字及半角符号
          if (/^[a-z0-9]$/i.test(prev)) show = false;
        }

        if (!allowSpaces && /\s/.test(chunk)) {
          show = false;
        }

        // chunk以空白字符开头不匹配 避免`@ `也匹配
        if (/^\s/.test(chunk)) show = false;

        if (!show) {
          this.closePanel();
        } else {
          var members = this.members,
              filterMatch = this.filterMatch,
              itemName = this.itemName;

          if (!keep && chunk.length > 0) {
            this.$emit('at', chunk);
          }
          var matched = members.filter(function (v) {
            // comment revy
            // const name = itemName(v)
            // return filterMatch(name, chunk, at)
            return filterMatch(v, chunk, at);
          });
          if (matched.length) {
            this.openPanel(matched, range, index, at);
          } else {
            this.closePanel();
          }
        }
      }
    },
    closePanel: function closePanel() {
      if (this.atwho) {
        this.atwho = null;
      }
    },
    openPanel: function openPanel(list, range, offset, at) {
      var _this3 = this;

      var fn = function fn() {
        var r = range.cloneRange();
        r.setStart(r.endContainer, offset + at.length); // 从@后第一位开始
        // todo: 根据窗口空间 判断向上或是向下展开
        var rect = r.getClientRects()[0];
        _this3.atwho = {
          range: range,
          offset: offset,
          list: list,
          x: rect.left,
          y: rect.top - 4,
          cur: 0 // todo: 尽可能记录
        };
      };
      if (this.atwho) {
        fn();
      } else {
        // 焦点超出了显示区域 需要提供延时以移动指针 再计算位置
        setTimeout(fn, 10);
      }
    },
    scrollToCur: function scrollToCur() {
      var curEl = this.$refs.cur[0];
      var scrollParent = curEl.parentElement.parentElement; // .atwho-view
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["f" /* scrollIntoView */])(curEl, scrollParent);
    },
    selectByMouse: function selectByMouse(e) {
      var el = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["g" /* closest */])(e.target, function (d) {
        return d.getAttribute('data-index');
      });
      var cur = +el.getAttribute('data-index');
      this.atwho = _extends({}, this.atwho, {
        cur: cur
      });
    },
    selectByKeyboard: function selectByKeyboard(e) {
      var offset = e.keyCode === 38 ? -1 : 1;
      var _atwho2 = this.atwho,
          cur = _atwho2.cur,
          list = _atwho2.list;

      var nextCur = this.loop ? (cur + offset + list.length) % list.length : Math.max(0, Math.min(cur + offset, list.length - 1));
      this.atwho = _extends({}, this.atwho, {
        cur: nextCur
      });
    },


    // todo: 抽离成库并测试
    insertText: function insertText(text, r) {
      r.deleteContents();
      var node = r.endContainer;
      if (node.nodeType === Node.TEXT_NODE) {
        var cut = r.endOffset;
        node.data = node.data.slice(0, cut) + text + node.data.slice(cut);
        r.setEnd(node, cut + text.length);
      } else {
        var t = document.createTextNode(text);
        r.insertNode(t);
        r.setEndAfter(t);
      }
      r.collapse(false); // 参数在IE下必传
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* applyRange */])(r);
    },
    insertItem: function insertItem() {
      var _atwho3 = this.atwho,
          range = _atwho3.range,
          offset = _atwho3.offset,
          list = _atwho3.list,
          cur = _atwho3.cur;
      var suffix = this.suffix,
          atItems = this.atItems,
          itemName = this.itemName;

      var r = range.cloneRange();
      var text = range.toString();

      var _getAtAndIndex3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["a" /* getAtAndIndex */])(text, atItems),
          at = _getAtAndIndex3.at,
          index = _getAtAndIndex3.index;

      var start = index + at.length; // 从@后第一位开始
      r.setStart(r.endContainer, start);
      // hack: 连续两次 可以确保click后 focus回来 range真正生效
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* applyRange */])(r);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["e" /* applyRange */])(r);
      var t = itemName(list[cur]) + suffix;

      console.log('masuk 1' + t);
      console.log('masuk 2' + list[cur]);

      this.selectedItem(list[cur]);
      this.insertText(t, r);
      this.handleInput();
    }
  }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, ".atwho-view{color:#000;border-radius:3px;box-shadow:0 0 5px rgba(0,0,0,.1);min-width:120px;z-index:11110!important}.atwho-ul{list-style:none}.atwho-li{display:block}.atwho-view{border-radius:6px;box-shadow:0 0 10px 0 hsla(211,9%,44%,.5)}.atwho-ul{max-height:135px;padding:0;margin:0}.atwho-li{box-sizing:border-box;height:27px;padding:0 12px;white-space:nowrap;display:flex;align-items:center}.atwho-li span{overflow:hidden;text-overflow:ellipsis}.atwho-cur{background:#5bb8ff;color:#fff}.atwho-wrap{position:relative}.atwho-panel{position:absolute}.atwho-inner{position:relative}.atwho-view{position:absolute;bottom:0;left:-.8em;cursor:default;background-color:hsla(0,0%,100%,.94);min-width:140px;max-width:180px;max-height:200px;overflow-y:auto}.atwho-view::-webkit-scrollbar{width:11px;height:11px}.atwho-view::-webkit-scrollbar-track{background-color:#f5f5f5}.atwho-view::-webkit-scrollbar-thumb{min-height:36px;border:2px solid transparent;border-top:3px solid transparent;border-bottom:3px solid transparent;background-clip:padding-box;border-radius:7px;background-color:#c4c4c4}", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(2),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(9)

var Component = __webpack_require__(0)(
  /* script */
  null,
  /* template */
  __webpack_require__(7),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "wrap",
    staticClass: "atwho-wrap",
    on: {
      "compositionstart": _vm.handleCompositionStart,
      "compositionend": _vm.handleCompositionEnd,
      "input": function($event) {
        _vm.handleInput()
      },
      "keydown": _vm.handleKeyDown
    }
  }, [(_vm.atwho) ? _c('div', {
    staticClass: "atwho-panel",
    style: (_vm.style)
  }, [_c('div', {
    staticClass: "atwho-inner"
  }, [_c('div', {
    staticClass: "atwho-view"
  }, [_c('ul', {
    staticClass: "atwho-ul"
  }, _vm._l((_vm.atwho.list), function(item, index) {
    return _c('li', {
      ref: _vm.isCur(index) && 'cur',
      refInFor: true,
      staticClass: "atwho-li",
      class: _vm.isCur(index) && 'atwho-cur',
      attrs: {
        "data-index": index
      },
      on: {
        "mouseenter": _vm.handleItemHover,
        "click": _vm.handleItemClick
      }
    }, [_vm._t("item", [_c('span', {
      domProps: {
        "textContent": _vm._s(_vm.itemName(item))
      }
    })], {
      item: item
    })], 2)
  }))])])]) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;
	var sourceMap = obj.sourceMap;

	if (media) {
		styleElement.setAttribute("media", media);
	}

	if (sourceMap) {
		// https://developer.chrome.com/devtools/docs/javascript-debugging
		// this makes source maps inside style tags work properly in Chrome
		css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(8)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4c1800ff!../node_modules/sass-loader/index.js!./At.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4c1800ff!../node_modules/sass-loader/index.js!./At.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })
/******/ ]);
//# sourceMappingURL=vue-at.js.map