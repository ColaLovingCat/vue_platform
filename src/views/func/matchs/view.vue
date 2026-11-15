<script lang="ts" setup>
import { onMounted, ref, computed, watch, provide, nextTick } from 'vue'
import { toPng } from 'html-to-image'
import { CameraOutlined, ReloadOutlined } from '@ant-design/icons-vue'

import swissView from './comps/swiss.vue'
import tournamentView from './comps/tournament.vue'
import groupView from './comps/group.vue'

import type { GameInfo, StageInfo } from './comps/public.ts'
import { TEAM_HOVER_KEY, isTeamHighlightable } from './comps/public.ts'
import * as xlsx from '@/commons/utils/xlsx'

// name
defineOptions({
  name: 'custom-name'
})

// 状态管理
const game_list = ref<GameInfo[]>([])
const selectedGame = ref<GameInfo | null>(null)
const selectedStage = ref<StageInfo | null>(null)
const hoveredTeam = ref<string | null>(null)
const refreshing = ref(false)
const capturing = ref(false)
const scheduleContentRef = ref<HTMLElement | null>(null)

provide(TEAM_HOVER_KEY, {
  hoveredTeam,
  setHoveredTeam: (team: string) => {
    hoveredTeam.value = isTeamHighlightable(team) ? team : null
  },
  clearHoveredTeam: () => {
    hoveredTeam.value = null
  },
})

watch([selectedGame, selectedStage], () => {
  hoveredTeam.value = null
})

// 计算属性：当前选中的stage类型
const currentStageType = computed(() => selectedStage.value?.type || '')

// 当前阶段参与队伍（去重）
const currentStageTeams = computed(() => {
  if (!selectedStage.value) return [] as { team: string; icon: string }[]

  const teams = new Map<string, string>()
  const addSide = (side?: { team?: string; icon?: string }) => {
    if (!side?.team || !isTeamHighlightable(side.team) || !side.icon) return
    if (!teams.has(side.team)) teams.set(side.team, side.icon)
  }

  const walkRounds = (rounds: any) => {
    if (!rounds) return
    const list = (Array.isArray(rounds) ? rounds : []).flat(2).filter(Boolean)
    for (const round of list) {
      if (round.matchs) {
        for (const match of round.matchs) {
          addSide(match?.top)
          addSide(match?.bottom)
        }
      }
      addSide(round.top)
      addSide(round.bottom)
    }
  }

  const stage = selectedStage.value
  walkRounds(stage.rounds)
  walkRounds(stage.winners)
  walkRounds(stage.losers)

  return Array.from(teams.entries()).map(([team, icon]) => ({ team, icon }))
})

const isWorldCupEvent = computed(() => {
  const game = selectedGame.value as (GameInfo & { game?: string }) | null
  if (!game) return false
  return game.game === 'FOOTBALL' && `${game.name}${game.full}`.includes('世界杯')
})

const buildGameList = (games: GameInfo[], stages: StageInfo[], rounds: any[], matchs: any[]) => {
  games.map((game: GameInfo) => {
    game.stages = stages.filter((stage: StageInfo) => stage.game_name === game.name)
    game.stages.map((stage: StageInfo) => {
      const groud_rounds = [] as any[]
      const groud_winners = [] as any[]
      const groud_losers = [] as any[]
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
                  tag: match.top_tag,
                  kick: match.top_kick,
                  yellow: match.top_yellow,
                  red: match.top_red,
                },
                bottom: {
                  team: match.bottom_team,
                  icon: match.bottom_icon,
                  score: match.bottom_score,
                  tag: match.bottom_tag,
                  kick: match.bottom_kick,
                  yellow: match.bottom_yellow,
                  red: match.bottom_red,
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
                  tag: match.top_tag,
                  kick: match.top_kick,
                },
                bottom: {
                  team: match.bottom_team,
                  icon: match.bottom_icon,
                  score: match.bottom_score,
                  tag: match.bottom_tag,
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

      stage.rounds = groud_rounds
      stage.winners = groud_winners
      stage.losers = groud_losers
    })
  })
  return games
}

const dataVersion = ref(0)

const loadMatchData = async (bustCache = false) => {
  const temps: any = bustCache
    ? await xlsx.readExcel(`/docs/datas/matchs.xlsx?t=${Date.now()}`, { cache: 'no-store' })
    : await xlsx.readExcel('/docs/datas/matchs.xlsx')
  const { games = [], stages = [], rounds = [], matchs = [] } = temps || {}
  if (!games.length) {
    throw new Error('比赛数据为空或读取失败')
  }
  return buildGameList(games, stages, rounds, matchs)
}

const pickDefaultGame = (list: GameInfo[]) =>
  list.find(g => g.status === 'on-going')
  || list.find(g => g.status != 'upcoming')
  || list[0]

const restoreSelection = (game: string | undefined, stage: string | undefined) => {
  if (!game_list.value.length) {
    selectedGame.value = null
    selectedStage.value = null
    return
  }

  const nextGame = (game && game_list.value.find(g => g.name === game))
    || pickDefaultGame(game_list.value)

  selectedGame.value = nextGame
  if (nextGame.stages.length > 0) {
    selectedStage.value = (stage && nextGame.stages.find(s => s.stage === stage))
      || nextGame.stages.find(g => g.status == 1)
      || nextGame.stages[0]
      || null
  } else {
    selectedStage.value = null
  }
}

const refreshData = async () => {
  if (refreshing.value) return
  refreshing.value = true
  const prevGame = selectedGame.value?.name
  const prevStage = selectedStage.value?.stage
  try {
    game_list.value = await loadMatchData(true)
    restoreSelection(prevGame, prevStage)
    dataVersion.value += 1
  } catch (error) {
    console.error('刷新比赛数据失败:', error)
  } finally {
    refreshing.value = false
  }
}

// 初始化数据
onMounted(async () => {
  try {
    game_list.value = await loadMatchData()
    restoreSelection(undefined, undefined)
  } catch (error) {
    console.error('加载比赛数据失败:', error)
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
const openGame = (game: GameInfo) => {
  if (game.link && game.link!='') {
    window.open(game.link, '_blank')
  } 
}

// 切换stage
const changeStage = (stage: StageInfo) => {
  selectedStage.value = stage
}

const waitForImages = (root: HTMLElement) => {
  const imgs = Array.from(root.querySelectorAll('img'))
  return Promise.all(imgs.map(img => {
    if (img.complete) return Promise.resolve()
    return new Promise<void>((resolve) => {
      img.addEventListener('load', () => resolve(), { once: true })
      img.addEventListener('error', () => resolve(), { once: true })
    })
  }))
}

const unlockOverflow = (node: HTMLElement, restoreStyles: Array<() => void>) => {
  const height = node.style.height
  const maxHeight = node.style.maxHeight
  const overflow = node.style.overflow
  const overflowY = node.style.overflowY
  node.style.height = 'auto'
  node.style.maxHeight = 'none'
  node.style.overflow = 'visible'
  node.style.overflowY = 'visible'
  restoreStyles.push(() => {
    node.style.height = height
    node.style.maxHeight = maxHeight
    node.style.overflow = overflow
    node.style.overflowY = overflowY
  })
}

const shouldUnlockOverflow = (node: HTMLElement) => {
  const style = getComputedStyle(node)
  return ['auto', 'scroll', 'hidden'].includes(style.overflowY)
    || ['auto', 'scroll', 'hidden'].includes(style.overflow)
}

const captureSchedule = async () => {
  const el = scheduleContentRef.value
  if (!el || capturing.value || !selectedStage.value) return

  capturing.value = true
  const restoreStyles: Array<() => void> = []

  let ancestor: HTMLElement | null = el
  while (ancestor && ancestor !== document.body) {
    if (shouldUnlockOverflow(ancestor)) unlockOverflow(ancestor, restoreStyles)
    ancestor = ancestor.parentElement
  }
  el.querySelectorAll<HTMLElement>('*').forEach((child) => {
    if (shouldUnlockOverflow(child)) unlockOverflow(child, restoreStyles)
  })

  try {
    await nextTick()
    await document.fonts.ready
    await waitForImages(el)
    await new Promise(resolve => setTimeout(resolve, 80))

    const options = {
      backgroundColor: '#26292d',
      cacheBust: true,
      skipAutoScale: true,
      width: el.scrollWidth,
      height: el.scrollHeight,
    }
    let dataUrl = ''
    try {
      dataUrl = await toPng(el, { ...options, pixelRatio: 2 })
    } catch {
      dataUrl = await toPng(el, { ...options, pixelRatio: 1 })
    }

    const safe = (value: string) => value.replace(/[\\/:*?"<>|]+/g, '_').replace(/\s+/g, '-')
    const link = document.createElement('a')
    link.download = `${safe(selectedGame.value?.name || 'match')}-${safe(selectedStage.value.stage)}.png`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('截取赛程失败:', error)
  } finally {
    restoreStyles.forEach(restore => restore())
    capturing.value = false
  }
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
                <img :src="`/docs/${selectedGame.path}/${selectedGame.winner_logo}`" alt="" class="winner-icon">
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
            <div class="item-icon" @click="openGame(game)">
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
        <div class="tabs-list">
          <div v-for="stage in selectedGame.stages" :key="stage.stage" class="tab-item" @click="changeStage(stage)"
            :class="{ active: selectedStage?.stage === stage.stage }">
            <div class="item-name">{{ stage.stage }}</div>
          </div>
        </div>
        <div class="stage-actions">
          <div v-if="currentStageTeams.length && !isWorldCupEvent" class="stage-teams" @mouseleave="hoveredTeam = null">
            <img
              v-for="item in currentStageTeams"
              :key="item.team"
              :src="`/docs/${selectedGame.path}/${item.icon}`"
              :alt="item.team"
              :title="item.team"
              class="team-icon"
              :class="{ 'is-team-hover': hoveredTeam === item.team }"
              @mouseenter="hoveredTeam = item.team"
            >
          </div>
          <a-popover
            v-else-if="currentStageTeams.length"
            trigger="hover"
            placement="bottomRight"
            overlay-class-name="stage-teams-popover"
          >
            <template #content>
              <div class="stage-teams-popup">
                <div
                  v-for="item in currentStageTeams"
                  :key="item.team"
                  class="popup-team"
                  :class="{ 'is-team-hover': hoveredTeam === item.team }"
                  @mouseenter="hoveredTeam = item.team"
                  @mouseleave="hoveredTeam = null"
                >
                  <img :src="`/docs/${selectedGame.path}/${item.icon}`" :alt="item.team">
                  <span>{{ item.team }}</span>
                </div>
              </div>
            </template>
            <button type="button" class="teams-more" title="参赛国家">...</button>
          </a-popover>
          <div v-if="currentStageTeams.length" class="stage-divider"></div>
          <div class="stage-tools">
            <button
              type="button"
              class="icon-btn"
              title="刷新比赛数据"
              :disabled="refreshing"
              @click="refreshData"
            >
              <ReloadOutlined :spin="refreshing" />
            </button>
            <button
              type="button"
              class="icon-btn"
              title="截取当前赛程"
              :disabled="capturing || !selectedStage"
              @click="captureSchedule"
            >
              <CameraOutlined />
            </button>
          </div>
        </div>
      </div>

      <!-- 赛程内容区域 -->
      <div ref="scheduleContentRef" class="schedule-content" @mouseleave="hoveredTeam = null">
        <template v-if="selectedStage">
          <!-- 根据stage类型显示不同的视图 -->
          <template v-if="currentStageType === 'swiss'">
            <swissView :key="`swiss-${dataVersion}`" :rounds="selectedStage.rounds" :mark="selectedStage.mark" :limit="selectedStage.limit" />
          </template>

          <template v-else-if="currentStageType === 'tournament'">
            <tournamentView :key="`tournament-${dataVersion}`" :rounds="selectedStage.rounds" :path="selectedGame.path" :mark="selectedStage.mark" />
          </template>

          <template v-else-if="currentStageType === 'doubles'">
            <tournamentView :key="`winners-${dataVersion}`" :rounds="selectedStage.winners || []" :path="selectedGame.path"
              :mark="selectedStage.mark" />
            <div class="lines"></div>
            <tournamentView :key="`losers-${dataVersion}`" :rounds="selectedStage.losers || []" :path="selectedGame.path" :mark="selectedStage.mark" />
          </template>

          <template v-else-if="currentStageType === 'group'">
            <groupView :key="`group-${dataVersion}`" :rounds="selectedStage.rounds" :path="selectedGame.path" :mark="selectedStage.mark" />
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
  overflow: hidden;

  .panel-title {
    margin: 0 0 12px 0;
    font-size: 16px;
    color: #f5f5f5;
    font-weight: 600;
    padding-bottom: 8px;
    border-bottom: 2px solid #0094ff;
    flex-shrink: 0;
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
  flex: 1;
  min-height: 0;
  background: #26292d;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  .games-container {
    flex: 1;
    height: calc(100vh - 445px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 4px;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.25);
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    .game-item {
      position: relative;
      overflow: hidden;
      padding: 10px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 20px;

      &::before {
        content: '';
        width: 3.5rem;
        display: flex;
        transform: skew(348deg);
        position: absolute;
        top: 0;
        bottom: 0;
        left: -0.5rem;
        z-index: 0;
        transition: left 0.2s linear;
        background-color: var(--clr-moon-40, #2e0505);
      }

      &:hover::before {
        left: -0.25rem;
      }

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
        z-index: 1;

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
  flex-shrink: 0;
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
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;

  .tabs-list {
    display: flex;
    gap: 10px;
    flex-shrink: 0;
  }

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

  .stage-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    min-width: 0;
  }

  .stage-divider {
    flex-shrink: 0;
    width: 1px;
    height: 16px;
    background: rgba(255, 255, 255, 0.28);
  }

  .stage-tools {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: #f5f5f5;
    padding: 0;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;

    &:hover:not(:disabled) {
      color: #0094ff;
    }

    &:disabled {
      opacity: 0.45;
      cursor: wait;
    }
  }

  .stage-teams {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 6px;
    min-width: 0;

    .team-icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
      opacity: 0.85;
      transition: opacity 0.2s, transform 0.2s;
      cursor: default;

      &:hover,
      &.is-team-hover {
        opacity: 1;
        transform: scale(1.15);
      }
    }
  }

  .teams-more {
    flex-shrink: 0;
    background: none;
    border: none;
    color: #f5f5f5;
    padding: 0 2px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;
    line-height: 1;

    &:hover {
      color: #0094ff;
    }
  }
}

.stage-teams-popup {
  display: grid;
  grid-template-columns: repeat(4, minmax(88px, 1fr));
  gap: 8px 12px;
  max-width: 440px;
  max-height: 360px;
  overflow-y: auto;

  .popup-team {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    cursor: default;

    img {
      width: 20px;
      height: 14px;
      object-fit: cover;
      border-radius: 2px;
      flex-shrink: 0;
    }

    span {
      font-size: 12px;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.is-team-hover {
      span {
        color: #0094ff;
      }
    }
  }
}

// 赛程内容
.schedule-content {
  padding: 20px;
  max-width: calc(100vw - 400px);
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
      transparent);
  margin: 20px 0;
  box-shadow: 0 0 12px rgba(255, 51, 102, 0.5);
  animation: scan 3s linear infinite;
  background-size: 200% 100%;
}

@keyframes scan {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
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

<style lang="scss">
.stage-teams-popover {
  .ant-popover-inner {
    background: #1c1f23;
    padding: 10px 12px;
    border: 1px solid #3a3f45;
  }

  .ant-popover-arrow::before,
  .ant-popover-arrow::after {
    background: #1c1f23;
  }
}
</style>
