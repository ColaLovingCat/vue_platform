<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

// name
defineOptions({
    name: 'custom-name'
})

const pageInfos = reactive({
    tabs: [
        {
            name: '软件设计师',
            path: '',
        },
    ],
})

onMounted(() => { })
</script>

<template>
    <div class="sections">
        <div class="list-card">
            <template v-for="tab in pageInfos.tabs">
                <div class="card-item" @click="">
                    <div class="item-icon"></div>
                    <div class="item-name">{{ tab.name }}</div>
                </div>
            </template>
        </div>
        <div class="section-contents">
            <router-view></router-view>
        </div>
    </div>

</template>

<style scoped lang="scss">
</style>
