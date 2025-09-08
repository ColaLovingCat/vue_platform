<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import articleView from '@/components/articles/view.vue'

// name
defineOptions({
    name: 'custom-name'
})

const articles: any = ref([])

const pageInfos = reactive({
    status: 'initial',
    currentArticle: {
        title: { en: '', zh: '' },
        contents: []
    } as any,
})

onMounted(async () => {
    const modules: any = import.meta.glob('./datas/*.json')

    const articlePromises = Object.keys(modules).map(async (path) => {
        const module = await modules[path]()
        return module.default
    })
    articles.value = await Promise.all(articlePromises)
})

const showArticle = (article: any) => {
    pageInfos.status = "open"
    pageInfos.currentArticle = article
}
</script>

<template>
    <div class="sections" :class="pageInfos.status">
        <div class="list-menus">
            <template v-for="(menu, index) in articles">
                <div class="menu-item" @click="showArticle(menu)">
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
        flex: 0;
        padding: 20px;
    }

    &.open {
        .list-menus {
            flex: unset;
            width: 250px;
        }

        .box-article {
            flex: 1;
        }
    }
}

.list-menus {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .menu-item {
        padding: 8px 12px;
        font-size: 18px;
        border-radius: 5px;
        background: #fff;
    }
}
</style>
