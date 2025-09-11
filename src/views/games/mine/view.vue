<script lang="ts" setup>
import { reactive, onMounted, computed } from 'vue'

// name
defineOptions({
  name: 'app-mine'
})

onMounted(() => {
  initialGame()
})

const gameInfos = reactive({
  rules: {
    row: 25,
    col: 25,
    total: 40,
    //
    type: "countDown",
    countDown: 160,
  },
  //
  status: "initial",
  //
  timer: null as any,
  clickCount: 0,
  //
  maps: [] as any[],
})

const initialGame = () => {
  gameInfos.status = "initial"
  putMap()
  putMines()
  //
  gameInfos.rules.countDown = 160
  gameInfos.clickCount = 0
  //
  gameInfos.status = "ready"
}

// 生成地图
const putMap = () => {
  gameInfos.maps = [];
  //
  const { row, col, total } = gameInfos.rules;
  for (let i = 0; i < row; i++) {
    let temp = [];
    for (let j = 0; j < col; j++) {
      temp.push({
        isMine: false, // 是否有地雷
        //
        isCover: true, // 未点击状态
        coverInfo: 0, // 标记为红旗或问号
        //
        isBom: false, // 点炮
      });
    }
    gameInfos.maps.push(temp);
  }
}
// 铺雷
const putMines = () => {
  let putNum = 0;
  //
  const { row, col, total } = gameInfos.rules;
  while (putNum < total) {
    // 随机落点
    let putRow = Math.floor(Math.random() * row);
    let putColumn = Math.floor(Math.random() * col);
    //
    let putItem = gameInfos.maps[putRow][putColumn];
    if (!putItem.isMine) {
      putItem.isMine = true;
      putNum++;
    }
  }
}

// 实时获取游戏进度
const checkInfos: any = computed(() => {
  let result = {
    flag: 0,
    left: 0,
  };
  //
  const { total } = gameInfos.rules;
  gameInfos.maps.map((rows: any) => {
    rows.map((item: any) => {
      if (item.isCover) {
        if (item.coverInfo == 1) {
          result.flag += 1;
        } else {
          result.left += 1;
        }
      }
    });
  });
  // 标记完判断是否胜利
  if (result.flag == total) {
    let temp = 0;
    gameInfos.maps.map((rows: any) => {
      rows.map((item: any) => {
        if (item.isCover && item.coverInfo == 1 && item.isMine) {
          temp++;
        }
      });
    });
    if (temp == total) {
      endGame();
    }
  }
  // 胜利
  if (result.flag + result.left == total) {
    endGame();
  }
  //
  return result;
})

// 获取这个格子周围的地雷数
const getCount = (locX: number, locY: number) => {
  let item = gameInfos.maps[locX][locY];
  // 未点开或这个是雷
  if (item.isCover || item.isMine) return "";
  // 数量
  return getinfoNum(locX, locY) || "";
}
// 返回棋子周围的地雷数量
function getinfoNum(locX: number, locY: number) {
  let result = 0;
  for (let i = locX - 1; i < locX + 2; i++) {
    for (let j = locY - 1; j < locY + 2; j++) {
      //
      if (
        limitIndex(i, 0, gameInfos.rules.col - 1) &&
        limitIndex(j, 0, gameInfos.rules.row - 1)
      ) {
        if (i != locX || j != locY) {
          if (gameInfos.maps[i][j].isMine) {
            result += 1;
          }
        }
      }
    }
  }
  return result;
}
function limitIndex(num: number, min: number, max: number) {
  let result = true;
  if (min != null && num < min) {
    result = false;
  }
  if (max != null && num > max) {
    result = false;
  }
  return result;
}
// 地雷上显示红旗和问号
const getCover = (locX: number, locY: number) => {
  let result = "";
  //
  let item = gameInfos.maps[locX][locY];
  switch (item.coverInfo) {
    case 1: {
      result = "cover-flag";
      break;
    }
    case 2: {
      result = "cover-question";
      break;
    }
  }
  //
  return result;
}

// 左击
const markActive = (locX: number, locY: number) => {
  // 第一次点击时开始计时
  if (gameInfos.clickCount == 0) {
    if (gameInfos.timer) {
      clearInter();
    }
    // 开始倒计时
    if (gameInfos.rules.type == "countDown") {
      gameInfos.timer = setInterval(function () {
        gameInfos.rules.countDown -= 1;
        if (gameInfos.rules.countDown == 0) {
          endGame(false);
        }
      }, 1000);
    }
  }
  //
  let item = gameInfos.maps[locX][locY];
  if (item.isCover && item.coverInfo == 0) {
    // 可点击
    item.isCover = false;
    gameInfos.clickCount++;
    // 踩雷
    if (item.isMine) {
      item.isBom = true;
      endGame(false);
      //
      console.log("Bom!!!!!!!!!!");
    }
    // 不是雷区
    else {
      if (getinfoNum(locX, locY) == 0) {
        checkAround(locX, locY);
      }
    }
  }
}
function checkAround(locX: number, locY: number) {
  for (let i = locX - 1; i < locX + 2; i++) {
    for (let j = locY - 1; j < locY + 2; j++) {
      //
      if (
        limitIndex(i, 0, gameInfos.rules.col - 1) &&
        limitIndex(j, 0, gameInfos.rules.row - 1)
      ) {
        if (i != locX || j != locY) {
          let item = gameInfos.maps[i][j];
          if (item.isCover) {
            markActive(i, j);
          }
        }
      }
    }
  }
}

// 右击
function markFlag(x: number, y: number) {
  let item = gameInfos.maps[x][y];
  if (item.isCover) {
    item.coverInfo += 1;
    if (item.coverInfo > 2) {
      item.coverInfo = 0;
    }
    // 标记flag数量已超出
    if (checkInfos.flag > gameInfos.rules.total && item.coverInfo == 1) {
      item.coverInfo = 2;
    }
  }
}

const endGame = (status = true) => {
  gameInfos.status = status ? "win" : "lose";
  //
  clearInter();
  // 展示所有信息
  gameInfos.maps.map((rows: any) => {
    rows.map((item: any) => {
      item.isCover = false;
    });
  });
}
const clearInter = () => {
  var end = setInterval(function () { }, 1000);
  // 停止定时器
  for (var i = 1; i <= end; i++) {
    clearInterval(i);
  }
}
</script>

<template>
  <div class="box-map">
    <div class="infos">
      <div class="game-status">
        <span>倒计时: {{ gameInfos.rules.countDown }}</span>
      </div>
      <div class="game-btn">
        <button type="button" class="btn-start" v-bind:class="gameInfos.status == 'lose' ? 'fail' : ''"
          @click="initialGame()"></button>
      </div>
      <div class="game-status">
        {{ checkInfos.flag }}/{{ gameInfos.rules.total }}
      </div>
    </div>
    <div class="maps">
      <table class="table-maps">
        <tr class="map-row" v-for="(rows, rowIndex) in gameInfos.maps">
          <td v-for="(col, colIndex) in rows">
            <div class="map-item"
              v-bind:class="[col.isCover ? 'item-cover' : 'item-active', getCover(rowIndex, colIndex), col.isMine ? 'active-mine' : '', col.isBom ? 'item-bom' : '']"
              v-on:click="markActive(rowIndex, colIndex)" v-on:contextmenu.prevent="markFlag(rowIndex, colIndex)">
              <span v-bind:class="'txt-' + getCount(rowIndex, colIndex)">
                {{ getCount(rowIndex, colIndex) }}
              </span>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box-map {
  margin: 0 auto;
  width: max-content;
  height: calc(100vh - 70px);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 15px;
}

.infos {
  height: 50px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 160px;

  .game-status {
    line-height: 50px;
  }

  .btn-start {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border: none;
    font-size: 30px;

    &::after {
      content: '\f118';
      font-family: FontAwesome;
    }

    &:active::after {
      content: '\f11a';
    }

    &.fail::after {
      content: '\f119';
    }
  }
}

.maps {
  width: max-content;
  height: max-content;
  overflow: auto;

  .map-item {
    position: relative;
    cursor: pointer;
    width: 30px;
    height: 30px;
    overflow: hidden;
    text-align: center;
    line-height: 30px;
    border: 1px solid #fff;

    &::before,
    &::after {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      text-align: center;
      font-family: FontAwesome;
    }

    &.item-cover {
      color: rgb(128, 128, 128);
      background-color: rgb(128, 128, 128);

      &.cover-flag::after {
        content: "\f024";
        color: red;
      }

      &.cover-question::after {
        content: "\f128";
        color: black;
      }
    }

    &.item-active {
      background-color: rgb(192, 192, 192);

      .txt-1 {
        color: blue;
      }

      .txt-2 {
        color: green;
      }

      .txt-3 {
        color: yellow;
      }

      .txt-4 {
        color: orange;
      }

      .txt-5,
      .txt-6,
      .txt-7,
      .txt-8 {
        color: red;
      }

      &.active-mine::after {
        content: "\f1e2";
        color: black;
      }
    }

    &.item-bom::before {
      content: "\f00d";
      color: red;
      font-size: 30px;
      z-index: 1;
    }
  }
}
</style>