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

watch(
    () => props.changeMark,
    (newValue, oldValue) => { }
)

const getClass = (match: any, bo: number, team: string) => {
    const scoreA = match.top.score
    const scoreB = match.bottom.score

    const best = Math.floor(bo / 2) + 1
    console.log('Testing: ', scoreA, scoreB, best);
    if (scoreA < best && scoreB < best) return '';

    if (team == "top") return scoreA < scoreB ? 'lose' : ''
    if (team == "bottom") return scoreA > scoreB ? 'lose' : ''
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
                                    <div class="item-team" :class="getClass(match, round.bo, 'top')">
                                        <img :src="`/docs/logos/teams/${match.top.icon}`" alt="" srcset="">
                                        {{ match.top.team }}
                                    </div>
                                    <span class="item-score">{{ match.top.score }} <span>VS</span> {{ match.bottom.score
                                        }}</span>
                                    <div class="item-team" :class="getClass(match, round.bo, 'bottom')">
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
