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
//стейт обновляется асинхронно - не забыть об этом когда буду заниматься вебсокетами
function FormatBox(_a) {
    var children = _a.children, updateFormatArray = _a.updateFormatArray;
    var _b = react_1.useState({}), formatRefDict = _b[0], setFormatRefDict = _b[1];
    var formats = [
        "STL",
        "OBJ",
        "FBX",
        "AMF",
        "3MF",
        "GCODE",
        "PLY",
        "STEP",
        "IGES",
    ];
    react_1.useEffect(function () {
        var initialDict = {};
        formats.forEach(function (format) {
            initialDict[format] = {
                ref: react_1["default"].createRef(),
                isActive: false
            };
        });
        setFormatRefDict(initialDict);
    }, []);
    var handleFormatClick = function (format) {
        setFormatRefDict(function (prevDict) {
            var _a;
            return __assign(__assign({}, prevDict), (_a = {}, _a[format] = __assign(__assign({}, prevDict[format]), { isActive: !prevDict[format].isActive }), _a));
        });
    };
    react_1.useEffect(function () {
        updateFormatArray(formatRefDict);
    }, [formatRefDict]);
    return (react_1["default"].createElement("div", { id: CategorySidebar_module_css_1["default"]["format-container"] }, formats.map(function (format) {
        var _a, _b, _c;
        return (react_1["default"].createElement("div", { className: CategorySidebar_module_css_1["default"]["format"], key: format, ref: (_a = formatRefDict[format]) === null || _a === void 0 ? void 0 : _a.ref, onClick: function () { return handleFormatClick(format); }, style: {
                backgroundColor: ((_b = formatRefDict[format]) === null || _b === void 0 ? void 0 : _b.isActive) ? "white" : "#363537",
                color: ((_c = formatRefDict[format]) === null || _c === void 0 ? void 0 : _c.isActive) ? "#363537" : "white"
            } }, format));
    })));
}
exports["default"] = FormatBox;
