'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var fiber_1 = require("@react-three/fiber");
var drei_1 = require("@react-three/drei");
var ProductMin_module_css_1 = require("../styles/ProductMin.module.css");
function Item(_a) {
    var modelName = _a.modelName;
    return (react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item"] },
        react_1["default"].createElement(fiber_1.Canvas, { className: ProductMin_module_css_1["default"]["item-canvas"] },
            react_1["default"].createElement("ambientLight", { intensity: 0.5 }),
            react_1["default"].createElement("pointLight", { position: [10, 10, 10] }),
            react_1["default"].createElement("perspectiveCamera", { position: [0, 0, 5] }),
            react_1["default"].createElement(drei_1.OrbitControls, null)),
        react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-subcontainer"] },
            react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-name"] }, "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043C\u043E\u0434\u0435\u043B\u0438"),
            react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-rating-container"] },
                react_1["default"].createElement(image_1["default"], { src: "../../img/kid_star.svg", height: 24, width: 24, alt: "" }),
                react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-rating-number"] }, "4.97")),
            react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-attributes-container"] },
                react_1["default"].createElement(image_1["default"], { src: "../../img/excl_licence.svg", height: 20, width: 40, alt: "licence" }),
                react_1["default"].createElement(image_1["default"], { src: "../img/has_parts.svg", height: 24, width: 24, alt: "" }),
                react_1["default"].createElement(image_1["default"], { src: "../img/moving.svg", height: 24, width: 24, alt: "" }),
                react_1["default"].createElement(image_1["default"], { src: "../img/flexible.svg", height: 24, width: 24, alt: "" })),
            react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-price"] }, "799 \u20BD"))));
}
exports["default"] = Item;
