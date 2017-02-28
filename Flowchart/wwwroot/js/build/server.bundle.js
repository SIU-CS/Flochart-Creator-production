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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var ____Class1=React.Component;for(var ____Class1____Key in ____Class1){if(____Class1.hasOwnProperty(____Class1____Key)){AddStepButton[____Class1____Key]=____Class1[____Class1____Key];}}var ____SuperProtoOf____Class1=____Class1===null?null:____Class1.prototype;AddStepButton.prototype=Object.create(____SuperProtoOf____Class1);AddStepButton.prototype.constructor=AddStepButton;AddStepButton.__superConstructor__=____Class1;function AddStepButton(){"use strict";if(____Class1!==null){____Class1.apply(this,arguments);}}
    Object.defineProperty(AddStepButton.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        React.createElement("div", null, "New Step")
    }});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["Components"] = __webpack_require__(4);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

let AddStepButton = __webpack_require__(0)
var ____Class0=React.Component;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){Canvas[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;Canvas.prototype=Object.create(____SuperProtoOf____Class0);Canvas.prototype.constructor=Canvas;Canvas.__superConstructor__=____Class0;function Canvas(){"use strict";if(____Class0!==null){____Class0.apply(this,arguments);}}
    Object.defineProperty(Canvas.prototype,"construtctor",{writable:true,configurable:true,value:function() {"use strict";
        this.state = {
            stepList: [],
            body: []
        }
    }});

    Object.defineProperty(Canvas.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {"use strict";
        if (this.props.stepList.length > 0) {
            this.createStepComponents();
        }
        else {
            this.setState({
                body: React.createElement(AddStepButton, null)
            });
        }
    }});

    Object.defineProperty(Canvas.prototype,"createStepComponents",{writable:true,configurable:true,value:function() {"use strict";
    }});

    Object.defineProperty(Canvas.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        return (
            React.createElement("div", null, 
                "Testing"
            )
        );
    }});

ReactDOM.render(
    React.createElement(Canvas, null),
    document.getElementById('flowchart-canvas')
);





/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant 
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = {
    Canvas: __webpack_require__(3),
    AddStepButton: __webpack_require__(0)
};

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant 
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// All JavaScript in here will be loaded server-side

// Expose components globally so ReactJS.NET can use them
var Components = __webpack_require__(1);

/***/ })
/******/ ]);