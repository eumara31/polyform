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
var fs_1 = require("fs");
var path_1 = require("path");
var child_process_1 = require("child_process");
var obj2gltf_1 = require("obj2gltf");
var url_1 = require("url");
var gltf_pipeline_1 = require("gltf-pipeline");
var processGltf = gltf_pipeline_1["default"].processGltf;
var __filename = url_1.fileURLToPath(import.meta.url);
var __dirname = path_1["default"].dirname(__filename);
var __parentdir = path_1["default"].dirname(__dirname);
// еле работает с obj и не работает со всем остальным
var ModelCompresser = /** @class */ (function () {
    function ModelCompresser() {
    }
    ModelCompresser.createMin = function (inputPath) {
        return __awaiter(this, void 0, Promise, function () {
            var uploadsDir, ext, baseName, outputPath, tempDir, tempGlb, glbBuffer, assimpPath, finalBuffer, compressed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploadsDir = path_1["default"].join(__parentdir, 'uploads');
                        if (!fs_1["default"].existsSync(inputPath)) {
                            throw new Error("Input file not found: " + inputPath);
                        }
                        ext = path_1["default"].extname(inputPath).toLowerCase();
                        baseName = path_1["default"].basename(inputPath, ext);
                        outputPath = path_1["default"].join(uploadsDir, baseName + ".glb");
                        tempDir = path_1["default"].join(__parentdir, 'temp');
                        tempGlb = path_1["default"].join(tempDir, 'intermediate.glb');
                        fs_1["default"].mkdirSync(tempDir, { recursive: true });
                        if (!(ext === '.obj')) return [3 /*break*/, 2];
                        return [4 /*yield*/, obj2gltf_1["default"](inputPath, { binary: true })];
                    case 1:
                        glbBuffer = _a.sent();
                        fs_1["default"].writeFileSync(tempGlb, glbBuffer);
                        return [3 /*break*/, 3];
                    case 2:
                        assimpPath = path_1["default"].join(__dirname, 'assimp.exe');
                        console.log(assimpPath);
                        try {
                            child_process_1.execSync("\"" + assimpPath + "\" export \"" + inputPath + "\" \"" + tempGlb + "\" -f glb2");
                        }
                        catch (e) {
                            throw new Error("Assimp failed to convert " + inputPath + ": " + e);
                        }
                        _a.label = 3;
                    case 3:
                        finalBuffer = fs_1["default"].readFileSync(tempGlb);
                        return [4 /*yield*/, processGltf(finalBuffer, {
                                dracoOptions: { compressionLevel: 10 }
                            })];
                    case 4:
                        compressed = _a.sent();
                        fs_1["default"].writeFileSync(outputPath, compressed.glb);
                        fs_1["default"].rmSync(tempDir, { recursive: true, force: true });
                        return [2 /*return*/];
                }
            });
        });
    };
    return ModelCompresser;
}());
exports["default"] = ModelCompresser;
