"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var db_1 = require("../config/db");
var passwordHasher_1 = require("../utils/passwordHasher");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.createUser = function (login, email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.pool.query("INSERT INTO \"Users\" (login, email, password)\n                 VALUES ($1, $2, $3)\n                 RETURNING login, email", [login, email, passwordHasher_1.hashPassword(password)])];
                    case 1:
                        result = _a.sent();
                        console.log("Created user: " + result.rows[0].login + ", " + result.rows[0].email);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        if (err_1.code === "23505") {
                            throw {
                                status: 409,
                                message: "User with this email/login already exists"
                            };
                        }
                        throw {
                            status: 501,
                            message: "Database operation failed",
                            details: err_1.message
                        };
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.authorizeUser = function (loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.pool.query("SELECT id, username, email \n    FROM users\n    WHERE (login = $1 OR email = $1)\n    AND password = crypt($2, password)\n    LIMIT 1;", [loginOrEmail, password])];
                    case 1:
                        result = _a.sent();
                        if (result.rows[0]) {
                            return [2 /*return*/, {
                                    success: true,
                                    user: result.rows[0]
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    success: false,
                                    error: "Invalid credentials"
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Database error:", error_1);
                        return [2 /*return*/, {
                                success: false,
                                error: "Database error"
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
exports["default"] = AuthService;
