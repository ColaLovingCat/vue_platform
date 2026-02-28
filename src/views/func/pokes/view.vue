<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'

import pokes from './pokes.vue'
import typeView from './types.vue'

import * as current from './datas.service'

const datas: any = ref([])
const changeMark: any = ref(false)

const pageInfos = reactive({
    activeAniver: false,
    gens: [] as any[],
    natures: [] as any[],
    timelines: [] as any[],
    tags:[
        {value: 'mega', title: '超进化'},
        {value: 'dy', title: '超极巨化'},
    ],
})

const searchInfos = reactive({
    text: '' as any,
    gen: '',
    tag:'',
    datas: [] as any[]
})
const handleSearch = () => {
    let result: any[] = datas.value

    // 按世代过滤
    if (searchInfos.gen && searchInfos.gen != '') {
        const genInfos = pageInfos.gens.find((item: any) => item.name == searchInfos.gen)
        if (genInfos && genInfos.datas) {
            result = datas.value.filter((poke: any) => {
                return genInfos.datas.find((genPoke: any) => genPoke.totalNo == poke.no)
            }
            )
        }
    }

    // 按标签过滤
    if (searchInfos.tag && searchInfos.tag != '') {
        result = result.filter((poke: any) => poke.shapes && poke.shapes.find((shape: any) => shape.shapeCode == searchInfos.tag))
    }

    // 执行搜索逻辑
    const searchText = searchInfos.text.trim().toLowerCase();
    if (searchText) {
        result = result.filter((item: any) =>
            item.cnName.toLowerCase().includes(searchText)
        )
    }

    searchInfos.datas = [...result]
};

onMounted(async () => {
    const db = await current.getDB()
    datas.value = [...db.pokes]
    handleSearch()
    //
    pageInfos.natures = [...db.natures]
    pageInfos.gens = db.gens
})

// 属性
const typeModal = ref(false)
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
                <span>Total: {{ searchInfos.datas.length }}</span>
            </div>
            <div class="right">
                <a-switch v-model:checked="pageInfos.activeAniver" />
                <a-button type="primary" @click="showModal('timeline', {})">游戏</a-button>
                <a-button type="primary" @click="showModal('', {})">招式</a-button>
                <a-button type="primary" @click="showModal('', {})">特性</a-button>
                <a-button type="primary" @click="showModal('', {})">道具</a-button>
                <a-button type="primary" @click="showModal('', {})">异常状态</a-button>
                <a-button type="primary" @click="showModal('', {})">球种</a-button>
                <a-button type="primary" @click="showModal('nature', {})">性格</a-button>
                <a-button type="primary" @click="showModal('type', {})">属性</a-button>

                <a-select ref="select" v-model:value="searchInfos.tag" style="width: 150px;" @change="handleSearch"
                    allow-clear>
                    <a-select-option v-for="item in pageInfos.tags" :value="item.value">{{ item.title }}</a-select-option>
                </a-select>

                <a-select ref="select" v-model:value="searchInfos.gen" style="width: 200px;" @change="handleSearch"
                    allow-clear>
                    <a-select-option v-for="item in pageInfos.gens" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>

                <a-input v-model:value="searchInfos.text" style="width: 200px;" placeholder="search" allow-clear
                    @change="handleSearch" />
            </div>
        </div>
        <div class="list-pokes">
            <div v-for="(poke) in searchInfos.datas" :key="poke.no">
                <pokes :active-aniver="pageInfos.activeAniver" :data="poke" :change-mark="changeMark"></pokes>
            </div>
        </div>

    </div>

    <!-- 属性 -->
    <a-modal v-model:open="typeModal" width="990px" centered :closable="false" :header="null" :footer="null">
        <typeView></typeView>
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
