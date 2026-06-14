<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import swissView from './comps/swiss.vue'
import tournamentView from './comps/tournament.vue'
import groupView from './comps/group.vue'

import type { GameInfo, StageInfo } from './comps/public.ts'
import * as xlsx from '@/commons/utils/xlsx'

// name
defineOptions({
  name: 'custom-name'
})

// 状态管理
const game_list = ref<GameInfo[]>([])
const selectedGame = ref<GameInfo | null>(null)
const selectedStage = ref<StageInfo | null>(null)
// 计算属性：当前选中的stage类型
const currentStageType = computed(() => selectedStage.value?.type || '')

// 初始化数据
onMounted(async () => {
  const temps: any = await xlsx.readExcel('/docs/datas/matchs.xlsx');
  const { games, stages, rounds, matchs } = temps
  games.map((game: GameInfo) => {
    game.stages = []
    //
    game.stages = stages.filter((stage: StageInfo) => stage.game_name === game.name)
    game.stages.map((stage: StageInfo) => {
      const groud_rounds = [] as any[]
      const groud_winners = [] as any[]
      const groud_losers = [] as any[]
      //
      const filter_rounds = rounds.filter((round: any) => round.game_name === stage.game_name && round.stage === stage.stage)
      filter_rounds.map((round: any) => {
        switch (stage.type) {
          case 'swiss':
          case 'group': {
            round.matchs = matchs.filter((match: any) => match.round_id === round.id).map((match: any) => {
              return {
                top: {
                  team: match.top_team,
                  icon: match.top_icon,
                  score: match.top_score,
                  kick: match.top_kick,
                },
                bottom: {
                  team: match.bottom_team,
                  icon: match.bottom_icon,
                  score: match.bottom_score,
                  kick: match.bottom_kick,
                },
              }
            })
            break
          }
          case 'tournament':
          case 'doubles': {
            const match = matchs.find((match: any) => match.round_id === round.id)
            if (match)
              Object.assign(round, {
                top: {
                  team: match.top_team,
                  icon: match.top_icon,
                  score: match.top_score,
                  kick: match.top_kick,
                },
                bottom: {
                  team: match.bottom_team,
                  icon: match.bottom_icon,
                  score: match.bottom_score,
                  kick: match.bottom_kick,
                },
              })
            break
          }
        }

        switch (stage.type) {
          case 'swiss':
          case 'tournament': {
            if (!groud_rounds[round.group]) groud_rounds[round.group] = []
            groud_rounds[round.group].push(round)
            break
          }
          case 'group': {
            groud_rounds.push(round)
            break
          }
          case 'doubles': {
            if (round.is_winner === 1) {
              if (!groud_winners[round.group]) groud_winners[round.group] = []
              groud_winners[round.group].push(round)
            } else if (round.is_winner === 0) {
              if (!groud_losers[round.group]) groud_losers[round.group] = []
              groud_losers[round.group].push(round)
            }
            break
          }
        }
      })

      console.log('rounds:', groud_rounds);
      stage.rounds = groud_rounds
      stage.winners = groud_winners
      stage.losers = groud_losers
    })
  })
  game_list.value = games

  //
  if (game_list.value.length > 0) {
    const game = game_list.value.find(g => g.status != 'upcoming') || game_list.value[0]
    changeGame(game)
  }
})

// 切换游戏
const changeGame = (game: GameInfo) => {
  selectedGame.value = game
  // 切换游戏时，默认选中该游戏的第一个stage
  if (game.stages.length > 0) {
    selectedStage.value = game.stages.find(g => g.status == 1) || game.stages[0] || null
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
              <div class="winner-info" v-if="selectedGame.winner !== 'TBD'">
                <img :src="`/docs/logos/teams/${selectedGame.winner_logo}`" alt="" class="winner-icon">
                <span class="winner-team">{{ selectedGame.winner }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 游戏列表 -->
      <div class="list-games">
        <h3 class="panel-title">比赛列表</h3>
        <div class="games-container">
          <div v-for="game in game_list" :key="game.name" class="game-item" @click="changeGame(game)"
            :class="{ active: selectedGame?.name === game.name }">
            <div class="item-icon">
              <img :src="`/docs/logos/games/${game.logo}`" alt="">
            </div>
            <div class="item-name">{{ game.name }}</div>
            <span class="status-dot" :data-status="game.status"></span>
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
            <swissView :rounds="selectedStage.rounds" :mark="selectedStage.mark" :limit="selectedStage.limit" />
          </template>

          <template v-else-if="currentStageType === 'tournament'">
            <tournamentView :rounds="selectedStage.rounds" :mark="selectedStage.mark" />
          </template>

          <template v-else-if="currentStageType === 'doubles'">
            <tournamentView :rounds="selectedStage.winners || []" :mark="selectedStage.mark" />
            <div class="lines"></div>
            <tournamentView :rounds="selectedStage.losers || []" :mark="selectedStage.mark" />
          </template>

          <template v-else-if="currentStageType === 'group'">
            <groupView :rounds="selectedStage.rounds" :path="selectedGame.path" :mark="selectedStage.mark" />
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

  .panel-title {
    margin: 0 0 12px 0;
    font-size: 16px;
    color: #f5f5f5;
    font-weight: 600;
    padding-bottom: 8px;
    border-bottom: 2px solid #0094ff;
  }
}

/* 状态点基础样式 */
.status-dot {
  position: absolute;
  right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

/* upcoming - 灰色静态点 */
.status-dot[data-status="upcoming"] {
  background-color: #9ca3af;
  box-shadow: 0 0 0px rgba(156, 163, 175, 0);
}

/* on-going - 绿色呼吸动画 */
.status-dot[data-status="on-going"] {
  background-color: #22c55e;
  animation: breathe 1.5s ease-in-out infinite;
}

/* completed - 蓝色静态点 */
.status-dot[data-status="completed"] {
  background-color: #3b82f6;
}

/* 呼吸动画 */
@keyframes breathe {
  0% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 0px rgba(34, 197, 94, 0);
  }

  50% {
    opacity: 0.6;
    transform: scale(1.2);
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
  }

  100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 0px rgba(34, 197, 94, 0);
  }
}

// 游戏列表
.list-games {
  background: #26292d;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .games-container {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .game-item {
      position: relative;
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
  }
}

// 游戏详情卡片
.game-detail-card {
  background: #26292d;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .detail-content {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .detail-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #eee;

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
    }

    .detail-info {
      display: flex;
      flex-direction: column;
      gap: 12px;

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
  height: 3px;
  background: linear-gradient(90deg, 
    transparent,
    #ff3366,
    #ffeb3b,
    #00e5ff,
    transparent
  );
  margin: 20px 0;
  box-shadow: 0 0 12px rgba(255, 51, 102, 0.5);
  animation: scan 3s linear infinite;
  background-size: 200% 100%;
}

@keyframes scan {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.empty-state {
  height: 200px;
  color: #999;
  font-size: 14px;
  border-radius: 8px;
  background: #f9f9f94d;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
