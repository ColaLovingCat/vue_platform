<script lang="ts" setup>
import { reactive, onMounted, computed } from 'vue'

import chartView from '@/components/echarts/view.vue'

import * as xlsx from '@/commons/utils/xlsx'
import * as extend from '@/commons/utils/extends'

// name
defineOptions({
  name: 'custom-name'
})

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const pageInfos = reactive({
  year: 2025,
  //
  rounds: [] as any[],
  currentRound: 0,
  // 积分 排名 分站冠军 领奖台 杆位
  drivers: [] as any[],
  //
  changeMark: false,
  options: {
    title: {
      text: '赛季车手积分累计',
      left: 'center',
      textStyle: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '12%',
      top: '15%',
      containLabel: true
    },
    //
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: function (params: any[]) {
        let result = `第${params[0].dataIndex + 1}站`;
        params.forEach(param => {
          result += `<br/>${param.marker} ${param.seriesName}: ${param.data}分`;
        });
        return result;
      }
    },
    legend: {
      type: 'scroll',
      bottom: 0,
      data: []
    },
    //
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [],
      axisLabel: {
        interval: 0,
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '累计积分',
      axisLine: {
        show: true
      },
      axisLabel: {
        formatter: '{value} 分'
      }
    },
    series: [

    ],
  } as any,
})

onMounted(async () => {
  let temps: any = await xlsx.readExcel('/docs/datas/f1.xlsx')
  const { rounds, races, result, drivers, teams } = temps

  resultData = result;

  pageInfos.drivers = [...drivers]
  pageInfos.drivers.map((driver: any) => {
    driver.score = 0
    let scoreInfos = result.filter((a: any) => a.driverName == driver.name && a.score)
    if (scoreInfos.length > 0) {
      scoreInfos.map((a: any) => { driver.score += a.score })
    }

    driver.win = 0
    let winInfos = result.filter((a: any) => a.driverName == driver.name && a.year == pageInfos.year && a.step == 'Race' && a.position == 1)
    if (winInfos.length > 0) {
      winInfos.map((a: any) => { driver.win += 1 })
    }

    driver.award = 0
    let awardInfos = result.filter((a: any) => a.driverName == driver.name && a.year == pageInfos.year && a.step == 'Race' && a.position < 4)
    if (awardInfos.length > 0) {
      awardInfos.map((a: any) => { driver.award += 1 })
    }

    driver.first = 0
    let firstInfos = result.filter((a: any) => a.driverName == driver.name && a.year == pageInfos.year && a.step == 'Qualifying' && a.position == 1)
    if (firstInfos.length > 0) {
      firstInfos.map((a: any) => { driver.first += 1 })
    }
  })
  pageInfos.drivers = extend.ExArray.sortbyEle(pageInfos.drivers, (a: any) => a.score, 'desc')
  //
  pageInfos.rounds = [...rounds]
  pageInfos.rounds.map((round: any) => {
    round.hasSprint = false
    round.races = []
    // Date
    let roundInfos = races.filter((a: any) => a.year == pageInfos.year && a.round == round.round)
    if (roundInfos.length > 0) {
      // 
      round.hasSprint = roundInfos.filter((a: any) => a.step == 'Sprint').length > 0

      // 
      let startDate = formatDate(roundInfos[0].date)
      let startMonth = months[startDate.getMonth()]
      let endDate = formatDate(roundInfos[roundInfos.length - 1].date)
      let endMonth = months[endDate.getMonth()]
      //
      round.month = startMonth == endMonth ? startMonth : startMonth + '-' + endMonth
      round.range = startDate.getDate() + '-' + endDate.getDate()

      //
      let showRaces = roundInfos.filter((a: any) => a.isShow == 1)
      if (showRaces.length > 0) {
        showRaces.map((race: any) => {
          let resultInfos = result.filter((a: any) => a.year == race.year && a.round == race.round && a.step == race.step)
          if (resultInfos.length > 0) {
            let winner = resultInfos[0]
            race.no = winner.driverNo
            let teamInfos = teams.find((a: any) => (a.name == winner.teamName || a.newName == winner.teamName))
            race.team = teamInfos.code
            race.color = teamInfos.color
          }
        })
        round.races = [...showRaces]
      }
    }
  })
  //
  calcSeries()
  pageInfos.changeMark = !pageInfos.changeMark
})

const calcSeries = () => {
  const calcResult = calculateCumulativeScores.value;
  if (!calcResult) return;

  pageInfos.options.xAxis.data = calcResult.roundNames;
  pageInfos.options.series = calcResult.driverSeries;
  pageInfos.options.legend.data = calcResult.topDrivers;
};

let resultData: any[] = [];
const calculateCumulativeScores = computed(() => {
  if (!pageInfos.rounds.length || !pageInfos.drivers.length) return;

  const roundNames: string[] = [];
  const driverMap = new Map();

  // 初始化车手数据
  pageInfos.drivers.forEach(driver => {
    driverMap.set(driver.name, {
      name: driver.name,
      code: driver.code,
      team: driver.team,
      scores: [] as number[], // 每场比赛得分
      cumulative: [] as number[], // 累计积分
      color: driver.color || getRandomColor()
    });
  });

  // 按比赛轮次排序
  const sortedRounds = [...pageInfos.rounds].sort((a, b) => a.round - b.round);

  // 为每一轮比赛计算积分
  sortedRounds.forEach(round => {
    roundNames.push(`${round.round}`);

    // 获取该轮比赛结果
    const roundResults = resultData.filter(item =>
      item.year === pageInfos.year &&
      item.round === round.round &&
      item.step === 'Race'
    );

    // 更新每个车手的积分
    driverMap.forEach((driverData, driverName) => {
      const roundResult = roundResults.find(r => r.driverName === driverName);
      const score = roundResult?.score || 0;

      driverData.scores.push(score);

      // 计算累计积分
      const prevCumulative = driverData.cumulative.length > 0
        ? driverData.cumulative[driverData.cumulative.length - 1]
        : 0;
      driverData.cumulative.push(prevCumulative + score);
    });
  });

  // 转换为图表需要的格式
  const driverSeries = Array.from(driverMap.values()).map(driver => ({
    name: driver.code,
    type: 'line',
    data: driver.cumulative,
    smooth: false,
    showSymbol: false,
    symbolSize: 6,
    lineStyle: {
      width: 2
    },
    itemStyle: {
      color: driver.color
    },
    emphasis: {
      focus: 'series'
    }
  }));

  // 默认显示前5名车手
  const topDrivers = pageInfos.drivers
    .slice(0, 5)
    .map(driver => driver.code);

  return { roundNames, driverSeries, topDrivers };
});
// 生成随机颜色
const getRandomColor = () => {
  const colors = [
    '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
    '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc', '#60acfc'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const formatDate = (excelDate: number) => {
  const excelEpoch = new Date(1899, 11, 31);
  const date = new Date(excelEpoch.getTime() + excelDate * 24 * 60 * 60 * 1000);
  return date;
}
const formatTime = (excelTime: number) => {
  // 计算总秒数
  const totalSeconds = excelTime * 24 * 60 * 60;
  // 计算小时、分钟和秒
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  // 格式化为 HH:MM
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
</script>

<template>
  <div class="sections">
    <div class="list-f1">
      <template v-for="round in pageInfos.rounds" v-bind:id="round.key">
        <div class="f1-item" :class="round.round == pageInfos.currentRound ? 'active' : ''"
          @click="pageInfos.currentRound = round.round">
          <div class="item-roundinfo">

            <div class="item-date">
              <div class="item-month">{{ round.month }}</div>
              <div class="item-range">{{ round.range }}</div>
              <div class="item-time">{{ round.time }}</div>
            </div>

            <div class="item-circuit">
              <div class="item-rounds">
                <div class="item-round">ROUND {{ round.round }}</div>
                <div class="item-name">
                  {{ round.country }} {{ round.city }}
                  <span class="item-sprint" v-if="round.hasSprint">Sprint</span>
                </div>
                <div class="item-subname">{{ round.circuit }}</div>
              </div>
              <div class="item-carbon">
                <img :src="`/docs/f1/carbons/${round.img}.png`" alt="" srcset="">
              </div>
              <div class="item-infos">
                <div class="item-title">Number of Laps</div>
                <div class="item-laps">{{ round.laps }}</div>
                <div class="item-title">Circuit Length</div>
                <div class="item-length">{{ round.length }} km</div>
              </div>
            </div>

            <div class="item-flag">
              <img :src="`/docs/flags/${round.country}.png`" alt="" srcset="">
            </div>
          </div>
          <div class="item-races" :style="{ '--race-height': round.races.length * 50 }">
            <template v-for="race in round.races">
              <div class="item-race">
                <div class="item-step">
                  <span>{{ race.step }}</span>
                  <span class="item-time">
                    {{ extend.ExDate.format(formatDate(race.date), 'MM-dd') }}
                    {{ formatTime(race.startTime) }}
                    <template v-if="race.endTime"> - {{ formatTime(race.endTime) }}</template>
                  </span>

                </div>
                <div class="item-team" :style="{ '--team-color': race.color }">
                  <img class="img-no" :src="`/docs/f1/nos/${race.no}.png`" alt="" srcset="">
                  <img class="img-car" :src="`/docs/f1/cars/${race.team}.png`" alt="" srcset="">
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>

    <div class="list-drivers">
      <template v-for="(driver, index) in pageInfos.drivers">
        <div class="driver-item">
          <div class="item-infos">
            <div class="item-info item-score">
              <div class="item-value">{{ (index + 1) }}</div>
              <div class="item-title">排名</div>
            </div>
            <div class="item-info item-score">
              <div class="item-value">{{ driver.score }}</div>
              <div class="item-title">积分</div>
            </div>
          </div>
          <div class="item-infos">
            <div class="item-info">
              <div class="item-value">{{ driver.win }}</div>
              <div class="item-title">分冠</div>
            </div>
            <div class="item-info">
              <div class="item-value">{{ driver.award }}</div>
              <div class="item-title">领奖台</div>
            </div>
            <div class="item-info">
              <div class="item-value">{{ driver.first }}</div>
              <div class="item-title">杆位</div>
            </div>
          </div>
          <div class="item-driver">
            <img class="img-driver" :src="`/docs/f1/drivers/${driver.code}.png`" alt="" srcset="">
            <div class="item-nos">
              <img class="img-no" :src="`/docs/f1/nos/${driver.no}.png`" alt="" srcset="">
              <div class="item-code">{{ driver.code }}</div>
              <img class="img-flag" :src="`/docs/flags/${driver.country}.png`" alt="" srcset="">
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="box-chart">
      <chartView :options="pageInfos.options" :change-mark="pageInfos.changeMark"></chartView>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Microsoft Yahei';
}

body {
    background-image: url(./assets/imgs/bg.jpg);
    background-size: 100% 100%;
    background-attachment: fixed;
}

.list-f1 {
    padding: 20px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    row-gap: 3px;
}

.f1-item {
    position: relative;
    width: 900px;
}

.item-roundinfo {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
}

.item-date {
    padding: 10px 20px;
    width: 145px;
    color: #fff;
    background: #000;
}

.item-month {
    width: max-content;
    padding: 0 5px;
    background: red;
}

.item-range {
    font-size: 30px;
    font-weight: 700;
}

.item-time {
    font-weight: 700;
}

.item-flag {
    position: absolute;
    left: 105px;
    top: 50%;
    transform: translateY(-50%);
    width: 70px;
    height: 70px;
    overflow: hidden;
    border-radius: 50%;
    border: 8px solid #000;
}

.item-flag img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.item-circuit {
    position: relative;
    padding: 10px 20px;
    padding-left: 40px;
    background: #f4c531;
    display: flex;
    column-gap: 10px;
}

.item-rounds {
    padding: 10px 0;
    width: 370px;
}

.item-sprint {
    padding: 0 3px;
    font-size: 16px;
    color: #fff;
    background: red;
}

.item-round {
    color: red;
    font-weight: 700;
}

.item-name {
    font-size: 30px;
    font-weight: 700;
}

.item-carbon {
    width: 135px;
}

.item-carbon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.item-infos {
    width: 150px;
    padding: 0 10px;
}

.item-title {
    font-size: 12px;
}

.item-laps,
.item-length {
    font-size: 27px;
    font-weight: 700;
}

.item-races {
    width: 100%;
    height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    transition: all 0.6s;
}

.item-race {
    position: relative;
    width: 100%;
    height: 50px;
}

.item-step {
    position: absolute;
    z-index: 2;
    font-size: 35px;
    font-weight: 700;
}

.item-time {
    margin-left: 20px;
    font-size: 18px;
    font-weight: 400;
}

.item-team {
    position: absolute;
    top: 0;
    width: 0;
    height: 100%;
    transition: all 0.6s 1s;
    z-index: 1;
}

.item-team::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 20px;
    background: var(--team-color, #c4cecf);
}

.item-team .img-no {
    position: absolute;
    right: -85px;
    z-index: 2;
    width: 50px;
    height: 30px;
}

.item-team .img-car {
    position: absolute;
    right: -95px;
    z-index: 1;
    width: 200px;
}

.f1-item.active .item-races {
    height: var(--race-height, #c4cecf);
}

.f1-item.active .item-team {
    width: 90%;
}

.list-drivers {
    position: absolute;
    bottom: 0;
    right: 6px;
    padding-top: 50px;
    width: 300px;
    height: calc(100vh - 70px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 60px;

    .driver-item {
        position: relative;
        width: 300px;
        height: 100px;
        background: #1f202d;

        .item-infos {
            margin-bottom: 10px;
            color: #fff;
            display: flex;
            gap: 10px;
            justify-content: center;

            .item-info {
                flex: 1;
                text-align: center;

                &.item-score {
                    .item-value {
                        font-size: 27px;
                    }
                }

                .item-value {
                    font-size: 16px;
                    font-weight: 700;
                }

                .item-title {
                    font-size: 12px;
                }
            }
        }

        .item-driver {
            position: absolute;
            bottom: 0;
            right: -12px;
            width: 150px;
            height: 150px;

            .img-driver {
                width: 100%;
                height: 100%;
            }

            .item-nos {
                position: absolute;
                bottom: 0;
                z-index: 1;
                width: 100%;
                background: linear-gradient(to top, #1f202d 35%, #0000 100%);
                display: flex;
                align-items: center;

                img {
                    width: 50px;
                }

                .item-code {
                    padding: 0 10px;
                    color: #fff;
                    font-size: 21px;
                    line-height: 50px;
                    font-weight: 700;
                }

                .img-flag {
                    width: 30px;
                }
            }
        }
    }
}

.box-chart {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 500px;
  height: 200px;
  background: #fff;
  z-index: 999;
}
</style>
