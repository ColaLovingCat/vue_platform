<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'

import pokes from './pokes.vue'
import typeView from './types.vue'

import mapView from './map.vue'

import * as current from './datas.service'

const datas: any = ref([])
const changeMark: any = ref(false)

const pageInfos = reactive({
    activeAniver: false,
    gens: [] as any[],
    natures: [] as any[],
    timelines: [] as any[],
    balls: [] as any[],
    tags: [] as any[],
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
        switch (searchInfos.tag) {
            case 'dy':
            case 'mega': {
                result = result.filter((poke: any) => poke.shapes && poke.shapes.find((shape: any) => shape.shapeCode == searchInfos.tag))
                break;
            }

            default:
                result = result.filter((poke: any) => poke.tags && poke.tags == searchInfos.tag)
                break;
        }
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
    pageInfos.balls = db.balls
    //
    pageInfos.tags = [
        { value: 'mega', title: '超进化' },
        { value: 'dy', title: '超极巨化' },
    ]
    const uniqueTags = [...new Set(db.pokes.map((a: any) => a.tags))]
    for (let index = 0; index < uniqueTags.length; index++) {
        const tag = uniqueTags[index];
        if (tag && tag != '')
            pageInfos.tags.push({
                value: tag, title: tag
            })
    }
})

// 属性
const typeModal = ref(false)
// 性格
const natureModal = ref(false)
const getNatureIcon = (nature: any) => {
    const iconMap = {
        '勇敢': '🛡️',
        '固执': '⚔️',
        '胆小': '🏃',
        '急躁': '🔥',
        '温和': '🌸',
        '自大': '👑',
        '冷静': '❄️',
        '马虎': '🎭'
    }
    return iconMap[nature] || '✨'
}
// 游戏列表
const timelineModal = ref(false)
//
const mapModal = ref(false)
const mapCode = ref('Kanto')
// 
const ballModal = ref(false)

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
                <a-button type="primary" @click="mapModal = true">地图</a-button>
                <a-button type="primary" @click="ballModal = true">球种</a-button>
                <a-button type="primary" @click="showModal('nature', {})">性格</a-button>
                <a-button type="primary" @click="showModal('type', {})">属性</a-button>

                <a-select ref="select" v-model:value="searchInfos.tag" style="width: 150px;" @change="handleSearch"
                    allow-clear>
                    <a-select-option v-for="item in pageInfos.tags" :value="item.value">
                        {{ item.title }}
                    </a-select-option>
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
        <table class="table-natures" style="width: 100%;">
            <tbody>
                <tr v-for="item in pageInfos.natures" :key="item.nature">
                    <td :data-nature="item.nature">
                        <span class="nature-icon">{{ getNatureIcon(item.nature) }}</span>
                        {{ item.nature }}
                    </td>
                    <td class="stat-plus">{{ item.plus }}</td>
                    <td class="stat-minus">{{ item.down }}</td>
                    <td class="flavor-like">{{ item.like }}</td>
                    <td class="flavor-dislike">{{ item.dislike }}</td>
                </tr>
            </tbody>
        </table>
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

    <a-modal v-model:open="mapModal" width="1250px" centered :closable="false" :header="null" :footer="null">
        <mapView :area="mapCode"></mapView>
        <div class="list-maps">
            <template v-for="area in pageInfos.gens">
                <div class="map-item" v-if="area.areaCode" :class="area.areaCode == mapCode ? 'active' : ''"
                    @click="mapCode = area.areaCode" :title="area.name"></div>
            </template>
        </div>
    </a-modal>

    <a-modal v-model:open="ballModal" width="1300px" centered :closable="false" :header="null" :footer="null">
        <div class="pokeball-grid">
            <div class="list-balls">
                <div v-for="ball in pageInfos.balls" :key="ball.id" class="pokeball-item" :data-type="ball.type || ''">
                    <div class="pokeball-image">
                        <img :src="`/docs/pokemons/balls/${ball.icon}`" :alt="ball.name">
                        <div class="pokeball-effect"></div>
                        <span class="pokeball-type">{{ ball.category }}</span>
                    </div>

                    <div class="pokeball-info">
                        <h3 class="pokeball-name">{{ ball.name }}</h3>
                        <p class="pokeball-description">{{ ball.desc }}</p>
                        <div class="pokeball-stats" v-if="ball.catchRate">
                            <span class="stat-label">捕获率</span>
                            <span class="stat-value">{{ ball.catchRate }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a-modal>
</template>

<style scoped lang="scss">
@import url(@/views/func/com/search.scss);

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
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
    font-family: 'Segoe UI', Roboto, sans-serif;

    // 行样式 - 卡片效果
    tbody tr {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease;

        &:hover {
            box-shadow: 0 8px 16px rgba(255, 77, 77, 0.15);
            transform: translateY(-2px);
        }
    }

    // 单元格通用样式
    td {
        padding: 5px 20px;
        border: none;
        color: #333;

        // 第一个单元格 - 性格名称
        &:first-child {
            font-weight: 700;
            font-size: 1.1rem;
            color: #1a1a1a;
            border-radius: 12px 0 0 12px;
            background: linear-gradient(135deg, #fff5f5, white);
            position: relative;
        }

        // 加成列
        &:nth-child(2) {
            background: linear-gradient(135deg, #f1f8e9, white);
            font-weight: 700;
            color: #2e7d32;
            text-align: center;

            &::before {
                content: '↑';
                margin-right: 4px;
                font-weight: bold;
            }
        }

        // 降低列
        &:nth-child(3) {
            background: linear-gradient(135deg, #ffebee, white);
            font-weight: 700;
            color: #c62828;
            text-align: center;

            &::before {
                content: '↓';
                margin-right: 4px;
                font-weight: bold;
            }
        }

        // 喜好口味列
        &:nth-child(4) {
            background: linear-gradient(135deg, #e3f2fd, white);
            color: #1565c0;

            &::before {
                content: '🍬';
                margin-right: 8px;
                opacity: 0.8;
            }
        }

        // 讨厌口味列
        &:nth-child(5) {
            background: linear-gradient(135deg, #fce4ec, white);
            color: #880e4f;
            border-radius: 0 12px 12px 0;

            &::before {
                content: '🌿';
                margin-right: 8px;
                opacity: 0.8;
            }
        }
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

/* 网格布局 */
.pokeball-grid {
    height: calc(100vh - 400px);
    overflow-y: auto;

    .list-balls {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .pokeball-item {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
        position: relative;
        display: flex;

        &:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 30px rgba(255, 62, 62, 0.2);

            .pokeball-image img {
                transform: scale(1.1) rotate(5deg);
            }

            .pokeball-name::after {
                width: 100%;
            }
        }
    }

    .pokeball-image {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        padding: 30px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
        border-right: 3px solid #ff3e3e;

        img {
            width: 80px;
            height: 80px;
            object-fit: contain;
            transition: transform 0.3s ease;
            filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2));
        }

        .pokeball-effect {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 60%);
            pointer-events: none;
        }

        .pokeball-type {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 62, 62, 0.9);
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            z-index: 1;
        }
    }

    .pokeball-info {
        padding: 10px;
        background: white;

        .pokeball-name {
            margin: 0 0 10px 0;
            font-size: 1.2rem;
            color: #333;
            font-weight: 600;
            position: relative;
            display: inline-block;

            &::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 40px;
                height: 3px;
                background: #ff3e3e;
                border-radius: 2px;
                transition: width 0.3s ease;
            }
        }

        .pokeball-description {
            margin: 5px 0 0 0;
            color: #666;
            line-height: 1.6;
            font-size: 0.95rem;
        }
    }
}

/* 不同精灵球类型的特殊样式 */
.pokeball-item[data-type="master"] .pokeball-image {
    background: linear-gradient(135deg, #ffd700, #ffb347);
}

.pokeball-item[data-type="great"] .pokeball-image {
    background: linear-gradient(135deg, #4169e1, #1e90ff);
}

.list-maps {
    position: absolute;
    bottom: 25px;
    left: 30px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    .map-item {
        cursor: pointer;
        width: 15px;
        height: 15px;
        background: #fff;
        border-radius: 50%;
        opacity: 0.3;

        &.active {
            opacity: 0.8;
        }
    }
}
</style>
