<script lang="ts" setup>
import { ref, reactive } from "vue";

// name
defineOptions({
  name: "app-query",
});

const pageInfos = reactive({
  symbols: [
    { symbol: "空格", code: "&nbsp;" },
    { symbol: "<", code: "&lt;" },
    { symbol: ">", code: "&gt;" },
    { symbol: "&", code: "&amp;" },
    { symbol: '"', code: "&quot;" },
    { symbol: "'", code: "&apos;" },
  ],
  txts: [
    [
      { symbol: "≠" },
      { symbol: "➔" },
      { symbol: "➜" },
      { symbol: "➡" },
      { symbol: "⬅" },
      { symbol: "⬆" },
      { symbol: "⬇" },
      { symbol: "↔" },
      { symbol: "↕" },
      { symbol: "⇒" },
      { symbol: "⇐" },
      { symbol: "⇔" },
      { symbol: "⟹" },
      { symbol: "⟸" },
      { symbol: "⟺" },
      { symbol: "▶" },
      { symbol: "▼" },
      { symbol: "▲" },
      { symbol: "◀" },
      { symbol: "⏩" },
      { symbol: "⏪" },
      { symbol: "⏫" },
      { symbol: "⏬" },
    ],
    [
      { symbol: "🔲" },
      { symbol: "🔳" },
      { symbol: "⬛" },
      { symbol: "⬜" },
      { symbol: "▪" },
      { symbol: "▫" },
      { symbol: "◆" },
      { symbol: "◇" },
      { symbol: "★" },
      { symbol: "☆" },
    ],
    [
      { symbol: "❕" },
      { symbol: "❔" },
      { symbol: "⚠" },
      { symbol: "✔" },
      { symbol: "❌" },
      { symbol: "⭕" },
      { symbol: "🚫" },
      { symbol: "🔒" },
      { symbol: "🔓" },
    ],
    [
      { symbol: "α" },
      { symbol: "β" },
      { symbol: "γ" },
      { symbol: "δ" },
      { symbol: "ε" },
      { symbol: "ζ" },
      { symbol: "η" },
      { symbol: "θ" },
      { symbol: "ι" },
      { symbol: "κ" },
      { symbol: "λ" },
      { symbol: "μ" },
      { symbol: "ν" },
      { symbol: "ξ" },
      { symbol: "ο" },
      { symbol: "𝜋" },
      { symbol: "ρ" },
      { symbol: "𝜎" },
      { symbol: "τ" },
      { symbol: "υ" },
      { symbol: "ϕ" },
      { symbol: "χ" },
      { symbol: "ψ" },
      { symbol: "ω" },
    ],
  ],
});
</script>

<template>
  <div class="sections">
    <h4>
      character references
      <a href="https://html.spec.whatwg.org/multipage/named-characters.html">
        Link
      </a>
    </h4>
    <table>
      <thead>
        <tr>
          <th>符号</th>
          <th>实体</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pageInfos.symbols">
          <td>{{ item.symbol }}</td>
          <td>{{ item.code }}</td>
        </tr>
      </tbody>
    </table>
    <h4>特殊字符</h4>
    <table>
      <tbody>
        <tr v-for="list in pageInfos.txts">
          <td v-for="item in list">{{ item.symbol }}</td>
        </tr>
      </tbody>
    </table>
    <h4>带圈数字</h4>
    <p>①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳</p>
  </div>
</template>

<style scoped lang="scss">
table {
  th,
  td {
    padding: 5px 10px;
    font-size: 18px;
    border: 1px solid #c4cecf7d;
  }
}
</style>
