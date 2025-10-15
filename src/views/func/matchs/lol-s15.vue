<script lang="ts" setup>
import { round } from 'three/src/nodes/TSL.js'
import { onMounted, ref, reactive, computed, watch } from 'vue'

// name
defineOptions({
  name: 'custom-name'
})

const pageInfos = reactive({
  rounds: [
    [
      {
        name: 'ROUND1',
        type: 'BO1',
        round: '0-0',
        matchs: [
          {
            top: {
              team: 'GEN',
              icon: 'GNG.png',
              score: 0,
            },
            bottom: {
              team: 'PSG',
              icon: '',
              score: 0,
            },
          },
          {
            top: {
              team: 'FLY',
              icon: 'FLY.png',
              score: 0,
            },
            bottom: {
              team: 'T1',
              icon: 'T1.png',
              score: 0,
            },
          },
          {
            top: {
              team: 'G2',
              icon: 'G2.png',
              score: 0,
            },
            bottom: {
              team: 'TES',
              icon: 'TES.png',
              score: 0,
            },
          },
          {
            top: {
              team: 'CFO',
              icon: 'CFO.png',
              score: 0,
            },
            bottom: {
              team: 'FNC',
              icon: 'Fnatic.png',
              score: 0,
            },
          },
          {
            top: {
              team: 'BLG',
              icon: 'BLG.png',
              score: 0,
            },
            bottom: {
              team: '100T',
              icon: '100T.png',
              score: 0,
            },
          },
          {
            top: {
              team: 'HLE',
              icon: 'HLE.png',
              score: 0,
            },
            bottom: {
              team: 'AL',
              icon: 'AL.png',
              score: 0,
            },
          },
          {
            top: {
              team: 'VKS',
              icon: 'VKS.png',
              score: 0,
            },
            bottom: {
              team: 'TSW',
              icon: 'Team Secret.png',
              score: 0,
            },
          },
          {
            top: {
              team: 'KT',
              icon: 'KT.png',
              score: 0,
            },
            bottom: {
              team: 'MKOI',
              icon: 'MKOI.png',
              score: 0,
            },
          },
        ],
      }
    ],
    [
      {
        name: 'ROUND2',
        type: 'BO1',
        round: '0-0',
        time: '',
        matchs: [
          {
            top: {
              team: 'TBD',
              icon: '',
              score: 0,
            },
            bottom: {
              team: 'TBD',
              icon: '',
              score: 0,
            },
          }
        ],
      },
      {
        name: 'ROUND2',
        type: 'BO1',
        round: '0-0',
        matchs: [
          {
            top: {
              team: 'TBD',
              icon: '',
              score: 0,
            },
            bottom: {
              team: 'TBD',
              icon: '',
              score: 0,
            },
          }
        ],
      }
    ],
  ]
})

onMounted(() => { })
</script>

<template>
  <div class="list-rounds">
    <template v-for="item in pageInfos.rounds">
      <div class="box-rounds">
        <template v-for="round in item">
          <div class="round-item">
            <div class="item-infos">
              <h4>{{ round.name }}</h4>
              <h4>{{ round.round }}</h4>
            </div>
            <div class="item-infos">
              <h4>{{ round.type }}</h4>
              <h4>{{ round.time }}</h4>
            </div>
            <div class="list-matchs">
              <template v-for="match in round.matchs">
                <div class="match-item">
                  <div class="item-team">
                    <img :src="`/docs/logos/teams/${match.top.icon}`" alt="" srcset="">
                    {{ match.top.team }}
                  </div>
                  <span>{{ match.top.score }} VS {{ match.top.score }}</span>
                  <div class="item-team">
                    {{ match.bottom.team }}
                    <img :src="`/docs/logos/teams/${match.bottom.icon}`" alt="" srcset="">
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.list-rounds {
  display: flex;
  gap: 20px;

  .box-rounds {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .round-item {
      .item-infos {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}

.list-matchs {
  display: flex;
  flex-direction: column;

  .match-item {
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 10px;

    .item-team {
      width: 150px;
      font-weight: 800;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 50px;
      }
    }
  }
}
</style>
