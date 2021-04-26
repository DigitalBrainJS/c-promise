'use strict';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty$3.call(from, key)) {
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

var react_production_min = createCommonjsModule(function (module, exports) {

var n = 60103,
    p = 60106;

exports.Fragment = 60107;
exports.StrictMode = 60108;
exports.Profiler = 60114;
var q = 60109,
    r = 60110,
    t = 60112;
exports.Suspense = 60113;
var u = 60115,
    v = 60116;

if ("function" === typeof Symbol && Symbol.for) {
  var w = Symbol.for;
  n = w("react.element");
  p = w("react.portal");
  exports.Fragment = w("react.fragment");
  exports.StrictMode = w("react.strict_mode");
  exports.Profiler = w("react.profiler");
  q = w("react.provider");
  r = w("react.context");
  t = w("react.forward_ref");
  exports.Suspense = w("react.suspense");
  u = w("react.memo");
  v = w("react.lazy");
}

var x = "function" === typeof Symbol && Symbol.iterator;

function y(a) {
  if (null === a || "object" !== typeof a) return null;
  a = x && a[x] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}

function z(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var A = {
  isMounted: function () {
    return !1;
  },
  enqueueForceUpdate: function () {},
  enqueueReplaceState: function () {},
  enqueueSetState: function () {}
},
    B = {};

function C(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = B;
  this.updater = c || A;
}

C.prototype.isReactComponent = {};

C.prototype.setState = function (a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(z(85));
  this.updater.enqueueSetState(this, a, b, "setState");
};

C.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function D() {}

D.prototype = C.prototype;

function E(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = B;
  this.updater = c || A;
}

var F = E.prototype = new D();
F.constructor = E;
objectAssign(F, C.prototype);
F.isPureReactComponent = !0;
var G = {
  current: null
},
    H = Object.prototype.hasOwnProperty,
    I = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function J(a, b, c) {
  var e,
      d = {},
      k = null,
      h = null;
  if (null != b) for (e in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
  var g = arguments.length - 2;
  if (1 === g) d.children = c;else if (1 < g) {
    for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];

    d.children = f;
  }
  if (a && a.defaultProps) for (e in g = a.defaultProps, g) void 0 === d[e] && (d[e] = g[e]);
  return {
    $$typeof: n,
    type: a,
    key: k,
    ref: h,
    props: d,
    _owner: G.current
  };
}

function K(a, b) {
  return {
    $$typeof: n,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function L(a) {
  return "object" === typeof a && null !== a && a.$$typeof === n;
}

function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + a.replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var M = /\/+/g;

function N(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}

function O(a, b, c, e, d) {
  var k = typeof a;
  if ("undefined" === k || "boolean" === k) a = null;
  var h = !1;
  if (null === a) h = !0;else switch (k) {
    case "string":
    case "number":
      h = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case n:
        case p:
          h = !0;
      }

  }
  if (h) return h = a, d = d(h), a = "" === e ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", null != a && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function (a) {
    return a;
  })) : null != d && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
  h = 0;
  e = "" === e ? "." : e + ":";
  if (Array.isArray(a)) for (var g = 0; g < a.length; g++) {
    k = a[g];
    var f = e + N(k, g);
    h += O(k, b, c, f, d);
  } else if (f = y(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);else if ("object" === k) throw b = "" + a, Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
  return h;
}

function P(a, b, c) {
  if (null == a) return a;
  var e = [],
      d = 0;
  O(a, e, "", "", function (a) {
    return b.call(c, a, d++);
  });
  return e;
}

function Q(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    a._status = 0;
    a._result = b;
    b.then(function (b) {
      0 === a._status && (b = b.default, a._status = 1, a._result = b);
    }, function (b) {
      0 === a._status && (a._status = 2, a._result = b);
    });
  }

  if (1 === a._status) return a._result;
  throw a._result;
}

var R = {
  current: null
};

function S() {
  var a = R.current;
  if (null === a) throw Error(z(321));
  return a;
}

var T = {
  ReactCurrentDispatcher: R,
  ReactCurrentBatchConfig: {
    transition: 0
  },
  ReactCurrentOwner: G,
  IsSomeRendererActing: {
    current: !1
  },
  assign: objectAssign
};
exports.Children = {
  map: P,
  forEach: function (a, b, c) {
    P(a, function () {
      b.apply(this, arguments);
    }, c);
  },
  count: function (a) {
    var b = 0;
    P(a, function () {
      b++;
    });
    return b;
  },
  toArray: function (a) {
    return P(a, function (a) {
      return a;
    }) || [];
  },
  only: function (a) {
    if (!L(a)) throw Error(z(143));
    return a;
  }
};
exports.Component = C;
exports.PureComponent = E;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;

exports.cloneElement = function (a, b, c) {
  if (null === a || void 0 === a) throw Error(z(267, a));
  var e = objectAssign({}, a.props),
      d = a.key,
      k = a.ref,
      h = a._owner;

  if (null != b) {
    void 0 !== b.ref && (k = b.ref, h = G.current);
    void 0 !== b.key && (d = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;

    for (f in b) H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
  }

  var f = arguments.length - 2;
  if (1 === f) e.children = c;else if (1 < f) {
    g = Array(f);

    for (var m = 0; m < f; m++) g[m] = arguments[m + 2];

    e.children = g;
  }
  return {
    $$typeof: n,
    type: a.type,
    key: d,
    ref: k,
    props: e,
    _owner: h
  };
};

exports.createContext = function (a, b) {
  void 0 === b && (b = null);
  a = {
    $$typeof: r,
    _calculateChangedBits: b,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  a.Provider = {
    $$typeof: q,
    _context: a
  };
  return a.Consumer = a;
};

exports.createElement = J;

exports.createFactory = function (a) {
  var b = J.bind(null, a);
  b.type = a;
  return b;
};

exports.createRef = function () {
  return {
    current: null
  };
};

exports.forwardRef = function (a) {
  return {
    $$typeof: t,
    render: a
  };
};

exports.isValidElement = L;

exports.lazy = function (a) {
  return {
    $$typeof: v,
    _payload: {
      _status: -1,
      _result: a
    },
    _init: Q
  };
};

exports.memo = function (a, b) {
  return {
    $$typeof: u,
    type: a,
    compare: void 0 === b ? null : b
  };
};

exports.useCallback = function (a, b) {
  return S().useCallback(a, b);
};

exports.useContext = function (a, b) {
  return S().useContext(a, b);
};

exports.useDebugValue = function () {};

exports.useEffect = function (a, b) {
  return S().useEffect(a, b);
};

exports.useImperativeHandle = function (a, b, c) {
  return S().useImperativeHandle(a, b, c);
};

exports.useLayoutEffect = function (a, b) {
  return S().useLayoutEffect(a, b);
};

exports.useMemo = function (a, b) {
  return S().useMemo(a, b);
};

exports.useReducer = function (a, b, c) {
  return S().useReducer(a, b, c);
};

exports.useRef = function (a) {
  return S().useRef(a);
};

exports.useState = function (a) {
  return S().useState(a);
};

exports.version = "17.0.2";
});

var react = createCommonjsModule(function (module) {

{
  module.exports = react_production_min;
}
});

var scheduler_production_min = createCommonjsModule(function (module, exports) {

var f, g, h, k;

if ("object" === typeof performance && "function" === typeof performance.now) {
  var l = performance;

  exports.unstable_now = function () {
    return l.now();
  };
} else {
  var p = Date,
      q = p.now();

  exports.unstable_now = function () {
    return p.now() - q;
  };
}

if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var t = null,
      u = null,
      w = function () {
    if (null !== t) try {
      var a = exports.unstable_now();
      t(!0, a);
      t = null;
    } catch (b) {
      throw setTimeout(w, 0), b;
    }
  };

  f = function (a) {
    null !== t ? setTimeout(f, 0, a) : (t = a, setTimeout(w, 0));
  };

  g = function (a, b) {
    u = setTimeout(a, b);
  };

  h = function () {
    clearTimeout(u);
  };

  exports.unstable_shouldYield = function () {
    return !1;
  };

  k = exports.unstable_forceFrameRate = function () {};
} else {
  var x = window.setTimeout,
      y = window.clearTimeout;

  if ("undefined" !== typeof console) {
    var z = window.cancelAnimationFrame;
    "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    "function" !== typeof z && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
  }

  var A = !1,
      B = null,
      C = -1,
      D = 5,
      E = 0;

  exports.unstable_shouldYield = function () {
    return exports.unstable_now() >= E;
  };

  k = function () {};

  exports.unstable_forceFrameRate = function (a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < a ? Math.floor(1E3 / a) : 5;
  };

  var F = new MessageChannel(),
      G = F.port2;

  F.port1.onmessage = function () {
    if (null !== B) {
      var a = exports.unstable_now();
      E = a + D;

      try {
        B(!0, a) ? G.postMessage(null) : (A = !1, B = null);
      } catch (b) {
        throw G.postMessage(null), b;
      }
    } else A = !1;
  };

  f = function (a) {
    B = a;
    A || (A = !0, G.postMessage(null));
  };

  g = function (a, b) {
    C = x(function () {
      a(exports.unstable_now());
    }, b);
  };

  h = function () {
    y(C);
    C = -1;
  };
}

function H(a, b) {
  var c = a.length;
  a.push(b);

  a: for (;;) {
    var d = c - 1 >>> 1,
        e = a[d];
    if (void 0 !== e && 0 < I(e, b)) a[d] = b, a[c] = e, c = d;else break a;
  }
}

function J(a) {
  a = a[0];
  return void 0 === a ? null : a;
}

function K(a) {
  var b = a[0];

  if (void 0 !== b) {
    var c = a.pop();

    if (c !== b) {
      a[0] = c;

      a: for (var d = 0, e = a.length; d < e;) {
        var m = 2 * (d + 1) - 1,
            n = a[m],
            v = m + 1,
            r = a[v];
        if (void 0 !== n && 0 > I(n, c)) void 0 !== r && 0 > I(r, n) ? (a[d] = r, a[v] = c, d = v) : (a[d] = n, a[m] = c, d = m);else if (void 0 !== r && 0 > I(r, c)) a[d] = r, a[v] = c, d = v;else break a;
      }
    }

    return b;
  }

  return null;
}

function I(a, b) {
  var c = a.sortIndex - b.sortIndex;
  return 0 !== c ? c : a.id - b.id;
}

var L = [],
    M = [],
    N = 1,
    O = null,
    P = 3,
    Q = !1,
    R = !1,
    S = !1;

function T(a) {
  for (var b = J(M); null !== b;) {
    if (null === b.callback) K(M);else if (b.startTime <= a) K(M), b.sortIndex = b.expirationTime, H(L, b);else break;
    b = J(M);
  }
}

function U(a) {
  S = !1;
  T(a);
  if (!R) if (null !== J(L)) R = !0, f(V);else {
    var b = J(M);
    null !== b && g(U, b.startTime - a);
  }
}

function V(a, b) {
  R = !1;
  S && (S = !1, h());
  Q = !0;
  var c = P;

  try {
    T(b);

    for (O = J(L); null !== O && (!(O.expirationTime > b) || a && !exports.unstable_shouldYield());) {
      var d = O.callback;

      if ("function" === typeof d) {
        O.callback = null;
        P = O.priorityLevel;
        var e = d(O.expirationTime <= b);
        b = exports.unstable_now();
        "function" === typeof e ? O.callback = e : O === J(L) && K(L);
        T(b);
      } else K(L);

      O = J(L);
    }

    if (null !== O) var m = !0;else {
      var n = J(M);
      null !== n && g(U, n.startTime - b);
      m = !1;
    }
    return m;
  } finally {
    O = null, P = c, Q = !1;
  }
}

var W = k;
exports.unstable_IdlePriority = 5;
exports.unstable_ImmediatePriority = 1;
exports.unstable_LowPriority = 4;
exports.unstable_NormalPriority = 3;
exports.unstable_Profiling = null;
exports.unstable_UserBlockingPriority = 2;

exports.unstable_cancelCallback = function (a) {
  a.callback = null;
};

exports.unstable_continueExecution = function () {
  R || Q || (R = !0, f(V));
};

exports.unstable_getCurrentPriorityLevel = function () {
  return P;
};

exports.unstable_getFirstCallbackNode = function () {
  return J(L);
};

exports.unstable_next = function (a) {
  switch (P) {
    case 1:
    case 2:
    case 3:
      var b = 3;
      break;

    default:
      b = P;
  }

  var c = P;
  P = b;

  try {
    return a();
  } finally {
    P = c;
  }
};

exports.unstable_pauseExecution = function () {};

exports.unstable_requestPaint = W;

exports.unstable_runWithPriority = function (a, b) {
  switch (a) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;

    default:
      a = 3;
  }

  var c = P;
  P = a;

  try {
    return b();
  } finally {
    P = c;
  }
};

exports.unstable_scheduleCallback = function (a, b, c) {
  var d = exports.unstable_now();
  "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;

  switch (a) {
    case 1:
      var e = -1;
      break;

    case 2:
      e = 250;
      break;

    case 5:
      e = 1073741823;
      break;

    case 4:
      e = 1E4;
      break;

    default:
      e = 5E3;
  }

  e = c + e;
  a = {
    id: N++,
    callback: b,
    priorityLevel: a,
    startTime: c,
    expirationTime: e,
    sortIndex: -1
  };
  c > d ? (a.sortIndex = c, H(M, a), null === J(L) && a === J(M) && (S ? h() : S = !0, g(U, c - d))) : (a.sortIndex = e, H(L, a), R || Q || (R = !0, f(V)));
  return a;
};

exports.unstable_wrapCallback = function (a) {
  var b = P;
  return function () {
    var c = P;
    P = b;

    try {
      return a.apply(this, arguments);
    } finally {
      P = c;
    }
  };
};
});

var scheduler = createCommonjsModule(function (module) {

{
  module.exports = scheduler_production_min;
}
});

function y(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

if (!react) throw Error(y(227));
var ba = new Set(),
    ca = {};

function da(a, b) {
  ea(a, b);
  ea(a + "Capture", b);
}

function ea(a, b) {
  ca[a] = b;

  for (a = 0; a < b.length; a++) ba.add(b[a]);
}

var fa = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement),
    ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    ia = Object.prototype.hasOwnProperty,
    ja = {},
    ka = {};

function la(a) {
  if (ia.call(ka, a)) return !0;
  if (ia.call(ja, a)) return !1;
  if (ha.test(a)) return ka[a] = !0;
  ja[a] = !0;
  return !1;
}

function ma(a, b, c, d) {
  if (null !== c && 0 === c.type) return !1;

  switch (typeof b) {
    case "function":
    case "symbol":
      return !0;

    case "boolean":
      if (d) return !1;
      if (null !== c) return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;

    default:
      return !1;
  }
}

function na(a, b, c, d) {
  if (null === b || "undefined" === typeof b || ma(a, b, c, d)) return !0;
  if (d) return !1;
  if (null !== c) switch (c.type) {
    case 3:
      return !b;

    case 4:
      return !1 === b;

    case 5:
      return isNaN(b);

    case 6:
      return isNaN(b) || 1 > b;
  }
  return !1;
}

function B(a, b, c, d, e, f, g) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f;
  this.removeEmptyString = g;
}

var D = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {
  D[a] = new B(a, 0, !1, a, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {
  var b = a[0];
  D[b] = new B(b, 1, !1, a[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {
  D[a] = new B(a, 2, !1, a.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (a) {
  D[a] = new B(a, 2, !1, a, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {
  D[a] = new B(a, 3, !1, a.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function (a) {
  D[a] = new B(a, 3, !0, a, null, !1, !1);
});
["capture", "download"].forEach(function (a) {
  D[a] = new B(a, 4, !1, a, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (a) {
  D[a] = new B(a, 6, !1, a, null, !1, !1);
});
["rowSpan", "start"].forEach(function (a) {
  D[a] = new B(a, 5, !1, a.toLowerCase(), null, !1, !1);
});
var oa = /[\-:]([a-z])/g;

function pa(a) {
  return a[1].toUpperCase();
}

"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {
  var b = a.replace(oa, pa);
  D[b] = new B(b, 1, !1, a, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {
  var b = a.replace(oa, pa);
  D[b] = new B(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
  var b = a.replace(oa, pa);
  D[b] = new B(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (a) {
  D[a] = new B(a, 1, !1, a.toLowerCase(), null, !1, !1);
});
D.xlinkHref = new B("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function (a) {
  D[a] = new B(a, 1, !1, a.toLowerCase(), null, !0, !0);
});

function qa(a, b, c, d) {
  var e = D.hasOwnProperty(b) ? D[b] : null;
  var f = null !== e ? 0 === e.type : d ? !1 : !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1] ? !1 : !0;
  f || (na(b, c, e, d) && (c = null), d || null === e ? la(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c))));
}

var ra = react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    sa = 60103,
    ta = 60106,
    ua = 60107,
    wa = 60108,
    xa = 60114,
    ya = 60109,
    za = 60110,
    Aa = 60112,
    Ba = 60113,
    Ca = 60120,
    Da = 60115,
    Ea = 60116,
    Fa = 60121,
    Ga = 60128,
    Ha = 60129,
    Ia = 60130,
    Ja = 60131;

if ("function" === typeof Symbol && Symbol.for) {
  var E = Symbol.for;
  sa = E("react.element");
  ta = E("react.portal");
  ua = E("react.fragment");
  wa = E("react.strict_mode");
  xa = E("react.profiler");
  ya = E("react.provider");
  za = E("react.context");
  Aa = E("react.forward_ref");
  Ba = E("react.suspense");
  Ca = E("react.suspense_list");
  Da = E("react.memo");
  Ea = E("react.lazy");
  Fa = E("react.block");
  E("react.scope");
  Ga = E("react.opaque.id");
  Ha = E("react.debug_trace_mode");
  Ia = E("react.offscreen");
  Ja = E("react.legacy_hidden");
}

var Ka = "function" === typeof Symbol && Symbol.iterator;

function La(a) {
  if (null === a || "object" !== typeof a) return null;
  a = Ka && a[Ka] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}

var Ma;

function Na(a) {
  if (void 0 === Ma) try {
    throw Error();
  } catch (c) {
    var b = c.stack.trim().match(/\n( *(at )?)/);
    Ma = b && b[1] || "";
  }
  return "\n" + Ma + a;
}

var Oa = !1;

function Pa(a, b) {
  if (!a || Oa) return "";
  Oa = !0;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;

  try {
    if (b) {
      if (b = function () {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", {
        set: function () {
          throw Error();
        }
      }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (k) {
          var d = k;
        }

        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (k) {
          d = k;
        }

        a.call(b.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (k) {
        d = k;
      }

      a();
    }
  } catch (k) {
    if (k && d && "string" === typeof k.stack) {
      for (var e = k.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];) h--;

      for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
        if (1 !== g || 1 !== h) {
          do if (g--, h--, 0 > h || e[g] !== f[h]) return "\n" + e[g].replace(" at new ", " at "); while (1 <= g && 0 <= h);
        }

        break;
      }
    }
  } finally {
    Oa = !1, Error.prepareStackTrace = c;
  }

  return (a = a ? a.displayName || a.name : "") ? Na(a) : "";
}

function Qa(a) {
  switch (a.tag) {
    case 5:
      return Na(a.type);

    case 16:
      return Na("Lazy");

    case 13:
      return Na("Suspense");

    case 19:
      return Na("SuspenseList");

    case 0:
    case 2:
    case 15:
      return a = Pa(a.type, !1), a;

    case 11:
      return a = Pa(a.type.render, !1), a;

    case 22:
      return a = Pa(a.type._render, !1), a;

    case 1:
      return a = Pa(a.type, !0), a;

    default:
      return "";
  }
}

function Ra(a) {
  if (null == a) return null;
  if ("function" === typeof a) return a.displayName || a.name || null;
  if ("string" === typeof a) return a;

  switch (a) {
    case ua:
      return "Fragment";

    case ta:
      return "Portal";

    case xa:
      return "Profiler";

    case wa:
      return "StrictMode";

    case Ba:
      return "Suspense";

    case Ca:
      return "SuspenseList";
  }

  if ("object" === typeof a) switch (a.$$typeof) {
    case za:
      return (a.displayName || "Context") + ".Consumer";

    case ya:
      return (a._context.displayName || "Context") + ".Provider";

    case Aa:
      var b = a.render;
      b = b.displayName || b.name || "";
      return a.displayName || ("" !== b ? "ForwardRef(" + b + ")" : "ForwardRef");

    case Da:
      return Ra(a.type);

    case Fa:
      return Ra(a._render);

    case Ea:
      b = a._payload;
      a = a._init;

      try {
        return Ra(a(b));
      } catch (c) {}

  }
  return null;
}

function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return a;

    default:
      return "";
  }
}

function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}

function Ua(a) {
  var b = Ta(a) ? "checked" : "value",
      c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),
      d = "" + a[b];

  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get,
        f = c.set;
    Object.defineProperty(a, b, {
      configurable: !0,
      get: function () {
        return e.call(this);
      },
      set: function (a) {
        d = "" + a;
        f.call(this, a);
      }
    });
    Object.defineProperty(a, b, {
      enumerable: c.enumerable
    });
    return {
      getValue: function () {
        return d;
      },
      setValue: function (a) {
        d = "" + a;
      },
      stopTracking: function () {
        a._valueTracker = null;
        delete a[b];
      }
    };
  }
}

function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}

function Wa(a) {
  if (!a) return !1;
  var b = a._valueTracker;
  if (!b) return !0;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), !0) : !1;
}

function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a) return null;

  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}

function Ya(a, b) {
  var c = b.checked;
  return objectAssign({}, b, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != c ? c : a._wrapperState.initialChecked
  });
}

function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue,
      d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = {
    initialChecked: d,
    initialValue: c,
    controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value
  };
}

function $a(a, b) {
  b = b.checked;
  null != b && qa(a, "checked", b, !1);
}

function ab(a, b) {
  $a(a, b);
  var c = Sa(b.value),
      d = b.type;
  if (null != c) {
    if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
    } else a.value !== "" + c && (a.value = "" + c);
  } else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? bb(a, b.type, c) : b.hasOwnProperty("defaultValue") && bb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}

function cb(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }

  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}

function bb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}

function db(a) {
  var b = "";
  react.Children.forEach(a, function (a) {
    null != a && (b += a);
  });
  return b;
}

function eb(a, b) {
  a = objectAssign({
    children: void 0
  }, b);
  if (b = db(b.children)) a.children = b;
  return a;
}

function fb(a, b, c, d) {
  a = a.options;

  if (b) {
    b = {};

    for (var e = 0; e < c.length; e++) b["$" + c[e]] = !0;

    for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);
  } else {
    c = "" + Sa(c);
    b = null;

    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = !0;
        d && (a[e].defaultSelected = !0);
        return;
      }

      null !== b || a[e].disabled || (b = a[e]);
    }

    null !== b && (b.selected = !0);
  }
}

function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(y(91));
  return objectAssign({}, b, {
    value: void 0,
    defaultValue: void 0,
    children: "" + a._wrapperState.initialValue
  });
}

function hb(a, b) {
  var c = b.value;

  if (null == c) {
    c = b.children;
    b = b.defaultValue;

    if (null != c) {
      if (null != b) throw Error(y(92));

      if (Array.isArray(c)) {
        if (!(1 >= c.length)) throw Error(y(93));
        c = c[0];
      }

      b = c;
    }

    null == b && (b = "");
    c = b;
  }

  a._wrapperState = {
    initialValue: Sa(c)
  };
}

function ib(a, b) {
  var c = Sa(b.value),
      d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}

function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}

var kb = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};

function lb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";

    case "math":
      return "http://www.w3.org/1998/Math/MathML";

    default:
      return "http://www.w3.org/1999/xhtml";
  }
}

function mb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? lb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}

var nb,
    ob = function (a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function () {
      return a(b, c, d, e);
    });
  } : a;
}(function (a, b) {
  if (a.namespaceURI !== kb.svg || "innerHTML" in a) a.innerHTML = b;else {
    nb = nb || document.createElement("div");
    nb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";

    for (b = nb.firstChild; a.firstChild;) a.removeChild(a.firstChild);

    for (; b.firstChild;) a.appendChild(b.firstChild);
  }
});

function pb(a, b) {
  if (b) {
    var c = a.firstChild;

    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }

  a.textContent = b;
}

var qb = {
  animationIterationCount: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
},
    rb = ["Webkit", "ms", "Moz", "O"];
Object.keys(qb).forEach(function (a) {
  rb.forEach(function (b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    qb[b] = qb[a];
  });
});

function sb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || qb.hasOwnProperty(a) && qb[a] ? ("" + b).trim() : b + "px";
}

function tb(a, b) {
  a = a.style;

  for (var c in b) if (b.hasOwnProperty(c)) {
    var d = 0 === c.indexOf("--"),
        e = sb(c, b[c], d);
    "float" === c && (c = "cssFloat");
    d ? a.setProperty(c, e) : a[c] = e;
  }
}

var ub = objectAssign({
  menuitem: !0
}, {
  area: !0,
  base: !0,
  br: !0,
  col: !0,
  embed: !0,
  hr: !0,
  img: !0,
  input: !0,
  keygen: !0,
  link: !0,
  meta: !0,
  param: !0,
  source: !0,
  track: !0,
  wbr: !0
});

function vb(a, b) {
  if (b) {
    if (ub[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(y(137, a));

    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(y(60));
      if (!("object" === typeof b.dangerouslySetInnerHTML && "__html" in b.dangerouslySetInnerHTML)) throw Error(y(61));
    }

    if (null != b.style && "object" !== typeof b.style) throw Error(y(62));
  }
}

function wb(a, b) {
  if (-1 === a.indexOf("-")) return "string" === typeof b.is;

  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;

    default:
      return !0;
  }
}

function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}

var yb = null,
    zb = null,
    Ab = null;

function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb) throw Error(y(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}

function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}

function Fb() {
  if (zb) {
    var a = zb,
        b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
  }
}

function Gb(a, b) {
  return a(b);
}

function Hb(a, b, c, d, e) {
  return a(b, c, d, e);
}

function Ib() {}

var Jb = Gb,
    Kb = !1,
    Lb = !1;

function Mb() {
  if (null !== zb || null !== Ab) Ib(), Fb();
}

function Nb(a, b, c) {
  if (Lb) return a(b, c);
  Lb = !0;

  try {
    return Jb(a, b, c);
  } finally {
    Lb = !1, Mb();
  }
}

function Ob(a, b) {
  var c = a.stateNode;
  if (null === c) return null;
  var d = Db(c);
  if (null === d) return null;
  c = d[b];

  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
      a = !d;
      break a;

    default:
      a = !1;
  }

  if (a) return null;
  if (c && "function" !== typeof c) throw Error(y(231, b, typeof c));
  return c;
}

var Pb = !1;
if (fa) try {
  var Qb = {};
  Object.defineProperty(Qb, "passive", {
    get: function () {
      Pb = !0;
    }
  });
  window.addEventListener("test", Qb, Qb);
  window.removeEventListener("test", Qb, Qb);
} catch (a) {
  Pb = !1;
}

function Rb(a, b, c, d, e, f, g, h, k) {
  var l = Array.prototype.slice.call(arguments, 3);

  try {
    b.apply(c, l);
  } catch (n) {
    this.onError(n);
  }
}

var Sb = !1,
    Tb = null,
    Ub = !1,
    Vb = null,
    Wb = {
  onError: function (a) {
    Sb = !0;
    Tb = a;
  }
};

function Xb(a, b, c, d, e, f, g, h, k) {
  Sb = !1;
  Tb = null;
  Rb.apply(Wb, arguments);
}

function Yb(a, b, c, d, e, f, g, h, k) {
  Xb.apply(this, arguments);

  if (Sb) {
    if (Sb) {
      var l = Tb;
      Sb = !1;
      Tb = null;
    } else throw Error(y(198));

    Ub || (Ub = !0, Vb = l);
  }
}

function Zb(a) {
  var b = a,
      c = a;
  if (a.alternate) for (; b.return;) b = b.return;else {
    a = b;

    do b = a, 0 !== (b.flags & 1026) && (c = b.return), a = b.return; while (a);
  }
  return 3 === b.tag ? c : null;
}

function $b(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b) return b.dehydrated;
  }

  return null;
}

function ac(a) {
  if (Zb(a) !== a) throw Error(y(188));
}

function bc(a) {
  var b = a.alternate;

  if (!b) {
    b = Zb(a);
    if (null === b) throw Error(y(188));
    return b !== a ? null : a;
  }

  for (var c = a, d = b;;) {
    var e = c.return;
    if (null === e) break;
    var f = e.alternate;

    if (null === f) {
      d = e.return;

      if (null !== d) {
        c = d;
        continue;
      }

      break;
    }

    if (e.child === f.child) {
      for (f = e.child; f;) {
        if (f === c) return ac(e), a;
        if (f === d) return ac(e), b;
        f = f.sibling;
      }

      throw Error(y(188));
    }

    if (c.return !== d.return) c = e, d = f;else {
      for (var g = !1, h = e.child; h;) {
        if (h === c) {
          g = !0;
          c = e;
          d = f;
          break;
        }

        if (h === d) {
          g = !0;
          d = e;
          c = f;
          break;
        }

        h = h.sibling;
      }

      if (!g) {
        for (h = f.child; h;) {
          if (h === c) {
            g = !0;
            c = f;
            d = e;
            break;
          }

          if (h === d) {
            g = !0;
            d = f;
            c = e;
            break;
          }

          h = h.sibling;
        }

        if (!g) throw Error(y(189));
      }
    }
    if (c.alternate !== d) throw Error(y(190));
  }

  if (3 !== c.tag) throw Error(y(188));
  return c.stateNode.current === c ? a : b;
}

function cc(a) {
  a = bc(a);
  if (!a) return null;

  for (var b = a;;) {
    if (5 === b.tag || 6 === b.tag) return b;
    if (b.child) b.child.return = b, b = b.child;else {
      if (b === a) break;

      for (; !b.sibling;) {
        if (!b.return || b.return === a) return null;
        b = b.return;
      }

      b.sibling.return = b.return;
      b = b.sibling;
    }
  }

  return null;
}

function dc(a, b) {
  for (var c = a.alternate; null !== b;) {
    if (b === a || b === c) return !0;
    b = b.return;
  }

  return !1;
}

var ec,
    fc,
    gc,
    hc,
    ic = !1,
    jc = [],
    kc = null,
    lc = null,
    mc = null,
    nc = new Map(),
    oc = new Map(),
    pc = [],
    qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

function rc(a, b, c, d, e) {
  return {
    blockedOn: a,
    domEventName: b,
    eventSystemFlags: c | 16,
    nativeEvent: e,
    targetContainers: [d]
  };
}

function sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      kc = null;
      break;

    case "dragenter":
    case "dragleave":
      lc = null;
      break;

    case "mouseover":
    case "mouseout":
      mc = null;
      break;

    case "pointerover":
    case "pointerout":
      nc.delete(b.pointerId);
      break;

    case "gotpointercapture":
    case "lostpointercapture":
      oc.delete(b.pointerId);
  }
}

function tc(a, b, c, d, e, f) {
  if (null === a || a.nativeEvent !== f) return a = rc(b, c, d, e, f), null !== b && (b = Cb(b), null !== b && fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}

function uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return kc = tc(kc, a, b, c, d, e), !0;

    case "dragenter":
      return lc = tc(lc, a, b, c, d, e), !0;

    case "mouseover":
      return mc = tc(mc, a, b, c, d, e), !0;

    case "pointerover":
      var f = e.pointerId;
      nc.set(f, tc(nc.get(f) || null, a, b, c, d, e));
      return !0;

    case "gotpointercapture":
      return f = e.pointerId, oc.set(f, tc(oc.get(f) || null, a, b, c, d, e)), !0;
  }

  return !1;
}

function vc(a) {
  var b = wc(a.target);

  if (null !== b) {
    var c = Zb(b);
    if (null !== c) if (b = c.tag, 13 === b) {
      if (b = $b(c), null !== b) {
        a.blockedOn = b;
        hc(a.lanePriority, function () {
          scheduler.unstable_runWithPriority(a.priority, function () {
            gc(c);
          });
        });
        return;
      }
    } else if (3 === b && c.stateNode.hydrate) {
      a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
      return;
    }
  }

  a.blockedOn = null;
}

function xc(a) {
  if (null !== a.blockedOn) return !1;

  for (var b = a.targetContainers; 0 < b.length;) {
    var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null !== c) return b = Cb(c), null !== b && fc(b), a.blockedOn = c, !1;
    b.shift();
  }

  return !0;
}

function zc(a, b, c) {
  xc(a) && c.delete(b);
}

function Ac() {
  for (ic = !1; 0 < jc.length;) {
    var a = jc[0];

    if (null !== a.blockedOn) {
      a = Cb(a.blockedOn);
      null !== a && ec(a);
      break;
    }

    for (var b = a.targetContainers; 0 < b.length;) {
      var c = yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);

      if (null !== c) {
        a.blockedOn = c;
        break;
      }

      b.shift();
    }

    null === a.blockedOn && jc.shift();
  }

  null !== kc && xc(kc) && (kc = null);
  null !== lc && xc(lc) && (lc = null);
  null !== mc && xc(mc) && (mc = null);
  nc.forEach(zc);
  oc.forEach(zc);
}

function Bc(a, b) {
  a.blockedOn === b && (a.blockedOn = null, ic || (ic = !0, scheduler.unstable_scheduleCallback(scheduler.unstable_NormalPriority, Ac)));
}

function Cc(a) {
  function b(b) {
    return Bc(b, a);
  }

  if (0 < jc.length) {
    Bc(jc[0], a);

    for (var c = 1; c < jc.length; c++) {
      var d = jc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }

  null !== kc && Bc(kc, a);
  null !== lc && Bc(lc, a);
  null !== mc && Bc(mc, a);
  nc.forEach(b);
  oc.forEach(b);

  for (c = 0; c < pc.length; c++) d = pc[c], d.blockedOn === a && (d.blockedOn = null);

  for (; 0 < pc.length && (c = pc[0], null === c.blockedOn);) vc(c), null === c.blockedOn && pc.shift();
}

function Dc(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}

var Ec = {
  animationend: Dc("Animation", "AnimationEnd"),
  animationiteration: Dc("Animation", "AnimationIteration"),
  animationstart: Dc("Animation", "AnimationStart"),
  transitionend: Dc("Transition", "TransitionEnd")
},
    Fc = {},
    Gc = {};
fa && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete Ec.animationend.animation, delete Ec.animationiteration.animation, delete Ec.animationstart.animation), "TransitionEvent" in window || delete Ec.transitionend.transition);

function Hc(a) {
  if (Fc[a]) return Fc[a];
  if (!Ec[a]) return a;
  var b = Ec[a],
      c;

  for (c in b) if (b.hasOwnProperty(c) && c in Gc) return Fc[a] = b[c];

  return a;
}

var Ic = Hc("animationend"),
    Jc = Hc("animationiteration"),
    Kc = Hc("animationstart"),
    Lc = Hc("transitionend"),
    Mc = new Map(),
    Nc = new Map(),
    Oc = ["abort", "abort", Ic, "animationEnd", Jc, "animationIteration", Kc, "animationStart", "canplay", "canPlay", "canplaythrough", "canPlayThrough", "durationchange", "durationChange", "emptied", "emptied", "encrypted", "encrypted", "ended", "ended", "error", "error", "gotpointercapture", "gotPointerCapture", "load", "load", "loadeddata", "loadedData", "loadedmetadata", "loadedMetadata", "loadstart", "loadStart", "lostpointercapture", "lostPointerCapture", "playing", "playing", "progress", "progress", "seeking", "seeking", "stalled", "stalled", "suspend", "suspend", "timeupdate", "timeUpdate", Lc, "transitionEnd", "waiting", "waiting"];

function Pc(a, b) {
  for (var c = 0; c < a.length; c += 2) {
    var d = a[c],
        e = a[c + 1];
    e = "on" + (e[0].toUpperCase() + e.slice(1));
    Nc.set(d, b);
    Mc.set(d, e);
    da(e, [d]);
  }
}

var Qc = scheduler.unstable_now;
Qc();
var F = 8;

function Rc(a) {
  if (0 !== (1 & a)) return F = 15, 1;
  if (0 !== (2 & a)) return F = 14, 2;
  if (0 !== (4 & a)) return F = 13, 4;
  var b = 24 & a;
  if (0 !== b) return F = 12, b;
  if (0 !== (a & 32)) return F = 11, 32;
  b = 192 & a;
  if (0 !== b) return F = 10, b;
  if (0 !== (a & 256)) return F = 9, 256;
  b = 3584 & a;
  if (0 !== b) return F = 8, b;
  if (0 !== (a & 4096)) return F = 7, 4096;
  b = 4186112 & a;
  if (0 !== b) return F = 6, b;
  b = 62914560 & a;
  if (0 !== b) return F = 5, b;
  if (a & 67108864) return F = 4, 67108864;
  if (0 !== (a & 134217728)) return F = 3, 134217728;
  b = 805306368 & a;
  if (0 !== b) return F = 2, b;
  if (0 !== (1073741824 & a)) return F = 1, 1073741824;
  F = 8;
  return a;
}

function Sc(a) {
  switch (a) {
    case 99:
      return 15;

    case 98:
      return 10;

    case 97:
    case 96:
      return 8;

    case 95:
      return 2;

    default:
      return 0;
  }
}

function Tc(a) {
  switch (a) {
    case 15:
    case 14:
      return 99;

    case 13:
    case 12:
    case 11:
    case 10:
      return 98;

    case 9:
    case 8:
    case 7:
    case 6:
    case 4:
    case 5:
      return 97;

    case 3:
    case 2:
    case 1:
      return 95;

    case 0:
      return 90;

    default:
      throw Error(y(358, a));
  }
}

function Uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c) return F = 0;
  var d = 0,
      e = 0,
      f = a.expiredLanes,
      g = a.suspendedLanes,
      h = a.pingedLanes;
  if (0 !== f) d = f, e = F = 15;else if (f = c & 134217727, 0 !== f) {
    var k = f & ~g;
    0 !== k ? (d = Rc(k), e = F) : (h &= f, 0 !== h && (d = Rc(h), e = F));
  } else f = c & ~g, 0 !== f ? (d = Rc(f), e = F) : 0 !== h && (d = Rc(h), e = F);
  if (0 === d) return 0;
  d = 31 - Vc(d);
  d = c & ((0 > d ? 0 : 1 << d) << 1) - 1;

  if (0 !== b && b !== d && 0 === (b & g)) {
    Rc(b);
    if (e <= F) return b;
    F = e;
  }

  b = a.entangledLanes;
  if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) c = 31 - Vc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}

function Wc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}

function Xc(a, b) {
  switch (a) {
    case 15:
      return 1;

    case 14:
      return 2;

    case 12:
      return a = Yc(24 & ~b), 0 === a ? Xc(10, b) : a;

    case 10:
      return a = Yc(192 & ~b), 0 === a ? Xc(8, b) : a;

    case 8:
      return a = Yc(3584 & ~b), 0 === a && (a = Yc(4186112 & ~b), 0 === a && (a = 512)), a;

    case 2:
      return b = Yc(805306368 & ~b), 0 === b && (b = 268435456), b;
  }

  throw Error(y(358, a));
}

function Yc(a) {
  return a & -a;
}

function Zc(a) {
  for (var b = [], c = 0; 31 > c; c++) b.push(a);

  return b;
}

function $c(a, b, c) {
  a.pendingLanes |= b;
  var d = b - 1;
  a.suspendedLanes &= d;
  a.pingedLanes &= d;
  a = a.eventTimes;
  b = 31 - Vc(b);
  a[b] = c;
}

var Vc = Math.clz32 ? Math.clz32 : ad,
    bd = Math.log,
    cd = Math.LN2;

function ad(a) {
  return 0 === a ? 32 : 31 - (bd(a) / cd | 0) | 0;
}

var dd = scheduler.unstable_UserBlockingPriority,
    ed = scheduler.unstable_runWithPriority,
    fd = !0;

function gd(a, b, c, d) {
  Kb || Ib();
  var e = hd,
      f = Kb;
  Kb = !0;

  try {
    Hb(e, a, b, c, d);
  } finally {
    (Kb = f) || Mb();
  }
}

function id(a, b, c, d) {
  ed(dd, hd.bind(null, a, b, c, d));
}

function hd(a, b, c, d) {
  if (fd) {
    var e;
    if ((e = 0 === (b & 4)) && 0 < jc.length && -1 < qc.indexOf(a)) a = rc(null, a, b, c, d), jc.push(a);else {
      var f = yc(a, b, c, d);
      if (null === f) e && sc(a, d);else {
        if (e) {
          if (-1 < qc.indexOf(a)) {
            a = rc(f, a, b, c, d);
            jc.push(a);
            return;
          }

          if (uc(f, a, b, c, d)) return;
          sc(a, d);
        }

        jd(a, b, d, null, c);
      }
    }
  }
}

function yc(a, b, c, d) {
  var e = xb(d);
  e = wc(e);

  if (null !== e) {
    var f = Zb(e);
    if (null === f) e = null;else {
      var g = f.tag;

      if (13 === g) {
        e = $b(f);
        if (null !== e) return e;
        e = null;
      } else if (3 === g) {
        if (f.stateNode.hydrate) return 3 === f.tag ? f.stateNode.containerInfo : null;
        e = null;
      } else f !== e && (e = null);
    }
  }

  jd(a, b, d, e, c);
  return null;
}

var kd = null,
    ld = null,
    md = null;

function nd() {
  if (md) return md;
  var a,
      b = ld,
      c = b.length,
      d,
      e = "value" in kd ? kd.value : kd.textContent,
      f = e.length;

  for (a = 0; a < c && b[a] === e[a]; a++);

  var g = c - a;

  for (d = 1; d <= g && b[c - d] === e[f - d]; d++);

  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}

function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}

function pd() {
  return !0;
}

function qd() {
  return !1;
}

function rd(a) {
  function b(b, d, e, f, g) {
    this._reactName = b;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f;
    this.target = g;
    this.currentTarget = null;

    for (var c in a) a.hasOwnProperty(c) && (b = a[c], this[c] = b ? b(f) : f[c]);

    this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : !1 === f.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }

  objectAssign(b.prototype, {
    preventDefault: function () {
      this.defaultPrevented = !0;
      var a = this.nativeEvent;
      a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (a.returnValue = !1), this.isDefaultPrevented = pd);
    },
    stopPropagation: function () {
      var a = this.nativeEvent;
      a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = pd);
    },
    persist: function () {},
    isPersistent: pd
  });
  return b;
}

var sd = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function (a) {
    return a.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
},
    td = rd(sd),
    ud = objectAssign({}, sd, {
  view: 0,
  detail: 0
}),
    vd = rd(ud),
    wd,
    xd,
    yd,
    Ad = objectAssign({}, ud, {
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  getModifierState: zd,
  button: 0,
  buttons: 0,
  relatedTarget: function (a) {
    return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
  },
  movementX: function (a) {
    if ("movementX" in a) return a.movementX;
    a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
    return wd;
  },
  movementY: function (a) {
    return "movementY" in a ? a.movementY : xd;
  }
}),
    Bd = rd(Ad),
    Cd = objectAssign({}, Ad, {
  dataTransfer: 0
}),
    Dd = rd(Cd),
    Ed = objectAssign({}, ud, {
  relatedTarget: 0
}),
    Fd = rd(Ed),
    Gd = objectAssign({}, sd, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}),
    Hd = rd(Gd),
    Id = objectAssign({}, sd, {
  clipboardData: function (a) {
    return "clipboardData" in a ? a.clipboardData : window.clipboardData;
  }
}),
    Jd = rd(Id),
    Kd = objectAssign({}, sd, {
  data: 0
}),
    Ld = rd(Kd),
    Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
},
    Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
},
    Od = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};

function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : !1;
}

function zd() {
  return Pd;
}

var Qd = objectAssign({}, ud, {
  key: function (a) {
    if (a.key) {
      var b = Md[a.key] || a.key;
      if ("Unidentified" !== b) return b;
    }

    return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: zd,
  charCode: function (a) {
    return "keypress" === a.type ? od(a) : 0;
  },
  keyCode: function (a) {
    return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  },
  which: function (a) {
    return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
  }
}),
    Rd = rd(Qd),
    Sd = objectAssign({}, Ad, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0
}),
    Td = rd(Sd),
    Ud = objectAssign({}, ud, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: zd
}),
    Vd = rd(Ud),
    Wd = objectAssign({}, sd, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}),
    Xd = rd(Wd),
    Yd = objectAssign({}, Ad, {
  deltaX: function (a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function (a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}),
    Zd = rd(Yd),
    $d = [9, 13, 27, 32],
    ae = fa && "CompositionEvent" in window,
    be = null;
fa && "documentMode" in document && (be = document.documentMode);
var ce = fa && "TextEvent" in window && !be,
    de = fa && (!ae || be && 8 < be && 11 >= be),
    ee = String.fromCharCode(32),
    fe = !1;

function ge(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);

    case "keydown":
      return 229 !== b.keyCode;

    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;

    default:
      return !1;
  }
}

function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}

var ie = !1;

function je(a, b) {
  switch (a) {
    case "compositionend":
      return he(b);

    case "keypress":
      if (32 !== b.which) return null;
      fe = !0;
      return ee;

    case "textInput":
      return a = b.data, a === ee && fe ? null : a;

    default:
      return null;
  }
}

function ke(a, b) {
  if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = !1, a) : null;

  switch (a) {
    case "paste":
      return null;

    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }

      return null;

    case "compositionend":
      return de && "ko" !== b.locale ? null : b.data;

    default:
      return null;
  }
}

var le = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};

function me(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le[a.type] : "textarea" === b ? !0 : !1;
}

function ne(a, b, c, d) {
  Eb(d);
  b = oe(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({
    event: c,
    listeners: b
  }));
}

var pe = null,
    qe = null;

function re(a) {
  se(a, 0);
}

function te(a) {
  var b = ue(a);
  if (Wa(b)) return a;
}

function ve(a, b) {
  if ("change" === a) return b;
}

var we = !1;

if (fa) {
  var xe;

  if (fa) {
    var ye = ("oninput" in document);

    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }

    xe = ye;
  } else xe = !1;

  we = xe && (!document.documentMode || 9 < document.documentMode);
}

function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}

function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a, xb(a));
    a = re;
    if (Kb) a(b);else {
      Kb = !0;

      try {
        Gb(a, b);
      } finally {
        Kb = !1, Mb();
      }
    }
  }
}

function Ce(a, b, c) {
  "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}

function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
}

function Ee(a, b) {
  if ("click" === a) return te(b);
}

function Fe(a, b) {
  if ("input" === a || "change" === a) return te(b);
}

function Ge(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}

var He = "function" === typeof Object.is ? Object.is : Ge,
    Ie = Object.prototype.hasOwnProperty;

function Je(a, b) {
  if (He(a, b)) return !0;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return !1;
  var c = Object.keys(a),
      d = Object.keys(b);
  if (c.length !== d.length) return !1;

  for (d = 0; d < c.length; d++) if (!Ie.call(b, c[d]) || !He(a[c[d]], b[c[d]])) return !1;

  return !0;
}

function Ke(a) {
  for (; a && a.firstChild;) a = a.firstChild;

  return a;
}

function Le(a, b) {
  var c = Ke(a);
  a = 0;

  for (var d; c;) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b) return {
        node: c,
        offset: b - a
      };
      a = d;
    }

    a: {
      for (; c;) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }

        c = c.parentNode;
      }

      c = void 0;
    }

    c = Ke(c);
  }
}

function Me(a, b) {
  return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? Me(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;
}

function Ne() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement;) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = !1;
    }

    if (c) a = b.contentWindow;else break;
    b = Xa(a.document);
  }

  return b;
}

function Oe(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}

var Pe = fa && "documentMode" in document && 11 >= document.documentMode,
    Qe = null,
    Re = null,
    Se = null,
    Te = !1;

function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Oe(d) ? d = {
    start: d.selectionStart,
    end: d.selectionEnd
  } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = {
    anchorNode: d.anchorNode,
    anchorOffset: d.anchorOffset,
    focusNode: d.focusNode,
    focusOffset: d.focusOffset
  }), Se && Je(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({
    event: b,
    listeners: d
  }), b.target = Qe)));
}

Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
Pc(Oc, 2);

for (var Ve = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), We = 0; We < Ve.length; We++) Nc.set(Ve[We], 0);

ea("onMouseEnter", ["mouseout", "mouseover"]);
ea("onMouseLeave", ["mouseout", "mouseover"]);
ea("onPointerEnter", ["pointerout", "pointerover"]);
ea("onPointerLeave", ["pointerout", "pointerover"]);
da("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
da("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
da("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
da("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    Ye = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));

function Ze(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Yb(d, b, void 0, a);
  a.currentTarget = null;
}

function se(a, b) {
  b = 0 !== (b & 4);

  for (var c = 0; c < a.length; c++) {
    var d = a[c],
        e = d.event;
    d = d.listeners;

    a: {
      var f = void 0;
      if (b) for (var g = d.length - 1; 0 <= g; g--) {
        var h = d[g],
            k = h.instance,
            l = h.currentTarget;
        h = h.listener;
        if (k !== f && e.isPropagationStopped()) break a;
        Ze(e, h, l);
        f = k;
      } else for (g = 0; g < d.length; g++) {
        h = d[g];
        k = h.instance;
        l = h.currentTarget;
        h = h.listener;
        if (k !== f && e.isPropagationStopped()) break a;
        Ze(e, h, l);
        f = k;
      }
    }
  }

  if (Ub) throw a = Vb, Ub = !1, Vb = null, a;
}

function G(a, b) {
  var c = $e(b),
      d = a + "__bubble";
  c.has(d) || (af(b, a, 2, !1), c.add(d));
}

var bf = "_reactListening" + Math.random().toString(36).slice(2);

function cf(a) {
  a[bf] || (a[bf] = !0, ba.forEach(function (b) {
    Ye.has(b) || df(b, !1, a, null);
    df(b, !0, a, null);
  }));
}

function df(a, b, c, d) {
  var e = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0,
      f = c;
  "selectionchange" === a && 9 !== c.nodeType && (f = c.ownerDocument);

  if (null !== d && !b && Ye.has(a)) {
    if ("scroll" !== a) return;
    e |= 2;
    f = d;
  }

  var g = $e(f),
      h = a + "__" + (b ? "capture" : "bubble");
  g.has(h) || (b && (e |= 4), af(f, a, e, b), g.add(h));
}

function af(a, b, c, d) {
  var e = Nc.get(b);

  switch (void 0 === e ? 2 : e) {
    case 0:
      e = gd;
      break;

    case 1:
      e = id;
      break;

    default:
      e = hd;
  }

  c = e.bind(null, b, c, a);
  e = void 0;
  !Pb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = !0);
  d ? void 0 !== e ? a.addEventListener(b, c, {
    capture: !0,
    passive: e
  }) : a.addEventListener(b, c, !0) : void 0 !== e ? a.addEventListener(b, c, {
    passive: e
  }) : a.addEventListener(b, c, !1);
}

function jd(a, b, c, d, e) {
  var f = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (;;) {
    if (null === d) return;
    var g = d.tag;

    if (3 === g || 4 === g) {
      var h = d.stateNode.containerInfo;
      if (h === e || 8 === h.nodeType && h.parentNode === e) break;
      if (4 === g) for (g = d.return; null !== g;) {
        var k = g.tag;
        if (3 === k || 4 === k) if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
        g = g.return;
      }

      for (; null !== h;) {
        g = wc(h);
        if (null === g) return;
        k = g.tag;

        if (5 === k || 6 === k) {
          d = f = g;
          continue a;
        }

        h = h.parentNode;
      }
    }

    d = d.return;
  }
  Nb(function () {
    var d = f,
        e = xb(c),
        g = [];

    a: {
      var h = Mc.get(a);

      if (void 0 !== h) {
        var k = td,
            x = a;

        switch (a) {
          case "keypress":
            if (0 === od(c)) break a;

          case "keydown":
          case "keyup":
            k = Rd;
            break;

          case "focusin":
            x = "focus";
            k = Fd;
            break;

          case "focusout":
            x = "blur";
            k = Fd;
            break;

          case "beforeblur":
          case "afterblur":
            k = Fd;
            break;

          case "click":
            if (2 === c.button) break a;

          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k = Bd;
            break;

          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k = Dd;
            break;

          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k = Vd;
            break;

          case Ic:
          case Jc:
          case Kc:
            k = Hd;
            break;

          case Lc:
            k = Xd;
            break;

          case "scroll":
            k = vd;
            break;

          case "wheel":
            k = Zd;
            break;

          case "copy":
          case "cut":
          case "paste":
            k = Jd;
            break;

          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k = Td;
        }

        var w = 0 !== (b & 4),
            z = !w && "scroll" === a,
            u = w ? null !== h ? h + "Capture" : null : h;
        w = [];

        for (var t = d, q; null !== t;) {
          q = t;
          var v = q.stateNode;
          5 === q.tag && null !== v && (q = v, null !== u && (v = Ob(t, u), null != v && w.push(ef(t, v, q))));
          if (z) break;
          t = t.return;
        }

        0 < w.length && (h = new k(h, x, null, c, e), g.push({
          event: h,
          listeners: w
        }));
      }
    }

    if (0 === (b & 7)) {
      a: {
        h = "mouseover" === a || "pointerover" === a;
        k = "mouseout" === a || "pointerout" === a;
        if (h && 0 === (b & 16) && (x = c.relatedTarget || c.fromElement) && (wc(x) || x[ff])) break a;

        if (k || h) {
          h = e.window === e ? e : (h = e.ownerDocument) ? h.defaultView || h.parentWindow : window;

          if (k) {
            if (x = c.relatedTarget || c.toElement, k = d, x = x ? wc(x) : null, null !== x && (z = Zb(x), x !== z || 5 !== x.tag && 6 !== x.tag)) x = null;
          } else k = null, x = d;

          if (k !== x) {
            w = Bd;
            v = "onMouseLeave";
            u = "onMouseEnter";
            t = "mouse";
            if ("pointerout" === a || "pointerover" === a) w = Td, v = "onPointerLeave", u = "onPointerEnter", t = "pointer";
            z = null == k ? h : ue(k);
            q = null == x ? h : ue(x);
            h = new w(v, t + "leave", k, c, e);
            h.target = z;
            h.relatedTarget = q;
            v = null;
            wc(e) === d && (w = new w(u, t + "enter", x, c, e), w.target = q, w.relatedTarget = z, v = w);
            z = v;
            if (k && x) b: {
              w = k;
              u = x;
              t = 0;

              for (q = w; q; q = gf(q)) t++;

              q = 0;

              for (v = u; v; v = gf(v)) q++;

              for (; 0 < t - q;) w = gf(w), t--;

              for (; 0 < q - t;) u = gf(u), q--;

              for (; t--;) {
                if (w === u || null !== u && w === u.alternate) break b;
                w = gf(w);
                u = gf(u);
              }

              w = null;
            } else w = null;
            null !== k && hf(g, h, k, w, !1);
            null !== x && null !== z && hf(g, z, x, w, !0);
          }
        }
      }

      a: {
        h = d ? ue(d) : window;
        k = h.nodeName && h.nodeName.toLowerCase();
        if ("select" === k || "input" === k && "file" === h.type) var J = ve;else if (me(h)) {
          if (we) J = Fe;else {
            J = De;
            var K = Ce;
          }
        } else (k = h.nodeName) && "input" === k.toLowerCase() && ("checkbox" === h.type || "radio" === h.type) && (J = Ee);

        if (J && (J = J(a, d))) {
          ne(g, J, c, e);
          break a;
        }

        K && K(a, h, d);
        "focusout" === a && (K = h._wrapperState) && K.controlled && "number" === h.type && bb(h, "number", h.value);
      }

      K = d ? ue(d) : window;

      switch (a) {
        case "focusin":
          if (me(K) || "true" === K.contentEditable) Qe = K, Re = d, Se = null;
          break;

        case "focusout":
          Se = Re = Qe = null;
          break;

        case "mousedown":
          Te = !0;
          break;

        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = !1;
          Ue(g, c, e);
          break;

        case "selectionchange":
          if (Pe) break;

        case "keydown":
        case "keyup":
          Ue(g, c, e);
      }

      var Q;
      if (ae) b: {
        switch (a) {
          case "compositionstart":
            var L = "onCompositionStart";
            break b;

          case "compositionend":
            L = "onCompositionEnd";
            break b;

          case "compositionupdate":
            L = "onCompositionUpdate";
            break b;
        }

        L = void 0;
      } else ie ? ge(a, c) && (L = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (L = "onCompositionStart");
      L && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== L ? "onCompositionEnd" === L && ie && (Q = nd()) : (kd = e, ld = "value" in kd ? kd.value : kd.textContent, ie = !0)), K = oe(d, L), 0 < K.length && (L = new Ld(L, a, null, c, e), g.push({
        event: L,
        listeners: K
      }), Q ? L.data = Q : (Q = he(c), null !== Q && (L.data = Q))));
      if (Q = ce ? je(a, c) : ke(a, c)) d = oe(d, "onBeforeInput"), 0 < d.length && (e = new Ld("onBeforeInput", "beforeinput", null, c, e), g.push({
        event: e,
        listeners: d
      }), e.data = Q);
    }

    se(g, b);
  });
}

function ef(a, b, c) {
  return {
    instance: a,
    listener: b,
    currentTarget: c
  };
}

function oe(a, b) {
  for (var c = b + "Capture", d = []; null !== a;) {
    var e = a,
        f = e.stateNode;
    5 === e.tag && null !== f && (e = f, f = Ob(a, c), null != f && d.unshift(ef(a, f, e)), f = Ob(a, b), null != f && d.push(ef(a, f, e)));
    a = a.return;
  }

  return d;
}

function gf(a) {
  if (null === a) return null;

  do a = a.return; while (a && 5 !== a.tag);

  return a ? a : null;
}

function hf(a, b, c, d, e) {
  for (var f = b._reactName, g = []; null !== c && c !== d;) {
    var h = c,
        k = h.alternate,
        l = h.stateNode;
    if (null !== k && k === d) break;
    5 === h.tag && null !== l && (h = l, e ? (k = Ob(c, f), null != k && g.unshift(ef(c, k, h))) : e || (k = Ob(c, f), null != k && g.push(ef(c, k, h))));
    c = c.return;
  }

  0 !== g.length && a.push({
    event: b,
    listeners: g
  });
}

function jf() {}

var kf = null,
    lf = null;

function mf(a, b) {
  switch (a) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!b.autoFocus;
  }

  return !1;
}

function nf(a, b) {
  return "textarea" === a || "option" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}

var of = "function" === typeof setTimeout ? setTimeout : void 0,
    pf = "function" === typeof clearTimeout ? clearTimeout : void 0;

function qf(a) {
  1 === a.nodeType ? a.textContent = "" : 9 === a.nodeType && (a = a.body, null != a && (a.textContent = ""));
}

function rf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b) break;
  }

  return a;
}

function sf(a) {
  a = a.previousSibling;

  for (var b = 0; a;) {
    if (8 === a.nodeType) {
      var c = a.data;

      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b) return a;
        b--;
      } else "/$" === c && b++;
    }

    a = a.previousSibling;
  }

  return null;
}

var tf = 0;

function uf(a) {
  return {
    $$typeof: Ga,
    toString: a,
    valueOf: a
  };
}

var vf = Math.random().toString(36).slice(2),
    wf = "__reactFiber$" + vf,
    xf = "__reactProps$" + vf,
    ff = "__reactContainer$" + vf,
    yf = "__reactEvents$" + vf;

function wc(a) {
  var b = a[wf];
  if (b) return b;

  for (var c = a.parentNode; c;) {
    if (b = c[ff] || c[wf]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child) for (a = sf(a); null !== a;) {
        if (c = a[wf]) return c;
        a = sf(a);
      }
      return b;
    }

    a = c;
    c = a.parentNode;
  }

  return null;
}

function Cb(a) {
  a = a[wf] || a[ff];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}

function ue(a) {
  if (5 === a.tag || 6 === a.tag) return a.stateNode;
  throw Error(y(33));
}

function Db(a) {
  return a[xf] || null;
}

function $e(a) {
  var b = a[yf];
  void 0 === b && (b = a[yf] = new Set());
  return b;
}

var zf = [],
    Af = -1;

function Bf(a) {
  return {
    current: a
  };
}

function H(a) {
  0 > Af || (a.current = zf[Af], zf[Af] = null, Af--);
}

function I(a, b) {
  Af++;
  zf[Af] = a.current;
  a.current = b;
}

var Cf = {},
    M = Bf(Cf),
    N = Bf(!1),
    Df = Cf;

function Ef(a, b) {
  var c = a.type.contextTypes;
  if (!c) return Cf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
  var e = {},
      f;

  for (f in c) e[f] = b[f];

  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}

function Ff(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}

function Gf() {
  H(N);
  H(M);
}

function Hf(a, b, c) {
  if (M.current !== Cf) throw Error(y(168));
  I(M, b);
  I(N, c);
}

function If(a, b, c) {
  var d = a.stateNode;
  a = b.childContextTypes;
  if ("function" !== typeof d.getChildContext) return c;
  d = d.getChildContext();

  for (var e in d) if (!(e in a)) throw Error(y(108, Ra(b) || "Unknown", e));

  return objectAssign({}, c, d);
}

function Jf(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Cf;
  Df = M.current;
  I(M, a);
  I(N, N.current);
  return !0;
}

function Kf(a, b, c) {
  var d = a.stateNode;
  if (!d) throw Error(y(169));
  c ? (a = If(a, b, Df), d.__reactInternalMemoizedMergedChildContext = a, H(N), H(M), I(M, a)) : H(N);
  I(N, c);
}

var Lf = null,
    Mf = null,
    Nf = scheduler.unstable_runWithPriority,
    Of = scheduler.unstable_scheduleCallback,
    Pf = scheduler.unstable_cancelCallback,
    Qf = scheduler.unstable_shouldYield,
    Rf = scheduler.unstable_requestPaint,
    Sf = scheduler.unstable_now,
    Tf = scheduler.unstable_getCurrentPriorityLevel,
    Uf = scheduler.unstable_ImmediatePriority,
    Vf = scheduler.unstable_UserBlockingPriority,
    Wf = scheduler.unstable_NormalPriority,
    Xf = scheduler.unstable_LowPriority,
    Yf = scheduler.unstable_IdlePriority,
    Zf = {},
    $f = void 0 !== Rf ? Rf : function () {},
    ag = null,
    bg = null,
    cg = !1,
    dg = Sf(),
    O = 1E4 > dg ? Sf : function () {
  return Sf() - dg;
};

function eg() {
  switch (Tf()) {
    case Uf:
      return 99;

    case Vf:
      return 98;

    case Wf:
      return 97;

    case Xf:
      return 96;

    case Yf:
      return 95;

    default:
      throw Error(y(332));
  }
}

function fg(a) {
  switch (a) {
    case 99:
      return Uf;

    case 98:
      return Vf;

    case 97:
      return Wf;

    case 96:
      return Xf;

    case 95:
      return Yf;

    default:
      throw Error(y(332));
  }
}

function gg(a, b) {
  a = fg(a);
  return Nf(a, b);
}

function hg(a, b, c) {
  a = fg(a);
  return Of(a, b, c);
}

function ig() {
  if (null !== bg) {
    var a = bg;
    bg = null;
    Pf(a);
  }

  jg();
}

function jg() {
  if (!cg && null !== ag) {
    cg = !0;
    var a = 0;

    try {
      var b = ag;
      gg(99, function () {
        for (; a < b.length; a++) {
          var c = b[a];

          do c = c(!0); while (null !== c);
        }
      });
      ag = null;
    } catch (c) {
      throw null !== ag && (ag = ag.slice(a + 1)), Of(Uf, ig), c;
    } finally {
      cg = !1;
    }
  }
}

var kg = ra.ReactCurrentBatchConfig;

function lg(a, b) {
  if (a && a.defaultProps) {
    b = objectAssign({}, b);
    a = a.defaultProps;

    for (var c in a) void 0 === b[c] && (b[c] = a[c]);

    return b;
  }

  return b;
}

var mg = Bf(null),
    ng = null,
    og = null,
    pg = null;

function qg() {
  pg = og = ng = null;
}

function rg(a) {
  var b = mg.current;
  H(mg);
  a.type._context._currentValue = b;
}

function sg(a, b) {
  for (; null !== a;) {
    var c = a.alternate;
    if ((a.childLanes & b) === b) {
      if (null === c || (c.childLanes & b) === b) break;else c.childLanes |= b;
    } else a.childLanes |= b, null !== c && (c.childLanes |= b);
    a = a.return;
  }
}

function tg(a, b) {
  ng = a;
  pg = og = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (ug = !0), a.firstContext = null);
}

function vg(a, b) {
  if (pg !== a && !1 !== b && 0 !== b) {
    if ("number" !== typeof b || 1073741823 === b) pg = a, b = 1073741823;
    b = {
      context: a,
      observedBits: b,
      next: null
    };

    if (null === og) {
      if (null === ng) throw Error(y(308));
      og = b;
      ng.dependencies = {
        lanes: 0,
        firstContext: b,
        responders: null
      };
    } else og = og.next = b;
  }

  return a._currentValue;
}

var wg = !1;

function xg(a) {
  a.updateQueue = {
    baseState: a.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null
    },
    effects: null
  };
}

function yg(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = {
    baseState: a.baseState,
    firstBaseUpdate: a.firstBaseUpdate,
    lastBaseUpdate: a.lastBaseUpdate,
    shared: a.shared,
    effects: a.effects
  });
}

function zg(a, b) {
  return {
    eventTime: a,
    lane: b,
    tag: 0,
    payload: null,
    callback: null,
    next: null
  };
}

function Ag(a, b) {
  a = a.updateQueue;

  if (null !== a) {
    a = a.shared;
    var c = a.pending;
    null === c ? b.next = b : (b.next = c.next, c.next = b);
    a.pending = b;
  }
}

function Bg(a, b) {
  var c = a.updateQueue,
      d = a.alternate;

  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null,
        f = null;
    c = c.firstBaseUpdate;

    if (null !== c) {
      do {
        var g = {
          eventTime: c.eventTime,
          lane: c.lane,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        };
        null === f ? e = f = g : f = f.next = g;
        c = c.next;
      } while (null !== c);

      null === f ? e = f = b : f = f.next = b;
    } else e = f = b;

    c = {
      baseState: d.baseState,
      firstBaseUpdate: e,
      lastBaseUpdate: f,
      shared: d.shared,
      effects: d.effects
    };
    a.updateQueue = c;
    return;
  }

  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}

function Cg(a, b, c, d) {
  var e = a.updateQueue;
  wg = !1;
  var f = e.firstBaseUpdate,
      g = e.lastBaseUpdate,
      h = e.shared.pending;

  if (null !== h) {
    e.shared.pending = null;
    var k = h,
        l = k.next;
    k.next = null;
    null === g ? f = l : g.next = l;
    g = k;
    var n = a.alternate;

    if (null !== n) {
      n = n.updateQueue;
      var A = n.lastBaseUpdate;
      A !== g && (null === A ? n.firstBaseUpdate = l : A.next = l, n.lastBaseUpdate = k);
    }
  }

  if (null !== f) {
    A = e.baseState;
    g = 0;
    n = l = k = null;

    do {
      h = f.lane;
      var p = f.eventTime;

      if ((d & h) === h) {
        null !== n && (n = n.next = {
          eventTime: p,
          lane: 0,
          tag: f.tag,
          payload: f.payload,
          callback: f.callback,
          next: null
        });

        a: {
          var C = a,
              x = f;
          h = b;
          p = c;

          switch (x.tag) {
            case 1:
              C = x.payload;

              if ("function" === typeof C) {
                A = C.call(p, A, h);
                break a;
              }

              A = C;
              break a;

            case 3:
              C.flags = C.flags & -4097 | 64;

            case 0:
              C = x.payload;
              h = "function" === typeof C ? C.call(p, A, h) : C;
              if (null === h || void 0 === h) break a;
              A = objectAssign({}, A, h);
              break a;

            case 2:
              wg = !0;
          }
        }

        null !== f.callback && (a.flags |= 32, h = e.effects, null === h ? e.effects = [f] : h.push(f));
      } else p = {
        eventTime: p,
        lane: h,
        tag: f.tag,
        payload: f.payload,
        callback: f.callback,
        next: null
      }, null === n ? (l = n = p, k = A) : n = n.next = p, g |= h;

      f = f.next;
      if (null === f) if (h = e.shared.pending, null === h) break;else f = h.next, h.next = null, e.lastBaseUpdate = h, e.shared.pending = null;
    } while (1);

    null === n && (k = A);
    e.baseState = k;
    e.firstBaseUpdate = l;
    e.lastBaseUpdate = n;
    Dg |= g;
    a.lanes = g;
    a.memoizedState = A;
  }
}

function Eg(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a) for (b = 0; b < a.length; b++) {
    var d = a[b],
        e = d.callback;

    if (null !== e) {
      d.callback = null;
      d = c;
      if ("function" !== typeof e) throw Error(y(191, e));
      e.call(d);
    }
  }
}

var Fg = new react.Component().refs;

function Gg(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : objectAssign({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}

var Kg = {
  isMounted: function (a) {
    return (a = a._reactInternals) ? Zb(a) === a : !1;
  },
  enqueueSetState: function (a, b, c) {
    a = a._reactInternals;
    var d = Hg(),
        e = Ig(a),
        f = zg(d, e);
    f.payload = b;
    void 0 !== c && null !== c && (f.callback = c);
    Ag(a, f);
    Jg(a, e, d);
  },
  enqueueReplaceState: function (a, b, c) {
    a = a._reactInternals;
    var d = Hg(),
        e = Ig(a),
        f = zg(d, e);
    f.tag = 1;
    f.payload = b;
    void 0 !== c && null !== c && (f.callback = c);
    Ag(a, f);
    Jg(a, e, d);
  },
  enqueueForceUpdate: function (a, b) {
    a = a._reactInternals;
    var c = Hg(),
        d = Ig(a),
        e = zg(c, d);
    e.tag = 2;
    void 0 !== b && null !== b && (e.callback = b);
    Ag(a, e);
    Jg(a, d, c);
  }
};

function Lg(a, b, c, d, e, f, g) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Je(c, d) || !Je(e, f) : !0;
}

function Mg(a, b, c) {
  var d = !1,
      e = Cf;
  var f = b.contextType;
  "object" === typeof f && null !== f ? f = vg(f) : (e = Ff(b) ? Df : M.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Ef(a, e) : Cf);
  b = new b(c, f);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Kg;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
  return b;
}

function Ng(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && Kg.enqueueReplaceState(b, b.state, null);
}

function Og(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = Fg;
  xg(a);
  var f = b.contextType;
  "object" === typeof f && null !== f ? e.context = vg(f) : (f = Ff(b) ? Df : M.current, e.context = Ef(a, f));
  Cg(a, c, e, d);
  e.state = a.memoizedState;
  f = b.getDerivedStateFromProps;
  "function" === typeof f && (Gg(a, b, f, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Kg.enqueueReplaceState(e, e.state, null), Cg(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4);
}

var Pg = Array.isArray;

function Qg(a, b, c) {
  a = c.ref;

  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;

      if (c) {
        if (1 !== c.tag) throw Error(y(309));
        var d = c.stateNode;
      }

      if (!d) throw Error(y(147, a));
      var e = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === e) return b.ref;

      b = function (a) {
        var b = d.refs;
        b === Fg && (b = d.refs = {});
        null === a ? delete b[e] : b[e] = a;
      };

      b._stringRef = e;
      return b;
    }

    if ("string" !== typeof a) throw Error(y(284));
    if (!c._owner) throw Error(y(290, a));
  }

  return a;
}

function Rg(a, b) {
  if ("textarea" !== a.type) throw Error(y(31, "[object Object]" === Object.prototype.toString.call(b) ? "object with keys {" + Object.keys(b).join(", ") + "}" : b));
}

function Sg(a) {
  function b(b, c) {
    if (a) {
      var d = b.lastEffect;
      null !== d ? (d.nextEffect = c, b.lastEffect = c) : b.firstEffect = b.lastEffect = c;
      c.nextEffect = null;
      c.flags = 8;
    }
  }

  function c(c, d) {
    if (!a) return null;

    for (; null !== d;) b(c, d), d = d.sibling;

    return null;
  }

  function d(a, b) {
    for (a = new Map(); null !== b;) null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;

    return a;
  }

  function e(a, b) {
    a = Tg(a, b);
    a.index = 0;
    a.sibling = null;
    return a;
  }

  function f(b, c, d) {
    b.index = d;
    if (!a) return c;
    d = b.alternate;
    if (null !== d) return d = d.index, d < c ? (b.flags = 2, c) : d;
    b.flags = 2;
    return c;
  }

  function g(b) {
    a && null === b.alternate && (b.flags = 2);
    return b;
  }

  function h(a, b, c, d) {
    if (null === b || 6 !== b.tag) return b = Ug(c, a.mode, d), b.return = a, b;
    b = e(b, c);
    b.return = a;
    return b;
  }

  function k(a, b, c, d) {
    if (null !== b && b.elementType === c.type) return d = e(b, c.props), d.ref = Qg(a, b, c), d.return = a, d;
    d = Vg(c.type, c.key, c.props, null, a.mode, d);
    d.ref = Qg(a, b, c);
    d.return = a;
    return d;
  }

  function l(a, b, c, d) {
    if (null === b || 4 !== b.tag || b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = Wg(c, a.mode, d), b.return = a, b;
    b = e(b, c.children || []);
    b.return = a;
    return b;
  }

  function n(a, b, c, d, f) {
    if (null === b || 7 !== b.tag) return b = Xg(c, a.mode, d, f), b.return = a, b;
    b = e(b, c);
    b.return = a;
    return b;
  }

  function A(a, b, c) {
    if ("string" === typeof b || "number" === typeof b) return b = Ug("" + b, a.mode, c), b.return = a, b;

    if ("object" === typeof b && null !== b) {
      switch (b.$$typeof) {
        case sa:
          return c = Vg(b.type, b.key, b.props, null, a.mode, c), c.ref = Qg(a, null, b), c.return = a, c;

        case ta:
          return b = Wg(b, a.mode, c), b.return = a, b;
      }

      if (Pg(b) || La(b)) return b = Xg(b, a.mode, c, null), b.return = a, b;
      Rg(a, b);
    }

    return null;
  }

  function p(a, b, c, d) {
    var e = null !== b ? b.key : null;
    if ("string" === typeof c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);

    if ("object" === typeof c && null !== c) {
      switch (c.$$typeof) {
        case sa:
          return c.key === e ? c.type === ua ? n(a, b, c.props.children, d, e) : k(a, b, c, d) : null;

        case ta:
          return c.key === e ? l(a, b, c, d) : null;
      }

      if (Pg(c) || La(c)) return null !== e ? null : n(a, b, c, d, null);
      Rg(a, c);
    }

    return null;
  }

  function C(a, b, c, d, e) {
    if ("string" === typeof d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);

    if ("object" === typeof d && null !== d) {
      switch (d.$$typeof) {
        case sa:
          return a = a.get(null === d.key ? c : d.key) || null, d.type === ua ? n(b, a, d.props.children, e, d.key) : k(b, a, d, e);

        case ta:
          return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);
      }

      if (Pg(d) || La(d)) return a = a.get(c) || null, n(b, a, d, e, null);
      Rg(b, d);
    }

    return null;
  }

  function x(e, g, h, k) {
    for (var l = null, t = null, u = g, z = g = 0, q = null; null !== u && z < h.length; z++) {
      u.index > z ? (q = u, u = null) : q = u.sibling;
      var n = p(e, u, h[z], k);

      if (null === n) {
        null === u && (u = q);
        break;
      }

      a && u && null === n.alternate && b(e, u);
      g = f(n, g, z);
      null === t ? l = n : t.sibling = n;
      t = n;
      u = q;
    }

    if (z === h.length) return c(e, u), l;

    if (null === u) {
      for (; z < h.length; z++) u = A(e, h[z], k), null !== u && (g = f(u, g, z), null === t ? l = u : t.sibling = u, t = u);

      return l;
    }

    for (u = d(e, u); z < h.length; z++) q = C(u, e, z, h[z], k), null !== q && (a && null !== q.alternate && u.delete(null === q.key ? z : q.key), g = f(q, g, z), null === t ? l = q : t.sibling = q, t = q);

    a && u.forEach(function (a) {
      return b(e, a);
    });
    return l;
  }

  function w(e, g, h, k) {
    var l = La(h);
    if ("function" !== typeof l) throw Error(y(150));
    h = l.call(h);
    if (null == h) throw Error(y(151));

    for (var t = l = null, u = g, z = g = 0, q = null, n = h.next(); null !== u && !n.done; z++, n = h.next()) {
      u.index > z ? (q = u, u = null) : q = u.sibling;
      var w = p(e, u, n.value, k);

      if (null === w) {
        null === u && (u = q);
        break;
      }

      a && u && null === w.alternate && b(e, u);
      g = f(w, g, z);
      null === t ? l = w : t.sibling = w;
      t = w;
      u = q;
    }

    if (n.done) return c(e, u), l;

    if (null === u) {
      for (; !n.done; z++, n = h.next()) n = A(e, n.value, k), null !== n && (g = f(n, g, z), null === t ? l = n : t.sibling = n, t = n);

      return l;
    }

    for (u = d(e, u); !n.done; z++, n = h.next()) n = C(u, e, z, n.value, k), null !== n && (a && null !== n.alternate && u.delete(null === n.key ? z : n.key), g = f(n, g, z), null === t ? l = n : t.sibling = n, t = n);

    a && u.forEach(function (a) {
      return b(e, a);
    });
    return l;
  }

  return function (a, d, f, h) {
    var k = "object" === typeof f && null !== f && f.type === ua && null === f.key;
    k && (f = f.props.children);
    var l = "object" === typeof f && null !== f;
    if (l) switch (f.$$typeof) {
      case sa:
        a: {
          l = f.key;

          for (k = d; null !== k;) {
            if (k.key === l) {
              switch (k.tag) {
                case 7:
                  if (f.type === ua) {
                    c(a, k.sibling);
                    d = e(k, f.props.children);
                    d.return = a;
                    a = d;
                    break a;
                  }

                  break;

                default:
                  if (k.elementType === f.type) {
                    c(a, k.sibling);
                    d = e(k, f.props);
                    d.ref = Qg(a, k, f);
                    d.return = a;
                    a = d;
                    break a;
                  }

              }

              c(a, k);
              break;
            } else b(a, k);

            k = k.sibling;
          }

          f.type === ua ? (d = Xg(f.props.children, a.mode, h, f.key), d.return = a, a = d) : (h = Vg(f.type, f.key, f.props, null, a.mode, h), h.ref = Qg(a, d, f), h.return = a, a = h);
        }

        return g(a);

      case ta:
        a: {
          for (k = f.key; null !== d;) {
            if (d.key === k) {
              if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                c(a, d.sibling);
                d = e(d, f.children || []);
                d.return = a;
                a = d;
                break a;
              } else {
                c(a, d);
                break;
              }
            } else b(a, d);
            d = d.sibling;
          }

          d = Wg(f, a.mode, h);
          d.return = a;
          a = d;
        }

        return g(a);
    }
    if ("string" === typeof f || "number" === typeof f) return f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d.return = a, a = d) : (c(a, d), d = Ug(f, a.mode, h), d.return = a, a = d), g(a);
    if (Pg(f)) return x(a, d, f, h);
    if (La(f)) return w(a, d, f, h);
    l && Rg(a, f);
    if ("undefined" === typeof f && !k) switch (a.tag) {
      case 1:
      case 22:
      case 0:
      case 11:
      case 15:
        throw Error(y(152, Ra(a.type) || "Component"));
    }
    return c(a, d);
  };
}

var Yg = Sg(!0),
    Zg = Sg(!1),
    $g = {},
    ah = Bf($g),
    bh = Bf($g),
    ch = Bf($g);

function dh(a) {
  if (a === $g) throw Error(y(174));
  return a;
}

function eh(a, b) {
  I(ch, b);
  I(bh, a);
  I(ah, $g);
  a = b.nodeType;

  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : mb(null, "");
      break;

    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = mb(b, a);
  }

  H(ah);
  I(ah, b);
}

function fh() {
  H(ah);
  H(bh);
  H(ch);
}

function gh(a) {
  dh(ch.current);
  var b = dh(ah.current);
  var c = mb(b, a.type);
  b !== c && (I(bh, a), I(ah, c));
}

function hh(a) {
  bh.current === a && (H(ah), H(bh));
}

var P = Bf(0);

function ih(a) {
  for (var b = a; null !== b;) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 64)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }

    if (b === a) break;

    for (; null === b.sibling;) {
      if (null === b.return || b.return === a) return null;
      b = b.return;
    }

    b.sibling.return = b.return;
    b = b.sibling;
  }

  return null;
}

var jh = null,
    kh = null,
    lh = !1;

function mh(a, b) {
  var c = nh(5, null, null, 0);
  c.elementType = "DELETED";
  c.type = "DELETED";
  c.stateNode = b;
  c.return = a;
  c.flags = 8;
  null !== a.lastEffect ? (a.lastEffect.nextEffect = c, a.lastEffect = c) : a.firstEffect = a.lastEffect = c;
}

function oh(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, !0) : !1;

    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, !0) : !1;

    case 13:
      return !1;

    default:
      return !1;
  }
}

function ph(a) {
  if (lh) {
    var b = kh;

    if (b) {
      var c = b;

      if (!oh(a, b)) {
        b = rf(c.nextSibling);

        if (!b || !oh(a, b)) {
          a.flags = a.flags & -1025 | 2;
          lh = !1;
          jh = a;
          return;
        }

        mh(jh, c);
      }

      jh = a;
      kh = rf(b.firstChild);
    } else a.flags = a.flags & -1025 | 2, lh = !1, jh = a;
  }
}

function qh(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) a = a.return;

  jh = a;
}

function rh(a) {
  if (a !== jh) return !1;
  if (!lh) return qh(a), lh = !0, !1;
  var b = a.type;
  if (5 !== a.tag || "head" !== b && "body" !== b && !nf(b, a.memoizedProps)) for (b = kh; b;) mh(a, b), b = rf(b.nextSibling);
  qh(a);

  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a) throw Error(y(317));

    a: {
      a = a.nextSibling;

      for (b = 0; a;) {
        if (8 === a.nodeType) {
          var c = a.data;

          if ("/$" === c) {
            if (0 === b) {
              kh = rf(a.nextSibling);
              break a;
            }

            b--;
          } else "$" !== c && "$!" !== c && "$?" !== c || b++;
        }

        a = a.nextSibling;
      }

      kh = null;
    }
  } else kh = jh ? rf(a.stateNode.nextSibling) : null;

  return !0;
}

function sh() {
  kh = jh = null;
  lh = !1;
}

var th = [];

function uh() {
  for (var a = 0; a < th.length; a++) th[a]._workInProgressVersionPrimary = null;

  th.length = 0;
}

var vh = ra.ReactCurrentDispatcher,
    wh = ra.ReactCurrentBatchConfig,
    xh = 0,
    R = null,
    S = null,
    T = null,
    yh = !1,
    zh = !1;

function Ah() {
  throw Error(y(321));
}

function Bh(a, b) {
  if (null === b) return !1;

  for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return !1;

  return !0;
}

function Ch(a, b, c, d, e, f) {
  xh = f;
  R = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  vh.current = null === a || null === a.memoizedState ? Dh : Eh;
  a = c(d, e);

  if (zh) {
    f = 0;

    do {
      zh = !1;
      if (!(25 > f)) throw Error(y(301));
      f += 1;
      T = S = null;
      b.updateQueue = null;
      vh.current = Fh;
      a = c(d, e);
    } while (zh);
  }

  vh.current = Gh;
  b = null !== S && null !== S.next;
  xh = 0;
  T = S = R = null;
  yh = !1;
  if (b) throw Error(y(300));
  return a;
}

function Hh() {
  var a = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  null === T ? R.memoizedState = T = a : T = T.next = a;
  return T;
}

function Ih() {
  if (null === S) {
    var a = R.alternate;
    a = null !== a ? a.memoizedState : null;
  } else a = S.next;

  var b = null === T ? R.memoizedState : T.next;
  if (null !== b) T = b, S = a;else {
    if (null === a) throw Error(y(310));
    S = a;
    a = {
      memoizedState: S.memoizedState,
      baseState: S.baseState,
      baseQueue: S.baseQueue,
      queue: S.queue,
      next: null
    };
    null === T ? R.memoizedState = T = a : T = T.next = a;
  }
  return T;
}

function Jh(a, b) {
  return "function" === typeof b ? b(a) : b;
}

function Kh(a) {
  var b = Ih(),
      c = b.queue;
  if (null === c) throw Error(y(311));
  c.lastRenderedReducer = a;
  var d = S,
      e = d.baseQueue,
      f = c.pending;

  if (null !== f) {
    if (null !== e) {
      var g = e.next;
      e.next = f.next;
      f.next = g;
    }

    d.baseQueue = e = f;
    c.pending = null;
  }

  if (null !== e) {
    e = e.next;
    d = d.baseState;
    var h = g = f = null,
        k = e;

    do {
      var l = k.lane;
      if ((xh & l) === l) null !== h && (h = h.next = {
        lane: 0,
        action: k.action,
        eagerReducer: k.eagerReducer,
        eagerState: k.eagerState,
        next: null
      }), d = k.eagerReducer === a ? k.eagerState : a(d, k.action);else {
        var n = {
          lane: l,
          action: k.action,
          eagerReducer: k.eagerReducer,
          eagerState: k.eagerState,
          next: null
        };
        null === h ? (g = h = n, f = d) : h = h.next = n;
        R.lanes |= l;
        Dg |= l;
      }
      k = k.next;
    } while (null !== k && k !== e);

    null === h ? f = d : h.next = g;
    He(d, b.memoizedState) || (ug = !0);
    b.memoizedState = d;
    b.baseState = f;
    b.baseQueue = h;
    c.lastRenderedState = d;
  }

  return [b.memoizedState, c.dispatch];
}

function Lh(a) {
  var b = Ih(),
      c = b.queue;
  if (null === c) throw Error(y(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch,
      e = c.pending,
      f = b.memoizedState;

  if (null !== e) {
    c.pending = null;
    var g = e = e.next;

    do f = a(f, g.action), g = g.next; while (g !== e);

    He(f, b.memoizedState) || (ug = !0);
    b.memoizedState = f;
    null === b.baseQueue && (b.baseState = f);
    c.lastRenderedState = f;
  }

  return [f, d];
}

function Mh(a, b, c) {
  var d = b._getVersion;
  d = d(b._source);
  var e = b._workInProgressVersionPrimary;
  if (null !== e) a = e === d;else if (a = a.mutableReadLanes, a = (xh & a) === a) b._workInProgressVersionPrimary = d, th.push(b);
  if (a) return c(b._source);
  th.push(b);
  throw Error(y(350));
}

function Nh(a, b, c, d) {
  var e = U;
  if (null === e) throw Error(y(349));
  var f = b._getVersion,
      g = f(b._source),
      h = vh.current,
      k = h.useState(function () {
    return Mh(e, b, c);
  }),
      l = k[1],
      n = k[0];
  k = T;
  var A = a.memoizedState,
      p = A.refs,
      C = p.getSnapshot,
      x = A.source;
  A = A.subscribe;
  var w = R;
  a.memoizedState = {
    refs: p,
    source: b,
    subscribe: d
  };
  h.useEffect(function () {
    p.getSnapshot = c;
    p.setSnapshot = l;
    var a = f(b._source);

    if (!He(g, a)) {
      a = c(b._source);
      He(n, a) || (l(a), a = Ig(w), e.mutableReadLanes |= a & e.pendingLanes);
      a = e.mutableReadLanes;
      e.entangledLanes |= a;

      for (var d = e.entanglements, h = a; 0 < h;) {
        var k = 31 - Vc(h),
            v = 1 << k;
        d[k] |= a;
        h &= ~v;
      }
    }
  }, [c, b, d]);
  h.useEffect(function () {
    return d(b._source, function () {
      var a = p.getSnapshot,
          c = p.setSnapshot;

      try {
        c(a(b._source));
        var d = Ig(w);
        e.mutableReadLanes |= d & e.pendingLanes;
      } catch (q) {
        c(function () {
          throw q;
        });
      }
    });
  }, [b, d]);
  He(C, c) && He(x, b) && He(A, d) || (a = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: Jh,
    lastRenderedState: n
  }, a.dispatch = l = Oh.bind(null, R, a), k.queue = a, k.baseQueue = null, n = Mh(e, b, c), k.memoizedState = k.baseState = n);
  return n;
}

function Ph(a, b, c) {
  var d = Ih();
  return Nh(d, a, b, c);
}

function Qh(a) {
  var b = Hh();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = b.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: Jh,
    lastRenderedState: a
  };
  a = a.dispatch = Oh.bind(null, R, a);
  return [b.memoizedState, a];
}

function Rh(a, b, c, d) {
  a = {
    tag: a,
    create: b,
    destroy: c,
    deps: d,
    next: null
  };
  b = R.updateQueue;
  null === b ? (b = {
    lastEffect: null
  }, R.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}

function Sh(a) {
  var b = Hh();
  a = {
    current: a
  };
  return b.memoizedState = a;
}

function Th() {
  return Ih().memoizedState;
}

function Uh(a, b, c, d) {
  var e = Hh();
  R.flags |= a;
  e.memoizedState = Rh(1 | b, c, void 0, void 0 === d ? null : d);
}

function Vh(a, b, c, d) {
  var e = Ih();
  d = void 0 === d ? null : d;
  var f = void 0;

  if (null !== S) {
    var g = S.memoizedState;
    f = g.destroy;

    if (null !== d && Bh(d, g.deps)) {
      Rh(b, c, f, d);
      return;
    }
  }

  R.flags |= a;
  e.memoizedState = Rh(1 | b, c, f, d);
}

function Wh(a, b) {
  return Uh(516, 4, a, b);
}

function Xh(a, b) {
  return Vh(516, 4, a, b);
}

function Yh(a, b) {
  return Vh(4, 2, a, b);
}

function Zh(a, b) {
  if ("function" === typeof b) return a = a(), b(a), function () {
    b(null);
  };
  if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {
    b.current = null;
  };
}

function $h(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return Vh(4, 2, Zh.bind(null, b, a), c);
}

function ai() {}

function bi(a, b) {
  var c = Ih();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Bh(b, d[1])) return d[0];
  c.memoizedState = [a, b];
  return a;
}

function ci(a, b) {
  var c = Ih();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Bh(b, d[1])) return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}

function di(a, b) {
  var c = eg();
  gg(98 > c ? 98 : c, function () {
    a(!0);
  });
  gg(97 < c ? 97 : c, function () {
    var c = wh.transition;
    wh.transition = 1;

    try {
      a(!1), b();
    } finally {
      wh.transition = c;
    }
  });
}

function Oh(a, b, c) {
  var d = Hg(),
      e = Ig(a),
      f = {
    lane: e,
    action: c,
    eagerReducer: null,
    eagerState: null,
    next: null
  },
      g = b.pending;
  null === g ? f.next = f : (f.next = g.next, g.next = f);
  b.pending = f;
  g = a.alternate;
  if (a === R || null !== g && g === R) zh = yh = !0;else {
    if (0 === a.lanes && (null === g || 0 === g.lanes) && (g = b.lastRenderedReducer, null !== g)) try {
      var h = b.lastRenderedState,
          k = g(h, c);
      f.eagerReducer = g;
      f.eagerState = k;
      if (He(k, h)) return;
    } catch (l) {} finally {}
    Jg(a, e, d);
  }
}

var Gh = {
  readContext: vg,
  useCallback: Ah,
  useContext: Ah,
  useEffect: Ah,
  useImperativeHandle: Ah,
  useLayoutEffect: Ah,
  useMemo: Ah,
  useReducer: Ah,
  useRef: Ah,
  useState: Ah,
  useDebugValue: Ah,
  useDeferredValue: Ah,
  useTransition: Ah,
  useMutableSource: Ah,
  useOpaqueIdentifier: Ah,
  unstable_isNewReconciler: !1
},
    Dh = {
  readContext: vg,
  useCallback: function (a, b) {
    Hh().memoizedState = [a, void 0 === b ? null : b];
    return a;
  },
  useContext: vg,
  useEffect: Wh,
  useImperativeHandle: function (a, b, c) {
    c = null !== c && void 0 !== c ? c.concat([a]) : null;
    return Uh(4, 2, Zh.bind(null, b, a), c);
  },
  useLayoutEffect: function (a, b) {
    return Uh(4, 2, a, b);
  },
  useMemo: function (a, b) {
    var c = Hh();
    b = void 0 === b ? null : b;
    a = a();
    c.memoizedState = [a, b];
    return a;
  },
  useReducer: function (a, b, c) {
    var d = Hh();
    b = void 0 !== c ? c(b) : b;
    d.memoizedState = d.baseState = b;
    a = d.queue = {
      pending: null,
      dispatch: null,
      lastRenderedReducer: a,
      lastRenderedState: b
    };
    a = a.dispatch = Oh.bind(null, R, a);
    return [d.memoizedState, a];
  },
  useRef: Sh,
  useState: Qh,
  useDebugValue: ai,
  useDeferredValue: function (a) {
    var b = Qh(a),
        c = b[0],
        d = b[1];
    Wh(function () {
      var b = wh.transition;
      wh.transition = 1;

      try {
        d(a);
      } finally {
        wh.transition = b;
      }
    }, [a]);
    return c;
  },
  useTransition: function () {
    var a = Qh(!1),
        b = a[0];
    a = di.bind(null, a[1]);
    Sh(a);
    return [a, b];
  },
  useMutableSource: function (a, b, c) {
    var d = Hh();
    d.memoizedState = {
      refs: {
        getSnapshot: b,
        setSnapshot: null
      },
      source: a,
      subscribe: c
    };
    return Nh(d, a, b, c);
  },
  useOpaqueIdentifier: function () {
    if (lh) {
      var a = !1,
          b = uf(function () {
        a || (a = !0, c("r:" + (tf++).toString(36)));
        throw Error(y(355));
      }),
          c = Qh(b)[1];
      0 === (R.mode & 2) && (R.flags |= 516, Rh(5, function () {
        c("r:" + (tf++).toString(36));
      }, void 0, null));
      return b;
    }

    b = "r:" + (tf++).toString(36);
    Qh(b);
    return b;
  },
  unstable_isNewReconciler: !1
},
    Eh = {
  readContext: vg,
  useCallback: bi,
  useContext: vg,
  useEffect: Xh,
  useImperativeHandle: $h,
  useLayoutEffect: Yh,
  useMemo: ci,
  useReducer: Kh,
  useRef: Th,
  useState: function () {
    return Kh(Jh);
  },
  useDebugValue: ai,
  useDeferredValue: function (a) {
    var b = Kh(Jh),
        c = b[0],
        d = b[1];
    Xh(function () {
      var b = wh.transition;
      wh.transition = 1;

      try {
        d(a);
      } finally {
        wh.transition = b;
      }
    }, [a]);
    return c;
  },
  useTransition: function () {
    var a = Kh(Jh)[0];
    return [Th().current, a];
  },
  useMutableSource: Ph,
  useOpaqueIdentifier: function () {
    return Kh(Jh)[0];
  },
  unstable_isNewReconciler: !1
},
    Fh = {
  readContext: vg,
  useCallback: bi,
  useContext: vg,
  useEffect: Xh,
  useImperativeHandle: $h,
  useLayoutEffect: Yh,
  useMemo: ci,
  useReducer: Lh,
  useRef: Th,
  useState: function () {
    return Lh(Jh);
  },
  useDebugValue: ai,
  useDeferredValue: function (a) {
    var b = Lh(Jh),
        c = b[0],
        d = b[1];
    Xh(function () {
      var b = wh.transition;
      wh.transition = 1;

      try {
        d(a);
      } finally {
        wh.transition = b;
      }
    }, [a]);
    return c;
  },
  useTransition: function () {
    var a = Lh(Jh)[0];
    return [Th().current, a];
  },
  useMutableSource: Ph,
  useOpaqueIdentifier: function () {
    return Lh(Jh)[0];
  },
  unstable_isNewReconciler: !1
},
    ei = ra.ReactCurrentOwner,
    ug = !1;

function fi(a, b, c, d) {
  b.child = null === a ? Zg(b, null, c, d) : Yg(b, a.child, c, d);
}

function gi(a, b, c, d, e) {
  c = c.render;
  var f = b.ref;
  tg(b, e);
  d = Ch(a, b, c, d, f, e);
  if (null !== a && !ug) return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e);
  b.flags |= 1;
  fi(a, b, d, e);
  return b.child;
}

function ii(a, b, c, d, e, f) {
  if (null === a) {
    var g = c.type;
    if ("function" === typeof g && !ji(g) && void 0 === g.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = g, ki(a, b, g, d, e, f);
    a = Vg(c.type, null, d, b, b.mode, f);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }

  g = a.child;
  if (0 === (e & f) && (e = g.memoizedProps, c = c.compare, c = null !== c ? c : Je, c(e, d) && a.ref === b.ref)) return hi(a, b, f);
  b.flags |= 1;
  a = Tg(g, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}

function ki(a, b, c, d, e, f) {
  if (null !== a && Je(a.memoizedProps, d) && a.ref === b.ref) if (ug = !1, 0 !== (f & e)) 0 !== (a.flags & 16384) && (ug = !0);else return b.lanes = a.lanes, hi(a, b, f);
  return li(a, b, c, d, f);
}

function mi(a, b, c) {
  var d = b.pendingProps,
      e = d.children,
      f = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode || "unstable-defer-without-hiding" === d.mode) {
    if (0 === (b.mode & 4)) b.memoizedState = {
      baseLanes: 0
    }, ni(b, c);else if (0 !== (c & 1073741824)) b.memoizedState = {
      baseLanes: 0
    }, ni(b, null !== f ? f.baseLanes : c);else return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = {
      baseLanes: a
    }, ni(b, a), null;
  } else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, ni(b, d);
  fi(a, b, e, c);
  return b.child;
}

function oi(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 128;
}

function li(a, b, c, d, e) {
  var f = Ff(c) ? Df : M.current;
  f = Ef(b, f);
  tg(b, e);
  c = Ch(a, b, c, d, f, e);
  if (null !== a && !ug) return b.updateQueue = a.updateQueue, b.flags &= -517, a.lanes &= ~e, hi(a, b, e);
  b.flags |= 1;
  fi(a, b, c, e);
  return b.child;
}

function pi(a, b, c, d, e) {
  if (Ff(c)) {
    var f = !0;
    Jf(b);
  } else f = !1;

  tg(b, e);
  if (null === b.stateNode) null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), Mg(b, c, d), Og(b, c, d, e), d = !0;else if (null === a) {
    var g = b.stateNode,
        h = b.memoizedProps;
    g.props = h;
    var k = g.context,
        l = c.contextType;
    "object" === typeof l && null !== l ? l = vg(l) : (l = Ff(c) ? Df : M.current, l = Ef(b, l));
    var n = c.getDerivedStateFromProps,
        A = "function" === typeof n || "function" === typeof g.getSnapshotBeforeUpdate;
    A || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Ng(b, g, d, l);
    wg = !1;
    var p = b.memoizedState;
    g.state = p;
    Cg(b, d, g, e);
    k = b.memoizedState;
    h !== d || p !== k || N.current || wg ? ("function" === typeof n && (Gg(b, c, n, d), k = b.memoizedState), (h = wg || Lg(b, c, h, d, p, k, l)) ? (A || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4)) : ("function" === typeof g.componentDidMount && (b.flags |= 4), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4), d = !1);
  } else {
    g = b.stateNode;
    yg(a, b);
    h = b.memoizedProps;
    l = b.type === b.elementType ? h : lg(b.type, h);
    g.props = l;
    A = b.pendingProps;
    p = g.context;
    k = c.contextType;
    "object" === typeof k && null !== k ? k = vg(k) : (k = Ff(c) ? Df : M.current, k = Ef(b, k));
    var C = c.getDerivedStateFromProps;
    (n = "function" === typeof C || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== A || p !== k) && Ng(b, g, d, k);
    wg = !1;
    p = b.memoizedState;
    g.state = p;
    Cg(b, d, g, e);
    var x = b.memoizedState;
    h !== A || p !== x || N.current || wg ? ("function" === typeof C && (Gg(b, c, C, d), x = b.memoizedState), (l = wg || Lg(b, c, l, d, p, x, k)) ? (n || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, x, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, x, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 256)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), b.memoizedProps = d, b.memoizedState = x), g.props = d, g.state = x, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && p === a.memoizedState || (b.flags |= 256), d = !1);
  }
  return qi(a, b, c, d, f, e);
}

function qi(a, b, c, d, e, f) {
  oi(a, b);
  var g = 0 !== (b.flags & 64);
  if (!d && !g) return e && Kf(b, c, !1), hi(a, b, f);
  d = b.stateNode;
  ei.current = b;
  var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g ? (b.child = Yg(b, a.child, null, f), b.child = Yg(b, null, h, f)) : fi(a, b, h, f);
  b.memoizedState = d.state;
  e && Kf(b, c, !0);
  return b.child;
}

function ri(a) {
  var b = a.stateNode;
  b.pendingContext ? Hf(a, b.pendingContext, b.pendingContext !== b.context) : b.context && Hf(a, b.context, !1);
  eh(a, b.containerInfo);
}

var si = {
  dehydrated: null,
  retryLane: 0
};

function ti(a, b, c) {
  var d = b.pendingProps,
      e = P.current,
      f = !1,
      g;
  (g = 0 !== (b.flags & 64)) || (g = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));
  g ? (f = !0, b.flags &= -65) : null !== a && null === a.memoizedState || void 0 === d.fallback || !0 === d.unstable_avoidThisFallback || (e |= 1);
  I(P, e & 1);

  if (null === a) {
    void 0 !== d.fallback && ph(b);
    a = d.children;
    e = d.fallback;
    if (f) return a = ui(b, a, e, c), b.child.memoizedState = {
      baseLanes: c
    }, b.memoizedState = si, a;
    if ("number" === typeof d.unstable_expectedLoadTime) return a = ui(b, a, e, c), b.child.memoizedState = {
      baseLanes: c
    }, b.memoizedState = si, b.lanes = 33554432, a;
    c = vi({
      mode: "visible",
      children: a
    }, b.mode, c, null);
    c.return = b;
    return b.child = c;
  }

  if (null !== a.memoizedState) {
    if (f) return d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? {
      baseLanes: c
    } : {
      baseLanes: e.baseLanes | c
    }, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
    c = xi(a, b, d.children, c);
    b.memoizedState = null;
    return c;
  }

  if (f) return d = wi(a, b, d.children, d.fallback, c), f = b.child, e = a.child.memoizedState, f.memoizedState = null === e ? {
    baseLanes: c
  } : {
    baseLanes: e.baseLanes | c
  }, f.childLanes = a.childLanes & ~c, b.memoizedState = si, d;
  c = xi(a, b, d.children, c);
  b.memoizedState = null;
  return c;
}

function ui(a, b, c, d) {
  var e = a.mode,
      f = a.child;
  b = {
    mode: "hidden",
    children: b
  };
  0 === (e & 2) && null !== f ? (f.childLanes = 0, f.pendingProps = b) : f = vi(b, e, 0, null);
  c = Xg(c, e, d, null);
  f.return = a;
  c.return = a;
  f.sibling = c;
  a.child = f;
  return c;
}

function xi(a, b, c, d) {
  var e = a.child;
  a = e.sibling;
  c = Tg(e, {
    mode: "visible",
    children: c
  });
  0 === (b.mode & 2) && (c.lanes = d);
  c.return = b;
  c.sibling = null;
  null !== a && (a.nextEffect = null, a.flags = 8, b.firstEffect = b.lastEffect = a);
  return b.child = c;
}

function wi(a, b, c, d, e) {
  var f = b.mode,
      g = a.child;
  a = g.sibling;
  var h = {
    mode: "hidden",
    children: c
  };
  0 === (f & 2) && b.child !== g ? (c = b.child, c.childLanes = 0, c.pendingProps = h, g = c.lastEffect, null !== g ? (b.firstEffect = c.firstEffect, b.lastEffect = g, g.nextEffect = null) : b.firstEffect = b.lastEffect = null) : c = Tg(g, h);
  null !== a ? d = Tg(a, d) : (d = Xg(d, f, e, null), d.flags |= 2);
  d.return = b;
  c.return = b;
  c.sibling = d;
  b.child = c;
  return d;
}

function yi(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  sg(a.return, b);
}

function zi(a, b, c, d, e, f) {
  var g = a.memoizedState;
  null === g ? a.memoizedState = {
    isBackwards: b,
    rendering: null,
    renderingStartTime: 0,
    last: d,
    tail: c,
    tailMode: e,
    lastEffect: f
  } : (g.isBackwards = b, g.rendering = null, g.renderingStartTime = 0, g.last = d, g.tail = c, g.tailMode = e, g.lastEffect = f);
}

function Ai(a, b, c) {
  var d = b.pendingProps,
      e = d.revealOrder,
      f = d.tail;
  fi(a, b, d.children, c);
  d = P.current;
  if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 64;else {
    if (null !== a && 0 !== (a.flags & 64)) a: for (a = b.child; null !== a;) {
      if (13 === a.tag) null !== a.memoizedState && yi(a, c);else if (19 === a.tag) yi(a, c);else if (null !== a.child) {
        a.child.return = a;
        a = a.child;
        continue;
      }
      if (a === b) break a;

      for (; null === a.sibling;) {
        if (null === a.return || a.return === b) break a;
        a = a.return;
      }

      a.sibling.return = a.return;
      a = a.sibling;
    }
    d &= 1;
  }
  I(P, d);
  if (0 === (b.mode & 2)) b.memoizedState = null;else switch (e) {
    case "forwards":
      c = b.child;

      for (e = null; null !== c;) a = c.alternate, null !== a && null === ih(a) && (e = c), c = c.sibling;

      c = e;
      null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
      zi(b, !1, e, c, f, b.lastEffect);
      break;

    case "backwards":
      c = null;
      e = b.child;

      for (b.child = null; null !== e;) {
        a = e.alternate;

        if (null !== a && null === ih(a)) {
          b.child = e;
          break;
        }

        a = e.sibling;
        e.sibling = c;
        c = e;
        e = a;
      }

      zi(b, !0, c, null, f, b.lastEffect);
      break;

    case "together":
      zi(b, !1, null, null, void 0, b.lastEffect);
      break;

    default:
      b.memoizedState = null;
  }
  return b.child;
}

function hi(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  Dg |= b.lanes;

  if (0 !== (c & b.childLanes)) {
    if (null !== a && b.child !== a.child) throw Error(y(153));

    if (null !== b.child) {
      a = b.child;
      c = Tg(a, a.pendingProps);
      b.child = c;

      for (c.return = b; null !== a.sibling;) a = a.sibling, c = c.sibling = Tg(a, a.pendingProps), c.return = b;

      c.sibling = null;
    }

    return b.child;
  }

  return null;
}

var Bi, Ci, Di, Ei;

Bi = function (a, b) {
  for (var c = b.child; null !== c;) {
    if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b) break;

    for (; null === c.sibling;) {
      if (null === c.return || c.return === b) return;
      c = c.return;
    }

    c.sibling.return = c.return;
    c = c.sibling;
  }
};

Ci = function () {};

Di = function (a, b, c, d) {
  var e = a.memoizedProps;

  if (e !== d) {
    a = b.stateNode;
    dh(ah.current);
    var f = null;

    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f = [];
        break;

      case "option":
        e = eb(a, e);
        d = eb(a, d);
        f = [];
        break;

      case "select":
        e = objectAssign({}, e, {
          value: void 0
        });
        d = objectAssign({}, d, {
          value: void 0
        });
        f = [];
        break;

      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f = [];
        break;

      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = jf);
    }

    vb(c, d);
    var g;
    c = null;

    for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
      var h = e[l];

      for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
    } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ca.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));

    for (l in d) {
      var k = d[l];
      h = null != e ? e[l] : void 0;
      if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) {
        if (h) {
          for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");

          for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
        } else c || (f || (f = []), f.push(l, c)), c = k;
      } else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ca.hasOwnProperty(l) ? (null != k && "onScroll" === l && G("scroll", a), f || h === k || (f = [])) : "object" === typeof k && null !== k && k.$$typeof === Ga ? k.toString() : (f = f || []).push(l, k));
    }

    c && (f = f || []).push("style", c);
    var l = f;
    if (b.updateQueue = l) b.flags |= 4;
  }
};

Ei = function (a, b, c, d) {
  c !== d && (b.flags |= 4);
};

function Fi(a, b) {
  if (!lh) switch (a.tailMode) {
    case "hidden":
      b = a.tail;

      for (var c = null; null !== b;) null !== b.alternate && (c = b), b = b.sibling;

      null === c ? a.tail = null : c.sibling = null;
      break;

    case "collapsed":
      c = a.tail;

      for (var d = null; null !== c;) null !== c.alternate && (d = c), c = c.sibling;

      null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
  }
}

function Gi(a, b, c) {
  var d = b.pendingProps;

  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return null;

    case 1:
      return Ff(b.type) && Gf(), null;

    case 3:
      fh();
      H(N);
      H(M);
      uh();
      d = b.stateNode;
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child) rh(b) ? b.flags |= 4 : d.hydrate || (b.flags |= 256);
      Ci(b);
      return null;

    case 5:
      hh(b);
      var e = dh(ch.current);
      c = b.type;
      if (null !== a && null != b.stateNode) Di(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 128);else {
        if (!d) {
          if (null === b.stateNode) throw Error(y(166));
          return null;
        }

        a = dh(ah.current);

        if (rh(b)) {
          d = b.stateNode;
          c = b.type;
          var f = b.memoizedProps;
          d[wf] = b;
          d[xf] = f;

          switch (c) {
            case "dialog":
              G("cancel", d);
              G("close", d);
              break;

            case "iframe":
            case "object":
            case "embed":
              G("load", d);
              break;

            case "video":
            case "audio":
              for (a = 0; a < Xe.length; a++) G(Xe[a], d);

              break;

            case "source":
              G("error", d);
              break;

            case "img":
            case "image":
            case "link":
              G("error", d);
              G("load", d);
              break;

            case "details":
              G("toggle", d);
              break;

            case "input":
              Za(d, f);
              G("invalid", d);
              break;

            case "select":
              d._wrapperState = {
                wasMultiple: !!f.multiple
              };
              G("invalid", d);
              break;

            case "textarea":
              hb(d, f), G("invalid", d);
          }

          vb(c, f);
          a = null;

          for (var g in f) f.hasOwnProperty(g) && (e = f[g], "children" === g ? "string" === typeof e ? d.textContent !== e && (a = ["children", e]) : "number" === typeof e && d.textContent !== "" + e && (a = ["children", "" + e]) : ca.hasOwnProperty(g) && null != e && "onScroll" === g && G("scroll", d));

          switch (c) {
            case "input":
              Va(d);
              cb(d, f, !0);
              break;

            case "textarea":
              Va(d);
              jb(d);
              break;

            case "select":
            case "option":
              break;

            default:
              "function" === typeof f.onClick && (d.onclick = jf);
          }

          d = a;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g = 9 === e.nodeType ? e : e.ownerDocument;
          a === kb.html && (a = lb(c));
          a === kb.html ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script>\x3c/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, {
            is: d.is
          }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = !0 : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
          a[wf] = b;
          a[xf] = d;
          Bi(a, b, !1, !1);
          b.stateNode = a;
          g = wb(c, d);

          switch (c) {
            case "dialog":
              G("cancel", a);
              G("close", a);
              e = d;
              break;

            case "iframe":
            case "object":
            case "embed":
              G("load", a);
              e = d;
              break;

            case "video":
            case "audio":
              for (e = 0; e < Xe.length; e++) G(Xe[e], a);

              e = d;
              break;

            case "source":
              G("error", a);
              e = d;
              break;

            case "img":
            case "image":
            case "link":
              G("error", a);
              G("load", a);
              e = d;
              break;

            case "details":
              G("toggle", a);
              e = d;
              break;

            case "input":
              Za(a, d);
              e = Ya(a, d);
              G("invalid", a);
              break;

            case "option":
              e = eb(a, d);
              break;

            case "select":
              a._wrapperState = {
                wasMultiple: !!d.multiple
              };
              e = objectAssign({}, d, {
                value: void 0
              });
              G("invalid", a);
              break;

            case "textarea":
              hb(a, d);
              e = gb(a, d);
              G("invalid", a);
              break;

            default:
              e = d;
          }

          vb(c, e);
          var h = e;

          for (f in h) if (h.hasOwnProperty(f)) {
            var k = h[f];
            "style" === f ? tb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && ob(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && pb(a, k) : "number" === typeof k && pb(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ca.hasOwnProperty(f) ? null != k && "onScroll" === f && G("scroll", a) : null != k && qa(a, f, k, g));
          }

          switch (c) {
            case "input":
              Va(a);
              cb(a, d, !1);
              break;

            case "textarea":
              Va(a);
              jb(a);
              break;

            case "option":
              null != d.value && a.setAttribute("value", "" + Sa(d.value));
              break;

            case "select":
              a.multiple = !!d.multiple;
              f = d.value;
              null != f ? fb(a, !!d.multiple, f, !1) : null != d.defaultValue && fb(a, !!d.multiple, d.defaultValue, !0);
              break;

            default:
              "function" === typeof e.onClick && (a.onclick = jf);
          }

          mf(c, d) && (b.flags |= 4);
        }

        null !== b.ref && (b.flags |= 128);
      }
      return null;

    case 6:
      if (a && null != b.stateNode) Ei(a, b, a.memoizedProps, d);else {
        if ("string" !== typeof d && null === b.stateNode) throw Error(y(166));
        c = dh(ch.current);
        dh(ah.current);
        rh(b) ? (d = b.stateNode, c = b.memoizedProps, d[wf] = b, d.nodeValue !== c && (b.flags |= 4)) : (d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[wf] = b, b.stateNode = d);
      }
      return null;

    case 13:
      H(P);
      d = b.memoizedState;
      if (0 !== (b.flags & 64)) return b.lanes = c, b;
      d = null !== d;
      c = !1;
      null === a ? void 0 !== b.memoizedProps.fallback && rh(b) : c = null !== a.memoizedState;
      if (d && !c && 0 !== (b.mode & 2)) if (null === a && !0 !== b.memoizedProps.unstable_avoidThisFallback || 0 !== (P.current & 1)) 0 === V && (V = 3);else {
        if (0 === V || 3 === V) V = 4;
        null === U || 0 === (Dg & 134217727) && 0 === (Hi & 134217727) || Ii(U, W);
      }
      if (d || c) b.flags |= 4;
      return null;

    case 4:
      return fh(), Ci(b), null === a && cf(b.stateNode.containerInfo), null;

    case 10:
      return rg(b), null;

    case 17:
      return Ff(b.type) && Gf(), null;

    case 19:
      H(P);
      d = b.memoizedState;
      if (null === d) return null;
      f = 0 !== (b.flags & 64);
      g = d.rendering;
      if (null === g) {
        if (f) Fi(d, !1);else {
          if (0 !== V || null !== a && 0 !== (a.flags & 64)) for (a = b.child; null !== a;) {
            g = ih(a);

            if (null !== g) {
              b.flags |= 64;
              Fi(d, !1);
              f = g.updateQueue;
              null !== f && (b.updateQueue = f, b.flags |= 4);
              null === d.lastEffect && (b.firstEffect = null);
              b.lastEffect = d.lastEffect;
              d = c;

              for (c = b.child; null !== c;) f = c, a = d, f.flags &= 2, f.nextEffect = null, f.firstEffect = null, f.lastEffect = null, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : {
                lanes: a.lanes,
                firstContext: a.firstContext
              }), c = c.sibling;

              I(P, P.current & 1 | 2);
              return b.child;
            }

            a = a.sibling;
          }
          null !== d.tail && O() > Ji && (b.flags |= 64, f = !0, Fi(d, !1), b.lanes = 33554432);
        }
      } else {
        if (!f) if (a = ih(g), null !== a) {
          if (b.flags |= 64, f = !0, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Fi(d, !0), null === d.tail && "hidden" === d.tailMode && !g.alternate && !lh) return b = b.lastEffect = d.lastEffect, null !== b && (b.nextEffect = null), null;
        } else 2 * O() - d.renderingStartTime > Ji && 1073741824 !== c && (b.flags |= 64, f = !0, Fi(d, !1), b.lanes = 33554432);
        d.isBackwards ? (g.sibling = b.child, b.child = g) : (c = d.last, null !== c ? c.sibling = g : b.child = g, d.last = g);
      }
      return null !== d.tail ? (c = d.tail, d.rendering = c, d.tail = c.sibling, d.lastEffect = b.lastEffect, d.renderingStartTime = O(), c.sibling = null, b = P.current, I(P, f ? b & 1 | 2 : b & 1), c) : null;

    case 23:
    case 24:
      return Ki(), null !== a && null !== a.memoizedState !== (null !== b.memoizedState) && "unstable-defer-without-hiding" !== d.mode && (b.flags |= 4), null;
  }

  throw Error(y(156, b.tag));
}

function Li(a) {
  switch (a.tag) {
    case 1:
      Ff(a.type) && Gf();
      var b = a.flags;
      return b & 4096 ? (a.flags = b & -4097 | 64, a) : null;

    case 3:
      fh();
      H(N);
      H(M);
      uh();
      b = a.flags;
      if (0 !== (b & 64)) throw Error(y(285));
      a.flags = b & -4097 | 64;
      return a;

    case 5:
      return hh(a), null;

    case 13:
      return H(P), b = a.flags, b & 4096 ? (a.flags = b & -4097 | 64, a) : null;

    case 19:
      return H(P), null;

    case 4:
      return fh(), null;

    case 10:
      return rg(a), null;

    case 23:
    case 24:
      return Ki(), null;

    default:
      return null;
  }
}

function Mi(a, b) {
  try {
    var c = "",
        d = b;

    do c += Qa(d), d = d.return; while (d);

    var e = c;
  } catch (f) {
    e = "\nError generating stack: " + f.message + "\n" + f.stack;
  }

  return {
    value: a,
    source: b,
    stack: e
  };
}

function Ni(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function () {
      throw c;
    });
  }
}

var Oi = "function" === typeof WeakMap ? WeakMap : Map;

function Pi(a, b, c) {
  c = zg(-1, c);
  c.tag = 3;
  c.payload = {
    element: null
  };
  var d = b.value;

  c.callback = function () {
    Qi || (Qi = !0, Ri = d);
    Ni(a, b);
  };

  return c;
}

function Si(a, b, c) {
  c = zg(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;

  if ("function" === typeof d) {
    var e = b.value;

    c.payload = function () {
      Ni(a, b);
      return d(e);
    };
  }

  var f = a.stateNode;
  null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {
    "function" !== typeof d && (null === Ti ? Ti = new Set([this]) : Ti.add(this), Ni(a, b));
    var c = b.stack;
    this.componentDidCatch(b.value, {
      componentStack: null !== c ? c : ""
    });
  });
  return c;
}

var Ui = "function" === typeof WeakSet ? WeakSet : Set;

function Vi(a) {
  var b = a.ref;
  if (null !== b) if ("function" === typeof b) try {
    b(null);
  } catch (c) {
    Wi(a, c);
  } else b.current = null;
}

function Xi(a, b) {
  switch (b.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      return;

    case 1:
      if (b.flags & 256 && null !== a) {
        var c = a.memoizedProps,
            d = a.memoizedState;
        a = b.stateNode;
        b = a.getSnapshotBeforeUpdate(b.elementType === b.type ? c : lg(b.type, c), d);
        a.__reactInternalSnapshotBeforeUpdate = b;
      }

      return;

    case 3:
      b.flags & 256 && qf(b.stateNode.containerInfo);
      return;

    case 5:
    case 6:
    case 4:
    case 17:
      return;
  }

  throw Error(y(163));
}

function Yi(a, b, c) {
  switch (c.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      b = c.updateQueue;
      b = null !== b ? b.lastEffect : null;

      if (null !== b) {
        a = b = b.next;

        do {
          if (3 === (a.tag & 3)) {
            var d = a.create;
            a.destroy = d();
          }

          a = a.next;
        } while (a !== b);
      }

      b = c.updateQueue;
      b = null !== b ? b.lastEffect : null;

      if (null !== b) {
        a = b = b.next;

        do {
          var e = a;
          d = e.next;
          e = e.tag;
          0 !== (e & 4) && 0 !== (e & 1) && (Zi(c, a), $i(c, a));
          a = d;
        } while (a !== b);
      }

      return;

    case 1:
      a = c.stateNode;
      c.flags & 4 && (null === b ? a.componentDidMount() : (d = c.elementType === c.type ? b.memoizedProps : lg(c.type, b.memoizedProps), a.componentDidUpdate(d, b.memoizedState, a.__reactInternalSnapshotBeforeUpdate)));
      b = c.updateQueue;
      null !== b && Eg(c, b, a);
      return;

    case 3:
      b = c.updateQueue;

      if (null !== b) {
        a = null;
        if (null !== c.child) switch (c.child.tag) {
          case 5:
            a = c.child.stateNode;
            break;

          case 1:
            a = c.child.stateNode;
        }
        Eg(c, b, a);
      }

      return;

    case 5:
      a = c.stateNode;
      null === b && c.flags & 4 && mf(c.type, c.memoizedProps) && a.focus();
      return;

    case 6:
      return;

    case 4:
      return;

    case 12:
      return;

    case 13:
      null === c.memoizedState && (c = c.alternate, null !== c && (c = c.memoizedState, null !== c && (c = c.dehydrated, null !== c && Cc(c))));
      return;

    case 19:
    case 17:
    case 20:
    case 21:
    case 23:
    case 24:
      return;
  }

  throw Error(y(163));
}

function aj(a, b) {
  for (var c = a;;) {
    if (5 === c.tag) {
      var d = c.stateNode;
      if (b) d = d.style, "function" === typeof d.setProperty ? d.setProperty("display", "none", "important") : d.display = "none";else {
        d = c.stateNode;
        var e = c.memoizedProps.style;
        e = void 0 !== e && null !== e && e.hasOwnProperty("display") ? e.display : null;
        d.style.display = sb("display", e);
      }
    } else if (6 === c.tag) c.stateNode.nodeValue = b ? "" : c.memoizedProps;else if ((23 !== c.tag && 24 !== c.tag || null === c.memoizedState || c === a) && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }

    if (c === a) break;

    for (; null === c.sibling;) {
      if (null === c.return || c.return === a) return;
      c = c.return;
    }

    c.sibling.return = c.return;
    c = c.sibling;
  }
}

function bj(a, b) {
  if (Mf && "function" === typeof Mf.onCommitFiberUnmount) try {
    Mf.onCommitFiberUnmount(Lf, b);
  } catch (f) {}

  switch (b.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      a = b.updateQueue;

      if (null !== a && (a = a.lastEffect, null !== a)) {
        var c = a = a.next;

        do {
          var d = c,
              e = d.destroy;
          d = d.tag;
          if (void 0 !== e) if (0 !== (d & 4)) Zi(b, c);else {
            d = b;

            try {
              e();
            } catch (f) {
              Wi(d, f);
            }
          }
          c = c.next;
        } while (c !== a);
      }

      break;

    case 1:
      Vi(b);
      a = b.stateNode;
      if ("function" === typeof a.componentWillUnmount) try {
        a.props = b.memoizedProps, a.state = b.memoizedState, a.componentWillUnmount();
      } catch (f) {
        Wi(b, f);
      }
      break;

    case 5:
      Vi(b);
      break;

    case 4:
      cj(a, b);
  }
}

function dj(a) {
  a.alternate = null;
  a.child = null;
  a.dependencies = null;
  a.firstEffect = null;
  a.lastEffect = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.return = null;
  a.updateQueue = null;
}

function ej(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}

function fj(a) {
  a: {
    for (var b = a.return; null !== b;) {
      if (ej(b)) break a;
      b = b.return;
    }

    throw Error(y(160));
  }

  var c = b;
  b = c.stateNode;

  switch (c.tag) {
    case 5:
      var d = !1;
      break;

    case 3:
      b = b.containerInfo;
      d = !0;
      break;

    case 4:
      b = b.containerInfo;
      d = !0;
      break;

    default:
      throw Error(y(161));
  }

  c.flags & 16 && (pb(b, ""), c.flags &= -17);

  a: b: for (c = a;;) {
    for (; null === c.sibling;) {
      if (null === c.return || ej(c.return)) {
        c = null;
        break a;
      }

      c = c.return;
    }

    c.sibling.return = c.return;

    for (c = c.sibling; 5 !== c.tag && 6 !== c.tag && 18 !== c.tag;) {
      if (c.flags & 2) continue b;
      if (null === c.child || 4 === c.tag) continue b;else c.child.return = c, c = c.child;
    }

    if (!(c.flags & 2)) {
      c = c.stateNode;
      break a;
    }
  }

  d ? gj(a, c, b) : hj(a, c, b);
}

function gj(a, b, c) {
  var d = a.tag,
      e = 5 === d || 6 === d;
  if (e) a = e ? a.stateNode : a.stateNode.instance, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = jf));else if (4 !== d && (a = a.child, null !== a)) for (gj(a, b, c), a = a.sibling; null !== a;) gj(a, b, c), a = a.sibling;
}

function hj(a, b, c) {
  var d = a.tag,
      e = 5 === d || 6 === d;
  if (e) a = e ? a.stateNode : a.stateNode.instance, b ? c.insertBefore(a, b) : c.appendChild(a);else if (4 !== d && (a = a.child, null !== a)) for (hj(a, b, c), a = a.sibling; null !== a;) hj(a, b, c), a = a.sibling;
}

function cj(a, b) {
  for (var c = b, d = !1, e, f;;) {
    if (!d) {
      d = c.return;

      a: for (;;) {
        if (null === d) throw Error(y(160));
        e = d.stateNode;

        switch (d.tag) {
          case 5:
            f = !1;
            break a;

          case 3:
            e = e.containerInfo;
            f = !0;
            break a;

          case 4:
            e = e.containerInfo;
            f = !0;
            break a;
        }

        d = d.return;
      }

      d = !0;
    }

    if (5 === c.tag || 6 === c.tag) {
      a: for (var g = a, h = c, k = h;;) if (bj(g, k), null !== k.child && 4 !== k.tag) k.child.return = k, k = k.child;else {
        if (k === h) break a;

        for (; null === k.sibling;) {
          if (null === k.return || k.return === h) break a;
          k = k.return;
        }

        k.sibling.return = k.return;
        k = k.sibling;
      }

      f ? (g = e, h = c.stateNode, 8 === g.nodeType ? g.parentNode.removeChild(h) : g.removeChild(h)) : e.removeChild(c.stateNode);
    } else if (4 === c.tag) {
      if (null !== c.child) {
        e = c.stateNode.containerInfo;
        f = !0;
        c.child.return = c;
        c = c.child;
        continue;
      }
    } else if (bj(a, c), null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }

    if (c === b) break;

    for (; null === c.sibling;) {
      if (null === c.return || c.return === b) return;
      c = c.return;
      4 === c.tag && (d = !1);
    }

    c.sibling.return = c.return;
    c = c.sibling;
  }
}

function ij(a, b) {
  switch (b.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      var c = b.updateQueue;
      c = null !== c ? c.lastEffect : null;

      if (null !== c) {
        var d = c = c.next;

        do 3 === (d.tag & 3) && (a = d.destroy, d.destroy = void 0, void 0 !== a && a()), d = d.next; while (d !== c);
      }

      return;

    case 1:
      return;

    case 5:
      c = b.stateNode;

      if (null != c) {
        d = b.memoizedProps;
        var e = null !== a ? a.memoizedProps : d;
        a = b.type;
        var f = b.updateQueue;
        b.updateQueue = null;

        if (null !== f) {
          c[xf] = d;
          "input" === a && "radio" === d.type && null != d.name && $a(c, d);
          wb(a, e);
          b = wb(a, d);

          for (e = 0; e < f.length; e += 2) {
            var g = f[e],
                h = f[e + 1];
            "style" === g ? tb(c, h) : "dangerouslySetInnerHTML" === g ? ob(c, h) : "children" === g ? pb(c, h) : qa(c, g, h, b);
          }

          switch (a) {
            case "input":
              ab(c, d);
              break;

            case "textarea":
              ib(c, d);
              break;

            case "select":
              a = c._wrapperState.wasMultiple, c._wrapperState.wasMultiple = !!d.multiple, f = d.value, null != f ? fb(c, !!d.multiple, f, !1) : a !== !!d.multiple && (null != d.defaultValue ? fb(c, !!d.multiple, d.defaultValue, !0) : fb(c, !!d.multiple, d.multiple ? [] : "", !1));
          }
        }
      }

      return;

    case 6:
      if (null === b.stateNode) throw Error(y(162));
      b.stateNode.nodeValue = b.memoizedProps;
      return;

    case 3:
      c = b.stateNode;
      c.hydrate && (c.hydrate = !1, Cc(c.containerInfo));
      return;

    case 12:
      return;

    case 13:
      null !== b.memoizedState && (jj = O(), aj(b.child, !0));
      kj(b);
      return;

    case 19:
      kj(b);
      return;

    case 17:
      return;

    case 23:
    case 24:
      aj(b, null !== b.memoizedState);
      return;
  }

  throw Error(y(163));
}

function kj(a) {
  var b = a.updateQueue;

  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Ui());
    b.forEach(function (b) {
      var d = lj.bind(null, a, b);
      c.has(b) || (c.add(b), b.then(d, d));
    });
  }
}

function mj(a, b) {
  return null !== a && (a = a.memoizedState, null === a || null !== a.dehydrated) ? (b = b.memoizedState, null !== b && null === b.dehydrated) : !1;
}

var nj = Math.ceil,
    oj = ra.ReactCurrentDispatcher,
    pj = ra.ReactCurrentOwner,
    X = 0,
    U = null,
    Y = null,
    W = 0,
    qj = 0,
    rj = Bf(0),
    V = 0,
    sj = null,
    tj = 0,
    Dg = 0,
    Hi = 0,
    uj = 0,
    vj = null,
    jj = 0,
    Ji = Infinity;

function wj() {
  Ji = O() + 500;
}

var Z = null,
    Qi = !1,
    Ri = null,
    Ti = null,
    xj = !1,
    yj = null,
    zj = 90,
    Aj = [],
    Bj = [],
    Cj = null,
    Dj = 0,
    Ej = null,
    Fj = -1,
    Gj = 0,
    Hj = 0,
    Ij = null,
    Jj = !1;

function Hg() {
  return 0 !== (X & 48) ? O() : -1 !== Fj ? Fj : Fj = O();
}

function Ig(a) {
  a = a.mode;
  if (0 === (a & 2)) return 1;
  if (0 === (a & 4)) return 99 === eg() ? 1 : 2;
  0 === Gj && (Gj = tj);

  if (0 !== kg.transition) {
    0 !== Hj && (Hj = null !== vj ? vj.pendingLanes : 0);
    a = Gj;
    var b = 4186112 & ~Hj;
    b &= -b;
    0 === b && (a = 4186112 & ~a, b = a & -a, 0 === b && (b = 8192));
    return b;
  }

  a = eg();
  0 !== (X & 4) && 98 === a ? a = Xc(12, Gj) : (a = Sc(a), a = Xc(a, Gj));
  return a;
}

function Jg(a, b, c) {
  if (50 < Dj) throw Dj = 0, Ej = null, Error(y(185));
  a = Kj(a, b);
  if (null === a) return null;
  $c(a, b, c);
  a === U && (Hi |= b, 4 === V && Ii(a, W));
  var d = eg();
  1 === b ? 0 !== (X & 8) && 0 === (X & 48) ? Lj(a) : (Mj(a, c), 0 === X && (wj(), ig())) : (0 === (X & 4) || 98 !== d && 99 !== d || (null === Cj ? Cj = new Set([a]) : Cj.add(a)), Mj(a, c));
  vj = a;
}

function Kj(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;

  for (a = a.return; null !== a;) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;

  return 3 === c.tag ? c.stateNode : null;
}

function Mj(a, b) {
  for (var c = a.callbackNode, d = a.suspendedLanes, e = a.pingedLanes, f = a.expirationTimes, g = a.pendingLanes; 0 < g;) {
    var h = 31 - Vc(g),
        k = 1 << h,
        l = f[h];

    if (-1 === l) {
      if (0 === (k & d) || 0 !== (k & e)) {
        l = b;
        Rc(k);
        var n = F;
        f[h] = 10 <= n ? l + 250 : 6 <= n ? l + 5E3 : -1;
      }
    } else l <= b && (a.expiredLanes |= k);

    g &= ~k;
  }

  d = Uc(a, a === U ? W : 0);
  b = F;
  if (0 === d) null !== c && (c !== Zf && Pf(c), a.callbackNode = null, a.callbackPriority = 0);else {
    if (null !== c) {
      if (a.callbackPriority === b) return;
      c !== Zf && Pf(c);
    }

    15 === b ? (c = Lj.bind(null, a), null === ag ? (ag = [c], bg = Of(Uf, jg)) : ag.push(c), c = Zf) : 14 === b ? c = hg(99, Lj.bind(null, a)) : (c = Tc(b), c = hg(c, Nj.bind(null, a)));
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}

function Nj(a) {
  Fj = -1;
  Hj = Gj = 0;
  if (0 !== (X & 48)) throw Error(y(327));
  var b = a.callbackNode;
  if (Oj() && a.callbackNode !== b) return null;
  var c = Uc(a, a === U ? W : 0);
  if (0 === c) return null;
  var d = c;
  var e = X;
  X |= 16;
  var f = Pj();
  if (U !== a || W !== d) wj(), Qj(a, d);

  do try {
    Rj();
    break;
  } catch (h) {
    Sj(a, h);
  } while (1);

  qg();
  oj.current = f;
  X = e;
  null !== Y ? d = 0 : (U = null, W = 0, d = V);
  if (0 !== (tj & Hi)) Qj(a, 0);else if (0 !== d) {
    2 === d && (X |= 64, a.hydrate && (a.hydrate = !1, qf(a.containerInfo)), c = Wc(a), 0 !== c && (d = Tj(a, c)));
    if (1 === d) throw b = sj, Qj(a, 0), Ii(a, c), Mj(a, O()), b;
    a.finishedWork = a.current.alternate;
    a.finishedLanes = c;

    switch (d) {
      case 0:
      case 1:
        throw Error(y(345));

      case 2:
        Uj(a);
        break;

      case 3:
        Ii(a, c);

        if ((c & 62914560) === c && (d = jj + 500 - O(), 10 < d)) {
          if (0 !== Uc(a, 0)) break;
          e = a.suspendedLanes;

          if ((e & c) !== c) {
            Hg();
            a.pingedLanes |= a.suspendedLanes & e;
            break;
          }

          a.timeoutHandle = of(Uj.bind(null, a), d);
          break;
        }

        Uj(a);
        break;

      case 4:
        Ii(a, c);
        if ((c & 4186112) === c) break;
        d = a.eventTimes;

        for (e = -1; 0 < c;) {
          var g = 31 - Vc(c);
          f = 1 << g;
          g = d[g];
          g > e && (e = g);
          c &= ~f;
        }

        c = e;
        c = O() - c;
        c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3E3 > c ? 3E3 : 4320 > c ? 4320 : 1960 * nj(c / 1960)) - c;

        if (10 < c) {
          a.timeoutHandle = of(Uj.bind(null, a), c);
          break;
        }

        Uj(a);
        break;

      case 5:
        Uj(a);
        break;

      default:
        throw Error(y(329));
    }
  }
  Mj(a, O());
  return a.callbackNode === b ? Nj.bind(null, a) : null;
}

function Ii(a, b) {
  b &= ~uj;
  b &= ~Hi;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;

  for (a = a.expirationTimes; 0 < b;) {
    var c = 31 - Vc(b),
        d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}

function Lj(a) {
  if (0 !== (X & 48)) throw Error(y(327));
  Oj();

  if (a === U && 0 !== (a.expiredLanes & W)) {
    var b = W;
    var c = Tj(a, b);
    0 !== (tj & Hi) && (b = Uc(a, b), c = Tj(a, b));
  } else b = Uc(a, 0), c = Tj(a, b);

  0 !== a.tag && 2 === c && (X |= 64, a.hydrate && (a.hydrate = !1, qf(a.containerInfo)), b = Wc(a), 0 !== b && (c = Tj(a, b)));
  if (1 === c) throw c = sj, Qj(a, 0), Ii(a, b), Mj(a, O()), c;
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Uj(a);
  Mj(a, O());
  return null;
}

function Vj() {
  if (null !== Cj) {
    var a = Cj;
    Cj = null;
    a.forEach(function (a) {
      a.expiredLanes |= 24 & a.pendingLanes;
      Mj(a, O());
    });
  }

  ig();
}

function Wj(a, b) {
  var c = X;
  X |= 1;

  try {
    return a(b);
  } finally {
    X = c, 0 === X && (wj(), ig());
  }
}

function Xj(a, b) {
  var c = X;
  X &= -2;
  X |= 8;

  try {
    return a(b);
  } finally {
    X = c, 0 === X && (wj(), ig());
  }
}

function ni(a, b) {
  I(rj, qj);
  qj |= b;
  tj |= b;
}

function Ki() {
  qj = rj.current;
  H(rj);
}

function Qj(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, pf(c));
  if (null !== Y) for (c = Y.return; null !== c;) {
    var d = c;

    switch (d.tag) {
      case 1:
        d = d.type.childContextTypes;
        null !== d && void 0 !== d && Gf();
        break;

      case 3:
        fh();
        H(N);
        H(M);
        uh();
        break;

      case 5:
        hh(d);
        break;

      case 4:
        fh();
        break;

      case 13:
        H(P);
        break;

      case 19:
        H(P);
        break;

      case 10:
        rg(d);
        break;

      case 23:
      case 24:
        Ki();
    }

    c = c.return;
  }
  U = a;
  Y = Tg(a.current, null);
  W = qj = tj = b;
  V = 0;
  sj = null;
  uj = Hi = Dg = 0;
}

function Sj(a, b) {
  do {
    var c = Y;

    try {
      qg();
      vh.current = Gh;

      if (yh) {
        for (var d = R.memoizedState; null !== d;) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }

        yh = !1;
      }

      xh = 0;
      T = S = R = null;
      zh = !1;
      pj.current = null;

      if (null === c || null === c.return) {
        V = 1;
        sj = b;
        Y = null;
        break;
      }

      a: {
        var f = a,
            g = c.return,
            h = c,
            k = b;
        b = W;
        h.flags |= 2048;
        h.firstEffect = h.lastEffect = null;

        if (null !== k && "object" === typeof k && "function" === typeof k.then) {
          var l = k;

          if (0 === (h.mode & 2)) {
            var n = h.alternate;
            n ? (h.updateQueue = n.updateQueue, h.memoizedState = n.memoizedState, h.lanes = n.lanes) : (h.updateQueue = null, h.memoizedState = null);
          }

          var A = 0 !== (P.current & 1),
              p = g;

          do {
            var C;

            if (C = 13 === p.tag) {
              var x = p.memoizedState;
              if (null !== x) C = null !== x.dehydrated ? !0 : !1;else {
                var w = p.memoizedProps;
                C = void 0 === w.fallback ? !1 : !0 !== w.unstable_avoidThisFallback ? !0 : A ? !1 : !0;
              }
            }

            if (C) {
              var z = p.updateQueue;

              if (null === z) {
                var u = new Set();
                u.add(l);
                p.updateQueue = u;
              } else z.add(l);

              if (0 === (p.mode & 2)) {
                p.flags |= 64;
                h.flags |= 16384;
                h.flags &= -2981;
                if (1 === h.tag) if (null === h.alternate) h.tag = 17;else {
                  var t = zg(-1, 1);
                  t.tag = 2;
                  Ag(h, t);
                }
                h.lanes |= 1;
                break a;
              }

              k = void 0;
              h = b;
              var q = f.pingCache;
              null === q ? (q = f.pingCache = new Oi(), k = new Set(), q.set(l, k)) : (k = q.get(l), void 0 === k && (k = new Set(), q.set(l, k)));

              if (!k.has(h)) {
                k.add(h);
                var v = Yj.bind(null, f, l, h);
                l.then(v, v);
              }

              p.flags |= 4096;
              p.lanes = b;
              break a;
            }

            p = p.return;
          } while (null !== p);

          k = Error((Ra(h.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
        }

        5 !== V && (V = 2);
        k = Mi(k, h);
        p = g;

        do {
          switch (p.tag) {
            case 3:
              f = k;
              p.flags |= 4096;
              b &= -b;
              p.lanes |= b;
              var J = Pi(p, f, b);
              Bg(p, J);
              break a;

            case 1:
              f = k;
              var K = p.type,
                  Q = p.stateNode;

              if (0 === (p.flags & 64) && ("function" === typeof K.getDerivedStateFromError || null !== Q && "function" === typeof Q.componentDidCatch && (null === Ti || !Ti.has(Q)))) {
                p.flags |= 4096;
                b &= -b;
                p.lanes |= b;
                var L = Si(p, f, b);
                Bg(p, L);
                break a;
              }

          }

          p = p.return;
        } while (null !== p);
      }

      Zj(c);
    } catch (va) {
      b = va;
      Y === c && null !== c && (Y = c = c.return);
      continue;
    }

    break;
  } while (1);
}

function Pj() {
  var a = oj.current;
  oj.current = Gh;
  return null === a ? Gh : a;
}

function Tj(a, b) {
  var c = X;
  X |= 16;
  var d = Pj();
  U === a && W === b || Qj(a, b);

  do try {
    ak();
    break;
  } catch (e) {
    Sj(a, e);
  } while (1);

  qg();
  X = c;
  oj.current = d;
  if (null !== Y) throw Error(y(261));
  U = null;
  W = 0;
  return V;
}

function ak() {
  for (; null !== Y;) bk(Y);
}

function Rj() {
  for (; null !== Y && !Qf();) bk(Y);
}

function bk(a) {
  var b = ck(a.alternate, a, qj);
  a.memoizedProps = a.pendingProps;
  null === b ? Zj(a) : Y = b;
  pj.current = null;
}

function Zj(a) {
  var b = a;

  do {
    var c = b.alternate;
    a = b.return;

    if (0 === (b.flags & 2048)) {
      c = Gi(c, b, qj);

      if (null !== c) {
        Y = c;
        return;
      }

      c = b;

      if (24 !== c.tag && 23 !== c.tag || null === c.memoizedState || 0 !== (qj & 1073741824) || 0 === (c.mode & 4)) {
        for (var d = 0, e = c.child; null !== e;) d |= e.lanes | e.childLanes, e = e.sibling;

        c.childLanes = d;
      }

      null !== a && 0 === (a.flags & 2048) && (null === a.firstEffect && (a.firstEffect = b.firstEffect), null !== b.lastEffect && (null !== a.lastEffect && (a.lastEffect.nextEffect = b.firstEffect), a.lastEffect = b.lastEffect), 1 < b.flags && (null !== a.lastEffect ? a.lastEffect.nextEffect = b : a.firstEffect = b, a.lastEffect = b));
    } else {
      c = Li(b);

      if (null !== c) {
        c.flags &= 2047;
        Y = c;
        return;
      }

      null !== a && (a.firstEffect = a.lastEffect = null, a.flags |= 2048);
    }

    b = b.sibling;

    if (null !== b) {
      Y = b;
      return;
    }

    Y = b = a;
  } while (null !== b);

  0 === V && (V = 5);
}

function Uj(a) {
  var b = eg();
  gg(99, dk.bind(null, a, b));
  return null;
}

function dk(a, b) {
  do Oj(); while (null !== yj);

  if (0 !== (X & 48)) throw Error(y(327));
  var c = a.finishedWork;
  if (null === c) return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current) throw Error(y(177));
  a.callbackNode = null;
  var d = c.lanes | c.childLanes,
      e = d,
      f = a.pendingLanes & ~e;
  a.pendingLanes = e;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= e;
  a.mutableReadLanes &= e;
  a.entangledLanes &= e;
  e = a.entanglements;

  for (var g = a.eventTimes, h = a.expirationTimes; 0 < f;) {
    var k = 31 - Vc(f),
        l = 1 << k;
    e[k] = 0;
    g[k] = -1;
    h[k] = -1;
    f &= ~l;
  }

  null !== Cj && 0 === (d & 24) && Cj.has(a) && Cj.delete(a);
  a === U && (Y = U = null, W = 0);
  1 < c.flags ? null !== c.lastEffect ? (c.lastEffect.nextEffect = c, d = c.firstEffect) : d = c : d = c.firstEffect;

  if (null !== d) {
    e = X;
    X |= 32;
    pj.current = null;
    kf = fd;
    g = Ne();

    if (Oe(g)) {
      if ("selectionStart" in g) h = {
        start: g.selectionStart,
        end: g.selectionEnd
      };else a: if (h = (h = g.ownerDocument) && h.defaultView || window, (l = h.getSelection && h.getSelection()) && 0 !== l.rangeCount) {
        h = l.anchorNode;
        f = l.anchorOffset;
        k = l.focusNode;
        l = l.focusOffset;

        try {
          h.nodeType, k.nodeType;
        } catch (va) {
          h = null;
          break a;
        }

        var n = 0,
            A = -1,
            p = -1,
            C = 0,
            x = 0,
            w = g,
            z = null;

        b: for (;;) {
          for (var u;;) {
            w !== h || 0 !== f && 3 !== w.nodeType || (A = n + f);
            w !== k || 0 !== l && 3 !== w.nodeType || (p = n + l);
            3 === w.nodeType && (n += w.nodeValue.length);
            if (null === (u = w.firstChild)) break;
            z = w;
            w = u;
          }

          for (;;) {
            if (w === g) break b;
            z === h && ++C === f && (A = n);
            z === k && ++x === l && (p = n);
            if (null !== (u = w.nextSibling)) break;
            w = z;
            z = w.parentNode;
          }

          w = u;
        }

        h = -1 === A || -1 === p ? null : {
          start: A,
          end: p
        };
      } else h = null;
      h = h || {
        start: 0,
        end: 0
      };
    } else h = null;

    lf = {
      focusedElem: g,
      selectionRange: h
    };
    fd = !1;
    Ij = null;
    Jj = !1;
    Z = d;

    do try {
      ek();
    } catch (va) {
      if (null === Z) throw Error(y(330));
      Wi(Z, va);
      Z = Z.nextEffect;
    } while (null !== Z);

    Ij = null;
    Z = d;

    do try {
      for (g = a; null !== Z;) {
        var t = Z.flags;
        t & 16 && pb(Z.stateNode, "");

        if (t & 128) {
          var q = Z.alternate;

          if (null !== q) {
            var v = q.ref;
            null !== v && ("function" === typeof v ? v(null) : v.current = null);
          }
        }

        switch (t & 1038) {
          case 2:
            fj(Z);
            Z.flags &= -3;
            break;

          case 6:
            fj(Z);
            Z.flags &= -3;
            ij(Z.alternate, Z);
            break;

          case 1024:
            Z.flags &= -1025;
            break;

          case 1028:
            Z.flags &= -1025;
            ij(Z.alternate, Z);
            break;

          case 4:
            ij(Z.alternate, Z);
            break;

          case 8:
            h = Z;
            cj(g, h);
            var J = h.alternate;
            dj(h);
            null !== J && dj(J);
        }

        Z = Z.nextEffect;
      }
    } catch (va) {
      if (null === Z) throw Error(y(330));
      Wi(Z, va);
      Z = Z.nextEffect;
    } while (null !== Z);

    v = lf;
    q = Ne();
    t = v.focusedElem;
    g = v.selectionRange;

    if (q !== t && t && t.ownerDocument && Me(t.ownerDocument.documentElement, t)) {
      null !== g && Oe(t) && (q = g.start, v = g.end, void 0 === v && (v = q), "selectionStart" in t ? (t.selectionStart = q, t.selectionEnd = Math.min(v, t.value.length)) : (v = (q = t.ownerDocument || document) && q.defaultView || window, v.getSelection && (v = v.getSelection(), h = t.textContent.length, J = Math.min(g.start, h), g = void 0 === g.end ? J : Math.min(g.end, h), !v.extend && J > g && (h = g, g = J, J = h), h = Le(t, J), f = Le(t, g), h && f && (1 !== v.rangeCount || v.anchorNode !== h.node || v.anchorOffset !== h.offset || v.focusNode !== f.node || v.focusOffset !== f.offset) && (q = q.createRange(), q.setStart(h.node, h.offset), v.removeAllRanges(), J > g ? (v.addRange(q), v.extend(f.node, f.offset)) : (q.setEnd(f.node, f.offset), v.addRange(q))))));
      q = [];

      for (v = t; v = v.parentNode;) 1 === v.nodeType && q.push({
        element: v,
        left: v.scrollLeft,
        top: v.scrollTop
      });

      "function" === typeof t.focus && t.focus();

      for (t = 0; t < q.length; t++) v = q[t], v.element.scrollLeft = v.left, v.element.scrollTop = v.top;
    }

    fd = !!kf;
    lf = kf = null;
    a.current = c;
    Z = d;

    do try {
      for (t = a; null !== Z;) {
        var K = Z.flags;
        K & 36 && Yi(t, Z.alternate, Z);

        if (K & 128) {
          q = void 0;
          var Q = Z.ref;

          if (null !== Q) {
            var L = Z.stateNode;

            switch (Z.tag) {
              case 5:
                q = L;
                break;

              default:
                q = L;
            }

            "function" === typeof Q ? Q(q) : Q.current = q;
          }
        }

        Z = Z.nextEffect;
      }
    } catch (va) {
      if (null === Z) throw Error(y(330));
      Wi(Z, va);
      Z = Z.nextEffect;
    } while (null !== Z);

    Z = null;
    $f();
    X = e;
  } else a.current = c;

  if (xj) xj = !1, yj = a, zj = b;else for (Z = d; null !== Z;) b = Z.nextEffect, Z.nextEffect = null, Z.flags & 8 && (K = Z, K.sibling = null, K.stateNode = null), Z = b;
  d = a.pendingLanes;
  0 === d && (Ti = null);
  1 === d ? a === Ej ? Dj++ : (Dj = 0, Ej = a) : Dj = 0;
  c = c.stateNode;
  if (Mf && "function" === typeof Mf.onCommitFiberRoot) try {
    Mf.onCommitFiberRoot(Lf, c, void 0, 64 === (c.current.flags & 64));
  } catch (va) {}
  Mj(a, O());
  if (Qi) throw Qi = !1, a = Ri, Ri = null, a;
  if (0 !== (X & 8)) return null;
  ig();
  return null;
}

function ek() {
  for (; null !== Z;) {
    var a = Z.alternate;
    Jj || null === Ij || (0 !== (Z.flags & 8) ? dc(Z, Ij) && (Jj = !0) : 13 === Z.tag && mj(a, Z) && dc(Z, Ij) && (Jj = !0));
    var b = Z.flags;
    0 !== (b & 256) && Xi(a, Z);
    0 === (b & 512) || xj || (xj = !0, hg(97, function () {
      Oj();
      return null;
    }));
    Z = Z.nextEffect;
  }
}

function Oj() {
  if (90 !== zj) {
    var a = 97 < zj ? 97 : zj;
    zj = 90;
    return gg(a, fk);
  }

  return !1;
}

function $i(a, b) {
  Aj.push(b, a);
  xj || (xj = !0, hg(97, function () {
    Oj();
    return null;
  }));
}

function Zi(a, b) {
  Bj.push(b, a);
  xj || (xj = !0, hg(97, function () {
    Oj();
    return null;
  }));
}

function fk() {
  if (null === yj) return !1;
  var a = yj;
  yj = null;
  if (0 !== (X & 48)) throw Error(y(331));
  var b = X;
  X |= 32;
  var c = Bj;
  Bj = [];

  for (var d = 0; d < c.length; d += 2) {
    var e = c[d],
        f = c[d + 1],
        g = e.destroy;
    e.destroy = void 0;
    if ("function" === typeof g) try {
      g();
    } catch (k) {
      if (null === f) throw Error(y(330));
      Wi(f, k);
    }
  }

  c = Aj;
  Aj = [];

  for (d = 0; d < c.length; d += 2) {
    e = c[d];
    f = c[d + 1];

    try {
      var h = e.create;
      e.destroy = h();
    } catch (k) {
      if (null === f) throw Error(y(330));
      Wi(f, k);
    }
  }

  for (h = a.current.firstEffect; null !== h;) a = h.nextEffect, h.nextEffect = null, h.flags & 8 && (h.sibling = null, h.stateNode = null), h = a;

  X = b;
  ig();
  return !0;
}

function gk(a, b, c) {
  b = Mi(c, b);
  b = Pi(a, b, 1);
  Ag(a, b);
  b = Hg();
  a = Kj(a, 1);
  null !== a && ($c(a, 1, b), Mj(a, b));
}

function Wi(a, b) {
  if (3 === a.tag) gk(a, a, b);else for (var c = a.return; null !== c;) {
    if (3 === c.tag) {
      gk(c, a, b);
      break;
    } else if (1 === c.tag) {
      var d = c.stateNode;

      if ("function" === typeof c.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ti || !Ti.has(d))) {
        a = Mi(b, a);
        var e = Si(c, a, 1);
        Ag(c, e);
        e = Hg();
        c = Kj(c, 1);
        if (null !== c) $c(c, 1, e), Mj(c, e);else if ("function" === typeof d.componentDidCatch && (null === Ti || !Ti.has(d))) try {
          d.componentDidCatch(b, a);
        } catch (f) {}
        break;
      }
    }

    c = c.return;
  }
}

function Yj(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = Hg();
  a.pingedLanes |= a.suspendedLanes & c;
  U === a && (W & c) === c && (4 === V || 3 === V && (W & 62914560) === W && 500 > O() - jj ? Qj(a, 0) : uj |= c);
  Mj(a, b);
}

function lj(a, b) {
  var c = a.stateNode;
  null !== c && c.delete(b);
  b = 0;
  0 === b && (b = a.mode, 0 === (b & 2) ? b = 1 : 0 === (b & 4) ? b = 99 === eg() ? 1 : 2 : (0 === Gj && (Gj = tj), b = Yc(62914560 & ~Gj), 0 === b && (b = 4194304)));
  c = Hg();
  a = Kj(a, b);
  null !== a && ($c(a, b, c), Mj(a, c));
}

var ck;

ck = function (a, b, c) {
  var d = b.lanes;
  if (null !== a) {
    if (a.memoizedProps !== b.pendingProps || N.current) ug = !0;else if (0 !== (c & d)) ug = 0 !== (a.flags & 16384) ? !0 : !1;else {
      ug = !1;

      switch (b.tag) {
        case 3:
          ri(b);
          sh();
          break;

        case 5:
          gh(b);
          break;

        case 1:
          Ff(b.type) && Jf(b);
          break;

        case 4:
          eh(b, b.stateNode.containerInfo);
          break;

        case 10:
          d = b.memoizedProps.value;
          var e = b.type._context;
          I(mg, e._currentValue);
          e._currentValue = d;
          break;

        case 13:
          if (null !== b.memoizedState) {
            if (0 !== (c & b.child.childLanes)) return ti(a, b, c);
            I(P, P.current & 1);
            b = hi(a, b, c);
            return null !== b ? b.sibling : null;
          }

          I(P, P.current & 1);
          break;

        case 19:
          d = 0 !== (c & b.childLanes);

          if (0 !== (a.flags & 64)) {
            if (d) return Ai(a, b, c);
            b.flags |= 64;
          }

          e = b.memoizedState;
          null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
          I(P, P.current);
          if (d) break;else return null;

        case 23:
        case 24:
          return b.lanes = 0, mi(a, b, c);
      }

      return hi(a, b, c);
    }
  } else ug = !1;
  b.lanes = 0;

  switch (b.tag) {
    case 2:
      d = b.type;
      null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
      a = b.pendingProps;
      e = Ef(b, M.current);
      tg(b, c);
      e = Ch(null, b, d, a, e, c);
      b.flags |= 1;

      if ("object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof) {
        b.tag = 1;
        b.memoizedState = null;
        b.updateQueue = null;

        if (Ff(d)) {
          var f = !0;
          Jf(b);
        } else f = !1;

        b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null;
        xg(b);
        var g = d.getDerivedStateFromProps;
        "function" === typeof g && Gg(b, d, g, a);
        e.updater = Kg;
        b.stateNode = e;
        e._reactInternals = b;
        Og(b, d, a, c);
        b = qi(null, b, d, !0, f, c);
      } else b.tag = 0, fi(null, b, e, c), b = b.child;

      return b;

    case 16:
      e = b.elementType;

      a: {
        null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
        a = b.pendingProps;
        f = e._init;
        e = f(e._payload);
        b.type = e;
        f = b.tag = hk(e);
        a = lg(e, a);

        switch (f) {
          case 0:
            b = li(null, b, e, a, c);
            break a;

          case 1:
            b = pi(null, b, e, a, c);
            break a;

          case 11:
            b = gi(null, b, e, a, c);
            break a;

          case 14:
            b = ii(null, b, e, lg(e.type, a), d, c);
            break a;
        }

        throw Error(y(306, e, ""));
      }

      return b;

    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), li(a, b, d, e, c);

    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), pi(a, b, d, e, c);

    case 3:
      ri(b);
      d = b.updateQueue;
      if (null === a || null === d) throw Error(y(282));
      d = b.pendingProps;
      e = b.memoizedState;
      e = null !== e ? e.element : null;
      yg(a, b);
      Cg(b, d, null, c);
      d = b.memoizedState.element;
      if (d === e) sh(), b = hi(a, b, c);else {
        e = b.stateNode;
        if (f = e.hydrate) kh = rf(b.stateNode.containerInfo.firstChild), jh = b, f = lh = !0;

        if (f) {
          a = e.mutableSourceEagerHydrationData;
          if (null != a) for (e = 0; e < a.length; e += 2) f = a[e], f._workInProgressVersionPrimary = a[e + 1], th.push(f);
          c = Zg(b, null, d, c);

          for (b.child = c; c;) c.flags = c.flags & -3 | 1024, c = c.sibling;
        } else fi(a, b, d, c), sh();

        b = b.child;
      }
      return b;

    case 5:
      return gh(b), null === a && ph(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, nf(d, e) ? g = null : null !== f && nf(d, f) && (b.flags |= 16), oi(a, b), fi(a, b, g, c), b.child;

    case 6:
      return null === a && ph(b), null;

    case 13:
      return ti(a, b, c);

    case 4:
      return eh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Yg(b, null, d, c) : fi(a, b, d, c), b.child;

    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), gi(a, b, d, e, c);

    case 7:
      return fi(a, b, b.pendingProps, c), b.child;

    case 8:
      return fi(a, b, b.pendingProps.children, c), b.child;

    case 12:
      return fi(a, b, b.pendingProps.children, c), b.child;

    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        g = b.memoizedProps;
        f = e.value;
        var h = b.type._context;
        I(mg, h._currentValue);
        h._currentValue = f;
        if (null !== g) if (h = g.value, f = He(h, f) ? 0 : ("function" === typeof d._calculateChangedBits ? d._calculateChangedBits(h, f) : 1073741823) | 0, 0 === f) {
          if (g.children === e.children && !N.current) {
            b = hi(a, b, c);
            break a;
          }
        } else for (h = b.child, null !== h && (h.return = b); null !== h;) {
          var k = h.dependencies;

          if (null !== k) {
            g = h.child;

            for (var l = k.firstContext; null !== l;) {
              if (l.context === d && 0 !== (l.observedBits & f)) {
                1 === h.tag && (l = zg(-1, c & -c), l.tag = 2, Ag(h, l));
                h.lanes |= c;
                l = h.alternate;
                null !== l && (l.lanes |= c);
                sg(h.return, c);
                k.lanes |= c;
                break;
              }

              l = l.next;
            }
          } else g = 10 === h.tag ? h.type === b.type ? null : h.child : h.child;

          if (null !== g) g.return = h;else for (g = h; null !== g;) {
            if (g === b) {
              g = null;
              break;
            }

            h = g.sibling;

            if (null !== h) {
              h.return = g.return;
              g = h;
              break;
            }

            g = g.return;
          }
          h = g;
        }
        fi(a, b, e.children, c);
        b = b.child;
      }

      return b;

    case 9:
      return e = b.type, f = b.pendingProps, d = f.children, tg(b, c), e = vg(e, f.unstable_observedBits), d = d(e), b.flags |= 1, fi(a, b, d, c), b.child;

    case 14:
      return e = b.type, f = lg(e, b.pendingProps), f = lg(e.type, f), ii(a, b, e, f, d, c);

    case 15:
      return ki(a, b, b.type, b.pendingProps, d, c);

    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : lg(d, e), null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2), b.tag = 1, Ff(d) ? (a = !0, Jf(b)) : a = !1, tg(b, c), Mg(b, d, e), Og(b, d, e, c), qi(null, b, d, !0, a, c);

    case 19:
      return Ai(a, b, c);

    case 23:
      return mi(a, b, c);

    case 24:
      return mi(a, b, c);
  }

  throw Error(y(156, b.tag));
};

function ik(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.flags = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}

function nh(a, b, c, d) {
  return new ik(a, b, c, d);
}

function ji(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}

function hk(a) {
  if ("function" === typeof a) return ji(a) ? 1 : 0;

  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Aa) return 11;
    if (a === Da) return 14;
  }

  return 2;
}

function Tg(a, b) {
  var c = a.alternate;
  null === c ? (c = nh(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.nextEffect = null, c.firstEffect = null, c.lastEffect = null);
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : {
    lanes: b.lanes,
    firstContext: b.firstContext
  };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}

function Vg(a, b, c, d, e, f) {
  var g = 2;
  d = a;
  if ("function" === typeof a) ji(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {
    case ua:
      return Xg(c.children, e, f, b);

    case Ha:
      g = 8;
      e |= 16;
      break;

    case wa:
      g = 8;
      e |= 1;
      break;

    case xa:
      return a = nh(12, c, b, e | 8), a.elementType = xa, a.type = xa, a.lanes = f, a;

    case Ba:
      return a = nh(13, c, b, e), a.type = Ba, a.elementType = Ba, a.lanes = f, a;

    case Ca:
      return a = nh(19, c, b, e), a.elementType = Ca, a.lanes = f, a;

    case Ia:
      return vi(c, e, f, b);

    case Ja:
      return a = nh(24, c, b, e), a.elementType = Ja, a.lanes = f, a;

    default:
      if ("object" === typeof a && null !== a) switch (a.$$typeof) {
        case ya:
          g = 10;
          break a;

        case za:
          g = 9;
          break a;

        case Aa:
          g = 11;
          break a;

        case Da:
          g = 14;
          break a;

        case Ea:
          g = 16;
          d = null;
          break a;

        case Fa:
          g = 22;
          break a;
      }
      throw Error(y(130, null == a ? a : typeof a, ""));
  }
  b = nh(g, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f;
  return b;
}

function Xg(a, b, c, d) {
  a = nh(7, a, d, b);
  a.lanes = c;
  return a;
}

function vi(a, b, c, d) {
  a = nh(23, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  return a;
}

function Ug(a, b, c) {
  a = nh(6, a, null, b);
  a.lanes = c;
  return a;
}

function Wg(a, b, c) {
  b = nh(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = {
    containerInfo: a.containerInfo,
    pendingChildren: null,
    implementation: a.implementation
  };
  return b;
}

function jk(a, b, c) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = c;
  this.callbackNode = null;
  this.callbackPriority = 0;
  this.eventTimes = Zc(0);
  this.expirationTimes = Zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = Zc(0);
  this.mutableSourceEagerHydrationData = null;
}

function kk(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: ta,
    key: null == d ? null : "" + d,
    children: a,
    containerInfo: b,
    implementation: c
  };
}

function lk(a, b, c, d) {
  var e = b.current,
      f = Hg(),
      g = Ig(e);

  a: if (c) {
    c = c._reactInternals;

    b: {
      if (Zb(c) !== c || 1 !== c.tag) throw Error(y(170));
      var h = c;

      do {
        switch (h.tag) {
          case 3:
            h = h.stateNode.context;
            break b;

          case 1:
            if (Ff(h.type)) {
              h = h.stateNode.__reactInternalMemoizedMergedChildContext;
              break b;
            }

        }

        h = h.return;
      } while (null !== h);

      throw Error(y(171));
    }

    if (1 === c.tag) {
      var k = c.type;

      if (Ff(k)) {
        c = If(c, k, h);
        break a;
      }
    }

    c = h;
  } else c = Cf;

  null === b.context ? b.context = c : b.pendingContext = c;
  b = zg(f, g);
  b.payload = {
    element: a
  };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  Ag(e, b);
  Jg(e, g, f);
  return g;
}

function mk(a) {
  a = a.current;
  if (!a.child) return null;

  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;

    default:
      return a.child.stateNode;
  }
}

function nk(a, b) {
  a = a.memoizedState;

  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}

function ok(a, b) {
  nk(a, b);
  (a = a.alternate) && nk(a, b);
}

function pk() {
  return null;
}

function qk(a, b, c) {
  var d = null != c && null != c.hydrationOptions && c.hydrationOptions.mutableSources || null;
  c = new jk(a, b, null != c && !0 === c.hydrate);
  b = nh(3, null, null, 2 === b ? 7 : 1 === b ? 3 : 0);
  c.current = b;
  b.stateNode = c;
  xg(b);
  a[ff] = c.current;
  cf(8 === a.nodeType ? a.parentNode : a);
  if (d) for (a = 0; a < d.length; a++) {
    b = d[a];
    var e = b._getVersion;
    e = e(b._source);
    null == c.mutableSourceEagerHydrationData ? c.mutableSourceEagerHydrationData = [b, e] : c.mutableSourceEagerHydrationData.push(b, e);
  }
  this._internalRoot = c;
}

qk.prototype.render = function (a) {
  lk(a, this._internalRoot, null, null);
};

qk.prototype.unmount = function () {
  var a = this._internalRoot,
      b = a.containerInfo;
  lk(null, a, null, function () {
    b[ff] = null;
  });
};

function rk(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}

function sk(a, b) {
  b || (b = a ? 9 === a.nodeType ? a.documentElement : a.firstChild : null, b = !(!b || 1 !== b.nodeType || !b.hasAttribute("data-reactroot")));
  if (!b) for (var c; c = a.lastChild;) a.removeChild(c);
  return new qk(a, 0, b ? {
    hydrate: !0
  } : void 0);
}

function tk(a, b, c, d, e) {
  var f = c._reactRootContainer;

  if (f) {
    var g = f._internalRoot;

    if ("function" === typeof e) {
      var h = e;

      e = function () {
        var a = mk(g);
        h.call(a);
      };
    }

    lk(b, g, a, e);
  } else {
    f = c._reactRootContainer = sk(c, d);
    g = f._internalRoot;

    if ("function" === typeof e) {
      var k = e;

      e = function () {
        var a = mk(g);
        k.call(a);
      };
    }

    Xj(function () {
      lk(b, g, a, e);
    });
  }

  return mk(g);
}

ec = function (a) {
  if (13 === a.tag) {
    var b = Hg();
    Jg(a, 4, b);
    ok(a, 4);
  }
};

fc = function (a) {
  if (13 === a.tag) {
    var b = Hg();
    Jg(a, 67108864, b);
    ok(a, 67108864);
  }
};

gc = function (a) {
  if (13 === a.tag) {
    var b = Hg(),
        c = Ig(a);
    Jg(a, c, b);
    ok(a, c);
  }
};

hc = function (a, b) {
  return b();
};

yb = function (a, b, c) {
  switch (b) {
    case "input":
      ab(a, c);
      b = c.name;

      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode;) c = c.parentNode;

        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');

        for (b = 0; b < c.length; b++) {
          var d = c[b];

          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e) throw Error(y(90));
            Wa(d);
            ab(d, e);
          }
        }
      }

      break;

    case "textarea":
      ib(a, c);
      break;

    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, !1);
  }
};

Gb = Wj;

Hb = function (a, b, c, d, e) {
  var f = X;
  X |= 4;

  try {
    return gg(98, a.bind(null, b, c, d, e));
  } finally {
    X = f, 0 === X && (wj(), ig());
  }
};

Ib = function () {
  0 === (X & 49) && (Vj(), Oj());
};

Jb = function (a, b) {
  var c = X;
  X |= 2;

  try {
    return a(b);
  } finally {
    X = c, 0 === X && (wj(), ig());
  }
};

function uk(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!rk(b)) throw Error(y(200));
  return kk(a, b, null, c);
}

var vk = {
  Events: [Cb, ue, Db, Eb, Fb, Oj, {
    current: !1
  }]
},
    wk = {
  findFiberByHostInstance: wc,
  bundleType: 0,
  version: "17.0.2",
  rendererPackageName: "react-dom"
};
var xk = {
  bundleType: wk.bundleType,
  version: wk.version,
  rendererPackageName: wk.rendererPackageName,
  rendererConfig: wk.rendererConfig,
  overrideHookState: null,
  overrideHookStateDeletePath: null,
  overrideHookStateRenamePath: null,
  overrideProps: null,
  overridePropsDeletePath: null,
  overridePropsRenamePath: null,
  setSuspenseHandler: null,
  scheduleUpdate: null,
  currentDispatcherRef: ra.ReactCurrentDispatcher,
  findHostInstanceByFiber: function (a) {
    a = cc(a);
    return null === a ? null : a.stateNode;
  },
  findFiberByHostInstance: wk.findFiberByHostInstance || pk,
  findHostInstancesForRefresh: null,
  scheduleRefresh: null,
  scheduleRoot: null,
  setRefreshHandler: null,
  getCurrentFiber: null
};

if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var yk = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!yk.isDisabled && yk.supportsFiber) try {
    Lf = yk.inject(xk), Mf = yk;
  } catch (a) {}
}

var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = vk;
var createPortal = uk;

var findDOMNode = function (a) {
  if (null == a) return null;
  if (1 === a.nodeType) return a;
  var b = a._reactInternals;

  if (void 0 === b) {
    if ("function" === typeof a.render) throw Error(y(188));
    throw Error(y(268, Object.keys(a)));
  }

  a = cc(b);
  a = null === a ? null : a.stateNode;
  return a;
};

var flushSync = function (a, b) {
  var c = X;
  if (0 !== (c & 48)) return a(b);
  X |= 1;

  try {
    if (a) return gg(99, a.bind(null, b));
  } finally {
    X = c, ig();
  }
};

var hydrate = function (a, b, c) {
  if (!rk(b)) throw Error(y(200));
  return tk(null, a, b, !0, c);
};

var render = function (a, b, c) {
  if (!rk(b)) throw Error(y(200));
  return tk(null, a, b, !1, c);
};

var unmountComponentAtNode = function (a) {
  if (!rk(a)) throw Error(y(40));
  return a._reactRootContainer ? (Xj(function () {
    tk(null, null, a, !1, function () {
      a._reactRootContainer = null;
      a[ff] = null;
    });
  }), !0) : !1;
};

var unstable_batchedUpdates = Wj;

var unstable_createPortal = function (a, b) {
  return uk(a, b, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null);
};

var unstable_renderSubtreeIntoContainer = function (a, b, c, d) {
  if (!rk(c)) throw Error(y(200));
  if (null == a || void 0 === a._reactInternals) throw Error(y(38));
  return tk(a, b, c, !1, d);
};

var version$4 = "17.0.2";

var reactDom_production_min = {
	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
	createPortal: createPortal,
	findDOMNode: findDOMNode,
	flushSync: flushSync,
	hydrate: hydrate,
	render: render,
	unmountComponentAtNode: unmountComponentAtNode,
	unstable_batchedUpdates: unstable_batchedUpdates,
	unstable_createPortal: unstable_createPortal,
	unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
	version: version$4
};

var reactDom = createCommonjsModule(function (module) {

function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function') {
    return;
  }

  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

{
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = reactDom_production_min;
}
});

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");

  return typeof key === "symbol" ? key : String(key);
}

function _decorate(decorators, factory, superClass, mixins) {
  var api = _getDecoratorsApi();

  if (mixins) {
    for (var i = 0; i < mixins.length; i++) {
      api = mixins[i](api);
    }
  }

  var r = factory(function initialize(O) {
    api.initializeInstanceElements(O, decorated.elements);
  }, superClass);
  var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);
  api.initializeClassElements(r.F, decorated.elements);
  return api.runClassFinishers(r.F, decorated.finishers);
}

function _getDecoratorsApi() {
  _getDecoratorsApi = function () {
    return api;
  };

  var api = {
    elementsDefinitionOrder: [["method"], ["field"]],
    initializeInstanceElements: function (O, elements) {
      ["method", "field"].forEach(function (kind) {
        elements.forEach(function (element) {
          if (element.kind === kind && element.placement === "own") {
            this.defineClassElement(O, element);
          }
        }, this);
      }, this);
    },
    initializeClassElements: function (F, elements) {
      var proto = F.prototype;
      ["method", "field"].forEach(function (kind) {
        elements.forEach(function (element) {
          var placement = element.placement;

          if (element.kind === kind && (placement === "static" || placement === "prototype")) {
            var receiver = placement === "static" ? F : proto;
            this.defineClassElement(receiver, element);
          }
        }, this);
      }, this);
    },
    defineClassElement: function (receiver, element) {
      var descriptor = element.descriptor;

      if (element.kind === "field") {
        var initializer = element.initializer;
        descriptor = {
          enumerable: descriptor.enumerable,
          writable: descriptor.writable,
          configurable: descriptor.configurable,
          value: initializer === void 0 ? void 0 : initializer.call(receiver)
        };
      }

      Object.defineProperty(receiver, element.key, descriptor);
    },
    decorateClass: function (elements, decorators) {
      var newElements = [];
      var finishers = [];
      var placements = {
        static: [],
        prototype: [],
        own: []
      };
      elements.forEach(function (element) {
        this.addElementPlacement(element, placements);
      }, this);
      elements.forEach(function (element) {
        if (!_hasDecorators(element)) return newElements.push(element);
        var elementFinishersExtras = this.decorateElement(element, placements);
        newElements.push(elementFinishersExtras.element);
        newElements.push.apply(newElements, elementFinishersExtras.extras);
        finishers.push.apply(finishers, elementFinishersExtras.finishers);
      }, this);

      if (!decorators) {
        return {
          elements: newElements,
          finishers: finishers
        };
      }

      var result = this.decorateConstructor(newElements, decorators);
      finishers.push.apply(finishers, result.finishers);
      result.finishers = finishers;
      return result;
    },
    addElementPlacement: function (element, placements, silent) {
      var keys = placements[element.placement];

      if (!silent && keys.indexOf(element.key) !== -1) {
        throw new TypeError("Duplicated element (" + element.key + ")");
      }

      keys.push(element.key);
    },
    decorateElement: function (element, placements) {
      var extras = [];
      var finishers = [];

      for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
        var keys = placements[element.placement];
        keys.splice(keys.indexOf(element.key), 1);
        var elementObject = this.fromElementDescriptor(element);
        var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject);
        element = elementFinisherExtras.element;
        this.addElementPlacement(element, placements);

        if (elementFinisherExtras.finisher) {
          finishers.push(elementFinisherExtras.finisher);
        }

        var newExtras = elementFinisherExtras.extras;

        if (newExtras) {
          for (var j = 0; j < newExtras.length; j++) {
            this.addElementPlacement(newExtras[j], placements);
          }

          extras.push.apply(extras, newExtras);
        }
      }

      return {
        element: element,
        finishers: finishers,
        extras: extras
      };
    },
    decorateConstructor: function (elements, decorators) {
      var finishers = [];

      for (var i = decorators.length - 1; i >= 0; i--) {
        var obj = this.fromClassDescriptor(elements);
        var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj);

        if (elementsAndFinisher.finisher !== undefined) {
          finishers.push(elementsAndFinisher.finisher);
        }

        if (elementsAndFinisher.elements !== undefined) {
          elements = elementsAndFinisher.elements;

          for (var j = 0; j < elements.length - 1; j++) {
            for (var k = j + 1; k < elements.length; k++) {
              if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {
                throw new TypeError("Duplicated element (" + elements[j].key + ")");
              }
            }
          }
        }
      }

      return {
        elements: elements,
        finishers: finishers
      };
    },
    fromElementDescriptor: function (element) {
      var obj = {
        kind: element.kind,
        key: element.key,
        placement: element.placement,
        descriptor: element.descriptor
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      if (element.kind === "field") obj.initializer = element.initializer;
      return obj;
    },
    toElementDescriptors: function (elementObjects) {
      if (elementObjects === undefined) return;
      return _toArray(elementObjects).map(function (elementObject) {
        var element = this.toElementDescriptor(elementObject);
        this.disallowProperty(elementObject, "finisher", "An element descriptor");
        this.disallowProperty(elementObject, "extras", "An element descriptor");
        return element;
      }, this);
    },
    toElementDescriptor: function (elementObject) {
      var kind = String(elementObject.kind);

      if (kind !== "method" && kind !== "field") {
        throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"');
      }

      var key = _toPropertyKey(elementObject.key);

      var placement = String(elementObject.placement);

      if (placement !== "static" && placement !== "prototype" && placement !== "own") {
        throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"');
      }

      var descriptor = elementObject.descriptor;
      this.disallowProperty(elementObject, "elements", "An element descriptor");
      var element = {
        kind: kind,
        key: key,
        placement: placement,
        descriptor: Object.assign({}, descriptor)
      };

      if (kind !== "field") {
        this.disallowProperty(elementObject, "initializer", "A method descriptor");
      } else {
        this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");
        this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");
        element.initializer = elementObject.initializer;
      }

      return element;
    },
    toElementFinisherExtras: function (elementObject) {
      var element = this.toElementDescriptor(elementObject);

      var finisher = _optionalCallableProperty(elementObject, "finisher");

      var extras = this.toElementDescriptors(elementObject.extras);
      return {
        element: element,
        finisher: finisher,
        extras: extras
      };
    },
    fromClassDescriptor: function (elements) {
      var obj = {
        kind: "class",
        elements: elements.map(this.fromElementDescriptor, this)
      };
      var desc = {
        value: "Descriptor",
        configurable: true
      };
      Object.defineProperty(obj, Symbol.toStringTag, desc);
      return obj;
    },
    toClassDescriptor: function (obj) {
      var kind = String(obj.kind);

      if (kind !== "class") {
        throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"');
      }

      this.disallowProperty(obj, "key", "A class descriptor");
      this.disallowProperty(obj, "placement", "A class descriptor");
      this.disallowProperty(obj, "descriptor", "A class descriptor");
      this.disallowProperty(obj, "initializer", "A class descriptor");
      this.disallowProperty(obj, "extras", "A class descriptor");

      var finisher = _optionalCallableProperty(obj, "finisher");

      var elements = this.toElementDescriptors(obj.elements);
      return {
        elements: elements,
        finisher: finisher
      };
    },
    runClassFinishers: function (constructor, finishers) {
      for (var i = 0; i < finishers.length; i++) {
        var newConstructor = (0, finishers[i])(constructor);

        if (newConstructor !== undefined) {
          if (typeof newConstructor !== "function") {
            throw new TypeError("Finishers must return a constructor.");
          }

          constructor = newConstructor;
        }
      }

      return constructor;
    },
    disallowProperty: function (obj, name, objectType) {
      if (obj[name] !== undefined) {
        throw new TypeError(objectType + " can't have a ." + name + " property.");
      }
    }
  };
  return api;
}

function _createElementDescriptor(def) {
  var key = _toPropertyKey(def.key);

  var descriptor;

  if (def.kind === "method") {
    descriptor = {
      value: def.value,
      writable: true,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "get") {
    descriptor = {
      get: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "set") {
    descriptor = {
      set: def.value,
      configurable: true,
      enumerable: false
    };
  } else if (def.kind === "field") {
    descriptor = {
      configurable: true,
      writable: true,
      enumerable: true
    };
  }

  var element = {
    kind: def.kind === "field" ? "field" : "method",
    key: key,
    placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
    descriptor: descriptor
  };
  if (def.decorators) element.decorators = def.decorators;
  if (def.kind === "field") element.initializer = def.value;
  return element;
}

function _coalesceGetterSetter(element, other) {
  if (element.descriptor.get !== undefined) {
    other.descriptor.get = element.descriptor.get;
  } else {
    other.descriptor.set = element.descriptor.set;
  }
}

function _coalesceClassElements(elements) {
  var newElements = [];

  var isSameElement = function (other) {
    return other.kind === "method" && other.key === element.key && other.placement === element.placement;
  };

  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var other;

    if (element.kind === "method" && (other = newElements.find(isSameElement))) {
      if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {
        if (_hasDecorators(element) || _hasDecorators(other)) {
          throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated.");
        }

        other.descriptor = element.descriptor;
      } else {
        if (_hasDecorators(element)) {
          if (_hasDecorators(other)) {
            throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ").");
          }

          other.decorators = element.decorators;
        }

        _coalesceGetterSetter(element, other);
      }
    } else {
      newElements.push(element);
    }
  }

  return newElements;
}

function _hasDecorators(element) {
  return element.decorators && element.decorators.length;
}

function _isDataDescriptor(desc) {
  return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);
}

function _optionalCallableProperty(obj, name) {
  var value = obj[name];

  if (value !== undefined && typeof value !== "function") {
    throw new TypeError("Expected '" + name + "' to be a function");
  }

  return value;
}

var name = "c-promise2";
var version$3 = "0.11.11";
var description = "Promise with cancellation, decorators, signals, pause, timeouts, progress capturing and data flow support";
var author = {
	name: "Dmitriy Mozgovoy",
	email: "robotshara@gmail.com",
	url: "http://github.com/DigitalBrainJS/"
};
var main = "./dist/c-promise.cjs.js";
var module$1 = "./dist/c-promise.mjs";
var es2015 = "./dist/c-promise.mjs";
var browser = "./dist/c-promise.umd.js";
var unpkg = {
	"default": "./dist/c-promise.umd.js",
	module: "./dist/c-promise.js",
	production: "./dist/c-promise.umd.min.js"
};
var scripts = {
	test: "npm run test:build && mocha ./test/runner.js --exit --timeout=3000",
	"test:watch": "nodemon --watch lib/ --watch ./test/tests/CPromise.js --watch ./test/src --exec \"npm test\"",
	"test:coverage": "nyc --check-coverage npm run test",
	"test:decorators:build": "rollup ./test/src/decorators.js --file ./test/tests/decorators.js --format cjs --config ./test/rollup.config.js",
	"test:decorators:legacy:build": "rollup ./test/src/decorators.js --file ./test/tests/decorators.legacy.js --format cjs --config ./test/rollup.config.js --environment decorators:legacy",
	"test:build": "npm run test:decorators:build && npm run test:decorators:legacy:build",
	"coverage:report": "nyc report --reporter=html --reporter=text",
	coveralls: "nyc report --reporter=text-lcov | coveralls",
	prepublishOnly: "npm run build && npm run test:coverage && npm run docs",
	postversion: "git push && git push --tags",
	changelog: "auto-changelog -p",
	version: "npm run changelog  && git add CHANGELOG.md",
	build: "rollup -c",
	"build:watch": "nodemon --watch lib/ --exec \"npm run build\"",
	dev: "cross-env NODE_ENV=development \"npm run test:watch\"",
	playground: "npm run playground:build && concurrently --kill-others \"npm run playground:server\" \"npm run playground:watch\"",
	"playground:run": "node playground/build/index.js || true",
	"playground:build": "rollup ./playground/src/index.js --file ./playground/build/index.js --format cjs --config ./playground/rollup.config.js",
	"playground:watch": "nodemon --delay 1000ms -e js,jsx,css --watch ./playground/src/ --watch lib/ --exec \"npm run playground:build\"",
	"playground:server": "browser-sync start --server --index ./playground/index.html --files \"./playground/build/*.*\"",
	"playground:generator": "node playground/generator.js || true",
	"playground:generator:watch": "nodemon --watch ./playground --watch lib/ --exec \"npm run playground:generator\"",
	"playground:decorators": "rollup ./playground/src/decorators.js --file ./playground/build/decorators.js --format cjs --config ./playground/rollup.config.js && node playground/build/decorators.js || true",
	"playground:decorators:legacy": "rollup ./playground/src/decorators.js --file ./playground/build/decorators.js --format cjs --config ./playground/rollup.config.js --environment decorators:legacy && node playground/build/decorators.js || true",
	"playground:decorators:watch": "nodemon --watch ./playground/src/ --watch lib/ --exec \"npm run playground:decorators\"",
	docs: "jsdoc2md -t ./jsdoc2md/README.hbs.md ./lib/c-promise.js > ./README.md",
	"docs:namepaths": "jsdoc2md ./lib/c-promise.js --namepaths"
};
var husky = {
	hooks: {
		"pre-commit": "npm run docs && git add ."
	}
};
var repository = "https://github.com/DigitalBrainJS/c-promise.git";
var bugs = {
	url: "https://github.com/DigitalBrainJS/c-promise/issues"
};
var nyc = {
	lines: 60,
	functions: 60,
	branches: 60,
	statements: 60,
	watermarks: {
		lines: [
			80,
			95
		],
		functions: [
			80,
			95
		],
		branches: [
			80,
			95
		],
		statements: [
			80,
			95
		]
	},
	reporter: [
		"lcov",
		"text-summary"
	]
};
var keywords = [
	"promise",
	"cancelable",
	"cancellable",
	"p-cancelable",
	"timeout",
	"progress",
	"cancel",
	"abortable",
	"abort",
	"AbortController",
	"AbortSignal",
	"async",
	"signal",
	"await",
	"promises",
	"generator",
	"co",
	"yield",
	"reject",
	"race",
	"decorator",
	"delay",
	"break",
	"suspending",
	"wait",
	"bluebird",
	"deferred",
	"react",
	"setState",
	"cancellation",
	"aborting",
	"close",
	"closable",
	"pause",
	"task"
];
var license = "MIT";
var devDependencies = {
	"@babel/plugin-proposal-class-properties": "^7.13.0",
	"@babel/plugin-proposal-decorators": "^7.13.15",
	"@babel/preset-react": "^7.13.13",
	"@rollup/plugin-babel": "^5.3.0",
	"@rollup/plugin-commonjs": "^15.1.0",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-multi-entry": "^4.0.0",
	"@rollup/plugin-node-resolve": "^9.0.0",
	"@rollup/plugin-replace": "^2.4.2",
	"auto-changelog": "^2.2.1",
	bootstrap: "^4.6.0",
	concurrently: "^6.0.2",
	coveralls: "^3.1.0",
	"cp-axios": "^0.1.12",
	"cross-env": "^7.0.3",
	husky: "^4.3.8",
	install: "^0.13.0",
	"jsdoc-to-markdown": "^6.0.1",
	mocha: "^8.3.2",
	nodemon: "^2.0.7",
	npm: "^6.14.13",
	nyc: "^15.1.0",
	postcss: "^8.2.12",
	react: "^17.0.2",
	"react-bootstrap": "^1.5.2",
	"react-dom": "^17.0.2",
	"react-is": "^17.0.2",
	rollup: "^2.45.2",
	"rollup-plugin-postcss": "^4.0.0",
	"rollup-plugin-terser": "^7.0.2"
};
var require$$0 = {
	name: name,
	version: version$3,
	description: description,
	author: author,
	main: main,
	module: module$1,
	es2015: es2015,
	browser: browser,
	unpkg: unpkg,
	scripts: scripts,
	husky: husky,
	"auto-changelog": {
	output: "CHANGELOG.md",
	unreleased: true,
	commitLimit: false
},
	repository: repository,
	bugs: bugs,
	nyc: nyc,
	keywords: keywords,
	license: license,
	devDependencies: devDependencies
};

const {
  version: version$2
} = require$$0;

const _version$2 = Symbol.for('CPromise:version');

const _versionNumber$2 = Symbol.for('CPromise:version:number');

const versionNumber$2 = version$2.split('.').reverse().reduce((computed, part, i) => computed + part * Math.pow(1000, i), 0);
let warned = false;

const warnVersionInteraction$2 = thing => {
  if (!warned) {
    warned = true;
    const meta = thing.constructor[_version$2];
    const versions = `v${version$2}<=>${meta ? 'v' + meta.version : '<version older than v0.11.11>'}`;
    console.warn(`Interaction of multiple versions of CPromise detected (${versions}).
      Please update your dependencies to the latest version to avoid using multiple package versions at the same time`);
  }

  return thing;
};

var env = {
  version: version$2,
  _version: _version$2,
  versionNumber: versionNumber$2,
  _versionNumber: _versionNumber$2,
  warnVersionInteraction: warnVersionInteraction$2
};

/**
 * @module CanceledError
 */
const {
  version: version$1,
  versionNumber: versionNumber$1,
  _version: _version$1,
  _versionNumber: _versionNumber$1,
  warnVersionInteraction: warnVersionInteraction$1
} = env;

const {
  hasOwnProperty: hasOwnProperty$2
} = Object.prototype;

const _scope = Symbol('scope');

const _errors = Symbol('errors');

const _code = Symbol('code');

const _isCanceledError = Symbol.for('CPromise:CanceledError');

const isExternalCanceledError = thing => thing[_isCanceledError] || thing.constructor.name === 'CanceledError' && hasOwnProperty$2.call(thing, 'scope');
/**
 * CanceledError
 */


const CanceledError$1 = class CanceledError extends Error {
  /**
   * Constructs a new error instance
   * @param {String} [reason]
   */
  constructor(reason = E_REASON_CANCELED$1) {
    super();
    this.name = this.constructor.name;
    const registered = this.constructor[_errors][reason];

    if (registered) {
      this.message = registered;
      this[_code] = reason;
    } else {
      this.message = reason;
    }

    this[_scope] = null;
  }
  /**
   * get promise scope where the error was raised
   * @returns {CPromise|null}
   */


  get scope() {
    return this[_scope];
  }
  /**
   * get error code
   * @returns {string}
   */


  get code() {
    return this[_code] || '';
  }

  set scope(scope) {
    if (!this[_scope]) {
      this[_scope] = scope;
      return;
    }

    throw Error('Scope has been already set');
  }
  /**
   * converts thing to a CanceledError instance
   * @param {String|Error} thing
   * @returns {CanceledError}
   */


  static from(thing) {
    const type = typeof thing;

    if (type === 'string' || thing == null) {
      return new CanceledError(thing);
    } else if (type === 'object') {
      if (thing instanceof Error) {
        if (thing instanceof CanceledError) {
          return thing;
        }

        return new CanceledError(thing.message);
      }
    }

    throw TypeError(`unable convert ${thing} to a CanceledError`);
  }
  /**
   * Check whether object is an instance of CanceledError
   * @param thing
   * @returns {boolean}
   */


  static isCanceledError(thing) {
    return thing && (thing instanceof this || isExternalCanceledError(thing) && warnVersionInteraction$1(thing));
  }

  static registerErrors(errors) {
    return Object.entries(errors).reduce((acc, [name, message]) => {
      Object.defineProperty(this, name, {
        value: name
      });
      this[_errors][name] = message;
      acc[name] = name;
      return acc;
    }, {});
  }
  /**
   * Rethrow the canceled error with optional codes matching
   * @param err an error to assert
   * @param {...String} [codes]
   * @throws CanceledError
   */


  static rethrow(err, ...codes) {
    const {
      length
    } = codes;

    if (!this.isCanceledError(err)) {
      return;
    }

    if (!length) {
      throw err;
    } else {
      const {
        code
      } = err;

      for (let i = 0; i < length; i++) {
        if (codes[i] === code) {
          throw err;
        }
      }
    }
  }

};
Object.defineProperties(CanceledError$1.prototype, {
  [_version$1]: {
    value: version$1
  },
  [_versionNumber$1]: {
    value: versionNumber$1
  }
});
Object.defineProperties(CanceledError$1.prototype, {
  [_isCanceledError]: {
    value: true
  }
});
CanceledError$1[_errors] = {};
const {
  E_REASON_CANCELED: E_REASON_CANCELED$1
} = CanceledError$1.registerErrors({
  E_REASON_CANCELED: 'canceled',
  E_REASON_TIMEOUT: 'timeout',
  E_REASON_DISPOSED: 'disposed',
  E_REASON_UNMOUNTED: 'component unmounted'
});
var canceledError = {
  CanceledError: CanceledError$1
};

/**
 * @module AbortController
 */
const _signal = Symbol('signal');

const _aborted = Symbol('aborted');

const _events$1 = Symbol('events');

const _abort = Symbol('abort');

const _repeatedly = Symbol('repeatedly');

const nativeAbortController = (() => {
  try {
    if (typeof AbortController$1 === 'function') {
      const controller = new AbortController$1();

      if (controller.toString() === '[object AbortController]' && controller.constructor.toString().indexOf('[native code]') !== -1) {
        return AbortController$1;
      }
    }
  } catch (e) {}
})();
/**
 * AbortSignalPolyfill class
 * @alias CPromise.AbortSignalPolyfill
 */


const AbortSignal = class AbortSignal {
  /**
   * Constructs a new AbortSignal instance
   */
  constructor(repeatedly) {
    this[_events$1] = {};
    this[_aborted] = false;
    this[_repeatedly] = repeatedly;
  }
  /**
   * Check whether controller is aborted
   * @returns {Boolean}
   */


  get aborted() {
    return this[_aborted];
  }
  /**
   * adds a new listener to the controller
   * @param {String|Symbol} event
   * @param {Function} listener
   */


  addEventListener(event, listener) {
    const events = this[_events$1];
    if (!events) return;
    const listeners = events[event];

    if (!listeners) {
      events[event] = listener;
      return;
    }

    typeof listeners === 'function' ? events[event] = [listeners, listener] : listeners.push(listener);
  }
  /**
   * removes the listener
   * @param {String|Symbol} event
   * @param {Function} listener
   */


  removeEventListener(event, listener) {
    const events = this[_events$1];
    if (!events) return;
    const listeners = events[event];

    if (!listeners) {
      return;
    }

    if (typeof listeners === 'function') {
      events[event] = null;
      return;
    }

    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.length > 1 ? listeners.splice(index, 1) : events[event] = null;
    }
  }
  /**
   * dispatch the event
   * @param {String|Symbol} type
   * @param {String} [reason]
   */


  dispatchEvent(type, reason) {
    if (!this[_events$1]) return;
    let listener;
    const event = {
      type,
      target: this,
      bubbles: false,
      cancelable: false
    };
    typeof (listener = this['on' + type]) === 'function' && listener.call(this, event);
    const listeners = this[_events$1][type];
    if (!listeners) return;

    if (typeof listeners === 'function') {
      listeners.call(this, type, event, reason);
      return;
    }

    const {
      length
    } = listeners;

    for (let i = 0; i < length; i++) {
      listeners[i].call(this, type, event, reason);
    }
  }

  [_abort](reason) {
    if (this[_repeatedly]) {
      this.dispatchEvent('abort', reason);
      return;
    }

    if (this[_aborted]) return;
    this[_aborted] = true;
    this.dispatchEvent('abort', reason);
    this[_events$1] = null;
  }

  clear() {
    this[_events$1] = {};
  }

  get [Symbol.toStringTag]() {
    return 'AbortSignal';
  }

  get repeatedly() {
    return this[_repeatedly];
  }

  toString() {
    return '[object AbortSignal]';
  }

};
/**
 * AbortController class
 */

const AbortController$1 = class AbortController {
  /**
   * Constructs new AbortController instance
   */
  constructor(repeatedly) {
    this[_signal] = null;
    this[_repeatedly] = !!repeatedly;
  }
  /**
   * returns the signal of the controller
   * @returns {AbortSignal}
   */


  get signal() {
    return this[_signal] || (this[_signal] = new AbortSignal(this[_repeatedly]));
  }

  set signal(v) {
    throw Error('signal is read-only property');
  }
  /**
   * Abort the controller
   * @param {String} [reason]
   */


  abort(reason) {
    this.signal[_abort](reason);
  }

  get [Symbol.toStringTag]() {
    return 'AbortController';
  }

  toString() {
    return '[object AbortController]';
  }

};

const isAbortSignal$2 = thing => {
  return thing && typeof thing === 'object' && typeof thing.aborted === 'boolean' && typeof thing.addEventListener === 'function' && typeof thing.removeEventListener === 'function';
};

const isAbortController$2 = thing => {
  return thing && typeof thing === 'object' && typeof thing.abort === 'function' && isAbortSignal$2(thing.signal);
};

var abortController = {
  AbortController: nativeAbortController || AbortController$1,
  AbortControllerEx: AbortController$1,
  AbortSignalEx: AbortSignal,
  isAbortSignal: isAbortSignal$2,
  isAbortController: isAbortController$2
};

const {
  isAbortSignal: isAbortSignal$1,
  isAbortController: isAbortController$1
} = abortController;

const typify = (validator, type, kind) => {
  validator.type = type;
  kind && (validator.kind = kind);
  return validator;
};

const findValidatorName = validator => {
  const fnName = Object.keys(validators$1).find(key => validators$1[key] === validator) || validator.name;
  return fnName ? fnName.replace(/[A-Z]/g, char => '.' + char.toLowerCase()) : '';
};

const renderValidator = validator => validator && (validator.type || findValidatorName(validator)) || '';

const compose = (...validators) => {
  return typify(thing => {
    const {
      length
    } = validators;

    for (let i = 0; i < length; i++) {
      const result = validators[i](thing);

      if (result !== true) {
        return result;
      }
    }

    return true;
  }, validators.map(renderValidator).join('.'));
};

const renderValue = value => typeof value == 'string' ? `'${value}'` : String(value);

const validators$1 = {
  null: thing => thing === null,
  nullable: typify(thing => thing == null, 'undefined|null'),
  numberFinitePositive: thing => typeof thing === 'number' && Number.isFinite(thing) && thing >= 0,
  functionPlain: thing => typeof thing === 'function' && thing.constructor === Function,
  array: thing => Array.isArray(thing),
  union: (...validators) => {
    const len = validators.length;
    const shouldBe = validators.map(renderValidator).join('|');
    return typify(thing => {
      for (let i = 0; i < len; i++) {
        if (validators[i](thing) === true) {
          return true;
        }
      }
    }, shouldBe);
  },
  abortController: typify(isAbortSignal$1, 'AbortController'),
  abortSignal: typify(isAbortController$1, 'AbortSignal'),
  values: (...values) => typify(thing => values.indexOf(thing) !== -1, values.map(renderValue).join('|'))
};
['object', 'boolean', 'number', 'function', 'string', 'symbol', 'undefined'].forEach((type, i) => {
  validators$1[type] = typify(thing => typeof thing === type || `a${i < 1 ? 'n' : ''} ${type}`, type);
});
const {
  array: array$1,
  object: object$1,
  union: union$1
} = validators$1;

validators$1.object = (schema, required, allowUnknown = false) => {
  const rendered = schema && Object.entries(schema).map(([prop, validator]) => {
    return `${prop}: ${renderValidator(validator)}`;
  }).join(', ');
  return schema ? compose(object$1, typify(thing => {
    validateOptions$1(thing, schema, required, allowUnknown);
    return true;
  }, schema ? `<${rendered}>` : '')) : object$1;
};

validators$1.array = (...validators) => {
  const validator = validators.length > 1 ? union$1(...validators) : validators[0];
  return compose(array$1, typify(thing => {
    if (thing.every(validator) === true) {
      return true;
    }
  }, `<${renderValidator(validator) || '*'}>`));
};

validators$1.rest = (...validators) => {
  const validator = validators.length > 1 ? union$1(...validators) : validators[0];
  return typify(validator, `...${renderValidator(validator) || '*'}`, 'rest');
};

function validateOptions$1(options, schema, required = null, allowUnknown = false) {
  if (typeof options !== 'object') {
    throw TypeError('options must be an object');
  }

  required && required.forEach(option => {
    if (options[option] === undefined) {
      throw Error(`Option ${option} is required`);
    }
  });
  const keys = Object.getOwnPropertyNames(options);
  let i = keys.length;

  while (i-- > 0) {
    const option = keys[i];
    const validator = schema[option];

    if (validator) {
      const value = options[option];
      const result = value === undefined || validator(value);

      if (result !== true) {
        throw TypeError(`option '${option}' must be ${typeof result === 'string' ? result : renderValidator(validator)}`);
      }

      continue;
    }

    if (!allowUnknown) {
      throw Error(`Unknown option '${option}'`);
    }
  }

  return options;
}

function validateArguments$1(args, validators, {
  context = "function"
} = {}) {
  const {
    length
  } = validators;
  const argsCount = args.length;
  let restDetected;
  let validator;

  for (let i = 0; i < length; i++) {
    if (!restDetected) {
      validator = validators[i];

      if (validator.kind === 'rest') {
        restDetected = true;
      }
    }

    let result = validator(args[i]);

    if (result !== true) {
      const renderedType = result || renderValidator(validator);
      throw TypeError(`${context} ${i >= argsCount ? "requires" : "expects"} ${renderedType} as ${i + 1}th argument`);
    }
  }
}

var validator = {
  validators: validators$1,
  validateOptions: validateOptions$1,
  validateArguments: validateArguments$1
};

const {
  hasOwnProperty: hasOwnProperty$1
} = Object.prototype;

const isThenable$2 = obj => !!obj && (typeof obj === 'function' || typeof obj === 'object') && typeof obj.then === 'function';

const _setImmediate$1 = typeof setImmediate === 'function' ? setImmediate : function setImmediateShim(cb) {
  setTimeout(cb, 0);
};

function isGeneratorFunction$1(thing) {
  return typeof thing === 'function' && thing.constructor && thing.constructor.name === 'GeneratorFunction';
}

const getFnType$1 = thing => typeof thing === 'function' && {
  GeneratorFunction: 'generator',
  AsyncFunction: 'async',
  Function: 'plain'
}[thing.constructor.name];

function isGenerator$1(thing) {
  return thing && typeof thing === 'object' && typeof thing.next === 'function';
}

function EmptyObject$1() {}

EmptyObject$1.prototype = null;

const toGenerator$1 = function (thing, args, context = null) {
  if (isGeneratorFunction$1(thing)) {
    return thing.apply(context, args);
  }

  return thing && (isGenerator$1(thing) ? thing : thing[Symbol.iterator] && thing[Symbol.iterator]()) || null;
};

const toArray$1 = (thing, mapper) => {
  if (thing) {
    if (Array.isArray(thing)) {
      return mapper ? thing.map(mapper) : thing;
    }

    if (thing = toGenerator$1(thing)) {
      const arr = [];
      let item;

      while ((item = thing.next()) && item.done === false) {
        arr.push(mapper ? mapper(item.value) : item.value);
      }

      return arr;
    }
  }

  return null;
};

const isPropertyDescriptor$1 = (allowed => {
  return thing => {
    if (thing !== null && typeof thing === 'object') {
      const props = Object.getOwnPropertyNames(thing);
      return props.length && props.every(prop => allowed[prop]);
    }

    return false;
  };
})({
  value: true,
  set: true,
  get: true,
  writable: true,
  enumerable: true,
  configurable: true
});

const lazyBindMethods$1 = (obj, props) => {
  props.forEach(prop => {
    const symbol = Symbol(`${prop}Bound`);
    const {
      value: fn
    } = Object.getOwnPropertyDescriptor(obj, prop);
    Object.defineProperty(obj, prop, {
      get: function () {
        return hasOwnProperty$1.call(this, symbol) ? this[symbol] : this[symbol] = fn.bind(this);
      },
      set: function (v) {
        throw Error(`Can not rewrite method ${prop} with ${v}`);
      },
      enumerable: true,
      configurable: true
    });
  });
};

const globalObject = (() => {
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }

  if (typeof self !== 'undefined') {
    return self;
  }

  if (typeof window !== 'undefined') {
    return window;
  }

  if (typeof commonjsGlobal !== 'undefined') {
    return commonjsGlobal;
  }
})();

const isContextDefined$1 = context => context != null && context !== globalObject;

var utils$2 = {
  isPropertyDescriptor: isPropertyDescriptor$1,
  isThenable: isThenable$2,
  setImmediate: _setImmediate$1,
  isGenerator: isGenerator$1,
  isGeneratorFunction: isGeneratorFunction$1,
  EmptyObject: EmptyObject$1,
  toGenerator: toGenerator$1,
  toArray: toArray$1,
  getFnType: getFnType$1,
  lazyBindMethods: lazyBindMethods$1,
  globalObject,
  isContextDefined: isContextDefined$1,
  hasOwnProperty: hasOwnProperty$1
};

const {
  validateArguments
} = validator;

const {
  isContextDefined,
  isPropertyDescriptor,
  hasOwnProperty
} = utils$2;

const isModernDescriptor = thing => thing && typeof thing === 'object' && thing[Symbol.toStringTag] === 'Descriptor';

const isAnyPropertyDecoratorDescriptor = function (arg0, arg1, arg2) {
  if (arguments.length === 1) {
    return isModernDescriptor(arg0);
  }

  if (arguments.length === 3) {
    return isPropertyDescriptor(arg2);
  }
};

function reducePropertyDecorator(decorator) {
  return function (arg0, arg1, arg2) {
    if (arguments.length === 1) {
      return decorator(arg0);
    } else {
      const {
        descriptor,
        finisher
      } = decorator.call(null, {
        key: arg1,
        kind: "method",
        placement: typeof arg0 === "function" ? "static" : "prototype",
        descriptor: arg2
      });
      finisher && finisher(arg0.constructor);
      return descriptor;
    }
  };
}

const assertDecoratorArgs = (decoratorName, args, validators) => {
  validators && validateArguments(args, validators, {
    context: `@${decoratorName} decorator`
  });
};

const fail = (decoratorName, message) => {
  throw Error(`@${decoratorName}: ${message}`);
};

const propertyDecorator$1 = (builder, argsTypes, hook) => {
  return function (name, context) {
    function decorator(...params) {
      assertDecoratorArgs(name, params, argsTypes);
      return reducePropertyDecorator(descriptor => {
        if (descriptor.kind !== 'field' && descriptor.kind !== 'method') {
          throw Error(`${name} decorator can be used for method or field`);
        }

        return builder(descriptor, params, {
          context,
          fail: fail.bind(null, name),
          name
        });
      });
    }

    return function () {
      const hookResult = hook && isContextDefined(this) ? hook.apply(this, arguments) : undefined;

      if (hookResult !== undefined) {
        return hookResult;
      }

      if (isAnyPropertyDecoratorDescriptor.apply(null, arguments)) {
        return decorator().apply(null, arguments);
      }

      return decorator.apply(null, arguments);
    };
  };
};

function reduceClassDecorator(decorator) {
  return function (arg0) {
    if (arguments.length === 1) {
      if (typeof arg0 === 'function') {
        const {
          descriptor,
          finisher
        } = decorator({
          kind: "class"
        });
        finisher && finisher(arg0);
        return descriptor;
      } else if (isModernDescriptor(arg0)) {
        return decorator(arg0);
      }
    }

    throw new Error('cannot recognize decorator calling context');
  };
}

function isClassDecoratorContext(arg0) {
  return arguments.length === 1 && typeof arg0 === 'function' || isModernDescriptor(arg0);
}

const classDecorator$1 = (builder, argsTypes, hook) => {
  return function (name, context) {
    const decorator = function (...params) {
      assertDecoratorArgs(name, params, argsTypes);
      return reduceClassDecorator(descriptor => {
        if (descriptor.kind !== 'class') {
          fail(name, 'can only be used for classes');
        }

        return builder(descriptor, params, {
          context,
          fail: fail.bind(null, name),
          name
        });
      });
    };

    return function (arg0) {
      const hookResult = hook && isContextDefined(this) ? hook.apply(this, arguments) : undefined;

      if (hookResult !== undefined) {
        return hookResult;
      }

      if (isClassDecoratorContext.apply(null, arguments)) {
        return decorator().apply(null, arguments);
      }

      return decorator.apply(null, arguments);
    };
  };
};

const bindDecorators$1 = (context, decorators) => {
  const descriptors = {};
  Object.entries(decorators).forEach(([name, decorator]) => {
    const symbol = Symbol(`${name}Bound`);
    descriptors[name] = {
      get: function () {
        return hasOwnProperty.call(this, symbol) ? this[symbol] : this[symbol] = decorator(name, this);
      },
      configurable: true,
      enumerable: true
    };
  });
  Object.defineProperties(context, descriptors);
};

var decorators$1 = {
  propertyDecorator: propertyDecorator$1,
  classDecorator: classDecorator$1,
  bindDecorators: bindDecorators$1
};

/**
 * Cancellable Promise with extra features
 * @module CPromise
 */

/**
 * @typedef {String|Symbol} EventType
 */
const {
  CanceledError
} = canceledError;

const {
  E_REASON_CANCELED,
  E_REASON_TIMEOUT,
  E_REASON_DISPOSED,
  E_REASON_UNMOUNTED
} = CanceledError;

const {
  AbortController,
  AbortControllerEx,
  isAbortSignal,
  isAbortController
} = abortController;

const {
  validateOptions,
  validators
} = validator;

const {
  isThenable: isThenable$1,
  EmptyObject,
  setImmediate: setImmediate$1,
  isGeneratorFunction,
  isGenerator,
  toGenerator,
  toArray,
  getFnType,
  lazyBindMethods
} = utils$2;

const {
  classDecorator,
  propertyDecorator,
  bindDecorators
} = decorators$1;

const {
  versionNumber,
  _versionNumber,
  _version,
  version,
  warnVersionInteraction
} = env;

const {
  union,
  array,
  functionPlain,
  numberFinitePositive,
  number,
  boolean,
  string,
  symbol,
  object,
  rest,
  nullable
} = validators;
const {
  now
} = Date;
const {
  isArray: isArray$1
} = Array;

const _toCPromise = Symbol.for('toCPromise');

const _isCPromise = Symbol.for('isCPromise');

const _shadow = Symbol('shadow');

const _events = Symbol('events');

const _resolve = Symbol('done');

const _setInnerChain = Symbol('setInnerChain');

const _objectToCPromise = Symbol('objectToCPromise');

const _promisified = Symbol('promisified');

const TYPE_PROGRESS = Symbol('TYPE_PROGRESS');
const SIGNAL_CANCEL = Symbol('SIGNAL_CANCEL');
const SIGNAL_PAUSE = Symbol('SIGNAL_PAUSE');
const SIGNAL_RESUME = Symbol('SIGNAL_RESUME');
const ATOMIC_TYPE_DISABLED = 0;
const ATOMIC_TYPE_DETACHED = 1;
const ATOMIC_TYPE_AWAIT = 2;

const noop = () => {};

const atomicMap = new Map([['disabled', ATOMIC_TYPE_DISABLED], ['detached', ATOMIC_TYPE_DETACHED], ['await', ATOMIC_TYPE_AWAIT], [false, ATOMIC_TYPE_DISABLED], [true, ATOMIC_TYPE_AWAIT], [ATOMIC_TYPE_DISABLED, ATOMIC_TYPE_DISABLED], [ATOMIC_TYPE_DETACHED, ATOMIC_TYPE_DETACHED], [ATOMIC_TYPE_AWAIT, ATOMIC_TYPE_AWAIT]]);
const promiseAssocStore = new WeakMap();
const controllersStore = new WeakMap();

const computeWeightSum = promises => {
  let i = promises.length;
  let sum = 0;

  while (i-- > 0) {
    sum += promises[i][_shadow].weight;
  }

  return sum;
};
/**
 * @typedef {Function} CPromiseExecutorFn
 * @this CPromise
 * @param {Function} resolve
 * @param {Function} reject
 * @param {CPromise} scope
 */

/**
 * @typedef {Object} PromiseOptionsObject
 * @property {String} label
 * @property {Number} timeout
 * @property {Number} weight
 * @property {Boolean} [nativeController= false] prefer native AbortController class as the internal signal
 */

/**
 * If value is a number it will be considered as the value for timeout option
 * If value is a string it will be considered as a label
 * @typedef {PromiseOptionsObject|String|Number} CPromiseOptions
 */

/**
 * CPromise class
 * @namespace
 * @extends Promise
 */


const CPromise$1 = class CPromise extends Promise {
  /**
   * Creates a new CPromise instance
   * @param {CPromiseExecutorFn} [executor] - promise executor function that will be invoked
   * in the context of the new CPromise instance
   * @param {CPromiseOptions} [options]
   */
  constructor(executor, options) {
    if (options !== undefined && options !== null) {
      switch (typeof options) {
        case 'string':
          options = {
            label: options
          };
          break;

        case 'number':
          options = {
            timeout: options
          };
          break;

        case 'object':
          break;

        default:
          throw TypeError('options must be an object|string|number');
      }
    }

    let {
      label,
      weight,
      timeout,
      signal,
      nativeController = false
    } = options || {};
    let resolve, reject;
    super((_resolve, _reject) => {
      resolve = _resolve;
      reject = _reject;
    });
    this[_events] = new EmptyObject();
    const shadow = this[_shadow] = {
      resolve,
      reject,
      leafsCount: 0,
      paused: false,
      timestamp: -1,
      innerChain: null,
      parent: null,
      progress: 0,
      computedProgress: -1,
      totalWeight: -1,
      innerWeight: 0,
      throttle: 0,
      throttleTimer: 0,
      isCaptured: false,
      isListening: false,
      isPending: true,
      isCanceled: false,
      isRejected: false,
      isChain: true,
      label: '',
      weight: 1,
      value: undefined,
      nativeController,
      atomic: ATOMIC_TYPE_DISABLED,
      canceledWith: null
    };
    signal !== undefined && this.listen(signal);
    timeout !== undefined && this.timeout(timeout);
    weight !== undefined && this.weight(weight);
    label !== undefined && this.label(label);
    this.on('propagate', (type, scope, data) => {
      if (type === TYPE_PROGRESS) {
        shadow.computedProgress = -1;
        shadow.isListening && this.emit('progress', this.progress(), scope, data);
      }
    });
    this.on('newListener', event => {
      if (event === 'progress') {
        shadow.isListening = true;

        if (!shadow.isCaptured) {
          this.captureProgress();
        }
      }
    });
    this.on('removeListener', event => {
      if (event === 'progress') {
        if (shadow.isListening && !this.hasListeners('progress')) {
          shadow.isListening = false;
        }
      }
    });

    if (executor != null) {
      if (typeof executor !== 'function') {
        throw TypeError('CPromise executor is not a function');
      }

      try {
        executor.call(this, value => {
          this.resolve(value);
        }, err => {
          this.reject(err);
        }, this);
      } catch (err) {
        this.reject(err);
      }
    }
  }
  /**
   * @typedef {Function} OnCancelListener
   * @param {CanceledError} reason
   */

  /**
   * @typedef {Function} OnPauseListener
   */

  /**
   * @typedef {Function} OnResumeListener
   */

  /**
   * @typedef {Function} OnCaptureListener
   * @param {scope} CPromise
   */

  /**
   * registers the listener for cancel event
   * @param {OnCancelListener} listener
   * @returns {CPromise}
   */


  onCancel(listener) {}
  /**
   * registers the listener for pause event
   * @param {OnPauseListener} listener
   * @returns {CPromise}
   */


  onPause(listener) {}
  /**
   * registers the listener for resume event
   * @param {OnResumeListener} listener
   * @returns {CPromise}
   */


  onResume(listener) {}
  /**
   * registers the listener for capture event
   * @param {OnCaptureListener} listener
   * @returns {CPromise}
   */


  onCapture(listener) {}
  /**
   * @typedef {function} CPDoneListener
   * @param {*} value
   * @param {boolean} isRejected
   * @returns {CPromise}
   */

  /**
   * registers the listener for done event
   * @param {CPDoneListener} listener
   */


  onDone(listener) {}
  /**
   * Set or get the total weight of the inner chains
   * @param {Number} [weight]
   * @return {Number|CPromise}
   */


  totalWeight(weight) {
    if (arguments.length) {
      if (weight <= 0 || !Number.isFinite(weight)) {
        throw Error('weight must be a number greater than 0');
      }

      this[_shadow].totalWeight = weight;
      return this;
    }

    return this[_shadow].totalWeight;
  }
  /**
   * Set or get the total weight of the inner chains
   * @param {Number} [weight]
   * @return {Number|CPromise}
   */


  innerWeight(weight) {
    if (arguments.length) {
      if (!Number.isFinite(weight)) {
        throw Error('inner weight must be a number');
      }

      if (weight <= 0) {
        throw Error('inner weight must be greater than 0');
      }

      this[_shadow].innerWeight = weight;
      return this;
    }

    return this[_shadow].innerWeight;
  }
  /**
   * Subscribe to progress event
   * @param {Function} listener
   * @returns {CPromise}
   */

  /**
   * Set promise progress
   * @param {Number} [value] a number between [0, 1]
   * @param {*} [data] any data to send for progress event listeners
   * @param {CPromise} [scope] CPromise scope
   * @returns {Number|CPromise}
   */


  progress(value, data, scope) {
    const shadow = this[_shadow];

    if (arguments.length) {
      if (typeof value === 'function') {
        this.on('progress', value);
        return this;
      }

      if (!Number.isFinite(value)) {
        throw TypeError('value must be a number [0, 1]');
      }

      if (value < 0) {
        value = 0;
      } else if (value > 1) {
        value = 1;
      }

      if (!shadow.isCaptured) return this;

      if (value !== 0 && value !== 1) {
        value = value.toFixed(10) * 1;
      }

      if (shadow.progress !== value) {
        shadow.progress = value;

        if (value !== 1 && shadow.throttle) {
          if (!shadow.throttleTimer) {
            shadow.throttleTimer = setTimeout(() => {
              shadow.throttleTimer = 0;
              this.propagate(TYPE_PROGRESS, data, scope);
            }, shadow.throttle);
          }

          return this;
        }

        this.propagate(TYPE_PROGRESS, data, scope);
      }

      return this;
    }

    if (shadow.computedProgress === -1) {
      shadow.totalWeight === -1 && this.captureProgress();
      const scopes = this.scopes(true);
      let i = scopes.length;
      let sum = 0;
      let progress = 0;

      while (i-- > 0) {
        const scope = scopes[i];
        const thatShadow = scope[_shadow];
        const weight = thatShadow.weight;

        if (weight > 0) {
          sum += weight;
          progress += thatShadow.progress * weight;
        }
      }

      let total = shadow.totalWeight;

      if (total > 0) {
        return shadow.computedProgress = (progress + (total - sum)) / total;
      }

      shadow.computedProgress = progress / sum;
    }

    return shadow.computedProgress;
  }
  /**
   * emit propagate event that will propagate through each promise scope in the chain (bubbling)
   * @param {String|symbol} type - some type to identify the data kind
   * @param {*?} data - some data
   * @param {CPromise} [scope] - CPromise scope
   * @returns {CPromise}
   */


  propagate(type, data = null, scope = null) {
    return this.emit('propagate', type, scope || this, data);
  }
  /**
   * capture initial progress state of the chain
   * @param {Object} [options]
   * @param {Number} options.throttle set min interval for firing progress event
   * @param {Number} options.innerWeight set weight of the nested promises
   * @returns {CPromise}
   */


  captureProgress(options) {
    if (options) {
      validateOptions(options, {
        throttle: numberFinitePositive,
        innerWeight: numberFinitePositive
      });
      const {
        throttle,
        innerWeight
      } = options;

      if (throttle !== undefined) {
        this[_shadow].throttle = throttle;
      }

      if (innerWeight !== undefined) {
        this.innerWeight(innerWeight);
      }
    }

    const shadow = this[_shadow];
    const scopes = this.scopes(true);
    let i = scopes.length;
    let sum = 0;

    while (i-- > 0) {
      const scope = scopes[i];
      const thatShadow = scope[_shadow];
      const weight = thatShadow.weight;

      if (weight > 0) {
        sum += weight;

        if (!thatShadow.isCaptured) {
          thatShadow.isCaptured = true;
          scope.emit('capture', scope);
        }

        const inner = thatShadow.innerChain;

        if (inner && !inner[_shadow].isCaptured) {
          inner.captureProgress(options);
        }
      }
    }

    shadow.totalWeight = sum;
    return this;
  }
  /**
   * Returns all parent scopes that are in pending state
   * @param {boolean} [pendingOnly= false]
   * @returns {CPromise[]}
   */


  scopes(pendingOnly) {
    let scope = this;
    const scopes = [scope];

    while ((scope = scope[_shadow].parent) && (!pendingOnly || scope[_shadow].isPending)) {
      scopes.push(scope);
    }

    return scopes;
  }
  /**
   * timeout before the promise will be canceled
   * @param {Number} [ms] - timeout in ms
   * @returns {Number|CPromise}
   */


  timeout(ms) {
    const shadow = this[_shadow];

    if (arguments.length) {
      if (shadow.timer) {
        shadow.timestamp = -1;
        clearTimeout(shadow.timer);
        shadow.timer = null;
      }

      if (typeof ms !== 'number' || ms < 0) {
        throw TypeError('timeout must be a positive number');
      }

      if (ms > 0) {
        shadow.timestamp = now();
        shadow.timer = setTimeout(() => {
          this.cancel(E_REASON_TIMEOUT);
        }, shadow.timeout = ms);
      }

      return this;
    }

    return shadow.timeout;
  }
  /**
   * get promise abort signal object
   * @type {AbortSignal}
   */


  get signal() {
    const shadow = this[_shadow];
    if (this[_shadow].controller) return this[_shadow].controller.signal;
    return (this[_shadow].controller = new (shadow.nativeController ? AbortController : AbortControllerEx)()).signal;
  }
  /**
   * Sets the promise weight in progress capturing process
   * @param {Number} [weight] - any number greater or equal 0
   * @returns {Number|CPromise} returns weight if no arguments were specified
   */


  weight(weight) {
    if (arguments.length) {
      if (typeof weight !== 'number') {
        throw TypeError('weight must be a number');
      }

      if (weight < 0) {
        throw Error('weight must must be a positive number');
      }

      this[_shadow].weight = weight;
      return this;
    }

    return this[_shadow].weight;
  }
  /**
   * Sets the promise label
   * @param {String} [label] - any string
   * @returns {Number|CPromise} returns weight if no arguments were specified
   */


  label(label) {
    if (arguments.length) {
      this[_shadow].label = label;
      return this;
    }

    return this[_shadow].label;
  }
  /**
   * indicates if the promise is pending
   * @returns {Boolean}
   */


  get isPending() {
    return this[_shadow].isPending;
  }
  /**
   * indicates if the promise is pending
   * @returns {Boolean}
   */


  get isCanceled() {
    return this[_shadow].isCanceled;
  }
  /**
   * indicates if the promise progress is captured
   * @return {Boolean}
   */


  get isCaptured() {
    return this[_shadow].isCaptured;
  }
  /**
   * indicates if the promise is paused
   * @returns {Boolean}
   */


  get isPaused() {
    return this[_shadow].paused;
  }
  /**
   * indicates if the promise is rejected
   * @returns {Boolean}
   */


  get isRejected() {
    return this[_shadow].isRejected;
  }
  /**
   * get parent promise
   * @returns {CPromise|null}
   */


  get parent() {
    return this[_shadow].parent;
  }
  /**
   * Resolves the promise with given value
   * @param value
   * @returns {CPromise}
   */


  resolve(value) {
    this[_resolve](value, false);

    return this;
  }
  /**
   * Rejects the promise with given error
   * @param err
   * @returns {CPromise}
   */


  reject(err) {
    this[_resolve](err, true);

    return this;
  }

  [_setInnerChain](chain, captureProgress) {
    const shadow = this[_shadow];
    shadow.innerChain = chain;
    chain.on('propagate', (type, scope, data) => {
      if (type === TYPE_PROGRESS) {
        if (!captureProgress || !shadow.isCaptured) return;
        const progress = chain.progress();
        this.progress(progress, data);
        return;
      }

      this.emit('propagate', type, scope, data);
    });

    if (captureProgress) {
      shadow.isCaptured && chain.captureProgress();
      shadow.innerWeight = chain[_shadow].totalWeight;
    }
  }

  [_resolve](value, isRejected) {
    const shadow = this[_shadow];
    if (!shadow.isPending) return this;

    const complete = (value, isRejected) => {
      shadow.timer && clearTimeout(shadow.timer);

      const resolve = () => {
        shadow.isRejected = isRejected;
        shadow.value = value;

        if (isRejected) {
          shadow.isCanceled && !shadow.leafsCount && super.then(null, noop);
          this.emit('done', value, isRejected);
          shadow.reject(value);
        } else {
          shadow.isCaptured && this.progress(1);
          this.emit('done', undefined, value);
          shadow.resolve(value);
        }

        shadow.isPending = false;
        shadow.innerChain = null;
        shadow.parent && shadow.parent[_shadow].leafsCount--;
        shadow.parent = null;
        this[_events] = null;
      };

      if (isRejected && value && CanceledError.isCanceledError(value)) {
        shadow.isCanceled = true;
        value.scope || (value.scope = this);

        if (shadow.controller) {
          shadow.controller.abort();
          shadow.controller = null;
        }

        this.emit('cancel', value);
        resolve();
        return;
      }

      if (shadow.paused) {
        return this.on('resume', resolve);
      }

      resolve();
    };

    if (!isRejected && shadow.canceledWith) {
      complete(shadow.canceledWith, true);
    }

    if (!isThenable$1(value)) {
      complete(value, isRejected);
      return;
    }

    if (this.constructor.isCPromise(value)) {
      this[_setInnerChain](value, true);
    }

    super.then.call(value, value => {
      complete(value);
    }, err => {
      complete(err, true);
    });
  }
  /**
   * Pause promise
   * @returns {Boolean}
   */


  pause() {
    return this.emitSignal(SIGNAL_PAUSE, null, function () {
      const shadow = this[_shadow];

      if (!shadow.paused) {
        shadow.paused = true;

        if (shadow.timer) {
          clearTimeout(shadow.timer);
          shadow.timer = null;
          shadow.timestamp !== -1 && (shadow.timeLeft = now() - shadow.timestamp);
        }

        this.emit('pause');
      }

      return true;
    });
  }
  /**
   * Resume promise
   * @returns {Boolean}
   */


  resume() {
    return this.emitSignal(SIGNAL_RESUME, null, function () {
      const shadow = this[_shadow];

      if (shadow.paused) {
        shadow.paused = false;

        if (shadow.timeLeft) {
          this.timeout(shadow.timeLeft);
          shadow.timeLeft = 0;
        }

        this.emit('resume');
      }

      return true;
    });
  }
  /**
   * @typedef {number|boolean|"disabled"|"detached"|"await"} AtomicType
   */

  /**
   * Make promise chain atomic (non-cancellable for external signals)
   * @param {AtomicType} [type]
   * @returns CPromise
   */


  atomic(type = ATOMIC_TYPE_AWAIT) {
    const _type = atomicMap.get(type);

    if (_type === undefined) {
      throw Error(`Unknown atomic type '${type}'`);
    }

    this[_shadow].atomic = _type;
    return this;
  }
  /**
   * throws the CanceledError that cause promise chain cancellation
   * @param {String|Error} [reason]
   * @param {Boolean} [force]
   */


  cancel(reason, force = false) {
    return this.emitSignal(SIGNAL_CANCEL, {
      err: CanceledError.from(reason),
      force
    }, function ({
      err
    }) {
      !this[_shadow].canceledWith && this.reject(err);
      return true;
    }, ({
      err,
      force
    }, type, scope, isRoot) => {
      const shadow = scope[_shadow];
      const {
        atomic
      } = shadow;

      if (atomic === ATOMIC_TYPE_DETACHED) {
        return false;
      }

      if (atomic === ATOMIC_TYPE_AWAIT) {
        shadow.canceledWith = err;
        return true;
      }

      if (!isRoot && !force && scope[_shadow].leafsCount > 1) {
        return false;
      }
    });
  }
  /**
   * @typedef {String|Symbol} Signal
   */

  /**
   * @typedef {Function} SignalHandler
   * @param {*} data
   * @param {Signal} type
   * @param {CPromise} scope
   * @this {CPromise}
   * @returns {Boolean}
   */

  /**
   * @typedef {Function} SignalLocator
   * @param {*} data
   * @param {Signal} type
   * @param {CPromise} scope
   * @param {Boolean} isRoot
   * @this {CPromise}
   * @returns {Boolean}
   */

  /**
   * Emit a signal of the specific type
   * @param {Signal} type
   * @param {*} [data]
   * @param {SignalHandler} [handler]
   * @param {SignalLocator} [locator]
   * @returns {Boolean}
   */


  emitSignal(type, data, handler, locator) {
    const emit = (scope, isRoot) => {
      const shadow = scope[_shadow];
      if (!shadow.isPending) return false;
      const locatorResult = locator ? locator.call(scope, data, type, scope, isRoot) : undefined;

      if (locatorResult === false) {
        return false;
      }

      if (locatorResult !== true) {
        let {
          parent,
          innerChain
        } = shadow;

        if (parent && emit(parent, false)) {
          return true;
        }

        if (innerChain && emit(innerChain, false)) {
          return true;
        }
      }

      return !!(scope.emitHook('signal', type, data) || handler && handler.call(scope, data, type, scope));
    };

    return emit(this, true);
  }
  /**
   * Returns a chain that will be resolved after specified timeout
   * @param {Number} ms
   * @returns {CPromise}
   */


  delay(ms) {
    return this.then(value => this.constructor.delay(ms, value));
  }
  /**
   * returns a CPromise. It takes up to two arguments: callback functions for the success and failure cases of the Promise.
   * @param {onFulfilled} onFulfilled
   * @param {onRejected} [onRejected]
   * @returns {CPromise}
   */


  then(onFulfilled, onRejected) {
    if (onFulfilled != null && typeof onFulfilled !== 'function') {
      throw TypeError('onFulfilled is not a function');
    }

    if (onRejected != null && typeof onRejected !== 'function') {
      throw TypeError('onRejected is not a function');
    }

    const resolve = (value, isRejected) => {
      const shadow = promise[_shadow];
      const canceled = shadow.isCanceled;

      if (canceled) {
        isRejected = true;
        value = shadow.value;
      } else {
        if (isRejected && CanceledError.isCanceledError(value)) {
          shadow.isCanceled = true;
        }
      }

      const cb = isRejected ? onRejected || (err => {
        if (!canceled) {
          throw err;
        }
      }) : onFulfilled;
      return isGeneratorFunction(cb) ? this.constructor.run(cb, {
        resolveSignatures: true,
        args: [value]
      }) : cb.call(promise, value, promise);
    };

    const promise = super.then(onFulfilled ? resolve : value => {
      if (this[_shadow].isCanceled) {
        promise[_shadow].isCanceled = true;
      }

      return value;
    }, err => resolve(err, true));
    promise[_shadow].parent = this;
    this[_shadow].leafsCount++;
    this.on('propagate', (type, scope, data) => {
      promise.emit('propagate', type, scope, data);
    });
    return promise;
  }
  /**
   * Catches rejection with optionally specified Error class
   * @param {Function} onRejected
   * @param {Error} [filter]
   * @returns {CPromise}
   */


  catch(onRejected, filter) {
    if (filter) {
      return super.catch((err, scope) => {
        if (err instanceof filter) {
          return onRejected.call(scope, err, scope);
        }

        throw err;
      });
    }

    return super.catch(onRejected);
  }
  /**
   * @typedef {function} CPFinallyHandler
   * @param {*} settledValue
   * @param {boolean} isRejected
   * @param {CPromise} scope
   * @this CPromise
   */

  /**
   * Add done chain, whose handler will be invoked in any case with resolved value or rejection error
   * @param {CPFinallyHandler} finallyHandler
   * @returns {Promise<T | void>}
   */


  finally(finallyHandler) {
    return this.then((value, scope) => finallyHandler.call(scope, value, false, scope), (err, scope) => finallyHandler.call(scope, err, true, scope));
  }
  /**
   * Catches CancelError rejection
   * @param {Function} [onCanceled]
   * @returns {CPromise}
   */


  canceled(onCanceled) {
    return this.catch((err, scope) => {
      if (CanceledError.isCanceledError(err)) {
        if (onCanceled === undefined) return;

        if (typeof onCanceled !== 'function') {
          throw TypeError('onCanceled must be a function');
        }

        return onCanceled(err, scope);
      }

      throw err;
    });
  }
  /**
   * Checks if thing is an CanceledError instance
   * @param thing
   * @returns {boolean}
   */


  static isCanceledError(thing) {
    return CanceledError.isCanceledError(thing);
  }
  /**
   * Returns a CPromise that will be resolved after specified timeout
   * @param {Number} ms - delay before resolve the promise with specified value
   * @param value
   * @param {object} [options]
   * @param {number} [options.progressTick= 1000] progress timer tick, must be >= 100ms
   * @returns {CPromise}
   */


  static delay(ms, value, options) {
    return new this((resolve, reject, scope) => {
      if (!Number.isFinite(ms)) {
        throw TypeError('delay must be a finite number');
      }

      let timer = setTimeout(() => {
        timer = 0;
        resolve(value);
      }, ms);
      scope.onDone(() => timer && clearTimeout(timer));
      const {
        progressTick = 1000
      } = options !== undefined ? validateOptions(options, {
        progressTick: numberFinitePositive
      }) : {};

      if (progressTick) {
        if (progressTick < 100) {
          throw Error('progressTick must be grater than 100ms to avoid performance impact');
        }

        const captureProgress = () => {
          if (ms > progressTick * 1.5) {
            let timestamp = Date.now();
            const progressTimer = setInterval(() => {
              scope.progress((Date.now() - timestamp) / ms);
            }, progressTick);
            scope.onDone(() => clearTimeout(progressTimer));
          }
        };

        if (scope.isCaptured) {
          captureProgress();
        } else {
          scope.onCapture(captureProgress);
        }
      }
    });
  }
  /**
   * Listen for abort signal
   * @param {AbortSignal} signal
   * @returns {CPromise}
   */


  listen(signal) {
    if (!isAbortSignal(signal)) {
      throw TypeError('signal should implement AbortSignal interface');
    }

    const signalListener = (type, event, reason) => {
      this.cancel(reason);
    };

    signal.addEventListener('abort', signalListener);
    this.on('done', () => {
      signal.removeEventListener('abort', signalListener);
    });
    return this;
  }
  /**
   * @typedef {object} AllOptions
   * @property {number} concurrency limit concurrency of promise being run simultaneously
   * @property {function} mapper function to map each element
   * @property {boolean} ignoreResults do not collect results
   * @property {boolean} signatures use advanced signatures for vales resolving
   */

  /**
   * Returns a single CPromise that resolves to an array of the results of the input promises.
   * If one fails then other promises will be canceled immediately
   * @param {Iterable|Generator|GeneratorFunction} iterable
   * @param {AllOptions} [options]
   * @returns {CPromise}
   * @example
   * CPromise.all(function*(){
   *     yield axios.get(url1);
   *     yield axios.get(url2);
   *     yield axios.get(url3);
   * }, {concurrency: 1}).then(console.log)
   */


  static all(iterable, options) {
    return new this((resolve, reject, scope) => {
      let pending;
      let results;
      let progressAcc = 0;
      let isCaptured;
      let endReached;
      let generator;

      if (options !== undefined) {
        validateOptions(options, {
          concurrency: numberFinitePositive,
          ignoreResults: boolean,
          signatures: boolean,
          mapper: validators.function
        });
      }

      let {
        concurrency = 0,
        ignoreResults,
        signatures,
        mapper
      } = options || {};

      const cancel = reason => {
        const {
          length
        } = pending;

        for (let i = 0; i < length; i++) {
          pending[i].cancel(reason);
        }
      };

      scope.onCancel(cancel);
      scope.onPause(() => {
        const {
          length
        } = pending;

        for (let i = 0; i < length; i++) {
          pending[i].pause();
        }
      });
      scope.onResume(() => {
        const {
          length
        } = pending;

        for (let i = 0; i < length; i++) {
          pending[i].resume();
        }
      });
      scope.on('signal', (type, data) => {
        const {
          length
        } = pending;
        let result = false;

        for (let i = 0; i < length; i++) {
          if (pending[i].emitSignal(type, data)) {
            result = true;
          }
        }

        return result;
      });

      const handleProgress = (value, _scope, data) => {
        let total = scope.innerWeight() || 1;
        let sum = progressAcc;
        const {
          length
        } = pending;

        for (let i = 0; i < length; i++) {
          const promise = pending[i];
          sum += promise.progress() * promise.weight();
        }

        sum <= total && scope.progress(sum / total, _scope, data);
      };

      const _reject = err => {
        reject(err);
        cancel();
      };

      function throwConvertError() {
        throw TypeError('unable to convert object to iterable');
      }

      scope.on('capture', () => {
        let i = pending.length;

        while (i-- > 0) {
          pending[i].progress(handleProgress);
        }

        isCaptured = true;
        !scope.innerWeight() && scope.innerWeight(computeWeightSum(pending));
      });

      if (!concurrency) {
        pending = toArray(iterable, (value, i) => {
          return this.from(mapper ? mapper(value, i) : value, signatures);
        }) || throwConvertError();
        return super.all(pending).then(resolve, _reject);
      }

      generator = toGenerator(iterable) || throwConvertError();
      pending = [];
      !ignoreResults && (results = []);

      const next = value => {
        const promise = this.from(value, signatures);
        pending.push(promise);
        isCaptured && promise.progress(handleProgress);
        promise.then(resolved => {
          const index = pending.indexOf(promise);

          if (index !== -1) {
            pending.splice(index, 1);
          }

          !ignoreResults && results.push(resolved);
          isCaptured && (progressAcc += promise.weight());
          !endReached && pump();

          if (!pending.length) {
            resolve(ignoreResults ? undefined : results);
          }
        }, _reject);
      };

      const pump = () => {
        while (!endReached && pending.length < concurrency) {
          let item;

          try {
            item = generator.next();
          } catch (err) {
            _reject(err);

            return;
          }

          if (item.done) {
            endReached = true;
            return;
          }

          next(mapper ? mapper(item.value) : item.value);
        }
      };

      pump();
    });
  }
  /**
   * returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects,
   * with the value or reason from that promise. Other pending promises will be canceled immediately
   * @param {Iterable} thenables
   * @returns {CPromise}
   */


  static race(thenables) {
    return new this((resolve, reject, scope) => {
      thenables = toArray(thenables);
      const {
        length
      } = thenables;

      for (let i = 0; i < length; i++) {
        thenables[i] = this.from(thenables[i]);
      }

      const cancel = reason => {
        for (let i = 0; i < length; i++) {
          thenables[i].cancel(reason);
        }
      };

      scope.on('capture', () => {
        let max = 0;

        for (let i = 0; i < length; i++) {
          thenables[i].progress((value, scope, data) => {
            for (let i = 0; i < length; i++) {
              if (value > max) {
                max = value;
                return scope.set(value, data);
              }
            }
          });
        }
      });
      scope.onCancel(cancel);
      scope.onPause(() => {
        for (let i = 0; i < length; i++) {
          thenables[i].pause();
        }
      });
      scope.onResume(() => {
        for (let i = 0; i < length; i++) {
          thenables[i].resume();
        }
      });
      scope.on('signal', (type, data) => {
        const {
          length
        } = thenables;
        let result = false;

        for (let i = 0; i < length; i++) {
          if (thenables[i].emitSignal(type, data)) {
            result = true;
          }
        }

        return result;
      });
      super.race(thenables).then(value => {
        resolve(value);
        cancel();
      }, err => {
        reject(err);
        cancel();
      });
    });
  }
  /**
   * returns a promise that resolves after all of the given promises have either fulfilled or rejected
   * @param {Iterable|Generator|GeneratorFunction} iterable
   * @param {AllOptions} [options]
   * @returns {CPromise}
   */


  static allSettled(iterable, options) {
    const {
      mapper,
      ...allOptions
    } = options || {};
    return this.all(iterable, { ...allOptions,
      mapper: (value, i) => {
        return this.resolve(mapper ? mapper(value, i) : value).then(value => ({
          status: "fulfilled",
          value
        }), err => {
          if (CanceledError.isCanceledError(err)) {
            throw err;
          }

          return {
            status: "rejected",
            reason: err
          };
        });
      }
    });
  }
  /**
   * @typedef {function} CPRetryFunction
   * @param {number} attempt
   * @param {array} args
   * @returns {*}
   */

  /**
   * @typedef {GeneratorFunction} CPGeneratorRetryFunction
   * @param {CPromise} scope
   * @param {number} attempt
   * @param {array} args
   * @returns {*}
   */

  /**
   * @typedef {function} CPRetryDelayResolver
   * @param {number} attempt
   * @param {number} retries
   * @returns {number} a delay in ms before next attempt
   */

  /**
   * Retry async operation
   * @param {CPGeneratorRetryFunction|CPRetryFunction} fn
   * @param {object} [options]
   * @param {array} [options.args]
   * @param {number} [options.retries]
   * @param {number|CPRetryDelayResolver} [options.delayWeight]
   * @param {object} [options.delay]
   * @return {CPromise}
   */


  static retry(fn, options) {
    if (typeof fn !== 'function') {
      throw TypeError('fn must be a function');
    }

    options !== undefined && validateOptions(options, {
      args: array(),
      retries: numberFinitePositive,
      delayWeight: numberFinitePositive,
      delay: union(numberFinitePositive, functionPlain)
    });
    const {
      args = [],
      retries = 3,
      delayWeight = 0.1,
      delay = attempt => attempt * 1000
    } = typeof options === 'number' ? {
      retries: options
    } : options || {};
    let attemptIndex = 0;
    return new this((resolve, reject, scope) => {
      const shadow = scope[_shadow];

      const attempt = () => {
        const fnArgs = [attemptIndex, args];

        const doAttempt = () => {
          return isGeneratorFunction(fn) ? this.run(fn, {
            args: fnArgs,
            scopeArg: true
          }) : this.from(fn.apply(scope, fnArgs));
        };

        let _delay = delay;

        if (attemptIndex && typeof delay === 'function') {
          _delay = delay(attemptIndex, retries);

          if (!numberFinitePositive(_delay)) {
            throw TypeError(`delay fn must return a finite number`);
          }
        }

        scope.progress(0);
        const promise = (attemptIndex && _delay ? this.delay(_delay).weight(delayWeight).then(doAttempt) : doAttempt()).weight(0.9).then(resolve, err => {
          if (!CanceledError.isCanceledError(err)) {
            if (++attemptIndex < retries || !retries) {
              setImmediate$1(attempt);
              return;
            }
          }

          reject(err);
        }).weight(0);

        if (shadow.innerChain) {
          shadow.innerChain[_events] = null;
        }

        scope[_setInnerChain](promise, true);

        return promise;
      };

      attempt();
    });
  }

  static [_objectToCPromise](thing) {
    if (!thing) return null;
    const convertMethod = thing[_toCPromise];

    if (typeof convertMethod === 'function') {
      if (promiseAssocStore.has(thing)) {
        return promiseAssocStore.get(thing);
      }

      const returnedValue = convertMethod.call(thing, this);

      if (!this.isCPromise(returnedValue)) {
        throw Error(`method '[${convertMethod}]' must return a CPromise instance`);
      }

      promiseAssocStore.set(thing, returnedValue);
      return returnedValue;
    }

    if (typeof thing.then === 'function') {
      return new this((resolve, reject, {
        onCancel
      }) => {
        if (typeof thing.cancel === 'function') {
          onCancel(reason => {
            try {
              thing.cancel(reason);
            } catch (err) {
              reject(err);
            }
          });
        }

        return thing.then(resolve, reject);
      });
    }

    return null;
  }
  /**
   * Converts thing to CPromise using the following rules:
   * - CPromise instance returns as is
   * - Objects with special method defined with key `Symbol.for('toCPromise')` will be converted using this method
   *   The result will be cached for future calls
   * - Thenable wraps into a new CPromise instance, if thenable has the `cancel` method it will be used for canceling
   * - Generator function will be resolved to CPromise
   * - Array will be resoled via `CPromise.all`, arrays with one element (e.g. `[[1000]]`) will be resolved via `CPromise.race`
   *
   * This method returns null if the conversion failed.
   * @param {*} thing
   * @param {Object} [options]
   * @param {Boolean} [options.resolveSignatures= true]
   * @param {Array} [options.args]
   * @returns {CPromise}
   */


  static from(thing, options) {
    if (thing instanceof this) {
      return thing;
    }

    const {
      resolveSignatures = true,
      args
    } = (typeof options === 'boolean' ? {
      resolveSignatures: options
    } : options) || {};

    if (resolveSignatures) {
      const type = typeof thing;

      if (type === 'object') {
        if (isArray$1(thing)) {
          if (thing.length === 1) {
            const first = thing[0];

            if (isArray$1(first)) {
              return this.race(first.map(this.from, this));
            }
          }

          return this.all(thing.map(this.from, this));
        }
      } else if (type === 'function') {
        if (isGeneratorFunction(thing)) {
          return this.run(thing, args);
        }
      }

      return this[_objectToCPromise](thing) || this.resolve(thing);
    }

    return this.resolve(thing);
  }
  /**
   * @typedef {Function} PromisifyFinalizeFn
   * @param {*} result
   * @param {CPromise} scope
   */

  /**
   * @typedef {function} CPPromisifyDecoratorFn
   * @param {function} originalFn function to decorate
   * @param {PromisifyOptions} options
   * @returns {function}
   */

  /**
   * @typedef {Object} PromisifyOptions
   * @property {Boolean} [multiArgs] aggregate all passed arguments to an array
   * @property {PromisifyFinalizeFn} [finalize] aggregate all passed arguments to an array
   * @property {"plain"|"generator"|"async"} [fnType]
   * @property {boolean} [scopeArg] pass the CPromise scope as the first argument to the generator function
   * @property {function} [decorator] CPPromisifyDecoratorFn
   * @property {boolean} [alignArgs] align passed arguments to function definition for callback-styled function
   * @property {boolean} [once= true] don't promisify already promisified function
   * @property {array<'plain'|'async'|'generator'>} [types] function types to promisify
   */

  /**
   * Converts callback styled function|GeneratorFn|AsyncFn to CPromise async function
   * @param {Function|GeneratorFunction|AsyncFunction} originalFn
   * @param {PromisifyOptions|Function|Boolean} [options]
   * @returns {function(...[*]): CPromise}
   */


  static promisify(originalFn, options) {
    const type = typeof options;

    if (type === 'boolean') {
      options = {
        multiArgs: !!options
      };
    } else if (type === 'function') {
      options = {
        finalize: options
      };
    } else {
      options !== undefined && validateOptions(options, {
        multiArgs: boolean,
        finalize: functionPlain,
        fnType: string,
        scopeArg: boolean,
        decorator: functionPlain,
        alignArgs: boolean,
        once: boolean,
        types: array(validators.values('plain', 'async', 'generator'))
      });
    }

    const {
      multiArgs,
      finalize,
      fnType = getFnType(originalFn),
      scopeArg,
      decorator,
      alignArgs = true,
      once = true,
      types
    } = options || {};
    const context = this;

    if (once && originalFn[_promisified]) {
      return originalFn;
    }

    if (types && types.indexOf(fnType) === -1) return originalFn;
    const decoratedFn = decorator && decorator.call(context, originalFn, { ...options,
      fnType
    }) || originalFn;

    const fn = (() => {
      switch (fnType) {
        case "plain":
          return function (...args) {
            return new context((resolve, reject, scope) => {
              const callback = (err, ...data) => {
                if (err) {
                  return reject(err);
                }

                return multiArgs || data.length > 1 ? resolve(data) : resolve(data[0]);
              };

              if (alignArgs) {
                const min = originalFn.length - 1;

                if (args.length < min) {
                  args.length = min;
                }
              }

              const result = decoratedFn.apply(this, scopeArg ? [scope, ...args, callback] : [...args, callback]);
              finalize && finalize(result, scope);

              if (isThenable$1(result)) {
                result.then(resolve, reject);
              } else if (!decoratedFn.length) {
                resolve(result);
              }
            });
          };

        case "generator":
          return function (...args) {
            return context.run(decoratedFn, {
              context: this,
              scopeArg,
              args
            });
          };

        case "async":
          return function (...args) {
            if (!scopeArg) {
              return context.resolve(decoratedFn.apply(this, args));
            }

            return context.resolve().then((v, scope) => {
              return context.resolve(decoratedFn.apply(this, [scope, ...args]));
            });
          };
      }

      throw TypeError('promisify requires a Function|GeneratorFunction|AsyncFunction as the first argument');
    })();

    fn[_promisified] = fnType;
    return fn;
  }
  /**
   * Resolves the generator to an CPromise instance
   * @param {GeneratorFunction} generatorFn
   * @param {Object} [options]
   * @param {Array} [options.args]
   * @param {Boolean} [options.resolveSignatures] resolve extra signatures (like arrays with CPromise.all)
   * @param {Boolean} [options.scopeArg] pass the CPromise scope as the first argument to the generator function
   * @param {*} [options.context]
   * @returns {CPromise}
   */


  static run(generatorFn, {
    args,
    resolveSignatures,
    context,
    scopeArg = false
  } = {}) {
    return new this((resolve, reject, scope) => {
      let generator;

      if (!context) {
        context = scope;
      }

      if (!scopeArg) {
        generator = generatorFn.apply(context, args);
      } else {
        switch (args ? args.length : 0) {
          case 0:
            generator = generatorFn.call(context, scope);
            break;

          case 1:
            generator = generatorFn.call(context, scope, args[0]);
            break;

          case 2:
            generator = generatorFn.call(context, scope, args[0], args[1]);
            break;

          default:
            generator = generatorFn.apply(context, [scope, ...args]);
        }
      }

      if (!isGenerator(generator)) {
        return reject(new TypeError('function must a generator'));
      }

      let progress = 0;
      let sum = 0;
      let weight = 0;
      let promise;

      const setProgress = (value, _scope, data) => {
        progress = (value * weight + sum) / (scope.innerWeight() || 1);

        if (progress > 1) {
          progress = 1;
        }

        scope.progress(progress, _scope, data);
      };

      const onFulfilled = result => {
        try {
          next(generator.next(result));
        } catch (e) {
          return reject(e);
        }
      };

      const onRejected = err => {
        try {
          next(generator.throw(err));
        } catch (e) {
          reject(e);
        }
      };

      const next = r => {
        if (r.done) {
          return resolve(r.value);
        }

        promise = this.from(r.value, {
          resolveSignatures
        });

        scope[_setInnerChain](promise, false);

        sum += weight;
        weight = promise.isChain ? 1 : promise.weight();
        setImmediate$1(() => {
          scope[_shadow].isCaptured && promise.progress((value, scope, data) => {
            setProgress(value, scope, data);
          });
        });
        return promise.then(onFulfilled, onRejected);
      };

      onFulfilled();
    });
  }
  /**
   * Decorator to make CPromise async function from generator, ECMA async or callback-styled method
   * @param {object} [options]
   * @param {object} [options.timeout]
   * @param {object} [options.label]
   * @param {object} [options.innerWeight]
   * @param {object} [options.weight]
   * @param {object} [options.listen]
   */


  static async(options) {}
  /**
   * @typedef {string|symbol} AbortControllerId
   */

  /**
   * Decorator to subscribe CPromise async method to the internal or external controller
   * @param {AbortControllerId|AbortController|AbortSignal|Array<AbortControllerId|AbortController|AbortSignal>} [signals]
   */


  static listen(signals) {}
  /**
   * Decorator to cancel internal or external abort controller before the decorated function invocation.
   * Can be used as a plain function by passing a object context with `.call` or `.apply` methods
   * @param {string} [reason]
   * @param {AbortControllerId|AbortController} signal
   * @example
   * el.onclick= ()=> cancel.call(this, reason, 'myControllerId'); - to use the decorator as a plain function
   * @example
   * \@cancel(E_REASON_UNMOUNTED);
   * componentWillUnmount(){
   *   console.log('unmounted');
   * }
   */


  static cancel(reason, signal) {}
  /**
   * Decorator to add an `onCanceled` rejection handler to the resulting promise of the decorated method
   * @param {function|GeneratorFunction} onCanceledChain
   */


  static canceled(onCanceledChain) {}
  /**
   * @typedef {function} ProgressDecoratorHandler
   * @param {number} progress
   * @param {CPromise} scope
   * @param {*} data
   * @param {object} context
   */

  /**
   * Decorator to subscribe the handler to the `onProgress` event of the resulting promise
   * @param {ProgressDecoratorHandler} onProgressHandler
   */


  static progress(onProgressHandler) {}
  /**
   * @typedef {object} ReactComponentDecoratorOptions
   * @property {boolean} [subscribeAll= false]
   */

  /**
   * Decorate class as React component
   * @param {boolean|ReactComponentDecoratorOptions} options
   */


  static ReactComponent(options) {}
  /**
   * Decorator to set timeout for the resulting promise of the decorated function
   * @param {number} ms
   */


  static timeout(ms) {}
  /**
   * Decorator to set label for the resulting promise of the decorated function
   * @param {string} str
   */


  static label(str) {}
  /**
   * Decorator to set innerWeight for the resulting promise of the decorated function
   * @param {number} weight
   */


  static innerWeight(weight) {}
  /**
   * Decorator to set timeout for the resulting promise of the decorated function
   * @param {AtomicType} atomicType
   */


  static atomic(atomicType) {}
  /**
   * @typedef {function} CPDecoratorDoneHandler
   * @param {*} value
   * @param {boolean} isRejected
   * @param {CPromise} scope
   * @param {object} context
   */

  /**
   *  append `done` chain to the resulting promise of the decorated method
   * @param {CPDecoratorDoneHandler} doneHandler
   */


  static done(doneHandler) {}
  /**
   * Returns promisification strategy that was used to the original function
   * @param {function} fn
   * @returns {*|boolean}
   */


  static isPromisifiedFn(fn) {
    return fn[_promisified] || false;
  }
  /**
   * CPromise version string
   * @returns {string}
   */


  static get version() {
    return this.prototype[_version];
  }
  /**
   * CPromise version number
   * @returns {number}
   */


  static get versionNumber() {
    return this.prototype[_versionNumber];
  }
  /**
   * Check whether object is CPromise instance
   * @param {*} thing
   * @param {boolean} anyVersion
   * @returns {boolean}
   */


  static isCPromise(thing, anyVersion) {
    if (thing instanceof this) return true;

    if (this[_isCPromise]) {
      warnVersionInteraction(thing);
      return !!anyVersion;
    }

    return false;
  }
  /**
   * adds a new listener
   * @param {EventType} type
   * @param {Function} listener
   * @param {Boolean} [prepend= false]
   * @returns {CPromise}
   */


  on(type, listener, prepend) {
    const events = this[_events];
    if (!events) return this;
    const listeners = events[type];
    events['newListener'] && this.emit('newListener', type, listener);

    if (!listeners) {
      events[type] = listener;
      return this;
    }

    if (typeof listeners === 'function') {
      events[type] = prepend ? [listener, listeners] : [listeners, listener];
      return this;
    }

    prepend ? listeners.unshift(listener) : listeners.push(listener);
    return this;
  }
  /**
   * removes the listener
   * @param {EventType} type
   * @param {Function} listener
   * @returns {CPromise}
   */


  off(type, listener) {
    if (typeof listener !== 'function') {
      throw TypeError('listener must be a function');
    }

    const events = this[_events];
    if (!events) return this;
    const listeners = events[type];

    if (!listeners) {
      return this;
    }

    if (typeof listeners === 'function' && listeners === listener) {
      events[type] = null;
      events['removeListener'] && this.emit('removeListener', type, listener);
      return this;
    }

    const len = listeners.length;

    for (let i = 0; i < len; i++) {
      if (listeners[i] === listener) {
        len === 1 ? events[type] = null : listeners.splice(i, 1);
        events['removeListener'] && this.emit('removeListener', type, listener);
        return this;
      }
    }

    return this;
  }
  /**
   * returns listeners count of the specific event type
   * @param {EventType} type
   * @returns {Number}
   */


  listenersCount(type) {
    const events = this[_events];
    if (!events) return 0;
    const listeners = events[type];
    if (!listeners) return 0;
    return typeof listeners === 'function' ? 1 : listeners.length;
  }
  /**
   * checks if there are listeners of a specific type
   * @param {String|Symbol} type
   * @returns {Boolean}
   */


  hasListeners(type) {
    const events = this[_events];
    return !!(events && events[type]);
  }
  /**
   * add 'once' listener
   * @param {EventType} type
   * @param {Function} listener
   * @returns {CPromise}
   */


  once(type, listener) {
    const emitter = this;

    function _listener() {
      emitter.off(type, _listener);
      listener.apply(emitter, arguments);
    }

    return this.on(type, _listener);
  }
  /**
   * emits the event
   * @param {EventType} type
   * @param args
   * @returns {CPromise}
   */


  emit(type, ...args) {
    const events = this[_events];
    if (!events) return this;
    const listeners = events[type];
    if (!listeners) return this;

    if (typeof listeners === 'function') {
      listeners.apply(this, args);
      return this;
    }

    for (let i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
    }

    return this;
  }
  /**
   * Emits event as a hook. If some listener return true, this method will immediately return true as the result.
   * Else false will be retuned
   * @param {EventType} type
   * @param args
   * @returns {Boolean}
   */


  emitHook(type, ...args) {
    const events = this[_events];
    if (!events) return false;
    const listeners = events[type];
    if (!listeners) return false;

    if (typeof listeners === 'function') {
      return !!listeners.apply(this, args);
    }

    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i].apply(this, args)) {
        return true;
      }
    }

    return false;
  }
  /**
   * Render promise to String
   * @param {boolean} [entireChain= false] render the entire promise chain
   * @returns {string}
   */


  toString(entireChain) {
    if (!entireChain) {
      return super.toString();
    }

    const renderStatus = scope => {
      if (scope.isPaused) return 'paused';
      if (scope.isPending) return 'pending' + (scope[_shadow].computedProgress !== -1 ? `[${(scope[_shadow].computedProgress * 100).toFixed(1)}%]` : '');
      const value = scope[_shadow].value;
      return `${scope.isRejected ? 'rejected' : 'resolved'}${value === undefined ? '' : `<${value}>`}`;
    };

    return this.scopes().reverse().map(scope => `${scope.label() || scope.constructor.name}<${renderStatus(scope)}>`).join(' → ');
  }

};
const {
  prototype
} = CPromise$1;
prototype.addEventListener = prototype.on;
prototype.removeEventListener = prototype.off;
lazyBindMethods(prototype, ['Cancel', 'Pause', 'Resume', 'Capture', 'Done'].map(type => {
  const typeL = type.toLowerCase();
  const methodName = 'on' + type;

  prototype[methodName] = function method(listener) {
    if (!this[_shadow].isPending) {
      throw Error(`Unable to subscribe to ${typeL} event since the promise has been already settled`);
    }

    return this.on(typeL, listener);
  };

  return methodName;
}));
lazyBindMethods(CPromise$1, Object.getOwnPropertyNames(CPromise$1).map(prop => {
  const {
    value
  } = Object.getOwnPropertyDescriptor(CPromise$1, prop);
  return typeof value === 'function' ? prop : '';
}).filter(Boolean));
Object.defineProperties(CPromise$1, Object.entries({
  CPromise: CPromise$1,
  CanceledError,
  AbortController,
  AbortControllerEx,
  SIGNAL_CANCEL,
  SIGNAL_PAUSE,
  SIGNAL_RESUME,
  E_REASON_CANCELED,
  E_REASON_TIMEOUT,
  E_REASON_DISPOSED
}).reduce((descriptors, [prop, value]) => {
  descriptors[prop] = {
    value,
    configurable: true
  };
  return descriptors;
}, {}));
Object.entries(Object.getOwnPropertyDescriptors(prototype)).forEach(([prop, descriptor]) => {
  if (descriptor.get && descriptor.set === undefined) {
    descriptor.set = function () {
      throw Error(`Can not rewrite read-only public property '${prop}'`);
    };

    Object.defineProperty(prototype, prop, descriptor);
  }
});

const getContextController = (context, id, create) => {
  if (typeof id === 'string' || typeof id === 'symbol') {
    let list = controllersStore.get(context);

    if (!list) {
      controllersStore.set(context, list = {});
    }

    const controller = list && list[id || ''];
    return controller || (create ? list[id] = new AbortControllerEx(true) : null);
  }

  return isAbortController(id) ? id : null;
};

const ensureContextSignal = (context, id, create) => {
  if (isAbortSignal(id)) return id;
  const controller = getContextController(context, id, create);

  if (!controller) {
    throw TypeError(`required AbortController|AbortSignal|string id|symbol id)`);
  }

  return controller.signal;
};

const listenSignals = (promise, context, signals) => {
  isArray$1(signals) ? signals.forEach(id => promise.listen(ensureContextSignal(context, id, true))) : promise.listen(ensureContextSignal(context, signals, true));
};

const cancelContext = (context, id, reason) => {
  const controller = getContextController(context, id, false);

  if (controller) {
    controller && controller.abort(reason);
    return true;
  }

  return false;
};

const inheritFnSignature = (target, fn) => {
  target[_promisified] = fn[_promisified];
  return target;
};

const decorators = {
  async: propertyDecorator((decorator, [options], {
    context
  }) => {
    if (typeof options === 'number') {
      options = {
        timeout: options
      };
    } else if (typeof options === 'string') {
      options = {
        label: options
      };
    }

    const {
      timeout,
      label,
      innerWeight,
      weight,
      listen,
      scopeArg = false
    } = options || {};
    const fn = context.promisify(decorator.descriptor.value, {
      scopeArg
    });
    decorator.descriptor = {
      value: inheritFnSignature(function () {
        const promise = fn.apply(this, arguments);
        timeout && promise.timeout(timeout);
        label && promise.label(label);
        innerWeight && promise.innerWeight(innerWeight);
        weight && promise.weight(weight);
        listen && listenSignals(promise, this, listen);
        return promise;
      }, fn),
      enumerable: true,
      configurable: true
    };
    return decorator;
  }, [union(validators.undefined, number, string, object({
    timeout: number,
    label: string,
    innerWeight: number,
    weight: number,
    listen: validators.union(string, symbol, array(string, symbol)),
    scopeArg: boolean
  }))]),
  listen: propertyDecorator((decorator, [signals = ''], {
    context
  }) => {
    const fn = context.promisify(decorator.descriptor.value);
    decorator.descriptor = {
      value: inheritFnSignature(function () {
        const promise = fn.apply(this, arguments);
        listenSignals(promise, this, signals);
        return promise;
      }, fn),
      enumerable: true,
      configurable: true
    };
    return decorator;
  }, [rest(validators.undefined, validators.abortController, validators.abortSignal, string, symbol)]),
  cancel: propertyDecorator((decorator, [reason, signal = '']) => {
    const fn = decorator.descriptor.value;
    decorator.descriptor.value = inheritFnSignature(function () {
      cancelContext(this, signal, reason || '');
      return fn.apply(this, arguments);
    }, fn);
    return decorator;
  }, [union(nullable, string), union(validators.undefined, validators.abortController, string, symbol)], function (reason, signal = '') {
    return cancelContext(this, signal, reason || '');
  }),
  canceled: propertyDecorator((decorator, [canceledHandler], {
    context
  }) => {
    const fn = context.promisify(decorator.descriptor.value);
    const handler = canceledHandler && context.promisify(canceledHandler, {
      types: ['generator']
    });
    decorator.descriptor.value = inheritFnSignature(function () {
      return fn.apply(this, arguments).canceled(handler ? (err, scope) => handler.call(this, err, scope, this) : noop);
    }, fn);
    return decorator;
  }, [union(validators.nullable, validators.function)]),
  done: propertyDecorator((decorator, [doneHandler], {
    context
  }) => {
    const fn = context.promisify(decorator.descriptor.value);
    const handler = doneHandler && context.promisify(doneHandler, {
      types: ['generator']
    });
    decorator.descriptor.value = inheritFnSignature(function () {
      return fn.apply(this, arguments).finally(handler ? (err, isRejected, scope) => handler.call(this, err, isRejected, scope, this) : noop);
    }, fn);
    return decorator;
  }, [union(validators.nullable, validators.function), union(validators.nullable, boolean, string)]),
  progress: propertyDecorator((decorator, [progressHandler], {
    context
  }) => {
    const fn = context.promisify(decorator.descriptor.value);
    decorator.descriptor.value = inheritFnSignature(function () {
      return fn.apply(this, arguments).progress((value, scope, data) => progressHandler.call(this, value, scope, data, this));
    }, fn);
    return decorator;
  }, [validators.function]),
  ReactComponent: classDecorator((descriptor, options, {
    context
  }) => {
    const {
      subscribeAll
    } = options || {};
    const descriptors = {};
    let propsChanged;
    const reactProps = ['componentWillUnmount', 'componentDidMount'];
    return {
      kind: 'class',

      finisher(constructor) {
        const {
          prototype
        } = constructor;
        let decoratedMethod;
        Object.getOwnPropertyNames(prototype).forEach(prop => {
          if (prop === 'constructor' || prop === 'render') return;
          const method = prototype[prop];
          let asyncMethod;

          if (isGeneratorFunction(method)) {
            asyncMethod = context.promisify(method, {
              scopeArg: reactProps.indexOf(prop) !== -1
            });
          } else if (context.isPromisifiedFn(method)) {
            asyncMethod = method;
          } else {
            return;
          }

          if (prop === 'componentWillUnmount') {
            decoratedMethod = function () {
              cancelContext(this, '', E_REASON_UNMOUNTED);
              return asyncMethod.apply(this, arguments);
            };
          } else if (prop === 'componentDidMount' || subscribeAll) {
            decoratedMethod = function () {
              return asyncMethod.apply(this, arguments).listen(ensureContextSignal(this, '', true));
            };
          } else {
            decoratedMethod = asyncMethod;
          }

          descriptors[prop] = {
            value: decoratedMethod,
            configurable: true
          };
          propsChanged = true;
        });
        propsChanged && Object.defineProperties(prototype, descriptors);
        return constructor;
      }

    };
  }, [union(validators.undefined, boolean | object({
    subscribeAll: boolean
  }))])
};
Object.entries({
  'timeout': number,
  'label': string,
  'innerWeight': number,
  'atomic': [validators.undefined, boolean, validators.values(ATOMIC_TYPE_DISABLED, ATOMIC_TYPE_DETACHED, ATOMIC_TYPE_AWAIT, 'detached', 'disabled', 'await')]
}).forEach(([name, type]) => {
  decorators[name] = propertyDecorator((decorator, [value], {
    context
  }) => {
    const fn = context.promisify(decorator.descriptor.value);
    const isFunction = typeof value === 'function';
    decorator.descriptor.value = inheritFnSignature(function () {
      const promise = fn.apply(this, arguments);
      return promise[name](isFunction ? value.call(this, this) : value);
    }, fn);
    return decorator;
  }, [isArray$1(type) ? union(validators.function, ...type) : union(type, validators.function)]);
});
bindDecorators(CPromise$1, decorators);
Object.defineProperties(prototype, {
  [_isCPromise]: {
    value: true
  },
  [_version]: {
    value: version
  },
  [_versionNumber]: {
    value: versionNumber
  }
});
var CPromise_1 = CPromise$1;
/**
 * CanceledError class
 * @type {CanceledError}
 */

var CanceledError_1 = CanceledError;
/**
 * React specific canceled reason
 */

var E_REASON_UNMOUNTED_1 = E_REASON_UNMOUNTED;
/**
 * listen decorator
 * @type {Function}
 */

var listen = CPromise$1.listen;
/**
 * cancel decorator
 * @type {Function}
 */

var cancel = CPromise$1.cancel;
/**
 * cancel decorator
 * @type {Function}
 */

var ReactComponent = CPromise$1.ReactComponent;

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/*global toString:true*/
// utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray(val) {
  return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */


function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject(val) {
  return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */


function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */


function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  return content;
}

var utils$1 = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils$1.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$1.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils$1.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils$1.forEach(val, function parseValue(v) {
        if (utils$1.isDate(v)) {
          v = v.toISOString();
        } else if (utils$1.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils$1.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils$1.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils$1.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };

  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

var cookies = utils$1.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils$1.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils$1.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils$1.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */


var buildFullPath = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils$1.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils$1.trim(line.substr(0, i)).toLowerCase();
    val = utils$1.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

var isURLSameOrigin = utils$1.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils$1.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils$1.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout; // Listen for ready state

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      } // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request


      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response); // Clean up request

      request = null;
    }; // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils$1.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils$1.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (!utils$1.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    } // Add responseType to request if needed


    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel); // Clean up request

        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils$1.isUndefined(headers) && utils$1.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = xhr;
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils$1.isFormData(data) || utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data)) {
      return data;
    }

    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils$1.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils$1.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        /* Ignore */
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils$1.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils$1.merge(DEFAULT_CONTENT_TYPE);
});
var defaults_1 = defaults;

/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Ensure headers exist

  config.headers = config.headers || {}; // Transform request data

  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils$1.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults_1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


var mergeConfig = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};
  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge(target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }

    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils$1.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils$1.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils$1.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils$1.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });
  utils$1.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
  utils$1.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils$1.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils$1.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });
  utils$1.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
  var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils$1.forEach(otherKeys, mergeDeepProperties);
  return config;
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */


function Axios$1(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios$1.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config); // Set config.method

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  } // Hook up interceptors middleware


  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios$1.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
}; // Provide aliases for supported request methods


utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios$1.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios$1.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
var Axios_1 = Axios$1;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */

var isAxiosError = function isAxiosError(payload) {
  return typeof payload === 'object' && payload.isAxiosError === true;
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance$1(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context); // Copy axios.prototype to instance

  utils$1.extend(instance, Axios_1.prototype, context); // Copy context to instance

  utils$1.extend(instance, context);
  return instance;
} // Create the default instance to be exported


var axios$1 = createInstance$1(defaults_1); // Expose Axios class to allow class inheritance

axios$1.Axios = Axios_1; // Factory for creating new instances

axios$1.create = function create(instanceConfig) {
  return createInstance$1(mergeConfig(axios$1.defaults, instanceConfig));
}; // Expose Cancel & CancelToken


axios$1.Cancel = Cancel_1;
axios$1.CancelToken = CancelToken_1;
axios$1.isCancel = isCancel; // Expose all/spread

axios$1.all = function all(promises) {
  return Promise.all(promises);
};

axios$1.spread = spread; // Expose isAxiosError

axios$1.isAxiosError = isAxiosError;
var axios_1 = axios$1; // Allow use of default import syntax in TypeScript

var _default$1 = axios$1;
axios_1.default = _default$1;

var axios = axios_1;

var cPromise_umd = createCommonjsModule(function (module, exports) {
// c-promise2 v0.11.11
// Copyright (c) 2020-2021 Dmitriy Mozgovoy <robotshara@gmail.com>
(function (global, factory) {
  module.exports = factory() ;
})(commonjsGlobal, function () {
  /**
   * @module CanceledError
   */

  const _scope = Symbol('scope');

  const _errors = Symbol('errors');

  const _code = Symbol('code');
  /**
   * CanceledError
   */


  class CanceledError extends Error {
    /**
     * Constructs a new error instance
     * @param {String} [reason]
     */
    constructor(reason = E_REASON_CANCELED) {
      super();
      this.name = this.constructor.name;
      const registered = this.constructor[_errors][reason];

      if (registered) {
        this.message = registered;
        this[_code] = reason;
      } else {
        this.message = reason;
      }

      this[_scope] = null;
    }
    /**
     * get promise scope where the error was raised
     * @returns {CPromise|null}
     */


    get scope() {
      return this[_scope];
    }
    /**
     * get error code
     * @returns {string}
     */


    get code() {
      return this[_code] || '';
    }

    set scope(scope) {
      if (!this[_scope]) {
        this[_scope] = scope;
        return;
      }

      throw Error('Scope has been already set');
    }
    /**
     * converts thing to a CanceledError instance
     * @param {String|Error} thing
     * @returns {CanceledError}
     */


    static from(thing) {
      const type = typeof thing;

      if (type === 'string' || thing == null) {
        return new CanceledError(thing);
      } else if (type === 'object') {
        if (thing instanceof Error) {
          if (thing instanceof CanceledError) {
            return thing;
          }

          if (thing.name === 'AbortError') {
            return new CanceledError(thing.message);
          }
        }
      }

      throw TypeError(`unable convert ${thing} to a CanceledError`);
    }
    /**
     * Check whether object is an instance of CanceledError
     * @param thing
     * @returns {boolean}
     */


    static isCanceledError(thing) {
      return thing instanceof this;
    }

    static registerErrors(errors) {
      return Object.entries(errors).reduce((acc, [name, message]) => {
        Object.defineProperty(this, name, {
          value: name
        });
        this[_errors][name] = message;
        acc[name] = name;
        return acc;
      }, {});
    }
    /**
     * Rethrow the canceled error with optional codes matching
     * @param err an error to assert
     * @param {...String} [codes]
     * @throws CanceledError
     */


    static rethrow(err, ...codes) {
      const {
        length
      } = codes;

      if (!(err instanceof CanceledError)) {
        return;
      }

      if (!length) {
        throw err;
      } else {
        const {
          code
        } = err;

        for (let i = 0; i < length; i++) {
          if (codes[i] === code) {
            throw err;
          }
        }
      }
    }

  }

  CanceledError[_errors] = {};
  const {
    E_REASON_CANCELED
  } = CanceledError.registerErrors({
    E_REASON_CANCELED: 'canceled',
    E_REASON_TIMEOUT: 'timeout',
    E_REASON_DISPOSED: 'disposed'
  });
  var canceledError = {
    CanceledError
  };
  /**
   * @module AbortController
   */

  const _signal = Symbol('signal');

  const _aborted = Symbol('aborted');

  const _events = Symbol('events');

  const _abort = Symbol('abort');

  const nativeAbortController = (() => {
    try {
      if (typeof AbortController === 'function') {
        const controller = new AbortController();

        if (controller.toString() === '[object AbortController]' && controller.constructor.toString().indexOf('[native code]') !== -1) {
          return AbortController;
        }
      }
    } catch (e) {}
  })();
  /**
   * AbortSignalPolyfill class
   * @alias CPromise.AbortSignalPolyfill
   */


  class AbortSignal {
    /**
     * Constructs a new AbortSignal instance
     */
    constructor() {
      this[_events] = {};
      this[_aborted] = false;
    }
    /**
     * Check whether controller is aborted
     * @returns {Boolean}
     */


    get aborted() {
      return this[_aborted];
    }
    /**
     * adds a new listener to the controller
     * @param {String|Symbol} event
     * @param {Function} listener
     */


    addEventListener(event, listener) {
      const events = this[_events];
      if (!events) return;
      const listeners = events[event];

      if (!listeners) {
        events[event] = listener;
        return;
      }

      typeof listeners === 'function' ? events[event] = [listeners, listener] : listeners.push(listener);
    }
    /**
     * removes the listener
     * @param {String|Symbol} event
     * @param {Function} listener
     */


    removeEventListener(event, listener) {
      const events = this[_events];
      if (!events) return;
      const listeners = events[event];

      if (!listeners) {
        return;
      }

      if (typeof listeners === 'function') {
        events[event] = null;
        return;
      }

      const index = listeners.indexOf(listener);

      if (index !== -1) {
        listeners.length > 1 ? listeners.splice(index, 1) : events[event] = null;
      }
    }
    /**
     * dispatch the event
     * @param {String|Symbol} type
     * @param {String} [reason]
     */


    dispatchEvent(type, reason) {
      if (!this[_events]) return;
      let listener;
      const event = {
        type,
        target: this,
        bubbles: false,
        cancelable: false
      };
      typeof (listener = this['on' + type]) === 'function' && listener.call(this, event);
      const listeners = this[_events][type];
      if (!listeners) return;

      if (typeof listeners === 'function') {
        listeners.call(this, type, event, reason);
        return;
      }

      const {
        length
      } = listeners;

      for (let i = 0; i < length; i++) {
        listeners[i].call(this, type, event, reason);
      }
    }

    [_abort](reason) {
      if (this[_aborted]) return;
      this[_aborted] = true;
      this.dispatchEvent('abort', reason);
      this[_events] = null;
    }

    get [Symbol.toStringTag]() {
      return 'AbortSignal';
    }

    toString() {
      return '[object AbortSignalPolyfill]';
    }

  }
  /**
   * AbortController class
   */


  class AbortController {
    /**
     * Constructs new AbortController instance
     */
    constructor() {
      this[_signal] = null;
    }
    /**
     * returns the signal of the controller
     * @returns {AbortSignal}
     */


    get signal() {
      return this[_signal] || (this[_signal] = new AbortSignal());
    }

    set signal(v) {
      throw Error('signal is read-only property');
    }
    /**
     * Abort the controller
     * @param {String} [reason]
     */


    abort(reason) {
      this.signal[_abort](reason);
    }

    get [Symbol.toStringTag]() {
      return 'AbortController';
    }

    toString() {
      return '[object AbortController]';
    }

  }

  const isAbortSignal = thing => {
    return thing && typeof thing === 'object' && typeof thing.aborted === 'boolean' && typeof thing.addEventListener === 'function' && typeof thing.removeEventListener === 'function';
  };

  const isAbortController = thing => {
    return thing && typeof thing === 'object' && typeof thing.abort === 'function' && isAbortSignal(thing.signal);
  };

  var abortController = {
    AbortController: nativeAbortController || AbortController,
    AbortControllerEx: AbortController,
    AbortSignalEx: AbortSignal,
    isAbortSignal,
    isAbortController
  };
  const validators = {
    numberFinitePositive: thing => typeof thing === 'number' && Number.isFinite(thing) && thing >= 0,
    functionPlain: thing => typeof thing === 'function' && thing.constructor === Function,
    array: Array.isArray,
    union: (...validators) => {
      const len = validators.length;
      const shouldBe = validators.map(validatorType).join('|');
      return thing => {
        for (let i = 0; i < len; i++) {
          if (validators[i](thing) === true) {
            return true;
          }
        }

        return shouldBe;
      };
    }
  };

  const nameByValidator = validator => Object.keys(validators).find(key => validators[key] === validator) || '';

  const validatorType = validator => nameByValidator(validator).replace(/[A-Z]/g, char => '.' + char.toLowerCase());

  ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
    validators[type] = thing => typeof thing === type || `a${i < 1 ? 'n' : ''} ${type}`;
  });

  function validateOptions(options, schema, allowUnknown = false) {
    if (typeof options !== 'object') {
      throw TypeError('options must be an object');
    }

    const keys = Object.getOwnPropertyNames(options);
    let i = keys.length;

    while (i-- > 0) {
      const option = keys[i];
      const validator = schema[option];

      if (validator) {
        const value = options[option];
        const result = value === undefined || validator(value);

        if (result !== true) {
          throw TypeError(`option '${option}' must be ${typeof result === 'string' ? result : validatorType(validator)}`);
        }

        continue;
      }

      if (!allowUnknown) {
        throw Error(`Unknown option '${option}'`);
      }
    }

    return options;
  }

  function validateArguments(args, validators, {
    context = "function"
  } = {}) {
    const {
      length
    } = validators;
    const argsCount = args.length;

    for (let i = 0; i < length; i++) {
      let value = args[i];
      let result = validators[i](value);

      if (result !== true) {
        throw TypeError(`${context} ${i >= argsCount ? "requires" : "expects"} ${result} as ${i + 1} argument`);
      }
    }
  }

  var validator = {
    validators,
    validateOptions,
    validateArguments
  };
  const {
    hasOwnProperty
  } = Object.prototype;

  const isThenable = obj => !!obj && (typeof obj === 'function' || typeof obj === 'object') && typeof obj.then === 'function';

  const _setImmediate = typeof setImmediate === 'function' ? setImmediate : function setImmediateShim(cb) {
    setTimeout(cb, 0);
  };

  function isGeneratorFunction(thing) {
    return typeof thing === 'function' && thing.constructor && thing.constructor.name === 'GeneratorFunction';
  }

  const getFnType = thing => typeof thing === 'function' && {
    GeneratorFunction: 'generator',
    AsyncFunction: 'async',
    Function: 'plain'
  }[thing.constructor.name];

  function isGenerator(thing) {
    return thing && typeof thing === 'object' && typeof thing.next === 'function';
  }

  function EmptyObject() {}

  EmptyObject.prototype = null;

  const toGenerator = function (thing, args, context = null) {
    if (isGeneratorFunction(thing)) {
      return thing.apply(context, args);
    }

    return thing && (isGenerator(thing) ? thing : thing[Symbol.iterator] && thing[Symbol.iterator]()) || null;
  };

  const toArray = (thing, mapper) => {
    if (thing) {
      if (Array.isArray(thing)) {
        return mapper ? thing.map(mapper) : thing;
      }

      if (thing = toGenerator(thing)) {
        const arr = [];
        let item;

        while ((item = thing.next()) && item.done === false) {
          arr.push(mapper ? mapper(item.value) : item.value);
        }

        return arr;
      }
    }

    return null;
  };

  const isPropertyDescriptor = (allowed => {
    return thing => {
      if (thing !== null && typeof thing === 'object') {
        const props = Object.getOwnPropertyNames(thing);
        return props.length && props.every(prop => allowed[prop]);
      }

      return false;
    };
  })({
    value: true,
    set: true,
    get: true,
    writable: true,
    enumerable: true,
    configurable: true
  });

  const isAnyDecoratorContext = function (arg0, arg1, arg2) {
    if (arguments.length === 1) {
      return typeof arg0 === 'object' && hasOwnProperty.call(arg0, 'kind') && hasOwnProperty.call(arg0, 'key') && hasOwnProperty.call(arg0, 'placement') && isPropertyDescriptor(arg0.descriptor);
    }

    if (arguments.length === 3) {
      return isPropertyDescriptor(arg2);
    }
  };

  function reduceDecorator(decorator) {
    return function (arg0, arg1, arg2) {
      if (arguments.length === 1) {
        return decorator(arg0);
      } else {
        const {
          descriptor,
          finisher
        } = decorator.call(null, {
          key: arg1,
          kind: "method",
          placement: typeof arg0 === "function" ? "static" : "prototype",
          descriptor: arg2
        });
        finisher && finisher(arg0.constructor);
        return descriptor;
      }
    };
  }

  function buildDecorator(builder, name) {
    const context = this;

    const decorator = function (...params) {
      return reduceDecorator(descriptor => {
        if (descriptor.kind !== 'field' && descriptor.kind !== 'method') {
          throw Error(`${name} decorator can be used for method or field`);
        }

        return builder(descriptor, params, context);
      });
    };

    return function () {
      if (isAnyDecoratorContext.apply(null, arguments)) {
        return decorator().apply(null, arguments);
      }

      return decorator.apply(null, arguments);
    };
  }

  const lazyBindMethods = (obj, props) => {
    props.forEach(prop => {
      const symbol = Symbol(`${prop}Bound`);
      const {
        value: fn
      } = Object.getOwnPropertyDescriptor(obj, prop);
      Object.defineProperty(obj, prop, {
        get: function () {
          return hasOwnProperty.call(this, symbol) ? this[symbol] : this[symbol] = fn.bind(this);
        },
        set: function (v) {
          throw Error(`Can not rewrite method ${prop} with ${v}`);
        },
        enumerable: true,
        configurable: true
      });
    });
  };

  var utils = {
    isThenable,
    setImmediate: _setImmediate,
    isGenerator,
    isGeneratorFunction,
    EmptyObject,
    toGenerator,
    toArray,
    getFnType,
    buildDecorator,
    lazyBindMethods
  };
  /**
   * Cancellable Promise with extra features
   * @module CPromise
   */

  /**
   * @typedef {String|Symbol} EventType
   */

  const {
    CanceledError: CanceledError$1
  } = canceledError;
  const {
    E_REASON_CANCELED: E_REASON_CANCELED$1,
    E_REASON_TIMEOUT,
    E_REASON_DISPOSED
  } = CanceledError$1;
  const {
    AbortController: AbortController$1,
    AbortControllerEx,
    isAbortSignal: isAbortSignal$1,
    isAbortController: isAbortController$1
  } = abortController;
  const {
    validateOptions: validateOptions$1,
    validators: validators$1,
    validateArguments: validateArguments$1
  } = validator;
  const {
    isThenable: isThenable$1,
    EmptyObject: EmptyObject$1,
    setImmediate: setImmediate$1,
    isGeneratorFunction: isGeneratorFunction$1,
    isGenerator: isGenerator$1,
    toGenerator: toGenerator$1,
    toArray: toArray$1,
    buildDecorator: buildDecorator$1,
    getFnType: getFnType$1,
    lazyBindMethods: lazyBindMethods$1
  } = utils;
  const {
    union,
    array,
    functionPlain,
    numberFinitePositive,
    number,
    boolean,
    string
  } = validators$1;
  const {
    now
  } = Date;
  const {
    isArray
  } = Array;

  const _toCPromise = Symbol.for('toCPromise');

  const _shadow = Symbol('shadow');

  const _events$1 = Symbol('events');

  const _resolve = Symbol('done');

  const _setInnerChain = Symbol('setInnerChain');

  const _objectToCPromise = Symbol('objectToCPromise');

  const TYPE_PROGRESS = Symbol('TYPE_PROGRESS');
  const SIGNAL_CANCEL = Symbol('SIGNAL_CANCEL');
  const SIGNAL_PAUSE = Symbol('SIGNAL_PAUSE');
  const SIGNAL_RESUME = Symbol('SIGNAL_RESUME');
  const ATOMIC_TYPE_DISABLED = 0;
  const ATOMIC_TYPE_DETACHED = 1;
  const ATOMIC_TYPE_AWAIT = 2;

  const noop = () => {};

  const atomicMap = new Map([['disabled', ATOMIC_TYPE_DISABLED], ['detached', ATOMIC_TYPE_DETACHED], ['await', ATOMIC_TYPE_AWAIT], [false, ATOMIC_TYPE_DISABLED], [true, ATOMIC_TYPE_AWAIT], [ATOMIC_TYPE_DISABLED, ATOMIC_TYPE_DISABLED], [ATOMIC_TYPE_DETACHED, ATOMIC_TYPE_DETACHED], [ATOMIC_TYPE_AWAIT, ATOMIC_TYPE_AWAIT]]);
  const promiseAssocStore = new WeakMap();
  const controllersStore = new WeakMap();

  const computeWeightSum = promises => {
    let i = promises.length;
    let sum = 0;

    while (i-- > 0) {
      sum += promises[i][_shadow].weight;
    }

    return sum;
  };
  /**
   * @typedef {Function} CPromiseExecutorFn
   * @this CPromise
   * @param {Function} resolve
   * @param {Function} reject
   * @param {CPromise} scope
   */

  /**
   * @typedef {Object} PromiseOptionsObject
   * @property {String} label
   * @property {Number} timeout
   * @property {Number} weight
   * @property {Boolean} [nativeController= false] prefer native AbortController class as the internal signal
   */

  /**
   * If value is a number it will be considered as the value for timeout option
   * If value is a string it will be considered as a label
   * @typedef {PromiseOptionsObject|String|Number} CPromiseOptions
   */

  /**
   * CPromise class
   * @namespace
   * @extends Promise
   */


  class CPromise extends Promise {
    /**
     * Creates a new CPromise instance
     * @param {CPromiseExecutorFn} [executor] - promise executor function that will be invoked
     * in the context of the new CPromise instance
     * @param {CPromiseOptions} [options]
     */
    constructor(executor, options) {
      if (options !== undefined && options !== null) {
        switch (typeof options) {
          case 'string':
            options = {
              label: options
            };
            break;

          case 'number':
            options = {
              timeout: options
            };
            break;

          case 'object':
            break;

          default:
            throw TypeError('options must be an object|string|number');
        }
      }

      let {
        label,
        weight,
        timeout,
        signal,
        nativeController = false
      } = options || {};
      let resolve, reject;
      super((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      });
      this[_events$1] = new EmptyObject$1();
      const shadow = this[_shadow] = {
        resolve,
        reject,
        leafsCount: 0,
        paused: false,
        timestamp: -1,
        innerChain: null,
        parent: null,
        progress: 0,
        computedProgress: -1,
        totalWeight: -1,
        innerWeight: 0,
        throttle: 0,
        throttleTimer: 0,
        isCaptured: false,
        isListening: false,
        isPending: true,
        isCanceled: false,
        isRejected: false,
        isChain: true,
        label: '',
        weight: 1,
        value: undefined,
        nativeController,
        atomic: ATOMIC_TYPE_DISABLED,
        canceledWith: null
      };
      signal !== undefined && this.listen(signal);
      timeout !== undefined && this.timeout(timeout);
      weight !== undefined && this.weight(weight);
      label !== undefined && this.label(label);
      this.on('propagate', (type, scope, data) => {
        if (type === TYPE_PROGRESS) {
          shadow.computedProgress = -1;
          shadow.isListening && this.emit('progress', this.progress(), scope, data);
        }
      });
      this.on('newListener', event => {
        if (event === 'progress') {
          shadow.isListening = true;

          if (!shadow.isCaptured) {
            this.captureProgress();
          }
        }
      });
      this.on('removeListener', event => {
        if (event === 'progress') {
          if (shadow.isListening && !this.hasListeners('progress')) {
            shadow.isListening = false;
          }
        }
      });

      if (executor != null) {
        if (typeof executor !== 'function') {
          throw TypeError('CPromise executor is not a function');
        }

        try {
          executor.call(this, value => {
            this.resolve(value);
          }, err => {
            this.reject(err);
          }, this);
        } catch (err) {
          this.reject(err);
        }
      }
    }
    /**
     * @typedef {Function} OnCancelListener
     * @param {CanceledError} reason
     */

    /**
     * @typedef {Function} OnPauseListener
     */

    /**
     * @typedef {Function} OnResumeListener
     */

    /**
     * @typedef {Function} OnCaptureListener
     * @param {scope} CPromise
     */

    /**
     * registers the listener for cancel event
     * @param {OnCancelListener} listener
     * @returns {CPromise}
     */


    onCancel(listener) {}
    /**
     * registers the listener for pause event
     * @param {OnPauseListener} listener
     * @returns {CPromise}
     */


    onPause(listener) {}
    /**
     * registers the listener for resume event
     * @param {OnResumeListener} listener
     * @returns {CPromise}
     */


    onResume(listener) {}
    /**
     * registers the listener for capture event
     * @param {OnCaptureListener} listener
     * @returns {CPromise}
     */


    onCapture(listener) {}
    /**
     * @typedef {function} CPDoneListener
     * @param {*} value
     * @param {boolean} isRejected
     * @returns {CPromise}
     */

    /**
     * registers the listener for done event
     * @param {CPDoneListener} listener
     */


    onDone(listener) {}
    /**
     * Set or get the total weight of the inner chains
     * @param {Number} [weight]
     * @return {Number|CPromise}
     */


    totalWeight(weight) {
      if (arguments.length) {
        if (weight <= 0 || !Number.isFinite(weight)) {
          throw Error('weight must be a number greater than 0');
        }

        this[_shadow].totalWeight = weight;
        return this;
      }

      return this[_shadow].totalWeight;
    }
    /**
     * Set or get the total weight of the inner chains
     * @param {Number} [weight]
     * @return {Number|CPromise}
     */


    innerWeight(weight) {
      if (arguments.length) {
        if (!Number.isFinite(weight)) {
          throw Error('inner weight must be a number');
        }

        if (weight <= 0) {
          throw Error('inner weight must be greater than 0');
        }

        this[_shadow].innerWeight = weight;
        return this;
      }

      return this[_shadow].innerWeight;
    }
    /**
     * Subscribe to progress event
     * @param {Function} listener
     * @returns {CPromise}
     */

    /**
     * Set promise progress
     * @param {Number} [value] a number between [0, 1]
     * @param {*} [data] any data to send for progress event listeners
     * @param {CPromise} [scope] CPromise scope
     * @returns {Number|CPromise}
     */


    progress(value, data, scope) {
      const shadow = this[_shadow];

      if (arguments.length) {
        if (typeof value === 'function') {
          this.on('progress', value);
          return this;
        }

        if (!Number.isFinite(value)) {
          throw TypeError('value must be a number [0, 1]');
        }

        if (value < 0) {
          value = 0;
        } else if (value > 1) {
          value = 1;
        }

        if (!shadow.isCaptured) return this;

        if (value !== 0 && value !== 1) {
          value = value.toFixed(10) * 1;
        }

        if (shadow.progress !== value) {
          shadow.progress = value;

          if (value !== 1 && shadow.throttle) {
            if (!shadow.throttleTimer) {
              shadow.throttleTimer = setTimeout(() => {
                shadow.throttleTimer = 0;
                this.propagate(TYPE_PROGRESS, data, scope);
              }, shadow.throttle);
            }

            return this;
          }

          this.propagate(TYPE_PROGRESS, data, scope);
        }

        return this;
      }

      if (shadow.computedProgress === -1) {
        shadow.totalWeight === -1 && this.captureProgress();
        const scopes = this.scopes(true);
        let i = scopes.length;
        let sum = 0;
        let progress = 0;

        while (i-- > 0) {
          const scope = scopes[i];
          const thatShadow = scope[_shadow];
          const weight = thatShadow.weight;

          if (weight > 0) {
            sum += weight;
            progress += thatShadow.progress * weight;
          }
        }

        let total = shadow.totalWeight;

        if (total > 0) {
          return shadow.computedProgress = (progress + (total - sum)) / total;
        }

        shadow.computedProgress = progress / sum;
      }

      return shadow.computedProgress;
    }
    /**
     * emit propagate event that will propagate through each promise scope in the chain (bubbling)
     * @param {String|symbol} type - some type to identify the data kind
     * @param {*?} data - some data
     * @param {CPromise} [scope] - CPromise scope
     * @returns {CPromise}
     */


    propagate(type, data = null, scope = null) {
      return this.emit('propagate', type, scope || this, data);
    }
    /**
     * capture initial progress state of the chain
     * @param {Object} [options]
     * @param {Number} options.throttle set min interval for firing progress event
     * @param {Number} options.innerWeight set weight of the nested promises
     * @returns {CPromise}
     */


    captureProgress(options) {
      if (options) {
        validateOptions$1(options, {
          throttle: numberFinitePositive,
          innerWeight: numberFinitePositive
        });
        const {
          throttle,
          innerWeight
        } = options;

        if (throttle !== undefined) {
          this[_shadow].throttle = throttle;
        }

        if (innerWeight !== undefined) {
          this.innerWeight(innerWeight);
        }
      }

      const shadow = this[_shadow];
      const scopes = this.scopes(true);
      let i = scopes.length;
      let sum = 0;

      while (i-- > 0) {
        const scope = scopes[i];
        const thatShadow = scope[_shadow];
        const weight = thatShadow.weight;

        if (weight > 0) {
          sum += weight;

          if (!thatShadow.isCaptured) {
            thatShadow.isCaptured = true;
            scope.emit('capture', scope);
          }

          const inner = thatShadow.innerChain;

          if (inner && !inner[_shadow].isCaptured) {
            inner.captureProgress(options);
          }
        }
      }

      shadow.totalWeight = sum;
      return this;
    }
    /**
     * Returns all parent scopes that are in pending state
     * @param {boolean} [pendingOnly= false]
     * @returns {CPromise[]}
     */


    scopes(pendingOnly) {
      let scope = this;
      const scopes = [scope];

      while ((scope = scope[_shadow].parent) && (!pendingOnly || scope[_shadow].isPending)) {
        scopes.push(scope);
      }

      return scopes;
    }
    /**
     * timeout before the promise will be canceled
     * @param {Number} [ms] - timeout in ms
     * @returns {Number|CPromise}
     */


    timeout(ms) {
      const shadow = this[_shadow];

      if (arguments.length) {
        if (shadow.timer) {
          shadow.timestamp = -1;
          clearTimeout(shadow.timer);
          shadow.timer = null;
        }

        if (typeof ms !== 'number' || ms < 0) {
          throw TypeError('timeout must be a positive number');
        }

        if (ms > 0) {
          shadow.timestamp = now();
          shadow.timer = setTimeout(() => {
            this.cancel(E_REASON_TIMEOUT);
          }, shadow.timeout = ms);
        }

        return this;
      }

      return shadow.timeout;
    }
    /**
     * get promise abort signal object
     * @type {AbortSignal}
     */


    get signal() {
      const shadow = this[_shadow];
      if (this[_shadow].controller) return this[_shadow].controller.signal;
      return (this[_shadow].controller = new (shadow.nativeController ? AbortController$1 : AbortControllerEx)()).signal;
    }
    /**
     * Sets the promise weight in progress capturing process
     * @param {Number} [weight] - any number greater or equal 0
     * @returns {Number|CPromise} returns weight if no arguments were specified
     */


    weight(weight) {
      if (arguments.length) {
        if (typeof weight !== 'number') {
          throw TypeError('weight must be a number');
        }

        if (weight < 0) {
          throw Error('weight must must be a positive number');
        }

        this[_shadow].weight = weight;
        return this;
      }

      return this[_shadow].weight;
    }
    /**
     * Sets the promise label
     * @param {String} [label] - any string
     * @returns {Number|CPromise} returns weight if no arguments were specified
     */


    label(label) {
      if (arguments.length) {
        this[_shadow].label = label;
        return this;
      }

      return this[_shadow].label;
    }
    /**
     * indicates if the promise is pending
     * @returns {Boolean}
     */


    get isPending() {
      return this[_shadow].isPending;
    }
    /**
     * indicates if the promise is pending
     * @returns {Boolean}
     */


    get isCanceled() {
      return this[_shadow].isCanceled;
    }
    /**
     * indicates if the promise progress is captured
     * @return {Boolean}
     */


    get isCaptured() {
      return this[_shadow].isCaptured;
    }
    /**
     * indicates if the promise is paused
     * @returns {Boolean}
     */


    get isPaused() {
      return this[_shadow].paused;
    }
    /**
     * indicates if the promise is rejected
     * @returns {Boolean}
     */


    get isRejected() {
      return this[_shadow].isRejected;
    }
    /**
     * get parent promise
     * @returns {CPromise|null}
     */


    get parent() {
      return this[_shadow].parent;
    }
    /**
     * Resolves the promise with given value
     * @param value
     * @returns {CPromise}
     */


    resolve(value) {
      this[_resolve](value, false);

      return this;
    }
    /**
     * Rejects the promise with given error
     * @param err
     * @returns {CPromise}
     */


    reject(err) {
      this[_resolve](err, true);

      return this;
    }

    [_setInnerChain](chain, captureProgress) {
      const shadow = this[_shadow];
      shadow.innerChain = chain;
      chain.on('propagate', (type, scope, data) => {
        if (type === TYPE_PROGRESS) {
          if (!captureProgress || !shadow.isCaptured) return;
          const progress = chain.progress();
          this.progress(progress, data);
          return;
        }

        this.emit('propagate', type, scope, data);
      });

      if (captureProgress) {
        shadow.isCaptured && chain.captureProgress();
        shadow.innerWeight = chain[_shadow].totalWeight;
      }
    }

    [_resolve](value, isRejected) {
      const shadow = this[_shadow];
      if (!shadow.isPending) return this;

      const complete = (value, isRejected) => {
        shadow.timer && clearTimeout(shadow.timer);

        const resolve = () => {
          shadow.isRejected = isRejected;
          shadow.value = value;

          if (isRejected) {
            shadow.isCanceled && !shadow.leafsCount && super.then(null, noop);
            this.emit('done', value, isRejected);
            shadow.reject(value);
          } else {
            shadow.isCaptured && this.progress(1);
            this.emit('done', undefined, value);
            shadow.resolve(value);
          }

          shadow.isPending = false;
          shadow.innerChain = null;
          shadow.parent && shadow.parent[_shadow].leafsCount--;
          shadow.parent = null;
          this[_events$1] = null;
        };

        if (isRejected && value && value instanceof CanceledError$1) {
          shadow.isCanceled = true;
          value.scope || (value.scope = this);

          if (shadow.controller) {
            shadow.controller.abort();
            shadow.controller = null;
          }

          this.emit('cancel', value);
          resolve();
          return;
        }

        if (shadow.paused) {
          return this.on('resume', resolve);
        }

        resolve();
      };

      if (!isRejected && shadow.canceledWith) {
        complete(shadow.canceledWith, true);
      }

      if (!isThenable$1(value)) {
        complete(value, isRejected);
        return;
      }

      if (value instanceof CPromise) {
        this[_setInnerChain](value, true);
      }

      super.then.call(value, value => {
        complete(value);
      }, err => {
        complete(err, true);
      });
    }
    /**
     * Pause promise
     * @returns {Boolean}
     */


    pause() {
      return this.emitSignal(SIGNAL_PAUSE, null, function () {
        const shadow = this[_shadow];

        if (!shadow.paused) {
          shadow.paused = true;

          if (shadow.timer) {
            clearTimeout(shadow.timer);
            shadow.timer = null;
            shadow.timestamp !== -1 && (shadow.timeLeft = now() - shadow.timestamp);
          }

          this.emit('pause');
        }

        return true;
      });
    }
    /**
     * Resume promise
     * @returns {Boolean}
     */


    resume() {
      return this.emitSignal(SIGNAL_RESUME, null, function () {
        const shadow = this[_shadow];

        if (shadow.paused) {
          shadow.paused = false;

          if (shadow.timeLeft) {
            this.timeout(shadow.timeLeft);
            shadow.timeLeft = 0;
          }

          this.emit('resume');
        }

        return true;
      });
    }
    /**
     * Make promise chain atomic (non-cancellable for external signals)
     * @param {number|boolean|"disabled"|"detached"|"await"} [type]
     * @returns CPromise
     */


    atomic(type = ATOMIC_TYPE_AWAIT) {
      const _type = atomicMap.get(type);

      if (_type === undefined) {
        throw Error(`Unknown atomic type '${type}'`);
      }

      this[_shadow].atomic = _type;
      return this;
    }
    /**
     * throws the CanceledError that cause promise chain cancellation
     * @param {String|Error} [reason]
     * @param {Boolean} [force]
     */


    cancel(reason, force = false) {
      return this.emitSignal(SIGNAL_CANCEL, {
        err: CanceledError$1.from(reason),
        force
      }, function ({
        err
      }) {
        !this[_shadow].canceledWith && this.reject(err);
        return true;
      }, ({
        err,
        force
      }, type, scope, isRoot) => {
        const shadow = scope[_shadow];
        const {
          atomic
        } = shadow;

        if (atomic === ATOMIC_TYPE_DETACHED) {
          return false;
        }

        if (atomic === ATOMIC_TYPE_AWAIT) {
          shadow.canceledWith = err;
          return true;
        }

        if (!isRoot && !force && scope[_shadow].leafsCount > 1) {
          return false;
        }
      });
    }
    /**
     * @typedef {String|Symbol} Signal
     */

    /**
     * @typedef {Function} SignalHandler
     * @param {*} data
     * @param {Signal} type
     * @param {CPromise} scope
     * @this {CPromise}
     * @returns {Boolean}
     */

    /**
     * @typedef {Function} SignalLocator
     * @param {*} data
     * @param {Signal} type
     * @param {CPromise} scope
     * @param {Boolean} isRoot
     * @this {CPromise}
     * @returns {Boolean}
     */

    /**
     * Emit a signal of the specific type
     * @param {Signal} type
     * @param {*} [data]
     * @param {SignalHandler} [handler]
     * @param {SignalLocator} [locator]
     * @returns {Boolean}
     */


    emitSignal(type, data, handler, locator) {
      const emit = (scope, isRoot) => {
        const shadow = scope[_shadow];
        if (!shadow.isPending) return false;
        const locatorResult = locator ? locator.call(scope, data, type, scope, isRoot) : undefined;

        if (locatorResult === false) {
          return false;
        }

        if (locatorResult !== true) {
          let {
            parent,
            innerChain
          } = shadow;

          if (parent && emit(parent, false)) {
            return true;
          }

          if (innerChain && emit(innerChain, false)) {
            return true;
          }
        }

        return !!(scope.emitHook('signal', type, data) || handler && handler.call(scope, data, type, scope));
      };

      return emit(this, true);
    }
    /**
     * Returns a chain that will be resolved after specified timeout
     * @param {Number} ms
     * @returns {CPromise}
     */


    delay(ms) {
      return this.then(value => this.constructor.delay(ms, value));
    }
    /**
     * returns a CPromise. It takes up to two arguments: callback functions for the success and failure cases of the Promise.
     * @param {onFulfilled} onFulfilled
     * @param {onRejected} [onRejected]
     * @returns {CPromise}
     */


    then(onFulfilled, onRejected) {
      if (onFulfilled != null && typeof onFulfilled !== 'function') {
        throw TypeError('onFulfilled is not a function');
      }

      if (onRejected != null && typeof onRejected !== 'function') {
        throw TypeError('onRejected is not a function');
      }

      const resolve = (value, isRejected) => {
        const shadow = promise[_shadow];
        const canceled = shadow.isCanceled;

        if (canceled) {
          isRejected = true;
          value = shadow.value;
        } else {
          if (isRejected && value instanceof CanceledError$1) {
            shadow.isCanceled = true;
          }
        }

        const cb = isRejected ? onRejected || (err => {
          if (!canceled) {
            throw err;
          }
        }) : onFulfilled;
        return isGeneratorFunction$1(cb) ? this.constructor.run(cb, {
          resolveSignatures: true,
          args: [value]
        }) : cb.call(promise, value, promise);
      };

      const promise = super.then(onFulfilled ? resolve : value => {
        if (this[_shadow].isCanceled) {
          promise[_shadow].isCanceled = true;
        }

        return value;
      }, err => resolve(err, true));
      promise[_shadow].parent = this;
      this[_shadow].leafsCount++;
      this.on('propagate', (type, scope, data) => {
        promise.emit('propagate', type, scope, data);
      });
      return promise;
    }
    /**
     * Catches rejection with optionally specified Error class
     * @param {Function} onRejected
     * @param {Error} [filter]
     * @returns {CPromise}
     */


    catch(onRejected, filter) {
      if (filter) {
        return super.catch((err, scope) => {
          if (err instanceof filter) {
            onRejected(err, scope);
            return;
          }

          throw err;
        });
      }

      return super.catch(onRejected);
    }
    /**
     * Catches CancelError rejection
     * @param {Function} [onCanceled]
     * @returns {CPromise}
     */


    canceled(onCanceled) {
      return this.catch((err, scope) => {
        if (err instanceof CanceledError$1) {
          if (onCanceled === undefined) return;

          if (typeof onCanceled !== 'function') {
            throw TypeError('onCanceled must be a function');
          }

          return onCanceled(err, scope);
        }

        throw err;
      });
    }
    /**
     * Checks if thing is an CanceledError instance
     * @param thing
     * @returns {boolean}
     */


    static isCanceledError(thing) {
      return thing instanceof CanceledError$1;
    }
    /**
     * Returns a CPromise that will be resolved after specified timeout
     * @param {Number} ms - delay before resolve the promise with specified value
     * @param value
     * @param {object} [options]
     * @param {number} [options.progressTick= 1000] progress timer tick, must be >= 100ms
     * @returns {CPromise}
     */


    static delay(ms, value, options) {
      return new this((resolve, reject, scope) => {
        if (!Number.isFinite(ms)) {
          throw TypeError('timeout must be a finite number');
        }

        let timer = setTimeout(() => {
          timer = 0;
          resolve(value);
        }, ms);
        scope.onDone(() => timer && clearTimeout(timer));
        const {
          progressTick = 1000
        } = options !== undefined ? validateOptions$1(options, {
          progressTick: numberFinitePositive
        }) : {};

        if (progressTick) {
          if (progressTick < 100) {
            throw Error('progressTick must be grater than 100ms to avoid performance impact');
          }

          const captureProgress = () => {
            if (ms > progressTick * 1.5) {
              let timestamp = Date.now();
              const progressTimer = setInterval(() => {
                scope.progress((Date.now() - timestamp) / ms);
              }, progressTick);
              scope.onDone(() => clearTimeout(progressTimer));
            }
          };

          if (scope.isCaptured) {
            captureProgress();
          } else {
            scope.onCapture(captureProgress);
          }
        }
      });
    }
    /**
     * Listen for abort signal
     * @param {AbortSignal} signal
     * @returns {CPromise}
     */


    listen(signal) {
      if (!isAbortSignal$1(signal)) {
        throw TypeError('signal should implement AbortSignal interface');
      }

      const signalListener = (type, event, reason) => {
        this.cancel(reason);
      };

      signal.addEventListener('abort', signalListener);
      this.on('done', () => {
        signal.removeEventListener('abort', signalListener);
      });
      return this;
    }
    /**
     * @typedef {object} AllOptions
     * @property {number} concurrency limit concurrency of promise being run simultaneously
     * @property {function} mapper function to map each element
     * @property {boolean} ignoreResults do not collect results
     * @property {boolean} signatures use advanced signatures for vales resolving
     */

    /**
     * Returns a single CPromise that resolves to an array of the results of the input promises.
     * If one fails then other promises will be canceled immediately
     * @param {Iterable|Generator|GeneratorFunction} iterable
     * @param {AllOptions} [options]
     * @returns {CPromise}
     * @example
     * CPromise.all(function*(){
     *     yield axios.get(url1);
     *     yield axios.get(url2);
     *     yield axios.get(url3);
     * }, {concurrency: 1}).then(console.log)
     */


    static all(iterable, options) {
      return new this((resolve, reject, scope) => {
        let pending;
        let results;
        let progressAcc = 0;
        let isCaptured;
        let endReached;
        let generator;

        if (options !== undefined) {
          validateOptions$1(options, {
            concurrency: numberFinitePositive,
            ignoreResults: boolean,
            signatures: boolean,
            mapper: validators$1.function
          });
        }

        let {
          concurrency = 0,
          ignoreResults,
          signatures,
          mapper
        } = options || {};

        const cancel = reason => {
          const {
            length
          } = pending;

          for (let i = 0; i < length; i++) {
            pending[i].cancel(reason);
          }
        };

        scope.onCancel(cancel);
        scope.onPause(() => {
          const {
            length
          } = pending;

          for (let i = 0; i < length; i++) {
            pending[i].pause();
          }
        });
        scope.onResume(() => {
          const {
            length
          } = pending;

          for (let i = 0; i < length; i++) {
            pending[i].resume();
          }
        });
        scope.on('signal', (type, data) => {
          const {
            length
          } = pending;
          let result = false;

          for (let i = 0; i < length; i++) {
            if (pending[i].emitSignal(type, data)) {
              result = true;
            }
          }

          return result;
        });

        const handleProgress = (value, _scope, data) => {
          let total = scope.innerWeight() || 1;
          let sum = progressAcc;
          const {
            length
          } = pending;

          for (let i = 0; i < length; i++) {
            const promise = pending[i];
            sum += promise.progress() * promise.weight();
          }

          sum <= total && scope.progress(sum / total, _scope, data);
        };

        const _reject = err => {
          reject(err);
          cancel();
        };

        function throwConvertError() {
          throw TypeError('unable to convert object to iterable');
        }

        scope.on('capture', () => {
          let i = pending.length;

          while (i-- > 0) {
            pending[i].progress(handleProgress);
          }

          isCaptured = true;
          !scope.innerWeight() && scope.innerWeight(computeWeightSum(pending));
        });

        if (!concurrency) {
          pending = toArray$1(iterable, (value, i) => {
            return this.from(mapper ? mapper(value, i) : value, signatures);
          }) || throwConvertError();
          return super.all(pending).then(resolve, _reject);
        }

        generator = toGenerator$1(iterable) || throwConvertError();
        pending = [];
        !ignoreResults && (results = []);

        const next = value => {
          const promise = this.from(value, signatures);
          pending.push(promise);
          isCaptured && promise.progress(handleProgress);
          promise.then(resolved => {
            const index = pending.indexOf(promise);

            if (index !== -1) {
              pending.splice(index, 1);
            }

            !ignoreResults && results.push(resolved);
            isCaptured && (progressAcc += promise.weight());
            !endReached && pump();

            if (!pending.length) {
              resolve(ignoreResults ? undefined : results);
            }
          }, _reject);
        };

        const pump = () => {
          while (!endReached && pending.length < concurrency) {
            let item;

            try {
              item = generator.next();
            } catch (err) {
              _reject(err);

              return;
            }

            if (item.done) {
              endReached = true;
              return;
            }

            next(mapper ? mapper(item.value) : item.value);
          }
        };

        pump();
      });
    }
    /**
     * returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects,
     * with the value or reason from that promise. Other pending promises will be canceled immediately
     * @param {Iterable} thenables
     * @returns {CPromise}
     */


    static race(thenables) {
      return new this((resolve, reject, scope) => {
        thenables = toArray$1(thenables);
        const {
          length
        } = thenables;

        for (let i = 0; i < length; i++) {
          thenables[i] = this.from(thenables[i]);
        }

        const cancel = reason => {
          for (let i = 0; i < length; i++) {
            thenables[i].cancel(reason);
          }
        };

        scope.on('capture', () => {
          let max = 0;

          for (let i = 0; i < length; i++) {
            thenables[i].progress((value, scope, data) => {
              for (let i = 0; i < length; i++) {
                if (value > max) {
                  max = value;
                  return scope.set(value, data);
                }
              }
            });
          }
        });
        scope.onCancel(cancel);
        scope.onPause(() => {
          for (let i = 0; i < length; i++) {
            thenables[i].pause();
          }
        });
        scope.onResume(() => {
          for (let i = 0; i < length; i++) {
            thenables[i].resume();
          }
        });
        scope.on('signal', (type, data) => {
          const {
            length
          } = thenables;
          let result = false;

          for (let i = 0; i < length; i++) {
            if (thenables[i].emitSignal(type, data)) {
              result = true;
            }
          }

          return result;
        });
        super.race(thenables).then(value => {
          resolve(value);
          cancel();
        }, err => {
          reject(err);
          cancel();
        });
      });
    }
    /**
     * returns a promise that resolves after all of the given promises have either fulfilled or rejected
     * @param {Iterable|Generator|GeneratorFunction} iterable
     * @param {AllOptions} options
     * @returns {CPromise}
     */


    static allSettled(iterable, options) {
      const {
        mapper,
        ...allOptions
      } = options || {};
      return this.all(iterable, { ...allOptions,
        mapper: (value, i) => {
          return this.resolve(mapper ? mapper(value, i) : value).then(value => ({
            status: "fulfilled",
            value
          }), err => {
            if (this.isCanceledError(err)) {
              throw err;
            }

            return {
              status: "rejected",
              reason: err
            };
          });
        }
      });
    }
    /**
     * @typedef {function} CPRetryFunction
     * @param {number} attempt
     * @param {array} args
     * @returns {*}
     */

    /**
     * @typedef {GeneratorFunction} CPGeneratorRetryFunction
     * @param {CPromise} scope
     * @param {number} attempt
     * @param {array} args
     * @returns {*}
     */

    /**
     * @typedef {function} CPRetryDelayResolver
     * @param {number} attempt
     * @param {number} retries
     * @returns {number} a delay in ms before next attempt
     */

    /**
     * Retry async operation
     * @param {CPGeneratorRetryFunction|CPRetryFunction} fn
     * @param {object} [options]
     * @param {array} [options.args]
     * @param {number} [options.retries]
     * @param {number|CPRetryDelayResolver} [options.delayWeight]
     * @param {object} [options.delay]
     * @return {CPromise}
     */


    static retry(fn, options) {
      if (typeof fn !== 'function') {
        throw TypeError('fn must be a function');
      }

      options !== undefined && validateOptions$1(options, {
        args: array,
        retries: numberFinitePositive,
        delayWeight: numberFinitePositive,
        delay: union(numberFinitePositive, functionPlain)
      });
      const {
        args = [],
        retries = 3,
        delayWeight = 0.1,
        delay = attempt => attempt * 1000
      } = typeof options === 'number' ? {
        retries: options
      } : options || {};
      let attemptIndex = 0;
      return new this((resolve, reject, scope) => {
        const shadow = scope[_shadow];

        const attempt = () => {
          const fnArgs = [attemptIndex, args];

          const doAttempt = () => {
            return isGeneratorFunction$1(fn) ? this.run(fn, {
              args: fnArgs,
              scopeArg: true
            }) : this.from(fn.apply(scope, fnArgs));
          };

          let _delay = delay;

          if (attemptIndex && typeof delay === 'function') {
            _delay = delay(attemptIndex, retries);

            if (!numberFinitePositive(_delay)) {
              throw TypeError(`delay fn must return a finite number`);
            }
          }

          scope.progress(0);
          const promise = (attemptIndex && _delay ? this.delay(_delay).weight(delayWeight).then(doAttempt) : doAttempt()).weight(0.9).then(resolve, err => {
            if (!this.isCanceledError(err)) {
              if (++attemptIndex < retries || !retries) {
                setImmediate$1(attempt);
                return;
              }
            }

            reject(err);
          }).weight(0);

          if (shadow.innerChain) {
            shadow.innerChain[_events$1] = null;
          }

          scope[_setInnerChain](promise, true);

          return promise;
        };

        attempt();
      });
    }

    static [_objectToCPromise](thing) {
      if (!thing) return null;
      const convertMethod = thing[_toCPromise];

      if (typeof convertMethod === 'function') {
        if (promiseAssocStore.has(thing)) {
          return promiseAssocStore.get(thing);
        }

        const returnedValue = convertMethod.call(thing, this);

        if (!(returnedValue instanceof this)) {
          throw Error(`method '[${convertMethod}]' must return a CPromise instance`);
        }

        promiseAssocStore.set(thing, returnedValue);
        return returnedValue;
      }

      if (typeof thing.then === 'function') {
        return new this((resolve, reject, {
          onCancel
        }) => {
          if (typeof thing.cancel === 'function') {
            onCancel(reason => {
              try {
                thing.cancel(reason);
              } catch (err) {
                reject(err);
              }
            });
          }

          return thing.then(resolve, reject);
        });
      }

      return null;
    }
    /**
     * Converts thing to CPromise using the following rules:
     * - CPromise instance returns as is
     * - Objects with special method defined with key `Symbol.for('toCPromise')` will be converted using this method
     *   The result will be cached for future calls
     * - Thenable wraps into a new CPromise instance, if thenable has the `cancel` method it will be used for canceling
     * - Generator function will be resolved to CPromise
     * - Array will be resoled via `CPromise.all`, arrays with one element (e.g. `[[1000]]`) will be resolved via `CPromise.race`
     *
     * This method returns null if the conversion failed.
     * @param {*} thing
     * @param {Object} [options]
     * @param {Boolean} [options.resolveSignatures= true]
     * @param {Array} [options.args]
     * @returns {CPromise}
     */


    static from(thing, options) {
      if (thing && thing instanceof this) {
        return thing;
      }

      const {
        resolveSignatures = true,
        args
      } = (typeof options === 'boolean' ? {
        resolveSignatures: options
      } : options) || {};

      if (resolveSignatures) {
        const type = typeof thing;

        if (type === 'object') {
          if (isArray(thing)) {
            if (thing.length === 1) {
              const first = thing[0];

              if (isArray(first)) {
                return this.race(first.map(this.from, this));
              }
            }

            return this.all(thing.map(this.from, this));
          }
        } else if (type === 'function') {
          if (isGeneratorFunction$1(thing)) {
            return this.run(thing, args);
          }
        }

        return this[_objectToCPromise](thing) || this.resolve(thing);
      }

      return this.resolve(thing);
    }
    /**
     * @typedef {Function} PromisifyFinalizeFn
     * @param {*} result
     * @param {CPromise} scope
     */

    /**
     * @typedef {function} CPPromisifyDecoratorFn
     * @param {function} originalFn function to decorate
     * @param {PromisifyOptions} options
     * @returns {function}
     */

    /**
     * @typedef {Object} PromisifyOptions
     * @property {Boolean} [multiArgs] aggregate all passed arguments to an array
     * @property {PromisifyFinalizeFn} [finalize] aggregate all passed arguments to an array
     * @property {"plain"|"generator"|"async"} [fnType]
     * @property {boolean} [scopeArg] pass the CPromise scope as the first argument to the generator function
     * @property {function} [decorator] CPPromisifyDecoratorFn
     */

    /**
     * Converts callback styled function|GeneratorFn|AsyncFn to CPromise async function
     * @param {Function|GeneratorFunction|AsyncFunction} originalFn
     * @param {PromisifyOptions|Function|Boolean} [options]
     * @returns {function(...[*]): CPromise}
     */


    static promisify(originalFn, options) {
      const type = typeof options;

      if (type === 'boolean') {
        options = {
          multiArgs: !!options
        };
      } else if (type === 'function') {
        options = {
          finalize: options
        };
      } else {
        options !== undefined && validateOptions$1(options, {
          multiArgs: boolean,
          finalize: functionPlain,
          fnType: string,
          scopeArg: boolean,
          decorator: functionPlain
        });
      }

      const {
        multiArgs,
        finalize,
        fnType = getFnType$1(originalFn),
        scopeArg,
        decorator
      } = options || {};
      const context = this;
      const decoratedFn = decorator && decorator.call(context, originalFn, { ...options,
        fnType
      }) || originalFn;

      switch (fnType) {
        case "plain":
          return function (...args) {
            return new context((resolve, reject, scope) => {
              const callback = (err, ...data) => {
                if (err) {
                  return reject(err);
                }

                return multiArgs || data.length > 1 ? resolve(data) : resolve(data[0]);
              };

              const result = decoratedFn.apply(this, scopeArg ? [scope, ...args, callback] : [...args, callback]);

              if (isThenable$1(result)) {
                result.then(resolve, reject);
              }

              finalize && finalize(result, scope);
            });
          };

        case "generator":
          return function (...args) {
            return context.run(decoratedFn, {
              context: this,
              scopeArg,
              args
            });
          };

        case "async":
          return function (...args) {
            if (!scopeArg) {
              return context.resolve(decoratedFn.apply(this, args));
            }

            return context.resolve().then((v, scope) => {
              return context.resolve(decoratedFn.apply(this, [scope, ...args]));
            });
          };
      }

      throw TypeError('promisify requires a Function|GeneratorFunction|AsyncFunction as the first argument');
    }
    /**
     * Resolves the generator to an CPromise instance
     * @param {GeneratorFunction} generatorFn
     * @param {Object} [options]
     * @param {Array} [options.args]
     * @param {Boolean} [options.resolveSignatures] resolve extra signatures (like arrays with CPromise.all)
     * @param {Boolean} [options.scopeArg] pass the CPromise scope as the first argument to the generator function
     * @param {*} [options.context]
     * @returns {CPromise}
     */


    static run(generatorFn, {
      args,
      resolveSignatures,
      context,
      scopeArg = false
    } = {}) {
      return new this((resolve, reject, scope) => {
        let generator;

        if (!context) {
          context = scope;
        }

        if (!scopeArg) {
          generator = generatorFn.apply(context, args);
        } else {
          switch (args ? args.length : 0) {
            case 0:
              generator = generatorFn.call(context, scope);
              break;

            case 1:
              generator = generatorFn.call(context, scope, args[0]);
              break;

            case 2:
              generator = generatorFn.call(context, scope, args[0], args[1]);
              break;

            default:
              generator = generatorFn.apply(context, [scope, ...args]);
          }
        }

        if (!isGenerator$1(generator)) {
          return reject(new TypeError('function must a generator'));
        }

        let progress = 0;
        let sum = 0;
        let weight = 0;
        let promise;

        const setProgress = (value, _scope, data) => {
          progress = (value * weight + sum) / (scope.innerWeight() || 1);

          if (progress > 1) {
            progress = 1;
          }

          scope.progress(progress, _scope, data);
        };

        const onFulfilled = result => {
          try {
            next(generator.next(result));
          } catch (e) {
            return reject(e);
          }
        };

        const onRejected = err => {
          try {
            next(generator.throw(err));
          } catch (e) {
            reject(e);
          }
        };

        const next = r => {
          if (r.done) {
            return resolve(r.value);
          }

          promise = this.from(r.value, {
            resolveSignatures
          });

          scope[_setInnerChain](promise, false);

          sum += weight;
          weight = promise.isChain ? 1 : promise.weight();
          setImmediate$1(() => {
            scope[_shadow].isCaptured && promise.progress((value, scope, data) => {
              setProgress(value, scope, data);
            });
          });
          return promise.then(onFulfilled, onRejected);
        };

        onFulfilled();
      });
    }
    /**
     * adds a new listener
     * @param {EventType} type
     * @param {Function} listener
     * @param {Boolean} [prepend= false]
     * @returns {CPromise}
     */


    on(type, listener, prepend) {
      const events = this[_events$1];
      if (!events) return this;
      const listeners = events[type];
      events['newListener'] && this.emit('newListener', type, listener);

      if (!listeners) {
        events[type] = listener;
        return this;
      }

      if (typeof listeners === 'function') {
        events[type] = prepend ? [listener, listeners] : [listeners, listener];
        return this;
      }

      prepend ? listeners.unshift(listener) : listeners.push(listener);
      return this;
    }
    /**
     * removes the listener
     * @param {EventType} type
     * @param {Function} listener
     * @returns {CPromise}
     */


    off(type, listener) {
      if (typeof listener !== 'function') {
        throw TypeError('listener must be a function');
      }

      const events = this[_events$1];
      if (!events) return this;
      const listeners = events[type];

      if (!listeners) {
        return this;
      }

      if (typeof listeners === 'function' && listeners === listener) {
        events[type] = null;
        events['removeListener'] && this.emit('removeListener', type, listener);
        return this;
      }

      const len = listeners.length;

      for (let i = 0; i < len; i++) {
        if (listeners[i] === listener) {
          len === 1 ? events[type] = null : listeners.splice(i, 1);
          events['removeListener'] && this.emit('removeListener', type, listener);
          return this;
        }
      }

      return this;
    }
    /**
     * returns listeners count of the specific event type
     * @param {EventType} type
     * @returns {Number}
     */


    listenersCount(type) {
      const events = this[_events$1];
      if (!events) return 0;
      const listeners = events[type];
      if (!listeners) return 0;
      return typeof listeners === 'function' ? 1 : listeners.length;
    }
    /**
     * checks if there are listeners of a specific type
     * @param {String|Symbol} type
     * @returns {Boolean}
     */


    hasListeners(type) {
      const events = this[_events$1];
      return !!(events && events[type]);
    }
    /**
     * add 'once' listener
     * @param {EventType} type
     * @param {Function} listener
     * @returns {CPromise}
     */


    once(type, listener) {
      const emitter = this;

      function _listener() {
        emitter.off(type, _listener);
        listener.apply(emitter, arguments);
      }

      return this.on(type, _listener);
    }
    /**
     * emits the event
     * @param {EventType} type
     * @param args
     * @returns {CPromise}
     */


    emit(type, ...args) {
      const events = this[_events$1];
      if (!events) return this;
      const listeners = events[type];
      if (!listeners) return this;

      if (typeof listeners === 'function') {
        listeners.apply(this, args);
        return this;
      }

      for (let i = 0; i < listeners.length; i++) {
        listeners[i].apply(this, args);
      }

      return this;
    }
    /**
     * Emits event as a hook. If some listener return true, this method will immediately return true as the result.
     * Else false will be retuned
     * @param {EventType} type
     * @param args
     * @returns {Boolean}
     */


    emitHook(type, ...args) {
      const events = this[_events$1];
      if (!events) return false;
      const listeners = events[type];
      if (!listeners) return false;

      if (typeof listeners === 'function') {
        return !!listeners.apply(this, args);
      }

      for (let i = 0; i < listeners.length; i++) {
        if (listeners[i].apply(this, args)) {
          return true;
        }
      }

      return false;
    }
    /**
     * Render promise to String
     * @param {boolean} [entireChain= false] render the entire promise chain
     * @returns {string}
     */


    toString(entireChain) {
      if (!entireChain) {
        return super.toString();
      }

      const renderStatus = scope => {
        if (scope.isPaused) return 'paused';
        if (scope.isPending) return 'pending' + (scope[_shadow].computedProgress !== -1 ? `[${(scope[_shadow].computedProgress * 100).toFixed(1)}%]` : '');
        const value = scope[_shadow].value;
        return `${scope.isRejected ? 'rejected' : 'resolved'}${value === undefined ? '' : `<${value}>`}`;
      };

      return this.scopes().reverse().map(scope => `${scope.label() || scope.constructor.name}<${renderStatus(scope)}>`).join(' → ');
    }

  }

  const {
    prototype
  } = CPromise;
  prototype.addEventListener = prototype.on;
  prototype.removeEventListener = prototype.off;
  lazyBindMethods$1(prototype, ['Cancel', 'Pause', 'Resume', 'Capture', 'Done'].map(type => {
    const typeL = type.toLowerCase();
    const methodName = 'on' + type;

    prototype[methodName] = function method(listener) {
      if (!this[_shadow].isPending) {
        throw Error(`Unable to subscribe to ${typeL} event since the promise has been already settled`);
      }

      return this.on(typeL, listener);
    };

    return methodName;
  }));
  lazyBindMethods$1(CPromise, Object.getOwnPropertyNames(CPromise).map(prop => {
    const {
      value
    } = Object.getOwnPropertyDescriptor(CPromise, prop);
    return typeof value === 'function' ? prop : '';
  }).filter(Boolean));
  Object.defineProperties(CPromise, Object.entries({
    CPromise,
    CanceledError: CanceledError$1,
    AbortController: AbortController$1,
    AbortControllerEx,
    SIGNAL_CANCEL,
    SIGNAL_PAUSE,
    SIGNAL_RESUME,
    E_REASON_CANCELED: E_REASON_CANCELED$1,
    E_REASON_TIMEOUT,
    E_REASON_DISPOSED
  }).reduce((descriptors, [prop, value]) => {
    descriptors[prop] = {
      value,
      configurable: true
    };
    return descriptors;
  }, {}));
  Object.entries(Object.getOwnPropertyDescriptors(prototype)).forEach(([prop, descriptor]) => {
    if (descriptor.get && descriptor.set === undefined) {
      descriptor.set = function () {
        throw Error(`Can not rewrite read-only public property '${prop}'`);
      };

      Object.defineProperty(prototype, prop, descriptor);
    }
  });

  const assertCPromiseAsyncFn = (result, decoratorName) => {
    if (!(result instanceof CPromise)) {
      throw TypeError(`@${decoratorName} decorator can only be used for async function only, that returns CPromise instance`);
    }
  };

  const assertMethodContext = (value, decoratorName) => {
    if (typeof value !== 'function') {
      throw TypeError(`@${decoratorName} decorator can be used for methods only`);
    }
  };

  const decorators = {
    async: (decorator, [options], context) => {
      const originalFn = decorator.descriptor.value;

      if (!isGeneratorFunction$1(originalFn)) {
        throw TypeError(`can not decorate ${decorator.key} property with @async, because it is not a generator function`);
      }

      if (typeof options === 'number') {
        options = {
          timeout: options
        };
      } else if (typeof options === 'string') {
        options = {
          label: options
        };
      } else {
        options != null && validateOptions$1(options, {
          timeout: number,
          label: string,
          innerWeight: number,
          weight: number
        });
      }

      const {
        timeout,
        label,
        innerWeight,
        weight
      } = options || {};
      decorator.descriptor = {
        value: function (...args) {
          let promise = context.run(originalFn, {
            context: this,
            args
          });
          timeout && promise.timeout(timeout);
          label && promise.label(label);
          innerWeight && promise.innerWeight(innerWeight);
          weight && promise.weight(weight);
          return promise;
        },
        enumerable: true,
        configurable: true
      };
      return decorator;
    },
    listen: (decorator, [arg0], context) => {
      const fn = decorator.descriptor.value;
      assertMethodContext(fn, 'listen');
      const id = typeof arg0 === 'string' || arg0 || typeof arg0 === 'symbol' || '';
      const signal = !id && isAbortSignal$1(arg0) && arg0;

      decorator.descriptor.value = function () {
        const result = fn.apply(this, arguments);
        assertCPromiseAsyncFn(result, 'listen');

        if (signal) {
          result.listen(signal);
        } else {
          let controllers = controllersStore.get(this);

          if (!controllers) {
            controllersStore.set(this, controllers = {});
          }

          const controller = controllers[id] || (controllers[id] = new context.AbortController());
          result.listen(controller.signal);
        }

        return result;
      };

      return decorator;
    },
    cancel: (decorator, [arg0, arg1]) => {
      const fn = decorator.descriptor.value;
      assertMethodContext(fn, 'cancel');

      if (arg0 != null && typeof arg0 !== 'string') {
        throw TypeError(`@cancel decorator expects the cancel reason as the first argument`);
      }

      const id = typeof arg1 === 'string' || arg1 || typeof arg1 === 'symbol';
      const controller = !id && isAbortController$1(arg1) && arg1;

      decorator.descriptor.value = function () {
        if (controller) {
          controller && controller.abort();
        } else {
          const controllers = controllersStore.get(this);

          if (controllers) {
            const controller = controllers[id || ''];
            controller && controller.abort(arg0);
          }
        }

        return fn.apply(this, arguments);
      };

      return decorator;
    },
    canceled: (decorator, [arg0]) => {
      if (arg0 != null && typeof arg0 !== 'function') {
        throw TypeError(`@canceled decorator expects the onRejected function as the first argument`);
      }

      const fn = decorator.descriptor.value;
      assertMethodContext(fn, 'canceled');

      decorator.descriptor.value = function () {
        const result = fn.apply(this, arguments);
        assertCPromiseAsyncFn(result, 'canceled');
        return result.canceled((err, scope) => arg0.call(this, err, scope, this));
      };

      return decorator;
    },
    progress: (decorator, args) => {
      const [arg0] = args;
      validateArguments$1(args, [validators$1.function], {
        context: '@progress decorator'
      });
      const fn = decorator.descriptor.value;
      assertMethodContext(fn, 'progress');

      decorator.descriptor.value = function () {
        const result = fn.apply(this, arguments);
        assertCPromiseAsyncFn(result, 'progress');
        return result.progress((value, scope, data) => arg0.call(this, value, scope, data, this));
      };

      return decorator;
    }
  };
  ['timeout', 'label', 'innerWeight'].forEach(name => {
    decorators[name] = function (decorator, params) {
      const fn = decorator.descriptor.value;

      if (typeof fn !== 'function') {
        throw TypeError(`@${name} decorator can be used for methods only`);
      }

      if (!params.length) {
        throw Error(`decorator @${name} requires at least one argument`);
      }

      decorator.descriptor.value = function () {
        const result = fn.apply(this, arguments);

        if (!(result instanceof CPromise)) {
          throw TypeError(`@${name} decorator can only be used for async function, that returns CPromise instance`);
        }

        result[name].apply(result, params);
        return result;
      };

      return decorator;
    };
  });
  Object.entries(decorators).forEach(([name, initializer]) => {
    const symbol = Symbol(`${name}Bound`);
    Object.defineProperty(CPromise, name, {
      get: function () {
        return this[symbol] || (this[symbol] = buildDecorator$1.call(this, initializer, name));
      },
      configurable: true,
      enumerable: true
    });
  });
  var CPromise_1 = CPromise;
  /**
   * CanceledError class
   * @type {CanceledError}
   */

  var CanceledError_1 = CanceledError$1;
  /**
   * Refers to the AbortController class (native if available)
   * @type {AbortController|AbortControllerEx}
   */

  var AbortController_1 = AbortController$1;
  /**
   * AbortControllerEx class
   * @type {AbortControllerEx}
   */

  var AbortControllerEx_1 = AbortControllerEx;
  /**
   * Generic cancellation reason
   */

  var E_REASON_CANCELED_1 = E_REASON_CANCELED$1;
  /**
   * Cancellation reason for the case when the instance will be disposed
   */

  var E_REASON_DISPOSED_1 = E_REASON_DISPOSED;
  /**
   * Timeout cancellation reason
   */

  var E_REASON_TIMEOUT_1 = E_REASON_TIMEOUT;
  /**
   * async decorator
   * @type {Function}
   */

  var async = CPromise.async;
  /**
   * listen decorator
   * @type {Function}
   */

  var listen = CPromise.listen;
  /**
   * cancel decorator
   * @type {Function}
   */

  var cancel = CPromise.cancel;
  /**
   * timeout decorator
   * @type {Function}
   */

  var timeout = CPromise.timeout;
  /**
   * innerWeight decorator
   * @type {Function}
   */

  var innerWeight = CPromise.innerWeight;
  /**
   * label decorator
   * @type {Function}
   */

  var label = CPromise.label;
  /**
   * label decorator
   * @type {Function}
   */

  var canceled = CPromise.canceled;
  /**
   * progress decorator
   * @type {Function}
   */

  var progress = CPromise.progress;
  /**
   * @type {Function}
   */

  var promisify = CPromise.promisify;
  var cPromise = {
    CPromise: CPromise_1,
    CanceledError: CanceledError_1,
    AbortController: AbortController_1,
    AbortControllerEx: AbortControllerEx_1,
    E_REASON_CANCELED: E_REASON_CANCELED_1,
    E_REASON_DISPOSED: E_REASON_DISPOSED_1,
    E_REASON_TIMEOUT: E_REASON_TIMEOUT_1,
    async: async,
    listen: listen,
    cancel: cancel,
    timeout: timeout,
    innerWeight: innerWeight,
    label: label,
    canceled: canceled,
    progress: progress,
    promisify: promisify
  };
  const {
    CPromise: CPromise$1
  } = cPromise;
  var umdWrapper = CPromise$1;
  return umdWrapper;
});
});

const {
  CPromise
} = cPromise_umd;

const {
  Axios
} = axios;

const isThenable = thing => thing && typeof thing.then === 'function';

const _setImmediate = typeof setImmediate === 'function' ? setImmediate : setTimeout;

class CPAxios extends Axios {
  request(config) {
    if (typeof config === 'string') {
      config = arguments[1] || {};
      config.url = arguments[0];
    }

    const {
      cancelToken,
      signal,
      onDownloadProgress,
      onUploadProgress,
      ...axiosConfig
    } = config;

    if (cancelToken) {
      if (!isThenable(cancelToken.promise)) {
        return CPromise.reject(new Error('Unknown cancelToken object type'));
      }

      cancelToken.promise.then(reason => {
        promise.cancel(reason.message);
      });
    }

    const promise = new CPromise((resolve, reject, scope) => {
      _setImmediate(() => {
        const {
          isCaptured,
          isCanceled
        } = scope;
        if (isCanceled) return;
        super.request({ ...axiosConfig,
          onDownloadProgress: isCaptured ?
          /* istanbul ignore next */
          function (event) {
            const {
              loaded,
              total
            } = event;
            scope.progress(0.5 + loaded / total / 2, {
              loaded,
              total,
              type: 'download'
            });
            onDownloadProgress && onDownloadProgress(event);
          } : onDownloadProgress,
          onUploadProgress: isCaptured ?
          /* istanbul ignore next */
          function (event) {
            const {
              loaded,
              total
            } = event;
            scope.progress(loaded / total / 2, {
              loaded,
              total,
              type: 'upload'
            });
            onUploadProgress && onUploadProgress(event);
          } : onUploadProgress,
          cancelToken: new axios.CancelToken(function executor(cancel) {
            scope.onCancel(cancel);
          })
        }).then(resolve, reject);
      });
    }, {
      signal,
      nativeController: true
    });
    return promise;
  }

}

var CPAxios_1 = CPAxios;

function collectProps(obj) {
  const propMap = {};

  do {
    Object.getOwnPropertyNames(obj).forEach(prop => {
      !propMap[prop] && (propMap[prop] = true);
    });
  } while ((obj = Object.getPrototypeOf(obj)) && obj !== Object);

  return Object.getOwnPropertyNames(propMap);
}

function proxyContext$1(obj, context) {
  const descriptors = {};
  collectProps(context).forEach(prop => {
    const value = context[prop];

    if (typeof value === 'function') {
      descriptors[prop] = {
        value: value.bind(context),
        enumerable: true,
        writable: false
      };
      return;
    }

    descriptors[prop] = {
      get() {
        return context[prop];
      },

      set(v) {
        return context[prop] = v;
      },

      enumerable: true
    };
  });
  Object.defineProperties(obj, descriptors);
  return obj;
}

var utils = {
  collectProps,
  proxyContext: proxyContext$1
};

const {
  proxyContext
} = utils;



function createInstance(defaultConfig) {
  const context = new CPAxios_1(defaultConfig);
  const instance = CPAxios_1.prototype.request.bind(context);
  return proxyContext(instance, context);
}

const cpAxios = createInstance(defaults_1);
cpAxios.Axios = CPAxios_1;

cpAxios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(cpAxios.defaults, instanceConfig));
};

cpAxios.Cancel = axios.Cancel;
cpAxios.CancelToken = axios.CancelToken;
cpAxios.isCancel = axios.isCancel;

cpAxios.all = function all(promises) {
  return cPromise_umd.all(promises);
};

cpAxios.spread = axios.spread;
var lib = cpAxios;
var _default = cpAxios;
lib.default = _default;

let TestComponent = _decorate([ReactComponent], function (_initialize, _Component) {
  class TestComponent extends _Component {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: TestComponent,
    d: [{
      kind: "field",
      key: "state",

      value() {
        return {
          text: ""
        };
      }

    }, {
      kind: "method",
      key: "componentDidMount",
      value: function* componentDidMount(scope) {
        console.log('mount', scope);
        scope.onCancel(err => console.log(`Cancel: ${err}`));
        yield CPromise_1.delay(3000);
      }
    }, {
      kind: "method",
      decorators: [listen],
      key: "fetch",
      value: function* fetch() {
        this.setState({
          text: "fetching..."
        });

        try {
          const response = yield lib(this.props.url).timeout(this.props.timeout);
          this.setState({
            text: JSON.stringify(response.data, null, 2)
          });
        } catch (err) {
          CanceledError_1.rethrow(err, E_REASON_UNMOUNTED_1);
          this.setState({
            text: err.toString()
          });
        }
      }
    }, {
      kind: "method",
      key: "componentWillUnmount",
      value: function* componentWillUnmount() {
        console.log('unmount');
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return /*#__PURE__*/react.createElement("div", {
          className: "component"
        }, /*#__PURE__*/react.createElement("div", {
          className: "caption"
        }, "useAsyncEffect demo:"), /*#__PURE__*/react.createElement("div", null, this.state.text), /*#__PURE__*/react.createElement("button", {
          className: "btn btn-success",
          type: "submit",
          onClick: () => this.fetch(Math.round(Math.random() * 200))
        }, "Fetch random character info"), /*#__PURE__*/react.createElement("button", {
          className: "btn btn-warning",
          onClick: () => cancel.call(this, 'oops!')
        }, "Cancel request"));
      }
    }]
  };
}, react.Component);

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = "/*!\n * Bootstrap v4.6.0 (https://getbootstrap.com/)\n * Copyright 2011-2021 The Bootstrap Authors\n * Copyright 2011-2021 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n */:root{--blue:#007bff;--indigo:#6610f2;--purple:#6f42c1;--pink:#e83e8c;--red:#dc3545;--orange:#fd7e14;--yellow:#ffc107;--green:#28a745;--teal:#20c997;--cyan:#17a2b8;--white:#fff;--gray:#6c757d;--gray-dark:#343a40;--primary:#007bff;--secondary:#6c757d;--success:#28a745;--info:#17a2b8;--warning:#ffc107;--danger:#dc3545;--light:#f8f9fa;--dark:#343a40;--breakpoint-xs:0;--breakpoint-sm:576px;--breakpoint-md:768px;--breakpoint-lg:992px;--breakpoint-xl:1200px;--font-family-sans-serif:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",\"Liberation Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";--font-family-monospace:SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace}*,::after,::before{box-sizing:border-box}html{font-family:sans-serif;line-height:1.15;-webkit-text-size-adjust:100%;-webkit-tap-highlight-color:transparent}article,aside,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",\"Liberation Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";font-size:1rem;font-weight:400;line-height:1.5;color:#212529;text-align:left;background-color:#fff}[tabindex=\"-1\"]:focus:not(:focus-visible){outline:0!important}hr{box-sizing:content-box;height:0;overflow:visible}h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5rem}p{margin-top:0;margin-bottom:1rem}abbr[data-original-title],abbr[title]{text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted;cursor:help;border-bottom:0;-webkit-text-decoration-skip-ink:none;text-decoration-skip-ink:none}address{margin-bottom:1rem;font-style:normal;line-height:inherit}dl,ol,ul{margin-top:0;margin-bottom:1rem}ol ol,ol ul,ul ol,ul ul{margin-bottom:0}dt{font-weight:700}dd{margin-bottom:.5rem;margin-left:0}blockquote{margin:0 0 1rem}b,strong{font-weight:bolder}small{font-size:80%}sub,sup{position:relative;font-size:75%;line-height:0;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}a{color:#007bff;text-decoration:none;background-color:transparent}a:hover{color:#0056b3;text-decoration:underline}a:not([href]):not([class]){color:inherit;text-decoration:none}a:not([href]):not([class]):hover{color:inherit;text-decoration:none}code,kbd,pre,samp{font-family:SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace;font-size:1em}pre{margin-top:0;margin-bottom:1rem;overflow:auto;-ms-overflow-style:scrollbar}figure{margin:0 0 1rem}img{vertical-align:middle;border-style:none}svg{overflow:hidden;vertical-align:middle}table{border-collapse:collapse}caption{padding-top:.75rem;padding-bottom:.75rem;color:#6c757d;text-align:left;caption-side:bottom}th{text-align:inherit;text-align:-webkit-match-parent}label{display:inline-block;margin-bottom:.5rem}button{border-radius:0}button:focus:not(:focus-visible){outline:0}button,input,optgroup,select,textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}button,input{overflow:visible}button,select{text-transform:none}[role=button]{cursor:pointer}select{word-wrap:normal}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]:not(:disabled),[type=reset]:not(:disabled),[type=submit]:not(:disabled),button:not(:disabled){cursor:pointer}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{padding:0;border-style:none}input[type=checkbox],input[type=radio]{box-sizing:border-box;padding:0}textarea{overflow:auto;resize:vertical}fieldset{min-width:0;padding:0;margin:0;border:0}legend{display:block;width:100%;max-width:100%;padding:0;margin-bottom:.5rem;font-size:1.5rem;line-height:inherit;color:inherit;white-space:normal}progress{vertical-align:baseline}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{outline-offset:-2px;-webkit-appearance:none}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{font:inherit;-webkit-appearance:button}output{display:inline-block}summary{display:list-item;cursor:pointer}template{display:none}[hidden]{display:none!important}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{margin-bottom:.5rem;font-weight:500;line-height:1.2}.h1,h1{font-size:2.5rem}.h2,h2{font-size:2rem}.h3,h3{font-size:1.75rem}.h4,h4{font-size:1.5rem}.h5,h5{font-size:1.25rem}.h6,h6{font-size:1rem}.lead{font-size:1.25rem;font-weight:300}.display-1{font-size:6rem;font-weight:300;line-height:1.2}.display-2{font-size:5.5rem;font-weight:300;line-height:1.2}.display-3{font-size:4.5rem;font-weight:300;line-height:1.2}.display-4{font-size:3.5rem;font-weight:300;line-height:1.2}hr{margin-top:1rem;margin-bottom:1rem;border:0;border-top:1px solid rgba(0,0,0,.1)}.small,small{font-size:80%;font-weight:400}.mark,mark{padding:.2em;background-color:#fcf8e3}.list-unstyled{padding-left:0;list-style:none}.list-inline{padding-left:0;list-style:none}.list-inline-item{display:inline-block}.list-inline-item:not(:last-child){margin-right:.5rem}.initialism{font-size:90%;text-transform:uppercase}.blockquote{margin-bottom:1rem;font-size:1.25rem}.blockquote-footer{display:block;font-size:80%;color:#6c757d}.blockquote-footer::before{content:\"\\2014\\00A0\"}.img-fluid{max-width:100%;height:auto}.img-thumbnail{padding:.25rem;background-color:#fff;border:1px solid #dee2e6;border-radius:.25rem;max-width:100%;height:auto}.figure{display:inline-block}.figure-img{margin-bottom:.5rem;line-height:1}.figure-caption{font-size:90%;color:#6c757d}code{font-size:87.5%;color:#e83e8c;word-wrap:break-word}a>code{color:inherit}kbd{padding:.2rem .4rem;font-size:87.5%;color:#fff;background-color:#212529;border-radius:.2rem}kbd kbd{padding:0;font-size:100%;font-weight:700}pre{display:block;font-size:87.5%;color:#212529}pre code{font-size:inherit;color:inherit;word-break:normal}.pre-scrollable{max-height:340px;overflow-y:scroll}.container,.container-fluid,.container-lg,.container-md,.container-sm,.container-xl{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:576px){.container,.container-sm{max-width:540px}}@media (min-width:768px){.container,.container-md,.container-sm{max-width:720px}}@media (min-width:992px){.container,.container-lg,.container-md,.container-sm{max-width:960px}}@media (min-width:1200px){.container,.container-lg,.container-md,.container-sm,.container-xl{max-width:1140px}}.row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-15px;margin-left:-15px}.no-gutters{margin-right:0;margin-left:0}.no-gutters>.col,.no-gutters>[class*=col-]{padding-right:0;padding-left:0}.col,.col-1,.col-10,.col-11,.col-12,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-auto,.col-lg,.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-lg-auto,.col-md,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-md-auto,.col-sm,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-sm-auto,.col-xl,.col-xl-1,.col-xl-10,.col-xl-11,.col-xl-12,.col-xl-2,.col-xl-3,.col-xl-4,.col-xl-5,.col-xl-6,.col-xl-7,.col-xl-8,.col-xl-9,.col-xl-auto{position:relative;width:100%;padding-right:15px;padding-left:15px}.col{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-first{-ms-flex-order:-1;order:-1}.order-last{-ms-flex-order:13;order:13}.order-0{-ms-flex-order:0;order:0}.order-1{-ms-flex-order:1;order:1}.order-2{-ms-flex-order:2;order:2}.order-3{-ms-flex-order:3;order:3}.order-4{-ms-flex-order:4;order:4}.order-5{-ms-flex-order:5;order:5}.order-6{-ms-flex-order:6;order:6}.order-7{-ms-flex-order:7;order:7}.order-8{-ms-flex-order:8;order:8}.order-9{-ms-flex-order:9;order:9}.order-10{-ms-flex-order:10;order:10}.order-11{-ms-flex-order:11;order:11}.order-12{-ms-flex-order:12;order:12}.offset-1{margin-left:8.333333%}.offset-2{margin-left:16.666667%}.offset-3{margin-left:25%}.offset-4{margin-left:33.333333%}.offset-5{margin-left:41.666667%}.offset-6{margin-left:50%}.offset-7{margin-left:58.333333%}.offset-8{margin-left:66.666667%}.offset-9{margin-left:75%}.offset-10{margin-left:83.333333%}.offset-11{margin-left:91.666667%}@media (min-width:576px){.col-sm{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-sm-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-sm-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-sm-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-sm-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-sm-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-sm-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-sm-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-sm-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-sm-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-sm-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-sm-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-sm-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-sm-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-sm-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-sm-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-sm-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-sm-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-sm-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-sm-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-sm-first{-ms-flex-order:-1;order:-1}.order-sm-last{-ms-flex-order:13;order:13}.order-sm-0{-ms-flex-order:0;order:0}.order-sm-1{-ms-flex-order:1;order:1}.order-sm-2{-ms-flex-order:2;order:2}.order-sm-3{-ms-flex-order:3;order:3}.order-sm-4{-ms-flex-order:4;order:4}.order-sm-5{-ms-flex-order:5;order:5}.order-sm-6{-ms-flex-order:6;order:6}.order-sm-7{-ms-flex-order:7;order:7}.order-sm-8{-ms-flex-order:8;order:8}.order-sm-9{-ms-flex-order:9;order:9}.order-sm-10{-ms-flex-order:10;order:10}.order-sm-11{-ms-flex-order:11;order:11}.order-sm-12{-ms-flex-order:12;order:12}.offset-sm-0{margin-left:0}.offset-sm-1{margin-left:8.333333%}.offset-sm-2{margin-left:16.666667%}.offset-sm-3{margin-left:25%}.offset-sm-4{margin-left:33.333333%}.offset-sm-5{margin-left:41.666667%}.offset-sm-6{margin-left:50%}.offset-sm-7{margin-left:58.333333%}.offset-sm-8{margin-left:66.666667%}.offset-sm-9{margin-left:75%}.offset-sm-10{margin-left:83.333333%}.offset-sm-11{margin-left:91.666667%}}@media (min-width:768px){.col-md{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-md-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-md-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-md-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-md-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-md-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-md-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-md-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-md-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-md-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-md-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-md-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-md-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-md-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-md-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-md-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-md-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-md-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-md-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-md-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-md-first{-ms-flex-order:-1;order:-1}.order-md-last{-ms-flex-order:13;order:13}.order-md-0{-ms-flex-order:0;order:0}.order-md-1{-ms-flex-order:1;order:1}.order-md-2{-ms-flex-order:2;order:2}.order-md-3{-ms-flex-order:3;order:3}.order-md-4{-ms-flex-order:4;order:4}.order-md-5{-ms-flex-order:5;order:5}.order-md-6{-ms-flex-order:6;order:6}.order-md-7{-ms-flex-order:7;order:7}.order-md-8{-ms-flex-order:8;order:8}.order-md-9{-ms-flex-order:9;order:9}.order-md-10{-ms-flex-order:10;order:10}.order-md-11{-ms-flex-order:11;order:11}.order-md-12{-ms-flex-order:12;order:12}.offset-md-0{margin-left:0}.offset-md-1{margin-left:8.333333%}.offset-md-2{margin-left:16.666667%}.offset-md-3{margin-left:25%}.offset-md-4{margin-left:33.333333%}.offset-md-5{margin-left:41.666667%}.offset-md-6{margin-left:50%}.offset-md-7{margin-left:58.333333%}.offset-md-8{margin-left:66.666667%}.offset-md-9{margin-left:75%}.offset-md-10{margin-left:83.333333%}.offset-md-11{margin-left:91.666667%}}@media (min-width:992px){.col-lg{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-lg-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-lg-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-lg-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-lg-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-lg-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-lg-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-lg-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-lg-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-lg-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-lg-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-lg-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-lg-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-lg-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-lg-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-lg-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-lg-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-lg-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-lg-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-lg-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-lg-first{-ms-flex-order:-1;order:-1}.order-lg-last{-ms-flex-order:13;order:13}.order-lg-0{-ms-flex-order:0;order:0}.order-lg-1{-ms-flex-order:1;order:1}.order-lg-2{-ms-flex-order:2;order:2}.order-lg-3{-ms-flex-order:3;order:3}.order-lg-4{-ms-flex-order:4;order:4}.order-lg-5{-ms-flex-order:5;order:5}.order-lg-6{-ms-flex-order:6;order:6}.order-lg-7{-ms-flex-order:7;order:7}.order-lg-8{-ms-flex-order:8;order:8}.order-lg-9{-ms-flex-order:9;order:9}.order-lg-10{-ms-flex-order:10;order:10}.order-lg-11{-ms-flex-order:11;order:11}.order-lg-12{-ms-flex-order:12;order:12}.offset-lg-0{margin-left:0}.offset-lg-1{margin-left:8.333333%}.offset-lg-2{margin-left:16.666667%}.offset-lg-3{margin-left:25%}.offset-lg-4{margin-left:33.333333%}.offset-lg-5{margin-left:41.666667%}.offset-lg-6{margin-left:50%}.offset-lg-7{margin-left:58.333333%}.offset-lg-8{margin-left:66.666667%}.offset-lg-9{margin-left:75%}.offset-lg-10{margin-left:83.333333%}.offset-lg-11{margin-left:91.666667%}}@media (min-width:1200px){.col-xl{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;max-width:100%}.row-cols-xl-1>*{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.row-cols-xl-2>*{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.row-cols-xl-3>*{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.row-cols-xl-4>*{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.row-cols-xl-5>*{-ms-flex:0 0 20%;flex:0 0 20%;max-width:20%}.row-cols-xl-6>*{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-xl-auto{-ms-flex:0 0 auto;flex:0 0 auto;width:auto;max-width:100%}.col-xl-1{-ms-flex:0 0 8.333333%;flex:0 0 8.333333%;max-width:8.333333%}.col-xl-2{-ms-flex:0 0 16.666667%;flex:0 0 16.666667%;max-width:16.666667%}.col-xl-3{-ms-flex:0 0 25%;flex:0 0 25%;max-width:25%}.col-xl-4{-ms-flex:0 0 33.333333%;flex:0 0 33.333333%;max-width:33.333333%}.col-xl-5{-ms-flex:0 0 41.666667%;flex:0 0 41.666667%;max-width:41.666667%}.col-xl-6{-ms-flex:0 0 50%;flex:0 0 50%;max-width:50%}.col-xl-7{-ms-flex:0 0 58.333333%;flex:0 0 58.333333%;max-width:58.333333%}.col-xl-8{-ms-flex:0 0 66.666667%;flex:0 0 66.666667%;max-width:66.666667%}.col-xl-9{-ms-flex:0 0 75%;flex:0 0 75%;max-width:75%}.col-xl-10{-ms-flex:0 0 83.333333%;flex:0 0 83.333333%;max-width:83.333333%}.col-xl-11{-ms-flex:0 0 91.666667%;flex:0 0 91.666667%;max-width:91.666667%}.col-xl-12{-ms-flex:0 0 100%;flex:0 0 100%;max-width:100%}.order-xl-first{-ms-flex-order:-1;order:-1}.order-xl-last{-ms-flex-order:13;order:13}.order-xl-0{-ms-flex-order:0;order:0}.order-xl-1{-ms-flex-order:1;order:1}.order-xl-2{-ms-flex-order:2;order:2}.order-xl-3{-ms-flex-order:3;order:3}.order-xl-4{-ms-flex-order:4;order:4}.order-xl-5{-ms-flex-order:5;order:5}.order-xl-6{-ms-flex-order:6;order:6}.order-xl-7{-ms-flex-order:7;order:7}.order-xl-8{-ms-flex-order:8;order:8}.order-xl-9{-ms-flex-order:9;order:9}.order-xl-10{-ms-flex-order:10;order:10}.order-xl-11{-ms-flex-order:11;order:11}.order-xl-12{-ms-flex-order:12;order:12}.offset-xl-0{margin-left:0}.offset-xl-1{margin-left:8.333333%}.offset-xl-2{margin-left:16.666667%}.offset-xl-3{margin-left:25%}.offset-xl-4{margin-left:33.333333%}.offset-xl-5{margin-left:41.666667%}.offset-xl-6{margin-left:50%}.offset-xl-7{margin-left:58.333333%}.offset-xl-8{margin-left:66.666667%}.offset-xl-9{margin-left:75%}.offset-xl-10{margin-left:83.333333%}.offset-xl-11{margin-left:91.666667%}}.table{width:100%;margin-bottom:1rem;color:#212529}.table td,.table th{padding:.75rem;vertical-align:top;border-top:1px solid #dee2e6}.table thead th{vertical-align:bottom;border-bottom:2px solid #dee2e6}.table tbody+tbody{border-top:2px solid #dee2e6}.table-sm td,.table-sm th{padding:.3rem}.table-bordered{border:1px solid #dee2e6}.table-bordered td,.table-bordered th{border:1px solid #dee2e6}.table-bordered thead td,.table-bordered thead th{border-bottom-width:2px}.table-borderless tbody+tbody,.table-borderless td,.table-borderless th,.table-borderless thead th{border:0}.table-striped tbody tr:nth-of-type(odd){background-color:rgba(0,0,0,.05)}.table-hover tbody tr:hover{color:#212529;background-color:rgba(0,0,0,.075)}.table-primary,.table-primary>td,.table-primary>th{background-color:#b8daff}.table-primary tbody+tbody,.table-primary td,.table-primary th,.table-primary thead th{border-color:#7abaff}.table-hover .table-primary:hover{background-color:#9fcdff}.table-hover .table-primary:hover>td,.table-hover .table-primary:hover>th{background-color:#9fcdff}.table-secondary,.table-secondary>td,.table-secondary>th{background-color:#d6d8db}.table-secondary tbody+tbody,.table-secondary td,.table-secondary th,.table-secondary thead th{border-color:#b3b7bb}.table-hover .table-secondary:hover{background-color:#c8cbcf}.table-hover .table-secondary:hover>td,.table-hover .table-secondary:hover>th{background-color:#c8cbcf}.table-success,.table-success>td,.table-success>th{background-color:#c3e6cb}.table-success tbody+tbody,.table-success td,.table-success th,.table-success thead th{border-color:#8fd19e}.table-hover .table-success:hover{background-color:#b1dfbb}.table-hover .table-success:hover>td,.table-hover .table-success:hover>th{background-color:#b1dfbb}.table-info,.table-info>td,.table-info>th{background-color:#bee5eb}.table-info tbody+tbody,.table-info td,.table-info th,.table-info thead th{border-color:#86cfda}.table-hover .table-info:hover{background-color:#abdde5}.table-hover .table-info:hover>td,.table-hover .table-info:hover>th{background-color:#abdde5}.table-warning,.table-warning>td,.table-warning>th{background-color:#ffeeba}.table-warning tbody+tbody,.table-warning td,.table-warning th,.table-warning thead th{border-color:#ffdf7e}.table-hover .table-warning:hover{background-color:#ffe8a1}.table-hover .table-warning:hover>td,.table-hover .table-warning:hover>th{background-color:#ffe8a1}.table-danger,.table-danger>td,.table-danger>th{background-color:#f5c6cb}.table-danger tbody+tbody,.table-danger td,.table-danger th,.table-danger thead th{border-color:#ed969e}.table-hover .table-danger:hover{background-color:#f1b0b7}.table-hover .table-danger:hover>td,.table-hover .table-danger:hover>th{background-color:#f1b0b7}.table-light,.table-light>td,.table-light>th{background-color:#fdfdfe}.table-light tbody+tbody,.table-light td,.table-light th,.table-light thead th{border-color:#fbfcfc}.table-hover .table-light:hover{background-color:#ececf6}.table-hover .table-light:hover>td,.table-hover .table-light:hover>th{background-color:#ececf6}.table-dark,.table-dark>td,.table-dark>th{background-color:#c6c8ca}.table-dark tbody+tbody,.table-dark td,.table-dark th,.table-dark thead th{border-color:#95999c}.table-hover .table-dark:hover{background-color:#b9bbbe}.table-hover .table-dark:hover>td,.table-hover .table-dark:hover>th{background-color:#b9bbbe}.table-active,.table-active>td,.table-active>th{background-color:rgba(0,0,0,.075)}.table-hover .table-active:hover{background-color:rgba(0,0,0,.075)}.table-hover .table-active:hover>td,.table-hover .table-active:hover>th{background-color:rgba(0,0,0,.075)}.table .thead-dark th{color:#fff;background-color:#343a40;border-color:#454d55}.table .thead-light th{color:#495057;background-color:#e9ecef;border-color:#dee2e6}.table-dark{color:#fff;background-color:#343a40}.table-dark td,.table-dark th,.table-dark thead th{border-color:#454d55}.table-dark.table-bordered{border:0}.table-dark.table-striped tbody tr:nth-of-type(odd){background-color:rgba(255,255,255,.05)}.table-dark.table-hover tbody tr:hover{color:#fff;background-color:rgba(255,255,255,.075)}@media (max-width:575.98px){.table-responsive-sm{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive-sm>.table-bordered{border:0}}@media (max-width:767.98px){.table-responsive-md{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive-md>.table-bordered{border:0}}@media (max-width:991.98px){.table-responsive-lg{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive-lg>.table-bordered{border:0}}@media (max-width:1199.98px){.table-responsive-xl{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive-xl>.table-bordered{border:0}}.table-responsive{display:block;width:100%;overflow-x:auto;-webkit-overflow-scrolling:touch}.table-responsive>.table-bordered{border:0}.form-control{display:block;width:100%;height:calc(1.5em + .75rem + 2px);padding:.375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;background-color:#fff;background-clip:padding-box;border:1px solid #ced4da;border-radius:.25rem;transition:border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.form-control{transition:none}}.form-control::-ms-expand{background-color:transparent;border:0}.form-control:-moz-focusring{color:transparent;text-shadow:0 0 0 #495057}.form-control:focus{color:#495057;background-color:#fff;border-color:#80bdff;outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}.form-control::-webkit-input-placeholder{color:#6c757d;opacity:1}.form-control::-moz-placeholder{color:#6c757d;opacity:1}.form-control:-ms-input-placeholder{color:#6c757d;opacity:1}.form-control::-ms-input-placeholder{color:#6c757d;opacity:1}.form-control::placeholder{color:#6c757d;opacity:1}.form-control:disabled,.form-control[readonly]{background-color:#e9ecef;opacity:1}input[type=date].form-control,input[type=datetime-local].form-control,input[type=month].form-control,input[type=time].form-control{-webkit-appearance:none;-moz-appearance:none;appearance:none}select.form-control:focus::-ms-value{color:#495057;background-color:#fff}.form-control-file,.form-control-range{display:block;width:100%}.col-form-label{padding-top:calc(.375rem + 1px);padding-bottom:calc(.375rem + 1px);margin-bottom:0;font-size:inherit;line-height:1.5}.col-form-label-lg{padding-top:calc(.5rem + 1px);padding-bottom:calc(.5rem + 1px);font-size:1.25rem;line-height:1.5}.col-form-label-sm{padding-top:calc(.25rem + 1px);padding-bottom:calc(.25rem + 1px);font-size:.875rem;line-height:1.5}.form-control-plaintext{display:block;width:100%;padding:.375rem 0;margin-bottom:0;font-size:1rem;line-height:1.5;color:#212529;background-color:transparent;border:solid transparent;border-width:1px 0}.form-control-plaintext.form-control-lg,.form-control-plaintext.form-control-sm{padding-right:0;padding-left:0}.form-control-sm{height:calc(1.5em + .5rem + 2px);padding:.25rem .5rem;font-size:.875rem;line-height:1.5;border-radius:.2rem}.form-control-lg{height:calc(1.5em + 1rem + 2px);padding:.5rem 1rem;font-size:1.25rem;line-height:1.5;border-radius:.3rem}select.form-control[multiple],select.form-control[size]{height:auto}textarea.form-control{height:auto}.form-group{margin-bottom:1rem}.form-text{display:block;margin-top:.25rem}.form-row{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-right:-5px;margin-left:-5px}.form-row>.col,.form-row>[class*=col-]{padding-right:5px;padding-left:5px}.form-check{position:relative;display:block;padding-left:1.25rem}.form-check-input{position:absolute;margin-top:.3rem;margin-left:-1.25rem}.form-check-input:disabled~.form-check-label,.form-check-input[disabled]~.form-check-label{color:#6c757d}.form-check-label{margin-bottom:0}.form-check-inline{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;padding-left:0;margin-right:.75rem}.form-check-inline .form-check-input{position:static;margin-top:0;margin-right:.3125rem;margin-left:0}.valid-feedback{display:none;width:100%;margin-top:.25rem;font-size:80%;color:#28a745}.valid-tooltip{position:absolute;top:100%;left:0;z-index:5;display:none;max-width:100%;padding:.25rem .5rem;margin-top:.1rem;font-size:.875rem;line-height:1.5;color:#fff;background-color:rgba(40,167,69,.9);border-radius:.25rem}.form-row>.col>.valid-tooltip,.form-row>[class*=col-]>.valid-tooltip{left:5px}.is-valid~.valid-feedback,.is-valid~.valid-tooltip,.was-validated :valid~.valid-feedback,.was-validated :valid~.valid-tooltip{display:block}.form-control.is-valid,.was-validated .form-control:valid{border-color:#28a745;padding-right:calc(1.5em + .75rem);background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.form-control.is-valid:focus,.was-validated .form-control:valid:focus{border-color:#28a745;box-shadow:0 0 0 .2rem rgba(40,167,69,.25)}.was-validated textarea.form-control:valid,textarea.form-control.is-valid{padding-right:calc(1.5em + .75rem);background-position:top calc(.375em + .1875rem) right calc(.375em + .1875rem)}.custom-select.is-valid,.was-validated .custom-select:valid{border-color:#28a745;padding-right:calc(.75em + 2.3125rem);background:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") right .75rem center/8px 10px no-repeat,#fff url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%2328a745' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\") center right 1.75rem/calc(.75em + .375rem) calc(.75em + .375rem) no-repeat}.custom-select.is-valid:focus,.was-validated .custom-select:valid:focus{border-color:#28a745;box-shadow:0 0 0 .2rem rgba(40,167,69,.25)}.form-check-input.is-valid~.form-check-label,.was-validated .form-check-input:valid~.form-check-label{color:#28a745}.form-check-input.is-valid~.valid-feedback,.form-check-input.is-valid~.valid-tooltip,.was-validated .form-check-input:valid~.valid-feedback,.was-validated .form-check-input:valid~.valid-tooltip{display:block}.custom-control-input.is-valid~.custom-control-label,.was-validated .custom-control-input:valid~.custom-control-label{color:#28a745}.custom-control-input.is-valid~.custom-control-label::before,.was-validated .custom-control-input:valid~.custom-control-label::before{border-color:#28a745}.custom-control-input.is-valid:checked~.custom-control-label::before,.was-validated .custom-control-input:valid:checked~.custom-control-label::before{border-color:#34ce57;background-color:#34ce57}.custom-control-input.is-valid:focus~.custom-control-label::before,.was-validated .custom-control-input:valid:focus~.custom-control-label::before{box-shadow:0 0 0 .2rem rgba(40,167,69,.25)}.custom-control-input.is-valid:focus:not(:checked)~.custom-control-label::before,.was-validated .custom-control-input:valid:focus:not(:checked)~.custom-control-label::before{border-color:#28a745}.custom-file-input.is-valid~.custom-file-label,.was-validated .custom-file-input:valid~.custom-file-label{border-color:#28a745}.custom-file-input.is-valid:focus~.custom-file-label,.was-validated .custom-file-input:valid:focus~.custom-file-label{border-color:#28a745;box-shadow:0 0 0 .2rem rgba(40,167,69,.25)}.invalid-feedback{display:none;width:100%;margin-top:.25rem;font-size:80%;color:#dc3545}.invalid-tooltip{position:absolute;top:100%;left:0;z-index:5;display:none;max-width:100%;padding:.25rem .5rem;margin-top:.1rem;font-size:.875rem;line-height:1.5;color:#fff;background-color:rgba(220,53,69,.9);border-radius:.25rem}.form-row>.col>.invalid-tooltip,.form-row>[class*=col-]>.invalid-tooltip{left:5px}.is-invalid~.invalid-feedback,.is-invalid~.invalid-tooltip,.was-validated :invalid~.invalid-feedback,.was-validated :invalid~.invalid-tooltip{display:block}.form-control.is-invalid,.was-validated .form-control:invalid{border-color:#dc3545;padding-right:calc(1.5em + .75rem);background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\");background-repeat:no-repeat;background-position:right calc(.375em + .1875rem) center;background-size:calc(.75em + .375rem) calc(.75em + .375rem)}.form-control.is-invalid:focus,.was-validated .form-control:invalid:focus{border-color:#dc3545;box-shadow:0 0 0 .2rem rgba(220,53,69,.25)}.was-validated textarea.form-control:invalid,textarea.form-control.is-invalid{padding-right:calc(1.5em + .75rem);background-position:top calc(.375em + .1875rem) right calc(.375em + .1875rem)}.custom-select.is-invalid,.was-validated .custom-select:invalid{border-color:#dc3545;padding-right:calc(.75em + 2.3125rem);background:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") right .75rem center/8px 10px no-repeat,#fff url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\") center right 1.75rem/calc(.75em + .375rem) calc(.75em + .375rem) no-repeat}.custom-select.is-invalid:focus,.was-validated .custom-select:invalid:focus{border-color:#dc3545;box-shadow:0 0 0 .2rem rgba(220,53,69,.25)}.form-check-input.is-invalid~.form-check-label,.was-validated .form-check-input:invalid~.form-check-label{color:#dc3545}.form-check-input.is-invalid~.invalid-feedback,.form-check-input.is-invalid~.invalid-tooltip,.was-validated .form-check-input:invalid~.invalid-feedback,.was-validated .form-check-input:invalid~.invalid-tooltip{display:block}.custom-control-input.is-invalid~.custom-control-label,.was-validated .custom-control-input:invalid~.custom-control-label{color:#dc3545}.custom-control-input.is-invalid~.custom-control-label::before,.was-validated .custom-control-input:invalid~.custom-control-label::before{border-color:#dc3545}.custom-control-input.is-invalid:checked~.custom-control-label::before,.was-validated .custom-control-input:invalid:checked~.custom-control-label::before{border-color:#e4606d;background-color:#e4606d}.custom-control-input.is-invalid:focus~.custom-control-label::before,.was-validated .custom-control-input:invalid:focus~.custom-control-label::before{box-shadow:0 0 0 .2rem rgba(220,53,69,.25)}.custom-control-input.is-invalid:focus:not(:checked)~.custom-control-label::before,.was-validated .custom-control-input:invalid:focus:not(:checked)~.custom-control-label::before{border-color:#dc3545}.custom-file-input.is-invalid~.custom-file-label,.was-validated .custom-file-input:invalid~.custom-file-label{border-color:#dc3545}.custom-file-input.is-invalid:focus~.custom-file-label,.was-validated .custom-file-input:invalid:focus~.custom-file-label{border-color:#dc3545;box-shadow:0 0 0 .2rem rgba(220,53,69,.25)}.form-inline{display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;-ms-flex-align:center;align-items:center}.form-inline .form-check{width:100%}@media (min-width:576px){.form-inline label{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin-bottom:0}.form-inline .form-group{display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-flow:row wrap;flex-flow:row wrap;-ms-flex-align:center;align-items:center;margin-bottom:0}.form-inline .form-control{display:inline-block;width:auto;vertical-align:middle}.form-inline .form-control-plaintext{display:inline-block}.form-inline .custom-select,.form-inline .input-group{width:auto}.form-inline .form-check{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:auto;padding-left:0}.form-inline .form-check-input{position:relative;-ms-flex-negative:0;flex-shrink:0;margin-top:0;margin-right:.25rem;margin-left:0}.form-inline .custom-control{-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.form-inline .custom-control-label{margin-bottom:0}}.btn{display:inline-block;font-weight:400;color:#212529;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:transparent;border:1px solid transparent;padding:.375rem .75rem;font-size:1rem;line-height:1.5;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.btn{transition:none}}.btn:hover{color:#212529;text-decoration:none}.btn.focus,.btn:focus{outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}.btn.disabled,.btn:disabled{opacity:.65}.btn:not(:disabled):not(.disabled){cursor:pointer}a.btn.disabled,fieldset:disabled a.btn{pointer-events:none}.btn-primary{color:#fff;background-color:#007bff;border-color:#007bff}.btn-primary:hover{color:#fff;background-color:#0069d9;border-color:#0062cc}.btn-primary.focus,.btn-primary:focus{color:#fff;background-color:#0069d9;border-color:#0062cc;box-shadow:0 0 0 .2rem rgba(38,143,255,.5)}.btn-primary.disabled,.btn-primary:disabled{color:#fff;background-color:#007bff;border-color:#007bff}.btn-primary:not(:disabled):not(.disabled).active,.btn-primary:not(:disabled):not(.disabled):active,.show>.btn-primary.dropdown-toggle{color:#fff;background-color:#0062cc;border-color:#005cbf}.btn-primary:not(:disabled):not(.disabled).active:focus,.btn-primary:not(:disabled):not(.disabled):active:focus,.show>.btn-primary.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(38,143,255,.5)}.btn-secondary{color:#fff;background-color:#6c757d;border-color:#6c757d}.btn-secondary:hover{color:#fff;background-color:#5a6268;border-color:#545b62}.btn-secondary.focus,.btn-secondary:focus{color:#fff;background-color:#5a6268;border-color:#545b62;box-shadow:0 0 0 .2rem rgba(130,138,145,.5)}.btn-secondary.disabled,.btn-secondary:disabled{color:#fff;background-color:#6c757d;border-color:#6c757d}.btn-secondary:not(:disabled):not(.disabled).active,.btn-secondary:not(:disabled):not(.disabled):active,.show>.btn-secondary.dropdown-toggle{color:#fff;background-color:#545b62;border-color:#4e555b}.btn-secondary:not(:disabled):not(.disabled).active:focus,.btn-secondary:not(:disabled):not(.disabled):active:focus,.show>.btn-secondary.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(130,138,145,.5)}.btn-success{color:#fff;background-color:#28a745;border-color:#28a745}.btn-success:hover{color:#fff;background-color:#218838;border-color:#1e7e34}.btn-success.focus,.btn-success:focus{color:#fff;background-color:#218838;border-color:#1e7e34;box-shadow:0 0 0 .2rem rgba(72,180,97,.5)}.btn-success.disabled,.btn-success:disabled{color:#fff;background-color:#28a745;border-color:#28a745}.btn-success:not(:disabled):not(.disabled).active,.btn-success:not(:disabled):not(.disabled):active,.show>.btn-success.dropdown-toggle{color:#fff;background-color:#1e7e34;border-color:#1c7430}.btn-success:not(:disabled):not(.disabled).active:focus,.btn-success:not(:disabled):not(.disabled):active:focus,.show>.btn-success.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(72,180,97,.5)}.btn-info{color:#fff;background-color:#17a2b8;border-color:#17a2b8}.btn-info:hover{color:#fff;background-color:#138496;border-color:#117a8b}.btn-info.focus,.btn-info:focus{color:#fff;background-color:#138496;border-color:#117a8b;box-shadow:0 0 0 .2rem rgba(58,176,195,.5)}.btn-info.disabled,.btn-info:disabled{color:#fff;background-color:#17a2b8;border-color:#17a2b8}.btn-info:not(:disabled):not(.disabled).active,.btn-info:not(:disabled):not(.disabled):active,.show>.btn-info.dropdown-toggle{color:#fff;background-color:#117a8b;border-color:#10707f}.btn-info:not(:disabled):not(.disabled).active:focus,.btn-info:not(:disabled):not(.disabled):active:focus,.show>.btn-info.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(58,176,195,.5)}.btn-warning{color:#212529;background-color:#ffc107;border-color:#ffc107}.btn-warning:hover{color:#212529;background-color:#e0a800;border-color:#d39e00}.btn-warning.focus,.btn-warning:focus{color:#212529;background-color:#e0a800;border-color:#d39e00;box-shadow:0 0 0 .2rem rgba(222,170,12,.5)}.btn-warning.disabled,.btn-warning:disabled{color:#212529;background-color:#ffc107;border-color:#ffc107}.btn-warning:not(:disabled):not(.disabled).active,.btn-warning:not(:disabled):not(.disabled):active,.show>.btn-warning.dropdown-toggle{color:#212529;background-color:#d39e00;border-color:#c69500}.btn-warning:not(:disabled):not(.disabled).active:focus,.btn-warning:not(:disabled):not(.disabled):active:focus,.show>.btn-warning.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(222,170,12,.5)}.btn-danger{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-danger:hover{color:#fff;background-color:#c82333;border-color:#bd2130}.btn-danger.focus,.btn-danger:focus{color:#fff;background-color:#c82333;border-color:#bd2130;box-shadow:0 0 0 .2rem rgba(225,83,97,.5)}.btn-danger.disabled,.btn-danger:disabled{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-danger:not(:disabled):not(.disabled).active,.btn-danger:not(:disabled):not(.disabled):active,.show>.btn-danger.dropdown-toggle{color:#fff;background-color:#bd2130;border-color:#b21f2d}.btn-danger:not(:disabled):not(.disabled).active:focus,.btn-danger:not(:disabled):not(.disabled):active:focus,.show>.btn-danger.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(225,83,97,.5)}.btn-light{color:#212529;background-color:#f8f9fa;border-color:#f8f9fa}.btn-light:hover{color:#212529;background-color:#e2e6ea;border-color:#dae0e5}.btn-light.focus,.btn-light:focus{color:#212529;background-color:#e2e6ea;border-color:#dae0e5;box-shadow:0 0 0 .2rem rgba(216,217,219,.5)}.btn-light.disabled,.btn-light:disabled{color:#212529;background-color:#f8f9fa;border-color:#f8f9fa}.btn-light:not(:disabled):not(.disabled).active,.btn-light:not(:disabled):not(.disabled):active,.show>.btn-light.dropdown-toggle{color:#212529;background-color:#dae0e5;border-color:#d3d9df}.btn-light:not(:disabled):not(.disabled).active:focus,.btn-light:not(:disabled):not(.disabled):active:focus,.show>.btn-light.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(216,217,219,.5)}.btn-dark{color:#fff;background-color:#343a40;border-color:#343a40}.btn-dark:hover{color:#fff;background-color:#23272b;border-color:#1d2124}.btn-dark.focus,.btn-dark:focus{color:#fff;background-color:#23272b;border-color:#1d2124;box-shadow:0 0 0 .2rem rgba(82,88,93,.5)}.btn-dark.disabled,.btn-dark:disabled{color:#fff;background-color:#343a40;border-color:#343a40}.btn-dark:not(:disabled):not(.disabled).active,.btn-dark:not(:disabled):not(.disabled):active,.show>.btn-dark.dropdown-toggle{color:#fff;background-color:#1d2124;border-color:#171a1d}.btn-dark:not(:disabled):not(.disabled).active:focus,.btn-dark:not(:disabled):not(.disabled):active:focus,.show>.btn-dark.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(82,88,93,.5)}.btn-outline-primary{color:#007bff;border-color:#007bff}.btn-outline-primary:hover{color:#fff;background-color:#007bff;border-color:#007bff}.btn-outline-primary.focus,.btn-outline-primary:focus{box-shadow:0 0 0 .2rem rgba(0,123,255,.5)}.btn-outline-primary.disabled,.btn-outline-primary:disabled{color:#007bff;background-color:transparent}.btn-outline-primary:not(:disabled):not(.disabled).active,.btn-outline-primary:not(:disabled):not(.disabled):active,.show>.btn-outline-primary.dropdown-toggle{color:#fff;background-color:#007bff;border-color:#007bff}.btn-outline-primary:not(:disabled):not(.disabled).active:focus,.btn-outline-primary:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-primary.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(0,123,255,.5)}.btn-outline-secondary{color:#6c757d;border-color:#6c757d}.btn-outline-secondary:hover{color:#fff;background-color:#6c757d;border-color:#6c757d}.btn-outline-secondary.focus,.btn-outline-secondary:focus{box-shadow:0 0 0 .2rem rgba(108,117,125,.5)}.btn-outline-secondary.disabled,.btn-outline-secondary:disabled{color:#6c757d;background-color:transparent}.btn-outline-secondary:not(:disabled):not(.disabled).active,.btn-outline-secondary:not(:disabled):not(.disabled):active,.show>.btn-outline-secondary.dropdown-toggle{color:#fff;background-color:#6c757d;border-color:#6c757d}.btn-outline-secondary:not(:disabled):not(.disabled).active:focus,.btn-outline-secondary:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-secondary.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(108,117,125,.5)}.btn-outline-success{color:#28a745;border-color:#28a745}.btn-outline-success:hover{color:#fff;background-color:#28a745;border-color:#28a745}.btn-outline-success.focus,.btn-outline-success:focus{box-shadow:0 0 0 .2rem rgba(40,167,69,.5)}.btn-outline-success.disabled,.btn-outline-success:disabled{color:#28a745;background-color:transparent}.btn-outline-success:not(:disabled):not(.disabled).active,.btn-outline-success:not(:disabled):not(.disabled):active,.show>.btn-outline-success.dropdown-toggle{color:#fff;background-color:#28a745;border-color:#28a745}.btn-outline-success:not(:disabled):not(.disabled).active:focus,.btn-outline-success:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-success.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(40,167,69,.5)}.btn-outline-info{color:#17a2b8;border-color:#17a2b8}.btn-outline-info:hover{color:#fff;background-color:#17a2b8;border-color:#17a2b8}.btn-outline-info.focus,.btn-outline-info:focus{box-shadow:0 0 0 .2rem rgba(23,162,184,.5)}.btn-outline-info.disabled,.btn-outline-info:disabled{color:#17a2b8;background-color:transparent}.btn-outline-info:not(:disabled):not(.disabled).active,.btn-outline-info:not(:disabled):not(.disabled):active,.show>.btn-outline-info.dropdown-toggle{color:#fff;background-color:#17a2b8;border-color:#17a2b8}.btn-outline-info:not(:disabled):not(.disabled).active:focus,.btn-outline-info:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-info.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(23,162,184,.5)}.btn-outline-warning{color:#ffc107;border-color:#ffc107}.btn-outline-warning:hover{color:#212529;background-color:#ffc107;border-color:#ffc107}.btn-outline-warning.focus,.btn-outline-warning:focus{box-shadow:0 0 0 .2rem rgba(255,193,7,.5)}.btn-outline-warning.disabled,.btn-outline-warning:disabled{color:#ffc107;background-color:transparent}.btn-outline-warning:not(:disabled):not(.disabled).active,.btn-outline-warning:not(:disabled):not(.disabled):active,.show>.btn-outline-warning.dropdown-toggle{color:#212529;background-color:#ffc107;border-color:#ffc107}.btn-outline-warning:not(:disabled):not(.disabled).active:focus,.btn-outline-warning:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-warning.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(255,193,7,.5)}.btn-outline-danger{color:#dc3545;border-color:#dc3545}.btn-outline-danger:hover{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-outline-danger.focus,.btn-outline-danger:focus{box-shadow:0 0 0 .2rem rgba(220,53,69,.5)}.btn-outline-danger.disabled,.btn-outline-danger:disabled{color:#dc3545;background-color:transparent}.btn-outline-danger:not(:disabled):not(.disabled).active,.btn-outline-danger:not(:disabled):not(.disabled):active,.show>.btn-outline-danger.dropdown-toggle{color:#fff;background-color:#dc3545;border-color:#dc3545}.btn-outline-danger:not(:disabled):not(.disabled).active:focus,.btn-outline-danger:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-danger.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(220,53,69,.5)}.btn-outline-light{color:#f8f9fa;border-color:#f8f9fa}.btn-outline-light:hover{color:#212529;background-color:#f8f9fa;border-color:#f8f9fa}.btn-outline-light.focus,.btn-outline-light:focus{box-shadow:0 0 0 .2rem rgba(248,249,250,.5)}.btn-outline-light.disabled,.btn-outline-light:disabled{color:#f8f9fa;background-color:transparent}.btn-outline-light:not(:disabled):not(.disabled).active,.btn-outline-light:not(:disabled):not(.disabled):active,.show>.btn-outline-light.dropdown-toggle{color:#212529;background-color:#f8f9fa;border-color:#f8f9fa}.btn-outline-light:not(:disabled):not(.disabled).active:focus,.btn-outline-light:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-light.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(248,249,250,.5)}.btn-outline-dark{color:#343a40;border-color:#343a40}.btn-outline-dark:hover{color:#fff;background-color:#343a40;border-color:#343a40}.btn-outline-dark.focus,.btn-outline-dark:focus{box-shadow:0 0 0 .2rem rgba(52,58,64,.5)}.btn-outline-dark.disabled,.btn-outline-dark:disabled{color:#343a40;background-color:transparent}.btn-outline-dark:not(:disabled):not(.disabled).active,.btn-outline-dark:not(:disabled):not(.disabled):active,.show>.btn-outline-dark.dropdown-toggle{color:#fff;background-color:#343a40;border-color:#343a40}.btn-outline-dark:not(:disabled):not(.disabled).active:focus,.btn-outline-dark:not(:disabled):not(.disabled):active:focus,.show>.btn-outline-dark.dropdown-toggle:focus{box-shadow:0 0 0 .2rem rgba(52,58,64,.5)}.btn-link{font-weight:400;color:#007bff;text-decoration:none}.btn-link:hover{color:#0056b3;text-decoration:underline}.btn-link.focus,.btn-link:focus{text-decoration:underline}.btn-link.disabled,.btn-link:disabled{color:#6c757d;pointer-events:none}.btn-group-lg>.btn,.btn-lg{padding:.5rem 1rem;font-size:1.25rem;line-height:1.5;border-radius:.3rem}.btn-group-sm>.btn,.btn-sm{padding:.25rem .5rem;font-size:.875rem;line-height:1.5;border-radius:.2rem}.btn-block{display:block;width:100%}.btn-block+.btn-block{margin-top:.5rem}input[type=button].btn-block,input[type=reset].btn-block,input[type=submit].btn-block{width:100%}.fade{transition:opacity .15s linear}@media (prefers-reduced-motion:reduce){.fade{transition:none}}.fade:not(.show){opacity:0}.collapse:not(.show){display:none}.collapsing{position:relative;height:0;overflow:hidden;transition:height .35s ease}@media (prefers-reduced-motion:reduce){.collapsing{transition:none}}.dropdown,.dropleft,.dropright,.dropup{position:relative}.dropdown-toggle{white-space:nowrap}.dropdown-toggle::after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:\"\";border-top:.3em solid;border-right:.3em solid transparent;border-bottom:0;border-left:.3em solid transparent}.dropdown-toggle:empty::after{margin-left:0}.dropdown-menu{position:absolute;top:100%;left:0;z-index:1000;display:none;float:left;min-width:10rem;padding:.5rem 0;margin:.125rem 0 0;font-size:1rem;color:#212529;text-align:left;list-style:none;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.15);border-radius:.25rem}.dropdown-menu-left{right:auto;left:0}.dropdown-menu-right{right:0;left:auto}@media (min-width:576px){.dropdown-menu-sm-left{right:auto;left:0}.dropdown-menu-sm-right{right:0;left:auto}}@media (min-width:768px){.dropdown-menu-md-left{right:auto;left:0}.dropdown-menu-md-right{right:0;left:auto}}@media (min-width:992px){.dropdown-menu-lg-left{right:auto;left:0}.dropdown-menu-lg-right{right:0;left:auto}}@media (min-width:1200px){.dropdown-menu-xl-left{right:auto;left:0}.dropdown-menu-xl-right{right:0;left:auto}}.dropup .dropdown-menu{top:auto;bottom:100%;margin-top:0;margin-bottom:.125rem}.dropup .dropdown-toggle::after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:\"\";border-top:0;border-right:.3em solid transparent;border-bottom:.3em solid;border-left:.3em solid transparent}.dropup .dropdown-toggle:empty::after{margin-left:0}.dropright .dropdown-menu{top:0;right:auto;left:100%;margin-top:0;margin-left:.125rem}.dropright .dropdown-toggle::after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:\"\";border-top:.3em solid transparent;border-right:0;border-bottom:.3em solid transparent;border-left:.3em solid}.dropright .dropdown-toggle:empty::after{margin-left:0}.dropright .dropdown-toggle::after{vertical-align:0}.dropleft .dropdown-menu{top:0;right:100%;left:auto;margin-top:0;margin-right:.125rem}.dropleft .dropdown-toggle::after{display:inline-block;margin-left:.255em;vertical-align:.255em;content:\"\"}.dropleft .dropdown-toggle::after{display:none}.dropleft .dropdown-toggle::before{display:inline-block;margin-right:.255em;vertical-align:.255em;content:\"\";border-top:.3em solid transparent;border-right:.3em solid;border-bottom:.3em solid transparent}.dropleft .dropdown-toggle:empty::after{margin-left:0}.dropleft .dropdown-toggle::before{vertical-align:0}.dropdown-menu[x-placement^=bottom],.dropdown-menu[x-placement^=left],.dropdown-menu[x-placement^=right],.dropdown-menu[x-placement^=top]{right:auto;bottom:auto}.dropdown-divider{height:0;margin:.5rem 0;overflow:hidden;border-top:1px solid #e9ecef}.dropdown-item{display:block;width:100%;padding:.25rem 1.5rem;clear:both;font-weight:400;color:#212529;text-align:inherit;white-space:nowrap;background-color:transparent;border:0}.dropdown-item:focus,.dropdown-item:hover{color:#16181b;text-decoration:none;background-color:#e9ecef}.dropdown-item.active,.dropdown-item:active{color:#fff;text-decoration:none;background-color:#007bff}.dropdown-item.disabled,.dropdown-item:disabled{color:#adb5bd;pointer-events:none;background-color:transparent}.dropdown-menu.show{display:block}.dropdown-header{display:block;padding:.5rem 1.5rem;margin-bottom:0;font-size:.875rem;color:#6c757d;white-space:nowrap}.dropdown-item-text{display:block;padding:.25rem 1.5rem;color:#212529}.btn-group,.btn-group-vertical{position:relative;display:-ms-inline-flexbox;display:inline-flex;vertical-align:middle}.btn-group-vertical>.btn,.btn-group>.btn{position:relative;-ms-flex:1 1 auto;flex:1 1 auto}.btn-group-vertical>.btn:hover,.btn-group>.btn:hover{z-index:1}.btn-group-vertical>.btn.active,.btn-group-vertical>.btn:active,.btn-group-vertical>.btn:focus,.btn-group>.btn.active,.btn-group>.btn:active,.btn-group>.btn:focus{z-index:1}.btn-toolbar{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start}.btn-toolbar .input-group{width:auto}.btn-group>.btn-group:not(:first-child),.btn-group>.btn:not(:first-child){margin-left:-1px}.btn-group>.btn-group:not(:last-child)>.btn,.btn-group>.btn:not(:last-child):not(.dropdown-toggle){border-top-right-radius:0;border-bottom-right-radius:0}.btn-group>.btn-group:not(:first-child)>.btn,.btn-group>.btn:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.dropdown-toggle-split{padding-right:.5625rem;padding-left:.5625rem}.dropdown-toggle-split::after,.dropright .dropdown-toggle-split::after,.dropup .dropdown-toggle-split::after{margin-left:0}.dropleft .dropdown-toggle-split::before{margin-right:0}.btn-group-sm>.btn+.dropdown-toggle-split,.btn-sm+.dropdown-toggle-split{padding-right:.375rem;padding-left:.375rem}.btn-group-lg>.btn+.dropdown-toggle-split,.btn-lg+.dropdown-toggle-split{padding-right:.75rem;padding-left:.75rem}.btn-group-vertical{-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:center;justify-content:center}.btn-group-vertical>.btn,.btn-group-vertical>.btn-group{width:100%}.btn-group-vertical>.btn-group:not(:first-child),.btn-group-vertical>.btn:not(:first-child){margin-top:-1px}.btn-group-vertical>.btn-group:not(:last-child)>.btn,.btn-group-vertical>.btn:not(:last-child):not(.dropdown-toggle){border-bottom-right-radius:0;border-bottom-left-radius:0}.btn-group-vertical>.btn-group:not(:first-child)>.btn,.btn-group-vertical>.btn:not(:first-child){border-top-left-radius:0;border-top-right-radius:0}.btn-group-toggle>.btn,.btn-group-toggle>.btn-group>.btn{margin-bottom:0}.btn-group-toggle>.btn input[type=checkbox],.btn-group-toggle>.btn input[type=radio],.btn-group-toggle>.btn-group>.btn input[type=checkbox],.btn-group-toggle>.btn-group>.btn input[type=radio]{position:absolute;clip:rect(0,0,0,0);pointer-events:none}.input-group{position:relative;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:stretch;align-items:stretch;width:100%}.input-group>.custom-file,.input-group>.custom-select,.input-group>.form-control,.input-group>.form-control-plaintext{position:relative;-ms-flex:1 1 auto;flex:1 1 auto;width:1%;min-width:0;margin-bottom:0}.input-group>.custom-file+.custom-file,.input-group>.custom-file+.custom-select,.input-group>.custom-file+.form-control,.input-group>.custom-select+.custom-file,.input-group>.custom-select+.custom-select,.input-group>.custom-select+.form-control,.input-group>.form-control+.custom-file,.input-group>.form-control+.custom-select,.input-group>.form-control+.form-control,.input-group>.form-control-plaintext+.custom-file,.input-group>.form-control-plaintext+.custom-select,.input-group>.form-control-plaintext+.form-control{margin-left:-1px}.input-group>.custom-file .custom-file-input:focus~.custom-file-label,.input-group>.custom-select:focus,.input-group>.form-control:focus{z-index:3}.input-group>.custom-file .custom-file-input:focus{z-index:4}.input-group>.custom-select:not(:first-child),.input-group>.form-control:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.input-group>.custom-file{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.input-group>.custom-file:not(:first-child) .custom-file-label,.input-group>.custom-file:not(:last-child) .custom-file-label{border-top-left-radius:0;border-bottom-left-radius:0}.input-group:not(.has-validation)>.custom-file:not(:last-child) .custom-file-label::after,.input-group:not(.has-validation)>.custom-select:not(:last-child),.input-group:not(.has-validation)>.form-control:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.input-group.has-validation>.custom-file:nth-last-child(n+3) .custom-file-label::after,.input-group.has-validation>.custom-select:nth-last-child(n+3),.input-group.has-validation>.form-control:nth-last-child(n+3){border-top-right-radius:0;border-bottom-right-radius:0}.input-group-append,.input-group-prepend{display:-ms-flexbox;display:flex}.input-group-append .btn,.input-group-prepend .btn{position:relative;z-index:2}.input-group-append .btn:focus,.input-group-prepend .btn:focus{z-index:3}.input-group-append .btn+.btn,.input-group-append .btn+.input-group-text,.input-group-append .input-group-text+.btn,.input-group-append .input-group-text+.input-group-text,.input-group-prepend .btn+.btn,.input-group-prepend .btn+.input-group-text,.input-group-prepend .input-group-text+.btn,.input-group-prepend .input-group-text+.input-group-text{margin-left:-1px}.input-group-prepend{margin-right:-1px}.input-group-append{margin-left:-1px}.input-group-text{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:.375rem .75rem;margin-bottom:0;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;text-align:center;white-space:nowrap;background-color:#e9ecef;border:1px solid #ced4da;border-radius:.25rem}.input-group-text input[type=checkbox],.input-group-text input[type=radio]{margin-top:0}.input-group-lg>.custom-select,.input-group-lg>.form-control:not(textarea){height:calc(1.5em + 1rem + 2px)}.input-group-lg>.custom-select,.input-group-lg>.form-control,.input-group-lg>.input-group-append>.btn,.input-group-lg>.input-group-append>.input-group-text,.input-group-lg>.input-group-prepend>.btn,.input-group-lg>.input-group-prepend>.input-group-text{padding:.5rem 1rem;font-size:1.25rem;line-height:1.5;border-radius:.3rem}.input-group-sm>.custom-select,.input-group-sm>.form-control:not(textarea){height:calc(1.5em + .5rem + 2px)}.input-group-sm>.custom-select,.input-group-sm>.form-control,.input-group-sm>.input-group-append>.btn,.input-group-sm>.input-group-append>.input-group-text,.input-group-sm>.input-group-prepend>.btn,.input-group-sm>.input-group-prepend>.input-group-text{padding:.25rem .5rem;font-size:.875rem;line-height:1.5;border-radius:.2rem}.input-group-lg>.custom-select,.input-group-sm>.custom-select{padding-right:1.75rem}.input-group.has-validation>.input-group-append:nth-last-child(n+3)>.btn,.input-group.has-validation>.input-group-append:nth-last-child(n+3)>.input-group-text,.input-group:not(.has-validation)>.input-group-append:not(:last-child)>.btn,.input-group:not(.has-validation)>.input-group-append:not(:last-child)>.input-group-text,.input-group>.input-group-append:last-child>.btn:not(:last-child):not(.dropdown-toggle),.input-group>.input-group-append:last-child>.input-group-text:not(:last-child),.input-group>.input-group-prepend>.btn,.input-group>.input-group-prepend>.input-group-text{border-top-right-radius:0;border-bottom-right-radius:0}.input-group>.input-group-append>.btn,.input-group>.input-group-append>.input-group-text,.input-group>.input-group-prepend:first-child>.btn:not(:first-child),.input-group>.input-group-prepend:first-child>.input-group-text:not(:first-child),.input-group>.input-group-prepend:not(:first-child)>.btn,.input-group>.input-group-prepend:not(:first-child)>.input-group-text{border-top-left-radius:0;border-bottom-left-radius:0}.custom-control{position:relative;z-index:1;display:block;min-height:1.5rem;padding-left:1.5rem;-webkit-print-color-adjust:exact;color-adjust:exact}.custom-control-inline{display:-ms-inline-flexbox;display:inline-flex;margin-right:1rem}.custom-control-input{position:absolute;left:0;z-index:-1;width:1rem;height:1.25rem;opacity:0}.custom-control-input:checked~.custom-control-label::before{color:#fff;border-color:#007bff;background-color:#007bff}.custom-control-input:focus~.custom-control-label::before{box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}.custom-control-input:focus:not(:checked)~.custom-control-label::before{border-color:#80bdff}.custom-control-input:not(:disabled):active~.custom-control-label::before{color:#fff;background-color:#b3d7ff;border-color:#b3d7ff}.custom-control-input:disabled~.custom-control-label,.custom-control-input[disabled]~.custom-control-label{color:#6c757d}.custom-control-input:disabled~.custom-control-label::before,.custom-control-input[disabled]~.custom-control-label::before{background-color:#e9ecef}.custom-control-label{position:relative;margin-bottom:0;vertical-align:top}.custom-control-label::before{position:absolute;top:.25rem;left:-1.5rem;display:block;width:1rem;height:1rem;pointer-events:none;content:\"\";background-color:#fff;border:#adb5bd solid 1px}.custom-control-label::after{position:absolute;top:.25rem;left:-1.5rem;display:block;width:1rem;height:1rem;content:\"\";background:50%/50% 50% no-repeat}.custom-checkbox .custom-control-label::before{border-radius:.25rem}.custom-checkbox .custom-control-input:checked~.custom-control-label::after{background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e\")}.custom-checkbox .custom-control-input:indeterminate~.custom-control-label::before{border-color:#007bff;background-color:#007bff}.custom-checkbox .custom-control-input:indeterminate~.custom-control-label::after{background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3e%3cpath stroke='%23fff' d='M0 2h4'/%3e%3c/svg%3e\")}.custom-checkbox .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(0,123,255,.5)}.custom-checkbox .custom-control-input:disabled:indeterminate~.custom-control-label::before{background-color:rgba(0,123,255,.5)}.custom-radio .custom-control-label::before{border-radius:50%}.custom-radio .custom-control-input:checked~.custom-control-label::after{background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\")}.custom-radio .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(0,123,255,.5)}.custom-switch{padding-left:2.25rem}.custom-switch .custom-control-label::before{left:-2.25rem;width:1.75rem;pointer-events:all;border-radius:.5rem}.custom-switch .custom-control-label::after{top:calc(.25rem + 2px);left:calc(-2.25rem + 2px);width:calc(1rem - 4px);height:calc(1rem - 4px);background-color:#adb5bd;border-radius:.5rem;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-transform .15s ease-in-out;transition:transform .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:transform .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-transform .15s ease-in-out}@media (prefers-reduced-motion:reduce){.custom-switch .custom-control-label::after{transition:none}}.custom-switch .custom-control-input:checked~.custom-control-label::after{background-color:#fff;-webkit-transform:translateX(.75rem);transform:translateX(.75rem)}.custom-switch .custom-control-input:disabled:checked~.custom-control-label::before{background-color:rgba(0,123,255,.5)}.custom-select{display:inline-block;width:100%;height:calc(1.5em + .75rem + 2px);padding:.375rem 1.75rem .375rem .75rem;font-size:1rem;font-weight:400;line-height:1.5;color:#495057;vertical-align:middle;background:#fff url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") right .75rem center/8px 10px no-repeat;border:1px solid #ced4da;border-radius:.25rem;-webkit-appearance:none;-moz-appearance:none;appearance:none}.custom-select:focus{border-color:#80bdff;outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}.custom-select:focus::-ms-value{color:#495057;background-color:#fff}.custom-select[multiple],.custom-select[size]:not([size=\"1\"]){height:auto;padding-right:.75rem;background-image:none}.custom-select:disabled{color:#6c757d;background-color:#e9ecef}.custom-select::-ms-expand{display:none}.custom-select:-moz-focusring{color:transparent;text-shadow:0 0 0 #495057}.custom-select-sm{height:calc(1.5em + .5rem + 2px);padding-top:.25rem;padding-bottom:.25rem;padding-left:.5rem;font-size:.875rem}.custom-select-lg{height:calc(1.5em + 1rem + 2px);padding-top:.5rem;padding-bottom:.5rem;padding-left:1rem;font-size:1.25rem}.custom-file{position:relative;display:inline-block;width:100%;height:calc(1.5em + .75rem + 2px);margin-bottom:0}.custom-file-input{position:relative;z-index:2;width:100%;height:calc(1.5em + .75rem + 2px);margin:0;overflow:hidden;opacity:0}.custom-file-input:focus~.custom-file-label{border-color:#80bdff;box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}.custom-file-input:disabled~.custom-file-label,.custom-file-input[disabled]~.custom-file-label{background-color:#e9ecef}.custom-file-input:lang(en)~.custom-file-label::after{content:\"Browse\"}.custom-file-input~.custom-file-label[data-browse]::after{content:attr(data-browse)}.custom-file-label{position:absolute;top:0;right:0;left:0;z-index:1;height:calc(1.5em + .75rem + 2px);padding:.375rem .75rem;overflow:hidden;font-weight:400;line-height:1.5;color:#495057;background-color:#fff;border:1px solid #ced4da;border-radius:.25rem}.custom-file-label::after{position:absolute;top:0;right:0;bottom:0;z-index:3;display:block;height:calc(1.5em + .75rem);padding:.375rem .75rem;line-height:1.5;color:#495057;content:\"Browse\";background-color:#e9ecef;border-left:inherit;border-radius:0 .25rem .25rem 0}.custom-range{width:100%;height:1.4rem;padding:0;background-color:transparent;-webkit-appearance:none;-moz-appearance:none;appearance:none}.custom-range:focus{outline:0}.custom-range:focus::-webkit-slider-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .2rem rgba(0,123,255,.25)}.custom-range:focus::-moz-range-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .2rem rgba(0,123,255,.25)}.custom-range:focus::-ms-thumb{box-shadow:0 0 0 1px #fff,0 0 0 .2rem rgba(0,123,255,.25)}.custom-range::-moz-focus-outer{border:0}.custom-range::-webkit-slider-thumb{width:1rem;height:1rem;margin-top:-.25rem;background-color:#007bff;border:0;border-radius:1rem;-webkit-transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;-webkit-appearance:none;appearance:none}@media (prefers-reduced-motion:reduce){.custom-range::-webkit-slider-thumb{-webkit-transition:none;transition:none}}.custom-range::-webkit-slider-thumb:active{background-color:#b3d7ff}.custom-range::-webkit-slider-runnable-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:#dee2e6;border-color:transparent;border-radius:1rem}.custom-range::-moz-range-thumb{width:1rem;height:1rem;background-color:#007bff;border:0;border-radius:1rem;-moz-transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;-moz-appearance:none;appearance:none}@media (prefers-reduced-motion:reduce){.custom-range::-moz-range-thumb{-moz-transition:none;transition:none}}.custom-range::-moz-range-thumb:active{background-color:#b3d7ff}.custom-range::-moz-range-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:#dee2e6;border-color:transparent;border-radius:1rem}.custom-range::-ms-thumb{width:1rem;height:1rem;margin-top:0;margin-right:.2rem;margin-left:.2rem;background-color:#007bff;border:0;border-radius:1rem;-ms-transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;appearance:none}@media (prefers-reduced-motion:reduce){.custom-range::-ms-thumb{-ms-transition:none;transition:none}}.custom-range::-ms-thumb:active{background-color:#b3d7ff}.custom-range::-ms-track{width:100%;height:.5rem;color:transparent;cursor:pointer;background-color:transparent;border-color:transparent;border-width:.5rem}.custom-range::-ms-fill-lower{background-color:#dee2e6;border-radius:1rem}.custom-range::-ms-fill-upper{margin-right:15px;background-color:#dee2e6;border-radius:1rem}.custom-range:disabled::-webkit-slider-thumb{background-color:#adb5bd}.custom-range:disabled::-webkit-slider-runnable-track{cursor:default}.custom-range:disabled::-moz-range-thumb{background-color:#adb5bd}.custom-range:disabled::-moz-range-track{cursor:default}.custom-range:disabled::-ms-thumb{background-color:#adb5bd}.custom-control-label::before,.custom-file-label,.custom-select{transition:background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.custom-control-label::before,.custom-file-label,.custom-select{transition:none}}.nav{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding-left:0;margin-bottom:0;list-style:none}.nav-link{display:block;padding:.5rem 1rem}.nav-link:focus,.nav-link:hover{text-decoration:none}.nav-link.disabled{color:#6c757d;pointer-events:none;cursor:default}.nav-tabs{border-bottom:1px solid #dee2e6}.nav-tabs .nav-link{margin-bottom:-1px;border:1px solid transparent;border-top-left-radius:.25rem;border-top-right-radius:.25rem}.nav-tabs .nav-link:focus,.nav-tabs .nav-link:hover{border-color:#e9ecef #e9ecef #dee2e6}.nav-tabs .nav-link.disabled{color:#6c757d;background-color:transparent;border-color:transparent}.nav-tabs .nav-item.show .nav-link,.nav-tabs .nav-link.active{color:#495057;background-color:#fff;border-color:#dee2e6 #dee2e6 #fff}.nav-tabs .dropdown-menu{margin-top:-1px;border-top-left-radius:0;border-top-right-radius:0}.nav-pills .nav-link{border-radius:.25rem}.nav-pills .nav-link.active,.nav-pills .show>.nav-link{color:#fff;background-color:#007bff}.nav-fill .nav-item,.nav-fill>.nav-link{-ms-flex:1 1 auto;flex:1 1 auto;text-align:center}.nav-justified .nav-item,.nav-justified>.nav-link{-ms-flex-preferred-size:0;flex-basis:0;-ms-flex-positive:1;flex-grow:1;text-align:center}.tab-content>.tab-pane{display:none}.tab-content>.active{display:block}.navbar{position:relative;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;padding:.5rem 1rem}.navbar .container,.navbar .container-fluid,.navbar .container-lg,.navbar .container-md,.navbar .container-sm,.navbar .container-xl{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between}.navbar-brand{display:inline-block;padding-top:.3125rem;padding-bottom:.3125rem;margin-right:1rem;font-size:1.25rem;line-height:inherit;white-space:nowrap}.navbar-brand:focus,.navbar-brand:hover{text-decoration:none}.navbar-nav{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding-left:0;margin-bottom:0;list-style:none}.navbar-nav .nav-link{padding-right:0;padding-left:0}.navbar-nav .dropdown-menu{position:static;float:none}.navbar-text{display:inline-block;padding-top:.5rem;padding-bottom:.5rem}.navbar-collapse{-ms-flex-preferred-size:100%;flex-basis:100%;-ms-flex-positive:1;flex-grow:1;-ms-flex-align:center;align-items:center}.navbar-toggler{padding:.25rem .75rem;font-size:1.25rem;line-height:1;background-color:transparent;border:1px solid transparent;border-radius:.25rem}.navbar-toggler:focus,.navbar-toggler:hover{text-decoration:none}.navbar-toggler-icon{display:inline-block;width:1.5em;height:1.5em;vertical-align:middle;content:\"\";background:50%/100% 100% no-repeat}.navbar-nav-scroll{max-height:75vh;overflow-y:auto}@media (max-width:575.98px){.navbar-expand-sm>.container,.navbar-expand-sm>.container-fluid,.navbar-expand-sm>.container-lg,.navbar-expand-sm>.container-md,.navbar-expand-sm>.container-sm,.navbar-expand-sm>.container-xl{padding-right:0;padding-left:0}}@media (min-width:576px){.navbar-expand-sm{-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand-sm .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand-sm .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-sm .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-sm>.container,.navbar-expand-sm>.container-fluid,.navbar-expand-sm>.container-lg,.navbar-expand-sm>.container-md,.navbar-expand-sm>.container-sm,.navbar-expand-sm>.container-xl{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand-sm .navbar-nav-scroll{overflow:visible}.navbar-expand-sm .navbar-collapse{display:-ms-flexbox!important;display:flex!important;-ms-flex-preferred-size:auto;flex-basis:auto}.navbar-expand-sm .navbar-toggler{display:none}}@media (max-width:767.98px){.navbar-expand-md>.container,.navbar-expand-md>.container-fluid,.navbar-expand-md>.container-lg,.navbar-expand-md>.container-md,.navbar-expand-md>.container-sm,.navbar-expand-md>.container-xl{padding-right:0;padding-left:0}}@media (min-width:768px){.navbar-expand-md{-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand-md .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand-md .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-md .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-md>.container,.navbar-expand-md>.container-fluid,.navbar-expand-md>.container-lg,.navbar-expand-md>.container-md,.navbar-expand-md>.container-sm,.navbar-expand-md>.container-xl{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand-md .navbar-nav-scroll{overflow:visible}.navbar-expand-md .navbar-collapse{display:-ms-flexbox!important;display:flex!important;-ms-flex-preferred-size:auto;flex-basis:auto}.navbar-expand-md .navbar-toggler{display:none}}@media (max-width:991.98px){.navbar-expand-lg>.container,.navbar-expand-lg>.container-fluid,.navbar-expand-lg>.container-lg,.navbar-expand-lg>.container-md,.navbar-expand-lg>.container-sm,.navbar-expand-lg>.container-xl{padding-right:0;padding-left:0}}@media (min-width:992px){.navbar-expand-lg{-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand-lg .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand-lg .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-lg .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-lg>.container,.navbar-expand-lg>.container-fluid,.navbar-expand-lg>.container-lg,.navbar-expand-lg>.container-md,.navbar-expand-lg>.container-sm,.navbar-expand-lg>.container-xl{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand-lg .navbar-nav-scroll{overflow:visible}.navbar-expand-lg .navbar-collapse{display:-ms-flexbox!important;display:flex!important;-ms-flex-preferred-size:auto;flex-basis:auto}.navbar-expand-lg .navbar-toggler{display:none}}@media (max-width:1199.98px){.navbar-expand-xl>.container,.navbar-expand-xl>.container-fluid,.navbar-expand-xl>.container-lg,.navbar-expand-xl>.container-md,.navbar-expand-xl>.container-sm,.navbar-expand-xl>.container-xl{padding-right:0;padding-left:0}}@media (min-width:1200px){.navbar-expand-xl{-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand-xl .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand-xl .navbar-nav .dropdown-menu{position:absolute}.navbar-expand-xl .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand-xl>.container,.navbar-expand-xl>.container-fluid,.navbar-expand-xl>.container-lg,.navbar-expand-xl>.container-md,.navbar-expand-xl>.container-sm,.navbar-expand-xl>.container-xl{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand-xl .navbar-nav-scroll{overflow:visible}.navbar-expand-xl .navbar-collapse{display:-ms-flexbox!important;display:flex!important;-ms-flex-preferred-size:auto;flex-basis:auto}.navbar-expand-xl .navbar-toggler{display:none}}.navbar-expand{-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:start;justify-content:flex-start}.navbar-expand>.container,.navbar-expand>.container-fluid,.navbar-expand>.container-lg,.navbar-expand>.container-md,.navbar-expand>.container-sm,.navbar-expand>.container-xl{padding-right:0;padding-left:0}.navbar-expand .navbar-nav{-ms-flex-direction:row;flex-direction:row}.navbar-expand .navbar-nav .dropdown-menu{position:absolute}.navbar-expand .navbar-nav .nav-link{padding-right:.5rem;padding-left:.5rem}.navbar-expand>.container,.navbar-expand>.container-fluid,.navbar-expand>.container-lg,.navbar-expand>.container-md,.navbar-expand>.container-sm,.navbar-expand>.container-xl{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.navbar-expand .navbar-nav-scroll{overflow:visible}.navbar-expand .navbar-collapse{display:-ms-flexbox!important;display:flex!important;-ms-flex-preferred-size:auto;flex-basis:auto}.navbar-expand .navbar-toggler{display:none}.navbar-light .navbar-brand{color:rgba(0,0,0,.9)}.navbar-light .navbar-brand:focus,.navbar-light .navbar-brand:hover{color:rgba(0,0,0,.9)}.navbar-light .navbar-nav .nav-link{color:rgba(0,0,0,.5)}.navbar-light .navbar-nav .nav-link:focus,.navbar-light .navbar-nav .nav-link:hover{color:rgba(0,0,0,.7)}.navbar-light .navbar-nav .nav-link.disabled{color:rgba(0,0,0,.3)}.navbar-light .navbar-nav .active>.nav-link,.navbar-light .navbar-nav .nav-link.active,.navbar-light .navbar-nav .nav-link.show,.navbar-light .navbar-nav .show>.nav-link{color:rgba(0,0,0,.9)}.navbar-light .navbar-toggler{color:rgba(0,0,0,.5);border-color:rgba(0,0,0,.1)}.navbar-light .navbar-toggler-icon{background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")}.navbar-light .navbar-text{color:rgba(0,0,0,.5)}.navbar-light .navbar-text a{color:rgba(0,0,0,.9)}.navbar-light .navbar-text a:focus,.navbar-light .navbar-text a:hover{color:rgba(0,0,0,.9)}.navbar-dark .navbar-brand{color:#fff}.navbar-dark .navbar-brand:focus,.navbar-dark .navbar-brand:hover{color:#fff}.navbar-dark .navbar-nav .nav-link{color:rgba(255,255,255,.5)}.navbar-dark .navbar-nav .nav-link:focus,.navbar-dark .navbar-nav .nav-link:hover{color:rgba(255,255,255,.75)}.navbar-dark .navbar-nav .nav-link.disabled{color:rgba(255,255,255,.25)}.navbar-dark .navbar-nav .active>.nav-link,.navbar-dark .navbar-nav .nav-link.active,.navbar-dark .navbar-nav .nav-link.show,.navbar-dark .navbar-nav .show>.nav-link{color:#fff}.navbar-dark .navbar-toggler{color:rgba(255,255,255,.5);border-color:rgba(255,255,255,.1)}.navbar-dark .navbar-toggler-icon{background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")}.navbar-dark .navbar-text{color:rgba(255,255,255,.5)}.navbar-dark .navbar-text a{color:#fff}.navbar-dark .navbar-text a:focus,.navbar-dark .navbar-text a:hover{color:#fff}.card{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;min-width:0;word-wrap:break-word;background-color:#fff;background-clip:border-box;border:1px solid rgba(0,0,0,.125);border-radius:.25rem}.card>hr{margin-right:0;margin-left:0}.card>.list-group{border-top:inherit;border-bottom:inherit}.card>.list-group:first-child{border-top-width:0;border-top-left-radius:calc(.25rem - 1px);border-top-right-radius:calc(.25rem - 1px)}.card>.list-group:last-child{border-bottom-width:0;border-bottom-right-radius:calc(.25rem - 1px);border-bottom-left-radius:calc(.25rem - 1px)}.card>.card-header+.list-group,.card>.list-group+.card-footer{border-top:0}.card-body{-ms-flex:1 1 auto;flex:1 1 auto;min-height:1px;padding:1.25rem}.card-title{margin-bottom:.75rem}.card-subtitle{margin-top:-.375rem;margin-bottom:0}.card-text:last-child{margin-bottom:0}.card-link:hover{text-decoration:none}.card-link+.card-link{margin-left:1.25rem}.card-header{padding:.75rem 1.25rem;margin-bottom:0;background-color:rgba(0,0,0,.03);border-bottom:1px solid rgba(0,0,0,.125)}.card-header:first-child{border-radius:calc(.25rem - 1px) calc(.25rem - 1px) 0 0}.card-footer{padding:.75rem 1.25rem;background-color:rgba(0,0,0,.03);border-top:1px solid rgba(0,0,0,.125)}.card-footer:last-child{border-radius:0 0 calc(.25rem - 1px) calc(.25rem - 1px)}.card-header-tabs{margin-right:-.625rem;margin-bottom:-.75rem;margin-left:-.625rem;border-bottom:0}.card-header-pills{margin-right:-.625rem;margin-left:-.625rem}.card-img-overlay{position:absolute;top:0;right:0;bottom:0;left:0;padding:1.25rem;border-radius:calc(.25rem - 1px)}.card-img,.card-img-bottom,.card-img-top{-ms-flex-negative:0;flex-shrink:0;width:100%}.card-img,.card-img-top{border-top-left-radius:calc(.25rem - 1px);border-top-right-radius:calc(.25rem - 1px)}.card-img,.card-img-bottom{border-bottom-right-radius:calc(.25rem - 1px);border-bottom-left-radius:calc(.25rem - 1px)}.card-deck .card{margin-bottom:15px}@media (min-width:576px){.card-deck{display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;margin-right:-15px;margin-left:-15px}.card-deck .card{-ms-flex:1 0 0%;flex:1 0 0%;margin-right:15px;margin-bottom:0;margin-left:15px}}.card-group>.card{margin-bottom:15px}@media (min-width:576px){.card-group{display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap}.card-group>.card{-ms-flex:1 0 0%;flex:1 0 0%;margin-bottom:0}.card-group>.card+.card{margin-left:0;border-left:0}.card-group>.card:not(:last-child){border-top-right-radius:0;border-bottom-right-radius:0}.card-group>.card:not(:last-child) .card-header,.card-group>.card:not(:last-child) .card-img-top{border-top-right-radius:0}.card-group>.card:not(:last-child) .card-footer,.card-group>.card:not(:last-child) .card-img-bottom{border-bottom-right-radius:0}.card-group>.card:not(:first-child){border-top-left-radius:0;border-bottom-left-radius:0}.card-group>.card:not(:first-child) .card-header,.card-group>.card:not(:first-child) .card-img-top{border-top-left-radius:0}.card-group>.card:not(:first-child) .card-footer,.card-group>.card:not(:first-child) .card-img-bottom{border-bottom-left-radius:0}}.card-columns .card{margin-bottom:.75rem}@media (min-width:576px){.card-columns{-webkit-column-count:3;-moz-column-count:3;column-count:3;-webkit-column-gap:1.25rem;-moz-column-gap:1.25rem;column-gap:1.25rem;orphans:1;widows:1}.card-columns .card{display:inline-block;width:100%}}.accordion{overflow-anchor:none}.accordion>.card{overflow:hidden}.accordion>.card:not(:last-of-type){border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.accordion>.card:not(:first-of-type){border-top-left-radius:0;border-top-right-radius:0}.accordion>.card>.card-header{border-radius:0;margin-bottom:-1px}.breadcrumb{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:.75rem 1rem;margin-bottom:1rem;list-style:none;background-color:#e9ecef;border-radius:.25rem}.breadcrumb-item+.breadcrumb-item{padding-left:.5rem}.breadcrumb-item+.breadcrumb-item::before{float:left;padding-right:.5rem;color:#6c757d;content:\"/\"}.breadcrumb-item+.breadcrumb-item:hover::before{text-decoration:underline}.breadcrumb-item+.breadcrumb-item:hover::before{text-decoration:none}.breadcrumb-item.active{color:#6c757d}.pagination{display:-ms-flexbox;display:flex;padding-left:0;list-style:none;border-radius:.25rem}.page-link{position:relative;display:block;padding:.5rem .75rem;margin-left:-1px;line-height:1.25;color:#007bff;background-color:#fff;border:1px solid #dee2e6}.page-link:hover{z-index:2;color:#0056b3;text-decoration:none;background-color:#e9ecef;border-color:#dee2e6}.page-link:focus{z-index:3;outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.25)}.page-item:first-child .page-link{margin-left:0;border-top-left-radius:.25rem;border-bottom-left-radius:.25rem}.page-item:last-child .page-link{border-top-right-radius:.25rem;border-bottom-right-radius:.25rem}.page-item.active .page-link{z-index:3;color:#fff;background-color:#007bff;border-color:#007bff}.page-item.disabled .page-link{color:#6c757d;pointer-events:none;cursor:auto;background-color:#fff;border-color:#dee2e6}.pagination-lg .page-link{padding:.75rem 1.5rem;font-size:1.25rem;line-height:1.5}.pagination-lg .page-item:first-child .page-link{border-top-left-radius:.3rem;border-bottom-left-radius:.3rem}.pagination-lg .page-item:last-child .page-link{border-top-right-radius:.3rem;border-bottom-right-radius:.3rem}.pagination-sm .page-link{padding:.25rem .5rem;font-size:.875rem;line-height:1.5}.pagination-sm .page-item:first-child .page-link{border-top-left-radius:.2rem;border-bottom-left-radius:.2rem}.pagination-sm .page-item:last-child .page-link{border-top-right-radius:.2rem;border-bottom-right-radius:.2rem}.badge{display:inline-block;padding:.25em .4em;font-size:75%;font-weight:700;line-height:1;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}@media (prefers-reduced-motion:reduce){.badge{transition:none}}a.badge:focus,a.badge:hover{text-decoration:none}.badge:empty{display:none}.btn .badge{position:relative;top:-1px}.badge-pill{padding-right:.6em;padding-left:.6em;border-radius:10rem}.badge-primary{color:#fff;background-color:#007bff}a.badge-primary:focus,a.badge-primary:hover{color:#fff;background-color:#0062cc}a.badge-primary.focus,a.badge-primary:focus{outline:0;box-shadow:0 0 0 .2rem rgba(0,123,255,.5)}.badge-secondary{color:#fff;background-color:#6c757d}a.badge-secondary:focus,a.badge-secondary:hover{color:#fff;background-color:#545b62}a.badge-secondary.focus,a.badge-secondary:focus{outline:0;box-shadow:0 0 0 .2rem rgba(108,117,125,.5)}.badge-success{color:#fff;background-color:#28a745}a.badge-success:focus,a.badge-success:hover{color:#fff;background-color:#1e7e34}a.badge-success.focus,a.badge-success:focus{outline:0;box-shadow:0 0 0 .2rem rgba(40,167,69,.5)}.badge-info{color:#fff;background-color:#17a2b8}a.badge-info:focus,a.badge-info:hover{color:#fff;background-color:#117a8b}a.badge-info.focus,a.badge-info:focus{outline:0;box-shadow:0 0 0 .2rem rgba(23,162,184,.5)}.badge-warning{color:#212529;background-color:#ffc107}a.badge-warning:focus,a.badge-warning:hover{color:#212529;background-color:#d39e00}a.badge-warning.focus,a.badge-warning:focus{outline:0;box-shadow:0 0 0 .2rem rgba(255,193,7,.5)}.badge-danger{color:#fff;background-color:#dc3545}a.badge-danger:focus,a.badge-danger:hover{color:#fff;background-color:#bd2130}a.badge-danger.focus,a.badge-danger:focus{outline:0;box-shadow:0 0 0 .2rem rgba(220,53,69,.5)}.badge-light{color:#212529;background-color:#f8f9fa}a.badge-light:focus,a.badge-light:hover{color:#212529;background-color:#dae0e5}a.badge-light.focus,a.badge-light:focus{outline:0;box-shadow:0 0 0 .2rem rgba(248,249,250,.5)}.badge-dark{color:#fff;background-color:#343a40}a.badge-dark:focus,a.badge-dark:hover{color:#fff;background-color:#1d2124}a.badge-dark.focus,a.badge-dark:focus{outline:0;box-shadow:0 0 0 .2rem rgba(52,58,64,.5)}.jumbotron{padding:2rem 1rem;margin-bottom:2rem;background-color:#e9ecef;border-radius:.3rem}@media (min-width:576px){.jumbotron{padding:4rem 2rem}}.jumbotron-fluid{padding-right:0;padding-left:0;border-radius:0}.alert{position:relative;padding:.75rem 1.25rem;margin-bottom:1rem;border:1px solid transparent;border-radius:.25rem}.alert-heading{color:inherit}.alert-link{font-weight:700}.alert-dismissible{padding-right:4rem}.alert-dismissible .close{position:absolute;top:0;right:0;z-index:2;padding:.75rem 1.25rem;color:inherit}.alert-primary{color:#004085;background-color:#cce5ff;border-color:#b8daff}.alert-primary hr{border-top-color:#9fcdff}.alert-primary .alert-link{color:#002752}.alert-secondary{color:#383d41;background-color:#e2e3e5;border-color:#d6d8db}.alert-secondary hr{border-top-color:#c8cbcf}.alert-secondary .alert-link{color:#202326}.alert-success{color:#155724;background-color:#d4edda;border-color:#c3e6cb}.alert-success hr{border-top-color:#b1dfbb}.alert-success .alert-link{color:#0b2e13}.alert-info{color:#0c5460;background-color:#d1ecf1;border-color:#bee5eb}.alert-info hr{border-top-color:#abdde5}.alert-info .alert-link{color:#062c33}.alert-warning{color:#856404;background-color:#fff3cd;border-color:#ffeeba}.alert-warning hr{border-top-color:#ffe8a1}.alert-warning .alert-link{color:#533f03}.alert-danger{color:#721c24;background-color:#f8d7da;border-color:#f5c6cb}.alert-danger hr{border-top-color:#f1b0b7}.alert-danger .alert-link{color:#491217}.alert-light{color:#818182;background-color:#fefefe;border-color:#fdfdfe}.alert-light hr{border-top-color:#ececf6}.alert-light .alert-link{color:#686868}.alert-dark{color:#1b1e21;background-color:#d6d8d9;border-color:#c6c8ca}.alert-dark hr{border-top-color:#b9bbbe}.alert-dark .alert-link{color:#040505}@-webkit-keyframes progress-bar-stripes{from{background-position:1rem 0}to{background-position:0 0}}@keyframes progress-bar-stripes{from{background-position:1rem 0}to{background-position:0 0}}.progress{display:-ms-flexbox;display:flex;height:1rem;overflow:hidden;line-height:0;font-size:.75rem;background-color:#e9ecef;border-radius:.25rem}.progress-bar{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;overflow:hidden;color:#fff;text-align:center;white-space:nowrap;background-color:#007bff;transition:width .6s ease}@media (prefers-reduced-motion:reduce){.progress-bar{transition:none}}.progress-bar-striped{background-image:linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-size:1rem 1rem}.progress-bar-animated{-webkit-animation:1s linear infinite progress-bar-stripes;animation:1s linear infinite progress-bar-stripes}@media (prefers-reduced-motion:reduce){.progress-bar-animated{-webkit-animation:none;animation:none}}.media{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start}.media-body{-ms-flex:1;flex:1}.list-group{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding-left:0;margin-bottom:0;border-radius:.25rem}.list-group-item-action{width:100%;color:#495057;text-align:inherit}.list-group-item-action:focus,.list-group-item-action:hover{z-index:1;color:#495057;text-decoration:none;background-color:#f8f9fa}.list-group-item-action:active{color:#212529;background-color:#e9ecef}.list-group-item{position:relative;display:block;padding:.75rem 1.25rem;background-color:#fff;border:1px solid rgba(0,0,0,.125)}.list-group-item:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.list-group-item:last-child{border-bottom-right-radius:inherit;border-bottom-left-radius:inherit}.list-group-item.disabled,.list-group-item:disabled{color:#6c757d;pointer-events:none;background-color:#fff}.list-group-item.active{z-index:2;color:#fff;background-color:#007bff;border-color:#007bff}.list-group-item+.list-group-item{border-top-width:0}.list-group-item+.list-group-item.active{margin-top:-1px;border-top-width:1px}.list-group-horizontal{-ms-flex-direction:row;flex-direction:row}.list-group-horizontal>.list-group-item:first-child{border-bottom-left-radius:.25rem;border-top-right-radius:0}.list-group-horizontal>.list-group-item:last-child{border-top-right-radius:.25rem;border-bottom-left-radius:0}.list-group-horizontal>.list-group-item.active{margin-top:0}.list-group-horizontal>.list-group-item+.list-group-item{border-top-width:1px;border-left-width:0}.list-group-horizontal>.list-group-item+.list-group-item.active{margin-left:-1px;border-left-width:1px}@media (min-width:576px){.list-group-horizontal-sm{-ms-flex-direction:row;flex-direction:row}.list-group-horizontal-sm>.list-group-item:first-child{border-bottom-left-radius:.25rem;border-top-right-radius:0}.list-group-horizontal-sm>.list-group-item:last-child{border-top-right-radius:.25rem;border-bottom-left-radius:0}.list-group-horizontal-sm>.list-group-item.active{margin-top:0}.list-group-horizontal-sm>.list-group-item+.list-group-item{border-top-width:1px;border-left-width:0}.list-group-horizontal-sm>.list-group-item+.list-group-item.active{margin-left:-1px;border-left-width:1px}}@media (min-width:768px){.list-group-horizontal-md{-ms-flex-direction:row;flex-direction:row}.list-group-horizontal-md>.list-group-item:first-child{border-bottom-left-radius:.25rem;border-top-right-radius:0}.list-group-horizontal-md>.list-group-item:last-child{border-top-right-radius:.25rem;border-bottom-left-radius:0}.list-group-horizontal-md>.list-group-item.active{margin-top:0}.list-group-horizontal-md>.list-group-item+.list-group-item{border-top-width:1px;border-left-width:0}.list-group-horizontal-md>.list-group-item+.list-group-item.active{margin-left:-1px;border-left-width:1px}}@media (min-width:992px){.list-group-horizontal-lg{-ms-flex-direction:row;flex-direction:row}.list-group-horizontal-lg>.list-group-item:first-child{border-bottom-left-radius:.25rem;border-top-right-radius:0}.list-group-horizontal-lg>.list-group-item:last-child{border-top-right-radius:.25rem;border-bottom-left-radius:0}.list-group-horizontal-lg>.list-group-item.active{margin-top:0}.list-group-horizontal-lg>.list-group-item+.list-group-item{border-top-width:1px;border-left-width:0}.list-group-horizontal-lg>.list-group-item+.list-group-item.active{margin-left:-1px;border-left-width:1px}}@media (min-width:1200px){.list-group-horizontal-xl{-ms-flex-direction:row;flex-direction:row}.list-group-horizontal-xl>.list-group-item:first-child{border-bottom-left-radius:.25rem;border-top-right-radius:0}.list-group-horizontal-xl>.list-group-item:last-child{border-top-right-radius:.25rem;border-bottom-left-radius:0}.list-group-horizontal-xl>.list-group-item.active{margin-top:0}.list-group-horizontal-xl>.list-group-item+.list-group-item{border-top-width:1px;border-left-width:0}.list-group-horizontal-xl>.list-group-item+.list-group-item.active{margin-left:-1px;border-left-width:1px}}.list-group-flush{border-radius:0}.list-group-flush>.list-group-item{border-width:0 0 1px}.list-group-flush>.list-group-item:last-child{border-bottom-width:0}.list-group-item-primary{color:#004085;background-color:#b8daff}.list-group-item-primary.list-group-item-action:focus,.list-group-item-primary.list-group-item-action:hover{color:#004085;background-color:#9fcdff}.list-group-item-primary.list-group-item-action.active{color:#fff;background-color:#004085;border-color:#004085}.list-group-item-secondary{color:#383d41;background-color:#d6d8db}.list-group-item-secondary.list-group-item-action:focus,.list-group-item-secondary.list-group-item-action:hover{color:#383d41;background-color:#c8cbcf}.list-group-item-secondary.list-group-item-action.active{color:#fff;background-color:#383d41;border-color:#383d41}.list-group-item-success{color:#155724;background-color:#c3e6cb}.list-group-item-success.list-group-item-action:focus,.list-group-item-success.list-group-item-action:hover{color:#155724;background-color:#b1dfbb}.list-group-item-success.list-group-item-action.active{color:#fff;background-color:#155724;border-color:#155724}.list-group-item-info{color:#0c5460;background-color:#bee5eb}.list-group-item-info.list-group-item-action:focus,.list-group-item-info.list-group-item-action:hover{color:#0c5460;background-color:#abdde5}.list-group-item-info.list-group-item-action.active{color:#fff;background-color:#0c5460;border-color:#0c5460}.list-group-item-warning{color:#856404;background-color:#ffeeba}.list-group-item-warning.list-group-item-action:focus,.list-group-item-warning.list-group-item-action:hover{color:#856404;background-color:#ffe8a1}.list-group-item-warning.list-group-item-action.active{color:#fff;background-color:#856404;border-color:#856404}.list-group-item-danger{color:#721c24;background-color:#f5c6cb}.list-group-item-danger.list-group-item-action:focus,.list-group-item-danger.list-group-item-action:hover{color:#721c24;background-color:#f1b0b7}.list-group-item-danger.list-group-item-action.active{color:#fff;background-color:#721c24;border-color:#721c24}.list-group-item-light{color:#818182;background-color:#fdfdfe}.list-group-item-light.list-group-item-action:focus,.list-group-item-light.list-group-item-action:hover{color:#818182;background-color:#ececf6}.list-group-item-light.list-group-item-action.active{color:#fff;background-color:#818182;border-color:#818182}.list-group-item-dark{color:#1b1e21;background-color:#c6c8ca}.list-group-item-dark.list-group-item-action:focus,.list-group-item-dark.list-group-item-action:hover{color:#1b1e21;background-color:#b9bbbe}.list-group-item-dark.list-group-item-action.active{color:#fff;background-color:#1b1e21;border-color:#1b1e21}.close{float:right;font-size:1.5rem;font-weight:700;line-height:1;color:#000;text-shadow:0 1px 0 #fff;opacity:.5}.close:hover{color:#000;text-decoration:none}.close:not(:disabled):not(.disabled):focus,.close:not(:disabled):not(.disabled):hover{opacity:.75}button.close{padding:0;background-color:transparent;border:0}a.close.disabled{pointer-events:none}.toast{-ms-flex-preferred-size:350px;flex-basis:350px;max-width:350px;font-size:.875rem;background-color:rgba(255,255,255,.85);background-clip:padding-box;border:1px solid rgba(0,0,0,.1);box-shadow:0 .25rem .75rem rgba(0,0,0,.1);opacity:0;border-radius:.25rem}.toast:not(:last-child){margin-bottom:.75rem}.toast.showing{opacity:1}.toast.show{display:block;opacity:1}.toast.hide{display:none}.toast-header{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:.25rem .75rem;color:#6c757d;background-color:rgba(255,255,255,.85);background-clip:padding-box;border-bottom:1px solid rgba(0,0,0,.05);border-top-left-radius:calc(.25rem - 1px);border-top-right-radius:calc(.25rem - 1px)}.toast-body{padding:.75rem}.modal-open{overflow:hidden}.modal-open .modal{overflow-x:hidden;overflow-y:auto}.modal{position:fixed;top:0;left:0;z-index:1050;display:none;width:100%;height:100%;overflow:hidden;outline:0}.modal-dialog{position:relative;width:auto;margin:.5rem;pointer-events:none}.modal.fade .modal-dialog{transition:-webkit-transform .3s ease-out;transition:transform .3s ease-out;transition:transform .3s ease-out,-webkit-transform .3s ease-out;-webkit-transform:translate(0,-50px);transform:translate(0,-50px)}@media (prefers-reduced-motion:reduce){.modal.fade .modal-dialog{transition:none}}.modal.show .modal-dialog{-webkit-transform:none;transform:none}.modal.modal-static .modal-dialog{-webkit-transform:scale(1.02);transform:scale(1.02)}.modal-dialog-scrollable{display:-ms-flexbox;display:flex;max-height:calc(100% - 1rem)}.modal-dialog-scrollable .modal-content{max-height:calc(100vh - 1rem);overflow:hidden}.modal-dialog-scrollable .modal-footer,.modal-dialog-scrollable .modal-header{-ms-flex-negative:0;flex-shrink:0}.modal-dialog-scrollable .modal-body{overflow-y:auto}.modal-dialog-centered{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-height:calc(100% - 1rem)}.modal-dialog-centered::before{display:block;height:calc(100vh - 1rem);height:-webkit-min-content;height:-moz-min-content;height:min-content;content:\"\"}.modal-dialog-centered.modal-dialog-scrollable{-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;height:100%}.modal-dialog-centered.modal-dialog-scrollable .modal-content{max-height:none}.modal-dialog-centered.modal-dialog-scrollable::before{content:none}.modal-content{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;pointer-events:auto;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.2);border-radius:.3rem;outline:0}.modal-backdrop{position:fixed;top:0;left:0;z-index:1040;width:100vw;height:100vh;background-color:#000}.modal-backdrop.fade{opacity:0}.modal-backdrop.show{opacity:.5}.modal-header{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:justify;justify-content:space-between;padding:1rem 1rem;border-bottom:1px solid #dee2e6;border-top-left-radius:calc(.3rem - 1px);border-top-right-radius:calc(.3rem - 1px)}.modal-header .close{padding:1rem 1rem;margin:-1rem -1rem -1rem auto}.modal-title{margin-bottom:0;line-height:1.5}.modal-body{position:relative;-ms-flex:1 1 auto;flex:1 1 auto;padding:1rem}.modal-footer{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center;-ms-flex-pack:end;justify-content:flex-end;padding:.75rem;border-top:1px solid #dee2e6;border-bottom-right-radius:calc(.3rem - 1px);border-bottom-left-radius:calc(.3rem - 1px)}.modal-footer>*{margin:.25rem}.modal-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}@media (min-width:576px){.modal-dialog{max-width:500px;margin:1.75rem auto}.modal-dialog-scrollable{max-height:calc(100% - 3.5rem)}.modal-dialog-scrollable .modal-content{max-height:calc(100vh - 3.5rem)}.modal-dialog-centered{min-height:calc(100% - 3.5rem)}.modal-dialog-centered::before{height:calc(100vh - 3.5rem);height:-webkit-min-content;height:-moz-min-content;height:min-content}.modal-sm{max-width:300px}}@media (min-width:992px){.modal-lg,.modal-xl{max-width:800px}}@media (min-width:1200px){.modal-xl{max-width:1140px}}.tooltip{position:absolute;z-index:1070;display:block;margin:0;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",\"Liberation Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";font-style:normal;font-weight:400;line-height:1.5;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;white-space:normal;line-break:auto;font-size:.875rem;word-wrap:break-word;opacity:0}.tooltip.show{opacity:.9}.tooltip .arrow{position:absolute;display:block;width:.8rem;height:.4rem}.tooltip .arrow::before{position:absolute;content:\"\";border-color:transparent;border-style:solid}.bs-tooltip-auto[x-placement^=top],.bs-tooltip-top{padding:.4rem 0}.bs-tooltip-auto[x-placement^=top] .arrow,.bs-tooltip-top .arrow{bottom:0}.bs-tooltip-auto[x-placement^=top] .arrow::before,.bs-tooltip-top .arrow::before{top:0;border-width:.4rem .4rem 0;border-top-color:#000}.bs-tooltip-auto[x-placement^=right],.bs-tooltip-right{padding:0 .4rem}.bs-tooltip-auto[x-placement^=right] .arrow,.bs-tooltip-right .arrow{left:0;width:.4rem;height:.8rem}.bs-tooltip-auto[x-placement^=right] .arrow::before,.bs-tooltip-right .arrow::before{right:0;border-width:.4rem .4rem .4rem 0;border-right-color:#000}.bs-tooltip-auto[x-placement^=bottom],.bs-tooltip-bottom{padding:.4rem 0}.bs-tooltip-auto[x-placement^=bottom] .arrow,.bs-tooltip-bottom .arrow{top:0}.bs-tooltip-auto[x-placement^=bottom] .arrow::before,.bs-tooltip-bottom .arrow::before{bottom:0;border-width:0 .4rem .4rem;border-bottom-color:#000}.bs-tooltip-auto[x-placement^=left],.bs-tooltip-left{padding:0 .4rem}.bs-tooltip-auto[x-placement^=left] .arrow,.bs-tooltip-left .arrow{right:0;width:.4rem;height:.8rem}.bs-tooltip-auto[x-placement^=left] .arrow::before,.bs-tooltip-left .arrow::before{left:0;border-width:.4rem 0 .4rem .4rem;border-left-color:#000}.tooltip-inner{max-width:200px;padding:.25rem .5rem;color:#fff;text-align:center;background-color:#000;border-radius:.25rem}.popover{position:absolute;top:0;left:0;z-index:1060;display:block;max-width:276px;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",\"Liberation Sans\",sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\",\"Noto Color Emoji\";font-style:normal;font-weight:400;line-height:1.5;text-align:left;text-align:start;text-decoration:none;text-shadow:none;text-transform:none;letter-spacing:normal;word-break:normal;word-spacing:normal;white-space:normal;line-break:auto;font-size:.875rem;word-wrap:break-word;background-color:#fff;background-clip:padding-box;border:1px solid rgba(0,0,0,.2);border-radius:.3rem}.popover .arrow{position:absolute;display:block;width:1rem;height:.5rem;margin:0 .3rem}.popover .arrow::after,.popover .arrow::before{position:absolute;display:block;content:\"\";border-color:transparent;border-style:solid}.bs-popover-auto[x-placement^=top],.bs-popover-top{margin-bottom:.5rem}.bs-popover-auto[x-placement^=top]>.arrow,.bs-popover-top>.arrow{bottom:calc(-.5rem - 1px)}.bs-popover-auto[x-placement^=top]>.arrow::before,.bs-popover-top>.arrow::before{bottom:0;border-width:.5rem .5rem 0;border-top-color:rgba(0,0,0,.25)}.bs-popover-auto[x-placement^=top]>.arrow::after,.bs-popover-top>.arrow::after{bottom:1px;border-width:.5rem .5rem 0;border-top-color:#fff}.bs-popover-auto[x-placement^=right],.bs-popover-right{margin-left:.5rem}.bs-popover-auto[x-placement^=right]>.arrow,.bs-popover-right>.arrow{left:calc(-.5rem - 1px);width:.5rem;height:1rem;margin:.3rem 0}.bs-popover-auto[x-placement^=right]>.arrow::before,.bs-popover-right>.arrow::before{left:0;border-width:.5rem .5rem .5rem 0;border-right-color:rgba(0,0,0,.25)}.bs-popover-auto[x-placement^=right]>.arrow::after,.bs-popover-right>.arrow::after{left:1px;border-width:.5rem .5rem .5rem 0;border-right-color:#fff}.bs-popover-auto[x-placement^=bottom],.bs-popover-bottom{margin-top:.5rem}.bs-popover-auto[x-placement^=bottom]>.arrow,.bs-popover-bottom>.arrow{top:calc(-.5rem - 1px)}.bs-popover-auto[x-placement^=bottom]>.arrow::before,.bs-popover-bottom>.arrow::before{top:0;border-width:0 .5rem .5rem .5rem;border-bottom-color:rgba(0,0,0,.25)}.bs-popover-auto[x-placement^=bottom]>.arrow::after,.bs-popover-bottom>.arrow::after{top:1px;border-width:0 .5rem .5rem .5rem;border-bottom-color:#fff}.bs-popover-auto[x-placement^=bottom] .popover-header::before,.bs-popover-bottom .popover-header::before{position:absolute;top:0;left:50%;display:block;width:1rem;margin-left:-.5rem;content:\"\";border-bottom:1px solid #f7f7f7}.bs-popover-auto[x-placement^=left],.bs-popover-left{margin-right:.5rem}.bs-popover-auto[x-placement^=left]>.arrow,.bs-popover-left>.arrow{right:calc(-.5rem - 1px);width:.5rem;height:1rem;margin:.3rem 0}.bs-popover-auto[x-placement^=left]>.arrow::before,.bs-popover-left>.arrow::before{right:0;border-width:.5rem 0 .5rem .5rem;border-left-color:rgba(0,0,0,.25)}.bs-popover-auto[x-placement^=left]>.arrow::after,.bs-popover-left>.arrow::after{right:1px;border-width:.5rem 0 .5rem .5rem;border-left-color:#fff}.popover-header{padding:.5rem .75rem;margin-bottom:0;font-size:1rem;background-color:#f7f7f7;border-bottom:1px solid #ebebeb;border-top-left-radius:calc(.3rem - 1px);border-top-right-radius:calc(.3rem - 1px)}.popover-header:empty{display:none}.popover-body{padding:.5rem .75rem;color:#212529}.carousel{position:relative}.carousel.pointer-event{-ms-touch-action:pan-y;touch-action:pan-y}.carousel-inner{position:relative;width:100%;overflow:hidden}.carousel-inner::after{display:block;clear:both;content:\"\"}.carousel-item{position:relative;display:none;float:left;width:100%;margin-right:-100%;-webkit-backface-visibility:hidden;backface-visibility:hidden;transition:-webkit-transform .6s ease-in-out;transition:transform .6s ease-in-out;transition:transform .6s ease-in-out,-webkit-transform .6s ease-in-out}@media (prefers-reduced-motion:reduce){.carousel-item{transition:none}}.carousel-item-next,.carousel-item-prev,.carousel-item.active{display:block}.active.carousel-item-right,.carousel-item-next:not(.carousel-item-left){-webkit-transform:translateX(100%);transform:translateX(100%)}.active.carousel-item-left,.carousel-item-prev:not(.carousel-item-right){-webkit-transform:translateX(-100%);transform:translateX(-100%)}.carousel-fade .carousel-item{opacity:0;transition-property:opacity;-webkit-transform:none;transform:none}.carousel-fade .carousel-item-next.carousel-item-left,.carousel-fade .carousel-item-prev.carousel-item-right,.carousel-fade .carousel-item.active{z-index:1;opacity:1}.carousel-fade .active.carousel-item-left,.carousel-fade .active.carousel-item-right{z-index:0;opacity:0;transition:opacity 0s .6s}@media (prefers-reduced-motion:reduce){.carousel-fade .active.carousel-item-left,.carousel-fade .active.carousel-item-right{transition:none}}.carousel-control-next,.carousel-control-prev{position:absolute;top:0;bottom:0;z-index:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:15%;color:#fff;text-align:center;opacity:.5;transition:opacity .15s ease}@media (prefers-reduced-motion:reduce){.carousel-control-next,.carousel-control-prev{transition:none}}.carousel-control-next:focus,.carousel-control-next:hover,.carousel-control-prev:focus,.carousel-control-prev:hover{color:#fff;text-decoration:none;outline:0;opacity:.9}.carousel-control-prev{left:0}.carousel-control-next{right:0}.carousel-control-next-icon,.carousel-control-prev-icon{display:inline-block;width:20px;height:20px;background:50%/100% 100% no-repeat}.carousel-control-prev-icon{background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M5.25 0l-4 4 4 4 1.5-1.5L4.25 4l2.5-2.5L5.25 0z'/%3e%3c/svg%3e\")}.carousel-control-next-icon{background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath d='M2.75 0l-1.5 1.5L3.75 4l-2.5 2.5L2.75 8l4-4-4-4z'/%3e%3c/svg%3e\")}.carousel-indicators{position:absolute;right:0;bottom:0;left:0;z-index:15;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;padding-left:0;margin-right:15%;margin-left:15%;list-style:none}.carousel-indicators li{box-sizing:content-box;-ms-flex:0 1 auto;flex:0 1 auto;width:30px;height:3px;margin-right:3px;margin-left:3px;text-indent:-999px;cursor:pointer;background-color:#fff;background-clip:padding-box;border-top:10px solid transparent;border-bottom:10px solid transparent;opacity:.5;transition:opacity .6s ease}@media (prefers-reduced-motion:reduce){.carousel-indicators li{transition:none}}.carousel-indicators .active{opacity:1}.carousel-caption{position:absolute;right:15%;bottom:20px;left:15%;z-index:10;padding-top:20px;padding-bottom:20px;color:#fff;text-align:center}@-webkit-keyframes spinner-border{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-border{to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.spinner-border{display:inline-block;width:2rem;height:2rem;vertical-align:text-bottom;border:.25em solid currentColor;border-right-color:transparent;border-radius:50%;-webkit-animation:.75s linear infinite spinner-border;animation:.75s linear infinite spinner-border}.spinner-border-sm{width:1rem;height:1rem;border-width:.2em}@-webkit-keyframes spinner-grow{0%{-webkit-transform:scale(0);transform:scale(0)}50%{opacity:1;-webkit-transform:none;transform:none}}@keyframes spinner-grow{0%{-webkit-transform:scale(0);transform:scale(0)}50%{opacity:1;-webkit-transform:none;transform:none}}.spinner-grow{display:inline-block;width:2rem;height:2rem;vertical-align:text-bottom;background-color:currentColor;border-radius:50%;opacity:0;-webkit-animation:.75s linear infinite spinner-grow;animation:.75s linear infinite spinner-grow}.spinner-grow-sm{width:1rem;height:1rem}@media (prefers-reduced-motion:reduce){.spinner-border,.spinner-grow{-webkit-animation-duration:1.5s;animation-duration:1.5s}}.align-baseline{vertical-align:baseline!important}.align-top{vertical-align:top!important}.align-middle{vertical-align:middle!important}.align-bottom{vertical-align:bottom!important}.align-text-bottom{vertical-align:text-bottom!important}.align-text-top{vertical-align:text-top!important}.bg-primary{background-color:#007bff!important}a.bg-primary:focus,a.bg-primary:hover,button.bg-primary:focus,button.bg-primary:hover{background-color:#0062cc!important}.bg-secondary{background-color:#6c757d!important}a.bg-secondary:focus,a.bg-secondary:hover,button.bg-secondary:focus,button.bg-secondary:hover{background-color:#545b62!important}.bg-success{background-color:#28a745!important}a.bg-success:focus,a.bg-success:hover,button.bg-success:focus,button.bg-success:hover{background-color:#1e7e34!important}.bg-info{background-color:#17a2b8!important}a.bg-info:focus,a.bg-info:hover,button.bg-info:focus,button.bg-info:hover{background-color:#117a8b!important}.bg-warning{background-color:#ffc107!important}a.bg-warning:focus,a.bg-warning:hover,button.bg-warning:focus,button.bg-warning:hover{background-color:#d39e00!important}.bg-danger{background-color:#dc3545!important}a.bg-danger:focus,a.bg-danger:hover,button.bg-danger:focus,button.bg-danger:hover{background-color:#bd2130!important}.bg-light{background-color:#f8f9fa!important}a.bg-light:focus,a.bg-light:hover,button.bg-light:focus,button.bg-light:hover{background-color:#dae0e5!important}.bg-dark{background-color:#343a40!important}a.bg-dark:focus,a.bg-dark:hover,button.bg-dark:focus,button.bg-dark:hover{background-color:#1d2124!important}.bg-white{background-color:#fff!important}.bg-transparent{background-color:transparent!important}.border{border:1px solid #dee2e6!important}.border-top{border-top:1px solid #dee2e6!important}.border-right{border-right:1px solid #dee2e6!important}.border-bottom{border-bottom:1px solid #dee2e6!important}.border-left{border-left:1px solid #dee2e6!important}.border-0{border:0!important}.border-top-0{border-top:0!important}.border-right-0{border-right:0!important}.border-bottom-0{border-bottom:0!important}.border-left-0{border-left:0!important}.border-primary{border-color:#007bff!important}.border-secondary{border-color:#6c757d!important}.border-success{border-color:#28a745!important}.border-info{border-color:#17a2b8!important}.border-warning{border-color:#ffc107!important}.border-danger{border-color:#dc3545!important}.border-light{border-color:#f8f9fa!important}.border-dark{border-color:#343a40!important}.border-white{border-color:#fff!important}.rounded-sm{border-radius:.2rem!important}.rounded{border-radius:.25rem!important}.rounded-top{border-top-left-radius:.25rem!important;border-top-right-radius:.25rem!important}.rounded-right{border-top-right-radius:.25rem!important;border-bottom-right-radius:.25rem!important}.rounded-bottom{border-bottom-right-radius:.25rem!important;border-bottom-left-radius:.25rem!important}.rounded-left{border-top-left-radius:.25rem!important;border-bottom-left-radius:.25rem!important}.rounded-lg{border-radius:.3rem!important}.rounded-circle{border-radius:50%!important}.rounded-pill{border-radius:50rem!important}.rounded-0{border-radius:0!important}.clearfix::after{display:block;clear:both;content:\"\"}.d-none{display:none!important}.d-inline{display:inline!important}.d-inline-block{display:inline-block!important}.d-block{display:block!important}.d-table{display:table!important}.d-table-row{display:table-row!important}.d-table-cell{display:table-cell!important}.d-flex{display:-ms-flexbox!important;display:flex!important}.d-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}@media (min-width:576px){.d-sm-none{display:none!important}.d-sm-inline{display:inline!important}.d-sm-inline-block{display:inline-block!important}.d-sm-block{display:block!important}.d-sm-table{display:table!important}.d-sm-table-row{display:table-row!important}.d-sm-table-cell{display:table-cell!important}.d-sm-flex{display:-ms-flexbox!important;display:flex!important}.d-sm-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:768px){.d-md-none{display:none!important}.d-md-inline{display:inline!important}.d-md-inline-block{display:inline-block!important}.d-md-block{display:block!important}.d-md-table{display:table!important}.d-md-table-row{display:table-row!important}.d-md-table-cell{display:table-cell!important}.d-md-flex{display:-ms-flexbox!important;display:flex!important}.d-md-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:992px){.d-lg-none{display:none!important}.d-lg-inline{display:inline!important}.d-lg-inline-block{display:inline-block!important}.d-lg-block{display:block!important}.d-lg-table{display:table!important}.d-lg-table-row{display:table-row!important}.d-lg-table-cell{display:table-cell!important}.d-lg-flex{display:-ms-flexbox!important;display:flex!important}.d-lg-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media (min-width:1200px){.d-xl-none{display:none!important}.d-xl-inline{display:inline!important}.d-xl-inline-block{display:inline-block!important}.d-xl-block{display:block!important}.d-xl-table{display:table!important}.d-xl-table-row{display:table-row!important}.d-xl-table-cell{display:table-cell!important}.d-xl-flex{display:-ms-flexbox!important;display:flex!important}.d-xl-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}@media print{.d-print-none{display:none!important}.d-print-inline{display:inline!important}.d-print-inline-block{display:inline-block!important}.d-print-block{display:block!important}.d-print-table{display:table!important}.d-print-table-row{display:table-row!important}.d-print-table-cell{display:table-cell!important}.d-print-flex{display:-ms-flexbox!important;display:flex!important}.d-print-inline-flex{display:-ms-inline-flexbox!important;display:inline-flex!important}}.embed-responsive{position:relative;display:block;width:100%;padding:0;overflow:hidden}.embed-responsive::before{display:block;content:\"\"}.embed-responsive .embed-responsive-item,.embed-responsive embed,.embed-responsive iframe,.embed-responsive object,.embed-responsive video{position:absolute;top:0;bottom:0;left:0;width:100%;height:100%;border:0}.embed-responsive-21by9::before{padding-top:42.857143%}.embed-responsive-16by9::before{padding-top:56.25%}.embed-responsive-4by3::before{padding-top:75%}.embed-responsive-1by1::before{padding-top:100%}.flex-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-center{-ms-flex-align:center!important;align-items:center!important}.align-items-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}@media (min-width:576px){.flex-sm-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-sm-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-sm-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-sm-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-sm-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-sm-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-sm-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-sm-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-sm-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-sm-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-sm-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-sm-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-sm-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-sm-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-sm-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-sm-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-sm-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-sm-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-sm-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-sm-center{-ms-flex-align:center!important;align-items:center!important}.align-items-sm-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-sm-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-sm-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-sm-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-sm-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-sm-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-sm-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-sm-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-sm-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-sm-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-sm-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-sm-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-sm-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-sm-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:768px){.flex-md-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-md-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-md-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-md-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-md-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-md-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-md-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-md-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-md-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-md-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-md-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-md-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-md-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-md-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-md-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-md-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-md-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-md-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-md-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-md-center{-ms-flex-align:center!important;align-items:center!important}.align-items-md-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-md-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-md-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-md-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-md-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-md-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-md-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-md-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-md-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-md-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-md-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-md-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-md-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-md-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:992px){.flex-lg-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-lg-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-lg-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-lg-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-lg-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-lg-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-lg-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-lg-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-lg-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-lg-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-lg-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-lg-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-lg-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-lg-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-lg-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-lg-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-lg-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-lg-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-lg-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-lg-center{-ms-flex-align:center!important;align-items:center!important}.align-items-lg-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-lg-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-lg-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-lg-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-lg-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-lg-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-lg-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-lg-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-lg-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-lg-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-lg-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-lg-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-lg-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-lg-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}@media (min-width:1200px){.flex-xl-row{-ms-flex-direction:row!important;flex-direction:row!important}.flex-xl-column{-ms-flex-direction:column!important;flex-direction:column!important}.flex-xl-row-reverse{-ms-flex-direction:row-reverse!important;flex-direction:row-reverse!important}.flex-xl-column-reverse{-ms-flex-direction:column-reverse!important;flex-direction:column-reverse!important}.flex-xl-wrap{-ms-flex-wrap:wrap!important;flex-wrap:wrap!important}.flex-xl-nowrap{-ms-flex-wrap:nowrap!important;flex-wrap:nowrap!important}.flex-xl-wrap-reverse{-ms-flex-wrap:wrap-reverse!important;flex-wrap:wrap-reverse!important}.flex-xl-fill{-ms-flex:1 1 auto!important;flex:1 1 auto!important}.flex-xl-grow-0{-ms-flex-positive:0!important;flex-grow:0!important}.flex-xl-grow-1{-ms-flex-positive:1!important;flex-grow:1!important}.flex-xl-shrink-0{-ms-flex-negative:0!important;flex-shrink:0!important}.flex-xl-shrink-1{-ms-flex-negative:1!important;flex-shrink:1!important}.justify-content-xl-start{-ms-flex-pack:start!important;justify-content:flex-start!important}.justify-content-xl-end{-ms-flex-pack:end!important;justify-content:flex-end!important}.justify-content-xl-center{-ms-flex-pack:center!important;justify-content:center!important}.justify-content-xl-between{-ms-flex-pack:justify!important;justify-content:space-between!important}.justify-content-xl-around{-ms-flex-pack:distribute!important;justify-content:space-around!important}.align-items-xl-start{-ms-flex-align:start!important;align-items:flex-start!important}.align-items-xl-end{-ms-flex-align:end!important;align-items:flex-end!important}.align-items-xl-center{-ms-flex-align:center!important;align-items:center!important}.align-items-xl-baseline{-ms-flex-align:baseline!important;align-items:baseline!important}.align-items-xl-stretch{-ms-flex-align:stretch!important;align-items:stretch!important}.align-content-xl-start{-ms-flex-line-pack:start!important;align-content:flex-start!important}.align-content-xl-end{-ms-flex-line-pack:end!important;align-content:flex-end!important}.align-content-xl-center{-ms-flex-line-pack:center!important;align-content:center!important}.align-content-xl-between{-ms-flex-line-pack:justify!important;align-content:space-between!important}.align-content-xl-around{-ms-flex-line-pack:distribute!important;align-content:space-around!important}.align-content-xl-stretch{-ms-flex-line-pack:stretch!important;align-content:stretch!important}.align-self-xl-auto{-ms-flex-item-align:auto!important;align-self:auto!important}.align-self-xl-start{-ms-flex-item-align:start!important;align-self:flex-start!important}.align-self-xl-end{-ms-flex-item-align:end!important;align-self:flex-end!important}.align-self-xl-center{-ms-flex-item-align:center!important;align-self:center!important}.align-self-xl-baseline{-ms-flex-item-align:baseline!important;align-self:baseline!important}.align-self-xl-stretch{-ms-flex-item-align:stretch!important;align-self:stretch!important}}.float-left{float:left!important}.float-right{float:right!important}.float-none{float:none!important}@media (min-width:576px){.float-sm-left{float:left!important}.float-sm-right{float:right!important}.float-sm-none{float:none!important}}@media (min-width:768px){.float-md-left{float:left!important}.float-md-right{float:right!important}.float-md-none{float:none!important}}@media (min-width:992px){.float-lg-left{float:left!important}.float-lg-right{float:right!important}.float-lg-none{float:none!important}}@media (min-width:1200px){.float-xl-left{float:left!important}.float-xl-right{float:right!important}.float-xl-none{float:none!important}}.user-select-all{-webkit-user-select:all!important;-moz-user-select:all!important;user-select:all!important}.user-select-auto{-webkit-user-select:auto!important;-moz-user-select:auto!important;-ms-user-select:auto!important;user-select:auto!important}.user-select-none{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.overflow-auto{overflow:auto!important}.overflow-hidden{overflow:hidden!important}.position-static{position:static!important}.position-relative{position:relative!important}.position-absolute{position:absolute!important}.position-fixed{position:fixed!important}.position-sticky{position:-webkit-sticky!important;position:sticky!important}.fixed-top{position:fixed;top:0;right:0;left:0;z-index:1030}.fixed-bottom{position:fixed;right:0;bottom:0;left:0;z-index:1030}@supports ((position:-webkit-sticky) or (position:sticky)){.sticky-top{position:-webkit-sticky;position:sticky;top:0;z-index:1020}}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;overflow:visible;clip:auto;white-space:normal}.shadow-sm{box-shadow:0 .125rem .25rem rgba(0,0,0,.075)!important}.shadow{box-shadow:0 .5rem 1rem rgba(0,0,0,.15)!important}.shadow-lg{box-shadow:0 1rem 3rem rgba(0,0,0,.175)!important}.shadow-none{box-shadow:none!important}.w-25{width:25%!important}.w-50{width:50%!important}.w-75{width:75%!important}.w-100{width:100%!important}.w-auto{width:auto!important}.h-25{height:25%!important}.h-50{height:50%!important}.h-75{height:75%!important}.h-100{height:100%!important}.h-auto{height:auto!important}.mw-100{max-width:100%!important}.mh-100{max-height:100%!important}.min-vw-100{min-width:100vw!important}.min-vh-100{min-height:100vh!important}.vw-100{width:100vw!important}.vh-100{height:100vh!important}.m-0{margin:0!important}.mt-0,.my-0{margin-top:0!important}.mr-0,.mx-0{margin-right:0!important}.mb-0,.my-0{margin-bottom:0!important}.ml-0,.mx-0{margin-left:0!important}.m-1{margin:.25rem!important}.mt-1,.my-1{margin-top:.25rem!important}.mr-1,.mx-1{margin-right:.25rem!important}.mb-1,.my-1{margin-bottom:.25rem!important}.ml-1,.mx-1{margin-left:.25rem!important}.m-2{margin:.5rem!important}.mt-2,.my-2{margin-top:.5rem!important}.mr-2,.mx-2{margin-right:.5rem!important}.mb-2,.my-2{margin-bottom:.5rem!important}.ml-2,.mx-2{margin-left:.5rem!important}.m-3{margin:1rem!important}.mt-3,.my-3{margin-top:1rem!important}.mr-3,.mx-3{margin-right:1rem!important}.mb-3,.my-3{margin-bottom:1rem!important}.ml-3,.mx-3{margin-left:1rem!important}.m-4{margin:1.5rem!important}.mt-4,.my-4{margin-top:1.5rem!important}.mr-4,.mx-4{margin-right:1.5rem!important}.mb-4,.my-4{margin-bottom:1.5rem!important}.ml-4,.mx-4{margin-left:1.5rem!important}.m-5{margin:3rem!important}.mt-5,.my-5{margin-top:3rem!important}.mr-5,.mx-5{margin-right:3rem!important}.mb-5,.my-5{margin-bottom:3rem!important}.ml-5,.mx-5{margin-left:3rem!important}.p-0{padding:0!important}.pt-0,.py-0{padding-top:0!important}.pr-0,.px-0{padding-right:0!important}.pb-0,.py-0{padding-bottom:0!important}.pl-0,.px-0{padding-left:0!important}.p-1{padding:.25rem!important}.pt-1,.py-1{padding-top:.25rem!important}.pr-1,.px-1{padding-right:.25rem!important}.pb-1,.py-1{padding-bottom:.25rem!important}.pl-1,.px-1{padding-left:.25rem!important}.p-2{padding:.5rem!important}.pt-2,.py-2{padding-top:.5rem!important}.pr-2,.px-2{padding-right:.5rem!important}.pb-2,.py-2{padding-bottom:.5rem!important}.pl-2,.px-2{padding-left:.5rem!important}.p-3{padding:1rem!important}.pt-3,.py-3{padding-top:1rem!important}.pr-3,.px-3{padding-right:1rem!important}.pb-3,.py-3{padding-bottom:1rem!important}.pl-3,.px-3{padding-left:1rem!important}.p-4{padding:1.5rem!important}.pt-4,.py-4{padding-top:1.5rem!important}.pr-4,.px-4{padding-right:1.5rem!important}.pb-4,.py-4{padding-bottom:1.5rem!important}.pl-4,.px-4{padding-left:1.5rem!important}.p-5{padding:3rem!important}.pt-5,.py-5{padding-top:3rem!important}.pr-5,.px-5{padding-right:3rem!important}.pb-5,.py-5{padding-bottom:3rem!important}.pl-5,.px-5{padding-left:3rem!important}.m-n1{margin:-.25rem!important}.mt-n1,.my-n1{margin-top:-.25rem!important}.mr-n1,.mx-n1{margin-right:-.25rem!important}.mb-n1,.my-n1{margin-bottom:-.25rem!important}.ml-n1,.mx-n1{margin-left:-.25rem!important}.m-n2{margin:-.5rem!important}.mt-n2,.my-n2{margin-top:-.5rem!important}.mr-n2,.mx-n2{margin-right:-.5rem!important}.mb-n2,.my-n2{margin-bottom:-.5rem!important}.ml-n2,.mx-n2{margin-left:-.5rem!important}.m-n3{margin:-1rem!important}.mt-n3,.my-n3{margin-top:-1rem!important}.mr-n3,.mx-n3{margin-right:-1rem!important}.mb-n3,.my-n3{margin-bottom:-1rem!important}.ml-n3,.mx-n3{margin-left:-1rem!important}.m-n4{margin:-1.5rem!important}.mt-n4,.my-n4{margin-top:-1.5rem!important}.mr-n4,.mx-n4{margin-right:-1.5rem!important}.mb-n4,.my-n4{margin-bottom:-1.5rem!important}.ml-n4,.mx-n4{margin-left:-1.5rem!important}.m-n5{margin:-3rem!important}.mt-n5,.my-n5{margin-top:-3rem!important}.mr-n5,.mx-n5{margin-right:-3rem!important}.mb-n5,.my-n5{margin-bottom:-3rem!important}.ml-n5,.mx-n5{margin-left:-3rem!important}.m-auto{margin:auto!important}.mt-auto,.my-auto{margin-top:auto!important}.mr-auto,.mx-auto{margin-right:auto!important}.mb-auto,.my-auto{margin-bottom:auto!important}.ml-auto,.mx-auto{margin-left:auto!important}@media (min-width:576px){.m-sm-0{margin:0!important}.mt-sm-0,.my-sm-0{margin-top:0!important}.mr-sm-0,.mx-sm-0{margin-right:0!important}.mb-sm-0,.my-sm-0{margin-bottom:0!important}.ml-sm-0,.mx-sm-0{margin-left:0!important}.m-sm-1{margin:.25rem!important}.mt-sm-1,.my-sm-1{margin-top:.25rem!important}.mr-sm-1,.mx-sm-1{margin-right:.25rem!important}.mb-sm-1,.my-sm-1{margin-bottom:.25rem!important}.ml-sm-1,.mx-sm-1{margin-left:.25rem!important}.m-sm-2{margin:.5rem!important}.mt-sm-2,.my-sm-2{margin-top:.5rem!important}.mr-sm-2,.mx-sm-2{margin-right:.5rem!important}.mb-sm-2,.my-sm-2{margin-bottom:.5rem!important}.ml-sm-2,.mx-sm-2{margin-left:.5rem!important}.m-sm-3{margin:1rem!important}.mt-sm-3,.my-sm-3{margin-top:1rem!important}.mr-sm-3,.mx-sm-3{margin-right:1rem!important}.mb-sm-3,.my-sm-3{margin-bottom:1rem!important}.ml-sm-3,.mx-sm-3{margin-left:1rem!important}.m-sm-4{margin:1.5rem!important}.mt-sm-4,.my-sm-4{margin-top:1.5rem!important}.mr-sm-4,.mx-sm-4{margin-right:1.5rem!important}.mb-sm-4,.my-sm-4{margin-bottom:1.5rem!important}.ml-sm-4,.mx-sm-4{margin-left:1.5rem!important}.m-sm-5{margin:3rem!important}.mt-sm-5,.my-sm-5{margin-top:3rem!important}.mr-sm-5,.mx-sm-5{margin-right:3rem!important}.mb-sm-5,.my-sm-5{margin-bottom:3rem!important}.ml-sm-5,.mx-sm-5{margin-left:3rem!important}.p-sm-0{padding:0!important}.pt-sm-0,.py-sm-0{padding-top:0!important}.pr-sm-0,.px-sm-0{padding-right:0!important}.pb-sm-0,.py-sm-0{padding-bottom:0!important}.pl-sm-0,.px-sm-0{padding-left:0!important}.p-sm-1{padding:.25rem!important}.pt-sm-1,.py-sm-1{padding-top:.25rem!important}.pr-sm-1,.px-sm-1{padding-right:.25rem!important}.pb-sm-1,.py-sm-1{padding-bottom:.25rem!important}.pl-sm-1,.px-sm-1{padding-left:.25rem!important}.p-sm-2{padding:.5rem!important}.pt-sm-2,.py-sm-2{padding-top:.5rem!important}.pr-sm-2,.px-sm-2{padding-right:.5rem!important}.pb-sm-2,.py-sm-2{padding-bottom:.5rem!important}.pl-sm-2,.px-sm-2{padding-left:.5rem!important}.p-sm-3{padding:1rem!important}.pt-sm-3,.py-sm-3{padding-top:1rem!important}.pr-sm-3,.px-sm-3{padding-right:1rem!important}.pb-sm-3,.py-sm-3{padding-bottom:1rem!important}.pl-sm-3,.px-sm-3{padding-left:1rem!important}.p-sm-4{padding:1.5rem!important}.pt-sm-4,.py-sm-4{padding-top:1.5rem!important}.pr-sm-4,.px-sm-4{padding-right:1.5rem!important}.pb-sm-4,.py-sm-4{padding-bottom:1.5rem!important}.pl-sm-4,.px-sm-4{padding-left:1.5rem!important}.p-sm-5{padding:3rem!important}.pt-sm-5,.py-sm-5{padding-top:3rem!important}.pr-sm-5,.px-sm-5{padding-right:3rem!important}.pb-sm-5,.py-sm-5{padding-bottom:3rem!important}.pl-sm-5,.px-sm-5{padding-left:3rem!important}.m-sm-n1{margin:-.25rem!important}.mt-sm-n1,.my-sm-n1{margin-top:-.25rem!important}.mr-sm-n1,.mx-sm-n1{margin-right:-.25rem!important}.mb-sm-n1,.my-sm-n1{margin-bottom:-.25rem!important}.ml-sm-n1,.mx-sm-n1{margin-left:-.25rem!important}.m-sm-n2{margin:-.5rem!important}.mt-sm-n2,.my-sm-n2{margin-top:-.5rem!important}.mr-sm-n2,.mx-sm-n2{margin-right:-.5rem!important}.mb-sm-n2,.my-sm-n2{margin-bottom:-.5rem!important}.ml-sm-n2,.mx-sm-n2{margin-left:-.5rem!important}.m-sm-n3{margin:-1rem!important}.mt-sm-n3,.my-sm-n3{margin-top:-1rem!important}.mr-sm-n3,.mx-sm-n3{margin-right:-1rem!important}.mb-sm-n3,.my-sm-n3{margin-bottom:-1rem!important}.ml-sm-n3,.mx-sm-n3{margin-left:-1rem!important}.m-sm-n4{margin:-1.5rem!important}.mt-sm-n4,.my-sm-n4{margin-top:-1.5rem!important}.mr-sm-n4,.mx-sm-n4{margin-right:-1.5rem!important}.mb-sm-n4,.my-sm-n4{margin-bottom:-1.5rem!important}.ml-sm-n4,.mx-sm-n4{margin-left:-1.5rem!important}.m-sm-n5{margin:-3rem!important}.mt-sm-n5,.my-sm-n5{margin-top:-3rem!important}.mr-sm-n5,.mx-sm-n5{margin-right:-3rem!important}.mb-sm-n5,.my-sm-n5{margin-bottom:-3rem!important}.ml-sm-n5,.mx-sm-n5{margin-left:-3rem!important}.m-sm-auto{margin:auto!important}.mt-sm-auto,.my-sm-auto{margin-top:auto!important}.mr-sm-auto,.mx-sm-auto{margin-right:auto!important}.mb-sm-auto,.my-sm-auto{margin-bottom:auto!important}.ml-sm-auto,.mx-sm-auto{margin-left:auto!important}}@media (min-width:768px){.m-md-0{margin:0!important}.mt-md-0,.my-md-0{margin-top:0!important}.mr-md-0,.mx-md-0{margin-right:0!important}.mb-md-0,.my-md-0{margin-bottom:0!important}.ml-md-0,.mx-md-0{margin-left:0!important}.m-md-1{margin:.25rem!important}.mt-md-1,.my-md-1{margin-top:.25rem!important}.mr-md-1,.mx-md-1{margin-right:.25rem!important}.mb-md-1,.my-md-1{margin-bottom:.25rem!important}.ml-md-1,.mx-md-1{margin-left:.25rem!important}.m-md-2{margin:.5rem!important}.mt-md-2,.my-md-2{margin-top:.5rem!important}.mr-md-2,.mx-md-2{margin-right:.5rem!important}.mb-md-2,.my-md-2{margin-bottom:.5rem!important}.ml-md-2,.mx-md-2{margin-left:.5rem!important}.m-md-3{margin:1rem!important}.mt-md-3,.my-md-3{margin-top:1rem!important}.mr-md-3,.mx-md-3{margin-right:1rem!important}.mb-md-3,.my-md-3{margin-bottom:1rem!important}.ml-md-3,.mx-md-3{margin-left:1rem!important}.m-md-4{margin:1.5rem!important}.mt-md-4,.my-md-4{margin-top:1.5rem!important}.mr-md-4,.mx-md-4{margin-right:1.5rem!important}.mb-md-4,.my-md-4{margin-bottom:1.5rem!important}.ml-md-4,.mx-md-4{margin-left:1.5rem!important}.m-md-5{margin:3rem!important}.mt-md-5,.my-md-5{margin-top:3rem!important}.mr-md-5,.mx-md-5{margin-right:3rem!important}.mb-md-5,.my-md-5{margin-bottom:3rem!important}.ml-md-5,.mx-md-5{margin-left:3rem!important}.p-md-0{padding:0!important}.pt-md-0,.py-md-0{padding-top:0!important}.pr-md-0,.px-md-0{padding-right:0!important}.pb-md-0,.py-md-0{padding-bottom:0!important}.pl-md-0,.px-md-0{padding-left:0!important}.p-md-1{padding:.25rem!important}.pt-md-1,.py-md-1{padding-top:.25rem!important}.pr-md-1,.px-md-1{padding-right:.25rem!important}.pb-md-1,.py-md-1{padding-bottom:.25rem!important}.pl-md-1,.px-md-1{padding-left:.25rem!important}.p-md-2{padding:.5rem!important}.pt-md-2,.py-md-2{padding-top:.5rem!important}.pr-md-2,.px-md-2{padding-right:.5rem!important}.pb-md-2,.py-md-2{padding-bottom:.5rem!important}.pl-md-2,.px-md-2{padding-left:.5rem!important}.p-md-3{padding:1rem!important}.pt-md-3,.py-md-3{padding-top:1rem!important}.pr-md-3,.px-md-3{padding-right:1rem!important}.pb-md-3,.py-md-3{padding-bottom:1rem!important}.pl-md-3,.px-md-3{padding-left:1rem!important}.p-md-4{padding:1.5rem!important}.pt-md-4,.py-md-4{padding-top:1.5rem!important}.pr-md-4,.px-md-4{padding-right:1.5rem!important}.pb-md-4,.py-md-4{padding-bottom:1.5rem!important}.pl-md-4,.px-md-4{padding-left:1.5rem!important}.p-md-5{padding:3rem!important}.pt-md-5,.py-md-5{padding-top:3rem!important}.pr-md-5,.px-md-5{padding-right:3rem!important}.pb-md-5,.py-md-5{padding-bottom:3rem!important}.pl-md-5,.px-md-5{padding-left:3rem!important}.m-md-n1{margin:-.25rem!important}.mt-md-n1,.my-md-n1{margin-top:-.25rem!important}.mr-md-n1,.mx-md-n1{margin-right:-.25rem!important}.mb-md-n1,.my-md-n1{margin-bottom:-.25rem!important}.ml-md-n1,.mx-md-n1{margin-left:-.25rem!important}.m-md-n2{margin:-.5rem!important}.mt-md-n2,.my-md-n2{margin-top:-.5rem!important}.mr-md-n2,.mx-md-n2{margin-right:-.5rem!important}.mb-md-n2,.my-md-n2{margin-bottom:-.5rem!important}.ml-md-n2,.mx-md-n2{margin-left:-.5rem!important}.m-md-n3{margin:-1rem!important}.mt-md-n3,.my-md-n3{margin-top:-1rem!important}.mr-md-n3,.mx-md-n3{margin-right:-1rem!important}.mb-md-n3,.my-md-n3{margin-bottom:-1rem!important}.ml-md-n3,.mx-md-n3{margin-left:-1rem!important}.m-md-n4{margin:-1.5rem!important}.mt-md-n4,.my-md-n4{margin-top:-1.5rem!important}.mr-md-n4,.mx-md-n4{margin-right:-1.5rem!important}.mb-md-n4,.my-md-n4{margin-bottom:-1.5rem!important}.ml-md-n4,.mx-md-n4{margin-left:-1.5rem!important}.m-md-n5{margin:-3rem!important}.mt-md-n5,.my-md-n5{margin-top:-3rem!important}.mr-md-n5,.mx-md-n5{margin-right:-3rem!important}.mb-md-n5,.my-md-n5{margin-bottom:-3rem!important}.ml-md-n5,.mx-md-n5{margin-left:-3rem!important}.m-md-auto{margin:auto!important}.mt-md-auto,.my-md-auto{margin-top:auto!important}.mr-md-auto,.mx-md-auto{margin-right:auto!important}.mb-md-auto,.my-md-auto{margin-bottom:auto!important}.ml-md-auto,.mx-md-auto{margin-left:auto!important}}@media (min-width:992px){.m-lg-0{margin:0!important}.mt-lg-0,.my-lg-0{margin-top:0!important}.mr-lg-0,.mx-lg-0{margin-right:0!important}.mb-lg-0,.my-lg-0{margin-bottom:0!important}.ml-lg-0,.mx-lg-0{margin-left:0!important}.m-lg-1{margin:.25rem!important}.mt-lg-1,.my-lg-1{margin-top:.25rem!important}.mr-lg-1,.mx-lg-1{margin-right:.25rem!important}.mb-lg-1,.my-lg-1{margin-bottom:.25rem!important}.ml-lg-1,.mx-lg-1{margin-left:.25rem!important}.m-lg-2{margin:.5rem!important}.mt-lg-2,.my-lg-2{margin-top:.5rem!important}.mr-lg-2,.mx-lg-2{margin-right:.5rem!important}.mb-lg-2,.my-lg-2{margin-bottom:.5rem!important}.ml-lg-2,.mx-lg-2{margin-left:.5rem!important}.m-lg-3{margin:1rem!important}.mt-lg-3,.my-lg-3{margin-top:1rem!important}.mr-lg-3,.mx-lg-3{margin-right:1rem!important}.mb-lg-3,.my-lg-3{margin-bottom:1rem!important}.ml-lg-3,.mx-lg-3{margin-left:1rem!important}.m-lg-4{margin:1.5rem!important}.mt-lg-4,.my-lg-4{margin-top:1.5rem!important}.mr-lg-4,.mx-lg-4{margin-right:1.5rem!important}.mb-lg-4,.my-lg-4{margin-bottom:1.5rem!important}.ml-lg-4,.mx-lg-4{margin-left:1.5rem!important}.m-lg-5{margin:3rem!important}.mt-lg-5,.my-lg-5{margin-top:3rem!important}.mr-lg-5,.mx-lg-5{margin-right:3rem!important}.mb-lg-5,.my-lg-5{margin-bottom:3rem!important}.ml-lg-5,.mx-lg-5{margin-left:3rem!important}.p-lg-0{padding:0!important}.pt-lg-0,.py-lg-0{padding-top:0!important}.pr-lg-0,.px-lg-0{padding-right:0!important}.pb-lg-0,.py-lg-0{padding-bottom:0!important}.pl-lg-0,.px-lg-0{padding-left:0!important}.p-lg-1{padding:.25rem!important}.pt-lg-1,.py-lg-1{padding-top:.25rem!important}.pr-lg-1,.px-lg-1{padding-right:.25rem!important}.pb-lg-1,.py-lg-1{padding-bottom:.25rem!important}.pl-lg-1,.px-lg-1{padding-left:.25rem!important}.p-lg-2{padding:.5rem!important}.pt-lg-2,.py-lg-2{padding-top:.5rem!important}.pr-lg-2,.px-lg-2{padding-right:.5rem!important}.pb-lg-2,.py-lg-2{padding-bottom:.5rem!important}.pl-lg-2,.px-lg-2{padding-left:.5rem!important}.p-lg-3{padding:1rem!important}.pt-lg-3,.py-lg-3{padding-top:1rem!important}.pr-lg-3,.px-lg-3{padding-right:1rem!important}.pb-lg-3,.py-lg-3{padding-bottom:1rem!important}.pl-lg-3,.px-lg-3{padding-left:1rem!important}.p-lg-4{padding:1.5rem!important}.pt-lg-4,.py-lg-4{padding-top:1.5rem!important}.pr-lg-4,.px-lg-4{padding-right:1.5rem!important}.pb-lg-4,.py-lg-4{padding-bottom:1.5rem!important}.pl-lg-4,.px-lg-4{padding-left:1.5rem!important}.p-lg-5{padding:3rem!important}.pt-lg-5,.py-lg-5{padding-top:3rem!important}.pr-lg-5,.px-lg-5{padding-right:3rem!important}.pb-lg-5,.py-lg-5{padding-bottom:3rem!important}.pl-lg-5,.px-lg-5{padding-left:3rem!important}.m-lg-n1{margin:-.25rem!important}.mt-lg-n1,.my-lg-n1{margin-top:-.25rem!important}.mr-lg-n1,.mx-lg-n1{margin-right:-.25rem!important}.mb-lg-n1,.my-lg-n1{margin-bottom:-.25rem!important}.ml-lg-n1,.mx-lg-n1{margin-left:-.25rem!important}.m-lg-n2{margin:-.5rem!important}.mt-lg-n2,.my-lg-n2{margin-top:-.5rem!important}.mr-lg-n2,.mx-lg-n2{margin-right:-.5rem!important}.mb-lg-n2,.my-lg-n2{margin-bottom:-.5rem!important}.ml-lg-n2,.mx-lg-n2{margin-left:-.5rem!important}.m-lg-n3{margin:-1rem!important}.mt-lg-n3,.my-lg-n3{margin-top:-1rem!important}.mr-lg-n3,.mx-lg-n3{margin-right:-1rem!important}.mb-lg-n3,.my-lg-n3{margin-bottom:-1rem!important}.ml-lg-n3,.mx-lg-n3{margin-left:-1rem!important}.m-lg-n4{margin:-1.5rem!important}.mt-lg-n4,.my-lg-n4{margin-top:-1.5rem!important}.mr-lg-n4,.mx-lg-n4{margin-right:-1.5rem!important}.mb-lg-n4,.my-lg-n4{margin-bottom:-1.5rem!important}.ml-lg-n4,.mx-lg-n4{margin-left:-1.5rem!important}.m-lg-n5{margin:-3rem!important}.mt-lg-n5,.my-lg-n5{margin-top:-3rem!important}.mr-lg-n5,.mx-lg-n5{margin-right:-3rem!important}.mb-lg-n5,.my-lg-n5{margin-bottom:-3rem!important}.ml-lg-n5,.mx-lg-n5{margin-left:-3rem!important}.m-lg-auto{margin:auto!important}.mt-lg-auto,.my-lg-auto{margin-top:auto!important}.mr-lg-auto,.mx-lg-auto{margin-right:auto!important}.mb-lg-auto,.my-lg-auto{margin-bottom:auto!important}.ml-lg-auto,.mx-lg-auto{margin-left:auto!important}}@media (min-width:1200px){.m-xl-0{margin:0!important}.mt-xl-0,.my-xl-0{margin-top:0!important}.mr-xl-0,.mx-xl-0{margin-right:0!important}.mb-xl-0,.my-xl-0{margin-bottom:0!important}.ml-xl-0,.mx-xl-0{margin-left:0!important}.m-xl-1{margin:.25rem!important}.mt-xl-1,.my-xl-1{margin-top:.25rem!important}.mr-xl-1,.mx-xl-1{margin-right:.25rem!important}.mb-xl-1,.my-xl-1{margin-bottom:.25rem!important}.ml-xl-1,.mx-xl-1{margin-left:.25rem!important}.m-xl-2{margin:.5rem!important}.mt-xl-2,.my-xl-2{margin-top:.5rem!important}.mr-xl-2,.mx-xl-2{margin-right:.5rem!important}.mb-xl-2,.my-xl-2{margin-bottom:.5rem!important}.ml-xl-2,.mx-xl-2{margin-left:.5rem!important}.m-xl-3{margin:1rem!important}.mt-xl-3,.my-xl-3{margin-top:1rem!important}.mr-xl-3,.mx-xl-3{margin-right:1rem!important}.mb-xl-3,.my-xl-3{margin-bottom:1rem!important}.ml-xl-3,.mx-xl-3{margin-left:1rem!important}.m-xl-4{margin:1.5rem!important}.mt-xl-4,.my-xl-4{margin-top:1.5rem!important}.mr-xl-4,.mx-xl-4{margin-right:1.5rem!important}.mb-xl-4,.my-xl-4{margin-bottom:1.5rem!important}.ml-xl-4,.mx-xl-4{margin-left:1.5rem!important}.m-xl-5{margin:3rem!important}.mt-xl-5,.my-xl-5{margin-top:3rem!important}.mr-xl-5,.mx-xl-5{margin-right:3rem!important}.mb-xl-5,.my-xl-5{margin-bottom:3rem!important}.ml-xl-5,.mx-xl-5{margin-left:3rem!important}.p-xl-0{padding:0!important}.pt-xl-0,.py-xl-0{padding-top:0!important}.pr-xl-0,.px-xl-0{padding-right:0!important}.pb-xl-0,.py-xl-0{padding-bottom:0!important}.pl-xl-0,.px-xl-0{padding-left:0!important}.p-xl-1{padding:.25rem!important}.pt-xl-1,.py-xl-1{padding-top:.25rem!important}.pr-xl-1,.px-xl-1{padding-right:.25rem!important}.pb-xl-1,.py-xl-1{padding-bottom:.25rem!important}.pl-xl-1,.px-xl-1{padding-left:.25rem!important}.p-xl-2{padding:.5rem!important}.pt-xl-2,.py-xl-2{padding-top:.5rem!important}.pr-xl-2,.px-xl-2{padding-right:.5rem!important}.pb-xl-2,.py-xl-2{padding-bottom:.5rem!important}.pl-xl-2,.px-xl-2{padding-left:.5rem!important}.p-xl-3{padding:1rem!important}.pt-xl-3,.py-xl-3{padding-top:1rem!important}.pr-xl-3,.px-xl-3{padding-right:1rem!important}.pb-xl-3,.py-xl-3{padding-bottom:1rem!important}.pl-xl-3,.px-xl-3{padding-left:1rem!important}.p-xl-4{padding:1.5rem!important}.pt-xl-4,.py-xl-4{padding-top:1.5rem!important}.pr-xl-4,.px-xl-4{padding-right:1.5rem!important}.pb-xl-4,.py-xl-4{padding-bottom:1.5rem!important}.pl-xl-4,.px-xl-4{padding-left:1.5rem!important}.p-xl-5{padding:3rem!important}.pt-xl-5,.py-xl-5{padding-top:3rem!important}.pr-xl-5,.px-xl-5{padding-right:3rem!important}.pb-xl-5,.py-xl-5{padding-bottom:3rem!important}.pl-xl-5,.px-xl-5{padding-left:3rem!important}.m-xl-n1{margin:-.25rem!important}.mt-xl-n1,.my-xl-n1{margin-top:-.25rem!important}.mr-xl-n1,.mx-xl-n1{margin-right:-.25rem!important}.mb-xl-n1,.my-xl-n1{margin-bottom:-.25rem!important}.ml-xl-n1,.mx-xl-n1{margin-left:-.25rem!important}.m-xl-n2{margin:-.5rem!important}.mt-xl-n2,.my-xl-n2{margin-top:-.5rem!important}.mr-xl-n2,.mx-xl-n2{margin-right:-.5rem!important}.mb-xl-n2,.my-xl-n2{margin-bottom:-.5rem!important}.ml-xl-n2,.mx-xl-n2{margin-left:-.5rem!important}.m-xl-n3{margin:-1rem!important}.mt-xl-n3,.my-xl-n3{margin-top:-1rem!important}.mr-xl-n3,.mx-xl-n3{margin-right:-1rem!important}.mb-xl-n3,.my-xl-n3{margin-bottom:-1rem!important}.ml-xl-n3,.mx-xl-n3{margin-left:-1rem!important}.m-xl-n4{margin:-1.5rem!important}.mt-xl-n4,.my-xl-n4{margin-top:-1.5rem!important}.mr-xl-n4,.mx-xl-n4{margin-right:-1.5rem!important}.mb-xl-n4,.my-xl-n4{margin-bottom:-1.5rem!important}.ml-xl-n4,.mx-xl-n4{margin-left:-1.5rem!important}.m-xl-n5{margin:-3rem!important}.mt-xl-n5,.my-xl-n5{margin-top:-3rem!important}.mr-xl-n5,.mx-xl-n5{margin-right:-3rem!important}.mb-xl-n5,.my-xl-n5{margin-bottom:-3rem!important}.ml-xl-n5,.mx-xl-n5{margin-left:-3rem!important}.m-xl-auto{margin:auto!important}.mt-xl-auto,.my-xl-auto{margin-top:auto!important}.mr-xl-auto,.mx-xl-auto{margin-right:auto!important}.mb-xl-auto,.my-xl-auto{margin-bottom:auto!important}.ml-xl-auto,.mx-xl-auto{margin-left:auto!important}}.stretched-link::after{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;pointer-events:auto;content:\"\";background-color:rgba(0,0,0,0)}.text-monospace{font-family:SFMono-Regular,Menlo,Monaco,Consolas,\"Liberation Mono\",\"Courier New\",monospace!important}.text-justify{text-align:justify!important}.text-wrap{white-space:normal!important}.text-nowrap{white-space:nowrap!important}.text-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.text-left{text-align:left!important}.text-right{text-align:right!important}.text-center{text-align:center!important}@media (min-width:576px){.text-sm-left{text-align:left!important}.text-sm-right{text-align:right!important}.text-sm-center{text-align:center!important}}@media (min-width:768px){.text-md-left{text-align:left!important}.text-md-right{text-align:right!important}.text-md-center{text-align:center!important}}@media (min-width:992px){.text-lg-left{text-align:left!important}.text-lg-right{text-align:right!important}.text-lg-center{text-align:center!important}}@media (min-width:1200px){.text-xl-left{text-align:left!important}.text-xl-right{text-align:right!important}.text-xl-center{text-align:center!important}}.text-lowercase{text-transform:lowercase!important}.text-uppercase{text-transform:uppercase!important}.text-capitalize{text-transform:capitalize!important}.font-weight-light{font-weight:300!important}.font-weight-lighter{font-weight:lighter!important}.font-weight-normal{font-weight:400!important}.font-weight-bold{font-weight:700!important}.font-weight-bolder{font-weight:bolder!important}.font-italic{font-style:italic!important}.text-white{color:#fff!important}.text-primary{color:#007bff!important}a.text-primary:focus,a.text-primary:hover{color:#0056b3!important}.text-secondary{color:#6c757d!important}a.text-secondary:focus,a.text-secondary:hover{color:#494f54!important}.text-success{color:#28a745!important}a.text-success:focus,a.text-success:hover{color:#19692c!important}.text-info{color:#17a2b8!important}a.text-info:focus,a.text-info:hover{color:#0f6674!important}.text-warning{color:#ffc107!important}a.text-warning:focus,a.text-warning:hover{color:#ba8b00!important}.text-danger{color:#dc3545!important}a.text-danger:focus,a.text-danger:hover{color:#a71d2a!important}.text-light{color:#f8f9fa!important}a.text-light:focus,a.text-light:hover{color:#cbd3da!important}.text-dark{color:#343a40!important}a.text-dark:focus,a.text-dark:hover{color:#121416!important}.text-body{color:#212529!important}.text-muted{color:#6c757d!important}.text-black-50{color:rgba(0,0,0,.5)!important}.text-white-50{color:rgba(255,255,255,.5)!important}.text-hide{font:0/0 a;color:transparent;text-shadow:none;background-color:transparent;border:0}.text-decoration-none{text-decoration:none!important}.text-break{word-break:break-word!important;word-wrap:break-word!important}.text-reset{color:inherit!important}.visible{visibility:visible!important}.invisible{visibility:hidden!important}@media print{*,::after,::before{text-shadow:none!important;box-shadow:none!important}a:not(.btn){text-decoration:underline}abbr[title]::after{content:\" (\" attr(title) \")\"}pre{white-space:pre-wrap!important}blockquote,pre{border:1px solid #adb5bd;page-break-inside:avoid}thead{display:table-header-group}img,tr{page-break-inside:avoid}h2,h3,p{orphans:3;widows:3}h2,h3{page-break-after:avoid}@page{size:a3}body{min-width:992px!important}.container{min-width:992px!important}.navbar{display:none}.badge{border:1px solid #000}.table{border-collapse:collapse!important}.table td,.table th{background-color:#fff!important}.table-bordered td,.table-bordered th{border:1px solid #dee2e6!important}.table-dark{color:inherit}.table-dark tbody+tbody,.table-dark td,.table-dark th,.table-dark thead th{border-color:#dee2e6}.table .thead-dark th{color:inherit;border-color:#dee2e6}}";
styleInject(css_248z$1);

var css_248z = "body {\r\n    padding: 10px;\r\n}\r\n\r\n.App {\r\n    font-family: sans-serif;\r\n    text-align: center;\r\n}\r\n\r\n.field-url {\r\n    width: 450px;\r\n    height: 40px;\r\n    font-size: 12px;\r\n}\r\n\r\n.btn-change {\r\n    margin: 5px;\r\n}\r\n\r\n.component {\r\n    margin: 20px 0px;\r\n    border: 1px solid black;\r\n    width: 500px;\r\n    padding: 5px;\r\n}\r\n\r\n.component * {\r\n    margin: 5px;\r\n}\r\n\r\nform {\r\n    display: inline;\r\n}\r\n\r\n.component > .caption {\r\n    background-color: #535353;\r\n    color: white;\r\n    margin: 0px;\r\n    padding: 5px 10px;\r\n}\r\n\r\n#timeout-input {\r\n    width: 200px;\r\n}\r\n";
styleInject(css_248z);

class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      _url: props.url,
      timeout: 5000
    };
    this.onClick = this.onClick.bind(this);
    this.onFetchClick = this.onFetchClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeoutChange = this.handleTimeoutChange.bind(this);
  }

  onFetchClick() {
    this.setState(({
      _url
    }) => ({
      url: _url
    }));
  }

  onClick() {
    this.setState({
      timestamp: Date.now()
    });
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({
      _url: event.target.value
    });
  }

  handleTimeoutChange(event) {
    this.setState({
      timeout: event.target.value * 1
    });
  }

  render() {
    return /*#__PURE__*/react.createElement("div", {
      key: this.state.timestamp,
      id: "app"
    }, /*#__PURE__*/react.createElement("input", {
      className: "field-url",
      type: "text",
      value: this.state._url,
      onChange: this.handleChange
    }), /*#__PURE__*/react.createElement("button", {
      className: "btn btn-info btn-change",
      onClick: this.onFetchClick,
      disabled: this.state.url === this.state._url
    }, "Change URL to Fetch"), /*#__PURE__*/react.createElement("div", null, /*#__PURE__*/react.createElement("input", {
      id: "timeout-input",
      type: "range",
      min: "5",
      max: "10000",
      value: this.state.timeout,
      onChange: this.handleTimeoutChange,
      step: "1"
    }), /*#__PURE__*/react.createElement("label", {
      htmlFor: "timeout-input"
    }, "Timeout [", this.state.timeout, "]ms")), /*#__PURE__*/react.createElement(TestComponent, {
      url: this.state.url,
      timeout: this.state.timeout
    }), /*#__PURE__*/react.createElement("button", {
      className: "btn btn-danger",
      onClick: this.onClick
    }, "Remount component"));
  }

}

reactDom.render( /*#__PURE__*/react.createElement(App, {
  url: "https://run.mocky.io/v3/7b038025-fc5f-4564-90eb-4373f0721822?mocky-delay=2s"
}), document.getElementById('root'));
