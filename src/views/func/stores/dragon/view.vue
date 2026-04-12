<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import * as db from './datas'

onMounted(() => {
    datas.value = [...db.characters]
})

const datas: any = ref([])
</script>

<template>
    <div class="contents">
        <div class="list-characters">
            <div class="character-item" v-for="item in datas">
                <div class="item-img">
                    <img :src="`/docs/dragonball/characters/${item.img}`" alt="" srcset="">
                </div>
                <div class="item-name">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.list-characters {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 20px;
    column-gap: 20px;

    .character-item {
        width: 300px;
        height: 500px;

        .item-img {
            width: 300px;
            height: 500px;
            
            img {
                object-fit: contain;
            }
        }
    }
}
</style>
