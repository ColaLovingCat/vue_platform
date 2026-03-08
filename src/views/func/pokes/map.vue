<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import * as current from './datas.service'

// name
defineOptions({
    name: 'custom-name'
})

// props
const props = defineProps({
    area: {
        type: String,
        default: () => ({})
    }
})

const positions: any = ref([])
const activePoint: any = ref(null)

onMounted(async () => {
    loadPoints()
})

watch(() => props.area, () => {
    loadPoints()
})

const loadPoints = async () => {
    const db = await current.getDB()
    positions.value = db.map.filter((a: any) => a.areaCode == props.area)
}
</script>

<template>
    <div class="map-container">
        <div class="box-area">
            <!-- 地图背景 -->
            <img :src="`/docs/pokemons/byronb/${area}.jpeg`" alt="游戏地图" class="map-bg">

            <!-- 地图标记点 -->
            <div class="map-marker" v-for="point in positions" :key="point.id"
                :style="{ left: point.x + 'px', top: point.y + 'px' }" :data-category="point.category"
                @mouseenter="activePoint = point" @mouseleave="activePoint = null">
                <!-- 呼吸光晕 -->
                <div class="marker-pulse"></div>

                <!-- 标记点主体 -->
                <div class="marker-dot" :class="point.category">
                    <span class="marker-icon"></span>
                </div>

                <!-- 悬浮信息卡 -->
                <div class="marker-card" v-show="activePoint === point" :data-gym-type="point.gymType">
                    <div class="card-arrow"></div>
                    <div class="card-content">
                        <h4 class="card-title">
                            <span>{{ point.name }}</span>
                            <span>{{ point.enName }}</span>
                        </h4>

                        <p class="card-desc" v-if="point.desc">{{ point.desc }}</p>

                        <div class="card-meta" v-if="point.gym">
                            <span class="gym">{{ point.gym }}</span>
                            <span class="owner">{{ point.owner }}</span>
                            <div class="badge" v-if="point.badge">
                                <img :src="`/docs/pokemons/gym/${point.icon}`" alt="">
                                <span>{{ point.badge }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.map-container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    height: 788px;
    margin: 0 auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);

    .box-area {
        position: relative;
        width: 100%;

        .map-bg {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            pointer-events: none;
        }
    }
}

// 地图标记点
.map-marker {
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 10;

    // 标记点主体
    .marker-dot {
        position: relative;
        width: 25px;
        height: 25px;
        color: white;
        font-size: 1.2rem;
        border: 3px solid rgba(255, 255, 255, 0.8);
        z-index: 2;
        // transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        animation: blink 2s infinite;
        display: flex;
        align-items: center;
        justify-content: center;

        &.nature {
            border-radius: 50%;
        }

        .marker-icon {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 3px solid rgba(255, 255, 255, 0.8);
            animation: iconBlink 2s infinite;
        }
    }

    // 悬浮效果
    &:hover {
        z-index: 100;

        .marker-dot {
            transform: scale(1.2);
        }
    }
}

// 不同颜色的标记点
.map-marker {
    &[data-category="city"] {
        --color-start: #4285f4; // 蓝色
        --color-end: #ea4335; // 红色
    }

    &[data-category="nature"] {
        --color-start: #34a853; // 绿色
        --color-end: #fbbc05; // 黄色
    }
}

@keyframes blink {

    0%,
    100% {
        border-color: var(--color-start);
        box-shadow:
            0 0 5px var(--color-start),
            0 0 10px var(--color-start),
            inset 0 0 5px var(--color-start);
    }

    50% {
        border-color: var(--color-end);
        box-shadow:
            0 0 10px var(--color-end),
            0 0 20px var(--color-end),
            inset 0 0 8px var(--color-end);
    }
}

@keyframes iconBlink {

    0%,
    100% {
        border-color: var(--color-start);
    }

    50% {
        border-color: var(--color-end);
    }
}

@keyframes cardPop {
    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(0) scale(0.8);
    }

    100% {
        opacity: 1;
        transform: translateX(-50%) translateY(-15px) scale(1);
    }
}

.marker-card {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(-20px);
    min-width: 280px;
    max-width: 320px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 24px;
    box-shadow:
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 0 0 2px rgba(255, 255, 255, 0.5) inset,
        0 0 0 4px rgba(255, 215, 0, 0.3);
    animation: cardFloat 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 1000;

    // 根据道馆类型设置不同颜色的边框光晕
    @each $type, $color in ('rock': #b87333,
        'water': #4a90e2,
        'fire': #e25822,
        'grass': #4caf50,
        'electric': #ffd700,
        'psychic': #f57c00,
        'ice': #4dd0e1,
        'dragon': #6a4c9c,
        'dark': #5d4037,
        'fairy': #f8bbd0) {
        &[data-gym-type="#{$type}"] {
            box-shadow:
                0 25px 50px -12px rgba(0, 0, 0, 0.25),
                0 0 0 2px rgba(255, 255, 255, 0.5) inset,
                0 0 0 4px rgba($color, 0.3);

            .card-arrow {
                background: linear-gradient(135deg, $color, lighten($color, 20%));
            }

            .badge {
                background: linear-gradient(135deg, $color, lighten($color, 15%));
            }
        }
    }

    // 卡片箭头
    .card-arrow {
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 24px;
        height: 24px;
        background: linear-gradient(135deg, #ffd700, #ffb347);
        border-radius: 6px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        z-index: -1;

        &::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            right: 2px;
            bottom: 2px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
        }
    }

    // 卡片内容
    .card-content {
        position: relative;
        background: linear-gradient(135deg, #ffffff, #f8f9fa);
        border-radius: 24px;
        padding: 20px;
        z-index: 2;
        overflow: hidden;

        // 装饰性背景图案
        &::before {
            content: '';
            position: absolute;
            top: -20px;
            right: -20px;
            width: 120px;
            height: 120px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
        }

        &::after {
            content: '⚡';
            position: absolute;
            bottom: 10px;
            right: 15px;
            font-size: 3rem;
            opacity: 0.05;
            transform: rotate(15deg);
            pointer-events: none;
        }
    }

    // 标题区域
    .card-title {
        margin: 0 0 12px 0;
        padding-bottom: 12px;
        border-bottom: 2px solid rgba(255, 215, 0, 0.3);
        display: flex;
        align-items: baseline;
        gap: 8px;

        span:first-child {
            font-size: 1.3rem;
            font-weight: 800;
            background: linear-gradient(135deg, #2c3e50, #1a1a2e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: 0.5px;
        }

        span:last-child {
            font-size: 1rem;
            font-weight: 500;
            color: #7f8c8d;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.8;
        }
    }

    // 描述文本
    .card-desc {
        margin: 0 0 16px 0;
        font-size: 0.95rem;
        line-height: 1.6;
        color: #34495e;
        background: rgba(236, 240, 241, 0.5);
        padding: 12px 14px;
        border-radius: 16px;
        border-left: 4px solid #ffd700;
        font-style: italic;
        position: relative;

        &::before {
            content: '"';
            position: absolute;
            top: 0;
            left: 8px;
            font-size: 2rem;
            color: rgba(255, 215, 0, 0.3);
            font-family: serif;
        }

        &::after {
            content: '"';
            position: absolute;
            bottom: -10px;
            right: 8px;
            font-size: 2rem;
            color: rgba(255, 215, 0, 0.3);
            font-family: serif;
        }
    }

    // 道馆信息区域
    .card-meta {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
        background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        padding: 12px;
        border-radius: 18px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

        .gym {
            font-size: 1.1rem;
            font-weight: 700;
            color: #2c3e50;
            padding: 4px 12px;

            &::before {
                content: '🏟️';
                margin-right: 6px;
                font-size: 1rem;
            }
        }

        .owner {
            font-size: 0.95rem;
            color: #7f8c8d;
            display: flex;
            align-items: center;
            gap: 4px;

            &::before {
                content: '👤';
                font-size: 0.9rem;
                opacity: 0.7;
            }
        }

        // 徽章
        .badge {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 4px 14px 4px 8px;
            background: linear-gradient(135deg, #ffd700, #ffb347);
            border-radius: 30px;
            box-shadow: 0 4px 10px rgba(255, 215, 0, 0.3);
            margin-left: auto;

            img {
                width: 24px;
                height: 24px;
                object-fit: contain;
                filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));
            }

            span {
                font-size: 0.9rem;
                font-weight: 700;
                color: #2c3e50;
                text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
            }
        }
    }

    // 悬停增强效果
    &:hover {
        transform: translateX(-50%) translateY(-25px);
        box-shadow:
            0 30px 60px -12px rgba(0, 0, 0, 0.3),
            0 0 0 2px rgba(255, 255, 255, 0.6) inset,
            0 0 0 6px rgba(255, 215, 0, 0.4);

        .card-arrow {
            transform: translateX(-50%) rotate(45deg) scale(1.1);
        }
    }
}
</style>
