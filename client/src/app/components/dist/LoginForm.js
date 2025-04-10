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
var RegisterForm_module_css_1 = require("../styles/RegisterForm.module.css");
var image_1 = require("next/image");
var RegisterForm_1 = require("./RegisterForm");
var api_1 = require("../utilities/api");
function LoginForm(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, children = _a.children;
    var _b = react_1.useState("login"), formType = _b[0], setFormType = _b[1];
    var _c = react_1.useState(""), login = _c[0], setLogin = _c[1];
    var _d = react_1.useState(""), password = _d[0], setPassword = _d[1];
    function changeFormType() {
        if (formType === "login") {
            setFormType("register");
        }
    }
    function handleLoginSubmission(e) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        data = {
                            login: login,
                            password: password
                        };
                        console.log(data);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, api_1["default"].post('/auth/login', data, {
                                withCredentials: true
                            })];
                    case 2:
                        res = _a.sent();
                        if (res.status >= 200 && res.status < 300) {
                            alert("Вход выполнен");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        formType === "login" && (react_1["default"].createElement("form", { id: RegisterForm_module_css_1["default"]["login-form"] },
            react_1["default"].createElement("h1", { id: RegisterForm_module_css_1["default"]["logo"] }, "\u041F\u043E\u043B\u0438\u0444\u043E\u0440\u043C"),
            react_1["default"].createElement("div", { id: RegisterForm_module_css_1["default"]["login-container"] },
                react_1["default"].createElement("div", { id: RegisterForm_module_css_1["default"]["textinput-container"] },
                    react_1["default"].createElement("input", { type: "text", placeholder: "E-mail \u0438\u043B\u0438 \u0438\u043C\u044F", onChange: function (e) { return setLogin(e.target.value); } }),
                    react_1["default"].createElement("input", { type: "password", placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", onChange: function (e) { return setPassword(e.target.value); } })),
                react_1["default"].createElement("button", { onClick: function (e) { return handleLoginSubmission(e); } }, "\u0412\u043E\u0439\u0442\u0438"),
                react_1["default"].createElement("p", null, "\u2014\u2014\u2014\u2014\u2014\u2014 \u0438\u043B\u0438 \u2014\u2014\u2014\u2014\u2014\u2014\u2014"),
                react_1["default"].createElement("button", { onClick: changeFormType }, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442"),
                react_1["default"].createElement("button", { id: RegisterForm_module_css_1["default"]["google-auth-button"] },
                    react_1["default"].createElement(image_1["default"], { id: RegisterForm_module_css_1["default"]["google-login-img"], src: "../img/google_logo.svg", height: 24, width: 24, alt: "" }),
                    react_1["default"].createElement("span", null, "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"))))),
        formType === "register" && react_1["default"].createElement(RegisterForm_1["default"], null)));
}
exports["default"] = LoginForm;
