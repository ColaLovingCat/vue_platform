<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue";
import { useRoute } from "vue-router"

import "./style.scss"

const articleHtml = ref<string>("")
const menus = ref<any[]>([])
const notes = ref<any[]>([])

const activeId = ref<string>("")
const contentRef = ref<HTMLElement>()

const currentNotes = computed(() =>
    notes.value.filter((n: any) => n.id === activeId.value)
)

const route = useRoute()
const category = route.query.category as string
// 动态导入
const contentModules = import.meta.glob("./*/contents.html", { as: "raw" })
const menuModules = import.meta.glob("./*/menus.ts", { eager: true })
const noteModules = import.meta.glob("./*/notes.ts", { eager: true })
async function loadData() {
    if (contentModules[`./${category}/contents.html`]) {
        articleHtml.value = await contentModules[`./${category}/contents.html`]()
    }
    if (menuModules[`./${category}/menus.ts`]) {
        menus.value = (menuModules[`./${category}/menus.ts`] as any).menus
    }
    if (noteModules[`./${category}/notes.ts`]) {
        notes.value = (noteModules[`./${category}/notes.ts`] as any).notes
    }
}

// 滚动监听
onMounted(async () => {
    await loadData()

    if (!contentRef.value) return
    const headers = contentRef.value.querySelectorAll("h1, h2, h3")

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activeId.value = entry.target.id
                }
            })
        },
        { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    )

    headers.forEach(h => observer.observe(h))
})

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}
</script>

<template>
    <div class="sections">
        <!-- 左侧主体 -->
        <div class="content" ref="contentRef" v-html="articleHtml"></div>

        <div class="right">
            <!-- 补充信息 -->
            <aside class="notes" v-if="currentNotes.length">
                <div v-for="note in currentNotes" :key="note.id" class="note-card">
                    <h4>{{ note.title }}</h4>
                    <p v-if="note.type === 'text'">{{ note.content }}</p>
                    <div v-if="note.type === 'example'">
                        <p class="question">{{ note.question }}</p>
                        <details>
                            <summary>查看答案</summary>
                            <p class="answer">{{ note.answer }}</p>
                        </details>
                    </div>
                </div>
            </aside>
            <!-- 目录 -->
            <aside class="menus">
                <ul>
                    <li v-for="item in menus" :key="item.id" :class="{ active: activeId === item.id }">
                        <a @click="scrollTo(item.id)">{{ item.text }}</a>
                    </li>
                </ul>
            </aside>
        </div>

    </div>
</template>

<style scoped>
.sections {
    display: flex;
    gap: 15px;

    .content {
        flex: 1;
    }

    .right {
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
}

.content {
    line-height: 1.6;
}

.notes {
    flex: 1;
}

.note-card {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    background: #fff;
}

.menus {
    padding: 10px;
    height: 300px;
    background: #fafafa;
    border: 1px solid #ddd;
}

.menus .active a {
    font-weight: bold;
    color: #1890ff;
}
</style>
