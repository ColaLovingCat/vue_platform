<script lang="ts">
import { ref, reactive, onMounted, defineComponent, computed, watch } from 'vue'
import type { Ref } from 'vue'

export default defineComponent({
    props: {
        data: {
            type: Object
        }
    },
    components: {},
    emits: [],
    setup(props, { emit }) {
        const monster: any = reactive(props.data || {})

        onMounted(() => { })

        watch(
            () => props.data,
            (newValue, oldValue) => { }
        )

        const getWeakness = (type: string) => {
            switch (type) {
                case "power":
                    return "speed"
                case "skill":
                    return "power"
                case "speed":
                    return "skill"
            }
        }

        return {
            monster,
            getWeakness,
        }
    }
})
</script>

<template>
    <div class="monster-item">
        <img class="img-egg" v-bind:src="`/docs/mhs2/monsters/${monster.index}/egg.svg`" alt="">
        <div class="item-name">
            <img class="thumb" v-bind:src="`/docs/mhs2/monsters/${monster.index}/thumb.png`" alt="" />
            <div class="name">{{ monster.index }} {{ monster.name }}</div>
            <div class="category">{{ monster.category }}</div>
        </div>
        <div class="item-imgs">
            <img class="img-photo" v-bind:src="`/docs/mhs2/monsters/${monster.index}/photo.png`" alt="">
        </div>
        <div class="item-contents">
            <div class="item-left">
                <div class="titles">行动</div>
                <div class="item-actions">
                    <div class="acton-item" v-for="action in monster.actions">
                        <div class="item-action">{{ action.status }}</div>
                        <div class="item-type">
                            <img v-bind:src="`/docs/mhs2/skills/${action.type}.svg`" alt="" srcset="">
                        </div>
                        <i class="fa-solid fa-angles-left"></i>
                        <div class="item-type">
                            <img v-bind:src="`/docs/mhs2/skills/${getWeakness(action.type)}.svg`" alt="" srcset="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-right">
                <div class="titles">部位弱点</div>
                <div class="item-parts">
                    <div class="part-item" v-for="part in monster.parts">
                        <div class="item-part">{{ part.part }}</div>
                        <i class="fa-solid fa-angles-left"></i>
                        <div class="item-part">{{ part.type }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.monster-item {
    position: relative;
    width: 340px;
    height: 430px;
    padding: 10px;
    border: 4px solid #000;
    border-radius: 8px;
    background: #fff;

    .titles {
        width: 100px;
        margin-bottom: 10px;
        padding: 7px;
        color: #fff;
        border-radius: 10px;
        background: #1F1200;
    }

    .img-egg {
        position: absolute;
        top: -25px;
        right: -25px;
        z-index: 1;
        width: 85px;
        height: 100px;
        border-radius: 40px;
    }

    .item-name {
        margin-bottom: 190px;
        padding-bottom: 5px;
        border-bottom: 2px solid #000;
        display: flex;
        align-items: center;
        column-gap: 10px;
    }

    .thumb {
        width: 30px;
        height: 30px;
    }

    .name {
        font-size: 23px;
        font-weight: 700;
    }

    .category {
        padding: 2px 4px;
        color: #fff;
        font-size: 14px;
        border-radius: 7px;
        background: #c4cecf;
    }

    .item-imgs {
        position: absolute;
        top: 35px;
        width: 345px;
        height: 180px;
        z-index: 0;
        transition: 0.6s;

        img {
            width: unset;
        }
    }

    &:hover .item-imgs {
        z-index: 10;
        transform: scale(1.2);
    }


    .item-contents {
        display: flex;
        column-gap: 10px;
    }

    .item-actions {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
    }

    .acton-item,
    .part-item {
        display: flex;
        align-items: center;
        column-gap: 10px;
    }

    .item-type {
        width: 40px;
        height: 40px;
    }

    .item-type img {
        border-radius: 50%;
    }
}
</style>
