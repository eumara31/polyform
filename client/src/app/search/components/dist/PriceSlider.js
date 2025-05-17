"use client";
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
var react_range_1 = require("react-range");
var PriceSlider_module_css_1 = require("@/app/styles/PriceSlider.module.css");
function PriceSlider(_a) {
    var _b = react_1.useState([0, 100]), values = _b[0], setValues = _b[1];
    return (react_1["default"].createElement("div", { id: PriceSlider_module_css_1["default"]["container"] },
        react_1["default"].createElement(react_range_1.Range, { label: "Select your value", step: 0.1, min: 0, max: 100, values: values, onChange: function (values) { return setValues(values); }, renderTrack: function (_a) {
                var props = _a.props, children = _a.children;
                return (react_1["default"].createElement("div", __assign({ id: PriceSlider_module_css_1["default"]["slider-track"] }, props), children));
            }, renderThumb: function (_a) {
                var props = _a.props;
                return (react_1["default"].createElement("div", __assign({ id: PriceSlider_module_css_1["default"]["slider-thumb"] }, props, { key: props.key })));
            } }),
        react_1["default"].createElement("div", { id: PriceSlider_module_css_1["default"]["numerical-fields"] },
            react_1["default"].createElement("input", { type: "text", defaultValue: values[0] }),
            react_1["default"].createElement("input", { type: "text", defaultValue: values[1] }))));
}
exports["default"] = PriceSlider;
