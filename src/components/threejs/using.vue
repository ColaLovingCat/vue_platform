<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import threeView from './view.vue'

// name
defineOptions({
  name: 'three-using'
})

onMounted(() => { })

const onChange = (event: any) => {
  console.log('Testing: ', event)
}
</script>

<template>
  <div class="box-model">
    <threeView @changed="onChange"></threeView>
  </div>
</template>

<style scoped lang="scss">
.box-model {
  position: relative;
  width: 100%;
  height: calc(100vh - 66px);
  overflow: hidden;
}
</style>
