"use client";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var AccountPage_module_css_1 = require("@/app/styles/AccountPage.module.css");
var AccountNavbar_1 = require("@/app/account/components/AccountNavbar");
var CategorySwiper_1 = require("@/app/account/components/CategorySwiper");
var FormatBox_1 = require("@/app/category/[categoryName]/components/FormatBox");
var ModelUpload_1 = require("./components/ModelUpload");
var ModelPreview_1 = require("./components/ModelPreview");
var image_1 = require("next/image");
function Page(_a) {
    var _b = react_1.useState(false), showModelPreview = _b[0], setShowModelPreview = _b[1];
    var _c = react_1.useState("RUB"), currency = _c[0], setCurrency = _c[1];
    var _d = react_1.useState(""), modelURL = _d[0], setModelURL = _d[1]; //являе
    var _e = react_1.useState(""), modelFormat = _e[0], setModelFormat = _e[1];
    var _f = react_1.useState({
        name: "",
        description: "",
        category: "",
        tags: [],
        materials: [],
        formats: [],
        price: undefined,
        currency: undefined
    }), modelJson = _f[0], setModelJson = _f[1];
    var categoryImageSize = 24;
    react_1.useEffect(function () {
        setModelJson(function (prev) { return (__assign(__assign({}, prev), { currency: currency })); });
    }, []);
    react_1.useEffect(function () {
        console.log(modelJson);
    }, [modelJson]);
    function isModelJsonComplete() {
        return (modelJson.name.trim() !== "" &&
            modelJson.description.trim() !== "" &&
            modelJson.category.trim() !== "" &&
            modelJson.tags.length > 0 &&
            modelJson.materials.length > 0 &&
            modelJson.formats.length > 0 &&
            modelJson.price !== undefined &&
            modelJson.currency !== undefined);
    }
    function handleModelJsonChange(field, value) {
        setModelJson(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    }
    function handleCheckboxChange(e, field) {
        var checkboxValue = e.target.value;
        setModelJson(function (prev) {
            var _a;
            var newData = e.target.checked
                ? __spreadArrays(prev[field], [checkboxValue]) : prev[field].filter(function (val) { return val !== checkboxValue; });
            return __assign(__assign({}, prev), (_a = {}, _a[field] = newData, _a));
        });
    }
    function handleFormatChange(formatObj) {
        var formatArr = Object.entries(formatObj).reduce(function (tmp, _a) {
            var formatName = _a[0], data = _a[1];
            if (data.isActive) {
                tmp.push(formatName);
            }
            return tmp;
        }, []);
        setModelJson(function (prev) { return (__assign(__assign({}, prev), { formats: formatArr })); });
    }
    function handleCurrencyChange() {
        setCurrency(function (prev) {
            var newCurrency = prev === "RUB" ? "USD" : "RUB";
            handleModelJsonChange("currency", newCurrency);
            return newCurrency;
        });
    }
    function handleModelSubmission() {
        if (!isModelJsonComplete() || !modelURL) {
            alert("Заполните все поля");
        }
        else {
            alert("Отправлено");
        }
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(AccountNavbar_1["default"], { tabDict: {
                0: { tabName: "Учётная запись", isActive: false, url: "/account" },
                1: {
                    tabName: "Ваши модели",
                    isActive: false,
                    url: "/account/models"
                },
                2: {
                    tabName: "Добавить модель",
                    isActive: true,
                    url: "/account/models/new"
                },
                3: {
                    tabName: "Снято с продажи",
                    isActive: false,
                    url: "/account/models/removed"
                }
            } }),
        react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["new-model-flex"] },
            react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["text-category-flex"] },
                react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["text-flex"] },
                    react_1["default"].createElement("input", { type: "text", placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", onChange: function (e) {
                            return handleModelJsonChange("name", e.target.value.toString());
                        } }),
                    react_1["default"].createElement("textarea", { placeholder: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", onChange: function (e) {
                            return handleModelJsonChange("description", e.target.value.toString());
                        } })),
                react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["category-flex"] },
                    react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["category-column"] },
                        react_1["default"].createElement("h1", null, "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"),
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
                            return (react_1["default"].createElement("div", { key: text, "data-value": text, onClick: function (e) {
                                    return handleModelJsonChange("category", e.currentTarget.dataset.value);
                                } },
                                react_1["default"].createElement(image_1["default"], { src: "/img/" + src, height: categoryImageSize, width: categoryImageSize, alt: "" }),
                                react_1["default"].createElement("span", null, text)));
                        }))),
                    react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["category-column"] },
                        react_1["default"].createElement("h1", null, "\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u0430"),
                        react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["checkbox-flex"] }, [
                            "Многосоставная",
                            "Подвижная",
                            "Жёсткая",
                            "Гибкая",
                            "Эластичная",
                        ].map(function (label) { return (react_1["default"].createElement("label", { key: label, className: AccountPage_module_css_1["default"]["checkbox-subflex"] },
                            react_1["default"].createElement("input", { type: "checkbox", value: label, onClick: function (e) { return handleCheckboxChange(e, "tags"); } }),
                            react_1["default"].createElement("span", { className: AccountPage_module_css_1["default"]["checkbox-text"] }, label))); })),
                        react_1["default"].createElement("h1", null, "\u041C\u0430\u0442\u0435\u0440\u0438\u0430\u043B"),
                        react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["checkbox-flex"] }, ["PLA", "ABS", "PETG", "TPU", "Resin"].map(function (label) { return (react_1["default"].createElement("label", { key: label, className: AccountPage_module_css_1["default"]["checkbox-subflex"] },
                            react_1["default"].createElement("input", { type: "checkbox", value: label, onClick: function (e) { return handleCheckboxChange(e, "materials"); } }),
                            react_1["default"].createElement("span", { className: AccountPage_module_css_1["default"]["checkbox-text"] }, label))); }))),
                    react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["format-price-column"], className: AccountPage_module_css_1["default"]["category-column"] },
                        react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["format-flex"] },
                            react_1["default"].createElement("h1", null, "\u0424\u043E\u0440\u043C\u0430\u0442\u044B"),
                            react_1["default"].createElement(FormatBox_1["default"], { updateFormatArray: handleFormatChange })),
                        react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["format-flex"] },
                            react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["price-currency-container"] },
                                react_1["default"].createElement("input", { type: "number", placeholder: "\u0446\u0435\u043D\u0430", onChange: function (e) {
                                        return handleModelJsonChange("price", e.target.value.toString());
                                    } }),
                                react_1["default"].createElement("button", { onClick: handleCurrencyChange }, currency)),
                            react_1["default"].createElement("button", { onClick: handleModelSubmission }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"))))),
            react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["model-upload-flex"] },
                react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["model-input"] }, showModelPreview ? (react_1["default"].createElement(ModelPreview_1["default"], { modelURL: modelURL, modelFormat: modelFormat })) : (react_1["default"].createElement(ModelUpload_1["default"], { setModelURL: setModelURL, setModelFormat: setModelFormat, setShowModelPreview: setShowModelPreview })))))));
}
exports["default"] = Page;
