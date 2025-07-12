import * as THREE from "three";
import {
  EXRLoader,
  GLTFLoader,
  FontLoader,
} from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

const gltfLoader = new GLTFLoader();
export const loadGLB = (path: string) => {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      path,
      (gltf: any) => {
        resolve(gltf.scene);
      },
      (xhr: any) => {
        console.log(`load ${(xhr.loaded / xhr.total) * 100}%`);
      },
      (error: any) => {
        // 发生错误时 reject 返回错误信息
        console.error("load error", error);
        reject(error);
      }
    );
  });
};

const exrLoader = new EXRLoader();
export const loadExr = (scene: any, path: string) => {
  exrLoader.loadAsync(path).then((texture: any) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
  });
};

const fontLoader = new FontLoader();
export const loadText = (text: string, size: number) => {
  // 加载字体
  return new Promise((resolve, reject) => {
    fontLoader.load(
      "/systems/fonts/json/helvetiker_bold.typeface.json",
      function (font) {
        const geometry = new TextGeometry(text, {
          font: font,
          size, // 文本大小
          depth: 0.2, // 文本厚度
          curveSegments: 12, // 曲线段数，决定平滑度
        });

        const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // 文字颜色
        const textMesh = new THREE.Mesh(geometry, material);

        // 使文本朝向 Y 轴，并放置在 XZ 平面上
        textMesh.rotation.x = -Math.PI / 2;
        textMesh.rotation.z = Math.PI;

        resolve(textMesh);
      }
    );
  });
};

// 获取相机的位置和look
export const getinfosCamera = (camera: any) => {
  // 获取摄像机的坐标
  const cameraPosition = camera.position;
  const positionX = cameraPosition.x.toFixed(2);
  const positionY = cameraPosition.y.toFixed(2);
  const positionZ = cameraPosition.z.toFixed(2);
  // 获取相机的方向向量
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  // 假设 XZ 平面的方程为 y = 0，计算与平面的交点
  // 使用射线和交点计算
  const planeY = 0; // XZ 平面的 Y 坐标
  const rayOrigin = camera.position; // 射线起点为相机位置
  const rayDirection = direction; // 射线方向为相机的看向方向
  // 计算与平面的交点
  const t = (planeY - rayOrigin.y) / rayDirection.y;
  if (t >= 0) {
    const intersectionPoint = rayOrigin
      .clone()
      .add(rayDirection.multiplyScalar(t));
    //
    const lookatX = intersectionPoint.x.toFixed(2);
    const lookatY = intersectionPoint.y.toFixed(2);
    const lookatZ = intersectionPoint.z.toFixed(2);
    console.log("[Camera]", {
      position: [positionX * 1, positionY * 1, positionZ * 1],
      lookAt: [lookatX * 1, lookatY * 1, lookatZ * 1],
    });
  }
};
