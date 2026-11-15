import { inject, ref, type InjectionKey, type Ref } from 'vue'

export interface GameInfo {
    name: string;
    full: string;
    logo: string;
    location: string;
    date: string;
    status: string;
    winner: string;
    path: string;
    winner_logo: string;
    stages: StageInfo[];
    link: string;
}

export interface StageInfo {
    game_name: string;
    stage: string;
    type: string;
    mark: string;
    limit?: number;
    status: number;
    rounds: RoundInfo[] | RoundInfo[][];
    winners: any[];
    losers: any[];
}

export interface RoundInfo {
    id: string;
    game_name: string;
    stage: string;
    group: number;
    name: string;
    next?: string;
    is_winner: number;
    round: string;
    bo: number;
    time: string;
    is_final: number;
    matchs: MatchInfo[];
}

export interface MatchTeamSide {
    team: string;
    icon: string;
    score: number;
    tag?: string;
    kick?: number;
    yellow?: number;
    red?: number;
}

export interface MatchInfo {
    top: MatchTeamSide;
    bottom: MatchTeamSide;
}

export const getBoWinningScore = (bo: number) => Math.floor(bo / 2) + 1

export const isBoMatchFinished = (match: MatchInfo, bo: number) => {
    const winningScore = getBoWinningScore(bo)
    return match.top.score >= winningScore || match.bottom.score >= winningScore
}

export type BoMatchOutcome = 'top' | 'bottom' | 'unfinished'

export const getBoMatchOutcome = (match: MatchInfo, bo: number): BoMatchOutcome => {
    if (!isBoMatchFinished(match, bo)) return 'unfinished'
    if (match.top.score > match.bottom.score) return 'top'
    if (match.bottom.score > match.top.score) return 'bottom'
    return 'unfinished'
}

/** 返回已结束比赛的胜者侧；未结束返回 null */
export const getMatchWinnerSide = (
    match: { top: MatchTeamSide; bottom: MatchTeamSide; bo?: number },
    mark: string,
    bo?: number,
): 'top' | 'bottom' | null => {
    const { top, bottom } = match
    if (!top || !bottom) return null

    if (mark === 'football') {
        if (top.score === bottom.score) {
            const topKick = top.kick
            const bottomKick = bottom.kick
            if (topKick == null || bottomKick == null || topKick === bottomKick) return null
            return topKick > bottomKick ? 'top' : 'bottom'
        }
        return top.score > bottom.score ? 'top' : 'bottom'
    }

    const outcome = getBoMatchOutcome(
        { top, bottom } as MatchInfo,
        bo ?? match.bo ?? 1,
    )
    return outcome === 'unfinished' ? null : outcome
}

export interface TeamHoverContext {
    hoveredTeam: Ref<string | null>
    setHoveredTeam: (team: string) => void
    clearHoveredTeam: () => void
}

export const TEAM_HOVER_KEY: InjectionKey<TeamHoverContext> = Symbol('teamHover')

export const isTeamHighlightable = (team: string) => !!team && team !== 'TBD'

export const isTeamHovered = (team: string, hoveredTeam: string | null) =>
    isTeamHighlightable(team) && hoveredTeam === team

/** time 格式为 MM/DD 或 MM/DD HH:mm（如 09/02、09/02 17:00） */
export const isTodayTime = (time?: string | number | null) => {
    if (time == null || time === '' || time === '-/-') return false
    const text = String(time).trim()
    const matched = text.match(/^(\d{1,2})\/(\d{1,2})(?:\s+\d{1,2}:\d{2})?$/)
    if (!matched) return false
    const month = Number(matched[1])
    const day = Number(matched[2])
    const now = new Date()
    return now.getMonth() + 1 === month && now.getDate() === day
}

export const useTeamHover = (): TeamHoverContext => {
    const ctx = inject(TEAM_HOVER_KEY, null)
    if (ctx) return ctx

    const hoveredTeam = ref<string | null>(null)
    return {
        hoveredTeam,
        setHoveredTeam: (team: string) => {
            hoveredTeam.value = isTeamHighlightable(team) ? team : null
        },
        clearHoveredTeam: () => {
            hoveredTeam.value = null
        },
    }
}

export const getTeamClass = (match: any, team: string, mark: string, bo: number): string => {
    const { top: teamA, bottom: teamB } = match;

    // 检查 TBD 情况
    if ((team === "top" && teamA.team === "TBD") ||
        (team === "bottom" && teamB.team === "TBD")) {
        return 'tbd';
    }

    // 谁分数更高
    if (mark === 'football') {
        const topScore = teamA.score;
        const bottomScore = teamB.score;

        if (topScore === bottomScore) {
            // 返回点球结果
            if (team === "top") {
                return teamA.kick < teamB.kick ? 'lose' : teamA.kick > teamB.kick ? 'win' : '';
            }
            if (team === "bottom") {
                return teamA.kick > teamB.kick ? 'lose' : teamA.kick < teamB.kick ? 'win' : '';
            }
        }

        if (team === 'top') {
            return topScore > bottomScore ? 'win' : 'lose';
        }
        return bottomScore > topScore ? 'win' : 'lose';
    }
    // BO赛制
    else {
        // 计算获胜所需分数
        const winningScore = Math.floor(bo / 2) + 1;

        // 检查比赛是否已结束
        const isMatchFinished = teamA.score >= winningScore || teamB.score >= winningScore;
        if (!isMatchFinished) {
            return '';
        }

        // 根据队伍位置返回结果
        if (team === "top") {
            return teamA.score < teamB.score ? 'lose' : teamA.score > teamB.score ? 'win' : '';
        }
        if (team === "bottom") {
            return teamA.score > teamB.score ? 'lose' : teamA.score < teamB.score ? 'win' : '';
        }
    }

    return '';
};