<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch, onUnmounted } from 'vue'

import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { WallGeometry } from "./walls/WallGeometry";
import { FlowWallMaterial } from "./walls/FlowWallMaterial";
import labelView from './labels/view.vue'

import { Pane } from 'tweakpane'

// 使用 tween.js 实现平滑动画
import * as TWEEN from "@tweenjs/tween.js";

import { gsap } from "gsap";

import * as current from "./index.services";

// name
defineOptions({
  name: 'three-dashboard'
})

const emits = defineEmits<{
  (event: 'changed', values: any): void
}>()

const pageInfos = reactive({
  debug: false, // 启用自动镜头移动
  //
  camera: {
    timer: null as any,
    currentIndex: 0,
    list: [
      {
        desc: '01',
        position: [-50, 90, -50],
        lookAt: [0, 0, 0]
      },
      {
        desc: '02',
        position: [50, 50, -50],
        lookAt: [0, 0, 0]
      },
    ]
  },
  //
  walls: [
    [
      [12, 6],
      [12, -11],
      [-12, -11],
      [-12, 6],
      [12, 6],
    ],
  ],
  //
  agv: {
    currentIndex: 0,
    list: [
      [17, 0, 7],
      [17, 0, -15],
    ]
  },
  roads: [
    { size: { width: 3, height: 25 }, position: [13, 0, 11], color: 0x212121 },
  ],
  //
  labels: [
    {
      id: 1,
      position: [-11, 2, -11],
      infos: {content:'Test Content'}
    }
  ]
})
const loadModels = async () => {
  // 环境光
  await current.loadExr(SCENE, "/docs/models/hdr/studio_small_02_1k.exr");

  // 
  const model: any = await current.loadGLB("/docs/models/factory.glb");
  model.position.set(0, 0, 0)
  model.scale.set(6, 6, 6)
  SCENE.add(model);

  // 地标
  const label: any = await current.loadText('Factory', 1.5)
  label.position.set(0, 0, -15)
  SCENE.add(label);

  // 光墙
  const material = new FlowWallMaterial({ time: u_time });
  pageInfos.walls.forEach((wall: any) => {
    const wallMesh = new THREE.Mesh(
      new WallGeometry({
        points: wall,
        height: 3,
      }),
      material
    );
    SCENE.add(wallMesh);
  });

  // AGV
  const agv: any = await current.loadGLB("/docs/models/agv.glb");
  SCENE.add(agv);
  agv.position.set(...pageInfos.agv.list[0])
  autoAGV(agv)

  // 道路
  pageInfos.roads.forEach((road: any) => {
    const { size, position, color } = road
    // 创建地面（白色 #fff）
    const geometry = new THREE.PlaneGeometry(size.width, size.height); // 指定大小，例如 10x10 的地面
    const material = new THREE.MeshBasicMaterial({ color }); // 设置颜色为 #fff
    const plane = new THREE.Mesh(geometry, material);
    geometry.translate(size.width / 2, size.height / 2, 0);
    // 调整地面的旋转角度，平放在XZ平面上
    plane.rotation.x = -Math.PI / 2;
    // 设置地面的位置
    plane.position.set(position[0], position[1], position[2]); // 指定地面的位置

    // 将地面添加到场景
    SCENE.add(plane);
  });

  // 镜头移动
  if (!pageInfos.debug) {
    pageInfos.camera.timer = setInterval(() => {
      pageInfos.camera.currentIndex = (pageInfos.camera.currentIndex + 1) % pageInfos.camera.list.length
      let infos = pageInfos.camera.list[pageInfos.camera.currentIndex]
      moveCameraTo(infos)
      emits('changed', {
        action: 'camera',
        values: infos
      })
    }, 5000);
  }
}
const autoAGV = (agv: any) => {
  pageInfos.agv.currentIndex = (pageInfos.agv.currentIndex + 1) % pageInfos.agv.list.length
  let point = pageInfos.agv.list[pageInfos.agv.currentIndex]
  moveModelTo(agv, {
    position: point,
    duration: 10,
  }, () => { autoAGV(agv) })
}

const canvasRef: any = ref(null);
let RENDERER: any = null;
let RENDERER2D: any = null;
let SCENE: any = null;
let CAMERA: any = null;
let CONTROLS: any = null;
//
const u_time = ref<number>(0);
const sceneInfos = reactive({
  renderReady: false,
  size: {
    width: 0,
    height: 0
  },
  isMoving: false,
  moveDuration: 2,
  camera: {
    position: [0, 0, 0],
    lookAt: [0, 0, 0]
  }
})

onMounted(() => {
  const canvas = canvasRef.value
  if (canvas) {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    //
    sceneInfos.size = { width, height }
    canvas.width = width
    canvas.height = height
  }
  //
  sceneInfos.camera = { ...pageInfos.camera.list[0] }
  initial3D()
})
onUnmounted(() => {
  if (PANE) {
    PANE.dispose()
    PANE = null
  }
})

// Threejs
const initial3D = () => {
  // WebGL渲染器 设置
  RENDERER = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
  });

  // 初始化 SCENE
  SCENE = new THREE.Scene();
  SCENE.background = new THREE.Color(0x00060c);

  // 辅助线
  const axesHelper = new THREE.AxesHelper(100);
  const gridHelper = new THREE.GridHelper(200, 20);
  if (pageInfos.debug) {
    SCENE.add(axesHelper);
    SCENE.add(gridHelper);
  }

  // 光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
  directionalLight.position.set(400, 200, 300);
  // SCENE.add(directionalLight);
  const ambient = new THREE.AmbientLight(0xffffff, 0.2);
  // SCENE.add(ambient);

  const { width, height } = sceneInfos.size

  // 2D渲染器
  RENDERER2D = new CSS2DRenderer()
  RENDERER2D.setSize(width, height)
  RENDERER2D.domElement.style.position = 'absolute'
  RENDERER2D.domElement.style.top = '0px'
  RENDERER2D.domElement.style.left = '0px'
  RENDERER2D.domElement.style.pointerEvents = 'none'
  canvasRef.value.parentElement.appendChild(RENDERER2D.domElement)
  sceneInfos.renderReady = true

  // 初始化 CAMERA 和 CONTROLS
  CAMERA = new THREE.PerspectiveCamera(
    30, // fov|视角大小
    width / height, // aspect|纵宽比
    1, // near|可见最近平面
    3000 // far|可见最远平面
  );
  CONTROLS = new OrbitControls(CAMERA, RENDERER.domElement);

  // 初始化 CAMERA 位置
  const { position, lookAt } = sceneInfos.camera
  CAMERA.position.set(...position);
  CAMERA.lookAt(...lookAt);

  //
  if (pageInfos.debug) {
    initialPane()
    //
    CONTROLS.addEventListener('change', () => {
      syncSceneInfosFromCamera()
    })
  }

  //
  loadModels()

  // 渲染循环
  RENDERER.setSize(width, height);
  render();
};
const clock = new THREE.Clock();
const render = () => {
  u_time.value = clock.getElapsedTime();
  // 同时移动lookat
  if (sceneInfos.isMoving) {
    const target = new THREE.Vector3(...sceneInfos.camera.lookAt);
    CAMERA.lookAt(target);
    CAMERA.updateProjectionMatrix();
  }

  // 渲染
  RENDERER.render(SCENE, CAMERA);
  //
  if (RENDERER2D.__labelUpdateCallbacks) {
    RENDERER2D.__labelUpdateCallbacks.forEach((fn: any) => fn())
  }
  RENDERER2D.render(SCENE, CAMERA)

  TWEEN.update();
  requestAnimationFrame(render);
};

// 移动相机
const moveCameraTo = (target: { position: number[]; lookAt: number[] }) => {
  // 关闭控制
  if (CONTROLS) {
    CONTROLS.enabled = false;
  }
  const { position, lookAt } = target;
  gsap.to(CAMERA.position, {
    x: position[0],
    y: position[1],
    z: position[2],
    duration: sceneInfos.moveDuration, // 动画持续时间（秒）
    ease: "power1.inOut", // 缓动效果
    onUpdate: () => { },
    onComplete: () => {
      if (CONTROLS) {
        CONTROLS.enabled = true;
        CONTROLS.update();
      }
    },
  });
  gsap.to(sceneInfos.camera.lookAt, {
    x: lookAt[0],
    y: lookAt[1],
    z: lookAt[2],
    duration: sceneInfos.moveDuration, // 动画持续时间与相机移动一致
    ease: "power1.inOut", // 缓动效果
    onUpdate: () => {
      sceneInfos.isMoving = true
    },
    onComplete: () => {
      sceneInfos.isMoving = false
    },
  });
}
const syncSceneInfosFromCamera = () => {
  const pos = CAMERA.position
  const target = CONTROLS.target

  sceneInfos.camera.position[0] = pos.x
  sceneInfos.camera.position[1] = pos.y
  sceneInfos.camera.position[2] = pos.z

  sceneInfos.camera.lookAt[0] = target.x
  sceneInfos.camera.lookAt[1] = target.y
  sceneInfos.camera.lookAt[2] = target.z

  // 选配：刷新 tweakpane（防止只在 init 时绑定）
  PANE.refresh()
}
// 移动物体
const moveModelTo = (model: any, moveTo: { position: number[], duration: number }, complete: Function) => {
  gsap.to(model.position, {
    x: moveTo.position[0],
    y: moveTo.position[1],
    z: moveTo.position[2],
    duration: moveTo.duration,
    onUpdate: () => { },
    onComplete: () => {
      complete()
    },
  });
}

// 控制面板
let PANE: any = null;
const initialPane = () => {
  PANE = new Pane()
  PANE.element.style.position = 'absolute'
  PANE.element.style.top = '70px'
  PANE.element.style.right = '10px'
  PANE.element.style.zIndex = '1000'
  // 相机位置调试
  const cameraFolder = PANE.addFolder({ title: 'Camera' })
  cameraFolder.addBinding(sceneInfos.camera.position, '0', { label: 'x', min: -200, max: 200 }).on('change', syncCameraPosition)
  cameraFolder.addBinding(sceneInfos.camera.position, '1', { label: 'y', min: -200, max: 200 }).on('change', syncCameraPosition)
  cameraFolder.addBinding(sceneInfos.camera.position, '2', { label: 'z', min: -200, max: 200 }).on('change', syncCameraPosition)
  cameraFolder.addBinding(sceneInfos.camera.lookAt, '0', { label: 'lookX', min: -200, max: 200 }).on('change', syncCameraPosition)
  cameraFolder.addBinding(sceneInfos.camera.lookAt, '1', { label: 'lookY', min: -200, max: 200 }).on('change', syncCameraPosition)
  cameraFolder.addBinding(sceneInfos.camera.lookAt, '2', { label: 'lookZ', min: -200, max: 200 }).on('change', syncCameraPosition)
}
const syncCameraPosition = () => {
  if (CAMERA) {
    const [x, y, z] = sceneInfos.camera.position
    CAMERA.position.set(x, y, z)
    const lookAt = sceneInfos.camera.lookAt
    CAMERA.lookAt(lookAt[0], lookAt[1], lookAt[2])
    CAMERA.updateProjectionMatrix()
  }
}

// 自适应
window.addEventListener('resize', () => {
  const width = canvasRef.value.clientWidth
  const height = canvasRef.value.clientHeight
  sceneInfos.size = { width, height }
  CAMERA.aspect = width / height
  CAMERA.updateProjectionMatrix()
  RENDERER.setSize(width, height)
})
</script>

<template>
  <div class="box-three">
    <canvas id="canvas" ref="canvasRef"></canvas>
    <labelView v-if="sceneInfos.renderReady" v-for="(label, idx) in pageInfos.labels" :key="idx" :scene="SCENE"
      :renderer2D="RENDERER2D" :camera="CAMERA" :position="new THREE.Vector3(...label.position)" :infos="label.infos" />
  </div>
</template>

<style scoped lang="scss">
.box-three {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
