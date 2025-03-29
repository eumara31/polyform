"use strict";
exports.__esModule = true;
exports.checkPassword = exports.hashPassword = void 0;
var bcrypt_1 = require("bcrypt");
exports.hashPassword = function (password) { return bcrypt_1["default"].hash(password, 3); };
exports.checkPassword = function (password, hashedPassword) { return bcrypt_1["default"].compare(password, hashedPassword); };
