<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import labelView from './view.vue'

// name
defineOptions({
  name: 'label-using'
})

onMounted(() => { })

const imgUrl = ref('https://szhlinvma75.apac.bosch.com:59108/uploads/003d2de9-fb81-45f9-9966-42ae91981589_tmpni_plqr9.png')
const shapes: any = ref([])
const categorys: any = reactive([
  'MCU', 'PDU'
])
</script>

<template>
  <div class="sections">
    <div class="box-draw">
      <labelView mode="edit" :img-url="imgUrl" v-model:shapes="shapes" :categorys="categorys"></labelView>
    </div>
    <div class="list-shapes">
      <template v-for="item in shapes">
        <div class="shape-item">
          <span>{{ item.id }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sections {
  display: flex;

  .list-shapes {
    width: 300px;
  }

  .box-draw {
    flex: 1;
    overflow: auto;
  }
}
</style>
