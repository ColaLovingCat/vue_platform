<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import heroView from './hero.vue'

import * as datas from './datas'

// name
defineOptions({
    name: 'custom-name'
})

const heros: any = ref([])
const currentHero: any = ref(null)

onMounted(() => {
    heros.value = datas.heros
    currentHero.value = heros.value[0]
})

</script>

<template>
    <div class="box-hero">
        <div class="hero-view" v-if="currentHero">
            <hero-view :hero="currentHero"></hero-view>
        </div>
        <div class="hero-list">
            <div class="hero-item" v-for="hero in heros" :key="hero.name"
                :class="{ active: currentHero && currentHero.code === hero.code }" @click="currentHero = hero">
                <img :src="`/docs/dota2/heros/${hero.code}/cover.png`" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.box-hero {
    margin: 0 auto;
    padding: 20px;
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
}

.hero-list {
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .hero-item {
        width: 120px;
        height: 120px;
        cursor: pointer;
        border-radius: 8px;
        overflow: hidden;

        &.active {
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
            transform: scale(1.05);
            transition: all 0.3s ease;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;

            &:hover {
                transform: scale(1.1);
            }
        }
    }
}
</style>
