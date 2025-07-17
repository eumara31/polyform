"use strict";
exports.__esModule = true;
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var accountController_1 = require("../controllers/accountController");
var multer_1 = require("multer");
var productController_1 = require("../controllers/productController");
var path_1 = require("path");
var url_1 = require("url");
var __filename = url_1.fileURLToPath(import.meta.url);
var __dirname = path_1["default"].dirname(__filename);
var __parentdir = path_1["default"].dirname(__dirname);
var storage = multer_1["default"].diskStorage({
    destination: function (req, file, cb) {
        cb(null, __parentdir + "/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer_1["default"]({ storage: storage });
var router = express_1.Router();
router.post("/auth/signup", authController_1["default"].signup);
router.post("/auth/login", authController_1["default"].login);
router.post("/auth/logout", authController_1["default"].logout);
router.get("/account/info", accountController_1["default"].getAccountInfo);
router.get("/account/info/asCookies", accountController_1["default"].getAccountInfoAsCookies);
//require auth не рабоатет после первой отправки файла
router.post("/account/model/upload", upload.fields([
    { name: 'model', maxCount: 1 },
    { name: 'images', maxCount: 20 }
]), accountController_1["default"].uploadUserModel);
router.get("/product/:productId/description", (productController_1["default"].getProductDescriptionById));
router.get("/product/:productId/blobs", function (req, res) { (productController_1["default"].getProductBlobsById(req, res)); });
router.get("/product/:productId/image-blobs", function (req, res) { (productController_1["default"].getProductBlobsById(req, res, "images")); });
router.get("/product/ids", (productController_1["default"].getProductIds));
router.post("/product/search", productController_1["default"].getProductIdsByQuery);
exports["default"] = router;
