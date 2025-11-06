<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import codeView from "@/components/editor-code/view.vue";
import noteView from "../comps/note-card.vue";

import * as extend from "@/commons/utils/extends";

import * as notes from "./notes";
import * as db from "./datas";

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

const codeConfig = (language: string) => {
    return {
        language,
        theme: "vs-dark",
        readOnly: true,
    };
};

onMounted(() => {
    pageInfos.notes = [...notes.list];
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
            visibleNotes.value = notes.list.filter((note) => note.id === id);
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
                        <h1 id="main-title">Vue</h1>
                        <p class="desc">
                            是一款轻量、灵活、渐进式的前端框架，专注于构建用户界面。它采用响应式数据绑定和组件化开发理念，使开发者能够高效地构建交互复杂、可维护性强的单页应用（SPA）和大型前端项目。</p>
                    </div>
                    <h2 id="chapter-01">一、Vue3</h2>
                    <h3 id="part-0101">1. 基础入门</h3>
                    <div class="part-contents">
                        <div id="section-010101">
                            <h4>1.1 模板语法</h4>
                            <div class="sub-contents">
                                <img class="img-222" style="width: 600px" src="/docs/study/imgs/222-vue.png" />
                                <p>事件修饰符</p>
                                <div class="note-codes" style="width: 900px;">
                                    <div>
                                        <p>
                                            .stop <span class="txt-comment">// 阻止事件继续传播，类比
                                                event.stopPropagation()</span>
                                        </p>
                                        <p>
                                            .prevent <span class="txt-comment">// 阻止事件的默认事件，类比
                                                event.preventDefault()</span></p>
                                        <p>.self <span class="txt-comment">// 只有当事件是从元素自身触发才会触发</span></p>
                                        <p>.capture <span class="txt-comment">// 使用事件捕获模式</span></p>
                                        <p>.once <span class="txt-comment">// 事件只会触发一次</span></p>
                                        <p>.passive <span class="txt-comment">// 指示浏览器不应该阻止事件的默认行为</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="section-010102">
                            <h4>1.2 内置指令</h4>
                            <div class="sub-contents">
                                <p>v-if的优先级高于v-for</p>
                                <div class="box-code" style="width: 900px; height: 250px">
                                    <codeView :configs="codeConfig('html')" :value="db.vue_dir"></codeView>
                                </div>
                            </div>
                        </div>
                        <div id="section-010103">
                            <h4>1.3 数据绑定与响应式</h4>
                            <div class="sub-contents">
                                <div class="box-code" style="width: 900px; height: 350px">
                                    <codeView :configs="codeConfig('typescript')" :value="db.vue_reactive"></codeView>
                                </div>
                            </div>
                        </div>
                        <div id="section-010104">
                            <h4>1.4 生命周期钩子</h4>
                            <div class="sub-contents">
                                <div class="box-code" style="width: 900px; height: 500px">
                                    <codeView :configs="codeConfig('typescript')" :value="db.vue_life"></codeView>
                                </div>
                                <p>KeepAlive 缓存动态组件</p>
                                <p>用于缓存切换组件的状态，常用于 Tab 页、页面切换等场景。</p>
                                <div class="box-code" style="width: 900px; height: 300px">
                                    <codeView :configs="codeConfig('typescript')" :value="db.vue_live"></codeView>
                                </div>
                            </div>
                        </div>
                        <div id="section-010105">
                            <h4>1.5 computed</h4>
                            <div class="sub-contents">
                                <p>有缓存：相同依赖未变化时不会重复执行</p>
                                <p>适合做依赖响应式数据的派生值计算</p>
                                <div class="box-code" style="width: 900px; height: 350px">
                                    <codeView :configs="codeConfig('typescript')" :value="db.vue_computed"></codeView>
                                </div>
                            </div>
                        </div>
                        <div id="section-010106">
                            <h4>1.6 watch</h4>
                            <div class="sub-contents">
                                <div class="box-code" style="width: 900px; height: 350px">
                                    <codeView :configs="codeConfig('typescript')" :value="db.vue_watch"></codeView>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 id="part-0102">2. 组件基础</h3>
                    <div class="part-contents">
                        <div id="section-010201">
                            <h4>2.1 组件模板</h4>
                            <div class="sub-contents">
                            </div>
                        </div>
                        <div id="section-010202">
                            <h4>2.2 组件通讯</h4>
                            <div class="sub-contents">
                                <div class="box-code" style="width: 900px; height: 500px">
                                    <codeView :configs="codeConfig('typescript')" :value="db.vue_trans"></codeView>
                                </div>
                            </div>
                        </div>
                        <div id="section-010203">
                            <h4>2.3 插槽</h4>
                            <div class="sub-contents">
                                <p>$slot.header</p>
                                <p>Component 动态组件渲染</p>
                                <div class="box-code" style="width: 900px; height: 500px">
                                    <codeView :configs="codeConfig('html')" :value="db.vue_slot"></codeView>
                                </div>
                            </div>
                        </div>
                        <div id="section-010204">
                            <h4>2.4 内置组件</h4>
                            <div class="sub-contents">
                                <p>Transition 过渡动画组件</p>
                                <p>.fade-enter-from/active/to</p>
                                <p>.fade-leave-from/active/to</p>
                                <div class="box-code" style="width: 900px; height: 300px">
                                    <codeView :configs="codeConfig('html')" :value="db.vue_transition"></codeView>
                                </div>
                                <p>TransitionGroup 列表动画</p>
                                <p>.list-move</p>
                                <div class="box-code" style="width: 900px; height: 300px">
                                    <codeView :configs="codeConfig('html')" :value="db.vue_group"></codeView>
                                </div>
                                <p>Teleport 传送组件内容到指定 DOM 节点</p>
                                <div class="box-code" style="width: 900px; height: 300px">
                                    <codeView :configs="codeConfig('html')" :value="db.vue_teleport"></codeView>
                                </div>
                                <p>Suspense 异步组件</p>
                                <p>页面加载骨架屏</p>
                                <div class="box-code" style="width: 900px; height: 300px">
                                    <codeView :configs="codeConfig('html')" :value="db.vue_suspense"></codeView>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 id="chapter-02">二、Pinia</h2>
                    <h3 id="part-0201">1. 引入</h3>
                    <div class="part-contents">
                        <div id="section-020101">
                            <h4>1.1 代码</h4>
                            <div class="sub-contents">
                                <div class="box-code" style="width: 700px; height: 500px">
                                    <codeView :configs="codeConfig('typescript')" :value="db.pinia_app"></codeView>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 id="part-0202">2. 定义</h3>
                    <div class="part-contents">
                        <div id="section-020201">
                            <h4>2.1 代码</h4>
                            <div class="sub-contents">
                                <div class="box-code" style="width: 700px; height: 500px">
                                    <codeView :configs="codeConfig('typescript')" :value="db.pinia_store"></codeView>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 id="part-0203">3. 使用</h3>
                    <div class="part-contents">
                        <div id="section-020301">
                            <h4>3.1 代码</h4>
                            <div class="sub-contents">
                                <div class="box-code" style="width: 700px; height: 250px">
                                    <codeView :configs="codeConfig('typescript')" :value="db.pinia_using"></codeView>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 id="chapter-03">三、Vue Router</h2>
                    <h3 id="part-0301">1. 创建</h3>
                    <div class="part-contents">
                        <div id="section-030101">
                            <h4>1.1 代码</h4>
                            <div class="sub-contents">
                                <div class="box-code" style="width: 900px; height: 500px">
                                    <codeView :configs="codeConfig('typescript')" :value="db.router_basic"></codeView>
                                </div>
                                <p style="margin-top: 20px;"></p>
                                <div class="box-code" style="width: 900px; height: 400px">
                                    <codeView :configs="codeConfig('typescript')" :value="db.router_use"></codeView>
                                </div>
                            </div>
                        </div>
                        <div id="section-030102">
                            <h4>1.2 重点</h4>
                            <div class="sub-contents">
                                <p>路由跳转: router.push / router-link</p>
                                <p>参数传递: params（路径）/ query（?）</p>
                                <p>获取信息: useRoute()</p>
                                <p>懒加载: () => import()</p>
                                <p>路由守卫: beforeEach / beforeEnter / onBeforeRouteLeave</p>
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
