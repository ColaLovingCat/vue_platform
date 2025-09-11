<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'

// name
defineOptions({
  name: 'custom-name'
})

// 基础功能
// 得分系统
// 方块影子
// 长按加速
// 空格落底

const canvasRef = ref<HTMLCanvasElement | null>(null)
const previewCanvasRef = ref<HTMLCanvasElement | null>(null)
const gameConfigs = reactive({
  // 画布大小
  rows: 25,
  cols: 10,
  // 像素大小
  size: 25,
})
const gameInfos = reactive({
  score: 0,
  level: 1,
  isPaused: false,
})


const pageInfos = reactive({
  configs: {
    // 画布大小
    rows: 25,
    cols: 10,
    // 像素大小
    size: 25,
  },
  score: 0,
})

// 定义俄罗斯方块的所有形状（7种类型，每种有4个旋转状态）
const SHAPES = [
  // I
  [[[1], [1], [1], [1]], [[1, 1, 1, 1]], [[1], [1], [1], [1]], [[1, 1, 1, 1]]],
  // J
  [[[1, 0, 0], [1, 1, 1]], [[1, 1], [1, 0], [1, 0]], [[1, 1, 1], [0, 0, 1]], [[0, 1], [0, 1], [1, 1]]],
  // L
  [[[0, 0, 1], [1, 1, 1]], [[1, 0], [1, 0], [1, 1]], [[1, 1, 1], [1, 0, 0]], [[1, 1], [0, 1], [0, 1]]],
  // O
  [[[1, 1], [1, 1]], [[1, 1], [1, 1]], [[1, 1], [1, 1]], [[1, 1], [1, 1]]],
  // S
  [[[0, 1, 1], [1, 1, 0]], [[1, 0], [1, 1], [0, 1]], [[0, 1, 1], [1, 1, 0]], [[1, 0], [1, 1], [0, 1]]],
  // T
  [[[0, 1, 0], [1, 1, 1]], [[1, 0], [1, 1], [1, 0]], [[1, 1, 1], [0, 1, 0]], [[0, 1], [1, 1], [0, 1]]],
  // Z
  [[[1, 1, 0], [0, 1, 1]], [[0, 1], [1, 1], [1, 0]], [[1, 1, 0], [0, 1, 1]], [[0, 1], [1, 1], [1, 0]]]
]
// index 0 为背景色（或空格），其余依次对应方块类型
const COLORS = [
  '',              // 0: 空格（不绘制）
  '#00f0f0',       // 1: I（青色）
  '#0000f0',       // 2: J（蓝色）
  '#f0a000',       // 3: L（橙色）
  '#f0f000',       // 4: O（黄色）
  '#00f000',       // 5: S（绿色）
  '#a000f0',       // 6: T（紫色）
  '#f00000',       // 7: Z（红色）
]

// 初始化一个空的游戏区域（全为 0）
const board = ref(
  Array.from({ length: pageInfos.configs.rows }, () => Array(pageInfos.configs.cols).fill(0))
)
// 当前下落方块状态（位置、类型、旋转状态）
const currentPiece = ref({
  shapeIndex: 0, // 当前方块形状编号（0~6）
  rotation: 0,   // 旋转状态（0~3）
  x: 3,          // 横向起始位置
  y: 0           // 纵向起始位置
})
const nextPiece = ref({
  shapeIndex: 0, // 当前方块形状编号（0~6）
  rotation: 0,   // 旋转状态（0~3）
})

// 挂载完成时启动游戏循环和监听键盘
onMounted(() => {
  spawnPiece()

  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)

  const canvas = canvasRef.value
  if (canvas) {
    canvas.width = pageInfos.configs.cols * pageInfos.configs.size
    canvas.height = pageInfos.configs.rows * pageInfos.configs.size
  }
  draw()
  animationFrameId = requestAnimationFrame(gameLoop)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
  // 取消动画循环
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})

// 
function draw() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw board
  for (let r = 0; r < pageInfos.configs.rows; r++) {
    for (let c = 0; c < pageInfos.configs.cols; c++) {
      if (board.value[r][c]) {
        ctx.fillStyle = COLORS[board.value[r][c]]
        ctx.fillRect(
          c * pageInfos.configs.size,
          r * pageInfos.configs.size,
          pageInfos.configs.size,
          pageInfos.configs.size
        )
        // 添加边框
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 1
        ctx.strokeRect(
          c * pageInfos.configs.size,
          r * pageInfos.configs.size,
          pageInfos.configs.size,
          pageInfos.configs.size
        )
      }
    }
  }

  // 绘制当前下落中的方块
  const shape = SHAPES[currentPiece.value.shapeIndex][currentPiece.value.rotation]
  const ghostY = getGhostY()

  // Draw ghost piece
  ctx.globalAlpha = 0.3 // 设置透明度
  ctx.fillStyle = COLORS[currentPiece.value.shapeIndex + 1]
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const x = currentPiece.value.x + c
        const y = ghostY + r
        ctx.fillRect(
          x * pageInfos.configs.size,
          y * pageInfos.configs.size,
          pageInfos.configs.size,
          pageInfos.configs.size
        )
        // 添加边框
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 1
        ctx.strokeRect(
          x * pageInfos.configs.size,
          y * pageInfos.configs.size,
          pageInfos.configs.size,
          pageInfos.configs.size
        )
      }
    }
  }

  ctx.globalAlpha = 1 // 恢复正常透明度
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        ctx.fillStyle = COLORS[currentPiece.value.shapeIndex + 1]
        ctx.fillRect(
          (currentPiece.value.x + x) * pageInfos.configs.size,
          (currentPiece.value.y + y) * pageInfos.configs.size,
          pageInfos.configs.size,
          pageInfos.configs.size
        )
        // 添加边框
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 1
        ctx.strokeRect(
          (currentPiece.value.x + x) * pageInfos.configs.size,
          (currentPiece.value.y + y) * pageInfos.configs.size,
          pageInfos.configs.size,
          pageInfos.configs.size
        )
      }
    })
  })

  drawNext()
}
function drawNext() {
  const canvas = previewCanvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 缩小比例
  const scale = 20
  const shape = SHAPES[nextPiece.value.shapeIndex][nextPiece.value.rotation]
  shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        ctx.fillStyle = COLORS[nextPiece.value.shapeIndex + 1]
        ctx.fillRect(x * scale, y * scale, scale - 1, scale - 1)
        // 添加边框
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 1
        ctx.strokeRect(x * scale, y * scale, scale - 1, scale - 1)
      }
    })
  })
}

// 控制方块
const isFastDropping = ref(false)
function handleKeyDown(e: KeyboardEvent) {
  const shape = SHAPES[currentPiece.value.shapeIndex][currentPiece.value.rotation]
  switch (e.key) {
    case 'ArrowLeft':
      if (isValidMove(shape, -1, 0)) currentPiece.value.x--
      break
    case 'ArrowRight':
      if (isValidMove(shape, 1, 0)) currentPiece.value.x++
      break
    case 'ArrowDown':
      isFastDropping.value = true
      break
    case 'ArrowUp': // 旋转
      const newRotation = (currentPiece.value.rotation + 1) % 4
      const newShape = SHAPES[currentPiece.value.shapeIndex][newRotation]
      if (isValidMove(newShape, 0, 0)) {
        currentPiece.value.rotation = newRotation
      }
      break
    case ' ':
      dropToBottom()
      break
  }
  draw()
}
function handleKeyUp(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    isFastDropping.value = false
  }
}
// 快速下落
function dropToBottom() {
  const shape = SHAPES[currentPiece.value.shapeIndex][currentPiece.value.rotation]
  while (isValidMove(shape, 0, 1)) {
    currentPiece.value.y++
  }
  placePiece()
  draw()
}
// 提前显示方块下落的位置
function getGhostY(): number {
  const shape = SHAPES[currentPiece.value.shapeIndex][currentPiece.value.rotation]
  let ghostY = currentPiece.value.y

  while (isValidMove(shape, 0, ghostY - currentPiece.value.y + 1)) {
    ghostY++
  }

  return ghostY
}

// 判断当前方块是否与已有方块或边界冲突
function isValidMove(shape: number[][], offsetX: number, offsetY: number) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = currentPiece.value.x + x + offsetX
        const newY = currentPiece.value.y + y + offsetY
        // 超出边界或已有方块
        if (
          newX < 0 || newX >= pageInfos.configs.cols || newY >= pageInfos.configs.rows ||
          (newY >= 0 && board.value[newY][newX])
        ) {
          return false
        }
      }
    }
  }
  return true
}
// 将当前方块固定到棋盘上（游戏地图）
function placePiece() {
  const shape = SHAPES[currentPiece.value.shapeIndex][currentPiece.value.rotation]
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell && currentPiece.value.y + y >= 0) {
        // 存储当前方块的颜色索引（shapeIndex + 1）
        board.value[currentPiece.value.y + y][currentPiece.value.x + x] = currentPiece.value.shapeIndex + 1
      }
    })
  })
  clearLines()
  spawnPiece()
}
// 清除整行（满格行）
function clearLines() {
  // 原始行数
  const originalLength = board.value.length
  // 过滤掉满行
  board.value = board.value.filter(row => row.some(cell => cell === 0))
  const linesCleared = originalLength - board.value.length

  // 添加得分：每消一行 +100 分（可自定义）
  if (linesCleared > 0) {
    pageInfos.score += linesCleared * 100
  }

  // 填补顶部空白行
  while (board.value.length < pageInfos.configs.rows) {
    board.value.unshift(Array(pageInfos.configs.cols).fill(0))
  }
}

// 生成一个新的方块
function spawnPiece() {
  // 如果 nextPiece 还没有初始化，就随机生成一个
  if (nextPiece.value.shapeIndex === undefined) {
    nextPiece.value = {
      shapeIndex: Math.floor(Math.random() * SHAPES.length),
      rotation: 0,
    }
  }

  // 当前方块变为之前预存的下一方块
  currentPiece.value = {
    shapeIndex: nextPiece.value.shapeIndex,
    rotation: nextPiece.value.rotation,
    x: 3,
    y: 0
  }
  // 生成新的下一方块
  nextPiece.value = {
    shapeIndex: Math.floor(Math.random() * SHAPES.length),
    rotation: 0,
  }

  // 如果新方块一开始就无效，则游戏结束
  if (!isValidMove(SHAPES[currentPiece.value.shapeIndex][0], 0, 0)) {
    alert('Game Over')
    board.value = Array.from({ length: pageInfos.configs.rows }, () => Array(pageInfos.configs.cols).fill(0))
  }

  // 更新下一方块预览
  drawNext()
}

// 自动让方块向下移动的定时器逻辑
let lastDropTime = 0
const normalDropInterval = 500
const fastDropInterval = 50
// 存储 requestAnimationFrame 的 ID
let animationFrameId: number | null = null
function gameLoop(timestamp: number) {
  const dropInterval = isFastDropping.value ? fastDropInterval : normalDropInterval
  if (timestamp - lastDropTime > dropInterval) {
    const shape = SHAPES[currentPiece.value.shapeIndex][currentPiece.value.rotation]
    if (isValidMove(shape, 0, 1)) {
      currentPiece.value.y++
    } else {
      placePiece()
    }
    draw()
    lastDropTime = timestamp
  }
  animationFrameId = requestAnimationFrame(gameLoop) // 存储 ID
}
</script>

<template>
  <div class="box-games">
    <div class="box-tips">
      <p>控制方向: <span>←</span><span>→</span></p>
      <p>旋转方块: <span>↑</span></p>
      <p>加速下落: <span>↓</span></p>
      <p>直接下落: <span>Space</span></p>
      <p>重开游戏: <span>R</span></p>
    </div>
    <div class="box-map">
      <canvas ref="canvasRef"></canvas>
    </div>
    <div class="box-infos">
      <div style="margin-top: 10px">
        <div>下一块：</div>
        <canvas ref="previewCanvasRef" width="80" height="80" style="border:1px solid #ccc;" />
      </div>
      <div style="margin-top: 12px; font-size: 18px;">
        得分：{{ pageInfos.score }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url(../com/games.scss);

.box-map {
  width: max-content;
  height: max-content;
  background: #111;
}
</style>
