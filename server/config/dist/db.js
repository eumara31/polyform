"use strict";
exports.__esModule = true;
exports.closePool = exports.pool = void 0;
var pg_1 = require("pg");
var Pool = pg_1["default"].Pool;
var dotenv_1 = require("dotenv");
dotenv_1["default"].config({});
exports.pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || ""),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 999,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});
exports.pool
    .query("SELECT NOW()")
    .then(function () { return console.log("DB is connected"); })["catch"](function (err) {
    console.error("DB error:", err);
    process.exit(1);
});
exports.closePool = function () { return exports.pool.end(); };
