<script lang="ts" setup>
import { defineProps } from "vue";
import { tokenize, renderTip } from "./render";

const props = defineProps<{
    text: string;
    tipKey?: string;
}>();
</script>

<template>
    <span>
        <template v-for="(tk, i) in tokenize(props.text)" :key="i">
            <a-popover v-if="tk.type === 'match'" placement="top" trigger="hover">
                <template #content>
                    <pre style="margin:0; white-space: pre-wrap;">{{ renderTip(tk.tip) }}</pre>
                </template>
                <span class="highlight">{{ tk.text }}</span>
            </a-popover>
            <span v-else>{{ tk.text }}</span>
        </template>
    </span>
</template>

<style scoped lang="scss">
.highlight {
    color: #1890ff;
    border-bottom: 1px dashed #1890ff;
    cursor: help;
}
</style>
