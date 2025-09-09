<script lang="ts" setup>
import { ref } from "vue";

import wordTip from "./wordTip.vue";
import wordCard from "./wordCard.vue";

import type { Article } from "./types";

// name
defineOptions({
    name: 'custom-name'
})

// props
const props = defineProps<{
    article: Article;
}>();

// 控制是否显示所有中文
const showAllChinese = ref(false);
function toggleZH() {
    showAllChinese.value = !showAllChinese.value;
}
// 当前激活句子
const activeKey = ref<string | null>(null);

// 展示词卡
const words: any = ref([])
function selectWord(word: any) {
    if (!words.value.find((w: any) => w.word === word.word)) {
        words.value.unshift(word);
    }
}
</script>

<template>
    <div class="box-articles">
        <div class="box-article">
            <!-- 标题 -->
            <h2 class="title">
                <div>
                    <wordTip :text="article.title.en" :words="article.title.words" @select="selectWord" />
                </div>
                <div style="cursor: pointer;" @click="toggleZH">{{ article.title.zh }}</div>
            </h2>

            <template v-for="(para, pIdx) in article.contents" :key="pIdx">
                <!-- 英文行 -->
                <div class="paragraph-item paragraph-en">
                    <template v-for="(sent, sIdx) in para.sentences" :key="'en-' + sIdx">
                        <span class="sentence-item en" :class="{ active: activeKey === `${pIdx}-${sIdx}` }"
                            @mouseenter="activeKey = `${pIdx}-${sIdx}`" @mouseleave="activeKey = null">
                            <wordTip :text="sent.en" :words="sent.words" @select="selectWord" />
                        </span>
                        <span v-if="sIdx < para.sentences.length - 1">&nbsp;</span>
                    </template>
                </div>

                <!-- 中文行 -->
                <div class="paragraph-item paragraph-zh">
                    <template v-for="(sent, sIdx) in para.sentences" :key="'en-' + sIdx">
                        <span class="sentence-item zh"
                            :class="{ active: activeKey === `${pIdx}-${sIdx}`, visible: showAllChinese, }">
                            {{ sent.zh }}
                        </span>
                    </template>
                </div>
            </template>
        </div>
        <div class="list-words">
            <template v-for="word in words">
                <wordCard :word="word"></wordCard>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.box-articles {
    display: flex;
    gap: 10px;

    .box-article {
        flex: 1;
    }

    .list-words {
        width: 350px;
    }
}

.box-article {
    padding: 10px;
    font-size: 16px;
    line-height: 1.8;

    .en {
        cursor: pointer;
        transition: all 0.6s ease-in-out;

        &:hover {
            background-color: #ffcf005d;
        }
    }

    .zh {
        color: var(--color-page-text);
        letter-spacing: 2px;
        opacity: 0.05;
        transition: all 0.6s ease-in-out;

        &.visible {
            opacity: 1;
        }

        &.active {
            opacity: 1;
            background-color: #ffcf005d;
        }
    }

    .title {
        margin-bottom: 20px;
        text-align: center;

        & * {
            font-size: 18px;
            font-weight: 700;
        }
    }

    .paragraph-item {
        text-indent: 18px;

        &.paragraph-zh {
            margin-bottom: 20px;
        }
    }
}

.list-words {
    max-height: 80vh;
    overflow-y: auto;
    padding: 10px;
    border-left: 1px solid #eee;
    display: flex;
    flex-direction: column;
    gap: 10px
}
</style>
