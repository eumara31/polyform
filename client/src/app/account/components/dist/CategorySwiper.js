"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ItemSwiper_1 = require("@/app/components/ItemSwiper");
function CategorySwiper(_a) {
    var swiperDirection = _a.swiperDirection, spaceBetweenItems = _a.spaceBetweenItems, itemsPerView = _a.itemsPerView, wheelControl = _a.wheelControl, scrollControl = _a.scrollControl, keyboardControl = _a.keyboardControl, children = _a.children;
    var _b = react_1.useState({}), categoryRefDict = _b[0], setCategoryRefDict = _b[1];
    react_1.useEffect(function () {
        var initialDict = {};
        react_1["default"].Children.toArray(children).forEach(function (child, index) {
            initialDict[index] = {
                ref: react_1["default"].createRef(),
                isActive: false
            };
        });
        setCategoryRefDict(initialDict);
    }, []);
    function handleCategoryClick(childIndex) {
        var tmpDict = structuredClone(categoryRefDict);
        for (var i = 0; i < Object.entries(tmpDict).length; i++) {
            if (i == childIndex) {
                tmpDict[i].isActive = true;
            }
            else {
                tmpDict[i].isActive = false;
            }
        }
        setCategoryRefDict(tmpDict);
    }
    react_1.useEffect(function () {
        console.log("categoryRefDict обновился:", categoryRefDict);
    }, [categoryRefDict]);
    return (react_1["default"].createElement(ItemSwiper_1["default"], { swiperDirection: swiperDirection, spaceBetweenItems: spaceBetweenItems, itemsPerView: itemsPerView, wheelControl: wheelControl, scrollControl: scrollControl, keyboardControl: keyboardControl }, react_1["default"].Children.map(children, function (child, index) {
        var _a;
        return (react_1["default"].createElement("li", { onClick: function () {
                handleCategoryClick(index);
            }, key: index, style: {
                border: "2px solid",
                borderColor: ((_a = categoryRefDict[index]) === null || _a === void 0 ? void 0 : _a.isActive) ? "white" : "transparent",
                borderRadius: "100px",
                transition: "border-color 0.2s ease-in-out"
            } }, child));
    })));
}
exports["default"] = CategorySwiper;
