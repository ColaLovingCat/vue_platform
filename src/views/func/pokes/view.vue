<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'

import * as XLSX from 'xlsx'

import pokes from './pokes.vue'

onMounted(async () => {
    let temps: any = await readExcel()
    console.log('Testing: ', temps);
    datas.value = [...temps.pokes]
    // types.value = [...db.types]
    // natures.value = [...db.natures]
    // timelines.value = [...db.timelines]
})

const readExcel = async () => {
    try {
        // 动态导入Excel文件
        const response = await fetch(new URL('./datas.xlsx', import.meta.url).href)
        const arrayBuffer = await response.arrayBuffer()

        // 解析Excel数据
        const data = new Uint8Array(arrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })

        // 获取第一个工作表的数据
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const pokes = XLSX.utils.sheet_to_json(worksheet)

        return { pokes }
    } catch (error) {
        console.error('读取Excel文件失败:', error)
    }
    return {}
}

const searchInfos = reactive({
    text: '',
})

const datas: any = ref([])
const changeMark: any = ref(false)
const dataShow = computed(() => {
    let result: any = []
    if (searchInfos.text != '') {
        datas.value.map((item: any) => {
            if (item.name.indexOf(searchInfos.text) > -1) {
                result.push({ ...item })
            }
        })
    } else {
        result = [...datas.value]
    }
    return result
})

const typeModal = ref(false)
const types: any = ref([])
const getStyle = (values: any) => {
    let result = {
        color: "#fff",
        background: '#c4cecf4d'
    }
    switch (values) {
        case 0: {
            result = {
                color: "#fff",
                background: '#9ca3af'
            }
            break;
        }
        case 0.5: {
            result = {
                color: "#fff",
                background: '#ef4444'
            }
            break;
        }
        case 2: {
            result = {
                color: "#fff",
                background: '#22c55e'
            }
            break;
        }
    }
    return result
}

const natureModal = ref(false)
const natures: any = ref([])

const timelineModal = ref(false)
const timelines: any = ref([])

const showModal = (action: string, values: any) => {
    switch (action) {
        case 'type': {
            typeModal.value = true
            break
        }
        case 'nature': {
            natureModal.value = true
            break
        }
        case 'timeline': {
            timelineModal.value = true
            break
        }
    }
}
</script>

<template>
    <div class="contents">
        <div class="box-search">
            <div class="logo">
                <img src="/docs/pokemons/systems/logo.png" alt="" srcset="">
            </div>
            <div class="left">
                Total: {{ datas.length }}
            </div>
            <div class="right">
                <a-button type="primary" @click="showModal('timeline', {})">游戏</a-button>
                <a-button type="primary" @click="showModal('nature', {})">招式</a-button>
                <a-button type="primary" @click="showModal('nature', {})">特性</a-button>
                <a-button type="primary" @click="showModal('nature', {})">道具</a-button>
                <a-button type="primary" @click="showModal('nature', {})">异常状态</a-button>
                <a-button type="primary" @click="showModal('nature', {})">球种</a-button>
                <a-button type="primary" @click="showModal('nature', {})">性格</a-button>
                <a-button type="primary" @click="showModal('type', {})">属性</a-button>
                <a-input v-model:value="searchInfos.text" placeholder="search" @change="changeMark = !changeMark" />
            </div>
        </div>
        <div class="list-pokes">
            <div v-for="(poke) in dataShow">
                <pokes :data="poke" :change-mark="changeMark"></pokes>
            </div>
        </div>

    </div>

    <a-modal v-model:open="typeModal" width="990px" centered :closable="false" :header="null" :footer="null">
        <div class="box-types">
            <table class="table-types">
                <thead>
                    <tr>
                        <th></th>
                        <th v-for="column in types" class="th-type">
                            <img class="td-type item-type" v-bind:src="'/docs/pokemons/types/' + column.type + '.png'">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in types">
                        <td>
                            <img class="td-type item-type" v-bind:src="'/docs/pokemons/types/' + row.type + '.png'">
                        </td>
                        <td v-for="item in row.list" class="td-rate">
                            <div class="rate-item" :style="getStyle(item.rate)"> {{ item.rate }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </a-modal>

    <a-modal v-model:open="natureModal" width="600px" centered :closable="false" :header="null" :footer="null">
        <div class="list-natures">
            <table class="table-natures">
                <tbody>
                    <tr v-for="item in natures">
                        <td>{{ item.name }}</td>
                        <td>{{ item.plus }}</td>
                        <td>{{ item.down }}</td>
                        <td>{{ item.like }}</td>
                        <td>{{ item.dislike }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </a-modal>

    <a-modal v-model:open="timelineModal" width="600px" centered :closable="false" :header="null" :footer="null">
        <div class="box-timelines">
            <a-timeline mode="alternate">
                <a-timeline-item v-for="game in timelines">
                    <div class="game-item">
                        <div class="item-year">
                            {{ game.year }}
                        </div>
                        <div class="item-name">
                            {{ game.name }}
                        </div>
                        <div class="item-logo">
                            <img :src="`/docs/pokemons/covers/${game.cover}`" alt="" srcset="">
                        </div>
                    </div>
                </a-timeline-item>
            </a-timeline>
        </div>
    </a-modal>
</template>

<style scoped lang="scss">
.contents {
    background: url(/docs/pokemons/systems/bg.jpg);
    background-size: 100% 100%;
}

.logo {
    width: 215px;
    height: 70px;
}

.box-search {
    margin-bottom: 20px;
    padding: 0 20px;
    height: 40px;
    color: #fff;
    background: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
        font-size: 18px;
        font-weight: 700;
    }

    .right {
        display: flex;
        column-gap: 15px;
    }
}

.list-pokes {
    padding: 10px 0;
    height: calc(100vh - 150px);
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 45px;
    row-gap: 35px;
}

.table-types {
    background: #0000008d;

    .th-type {
        padding: 0 5px;
    }

    .td-type {
        width: 40px;
        height: 40px;
    }

    .rate-item {
        width: 30px;
        height: 30px;
        margin: 0 auto;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
    }
}

.table-natures {
    td {
        padding: 5px 10px;
    }
}

.box-timelines {
    height: calc(100vh - 100px);
    overflow: auto;
    padding: 10px 20px;
}
</style>
