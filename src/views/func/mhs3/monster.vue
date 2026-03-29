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
        <div class="thumb-wrapper">
            <img :src="`/docs/mhs2/monsters/${monster.index}/thumb.png`" class="thumb">
        </div>
        <div class="name-area">
            <div class="titles">{{ monster.category }}</div>
            <div class="name">{{ monster.name }}</div>
        </div>
        <div class="egg-badge">
            <img :src="`/docs/mhs2/monsters/${monster.index}/egg.svg`" onerror="this.style.display='none'" alt="egg">
        </div>
        <div class="element-group">
            <span class="titles">属性</span>
            <div class="el-types">
                <div class="element-item main" title="自身属性">
                    <img :src="`/docs/mhs2/attributes/${monster.attribute}.png`" onerror="this.style.display='none'"
                        alt="element">
                </div>
                <div class="element-divider"></div>
                <div class="element-item">
                    <img :src="`/docs/mhs2/skills/${monster.type}.svg`" onerror="this.style.display='none'"
                        alt="weakness">
                </div>
            </div>
        </div>
        <div class="content-section actions">
            <div class="action-list">
                <div v-for="action in monster.actions" :key="action.status" class="action-row">
                    <span class="titles">{{ action.status }}</span>
                    <div class="vs-flow">
                        <img :src="`/docs/mhs2/skills/${action.type}.svg`" class="type-icon current">
                        <i class="fa-solid fa-chevron-left separator"></i>
                        <img :src="`/docs/mhs2/skills/${getWeakness(action.type)}.svg`" class="type-icon weakness">
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
    width: 100%;
    border: 3px solid #4e342e;
    border-radius: 16px;
    background: #fdfaf2; // 羊皮纸色背景
    box-shadow: 0 8px 0 #d7ccc8, 0 15px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 15px;

    &:hover {
        transform: translateY(-5px);
    }

    .thumb-wrapper {
        width: 45px;
        height: 45px;
        background: #fff;
        border-radius: 8px;
        padding: 3px;
        border: 2px solid #d7ccc8;
    }

    .titles {
        font-size: 12px;
        line-height: 16px;
        color: #a1887f;
        font-weight: bold;
    }

    .name-area {
        width: 150px;

        .name {
            font-size: 20px;
            font-weight: 900;
            color: #3e2723;
        }
    }

    // 属性组样式
    .element-group {
        display: flex;
        flex-direction: column;

        .el-types {
            display: flex;
            align-items: center;
            gap: 8px;

            img {
                width: 22px;
                height: 22px;
                filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.1));
            }
        }

        .element-divider {
            width: 1px;
            height: 15px;
            background: #d7ccc8;
        }
    }

    .type-tag {
        background: #8d6e63;
        color: #fff;
        font-size: 12px;
        padding: 2px 8px;
        border-radius: 20px;
    }

    .action-list {
        display: flex;

        .action-row {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 6px;
            background: rgba(255, 255, 255, 0.5);
            padding: 4px 8px;
            border-radius: 8px;

            .status-label {
                font-size: 12px;
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
    }

    // 右上角蛋图标
    .egg-badge {
        width: 70px;
        filter: drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.2));

        img {
            width: 100%;
        }
    }
}
</style>
