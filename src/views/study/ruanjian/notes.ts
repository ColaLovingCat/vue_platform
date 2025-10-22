export const list = [
  {
    id: "section-010102",
    type: "topic",
    title: "上午题-CPU",
    category: "single-select",
    question:
      "在CPU中，常用来为 ALU 执行算术逻辑运算提供数据并暂存运算结果的寄存器是___。",
    imgs: [],
    options: [
      {
        answer: "D",
        col: 4,
        list: ["程序计数器", "状态寄存器", "通用寄存器", "累加寄存器"],
        fillAnswer: "",
        note: "累加寄存器 AC 是与 ALU 配合最紧密的寄存器",
      },
    ],
  },
  {
    id: "section-010103",
    type: "topic",
    title: "上午题-CPU",
    category: "single-select",
    question: "在CPU中，___不仅要保证指令的正确执行，还要能够处理异常事件。",
    imgs: [],
    options: [
      {
        answer: "B",
        col: 4,
        list: ["运算器", "控制器", "寄存器组", "内部总线"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010103",
    type: "topic",
    title: "上午题-CPU",
    category: "single-select",
    question: "在CPU中，用于跟踪指令地址的寄存器是___。",
    imgs: [],
    options: [
      {
        answer: "C",
        col: 4,
        list: [
          "地址寄存器 AR",
          "数据寄存器 DR",
          "程序计数器 PC",
          "指令寄存器 IR",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010201",
    type: "topic",
    title: "上午题-进制",
    category: "single-select",
    question: "内存按字节B编址从B3000H到DABFFH的区域，其存储容量为___。",
    imgs: [],
    options: [
      {
        answer: "B",
        col: 4,
        list: ["123KB", "159KB", "163KB", "194KB"],
        fillAnswer: "",
        note: "H表示16进制，(DABFF+1)-B3000=27C00/1024=159KB，注意单位是B还是b",
      },
    ],
  },
  {
    id: "section-010201",
    type: "topic",
    title: "上午题-进制",
    category: "single-select",
    question:
      "地址编号从80000H到BFFFFH且按字节编址的内存容量为___。若用16K*4bit的存储器芯片构成该内存，共需___片。",
    imgs: [],
    options: [
      {
        answer: "B",
        col: 4,
        list: ["128", "256", "512", "1024"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "C",
        col: 4,
        list: ["8", "16", "32", "64"],
        fillAnswer: "",
        note: "注意16K*4bit=8KB",
      },
    ],
  },
  {
    id: "section-010202",
    type: "topic",
    title: "上午题-数据表示",
    category: "single-select",
    question: "若某整数的16位补码为FFFFH，则该数的十进制为___。",
    imgs: [],
    options: [
      {
        answer: "B",
        col: 4,
        list: ["0", "-1", "2^16-1", "-2^16+1"],
        fillAnswer: "",
        note: "首先是16转2为 F=>1111，然后根据负数则先求反码 1 111 1111 1111 1110 再求原码 1 000 0000 0000 0001",
      },
    ],
  },
  {
    id: "section-010202",
    type: "topic",
    title: "上午题-数据表示",
    category: "single-select",
    question: "采用n位补码（包含一个符号位）表示数据，则___。",
    imgs: [],
    options: [
      {
        answer: "D",
        col: 2,
        list: ["表示 2^n", "表示 -2^n", "表示 2^(n-1)", "表示 -2^(n-1)"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010203",
    type: "topic",
    title: "上午题-浮点数",
    category: "single-select",
    question:
      "某机器的浮点数中，阶码以补码表示，尾数以原码表示。则1 0001 0 0000000001表示的浮点数是___。",
    imgs: [],
    options: [
      {
        answer: "B",
        col: 2,
        list: [
          "2^-16*2^-10",
          "2^-15*2^-10",
          "2^-16*(1-2^-10)",
          "2^-15*(1-2^-10)",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010605",
    type: "topic",
    title: "上午题-寻址",
    category: "single-select",
    question:
      "若CPU要执行指令为：MOV R1，#45（即将数值45传送到寄存器R1中），则该指令中采用的寻址方式为___。",
    imgs: [],
    options: [
      {
        answer: "B",
        col: 2,
        list: [
          "直接寻址和立即寻址",
          "寄存器寻址和立即寻址",
          "相对寻址和直接寻址",
          "寄存器间接寻址和直接寻址",
        ],
        fillAnswer: "",
        note: "关键词：寄存器存数值",
      },
    ],
  },
  {
    id: "section-010303",
    type: "topic",
    title: "上午题-海明码",
    category: "single-select",
    question:
      "海明码利用奇偶性检错和纠错，通过在n个数据位之间插入k个校验位，扩大数据编码的码距。若n=48，则k应至少为___。",
    imgs: [],
    options: [
      {
        answer: "C",
        col: 4,
        list: ["4", "5", "6", "7"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010304",
    type: "topic",
    title: "上午题-CRC",
    category: "single-select",
    question: "在___校验方法中，采用模2运算来构造校验位。",
    imgs: [],
    options: [
      {
        answer: "D",
        col: 1,
        list: ["水平奇偶", "垂直奇偶", "海明码", "循环冗余"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010602",
    type: "topic",
    title: "上午题-指令集架构",
    category: "single-select",
    question: "___不是RISC的特点。",
    imgs: [],
    options: [
      {
        answer: "A",
        col: 1,
        list: [
          "指令种类丰富",
          "高效的流水线操作",
          "寻址方式较少",
          "硬布线控制",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010602",
    type: "topic",
    title: "上午题-指令集架构",
    category: "single-select",
    question: "以下关于RISC和CISC计算机的叙述中，正确的是___。",
    imgs: [],
    options: [
      {
        answer: "D",
        col: 1,
        list: [
          "RISC不采用流水线技术，CISC采用流水线技术",
          "RISC使用复杂的指令，CISC使用简单的指令",
          "RISC采用很少的通用寄存器，CISC采用很多的通用寄存器",
          "RISC采用组合逻辑控制器，CISC普遍采用微程序控制器",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010603",
    type: "topic",
    title: "上午题-流水线",
    category: "single-select",
    question:
      "一条指令的执行过程可分解为取值时间=3Δt、分析时间=2Δt、执行时间=4Δt。若按串行方式执行，则10条指令全部执行完需要___Δt。若按照流水线方式执行，则执行完10条指令需要___Δt。",
    imgs: [],
    options: [
      {
        answer: "C",
        col: 4,
        list: ["40", "70", "90", "100"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "D",
        col: 4,
        list: ["20", "30", "40", "45"],
        fillAnswer: "",
        note: "最大节拍为 4Δt，所以时间为 4*(10-1)+(3+2+4)=45Δt",
      },
    ],
  },
  {
    id: "section-010401",
    type: "topic",
    title: "上午题-存储器",
    category: "single-select",
    question: "计算机系统的主存主要是由___构成的。",
    imgs: [],
    options: [
      {
        answer: "A",
        col: 1,
        list: ["DRAM", "SRAM", "Cache", "EEPROM"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010402",
    type: "topic",
    title: "上午题-Cache",
    category: "single-select",
    question: "Cache的地址映像方式中，发生冲突次数最小的是___。",
    imgs: [],
    options: [
      {
        answer: "A",
        col: 1,
        list: ["全相联映像", "组相联映像", "直接映像", "无法确定"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010402",
    type: "topic",
    title: "上午题-Cache",
    category: "single-select",
    question: "在程序的执行过程中，Cache与主存的地址映像由___。",
    imgs: [],
    options: [
      {
        answer: "A",
        col: 1,
        list: [
          "专门的硬件自动完成",
          "程序员进行调度",
          "操作系统进行管理",
          "程序员和操作系统共同协调完成",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010501",
    type: "topic",
    title: "上午题-I/O",
    category: "single-select",
    question: "以下关于中断方式与DMA方式的叙述中，正确的是___。",
    imgs: [],
    options: [
      {
        answer: "A",
        col: 1,
        list: [
          "中断方式与DMA方式都可以实现外设与CPU之间的并行工作",
          "程序中断方式和DMA方式在数据传输过程中都不需要CPU的干预",
          "采用DMA方式传输数据的速度比程序中断方式的速度慢",
          "程序中断方式和DMA方式都不需要CPU保护现场",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010701",
    type: "topic",
    title: "上午题-总线",
    category: "single-select",
    question: "总线复用方式可以___。",
    imgs: [],
    options: [
      {
        answer: "C",
        col: 1,
        list: [
          "提高总线的传输带宽",
          "增加总线的功能",
          "减少总线中信号线的总量",
          "提高CPU利用率",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010701",
    type: "topic",
    title: "上午题-总线",
    category: "single-select",
    question:
      "总线带宽为32bit，时钟频率为2000MHz，若总线上每5个时钟周期传送一个32bit的字，则该总线的带宽为___MB/s。",
    imgs: [],
    options: [
      {
        answer: "C",
        col: 1,
        list: ["40", "80", "160", "200"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010801",
    type: "topic",
    title: "上午题-加密和认证",
    category: "single-select",
    question: "公钥体系中，私钥用于___，公钥用于___。",
    imgs: [],
    options: [
      {
        answer: "A",
        col: 1,
        list: ["解密和签名", "加密和签名", "解密和认证", "加密和认证"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "D",
        col: 1,
        list: ["解密和签名", "加密和签名", "解密和认证", "加密和认证"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010801",
    type: "topic",
    title: "上午题-加密算法",
    category: "single-select",
    question: "下列算法中，不属于公开密钥加密算法的是___。",
    imgs: [],
    options: [
      {
        answer: "D",
        col: 1,
        list: ["ECC", "DSA", "RSA", "DES"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-010801",
    type: "topic",
    title: "上午题-加密算法",
    category: "single-select",
    question: "AES是一种___算法。",
    imgs: [],
    options: [
      {
        answer: "C",
        col: 4,
        list: ["公钥加密", "流密码", "分组加密", "信息摘要"],
        fillAnswer: "",
        note: "AES 是对称加密，分组加密，明文被分成固定大小的 块。流密码 是逐位或逐字节加密；公钥加密 是非对称加密，比如 RSA",
      },
    ],
  },
  {
    id: "section-010802",
    type: "topic",
    title: "上午题-可靠性",
    category: "single-select",
    question:
      "某系统由下图所示的部件构成，每个部件的千小时可靠度都为R，则该系统的千小时可靠度为___。",
    imgs: ["/docs/study/imgs/10-jiami.png"],
    options: [
      {
        answer: "C",
        col: 1,
        list: [
          "3R/2+2R/3",
          "R/3+R/2",
          "(1-(1-R)^3)(1-(1-R)^2)",
          "(1-(1-R)^3-(1-R)^2)",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090204",
    type: "topic",
    title: "上午题-前驱图",
    category: "single-select",
    question:
      "进程P1、P2、P3、P4、P5的前驱图如下。若用PV操作控制进程并发执行，则需要设置6个信号量S1~S6，且信号量初始值均为0。下图中a和b分别填写___；c和d分别填写___；e和f分别填写___。",
    imgs: ["/docs/study/imgs/100-ti.png"],
    options: [
      {
        answer: "C",
        col: 2,
        list: [
          "P(S1) P(S2)和P(S3) P(S4)",
          "P(S1) P(S2)和P(S2) P(S1)",
          "V(S1) V(S2)和V(S3) V(S4)",
          "P(S1) P(S2)和V(S1) V(S2)",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "B",
        col: 2,
        list: [
          "P(S1) P(S2)和V(S3) V(S4)",
          "P(S1) P(S3)和V(S5) V(S6)",
          "V(S1) V(S2)和P(S3) P(S4)",
          "P(S1) V(S3)和P(S2) V(S4)",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "C",
        col: 2,
        list: [
          "P(S3) P(S4)和V(S5) V(S6)",
          "V(S5) V(S6)和P(S5) P(S6)",
          "P(S2) P(S5)和P(S4) P(S6)",
          "P(S4) V(S5)和P(S5) V(S6)",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090204",
    type: "topic",
    title: "上午题-信号量",
    category: "single-select",
    question:
      "某系统有3个相同资源，信号量S=3,有5个进程并发执行。某一时刻S=-2，则___。",
    imgs: [],
    options: [
      {
        answer: "B",
        col: 1,
        list: [
          "系统有2个资源正在被占用",
          "系统有2个进程正在等待资源",
          "系统有 2 个进程在使用资源",
          "系统所有资源空闲",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090204",
    type: "topic",
    title: "上午题-信号量",
    category: "single-select",
    question:
      "假设系统采用PV操作实现进程同步与互斥，若n个进程共享两台打印机，那么信号量S的取值范围为___。",
    imgs: [],
    options: [
      {
        answer: "D",
        col: 1,
        list: ["-2~n", "-(n-1)~1", "-(n-1)~2", "-(n-2)~2"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090205",
    type: "topic",
    title: "上午题-生产者消费者",
    category: "single-select",
    question:
      "某企业生产流水线M共有两个生产者，生产者甲不断地将其工序上加工的半成品放入半成品箱，生产者乙从半成品箱取出继续加工。假设半成品箱可存放n件半成品，采用PV操作实现生产者甲和生产者乙的同步可设置三个信号量S、S1、S2，其同步模型如下图。信号量S是一个互斥信号量，初始值为___；S1、S2的初始值分别为___。",
    imgs: ["/docs/study/imgs/101-ti.png"],
    options: [
      {
        answer: "B",
        col: 1,
        list: ["0", "1", "n", "任意正整数"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "A",
        col: 1,
        list: ["n、0", "0、n", "1、n", "n、1"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090207",
    type: "topic",
    title: "上午题-进程资源图",
    category: "single-select",
    question: "进程资源图如图所示，其中图a中___，图b中___。",
    imgs: ["/docs/study/imgs/102-ti.png"],
    options: [
      {
        answer: "B",
        col: 1,
        list: [
          "P1是非阻塞节点，P2是阻塞节点，所以该图不可以化简，是死锁的",
          "P1、P2都是阻塞节点，所以该图不可以化简，是死锁的",
          "P1、P2都是非阻塞节点，所以该图可以化简，是非死锁的",
          "P1是阻塞节点，P2是非阻塞节点，所以该图不可以化简，是死锁的",
        ],
        fillAnswer: "",
        note: "先分配，后申请",
      },
      {
        answer: "C",
        col: 1,
        list: [
          "P1、P2、P3都是非阻塞节点，所以该图可以化简，是非死锁的",
          "P1、P2、P3都是阻塞节点，所以该图不可以化简，是死锁的",
          "P2是阻塞节点，P1、P3是非阻塞节点，所以该图可以化简，是非死锁的",
          "P1、P2是非阻塞节点，P3是阻塞节点，所以该图不可以化简，是死锁的",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090204",
    type: "topic",
    title: "上午题-PV操作",
    category: "single-select",
    question:
      "进程的前驱图如下图所示。若用PV操作控制进程的并发执行过程，需要5个信号量 S1~S5，且信号量的初始值都等于0。如下的进程执行图中a和b分别填写___；c和d分别填写___；e和f分别填写___。",
    imgs: ["/docs/study/imgs/103-ti.png", "/docs/study/imgs/104-ti.png"],
    options: [
      {
        answer: "B",
        col: 2,
        list: [
          "V(S1)和P(S2) V(S3)",
          "P(S1)和V(S2) V(S3)",
          "V(S1)和V(S2) V(S3)",
          "P(S1)和P(S2) V(S3)",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "C",
        col: 2,
        list: ["P(S2)和P(S4)", "V(S2)和P(S4)", "P(S2)和V(S4)", "V(S2)和V(S4)"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "A",
        col: 2,
        list: ["P(S4)和V(S5)", "V(S5)和P(S4)", "V(S4)和P(S5)", "V(S4)和V(S5)"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090201",
    type: "topic",
    title: "上午题-三态模型",
    category: "single-select",
    question:
      "在单处理机系统中，采用先来先服务调度算法。系统中由4个进程P1、P2、P3、P4(假设进程按此顺序到达)，其中P1为运行状态，P2为就绪状态，P3和P4为等待状态，且P3等待打印机，P4等待扫描仪。若P1___，则P1、P2、P3、P4的状态应分别为___。",
    imgs: [],
    options: [
      {
        answer: "A",
        col: 1,
        list: ["时间片到", "释放了扫描仪", "释放了打印机", "已完成"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "C",
        col: 1,
        list: [
          "等待、就绪、等待和等待",
          "运行、就绪、运行和等待",
          "就绪、运行、等待和等待",
          "就绪、就绪、等待和运行",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090201",
    type: "topic",
    title: "上午题-三态模型",
    category: "single-select",
    question:
      "在单处理机系统中有一台打印机、一台扫描仪，采用先来先服务调度算法。系统中由4个进程P1、P2、P3、P4，其中P1为运行状态，P2为就绪状态，P3和P4为等待状态，且P3等待打印机，P4等待扫描仪。若P1释放了扫描仪，则P1、P2、P3、P4的状态应分别为___。",
    imgs: [],
    options: [
      {
        answer: "B",
        col: 1,
        list: [
          "等待、运行、等待和就绪",
          "运行、就绪、等待和就绪",
          "就绪、就绪、等待和运行",
          "就绪、运行、等待和就绪",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090206",
    type: "topic",
    title: "上午题-死锁",
    category: "single-select",
    question:
      "系统中有R类资源m个，现有n个进程互斥使用。若每个进程对R资源的最大需求为w，那么m、n、w分别去下表中的值时，对于表中的情况，___可能会发生死锁。若将这些情况的m分别加上___，则系统不会发生死锁。",
    imgs: ["/docs/study/imgs/105-ti.png"],
    options: [
      {
        answer: "C",
        col: 1,
        list: ["①②⑤", "③④⑤", "②④⑤", "②④⑥"],
        fillAnswer: "",
        note: "m≥n*(w-1)+1",
      },
      {
        answer: "D",
        col: 1,
        list: ["1、1和1", "1、1和2", "1、1和3", "1、2和1"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090207",
    type: "topic",
    title: "上午题-进程资源图",
    category: "single-select",
    question:
      "假设系统中有三个进程P1、P2和P3，两种资源R1、R2.如果进程资源图如下图所示，那么___。",
    imgs: ["/docs/study/imgs/106-ti.png"],
    options: [
      {
        answer: "C",
        col: 1,
        list: [
          "图1和图2都可化简",
          "图1和图2都不可化简",
          "图1可化简，图2不可化简",
          "图1不可化简，图2可化简",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090206",
    type: "topic",
    title: "上午题-死锁",
    category: "single-select",
    question:
      "假设系统中有三类互斥资源R1、R2、R3，可用资源数分别为10、5、3。在T0时刻系统中有P1、P2、P3、P4和P5五个进程，这些进程对资源的最大需求量和已分配资源数如下表所示，此时系统剩余的可用资源数分别为___。如果进程按___序列执行，那么系统状态是安全的。",
    imgs: ["/docs/study/imgs/107-ti.png"],
    options: [
      {
        answer: "D",
        col: 1,
        list: ["1、1和0", "1、1和1", "2、1和0", "2、0和1"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "B",
        col: 1,
        list: [
          "P1>P2>P4>P5>P3",
          "P5>P2>P4>P3>P1",
          "P4>P2>P1>P5>P3",
          "P5>P1>P4>P2>P3",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090201",
    type: "topic",
    title: "上午题-线程",
    category: "single-select",
    question:
      "在支持多线程的操作系统中，假设进程P创建了若干个线程，那么___是不能被这些线程共享的。",
    imgs: [],
    options: [
      {
        answer: "C",
        col: 2,
        list: [
          "该进程中打开的文件",
          "该进程的代码段",
          "该进程中某线程的栈指针",
          "该进程的全局变量",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090302",
    type: "topic",
    title: "上午题-局部性原理",
    category: "single-select",
    question:
      "某进程有4个页面，页号为0-3，页面变换表及状态位、访问位和修改位的含义如下图所示。若系统给该进程分配了3个存储块，当访问的页面1不在内存时，淘汰表中页号为___的页面代价最小。",
    imgs: ["/docs/study/imgs/108-ti.png"],
    options: [
      {
        answer: "D",
        col: 4,
        list: ["0", "1", "2", "3"],
        fillAnswer: "",
        note: "在内存 > 未访问 > 未修改",
      },
    ],
  },
  {
    id: "section-090301",
    type: "topic",
    title: "上午题-页式存储",
    category: "single-select",
    question:
      "某进程有5个页面，页号为0-4，页面变换表如下图所示。如系统给该进程分配了3个存储块，当访问的页面3不在内存时，应该淘汰表中页号为___的页面。假定页面大小为4KB，逻辑地址为十六进制2C25H，该地址经过变换后，其物理地址应为十六进制___。",
    imgs: ["/docs/study/imgs/109-ti.png"],
    options: [
      {
        answer: "A",
        col: 1,
        list: ["0", "1", "2", "4"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "C",
        col: 1,
        list: ["2C25H", "4096H", "4C25H", "8C25H"],
        fillAnswer: "",
        note: "2 C25 H 为页号2，对应页帧号4，所以答案为 4 C25 H",
      },
    ],
  },
  {
    id: "section-090301",
    type: "topic",
    title: "上午题-页式存储",
    category: "single-select",
    question:
      "某操作系统采用分页存储管理方式，下图给出了进程A和进程B的页表结构。如果物理页的大小为1KB，那么进程A中逻辑地址为1024（十进制）用变量存放在___号物理内存页中。假设进程A的逻辑页4与进程B的逻辑页5要共享物理页4，那么应该在进程A页表的逻辑页4和进程B页表的逻辑页5对应的物理页处分别填___。",
    imgs: ["/docs/study/imgs/110-ti.png"],
    options: [
      {
        answer: "B",
        col: 1,
        list: ["8", "3", "5", "2"],
        fillAnswer: "",
        note: "物理页大小为1KB即1024，二进制为 100 0000 0000，则页号1对应的物理页为3",
      },
      {
        answer: "A",
        col: 1,
        list: ["4、4", "4、5", "5、4", "5、5"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090304",
    type: "topic",
    title: "上午题-段页式存储",
    category: "single-select",
    question: "假设段页式存储管理系统中的地址结构如下图所示，则系统中___。",
    imgs: ["/docs/study/imgs/111-ti.png"],
    options: [
      {
        answer: "B",
        col: 1,
        list: [
          "页的大小为4K，每个段的大小均为4096个页，最多可有256个段",
          "页的大小为4K，每个段最大允许有4096个页，最多可有256个段",
          "页的大小为8K，每个段的大小均为2048个页，最多可有128个段",
          "页的大小为8K，每个段最大允许有2048个页，最多可有128个段",
        ],
        fillAnswer: "",
        note: "页内地址12位，页号12位，段号8位",
      },
    ],
  },
  {
    id: "section-090403",
    type: "topic",
    title: "上午题-缓冲区",
    category: "single-select",
    question:
      "假设磁盘块与缓冲区大小相同，每个盘块读入缓冲区的时间为10μs，由缓冲区送至用户区的时间是5μs，系统对每个磁盘块数据的处理时间为2μs。若用户需要将大小为10个磁盘块的Doc1文件逐块从磁盘读入缓冲区，并送至用户区进行处理，那么采用单缓冲区需要花费的时间为___μs；采用双缓冲区需要花费的时间为___μs。",
    imgs: [],
    options: [
      {
        answer: "C",
        col: 1,
        list: ["100", "107", "152", "170"],
        fillAnswer: "",
        note: "(10+5)*(10-1)+(10+5+2)=152",
      },
      {
        answer: "B",
        col: 1,
        list: ["100", "107", "152", "170"],
        fillAnswer: "",
        note: "10*(10-1)+(10+5+2)=107",
      },
    ],
  },
  {
    id: "section-090405",
    type: "topic",
    title: "上午题-磁盘调度算法",
    category: "single-select",
    question:
      "假设磁盘每磁道有18个扇区，系统刚完成了10号柱面的操作，当前移动臂在13号柱面上，进程的请求序列如下表所示。若系统采用SCAN（扫描）调度算法，则系统响应序列为___；若系统采用CSCAN（单向扫描）调度算法，则系统响应序列为___。",
    imgs: ["/docs/study/imgs/112-ti.png"],
    options: [
      {
        answer: "A",
        col: 1,
        list: ["⑦⑩①②④③⑨⑧⑤⑥", "①⑦⑩②③④⑥⑤⑧⑨", "⑦⑩①②④③⑥⑤⑧⑨", "①⑦⑩②③④⑧⑨⑥⑤"],
        fillAnswer: "",
        note: "只看柱面号",
      },
      {
        answer: "C",
        col: 1,
        list: ["⑦⑩①②④③⑨⑧⑤⑥", "①⑦⑩②③④⑥⑤⑧⑨", "⑦⑩①②④③⑥⑤⑧⑨", "①⑦⑩②③④⑧⑨⑥⑤"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090405",
    type: "topic",
    title: "上午题-磁盘调度算法",
    category: "single-select",
    question:
      "假设磁盘臂位于15号柱面上，进程的请求序列如下表表示，如果采用最短移臂调度算法，那么系统的响应序列应为___。",
    imgs: ["/docs/study/imgs/114-ti.png"],
    options: [
      {
        answer: "B",
        col: 1,
        list: ["①②③④⑤⑥", "⑤①②④③⑥", "②③④⑤①⑥", "④②③⑤①⑥"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-090406",
    type: "topic",
    title: "上午题-旋转调度算法",
    category: "single-select",
    question:
      "假设某磁盘的每个磁道划分成9个物理块，每块存放1个逻辑记录。逻辑记录R0,R1...R8存放在同一个磁道上，记录的安排顺序如下表所示；如果磁盘的旋转速度为27ms/周，磁头当前处在R0的开始处。若系统顺序处理这些记录，使用单缓冲区，每个记录处理时间为3ms，则处理这9个记录的最长时间为___ms；若对信息存储进行优化分布后，处理9个记录的最少时间为___ms。",
    imgs: ["/docs/study/imgs/116-ti.png"],
    options: [
      {
        answer: "D",
        col: 4,
        list: ["54", "108", "222", "246"],
        fillAnswer: "",
        note: "旋转一个扇区需要3ms，所以前8个物理块的时间为 (3ms+9*3ms)*8=240ms,最后一个时间为 3ms+3ms=6ms，所以总时间为246ms",
      },
      {
        answer: "B",
        col: 4,
        list: ["27", "54", "108", "216"],
        fillAnswer: "",
        note: "(读取+处理)*数量",
      },
    ],
  },
  {
    id: "section-090501",
    type: "topic",
    title: "上午题-间接地址索引",
    category: "single-select",
    question:
      "某文件系统采用多级索引结构，若磁盘的大小为512B，每个块号需占3B，那么根索引采用一级索引时的文件最大长度为___KB；采用二级索引时的最大长度为___KB。",
    imgs: [],
    options: [
      {
        answer: "A",
        col: 4,
        list: ["85", "170", "512", "1024"],
        fillAnswer: "",
        note: "首先一共有 512B/3B=170个 磁盘索引块，每一个索引块指向512B的数据块，总共有 170*512B=85KB",
      },
      {
        answer: "C",
        col: 4,
        list: ["512", "1024", "14450", "28900"],
        fillAnswer: "",
        note: "首先一共有 512B/3B=170个 磁盘索引块，继续指向 170个 一级索引块，再指向512B的数据块，总共有170*170*512B=14450KB",
      },
    ],
  },
  {
    id: "section-090501",
    type: "topic",
    title: "上午题-间接地址索引",
    category: "single-select",
    question:
      "设文件索引节点中有8个地址项，每个地址项的大小为4字节，其中5个地址项为直接地址索引，2个地址项为一级间接地址索引，1个地址项为二级间接地址索引，磁盘索引块和磁盘数据块的大小均为1KB。若要访问文件的逻辑块号分别为5和518，则系统应分别采用___；而且可表示的单个文件最大长度是___KB。",
    imgs: [],
    options: [
      {
        answer: "C",
        col: 2,
        list: [
          "直接地址索引和一级间接地址索引",
          "直接地址索引和二级间接地址索引",
          "一级间接地址索引和二级间接地址索引",
          "一级间接地址索引和一级间接地址索引",
        ],
        fillAnswer: "",
        note: "每个索引块可存放的指针数为 1024/4 = 256个，块号 0 - 4 为直接索引，5 - 516(4+256*2) 为一级间接地址索引，517 - 66052(516+256*256) 为二级间接地址索引",
      },
      {
        answer: "D",
        col: 4,
        list: ["517", "1029", "16513", "66053"],
        fillAnswer: "",
        note: "可表示的数据块总数为 66053块",
      },
    ],
  },
  {
    id: "section-090502",
    type: "topic",
    title: "上午题-文件目录",
    category: "single-select",
    question:
      "若某文件系统的目录结构如下图所示，假设用户要访问f1.java，且当前工作目录为Program，则该文件的全文件名为___，其相对路径为___。",
    imgs: ["/docs/study/imgs/119-ti.png"],
    options: [
      {
        answer: "C",
        col: 2,
        list: [
          "f1.java",
          "\\Document\\Java-prog\\f1.java",
          "D:\\Document\\Java-prog\\f1.java",
          "\\Program\\Java-prog\\f1.java",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "A",
        col: 2,
        list: [
          "Java-prog\\",
          "\\Java-prog\\",
          "Program\\Java-prog",
          "\\Program\\Java-prog\\",
        ],
        fillAnswer: "",
        note: "'Program\\Java-prog\\'和'Java-prog\\'都可",
      },
    ],
  },
  {
    id: "section-090503",
    type: "topic",
    title: "上午题-位示图",
    category: "single-select",
    question:
      `某文件管理系统在磁盘上建立了位示图，记录磁盘的使用情况。
      <p>若系统的字长为32位，磁盘上的物理块依次编号为0、1、2、...，那么4096块物理块的使用情况在位示图中的第___个字中描述；</p>
      <p>若磁盘的容量为200GB，物理块的大小为1MB，那么位示图的大小为___个字。</p>
      `,
    imgs: [],
    options: [
      {
        answer: "A",
        col: 4,
        list: ["129", "257", "513", "1025"],
        fillAnswer: "",
        note: "没有特殊说明，则字号从1开始。则字号为n时，块号开始为 32*(n-1)，结束为 32*n-1。所以129块的开始为4096。",
      },
      {
        answer: "D",
        col: 4,
        list: ["600", "1200", "3200", "6400"],
        fillAnswer: "",
        note: "总共有200GB/1MB=204800个块，则最大块号为204799，恰好为 6400字 的结束，即32*6400-1=204799",
      },
    ],
  },
  {
    id: "section-050103",
    type: "topic",
    title: "上午题-三级模式",
    category: "single-select",
    question:
      "数据库系统通常采用三级模式：外模式、模式和内模式。这三级模式分别对应数据库的___。",
    imgs: [],
    options: [
      {
        answer: "B",
        col: 1,
        list: [
          "基本表、存储文件和视图",
          "视图、基本表和存储文件",
          "基本表、视图和存储文件",
          "视图、存储文件和基本表",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050103",
    type: "topic",
    title: "上午题-两级映像",
    category: "single-select",
    question: "数据的物理独立性和逻辑独立性分别对应通过修改___来完成。",
    imgs: [],
    options: [
      {
        answer: "D",
        col: 1,
        list: [
          "外模式与内模式之间的映像、模式与内模式之间的映像",
          "外模式与内模式之间的映像、外模式与模式之间的映像",
          "外模式与模式之间的映像、模式与内模式之间的映像",
          "模式与内模式之间的映像、外模式与模式之间的映像",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050203",
    type: "topic",
    title: "上午题-关系代数",
    category: "single-select",
    question:
      "关系R，S如下图所示，关系代数表达式<span class='txt-func'>𝜋<span class='txt-sub'>3,4,5</span>(𝜎<span class='txt-sub'>1<6</span>(RXS))</span>=___；对关系R，S进行自然连接后的属性列数和元组个数分别为___。",
    imgs: ["/docs/study/imgs/120-ti.png"],
    options: [
      {
        answer: "B",
        col: 2,
        list: [
          `
            <table>
                <thead>
                    <tr>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>3</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>
            `,
          `
            <table>
                <thead>
                    <tr>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>5</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>8</td>
                        <td>4</td>
                    </tr>
                </tbody>
            </table>
            `,
          `
            <table>
                <thead>
                    <tr>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>5</td>
                        <td>3</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>9</td>
                        <td>8</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>
            `,
          `
            <table>
                <thead>
                    <tr>
                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                    </tr>
                </tbody>
            </table>
            `,
        ],
        fillAnswer: "",
        note: "首先计算笛卡尔积，R.A R.B R.C S.A S.B S.C，然后选择 R.A < S.C 再投影 R.C S.A S.B 排个序",
      },
      {
        answer: "A",
        col: 4,
        list: ["3和0", "3和2", "6和0", "6和2"],
        fillAnswer: "",
        note: "都是公共属性列，没有相同元素",
      },
    ],
  },
  {
    id: "section-050203",
    type: "topic",
    title: "上午题-关系代数",
    category: "single-select",
    question:
      "关系R1和R2如图所示，若进行R1⨝R2运算，则结果集为___元关系，共有___个元组。",
    imgs: ["/docs/study/imgs/121-ti.png"],
    options: [
      {
        answer: "C",
        col: 4,
        list: ["4", "5", "6", "7"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "A",
        col: 4,
        list: ["4", "5", "6", "7"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050203",
    type: "topic",
    title: "上午题-关系代数",
    category: "single-select",
    question:
      "给定关系R(A,B,C,D)和关系S(A,C,E,F)，对其进行自然连接运算R⨝S后的属性列为___个；与<span class='txt-func'>𝜎<span class='txt-sub'>R.B>S.E</span>(R⨝S)</span>等价的关系代数表达式为___。",
    imgs: [],
    options: [
      {
        answer: "C",
        col: 4,
        list: ["4", "5", "6", "8"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "B",
        col: 2,
        list: [
          "<span class='txt-func'>𝜎<span class='txt-sub'>2>7</span>(RXS)</span>",
          "<span class='txt-func'>𝜋<span class='txt-sub'>1,2,3,4,7,8</span>(𝜎<span class='txt-sub'>1=5 ∧ 2>7 ∧ 3=6</span>(RXS))</span>",
          "<span class='txt-func'>𝜎<span class='txt-sub'>2>'7'</span>(RXS)</span>",
          "<span class='txt-func'>𝜋<span class='txt-sub'>1,2,3,4,7,8</span>(𝜎<span class='txt-sub'>1=5 ∧ 2>'7' ∧ 3=6</span>(RXS))</span>",
        ],
        fillAnswer: "",
        note: "无引号是列号，有引号是具体数值",
      },
    ],
  },
  {
    id: "section-050203",
    type: "topic",
    title: "上午题-关系代数",
    category: "single-select",
    question:
      "关系R，S如下表所示，R⨝S的结果集为___；R、S的左外联接、右外联接和完全外联接的元组个数分别为___。",
    imgs: ["/docs/study/imgs/122-ti.png"],
    options: [
      {
        answer: "B",
        col: 1,
        list: [
          "{(2,1,4), (3,4,4)}",
          "{(2,1,4,8), (3,4,4,4)}",
          "{(2,1,4,2,1,8), (3,4,4,3,4,4)}",
          "{(1,2,3,1,9,1), (2,1,4,2,1,8), (3,4,4,3,4,4), (4,6,7,4,8,3)}",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "D",
        col: 4,
        list: ["2,2,4", "2,2,6", "4,4,4", "4,4,6"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050203",
    type: "topic",
    title: "上午题-关系代数与SQL",
    category: "single-select",
    question:
      "若有关系R(A,B,C,D)和S(C,D,E)，则表达式 <span class='txt-func'>𝜋<span class='txt-sub'>3,4,7</span>𝜎<span class='txt-sub'>4<5</span>(RXS)</span> 等价的SQL语句为：SELECT ___ FROM ___ WHERE ___。",
    imgs: [],
    options: [
      {
        answer: "D",
        col: 2,
        list: ["A,B,C,D,E", "C,D,E", "R.A,R.B,R.C,R.D,S.E", "R.C,R.D,S.E"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "C",
        col: 4,
        list: ["R", "S", "R,S", "RS"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "B",
        col: 4,
        list: ["D&lt;C", "R.D&lt;S.C", "R.D&lt;R.C", "S.D&lt;R.C"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050203",
    type: "topic",
    title: "上午题-关系代数与SQL",
    category: "single-select",
    question:
      "若有关系R(A,B,C,D,E)和S(B,C,F,G)，则表达式 <span class='txt-func'>𝜋<span class='txt-sub'>2,4,6,7(</span>𝜎<span class='txt-sub'>2<7</span>(R⨝S))</span> 等价的SQL语句为：SELECT ___ FROM R,S WHERE ___。",
    imgs: [],
    options: [
      {
        answer: "A",
        col: 2,
        list: ["R.B,D,F,G", "R.B,E,S.C,F,G", "R.B,R.D,S.C,F", "R.B,R.C,S.C,F"],
        fillAnswer: "",
        note: "自然连接后 A,R.B,R.C,D,E,F,G",
      },
      {
        answer: "C",
        col: 2,
        list: [
          "R.B = S.B OR R.C=S.C OR R.B&lt;S.G",
          "R.B = S.B OR R.C=S.C OR R.B&lt;S.C",
          "R.B = S.B AND R.C=S.C AND R.B&lt;S.G",
          "R.B = S.B AND R.C=S.C AND R.B&lt;S.C",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050401",
    type: "topic",
    title: "上午题-SQL语句",
    category: "single-select",
    question: `某销售公司数据库的零件P (零件号，零件名称，供应商，供应商所在地，库存量) 关系如下表所示。
    其中同一种零件可由不同的供应商供应，一个供应商可以供应多种零件。
    <p>零件关系的主键为___。</p>
    <p>查询各种零件的平均单价，最高单价与极低单价之间差距的SQL语句为：</p>
    <p>SELECT 零件号,___ FROM P ___;</p>`,
    imgs: ["/docs/study/imgs/123-ti.png"],
    options: [
      {
        answer: "B",
        col: 4,
        list: [
          "零件号，零件名称",
          "零件号，供应商",
          "零件号，供应商所在地",
          "供应商，供应商所在地",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "A",
        col: 2,
        list: [
          "零件名称, AVG(单价), MAX(单价)- MIN(单价)",
          "供应商, AVG(单价), MAX(单价)- MIN(单价)",
          "零件名称, AVG 单价, MAX 单价 - MIN 单价 ",
          "供应商, AVG 单价, MAX 单价 - MIN 单价 ",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "D",
        col: 4,
        list: [
          "ORDER BY 供应商",
          "OREDER BY 零件号",
          "GROUP BY 供应商",
          "GROUP BY 零件号",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050401",
    type: "topic",
    title: "上午题-SQL语句",
    category: "single-select",
    question: `
假设学生 Students 和教师 Teachers 的关系模式如下所示:
Students (学号,姓名,性别,类别,身份证号)
Teachers (教师号,姓名,性别,身份证号,工资)
其中学生关系中的类别分为 "本科生" 和 "研究生" 两类。
<p>a.查询在读研究生的教师的平均工资、最高与最低工资之间的差值的 SQL 语句如下:</p>
<p>SELECT ___ FROM Students,Teachers WHERE ___;</p>
<p>b.查询既是女教师，又是研究生且工资大于等于3500元的身份证号和姓名的SQL语句如下：</p>
<p>(SELECT 身份证号,姓名 FROM Students WHERE ___) INTERSECT (SELECT 身份证号,姓名 FROM Teachers WHERE ___);</p>
`,
    imgs: [],
    options: [
      {
        answer: "A",
        col: 1,
        list: [
          "AVG(工资) AS 平均工资, MAX(工资) - MIN(工资) AS 差值",
          "平均工资 AS AVG(工资), 差值 AS MAX(工资) - MIN(工资)",
          "AVG(工资) ANY 平均工资, MAX(工资) - MIN(工资) ANY 差值",
          "平均工资 ANY AVG(工资), 差值 ANY MAX(工资) - MIN(工资)",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "C",
        col: 1,
        list: [
          "Students.身份证号=Teachers.身份证号",
          "Students.类别='研究生'",
          "Students.身份证号=Teachers.身份证号 AND Students.类别='研究生'",
          "Students.身份证号=Teachers.身份证号 OR Students.类别='研究生'",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "D",
        col: 2,
        list: [
          "工资>=3500",
          "工资>='3500'",
          "性别=女 AND 类别=研究生",
          "性别='女' AND 类别='研究生'",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "A",
        col: 2,
        list: [
          "工资>=3500",
          "工资>='3500'",
          "性别=女 AND 类别=研究生",
          "性别='女' AND 类别='研究生'",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050401",
    type: "topic",
    title: "上午题-SQL语句",
    category: "single-select",
    question: `将Students表的插入权限赋予用户UserA，并允许其将权限授予他人，应使用SQL语句为： GRANT ___ TABLE Students TO UserA ___;`,
    imgs: [],
    options: [
      {
        answer: "D",
        col: 4,
        list: ["UPDATE", "UPDATE ON", "INSERT", "INSERT ON"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "D",
        col: 2,
        list: ["FOR ALL", "PUBLIC", "WITH CHECK OPTION", "WITH GRANT OPTION"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050401",
    type: "topic",
    title: "上午题-SQL语句",
    category: "single-select",
    question: `
己知关系模式: 图书 (图书编号,图书类型,图书名称,作者,出版社,出版日期,ISBN) 图书编号唯一识别一本图书。建立 "计算机" 类图书的视图 Computer-BOOK, 并要求进行修改、插入操作时保证该视图只有计算机类的图书。实现上逑要求的 SQL 语句如下:
<p>CREATE ___ AS SELECT 图书编号,图书类型,图书名称,作者,出版社,出版日期 FROM 图书 WHERE 图书类型 = '计算机' ___;</p>
    `,
    imgs: [],
    options: [
      {
        answer: "B",
        col: 2,
        list: [
          "TABLE Computer-BOOK",
          "VIEW Computer-BOOK",
          "Computer-BOOK TABLE",
          "Computer-BOOK VIEW",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "C",
        col: 4,
        list: ["FOR ALL", "PUBLIC", "WITH CHECK OPTION", "WITH GRANT OPTION"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050301",
    type: "topic",
    title: "上午题-函数依赖",
    category: "single-select",
    question: `给定关系模式R<U, F>, U={A, B, C}, F={AB➔C, C➔B}。关系R___，且分别有___。`,
    imgs: [],
    options: [
      {
        answer: "D",
        col: 2,
        list: [
          "只有一个候选关键字AC",
          "只有一个候选关键字AB",
          "有2个候选关键字AC和BC",
          "有2个候选关键字AC和AB",
        ],
        fillAnswer: "",
        note: "A没有出现在函数依赖的右边，则A肯定在候选关键字中。AB➔ABC AC➔ABC",
      },
      {
        answer: "C",
        col: 2,
        list: [
          "1个非主属性和2个主属性",
          "2个非主属性和1个主属性",
          "0个非主属性和3个主属性",
          "3个非主属性和0个主属性",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050301",
    type: "topic",
    title: "上午题-函数依赖",
    category: "single-select",
    question: `给定关系模式R<U, F>, U={A, B, C, D}, F={A➔BC, AC➔D, B➔D}。则关系R___。`,
    imgs: [],
    options: [
      {
        answer: "C",
        col: 2,
        list: [
          "不存在传递依赖，候选关键字A",
          "不存在传递依赖，候选关键字AC",
          "存在传递依赖A➔D，候选关键字A",
          "存在传递依赖B➔D，候选关键字C",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050303",
    type: "topic",
    title: "上午题-范式",
    category: "single-select",
    question: `
设有关系模式R(课程,教师,学生,成绩,时间,教室)其中函数依赖集F如下:
<p>F={课程➔教师, (学生,课程)➔成绩, (时间,教室)➔课程, (时间,教师)➔教室, (时间,学生)➔教室}</p>
关系模式R的一个主键是___，R规范化程度最高达到___。若将关系模式R分解为3个关系模式 R1(课程,教师) R2(学生,课程,成绩) R3(学生,时间,教室,课程)
其中R2的规范化程度最高达到___。
    `,
    imgs: [],
    options: [
      {
        answer: "D",
        col: 4,
        list: ["(学生,课程)", "(时间,教室)", "(时间,教师)", "(时间,学生)"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "B",
        col: 4,
        list: ["1NF", "2NF", "3NF", "BCNF"],
        fillAnswer: "",
        note: "主键是 (时间,学生)，不存在时间或学生单独决定一个属性，符合2NF，但 (时间,学生)➔教室 (时间,教室)➔课程 为传递依赖，则不符合3NF",
      },
      {
        answer: "C",
        col: 4,
        list: ["2NF", "3NF", "BCNF", "4NF"],
        fillAnswer: "",
        note: "(学生,课程)➔成绩，符合3NF，且决定因素包含了候选码，符合BCNF，但不符合4NF",
      },
    ],
  },
  {
    id: "section-050303",
    type: "topic",
    title: "上午题-范式",
    category: "single-select",
    question: `有关系模式R(E,N,M,L,Q)，其函数依赖集为F={E➔N, EM➔Q, M➔L}。则关系模式R达到了___，该关系模式___。`,
    imgs: [],
    options: [
      {
        answer: "A",
        col: 4,
        list: ["1NF", "2NF", "3NF", "BCNF"],
        fillAnswer: "",
        note: "候选码为 EM，则E➔N和M➔L都是部分函数依赖，不符合2NF",
      },
      {
        answer: "D",
        col: 1,
        list: [
          "无需进行分解，因为达到了3NF",
          "无需进行分解，因为达到了BCNF",
          "尽管不存在部分函数依赖，但还存在传递依赖，所以需要进行分解",
          "需要进行分解，因为存在冗余、修改操作的不一致性、插入和删除异常",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050304",
    type: "topic",
    title: "上午题-模式分解",
    category: "single-select",
    question: `
假设员工关系 EMP(员工号,姓名,部门,部门电话,部门负责人,家庭住址,家庭成员,成员关系) 如下表所示。
如果一个部门可以有多名员工，一个员工可以有多个家庭成员。
那么关系 EMP 属于___，且___问题；为了解决这个问题，应该将员工关系EMP分解为___。`,
    imgs: ["/docs/study/imgs/124-ti.png"],
    options: [
      {
        answer: "A",
        col: 4,
        list: ["1NF", "2NF", "3NF", "BCNF"],
        fillAnswer: "",
        note: "候选码为 员工号,家庭成员",
      },
      {
        answer: "D",
        col: 2,
        list: [
          "无冗余、无插入异常和删除异常",
          "无冗余、但存在插入异常和删除异常",
          "存在冗余、但不存在修改操作不一致",
          "存在冗余、修改操作不一致，以及插入异常和删除异常",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "B",
        col: 1,
        list: [
          "<p>EMP1(员工号,姓名,家庭住址)</p><p>EMP2(部门,部门电话,部门负责人)</p><p>EMP3(员工号,家庭成员,成员关系)</p>",
          "<p>EMP1(员工号,姓名,部门,家庭住址)</p><p>EMP2(部门,部门电话,部门负责人)</p><p>EMP3(员工号,家庭成员,成员关系)</p>",
          "<p>EMP1(员工号,姓名,家庭住址)</p><p>EMP2(部门,部门电话,部门负责人,家庭成员,成员关系)</p>",
          "<p>EMP1(员工号,姓名,部门,部门电话,部门负责人,家庭住址)</p><p>EMP3(员工号,家庭住址,家庭成员,成员关系)</p>",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050304",
    type: "topic",
    title: "上午题-模式分解",
    category: "single-select",
    question: `给定关系模式R(U,F)，其中属性集U={A,B,C,D,E,G}，函数依赖集F={A➔B,A➔C,C➔D,AE➔G}。若将R分解为如下两个子模式___，则分解后的关系模式保持函数依赖。`,
    imgs: [],
    options: [
      {
        answer: "B",
        col: 2,
        list: [
          "R1(A,B,C) R2(D,E,G)",
          "R1(A,B,C,D) R2(A,E,G)",
          "R1(B,C,D) R2(A,E,G)",
          "R1(B,C,D,E) R2(A,E,G)",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050304",
    type: "topic",
    title: "上午题-模式分解",
    category: "single-select",
    question: `设关系模式R(U,F)，其中U={A,B,C,D,E}，F={A➔B,DE➔B,CB➔E,E➔A,B➔D}，则___为关系模式的候选关键字。分解___是无损连接，并保持函数依赖。`,
    imgs: [],
    options: [
      {
        answer: "D",
        col: 4,
        list: ["AB", "DE", "DB", "CE"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "D",
        col: 1,
        list: [
          "ρ={R1(AC), R2(ED), R3(B)}",
          "ρ={R1(AC), R2(E), R3(DB)}",
          "ρ={R1(AC), R2(ED), R3(AB)}",
          "ρ={R1(ABC), R2(ED), R3(ACE)}",
        ],
        fillAnswer: "",
        note: "进行自然连接为U，R1的F={A➔B,CB➔A(CB➔E➔A)}，R2的F={E➔D(E➔A➔B➔D)}，R3的F={E➔A}",
      },
    ],
  },
  {
    id: "section-050201",
    type: "topic",
    title: "上午题-数据库设计",
    category: "single-select",
    question: `
设有员工实体 Emp (员工号,姓名,性别,年龄,出生年月,联系方式,部门号),
其中 "联系方式" 要求记录该员工的手机号码和办公室电话。部门号要求参照另一部门实体 Dept 的主码 "部门号"。
实体中存在派生属性和多值属性___；对属性部门号应该进行___约束; 可以通过命令___修改表中的数据。`,
    imgs: [],
    options: [
      {
        answer: "B",
        col: 2,
        list: [
          "年龄和出生年月",
          "年龄和联系方式",
          "出生年月和联系方式",
          "出生年月和年龄",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "C",
        col: 4,
        list: ["非空主键", "主键", "外键", "候选键"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "C",
        col: 4,
        list: ["INSERT", "DELETE", "UPDATE", "MODIFY"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050201",
    type: "topic",
    title: "上午题-数据库设计",
    category: "single-select",
    question: `
某高校信息系统设计的分E-R图中。人力部门定义的职工实体具有属性:  职工号、姓名、性别利出生日期; 
教学部门定义的教师实体具有属性:  教师号、姓名和职称。
这种情况属于___。在合并 E-R 图时, ___解决这一冲突。`,
    imgs: [],
    options: [
      {
        answer: "C",
        col: 4,
        list: ["属性冲突", "命名冲突", "结构冲突", "实体冲突"],
        fillAnswer: "",
        note: "属性冲突是同一属性不同类型，命名冲突是异名同义，结构冲突是同一实体不同属性",
      },
      {
        answer: "B",
        col: 1,
        list: [
          "职工和教师实体保持各自属性不变",
          "职工实体中加入职称属性，删除教师实体",
          "教师也是学校的职工，故直接将教师实体删除",
          "将教师实体所有属性并入职工实体,删除教师实体",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050202",
    type: "topic",
    title: "上午题-E-R模型",
    category: "single-select",
    question: `
假设有学生S (学号,姓名,性别,入学时间,联系方式) 院系D (院系号,院系名称,电话号码,负责人)和课程C (课程号,课程名)三个实体。
若一名学生属于一个院系,一个院系有多名学生; 一名学生可以选择多门课程,一门课程可被多名学生选择,则图中(a)和(b)分别为___联系。
假设一对多联系不转换为一个独立的关系模式。那么生成的关系模式___。`,
    imgs: ["/docs/study/imgs/125-ti.png"],
    options: [
      {
        answer: "C",
        col: 4,
        list: ["1* 和 1*", "1* 和 *1", "1* 和 **", "*1 和 **"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "A",
        col: 2,
        list: [
          "S中应加入关系模式D的主键",
          "S中应加入关系模式C的主键",
          "D中应加入关系模式S的主键",
          "C中应加入关系模式S的主键",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050201",
    type: "topic",
    title: "上午题-设计过程",
    category: "single-select",
    question: `在数据库逻辑结构设计阶段需要___阶段形成的___作为设计依据。`,
    imgs: [],
    options: [
      {
        answer: "A",
        col: 4,
        list: ["需求分析", "概念结构设计", "物理结构设计", "数据库运行和维护"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "C",
        col: 1,
        list: [
          "程序文档、数据字典和数据流图",
          "需求说明文档、程序文档和数据流图",
          "需求说明文档、数据字典和数据流图",
          "需求说明文档、数据字典和程序文档",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050201",
    type: "topic",
    title: "上午题-设计过程",
    category: "single-select",
    question: `关系规范化在数据库设计的___阶段进行。`,
    imgs: [],
    options: [
      {
        answer: "C",
        col: 4,
        list: ["需求分析", "概念设计", "逻辑设计", "物理设计"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050501",
    type: "topic",
    title: "上午题-事务",
    category: "single-select",
    question: `"当多个事务并发执行时,任一事务的更新操作直到其成功提交的整个过程对其他事务都是不可见的"通常被称为事务的___。`,
    imgs: [],
    options: [
      {
        answer: "C",
        col: 4,
        list: ["原子性", "一致性", "隔离性", "持久性"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050501",
    type: "topic",
    title: "上午题-事务",
    category: "single-select",
    question: `为了保证数据库中数据的安全可靠和正确有效，系统在进行事务处理时,对数据的插入、删除或修改的全部有关内容先写入___；
当系统正常运行时,按一定的时间间隔,把数据库缓冲区内容写入___；
当发生故障时，根据现场数据内容及相关文件来恢复系统的状态。`,
    imgs: [],
    options: [
      {
        answer: "C",
        col: 4,
        list: ["索引文件", "数据文件", "日志文件", "数据字典"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "B",
        col: 4,
        list: ["索引文件", "数据文件", "日志文件", "数据字典"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050502",
    type: "topic",
    title: "上午题-并发控制",
    category: "single-select",
    question: `
    若事务T1对数据D1加了共享锁，事务T2、T3分别对数据D2、D3加了排它锁。
    则事务T1对数据___; 事务T2对数据___。`,
    imgs: [],
    options: [
      {
        answer: "D",
        col: 2,
        list: [
          "D2、D3加排它锁都成功",
          "D2、D3加共享锁都成功",
          "D2加共享锁成功, D3加排它锁失败",
          "D2、D3加排它锁和共享锁都失败",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "C",
        col: 2,
        list: [
          "D1、D3加排它锁都成功",
          "D1、D3加共享锁都成功",
          "D1加共享锁成功, D3加排它锁失败",
          "D1加排它锁成功, D3加共享锁失败",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050106",
    type: "topic",
    title: "上午题-分布式数据库",
    category: "single-select",
    question: `
    在分布式数据库中有分片透明、复制透明、位置透明和逻辑透明等基本概念。
    其中:___是指局部数据模型透明，即用户或应用程序无需知道局部使用的是哪种数据模型;
    ___是指用户或应用程序不要知道逻辑上访问的表具体是如何分块存储的。`,
    imgs: [],
    options: [
      {
        answer: "D",
        col: 4,
        list: ["分片透明", "复制透明", "位置透明", "逻辑透明"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "A",
        col: 4,
        list: ["分片透明", "复制透明", "位置透明", "逻辑透明"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050106",
    type: "topic",
    title: "上午题-分布式数据库",
    category: "single-select",
    question: `
    当某一场地故障时，系统可以使用其他场地上的副本而不至于使整个系统瘫痪。
    这称为分布式数据库的___。`,
    imgs: [],
    options: [
      {
        answer: "C",
        col: 4,
        list: ["共亨性", "自治性", "可用性", "分布性"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050202",
    type: "topic",
    title: "下午题-E-R模型",
    category: "fill",
    question: `
阅读下列说明，回答所有问题，将解答填入答题纸的对应栏内。
<p><b>[说明]</b></p>
某汽车维修公司为了便于管理车辆的维修情况，拟开发一套汽车维修管理系统。请根据下述需求描述完成该系统的数据库设计。
<p><b>[需求分析结果]</b></p>
<p>(1) 客户信息包括: 客户号、客户名、客户性质、折扣率、联系人、联系电话。客户性质有个人或单位。客户号唯一标识客户关系中的每一个元组。</p>
<p>(2) 车辆信息包括: 车牌号、车型、颜色和车辆类别。一个客户至少有一辆车；一辆车只属于一个客户。</p>
<p>(3) 员工信息包括: 员工号、员工名、岗位、电话、家庭住址。其中，员工号唯一标识员工关系中的每一个元组。岗位有业务员、维修工、主管。业务员根据车辆的故障情况填写维修单。</p>
<p>(4) 部门信息包括: 部门号、名称、主管和电话。其中，部门号唯一确定部门关系的每一个元组。每个部门只有一名主管。但每个部门有多名员工, 每名员工只属于一个部门。</p>
<p>(5) 维修中信息包括: 维修单号、车牌号、维修内容、工时。其中, 维修中号唯一标识维修单关系中的每一个元组。一个维修工可以接多张维修单。但一张维修单只对应一个维修工。</p>
<p><b>[概念模型设计]</b></p>
<p>根据需求阶段收集的信息，设计的实体联系图(不完整)，如下图所示。</p>
<p><b>[逻辑结构设计]</b></p>
<p>根据概念模型设计阶段完成的实体联系图，得出如下关系模式(不完整)：</p>
<p>客户 (客户号，客户名，_2_，折扣率，联系人，联系电话)</p>
<p>车辆 (车牌号，_3_，车型，颜色，车辆类别)</p>
<p>员工 (员工号，员工名，岗位，_4_，电话，家庭住址)</p>
<p>部门 (部门号，名称，主管，电话)</p>
<p>维修单 (维修单号，_5_，维修内容，工时)</p>
<p><b>[问题1]</b></p>
<p>根据问题描述，补充3个联系，完善实体联系图。联系名可以用联系1、联系2和联系3代替。联系的类型为 1:1 1:n 和 m:n (或1:1。1:*和*:*)</p>
<p><b>[问题2]</b></p>
<p>根据题意，将关系模式中的填空补充完整, 并填入答题纸对应的位置上。</p>
<p><b>[问题3]</b></p>
<p>分别给出车辆关系和维修单关系的主键和外键为_6_和_7_。</p>
<p><b>[问题4]</b></p>
<p>如果一张维修单涉及多项维修内容，需要多个维修工来处理，那么这个联系类型会发生何种变化? 你认为应该如何解决这一问题?</p>
    `,
    imgs: ["/docs/study/imgs/127-ti.png"],
    options: [
      {
        answer: "车辆 - 客户 n:1; 员工 - 部门 n:1; 维修单 - 维修工 n:1",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "客户性质",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "客户号",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "部门号",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "车牌号，员工号",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "主键：车牌号；外键：客户号",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "主键：维修单号；外键：车牌号，员工号",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer:
          "这个联系类型会从 n:1 变为 n:n。可以将维修单和维修工之间的联系分解为两个 1:n 的联系，并引入一个新的实体(如维修任务)，用来表示每项维修内容。",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-050202",
    type: "topic",
    title: "下午题-E-R模型",
    category: "fill",
    question: `
阅读下列说明，回答所有问题，将解答填入答题纸的对应栏内。
<p><b>[说明]</b></p>
<p>某社区蔬菜团购网站，为规范商品收发流程，便于查询客户订订单情况。需婴开发个信息系统。请根据下述需求描述完成该系统的数据库设计。</p>
<p><b>[需求分析结果]</b></p>
<p>(1) 记录蔬菜供应商的信息, 包括供应商编号, 地址和一个电话。</p>
<p>(2) 记录社区团购点的信息, 包括团购点编号, 地址和一个电话。</p>
<p>(3) 记录客户信息, 包括客户姓名和一个电话。客户可以在不同的社区团购点下订单，不直接与蔬菜供应商发生联系。</p>
<p>(4) 记录客户订单信息, 包括订单编号, 团购点编号, 客户电话, 订单内容和日期。</p>
<p><b>[概念模型设计]</b></p>
<p>根据需求阶段收集的信息，设计的实体联系图(不完整)，如下图所示。</p>
<p><b>[逻辑结构设计]</b></p>
<p>根据概念模型设计阶段完成的实体联系图，得出如下关系模式(不完整)：</p>
<p>蔬莱供货商 (供货商编号, 地址, 电话)</p>
<p>社区团购点 (团购点编号, 地址, 电话)</p>
<p>供货 (供货商编号, _2_)</p>
<p>客户 (姓名, 客户电话)</p>
<p>订单 (订单编号, 团购点编号, 订单内容, 日期, _3_)</p>
<p><b>[问题1]</b></p>
<p>根据问题描述，完善实体联系图。</p>
<p><b>[问题2]</b></p>
<p>根据题意，将关系模式中的填空补充完整, 并填入答题纸对应的位置上，并确定完整性约束关系为_4_。</p>
<p><b>[问题3]</b></p>
<p>若社区蔬莱团购网站还兼有 代收快递的业务, 请增加新的 "快递" 实体，并给出客户实体和快递实体之间的 "收取" 联系，对图进行补充。"快递" 关系模式包括快递编号、客户电话和日期。</p>
    `,
    imgs: ["/docs/study/imgs/128-ti.png"],
    options: [
      {
        answer: "客户 - 社区团购点 n:n; 并补充订单的属性：订单内容, 日期",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "团购点编号",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: "客户电话",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer:
          "供货关系的主键为(供货商编号, 团购点编号)，外键为供货商编号和团购点编号; 订单关系的主键为订单编号, 外键为团购点编号和客户电话",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer:
          "新增加的 快递实体 与 客户实体之间的 收取联系 为 n:1；快递 关系模式的主键为快递编号，外键为客户电话",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-100404",
    type: "topic",
    title: "下午题-数据流图",
    category: "fill",
    question: `
阅读下列说明和顶层、0层数据流图，回答所有问题，将解答填入答题纸的对应栏内。
<p><b>[说明]</b></p>
<p>某停车场运营方为了降低运菅成本，减员增效，提供良好的停车体验，欲开发无人值守停车系统，该系统的主要功能是:</p>
<p>(1) 信息维护。管理人员对车位(总数、空余车位数等)计费规则等基础信息进行设置。</p>
<p>(2) 会员注册。车主提供手机号、车牌号等信息进行注册，提交充值信息(等级、绑定并授权支付系统进行充值或交费的支付账号)，不同级别和充值额度享受不同停车折扣点。</p>
<p>(3) 车牌识别。当车辆进入停车场时，若有(空余车位数大于1), 自动识别车牌号后进行道闸控制。当车主开车离开停车场时，识别车牌号，计费成功后，请求道闸控制。</p>
<p>(4) 计费。更新车辆离场时间，根据计费规则计算出停车费用。若车主是会员，提示停车费用；若储存余额够本次停车费用，自动扣费，更新余额。若储值余额不足，自动使用授权缴费账号请求支付系统进行支付，获取支付状态。若非会员临时停车，提示停车费用，车主通过扫描费用信息中的支付码调用支付系统自助交费，获取支付状态。</p>
道闸控制。根据道闸控制请求道闸控制系统发送放行指令和接收道闸执行状态。若道闸执行状态为正常放行时，对入场车辆，将车牌号及其入场时间信息存入停车记录，修改空余车位数，对出场车辆更新停车状态，修改空余车位数。当因道闸系统出现问题<p>(5)(断网断电或是故障为抬杠等情况)，而无法在规定的时间内接收到其返回的执行状态正常放行时，系统向管理人员发送异常告警信息，之后管理人员安排故障排查处理，确保车辆有序出入停车场。</p>
<p>现采用结构化方法对无人值守停车系统进行分析与设计。获得如图的上下文数据流图和0层数据流图。</p>
<p><b>[问题1]</b></p>
<p>使用说明中的词语，给出父图中的实体的名称</p>
<p><b>[问题2]</b></p>
<p>使用说明中的词语，给出子图中的数据存储的名称</p>
<p><b>[问题3]</b></p>
<p>使用说明中的词语，补充子图中的缺失的数据流及其起点和终点</p>
<p><b>[问题4]</b></p>
<p>根据说明，采用结构化语言对 "道闸控制" 的加工逻辑进行描述</p>
    `,
    imgs: ["/docs/study/imgs/129-ti.png", "/docs/study/imgs/130-ti.png"],
    options: [
      {
        answer:
          "<p>E1：车辆</p><p>E2：车主</p><p>E3：支付系统</p><p>E4：管理人员</p><p>E5：道闸控制系统</p>",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer:
          "<p>D1：停车记录表</p><p>D2：会员信息表</p><p>D3：基础信息表(车位信息，计费规则等)</p>",
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `
        <p>入场时，道闸控制请求，起点为P1，终点为P5</p>
        <p>离场时，计费规则，起点是D3，终点为P3</p>
        <p>计费后，更新余额，起点为P3，终点为D2</p>
        <p>抬杆后，修改空余车位数，起点为P5，终点为D3</p>`,
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `
        <p>接收道闸控制请求</p>
        <p>IF 道闸执行状态为正常放行时 THEN</p>
        <p style='padding-left: 20px;'>IF 入场 THEN</p>
        <p style='padding-left: 40px;'>将车牌号及其入场时间信息存入停车记录</p>
        <p style='padding-left: 40px;'>修改空余车位数</p>
        <p style='padding-left: 20px;'>ELSE IF 出场 THEN</p>
        <p style='padding-left: 40px;'>更新停车状态</p>
        <p style='padding-left: 40px;'>修改空余车位数</p>
        <p style='padding-left: 20px;'>ENDIF</p>
        <p>ELSE</p>
        <p style='padding-left: 20px;'>向管理人员发送异常告警信息</p>
        <p style='padding-left: 20px;'>管理人员安排故障排查处理</p>
        <p>ENDIF</p>`,
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-100404",
    type: "topic",
    title: "下午题-数据流图",
    category: "fill",
    question: `
阅读下列说明和顶层、0层数据流图，回答所有问题，将解答填入答题纸的对应栏内。
<p><b>[说明]</b></p>
<p>某现代农业种植基地为进一步提升农作物种植过程的智能化, 欲开发智慧农业平台, 集管理和销售于一体, 该平台的主要功能有：</p>
 <p>(1) 信息维护。农业专家对农作物、环境等监测数据的监控处理规则进行维护。</p>
 <p>(2) 数据采集。获取传感器上传的农作物长势、土壤墒情、气候等连续监测数据, 解析后将监测信息进行数据处理、可视化和存储等操作。</p>
 <p>(3) 数据处理。对实时监测信息根据监控处理规则进行监测分析, 将分析结果进行可视化并进行存储、远程控制, 对历史监测信息进行综合统计和预测, 将预测信息进行可视化和存储。</p>
 <p>(4) 远程控制。根据监控处理规则对分析结果进行判定, 依据判定结果自动对控制器进行远程控制。平台也可以根据农业人员提供的控制信息对控制器进行远程控制。</p>
 <p>(5) 可视化。实时向农业人员展示监测信息：实时给农业专家展示统计分析结果和预测信息或根据农业专家请求进行展示。</p>
 <p>现采用结构化方法对智慧农业平台进行分析与设计, 获得如图所示的上下文数据流图和0层数据流图。</p>
<p><b>[问题1]</b></p>
<p>使用说明中的词语，给出父图中的实体的名称</p>
<p><b>[问题2]</b></p>
<p>使用说明中的词语，给出子图中的数据存储的名称</p>
<p><b>[问题3]</b></p>
<p>使用说明中的词语，补充子图中的缺失的数据流及其起点和终点</p>
<p><b>[问题4]</b></p>
<p>根据说明，"数据处理" 可以分解为哪些子加工？进一步进行分解时，需要注意哪三种常见的错误？</p>
    `,
    imgs: ["/docs/study/imgs/131-ti.png", "/docs/study/imgs/132-ti.png"],
    options: [
      {
        answer: `
        <p>E1：传感器</p>
        <p>E2：农业专家</p>
        <p>E3：农业人员</p>
        <p>E4：控制器</p>`,
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `
        <p>D1：监控处理规则表</p>
        <p>D2：监测信息表</p>
        <p>D3：分析结果表</p>
        <p>D4：预测信息表</p>`,
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `
        <p>可视化，分析结果，起点为P3，终点为P5</p>
        <p>历史检测信息，起点为D2，终点为P3</p>
        <p>可视化，预测信息，起点为P3，终点为P5</p>
        <p>监控处理规则，起点为D1，终点为P4</p>
        `,
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `
        <p>"数据处理" 可以分解为 "实时监测信息处理" 和 "历史监测信息处理" 两个子加工。</p>
        <p>进一步进行分解时, 需要注意以下三种常见的错误:</p>
        <p>(1)漏加工: 忘记了某个必要的加工。</p>
        <p>(2)重复加工: 同一个加工被分解到多个子图中。</p>
        <p>(3)虚假加工: 分解出了不必要的加工。</p>`,
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-070210",
    type: "topic",
    title: "下午题-UML",
    category: "fill",
    question: `
阅读下列说明和UML图，回答所有问题，将解答填入答题纸的对应栏内。
<p><b>[说明]</b></p>
<p>某游戏公司欲开发一款吃金币游戏。游戏的背景为一种回廊式迷宫(Maze), 在迷宫的不同位置上设置有墻。迷宫中有两种类型的机器人 (Robos)：小精灵(PacMan)和幽灵(Ghost)。游戏的目的就是控制小精灵在迷宫中游走, 吞吃迷宫路径上的金币, 且不能被幽灵抓到。幽灵在迷宫中游走, 并会吃掉遇到的小精灵。机器人游走时, 以单位距离的倍数计算游走路径的长度。当迷宫中至少存在一个小精灵和一个幽灵时, 游戏开始。</p>
<p>机器人上有两种传感器, 使机器人具有一定的感知能力。这两种传感器分别是：</p>
<p>(1) 前向传感器(FrontSensor)。探测在机器人当前位置的左边、右边和前方是否有墙(机器人遇到墙时, 必须改变游走方向)。机器人根据前向传感器的探测结果, 决定朝哪个方向运动。</p>
<p>(2) 近距离传感器(ProxiSensor)。探测在机器人的视线范围内(正前方)是否存在隐藏的金币或幽灵。近距离传感器并不报告探测到的对象是否正在移动以及朝个方向移动。但是如果近距离传感器的连续两次探测结果表明被探测对象处于不同的位置, 则可以推到出该对象在移动。</p>
<p>另外, 每个机器人都设置有一个计时器(Timer), 用于支持执行预先定义好的定时事件。机器人的动作包括：原地向左或向右旋转90°、向前或向后移动。</p>
<p>建立迷宫：用户可以使用编辑器(Editor)编写迷宫文件, 建立用户自定义的迷宫。将迷宫文件导入游戏系统建立用户自定义的迷宫。</p>
<p>现采用面向对象分析与设计方法开发该游戏, 得到如图所示的用例图以及初始类图。</p>
<p><b>[问题1]</b></p>
<p>根据说明中的描述，给出图中所对应的用例名</p>
<p><b>[问题2]</b></p>
<p>图中用例分别与哪些用例之间有关系，是何种关系？</p>
<p><b>[问题3]</b></p>
<p>根据说明中的描述，给出图中所对应的类名</p>
    `,
    imgs: ["/docs/study/imgs/133-ti.png", "/docs/study/imgs/134-ti.png"],
    options: [
      {
        answer: `
        <p>U1：编辑迷宫文件</p>
        <p>U2：导入迷宫文件</p>
        <p>U3：设置计时器</p>`,
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "寻找 用户 的操作",
      },
      {
        answer: `
        <p>用例建立迷宫 与 用例U1、U2 之间有 泛化关系</p>
        <p>用例操作机器人 与 用例U3 之间有 包含关系</p>`,
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `
        <p>C1：机器人(Robo)</p>
        <p>C2：计时器(Timer)</p>
        <p>C3：小精灵(PacMan)</p>
        <p>C4：幽灵(Ghost)</p>
        <p>C5：传感器(Sensor)</p>
        <p>C6：前向传感器(FrontSensor)</p>
        <p>C7：近距离传感器(ProxiSensor)</p>
        <p>C8：迷宫(Maze)</p>`,
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-070210",
    type: "topic",
    title: "下午题-UML",
    category: "fill",
    question: `
阅读下列说明和UML图，回答所有问题，将解答填入答题纸的对应栏内。
<p><b>[说明]</b></p>
<p>某中医医院拟开发一套线上抓药 APP, 允许患者凭借该医院医生开具的处方线上抓药, 并提供免费送药上门服务。该系统的主要功能描述如下：</p>
<p>(1) 注册：患者扫描医院提供的二维码进行注册, 注册过程中, 患者需提供其病历号, 系统根据病历号自动获取患者基本信息。</p>
<p>(2) 登录：已注册的患者可以登录系统进行线上抓药, 未注册的患者系统拒绝其登录。</p>
<p>(3) 确认处方：患者登录后, 可以查看医生开具的所有处方。患者选择需要抓药的处方和数量 (需要抓几副药) , 同时说明是否需要煎制。选择取药方式：自行到店取药或者送药上门, 若选择送药上门, 患者需要提供提供收货人姓名、联系方式和收货地址。系统自动计算本次抓药的费用, 患者可以使用微信或支付宝等支付方式支付费用。支付成功之后, 处方被发送给药师进行药品配制。
<p>(4) 处理处方：药师根据处方配置好药品。若患者要求煎制, 药师对配置好的药品进行煎制。煎制完成, 药师将该处方设置为已完成。若患者选择的是自行取药, 取药后确认已取药。</p>
<p>(5) 药品派送：处方完成后, 对于选择送药上门的患者, 系统将给快递人员发送药品配送信息, 等待快递人员取药；并给患者发送收获验证码。</p>
<p>(6) 送药上门：快递人员将配制好的药品送到患者指定的收获地址。患者收货时, 向快递人员出示收获验证码, 快递人员使用该验证码确认药品己送到。</p>
<p>现采用面向对象分析与设计方法开发上述系统, 得到如图所示的用例图以及类图。</p>
<p><b>[问题1]</b></p>
<p>根据说明中的描述，给出图中所对应的参与者名称和用例名</p>
<p><b>[问题2]</b></p>
<p>根据说明中的描述，给出图中所对应的类名</p>
<p><b>[问题3]</b></p>
<p>简要解释用例之间的 include、extend和generalize 关系的内涵</p>
`,
    imgs: ["/docs/study/imgs/135-ti.png", "/docs/study/imgs/136-ti.png"],
    options: [
      {
        answer: `
        <p>A1：患者</p>
        <p>A2：快递人员</p>
        <p>A3：药师</p>
        <p>U1：确认处方</p>
        <p>U2：支付方式</p>
        <p>U3：微信</p>
        <p>U4：支付宝</p>
        `,
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `
        <p>C1：支付方式</p>
        <p>C2：微信</p>
        <p>C3：支付宝</p>
        <p>C4：处方</p>
        <p>C5：药品</p>
        `,
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `
        <p>include 关系表示一个用例包含另一个用例的行为, 即被包含的用例是包含用例的一部分, 并且在包含用例执行时, 被包含用例总是会被执行。</p>
        <p>extend 关系表示一个用例在特定条件下扩展另一个用例的行为, 即扩展用例是可选的, 只有在满足特定条件时才会被执行。</p>
        <p>generalize 关系表示一个用例是另一个用例的特殊化, 即子用例继承父用例的行为, 并且可以添加自己的行为。</p>
        `,
        col: 1,
        list: ["", "", "", ""],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-020101",
    type: "topic",
    title: "上午题-程序语言",
    category: "single-select",
    question: `以下关于高级程序设计语言实现的编译和解释方式的叙述中,正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 1,
        list: [
          "编译程序不参与用户程序的运行控制。而解释程序则参与",
          "编译程序可以用高级语言编写。而解释程序只能用汇编语言编写",
          "编译方式处理源程序时不进行优化。而解释方式则进行优化",
          "编译方式不生成源程序的目标程序。而解释方式则生成",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-020102",
    type: "topic",
    title: "上午题-基本成分",
    category: "single-select",
    question: `逻辑表达式求值时常采用短路计算方式。
    "&&"、"||"、"!"分别表示逻辑与、或、非运算，"&&"、"||"为左结合，"!"为右结合，优先级从高到低为"!"、"&&"、"||"。
    <p>对逻辑表达式 "x && (y || !z)" 进行短路计算方式求值时，___。</p>`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 1,
        list: [
          "x为真，则整个表达式的值即为真，不需要计算y和z的值",
          "x为假，则整个表达式的值即为假，不需要计算y和z的值",
          "x为真，再根据z的值决定是否需要计算y的值",
          "x为假，再根据y的值决定是否需要计算z的值",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-020102",
    type: "topic",
    title: "上午题-基本成分",
    category: "single-select",
    question: `程序运行过程中常使用参数在函数间传递信息，引用调用传递的是___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 1,
        list: ["地址", "类型", "名称", "值"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-020102",
    type: "topic",
    title: "上午题-基本成分",
    category: "single-select",
    question: `
函数t、f的定义如下所示，其中，a是整型全局变量。
<p>t(): int x=f(a);  print a+x;</p>
<p>f(int r): a=r+1; r=r*2; return r;</p>
设调用函数t前a的值为5,则在函数t中以传值调用方式调用函数f时，输出为___。
在函数t中以引用调用方式调用函数f时，输出为___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["12", "16", "20", "24"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `D`,
        col: 4,
        list: ["12", "16", "20", "24"],
        fillAnswer: "",
        note: "a=5 为全局变量",
      },
    ],
  },
  {
    id: "section-020102",
    type: "topic",
    title: "上午题-基本成分",
    category: "single-select",
    question: `
函数foo()、hoo()的定义如下所示，。
<p>foo(int x): int a=2; hoo(a,x); print(a,x);</p>
<p>hoo(int &x, int y): y=y+10; x=y-x; return;</p>
调用函数hoo(a,x)的两个参数分别采用引用调用和值调用方式传递，则函数foo(5)的输出为___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 4,
        list: ["2, 5", "2, 15", "13, 5", "13, 15"],
        fillAnswer: "",
        note: `
        <p>调用 foo: a=2 x=5</p>
        <p>进入 hoo: x=a=2 y=5</p>
        <p>调用: y=15</p>
        <p>调用: x=y-x=13, 即a=13</p>
        `,
      },
    ],
  },
  {
    id: "section-020202",
    type: "topic",
    title: "上午题-符号表",
    category: "single-select",
    question: `编译程序对高级语言源程序进行编译的过程中，要不断收集、记录和使用源程序中一些相关符号的类型和特征等信息，并将其存入___中。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: ["符号表", "哈希表", "动态查找表", "栈和队列"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-020203",
    type: "topic",
    title: "上午题-正规式",
    category: "single-select",
    question: `由a、b构造且仅包含偶数个a的串的集合用正规式表示为___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: [
          `<span class="txt-func">(a<span class="txt-sup">*</span>a)<span class="txt-sup">*</span>b<span class="txt-sup">*</span></span>`,
          `<span class="txt-func">(b<span class="txt-sup">*</span>(ab<span class="txt-sup">*</span>a)<span class="txt-sup">*</span>)<span class="txt-sup">*</span></span>`,
          `<span class="txt-func">(a<span class="txt-sup">*</span>(ba<span class="txt-sup">*</span>)<span class="txt-sup">*</span>b)<span class="txt-sup">*</span></span>`,
          `<span class="txt-func">(a|b)<span class="txt-sup">*</span>(aa)<span class="txt-sup">*</span></span>`,
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-020204",
    type: "topic",
    title: "上午题-有限自动机",
    category: "single-select",
    question: `下图所示有限自动机的特点是___。`,
    imgs: ["/docs/study/imgs/12-youxian.png"],
    options: [
      {
        answer: `D`,
        col: 2,
        list: [
          "识别的0、1串是以0开头且以1结尾",
          "识别的0、1串中1的个数为偶数",
          "识别的0、1串中0后面必须是1",
          "识别的0、1串中1不能连续出现",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-020205",
    type: "topic",
    title: "上午题-上下文无关文法",
    category: "single-select",
    question: `由某上下文无关文法M[S]推导出某句子的分析树如下图所示，则错误的叙述是___。`,
    imgs: ["/docs/study/imgs/137-ti.png"],
    options: [
      {
        answer: `A`,
        col: 1,
        list: [
          "该文法推导出的句子必须以'a'开头",
          "acabcbdcc是该文法推导出的一个句子",
          "'S➔aAcB'是该文法的一个产生式",
          "a、b、c、d属于该文法的终结符号集",
        ],
        fillAnswer: "",
        note: "S➔aAcB|Bd；A➔AaB|c；B➔bScA|b|e；",
      },
    ],
  },
  {
    id: "section-020206",
    type: "topic",
    title: "上午题-表达式",
    category: "single-select",
    question: `算术表达式采用逆波兰式表示时不用括号，可以利用___进行求值。
    与逆波兰式 ab-cd+* 对应的中缀表达式是___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["数组", "栈", "队列", "散列表"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 2,
        list: ["a-b+c*d", "(a-b)*c+d", "(a-b)*(c+d)", "a-b*c+d"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-020207",
    type: "topic",
    title: "上午题-表达式",
    category: "single-select",
    question: `某表达式的语法树如下图所示，采用逆波兰式表示是___。`,
    imgs: ["/docs/study/imgs/138-ti.png"],
    options: [
      {
        answer: `C`,
        col: 4,
        list: ["abcd-+*", "ab-c+d*", "abc-d*+", "ab-cd+*"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-020202",
    type: "topic",
    title: "上午题-编译程序",
    category: "single-select",
    question: `
编译器和解释器是两种基本的高级语言处理程序。编译器对高级语言源程序的处理过
程可以划分为词法分析、语法分析、语义分柝、中间代码生成、代码优化、目标代码生成
等阶段，其中，___并不是每个编译器都必需的。与编译器相比，解释器___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "词法分析和语法分析",
          "语义分析和中间代码生成",
          "中间代码生成和代码优化",
          "代码优化和目标代码生成",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 1,
        list: [
          "不参与运行控制，程序执行的速度慢",
          "参与运行控制，程序执行的速度慢",
          "参与运行控制，程序执行的速度快",
          "不参与运行控制，程序执行的速度快",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-040203",
    type: "topic",
    title: "上午题-职务开发",
    category: "single-select",
    question: `王某是一名程序员, 每当软件开发完成后均按公司规定完成软件文档, 并上交公司存档, 自己没有留存。
    因撰写论文的需要, 王某向公司要求将软件文档原本借出复印, 但遭到公司拒绝, 理由是该软件文档属于职务作品, 著作权归公司。以下叙述中, 正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 1,
        list: [
          "该软件文档属于职务作品, 著作权归公司",
          "该软件文档不属于职务作品, 程序员享有著作权",
          "该软件文档属于职务作品, 但程序员享有复制权",
          "该软件文档不属于职务作品, 著作权由公司和程序员共同享有",
        ],
        fillAnswer: "",
        note: "程序员只享有署名权",
      },
    ],
  },
  {
    id: "section-040204",
    type: "topic",
    title: "上午题-委托开发",
    category: "single-select",
    question: `李某受非任职单位委托, 利用该单位实验室, 实验材料和技术资料开发了一项软件产品, 对该软件的权利归属, 表达正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 1,
        list: [
          "该软件属于委托单位",
          "若该单位与李某对软件的归属有特别的约定, 则遵从约定；无约定的, 原则上归属于李某",
          "取决于该软件是否属于单位分派给李某的",
          "无论李某与该单位有无特别约定, 该软件属于李某",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-040103",
    type: "topic",
    title: "上午题-专利权",
    category: "single-select",
    question: `甲、乙两公司的软件设计师分别完成了相同的计算机程序发明, 甲公司先于乙公司完成, 乙公司先于甲公司使用。
    甲、乙公司于同一天向专利局申请发明专利。此情形下, ___可获得专利权。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 1,
        list: ["甲公司", "乙公司", "甲、乙公司均", "由甲、乙公司协商确定谁"],
        fillAnswer: "",
        note: "专利权只看谁先申请",
      },
    ],
  },
  {
    id: "section-040104",
    type: "topic",
    title: "上午题-商标权",
    category: "single-select",
    question: `甲公司购买了一工具软件, 并使用该工具软件开发了新的名“恒友”的软件。
    甲公司在销售新软件的同时, 向客户提供工具软件的复制品, 则该行为___。
    甲公司未对“恒友”软件注册商标就开始推向市场, 并获得用户的好评。
    三个月后, 乙公司也推出名为“恒友”的类似软件, 并对之进行了商标注册, 则其行为___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "侵犯了著作权",
          "不构成侵权行为",
          "侵犯了商标权",
          "属于不正当竞争",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 4,
        list: [
          "侵犯了著作权",
          "不构成侵权行为",
          "侵犯了商标权",
          "属于不正当竞争",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-040101",
    type: "topic",
    title: "上午题-地域性",
    category: "single-select",
    question: `中国企业 M 与美国公司 L 进行技术合作, 合同约定 M 使用一项在有效期内的美国专利, 但该项美国专利未在中国和其他国家提出申请。对于 M 销售依照该专利生产的产品, 以下叙述正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 1,
        list: [
          "在中国销售, M 需要向 L 支付专利许可使用费",
          "返销美国, M 不需要向 L 支付专利许可使用费",
          "在其他国家销售, M 需要向 L 支付专利许可使用费",
          "在中国销售, M 不需要向 L 支付专利许可使用费",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-040201",
    type: "topic",
    title: "上午题-软著",
    category: "single-select",
    question: `根据《计算机软件保护条例》的规定, 对软件著作权的保护不包括___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 2,
        list: ["目标程序", "软件文档", "源程序", "开发软件所有的操作方法"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-040201",
    type: "topic",
    title: "上午题-软著",
    category: "single-select",
    question: `广大公司 (经销商) 擅自复制并销售恭大公司开发的 OA 软件已经构成侵权。
    鸿达公司在不知情时从广大公司 (经销商) 处购入该软件并已安装使用。
    在鸿达公司知道了所使用的软件为侵权复制的情形下, 其使用行为___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 1,
        list: [
          "侵权, 支付合理费用后可以继续使用该软件",
          "侵权, 须承担赔偿责任",
          "不侵权, 可继续使用该软件",
          "不侵权, 不需承担任何法律责任",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-040105",
    type: "topic",
    title: "上午题-商业秘密权",
    category: "single-select",
    question: `某软件公司研发的财务软件产品在行业中技术领先, 具有很强的市场竞争优势。
    为确保其软件产品的技术领先及市场竞争优势, 公司采取相应的保密措施, 以防止软件技术秘密的外泄。
    并且, 还为该软件产品冠以“用友”商标, 但未进行商标注册。
    此情况下, 公司仅享有该软件产品的___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "软件著作权和专利权",
          "商业秘密权和专利权",
          "软件著作权和商业秘密权",
          "软件著作权和商标权",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-040102",
    type: "topic",
    title: "上午题-著作权",
    category: "single-select",
    question: `著作权中, ___的保护期不受限制。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 1,
        list: ["发表权", "发行权", "署名权", "展览权"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-060101",
    type: "topic",
    title: "上午题-面向对象",
    category: "single-select",
    question: `在面向对象分析与设计中，___是应用领域中的核心类，一般用于保存系统中的信息以及提供针对这些信息的相关处理行为；
    ___是系统内对象和系统外参与者的联系媒介；
    ___主要是协调上述两种类对象之间的交互。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 4,
        list: ["控制类", "边界类", "实体类", "软件类"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `A`,
        col: 4,
        list: ["控制类", "边界类", "实体类", "软件类"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 4,
        list: ["控制类", "边界类", "实体类", "软件类"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-060101",
    type: "topic",
    title: "上午题-面向对象",
    category: "single-select",
    question: `采用面向对象开发方法时,对象是系统运行时基本实体。以下关于对象的叙述中,正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 2,
        list: [
          "对象只能包括数据(属性)",
          "对象只能包括操作(行为)",
          "对象一定有相同的属性和行为",
          "对象通常由对象名、属性和操作三个部分组成",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-060101",
    type: "topic",
    title: "上午题-面向对象",
    category: "single-select",
    question: `___是把对象的属性和服务结合成一个独立的系统单元，并尽可能隐藏对象的内部细节;
___是指子类可以自动拥有父类的全部属性和服务;
___是对象发出的服务请求，一般包含提供服务的对象标识、服务标识、输入信息和应答信息等。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 4,
        list: ["继承", "多态", "消息", "封装"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `A`,
        col: 4,
        list: ["继承", "多态", "消息", "封装"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 4,
        list: ["继承", "多态", "消息", "封装"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-060101",
    type: "topic",
    title: "上午题-面向对象",
    category: "single-select",
    question: `不同的对象收到同一消息可以产生完全不同的结果，这一现象叫___。
绑定是一个把过程调用和响应调用所需要执行的代码加以结合的过程。
在一般的程序设计语言中，绑定在编译时进行的，叫做___；
而___则是在运行时进行的，即一个给定的过程调用和代码的结合直到调用发生时才进行的。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["继承", "多态", "动态绑定", "静态绑定"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `D`,
        col: 4,
        list: ["继承", "多态", "动态绑定", "静态绑定"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 4,
        list: ["继承", "多态", "动态绑定", "静态绑定"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-060103",
    type: "topic",
    title: "上午题-面向对象设计",
    category: "single-select",
    question: `开-闭原则 (Open-Closed Principle, OCP) 是面向对象的可复用设计的基石。
开-闭原则是指一个软件实体应当对___开放，对___关闭；
<p>里氏代换原则 (Liskov Substitution Principle, LSP) 是指任何___可以出现的地方，___一定可以出现；</p>
<p>依赖倒转原则 (Dependence Inversion Principle, DIP) 就是要依赖于___，而不依赖于___，或者说要针对接口编程，不要针对实现编程。</p>`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["修改", "扩展", "分析", "设计"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `A`,
        col: 4,
        list: ["修改", "扩展", "分析", "设计"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 4,
        list: ["变量", "常量", "基类对象", "子类对象"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `D`,
        col: 4,
        list: ["变量", "常量", "基类对象", "子类对象"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `D`,
        col: 4,
        list: ["程序设计语言", "建模语言", "实现", "抽象"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 4,
        list: ["程序设计语言", "建模语言", "实现", "抽象"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-060102",
    type: "topic",
    title: "上午题-面向对象分析",
    category: "single-select",
    question: `面向对象分析时，执行的活动顺序通常是___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 1,
        list: [
          "认定对象、组织对象、描述对象的相互作用、确定对象的操作",
          "认定对象、定义属性、组织对象、确定对象的操作",
          "认定对象、描述对象间的相互作用、确定对象的操作、识别包",
          "识别类及对象、识别关系、定义属性、确定对象的操作",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-060104",
    type: "topic",
    title: "上午题-面向对象程序设计",
    category: "single-select",
    question: `在面向对象程序设计语言中,对象之间通过___方式进行通信。
以下关于好的面向对象程序设计语言的叙述中,不正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 1,
        list: ["消息传递", "继承", "引用", "多态"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 1,
        list: [
          "应该支持被封装的对象",
          "应该支持类与实例的概念",
          "应该支持通过指针进行引用",
          "应该支持继承和多态",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-100202",
    type: "topic",
    title: "上午题-耦合",
    category: "single-select",
    question: `模块A将学生信息，即学生姓名、学号、手机号等放到一个结构体中, 传递给模块B。模块A和B之间的耦合类型为___耦合。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 1,
        list: ["数据", "标记", "控制", "内容"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-100201",
    type: "topic",
    title: "上午题-内聚",
    category: "single-select",
    question: `模块A, B和C有相同的程序块，块内的语句之间没有任何联系。
    现把该程序块取出来，形成新的模块D，则模块D的内聚类型为___内聚。
以下关于该内聚类型的叙述中，不正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: ["巧合", "逻辑", "时间", "过程"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `D`,
        col: 2,
        list: [
          "具有最低的内聚性",
          "不易修改和维护",
          "不易理解",
          "不影响模块间的耦合关系",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-100401",
    type: "topic",
    title: "上午题-系统结构设计",
    category: "single-select",
    question: `在设计软件的模块结构时，___不能改进设计质量。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 1,
        list: [
          "尽量减少高扇出结构",
          "模块的大小适中",
          "将具有相似功能的模块合并",
          "完善模块的功能",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-100402",
    type: "topic",
    title: "上午题-系统文档",
    category: "single-select",
    question: `在开发信息系统时，用于系统开发人员与项目管理人员沟通的主要文档是___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 4,
        list: [
          "系统开发合同",
          "系统设计说明书",
          "系统开发计划",
          "系统测试报告",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-100404",
    type: "topic",
    title: "上午题-数据流图",
    category: "single-select",
    question: `数据流图(DFD)对系统的功能和功能之间的数据流进行建模；其中顶层数据流图描述了系统的___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["处理过程", "输入与输出", "数据存储", "数据实体"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-100404",
    type: "topic",
    title: "上午题-数据流图",
    category: "single-select",
    question: `在结构化分析中,用数据流图描述___。
    当采用数据流图对一个图书馆管理系统进行分析时，___是一个外部实体。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 1,
        list: [
          "数据对象之间的关系,用于对数据建模",
          "数据在系统中如何被传送或变换，以及如何对数据流进行变换的功能或子功能，用于对功能建模",
          "系统对外部事件如何响应，如何动作，用于对行为建模",
          "数据流图中的各个组成部分",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `A`,
        col: 4,
        list: ["读者", "图书", "借书证", "借阅"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-100403",
    type: "topic",
    title: "上午题-数据字典",
    category: "single-select",
    question: `数据字典是结构化分析的一个重要输出。数据字典的条目不包括___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: ["外部实体", "数据流", "数据项", "基本加工"],
        fillAnswer: "",
        note: "外部实体 是 DFD（数据流图）中的元素，用来表示系统外部的参与者",
      },
    ],
  },
  {
    id: "section-120103",
    type: "topic",
    title: "上午题-防火墙",
    category: "single-select",
    question: `防火墙通常分为内网、外网和 DMZ 三个区域。按照受保护程度从低到高正确的排列次序为___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 1,
        list: [
          "内网、外网和 DMZ",
          "外网、DMZ 和内网",
          "DMZ、内网和外网",
          "内网、DMZ 和外网",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-120201",
    type: "topic",
    title: "上午题-病毒",
    category: "single-select",
    question: `计算机病毒的特征不包括___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 1,
        list: ["传染性", "触发性", "隐蔽性", "自毁性"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-120202",
    type: "topic",
    title: "上午题-网络攻击",
    category: "single-select",
    question: `下列攻击类型中，___是以被攻击对象不能继续提供服务为首要目标。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 1,
        list: ["跨站脚本", "拒绝服务", "信息篡改", "口令猜测"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-120102",
    type: "topic",
    title: "上午题-网络安全",
    category: "single-select",
    question: `下列不能用于远程登陆或控制的是___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: ["IGMP", "SSH", "Telnet", "RFB"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-130102",
    type: "topic",
    title: "上午题-网络设备",
    category: "single-select",
    question: `下列网络互连设备中，属于物理层的是___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["交换机", "中继器", "路由器", "网桥"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-130204",
    type: "topic",
    title: "上午题-协议",
    category: "single-select",
    question: `ICMP协议属于因特网中的___协议, ICMP协议数据单元封装在___中传送。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["数据链路层", "网络层", "传输层", "会话层"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `D`,
        col: 4,
        list: ["以太帧", "TCP段", "UDP数据报", "IP数据报"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-130201",
    type: "topic",
    title: "上午题-协议",
    category: "single-select",
    question: `默认情况下, FTP服务器的控制端口为___，上传文件时的端口为___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 4,
        list: ["大于1024的端口", "20", "80", "21"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 4,
        list: ["大于1024的端口", "20", "80", "21"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-130203",
    type: "topic",
    title: "上午题-协议",
    category: "single-select",
    question: `以下协议中属于应用层协议的是___，该协议的报文封装在___中传送。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 1,
        list: ["SNMP", "ARP", "ICMP", "X.25"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 1,
        list: ["TCP", "IP", "UDP", "ICMP"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-130201",
    type: "topic",
    title: "上午题-协议",
    category: "single-select",
    question: `以下关于 TCP/IP 协议和层次对应关系的表示中,正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 2,
        list: [
          `<table><tbody>
          <tr><td>HTTP</td><td>SNMP</td></tr>
          <tr><td>TCP</td><td>UDP</td></tr>
          <tr><td colspan='2'>IP</td></tr>
          </tbody></table>`,
          `<table><tbody>
          <tr><td>FTP</td><td>Telnet</td></tr>
          <tr><td>UDP</td><td>TCP</td></tr>
          <tr><td colspan='2'>ARP</td></tr>
          </tbody></table>`,
          `<table><tbody>
          <tr><td>HTTP</td><td>SMTP</td></tr>
          <tr><td>TCP</td><td>UDP</td></tr>
          <tr><td colspan='2'>IP</td></tr>
          </tbody></table>`,
          `<table><tbody>
          <tr><td>SMTP</td><td>FTP</td></tr>
          <tr><td>UDP</td><td>TCP</td></tr>
          <tr><td colspan='2'>ARP</td></tr>
          </tbody></table>`,
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-130202",
    type: "topic",
    title: "上午题-协议",
    category: "single-select",
    question: `相比于 TCP, UDP 的优势为___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["可靠传输", "开销较小", "拥塞控制", "流量控制"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-130501",
    type: "topic",
    title: "上午题-IP地址",
    category: "single-select",
    question: `IP地址块 222.125.80.128/26 包含了___个可用主机地址。其中最小地址是___，最大地址是___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 4,
        list: ["14", "30", "62", "126"],
        fillAnswer: "",
        note: "/26表示32位中26位网络地址，6位主机地址，再扣除全0和全1的，总共有 2^6-2=62",
      },
      {
        answer: `B`,
        col: 2,
        list: [
          "222.125.80.128",
          "222.125.80.129",
          "222.125.80.159",
          "222.125.80.160",
        ],
        fillAnswer: "",
        note: "解构为222.125.80.10 00 0000，其中10000001为最小129，10111110为最大",
      },
      {
        answer: `B`,
        col: 2,
        list: [
          "222.125.80.128",
          "222.125.80.190",
          "222.125.80.192",
          "222.125.80.254",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-130501",
    type: "topic",
    title: "上午题-IP地址",
    category: "single-select",
    question: `分配给某公司网络的地址块是220.17.192.0/20,该网络被划分为___个C类子网。不属于该公司网络的子网地址是___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 4,
        list: ["4", "8", "16", "32"],
        fillAnswer: "",
        note: "构成为 20位网络号，4位子网号，8位主机号，2^4=16个子网",
      },
      {
        answer: `D`,
        col: 2,
        list: ["220.17.203.0", "220.17.205.0", "220.17.207.0", "220.17.213.0"],
        fillAnswer: "",
        note: "解构为 220.17.1100 0000.0，子网段可从 11000000=192 至11001111=207",
      },
    ],
  },
  {
    id: "section-110701",
    type: "topic",
    title: "上午题-CMM",
    category: "single-select",
    question: `以下关于 CMM 的叙述中不正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 1,
        list: [
          "CMM 是指软件过程能力成熟度模型",
          "CMM 根据软件过程的不同成熟度划分了5个等级。其中 1级被认为成熟度最高。5级被认为成熟度最低",
          "CMMI 的任务是将己有的几个 CMM 模型结合在一起,使之构成 '集成模型'",
          "采用更成熟的 CMM 模型, 一般来说可以提高最终产品的质量",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110702",
    type: "topic",
    title: "上午题-CMMI",
    category: "single-select",
    question: `能力成熟度模型集成 (CMMI) 是若干过程模型的综合和改进。
连续式模型和阶段式模型是 CMMI 提供的两种表示方法，而连续式模型包括 6个过程域能力等级,
其中___使用量化(统计学)手段改变和优化过程域，以应对客户要求的改变和持续改进计划中的过程域的功效。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 4,
        list: [
          "CL2 (已管理的)",
          "CL3 (已定义级的)",
          "CL4 (定垦管理的)",
          "CL5 (优化的)",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110101",
    type: "topic",
    title: "上午题-瀑布模型",
    category: "single-select",
    question: `某开发小组欲为一公司开发一个产品控制软件，监控产品的生产和销售过程，从购买各种材料开始，到产品的加工和销售进行全程跟踪。
购买材料的流程、产品的加工过程以及销售过程可能会发生变化。
该软件的开发最不适宜采用___模型,主要是因为这种模型___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: ["瀑布", "原型", "增量", "喷泉"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 2,
        list: [
          "不能解决风险",
          "不能快速提交软件",
          "难以适应变化的需求",
          "不能理解用户的需求",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110103",
    type: "topic",
    title: "上午题-增量模型",
    category: "single-select",
    question: `以下关于增量模型优点的叙述中,不正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 2,
        list: [
          "强调开发阶段性早期计划",
          "第一个可交付版本所需要的时间少和成本低",
          "开发由增量表示的小系统所承担的风险小",
          "系统管理成本低、效率高、配置简单",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110104",
    type: "topic",
    title: "上午题-原型模型",
    category: "single-select",
    question: `为了有效地捕获系统需求，应采用___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: ["瀑布模型", "V 模型", "原型模型", "螺旋模型"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110105",
    type: "topic",
    title: "上午题-螺旋模型",
    category: "single-select",
    question: `关于螺旋模型, 下列陈述中不正确的是___，___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 1,
        list: [
          "将风险分析加入到瀑布模型中",
          "将开发过程划分为几个螺旋周期，每个螺旋周期大致和瀑布模型相符",
          "适合于大规模、复杂且具有高风险的项目",
          "可以快速的提供一个初始版本让用户测试",
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 1,
        list: [
          "支持用户需求的动态变化",
          "要求开发人员具有风险分析能力",
          "基于该模型进行软件开发，开发成本低",
          "过多的迭代次数可能会增加开发成本，进而延迟提交时间",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110106",
    type: "topic",
    title: "上午题-喷泉模型",
    category: "single-select",
    question: `喷泉模型是一种适合于面向___开发方法的软件过程模型。该过程模型的特点不包括___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: ["对象", "数据", "数据流", "事件"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `D`,
        col: 2,
        list: [
          "以用户需求为动力",
          "支持软件重用",
          "具有迭代性",
          "开发活动之间存在明显的界限",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110107",
    type: "topic",
    title: "上午题-统一过程模型",
    category: "single-select",
    question: `以下关于 统一过程UP 的叙述中，不正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 1,
        list: [
          "UP 是以用例和风险为驱动，以架构为中心, 迭代并且增量的开发过程",
          "UP 定义了四个阶段，即起始、精化、构建和确认阶段",
          "每次迭代都包含计划、分析、设计、构造、集成、测试以及内部和外部发布",
          "每个迭代有五个核心工作流",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110108",
    type: "topic",
    title: "上午题-敏捷过程",
    category: "single-select",
    question: `以下关于 敏捷统一过程(AUP) 的叙述中，不正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "在大型任务上连续",
          "在小型活动上迭代",
          "每一个不同的系统都需要一套不同的策略、约定和方法论",
          "采用经典的 UP 阶段性活动，即初始化、精化、构件和转换",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110108",
    type: "topic",
    title: "上午题-敏捷过程",
    category: "single-select",
    question: `以下关于 极限编程(XP) 的最佳实践的叙述中，不正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 1,
        list: [
          "只处理当前的需求,使设计保持简单",
          "编写完程序之后编写测试代码",
          "可以按日甚至按小时为客户提供可运行的版本",
          "系统最终用户代表应该全程配合 XP团队",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110108",
    type: "topic",
    title: "上午题-敏捷过程",
    category: "single-select",
    question: `在敏捷过程的开发方法中，___使用了迭代的方法，其中把每段时间(30天)一次的迭代称为一个 "冲刺" 并按需求的优先级别来实现产品，多个自组织和自治的小组并行地递增实现产品。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: ["极限编程 XP", "水晶法", "并列争求法", "自适应软件开发"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110108",
    type: "topic",
    title: "上午题-敏捷过程",
    category: "single-select",
    question: `敏捷开发方法中，___认为每一种不同的项目都需要一套不同的策略、约定和方法论。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 2,
        list: [
          "极限编程 (XP)",
          "水晶法 (Crystal)",
          "并列争求法 (Scrum)",
          "自适应软件开发 (ASD)",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110402",
    type: "topic",
    title: "上午题-系统设计",
    category: "single-select",
    question: `软件详细设计阶段的主要任务不包括___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 2,
        list: [
          "数据结构设计",
          "算法设计",
          "模块之间的接口设计",
          "数据库的物理设计",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110501",
    type: "topic",
    title: "上午题-系统测试",
    category: "single-select",
    question: `在软件开发过程中，系统测试阶段的测试目标来自于___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: ["需求分析", "概要设计", "详细设计", "软件实现"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110505",
    type: "topic",
    title: "上午题-系统测试",
    category: "single-select",
    question: `自底向上的集成测试策略的优点包括___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "主要的设计问题可以在测试早期处理",
          "不需要写驱动程序",
          "不需要写桩程序",
          "不需要进行回归测试",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110502",
    type: "topic",
    title: "上午题-黑盒测试",
    category: "single-select",
    question: `招聘系统要求求职的人年龄在20岁到60岁之间(含)，学历为本科、硕士或博士，专业为计算机科学与技术、通信工程或者电子工程。
其中___不是好的测试用例。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "(20,本科,电子工程)",
          "(18,本科,通信工程)",
          "(18,大专,电子工程)",
          "(25,硕士,生物学)",
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110504",
    type: "topic",
    title: "上午题-McCabe度量法",
    category: "single-select",
    question: `软件的复杂性主要体现在程序的复杂性。
___是度量软件复杂性的一个主要参数。
若采用 McCabe度量法 计算环路复杂性，则对于下图所示的程序图，其环路复杂度为___。`,
    imgs: ["/docs/study/imgs/139-ti.png"],
    options: [
      {
        answer: `A`,
        col: 4,
        list: ["代码行数", "常量的数量", "变量的数量", "调用的库函数的数量"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 4,
        list: ["2", "3", "4", "5"],
        fillAnswer: "",
        note: "11 - 9 + 2",
      },
    ],
  },
  {
    id: "section-110503",
    type: "topic",
    title: "上午题-白盒测试",
    category: "single-select",
    question: `用白盒测试技术对下面流程图进行测试，至少采用___个测试用例才能实现路径覆盖。`,
    imgs: ["/docs/study/imgs/140-ti.png"],
    options: [
      {
        answer: `A`,
        col: 4,
        list: ["3", "4", "6", "8"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110503",
    type: "topic",
    title: "上午题-白盒测试",
    category: "single-select",
    question: `用白盒测试技术对下面流程图进行测试，设计的用例如下表所示。
至少采用测试用例___才能实现语句覆盖，至少采用测试用例___才能实现路径覆盖。`,
    imgs: ["/docs/study/imgs/141-ti.png", "/docs/study/imgs/142-ti.png"],
    options: [
      {
        answer: `A`,
        col: 4,
        list: ["①", "②", "③", "④"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `D`,
        col: 4,
        list: ["①", "①②", "③④", "①②③④"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110503",
    type: "topic",
    title: "上午题-白盒测试",
    category: "single-select",
    question: `下图用白盒测试方法进行测试，图中有___条路径。
    采用 McCabe度量 计算该程序图的环路复杂性为___。`,
    imgs: ["/docs/study/imgs/143-ti.png"],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["3", "4", "5", "6"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 4,
        list: ["3", "4", "5", "6"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110503",
    type: "topic",
    title: "上午题-白盒测试",
    category: "single-select",
    question: `如下所示代码(用缩迸表示程序块)，要实现语句覆盖，至少需要___个测试用例。
    采用 McCabe度量 计算该程序图的环路复杂性为___。`,
    imgs: ["/docs/study/imgs/144-ti.png"],
    options: [
      {
        answer: `A`,
        col: 4,
        list: ["1", "2", "3", "4"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 4,
        list: ["1", "2", "3", "4"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110601",
    type: "topic",
    title: "上午题-软件维护",
    category: "single-select",
    question: `系统可维护性是指维护人员理解、改正、改动和改进软件系统的难易程度，其评价指标不包括___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 4,
        list: ["可理解性", "可测试性", "可修改性", "一致性"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110601",
    type: "topic",
    title: "上午题-软件维护",
    category: "single-select",
    question: `以下关于软件维护的叙述中，不正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 1,
        list: [
          "软件维护解决软件产品交付用户之后运行中发生的各种问题", 
          "软件维护期通常比开发期长得多，投入也大得多", 
          "软件可维护性是软件开发阶段各个时期的关键目标", 
          "相对于软件开发任务而言，软件维护工作要简单得多"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110601",
    type: "topic",
    title: "上午题-软件维护",
    category: "single-select",
    question: `某搜索引擎在交付后，开发人员修改了其中的索引方法，使得用户可以更快地得到搜索结果。这种修改属于___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 4,
        list: ["正确性", "适应性", "完善性", "预防性"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110803",
    type: "topic",
    title: "上午题-软件质量",
    category: "single-select",
    question: `软件可维护性是一个系统在特定的时间间隔内可以正常进行维护活动的概率。
用 MTTF 和 MTTR 分别表示平均无故障时间和平均故障修复时间，则软件可维护性计算公式为___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 4,
        list: ["MTTF/ (1+MTTF)", "1/ (1+MTTF)", "MTTR/ (1+MTTR)", "1/ (1+MTTR)"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110805",
    type: "topic",
    title: "上午题-沟通管理",
    category: "single-select",
    question: `在进行软件开发时，采用无主程序员的开发小组,成员之间相互平等；
而主程序员负责制的开发小组，由一个主程序员和若千成员组成，成员之间没有沟通。
在一个由8名开发人员构成的小组中，无主程序员组和主程序员组的沟通路径分别是___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 2,
        list: ["32和8", "32和7", "28和8", "28和7"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110806",
    type: "topic",
    title: "上午题-成本管理",
    category: "single-select",
    question: `软件项目成本估算模型 COCOMO II 中，体系结构阶段模型基于___进行估算。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 2,
        list: ["应用程序点数量", "功能点数量", "复用或生成的代码行数", "源代码的行数"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110801",
    type: "topic",
    title: "上午题-进度管理",
    category: "single-select",
    question: `以下关于进度管理工具 Gantt图 的叙述中，不正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 1,
        list: [
          "能清晰地表达每个任务的开始时间、结束时间和持续时间", 
          "能清晰地表达任务之间的并行关系", 
          "不能清晰地确定任务之间的依赖关系", 
          "能清晰地确定影响进度的关键任务"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110801",
    type: "topic",
    title: "上午题-进度管理",
    category: "single-select",
    question: `在进行进度安排时, PERT图不能清晰地描述___，但可以给出哪些任务完成后才能开始另一些任务。
某项目X包含任务A、B、...、J，其 PERT图如下图所示(A=1表示任务A的持续时间是1天)，则项目X的关键路径是___。`,
    imgs: ["/docs/study/imgs/145-ti.png"],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "每个任务从何时开始", 
          "每个任务到何时结束", 
          "各任务之间的并行情况", 
          "各任务之间的依赖关系"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 2,
        list: ["A-D-H-J", "B-E-H-J", "B-F-J", "C-G-I-J"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110801",
    type: "topic",
    title: "上午题-进度管理",
    category: "single-select",
    question: `下图是一个软件项目的活动图。
其中顶点表示项目里程碑，连接顶点的边表示活动，边上的权重表示完成该活动所需要的时间(天)，
则活动___不在关键路径上，活动 BI 和 EG 的松弛时间分别是___。`,
    imgs: ["/docs/study/imgs/146-ti.png"],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["BD", "BI", "GH", "KL"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 4,
        list: ["0和1", "1和0", "0和2", "2和0"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110801",
    type: "topic",
    title: "上午题-进度管理",
    category: "single-select",
    question: `某项目的活动持续时间及其依赖关系如下表所示，则完成该项目的最少时间为___天。`,
    imgs: ["/docs/study/imgs/147-ti.png"],
    options: [
      {
        answer: `D`,
        col: 4,
        list: ["43", "45", "50", "55"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110804",
    type: "topic",
    title: "上午题-软件配置管理",
    category: "single-select",
    question: `配置管理贯穿软件开发的整个过程。以下内容中,不属于配置管理的是___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["版本控制", "风险管理", "变更管理", "配置状态报告"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110802",
    type: "topic",
    title: "上午题-风险管理",
    category: "single-select",
    question: `在风险管理中，通常需要进行风险监测，其目的不包括___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 1,
        list: ["消除风险", "评估所预测的风险是否发生", "保证正确实施了风险缓解步骤", "收集用于后续进行风险分析的信息"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-110901",
    type: "topic",
    title: "上午题-软件质量模型",
    category: "single-select",
    question: `在 ISO/IEC 软件质量模型中，可移植性是指与软件可从某环境移到另一环境的能力有关的一组属性，其子特性不包括___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["适应性", "易测试性", "易安装性", "易替换性"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-01",
    type: "topic",
    title: "上午题-sample",
    category: "single-select",
    question: `McCall 软件质量模型从软件产品的运行、修正和转移三个方面确定了11个质量特性。
其中___不属于产品运行方面的质量特性。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 4,
        list: ["正确性", "可靠性", "效率", "灵活性"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-111003",
    type: "topic",
    title: "上午题-软件工具",
    category: "single-select",
    question: `软件维护工具不包括___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["版本控制", "配置管理", "文档分析", "逆向工程"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-140102",
    type: "topic",
    title: "上午题-复杂度",
    category: "single-select",
    question: `根据渐进分析，表达式序列：
<span class='txt-func'>n<span class='txt-sup'>4</span></span>,
<span class='txt-func'>lgn</span>,
<span class='txt-func'>2<span class='txt-sup'>n</span></span>,
<span class='txt-func'>1000n</span>,
<span class='txt-func'>n<span class='txt-sup'>2/3</span></span>,
<span class='txt-func'>n!</span>
从低到高排序为___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 2,
        list: [
          `
<span class='txt-func'>lgn</span>,
<span class='txt-func'>1000n</span>,
<span class='txt-func'>n<span class='txt-sup'>2/3</span></span>,
<span class='txt-func'>2<span class='txt-sup'>n</span></span>,
<span class='txt-func'>n!</span>,
<span class='txt-func'>n<span class='txt-sup'>4</span></span>
          `, 
          `
<span class='txt-func'>n<span class='txt-sup'>2/3</span></span>,
<span class='txt-func'>1000n</span>,
<span class='txt-func'>lgn</span>,
<span class='txt-func'>n<span class='txt-sup'>4</span></span>,
<span class='txt-func'>n!</span>,
<span class='txt-func'>2<span class='txt-sup'>n</span></span>
          `,
        `
<span class='txt-func'>lgn</span>,
<span class='txt-func'>1000n</span>,
<span class='txt-func'>n<span class='txt-sup'>2/3</span></span>,
<span class='txt-func'>2<span class='txt-sup'>n</span></span>,
<span class='txt-func'>n<span class='txt-sup'>4</span></span>,
<span class='txt-func'>n!</span>
          `,
        `
<span class='txt-func'>lgn</span>,
<span class='txt-func'>n<span class='txt-sup'>2/3</span></span>,
<span class='txt-func'>1000n</span>,
<span class='txt-func'>n<span class='txt-sup'>4</span></span>,
<span class='txt-func'>2<span class='txt-sup'>n</span></span>,
<span class='txt-func'>n!</span>
          `,],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-140102",
    type: "topic",
    title: "上午题-复杂度",
    category: "single-select",
    question: `己知算法A的运行时间函数为<span class='txt-func'>T(n)=8T(n/2)+n<span class='txt-sup'>2</span></span>
，其中n表示问题的规模，则该算法的时间复杂度为___。
另己知算法B的运行时间函数为<span class='txt-func'>T(n)=XT(n/4)+n<span class='txt-sup'>2</span></span>
，其中n表示问题的规模。对充分大的n，若要算法B比算法A快，则X的最大值为___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 4,
        list: [
          "<span class='txt-func'>O(n)</span>", 
          "<span class='txt-func'>O(nlgn)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>3</span>)</span>", 
        ],
        fillAnswer: "",
        note: "<span class='txt-func'>log<span class='txt-sub'>2</span><span class='txt-sup'>8</span></span> = 3",
      },
      {
        answer: `C`,
        col: 4,
        list: ["15", "17", "63", "65"],
        fillAnswer: "",
        note: "<span class='txt-func'>log<span class='txt-sub'>4</span><span class='txt-sup'>X</span></span> < <span class='txt-func'>log<span class='txt-sub'>2</span><span class='txt-sup'>8</span></span> = <span class='txt-func'>log<span class='txt-sub'>4</span><span class='txt-sup'>64</span></span>",
      },
    ],
  },
  {
    id: "section-030102",
    type: "topic",
    title: "上午题-线性表",
    category: "single-select",
    question: `设有一个包含n个元素的有序线性表，在等概率情况下删除其中的一个元素。
若采用顺序存储结构，则平均需要移动___个元素；
若采用单链存储结构，则平均需要移动___个元素。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: ["1", "(n-1)/2", "logn", "n"],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `A`,
        col: 4,
        list: ["0", "1", "(n-1)/2", "n/2"],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-030103",
    type: "topic",
    title: "上午题-栈",
    category: "single-select",
    question: `若栈采用顺序存储方式，现有两个栈共享空间V[1...n]，top[i]代表i(i=1,2) 个栈的栈顶
(两个栈都空时 top[1]=1 top[2]=n)，栈1的底在V[1]，栈2的底在V[n]，则栈满 (即n个元素暂存在这两个栈)
的条件是___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 2,
        list: [
          "top[1]=top[2]", 
          "top[1]+top[2]==1", 
          "top[1]+top[2]==n", 
          "top[1]-top[2]==1", 
        ],
        fillAnswer: "",
        note: "top[1]代表该栈可填入的位置，top[2]代表栈顶的位置",
      },
    ],
  },
  {
    id: "section-030102",
    type: "topic",
    title: "上午题-线性表",
    category: "single-select",
    question: `对于线性表，相对于顺序存储，采用链表存储的缺点是___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 1,
        list: [
          "数据元素之间的关系需要占用存储空间，导致存储密度不高", 
          "表中结点必须占用地址连续的存储单元，存储密度不高", 
          "插入新元素时需要遍历整个链表, 运算的时间效率不高", 
          "删除元素时需要遍历整个链表，运算的时间效率不高"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-030103",
    type: "topic",
    title: "上午题-栈和队列",
    category: "single-select",
    question: `设有栈S和队列Q初始状态为空，数据元素序列 a,b,c,d,e,f 依次通过栈S且多个元素从S出栈后立即进入队列Q，
若出队的序列是b,d,e,c,a，则S中的元素最多时，栈底到栈顶的元素依次为___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "a,b,c", 
          "a,c,d", 
          "a,c,e,f", 
          "a,d,f,e"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-030104",
    type: "topic",
    title: "上午题-串",
    category: "single-select",
    question: `设S是一个长度为n的非空字符串，其中的字符各不相同，则其互异的非平凡子串(非空且不同于S本身)个数为___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 2,
        list: [
          "2n-1", 
          "n^2", 
          "n(n+1)/2", 
          "(n+2)(n-1)/2"
        ],
        fillAnswer: "",
        note: "从单个字母的n个字串，到长度为n-1的2个字串，总共(n+2)(n-1)/2个",
      },
    ],
  },
  {
    id: "section-030105",
    type: "topic",
    title: "上午题-模式匹配",
    category: "single-select",
    question: `在字符串的 KMP 模式匹配算法中。需先求解模式串的 next 函数值。其定义如下式所示;
j表示模式串中字符的序号(从1开始),若模式串P 为 'abaac'，则其next函数值为___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: [
          "01234", 
          "01122", 
          "01211", 
          "01111"
        ],
        fillAnswer: "",
        note: "i=0时为0，i=2时为1，i=3时，ab的最长公共前后缀为0+1=1，同理i=4时aba为2，i=5时abaa为2",
      },
    ],
  },
  {
    id: "section-030201",
    type: "topic",
    title: "上午题-数组",
    category: "single-select",
    question: `二维数组a[1..N, 1..N]可以按行存储或按列存储。
对于数组元素a[i,j] (1<=i, j<=N)，当___时，在按行和按列两种存储方式下，其偏移量相同。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: [
          "i≠j", 
          "i=j", 
          "i&gt;j", 
          "i&lt;j"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-030202",
    type: "topic",
    title: "上午题-矩阵",
    category: "single-select",
    question: `___是对稀疏矩阵进行压缩存储的方式。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 2,
        list: [
          "二维数组和双向链表", 
          "三元组顺序表和十字链表", 
          "邻接矩阵和十字链表", 
          "索引顺序表和双向链表"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-030301",
    type: "topic",
    title: "上午题-树",
    category: "single-select",
    question: `某树共有n个结点，其中所有分支结点的度为k(即每个非叶子结点的子树数目)，则该树中叶子结点的个数为___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "(n(k+1)-1)/k", 
          "(n(k+1)+1)/k", 
          "(n(k-1)+1)/k", 
          "(n(k-1)-1)/k", 
        ],
        fillAnswer: "",
        note: "由性质1可得，树中的总度数为 n-1，则度数不为0的节点数为 (n-1)/k，所以叶子节点个数为 n-(n-1)/k",
      },
    ],
  },
  {
    id: "section-030302",
    type: "topic",
    title: "上午题-二叉树",
    category: "single-select",
    question: `二叉树的高度是指其层数，空二叉树的高度为0，仅有根结点的二叉树高度为1。
若某二叉树中共有1024个结点，则该二叉树的高度是整数区间___中的任一值。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 2,
        list: [
          "(10,1024)", 
          "[10,1024]", 
          "(11,1024)", 
          "[11,1024]"
        ],
        fillAnswer: "",
        note: "完全二叉树",
      },
    ],
  },
  {
    id: "section-030302",
    type: "topic",
    title: "上午题-二叉树",
    category: "single-select",
    question: `具有3个节点的二叉树有5种，可推测出具有4个节点的二叉树有___种。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 4,
        list: [
          "10", 
          "11", 
          "14", 
          "15"
        ],
        fillAnswer: "",
        note: "卡特兰数 <span class='txt-func'>C<span class='txt-sup'>n</span><span class='txt-sub'>2n</span>/(n+1)</span>",
      },
    ],
  },
  {
    id: "section-030302",
    type: "topic",
    title: "上午题-二叉树",
    category: "single-select",
    question: `对下面的二叉树进行顺序存储(用数组MEM表示)，
己知结点A、B、C在MEM中对应元素的下标分别为1、2、3，那么结点D、E、F对应的数组元素下标为___。`,
    imgs: ["/docs/study/imgs/151-ti.png"],
    options: [
      {
        answer: `D`,
        col: 2,
        list: [
          "4、5、6", 
          "4、7、10", 
          "6、7、8", 
          "6、7、14"
        ],
        fillAnswer: "",
        note: "n节点的左节点为2n，右节点为2n+1",
      },
    ],
  },
  {
    id: "section-030303",
    type: "topic",
    title: "上午题-二叉树遍历",
    category: "single-select",
    question: `某二叉树的中序遍历为 {20, 30, 10, 50, 40}，先序遍历为 {10, 20, 30, 40, 50}，则后序遍历为___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "50, 40, 30, 20, 10", 
          "30, 20, 10, 50, 40", 
          "30, 20, 50, 40, 10", 
          "20, 30, 10, 40, 50"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-030304",
    type: "topic",
    title: "上午题-二叉排序树",
    category: "single-select",
    question: `可以构造出下图所示的二叉排序树的关键码序列是___。`,
    imgs: ["/docs/study/imgs/152-ti.png"],
    options: [
      {
        answer: `B`,
        col: 1,
        list: [
          "10 13 17 19 23 27 31 40 65 91", 
          "23 40 91 17 19 10 31 65 27 13", 
          "23 19 40 27 17 13 10 91 65 31", 
          "27 31 40 65 91 13 10 17 23 19"
        ],
        fillAnswer: "",
        note: "构造过程中 小于放置左子树，大于放置右子树",
      },
    ],
  },
  {
    id: "section-030306",
    type: "topic",
    title: "上午题-哈夫曼编码",
    category: "single-select",
    question: `己知一个文件中出现的各字符及其对应的频率如下表所示。
采用 Huffman 编码，则该文件中字符a和c的码长分别为___；字符序列 "110001001101" 的编码应为___。`,
    imgs: ["/docs/study/imgs/153-ti.png"],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "1和3", 
          "1和4", 
          "3和3", 
          "3和4"
        ],
        fillAnswer: "",
        note: "从最小的开始构建，小左大右，再重复构造哈夫曼树，再左标0右标1",
      },
      {
        answer: `A`,
        col: 4,
        list: [
          "face", 
          "bace", 
          "acde", 
          "fade"
        ],
        fillAnswer: "",
        note: "从左向右直接匹配",
      },
    ],
  },
  {
    id: "section-030305",
    type: "topic",
    title: "上午题-最优二叉树",
    category: "single-select",
    question: `以下关于哈夫曼树的叙述，正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 1,
        list: [
          "哈夫曼树一定是满二叉树，其每层结点数都达到最大值", 
          "哈夫曼树一定是平衡二叉树，其每个结点左右子树的高度差为-1、0或1", 
          "哈夫曼树中左孩子结点的权值小于父结点，右孩子结点的权值大于父结点", 
          "哈夫曼树中叶子结点的权值越小则距离树根越远，叶子结点的权值越大则距离树根越近"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-030401",
    type: "topic",
    title: "上午题-图",
    category: "single-select",
    question: `某简单无向连通图G的顶点数为n，则图G最少和最多分别有___条边。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 2,
        list: [
          "n, n^2/2", 
          "n-1, n*(n-1)/2", 
          "n, n*(n-1)/2", 
          "n-1, n^2/2"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-030402",
    type: "topic",
    title: "上午题-图的存储",
    category: "single-select",
    question: `对于如下所示的有向图，其邻接矩阵是一个___的矩阵，采用邻接链表存储时,
顶点1的表结点个数为2,顶点5的表结点个数为0,顶点2和3的表结点个数分别为___。`,
    imgs: ["/docs/study/imgs/154-ti.png"],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "5*5", 
          "5*7", 
          "7*5", 
          "7*7"
        ],
        fillAnswer: "",
        note: "节点个数",
      },
      {
        answer: `B`,
        col: 4,
        list: [
          "2, 1", 
          "2, 2", 
          "3, 4", 
          "4, 3"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-030403",
    type: "topic",
    title: "上午题-图的遍历",
    category: "single-select",
    question: `某有向图如下所示，从顶点 v1 出发对其迸行深度优先遍历，可能得到的遍历序列是___。
从顶点 v1 出发对其进行广度优先遍历，可能得到的遍历序列是___。`,
    imgs: ["/docs/study/imgs/155-ti.png"],
    options: [
      {
        answer: `D`,
        col: 4,
        list: [
          "①②③", 
          "①③④", 
          "①②④", 
          "②③④"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 4,
        list: [
          "①②", 
          "①③", 
          "②③", 
          "③④"
        ],
        fillAnswer: "",
        note: "广度肯定先看左右子节点",
      },
    ],
  },
  {
    id: "section-030403",
    type: "topic",
    title: "上午题-图的遍历",
    category: "single-select",
    question: `图G的邻接矩阵如下图所示(顶点依次为v0、v1、v2、v3、v4、v5)，G是___。
对G进行广度优先遍历可能的遍历序列为___。`,
    imgs: ["/docs/study/imgs/156-ti.png"],
    options: [
      {
        answer: `B`,
        col: 4,
        list: [
          "无向图", 
          "有向图", 
          "完全图", 
          "强连通图"
        ],
        fillAnswer: "",
        note: "非01表示，且只有v0到v1，没有v1到v0",
      },
      {
        answer: `A`,
        col: 2,
        list: [
          "v0、v1、v2、v3、v4、v5", 
          "v0、v2、v4、v5、v1、v3", 
          "v0、v1、v3、v5、v2、v4", 
          "v0、v2、v4、v2、v5、v1"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-030404",
    type: "topic",
    title: "上午题-拓扑排序",
    category: "single-select",
    question: `拓扑序列是有向无环图中所有顶点的一个线性序列。
若有向图中存在弧<V, W>或存在从顶点 V 到 W 的路径，则在该有向图的任拓扑序列中, V 一定在 W 之前。
下面有向图的拓扑序列是___。`,
    imgs: ["/docs/study/imgs/157-ti.png"],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "41235", 
          "43125", 
          "42135", 
          "41325"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-140202",
    type: "topic",
    title: "上午题-二分查找",
    category: "single-select",
    question: `对于有序表(8,15,19,23,26,31,40,65,91)，用二分法进行查找时，可能的关键字比较顺序为___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "26，23，19", 
          "26，8，19", 
          "26，40，65", 
          "26，31，40"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-030503",
    type: "topic",
    title: "上午题-哈希表",
    category: "single-select",
    question: `设散列函数为H(key)=Key%11，对于关键码序列(23,40,91,17,19,10,31,65,26)，用线件探查法解决冲突构造的哈希表为___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 1,
        list: [
          `
          <table>
            <tr>
              <td>哈希地址</td>
              <td>0</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
            </tr>
            <tr>
              <td>关键码</td>
              <td>10</td>
              <td>23</td>
              <td></td>
              <td>91</td>
              <td>26</td>
              <td></td>
              <td>17</td>
              <td>40</td>
              <td>19</td>
              <td>31</td>
              <td>65</td>
            </tr>
          </table>
          `, 
          `
          <table>
            <tr>
              <td>哈希地址</td>
              <td>0</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
            </tr>
            <tr>
              <td>关键码</td>
              <td>65</td>
              <td>23</td>
              <td></td>
              <td>91</td>
              <td>26</td>
              <td></td>
              <td>17</td>
              <td>40</td>
              <td>19</td>
              <td>31</td>
              <td>10</td>
            </tr>
          </table>
          `, 
          `
          <table>
            <tr>
              <td>哈希地址</td>
              <td>0</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
            </tr>
            <tr>
              <td>关键码</td>
              <td></td>
              <td>23</td>
              <td>10</td>
              <td>91</td>
              <td>26</td>
              <td></td>
              <td>17</td>
              <td>40</td>
              <td>19</td>
              <td>31</td>
              <td>65</td>
            </tr>
          </table>
          `, 
          `
          <table>
            <tr>
              <td>哈希地址</td>
              <td>0</td>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
              <td>8</td>
              <td>9</td>
              <td>10</td>
            </tr>
            <tr>
              <td>关键码</td>
              <td></td>
              <td>23</td>
              <td>65</td>
              <td>91</td>
              <td>26</td>
              <td></td>
              <td>17</td>
              <td>40</td>
              <td>19</td>
              <td>31</td>
              <td>10</td>
            </tr>
          </table>
          `, 
        ],
        fillAnswer: "",
        note: "10 构造时哈希值为 10%11=10，65 构造时 65%11=10，则必须 (65+1)%11=0",
      },
    ],
  },
  {
    id: "section-030601",
    type: "topic",
    title: "上午题-堆",
    category: "single-select",
    question: `n个关键码构成的序列{k1,k2,...,kn}，当且仅当满足下列关系时称其为堆。
    以下关键码序列中，___不是堆。`,
    imgs: ["/docs/study/imgs/158-ti.png"],
    options: [
      {
        answer: `C`,
        col: 1,
        list: [
          "15,25,21,53,73,65,33", 
          "15,25,21,33,73,65,53", 
          "73,65,25,21,15,53,33", 
          "73,65,25,33,53,15,21"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-140301",
    type: "topic",
    title: "上午题-插入排序",
    category: "single-select",
    question: `现需要对一个基本有序的数组进行排序，此时最适宜采用的算法为___排序算法，时间复杂度为___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "插入", 
          "快速", 
          "归并", 
          "堆"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `A`,
        col: 4,
        list: [
          `<span class="txt-func">O(n)</span>`, 
          `<span class="txt-func">O(nlgn)</span>`, 
          `<span class="txt-func">O(n<span class="txt-sup">2</span>)</span>`, 
          `<span class="txt-func">O(n<span class="txt-sup">2</span>lgn)</span>`, 
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-140301",
    type: "topic",
    title: "上午题-快速排序",
    category: "single-select",
    question: `对数组 A=(2,8,7,1,3,5,6,4) 用快速排序算法的划分方法进行一趟划分后得到的数组A为___(非递减排序,以最后个元素为基准元素)。
    进行一趟划分的计算时间为___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "(1,2,8,7,3,5,6,4)", 
          "(1,2,3,4,8,7,5,6)", 
          "(2,3,1,4,7,5,6,8)", 
          "(2,1,3,4,8,7,5,6)"
        ],
        fillAnswer: "",
        note: "快速排序，i,j的指针向中间靠",
      },
      {
        answer: `C`,
        col: 4,
        list: [
          "<span class='txt-func'>O(1)</span>", 
          "<span class='txt-func'>O(lgn)</span>", 
          "<span class='txt-func'>O(n)</span>", 
          "<span class='txt-func'>O(nlgn)</span>"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-140301",
    type: "topic",
    title: "上午题-归并排序",
    category: "single-select",
    question: `用插入排序和归并排序算法对数组 [3,1,4,1,5,9,6,5] 进行从小到大排序，则分别需要进行___次元素间比较。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "12，14", 
          "10，14", 
          "12，16", 
          "10，16"
        ],
        fillAnswer: "",
        note: "插入排序将待排元素与有序序列中的元素依次比较，归并排序将序列先分成最小子集，再合并，合并时依次对比两个序列的元素，移动小元素的指针",
      },
    ],
  },
  {
    id: "section-140301",
    type: "topic",
    title: "上午题-选择排序",
    category: "single-select",
    question: `用某排序方法对一元素序列进行非递减排序时，若该方法可保证在排序前后排序码相同者的相对位置不变，则称该排序方法是稳定的。
简单选择排序方法是不稳定的，___可以说明这个性质。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 2,
        list: [
          "21 48 21* 63 17", 
          "17 21 21* 48 63", 
          "63 31 48 21* 17", 
          "21* 17 48 63 21"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-070102",
    type: "topic",
    title: "上午题-UML",
    category: "single-select",
    question: `某电商系统在采用面向对象方法进行设计时，识别出网店、商品、购物车、订单、买家、库存、支付(微信、支付宝)等类。其中，购物车与商品之间适合采用___关系，网店与商品之间适合采用___关系。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 4,
        list: [
          "关联", 
          "依赖", 
          "组合", 
          "聚合"
        ],
        fillAnswer: "",
        note: "可独立存在",
      },
      {
        answer: `C`,
        col: 4,
        list: [
          "关联", 
          "依赖", 
          "组合", 
          "聚合"
        ],
        fillAnswer: "",
        note: "网店倒闭了，商品会下架",
      },
    ],
  },
  {
    id: "section-070102",
    type: "topic",
    title: "上午题-UML",
    category: "single-select",
    question: `采用面向对象方法进行系统开发时，需要对两者之间关系创建新类的是___。`,
    imgs: [],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "汽车和座位", 
          "主人和宠物", 
          "医生和病人", 
          "部门和员工"
        ],
        fillAnswer: "",
        note: "实体间关系为多对多",
      },
    ],
  },
  {
    id: "section-070201",
    type: "topic",
    title: "上午题-类图",
    category: "single-select",
    question: `某类图如图所示，下列错误的是___。`,
    imgs: ["/docs/study/imgs/163-ti.png"],
    options: [
      {
        answer: `D`,
        col: 1,
        list: [
          "一个A1的对象可能与一个A2的对象关联", 
          "一个A的非直接对象可能与一个A1的对象关联", 
          "类B1的对象可能通过A2与C1的对象关联", 
          "有可能A的直接对象与B1的对象关联"
        ],
        fillAnswer: "",
        note: "抽象类不能实例化",
      },
    ],
  },
  {
    id: "section-070201",
    type: "topic",
    title: "上午题-类图",
    category: "single-select",
    question: `某类图如图所示，该UML图为___，下列叙述错误的是___。`,
    imgs: ["/docs/study/imgs/164-ti.png"],
    options: [
      {
        answer: `B`,
        col: 4,
        list: [
          "对象图", 
          "类图", 
          "组件图", 
          "部署图"
        ],
        fillAnswer: "",
        note: "对象图会包含实例的名称",
      },
      {
        answer: `A`,
        col: 1,
        list: [
          "如果B的一个实例被删除，所有包含A的实例都被删除", 
          "A的一个实例可能与B的一个实例关联", 
          "B的一个实例可被唯一的一个A的实例所包含", 
          "B的一个实例可能与B的另外两个实例关联", 
        ],
        fillAnswer: "",
        note: "A选项中 A为整体B为部分，表示A被删除则B会被删除",
      },
    ],
  },
  {
    id: "section-070203",
    type: "topic",
    title: "上午题-用例图",
    category: "single-select",
    question: `如下所示的UML图中，(I)是___，(II)是___，(III)是___。`,
    imgs: ["/docs/study/imgs/165-ti.png"],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "参与者", 
          "用例", 
          "泛化关系", 
          "包含关系"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 4,
        list: [
          "参与者", 
          "用例", 
          "泛化关系", 
          "包含关系"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 4,
        list: [
          "参与者", 
          "用例", 
          "泛化关系", 
          "包含关系"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-070204",
    type: "topic",
    title: "上午题-序列图",
    category: "single-select",
    question: `如下所示的UML图中，该图为___，用于展示系统中___。`,
    imgs: ["/docs/study/imgs/166-ti.png"],
    options: [
      {
        answer: `C`,
        col: 4,
        list: [
          "用例图", 
          "活动图", 
          "序列图", 
          "交互图"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 2,
        list: [
          "一个用例和一个对象的行为", 
          "一个用例和多个对象的行为", 
          "多个用例和一个对象的行为", 
          "多个用例和多个对象的行为"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-070205",
    type: "topic",
    title: "上午题-通信图",
    category: "single-select",
    question: `如下所示的UML图中，该图为___，用于展示系统中___。
Mapping对象获取汽车当前位置 (GPS Location)的消息为___。`,
    imgs: ["/docs/study/imgs/167-ti.png"],
    options: [
      {
        answer: `C`,
        col: 4,
        list: [
          "类图", 
          "组件图", 
          "通信图", 
          "部署图"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `A`,
        col: 2,
        list: [
          "对象之间的消息流及其顺序", 
          "完成任务所进行的活动", 
          "对象的状态转换及其事件顺序", 
          "对象之间信息的时间顺序"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `D`,
        col: 2,
        list: [
          "1:getGraphic()", 
          "2:getCarPos()", 
          "1.1:CurrentArea()", 
          "2.1:getCarLocation()"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-070206",
    type: "topic",
    title: "上午题-状态图",
    category: "single-select",
    question: `某软件系统限定: 用户登录失败的次数不能超过3次，采用如下所示的 UML状态图 对用户登录状态进行建模。
假设活动状态时 Logging in, 那么当 Valid Entry 发生时___。
其中, [tries<3] 和 triest++ 分别为___和___。`,
    imgs: ["/docs/study/imgs/168-ti.png"],
    options: [
      {
        answer: `B`,
        col: 1,
        list: [
          "保持在 Logging in 状态", 
          "若 [tries<3] 为 true，则 Logging in 变为下一个活动状态", 
          "Logging in 立刻变为下一个活动状态", 
          "若 tries=3 为 true，则 Logging in 变为下一个活动状态", 
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 4,
        list: [
          "状态", 
          "转换", 
          "监护条件", 
          "转换后效果"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 4,
        list: [
          "状态", 
          "转换", 
          "监护条件", 
          "转换后效果"
        ],
        fillAnswer: "",
        note: "转换=触发事件+监护条件+动作",
      },
    ],
  },
  {
    id: "section-070206",
    type: "topic",
    title: "上午题-状态图",
    category: "single-select",
    question: `当UML状态图用于对系统、类或用例的动态方面建模时，通常是对___建模。
以下 UML 状态图中，假设活动的状态是 A, 事件 b=0 发生并且 a>5，发生条件是 C状态到D状态 的转换条件的是___，D变为活动的状态。
有关状态图的叙述中，不正确的是___。`,
    imgs: ["/docs/study/imgs/169-ti.png"],
    options: [
      {
        answer: `B`,
        col: 2,
        list: [
          "系统的词汇", 
          "反应型对象", 
          "活动流程", 
          "对象快照"
        ],
        fillAnswer: "",
        note: "",
      },
       {
        answer: `B`,
        col: 1,
        list: [
          "一旦状态 A 的 exit 动作完成或如果当前执行 do 动作，则终止执行", 
          "一旦状态 A 和 B 的所有动作完成", 
          "一旦正在进行的状态 A 完成", 
          "一旦状态 B的 exit 动作完成"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `D`,
        col: 1,
        list: [
          "动作可以在状态内执行，也可以在状态转换时执行", 
          "当触发转换的事件发生并且转换没有指定的监护条件时，对象将离开当前状态，并且其 do 动作终止", 
          "when (b=5)称为时间事件", 
          "状态由事件触发"
        ],
        fillAnswer: "",
        note: "转换由事件触发",
      },
    ],
  },
  {
    id: "section-070207",
    type: "topic",
    title: "上午题-活动图",
    category: "single-select",
    question: `如下所示的UML图中，该图为___，(I)是___，(II)是___。`,
    imgs: ["/docs/study/imgs/170-ti.png"],
    options: [
      {
        answer: `D`,
        col: 4,
        list: [
          "序列图", 
          "状态图", 
          "通信图", 
          "活动图"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `A`,
        col: 4,
        list: [
          "合并分岔", 
          "分支", 
          "合并汇合", 
          "流"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 4,
        list: [
          "分支条件", 
          "监护表达式", 
          "动作名", 
          "流名称"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-070208",
    type: "topic",
    title: "上午题-构件图",
    category: "single-select",
    question: `如下所示的UML图中，该图为___，用于展示___，①和②分别表示___。`,
    imgs: ["/docs/study/imgs/171-ti.png"],
    options: [
      {
        answer: `B`,
        col: 4,
        list: [
          "类图", 
          "组件图", 
          "通信图", 
          "部署图"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 1,
        list: [
          "一组对象、接口、协作和之间的关系", 
          "收发消息的对象的结构组织", 
          "组件之间的组织和依赖", 
          "面向对象系统的物理模型"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 2,
        list: [
          "供接口和供接口", 
          "需接口和需接口", 
          "供接口和需接口", 
          "需接口和供接口", 
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-070209",
    type: "topic",
    title: "上午题-部署图",
    category: "single-select",
    question: `如果要表示待开发软件系统中软件组件和硬件之间的物理关系，通常采用 UML 中的___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: [
          "组件图", 
          "部署图", 
          "类图", 
          "网络图"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-080401",
    type: "topic",
    title: "上午题-抽象工厂模式",
    category: "single-select",
    question: `为图形用户界面 (GUI) 组件定义不同平台的并行类层次结构，适合采用___模式。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 2,
        list: [
          "享元 (Flyweight)", 
          "抽象工厂 (Abstract Factory)", 
          "外观 (Facade)", 
          "装饰器 (Decorator)"
        ],
        fillAnswer: "",
        note: `享元模式是通过共享对象减少内存占用，用于大量细粒度对象，GUI 系统在不同平台上 Win或Mac 有不同实现`,
      },
    ],
  },
  {
    id: "section-080501",
    type: "topic",
    title: "上午题-生成器模式",
    category: "single-select",
    question: `某快餐厅主要制作并出售儿童套餐,一般包括主餐(各类比萨)、饮料和玩具。
其餐品种类可能不同但制作过程相同。前台服务员(Waiter)调度厨师制作套餐。欲开发软件，实现该制作过程，设计如下所示类图。
<p>该设计采用___模式，将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。</p>
<p>其中，___构造一个使用 Builder 接口的对象。</p>
<p>该模式属于___模式，该模式适用于___的情况。</p>`,
    imgs: ["/docs/study/imgs/173-ti.png"],
    options: [
      {
        answer: `A`,
        col: 2,
        list: [
          "生成器 (Builder)", 
          "抽象工厂 (Abstract Factory)", 
          "原型 (Prototype)", 
          "工厂方法 (Factory Method)"
        ],
        fillAnswer: "因为复杂对象的构建与表示分离",
        note: "",
      },
      {
        answer: `C`,
        col: 4,
        list: [
          "PizzaBuilder", 
          "SpicyPizzaBuilder", 
          "Waiter", 
          "Pizza"
        ],
        fillAnswer: "",
        note: "导演创建对象",
      },
      {
        answer: `A`,
        col: 4,
        list: [
          "创建型对象", 
          "结构型对象", 
          "行为型对象", 
          "结构型类"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `D`,
        col: 1,
        list: [
          "当一个系统应该独立于它的产品创建、构成和表示时", 
          "当一个类希望由它的子类来指定它所创建的对象的时候", 
          "当要强调一系列相关的产品对象的设计以便迸行联合使用时", 
          "当构造过程必须允许被构造的对象有不同的表示时"
        ],
        fillAnswer: "",
        note: "工厂方法:当一个类希望由它的子类来指定它所创建的对象的时候 其余为 抽象工厂",
      },
    ],
  },
  {
    id: "section-080901",
    type: "topic",
    title: "上午题-桥接模式",
    category: "single-select",
    question: `欲开发一个绘图软件，要求使用不同的绘图程序绘制不同的图形，该绘图软件的扩展性要求将不断扩充新的图形和新的绘图程序。
以绘制直线和图形为例，得到如下图所示的类图。
该设计采用___模式将抽象部分与其实现部分分离，使它们都可以独立地变化。
其中___定义了实现类地接口，该模式适用于___的情况，该模式属于___模式。`,
    imgs: ["/docs/study/imgs/174-ti.png"],
    options: [
      {
        answer: `C`,
        col: 2,
        list: [
          "适配器 (Adapter)", 
          "装饰 (Decorator)", 
          "桥接 (Bridge)", 
          "组合 (Composite)"
        ],
        fillAnswer: "",
        note: "将抽象部分与其实现部分分离",
      },
      {
        answer: `D`,
        col: 2,
        list: [
          "Shape", 
          "Circle 和 Rectangle", 
          "V1Drawing 和 V2Drawing", 
          "Drawing"
        ],
        fillAnswer: "",
        note: "抽象类的接口 实现类接口",
      },
      {
        answer: `A`,
        col: 1,
        list: [
          "不希望在抽象和它的实现部分之间有一个固定绑定关系", 
          "想表示对象的部分-整体层次结构", 
          "想使用一个己经存在的类, 而它的接口不符合要求", 
          "在不影响其他对象的悄况下，以动态、透明的方式给单个对象添加职责"
        ],
        fillAnswer: "",
        note: "B-组合模式 C-适配器模式 D-装饰模式",
      },
      {
        answer: `B`,
        col: 2,
        list: [
          "创建型对象", 
          "结构型对象", 
          "行为型对象", 
          "结构型类"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-082101",
    type: "topic",
    title: "上午题-观察者模式",
    category: "single-select",
    question: `观察者 (Observer) 模式适用于___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 1,
        list: [
          "访问一个聚合对象的内容而无须暴露它的内部表示", 
          "减少多个对象或类之闻的通信复杂性", 
          "将对象的状态恢复到先前的状态", 
          "一对多对象依赖关系，当一个象修改后，依赖它的对象都自动得到通知"
        ],
        fillAnswer: "",
        note: "A-迭代器模式 B-中介者模式 C-备忘录模式",
      },
    ],
  },
  {
    id: "section-082301",
    type: "topic",
    title: "上午题-策略模式",
    category: "single-select",
    question: `在设计某购物中心的收银软件系统时，要求能够支持在不同时堋推出打折、返利、满减等下同促销活动，则适合采用___模式。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 2,
        list: [
          "策略 (Strategy)", 
          "访问者 (Visitor)", 
          "观察者 (Obserer)", 
          "中介者 (Mediator)"
        ],
        fillAnswer: "",
        note: "需求变化时只需增加新的策略类，不影响原有代码",
      },
    ],
  },
  {
    id: "section-140503",
    type: "topic",
    title: "上午题-最大子段和问题",
    category: "single-select",
    question: `最大子段和问题描述为：在n个整数(包含负数)的数组A中,求和最大的非空连续子数组。
如数组 A=(-2, 11, -4, 13, -5, -2)，其中子数组 B=(11, -4, 13) 具有最大子段和20。
求解该问题，可以将数组分为两个n/2个整数的子数组，最大子段或或在前半段，或在后半段，或跨越中间元素。
通过该方法继续划分问题，直至最后求出最大子段和，该算法的时间复杂度为___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "<span class='txt-func'>O(nlgn)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>lgn)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>3</span>)</span>", 
        ],
        fillAnswer: "",
        note: "分治法把长度为 n 的数组分成两个长度约为 n/2 的子数组，递归求解左右两边的最大子段和，并且还需线性时间 O(n) 计算跨越中点的最大子段和（从中点向左右扫描）。因此递归关系为：T(n)=2T(n/2)+O(n)，解得 O(nlgn)",
      },
    ],
  },
  {
    id: "section-140602",
    type: "topic",
    title: "上午题-0-1背包问题",
    category: "single-select",
    question: `考虑一个背包问题。
共有n=5个物品，背包容量为W=10,物品的重量和价值分别为：w={2,2,6,5,4}，v={6,3,5,4,6}，求背包问题的最大装包价值。
若此为0-1背包问题，分析该问题具有最优子结构，定义递归式如下图所示。其中c(i,j)表示i个物品，容量为j的0-1背包问题的最大装包价值, 最终要求解c(n,W)。
<p>采用自底向上的动态规划方法求解，得到最大装包价值为___，算法的时间复杂度为___。</p>
<p>若此为部分背包问题，首先采用归并排序算法，根据物品的单位重量价值从大到小排序，然后依次将物品放入背包直至所有物品放入背包中或者背包再无容量。
则得到的最大装包价值为___，算法的时间复杂度为___。</p>`,
    imgs: ["/docs/study/imgs/202-ti.png"],
    options: [
      {
        answer: `C`,
        col: 4,
        list: [
          "11", 
          "14", 
          "15", 
          "16.67"
        ],
        fillAnswer: "",
        note: "此时选择物品 1,2,5，总重量10，总价值15",
      },
      {
        answer: `A`,
        col: 4,
        list: [
          "<span class='txt-func'>O(nW)</span>", 
          "<span class='txt-func'>O(nlgn)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>lgn)</span>", 
          "<span class='txt-func'>O(nlgnW)</span>", 
        ],
        fillAnswer: "",
        note: "两个嵌套的for循环",
      },
      {
        answer: `D`,
        col: 4,
        list: [
          "11", 
          "14", 
          "15", 
          "16.67"
        ],
        fillAnswer: "",
        note: "取最大单位价值依次放入",
      },
      {
        answer: `B`,
        col: 4,
        list: [
          "<span class='txt-func'>O(nW)</span>", 
          "<span class='txt-func'>O(nlgn)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>lgn)</span>", 
          "<span class='txt-func'>O(nlgnW)</span>", 
        ],
        fillAnswer: "",
        note: "归并排序时间复杂度",
      },
    ],
  },
  {
    id: "section-140603",
    type: "topic",
    title: "上午题-矩阵连乘",
    category: "single-select",
    question: `己知矩阵 Am*n 和 Bn*p 相乘的时间复杂度为O(mnp)。
矩阵相乘满足结合律，如三个矩阵 A,B,C 相乘的顺序可以是 (A*B)*C，也可以是 A* (B*C)。
不同的相乘顺序所需进行的乘法次数可能有很大的差别，因此确定n个矩阵相乘的最优计算顺序是一个非常重要的问题。
己知确定n个矩阵A1A2...An相乘的计算顺序具有最优子结构，
即A1A2...An的最优计算顺序包含其孑问题A2A2...Ak和Ak+1Ak+2...An (l<k<n) 的最优计算顺序。
可以列出其递归式为如下图所示。
其中，Ai的维度为Pi-1*Pi，m[i,j]表示AiAi+1...Aj最优计算顺序的相乘次数。
先采用自底向上的方法求n个矩阵相乘的最优计算顺序。
则求解该问题的算法设计策略为___。算法的时间复杂度为___，空间复杂度为___。
给定一个实例, (P0P1...Ps) = (20,15,4,10,20,25)，最优计算顺序为___。`,
    imgs: ["/docs/study/imgs/200-ti.png"],
    options: [
      {
        answer: `B`,
        col: 4,
        list: [
          "分治法", 
          "动态规划法", 
          "贪心法", 
          "回溯法"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 4,
        list: [
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>lgn)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>3</span>)</span>", 
          "<span class='txt-func'>O(2<span class='txt-sup'>n</span>)</span>", 
        ],
        fillAnswer: "",
        note: "复杂度主要取决于填表过程，三个嵌套的for循环",
      },
      {
        answer: `A`,
        col: 4,
        list: [
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>lgn)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>3</span>)</span>", 
          "<span class='txt-func'>O(2<span class='txt-sup'>n</span>)</span>", 
        ],
        fillAnswer: "",
        note: "空间复杂度主要取决于存储计算结果的表格，二维表格",
      },
      {
        answer: `D`,
        col: 1,
        list: [
          "(((A1xA2)xA3)xA4)xA5", 
          "A1x(A2x(A3x(A4xA5)))", 
          "((A1xA2)xA3)x(A4xA5", 
          "(A1xA2)x((A3xA4)xA5)", 
        ],
        fillAnswer: "",
        note: "A1(20x15) A2(15x4) A3(4x10) A4(10x20) A5(20x25)， 最优计算顺序为 (A1xA2)x((A3xA4)xA5)，相乘次数为 20*15*4 + 20*10*25 + 20*4*25 = 2700",
      },
    ],
  },
  {
    id: "section-140604",
    type: "topic",
    title: "上午题-最长公共子串",
    category: "single-select",
    question: `求解两个长度为n的序列X和Y的一个最长公共序列 (如序列 ABCBDAB 和 BDCABA 的一个最长公共子序列为 BCBA)
可以采用多种计算方法。
如可以采用蛮力法，对X的每一个子序列，判断其是否也是Y的子序列，最后求出最长的即可，该方法的时间复杂度为___。
经分析发现该问题具有最优子结构，可以定义序列长度分别为1和j的两个序列X和Y的最长公共子序列的长度为 C[i,j]，如下式所示。
采用自底向上的方法实现该算法，则时间复杂度为___。`,
    imgs: ["/docs/study/imgs/201-ti.png"],
    options: [
      {
        answer: `D`,
        col: 4,
        list: [
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>lgn)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>3</span>)</span>", 
          "<span class='txt-func'>O(n2<span class='txt-sup'>n</span>)</span>", 
        ],
        fillAnswer: "",
        note: "蛮力法中，序列X的子序列数为<span class='txt-func'>2<span class='txt-sup'>n</span></span>，判断子序列是否在序列Y中的时间为n，因此时间复杂度为<span class='txt-func'>O(n2<span class='txt-sup'>n</span>)</span>",
      },
      {
        answer: `A`,
        col: 4,
        list: [
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>lgn)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>3</span>)</span>", 
          "<span class='txt-func'>O(n2<span class='txt-sup'>n</span>)</span>", 
        ],
        fillAnswer: "",
        note: "复杂度主要取决于填表过程，两个嵌套的for循环",
      },
    ],
  },
  {
    id: "section-140501",
    type: "topic",
    title: "上午题-分治法",
    category: "single-select",
    question: `现有16枚外形相同的硬币。其中有一枚比真币的重量轻的假币，若采用分治法找出这枚假币，至少比较___次才能够找出该假币。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "3", 
          "4", 
          "5", 
          "6"
        ],
        fillAnswer: "",
        note: "按“三分”思想分组并称量，第一步称 6 vs 6，若不平衡，则假币在较轻的 6 枚中，剩下两次比较足以定位，若平衡，则假币在剩下的 4 枚中，用两次比较可找出",
      },
    ],
  },
  {
    id: "section-140701",
    type: "topic",
    title: "上午题-贪心法",
    category: "single-select",
    question: `在一条笔直公路的一边有许多房子，现要安装消防栓，每个消防栓的覆盖范围远大于房子的面积，如下图所示。
现求解能覆盖所有房子的最少消防栓数和安装方案 (问题求解过程中，可将房子和消防栓均视为直线上的点)。
该问题求解算法的基本思路为: 从左端的第一栋房子开始，在其右侧 m 米处安装一个消防栓，去掉被该消防栓覆盖的所有房子，在剩余的房子中重复上述操作，直到所有房子被覆盖。
算法采用的设计策略为___；对应的时间复杂度为___。
假设公路起点 A 的坐标为0，消防栓的覆盖范围(半径)为20米，10栋房子的坐标为 (10,20,30,35,60,80,160,210,260,300)，单位为米。
根据上述算法，共需要安装___个消防栓，以下关于该求解算法的叙述中，正确的是___。`,
    imgs: ["/docs/study/imgs/203-ti.png"],
    options: [
      {
        answer: `C`,
        col: 4,
        list: [
          "分治", 
          "动态规划", 
          "贪心", 
          "回溯"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `B`,
        col: 4,
        list: [
          "<span class='txt-func'>O(lgn)</span>", 
          "<span class='txt-func'>O(n)</span>", 
          "<span class='txt-func'>O(nlgn)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>)</span>", 
        ],
        fillAnswer: "",
        note: "复杂度主要取决于遍历房子",
      },
       {
        answer: `B`,
        col: 4,
        list: [
          "4", 
          "5", 
          "6", 
          "7"
        ],
        fillAnswer: "",
        note: "",
      },
       {
        answer: `A`,
        col: 2,
        list: [
          "肯定可以求得问题的一个最优解", 
          "可以求得问题的所有最优解", 
          "对有些实例，可能得不到最优解", 
          "只能得到近似最优解"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-140702",
    type: "topic",
    title: "上午题-部分背包问题",
    category: "single-select",
    question: `考虑下述背包问题的实例。
有5件物品，背包容量为100，每件物品的价值和重量如下表所示，
并已经按照物品的单位重量价值从大到小排好序，根据物品单位重量价值大优先的策略装入背包中，则采用了___设计策略。
考虑0/1背包问题 (每件物品或者全部装入背包或者全部不装入背包) 和部分背包问题 (物品可以部分装入背包) 求解该实例得到的最大价值分别为___。`,
    imgs: ["/docs/study/imgs/204-ti.png"],
    options: [
      {
        answer: `B`,
        col: 4,
        list: [
          "分治", 
          "贪心", 
          "动态规划", 
          "回溯"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 4,
        list: [
          "605, 630", 
          "605, 605", 
          "430, 630", 
          "630, 430", 
        ],
        fillAnswer: "",
        note: "计算过程：部分背包问题：取物品1、2、3、4全部装入，剩余20容量装入物品5的2/5，价值为100+120+60+240+110=630；0/1背包问题：取物品1、2、4全部装入，价值为100+120+240=460",
      },
    ],
  },
  {
    id: "section-140703",
    type: "topic",
    title: "上午题-活动选择",
    category: "single-select",
    question: `现需要申请一些场地举办一批活动, 每个活动有开始时间和结束时间。
在同一个场地, 如果一个活动结束之前, 另一个活动不能开始, 即两个活动冲突。
若活动A从1时间开始, 5时间结束, 活动B从5时间开始, 8时间结束, 则活动A和B不冲突。
现要计算n个活动需要的最少场地数。
求解该问题的基本思路如下 (假设需要场地数为m, 活动数为n, 场地集合为P1, P2, …, Pm) , 初始条件P均无活动安排：
<p>(1) 采用快速排序算法对n个活动的开始时间从小到大排序, 得到活动a1, a2, …, an。对每个活动ai,i从1到n, 重复步骤(2),(3),(4)；</p>
<p>(2) 从P1开始, 判断ai与P1的最后一个活动是否冲突, 若冲突, 考虑下一个场地P2, …；</p>
<p>(3) 一旦发现ai与某个Pj的最后一个活动不冲突, 则将aj安排到Pj, 考虑下一个活动；</p>
<p>(4) 若ai与所有已安排活动的Pj的最后一个活动均冲突, 则将ai安排到一个新的场地, 考虑下一个活动；</p>
<p>(5) 将n减去没有安排活动的场地数即可得到所用的最少场地数。</p>
算法首先采用快速排序算法进行排序, 其算法设计策略是___；后面步骤采用的算法设计策略是___。整个算法的时间复杂度是___。
下表给出了n=11的活动集合, 根据上述算法, 得到最少的场地数为___。`,
    imgs: ["/docs/study/imgs/207-ti.png"],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "分治", 
          "动态规划", 
          "贪心", 
          "回溯"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `C`,
        col: 4,
        list: [
          "分治", 
          "动态规划", 
          "贪心", 
          "回溯"
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `D`,
        col: 4,
        list: [
          "<span class='txt-func'>O(lgn)</span>", 
          "<span class='txt-func'>O(n)</span>", 
          "<span class='txt-func'>O(nlgn)</span>", 
          "<span class='txt-func'>O(n<span class='txt-sup'>2</span>)</span>", 
        ],
        fillAnswer: "",
        note: "快排时间复杂度为O(nlgn)，后续步骤为O(n<span class='txt-sup'>2</span>)，整体时间复杂度为O(n<span class='txt-sup'>2</span>)",
      },
      {
        answer: `B`,
        col: 4,
        list: [
          "4", 
          "5", 
          "6", 
          "7"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-080103",
    type: "topic",
    title: "下午题-设计模式",
    category: "fill",
    question: `
<p>阅读下列说明和代码，将代码补全</p>
<p><b>[说明]</b></p>
<p>在线支付是电子商务的一个重要环节, 不同的电子商务平台提供了不同的支付接口。
现在需要整合不同电子商务平台的支付接口, 使得客户在不同平台上购物时, 不需要关心具体的支付接口。
拟采用中介者 (Mediator) 设计模式来实现该需求, 所设计的类图如图所示。</p>
<p><b>[代码]</b></p>
<div class="note-codes">
  <div>
    <p>import java.util.*;</p>

    <p style="margin-top: 10px"></p>
    <p>interface WebServiceMediator {</p>
      <p style="padding-left: 20px">public ___;</p>
      <p style="padding-left: 20px">public void SetAmazon (WebService amazon);</p>
      <p style="padding-left: 20px">public void SetEbay (WebService ebay);</p>
    <p>}</p>

    <p style="margin-top: 10px"></p>
    <p>class ConcreteServiceMediator implements WebServiceMediator {</p>
      <p style="padding-left: 20px">private webService amazon;</p>
      <p style="padding-left: 20px">private WebService ebay;</p>
      <p style="margin-top: 10px"></p>
      <p style="padding-left: 20px">public ConcreteServiceMediator() {</p>
      <p style="padding-left: 40px">amazon = null;</p>
      <p style="padding-left: 40px">ebay = null;</p>
      <p style="padding-left: 20px">}</p>
      <p style="margin-top: 10px"></p>
      <p style="padding-left: 20px">public void SetAmazon(WebService amazon) {</p>
      <p style="padding-left: 40px">this.amazon = amazon;</p>
      <p style="padding-left: 20px">}</p>
      <p style="margin-top: 10px"></p>
      <p style="padding-left: 20px">public void SetEbay(WebService ebay) {</p>
      <p style="padding-left: 40px">this.ebay = ebay;</p>
      <p style="padding-left: 20px">}</p>
      <p style="margin-top: 10px"></p>
      <p style="padding-left: 20px">public void buy(double money, WebService service) {</p>
      <p style="padding-left: 40px">if (service == amazon)</p>
      <p style="padding-left: 60px">amazon.search(money);</p>
      <p style="padding-left: 40px">else</p>
      <p style="padding-left: 60px">ebay.search(money);</p>
      <p style="padding-left: 20px">}</p>
    <p>}</p>
  </div>

  <div>
    <p style="margin-top: 10px"></p>
    <p>abstract class WebService {</p>
    <p style="padding-left: 20px">protected ___ mediator;</p>
    <p style="padding-left: 20px">public abstract void SetMediator(WebServiceMediator mediator);</p>
    <p style="padding-left: 20px">public ___;</p>
    <p style="padding-left: 20px">public abstract void search(double money);</p>
    <p>}</p>

    <p style="margin-top: 10px"></p>
    <p>class Amazon extends WebService {</p>
    <p style="padding-left: 20px">public void SetMediator(WebServiceMediator mediator) {</p>
    <p style="padding-left: 40px">this.mediator = mediator;</p>
    <p style="padding-left: 20px">}</p>
    <p style="margin-top: 10px"></p>
    <p style="padding-left: 20px">public void buyService(double money) {</p>
    <p style="padding-left: 40px">___;</p>
    <p style="padding-left: 20px">}</p>
    <p style="margin-top: 10px"></p>
    <p style="padding-left: 20px">public void search(double money) {</p>
    <p style="padding-left: 40px">system.out.printIn("Amazon receive: " + money);</p>
    <p style="padding-left: 20px">}</p>
    <p>}</p>

    <p style="margin-top: 10px"></p>
    <p>class Ebay extends WebService {</p>
    <p style="padding-left: 20px">public void SetMediator(WebServiceMediator mediator) {</p>
    <p style="padding-left: 40px">this.mediator = mediator;</p>
    <p style="padding-left: 20px">}</p>
    <p style="margin-top: 10px"></p>
    <p style="padding-left: 20px">public void buyService(double money) {</p>
    <p style="padding-left: 40px">___;</p>
    <p style="padding-left: 20px">}</p>
    <p style="margin-top: 10px"></p>
    <p style="padding-left: 20px">public void search(double money) {</p>
    <p style="padding-left: 40px">system.out.printIn("Ebay receive: " + money);</p>
    <p style="padding-left: 20px">}</p>
    <p>}</p>
  </div>
</div>
`,
    imgs: ["/docs/study/imgs/209-ti.png"],
    options: [
      {
        answer: `void buy(double money, WebService service)`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `WebServiceMediator`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `abstract void buyService(double money)`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "使用抽象方法声明 buyService，由子类实现",
      },
      {
        answer: `mediator.buy(money, this)`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "使用中介者的buy方法进行购买",
      },
      {
        answer: `mediator.buy(money, this)`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-080103",
    type: "topic",
    title: "下午题-设计模式",
    category: "fill",
    question: `
<p>阅读下列说明和代码，将代码补全</p>
<p><b>[说明]</b></p>
<p>某软件公司欲开发一款汽车竞速类游戏, 需模拟长轮胎和短轮胎急刹车时在路面上留下的不同痕迹，并考虑后续能模拟更多种轮胎急刹车时的痕迹。
现采用策略(Strategy)设计模式来实现该需求，所设计的类图如图所示。</p>
<p><b>[代码]</b></p>
<div class="note-codes">
  <div>
    <p>import java.util.*;</p>

    <p style="margin-top: 10px"></p>
    <p>interface BrakeBehavior {</p>
      <p style="padding-left: 20px">public ___;</p>
      <p style="padding-left: 20px">/* 其余代码省略 */</p>
    <p>}</p>

    <p style="margin-top: 10px"></p>
    <p>class LongWheelBrake implements BrakeBehavior {</p>
      <p style="padding-left: 20px">public void stop() { System.out.println("模拟长轮胎刹车痕迹！"); }</p>
      <p style="padding-left: 20px">/* 其余代码省略 */</p>
    <p>}</p>

    <p style="margin-top: 10px"></p>
    <p>class ShortWheelBrake implements BrakeBehavior {</p>
      <p style="padding-left: 20px">public void stop() { System.out.println("模拟短轮胎刹车痕迹！"); }</p>
      <p style="padding-left: 20px">/* 其余代码省略 */</p>
    <p>}</p>
  </div>
  <div>
    <p>abstract class Car {</p>
      <p style="padding-left: 20px">protected ___ wheel;</p>
      <p style="padding-left: 20px">public void brake() { ___; }</p>
      <p style="padding-left: 20px">/* 其余代码省略 */</p>
    <p>}</p>
    <p style="margin-top: 10px"></p>
    <p>class ShortWheelCar extgend Car {</p>
      <p style="padding-left: 20px">public ShortWheelCar(BrakeBehavior behavior) {</p>
      <p style="padding-left: 40px">___;</p>
      <p style="padding-left: 20px">}</p>
      <p style="padding-left: 20px">/* 其余代码省略 */</p>
    <p>}</p>
  </div>
  <div>
    <p>class StrategyTest {</p>
      <p style="padding-left: 20px">BrakeBehavior brake = new BrakeBehavior();</p>
      <p style="padding-left: 20px">ShortWheelCar car1 = new ShortWheelCar(brake);</p>
      <p style="padding-left: 20px">car1.___;</p>
    <p>}</p>
  </div>
</div>
`,
    imgs: ["/docs/study/imgs/206-ti.png"],
    options: [
      {
        answer: `void stop()`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `BrakeBehavior`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `wheel.stop()`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `this.wheel = behavior`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `brake()`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-140103",
    type: "topic",
    title: "下午题-算法",
    category: "fill",
    question: `
<p>阅读下列说明和代码，回答所有问题，将解答填入对应栏内</p>
<p><b>[说明]</b></p>
<p>希尔排序算法又称最小增量排序算法，其基本思想是:</p>
<p>步骤1：构造一个步长序列 delta1, delta2, ..., deltak, 其中 delta1 = n/2，后面的每个 delta 是前一个的 1/2, deltak=1；</p>
<p>步骤2：根据步长序列进行 k 趟排序；</p>
<p>步骤3：对第1趟排序，根据对应的步长 delta, 将等步长位置元素分组，对同一组内元索在原位置上进行直接插入排序。</p>
<p><b>[代码]</b></p>
下面是算法的C语言实现
<div style="display: flex; gap: 20px;">
<div style="width: 550px;">
<p>(1) 常量和变量说明</p>
<p><b>data</b>: 待排序数组data，长度为n，待排序数据在 data[0]、data[1]、...data[n-1]中</p>
<p><b>n</b>: 数组data中的元素个数</p>
<p><b>delta</b>: 步长数组</p>
</div>
<div style="flex: 1;">
<p>(2) 程序</p>
<div class="note-codes">
  <div>
    <p>#include &lt;stdio.h&gt;</p>
    <p style="margin-top: 10px"></p>
    <p>void shellsort(int data[], int n) {</p>
      <p style="padding-left: 20px">int *delta, k, i, t, dk, j;</p>
      <p style="padding-left: 20px">k = n;</p>
      <p style="padding-left: 20px">delta = (int *) malloc(sizeof(int) * (n / 2)); // 为delta申请空间</p>
      <p style="padding-left: 20px">i = 0;</p>
      <p style="padding-left: 20px">do {</p>
      <p style="padding-left: 40px">___;</p>
      <p style="padding-left: 40px">delta[i++] = k;</p>
      <p style="padding-left: 20px">} while (___);</p>
      <p style="padding-left: 20px">i = 0;</p>
      <p style="padding-left: 20px">while ((dk = delta[i]) > 0) {</p>
      <p style="padding-left: 40px">for(k = delta[i]; k < n; ++k)</p>
      <p style="padding-left: 60px">if (___) {</p>
      <p style="padding-left: 80px">t = data[k];</p>
      <p style="padding-left: 80px">for (j = k -dk; j >= 0 && t < data[j]; j -= dk)</p>
      <p style="padding-left: 100px">data[j + dk] = data[j];</p>
      <p style="padding-left: 80px">___;</p>
      <p style="padding-left: 60px">}</p>
      <p style="padding-left: 40px">++i;</p>
      <p style="padding-left: 20px">}</p>
    <p>}</p>
  </div>
</div>
</div>
</div>
<p><b>[问题1]</b></p>
<p>根据以上说明和代码，填空</p>
<p><b>[问题2]</b></p>
<p>根据说明和代码，该算法的时间复杂度___<span class='txt-func'>O(n<span class='txt-sup'>2</span>)</span>(小于、等于、大于)，该算法是否稳定___(是、否)。</p>
<p><b>[问题3]</b></p>
<p>对数组(15,9,7,8,20,-1,4)用希尔排序方法进行排序，经过第一趟排后得到的数组为___。</p>
`,
    imgs: [],
    options: [
      {
        answer: `k = k / 2`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `k > 0`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `data[k] < data[k - dk]`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "判断是否是逆序对",
      },
      {
        answer: `data[j + dk] = t`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `小于`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "因为该算法的时间复杂度介于<span class='txt-func'>O(nlgn)</span>和<span class='txt-func'>O(n<span class='txt-sup'>2</span>)</span>之间",
      },
      {
        answer: `否`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "希尔排序是不稳定排序算法",
      },
      {
        answer: `(4,9,-1,8,20,7,15)`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "delta1 为 7/2=3，则(15,9,7,8,20,-1,4) 分为三组:(15,8,4),(9,20),(7,-1)，分别进行插入排序，得到 (4,9,-1,8,20,7,15)",
      },
    ],
  },
  {
    id: "section-140103",
    type: "topic",
    title: "下午题-算法",
    category: "fill",
    question: `
<p>阅读下列说明和代码，回答所有问题，将解答填入对应栏内</p>
<p><b>[说明]</b></p>
<p>生物学上通常采用编辑距离来定义两个物种 DNA 序列的相似性, 从而刻画物种之间的进化关系。
具体来说, 编辑距离是指将一个字符串变换为另一个字符所需要的最小操作次数。
操作有三种, 分别为：插入一个字符、删除一个字符以及将一个字符修改为另一个字符。
用字符数组 str1 和 str2分别表示长度为len1和len2的字符串, 定义二维数组d记录求解编辑距离的子问题量优解, 则该二维数组可以递归定义如下图所示。</p>
<p><b>[代码]</b></p>
下面是算法的C语言实现
<div style="display: flex; gap: 20px;">
<div style="width: 550px;">
<p>(1) 常量和变量说明</p>
<p><b>A,B</b>: 两个字符数组</p>
<p><b>d</b>: 二维数组</p>
<p><b>i,j</b>: 循环变量</p>
<p><b>temp</b>: 临时变量</p>
</div>
<div style="flex: 1;">
<p>(2) 程序</p>
<div class="note-codes">
  <div>
    <p>#include &lt;stdio.h&gt;</p>
    <p>#define N 100</p>
    <p style="margin-top: 10px"></p>
    <p>char A[N] = "CTGA";</p>
    <p>char B[N] = "ACGCTA";</p>
    <p>int d[N][N];</p>
    <p style="margin-top: 10px"></p>
    <p>int min(int a, int b) {</p>
      <p style="padding-left: 20px">return a < b ? a : b;</p>
    <p>}</p>
    <p style="margin-top: 10px"></p>
    <p>int editdistance(char *str1, int len1, char *str2, int len2) {</p>
      <p style="padding-left: 20px">int i, j;</p>
      <p style="padding-left: 20px">int diff;</p>
      <p style="padding-left: 20px">int temp;</p>
      <p style="margin-top: 10px"></p>
      <p style="padding-left: 20px">for (i = 0; i < len1; i++) {</p>
      <p style="padding-left: 40px">d[i][0] = i;</p>
      <p style="padding-left: 20px">}</p>
      <p style="margin-top: 10px"></p>
      <p style="padding-left: 20px">for (j = 0; j < len2; j++) {</p>
      <p style="padding-left: 40px">___;</p>
      <p style="padding-left: 20px">}</p>
      <p style="margin-top: 10px"></p>
      <p style="padding-left: 20px">for (i = 1; i <= len1; i++) {</p>
      <p style="padding-left: 40px">for (j = 1; j <= len2; j++) {</p>
      <p style="padding-left: 60px">if (___) {</p>
      <p style="padding-left: 80px">d[i][j] = d[i-1][j-1];</p>
      <p style="padding-left: 60px">} else {</p>
      <p style="padding-left: 80px">temp = min(d[i-1][j]+1, d[i][j]+1)</p>
      <p style="padding-left: 80px">d[i][j] = min(temp, ___);</p>
      <p style="padding-left: 60px">}</p>
      <p style="padding-left: 40px">}</p>
      <p style="padding-left: 20px">}</p>
      <p style="padding-left: 20px">return ___;</p>
    <p>}</p>
  </div>
</div>
</div>
</div>
<p><b>[问题1]</b></p>
<p>根据以上说明和代码，填空</p>
<p><b>[问题2]</b></p>
<p>根据说明和代码，算法采用了___设计策略，时间复杂度为___。(用O表示，两个字符串的长度分别用m和n表示)</p>
<p><b>[问题3]</b></p>
<p>已知两个字符串 A="CTGA" 和 B="ACGCTA"，根据说明和代码，可得到这两个字符串的编辑距离为___。</p>
`,
    imgs: ["/docs/study/imgs/208-ti.png"],
    options: [
      {
        answer: `d[0][j] = j`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "初始化第一行，表示将空字符串转换为长度为j的字符串所需的编辑距离",
      },
      {
        answer: `str1[i-1] == str2[j-1]`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "表示两个字符相等，不需要编辑操作",
      },
      {
        answer: `d[i-1][j-1]+1`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "对比应替换操作的编辑距离，加1表示进行替换操作",
      },
      {
        answer: `d[len1][len2]`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "返回的编辑距离，即将字符串str1转换为str2所需的最小编辑距离",
      },
      {
        answer: `动态规划`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
      {
        answer: `O(mn)`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "复杂度由两个嵌套循环决定",
      },
      {
        answer: `4`,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "大致的编辑步骤为: CTGA -> A CTGA (插入A) -> ACGA (删除T) -> ACGTA (插入T) -> ACGCTA (插入C)",
      },
    ],
  },
  {
    id: "section-120201",
    type: "topic",
    title: "上午题-病毒",
    category: "single-select",
    question: `某个病毒表现为逋过电子邮件向通讯簿的联系人发迭邮件,并通过邮件自带的 Word 文档附件感染主机。该病毒属于___。`,
    imgs: [],
    options: [
      {
        answer: `D`,
        col: 4,
        list: [
          "木马病毒", 
          "CIH 病毒", 
          "蠕虫病毒", 
          "宏病毒"
        ],
        fillAnswer: "",
        note: "利用文档宏或漏洞感染，具有宏病毒/文档型恶意代码的特点",
      },
    ],
  },
  {
    id: "section-040101",
    type: "topic",
    title: "上午题-知识产权",
    category: "single-select",
    question: `甲公司发布了一款名为 "智慧助手" 的智能手机应用，
其竞争对手乙公司紧随其后开发并发布了一款名为 "眢能帮手" 的应用，
其界面设计和功能与 "智慧助手" 基本一致。
以下叙述中，正确的是___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 1,
        list: [
          "乙公司侵犯了甲公司的商标权", 
          "乙公司侵犯了甲公司的著作权", 
          "乙公司没有侵犯甲公司的任何知识产权", 
          "乙公司侵犯了甲公司的专利权"
        ],
        fillAnswer: "",
        note: "没有说明是否使用相同或相近的商标注册，也没有说明有专利授权或公告；同时明确写到界面设计基本一致，著作权保护具有独创性的表达形式。",
      },
    ],
  },
  {
    id: "section-090201",
    type: "topic",
    title: "上午题-进程管理",
    category: "single-select",
    question: `在操作系统中，进程调度的主要目的是___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 1,
        list: [
          "合理分配 CPU 时间,提高 CPU 利用率", 
          "提高计算机的运行速度", 
          "减少进程的等待时间", 
          "增加系统的吞吐量"
        ],
        fillAnswer: "",
        note: "进程调度 表示在多道程序系统中，内存中同时存在多个就绪进程，调度程序根据某种算法，选择一个就绪进程获得 CPU 使用权。能保持 CPU 持续工作，提高资源利用率。",
      },
    ],
  },
  {
    id: "section-050102",
    type: "topic",
    title: "上午题-数据库",
    category: "single-select",
    question: `数据库的恢复操作，主要依靠___属性。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: [
          "约束", 
          "冗余", 
          "加密", 
          "存取控制"
        ],
        fillAnswer: "",
        note: "恢复（Recovery）是数据库管理系统（DBMS）的一项重要功能，用于在系统故障、事务失败等情况下，将数据库恢复到正确一致的状态。核心思想是 利用冗余信息（如日志、备份）恢复丢失或破坏的数据。",
      },
    ],
  },
  {
    id: "section-010202",
    type: "topic",
    title: "上午题-定点数",
    category: "single-select",
    question: `设码长为8，巳知 X 是整数且 [X]补=11111111, 则 X 的真值为___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: [
          "1", 
          "-1", 
          "127", 
          "255"
        ],
        fillAnswer: "",
        note: "原码：1000 0001 → 反码：1111 1110 → 补码：1111 1111",
      },
    ],
  },
  {
    id: "section-110402",
    type: "topic",
    title: "上午题-系统设计",
    category: "single-select",
    question: `详细设计结束后，重点审查的内容不包括___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "数据流图", 
          "算法", 
          "数据结构", 
          "软件界面"
        ],
        fillAnswer: "",
        note: "详细设计审查的重点内容，包括 算法、数据结构、软件界面、模块接口设计等。",
      },
    ],
  },
  {
    id: "section-050301",
    type: "topic",
    title: "上午题-函数依赖",
    category: "single-select",
    question: `两个函数依赖集F和G等价是指___。`,
    imgs: [],
    options: [
      {
        answer: `B`,
        col: 4,
        list: [
          "F➔G", 
          "F+=G+", 
          "G➔F", 
          "F=G"
        ],
        fillAnswer: "",
        note: "函数依赖是指 若在关系 R 中，属性集 X 的值确定了属性集 Y 的值，则记作 X → Y，且 → 通常表示属性间的依赖关系；两个函数依赖集 F 和 G 等价，当且仅当它们能推导出相同的所有函数依赖，即闭包相等 F+=G+",
      },
    ],
  },
  {
    id: "section-140202",
    type: "topic",
    title: "上午题-二分查找",
    category: "single-select",
    question: `设某线性表的元素存储在有序顺序表 A[1..20] 中，表中元素互异，即 A[1]、A[2]、...、A[20]互不相同。
用折半查找(即二分查找，向下取整)在 A[] 中查找key，若 key 等于 A[13]，则查找过程中参与比较的元素依次为 A[10]、___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 2,
        list: [
          "A[15]、A[12]、A[13]", 
          "A[16]、A[15]、A[13]", 
          "A[15]、A[14]、A[13]", 
          "A[16]、A[14]、A[13]", 
        ],
        fillAnswer: "",
        note: "mid = ⌊(low+high)/2​⌋",
      },
    ],
  },
  {
    id: "section-110106",
    type: "topic",
    title: "上午题-喷泉模型",
    category: "single-select",
    question: `___适合于面向对象的开发方法，是一种以用户需求为动力，以对象作为驱动的模型。`,
    imgs: [],
    options: [
      {
        answer: ``,
        col: 4,
        list: [
          "统一过程模型", 
          "瀑布模型", 
          "喷泉模型", 
          "螺旋模型"
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  {
    id: "section-030301",
    type: "topic",
    title: "上午题-树",
    category: "single-select",
    question: `对于一棵树，每个结点的孩子结点个数称为结点的度，结点度数最大值称为树的度。
某树T的度为4，其中有5个度为4的结点，8个度为3的结点，6个度为2的结点，10个度为1的结点。
则T中的叶子结点个数为___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "38", 
          "29", 
          "66", 
          "57"
        ],
        fillAnswer: "",
        note: "树的总节点数为 5*4+8*3+6*2+10*1+1=67，剩余节点数为 67-10-6-8-5=38 个",
      },
    ],
  },
  {
    id: "section-030201",
    type: "topic",
    title: "上午题-数组",
    category: "single-select",
    question: `己知二维数组A按行优先方式存储，每个元素占用2个存储单元。
第一个元素 A[0][0] 的地址为100，元素 A[3][3] 的存储地址是220，则元紊 A[5][5] 的地址是___。`,
    imgs: [],
    options: [
      {
        answer: `A`,
        col: 4,
        list: [
          "300", 
          "310", 
          "306", 
          "296"
        ],
        fillAnswer: "",
        note: "公式 A[i][j] = A[0][0] + 2 * ((i * cols) + j)，得出列数 cols = 19，则 A[5][5] = 300",
      },
    ],
  },
  {
    id: "section-01",
    type: "topic",
    title: "上午题-sample",
    category: "single-select",
    question: `___。`,
    imgs: [],
    options: [
      {
        answer: ``,
        col: 1,
        list: [
          "", 
          "", 
          "", 
          ""
        ],
        fillAnswer: "",
        note: "",
      },
    ],
  },
  // imgs: ["/docs/study/imgs/999-ti.png"],
];