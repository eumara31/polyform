"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ItemContainer_1 = require("@/app/components/ItemContainer");
var Item_1 = require("@/app/components/Item");
var CategorySidebar_1 = require("./components/CategorySidebar");
function page(_a) {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(CategorySidebar_1["default"], null,
            react_1["default"].createElement(ItemContainer_1["default"], null,
                react_1["default"].createElement(Item_1["default"], null),
                react_1["default"].createElement(Item_1["default"], null),
                react_1["default"].createElement(Item_1["default"], null),
                react_1["default"].createElement(Item_1["default"], null),
                react_1["default"].createElement(Item_1["default"], null)))));
}
exports["default"] = page;
