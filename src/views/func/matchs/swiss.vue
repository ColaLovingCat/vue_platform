<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

// name
defineOptions({
    name: 'custom-name'
})

// props
const props = defineProps({
    limit: {
        type: Number,
        default: 3
    },
    rounds: {
        type: Object,
        default: () => ({})
    },
    changeMark: {
        type: Boolean,
        require: false
    }
})

onMounted(() => { })

const getTeamClass = (match: any, bo: number, team: string): string => {
    const { top: teamA, bottom: teamB } = match;

    // 检查 TBD 情况
    if ((team === "top" && teamA.team === "TBD") ||
        (team === "bottom" && teamB.team === "TBD")) {
        return 'tbd';
    }

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

    return '';
};

const qualifiedTeams = computed(() => {
    const teamRecords = computeTeamRecords(props.rounds);
    const winners: any[] = []; // 晋级队伍
    const losers: any[] = [];  // 淘汰队伍

    Object.entries(teamRecords).forEach(([team, record]: any) => {
        if (record.wins >= props.limit) {
            winners.push({
                team: team,
                icon: record.icon,
                wins: record.wins,
                losses: record.losses
            });
        }
        if (record.losses >= props.limit) {
            losers.push({
                team: team,
                icon: record.icon,
                wins: record.wins,
                losses: record.losses
            });
        }
    });

    // 补全空位到8个
    const fillEmptySlots = (list: any[], type: 'winner' | 'loser') => {
        const filledList = [...list];
        while (filledList.length < 8) {
            filledList.push({
                team: '',
                icon: '',
                wins: 0,
                losses: 0,
                isEmpty: true
            });
        }
        return filledList;
    };

    const filledWinners = fillEmptySlots(winners, 'winner');
    const filledLosers = fillEmptySlots(losers, 'loser');

    const result = {
        winners: filledWinners,
        losers: filledLosers,
        allRecords: teamRecords
    }
    return result;
});

// 计算队伍胜负场次
function computeTeamRecords(rounds: any) {
    const teamRecords: any = {};
    // 遍历所有轮次
    rounds.forEach((roundGroup: any) => {
        roundGroup.forEach((round: any) => {
            round.matchs.forEach((match: any) => {
                const topTeam = match.top.team;
                const bottomTeam = match.bottom.team;
                const topScore = match.top.score;
                const bottomScore = match.bottom.score;
                const topIcon = match.top.icon;
                const bottomIcon = match.bottom.icon;

                // 初始化队伍记录
                if (!teamRecords[topTeam]) {
                    teamRecords[topTeam] = {
                        wins: 0,
                        losses: 0,
                        icon: topIcon
                    };
                }
                if (!teamRecords[bottomTeam]) {
                    teamRecords[bottomTeam] = {
                        wins: 0,
                        losses: 0,
                        icon: bottomIcon
                    };
                }

                // 计算胜负（排除未进行的比赛，score为0且对手score也为0）
                if (topScore > 0 || bottomScore > 0) {
                    if (topScore > bottomScore) {
                        teamRecords[topTeam].wins += 1;
                        teamRecords[bottomTeam].losses += 1;
                    } else if (bottomScore > topScore) {
                        teamRecords[bottomTeam].wins += 1;
                        teamRecords[topTeam].losses += 1;
                    }
                }
            });
        });
    });
    return teamRecords;
}
</script>

<template>
    <div class="box-rounds">
        <template v-for="item in rounds">
            <div class="list-round">
                <template v-for="round in item">
                    <div class="round-item">
                        <div class="item-infos">
                            <h4>{{ round.time }}</h4>
                            <h4>{{ round.round }} BO{{ round.bo }}</h4>
                        </div>
                        <div class="list-matchs">
                            <template v-for="match in round.matchs">
                                <div class="match-item">
                                    <div class="item-team item-left" :class="getTeamClass(match, round.bo, 'top')">
                                        <img :src="`/docs/logos/teams/${match.top.icon}`" alt="" srcset="">
                                        <div class="team-name">{{ match.top.team }}</div>
                                    </div>
                                    <span class="item-score">
                                        {{ match.top.score }}
                                        <span>:</span>
                                        {{ match.bottom.score }}
                                    </span>
                                    <div class="item-team item-right" :class="getTeamClass(match, round.bo, 'bottom')">
                                        <div class="team-name">{{ match.bottom.team }}</div>
                                        <img :src="`/docs/logos/teams/${match.bottom.icon}`" alt="" srcset="">
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
                    <template v-for="team in qualifiedTeams.winners">
                        <div class="team-item" :class="team.isEmpty ? 'item-empty' : ''">
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
                    <template v-for="team in qualifiedTeams.losers">
                        <div class="team-item" :class="team.isEmpty ? 'item-empty' : ''">
                            <img :src="`/docs/logos/teams/${team.icon}`" alt="" srcset="">
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.box-rounds {
    color: #fff;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .list-round {
        display: flex;
        justify-content: center;
        gap: 10px;

        .round-item {
            .item-infos {
                display: flex;
                justify-content: space-between;

                h4 {
                    font-size: 17px;
                    font-weight: 700;
                }
            }
        }
    }
}

.list-matchs {
    padding: 5px 0;
    border-radius: 8px;
    border: 1px solid #c4cecf3d;
    display: flex;
    flex-direction: column;

    .match-item {
        padding: 5px 0;
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 10px;

        .item-score span {
            font-weight: 700;
            color: #002bff;
        }

        .item-team {
            padding: 0 10px;
            width: 150px;
            font-weight: 800;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

            &.win {
                background-image: linear-gradient(0deg, rgb(1, 133, 36), rgb(16, 100, 1));
            }

            &.lose {
                background: #2e0505;
                opacity: 0.4;
                filter: saturate(0);
            }

            &.item-left {
                .team-name {
                    text-align: right;
                }
            }

            img {
                width: 50px;
            }

            .team-name {
                flex: 1;
                font-weight: 700;
            }
        }
    }
}

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
