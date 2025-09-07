<script setup lang="ts">
import { onMounted, ref, reactive, computed, watch } from 'vue'

import listView from './list.vue'

// name
defineOptions({
  name: 'app-home'
})

onMounted(() => { })
</script>

<template>
  <div class="sections">
    <listView></listView>
  </div>
</template>

<style scoped lang="scss"></style>
