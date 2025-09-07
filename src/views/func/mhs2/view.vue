<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'

import * as db from './datas'
import monsters from './monster.vue'

const datas: any = ref([])
const changeMark = ref(false)

const searchInfos = reactive({
    text: '',
})
const dataShow = computed(() => {
    let result: any = []
    if (searchInfos.text != '') {
        result = datas.value.filter((a: any) => a.name.indexOf(searchInfos.text) > -1)
    } else {
        result = [...datas.value]
    }
    return result
})

onMounted(() => {
    datas.value = [...db.monsters]
})
</script>

<template>
    <div class="sections">
        <div class="box-search">
            <div class="left">
                <div class="logo">
                    <img src="/docs/mhs2/comps/logo.jpg" alt="" srcset="">
                </div>
                <span>Total: {{ datas.length }}</span>
            </div>
            <div class="right">
                <a-input v-model:value="searchInfos.text" placeholder="search" @change="changeMark = !changeMark" />
            </div>
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
@import url(../com/search.scss);

.sections {
    display: block;
    background: url(/docs/games/covers/Monster_Hunter_Stories_2.jpg);
    background-size: 100% 100%;

    .logo {
        width: 215px;
        height: 85px;
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
