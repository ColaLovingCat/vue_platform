import * as extend from "@/commons/utils/extends";

export interface PokerCard {
  /** 
   * 唯一标识符（例如：30）
   * - 可以按规则编码：花色(0-3) + 牌值(1-13) => e.g. 红桃3 = 0*100 + 3 = 3
   */
  id: number;
  /** 图片资源路径（如 "poker-30.png"） */
  image: string;
  /** 牌的名称（如 "3_Heart"），可用于调试或显示 */
  name: string;
  /** 牌的数值（如 "3"、"K"、"A"），用于游戏逻辑计算 */
  value: string;
  /** 牌的花色（"Heart", "Diamond", "Club", "Spade"） */
  suit: 'Heart' | 'Diamond' | 'Club' | 'Spade' | 'Joker';
  /** 
   * 牌的游戏内权重（用于排序或比较大小）
   * - 例如：3=3, K=13, A=14（某些游戏A可能为1或11）
   */
  rank: number;
  /** 
   * 花色权重（用于同点数时比较花色，例如：Heart=4, Diamond=3, Club=2, Spade=1）
   * - 某些游戏可能需要按花色排序
   */
  suitRank: number;
  /** 是否牌面朝下（默认false，发牌时可能用到） */
  isFaceDown: boolean;
  /** 是否被选中（用于UI交互，如手牌选择） */
  isSelected: boolean;
  /** 牌的持有者信息（如 "player1" 或 "dealer"，用于游戏逻辑） */
  owner: string | null;
}

export function createDeck(includeJokers: boolean = false): PokerCard[] {
  const suits = ['Heart', 'Diamond', 'Club', 'Spade'] as const;
  const values = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2']; // 注意顺序从3开始

  const deck: PokerCard[] = [];

  // 生成标准牌组（A和2已按规则排在最后）
  suits.forEach((suit, suitIndex) => {
    values.forEach((value) => {
      deck.push({
        id: suitIndex * 100 + getRank(value), // ID 包含花色和权重
        image: `poker-${value}-${suit}.png`,
        name: `${value}_${suit}`,
        value,
        suit,
        rank: getRank(value), // 关键修改：按自定义规则计算权重
        suitRank: 4 - suitIndex, // Heart=4, Spade=1
        isFaceDown: true,
        isSelected: false,
        owner: null,
      });
    });
  });

  // 添加鬼牌（可选）
  if (includeJokers) {
    for (let i = 0; i < 2; i++) {
      deck.push({
        id: 1000 + i,
        image: `poker-Joker-${i + 1}.png`,
        name: `Joker_${i + 1}`,
        value: 'Joker',
        suit: 'Joker',
        rank: 100, // 鬼牌权重最高
        suitRank: 0,
        isFaceDown: false,
        isSelected: false,
        owner: null,
      });
    }
  }

  return deck;
}

// 关键函数：根据牌面返回自定义权重
function getRank(value: string): number {
  const rankMap: Record<string, number> = {
    Joker: 100,
    '2': 90,
    'A': 80,
    'K': 70,
    'Q': 60,
    'J': 50,
    '10': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
  };
  return rankMap[value];
}

/**
 * @summary 洗牌算法（Fisher-Yates 洗牌）
 * @param pokers 要洗的牌数组（会复制，不改变原数组）
 * @returns 洗牌后的新数组
 */
export const shufflePokers = (pokers: PokerCard[]): PokerCard[] => {
  const shuffled = pokers.slice(); // 复制一份，避免修改原数组
  const len = shuffled.length;

  for (let i = len - 1; i > 0; i--) {
    // 随机索引 j：范围在 [0, i]
    const j = extend.ExNumber.createRand(0, i + 1, 0);
    if (i !== j) {
      // 交换 i 和 j 的元素
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  }

  return shuffled;
};

/**
 * @summary 从牌堆中随机获取相应数量的牌
 * @param pokers 当前牌堆（数组）
 * @param count 需要抽取的牌数量
 * @returns 包含抽到的牌 selected 和剩余的牌堆 pokers
 */
export const getPokers = (
  pokers: PokerCard[],
  count: number
): { pokers: PokerCard[]; selected: PokerCard[] } => {
  const remaining = [...pokers]; // 复制一份牌堆，避免直接修改原始数组
  const selected: PokerCard[] = [];

  // 安全限制：不能抽取超过现有数量的牌
  const drawCount = Math.min(count, remaining.length);

  for (let i = 0; i < drawCount; i++) {
    // 随机索引
    const randIndex = Math.floor(Math.random() * remaining.length);
    // 抽出牌
    const picked = remaining.splice(randIndex, 1)[0]; // splice 会返回一个数组
    selected.push(picked);
  }

  return {
    pokers: remaining, // 抽完后剩下的牌
    selected, // 被抽出的牌
  };
};
