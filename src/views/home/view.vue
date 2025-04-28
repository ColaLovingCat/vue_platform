<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import * as db from './datas'

import { useRouter } from "vue-router";
const router = useRouter();
const pageGo = (name: string) => {
    router.push({
        name: name,
    });
};

onMounted(() => {
    datas.value = [...db.list]
})

const datas: any = ref([])
</script>

<template>
  <div class="contents">
    <div class="list">
      <div class="wiki-item" v-for="item in datas" @click="pageGo(item.path)">
        <img :src="`/docs/covers/${item.img}`" alt="" srcset="">
        <div class="item-titles">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list {
  width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  column-gap: 30px;
  row-gap: 30px;

  .wiki-item {
    cursor: pointer;
    position: relative;
    width: 400px;
    height: 200px;
    overflow: hidden;
    border-radius: 15px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item-titles {
      position: absolute;
      left: 15px;
      bottom: 15px;
      color: #fff;
      font-size: 21px;
      font-weight: 700;
      transition: 0.6s;
    }

    &:hover {
      .item-titles {
        font-size: 25px;
      }
    }
  }
}
</style>
