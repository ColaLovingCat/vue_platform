<script lang="ts" setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import type { Ref } from 'vue'

import * as XLSX from 'xlsx'
import * as extend from '@/commons/utils/extends'

// name
defineOptions({
  name: 'custom-name'
})

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
onMounted(async () => {
  let temps: any = await readExcel()
  const { rounds, races, result, drivers, teams } = temps
  console.log('Testing: ', rounds);
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
})
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

const readExcel = async () => {
  try {
    // 动态导入Excel文件
    const response = await fetch(new URL('/docs/datas/f1.xlsx', import.meta.url).href)
    const arrayBuffer = await response.arrayBuffer()

    // 解析Excel数据
    const data = new Uint8Array(arrayBuffer)
    const workbook = XLSX.read(data, { type: 'array' })

    // 获取第一个工作表的数据
    const rounds = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    const races = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[1]])
    const result = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[2]])
    const drivers = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[3]])
    const teams = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[4]])

    return { rounds, races, result, drivers, teams }
  } catch (error) {
    console.error('读取Excel文件失败:', error)
  }
  return {}
}

const pageInfos = reactive({
  year: 2025,
  //
  rounds: [] as any[],
  currentRound: 0,
  // 积分 排名 分站冠军 领奖台 杆位
  drivers: [] as any[],
})
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
  </div>
</template>

<style scoped lang="scss">
@import url(./styles.scss);
</style>
