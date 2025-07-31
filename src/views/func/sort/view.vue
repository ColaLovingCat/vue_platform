<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

// name
defineOptions({
    name: 'custom-name'
})

const enum Status {
    default = 'default',
    active = 'active',
    comparing = 'comparing',
    group = 'group',
    done = 'done',
}

const pageInfos = reactive({
    size: 10,
    barWidth: 40,
    gap: 2,
})
const datas: any = ref([])

onMounted(() => {
    generateBars()
})
watch(
    () => pageInfos.size,
    (newValue, oldValue) => {
        generateBars()
    }
)

const getStyle = (bar: any, index: number) => {
    return `
    margin: ${pageInfos.gap}px; 
    width: ${pageInfos.barWidth}px; 
    height: ${bar.value}px;
    transform: translateX(${index * (pageInfos.barWidth + pageInfos.gap * 2)}px)
    `
}

const generateBars = () => {
    datas.value = Array.from(
        { length: pageInfos.size },
        (_, i) => ({
            id: i,
            value: Math.floor(Math.random() * 100) + 1,
            status: ['default']
        })
    );
}

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));
// 交换bar位置
const swapBars = async (i: number, j: number) => {
    const temp = copy(datas.value[i])
    datas.value[i] = copy(datas.value[j])
    datas.value[j] = temp
    await sleep()
}
const copy = (obj: any) => {
    return JSON.parse(JSON.stringify(obj))
}

// 插入排序
const insertionSort = async () => {
    const gap = 1
    for (let i = gap; i < datas.value.length; i++) {
        // 激活当前位置的元素
        datas.value[i].status = Status.active
        await sleep()

        let j = i
        // 当前位置元素小于前一个元素时，交换位置
        while (j > gap - 1 && datas.value[j].value < datas.value[j - gap].value) {
            // 比较状态
            datas.value[j - gap].status = Status.comparing
            await sleep()

            // 交换位置
            await swapBars(j, j - gap)

            // 恢复状态
            datas.value[j].status = Status.default
            // 继续
            datas.value[j - gap].status = Status.active

            j -= gap
        }
        datas.value[j].status = Status.default
    }
    datas.value.forEach((bar: any) => (bar.status = Status.done))
}

// 希尔排序
const shellsSort = async () => {
    for (let gap = datas.value.length; gap > 0; gap = Math.floor(gap / 2)) {
        console.log('当前gap: ', gap)
        for (let i = gap; i < datas.value.length; i++) {
            // 激活当前位置的元素
            datas.value[i].status = Status.active
            await sleep()

            let j = i
            // 当前位置元素小于前一个元素时，交换位置
            while (j > gap - 1 && datas.value[j].value < datas.value[j - gap].value) {
                // 比较状态
                datas.value[j - gap].status = Status.comparing
                await sleep()

                // 交换位置
                await swapBars(j, j - gap)

                // 恢复状态
                datas.value[j].status = Status.default
                // 继续
                datas.value[j - gap].status = Status.active

                j -= gap
            }
            datas.value[j].status = Status.default
        }
    }
    datas.value.forEach((bar: any) => (bar.status = Status.done))
}

// 选择排序
const selectionSort = async () => {
    for (let i = 0; i < datas.value.length - 1; i++) {
        console.log('起始位置: ', i)
        datas.value[i].status = Status.active
        await sleep()

        let minIndex = i;
        for (let j = i + 1; j < datas.value.length; j++) {
            datas.value[j].status = Status.comparing
            //
            if (datas.value[j].value < datas.value[minIndex].value) {
                datas.value[minIndex].status = Status.default
                minIndex = j;
            }
            await sleep()
            datas.value[j].status = Status.default
            datas.value[i].status = Status.default
            datas.value[minIndex].status = Status.active
        }
        console.log('最小位置: ', minIndex)
        if (minIndex !== i) {
            await swapBars(i, minIndex);
            // 恢复
            datas.value[minIndex].status = Status.default
        }
        datas.value[i].status = Status.done
    }
    datas.value[datas.value.length - 1].status = Status.done
}

// 堆排序
const heapSort = async () => {
    let n = datas.value.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        await swapBars(0, i);
        datas.value[i].status = Status.done
        //
        await heapify(i, 0);
    }
    datas.value[0].status = Status.done
}
// 建立大顶堆
const heapify = async (n: number, i: number) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < n && datas.value[left].value > datas.value[largest].value) largest = left;
    if (right < n && datas.value[right].value > datas.value[largest].value) largest = right;
    if (largest !== i) {
        await swapBars(i, largest);
        await heapify(n, largest);
    }
}

// 冒泡排序
const bubbleSort = async () => {
    for (let i = 0; i < datas.value.length - 1; i++) {
        for (let j = 0; j < datas.value.length - i - 1; j++) {
            datas.value[j].status = Status.comparing
            datas.value[j + 1].status = Status.comparing
            await sleep();

            if (datas.value[j].value > datas.value[j + 1].value) {
                await swapBars(j, j + 1);
            }

            datas.value[j].status = Status.default
            datas.value[j + 1].status = Status.default
        }
        //
        datas.value[datas.value.length - i - 1].status = Status.done
    }
}

// 快速排序
const quickSortWrapper = async () => {
    await quickSort(0, datas.value.length - 1);
}
const quickSort = async (left: number, right: number) => {
    console.log('排序范围: ', left, right)
    if (left >= right) {
        if (left = right) datas.value[left].status = Status.done;
        return;
    }

    let pivotIndex = right;
    let pivot = datas.value[right].value;
    datas.value[pivotIndex].status = Status.active;

    // 分区索引
    let partitionIndex = left;
    for (let i = left; i < right; i++) {
        datas.value[i].status = Status.comparing;
        await sleep();

        if (datas.value[i].value < pivot) {
            await swapBars(i, partitionIndex);
            datas.value[partitionIndex].status = Status.default;
            partitionIndex++;
        } else {
            datas.value[i].status = Status.default;
        }
    }

    // 将基准值放至中间
    datas.value[pivotIndex].status = Status.done;
    await swapBars(partitionIndex, right);

    // 递归排左右区域
    await quickSort(left, partitionIndex - 1);
    await quickSort(partitionIndex + 1, right);
}

// 归并排序
const mergeSortWrapper = async () => {
    await split(0, datas.value.length - 1);
}
const split = async (left: number, right: number) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    await split(left, mid);
    await split(mid + 1, right);

    console.log('合并: ', left, mid, right)
    await merge(left, mid, right);
}
const merge = async (left: number, mid: number, right: number) => {
    let temp = [];
    let i = left,
        j = mid + 1;
    while (i <= mid && j <= right) {
        if (datas.value[i].value < datas.value[j].value) {
            temp.push(datas.value[i++]);
        } else {
            temp.push(datas.value[j++]);
        }
    }
    while (i <= mid) temp.push(datas.value[i++]);
    while (j <= right) temp.push(datas.value[j++]);

    for (let k = left; k <= right; k++) {
        datas.value[k] = temp[k - left];
        // bars[k].style.height = `${array[k]}px`;
        // bars[k].innerHTML = `<span>${array[k]}</span>`;
        await sleep()
    }
}
</script>

<template>
    <div class="sections">
        <div class="container" ref="container"
            :style="`width:${datas.length * (pageInfos.barWidth + pageInfos.gap * 2)}px`">
            <template v-for="(bar, index) in datas" :key="bar.id">
                <div class="bar" :class="bar.status" :style="getStyle(bar, index)">
                    <span>{{ bar.value }}</span>
                </div>
            </template>

        </div>
        <div class="btns">
            <a-input v-model:value="pageInfos.size" style="width: 50px" min="5" max="50" />
            <a-button @click="generateBars()">随机数组</a-button>

            <a-button type="primary" @click="insertionSort()">插入排序</a-button>
            <a-button type="primary" @click="shellsSort()">希尔排序</a-button>
            <a-button type="primary" @click="selectionSort()">选择排序</a-button>
            <a-button type="primary" @click="heapSort()">堆排序</a-button>
            <a-button type="primary" @click="bubbleSort()">冒泡排序</a-button>
            <a-button type="primary" @click="quickSortWrapper()">快速排序</a-button>
            <a-button type="primary" @click="mergeSortWrapper()">归并排序</a-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.sections {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
}

.container {
    position: relative;
    margin: 0 auto;
    height: 300px;
    border-radius: 10px;
    background: #fff;
    display: flex;
    align-items: flex-end;

    .bar {
        position: absolute;
        transition: transform 0.5s ease-in-out, background 0.3s;

        span {
            position: absolute;
            left: 0;
            bottom: -20px;
            width: 100%;
            font-size: 12px;
            font-weight: 700;
            text-align: center;
        }

        &.default {
            background: #007bc0 !important;
        }

        &.done {
            background: #78be20 !important;
        }

        &.group {
            background: #fcaf17 !important;
        }

        &.comparing {
            background: #50237f !important;
        }

        &.active {
            background: #ed0007 !important;
        }
    }
}
</style>
