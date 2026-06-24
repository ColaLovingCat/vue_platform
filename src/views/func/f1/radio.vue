<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch, type PropType } from 'vue'

defineOptions({
    name: 'f1-radio'
})

interface RadioCom {
    sender: string
    content: string
}

interface RadioInfos {
    driver: string
    noIcon: string
    teamIcon: string
    color: string
    communications: RadioCom[]
}

interface DisplayCom extends RadioCom {
    text: string
    done: boolean
}

const props = defineProps({
    data: {
        type: Object as PropType<RadioInfos>,
        default: () => ({ communications: [] })
    },
    playing: {
        type: Boolean,
        default: false
    },
    embedded: {
        type: Boolean,
        default: false
    },
    changeMark: {
        type: Boolean,
        require: false
    }
})

const emit = defineEmits<{
    finished: []
}>()

const BAR_COUNT = 28
const bars = ref<number[]>(Array.from({ length: BAR_COUNT }, () => 0.18))
const displayComs = ref<DisplayCom[]>([])

let rafId: number | null = null
let targets = Array.from({ length: BAR_COUNT }, () => 0.18)
let lastTargetUpdate = 0
let typingTimer: ReturnType<typeof setTimeout> | null = null
let comIndex = 0
let charIndex = 0

const CHAR_DELAY = 32
const MSG_PAUSE = 450

const randomHeight = (min = 0.12, max = 1) => min + Math.random() * (max - min)

const refreshTargets = (count = 6) => {
    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * BAR_COUNT)
        targets[index] = randomHeight()
    }
}

const animate = (time: number) => {
    if (time - lastTargetUpdate > 90) {
        lastTargetUpdate = time
        refreshTargets(4 + Math.floor(Math.random() * 5))
    }

    bars.value = bars.value.map((height, index) => {
        const delta = targets[index] - height
        const speed = 0.12 + Math.random() * 0.1
        return height + delta * speed
    })

    rafId = requestAnimationFrame(animate)
}

const startWaves = () => {
    if (rafId != null) return
    targets = Array.from({ length: BAR_COUNT }, () => randomHeight(0.15, 0.45))
    bars.value = [...targets]
    lastTargetUpdate = 0
    rafId = requestAnimationFrame(animate)
}

const stopWaves = () => {
    if (rafId == null) return
    cancelAnimationFrame(rafId)
    rafId = null
}

const clearTyping = () => {
    if (typingTimer != null) {
        clearTimeout(typingTimer)
        typingTimer = null
    }
}

const resetSequence = () => {
    clearTyping()
    displayComs.value = []
    comIndex = 0
    charIndex = 0
}

const typeNext = () => {
    const comms = props.data.communications || []

    if (comIndex >= comms.length) {
        emit('finished')
        return
    }

    const current = comms[comIndex]

    if (displayComs.value.length <= comIndex) {
        displayComs.value.push({
            sender: current.sender,
            content: current.content,
            text: '',
            done: false
        })
    }

    const item = displayComs.value[comIndex]

    if (charIndex < current.content.length) {
        item.text = current.content.slice(0, charIndex + 1)
        charIndex++
        typingTimer = setTimeout(typeNext, CHAR_DELAY)
        return
    }

    item.done = true
    comIndex++
    charIndex = 0
    typingTimer = setTimeout(typeNext, MSG_PAUSE)
}

const startTyping = () => {
    resetSequence()
    typeNext()
}

watch(
    () => props.playing,
    (val) => {
        if (val) startTyping()
        else resetSequence()
    },
    { immediate: true }
)

watch(
    () => props.changeMark,
    () => refreshTargets(BAR_COUNT)
)

onMounted(startWaves)
onUnmounted(() => {
    stopWaves()
    clearTyping()
})
</script>

<template>
    <div class="radio-item" :class="{ embedded }" :style="{ '--team-color': data.color }">
        <div class="radio-header">
            <div class="radio-infos">
                <!-- <div class="radio-no">
                    <img :src="`/docs/f1/nos/${data.noIcon}`" alt="" />
                </div> -->

                <div class="radio-waves" aria-hidden="true">
                    <span v-for="(height, index) in bars" :key="index" class="wave-bar" :style="{
                        transform: `scaleY(${height})`,
                        opacity: 0.45 + height * 0.55
                    }" />
                </div>

                <!-- <div class="radio-team">
                    <img :src="`/docs/f1/teams/${data.teamIcon}`" alt="" />
                </div> -->
            </div>

            <div class="radio-name">
                <div class="radio-driver" :style="{ color: data.color }">
                    {{ data.driver }}
                </div>
                <div class="radio-tag">RADIO</div>
            </div>
        </div>

        <div v-if="displayComs.length" class="radio-communications">
            <div v-for="(com, index) in displayComs" :key="index" class="com-item" :class="com.sender"
                :style="com.sender === 'driver' ? { color: data.color } : undefined">
                <div class="com-infos">
                    "{{ com.text }}<span v-if="playing && !com.done && index === displayComs.length - 1"
                        class="typing-cursor">|</span>"
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$f1-silver: #949498;

.radio-item {
    width: 320px;
    padding: 14px 16px 16px;
    background: linear-gradient(180deg, rgba(31, 31, 39, 0.95) 0%, rgba(21, 21, 30, 0.98) 100%);
    border: 1px solid #333;
    border-radius: 0 12px 12px 0;
    position: relative;
    overflow: hidden;

    &.embedded {
        width: 100%;
        min-height: 110px;
        border: none;
        border-radius: 0 12px 12px 0;
        padding: 10px 12px 12px;
        background: linear-gradient(135deg, #1f1f27 0%, #2b2b35 100%);

        .radio-header {
            margin-bottom: 4px;

            .radio-driver,
            .radio-tag {
                font-size: 17px;
            }
        }

        .radio-infos {
            height: 44px;

            .radio-waves {
                height: 34px;

                .wave-bar {
                    height: 30px;
                }
            }
        }

        .radio-communications {
            margin-top: 8px;
            gap: 4px;

            .com-infos {
                font-size: 12px;
                line-height: 1.3;
            }
        }
    }

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--team-color, #e10600);
    }

    & * {
        font-family: 'Formula1' !important;
        letter-spacing: 1px !important;
    }
}

.radio-header {
    display: flex;
    justify-content: space-between;
    gap: 5px;
}

.radio-name {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 8px;
    padding-right: 2px;

    .radio-driver,
    .radio-tag {
        font-size: 21px;
        font-weight: 700;
        line-height: 1.05;
        text-transform: uppercase;
    }

    .radio-tag {
        font-weight: 900;
        color: #fff;
    }
}

.radio-infos {
    width: 180px;
    height: 52px;
    display: grid;
    grid-template-columns: 56px 1fr 56px;
    align-items: center;
    gap: 8px;
    padding: 4px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    .radio-no,
    .radio-team {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            height: 38px;
            width: auto;
            object-fit: contain;
            filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.45));
        }
    }

    .radio-no img {
        height: 25px;
    }

    .radio-waves {
        width: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2px;
        height: 40px;
        padding: 0 4px;
        mask-image: linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%);
        -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%);

        .wave-bar {
            flex: 1;
            max-width: 3px;
            min-width: 2px;
            height: 36px;
            border-radius: 1px;
            background: #fff;
            transform-origin: center center;
            will-change: transform, opacity;
            box-shadow: 0 0 4px rgba(255, 255, 255, 0.25);
        }
    }
}

.radio-communications {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .com-item {
        width: 100%;
        display: flex;

        .com-infos {
            max-width: 88%;
            font-size: 15px;
            font-weight: 500;
            line-height: 1.35;
            text-transform: uppercase;
        }

        &.driver {
            justify-content: flex-end;
            text-align: right;
        }

        &.team {
            justify-content: flex-start;

            .com-infos {
                color: $f1-silver;
            }
        }
    }
}

.typing-cursor {
    color: #fff;
    font-weight: 300;
    animation: blink 0.8s step-end infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>
