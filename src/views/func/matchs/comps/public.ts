export interface GameInfo {
    name: string;
    full: string;
    logo: string;
    location: string;
    date: string;
    status: string;
    winner: string;
    path: string;
    winner_logo: string;
    stages: StageInfo[];
}

export interface StageInfo {
    game_name: string;
    stage: string;
    type: string;
    mark: string;
    limit?: number;
    status: number;
    rounds: RoundInfo[] | RoundInfo[][];
    winners: any[];
    losers: any[];
}

export interface RoundInfo {
    id: string;
    game_name: string;
    stage: string;
    group: number;
    name: string;
    is_winner: number;
    round: string;
    bo: number;
    time: string;
    is_final: number;
    matchs: MatchInfo[];
}

export interface MatchInfo {
    top: {
        team: string;
        icon: string;
        score: number;
    };
    bottom: {
        team: string;
        icon: string;
        score: number;
    };
}

export const getTeamClass = (match: any, team: string, mark: string, bo: number): string => {
    const { top: teamA, bottom: teamB } = match;

    // 检查 TBD 情况
    if ((team === "top" && teamA.team === "TBD") ||
        (team === "bottom" && teamB.team === "TBD")) {
        return 'tbd';
    }

    // 谁分数更高
    if (mark === 'football') {
        const topScore = teamA.score;
        const bottomScore = teamB.score;

        if (topScore === bottomScore) {
            // 返回点球结果
            if (team === "top") {
                return teamA.kick < teamB.kick ? 'lose' : teamA.kick > teamB.kick ? 'win' : '';
            }
            if (team === "bottom") {
                return teamA.kick > teamB.kick ? 'lose' : teamA.kick < teamB.kick ? 'win' : '';
            }
        }

        if (team === 'top') {
            return topScore > bottomScore ? 'win' : 'lose';
        }
        return bottomScore > topScore ? 'win' : 'lose';
    }
    // BO赛制
    else {
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
    }

    return '';
};