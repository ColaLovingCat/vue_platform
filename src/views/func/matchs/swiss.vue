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
</style>
