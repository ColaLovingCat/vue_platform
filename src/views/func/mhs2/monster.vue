<script setup lang="ts">
import { computed, reactive } from 'vue'

const props = defineProps<{
    data: any
}>()

const monster: any = reactive(props.data || {})

// 属性克制逻辑
const chart: Record<string, string> = {
    'power': 'speed',    // 力克速
    'speed': 'skill', // 速克技
    'skill': 'power'  // 技克力
}
const getWeakness = (type: string) => {
    return chart[type?.toLowerCase()] || ''
}

// 格式化名称（如果需要处理编号）
const formattedIndex = computed(() => {
    return String(props.data.index).padStart(3, '0')
})
</script>

<template>
    <div class="monster-card" :class="monster.category?.toLowerCase()">
        <!-- 蛋图标：作为勋章放在右上角 -->
        <div class="egg-badge">
            <img :src="`/docs/mhs2/monsters/${monster.index}/egg.svg`" alt="egg">
        </div>

        <!-- 头部信息 -->
        <div class="card-header">
            <div class="thumb-wrapper">
                <img :src="`/docs/mhs2/monsters/${monster.index}/thumb.png`" class="thumb">
            </div>
            <div class="name-area">
                <div class="index-no">No.{{ formattedIndex }}</div>
                <div class="name">{{ monster.name }} <span class="type-tag">{{ monster.category }}</span></div>
            </div>
        </div>

        <!-- 照片区域：增加容器限制，防止溢出 -->
        <div class="photo-container">
            <img :src="`/docs/mhs2/monsters/${monster.index}/photo.png`" class="main-photo">
        </div>

        <!-- 核心内容 -->
        <div class="card-content">
            <!-- 行动倾向 -->
            <div class="content-section actions">
                <div class="section-title">猜拳倾向</div>
                <div class="action-list">
                    <div v-for="action in monster.actions" :key="action.status" class="action-row">
                        <span class="status-label">{{ action.status }}</span>
                        <div class="vs-flow">
                            <img :src="`/docs/mhs2/skills/${action.type}.svg`" class="type-icon current">
                            <i class="fa-solid fa-chevron-right separator"></i>
                            <img :src="`/docs/mhs2/skills/${getWeakness(action.type)}.svg`" class="type-icon weakness">
                        </div>
                    </div>
                </div>
            </div>

            <!-- 部位弱点 -->
            <div class="content-section parts">
                <div class="section-title">部位弱点</div>
                <div class="part-list">
                    <div v-for="part in monster.parts" :key="part.part" class="part-row">
                        <span class="part-name">{{ part.part }}</span>
                        <div class="weakness-badge">
                            <i class="fa-solid fa-crosshairs"></i>
                            {{ part.type }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.monster-card {
    position: relative;
    padding: 15px;
    width: 320px;
    height: 100%;
    border: 3px solid #4e342e;
    border-radius: 16px;
    background: #fdfaf2; // 羊皮纸色背景
    box-shadow: 0 8px 0 #d7ccc8, 0 15px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }

    // 右上角蛋图标
    .egg-badge {
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 5;
        width: 70px;
        filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));

        img {
            width: 100%;
        }
    }

    // 头部样式
    .card-header {
        display: flex;
        align-items: center;
        gap: 10px;
        border-bottom: 2px solid #efebe9;
        padding-bottom: 10px;
        margin-bottom: 10px;

        .thumb-wrapper {
            width: 45px;
            height: 45px;
            background: #fff;
            border-radius: 8px;
            padding: 3px;
            border: 2px solid #d7ccc8;
        }

        .name-area {
            flex: 1;

            .index-no {
                font-size: 12px;
                color: #a1887f;
                font-weight: bold;
            }

            .name {
                font-size: 20px;
                font-weight: 900;
                color: #3e2723;
            }
        }

        .type-tag {
            background: #8d6e63;
            color: #fff;
            font-size: 12px;
            padding: 2px 8px;
            border-radius: 20px;
        }
    }

    // 照片区域
    .photo-container {
        width: 100%;
        height: 160px;
        background: #fff;
        border-radius: 12px;
        margin-bottom: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #efebe9;

        .main-photo {
            width: 120%;
            height: 120%;
            object-fit: contain;
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    }

    &:hover .main-photo {
        transform: scale(1.15) rotate(2deg);
    }

    // 内容板块
    .card-content {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 10px;
    }

    .section-title {
        font-size: 13px;
        font-weight: 900;
        color: #fff;
        background: #4e342e;
        padding: 3px 10px;
        border-radius: 4px;
        margin-bottom: 8px;
        display: inline-block;
    }

    // 行动/猜拳倾向
    .action-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 6px;
        background: rgba(255, 255, 255, 0.5);
        padding: 4px 8px;
        border-radius: 8px;

        .status-label {
            font-size: 11px;
            font-weight: bold;
            color: #6d4c41;
        }

        .vs-flow {
            display: flex;
            align-items: center;
            gap: 4px;

            .type-icon {
                width: 30px;
                height: 30px;
                border-radius: 50%;

                &.current {
                    border: 2px solid #4caf50;
                }

                &.weakness {
                    border: 2px solid #f44336;
                    background: #ffebee;
                }
            }

            .separator {
                font-size: 10px;
                color: #bdbdbd;
            }
        }
    }

    // 部位弱点
    .part-row {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 8px;

        .part-name {
            font-size: 11px;
            color: #8d6e63;
            font-weight: bold;
        }

        .weakness-badge {
            font-size: 12px;
            font-weight: bold;
            color: #d84315;
            background: #fbe9e7;
            padding: 2px 6px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 4px;

            i {
                font-size: 10px;
            }
        }
    }
}
</style>
