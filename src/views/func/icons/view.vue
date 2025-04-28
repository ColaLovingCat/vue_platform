<script setup lang="ts">
import { ref, onMounted } from 'vue'

import * as db from './datas'

onMounted(() => {
    datas.value = [...db.datas.riders]
})

const datas: any = ref([])
</script>

<template>
    <div class="contents">
        <div class="box-search">
            <div class="logo">
            </div>
            <div class="left">
                Total: {{ datas.length }}
            </div>
            <div class="right">
            </div>
        </div>
        <div class="list">
            <div class="item" v-for="item in datas">
                <img class="item-logo" :src="`/docs/logos/riders/${item.code}.png`" alt="" srcset="">
                <div class="item-name">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.contents {
    color: #fff;
    background: #000;
}

.list {
    padding: 10px 0;
    height: calc(100vh - 150px);
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    column-gap: 55px;
    row-gap: 15px;
}

.item {
    width: 260px;
    height: 260px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    row-gap: 20px;

    &:hover {
        background: #c4cecf;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    }

    .item-logo {
        width: 180px;
        height: 180px;
    }

    .item-name {
        font-size: 21px;
        font-weight: 700;
        text-align: center;
    }
}
</style>
