<script lang="ts" setup>
import { reactive, onMounted, watch, nextTick, onUnmounted, ref } from 'vue'

import { toPng } from 'html-to-image'
import { CameraOutlined, ExpandOutlined, TrophyOutlined } from '@ant-design/icons-vue'

import chartView from '@/components/echarts/view.vue'

import radioView from './radio.vue'
import * as radios from './radios.datas.ts'

import * as xlsx from '@/commons/utils/xlsx'
import * as extend from '@/commons/utils/extends'

// --- 状态定义 ---
const pageInfos = reactive({
    year: 0,
    availableYears: [] as number[],
    //
    currentRound: '',
    rounds: [] as any[],
    result: [] as any[],
    //
    viewMode: 'drivers', // 'drivers' | 'teams'
    drivers: [] as any[],
    constructors: [] as any[],
    history: [] as any[],
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
    mapping: any[],
    moments: any[],
    history: any[],
} | null = null;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// Team Radio
const radioState = reactive({
    activeDriverCode: null as string | null,
    data: null as (typeof radios.list)[number] | null,
    playing: false,
})

let radioAudio: HTMLAudioElement | null = null
let radioHideTimer: ReturnType<typeof setTimeout> | null = null

const getRandomRadio = (driverCode: string) => {
    const matched = radios.list.filter(item => item.driverCode === driverCode)
    if (!matched.length) return null
    return matched[Math.floor(Math.random() * matched.length)]
}

const hasRadioData = (driverCode: string) => radios.list.some(item => item.driverCode === driverCode)

const playRadioSfx = async () => {
    if (!radioAudio) {
        radioAudio = new Audio('/docs/f1/comps/f1-radio.mp3')
    }
    radioAudio.currentTime = 0
    await radioAudio.play()
}

const resetRadioState = () => {
    if (radioHideTimer) {
        clearTimeout(radioHideTimer)
        radioHideTimer = null
    }
    radioState.playing = false
    radioState.activeDriverCode = null
    radioState.data = null
}

const onDriverInfoClick = async (driver: any) => {
    if (radioState.activeDriverCode) return

    const record = getRandomRadio(driver.code)
    if (!record) return

    radioState.activeDriverCode = driver.code
    radioState.data = record
    radioState.playing = false

    try {
        await playRadioSfx()
    } catch {
        // autoplay policy may block; continue showing radio
    }

    radioState.playing = true
}

const onRadioFinished = () => {
    if (radioHideTimer) clearTimeout(radioHideTimer)
    radioHideTimer = setTimeout(resetRadioState, 3000)
}

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

const listF1Ref = ref<HTMLElement | null>(null)
const capturing = ref(false)
const historyModal = ref(false)
const chartModal = ref(false)
const fullChartOptions = ref<any>({})
const fullChartChangeMark = ref(false)
const chartSource = {
    rounds: [] as any[],
    result: [] as any[],
}

const waitForImages = (root: HTMLElement) => {
    const imgs = Array.from(root.querySelectorAll('img'))
    return Promise.all(imgs.map(img => {
        if (img.complete) return Promise.resolve()
        return new Promise<void>((resolve) => {
            img.addEventListener('load', () => resolve(), { once: true })
            img.addEventListener('error', () => resolve(), { once: true })
        })
    }))
}

const captureSchedule = async () => {
    const el = listF1Ref.value
    if (!el || capturing.value) return

    capturing.value = true
    document.querySelectorAll('.f1-card').forEach(card => card.classList.add('animate-active'))

    const section = el.closest('.schedule-section') as HTMLElement | null
    const dashboard = el.closest('.f1-dashboard') as HTMLElement | null
    const restoreStyles: Array<() => void> = []

    const unlockOverflow = (node: HTMLElement | null) => {
        if (!node) return
        const height = node.style.height
        const overflow = node.style.overflow
        node.style.height = 'auto'
        node.style.overflow = 'visible'
        restoreStyles.push(() => {
            node.style.height = height
            node.style.overflow = overflow
        })
    }

    unlockOverflow(section)
    unlockOverflow(dashboard)

    try {
        await nextTick()
        await document.fonts.ready
        await waitForImages(el)
        await new Promise(resolve => setTimeout(resolve, 80))

        const dataUrl = await toPng(el, {
            backgroundColor: '#15151e',
            pixelRatio: 2,
            cacheBust: true,
            skipAutoScale: true,
            width: el.scrollWidth,
            height: el.scrollHeight,
        })

        const link = document.createElement('a')
        link.download = `f1-schedule-${pageInfos.year}.png`
        link.href = dataUrl
        link.click()
    } catch (error) {
        console.error('截取赛程失败:', error)
    } finally {
        restoreStyles.forEach(restore => restore())
        capturing.value = false
    }
};

// 1. 初始化读取数据
onMounted(async () => {
    const temps: any = await xlsx.readExcel('/docs/datas/f1.xlsx');
    rawData = temps;

    const years = [...new Set((rawData?.rounds || []).map((r: any) => Number(r.year)))]
        .filter((year: number) => !Number.isNaN(year))
        .sort((a: number, b: number) => a - b);
    pageInfos.availableYears = years;
    pageInfos.history = [...(rawData?.history || [])]
        .sort((a: any, b: any) => Number(b.year) - Number(a.year));

    const currentYear = new Date().getFullYear();
    pageInfos.year = years.includes(currentYear) ? currentYear : (years[years.length - 1] || currentYear);
    processData();

    await nextTick();
    initObserver();
    yearWatchReady = true;
});

onUnmounted(() => {
    // 销毁观察器防止内存泄漏
    if (observer) {
        observer.disconnect();
    }
    stopFullChartReveal()
    resetRadioState()
    radioAudio?.pause()
});

let yearWatchReady = false

// 2. 监听年份变化
watch(() => pageInfos.year, async () => {
    if (!rawData || !yearWatchReady) return

    processData();

    // 等待 DOM 更新后重新绑定
    await nextTick();
    if (observer) {
        observer.disconnect(); // 先清空旧的
    }
    initObserver(); // 再绑定新的
});

// 3. 数据处理主函数
const processData = () => {
    if (!rawData) return;

    const { year } = pageInfos;
    const { rounds, races, result, circuits, drivers, teams, mapping, moments } = extend.ExObject.copy(rawData);

    // 当前年份的信息
    const yearRounds = rounds.filter(r => r.year == year).map((r: any) => {
        const mapInfos = circuits.find(c => c.id === r.circuitID);
        return { ...r, ...mapInfos }
    });
    const yearRaces = races.filter(r => r.year == year);
    yearRaces.map((race: any) => {
        race.date = formatDate(race.date)
        race.week = weekDays[race.date.getDay()];
        race.hasStartTime = hasRaceTime(race.startTime)
        race.startTime = race.hasStartTime ? formatTime(race.startTime) : ''
        race.endTime = hasRaceTime(race.endTime) ? formatTime(race.endTime) : ''
    })
    const yearDrivers = drivers.filter(r => r.year === year);
    pageInfos.result = result;
    console.log(result)

    const yearResult = result.filter(r => r.year === year);
    yearResult.map((r: any) => {
        if (r.teamName) {
            let teamName = mapping.find((a: any) => (a.teamName == r.teamName));
            r.teamCode = teamName.teamCode
        }
    })
    const yearTeams = teams.filter(r => r.year == year);
    const roundInfoMap = new Map(yearRounds.map((r: any) => [Number(r.round), r]));

    // 处理车手积分榜
    const processedDrivers = yearDrivers.map((d: any) => {
        const driverResults = yearResult.filter(r => r.driverName === d.name);

        // 计算各项指标
        const score = driverResults.reduce((sum, r) => sum + (Number(r.score) || 0), 0);
        const wins = driverResults.filter(r => r.step === 'Race' && r.position === 1).length;
        const podiums = driverResults.filter(r => r.step === 'Race' && r.position <= 3).length;
        const poles = driverResults.filter(r => r.step === 'Qualifying' && r.position === 1).length;

        const scoreDetailsMap = new Map<number, any>();
        driverResults
            .filter((r: any) => r.step === 'Race' || r.step === 'Sprint')
            .forEach((r: any) => {
                const roundNo = Number(r.round);
                const roundInfo = roundInfoMap.get(roundNo);
                const country = roundInfo?.country || '';
                const city = roundInfo?.city || '';
                const existing = scoreDetailsMap.get(roundNo);
                const next = existing || {
                    round: r.round,
                    location: city ? `${country}-${city}` : country,
                    position: r.position,
                    score: 0,
                    hasRace: false,
                };
                next.score += Number(r.score) || 0;
                if (r.step === 'Race') {
                    next.position = r.position;
                    next.hasRace = true;
                } else if (!next.hasRace) {
                    next.position = r.position;
                }
                scoreDetailsMap.set(roundNo, next);
            });
        const scoreDetails = Array.from(scoreDetailsMap.values())
            .sort((a: any, b: any) => a.round - b.round);

        const teamInfos = yearTeams.find(t => t.code === d.teamCode);

        return {
            ...d,
            score,
            win: wins,
            award: podiums,
            first: poles,
            scoreDetails,
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
            return yearDrivers.find(d => d.name === name) || drivers.find(d => d.name === name);
        }).filter(d => d); // 过滤掉找不到的情况

        const driverCodeByName = new Map(teamDriverInfos.map((d: any) => [d.name, d.code]));
        const roundMap = new Map<number, any>();
        teamResults
            .filter((r: any) => r.step === 'Race' || r.step === 'Sprint' || r.step === 'Qualifying')
            .forEach((r: any) => {
                const code = driverCodeByName.get(r.driverName);
                if (!code) return;

                const roundNo = Number(r.round);
                const roundInfo = roundInfoMap.get(roundNo);
                const country = roundInfo?.country || '';
                const city = roundInfo?.city || '';
                const row = roundMap.get(roundNo) || {
                    round: r.round,
                    location: city ? `${country}-${city}` : country,
                    byDriver: new Map<string, any>(),
                };
                const stat = row.byDriver.get(code) || {
                    position: '',
                    score: null,
                    hasRace: false,
                    qualiPosition: '',
                };
                if (r.step === 'Qualifying') {
                    stat.qualiPosition = r.position;
                } else {
                    stat.score = (stat.score || 0) + (Number(r.score) || 0);
                    if (r.step === 'Race') {
                        stat.position = r.position;
                        stat.hasRace = true;
                    } else if (!stat.hasRace) {
                        stat.position = r.position;
                    }
                }
                row.byDriver.set(code, stat);
                roundMap.set(roundNo, row);
            });

        const scoreDetails = Array.from(roundMap.values())
            .sort((a: any, b: any) => a.round - b.round)
            .map((row: any) => {
                const cells = teamDriverInfos.map((d: any) => {
                    const stat = row.byDriver.get(d.code);
                    return {
                        code: d.code,
                        position: stat ? stat.position : '',
                        score: stat ? stat.score : null,
                        qualiPosition: stat ? stat.qualiPosition : '',
                    };
                });
                const scored = cells.map((c: any) => c.score).filter((s: any) => s != null);
                const maxScore = scored.length ? Math.max(...scored) : 0;
                const qualiNums = cells
                    .map((c: any) => c.qualiPosition)
                    .filter((p: any) => p !== '' && p != null && !Number.isNaN(Number(p)))
                    .map((p: any) => Number(p));
                const bestQuali = qualiNums.length ? Math.min(...qualiNums) : null;
                return {
                    round: row.round,
                    location: row.location,
                    cells: cells.map((c: any) => ({
                        ...c,
                        isMax: c.score != null && maxScore > 0 && c.score === maxScore,
                        isBestQuali: c.qualiPosition !== '' && c.qualiPosition != null
                            && !Number.isNaN(Number(c.qualiPosition))
                            && Number(c.qualiPosition) === bestQuali,
                    })),
                };
            });

        return {
            ...team,
            score: totalScore,
            drivers: teamDriverInfos, // 包含 code, name 等
            scoreDetails,
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

        //
        const momentInfos = moments.filter((m: any) => m.year === year && m.round === round.round);
        round.moments = momentInfos.length > 0 ? momentInfos : []

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

const isNumericPosition = (position: any) => position !== '' && position != null && !Number.isNaN(Number(position));
const getScorePopupContainer = () => document.body;
const historyTeamLogoMap: Record<string, string> = {
    'Red Bull': 'RedBulls',
}
const circuitMapMode = ref<'full' | 'drs'>('full')
const getCircuitMapSrc = (img: string, mode: 'full' | 'drs' = circuitMapMode.value) =>
    img ? `/docs/f1/carbons/${img}-${mode}.png` : ''
const onCircuitMapError = (event: Event) => {
    const imgEl = event.target as HTMLImageElement
    if (imgEl.dataset.fallbackApplied === '1') return
    // 部分赛道没有 -drs，回退到 -full
    if (circuitMapMode.value === 'drs') {
        imgEl.dataset.fallbackApplied = '1'
        imgEl.src = imgEl.src.replace(/-drs\.png(?:\?.*)?$/, '-full.png')
    }
}

const getHistoryTeamLogo = (team: string) => {
    if (!team) return ''
    const code = historyTeamLogoMap[team] || team.replace(/\s+/g, '')
    return `/docs/f1/teams/${code}.png`
}
const onHistoryLogoError = (event: Event) => {
    const img = event.target as HTMLImageElement
    img.style.display = 'none'
}

/** 优先 code_teamCode.png，无则由 onDriverImgError 回退到 code.png */
const getDriverImg = (code?: string, teamCode?: string) => {
    if (!code) return ''
    if (teamCode) return `/docs/f1/drivers/${code}_${teamCode}.png`
    return `/docs/f1/drivers/${code}.png`
}
const onDriverImgError = (event: Event) => {
    const img = event.target as HTMLImageElement
    if (img.dataset.fallbackApplied === '1') return
    const code = img.dataset.driverCode
    if (!code) return
    img.dataset.fallbackApplied = '1'
    img.src = `/docs/f1/drivers/${code}.png`
}
const scorePopoverInnerStyle = {
    background: '#15151e',
    padding: '0',
    border: '1px solid #333',
    borderRadius: '8px',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.5)'
};
const getTeamDriverScoreTotals = (team: any) => {
    const totals = (team.drivers || []).map((d: any, i: number) => {
        const score = (team.scoreDetails || []).reduce((sum: number, row: any) => {
            return sum + (Number(row.cells?.[i]?.score) || 0);
        }, 0);
        return { code: d.code, score };
    });
    const maxScore = Math.max(0, ...totals.map((t: any) => t.score));
    return totals.map((t: any) => ({
        ...t,
        isMax: t.score > 0 && t.score === maxScore,
    }));
};

const getResult = (race: any) => {
    const res = pageInfos.result.filter((r: any) =>
        r.year === race.year
        && r.round === race.round
        && r.step === race.step)

    res.forEach((r: any) => {
        if (r.driverName) {
            let driverInfo = pageInfos.drivers.find((a: any) => (a.name == r.driverName));
            r.driverCode = driverInfo.code
            r.flagCode = driverInfo.country
        }
    })
    return res
}

// 4. 更新图表逻辑
type ChartMode = 'compact' | 'full'

const buildPointsChartOptions = (
    yearRounds: any[],
    yearResult: any[],
    drivers: any[],
    mode: ChartMode,
    opts?: { revealUpTo?: number | null },
) => {
    const sortedRounds = [...yearRounds].sort((a, b) => a.round - b.round)
    const xAxisData = sortedRounds.map(r => `R${r.round}`)
    const isFull = mode === 'full'
    const chartDrivers = isFull ? drivers : drivers.slice(0, 8)
    // null = 全部显示；数字 = 只显示前 N 个点（x 轴仍保留全部场次）
    const revealUpTo = opts?.revealUpTo ?? null
    const revealing = isFull && revealUpTo != null && revealUpTo < sortedRounds.length

    // Race 尚未结束的场次用 null 占位，不连线
    const finishedRaceRounds = new Set(
        yearResult
            .filter((r: any) => r.step === 'Race')
            .map((r: any) => Number(r.round)),
    )

    let yMax = 0
    const series = chartDrivers.map((driver, index) => {
        let cumulative = 0
        const fullData = sortedRounds.map(round => {
            const roundNo = Number(round.round)
            if (!finishedRaceRounds.has(roundNo)) return null

            const raceRes = yearResult.filter((res: any) =>
                res.round === round.round
                && res.driverName === driver.name
                && (res.step === 'Race' || res.step === 'Sprint'),
            )
            raceRes.forEach((item: any) => {
                cumulative += Number(item?.score) || 0
            })
            return cumulative
        })
        for (const value of fullData) {
            if (value != null) yMax = Math.max(yMax, value)
        }

        const data = revealUpTo == null
            ? fullData
            : fullData.map((value, i) => (i < revealUpTo ? value : null))

        const isP1 = index === 0
        const isTop3 = index < 3

        return {
            name: `${driver.code} · ${driver.name}`,
            type: 'line',
            data,
            smooth: 0.2,
            connectNulls: false,
            showSymbol: isFull,
            symbol: 'circle',
            symbolSize: isFull ? (revealing ? 7 : 5) : 4,
            lineStyle: {
                width: isP1 ? (isFull ? 4 : 3.5) : isTop3 ? 2.5 : (isFull ? 1.8 : 1.5),
                color: driver.color,
                shadowBlur: isP1 ? 12 : 0,
                shadowColor: driver.color,
                opacity: isP1 ? 1 : isTop3 ? 0.9 : (isFull ? 0.55 : 0.5),
            },
            itemStyle: { color: driver.color },
            endLabel: {
                show: true,
                formatter: () => `{name|${driver.code}}`,
                offset: [8, 0],
                rich: {
                    name: {
                        color: '#fff',
                        backgroundColor: driver.color,
                        padding: [2, 5],
                        borderRadius: 2,
                        fontSize: isFull ? 11 : 10,
                        fontWeight: 'bold',
                        fontFamily: 'Formula1, Arial, sans-serif',
                    },
                },
            },
            labelLayout: {
                moveOverlap: 'shiftY',
                dx: 8,
                hideOverlap: !isFull,
            },
            labelLine: {
                show: true,
                length2: 8,
                lineStyle: {
                    color: driver.color,
                    type: 'dashed',
                    opacity: 0.5,
                },
            },
            emphasis: {
                focus: 'series',
                lineStyle: { width: isP1 ? 5 : 3.5, opacity: 1 },
            },
            animationDuration: isFull ? 260 : 1600,
            animationDurationUpdate: isFull ? 220 : 800,
            animationEasing: 'cubicOut',
            animationEasingUpdate: 'cubicOut',
        }
    })

    return {
        title: { show: false },
        backgroundColor: 'transparent',
        animationDurationUpdate: isFull ? 220 : 800,
        animationEasingUpdate: 'cubicOut',
        color: chartDrivers.map((d: any) => d.color),
        grid: isFull
            ? { left: 16, right: 72, bottom: 28, top: 48, containLabel: true }
            : { left: 4, right: '16%', bottom: 4, top: 18, containLabel: true },
        legend: isFull
            ? {
                show: true,
                type: 'scroll',
                orient: 'horizontal',
                top: 0,
                left: 0,
                right: 0,
                textStyle: { color: '#c8c8d0', fontSize: 11 },
                pageIconColor: '#e10600',
                pageTextStyle: { color: '#949498' },
                inactiveColor: '#555',
            }
            : { show: false },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(21, 21, 30, 0.95)',
            borderColor: '#444',
            borderWidth: 1,
            textStyle: { color: '#fff', fontSize: 12 },
            axisPointer: {
                type: 'line',
                lineStyle: { color: '#e10600', width: 1.5, type: 'dashed' },
            },
            order: 'valueDesc',
            formatter: (params: any) => {
                const list = (Array.isArray(params) ? params : [params])
                    .filter((p: any) => p.value != null && p.value !== '-')
                if (!list.length) return ''
                const rows = list
                    .slice()
                    .sort((a: any, b: any) => (Number(b.value) || 0) - (Number(a.value) || 0))
                    .map((p: any) => {
                        const code = String(p.seriesName || '').split(' · ')[0]
                        return `<div style="display:flex;justify-content:space-between;gap:18px;margin:2px 0">
                            <span><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color};margin-right:6px"></span>${code}</span>
                            <b>${p.value ?? 0}</b>
                        </div>`
                    })
                    .join('')
                return `<div style="margin-bottom:6px;color:#949498;font-size:11px">${list[0].axisValueLabel || list[0].name}</div>${rows}`
            },
        },
        xAxis: {
            type: 'category',
            data: xAxisData,
            boundaryGap: false,
            axisLine: { lineStyle: { color: '#444' } },
            axisTick: { show: false },
            axisLabel: {
                show: isFull,
                color: '#949498',
                fontSize: 11,
                interval: 0,
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#2a2a33',
                    opacity: isFull ? 0.9 : 0.55,
                },
            },
        },
        yAxis: {
            type: 'value',
            name: isFull ? 'POINTS' : '',
            min: 0,
            max: isFull && yMax > 0 ? Math.ceil(yMax * 1.08) : undefined,
            nameTextStyle: { color: '#949498', fontSize: 11, padding: [0, 0, 0, 8] },
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                show: isFull,
                color: '#949498',
                fontSize: 11,
            },
            splitLine: {
                show: isFull,
                lineStyle: { color: '#2a2a33', type: 'dashed' },
            },
        },
        series,
    }
}

const updateChart = (yearRounds: any, yearResult: any) => {
    chartSource.rounds = yearRounds || []
    chartSource.result = yearResult || []
    pageInfos.options = buildPointsChartOptions(
        chartSource.rounds,
        chartSource.result,
        pageInfos.drivers,
        'compact',
    )
    pageInfos.changeMark = !pageInfos.changeMark
}

let fullChartRevealTimer: ReturnType<typeof setInterval> | null = null

const stopFullChartReveal = () => {
    if (fullChartRevealTimer != null) {
        clearInterval(fullChartRevealTimer)
        fullChartRevealTimer = null
    }
}

const renderFullChartFrame = (revealUpTo: number | null, remount = false) => {
    fullChartOptions.value = buildPointsChartOptions(
        chartSource.rounds,
        chartSource.result,
        pageInfos.drivers,
        'full',
        { revealUpTo },
    )
    if (remount) fullChartChangeMark.value = !fullChartChangeMark.value
}

const openFullChart = async () => {
    stopFullChartReveal()
    const rounds = [...chartSource.rounds].sort((a, b) => Number(a.round) - Number(b.round))
    const finishedRaceRounds = new Set(
        chartSource.result
            .filter((r: any) => r.step === 'Race')
            .map((r: any) => Number(r.round)),
    )
    // 动画只播到最后一场已完赛的 Race；未完赛场次保持 null
    let lastFinishedIndex = -1
    rounds.forEach((round, index) => {
        if (finishedRaceRounds.has(Number(round.round))) lastFinishedIndex = index
    })
    const revealTotal = lastFinishedIndex + 1

    chartModal.value = true

    if (!rounds.length || revealTotal <= 0) {
        renderFullChartFrame(null, true)
        return
    }

    // x 轴固定为全部场次；折线点从 R1 逐场出现并连线
    renderFullChartFrame(1, true)
    await nextTick()

    let visibleCount = 1
    const stepMs = Math.max(
        140,
        Math.min(320, Math.floor(4800 / Math.max(revealTotal - 1, 1))),
    )

    fullChartRevealTimer = setInterval(() => {
        visibleCount += 1
        if (visibleCount > revealTotal) {
            stopFullChartReveal()
            renderFullChartFrame(null, false)
            return
        }
        renderFullChartFrame(visibleCount, false)
    }, stepMs)
}

watch(chartModal, (open) => {
    if (!open) stopFullChartReveal()
})

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
const hasRaceTime = (time: any) => time !== null && time !== undefined && time !== ''

// 轮胎信息
const tyres = [
    { type: 'Soft', icon: 'soft.png', desc: "The softest of the three available dry compounds, the P Zero Red Soft tyres are also the mandatory Q3 compound – competitors reaching qualifying’s final shootout receive one set of this compound for use in Q3 only for their final attempts to take pole position. Whilst this will be the tyre of choice to achieve maximum out-and-out pace during a weekend, endurance is limited and timing a pit stop to change to one of the other compounds at the optimum point will be key to overall race performance." },
    { type: 'Medium', icon: 'medium.png', desc: 'Each weekend, the P Zero Yellow Medium tyres will aim to strike the balance between performance and durability. Competitors who can make this tyre work well could end up with an advantage over their rivals by giving themselves greater strategic options through qualifying and the race.' },
    { type: 'Hard', icon: 'hard.png', desc: 'The P Zero White Hard tyres are the hardest of the available compounds, and are therefore likely to be the slowest for outright single-lap pace, but the most durable for long runs.' },
    { type: 'Intermediate', icon: 'intermediate.png', desc: 'The Cinturato Green Intermediate tyres are the most versatile of the rain tyres, dispersing approximately 30 litres of water per second per tyre at 300 kph. They can be used on a wet as well as a drying track.' },
    { type: 'Wet', icon: 'wet.png', desc: 'The Cinturato Blue Wet tyres can disperse up to 85 litres of water per second per tyre at 300 kph, making them the most effective solution for heavy rain.' },
];
</script>

<template>
    <div class="f1-dashboard">
        <!-- 顶部控制栏 -->
        <header class="f1-header">
            <div class="header-left">
                <div class="f1-logo">
                    <img class="logo" src="/docs/f1/comps/logo.svg" srcset="">
                    <span>{{ pageInfos.year }}</span>
                </div>
                <div class="list-tyres">
                    <div class="tyres-item" v-for="tyre in tyres" :key="tyre.type">
                        <img :src="`/docs/f1/tyres/${tyre.icon}`" :alt="tyre.type" srcset="">
                    </div>
                </div>
            </div>
            <div class="header-right">
                <button class="capture-btn" title="历年世界冠军" @click="historyModal = true">
                    <TrophyOutlined />
                </button>
                <button class="capture-btn" :disabled="capturing" title="截取赛程" @click="captureSchedule">
                    <CameraOutlined />
                </button>
                <div class="year-selector">
                    <button v-for="y in pageInfos.availableYears" :key="y" :class="{ active: pageInfos.year === y }"
                        @click="pageInfos.year = y">
                        {{ y }}
                    </button>
                </div>
            </div>
        </header>

        <main class="main-content">
            <!-- 左侧：赛程列表 (滚动区) -->
            <section class="schedule-section">
                <div ref="listF1Ref" class="list-f1" :class="{ 'is-capturing': capturing }">
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

                            <div class="circuit-moments">
                                <a-carousel autoplay>
                                    <div v-for="moment in round.moments">
                                        <img class="img-moment"
                                            :src="`/docs/f1/moments/${moment.year}/${moment.round}/${moment.moment}`" />
                                    </div>
                                </a-carousel>
                            </div>

                            <div class="track-thumb">
                                <a-popover
                                    :title="false"
                                    trigger="hover"
                                    overlay-class-name="circuit-map-popover"
                                >
                                    <template #content>
                                        <div class="circuit-map-panel">
                                            <div class="map-mode-switch">
                                                <button
                                                    type="button"
                                                    :class="{ active: circuitMapMode === 'full' }"
                                                    @click.stop="circuitMapMode = 'full'"
                                                >FULL</button>
                                                <button
                                                    type="button"
                                                    :class="{ active: circuitMapMode === 'drs' }"
                                                    @click.stop="circuitMapMode = 'drs'"
                                                >DRS</button>
                                            </div>
                                            <img
                                                :key="`${round.img}-${circuitMapMode}`"
                                                :src="getCircuitMapSrc(round.img)"
                                                alt="circuit map"
                                                @error="onCircuitMapError"
                                            />
                                        </div>
                                    </template>
                                    <img :src="`/docs/f1/carbons/${round.img}.png`" />
                                </a-popover>
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
                                            <span class="session-time" v-if="race.hasStartTime">{{ race.startTime }}<template
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

                                        <template v-if="race.isFinished">
                                            <a-popover class="winner-view" :title="false" placement="rightTop"
                                                trigger="hover">
                                                <template #content>
                                                    <table class="table-result">
                                                        <tbody>
                                                            <tr>
                                                                <th>Position</th>
                                                                <th>Driver</th>
                                                                <th>Team</th>
                                                                <th>Score</th>
                                                            </tr>
                                                            <tr v-for="res in getResult(race)" :key="res.position">
                                                                <td class="f1-position-cell">
                                                                    <!-- 如果是数字，显示排名样式 -->
                                                                    <span
                                                                        v-if="!isNaN(res.position) && res.position !== ''"
                                                                        class="pos-number">
                                                                        {{ res.position }}
                                                                    </span>

                                                                    <!-- 如果不是数字（DNF, DNS, DSQ 等），显示标签样式 -->
                                                                    <span v-else class="pos-label"
                                                                        :class="res.position.toLowerCase()">
                                                                        {{ res.position }}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div class="item-driver">
                                                                        <img class="icon-driver"
                                                                            :src="getDriverImg(res.driverCode, res.teamCode)"
                                                                            :data-driver-code="res.driverCode"
                                                                            alt=""
                                                                            @error="onDriverImgError">
                                                                        <img class="icon-flag"
                                                                            :src="`/docs/flags/${res.flagCode}.png`"
                                                                            alt="" srcset="">
                                                                        <span>{{ res.driverName }}</span>
                                                                        <img class="icon-fastest"
                                                                            v-if="res.fastest_lap == 1"
                                                                            src="/docs/f1/comps/fastest_lap.png" alt=""
                                                                            srcset="">
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="item-team">
                                                                        <img class="icon-team"
                                                                            :src="`/docs/f1/teams/${res.teamCode}.png`"
                                                                            alt="" srcset="">
                                                                        <span>{{ res.teamName }}</span>
                                                                    </div>
                                                                </td>
                                                                <td>{{ res.score }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </template>
                                                <!-- 车号展示 -->
                                                <div class="driver-no-overlay">
                                                    {{ race.no }}
                                                </div>

                                                <!-- 赛车图片：带动画 -->
                                                <div class="car-anim-container">
                                                    <img :src="`/docs/f1/cars/${race.team}.png`" class="car-img"
                                                        :class="{ 'is-placeholder': !race.isFinished }" />
                                                    <!-- 尾迹云动画 -->
                                                    <div class="speed-lines" v-if="race.isFinished"></div>
                                                </div>
                                            </a-popover>
                                        </template>
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
                            <div
                                v-for="(driver, index) in pageInfos.drivers"
                                :key="driver.code"
                                class="driver-f1-card"
                                :class="{ 'is-radio-active': radioState.activeDriverCode === driver.code }"
                            >
                                <radioView
                                    v-if="radioState.activeDriverCode === driver.code && radioState.data"
                                    :data="radioState.data"
                                    :playing="radioState.playing"
                                    embedded
                                    @finished="onRadioFinished"
                                />

                                <template v-else>
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
                                            <a-popover
                                                v-if="driver.scoreDetails?.length"
                                                placement="bottomLeft"
                                                trigger="hover"
                                                :title="false"
                                                overlay-class-name="driver-score-popover"
                                                :overlay-inner-style="scorePopoverInnerStyle"
                                                :get-popup-container="getScorePopupContainer"
                                            >
                                                <template #content>
                                                    <table class="table-score-detail">
                                                        <thead>
                                                            <tr>
                                                                <th>Round</th>
                                                                <th>Country-City</th>
                                                                <th>Pos</th>
                                                                <th>Pts</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="item in driver.scoreDetails" :key="item.round">
                                                                <td class="col-round">R{{ item.round }}</td>
                                                                <td class="col-location">{{ item.location }}</td>
                                                                <td class="col-pos">
                                                                    <span v-if="isNumericPosition(item.position)" class="pos-number">{{ item.position }}</span>
                                                                    <span v-else class="pos-label" :class="String(item.position).toLowerCase()">{{ item.position }}</span>
                                                                </td>
                                                                <td class="col-score">{{ item.score }}</td>
                                                            </tr>
                                                            <tr class="total-row">
                                                                <td class="col-round">Total</td>
                                                                <td class="col-location"></td>
                                                                <td class="col-pos"></td>
                                                                <td class="col-score">{{ driver.score }}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </template>
                                                <span class="value is-hoverable">{{ driver.score }}</span>
                                            </a-popover>
                                            <span v-else class="value">{{ driver.score }}</span>
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
                                <div
                                    class="info-side is-clickable"
                                    :class="{ 'has-radio': hasRadioData(driver.code) }"
                                    @click="onDriverInfoClick(driver)"
                                >
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
                                        <img
                                            :src="getDriverImg(driver.code, driver.teamCode)"
                                            :data-driver-code="driver.code"
                                            class="driver-img"
                                            @error="onDriverImgError"
                                        />
                                    </div>
                                </div>
                                </template>
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
                                        <a-popover
                                            v-if="team.scoreDetails?.length"
                                            placement="bottomLeft"
                                            trigger="hover"
                                            :title="false"
                                            overlay-class-name="driver-score-popover"
                                            :overlay-inner-style="scorePopoverInnerStyle"
                                            :get-popup-container="getScorePopupContainer"
                                        >
                                            <template #content>
                                                <table class="table-score-detail table-team-score">
                                                    <thead>
                                                        <tr>
                                                            <th rowspan="2" class="col-round">Round</th>
                                                            <th rowspan="2" class="col-location">Country-City</th>
                                                            <th v-for="d in team.drivers" :key="d.code" colspan="3" class="col-driver">{{ d.code }}</th>
                                                        </tr>
                                                        <tr>
                                                            <template v-for="d in team.drivers" :key="`${d.code}-sub`">
                                                                <th class="col-quali">Qual</th>
                                                                <th class="col-pos">Pos</th>
                                                                <th class="col-score">Pts</th>
                                                            </template>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="item in team.scoreDetails" :key="item.round">
                                                            <td class="col-round">R{{ item.round }}</td>
                                                            <td class="col-location">{{ item.location }}</td>
                                                            <template v-for="cell in item.cells" :key="cell.code">
                                                                <td class="col-quali" :class="{ 'is-best': cell.isBestQuali }">
                                                                    <template v-if="cell.qualiPosition !== '' && cell.qualiPosition != null">
                                                                        <span v-if="isNumericPosition(cell.qualiPosition)" class="pos-number">{{ cell.qualiPosition }}</span>
                                                                        <span v-else class="pos-label" :class="String(cell.qualiPosition).toLowerCase()">{{ cell.qualiPosition }}</span>
                                                                    </template>
                                                                    <span v-else class="empty-cell">-</span>
                                                                </td>
                                                                <td class="col-pos">
                                                                    <template v-if="cell.score != null">
                                                                        <span v-if="isNumericPosition(cell.position)" class="pos-number">{{ cell.position }}</span>
                                                                        <span v-else-if="cell.position !== ''" class="pos-label" :class="String(cell.position).toLowerCase()">{{ cell.position }}</span>
                                                                        <span v-else>-</span>
                                                                    </template>
                                                                    <span v-else class="empty-cell">-</span>
                                                                </td>
                                                                <td class="col-score" :class="{ 'is-max': cell.isMax }">
                                                                    {{ cell.score != null ? cell.score : '-' }}
                                                                </td>
                                                            </template>
                                                        </tr>
                                                        <tr class="total-row">
                                                            <td class="col-round">Total</td>
                                                            <td class="col-location"></td>
                                                            <template v-for="cell in getTeamDriverScoreTotals(team)" :key="cell.code">
                                                                <td class="col-quali"></td>
                                                                <td class="col-pos"></td>
                                                                <td class="col-score" :class="{ 'is-max': cell.isMax }">{{ cell.score }}</td>
                                                            </template>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </template>
                                            <span class="num is-hoverable">{{ team.score }}</span>
                                        </a-popover>
                                        <span v-else class="num">{{ team.score }}</span>
                                        <span class="unit">PTS</span>
                                    </div>
                                </div>

                                <!-- 2. 右上：车队图标与名称 -->
                                <div class="top-right-drivers">
                                    <div class="list-drivers">
                                        <div v-for="d in team.drivers" :key="d.code" class="mini-driver-card">
                                            <div class="driver-img-box">
                                                <img
                                                    :src="getDriverImg(d.code, team.code)"
                                                    :data-driver-code="d.code"
                                                    @error="onDriverImgError"
                                                />
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
                    <div class="chart-header">
                        <div class="chart-title-group">
                            <span class="chart-badge">TRACKER</span>
                            <h3 class="chart-title">POINTS PROGRESSION</h3>
                        </div>
                        <button
                            type="button"
                            class="chart-fullscreen-btn"
                            title="查看全部车手积分走势"
                            @click="openFullChart"
                        >
                            <ExpandOutlined />
                        </button>
                    </div>
                    <div class="chart-inner">
                        <chartView :options="pageInfos.options" :change-mark="pageInfos.changeMark" />
                    </div>
                </div>
            </aside>
        </main>
    </div>

    <a-modal
        v-model:open="chartModal"
        width="92vw"
        centered
        :title="null"
        :footer="null"
        :closable="true"
        destroy-on-close
        wrap-class-name="f1-chart-modal"
    >
        <div class="full-chart-panel">
            <div class="full-chart-header">
                <div>
                    <div class="full-chart-eyebrow">{{ pageInfos.year }} CHAMPIONSHIP</div>
                    <h3 class="full-chart-title">ALL DRIVERS · POINTS PROGRESSION</h3>
                </div>
                <span class="full-chart-hint">Hover a round · click legend to toggle</span>
            </div>
            <div class="full-chart-body">
                <chartView :options="fullChartOptions" :change-mark="fullChartChangeMark" />
            </div>
        </div>
    </a-modal>

    <a-modal
        v-model:open="historyModal"
        width="520px"
        centered
        :title="null"
        :footer="null"
        :closable="false"
        destroy-on-close
        wrap-class-name="f1-history-modal"
    >
        <div class="history-timeline">
            <div class="history-title">WORLD CHAMPIONS</div>
            <div class="history-list">
                <div v-for="item in pageInfos.history" :key="item.year" class="history-item">
                    <div class="history-year">{{ item.year }}</div>
                    <div class="history-rail">
                        <span class="history-dot"></span>
                    </div>
                    <div class="history-card">
                        <div class="history-driver">
                            <img :src="`/docs/flags/${item.country}.png`" class="history-flag" :alt="item.country" />
                            <span class="history-name">{{ item.name }}</span>
                        </div>
                        <div class="history-team">
                            <img
                                :src="getHistoryTeamLogo(item.team)"
                                class="history-logo"
                                :alt="item.team"
                                @error="onHistoryLogoError"
                            />
                            <span>{{ item.team }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a-modal>
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

        .header-left {
            display: flex;
            align-items: center;
            gap: 30px;

            .list-tyres {
                display: flex;
                gap: 10px;

                .tyres-item {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 1px solid #333;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }

        .f1-logo {
            display: flex;
            align-items: center;
            gap: 5px;

            .logo {
                width: 70px;
            }

            span {
                font-size: 24px;
                font-weight: 900;
                color: $f1-red;
            }
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .capture-btn {
            background: none;
            border: none;
            color: #fff;
            padding: 0;
            cursor: pointer;
            font-size: 16px;
            line-height: 1;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover:not(:disabled) {
                color: $f1-red;
            }

            &:disabled {
                opacity: 0.45;
                cursor: wait;
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
    height: calc(100vh - 185px);
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

        &.is-capturing {
            .car-img {
                animation: none !important;
                transform: none !important;
                opacity: 1 !important;
            }

            .speed-lines {
                animation: none !important;
                opacity: 0.7;
                width: 60px;
            }
        }
    }
}

.f1-card {
    background: $f1-dark-grey;
    border-radius: 0 15px 15px 0;
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

    .circuit-moments {
        width: 260px;

        .img-moment {
            width: 100%;
            height: 90px;
            object-fit: cover;
            border-radius: 4px;
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

            :deep(.winner-view) {
                width: 100%;
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
                width: unset;
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

.table-result {
    color: #fff;
    background: #1f1f27;

    th,
    td {
        padding: 5px 10px;
    }

    .item-driver,
    .item-team {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .icon-flag {
        margin-right: 5px;
        width: 20px;
        border-radius: 3px;
    }

    .icon-fastest {
        width: 20px;
    }

    .icon-driver {
        margin-right: 5px;
        width: 30px;
        border-radius: 50%;
    }

    .icon-team {
        margin-right: 5px;
        width: 20px;
        vertical-align: middle;
    }

    .f1-position-cell {

        /* 数字样式的设计 */
        .pos-number {
            font-weight: 800;
            font-style: italic;
        }

        /* 标签样式的设计 (DNF, DNS, DSQ) */
        .pos-label {
            display: inline-block;
            background-color: #38383f;
            /* 深灰色背景 */
            color: #ffffff;
            font-size: 0.75rem;
            font-weight: bold;
            padding: 2px 6px;
            border-radius: 4px;
            text-transform: uppercase;
            min-width: 35px;
            text-align: center;
        }

        /* 针对特定状态可以给不同颜色（可选） */
        .pos-label.dsq {
            background-color: #e10600;
        }

        .pos-label.dns {
            background-color: #fcaf17;
        }

        .pos-label.dnf {
            background-color: #71767c;
        }

        .pos-label.nc {
            background-color: #8a5aab;
        }
    }
}

.table-score-detail {
    min-width: 280px;
    width: 100%;
    color: #fff;
    border-collapse: collapse;
    font-size: 11px;

    thead th {
        background: #101015;
        color: $f1-silver;
        font-size: 9px;
        font-weight: 900;
        letter-spacing: 1px;
        text-transform: uppercase;
        text-align: left;
        padding: 8px 10px;
        border-bottom: 1px solid #333;
        white-space: nowrap;
    }

    td {
        padding: 6px 10px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        vertical-align: middle;
    }

    tbody tr:hover {
        background: rgba(225, 6, 0, 0.08);
    }

    .col-round {
        width: 48px;
        font-weight: 700;
        white-space: nowrap;
    }

    .col-location {
        color: #d0d0d4;
    }

    .col-pos {
        width: 48px;
        text-align: center;

        .pos-number {
            font-weight: 400;
            font-style: italic;
        }

        .pos-label {
            display: inline-block;
            background-color: #38383f;
            color: #ffffff;
            font-size: 0.7rem;
            font-weight: 400;
            padding: 1px 5px;
            border-radius: 4px;
            text-transform: uppercase;
            min-width: 32px;
            text-align: center;
        }

        .pos-label.dsq {
            background-color: #e10600;
        }

        .pos-label.dns {
            background-color: #fcaf17;
        }

        .pos-label.dnf {
            background-color: #71767c;
        }

        .pos-label.nc {
            background-color: #8a5aab;
        }
    }

    .col-score {
        width: 42px;
        text-align: right;
        font-weight: 400;
        color: $f1-red;
    }

    .empty-cell {
        color: #666;
    }

    .total-row {
        td {
            border-top: 1px solid #444;
            background: #101015;
        }

        .col-round {
            text-transform: uppercase;
            color: #fff;
        }
    }

    &.table-team-score {
        thead th {
            text-align: center;
            vertical-align: middle;

            &.col-round,
            &.col-location {
                text-align: left;
            }

            &.col-driver {
                color: #fff;
                font-size: 11px;
                border-left: 1px solid #333;
            }

            &.col-pos,
            &.col-score,
            &.col-quali {
                font-size: 8px;
                border-left: 1px solid #2a2a32;
            }
        }

        td.col-pos,
        td.col-score,
        td.col-quali {
            border-left: 1px solid rgba(255, 255, 255, 0.06);
        }

        .col-quali {
            width: 48px;
            text-align: center;

            .pos-number {
                font-weight: 400;
                font-style: italic;
            }

            .pos-label {
                display: inline-block;
                background-color: #38383f;
                color: #ffffff;
                font-size: 0.7rem;
                font-weight: 400;
                padding: 1px 5px;
                border-radius: 4px;
                text-transform: uppercase;
                min-width: 32px;
                text-align: center;
            }

            .pos-label.dsq {
                background-color: #e10600;
            }

            .pos-label.dns {
                background-color: #fcaf17;
            }

            .pos-label.dnf {
                background-color: #71767c;
            }

            .pos-label.nc {
                background-color: #8a5aab;
            }
        }

        .col-score.is-max {
            background: #1faa4a;
            color: #fff;
        }

        .col-quali.is-best {
            background: #00bfa5;
            color: #fff;
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
        height: calc(100vh - 565px);
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
    transition: height 0.25s ease;

    &.is-radio-active {
        height: auto;
        overflow: visible;
        display: block;
    }

    &:hover:not(.is-radio-active) {
        .photo-wrapper .driver-img {
            transform: scale(1.2);
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

                    &.is-hoverable {
                        cursor: pointer;
                        border-bottom: 1px dashed rgba(225, 6, 0, 0.45);
                    }
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

        &.is-clickable.has-radio {
            cursor: pointer;

            &:hover .photo-wrapper .driver-img {
                transform: scale(1.08);
            }
        }

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
                font-family: "Northwell Clean Alt";
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
                transition: all 0.3s ease-out;

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

                &.is-hoverable {
                    cursor: pointer;
                    border-bottom: 1px dashed rgba(225, 6, 0, 0.45);
                }
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
            gap: 5px;

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
        bottom: 0;
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
    display: flex;
    flex-direction: column;
    padding: 12px 12px 8px;
    height: 300px;
    border: 1px solid #333;
    border-radius: 12px;
    background: linear-gradient(160deg, #15151e 0%, #1a1a24 55%, #121218 100%);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);

    .chart-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        margin-bottom: 6px;
        flex-shrink: 0;
    }

    .chart-title-group {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
    }

    .chart-badge {
        flex-shrink: 0;
        background: #e10600;
        color: #fff;
        padding: 2px 8px;
        font-size: 9px;
        font-weight: 900;
        font-style: italic;
        letter-spacing: 1px;
        border-radius: 2px;
    }

    .chart-title {
        margin: 0;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 1px;
        color: #f0f0f5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .chart-fullscreen-btn {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #444;
        border-radius: 6px;
        background: #0b0b0e;
        color: #c8c8d0;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            border-color: #e10600;
            color: #fff;
            background: rgba(225, 6, 0, 0.15);
        }
    }

    .chart-inner {
        flex: 1;
        min-height: 0;
    }
}

.history-timeline {
    color: #fff;

    .history-title {
        margin-bottom: 16px;
        padding-left: 8px;
        border-left: 4px solid $f1-red;
        font-size: 16px;
        font-weight: 900;
        letter-spacing: 2px;
    }

    .history-list {
        max-height: 70vh;
        overflow-y: auto;
        padding-right: 8px;

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background: $f1-red;
        }
    }

    .history-item {
        display: grid;
        grid-template-columns: 58px 16px 1fr;
        gap: 10px;
        align-items: stretch;
        min-height: 56px;
    }

    .history-year {
        padding-top: 2px;
        text-align: right;
        font-size: 14px;
        font-weight: 900;
        font-style: italic;
        color: $f1-red;
    }

    .history-rail {
        position: relative;
        display: flex;
        justify-content: center;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #333;
        }
    }

    .history-dot {
        position: relative;
        z-index: 1;
        margin-top: 8px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: $f1-red;
        box-shadow: 0 0 8px rgba(225, 6, 0, 0.6);
        flex-shrink: 0;
    }

    .history-card {
        margin-bottom: 12px;
        padding: 8px 12px;
        background: #1f1f27;
        border: 1px solid #333;
        border-radius: 8px;
    }

    .history-driver {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .history-flag {
        width: 22px;
        height: 15px;
        object-fit: cover;
        border-radius: 2px;
    }

    .history-name {
        font-size: 14px;
        font-weight: 700;
    }

    .history-team {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
        font-size: 11px;
        color: $f1-silver;
        letter-spacing: 1px;
    }

    .history-logo {
        height: 16px;
        width: auto;
        max-width: 48px;
        object-fit: contain;
        flex-shrink: 0;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45));
    }
}
</style>

<style lang="scss">
.driver-score-popover {
    z-index: 1200;
    font-family: 'Formula1', sans-serif;
    letter-spacing: 1px;

    .ant-popover-inner,
    .ant-popover-inner-content {
        background: #15151e;
        padding: 0;
        color: #fff;
    }

    .ant-popover-arrow::before,
    .ant-popover-arrow::after {
        background: #15151e;
    }
}

.circuit-map-popover {
    z-index: 1200;
    max-width: none !important;
    font-family: 'Formula1', sans-serif;
    letter-spacing: 1px;

    .ant-popover-inner,
    .ant-popover-inner-content {
        background: #15151e;
        color: #fff;
        max-width: none;
        padding: 12px;
    }

    .ant-popover-arrow::before,
    .ant-popover-arrow::after {
        background: #15151e;
    }

    .circuit-map-panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 50vw;

        .map-mode-switch {
            display: flex;
            align-self: flex-end;
            background: #000;
            padding: 2px;
            border-radius: 4px;

            button {
                background: transparent;
                border: none;
                color: #949498;
                font-size: 11px;
                font-family: inherit;
                letter-spacing: 1px;
                padding: 4px 10px;
                border-radius: 3px;
                cursor: pointer;
                transition: all 0.2s;

                &.active {
                    background: #e10600;
                    color: #fff;
                }

                &:hover:not(.active) {
                    color: #fff;
                }
            }
        }

        img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 4px;
        }
    }
}

.f1-history-modal {
    .ant-modal-content {
        background: #15151e;
        border: 1px solid #333;
        border-radius: 12px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.55);
    }

    .ant-modal-body {
        padding: 20px;
    }
}

.f1-chart-modal {
    .ant-modal-content {
        background: #101018;
        border: 1px solid #333;
        border-radius: 14px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.65);
        overflow: hidden;
    }

    .ant-modal-close {
        color: #c8c8d0;
        top: 14px;
        inset-inline-end: 14px;

        &:hover {
            color: #fff;
        }
    }

    .ant-modal-body {
        padding: 18px 20px 16px;
    }

    .full-chart-panel {
        color: #fff;
        font-family: 'Formula1', sans-serif;
    }

    .full-chart-header {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 12px;
        padding-right: 36px;
    }

    .full-chart-eyebrow {
        color: #e10600;
        font-size: 11px;
        font-weight: 900;
        letter-spacing: 2px;
        margin-bottom: 4px;
    }

    .full-chart-title {
        margin: 0;
        font-size: 18px;
        font-weight: 900;
        letter-spacing: 1px;
    }

    .full-chart-hint {
        color: #6f6f7a;
        font-size: 11px;
        letter-spacing: 0.5px;
        white-space: nowrap;
    }

    .full-chart-body {
        height: min(72vh, 760px);
        border: 1px solid #2a2a33;
        border-radius: 10px;
        background: linear-gradient(180deg, #15151e 0%, #0d0d14 100%);
        padding: 8px 4px 4px;
    }
}
</style>