<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'

import pokes from './pokes.vue'
import * as xlsx from '@/commons/utils/xlsx'

const datas: any = ref([])
const changeMark: any = ref(false)

const pageInfos = reactive({
    types: [] as any[],
    natures: [] as any[],
    timelines: [] as any[],
})

const searchInfos = reactive({
    text: '' as any,
    datas: [] as any[]
})
const handleSearch = () => {
    // 执行搜索逻辑
    const searchText = searchInfos.text.trim().toLowerCase();

    const result = searchText
        ? datas.value.filter((item: any) =>
            item.cnName.toLowerCase().includes(searchText)
        )
        : datas.value;
    searchInfos.datas = [...result]
};

onMounted(async () => {
    let temps: any = await xlsx.readExcel('/docs/datas/pokes.xlsx')
    const { pokes, shapes, natures, types } = temps
    shapes.map((item: any) => {
        let temp = pokes.find((a: any) => a.no == item.no)
        if (temp) {
            if (temp.shapes) {
                temp.shapes.push(item)
            } else {
                temp.shapes = [item]
            }
        }
    })
    //
    datas.value = [...pokes]
    handleSearch()
    //
    pageInfos.natures = [...natures]
    pageInfos.types = [...types]
})

// 属性
const typeModal = ref(false)
const getStyle = (values: any) => {
    let result = {
        color: "#fff",
        background: '#c4cecf4d'
    }
    switch (values) {
        case 0: {
            result = {
                color: "#fff",
                background: '#5b5b5b'
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
// 性格
const natureModal = ref(false)
// 游戏列表
const timelineModal = ref(false)

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
    <div class="sections">
        <div class="box-search">
            <div class="left">
                <div class="logo">
                    <img src="/docs/pokemons/comps/logo.png" alt="" srcset="">
                </div>
                <span>Total: {{ datas.length }}</span>
            </div>
            <div class="right">
                <a-button type="primary" @click="showModal('timeline', {})">游戏</a-button>
                <a-button type="primary" @click="showModal('', {})">招式</a-button>
                <a-button type="primary" @click="showModal('', {})">特性</a-button>
                <a-button type="primary" @click="showModal('', {})">道具</a-button>
                <a-button type="primary" @click="showModal('', {})">异常状态</a-button>
                <a-button type="primary" @click="showModal('', {})">球种</a-button>
                <a-button type="primary" @click="showModal('nature', {})">性格</a-button>
                <a-button type="primary" @click="showModal('type', {})">属性</a-button>
                <a-input v-model:value="searchInfos.text" placeholder="search" allow-clear @change="handleSearch" />
            </div>
        </div>
        <div class="list-pokes">
            <div v-for="(poke) in searchInfos.datas" :key="poke.no">
                <pokes :data="poke" :change-mark="changeMark"></pokes>
            </div>
        </div>

    </div>

    <!-- 属性 -->
    <a-modal v-model:open="typeModal" width="990px" centered :closable="false" :header="null" :footer="null">
        <div class="box-types">
            <table class="table-types">
                <thead>
                    <tr>
                        <th></th>
                        <th v-for="column in pageInfos.types" class="th-type">
                            <img class="td-type item-type" v-bind:src="'/docs/pokemons/types/' + column.type + '.png'">
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in pageInfos.types">
                        <td>
                            <img class="td-type item-type" v-bind:src="'/docs/pokemons/types/' + row.type + '.png'">
                        </td>
                        <td v-for="item in pageInfos.types" class="td-rate">
                            <div class="rate-item" :style="getStyle(row[item.type])"> {{ row[item.type] }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </a-modal>

    <!-- 性格 -->
    <a-modal v-model:open="natureModal" width="600px" centered :closable="false" :header="null" :footer="null">
        <div class="list-natures">
            <table class="table-natures" style="width: 100%;">
                <tbody>
                    <tr v-for="item in pageInfos.natures">
                        <td>{{ item.nature }}</td>
                        <td>+{{ item.plus }}</td>
                        <td>-{{ item.down }}</td>
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
                <a-timeline-item v-for="game in pageInfos.timelines">
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
@import url(../com/search.scss);

.sections {
    background: url(/docs/pokemons/comps/bg.jpg);
    background-size: 100% 100%;

    .logo {
        width: 215px;
        height: 70px;
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
