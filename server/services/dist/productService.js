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
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    ProductService.getProductById = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_1.pool.query('SELECT "Models".*, COALESCE("Users".login, "Users".email) AS username FROM "Models" JOIN "Users" ON "Models".uploader_id = "Users".user_id WHERE "Models".model_id = $1;', [productId])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 2:
                        err_1 = _a.sent();
                        throw err_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.getProductIds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.pool.query('SELECT model_id FROM "Models";')];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows.map(function (row) { return row.model_id; })];
                }
            });
        });
    };
    ProductService.getProductIdsByQuery = function (query) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var values, conditions, whereClause, sql, result, err_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        values = [];
                        conditions = [];
                        if (query.searchQuery) {
                            values.push("%" + query.searchQuery + "%");
                            conditions.push("\"Models\".name ILIKE $" + values.length);
                        }
                        if ((_a = query.categories) === null || _a === void 0 ? void 0 : _a.length) {
                            values.push(query.categories);
                            conditions.push("\"Models\".category = ANY($" + values.length + ")");
                        }
                        if ((_b = query.features) === null || _b === void 0 ? void 0 : _b.length) {
                            values.push(query.features);
                            conditions.push("\"Models\".features && $" + values.length + "::text[]");
                        }
                        if ((_c = query.materials) === null || _c === void 0 ? void 0 : _c.length) {
                            values.push(query.materials);
                            conditions.push("\"Models\".materials && $" + values.length + "::text[]");
                        }
                        if (query.licenses) {
                            values.push(query.licenses);
                            conditions.push("\"Models\".license = $" + values.length);
                        }
                        if (query.minPrice !== undefined && query.minPrice > 0) {
                            values.push(query.minPrice);
                            conditions.push("\"Models\".price >= $" + values.length);
                        }
                        if (query.maxPrice !== undefined && query.maxPrice > 0) {
                            values.push(query.maxPrice);
                            conditions.push("\"Models\".price <= $" + values.length);
                        }
                        whereClause = conditions.length
                            ? "WHERE " + conditions.join(" AND ")
                            : "";
                        sql = "\n    SELECT \"Models\".model_id\n    FROM \"Models\"\n    " + whereClause + ";\n  ";
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, db_1.pool.query(sql, values)];
                    case 2:
                        result = _d.sent();
                        return [2 /*return*/, result.rows.map(function (row) { return row.model_id; })];
                    case 3:
                        err_2 = _d.sent();
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProductService;
}());
exports["default"] = ProductService;
