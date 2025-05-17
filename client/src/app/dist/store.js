"use strict";
exports.__esModule = true;
exports.useSearchStore = void 0;
var zustand_1 = require("zustand");
exports.useSearchStore = zustand_1.create(function (set) { return ({
    categories: [],
    minPrice: 0,
    maxPrice: 0,
    features: [],
    materials: [],
    licenses: [],
    setCategories: function (categories) { return set({ categories: categories }); },
    setMinPrice: function (minPrice) { return set({ minPrice: minPrice }); },
    setMaxPrice: function (maxPrice) { return set({ maxPrice: maxPrice }); },
    setFeatures: function (features) { return set({ features: features }); },
    setMaterials: function (materials) { return set({ materials: materials }); },
    setLicenses: function (licenses) { return set({ licenses: licenses }); },
    reset: function () {
        return set({
            categories: [],
            minPrice: 0,
            maxPrice: 0,
            features: [],
            materials: [],
            licenses: []
        });
    }
}); });
