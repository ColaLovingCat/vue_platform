<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

import * as xlsx from '@/commons/utils/xlsx'
import * as extend from '@/commons/utils/extends'

// name
defineOptions({
    name: 'custom-name'
})

const pageInfos = reactive({
    series: [] as any[],
    show: 'items',
    //
    items: [] as any[],
    villagers: [] as any[],
    cars: [] as any[],
    sanrio: [] as any[],
})

const searchInfos = reactive({
    series: 'All',
    text: '',
    datas: [] as any[]
})
const handleSearch = () => {
    let result: any[] = []
    switch (pageInfos.show) {
        case "items":
            result = [...pageInfos.items]
            if (searchInfos.series != 'All') {
                result = result.filter((a: any) => a.series == searchInfos.series)
            }
            const searchText = searchInfos.text.trim().toLowerCase();
            if (searchText != '') {
                result = result.filter((item: any) =>
                    item.name.toLowerCase().includes(searchText)
                )
            }
            break;
        default:
            //@ts-ignore
            result = [...pageInfos[pageInfos.show]]
            break;
    }
    searchInfos.datas = [...result]
};

onMounted(async () => {
    const temps: any = await xlsx.readExcel('/docs/datas/amiibos.xlsx')
    pageInfos.items = [...temps.items]
    pageInfos.villagers = [...temps.villagers]
    pageInfos.cars = [...temps.cars]
    pageInfos.sanrio = [...temps.sanrio]
    //
    const temp = extend.ExArray.uniqueSingle([{ value: 'All' }, ...temps.items.filter((a: any) => a.series != '').map((a: any) => ({
        value: a.series
    }))], 'value')
    pageInfos.series = temp.map((a: string) => ({
        value: a, label: a
    }))
    //
    handleSearch()
})
</script>

<template>
    <div class="sections">
        <div class="box-search">
            <div class="left">
                <div class="logo">
                    <img src="/docs/amiibo/comps/logo.png" alt="" srcset="">
                </div>
                <span>Total: {{ searchInfos.datas.length }}</span>
            </div>
            <div class="right">
                <a-radio-group v-model:value="pageInfos.show" @change="handleSearch">
                    <a-radio-button value="items">Amiibo</a-radio-button>
                    <a-radio-button value="villagers">村民</a-radio-button>
                    <a-radio-button value="cars">房车</a-radio-button>
                    <a-radio-button value="sanrio">三丽鸥</a-radio-button>
                </a-radio-group>
                <a-select ref="select" v-model:value="searchInfos.series" style="width: 200px" @change="handleSearch">
                    <a-select-option v-for="item in pageInfos.series" :value="item.value">{{ item.label
                    }}</a-select-option>
                </a-select>
                <a-input v-model:value="searchInfos.text" placeholder="search" style="width: 200px"
                    @change="handleSearch" />
            </div>
        </div>
        <div class="list-amiibos" :class="`list-${pageInfos.show}`">
            <template v-for="amiibo in searchInfos.datas">
                <div class="amiibo-item">
                    <div class="item-infos">
                        <div class="item-name">{{ amiibo.name }}</div>
                        <div class="item-game">{{ amiibo.game }}</div>
                        <div class="item-tag">@{{ amiibo.series }}</div>
                    </div>
                    <div class="item-img">
                        <img :src="`/docs/amiibo/${pageInfos.show}/${amiibo.img}`" alt="" srcset="">
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import url(../com/search.scss);

.ant-radio-group {
    display: flex;
}

.sections {
    .box-search {
        color: #000;
        background: #fff;
    }

    .logo {
        width: 155px;
        height: 70px;
    }
}

.list-amiibos {
    height: calc(100vh - 150px);
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;

    &.list-items {
        .amiibo-item {
            padding: 10px;
            width: 200px;
            height: 200px;
            background: #fff;

            .item-infos {
                display: block;
            }
        }
    }

    &.list-villagers {
        .amiibo-item {
            width: 200px;
            height: 250px;
            box-shadow: unset;

            .item-img {
                width: 100%;
                height: 250px;
                top: 0;
                left: 0;
            }
        }
    }

    &.list-cars,
    &.list-sanrio {
        .amiibo-item {
            width: 250px;
            height: 165px;
            box-shadow: unset;

            .item-img {
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
        }
    }

    .amiibo-item {
        position: relative;
        border-radius: 8px;
        box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

        .item-infos {
            display: none;
        }

        .item-name {
            position: relative;
            z-index: 1;
            font-size: 18px;
            font-weight: 700;
        }

        .item-game {
            position: relative;
            z-index: 1;
        }

        .item-img {
            position: absolute;
            width: 180px;
            height: 180px;
            left: 10px;
            top: 10px;
            z-index: 0;
        }

        .item-tag {
            position: absolute;
            bottom: 5px;
            right: 10px;
            z-index: 1;
        }
    }
}
</style>
