<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

// name
defineOptions({
    name: 'custom-name'
})

// props
const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    },
    changeMark: {
        type: Boolean,
        require: false
    }
})

onMounted(() => {
})

let poke: any = reactive(props.data || {})

const changeShape = (shape: any) => {
    Object.assign(poke, shape)
}

const totalStat = 180
const enum types {
    '虫' = 'Bug',
    '恶' = 'Dark',
    '龙' = 'Dragon',
    '电' = 'Electric',
    '妖精' = 'Fairy',
    '格斗' = 'Fighting',
    '火' = 'Fire',
    '飞行' = 'Flying',
    '幽灵' = 'Ghost',
    '草' = 'Grass',
    '地面' = 'Ground',
    '冰' = 'Ice',
    '一般' = 'Normal',
    '毒' = 'Poison',
    '超能力' = 'Psychic',
    '岩石' = 'Rock',
    '钢' = 'Steel',
    '水' = 'Water',
}
</script>

<template>
    <div class="poke-item">
        <div class="item-content">
            <div class="item-infos" :class="types[poke.type1]"
                :style="`background-image: url(/docs/pokemons/bg/${types[poke.type1]}.png)`">
                <div class="item-titles">
                    <h3>{{ poke.cnName }}</h3>
                </div>
                <img class="item-img" v-bind:src="`/docs/pokemons/pokes/${poke.img}`"
                    v-bind:class="'item-' + poke.shape" alt="" srcset="">
            </div>
            <div class="item-no">
                <h3>{{ poke.no }}</h3>
            </div>
            <div class="item-stats">
                <div class="item-total">
                    <span>{{ poke.stats }}</span>
                </div>
                <div class="item-stat item-hp">
                    <div class="item-rate" :style="`width: ${poke.HP * 100 / totalStat}%;`"></div>
                    <span>{{ poke.HP }}</span>
                </div>
                <div class="item-stat item-atk">
                    <div class="item-rate" :style="`width: ${poke.atk * 100 / totalStat}%;`"></div>
                    <span>{{ poke.atk }}</span>
                </div>
                <div class="item-stat item-def">
                    <div class="item-rate" :style="`width: ${poke.def * 100 / totalStat}%;`"></div>
                    <span>{{ poke.def }}</span>
                </div>
                <div class="item-stat item-spa">
                    <div class="item-rate" :style="`width: ${poke.spa * 100 / totalStat}%;`"></div>
                    <span>{{ poke.spa }}</span>
                </div>
                <div class="item-stat item-spd">
                    <div class="item-rate" :style="`width: ${poke.spd * 100 / totalStat}%;`"></div>
                    <span>{{ poke.spd }}</span>
                </div>
                <div class="item-stat item-spe">
                    <div class="item-rate" :style="`width: ${poke.spe * 100 / totalStat}%;`"></div>
                    <span>{{ poke.spe }}</span>
                </div>
            </div>
            <div class="item-types">
                <img class="item-type" v-bind:src="`/docs/pokemons/types/${types[poke.type1]}.png`">
                <img class="item-type" v-if="poke.type2" v-bind:src="`/docs/pokemons/types/${types[poke.type2]}.png`">
            </div>
        </div>
        <div class="item-shapes">
            <img class="item-shape" v-for="shape in poke.shapes"
                v-bind:src="'/docs/pokemons/shapes/' + shape.shapeCode + '.png'" v-on:click="changeShape(shape)" alt=""
                srcset="">
        </div>
    </div>
</template>

<style scoped lang="scss">
.poke-item {
    position: relative;
    width: 200px;
    height: 200px;

    .item-types {
        position: absolute;
        right: -10px;
        top: -15px;
        display: flex;
        column-gap: 3px;

        .item-type {
            width: 40px;
            border: 5px solid #000;
            border-radius: 50%;
        }

    }

    .item-content {
        position: relative;
        width: 200px;
        height: 200px;
        padding: 6px;
        border: 7px solid #000;
        background: #fff;
        box-shadow: 10px 1px 10px rgba(0, 0, 0, 0.3);
    }

    .item-no {
        position: absolute;
        left: 12px;
        top: 45px;
        color: #fff;
        font-size: 17px;
    }

    .item-stats {
        position: absolute;
        bottom: 12px;
        left: 12px;
        display: flex;
        flex-direction: column;
        gap: 2px;

        .item-stat {
            position: relative;
            width: 60px;
            height: 13px;
            font-size: 10px;
            text-align: right;
            background: #c4cecf7d;

            .item-rate {
                height: 100%;
            }

            span {
                position: absolute;
                top: 0;
                left: 0;
            }

            &.item-hp .item-rate {
                background: #89c654;
            }

            &.item-atk .item-rate {
                background: #f9cb3d;
            }

            &.item-def .item-rate {
                background: #da8837;
            }

            &.item-spa .item-rate {
                background: #59c3cf;
            }

            &.item-spd .item-rate {
                background: #5890cc;
            }

            &.item-spe .item-rate {
                background: #a456d1;
            }
        }
    }

    .item-infos {
        position: relative;
        width: 100%;
        height: 100%;
        color: #fff;
        border: 4px solid #000;
        border-radius: 10px;
        background: #d3da51;
        background-size: 100% 100%;

        .item-titles {
            padding: 2px 5px;
            color: #fff;
            font-weight: 700;
            border-radius: 5px 5px 0 0;
            border-bottom: 4px solid #000;
        }

        &.Bug {
            .item-titles {
                background: #91a119;
            }
        }

        &.Dark {
            .item-titles {
                background: #50413f;
            }
        }

        &.Dragon {
            .item-titles {
                background: #5060e1;
            }
        }

        &.Electric {
            .item-titles {
                background: #fac000;
            }
        }

        &.Fairy {
            .item-titles {
                background: #ef70ef;
            }
        }

        &.Fighting {
            .item-titles {
                background: #ff8000;
            }
        }

        &.Fire {
            .item-titles {
                background: #e62829;
            }
        }

        &.Flying {
            .item-titles {
                background: #81b9ef;
            }
        }

        &.Ghost {
            .item-titles {
                background: #704170;
            }
        }

        &.Grass {
            .item-titles {
                background: #3fa129;
            }
        }

        &.Ground {
            .item-titles {
                background: #915121;
            }
        }

        &.Ice {
            .item-titles {
                background: #3fd8ff;
            }
        }


        &.Normal {
            .item-titles {
                background: #9fa19f;
            }
        }

        &.Poison {
            .item-titles {
                background: #9141cb;
            }
        }

        &.Psychic {
            .item-titles {
                background: #ef4179;
            }
        }

        &.Rock {
            .item-titles {
                background: #afa981;
            }
        }

        &.Steel {
            .item-titles {
                background: #60a1b8;
            }
        }

        &.Water {
            .item-titles {
                background: #2980ef;
            }
        }

    }

    .item-img {
        position: absolute;
        bottom: 0px;
        right: -20px;
        width: 155px;
        height: 155px !important;
        object-fit: cover;
        z-index: 1;

        &.item-dynamax {
            transform: scale(1.1);
        }
    }

    .item-gif {
        position: absolute;
        bottom: 0;
        width: unset;
        height: 32px;
    }

    .item-infos:hover .item-img {
        animation: jump 1.5s infinite;
    }

    .item-shapes {
        cursor: pointer;
        position: absolute;
        bottom: 5px;
        right: 0px;
        display: flex;
        flex-direction: column;
        row-gap: 3px;
        opacity: 0;

        .item-shape {
            width: 25px;
            height: 25px;
            padding: 2px;
            border-bottom-right-radius: 10px;
            border: 2px solid #000;
            background: #fff;
        }
    }

    &:hover .item-shapes {
        animation: showShapes 0.6s forwards;
    }
}

@keyframes jump {
    0% {
        transform: translate(0px, 0px) rotateZ(0deg);
        animation-timing-function: ease-out;
    }

    30% {
        transform: translate(0px, -25px) rotateZ(8deg);
        animation-timing-function: ease-in;
    }

    50% {
        transform: translate(0px, 0px) rotateZ(0deg);
        animation-timing-function: ease-out;
    }

    70% {
        transform: translate(0px, -10px) rotateZ(-4deg);
        animation-timing-function: ease-in;
    }

    85% {
        transform: translate(0px, 0px) rotateZ(0deg);
    }

    100% {
        transform: translate(0px, 0px) rotateZ(0deg);
    }
}

@keyframes showShapes {
    0% {
        right: 0;
        opacity: 0;
    }

    100% {
        right: -22px;
        opacity: 1;
    }
}
</style>
