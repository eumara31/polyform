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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var ItemSwiper_1 = require("@/app/components/ItemSwiper");
var SingleToggleGroup_1 = require("@/app/search/components/SingleToggleGroup");
var ModelUpload_1 = require("./components/ModelUpload");
var ModelPreview_1 = require("@/app/components/ModelPreview");
var image_1 = require("next/image");
var react_hot_toast_1 = require("react-hot-toast");
var api_1 = require("@/app/utilities/api");
function debounce(func, delay) {
    if (delay === void 0) { delay = 500; }
    var timeoutId;
    return (function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () { return func.apply(void 0, args); }, delay);
    });
}
function Page(_a) {
    var _b = react_1.useState(false), showModelPreview = _b[0], setShowModelPreview = _b[1];
    var _c = react_1.useState("RUB"), currency = _c[0], setCurrency = _c[1];
    var _d = react_1.useState(""), modelURL = _d[0], setModelURL = _d[1];
    var _e = react_1.useState(""), modelFormat = _e[0], setModelFormat = _e[1];
    var _f = react_1.useState({
        name: "",
        description: "",
        category: "",
        tags: [],
        materials: [],
        licence: "",
        price: undefined,
        currency: undefined,
        images: []
    }), modelJson = _f[0], setModelJson = _f[1];
    var _g = react_1.useState(null), modelFile = _g[0], setModelFile = _g[1];
    var _h = react_1.useState(new Map()), imageBinaryMap = _h[0], setImageBinaryMap = _h[1];
    var categoryImageSize = 24;
    function remToPixels(rem) {
        var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        return Math.round(rem * rootFontSize);
    }
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
            modelJson.licence.trim() !== "" &&
            modelJson.price !== undefined &&
            modelJson.currency !== undefined);
    }
    function handleModelJsonChange(field, value) {
        setModelJson(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    }
    var debouncedModelJsonChange = debounce(handleModelJsonChange, 400);
    function handleCheckboxChange(e, field) {
        var checkboxValue = e.target.value;
        setModelJson(function (prev) {
            var _a;
            var newData = e.target.checked
                ? __spreadArrays(prev[field], [checkboxValue]) : prev[field].filter(function (val) { return val !== checkboxValue; });
            return __assign(__assign({}, prev), (_a = {}, _a[field] = newData, _a));
        });
    }
    function handleLicenceChange(selectedLicence) {
        setModelJson(function (prev) { return (__assign(__assign({}, prev), { licence: selectedLicence })); });
    }
    function handleCurrencyChange() {
        setCurrency(function (prev) {
            var newCurrency = prev === "RUB" ? "USD" : "RUB";
            handleModelJsonChange("currency", newCurrency);
            return newCurrency;
        });
    }
    function handleModelSubmission() {
        return __awaiter(this, void 0, void 0, function () {
            var uploadPendingToast, formData_1, _i, _a, _b, key, value, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(!isModelJsonComplete() || !modelURL)) return [3 /*break*/, 1];
                        react_hot_toast_1["default"].error("Заполните все поля");
                        return [3 /*break*/, 5];
                    case 1:
                        uploadPendingToast = react_hot_toast_1["default"].loading("Модель загружается...");
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        formData_1 = new FormData();
                        formData_1.append("json", JSON.stringify(modelJson));
                        formData_1.append("model", modelFile);
                        Array.from(imageBinaryMap.values()).forEach(function (file) {
                            formData_1.append("images", file);
                        });
                        for (_i = 0, _a = formData_1.entries(); _i < _a.length; _i++) {
                            _b = _a[_i], key = _b[0], value = _b[1];
                            console.log(key, value);
                        }
                        return [4 /*yield*/, api_1["default"].post("/account/model/upload", formData_1, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                },
                                maxContentLength: Infinity,
                                maxBodyLength: Infinity
                            })];
                    case 3:
                        _c.sent();
                        react_hot_toast_1["default"].success("Файл загружен!", { id: uploadPendingToast });
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _c.sent();
                        react_hot_toast_1["default"].error("Ошибка загрузки", { id: uploadPendingToast });
                        console.log(err_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    function handleImageUpload(e) {
        var _a;
        var image = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (image) {
            setImageBinaryMap(function (prev) { return new Map(prev).set(image.name, image); });
        }
    }
    function handleThumbnailRemoval(thumbName) {
        setImageBinaryMap(function (prev) {
            var newMap = new Map(prev);
            newMap["delete"](thumbName);
            return newMap;
        });
    }
    react_1.useEffect(function () {
        setModelJson(function (prev) {
            return __assign(__assign({}, prev), { images: Array.from(imageBinaryMap.keys()) });
        });
    }, [imageBinaryMap]);
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
                    react_1["default"].createElement("input", { type: "text", placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", onChange: function (e) { return debouncedModelJsonChange("name", e.target.value); } }),
                    react_1["default"].createElement("textarea", { placeholder: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", onChange: function (e) {
                            return debouncedModelJsonChange("description", e.target.value);
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
                            return (react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["category-li"], key: text, "data-value": text, onClick: function (e) {
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
                            react_1["default"].createElement("h1", null, "\u041B\u0438\u0446\u0435\u043D\u0437\u0438\u044F"),
                            react_1["default"].createElement(SingleToggleGroup_1["default"], { onGroupSelect: handleLicenceChange, items: [
                                    "MIT",
                                    "GPL",
                                    "Apache",
                                    "BSD",
                                    "LGPL",
                                    "MPL",
                                    "EPL",
                                    "Unlicense",
                                ] })),
                        react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["format-flex"] },
                            react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["price-currency-container"] },
                                react_1["default"].createElement("input", { type: "number", placeholder: "\u0446\u0435\u043D\u0430", onChange: function (e) {
                                        return debouncedModelJsonChange("price", parseFloat(e.target.value));
                                    } }),
                                react_1["default"].createElement("button", { onClick: handleCurrencyChange }, currency)),
                            react_1["default"].createElement("button", { onClick: handleModelSubmission }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C"))))),
            react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["model-upload-flex"] },
                showModelPreview ? (react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["canvas-flex"] },
                    react_1["default"].createElement(ModelPreview_1["default"], { modelURL: modelURL, modelFormat: modelFormat }))) : (react_1["default"].createElement(ModelUpload_1["default"], { setModelURL: setModelURL, setModelFormat: setModelFormat, setShowModelPreview: setShowModelPreview, setModelFile: setModelFile })),
                react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["model-photo-swiper-container"] },
                    react_1["default"].createElement(ItemSwiper_1["default"], { swiperId: "model-photo-swiper", swiperSlideClass: "model-photo-slide-class", swiperDirection: "horizontal", spaceBetweenItems: remToPixels(1), itemsPerView: 3, wheelControl: true, scrollControl: true, keyboardControl: true },
                        react_1["default"].createElement("div", { className: AccountPage_module_css_1["default"]["add-photo"] },
                            react_1["default"].createElement("input", { type: "file", id: "image-upload", multiple: false, className: AccountPage_module_css_1["default"]["hidden-input"], onChange: handleImageUpload }),
                            react_1["default"].createElement("label", { htmlFor: "image-upload" },
                                react_1["default"].createElement("p", { style: { fontSize: "48px" } }, "+"),
                                react_1["default"].createElement("p", null, "\u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435"))),
                        Array.from(imageBinaryMap.entries()).map(function (_a) {
                            var name = _a[0], blob = _a[1];
                            var url = URL.createObjectURL(blob);
                            return (react_1["default"].createElement("div", { key: name.toString(), className: AccountPage_module_css_1["default"]["image-container"] },
                                react_1["default"].createElement("img", { src: "/img/close_red.svg", className: AccountPage_module_css_1["default"]["remove-thumbnail-btn"], onClick: function () { return handleThumbnailRemoval(name); } }),
                                react_1["default"].createElement("img", { src: url, alt: name.toString() })));
                        })))))));
}
exports["default"] = Page;
