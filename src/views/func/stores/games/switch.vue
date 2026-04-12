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
        const game: any = reactive(props.data || {})

        onMounted(() => { })

        return {
            game
        }
    }
})
</script>

<template>
    <div class="game-item">
        <div class="item-cover">
            <img :src="`/docs/games/covers/${game.cover}`" alt="" srcset="">
        </div>
        <div class="item-console">
            <img src="/docs/games/consoles/nintendo_switch.png" alt="" srcset="">
        </div>
        <div class="item-symbols">
            <div class="symbol-card" v-if="game.hasCard">
                <img src="/docs/games/consoles/card.png" alt="" srcset="">
            </div>
            <div class="symbol-finish" v-if="game.isFinish">
                <img src="/docs/games/consoles/award.png" alt="" srcset="">
            </div>
        </div>
        <div class="item-infos">
            <h4 class="titles">{{ game.name }}</h4>
        </div>
    </div>
</template>

<style scoped lang="scss">
.game-item {
    position: relative;
    border: 5px solid #fff;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
    border-radius: 0 10px 10px 0;
    overflow: hidden;

    .item-cover {
        width: 235px;
        height: 350px;

        img {
            object-fit: cover;
        }
    }

    .item-console {
        position: absolute;
        top: 0;
        left: 0;
        width: 55px;
    }

    .item-symbols {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;

        .symbol-card {
            padding: 5px 10px;
            width: 40px;
        }

        .symbol-finish {
            padding: 3px;
            width: 40px;
            background: #0000003d;
        }
    }

    .item-infos {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 50px 10px 10px 10px;
        color: #fff;
        background: linear-gradient(to top, #000000, #00000000);

        .titles {
            font-size: 18px;
            font-weight: 700;
        }
    }
}
</style>
