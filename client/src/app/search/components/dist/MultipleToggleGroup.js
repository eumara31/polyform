"use client";
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var CategorySidebar_module_css_1 = require("@/app/styles/CategorySidebar.module.css");
function MultipleToggleGroup(_a) {
    var items = _a.items, onGroupSelect = _a.onGroupSelect;
    var _b = react_1.useState([]), selectedItems = _b[0], setSelectedItems = _b[1];
    var handleClick = react_1.useCallback(function (item) {
        setSelectedItems(function (prev) {
            var newSelectedItems = prev.includes(item)
                ? prev.filter(function (selected) { return selected !== item; })
                : __spreadArrays(prev, [item]);
            // Передаем новый массив выбранных элементов в родительский компонент
            onGroupSelect === null || onGroupSelect === void 0 ? void 0 : onGroupSelect(newSelectedItems);
            return newSelectedItems;
        });
    }, [onGroupSelect]);
    return (react_1["default"].createElement("div", { id: CategorySidebar_module_css_1["default"]["format-container"] }, items.map(function (item) {
        return (react_1["default"].createElement("div", { key: item, onClick: function () { handleClick(item); }, className: CategorySidebar_module_css_1["default"]["format"], style: {
                backgroundColor: selectedItems.includes(item) ? "white" : "#363537",
                color: selectedItems.includes(item) ? "#363537" : "white"
            } }, item));
    })));
}
exports["default"] = MultipleToggleGroup;
