export const heros = [
    {
        code: "ember_spirit",
        name: "灰烬之灵",
        nickname: "火猫",
        stat: "敏捷",
        attackType: "近战",
        line: "快速出击，锁住敌人",
        description: "身手矫捷，飘忽不定；出手迅速，无人幸免；阳炎长索，破阵缚敌；爆裂残像，瞬息飞至；烬灵之焰，难捕难防。",
        defaultAbility: {
            name: "献祭心",
            desc: "灰烬之灵持续燃烧，时刻对周围所有敌人造成每秒伤害。",
        },
        ability: [
            {
                name: "炎阳索",
                desc: "灰烬之灵释放出火焰绳索来缠绕住附近的敌人，将他们困于原地并每秒造成一定伤害。",
                lore: "炘之严训，炽链相伴。",
                icon: "ember_spirit_searing_chains.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [],
                scepter_descs: [],
            },
            {
                name: "无影拳",
                desc: "灰烬之灵以燎原之火的速度横冲直撞，攻击目标区域内所有敌人，随后返回所在位置。对英雄造成额外伤害。",
                lore: "顷刻之间，鞭策众敌。",
                icon: "ember_spirit_sleight_of_fist.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [],
                scepter_descs: [],
            },
            {
                name: "烈火罩",
                desc: "灰烬之灵用火焰之环将自己包裹起来，会消耗受到的魔法伤害，使受到的魔法伤害被吸收一定百分比。烈火罩开启后会对灰烬之灵周围的敌人造成每秒伤害。护盾消失后将失去伤害效果。",
                lore: "近身之敌，自讨苦吃。",
                icon: "ember_spirit_flame_guard.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [],
                scepter_descs: [],
            },
            {
                name: "激活残焰",
                desc: "选择残焰，灰烬之灵将向其冲去。",
                lore: "燎原之火，瞬息将至！",
                icon: "ember_spirit_activate_fire_remnant.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [],
                scepter_descs: [],
            },
            {
                name: "残焰",
                desc: "可以放出一个残焰，向目标地点冲去，速度为灰烬之灵移动速度的250%。使用“激活残焰”技能后，灰烬之灵向所有残焰像冲去，将其摧毁并造成范围伤害，并移动至最近的残焰像。灰烬之灵最后会到达离目标地点最近的残焰像。",
                lore: "身怀灵力，重焕教义。",
                icon: "ember_spirit_fire_remnant.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [
                    '使残焰获得当前等级的献祭心，并且伤害和作用范围提升。',
                    '灰烬之灵附近范围内有敌方英雄阵亡时，恢复一点残焰能量点数。',
                ],
                scepter_descs: [
                    "提升施法距离、初始残焰速度和最大能量点数。"
                ],
            },
        ],
        talents: [
            {
                level: 10,
                desc: "炎阳索可以额外作用两个敌人。施放炎阳索时，每个残焰周围也会施放炎阳索。",
            },
            {
                level: 10,
                desc: "+12 攻击力",
            },
            {
                level: 15,
                desc: "+0.8秒 炎阳索持续时间",
            },
            {
                level: 15,
                desc: "+100% 烈火罩每秒伤害",
            },
            {
                level: 20,
                desc: "+100% 烈火罩每秒伤害",
            },
            {
                level: 20,
                desc: "+50 炎阳索伤害",
            },
            {
                level: 25,
                desc: "-12秒 残焰充能",
            },
            {
                level: 25,
                desc: "2 无影拳能量点数",
            },
        ],
        facets: [
            {
                name: "双重冲击",
                desc: "无影拳会再次击中其中一个目标。",
                icon: "fist.png",
                ability: [
                    {
                        name: "无影拳",
                        desc: "无影拳击中的敌人超过2个时，距离灰烬之灵最近的敌人会再次受到攻击。第二次攻击的伤害减少50%。",
                        icon: "ember_spirit_sleight_of_fist.png",
                    }
                ],
            },
            {
                name: "上下求索",
                desc: "炎阳索可以额外作用两个敌人。施放炎阳索时，每个残焰周围也会施放炎阳索。",
                icon: "debuff.png",
                ability: [
                    {
                        name: "炎阳索",
                        desc: "炎阳索可以额外作用两个敌人。施放炎阳索时，每个残焰周围也会施放炎阳索。",
                        icon: "ember_spirit_searing_chains.png",
                    }
                ],
            },
        ]
    },
    {
        code: "void_spirit",
        name: "虚无之灵",
        nickname: "紫猫",
        stat: "全才",
        attackType: "近战",
        line: "出入人世来打击敌人",
        description: "掌握着足以粉碎凡人心智的秘密，虚无之灵自他的隐之圣堂现身，同时守卫着战场上多片区域。他能够随时出入凡间，让对手疲于奔命，从任何希望的地点出手，必要之时召唤太虚的力量保护自己。",
        defaultAbility: {
            name: "内在优势",
            desc: "虚无之灵从力量中获得的生命恢复、敏捷中获得的护甲、智力中获得的魔法恢复和魔法抗性均提升25%。",
        },
        ability: [
            {
                name: "残阴",
                desc: "虚无之灵向目标地点派出一个残像。残像观察着一片区域，面朝矢量的方向。当有目标进入其视线，残像会拉扯，并造成伤害。",
                lore: "无玄的存在远超时间和空间中的一个点。",
                icon: "void_spirit_aether_remnant.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [
                    "额外产生一道观察路径，会围绕残阴旋转。残阴现在会提供真实视域，不再对非英雄单位触发，而是每秒在两道路径上造成50%伤害。"
                ],
                scepter_descs: [],
            },
            {
                name: "异化",
                desc: "虚无之灵暂时遁入太虚，创造数个灵扉。穿过灵扉他能重组自身。穿出灵扉后，他对区域内所有敌人造成伤害。",
                lore: "无玄更愿意脱离肉体的限制，自由地观察我们的位面。",
                icon: "void_spirit_dissimilate.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [],
                scepter_descs: [],
            },
            {
                name: "共鸣脉冲",
                desc: "虚无之灵将自己包裹在保护性护盾之中，可以吸收物理伤害，并围绕自身发出一次伤害性脉冲。脉冲每击中一名敌方英雄，护盾的伤害吸收量都会提升。",
                lore: "被迫与物质位面互动时，无玄从不犹豫将自己包裹在本真的精华中。",
                icon: "void_spirit_resonant_pulse.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [],
                scepter_descs: [
                    "共鸣脉冲可以沉默敌人，并获得2点能量点数。"
                ],
            },
            {
                name: "太虚之径",
                desc: "虚无之灵撕裂现实进入精神位面，再出现在目标地点，对沿途的所有敌人造成伤害。此次攻击将施加一个太虚印记，造成1.25秒减速，然后引爆。",
                lore: "无玄的一小步就能在凡间引发极大的毁灭。",
                icon: "void_spirit_astral_step.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [],
                scepter_descs: [],
            },
        ],
        talents: [
            {
                level: 10,
                desc: "+40 共鸣脉冲伤害",
            },
            {
                level: 10,
                desc: "+1.5 魔法恢复",
            },
            {
                level: 15,
                desc: "+65 残阴伤害",
            },
            {
                level: 15,
                desc: "+20% 共鸣脉冲护盾",
            },
            {
                level: 20,
                desc: "-3秒 太虚之径充能",
            },
            {
                level: 20,
                desc: "异化增加部分外圈",
            },
            {
                level: 25,
                desc: "异化造成2秒缠绕",
            },
            {
                level: 25,
                desc: "140% 太虚之径暴击",
            },
        ],
        facets: [
            {
                name: "庇佑",
                desc: "共鸣脉冲会产生更强的全伤害护盾，而不是物理伤害护盾。",
                icon: "armor.png",
                ability: [
                    {
                        name: "共鸣脉冲",
                        desc: "共鸣脉冲会产生更强的全伤害护盾，而不是物理伤害护盾。",
                        icon: "void_spirit_resonant_pulse.png",
                    }
                ],
            },
            {
                name: "太虚的呼唤",
                desc: "退出异化时，残阴会在离虚无之灵最远的3个灵扉处产生。",
                icon: "illusion.png",
                ability: [
                    {
                        name: "残阴",
                        desc: "",
                        icon: "void_spirit_aether_remnant.png",
                    },
                    {
                        name: "异化",
                        desc: "",
                        icon: "void_spirit_dissimilate.png",
                    }
                ],
            },
        ]
    },
    {
        code: "storm_spirit",
        name: "风暴之灵",
        nickname: "蓝猫",
        stat: "智力",
        attackType: "远程",
        line: "可以穿过地图来参战",
        description: "风暴之灵从未错失一场战斗。将自己压缩于一道闪电中在战场中穿梭，他运用爆炸性的残影和饱含电荷的攻击从四面八方奇袭敌人，而敌人还在手忙脚乱的时候他已经不知去向。",
        defaultAbility: {
            name: "通电",
            desc: "风暴之灵每次击杀都会获得一点提供0.2点/秒魔法恢复的能量。每次阵亡会损失2点能量。升级球状闪电会获得3点额外能量。另外每次获得一点能量时他还会永久获得0.1点/秒魔法恢复。",
        },
        ability: [
            {
                name: "残影",
                desc: "风暴之灵制造一个充满爆炸性能量的自身残影，如果有人接近就会引爆造成伤害，残影持续12秒。",
                lore: "雷神·风暴烈酒的二象性让他可以欣赏自己被电时的百态。",
                icon: "storm_spirit_static_remnant.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [],
                scepter_descs: [],
            },
            {
                name: "电子涡流",
                desc: "将一个敌人拖到风暴之灵所在位置的涡流。",
                lore: "雷神狂暴的雷霆力量总是让其他人为之一电。",
                icon: "storm_spirit_electric_vortex.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [],
                scepter_descs: ["电子涡流变成范围型技能，可以作用于风暴之灵周围所有敌人。"],
            },
            {
                name: "超负荷",
                desc: "施法时会产生电荷，在风暴之灵下次攻击时被释放，对附近敌人造成伤害并减速。",
                lore: "啪！嘶！咝！",
                icon: "storm_spirit_overload.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: ["施放后风暴之灵和附近友方英雄获得3次超负荷效果。提供额外攻击速度。持续最多12秒，或效果用尽。"],
                scepter_descs: [],
            },
            {
                name: "球状闪电",
                desc: "风暴之灵变成不稳定的电流在战场上横冲直撞，直到他的魔法耗尽或到达目标才停下。施法消耗为25+总魔法量的7.5%，每移动100距离消耗10+总魔法量的0.65%，本技能造成的伤害每飞行100距离就会递增。",
                lore: "风暴来袭。",
                icon: "storm_spirit_ball_lightning.png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [],
                scepter_descs: [],
            },
        ],
        talents: [
            {
                level: 10,
                desc: "+1.5 魔法恢复",
            },
            {
                level: 10,
                desc: "-20 超负荷降低攻速/移速",
            },
            {
                level: 15,
                desc: "+60 残影伤害",
            },
            {
                level: 15,
                desc: "+250 生命",
            },
            {
                level: 20,
                desc: "-1.25秒 残影冷却",
            },
            {
                level: 20,
                desc: "+0.2秒 电子涡流持续时间",
            },
            {
                level: 25,
                desc: "球状闪电每450距离释放残影",
            },
            {
                level: 25,
                desc: "超负荷攻击弹射2次",
            },
        ],
        facets: [
            {
                name: "电击项圈",
                desc: "电子涡流会施加负面效果，在敌人攻击时触发一次超负荷。",
                icon: "nuke.png",
                ability: [
                    {
                        name: "电子涡流",
                        desc: "电子涡流会对敌人施加5秒的负面效果，使敌人下次攻击会以自身为目标，并触发一次超负荷。",
                        icon: "storm_spirit_electric_vortex.png",
                    }
                ],
            },
            {
                name: "滑行之影",
                desc: "残影会在风暴之灵处产生，并移动至目标地点。",
                icon: "movement.png",
                ability: [
                    {
                        name: "残影",
                        desc: "残影会在风暴之灵处产生，并移动至目标地点。",
                        icon: "storm_spirit_static_remnant.png",
                    }
                ],
            },
        ]
    },
    {
        code: "beastmaster",
        name: "兽王",
        nickname: "",
        stat: "全才",
        attackType: "近战",
        line: "召唤野兽协助狩猎",
        description: "兽王在战场上行走从来都是准备万全。他可以召唤喷毒的野猪和刺探敌情的战鹰协助狩猎，挥舞双斧劈开丛林中的树木，他震耳欲聋的咆哮将为盟友开出一条灭敌之路。",
        defaultAbility: {
            name: "刚毅",
            desc: "兽王对非英雄和非建筑单位的近战英雄伤害格挡几率从50%提升至100%。",
        },
        ability: [
            {
                name: "野性之斧",
                desc: "兽王投出他的斧头然后召回它们，切开飞过的敌人和树木。每把飞斧只对同一个敌人攻击一次，并且使受到来自兽王和其单位的伤害增加。",
                lore: "在独自学习野外生存时，兽王也掌握了飞斧的运用技巧，使他能够熟练地砍下树木，或者敌人的脑袋。",
                icon: "beastmaster_wild_axes.png",
            },
            {
                name: "野性呼唤豪猪",
                desc: "兽王召唤一头豪猪前来助阵。豪猪拥有被动的毒素攻击，可以减缓攻击和移动速度。",
                lore: "度过了与异兽互惠互助的孩童时期，兽王学会了如何随时召唤野兽。",
                icon: "beastmaster_call_of_the_wild_boar.png",
            },
            {
                name: "野性呼唤战鹰",
                desc: "兽王召唤一只战鹰环绕在他周围，战鹰以4秒的基础攻击间隔俯冲攻击敌人，造成并缠绕。战鹰提升攻击速度后会提升攻击频率。以英雄优先。",
                lore: "度过了与异兽互惠互助的孩童时期，兽王学会了如何随时召唤野兽。",
                icon: "beastmaster_call_of_the_wild_hawk.png",
                shard_descs: ["战鹰的持续时间提升5秒，并且额外召唤一只战鹰。"],
            },
            {
                name: "野性之心",
                desc: "唤起兽王和他控制单位的内心狂怒，被动提高他们的攻击速度。",
                lore: "兽王激起野兽先天力量的能力，在他袭击斯洛姆国王时得到了展现。",
                icon: "beastmaster_inner_beast.png",
            },
            {
                name: "原始咆哮",
                desc: "兽王发出震耳欲聋的咆哮，使目标敌方单位受到伤害并眩晕，同时在兽王和他的猎物之间清出一条通道。通道上的所有单位都被震开，也受到伤害并被降低移动和攻击速度。另外，兽王和他的单位获得40%移动速度提升，持续2秒。",
                lore: "兽王学会将他的原始本能凝聚为猛兽般的怒吼，在敌阵之中引发巨大的破坏。",
                icon: "beastmaster_primal_roar.png",
            },
            {
                name: "斯洛姆战鼓",
                desc: "兽王或周围他控制的单位攻击敌人都会使他敲下战鼓，对附近单位造成伤害，并且治疗自身和他控制的单位，数值为造成伤害的一定百分比。每次攻击都会降低敲鼓的间隔，20次攻击后降低至最短0.5秒敲击一次。如果没有发动攻击，每隔1秒敲鼓间隔都会逐渐变长。使用原始咆哮时自动增加10层敲鼓叠加效果。",
                lore: "自然的愤怒是永恒的，而知晓这个秘密的人就能非常轻松地重新激发在斯洛姆衰亡之际雀跃的怒火。",
                icon: "beastmaster_drums_of_slom.png",
                is_scepter: true,
            },
        ],
        talents: [
            {
                level: 10,
                desc: "+2% 野性之斧每次伤害加深",
            },
            {
                level: 10,
                desc: "-5秒 野性呼唤冷却",
            },
            {
                level: 15,
                desc: "+15 野性之心攻击速度",
            },
            {
                level: 15,
                desc: "兽王及其召唤物+15 移速",
            },
            {
                level: 20,
                desc: "兽王及其召唤物+250 生命",
            },
            {
                level: 20,
                desc: "兽王及其召唤物+30 攻击力",
            },
            {
                level: 25,
                desc: "-25秒 原始咆哮冷却",
            },
            {
                level: 25,
                desc: "野性之斧无冷却",
            },
        ],
        facets: [
            {
                name: "狂猎",
                desc: "兽王在附近有他的单位时攻击速度更高。",
                icon: "summons.png",
                ability: [
                    {
                        name: "野性之心",
                        desc: "攻击速度加成根据野性之心作用下的单位数量还会有所增加。",
                        icon: "beastmaster_inner_beast.png",
                    },
                ]
            },
            {
                name: "野兽模式",
                desc: "兽王可以提升自身的攻击速度和伤害加深。",
                icon: "damage.png",
                ability: [
                    {
                        name: "野性之心",
                        desc: "可以主动开启，提升兽王的攻击速度，并且他会对他的攻击目标施加野性之斧的伤害加深负面效果。",
                        icon: "beastmaster_inner_beast.png",
                    },
                ]
            },
        ]
    },
    {
        code: "elder_titan",
        name: "上古巨神",
        nickname: "大牛",
        stat: "力量",
        attackType: "近战",
        line: "运用灵体游魂伤害并控制敌人",
        description:
            "用灵体游魂探明敌情后，上古巨神从任意方向发动突袭。他巨蹄的重踏可以让敌人停下，他的存在则蚕食敌人的防御，而他还能撕裂大地本身，使敌人一一倒下。",
        defaultAbility: {
            name: "局势失衡",
            desc: "受到防御符文或者肉山的旗帜作用的友方小兵和建筑造成100%额外伤害。",
        },
        ability: [
            {
                name: "回音重踏",
                desc: "持续施法 - 上古巨神与他的灵体游魂一起践踏地面，对敌方单位造成伤害并使他们在原地昏迷。上古巨神造成物理伤害，灵体游魂造成魔法伤害。",
                lore: "创世之力依然在巨神的重踏下回响。",
                icon: "elder_titan_echo_stomp.png",
                shard_descs: ["减少冷却时间。回音重踏可以设为多样施法状态，使上古巨神完成重踏后会取代灵体游魂。"],
            },
            {
                name: "灵体游魂",
                desc: "上古巨神放出他的灵体游魂，灵魂对任何经过的单位都会造成伤害。当它与巨神合体时，它每伤害过一个单位都会给予若干攻击力、护甲和移动速度加成。",
                lore: "就像四大基本法则，上古巨神在所有位面同时存在，可以在需要协助的时候将其他位面的自己拖入。",
                icon: "elder_titan_ancestral_spirit.png",
                scepter_descs: ["游魂每碰到一名英雄就能使上古巨神在游魂回归后获得2秒减益免疫状态和50%魔法抗性提升。"],
            },
            {
                name: "自然秩序",
                desc: "使所有元素降低至基础水平，移除附近敌方单位的基础物理护甲和魔法抗性。护甲降低效果以英雄为中心，魔法抗性降低效果以灵体游魂为中心。",
                lore: "上古巨神又让创世之初重现。",
                icon: "elder_titan_natural_order.png",
            },
            {
                name: "裂地沟壑",
                desc: "上古巨神向前方放出一道不平坦的裂纹。3秒后裂纹塌陷，范围内的单位将被减速，并受到基于他们自身生命最大值的伤害。其中一半伤害为魔法伤害，另一半为物理伤害。",
                lore: "巨神创造之世，他亲手将其撕裂。",
                icon: "elder_titan_earth_splitter.png",
            },
        ],
        talents: [
            {
                level: 10,
                desc: "+25 攻击速度",
            },
            {
                level: 10,
                desc: "+2.5% 灵体游魂触碰英雄移速",
            },
            {
                level: 15,
                desc: "+25 灵体游魂触碰英雄攻击力",
            },
            {
                level: 15,
                desc: "+75 回音重踏伤害",
            },
            {
                level: 20,
                desc: "+150 自然秩序范围",
            },
            {
                level: 20,
                desc: "+350 回音重踏唤醒伤害",
            },
            {
                level: 25,
                desc: "+100% 分裂",
            },
            {
                level: 25,
                desc: "-60秒 裂地沟壑冷却%",
            },
        ],
        facets: [
            {
                name: "解构",
                desc: "自然秩序会持续降低魔法抗性和护甲。",
                icon: "armor_broken.png",
                ability: [
                    {
                        name: "自然秩序",
                        desc: "敌方英雄在自然秩序效果下每停留1秒，他们的护甲就会降低0.8点，魔法抗性降低0.8%。叠加效果最多可叠加20次。",
                        icon: "elder_titan_natural_order.png",
                    }
                ]
            },
            {
                name: "动量",
                desc: "上古巨神的基础攻击速度减少，但是移动速度也会提供攻击速度。",
                icon: "damage.png",
            },
        ],
    },
    {
        code: "",
        name: "",
        nickname: "",
        stat: "",
        attackType: "",
        line: "",
        description: "",
        defaultAbility: {
            name: "",
            desc: "",
        },
        ability: [
            {
                name: "",
                desc: "",
                lore: "",
                icon: ".png",
                //
                is_shard: false,
                is_scepter: false,
                shard_descs: [],
                scepter_descs: [],
            },
        ],
        talents: [
            {
                level: 10,
                desc: "",
            },
            {
                level: 10,
                desc: "",
            },
            {
                level: 15,
                desc: "",
            },
            {
                level: 15,
                desc: "",
            },
            {
                level: 20,
                desc: "",
            },
            {
                level: 20,
                desc: "",
            },
            {
                level: 25,
                desc: "",
            },
            {
                level: 25,
                desc: "",
            },
        ],
        facets: [
            {
                name: "",
                desc: "",
                icon: "",
                ability: [],
            },
            {
                name: "",
                desc: "",
                icon: "",
                ability: [],
            },
        ]
    },
];
