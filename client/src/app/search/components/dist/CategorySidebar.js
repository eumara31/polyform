"use client";
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var CategorySidebar_module_css_1 = require("@/app/styles/CategorySidebar.module.css");
var PriceSlider_1 = require("./PriceSlider");
var CollapsibleList_1 = require("./CollapsibleList");
var MultipleToggleGroup_1 = require("./MultipleToggleGroup");
var store_1 = require("@/app/store");
function CategorySidebar(_a) {
    var children = _a.children;
    var categoryImageSize = 28;
    var categories = store_1.useSearchStore(function (state) { return state.categories; });
    var features = store_1.useSearchStore(function (state) { return state.features; });
    var materials = store_1.useSearchStore(function (state) { return state.materials; });
    var licenses = store_1.useSearchStore(function (state) { return state.licenses; });
    var minPrice = store_1.useSearchStore(function (state) { return state.minPrice; });
    var maxPrice = store_1.useSearchStore(function (state) { return state.maxPrice; });
    var setCategories = store_1.useSearchStore(function (state) { return state.setCategories; });
    var setFeatures = store_1.useSearchStore(function (state) { return state.setFeatures; });
    var setMaterials = store_1.useSearchStore(function (state) { return state.setMaterials; });
    var setLicenses = store_1.useSearchStore(function (state) { return state.setLicenses; });
    var setMinPrice = store_1.useSearchStore(function (state) { return state.setMinPrice; });
    var setMaxPrice = store_1.useSearchStore(function (state) { return state.setMaxPrice; });
    var toggleArrayItem = function (arr, item) {
        return arr.includes(item) ? arr.filter(function (i) { return i !== item; }) : __spreadArrays(arr, [item]);
    };
    var handleFeatureToggle = function (label) {
        setFeatures(toggleArrayItem(features, label));
    };
    var handleMaterialToggle = function (label) {
        setMaterials(toggleArrayItem(materials, label));
    };
    var handleLicencesUpdate = function (license) {
        setLicenses(license);
    };
    react_1.useEffect(function () {
        console.log({
            features: features,
            materials: materials,
            licenses: licenses
        });
    }, [features, materials, licenses]);
    return (react_1["default"].createElement("div", { id: CategorySidebar_module_css_1["default"]["category-layout"] },
        react_1["default"].createElement("div", { id: CategorySidebar_module_css_1["default"]["category-sidebar"] },
            react_1["default"].createElement("h1", { className: CategorySidebar_module_css_1["default"]["sidebar-h1"] }, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"),
            react_1["default"].createElement(CollapsibleList_1["default"], { elements: [
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
                ], imageSize: 30 }),
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
                react_1["default"].createElement("input", { type: "checkbox", checked: features.includes(label), onChange: function () { return handleFeatureToggle(label); } }),
                react_1["default"].createElement("span", { className: CategorySidebar_module_css_1["default"]["checkbox-text"] }, label))); })),
            react_1["default"].createElement("h1", { className: CategorySidebar_module_css_1["default"]["sidebar-h2"] }, "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B"),
            react_1["default"].createElement("div", { className: CategorySidebar_module_css_1["default"]["checkbox-container"] }, ["PLA", "ABS", "PETG", "TPU", "Resin"].map(function (label) { return (react_1["default"].createElement("label", { key: label, className: CategorySidebar_module_css_1["default"]["checkbox-subcontainer"] },
                react_1["default"].createElement("input", { type: "checkbox", checked: materials.includes(label), onChange: function () { return handleMaterialToggle(label); } }),
                react_1["default"].createElement("span", { className: CategorySidebar_module_css_1["default"]["checkbox-text"] }, label))); })),
            react_1["default"].createElement("h1", { className: CategorySidebar_module_css_1["default"]["sidebar-h2"] }, "\u041B\u0438\u0446\u0435\u043D\u0437\u0438\u0438"),
            react_1["default"].createElement(MultipleToggleGroup_1["default"], { onGroupSelect: handleLicencesUpdate, items: [
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
