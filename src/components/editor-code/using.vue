<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import codeView from './view.vue'

// name
defineOptions({
    name: 'custom-name'
})

const txt = ref('')
const configs = ref({
    language: 'json',
    theme: 'vs-dark',
    readOnly: false,
})

onMounted(() => {
    changeLan('json')
})

const lans = [
    { code: 'json', sample: '{"a":"a","b":"b"}' },
    { code: 'css', sample: '.btn { font-size: 16px; }' },
    { code: 'xml', sample: '<?xml version="1.0"?><RECORD><FIELD ID="1" xsi:type="CharTerm" TERMINATOR="\t" MAX_LENGTH="12"/></RECORD>' },
    { code: 'sql', sample: "select * from dbo.Table where [Status] = 'Open'" },
]
const changeLan = (lan: any) => {
    configs.value.language = lan
    txt.value = lans.find((a: any) => a.code == lan)?.sample ?? ""
}
</script>

<template>
    <div class="sections">
        <codeView v-model:value="txt" :configs="configs"></codeView>
        <div class="box-edit">
            <a-select ref="select" style="width: 100%" v-model:value="configs.language" @change="changeLan">
                <a-select-option v-for="item in lans" :value="item.code">{{ item.code }}</a-select-option>
            </a-select>
            <a-textarea v-model:value="txt" style="height: 300px;" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.sections {
    position: relative;
    padding: 0;

    .box-edit {
        position: absolute;
        right: 140px;
        bottom: 12px;
        width: 500px;
        height: 332px;
        border-radius: 8px;
        background: #ffffff8d;
    }
}
</style>
