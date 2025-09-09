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
            <div><b>{{ m.class }}</b> {{ m.mean }} [{{ m.range }}]</div>
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
    border-radius: 5px;
    background: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    .item-word {
        margin-bottom: 5px;
        font-size: 18px;
        font-weight: 700;
    }

    .item-root {
        color: #0000007d;
        font-size: 12px;
    }

    .item-means {
        margin-top: 5px;
        padding: 5px 0;
        border-top: 2px dashed #c4cecf8d;
    }
}
</style>
