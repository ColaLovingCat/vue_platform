<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import * as db from './datas'

onMounted(() => {
    datas.value = [...db.list]
})

const pageGo = function (item: any) {
    if (item.url != '')
        window.open("http://192.168.31.250:8096/web/index.html#/details?serverId=00cd227394524f38981dabeb551db200&id=" + item.id, '_blank')
}

const datas: any = ref([])
</script>

<template>
    <div class="contents">
        <div class="list-company">
            <div class="company-item" v-for="company in datas">
                <div class="item-desc">
                    <h4 class="titles">{{ company.name }}</h4>
                </div>
                <div class="list-cartoon">
                    <div class="cartoon-item" v-for="cartoon in company.datas" v-on:click="pageGo(cartoon)">
                        <div class="item-poster">
                            <img v-bind:src="`/docs/cartoons/${cartoon.name}.png`" alt="" srcset="">
                        </div>
                        <div class="item-title">{{ cartoon.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.list-cartoon {
    display: flex;
    flex-wrap: wrap;
    column-gap: 15px;
    row-gap: 15px;
}

.cartoon-item {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
}

.item-poster {
    width: 175px;
    height: 270px;
    border-radius: 10px;
    overflow: hidden;
}

.item-poster img {
    width: 100%;
    height: 100%;
}

.item-title {
    text-align: center;
}
</style>
