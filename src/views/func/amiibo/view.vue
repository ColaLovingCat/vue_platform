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

type SortKey = 'default' | 'name' | 'game' | 'series' | 'date'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
    { value: 'default', label: '默认' },
    { value: 'name', label: '名称' },
    { value: 'game', label: '游戏' },
    { value: 'series', label: '系列' },
    { value: 'date', label: '日期' },
]

const searchInfos = reactive({
    series: 'All',
    text: '',
    sortBy: 'default' as SortKey,
    sortAsc: true,
    datas: [] as any[]
})

const excelSerialToDate = (serial: number) => {
    // Excel serial date → UTC date (1899-12-30 base)
    const utc = Date.UTC(1899, 11, 30) + serial * 24 * 60 * 60 * 1000
    return new Date(utc)
}

const toSortableDate = (value: unknown) => {
    if (value === null || value === undefined || value === '') return 0
    if (value instanceof Date) return value.getTime()
    if (typeof value === 'number') return excelSerialToDate(value).getTime()
    if (typeof value === 'string') {
        const parsed = new Date(value)
        return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime()
    }
    return 0
}

const formatAmiiboDate = (value: unknown) => {
    if (value === null || value === undefined || value === '') return ''

    let date: Date | null = null
    if (value instanceof Date) {
        date = value
    } else if (typeof value === 'number') {
        date = excelSerialToDate(value)
    } else if (typeof value === 'string') {
        const parsed = new Date(value)
        if (!Number.isNaN(parsed.getTime())) date = parsed
    }

    if (!date || Number.isNaN(date.getTime())) return String(value)

    const y = date.getUTCFullYear()
    const m = String(date.getUTCMonth() + 1).padStart(2, '0')
    const d = String(date.getUTCDate()).padStart(2, '0')
    return `${y}.${m}.${d}`
}

const isMatched = (status: unknown) => Number(status) === 1

const compareText = (a: unknown, b: unknown) =>
    String(a ?? '').localeCompare(String(b ?? ''), 'zh', { sensitivity: 'base', numeric: true })

const sortItems = (list: any[]) => {
    const key = searchInfos.sortBy
    if (key === 'default') return list

    const dir = searchInfos.sortAsc ? 1 : -1

    return [...list].sort((a, b) => {
        let result = 0
        if (key === 'date') {
            result = toSortableDate(a.date) - toSortableDate(b.date)
        } else {
            result = compareText(a[key], b[key])
        }

        if (result === 0) result = compareText(a.name || a.code, b.name || b.code)
        return result * dir
    })
}

const toggleSortDir = () => {
    searchInfos.sortAsc = !searchInfos.sortAsc
    handleSearch()
}

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
                    item.name?.toLowerCase().includes(searchText)
                    || item.game?.toLowerCase().includes(searchText)
                    || item.series?.toLowerCase().includes(searchText)
                )
            }
            result = sortItems(result)
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
    <div class="sections" :class="{ 'is-items': pageInfos.show === 'items' }">
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
                <template v-if="pageInfos.show === 'items'">
                    <a-select
                        v-model:value="searchInfos.sortBy"
                        style="width: 120px"
                        @change="handleSearch"
                    >
                        <a-select-option v-for="item in SORT_OPTIONS" :key="item.value" :value="item.value">
                            {{ item.label }}
                        </a-select-option>
                    </a-select>
                    <button
                        v-if="searchInfos.sortBy !== 'default'"
                        type="button"
                        class="sort-dir-btn"
                        :title="searchInfos.sortAsc ? '升序' : '降序'"
                        @click="toggleSortDir"
                    >
                        {{ searchInfos.sortAsc ? '升序 ↑' : '降序 ↓' }}
                    </button>
                </template>
                <a-input v-model:value="searchInfos.text" placeholder="search" style="width: 200px"
                    @change="handleSearch" />
            </div>
        </div>
        <div class="list-amiibos" :class="`list-${pageInfos.show}`">
            <template v-for="amiibo in searchInfos.datas" :key="amiibo.code || amiibo.img || amiibo.no">
                <!-- Amiibo 商品卡 -->
                <div
                    v-if="pageInfos.show === 'items'"
                    class="amiibo-card"
                    :class="{ 'is-matched': isMatched(amiibo.status), 'is-pending': !isMatched(amiibo.status) }"
                    :title="isMatched(amiibo.status) ? '已匹配' : '未匹配'"
                >
                    <div class="card-figure">
                        <div class="figure-glow" aria-hidden="true" />
                        <img :src="`/docs/amiibo/${pageInfos.show}/${amiibo.img}`" :alt="amiibo.name || amiibo.code">
                    </div>
                    <div class="card-plate">
                        <div class="plate-name">{{ amiibo.name || amiibo.code || '—' }}</div>
                        <div class="plate-game">{{ amiibo.game }}</div>
                        <div class="plate-meta">
                            <span class="meta-date" v-if="formatAmiiboDate(amiibo.date)">
                                {{ formatAmiiboDate(amiibo.date) }}
                            </span>
                            <span class="meta-series">{{ amiibo.series }}</span>
                        </div>
                    </div>
                </div>

                <!-- 其他分类保持原样 -->
                <div v-else class="amiibo-item">
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
@import url(@/views/func/com/search.scss);

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

    .sort-dir-btn {
        height: 32px;
        padding: 0 12px;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        background: #fff;
        color: #1f2937;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            border-color: #e60012;
            color: #e60012;
        }
    }

    &.is-items {
        background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(230, 0, 18, 0.12), transparent 55%),
            linear-gradient(180deg, #f7f8fb 0%, #eef1f6 100%);

        .box-search {
            background: rgba(255, 255, 255, 0.92);
            border-bottom: 1px solid rgba(230, 0, 18, 0.12);
            backdrop-filter: blur(8px);
        }
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
        gap: 22px;
        padding: 8px 4px 28px;
        align-content: flex-start;
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

/* Nintendo / amiibo 展示卡 */
.amiibo-card {
    --nintendo-red: #e60012;
    --card-ink: #1a1a1a;
    --card-muted: #6b7280;

    position: relative;
    width: 210px;
    border-radius: 18px;
    background:
        linear-gradient(165deg, #ffffff 0%, #f5f7fb 58%, #eef2f8 100%);
    border: 1px solid rgba(15, 23, 42, 0.06);
    box-shadow:
        0 1px 0 rgba(255, 255, 255, 0.85) inset,
        0 10px 24px rgba(15, 23, 42, 0.08),
        0 2px 6px rgba(15, 23, 42, 0.04);
    overflow: hidden;
    transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.28s ease;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 4px;
    }

    &.is-matched::before {
        background: linear-gradient(90deg, #16a34a, #4ade80 55%, #bbf7d0);
    }

    &.is-pending {
        opacity: 0.55;

        &::before {
            background: linear-gradient(90deg, #9ca3af, #d1d5db 55%, #e5e7eb);
        }

        .card-figure img {
            filter: grayscale(0.2) saturate(0.8) drop-shadow(0 10px 14px rgba(15, 23, 42, 0.12));
        }
    }

    &:hover {
        transform: translateY(-6px);
        box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.9) inset,
            0 18px 36px rgba(15, 23, 42, 0.14),
            0 4px 10px rgba(230, 0, 18, 0.08);

        .card-figure img {
            transform: translateY(-4px) scale(1.04);
        }
    }

    .card-figure {
        position: relative;
        height: 178px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 12px;

        .figure-glow {
            position: absolute;
            width: 130px;
            height: 42px;
            bottom: 18px;
            border-radius: 50%;
            background: radial-gradient(ellipse, rgba(15, 23, 42, 0.16), transparent 70%);
            filter: blur(1px);
        }

        img {
            position: relative;
            z-index: 1;
            width: 168px;
            height: 168px;
            object-fit: contain;
            filter: drop-shadow(0 10px 14px rgba(15, 23, 42, 0.18));
            transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }
    }

    .card-plate {
        margin: 0 10px 12px;
        padding: 12px 12px 11px;
        border-radius: 14px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.98));
        border: 1px solid rgba(15, 23, 42, 0.06);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset;

        .plate-name {
            color: var(--card-ink);
            font-size: 15px;
            font-weight: 800;
            line-height: 1.25;
            letter-spacing: 0.01em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .plate-game {
            margin-top: 4px;
            color: var(--card-muted);
            font-size: 12px;
            font-weight: 600;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .plate-meta {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
        }

        .meta-date {
            color: #4b5563;
            font-size: 11px;
            font-weight: 700;
            font-variant-numeric: tabular-nums;
            letter-spacing: 0.02em;
            flex-shrink: 0;
        }

        .meta-series {
            min-width: 0;
            max-width: 58%;
            padding: 2px 8px;
            border-radius: 999px;
            background: rgba(230, 0, 18, 0.08);
            color: var(--nintendo-red);
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.02em;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
