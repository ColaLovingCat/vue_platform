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

const datas: any = ref([
    { title: "文章", path: 'articles', img: 'article.png' },
    { title: "F1", path: 'f1', img: 'f1.jpg' },
    { title: "Pokémon", path: 'pokes', img: 'pokemon.png' },
    { title: "怪猎物语2", path: 'mhs2', img: 'mhs2.png' },
    { title: "Amiibo", path: 'amiibo', img: 'amiibo.jpg' },
    { title: "游戏库", path: 'games', img: 'switch.jpg' },
    { title: "动物森友会", path: 'animals', img: 'animal.png' },
    { title: "书架", path: 'books', img: 'books.jpg' },
    { title: "动漫", path: 'cartoons', img: 'cartoon.png' },
    { title: "机动战士高达", path: 'gundam', img: 'gundam.jpg' },
    { title: "龙珠", path: 'dragon', img: 'dragonball.jpeg' },
    { title: "假面骑士", path: 'icons', query: { type: "riders" }, img: 'riders.jpg' },
    { title: "英雄联盟", path: 'icons', query: { type: "lol" }, img: 'lol.jpg' },
    { title: "Dota2", path: 'icons', query: { type: "dota2" }, img: 'dota2.jpg' },
    { title: "CS GO", path: 'icons', query: { type: "csgo" }, img: 'csgo.jpg' },
    { title: "M-League", path: 'icons', query: { type: "majiang" }, img: 'majiang.jpg' },
    { title: "公司", path: 'icons', query: { type: "company" }, img: 'company.jpeg' },
    { title: "排序", path: 'sort', img: 'calc.png' },
    { title: "壁纸", path: 'wallpapers', img: 'wallpaper.jpg' },
    { title: "单机-扫雷", path: 'games-mine', img: 'mine.jpg' },
    { title: "单机-九宫格", path: 'games-puzzle', img: 'puzzle.jpg' },
    { title: "单机-贪吃蛇", path: 'games-snake', img: 'snake.png' },
    { title: "单机-21点", path: 'games-blackjack', img: 'blackjack.png' },
    { title: "单机-俄罗斯方块", path: 'games-tetris', img: 'tetris.png' },
    { title: "单机-恐龙快跑", path: 'games-t-rex', img: 't-rex.jpeg' },
    { title: "单机-消消乐", path: 'games-xiaoxiaole', img: 'xiaoxiaole.jpg' },
    { title: "五子棋", path: 'games-wuzi', img: 'wuzi.jpg' },
])

onMounted(() => { })
</script>

<template>
    <div class="list">
        <div class="wiki-item" v-for="item in datas" @click="pageGo(item.path, item.query)">
            <img :src="`/docs/covers/${item.img}`" alt="" srcset="">
            <div class="item-titles">{{ item.title }}</div>
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
