<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'

import type { Player } from '@/views/commons/games/games'

// name
defineOptions({
  name: 'blackjack'
})

// 定义棋子类型
interface ChessPiece {
  value: number
  loc: { x: number; y: number }
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D
const pageInfos = reactive({
  activeCode: '',
  configs: {
    size: 25,
    spacing: 30,
  },
  //
  hostPlayer: {
    code: 'player1',
    showName: 'player1',
    isOnline: true,
    img: 'player1.png',
  } as Player,
  //
  otherPlayer: {
    code: 'player2',
    showName: 'player2',
    isOnline: true,
    img: 'player2.png',
  } as Player,
})
// 棋盘状态
const chessMap: ChessPiece[][] = Array.from({ length: pageInfos.configs.size }, (_, i) =>
  Array.from({ length: pageInfos.configs.size }, (_, j) => ({
    value: -1,
    loc: { x: j, y: i }
  }))
)

onMounted(() => {
  if (canvasRef.value) {
    const context = canvasRef.value.getContext('2d')
    if (context) {
      ctx = context
      ctx.strokeStyle = '#4d4d4d'
      drawMap()
    }
  }
})

let chessColor = 0 // 0: black, 1: white
function drawMap() {
  for (let i = 0; i < pageInfos.configs.size; i++) {
    // vertical line
    ctx.moveTo(15 + i * pageInfos.configs.spacing, 15)
    ctx.lineTo(15 + i * pageInfos.configs.spacing, pageInfos.configs.spacing * pageInfos.configs.size - 15)
    ctx.stroke()

    // horizontal line
    ctx.moveTo(15, 15 + i * pageInfos.configs.spacing)
    ctx.lineTo(pageInfos.configs.spacing * pageInfos.configs.size - 15, 15 + i * pageInfos.configs.spacing)
    ctx.stroke()
  }
}
function redrawMap() {
  if (canvasRef.value) {
    const canvas = canvasRef.value
    canvas.height = canvas.height // 清空画布
    drawMap()
  }
}

function clickLoc(e: MouseEvent): { x: number; y: number } {
  const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
  return {
    x: Math.floor((e.clientX - rect.left) / pageInfos.configs.spacing),
    y: Math.floor((e.clientY - rect.top) / pageInfos.configs.spacing)
  }
}
function onCanvasClick(e: MouseEvent) {
  const loc = clickLoc(e)
  if (chessMap[loc.x][loc.y].value < 0) {
    putChess(loc.x, loc.y, chessColor)
    chessMap[loc.x][loc.y].value = chessColor
    const won = checkWin(loc.x, loc.y)
    if (won) {
      alert(chessColor === 0 ? '黑棋赢' : '白棋赢')
    }
    chessColor = 1 - chessColor // 交换颜色
  }
}
function putChess(i: number, j: number, color: number) {
  drawChess(i, j, color)
}
function drawChess(i: number, j: number, color: number) {
  ctx.beginPath()
  ctx.arc(15 + i * pageInfos.configs.spacing, 15 + j * pageInfos.configs.spacing, 13, 0, Math.PI * 2, false)
  ctx.closePath()
  ctx.stroke()
  const grd = ctx.createRadialGradient(15 + i * pageInfos.configs.spacing + 2, 15 + j * pageInfos.configs.spacing - 2, 10, 15 + i * pageInfos.configs.spacing + 2, 15 + j * pageInfos.configs.spacing - 2, 0)
  if (color === 0) {
    grd.addColorStop(0, '#0a0a0a')
    grd.addColorStop(1, '#636767')
  } else {
    grd.addColorStop(0, '#d1d1d1')
    grd.addColorStop(1, '#f9f9f9')
  }
  ctx.fillStyle = grd
  ctx.fill()
}
function checkWin(i: number, j: number): boolean {
  const dirs = [
    [[-1, -1], [1, 1]], // ↘
    [[-1, 0], [1, 0]], // ↓
    [[-1, 1], [1, -1]], // ↙
    [[0, 1], [0, -1]] // →
  ]
  const color = chessMap[i][j].value
  return dirs.some(dir => {
    let count = 1
    for (const [dx, dy] of dir) {
      for (let step = 1; step < 5; step++) {
        const x = i + dx * step
        const y = j + dy * step
        if (x < 0 || y < 0 || x >= pageInfos.configs.size || y >= pageInfos.configs.size || chessMap[x][y].value !== color) break
        count++
      }
    }
    return count >= 5
  })
}

</script>

<template>
  <div class="box-games">
    <div class="box-player">
      <div class="player-item" v-bind:class="pageInfos.hostPlayer.code == pageInfos.activeCode ? '' : 'disabled'">
        <div class="player-infos">
          <div class="item-img">
            <img class="player-img" v-bind:src="'/docs/game/players/' + pageInfos.hostPlayer.img"
              onerror="console.log('IMGError','others')">
          </div>
          <div class="item-name">
            <i class="fa fa-circle" v-bind:class="pageInfos.hostPlayer.isOnline ? 'active' : ''"></i> {{
              pageInfos.hostPlayer.showName }}
          </div>
        </div>
      </div>
    </div>
    <div class="box-desk">
      <canvas ref="canvasRef" height="750" width="750" @click="onCanvasClick"></canvas>
    </div>
    <div class="box-player">
      <div class="player-item" v-bind:class="pageInfos.otherPlayer.code == pageInfos.activeCode ? '' : 'disabled'">
        <div class="player-infos">
          <div class="item-img">
            <img class="player-img" v-bind:src="'/docs/game/players/' + pageInfos.otherPlayer.img"
              onerror="console.log('IMGError','others')">
          </div>
          <div class="item-name">
            <i class="fa fa-circle" v-bind:class="pageInfos.hostPlayer.isOnline ? 'active' : ''"></i> {{
              pageInfos.otherPlayer.showName
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url(../com/games.scss);

.box-games {
  position: relative;
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;

  .box-player {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .box-desk {
    width: 750px;
  }
}
</style>
