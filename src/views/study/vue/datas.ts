export const vue_dir = `
<!-- 条件渲染 -->
<div v-if="isShow">显示内容</div>
<div v-else-if="hasError">错误提示</div>
<div v-else>其他情况</div>

<!-- 列表渲染 -->
<li v-for="(item, index) in list" :key="index">{{ item }}</li>
<li v-for="(value, key, index) in object" :key="index">{{ value }}</li>
`;
export const vue_reactive = `
import { ref } from 'vue'
const count = ref(0)

import { reactive } from 'vue'
const user = reactive({
  name: 'Tom',
  age: 20,
})

import { toRef, toRefs } from 'vue'
const state = reactive({ count: 0, name: 'Vue' })
const count = toRef(state, 'count') // 单个属性转为 ref
const { name } = toRefs(state)      // 批量转为 ref
`;
export const vue_life = `
import { onMounted, onUnmounted, onUpdated, nextTick } from 'vue'

// 组件挂载完成后（DOM 已渲染）
onMounted(() => {
  console.log('组件已挂载')
})

// 响应式数据更新并重新渲染 DOM 后
onUpdated(() => {
  console.log('组件更新完毕')
})

// 用于在数据更新后，等待 DOM 更新完成再执行操作
async function updateAndWait() {
  count.value++
  await nextTick()
  console.log('DOM 已更新')
}

// 组件卸载时
onUnmounted(() => {
  console.log('组件已卸载')
})
`;
export const vue_live = `
<keep-alive>
  <UserInfo v-if="showUser" />
</keep-alive>

onActivated(() => {
  console.log('组件从缓存中激活')
})

onDeactivated(() => {
  console.log('组件被缓存并隐藏')
})
`;
export const vue_watch = `
// 基本用法
const count = ref(0)
const stop = watch(count, (newVal, oldVal) => {
  console.log(\`count 从 \${oldVal} 变成了 \${newVal}\`)
},
    {
        immediate: true, // 立即执行一次
        deep: true, // 深度监听
        once: true, // 只执行一次
    }
)
// 停止监听
stop()

// 监听多个数据
const name = ref('Tom')
const age = ref(20)
watch([name, age], ([newName, newAge], [oldName, oldAge]) => {
  console.log('新值:', newName, newAge)
  console.log('旧值:', oldName, oldAge)
})

// 监听对象
const user = reactive({
  name: 'Tom',
  info: { age: 20 },
})
watch(
  user,
  (newVal) => {
    console.log('深度监听：user.info.age 改变', newVal)
  },
  { deep: true }
)

// watchEffect：立即执行一次，自动收集依赖
watchEffect(() => {
  console.log('count 当前值：', count.value)
})
`;
export const vue_computed = `
const count = ref(2)

// 只读
const doubleCount = computed(() => count.value * 2)

// 可写
const doubleCount = computed({
  get: () => count.value * 2,
  set: (val) => {
    count.value = val / 2
  },
})
// 通过设置 doubleCount 来反向修改 count
doubleCount.value = 10
`;
export const vue_trans = `
// v-model 双向绑定父子组件数据
<!-- 父组件 -->
<Child v-model:data="formData" />
<!-- 子组件 Child.vue -->
const props = defineProps({
  data: { type: Object, required: true },
})
const emits = defineEmits<{
  (event: 'update:data', value: any): void
}>()
emits('update:data', newVal)

// ref + defineExpose 父调子的方法
<!-- 父组件 -->
<Child ref="childRef" />
const childRef = ref()
onMounted(() => {
  childRef.value?.validate()
})
<!-- 子组件 Child.vue -->
function validate() {
  console.log('Validating...')
}
defineExpose({ validate })

// provide + inject 祖孙组件通信
<!-- 根组件或父组件 -->
provide('theme', ref('dark'))
<!-- 子孙组件 -->
const theme = inject('theme’);

// mitt + eventBus 轻量事件总线库，任意组件通信
// eventBus.ts
import mitt from 'mitt'
export const emitter = mitt()
<!-- 组件A -->
import { emitter } from '@/utils/eventBus'
emitter.emit('refresh', 123)
<!-- 组件B -->
import { emitter } from '@/utils/eventBus'
emitter.on('refresh', (val) => {
  console.log('收到：', val)
})
`;
export const vue_slot = `
<!-- 子组件 Child.vue -->
<template>
  <slot
    name="header"
    :value="title"
    :onChange="handleChange"
  ></slot>
  <!-- 动态组件渲染，等价于 <slot name="header" /> -->
  <component :is="$slots.header" />
</template>
const title = ref('默认标题')
function handleChange(newTitle: string) {
  title.value = newTitle
}

<!-- 父组件 Parent.vue -->
<Child>
  <template #header="{ value, onChange }">
    <h3>{{ value }}</h3>
    <button @click="onChange('新标题')">修改标题</button>
  </template>
</Child>
`;
export const vue_transition = `
<template>
  <Transition name="fade">
    <p v-if="show">Hello Vue 3!</p>
  </Transition>

  <button @click="show = !show">切换</button>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
`;

export const vue_group = `
<template>
  <button @click="add">添加</button>
  <TransitionGroup name="list" tag="ul">
    <li v-for="item in items" :key="item">{{ item }}</li>
  </TransitionGroup>
</template>

<script setup>
import { ref } from 'vue'
const items = ref([1, 2, 3])
function add() {
  items.value.push(items.value.length + 1)
}
</script>

<style scoped>
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.list-move {
  transition: transform 0.5s ease;
}
</style>
`;
export const vue_teleport = `
<template>
  <button @click="visible = true">打开弹窗</button>

  <Teleport to="body">
    <div v-if="visible" class="modal">
      <div class="content">
        <p>这是一个弹窗</p>
        <button @click="visible = false">关闭</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
}
.content {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
`;
export const vue_suspense = `
<!-- UserPage.vue -->
<script setup>
await new Promise(r => setTimeout(r, 2000))
</script>
<template>
  <p>加载完成后的内容</p>
</template>

<!-- Parent.vue -->
<script setup>
import { defineAsyncComponent } from 'vue'
const UserPage = defineAsyncComponent({
  loader: () => import('@/views/UserPage.vue'),
  delay: 200,
  loadingComponent: Loading,
})
</script>
<template>
  <Suspense @resolve="onResolved" @pending="onPending" @fallback="onFallback">
    <template #default>
      <UserPage />
    </template>

    <template #fallback>
      <p>正在加载…</p>
    </template>
  </Suspense>
</template>
`;

export const pinia_app = `
// pinia
import { createPinia } from "pinia";
const pinia = createPinia();
// 持久化存储
import { createPersistedState } from "pinia-plugin-persistedstate";
pinia.use(
  createPersistedState({
    auto: true,
  })
);
// 重写 $reset 方法 => 解决组合式api中无法使用问题
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state));
  store.$reset = () => {
    store.$patch(initialState);
  };
});
app.use(pinia);
`;
export const pinia_store = `
import { defineStore } from "pinia";

interface Counter {
  count: number;
}

export const useCounterStore = defineStore('counter', { 
  state(): Counter { 
    return { 
      count: 0 
    } 
  }, 
  persist: true,
  // 计算属性computed
  getters: {
    double: (state) => state.count * 2,
  },
  // 方法methods
  actions: { 
    increment() { 
      this.count++;
    }, 
  }, 
})
`;
export const pinia_using = `
import { useCounterStore } from "@/stores/counter"
const counter = useCounterStore()

counter.increment() 
counter.$reset()

// 可解构使用 属性及方法
import { storeToRefs } from 'pinia'
const { count, double } = storeToRefs(counter)
const { increment } = counter
`;

export const router_basic = `
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // 重定向
  { path: "/", redirect: "/home",},

  // 别名
  { path: '/index', alias: '/home' } 

  { 
    path: '/home', 
    name: 'home', 
    component: () => import('@/views/Home.vue') 
  },
  { 
    path: '/about', 
    name: 'about', 
    component: () => import('@/views/About.vue') 
  },
  {
    path: '/user',
    component: UserLayout,
    children: [
      { path: '', component: UserHome },
      { path: 'profile', component: UserProfile },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  console.log('导航前', to, from)
  if (!isLogin && to.meta.requiresAuth) next('/login')
  else next()
})
router.afterEach((to, from) => {
  console.log('导航后', to, from)
})

export default router
`;
export const router_use = `
<router-link :to="{ name: 'User', params: { id: 1 } }">用户1</router-link>

import { useRouter } from 'vue-router'
const router = useRouter()

console.log(route.path)      // 当前路径
console.log(route.name)      // 当前路由名
console.log(route.params)    // 动态参数
console.log(route.query)     // 查询参数

router.push('/about')
router.push({ name: 'User', params: { id: 2 } })
router.replace('/login')
router.go(-1)
`;
