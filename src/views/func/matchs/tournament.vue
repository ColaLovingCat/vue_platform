<script lang="ts" setup>
// props
const props = defineProps<{
  rounds: any[]
}>()

const getTeamClass = (match: any, bo: number, team: string): string => {
  const { top: teamA, bottom: teamB } = match;

  // 检查 TBD 情况
  if ((team === "top" && teamA.team === "TBD") ||
    (team === "bottom" && teamB.team === "TBD")) {
    return 'tbd';
  }

  // 计算获胜所需分数
  const winningScore = Math.floor(bo / 2) + 1;

  // 检查比赛是否已结束
  const isMatchFinished = teamA.score >= winningScore || teamB.score >= winningScore;
  if (!isMatchFinished) {
    return '';
  }

  // 根据队伍位置返回结果
  if (team === "top") {
    return teamA.score < teamB.score ? 'lose' : teamA.score > teamB.score ? 'win' : '';
  }
  if (team === "bottom") {
    return teamA.score > teamB.score ? 'lose' : teamA.score < teamB.score ? 'win' : '';
  }

  return '';
};
</script>

<template>
  <div class="box-rounds">
    <template v-for="item in rounds">
      <div class="list-matchs">
        <template v-for="match in item">
          <div class="match-item">
            <div class="item-infos">
              <h4>{{ match.name }}</h4>
              <h4>BO{{ match.bo }}</h4>
            </div>
            <div class="item-infos">
              <h4>{{ match.round }}</h4>
              <h4>{{ match.time }}</h4>
            </div>
            <div class="item-teams">
              <div class="item-infos" :class="getTeamClass(match, match.bo, 'top')">
                <div class="item-team">
                  <img :src="`/docs/logos/teams/${match.top.icon}`" alt="" srcset="">
                  <div class="team-name">{{ match.top.team }}</div>
                </div>
                <div class="item-score">{{ match.top.score }}</div>
              </div>
              <div class="item-infos" :class="getTeamClass(match, match.bo, 'bottom')">
                <div class="item-team">
                  <img :src="`/docs/logos/teams/${match.bottom.icon}`" alt="" srcset="">
                  <div class="team-name">{{ match.bottom.team }}</div>
                </div>
                <div class="item-score">{{ match.bottom.score }}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.box-rounds {
  color: #fff;
  display: flex;
  gap: 50px;
}

.list-matchs {
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 50px;

  .match-item {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item-infos {
      width: 100%;
      display: flex;
      justify-content: space-between;

      &.win {
        background-image: linear-gradient(0deg, rgb(1, 133, 36), rgb(16, 100, 1));
      }

      &.lose {
        background: #2e0505;
        opacity: 0.4;
        filter: saturate(0);
      }

      h4 {
        font-size: 17px;
        font-weight: 700;
      }
    }

    .item-score {
      width: 50px;
      text-align: center;
      line-height: 50px;
      border: 1px solid #c4cecf9d;
    }

    .item-team {
      width: 250px;
      padding: 3px 20px;
      font-weight: 800;
      border: 1px solid #c4cecf9d;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      img {
        width: 50px;
      }

      .team-name {
        flex: 1;
      }

    }
  }
}
</style>