import {
  require_react_dom
} from "./chunk-JMVEG3FK.js";
import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addQuarters,
  addWeeks,
  addYears,
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  getDate,
  getDay,
  getHours,
  getISOWeek,
  getMinutes,
  getMonth,
  getQuarter,
  getSeconds,
  getTime,
  getYear,
  isAfter,
  isBefore,
  isDate,
  isEqual,
  isSameDay,
  isSameMonth,
  isSameQuarter,
  isSameYear,
  isValid,
  isWithinInterval,
  max,
  min,
  parse,
  parseISO,
  set,
  setHours,
  setMinutes,
  setMonth,
  setQuarter,
  setSeconds,
  setYear,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subQuarters,
  subWeeks,
  subYears,
  toDate
} from "./chunk-KZPKZX2E.js";
import {
  require_react
} from "./chunk-TWJRYSII.js";
import {
  __commonJS,
  __toESM
} from "./chunk-DC5AMYBS.js";

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element2 = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement2(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element2;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement2;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/object-assign/index.js
var require_object_assign = __commonJS({
  "node_modules/object-assign/index.js"(exports, module) {
    "use strict";
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;
    function toObject(val) {
      if (val === null || val === void 0) {
        throw new TypeError("Object.assign cannot be called with null or undefined");
      }
      return Object(val);
    }
    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        }
        var test1 = new String("abc");
        test1[5] = "de";
        if (Object.getOwnPropertyNames(test1)[0] === "5") {
          return false;
        }
        var test2 = {};
        for (var i = 0; i < 10; i++) {
          test2["_" + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
          return test2[n];
        });
        if (order2.join("") !== "0123456789") {
          return false;
        }
        var test3 = {};
        "abcdefghijklmnopqrst".split("").forEach(function(letter) {
          test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    module.exports = shouldUseNative() ? Object.assign : function(target, source) {
      var from;
      var to = toObject(target);
      var symbols;
      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }
        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }
      return to;
    };
  }
});

// node_modules/prop-types/lib/ReactPropTypesSecret.js
var require_ReactPropTypesSecret = __commonJS({
  "node_modules/prop-types/lib/ReactPropTypesSecret.js"(exports, module) {
    "use strict";
    var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    module.exports = ReactPropTypesSecret;
  }
});

// node_modules/prop-types/lib/has.js
var require_has = __commonJS({
  "node_modules/prop-types/lib/has.js"(exports, module) {
    module.exports = Function.call.bind(Object.prototype.hasOwnProperty);
  }
});

// node_modules/prop-types/checkPropTypes.js
var require_checkPropTypes = __commonJS({
  "node_modules/prop-types/checkPropTypes.js"(exports, module) {
    "use strict";
    var printWarning = function() {
    };
    if (true) {
      ReactPropTypesSecret = require_ReactPropTypesSecret();
      loggedTypeFailures = {};
      has = require_has();
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    var ReactPropTypesSecret;
    var loggedTypeFailures;
    var has;
    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      if (true) {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error;
            try {
              if (typeof typeSpecs[typeSpecName] !== "function") {
                var err = Error(
                  (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
                );
                err.name = "Invariant Violation";
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : "";
              printWarning(
                "Failed " + location + " type: " + error.message + (stack != null ? stack : "")
              );
            }
          }
        }
      }
    }
    checkPropTypes.resetWarningCache = function() {
      if (true) {
        loggedTypeFailures = {};
      }
    };
    module.exports = checkPropTypes;
  }
});

// node_modules/prop-types/factoryWithTypeCheckers.js
var require_factoryWithTypeCheckers = __commonJS({
  "node_modules/prop-types/factoryWithTypeCheckers.js"(exports, module) {
    "use strict";
    var ReactIs = require_react_is();
    var assign = require_object_assign();
    var ReactPropTypesSecret = require_ReactPropTypesSecret();
    var has = require_has();
    var checkPropTypes = require_checkPropTypes();
    var printWarning = function() {
    };
    if (true) {
      printWarning = function(text) {
        var message = "Warning: " + text;
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
    }
    function emptyFunctionThatReturnsNull() {
      return null;
    }
    module.exports = function(isValidElement, throwOnDirectAccess) {
      var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
        if (typeof iteratorFn === "function") {
          return iteratorFn;
        }
      }
      var ANONYMOUS = "<<anonymous>>";
      var ReactPropTypes = {
        array: createPrimitiveTypeChecker("array"),
        bigint: createPrimitiveTypeChecker("bigint"),
        bool: createPrimitiveTypeChecker("boolean"),
        func: createPrimitiveTypeChecker("function"),
        number: createPrimitiveTypeChecker("number"),
        object: createPrimitiveTypeChecker("object"),
        string: createPrimitiveTypeChecker("string"),
        symbol: createPrimitiveTypeChecker("symbol"),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      function is(x, y) {
        if (x === y) {
          return x !== 0 || 1 / x === 1 / y;
        } else {
          return x !== x && y !== y;
        }
      }
      function PropTypeError(message, data) {
        this.message = message;
        this.data = data && typeof data === "object" ? data : {};
        this.stack = "";
      }
      PropTypeError.prototype = Error.prototype;
      function createChainableTypeChecker(validate) {
        if (true) {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }
        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;
          if (secret !== ReactPropTypesSecret) {
            if (throwOnDirectAccess) {
              var err = new Error(
                "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
              );
              err.name = "Invariant Violation";
              throw err;
            } else if (typeof console !== "undefined") {
              var cacheKey = componentName + ":" + propName;
              if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3) {
                printWarning(
                  "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
                );
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }
          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`."));
              }
              return new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`."));
            }
            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }
        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }
      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== expectedType) {
            var preciseType = getPreciseType(propValue);
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
              { expectedType }
            );
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }
      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
          }
          var propValue = props[propName];
          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
          }
          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
            if (error instanceof Error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          if (!ReactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          if (true) {
            if (arguments.length > 1) {
              printWarning(
                "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
              );
            } else {
              printWarning("Invalid argument supplied to oneOf, expected an array.");
            }
          }
          return emptyFunctionThatReturnsNull;
        }
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }
          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);
            if (type === "symbol") {
              return String(value);
            }
            return value;
          });
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== "function") {
            return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
          }
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
          }
          for (var key in propValue) {
            if (has(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
              if (error instanceof Error) {
                return error;
              }
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
          true ? printWarning("Invalid argument supplied to oneOfType, expected an instance of array.") : void 0;
          return emptyFunctionThatReturnsNull;
        }
        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];
          if (typeof checker !== "function") {
            printWarning(
              "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
            );
            return emptyFunctionThatReturnsNull;
          }
        }
        function validate(props, propName, componentName, location, propFullName) {
          var expectedTypes = [];
          for (var i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
            var checker2 = arrayOfTypeCheckers[i2];
            var checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
            if (checkerResult == null) {
              return null;
            }
            if (checkerResult.data && has(checkerResult.data, "expectedType")) {
              expectedTypes.push(checkerResult.data.expectedType);
            }
          }
          var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
        }
        return createChainableTypeChecker(validate);
      }
      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function invalidValidatorError(componentName, location, propFullName, key, type) {
        return new PropTypeError(
          (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
        );
      }
      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          for (var key in shapeTypes) {
            var checker = shapeTypes[key];
            if (typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);
          if (propType !== "object") {
            return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
          }
          var allKeys = assign({}, props[propName], shapeTypes);
          for (var key in allKeys) {
            var checker = shapeTypes[key];
            if (has(shapeTypes, key) && typeof checker !== "function") {
              return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
            }
            if (!checker) {
              return new PropTypeError(
                "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(shapeTypes), null, "  ")
              );
            }
            var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error) {
              return error;
            }
          }
          return null;
        }
        return createChainableTypeChecker(validate);
      }
      function isNode(propValue) {
        switch (typeof propValue) {
          case "number":
          case "string":
          case "undefined":
            return true;
          case "boolean":
            return !propValue;
          case "object":
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }
            if (propValue === null || isValidElement(propValue)) {
              return true;
            }
            var iteratorFn = getIteratorFn(propValue);
            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;
              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                while (!(step = iterator.next()).done) {
                  var entry = step.value;
                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }
            return true;
          default:
            return false;
        }
      }
      function isSymbol(propType, propValue) {
        if (propType === "symbol") {
          return true;
        }
        if (!propValue) {
          return false;
        }
        if (propValue["@@toStringTag"] === "Symbol") {
          return true;
        }
        if (typeof Symbol === "function" && propValue instanceof Symbol) {
          return true;
        }
        return false;
      }
      function getPropType(propValue) {
        var propType = typeof propValue;
        if (Array.isArray(propValue)) {
          return "array";
        }
        if (propValue instanceof RegExp) {
          return "object";
        }
        if (isSymbol(propType, propValue)) {
          return "symbol";
        }
        return propType;
      }
      function getPreciseType(propValue) {
        if (typeof propValue === "undefined" || propValue === null) {
          return "" + propValue;
        }
        var propType = getPropType(propValue);
        if (propType === "object") {
          if (propValue instanceof Date) {
            return "date";
          } else if (propValue instanceof RegExp) {
            return "regexp";
          }
        }
        return propType;
      }
      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);
        switch (type) {
          case "array":
          case "object":
            return "an " + type;
          case "boolean":
          case "date":
          case "regexp":
            return "a " + type;
          default:
            return type;
        }
      }
      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }
        return propValue.constructor.name;
      }
      ReactPropTypes.checkPropTypes = checkPropTypes;
      ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };
  }
});

// node_modules/prop-types/index.js
var require_prop_types = __commonJS({
  "node_modules/prop-types/index.js"(exports, module) {
    if (true) {
      ReactIs = require_react_is();
      throwOnDirectAccess = true;
      module.exports = require_factoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
    } else {
      module.exports = null();
    }
    var ReactIs;
    var throwOnDirectAccess;
  }
});

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports, module) {
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      function classNames() {
        var classes = "";
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg) {
            classes = appendClass(classes, parseValue(arg));
          }
        }
        return classes;
      }
      function parseValue(arg) {
        if (typeof arg === "string" || typeof arg === "number") {
          return arg;
        }
        if (typeof arg !== "object") {
          return "";
        }
        if (Array.isArray(arg)) {
          return classNames.apply(null, arg);
        }
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
          return arg.toString();
        }
        var classes = "";
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes = appendClass(classes, key);
          }
        }
        return classes;
      }
      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }
        if (value) {
          return value + " " + newClass;
        }
        return value + newClass;
      }
      if (typeof module !== "undefined" && module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames;
        });
      } else {
        window.classNames = classNames;
      }
    })();
  }
});

// node_modules/react-fast-compare/index.js
var require_react_fast_compare = __commonJS({
  "node_modules/react-fast-compare/index.js"(exports, module) {
    var hasElementType = typeof Element !== "undefined";
    var hasMap = typeof Map === "function";
    var hasSet = typeof Set === "function";
    var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
    function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        var it2;
        if (hasMap && a instanceof Map && b instanceof Map) {
          if (a.size !== b.size) return false;
          it2 = a.entries();
          while (!(i = it2.next()).done)
            if (!b.has(i.value[0])) return false;
          it2 = a.entries();
          while (!(i = it2.next()).done)
            if (!equal(i.value[1], b.get(i.value[0]))) return false;
          return true;
        }
        if (hasSet && a instanceof Set && b instanceof Set) {
          if (a.size !== b.size) return false;
          it2 = a.entries();
          while (!(i = it2.next()).done)
            if (!b.has(i.value[0])) return false;
          return true;
        }
        if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (a[i] !== b[i]) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === "function" && typeof b.valueOf === "function") return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString && typeof a.toString === "function" && typeof b.toString === "function") return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        if (hasElementType && a instanceof Element) return false;
        for (i = length; i-- !== 0; ) {
          if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
            continue;
          }
          if (!equal(a[keys[i]], b[keys[i]])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    }
    module.exports = function isEqual3(a, b) {
      try {
        return equal(a, b);
      } catch (error) {
        if ((error.message || "").match(/stack|recursion/i)) {
          console.warn("react-fast-compare cannot handle circular refs");
          return false;
        }
        throw error;
      }
    };
  }
});

// node_modules/warning/warning.js
var require_warning = __commonJS({
  "node_modules/warning/warning.js"(exports, module) {
    "use strict";
    var __DEV__ = true;
    var warning2 = function() {
    };
    if (__DEV__) {
      printWarning = function printWarning2(format2, args) {
        var len = arguments.length;
        args = new Array(len > 1 ? len - 1 : 0);
        for (var key = 1; key < len; key++) {
          args[key - 1] = arguments[key];
        }
        var argIndex = 0;
        var message = "Warning: " + format2.replace(/%s/g, function() {
          return args[argIndex++];
        });
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
      warning2 = function(condition, format2, args) {
        var len = arguments.length;
        args = new Array(len > 2 ? len - 2 : 0);
        for (var key = 2; key < len; key++) {
          args[key - 2] = arguments[key];
        }
        if (format2 === void 0) {
          throw new Error(
            "`warning(condition, format, ...args)` requires a warning message argument"
          );
        }
        if (!condition) {
          printWarning.apply(null, [format2].concat(args));
        }
      };
    }
    var printWarning;
    module.exports = warning2;
  }
});

// node_modules/react-datepicker/dist/es/index.js
var import_react2 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_classnames = __toESM(require_classnames());

// node_modules/react-onclickoutside/dist/react-onclickoutside.es.js
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function isNodeFound(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  }
  if (current.correspondingElement) {
    return current.correspondingElement.classList.contains(ignoreClass);
  }
  return current.classList.contains(ignoreClass);
}
function findHighest(current, componentNode, ignoreClass) {
  if (current === componentNode) {
    return true;
  }
  while (current.parentNode || current.host) {
    if (current.parentNode && isNodeFound(current, componentNode, ignoreClass)) {
      return true;
    }
    current = current.parentNode || current.host;
  }
  return current;
}
function clickedScrollbar(evt) {
  return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY;
}
var testPassiveEventSupport = function testPassiveEventSupport2() {
  if (typeof window === "undefined" || typeof window.addEventListener !== "function") {
    return;
  }
  var passive2 = false;
  var options = Object.defineProperty({}, "passive", {
    get: function get() {
      passive2 = true;
    }
  });
  var noop = function noop2() {
  };
  window.addEventListener("testPassiveEventSupport", noop, options);
  window.removeEventListener("testPassiveEventSupport", noop, options);
  return passive2;
};
function autoInc(seed) {
  if (seed === void 0) {
    seed = 0;
  }
  return function() {
    return ++seed;
  };
}
var uid = autoInc();
var passiveEventSupport;
var handlersMap = {};
var enabledInstances = {};
var touchEvents = ["touchstart", "touchmove"];
var IGNORE_CLASS_NAME = "ignore-react-onclickoutside";
function getEventHandlerOptions(instance, eventName) {
  var handlerOptions = {};
  var isTouchEvent = touchEvents.indexOf(eventName) !== -1;
  if (isTouchEvent && passiveEventSupport) {
    handlerOptions.passive = !instance.props.preventDefault;
  }
  return handlerOptions;
}
function onClickOutsideHOC(WrappedComponent, config) {
  var _class, _temp;
  var componentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
  return _temp = _class = function(_Component) {
    _inheritsLoose(onClickOutside, _Component);
    function onClickOutside(props) {
      var _this;
      _this = _Component.call(this, props) || this;
      _this.__outsideClickHandler = function(event) {
        if (typeof _this.__clickOutsideHandlerProp === "function") {
          _this.__clickOutsideHandlerProp(event);
          return;
        }
        var instance = _this.getInstance();
        if (typeof instance.props.handleClickOutside === "function") {
          instance.props.handleClickOutside(event);
          return;
        }
        if (typeof instance.handleClickOutside === "function") {
          instance.handleClickOutside(event);
          return;
        }
        throw new Error("WrappedComponent: " + componentName + " lacks a handleClickOutside(event) function for processing outside click events.");
      };
      _this.__getComponentNode = function() {
        var instance = _this.getInstance();
        if (config && typeof config.setClickOutsideRef === "function") {
          return config.setClickOutsideRef()(instance);
        }
        if (typeof instance.setClickOutsideRef === "function") {
          return instance.setClickOutsideRef();
        }
        return (0, import_react_dom.findDOMNode)(instance);
      };
      _this.enableOnClickOutside = function() {
        if (typeof document === "undefined" || enabledInstances[_this._uid]) {
          return;
        }
        if (typeof passiveEventSupport === "undefined") {
          passiveEventSupport = testPassiveEventSupport();
        }
        enabledInstances[_this._uid] = true;
        var events = _this.props.eventTypes;
        if (!events.forEach) {
          events = [events];
        }
        handlersMap[_this._uid] = function(event) {
          if (_this.componentNode === null) return;
          if (_this.initTimeStamp > event.timeStamp) return;
          if (_this.props.preventDefault) {
            event.preventDefault();
          }
          if (_this.props.stopPropagation) {
            event.stopPropagation();
          }
          if (_this.props.excludeScrollbar && clickedScrollbar(event)) return;
          var current = event.composed && event.composedPath && event.composedPath().shift() || event.target;
          if (findHighest(current, _this.componentNode, _this.props.outsideClickIgnoreClass) !== document) {
            return;
          }
          _this.__outsideClickHandler(event);
        };
        events.forEach(function(eventName) {
          document.addEventListener(eventName, handlersMap[_this._uid], getEventHandlerOptions(_assertThisInitialized(_this), eventName));
        });
      };
      _this.disableOnClickOutside = function() {
        delete enabledInstances[_this._uid];
        var fn2 = handlersMap[_this._uid];
        if (fn2 && typeof document !== "undefined") {
          var events = _this.props.eventTypes;
          if (!events.forEach) {
            events = [events];
          }
          events.forEach(function(eventName) {
            return document.removeEventListener(eventName, fn2, getEventHandlerOptions(_assertThisInitialized(_this), eventName));
          });
          delete handlersMap[_this._uid];
        }
      };
      _this.getRef = function(ref) {
        return _this.instanceRef = ref;
      };
      _this._uid = uid();
      _this.initTimeStamp = performance.now();
      return _this;
    }
    var _proto = onClickOutside.prototype;
    _proto.getInstance = function getInstance() {
      if (WrappedComponent.prototype && !WrappedComponent.prototype.isReactComponent) {
        return this;
      }
      var ref = this.instanceRef;
      return ref.getInstance ? ref.getInstance() : ref;
    };
    _proto.componentDidMount = function componentDidMount() {
      if (typeof document === "undefined" || !document.createElement) {
        return;
      }
      var instance = this.getInstance();
      if (config && typeof config.handleClickOutside === "function") {
        this.__clickOutsideHandlerProp = config.handleClickOutside(instance);
        if (typeof this.__clickOutsideHandlerProp !== "function") {
          throw new Error("WrappedComponent: " + componentName + " lacks a function for processing outside click events specified by the handleClickOutside config option.");
        }
      }
      this.componentNode = this.__getComponentNode();
      if (this.props.disableOnClickOutside) return;
      this.enableOnClickOutside();
    };
    _proto.componentDidUpdate = function componentDidUpdate() {
      this.componentNode = this.__getComponentNode();
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      this.disableOnClickOutside();
    };
    _proto.render = function render() {
      var _this$props = this.props;
      _this$props.excludeScrollbar;
      var props = _objectWithoutPropertiesLoose(_this$props, ["excludeScrollbar"]);
      if (WrappedComponent.prototype && WrappedComponent.prototype.isReactComponent) {
        props.ref = this.getRef;
      } else {
        props.wrappedRef = this.getRef;
      }
      props.disableOnClickOutside = this.disableOnClickOutside;
      props.enableOnClickOutside = this.enableOnClickOutside;
      return (0, import_react.createElement)(WrappedComponent, props);
    };
    return onClickOutside;
  }(import_react.Component), _class.displayName = "OnClickOutside(" + componentName + ")", _class.defaultProps = {
    eventTypes: ["mousedown", "touchstart"],
    excludeScrollbar: config && config.excludeScrollbar || false,
    outsideClickIgnoreClass: IGNORE_CLASS_NAME,
    preventDefault: false,
    stopPropagation: false
  }, _class.getClass = function() {
    return WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent;
  }, _temp;
}
var react_onclickoutside_es_default = onClickOutsideHOC;

// node_modules/react-datepicker/dist/es/index.js
var import_react_dom2 = __toESM(require_react_dom());

// node_modules/react-popper/lib/esm/Popper.js
var React4 = __toESM(require_react());

// node_modules/react-popper/lib/esm/Manager.js
var React = __toESM(require_react());
var ManagerReferenceNodeContext = React.createContext();
var ManagerReferenceNodeSetterContext = React.createContext();
function Manager(_ref) {
  var children = _ref.children;
  var _React$useState = React.useState(null), referenceNode = _React$useState[0], setReferenceNode = _React$useState[1];
  var hasUnmounted = React.useRef(false);
  React.useEffect(function() {
    return function() {
      hasUnmounted.current = true;
    };
  }, []);
  var handleSetReferenceNode = React.useCallback(function(node) {
    if (!hasUnmounted.current) {
      setReferenceNode(node);
    }
  }, []);
  return React.createElement(ManagerReferenceNodeContext.Provider, {
    value: referenceNode
  }, React.createElement(ManagerReferenceNodeSetterContext.Provider, {
    value: handleSetReferenceNode
  }, children));
}

// node_modules/react-popper/lib/esm/utils.js
var React2 = __toESM(require_react());
var unwrapArray = function unwrapArray2(arg) {
  return Array.isArray(arg) ? arg[0] : arg;
};
var safeInvoke = function safeInvoke2(fn2) {
  if (typeof fn2 === "function") {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return fn2.apply(void 0, args);
  }
};
var setRef = function setRef2(ref, node) {
  if (typeof ref === "function") {
    return safeInvoke(ref, node);
  } else if (ref != null) {
    ref.current = node;
  }
};
var fromEntries = function fromEntries2(entries) {
  return entries.reduce(function(acc, _ref) {
    var key = _ref[0], value = _ref[1];
    acc[key] = value;
    return acc;
  }, {});
};
var useIsomorphicLayoutEffect = typeof window !== "undefined" && window.document && window.document.createElement ? React2.useLayoutEffect : React2.useEffect;

// node_modules/react-popper/lib/esm/usePopper.js
var React3 = __toESM(require_react());
var ReactDOM = __toESM(require_react_dom());

// node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/utils/math.js
var max2 = Math.max;
var min2 = Math.min;
var round = Math.round;

// node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/within.js
function within(min3, value, max3) {
  return max2(min3, min2(value, max3));
}
function withinMaxClamp(min3, value, max3) {
  var v = within(min3, value, max3);
  return v > max3 ? max3 : v;
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min3 = paddingObject[minProp];
  var max3 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min3, center, max3);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max2(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max2(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max2(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max2(rect.top, accRect.top);
    accRect.right = min2(rect.right, accRect.right);
    accRect.bottom = min2(rect.bottom, accRect.bottom);
    accRect.left = max2(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break") break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min3 = offset2 + overflow[mainSide];
    var max3 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min2(min3, tetherMin) : min3, offset2, tether ? max2(max3, tetherMax) : max3);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper4(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect4 = _ref.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = popperGenerator();

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper2 = popperGenerator({
  defaultModifiers
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper3 = popperGenerator({
  defaultModifiers: defaultModifiers2
});

// node_modules/react-popper/lib/esm/usePopper.js
var import_react_fast_compare = __toESM(require_react_fast_compare());
var EMPTY_MODIFIERS = [];
var usePopper = function usePopper2(referenceElement, popperElement, options) {
  if (options === void 0) {
    options = {};
  }
  var prevOptions = React3.useRef(null);
  var optionsWithDefaults = {
    onFirstUpdate: options.onFirstUpdate,
    placement: options.placement || "bottom",
    strategy: options.strategy || "absolute",
    modifiers: options.modifiers || EMPTY_MODIFIERS
  };
  var _React$useState = React3.useState({
    styles: {
      popper: {
        position: optionsWithDefaults.strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  }), state = _React$useState[0], setState = _React$useState[1];
  var updateStateModifier = React3.useMemo(function() {
    return {
      name: "updateState",
      enabled: true,
      phase: "write",
      fn: function fn2(_ref) {
        var state2 = _ref.state;
        var elements = Object.keys(state2.elements);
        ReactDOM.flushSync(function() {
          setState({
            styles: fromEntries(elements.map(function(element) {
              return [element, state2.styles[element] || {}];
            })),
            attributes: fromEntries(elements.map(function(element) {
              return [element, state2.attributes[element]];
            }))
          });
        });
      },
      requires: ["computeStyles"]
    };
  }, []);
  var popperOptions = React3.useMemo(function() {
    var newOptions = {
      onFirstUpdate: optionsWithDefaults.onFirstUpdate,
      placement: optionsWithDefaults.placement,
      strategy: optionsWithDefaults.strategy,
      modifiers: [].concat(optionsWithDefaults.modifiers, [updateStateModifier, {
        name: "applyStyles",
        enabled: false
      }])
    };
    if ((0, import_react_fast_compare.default)(prevOptions.current, newOptions)) {
      return prevOptions.current || newOptions;
    } else {
      prevOptions.current = newOptions;
      return newOptions;
    }
  }, [optionsWithDefaults.onFirstUpdate, optionsWithDefaults.placement, optionsWithDefaults.strategy, optionsWithDefaults.modifiers, updateStateModifier]);
  var popperInstanceRef = React3.useRef();
  useIsomorphicLayoutEffect(function() {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.setOptions(popperOptions);
    }
  }, [popperOptions]);
  useIsomorphicLayoutEffect(function() {
    if (referenceElement == null || popperElement == null) {
      return;
    }
    var createPopper4 = options.createPopper || createPopper3;
    var popperInstance = createPopper4(referenceElement, popperElement, popperOptions);
    popperInstanceRef.current = popperInstance;
    return function() {
      popperInstance.destroy();
      popperInstanceRef.current = null;
    };
  }, [referenceElement, popperElement, options.createPopper]);
  return {
    state: popperInstanceRef.current ? popperInstanceRef.current.state : null,
    styles: state.styles,
    attributes: state.attributes,
    update: popperInstanceRef.current ? popperInstanceRef.current.update : null,
    forceUpdate: popperInstanceRef.current ? popperInstanceRef.current.forceUpdate : null
  };
};

// node_modules/react-popper/lib/esm/Popper.js
var NOOP = function NOOP2() {
  return void 0;
};
var NOOP_PROMISE = function NOOP_PROMISE2() {
  return Promise.resolve(null);
};
var EMPTY_MODIFIERS2 = [];
function Popper(_ref) {
  var _ref$placement = _ref.placement, placement = _ref$placement === void 0 ? "bottom" : _ref$placement, _ref$strategy = _ref.strategy, strategy = _ref$strategy === void 0 ? "absolute" : _ref$strategy, _ref$modifiers = _ref.modifiers, modifiers = _ref$modifiers === void 0 ? EMPTY_MODIFIERS2 : _ref$modifiers, referenceElement = _ref.referenceElement, onFirstUpdate = _ref.onFirstUpdate, innerRef = _ref.innerRef, children = _ref.children;
  var referenceNode = React4.useContext(ManagerReferenceNodeContext);
  var _React$useState = React4.useState(null), popperElement = _React$useState[0], setPopperElement = _React$useState[1];
  var _React$useState2 = React4.useState(null), arrowElement = _React$useState2[0], setArrowElement = _React$useState2[1];
  React4.useEffect(function() {
    setRef(innerRef, popperElement);
  }, [innerRef, popperElement]);
  var options = React4.useMemo(function() {
    return {
      placement,
      strategy,
      onFirstUpdate,
      modifiers: [].concat(modifiers, [{
        name: "arrow",
        enabled: arrowElement != null,
        options: {
          element: arrowElement
        }
      }])
    };
  }, [placement, strategy, onFirstUpdate, modifiers, arrowElement]);
  var _usePopper = usePopper(referenceElement || referenceNode, popperElement, options), state = _usePopper.state, styles = _usePopper.styles, forceUpdate = _usePopper.forceUpdate, update = _usePopper.update;
  var childrenProps = React4.useMemo(function() {
    return {
      ref: setPopperElement,
      style: styles.popper,
      placement: state ? state.placement : placement,
      hasPopperEscaped: state && state.modifiersData.hide ? state.modifiersData.hide.hasPopperEscaped : null,
      isReferenceHidden: state && state.modifiersData.hide ? state.modifiersData.hide.isReferenceHidden : null,
      arrowProps: {
        style: styles.arrow,
        ref: setArrowElement
      },
      forceUpdate: forceUpdate || NOOP,
      update: update || NOOP_PROMISE
    };
  }, [setPopperElement, setArrowElement, placement, state, styles, update, forceUpdate]);
  return unwrapArray(children)(childrenProps);
}

// node_modules/react-popper/lib/esm/Reference.js
var React5 = __toESM(require_react());
var import_warning = __toESM(require_warning());
function Reference(_ref) {
  var children = _ref.children, innerRef = _ref.innerRef;
  var setReferenceNode = React5.useContext(ManagerReferenceNodeSetterContext);
  var refHandler = React5.useCallback(function(node) {
    setRef(innerRef, node);
    safeInvoke(setReferenceNode, node);
  }, [innerRef, setReferenceNode]);
  React5.useEffect(function() {
    return function() {
      return setRef(innerRef, null);
    };
  }, []);
  React5.useEffect(function() {
    (0, import_warning.default)(Boolean(setReferenceNode), "`Reference` should not be used outside of a `Manager` component.");
  }, [setReferenceNode]);
  return unwrapArray(children)({
    ref: refHandler
  });
}

// node_modules/react-datepicker/dist/es/index.js
function le(e2, t2) {
  var r2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e2);
    t2 && (n = n.filter(function(t3) {
      return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
    })), r2.push.apply(r2, n);
  }
  return r2;
}
function de(e2) {
  for (var t2 = 1; t2 < arguments.length; t2++) {
    var r2 = null != arguments[t2] ? arguments[t2] : {};
    t2 % 2 ? le(Object(r2), true).forEach(function(t3) {
      ye(e2, t3, r2[t3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(r2)) : le(Object(r2)).forEach(function(t3) {
      Object.defineProperty(e2, t3, Object.getOwnPropertyDescriptor(r2, t3));
    });
  }
  return e2;
}
function ue(e2) {
  return ue = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, ue(e2);
}
function he(e2, t2) {
  if (!(e2 instanceof t2)) throw new TypeError("Cannot call a class as a function");
}
function me(e2, t2) {
  for (var r2 = 0; r2 < t2.length; r2++) {
    var n = t2[r2];
    n.enumerable = n.enumerable || false, n.configurable = true, "value" in n && (n.writable = true), Object.defineProperty(e2, _e(n.key), n);
  }
}
function fe(e2, t2, r2) {
  return t2 && me(e2.prototype, t2), r2 && me(e2, r2), Object.defineProperty(e2, "prototype", { writable: false }), e2;
}
function ye(e2, t2, r2) {
  return (t2 = _e(t2)) in e2 ? Object.defineProperty(e2, t2, { value: r2, enumerable: true, configurable: true, writable: true }) : e2[t2] = r2, e2;
}
function ve() {
  return ve = Object.assign ? Object.assign.bind() : function(e2) {
    for (var t2 = 1; t2 < arguments.length; t2++) {
      var r2 = arguments[t2];
      for (var n in r2) Object.prototype.hasOwnProperty.call(r2, n) && (e2[n] = r2[n]);
    }
    return e2;
  }, ve.apply(this, arguments);
}
function De(e2, t2) {
  if ("function" != typeof t2 && null !== t2) throw new TypeError("Super expression must either be null or a function");
  e2.prototype = Object.create(t2 && t2.prototype, { constructor: { value: e2, writable: true, configurable: true } }), Object.defineProperty(e2, "prototype", { writable: false }), t2 && ke(e2, t2);
}
function ge(e2) {
  return ge = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e3) {
    return e3.__proto__ || Object.getPrototypeOf(e3);
  }, ge(e2);
}
function ke(e2, t2) {
  return ke = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e3, t3) {
    return e3.__proto__ = t3, e3;
  }, ke(e2, t2);
}
function we(e2) {
  if (void 0 === e2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e2;
}
function be(e2) {
  var t2 = function() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if ("function" == typeof Proxy) return true;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      })), true;
    } catch (e3) {
      return false;
    }
  }();
  return function() {
    var r2, n = ge(e2);
    if (t2) {
      var o = ge(this).constructor;
      r2 = Reflect.construct(n, arguments, o);
    } else r2 = n.apply(this, arguments);
    return function(e3, t3) {
      if (t3 && ("object" == typeof t3 || "function" == typeof t3)) return t3;
      if (void 0 !== t3) throw new TypeError("Derived constructors may only return object or undefined");
      return we(e3);
    }(this, r2);
  };
}
function Se(e2) {
  return function(e3) {
    if (Array.isArray(e3)) return Ce(e3);
  }(e2) || function(e3) {
    if ("undefined" != typeof Symbol && null != e3[Symbol.iterator] || null != e3["@@iterator"]) return Array.from(e3);
  }(e2) || function(e3, t2) {
    if (!e3) return;
    if ("string" == typeof e3) return Ce(e3, t2);
    var r2 = Object.prototype.toString.call(e3).slice(8, -1);
    "Object" === r2 && e3.constructor && (r2 = e3.constructor.name);
    if ("Map" === r2 || "Set" === r2) return Array.from(e3);
    if ("Arguments" === r2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r2)) return Ce(e3, t2);
  }(e2) || function() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function Ce(e2, t2) {
  (null == t2 || t2 > e2.length) && (t2 = e2.length);
  for (var r2 = 0, n = new Array(t2); r2 < t2; r2++) n[r2] = e2[r2];
  return n;
}
function _e(e2) {
  var t2 = function(e3, t3) {
    if ("object" != typeof e3 || null === e3) return e3;
    var r2 = e3[Symbol.toPrimitive];
    if (void 0 !== r2) {
      var n = r2.call(e3, t3 || "default");
      if ("object" != typeof n) return n;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t3 ? String : Number)(e3);
  }(e2, "string");
  return "symbol" == typeof t2 ? t2 : String(t2);
}
var Me = function(e2, t2) {
  switch (e2) {
    case "P":
      return t2.date({ width: "short" });
    case "PP":
      return t2.date({ width: "medium" });
    case "PPP":
      return t2.date({ width: "long" });
    default:
      return t2.date({ width: "full" });
  }
};
var Pe = function(e2, t2) {
  switch (e2) {
    case "p":
      return t2.time({ width: "short" });
    case "pp":
      return t2.time({ width: "medium" });
    case "ppp":
      return t2.time({ width: "long" });
    default:
      return t2.time({ width: "full" });
  }
};
var Ee = { p: Pe, P: function(e2, t2) {
  var r2, n = e2.match(/(P+)(p+)?/) || [], o = n[1], a = n[2];
  if (!a) return Me(e2, t2);
  switch (o) {
    case "P":
      r2 = t2.dateTime({ width: "short" });
      break;
    case "PP":
      r2 = t2.dateTime({ width: "medium" });
      break;
    case "PPP":
      r2 = t2.dateTime({ width: "long" });
      break;
    default:
      r2 = t2.dateTime({ width: "full" });
  }
  return r2.replace("{{date}}", Me(o, t2)).replace("{{time}}", Pe(a, t2));
} };
var Ne = 12;
var xe = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
function Ye(e2) {
  var t2 = e2 ? "string" == typeof e2 || e2 instanceof String ? parseISO(e2) : toDate(e2) : /* @__PURE__ */ new Date();
  return Te(t2) ? t2 : null;
}
function Te(e2, t2) {
  return t2 = t2 || /* @__PURE__ */ new Date("1/1/1000"), isValid(e2) && !isBefore(e2, t2);
}
function Ie(e2, t2, r2) {
  if ("en" === r2) return format(e2, t2, { awareOfUnicodeTokens: true });
  var n = Ge(r2);
  return r2 && !n && console.warn('A locale object was not found for the provided string ["'.concat(r2, '"].')), !n && $e() && Ge($e()) && (n = Ge($e())), format(e2, t2, { locale: n || null, awareOfUnicodeTokens: true });
}
function Oe(e2, t2) {
  var r2 = t2.dateFormat, n = t2.locale;
  return e2 && Ie(e2, Array.isArray(r2) ? r2[0] : r2, n) || "";
}
function Re(e2, t2) {
  var r2 = t2.hour, n = void 0 === r2 ? 0 : r2, o = t2.minute, a = void 0 === o ? 0 : o, s = t2.second;
  return setHours(setMinutes(setSeconds(e2, void 0 === s ? 0 : s), a), n);
}
function Le(e2, t2, r2) {
  var n = Ge(t2 || $e());
  return startOfWeek(e2, { locale: n, weekStartsOn: r2 });
}
function Fe(e2) {
  return startOfMonth(e2);
}
function Ae(e2) {
  return startOfYear(e2);
}
function We(e2) {
  return startOfQuarter(e2);
}
function Ke() {
  return startOfDay(Ye());
}
function Be(e2, t2) {
  return e2 && t2 ? isSameYear(e2, t2) : !e2 && !t2;
}
function Qe(e2, t2) {
  return e2 && t2 ? isSameMonth(e2, t2) : !e2 && !t2;
}
function He(e2, t2) {
  return e2 && t2 ? isSameQuarter(e2, t2) : !e2 && !t2;
}
function je(e2, t2) {
  return e2 && t2 ? isSameDay(e2, t2) : !e2 && !t2;
}
function Ve(e2, t2) {
  return e2 && t2 ? isEqual(e2, t2) : !e2 && !t2;
}
function qe(e2, t2, r2) {
  var n, o = startOfDay(t2), a = endOfDay(r2);
  try {
    n = isWithinInterval(e2, { start: o, end: a });
  } catch (e3) {
    n = false;
  }
  return n;
}
function Ue(e2, t2) {
  var r2 = "undefined" != typeof window ? window : globalThis;
  r2.__localeData__ || (r2.__localeData__ = {}), r2.__localeData__[e2] = t2;
}
function ze(e2) {
  ("undefined" != typeof window ? window : globalThis).__localeId__ = e2;
}
function $e() {
  return ("undefined" != typeof window ? window : globalThis).__localeId__;
}
function Ge(e2) {
  if ("string" == typeof e2) {
    var t2 = "undefined" != typeof window ? window : globalThis;
    return t2.__localeData__ ? t2.__localeData__[e2] : null;
  }
  return e2;
}
function Je(e2, t2) {
  return Ie(setMonth(Ye(), e2), "LLLL", t2);
}
function Xe(e2, t2) {
  return Ie(setMonth(Ye(), e2), "LLL", t2);
}
function Ze(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.maxDate, o = t2.excludeDates, a = t2.excludeDateIntervals, s = t2.includeDates, i = t2.includeDateIntervals, p = t2.filterDate;
  return it(e2, { minDate: r2, maxDate: n }) || o && o.some(function(t3) {
    return je(e2, t3);
  }) || a && a.some(function(t3) {
    var r3 = t3.start, n2 = t3.end;
    return isWithinInterval(e2, { start: r3, end: n2 });
  }) || s && !s.some(function(t3) {
    return je(e2, t3);
  }) || i && !i.some(function(t3) {
    var r3 = t3.start, n2 = t3.end;
    return isWithinInterval(e2, { start: r3, end: n2 });
  }) || p && !p(Ye(e2)) || false;
}
function et(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.excludeDates, n = t2.excludeDateIntervals;
  return n && n.length > 0 ? n.some(function(t3) {
    var r3 = t3.start, n2 = t3.end;
    return isWithinInterval(e2, { start: r3, end: n2 });
  }) : r2 && r2.some(function(t3) {
    return je(e2, t3);
  }) || false;
}
function tt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.maxDate, o = t2.excludeDates, a = t2.includeDates, s = t2.filterDate;
  return it(e2, { minDate: startOfMonth(r2), maxDate: endOfMonth(n) }) || o && o.some(function(t3) {
    return Qe(e2, t3);
  }) || a && !a.some(function(t3) {
    return Qe(e2, t3);
  }) || s && !s(Ye(e2)) || false;
}
function rt(e2, t2, r2, n) {
  var o = getYear(e2), a = getMonth(e2), s = getYear(t2), i = getMonth(t2), p = getYear(n);
  return o === s && o === p ? a <= r2 && r2 <= i : o < s ? p === o && a <= r2 || p === s && i >= r2 || p < s && p > o : void 0;
}
function nt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.maxDate, o = t2.excludeDates, a = t2.includeDates, s = t2.filterDate;
  return it(e2, { minDate: r2, maxDate: n }) || o && o.some(function(t3) {
    return He(e2, t3);
  }) || a && !a.some(function(t3) {
    return He(e2, t3);
  }) || s && !s(Ye(e2)) || false;
}
function ot(e2, t2, r2) {
  if (!isValid(t2) || !isValid(r2)) return false;
  var n = getYear(t2), a = getYear(r2);
  return n <= e2 && a >= e2;
}
function at(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.maxDate, o = t2.excludeDates, a = t2.includeDates, s = t2.filterDate, i = new Date(e2, 0, 1);
  return it(i, { minDate: startOfYear(r2), maxDate: endOfYear(n) }) || o && o.some(function(e3) {
    return Be(i, e3);
  }) || a && !a.some(function(e3) {
    return Be(i, e3);
  }) || s && !s(Ye(i)) || false;
}
function st(e2, t2, r2, n) {
  var o = getYear(e2), a = getQuarter(e2), s = getYear(t2), i = getQuarter(t2), p = getYear(n);
  return o === s && o === p ? a <= r2 && r2 <= i : o < s ? p === o && a <= r2 || p === s && i >= r2 || p < s && p > o : void 0;
}
function it(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.maxDate;
  return r2 && differenceInCalendarDays(e2, r2) < 0 || n && differenceInCalendarDays(e2, n) > 0;
}
function pt(e2, t2) {
  return t2.some(function(t3) {
    return getHours(t3) === getHours(e2) && getMinutes(t3) === getMinutes(e2);
  });
}
function ct(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.excludeTimes, n = t2.includeTimes, o = t2.filterTime;
  return r2 && pt(e2, r2) || n && !pt(e2, n) || o && !o(e2) || false;
}
function lt(e2, t2) {
  var r2 = t2.minTime, n = t2.maxTime;
  if (!r2 || !n) throw new Error("Both minTime and maxTime props required");
  var o, a = Ye(), s = setHours(setMinutes(a, getMinutes(e2)), getHours(e2)), i = setHours(setMinutes(a, getMinutes(r2)), getHours(r2)), p = setHours(setMinutes(a, getMinutes(n)), getHours(n));
  try {
    o = !isWithinInterval(s, { start: i, end: p });
  } catch (e3) {
    o = false;
  }
  return o;
}
function dt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.includeDates, o = subMonths(e2, 1);
  return r2 && differenceInCalendarMonths(r2, o) > 0 || n && n.every(function(e3) {
    return differenceInCalendarMonths(e3, o) > 0;
  }) || false;
}
function ut(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.maxDate, n = t2.includeDates, o = addMonths(e2, 1);
  return r2 && differenceInCalendarMonths(o, r2) > 0 || n && n.every(function(e3) {
    return differenceInCalendarMonths(o, e3) > 0;
  }) || false;
}
function ht(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.minDate, n = t2.includeDates, o = subYears(e2, 1);
  return r2 && differenceInCalendarYears(r2, o) > 0 || n && n.every(function(e3) {
    return differenceInCalendarYears(e3, o) > 0;
  }) || false;
}
function mt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r2 = t2.maxDate, n = t2.includeDates, o = addYears(e2, 1);
  return r2 && differenceInCalendarYears(o, r2) > 0 || n && n.every(function(e3) {
    return differenceInCalendarYears(o, e3) > 0;
  }) || false;
}
function ft(e2) {
  var t2 = e2.minDate, r2 = e2.includeDates;
  if (r2 && t2) {
    var n = r2.filter(function(e3) {
      return differenceInCalendarDays(e3, t2) >= 0;
    });
    return min(n);
  }
  return r2 ? min(r2) : t2;
}
function yt(e2) {
  var t2 = e2.maxDate, r2 = e2.includeDates;
  if (r2 && t2) {
    var n = r2.filter(function(e3) {
      return differenceInCalendarDays(e3, t2) <= 0;
    });
    return max(n);
  }
  return r2 ? max(r2) : t2;
}
function vt() {
  for (var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "react-datepicker__day--highlighted", r2 = /* @__PURE__ */ new Map(), o = 0, a = e2.length; o < a; o++) {
    var s = e2[o];
    if (isDate(s)) {
      var i = Ie(s, "MM.dd.yyyy"), p = r2.get(i) || [];
      p.includes(t2) || (p.push(t2), r2.set(i, p));
    } else if ("object" === ue(s)) {
      var c = Object.keys(s), l = c[0], d = s[c[0]];
      if ("string" == typeof l && d.constructor === Array) for (var u = 0, h = d.length; u < h; u++) {
        var m = Ie(d[u], "MM.dd.yyyy"), f = r2.get(m) || [];
        f.includes(l) || (f.push(l), r2.set(m, f));
      }
    }
  }
  return r2;
}
function Dt() {
  var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "react-datepicker__day--holidays", r2 = /* @__PURE__ */ new Map();
  return e2.forEach(function(e3) {
    var o = e3.date, a = e3.holidayName;
    if (isDate(o)) {
      var s = Ie(o, "MM.dd.yyyy"), i = r2.get(s) || {};
      if (!("className" in i) || i.className !== t2 || (p = i.holidayNames, c = [a], p.length !== c.length || !p.every(function(e4, t3) {
        return e4 === c[t3];
      }))) {
        var p, c;
        i.className = t2;
        var l = i.holidayNames;
        i.holidayNames = l ? [].concat(Se(l), [a]) : [a], r2.set(s, i);
      }
    }
  }), r2;
}
function gt(e2, t2, r2, n, o) {
  for (var a = o.length, p = [], c = 0; c < a; c++) {
    var l = addMinutes(addHours(e2, getHours(o[c])), getMinutes(o[c])), d = addMinutes(e2, (r2 + 1) * n);
    isAfter(l, t2) && isBefore(l, d) && p.push(o[c]);
  }
  return p;
}
function kt(e2) {
  return e2 < 10 ? "0".concat(e2) : "".concat(e2);
}
function wt(e2) {
  var t2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Ne, r2 = Math.ceil(getYear(e2) / t2) * t2;
  return { startPeriod: r2 - (t2 - 1), endPeriod: r2 };
}
function bt(e2) {
  var t2 = e2.getSeconds(), r2 = e2.getMilliseconds();
  return toDate(e2.getTime() - 1e3 * t2 - r2);
}
function St(e2, t2, r2, n) {
  for (var o = [], a = 0; a < 2 * t2 + 1; a++) {
    var s = e2 + t2 - a, i = true;
    r2 && (i = getYear(r2) <= s), n && i && (i = getYear(n) >= s), i && o.push(s);
  }
  return o;
}
var Ct = react_onclickoutside_es_default(function(n) {
  De(a, import_react2.default.Component);
  var o = be(a);
  function a(r2) {
    var n2;
    he(this, a), ye(we(n2 = o.call(this, r2)), "renderOptions", function() {
      var t2 = n2.props.year, r3 = n2.state.yearsList.map(function(r4) {
        return import_react2.default.createElement("div", { className: t2 === r4 ? "react-datepicker__year-option react-datepicker__year-option--selected_year" : "react-datepicker__year-option", key: r4, onClick: n2.onChange.bind(we(n2), r4), "aria-selected": t2 === r4 ? "true" : void 0 }, t2 === r4 ? import_react2.default.createElement("span", { className: "react-datepicker__year-option--selected" }, "✓") : "", r4);
      }), o2 = n2.props.minDate ? getYear(n2.props.minDate) : null, a2 = n2.props.maxDate ? getYear(n2.props.maxDate) : null;
      return a2 && n2.state.yearsList.find(function(e2) {
        return e2 === a2;
      }) || r3.unshift(import_react2.default.createElement("div", { className: "react-datepicker__year-option", key: "upcoming", onClick: n2.incrementYears }, import_react2.default.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming" }))), o2 && n2.state.yearsList.find(function(e2) {
        return e2 === o2;
      }) || r3.push(import_react2.default.createElement("div", { className: "react-datepicker__year-option", key: "previous", onClick: n2.decrementYears }, import_react2.default.createElement("a", { className: "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous" }))), r3;
    }), ye(we(n2), "onChange", function(e2) {
      n2.props.onChange(e2);
    }), ye(we(n2), "handleClickOutside", function() {
      n2.props.onCancel();
    }), ye(we(n2), "shiftYears", function(e2) {
      var t2 = n2.state.yearsList.map(function(t3) {
        return t3 + e2;
      });
      n2.setState({ yearsList: t2 });
    }), ye(we(n2), "incrementYears", function() {
      return n2.shiftYears(1);
    }), ye(we(n2), "decrementYears", function() {
      return n2.shiftYears(-1);
    });
    var s = r2.yearDropdownItemNumber, i = r2.scrollableYearDropdown, p = s || (i ? 10 : 5);
    return n2.state = { yearsList: St(n2.props.year, p, n2.props.minDate, n2.props.maxDate) }, n2.dropdownRef = (0, import_react2.createRef)(), n2;
  }
  return fe(a, [{ key: "componentDidMount", value: function() {
    var e2 = this.dropdownRef.current;
    if (e2) {
      var t2 = e2.children ? Array.from(e2.children) : null, r2 = t2 ? t2.find(function(e3) {
        return e3.ariaSelected;
      }) : null;
      e2.scrollTop = r2 ? r2.offsetTop + (r2.clientHeight - e2.clientHeight) / 2 : (e2.scrollHeight - e2.clientHeight) / 2;
    }
  } }, { key: "render", value: function() {
    var t2 = (0, import_classnames.default)({ "react-datepicker__year-dropdown": true, "react-datepicker__year-dropdown--scrollable": this.props.scrollableYearDropdown });
    return import_react2.default.createElement("div", { className: t2, ref: this.dropdownRef }, this.renderOptions());
  } }]), a;
}());
var _t = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = be(n);
  function n() {
    var t3;
    he(this, n);
    for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++) a[s] = arguments[s];
    return ye(we(t3 = r2.call.apply(r2, [this].concat(a))), "state", { dropdownVisible: false }), ye(we(t3), "renderSelectOptions", function() {
      for (var r3 = t3.props.minDate ? getYear(t3.props.minDate) : 1900, n2 = t3.props.maxDate ? getYear(t3.props.maxDate) : 2100, o2 = [], a2 = r3; a2 <= n2; a2++) o2.push(import_react2.default.createElement("option", { key: a2, value: a2 }, a2));
      return o2;
    }), ye(we(t3), "onSelectChange", function(e2) {
      t3.onChange(e2.target.value);
    }), ye(we(t3), "renderSelectMode", function() {
      return import_react2.default.createElement("select", { value: t3.props.year, className: "react-datepicker__year-select", onChange: t3.onSelectChange }, t3.renderSelectOptions());
    }), ye(we(t3), "renderReadView", function(r3) {
      return import_react2.default.createElement("div", { key: "read", style: { visibility: r3 ? "visible" : "hidden" }, className: "react-datepicker__year-read-view", onClick: function(e2) {
        return t3.toggleDropdown(e2);
      } }, import_react2.default.createElement("span", { className: "react-datepicker__year-read-view--down-arrow" }), import_react2.default.createElement("span", { className: "react-datepicker__year-read-view--selected-year" }, t3.props.year));
    }), ye(we(t3), "renderDropdown", function() {
      return import_react2.default.createElement(Ct, { key: "dropdown", year: t3.props.year, onChange: t3.onChange, onCancel: t3.toggleDropdown, minDate: t3.props.minDate, maxDate: t3.props.maxDate, scrollableYearDropdown: t3.props.scrollableYearDropdown, yearDropdownItemNumber: t3.props.yearDropdownItemNumber });
    }), ye(we(t3), "renderScrollMode", function() {
      var e2 = t3.state.dropdownVisible, r3 = [t3.renderReadView(!e2)];
      return e2 && r3.unshift(t3.renderDropdown()), r3;
    }), ye(we(t3), "onChange", function(e2) {
      t3.toggleDropdown(), e2 !== t3.props.year && t3.props.onChange(e2);
    }), ye(we(t3), "toggleDropdown", function(e2) {
      t3.setState({ dropdownVisible: !t3.state.dropdownVisible }, function() {
        t3.props.adjustDateOnChange && t3.handleYearChange(t3.props.date, e2);
      });
    }), ye(we(t3), "handleYearChange", function(e2, r3) {
      t3.onSelect(e2, r3), t3.setOpen();
    }), ye(we(t3), "onSelect", function(e2, r3) {
      t3.props.onSelect && t3.props.onSelect(e2, r3);
    }), ye(we(t3), "setOpen", function() {
      t3.props.setOpen && t3.props.setOpen(true);
    }), t3;
  }
  return fe(n, [{ key: "render", value: function() {
    var t3;
    switch (this.props.dropdownMode) {
      case "scroll":
        t3 = this.renderScrollMode();
        break;
      case "select":
        t3 = this.renderSelectMode();
    }
    return import_react2.default.createElement("div", { className: "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(this.props.dropdownMode) }, t3);
  } }]), n;
}();
var Mt = react_onclickoutside_es_default(function(t2) {
  De(n, import_react2.default.Component);
  var r2 = be(n);
  function n() {
    var t3;
    he(this, n);
    for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++) a[s] = arguments[s];
    return ye(we(t3 = r2.call.apply(r2, [this].concat(a))), "isSelectedMonth", function(e2) {
      return t3.props.month === e2;
    }), ye(we(t3), "renderOptions", function() {
      return t3.props.monthNames.map(function(r3, n2) {
        return import_react2.default.createElement("div", { className: t3.isSelectedMonth(n2) ? "react-datepicker__month-option react-datepicker__month-option--selected_month" : "react-datepicker__month-option", key: r3, onClick: t3.onChange.bind(we(t3), n2), "aria-selected": t3.isSelectedMonth(n2) ? "true" : void 0 }, t3.isSelectedMonth(n2) ? import_react2.default.createElement("span", { className: "react-datepicker__month-option--selected" }, "✓") : "", r3);
      });
    }), ye(we(t3), "onChange", function(e2) {
      return t3.props.onChange(e2);
    }), ye(we(t3), "handleClickOutside", function() {
      return t3.props.onCancel();
    }), t3;
  }
  return fe(n, [{ key: "render", value: function() {
    return import_react2.default.createElement("div", { className: "react-datepicker__month-dropdown" }, this.renderOptions());
  } }]), n;
}());
var Pt = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = be(n);
  function n() {
    var t3;
    he(this, n);
    for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++) a[s] = arguments[s];
    return ye(we(t3 = r2.call.apply(r2, [this].concat(a))), "state", { dropdownVisible: false }), ye(we(t3), "renderSelectOptions", function(t4) {
      return t4.map(function(t5, r3) {
        return import_react2.default.createElement("option", { key: r3, value: r3 }, t5);
      });
    }), ye(we(t3), "renderSelectMode", function(r3) {
      return import_react2.default.createElement("select", { value: t3.props.month, className: "react-datepicker__month-select", onChange: function(e2) {
        return t3.onChange(e2.target.value);
      } }, t3.renderSelectOptions(r3));
    }), ye(we(t3), "renderReadView", function(r3, n2) {
      return import_react2.default.createElement("div", { key: "read", style: { visibility: r3 ? "visible" : "hidden" }, className: "react-datepicker__month-read-view", onClick: t3.toggleDropdown }, import_react2.default.createElement("span", { className: "react-datepicker__month-read-view--down-arrow" }), import_react2.default.createElement("span", { className: "react-datepicker__month-read-view--selected-month" }, n2[t3.props.month]));
    }), ye(we(t3), "renderDropdown", function(r3) {
      return import_react2.default.createElement(Mt, { key: "dropdown", month: t3.props.month, monthNames: r3, onChange: t3.onChange, onCancel: t3.toggleDropdown });
    }), ye(we(t3), "renderScrollMode", function(e2) {
      var r3 = t3.state.dropdownVisible, n2 = [t3.renderReadView(!r3, e2)];
      return r3 && n2.unshift(t3.renderDropdown(e2)), n2;
    }), ye(we(t3), "onChange", function(e2) {
      t3.toggleDropdown(), e2 !== t3.props.month && t3.props.onChange(e2);
    }), ye(we(t3), "toggleDropdown", function() {
      return t3.setState({ dropdownVisible: !t3.state.dropdownVisible });
    }), t3;
  }
  return fe(n, [{ key: "render", value: function() {
    var t3, r3 = this, n2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(this.props.useShortMonthInDropdown ? function(e2) {
      return Xe(e2, r3.props.locale);
    } : function(e2) {
      return Je(e2, r3.props.locale);
    });
    switch (this.props.dropdownMode) {
      case "scroll":
        t3 = this.renderScrollMode(n2);
        break;
      case "select":
        t3 = this.renderSelectMode(n2);
    }
    return import_react2.default.createElement("div", { className: "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(this.props.dropdownMode) }, t3);
  } }]), n;
}();
function Et(e2, t2) {
  for (var r2 = [], n = Fe(e2), o = Fe(t2); !isAfter(n, o); ) r2.push(Ye(n)), n = addMonths(n, 1);
  return r2;
}
var Nt = react_onclickoutside_es_default(function(t2) {
  De(o, import_react2.default.Component);
  var n = be(o);
  function o(t3) {
    var r2;
    return he(this, o), ye(we(r2 = n.call(this, t3)), "renderOptions", function() {
      return r2.state.monthYearsList.map(function(t4) {
        var n2 = getTime(t4), o2 = Be(r2.props.date, t4) && Qe(r2.props.date, t4);
        return import_react2.default.createElement("div", { className: o2 ? "react-datepicker__month-year-option--selected_month-year" : "react-datepicker__month-year-option", key: n2, onClick: r2.onChange.bind(we(r2), n2), "aria-selected": o2 ? "true" : void 0 }, o2 ? import_react2.default.createElement("span", { className: "react-datepicker__month-year-option--selected" }, "✓") : "", Ie(t4, r2.props.dateFormat, r2.props.locale));
      });
    }), ye(we(r2), "onChange", function(e2) {
      return r2.props.onChange(e2);
    }), ye(we(r2), "handleClickOutside", function() {
      r2.props.onCancel();
    }), r2.state = { monthYearsList: Et(r2.props.minDate, r2.props.maxDate) }, r2;
  }
  return fe(o, [{ key: "render", value: function() {
    var t3 = (0, import_classnames.default)({ "react-datepicker__month-year-dropdown": true, "react-datepicker__month-year-dropdown--scrollable": this.props.scrollableMonthYearDropdown });
    return import_react2.default.createElement("div", { className: t3 }, this.renderOptions());
  } }]), o;
}());
var xt = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = be(n);
  function n() {
    var t3;
    he(this, n);
    for (var o = arguments.length, a = new Array(o), s = 0; s < o; s++) a[s] = arguments[s];
    return ye(we(t3 = r2.call.apply(r2, [this].concat(a))), "state", { dropdownVisible: false }), ye(we(t3), "renderSelectOptions", function() {
      for (var r3 = Fe(t3.props.minDate), n2 = Fe(t3.props.maxDate), o2 = []; !isAfter(r3, n2); ) {
        var a2 = getTime(r3);
        o2.push(import_react2.default.createElement("option", { key: a2, value: a2 }, Ie(r3, t3.props.dateFormat, t3.props.locale))), r3 = addMonths(r3, 1);
      }
      return o2;
    }), ye(we(t3), "onSelectChange", function(e2) {
      t3.onChange(e2.target.value);
    }), ye(we(t3), "renderSelectMode", function() {
      return import_react2.default.createElement("select", { value: getTime(Fe(t3.props.date)), className: "react-datepicker__month-year-select", onChange: t3.onSelectChange }, t3.renderSelectOptions());
    }), ye(we(t3), "renderReadView", function(r3) {
      var n2 = Ie(t3.props.date, t3.props.dateFormat, t3.props.locale);
      return import_react2.default.createElement("div", { key: "read", style: { visibility: r3 ? "visible" : "hidden" }, className: "react-datepicker__month-year-read-view", onClick: function(e2) {
        return t3.toggleDropdown(e2);
      } }, import_react2.default.createElement("span", { className: "react-datepicker__month-year-read-view--down-arrow" }), import_react2.default.createElement("span", { className: "react-datepicker__month-year-read-view--selected-month-year" }, n2));
    }), ye(we(t3), "renderDropdown", function() {
      return import_react2.default.createElement(Nt, { key: "dropdown", date: t3.props.date, dateFormat: t3.props.dateFormat, onChange: t3.onChange, onCancel: t3.toggleDropdown, minDate: t3.props.minDate, maxDate: t3.props.maxDate, scrollableMonthYearDropdown: t3.props.scrollableMonthYearDropdown, locale: t3.props.locale });
    }), ye(we(t3), "renderScrollMode", function() {
      var e2 = t3.state.dropdownVisible, r3 = [t3.renderReadView(!e2)];
      return e2 && r3.unshift(t3.renderDropdown()), r3;
    }), ye(we(t3), "onChange", function(e2) {
      t3.toggleDropdown();
      var r3 = Ye(parseInt(e2));
      Be(t3.props.date, r3) && Qe(t3.props.date, r3) || t3.props.onChange(r3);
    }), ye(we(t3), "toggleDropdown", function() {
      return t3.setState({ dropdownVisible: !t3.state.dropdownVisible });
    }), t3;
  }
  return fe(n, [{ key: "render", value: function() {
    var t3;
    switch (this.props.dropdownMode) {
      case "scroll":
        t3 = this.renderScrollMode();
        break;
      case "select":
        t3 = this.renderSelectMode();
    }
    return import_react2.default.createElement("div", { className: "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(this.props.dropdownMode) }, t3);
  } }]), n;
}();
var Yt = function(t2) {
  De(o, import_react2.default.Component);
  var n = be(o);
  function o() {
    var t3;
    he(this, o);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++) s[i] = arguments[i];
    return ye(we(t3 = n.call.apply(n, [this].concat(s))), "dayEl", import_react2.default.createRef()), ye(we(t3), "handleClick", function(e2) {
      !t3.isDisabled() && t3.props.onClick && t3.props.onClick(e2);
    }), ye(we(t3), "handleMouseEnter", function(e2) {
      !t3.isDisabled() && t3.props.onMouseEnter && t3.props.onMouseEnter(e2);
    }), ye(we(t3), "handleOnKeyDown", function(e2) {
      " " === e2.key && (e2.preventDefault(), e2.key = "Enter"), t3.props.handleOnKeyDown(e2);
    }), ye(we(t3), "isSameDay", function(e2) {
      return je(t3.props.day, e2);
    }), ye(we(t3), "isKeyboardSelected", function() {
      return !t3.props.disabledKeyboardNavigation && !(t3.isSameDay(t3.props.selected) || t3.isSameWeek(t3.props.selected)) && (t3.isSameDay(t3.props.preSelection) || t3.isSameWeek(t3.props.preSelection));
    }), ye(we(t3), "isDisabled", function() {
      return Ze(t3.props.day, t3.props);
    }), ye(we(t3), "isExcluded", function() {
      return et(t3.props.day, t3.props);
    }), ye(we(t3), "isStartOfWeek", function() {
      return je(t3.props.day, Le(t3.props.day, t3.props.locale, t3.props.calendarStartDay));
    }), ye(we(t3), "isSameWeek", function(e2) {
      return t3.props.showWeekPicker && je(e2, Le(t3.props.day, t3.props.locale, t3.props.calendarStartDay));
    }), ye(we(t3), "getHighLightedClass", function() {
      var e2 = t3.props, r2 = e2.day, n2 = e2.highlightDates;
      if (!n2) return false;
      var o2 = Ie(r2, "MM.dd.yyyy");
      return n2.get(o2);
    }), ye(we(t3), "getHolidaysClass", function() {
      var e2 = t3.props, r2 = e2.day, n2 = e2.holidays;
      if (!n2) return false;
      var o2 = Ie(r2, "MM.dd.yyyy");
      return n2.has(o2) ? [n2.get(o2).className] : void 0;
    }), ye(we(t3), "isInRange", function() {
      var e2 = t3.props, r2 = e2.day, n2 = e2.startDate, o2 = e2.endDate;
      return !(!n2 || !o2) && qe(r2, n2, o2);
    }), ye(we(t3), "isInSelectingRange", function() {
      var e2, r2 = t3.props, n2 = r2.day, o2 = r2.selectsStart, a2 = r2.selectsEnd, s2 = r2.selectsRange, i2 = r2.selectsDisabledDaysInRange, p = r2.startDate, c = r2.endDate, l = null !== (e2 = t3.props.selectingDate) && void 0 !== e2 ? e2 : t3.props.preSelection;
      return !(!(o2 || a2 || s2) || !l || !i2 && t3.isDisabled()) && (o2 && c && (isBefore(l, c) || Ve(l, c)) ? qe(n2, l, c) : (a2 && p && (isAfter(l, p) || Ve(l, p)) || !(!s2 || !p || c || !isAfter(l, p) && !Ve(l, p))) && qe(n2, p, l));
    }), ye(we(t3), "isSelectingRangeStart", function() {
      var e2;
      if (!t3.isInSelectingRange()) return false;
      var r2 = t3.props, n2 = r2.day, o2 = r2.startDate, a2 = r2.selectsStart, s2 = null !== (e2 = t3.props.selectingDate) && void 0 !== e2 ? e2 : t3.props.preSelection;
      return je(n2, a2 ? s2 : o2);
    }), ye(we(t3), "isSelectingRangeEnd", function() {
      var e2;
      if (!t3.isInSelectingRange()) return false;
      var r2 = t3.props, n2 = r2.day, o2 = r2.endDate, a2 = r2.selectsEnd, s2 = r2.selectsRange, i2 = null !== (e2 = t3.props.selectingDate) && void 0 !== e2 ? e2 : t3.props.preSelection;
      return je(n2, a2 || s2 ? i2 : o2);
    }), ye(we(t3), "isRangeStart", function() {
      var e2 = t3.props, r2 = e2.day, n2 = e2.startDate, o2 = e2.endDate;
      return !(!n2 || !o2) && je(n2, r2);
    }), ye(we(t3), "isRangeEnd", function() {
      var e2 = t3.props, r2 = e2.day, n2 = e2.startDate, o2 = e2.endDate;
      return !(!n2 || !o2) && je(o2, r2);
    }), ye(we(t3), "isWeekend", function() {
      var e2 = getDay(t3.props.day);
      return 0 === e2 || 6 === e2;
    }), ye(we(t3), "isAfterMonth", function() {
      return void 0 !== t3.props.month && (t3.props.month + 1) % 12 === getMonth(t3.props.day);
    }), ye(we(t3), "isBeforeMonth", function() {
      return void 0 !== t3.props.month && (getMonth(t3.props.day) + 1) % 12 === t3.props.month;
    }), ye(we(t3), "isCurrentDay", function() {
      return t3.isSameDay(Ye());
    }), ye(we(t3), "isSelected", function() {
      return t3.isSameDay(t3.props.selected) || t3.isSameWeek(t3.props.selected);
    }), ye(we(t3), "getClassNames", function(e2) {
      var n2, o2 = t3.props.dayClassName ? t3.props.dayClassName(e2) : void 0;
      return (0, import_classnames.default)("react-datepicker__day", o2, "react-datepicker__day--" + Ie(t3.props.day, "ddd", n2), { "react-datepicker__day--disabled": t3.isDisabled(), "react-datepicker__day--excluded": t3.isExcluded(), "react-datepicker__day--selected": t3.isSelected(), "react-datepicker__day--keyboard-selected": t3.isKeyboardSelected(), "react-datepicker__day--range-start": t3.isRangeStart(), "react-datepicker__day--range-end": t3.isRangeEnd(), "react-datepicker__day--in-range": t3.isInRange(), "react-datepicker__day--in-selecting-range": t3.isInSelectingRange(), "react-datepicker__day--selecting-range-start": t3.isSelectingRangeStart(), "react-datepicker__day--selecting-range-end": t3.isSelectingRangeEnd(), "react-datepicker__day--today": t3.isCurrentDay(), "react-datepicker__day--weekend": t3.isWeekend(), "react-datepicker__day--outside-month": t3.isAfterMonth() || t3.isBeforeMonth() }, t3.getHighLightedClass("react-datepicker__day--highlighted"), t3.getHolidaysClass());
    }), ye(we(t3), "getAriaLabel", function() {
      var e2 = t3.props, r2 = e2.day, n2 = e2.ariaLabelPrefixWhenEnabled, o2 = void 0 === n2 ? "Choose" : n2, a2 = e2.ariaLabelPrefixWhenDisabled, s2 = void 0 === a2 ? "Not available" : a2, i2 = t3.isDisabled() || t3.isExcluded() ? s2 : o2;
      return "".concat(i2, " ").concat(Ie(r2, "PPPP", t3.props.locale));
    }), ye(we(t3), "getTitle", function() {
      var e2 = t3.props, r2 = e2.day, n2 = e2.holidays, o2 = void 0 === n2 ? /* @__PURE__ */ new Map() : n2, a2 = Ie(r2, "MM.dd.yyyy");
      return o2.has(a2) && o2.get(a2).holidayNames.length > 0 ? o2.get(a2).holidayNames.join(", ") : "";
    }), ye(we(t3), "getTabIndex", function(e2, r2) {
      var n2 = e2 || t3.props.selected, o2 = r2 || t3.props.preSelection;
      return (!t3.props.showWeekPicker || !t3.props.showWeekNumber && t3.isStartOfWeek()) && (t3.isKeyboardSelected() || t3.isSameDay(n2) && je(o2, n2)) ? 0 : -1;
    }), ye(we(t3), "handleFocusDay", function() {
      var e2, r2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n2 = false;
      0 === t3.getTabIndex() && !r2.isInputFocused && t3.isSameDay(t3.props.preSelection) && (document.activeElement && document.activeElement !== document.body || (n2 = true), t3.props.inline && !t3.props.shouldFocusDayInline && (n2 = false), t3.props.containerRef && t3.props.containerRef.current && t3.props.containerRef.current.contains(document.activeElement) && document.activeElement.classList.contains("react-datepicker__day") && (n2 = true), t3.props.monthShowsDuplicateDaysEnd && t3.isAfterMonth() && (n2 = false), t3.props.monthShowsDuplicateDaysStart && t3.isBeforeMonth() && (n2 = false)), n2 && (null === (e2 = t3.dayEl.current) || void 0 === e2 || e2.focus({ preventScroll: true }));
    }), ye(we(t3), "renderDayContents", function() {
      return t3.props.monthShowsDuplicateDaysEnd && t3.isAfterMonth() || t3.props.monthShowsDuplicateDaysStart && t3.isBeforeMonth() ? null : t3.props.renderDayContents ? t3.props.renderDayContents(getDate(t3.props.day), t3.props.day) : getDate(t3.props.day);
    }), ye(we(t3), "render", function() {
      return import_react2.default.createElement("div", { ref: t3.dayEl, className: t3.getClassNames(t3.props.day), onKeyDown: t3.handleOnKeyDown, onClick: t3.handleClick, onMouseEnter: t3.handleMouseEnter, tabIndex: t3.getTabIndex(), "aria-label": t3.getAriaLabel(), role: "option", title: t3.getTitle(), "aria-disabled": t3.isDisabled(), "aria-current": t3.isCurrentDay() ? "date" : void 0, "aria-selected": t3.isSelected() || t3.isInRange() }, t3.renderDayContents(), "" !== t3.getTitle() && import_react2.default.createElement("span", { className: "holiday-overlay" }, t3.getTitle()));
    }), t3;
  }
  return fe(o, [{ key: "componentDidMount", value: function() {
    this.handleFocusDay();
  } }, { key: "componentDidUpdate", value: function(e2) {
    this.handleFocusDay(e2);
  } }]), o;
}();
var Tt = function(t2) {
  De(o, import_react2.default.Component);
  var n = be(o);
  function o() {
    var t3;
    he(this, o);
    for (var r2 = arguments.length, a = new Array(r2), s = 0; s < r2; s++) a[s] = arguments[s];
    return ye(we(t3 = n.call.apply(n, [this].concat(a))), "weekNumberEl", import_react2.default.createRef()), ye(we(t3), "handleClick", function(e2) {
      t3.props.onClick && t3.props.onClick(e2);
    }), ye(we(t3), "handleOnKeyDown", function(e2) {
      " " === e2.key && (e2.preventDefault(), e2.key = "Enter"), t3.props.handleOnKeyDown(e2);
    }), ye(we(t3), "isKeyboardSelected", function() {
      return !t3.props.disabledKeyboardNavigation && !je(t3.props.date, t3.props.selected) && je(t3.props.date, t3.props.preSelection);
    }), ye(we(t3), "getTabIndex", function() {
      return t3.props.showWeekPicker && t3.props.showWeekNumber && (t3.isKeyboardSelected() || je(t3.props.date, t3.props.selected) && je(t3.props.preSelection, t3.props.selected)) ? 0 : -1;
    }), ye(we(t3), "handleFocusWeekNumber", function() {
      var e2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r3 = false;
      0 === t3.getTabIndex() && !e2.isInputFocused && je(t3.props.date, t3.props.preSelection) && (document.activeElement && document.activeElement !== document.body || (r3 = true), t3.props.inline && !t3.props.shouldFocusDayInline && (r3 = false), t3.props.containerRef && t3.props.containerRef.current && t3.props.containerRef.current.contains(document.activeElement) && document.activeElement && document.activeElement.classList.contains("react-datepicker__week-number") && (r3 = true)), r3 && t3.weekNumberEl.current && t3.weekNumberEl.current.focus({ preventScroll: true });
    }), t3;
  }
  return fe(o, [{ key: "componentDidMount", value: function() {
    this.handleFocusWeekNumber();
  } }, { key: "componentDidUpdate", value: function(e2) {
    this.handleFocusWeekNumber(e2);
  } }, { key: "render", value: function() {
    var t3 = this.props, n2 = t3.weekNumber, o2 = t3.ariaLabelPrefix, a = void 0 === o2 ? "week " : o2, s = { "react-datepicker__week-number": true, "react-datepicker__week-number--clickable": !!t3.onClick, "react-datepicker__week-number--selected": je(this.props.date, this.props.selected), "react-datepicker__week-number--keyboard-selected": this.isKeyboardSelected() };
    return import_react2.default.createElement("div", { ref: this.weekNumberEl, className: (0, import_classnames.default)(s), "aria-label": "".concat(a, " ").concat(this.props.weekNumber), onClick: this.handleClick, onKeyDown: this.handleOnKeyDown, tabIndex: this.getTabIndex() }, n2);
  } }], [{ key: "defaultProps", get: function() {
    return { ariaLabelPrefix: "week " };
  } }]), o;
}();
var It = function(t2) {
  De(o, import_react2.default.Component);
  var n = be(o);
  function o() {
    var t3;
    he(this, o);
    for (var r2 = arguments.length, a = new Array(r2), s = 0; s < r2; s++) a[s] = arguments[s];
    return ye(we(t3 = n.call.apply(n, [this].concat(a))), "handleDayClick", function(e2, r3) {
      t3.props.onDayClick && t3.props.onDayClick(e2, r3);
    }), ye(we(t3), "handleDayMouseEnter", function(e2) {
      t3.props.onDayMouseEnter && t3.props.onDayMouseEnter(e2);
    }), ye(we(t3), "handleWeekClick", function(e2, r3, n2) {
      if ("function" == typeof t3.props.onWeekSelect && t3.props.onWeekSelect(e2, r3, n2), t3.props.showWeekPicker) {
        var o2 = Le(e2, t3.props.locale, t3.props.calendarStartDay);
        t3.handleDayClick(o2, n2);
      }
      t3.props.shouldCloseOnSelect && t3.props.setOpen(false);
    }), ye(we(t3), "formatWeekNumber", function(e2) {
      return t3.props.formatWeekNumber ? t3.props.formatWeekNumber(e2) : function(e3, t4) {
        var r3 = t4 && Ge(t4) || $e() && Ge($e());
        return getISOWeek(e3, r3 ? { locale: r3 } : null);
      }(e2);
    }), ye(we(t3), "renderDays", function() {
      var r3 = Le(t3.props.day, t3.props.locale, t3.props.calendarStartDay), n2 = [], o2 = t3.formatWeekNumber(r3);
      if (t3.props.showWeekNumber) {
        var a2 = t3.props.onWeekSelect || t3.props.showWeekPicker ? t3.handleWeekClick.bind(we(t3), r3, o2) : void 0;
        n2.push(import_react2.default.createElement(Tt, { key: "W", weekNumber: o2, date: r3, onClick: a2, selected: t3.props.selected, preSelection: t3.props.preSelection, ariaLabelPrefix: t3.props.ariaLabelPrefix, showWeekPicker: t3.props.showWeekPicker, showWeekNumber: t3.props.showWeekNumber, disabledKeyboardNavigation: t3.props.disabledKeyboardNavigation, handleOnKeyDown: t3.props.handleOnKeyDown, isInputFocused: t3.props.isInputFocused, containerRef: t3.props.containerRef }));
      }
      return n2.concat([0, 1, 2, 3, 4, 5, 6].map(function(n3) {
        var o3 = addDays(r3, n3);
        return import_react2.default.createElement(Yt, { ariaLabelPrefixWhenEnabled: t3.props.chooseDayAriaLabelPrefix, ariaLabelPrefixWhenDisabled: t3.props.disabledDayAriaLabelPrefix, key: o3.valueOf(), day: o3, month: t3.props.month, onClick: t3.handleDayClick.bind(we(t3), o3), onMouseEnter: t3.handleDayMouseEnter.bind(we(t3), o3), minDate: t3.props.minDate, maxDate: t3.props.maxDate, excludeDates: t3.props.excludeDates, excludeDateIntervals: t3.props.excludeDateIntervals, includeDates: t3.props.includeDates, includeDateIntervals: t3.props.includeDateIntervals, highlightDates: t3.props.highlightDates, holidays: t3.props.holidays, selectingDate: t3.props.selectingDate, filterDate: t3.props.filterDate, preSelection: t3.props.preSelection, selected: t3.props.selected, selectsStart: t3.props.selectsStart, selectsEnd: t3.props.selectsEnd, selectsRange: t3.props.selectsRange, showWeekPicker: t3.props.showWeekPicker, showWeekNumber: t3.props.showWeekNumber, selectsDisabledDaysInRange: t3.props.selectsDisabledDaysInRange, startDate: t3.props.startDate, endDate: t3.props.endDate, dayClassName: t3.props.dayClassName, renderDayContents: t3.props.renderDayContents, disabledKeyboardNavigation: t3.props.disabledKeyboardNavigation, handleOnKeyDown: t3.props.handleOnKeyDown, isInputFocused: t3.props.isInputFocused, containerRef: t3.props.containerRef, inline: t3.props.inline, shouldFocusDayInline: t3.props.shouldFocusDayInline, monthShowsDuplicateDaysEnd: t3.props.monthShowsDuplicateDaysEnd, monthShowsDuplicateDaysStart: t3.props.monthShowsDuplicateDaysStart, locale: t3.props.locale });
      }));
    }), ye(we(t3), "startOfWeek", function() {
      return Le(t3.props.day, t3.props.locale, t3.props.calendarStartDay);
    }), ye(we(t3), "isKeyboardSelected", function() {
      return !t3.props.disabledKeyboardNavigation && !je(t3.startOfWeek(), t3.props.selected) && je(t3.startOfWeek(), t3.props.preSelection);
    }), t3;
  }
  return fe(o, [{ key: "render", value: function() {
    var t3 = { "react-datepicker__week": true, "react-datepicker__week--selected": je(this.startOfWeek(), this.props.selected), "react-datepicker__week--keyboard-selected": this.isKeyboardSelected() };
    return import_react2.default.createElement("div", { className: (0, import_classnames.default)(t3) }, this.renderDays());
  } }], [{ key: "defaultProps", get: function() {
    return { shouldCloseOnSelect: true };
  } }]), o;
}();
var Ot = "two_columns";
var Rt = "three_columns";
var Lt = "four_columns";
var Ft = ye(ye(ye({}, Ot, { grid: [[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10, 11]], verticalNavigationOffset: 2 }), Rt, { grid: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]], verticalNavigationOffset: 3 }), Lt, { grid: [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]], verticalNavigationOffset: 4 });
function At(e2, t2) {
  return e2 ? Lt : t2 ? Ot : Rt;
}
var Wt = function(t2) {
  De(o, import_react2.default.Component);
  var n = be(o);
  function o() {
    var t3;
    he(this, o);
    for (var a = arguments.length, s = new Array(a), i = 0; i < a; i++) s[i] = arguments[i];
    return ye(we(t3 = n.call.apply(n, [this].concat(s))), "MONTH_REFS", Se(Array(12)).map(function() {
      return import_react2.default.createRef();
    })), ye(we(t3), "QUARTER_REFS", Se(Array(4)).map(function() {
      return import_react2.default.createRef();
    })), ye(we(t3), "isDisabled", function(e2) {
      return Ze(e2, t3.props);
    }), ye(we(t3), "isExcluded", function(e2) {
      return et(e2, t3.props);
    }), ye(we(t3), "handleDayClick", function(e2, r2) {
      t3.props.onDayClick && t3.props.onDayClick(e2, r2, t3.props.orderInDisplay);
    }), ye(we(t3), "handleDayMouseEnter", function(e2) {
      t3.props.onDayMouseEnter && t3.props.onDayMouseEnter(e2);
    }), ye(we(t3), "handleMouseLeave", function() {
      t3.props.onMouseLeave && t3.props.onMouseLeave();
    }), ye(we(t3), "isRangeStartMonth", function(e2) {
      var r2 = t3.props, n2 = r2.day, o2 = r2.startDate, a2 = r2.endDate;
      return !(!o2 || !a2) && Qe(setMonth(n2, e2), o2);
    }), ye(we(t3), "isRangeStartQuarter", function(e2) {
      var r2 = t3.props, n2 = r2.day, o2 = r2.startDate, a2 = r2.endDate;
      return !(!o2 || !a2) && He(setQuarter(n2, e2), o2);
    }), ye(we(t3), "isRangeEndMonth", function(e2) {
      var r2 = t3.props, n2 = r2.day, o2 = r2.startDate, a2 = r2.endDate;
      return !(!o2 || !a2) && Qe(setMonth(n2, e2), a2);
    }), ye(we(t3), "isRangeEndQuarter", function(e2) {
      var r2 = t3.props, n2 = r2.day, o2 = r2.startDate, a2 = r2.endDate;
      return !(!o2 || !a2) && He(setQuarter(n2, e2), a2);
    }), ye(we(t3), "isInSelectingRangeMonth", function(e2) {
      var r2, n2 = t3.props, o2 = n2.day, a2 = n2.selectsStart, s2 = n2.selectsEnd, i2 = n2.selectsRange, p = n2.startDate, c = n2.endDate, l = null !== (r2 = t3.props.selectingDate) && void 0 !== r2 ? r2 : t3.props.preSelection;
      return !(!(a2 || s2 || i2) || !l) && (a2 && c ? rt(l, c, e2, o2) : (s2 && p || !(!i2 || !p || c)) && rt(p, l, e2, o2));
    }), ye(we(t3), "isSelectingMonthRangeStart", function(e2) {
      var r2;
      if (!t3.isInSelectingRangeMonth(e2)) return false;
      var n2 = t3.props, o2 = n2.day, a2 = n2.startDate, s2 = n2.selectsStart, i2 = setMonth(o2, e2), p = null !== (r2 = t3.props.selectingDate) && void 0 !== r2 ? r2 : t3.props.preSelection;
      return Qe(i2, s2 ? p : a2);
    }), ye(we(t3), "isSelectingMonthRangeEnd", function(e2) {
      var r2;
      if (!t3.isInSelectingRangeMonth(e2)) return false;
      var n2 = t3.props, o2 = n2.day, a2 = n2.endDate, s2 = n2.selectsEnd, i2 = n2.selectsRange, p = setMonth(o2, e2), c = null !== (r2 = t3.props.selectingDate) && void 0 !== r2 ? r2 : t3.props.preSelection;
      return Qe(p, s2 || i2 ? c : a2);
    }), ye(we(t3), "isInSelectingRangeQuarter", function(e2) {
      var r2, n2 = t3.props, o2 = n2.day, a2 = n2.selectsStart, s2 = n2.selectsEnd, i2 = n2.selectsRange, p = n2.startDate, c = n2.endDate, l = null !== (r2 = t3.props.selectingDate) && void 0 !== r2 ? r2 : t3.props.preSelection;
      return !(!(a2 || s2 || i2) || !l) && (a2 && c ? st(l, c, e2, o2) : (s2 && p || !(!i2 || !p || c)) && st(p, l, e2, o2));
    }), ye(we(t3), "isWeekInMonth", function(e2) {
      var r2 = t3.props.day, n2 = addDays(e2, 6);
      return Qe(e2, r2) || Qe(n2, r2);
    }), ye(we(t3), "isCurrentMonth", function(e2, t4) {
      return getYear(e2) === getYear(Ye()) && t4 === getMonth(Ye());
    }), ye(we(t3), "isCurrentQuarter", function(e2, t4) {
      return getYear(e2) === getYear(Ye()) && t4 === getQuarter(Ye());
    }), ye(we(t3), "isSelectedMonth", function(e2, t4, r2) {
      return getMonth(r2) === t4 && getYear(e2) === getYear(r2);
    }), ye(we(t3), "isSelectedQuarter", function(e2, t4, r2) {
      return getQuarter(e2) === t4 && getYear(e2) === getYear(r2);
    }), ye(we(t3), "renderWeeks", function() {
      for (var r2 = [], n2 = t3.props.fixedHeight, o2 = 0, a2 = false, s2 = Le(Fe(t3.props.day), t3.props.locale, t3.props.calendarStartDay); r2.push(import_react2.default.createElement(It, { ariaLabelPrefix: t3.props.weekAriaLabelPrefix, chooseDayAriaLabelPrefix: t3.props.chooseDayAriaLabelPrefix, disabledDayAriaLabelPrefix: t3.props.disabledDayAriaLabelPrefix, key: o2, day: s2, month: getMonth(t3.props.day), onDayClick: t3.handleDayClick, onDayMouseEnter: t3.handleDayMouseEnter, onWeekSelect: t3.props.onWeekSelect, formatWeekNumber: t3.props.formatWeekNumber, locale: t3.props.locale, minDate: t3.props.minDate, maxDate: t3.props.maxDate, excludeDates: t3.props.excludeDates, excludeDateIntervals: t3.props.excludeDateIntervals, includeDates: t3.props.includeDates, includeDateIntervals: t3.props.includeDateIntervals, inline: t3.props.inline, shouldFocusDayInline: t3.props.shouldFocusDayInline, highlightDates: t3.props.highlightDates, holidays: t3.props.holidays, selectingDate: t3.props.selectingDate, filterDate: t3.props.filterDate, preSelection: t3.props.preSelection, selected: t3.props.selected, selectsStart: t3.props.selectsStart, selectsEnd: t3.props.selectsEnd, selectsRange: t3.props.selectsRange, selectsDisabledDaysInRange: t3.props.selectsDisabledDaysInRange, showWeekNumber: t3.props.showWeekNumbers, showWeekPicker: t3.props.showWeekPicker, startDate: t3.props.startDate, endDate: t3.props.endDate, dayClassName: t3.props.dayClassName, setOpen: t3.props.setOpen, shouldCloseOnSelect: t3.props.shouldCloseOnSelect, disabledKeyboardNavigation: t3.props.disabledKeyboardNavigation, renderDayContents: t3.props.renderDayContents, handleOnKeyDown: t3.props.handleOnKeyDown, isInputFocused: t3.props.isInputFocused, containerRef: t3.props.containerRef, calendarStartDay: t3.props.calendarStartDay, monthShowsDuplicateDaysEnd: t3.props.monthShowsDuplicateDaysEnd, monthShowsDuplicateDaysStart: t3.props.monthShowsDuplicateDaysStart })), !a2; ) {
        o2++, s2 = addWeeks(s2, 1);
        var i2 = n2 && o2 >= 6, p = !n2 && !t3.isWeekInMonth(s2);
        if (i2 || p) {
          if (!t3.props.peekNextMonth) break;
          a2 = true;
        }
      }
      return r2;
    }), ye(we(t3), "onMonthClick", function(e2, r2) {
      t3.handleDayClick(Fe(setMonth(t3.props.day, r2)), e2);
    }), ye(we(t3), "onMonthMouseEnter", function(e2) {
      t3.handleDayMouseEnter(Fe(setMonth(t3.props.day, e2)));
    }), ye(we(t3), "handleMonthNavigation", function(e2, r2) {
      t3.isDisabled(r2) || t3.isExcluded(r2) || (t3.props.setPreSelection(r2), t3.MONTH_REFS[e2].current && t3.MONTH_REFS[e2].current.focus());
    }), ye(we(t3), "onMonthKeyDown", function(e2, r2) {
      var n2 = t3.props, o2 = n2.selected, a2 = n2.preSelection, s2 = n2.disabledKeyboardNavigation, i2 = n2.showTwoColumnMonthYearPicker, p = n2.showFourColumnMonthYearPicker, c = n2.setPreSelection, d = e2.key;
      if ("Tab" !== d && e2.preventDefault(), !s2) {
        var u = At(p, i2), h = Ft[u].verticalNavigationOffset, m = Ft[u].grid;
        switch (d) {
          case "Enter":
            t3.onMonthClick(e2, r2), c(o2);
            break;
          case "ArrowRight":
            t3.handleMonthNavigation(11 === r2 ? 0 : r2 + 1, addMonths(a2, 1));
            break;
          case "ArrowLeft":
            t3.handleMonthNavigation(0 === r2 ? 11 : r2 - 1, subMonths(a2, 1));
            break;
          case "ArrowUp":
            t3.handleMonthNavigation(m[0].includes(r2) ? r2 + 12 - h : r2 - h, subMonths(a2, h));
            break;
          case "ArrowDown":
            t3.handleMonthNavigation(m[m.length - 1].includes(r2) ? r2 - 12 + h : r2 + h, addMonths(a2, h));
        }
      }
    }), ye(we(t3), "onQuarterClick", function(e2, r2) {
      t3.handleDayClick(We(setQuarter(t3.props.day, r2)), e2);
    }), ye(we(t3), "onQuarterMouseEnter", function(e2) {
      t3.handleDayMouseEnter(We(setQuarter(t3.props.day, e2)));
    }), ye(we(t3), "handleQuarterNavigation", function(e2, r2) {
      t3.isDisabled(r2) || t3.isExcluded(r2) || (t3.props.setPreSelection(r2), t3.QUARTER_REFS[e2 - 1].current && t3.QUARTER_REFS[e2 - 1].current.focus());
    }), ye(we(t3), "onQuarterKeyDown", function(e2, r2) {
      var n2 = e2.key;
      if (!t3.props.disabledKeyboardNavigation) switch (n2) {
        case "Enter":
          t3.onQuarterClick(e2, r2), t3.props.setPreSelection(t3.props.selected);
          break;
        case "ArrowRight":
          t3.handleQuarterNavigation(4 === r2 ? 1 : r2 + 1, addQuarters(t3.props.preSelection, 1));
          break;
        case "ArrowLeft":
          t3.handleQuarterNavigation(1 === r2 ? 4 : r2 - 1, subQuarters(t3.props.preSelection, 1));
      }
    }), ye(we(t3), "getMonthClassNames", function(e2) {
      var n2 = t3.props, o2 = n2.day, a2 = n2.startDate, s2 = n2.endDate, i2 = n2.selected, p = n2.minDate, c = n2.maxDate, l = n2.preSelection, d = n2.monthClassName, u = n2.excludeDates, h = n2.includeDates, m = d ? d(setMonth(o2, e2)) : void 0, f = setMonth(o2, e2);
      return (0, import_classnames.default)("react-datepicker__month-text", "react-datepicker__month-".concat(e2), m, { "react-datepicker__month-text--disabled": (p || c || u || h) && tt(f, t3.props), "react-datepicker__month-text--selected": t3.isSelectedMonth(o2, e2, i2), "react-datepicker__month-text--keyboard-selected": !t3.props.disabledKeyboardNavigation && getMonth(l) === e2, "react-datepicker__month-text--in-selecting-range": t3.isInSelectingRangeMonth(e2), "react-datepicker__month-text--in-range": rt(a2, s2, e2, o2), "react-datepicker__month-text--range-start": t3.isRangeStartMonth(e2), "react-datepicker__month-text--range-end": t3.isRangeEndMonth(e2), "react-datepicker__month-text--selecting-range-start": t3.isSelectingMonthRangeStart(e2), "react-datepicker__month-text--selecting-range-end": t3.isSelectingMonthRangeEnd(e2), "react-datepicker__month-text--today": t3.isCurrentMonth(o2, e2) });
    }), ye(we(t3), "getTabIndex", function(e2) {
      var r2 = getMonth(t3.props.preSelection);
      return t3.props.disabledKeyboardNavigation || e2 !== r2 ? "-1" : "0";
    }), ye(we(t3), "getQuarterTabIndex", function(e2) {
      var r2 = getQuarter(t3.props.preSelection);
      return t3.props.disabledKeyboardNavigation || e2 !== r2 ? "-1" : "0";
    }), ye(we(t3), "getAriaLabel", function(e2) {
      var r2 = t3.props, n2 = r2.chooseDayAriaLabelPrefix, o2 = void 0 === n2 ? "Choose" : n2, a2 = r2.disabledDayAriaLabelPrefix, s2 = void 0 === a2 ? "Not available" : a2, i2 = r2.day, p = setMonth(i2, e2), c = t3.isDisabled(p) || t3.isExcluded(p) ? s2 : o2;
      return "".concat(c, " ").concat(Ie(p, "MMMM yyyy"));
    }), ye(we(t3), "getQuarterClassNames", function(e2) {
      var n2 = t3.props, o2 = n2.day, a2 = n2.startDate, s2 = n2.endDate, i2 = n2.selected, p = n2.minDate, c = n2.maxDate, l = n2.preSelection, d = n2.disabledKeyboardNavigation;
      return (0, import_classnames.default)("react-datepicker__quarter-text", "react-datepicker__quarter-".concat(e2), { "react-datepicker__quarter-text--disabled": (p || c) && nt(setQuarter(o2, e2), t3.props), "react-datepicker__quarter-text--selected": t3.isSelectedQuarter(o2, e2, i2), "react-datepicker__quarter-text--keyboard-selected": !d && getQuarter(l) === e2, "react-datepicker__quarter-text--in-selecting-range": t3.isInSelectingRangeQuarter(e2), "react-datepicker__quarter-text--in-range": st(a2, s2, e2, o2), "react-datepicker__quarter-text--range-start": t3.isRangeStartQuarter(e2), "react-datepicker__quarter-text--range-end": t3.isRangeEndQuarter(e2) });
    }), ye(we(t3), "getMonthContent", function(e2) {
      var r2 = t3.props, n2 = r2.showFullMonthYearPicker, o2 = r2.renderMonthContent, a2 = r2.locale, s2 = r2.day, i2 = Xe(e2, a2), p = Je(e2, a2);
      return o2 ? o2(e2, i2, p, s2) : n2 ? p : i2;
    }), ye(we(t3), "getQuarterContent", function(e2) {
      var r2 = t3.props, n2 = r2.renderQuarterContent, o2 = function(e3, t4) {
        return Ie(setQuarter(Ye(), e3), "QQQ", t4);
      }(e2, r2.locale);
      return n2 ? n2(e2, o2) : o2;
    }), ye(we(t3), "renderMonths", function() {
      var r2 = t3.props, n2 = r2.showTwoColumnMonthYearPicker, o2 = r2.showFourColumnMonthYearPicker, a2 = r2.day, s2 = r2.selected;
      return Ft[At(o2, n2)].grid.map(function(r3, n3) {
        return import_react2.default.createElement("div", { className: "react-datepicker__month-wrapper", key: n3 }, r3.map(function(r4, n4) {
          return import_react2.default.createElement("div", { ref: t3.MONTH_REFS[r4], key: n4, onClick: function(e2) {
            t3.onMonthClick(e2, r4);
          }, onKeyDown: function(e2) {
            t3.onMonthKeyDown(e2, r4);
          }, onMouseEnter: function() {
            return t3.onMonthMouseEnter(r4);
          }, tabIndex: t3.getTabIndex(r4), className: t3.getMonthClassNames(r4), role: "option", "aria-label": t3.getAriaLabel(r4), "aria-current": t3.isCurrentMonth(a2, r4) ? "date" : void 0, "aria-selected": t3.isSelectedMonth(a2, r4, s2) }, t3.getMonthContent(r4));
        }));
      });
    }), ye(we(t3), "renderQuarters", function() {
      var r2 = t3.props, n2 = r2.day, o2 = r2.selected;
      return import_react2.default.createElement("div", { className: "react-datepicker__quarter-wrapper" }, [1, 2, 3, 4].map(function(r3, a2) {
        return import_react2.default.createElement("div", { key: a2, ref: t3.QUARTER_REFS[a2], role: "option", onClick: function(e2) {
          t3.onQuarterClick(e2, r3);
        }, onKeyDown: function(e2) {
          t3.onQuarterKeyDown(e2, r3);
        }, onMouseEnter: function() {
          return t3.onQuarterMouseEnter(r3);
        }, className: t3.getQuarterClassNames(r3), "aria-selected": t3.isSelectedQuarter(n2, r3, o2), tabIndex: t3.getQuarterTabIndex(r3), "aria-current": t3.isCurrentQuarter(n2, r3) ? "date" : void 0 }, t3.getQuarterContent(r3));
      }));
    }), ye(we(t3), "getClassNames", function() {
      var e2 = t3.props, n2 = e2.selectingDate, o2 = e2.selectsStart, a2 = e2.selectsEnd, s2 = e2.showMonthYearPicker, i2 = e2.showQuarterYearPicker, p = e2.showWeekPicker;
      return (0, import_classnames.default)("react-datepicker__month", { "react-datepicker__month--selecting-range": n2 && (o2 || a2) }, { "react-datepicker__monthPicker": s2 }, { "react-datepicker__quarterPicker": i2 }, { "react-datepicker__weekPicker": p });
    }), t3;
  }
  return fe(o, [{ key: "render", value: function() {
    var t3 = this.props, r2 = t3.showMonthYearPicker, n2 = t3.showQuarterYearPicker, o2 = t3.day, a = t3.ariaLabelPrefix, s = void 0 === a ? "month " : a;
    return import_react2.default.createElement("div", { className: this.getClassNames(), onMouseLeave: this.handleMouseLeave, "aria-label": "".concat(s, " ").concat(Ie(o2, "yyyy-MM")), role: "listbox" }, r2 ? this.renderMonths() : n2 ? this.renderQuarters() : this.renderWeeks());
  } }]), o;
}();
var Kt = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = be(n);
  function n() {
    var t3;
    he(this, n);
    for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++) a[i] = arguments[i];
    return ye(we(t3 = r2.call.apply(r2, [this].concat(a))), "state", { height: null }), ye(we(t3), "scrollToTheSelectedTime", function() {
      requestAnimationFrame(function() {
        t3.list && (t3.list.scrollTop = t3.centerLi && n.calcCenterPosition(t3.props.monthRef ? t3.props.monthRef.clientHeight - t3.header.clientHeight : t3.list.clientHeight, t3.centerLi));
      });
    }), ye(we(t3), "handleClick", function(e2) {
      (t3.props.minTime || t3.props.maxTime) && lt(e2, t3.props) || (t3.props.excludeTimes || t3.props.includeTimes || t3.props.filterTime) && ct(e2, t3.props) || t3.props.onChange(e2);
    }), ye(we(t3), "isSelectedTime", function(e2) {
      return t3.props.selected && (r3 = t3.props.selected, n2 = e2, bt(r3).getTime() === bt(n2).getTime());
      var r3, n2;
    }), ye(we(t3), "isDisabledTime", function(e2) {
      return (t3.props.minTime || t3.props.maxTime) && lt(e2, t3.props) || (t3.props.excludeTimes || t3.props.includeTimes || t3.props.filterTime) && ct(e2, t3.props);
    }), ye(we(t3), "liClasses", function(e2) {
      var r3 = ["react-datepicker__time-list-item", t3.props.timeClassName ? t3.props.timeClassName(e2) : void 0];
      return t3.isSelectedTime(e2) && r3.push("react-datepicker__time-list-item--selected"), t3.isDisabledTime(e2) && r3.push("react-datepicker__time-list-item--disabled"), t3.props.injectTimes && (60 * getHours(e2) + getMinutes(e2)) % t3.props.intervals != 0 && r3.push("react-datepicker__time-list-item--injected"), r3.join(" ");
    }), ye(we(t3), "handleOnKeyDown", function(e2, r3) {
      " " === e2.key && (e2.preventDefault(), e2.key = "Enter"), "ArrowUp" !== e2.key && "ArrowLeft" !== e2.key || !e2.target.previousSibling || (e2.preventDefault(), e2.target.previousSibling.focus()), "ArrowDown" !== e2.key && "ArrowRight" !== e2.key || !e2.target.nextSibling || (e2.preventDefault(), e2.target.nextSibling.focus()), "Enter" === e2.key && t3.handleClick(r3), t3.props.handleOnKeyDown(e2);
    }), ye(we(t3), "renderTimes", function() {
      for (var r3 = [], n2 = t3.props.format ? t3.props.format : "p", o2 = t3.props.intervals, a2 = t3.props.selected || t3.props.openToDate || Ye(), i2 = startOfDay(a2), p = t3.props.injectTimes && t3.props.injectTimes.sort(function(e2, t4) {
        return e2 - t4;
      }), c = 60 * function(e2) {
        var t4 = new Date(e2.getFullYear(), e2.getMonth(), e2.getDate()), r4 = new Date(e2.getFullYear(), e2.getMonth(), e2.getDate(), 24);
        return Math.round((+r4 - +t4) / 36e5);
      }(a2), l = c / o2, d = 0; d < l; d++) {
        var u = addMinutes(i2, d * o2);
        if (r3.push(u), p) {
          var h = gt(i2, u, d, o2, p);
          r3 = r3.concat(h);
        }
      }
      var m = r3.reduce(function(e2, t4) {
        return t4.getTime() <= a2.getTime() ? t4 : e2;
      }, r3[0]);
      return r3.map(function(r4, o3) {
        return import_react2.default.createElement("li", { key: o3, onClick: t3.handleClick.bind(we(t3), r4), className: t3.liClasses(r4), ref: function(e2) {
          r4 === m && (t3.centerLi = e2);
        }, onKeyDown: function(e2) {
          t3.handleOnKeyDown(e2, r4);
        }, tabIndex: r4 === m ? 0 : -1, role: "option", "aria-selected": t3.isSelectedTime(r4) ? "true" : void 0, "aria-disabled": t3.isDisabledTime(r4) ? "true" : void 0 }, Ie(r4, n2, t3.props.locale));
      });
    }), t3;
  }
  return fe(n, [{ key: "componentDidMount", value: function() {
    this.scrollToTheSelectedTime(), this.props.monthRef && this.header && this.setState({ height: this.props.monthRef.clientHeight - this.header.clientHeight });
  } }, { key: "render", value: function() {
    var t3 = this, r3 = this.state.height;
    return import_react2.default.createElement("div", { className: "react-datepicker__time-container ".concat(this.props.todayButton ? "react-datepicker__time-container--with-today-button" : "") }, import_react2.default.createElement("div", { className: "react-datepicker__header react-datepicker__header--time ".concat(this.props.showTimeSelectOnly ? "react-datepicker__header--time--only" : ""), ref: function(e2) {
      t3.header = e2;
    } }, import_react2.default.createElement("div", { className: "react-datepicker-time__header" }, this.props.timeCaption)), import_react2.default.createElement("div", { className: "react-datepicker__time" }, import_react2.default.createElement("div", { className: "react-datepicker__time-box" }, import_react2.default.createElement("ul", { className: "react-datepicker__time-list", ref: function(e2) {
      t3.list = e2;
    }, style: r3 ? { height: r3 } : {}, role: "listbox", "aria-label": this.props.timeCaption }, this.renderTimes()))));
  } }], [{ key: "defaultProps", get: function() {
    return { intervals: 30, onTimeChange: function() {
    }, todayButton: null, timeCaption: "Time" };
  } }]), n;
}();
ye(Kt, "calcCenterPosition", function(e2, t2) {
  return t2.offsetTop - (e2 / 2 - t2.clientHeight / 2);
});
var Bt = function(t2) {
  De(o, import_react2.default.Component);
  var n = be(o);
  function o(t3) {
    var a;
    return he(this, o), ye(we(a = n.call(this, t3)), "YEAR_REFS", Se(Array(a.props.yearItemNumber)).map(function() {
      return import_react2.default.createRef();
    })), ye(we(a), "isDisabled", function(e2) {
      return Ze(e2, a.props);
    }), ye(we(a), "isExcluded", function(e2) {
      return et(e2, a.props);
    }), ye(we(a), "selectingDate", function() {
      var e2;
      return null !== (e2 = a.props.selectingDate) && void 0 !== e2 ? e2 : a.props.preSelection;
    }), ye(we(a), "updateFocusOnPaginate", function(e2) {
      var t4 = (function() {
        this.YEAR_REFS[e2].current.focus();
      }).bind(we(a));
      window.requestAnimationFrame(t4);
    }), ye(we(a), "handleYearClick", function(e2, t4) {
      a.props.onDayClick && a.props.onDayClick(e2, t4);
    }), ye(we(a), "handleYearNavigation", function(e2, t4) {
      var r2 = a.props, n2 = r2.date, o2 = r2.yearItemNumber, s = wt(n2, o2).startPeriod;
      a.isDisabled(t4) || a.isExcluded(t4) || (a.props.setPreSelection(t4), e2 - s == -1 ? a.updateFocusOnPaginate(o2 - 1) : e2 - s === o2 ? a.updateFocusOnPaginate(0) : a.YEAR_REFS[e2 - s].current.focus());
    }), ye(we(a), "isSameDay", function(e2, t4) {
      return je(e2, t4);
    }), ye(we(a), "isCurrentYear", function(e2) {
      return e2 === getYear(Ye());
    }), ye(we(a), "isRangeStart", function(e2) {
      return a.props.startDate && a.props.endDate && Be(setYear(Ye(), e2), a.props.startDate);
    }), ye(we(a), "isRangeEnd", function(e2) {
      return a.props.startDate && a.props.endDate && Be(setYear(Ye(), e2), a.props.endDate);
    }), ye(we(a), "isInRange", function(e2) {
      return ot(e2, a.props.startDate, a.props.endDate);
    }), ye(we(a), "isInSelectingRange", function(e2) {
      var t4 = a.props, r2 = t4.selectsStart, n2 = t4.selectsEnd, o2 = t4.selectsRange, s = t4.startDate, i = t4.endDate;
      return !(!(r2 || n2 || o2) || !a.selectingDate()) && (r2 && i ? ot(e2, a.selectingDate(), i) : (n2 && s || !(!o2 || !s || i)) && ot(e2, s, a.selectingDate()));
    }), ye(we(a), "isSelectingRangeStart", function(e2) {
      if (!a.isInSelectingRange(e2)) return false;
      var t4 = a.props, r2 = t4.startDate, n2 = t4.selectsStart, o2 = setYear(Ye(), e2);
      return Be(o2, n2 ? a.selectingDate() : r2);
    }), ye(we(a), "isSelectingRangeEnd", function(e2) {
      if (!a.isInSelectingRange(e2)) return false;
      var t4 = a.props, r2 = t4.endDate, n2 = t4.selectsEnd, o2 = t4.selectsRange, s = setYear(Ye(), e2);
      return Be(s, n2 || o2 ? a.selectingDate() : r2);
    }), ye(we(a), "isKeyboardSelected", function(e2) {
      var t4 = Ae(setYear(a.props.date, e2));
      return !a.props.disabledKeyboardNavigation && !a.props.inline && !je(t4, Ae(a.props.selected)) && je(t4, Ae(a.props.preSelection));
    }), ye(we(a), "onYearClick", function(e2, t4) {
      var r2 = a.props.date;
      a.handleYearClick(Ae(setYear(r2, t4)), e2);
    }), ye(we(a), "onYearKeyDown", function(e2, t4) {
      var r2 = e2.key;
      if (!a.props.disabledKeyboardNavigation) switch (r2) {
        case "Enter":
          a.onYearClick(e2, t4), a.props.setPreSelection(a.props.selected);
          break;
        case "ArrowRight":
          a.handleYearNavigation(t4 + 1, addYears(a.props.preSelection, 1));
          break;
        case "ArrowLeft":
          a.handleYearNavigation(t4 - 1, subYears(a.props.preSelection, 1));
      }
    }), ye(we(a), "getYearClassNames", function(e2) {
      var t4 = a.props, n2 = t4.minDate, o2 = t4.maxDate, s = t4.selected, i = t4.excludeDates, p = t4.includeDates, c = t4.filterDate;
      return (0, import_classnames.default)("react-datepicker__year-text", { "react-datepicker__year-text--selected": e2 === getYear(s), "react-datepicker__year-text--disabled": (n2 || o2 || i || p || c) && at(e2, a.props), "react-datepicker__year-text--keyboard-selected": a.isKeyboardSelected(e2), "react-datepicker__year-text--range-start": a.isRangeStart(e2), "react-datepicker__year-text--range-end": a.isRangeEnd(e2), "react-datepicker__year-text--in-range": a.isInRange(e2), "react-datepicker__year-text--in-selecting-range": a.isInSelectingRange(e2), "react-datepicker__year-text--selecting-range-start": a.isSelectingRangeStart(e2), "react-datepicker__year-text--selecting-range-end": a.isSelectingRangeEnd(e2), "react-datepicker__year-text--today": a.isCurrentYear(e2) });
    }), ye(we(a), "getYearTabIndex", function(e2) {
      return a.props.disabledKeyboardNavigation ? "-1" : e2 === getYear(a.props.preSelection) ? "0" : "-1";
    }), ye(we(a), "getYearContainerClassNames", function() {
      var e2 = a.props, t4 = e2.selectingDate, n2 = e2.selectsStart, o2 = e2.selectsEnd, s = e2.selectsRange;
      return (0, import_classnames.default)("react-datepicker__year", { "react-datepicker__year--selecting-range": t4 && (n2 || o2 || s) });
    }), ye(we(a), "getYearContent", function(e2) {
      return a.props.renderYearContent ? a.props.renderYearContent(e2) : e2;
    }), a;
  }
  return fe(o, [{ key: "render", value: function() {
    for (var t3 = this, r2 = [], n2 = this.props, o2 = n2.date, a = n2.yearItemNumber, s = n2.onYearMouseEnter, i = n2.onYearMouseLeave, p = wt(o2, a), c = p.startPeriod, l = p.endPeriod, d = function(n3) {
      r2.push(import_react2.default.createElement("div", { ref: t3.YEAR_REFS[n3 - c], onClick: function(e2) {
        t3.onYearClick(e2, n3);
      }, onKeyDown: function(e2) {
        t3.onYearKeyDown(e2, n3);
      }, tabIndex: t3.getYearTabIndex(n3), className: t3.getYearClassNames(n3), onMouseEnter: function(e2) {
        return s(e2, n3);
      }, onMouseLeave: function(e2) {
        return i(e2, n3);
      }, key: n3, "aria-current": t3.isCurrentYear(n3) ? "date" : void 0 }, t3.getYearContent(n3)));
    }, u = c; u <= l; u++) d(u);
    return import_react2.default.createElement("div", { className: this.getYearContainerClassNames() }, import_react2.default.createElement("div", { className: "react-datepicker__year-wrapper", onMouseLeave: this.props.clearSelectingDate }, r2));
  } }]), o;
}();
var Qt = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = be(n);
  function n(t3) {
    var o;
    return he(this, n), ye(we(o = r2.call(this, t3)), "onTimeChange", function(e2) {
      o.setState({ time: e2 });
      var t4 = o.props.date, r3 = t4 instanceof Date && !isNaN(t4) ? t4 : /* @__PURE__ */ new Date();
      r3.setHours(e2.split(":")[0]), r3.setMinutes(e2.split(":")[1]), o.props.onChange(r3);
    }), ye(we(o), "renderTimeInput", function() {
      var t4 = o.state.time, r3 = o.props, n2 = r3.date, a = r3.timeString, s = r3.customTimeInput;
      return s ? import_react2.default.cloneElement(s, { date: n2, value: t4, onChange: o.onTimeChange }) : import_react2.default.createElement("input", { type: "time", className: "react-datepicker-time__input", placeholder: "Time", name: "time-input", required: true, value: t4, onChange: function(e2) {
        o.onTimeChange(e2.target.value || a);
      } });
    }), o.state = { time: o.props.timeString }, o;
  }
  return fe(n, [{ key: "render", value: function() {
    return import_react2.default.createElement("div", { className: "react-datepicker__input-time-container" }, import_react2.default.createElement("div", { className: "react-datepicker-time__caption" }, this.props.timeInputLabel), import_react2.default.createElement("div", { className: "react-datepicker-time__input-container" }, import_react2.default.createElement("div", { className: "react-datepicker-time__input" }, this.renderTimeInput())));
  } }], [{ key: "getDerivedStateFromProps", value: function(e2, t3) {
    return e2.timeString !== t3.time ? { time: e2.timeString } : null;
  } }]), n;
}();
function Ht(t2) {
  var r2 = t2.className, n = t2.children, o = t2.showPopperArrow, a = t2.arrowProps, s = void 0 === a ? {} : a;
  return import_react2.default.createElement("div", { className: r2 }, o && import_react2.default.createElement("div", ve({ className: "react-datepicker__triangle" }, s)), n);
}
var jt = ["react-datepicker__year-select", "react-datepicker__month-select", "react-datepicker__month-year-select"];
var Vt = function(t2) {
  De(o, import_react2.default.Component);
  var n = be(o);
  function o(t3) {
    var a;
    return he(this, o), ye(we(a = n.call(this, t3)), "handleClickOutside", function(e2) {
      a.props.onClickOutside(e2);
    }), ye(we(a), "setClickOutsideRef", function() {
      return a.containerRef.current;
    }), ye(we(a), "handleDropdownFocus", function(e2) {
      (function() {
        var e3 = ((arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).className || "").split(/\s+/);
        return jt.some(function(t4) {
          return e3.indexOf(t4) >= 0;
        });
      })(e2.target) && a.props.onDropdownFocus();
    }), ye(we(a), "getDateInView", function() {
      var e2 = a.props, t4 = e2.preSelection, r2 = e2.selected, n2 = e2.openToDate, o2 = ft(a.props), s = yt(a.props), i = Ye(), p = n2 || r2 || t4;
      return p || (o2 && isBefore(i, o2) ? o2 : s && isAfter(i, s) ? s : i);
    }), ye(we(a), "increaseMonth", function() {
      a.setState(function(e2) {
        var t4 = e2.date;
        return { date: addMonths(t4, 1) };
      }, function() {
        return a.handleMonthChange(a.state.date);
      });
    }), ye(we(a), "decreaseMonth", function() {
      a.setState(function(e2) {
        var t4 = e2.date;
        return { date: subMonths(t4, 1) };
      }, function() {
        return a.handleMonthChange(a.state.date);
      });
    }), ye(we(a), "handleDayClick", function(e2, t4, r2) {
      a.props.onSelect(e2, t4, r2), a.props.setPreSelection && a.props.setPreSelection(e2);
    }), ye(we(a), "handleDayMouseEnter", function(e2) {
      a.setState({ selectingDate: e2 }), a.props.onDayMouseEnter && a.props.onDayMouseEnter(e2);
    }), ye(we(a), "handleMonthMouseLeave", function() {
      a.setState({ selectingDate: null }), a.props.onMonthMouseLeave && a.props.onMonthMouseLeave();
    }), ye(we(a), "handleYearMouseEnter", function(e2, t4) {
      a.setState({ selectingDate: setYear(Ye(), t4) }), a.props.onYearMouseEnter && a.props.onYearMouseEnter(e2, t4);
    }), ye(we(a), "handleYearMouseLeave", function(e2, t4) {
      a.props.onYearMouseLeave && a.props.onYearMouseLeave(e2, t4);
    }), ye(we(a), "handleYearChange", function(e2) {
      a.props.onYearChange && (a.props.onYearChange(e2), a.setState({ isRenderAriaLiveMessage: true })), a.props.adjustDateOnChange && (a.props.onSelect && a.props.onSelect(e2), a.props.setOpen && a.props.setOpen(true)), a.props.setPreSelection && a.props.setPreSelection(e2);
    }), ye(we(a), "handleMonthChange", function(e2) {
      a.handleCustomMonthChange(e2), a.props.adjustDateOnChange && (a.props.onSelect && a.props.onSelect(e2), a.props.setOpen && a.props.setOpen(true)), a.props.setPreSelection && a.props.setPreSelection(e2);
    }), ye(we(a), "handleCustomMonthChange", function(e2) {
      a.props.onMonthChange && (a.props.onMonthChange(e2), a.setState({ isRenderAriaLiveMessage: true }));
    }), ye(we(a), "handleMonthYearChange", function(e2) {
      a.handleYearChange(e2), a.handleMonthChange(e2);
    }), ye(we(a), "changeYear", function(e2) {
      a.setState(function(t4) {
        var r2 = t4.date;
        return { date: setYear(r2, e2) };
      }, function() {
        return a.handleYearChange(a.state.date);
      });
    }), ye(we(a), "changeMonth", function(e2) {
      a.setState(function(t4) {
        var r2 = t4.date;
        return { date: setMonth(r2, e2) };
      }, function() {
        return a.handleMonthChange(a.state.date);
      });
    }), ye(we(a), "changeMonthYear", function(e2) {
      a.setState(function(t4) {
        var r2 = t4.date;
        return { date: setYear(setMonth(r2, getMonth(e2)), getYear(e2)) };
      }, function() {
        return a.handleMonthYearChange(a.state.date);
      });
    }), ye(we(a), "header", function() {
      var t4 = Le(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.state.date, a.props.locale, a.props.calendarStartDay), n2 = [];
      return a.props.showWeekNumbers && n2.push(import_react2.default.createElement("div", { key: "W", className: "react-datepicker__day-name" }, a.props.weekLabel || "#")), n2.concat([0, 1, 2, 3, 4, 5, 6].map(function(n3) {
        var o2 = addDays(t4, n3), s = a.formatWeekday(o2, a.props.locale), i = a.props.weekDayClassName ? a.props.weekDayClassName(o2) : void 0;
        return import_react2.default.createElement("div", { key: n3, className: (0, import_classnames.default)("react-datepicker__day-name", i) }, s);
      }));
    }), ye(we(a), "formatWeekday", function(e2, t4) {
      return a.props.formatWeekDay ? function(e3, t5, r2) {
        return t5(Ie(e3, "EEEE", r2));
      }(e2, a.props.formatWeekDay, t4) : a.props.useWeekdaysShort ? function(e3, t5) {
        return Ie(e3, "EEE", t5);
      }(e2, t4) : function(e3, t5) {
        return Ie(e3, "EEEEEE", t5);
      }(e2, t4);
    }), ye(we(a), "decreaseYear", function() {
      a.setState(function(e2) {
        var t4 = e2.date;
        return { date: subYears(t4, a.props.showYearPicker ? a.props.yearItemNumber : 1) };
      }, function() {
        return a.handleYearChange(a.state.date);
      });
    }), ye(we(a), "clearSelectingDate", function() {
      a.setState({ selectingDate: null });
    }), ye(we(a), "renderPreviousButton", function() {
      if (!a.props.renderCustomHeader) {
        var t4;
        switch (true) {
          case a.props.showMonthYearPicker:
            t4 = ht(a.state.date, a.props);
            break;
          case a.props.showYearPicker:
            t4 = function(e2) {
              var t5 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r3 = t5.minDate, n3 = t5.yearItemNumber, o3 = void 0 === n3 ? Ne : n3, a2 = wt(Ae(subYears(e2, o3)), o3).endPeriod, s2 = r3 && getYear(r3);
              return s2 && s2 > a2 || false;
            }(a.state.date, a.props);
            break;
          default:
            t4 = dt(a.state.date, a.props);
        }
        if ((a.props.forceShowMonthNavigation || a.props.showDisabledMonthNavigation || !t4) && !a.props.showTimeSelectOnly) {
          var r2 = ["react-datepicker__navigation", "react-datepicker__navigation--previous"], n2 = a.decreaseMonth;
          (a.props.showMonthYearPicker || a.props.showQuarterYearPicker || a.props.showYearPicker) && (n2 = a.decreaseYear), t4 && a.props.showDisabledMonthNavigation && (r2.push("react-datepicker__navigation--previous--disabled"), n2 = null);
          var o2 = a.props.showMonthYearPicker || a.props.showQuarterYearPicker || a.props.showYearPicker, s = a.props, i = s.previousMonthButtonLabel, p = s.previousYearButtonLabel, c = a.props, l = c.previousMonthAriaLabel, d = void 0 === l ? "string" == typeof i ? i : "Previous Month" : l, u = c.previousYearAriaLabel, h = void 0 === u ? "string" == typeof p ? p : "Previous Year" : u;
          return import_react2.default.createElement("button", { type: "button", className: r2.join(" "), onClick: n2, onKeyDown: a.props.handleOnKeyDown, "aria-label": o2 ? h : d }, import_react2.default.createElement("span", { className: ["react-datepicker__navigation-icon", "react-datepicker__navigation-icon--previous"].join(" ") }, o2 ? a.props.previousYearButtonLabel : a.props.previousMonthButtonLabel));
        }
      }
    }), ye(we(a), "increaseYear", function() {
      a.setState(function(e2) {
        var t4 = e2.date;
        return { date: addYears(t4, a.props.showYearPicker ? a.props.yearItemNumber : 1) };
      }, function() {
        return a.handleYearChange(a.state.date);
      });
    }), ye(we(a), "renderNextButton", function() {
      if (!a.props.renderCustomHeader) {
        var t4;
        switch (true) {
          case a.props.showMonthYearPicker:
            t4 = mt(a.state.date, a.props);
            break;
          case a.props.showYearPicker:
            t4 = function(e2) {
              var t5 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, r3 = t5.maxDate, n3 = t5.yearItemNumber, o3 = void 0 === n3 ? Ne : n3, a2 = wt(addYears(e2, o3), o3).startPeriod, s2 = r3 && getYear(r3);
              return s2 && s2 < a2 || false;
            }(a.state.date, a.props);
            break;
          default:
            t4 = ut(a.state.date, a.props);
        }
        if ((a.props.forceShowMonthNavigation || a.props.showDisabledMonthNavigation || !t4) && !a.props.showTimeSelectOnly) {
          var r2 = ["react-datepicker__navigation", "react-datepicker__navigation--next"];
          a.props.showTimeSelect && r2.push("react-datepicker__navigation--next--with-time"), a.props.todayButton && r2.push("react-datepicker__navigation--next--with-today-button");
          var n2 = a.increaseMonth;
          (a.props.showMonthYearPicker || a.props.showQuarterYearPicker || a.props.showYearPicker) && (n2 = a.increaseYear), t4 && a.props.showDisabledMonthNavigation && (r2.push("react-datepicker__navigation--next--disabled"), n2 = null);
          var o2 = a.props.showMonthYearPicker || a.props.showQuarterYearPicker || a.props.showYearPicker, s = a.props, i = s.nextMonthButtonLabel, p = s.nextYearButtonLabel, c = a.props, l = c.nextMonthAriaLabel, d = void 0 === l ? "string" == typeof i ? i : "Next Month" : l, h = c.nextYearAriaLabel, m = void 0 === h ? "string" == typeof p ? p : "Next Year" : h;
          return import_react2.default.createElement("button", { type: "button", className: r2.join(" "), onClick: n2, onKeyDown: a.props.handleOnKeyDown, "aria-label": o2 ? m : d }, import_react2.default.createElement("span", { className: ["react-datepicker__navigation-icon", "react-datepicker__navigation-icon--next"].join(" ") }, o2 ? a.props.nextYearButtonLabel : a.props.nextMonthButtonLabel));
        }
      }
    }), ye(we(a), "renderCurrentMonth", function() {
      var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a.state.date, r2 = ["react-datepicker__current-month"];
      return a.props.showYearDropdown && r2.push("react-datepicker__current-month--hasYearDropdown"), a.props.showMonthDropdown && r2.push("react-datepicker__current-month--hasMonthDropdown"), a.props.showMonthYearDropdown && r2.push("react-datepicker__current-month--hasMonthYearDropdown"), import_react2.default.createElement("div", { className: r2.join(" ") }, Ie(t4, a.props.dateFormat, a.props.locale));
    }), ye(we(a), "renderYearDropdown", function() {
      var t4 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      if (a.props.showYearDropdown && !t4) return import_react2.default.createElement(_t, { adjustDateOnChange: a.props.adjustDateOnChange, date: a.state.date, onSelect: a.props.onSelect, setOpen: a.props.setOpen, dropdownMode: a.props.dropdownMode, onChange: a.changeYear, minDate: a.props.minDate, maxDate: a.props.maxDate, year: getYear(a.state.date), scrollableYearDropdown: a.props.scrollableYearDropdown, yearDropdownItemNumber: a.props.yearDropdownItemNumber });
    }), ye(we(a), "renderMonthDropdown", function() {
      var t4 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      if (a.props.showMonthDropdown && !t4) return import_react2.default.createElement(Pt, { dropdownMode: a.props.dropdownMode, locale: a.props.locale, onChange: a.changeMonth, month: getMonth(a.state.date), useShortMonthInDropdown: a.props.useShortMonthInDropdown });
    }), ye(we(a), "renderMonthYearDropdown", function() {
      var t4 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
      if (a.props.showMonthYearDropdown && !t4) return import_react2.default.createElement(xt, { dropdownMode: a.props.dropdownMode, locale: a.props.locale, dateFormat: a.props.dateFormat, onChange: a.changeMonthYear, minDate: a.props.minDate, maxDate: a.props.maxDate, date: a.state.date, scrollableMonthYearDropdown: a.props.scrollableMonthYearDropdown });
    }), ye(we(a), "handleTodayButtonClick", function(e2) {
      a.props.onSelect(Ke(), e2), a.props.setPreSelection && a.props.setPreSelection(Ke());
    }), ye(we(a), "renderTodayButton", function() {
      if (a.props.todayButton && !a.props.showTimeSelectOnly) return import_react2.default.createElement("div", { className: "react-datepicker__today-button", onClick: function(e2) {
        return a.handleTodayButtonClick(e2);
      } }, a.props.todayButton);
    }), ye(we(a), "renderDefaultHeader", function(t4) {
      var r2 = t4.monthDate, n2 = t4.i;
      return import_react2.default.createElement("div", { className: "react-datepicker__header ".concat(a.props.showTimeSelect ? "react-datepicker__header--has-time-select" : "") }, a.renderCurrentMonth(r2), import_react2.default.createElement("div", { className: "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(a.props.dropdownMode), onFocus: a.handleDropdownFocus }, a.renderMonthDropdown(0 !== n2), a.renderMonthYearDropdown(0 !== n2), a.renderYearDropdown(0 !== n2)), import_react2.default.createElement("div", { className: "react-datepicker__day-names" }, a.header(r2)));
    }), ye(we(a), "renderCustomHeader", function() {
      var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r2 = t4.monthDate, n2 = t4.i;
      if (a.props.showTimeSelect && !a.state.monthContainer || a.props.showTimeSelectOnly) return null;
      var o2 = dt(a.state.date, a.props), s = ut(a.state.date, a.props), i = ht(a.state.date, a.props), p = mt(a.state.date, a.props), c = !a.props.showMonthYearPicker && !a.props.showQuarterYearPicker && !a.props.showYearPicker;
      return import_react2.default.createElement("div", { className: "react-datepicker__header react-datepicker__header--custom", onFocus: a.props.onDropdownFocus }, a.props.renderCustomHeader(de(de({}, a.state), {}, { customHeaderCount: n2, monthDate: r2, changeMonth: a.changeMonth, changeYear: a.changeYear, decreaseMonth: a.decreaseMonth, increaseMonth: a.increaseMonth, decreaseYear: a.decreaseYear, increaseYear: a.increaseYear, prevMonthButtonDisabled: o2, nextMonthButtonDisabled: s, prevYearButtonDisabled: i, nextYearButtonDisabled: p })), c && import_react2.default.createElement("div", { className: "react-datepicker__day-names" }, a.header(r2)));
    }), ye(we(a), "renderYearHeader", function() {
      var t4 = a.state.date, r2 = a.props, n2 = r2.showYearPicker, o2 = wt(t4, r2.yearItemNumber), s = o2.startPeriod, i = o2.endPeriod;
      return import_react2.default.createElement("div", { className: "react-datepicker__header react-datepicker-year-header" }, n2 ? "".concat(s, " - ").concat(i) : getYear(t4));
    }), ye(we(a), "renderHeader", function(e2) {
      switch (true) {
        case void 0 !== a.props.renderCustomHeader:
          return a.renderCustomHeader(e2);
        case (a.props.showMonthYearPicker || a.props.showQuarterYearPicker || a.props.showYearPicker):
          return a.renderYearHeader(e2);
        default:
          return a.renderDefaultHeader(e2);
      }
    }), ye(we(a), "renderMonths", function() {
      var t4;
      if (!a.props.showTimeSelectOnly && !a.props.showYearPicker) {
        for (var r2 = [], n2 = a.props.showPreviousMonths ? a.props.monthsShown - 1 : 0, o2 = subMonths(a.state.date, n2), s = null !== (t4 = a.props.monthSelectedIn) && void 0 !== t4 ? t4 : n2, i = 0; i < a.props.monthsShown; ++i) {
          var p = addMonths(o2, i - s + n2), c = "month-".concat(i), d = i < a.props.monthsShown - 1, u = i > 0;
          r2.push(import_react2.default.createElement("div", { key: c, ref: function(e2) {
            a.monthContainer = e2;
          }, className: "react-datepicker__month-container" }, a.renderHeader({ monthDate: p, i }), import_react2.default.createElement(Wt, { chooseDayAriaLabelPrefix: a.props.chooseDayAriaLabelPrefix, disabledDayAriaLabelPrefix: a.props.disabledDayAriaLabelPrefix, weekAriaLabelPrefix: a.props.weekAriaLabelPrefix, ariaLabelPrefix: a.props.monthAriaLabelPrefix, onChange: a.changeMonthYear, day: p, dayClassName: a.props.dayClassName, calendarStartDay: a.props.calendarStartDay, monthClassName: a.props.monthClassName, onDayClick: a.handleDayClick, handleOnKeyDown: a.props.handleOnDayKeyDown, onDayMouseEnter: a.handleDayMouseEnter, onMouseLeave: a.handleMonthMouseLeave, onWeekSelect: a.props.onWeekSelect, orderInDisplay: i, formatWeekNumber: a.props.formatWeekNumber, locale: a.props.locale, minDate: a.props.minDate, maxDate: a.props.maxDate, excludeDates: a.props.excludeDates, excludeDateIntervals: a.props.excludeDateIntervals, highlightDates: a.props.highlightDates, holidays: a.props.holidays, selectingDate: a.state.selectingDate, includeDates: a.props.includeDates, includeDateIntervals: a.props.includeDateIntervals, inline: a.props.inline, shouldFocusDayInline: a.props.shouldFocusDayInline, fixedHeight: a.props.fixedHeight, filterDate: a.props.filterDate, preSelection: a.props.preSelection, setPreSelection: a.props.setPreSelection, selected: a.props.selected, selectsStart: a.props.selectsStart, selectsEnd: a.props.selectsEnd, selectsRange: a.props.selectsRange, selectsDisabledDaysInRange: a.props.selectsDisabledDaysInRange, showWeekNumbers: a.props.showWeekNumbers, startDate: a.props.startDate, endDate: a.props.endDate, peekNextMonth: a.props.peekNextMonth, setOpen: a.props.setOpen, shouldCloseOnSelect: a.props.shouldCloseOnSelect, renderDayContents: a.props.renderDayContents, renderMonthContent: a.props.renderMonthContent, renderQuarterContent: a.props.renderQuarterContent, renderYearContent: a.props.renderYearContent, disabledKeyboardNavigation: a.props.disabledKeyboardNavigation, showMonthYearPicker: a.props.showMonthYearPicker, showFullMonthYearPicker: a.props.showFullMonthYearPicker, showTwoColumnMonthYearPicker: a.props.showTwoColumnMonthYearPicker, showFourColumnMonthYearPicker: a.props.showFourColumnMonthYearPicker, showYearPicker: a.props.showYearPicker, showQuarterYearPicker: a.props.showQuarterYearPicker, showWeekPicker: a.props.showWeekPicker, isInputFocused: a.props.isInputFocused, containerRef: a.containerRef, monthShowsDuplicateDaysEnd: d, monthShowsDuplicateDaysStart: u })));
        }
        return r2;
      }
    }), ye(we(a), "renderYears", function() {
      if (!a.props.showTimeSelectOnly) return a.props.showYearPicker ? import_react2.default.createElement("div", { className: "react-datepicker__year--container" }, a.renderHeader(), import_react2.default.createElement(Bt, ve({ onDayClick: a.handleDayClick, selectingDate: a.state.selectingDate, clearSelectingDate: a.clearSelectingDate, date: a.state.date }, a.props, { onYearMouseEnter: a.handleYearMouseEnter, onYearMouseLeave: a.handleYearMouseLeave }))) : void 0;
    }), ye(we(a), "renderTimeSection", function() {
      if (a.props.showTimeSelect && (a.state.monthContainer || a.props.showTimeSelectOnly)) return import_react2.default.createElement(Kt, { selected: a.props.selected, openToDate: a.props.openToDate, onChange: a.props.onTimeChange, timeClassName: a.props.timeClassName, format: a.props.timeFormat, includeTimes: a.props.includeTimes, intervals: a.props.timeIntervals, minTime: a.props.minTime, maxTime: a.props.maxTime, excludeTimes: a.props.excludeTimes, filterTime: a.props.filterTime, timeCaption: a.props.timeCaption, todayButton: a.props.todayButton, showMonthDropdown: a.props.showMonthDropdown, showMonthYearDropdown: a.props.showMonthYearDropdown, showYearDropdown: a.props.showYearDropdown, withPortal: a.props.withPortal, monthRef: a.state.monthContainer, injectTimes: a.props.injectTimes, locale: a.props.locale, handleOnKeyDown: a.props.handleOnKeyDown, showTimeSelectOnly: a.props.showTimeSelectOnly });
    }), ye(we(a), "renderInputTimeSection", function() {
      var t4 = new Date(a.props.selected), r2 = Te(t4) && Boolean(a.props.selected) ? "".concat(kt(t4.getHours()), ":").concat(kt(t4.getMinutes())) : "";
      if (a.props.showTimeInput) return import_react2.default.createElement(Qt, { date: t4, timeString: r2, timeInputLabel: a.props.timeInputLabel, onChange: a.props.onTimeChange, customTimeInput: a.props.customTimeInput });
    }), ye(we(a), "renderAriaLiveRegion", function() {
      var t4, r2 = wt(a.state.date, a.props.yearItemNumber), n2 = r2.startPeriod, o2 = r2.endPeriod;
      return t4 = a.props.showYearPicker ? "".concat(n2, " - ").concat(o2) : a.props.showMonthYearPicker || a.props.showQuarterYearPicker ? getYear(a.state.date) : "".concat(Je(getMonth(a.state.date), a.props.locale), " ").concat(getYear(a.state.date)), import_react2.default.createElement("span", { role: "alert", "aria-live": "polite", className: "react-datepicker__aria-live" }, a.state.isRenderAriaLiveMessage && t4);
    }), ye(we(a), "renderChildren", function() {
      if (a.props.children) return import_react2.default.createElement("div", { className: "react-datepicker__children-container" }, a.props.children);
    }), a.containerRef = import_react2.default.createRef(), a.state = { date: a.getDateInView(), selectingDate: null, monthContainer: null, isRenderAriaLiveMessage: false }, a;
  }
  return fe(o, [{ key: "componentDidMount", value: function() {
    var e2 = this;
    this.props.showTimeSelect && (this.assignMonthContainer = void e2.setState({ monthContainer: e2.monthContainer }));
  } }, { key: "componentDidUpdate", value: function(e2) {
    var t3 = this;
    if (!this.props.preSelection || je(this.props.preSelection, e2.preSelection) && this.props.monthSelectedIn === e2.monthSelectedIn) this.props.openToDate && !je(this.props.openToDate, e2.openToDate) && this.setState({ date: this.props.openToDate });
    else {
      var r2 = !Qe(this.state.date, this.props.preSelection);
      this.setState({ date: this.props.preSelection }, function() {
        return r2 && t3.handleCustomMonthChange(t3.state.date);
      });
    }
  } }, { key: "render", value: function() {
    var t3 = this.props.container || Ht;
    return import_react2.default.createElement("div", { style: { display: "contents" }, ref: this.containerRef }, import_react2.default.createElement(t3, { className: (0, import_classnames.default)("react-datepicker", this.props.className, { "react-datepicker--time-only": this.props.showTimeSelectOnly }), showPopperArrow: this.props.showPopperArrow, arrowProps: this.props.arrowProps }, this.renderAriaLiveRegion(), this.renderPreviousButton(), this.renderNextButton(), this.renderMonths(), this.renderYears(), this.renderTodayButton(), this.renderTimeSection(), this.renderInputTimeSection(), this.renderChildren()));
  } }], [{ key: "defaultProps", get: function() {
    return { onDropdownFocus: function() {
    }, monthsShown: 1, forceShowMonthNavigation: false, timeCaption: "Time", previousYearButtonLabel: "Previous Year", nextYearButtonLabel: "Next Year", previousMonthButtonLabel: "Previous Month", nextMonthButtonLabel: "Next Month", customTimeInput: null, yearItemNumber: Ne };
  } }]), o;
}();
var qt = function(t2) {
  var r2 = t2.icon, n = t2.className, o = void 0 === n ? "" : n, a = t2.onClick, s = "react-datepicker__calendar-icon";
  return import_react2.default.isValidElement(r2) ? import_react2.default.cloneElement(r2, { className: "".concat(r2.props.className || "", " ").concat(s, " ").concat(o), onClick: function(e2) {
    "function" == typeof r2.props.onClick && r2.props.onClick(e2), "function" == typeof a && a(e2);
  } }) : "string" == typeof r2 ? import_react2.default.createElement("i", { className: "".concat(s, " ").concat(r2, " ").concat(o), "aria-hidden": "true", onClick: a }) : import_react2.default.createElement("svg", { className: "".concat(s, " ").concat(o), xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", onClick: a }, import_react2.default.createElement("path", { d: "M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" }));
};
var Ut = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = be(n);
  function n(e2) {
    var t3;
    return he(this, n), (t3 = r2.call(this, e2)).el = document.createElement("div"), t3;
  }
  return fe(n, [{ key: "componentDidMount", value: function() {
    this.portalRoot = (this.props.portalHost || document).getElementById(this.props.portalId), this.portalRoot || (this.portalRoot = document.createElement("div"), this.portalRoot.setAttribute("id", this.props.portalId), (this.props.portalHost || document.body).appendChild(this.portalRoot)), this.portalRoot.appendChild(this.el);
  } }, { key: "componentWillUnmount", value: function() {
    this.portalRoot.removeChild(this.el);
  } }, { key: "render", value: function() {
    return import_react_dom2.default.createPortal(this.props.children, this.el);
  } }]), n;
}();
var zt = function(e2) {
  return !e2.disabled && -1 !== e2.tabIndex;
};
var $t = function(t2) {
  De(n, import_react2.default.Component);
  var r2 = be(n);
  function n(t3) {
    var o;
    return he(this, n), ye(we(o = r2.call(this, t3)), "getTabChildren", function() {
      return Array.prototype.slice.call(o.tabLoopRef.current.querySelectorAll("[tabindex], a, button, input, select, textarea"), 1, -1).filter(zt);
    }), ye(we(o), "handleFocusStart", function() {
      var e2 = o.getTabChildren();
      e2 && e2.length > 1 && e2[e2.length - 1].focus();
    }), ye(we(o), "handleFocusEnd", function() {
      var e2 = o.getTabChildren();
      e2 && e2.length > 1 && e2[0].focus();
    }), o.tabLoopRef = import_react2.default.createRef(), o;
  }
  return fe(n, [{ key: "render", value: function() {
    return this.props.enableTabLoop ? import_react2.default.createElement("div", { className: "react-datepicker__tab-loop", ref: this.tabLoopRef }, import_react2.default.createElement("div", { className: "react-datepicker__tab-loop__start", tabIndex: "0", onFocus: this.handleFocusStart }), this.props.children, import_react2.default.createElement("div", { className: "react-datepicker__tab-loop__end", tabIndex: "0", onFocus: this.handleFocusEnd })) : this.props.children;
  } }], [{ key: "defaultProps", get: function() {
    return { enableTabLoop: true };
  } }]), n;
}();
var Gt = function(t2) {
  De(o, import_react2.default.Component);
  var n = be(o);
  function o() {
    return he(this, o), n.apply(this, arguments);
  }
  return fe(o, [{ key: "render", value: function() {
    var t3, n2 = this.props, o2 = n2.className, a = n2.wrapperClassName, s = n2.hidePopper, i = n2.popperComponent, p = n2.popperModifiers, c = n2.popperPlacement, l = n2.popperProps, d = n2.targetComponent, u = n2.enableTabLoop, h = n2.popperOnKeyDown, m = n2.portalId, f = n2.portalHost;
    if (!s) {
      var y = (0, import_classnames.default)("react-datepicker-popper", o2);
      t3 = import_react2.default.createElement(Popper, ve({ modifiers: p, placement: c }, l), function(t4) {
        var r2 = t4.ref, n3 = t4.style, o3 = t4.placement, a2 = t4.arrowProps;
        return import_react2.default.createElement($t, { enableTabLoop: u }, import_react2.default.createElement("div", { ref: r2, style: n3, className: y, "data-placement": o3, onKeyDown: h }, import_react2.default.cloneElement(i, { arrowProps: a2 })));
      });
    }
    this.props.popperContainer && (t3 = import_react2.default.createElement(this.props.popperContainer, {}, t3)), m && !s && (t3 = import_react2.default.createElement(Ut, { portalId: m, portalHost: f }, t3));
    var v = (0, import_classnames.default)("react-datepicker-wrapper", a);
    return import_react2.default.createElement(Manager, { className: "react-datepicker-manager" }, import_react2.default.createElement(Reference, null, function(t4) {
      var r2 = t4.ref;
      return import_react2.default.createElement("div", { ref: r2, className: v }, d);
    }), t3);
  } }], [{ key: "defaultProps", get: function() {
    return { hidePopper: true, popperModifiers: [], popperProps: {}, popperPlacement: "bottom-start" };
  } }]), o;
}();
var Jt = "react-datepicker-ignore-onclickoutside";
var Xt = react_onclickoutside_es_default(Vt);
var Zt = "Date input not valid.";
var er = function(t2) {
  De(s, import_react2.default.Component);
  var a = be(s);
  function s(t3) {
    var i;
    return he(this, s), ye(we(i = a.call(this, t3)), "getPreSelection", function() {
      return i.props.openToDate ? i.props.openToDate : i.props.selectsEnd && i.props.startDate ? i.props.startDate : i.props.selectsStart && i.props.endDate ? i.props.endDate : Ye();
    }), ye(we(i), "modifyHolidays", function() {
      var e2;
      return null === (e2 = i.props.holidays) || void 0 === e2 ? void 0 : e2.reduce(function(e3, t4) {
        var r2 = new Date(t4.date);
        return isValid(r2) ? [].concat(Se(e3), [de(de({}, t4), {}, { date: r2 })]) : e3;
      }, []);
    }), ye(we(i), "calcInitialState", function() {
      var e2, t4 = i.getPreSelection(), r2 = ft(i.props), n = yt(i.props), o = r2 && isBefore(t4, startOfDay(r2)) ? r2 : n && isAfter(t4, endOfDay(n)) ? n : t4;
      return { open: i.props.startOpen || false, preventFocus: false, preSelection: null !== (e2 = i.props.selectsRange ? i.props.startDate : i.props.selected) && void 0 !== e2 ? e2 : o, highlightDates: vt(i.props.highlightDates), focused: false, shouldFocusDayInline: false, isRenderAriaLiveMessage: false };
    }), ye(we(i), "clearPreventFocusTimeout", function() {
      i.preventFocusTimeout && clearTimeout(i.preventFocusTimeout);
    }), ye(we(i), "setFocus", function() {
      i.input && i.input.focus && i.input.focus({ preventScroll: true });
    }), ye(we(i), "setBlur", function() {
      i.input && i.input.blur && i.input.blur(), i.cancelFocusInput();
    }), ye(we(i), "setOpen", function(e2) {
      var t4 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      i.setState({ open: e2, preSelection: e2 && i.state.open ? i.state.preSelection : i.calcInitialState().preSelection, lastPreSelectChange: rr }, function() {
        e2 || i.setState(function(e3) {
          return { focused: !!t4 && e3.focused };
        }, function() {
          !t4 && i.setBlur(), i.setState({ inputValue: null });
        });
      });
    }), ye(we(i), "inputOk", function() {
      return isDate(i.state.preSelection);
    }), ye(we(i), "isCalendarOpen", function() {
      return void 0 === i.props.open ? i.state.open && !i.props.disabled && !i.props.readOnly : i.props.open;
    }), ye(we(i), "handleFocus", function(e2) {
      i.state.preventFocus || (i.props.onFocus(e2), i.props.preventOpenOnFocus || i.props.readOnly || i.setOpen(true)), i.setState({ focused: true });
    }), ye(we(i), "sendFocusBackToInput", function() {
      i.preventFocusTimeout && i.clearPreventFocusTimeout(), i.setState({ preventFocus: true }, function() {
        i.preventFocusTimeout = setTimeout(function() {
          i.setFocus(), i.setState({ preventFocus: false });
        });
      });
    }), ye(we(i), "cancelFocusInput", function() {
      clearTimeout(i.inputFocusTimeout), i.inputFocusTimeout = null;
    }), ye(we(i), "deferFocusInput", function() {
      i.cancelFocusInput(), i.inputFocusTimeout = setTimeout(function() {
        return i.setFocus();
      }, 1);
    }), ye(we(i), "handleDropdownFocus", function() {
      i.cancelFocusInput();
    }), ye(we(i), "handleBlur", function(e2) {
      (!i.state.open || i.props.withPortal || i.props.showTimeInput) && i.props.onBlur(e2), i.setState({ focused: false });
    }), ye(we(i), "handleCalendarClickOutside", function(e2) {
      i.props.inline || i.setOpen(false), i.props.onClickOutside(e2), i.props.withPortal && e2.preventDefault();
    }), ye(we(i), "handleChange", function() {
      for (var e2 = arguments.length, t4 = new Array(e2), r2 = 0; r2 < e2; r2++) t4[r2] = arguments[r2];
      var n = t4[0];
      if (!i.props.onChangeRaw || (i.props.onChangeRaw.apply(we(i), t4), "function" == typeof n.isDefaultPrevented && !n.isDefaultPrevented())) {
        i.setState({ inputValue: n.target.value, lastPreSelectChange: tr });
        var o, a2, s2, p, c, l, d, u, h = (o = n.target.value, a2 = i.props.dateFormat, s2 = i.props.locale, p = i.props.strictParsing, c = i.props.minDate, l = null, d = Ge(s2) || Ge($e()), u = true, Array.isArray(a2) ? (a2.forEach(function(e3) {
          var t5 = parse(o, e3, /* @__PURE__ */ new Date(), { locale: d });
          p && (u = Te(t5, c) && o === Ie(t5, e3, s2)), Te(t5, c) && u && (l = t5);
        }), l) : (l = parse(o, a2, /* @__PURE__ */ new Date(), { locale: d }), p ? u = Te(l) && o === Ie(l, a2, s2) : Te(l) || (a2 = a2.match(xe).map(function(e3) {
          var t5 = e3[0];
          return "p" === t5 || "P" === t5 ? d ? (0, Ee[t5])(e3, d.formatLong) : t5 : e3;
        }).join(""), o.length > 0 && (l = parse(o, a2.slice(0, o.length), /* @__PURE__ */ new Date())), Te(l) || (l = new Date(o))), Te(l) && u ? l : null));
        i.props.showTimeSelectOnly && i.props.selected && h && !je(h, i.props.selected) && (h = set(i.props.selected, { hours: getHours(h), minutes: getMinutes(h), seconds: getSeconds(h) })), !h && n.target.value || (i.props.showWeekPicker && (h = Le(h, i.props.locale, i.props.calendarStartDay)), i.setSelected(h, n, true));
      }
    }), ye(we(i), "handleSelect", function(e2, t4, r2) {
      if (i.props.shouldCloseOnSelect && !i.props.showTimeSelect && i.sendFocusBackToInput(), i.props.onChangeRaw && i.props.onChangeRaw(t4), i.props.showWeekPicker && (e2 = Le(e2, i.props.locale, i.props.calendarStartDay)), i.setSelected(e2, t4, false, r2), i.props.showDateSelect && i.setState({ isRenderAriaLiveMessage: true }), !i.props.shouldCloseOnSelect || i.props.showTimeSelect) i.setPreSelection(e2);
      else if (!i.props.inline) {
        i.props.selectsRange || i.setOpen(false);
        var n = i.props, o = n.startDate, a2 = n.endDate;
        !o || a2 || isBefore(e2, o) || i.setOpen(false);
      }
    }), ye(we(i), "setSelected", function(e2, t4, r2, n) {
      var o = e2;
      if (i.props.showYearPicker) {
        if (null !== o && at(getYear(o), i.props)) return;
      } else if (i.props.showMonthYearPicker) {
        if (null !== o && tt(o, i.props)) return;
      } else if (null !== o && Ze(o, i.props)) return;
      var a2 = i.props, s2 = a2.onChange, p = a2.selectsRange, c = a2.startDate, l = a2.endDate;
      if (!Ve(i.props.selected, o) || i.props.allowSameDay || p) if (null !== o && (!i.props.selected || r2 && (i.props.showTimeSelect || i.props.showTimeSelectOnly || i.props.showTimeInput) || (o = Re(o, { hour: getHours(i.props.selected), minute: getMinutes(i.props.selected), second: getSeconds(i.props.selected) })), i.props.inline || i.setState({ preSelection: o }), i.props.focusSelectedMonth || i.setState({ monthSelectedIn: n })), p) {
        var d = c && !l, u = c && l;
        !c && !l ? s2([o, null], t4) : d && (isBefore(o, c) ? s2([o, null], t4) : s2([c, o], t4)), u && s2([o, null], t4);
      } else s2(o, t4);
      r2 || (i.props.onSelect(o, t4), i.setState({ inputValue: null }));
    }), ye(we(i), "setPreSelection", function(e2) {
      var t4 = void 0 !== i.props.minDate, r2 = void 0 !== i.props.maxDate, n = true;
      if (e2) {
        i.props.showWeekPicker && (e2 = Le(e2, i.props.locale, i.props.calendarStartDay));
        var o = startOfDay(e2);
        if (t4 && r2) n = qe(e2, i.props.minDate, i.props.maxDate);
        else if (t4) {
          var a2 = startOfDay(i.props.minDate);
          n = isAfter(e2, a2) || Ve(o, a2);
        } else if (r2) {
          var s2 = endOfDay(i.props.maxDate);
          n = isBefore(e2, s2) || Ve(o, s2);
        }
      }
      n && i.setState({ preSelection: e2 });
    }), ye(we(i), "toggleCalendar", function() {
      i.setOpen(!i.state.open);
    }), ye(we(i), "handleTimeChange", function(e2) {
      var t4 = i.props.selected ? i.props.selected : i.getPreSelection(), r2 = i.props.selected ? e2 : Re(t4, { hour: getHours(e2), minute: getMinutes(e2) });
      i.setState({ preSelection: r2 }), i.props.onChange(r2), i.props.shouldCloseOnSelect && (i.sendFocusBackToInput(), i.setOpen(false)), i.props.showTimeInput && i.setOpen(true), (i.props.showTimeSelectOnly || i.props.showTimeSelect) && i.setState({ isRenderAriaLiveMessage: true }), i.setState({ inputValue: null });
    }), ye(we(i), "onInputClick", function() {
      i.props.disabled || i.props.readOnly || i.setOpen(true), i.props.onInputClick();
    }), ye(we(i), "onInputKeyDown", function(e2) {
      i.props.onKeyDown(e2);
      var t4 = e2.key;
      if (i.state.open || i.props.inline || i.props.preventOpenOnFocus) {
        if (i.state.open) {
          if ("ArrowDown" === t4 || "ArrowUp" === t4) {
            e2.preventDefault();
            var r2 = i.props.showWeekPicker && i.props.showWeekNumbers ? '.react-datepicker__week-number[tabindex="0"]' : '.react-datepicker__day[tabindex="0"]', n = i.calendar.componentNode && i.calendar.componentNode.querySelector(r2);
            return void (n && n.focus({ preventScroll: true }));
          }
          var o = Ye(i.state.preSelection);
          "Enter" === t4 ? (e2.preventDefault(), i.inputOk() && i.state.lastPreSelectChange === rr ? (i.handleSelect(o, e2), !i.props.shouldCloseOnSelect && i.setPreSelection(o)) : i.setOpen(false)) : "Escape" === t4 ? (e2.preventDefault(), i.sendFocusBackToInput(), i.setOpen(false)) : "Tab" === t4 && i.setOpen(false), i.inputOk() || i.props.onInputError({ code: 1, msg: Zt });
        }
      } else "ArrowDown" !== t4 && "ArrowUp" !== t4 && "Enter" !== t4 || i.onInputClick();
    }), ye(we(i), "onPortalKeyDown", function(e2) {
      "Escape" === e2.key && (e2.preventDefault(), i.setState({ preventFocus: true }, function() {
        i.setOpen(false), setTimeout(function() {
          i.setFocus(), i.setState({ preventFocus: false });
        });
      }));
    }), ye(we(i), "onDayKeyDown", function(e2) {
      i.props.onKeyDown(e2);
      var t4 = e2.key, r2 = Ye(i.state.preSelection);
      if ("Enter" === t4) e2.preventDefault(), i.handleSelect(r2, e2), !i.props.shouldCloseOnSelect && i.setPreSelection(r2);
      else if ("Escape" === t4) e2.preventDefault(), i.setOpen(false), i.inputOk() || i.props.onInputError({ code: 1, msg: Zt });
      else if (!i.props.disabledKeyboardNavigation) {
        var n;
        switch (t4) {
          case "ArrowLeft":
            n = i.props.showWeekPicker ? subWeeks(r2, 1) : subDays(r2, 1);
            break;
          case "ArrowRight":
            n = i.props.showWeekPicker ? addWeeks(r2, 1) : addDays(r2, 1);
            break;
          case "ArrowUp":
            n = subWeeks(r2, 1);
            break;
          case "ArrowDown":
            n = addWeeks(r2, 1);
            break;
          case "PageUp":
            n = subMonths(r2, 1);
            break;
          case "PageDown":
            n = addMonths(r2, 1);
            break;
          case "Home":
            n = subYears(r2, 1);
            break;
          case "End":
            n = addYears(r2, 1);
            break;
          default:
            n = null;
        }
        if (!n) return void (i.props.onInputError && i.props.onInputError({ code: 1, msg: Zt }));
        if (e2.preventDefault(), i.setState({ lastPreSelectChange: rr }), i.props.adjustDateOnChange && i.setSelected(n), i.setPreSelection(n), i.props.inline) {
          var o = getMonth(r2), a2 = getMonth(n), s2 = getYear(r2), d = getYear(n);
          o !== a2 || s2 !== d ? i.setState({ shouldFocusDayInline: true }) : i.setState({ shouldFocusDayInline: false });
        }
      }
    }), ye(we(i), "onPopperKeyDown", function(e2) {
      "Escape" === e2.key && (e2.preventDefault(), i.sendFocusBackToInput());
    }), ye(we(i), "onClearClick", function(e2) {
      e2 && e2.preventDefault && e2.preventDefault(), i.sendFocusBackToInput(), i.props.selectsRange ? i.props.onChange([null, null], e2) : i.props.onChange(null, e2), i.setState({ inputValue: null });
    }), ye(we(i), "clear", function() {
      i.onClearClick();
    }), ye(we(i), "onScroll", function(e2) {
      "boolean" == typeof i.props.closeOnScroll && i.props.closeOnScroll ? e2.target !== document && e2.target !== document.documentElement && e2.target !== document.body || i.setOpen(false) : "function" == typeof i.props.closeOnScroll && i.props.closeOnScroll(e2) && i.setOpen(false);
    }), ye(we(i), "renderCalendar", function() {
      return i.props.inline || i.isCalendarOpen() ? import_react2.default.createElement(Xt, { ref: function(e2) {
        i.calendar = e2;
      }, locale: i.props.locale, calendarStartDay: i.props.calendarStartDay, chooseDayAriaLabelPrefix: i.props.chooseDayAriaLabelPrefix, disabledDayAriaLabelPrefix: i.props.disabledDayAriaLabelPrefix, weekAriaLabelPrefix: i.props.weekAriaLabelPrefix, monthAriaLabelPrefix: i.props.monthAriaLabelPrefix, adjustDateOnChange: i.props.adjustDateOnChange, setOpen: i.setOpen, shouldCloseOnSelect: i.props.shouldCloseOnSelect, dateFormat: i.props.dateFormatCalendar, useWeekdaysShort: i.props.useWeekdaysShort, formatWeekDay: i.props.formatWeekDay, dropdownMode: i.props.dropdownMode, selected: i.props.selected, preSelection: i.state.preSelection, onSelect: i.handleSelect, onWeekSelect: i.props.onWeekSelect, openToDate: i.props.openToDate, minDate: i.props.minDate, maxDate: i.props.maxDate, selectsStart: i.props.selectsStart, selectsEnd: i.props.selectsEnd, selectsRange: i.props.selectsRange, startDate: i.props.startDate, endDate: i.props.endDate, excludeDates: i.props.excludeDates, excludeDateIntervals: i.props.excludeDateIntervals, filterDate: i.props.filterDate, onClickOutside: i.handleCalendarClickOutside, formatWeekNumber: i.props.formatWeekNumber, highlightDates: i.state.highlightDates, holidays: Dt(i.modifyHolidays()), includeDates: i.props.includeDates, includeDateIntervals: i.props.includeDateIntervals, includeTimes: i.props.includeTimes, injectTimes: i.props.injectTimes, inline: i.props.inline, shouldFocusDayInline: i.state.shouldFocusDayInline, peekNextMonth: i.props.peekNextMonth, showMonthDropdown: i.props.showMonthDropdown, showPreviousMonths: i.props.showPreviousMonths, useShortMonthInDropdown: i.props.useShortMonthInDropdown, showMonthYearDropdown: i.props.showMonthYearDropdown, showWeekNumbers: i.props.showWeekNumbers, showYearDropdown: i.props.showYearDropdown, withPortal: i.props.withPortal, forceShowMonthNavigation: i.props.forceShowMonthNavigation, showDisabledMonthNavigation: i.props.showDisabledMonthNavigation, scrollableYearDropdown: i.props.scrollableYearDropdown, scrollableMonthYearDropdown: i.props.scrollableMonthYearDropdown, todayButton: i.props.todayButton, weekLabel: i.props.weekLabel, outsideClickIgnoreClass: Jt, fixedHeight: i.props.fixedHeight, monthsShown: i.props.monthsShown, monthSelectedIn: i.state.monthSelectedIn, onDropdownFocus: i.handleDropdownFocus, onMonthChange: i.props.onMonthChange, onYearChange: i.props.onYearChange, dayClassName: i.props.dayClassName, weekDayClassName: i.props.weekDayClassName, monthClassName: i.props.monthClassName, timeClassName: i.props.timeClassName, showDateSelect: i.props.showDateSelect, showTimeSelect: i.props.showTimeSelect, showTimeSelectOnly: i.props.showTimeSelectOnly, onTimeChange: i.handleTimeChange, timeFormat: i.props.timeFormat, timeIntervals: i.props.timeIntervals, minTime: i.props.minTime, maxTime: i.props.maxTime, excludeTimes: i.props.excludeTimes, filterTime: i.props.filterTime, timeCaption: i.props.timeCaption, className: i.props.calendarClassName, container: i.props.calendarContainer, yearItemNumber: i.props.yearItemNumber, yearDropdownItemNumber: i.props.yearDropdownItemNumber, previousMonthAriaLabel: i.props.previousMonthAriaLabel, previousMonthButtonLabel: i.props.previousMonthButtonLabel, nextMonthAriaLabel: i.props.nextMonthAriaLabel, nextMonthButtonLabel: i.props.nextMonthButtonLabel, previousYearAriaLabel: i.props.previousYearAriaLabel, previousYearButtonLabel: i.props.previousYearButtonLabel, nextYearAriaLabel: i.props.nextYearAriaLabel, nextYearButtonLabel: i.props.nextYearButtonLabel, timeInputLabel: i.props.timeInputLabel, disabledKeyboardNavigation: i.props.disabledKeyboardNavigation, renderCustomHeader: i.props.renderCustomHeader, popperProps: i.props.popperProps, renderDayContents: i.props.renderDayContents, renderMonthContent: i.props.renderMonthContent, renderQuarterContent: i.props.renderQuarterContent, renderYearContent: i.props.renderYearContent, onDayMouseEnter: i.props.onDayMouseEnter, onMonthMouseLeave: i.props.onMonthMouseLeave, onYearMouseEnter: i.props.onYearMouseEnter, onYearMouseLeave: i.props.onYearMouseLeave, selectsDisabledDaysInRange: i.props.selectsDisabledDaysInRange, showTimeInput: i.props.showTimeInput, showMonthYearPicker: i.props.showMonthYearPicker, showFullMonthYearPicker: i.props.showFullMonthYearPicker, showTwoColumnMonthYearPicker: i.props.showTwoColumnMonthYearPicker, showFourColumnMonthYearPicker: i.props.showFourColumnMonthYearPicker, showYearPicker: i.props.showYearPicker, showQuarterYearPicker: i.props.showQuarterYearPicker, showWeekPicker: i.props.showWeekPicker, showPopperArrow: i.props.showPopperArrow, excludeScrollbar: i.props.excludeScrollbar, handleOnKeyDown: i.props.onKeyDown, handleOnDayKeyDown: i.onDayKeyDown, isInputFocused: i.state.focused, customTimeInput: i.props.customTimeInput, setPreSelection: i.setPreSelection }, i.props.children) : null;
    }), ye(we(i), "renderAriaLiveRegion", function() {
      var t4, r2 = i.props, n = r2.dateFormat, o = r2.locale, a2 = i.props.showTimeInput || i.props.showTimeSelect ? "PPPPp" : "PPPP";
      return t4 = i.props.selectsRange ? "Selected start date: ".concat(Oe(i.props.startDate, { dateFormat: a2, locale: o }), ". ").concat(i.props.endDate ? "End date: " + Oe(i.props.endDate, { dateFormat: a2, locale: o }) : "") : i.props.showTimeSelectOnly ? "Selected time: ".concat(Oe(i.props.selected, { dateFormat: n, locale: o })) : i.props.showYearPicker ? "Selected year: ".concat(Oe(i.props.selected, { dateFormat: "yyyy", locale: o })) : i.props.showMonthYearPicker ? "Selected month: ".concat(Oe(i.props.selected, { dateFormat: "MMMM yyyy", locale: o })) : i.props.showQuarterYearPicker ? "Selected quarter: ".concat(Oe(i.props.selected, { dateFormat: "yyyy, QQQ", locale: o })) : "Selected date: ".concat(Oe(i.props.selected, { dateFormat: a2, locale: o })), import_react2.default.createElement("span", { role: "alert", "aria-live": "polite", className: "react-datepicker__aria-live" }, t4);
    }), ye(we(i), "renderDateInput", function() {
      var t4, n = (0, import_classnames.default)(i.props.className, ye({}, Jt, i.state.open)), o = i.props.customInput || import_react2.default.createElement("input", { type: "text" }), a2 = i.props.customInputRef || "ref", s2 = "string" == typeof i.props.value ? i.props.value : "string" == typeof i.state.inputValue ? i.state.inputValue : i.props.selectsRange ? function(e2, t5, r2) {
        if (!e2) return "";
        var n2 = Oe(e2, r2), o2 = t5 ? Oe(t5, r2) : "";
        return "".concat(n2, " - ").concat(o2);
      }(i.props.startDate, i.props.endDate, i.props) : Oe(i.props.selected, i.props);
      return import_react2.default.cloneElement(o, (ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(t4 = {}, a2, function(e2) {
        i.input = e2;
      }), "value", s2), "onBlur", i.handleBlur), "onChange", i.handleChange), "onClick", i.onInputClick), "onFocus", i.handleFocus), "onKeyDown", i.onInputKeyDown), "id", i.props.id), "name", i.props.name), "form", i.props.form), ye(ye(ye(ye(ye(ye(ye(ye(ye(ye(t4, "autoFocus", i.props.autoFocus), "placeholder", i.props.placeholderText), "disabled", i.props.disabled), "autoComplete", i.props.autoComplete), "className", (0, import_classnames.default)(o.props.className, n)), "title", i.props.title), "readOnly", i.props.readOnly), "required", i.props.required), "tabIndex", i.props.tabIndex), "aria-describedby", i.props.ariaDescribedBy), ye(ye(ye(t4, "aria-invalid", i.props.ariaInvalid), "aria-labelledby", i.props.ariaLabelledBy), "aria-required", i.props.ariaRequired)));
    }), ye(we(i), "renderClearButton", function() {
      var t4 = i.props, n = t4.isClearable, o = t4.disabled, a2 = t4.selected, s2 = t4.startDate, p = t4.endDate, c = t4.clearButtonTitle, l = t4.clearButtonClassName, d = void 0 === l ? "" : l, u = t4.ariaLabelClose, h = void 0 === u ? "Close" : u;
      return !n || null == a2 && null == s2 && null == p ? null : import_react2.default.createElement("button", { type: "button", className: (0, import_classnames.default)("react-datepicker__close-icon", d, { "react-datepicker__close-icon--disabled": o }), disabled: o, "aria-label": h, onClick: i.onClearClick, title: c, tabIndex: -1 });
    }), i.state = i.calcInitialState(), i.preventFocusTimeout = null, i;
  }
  return fe(s, [{ key: "componentDidMount", value: function() {
    window.addEventListener("scroll", this.onScroll, true);
  } }, { key: "componentDidUpdate", value: function(e2, t3) {
    var r2, n;
    e2.inline && (r2 = e2.selected, n = this.props.selected, r2 && n ? getMonth(r2) !== getMonth(n) || getYear(r2) !== getYear(n) : r2 !== n) && this.setPreSelection(this.props.selected), void 0 !== this.state.monthSelectedIn && e2.monthsShown !== this.props.monthsShown && this.setState({ monthSelectedIn: 0 }), e2.highlightDates !== this.props.highlightDates && this.setState({ highlightDates: vt(this.props.highlightDates) }), t3.focused || Ve(e2.selected, this.props.selected) || this.setState({ inputValue: null }), t3.open !== this.state.open && (false === t3.open && true === this.state.open && this.props.onCalendarOpen(), true === t3.open && false === this.state.open && this.props.onCalendarClose());
  } }, { key: "componentWillUnmount", value: function() {
    this.clearPreventFocusTimeout(), window.removeEventListener("scroll", this.onScroll, true);
  } }, { key: "renderInputContainer", value: function() {
    var t3 = this.props, r2 = t3.showIcon, n = t3.icon, o = t3.calendarIconClassname, a2 = t3.toggleCalendarOnIconClick, s2 = this.state.open;
    return import_react2.default.createElement("div", { className: "react-datepicker__input-container".concat(r2 ? " react-datepicker__view-calendar-icon" : "") }, r2 && import_react2.default.createElement(qt, ve({ icon: n, className: "".concat(o, " ").concat(s2 && "react-datepicker-ignore-onclickoutside") }, a2 ? { onClick: this.toggleCalendar } : null)), this.state.isRenderAriaLiveMessage && this.renderAriaLiveRegion(), this.renderDateInput(), this.renderClearButton());
  } }, { key: "render", value: function() {
    var t3 = this.renderCalendar();
    if (this.props.inline) return t3;
    if (this.props.withPortal) {
      var r2 = this.state.open ? import_react2.default.createElement($t, { enableTabLoop: this.props.enableTabLoop }, import_react2.default.createElement("div", { className: "react-datepicker__portal", tabIndex: -1, onKeyDown: this.onPortalKeyDown }, t3)) : null;
      return this.state.open && this.props.portalId && (r2 = import_react2.default.createElement(Ut, { portalId: this.props.portalId, portalHost: this.props.portalHost }, r2)), import_react2.default.createElement("div", null, this.renderInputContainer(), r2);
    }
    return import_react2.default.createElement(Gt, { className: this.props.popperClassName, wrapperClassName: this.props.wrapperClassName, hidePopper: !this.isCalendarOpen(), portalId: this.props.portalId, portalHost: this.props.portalHost, popperModifiers: this.props.popperModifiers, targetComponent: this.renderInputContainer(), popperContainer: this.props.popperContainer, popperComponent: t3, popperPlacement: this.props.popperPlacement, popperProps: this.props.popperProps, popperOnKeyDown: this.onPopperKeyDown, enableTabLoop: this.props.enableTabLoop });
  } }], [{ key: "defaultProps", get: function() {
    return { allowSameDay: false, dateFormat: "MM/dd/yyyy", dateFormatCalendar: "LLLL yyyy", onChange: function() {
    }, disabled: false, disabledKeyboardNavigation: false, dropdownMode: "scroll", onFocus: function() {
    }, onBlur: function() {
    }, onKeyDown: function() {
    }, onInputClick: function() {
    }, onSelect: function() {
    }, onClickOutside: function() {
    }, onMonthChange: function() {
    }, onCalendarOpen: function() {
    }, onCalendarClose: function() {
    }, preventOpenOnFocus: false, onYearChange: function() {
    }, onInputError: function() {
    }, monthsShown: 1, readOnly: false, withPortal: false, selectsDisabledDaysInRange: false, shouldCloseOnSelect: true, showTimeSelect: false, showTimeInput: false, showPreviousMonths: false, showMonthYearPicker: false, showFullMonthYearPicker: false, showTwoColumnMonthYearPicker: false, showFourColumnMonthYearPicker: false, showYearPicker: false, showQuarterYearPicker: false, showWeekPicker: false, strictParsing: false, timeIntervals: 30, timeCaption: "Time", previousMonthAriaLabel: "Previous Month", previousMonthButtonLabel: "Previous Month", nextMonthAriaLabel: "Next Month", nextMonthButtonLabel: "Next Month", previousYearAriaLabel: "Previous Year", previousYearButtonLabel: "Previous Year", nextYearAriaLabel: "Next Year", nextYearButtonLabel: "Next Year", timeInputLabel: "Time", enableTabLoop: true, yearItemNumber: Ne, focusSelectedMonth: false, showPopperArrow: true, excludeScrollbar: true, customTimeInput: null, calendarStartDay: void 0, toggleCalendarOnIconClick: false };
  } }]), s;
}();
var tr = "input";
var rr = "navigate";
export {
  Ht as CalendarContainer,
  er as default,
  $e as getDefaultLocale,
  Ue as registerLocale,
  ze as setDefaultLocale
};
/*! Bundled license information:

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

object-assign/index.js:
  (*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  *)

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)
*/
//# sourceMappingURL=react-datepicker.js.map
