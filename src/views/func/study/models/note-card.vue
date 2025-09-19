<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

// name
defineOptions({
    name: 'custom-name'
})

// props
const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    },
})

const nos = ['A', 'B', 'C', 'D']
const noteInfos = reactive({
    id: "section-01",
    title: "例题-sample",
    question: "___。",
    imgs: [],
    options: [
        {
            answer: "A",
            list: ["选项1", "选项2", "选项3", "选项4"],
            note: "这里是解析说明",
        }
    ],
})

// 记录答题结果
const selectedAnswers = ref<Record<string, number>>({})

onMounted(() => {
    refreshData()
})
watch(
    () => props.data,
    (newValue, oldValue) => {
        refreshData()
    },
    { deep: true }
)
const refreshData = () => {
    Object.assign(noteInfos, props.data)
    selectedAnswers.value = {}
}

const checkAnswer = (optIndex: number, index: number) => {
    if (selectedAnswers.value[optIndex] !== undefined) return // 已答过不可再选
    selectedAnswers.value[optIndex] = index
}

// 判断选项状态
const getOptionClass = (optIndex: number, index: number) => {
    const selected = selectedAnswers.value[optIndex]
    if (selected === undefined) return ''

    const option = noteInfos.options[optIndex]
    const correctIndex = nos.indexOf(option.answer)

    if (index === correctIndex) return 'correct'
    if (index === selected && index !== correctIndex) return 'wrong'
    return ''
}
</script>

<template>
    <div class="box-note w-full h-full">
        <p class="question">{{ noteInfos.question }}</p>
        <div class="list-imgs">
            <template v-if="noteInfos.imgs.length > 0">
                <img v-for="img in noteInfos.imgs" :src="img">
            </template>
        </div>

        <div class="item-opts" v-for="(option, optIndex) in noteInfos.options" :key="optIndex">
            <div class="list-opts">
                <div class="opt-item" v-for="(opt, index) in option.list" :key="index"
                    :class="getOptionClass(optIndex, index)" @click="checkAnswer(optIndex, index)">
                    {{ nos[index] }}. {{ opt }}
                </div>
            </div>

            <!-- 显示解析 -->
            <div v-if="selectedAnswers[optIndex] !== undefined && option.note != ''" class="note-explain">
                <strong>解析：</strong> {{ option.note }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.box-note {
    display: flex;
    flex-direction: column;
    gap: 5px;

    p {
        font-size: 16px;
    }

    .list-imgs {
        display: flex;
        justify-content: center;
        gap: 5px;

        img {
            max-width: 500px;
        }
    }

    .list-opts {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        row-gap: 5px;

        .opt-item {
            padding: 5px 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;

            &.correct {
                background: #e6f9ec;
                border-color: #52c41a;
                color: #1a7f37;
            }

            &.wrong {
                background: #fdeaea;
                border-color: #ff4d4f;
                color: #a8071a;
            }
        }
    }

    .note-explain {
        margin-top: 5px;
        padding: 8px;
        border-left: 3px solid #1890ff;
        background: #f6f9ff;
        border-radius: 3px;
        font-size: 14px;
        color: #333;
    }
}
</style>
