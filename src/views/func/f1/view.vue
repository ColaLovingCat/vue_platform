<script lang="ts" setup>
import { reactive, onMounted, computed, watch } from 'vue'

import chartView from '@/components/echarts/view.vue'

import * as xlsx from '@/commons/utils/xlsx'
import * as extend from '@/commons/utils/extends'

// --- 状态定义 ---
const pageInfos = reactive({
    year: 0,
    availableYears: [] as number[],
    //
    currentRound: '',
    rounds: [] as any[],
    drivers: [] as any[],
    // Echarts 配置
    changeMark: false,
    options: {
        title: { show: false },
        color: ['#E10600', '#3671C6', '#2293D1', '#F596C8', '#FFF500', '#5E8FAA'],
        grid: { top: 10, bottom: 10, left: 0, right: 0, containLabel: true, },
        legend: { show: false },
        tooltip: {
            // 提示
            show: true,
            trigger: "axis", // item| axis
            axisPointer: {
                type: "cross", // line| cross| shadow
            },
            formatter: function (params: any) {
                if (Array.isArray(params)) {
                    return params
                        .map((p) => `<b>${p.seriesName}</b>: ${p.value}<br>`)
                        .join("");
                } else {
                    return `<b>${params.seriesName}</b>: ${params.value}`;
                }
            },
        },
        xAxis: {
            type: 'category',
            data: [],
            axisLabel: { show: false },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    opacity: 0.6,
                },
            },
        },
        yAxis: {
            type: 'value', name: 'Points',
            axisLabel: { show: false },
            splitLine: { show: false },
        },
        series: []
    } as any
})

// 原始数据缓存（避免重复读取 Excel）
let rawData: {
    rounds: any[],
    races: any[],
    result: any[],
    drivers: any[],
    teams: any[]
} | null = null;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// --- 核心逻辑 ---

// 1. 初始化读取数据
onMounted(async () => {

    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2025; year <= currentYear; year++) {
        years.push(year);
    }
    pageInfos.year = currentYear
    pageInfos.availableYears = years

    // 假设 F1.xlsx 包含多年数据，或者你根据年份动态拼路径
    const temps: any = await xlsx.readExcel('/docs/datas/f1.xlsx');
    rawData = temps;

    // 初始处理
    processData();
});

// 2. 监听年份变化
watch(() => pageInfos.year, () => {
    if (rawData) {
        processData();
    }
});

// 3. 数据处理主函数
const DEFAULT_TEAM_COLOR = '#33333d'; // 默认中性深灰
const DEFAULT_CAR_IMG = 'generic';   // 对应一张通用的赛车剪影图
const DEFAULT_NO_IMG = 'tbc';        // 对应一张显示“?”或“--”的号码图
const processData = () => {
    if (!rawData) return;

    const { year } = pageInfos;
    const { rounds, races, result, drivers, teams } = rawData;

    // A. 处理车手积分榜 (Standings)
    const currentYearResult = result.filter(r => r.year === year);

    const processedDrivers = drivers.map((d: any) => {
        const driverResults = currentYearResult.filter(r => r.driverName === d.name);

        // 计算各项指标
        const score = driverResults.reduce((sum, r) => sum + (Number(r.score) || 0), 0);
        const wins = driverResults.filter(r => r.step === 'Race' && r.position === 1).length;
        const podiums = driverResults.filter(r => r.step === 'Race' && r.position <= 3).length;
        const poles = driverResults.filter(r => r.step === 'Qualifying' && r.position === 1).length;

        // 获取所属车队颜色 (取最后一场比赛的车队为准)
        const lastTeamName = driverResults.length > 0 ? driverResults[driverResults.length - 1].teamName : d.team;
        const teamInfo = teams.find(t => t.name === lastTeamName || t.newName === lastTeamName);

        return {
            ...d,
            score,
            win: wins,
            award: podiums,
            first: poles,
            color: teamInfo?.color || '#999',
            teamCode: teamInfo?.code || 'TBC'
        };
    });

    // 按积分排序
    pageInfos.drivers = extend.ExArray.sortbyEle(processedDrivers, (a: any) => a.score, 'desc');

    // B. 处理赛程 (Calendar)
    const yearRounds = rounds.filter(r => r.year == year);
    pageInfos.rounds = yearRounds.map(round => {
        const roundRaces = races.filter(ra => ra.year === year && ra.round === round.round);

        // 未找到比赛信息
        if (roundRaces.length === 0) return {
            ...round,
            month: 'TBC',
            range: '---',
            hasSprint: false,
            races: []
        };

        // 计算日期范围
        const startRace = roundRaces[0];
        const endRace = roundRaces[roundRaces.length - 1];
        const startDate = formatDate(startRace.date);
        const endDate = formatDate(endRace.date);

        // 找出该分站的冠军（Race 步骤的第一名）
        let showRaces = roundRaces.filter((a: any) => a.isShow == 1).map((race: any) => {
            // 查找该 Session 的结果
            let resultInfos = result.filter((a: any) =>
                a.year == race.year &&
                a.round == race.round &&
                a.step == race.step &&
                a.position == 1 // 只要第一名
            );

            if (resultInfos.length > 0) {
                // 情况 A：比赛已结束，有胜者数据
                let winner = resultInfos[0];
                let teamInfos = teams.find((a: any) => (a.name == winner.teamName || a.newName == winner.teamName));

                return {
                    ...race,
                    no: winner.driverNo,
                    team: teamInfos?.code || 'TBC',
                    color: teamInfos?.color || DEFAULT_TEAM_COLOR,
                    isFinished: true // 标记已完赛
                };
            } else {
                // 情况 B：比赛未开始或无结果
                return {
                    ...race,
                    no: DEFAULT_NO_IMG,
                    team: DEFAULT_CAR_IMG,
                    color: DEFAULT_TEAM_COLOR,
                    isFinished: false // 标记未完赛
                };
            }
        });

        return {
            ...round,
            month: months[startDate.getMonth()],
            range: `${startDate.getDate()}-${endDate.getDate()}`,
            hasSprint: roundRaces.some(ra => ra.step === 'Sprint'),
            races: showRaces,
        };
    });

    // C. 更新图表
    updateChart(yearRounds, currentYearResult);
};

// 4. 更新图表逻辑
const updateChart = (yearRounds: any[], currentYearResult: any[]) => {
    const sortedRounds = [...yearRounds].sort((a, b) => a.round - b.round);
    const xAxisData = sortedRounds.map(r => `R${r.round}`);

    // 只展示积分前 10 的车手，否则图表太乱
    const topDrivers = pageInfos.drivers.slice(0, 10);

    const series = topDrivers.map(driver => {
        let cumulativeScore = 0;
        const data = sortedRounds.map(round => {
            const raceRes = currentYearResult.find(res =>
                res.round === round.round &&
                res.driverName === driver.name &&
                res.step === 'Race'
            );
            cumulativeScore += (raceRes?.score || 0);
            return cumulativeScore;
        });

        return {
            name: driver.name,
            type: 'line',
            data: data,
            smooth: true,
            symbol: 'circle',
            symbolSize: 4,
            lineStyle: { width: 3, color: driver.color },
            itemStyle: { color: driver.color },
            emphasis: { focus: 'series' }
        };
    });

    pageInfos.options.xAxis.data = xAxisData;
    pageInfos.options.series = series;
    //
    pageInfos.changeMark = !pageInfos.changeMark
};

// --- 工具函数 ---
const formatDate = (excelDate: number) => {
    const date = new Date((excelDate - 25569) * 86400 * 1000);
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
    <div class="f1-dashboard">
        <!-- 顶部控制栏 -->
        <header class="f1-header">
            <div class="f1-logo">F1 SCHEDULE <span>{{ pageInfos.year }}</span></div>
            <div class="year-selector">
                <button v-for="y in pageInfos.availableYears" :key="y" :class="{ active: pageInfos.year === y }"
                    @click="pageInfos.year = y">
                    {{ y }}
                </button>
            </div>
        </header>

        <main class="main-content">
            <!-- 左侧：赛程列表 (滚动区) -->
            <section class="schedule-section">
                <div class="list-f1">
                    <div v-for="round in pageInfos.rounds" :key="round.round" class="f1-card"
                        :class="{ active: pageInfos.currentRound === round.round }"
                        @click="pageInfos.currentRound = round.round">
                        <!-- 状态边条 (F1红) -->
                        <div class="card-status"></div>

                        <div class="card-body">
                            <div class="date-box">
                                <span class="day">{{ round.range }}</span>
                                <span class="month">{{ round.month }}</span>
                            </div>

                            <div class="circuit-info">
                                <div class="round-tag">ROUND {{ round.round }}</div>
                                <div class="country-line">
                                    <img :src="`/docs/flags/${round.country}.png`" class="mini-flag" />
                                    <span class="country-name">{{ round.country }}</span>
                                    <span class="sprint-badge" v-if="round.hasSprint">SPRINT</span>
                                </div>
                                <div class="circuit-name">{{ round.circuit }}</div>
                            </div>

                            <div class="track-thumb">
                                <img :src="`/docs/f1/carbons/${round.img}.png`" />
                            </div>

                            <div class="item-infos">
                                <div class="item-title">Number of Laps</div>
                                <div class="item-laps">{{ round.laps }}</div>
                                <div class="item-title">Circuit Length</div>
                                <div class="item-length">{{ round.length }} km</div>
                            </div>
                        </div>

                        <!-- 展开详情 (Race Sessions) -->
                        <div class="card-details" v-if="round.races && round.races.length">
                            <div class="sessions-grid">
                                <div v-for="(race, index) in round.races" :key="race.step" class="session-item"
                                    :style="{ '--order': index }">
                                    <div class="session-meta">
                                        <span class="step-tag">{{ race.step }}</span>
                                        <span class="session-time">{{ formatTime(race.startTime) }}</span>
                                    </div>

                                    <!-- 赛车赛道区域 -->
                                    <div class="winner-preview" :style="{ '--team-color': race.color || '#333' }">
                                        <!-- 赛道背景装饰线 -->
                                        <div class="track-line"></div>

                                        <!-- 赛车图片：带动画 -->
                                        <div class="car-anim-container">
                                            <img :src="`/docs/f1/cars/${race.team || 'generic'}.png`" class="car-img"
                                                :class="{ 'is-placeholder': !race.isFinished }" />
                                            <!-- 尾迹云动画 (可选) -->
                                            <div class="speed-lines" v-if="race.isFinished"></div>
                                        </div>

                                        <!-- 车号展示 (可选) -->
                                        <div class="driver-no-overlay" v-if="race.isFinished">
                                            {{ race.no }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 右侧：排名与图表 -->
            <aside class="sidebar-section">
                <!-- 积分榜 -->
                <div class="standings-container">
                    <h3 class="section-title">DRIVER STANDINGS</h3>
                    <div class="list-drivers">
                        <div v-for="(driver, index) in pageInfos.drivers" :key="driver.code" class="driver-f1-card">
                            <!-- 车队色条指示器 -->
                            <div class="team-indicator" :style="{ background: driver.color }"></div>

                            <!-- 左侧：战绩数据区 -->
                            <div class="stats-side">
                                <div class="top-main-stats">
                                    <div class="rank-box">
                                        <span class="value">{{ index + 1 }}</span>
                                        <span class="label">RANK</span>
                                    </div>
                                    <div class="points-box">
                                        <span class="value">{{ driver.score }}</span>
                                        <span class="label">PTS</span>
                                    </div>
                                </div>

                                <div class="bottom-minor-stats">
                                    <div class="stat-pill">
                                        <span class="t">POL</span>
                                        <span class="v">{{ driver.first }}</span>
                                    </div>
                                    <div class="stat-pill">
                                        <span class="t">P1</span>
                                        <span class="v">{{ driver.win }}</span>
                                    </div>
                                    <div class="stat-pill">
                                        <span class="t">POD</span>
                                        <span class="v">{{ driver.award }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- 右侧：选手形象与基础信息 -->
                            <div class="info-side">
                                <div class="driver-meta">
                                    <div class="number-flag">
                                        <img class="driver-no" :src="`/docs/f1/nos/${driver.no}.png`" alt="" srcset="">
                                        <img :src="`/docs/flags/${driver.country}.png`" class="flag" />
                                    </div>
                                    <div class="driver-name">
                                        <span class="fname">{{ driver.name.split(' ')[0] }}</span>
                                        <span class="lname">{{ driver.name.split(' ')[1] }}</span>
                                    </div>
                                </div>

                                <!-- 大照片展示区 -->
                                <div class="photo-wrapper">
                                    <img :src="`/docs/f1/drivers/${driver.code}.png`" class="driver-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 趋势图表 -->
                <div class="chart-wrapper">
                    <h3 class="section-title">POINTS PROGRESSION</h3>
                    <div class="chart-inner">
                        <chartView :options="pageInfos.options" :change-mark="pageInfos.changeMark" />
                    </div>
                </div>
            </aside>
        </main>
    </div>
</template>

<style scoped lang="scss">
// F1 核心变量
$f1-red: #e10600;
$f1-black: #15151e;
$f1-dark-grey: #1f1f27;
$f1-silver: #949498;

* {
    font-family: 'Formula1' !important;
}

.f1-dashboard {
    background-color: $f1-black;
    color: white;
    min-height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    /* 顶部导航 */
    .f1-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 30px;
        border-bottom: 10px solid $f1-red;
        background: #000;

        .f1-logo {
            font-size: 24px;
            font-weight: 900;
            letter-spacing: -1px;

            span {
                color: $f1-red;
            }
        }

        .year-selector {
            display: flex;
            gap: 5px;

            button {
                background: #333;
                border: none;
                color: white;
                padding: 5px 15px;
                cursor: pointer;
                font-weight: bold;
                clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%); // 斜切效果

                &.active {
                    background: $f1-red;
                }
            }
        }
    }

    /* 主布局 */
    .main-content {
        display: flex;
        flex: 1;
        padding: 20px;
        gap: 20px;
        height: calc(100vh - 80px);
    }
}

/* 赛程卡片列表 */
.schedule-section {
    flex: 1;
    height: calc(100vh - 180px);
    overflow-y: auto;
    padding-right: 10px;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: $f1-red;
    }

    .list-f1 {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
}

.f1-card {
    background: $f1-dark-grey;
    border-radius: 0 15px 15px 0;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    border: 1px solid #333;

    &:hover {
        transform: translateX(10px);
        border-color: $f1-red;
    }

    &.active {
        background: #2b2b35;
    }

    .card-status {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 5px;
        background: $f1-red;
    }

    .card-body {
        display: flex;
        align-items: center;
        padding: 20px;
        gap: 30px;
    }

    .date-box {
        padding-right: 20px;
        min-width: 80px;
        border-right: 1px solid #444;
        display: flex;
        flex-direction: column;
        align-items: center;

        .day {
            font-size: 28px;
            font-weight: 900;
        }

        .month {
            font-size: 14px;
            background: $f1-red;
            padding: 2px 8px;
            border-radius: 4px;
            margin-top: 5px;
        }
    }

    .circuit-info {
        flex: 1;

        .round-tag {
            color: $f1-red;
            font-size: 12px;
            font-weight: 800;
        }

        .country-line {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 5px 0;

            .country-name {
                font-size: 24px;
                font-weight: 900;
                text-transform: uppercase;
            }

            .mini-flag {
                width: 30px;
                border-radius: 3px;
            }

            .sprint-badge {
                padding: 2px 5px;
                font-size: 12px;
                color: #fff;
                border-radius: 5px;
                background: red;
            }
        }

        .circuit-name {
            color: $f1-silver;
            font-size: 14px;
        }
    }

    .track-thumb {
        width: 120px;

        img {
            width: 100%;
            opacity: 0.6;
        }
    }

    .item-infos {
        width: 150px;
        display: flex;
        flex-direction: column;
        gap: 5px;

        .item-title {
            color: #949498;
            font-size: 10px;
        }

        .item-laps,
        .item-length {
            font-size: 18px;
            font-weight: 900;
        }
    }

    // 详情展示区
    .card-details {
        background: rgba(0, 0, 0, 0.3);
        padding: 15px 20px;
        border-top: 1px solid #333;

        .sessions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
            gap: 12px;
            padding: 10px 0;
        }

        .session-item {
            display: flex;
            flex-direction: column;
            gap: 6px;

            /* 核心：只有当父级 .f1-card 是 .active 时才触发赛车进场 */
            .f1-card.active & {
                .car-img {
                    animation: carDriveIn 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
                    animation-delay: calc(var(--order) * 0.15s + 0.3s);
                }

                .speed-lines {
                    animation: speedFade 0.8s ease-out forwards;
                    animation-delay: calc(var(--order) * 0.15s + 0.3s);
                }
            }
        }

        .session-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 4px;

            .step-tag {
                font-size: 11px;
                font-weight: 800;
                color: $f1-silver;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .session-time {
                font-size: 11px;
                color: #888;
                font-family: monospace;
            }
        }

        .winner-preview {
            position: relative;
            height: 44px;
            background: #0b0b0e; // 赛道深色
            border-radius: 4px;
            overflow: hidden;
            display: flex;
            align-items: center;

            // 底部车队色条
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: var(--team-color);
                box-shadow: 0 0 10px var(--team-color); // 增加霓虹发光感
            }

            .track-line {
                position: absolute;
                width: 100%;
                height: 1px;
                background: repeating-linear-gradient(to right, #333, #333 10px, transparent 10px, transparent 20px);
                opacity: 0.3;
                top: 50%;
            }
        }

        .car-anim-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 10px;

            .car-img {
                height: 28px;
                z-index: 2;
                transform: translateX(100vw); // 初始位置在屏幕外
                will-change: transform;

                &.is-placeholder {
                    filter: brightness(0) opacity(0.2); // 未开始的比赛车子是阴影
                }
            }
        }

        /* 速度感装饰线 */
        .speed-lines {
            position: absolute;
            right: 30px;
            width: 60px;
            height: 15px;
            background: linear-gradient(to right, transparent, var(--team-color));
            opacity: 0;
            clip-path: polygon(20% 0%, 100% 50%, 20% 100%, 0% 50%);
            filter: blur(4px);
        }

        .driver-no-overlay {
            position: absolute;
            left: 8px;
            font-size: 20px;
            font-weight: 900;
            font-style: italic;
            color: rgba(255, 255, 255, 0.05); // 极淡的数字背景
            user-select: none;
        }
    }
}

/* 进场动画 */
@keyframes carDriveIn {
    0% {
        transform: translateX(150px) skewX(-15deg);
        opacity: 0;
    }
    70% {
        transform: translateX(-5px) skewX(-5deg); // 稍微冲过头一点
        opacity: 1;
    }
    100% {
        transform: translateX(0) skewX(0);
        opacity: 1;
    }
}

@keyframes speedFade {
    0% { width: 0; opacity: 0; transform: translateX(20px); }
    50% { width: 100px; opacity: 0.4; }
    100% { width: 0; opacity: 0; transform: translateX(-40px); }
}

/* 侧边栏 */
.sidebar-section {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .section-title {
        font-size: 16px;
        border-left: 4px solid $f1-red;
        padding-left: 10px;
        margin-bottom: 15px;
        letter-spacing: 1px;
    }
}

/* 积分榜容器 */
.standings-container {
    flex: 1;
    background: #101015; // 更深的底色
    padding: 20px;
    border-radius: 16px;

    .list-drivers {
        height: calc(100vh - 580px);
        overflow-y: auto;
        padding-right: 8px;

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background: $f1-red;
        }
    }
}

.driver-f1-card {
    position: relative;
    margin-bottom: 15px;
    height: 110px;
    overflow: hidden;
    border: 1px solid #333;
    border-radius: 0 12px 12px 0;
    background: linear-gradient(135deg, #1f1f27 0%, #2b2b35 100%);
    display: flex;

    &:hover {
        border-color: $f1-red;

        .photo-wrapper .driver-img {
            transform: scale(1.1);
        }
    }

    // 左侧色条
    .team-indicator {
        width: 3px;
        height: 100%;
    }

    // 左侧数据区
    .stats-side {
        width: 140px;
        padding: 10px 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-right: 1px solid rgba(255, 255, 255, 0.05);

        .top-main-stats {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;

            .rank-box {
                .label {
                    font-size: 10px;
                    color: $f1-silver;
                    display: block;
                    font-weight: bold;
                }

                .value {
                    font-size: 24px;
                    font-weight: 900;
                    line-height: 1;
                    font-style: italic;
                }
            }

            .points-box {
                text-align: right;

                .label {
                    font-size: 10px;
                    color: $f1-silver;
                    display: block;
                    font-weight: bold;
                }

                .value {
                    font-size: 24px;
                    font-weight: 900;
                    line-height: 1;
                    color: $f1-red;
                }
            }
        }

        .bottom-minor-stats {
            display: flex;
            gap: 5px;

            .stat-pill {
                flex: 1;
                background: rgba(0, 0, 0, 0.3);
                padding: 4px;
                border-radius: 4px;
                text-align: center;

                .t {
                    font-size: 8px;
                    color: $f1-silver;
                    display: block;
                    margin-bottom: 2px;
                }

                .v {
                    font-size: 16px;
                    font-weight: 700;
                }
            }
        }
    }

    // 右侧信息与形象区
    .info-side {
        flex: 1;
        padding: 10px 15px;
        position: relative;
        display: flex;
        align-items: end;

        .driver-meta {
            z-index: 2;
            position: relative;

            .number-flag {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 4px;

                .driver-no {
                    width: 50px;
                    height: 30px;
                }

                .flag {
                    width: 20px;
                    height: 14px;
                    object-fit: cover;
                    border-radius: 2px;
                }
            }

            .driver-name {
                display: flex;
                flex-direction: column;
                line-height: 1;

                .fname {
                    font-size: 12px;
                    text-transform: uppercase;
                    color: $f1-silver;
                }

                .lname {
                    font-size: 22px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: -1px;
                }
            }

            .team-tag {
                margin-top: 5px;
                font-size: 11px;
                color: $f1-silver;
                letter-spacing: 1px;
            }
        }

        .photo-wrapper {
            position: absolute;
            right: 0;
            bottom: -15px;
            width: 160px;
            height: 140px;
            z-index: 1;
            pointer-events: none;

            .driver-img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                object-position: bottom right;
                transition: transform 0.4s ease;
                // 使用遮罩让照片左侧半透明融合
                mask-image: linear-gradient(to left, black 60%, transparent 100%);
            }
        }
    }
}

/* 趋势图表 */
.chart-wrapper {
    background: #101015; // 更深的底色
    padding: 15px;
    border-radius: 15px;
    height: 280px;

    .chart-inner {
        height: 230px;
    }
}
</style>