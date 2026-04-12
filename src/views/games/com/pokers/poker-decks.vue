<script setup lang="ts">
import { computed } from 'vue';
import type { PokerCard } from './pokers';

const props = defineProps<{
    deck: PokerCard[]; // 传入的牌组
}>();

const emit = defineEmits(['draw']);

// 只显示最上面的5张牌（优化性能）
const visibleDeck = computed(() => props.deck.slice(-5));

// 动态计算每张牌的偏移和旋转
const getCardStyle = (index: number) => ({
    transform: `
    translateX(${index * 4}px) 
    translateY(${-index * 2}px) 
    rotate(${index % 2 === 0 ? -1 : 1}deg)
  `,
});

// 点击牌堆抽牌
const drawCard = () => {
    if (props.deck.length > 0) {
        emit('draw');
    }
};
</script>

<template>
    <div class="card-deck" @click="drawCard">
        <!-- 堆叠的牌背，每张牌轻微偏移 -->
        <template v-for="(card, index) in visibleDeck" :key="card.id">
            <div class="card-item" :style="getCardStyle(index)">
                <img class="card-image"
                    :src="`docs/game/pokers/${card.isFaceDown ? 'poker-cover.png' : 'default/' + card.image}`"
                    alt="Card" />
            </div>
        </template>

    </div>
</template>

<style scoped lang="scss">
@import url(./pokers.scss);

.card-deck {
    position: relative;
    width: 120px;
    height: 180px;
    margin: 20px;
    cursor: pointer;

    .card-item {
        position: absolute;
    }
}
</style>