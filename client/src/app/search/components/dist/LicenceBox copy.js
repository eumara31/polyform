"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var CategorySidebar_module_css_1 = require("@/app/styles/CategorySidebar.module.css");
function LicenceBox(_a) {
    var children = _a.children, updateLicence = _a.updateLicence;
    var _b = react_1.useState(null), activeLicence = _b[0], setActiveLicence = _b[1];
    var licences = [
        "MIT",
        "GPL",
        "Apache",
        "BSD",
        "LGPL",
        "MPL",
        "EPL",
        "Unlicense",
    ];
    var handleLicenceClick = function (licence) {
        setActiveLicence(function (prev) { return (prev === licence ? null : licence); });
    };
    react_1.useEffect(function () {
        updateLicence(activeLicence);
    }, [activeLicence]);
    return (react_1["default"].createElement("div", { id: CategorySidebar_module_css_1["default"]["format-container"] }, licences.map(function (licence) { return (react_1["default"].createElement("div", { key: licence, onClick: function () { return handleLicenceClick(licence); }, className: CategorySidebar_module_css_1["default"]["format"], style: {
            backgroundColor: activeLicence === licence ? "white" : "#363537",
            color: activeLicence === licence ? "#363537" : "white"
        } }, licence)); })));
}
exports["default"] = LicenceBox;
