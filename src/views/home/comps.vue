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
    { title: "学习卡片", path: 'study-list', img: 'study.png' },
    { title: "文章", path: 'articles', img: 'article.png' },
    { title: "查询", path: 'query', img: 'seo.png' },
    { title: "壁纸", path: 'wallpapers', img: 'wallpaper.jpg' },
    { title: "F1", path: 'f1', img: 'f1.jpg' },
    { title: "电竞赛事", path: 'matchs', img: 'matchs.png' },
    { title: "Pokémon", path: 'pokes', img: 'pokemon.png' },
    { title: "怪猎物语2", path: 'mhs2', img: 'mhs2.png' },
    { title: "怪猎物语3", path: 'mhs3', img: 'mhs3.jpg' },
    { title: "动物森友会", path: 'animals', img: 'animal.png' },
    { title: "Amiibo", path: 'amiibo', img: 'amiibo.jpg' },
    { title: "单机游戏", path: 'games-platform', img: 'games.png' },
    { title: "Dota2", path: 'dota2', img: 'dota2.jpg' },
    { title: "游戏库", path: 'games', img: 'switch.jpg' },
    { title: "书架", path: 'books', img: 'books.jpg' },
    { title: "动漫", path: 'cartoons', img: 'cartoon.png' },
    { title: "龙珠", path: 'dragon', img: 'dragonball.jpeg' },
    { title: "机动战士高达", path: 'gundam', img: 'gundam.jpeg' },
    { title: "假面骑士", path: 'icons', query: { type: "riders" }, img: 'riders.jpg' },
    { title: "英雄联盟", path: 'icons', query: { type: "lol" }, img: 'lol.jpg' },
    { title: "Dota2", path: 'icons', query: { type: "dota2" }, img: 'dota2.jpg' },
    { title: "CS GO", path: 'icons', query: { type: "csgo" }, img: 'csgo.jpg' },
    { title: "M-League", path: 'icons', query: { type: "majiang" }, img: 'majiang.jpg' },
    { title: "公司", path: 'icons', query: { type: "company" }, img: 'company.jpeg' },
])

onMounted(() => { })
</script>

<template>
    <div class="entertainment-wrapper">
        <div class="list">
            <div class="wiki-item" v-for="(item, index) in datas" :key="index" @click="pageGo(item.path, item.query)"
                :style="{ '--order': index }">
                <!-- 装饰性光晕背景 -->
                <div class="item-glow"></div>

                <div class="card-content">
                    <div class="img-wrapper">
                        <img :src="`/docs/covers/${item.img}`" alt="">
                        <!-- 右上角小标签增加可爱度 -->
                        <div class="tag">GO!</div>
                    </div>

                    <div class="info">
                        <span class="title">{{ item.title }}</span>
                        <div class="decoration">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.entertainment-wrapper {
    padding: 40px 20px;
    display: flex;
    justify-content: center;
}

.list {
    display: grid;
    // 紧凑布局：卡片宽度减小到 280px，间距减小
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
    width: 100%;
    max-width: 1200px;
}

.wiki-item {
    position: relative;
    cursor: pointer;
    // --- 静态动画：呼吸浮动 ---
    // 通过 --order 偏移动画时间，让卡片看起来此起彼伏
    animation: float-card 4s ease-in-out infinite;
    animation-delay: calc(var(--order) * -0.5s);

    .item-glow {
        position: absolute;
        top: 10%;
        left: 10%;
        width: 80%;
        height: 80%;
        background: rgba(100, 180, 255, 0.15);
        filter: blur(30px);
        border-radius: 20px;
        transition: 0.5s;
        z-index: 0;
    }

    .card-content {
        position: relative;
        z-index: 1;
        background: #fff;
        border-radius: 20px;
        padding: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(0, 0, 0, 0.03);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.5); // 果冻效果
    }

    .img-wrapper {
        position: relative;
        width: 100%;
        height: 160px; // 高度减小更紧凑
        overflow: hidden;
        border-radius: 14px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s;
        }

        .tag {
            position: absolute;
            top: 8px;
            right: 8px;
            background: linear-gradient(135deg, #ffdb58 0%, #ffc107 100%);
            color: #333;
            padding: 3px 12px;
            border-radius: 20px 20px 5px 20px; // 不规则圆角更显俏皮
            font-size: 11px;
            font-weight: 900;
            box-shadow: 0 4px 10px rgba(255, 219, 88, 0.4);
            pointer-events: none; // 防止标签干扰点击图片

            // 动画核心
            opacity: 0;
            transform: scale(0.5) translateY(10px);
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
    }

    .info {
        margin-top: 12px;
        padding: 0 5px 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 18px;
            font-weight: 700;
            color: #444;
            transition: 0.3s;
        }

        .decoration {
            display: flex;
            gap: 3px;

            span {
                width: 6px;
                height: 6px;
                background: #eee;
                border-radius: 50%;
                transition: 0.3s;
            }
        }
    }

    // --- 鼠标悬停交互 ---
    &:hover {
        animation-play-state: paused; // 悬停时停止浮动，聚焦交互

        .card-content {
            transform: translateY(-5px) scale(1.03);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
            border-color: #64b5f6;
        }

        .item-glow {
            background: rgba(100, 180, 255, 0.4);
            transform: scale(1.2);
        }

        .img-wrapper img {
            transform: scale(1.1);
        }

        .tag {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(-5deg); // 悬停时微微向左倾斜
        }

        .info {
            .title {
                color: #1976d2;
            }

            .decoration span {
                background: #64b5f6;

                &:nth-child(2) {
                    transform: translateY(-5px);
                    background: #ff7043;
                }
            }
        }
    }

    // 点击时的回弹感
    &:active {
        .card-content {
            transform: scale(0.95);
        }
    }
}

// 静态浮动动画定义
@keyframes float-card {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    33% {
        transform: translateY(-6px) rotate(1deg);
    }

    66% {
        transform: translateY(-3px) rotate(-1deg);
    }
}
</style>