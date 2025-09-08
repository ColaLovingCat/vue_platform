<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import articleView from './view.vue'

// name
defineOptions({
    name: 'custom-name'
})

const articleRef: any = ref(null)
const article = {
    title: {
        en: 'How Artificial Intelligence Can Revolitionise Science',
        zh: '人工智能如何能够给科学带来革命性的改变'
    },
    contents: [
        {
            sentences: [
                {
                    en: 'Debate about artificial itelligence tends to focus on its potential dangers:',
                    zh: '有关人工智能的辩论通常倾向于聚焦在它的潜在危害上：'
                },
                {
                    en: 'They implements our behavior.',
                    zh: '它们影响着我们的行为。'
                }
            ]
        }
    ]
}

onMounted(() => { })
</script>

<template>
    <div class="sections">
        <articleView ref="articleRef" :article="article"></articleView>
        <button @click="articleRef.toggleZH">click</button>
    </div>
</template>

<style scoped lang="scss"></style>
