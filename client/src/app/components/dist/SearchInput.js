'use client';
"use strict";
exports.__esModule = true;
var store_1 = require("../store");
var Header_module_css_1 = require("../styles/Header.module.css");
var SearchInput = function () {
    var searchQuery = store_1.useSearchStore(function (state) { return state.searchQuery; });
    var setSearchQuery = store_1.useSearchStore(function (state) { return state.setSearchQuery; });
    var handleChange = function (e) {
        setSearchQuery(e.target.value);
    };
    return (React.createElement("input", { id: Header_module_css_1["default"]["search-bar"], type: "text", value: searchQuery, onChange: handleChange, placeholder: "\u041F\u043E\u0438\u0441\u043A..." }));
};
exports["default"] = SearchInput;
