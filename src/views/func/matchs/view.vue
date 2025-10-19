<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import swissView from './swiss.vue'
import tournamentView from './tournament.vue'
import * as db from './datas'

// name
defineOptions({
  name: 'custom-name'
})

const pageInfos = reactive({
  tabs: [] as any[],
  //
  name: '',
  type: 'swiss',
  rounds: [] as any[],
  winners: [] as any[],
  losers: [] as any[],
})

onMounted(() => {
  db.list.map((item: any) => {
    pageInfos.tabs.push({
      name: item.name,
    })
  })
  changeTab(pageInfos.tabs[0])
})

const changeTab = (values: any) => {
  let temp = db.list.find((a: any) => a.name == values.name)
  if (temp) {
    pageInfos.name = temp.name
    pageInfos.type = temp.type
    //
    pageInfos.rounds = temp.rounds
    pageInfos.winners = temp.winners
    pageInfos.losers = temp.losers
  }
}
</script>

<template>
  <div class="sections">
    <div class="list-tabs">
      <template v-for="tab in pageInfos.tabs">
        <div class="tab-item" @click="changeTab(tab)" :class="{ active: pageInfos.name == tab.name }">
          <div class="item-icon"></div>
          <div class="item-name">{{ tab.name }}</div>
        </div>
      </template>
    </div>
    <div class="section-contents">
      <template v-if="pageInfos.type == 'swiss'">
        <swissView :rounds="pageInfos.rounds"></swissView>
      </template>
      <template v-if="pageInfos.type == 'tournament'">
        <tournamentView :rounds="pageInfos.rounds"></tournamentView>
      </template>
      <template v-if="pageInfos.type == 'doubles'">
        <tournamentView :rounds="pageInfos.winners"></tournamentView>
        <div class="lines"></div>
        <tournamentView :rounds="pageInfos.losers"></tournamentView>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sections {
  background: #000;

  .section-contents {
    height: calc(100vh - 120px);
    overflow-y: auto;
  }
}

.list-tabs {
  display: flex;
  gap: 10px;

  .tab-item {
    cursor: pointer;
    padding: 3px 5px;
    color: #fff;
    border-radius: 4px;

    &.active {
      background: #0094ff;
    }
  }
}

.lines {
  height: 50px;
}
</style>
