<script lang="ts" setup>
import { ref, reactive, nextTick } from "vue";

interface CellInfos {
  id: number;
  category: string;
  desc: string;
  rules: any[];
  position: { x: number; y: number };
}

interface Player {
  id: number;
  name: string;
  hp: number;
  money: number;
  position: number;
  color: string;
}

const standardCells: Omit<CellInfos, "id" | "position">[] = [
  { category: "normal", desc: "无事发生", rules: [] },
  { category: "money+", desc: "获得金币", rules: [{ money: +100 }] },
  { category: "money-", desc: "失去金币", rules: [{ money: -100 }] },
  { category: "luck", desc: "幸运事件", rules: [] },
  { category: "badluck", desc: "倒霉事件", rules: [] },
];

const createCell = (category?: string): CellInfos => {
  const base =
    standardCells.find((c) => c.category === category) ||
    standardCells[Math.floor(Math.random() * standardCells.length)];
  return {
    id: Date.now() + Math.random(),
    ...base,
    position: { x: 0, y: 0 },
  };
};

const mapCells = ref<CellInfos[]>([]);

const generateCircularMap = (count = 20, size = 400) => {
  const cells: CellInfos[] = [];
  const perSide = Math.ceil(count / 4);
  const spacing = size / (perSide - 1);

  // 上
  for (let i = 0; i < perSide; i++) {
    const cell = createCell();
    cell.position = { x: i * spacing - size / 2, y: -size / 2 };
    cells.push(cell);
  }
  // 右
  for (let i = 1; i < perSide; i++) {
    const cell = createCell();
    cell.position = { x: size / 2, y: -size / 2 + i * spacing };
    cells.push(cell);
  }
  // 下
  for (let i = perSide - 2; i >= 0; i--) {
    const cell = createCell();
    cell.position = { x: i * spacing - size / 2, y: size / 2 };
    cells.push(cell);
  }
  // 左
  for (let i = perSide - 2; i > 0; i--) {
    const cell = createCell();
    cell.position = { x: -size / 2, y: -size / 2 + i * spacing };
    cells.push(cell);
  }

  mapCells.value = cells;
};

generateCircularMap();

// 玩家信息
const players = reactive<Player[]>([
  { id: 1, name: "红方", hp: 100, money: 1000, position: 0, color: "red" },
  { id: 2, name: "蓝方", hp: 100, money: 1000, position: 0, color: "skyblue" },
]);

const currentPlayerIndex = ref(0);
const diceResult = ref<number | null>(null);
const isMoving = ref(false);

const currentPlayer = computed(() => players[currentPlayerIndex.value]);

const rollDice = () => {
  if (isMoving.value) return;
  const result = Math.floor(Math.random() * 6) + 1;
  diceResult.value = result;
  movePlayer(result);
};

const movePlayer = async (steps: number) => {
  isMoving.value = true;
  for (let i = 0; i < steps; i++) {
    await new Promise((r) => setTimeout(r, 300));
    currentPlayer.value.position =
      (currentPlayer.value.position + 1) % mapCells.value.length;
  }
  isMoving.value = false;
  nextTurn();
};

const nextTurn = () => {
  currentPlayerIndex.value =
    (currentPlayerIndex.value + 1) % players.length;
};
</script>

<template>
  <div class="game-board">
    <!-- 环形地图 -->
    <div class="cells">
      <div
        v-for="(cell, index) in mapCells"
        :key="cell.id"
        class="cell"
        :style="{
          transform: `translate(${cell.position.x}px, ${cell.position.y}px)`,
        }"
      >
        {{ index + 1 }}
        <div class="players">
          <div
            v-for="p in players.filter(pl => pl.position === index)"
            :key="p.id"
            class="player-dot"
            :style="{ background: p.color }"
          ></div>
        </div>
      </div>
    </div>

    <!-- 中央控制区 -->
    <div class="center-panel">
      <h3>🎲 当前玩家</h3>
      <div class="active-player" :style="{ borderColor: currentPlayer.color }">
        <span :style="{ color: currentPlayer.color }">{{ currentPlayer.name }}</span>
        <p>HP: {{ currentPlayer.hp }} / 💰 {{ currentPlayer.money }}</p>
      </div>

      <div class="dice-area">
        <p>骰子结果：<strong>{{ diceResult ?? "-" }}</strong></p>
        <button @click="rollDice" :disabled="isMoving">投掷骰子</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-board {
  position: relative;
  width: 800px;
  height: 800px;
  margin: auto;
  background: #1b1b1b;
  border-radius: 20px;
  overflow: hidden;
  color: #fff;
  user-select: none;
}
.cells {
  position: absolute;
  left: 50%;
  top: 50%;
}
.cell {
  position: absolute;
  width: 80px;
  height: 50px;
  background: #333;
  border: 2px solid #555;
  border-radius: 8px;
  text-align: center;
  line-height: 50px;
  font-size: 12px;
}
.players {
  display: flex;
  justify-content: center;
  gap: 2px;
}
.player-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.center-panel {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  width: 240px;
}
.active-player {
  border: 2px solid;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
}
.dice-area button {
  background: #444;
  color: #fff;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}
.dice-area button:hover {
  background: #666;
}
.dice-area button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
