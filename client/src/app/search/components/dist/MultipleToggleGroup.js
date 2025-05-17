'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var CategorySidebar_module_css_1 = require("@/app/styles/CategorySidebar.module.css");
function MultipleToggleGroup(_a) {
    var items = _a.items, onGroupSelect = _a.onGroupSelect;
    var _b = react_1.useState({}), groupState = _b[0], setGroupState = _b[1];
    react_1.useEffect(function () {
        var initialState = {};
        items.forEach(function (item) {
            initialState[item] = {
                ref: react_1["default"].createRef(),
                isActive: false
            };
        });
        setGroupState(initialState);
    }, [items]);
    var handleClick = function (item) {
        setGroupState(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[item] = __assign(__assign({}, prev[item]), { isActive: !prev[item].isActive }), _a)));
        });
    };
    react_1.useEffect(function () {
        onGroupSelect === null || onGroupSelect === void 0 ? void 0 : onGroupSelect(groupState);
    }, [groupState]);
    return (react_1["default"].createElement("div", { id: CategorySidebar_module_css_1["default"]["format-container"] }, items.map(function (item) {
        var _a, _b, _c;
        return (react_1["default"].createElement("div", { key: item, ref: (_a = groupState[item]) === null || _a === void 0 ? void 0 : _a.ref, onClick: function () { return handleClick(item); }, className: CategorySidebar_module_css_1["default"]["format"], style: {
                backgroundColor: ((_b = groupState[item]) === null || _b === void 0 ? void 0 : _b.isActive) ? "white" : "#363537",
                color: ((_c = groupState[item]) === null || _c === void 0 ? void 0 : _c.isActive) ? "#363537" : "white"
            } }, item));
    })));
}
exports["default"] = MultipleToggleGroup;
