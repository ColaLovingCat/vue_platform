<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import * as THREE from 'three'
import { TresCanvas, useLoader, useRenderLoop } from '@tresjs/core'
const { onLoop } = useRenderLoop()
import { OrbitControls } from '@tresjs/cientos'

import gsap from 'gsap'

// name
defineOptions({
  name: 'app-three'
})

// props
const props = defineProps({
  configs: {
    type: Object,
    default: () => ({})
  },
  models: {
    type: Object,
    default: () => ({})
  },
  changeMark: {
    type: Boolean,
    require: false
  }
})

// emits
const emits = defineEmits<{
  (event: 'update', values: any): void
}>()

onMounted(() => {
  const { camera } = props.configs
  console.log('Testing: ', ...camera.lookAt)
  Object.assign(cameraInfos, camera)
  cameraRef.value.lookAt(
    0.19522064459881325,
    -0.17308252959765108,
    -0.965365908798577
  )
})

onLoop(() => {
  // console.log('📷 相机位置:', getinfosCamera())
})

watch(
  () => props.configs.camera,
  (newVal) => {
    flyTo(newVal)
  },
  { deep: true }
)

const cameraRef: any = ref(null)
const cameraInfos = reactive({
  desc: "01",
  position: [0, 0, 0],
  lookAt: [0, 0, 0]
})
const getinfosCamera = () => {
  if (!cameraRef.value) return null

  const camera = cameraRef.value

  // 摄像机位置
  const position = camera.position.clone()

  // 计算当前相机朝向（用 z轴负方向 * rotation）
  const direction = new THREE.Vector3()
  camera.getWorldDirection(direction)

  // 创建射线
  const ray = new THREE.Ray(position, direction)
  // 与 y = 0 的平面相交（XZ平面）
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0) // normal 向上，平面过原点
  const intersection = new THREE.Vector3()
  ray.intersectPlane(plane, intersection)

  return {
    position: [position.x, position.y, position.z],
    lookAt: [direction.x, direction.y, direction.z],
  }
}
// 摄像机移动动画
const flyTo = (target: { position: number[]; lookAt: number[] }) => {
  if (!cameraRef.value) return

  const camera = cameraRef.value
  const controls = controlsRef.value
  const { position, lookAt } = target
  console.log('Testing: ', target)

  const animatedLookAt = {
    x: cameraInfos.lookAt[0],
    y: cameraInfos.lookAt[1],
    z: cameraInfos.lookAt[2]
  }

  // 动画位移
  gsap.to(camera.position, {
    x: position[0],
    y: position[1],
    z: position[2],
    duration: 2,
    ease: "power1.inOut", // 缓动效果
    onUpdate: () => {
      controls.update()
    }
  })
  // 动画移动控制器的目标
  gsap.to(controls.target, {
    x: lookAt[0],
    y: lookAt[1],
    z: lookAt[2],
    duration: 2,
    ease: "power1.inOut",
    onUpdate: () => {
      controls.update()
    }
  })
}

const controlsRef: any = ref(null)

</script>

<template>
  <TresCanvas shadows>
    <!-- 相机 -->
    <TresPerspectiveCamera ref="cameraRef" visible :args="[45, 1, 0.1, 1000]" :position="cameraInfos.position" />
    <!-- 环境光 -->
    <TresAmbientLight :intensity="1" />
    <!-- 控制器 -->
    <OrbitControls ref="controlsRef" />

    <!-- 辅助线 -->
    <TresAxesHelper :args="[5]" />
    <TresGridHelper :args="[10, 10]" />

    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
  </TresCanvas>
</template>

<style scoped lang="scss"></style>
