export const games = [
    {
        name: 'TI15',
        full: '2026 DOTA2 国际邀请赛',
        logo: 'Dota.png',
        location: '中国 上海',
        date: '2026.08',
        status: 'upcoming',
        winner: {
            team: "",
            icon: "",
        },
        stages: []
    },
    {
        name: 'Cologne Major',
        full: 'IEM Cologne Major 2026',
        logo: 'CS.png',
        location: '德国 科隆',
        date: '2026.06.02 - 06.21',
        status: 'upcoming',
        winner: {
            team: "",
            icon: "",
        },
        stages: []
    },
    {
        name: 'Budapest Major',
        full: 'StarLadder Budapest Major 2025',
        logo: 'CS.png',
        location: '匈牙利 布达佩斯',
        date: '2025.11.24 - 12.14',
        status: 'completed',
        winner: {
            team: "Vitality",
            icon: "Vitality.png",
        },
        stages: [
            {
                stage: '淘汰赛',
                type: 'tournament',
                rounds: [
                    [
                        {
                            name: "GAME1",
                            round: "八强战",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "Spirit",
                                icon: "Team Spirit.png",
                                score: 2
                            },
                            bottom: {
                                team: "Falcons",
                                icon: "Falcons.png",
                                score: 0
                            },
                        },
                        {
                            name: "GAME2",
                            round: "八强战",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "Vitality",
                                icon: "Vitality.png",
                                score: 2
                            },
                            bottom: {
                                team: "MongolZ",
                                icon: "The Mongolz.png",
                                score: 0
                            },
                        },
                        {
                            name: "GAME3",
                            round: "八强战",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "FURIA",
                                icon: "FURIA.png",
                                score: 1
                            },
                            bottom: {
                                team: "NAVI",
                                icon: "NAVI.png",
                                score: 2
                            },
                        },
                        {
                            name: "GAME4",
                            round: "八强战",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "MOUZ",
                                icon: "MOUZ.png",
                                score: 0
                            },
                            bottom: {
                                team: "Faze",
                                icon: "FAZE.png",
                                score: 2
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME5",
                            round: "四强战",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "Spirit",
                                icon: "Team Spirit.png",
                                score: 0
                            },
                            bottom: {
                                team: "Vitality",
                                icon: "Vitality.png",
                                score: 2
                            },
                        },
                        {
                            name: "GAME6",
                            round: "四强战",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "NAVI",
                                icon: "NAVI.png",
                                score: 1
                            },
                            bottom: {
                                team: "Faze",
                                icon: "FAZE.png",
                                score: 2
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME7",
                            round: "决赛",
                            time: "-/-",
                            bo: 5,
                            top: {
                                team: "Vitality",
                                icon: "Vitality.png",
                                score: 3
                            },
                            bottom: {
                                team: "Faze",
                                icon: "FAZE.png",
                                score: 1
                            },
                        }
                    ],
                ],
                winners: [],
                losers: [],
            },
            {
                stage: 'Stage3',
                type: 'swiss',
                limit: 3,
                rounds: [
                    [
                        {
                            name: 'ROUND1',
                            round: '0-0',
                            bo: 1,
                            time: '09/04',
                            matchs: [
                                {
                                    top: {
                                        team: 'Mouz',
                                        icon: 'MOUZ.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'MongolZ',
                                        icon: 'The Mongolz.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Passion UA',
                                        icon: 'PassionUA.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'G2',
                                        icon: 'G2.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Spirit',
                                        icon: 'Team Spirit.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Pain',
                                        icon: 'PNG.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: '3DMAX',
                                        icon: '3DMAX.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Vitality',
                                        icon: 'Vitality.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Falcons',
                                        icon: 'Falcons.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Furia',
                                        icon: 'FURIA.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 0,
                                    },
                                },
                            ],
                        }
                    ],
                    [
                        {
                            name: 'ROUND2',
                            round: '1-0',
                            bo: 1,
                            time: '09/04',
                            matchs: [
                                {
                                    top: {
                                        team: 'Pain',
                                        icon: 'PNG.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'G2',
                                        icon: 'G2.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Spirit',
                                        icon: 'Team Spirit.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Mouz',
                                        icon: 'MOUZ.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 0,
                                    },

                                },
                                {
                                    top: {
                                        team: 'Furia',
                                        icon: 'FURIA.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND2',
                            round: '0-1',
                            bo: 1,
                            time: '10/16',
                            matchs: [
                                {
                                    top: {
                                        team: '3DMAX',
                                        icon: '3DMAX.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Vitality',
                                        icon: 'Vitality.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Passion UA',
                                        icon: 'PassionUA.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Falcons',
                                        icon: 'Falcons.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'MongolZ',
                                        icon: 'The Mongolz.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 1,
                                    },
                                },
                            ],
                        }
                    ],
                    [
                        {
                            name: 'ROUND3',
                            round: '2-0',
                            bo: 3,
                            time: '09/05',
                            matchs: [
                                {
                                    top: {
                                        team: 'Mouz',
                                        icon: 'MOUZ.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Spirit',
                                        icon: 'Team Spirit.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Furia',
                                        icon: 'FURIA.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'G2',
                                        icon: 'G2.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND3',
                            round: '1-1',
                            bo: 1,
                            time: '10/18',
                            matchs: [
                                {
                                    top: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'MongolZ',
                                        icon: 'The Mongolz.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Vitality',
                                        icon: 'Vitality.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Falcons',
                                        icon: 'Falcons.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Pain',
                                        icon: 'PNG.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 1,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND3',
                            round: '0-2',
                            bo: 3,
                            time: '10/19',
                            matchs: [
                                {
                                    top: {
                                        team: 'Passion UA',
                                        icon: 'PassionUA.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: '3DMAX',
                                        icon: '3DMAX.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                    ],
                    [
                        {
                            name: 'ROUND4',
                            round: '2-1',
                            bo: 3,
                            time: '10/22-10/23',
                            matchs: [
                                {
                                    top: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Vitality',
                                        icon: 'Vitality.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Mouz',
                                        icon: 'MOUZ.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Falcons',
                                        icon: 'Falcons.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'G2',
                                        icon: 'G2.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'MongolZ',
                                        icon: 'The Mongolz.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND4',
                            round: '1-2',
                            bo: 3,
                            time: '10/23-10/24',
                            matchs: [
                                {
                                    top: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Pain',
                                        icon: 'PNG.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Passion UA',
                                        icon: 'PassionUA.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: '3DMAX',
                                        icon: '3DMAX.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                    ],
                    [
                        {
                            name: 'ROUND5',
                            round: '2-2',
                            bo: 3,
                            time: '10/25',
                            matchs: [
                                {
                                    top: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Passion UA',
                                        icon: 'PassionUA.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'G2',
                                        icon: 'G2.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Falcons',
                                        icon: 'Falcons.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                    ]
                ],
                winners: [],
                losers: [],
            },
            {
                stage: 'Stage2',
                type: 'swiss',
                limit: 3,
                rounds: [
                    [
                        {
                            name: 'ROUND1',
                            round: '0-0',
                            bo: 1,
                            time: '09/04',
                            matchs: [
                                {
                                    top: {
                                        team: 'Astralis',
                                        icon: 'Astralis.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'NIP',
                                        icon: 'NIP.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: '3DMAX',
                                        icon: '3DMAX.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Fnatic',
                                        icon: 'Fnatic.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Passion UA',
                                        icon: 'PassionUA.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Tyloo',
                                        icon: 'Tyloo.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Aurora',
                                        icon: 'Aurora.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'M80',
                                        icon: 'M80-01.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'FLY',
                                        icon: 'FLY.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Mibr',
                                        icon: 'Mibr.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 1,
                                    },
                                },
                            ],
                        }
                    ],
                    [
                        {
                            name: 'ROUND2',
                            round: '1-0',
                            bo: 1,
                            time: '09/04',
                            matchs: [
                                {
                                    top: {
                                        team: 'NIP',
                                        icon: 'NIP.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Tyloo',
                                        icon: 'Tyloo.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Aurora',
                                        icon: 'Aurora.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 1,
                                    },

                                },
                                {
                                    top: {
                                        team: 'Fnatic',
                                        icon: 'Fnatic.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 1,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND2',
                            round: '0-1',
                            bo: 1,
                            time: '10/16',
                            matchs: [
                                {
                                    top: {
                                        team: 'FLY',
                                        icon: 'FLY.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: '3DMAX',
                                        icon: '3DMAX.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'M80',
                                        icon: 'M80-01.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Astralis',
                                        icon: 'Astralis.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Passion UA',
                                        icon: 'PassionUA.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Mibr',
                                        icon: 'Mibr.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 0,
                                    },
                                },
                            ],
                        }
                    ],
                    [
                        {
                            name: 'ROUND3',
                            round: '2-0',
                            bo: 3,
                            time: '09/05',
                            matchs: [
                                {
                                    top: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'NIP',
                                        icon: 'NIP.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND3',
                            round: '1-1',
                            bo: 1,
                            time: '10/18',
                            matchs: [
                                {
                                    top: {
                                        team: 'Passion UA',
                                        icon: 'PassionUA.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: '3DMAX',
                                        icon: '3DMAX.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'M80',
                                        icon: 'M80-01.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Tyloo',
                                        icon: 'Tyloo.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Fnatic',
                                        icon: 'Fnatic.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Aurora',
                                        icon: 'Aurora.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND3',
                            round: '0-2',
                            bo: 3,
                            time: '10/19',
                            matchs: [
                                {
                                    top: {
                                        team: 'FLY',
                                        icon: 'FLY.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Astralis',
                                        icon: 'Astralis.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Mibr',
                                        icon: 'Mibr.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                    ],
                    [
                        {
                            name: 'ROUND4',
                            round: '2-1',
                            bo: 3,
                            time: '10/22-10/23',
                            matchs: [
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'NIP',
                                        icon: 'NIP.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'M80',
                                        icon: 'M80-01.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: '3DMAX',
                                        icon: '3DMAX.png',
                                        score: 1,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND4',
                            round: '1-2',
                            bo: 3,
                            time: '10/23-10/24',
                            matchs: [
                                {
                                    top: {
                                        team: 'Fnatic',
                                        icon: 'Fnatic.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Passion UA',
                                        icon: 'PassionUA.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Aurora',
                                        icon: 'Aurora.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Astralis',
                                        icon: 'Astralis.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Tyloo',
                                        icon: 'Tyloo.png',
                                        score: 1,
                                    },
                                },
                            ],
                        },
                    ],
                    [
                        {
                            name: 'ROUND5',
                            round: '2-2',
                            bo: 3,
                            time: '10/25',
                            matchs: [
                                {
                                    top: {
                                        team: 'Passion UA',
                                        icon: 'PassionUA.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'M80',
                                        icon: 'M80-01.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Astralis',
                                        icon: 'Astralis.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'NIP',
                                        icon: 'NIP.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: '3DMAX',
                                        icon: '3DMAX.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                    ]
                ],
                winners: [],
                losers: [],
            },
            {
                stage: 'Stage1',
                type: 'swiss',
                limit: 3,
                rounds: [
                    [
                        {
                            name: 'ROUND1',
                            round: '0-0',
                            bo: 1,
                            time: '09/04',
                            matchs: [
                                {
                                    top: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'M80',
                                        icon: 'M80-01.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'RA',
                                        icon: 'RA.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Legacy',
                                        icon: 'Legacy.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'FLY',
                                        icon: 'FLY.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'The Huns',
                                        icon: 'TheHuns.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'NIP',
                                        icon: 'NIP.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'NRG',
                                        icon: 'NRG.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'GL',
                                        icon: 'GamerLegion-01.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Fluxo',
                                        icon: 'Fluxo.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'LVG',
                                        icon: 'LVG.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Fnatic',
                                        icon: 'Fnatic.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Red Canids',
                                        icon: 'RED Canids.png',
                                        score: 0,
                                    },
                                },
                            ],
                        }
                    ],
                    [
                        {
                            name: 'ROUND2',
                            round: '1-0',
                            bo: 1,
                            time: '09/04',
                            matchs: [
                                {
                                    top: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'FLY',
                                        icon: 'FLY.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'M80',
                                        icon: 'M80-01.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Fnatic',
                                        icon: 'Fnatic.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Fluxo',
                                        icon: 'Fluxo.png',
                                        score: 1,
                                    },

                                },
                                {
                                    top: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'NRG',
                                        icon: 'NRG.png',
                                        score: 1,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND2',
                            round: '0-1',
                            bo: 1,
                            time: '10/16',
                            matchs: [
                                {
                                    top: {
                                        team: 'Legacy',
                                        icon: 'Legacy.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'RA',
                                        icon: 'RA.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'The Huns',
                                        icon: 'TheHuns.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'GL',
                                        icon: 'GamerLegion-01.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Red Canids',
                                        icon: 'RED Canids.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'NIP',
                                        icon: 'NIP.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'LVG',
                                        icon: 'LVG.png',
                                        score: 0,
                                    },
                                },
                            ],
                        }
                    ],
                    [
                        {
                            name: 'ROUND3',
                            round: '2-0',
                            bo: 3,
                            time: '09/05',
                            matchs: [
                                {
                                    top: {
                                        team: 'FLY',
                                        icon: 'FLY.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Fluxo',
                                        icon: 'Fluxo.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'M80',
                                        icon: 'M80-01.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'NRG',
                                        icon: 'NRG.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND3',
                            round: '1-1',
                            bo: 1,
                            time: '10/18',
                            matchs: [
                                {
                                    top: {
                                        team: 'Legacy',
                                        icon: 'Legacy.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Red Canids',
                                        icon: 'RED Canids.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'NIP',
                                        icon: 'NIP.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Fnatic',
                                        icon: 'Fnatic.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND3',
                            round: '0-2',
                            bo: 3,
                            time: '10/19',
                            matchs: [
                                {
                                    top: {
                                        team: 'GL',
                                        icon: 'GamerLegion-01.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'RA',
                                        icon: 'RA.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'The Huns',
                                        icon: 'TheHuns.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'LVG',
                                        icon: 'LVG.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                    ],
                    [
                        {
                            name: 'ROUND4',
                            round: '2-1',
                            bo: 3,
                            time: '10/22-10/23',
                            matchs: [
                                {
                                    top: {
                                        team: 'Fluxo',
                                        icon: 'Fluxo.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'NIP',
                                        icon: 'NIP.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'B8',
                                        icon: 'B8.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Legacy',
                                        icon: 'Legacy.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'NRG',
                                        icon: 'NRG.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Fnatic',
                                        icon: 'Fnatic.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND4',
                            round: '1-2',
                            bo: 3,
                            time: '10/23-10/24',
                            matchs: [
                                {
                                    top: {
                                        team: 'Red Canids',
                                        icon: 'RED Canids.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'The Huns',
                                        icon: 'TheHuns.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'GL',
                                        icon: 'GamerLegion-01.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                    ],
                    [
                        {
                            name: 'ROUND5',
                            round: '2-2',
                            bo: 3,
                            time: '10/25',
                            matchs: [
                                {
                                    top: {
                                        team: 'Fluxo',
                                        icon: 'Fluxo.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Faze',
                                        icon: 'FAZE.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'NRG',
                                        icon: 'NRG.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Imperial',
                                        icon: 'Imperial-01.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Legacy',
                                        icon: 'Legacy.png',
                                        score: 1,
                                    },
                                },
                            ],
                        },
                    ]
                ],
                winners: [],
                losers: [],
            },
        ],
    },
    {
        name: 'S15',
        full: '2025英雄联盟全球总决赛',
        logo: 'LOL.png',
        location: '中国 北京/上海/成都',
        date: '2025.10.14 - 11.09',
        status: 'completed',
        winner: {
            team: "T1",
            icon: "T1.png",
        },
        stages: [
            {
                stage: '淘汰赛',
                type: 'tournament',
                rounds: [
                    [
                        {
                            name: "GAME1",
                            round: "八强战",
                            time: "10/28",
                            bo: 5,
                            top: {
                                team: "HLE",
                                icon: "HLE.png",
                                score: 1
                            },
                            bottom: {
                                team: "GEN",
                                icon: "GNG.png",
                                score: 3
                            },

                        },
                        {
                            name: "GAME2",
                            round: "八强战",
                            time: "10/29",
                            bo: 5,
                            top: {
                                team: "KT",
                                icon: "KT.png",
                                score: 3
                            },
                            bottom: {
                                team: "CFO",
                                icon: "CFO.png",
                                score: 0
                            },
                        },
                        {
                            name: "GAME3",
                            round: "八强战",
                            time: "10/30",
                            bo: 5,
                            top: {
                                team: "G2",
                                icon: "G2.png",
                                score: 1
                            },
                            bottom: {
                                team: "TES",
                                icon: "TES.png",
                                score: 3
                            },
                        },
                        {
                            name: "GAME4",
                            round: "八强战",
                            time: "10/31",
                            bo: 5,
                            top: {
                                team: "AL",
                                icon: "AL.png",
                                score: 2
                            },
                            bottom: {
                                team: "T1",
                                icon: "T1.png",
                                score: 3
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME5",
                            round: "四强战",
                            time: "11/01",
                            bo: 5,
                            top: {
                                team: "GEN",
                                icon: "GNG.png",
                                score: 1
                            },
                            bottom: {
                                team: "KT",
                                icon: "KT.png",
                                score: 3
                            },
                        },
                        {
                            name: "GAME6",
                            round: "四强战",
                            time: "11/02",
                            bo: 5,
                            top: {
                                team: "TES",
                                icon: "TES.png",
                                score: 0
                            },
                            bottom: {
                                team: "T1",
                                icon: "T1.png",
                                score: 3
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME7",
                            round: "决赛",
                            time: "11/09",
                            bo: 5,
                            top: {
                                team: "KT",
                                icon: "KT.png",
                                score: 2
                            },
                            bottom: {
                                team: "T1",
                                icon: "T1.png",
                                score: 3
                            },
                        }
                    ],
                ],
                winners: [],
                losers: [],
            },
            {
                stage: '瑞士轮',
                type: 'swiss',
                limit: 3,
                rounds: [
                    [
                        {
                            name: 'ROUND1',
                            round: '0-0',
                            bo: 1,
                            time: '10/15',
                            matchs: [
                                {
                                    top: {
                                        team: 'TSW',
                                        icon: 'Team Secret.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'VKS',
                                        icon: 'VKS.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'CFO',
                                        icon: 'CFO.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'FNC',
                                        icon: 'Fnatic.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'KT',
                                        icon: 'KT.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'MKOI',
                                        icon: 'MKOI.png',
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
                                        score: 1,
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
                                        score: 1,
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
                                        score: 1,
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
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'GEN',
                                        icon: 'GNG.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'PSG',
                                        icon: 'PSG.png',
                                        score: 0,
                                    },
                                },
                            ],
                        }
                    ],
                    [
                        {
                            name: 'ROUND2',
                            round: '1-0',
                            bo: 1,
                            time: '10/16',
                            matchs: [
                                {
                                    top: {
                                        team: 'KT',
                                        icon: 'KT.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'TSW',
                                        icon: 'Team Secret.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'TES',
                                        icon: 'TES.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: '100T',
                                        icon: '100T.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'CFO',
                                        icon: 'CFO.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'T1',
                                        icon: 'T1.png',
                                        score: 0,
                                    },

                                },
                                {
                                    top: {
                                        team: 'GEN',
                                        icon: 'GNG.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'AL',
                                        icon: 'AL.png',
                                        score: 1,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND2',
                            round: '0-1',
                            bo: 1,
                            time: '10/16',
                            matchs: [
                                {
                                    top: {
                                        team: 'VKS',
                                        icon: 'VKS.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'FLY',
                                        icon: 'FLY.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'MKOI',
                                        icon: 'MKOI.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'G2',
                                        icon: 'G2.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'BLG',
                                        icon: 'BLG.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'FNC',
                                        icon: 'Fnatic.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'HLE',
                                        icon: 'HLE.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'PSG',
                                        icon: 'PSG.png',
                                        score: 0,
                                    },
                                },
                            ],
                        }
                    ],
                    [
                        {
                            name: 'ROUND3',
                            round: '2-0',
                            bo: 3,
                            time: '10/17',
                            matchs: [
                                {
                                    top: {
                                        team: 'KT',
                                        icon: 'KT.png',
                                        score: 2,
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
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'AL',
                                        icon: 'AL.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND3',
                            round: '1-1',
                            bo: 1,
                            time: '10/18',
                            matchs: [
                                {
                                    top: {
                                        team: 'TSW',
                                        icon: 'Team Secret.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'FLY',
                                        icon: 'FLY.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'GEN',
                                        icon: 'GNG.png',
                                        score: 1,
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
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'BLG',
                                        icon: 'BLG.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: '100T',
                                        icon: '100T.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'HLE',
                                        icon: 'HLE.png',
                                        score: 1,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND3',
                            round: '0-2',
                            bo: 3,
                            time: '10/19',
                            matchs: [
                                {
                                    top: {
                                        team: 'FNC',
                                        icon: 'Fnatic.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'MKOI',
                                        icon: 'MKOI.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'VKS',
                                        icon: 'VKS.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'PSG',
                                        icon: 'PSG.png',
                                        score: 1,
                                    },
                                },
                            ],
                        },
                    ],
                    [
                        {
                            name: 'ROUND4',
                            round: '2-1',
                            bo: 3,
                            time: '10/22-10/23',
                            matchs: [
                                {
                                    top: {
                                        team: 'CFO',
                                        icon: 'CFO.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'HLE',
                                        icon: 'HLE.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'G2',
                                        icon: 'G2.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'FLY',
                                        icon: 'FLY.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'GEN',
                                        icon: 'GNG.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'TES',
                                        icon: 'TES.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND4',
                            round: '1-2',
                            bo: 3,
                            time: '10/23-10/24',
                            matchs: [
                                {
                                    top: {
                                        team: 'MKOI',
                                        icon: 'MKOI.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'TSW',
                                        icon: 'Team Secret.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'BLG',
                                        icon: 'BLG.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'VKS',
                                        icon: 'VKS.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: '100T',
                                        icon: '100T.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'T1',
                                        icon: 'T1.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                    ],
                    [
                        {
                            name: 'ROUND5',
                            round: '2-2',
                            bo: 3,
                            time: '10/25',
                            matchs: [
                                {
                                    top: {
                                        team: 'CFO',
                                        icon: 'CFO.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'FLY',
                                        icon: 'FLY.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'BLG',
                                        icon: 'BLG.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'TES',
                                        icon: 'TES.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'MKOI',
                                        icon: 'MKOI.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'T1',
                                        icon: 'T1.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                    ],
                ],
                winners: [],
                losers: [],
            },
        ],
    },
    {
        name: 'TI14',
        full: '2025 Dota2 国际邀请赛',
        logo: 'Dota.png',
        location: '德国 汉堡',
        date: '2025.09.04 - 09.14',
        status: 'completed',
        winner: {
            team: "Falcons",
            icon: "Falcons.png",
        },
        stages: [
            {
                stage: '淘汰赛',
                type: 'doubles',
                rounds: [],
                winners: [
                    [
                        {
                            name: "GAME1",
                            round: "淘汰赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "XG",
                                icon: "XG.png",
                                score: 2
                            },
                            bottom: {
                                team: "Tundra",
                                icon: "Tundra.png",
                                score: 0
                            },
                        },
                        {
                            name: "GAME2",
                            round: "淘汰赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "PVISION",
                                icon: "PARIVISION.png",
                                score: 2
                            },
                            bottom: {
                                team: "HEROIC",
                                icon: "Heroic-01.png",
                                score: 0
                            },
                        },
                        {
                            name: "GAME3",
                            round: "淘汰赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "Tidebound",
                                icon: "TIDEBOUND.png",
                                score: 0
                            },
                            bottom: {
                                team: "Falcons",
                                icon: "Falcons.png",
                                score: 2
                            },
                        },
                        {
                            name: "GAME4",
                            round: "淘汰赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "BB",
                                icon: "BB-01.png",
                                score: 2
                            },
                            bottom: {
                                team: "Nigma Galaxy",
                                icon: "NIGMA.png",
                                score: 1
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME7",
                            round: "胜者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "XG",
                                icon: "XG.png",
                                score: 0
                            },
                            bottom: {
                                team: "PVISION",
                                icon: "PARIVISION.png",
                                score: 2
                            },
                        },
                        {
                            name: "GAME8",
                            round: "胜者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "FALCONS",
                                icon: "Falcons.png",
                                score: 2
                            },
                            bottom: {
                                team: "BB",
                                icon: "BB.png",
                                score: 1
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME11",
                            round: "胜者组决赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "PVISION",
                                icon: "PARIVISION.png",
                                score: 1
                            },
                            bottom: {
                                team: "FALCONS",
                                icon: "Falcons.png",
                                score: 2
                            },
                        }
                    ],
                    [
                        {
                            name: "GAME13",
                            round: "决赛",
                            time: "-/-",
                            bo: 5,
                            top: {
                                team: "Falcons",
                                icon: "Falcons.png",
                                score: 3
                            },
                            bottom: {
                                team: "XG",
                                icon: "XG.png",
                                score: 2
                            },
                        }
                    ]
                ],
                losers: [
                    [
                        {
                            name: "GAME5",
                            round: "败者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TUNDRA",
                                icon: "Tundra.png",
                                score: 0
                            },
                            bottom: {
                                team: "HEROIC",
                                icon: "Heroic-01.png",
                                score: 2
                            },
                        },
                        {
                            name: "GAME6",
                            round: "败者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "Tidebound",
                                icon: "TIDEBOUND.png",
                                score: 0
                            },
                            bottom: {
                                team: "Nigma Galaxy",
                                icon: "NIGMA.png",
                                score: 2
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME9",
                            round: "败者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "BB",
                                icon: "BB-01.png",
                                score: 2
                            },
                            bottom: {
                                team: "Heroic",
                                icon: "Heroic-01.png",
                                score: 1
                            },
                        },
                        {
                            name: "GAME10",
                            round: "败者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "XG",
                                icon: "XG.png",
                                score: 2
                            },
                            bottom: {
                                team: "Nigma Galaxy",
                                icon: "NIGMA.png",
                                score: 0
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME12",
                            round: "败者组决赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "BB",
                                icon: "BB-01.png",
                                score: 0
                            },
                            bottom: {
                                team: "XG",
                                icon: "XG.png",
                                score: 2
                            },
                        },
                    ]
                ],
            },
            {
                stage: '瑞士轮',
                type: 'swiss',
                limit: 4,
                rounds: [
                    [
                        {
                            name: 'ROUND1',
                            round: '0-0',
                            bo: 3,
                            time: '09/04',
                            matchs: [
                                {
                                    top: {
                                        team: 'Aurora',
                                        icon: 'Aurora.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'XG',
                                        icon: 'XG.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Spirit',
                                        icon: 'Team Spirit.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Wildcard',
                                        icon: 'Wildcard.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Falcons',
                                        icon: 'Falcons.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Nem',
                                        icon: 'Nemesis.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Tundra',
                                        icon: 'Tundra.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'YkBros',
                                        icon: 'YB.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'BOOM',
                                        icon: 'BOOM.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'HEROIC',
                                        icon: 'Heroic-01.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Tidebd',
                                        icon: 'TIDEBOUND.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'BB',
                                        icon: 'BB-01.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'NGX',
                                        icon: 'NIGMA.png',
                                        score: 2,
                                    },
                                },
                            ],
                        }
                    ],
                    [
                        {
                            name: 'ROUND2',
                            round: '1-0',
                            bo: 3,
                            time: '09/04',
                            matchs: [
                                {
                                    top: {
                                        team: 'Falcons',
                                        icon: 'Falcons.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Tundra',
                                        icon: 'Tundra.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Spirit',
                                        icon: 'Team Spirit.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'XG',
                                        icon: 'XG.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'NGX',
                                        icon: 'NIGMA.png',
                                        score: 0,
                                    },

                                },
                                {
                                    top: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Tidebd',
                                        icon: 'TIDEBOUND.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND2',
                            round: '0-1',
                            bo: 3,
                            time: '10/16',
                            matchs: [
                                {
                                    top: {
                                        team: 'YkBros',
                                        icon: 'YB.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Nem',
                                        icon: 'Nemesis.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Aurora',
                                        icon: 'Aurora.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Wildcard',
                                        icon: 'Wildcard.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Heroic',
                                        icon: 'Heroic-01.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'BOOM',
                                        icon: 'BOOM.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'BB',
                                        icon: 'BB-01.png',
                                        score: 2,
                                    },
                                },
                            ],
                        }
                    ],
                    [
                        {
                            name: 'ROUND3',
                            round: '2-0',
                            bo: 3,
                            time: '09/05',
                            matchs: [
                                {
                                    top: {
                                        team: 'XG',
                                        icon: 'XG.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Falcons',
                                        icon: 'Falcons.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Tidebd',
                                        icon: 'TIDEBOUND.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND3',
                            round: '1-1',
                            bo: 3,
                            time: '10/18',
                            matchs: [
                                {
                                    top: {
                                        team: 'Spirit',
                                        icon: 'Team Spirit.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Tundra',
                                        icon: 'Tundra.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Aurora',
                                        icon: 'Aurora.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'YBros',
                                        icon: 'YB.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'BB',
                                        icon: 'BB-01.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'NGX',
                                        icon: 'NIGMA.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND3',
                            round: '0-2',
                            bo: 3,
                            time: '10/19',
                            matchs: [
                                {
                                    top: {
                                        team: 'Nem',
                                        icon: 'Nemesis.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Wildcard',
                                        icon: 'Wildcard.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'BOOM',
                                        icon: 'BOOM.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'HEROIC',
                                        icon: 'Heroic-01.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                    ],
                    [
                        {
                            name: 'ROUND4',
                            round: '3-0',
                            bo: 3,
                            time: '09/06',
                            matchs: [
                                {
                                    top: {
                                        team: 'XG',
                                        icon: 'XG.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Tidebd',
                                        icon: 'TIDEBOUND.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND4',
                            round: '2-1',
                            bo: 3,
                            time: '10/22-10/23',
                            matchs: [
                                {
                                    top: {
                                        team: 'Spirit',
                                        icon: 'Team Spirit.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Falcons',
                                        icon: 'Falcons.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Aurora',
                                        icon: 'Aurora.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'BB',
                                        icon: 'BB-01.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND4',
                            round: '1-2',
                            bo: 3,
                            time: '10/23-10/24',
                            matchs: [
                                {
                                    top: {
                                        team: 'Tundra',
                                        icon: 'Tundra.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Wildcard',
                                        icon: 'Wildcard.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'HEROIC',
                                        icon: 'Heroic-01.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'YBros',
                                        icon: 'YB.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'NGX',
                                        icon: 'NIGMA.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND4',
                            round: '0-3',
                            bo: 3,
                            time: '09/06',
                            matchs: [
                                {
                                    top: {
                                        team: 'BOOM',
                                        icon: 'BOOM.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Nem',
                                        icon: 'Nemesis.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                    ],
                    [
                        {
                            name: 'ROUND5',
                            round: '3-1',
                            bo: 3,
                            time: '09/06',
                            matchs: [
                                {
                                    top: {
                                        team: 'Tidebd',
                                        icon: 'TIDEBOUND.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Falcons',
                                        icon: 'Falcons.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'BB',
                                        icon: 'BB-01.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND5',
                            round: '2-2',
                            bo: 3,
                            time: '10/25',
                            matchs: [
                                {
                                    top: {
                                        team: 'Tundra',
                                        icon: 'Tundra.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'HEROIC',
                                        icon: 'Heroic-01.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'YBros',
                                        icon: 'YB.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Spirit',
                                        icon: 'Team Spirit.png',
                                        score: 0,
                                    },
                                    bottom: {
                                        team: 'Aurora',
                                        icon: 'Aurora.png',
                                        score: 2,
                                    },
                                },
                            ],
                        },
                        {
                            name: 'ROUND5',
                            round: '1-3',
                            bo: 3,
                            time: '09/06',
                            matchs: [
                                {
                                    top: {
                                        team: 'Wildcard',
                                        icon: 'Wildcard.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'BOOM',
                                        icon: 'BOOM.png',
                                        score: 1,
                                    },
                                },
                                {
                                    top: {
                                        team: 'NGX',
                                        icon: 'NIGMA.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'NAVI',
                                        icon: 'NAVI.png',
                                        score: 1,
                                    },
                                },
                            ],
                        },
                    ],
                    [
                        {
                            name: 'ROUND6',
                            round: '3-2 VS 2-3',
                            bo: 3,
                            time: '09/06',
                            matchs: [
                                {
                                    top: {
                                        team: 'HEROIC',
                                        icon: 'Heroic-01.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'YBros',
                                        icon: 'YB.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Aurora',
                                        icon: 'Aurora.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'NGX',
                                        icon: 'NIGMA.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'PV',
                                        icon: 'PARIVISION.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Wildcard',
                                        icon: 'Wildcard.png',
                                        score: 0,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Liquid',
                                        icon: 'Team Liquid.png',
                                        score: 1,
                                    },
                                    bottom: {
                                        team: 'Tundra',
                                        icon: 'Tundra.png',
                                        score: 2,
                                    },
                                },
                                {
                                    top: {
                                        team: 'Falcons',
                                        icon: 'Falcons.png',
                                        score: 2,
                                    },
                                    bottom: {
                                        team: 'Spirits',
                                        icon: 'Team Spirit.png',
                                        score: 0,
                                    },
                                },
                            ],
                        },
                    ]
                ],
                winners: [],
                losers: [],
            },
        ],
    },
    {
        name: '模板',
        full: '',
        logo: 'LOL.png',
        location: '',
        date: '-',
        status: 'ongoing',
        winner: {
            team: "",
            icon: "",
        },
        stages: [
            {
                stage: '淘汰赛-8强',
                type: 'tournament',
                rounds: [
                    [
                        {
                            name: "GAME1",
                            round: "八强战",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                        {
                            name: "GAME2",
                            round: "八强战",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                        {
                            name: "GAME3",
                            round: "八强战",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                        {
                            name: "GAME4",
                            round: "八强战",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME5",
                            round: "四强战",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                        {
                            name: "GAME6",
                            round: "四强战",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME7",
                            round: "决赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        }
                    ],
                ],
                winners: [],
                losers: [],
            },
            {
                stage: '双败淘汰赛-16强',
                type: 'doubles',
                rounds: [],
                winners: [
                    [
                        {
                            name: "GAME1",
                            round: "淘汰赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                        {
                            name: "GAME2",
                            round: "淘汰赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                        {
                            name: "GAME3",
                            round: "淘汰赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                        {
                            name: "GAME4",
                            round: "淘汰赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME7",
                            round: "胜者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                        {
                            name: "GAME8",
                            round: "胜者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME11",
                            round: "胜者组决赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        }
                    ],
                    [
                        {
                            name: "GAME13",
                            round: "决赛",
                            time: "-/-",
                            bo: 5,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        }
                    ]
                ],
                losers: [
                    [
                        {
                            name: "GAME5",
                            round: "败者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                        {
                            name: "GAME6",
                            round: "败者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME9",
                            round: "败者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                        {
                            name: "GAME10",
                            round: "败者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME12",
                            round: "败者组决赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                    ]
                ],
            },
            {
                stage: '双败淘汰赛-8强',
                type: 'doubles',
                rounds: [],
                winners: [
                    [
                        {
                            name: "GAME1",
                            round: "淘汰赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                        {
                            name: "GAME2",
                            round: "淘汰赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME4",
                            round: "胜者组决赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        }
                    ],
                    [
                        {
                            name: "GAME6",
                            round: "决赛",
                            time: "-/-",
                            bo: 5,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        }
                    ]
                ],
                losers: [
                    [
                        {
                            name: "GAME3",
                            round: "败者组",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                    ],
                    [
                        {
                            name: "GAME5",
                            round: "败者组决赛",
                            time: "-/-",
                            bo: 3,
                            top: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                            bottom: {
                                team: "TBD",
                                icon: "",
                                score: 0
                            },
                        },
                    ]
                ],
            },
        ],
    },
]