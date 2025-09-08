<script lang="ts" setup>
import { ref, computed } from "vue";

import wordTip from "./wordTip.vue";

// name
defineOptions({
    name: 'custom-name'
})

/** ======================== 类型定义 ======================== */
type Sentence = { en: string; zh: string };
type Paragraph = { sentences: Sentence[] };
type Article = {
    title: Sentence;
    contents: Paragraph[];
};

// props
const props = defineProps<{
    article: Article;
}>();

/** ======================== 状态 ======================== */
// 控制是否显示所有中文
const showAllChinese = ref(false);
function toggleZH() {
    showAllChinese.value = !showAllChinese.value;
}

// 当前激活句子
const activeKey = ref<string | null>(null);
const TITLE_KEY = "title";
const keyOf = (p: number, s: number) => `p${p}_s${s}`;
const setActive = (key: string) => (activeKey.value = key);
const clearActive = () => (activeKey.value = null);
const isActive = (key: string) => activeKey.value === key;

defineExpose({ toggleZH })
</script>

<template>
    <div class="article-study">
        <div class="article-body">
            <!-- 左边英文 -->
            <div class="left">
                <!-- 标题 -->
                <h3 class="titles" :class="{ active: isActive(TITLE_KEY) }" @mouseenter="setActive(TITLE_KEY)"
                    @mouseleave="clearActive">
                    <word-tip :text="article.title.en" />
                </h3>

                <!-- 正文 -->
                <div v-for="(para, pIdx) in article.contents" :key="'p-en-' + pIdx" class="paragraph">
                    <template v-for="(sent, sIdx) in para.sentences" :key="'s-en-' + pIdx + '-' + sIdx">
                        <span class="sentence" :class="{ active: isActive(keyOf(pIdx, sIdx)) }"
                            @mouseenter="setActive(keyOf(pIdx, sIdx))" @mouseleave="clearActive">
                            <word-tip :text="sent.en" />
                        </span>
                        <span>&nbsp;</span>
                    </template>
                </div>
            </div>

            <!-- 右边中文 -->
            <div class="right">
                <!-- 标题 -->
                <h3 class="titles zh" :class="{ visible: showAllChinese || isActive(TITLE_KEY) }">
                    {{ article.title.zh }}
                </h3>

                <!-- 正文 -->
                <div v-for="(para, pIdx) in article.contents" :key="'p-zh-' + pIdx" class="paragraph">
                    <template v-for="(sent, sIdx) in para.sentences" :key="'s-zh-' + pIdx + '-' + sIdx">
                        <span class="sentence zh" :class="{ visible: showAllChinese || isActive(keyOf(pIdx, sIdx)) }">
                            {{ sent.zh }}
                        </span>
                        <span>&nbsp;</span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.article-study {
    font-size: 16px;
    line-height: 1.8;
}

.article-body {
    display: flex;
    gap: 40px;

    .left,
    .right {
        flex: 1;
    }
}

.titles {
    text-align: center;
    font-size: 16px;

    span {
        font-weight: 700;
    }
}

.paragraph {
    margin-bottom: 16px;
    text-align: justify;
}

.sentence {
    cursor: pointer;
}

.sentence.active {
    background: #f0f5ff;
}

.zh {
    opacity: 0.05;
    transition: opacity 0.2s;
}

.zh.visible {
    opacity: 1;
}

/* 短语高亮 */
.highlight {
    color: #1890ff;
    border-bottom: 1px dashed #1890ff;
    cursor: help;
}

.toolbar {
    margin-top: 20px;
    text-align: center;

    button {
        padding: 6px 12px;
        background: #1890ff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background: #40a9ff;
        }
    }
}
</style>
