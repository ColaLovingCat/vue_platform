export const notes = [
  {
    id: "section-010102",
    type: "topic",
    title: "例题-CPU",
    question:
      "在CPU中，常用来为ALU执行算术逻辑运算提供数据并暂存运算结果的寄存器是___。",
    options: [["程序计数器", "状态寄存器", "通用寄存器", "累加寄存器"]],
    answer: "D",
  },
  {
    id: "section-010103",
    type: "topic",
    title: "例题-CPU",
    question: "在CPU中，___不仅要保证指令的正确执行，还要能够处理异常事件。",
    options: [["运算器", "控制器", "寄存器组", "内部总线"]],
    answer: "B",
  },
  {
    id: "section-010103",
    type: "topic",
    title: "例题-CPU",
    question: "在CPU中，用于跟踪指令地址的寄存器是___。",
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
    options: [["0", "-1", "2^16-1", "-2^16+1"]],
    answer: "B。首先是16转2为 F=>1111，然后根据负数则先求发码再求原码。",
  },
  {
    id: "section-010202",
    type: "topic",
    title: "例题-数据表示",
    question: "采用n位补码（包含一个符号位）表示数据，则___。",
    options: [["表示2^n", "表示-2^n", "表示2^(n-1)", "表示-2^(n-1)"]],
    answer: "D",
  },
  {
    id: "section-010203",
    type: "topic",
    title: "例题-浮点数",
    question: "某机器的浮点数中，阶码以补码表示，尾数以原码表示。则1 0001 0 0000000001表示的浮点数是___。",
    options: [["2^-16*2^-10", "2^-15*2^-10", "2^-16*(1-2^-10)", "2^-15*(1-2^-10)"]],
    answer: "B",
  },
  {
    id: "section-01",
    type: "topic",
    title: "例题-sample",
    question: "___。",
    options: [["", "", "", ""]],
    answer: "",
  },
];
