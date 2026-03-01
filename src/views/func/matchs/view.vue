<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import swissView from './swiss.vue'
import tournamentView from './tournament.vue'
import * as db from './datas'

// name
defineOptions({
  name: 'custom-name'
})

interface GameInfo {
  name: string;
  full: string;
  logo: string;
  location: string;
  date: string;
  winner: {
    team: string;
    icon: string;
  };
  stages: StageInfo[];
}

interface StageInfo {
  stage: string;
  type: string;
  rounds: any[];
  limit?: number;
  winners?: any[];
  losers?: any[];
}

// 状态管理
const games = ref<GameInfo[]>([])
const selectedGame = ref<GameInfo | null>(null)
const selectedStage = ref<StageInfo | null>(null)

// 计算属性：当前选中的stage类型
const currentStageType = computed(() => selectedStage.value?.type || '')

// 初始化数据
onMounted(() => {
  games.value = db.games
  if (games.value.length > 0) {
    // 默认选中第一个游戏
    selectedGame.value = games.value[0]
    // 默认选中第一个游戏的第一个stage
    if (selectedGame.value.stages.length > 0) {
      selectedStage.value = selectedGame.value.stages[0]
    }
  }
})

// 切换游戏
const changeGame = (game: GameInfo) => {
  selectedGame.value = game
  // 切换游戏时，默认选中该游戏的第一个stage
  if (game.stages.length > 0) {
    selectedStage.value = game.stages[0]
  } else {
    selectedStage.value = null
  }
}

// 切换stage
const changeStage = (stage: StageInfo) => {
  selectedStage.value = stage
}
</script>

<template>
  <div class="sections">
    <!-- 左侧：游戏列表和详情卡片 -->
    <div class="left-panel">
      <!-- 游戏列表 -->
      <div class="list-games">
        <h3 class="panel-title">比赛列表</h3>
        <div class="games-container">
          <div v-for="game in games" :key="game.name" class="game-item" @click="changeGame(game)"
            :class="{ active: selectedGame?.name === game.name }">
            <div class="item-icon">
              <img :src="`/docs/logos/games/${game.logo}`" alt="">
            </div>
            <div class="item-name">{{ game.name }}</div>
          </div>
        </div>
      </div>

      <!-- 游戏详情卡片 -->
      <div v-if="selectedGame" class="game-detail-card">
        <h3 class="panel-title">比赛详情</h3>
        <div class="detail-content">
          <div class="detail-header">
            <div class="detail-icon">
              <img :src="`/docs/logos/games/${selectedGame.logo}`" alt="">
            </div>
            <div class="detail-title">
              <h4>{{ selectedGame.name }}</h4>
              <span class="detail-location">{{ selectedGame.full }}</span>
            </div>
          </div>

          <div class="detail-info">
            <div class="info-row">
              <span class="info-label">比赛日期</span>
              <span class="info-value">{{ selectedGame.date }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">比赛地点</span>
              <span class="info-value">{{ selectedGame.location }}</span>
            </div>
            <div class="info-row winner-row">
              <span class="info-label">冠军队伍</span>
              <div class="winner-info" v-if="selectedGame.winner.team!== ''">
                <img :src="`/docs/logos/teams/${selectedGame.winner.icon}`" alt="" class="winner-icon">
                <span class="winner-team">{{ selectedGame.winner.team }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧：stage标签页和赛程内容 -->
    <div class="right-panel">
      <!-- Stage 标签页 -->
      <div v-if="selectedGame" class="stage-tabs">
        <div v-for="stage in selectedGame.stages" :key="stage.stage" class="tab-item" @click="changeStage(stage)"
          :class="{ active: selectedStage?.stage === stage.stage }">
          <div class="item-name">{{ stage.stage }}</div>
        </div>
      </div>

      <!-- 赛程内容区域 -->
      <div class="schedule-content">
        <template v-if="selectedStage">
          <!-- 根据stage类型显示不同的视图 -->
          <template v-if="currentStageType === 'swiss'">
            <swissView :limit="selectedStage.limit" :rounds="selectedStage.rounds" />
          </template>

          <template v-else-if="currentStageType === 'tournament'">
            <tournamentView :rounds="selectedStage.rounds" />
          </template>

          <template v-else-if="currentStageType === 'doubles'">
            <tournamentView :rounds="selectedStage.winners || []" />
            <div class="lines"></div>
            <tournamentView :rounds="selectedStage.losers || []" />
          </template>

          <!-- 默认提示 -->
          <div v-else class="empty-state">
            暂无赛程数据
          </div>
        </template>

        <!-- 未选择stage时的提示 -->
        <div v-else class="empty-state">
          请选择一个赛程阶段
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sections {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #000;
}

// 左侧面板
.left-panel {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.panel-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #f5f5f5;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: 2px solid #0094ff;
}

// 游戏列表
.list-games {
  background: #26292d;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.games-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.game-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #ffffff14;
  }
  
  &.active {
    background: #0094ff;
    
    .item-name {
      color: #f5f5f5;
      font-weight: 500;
    }
  }
  
  .item-icon {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  
  .item-name {
    font-size: 14px;
    color: #f5f5f5;
  }
}

// 游戏详情卡片
.game-detail-card {
  background: #26292d;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.detail-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.detail-title {
  h4 {
    margin: 0 0 4px 0;
    font-size: 16px;
    color: #f5f5f5;
  }
  
  .detail-location {
    font-size: 13px;
    color: #666;
  }
}

.detail-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  
  .info-label {
    width: 70px;
    font-size: 13px;
    color: #999;
  }
  
  .info-value {
    flex: 1;
    font-size: 14px;
    color: #f5f5f5;
  }
  
  &.winner-row {
    .info-value {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}

.winner-info {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .winner-icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  
  .winner-team {
    font-weight: 700;
    color: #0094ff;
  }
}

// 右侧面板
.right-panel {
  flex: 1;
  background: #26292d;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

// Stage 标签页
.stage-tabs {
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
  
  .tab-item {
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    transition: all 0.3s;
    background: #f5f5f5;
    
    &:hover {
      background: #e8e8e8;
    }
    
    &.active {
      background: #0094ff;
      color: white;
      font-weight: 500;
    }
    
    .item-name {
      white-space: nowrap;
    }
  }
}

// 赛程内容
.schedule-content {
  flex: 1;
  overflow-y: auto;
}

.lines {
  height: 30px;
  background: linear-gradient(to bottom, transparent 50%, #eee 50%);
  background-size: 100% 20px;
  margin: 10px 0;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #999;
  font-size: 14px;
  background: #f9f9f9;
  border-radius: 8px;
}
</style>
