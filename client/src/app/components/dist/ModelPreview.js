'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var THREE = require("three");
var OrbitControls_js_1 = require("three/addons/controls/OrbitControls.js");
var STLLoader_js_1 = require("three/addons/loaders/STLLoader.js");
var OBJLoader_js_1 = require("three/addons/loaders/OBJLoader.js");
var FBXLoader_js_1 = require("three/addons/loaders/FBXLoader.js");
var PLYLoader_js_1 = require("three/addons/loaders/PLYLoader.js");
var AMFLoader_js_1 = require("three/addons/loaders/AMFLoader.js");
var _3MFLoader_js_1 = require("three/addons/loaders/3MFLoader.js");
var ModelPreview_module_css_1 = require("@/app/styles/ModelPreview.module.css");
function ModelPreview(_a) {
    var modelURL = _a.modelURL, modelFormat = _a.modelFormat;
    var canvasRef = react_1.useRef(null);
    var sceneRef = react_1.useRef(new THREE.Scene());
    var rendererRef = react_1.useRef(null);
    var cameraRef = react_1.useRef(null);
    var controlsRef = react_1.useRef(null);
    var modelRef = react_1.useRef(null);
    var animationIdRef = react_1.useRef(null);
    react_1.useEffect(function () {
        if (!canvasRef.current)
            return;
        var width = canvasRef.current.clientWidth;
        var height = canvasRef.current.clientHeight;
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0xf0f0f0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        canvasRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;
        var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        cameraRef.current = camera;
        sceneRef.current.add(new THREE.AmbientLight(0xffffff, 1));
        var directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight1.position.set(1, 1, 1);
        directionalLight1.castShadow = true;
        directionalLight1.shadow.mapSize.width = 2048;
        directionalLight1.shadow.mapSize.height = 2048;
        sceneRef.current.add(directionalLight1);
        var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(-1, -1, -1);
        sceneRef.current.add(directionalLight2);
        var controls = new OrbitControls_js_1.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controlsRef.current = controls;
        var animate = function () {
            animationIdRef.current = requestAnimationFrame(animate);
            controls.update();
            renderer.render(sceneRef.current, camera);
        };
        animate();
        var loadModel = function () {
            var loader;
            switch (modelFormat) {
                case 'stl':
                    loader = new STLLoader_js_1.STLLoader();
                    break;
                case 'obj':
                    loader = new OBJLoader_js_1.OBJLoader();
                    break;
                case 'fbx':
                    loader = new FBXLoader_js_1.FBXLoader();
                    break;
                case 'amf':
                    loader = new AMFLoader_js_1.AMFLoader();
                    break;
                case '3mf':
                    loader = new _3MFLoader_js_1.ThreeMFLoader();
                    break;
                case 'ply':
                    loader = new PLYLoader_js_1.PLYLoader();
                    break;
                default:
                    return;
            }
            loader.load(modelURL, function (object) {
                var _a;
                if (modelRef.current) {
                    sceneRef.current.remove(modelRef.current);
                }
                if (modelFormat === 'stl' || modelFormat === 'ply') {
                    modelRef.current = new THREE.Mesh(object, new THREE.MeshStandardMaterial({ color: 0x606060 }));
                }
                else {
                    modelRef.current = (_a = object.scene) !== null && _a !== void 0 ? _a : object;
                }
                sceneRef.current.add(modelRef.current);
                centerAndFitCamera(modelRef.current);
            });
        };
        var centerAndFitCamera = function (object) {
            var box = new THREE.Box3().setFromObject(object);
            var size = box.getSize(new THREE.Vector3());
            var center = box.getCenter(new THREE.Vector3());
            object.position.sub(center);
            var maxDim = Math.max(size.x, size.y, size.z);
            var fov = camera.fov * (Math.PI / 180);
            var distance = maxDim / (2 * Math.tan(fov / 2));
            camera.position.set(0, 0, distance * 1.1);
            camera.lookAt(0, 0, 0);
            controls.target.set(0, 0, 0);
            controls.update();
        };
        var handleResize = function () {
            if (!canvasRef.current || !cameraRef.current || !rendererRef.current)
                return;
            var width = canvasRef.current.clientWidth;
            var height = canvasRef.current.clientHeight;
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
        };
        loadModel();
        window.addEventListener('resize', handleResize);
        return function () {
            var _a;
            window.removeEventListener('resize', handleResize);
            if (animationIdRef.current)
                cancelAnimationFrame(animationIdRef.current);
            if ((_a = rendererRef.current) === null || _a === void 0 ? void 0 : _a.domElement)
                rendererRef.current.domElement.remove();
        };
    }, [modelURL, modelFormat]);
    return React.createElement("div", { id: ModelPreview_module_css_1["default"]['c'], ref: canvasRef });
}
exports["default"] = ModelPreview;
