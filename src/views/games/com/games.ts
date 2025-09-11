export interface Player {
  code: string; // 玩家唯一标识
  showName: string; // 显示名称
  img: string; // 头像 URL
  isHost: boolean; // 是否为房主
  isRobot: boolean; // 是否为机器人
  isOnline: boolean; // 是否在线
  isActive: boolean; // 当前是否处于活跃状态
  status: PlayerStatus | ""; // 状态
  order: number; // 出牌顺序等用处
  //
  totalCount?: 0; // 总共出过几次
  //
  pokers?: any[]; // 手牌
  pokersUsed?: any[]; // 弃牌
}
export enum PlayerStatus {
  Waiting = "waiting",
  Playing = "playing",
  Offline = "offline",
  Ready = "ready",
}

/**
 * @summary 创建用户
 */
export const createPlayer = (
  index: number,
  options: Partial<Player> = {}
): Player => {
  const name = "player" + (index + 1);
  return {
    code: options.code ?? name,
    showName: options.showName ?? name,
    img: options.img ?? name + ".png",
    isHost: options.isHost ?? false,
    isRobot: options.isRobot ?? false,
    isOnline: options.isOnline ?? true,
    isActive: options.isActive ?? false,
    status: options.status ?? "",
    order: options.order ?? 0,
    //
    totalCount: options.totalCount ?? 0,
    pokers: options.pokers ?? [],
    pokersUsed: options.pokersUsed ?? [],
  };
};