<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useRouter } from 'vue-router'
const routers = useRouter()
const pageGo = (path: string, query: any = {}) => {
  routers.push({
    path,
    query
  })
}

onMounted(() => {
  games.map((item: any) => {
    let category = groups.value.find((a: any) => a.category == item.category);
    if (category) {
      category.games.push(item);
    }
  })
})

const groups: any = ref([
  { category: "chess", title: "棋类争抢", games: [] },
  { category: "poker", title: "牌类决斗", games: [] },
  { category: "map", title: "棋盘经营", games: [] },
  { category: "others", title: "单机天堂", games: [] },
])
const games = [
  // chess
  // 五子棋
  {
    code: "wuzi",
    name: "五子棋",
    isActive: true,
    //
    category: "chess",
    limit: 2,
    model: "multi",
    rules: {
      size: 25,
      first: 0,
      canRegret: false,
    },
    ruleList: [
      {
        title: "棋盘大小",
        key: "size",
        configs: [
          { value: 25, text: "25" },
          { value: 15, text: "15" },
        ],
      },
      {
        title: "先手",
        key: "first",
        configs: [
          { value: 0, text: "黑棋" },
          { value: 1, text: "白棋" },
        ],
      },
      {
        title: "可以悔棋",
        key: "canRegret",
        configs: [
          { value: false, text: "否" },
          { value: true, text: "是" },
        ],
      },
    ],
  },
  // 象棋
  {
    code: "CNchess",
    name: "象棋",
    isActive: false,
    //
    category: "chess",
    limit: 2,
    model: "multi",
    rules: {},
    ruleList: [],
  },
  // poker
  // 21点
  {
    code: "blackjack",
    name: "21点",
    isActive: true,
    //
    category: "poker",
    limit: 3,
    model: "single",
    rulesPoker: {
      initialCount: 7, // 起始手牌数
    },
    rules: {
      isPlus: true, // plus牌是否可叠加
      isForce: 0, // 不可出牌时
      isAuto: false, // 自动出牌
    },
    ruleList: [
      {
        title: "+2/+4牌可叠加",
        key: "isPlus",
        configs: [
          { value: true, text: "开启" },
          { value: false, text: "关闭" },
        ],
      },
      {
        title: "无法出牌时",
        key: "isForce",
        configs: [
          { value: 0, text: "可跳过" },
          { value: 1, text: "强制抓1张牌" },
          { value: 2, text: "强制抓牌至可出" },
        ],
      },
      {
        title: "托管",
        key: "isAuto",
        configs: [
          { value: true, text: "开启" },
          { value: false, text: "关闭" },
        ],
      },
    ],
  },
  // UNO
  {
    code: "uno",
    name: "UNO",
    isActive: false,
    //
    category: "poker",
    limit: 4,
    model: "single",
    rulesPoker: {
      initialCount: 7, // 起始手牌数
    },
    rules: {
      isPlus: true, // plus牌是否可叠加
      isForce: 0, // 不可出牌时
      isAuto: false, // 自动出牌
    },
    ruleList: [
      {
        title: "+2/+4牌可叠加",
        key: "isPlus",
        configs: [
          { value: true, text: "开启" },
          { value: false, text: "关闭" },
        ],
      },
      {
        title: "无法出牌时",
        key: "isForce",
        configs: [
          { value: 0, text: "可跳过" },
          { value: 1, text: "强制抓1张牌" },
          { value: 2, text: "强制抓牌至可出" },
        ],
      },
      {
        title: "托管",
        key: "isAuto",
        configs: [
          { value: true, text: "开启" },
          { value: false, text: "关闭" },
        ],
      },
    ],
  },
  // 斗地主
  {
    code: "doudizhu",
    name: "斗地主",
    isActive: false,
    //
    category: "poker",
    limit: 3,
    model: "multi",
    rules: {},
    ruleList: [],
  },
  // 麻将
  {
    code: "mahjong",
    name: "麻将",
    isActive: false,
    //
    category: "poker",
    limit: 4,
    model: "multi",
    rules: {
      code: "", // 类别
    },
    ruleList: [
      {
        title: "规则类别",
        key: "code",
        configs: [
          { value: "普通", text: "普通" },
          { value: "川麻", text: "川麻" },
          { value: "日麻", text: "日麻" },
        ],
      },
    ],
  },
  // 西洋骨牌
  {
    code: "domino",
    name: "西洋骨牌",
    isActive: false,
    //
    category: "poker",
    limit: 4,
    model: "single",
    rules: {
      isForce: 0, // 不可出牌时是否强制抓牌
      isEnd: 100, // 游戏结束条件
    },
    ruleList: [],
  },
  // 三国杀
  {
    code: "threekill",
    name: "三国杀",
    isActive: false,
    //
    category: "poker",
    limit: 8,
    model: "multi",
    rules: {
      isForce: 0, // 不可出牌时是否强制抓牌
      isEnd: 100, // 游戏结束条件
    },
    ruleList: [],
  },
  // 蜘蛛纸牌
  {
    code: "spider",
    name: "蜘蛛纸牌",
    isActive: false,
    //
    category: "poker",
    limit: 1,
    model: "single",
    rules: {},
    ruleList: [],
  },
  // map
  // 飞行棋
  {
    code: "ludo",
    name: "飞行棋",
    isActive: false,
    //
    category: "map",
    limit: 4,
    model: "multi",
    rules: {},
    ruleList: [],
  },
  // 大富翁
  {
    code: "monopoly",
    name: "大富翁",
    isActive: false,
    //
    category: "map",
    limit: 4,
    model: "multi",
    rules: {},
    ruleList: [],
  },
  // others
  // 扫雷
  {
    code: "mine",
    name: "扫雷",
    isActive: true,
    //
    category: "others",
    limit: 1,
    model: "single",
    //
    rules: {},
    ruleList: [],
  },
  // 消消乐
  {
    code: "xiaoxiaole",
    name: "消消乐",
    isActive: false,
    //
    category: "others",
    limit: 1,
    model: "single",
    rules: {},
    ruleList: [],
  },
  // 贪吃蛇
  {
    code: "snake",
    name: "贪吃蛇",
    isActive: true,
    //
    category: "others",
    limit: 1,
    model: "single",
    rules: {
      level: 1, // 起始难度
    },
    ruleList: [],
  },
  // 俄罗斯方块
  {
    code: "tetris",
    name: "俄罗斯方块",
    isActive: true,
    //
    category: "others",
    limit: 1,
    model: "single",
    rules: {},
    ruleList: [],
  },
  // T-Rex
  {
    code: "t-rex",
    name: "恐龙快跑",
    isActive: true,
    //
    category: "others",
    limit: 1,
    model: "single",
    rules: {},
    ruleList: [],
  },
  // 九宫格拼图
  {
    code: "puzzle",
    name: "九宫格拼图",
    isActive: true,
    //
    category: "others",
    limit: 1,
    model: "single",
    rules: {},
    ruleList: [],
  },
  // 数独
]

const selectGame = (values: any) => {
  switch (values.code) {
    case "": {
      break
    }
    default: {
      pageGo('/' + values.code)
      break
    }
  }
}
</script>

<template>
  <div class="sections">
    <div class="list-games">
      <template v-for="group in groups">
        <div class="games">
          <h3 class="titles">{{ group.title }}</h3>
          <div class="list-game">
            <div class="game-item" v-for="game in group.games" v-bind:title="game.name"
              v-bind:class="game.isActive ? '' : 'block'" @click="selectGame(game)">
              <div class="item-name">{{ game.name }}</div>
              <div class="item-bg"></div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.games {
  width: 90%;

  .titles {
    font-size: 25px;
    margin-bottom: 12px;
  }

  .list-game {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .game-item {
      cursor: pointer;
      position: relative;
      width: 220px;
      height: 120px;
      padding: 20px 15px;
      border-radius: 15px;
      background: #3239658d;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
      }

      &.block {
        cursor: not-allowed;
        color: #c4cecf7d;
      }

      .item-name {
        text-align: right;
        font-size: 30px;
        font-weight: 700;
      }

      .item-bg {
        position: absolute;
        width: 100px;
        height: 100px;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
