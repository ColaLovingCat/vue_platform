<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

// name
defineOptions({
    name: 'custom-name'
})

// props
const props = defineProps({
    hero: {
        type: Object as () => Hero,
        default: () => ({})
    },
})

interface Hero {
    code: string;
    name: string;
    nickname: string;
    stat: string;
    attackType: string;
    img: string;
    line: string;
    description: string;
    ability: {
        name: string;
        desc: string;
        lore: string;
        img: string;
    }[];
}

const enum STAT {
    力量 = 'power',
    敏捷 = 'agility',
    智力 = 'intelligence',
    全才 = 'all',
}
const enum ATTACK_TYPE {
    近战 = 'melee',
    远程 = 'ranged',
}

onMounted(() => { })

</script>

<template>
    <div class="dota2-hero-card">
        <!-- 背景装饰 -->
        <div class="card-bg-pattern"></div>
        <div class="card-glow"></div>

        <!-- 英雄形象区域 -->
        <div class="hero-portrait">
            <img :src="`docs/dota2/heros/${props.hero.code}/hero.png`" :alt="props.hero.name" class="hero-img" />
        </div>

        <!-- 英雄形象区域 -->
        <div class="hero-image-section">
            <div class="stats-grid">
                <!-- 主属性 -->
                <div class="stat-item" :class="props.hero.stat.toLowerCase()">
                    <div class="stat-icon">
                        <img :src="`docs/dota2/stats/${STAT[props.hero.stat]}.png`" :alt="props.hero.stat" />
                    </div>
                    <div class="stat-value">{{ props.hero.stat }}</div>
                </div>

                <!-- 攻击类型 -->
                <div class="stat-item attack-type">
                    <div class="stat-icon">
                        <img :src="`docs/dota2/attack_types/${ATTACK_TYPE[props.hero.attackType]}.png`"
                            :alt="props.hero.attackType" />
                    </div>
                    <div class="stat-value">{{ props.hero.attackType }}</div>
                </div>
            </div>
            <div class="hero-name-overlay">
                <h2 class="hero-name">{{ props.hero.name }}</h2>
                <span class="hero-nickname">"{{ props.hero.nickname }}"</span>
            </div>
        </div>

        <!-- 英雄基本信息卡片 -->
        <div class="hero-stats-panel">
            <!-- 英雄描述 -->
            <div class="hero-description">
                <p>{{ props.hero.description }}</p>
            </div>

            <!-- 定位/分路 -->
            <div class="hero-line">
                <div class="stat-icon">⚔️</div>
                <div class="stat-value">{{ props.hero.line }}</div>
            </div>
        </div>

        <!-- 技能区域 -->
        <div class="abilities-section">
            <h3 class="section-title">
                <span class="title-decoration"></span>
                技能
                <span class="title-decoration"></span>
            </h3>

            <div class="abilities-grid">
                <div v-for="ability in props.hero.ability" :key="ability.name" class="ability-card">
                    <div class="ability-icon">
                        <img :src="`docs/dota2/heros/${props.hero.code}/${ability.img}`" :alt="ability.name" />
                        <div class="ability-level" v-if="ability.level">Lv.{{ ability.level }}</div>
                    </div>

                    <div class="ability-info">
                        <h4 class="ability-name">{{ ability.name }}</h4>
                        <p class="ability-desc">{{ ability.desc }}</p>
                        <p class="ability-lore">{{ ability.lore }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
// Dota2 主题色
$dota2-bg: #0a0e14;
$dota2-gold: #c9a45b;
$dota2-gold-light: #e4c580;
$dota2-red: #b03a3a;
$dota2-blue: #3a6ea5;
$dota2-green: #2e7d5a;
$dota2-text-primary: #e8e6e3;
$dota2-text-secondary: #a0a0a0;
$dota2-border: rgba(201, 164, 91, 0.3);

.dota2-hero-card {
    position: relative;
    background: linear-gradient(145deg, #1a1f2a 0%, #0f131c 100%);
    border: 1px solid $dota2-border;
    border-radius: 16px;
    padding: 24px;
    color: $dota2-text-primary;
    font-family: 'Cinzel', 'Trajan Pro', serif;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

    // 背景装饰
    .card-bg-pattern {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image:
            radial-gradient(circle at 20% 30%, rgba(201, 164, 91, 0.05) 0%, transparent 30%),
            repeating-linear-gradient(45deg, rgba(201, 164, 91, 0.02) 0px, rgba(201, 164, 91, 0.02) 2px, transparent 2px, transparent 10px);
        pointer-events: none;
    }

    .card-glow {
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        background: radial-gradient(circle at 50% 50%, rgba(201, 164, 91, 0.1), transparent 70%);
        animation: rotate 20s linear infinite;
        pointer-events: none;
    }
}

.hero-portrait {
    position: absolute;
    right: 0;
    height: 100%;
    z-index: 0;

    .hero-img {
        width: unset;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        filter: brightness(0.8) saturate(1.2);
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.05);
        }
    }
}

// 英雄形象区域
.hero-image-section {
    position: relative;
    margin: -24px -24px 20px -24px;
    height: 280px;
    overflow: hidden;
    border-bottom: 2px solid $dota2-gold;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .hero-name-overlay {
        padding: 20px 24px 20px;
        background: linear-gradient(to top, rgba(10, 14, 20, 0.95), transparent);

        .hero-name {
            margin: 0;
            font-size: 32px;
            font-weight: 600;
            color: $dota2-gold;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            letter-spacing: 2px;
        }

        .hero-nickname {
            font-size: 16px;
            color: $dota2-text-secondary;
            font-style: italic;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }
    }
}

// 统计面板
.hero-stats-panel {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid $dota2-border;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 24px;
    backdrop-filter: blur(5px);
}

.stats-grid {
    padding-left: 20px;
    display: flex;
    gap: 12px;

    .stat-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 8px;
        border-left: 3px solid transparent;

        // 主属性颜色
        &.str {
            border-left-color: $dota2-red;
        }

        &.agi {
            border-left-color: $dota2-green;
        }

        &.int {
            border-left-color: $dota2-blue;
        }

        .stat-icon {
            width: 24px;
            height: 24px;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .stat-value {
            font-size: 14px;
            font-weight: 500;
            color: $dota2-text-primary;
        }
    }
}

.hero-description {
    font-size: 14px;
    line-height: 1.6;
    color: $dota2-text-primary;
    border-bottom: 1px solid $dota2-border;
    padding-bottom: 16px;
    margin-bottom: 8px;

    p {
        margin: 0;
    }
}

.hero-line {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: $dota2-text-secondary;

    .stat-icon {
        font-size: 16px;
    }

    .stat-value {
        font-weight: 500;
    }
}

// 技能区域
.abilities-section {
    z-index: 1;

    .section-title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin: 0 0 20px 0;
        font-size: 20px;
        color: $dota2-gold;
        text-transform: uppercase;
        letter-spacing: 4px;

        .title-decoration {
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, transparent, $dota2-gold, transparent);
        }
    }
}

.abilities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
}

.ability-card {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid $dota2-border;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
        border-color: $dota2-gold;
        background: rgba(201, 164, 91, 0.1);
        transform: translateY(-2px);
    }

    .ability-icon {
        position: relative;
        width: 60px;
        height: 60px;
        flex-shrink: 0;

        img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            border: 1px solid $dota2-gold;
        }

        .ability-level {
            position: absolute;
            bottom: -5px;
            right: -5px;
            width: 20px;
            height: 20px;
            background: $dota2-gold;
            color: #0a0e14;
            border-radius: 50%;
            font-size: 10px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .ability-info {
        flex: 1;

        .ability-name {
            margin: 0 0 6px 0;
            font-size: 16px;
            color: $dota2-gold-light;
            font-weight: 600;
        }

        .ability-desc {
            margin: 0 0 4px 0;
            font-size: 13px;
            color: $dota2-text-primary;
            line-height: 1.4;
        }

        .ability-lore {
            margin: 0;
            font-size: 12px;
            color: $dota2-text-secondary;
            font-style: italic;
            opacity: 0.8;
        }
    }
}

// 动画
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

// 响应式调整
@media (max-width: 768px) {
    .dota2-hero-card {
        padding: 16px;
    }

    .hero-image-section {
        height: 200px;
        margin: -16px -16px 16px -16px;

        .hero-name-overlay {
            .hero-name {
                font-size: 24px;
            }
        }
    }

    .abilities-grid {
        grid-template-columns: 1fr;
    }
}
</style>
