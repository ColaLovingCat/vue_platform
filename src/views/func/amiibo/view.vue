<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import * as db from './datas'
import * as extend from '@/commons/utils/extends'
import * as XLSX from 'xlsx'

// name
defineOptions({
    name: 'custom-name'
})

const datas: any = ref([])
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
    series: '',
    text: '',
})
const changeMark = ref(false)
const dataShow = computed(() => {
    let result: any[] = []
    switch (pageInfos.show) {
        case "items":
            result = [...pageInfos.items]
            if (searchInfos.series != '') {
                result = result.filter((a: any) => a.series == searchInfos.series)
            }
            if (searchInfos.text != '') {
                // result = datas.value.filter((a: any) => a.name.indexOf(searchInfos.text) > -1)
                datas.value.map((item: any) => {
                    if (item.name.indexOf(searchInfos.text) > -1) {
                        result.push({ ...item })
                    }
                })
            }
            break;
        default:
            result = [...pageInfos[pageInfos.show]]
            break;
    }

    return result
})

onMounted(async () => {
    const temps: any = await readExcel()
    pageInfos.items = [...db.items]
    pageInfos.villagers = [...temps.villagers]
    pageInfos.cars = [...temps.cars]
    pageInfos.sanrio = [...temps.sanrio]
    //
    const temp = extend.ExArray.uniqueSingle([{ value: 'All' }, ...db.items.filter((a: any) => a.series != '').map((a: any) => ({
        value: a.series
    }))], 'value')
    pageInfos.series = temp.map((a: string) => ({
        value: a, label: a
    }))
})

const readExcel = async () => {
    try {
        // 动态导入Excel文件
        const response = await fetch(new URL('/docs/datas/amiibos.xlsx', import.meta.url).href)
        const arrayBuffer = await response.arrayBuffer()

        // 解析Excel数据
        const data = new Uint8Array(arrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        // 获取第一个工作表的数据
        const villagers = XLSX.utils.sheet_to_json(workbook.Sheets["villagers"])
        const cars = XLSX.utils.sheet_to_json(workbook.Sheets["cars"])
        const sanrio = XLSX.utils.sheet_to_json(workbook.Sheets["sanrio"])

        return { villagers, cars, sanrio }
    } catch (error) {
        console.error('读取Excel文件失败:', error)
    }
    return {}
}

</script>

<template>
    <div class="sections">
        <div class="box-search">
            <div class="left">
                <div class="logo">
                    <img src="/docs/amiibo/comps/logo.png" alt="" srcset="">
                </div>
                <span>Total: {{ dataShow.length }}</span>
            </div>
            <div class="right">
                <a-radio-group v-model:value="pageInfos.show">
                    <a-radio-button value="items">Amiibo</a-radio-button>
                    <a-radio-button value="villagers">村民</a-radio-button>
                    <a-radio-button value="cars">房车</a-radio-button>
                    <a-radio-button value="sanrio">三丽鸥</a-radio-button>
                </a-radio-group>
                <a-select ref="select" v-model:value="searchInfos.series" style="width: 200px">
                    <a-select-option v-for="item in pageInfos.series" :value="item.value">{{ item.label
                        }}</a-select-option>
                </a-select>
                <a-input v-model:value="searchInfos.text" placeholder="search" style="width: 200px"
                    @change="changeMark = !changeMark" />
            </div>
        </div>
        <div class="list-amiibos" :class="`list-${pageInfos.show}`">
            <template v-for="amiibo in dataShow">
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
