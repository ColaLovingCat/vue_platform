<script lang="ts" setup>
import { reactive, computed, onMounted, onUnmounted } from 'vue'

interface Tile {
  id: number
  empty: boolean
}

const gameConfigs = reactive({
  size: 3, // 尺寸 3x3
})
const total = computed(() => (gameConfigs.size * gameConfigs.size))

// 可选图片
const imageList = ['huang.png', 'pic2.jpg', 'pic3.jpg']
const gameInfos = reactive({
  currentImage: 'huang.png', // 选择图片
  tiles: [] as Tile[],
  moveCount: 0, // 移动步数
})
const isSolved = computed(() => {
  return gameInfos.tiles.every((tile, i) => tile.id === i)
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  shuffle()
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// 初始化切片
function initTiles() {
  gameInfos.tiles = []
  for (let i = 0; i < total.value; i++) {
    gameInfos.tiles.push({
      id: i,
      empty: i === total.value - 1, // 最后一块是空白
    })
  }
}
// 获取背景图片
function getTileStyle(tile: Tile, index: number) {
  if (tile.empty) return {}

  const row = Math.floor(tile.id / gameConfigs.size)
  const col = tile.id % gameConfigs.size

  return {
    backgroundImage: `url(/docs/game/puzzles/${gameInfos.currentImage})`,
    backgroundSize: `${gameConfigs.size * 100}% ${gameConfigs.size * 100}%`,
    backgroundPosition: `${(col / (gameConfigs.size - 1)) * 100}% ${(row / (gameConfigs.size - 1)) * 100}%`,
  }
}

// 打乱顺序
function shuffle() {
  initTiles()
  for (let i = gameInfos.tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[gameInfos.tiles[i], gameInfos.tiles[j]] = [gameInfos.tiles[j], gameInfos.tiles[i]]
  }
  gameInfos.tiles.forEach((t, i) => {
    t.empty = t.id === total.value - 1
  })
  gameInfos.moveCount = 0
}
// 移动切片
function moveTile(index: number) {
  const emptyIndex = gameInfos.tiles.findIndex(t => t.empty)
  const canMove = isAdjacent(index, emptyIndex)
  if (canMove) {
    ;[gameInfos.tiles[index], gameInfos.tiles[emptyIndex]] = [gameInfos.tiles[emptyIndex], gameInfos.tiles[index]]
    gameInfos.moveCount++
  }
}
// 键盘控制移动切片
function handleKeydown(e: any) {
  if ((e.key === 'r' || e.code === 'r')) {
    shuffle()
    return
  }

  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    moveEmptyByKey(e.key)
  }
}
function moveEmptyByKey(key: any) {
  const emptyIndex = gameInfos.tiles.findIndex(t => t.empty)
  const x = emptyIndex % gameConfigs.size
  const y = Math.floor(emptyIndex / gameConfigs.size)
  let targetIndex = -1

  switch (key) {
    case 'ArrowUp':
      if (y < gameConfigs.size - 1) targetIndex = emptyIndex + gameConfigs.size
      break
    case 'ArrowDown':
      if (y > 0) targetIndex = emptyIndex - gameConfigs.size
      break
    case 'ArrowLeft':
      if (x < gameConfigs.size - 1) targetIndex = emptyIndex + 1
      break
    case 'ArrowRight':
      if (x > 0) targetIndex = emptyIndex - 1
      break
  }

  if (targetIndex >= 0 && targetIndex < total.value) {
    moveTile(targetIndex)
  }
}

// 是否可移动
function isAdjacent(i1: any, i2: any) {
  const x1 = i1 % gameConfigs.size,
    y1 = Math.floor(i1 / gameConfigs.size)
  const x2 = i2 % gameConfigs.size,
    y2 = Math.floor(i2 / gameConfigs.size)

  return (
    (x1 === x2 && Math.abs(y1 - y2) === 1) ||
    (y1 === y2 && Math.abs(x1 - x2) === 1)
  )
}
</script>

<template>
  <div class="box-games">
    <div class="box-infos">
      <div class="box-tips">
        <div class="box-contents">
          <p class="item-score">{{ gameInfos.moveCount }}</p>
          <p class="item-status">{{ isSolved ? '恭喜完成拼图！' : '未完成' }}</p>
          <select v-model="gameInfos.currentImage" @change="shuffle">
            <option v-for="img in imageList" :key="img" :value="img">{{ img }}</option>
          </select>
        </div>
      </div>
      <div class="box-tips">
        <div class="header">
          <h4>提示</h4>
        </div>
        <div class="box-contents">
          <p>控制方向: <span>▲</span><span>▼</span><span>◀</span><span>▶</span></p>
          <p>重开游戏: <span>R</span></p>
        </div>
      </div>
    </div>
    <div class="box-puzzle">
      <div v-for="(tile, index) in gameInfos.tiles" :key="tile.id" class="tile" :class="{ empty: tile.empty }"
        :style="getTileStyle(tile, index)" @click="moveTile(index)"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url(../com/games.scss);

.box-puzzle {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 2px;
  margin-bottom: 20px;

  .tile {
    width: 100px;
    height: 100px;
    background-color: #ccc;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
    transition: all 0.2s;

    &.empty {
      background: white;
      cursor: default;
    }
  }
}

.win-text {
  color: green;
  font-weight: bold;
}

.move-counter {
  font-weight: bold;
  color: #333;
}
</style>
