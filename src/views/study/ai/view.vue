<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import codeView from "@/components/editor-code/view.vue";
import noteView from "../comps/note-card.vue";

import * as extend from "@/commons/utils/extends";

import * as db from "./datas";
import md from "@/components/chats/markdown/markdown";

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

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    activeId.value = id;

                    const el = document.querySelector(`.menus li[data-id="${id}"]`);
                    if (el) {
                        el.scrollIntoView({
                            block: "nearest",
                            behavior: "smooth",
                        });
                    }
                }
            });
        },
        { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    );

    contentRef.value
        .querySelectorAll("div[id]")
        .forEach((el) => observer.observe(el));

    const divs = contentRef.value.querySelectorAll<HTMLElement>("div[id]");
    divs.forEach((div) => {
        div.addEventListener("click", () => {
            const id = div.id;
            visibleNotes.value = notes.list.filter((note: any) => note.id === id);
        });

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

const chapters = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
</script>

<template>
    <div class="sections">
        <div class="study-contents">
            <div class="left">
                <div class="content" ref="contentRef">
                    <div class="header">
                        <h1 id="main-title">{{ db.infos.topic }}</h1>
                        <p class="desc">{{ db.infos.desc }}</p>
                    </div>
                    <template v-for="(chapter, cIndex) in db.infos.contents">
                        <h2 id="chapter-01">{{ chapters[cIndex] }}、 {{ chapter.chapter }}</h2>
                        <template v-for="(part, pIndex) in chapter.list">
                            <h3 id="part-0101">{{ pIndex + 1 }}. {{ part.part }}</h3>
                            <div class="part-contents">
                                <template v-for="(section, sIndex) in part.list">
                                    <div id="section-010101">
                                        <h4>{{ pIndex + 1 }}.{{ sIndex + 1 }} {{ section.section }}</h4>
                                        <div class="sub-contents">
                                            <p class="markdown-contents" v-html="md.render(section.content)"></p>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </template>
                    </template>
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
