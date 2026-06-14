<script lang="ts" setup>
import { computed } from 'vue'
import { type RoundInfo, getTeamClass } from './public'

defineOptions({
    name: 'group-view'
})

const props = defineProps({
    rounds: {
        type: Array as () => RoundInfo[],
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

interface TeamStanding {
    rank: number;
    team: string;
    icon: string;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDiff: number;
    points: number;
}

// 计算积分榜
const standings = computed<TeamStanding[]>(() => {
    const records: Record<string, Omit<TeamStanding, 'rank' | 'goalDiff'>> = {};

    const ensureTeam = (team: string, icon: string) => {
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
            };
        }
    };

    props.rounds.forEach((round) => {
        round.matchs.forEach((match) => {
            const { top, bottom } = match;
            console.log('Testing: ', match);
            if (!top.team || !bottom.team || top.team === 'TBD' || bottom.team === 'TBD' || top.score === undefined || bottom.score === undefined) {
                return;
            }

            ensureTeam(top.team, top.icon);
            ensureTeam(bottom.team, bottom.icon);

            records[top.team].played += 1;
            records[bottom.team].played += 1;
            records[top.team].goalsFor += top.score;
            records[top.team].goalsAgainst += bottom.score;
            records[bottom.team].goalsFor += bottom.score;
            records[bottom.team].goalsAgainst += top.score;

            if (top.score > bottom.score) {
                records[top.team].wins += 1;
                records[top.team].points += 3;
                records[bottom.team].losses += 1;
            } else if (bottom.score > top.score) {
                records[bottom.team].wins += 1;
                records[bottom.team].points += 3;
                records[top.team].losses += 1;
            } else {
                records[top.team].draws += 1;
                records[top.team].points += 1;
                records[bottom.team].draws += 1;
                records[bottom.team].points += 1;
            }
        });
    });

    return Object.values(records)
        .map((record) => ({
            ...record,
            goalDiff: record.goalsFor - record.goalsAgainst,
            rank: 0,
        }))
        .sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goalDiff !== a.goalDiff) return b.goalDiff - a.goalDiff;
            return b.goalsFor - a.goalsFor;
        })
        .map((record, index) => ({
            ...record,
            rank: index + 1,
        }));
});
</script>

<template>
    <div class="box-football">
        <!-- 战报区 -->
        <div class="section-reports">
            <h3 class="section-title">战报</h3>
            <div class="list-rounds">
                <template v-for="round in rounds" :key="round.name">
                    <div class="box-card round-item">
                        <div class="item-infos">
                            <h4>{{ round.name }}</h4>
                            <h4 v-if="round.round">{{ round.round }}</h4>
                            <h4>{{ round.time }}</h4>
                        </div>
                        <div class="list-matchs">
                            <template v-for="(match, index) in round.matchs" :key="index">
                                <div class="match-item">
                                    <div class="item-teams">
                                        <div class="team-infos item-left"
                                            :class="getTeamClass(match, 'top', mark, round.bo)">
                                            <div class="item-team">
                                                <img :src="`/docs/${path}/${match.top.icon}`" alt="" srcset="">
                                                <div class="team-name">{{ match.top.team }}</div>
                                            </div>
                                            <div class="item-score">
                                                {{ match.top.score }}
                                            </div>
                                        </div>
                                        <div class="team-infos item-right"
                                            :class="getTeamClass(match, 'bottom', mark, round.bo)">
                                            <div class="item-score">
                                                {{ match.bottom.score }}
                                            </div>
                                            <div class="item-team">
                                                <div class="team-name">{{ match.bottom.team }}</div>
                                                <img :src="`/docs/${path}/${match.bottom.icon}`" alt="" srcset="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <!-- 积分榜 -->
        <div class="section-standings">
            <h3 class="section-title">积分榜</h3>
            <div class="standings-table">
                <div class="table-header">
                    <span class="col-rank">排名</span>
                    <span class="col-team">队伍</span>
                    <span class="col-stat">场次</span>
                    <span class="col-record">战绩</span>
                    <span class="col-record">得分</span>
                    <span class="col-stat">净胜</span>
                    <span class="col-points">积分</span>
                </div>
                <div v-for="row in standings" :key="row.team" class="table-row">
                    <span class="col-rank">{{ row.rank }}</span>
                    <span class="col-team">
                        <img :src="`/docs/${path}/${row.icon}`" alt="" class="team-icon">
                        <span class="team-name">{{ row.team }}</span>
                    </span>
                    <span class="col-stat">{{ row.played }}</span>
                    <span class="col-record">{{ row.wins }} - {{ row.draws }} - {{ row.losses }}</span>
                    <span class="col-record">{{ row.goalsFor }} - {{ row.goalsAgainst }}</span>
                    <span class="col-stat">{{ row.goalDiff > 0 ? '+' + row.goalDiff : row.goalDiff }}</span>
                    <span class="col-points">{{ row.points }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import url(./styles.scss);

.box-football {
    display: flex;
    gap: 30px;
}

.section-reports {
    flex: 1;
}

.section-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
}

.list-rounds {
    padding-right: 10px;
    height: calc(100vh - 280px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.list-matchs {
    padding: 5px 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .match-item {
        padding: 5px 0;
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;

        .item-team {
            width: 200px;
        }
    }
}

.section-standings {
    width: 650px;
}

.standings-table {
    border-radius: 8px;
    border: 1px solid #c4cecf3d;
    overflow: hidden;
    font-size: 16px;

    .table-header,
    .table-row {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        gap: 8px;
    }

    .table-header {
        background: rgba(255, 255, 255, 0.08);
        font-weight: 700;
        font-size: 15px;
    }

    .table-row {
        border-top: 1px solid #c4cecf1a;

        &:nth-child(even) {
            background: rgba(255, 255, 255, 0.03);
        }
    }

    .col-rank {
        width: 40px;
        text-align: center;
        flex-shrink: 0;
    }

    .col-team {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 120px;

        .team-icon {
            width: 36px;
            height: 36px;
            object-fit: contain;
        }

        .team-name {
            font-weight: 700;
        }
    }

    .col-record {
        width: 80px;
        text-align: center;
        flex-shrink: 0;
    }

    .col-stat {
        width: 44px;
        text-align: center;
        flex-shrink: 0;
    }

    .col-points {
        width: 44px;
        text-align: center;
        flex-shrink: 0;
        font-weight: 800;
        color: #ffd700;
    }
}
</style>
