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
var assimpjs_1 = require("assimpjs");
var fs_1 = require("fs");
var path_1 = require("path");
var core_1 = require("@gltf-transform/core");
var functions_1 = require("@gltf-transform/functions");
// сжимает 3д-модели (100мб-1гб) до приемлемых для отправки по сети размеров (1мб-10мб) для предпросмотра
var ModelCompressor = /** @class */ (function () {
    function ModelCompressor() {
    }
    ModelCompressor.createMin = function (inputPath, outputPath) {
        return __awaiter(this, void 0, void 0, function () {
            var assimp, buffer, name, file, scene, tmpGltfName, tmpGltfPath, exportSuccess, io, doc, glbName, glbFullPath, glbBinary;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, assimpjs_1["default"]()];
                    case 1:
                        assimp = _a.sent();
                        buffer = fs_1["default"].readFileSync(inputPath);
                        name = path_1["default"].basename(inputPath);
                        file = new assimp.File();
                        scene = assimp.ReadFile(file);
                        if (!scene || !scene.IsValid()) {
                            throw new Error("Failed to load model");
                        }
                        tmpGltfName = path_1["default"].basename(inputPath, path_1["default"].extname(inputPath)) + ".gltf";
                        tmpGltfPath = path_1["default"].join(outputPath, tmpGltfName);
                        exportSuccess = assimp.ExportFile(scene, tmpGltfPath, "gltf2");
                        if (!exportSuccess) {
                            throw new Error("GLTF export failed");
                        }
                        io = new core_1.NodeIO();
                        return [4 /*yield*/, io.read(tmpGltfPath)];
                    case 2:
                        doc = _a.sent();
                        return [4 /*yield*/, doc.transform(functions_1.weld())];
                    case 3:
                        _a.sent();
                        glbName = path_1["default"].basename(inputPath, path_1["default"].extname(inputPath)) + ".glb";
                        glbFullPath = path_1["default"].join(outputPath, glbName);
                        return [4 /*yield*/, io.writeBinary(doc)];
                    case 4:
                        glbBinary = _a.sent();
                        fs_1["default"].writeFileSync(glbFullPath, glbBinary);
                        fs_1["default"].unlinkSync(tmpGltfPath);
                        return [2 /*return*/, glbFullPath];
                }
            });
        });
    };
    return ModelCompressor;
}());
exports["default"] = ModelCompressor;
