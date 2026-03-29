<script lang="ts" setup>
import { reactive, onMounted, computed, watch, nextTick, onUnmounted } from 'vue'

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
    //
    viewMode: 'drivers', // 'drivers' | 'teams'
    drivers: [] as any[],
    constructors: [] as any[],
    // Echarts 配置
    changeMark: false,
    options: {
        grid: { top: 10, bottom: 10, left: 0, right: 0, containLabel: true, },
        xAxis: {
            type: 'category',
            data: [],
        },
        yAxis: {
            type: 'value',
            name: 'Points',
        },
        series: []
    } as any
})

// 原始数据缓存（避免重复读取 Excel）
let rawData: {
    rounds: any[],
    races: any[],
    result: any[],
    circuits: any[],
    drivers: any[],
    teams: any[],
    mapping: any[]
} | null = null;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// 赛车动画
let observer: IntersectionObserver | null = null;
const initObserver = () => {
    // 创建观察器
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 当元素进入视窗 (isIntersecting 为 true)
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-active');

                // 如果你希望动画只执行一次，可以停止观察该元素
                // observer?.unobserve(entry.target);
            } else {
                // 如果你希望每次滚出去再滚回来都重复执行，可以移除类名
                entry.target.classList.remove('animate-active');
            }
        });
    }, {
        threshold: 0.2, // 元素出现 20% 时触发
        rootMargin: '0px 0px -50px 0px' // 距离底部还有50px时提前触发，观感更顺滑
    });

    // 获取所有需要观察的卡片
    const cards = document.querySelectorAll('.f1-card');
    cards.forEach(card => observer?.observe(card));
};

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

    // 确保数据渲染完成后再绑定观察器
    await nextTick();
    initObserver();
});

onUnmounted(() => {
    // 销毁观察器防止内存泄漏
    if (observer) {
        observer.disconnect();
    }
});

// 2. 监听年份变化
watch(() => pageInfos.year, async () => {
    if (rawData) {
        processData();

        // 等待 DOM 更新后重新绑定
        await nextTick();
        if (observer) {
            observer.disconnect(); // 先清空旧的
        }
        initObserver(); // 再绑定新的
    }
});

// 3. 数据处理主函数
const processData = () => {
    if (!rawData) return;

    const { year } = pageInfos;
    const { rounds, races, result, circuits, drivers, teams, mapping } = extend.ExObject.copy(rawData);

    // 当前年份的信息
    const yearRounds = rounds.filter(r => r.year == year).map((r: any) => {
        const mapInfos = circuits.find(c => c.id === r.circuitID);
        return { ...r, ...mapInfos }
    });
    const yearRaces = races.filter(r => r.year == year);
    yearRaces.map((race: any) => {
        race.date = formatDate(race.date)
        race.week = weekDays[race.date.getDay()];
        console.log('Testing', race.date, race.date.getDay(),race.week )
        race.startTime = formatTime(race.startTime)
        if (race.endTime) race.endTime = formatTime(race.endTime)
    })
    const yearDrivers = drivers.filter(r => r.year === year);
    const yearResult = result.filter(r => r.year === year);
    yearResult.map((r: any) => {
        if (r.teamName) {
            let teamName = mapping.find((a: any) => (a.teamName == r.teamName));
            r.teamCode = teamName.teamCode
        }
    })
    const yearTeams = teams.filter(r => r.year == year);

    // 处理车手积分榜
    const processedDrivers = yearDrivers.map((d: any) => {
        const driverResults = yearResult.filter(r => r.driverName === d.name);

        // 计算各项指标
        const score = driverResults.reduce((sum, r) => sum + (Number(r.score) || 0), 0);
        const wins = driverResults.filter(r => r.step === 'Race' && r.position === 1).length;
        const podiums = driverResults.filter(r => r.step === 'Race' && r.position <= 3).length;
        const poles = driverResults.filter(r => r.step === 'Qualifying' && r.position === 1).length;

        const teamInfos = yearTeams.find(t => t.code === d.teamCode);

        return {
            ...d,
            score,
            win: wins,
            award: podiums,
            first: poles,
            color: teamInfos?.color || '#999',
        };
    });
    pageInfos.drivers = extend.ExArray.sortbyEle(processedDrivers, (a: any) => a.score, 'desc');

    // 处理车队积分榜
    const constructorData = yearTeams.map((team: any) => {
        const teamResults = yearResult.filter(r => r.teamCode === team.code);

        // 计算总分
        const totalScore = teamResults.reduce((sum, r) => sum + (Number(r.score) || 0), 0);

        // 找出该车队当年的车手 (去重)
        const teamDriverNames = [...new Set(teamResults.map(r => r.driverName))];
        const teamDriverInfos = teamDriverNames.map(name => {
            return drivers.find(d => d.name === name);
        }).filter(d => d); // 过滤掉找不到的情况

        return {
            ...team,
            score: totalScore,
            drivers: teamDriverInfos, // 包含 code, name 等
        };
    });
    pageInfos.constructors = extend.ExArray.sortbyEle(constructorData, (t: any) => t.score, 'desc');

    // 处理赛程
    let nextSessionFound = false;
    pageInfos.rounds = yearRounds.map(round => {
        const roundRaces = yearRaces.filter(ra => ra.year === year && ra.round === round.round);

        // 未找到比赛信息
        if (roundRaces.length === 0) return {
            ...round,
            month: 'TBC',
            range: '---',
            hasSprint: false,
            races: []
        };

        // 找出该分站的冠军（Race 步骤的第一名）
        let showRaces = roundRaces.filter((a: any) => a.isShow == 1).map((race: any) => {
            // 查找该 Session 的结果
            let resultInfos = yearResult.filter((a: any) =>
                a.round == race.round &&
                a.step == race.step &&
                a.position == 1 // 只要第一名
            );

            let isFinished = resultInfos.length > 0;
            let isNext = false;

            // 如果这轮还没跑，且之前还没标记过 Next，那么这一场就是我们要强调的 Next
            if (!isFinished && !nextSessionFound) {
                isNext = true;
                nextSessionFound = true; // 之后的所有场次都不会再被标记为 Next
            }

            if (isFinished) {
                // 情况 A：比赛已结束，有胜者数据
                let winner = resultInfos[0];
                let teamInfos = yearTeams.find((a: any) => (a.code == winner.teamCode));

                return {
                    ...race,
                    no: winner.driverNo,
                    team: teamInfos.code,
                    color: teamInfos.color,
                    isFinished: true, // 标记已完赛
                    isNext: false
                };
            } else {
                console.log('No result for', race)
                // 情况 B：比赛未开始或无结果
                return {
                    ...race,
                    no: '#33333d',
                    team: 'TBC',
                    color: 'TBC',
                    isFinished: false, // 标记未完赛
                    isNext: isNext
                };
            }
        });

        // 计算日期范围
        const startRace = roundRaces[0];
        const endRace = roundRaces[roundRaces.length - 1];

        return {
            ...round,
            month: months[startRace.date.getMonth()],
            range: `${startRace.date.getDate()}-${endRace.date.getDate()}`,
            hasSprint: roundRaces.some(ra => ra.step === 'Sprint'),
            races: showRaces,
        };
    });

    // 更新图表
    updateChart(yearRounds, yearResult);
};

// 4. 更新图表逻辑
const updateChart = (yearRounds: any, yearResult: any) => {
    const sortedRounds = [...yearRounds].sort((a, b) => a.round - b.round);
    const xAxisData = sortedRounds.map(r => `R${r.round}`);

    // 1. 计算每个车手的累加得分序列
    const series = pageInfos.drivers.slice(0, 10).map((driver, index) => {
        let cumulative = 0;
        const data = sortedRounds.map(round => {
            const raceRes = yearResult.filter((res: any) =>
                res.round === round.round && res.driverName === driver.name && (res.step === 'Race' || res.step == 'Sprint')
            );
            if (raceRes) {
                raceRes.forEach((item: any) => {
                    cumulative += (item?.score || 0);
                })
            }
            return cumulative;
        });

        const isP1 = index === 0;
        return {
            name: driver.name,
            type: 'line',
            data: data,
            smooth: 0.3, // 稍微平滑，更有流动感
            showSymbol: false,
            lineStyle: {
                width: isP1 ? 5 : 2, // P1 的线加粗
                color: driver.color,
                shadowBlur: isP1 ? 10 : 0, // P1 增加发光
                shadowColor: driver.color,
                opacity: isP1 ? 1 : 0.6 // 其他车手稍微透明化
            },
            // --- 关键：末端标签显示 ---
            endLabel: {
                show: true,
                formatter: (params: any) => `{name|${driver.code}}`,
                offset: [10, 0], // 向右偏移，不盖在点上
                // 为标签增加背景块，增强易读性
                rich: {
                    name: {
                        color: '#fff',
                        backgroundColor: driver.color,
                        padding: [2, 4],
                        borderRadius: 2,
                        fontSize: 10,
                        fontWeight: 'bold',
                        fontFamily: 'Arial',
                    }
                }
            },
            // --- 自动避让重叠的关键配置 ---
            labelLayout: {
                moveOverlap: 'shiftY', // 重点：当标签重叠时，在 Y 轴方向自动推开
                dx: 10
            },
            // 只有最后一点显示标签
            labelLine: {
                show: true, // 显示指引线
                length: 10,
                lineStyle: {
                    color: driver.color,
                    type: 'dashed'
                }
            },
            emphasis: {
                focus: 'series' // 鼠标悬停高亮某条线
            },
            // 动画效果
            animationDuration: 2000,
            animationEasing: 'cubicInOut'
        };
    });

    // 2. 更新配置
    pageInfos.options = {
        title: { show: false },
        backgroundColor: 'transparent',
        grid: { left: '1%', right: '18%', bottom: '1%', top: '15%', containLabel: true },
        legend: { show: false },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(21, 21, 30, 0.9)',
            borderColor: '#444',
            textStyle: { color: '#fff' },
            axisPointer: { lineStyle: { color: '#e10600', width: 2 } }
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            boundaryGap: false,
            axisLine: { lineStyle: { color: '#444' } },
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
            type: 'value',
            name: 'POINTS',
            axisLabel: { show: false },
            splitLine: { show: false },
        },
        series: series
    };
    pageInfos.changeMark = !pageInfos.changeMark
};

// --- 工具函数 ---
const formatDate = (excelDate: number) => {
    const date = new Date((excelDate - 25569) * 86400 * 1000);
    return date;
}
const formatTime = (excelTime: number) => {
    // 计算总秒数
    const totalSeconds = Math.round(excelTime * 24 * 60 * 60); // 四舍五入修正
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
                    <div v-for="round in pageInfos.rounds" :key="round.round" class="f1-card">
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
                                    <span class="country-name">{{ round.country }}<template v-if="round.city"> - {{
                                        round.city }}</template></span>
                                    <span class="sprint-badge" v-if="round.hasSprint">SPRINT</span>
                                </div>
                                <div class="circuit-name">{{ round.circuit }} - {{ round.zh }}</div>
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
                                    :class="{ 'is-next-session': race.isNext }" :style="{ '--order': index }">
                                    <div class="session-meta">
                                        <span class="step-tag">{{ race.step }}</span>
                                        <div class="meta-right">
                                            <span class="day-tag">{{ race.week }}</span>
                                            <span class="session-time">{{ race.startTime }}<template
                                                    v-if="race.endTime"> -
                                                    {{ race.endTime }}</template></span>
                                        </div>
                                    </div>

                                    <!-- 赛车赛道区域 -->
                                    <div class="winner-preview"
                                        :class="{ 'is-upcoming': !race.isFinished, 'is-next-bg': race.isNext }"
                                        :style="{ '--team-color': race.isNext ? '#e10600' : race.color }">
                                        <!-- 如果是 Next，增加一个背景流光效果 -->
                                        <div class="next-glow-line" v-if="race.isNext"></div>

                                        <!-- 赛道背景装饰线 -->
                                        <div class="track-line"></div>

                                        <!-- 特殊展示：未开始时显示“发车灯”状态 -->
                                        <div v-if="!race.isFinished" class="lights-out-status">
                                            <template v-if="race.isNext">
                                                <div class="light-dot" v-for="i in 5" :key="i"></div>
                                            </template>
                                            <span class="status-label" :class="{ 'highlight': race.isNext }">
                                                {{ race.isNext ? 'UP NEXT' : 'READY TO RACE' }}
                                            </span>
                                        </div>
                                        <!-- 车号展示 -->
                                        <div class="driver-no-overlay" v-if="race.isFinished">
                                            {{ race.no }}
                                        </div>
                                        <!-- 赛车图片：带动画 -->
                                        <div class="car-anim-container">
                                            <img :src="`/docs/f1/cars/${race.team}.png`" class="car-img"
                                                :class="{ 'is-placeholder': !race.isFinished }" />
                                            <!-- 尾迹云动画 -->
                                            <div class="speed-lines" v-if="race.isFinished"></div>
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
                    <!-- 顶部标题与切换按钮 -->
                    <div class="standings-header">
                        <h3 class="section-title">STANDINGS</h3>
                        <div class="view-switcher">
                            <button :class="{ active: pageInfos.viewMode === 'drivers' }"
                                @click="pageInfos.viewMode = 'drivers'">DRIVERS</button>
                            <button :class="{ active: pageInfos.viewMode === 'teams' }"
                                @click="pageInfos.viewMode = 'teams'">TEAMS</button>
                        </div>
                    </div>

                    <div class="list-drivers">
                        <!-- 视图一：选手列表 (保持你原来的代码) -->
                        <template v-if="pageInfos.viewMode === 'drivers'">
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
                                    <!-- 编号 (作为姓名和品牌的过渡) -->
                                    <div class="mid-section">
                                        <img :src="`/docs/f1/nos/${driver.code}_${driver.no}.png`"
                                            class="img-driver-no" />
                                    </div>

                                    <!-- 车队形象 (显著位置) -->
                                    <div class="team-header">
                                        <div class="team-brand">
                                            <img :src="`/docs/f1/teams/${driver.teamCode}.png`"
                                                class="img-team-large" />
                                            <div class="team-divider" :style="{ background: driver.color }"></div>
                                            <img :src="`/docs/flags/${driver.country}.png`" class="img-flag-mini" />
                                        </div>
                                    </div>

                                    <!-- 姓名区域 (压低重心) -->
                                    <div class="name-footer">
                                        <div class="fname">{{ driver.name.split(' ')[0] }}</div>
                                        <div class="lname">{{ driver.name.split(' ')[1] }}</div>
                                    </div>

                                    <!-- 背景形象区 -->
                                    <div class="photo-wrapper">
                                        <img :src="`/docs/f1/drivers/${driver.code}.png`" class="driver-img" />
                                    </div>
                                </div>
                            </div>
                        </template>

                        <!-- 视图二：车队列表 -->
                        <template v-else>
                            <div v-for="(team, index) in pageInfos.constructors" :key="team.code" class="team-f1-card">
                                <!-- 背景车队代码装饰 (可选，增加设计感) -->
                                <div class="bg-team-code">{{ team.code }}</div>

                                <!-- 车队色条指示器 -->
                                <div class="team-indicator" :style="{ background: team.color }"></div>

                                <!-- 1. 左上：排名与积分 -->
                                <div class="top-left-stats">
                                    <img :src="`/docs/f1/teams/${team.code}.png`" class="team-logo" />
                                    <div class="color-divider" :style="{ background: team.color }"></div>
                                    <div class="points-value">
                                        <span class="num">{{ team.score }}</span>
                                        <span class="unit">PTS</span>
                                    </div>
                                </div>

                                <!-- 2. 右上：车队图标与名称 -->
                                <div class="top-right-drivers">
                                    <div class="list-drivers">
                                        <div v-for="d in team.drivers" :key="d.code" class="mini-driver-card">
                                            <div class="driver-img-box">
                                                <img :src="`/docs/f1/drivers/${d.code}.png`" />
                                            </div>
                                            <span class="driver-code">{{ d.code }}</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- 3. 底层/整体偏下：车辆图片 (作为视觉核心) -->
                                <div class="bottom-car-visual">
                                    <img :src="`/docs/f1/cars/${team.code}.png`" class="team-car-img" />
                                </div>
                            </div>
                        </template>
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
    letter-spacing: 1px !important;
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

    &.animate-active {
        .car-img {
            animation: carDriveIn 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
            animation-delay: calc(var(--order) * 0.15s + 0.3s);
        }

        .speed-lines {
            animation: speedFade 0.8s ease-out forwards;
            animation-delay: calc(var(--order) * 0.15s + 0.3s);
        }
    }

    &:hover {
        transform: translateX(10px);
        border-color: $f1-red;
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
        padding: 10px 20px;
        gap: 20px;
    }

    .date-box {
        padding-right: 20px;
        width: 120px;
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
        padding: 5px 20px;
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

            .meta-right {
                display: flex;
                align-items: center;
                gap: 6px;

                .day-tag {
                    font-size: 10px;
                    background: #444;
                    color: #fff;
                    padding: 1px 4px;
                    border-radius: 2px;
                    font-weight: 900;
                }

                .session-time {
                    font-size: 11px;
                    color: #888;
                    font-family: monospace;
                }
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

            &.is-next-bg {
                background: linear-gradient(90deg, #3a0000 0%, #15151e 100%) !important;
                border-bottom: 1px solid #e10600 !important; // 实线红边
                box-shadow: inset 0 0 15px rgba(225, 6, 0, 0.2);

                .track-line {
                    opacity: 0.3;
                    background: repeating-linear-gradient(to right, #e10600, #e10600 5px, transparent 5px, transparent 10px);
                }
            }

            &.is-upcoming {
                background: linear-gradient(90deg, #15151e 0%, #1f1f27 100%);
                border-bottom: 2px dashed #444; // 未开始时使用虚线边框

                .track-line {
                    opacity: 0.1;
                }
            }

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

        /* 横跨赛道的流光动画 */
        .next-glow-line {
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(225, 6, 0, 0.1), transparent);
            animation: scanLine 3s infinite linear;
            z-index: 1;
        }

        /* 五盏发车灯效果 */
        .lights-out-status {
            position: absolute;
            left: 15px;
            display: flex;
            align-items: center;
            gap: 4px;
            z-index: 2;

            .light-dot {
                width: 8px;
                height: 8px;
                background: #331111; // 暗红色
                border-radius: 50%;
                box-shadow: inset 0 0 2px #000;

                // 模拟 F1 发车灯闪烁
                animation: lightPulse 2s infinite ease-in-out;

                &:nth-child(2) {
                    animation-delay: 0.2s;
                }

                &:nth-child(3) {
                    animation-delay: 0.4s;
                }

                &:nth-child(4) {
                    animation-delay: 0.6s;
                }

                &:nth-child(5) {
                    animation-delay: 0.8s;
                }
            }

            .status-label {
                margin-left: 8px;
                font-size: 9px;
                font-weight: 900;
                color: #444;
                letter-spacing: 1px;
            }
        }

        .status-label.highlight {
            color: #e10600 !important;
            font-weight: 900;
            // animation: badgePulse 1.5s infinite; 
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
                width: 95px;
                height: 28px;
                z-index: 2;
                transform: translateX(-150px); // 初始位置在屏幕外
                will-change: transform;
                opacity: 0;

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
            // color: rgba(255, 255, 255, 0.1); // 极淡的数字背景
            user-select: none;
        }
    }
}

// 亮起红色
@keyframes lightPulse {

    0%,
    100% {
        background: #331111;
        box-shadow: none;
    }

    50% {
        background: #e10600;
        box-shadow: 0 0 8px #e10600;
    }

}

@keyframes badgePulse {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.7;
        transform: scale(0.95);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes scanLine {
    0% {
        left: -100%;
    }

    100% {
        left: 200%;
    }
}

/* 进场动画 */
@keyframes carDriveIn {
    0% {
        transform: translateX(-150px) skewX(-15deg);
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
    0% {
        width: 0;
        opacity: 0;
        transform: translateX(20px);
    }

    50% {
        width: 100px;
        opacity: 0.4;
    }

    100% {
        width: 0;
        opacity: 0;
        transform: translateX(-40px);
    }
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
        height: calc(100vh - 550px);
        overflow-y: auto;
        padding-right: 8px;

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background: $f1-red;
        }
    }

    .standings-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .view-switcher {
            display: flex;
            background: #000;
            padding: 2px;
            border-radius: 4px;

            button {
                background: transparent;
                border: none;
                color: $f1-silver;
                font-size: 10px;
                font-weight: 900;
                padding: 4px 10px;
                cursor: pointer;
                transition: all 0.3s;

                &.active {
                    background: #333;
                    color: #fff;
                }
            }
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
        padding-left: 5px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between; // 强制内容分布在上下两端
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
        overflow: hidden;

        // 1. 顶部车队区
        .team-header {
            z-index: 3;

            .team-brand {
                display: flex;
                align-items: center;
                gap: 12px;

                .img-team-large {
                    height: 32px; // 显著增大车队Logo
                    width: auto;
                    object-fit: contain;
                    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.5));
                }

                .team-divider {
                    width: 2px;
                    height: 18px;
                    opacity: 0.6;
                }

                .img-flag-mini {
                    width: 22px;
                    height: 15px;
                    object-fit: cover;
                    border-radius: 2px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }
            }
        }

        // 2. 中间编号区
        .mid-section {
            z-index: 3;
            margin-top: 10px;

            .img-driver-no {
                width: 50px;
                height: 30px;
                opacity: 0.9;
                filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
            }
        }

        // 3. 底部姓名区 (核心优化：压到底部)
        .name-footer {
            z-index: 3;
            position: relative;
            padding-bottom: 5px; // 留出一点安全间距

            .fname {
                font-size: 13px;
                font-weight: 500;
                color: $f1-silver;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin-bottom: -4px; // 让两行靠得更紧
            }

            .lname {
                font-size: 24px; // 极大的姓氏
                font-weight: 900;
                color: #fff;
                text-transform: uppercase;
                letter-spacing: -1px;
                line-height: 1;
            }
        }

        // 4. 右侧照片形象
        .photo-wrapper {
            position: absolute;
            right: -15px; // 增加出框感
            bottom: -20px; // 让底座更深
            width: 180px; // 增大图片尺寸
            height: 120%; // 高度溢出以获得更好的裁剪效果
            z-index: 1;
            pointer-events: none;

            .driver-img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                object-position: bottom right;

                // 优化蒙版：确保底部和左侧完美渐变消失，不遮盖底部的名字
                mask-image: linear-gradient(to left bottom,
                        black 30%,
                        rgba(0, 0, 0, 0.5) 60%,
                        transparent 90%);
                -webkit-mask-image: linear-gradient(to left bottom,
                        black 30%,
                        rgba(0, 0, 0, 0.5) 60%,
                        transparent 90%);
            }
        }
    }
}

.team-f1-card {
    position: relative;
    height: 125px; // 车队卡片稍高一些，以展示完整的赛车
    background: linear-gradient(135deg, #1a1a20 0%, #25252d 100%);
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #333;
    overflow: hidden;
    display: flex;

    &:hover {
        .bg-team-code {
            left: calc(100% - 10px); // 移动到右侧边缘
            transform: translateX(-100%) skewX(-15deg); // 靠右对齐并增加 F1 风格斜体
            bottom: 40px; // 抬高位置，避开底部的车手头像
            font-size: 50px; // 缩小尺寸
            letter-spacing: 5px; // 增加字间距，更有科技感
            color: rgba(255, 255, 255, 0.15); // 亮度适中，不干扰前景
            opacity: 1;
        }

        // 也可以顺便让赛车稍微动一下，增加联动感
        .bottom-car-visual {
            transform: translateX(-50%);
        }
    }

    // 背景装饰文字
    .bg-team-code {
        position: absolute;
        bottom: -10px; // 初始位置靠下
        left: 50%;
        transform: translateX(-50%); // 初始居中

        font-size: 100px;
        font-weight: 900;
        color: rgba(255, 255, 255, 0.03);
        z-index: 0;
        pointer-events: none;
        white-space: nowrap;

        // 关键：贝塞尔曲线让移动像赛车起步一样有惯性感
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        text-transform: uppercase;
        font-style: italic;
    }

    .team-indicator {
        width: 3px;
        height: 100%;
        z-index: 2;
    }

    // 1. 左上排名
    .top-left-stats {
        position: absolute;
        top: 5px;
        left: 10px;
        z-index: 3;
        display: flex;
        align-items: center;
        gap: 10px;

        .team-logo {
            height: 50px;
            width: auto;
            object-fit: contain;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
        }

        .color-divider {
            width: 2px;
            height: 24px; // 高度与 Logo 和排名对齐
            border-radius: 2px;
            opacity: 0.8;
        }

        .points-value {
            .num {
                font-size: 32px;
                font-weight: 800;
                color: $f1-red;
            }

            .unit {
                font-size: 14px;
                margin-left: 3px;
                color: $f1-silver;
            }
        }
    }

    // 2. 右上品牌
    .top-right-drivers {
        position: absolute;
        top: 15px;
        right: 5px;
        text-align: right;
        z-index: 3;
        display: flex;
        align-items: flex-start;
        gap: 10px;

        .list-drivers {
            height: 51px;
            display: flex;
            gap: 12px;

            .mini-driver-card {
                display: flex;
                flex-direction: column;
                align-items: center;

                .driver-img-box {
                    width: 36px;
                    height: 36px;
                    background: #000;
                    border: 1px solid #444;
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: top;
                    }
                }

                .driver-code {
                    font-size: 9px;
                    font-weight: 900;
                    color: $f1-silver;
                    margin-top: 4px;
                }
            }
        }
    }

    // 3. 底部车辆 (视觉重心)
    .bottom-car-visual {
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-60%);
        width: 280px;
        z-index: 1;
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);

        .team-car-img {
            width: 100%;
            height: auto;
            filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.6));
            // 进场动画
            animation: teamCarDriveIn 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
    }
}

// 赛车进场动画
@keyframes teamCarDriveIn {
    0% {
        transform: translateX(100px);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}

/* 趋势图表 */
.chart-wrapper {
    position: relative;
    padding: 10px;
    height: 280px;
    border: 1px solid #333;
    border-radius: 12px;
    background: linear-gradient(135deg, #15151e 0%, #1a1a24 100%);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

    &::before {
        content: 'CHAMPIONSHIP TRACKER';
        position: absolute;
        top: -12px;
        left: 20px;
        background: #e10600;
        color: #fff;
        padding: 2px 10px;
        font-size: 10px;
        font-weight: 900;
        font-style: italic;
        border-radius: 2px;
    }

    .chart-inner {
        height: 230px;
    }
}
</style>