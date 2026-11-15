<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
    name: 'digimon-card'
})

const props = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
})

const mon: any = computed(() => props.data || {})

const paddedNo = computed(() => String(mon.value.no ?? '').padStart(3, '0'))

const propKey = computed(() => {
    const prop = String(mon.value.prop || '')
    if (prop.includes('疫苗')) return 'vaccine'
    if (prop.includes('病毒')) return 'virus'
    if (prop.includes('数据')) return 'data'
    if (prop.includes('自由')) return 'free'
    if (prop.includes('可变')) return 'variable'
    return 'unknown'
})

const imgSrc = computed(() => {
    const img = mon.value.img
    if (!img) return ''
    return `/docs/digimon/mons/${img}`
})
</script>

<template>
    <div class="mon-card" :class="`prop-${propKey}`">
        <div class="art-panel">
            <img
                v-if="imgSrc"
                class="art-img"
                :src="imgSrc"
                :alt="mon.cnName || mon.enName"
            >
            <div v-if="mon.desc" class="desc-panel">
                <p>{{ mon.desc }}</p>
            </div>
        </div>

        <div class="info-panel">
            <div class="info-main">
                <div class="no-block">{{ paddedNo }}</div>
                <div class="name-block">
                    <span class="cn-name">{{ mon.cnName }}</span>
                    <span v-if="mon.prop" class="tag prop" :class="propKey">{{ mon.prop }}</span>
                </div>
            </div>
            <div class="info-foot">
                <span class="en-name">{{ mon.enName }}</span>
                <div class="meta-group">
                    <span v-if="mon.level" class="meta">{{ mon.level }}</span>
                    <span v-if="mon.type" class="meta">{{ mon.type }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.mon-card {
    --blue: #00a5e4;
    --blue-deep: #008fc7;
    --ink: #111318;
    --cut: 14px;
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &:hover {
        .desc-panel {
            transform: translateY(0);
            opacity: 1;
        }

        .art-panel {
            transform: translateY(-2px);
            box-shadow: 0 10px 18px rgba(0, 90, 130, 0.28);
        }
    }
}

.art-panel {
    position: relative;
    height: 230px;
    background:
        radial-gradient(circle at 28% 18%, rgba(255, 255, 255, 0.45), transparent 42%),
        linear-gradient(160deg, #c5dcec 0%, #6ea3c2 50%, #2f4f63 100%);
    border: 6px solid var(--blue);
    overflow: hidden;
    clip-path: polygon(
        var(--cut) 0,
        calc(100% - var(--cut)) 0,
        100% var(--cut),
        100% calc(100% - var(--cut)),
        calc(100% - var(--cut)) 100%,
        var(--cut) 100%,
        0 calc(100% - var(--cut)),
        0 var(--cut)
    );
    transition: transform 0.22s ease, box-shadow 0.22s ease;

    .art-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 8px;
        filter: drop-shadow(0 6px 8px rgba(0, 0, 0, 0.25));
    }
}

.desc-panel {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    max-height: 62%;
    padding: 10px 12px;
    background: linear-gradient(180deg, rgba(8, 20, 32, 0.15) 0%, rgba(8, 20, 32, 0.9) 24%, rgba(8, 20, 32, 0.95) 100%);
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.28s ease, opacity 0.22s ease;
    overflow: auto;
    pointer-events: none;

    p {
        margin: 0;
        color: #f4f8fb;
        font-size: 10px;
        line-height: 1.55;
    }
}

.info-panel {
    --cut: 10px;
    position: relative;
    background: linear-gradient(180deg, var(--blue) 0%, var(--blue-deep) 100%);
    color: #fff;
    overflow: hidden;
    clip-path: polygon(
        var(--cut) 0,
        calc(100% - var(--cut)) 0,
        100% var(--cut),
        100% calc(100% - var(--cut)),
        calc(100% - var(--cut)) 100%,
        var(--cut) 100%,
        0 calc(100% - var(--cut)),
        0 var(--cut)
    );
}

.info-main {
    display: flex;
    align-items: stretch;
    height: 20px;
}

.no-block {
    flex-shrink: 0;
    width: 46px;
    background: var(--ink);
    color: #fff;
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.04em;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 100%, 0 100%);
}

.name-block {
    flex: 1;
    min-width: 0;
    padding-right: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
}

.cn-name {
    flex: 1;
    min-width: 0;
    font-size: 16px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: 0.03em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.tag {
    flex-shrink: 0;
    padding: 1px 7px;
    font-size: 10px;
    font-weight: 800;
    line-height: 1.35;
    background: rgba(0, 0, 0, 0.28);
    border: 1px solid rgba(255, 255, 255, 0.35);
    clip-path: polygon(5px 0, calc(100% - 5px) 0, 100% 50%, calc(100% - 5px) 100%, 5px 100%, 0 50%);

    &.prop {
        &.vaccine {
            background: #e8b923;
            color: #2b1a00;
            border-color: transparent;
        }

        &.virus {
            background: #d1232a;
            border-color: transparent;
        }

        &.data {
            background: #1f5fbf;
            border-color: transparent;
        }
    }
}

.info-foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    height: 18px;
    background: var(--ink);
}

.en-name {
    flex: 1;
    padding: 30px;
    min-width: 0;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.meta-group {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

.meta {
    padding: 0;
    margin: 0;
    border-radius: 0;
    background: transparent;
    color: #fff;
    font-size: 9px;
    font-weight: 800;
    line-height: 1;
    clip-path: none;
}
</style>
