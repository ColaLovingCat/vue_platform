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
    tags: [
        { value: 'mega', title: '超进化' },
        { value: 'dy', title: '超极巨化' },
    ],
})

const searchInfos = reactive({
    text: '' as any,
    gen: '',
    tag: '',
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
    //
    pageInfos.timelines = db.timelines
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

                <a-select ref="select" v-model:value="searchInfos.tag" style="width: 100px;" @change="handleSearch"
                    allow-clear>
                    <a-select-option v-for="item in pageInfos.tags" :value="item.value">{{ item.title
                        }}</a-select-option>
                </a-select>

                <a-select ref="select" v-model:value="searchInfos.gen" style="width: 100px;" @change="handleSearch"
                    allow-clear>
                    <a-select-option v-for="item in pageInfos.gens" :value="item.name">{{ item.name }}</a-select-option>
                </a-select>

                <a-input v-model:value="searchInfos.text" style="width: 100px;" placeholder="search" allow-clear
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

    <!-- 游戏列表 -->
    <a-modal v-model:open="timelineModal" width="1300px" centered :closable="false" :header="null" :footer="null">
        <div class="list-games">
            <template v-for="game in pageInfos.timelines">
                <div class="game-item" :class="['item-' + game.platform]">
                    <div class="cover">
                        <img :src="`/docs/pokemons/covers/${game.cover}`" alt="" srcset="">
                    </div>
                </div>
            </template>
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

.list-games {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .game-item {

        &.item-GB,
        &.item-GBC {
            height: 200px;
        }

        &.item-GBA {
            height: 140px;
        }

        &.item-NDS,
        &.item-3DS {
            height: 175px;
        }

        &.item-Switch,
        &.item-Switch2 {
            height: 250px;
        }
    }
}

.game-item {
    position: relative;
    margin: 20px 0;
    transform: perspective(1200px) rotateY(-15deg) rotateX(5deg) translateZ(20px);
    transform-style: preserve-3d;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover {
        transform: perspective(1200px) rotateY(-12deg) rotateX(3deg) translateZ(30px) translateY(-8px);

        &::before {
            background: linear-gradient(105deg, #5a5a5a, #8a8a8a, #aaaaaa);
        }
    }

    &::before {
        content: '';
        position: absolute;
        top: 4px;
        left: -8px;
        width: 10px;
        height: calc(100% + 5px);
        background: linear-gradient(105deg,
                #4a4a4a 0%,
                #7a7a7a 30%,
                #9a9a9a 60%,
                #7a7a7a 100%);
        transform: rotateY(50deg) skewY(-2deg);
        transform-origin: right;
        border-radius: 6px 0 0 6px;
        box-shadow:
            -10px 0 15px rgba(0, 0, 0, 0.3),
            inset -2px 0 8px rgba(0, 0, 0, 0.4),
            inset 2px 2px 8px rgba(255, 255, 255, 0.2);
        z-index: 1;
    }

    &::after {
        content: '';
        position: absolute;
        bottom: -13px;
        left: -5px;
        width: calc(100% - 3px);
        height: 12px;
        background: linear-gradient(180deg,
                #8a8a8a 0%,
                #5a5a5a 30%,
                #3a3a3a 100%);
        transform: rotateX(45deg) skewX(-2deg);
        transform-origin: top;
        border-radius: 0 0 6px 6px;
        box-shadow:
            5px 5px 10px rgba(0, 0, 0, 0.3),
            inset 0 -2px 4px rgba(0, 0, 0, 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.1);
        z-index: 0;
    }

    .cover {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;

        &::after {
            content: '';
            position: absolute;
            top: 5px;
            right: -2px;
            width: 4px;
            height: calc(100% - 10px);
            background: linear-gradient(to right,
                    rgba(255, 255, 255, 0.2),
                    rgba(255, 255, 255, 0.5),
                    rgba(255, 255, 255, 0.1));
            border-radius: 0 2px 2px 0;
            z-index: 3;
        }
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px 2px 8px 2px;
        position: relative;
        z-index: 2;
        box-shadow:
            10px 15px 20px -5px rgba(0, 0, 0, 0.4),
            inset 0 0 0 1px rgba(255, 255, 255, 0.3),
            inset 0 0 15px rgba(255, 255, 255, 0.2);
    }
}
</style>
