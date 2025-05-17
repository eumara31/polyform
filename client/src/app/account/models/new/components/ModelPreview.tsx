import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { PLYLoader } from "three/addons/loaders/PLYLoader.js";
import { AMFLoader } from "three/addons/loaders/AMFLoader.js";
import { ThreeMFLoader } from "three/addons/loaders/3MFLoader.js";
import styles from "@/app/styles/AccountPage.module.css";

type Props = {
  modelURL: string;
  modelFormat: string;
};

export default function ModelPreview({ modelURL, modelFormat }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene());
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Инициализация Three.js
    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xf0f0f0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Создаем камеру
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;

    // Освещение
    sceneRef.current.add(new THREE.AmbientLight(0xffffff, 1));

    // Освещение
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Мягкий рассеянный свет
    sceneRef.current.add(ambientLight);

    // Направленный свет 1 (основной)
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(1, 1, 1); // Позиция справа сверху спереди
    directionalLight1.castShadow = true; // Включаем тени
    directionalLight1.shadow.mapSize.width = 2048; // Качество теней
    directionalLight1.shadow.mapSize.height = 2048;
    sceneRef.current.add(directionalLight1);

    // Направленный свет 2 (заполняющий)
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-1, -1, -1); // Противоположная позиция
    sceneRef.current.add(directionalLight2);

    // Орбитальные контролы
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controlsRef.current = controls;

    // Анимация
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(sceneRef.current, camera);
    };
    animate();

    // Загрузка модели
    const loadModel = () => {
      let loader: THREE.Loader;
      switch (modelFormat) {
        case "stl":
          loader = new STLLoader();
          break;
        case "obj":
          loader = new OBJLoader();
          break;
        case "fbx":
          loader = new FBXLoader();
          break;
        case "amf":
          loader = new AMFLoader();
          break;
        case "3mf":
          loader = new ThreeMFLoader();
          break;
        case "ply":
          loader = new PLYLoader();
          break;
        default:
          console.error(`Unsupported format: ${modelFormat}`);
          return;
      }

      loader.load(modelURL, (object) => {
        if (modelRef.current) {
          sceneRef.current.remove(modelRef.current);
        }

        if (modelFormat === "stl" || modelFormat === "ply") {
          modelRef.current = new THREE.Mesh(
            object,
            new THREE.MeshStandardMaterial({ color: 0x606060 })
          );
        } else {
          modelRef.current = (object as any).scene
            ? (object as any).scene
            : object;
        }

        sceneRef.current.add(modelRef.current);
        fitCameraToObject(modelRef.current);
      });
    };

    const fitCameraToObject = (object: THREE.Object3D) => {
      const box = new THREE.Box3().setFromObject(object);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      const fov = camera.fov * (Math.PI / 180);
      const distance = Math.abs(size / Math.sin(fov / 2)) * 1.5;

      camera.position.copy(center);
      camera.position.z += distance;
      camera.lookAt(center);

      controls.target.copy(center);
      controls.update();
    };

    const handleResize = () => {
      if (!canvasRef.current || !cameraRef.current || !rendererRef.current)
        return;

      const width = canvasRef.current?.clientWidth;
      const height = canvasRef.current?.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Мягкие тени
    };

    loadModel();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (rendererRef.current?.domElement) {
        rendererRef.current.domElement.remove();
      }
    };
  }, [modelURL, modelFormat]);

  return <div id={styles["canvas-flex"]} ref={canvasRef}></div>;
}
