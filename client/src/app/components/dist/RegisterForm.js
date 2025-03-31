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
var api_1 = require("../utilities/api");
function RegisterForm(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, children = _a.children;
    var _b = react_1.useState(""), login = _b[0], setLogin = _b[1];
    var _c = react_1.useState(""), email = _c[0], setEmail = _c[1];
    var _d = react_1.useState(""), password = _d[0], setPassword = _d[1];
    var _e = react_1.useState(false), privacyPolicy = _e[0], setPrivacyPolicy = _e[1];
    var _f = react_1.useState(false), mailing = _f[0], setMailing = _f[1];
    function handleSignupSubmission(e) {
        return __awaiter(this, void 0, void 0, function () {
            var data, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.preventDefault();
                        if (!(login && email && password && privacyPolicy)) return [3 /*break*/, 5];
                        data = {
                            login: login,
                            email: email,
                            password: password,
                            mailing: mailing ? "true" : "false"
                        };
                        console.log(data);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, api_1["default"].post("/auth/signup", data)];
                    case 2:
                        res = _a.sent();
                        if (res.status >= 200 && res.status < 300) {
                            alert("Регистрация прошла успешно");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        alert("Заполните все поля");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    return (react_1["default"].createElement("form", { id: RegisterForm_module_css_1["default"]["login-form"] },
        react_1["default"].createElement("h1", { id: RegisterForm_module_css_1["default"]["logo"] }, "\u041F\u043E\u043B\u0438\u0444\u043E\u0440\u043C"),
        react_1["default"].createElement("div", { id: RegisterForm_module_css_1["default"]["textinput-container"] },
            react_1["default"].createElement("input", { onChange: function (e) { return setLogin(e.target.value); }, type: "text", required: true, placeholder: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u043C\u043E\u0435 \u0438\u043C\u044F" }),
            react_1["default"].createElement("input", { onChange: function (e) { return setEmail(e.target.value); }, type: "email", required: true, placeholder: "E-mail" }),
            react_1["default"].createElement("input", { onChange: function (e) { return setPassword(e.target.value); }, type: "password", required: true, placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C" })),
        react_1["default"].createElement("div", { id: RegisterForm_module_css_1["default"]["checkbox-container"] },
            react_1["default"].createElement("label", { className: RegisterForm_module_css_1["default"]["checkbox-subcontainer"] },
                react_1["default"].createElement("input", { type: "checkbox", required: true, onChange: function (e) { return setPrivacyPolicy(e.target.checked); } }),
                react_1["default"].createElement("span", { className: RegisterForm_module_css_1["default"]["checkbox-text"] }, "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u044F\u0441\u044C, \u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u044E \u0441\u0432\u043E\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0432 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438")),
            react_1["default"].createElement("label", { className: RegisterForm_module_css_1["default"]["checkbox-subcontainer"] },
                react_1["default"].createElement("input", { type: "checkbox", onChange: function (e) { return setMailing(e.target.checked); } }),
                react_1["default"].createElement("span", { className: RegisterForm_module_css_1["default"]["checkbox-text"] }, "\u042F \u0441\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043D\u0430 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0443\u044E \u043F\u043E\u0447\u0442\u0443"))),
        react_1["default"].createElement("button", { type: "submit", onClick: function (e) { return handleSignupSubmission(e); } }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u043E\u0432\u0435\u0440\u043E\u0447\u043D\u044B\u0439 \u043A\u043E\u0434")));
}
exports["default"] = RegisterForm;
