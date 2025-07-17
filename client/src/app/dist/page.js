'use client';
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
var api_1 = require("./utilities/api");
var NavigationBeam_1 = require("./components/NavigationBeam");
var ItemContainer_1 = require("./components/ItemContainer");
var ProductMin_1 = require("./components/ProductMin");
var ItemSwiper_1 = require("./components/ItemSwiper");
var react_spinners_1 = require("react-spinners");
function Home() {
    var _this = this;
    var _a = react_1.useState([]), productIds = _a[0], setProductIds = _a[1];
    var _b = react_1.useState(true), loading = _b[0], setLoading = _b[1];
    react_1.useEffect(function () {
        var fetchProductIds = function () { return __awaiter(_this, void 0, void 0, function () {
            var res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, api_1["default"].get('/product/ids')];
                    case 1:
                        res = _a.sent();
                        setProductIds(res.data.ids);
                        return [3 /*break*/, 4];
                    case 2:
                        err_1 = _a.sent();
                        console.error('Ошибка при загрузке ID:', err_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchProductIds();
    }, []);
    if (loading) {
        return (React.createElement("div", { style: { display: 'flex', justifyContent: 'center', marginTop: '100px' } },
            React.createElement(react_spinners_1.BarLoader, { color: "#363537" })));
    }
    var bestIds = productIds.slice(0, 3);
    var topIds = productIds.slice(3);
    return (React.createElement(React.Fragment, null,
        React.createElement(NavigationBeam_1["default"], { name: "\u041B\u0443\u0447\u0448\u0438\u0435 \u043C\u043E\u0434\u0435\u043B\u0438", logo: "trophy.svg" }),
        React.createElement(ItemSwiper_1["default"], { swiperDirection: "horizontal", spaceBetweenItems: 30, itemsPerView: 3 }, bestIds.map(function (id) { return (React.createElement(ProductMin_1["default"], { key: id, productId: id })); })),
        React.createElement(NavigationBeam_1["default"], { name: "\u0422\u043E\u043F \u043F\u0440\u043E\u0434\u0430\u0436", logo: "bookmark_star.svg" }),
        React.createElement(ItemContainer_1["default"], null, topIds.map(function (id) { return (React.createElement(ProductMin_1["default"], { key: id, productId: id })); }))));
}
exports["default"] = Home;
