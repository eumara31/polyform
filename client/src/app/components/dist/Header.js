"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var gsap_1 = require("gsap");
var react_2 = require("@gsap/react");
var image_1 = require("next/image");
var Header_module_css_1 = require("../styles/Header.module.css");
var PopupOverlay_1 = require("./PopupOverlay");
var LoginForm_1 = require("./LoginForm");
gsap_1["default"].registerPlugin(react_2.useGSAP);
function Header(_a) {
    var _b = react_1.useState(false), popupStatus = _b[0], setPopupStatus = _b[1];
    function changePopupStatus() {
        setPopupStatus(!popupStatus);
        function getCookie(name) {
            var cookies = document.cookie.split('; ');
            for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
                var cookie = cookies_1[_i];
                var _a = cookie.split('='), cookieName = _a[0], cookieValue = _a[1];
                if (cookieName === name) {
                    return decodeURIComponent(cookieValue);
                }
            }
            return null;
        }
        var connectSid = getCookie('connect.sid');
        console.log('connect.sid:', connectSid);
    }
    // const [headerHeight, setHeaderHeight] = useState('')
    // const [lastScrollY, setLastScrollY] = useState(0)
    // const headerRef = useRef(null);
    // const headerUnderlineRef = useRef(null);
    // function changeHeaderHeight(){
    //   if (window.scrollY > lastScrollY) {
    //     setHeaderHeight("0rem");
    //   } else {
    //     setHeaderHeight("2rem");  
    //   }
    //   setLastScrollY(window.scrollY); 
    // }
    // useEffect(() => {
    //   window.addEventListener('scroll', changeHeaderHeight);
    //   return () => {
    //      window.removeEventListener('scroll', changeHeaderHeight);
    //   };
    // }, [lastScrollY]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { id: Header_module_css_1["default"]["header-container"] },
            react_1["default"].createElement("div", { id: Header_module_css_1["default"]["header"] },
                react_1["default"].createElement("div", { id: Header_module_css_1["default"]["logo"] }, "\u041F\u043E\u043B\u0438\u0444\u043E\u0440\u043C"),
                react_1["default"].createElement("button", { id: Header_module_css_1["default"]["header-category-button"] },
                    react_1["default"].createElement(image_1["default"], { id: Header_module_css_1["default"]["header-category-img"], src: "/img/dashboard_customize.svg", width: 24, height: 24, alt: "" }),
                    "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438"),
                react_1["default"].createElement("form", { id: Header_module_css_1["default"]["search-bar"] },
                    "placeholder",
                    react_1["default"].createElement(image_1["default"], { id: Header_module_css_1["default"]["search-img"], src: "/img/search.svg", width: 24, height: 24, alt: "" })),
                react_1["default"].createElement("div", { id: Header_module_css_1["default"]["change-lang"] }, "en"),
                react_1["default"].createElement(image_1["default"], { id: Header_module_css_1["default"]["dark-mode-img"], src: "/img/dark_mode.svg", width: 32, height: 32, alt: "" })),
            react_1["default"].createElement("div", { id: Header_module_css_1["default"]["header-underline"] },
                react_1["default"].createElement("div", { id: Header_module_css_1["default"]["header-underline-lsubcontainer"] },
                    react_1["default"].createElement("div", { id: Header_module_css_1["default"]["discounts-href"] }, "\u0421\u043A\u0438\u0434\u043A\u0438"),
                    react_1["default"].createElement("div", { id: Header_module_css_1["default"]["weekly-items-href"] }, "\u041C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435\u0434\u0435\u043B\u0438"),
                    react_1["default"].createElement("div", { id: Header_module_css_1["default"]["best-items-href"] }, "\u041B\u0443\u0447\u0448\u0438\u0435 \u043C\u043E\u0434\u0435\u043B\u0438"),
                    react_1["default"].createElement("div", { id: Header_module_css_1["default"]["favorites-href"] }, "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435")),
                react_1["default"].createElement("div", { id: Header_module_css_1["default"]["header-underline-itemsfound"] }),
                react_1["default"].createElement("div", null, "\u041F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \"\" \u043D\u0430\u0439\u0434\u0435\u043D\u043E n \u0442\u043E\u0432\u0430\u0440\u043E\u0432"),
                react_1["default"].createElement("div", { id: Header_module_css_1["default"]["header-underline-rsubcontainer"] },
                    react_1["default"].createElement("div", { id: Header_module_css_1["default"]["login-href"], onClick: changePopupStatus },
                        react_1["default"].createElement(image_1["default"], { id: Header_module_css_1["default"]["login-image"], src: "/img/login.svg", width: 24, height: 24, alt: "" }),
                        react_1["default"].createElement("div", null, "\u0412\u043E\u0439\u0442\u0438"))))),
        react_1["default"].createElement(PopupOverlay_1["default"], { isOpen: popupStatus },
            react_1["default"].createElement(LoginForm_1["default"], null))));
}
exports["default"] = Header;
