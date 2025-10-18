<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

// name
defineOptions({
    name: 'custom-name'
})

// props
const props = defineProps({
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
        return teamA.score < teamB.score ? 'lose' : '';
    }
    if (team === "bottom") {
        return teamA.score > teamB.score ? 'lose' : '';
    }

    return '';
};

const qualifiedTeams = computed(() => {
    const teamRecords = computeTeamRecords(props.rounds);
    const winners: any[] = []; // 赢了3场的队伍（晋级）
    const losers: any[] = [];  // 输了3场的队伍（淘汰）

    Object.entries(teamRecords).forEach(([team, record]: any) => {
        if (record.wins >= 3) {
            winners.push({
                team: team,
                icon: record.icon,
                wins: record.wins,
                losses: record.losses
            });
        }
        if (record.losses >= 3) {
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
                                    <div class="item-team" :class="getTeamClass(match, round.bo, 'top')">
                                        <img :src="`/docs/logos/teams/${match.top.icon}`" alt="" srcset="">
                                        {{ match.top.team }}
                                    </div>
                                    <span class="item-score">
                                        {{ match.top.score }}
                                        <span>VS</span>
                                        {{ match.bottom.score }}
                                    </span>
                                    <div class="item-team" :class="getTeamClass(match, round.bo, 'bottom')">
                                        {{ match.bottom.team }}
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
                <div class="list-teams">
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
                <div class="list-teams">
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
    border: 1px solid #c4cecf9d;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .match-item {
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 10px;

        .item-score span {
            font-weight: 700;
            color: #002bff;
        }

        .item-team {
            width: 150px;
            font-weight: 800;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

            &.tbd,
            &.lose {
                opacity: 0.4;
            }

            img {
                width: 50px;
            }
        }
    }
}

.list-teams {
    padding: 10px;
    border: 1px solid #c4cecf9d;
    display: flex;
    gap: 15px;

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
