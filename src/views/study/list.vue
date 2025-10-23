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
            path: '/study-ruanjian',
        },
        {
            name: 'Vue',
            path: '/study-vue',
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
                    <div class="item-icon"></div>
                    <div class="item-name">{{ tab.name }}</div>
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
        flex: 1;
        padding: 5px;
        max-width: 350px;
        height: 460px;
        text-align: center;
        border-radius: 5px;

        &:hover {
            box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
        }
    }
}
</style>
