<script setup lang="ts">
import { onMounted, ref, reactive, computed, watch } from 'vue'

import { useRouter } from "vue-router";
const router = useRouter();
const pageGo = (name: string) => {
  router.push({
    name: name,
  });
};

// name
defineOptions({
  name: 'app-home'
})

onMounted(() => {
})

const datas: any = ref([
  { title: "F1", path: 'f1', img: 'f1.jpg' },
  { title: "游戏库", path: 'games', img: 'switch.jpg' },
  { title: "Pokémon", path: 'pokes', img: 'pokemon.png' },
  { title: "怪猎物语2", path: 'mhs2', img: 'mhs2.png' },
  { title: "动物森友会", path: 'animals', img: 'animal.png' },
  { title: "书架", path: 'books', img: 'books.jpg' },
  { title: "动漫", path: 'cartoons', img: 'cartoon.png' },
  { title: "龙珠", path: 'dragon', img: 'dragonball.jpeg' },
  { title: "假面骑士", path: 'icons', img: 'riders.jpg' },
  { title: "英雄联盟", path: 'list/lol', img: 'lol.jpg' },
  { title: "Dota2", path: 'list/dota2', img: 'dota2.jpg' },
  { title: "CS GO", path: 'list/csgo', img: 'csgo.jpg' },
  { title: "M-League", path: 'list/majiang', img: 'majiang.jpg' },
  { title: "公司", path: 'list/company', img: 'company.jpg' },
])
</script>

<template>
  <div class="sections">
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
