<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import codeView from "@/components/editor-code/view.vue";
import noteView from "../comps/note-card.vue";

import * as extend from "@/commons/utils/extends";

import * as db from "./datas";

// name
defineOptions({
    name: 'custom-name'
})

const notes = reactive({
    list: [] as any[],
})
const pageInfos = reactive({
    menus: [] as any[],
    notes: [] as any[],
})

const nos = ['A', 'B', 'C', 'D']

const contentRef = ref<HTMLElement>()

const activeId = ref<string>("")
const visibleNotes = ref<any[]>([])

const codeConfig = (language: string) => {
    return {
        language,
        theme: "vs-dark",
        readOnly: true,
    };
};

onMounted(() => {
    refreshMenus()
})

const refreshMenus = () => {
    if (!contentRef.value) return;

    const headers = contentRef.value.querySelectorAll("h1, h2, h3, h4");
    const menus: typeof pageInfos.menus = [];

    headers.forEach((header) => {
        // 先取自身的 id，没有的话取父级的 id
        let id = header.id || header.parentElement?.id || "";
        const text = header.textContent?.trim() || "";

        let level = 1;
        switch (header.tagName.toLowerCase()) {
            case "h1":
                level = 1;
                break;
            case "h2":
                level = 2;
                break;
            case "h3":
                level = 3;
                break;
            case "h4":
                level = 4;
                break;
        }

        if (id) menus.push({ id, text, level });
    });

    pageInfos.menus = menus;

    // 更新滚动监听（目录高亮）
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    activeId.value = id;

                    // 让对应的菜单项始终可见
                    const el = document.querySelector(`.menus li[data-id="${id}"]`);
                    if (el) {
                        el.scrollIntoView({
                            block: "nearest", // 保证只滚动到刚好可见，不会整个容器跳动
                            behavior: "smooth",
                        });
                    }
                }
            });
        },
        { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    );

    // 监听 div[id]（不监听 h1/h2/h3/h4）
    contentRef.value
        .querySelectorAll("div[id]")
        .forEach((el) => observer.observe(el));

    const divs = contentRef.value.querySelectorAll<HTMLElement>("div[id]");
    divs.forEach((div) => {
        // 绑定点击事件
        div.addEventListener("click", () => {
            const id = div.id;
            visibleNotes.value = notes.list.filter((note:any) => note.id === id);
        });

        // 自动在标题后加题目数
        const h4 = div.querySelector("h4");
        if (h4 && notesCountMap.value[div.id]) {
            const span = document.createElement("span");
            span.textContent = ` [${notesCountMap.value[div.id]}]`;
            h4.appendChild(span);
        }
    });
};
const notesCountMap = computed(() => {
    const map: Record<string, number> = {};
    pageInfos.notes.forEach((note) => {
        if (note.id) {
            map[note.id] = (map[note.id] || 0) + 1;
        }
    });
    return map;
});
function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const noteModal = ref(false);
const noteInfos = reactive({
    id: "section-01",
    type: "topic",
    title: "例题-sample",
    question: "___。",
    imgs: [],
    options: [["", "", "", ""]],
    answer: "",
    notes: "",
});
const nextNote = () => {
    const index = extend.ExNumber.createRand(0, notes.list.length - 1);
    Object.assign(noteInfos, notes.list[index]);
};

const showModal = (action: string, values: any) => {
    switch (action) {
        case "note": {
            Object.assign(noteInfos, values);
            noteModal.value = true;
            break;
        }
        default: {
            break;
        }
    }
};
</script>

<template>
    <div class="sections">
        <div class="study-contents">
            <div class="left">
                <div class="content" ref="contentRef">
                    <div class="header">
                        <h1 id="main-title">Unity</h1>
                        <p class="desc">desc</p>
                    </div>
                    <h2 id="chapter-01">一 初始化</h2>
                    <h3 id="part-0101">1. 项目</h3>
                    <div class="part-contents">
                        <div id="section-010101">
                            <h4>1.1 软件界面</h4>
                            <div class="sub-contents">
                                <img src="/docs/study/unity/001.png" alt="" srcset="">
                            </div>
                        </div>
                        <div id="section-010102">
                            <h4>1.2 目录</h4>
                            <div class="sub-contents">
                                <p>Assets/</p>
                                <p>├─ Animation/           # 动画资源</p>
                                <p>│   ├─ .anim            # 动画剪辑</p>
                                <p>│   └─ AnimatorController</p>
                                <p>├─ Audios/              # 音频</p>
                                <p>│   ├─ BGM/             # 背景音乐</p>
                                <p>│   └─ SFX/             # 音效</p>
                                <p>├─ Materials/           # 材质</p>
                                <p>│   └─ .mat             # 材质文件</p>
                                <p>├─ Packages/            # Unity Package 管理</p>
                                <p>├─ Plugins/             # 第三方插件 / DLL</p>
                                <p>├─ Prefabs/             # 预制体</p>
                                <p>│   ├─ Characters/      # 角色预制体</p>
                                <p>│   ├─ Props/           # 道具 / 物件</p>
                                <p>│   └─ UI/              # UI 预制体</p>
                                <p>├─ Scenes/              # 场景</p>
                                <p>│   └─ .unity</p>
                                <p>├─ Scripts/             # 脚本</p>
                                <p>│   ├─ Controllers/     # 逻辑控制器</p>
                                <p>│   ├─ Managers/        # 游戏管理器</p>
                                <p>│   └─ UI/              # UI 脚本</p>
                                <p>├─ Settings/            # 项目设置</p>
                                <p>│   └─ Input System/    # 输入系统等</p>
                                <p>├─ Sprites/             # 2D 精灵</p>
                                <p>│   ├─ Characters/      # 角色精灵</p>
                                <p>│   └─ UI/              # UI 精灵</p>
                                <p>├─ Tilemaps/            # 瓦片地图对象</p>
                                <p>└─ Tiles/               # 瓦片资源</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="right">
                <!-- 补充信息 -->
                <div class="notes">
                    <div v-for="note in visibleNotes" :key="note.id" class="note-card">
                        <h4>
                            例题
                            <i class="fa-solid fa-eye" @click="showModal('note', note)"></i>
                        </h4>
                        <p v-if="note.type === 'text'">{{ note.content }}</p>
                        <div v-if="note.type === 'topic'">
                            <noteView :data="note"></noteView>
                        </div>
                    </div>
                </div>
                <!-- 目录 -->
                <div class="menus">
                    <ul>
                        <li v-for="item in pageInfos.menus" :key="item.id" :data-id="item.id"
                            :class="{ active: activeId === item.id }">
                            <a @click="scrollTo(item.id)" :class="`level-${item.level}`">
                                {{ item.text }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <a-modal v-model:open="noteModal" width="80vw" centered :footer="[]">
        <template #title>
            <div style="display:flex; justify-content:start; align-items:center; gap:10px;">
                <span>例题</span>
                <a-button size="small" @click="scrollTo(noteInfos.id)">索引知识点</a-button>
                <a-button size="small" @click="nextNote()">随机下一题</a-button>
            </div>
        </template>
        <div class="box-note">
            <noteView :data="noteInfos"></noteView>
        </div>
    </a-modal>
</template>

<style scoped lang="scss">
@import url("../comps/style.scss");
@import url("../comps/txt.scss");

img {
    height: unset;
}

.img-01 {
    position: absolute;
    top: 0;
    right: 20px;
    width: 320px;
}
</style>
