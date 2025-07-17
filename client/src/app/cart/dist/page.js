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
exports.__esModule = true;
var react_1 = require("react");
var CartPage_module_css_1 = require("@/app/styles/CartPage.module.css");
var ItemSwiper_1 = require("../components/ItemSwiper");
var CartItem_1 = require("./components/CartItem");
var js_cookie_1 = require("js-cookie");
function Page(_a) {
    var _b = react_1.useState([]), cartItems = _b[0], setCartItems = _b[1];
    var _c = react_1.useState({}), productPrices = _c[0], setProductPrices = _c[1];
    react_1.useEffect(function () {
        var cart = js_cookie_1["default"].get("cart");
        if (cart) {
            var items = cart.split(",").filter(function (id) { return id.trim() !== ""; });
            setCartItems(items);
        }
    }, []);
    function handleRemoveFromCart(productId) {
        var updatedItems = cartItems.filter(function (id) { return id !== productId; });
        setCartItems(updatedItems);
        js_cookie_1["default"].set("cart", updatedItems.join(","), { path: "/", expires: 7 });
        setProductPrices(function (prev) {
            var newPrices = __assign({}, prev);
            delete newPrices[productId];
            return newPrices;
        });
    }
    function handlePriceUpdate(productId, price) {
        setProductPrices(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[productId] = price, _a)));
        });
    }
    var totalPrice = Object.values(productPrices).reduce(function (sum, p) { return sum + p; }, 0);
    return (react_1["default"].createElement("div", { id: CartPage_module_css_1["default"]["main-flex"] },
        react_1["default"].createElement("div", { id: CartPage_module_css_1["default"]["cart-flex"] },
            react_1["default"].createElement("div", { id: CartPage_module_css_1["default"]["swiper-flex"] },
                react_1["default"].createElement(ItemSwiper_1["default"], { swiperId: "cart-item-swiper", swiperDirection: "vertical", spaceBetweenItems: 8, itemsPerView: "auto", wheelControl: true, scrollControl: true, keyboardControl: true }, cartItems.map(function (productId) { return (react_1["default"].createElement(CartItem_1["default"], { key: productId, productId: productId, onRemove: handleRemoveFromCart, onPriceUpdate: handlePriceUpdate })); }))),
            react_1["default"].createElement("div", { id: CartPage_module_css_1["default"]["checkout-flex"] },
                react_1["default"].createElement("div", { id: CartPage_module_css_1["default"]["checkout-price-sum"] },
                    react_1["default"].createElement("span", { className: CartPage_module_css_1["default"]["checkout-bg"] },
                        "\u041C\u043E\u0434\u0435\u043B\u0438 (",
                        cartItems.length,
                        ")"),
                    react_1["default"].createElement("span", { className: CartPage_module_css_1["default"]["checkout-sm"] },
                        totalPrice,
                        " \u20BD")),
                react_1["default"].createElement("div", { id: CartPage_module_css_1["default"]["discount"] },
                    react_1["default"].createElement("span", { className: CartPage_module_css_1["default"]["checkout-bg"] }, "\u0421\u043A\u0438\u0434\u043A\u0430"),
                    react_1["default"].createElement("span", { className: CartPage_module_css_1["default"]["checkout-sm"] }, "0%")),
                react_1["default"].createElement("div", { id: CartPage_module_css_1["default"]["checkout-final"] },
                    react_1["default"].createElement("div", { id: CartPage_module_css_1["default"]["price-final"] },
                        react_1["default"].createElement("span", { id: CartPage_module_css_1["default"]["final-price"] }, "\u041A \u043E\u043F\u043B\u0430\u0442\u0435:"),
                        react_1["default"].createElement("span", { className: CartPage_module_css_1["default"]["checkout-bg"] },
                            totalPrice,
                            " \u0440\u0443\u0431.")),
                    react_1["default"].createElement("input", { type: "number", className: CartPage_module_css_1["default"]["form-input"], placeholder: "\u041D\u043E\u043C\u0435\u0440 \u043A\u0430\u0440\u0442\u044B", max: 9999999999999 }),
                    react_1["default"].createElement("input", { type: "text", className: CartPage_module_css_1["default"]["form-input"], placeholder: "\u0418\u043C\u044F \u043D\u0430 \u043A\u0430\u0440\u0442\u0435" }),
                    react_1["default"].createElement("div", { id: CartPage_module_css_1["default"]["date-purchase-button"] },
                        react_1["default"].createElement("input", { type: "number", className: CartPage_module_css_1["default"]["form-input"], placeholder: "CVV" }),
                        react_1["default"].createElement("button", { className: CartPage_module_css_1["default"]["purchase-button"] }, "\u041E\u043F\u043B\u0430\u0442\u0438\u0442\u044C")))))));
}
exports["default"] = Page;
