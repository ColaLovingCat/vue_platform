<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import type { Ref } from 'vue'
import * as db from './datas'

import monsters from './monster.vue'

onMounted(() => {
    datas.value = [...db.monsters]
})

const datas: any = ref([])
const dataShow = computed(() => {
    return datas.value
})
</script>

<template>
    <div class="contents">
        <div class="box-search">
            <div class="left">
                Total: {{ datas.length }}
            </div>
            <div class="right"></div>
        </div>
        <div class="list-monster">
            <div v-for="(monster) in dataShow">
                <monsters :data="monster"></monsters>
            </div>
        </div>
        <div class="box-maps">
        </div>
    </div>
</template>

<style scoped lang="scss">
.contents {
    background: url(/docs/games/posters/mhs2.png);
    background-size: 100% 100%;
}

.box-search {
    margin-bottom: 20px;
    padding: 0 20px;
    height: 40px;
    background: #ffffff7d;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
        font-size: 18px;
        font-weight: 700;
    }
}

.list-monster {
    padding: 20px 0;
    height: calc(100vh - 150px);
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 15px;
    row-gap: 15px;
}
</style>
