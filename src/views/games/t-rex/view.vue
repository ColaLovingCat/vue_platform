<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue'

const canvas: any = ref(null)

const gameConfigs = reactive({
  canvas: {
    width: 800,
    height: 800,
  },
})
const gameInfos = reactive({
  score: 0,
  gameOver: false,
  animationId: null as any,
})

const canvasWidth = 800
const canvasHeight = 200

// Dino settings
const dino = {
  x: 50,
  y: 150,
  width: 40,
  height: 40,
  velocityY: 0,
  gravity: 0.6,
  jumpForce: -10,
  isJumping: false
}

// Obstacles
const obstacles: any[] = []
const obstacleInterval = 1500 // ms
let lastObstacleTime = 0

// Game
// const score = ref(0)
let gameOver = false
let animationId: any
const isGameOver = ref(false)

// 画方块
function drawRect(ctx: any, obj: any, color: string) {
  ctx.fillStyle = color
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height)
}
function spawnObstacle() {
  const cactus = {
    x: canvasWidth,
    y: 160,
    width: 20 + Math.random() * 20,
    height: 40,
    speed: 6
  }
  obstacles.push(cactus)
}

function resetGame() {
  dino.y = 150
  dino.velocityY = 0
  obstacles.length = 0
  gameInfos.score = 0
  isGameOver.value = false
  gameOver = false
  lastObstacleTime = 0
  loop(performance.now())
}

function loop(timestamp: any) {
  const ctx = canvas.value.getContext('2d')
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  // Update Dino
  dino.velocityY += dino.gravity
  dino.y += dino.velocityY
  if (dino.y > 150) {
    dino.y = 150
    dino.isJumping = false
  }

  // Draw Dino
  drawRect(ctx, dino, '#555')

  // Spawn obstacles
  if (timestamp - lastObstacleTime > obstacleInterval) {
    spawnObstacle()
    lastObstacleTime = timestamp
  }

  // Update and draw obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i]
    obs.x -= obs.speed
    drawRect(ctx, obs, 'green')

    // Collision
    if (
      dino.x < obs.x + obs.width &&
      dino.x + dino.width > obs.x &&
      dino.y < obs.y + obs.height &&
      dino.y + dino.height > obs.y
    ) {
      gameOver = true
      isGameOver.value = true
    }

    if (obs.x + obs.width < 0) {
      obstacles.splice(i, 1)
      gameInfos.score++
    }
  }

  if (!gameOver) {
    animationId = requestAnimationFrame(loop)
  }
}

function handleKeydown(e: any) {
  if (e.code === 'Space') {
    if (!dino.isJumping && !gameOver) {
      dino.velocityY = dino.jumpForce
      dino.isJumping = true
    }
    e.preventDefault()
  }
  if (e.code === 'KeyR' && gameOver) {
    resetGame()
  }
}

onMounted(() => {
  console.log('Testing: ', 111)
  document.addEventListener('keydown', handleKeydown)
  resetGame()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="box-games">
    <div class="box-infos">
      <div class="box-tips">
        <div class="box-contents">
          <p class="item-score">{{ gameInfos.score }}</p>
          <p v-if="isGameOver" class="item-status">Game Over</p>
        </div>
      </div>
      <div class="box-tips">
        <div class="header">
          <h4>提示</h4>
        </div>
        <div class="box-contents">
          <p>重开游戏: <span>R</span></p>
        </div>
      </div>
    </div>
    <div class="box-canvas">
      <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url(../com/games.scss);

.box-canvas {
  display: block;
  width: 800px;
  border: 2px solid #ccc;
  background-color: #f4f4f4;
}

.score {
  position: absolute;
  top: 8px;
  left: 12px;
  font-size: 16px;
  font-family: monospace;
}

.game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: red;
  font-family: monospace;
}
</style>
