export const infos = {
  topic: "Vite + Vue3",
  desc: "desc",
  contents: [
    {
      chapter: "初始化",
      list: [
        {
          part: "Vite",
          list: [
            {
              section: "简述",
              content: `
[官网](https://cn.vitejs.dev/guide/)
\`\`\`CMD
pnpm create vite vue_app
\`\`\`
`,
            },
            {
              section: "基础改造",
              content: `
##### 配置SCSS
\`\`\`CMD
pnpm add -D sass
\`\`\`

##### 区分环境
- 创建 各自的 \`env\` 文件 和 \`env.d.ts\` 来适配ts
>const { VITE_APP_ENV } = import.meta.env
- 在 \`package.json\` 中修改 scripts 区分 dev/test/prod 环境
##### node.js支持
\`\`\`CMD
pnpm install -D @types/node
\`\`\`

##### unplugin
- 修改 \`vite.config.ts\`
\`\`\`CMD
pnpm install -D unplugin-vue-components unplugin-auto-import
pnpm install -D @antdv-next/auto-import-resolver
\`\`\`

##### mock 随机数据
\`\`\`CMD
pnpm install -D vite-plugin-mock mockjs @types/mockjs
\`\`\`
- 修改 \`vite.config.ts\`
- 创建 \`/commons/mocks/handlers.ts\`
\`\`\`TypeScript
# 配置
{
  url: "/mocks/user/list",
  method: "get",
  response: ({ query }: any) => {
    const size = parseInt(query.size) || 5;
    return {
      status: 1,
      result: Mock.mock({
        [\`list|\${size}\`]: [
          {
            id: "@id",
            guid: "@guid",
            name: "@name",
            cname: "@cname",
            age: "@integer(20, 50)",
            desc: "@cword(2, 5)",
            title: "@title(2, 5)",
            email: "@email",
            url: "@url",
            date: "@date",
            time: "@time",
            datetime: "@datetime",
            status: "@boolean",
          },
        ],
      }),
    };
  },
},

# 使用
const resp = await fetch('/mocks/user/list?size=10');
const data = await resp.json();
console.log('Users List:', data);
\`\`\`
##### tailwindcss
[官网](https://tailwindcss.com/docs/installation/using-vite)
\`\`\`CMD
pnpm install tailwindcss @tailwindcss/vite
\`\`\`
- 修改 \`vite.config.ts\`
- 创建 \`tailwind.css\` 并在 \`main.ts\` 中导入
`,
            },
            {
              section: "重要插件",
              content: `
##### eventBus 事件总线
- 创建 \`commons/utils/eventBus.ts\`
\`\`\`CMD
pnpm install mitt
\`\`\`

##### pinia
[官网](https://pinia.vuejs.org/getting-started.html)
\`\`\`CMD
pnpm install pinia pinia-plugin-persistedstate
\`\`\`
-修改 \`main.ts\`
\`\`\`TypeScript
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
\`\`\`
- 全局系统信息和状态
- 全局loading
- 全局用户信息
\`\`\`TypeScript
import { useSystemInfosStore } from '@/commons/stores/index';
const systemStore = useSystemInfosStore()
\`\`\`

##### vue-router
\`\`\`CMD
pnpm install vue-router@4
\`\`\`
- 配置 \`router/index.ts\`
- 配置 \`main.ts\`

##### vue-i18n
\`\`\`CMD
pnpm install vue-i18n
\`\`\`
- 创建 \`assets/locales/*.json\`
- 或创建 \`/systems/lan/lang.xlsx\`
\`\`\`TypeScript
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
\`\`\`
- 使用 \`{{ $t('btn.add') }}\`

##### xlsx
\`\`\`CMD
pnpm install xlsx
\`\`\`

##### dayjs
\`\`\`CMD
pnpm install dayjs
\`\`\`

##### fontawesome
\`\`\`CMD
pnpm install @fortawesome/fontawesome-free
\`\`\`
- 改为使用 webfont
>@import url(@/assets/fonts/font-awesome/css/all.min.css);

##### eChart
\`\`\`CMD
pnpm install echarts
\`\`\`
- 配合组件使用

##### word cloud
\`\`\`CMD
pnpm install d3 d3-cloud
\`\`\`

##### graph
\`\`\`CMD
pnpm install @antv/g6 @antv/layout-gpu
\`\`\`

##### camera
\`\`\`CMD
pnpm install @zxing/library
\`\`\`

##### barcode
\`\`\`CMD
pnpm install jsbarcode qrcode
\`\`\`

##### workflow
\`\`\`CMD
pnpm install @antv/x6 @antv/x6-vue-shape dagre
\`\`\`

##### drag
\`\`\`CMD
pnpm install vuedraggable
\`\`\`

##### three.js
\`\`\`CMD
pnpm install three tweakpane
pnpm install gsap
\`\`\`

##### code editor
\`\`\`CMD
pnpm install monaco-editor sql-formatter vkbeautify
\`\`\`
`,
            },
            {
              section: "组件库",
              content: `
##### Antd-Vue
\`\`\`CMD
pnpm install ant-design-vue @ant-design/icons-vue
\`\`\`
##### Antdv Next
\`\`\`CMD
pnpm install antdv-next @antdv-next/icons
\`\`\`
`,
            },
            {
              section: "自定义功能或组件",
              content: `
##### Chat 聊天
\`\`\`CMD
pnpm install highlight.js katex markdown-it markdown-it-katex
pnpm install -D @types/markdown-it
\`\`\`
`,
            },
          ],
        },
      ],
    },
  ],
};
