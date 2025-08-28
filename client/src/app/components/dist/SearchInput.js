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
var store_1 = require("../store");
var Header_module_css_1 = require("../styles/Header.module.css");
var react_1 = require("react");
var api_1 = require("../utilities/api");
var navigation_1 = require("next/navigation");
var SearchInput = function () {
    var searchQuery = store_1.useSearchStore(function (state) { return state.searchQuery; });
    var setSearchQuery = store_1.useSearchStore(function (state) { return state.setSearchQuery; });
    var _a = react_1.useState(false), isDropdownOpen = _a[0], setIsDropdownOpen = _a[1];
    var _b = react_1.useState([]), dropdownContents = _b[0], setDropdownContents = _b[1];
    var searchBarRef = react_1.useRef(null);
    var dropdownRef = react_1.useRef(null);
    var router = navigation_1.useRouter();
    react_1.useEffect(function () {
        var fetchPopularProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
            var res, namesArr_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, api_1["default"].get("/product/names/popular")];
                    case 1:
                        res = _a.sent();
                        if (res.status >= 200 && res.status < 300) {
                            namesArr_1 = [];
                            res.data.names.forEach(function (name) {
                                return namesArr_1.push(Object.values(name)[0]);
                            });
                            setDropdownContents(namesArr_1);
                        }
                        else {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchPopularProducts();
    }, []);
    react_1.useEffect(function () {
        var handleClickOutside = function (e) {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(e.target) &&
                searchBarRef.current &&
                e.target !== searchBarRef.current) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    var handleChange = function (e) {
        if (typeof e === "string") {
            setSearchQuery(e);
        }
        else {
            setSearchQuery(e.target.value);
        }
    };
    var handleSearchSubmition = function (e) {
        if (e.key === 'Enter') {
            router.push("/search");
        }
    };
    var showDropdown = function () {
        setIsDropdownOpen(true);
    };
    var handleDropdownSelect = function (dropdownElementName) {
        handleChange(dropdownElementName);
        router.push("/search");
    };
    return (React.createElement("div", { id: Header_module_css_1["default"]["search-bar-dropdown-container"] },
        React.createElement("input", { id: Header_module_css_1["default"]["search-bar"], type: "text", value: searchQuery, onChange: handleChange, placeholder: "\u041F\u043E\u0438\u0441\u043A...", onClick: showDropdown, ref: searchBarRef, onKeyDown: handleSearchSubmition }),
        isDropdownOpen ? (React.createElement("ul", { id: Header_module_css_1["default"]["search-dropdown"], ref: dropdownRef }, dropdownContents.map(function (name, i) { return (React.createElement("li", { onClick: function () { return handleDropdownSelect(name); }, key: i, className: Header_module_css_1["default"]["search-dropdown-item"] }, name)); }))) : null));
};
exports["default"] = SearchInput;
