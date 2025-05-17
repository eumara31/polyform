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
var AccountPage_module_css_1 = require("@/app/styles/AccountPage.module.css");
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
        // Инициализация Three.js
        var width = canvasRef.current.clientWidth;
        var height = canvasRef.current.clientHeight;
        // Создаем рендерер
        var renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0xf0f0f0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        canvasRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;
        // Создаем камеру
        var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        cameraRef.current = camera;
        // Освещение
        sceneRef.current.add(new THREE.AmbientLight(0xffffff, 1));
        // Освещение
        var ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Мягкий рассеянный свет
        sceneRef.current.add(ambientLight);
        // Направленный свет 1 (основной)
        var directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight1.position.set(1, 1, 1); // Позиция справа сверху спереди
        directionalLight1.castShadow = true; // Включаем тени
        directionalLight1.shadow.mapSize.width = 2048; // Качество теней
        directionalLight1.shadow.mapSize.height = 2048;
        sceneRef.current.add(directionalLight1);
        // Направленный свет 2 (заполняющий)
        var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(-1, -1, -1); // Противоположная позиция
        sceneRef.current.add(directionalLight2);
        // Орбитальные контролы
        var controls = new OrbitControls_js_1.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controlsRef.current = controls;
        // Анимация
        var animate = function () {
            animationIdRef.current = requestAnimationFrame(animate);
            controls.update();
            renderer.render(sceneRef.current, camera);
        };
        animate();
        // Загрузка модели
        var loadModel = function () {
            var loader;
            switch (modelFormat) {
                case "stl":
                    loader = new STLLoader_js_1.STLLoader();
                    break;
                case "obj":
                    loader = new OBJLoader_js_1.OBJLoader();
                    break;
                case "fbx":
                    loader = new FBXLoader_js_1.FBXLoader();
                    break;
                case "amf":
                    loader = new AMFLoader_js_1.AMFLoader();
                    break;
                case "3mf":
                    loader = new _3MFLoader_js_1.ThreeMFLoader();
                    break;
                case "ply":
                    loader = new PLYLoader_js_1.PLYLoader();
                    break;
                default:
                    console.error("Unsupported format: " + modelFormat);
                    return;
            }
            loader.load(modelURL, function (object) {
                if (modelRef.current) {
                    sceneRef.current.remove(modelRef.current);
                }
                if (modelFormat === "stl" || modelFormat === "ply") {
                    modelRef.current = new THREE.Mesh(object, new THREE.MeshStandardMaterial({ color: 0x606060 }));
                }
                else {
                    modelRef.current = object.scene
                        ? object.scene
                        : object;
                }
                sceneRef.current.add(modelRef.current);
                fitCameraToObject(modelRef.current);
            });
        };
        var fitCameraToObject = function (object) {
            var box = new THREE.Box3().setFromObject(object);
            var size = box.getSize(new THREE.Vector3()).length();
            var center = box.getCenter(new THREE.Vector3());
            var fov = camera.fov * (Math.PI / 180);
            var distance = Math.abs(size / Math.sin(fov / 2)) * 1.5;
            camera.position.copy(center);
            camera.position.z += distance;
            camera.lookAt(center);
            controls.target.copy(center);
            controls.update();
        };
        var handleResize = function () {
            var _a, _b;
            if (!canvasRef.current || !cameraRef.current || !rendererRef.current)
                return;
            var width = (_a = canvasRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth;
            var height = (_b = canvasRef.current) === null || _b === void 0 ? void 0 : _b.clientHeight;
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Мягкие тени
        };
        loadModel();
        window.addEventListener("resize", handleResize);
        return function () {
            var _a;
            window.removeEventListener("resize", handleResize);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
            if ((_a = rendererRef.current) === null || _a === void 0 ? void 0 : _a.domElement) {
                rendererRef.current.domElement.remove();
            }
        };
    }, [modelURL, modelFormat]);
    return React.createElement("div", { id: AccountPage_module_css_1["default"]["canvas-flex"], ref: canvasRef });
}
exports["default"] = ModelPreview;
