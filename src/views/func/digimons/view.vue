<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'

import mons from './mons.vue'
import * as current from './datas.service'

const datas: any = ref([])

const pageInfos = reactive({
    levels: [] as any[],
    types: [] as any[],
    props: [] as any[],
})

const searchInfos = reactive({
    text: '' as any,
    level: undefined as string | undefined,
    type: undefined as string | undefined,
    prop: undefined as string | undefined,
    datas: [] as any[]
})

const handleSearch = () => {
    let result: any[] = datas.value

    if (searchInfos.level) {
        result = result.filter((item: any) => item.level == searchInfos.level)
    }
    if (searchInfos.type) {
        result = result.filter((item: any) => item.type == searchInfos.type)
    }
    if (searchInfos.prop) {
        result = result.filter((item: any) => item.prop == searchInfos.prop)
    }

    const searchText = String(searchInfos.text || '').trim().toLowerCase()
    if (searchText) {
        result = result.filter((item: any) =>
            String(item.cnName || '').toLowerCase().includes(searchText)
            || String(item.enName || '').toLowerCase().includes(searchText)
            || String(item.type || '').toLowerCase().includes(searchText)
            || String(item.desc || '').toLowerCase().includes(searchText)
        )
    }

    searchInfos.datas = [...result]
}

watch(
    () => [searchInfos.text, searchInfos.level, searchInfos.type, searchInfos.prop],
    handleSearch
)

onMounted(async () => {
    const db = await current.getDB()
    datas.value = [...db.items]
    pageInfos.levels = db.levels
    pageInfos.types = db.types
    pageInfos.props = db.props
    handleSearch()
})
</script>

<template>
    <div class="sections">
        <div class="box-search">
            <div class="left">
                <div class="logo">
                    <img src="/docs/digimon/comps/logo.svg" alt="DIGIMON">
                </div>
                <span>Total: {{ searchInfos.datas.length }}</span>
            </div>
            <div class="right">
                <a-select
                    v-model:value="searchInfos.level"
                    style="width: 130px"
                    placeholder="等级"
                    allow-clear
                    @change="handleSearch"
                >
                    <a-select-option v-for="item in pageInfos.levels" :key="item" :value="item">{{ item }}</a-select-option>
                </a-select>
                <a-select
                    v-model:value="searchInfos.type"
                    style="width: 130px"
                    placeholder="类型"
                    allow-clear
                    @change="handleSearch"
                >
                    <a-select-option v-for="item in pageInfos.types" :key="item" :value="item">{{ item }}</a-select-option>
                </a-select>
                <a-select
                    v-model:value="searchInfos.prop"
                    style="width: 110px"
                    placeholder="属性"
                    allow-clear
                    @change="handleSearch"
                >
                    <a-select-option v-for="item in pageInfos.props" :key="item" :value="item">{{ item }}</a-select-option>
                </a-select>
                <a-input
                    v-model:value="searchInfos.text"
                    style="width: 140px"
                    placeholder="search"
                    allow-clear
                    @change="handleSearch"
                />
            </div>
        </div>
        <div class="list-mons">
            <div v-for="mon in searchInfos.datas" :key="mon.no">
                <mons :data="mon"></mons>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import url(@/views/func/com/search.scss);

.sections {
    background:
        radial-gradient(circle at 12% 10%, rgba(255, 154, 26, 0.18), transparent 36%),
        radial-gradient(circle at 88% 80%, rgba(233, 82, 149, 0.16), transparent 42%),
        linear-gradient(180deg, #141821 0%, #1b2433 100%);
    background-size: 100% 100%;

    .logo {
        width: 215px;
        height: 70px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}

.list-mons {
    padding: 16px 0 30px;
    height: calc(100vh - 150px);
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 36px;
    row-gap: 32px;
}
</style>
