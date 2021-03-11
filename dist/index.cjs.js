'use strict';

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
require('core-js/modules/es.object.assign.js');
require('core-js/modules/es.array.filter.js');
require('core-js/modules/es.array.sort.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);

/*! *****************************************************************************
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

var Callback = /*#__PURE__*/function () {
  function Callback(options) {
    _classCallCheck__default['default'](this, Callback);

    this.groups = {};
    this.items = [];
    var config = Object.assign({
      defaultOrder: 1000,
      defaultGroup: 'default',
      initDefaultGroup: true
    }, options);
    this.defaultOrder = config.defaultOrder;
    this.defaultGroup = config.defaultGroup;

    if (config.initDefaultGroup) {
      this.setGroup(this.defaultGroup);
    }
  }

  _createClass__default['default'](Callback, [{
    key: "hasGroup",
    value: function hasGroup(group) {
      return Object.prototype.hasOwnProperty.call(this.groups, group);
    }
  }, {
    key: "getGroupOrder",
    value: function getGroupOrder() {
      var group = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultGroup;

      if (this.hasGroup(group)) {
        return this.groups[group];
      }

      return this.defaultOrder;
    }
  }, {
    key: "setGroup",
    value: function setGroup(group) {
      var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.defaultOrder;
      this.groups[group] = order;
      return this;
    }
  }, {
    key: "setGroups",
    value: function setGroups(groups) {
      Object.assign(this.groups, groups);
      return this;
    }
  }, {
    key: "push",
    value: function push(item) {
      return this._add(item, 'push');
    }
  }, {
    key: "unshift",
    value: function unshift(item) {
      return this._add(item, 'unshift');
    }
  }, {
    key: "_add",
    value: function _add(_a, type) {
      var _a$group = _a.group,
          group = _a$group === void 0 ? this.defaultGroup : _a$group,
          other = __rest(_a, ["group"]);

      var item = Object.assign(Object.assign({}, other), {
        group: group
      });
      this.items[type](item);
      return this;
    }
  }, {
    key: "getItems",
    value: function getItems(filter) {
      return this.items.filter(filter);
    }
  }, {
    key: "getByGroup",
    value: function getByGroup() {
      var group = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultGroup;
      return this.sort(this.getItems(function (item) {
        return item.group === group;
      }));
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.sort(this.items);
    }
  }, {
    key: "removeItems",
    value: function removeItems(filter) {
      this.items = this.items.filter(function (item) {
        return !filter(item);
      });
      return this;
    }
  }, {
    key: "removeByGroup",
    value: function removeByGroup() {
      var group = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultGroup;
      return this.removeItems(function (item) {
        return item.group === group;
      });
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      this.items = [];
      return this;
    }
  }, {
    key: "sort",
    value: function sort(items) {
      var _this = this;

      return items.sort(function (a, b) {
        return _this.getGroupOrder(a.group) - _this.getGroupOrder(b.group);
      });
    }
  }]);

  return Callback;
}();

module.exports = Callback;
//# sourceMappingURL=index.cjs.js.map
