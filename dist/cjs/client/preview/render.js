"use strict";

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.freeze.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = void 0;
exports.renderToDOM = renderToDOM;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

require("core-js/modules/web.url-search-params.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.function.name.js");

var _global = _interopRequireDefault(require("global"));

var _tsDedent = _interopRequireDefault(require("ts-dedent"));

var _previewWeb = require("@storybook/preview-web");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fetch = _global.default.fetch,
    Node = _global.default.Node;

var defaultFetchStoryHtml = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, path, params, storyContext) {
    var fetchUrl, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fetchUrl = new URL("".concat(url, "/").concat(path));
            fetchUrl.search = new URLSearchParams(Object.assign({}, storyContext.globals)).toString();
            _context.next = 4;
            return fetch(fetchUrl);

          case 4:
            response = _context.sent;
            return _context.abrupt("return", response.text());

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function defaultFetchStoryHtml(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var buildStoryArgs = function buildStoryArgs(args, argTypes) {
  var storyArgs = Object.assign({}, args);
  Object.keys(argTypes).forEach(function (key) {
    var argType = argTypes[key];
    var control = argType.control;
    var controlType = control && control.type.toLowerCase();
    var argValue = storyArgs[key];

    switch (controlType) {
      case 'date':
        // For cross framework & language support we pick a consistent representation of Dates as strings
        storyArgs[key] = new Date(argValue).toISOString();
        break;

      case 'object':
        // send objects as JSON strings
        storyArgs[key] = JSON.stringify(argValue);
        break;

      default:
    }
  });
  return storyArgs;
};

var render = function render(args) {};

exports.render = render;

function renderToDOM(_x5, _x6) {
  return _renderToDOM.apply(this, arguments);
}

function _renderToDOM() {
  _renderToDOM = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2, domElement) {
    var id, title, name, showMain, showError, forceRemount, storyFn, storyContext, _ref2$storyContext, parameters, args, argTypes, storyArgs, _parameters$server, url, storyId, _parameters$server$fe, fetchStoryHtml, params, fetchId, storyParams, element;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = _ref2.id, title = _ref2.title, name = _ref2.name, showMain = _ref2.showMain, showError = _ref2.showError, forceRemount = _ref2.forceRemount, storyFn = _ref2.storyFn, storyContext = _ref2.storyContext, _ref2$storyContext = _ref2.storyContext, parameters = _ref2$storyContext.parameters, args = _ref2$storyContext.args, argTypes = _ref2$storyContext.argTypes;
            // Some addons wrap the storyFn so we need to call it even though Server doesn't need the answer
            storyFn();
            storyArgs = buildStoryArgs(args, argTypes);
            _parameters$server = parameters.server, url = _parameters$server.url, storyId = _parameters$server.id, _parameters$server$fe = _parameters$server.fetchStoryHtml, fetchStoryHtml = _parameters$server$fe === void 0 ? defaultFetchStoryHtml : _parameters$server$fe, params = _parameters$server.params;
            fetchId = storyId || id;
            storyParams = Object.assign({}, params, storyArgs);
            _context2.next = 8;
            return fetchStoryHtml(url, fetchId, storyParams, storyContext);

          case 8:
            element = _context2.sent;
            showMain();

            if (!(typeof element === 'string')) {
              _context2.next = 15;
              break;
            }

            domElement.innerHTML = element;
            (0, _previewWeb.simulatePageLoad)(domElement);
            _context2.next = 24;
            break;

          case 15:
            if (!(element instanceof Node)) {
              _context2.next = 23;
              break;
            }

            if (!(domElement.firstChild === element && forceRemount === false)) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return");

          case 18:
            domElement.innerHTML = '';
            domElement.appendChild(element);
            (0, _previewWeb.simulateDOMContentLoaded)();
            _context2.next = 24;
            break;

          case 23:
            showError({
              title: "Expecting an HTML snippet or DOM node from the story: \"".concat(name, "\" of \"").concat(title, "\"."),
              description: (0, _tsDedent.default)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        Did you forget to return the HTML snippet from the story?\n        Use \"() => <your snippet or node>\" or when defining the story.\n      "])))
            });

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _renderToDOM.apply(this, arguments);
}