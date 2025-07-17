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
var productService_1 = require("../services/productService");
var fs = require("fs");
var path_1 = require("path");
var url_1 = require("url");
var __filename = url_1.fileURLToPath(import.meta.url);
var __dirname = path_1["default"].dirname(__filename);
var __parentdir = path_1["default"].dirname(__dirname);
var getMimeType = function (filename) {
    var ext = path_1["default"].extname(filename).toLowerCase();
    switch (ext) {
        case ".stl":
            return "model/stl";
        case ".obj":
            return "model/obj";
        case ".fbx":
            return "model/fbx";
        case ".amf":
            return "model/amf";
        case ".3mf":
            return "model/3mf";
        case ".ply":
            return "model/ply";
        case ".png":
            return "image/png";
        case ".jpg":
        case ".jpeg":
            return "image/jpeg";
        case ".webp":
            return "image/webp";
        default:
            return "application/octet-stream";
    }
};
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.getProductDescriptionById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var productId, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        productId = req.params.productId;
                        console.log(123);
                        return [4 /*yield*/, productService_1["default"].getProductById(productId)];
                    case 1:
                        result = _a.sent();
                        res.status(200).json({
                            text: {
                                name: result.name,
                                description: result.description,
                                tags: result.tags,
                                price: result.price,
                                materials: result.materials,
                                currency: result.currency,
                                category: result.category,
                                licence: result.licence,
                                rating: result.rating,
                                rating_votes: result.rating_votes,
                                author: result.username
                            }
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(404).json({ error: err_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.getProductBlobsById = function (req, res, blobType) {
        return __awaiter(this, void 0, void 0, function () {
            var productId, result, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        productId = req.params.productId;
                        return [4 /*yield*/, productService_1["default"].getProductById(productId)];
                    case 1:
                        result = _a.sent();
                        response = {};
                        // Если тип не указан или запрошены оба типа данных
                        if (!blobType) {
                            response.model = {
                                data: fs.readFileSync(__parentdir + ("/uploads/" + result.url)).toString("base64"),
                                name: result.url,
                                type: getMimeType(result.url)
                            };
                            response.images = result.image_urls.map(function (imageUrl) { return ({
                                data: fs.readFileSync(__parentdir + ("/uploads/" + imageUrl)).toString("base64"),
                                name: imageUrl,
                                type: getMimeType(imageUrl)
                            }); });
                        }
                        else if (blobType === "model") {
                            response.model = {
                                data: fs.readFileSync(__parentdir + ("/uploads/" + result.url)).toString("base64"),
                                name: result.url,
                                type: getMimeType(result.url)
                            };
                        }
                        else if (blobType === "images") {
                            response.images = result.image_urls.map(function (imageUrl) { return ({
                                data: fs.readFileSync(__parentdir + ("/uploads/" + imageUrl)).toString("base64"),
                                name: imageUrl,
                                type: getMimeType(imageUrl)
                            }); });
                        }
                        res.status(200).json(response);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(404).json({ error: err_2.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.getProductIds = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, productService_1["default"].getProductIds()];
                    case 1:
                        ids = _a.sent();
                        res.status(200).json({ ids: ids });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.status(500).json({ error: err_3.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.getProductIdsByQuery = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var query, ids, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        query = req.body;
                        return [4 /*yield*/, productService_1["default"].getProductIdsByQuery(query)];
                    case 1:
                        ids = _a.sent();
                        res.status(200).json({ ids: ids });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(500).json({ error: err_4.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ProductController;
}());
exports["default"] = ProductController;
