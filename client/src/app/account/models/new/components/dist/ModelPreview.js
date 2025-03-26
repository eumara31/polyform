"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fiber_1 = require("@react-three/fiber");
var drei_1 = require("@react-three/drei");
var fiber_2 = require("@react-three/fiber");
var STLLoader_js_1 = require("three/addons/loaders/STLLoader.js");
var OBJLoader_js_1 = require("three/addons/loaders/OBJLoader.js");
var FBXLoader_js_1 = require("three/addons/loaders/FBXLoader.js");
var PLYLoader_js_1 = require("three/addons/loaders/PLYLoader.js");
var AMFLoader_js_1 = require("three/addons/loaders/AMFLoader.js");
var _3MFLoader_js_1 = require("three/addons/loaders/3MFLoader.js");
var AccountPage_module_css_1 = require("@/app/styles/AccountPage.module.css");
function ModelPreview(_a) {
    var modelURL = _a.modelURL, modelFormat = _a.modelFormat;
    console.log(modelFormat);
    var loader;
    switch (modelFormat) {
        case "stl":
            loader = STLLoader_js_1.STLLoader;
            break;
        case "obj":
            loader = OBJLoader_js_1.OBJLoader;
            break;
        case "fbx":
            loader = FBXLoader_js_1.FBXLoader;
            break;
        case "amf":
            loader = AMFLoader_js_1.AMFLoader;
            break;
        case "3mf":
            loader = _3MFLoader_js_1.ThreeMFLoader;
            break;
        case "ply":
            loader = PLYLoader_js_1.PLYLoader;
            break;
        case "gcode":
        case "step":
        case "iges":
            console.warn("Loader for ." + modelFormat + " is not available in Three.js by default");
            loader = null; // Эти форматы требуют кастомных решений
            break;
        default:
            console.error("Unsupported format: " + modelFormat);
            loader = null;
    }
    function Model() {
        var loadedModel = fiber_2.useLoader(loader, modelURL);
        if (loader === STLLoader_js_1.STLLoader || loader === PLYLoader_js_1.PLYLoader) {
            return (react_1["default"].createElement("mesh", { geometry: loadedModel },
                react_1["default"].createElement("meshStandardMaterial", null)));
        }
        return react_1["default"].createElement("primitive", { object: loadedModel.scene ? loadedModel.scene : loadedModel });
    }
    return (react_1["default"].createElement("div", { id: AccountPage_module_css_1["default"]["canvas-flex"] },
        react_1["default"].createElement(fiber_1.Canvas, { id: AccountPage_module_css_1["default"]["model-canvas"] },
            react_1["default"].createElement(Model, null),
            react_1["default"].createElement("ambientLight", { intensity: 1 }),
            react_1["default"].createElement(drei_1.OrbitControls, { enableZoom: true, enablePan: true, enableRotate: true }),
            react_1["default"].createElement("directionalLight", { castShadow: true, intensity: Math.PI * 2 }))));
}
exports["default"] = ModelPreview;
