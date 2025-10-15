<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

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
  currentTab: '',
  tabs: [
    { name: 'S15', path: '/matchs/LOLS15' },
  ],
})

onMounted(() => { })

const jump = (values: any) => {
  pageInfos.currentTab = values.name
  pageGo(values.path, {})
}
</script>

<template>
  <div class="sections">
    <div class="list-tabs">
      <template v-for="tab in pageInfos.tabs">
        <div class="tab-item" @click="jump(tab)" :class="{ active: pageInfos.currentTab == tab.name }">
          <div class="item-icon"></div>
          <div class="item-name">{{ tab.name }}</div>
        </div>
      </template>
    </div>
    <div class="section-contents">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
