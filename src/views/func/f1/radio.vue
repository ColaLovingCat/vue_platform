<script lang="ts" setup>
import { onMounted, watch, type PropType } from 'vue'

// name
defineOptions({
    name: 'f1-radio'
})

interface RadioInfos {
    driver: string;
    noIcon: string;
    teamIcon: string;
    color: string;
    communications: {
        sender: string;
        content: string;
    }[];
}

// props
const props = defineProps({
    data: {
        type: Object as PropType<RadioInfos>,
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
</script>

<template>
    <div class="radio-item">
        <div class="radio-driver" :style="{ color: data.color }">{{ data.driver }}</div>
        <div class="radio-tag">RADIO</div>
        <div class="radio-infos">
            <div class="radio-no">
                <img :src="`/docs/f1/nos/${data.noIcon}`" alt="" srcset="">
            </div>
            <div class="radio-team">
                <img :src="`/docs/f1/teams/${data.teamIcon}`" alt="" srcset="">
            </div>
            <div class="radio-waves"></div>
        </div>
        <div class="radio-communications">
            <div class="com-item" v-for="com in data.communications" :class="com.sender"
                :style="{ color: com.sender == 'driver' ? data.color : 'white' }">
                <div class="com-infos">"{{ com.content }}"</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.radio-item {
    width: 300px;

    & * {
        font-family: 'Formula1' !important;
        letter-spacing: 1px !important;
    }

    .radio-driver,
    .radio-tag {
        font-size: 21px;
        font-weight: 700;
        text-align: right;
    }

    .radio-tag {
        font-weight: 900;
    }

    .radio-infos {
        width: 100%;
        height: 50px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
            height: 40px;
        }

        .radio-waves {
            position: absolute
        }
    }

    .radio-communications {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 5px;

        .com-item {
            width: 100%;
            display: flex;

            .com-infos {
                width: 200px;
                font-size: 16px;
                font-weight: 500;
            }

            &.driver {
                justify-content: end;
            }
        }
    }
}
</style>
