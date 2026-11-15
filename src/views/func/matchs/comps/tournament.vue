<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  type RoundInfo,
  getTeamClass,
  useTeamHover,
  isTeamHovered,
  isTodayTime,
  getMatchWinnerSide,
  isTeamHighlightable,
} from './public'

defineOptions({
  name: 'tournament-name'
})

const { hoveredTeam, setHoveredTeam } = useTeamHover()

const props = defineProps({
  rounds: {
    type: Array as () => RoundInfo[][],
    default: () => []
  },
  path: {
    type: String,
    default: ''
  },
  mark: {
    type: String,
    default: ''
  },
})

type AnchorPoint = { x: number; y: number }

const boxRef = ref<HTMLElement | null>(null)
const cardRefs = new Map<string, HTMLElement>()
const connectors = ref<{ key: string; d: string }[]>([])

let resizeObserver: ResizeObserver | null = null

const setCardRef = (name: string, el: Element | null) => {
  if (el instanceof HTMLElement) cardRefs.set(name, el)
  else cardRefs.delete(name)
}

const toLocal = (box: DOMRect, point: { x: number; y: number }): AnchorPoint => ({
  x: point.x - box.left,
  y: point.y - box.top,
})

const getTeamEl = (card: HTMLElement, side: 'top' | 'bottom') =>
  card.querySelector<HTMLElement>(`.team-infos[data-side="${side}"]`)

/** 两个 team 块之间的中点，贴在左/右端 */
const getTeamsMidPoint = (card: HTMLElement, edge: 'left' | 'right') => {
  const topEl = getTeamEl(card, 'top')
  const bottomEl = getTeamEl(card, 'bottom')
  if (!topEl || !bottomEl) {
    const r = card.getBoundingClientRect()
    return {
      x: edge === 'right' ? r.right : r.left,
      y: r.top + r.height / 2,
    }
  }
  const top = topEl.getBoundingClientRect()
  const bottom = bottomEl.getBoundingClientRect()
  return {
    x: edge === 'right' ? Math.max(top.right, bottom.right) : Math.min(top.left, bottom.left),
    y: (top.bottom + bottom.top) / 2,
  }
}

/** 单个 team 行的左/右中点 */
const getTeamSidePoint = (card: HTMLElement, side: 'top' | 'bottom', edge: 'left' | 'right') => {
  const el = getTeamEl(card, side)
  if (!el) return getTeamsMidPoint(card, edge)
  const r = el.getBoundingClientRect()
  return {
    x: edge === 'right' ? r.right : r.left,
    y: r.top + r.height / 2,
  }
}

const findTargetSide = (
  nextMatch: RoundInfo & { top?: { team: string }; bottom?: { team: string } },
  winnerTeam: string,
): 'top' | 'bottom' | null => {
  if (!isTeamHighlightable(winnerTeam)) return null
  if (nextMatch.top?.team === winnerTeam) return 'top'
  if (nextMatch.bottom?.team === winnerTeam) return 'bottom'
  return null
}

const buildPath = (from: AnchorPoint, to: AnchorPoint) => {
  const midX = (from.x + to.x) / 2
  return `M ${from.x} ${from.y} H ${midX} V ${to.y} H ${to.x}`
}

const updateConnectors = () => {
  const boxEl = boxRef.value
  if (!boxEl) {
    connectors.value = []
    return
  }

  const box = boxEl.getBoundingClientRect()
  const matches = props.rounds.flat().filter(Boolean) as Array<
    RoundInfo & { top?: any; bottom?: any }
  >
  const matchByName = new Map(matches.map(m => [m.name, m]))
  const paths: { key: string; d: string }[] = []

  for (const match of matches) {
    if (!match?.name || !match.next) continue
    const fromEl = cardRefs.get(match.name)
    const toEl = cardRefs.get(match.next)
    const nextMatch = matchByName.get(match.next)
    if (!fromEl || !toEl || !nextMatch) continue

    const winnerSide = getMatchWinnerSide(match as any, props.mark, match.bo)

    let fromPoint: AnchorPoint
    let toPoint: AnchorPoint

    if (winnerSide) {
      const winnerTeam = winnerSide === 'top' ? match.top?.team : match.bottom?.team
      const targetSide = winnerTeam ? findTargetSide(nextMatch, winnerTeam) : null
      fromPoint = toLocal(box, getTeamSidePoint(fromEl, winnerSide, 'right'))
      toPoint = targetSide
        ? toLocal(box, getTeamSidePoint(toEl, targetSide, 'left'))
        : toLocal(box, getTeamsMidPoint(toEl, 'left'))
    } else {
      fromPoint = toLocal(box, getTeamsMidPoint(fromEl, 'right'))
      toPoint = toLocal(box, getTeamsMidPoint(toEl, 'left'))
    }

    paths.push({
      key: `${match.name}->${match.next}`,
      d: buildPath(fromPoint, toPoint),
    })
  }

  connectors.value = paths
}

const scheduleUpdate = () => {
  nextTick(() => requestAnimationFrame(updateConnectors))
}

onMounted(() => {
  scheduleUpdate()
  if (boxRef.value) {
    resizeObserver = new ResizeObserver(() => updateConnectors())
    resizeObserver.observe(boxRef.value)
  }
  window.addEventListener('resize', updateConnectors)
})

watch(() => props.rounds, scheduleUpdate, { deep: true })

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateConnectors)
})
</script>

<template>
  <div ref="boxRef" class="box-rounds">
    <svg class="connector-layer" aria-hidden="true">
      <path
        v-for="line in connectors"
        :key="line.key"
        :d="line.d"
      />
    </svg>

    <template v-for="(item, colIndex) in rounds" :key="colIndex">
      <div class="list-matchs">
        <template v-for="match in item" :key="match.name || match.id">
          <div
            class="box-card match-item"
            :class="{ final: match.is_final == 1, 'is-today': isTodayTime(match.time) }"
            :ref="(el) => setCardRef(match.name, el as Element | null)"
          >
            <div class="item-infos">
              <h4>{{ match.name }}</h4>
              <h4 v-if="match.bo">BO{{ match.bo }}</h4>
            </div>
            <div class="item-infos">
              <h4>{{ match.round }}</h4>
              <h4>{{ match.time }}</h4>
            </div>
            <div class="item-teams">
              <div
                class="team-infos"
                data-side="top"
                :class="[
                  getTeamClass(match, 'top', mark, match.bo),
                  { 'is-team-hover': isTeamHovered(match.top.team, hoveredTeam) },
                ]"
                @mouseenter="setHoveredTeam(match.top.team)"
              >
                <div class="item-team">
                  <img :src="`/docs/${path}/${match.top.icon}`" alt="" srcset="" @load="scheduleUpdate">
                  <div class="team-meta">
                    <div class="team-name">{{ match.top.team }}</div>
                    <div v-if="match.top.tag" class="team-tag">{{ match.top.tag }}</div>
                  </div>
                </div>
                <div class="item-score">
                  {{ match.top.score }}
                  <span class="item-kick" v-if="match.top.score === match.bottom.score">({{ match.top.kick }})</span>
                </div>
              </div>
              <div
                class="team-infos"
                data-side="bottom"
                :class="[
                  getTeamClass(match, 'bottom', mark, match.bo),
                  { 'is-team-hover': isTeamHovered(match.bottom.team, hoveredTeam) },
                ]"
                @mouseenter="setHoveredTeam(match.bottom.team)"
              >
                <div class="item-team">
                  <img :src="`/docs/${path}/${match.bottom.icon}`" alt="" srcset="" @load="scheduleUpdate">
                  <div class="team-meta">
                    <div class="team-name">{{ match.bottom.team }}</div>
                    <div v-if="match.bottom.tag" class="team-tag">{{ match.bottom.tag }}</div>
                  </div>
                </div>
                <div class="item-score">
                  {{ match.bottom.score }}
                  <span class="item-kick" v-if="match.top.score === match.bottom.score">({{ match.bottom.kick }})</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import url(./styles.scss);

.box-rounds {
  position: relative;
  width: max-content;
  display: flex;
  gap: 50px;
}

.connector-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  z-index: 0;

  path {
    fill: none;
    stroke: rgba(255, 255, 255, 0.4);
    stroke-width: 2;
    stroke-linecap: square;
    stroke-linejoin: miter;
  }
}

.list-matchs {
  position: relative;
  z-index: 1;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 25px;

  .match-item {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item-teams {
      flex-direction: column;
    }
  }
}
</style>
