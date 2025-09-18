export const notes = [
  {
    id: "section-010102",
    type: "topic",
    title: "例题-CPU",
    question:
      "在CPU中，常用来为ALU执行算术逻辑运算提供数据并暂存运算结果的寄存器是___。",
    imgs: [],
    options: [["程序计数器", "状态寄存器", "通用寄存器", "累加寄存器"]],
    answer: "D",
  },
  {
    id: "section-010103",
    type: "topic",
    title: "例题-CPU",
    question: "在CPU中，___不仅要保证指令的正确执行，还要能够处理异常事件。",
    imgs: [],
    options: [["运算器", "控制器", "寄存器组", "内部总线"]],
    answer: "B",
  },
  {
    id: "section-010103",
    type: "topic",
    title: "例题-CPU",
    question: "在CPU中，用于跟踪指令地址的寄存器是___。",
    imgs: [],
    options: [
      ["地址寄存器 AR", "数据寄存器 DR", "程序计数器 PC", "指令寄存器 IR"],
    ],
    answer: "C",
  },
  {
    id: "section-010201",
    type: "topic",
    title: "例题-进制",
    question: "内存按字节编址从B3000H到DABFFH的区域，其存储容量为___。",
    imgs: [],
    options: [["123KB", "159KB", "163KB", "194KB"]],
    answer:
      "B。H表示16进制，(DABFF+1)-B3000=27C00/1024=159KB，注意单位是B还是b。",
  },
  {
    id: "section-010201",
    type: "topic",
    title: "例题-进制",
    question:
      "地址编号从80000H到BFFFFH且按字节编址的内存容量为___。若用16K*4bit的存储器芯片构成该内存，共需___片。",
    imgs: [],
    options: [
      ["128", "256", "512", "1024"],
      ["8", "16", "32", "64"],
    ],
    answer: "B; C。注意16K*4bit=8KB。",
  },
  {
    id: "section-010202",
    type: "topic",
    title: "例题-数据表示",
    question: "若某整数的16位补码为FFFFH，则该数的十进制为___。",
    imgs: [],
    options: [["0", "-1", "2^16-1", "-2^16+1"]],
    answer: "B。首先是16转2为 F=>1111，然后根据负数则先求发码再求原码。",
  },
  {
    id: "section-010202",
    type: "topic",
    title: "例题-数据表示",
    question: "采用n位补码（包含一个符号位）表示数据，则___。",
    imgs: [],
    options: [["表示2^n", "表示-2^n", "表示2^(n-1)", "表示-2^(n-1)"]],
    answer: "D",
  },
  {
    id: "section-010203",
    type: "topic",
    title: "例题-浮点数",
    question:
      "某机器的浮点数中，阶码以补码表示，尾数以原码表示。则1 0001 0 0000000001表示的浮点数是___。",
    imgs: [],
    options: [
      ["2^-16*2^-10", "2^-15*2^-10", "2^-16*(1-2^-10)", "2^-15*(1-2^-10)"],
    ],
    answer: "B",
  },
  {
    id: "section-010605",
    type: "topic",
    title: "例题-寻址",
    question:
      "若CPU要执行指令为：MOV R1，#45（即将数值45传送到寄存器R1中），则该指令中采用的寻址方式为___。",
    imgs: [],
    options: [
      [
        "直接寻址和立即寻址",
        "寄存器寻址和立即寻址",
        "相对寻址和直接寻址",
        "寄存器间接寻址和直接寻址",
      ],
    ],
    answer: "B。关键词：寄存器存数值",
  },
  {
    id: "section-010303",
    type: "topic",
    title: "例题-海明码",
    question:
      "海明码利用奇偶性检错和纠错，通过在n个数据位之间插入k个校验位，扩大数据编码的码距。若n=48，则k应至少为___。",
    imgs: [],
    options: [["4", "5", "6", "7"]],
    answer: "C",
  },
  {
    id: "section-010304",
    type: "topic",
    title: "例题-CRC",
    question: "在___校验方法中，采用模2运算来构造校验位。",
    imgs: [],
    options: [["水平奇偶", "垂直奇偶", "海明码", "循环冗余"]],
    answer: "D",
  },
  {
    id: "section-010602",
    type: "topic",
    title: "例题-指令集架构",
    question: "___不是RISC的特点。",
    imgs: [],
    options: [
      ["指令种类丰富", "高效的流水线操作", "寻址方式较少", "硬布线控制"],
    ],
    answer: "A",
  },
  {
    id: "section-010602",
    type: "topic",
    title: "例题-指令集架构",
    question: "以下关于RISC和CISC计算机的叙述中，正确的是___。",
    imgs: [],
    options: [
      [
        "RISC不采用流水线技术，CISC采用流水线技术",
        "RISC使用复杂的指令，CISC使用简单的指令",
        "RISC采用很少的通用寄存器，CISC采用很多的通用寄存器",
        "RISC采用组合逻辑控制器，CISC普遍采用微程序控制器",
      ],
    ],
    answer: "D",
  },
  {
    id: "section-010603",
    type: "topic",
    title: "例题-流水线",
    question:
      "一条指令的执行过程可分解为取值时间=3Δt、分析时间=2Δt、执行时间=4Δt。若按串行方式执行，则10条指令全部执行完需要___Δt。若按照流水线方式执行，则执行完10条指令需要___Δt。",
    imgs: [],
    options: [
      ["40", "70", "90", "100"],
      ["20", "30", "40", "45"],
    ],
    answer: "C；D",
  },
  {
    id: "section-010401",
    type: "topic",
    title: "例题-存储器",
    question: "计算机系统的主存主要是由___构成的。",
    imgs: [],
    options: [["DRAM", "SRAM", "Cache", "EEPROM"]],
    answer: "A",
  },
  {
    id: "section-010402",
    type: "topic",
    title: "例题-Cache",
    question: "Cache的地址映像方式中，发生冲突次数最小的是___。",
    imgs: [],
    options: [["全相联映像", "组相联映像", "直接映像", "无法确定"]],
    answer: "A",
  },
  {
    id: "section-010402",
    type: "topic",
    title: "例题-Cache",
    question: "在程序的执行过程中，Cache与主存的地址映像由___。",
    imgs: [],
    options: [
      [
        "专门的硬件自动完成",
        "程序员进行调度",
        "操作系统进行管理",
        "程序员和操作系统共同协调完成",
      ],
    ],
    answer: "A",
  },
  {
    id: "section-010501",
    type: "topic",
    title: "例题-I/O",
    question: "以下关于中断方式与DMA方式的叙述中，正确的是___。",
    imgs: [],
    options: [
      [
        "中断方式与DMA方式都可以实现外设与CPU之间的并行工作",
        "程序中断方式和DMA方式在数据传输过程中都不需要CPU的干预",
        "采用DMA方式传输数据的速度比程序中断方式的速度慢",
        "程序中断方式和DMA方式都不需要CPU保护现场",
      ],
    ],
    answer: "A",
  },
  {
    id: "section-010701",
    type: "topic",
    title: "例题-总线",
    question: "总线复用方式可以___。",
    imgs: [],
    options: [
      [
        "提高总线的传输带宽",
        "增加总线的功能",
        "减少总线中信号线的总量",
        "提高CPU利用率",
      ],
    ],
    answer: "C",
  },
  {
    id: "section-010701",
    type: "topic",
    title: "例题-总线",
    question:
      "总线带宽为32bit，时钟频率为2000MHz，若总线上每5个时钟周期传送一个32bit的字，则该总线的带宽为___MB/s。",
    imgs: [],
    options: [["40", "80", "160", "200"]],
    answer: "",
  },
  {
    id: "section-010801",
    type: "topic",
    title: "例题-加密和认证",
    question: "公钥体系中，私钥用于___，公钥用于___。",
    imgs: [],
    options: [
      ["解密和签名", "加密和签名", "解密和认证", "加密和认证"],
      ["解密和签名", "加密和签名", "解密和认证", "加密和认证"],
    ],
    answer: "A；D",
  },
  {
    id: "section-010801",
    type: "topic",
    title: "例题-加密算法",
    question: "下列算法中，不属于公开密钥加密算法的是___。",
    imgs: [],
    options: [["ECC", "DSA", "RSA", "DES"]],
    answer: "D",
  },
  {
    id: "section-010801",
    type: "topic",
    title: "例题-加密算法",
    question: "AES是一种___算法。",
    imgs: [],
    options: [["公钥加密", "流密码", "分组加密", "信息摘要"]],
    answer: "C",
  },
  {
    id: "section-010802",
    type: "topic",
    title: "例题-可靠性",
    question:
      "某系统由下图所示的部件构成，每个部件的千小时可靠度都为R，则该系统的千小时可靠度为___。",
    imgs: ["10-jiami.png"],
    options: [
      ["3R/2+2R/3", "R/3+R/2", "(1-(1-R)^3)(1-(1-R)^2)", "(1-(1-R)^3-(1-R)^2)"],
    ],
    answer: "C",
  },
  {
    id: "section-01",
    type: "topic",
    title: "例题-sample",
    question: "___。",
    imgs: [],
    options: [["", "", "", ""]],
    answer: "",
  },
];

export const code_huisu_01 = `
#define N 4

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
}
`;

export const code_huisu_02 = `
#define N 4

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
}
`;
