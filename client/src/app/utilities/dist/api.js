"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var api = axios_1["default"].create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true
});
exports["default"] = api;
