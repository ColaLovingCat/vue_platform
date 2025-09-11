<script lang="ts" setup>
import { reactive, onMounted, computed } from 'vue'

import type { PokerCard } from '../com/pokers/pokers'
import * as pokers from '../com/pokers/pokers'

import pokerDecks from '../com/pokers/poker-decks.vue'

// name
defineOptions({
  name: 'blackjack'
})

const pageInfos = reactive({
  status: "initial",
  //
  cards: [] as PokerCard[],
  player: {
    score: 0,
    cards: [] as PokerCard[],
  },
  dealer: {
    score: 0,
    cards: [] as PokerCard[],
  },
})

const playerTotal = computed(() => calculateTotal(pageInfos.player.cards))
const dealerTotal = computed(() => calculateTotal(pageInfos.dealer.cards))
const calculateTotal = (cards: any[]) => {
  let total = 0
  let aces = 0
  for (const card of cards) {
    total += getValue(card.value) * 1
    if (card.value === 'A') aces++
  }
  while (total > 21 && aces > 0) {
    total -= 10
    aces--
  }
  return total
}
function getValue(value: any) {
  if (['J', 'Q', 'K'].includes(value)) return 10
  if (value === 'A') return 11
  return parseInt(value)
}

onMounted(() => {
  initialGame()
  document.addEventListener('keydown', handleKeydown)
})

function handleKeydown(e: any) {
  if (e.code === 'Space') {
    initialGame()
  }
  if (e.code === 'KeyB') {
    hit()
  }
  if (e.code === 'KeyN') {
    stand()
  }
}

// 初始化游戏
const initialGame = () => {
  pageInfos.status = "initial"
  pageInfos.player.cards = []
  pageInfos.dealer.cards = []
  // 生成牌堆
  let cards = [] as PokerCard[]
  for (let index = 0; index < 2; index++) {
    cards = [...cards, ...pokers.createDeck()]
  }
  // 洗牌
  pageInfos.cards = [...pokers.shufflePokers(cards)]
  // 发牌
  pageInfos.player.cards.push({ ...pageInfos.cards.pop(), isFaceDown: false } as PokerCard)
  pageInfos.player.cards.push({ ...pageInfos.cards.pop(), isFaceDown: false } as PokerCard)
  pageInfos.dealer.cards.push(pageInfos.cards.pop() as PokerCard)
  pageInfos.dealer.cards.push({ ...pageInfos.cards.pop(), isFaceDown: false } as PokerCard)
  //
  pageInfos.status = "ready"
}

// 玩家要牌
const hit = () => {
  pageInfos.player.cards.push({ ...pageInfos.cards.pop(), isFaceDown: false } as PokerCard)
  //
  if (playerTotal.value > 21) {
    endGame()
  }
}

// 玩家停牌，庄家出牌逻辑
const stand = () => {
  dealerAI();
};
// 智能庄家
// 庄家会根据自己的牌型有判断
// 庄家会根据场上已经拿到的所有的大小牌有判断
// 庄家会根据玩家现在的点数大小有判断
const dealerAI = () => {
  const trueCount = getTrueCount();
  console.log('trueCount: ', trueCount);

  // 基础规则
  let stopThreshold = 17; // 默认17点停牌

  // 算牌辅助策略调整
  if (shouldAdjustDealerStrategy()) {
    // 剩余牌堆高牌多 → 庄家更保守（降低停牌阈值）
    stopThreshold = 16;
  } else if (trueCount < -1) {
    // 剩余牌堆低牌多 → 庄家更激进（提高停牌阈值）
    stopThreshold = 18;
  }
  console.log('stopThreshold: ', stopThreshold);

  // 基础规则 + 智能调整
  let hitProbability = 1;
  if (dealerTotal.value === 16) hitProbability = trueCount >= 2 ? 0.4 : 0.7;;

  // 玩家接近21点时，庄家更激进
  if (playerTotal.value >= 19) hitProbability = Math.min(hitProbability + 0.3, 0.9);

  console.log('hitProbability: ', hitProbability);

  // 概率化决策
  if (dealerTotal.value < stopThreshold && Math.random() < hitProbability) {
    const newCard = pageInfos.cards.pop()!;
    updateCardCount(newCard); // 更新算牌计数
    pageInfos.dealer.cards.push({ ...newCard, isFaceDown: false });

    setTimeout(dealerAI, 1000);
  } else {
    endGame();
  }
};
// 根据算牌结果调整庄家策略
const shouldAdjustDealerStrategy = (): boolean => {
  const trueCount = getTrueCount();
  return trueCount >= 2; // 仅当真实计数≥2时调整策略（表示剩余牌堆高牌较多）
}
// 获取当前真实计数（True Count）
const getTrueCount = (): number => {
  const remainingDecks = pageInfos.cards.length / 52; // 计算剩余牌堆的“副数”
  return remainingDecks > 0 ? Math.round(highCardCount / remainingDecks) : 0;
}
let highCardCount = 0;
const updateCardCount = (card: PokerCard) => {
  if (['10', 'J', 'Q', 'K', 'A'].includes(card.value)) highCardCount--;
  else if (['2', '3', '4', '5', '6'].includes(card.value)) highCardCount++;
};

// 游戏结束
const endGame = () => {
  // 1. 庄家先展示暗牌（第一张牌）
  pageInfos.dealer.cards[0].isFaceDown = false;

  if (playerTotal.value > 21) {
    pageInfos.status = "lose";
    pageInfos.dealer.score += 1
    return
  };
  if (dealerTotal.value > 21) {
    pageInfos.status = "win";
    pageInfos.player.score += 1
    return
  };
  if (playerTotal.value > dealerTotal.value) {
    pageInfos.status = "win"
    pageInfos.player.score += 1
  } else if (playerTotal.value < dealerTotal.value) {
    pageInfos.status = "lose"
    pageInfos.dealer.score += 1
  } else {
    pageInfos.status = "draw"
  };
}
</script>

<template>
  <div class="sections">
    <div class="app-desk">
      <div class="box-decks">
        <pokerDecks :deck="pageInfos.cards"></pokerDecks>
      </div>
      <div class="box-dealer">
        <h4 class="item-infos">庄家: {{ pageInfos.dealer.score }} {{ dealerTotal }}</h4>
        <div class="list-cards">
          <template v-for="card in pageInfos.dealer.cards">
            <div class="card-item">
              <img class="card-image"
                :src="`docs/game/games/pokers/${card.isFaceDown ? 'poker-cover.png' : 'default/' + card.image}`"
                alt="Card" />
            </div>
          </template>
        </div>
      </div>
      <div class="box-players">
        <h4 class="item-infos">玩家: {{ pageInfos.player.score }} {{ playerTotal }}</h4>
        <div class="btns">
          <a-button type="primary" @click="hit">要牌 (B)</a-button>
          <a-button type="primary" @click="stand">停牌 (R)</a-button>
          <a-button type="primary" @click="initialGame">重开 (Space)</a-button>
        </div>
        <div class="list-cards">
          <template v-for="card in pageInfos.player.cards">
            <div class="card-item">
              <img class="card-image"
                :src="`docs/game/games/pokers/${card.isFaceDown ? 'poker-cover.png' : 'default/' + card.image}`"
                alt="Card" />
            </div>
          </template>
        </div>
      </div>
      <div class="box-infos">
        <span>{{ pageInfos.status }}</span>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
@import url(../com/games.scss);

.sections {
  background: green;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-desk {
  position: relative;
  width: 900px;
  height: 800px;

  .item-infos {
    padding: 10px 0;
    font-size: 18px;
    font-weight: 700;
  }

  .box-decks {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  .box-dealer {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .box-players {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .box-infos {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 70px;
    font-weight: 800;
  }
}

.btns {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
}
</style>
