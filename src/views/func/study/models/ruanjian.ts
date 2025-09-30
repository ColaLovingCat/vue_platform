export const notes = [
  {
    id: "section-010102",
    type: "topic",
    title: "上午题-CPU",
    category: "single-select",
    question:
      "在CPU中，常用来为ALU执行算术逻辑运算提供数据并暂存运算结果的寄存器是___。",
    imgs: [],
    options: [
      {
        answer: "D",
        col: 1,
        list: ["程序计数器", "状态寄存器", "通用寄存器", "累加寄存器"],
        note: "",
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
        col: 1,
        list: ["运算器", "控制器", "寄存器组", "内部总线"],
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
        col: 1,
        list: [
          "地址寄存器 AR",
          "数据寄存器 DR",
          "程序计数器 PC",
          "指令寄存器 IR",
        ],
        note: "",
      },
    ],
  },
  {
    id: "section-010201",
    type: "topic",
    title: "上午题-进制",
    category: "single-select",
    question: "内存按字节编址从B3000H到DABFFH的区域，其存储容量为___。",
    imgs: [],
    options: [
      {
        answer: "B",
        col: 1,
        list: ["123KB", "159KB", "163KB", "194KB"],
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
      { answer: "B", col: 1, list: ["128", "256", "512", "1024"], note: "" },
      {
        answer: "C",
        col: 1,
        list: ["8", "16", "32", "64"],
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
        col: 1,
        list: ["0", "-1", "2^16-1", "-2^16+1"],
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
        col: 1,
        list: ["表示 2^n", "表示 -2^n", "表示 2^(n-1)", "表示 -2^(n-1)"],
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
        col: 1,
        list: [
          "2^-16*2^-10",
          "2^-15*2^-10",
          "2^-16*(1-2^-10)",
          "2^-15*(1-2^-10)",
        ],
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
        col: 1,
        list: [
          "直接寻址和立即寻址",
          "寄存器寻址和立即寻址",
          "相对寻址和直接寻址",
          "寄存器间接寻址和直接寻址",
        ],
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
    options: [{ answer: "C", col: 1, list: ["4", "5", "6", "7"], note: "" }],
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
      { answer: "C", col: 1, list: ["40", "70", "90", "100"], note: "" },
      { answer: "D", col: 1, list: ["20", "30", "40", "45"], note: "" },
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
      { answer: "C", col: 1, list: ["40", "80", "160", "200"], note: "" },
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
        note: "",
      },
      {
        answer: "D",
        col: 1,
        list: ["解密和签名", "加密和签名", "解密和认证", "加密和认证"],
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
      { answer: "D", col: 1, list: ["ECC", "DSA", "RSA", "DES"], note: "" },
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
        col: 1,
        list: ["公钥加密", "流密码", "分组加密", "信息摘要"],
        note: "",
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
        col: 1,
        list: [
          "P(S1) P(S2)和P(S3) P(S4)",
          "P(S1) P(S2)和P(S2) P(S1)",
          "V(S1) V(S2)和V(S3) V(S4)",
          "P(S1) P(S2)和V(S1) V(S2)",
        ],
        note: "",
      },
      {
        answer: "B",
        col: 1,
        list: [
          "P(S1) P(S2)和V(S3) V(S4)",
          "P(S1) P(S3)和V(S5) V(S6)",
          "V(S1) V(S2)和P(S3) P(S4)",
          "P(S1) V(S3)和P(S2) V(S4)",
        ],
        note: "",
      },
      {
        answer: "C",
        col: 1,
        list: [
          "P(S3) P(S4)和V(S5) V(S6)",
          "V(S5) V(S6)和P(S5) P(S6)",
          "P(S2) P(S5)和P(S4) P(S6)",
          "P(S4) V(S5)和P(S5) V(S6)",
        ],
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
      { answer: "B", col: 1, list: ["0", "1", "n", "任意正整数"], note: "" },
      { answer: "A", col: 1, list: ["n、0", "0、n", "1、n", "n、1"], note: "" },
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
      "进程的前驱图如下图所示。若用PV操作控制进程的并发执行过程，需要5个信号量S1~S5，且信号量的初始值都等于0.如下的进程执行图中a和b分别填写___；c和d分别填写___；e和f分别填写___。",
    imgs: ["/docs/study/imgs/103-ti.png", "/docs/study/imgs/104-ti.png"],
    options: [
      {
        answer: "B",
        col: 1,
        list: [
          "V(S1)和P(S2) V(S3)",
          "P(S1)和V(S2) V(S3)",
          "V(S1)和V(S2) V(S3)",
          "P(S1)和P(S2) V(S3)",
        ],
        note: "",
      },
      {
        answer: "C",
        col: 1,
        list: ["P(S2)和P(S4)", "V(S2)和P(S4)", "P(S2)和V(S4)", "V(S2)和V(S4)"],
        note: "",
      },
      {
        answer: "A",
        col: 1,
        list: ["P(S4)和V(S5)", "V(S5)和P(S4)", "V(S4)和P(S5)", "V(S4)和V(S5)"],
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
        note: "m≥n*(w-1)+1",
      },
      {
        answer: "D",
        col: 1,
        list: ["1、1和1", "1、1和2", "1、1和3", "1、2和1"],
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
        col: 1,
        list: [
          "该进程中打开的文件",
          "该进程的代码段",
          "该进程中某线程的栈指针",
          "该进程的全局变量",
        ],
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
        col: 1,
        list: ["0", "1", "2", "3"],
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
        note: "",
      },
      {
        answer: "C",
        col: 1,
        list: ["2C25H", "4096H", "4C25H", "8C25H"],
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
        note: "物理页大小为1KB即1024，二进制为 100 0000 0000，则页号1对应的物理页为3",
      },
      {
        answer: "A",
        col: 1,
        list: ["4、4", "4、5", "5、4", "5、5"],
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
    imgs: [],
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
        note: "(10+5)*(10-1)+(10+5+2)=152",
      },
      {
        answer: "B",
        col: 1,
        list: ["100", "107", "152", "170"],
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
        note: "只看柱面号",
      },
      {
        answer: "C",
        col: 1,
        list: ["⑦⑩①②④③⑨⑧⑤⑥", "①⑦⑩②③④⑥⑤⑧⑨", "⑦⑩①②④③⑥⑤⑧⑨", "①⑦⑩②③④⑧⑨⑥⑤"],
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
        col: 1,
        list: ["54", "108", "222", "246"],
        note: "旋转一个扇区需要3ms，所以前8个物理块的时间为 (3ms+9*3ms)*8=240ms,最后一个时间为 3ms+3ms=6ms，所以总时间为246ms",
      },
      {
        answer: "B",
        col: 1,
        list: ["27", "54", "108", "216"],
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
        col: 1,
        list: ["85", "170", "512", "1024"],
        note: "首先一共有 512B/3B=170个 磁盘索引块，每一个索引块指向512B的数据块，总共有 170*512B=85KB",
      },
      {
        answer: "C",
        col: 1,
        list: ["512", "1024", "14450", "28900"],
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
        col: 1,
        list: [
          "直接地址索引和一级间接地址索引",
          "直接地址索引和二级间接地址索引",
          "一级间接地址索引和二级间接地址索引",
          "一级间接地址索引和一级间接地址索引",
        ],
        note: "块号 0 - 4 为直接索引，5 - 516(4+256*2) 为一级间接地址索引，517 - 66052(516+256*256) 为二级间接地址索引",
      },
      {
        answer: "D",
        col: 1,
        list: ["517", "1029", "16513", "66053"],
        note: "",
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
        col: 1,
        list: [
          "f1.java",
          "\\Document\\Java-prog\\f1.java",
          "D:\\Document\\Java-prog\\f1.java",
          "\\Program\\Java-prog\\f1.java",
        ],
        note: "",
      },
      {
        answer: "A",
        col: 1,
        list: [
          "Java-prog\\",
          "\\Java-prog\\",
          "Program\\Java-prog",
          "\\Program\\Java-prog\\",
        ],
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
      "某文件管理系统在磁盘上建立了位示图，记录磁盘的使用情况。若系统的字长为32位，磁盘上的物理块依次编号为0、1、2、...，那么4096块物理块的使用情况在位示图中的第___个字中描述；若磁盘的容量为200GB，物理块的大小为1MB，那么位示图的大小为___个字。",
    imgs: [],
    options: [
      {
        answer: "A",
        col: 1,
        list: ["129", "257", "513", "1025"],
        note: "没有特殊说明，则字号从1开始。则字号为n时，块号开始为 32*(n-1)，结束为 32*n-1。所以129块的开始为4096。",
      },
      {
        answer: "D",
        col: 1,
        list: ["600", "1200", "3200", "6400"],
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
        col: 1,
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
        note: "首先计算笛卡尔积，R.A R.B R.C S.A S.B S.C，然后选择 R.A < S.C 再投影 R.C S.A S.B 排个序",
      },
      {
        answer: "A",
        col: 1,
        list: ["3和0", "3和2", "6和0", "6和2"],
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
        col: 1,
        list: ["4", "5", "6", "7"],
        note: "",
      },
      {
        answer: "A",
        col: 1,
        list: ["4", "5", "6", "7"],
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
        col: 1,
        list: ["4", "5", "6", "8"],
        note: "",
      },
      {
        answer: "B",
        col: 1,
        list: [
          "<span class='txt-func'>𝜎<span class='txt-sub'>2>7</span>(RXS)</span>",
          "<span class='txt-func'>𝜋<span class='txt-sub'>1,2,3,4,7,8</span>(𝜎<span class='txt-sub'>1=5 ∧ 2>7 ∧ 3=6</span>(RXS))</span>",
          "<span class='txt-func'>𝜎<span class='txt-sub'>2>'7'</span>(RXS)</span>",
          "<span class='txt-func'>𝜋<span class='txt-sub'>1,2,3,4,7,8</span>(𝜎<span class='txt-sub'>1=5 ∧ 2>'7' ∧ 3=6</span>(RXS))</span>",
        ],
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
        note: "",
      },
      {
        answer: "D",
        col: 1,
        list: ["2,2,4", "2,2,6", "4,4,4", "4,4,6"],
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
        col: 1,
        list: ["A,B,C,D,E", "C,D,E", "R.A,R.B,R.C,R.D,S.E", "R.C,R.D,S.E"],
        note: "",
      },
      {
        answer: "C",
        col: 1,
        list: ["R", "S", "R,S", "RS"],
        note: "",
      },
      {
        answer: "B",
        col: 1,
        list: ["D&lt;C", "R.D&lt;S.C", "R.D&lt;R.C", "S.D&lt;R.C"],
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
        col: 1,
        list: ["R.B,D,F,G", "R.B,E,S.C,F,G", "R.B,R.D,S.C,F", "R.B,R.C,S.C,F"],
        note: "自然连接后 A,R.B,R.C,D,E,F,G",
      },
      {
        answer: "C",
        col: 1,
        list: [
          "R.B = S.B OR R.C=S.C OR R.B&lt;S.G",
          "R.B = S.B OR R.C=S.C OR R.B&lt;S.C",
          "R.B = S.B AND R.C=S.C AND R.B&lt;S.G",
          "R.B = S.B AND R.C=S.C AND R.B&lt;S.C",
        ],
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
    零件关系的主键为___。
    查询各种零件的平均单价，最高单价与极低单价之间差距的SQL语句为：SELECT 零件号,___ FROM P ___;`,
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
        note: "",
      },
      {
        answer: "D",
        col: 2,
        list: ["FOR ALL", "PUBLIC", "WITH CHECK OPTION", "WITH GRANT OPTION"],
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
        note: "",
      },
      {
        answer: "C",
        col: 4,
        list: ["FOR ALL", "PUBLIC", "WITH CHECK OPTION", "WITH GRANT OPTION"],
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
        col: 1,
        list: [
          "不存在传递依赖，候选关键字A",
          "不存在传递依赖，候选关键字AC",
          "存在传递依赖A➔D，候选关键字A",
          "存在传递依赖B➔D，候选关键字C",
        ],
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
        note: "",
      },
      {
        answer: "B",
        col: 4,
        list: ["1NF", "2NF", "3NF", "BCNF"],
        note: "主键是 (时间,学生)，不存在时间或学生单独决定一个属性，符合2NF，但 (时间,学生)➔教室 (时间,教室)➔课程 为传递依赖，则不符合3NF",
      },
      {
        answer: "C",
        col: 4,
        list: ["2NF", "3NF", "BCNF","4NF"],
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
        note: "候选码为 EM，则E➔N和M➔L都是部分函数依赖，不符合2NF",
      },
      {
        answer: "D",
        col: 1,
        list: [
          "无需进行分解，因为达到了3NF", 
          "无需进行分解，因为达到了BCNF", 
          "尽管不存在部分函数依赖，但还存在传递依赖，所以需要进行分解", 
          "需要进行分解，因为存在冗余、修改操作的不一致性、插入和删除异常"
        ],
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
        list: ["年龄和出生年月", "年龄和联系方式", "出生年月和联系方式", "出生年月和年龄"],
        note: "",
      },
      {
        answer: "C",
        col: 4,
        list: ["非空主键", "主键", "外键", "候选键"],
        note: "",
      },
      {
        answer: "C",
        col: 4,
        list: ["INSERT", "DELETE", "UPDATE", "MODIFY"],
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
        note: "属性冲突是同一属性不同类型，命名冲突是异名同义，结构冲突是同一实体不同属性",
      },
      {
        answer: "B",
        col: 1,
        list: [
          "职工和教师实体保持各自属性不变", 
          "职工实体中加入职称属性，删除教师实体", 
          "教师也是学校的职工，故直接将教师实体删除", 
          "将教师实体所有属性并入职工实体,删除教师实体"
        ],
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
        note: "",
      },
      {
        answer: "A",
        col: 2,
        list: ["S中应加入关系模式D的主键", "S中应加入关系模式C的主键", "D中应加入关系模式S的主键", "C中应加入关系模式S的主键"],
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
        note: "",
      },
      {
        answer: "C",
        col: 1,
        list: ["程序文档、数据字典和数据流图", "需求说明文档、程序文档和数据流图", "需求说明文档、数据字典和数据流图", "需求说明文档、数据字典和程序文档"],
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
        note: "",
      },
      {
        answer: "B",
        col: 4,
        list: ["索引文件", "数据文件", "日志文件", "数据字典"],
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
        col: 1,
        list: [
          "D2、D3加排它锁都成功", 
          "D2、D3加共享锁都成功", 
          "D2加共享锁成功, D3加排它锁失败", 
          "D2、D3加排它锁和共享锁都失败"
        ],
        note: "",
      },
      {
        answer: "C",
        col: 1,
        list: [
          "D1、D3加排它锁都成功", 
          "D1、D3加共享锁都成功", 
          "D1加共享锁成功, D3加排它锁失败", 
          "D1加排它锁成功, D3加共享锁失败", 
        ],
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
        note: "",
      },
       {
        answer: "A",
        col: 4,
        list: ["分片透明", "复制透明", "位置透明", "逻辑透明"],
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
        note: "",
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
        answer: "",
        col: 1,
        list: ["", "", "", ""],
        note: "",
      },
    ],
  },
  // imgs: ["/docs/study/imgs/999-ti.png"],
];

export const sql_01 = `
-- 插入数据
INSERT INTO students (name, age, gender, major, grade)
VALUES ('Alice', 20, 'F', 'Computer Science', 90);

-- 批量插入
INSERT INTO students (name, age, gender, major, grade)
VALUES 
('Bob', 22, 'M', 'Mathematics', 85),
('Cathy', 21, 'F', 'Physics', 88);

-- 更新数据
UPDATE students
SET grade = 95
WHERE name = 'Alice';

-- 删除数据
DELETE FROM students
WHERE grade < 60;
`;
export const sql_02 = `
-- 查询所有列
SELECT * FROM students;

-- 查询指定列
SELECT name, age, grade FROM students;

-- 条件查询
SELECT * FROM students WHERE grade >= 85;

-- 排序
SELECT * FROM students ORDER BY grade DESC;

-- 分组统计
SELECT major, AVG(grade) AS avg_grade
FROM students
GROUP BY major
HAVING AVG(grade) > 80;

-- 子查询
SELECT * 
FROM students
WHERE grade > (SELECT AVG(grade) FROM students);

-- 聚合函数
SELECT COUNT(*) AS total, MAX(grade) AS top_score FROM students;

-- 联接查询
SELECT students.name, courses.course_name
FROM students
INNER JOIN courses ON students.id = courses.student_id;
`;
export const sql_03 = `
-- 创建表
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(50) NOT NULL,
    age INT CHECK (age > 0),
    gender CHAR(1),
    major NVARCHAR(100),
    grade INT
);

-- 修改表：增加列
ALTER TABLE students ADD email NVARCHAR(100);

-- 修改表：修改列类型
ALTER TABLE students ALTER COLUMN age SMALLINT;

-- 删除列
ALTER TABLE students DROP COLUMN email;

-- 删除表
DROP TABLE students;
`;
export const sql_04 = `
-- 创建用户
CREATE USER user1 IDENTIFIED BY '123456';

-- 删除用户
DROP USER user1;

-- 给用户授予查询权限
GRANT SELECT ON students TO user1;

-- 授予插入、更新权限
GRANT INSERT, UPDATE ON students TO user1;

-- 回收权限
REVOKE UPDATE ON students FROM user1;
`;
export const sql_05 = `
-- 创建视图：优秀学生
CREATE VIEW v_top_students AS
SELECT id, name, grade
FROM students
WHERE grade >= 85;

-- 使用视图
SELECT * FROM v_top_students;

-- 删除视图
DROP VIEW v_top_students;
`;
export const sql_06 = `
-- 创建普通索引
CREATE INDEX idx_major ON students(major);

-- 创建唯一索引
CREATE UNIQUE INDEX idx_name ON students(name);

-- 删除索引
DROP INDEX idx_major ON students;
`;
export const sql_07 = `
-- 创建存储过程：按专业查询学生
DELIMITER $$  -- MySQL 用法，SQL Server/Oracle 语法略有不同
CREATE PROCEDURE GetStudentsByMajor(IN majorName NVARCHAR(100))
BEGIN
    SELECT id, name, age, grade
    FROM students
    WHERE major = majorName;
END $$
DELIMITER ;

-- 调用存储过程
CALL GetStudentsByMajor('Computer Science');

-- 删除存储过程
DROP PROCEDURE GetStudentsByMajor;
`;

export const code_huisu_01 = `#define N 4

int q[N + 1];

int check(int j)
{
    int i;
    for (i = 1; i < j; i++)
    {
        if (q[i] == q[j] || abs(i - j) == abs(q[i] - q[j]))
            return 0;
    }
    return 1;
}

void queen()
{
    int i;
    for (i = 1; i <= N; i++)
    {
        q[i] = 0;
    }
    int answer = 0;
    int j = 1;
    while (j >= 1)
    {
        q[j] = q[j] + 1;
        while (q[j] <= N && !check(j))
        {
            q[j] = q[j] + 1;
        }
    }
}

int main()
{
    queen();
    return 0;
}`;

export const code_huisu_02 = `#define N 4

int answer = 0;
int q[N + 1];

int check(int j)
{
    int i;
    for (i = 1; i < j; i++)
    {
        if (q[i] == q[j] || abs(i - j) == abs(q[i] - q[j]))
            return 0;
    }
    return 1;
}

void queen(int j)
{
    int i;
    for (i = 1; i <= N; i++)
    {
        q[j] = i;
        if (check(j))
        {
            if (j == N)
            {
                answer = answer + 1;
                for (i = 0; i <= N; i++)
                {
                    printf("%d", q[i]);
                }
                printf("\\n");
            }
            else
            {
                queen(j + 1);
            }
        }
    }
}`;

export const code_fenzhi_01 = `const solve = (num: number): number => {
  if (num > 0) return num * solve(num - 1)
  return 1
}`;

export const code_fenzhi_02 = `#include <climits>

void MergeSort(int A[], int p, int r)
{
    int q;
    if (p < r)
    {
        q = (p + r) / 2;
        MergeSort(A, p, q);
        MergeSort(A, q + 1, r);
        Merge(A, p, q, r);
    }
}
void Merge(int A[], int p, int q, int r)
{
    int n1 = q - p + 1, n2 = r - q; // 左右长度
    int i, j, k;
    int L[50], R[50];
    for (i = 0; i < n1; i++) // 放入左数组
        L[i] = A[p + i];
    for (j = 0; j < n2; j++) // 放入右数组
        R[j] = A[q + j + 1];
    L[n1] = INT_MAX; R[n2] = INT_MAX; // 将数组的边界值赋值为最大值
    i = 0; j = 0;
    for (k = p; k < r + 1; k++) // 往原数组依次放数
    {
        if (L[i] < R[j]) // 左边小
        {
            A[k] = L[i];
            i++;
        }
        else // 右边小
        {
            A[k] = R[j];
            j++;
        }
    }
}
`;

export const code_fenzhi_03 = `int MaxSubSum(int *Array, int left, int right)
{
    int sum = 0;
    int i;
    if (left == right)
    {
        if (Array[left] > 0) sum = Array[left];
        else sum = 0;
    }
    else
    {
        int center = (left + right) / 2;
        int leftsum = MaxSubSum(Array, left, center);
        int rightsum = MaxSubSum(Array, center + 1, right);
        // 跨区时
        int s1 = 0;
        int lefts = 0;
        for (i = center; i >= left; i--)
        {
            lefts = lefts + Array[i];
            if (lefts > s1) s1 = lefts;
        }
        int s2 = 0;
        int rights = 0;
        for (i = center + 1; i <= right; i++)
        {
            rights = rights + Array[i];
            if (rights > s2)
                s2 = rights;
        }
        sum = s1 + s2;
        // 求最大值
        if (sum < leftsum) sum = leftsum;
        if (sum < rightsum) sum = rightsum;
    }
    return sum;
}
`;

export const code_dongtai_01 = `#define N 4
#define W 5

int main()
{
    int v[] = {0, 2, 4, 5, 6}; // 物品价值
    int w[] = {0, 1, 2, 3, 4}; // 物品重量
      int dp[N + 1][W + 1] = {};
      int i, j;
    for (i = 0; i < N; i++)
    {
        for (j = 0; j < W; j++)
        {
            if (j >= w[i]) // 物品i可选
            {
                dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - w[i]] + v[i]);
            }
            else // 不选物品i
            {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    printf("%d", dp[N][W]);
    
    return 0;
}

int max(int a, int b)
{
    return a > b ? a : b;
}
`;

export const code_tanxin_01 = `#define N 5
#define W 100

double merge(double arr[], int left, int right)
{
    // 归并排序方法
}

int main(int a, int b)
{
    int v[] = {0, 65, 20, 30, 60, 40};
    int w[] = {0, 30, 10, 20, 50, 40};
    // 物品单位价值
    double vw[N + 1]; 
    // 计算单位价值
    int i;
    for (i = 0; i <= N; i++)
        vw[i] = (double)v[i] / w[i];
    // 归并排序，从大到小
    merge(vw, 0, N);
    // 依次放入物品
    maxValue(v_temp, w_temp, vw_temp);
    return 0;
}
`;

export const code_tanxin_02 = `double v_temp[N + 1];
double w_temp[N + 1];
double vw_temp[N + 1];

double merge(double arr[], int left, int right)
{
    // 归并排序方法
}

double maxValue(int v[], int w[], double vw[])
{
    double result = 0.0;
    int W_temp = W;
    int i;

    // 物品作为整体放入
    for (i = 0; i <= N; i++)
    {
        if (W_temp >= w[i])
        {
            result = result + v[i];
            W_temp = W_temp = w[i];
        }
        else
            break;
    }

    // 剩余容量
    if (W_temp > 0 && i <= N)
    {
        result = result + (double)W_temp / w[i] * v[i];
    }

    return result;
}
`;

export const code_jiandan_01 = `abstract class Coffee {
    public abstract void info();
}

class AmericanoCoffee extends Coffee {
    @Override
    public void info() {
        System.out.println("美式咖啡");
    }
}

class LatteCoffee extends Coffee {
    @Override
    public void info() {
        System.out.println("拿铁咖啡");
    }
}

class CoffeeFactory {
    public static Coffee createCoffee(String type) {
        Coffee coffee = null;
        switch (type) {
            case "americano":
                coffee = new AmericanoCoffee();
                break;
            case "latte":
                coffee = new LatteCoffee();
                break;
            default:
                break;
        }
        return coffee;
    }
}

class Coffee_SimpleFactory {
    public static void main(String[] args) {
        Coffee americanoCoffee = CoffeeFactory.createCoffee("americano");
        americanoCoffee.info();
        Coffee latteCoffee = CoffeeFactory.createCoffee("latte");
        latteCoffee.info();
    }
}
`;

export const code_gongchang_01 = `interface Coffee {
    public void info();

    public void addCoffee();
    public void addOther();
}
`;
export const code_gongchang_02 = `class AmericanoCoffee implements Coffee {
    @Override
    public void info() {
        System.out.println("get AmericanoCoffee");
    }

    @Override
    public void addCoffee() {
        System.out.println("add 60ml Coffee");
    }

    @Override
    public void addOther() {
        System.out.println("add 250ml Water");
    }
}

class LatteCoffee implements Coffee {
    @Override
    public void info() {
        System.out.println("get LatteCoffee");
    }

    @Override
    public void addCoffee() {
        System.out.println("add 30ml Coffee");
    }

    @Override
    public void addOther() {
        System.out.println("add 175ml Milk");
    }
}
`;
export const code_gongchang_03 = `interface CoffeeFactory {
    public Coffee createCoffee();
}
`;
export const code_gongchang_04 = `class AmericanoFactory implements CoffeeFactory {
    @Override
    public Coffee createCoffee() {
        return new AmericanoCoffee();
    }
}

class LatteFactory implements CoffeeFactory {
    @Override
    public Coffee createCoffee() {
        return new LatteCoffee();
    }
}
`;
export const code_gongchang_05 = `class Client {
    public static void main(String[] args) {
        AmericanoFactory americanoFactory = new AmericanoFactory();
        Coffee americanoCoffee = americanoFactory.createCoffee();
        americanoCoffee.addCoffee();
        americanoCoffee.addOther();
        americanoCoffee.info();

        LatteFactory latteFactory = new LatteFactory();
        Coffee latteCoffee = latteFactory.createCoffee();
        latteCoffee.addCoffee();
        latteCoffee.addOther();
        latteCoffee.info();
    }
}
`;

export const code_chouxiang_01 = `interface Dessert {
    public void info();
}`;
export const code_chouxiang_02 = `class MatchaMousse implements Dessert {
    @Override
    public void info() {
        System.out.println("get Matcha Mousse");
    }
}

class Tiramisu implements Dessert {
    @Override
    public void info() {
        System.out.println("get Tiramisu");
    }
}`;
export const code_chouxiang_03 = `interface DessertFactory {
    public Coffee createCoffee();

    public Dessert createDessert();
}`;
export const code_chouxiang_04 = `// 美式甜点工厂
class AmericanDessertFactory implements DessertFactory {
    @Override
    public Coffee createCoffee() {
        return new AmericanoCoffee();
    }

    @Override
    public Dessert createDessert() {
        return new MatchaMousse();
    }
}

// 意大利风味甜点工厂
class ItalyDessertFactory implements DessertFactory {
    @Override
    public Coffee createCoffee() {
        return new LatteCoffee();
    }

    @Override
    public Dessert createDessert() {
        return new Tiramisu();
    }
}`;
export const code_chouxiang_05 = `class Client {
    public static void main(String[] args) {
        DessertFactory americanFactory = new AmericanDessertFactory();
        Coffee americanCoffee = americanFactory.createCoffee();
        americanCoffee.addCoffee();
        americanCoffee.addOther();
        americanCoffee.info();
        Dessert americanDessert = americanFactory.createDessert();
        americanDessert.info();

        DessertFactory italyFactory = new ItalyDessertFactory();
        Coffee italyCoffee = italyFactory.createCoffee();
        italyCoffee.addCoffee();
        italyCoffee.addOther();
        italyCoffee.info();
        Dessert italyDessert = italyFactory.createDessert();
        italyDessert.info();
    }
}
`;

export const code_shengchengqi_01 = `// 自行车类
class Bike {
    private String frame;
    private String seat;

    public String getFrame() {
        return frame;
    }
    public void setFrame(String frame) {
        this.frame = frame;
    }

    public String getSeat() {
        return seat;
    }
    public void setSeat(String seat) {
        this.seat = seat;
    }
}`;
export const code_shengchengqi_02 = `// 抽象 builder 类
abstract class Builder {
    protected Bike mBike = new Bike();

    public abstract void buildFrame();
    public abstract void buildSeat();
    public abstract Bike createBike();
}`;
export const code_shengchengqi_03 = `// 指挥者类
class Director {
    private Builder mBuilder;
    public Director(Builder builder) {
        mBuilder = builder;
    }

    public Bike construct() {
        mBuilder.buildFrame();
        mBuilder.buildSeat();
        return mBuilder.createBike();
    }
}`;
export const code_shengchengqi_04 = `// 摩拜单车Builder类
class MobikeBuilder extends Builder {
    @Override
    public void buildFrame() {
        mBike.setFrame("Aluminum frame");
    }

    @Override
    public void buildSeat() {
        mBike.setSeat("Leather seat");
    }

    @Override
    public Bike createBike() {
        return mBike;
    }
}

// ofo单车Builder类
class OfoBuilder extends Builder {
    @Override
    public void buildFrame() {
        mBike.setFrame("Carbon frame");
    }

    @Override
    public void buildSeat() {
        mBike.setSeat("Rubber seat");
    }

    @Override
    public Bike createBike() {
        return mBike;
    }
}
`;
export const code_shengchengqi_05 = `class Client {
    public static void main(String[] args) {
        showBike(new OfoBuilder());
        showBike(new MobikeBuilder());
    }

    private static void showBike(Builder builder) {
        Director director = new Director(builder);
        Bike bike = director.construct();
        System.out.println(bike.getFrame());
        System.out.println(bike.getSeat());
    }
}
`;

export const code_yuanxing_01 = `// 奖状类
public class Citation implements Cloneable {
    private String name;

    public void setName(String name) {
        this.name = name;
    }
    public String getName() {
        return (this.name);
    }

    public void show() {
        System.out.println(name + "同学：在2020学年第一学期中表现优秀，被评为三好学生。特发此状！");
    }

    @Override
    public Citation clone() throws CloneNotSupportedException {
        return (Citation) super.clone();
    }
}

// 测试访问类
public class CitationTest {
    public static void main(String[] args) throws CloneNotSupportedException {
        Citation c1 = new Citation();
        c1.setName("张三");        
        // 复制奖状
        Citation c2 = c1.clone();
        // 将奖状的名字修改李四
        c2.setName("李四");
        c1.show();
        c2.show();
    }
}
`;

export const code_danli_01 = `/**
 * 饿汉式-静态变量创建类的对象
 */
public class Singleton {
    //私有构造方法
    private Singleton() {}

    //在成员位置创建该类的对象
    private static Singleton instance = new Singleton();

    //对外提供静态方法获取该对象
    public static Singleton getInstance() {
        return instance;
    }
}

/**
 * 恶汉式
 * 在静态代码块中创建该类对象
 */
public class Singleton {

    // 私有构造方法
    private Singleton() {
    }

    // 在成员位置创建该类的对象
    private static Singleton instance;

    static {
        instance = new Singleton();
    }

    // 对外提供静态方法获取该对象
    public static Singleton getInstance() {
        return instance;
    }
}

/**
 * 懒汉式
 * 线程不安全
 */
public class Singleton {
    // 私有构造方法
    private Singleton() {
    }

    // 在成员位置创建该类的对象
    private static Singleton instance;​

    // 对外提供静态方法获取该对象
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

/**
 * 懒汉式
 * 线程安全
 */
public class Singleton {
    // 私有构造方法
    private Singleton() {
    }

    // 在成员位置创建该类的对象
    private static Singleton instance;

    // 对外提供静态方法获取该对象
    public static synchronized Singleton getInstance() {

        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

/**
 * 双重检查方式
 */
public class Singleton {
    //私有构造方法
    private Singleton() {}

    private static volatile Singleton instance;

    //对外提供静态方法获取该对象
    public static Singleton getInstance() {
        //第一次判断，如果instance不为null，不进入抢锁阶段，直接返回实际
        if(instance == null) {
            synchronized (Singleton.class) {
                //抢到锁之后再次判断是否为空
                if(instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
`;

export const code_shipei_01 = `// 电脑类
public class Computer {
    public String readSD(SDCard sdCard) {
        if (sdCard == null) {
            throw new NullPointerException("sd card null");
        }
        return sdCard.readSD();
    }
}
`;

export const code_shipei_02 = `// SD卡的接口
public interface SDCard {
    // 读取SD卡方法
    String readSD();
    // 写入SD卡功能
    void writeSD(String msg);
}

// SD卡实现类
public class SDCardImpl implements SDCard {
    public String readSD() {
        String msg = "sd card read a msg :hello word SD";
        return msg;
    }

    public void writeSD(String msg) {
        System.out.println("sd card write msg : " + msg);
    }
}
`;

export const code_shipei_03 = `// TF卡接口
public interface TFCard {
    // 读取TF卡方法
    String readTF();
    // 写入TF卡功能
    void writeTF(String msg);
}

// TF卡实现类
public class TFCardImpl implements TFCard {
    public String readTF() {
        String msg = "tf card read msg : hello word tf card";
        return msg;
    }

    public void writeTF(String msg) {
        System.out.println("tf card write a msg : " + msg);
    }
}
`;

export const code_shipei_04 = `// 定义适配器类（SD兼容TF）
public class SDAdapterTF extends TFCardImpl implements SDCard {
    public String readSD() {
        System.out.println("adapter read tf card ");
        return readTF();
    }

    public void writeSD(String msg) {
        System.out.println("adapter write tf card");
        writeTF(msg);
    }
}
`;

export const code_shipei_05 = `// 测试类
public class Client {
    public static void main(String[] args) {
        Computer computer = new Computer();
        SDCard sdCard = new SDCardImpl();
        System.out.println(computer.readSD(sdCard));  
            
        System.out.println("------------");
        SDAdapterTF adapter = new SDAdapterTF();
        System.out.println(computer.readSD(adapter));
    }
}
`;

export const code_qiao_01 = `// 视频文件（实现化角色）
public interface VideoFile {
    void decode(String fileName);
}
`;

export const code_qiao_02 = `// avi文件（具体实现化角色 ）
public class AVIFile implements VideoFile {
    public void decode(String fileName) {
        System.out.println("avi file: " + fileName);
    }
}

// rmvb文件（具体实现化角色 ）
public class RMVBBFile implements VideoFile {
    public void decode(String fileName) {
        System.out.println("rmvb file: " + fileName);
    }
}
`;

export const code_qiao_03 = `// 操作系统版本（抽象化角色）
public abstract class OperatingSystem {
    protected VideoFile videoFile;   
    
    public OperatingSystem(VideoFile videoFile) {
        this.videoFile = videoFile;
    }
    
    public abstract void play(String fileName);
}
`;

export const code_qiao_04 = `// Windows版本（扩展抽象化角色）
public class Windows extends OperatingSystem {
    public Windows(VideoFile videoFile) {
        super(videoFile);
    }

    public void play(String fileName) {
        videoFile.decode(fileName);
    }
}

// mac版本（扩展抽象化角色）
public class Mac extends OperatingSystem {
    public Mac(VideoFile videoFile) {
        super(videoFile);
    }

    public void play(String fileName) {
        videoFile.decode(fileName);
    }
}
`;

export const code_qiao_05 = `// 测试类
public class Client {
    public static void main(String[] args) {
        OperatingSystem os = new Windows(new AVIFile());
        os.play("video.avi");
    }
}
`;

export const code_zuhe_01 = `// 菜单组件，菜单/菜单项都继承该类（抽象根节点）
public abstract class MenuComponent {
    protected String name;
    protected int level;
    
    // 添加菜单
    public void add(MenuComponent menuComponent) {
        throw new UnsupportedOperationException();
    }
    // 移除菜单
    public void remove(MenuComponent menuComponent) {
        throw new UnsupportedOperationException();
    }
    
    // 获取指定的子菜单
    public MenuComponent getChild(int i) {
        throw new UnsupportedOperationException();
    }
    
    // 获取菜单名称
    public String getName() {
        return name;
    }

    public void print() {
        throw new UnsupportedOperationException();
    }
}
`;

export const code_zuhe_02 = `// 子菜单（叶子节点）
public class MenuItem extends MenuComponent {
    public MenuItem(String name, int level) {
        this.name = name;
        this.level = level;
    }

    @Override
    public void print() {
        // 方便打印出层级效果
        for (int i = 1; i < level; i++) {
            System.out.print("--");
        }
        System.out.println(name);
    }
}
`;

export const code_zuhe_03 = `// 子菜单项（树枝节点）
public class Menu extends MenuComponent {
    private List<MenuComponent> menuComponentList;    
    
    public Menu(String name, int level) {
        this.level = level; this.name = name;
        menuComponentList = new ArrayList<MenuComponent>();
    }    
        
    @Override
    public void add(MenuComponent menuComponent) {
        menuComponentList.add(menuComponent);
    }    
        
    @Override
    public void remove(MenuComponent menuComponent) {
        menuComponentList.remove(menuComponent);
    }    
        
    @Override
    public MenuComponent getChild(int i) {
        return menuComponentList.get(i);
    }   
        
    @Override
    public void print() {
        // 方便打印出层级效果
        for (int i = 1; i < level; i++) {
            System.out.print("--");
        }
        System.out.println(name);
        for (MenuComponent menuComponent : menuComponentList) {
            menuComponent.print();
        }
    }
}
`;

export const code_zuhe_04 = `// 测试类
public class Client {
    public static void main(String[] args) {
        // 创建菜单树
        MenuComponent menu1 = new Menu("菜单管理", 2);
        menu1.add(new MenuItem("页面访问", 3));
        menu1.add(new MenuItem("展开菜单", 3));
        menu1.add(new MenuItem("编辑菜单", 3));
        menu1.add(new MenuItem("删除菜单", 3));
        menu1.add(new MenuItem("新增菜单", 3));

        MenuComponent menu2 = new Menu("权限管理", 2);
        menu2.add(new MenuItem("页面访问", 3));
        menu2.add(new MenuItem("提交保存", 3));

        MenuComponent menu3 = new Menu("角色管理", 2);
        menu3.add(new MenuItem("页面访问", 3));
        menu3.add(new MenuItem("新增角色", 3));
        menu3.add(new MenuItem("修改角色", 3));

        // 创建一级菜单
        MenuComponent component = new Menu("系统管理", 1);
        // 将二级菜单添加到一级菜单中
        component.add(menu1);
        component.add(menu2);
        component.add(menu3);

        // 打印菜单名称(如果有子菜单一块打印)
        component.print();
    }
}
`;

export const code_zhuang_01 = `// 快餐接口
public abstract class FastFood {
    private float price;
    private String desc;

    public FastFood() { }
    public FastFood(float price, String desc) {
        this.price = price;
        this.desc = desc;
    }

    public void setPrice(float price) {
        this.price = price;
    }
    public float getPrice() {
        return price;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
    public String getDesc() {
        return desc;
    }

    public abstract float cost(); // 获取价格
}
`;

export const code_zhuang_02 = `// 炒饭
public class FriedRice extends FastFood {
    public FriedRice() {
        super(10, "炒饭");
    }
    public float cost() {
        return getPrice();
    }
}

// 炒面
public class FriedNoodles extends FastFood {
    public FriedNoodles() {
        super(12, "炒面");
    }
    public float cost() {
        return getPrice();
    }
}
`;

export const code_zhuang_03 = `// 配料类
public abstract class Garnish extends FastFood {
    public Garnish(FastFood fastFood, float price, String desc) {
        super(price, desc);
        this.fastFood = fastFood;
    }
    
    private FastFood fastFood;
    public FastFood getFastFood() {
        return fastFood;
    }
    public void setFastFood(FastFood fastFood) {
        this.fastFood = fastFood;
    }
}
`;

export const code_zhuang_04 = `// 鸡蛋配料
public class Egg extends Garnish {
    public Egg(FastFood fastFood) {
        super(fastFood, 1, "鸡蛋");
    }
    
    @Override
    public float cost() {
        return getPrice() + getFastFood().getPrice();
    }    
        
    @Override
    public String getDesc() {
        return super.getDesc() + getFastFood().getDesc();
    }
}

// 培根配料
public class Bacon extends Garnish {
    public Bacon(FastFood fastFood) {
        super(fastFood, 2, "培根");
    }    
        
    @Override
    public float cost() {
        return getPrice() + getFastFood().getPrice();
    }   
        
    @Override
    public String getDesc() {
        return super.getDesc() + getFastFood().getDesc();
    }
}
`;

export const code_zhuang_05 = `// 测试类
public class Client {
    public static void main(String[] args) {
        // 点一份炒饭
        FastFood food = new FriedRice();
        System.out.println(food.getDesc() + " " + food.cost() + "元");

        System.out.println("========");
        // 点一份加鸡蛋的炒饭
        FastFood food1 = new FriedRice();
        System.out.println(food1.getDesc() + " " + food1.cost() + "元");
        food1 = new Egg(food1);
        System.out.println(food1.getDesc() + " " + food1.cost() + "元");

        System.out.println("========");
        // 点一份加培根的炒面
        FastFood food2 = new FriedNoodles();
        System.out.println(food2.getDesc() + " " + food2.cost() + "元");
        food2 = new Bacon(food2);
        System.out.println(food2.getDesc() + " " + food2.cost() + "元");
    }
}
`;

export const code_wai_01 = `// 智能音箱
public class SmartAppliancesFacade {
    private Light light;
    private TV tv;
    private AirCondition airCondition;

    public SmartAppliancesFacade() {
        light = new Light();
        tv = new TV();
        airCondition = new AirCondition();
    }

    public void say(String message) {
        if (message.contains("打开")) {
            on();
        } else if (message.contains("关闭")) {
            off();
        } else {
            System.out.println("我还听不懂你说的！！！");
        }
    }

    // 起床后一键开电器
    private void on() {
        System.out.println("起床了");
        light.on();
        tv.on();
        airCondition.on();
    }

    // 睡觉一键关电器
    private void off() {
        System.out.println("睡觉了");
        light.off();
        tv.off();
        airCondition.off();
    }
}
`;

export const code_wai_02 = `// 灯类
public class Light {
    public void on() {
        System.out.println("打开了灯....");
    }
    public void off() {
        System.out.println("关闭了灯....");
    }
}

// 电视类
public class TV {
    public void on() {
        System.out.println("打开了电视....");
    }
    public void off() {
        System.out.println("关闭了电视....");
    }
}

// 控制类
public class AirCondition {
    public void on() {
        System.out.println("打开了空调....");
    }
    public void off() {
        System.out.println("关闭了空调....");
    }
}
`;

export const code_wai_03 = `// 测试类
public class Client {
    public static void main(String[] args) {
        // 创建外观对象
        SmartAppliancesFacade facade = new SmartAppliancesFacade();

        // 客户端直接与外观对象进行交互
        facade.say("打开家电");
        facade.say("关闭家电");
    }
}
`;

export const code_xiang_01 = `// 抽象享元角色
public abstract class AbstractBox {
    // 获取图形的方法
    public abstract String getShape();
    // 显示图形及颜色
    public void display(String color) {
        System.out.println("方块形状：" + this.getShape() + " 颜色：" + color);
    }
}
`;

export const code_xiang_02 = `// 享元工厂角色，这里采用的是饿汉式单例
public class BoxFactory {
    // 享元池
    private static HashMap<String, AbstractBox> map;

    // 在构造方法中进行初始化操作
    private BoxFactory() {
        map = new HashMap<String, AbstractBox>();
        AbstractBox iBox = new IBox();
        AbstractBox lBox = new LBox();
        AbstractBox oBox = new OBox();
        map.put("I", iBox);
        map.put("L", lBox);
        map.put("O", oBox);
    }

    // 提供一个方法获取该工厂类对象
    public static final BoxFactory getInstance() {
        return SingletonHolder.INSTANCE;
    }
    private static class SingletonHolder {
        private static final BoxFactory INSTANCE = new BoxFactory();
    }

    // 根据名称获取图形对象
    public AbstractBox getShape(String key) {
        return map.get(key);
    }
}
`;

export const code_xiang_03 = `// 这3个都是具体享元角色
public class IBox extends AbstractBox {
    @Override
    public String getShape() {
        return "I";
    }
}

public class LBox extends AbstractBox {
    @Override
    public String getShape() {
        return "L";
    }
}

public class OBox extends AbstractBox {
    @Override
    public String getShape() {
        return "O";
    }
}
`;

export const code_xiang_04 = `public class Client {
    public static void main(String[] args) {
        //获取I图形对象
        AbstractBox box1 = BoxFactory.getInstance().getShape("I");
        box1.display("灰色");
 
        //获取L图形对象
        AbstractBox box2 = BoxFactory.getInstance().getShape("L");
        box2.display("绿色");
 
        //获取O图形对象
        AbstractBox box3 = BoxFactory.getInstance().getShape("O");
        box3.display("灰色");
 
        //获取O图形对象
        AbstractBox box4 = BoxFactory.getInstance().getShape("O");
        box4.display("红色");
 
        System.out.println("两次获取到的O图形对象是否是同一个对象：" + (box3 == box4));
    }
}
`;

export const code_dai_01 = `// 卖票接口
public interface SellTickets {
    void sell();
}
`;

export const code_dai_02 = `// 火车站  火车站具有卖票功能，所以需要实现SellTickets接口
public class TrainStation implements SellTickets {
    public void sell() {
        System.out.println("火车站卖票");
    }
}
`;

export const code_dai_03 = `//代售点
public class ProxyPoint implements SellTickets {
    private TrainStation station = new TrainStation();
    public void sell() {
        System.out.println("代理点收取一些服务费用");
        station.sell();
    }
}
`;

export const code_dai_04 = `// 测试类
public class Client {
    public static void main(String[] args) {
        ProxyPoint pp = new ProxyPoint();
        pp.sell();
    }
}
`;

export const code_ze_01 = `// 处理者抽象类
public abstract class Handler {
    protected final static int NUM_ONE = 1;
    protected final static int NUM_THREE = 3;
    protected final static int NUM_SEVEN = 7;

    // 该领导处理的请求天数区间
    private int numStart;
    private int numEnd;

    // 声明后续者（声明上级领导）
    private Handler nextHandler;
    public Handler(int numStart) {
        this.numStart = numStart;
    }
    public Handler(int numStart, int numEnd) {
        this.numStart = numStart;
        this.numEnd = numEnd;
    }

    // 设置上级领导对象
    public void setNextHandler(Handler nextHandler) {
        this.nextHandler = nextHandler;
    }

    // 各级领导处理请求条的方法
    protected abstract void handleLeave(LeaveRequest leave);

    // 提交请求条
    public final void submit(LeaveRequest leave) {
        // 该领导进行审批
        this.handleLeave(leave);
        if (this.nextHandler != null && leave.getNum() > this.numEnd) {
            // 提交给上级领导进行审批
            this.nextHandler.submit(leave);
        } else {
            System.out.println("流程结束！");
        }
    }
}
`;

export const code_ze_02 = `// 小组长类
public class GroupLeader extends Handler {
    public GroupLeader() {
        super(0, Handler.NUM_ONE);
    }
    protected void handleLeave(LeaveRequest leave) {
        System.out.println(leave);
        System.out.println("小组长审批：同意");
    }
}

// 部门经理
public class Manager extends Handler {
    public Manager() {
        super(Handler.NUM_ONE, Handler.NUM_THREE);
    }
    protected void handleLeave(LeaveRequest leave) {
        System.out.println(leave);
        System.out.println("部门经理审批：同意");
    }
}

// 总经理
public class GeneralManager extends Handler {
    public GeneralManager() {
        super(Handler.NUM_THREE, Handler.NUM_SEVEN);
    }
    protected void handleLeave(LeaveRequest leave) {
        System.out.println(leave);
        System.out.println("总经理审批：同意");
    }
}
`;

export const code_ze_03 = `// 请假条
public class LeaveRequest {
    private String name;// 姓名
    private int num;// 请假天数
    private String content;// 请假内容

    public LeaveRequest(String name, int num, String content) {
        this.name = name;
        this.num = num;
        this.content = content;
    }

    public String getName() {
        return name;
    }
    public int getNum() {
        return num;
    }
    public String getContent() {
        return content;
    }

    // 重写toString
    @Override
    public String toString() {
        return this.name+ "请假" + this.name + "天，" + this.content + "。";
    }
}
`;

export const code_ze_04 = `public class Client {
    public static void main(String[] args) {
        // 创建一个请假条对象
        LeaveRequest leave = new LeaveRequest("小明", 2, "身体不适");

        // 创建各级领导对象
        GroupLeader groupLeader = new GroupLeader();
        Manager manager = new Manager();
        GeneralManager generalManager = new GeneralManager();

        // 设置处理者链
        groupLeader.setNextHandler(manager);
        manager.setNextHandler(generalManager);

        // 小明提交请假申请
        groupLeader.submit(leave);
    }
}
`;

export const code_mingling_01 = `// 抽象命令类
public interface Command {
    // 命令执行方法
    void execute();
}
`;

export const code_mingling_02 = `// 订单命令类，属于具体的命令类，需要聚合对象接收者和接收者依赖的操作数据
public class OrderCommand implements Command {
    // 持有接收者对象
    private SeniorChef receiver;
    // 订单，接收者依赖的操作数据
    private Order order;

    public OrderCommand(SeniorChef receiver, Order order) {
        this.receiver = receiver;
        this.order = order;
    }

    public void execute() {
        System.out.println("开始" + order.getDiningTable() + "桌的订单");
        Map<String, Integer> foodDir = order.getFoodDir();
        // 遍历map集合
        Set<String> keys = foodDir.keySet();
        for (String foodName : keys) {
            receiver.makeFood(foodName, foodDir.get(foodName));
        }
        System.out.println(order.getDiningTable() + "桌的饭准备完毕！！！");
    }
}
`;

export const code_mingling_03 = `// 资深大厨类，是命令的Receiver（接收者角色）
public class SeniorChef {
    // 根据餐品及分数制作食物
    public void makeFood(String name, int num) {
        System.out.println("大厨：做了" + num + "份" + name);
    }
}
`;

export const code_mingling_04 = `// 服务员类，调用者（请求者）角色
public class Waitor {
    // 持有多个命令对象
    private List<Command> commands = new ArrayList<Command>();

    public void setCommand(Command cmd) {
        // 将cmd对象存储到list集合中
        commands.add(cmd);
    }

    // 发起命令功能 喊 订单来了
    public void orderUp() {
        System.out.println("美女服务员：大厨，新订单来了。。。。");
        // 遍历list集合
        for (Command command : commands) {
            if (command != null) {
                command.execute();
            }
        }
    }
}
`;

export const code_mingling_05 = `// 订单类
public class Order {
    // 餐桌号码
    private int diningTable;
    // 所下的餐品及份数
    private Map<String, Integer> foodDir = new HashMap<String, Integer>();

    public int getDiningTable() {
        return diningTable;
    }

    public void setDiningTable(int diningTable) {
        this.diningTable = diningTable;
    }

    public Map<String, Integer> getFoodDir() {
        return foodDir;
    }

    public void setFood(String name, int num) {
        foodDir.put(name, num);
    }
}
`;

export const code_mingling_06 = `public class Client {
    public static void main(String[] args) {
        // 创建第一个订单对象
        Order order1 = new Order();
        order1.setDiningTable(1);
        order1.setFood("西红柿鸡蛋面", 1);
        order1.setFood("小杯可乐", 2);

        // 创建第二个订单对象
        Order order2 = new Order();
        order2.setDiningTable(2);
        order2.setFood("尖椒肉丝盖饭", 1);
        order2.setFood("小杯雪碧", 1);

        // 创建厨师对象
        SeniorChef receiver = new SeniorChef();

        // 创建命令对象
        OrderCommand cmd1 = new OrderCommand(receiver, order1);
        OrderCommand cmd2 = new OrderCommand(receiver, order2);

        // 创建调用者（服务员对象）
        Waitor invoke = new Waitor();
        invoke.setCommand(cmd1);
        invoke.setCommand(cmd2);

        // 让服务员发起命令
        invoke.orderUp();
    }
}
`;

export const code_jieshi_01 = `// 抽象表达式类
public abstract class AbstractExpression {
    // 解释操作，所有的具体表达式（加、减、值、变量）都要实现它
    public abstract int interpret(Context context);
}
`;

export const code_jieshi_02 = `// 非终结符表达式角色 减法表达式 (left - right)
public class Minus extends AbstractExpression {
    // -号左边的表达式
    private AbstractExpression left;
    // -号右边的表达式
    private AbstractExpression right;
    public Minus(AbstractExpression left, AbstractExpression right) {
        this.left = left;
        this.right = right;
    }
    public int interpret(Context context) {
        // 将左边表达式的结果和右边表达式的结果进行相减
        return left.interpret(context) - right.interpret(context);
    }
    @Override
    public String toString() {
        // 用括号保证运算优先级的正确性
        return "(" + left.toString() + " - " + right.toString() + ")";
    }
}

// 非终结符表达式角色 加法表达式 (left + right)
public class Plus extends AbstractExpression {
    // +号左边的表达式
    private AbstractExpression left;
    // +号右边的表达式
    private AbstractExpression right;
    public Plus(AbstractExpression left, AbstractExpression right) {
        this.left = left;
        this.right = right;
    }
    public int interpret(Context context) {
        // 将左边表达式的结果和右边表达式的结果进行相加
        return left.interpret(context) + right.interpret(context);
    }
    @Override
    public String toString() {
        return "(" + left.toString() + " + " + right.toString() + ")";
    }
}
`;

export const code_jieshi_03 = `// 环境角色类 保存外部赋值
public class Context {
    private Map<Variable, Integer> map = new HashMap<Variable, Integer>();
    
    // 给变量赋值
    public void assign(Variable var, Integer value) {
        map.put(var, value);
    }

    // 获取某个变量的值
    public int getValue(Variable var) {
        Integer value = map.get(var);
        return value;
    }
}
`;

export const code_jieshi_04 = `// 终结符表达式角色 常量表达式
public class Value extends AbstractExpression {
    private int value;
    public Value(int value) {
        this.value = value;
    }

    @Override
    public int interpret(Context context) {
        // 常量不依赖环境，直接返回
        return value;
    }

    @Override
    public String toString() {
        return new Integer(value).toString();
    }
}

// 变量表达式
public class Variable extends AbstractExpression {
    // 声明存储变量名的成员变量（比如 "a", "b"）
    private String name;
    public Variable(String name) {
        this.name = name;
    }

    public int interpret(Context context) {
        // 从上下文中取出变量的值
        return context.getValue(this);
    }
        
    @Override
    public String toString() {
        return name;
    }
}
`;

export const code_jieshi_05 = `// 构建抽象语法树（AST），并解释执行
public class Client {
    public static void main(String[] args) {
        // 创建环境对象（上下文）
        Context context = new Context();

        // 创建多个变量对象
        Variable a = new Variable("a");
        Variable b = new Variable("b");
        Variable c = new Variable("c");
        Variable d = new Variable("d");
        // Value v = new Value(1);

        // 将变量存储到环境对象中
        context.assign(a, 1);
        context.assign(b, 2);
        context.assign(c, 3);
        context.assign(d, 4);

        // 获取抽象语法树 a - (b - c + d)
        AbstractExpression expression = new Minus(a, new Plus(new Minus(b, c), d));
        
        // 解释（计算）
        int result = expression.interpret(context);
        System.out.println(expression + " = " + result);
    }
}
`;

export const code_dei_01 = `// 抽象聚合角色接口
public interface StudentAggregate {
    // 添加学生功能
    void addStudent(Student stu);
    // 删除学生功能
    void removeStudent(Student stu);
    // 获取迭代器对象功能
    StudentIterator getStudentIterator();
}
`;

export const code_dei_02 = `// 具体聚合角色
public class StudentAggregateImpl implements StudentAggregate {
    private List<Student> list = new ArrayList<Student>();
    public void addStudent(Student stu) {
        list.add(stu);
    }
    public void removeStudent(Student stu) {
        list.remove(stu);
    }
    // 获取迭代器对象
    public StudentIterator getStudentIterator() {
        return new StudentIteratorImpl(list);
    }
}
`;

export const code_dei_03 = `// 抽象迭代器角色接口
public interface StudentIterator {
    // 判断是否还有元素
    boolean hasNext();
    // 获取下一个元素
    Student next();
}
`;

export const code_dei_04 = `// 具体迭代器角色类
public class StudentIteratorImpl implements StudentIterator {
    private List<Student> list;
    private int position = 0;// 用来记录遍历时的位置
    public StudentIteratorImpl(List<Student> list) {
        this.list = list;
    }
    public boolean hasNext() {
        return position < list.size();
    }
    public Student next() {
        // 从集合中获取指定位置的元素
        Student currentStudent = list.get(position);
        position++;
        return currentStudent;
    }
}
`;

export const code_dei_05 = `public class Student {
    private String name;
    private String number;    
    
    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", number='" + number + '\'' +
                '}';
    }    
                
    public String getName() {
        return name;
    }    
        
    public void setName(String name) {
        this.name = name;
    }    
        
    public String getNumber() {
        return number;
    }    
        
    public void setNumber(String number) {
        this.number = number;
    }    
        
    public Student(String name, String number) {
        this.name = name;
        this.number = number;
    }    
        
    public Student() { }
}
`;

export const code_dei_06 = `public class Client {
    public static void main(String[] args) {
        // 创建聚合对象
        StudentAggregateImpl aggregate = new StudentAggregateImpl();
        // 添加元素
        aggregate.addStudent(new Student("张三", "001"));
        aggregate.addStudent(new Student("李四", "002"));
        aggregate.addStudent(new Student("王五", "003"));
        aggregate.addStudent(new Student("赵六", "004"));
        
        // 获取迭代器对象
        StudentIterator iterator = aggregate.getStudentIterator();
        // 遍历
        while (iterator.hasNext()) {
            // 获取元素
            Student student = iterator.next();
            System.out.println(student.toString());
        }
    }
}
`;

export const code_zhong_01 = `// 抽象中介者
public abstract class Mediator {
    // 申明一个联络方法
    public abstract void constact(String message, Person person);
}
`;

export const code_zhong_02 = `// 中介机构
public class MediatorStructure extends Mediator {
    // 首先中介结构必须知道所有房主和租房者的信息
    private HouseOwner houseOwner;
    private Tenant tenant;    
    
    public HouseOwner getHouseOwner() {
        return houseOwner;
    }    
    public void setHouseOwner(HouseOwner houseOwner) {
        this.houseOwner = houseOwner;
    }   
        
    public Tenant getTenant() {
        return tenant;
    }     
    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }    
        
    public void constact(String message, Person person) {
        // 如果是房主，则租房者获得信息
        if (person == houseOwner) {
            tenant.getMessage(message);
        } else { // 反正则是房主获得信息
            houseOwner.getMessage(message);
        }
    }
}
`;

export const code_zhong_03 = `// 抽象同事类
public abstract class Person {
    protected String name;
    protected Mediator mediator;
    public Person(String name, Mediator mediator) {
        this.name = name;
        this.mediator = mediator;
    }
}
`;

export const code_zhong_04 = `// 具体同事类 房屋拥有者
public class HouseOwner extends Person {
    public HouseOwner(String name, Mediator mediator) {
        super(name, mediator);
    }    
        
    // 与中介者联系
    public void constact(String message) {
        mediator.constact(message, this);
    }    
        
    // 获取信息
    public void getMessage(String message) {
        System.out.println("房主" + name + "获取到的信息：" + message);
    }
}

// 具体同事类 承租人
public class Tenant extends Person {
    public Tenant(String name, Mediator mediator) {
        super(name, mediator);
    }    
        
    // 与中介者联系
    public void constact(String message) {
        mediator.constact(message, this);
    }
    
    // 获取信息
    public void getMessage(String message) {
        System.out.println("租者" + name + "获取到的信息：" + message);
    }
}
`;

export const code_zhong_05 = `// 测试类
public class Client {
    public static void main(String[] args) {
        // 中介机构
        MediatorStructure mediator = new MediatorStructure(); 

        // 房主和租房者只需要知道中介机构即可
        HouseOwner houseOwner = new HouseOwner("张三", mediator);
        Tenant tenant = new Tenant("李四", mediator);    

        // 中介结构要知道房主和租房者
        mediator.setHouseOwner(houseOwner);
        mediator.setTenant(tenant);    
        
        // 联络
        tenant.constact("我要租三室的房子！！！");
        houseOwner.constact("我这里有三室的房子，你要租吗？");
    }
}
`;

export const code_bei_01 = `public class GameRole {
    private int vit; // 生命力
    private int atk; // 攻击力
    private int def; // 防御力

    // 初始化内部状态
    public void initState() {
        this.vit = 100;
        this.atk = 100;
        this.def = 100;
    }

    // 保存角色状态功能
    public RoleStateMemento saveState() {
        return new RoleStateMemento(vit, atk, def);
    }    
        
    // 恢复角色状态
    public void recoverState(RoleStateMemento roleStateMemento) {
        // 将备忘录对象中存储的状态赋值给当前对象的成员
        this.vit = roleStateMemento.getVit();
        this.atk = roleStateMemento.getAtk();
        this.def = roleStateMemento.getDef();
    }    
        
    // 展示状态功能
    public void stateDisplay() {
        System.out.println("角色生命力：" + vit);
        System.out.println("角色攻击力：" + atk);
        System.out.println("角色防御力：" + def);
    }

    public int getVit() {
        return vit;
    }    
    public void setVit(int vit) {
        this.vit = vit;
    } 
        
    public int getAtk() {
        return atk;
    }    
    public void setAtk(int atk) {
        this.atk = atk;
    }   
        
    public int getDef() {
        return def;
    }    
    public void setDef(int def) {
        this.def = def;
    }

    // 战斗
    public void fight() {
        this.vit = 0;
        this.atk = 0;
        this.def = 0;
    }
}
`;

export const code_bei_02 = `public class RoleStateMemento {
    private int vit; // 生命力
    private int atk; // 攻击力
    private int def; // 防御力
    public RoleStateMemento(int vit, int atk, int def) {
        this.vit = vit;
        this.atk = atk;
        this.def = def;
    }
    public RoleStateMemento() { }

    public int getVit() {
        return vit;
    }    
    public void setVit(int vit) {
        this.vit = vit;
    }
    
    public int getAtk() {
        return atk;
    }    
    public void setAtk(int atk) {
        this.atk = atk;
    }    
    
    public int getDef() {
        return def;
    }    
    public void setDef(int def) {
        this.def = def;
    }
}
`;

export const code_bei_03 = `public class RoleStateCaretaker {
    // 声明RoleStateMemento类型的变量
    private RoleStateMemento roleStateMemento;

    public RoleStateMemento getRoleStateMemento() {
        return roleStateMemento;
    }
    public void setRoleStateMemento(RoleStateMemento roleStateMemento) {
        this.roleStateMemento = roleStateMemento;
    }
}
`;

export const code_bei_04 = `public class Client {
    public static void main(String[] args) {
        System.out.println("---------------大战boss前-----------------");
        // 创建游戏角色对象
        GameRole gameRole = new GameRole();
        gameRole.initState();// 初始化状态操作
        gameRole.stateDisplay();

        // 将该游戏角色内部状态进行备份
        // 创建管理者对象
        RoleStateCaretaker roleStateCaretaker = new RoleStateCaretaker();
        roleStateCaretaker.setRoleStateMemento(gameRole.saveState());

        System.out.println("---------------大战boss后-----------------");
        // 损耗严重
        gameRole.fight();
        gameRole.stateDisplay();

        System.out.println("---------------恢复之前的状态-----------------");
        gameRole.recoverState(roleStateCaretaker.getRoleStateMemento());
        gameRole.stateDisplay();
    }
}
`;

export const code_guan_01 = `// 定义抽象主题类，提供三个方法
public interface Subject {
    // 增加订阅者
    public void attach(Observer observer);
    // 删除订阅者
    public void detach(Observer observer);

    // 通知订阅者更新消息
    public void notify(String message);
}
`;

export const code_guan_02 = `// 微信公众号是具体主题（具体被观察者），存储订阅该公众号的微信用户，并实现了抽象主题中的方法
public class SubscriptionSubject implements Subject {
    // 储存订阅公众号的微信用户
    private List<Observer> weixinUserlist = new ArrayList<Observer>();
    
    @Override
    public void attach(Observer observer) {
        weixinUserlist.add(observer);
    }
    @Override
    public void detach(Observer observer) {
        weixinUserlist.remove(observer);
    }
    
    @Override
    public void notify(String message) {
        for (Observer observer : weixinUserlist) {
            observer.update(message);
        }
    }
}
`;

export const code_guan_03 = `// 定义抽象观察者类，定义一个更新的方法
public interface Observer {
    void update(String message);
}
`;

export const code_guan_04 = `// 定义具体观察者类，微信用户是观察者，实现更新的方法
public class WeixinUser implements Observer {
    // 微信用户名
    private String name;
    public WeixinUser(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println("通知 " + name + " " + message);
    }
}
`;

export const code_guan_05 = `public class Client {
    public static void main(String[] args) {
        SubscriptionSubject mSubscriptionSubject = new SubscriptionSubject();
        // 创建微信用户
        WeixinUser user1 = new WeixinUser("孙悟空");
        WeixinUser user2 = new WeixinUser("猪悟能");
        WeixinUser user3 = new WeixinUser("沙悟净");
        // 订阅公众号
        mSubscriptionSubject.attach(user1);
        mSubscriptionSubject.attach(user2);
        mSubscriptionSubject.attach(user3);
        // 公众号更新发出消息给订阅的微信用户（观察者对象或订阅者）
        mSubscriptionSubject.notify("Java博客更新了");
    }
}
`;

export const code_zhuangtai_01 = `// 抽象状态类
public abstract class LiftState {
    // 定义一个环境角色，也就是封装状态的变化引起的功能变化
    protected Context context;
    public void setContext(Context context) {
        this.context = context;
    }

    // 电梯开门动作
    public abstract void open();
    // 电梯关门动作
    public abstract void close();
    // 电梯运行动作
    public abstract void run();
    // 电梯停止动作
    public abstract void stop();
}
`;

export const code_zhuangtai_02 = `// 开启状态
public class OpenningState extends LiftState {
    // 电梯门打开的动作
    @Override
    public void open() {
        System.out.println("电梯门已开启");
    }    
        
    @Override
    public void close() {
        // 状态修改
        super.context.setLiftState(Context.CLOSING_STATE);
        // 动作委托为CloseState来执行，也就是委托给了ClosingState子类执行这个动作
        super.context.getLiftState().close();
    }    
        
    // 电梯门不能开着就跑，这里什么也不做
    @Override
    public void run() {
        // do nothing
        System.out.println("***电梯门已开启，无法运行");
    }    
        
    // 开门状态已经是停止的了
    @Override
    public void stop() {
        // do nothing
        System.out.println("***电梯已处在停止状态");
    }
}

// 关闭状态
public class ClosingState extends LiftState {    
    @Override
    // 电梯门关闭的动作
    public void close() {
        System.out.println("电梯门已关闭");
    }   
        
    // 在关闭的状态下，电梯门可打开
    @Override
    public void open() {
        super.context.setLiftState(Context.OPENNING_STATE);
        super.context.open();
    }   
        
    // 电梯门已关，正常运行
    @Override
    public void run() {
        super.context.setLiftState(Context.RUNNING_STATE);
        super.context.run();
    }    
        
    // 电梯门关着，我就不按楼层
    @Override
    public void stop() {
        super.context.setLiftState(Context.STOPPING_STATE);
        super.context.stop();
    }
}

// 运行状态
public class RunningState extends LiftState {
    // 电梯正在运行，无法开门的
    @Override
    public void open() {
        // do nothing
        System.out.println("***电梯正在运行，无法开门");
    }   
        
    // 电梯正在运行。电梯门肯定关闭
    @Override
    public void close() {
        // 虽然可以关门，但这个动作不归我执行
        // do nothing
        System.out.println("***电梯门已处在关闭状态");
    }   
        
    // 这是在运行状态下要实现的方法
    @Override
    public void run() {
        System.out.println("电梯正在运行");
    }    
        
    // 正常停止电梯
    @Override
    public void stop() {
        super.context.setLiftState(Context.STOPPING_STATE);
        super.context.stop();
    }
}

// 停止状态
public class StoppingState extends LiftState {   
    // 停止状态，开门，那是要的！
    @Override
    public void open() {
        // 状态修改
        super.context.setLiftState(Context.OPENNING_STATE);
        // 动作委托为CloseState来执行，也就是委托给了ClosingState子类执行这个动作
        super.context.getLiftState().open();
    }   
        
    @Override
    public void close() {
        // 状态修改
        super.context.setLiftState(Context.CLOSING_STATE);
        // 动作委托为CloseState来执行，也就是委托给了ClosingState子类执行这个动作
        super.context.getLiftState().close();
    }   
        
    // 停止状态再跑起来，正常的很
    @Override
    public void run() {
        // 状态修改
        super.context.setLiftState(Context.RUNNING_STATE);
        // 动作委托为CloseState来执行，也就是委托给了ClosingState子类执行这个动作
        super.context.getLiftState().run();
    }    
        
    // 停止状态是怎么发生的呢？当然是停止方法执行了
    @Override
    public void stop() {
        System.out.println("电梯已停止");
    }
}
`;

export const code_zhuangtai_03 = `// 环境角色
public class Context {
    // 定义出所有的电梯状态
    public final static OpenningState OPENNING_STATE = new OpenningState();// 开门状态，这时候电梯只能关闭
    public final static ClosingState CLOSING_STATE = new ClosingState();// 关闭状态，这时候电梯可以运行、停止和开门
    public final static RunningState RUNNING_STATE = new RunningState();// 运行状态，这时候电梯只能停止
    public final static StoppingState STOPPING_STATE = new StoppingState();// 停止状态，这时候电梯可以开门、运行
    // 定义一个当前电梯状态
    private LiftState liftState;    
    
    public LiftState getLiftState() {
        return this.liftState;
    }  
         
    public void setLiftState(LiftState liftState) {
        // 当前环境改变
        this.liftState = liftState;
        // 把当前的环境通知到各个实现类中
        this.liftState.setContext(this);
    }   
        
    public void open() {
        this.liftState.open();
    }   
        
    public void close() {
        this.liftState.close();
    }   
        
    public void run() {
        this.liftState.run();
    }    
        
    public void stop() {
        this.liftState.stop();
    }
}
`;

export const code_zhuangtai_04 = `public class Client {
    public static void main(String[] args) {
        // 创建环境角色对象
        Context context = new Context();

        // 设置当前电梯装填
        context.setLiftState(new ClosingState());
        System.out.println("电梯初始状态为：门关闭");
        context.open();
        context.run();
        context.close();
        context.run();
        context.open();
        context.stop();
    }
}
`;

export const code_ce_01 = `// 抽象策略类
public interface Strategy {
    void show();
}
`;

export const code_ce_02 = `// 定义具体策略角色：每个节日具体的促销活动
// 为春节准备的促销活动A
public class StrategyA implements Strategy {
    public void show() {
        System.out.println("买一送一");
    }
}

// 为中秋准备的促销活动B
public class StrategyB implements Strategy {
    public void show() {
        System.out.println("满200元减50元");
    }
}

// 为圣诞准备的促销活动C
public class StrategyC implements Strategy {
    public void show() {
        System.out.println("满1000元加一元换购任意200元以下商品");
    }
}
`;

export const code_ce_03 = `// 定义环境角色（Context）：用于连接上下文，即把促销活动推销给客户
public class SalesMan {
    // 持有抽象策略角色的引用
    private Strategy strategy;
    public SalesMan(Strategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(Strategy strategy) {
        this.strategy = strategy;
    }

    // 向客户展示促销活动
    public void salesManShow() {
        strategy.show();
    }
}
`;

export const code_ce_04 = `public class Client {
    public static void main(String[] args) {
        System.out.println("=======春节=======");
        // 春节来了，使用春节促销活动
        SalesMan salesMan = new SalesMan(new StrategyA());
        // 展示促销活动
        salesMan.salesManShow();

        System.out.println("=======中秋节=======");
        // 中秋节到了，使用中秋节的促销活动
        salesMan.setStrategy(new StrategyB());
        // 展示促销活动
        salesMan.salesManShow();

        System.out.println("=======圣诞节=======");
        // 圣诞节到了，使用圣诞节的促销活动
        salesMan.setStrategy(new StrategyC());
        // 展示促销活动
        salesMan.salesManShow();
    }
}
`;

export const code_moban_01 = `// 抽象类
public abstract class AbstractClass {
    // 定义模板方法，定义为final固定流程，禁止被重写
    public final void cookProcess() {
        // 第一步：倒油
        this.pourOil();
        // 第二步：热油
        this.heatOil();
        // 第三步：倒蔬菜
        this.pourVegetable();
        // 第四步：倒调味料
        this.pourSauce();
        // 第五步：翻炒
        this.fry();
    }

    // 第一步：倒油
    public void pourOil() {
        System.out.println("倒油");
    }
    // 第二步：热油是一样的，所以直接实现
    public void heatOil() {
        System.out.println("热油");
    }
    // 第三步：倒蔬菜是不一样的（一个下包菜，一个是下菜心）
    public abstract void pourVegetable();
    // 第四步：倒调味料是不一样
    public abstract void pourSauce();
    // 第五步：翻炒是一样的，所以直接实现
    public void fry() {
        System.out.println("炒啊炒啊炒到熟啊");
    }
}
`;

export const code_moban_02 = `// 具体子类
// 炒手撕包菜类
public class ConcreteClass_BaoCai extends AbstractClass {
    @Override
    public void pourVegetable() {
        System.out.println("下锅的蔬菜是包菜");
    }
    @Override
    public void pourSauce() {
        System.out.println("下锅的酱料是辣椒");
    }
}

// 炒蒜蓉菜心类
public class ConcreteClass_CaiXin extends AbstractClass {
    @Override
    public void pourVegetable() {
        System.out.println("下锅的蔬菜是菜心");
    }
    @Override
    public void pourSauce() {
        System.out.println("下锅的酱料是蒜蓉");
    }
}
`;

export const code_moban_03 = `public class Client {
    public static void main(String[] args) {
        System.out.println("=======炒手撕包菜=======");
        ConcreteClass_BaoCai baoCai = new ConcreteClass_BaoCai();
        baoCai.cookProcess();

        System.out.println("=======炒蒜蓉菜心=======");
        ConcreteClass_CaiXin caiXin = new ConcreteClass_CaiXin();
        caiXin.cookProcess();
    }
}
`;

export const code_fang_01 = `// 抽象访问者角色类（这里的方法名称可以更抽象一点，扩展性会更好）
public interface Person {
    // 喂食宠物狗
    void feed(Cat cat);
    // 喂食宠物猫
    void feed(Dog dog);
}
`;

export const code_fang_02 = `// 具体访问者角色类(主人)
public class Owner implements Person {
    public void feed(Cat cat) {
        System.out.println("主人喂食猫");
    }
    public void feed(Dog dog) {
        System.out.println("主人喂食狗");
    }
}

// 具体访问者角色类(其他人)
public class Someone implements Person {
    public void feed(Cat cat) {
        System.out.println("其他人喂食猫");
    }

    public void feed(Dog dog) {
        System.out.println("其他人喂食狗");
    }
}
`;

export const code_fang_03 = `// 抽象元素角色类
public interface Animal {
    // 接受访问者访问的功能
    void accept(Person person);
}
`;

export const code_fang_04 = `// 具体元素角色类（宠物狗）
public class Dog implements Animal {
    public void accept(Person person) {
        person.feed(this); // 访问者给宠物猫喂食
        System.out.println("好好吃，汪汪汪。。。");
    }
}

// 具体元素角色类（宠物猫）
public class Cat implements Animal {
    public void accept(Person person) {
        person.feed(this); // 访问者给宠物猫喂食
        System.out.println("好好吃，喵喵喵。。。");
    }
}
`;

export const code_fang_05 = `// 对象结构类
public class Home {
    // 声明一个集合对象，用来存储元素对象
    private List<Animal> nodeList = new ArrayList<Animal>();    
    
    // 添加元素功能
    public void add(Animal animal) {
        nodeList.add(animal);
    }    
        
    public void action(Person person) {
        // 遍历集合，获取每一个元素，让访问者访问每一个元素
        for (Animal animal : nodeList) {
            animal.accept(person);
        }
    }
}
`;

export const code_fang_06 = `public class Client {
    public static void main(String[] args) {
        // 创建Home对象
        Home home = new Home();
        // 添加元素到Home对象中
        home.add(new Dog());
        home.add(new Cat());

        // 主人喂食
        System.out.println("=== 主人喂食宠物 ===");
        Person owner = new Owner();
        home.action(owner);

        // 其他人喂食
        System.out.println("=== 其他人喂食宠物 ===");
        Person someone = new Someone();
        home.action(someone);
    }
}
`;
