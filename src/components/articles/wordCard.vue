<script lang="ts" setup>
// name
defineOptions({
    name: 'custom-name'
})

// props
const props = defineProps({
    word: {
        type: Object,
        default: () => ({})
    },
})
</script>

<template>
    <div class="word-view">
        <h3 class="item-word">{{ word.word }}</h3>
        <div class="item-root">{{ word.root }}</div>
        <div class="item-means" v-for="(m, idx) in word.means" :key="idx">
            <div>
                <sapn style="font-weight: 700;">{{ m.class }}</sapn>
                <sapn style="font-weight: 800;">{{ m.mean }}</sapn>
                <sapn class="range-item" v-for="range in m.ranges">{{ range }}</sapn>
            </div>

            <div v-for="(ex, i) in m.examples" :key="i" class="item-root">
                [例句] {{ ex.content }}
                <div v-if="ex.mean">- {{ ex.mean }}</div>
            </div>
            <div v-for="(ph, i) in m.phrases" :key="i" class="item-root">
                [短语] {{ ph.content }} - {{ ph.mean }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.word-view {
    padding: 10px;
    background: #fff;
    background: var(--color-page-bg);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    .item-word {
        margin-bottom: 5px;
        color: var(--color-page-text);
        font-size: 18px;
        font-weight: 700;
    }

    .item-root {
        color: var(--color-page-text);
        font-size: 12px;
        opacity: 0.5;
    }

    .item-means {
        margin-top: 5px;
        padding: 5px 0;
        border-top: 2px dashed #c4cecf8d;
    }


    .range-item {
        margin: 0 2px;
        padding: 2px 5px;
        color: #000;
        font-size: 11px;
        border-radius: 3px;
        background: #c4cecf6d;
    }
}
</style>
