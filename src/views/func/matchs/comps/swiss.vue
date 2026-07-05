<script lang="ts" setup>
import { computed } from 'vue'
import { type RoundInfo, type MatchInfo, getTeamClass, useTeamHover, isTeamHovered } from './public'

defineOptions({
    name: 'swiss-name'
})

const { hoveredTeam, setHoveredTeam } = useTeamHover()

interface TeamRecord {
    wins: number;
    losses: number;
    icon: string;
}

interface QualifiedTeam {
    team: string;
    icon: string;
    wins: number;
    losses: number;
    isEmpty?: boolean;
}

const props = defineProps({
    rounds: {
        type: Array as () => RoundInfo[][],
        default: () => []
    },
    mark: {
        type: String,
        default: ''
    },
    limit: {
        type: Number,
        default: 3
    },
})

const isTiTiebreakerRound = (round: RoundInfo) =>
    round.round.includes('3-2') && round.round.includes('2-3')

const isMatchFinished = (match: MatchInfo, bo: number) => {
    const winningScore = Math.floor(bo / 2) + 1
    return match.top.score >= winningScore || match.bottom.score >= winningScore
}

const filterRegularRounds = (rounds: RoundInfo[][]) =>
    rounds.map((group) => group.filter((round) => !isTiTiebreakerRound(round)))
        .filter((group) => group.length > 0)

const getTiTiebreakerRounds = (rounds: RoundInfo[][]) => {
    const tiebreaker: RoundInfo[] = []
    rounds.forEach((group) => {
        group.forEach((round) => {
            if (isTiTiebreakerRound(round)) {
                tiebreaker.push(round)
            }
        })
    })
    return tiebreaker
}

const fillEmptySlots = (list: QualifiedTeam[], size = 8): QualifiedTeam[] => {
    const filledList = [...list]
    while (filledList.length < size) {
        filledList.push({
            team: '',
            icon: '',
            wins: 0,
            losses: 0,
            isEmpty: true,
        })
    }
    return filledList
}

const toQualifiedTeam = (team: string, record: TeamRecord): QualifiedTeam => ({
    team,
    icon: record.icon,
    wins: record.wins,
    losses: record.losses,
})

// 计算晋级和淘汰队伍
const qualifiedTeams = computed(() => {
    if (props.mark === 'ti') {
        return computeTiQualifiedTeams(props.rounds, props.limit)
    }
    return computeDefaultQualifiedTeams(props.rounds, props.limit)
})

function computeDefaultQualifiedTeams(rounds: RoundInfo[][], limit: number) {
    const teamRecords = computeTeamRecords(rounds)
    const winners: QualifiedTeam[] = []
    const losers: QualifiedTeam[] = []

    Object.entries(teamRecords).forEach(([team, record]) => {
        if (record.wins >= limit) {
            winners.push(toQualifiedTeam(team, record))
        }
        if (record.losses >= limit) {
            losers.push(toQualifiedTeam(team, record))
        }
    })

    return {
        winners: fillEmptySlots(winners),
        losers: fillEmptySlots(losers),
        allRecords: teamRecords,
    }
}

function computeTiQualifiedTeams(rounds: RoundInfo[][], limit: number) {
    const regularRecords = computeTeamRecords(filterRegularRounds(rounds))
    const winners: QualifiedTeam[] = []
    const losers: QualifiedTeam[] = []

    Object.entries(regularRecords).forEach(([team, record]) => {
        if (record.wins >= limit && record.losses <= 1) {
            winners.push(toQualifiedTeam(team, record))
            return
        }
        if (record.losses >= limit && record.wins <= 1) {
            losers.push(toQualifiedTeam(team, record))
        }
    })

    getTiTiebreakerRounds(rounds).forEach((round) => {
        round.matchs.forEach((match) => {
            if (!isMatchFinished(match, round.bo)) {
                return
            }

            const topWon = match.top.score > match.bottom.score
            const bottomWon = match.bottom.score > match.top.score
            if (!topWon && !bottomWon) {
                return
            }

            const winner = topWon ? match.top : match.bottom
            const loser = topWon ? match.bottom : match.top
            const winnerRecord = regularRecords[winner.team] || { wins: 0, losses: 0, icon: winner.icon }
            const loserRecord = regularRecords[loser.team] || { wins: 0, losses: 0, icon: loser.icon }

            winners.push({
                team: winner.team,
                icon: winner.icon,
                wins: winnerRecord.wins + 1,
                losses: winnerRecord.losses,
            })
            losers.push({
                team: loser.team,
                icon: loser.icon,
                wins: loserRecord.wins,
                losses: loserRecord.losses + 1,
            })
        })
    })

    return {
        winners: fillEmptySlots(winners),
        losers: fillEmptySlots(losers),
        allRecords: computeTeamRecords(rounds),
    }
}

function computeTeamRecords(rounds: RoundInfo[][]) {
    const teamRecords: Record<string, TeamRecord> = {}

    rounds.forEach((roundGroup) => {
        roundGroup.forEach((round) => {
            round.matchs.forEach((match) => {
                const { top, bottom } = match
                const topTeam = top.team
                const bottomTeam = bottom.team

                if (!teamRecords[topTeam]) {
                    teamRecords[topTeam] = { wins: 0, losses: 0, icon: top.icon }
                }
                if (!teamRecords[bottomTeam]) {
                    teamRecords[bottomTeam] = { wins: 0, losses: 0, icon: bottom.icon }
                }

                if (top.score > 0 || bottom.score > 0) {
                    if (top.score > bottom.score) {
                        teamRecords[topTeam].wins += 1
                        teamRecords[bottomTeam].losses += 1
                    } else if (bottom.score > top.score) {
                        teamRecords[bottomTeam].wins += 1
                        teamRecords[topTeam].losses += 1
                    }
                }
            })
        })
    })

    return teamRecords
}
</script>

<template>
    <div class="box-rounds">
        <template v-for="item in rounds">
            <div class="list-round">
                <template v-for="round in item">
                    <div class="box-card round-item">
                        <div class="item-infos">
                            <h4>{{ round.time }}</h4>
                            <h4>{{ round.round }} BO{{ round.bo }}</h4>
                        </div>
                        <div class="list-matchs">
                            <template v-for="match in round.matchs">
                                <div class="match-item">
                                    <div class="item-teams">
                                        <div
                                            class="team-infos item-left"
                                            :class="[
                                                getTeamClass(match, 'top', mark, round.bo),
                                                { 'is-team-hover': isTeamHovered(match.top.team, hoveredTeam) },
                                            ]"
                                            @mouseenter="setHoveredTeam(match.top.team)"
                                        >
                                            <div class="item-team">
                                                <img :src="`/docs/logos/teams/${match.top.icon}`" alt="" srcset="">
                                                <div class="team-name">{{ match.top.team }}</div>
                                            </div>
                                            <div class="item-score">
                                                {{ match.top.score }}
                                            </div>
                                        </div>
                                        <div
                                            class="team-infos item-right"
                                            :class="[
                                                getTeamClass(match, 'bottom', mark, round.bo),
                                                { 'is-team-hover': isTeamHovered(match.bottom.team, hoveredTeam) },
                                            ]"
                                            @mouseenter="setHoveredTeam(match.bottom.team)"
                                        >
                                            <div class="item-score">
                                                {{ match.bottom.score }}
                                            </div>
                                            <div class="item-team">
                                                <div class="team-name">{{ match.bottom.team }}</div>
                                                <img :src="`/docs/logos/teams/${match.bottom.icon}`" alt="" srcset="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </template>
        <div class="list-round">
            <div class="round-item">
                <div class="item-infos">
                    <h4>晋级</h4>
                </div>
                <div class="list-teams win">
                    <template v-for="team in qualifiedTeams.winners" :key="`win-${team.team || team.icon}`">
                        <div
                            class="team-item"
                            :class="{
                                'item-empty': team.isEmpty,
                                'is-team-hover-item': isTeamHovered(team.team, hoveredTeam),
                            }"
                            @mouseenter="setHoveredTeam(team.team)"
                        >
                            <img :src="`/docs/logos/teams/${team.icon}`" alt="" srcset="">
                        </div>
                    </template>
                </div>
            </div>
            <div class="round-item">
                <div class="item-infos">
                    <h4>淘汰</h4>
                </div>
                <div class="list-teams lose">
                    <template v-for="team in qualifiedTeams.losers" :key="`lose-${team.team || team.icon}`">
                        <div
                            class="team-item"
                            :class="{
                                'item-empty': team.isEmpty,
                                'is-team-hover-item': isTeamHovered(team.team, hoveredTeam),
                            }"
                            @mouseenter="setHoveredTeam(team.team)"
                        >
                            <img :src="`/docs/logos/teams/${team.icon}`" alt="" srcset="">
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import url(./styles.scss);

.box-rounds {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .list-round {
        display: flex;
        justify-content: center;
        gap: 10px;
    }
}

.list-matchs {
    padding: 5px 0;
    display: flex;
    flex-direction: column;

    .match-item {
        padding: 5px 0;
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 10px;

        .item-team {
             width: 150px;
        }
    }
}

// 晋级淘汰池
.list-teams {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #c4cecf9d;
    display: flex;
    gap: 15px;

    &.win {
        background-image: linear-gradient(0deg, rgb(1, 133, 36), rgb(16, 100, 1));
    }

    &.lose {
        background-image: linear-gradient(0deg, rgb(133, 1, 1), rgb(100, 1, 1));
    }

    .team-item {
        width: 50px;
        height: 50px;

        &.item-empty {
            border: 1px dashed #ffffff5d;
            border-radius: 50%;

            img {
                display: none;
            }
        }

        img {
            width: 50px;
        }
    }
}
</style>
