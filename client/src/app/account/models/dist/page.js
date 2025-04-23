"use strict";
exports.__esModule = true;
var react_1 = require("react");
var AccountNavbar_1 = require("../components/AccountNavbar");
function page(_a) {
    return (react_1["default"].createElement(AccountNavbar_1["default"], { tabDict: {
            0: { tabName: "Учётная запись", isActive: false, url: "/account" },
            1: { tabName: "Ваши модели", isActive: true, url: "/account/models" },
            2: { tabName: "Добавить модель", isActive: false, url: "/account/models/new" },
            3: { tabName: "Снято с продажи", isActive: false, url: "/account/models/removed" }
        } }));
}
exports["default"] = page;
