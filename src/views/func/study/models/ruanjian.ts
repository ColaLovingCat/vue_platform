export const notes = [
  {
    id: "section-010102",
    type: "topic",
    title: "例题-CPU",
    question:
      "在CPU中，常用来为ALU执行算术逻辑运算提供数据并暂存运算结果的寄存器是___。",
    imgs: [],
    options: [
      {
        answer: "D",
        list: ["程序计数器", "状态寄存器", "通用寄存器", "累加寄存器"],
        note: "",
      },
    ],
  },
  {
    id: "section-010103",
    type: "topic",
    title: "例题-CPU",
    question: "在CPU中，___不仅要保证指令的正确执行，还要能够处理异常事件。",
    imgs: [],
    options: [
      {
        answer: "B",
        list: ["运算器", "控制器", "寄存器组", "内部总线"],
        note: "",
      },
    ],
  },
  {
    id: "section-010103",
    type: "topic",
    title: "例题-CPU",
    question: "在CPU中，用于跟踪指令地址的寄存器是___。",
    imgs: [],
    options: [
      {
        answer: "C",
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
    title: "例题-进制",
    question: "内存按字节编址从B3000H到DABFFH的区域，其存储容量为___。",
    imgs: [],
    options: [
      {
        answer: "B",
        list: ["123KB", "159KB", "163KB", "194KB"],
        note: "H表示16进制，(DABFF+1)-B3000=27C00/1024=159KB，注意单位是B还是b",
      },
    ],
  },
  {
    id: "section-010201",
    type: "topic",
    title: "例题-进制",
    question:
      "地址编号从80000H到BFFFFH且按字节编址的内存容量为___。若用16K*4bit的存储器芯片构成该内存，共需___片。",
    imgs: [],
    options: [
      { answer: "B", list: ["128", "256", "512", "1024"], note: "" },
      { answer: "C", list: ["8", "16", "32", "64"], note: "注意16K*4bit=8KB" },
    ],
  },
  {
    id: "section-010202",
    type: "topic",
    title: "例题-数据表示",
    question: "若某整数的16位补码为FFFFH，则该数的十进制为___。",
    imgs: [],
    options: [
      {
        answer: "B",
        list: ["0", "-1", "2^16-1", "-2^16+1"],
        note: "首先是16转2为 F=>1111，然后根据负数则先求反码 1 111 1111 1111 1110 再求原码 1 000 0000 0000 0001",
      },
    ],
  },
  {
    id: "section-010202",
    type: "topic",
    title: "例题-数据表示",
    question: "采用n位补码（包含一个符号位）表示数据，则___。",
    imgs: [],
    options: [
      {
        answer: "D",
        list: ["表示 2^n", "表示 -2^n", "表示 2^(n-1)", "表示 -2^(n-1)"],
        note: "",
      },
    ],
  },
  {
    id: "section-010203",
    type: "topic",
    title: "例题-浮点数",
    question:
      "某机器的浮点数中，阶码以补码表示，尾数以原码表示。则1 0001 0 0000000001表示的浮点数是___。",
    imgs: [],
    options: [
      {
        answer: "B",
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
    title: "例题-寻址",
    question:
      "若CPU要执行指令为：MOV R1，#45（即将数值45传送到寄存器R1中），则该指令中采用的寻址方式为___。",
    imgs: [],
    options: [
      {
        answer: "B",
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
    title: "例题-海明码",
    question:
      "海明码利用奇偶性检错和纠错，通过在n个数据位之间插入k个校验位，扩大数据编码的码距。若n=48，则k应至少为___。",
    imgs: [],
    options: [{ answer: "C", list: ["4", "5", "6", "7"], note: "" }],
  },
  {
    id: "section-010304",
    type: "topic",
    title: "例题-CRC",
    question: "在___校验方法中，采用模2运算来构造校验位。",
    imgs: [],
    options: [
      {
        answer: "D",
        list: ["水平奇偶", "垂直奇偶", "海明码", "循环冗余"],
        note: "",
      },
    ],
  },
  {
    id: "section-010602",
    type: "topic",
    title: "例题-指令集架构",
    question: "___不是RISC的特点。",
    imgs: [],
    options: [
      {
        answer: "A",
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
    title: "例题-指令集架构",
    question: "以下关于RISC和CISC计算机的叙述中，正确的是___。",
    imgs: [],
    options: [
      {
        answer: "D",
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
    title: "例题-流水线",
    question:
      "一条指令的执行过程可分解为取值时间=3Δt、分析时间=2Δt、执行时间=4Δt。若按串行方式执行，则10条指令全部执行完需要___Δt。若按照流水线方式执行，则执行完10条指令需要___Δt。",
    imgs: [],
    options: [
      { answer: "C", list: ["40", "70", "90", "100"], note: "" },
      { answer: "D", list: ["20", "30", "40", "45"], note: "" },
    ],
  },
  {
    id: "section-010401",
    type: "topic",
    title: "例题-存储器",
    question: "计算机系统的主存主要是由___构成的。",
    imgs: [],
    options: [
      { answer: "A", list: ["DRAM", "SRAM", "Cache", "EEPROM"], note: "" },
    ],
  },
  {
    id: "section-010402",
    type: "topic",
    title: "例题-Cache",
    question: "Cache的地址映像方式中，发生冲突次数最小的是___。",
    imgs: [],
    options: [
      {
        answer: "A",
        list: ["全相联映像", "组相联映像", "直接映像", "无法确定"],
        note: "",
      },
    ],
  },
  {
    id: "section-010402",
    type: "topic",
    title: "例题-Cache",
    question: "在程序的执行过程中，Cache与主存的地址映像由___。",
    imgs: [],
    options: [
      {
        answer: "A",
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
    title: "例题-I/O",
    question: "以下关于中断方式与DMA方式的叙述中，正确的是___。",
    imgs: [],
    options: [
      {
        answer: "A",
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
    title: "例题-总线",
    question: "总线复用方式可以___。",
    imgs: [],
    options: [
      {
        answer: "C",
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
    title: "例题-总线",
    question:
      "总线带宽为32bit，时钟频率为2000MHz，若总线上每5个时钟周期传送一个32bit的字，则该总线的带宽为___MB/s。",
    imgs: [],
    options: [{ answer: "C", list: ["40", "80", "160", "200"], note: "" }],
  },
  {
    id: "section-010801",
    type: "topic",
    title: "例题-加密和认证",
    question: "公钥体系中，私钥用于___，公钥用于___。",
    imgs: [],
    options: [
      {
        answer: "A",
        list: ["解密和签名", "加密和签名", "解密和认证", "加密和认证"],
        note: "",
      },
      {
        answer: "D",
        list: ["解密和签名", "加密和签名", "解密和认证", "加密和认证"],
        note: "",
      },
    ],
  },
  {
    id: "section-010801",
    type: "topic",
    title: "例题-加密算法",
    question: "下列算法中，不属于公开密钥加密算法的是___。",
    imgs: [],
    options: [{ answer: "D", list: ["ECC", "DSA", "RSA", "DES"], note: "" }],
  },
  {
    id: "section-010801",
    type: "topic",
    title: "例题-加密算法",
    question: "AES是一种___算法。",
    imgs: [],
    options: [
      {
        answer: "C",
        list: ["公钥加密", "流密码", "分组加密", "信息摘要"],
        note: "",
      },
    ],
  },
  {
    id: "section-010802",
    type: "topic",
    title: "例题-可靠性",
    question:
      "某系统由下图所示的部件构成，每个部件的千小时可靠度都为R，则该系统的千小时可靠度为___。",
    imgs: ["10-jiami.png"],
    options: [
      {
        answer: "C",
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
    title: "例题-前驱图",
    question:
      "进程P1、P2、P3、P4、P5的前驱图如下。若用PV操作控制进程并发执行，则需要设置6个信号量S1~S6，且信号量初始值均为0。下图中a和b分别填写___；c和d分别填写___；e和f分别填写___。",
    imgs: ["/docs/study/imgs/100-ti.png"],
    options: [
      {
        answer: "C",
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
    title: "例题-信号量",
    question:
      "某系统有3个相同资源，信号量S=3,有5个进程并发执行。某一时刻S=-2，则___。",
    imgs: [],
    options: [
      {
        answer: "B",
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
    title: "例题-信号量",
    question:
      "假设系统采用PV操作实现进程同步与互斥，若n个进程共享两台打印机，那么信号量S的取值范围为___。",
    imgs: [],
    options: [
      {
        answer: "D",
        list: ["-2~n", "-(n-1)~1", "-(n-1)~2", "-(n-2)~2"],
        note: "",
      },
    ],
  },
  {
    id: "section-090205",
    type: "topic",
    title: "例题-生产者消费者",
    question:
      "某企业生产流水线M共有两个生产者，生产者甲不断地将其工序上加工的半成品放入半成品箱，生产者乙从半成品箱取出继续加工。假设半成品箱可存放n件半成品，采用PV操作实现生产者甲和生产者乙的同步可设置三个信号量S、S1、S2，其同步模型如下图。信号量S是一个互斥信号量，初始值为___；S1、S2的初始值分别为___。",
    imgs: ["/docs/study/imgs/101-ti.png"],
    options: [
      { answer: "B", list: ["0", "1", "n", "任意正整数"], note: "" },
      { answer: "A", list: ["n、0", "0、n", "1、n", "n、1"], note: "" },
    ],
  },
  {
    id: "section-090207",
    type: "topic",
    title: "例题-进程资源图",
    question: "进程资源图如图所示，其中图a中___，图b中___。",
    imgs: ["/docs/study/imgs/102-ti.png"],
    options: [
      {
        answer: "B",
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
    title: "例题-PV操作",
    question: "进程的前驱图如下图所示。若用PV操作控制进程的并发执行过程，需要5个信号量S1~S5，且信号量的初始值都等于0.如下的进程执行图中a和b分别填写___；c和d分别填写___；e和f分别填写___。",
    imgs: ['/docs/study/imgs/103-ti.png','/docs/study/imgs/104-ti.png'],
    options: [
      {
        answer: "B",
        list: [
          "V(S1)和P(S2) V(S3)", 
          "P(S1)和V(S2) V(S3)", 
          "V(S1)和V(S2) V(S3)", 
          "P(S1)和P(S2) V(S3)"
        ],
        note: "",
      },
      {
        answer: "C",
        list: ["P(S2)和P(S4)", "V(S2)和P(S4)", "P(S2)和V(S4)", "V(S2)和V(S4)"],
        note: "",
      },
      {
        answer: "A",
        list: ["P(S4)和V(S5)", "V(S5)和P(S4)", "V(S4)和P(S5)", "V(S4)和V(S5)"],
        note: "",
      },
    ],
  },
  {
    id: "section-01",
    type: "topic",
    title: "例题-sample",
    question: "___。",
    imgs: [],
    options: [
      {
        answer: "",
        list: ["", "", "", ""],
        note: "",
      },
    ],
  },
];

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
}

class AmericanoCoffee implements Coffee {
    @Override
    public void info() {
        System.out.println("美式咖啡");
    }
}

class LatteCoffee implements Coffee {
    @Override
    public void info() {
        System.out.println("拿铁咖啡");
    }
}

interface CoffeeFactory {
    public Coffee createCoffee();
}

class AmericanoFactory implements CoffeeFactory {
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

class Coffe_FactoryMethod {
    public static void main(String[] args) {
        AmericanoFactory americanoFactory = new AmericanoFactory();
        Coffee americanoCoffee = americanoFactory.createCoffee();
        americanoCoffee.info();

        LatteFactory latteFactory = new LatteFactory();
        Coffee latteCoffee = latteFactory.createCoffee();
        latteCoffee.info();
    }
}
`;

export const code_chouxiang_01 = `interface Dessert {
    public void info();
}

class MatchaMousse implements Dessert {
    @Override
    public void info() {
        System.out.println("抹茶慕斯");
    }
}

class Tiramisu implements Dessert {
    @Override
    public void info() {
        System.out.println("提拉米苏");
    }
}

interface Coffee {
    public void info();
}

class AmericanoCoffee implements Coffee {
    @Override
    public void info() {
        System.out.println("美式咖啡");
    }
}

class LatteCoffee implements Coffee {
    @Override
    public void info() {
        System.out.println("拿铁咖啡");
    }
}

interface DessertFactory {
    public Coffee createCoffee();
    public Dessert createDessert();
}

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

class ItalyDessertFactory implements DessertFactory {
    @Override
    public Coffee createCoffee() {
        return new LatteCoffee();
    }
    @Override
    public Dessert createDessert() {
        return new Tiramisu();
    }
}

class Coffe_FactoryMethod {
    public static void main(String[] args) {
        DessertFactory americanFactory = new AmericanDessertFactory();
        Coffee americanCoffee = americanFactory.createCoffee();
        americanCoffee.info();
        Dessert americanDessert = americanFactory.createDessert();
        americanDessert.info();
        DessertFactory italyFactory = new ItalyDessertFactory();
        Coffee italyCoffee = italyFactory.createCoffee();
        italyCoffee.info();
        Dessert italyDessert = italyFactory.createDessert();
        italyDessert.info();
    }
}`;

export const code_shengchengqi_01 = `// 自行车类
public class Bike {
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
public abstract class Builder {
    protected Bike mBike = new Bike();
    public abstract void buildFrame();
    public abstract void buildSeat();
    public abstract Bike createBike();
}`;

export const code_shengchengqi_03 = `// 指挥者类
public class Director {
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
public class MobikeBuilder extends Builder {
    @Override
    public void buildFrame() {
        mBike.setFrame("铝合金车架");
    }

    @Override
    public void buildSeat() {
        mBike.setSeat("真皮车座");
    }

    @Override
    public Bike createBike() {
        return mBike;
    }
}
// ofo单车Builder类
public class OfoBuilder extends Builder {
    @Override
    public void buildFrame() {
        mBike.setFrame("碳纤维车架");
    }

    @Override
    public void buildSeat() {
        mBike.setSeat("橡胶车座");
    }

    @Override
    public Bike createBike() {
        return mBike;
    }
}
`;

export const code_shengchengqi_05 = `// 测试类
public class Client {
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

// avi文件（具体实现化角色 ）
public class AVIFile implements VideoFile {
    public void decode(String fileName) {
        System.out.println("avi视频文件：" + fileName);
    }
}

// rmvb文件（具体实现化角色 ）
public class RMVBBFile implements VideoFile {
    public void decode(String fileName) {
        System.out.println("rmvb文件：" + fileName);
    }
}
`;

export const code_qiao_02 = `// 操作系统版本（抽象化角色）
public abstract class OperatingSystemVersion {
    protected VideoFile videoFile;   
    
    public OperatingSystemVersion(VideoFile videoFile) {
        this.videoFile = videoFile;
    }
    
    public abstract void play(String fileName);
}

// Windows版本（扩展抽象化角色）
public class Windows extends OperatingSystem {
    public Windows(VideoFile videoFile) {
        super(videoFile);
    }

    public void play(String fileName) {
        videoFile.decode(fileName);
    }
}
// mac版本（扩展抽象化角色）
public class Mac extends OperatingSystemVersion {
    public Mac(VideoFile videoFile) {
        super(videoFile);
    }

    public void play(String fileName) {
        videoFile.decode(fileName);
    }
}
`;

export const code_qiao_03 = `// 测试类
public class Client {
    public static void main(String[] args) {
        OperatingSystem os = new Windows(new AVIFile());
        os.play(“战狼3.avi");
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
        MenuComponent menu = new Menu("菜单管理", 2);
        menu.add(new MenuItem("页面访问", 3));
        menu.add(new MenuItem("展开菜单", 3));

        // 创建一级菜单
        MenuComponent root = new Menu("系统管理", 1);

        // 将二级菜单添加到一级菜单中
        root.add(menu);

        // 打印菜单名称(如果有子菜单一块打印)
        root.print();
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
        // 点一份炒饭和价格
        FastFood food = new FriedRice();
        System.out.println(food.getDesc() + " " + food.cost() + "元");
        System.out.println("========");
        
        // 点一份加鸡蛋的炒饭和价格
        FastFood food1 = new FriedRice();
        food1 = new Egg(food1);
        System.out.println(food1.getDesc() + " " + food1.cost() + "元");
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
    public AbstractBox getBox(String key) {
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
        // 获取I图形对象
        AbstractBox box1 = BoxFactory.getInstance().getShape("I");
        box1.display("灰色");

        // 获取L图形对象
        AbstractBox box2 = BoxFactory.getInstance().getShape("L");
        box2.display("绿色");
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
        return this.name+ "请假" + this.name + "天，" + this.content + "。"
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
        System.out.println(order.getDiningTable() + "桌的订单：");
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
    public void makeFood(String name,int num) {
        System.out.println(num + "份" + name);
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
    public abstract int interpret(Context context);
}
`;

export const code_jieshi_02 = `// 非终结符表达式角色 减法表达式
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
        return "(" + left.toString() + " - " + right.toString() + ")";
    }
}
// 非终结符表达式角色 加法表达式
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

export const code_jieshi_03 = `// 环境角色类
public class Context {
    private Map<Variable, Integer> map = new HashMap<Variable, Integer>();
    public void assign(Variable var, Integer value) {
        map.put(var, value);
    }
    public int getValue(Variable var) {
        Integer value = map.get(var);
        return value;
    }
}
`;

export const code_jieshi_04 = `// 终结符表达式角色
public class Value extends AbstractExpression {
    private int value;
    public Value(int value) {
        this.value = value;
    }
    @Override
    public int interpret(Context context) {
        return value;
    }
    @Override
    public String toString() {
        return new Integer(value).toString();
    }
}
`;

export const code_jieshi_05 = `// 封装变量的类
public class Variable extends AbstractExpression {
    // 声明存储变量名的成员变量
    private String name;
    public Variable(String name) {
        this.name = name;
    }
    public int interpret(Context context) {
        // 直接返回变量的值
        return context.getValue(this);
    }
    @Override
    public String toString() {
        return name;
    }
}
`;

export const code_jieshi_06 = `public class Client {
    public static void main(String[] args) {
        // 创建环境对象
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
        // 获取抽象语法树 a + b - c + d
        AbstractExpression expression = new Minus(a, new Minus(new Minus(b, c), d));
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
        // 遍历聚合对象
        // 1,获取迭代器对象
        StudentIterator iterator = aggregate.getStudentIterator();
        // 2,遍历
        while (iterator.hasNext()) {
            // 3,获取元素
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
        System.out.println("租房者" + name + "获取到的信息：" + message);
    }
}
`;

export const code_zhong_05 = `// 测试类
public class Client {
    public static void main(String[] args) {
        // 一个房主、一个租房者、一个中介机构
        MediatorStructure mediator = new MediatorStructure();        
        // 房主和租房者只需要知道中介机构即可
        HouseOwner houseOwner = new HouseOwner("张三", mediator);
        Tenant tenant = new Tenant("李四", mediator);        
        // 中介结构要知道房主和租房者
        mediator.setHouseOwner(houseOwner);
        mediator.setTenant(tenant);        
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
        System.out.println(name + "-" + message);
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
    // 开启当然可以关闭了，我就想测试一下电梯门开关功能
    @Override
    public void open() {
        System.out.println("电梯门开启...");
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
    }    
        
    // 开门状态已经是停止的了
    @Override
    public void stop() {
        // do nothing
    }
}

// 关闭状态
public class ClosingState extends LiftState {    
    @Override
    // 电梯门关闭，这是关闭状态要实现的动作
    public void close() {
        System.out.println("电梯门关闭...");
    }   
        
    // 电梯门关了再打开，逗你玩呢，那这个允许呀
    @Override
    public void open() {
        super.context.setLiftState(Context.OPENNING_STATE);
        super.context.open();
    }   
        
    // 电梯门关了就跑，这是再正常不过了
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
    // 运行的时候开电梯门？你疯了！电梯不会给你开的
    @Override
    public void open() {
        // do nothing
    }   
        
    // 电梯门关闭？这是肯定了
    @Override
    public void close() {// 虽然可以关门，但这个动作不归我执行
        // do nothing
    }   
        
    // 这是在运行状态下要实现的方法
    @Override
    public void run() {
        System.out.println("电梯正在运行...");
    }    
        
    // 这个事绝对是合理的，光运行不停止还有谁敢做这个电梯？！估计只有上帝了
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
    public void close() {// 虽然可以关门，但这个动作不归我执行
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
        System.out.println("电梯停止了...");
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
    // 向客户展示促销活动
    public void salesManShow() {
        strategy.show();
    }
}
`;

export const code_ce_04 = `public class Client {
    public static void main(String[] args) {
        // 春节来了，使用春节促销活动
        SalesMan salesMan = new SalesMan(new StrategyA());
        // 展示促销活动
        salesMan.salesManShow();
        System.out.println("==============");
        // 中秋节到了，使用中秋节的促销活动
        salesMan.setStrategy(new StrategyB());
        // 展示促销活动
        salesMan.salesManShow();
        System.out.println("==============");
        // 圣诞节到了，使用圣诞节的促销活动
        salesMan.setStrategy(new StrategyC());
        // 展示促销活动
        salesMan.salesManShow();
    }
}
`;

export const code_zhuangtai_04 = `public class Client {
    public static void main(String[] args) {
        // 创建环境角色对象
        Context context = new Context();
        // 设置当前电梯装填
        context.setLiftState(new ClosingState());
        context.open();
        context.run();
        context.close();
        context.stop();
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
        // 炒手撕包菜
        ConcreteClass_BaoCai baoCai = new ConcreteClass_BaoCai();
        baoCai.cookProcess();
        // 炒蒜蓉菜心
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
        // 创建主人对象
        Owner owner = new Owner();
        // 让主人喂食所有的宠物
        home.action(owner);
    }
}
`;
