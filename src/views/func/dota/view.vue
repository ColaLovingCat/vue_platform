<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import heroView from './hero.vue'

import * as datas from './datas'

// name
defineOptions({
    name: 'custom-name'
})

const heros: any = ref([])

onMounted(() => { 
    heros.value = datas.heros
})

</script>

<template>
    <div class="hero-list">
        <hero-view v-for="hero in heros" :key="hero.name" :hero="hero"></hero-view>
    </div>
</template>

<style scoped lang="scss"></style>
