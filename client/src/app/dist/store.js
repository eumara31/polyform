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
exports.useSearchStore = void 0;
var zustand_1 = require("zustand");
exports.useSearchStore = zustand_1.create(function (set, get) { return ({
    searchQuery: '',
    categories: [],
    features: [],
    materials: [],
    licenses: '',
    minPrice: 0,
    maxPrice: 0,
    setSearchQuery: function (q) { return set({ searchQuery: q }); },
    setCategories: function (c) { return set({ categories: c }); },
    setFeatures: function (f) { return set({ features: f }); },
    setMaterials: function (m) { return set({ materials: m }); },
    setLicenses: function (l) { return set({ licenses: l }); },
    setMinPrice: function (p) { return set({ minPrice: p }); },
    setMaxPrice: function (p) { return set({ maxPrice: p }); },
    getJsonQuery: function () {
        var _a = get(), searchQuery = _a.searchQuery, categories = _a.categories, features = _a.features, materials = _a.materials, licenses = _a.licenses, minPrice = _a.minPrice, maxPrice = _a.maxPrice;
        return __assign(__assign(__assign(__assign(__assign(__assign(__assign({}, (searchQuery && { searchQuery: searchQuery })), (categories.length > 0 && { categories: categories })), (features.length > 0 && { features: features })), (materials.length > 0 && { materials: materials })), (licenses && { licenses: licenses })), (minPrice > 0 && { minPrice: minPrice })), (maxPrice > 0 && { maxPrice: maxPrice }));
    },
    reset: function () {
        return set({
            searchQuery: '',
            categories: [],
            features: [],
            materials: [],
            licenses: '',
            minPrice: 0,
            maxPrice: 0
        });
    }
}); });
