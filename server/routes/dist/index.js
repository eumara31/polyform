"use strict";
exports.__esModule = true;
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var router = express_1.Router();
router.post('/auth/signup', authController_1["default"].signup);
router.post('/auth/login', authController_1["default"].login);
exports["default"] = router;
