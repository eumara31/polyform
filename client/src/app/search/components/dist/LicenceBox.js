"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CategorySidebar_module_css_1 = require("@/app/styles/CategorySidebar.module.css");
function SingleToggleGroup(_a) {
    var items = _a.items, onGroupSelect = _a.onGroupSelect;
    var _b = react_1.useState(null), activeGroup = _b[0], setActiveGroup = _b[1];
    var handleGroupClick = function (item) {
        setActiveGroup(function (prev) { return (prev === item ? null : item); });
    };
    react_1.useEffect(function () {
        onGroupSelect(activeGroup);
    }, [activeGroup]);
    return (react_1["default"].createElement("div", { id: CategorySidebar_module_css_1["default"]["format-container"] }, items.map(function (item) { return (react_1["default"].createElement("div", { key: item, onClick: function () { return handleGroupClick(item); }, className: CategorySidebar_module_css_1["default"]["format"], style: {
            backgroundColor: activeGroup === item ? "white" : "#363537",
            color: activeGroup === item ? "#363537" : "white"
        } }, item)); })));
}
exports["default"] = SingleToggleGroup;
