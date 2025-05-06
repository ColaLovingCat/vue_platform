<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'

import * as XLSX from 'xlsx'
import switchs from './switch.vue'

onMounted(async() => {
  let temps: any = await readExcel()
  datas.value = [...temps.games]
})

const readExcel = async () => {
  try {
    // 动态导入Excel文件
    const response = await fetch(new URL('/docs/datas/games.xlsx', import.meta.url).href)
    const arrayBuffer = await response.arrayBuffer()

    // 解析Excel数据
    const data = new Uint8Array(arrayBuffer)
    const workbook = XLSX.read(data, { type: 'array' })

    // 获取第一个工作表的数据
    const games = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])

    return { games }
  } catch (error) {
    console.error('读取Excel文件失败:', error)
  }
  return {}
}

const datas: any = ref([])
</script>

<template>
    <div class="contents">
        <div class="box-search">
            <div class="left">
                Total: {{ datas.length }}
            </div>
            <div class="right"></div>
        </div>
        <div class="list-games">
            <div v-for="game in datas">
                <switchs :data="game"></switchs>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.contents {
    background: url(/docs/games/consoles/bg.jpg);
    background-size: 100% 100%;
}

.box-search {
    margin-bottom: 20px;
    padding: 0 20px;
    height: 40px;
    color: #fff;
    background: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
        font-size: 18px;
        font-weight: 700;
    }
}

.list-games {
    height: calc(100vh - 150px);
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 20px;
    row-gap: 20px;
}
</style>
