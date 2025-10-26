<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import * as xlsx from '@/commons/utils/xlsx'

// name
defineOptions({
    name: 'custom-name'
})

// props
const props = defineProps({
    datas: {
        type: Object,
        default: () => ({})
    }
})

const types: any = ref([])
onMounted(async () => {
    let temps: any = await xlsx.readExcel('/docs/datas/pokes.xlsx')
    const { types: typeDatas } = temps
    types.value = typeDatas
})

const getStyle = (values: any) => {
    let result:any = {
        color: "#fff",
        background: '#c4cecf4d'
    }
    switch (values) {
        case 0: {
            result = {
                color: "#fff",
                background: '#5b5b5b'
            }
            break;
        }
        case 0.5: {
            result = {
                color: "#fff",
                background: '#ef4444'
            }
            break;
        }
        case 1: {
            result = {
                opacity: 0,
            }
            break;
        }
        case 2: {
            result = {
                color: "#fff",
                background: '#22c55e'
            }
            break;
        }
    }
    return result
}
</script>

<template>
    <div class="box-types">
        <table class="table-types">
            <thead>
                <tr>
                    <th></th>
                    <th v-for="column in types" class="th-type">
                        <img class="td-type item-type" v-bind:src="'/docs/pokemons/types/' + column.type + '.png'">
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in types">
                    <td>
                        <img class="td-type item-type" v-bind:src="'/docs/pokemons/types/' + row.type + '.png'">
                    </td>
                    <td v-for="item in types" class="td-rate">
                        <div class="rate-item" :style="getStyle(row[item.type])"> {{ row[item.type] }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped lang="scss">
.table-types {
    background: #0000008d;

    .th-type {
        padding: 0 5px;
    }

    .td-type {
        width: 40px;
        height: 40px;
    }

    .rate-item {
        width: 30px;
        height: 30px;
        margin: 0 auto;
        text-align: center;
        line-height: 30px;
        border-radius: 50%;
    }
}
</style>
