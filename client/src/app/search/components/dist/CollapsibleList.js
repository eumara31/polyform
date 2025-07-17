"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var CollapsibleList_module_css_1 = require("@/app/styles/CollapsibleList.module.css");
var react_2 = require("@gsap/react");
var gsap_1 = require("gsap");
gsap_1["default"].registerPlugin(react_2.useGSAP);
function CollapsibleList(_a) {
    var elements = _a.elements, onElementSelect = _a.onElementSelect, _b = _a.imageSize, imageSize = _b === void 0 ? 32 : _b;
    var _c = react_1.useState(false), isExpanded = _c[0], setIsExpanded = _c[1];
    var _d = react_1.useState("down"), arrowState = _d[0], setArrowState = _d[1];
    var collapsibleListRef = react_1.useRef(null);
    var collapsibleButtonRef = react_1.useRef(null);
    var contextSafe = react_2.useGSAP().contextSafe;
    var expandList = contextSafe(function () {
        if (!isExpanded) {
            gsap_1["default"].to(collapsibleListRef.current, {
                height: "auto",
                duration: 1,
                ease: "power2.inOut"
            });
            gsap_1["default"].to(collapsibleButtonRef.current, {
                background: 'linear-gradient(to top, rgba(54,53,55,1) 0, rgba(255,255,255,0) 0%)',
                duration: 0.5,
                ease: "power2.inOut"
            });
            setIsExpanded(true);
            setArrowState("up");
        }
        else {
            gsap_1["default"].to(collapsibleListRef.current, {
                height: "140px",
                duration: 1,
                ease: "power2.inOut"
            });
            gsap_1["default"].to(collapsibleButtonRef.current, {
                background: 'linear-gradient(to top, rgba(54,53,55,1) 30%, rgba(255,255,255,0) 100%)',
                duration: 0.5,
                ease: "power2.inOut"
            });
            setIsExpanded(false);
            setArrowState("down");
        }
    });
    return (react_1["default"].createElement("div", { id: CollapsibleList_module_css_1["default"]["container"] },
        react_1["default"].createElement("ul", { ref: collapsibleListRef, id: CollapsibleList_module_css_1["default"]["collapsible-list"] }, elements.map(function (_a) {
            var src = _a.src, text = _a.text;
            return (react_1["default"].createElement("li", { key: text, onClick: function () { return onElementSelect === null || onElementSelect === void 0 ? void 0 : onElementSelect(text); } },
                react_1["default"].createElement(image_1["default"], { src: "/img/" + src, height: imageSize, width: imageSize, alt: "" }),
                react_1["default"].createElement("span", null, text)));
        })),
        react_1["default"].createElement("div", { id: CollapsibleList_module_css_1["default"]["collapsible-button"], onClick: expandList, ref: collapsibleButtonRef },
            react_1["default"].createElement(image_1["default"], { src: "/img/arrow_" + arrowState + "_ios.svg", height: 22, width: 22, alt: "" }))));
}
exports["default"] = CollapsibleList;
