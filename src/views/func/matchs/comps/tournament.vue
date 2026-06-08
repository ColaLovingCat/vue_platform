<script lang="ts" setup>
import { type RoundInfo, getTeamClass } from './public'

// name
defineOptions({
  name: 'tournament-name'
})

const props = defineProps({
  rounds: {
    type: Array as () => RoundInfo[],
    default: () => []
  },
  mark: {
    type: String,
    default: ''
  },
})
</script>

<template>
  <div class="box-rounds">
    <template v-for="item in rounds">
      <div class="list-matchs">
        <template v-for="match in item">
          <div class="box-card match-item">
            <div class="item-infos">
              <h4>{{ match.name }}</h4>
              <h4>BO{{ match.bo }}</h4>
            </div>
            <div class="item-infos">
              <h4>{{ match.round }}</h4>
              <h4>{{ match.time }}</h4>
            </div>
            <div class="item-teams">
              <div class="team-infos" :class="getTeamClass(match, 'top', mark, match.bo)">
                <div class="item-team">
                  <img :src="`/docs/logos/teams/${match.top.icon}`" alt="" srcset="">
                  <div class="team-name">{{ match.top.team }}</div>
                </div>
                <div class="item-score">
                  {{ match.top.score }}
                  <span v-if="match.top.score === match.bottom.score">({{ match.top.kick }})</span>
                </div>
              </div>
              <div class="team-infos" :class="getTeamClass(match, 'bottom', mark, match.bo)">
                <div class="item-team">
                  <img :src="`/docs/logos/teams/${match.bottom.icon}`" alt="" srcset="">
                  <div class="team-name">{{ match.bottom.team }}</div>
                </div>
                <div class="item-score">
                  {{ match.bottom.score }}
                  <span v-if="match.top.score === match.bottom.score">({{ match.bottom.kick }})</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import url(./styles.scss);

.box-rounds {
  display: flex;
  gap: 50px;
}

.list-matchs {
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 25px;

  .match-item {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item-teams {
      flex-direction: column;
    }
  }
}
</style>