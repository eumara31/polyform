"use strict";
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var db_1 = require("./config/db");
dotenv_1["default"].config();
var app = express_1["default"]();
app.use(express_1["default"].json());
db_1.pool.query('SELECT NOW()')
    .then(function () { return console.log('БД подключена'); })["catch"](function (err) {
    console.error('ошибка при подключении бд:', err);
    process.exit(1);
});
// Маршруты
app.use('/api', userRoutes);
// Обработка ошибок
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Server running on port " + PORT);
});
