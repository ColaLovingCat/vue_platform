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
    defaultAbility: any;
    ability: any[];
    talents: { level: number; desc: string }[];
    facets?: { name: string; desc: string; icon: string, ability?: any[] }[]; // 命石
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
        <div class="card-bg">
            <div class="card-bg-pattern"></div>
            <div class="card-glow"></div>
        </div>

        <!-- 英雄大图 (破框展示) -->
        <div class="hero-portrait-breakout">
            <img :src="`docs/dota2/heros/${hero.code}/hero.png`" class="main-portrait" />
        </div>

        <div class="content-layer">
            <!-- 顶部：英雄主视觉 -->
            <header class="hero-header">
                <div class="header-info">
                    <div class="title-row">
                        <div class="row-icons">
                            <img class="icon icon-stat" :src="`/docs/dota2/stats/${statMap[hero.stat]}.png`" />
                            <span class="nickname">{{ hero.stat }}</span>
                        </div>
                        <div class="row-icons">
                            <img class="icon icon-attack"
                                :src="`/docs/dota2/attack_types/${attackMap[hero.attackType]}.png`" />
                            <span class="nickname">{{ hero.attackType }}</span>
                        </div>
                    </div>
                    <div class="title-names">
                        <h1>{{ hero.name }}</h1>
                        <span class="nickname">#{{ hero.nickname }}</span>
                    </div>

                    <p class="hero-desc">{{ hero.description }}</p>
                    <p class="hero-line">{{ hero.line }}</p>
                </div>
            </header>

            <!-- 中间：核心机制 (命石 & 天赋) -->
            <section class="mechanics-grid">

                <!-- 命石效果 (Facets) -->
                <div class="facet-container">
                    <h4 class="sub-title">命石选择</h4>
                    <div class="facet-list">
                        <!-- 模拟数据，实际可从 props 获取 -->
                        <div class="facet-card" v-for="(facet, i) in hero.facets" :key="i">
                            <div class="facet-icon-hex">
                                <img :src="`docs/dota2/heros/${hero.code}/${facet.icon}`" class="facet-icon" />
                                <div class="f-name">{{ facet.name }}</div>
                            </div>
                            <div class="f-desc">{{ facet.desc }}</div>
                            <div class="f-ability" v-if="facet.ability && facet.ability.length > 0">
                                <ul>
                                    <li v-for="(ab, j) in facet.ability" :key="j">
                                        <div class="facet-icon-hex">
                                            <img :src="`docs/dota2/heros/${hero.code}/${ab.icon}`" class="facet-icon" />
                                            <div class="f-name">{{ ab.name }}</div>
                                        </div>
                                        <div class="f-desc">{{ ab.desc }}</div>
                                    </li>
                                </ul>
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

                <!-- 默认技能 -->
                <div class="ability-slot">
                    <div class="ability-card">
                        <div class="ability-icon">
                            <img src="/docs/dota2/comps/innate_icon.png" />
                            <div class="skill-border"></div>
                        </div>

                        <div class="ability-info">
                            <h4 class="ability-name">{{ hero.defaultAbility.name }}</h4>
                            <p class="ability-desc">{{ hero.defaultAbility.desc }}</p>
                        </div>
                    </div>
                </div>

                <!-- 技能列表 -->
                <div class="ability-slot" v-for="skill in hero.ability" :key="skill.name">
                    <div class="ability-card">
                        <div class="ability-icon">
                            <img :src="`docs/dota2/heros/${props.hero.code}/${skill.icon}`" :alt="skill.name" />

                            <div class="upgrade-icons">
                                <div v-if="skill.is_shard" class="mini-icon shard">
                                    <img src="/docs/dota2/comps/aghs_shard.png" />
                                </div>
                                <div v-if="skill.is_scepter" class="mini-icon scepter">
                                    <img src="/docs/dota2/comps/aghs_scepter.png" />
                                </div>
                            </div>

                            <div class="skill-border"></div>
                        </div>

                        <div class="ability-info">
                            <h4 class="ability-name">{{ skill.name }}</h4>
                            <p class="ability-desc">{{ skill.desc }}</p>

                            <!-- 魔晶强化描述 -->
                            <template v-for="desc in skill.shard_descs">
                                <div class="upgrade-section shard">
                                    <div class="u-header">
                                        <span>魔晶强化</span>
                                    </div>
                                    <p>{{ desc }}</p>
                                </div>
                            </template>

                            <!-- 神杖强化描述 -->
                            <template v-for="desc in skill.scepter_descs">
                                <div class="upgrade-section scepter">
                                    <div class="u-header">
                                        <span>神杖强化</span>
                                    </div>
                                    <p>{{ desc }}</p>
                                </div>
                            </template>

                            <p class="ability-lore">{{ skill.lore }}</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<style scoped lang="scss">
$gold: #c9a45b;
$dota2-gold-light: #e4c580;
$dota2-text-primary: #e8e6e3;
$dota2-text-secondary: #a0a0a0;
$bg-dark: #0a0e14;
$panel-bg: rgba(20, 26, 34, 0.8);
$border-gold: rgba(201, 164, 91, 0.3);
$shard-blue: #00d2ff;
$scepter-gold: #f0cc5e;

.dota2-wrapper {
    position: relative;
    padding: 30px;
    // width: 850px;
    border: 2px solid #222;
    background: #0a0e14;
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.8), 0 30px 60px rgba(0, 0, 0, 0.5);

    .card-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: hidden;
    }

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

// 动画
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

/* 破框英雄图 */
.hero-portrait-breakout {
    position: absolute;
    bottom: 0;
    right: -60px;
    width: 580px;
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

            .row-icons {
                font-size: 16px;
                font-weight: 700;
                display: flex;
                align-items: center;
                gap: 6px;

                .icon {
                    width: 26px;
                }

                .icon-attack {
                    width: 20px;
                }
            }
        }

        .title-names {
            margin-top: 8px;
            display: flex;
            align-items: end;
            gap: 12px;

            h1 {
                font-size: 28px;
                font-weight: bold;
                color: $gold;
                text-transform: uppercase;
            }

            .nickname {
                font-size: 14px;
                color: #ccc;
                font-style: italic;
            }
        }

        .hero-desc {
            color: #ccc;
            line-height: 1.5;
            margin-top: 10px;
        }

        .hero-line {
            font-size: 11px;
            color: #a5e0f3;
            font-style: italic;
            margin-top: 6px;
        }
    }
}

/* 机制区域 */
.mechanics-grid {
    max-width: 900px;
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
        padding: 8px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        display: flex;
        flex-direction: column;
        gap: 12px;
        transition: 0.3s;

        &:hover {
            background: rgba($gold, 0.1);
            border-color: $gold;
        }

        .facet-icon-hex {
            display: flex;
            align-items: center;
            gap: 10px;

            .facet-icon {
                width: 20px;
                height: 20px;
            }

            .f-name {
                font-size: 14px;
                font-weight: bold;
                color: #fff;
            }
        }

        .f-desc {
            font-size: 14px;
        }

        .f-ability {
            font-size: 13px;
            color: #ccc;

            ul {
                padding-left: 10px;
                margin: 4px 0;

                li {
                    margin-bottom: 6px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;

                    .facet-icon-hex {
                        background: linear-gradient(90deg, rgba(155, 205, 255, .09019607843137255) 0, rgba(155, 205, 255, .03529411764705882) 30%, rgba(208, 232, 255, 0));

                        .facet-icon {
                            width: 16px;
                            height: 16px;
                        }

                        .f-name {
                            font-size: 12px;
                            color: #ddd;
                        }
                    }

                    .f-desc {
                        font-size: 12px;
                        color: #bbb;
                    }
                }
            }

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
        margin-bottom: 15px;

        .t-option {
            flex: 1;
            font-size: 14px;
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
    flex-direction: column;
    gap: 15px;
    padding-top: 20px;
    border-top: 1px solid #333;

    .ability-slot {
        position: relative;
        cursor: pointer;
        width: 80%;

        .ability-card {
            display: flex;
            gap: 12px;
            padding: 12px;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid $border-gold;
            border-radius: 10px;
            transition: all 0.3s ease;

            &:hover {
                border-color: $gold;
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
                    border: 1px solid $gold;
                }

                .ability-level {
                    position: absolute;
                    bottom: -5px;
                    right: -5px;
                    width: 20px;
                    height: 20px;
                    background: $gold;
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

        .skill-border {
            position: absolute;
            inset: -2px;
            border: 2px solid transparent;
            transition: 0.3s;
        }

        &:hover .skill-border {
            border-color: $gold;
            box-shadow: 0 0 15px $gold;
        }

        .upgrade-icons {
            position: absolute;
            top: 0px;
            z-index: 5;

            .mini-icon {
                width: 100%;
                height: 100%;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
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

/* 强化板块 */
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
</style>