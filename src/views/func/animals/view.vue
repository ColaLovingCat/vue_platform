<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import * as db from './datas'

onMounted(() => {
    yongs.value = [...db.yonglist]
})

const yongs: any = ref([])
</script>

<template>
    <div class="contents">
        <a-tabs>
            <a-tab-pane key="1" tab="陶俑">
                <div class="list-yongs">
                    <div class="yong-item" v-for="item in yongs" :class="item.isActive ? '' : 'item-none'">
                        <img :src="`/docs/animals/yong/${item.img}`" alt="" srcset="">
                        <div class="item-name">{{ item.name }}</div>
                    </div>
                </div>
            </a-tab-pane>
        </a-tabs>

    </div>
</template>

<style scoped lang="scss">
.list-yongs {
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 20px;

    .yong-item {
        position: relative;

        img {
            width: 160px;
            height: 160px;
            border-radius: 10px;
            box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
        }

        .item-name {
            text-align: center;
        }

        &.item-none .item-name {
            padding: 5px 0;
            color: #fff;
            font-weight: 700;
            background: #f00;
        }
    }
}
</style>
