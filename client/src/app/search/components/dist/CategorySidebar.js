'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var CategorySidebar_module_css_1 = require("@/app/styles/CategorySidebar.module.css");
var PriceSlider_1 = require("./PriceSlider");
var CollapsibleList_1 = require("./CollapsibleList");
var MultipleToggleGroup_1 = require("./MultipleToggleGroup");
var store_1 = require("@/app/store");
function CategorySidebar(_a) {
    var children = _a.children;
    var categories = store_1.useSearchStore(function (state) { return state.categories; });
    var minPrice = store_1.useSearchStore(function (state) { return state.minPrice; });
    var maxPrice = store_1.useSearchStore(function (state) { return state.maxPrice; });
    var features = store_1.useSearchStore(function (state) { return state.features; });
    var materials = store_1.useSearchStore(function (state) { return state.materials; });
    var licenses = store_1.useSearchStore(function (state) { return state.licenses; });
    var setCategories = store_1.useSearchStore(function (state) { return state.setCategories; });
    var setMinPrice = store_1.useSearchStore(function (state) { return state.setMinPrice; });
    var setMaxPrice = store_1.useSearchStore(function (state) { return state.setMaxPrice; });
    var setFeatures = store_1.useSearchStore(function (state) { return state.setFeatures; });
    var setMaterials = store_1.useSearchStore(function (state) { return state.setMaterials; });
    var setLicenses = store_1.useSearchStore(function (state) { return state.setLicenses; });
    var resetSearchStore = store_1.useSearchStore(function (state) { return state.reset; });
    var categoryImageSize = 28;
    react_1.useEffect(function () {
    }, [categories, minPrice, maxPrice, features, materials, licenses]);
    function handleLicensesUpdate(groupState) {
        var selectedKeys = Object.keys(groupState).filter(function (key) { return groupState[key].isActive; });
        setLicenses(selectedKeys);
    }
    ;
    return (react_1["default"].createElement("div", { id: CategorySidebar_module_css_1["default"]["category-layout"] },
        react_1["default"].createElement("div", { id: CategorySidebar_module_css_1["default"]["category-sidebar"] },
            react_1["default"].createElement("h1", { className: CategorySidebar_module_css_1["default"]["sidebar-h1"] }, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"),
            react_1["default"].createElement(CollapsibleList_1["default"], null, [
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
                return (react_1["default"].createElement("li", { key: text },
                    react_1["default"].createElement(image_1["default"], { src: "../img/" + src, height: categoryImageSize, width: categoryImageSize, alt: "" }),
                    react_1["default"].createElement("span", null, text)));
            })),
            react_1["default"].createElement("h1", { className: CategorySidebar_module_css_1["default"]["sidebar-h1"] }, "\u0426\u0435\u043D\u0430"),
            react_1["default"].createElement(PriceSlider_1["default"], null),
            react_1["default"].createElement("h1", { className: CategorySidebar_module_css_1["default"]["sidebar-h1"] }, "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C"),
            react_1["default"].createElement("div", { className: CategorySidebar_module_css_1["default"]["checkbox-container"] }, [
                "Многосоставная",
                "Подвижная",
                "Жёсткая",
                "Гибкая",
                "Эластичная",
            ].map(function (label) { return (react_1["default"].createElement("label", { key: label, className: CategorySidebar_module_css_1["default"]["checkbox-subcontainer"] },
                react_1["default"].createElement("input", { type: "checkbox" }),
                react_1["default"].createElement("span", { className: CategorySidebar_module_css_1["default"]["checkbox-text"] }, label))); })),
            react_1["default"].createElement("h1", { className: CategorySidebar_module_css_1["default"]["sidebar-h2"] }, "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B"),
            react_1["default"].createElement("div", { className: CategorySidebar_module_css_1["default"]["checkbox-container"] }, ["PLA", "ABS", "PETG", "TPU", "Resin"].map(function (label) { return (react_1["default"].createElement("label", { key: label, className: CategorySidebar_module_css_1["default"]["checkbox-subcontainer"] },
                react_1["default"].createElement("input", { type: "checkbox" }),
                react_1["default"].createElement("span", { className: CategorySidebar_module_css_1["default"]["checkbox-text"] }, label))); })),
            react_1["default"].createElement("h1", { className: CategorySidebar_module_css_1["default"]["sidebar-h2"] }, "\u041B\u0438\u0446\u0435\u043D\u0437\u0438\u0438"),
            react_1["default"].createElement(MultipleToggleGroup_1["default"], { onGroupSelect: handleLicensesUpdate, items: [
                    "MIT",
                    "GPL",
                    "Apache",
                    "BSD",
                    "LGPL",
                    "MPL",
                    "EPL",
                    "Unlicense",
                ] })),
        react_1["default"].createElement("div", { id: CategorySidebar_module_css_1["default"]["item-container"] }, children)));
}
exports["default"] = CategorySidebar;
