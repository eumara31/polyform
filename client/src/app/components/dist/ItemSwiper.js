"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ItemSwiper_module_css_1 = require("../styles/ItemSwiper.module.css");
var react_2 = require("swiper/react");
var modules_1 = require("swiper/modules");
require("swiper/css");
require("swiper/css/scrollbar");
function ItemSwiper(_a) {
    var children = _a.children, swiperDirection = _a.swiperDirection, spaceBetweenItems = _a.spaceBetweenItems, itemsPerView = _a.itemsPerView, keyboardControl = _a.keyboardControl, wheelControl = _a.wheelControl, scrollControl = _a.scrollControl, swiperId = _a.swiperId, swiperSlideClass = _a.swiperSlideClass;
    react_1.useEffect(function () {
        console.log(swiperSlideClass);
    }, []);
    return (react_1["default"].createElement(react_2.Swiper, { id: swiperId ? ItemSwiper_module_css_1["default"][swiperId] : ItemSwiper_module_css_1["default"]["item-swiper"], direction: swiperDirection, spaceBetween: spaceBetweenItems, slidesPerView: itemsPerView, modules: [modules_1.Keyboard, modules_1.Mousewheel, modules_1.Scrollbar], keyboard: keyboardControl ? { enabled: true } : undefined, mousewheel: wheelControl ? { forceToAxis: true, sensitivity: 1 } : undefined, scrollbar: scrollControl ? { el: ".swiper-scrollbar", draggable: true, hide: false } : undefined }, react_1["default"].Children.map(children, function (child, index) { return (react_1["default"].createElement(react_2.SwiperSlide, { className: ItemSwiper_module_css_1["default"][swiperSlideClass], key: index }, child)); })));
}
exports["default"] = ItemSwiper;
