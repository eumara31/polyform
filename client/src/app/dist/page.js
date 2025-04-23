"use strict";
exports.__esModule = true;
var NavigationBeam_1 = require("./components/NavigationBeam");
var ItemContainer_1 = require("./components/ItemContainer");
var Item_1 = require("./components/Item");
var ItemSwiper_1 = require("./components/ItemSwiper");
function Home() {
    return (React.createElement(React.Fragment, null,
        React.createElement(NavigationBeam_1["default"], { name: "\u041B\u0443\u0447\u0448\u0438\u0435 \u043C\u043E\u0434\u0435\u043B\u0438", logo: "trophy.svg" }),
        React.createElement(ItemSwiper_1["default"], { swiperDirection: "horizontal", spaceBetweenItems: 30, itemsPerView: 3 },
            React.createElement(Item_1["default"], { modelName: "" }),
            React.createElement(Item_1["default"], { modelName: "" }),
            React.createElement(Item_1["default"], { modelName: "" }),
            React.createElement(Item_1["default"], { modelName: "" }),
            React.createElement(Item_1["default"], { modelName: "" }),
            React.createElement(Item_1["default"], { modelName: "" })),
        React.createElement(NavigationBeam_1["default"], { name: "\u0422\u043E\u043F \u043F\u0440\u043E\u0434\u0430\u0436", logo: "bookmark_star.svg" }),
        React.createElement(ItemContainer_1["default"], null,
            React.createElement(Item_1["default"], { modelName: "" }),
            React.createElement(Item_1["default"], { modelName: "" }),
            React.createElement(Item_1["default"], { modelName: "" }),
            React.createElement(Item_1["default"], { modelName: "" }),
            React.createElement(Item_1["default"], { modelName: "" }))));
}
exports["default"] = Home;
