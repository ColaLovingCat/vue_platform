import type { MatchInfo, RoundInfo } from './public'
import { getBoMatchOutcome, isBoMatchFinished } from './public'

export interface TeamStanding {
    rank: number
    team: string
    icon: string
    played: number
    wins: number
    draws: number
    losses: number
    goalsFor: number
    goalsAgainst: number
    goalDiff: number
    points: number
    yellowCards: number
    redCards: number
}

type TeamRecord = Omit<TeamStanding, 'rank' | 'goalDiff'>

interface MiniLeagueStats {
    points: number
    goalDiff: number
    goalsFor: number
    wins: number
    losses: number
}

const toNumber = (value: unknown) => {
    const num = Number(value)
    return Number.isFinite(num) ? num : 0
}

interface ScoredMatch {
    match: MatchInfo
    bo: number
}

const isValidMatch = (match: MatchInfo) => {
    const { top, bottom } = match
    return !!top.team
        && !!bottom.team
        && top.team !== 'TBD'
        && bottom.team !== 'TBD'
        && top.score !== undefined
        && bottom.score !== undefined
}

const ensureTeam = (records: Record<string, TeamRecord>, team: string, icon: string) => {
    if (!records[team]) {
        records[team] = {
            team,
            icon,
            played: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            points: 0,
            yellowCards: 0,
            redCards: 0,
        }
    }
}

const shouldCountMatch = (match: MatchInfo, mark: string, bo: number) => {
    if (!isValidMatch(match)) return false
    if (mark === 'lol') return isBoMatchFinished(match, bo)
    return true
}

const applyFootballMatchResult = (records: Record<string, TeamRecord>, match: MatchInfo) => {
    const { top, bottom } = match
    ensureTeam(records, top.team, top.icon)
    ensureTeam(records, bottom.team, bottom.icon)

    const topRec = records[top.team]
    const bottomRec = records[bottom.team]

    topRec.played += 1
    bottomRec.played += 1
    topRec.goalsFor += top.score
    topRec.goalsAgainst += bottom.score
    bottomRec.goalsFor += bottom.score
    bottomRec.goalsAgainst += top.score
    topRec.yellowCards += toNumber(top.yellow)
    topRec.redCards += toNumber(top.red)
    bottomRec.yellowCards += toNumber(bottom.yellow)
    bottomRec.redCards += toNumber(bottom.red)

    if (top.score > bottom.score) {
        topRec.wins += 1
        topRec.points += 3
        bottomRec.losses += 1
    } else if (bottom.score > top.score) {
        bottomRec.wins += 1
        bottomRec.points += 3
        topRec.losses += 1
    } else {
        topRec.draws += 1
        topRec.points += 1
        bottomRec.draws += 1
        bottomRec.points += 1
    }
}

const applyLolMatchResult = (records: Record<string, TeamRecord>, match: MatchInfo, bo: number) => {
    const { top, bottom } = match
    const outcome = getBoMatchOutcome(match, bo)
    if (outcome === 'unfinished') return

    ensureTeam(records, top.team, top.icon)
    ensureTeam(records, bottom.team, bottom.icon)

    const topRec = records[top.team]
    const bottomRec = records[bottom.team]

    topRec.played += 1
    bottomRec.played += 1
    topRec.goalsFor += top.score
    topRec.goalsAgainst += bottom.score
    bottomRec.goalsFor += bottom.score
    bottomRec.goalsAgainst += top.score

    if (outcome === 'top') {
        topRec.wins += 1
        topRec.points += 3
        bottomRec.losses += 1
    } else {
        bottomRec.wins += 1
        bottomRec.points += 3
        topRec.losses += 1
    }
}

const applyMatchResult = (
    records: Record<string, TeamRecord>,
    match: MatchInfo,
    mark: string,
    bo: number,
) => {
    if (mark === 'lol') {
        applyLolMatchResult(records, match, bo)
        return
    }

    applyFootballMatchResult(records, match)
}

const getFairPlayDeduction = (record: TeamRecord) =>
    record.yellowCards + record.redCards * 3

const getMiniLeagueStats = (
    team: string,
    tiedTeams: string[],
    scoredMatches: ScoredMatch[],
    mark: string,
): MiniLeagueStats => {
    const stats: MiniLeagueStats = {
        points: 0,
        goalDiff: 0,
        goalsFor: 0,
        wins: 0,
        losses: 0,
    }
    const tiedSet = new Set(tiedTeams)

    scoredMatches.forEach(({ match, bo }) => {
        if (!shouldCountMatch(match, mark, bo)) return

        const { top, bottom } = match
        if (!tiedSet.has(top.team) || !tiedSet.has(bottom.team)) return

        if (mark === 'lol') {
            const outcome = getBoMatchOutcome(match, bo)

            if (team === top.team) {
                stats.goalsFor += top.score
                stats.goalDiff += top.score - bottom.score
                if (outcome === 'top') stats.wins += 1
                else if (outcome === 'bottom') stats.losses += 1
            } else if (team === bottom.team) {
                stats.goalsFor += bottom.score
                stats.goalDiff += bottom.score - top.score
                if (outcome === 'bottom') stats.wins += 1
                else if (outcome === 'top') stats.losses += 1
            }
            return
        }

        if (team === top.team) {
            stats.goalsFor += top.score
            stats.goalDiff += top.score - bottom.score
            if (top.score > bottom.score) {
                stats.points += 3
                stats.wins += 1
            } else if (top.score === bottom.score) {
                stats.points += 1
            } else {
                stats.losses += 1
            }
            return
        }

        if (team === bottom.team) {
            stats.goalsFor += bottom.score
            stats.goalDiff += bottom.score - top.score
            if (bottom.score > top.score) {
                stats.points += 3
                stats.wins += 1
            } else if (bottom.score === top.score) {
                stats.points += 1
            } else {
                stats.losses += 1
            }
        }
    })

    return stats
}

const compareFootballTiebreak = (
    a: TeamRecord,
    b: TeamRecord,
    tiedTeams: string[],
    scoredMatches: ScoredMatch[],
) => {
    const miniA = getMiniLeagueStats(a.team, tiedTeams, scoredMatches, 'football')
    const miniB = getMiniLeagueStats(b.team, tiedTeams, scoredMatches, 'football')

    // 相互比赛进球数
    if (miniB.goalsFor !== miniA.goalsFor) return miniB.goalsFor - miniA.goalsFor

    // 总净胜球
    const gdA = a.goalsFor - a.goalsAgainst
    const gdB = b.goalsFor - b.goalsAgainst
    if (gdB !== gdA) return gdB - gdA

    // 总进球数
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor

    // 公平竞赛：红黄牌扣分越少排名越靠前
    const fairA = getFairPlayDeduction(a)
    const fairB = getFairPlayDeduction(b)
    if (fairA !== fairB) return fairA - fairB

    return a.team.localeCompare(b.team, 'zh')
}

const compareLolTiebreak = (
    a: TeamRecord,
    b: TeamRecord,
    tiedTeams: string[],
    scoredMatches: ScoredMatch[],
) => {
    const miniA = getMiniLeagueStats(a.team, tiedTeams, scoredMatches, 'lol')
    const miniB = getMiniLeagueStats(b.team, tiedTeams, scoredMatches, 'lol')

    // 相互比赛胜负
    if (miniB.wins !== miniA.wins) return miniB.wins - miniA.wins
    if (miniA.losses !== miniB.losses) return miniA.losses - miniB.losses

    return a.team.localeCompare(b.team, 'zh')
}

const compareTeams = (
    a: TeamRecord,
    b: TeamRecord,
    mark: string,
    tiedTeams: string[],
    scoredMatches: ScoredMatch[],
) => {
    if (b.points !== a.points) return b.points - a.points

    const gdA = a.goalsFor - a.goalsAgainst
    const gdB = b.goalsFor - b.goalsAgainst
    if (gdB !== gdA) return gdB - gdA

    if (mark === 'football') {
        return compareFootballTiebreak(a, b, tiedTeams, scoredMatches)
    }

    if (mark === 'lol') {
        return compareLolTiebreak(a, b, tiedTeams, scoredMatches)
    }

    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor
    return a.team.localeCompare(b.team, 'zh')
}

const getTiedTeamNames = (teams: TeamStanding[], team: TeamStanding) =>
    teams
        .filter(item => item.points === team.points && item.goalDiff === team.goalDiff)
        .map(item => item.team)

const sortStandings = (teams: TeamStanding[], mark: string, scoredMatches: ScoredMatch[]) => {
    const sorted = [...teams].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points
        return b.goalDiff - a.goalDiff
    })

    const buckets: TeamStanding[][] = []
    let index = 0

    while (index < sorted.length) {
        let next = index + 1
        while (
            next < sorted.length
            && sorted[next].points === sorted[index].points
            && sorted[next].goalDiff === sorted[index].goalDiff
        ) {
            next += 1
        }

        const bucket = sorted.slice(index, next)
        if (bucket.length > 1) {
            const tiedTeams = bucket.map(item => item.team)
            bucket.sort((a, b) => compareTeams(a, b, mark, tiedTeams, scoredMatches))
        }

        buckets.push(bucket)
        index = next
    }

    return buckets.flat()
}

const assignRanks = (teams: TeamStanding[], mark: string, scoredMatches: ScoredMatch[]) => {
    let rank = 1

    return teams.map((team, index) => {
        if (index > 0) {
            const tiedTeams = getTiedTeamNames(teams, team)
            if (compareTeams(teams[index - 1], team, mark, tiedTeams, scoredMatches) !== 0) {
                rank = index + 1
            }
        }

        return {
            ...team,
            rank,
        }
    })
}

export const computeGroupStandings = (rounds: RoundInfo[], mark: string): TeamStanding[] => {
    const records: Record<string, TeamRecord> = {}
    const scoredMatches: ScoredMatch[] = []

    rounds.forEach((round) => {
        round.matchs.forEach((match) => {
            if (!isValidMatch(match)) return
            scoredMatches.push({ match, bo: round.bo })
            if (!shouldCountMatch(match, mark, round.bo)) return
            applyMatchResult(records, match, mark, round.bo)
        })
    })

    const teams = Object.values(records).map((record) => ({
        ...record,
        goalDiff: record.goalsFor - record.goalsAgainst,
        rank: 0,
    }))

    const sorted = sortStandings(teams, mark, scoredMatches)
    return assignRanks(sorted, mark, scoredMatches)
}
