(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MFERuntimeZ = {}));
})(this, (function (exports) { 'use strict';

  /******************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */

  var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
  };

  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }

  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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

  typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };

  // loader/loadScript.ts
  var loaded = new Set();
  function loadScript(url, options) {
      if (options === void 0) { options = {}; }
      return __awaiter(this, void 0, void 0, function () {
          var _a, timeout, _b, retries, attempt, err_1;
          return __generator(this, function (_c) {
              switch (_c.label) {
                  case 0:
                      _a = options.timeout, timeout = _a === void 0 ? 15000 : _a, _b = options.retries, retries = _b === void 0 ? 1 : _b;
                      if (loaded.has(url))
                          return [2 /*return*/];
                      attempt = 0;
                      _c.label = 1;
                  case 1:
                      if (!(attempt <= retries)) return [3 /*break*/, 6];
                      _c.label = 2;
                  case 2:
                      _c.trys.push([2, 4, , 5]);
                      return [4 /*yield*/, loadOnce(url, timeout)];
                  case 3:
                      _c.sent();
                      loaded.add(url);
                      return [2 /*return*/];
                  case 4:
                      err_1 = _c.sent();
                      if (attempt === retries) {
                          throw err_1;
                      }
                      return [3 /*break*/, 5];
                  case 5:
                      attempt++;
                      return [3 /*break*/, 1];
                  case 6: return [2 /*return*/];
              }
          });
      });
  }
  function loadOnce(url, timeout) {
      return new Promise(function (resolve, reject) {
          var script = document.createElement("script");
          script.src = url;
          script.async = true;
          var timer = setTimeout(function () {
              cleanup();
              reject(new Error("Timeout loading ".concat(url)));
          }, timeout);
          function cleanup() {
              clearTimeout(timer);
              script.remove();
          }
          script.onload = function () {
              cleanup();
              resolve();
          };
          script.onerror = function () {
              cleanup();
              reject(new Error("Failed to load ".concat(url)));
          };
          document.body.appendChild(script);
      });
  }

  var EventBus = /** @class */ (function () {
      function EventBus() {
          this.map = new Map();
      }
      EventBus.prototype.on = function (event, handler) {
          if (!this.map.has(event)) {
              this.map.set(event, new Set());
          }
          this.map.get(event).add(handler);
      };
      EventBus.prototype.off = function (event, handler) {
          var _a;
          (_a = this.map.get(event)) === null || _a === void 0 ? void 0 : _a.delete(handler);
      };
      EventBus.prototype.emit = function (event, payload) {
          var _a;
          (_a = this.map.get(event)) === null || _a === void 0 ? void 0 : _a.forEach(function (fn) { return fn(payload); });
      };
      return EventBus;
  }());

  var ROUTER_EVENTS = {
      REQUEST_NAVIGATE: "ROUTER:REQUEST_NAVIGATE",
      NAVIGATE: "ROUTER:NAVIGATE",
  };

  function enableRouterSync(eventBus, navigate) {
      eventBus.on(ROUTER_EVENTS.REQUEST_NAVIGATE, function (_a) {
          var path = _a.path;
          navigate(path);
          eventBus.emit(ROUTER_EVENTS.NAVIGATE, { path: path });
      });
  }

  var MFEHost = /** @class */ (function () {
      function MFEHost(options) {
          if (options === void 0) { options = {}; }
          var _a, _b;
          this.eventBus = new EventBus();
          this.isolate = false;
          this.stores = (_a = options.stores) !== null && _a !== void 0 ? _a : {};
          this.navigate = options.navigate;
          this.onRemoteError = options.onRemoteError;
          this.fallback = options.fallback;
          this.isolate = (_b = options.isolate) !== null && _b !== void 0 ? _b : false;
          if (this.navigate) {
              enableRouterSync(this.eventBus, this.navigate);
          }
      }
      /** Load remote JS only */
      MFEHost.prototype.load = function (url, global) {
          var _a, _b;
          return __awaiter(this, void 0, void 0, function () {
              var err_1, remote, err;
              return __generator(this, function (_c) {
                  switch (_c.label) {
                      case 0:
                          _c.trys.push([0, 2, , 3]);
                          return [4 /*yield*/, loadScript(url, { retries: 1 })];
                      case 1:
                          _c.sent();
                          return [3 /*break*/, 3];
                      case 2:
                          err_1 = _c.sent();
                          (_a = this.onRemoteError) === null || _a === void 0 ? void 0 : _a.call(this, err_1);
                          throw err_1;
                      case 3:
                          remote = window[global];
                          if (!(remote === null || remote === void 0 ? void 0 : remote.mount)) {
                              err = new Error("Remote \"".concat(global, "\" not found"));
                              (_b = this.onRemoteError) === null || _b === void 0 ? void 0 : _b.call(this, err);
                              throw err;
                          }
                          return [2 /*return*/, remote];
                  }
              });
          });
      };
      /** Mount remote with optional Shadow DOM isolation */
      MFEHost.prototype.mount = function (remote, el, name, options) {
          var _a, _b;
          var isolate = (_a = options === null || options === void 0 ? void 0 : options.isolate) !== null && _a !== void 0 ? _a : this.isolate;
          var mountEl = el;
          // Shadow DOM isolation
          if (isolate) {
              if (el._shadowRoot)
                  el._shadowRoot.innerHTML = "";
              var mode = (_b = options === null || options === void 0 ? void 0 : options.shadowMode) !== null && _b !== void 0 ? _b : "open";
              // @ts-ignore
              var shadow = el.attachShadow({ mode: mode })(el)._shadowRoot = shadow;
              // For React/Vue remotes, create container div
              var container = document.createElement("div");
              shadow.appendChild(container);
              // @ts-ignore
              mountEl = container(el)._mountEl = container;
          }
          var ctx = {
              name: name,
              stores: this.stores,
              eventBus: this.eventBus,
              host: { navigate: this.navigate },
          };
          try {
              remote.mount(mountEl, ctx);
              console.log("[MFE] mounted ".concat(name, " ").concat(isolate ? "(shadow)" : ""));
          }
          catch (err) {
              var error = err;
              console.error("[MFE] remote ".concat(name, " mount failed:"), error);
              if (this.onRemoteError)
                  this.onRemoteError(error);
              if (this.fallback) {
                  this.fallback(mountEl, name, error, ctx);
              }
              else {
                  mountEl.innerHTML = "<div style=\"color:red\">Failed to load ".concat(name, "</div>");
              }
          }
      };
      /** Unmount remote */
      MFEHost.prototype.unmount = function (remote, el, name) {
          var _a, _b, _c, _d;
          try {
              var mountEl = (_a = el._mountEl) !== null && _a !== void 0 ? _a : (this.isolate ? (_b = el.shadowRoot) !== null && _b !== void 0 ? _b : el : el);
              (_c = remote.unmount) === null || _c === void 0 ? void 0 : _c.call(remote, mountEl);
              delete el._mountEl;
              if (name)
                  console.log("[MFE] unmounted ".concat(name));
          }
          catch (err) {
              (_d = this.onRemoteError) === null || _d === void 0 ? void 0 : _d.call(this, err);
          }
      };
      /** Get central event bus */
      MFEHost.prototype.getEventBus = function () {
          return this.eventBus;
      };
      /** Reload remote: unmount + reload script + mount again */
      MFEHost.prototype.reloadRemote = function (options) {
          var _a, _b, _c;
          return __awaiter(this, void 0, void 0, function () {
              var name, url, global, el, isolate, oldRemote, mountEl, newRemote;
              return __generator(this, function (_d) {
                  switch (_d.label) {
                      case 0:
                          name = options.name, url = options.url, global = options.global, el = options.el, isolate = options.isolate;
                          try {
                              oldRemote = window[global];
                              mountEl = (_a = el._mountEl) !== null && _a !== void 0 ? _a : ((isolate !== null && isolate !== void 0 ? isolate : this.isolate) ? (_b = el.shadowRoot) !== null && _b !== void 0 ? _b : el : el);
                              (_c = oldRemote === null || oldRemote === void 0 ? void 0 : oldRemote.unmount) === null || _c === void 0 ? void 0 : _c.call(oldRemote, mountEl);
                          }
                          catch (_e) { }
                          delete window[global];
                          return [4 /*yield*/, this.load("".concat(url, "?t=").concat(Date.now()), global)];
                      case 1:
                          newRemote = _d.sent();
                          this.mount(newRemote, el, name, { isolate: isolate });
                          return [2 /*return*/];
                  }
              });
          });
      };
      return MFEHost;
  }());

  function createSharedStore(initial) {
      var state = initial;
      var listeners = new Set();
      return {
          getState: function () {
              return state;
          },
          /** Update state (shallow merge) */
          setState: function (partial) {
              state = __assign(__assign({}, state), partial);
              listeners.forEach(function (listener) { return listener(state); });
          },
          /** Subscribe to state changes */
          subscribe: function (fn, callImmediately) {
              if (callImmediately === void 0) { callImmediately = true; }
              listeners.add(fn);
              if (callImmediately)
                  fn(state); // Immediately call listener with current state
              return function () { return listeners.delete(fn); };
          },
      };
  }

  function createSharedRouter(ctx) {
      var eventBus = ctx.eventBus, name = ctx.name;
      return {
          /** Remote → Host */
          go: function (path) {
              eventBus.emit(ROUTER_EVENTS.REQUEST_NAVIGATE, {
                  from: name,
                  path: path,
              });
          },
          /** Host → Remote */
          onChange: function (cb) {
              return eventBus.on(ROUTER_EVENTS.NAVIGATE, function (payload) {
                  cb(payload.path);
              });
          },
      };
  }

  exports.EventBus = EventBus;
  exports.MFEHost = MFEHost;
  exports.createSharedRouter = createSharedRouter;
  exports.createSharedStore = createSharedStore;
  exports.enableRouterSync = enableRouterSync;
  exports.loadScript = loadScript;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
