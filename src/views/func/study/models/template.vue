<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import * as db from './ruanjian'

// name
defineOptions({
    name: 'custom-name'
})

const pageInfos = reactive({
    menus: [] as any[],
    notes: [] as any[],
})

const nos = ['A', 'B', 'C', 'D']

const contentRef = ref<HTMLElement>()

const activeId = ref<string>("")
const visibleNotes = ref<any[]>([])

onMounted(() => {
    pageInfos.notes = [...db.notes]
    refreshMenus()
    observeNotes()
})

const refreshMenus = () => {
    if (!contentRef.value) return

    const headers = contentRef.value.querySelectorAll('h1, h2, h3, h4')
    const menus: typeof pageInfos.menus = []

    headers.forEach(header => {
        // 先取自身的 id，没有的话取父级的 id
        let id = header.id || header.parentElement?.id || ""
        const text = header.textContent?.trim() || ""

        let level = 1
        switch (header.tagName.toLowerCase()) {
            case 'h1': level = 1; break
            case 'h2': level = 2; break
            case 'h3': level = 3; break
            case 'h4': level = 4; break
        }

        if (id) menus.push({ id, text, level })
    })

    pageInfos.menus = menus

    // 更新滚动监听（目录高亮）
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id
                    activeId.value = id

                    // 让对应的菜单项始终可见
                    const el = document.querySelector(`.menus li[data-id="${id}"]`)
                    if (el) {
                        el.scrollIntoView({
                            block: "nearest", // 保证只滚动到刚好可见，不会整个容器跳动
                            behavior: "smooth"
                        })
                    }
                }
            })
        },
        { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    )

    // 监听 div[id]（不监听 h1/h2/h3/h4）
    contentRef.value.querySelectorAll("div[id]").forEach(el => observer.observe(el))
}

// 监听 notes 是否在视口
const observeNotes = () => {
    if (!contentRef.value) return

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                const id = entry.target.id
                if (!id) return
                if (entry.isIntersecting) {
                    // 进入视口，加入
                    const notes = pageInfos.notes.filter(n => n.id === id)
                    if (notes) {
                        notes.map((note: any) => {
                            if (!visibleNotes.value.includes(note))
                                visibleNotes.value.push(note)
                        })
                    }
                } else {
                    // 离开视口，移除
                    visibleNotes.value = visibleNotes.value.filter(n => n.id !== id)
                }
            })
        },
        { threshold: 0.2 } // 至少 20% 出现在视口才算可见
    )

    pageInfos.notes.forEach(note => {
        const el = document.getElementById(note.id)
        if (el) observer.observe(el)
    })
}

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}
</script>

<template>
    <div class="study-contents">
        <div class="left">
            <div class="content" ref="contentRef">
                <div class="header">
                    <h1 id="main-title">xxx</h1>
                    <p class="desc">desc</p>
                </div>
                <h2 id="chapter-01">一、xxx</h2>
                <h3 id="part-0101">1. xxx</h3>
                <div class="part-contents">
                    <div id="section-010101">
                        <h4>1.1 xxx</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <!-- 补充信息 -->
            <div class="notes">
                <div v-for="note in visibleNotes" :key="note.id" class="note-card">
                    <h4>[{{ note.title }}]</h4>
                    <p v-if="note.type === 'text'">{{ note.content }}</p>
                    <div v-if="note.type === 'topic'">
                        <p class="question">{{ note.question }}</p>
                        <template v-if="note.imgs.length > 0">
                            <img src="/public/docs/study/imgs/10-jiami.png" alt="" srcset="">
                        </template>
                        <div class="list-opts" v-for="opts in note.options">
                            <div class="opt-item" v-for="(opt, index) in opts">
                                {{ nos[index] }}. {{ opt }}
                            </div>
                        </div>
                        <details>
                            <summary>查看答案</summary>
                            <p class="answer">{{ note.answer }}</p>
                        </details>
                    </div>
                </div>
            </div>
            <!-- 目录 -->
            <div class="menus">
                <ul>
                    <li v-for="item in pageInfos.menus" :key="item.id" :data-id="item.id"
                        :class="{ active: activeId === item.id }">
                        <a @click="scrollTo(item.id)" :class="`level-${item.level}`">{{ item.text }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');

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
