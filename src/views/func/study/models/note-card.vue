<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from "vue";

// name
defineOptions({
  name: "custom-name",
});

// props
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const nos = ["A", "B", "C", "D"];
const noteInfos = reactive({
  id: "section-01",
  title: "例题-sample",
  category: "single-select", // single-select | multi-select | judge | fill
  question: "___。",
  imgs: [],
  options: [
    {
      answer: "A",
      list: ["选项1", "选项2", "选项3", "选项4"],
      note: "这里是解析说明",
    },
  ],
});

// 记录答题结果
const selectedAnswers = ref<Record<string, any>>({});
// 填空题答案
const fillAnswer = ref("");

// 初始化
onMounted(() => refreshData());
watch(
  () => props.data,
  () => refreshData(),
  { deep: true }
);

const refreshData = () => {
  Object.assign(noteInfos, props.data);
  selectedAnswers.value = {};
  fillAnswer.value = "";
};

// 点击选项
const checkAnswer = (optIndex: number, index: number) => {
  const category = noteInfos.category;
  if (category === "single-select" || category === "judge") {
    if (selectedAnswers.value[optIndex] !== undefined) return; // 已答过
    selectedAnswers.value[optIndex] = index;
  } else if (category === "multi-select") {
    // 多选可取消
    if (!selectedAnswers.value[optIndex]) selectedAnswers.value[optIndex] = [];
    const arr = selectedAnswers.value[optIndex];
    const pos = arr.indexOf(index);
    if (pos === -1) arr.push(index);
    else arr.splice(pos, 1);
  }
};
// 获取选项状态
const getOptionClass = (optIndex: number, index: number) => {
  const category = noteInfos.category;
  const option = noteInfos.options[optIndex];
  const correctIndex = nos.indexOf(option.answer);

  if (category === "single-select" || category === "judge") {
    const selected = selectedAnswers.value[optIndex];
    if (selected === undefined) return "";
    if (index === correctIndex) return "correct";
    if (index === selected && index !== correctIndex) return "wrong";
  } else if (category === "multi-select") {
    const selected = selectedAnswers.value[optIndex] || [];
    if (selected.includes(index) && nos.indexOf(option.answer) === index)
      return "correct";
    if (selected.includes(index) && nos.indexOf(option.answer) !== index)
      return "wrong";
  }
  return "";
};

// 填空题确认答案
const submitFill = () => {
  selectedAnswers.value[0] = fillAnswer.value.trim();
};
// 填空题状态
const fillClass = computed(() => {
  if (!selectedAnswers.value[0]) return "";
  return selectedAnswers.value[0] === noteInfos.options[0].answer
    ? "correct"
    : "wrong";
});
</script>

<template>
  <div class="box-note w-full h-full">
    <p class="question" v-html="noteInfos.question"></p>

    <!-- 图片 -->
    <div class="list-imgs" v-if="noteInfos.imgs.length > 0">
      <img v-for="img in noteInfos.imgs" :key="img" :src="img" />
    </div>

    <!-- 单选/多选/判断题 -->
    <div
      v-if="noteInfos.category !== 'fill'"
      class="item-opts"
      v-for="(option, optIndex) in noteInfos.options"
      :key="optIndex"
    >
      <div class="list-opts" :class="`col-${option.col}`">
        <div
          class="opt-item"
          v-for="(opt, index) in option.list"
          :key="index"
          :class="getOptionClass(optIndex, index)"
          @click="checkAnswer(optIndex, index)"
        >
          <div class="item-no">{{ nos[index] }}.</div>
          <div class="item-opt" v-html="opt"></div>
        </div>
      </div>
      <!-- 显示解析 -->
      <div
        v-if="selectedAnswers[optIndex] !== undefined && option.note"
        class="note-explain"
      >
        <strong>解析：</strong> {{ option.note }}
      </div>
    </div>

    <!-- 填空题 -->
    <div v-if="noteInfos.category === 'fill'" class="fill-opts">
      <input v-model="fillAnswer" placeholder="填写答案" />
      <button @click="submitFill">提交</button>
      <div
        v-if="selectedAnswers[0] !== undefined"
        :class="['fill-result', fillClass]"
      >
        <strong>解析：</strong> {{ noteInfos.options[0].note }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import url(./txt.scss);

table {
  th,
  td {
    padding: 5px 15px;
    border: 1px solid #c4cecf7d;
  }
}
</style>

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
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;

    &.col-1 .opt-item {
      width: 100%;
    }
    &.col-2 .opt-item {
      width: 49%;
    }
    &.col-4 .opt-item {
      width: 24%;
    }

    .opt-item {
      cursor: pointer;
      padding: 5px 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      display: flex;
      gap: 5px;

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

  .fill-opts {
    display: flex;
    flex-direction: column;
    gap: 5px;

    input {
      padding: 5px 8px;
      border-radius: 4px;
      border: 1px solid #ccc;
      width: 200px;
    }

    button {
      width: 80px;
      padding: 5px 8px;
      border: none;
      border-radius: 4px;
      background: #1890ff;
      color: #fff;
      cursor: pointer;
    }

    .fill-result.correct {
      color: #1a7f37;
      background: #e6f9ec;
      padding: 5px;
      border-radius: 4px;
    }

    .fill-result.wrong {
      color: #a8071a;
      background: #fdeaea;
      padding: 5px;
      border-radius: 4px;
    }
  }
}
</style>
