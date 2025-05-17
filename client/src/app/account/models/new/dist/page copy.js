"use client";
"use strict";
exports.__esModule = true;
var Header_1 = require("@/app/components/Header");
var WidthContainer_1 = require("@/app/components/WidthContainer");
var react_1 = require("react");
var AccountPage_module_css_1 = require("@/app/styles/AccountPage.module.css");
var AccountNavbar_1 = require("@/app/account/components/AccountNavbar");
var CategorySwiper_1 = require("@/app/account/components/CategorySwiper");
var FormatBox_1 = require("@/app/search/components/FormatBox");
var image_1 = require("next/image");
function Page(_a) {
    var _b = react_1.useState(8), itemsPerView = _b[0], setItemsPerView = _b[1];
    var newModelCategorySubcontainer = react_1.useRef(null);
    var newModelCategoryH1 = react_1.useRef(null);
    var categoryImageSize = 24;
    react_1.useEffect(function () {
        setItemsPerView((newModelCategorySubcontainer.current.offsetHeight -
            newModelCategoryH1.current.offsetHeight) /
            40);
    }, []);
    return (react_1["default"].createElement(WidthContainer_1["default"], null,
        react_1["default"].createElement(Header_1["default"], null),
        react_1["default"].createElement(AccountNavbar_1["default"], { tabDict: {
                0: {
                    tabName: "Ваши модели",
                    isActive: false,
                    url: "/account/models"
                },
                1: {
                    tabName: "Добавить модель",
                    isActive: true,
                    url: "/account/models/new"
                },
                2: {
                    tabName: "Снято с продажи",
                    isActive: false,
                    url: "/account/models/removed"
                }
            } }),
        react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["new-model-container"] },
            react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["new-model-text-container"] },
                react_1["default"].createElement("input", { type: "text", id: AccountPage_module_css_1["default"]["new-model-name-input"], placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435" }),
                react_1["default"].createElement("textarea", { id: AccountPage_module_css_1["default"]["new-model-textarea"], placeholder: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" })),
            react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["new-model-category-container"] },
                react_1["default"].createElement("div", { ref: newModelCategorySubcontainer, className: AccountPage_module_css_1["default"]["new-model-category-subcontainer"] },
                    react_1["default"].createElement("h1", { ref: newModelCategoryH1, className: AccountPage_module_css_1["default"]["new-model-category-h1"] }, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"),
                    react_1["default"].createElement(CategorySwiper_1["default"], { swiperDirection: "vertical", spaceBetweenItems: 5, itemsPerView: 8, wheelControl: true, scrollControl: true, keyboardControl: true }, [
                        { src: "person.svg", text: "Персонажи" },
                        { src: "cottage.svg", text: "Архитектура" },
                        { src: "car.svg", text: "Транспорт" },
                        { src: "bow.svg", text: "Оружие" },
                        { src: "park.svg", text: "Растения" },
                        { src: "chair.svg", text: "Мебель" },
                        { src: "devices.svg", text: "Технологии" },
                        { src: "apparel.svg", text: "Аксессуары" },
                        { src: "manufacturing.svg", text: "Механизмы" },
                        { src: "service_toolbox.svg", text: "Инструменты" },
                        { src: "shield.svg", text: "Фэнтези" },
                        { src: "experiment.svg", text: "Наука" },
                        { src: "fitness_center.svg", text: "Спорт" },
                        { src: "cruelty_free.svg", text: "Животные" },
                        { src: "brush.svg", text: "Художество" },
                        { src: "headphones.svg", text: "Музыка" },
                    ].map(function (_a) {
                        var src = _a.src, text = _a.text;
                        return (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(image_1["default"], { src: "/img/" + src, height: categoryImageSize, width: categoryImageSize, alt: "" }),
                            react_1["default"].createElement("span", null, text)));
                    }))),
                react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["new-model-category-subcontainer"] },
                    react_1["default"].createElement("h1", { ref: newModelCategoryH1, className: AccountPage_module_css_1["default"]["new-model-category-h1"] }, "\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u0430"),
                    react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["checkbox-container"] }, [
                        "Многосоставная",
                        "Подвижная",
                        "Жёсткая",
                        "Гибкая",
                        "Эластичная",
                    ].map(function (label) { return (react_1["default"].createElement("label", { key: label, className: AccountPage_module_css_1["default"]["checkbox-subcontainer"] },
                        react_1["default"].createElement("input", { type: "checkbox" }),
                        react_1["default"].createElement("span", { className: AccountPage_module_css_1["default"]["checkbox-text"] }, label))); })),
                    react_1["default"].createElement("h1", { ref: newModelCategoryH1, className: AccountPage_module_css_1["default"]["new-model-category-h1"] }, "\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B"),
                    react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["checkbox-container"] }, ["PLA", "ABS", "PETG", "TPU", "Resin"].map(function (label) { return (react_1["default"].createElement("label", { key: label, className: AccountPage_module_css_1["default"]["checkbox-subcontainer"] },
                        react_1["default"].createElement("input", { type: "checkbox" }),
                        react_1["default"].createElement("span", { className: AccountPage_module_css_1["default"]["checkbox-text"] }, label))); }))),
                react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["format-price"], className: AccountPage_module_css_1["default"]["new-model-category-subcontainer"] },
                    react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["new-model-category-subcontainer-l2"] },
                        react_1["default"].createElement("h1", { className: AccountPage_module_css_1["default"]["new-model-category-h1"] }, "\u0424\u043E\u0440\u043C\u0430\u0442\u044B"),
                        react_1["default"].createElement(FormatBox_1["default"], null)),
                    react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["new-model-category-subcontainer-l2"] },
                        react_1["default"].createElement("input", { type: "text", placeholder: "\u0446\u0435\u043D\u0430" }),
                        react_1["default"].createElement("button", null, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C")))),
            react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["new-model-upload-container"] },
                react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["new-model-upload-subcontainer"] },
                    react_1["default"].createElement("input", { id: "model-upload", type: "file" }),
                    react_1["default"].createElement("label", { htmlFor: "model-upload", id: AccountPage_module_css_1["default"]["custom-model-upload"] },
                        react_1["default"].createElement("div", { style: {
                                fontSize: "48px"
                            } },
                            react_1["default"].createElement(image_1["default"], { src: "/img/add_model.svg", width: 32, height: 32, alt: "" })),
                        react_1["default"].createElement("div", null, "\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043C\u043E\u0434\u0435\u043B\u044C")))),
            react_1["default"].createElement("div", null))));
}
exports["default"] = Page;
