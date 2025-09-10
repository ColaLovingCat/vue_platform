<script lang="ts" setup>
import { defineProps, onMounted, ref, type Ref } from "vue";

// import { wordDic } from "./words";
import type { Token, Word, WordMatch, WordTip } from "./types";

import * as XLSX from 'xlsx'

const props = defineProps<{
    text: string;
    words: WordMatch[];
}>();

const emit = defineEmits<{
    (e: "select", payload: any): void;
}>();

const wordDic: Ref<Word[]> = ref([])

onMounted(async () => {
    let temps: any = await readExcel()
    const wordMap: Record<string, Word> = {};
    temps.words.forEach((row: any) => {
        const word = row.word.trim();
        if (!wordMap[word]) {
            wordMap[word] = {
                word,
                root: row.root || "",
                tense: row.tense ? row.tense.split("//").map((t: string) => t.trim()) : [],
                related: row.related ? row.related.split("//").map((r: string) => r.trim()) : [],
                means: []
            };
        }

        const mean: any = {
            class: row.class,
            mean: row.mean,
            ranges: row.ranges.split("//"),
            examples: row.examples ? row.examples.split("//").map((a: string) => ({
                content: a.split("→")[0],
                mean: a.split("→")[1],
            })) : [],
            phrases: row.phrases ? row.phrases.split("//").map((a: string) => ({
                content: a.split("→")[0],
                mean: a.split("→")[1],
            })) : []
        };

        wordMap[word].means.push(mean);
    });
    wordDic.value = Object.values(wordMap)
})
const readExcel = async () => {
    try {
        // 动态导入Excel文件
        const response = await fetch(new URL('/docs/datas/words.xlsx', import.meta.url).href)
        const arrayBuffer = await response.arrayBuffer()

        // 解析Excel数据
        const data = new Uint8Array(arrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        // 获取第一个工作表的数据
        const words = XLSX.utils.sheet_to_json(workbook.Sheets['words'])

        return { words }
    } catch (error) {
        console.error('读取Excel文件失败:', error)
    }
    return {}
}

// tokenize，支持普通短语/单词和占位符短语 
function tokenize(text: string): Token[] {
    if (!wordDic.value.length || !props.words?.length) return [{ type: "text", text }];

    let remaining = text;

    // 替换占位符
    props.words.forEach((w, idx) => {
        const regex = new RegExp(w.word, "gi");
        remaining = remaining.replace(regex, `@@WORD_${idx}@@`);
    });

    const tokens: Token[] = [];
    const parts = remaining.split(/(@@WORD_\d+@@)/);

    parts.forEach(part => {
        const match = part.match(/@@WORD_(\d+)@@/);
        if (match) {
            const wordInfo = props.words[parseInt(match[1], 10)]

            const matchs: any[] = wordInfo.matchs
                .map((m) => wordDic.value.find((a: any) => a.word.toLowerCase() === m.toLowerCase()))
                .filter((a) => a)

            const tip: WordTip = {
                word: wordInfo.word,
                isPhrase: wordInfo.isPhrase,
                means: [],
            }

            if (wordInfo.isPhrase) {
                matchs.forEach((item) => {
                    item.means.forEach((m: any) => {
                        m.phrases.forEach((p: any) => {
                            const matchWord = wordInfo.phrase ?? wordInfo.word
                            if (p.content.toLowerCase() === matchWord.toLowerCase()) {
                                tip.word = p.content;
                                tip.means.push({ mean: p.mean });
                            }
                        });
                    });
                });
            } else if (matchs.length) {
                tip.word = matchs[0].word;
                tip.means = matchs[0].means;
            } else {
                // ❌ 没找到词典里的单词，仍然高亮
                tip.word = wordInfo.word;
                tip.means = [{ mean: '', ranges: ["未收录"] }];
                tip.notFound = true;
            }

            tokens.push({
                type: "match",
                text: wordInfo.word,
                matchs,
                tip,
            });
        } else if (part.length) {
            tokens.push({ type: "text", text: part });
        }
    });

    return tokens;
}
// 渲染提示信息
function renderTip(tip: WordTip | undefined): string {
    if (!tip) return "";

    const lines: string[] = [`<b>${tip.word}</b>`];
    if (tip.isPhrase) {
        lines.push(tip.means[0].mean);
    } else {
        tip.means?.forEach((m: any) => {
            lines.push(`${m.class || ""}${m.mean} [${m.ranges || ""}]`);
        });
    }
    return lines.join("<br>");
}

const clickItem = (tk: any) => {
    tk.matchs.forEach((word: Word) => emit('select', word));
}
</script>

<template>
    <span>
        <template v-for="(tk, i) in tokenize(props.text)" :key="i">
            <a-popover v-if="tk.type === 'match'" placement="top" trigger="hover">
                <template #content>
                    <!-- <pre style="margin: 0; white-space: pre-wrap">{{ renderTip(tk.tip) }}</pre> -->
                    <pre style="margin: 0; white-space: pre-wrap" v-html="renderTip(tk.tip)"></pre>
                </template>
                <!-- 点击时触发 select -->
                <span :class="tk.tip?.notFound ? 'txt-none' : 'txt-highlight'" @click="clickItem(tk)">
                    {{ tk.text }}
                </span>
            </a-popover>
            <span v-else>{{ tk.text }}</span>
        </template>
    </span>
</template>

<style scoped lang="scss">
.txt-highlight {
    color: #1890ff;
    border-bottom: 1px solid #1890ff;
    cursor: help;
}

.txt-none {
    color: var(--color-page-text);
    border-bottom: 1px dashed var(--color-page-text);
}
</style>
