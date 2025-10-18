<script lang="ts" setup>
import { onMounted, ref, onBeforeUnmount, reactive } from 'vue'

interface Block {
  x: number
  y: number
}

const canvas = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

const gameConfigs = reactive({
  tileSize: 20, // 单元格大小
  grid: {
    width: 20,  // 游戏场景长
    height: 20,  // 游戏场景宽
  },
  //
  color: '',
})
const gameInfos = reactive({
  snake: [] as Block[], // 蛇
  direction: '', // 方向
  food: {} as Block, // 食物
  //
  interval: null as number | null,
  score: 0,
  isPaused: false,
  status: '',
})


onMounted(() => {
  if (canvas.value) ctx.value = canvas.value.getContext('2d')
  //
  restart()
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (gameInfos.interval) clearInterval(gameInfos.interval)
  window.removeEventListener('keydown', onKeydown)
})

// 初始化画布
function drawBoard() {
  if (!ctx.value) return
  ctx.value.fillStyle = '#000'
  ctx.value.fillRect(0, 0, 400, 400)

  // 画食物
  ctx.value.fillStyle = 'red'
  ctx.value.fillRect(gameInfos.food.x * gameConfigs.tileSize,
    gameInfos.food.y * gameConfigs.tileSize,
    gameConfigs.tileSize,
    gameConfigs.tileSize)

  // 画蛇
  ctx.value.fillStyle = 'lime'
  // 身体
  for (const segment of gameInfos.snake) {
    ctx.value.fillRect(segment.x * gameConfigs.tileSize,
      segment.y * gameConfigs.tileSize,
      gameConfigs.tileSize,
      gameConfigs.tileSize)
  }
}

// 随机放置食物
function placeFood() {
  let newFood: any
  do {
    newFood = {
      x: Math.floor(Math.random() * gameConfigs.grid.width),
      y: Math.floor(Math.random() * gameConfigs.grid.height)
    }
  } while (gameInfos.snake.some(seg => seg.x === newFood.x && seg.y === newFood.y))
  gameInfos.food = newFood
}

// 键盘控制
function onKeydown(e: KeyboardEvent) {
  if ((e.key === 'r' || e.code === 'r')) {
    restart()
    return
  }

  if ((e.key === ' ' || e.code === 'Space')) {
    e.preventDefault()
    togglePause()
    return
  }
  if (gameInfos.isPaused) return // 暂停时忽略方向键

  if (e.key === 'ArrowUp' || e.key === 'w') {
    if (gameInfos.direction !== 'down') gameInfos.direction = 'up'
  } else if (e.key === 'ArrowDown' || e.key === 's') {
    if (gameInfos.direction !== 'up') gameInfos.direction = 'down'
  } else if (e.key === 'ArrowLeft' || e.key === 'a') {
    if (gameInfos.direction !== 'right') gameInfos.direction = 'left'
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    if (gameInfos.direction !== 'left') gameInfos.direction = 'right'
  }
}

// 移动
function moveSnake() {
  if (gameInfos.isPaused) return // 暂停时不更新

  const head = { ...gameInfos.snake[0] }

  switch (gameInfos.direction) {
    case 'up': head.y--; break
    case 'down': head.y++; break
    case 'left': head.x--; break
    case 'right': head.x++; break
  }

  // 碰到墙壁或自己就游戏结束
  if (
    head.x < 0
    || head.x >= gameConfigs.grid.width
    || head.y < 0
    || head.y >= gameConfigs.grid.height
    || gameInfos.snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    if (gameInfos.interval) clearInterval(gameInfos.interval)
    gameInfos.status = "已结束"
    return
  }

  gameInfos.snake.unshift(head)

  // 吃到食物
  if (head.x === gameInfos.food.x && head.y === gameInfos.food.y) {
    gameInfos.score++
    placeFood()
  } else {
    gameInfos.snake.pop()
  }

  drawBoard()
}

// 暂停
function togglePause() {
  gameInfos.isPaused = !gameInfos.isPaused
  gameInfos.status = gameInfos.isPaused ? "已暂停" : "运行中"
}

// 重启游戏
function restart() {
  gameInfos.score = 0
  //
  gameInfos.direction = 'right'
  gameInfos.snake = [{ x: 10, y: 10 }]
  //
  placeFood()
  //
  if (gameInfos.interval) clearInterval(gameInfos.interval)
  gameInfos.interval = setInterval(moveSnake, 150)
  gameInfos.status = "运行中"
}
</script>

<template>
  <div class="box-games">
    <div class="box-infos">
      <div class="box-tips">
        <div class="box-contents">
          <p class="item-score">{{ gameInfos.score }}</p>
          <p class="item-status">{{ gameInfos.status }}</p>
        </div>
      </div>
      <div class="box-tips">
        <div class="header">
          <h4>提示</h4>
        </div>
        <div class="box-contents">
          <p>控制方向: <span>↑</span><span>↓</span><span>←</span><span>→</span></p>
          <p>暂停/继续: <span>Space</span></p>
          <p>重开游戏: <span>R</span></p>
        </div>
      </div>
    </div>
    <div class="box-canvas">
      <canvas ref="canvas" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url(../com/games.scss);

canvas {
  border: 2px solid #333;
  background: #000;
}
</style>
