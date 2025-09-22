<script lang="ts" setup>
import { ref, reactive } from 'vue'

// name
defineOptions({
    name: 'app-query'
})

const pageInfos = reactive({
    symbols: [
        { symbol: '空格', code: '&nbsp;' },
        { symbol: '<', code: '&lt;' },
        { symbol: '>', code: '&gt;' },
        { symbol: '&', code: '&amp;' },
        { symbol: '"', code: '&quot;' },
        { symbol: '\'', code: '&apos;' },
    ],
})
</script>

<template>
    <div class="sections">
        character references <a href="https://html.spec.whatwg.org/multipage/named-characters.html">Link</a>
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
