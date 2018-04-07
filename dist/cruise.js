// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({3:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = function () {
  function Component() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Component);

    this.props = props;
    this.state = {};
    this.componentKey = '0';
    this.children = [];
  }

  _createClass(Component, [{
    key: 'setState',
    value: function setState(state) {
      this.state = Object.assign(this.state, state);
      var dom = document.querySelector('[' + Component.componentKeyName + '="' + this.componentKey + '"]');
      if (dom) {
        dom.outerHTML = this.createHTML();
        // dom._componentDidMount();
      }
    }
  }, {
    key: 'createHTML',
    value: function createHTML() {
      var html = this.render();
      var dom = new DOMParser().parseFromString(html, 'text/html').body.firstChild;
      dom.setAttribute(Component.componentKeyName, this.componentKey);
      return dom.outerHTML;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: '__componentDidMount',
    value: function __componentDidMount() {
      this.__DOM = document.querySelector('[' + Component.componentKeyName + '="' + this.componentKey + '"]');
      this.componentDidMount();
      this.children.map(function (child) {
        return child.__componentDidMount();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return '';
    }
  }, {
    key: 'refresh',
    value: function refresh(html, dom) {
      this.children = [];
      this.__DOM.outerHTML = this.createHTML();
      this.__componentDidMount();
    }
  }], [{
    key: 'renderToDOM',
    value: function renderToDOM(html, dom) {
      dom.innerHTML = html;
      Component.__rootComponent.__componentDidMount();
    }
  }, {
    key: 'init',
    value: function init() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var children = arguments[1];
      var parent = arguments[2];

      var newProps = Object.assign(props, { children: children });
      var newComponent = new this(newProps);
      if (parent) {
        newComponent.componentKey = parent.componentKey + '.' + parent.children.length;
        parent.children.push(newComponent);
      } else {
        Component.__rootComponent = newComponent;
      }
      return newComponent.createHTML();
    }
  }, {
    key: 'map',
    value: function map(list, callback) {
      return list.map(function (item) {
        return callback(item);
      }).join('');
    }
  }]);

  return Component;
}();

exports.default = Component;


Component.componentKeyCount = 0;
Component.componentKeyName = 'component-key';
},{}],7:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Resource = function (_Component) {
  _inherits(Resource, _Component);

  function Resource(props) {
    _classCallCheck(this, Resource);

    return _possibleConstructorReturn(this, (Resource.__proto__ || Object.getPrototypeOf(Resource)).call(this, props));
  }

  _createClass(Resource, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          removeResource = _props.removeResource,
          children = _props.children;

      this.__DOM.addEventListener('click', function (event) {
        removeResource(children);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return '<div>\n              <span>' + children + '</span>\n              <span>X</span>\n            </div>';
    }
  }]);

  return Resource;
}(_Component3.default);

exports.default = Resource;
},{"./Component":3}],9:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceModal = function (_Component) {
  _inherits(ResourceModal, _Component);

  function ResourceModal(props) {
    _classCallCheck(this, ResourceModal);

    return _possibleConstructorReturn(this, (ResourceModal.__proto__ || Object.getPrototypeOf(ResourceModal)).call(this, props));
  }

  _createClass(ResourceModal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          toggleModal = _props.toggleModal,
          addResources = _props.addResources;

      this.__DOM.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault();
        console.dir();
        addResources(event.target[0].value.split(','));
      });
      this.__DOM.querySelector('input[type="button"]').addEventListener('click', function (event) {
        toggleModal(false);
      });
    }
  }, {
    key: 'render',
    value: function render() {

      return '<div>\n              <form>\n                <input type="text">\n                <input type="button" value="Cancel">\n                <input type="submit" value="Submit">\n              </form>\n            </div>';
    }
  }]);

  return ResourceModal;
}(_Component3.default);

exports.default = ResourceModal;
},{"./Component":3}],6:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Resource = require('./Resource');

var _Resource2 = _interopRequireDefault(_Resource);

var _ResourceModal = require('./ResourceModal');

var _ResourceModal2 = _interopRequireDefault(_ResourceModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourcesList = function (_Component) {
  _inherits(ResourcesList, _Component);

  function ResourcesList(props) {
    _classCallCheck(this, ResourcesList);

    var _this = _possibleConstructorReturn(this, (ResourcesList.__proto__ || Object.getPrototypeOf(ResourcesList)).call(this, props));

    _this.removeResource = function (name) {
      var resources = _this.props.resources;

      var index = resources.indexOf(name);
      resources.splice(index, 1);
      _this.refresh();
    };

    _this.addResources = function (newResources) {
      var resources = _this.props.resources;

      resources.splice.apply(resources, [resources.length, 0].concat(_toConsumableArray(newResources)));
      _this.isOpenModal = false;
      _this.refresh();
    };

    _this.toggleModal = function (state) {
      _this.isOpenModal = state;
      _this.refresh();
    };

    _this.isOpenModal = false;
    return _this;
  }

  _createClass(ResourcesList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.__DOM.querySelector('span').addEventListener('click', function (event) {
        _this2.toggleModal(true);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var resources = this.props.resources;
      var removeResource = this.removeResource,
          toggleModal = this.toggleModal,
          addResources = this.addResources;


      return '<div>\n              <span>Add Resource</span>\n              <ul>\n                ' + _Component3.default.map(resources, function (resource) {
        return _Resource2.default.init({ removeResource: removeResource }, resource, _this3);
      }) + '\n              </ul>\n              ' + (this.isOpenModal ? _ResourceModal2.default.init({ toggleModal: toggleModal, addResources: addResources }, null, this) : '') + '\n            </div>';
    }
  }]);

  return ResourcesList;
}(_Component3.default);

exports.default = ResourcesList;
},{"./Component":3,"./Resource":7,"./ResourceModal":9}],5:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

var _ResourcesList = require('./ResourcesList');

var _ResourcesList2 = _interopRequireDefault(_ResourcesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Agent = function (_Component) {
  _inherits(Agent, _Component);

  function Agent(props) {
    _classCallCheck(this, Agent);

    return _possibleConstructorReturn(this, (Agent.__proto__ || Object.getPrototypeOf(Agent)).call(this, props));
  }

  _createClass(Agent, [{
    key: 'render',
    value: function render() {
      var agent = this.props.agent;
      var resources = agent.resources;

      return '<li>\n               <h3>' + agent.domain + '</h3>\n               <h3>' + agent.ip + '</h3>\n               <h3>' + agent.path + '</h3>\n               ' + _ResourcesList2.default.init({ resources: resources }, null, this) + '\n           </li>';
    }
  }]);

  return Agent;
}(_Component3.default);

exports.default = Agent;
},{"./Component":3,"./ResourcesList":6}],4:[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require('./Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Agent = require('./Agent');

var _Agent2 = _interopRequireDefault(_Agent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AgentsList = function (_Component) {
  _inherits(AgentsList, _Component);

  function AgentsList(props) {
    _classCallCheck(this, AgentsList);

    return _possibleConstructorReturn(this, (AgentsList.__proto__ || Object.getPrototypeOf(AgentsList)).call(this, props));
  }

  _createClass(AgentsList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var agents = this.props.agents;

      return '<ul>' + _Component3.default.map(agents, function (agent) {
        return _Agent2.default.init({ agent: agent }, null, _this2);
      }) + '<ul>';
    }
  }]);

  return AgentsList;
}(_Component3.default);

exports.default = AgentsList;
},{"./Component":3,"./Agent":5}],2:[function(require,module,exports) {
'use strict';

var _Component = require('./src/Component');

var _Component2 = _interopRequireDefault(_Component);

var _AgentsList = require('./src/AgentsList');

var _AgentsList2 = _interopRequireDefault(_AgentsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var agents = [{
  domain: 'a01.thoughtworks.com',
  ip: '192.168.1.101',
  path: '/var/lib/cruise',
  resources: ['Chrome', 'FireFox']
}, {
  domain: 'a01.thoughtworks.com',
  ip: '192.168.1.101',
  path: '/var/lib/cruise',
  resources: ['Chrome', 'FireFox', 'Safari']
}];

window.agents = agents;

_Component2.default.renderToDOM(_AgentsList2.default.init({ agents: agents }), document.querySelector('#root'));
},{"./src/Component":3,"./src/AgentsList":4}],11:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '63345' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[11,2])
//# sourceMappingURL=/dist/cruise.map