<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import swissView from './swiss.vue'
import * as db from './datas'

import { useRouter } from "vue-router";
const router = useRouter();
const pageGo = (path: string, query: any) => {
  router.push({
    path,
    query,
  });
};

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
})

onMounted(() => {
  db.list.map((item: any) => {
    pageInfos.tabs.push({
      name: item.name,
    })
  })
})

const changeTab = (values: any) => {
  let temp = db.list.find((a: any) => a.name == values.name)
  if (temp) {
    pageInfos.name = temp.name
    pageInfos.type = temp.type
    pageInfos.rounds = temp.rounds
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
      <swissView :rounds="pageInfos.rounds"></swissView>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sections {
  background: #000;
}

.list-tabs {
  display: flex;
  gap: 10px;

  .tab-item {
    color: #fff;
  }
}
</style>
