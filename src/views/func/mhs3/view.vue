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
    let result: any[] = datas.value
    
    const searchText = searchInfos.text.trim().toLowerCase();
    if (searchText) {
        result = result.filter((item: any) =>
            item.name.toLowerCase().includes(searchText)
        )
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
                    <img src="/docs/mhs2/comps/logo_title.png" alt="" srcset="">
                </div>
                <span>Total: {{ datas.length }}</span>
            </div>
            <div class="right">
                <a-input v-model:value="searchInfos.text" placeholder="search" @change="changeMark = !changeMark" />
            </div>
        </div>
        <div class="list-monster">
            <div v-for="(monster) in dataShow">
                <monsters :data="monster" :key="monster.index"></monsters>
            </div>
        </div>
        <div class="box-maps">
        </div>
    </div>
</template>

<style scoped lang="scss">
@import url(@/views/func/com/search.scss);

.sections {
    display: block;
    background: url(/docs/games/covers/Monster_Hunter_Stories_3.jpg);
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
    flex-direction: column;
    row-gap: 15px;
}
</style>
