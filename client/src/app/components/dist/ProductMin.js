"use client";
"use strict";
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
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var ProductMin_module_css_1 = require("../styles/ProductMin.module.css");
var api_1 = require("@/app/utilities/api");
var link_1 = require("next/link");
var react_spinners_1 = require("react-spinners");
var availableTags = {
    Многосоставная: {
        src: "/img/multiple_parts.svg",
        label: "Многосоставная"
    },
    Жёсткая: {
        src: "/img/solid.svg",
        label: "Жёсткая"
    },
    Подвижная: {
        src: "/img/moving.svg",
        label: "Подвижная"
    },
    Гибкая: {
        src: "/img/flexible.svg",
        label: "Гибкая"
    },
    Эластичная: {
        src: "/img/elastic.svg",
        label: "Эластичная"
    }
};
function Item(_a) {
    var _b, _c, _d;
    var productId = _a.productId;
    var _e = react_1.useState(null), description = _e[0], setDescription = _e[1];
    var _f = react_1.useState(null), images = _f[0], setImages = _f[1];
    react_1.useEffect(function () {
        function fetchDescription() {
            return __awaiter(this, void 0, void 0, function () {
                var res, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, api_1["default"].get("/product/" + productId + "/description")];
                        case 1:
                            res = _a.sent();
                            setDescription(res.data);
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            console.error("Ошибка загрузки описания:", err_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        fetchDescription();
    }, [productId]);
    react_1.useEffect(function () {
        function fetchImages() {
            return __awaiter(this, void 0, void 0, function () {
                var res, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, api_1["default"].get("/product/" + productId + "/image-blobs")];
                        case 1:
                            res = _a.sent();
                            setImages(res.data);
                            return [3 /*break*/, 3];
                        case 2:
                            err_2 = _a.sent();
                            console.error("Ошибка загрузки изображений:", err_2);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        fetchImages();
    }, [productId]);
    return (react_1["default"].createElement(link_1["default"], { href: "/product/" + productId },
        react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item"] },
            react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-thumbnail"] }, ((_b = images === null || images === void 0 ? void 0 : images.images) === null || _b === void 0 ? void 0 : _b[0]) ? (react_1["default"].createElement("img", { src: "data:" + images.images[0].type + ";base64," + images.images[0].data, alt: "thumbnail" })) : (react_1["default"].createElement("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", height: "100%" } },
                react_1["default"].createElement(react_spinners_1.SquareLoader, { color: "#363537", size: 40 })))),
            react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-subcontainer"] },
                react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-name"] }, (description === null || description === void 0 ? void 0 : description.text.name) || "Название модели"),
                react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-rating-container"] },
                    react_1["default"].createElement(image_1["default"], { src: "../../img/kid_star.svg", height: 24, width: 24, alt: "" }),
                    react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-rating-number"] }, ((_c = description === null || description === void 0 ? void 0 : description.text.rating) === null || _c === void 0 ? void 0 : _c.toFixed(2)) || "нет голосов")),
                react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-attributes-container"] },
                    react_1["default"].createElement("span", { id: ProductMin_module_css_1["default"]["licence"] }, description === null || description === void 0 ? void 0 : description.text.licence), (_d = description === null || description === void 0 ? void 0 : description.text.tags) === null || _d === void 0 ? void 0 :
                    _d.map(function (tag) {
                        return availableTags[tag] && (react_1["default"].createElement(image_1["default"], { key: tag, src: availableTags[tag].src, height: 24, width: 24, alt: tag }));
                    })),
                react_1["default"].createElement("div", { className: ProductMin_module_css_1["default"]["item-price"] }, description ? description.text.price + " " + description.text.currency : "799 ₽")))));
}
exports["default"] = Item;
