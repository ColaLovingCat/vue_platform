<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import articleView from '@/components/articles/view.vue'

import * as XLSX from 'xlsx'

// name
defineOptions({
    name: 'custom-name'
})

const articles: any = ref([])

const pageInfos = reactive({
    status: 'initial',
    currentIndex: -1,
    currentArticle: {
        title: { no: 1, en: '', zh: '', words: [] },
        contents: []
    } as any,
})

onMounted(async () => {
    let datas = await readExcel();
    Object.keys(datas).map((key: string) => {
        if (key.indexOf("_contents") > -1) {
            const no = key.split("_")[0]
            const contents = datas[key]
            const words = datas[no + '_words']
            // 处理文章本体
            const titleRow = contents.find((row: any) => row.type === "title");
            let article = {
                title: {
                    no: titleRow.no,
                    en: titleRow.en,
                    zh: titleRow.zh,
                    words: []
                },
                contents: [] as any[]
            }
            const titleWords = words.filter((word: any) => word.no === titleRow.no);
            if (titleWords.length > 0) {
                article.title.words = titleWords.map((a: any) => ({
                    word: a.word,
                    isPhrase: a.isPhrase == 1,
                    matchs: a.matchs.split("//"),
                    phrase: a.phrase,
                }))
            }
            //
            const sentenceRows = contents.filter((row: any) => row.type === "sentence");
            const paragraphMap = new Map<number, any[]>();
            sentenceRows.forEach((row: any) => {
                const paraIndex = row.paragrah;
                const sentence: any = {
                    en: row.en,
                    zh: row.zh,
                    words: []
                };
                const sentWords = words.filter((word: any) => word.no === row.no);
                if (sentWords.length > 0) {
                    sentence.words = sentWords.map((a: any) => ({
                        word: a.word,
                        isPhrase: a.isPhrase == 1,
                        matchs: a.matchs.split("//"),
                        phrase: a.phrase,
                    }))
                }

                if (!paragraphMap.has(paraIndex)) {
                    paragraphMap.set(paraIndex, []);
                }
                paragraphMap.get(paraIndex)!.push(sentence);
            });
            paragraphMap.forEach(sentences => {
                article.contents.push({ sentences });
            });
            //
            articles.value.push(article)
        }
    })
    //
    showArticle(articles.value[0], 0)
})

const readExcel = async () => {
    try {
        // 动态导入Excel文件
        const response = await fetch(new URL('/docs/datas/articles.xlsx', import.meta.url).href)
        const arrayBuffer = await response.arrayBuffer()

        // 解析Excel数据
        const data = new Uint8Array(arrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        // 获取第一个工作表的数据
        const result: any = {}
        workbook.SheetNames.map((sheet: any) => {
            result[sheet] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        })

        return result
    } catch (error) {
        console.error('读取Excel文件失败:', error)
    }
    return {}
}

const showArticle = (article: any, index: number) => {
    pageInfos.status = "open"
    pageInfos.currentIndex = index
    pageInfos.currentArticle = article
}
</script>

<template>
    <div class="sections" :class="pageInfos.status">
        <div class="list-menus">
            <template v-for="(menu, index) in articles">
                <div class="menu-item" :class="{ active: pageInfos.currentIndex == index }"
                    @click="showArticle(menu, index)">
                    <div class="txts-nowrap">{{ (index + 1) }}. {{ menu.title.en }}</div>
                </div>
            </template>
        </div>
        <div class="box-article">
            <articleView :article="pageInfos.currentArticle"></articleView>
        </div>
    </div>
</template>

<style scoped lang="scss">
.sections {
    display: flex;

    .list-menus {
        flex: 1;
    }

    .box-article {
        display: none;
    }

    &.open {
        .list-menus {
            flex: unset;
            width: 300px;
        }

        .box-article {
            display: block;
            flex: 1;
        }
    }
}

.list-menus {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .menu-item {
        cursor: pointer;
        padding: 8px 12px;
        font-size: 18px;
        border-radius: 5px;
        background: var(--color-page-bg);

        &.active {
            color: #fff;
            background: #007bc0;
        }
    }
}
</style>
