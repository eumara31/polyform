'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js'
import { AMFLoader } from 'three/addons/loaders/AMFLoader.js'
import { ThreeMFLoader } from 'three/addons/loaders/3MFLoader.js'
import styles from '@/app/styles/AccountPage.module.css'

type Props = {
  modelURL: string
  modelFormat: string
}

export default function ModelPreview({ modelURL, modelFormat }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>(new THREE.Scene())
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)
  const modelRef = useRef<THREE.Object3D | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const width = canvasRef.current.clientWidth
    const height = canvasRef.current.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(0xf0f0f0)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    canvasRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    cameraRef.current = camera

    sceneRef.current.add(new THREE.AmbientLight(0xffffff, 1))

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight1.position.set(1, 1, 1)
    directionalLight1.castShadow = true
    directionalLight1.shadow.mapSize.width = 2048
    directionalLight1.shadow.mapSize.height = 2048
    sceneRef.current.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight2.position.set(-1, -1, -1)
    sceneRef.current.add(directionalLight2)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controlsRef.current = controls

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      controls.update()
      renderer.render(sceneRef.current, camera)
    }
    animate()

    const loadModel = () => {
      let loader: THREE.Loader
      switch (modelFormat) {
        case 'stl':
          loader = new STLLoader()
          break
        case 'obj':
          loader = new OBJLoader()
          break
        case 'fbx':
          loader = new FBXLoader()
          break
        case 'amf':
          loader = new AMFLoader()
          break
        case '3mf':
          loader = new ThreeMFLoader()
          break
        case 'ply':
          loader = new PLYLoader()
          break
        default:
          return
      }

      loader.load(modelURL, (object) => {
        if (modelRef.current) {
          sceneRef.current.remove(modelRef.current)
        }

        if (modelFormat === 'stl' || modelFormat === 'ply') {
          modelRef.current = new THREE.Mesh(
            object,
            new THREE.MeshStandardMaterial({ color: 0x606060 })
          )
        } else {
          modelRef.current = (object as any).scene ?? object
        }

        sceneRef.current.add(modelRef.current)
        centerAndFitCamera(modelRef.current)
      })
    }

    const centerAndFitCamera = (object: THREE.Object3D) => {
      const box = new THREE.Box3().setFromObject(object)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      object.position.sub(center)

      const maxDim = Math.max(size.x, size.y, size.z)
      const fov = camera.fov * (Math.PI / 180)
      const distance = maxDim / (2 * Math.tan(fov / 2))
      camera.position.set(0, 0, distance * 1.1)
      camera.lookAt(0, 0, 0)
      controls.target.set(0, 0, 0)
      controls.update()
    }

    const handleResize = () => {
      if (!canvasRef.current || !cameraRef.current || !rendererRef.current) return
      const width = canvasRef.current.clientWidth
      const height = canvasRef.current.clientHeight
      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    }

    loadModel()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current)
      if (rendererRef.current?.domElement) rendererRef.current.domElement.remove()
    }
  }, [modelURL, modelFormat])

  return <div id={styles['canvas-flex']} ref={canvasRef}></div>
}
