<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import { useRouter } from "vue-router";
const router = useRouter();
const pageGo = (path: string, query: any) => {
    router.push({
        path,
        query,
    });
};

// name
defineOptions({
    name: 'custom-name'
})

const pageInfos = reactive({
    tabs: [
        {
            name: '软件设计师',
            cover: 'ruanjian.png',
            path: '/study-ruanjian',
        },
        {
            name: 'Vue',
            cover: 'vue.jpeg',
            path: '/study-vue',
        },
        {
            name: 'TypeScript',
            cover: 'ts.png',
            path: '/study-ts',
        },
        {
            name: 'Python',
            cover: 'python.png',
            path: '/study-python',
        },
        {
            name: '算法',
            cover: 'suan.png',
            path: '/study-suan',
        },
        {
            name: 'unity',
            cover: 'suan.png',
            path: '/study-unity',
        },
    ],
})

onMounted(() => { })

const jump = (values: any) => {
    pageGo(values.path, {})
}
</script>

<template>
    <div class="sections">
        <div class="list-tabs">
            <template v-for="tab in pageInfos.tabs">
                <div class="tab-item" @click="jump(tab)">
                    <img :src="`/docs/study/covers/${tab.cover}`" alt="" srcset="">
                    <div class="item-infos">
                        <div class="item-name">{{ tab.name }}</div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.sections {
    display: flex;
    justify-content: center;
    align-items: center;
}

.list-tabs {
    padding: 5px;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;

    .tab-item {
        cursor: pointer;
        position: relative;
        flex: 1;
        max-width: 350px;
        height: 460px;
        text-align: center;
        border-radius: 5px;

        &:hover {
            box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
        }

        .item-infos {
            position: absolute;
            bottom: 0;
            padding: 10px 0;
            width: 100%;
            background: linear-gradient(to top, #000, #00000000);

            .item-name {
                color: #fff;
                font-size: 21px;
                font-weight: 700;
            }
        }
    }
}
</style>
