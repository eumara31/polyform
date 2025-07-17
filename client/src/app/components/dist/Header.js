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
var gsap_1 = require("gsap");
var react_2 = require("@gsap/react");
var image_1 = require("next/image");
var Header_module_css_1 = require("../styles/Header.module.css");
var PopupOverlay_1 = require("./PopupOverlay");
var LoginForm_1 = require("./LoginForm");
var api_1 = require("../utilities/api");
var navigation_1 = require("next/navigation");
var link_1 = require("next/link");
gsap_1["default"].registerPlugin(react_2.useGSAP);
function Header(_a) {
    var isLogged = _a.isLogged, usernameProp = _a.usernameProp, emailProp = _a.emailProp;
    var _b = react_1.useState(false), popupStatus = _b[0], setPopupStatus = _b[1];
    var _c = react_1.useState(isLogged), logoutButton = _c[0], setLogoutButton = _c[1];
    var _d = react_1.useState(usernameProp), username = _d[0], setUsername = _d[1];
    var _e = react_1.useState(emailProp), email = _e[0], setEmail = _e[1];
    var categoryImageSize = 24;
    var router = navigation_1.useRouter();
    var pathname = navigation_1.usePathname();
    var accountPath = pathname.startsWith("/account");
    function changePopupStatus() {
        setPopupStatus(!popupStatus);
    }
    function handleLogin(username, email) {
        setLogoutButton(!logoutButton);
        setUsername(username);
        setEmail(email);
    }
    function handleLogout() {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1["default"].post("/auth/logout")];
                    case 1:
                        res = _a.sent();
                        if (res.status >= 200 && res.status < 300) {
                            setLogoutButton(!logoutButton);
                            setUsername("");
                            setEmail("");
                            if (accountPath) {
                                router.push("/");
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { id: Header_module_css_1["default"]["header-container"] },
            react_1["default"].createElement("div", { id: Header_module_css_1["default"]["header"] },
                react_1["default"].createElement("div", { id: Header_module_css_1["default"]["logo"] },
                    react_1["default"].createElement(link_1["default"], { className: Header_module_css_1["default"]["no-outline"], href: '/' }, "\u041F\u043E\u043B\u0438\u0444\u043E\u0440\u043C")),
                react_1["default"].createElement("div", { id: Header_module_css_1["default"]["category-dropdown"] },
                    react_1["default"].createElement("button", { id: Header_module_css_1["default"]["header-category-button"] },
                        react_1["default"].createElement(image_1["default"], { id: Header_module_css_1["default"]["header-category-img"], src: "/img/dashboard_customize.svg", width: 24, height: 24, alt: "" }),
                        "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"),
                    react_1["default"].createElement("ul", { id: Header_module_css_1["default"]["dropdown-list"] }, [
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
                    }))),
                react_1["default"].createElement("form", { id: Header_module_css_1["default"]["search-bar"] },
                    react_1["default"].createElement(image_1["default"], { id: Header_module_css_1["default"]["search-img"], src: "/img/search.svg", width: 24, height: 24, alt: "" })),
                logoutButton ? (react_1["default"].createElement("div", { id: Header_module_css_1["default"]["right-header-container"] },
                    react_1["default"].createElement(link_1["default"], { href: '/account' },
                        react_1["default"].createElement(image_1["default"], { src: "/img/account_box.svg", alt: "", width: 32, height: 32 })),
                    react_1["default"].createElement(image_1["default"], { src: "/img/local_mall.svg", alt: "", width: 32, height: 32 }))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement("div", { id: Header_module_css_1["default"]["change-lang"] }, "en"),
                    react_1["default"].createElement(image_1["default"], { id: Header_module_css_1["default"]["dark-mode-img"], src: "/img/dark_mode.svg", width: 32, height: 32, alt: "" })))),
            react_1["default"].createElement("div", { id: Header_module_css_1["default"]["header-underline"] },
                react_1["default"].createElement("div", { id: Header_module_css_1["default"]["header-underline-lsubcontainer"] },
                    react_1["default"].createElement("div", { id: Header_module_css_1["default"]["discounts-href"] }, "\u0421\u043A\u0438\u0434\u043A\u0438"),
                    react_1["default"].createElement("div", { id: Header_module_css_1["default"]["weekly-items-href"] }, "\u041C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435\u0434\u0435\u043B\u0438"),
                    react_1["default"].createElement("div", { id: Header_module_css_1["default"]["best-items-href"] }, "\u041B\u0443\u0447\u0448\u0438\u0435 \u043C\u043E\u0434\u0435\u043B\u0438"),
                    react_1["default"].createElement("div", { id: Header_module_css_1["default"]["favorites-href"] }, "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435")),
                react_1["default"].createElement("div", { id: Header_module_css_1["default"]["header-underline-itemsfound"] }),
                react_1["default"].createElement("div", null),
                react_1["default"].createElement("div", { id: Header_module_css_1["default"]["header-underline-rsubcontainer"] },
                    logoutButton ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement("div", { id: Header_module_css_1["default"]["change-lang"] }, "en"),
                        react_1["default"].createElement(image_1["default"], { id: Header_module_css_1["default"]["dark-mode-img"], src: "/img/dark_mode.svg", width: 24, height: 24, alt: "" }))) : null,
                    username ? react_1["default"].createElement("div", { id: Header_module_css_1["default"]["username"] }, username) : null,
                    react_1["default"].createElement("div", { id: Header_module_css_1["default"]["login-href"] },
                        react_1["default"].createElement(image_1["default"], { id: Header_module_css_1["default"]["login-image"], src: "/img/login.svg", width: 24, height: 24, alt: "" }),
                        logoutButton ? (react_1["default"].createElement("div", { onClick: handleLogout }, "\u0412\u044B\u0439\u0442\u0438")) : (react_1["default"].createElement("div", { onClick: changePopupStatus }, "\u0412\u043E\u0439\u0442\u0438")))))),
        react_1["default"].createElement(PopupOverlay_1["default"], { isOpen: popupStatus },
            react_1["default"].createElement(LoginForm_1["default"], { updateHeaderStatus: handleLogin, updatePopupStatus: changePopupStatus }))));
}
exports["default"] = Header;
