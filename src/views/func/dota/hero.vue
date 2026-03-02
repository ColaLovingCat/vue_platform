<script lang="ts" setup>
import { onMounted, computed } from 'vue'

interface Hero {
    code: string;
    name: string;
    nickname: string;
    stat: string;
    attackType: string;
    line: string;
    description: string;
    ability: any[];
    talents: { level: number; desc: string }[];
    facets?: { name: string; desc: string; icon: string }[]; // 命石
}

const props = defineProps({
    hero: {
        type: Object as () => Hero,
        default: () => ({})
    },
})

// 映射逻辑
const statMap: Record<string, string> = { '力量': 'power', '敏捷': 'agility', '智力': 'intelligence', '全才': 'all' };
const attackMap: Record<string, string> = { '近战': 'melee', '远程': 'ranged' };

// 处理天赋，按等级分组
const groupedTalents = computed(() => {
    const groups: any = {};
    props.hero.talents?.forEach(t => {
        if (!groups[t.level]) groups[t.level] = [];
        groups[t.level].push(t.desc);
    });
    return Object.keys(groups).sort((a, b) => Number(b) - Number(a)).map(level => ({
        level,
        options: groups[level]
    }));
});
</script>

<template>
    <div class="dota2-wrapper">
        <!-- 背景层 -->
        <div class="card-bg-pattern"></div>
        <div class="card-glow"></div>

        <!-- 英雄大图 (破框展示) -->
        <div class="hero-portrait-breakout">
            <img :src="`docs/dota2/heros/${hero.code}/hero.png`" class="main-portrait" />
        </div>

        <div class="content-layer">
            <!-- 顶部：英雄主视觉 -->
            <header class="hero-header">
                <div class="header-info">
                    <div class="title-row">
                        <img :src="`/docs/dota2/stats/${statMap[hero.stat]}.png`" class="primary-stat-icon" />
                        <div class="names">
                            <h1>{{ hero.name }}</h1>
                            <span class="nickname">{{ hero.nickname }}</span>
                        </div>
                    </div>

                    <div class="base-stats">
                        <div class="stat-attack">
                            <img class="icon-attack"
                                :src="`/docs/dota2/attack_types/${attackMap[hero.attackType]}.png`" />
                        </div>
                        <div class="stat-pill line">{{ hero.line }}</div>
                    </div>

                    <p class="hero-desc">{{ hero.description }}</p>
                </div>
            </header>

            <!-- 中间：核心机制 (命石 & 天赋) -->
            <section class="mechanics-grid">
                <!-- 命石效果 (Facets) -->
                <div class="facet-container">
                    <h4 class="sub-title">命石选择</h4>
                    <div class="facet-list">
                        <!-- 模拟数据，实际可从 props 获取 -->
                        <div class="facet-card" v-for="i in 2" :key="i">
                            <div class="facet-icon-hex">
                                <i class="fa-solid fa-gem"></i>
                            </div>
                            <div class="facet-text">
                                <div class="f-name">命石效果 {{ i }}</div>
                                <div class="f-desc">强化英雄的特定机制，改变技能形态或被动加成。</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 天赋树 (Talent Tree) -->
                <div class="talent-tree">
                    <h4 class="sub-title">天赋</h4>
                    <div class="talent-rows">
                        <div v-for="row in groupedTalents" :key="row.level" class="talent-row">
                            <div class="t-option left">{{ row.options[0] }}</div>
                            <div class="t-level">
                                <div class="level-circle">{{ row.level }}</div>
                            </div>
                            <div class="t-option right">{{ row.options[1] }}</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 底部：技能详情 -->
            <footer class="abilities-footer">
                <div class="ability-slot" v-for="skill in hero.ability" :key="skill.name"
                    :class="{ 'shard-extra': skill.is_shard_skill, 'scepter-extra': skill.is_scepter_skill }">
                    <div class="skill-icon-wrapper">
                        <img :src="`docs/dota2/heros/${hero.code}/${skill.img}`" />

                        <!-- 强化标记：如果这个技能有 A杖/魔晶 强化 -->
                        <div class="upgrade-icons">
                            <div v-if="skill.shard_desc" class="mini-icon shard">
                                <img src="/docs/dota2/comps/tiny.png" />
                            </div>
                            <div v-if="skill.scepter_desc" class="mini-icon scepter">
                                <img src="/docs/dota2/comps/tiny.png" />
                            </div>
                        </div>

                        <div class="skill-border"></div>
                    </div>

                    <!-- 悬浮窗内容增强 -->
                    <div class="skill-popover">
                        <h5>{{ skill.name }}</h5>
                        <p class="desc">{{ skill.desc }}</p>

                        <!-- 魔晶强化描述 -->
                        <div v-if="skill.shard_desc" class="upgrade-section shard">
                            <div class="u-header">
                                <img src="/docs/dota2/comps/tiny.png" />
                                <span>魔晶强化</span>
                            </div>
                            <p>{{ skill.shard_desc }}</p>
                        </div>

                        <!-- 神杖强化描述 -->
                        <div v-if="skill.scepter_desc" class="upgrade-section scepter">
                            <div class="u-header">
                                <img src="/docs/dota2/comps/tiny.png" />
                                <span>神杖强化</span>
                            </div>
                            <p>{{ skill.scepter_desc }}</p>
                        </div>

                        <p class="lore">{{ skill.lore }}</p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<style scoped lang="scss">
$gold: #c9a45b;
$bg-dark: #0a0e14;
$panel-bg: rgba(20, 26, 34, 0.8);
$border-gold: rgba(201, 164, 91, 0.3);
$shard-blue: #00d2ff;
$scepter-gold: #f0cc5e;

.dota2-wrapper {
    position: relative;
    padding: 30px;
    width: 850px;
    border: 2px solid #222;
    background: #0a0e14;
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.8), 0 30px 60px rgba(0, 0, 0, 0.5);

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

/* 破框英雄图 */
.hero-portrait-breakout {
    position: absolute;
    bottom: -40px;
    right: -60px;
    width: 550px;
    height: auto;
    z-index: 1;
    pointer-events: none;

    .main-portrait {
        width: 100%;
        height: auto;
        display: block;
        filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.8)) brightness(1.1);
        mask-image: linear-gradient(to left,
                black 40%,
                rgba(0, 0, 0, 0.5) 70%,
                transparent 100%);
        -webkit-mask-image: linear-gradient(to left,
                black 40%,
                rgba(0, 0, 0, 0.5) 70%,
                transparent 100%);
    }
}

.content-layer {
    position: relative;
    z-index: 2;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 1);
}

/* 头部主视觉 */
.hero-header {
    display: flex;
    gap: 24px;
    margin-bottom: 20px;

    .header-info {
        flex: 1;

        .title-row {
            display: flex;
            align-items: center;
            gap: 15px;

            .primary-stat-icon {
                width: 40px;
            }

            h1 {
                font-size: 32px;
                color: #fff;
                text-transform: uppercase;
                margin: 0;
                letter-spacing: 2px;
            }

            .nickname {
                color: $gold;
                font-size: 16px;
                font-weight: bold;
            }
        }

        .base-stats {
            display: flex;
            gap: 10px;
            margin: 10px 0;

            .stat-attack {
                width: 40px;
                display: flex;
                justify-content: center;

                .icon-attack {
                    width: 15px;
                    height: 15px;
                }
            }

            .stat-pill {
                background: rgba(0, 0, 0, 0.5);
                border: 1px solid #444;
                padding: 4px 12px;
                border-radius: 4px;
                font-size: 12px;
                line-height: 15px;

                &.line {
                    border-color: $gold;
                    color: $gold;
                }
            }
        }

        .hero-desc {
            font-size: 13px;
            color: #ccc;
            line-height: 1.5;
            margin: 0;
        }
    }
}

/* 机制区域 */
.mechanics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 25px;

    .sub-title {
        font-size: 14px;
        color: $gold;
        text-transform: uppercase;
        border-bottom: 1px solid $border-gold;
        padding-bottom: 5px;
        margin-bottom: 12px;
    }
}

/* 命石卡片 */
.facet-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .facet-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        display: flex;
        padding: 8px;
        gap: 12px;
        align-items: center;
        transition: 0.3s;

        &:hover {
            background: rgba($gold, 0.1);
            border-color: $gold;
        }

        .facet-icon-hex {
            width: 32px;
            height: 32px;
            background: #3b4255;
            clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #00d2ff;
        }

        .f-name {
            font-size: 13px;
            font-weight: bold;
            color: #fff;
        }

        .f-desc {
            font-size: 11px;
            color: #888;
        }
    }
}

/* 天赋树 (经典 Dota2 圆圈) */
.talent-rows {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 10px;

    .talent-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 6px;

        .t-option {
            flex: 1;
            font-size: 11px;
            color: #aaa;

            &.left {
                text-align: right;
            }

            &.right {
                text-align: left;
            }
        }

        .t-level {
            width: 24px;
            height: 24px;

            .level-circle {
                width: 100%;
                height: 100%;
                border: 2px solid $gold;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                color: $gold;
                font-weight: bold;
                background: #111;
                box-shadow: 0 0 10px rgba($gold, 0.3);
            }
        }
    }
}

/* 技能槽布局 */
.abilities-footer {
    display: flex;
    justify-content: start;
    gap: 15px;
    padding-top: 20px;
    border-top: 1px solid #333;

    .ability-slot {
        position: relative;
        cursor: pointer;

        &:hover .skill-popover {
            visibility: visible;
            opacity: 1;
            transform: translateY(-10px);
        }

        .skill-icon-wrapper {
            width: 64px;
            height: 64px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .skill-border {
                position: absolute;
                inset: -2px;
                border: 2px solid transparent;
                transition: 0.3s;
            }
        }

        &:hover .skill-border {
            border-color: $gold;
            box-shadow: 0 0 15px $gold;
        }

        .upgrade-icons {
            position: absolute;
            top: -5px;
            right: -5px;
            display: flex;
            flex-direction: column;
            gap: 2px;
            z-index: 5;

            .mini-icon {
                width: 16px;
                height: 16px;
                background: #000;
                border-radius: 50%;
                padding: 2px;
                border: 1px solid transparent;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                &.shard {
                    border-color: $shard-blue;
                    box-shadow: 0 0 5px $shard-blue;
                }

                &.scepter {
                    border-color: $scepter-gold;
                    box-shadow: 0 0 5px $scepter-gold;
                }
            }
        }

        /* 如果是新增技能的特殊边框 */
        &.shard-extra .skill-border {
            border-color: $shard-blue !important;
            opacity: 0.6;
        }

        &.scepter-extra .skill-border {
            border-color: $scepter-gold !important;
            opacity: 0.6;
        }
    }
}

/* 弹出框内的强化板块 */
.upgrade-section {
    margin: 8px 0;
    padding: 8px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.4);
    border-left: 3px solid transparent;

    .u-header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 4px;

        img {
            width: 14px;
        }

        span {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
        }
    }

    p {
        font-size: 12px;
        margin: 0;
        line-height: 1.4;
    }

    &.shard {
        border-color: $shard-blue;

        .u-header span {
            color: $shard-blue;
        }
    }

    &.scepter {
        border-color: $scepter-gold;

        .u-header span {
            color: $scepter-gold;
        }
    }
}

/* 技能悬浮窗 */
.skill-popover {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 260px;
    background: rgba(10, 10, 15, 0.98);
    border: 1px solid $gold;
    padding: 12px;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    z-index: 100;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);

    h5 {
        color: $gold;
        margin: 0 0 8px 0;
        font-size: 16px;
        text-transform: uppercase;
    }

    .desc {
        font-size: 13px;
        color: #eee;
        line-height: 1.4;
        margin-bottom: 8px;
    }

    .lore {
        font-size: 11px;
        color: #777;
        font-style: italic;
        border-top: 1px solid #333;
        padding-top: 8px;
    }
}
</style>