"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var api = axios_1["default"].create({
    baseURL: "http://127.0.0.1:3001/api"
});
exports["default"] = api;
