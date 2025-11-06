<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from "vue";

import codeView from "@/components/editor-code/view.vue";
import noteView from "../comps/note-card.vue";
import sortView from "../comps/sort.vue";

import * as notes from "./notes";
import * as db from "./datas";

import * as extend from "@/commons/utils/extends";

// name
defineOptions({
  name: "custom-name",
});

const pageInfos = reactive({
  menus: [] as any[],
  notes: [] as any[],
  //
  ports: [] as any[],
});

const contentRef = ref<HTMLElement>();

const activeId = ref<string>("");
const visibleNotes = ref<any[]>([]);

const codeConfig = (language: string) => {
  return {
    language,
    theme: "vs-dark",
    readOnly: true,
  };
};

onMounted(() => {
  pageInfos.notes = [...notes.list];
  refreshMenus();
  //
  pageInfos.ports = [...db.ports];
});

const refreshMenus = () => {
  if (!contentRef.value) return;

  const headers = contentRef.value.querySelectorAll("h1, h2, h3, h4");
  const menus: typeof pageInfos.menus = [];

  headers.forEach((header) => {
    // 先取自身的 id，没有的话取父级的 id
    let id = header.id || header.parentElement?.id || "";
    const text = header.textContent?.trim() || "";

    let level = 1;
    switch (header.tagName.toLowerCase()) {
      case "h1":
        level = 1;
        break;
      case "h2":
        level = 2;
        break;
      case "h3":
        level = 3;
        break;
      case "h4":
        level = 4;
        break;
    }

    if (id) menus.push({ id, text, level });
  });

  pageInfos.menus = menus;

  // 更新滚动监听（目录高亮）
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          activeId.value = id;

          // 让对应的菜单项始终可见
          const el = document.querySelector(`.menus li[data-id="${id}"]`);
          if (el) {
            el.scrollIntoView({
              block: "nearest", // 保证只滚动到刚好可见，不会整个容器跳动
              behavior: "smooth",
            });
          }
        }
      });
    },
    { rootMargin: "0px 0px -80% 0px", threshold: 0 }
  );

  // 监听 div[id]（不监听 h1/h2/h3/h4）
  contentRef.value
    .querySelectorAll("div[id]")
    .forEach((el) => observer.observe(el));

  const divs = contentRef.value.querySelectorAll<HTMLElement>("div[id]");
  divs.forEach((div) => {
    // 绑定点击事件
    div.addEventListener("click", () => {
      const id = div.id;
      visibleNotes.value = notes.list.filter((note) => note.id === id);
    });

    // 自动在标题后加题目数
    const h4 = div.querySelector("h4");
    if (h4 && notesCountMap.value[div.id]) {
      const span = document.createElement("span");
      span.textContent = ` [${notesCountMap.value[div.id]}]`;
      h4.appendChild(span);
    }
  });
};
const notesCountMap = computed(() => {
  const map: Record<string, number> = {};
  pageInfos.notes.forEach((note) => {
    if (note.id) {
      map[note.id] = (map[note.id] || 0) + 1;
    }
  });
  return map;
});
function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const noteModal = ref(false);
const noteInfos = reactive({
  id: "section-01",
  type: "topic",
  title: "例题-sample",
  question: "___。",
  imgs: [],
  options: [["", "", "", ""]],
  answer: "",
  notes: "",
});
const nextNote = () => {
  const index = extend.ExNumber.createRand(0, notes.list.length - 1);
  Object.assign(noteInfos, notes.list[index]);
};

const showModal = (action: string, values: any) => {
  switch (action) {
    case "note": {
      Object.assign(noteInfos, values);
      noteModal.value = true;
      break;
    }
    default: {
      break;
    }
  }
};
</script>

<template>
  <div class="sections">
    <div class="study-contents">

      <div class="left">
        <div class="content" ref="contentRef">
          <div class="header">
            <h1 id="main-title">软件设计师</h1>
            <p class="desc">
              是负责软件系统设计、架构、实现和维护的专业技术人员，其工作涵盖需求分析、系统设计、代码实现、性能优化及文档编写等软件生命周期全过程，并组织和指导程序员进行程序编写与调试。
            </p>
          </div>
          <h2 id="chapter-01">一、计算机系统 (3-7)</h2>
          <h3 id="part-0101">1. 中央处理单元</h3>
          <div class="part-contents">
            <div id="section-010101">
              <h4>1.1 CPU <i class="txt-en">Central Processing Unit</i></h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">功能</span>程序控制：执行存储在内存中的指令序列、操作控制、时间控制、数据处理
                </p>
                <p>
                  <span class="txt-define">组成</span>运算器、控制器、寄存器组、内部总线
                </p>
              </div>
            </div>
            <div id="section-010102">
              <h4>
                1.2 运算器单元(ALU)
                <i class="txt-en">Arithmetic and Logic Unit</i>
              </h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">功能</span>执行具体的算术运算、逻辑运算和逻辑测试，并返回结果
                </p>
                <p><b>算术逻辑单元(ALU) </b>
                  <i class="txt-en">Arithmetic and Logic Unit</i>
                  ：执行算术运算、逻辑运算
                </p>
                <p>
                  <b>累加寄存器(AC) </b>
                  <i class="txt-en">Accumulator Register</i>
                  ：为ALU提供数据和暂存运算结果
                </p>
                <p>
                  <b>数据缓冲寄存器(DR) </b>
                  <i class="txt-en">Data Register</i>
                  ：内存<span class="txt-symbol">⇔</span>CPU之间进行数据中转
                </p>
                <p>
                  <b>状态条件寄存器(PSW) </b>
                  <i class="txt-en">Program Status Word</i>
                  ：更新指令执行的状态标志和控制标志，保存和记录特定的状态信息和条件
                </p>
                <img class="img-01 img-abs" style="width: 320px" src="/docs/study/imgs/01-cpu.png" />
              </div>
            </div>
            <div id="section-010103">
              <h4>1.3 控制器单元(CU) <i class="txt-en">Control Unit</i></h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">功能</span>生成控制信号，保证程序指令有序正确的执行并处理异常事件，实现自动化和稳定性
                </p>
                <p>
                  <b>程序计数器(PC) </b>
                  <i class="txt-en">Program Counter</i>
                  ：存储当前执行的指令地址和指令计数，指示下一条要执行的指定地址
                </p>
                <p>
                  <b>指令寄存器(IR) </b>
                  <i class="txt-en">Instruction Register</i>
                  ：内存
                  <span class="txt-symbol">⇒</span>DR<span class="txt-symbol">⇒</span>
                  IR暂存执行的指令(操作码+地址码)
                </p>
                <p>
                  <b>指令译码器(ID) </b>
                  <i class="txt-en">Instruction Decoder</i>
                  ：分析指令的操作码和操作数，确定操作类型
                </p>
                <p>
                  <b>地址寄存器(AR) </b>
                  <i class="txt-en">Address Register</i>
                  ：保存访问的内存单元的地址
                </p>
              </div>
            </div>
          </div>
          <h3 id="part-0102">2. 数据表示</h3>
          <div class="part-contents">
            <div id="section-010201">
              <h4>2.1 基本单位/进制</h4>
              <div class="sub-contents">
                <p>位(比特)<span class="txt-symbol">⇒</span>bit/b</p>
                <p>字节<span class="txt-symbol">⇒</span>B = 8b</p>
                <p>KB/MB/GB/TB 1024</p>
                <p>10进制<span class="txt-symbol">⇒</span>D (0-9)</p>
                <p>2进制<span class="txt-symbol">⇒</span>B (0,1)</p>
                <table>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td></td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td></td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>10</td>
                      <td>9</td>
                      <td>8</td>
                      <td></td>
                      <td>7</td>
                      <td>6</td>
                      <td>5</td>
                      <td>4</td>
                      <td></td>
                      <td>3</td>
                      <td>2</td>
                      <td>1</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>2048</td>
                      <td>1024</td>
                      <td>512</td>
                      <td>256</td>
                      <td></td>
                      <td>128</td>
                      <td>64</td>
                      <td>32</td>
                      <td>16</td>
                      <td></td>
                      <td>8</td>
                      <td>4</td>
                      <td>2</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
                <p>8进制<span class="txt-symbol">⇒</span>O (0-7)</p>
                <p><b>16进制</b><span class="txt-symbol">⇒</span>H (0-F)</p>
                <p>
                  <span class="txt-define">转换</span>按权展开求和/整除取余
                  小数：相乘取整
                </p>
                <table>
                  <tbody>
                    <tr>
                      <td>A</td>
                      <td>B</td>
                      <td>C</td>
                      <td>D</td>
                      <td>E</td>
                      <td>F</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>11</td>
                      <td>12</td>
                      <td>13</td>
                      <td>14</td>
                      <td>15</td>
                    </tr>
                  </tbody>
                </table>
                <img class="img-02 img-abs" style="width: 150px" src="/docs/study/imgs/02-jinzhi.png" />
              </div>
            </div>
            <div id="section-010202">
              <h4>2.2 定点数</h4>
              <div class="sub-contents">
                <table>
                  <thead>
                    <tr>
                      <th>码制</th>
                      <th></th>
                      <th>0</th>
                      <th>-45</th>
                      <th>定点整数</th>
                      <th>定点小数</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>原码</td>
                      <td>最高位为符号位，0正1负</td>
                      <th>0000 0000 / 1000 0000</th>
                      <td>1 010 1101</td>
                      <td>
                        <span class="txt-func">-(2<span class="txt-sup">n-1</span>-1)</span>
                        ~
                        <span class="txt-func">2<span class="txt-sup">n-1</span>-1</span>
                      </td>
                      <td>
                        <span class="txt-func">-(1-2<span class="txt-sup">-(n-1)</span>)</span>
                        ~
                        <span class="txt-func">1-2<span class="txt-sup">-(n-1)</span></span>
                      </td>
                    </tr>
                    <tr>
                      <td>反码</td>
                      <td>正数相同，负数按位求反</td>
                      <th>0000 0000 / 1111 1111</th>
                      <td>1 101 0010</td>
                      <td>
                        <span class="txt-func">-(2<span class="txt-sup">n-1</span>-1)</span>
                        ~
                        <span class="txt-func">2<span class="txt-sup">n-1</span>-1</span>
                      </td>
                      <td>
                        <span class="txt-func">-(1-2<span class="txt-sup">-(n-1)</span>)</span>
                        ~
                        <span class="txt-func">1-2<span class="txt-sup">-(n-1)</span></span>
                      </td>
                    </tr>
                    <tr>
                      <td>补码</td>
                      <td>正数相同，负数反码加1</td>
                      <th>0000 0000</th>
                      <td>1 101 0011</td>
                      <td>
                        <span class="txt-func">-2<span class="txt-sup">n-1</span></span>
                        ~
                        <span class="txt-func">2<span class="txt-sup">n-1</span>-1</span>
                      </td>
                      <td>
                        <span class="txt-func">-1</span>
                        ~
                        <span class="txt-func">1-2<span class="txt-sup">-(n-1)</span></span>
                      </td>
                    </tr>
                    <tr>
                      <td>移码</td>
                      <td>补码符号位取反</td>
                      <th>1000 0000</th>
                      <td>0 101 0011</td>
                      <td>
                        <span class="txt-func">-2<span class="txt-sup">n-1</span></span>
                        ~
                        <span class="txt-func">2<span class="txt-sup">n-1</span>-1</span>
                      </td>
                      <td>
                        <span class="txt-func">-1</span>
                        ~
                        <span class="txt-func">1-2<span class="txt-sup">-(n-1)</span></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>补码适合进行数字相加减</p>
                <p>移码适合浮点数阶码</p>
              </div>
            </div>
            <div id="section-010203">
              <h4>2.3 浮点数</h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">定义</span>用 [阶符S+阶码E] +
                  [数符+尾数F] 表示
                  <span class="txt-func">N=(-1)<span class="txt-sup">S</span>*2<span class="txt-sup">𝐸</span>∗𝐹</span>
                </p>
                <p>阶码决定数值范围，尾数决定精度</p>
                <p>
                  运算时先<b>对阶</b>：将小阶向大阶对齐，尾数右移、尾数计算、格式化
                </p>
                <p>R位阶码移码+M位尾数补码 可表示范围:</p>
                <img class="img-03" style="width: 350px" src="/docs/study/imgs/03-fanwei.png" />
                <p>规格化数</p>
              </div>
            </div>
          </div>
          <h3 id="part-0103">3. 校验码</h3>
          <div class="part-contents">
            <div id="section-010301">
              <h4>3.1 校验码</h4>
              <div class="sub-contents">
                <p><span class="txt-define">定义</span>验证数据完整性的技术</p>
                <p><b>码距</b>：两个编码之间至少有多少个二进制位不同</p>
                <p>码距为2可检错，大于等于3可纠错</p>
              </div>
            </div>
            <div id="section-010302">
              <h4>3.2 奇偶校验码</h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">定义</span>将编码中1的个数变为奇数或偶数，可以检测
                  奇数个错误，码距2，不能纠错
                </p>
              </div>
            </div>
            <div id="section-010303">
              <h4>3.3 海明码</h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">定义</span>数据位n之间的特定位置插入k个校验位。利用多组数位的奇偶性来检错和纠错
                </p>
                <p>
                  必须满足
                  <span class="txt-func">2<span class="txt-sup">K</span>-1 ≥ n+k</span>
                </p>
              </div>
            </div>
            <div id="section-010304">
              <h4>
                3.4 循环冗余校验码(CRC)
                <i class="txt-en">Cyclic Redundancy Check</i>
              </h4>
              <div class="sub-contents">
                <p>采用<b>模2运算</b></p>
                <p>k位+r检验码，码距为2，不能纠错</p>
              </div>
            </div>
          </div>
          <h3 id="part-0104">4. 层次化存储结构</h3>
          <div class="part-contents">
            <div id="section-010401">
              <h4>4.1 存储器</h4>
              <div class="sub-contents">
                <table>
                  <tbody>
                    <tr>
                      <td>寄存器 <i class="txt-en">Register</i></td>
                      <td>CPU</td>
                    </tr>
                    <tr>
                      <td>高速缓存 <i class="txt-en">Cache</i></td>
                      <td>
                        <p>SRAM 静态随机存储器</p>
                        <p>按内容存取</p>
                      </td>
                    </tr>
                    <tr>
                      <td>内存(主存) <i class="txt-en">Primary Storage</i></td>
                      <td>
                        <p>DRAM 动态随机存储器</p>
                        <p>周期性刷新，断电丢失</p>
                      </td>
                    </tr>
                    <tr>
                      <td>外存(辅存) <i class="txt-en">Secondary Storage</i></td>
                      <td>硬盘、光盘、U盘</td>
                    </tr>
                  </tbody>
                </table>
                <p>Cache与主存之间的地址映射由<b>硬件自动</b>完成</p>
                <p>辅存与主存之间的地址映射由<b>硬件和软件</b>结合完成</p>
                <p>虚拟存储器：主存+辅存，依据于局部性原理，为了扩大主存容量，其容量由计算机的地址结构决定</p>
                <p>相联存储器：按<b>内容</b>存取，用于高速缓冲存储器</p>
                <p>闪存FLASH：按<b>块</b>为单位，可代替辅存</p>
                <p>内存：静态数据区(全局变量和静态变量)、代码区、栈区(编译器自动分配释放)、堆区(程序员分配释放)</p>
              </div>
            </div>
            <div id="section-010402">
              <h4>4.2 高速缓存 Cache</h4>
              <div class="sub-contents">
                <p>容量与命中率：在合理成本下提高命中率</p>
                <p>
                  地址映像：主存地址和Cache地址的转换，是由<b>硬件自动</b>完成
                </p>
                <p>替换算法：目的是提高命中率</p>
                <p>随机替换算法、先进先出算法、近期最少使用算法、优化替代算法</p>
                <p>Cache地址映像方法</p>
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>冲突率</th>
                      <th>电路</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>直接相连映像</td>
                      <td>高</td>
                      <td>简单</td>
                    </tr>
                    <tr>
                      <td>组相联映像</td>
                      <td>中</td>
                      <td>中</td>
                    </tr>
                    <tr>
                      <td>全相联映像</td>
                      <td>低</td>
                      <td>复杂</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-010403">
              <h4>4.3 分类</h4>
              <div class="sub-contents">
                <p>按工作方式分类：</p>
                <p>读写存储器 RAM：随机，断电丢失</p>
                <p>只读存储器</p>
                <p>固定只读存储器 ROM：只读，断电不丢失</p>
                <p>可编程的只读存储器 PROM：一次性写入，写入后不能再修改</p>
                <p>可擦除可编程的只读存储器 EPROM</p>
                <p>电擦除可编程的只读存储器 EEPROM</p>
                <p>闪速存储器 FM：其特性介于EPROM和EEPROM之间，类似于EEPROM</p>
                <p>按寻址方式分类</p>
                <p>随机存储器 RAM</p>
                <p>顺序存储器 SAM</p>
                <p>直接存储器 DAM</p>
              </div>
            </div>
          </div>
          <h3 id="part-0105">5. 输入输出技术</h3>
          <div class="part-contents">
            <div id="section-010501">
              <h4>5.1 I/O控制方式</h4>
              <div class="sub-contents">
                <table>
                  <tbody>
                    <tr>
                      <td>直接程序查询方式</td>
                      <td>
                        <p>CPU和I/O设备只能<b>串行</b>工作，轮询检查</p>
                        <p>一次只能读写一个字</p>
                        <p>由CPU将数据放入内存</p>
                      </td>
                    </tr>
                    <tr>
                      <td>中断驱动方式</td>
                      <td>
                        <p>I/O设备通过中断信号主动报告操作已完成</p>
                        <p>CPU和I/O设备可并行工作，提升CPU利用率</p>
                        <p>一次只能读写一个字</p>
                        <p>由CPU将数据放入内存</p>
                      </td>
                    </tr>
                    <tr>
                      <td>直接存储器存取方式(DMA)</td>
                      <td>
                        <p>CPU和I/O设备可并行工作</p>
                        <p>
                          连接主存和外设，仅在传送开始和结束时需<b>CPU干预</b>
                        </p>
                        <p>一次读写一个<b>块</b></p>
                        <p>由<b>外设</b>直接将数据放入内存</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-010502">
              <h4>5.2 中断</h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">定义</span>暂停当前程序，执行中断服务程序，完成后返回源程序
                </p>
                <p><b>中断向量</b>：提供中断服务程序的入口地址</p>
                <p><b>中断响应时间</b>：从发出中断请求到开始进入中断处理程序</p>
                <p><b>保存现场</b>：返回执行源程序</p>
                <p>保存断点和现场：堆栈</p>
              </div>
            </div>
          </div>
          <h3 id="part-0106">6. 计算机体系结构 <i class="txt-en">Computer Architecture</i></h3>
          <div class="part-contents">
            <div id="section-010601">
              <h4>6.1 概念</h4>
              <div class="sub-contents">
                <p>计算机体系结构：指计算机的概念性结构和功能属性</p>
                <p>
                  计算机体系结构的逻辑实现，包括机器内的数据流和控制流的组成以及逻辑设计等
                </p>
                <p>组织：各种部件的动态联系和管理</p>
                <p>实现：计算机组织的物理实现，各模块设计的组装完成</p>
                <p>性能：计算机系统的行为表现</p>
              </div>
            </div>
            <div id="section-010602">
              <h4>6.2 Flynn分类法</h4>
              <div class="sub-contents">
                <p>单指令流、单数据流 SISD</p>
                <p>单指令流、多数据流 SIMD</p>
                <p>多指令流、单数据流 MISD</p>
                <p>多指令流、多数据流 MIMD</p>
              </div>
            </div>
            <div id="section-010603">
              <h4>6.3 指令集架构</h4>
              <div class="sub-contents">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>
                        RISC 精简指令集计算机 <i class="txt-en">Reduced</i>
                      </th>
                      <th>
                        CISC 复杂指令集计算机 <i class="txt-en">Complex</i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>指令种类</td>
                      <td>少、精简</td>
                      <td>多、丰富</td>
                    </tr>
                    <tr>
                      <td>指令复杂度</td>
                      <td>低、简单</td>
                      <td>高、丰富</td>
                    </tr>
                    <tr>
                      <td>指令长度</td>
                      <td>固定</td>
                      <td>变化</td>
                    </tr>
                    <tr>
                      <td>寻址方式</td>
                      <td>少</td>
                      <td>复杂多样</td>
                    </tr>
                    <tr>
                      <td>实现译码方式</td>
                      <td>硬布线控制逻辑(组合逻辑控制器)</td>
                      <td>微程序控制技术</td>
                    </tr>
                    <tr>
                      <td>通用寄存器数量</td>
                      <td>多、大量</td>
                      <td>一般</td>
                    </tr>
                    <tr>
                      <td>流水线技术</td>
                      <td>支持</td>
                      <td>不支持</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-010604">
              <h4>6.4 流水线技术</h4>
              <div class="sub-contents">
                <p>执行时间：首条总时间+(n-1)*最长操作时间</p>
                <p><b>加速比</b>：不采用和采用的时间比</p>
                <p>操作周期：最长操作时间</p>
                <p>吞吐率：1/最长操作时间</p>
                <p>
                  <b>n条指令的吞吐率 TP
                    <i class="txt-en">Though Put rate</i>：n/单条指令的执行时间+(n-1)*最长的时间段</b>
                </p>
                <img class="img-04 img-abs" style="width: 450px" src="/docs/study/imgs/04-liushui.png" />
              </div>
            </div>
            <div id="section-010605">
              <h4>6.5 冯诺依曼结构和哈弗结构</h4>
              <div class="sub-contents"></div>
            </div>
            <div id="section-010606">
              <h4>6.6 操作数寻址</h4>
              <div class="sub-contents">
                <p>立即寻址：指令中 1</p>
                <p>直接寻址：内存地址 3</p>
                <p>寄存器寻址：寄存器名 2</p>
                <p>寄存器间接寻址：内存地址在寄存器中 4</p>
                <p>间接寻址：地址的地址 5</p>
                <p>相对寻址</p>
                <p>变址寻址</p>
              </div>
            </div>
          </div>
          <h3 id="part-0107">7. 总线 <i class="txt-en">Bus</i></h3>
          <div class="part-contents">
            <div id="section-010701">
              <h4>7.1 总线</h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">定义</span>负责传输数据地址和控制信号，减少信号线的数量
                </p>
                <p>系统总线：数据总线(双向)、地址总线(单向)、控制总线</p>
                <p>数据总线的宽度为字长，地址总线的宽带为内存容量的指数</p>
                <p>内总线：ISA、EISA、PCI</p>
                <p>外总线：RS-232、SCSI、USB、IEEE-1394</p>
                <p>PCI-并行内总线 SCSI-并行外总线 RS-232-串行外总线</p>
                <p>带宽：总线的最大数据传输率</p>
                <p>带宽=时钟频率*总线宽度/时钟周期</p>
              </div>
            </div>
          </div>
          <h3 id="part-0108">8. 计算机性能指标</h3>
          <div class="part-contents">
            <div id="section-010801">
              <h4>8.1 指标</h4>
              <div class="sub-contents">
                <p>主频=倍频*外频，时钟周期=1/主频</p>
                <p>
                  平均每条指令的平均时钟周期个数 CPI
                  <i class="txt-en">Clock per Instuction</i>=
                  时钟周期总数/指令总条数
                </p>
                <p>
                  每时钟周期运行指令条数 IPC
                  <i class="txt-en">Instuction per Clock</i>=
                  指令总条数/时钟周期数
                </p>
                <p>
                  百万条指令每秒 MIPS
                  <i class="txt-en">Million Instructions per Second</i> =
                  (IPC*时钟周期)/106
                </p>
                <p>
                  每秒百万个浮点操作 MFLOPS
                  <i class="txt-en">Million Floating-point Operations per Second</i>
                  与MIPS相似，针对浮点操作
                </p>
                <p>字长</p>
                <p>总线宽度：每次脉冲通过的数据量</p>
                <p>带宽：单位时间通过的数据量 = 数据总量/总时间</p>
                <p>吞吐量：某个时间段内完成的任务总数</p>
                <p>吞吐率：单位时间内完成的任务总数 = 任务总数/总时间</p>
              </div>
            </div>
          </div>
          <h2 id="chapter-02">二、程序设计语言</h2>
          <h3 id="part-0201">1. 概述</h3>
          <div class="part-contents">
            <div id="section-020101">
              <h4>1.1 低级语言和高级语言</h4>
              <div class="sub-contents">
                <p>
                  机器语言<span class="txt-symbol">⇒</span>汇编语言：符号化<span class="txt-symbol">⇒</span>高级语言：编译解释
                </p>
                <p>
                  解释型语言：解释器，不会生成目标代码，边解释边执行，解释器参与执行，执行效率低，灵活性好，可移植性强
                </p>
                <p>解释程序：和源程序一起参与到运行过程中</p>
                <p>
                  脚本语言=动态语言==弱类型语言=解释型语言：PHP/Javascript/Python
                </p>
                <p>
                  编译型语言：编译器，生成目标代码，目标程序直接执行，编译器不参与执行，执行效率高，灵活性差，可移植性差
                </p>
                <p>编译程序：不参与运行，生成源程序的目标程序，进行优化</p>
                <p>常用语言：C/C++/Java/C#</p>
              </div>
            </div>
            <div id="section-020102">
              <h4>1.2 基本成分</h4>
              <div class="sub-contents">
                <table>
                  <tbody>
                    <tr>
                      <td>语法</td>
                      <td>关键字/运算符/标识符/分隔符等</td>
                    </tr>
                    <tr>
                      <td>语义</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>变量</td>
                      <td>全局变量/局部变量 指针变量</td>
                    </tr>
                    <tr>
                      <td>数据类型</td>
                      <td>
                        字符串/整型/浮点值/布尔值/数组等，合理分配存储单元；表达式计算的合法性检查；规定取值范围
                      </td>
                    </tr>
                    <tr>
                      <td>运算符</td>
                      <td>算术、逻辑、比较、赋值</td>
                    </tr>
                    <tr>
                      <td>控制结构</td>
                      <td>
                        顺序、选择 if-else/switch-case、循环 for/do-while、跳转
                        continue/break
                      </td>
                    </tr>
                    <tr>
                      <td>函数</td>
                      <td>可重复使用，函数名/参数(传值、传地址)/返回值/函数体</td>
                    </tr>
                    <tr>
                      <td>输入输出</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>异常处理</td>
                      <td>捕获和处理错误 try-catch-finally/throw</td>
                    </tr>
                    <tr>
                      <td>注释</td>
                      <td>提高代码的可读性和可理解性</td>
                    </tr>
                    <tr>
                      <td>调用</td>
                      <td><b>传值调用</b>和<b>传址调用</b></td>
                    </tr>
                  </tbody>
                </table>
                <p>语法错误：非法字符、拼写错误、缺少分号、关键字不匹配</p>
                <p>语义错误：类型不一致、参数不匹配、死循环、作为除数的变量为0</p>
              </div>
            </div>
          </div>
          <h3 id="part-0202">2. 语言处理程序基础</h3>
          <div class="part-contents">
            <div id="section-020201">
              <h4>2.1 汇编语言基本原理</h4>
              <div class="sub-contents">
                <p>编写源代码</p>
                <p>汇编器翻译</p>
                <p>目标代码生成</p>
                <p>连接器链接</p>
                <p>加载执行</p>
              </div>
            </div>
            <div id="section-020202">
              <h4>2.2 编译程序基本原理</h4>
              <div class="sub-contents">
                <p>
                  <b>词法分析</b>
                  <i class="txt-en">Lexical Analysis</i>：线性分解源程序为词法单元
                  <i class="txt-en">Token</i>
                  序列(关键字/标识符/常数/运算符/分隔符)，以及字符符号是否符合规定
                </p>
                <p>
                  <b>语法分析</b>
                  <i class="txt-en">Parsing</i>：构建语法树，检查所有语法错误，进行结构分析。如缺少右括号，没有分号等
                </p>
                <p>自上而下 递归向下/预测分析 自下而上 移进-归约/算符优先</p>
                <p>
                  <b>语义分析</b>
                  <i class="txt-en">Semantic Analysis</i>：只能检查静态语义错误，进行类型分析和检查。如变量未声明、重复声明，函数参数类型不对等
                </p>
                <p>
                  <b>中间代码生成</b>
                  <i class="txt-en">Intermediate Code Generation</i>：有后缀式、三元式、四元式、三地址码、树图等。有利于进行与具体机器无关的优化处理和可移植性
                </p>
                <p>代码优化 <i class="txt-en">Optimization</i></p>
                <p>
                  <b>目标代码生成</b>
                  <i class="txt-en">Code Generation</i>：与目标机器的体系结构相关，包含分配寄存器，指令选择、代码布局等
                </p>
                <p>
                  <b>符号表管理</b>：不断收集记录和使用的相关符号类型和特征等必要信息，辅助语义的正确性检查和代码生成
                </p>
                <p>出错处理</p>
                <img class="img-11 img-abs" style="width: 380px" src="/docs/study/imgs/11-bianyi.png" />
              </div>
            </div>
            <div id="section-020203">
              <h4>2.3 正规式</h4>
              <div class="sub-contents">
                <p>
                  例：由a、b构造且仅包含偶数个a的串的集合
                  <span class="txt-func">(b<span class="txt-sup">*</span> (ab<span class="txt-sup">*</span>a))
                    <span class="txt-sup">*</span>
                  </span>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>正规式</th>
                      <th>正规集</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span class="txt-func">ab</span></td>
                      <td>单一元素：{ab}</td>
                    </tr>
                    <tr>
                      <td><span class="txt-func">a|b</span></td>
                      <td>可选元素：{a,b}</td>
                    </tr>
                    <tr>
                      <td>
                        <span class="txt-func">a<span class="txt-sup">*</span></span>
                      </td>
                      <td>闭包，任意个元素，包含空集：{Φ,a,aa,aaa,...}</td>
                    </tr>
                    <tr>
                      <td>
                        <span class="txt-func">(a|b)<span class="txt-sup">*</span></span>
                      </td>
                      <td>任意个可选元素：{Φ,a,b,aa,ab,bb,aaa,...}</td>
                    </tr>
                    <tr>
                      <td>
                        <span class="txt-func">a(a|b)<span class="txt-sup">*</span></span>
                      </td>
                      <td>以a为开头：{a,aa,ab,aaa,...}</td>
                    </tr>
                    <tr>
                      <td>
                        <span class="txt-func">(a|b)<span class="txt-sup">*</span>abb</span>
                      </td>
                      <td>以abb为结尾：{aabb,babb,aaabb,ababb,...}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-020204">
              <h4>2.4 有限自动机 <i class="txt-en">finite automata</i></h4>
              <div class="sub-contents">
                <p>词法分析的工具，正确识别正规集</p>
                <p>确定的有限自动机 (DFA)</p>
                <p>不确定的有限自动机 (NFA)：状态转移不确定</p>
                <p>下图可表示以1为结尾的正规集</p>
                <img class="img-12" style="width: 300px" src="/docs/study/imgs/12-youxian.png" />
              </div>
            </div>
            <div id="section-020205">
              <h4>2.5 文法</h4>
              <div class="sub-contents">
                <p>上下文无关文法 CFG <i class="txt-en">context-free grammar</i></p>
                <p>广泛用于程序设计语言的语法规则</p>
                <p>S是起始符号，表示句子的起始位置</p>
                <p>V是非终结符集合，用于构造句子的符号</p>
                <p>P是产生式规则集合，表示A可被替换为B</p>
                <p>T是终结符集合，一般为小写字母，基本符号或词汇</p>
              </div>
            </div>
            <div id="section-020206">
              <h4>2.6 表达式</h4>
              <div class="sub-contents">
                <p>中缀式：a?b</p>
                <p>后缀式：ab? 逆波兰式</p>
                <p>转换方式：先看优先级转换，相同时从右向左</p>
                <p>例：a+(b-c)*d 的后缀式为 abc-d*</p>
                <p>
                  逆运算：从左向右，遇到数字入栈，遇到运算符取两个数字进行运算
                </p>
              </div>
            </div>
            <div id="section-020207">
              <h4>2.7 语法树中、后序遍历</h4>
              <div class="sub-contents">
                <p>中序遍历>左根右>中缀式</p>
                <p>后续遍历>左右根>后缀式</p>
              </div>
            </div>
          </div>
          <h2 id="chapter-03">三、数据结构</h2>
          <h3 id="part-0301">1. 线性结构</h3>
          <div class="part-contents">
            <div id="section-030101">
              <h4>1.1 概念</h4>
              <div class="sub-contents">
                <p>
                  每个元素（除第一个和最后一个）都有且仅有一个直接前驱和一个直接后继，固定顺序，个数有限
                </p>
              </div>
            </div>
            <div id="section-030102">
              <h4>1.2 线性表 <i class="txt-en">Linear List</i></h4>
              <div class="sub-contents">
                <p>
                  顺序表: 用一组地址连续的存储单元存储元素。
                  可以随机存取元素，但插入和删除时需要移动元素。
                </p>
                <p>单链表: 每个节点包含数据域和指针域，指针域指向下一节点</p>
                <p>循环链表: 尾节点的指针指向头节点，形成一个环</p>
                <p>双向链表: 每个节点有两个指针，指向前驱节点和后继节点</p>
                <img class="img-33" style="width: 450px" src="/docs/study/imgs/33-liner.png" alt="" srcset="" />
                <table>
                  <thead>
                    <tr>
                      <th>不同点</th>
                      <th>顺序表</th>
                      <th>链表</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>存储空间</td>
                      <td>物理上一定连续</td>
                      <td>逻辑上连续</td>
                    </tr>
                    <tr>
                      <td>随机访问</td>
                      <td>支持下标访问 O(1)</td>
                      <td>不支持 O(N)</td>
                    </tr>
                    <tr>
                      <td>任意位置增删</td>
                      <td>需要搬移元素 O(N)</td>
                      <td>只需要修改指针指向</td>
                    </tr>
                    <tr>
                      <td>插入</td>
                      <td>空间不够时需扩容</td>
                      <td>没有容量概念</td>
                    </tr>
                    <tr>
                      <td>应用场景</td>
                      <td>元素高效存储和频繁访问，不改变结构操作(读取/查找)</td>
                      <td>任意位置增删元素频繁，破坏性操作(插入/删除)</td>
                    </tr>
                    <tr>
                      <td>缓存利用率</td>
                      <td>高</td>
                      <td>低</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-030103">
              <h4>1.3 栈和队列 <i class="txt-en">Stack & Queue</i></h4>
              <div class="sub-contents">
                <p>栈: 只允许固定一端插入和删除元素，遵循先进后出 LIFO</p>
                <p>队列: 只允许队尾插入，队头删除元素，遵循先进先出 FIFO</p>
                <img class="img-34" style="width: 450px" src="/docs/study/imgs/34-stack.png" alt="" srcset="" />
                <p>均可使用顺序存储和链式存储</p>
                <p>
                  循环队列：将队列存储空间的最后一个位置绕到第一个位置，形成逻辑上的环状空间，避免假溢出
                </p>
                <p>栈的应用：递归 表达式计算等</p>
              </div>
            </div>
            <div id="section-030104">
              <h4>1.4 串 <i class="txt-en">String</i></h4>
              <div class="sub-contents">
                <p>由n(n>0)个字符组成的有序序列，特殊线性表</p>
                <p>子串：由串中任意长度的连续字符构成的序列</p>
              </div>
            </div>
            <div id="section-030105">
              <h4>1.5 模式匹配 <i class="txt-en">Pattern Matching</i></h4>
              <div class="sub-contents">
                <p>给定两个字符串S和T，在主串S中寻找模式串T的过程</p>
                <p>Brute-Force算法: 暴力依次比较</p>
                <p>
                  <b>KMP算法</b>:
                  当主串与模式串部分匹配后出现不匹配字符时，通过next数组确定模式串应回溯的位置，而非从头开始匹配
                </p>
                <p>核心：通过最长公共前后缀求next[j]数组</p>
                <img class="img-35" style="width: 250px" src="/docs/study/imgs/35-kmp.png" alt="" srcset="" />
                <p>
                  初始状态：遍历至j的位置，next[j]也就是i表示的是p[0,…,j-1]的最长公共前后缀的长度，前后缀区域相等①=②
                </p>
                <img class="img-36" style="width: 450px" src="/docs/study/imgs/36-kmp.png" alt="" srcset="" />
                <p>令i++,j++，如果 p[i]=p[j-1]，继续下一个</p>
                <img class="img-37" style="width: 450px" src="/docs/study/imgs/37-kmp.png" alt="" srcset="" />
                <p>
                  如果 p[i]!=p[j-1]，则需要找新的最长公共前后缀，使得 ③+p[i'] =
                  ④+p[j-1]
                </p>
                <img class="img-38" style="width: 450px" src="/docs/study/imgs/38-kmp.png" alt="" srcset="" />
                <p>
                  等同于，在①(或②)中找最长公共前后缀，也就是当长度为i时的
                  next[i]，令i=next[i]，继续找寻p[i]=p[j-1]
                </p>
                <img class="img-39" style="width: 450px" src="/docs/study/imgs/39-kmp.png" alt="" srcset="" />
                <p>
                  回到KMP算法，当匹配到主串s[i]和字串p[j]不相同时，不同于暴力方式下偏移一个位置后再依次比对，可以转换为求①②区域的最长公共前后缀，将字串偏移相应位置后再依次匹配后续字符
                </p>
                <img class="img-40" style="width: 350px" src="/docs/study/imgs/40-kmp.png" alt="" srcset="" />
                <img class="img-41" style="width: 350px" src="/docs/study/imgs/41-kmp.png" alt="" srcset="" />
              </div>
            </div>
          </div>
          <h3 id="part-0302">2. 数组与矩阵</h3>
          <div class="part-contents">
            <div id="section-030201">
              <h4>2.1 数组 <i class="txt-en">Array</i></h4>
              <div class="sub-contents">
                <p>
                  存储于一个连续空间且具有相同数据类型的元素集合，可通过索引(下标)来访问元素
                </p>
                <img class="img-42" style="width: 250px" src="/docs/study/imgs/42-shuzu.png" alt="" srcset="" />
              </div>
            </div>
            <div id="section-030202">
              <h4>2.2 矩阵 <i class="txt-en">Matrices</i></h4>
              <div class="sub-contents">
                <p>具有m行n列的二维数组</p>
                <img class="img-43" style="width: 200px" src="/docs/study/imgs/43-juzhen.png" alt="" srcset="" />
                <p>存储方式：按行优先，按列优先</p>
                <p>压缩存储，以按行存储为例</p>
                <img class="img-44" style="width: 600px" src="/docs/study/imgs/44-juzhen.png" alt="" srcset="" />
              </div>
            </div>
          </div>
          <h3 id="part-0303">3. 树</h3>
          <div class="part-contents">
            <div id="section-030301">
              <h4>3.1 树 <i class="txt-en">Tree</i></h4>
              <div class="sub-contents">
                <p>
                  一种 非线性 的数据结构，由一个根节点
                  <i class="txt-en">Root</i> 以及若干个子节点
                  <i class="txt-en">Children</i> 构成，节点之间存在一种层级
                  <i class="txt-en">Hierarchical</i> 关系
                </p>
                <img class="img-45" style="width: 200px" src="/docs/study/imgs/45-tree.png" alt="" srcset="" />
                <table>
                  <tbody>
                    <tr>
                      <td>叶子节点</td>
                      <td>度为0的节点</td>
                    </tr>
                    <tr>
                      <td>节点的度</td>
                      <td>子节点的数量</td>
                    </tr>
                    <tr>
                      <td>树的度</td>
                      <td>所有节点的最大度数</td>
                    </tr>
                    <tr>
                      <td>树的深/高度</td>
                      <td>根节点到最远叶节点的最长路径长度</td>
                    </tr>
                  </tbody>
                </table>
                <p>性质1：树中的节点总数等于树中所有节点的度数之和+1</p>
                <p>性质2：度为m的树中第 i 层 (i≥1)上至多有 mi-1 个节点</p>
                <p>性质3：高度为h的m次树至多有 mh-1 / m -1 个节点</p>
                <p>性质4：具有n个节点度为m的树的最小高度为[logm(n(m-1)+1)]</p>
              </div>
            </div>
            <div id="section-030302">
              <h4>3.2 二叉树</h4>
              <div class="sub-contents">
                <p>每个节点最多只能有两个子节点 (度最大为2)，称为左右子树</p>
                <img class="img-46" style="width: 400px" src="/docs/study/imgs/46-tree.png" alt="" srcset="" />
                <p>
                  性质1：二叉树第 i(i≥1) 层上最多有
                  <span class="txt-func">2<span class="txt-sup">i-1</span></span>
                  个节点
                </p>
                <p>
                  性质2：高度为h的二叉树至多有
                  <span class="txt-func">2<span class="txt-sup">h</span>-1</span>
                  个节点
                </p>
                <p>
                  性质3：二叉树中度为0的节点数n0等于度为2的节点数n2+1，即 n0=n2+1
                </p>
                <p>性质4：有n个节点的完全二叉树高度为 ⌊log2n⌋+1 或 ⌈log2(n+1)⌉</p>
                <p>存储结构</p>
                <img class="img-47" style="width: 750px" src="/docs/study/imgs/47-tree.png" alt="" srcset="" />
              </div>
            </div>
            <div id="section-030303">
              <h4>3.3 二叉树遍历</h4>
              <div class="sub-contents">
                <p>先序遍历：根>左>右 A B DG CEF</p>
                <p>中序遍历：左>根>右 B DG A ECF</p>
                <p>后序遍历：左>右>根 GD B EFC A</p>
                <p>层次遍历：每层依次从左往右访问 A BC DEF G</p>
                <p>先序+中序构造</p>
                <p>后序+中序构造</p>
                <p>层次+中序构造</p>
                <img class="img-48" style="width: 150px" src="/docs/study/imgs/48-tree.png" alt="" srcset="" />
              </div>
            </div>
            <div id="section-030304">
              <h4>3.4 二叉排序树</h4>
              <div class="sub-contents">
                <p>根节点的值大于左子树所有节点值，小于右子树所有节点值。</p>
                <p>中序遍历的结果是有序序列。</p>
                <p>可用过关键字序列反向构造。</p>
                <img class="img-49" style="width: 150px" src="/docs/study/imgs/49-tree.png" alt="" srcset="" />
                <p>平衡二叉树 (AVL树)</p>
                <p>
                  二叉树中的任意节点的左右子树的高度之差绝对值不超过1，且为二叉排序树
                </p>
              </div>
            </div>
            <div id="section-030305">
              <h4>3.5 最优二叉树 (哈夫曼树)</h4>
              <div class="sub-contents">
                <p>路径：从一个节点到另一个节点的通路</p>
                <p>路径长度：路径上的分支数目</p>
                <p>树的路径长度：根节点到每个叶子节点的路径长度之和</p>
                <p>带权路径长度：路径长度与权值的乘积</p>
                <p>树的带权路径长度：所有叶子节点的带权路径长度之和</p>
                <p>哈夫曼树：带权路径长度最小 (WPL) 的二叉树</p>
                <p>构造</p>
                <p>步骤1：将n个权值w节点构成n棵二叉树的集合F</p>
                <p>步骤2：选取权值最小的树构成左右子树，根节点为权值之和</p>
                <p>步骤3：将新树替换原两棵树 (重复步骤2和3)</p>
                <p>性质</p>
                <p>性质1：权值大小的分布</p>
                <p>性质2：只有度为0和2的节点</p>
                <p>性质3：节点总数为2n-1</p>
                <p>规则</p>
                <p>规则1：从前往后找权值最小</p>
                <p>规则2：小值放左，大值放右</p>
                <p>规则3：新节点放入末尾</p>
                <p>规则4：权值相同，同从前往后</p>
                <p>规则5：用到子树时再调用</p>
                <img class="img-50" style="width: 150px" src="/docs/study/imgs/50-tree.png" alt="" srcset="" />
              </div>
            </div>
            <div id="section-030306">
              <h4>3.6 哈夫曼编码</h4>
              <div class="sub-contents">
                <p>等长编码：对每个字符编制相同长度的二进制码</p>
                <p>过程及其压缩比：先 左小右大 构造哈夫曼树，再根据 左0右1 构建编码</p>
                <img class="img-51" style="width: 450px" src="/docs/study/imgs/51-tree.png" alt="" srcset="" />
                <p>
                  等长编码长度为3 (22< 5< 23)，压缩比为 1-(40*1+60*3)/100*3=0.27 </p>
              </div>
            </div>
            <div id="section-030307">
              <h4>3.7 线索二叉树</h4>
              <div class="sub-contents">
                <p>
                  对于n个结点的二叉树，在存储结构中有n+1个空链域，利用这些空链域存放在某种遍历次序下该结点的前驱结点和后继结点的指针，称为线索。加上线索的二叉树称为线索二叉树
                </p>
                <img class="img-52" style="width: 450px" src="/docs/study/imgs/52-tree.png" alt="" srcset="" />
              </div>
            </div>
            <div id="section-030308">
              <h4>3.8 森林</h4>
              <div class="sub-contents">
                <p>m(m>=0)棵互不相交的树集合</p>
                <table>
                  <tbody>
                    <tr>
                      <td>双亲表示法</td>
                      <td>存储结点及其父结点位置信息</td>
                    </tr>
                    <tr>
                      <td>孩子表示法</td>
                      <td>存储结点的孩子结点位置信息的链表</td>
                    </tr>
                    <tr>
                      <td>孩子兄弟表示法</td>
                      <td>
                        结点中设置两个指针域指向该结点的第一个孩子和下一个兄弟
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>将子树的子节点连接虚线，老大子节点为左节点，其余都是右节点，合并时都是作为前一个的右子树</p>
                <p>三棵树n1,n2,n3的森林转一棵二叉树，左子树节点为n1-1，右子树节点为n2+n3</p>
              </div>
            </div>
          </div>
          <h3 id="part-0304">4. 图</h3>
          <div class="part-contents">
            <div id="section-030401">
              <h4>4.1 图 <i class="txt-en">Graph</i></h4>
              <div class="sub-contents">
                <p>由顶点V和连接这些节点的边E组成的集合</p>
                <img class="img-53" style="width: 450px" src="/docs/study/imgs/53-tu.png" />
                <p>顶点数n、边数e、各顶点的度D(v)之间的关系</p>
                <img class="img-54" style="width: 150px" src="/docs/study/imgs/54-tu.png" />
                <table>
                  <tbody>
                    <tr>
                      <td>度</td>
                      <td>关联该顶点的边的数目D(v)</td>
                    </tr>
                    <tr>
                      <td>出度/入度</td>
                      <td>以该顶点为起点或终点的有向边</td>
                    </tr>
                    <tr>
                      <td>连通图/强连通图</td>
                      <td>稠密图/稀疏图</td>
                    </tr>
                    <tr>
                      <td>网</td>
                      <td>带权值</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-030402">
              <h4>4.2 存储结构</h4>
              <div class="sub-contents">
                <img class="img-55" style="width: 450px" src="/docs/study/imgs/55-tu.png" />
              </div>
            </div>
            <div id="section-030403">
              <h4>4.3 遍历</h4>
              <div class="sub-contents">
                <p>
                  从图的任意结点出发，沿着某条搜索路径，对图中所有结点进行访问且只访问一次
                </p>
                <img class="img-56" style="width: 250px" src="/docs/study/imgs/56-tu.png" />
                <p>深度优先遍历 DFS</p>
                <p>1.首先访问出发顶点V</p>
                <p>2.依次从V出发搜索V的任意一个邻接点W</p>
                <p>3.若W未访问过则从该点出发继续深度优先遍历</p>
                <p>v1>v2>v4>v5>v3</p>
                <p>理念：递归/回溯/栈 时间复杂度：邻接矩阵O(n2) 邻接表O(n+e)</p>
                <p>广度优先遍历 BFS</p>
                <p>1.首先访问出发顶点V</p>
                <p>2.然后访问与顶点V邻接的全部未访问顶点W、X、Y…</p>
                <p>3.然后在依次访问W等的邻接的未访问的顶点</p>
                <p>v1>v2>v3>v4>v5</p>
                <p>理念：队列 时间复杂度：邻接矩阵O(n2) 邻接表O(n+e)</p>
              </div>
            </div>
            <div id="section-030404">
              <h4>4.4 拓扑排序</h4>
              <div class="sub-contents">
                <p>
                  顶点活动网(AOV网) <i class="txt-en">Activity On Vertex Network</i>：形象地反映出整个工程中各个活动之间的先后关系的有向图
                </p>
                <p>有向无环图(DAG图) <i class="txt-en">Directed Acyclic Graph</i>：不存在回路的有向图</p>
                <p>拓扑序列：在AOV网中不存在回路，使得每一个活动的所有前驱活动都排列在该活动的前面</p>
                <p>算法：依次输出没有入度的顶点，并删除该点和以该点为弧尾的弧</p>
                <p>边活动网(AOE网) <i class="txt-en">Activity On Edges Network</i>：以边表示活动，且边有权值</p>
                <p>入度为0的为源点，出度为0的为汇点</p>
                <table>
                  <tbody>
                    <tr>
                      <td>事件最早发生时间etv</td>
                      <td>从源点到该顶点的最长路径</td>
                    </tr>
                    <tr>
                      <td>事件最晚发生时间itv</td>
                      <td>在不推迟整个工期的前提下，事件 Vj 所允许的最晚发生时间</td>
                    </tr>
                    <tr>
                      <td>活动最早开始时间ete</td>
                      <td>弧头的事件的最早发生时间</td>
                    </tr>
                    <tr>
                      <td>活动最晚开始时间ite</td>
                      <td>保证弧尾事件的最晚发生时间不拖后</td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  关键路径：如果弧的最早开始时间等于最晚开始时间，那么称这条弧所代表的活动为关键活动，由关键活动所构成的路径称为关键路径
                </p>
                <p>
                  最短路径：从连接图中的某个顶点出发到达到达另外一个顶点所经过的边的权重和最小的那一条路径
                </p>
                <img class="img-57" style="width: 250px" src="/docs/study/imgs/57-tu.png" />
              </div>
            </div>
            <div id="section-030405">
              <h4>4.5 最小生成树</h4>
              <div class="sub-contents">
                <p>
                  在一给定的无向图G = (V, E) 中，(u, v) 代表连接顶点 u 与顶点 v
                  的边，而 w(u, v) 代表此边的权重，若存在 T 为 E
                  的子集且为无循环图，使得联通所有结点的的 w(T) 最小，则此 T 为 G
                  的最小生成树
                </p>
                <table>
                  <tbody>
                    <tr>
                      <td>普里姆算法</td>
                      <td>从任一顶点出发，依次寻找权值最小边的邻接点计入集合</td>
                    </tr>
                    <tr>
                      <td>克鲁斯卡尔算法</td>
                      <td>
                        依次选取权值最小的边直至囊括所有结点，注意检查不能形成环路
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <h3 id="part-0305">5. 哈希表</h3>
          <div class="part-contents">
            <div id="section-030501">
              <h4>5.1 哈希表(散列表) <i class="txt-en">Hash</i></h4>
              <div class="sub-contents">
                <p>
                  定义：通过计算哈希值，打破元素之间原有的关系，使集合中的元素按照散列函数的分类进行排列
                </p>
                <p>哈希：通过一次计算大幅度缩小查找范围</p>
                <p>哈希函数：考虑关键字的长度和分布情况、哈希值的范围</p>
                <p>冲突与同义词</p>
              </div>
            </div>
            <div id="section-030502">
              <h4>5.2 构造哈希函数</h4>
              <div class="sub-contents">
                <table>
                  <tbody>
                    <tr>
                      <td>直接定址法</td>
                      <td>取某个线性函数值</td>
                    </tr>
                    <tr>
                      <td>除留余数法</td>
                      <td>取接近长度 m 的最大质数 p 求余数</td>
                    </tr>
                    <tr>
                      <td>数字分析法</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>平方取中法</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>折叠法</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>随机数法</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-030503">
              <h4>5.3 解决冲突</h4>
              <div class="sub-contents">
                <table>
                  <tbody>
                    <tr>
                      <td>开放定址法</td>
                      <td>
                        <p>使用探查技术在散列表中寻找下一个空地址</p>
                        <p>线性探查法/二次探查法/随机探查法/双重探查法</p>
                      </td>
                    </tr>
                    <tr>
                      <td>链地址法</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <p>影响因素：分布均匀，减少冲突和装填因子</p>
              </div>
            </div>
          </div>
          <h3 id="part-0306">6. 堆</h3>
          <div class="part-contents">
            <div id="section-030601">
              <h4>6.1 堆 <i class="txt-en">Heap</i></h4>
              <div class="sub-contents">
                <p>从完全二叉树的角度出发，符合以下规则：</p>
                <img class="img-58" style="width: 250px" src="/docs/study/imgs/58-dui.png" alt="" srcset="" />
                <p>构建过程：根据大小调整子树中根节点和左右节点的位置</p>
              </div>
            </div>
          </div>
          <h2 id="chapter-04">四、知识产权</h2>
          <h3 id="part-0401">1. 知识产权</h3>
          <div class="part-contents">
            <div id="section-040101">
              <h4>1.1 概念</h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">特征</span>无形性、专有性、<b>地域性</b>、时间性、可复制性
                </p>
                <p>
                  地域性：仅在授权国家或地区管辖范围内有效，需在不同国家或地区分别申请
                </p>
                <p>许可使用：独占(自己也不能用)、独家(排他)、普通、强制、法定</p>
                <p>翻译权：重构</p>
                <p>烟草必须使用注册商标</p>
                <p>
                  工业产权：专利权、商标权、地理标志、工业品外观设计、集成电路布图设计
                </p>
              </div>
            </div>
            <div id="section-040102">
              <h4>1.2 著作权</h4>
              <div class="sub-contents">
                <p>
                  <b>人身权</b>包括：发表权(终生+死亡后50年)、署名权、修改权和作品完整权；其余为财产权(受时间限制)
                </p>
              </div>
            </div>
            <div id="section-040103">
              <h4>1.3 专利权</h4>
              <div class="sub-contents">
                <p>专利申请：采用书面形式办理手续，先申请先得，同时申请需协商</p>
                <p>专利时间性：保护期为20年，实用和设计为10年</p>
              </div>
            </div>
            <div id="section-040104">
              <h4>1.4 商标权</h4>
              <div class="sub-contents">
                <p>
                  商标注册：先注册先得，同时注册先使用先得，同时注册使用需协商
                </p>
                <p>商标时间性：保护期10年，到期6个月申请延续10年，可无限延续</p>
              </div>
            </div>
            <div id="section-040105">
              <h4>1.5 商业秘密权</h4>
              <div class="sub-contents">
                <p>《反不正当竞争法》</p>
                <p>
                  指不为公众所知悉，未公开的、能为权利人带来经济利益、具有实用性并经权利人采取保密措施的技术信息和经营信息
                </p>
              </div>
            </div>
          </div>
          <h3 id="part-0402">2. 计算机软件著作权</h3>
          <div class="part-contents">
            <div id="section-040201">
              <h4>2.1 概念</h4>
              <div class="sub-contents">
                <p>主体：享有著作权的人 (公民、法人、其他组织)</p>
                <p>
                  《中华人民共和国著作权法》 (人大)
                  和《计算机软件保护条例》(国务院) 规定
                </p>
                <p>
                  客体：计算机程序 (源程序+目标程序) 及其 有关软件文档
                  (程序设计说明书、流程图和用户手册等)
                </p>
                <p>侵权：甲擅自复制乙发表的OA软件售卖，丙公司未知情下购买使用</p>
              </div>
            </div>
            <div id="section-040202">
              <h4>2.2 权利</h4>
              <div class="sub-contents">
                <p>人身权 = 发表权 + 开发者身份权(署名权，无时间限制)</p>
                <p>
                  财产权 =
                  使用、复制、修改、发行、翻译、注释、传播、出租、使用获利等
                </p>
                <p>
                  保护期：软件开发完成之日
                  +50年，除<b>开发者身份权</b>外其余权力全部终止
                </p>
              </div>
            </div>
            <div id="section-040203">
              <h4>2.3 职务开发</h4>
              <div class="sub-contents">
                <p>职务软件：只享有署名权</p>
                <p>-是在单位任职期间执行其工作任务的结果</p>
                <p>-与在单位从事的工作内容直接联系</p>
                <p>-使用单位的物质技术条件</p>
              </div>
            </div>
            <div id="section-040204">
              <h4>2.4 委托开发</h4>
              <div class="sub-contents">
                <p>由签订书面合同成立，无合同由受托人享有</p>
              </div>
            </div>
          </div>
          <h3 id="part-0403">3. 标准化</h3>
          <div class="part-contents">
            <div id="section-040301">
              <h4>3.1 标准分类</h4>
              <div class="sub-contents"></div>
            </div>
            <div id="section-040302">
              <h4>3.2 标准编号</h4>
              <div class="sub-contents"></div>
            </div>
          </div>
          <h2 id="chapter-05">五、数据库</h2>
          <h3 id="part-0501">1. 基本概念</h3>
          <div class="part-contents">
            <div id="section-050101">
              <h4>1.1 专有名词</h4>
              <div class="sub-contents">
                <p>数据 <i class="txt-en">Data</i></p>
                <p>数据库 DB <i class="txt-en">DataBase</i></p>
                <p>
                  数据库系统 DBS
                  <i class="txt-en">DataBase System</i>：由数据库、硬件、软件和人员组成
                </p>
                <p>
                  数据库管理员 DBA <i class="txt-en">DataBase Administrator</i>
                </p>
                <p>
                  数据库管理系统 DBMS
                  <i class="txt-en">DataBase Management System</i>
                </p>
                <p>
                  <span class="txt-define">功能</span>数据定义，数据库操作，数据库运行管理，数据的组织、存储和管理，数据库的建立和维护
                </p>
                <p>
                  <span class="txt-define">特征</span>数据结构化且统一管理，有较高的数据独立性，数据控制功能（数据库的安全性、完整性、并发控制、故障恢复）
                </p>
              </div>
            </div>
            <div id="section-050102">
              <h4>1.2 概念</h4>
              <div class="sub-contents">
                <p>信息=数据+数据处理</p>
                <p>数据模型: 三要素为数据结构、数据操作、基本数据模型</p>
                <p>概念数据模型：实体/属性/码/域/联系 (1:1/1:*/*:*)/E-R图</p>
                <p>结构数据模型(DBMS)：层次(树)、网状(网)、关系和面向对象</p>
                <p><b>关系模型</b>：二维表格结构。关系>关系模式>关系文件</p>
                <p>五元组R[U,D,dom.F] R关系名/U属性组/F数据依赖 学号>姓名</p>
                <p>体系结构：集中式数据库、C/S结构、分布式数据库、并行数据库</p>
                <p>术语：关系/元组(行)/属性(列)/域(取值范围)/关系模式</p>
                <p>候选码(键)/主码/主属性/外码/全码/超码</p>
              </div>
            </div>
            <div id="section-050103">
              <h4>1.3 三级模式-两级映像</h4>
              <div class="sub-contents">
                <p>
                  三级模式：外模式/用户模式/子模式-视图、概念模式/模式-基本表、内模式/物理模式/存储模式-存储文件
                </p>
                <p>两级映像：外-概念(逻辑独立性)、概念-内(物理独立性)</p>
              </div>
            </div>
            <div id="section-050104">
              <h4>1.4 数据仓库</h4>
              <div class="sub-contents">
                <p>面向主题、集成的、相对稳定的、反映历史变化</p>
                <p>OLAP联机分析处理服务器</p>
                <p>数据挖掘</p>
              </div>
            </div>
            <div id="section-050105">
              <h4>1.5 完整性约束</h4>
              <div class="sub-contents">
                <p>实体完整性：主码不为空</p>
                <p>参照完整性：外码必须可找到或空</p>
                <p>用户自定义完整性</p>
              </div>
            </div>
            <div id="section-050106">
              <h4>1.6 分布式数据库</h4>
              <div class="sub-contents">
                <p>分片透明：无需要知道逻辑访问表的分块储存</p>
                <p>复制透明：无需知道复制到哪，如何复制</p>
                <p>位置透明：无需知道数据存放的物理位置</p>
                <p>逻辑透明：无需知道局部场地使用的是哪种数据模型</p>
                <p>共享性：数据存储再不同的节点数据共享</p>
                <p>自治性：每个节点对本地数据独立管理</p>
                <p>可用性：当某一场地故障时可使用其他场地的副本</p>
                <p>分布性：数据在不同场地上存储</p>
              </div>
            </div>
          </div>
          <h3 id="part-0502">2. 设计过程</h3>
          <div class="part-contents">
            <div id="section-050201">
              <h4>2.1 概述</h4>
              <div class="sub-contents">
                <p>用户需求分析：确定系统边界</p>
                <p>
                  <span class="txt-define">输出</span>需求说明文档/功能模块图/数据字典/数据流程图DFD
                </p>
                <p>概念模型设计：局部合并取消冲突(属性/命名/结构)</p>
                <p><span class="txt-define">输出</span>基本ER图</p>
                <p>逻辑设计：转关系模式+规范化+确定完整性约束+视图</p>
                <p><span class="txt-define">输出</span>关系模式</p>
                <p>物理设计：DBMS特性、硬件、OS特性</p>
                <p>数据库实施阶段</p>
                <p>数据库运行维护阶段</p>
              </div>
            </div>
            <div id="section-050202">
              <h4>2.2 E-R模型</h4>
              <div class="sub-contents">
                <p>数据模型三要素：数据结构、数据操作、数据约束条件</p>
                <p>图形：实体-矩形/属性-椭圆/联系-菱形 弱实体</p>
                <p>弱实体：双边矩形</p>
                <p>超类⇔子类</p>
                <img class="img-126" style="width: 250px" src="/docs/study/imgs/126-chaolei.png" />
                <p>属性：原子属性和复合属性/单值属性和多值属性/派生属性</p>
                <p>联系：1:1/1:n/m:n</p>
              </div>
            </div>
            <div id="section-050203">
              <h4>2.3 关系代数</h4>
              <div class="sub-contents">
                <table>
                  <tbody>
                    <tr>
                      <td>集合运算符</td>
                      <td>∩交集 ∪并集 −差集 X笛卡儿积</td>
                    </tr>
                    <tr>
                      <td>比较运算符</td>
                      <td>> ≥ < ≤=≠</td>
                    </tr>
                    <tr>
                      <td>逻辑运算符</td>
                      <td>∧与 ∨或 ¬非</td>
                    </tr>
                    <tr>
                      <td>专门运算符</td>
                      <td>𝜎选择 𝜋投影 ⨝连接 ÷除</td>
                    </tr>
                  </tbody>
                </table>
                <p>笛卡尔积：无条件连接。join</p>
                <p>投影：垂直，若干属性列的组合。select</p>
                <p>选择：水平，若干元组行的组合。where</p>
                <p>连接：从笛卡尔积选取满足条件的元组</p>
                <p>𝜃连接：比较运算 / 等值连接：等值运算</p>
                <p>自然连接：去除重复值的等值连接，类比外键</p>
                <p>外连接：左外/右外/全外</p>
                <p>查询效率：先判断条件后连接</p>
              </div>
            </div>
          </div>
          <h3 id="part-0503">3. 规范化理论</h3>
          <div class="part-contents">
            <div id="section-050301">
              <h4>3.1 函数依赖 <i class="txt-en">Functional Dependency</i></h4>
              <div class="sub-contents">
                <p>关系模式为一个五元组 R (U,D,dom,F) R为关系名，U为一组属性，F为一组函数依赖</p>
                <p>函数依赖：F={(Sno,Cno)➔G}</p>
                <p>完全函数依赖：并不是依赖于候选码的子集，类比联合主键</p>
                <p>A3传递律 合并规则 分解规则</p>
                <p>闭包：求候选码，可反向求/传递依赖/冗余</p>
                <p>求主属性/非主属性</p>
                <p>公理系统</p>
                <p>自反律: 若Y∈X∈U，则X➔Y为F所蕴含</p>
                <p>增广律: 若X➔Y为F所蕴含，且Z∈U，则XZ➔YZ为F所蕴含</p>
                <p>传递律: 若X➔Y，Y➔Z，则X➔Z为F所蕴含</p>
                <p>合并规则: 若X➔Y，X➔Z，则X➔YZ为F所蕴含</p>
                <p>伪传递率: 若X➔Y，WY➔Z，则XW➔Z为F所蕴含</p>
                <p>分解规则: 若X➔Y，Z∈Y，则X➔Z为F所蕴含</p>
              </div>
            </div>
            <div id="section-050302">
              <h4>3.2 候选关键字</h4>
              <div class="sub-contents">
                <p>候选码</p>
                <p>主码</p>
                <p>超码</p>
                <p>外码</p>
                <p>全码</p>
                <p>主属性/非主属性</p>
              </div>
            </div>
            <div id="section-050303">
              <h4>3.3 范式</h4>
              <div class="sub-contents">
                <p>存在问题：数据冗余/更新异常/插入删除异常</p>
                <p>第一范式：R的每个属性A的值域只包含<b>原子项</b></p>
                <p>比如 courses='Math, English'</p>
                <p>
                  第二范式：且每个非主属性都完全函数依赖于候选码，<b>不存在部分函数依赖</b>
                </p>
                <p>判断部分函数依赖：看候选码的子集能否单独确定非主属性</p>
                <p>
                  比如 score(student_id, course_id, student_name, score) 中 主键是
                  (student_id, course_id) 但 student_name 只依赖于 student_id
                </p>
                <p>第三范式：且非主属性对候选码<b>不存在传递函数依赖</b></p>
                <p>判断传递函数依赖： (X,Y)→Z (X,Z)→W ⟹ (X,Y)→W</p>
                <p>伪传递：若X→Y，WY→Z，则XW→Z</p>
                <p>
                  比如 students(student_id, dept_id, dept_name) dept_name 依赖
                  dept_id，而 dept_id 又依赖 student_id
                </p>
                <p>
                  BC范式：且F中的每个依赖的决定因素必定包含R的某个候选码，进一步消除主属性对码的部分和传递函数依赖
                </p>
                <p>
                  比如 R=(student, teacher, course)中F={(student, teacher)→course,
                  (student, course)→teacher,
                  teacher→course},teacher是决定因素，不包含候选码
                </p>
                <p>
                  第四范式：消除非平凡且非函数依赖的多值依赖，在R(X,Y,Z)中若X相同时交换Y的值仍可以找到相同的元组
                </p>
                <p>
                  比如 students(student_id, hobby, language) 中 hobby 与
                  language独立
                </p>
              </div>
            </div>
            <div id="section-050304">
              <h4>3.4 模式分解</h4>
              <div class="sub-contents">
                <p>无损连接-可自然连接恢复/保持函数依赖</p>
              </div>
            </div>
          </div>
          <h3 id="part-0504">4. SQL语言</h3>
          <div class="part-contents">
            <div id="section-050401">
              <h4>4.1 语言</h4>
              <div class="sub-contents">
                <p>students(id, name, age, gender, major, grade)</p>
                <p>
                  数据定义语言 DDL <i class="txt-en">Data Definition Language</i>
                </p>
                <p>
                  完整性约束:
                  <b>not null/unique/default/primary key/foreign key/check</b>
                </p>
                <div class="box-code" style="width: 700px; height: 500px">
                  <codeView :configs="codeConfig('sql')" :value="db.sql_03"></codeView>
                </div>
                <p>
                  数据操作语言 DML
                  <i class="txt-en">Data Manipulation Language</i>
                </p>
                <div class="box-code" style="width: 700px; height: 500px">
                  <codeView :configs="codeConfig('sql')" :value="db.sql_01"></codeView>
                </div>
                <p>数据查询语言 DQL <i class="txt-en">Data Query Language</i></p>
                <p>
                  比较/between/逻辑/in/not
                  in/exists/like/all/some/unique/聚合函数/is null/is not
                  null/union/intersect/except/distinct/as
                </p>
                <p>聚合函数: <b>COUNT/SUM/AVG/MAX/MIN</b></p>
                <p>连接查询: <b>INNER/LEFT/RIGHT/FULL OUTER JOIN</b></p>
                <div class="box-code" style="width: 700px; height: 500px">
                  <codeView :configs="codeConfig('sql')" :value="db.sql_02"></codeView>
                </div>
                <p>
                  数据控制语言 DCL <i class="txt-en">Data Control Language</i>
                </p>
                <p>
                  GRANT/REVOKE &lt;INSERT&gt; &lt;ALL PRIVILEGES&gt; ON [table] TO
                  [user] PUBLIC/WITH GRANT OPTION 可分发
                </p>
                <div class="box-code" style="width: 700px; height: 400px">
                  <codeView :configs="codeConfig('sql')" :value="db.sql_04"></codeView>
                </div>
                <p>视图 <i class="txt-en">View</i></p>
                <p>CREATE VIEW .. AS SELECT .. FROM ... WITH CHECK OPTION</p>
                <div class="box-code" style="width: 700px; height: 400px">
                  <codeView :configs="codeConfig('sql')" :value="db.sql_05"></codeView>
                </div>
                <p>索引 <i class="txt-en">Index</i></p>
                <p>内模式是定义所有的记录类型、索引、文件的组织方式</p>
                <p>CREATE UNIQUE唯一/CLUSTER聚簇 INDEX .. ON ..</p>
                <div class="box-code" style="width: 700px; height: 400px">
                  <codeView :configs="codeConfig('sql')" :value="db.sql_06"></codeView>
                </div>
                <p>存储过程 <i class="txt-en">Stored Procedure</i></p>
                <div class="box-code" style="width: 700px; height: 400px">
                  <codeView :configs="codeConfig('sql')" :value="db.sql_07"></codeView>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0505">5. 并发控制</h3>
          <div class="part-contents">
            <div id="section-050501">
              <h4>5.1 事务</h4>
              <div class="sub-contents">
                <p>
                  事务：原子性(要么做要么都不做)/一致性/隔离性(读未提交、读已提交、可重复读、串行)/持久性
                </p>
                <p>处理：故障/备份(转储/增量/更新日志文件)/恢复/镜像</p>
              </div>
            </div>
            <div id="section-050502">
              <h4>5.2 并发控制</h4>
              <div class="sub-contents">
                <p>并发操作：丢失更新/不可重复读/读脏数据</p>
                <p>并发控制：封锁协议</p>
                <p>排它锁X</p>
                <p>共享锁S: 只读</p>
              </div>
            </div>
            <div id="section-050503">
              <h4>5.3 备份和恢复</h4>
              <div class="sub-contents">
                <p>备份</p>
                <p>恢复</p>
              </div>
            </div>
          </div>
          <h2 id="chapter-06">六、面向对象</h2>
          <h3 id="part-0601">1. 面向对象 OOP</h3>
          <div class="part-contents">
            <div id="section-060101">
              <h4>1.1 概念</h4>
              <div class="sub-contents">
                <p>
                  <b>对象</b> <i class="txt-en">object</i>：对象名，属性，方法
                </p>
                <p>
                  <b>类</b>
                  <i class="txt-en">class</i>：属性/数据/状态/变量和方法/函数/操作/行为/实现
                </p>
                <p>分类：实体类/接口类(边界类)/控制类</p>
                <p>抽象：抽取共同特征和行为</p>
                <p>
                  类是对象的抽象，对象是类的实例 <i class="txt-en">instance</i>
                </p>
                <p>
                  <b>消息</b>
                  <i class="txt-en">message</i>：调用方法传值给形参，相互之间通讯
                </p>
                <p>
                  <b>封装</b>：把客观事物封装成抽象的类，并隐藏实现细节，使得代码模块化
                </p>
                <p>this：隐式引用变量，指向当前实例</p>
                <p>-区分成员变量与局部变量</p>
                <p>-在方法中调用其他构造方法，构造器链</p>
                <p>-作为参数传递当前对象</p>
                <p>-返回当前对象，实现方法链</p>
                <p>public/private/protected：权限修饰符 公有</p>
                <p>static：静态成员变量，变量方法可类名调用，可修饰内部类</p>
                <p>final：使变量的值不可变，使方法不能被重写，使类不能继承</p>
                <p>
                  <b>继承</b>
                  <i class="txt-en">extends</i>：子类/派生类共享父类/超类/基类的属性和方法
                </p>
                <p>多重继承：多个父类，二义性</p>
                <p>
                  abstract：抽象类。可包含抽象方法，不能直接实例化，不能使用private/final/static,，可有构造方法
                </p>
                <p>
                  super：调用父类的构造方法，访问父类实例的变量，调用父类的方法
                </p>
                <p>隐藏：子类中具有 同名不同参 的方法，阻止父类函数行为</p>
                <p>
                  <b>多态</b>：继承父类的方法并重写，并通过父类的引用调用，向上转型。在运行时会调用对应子类中的方法，灵活可拓展
                </p>
                <p>参数多态/包含多态(引用子类)/过载多态(上下文)/强制多态</p>
                <p>
                  覆盖/重写 @Override：子类中具有 同名同参数
                  的方法，改变父类的函数行为。
                </p>
                <p>
                  动态绑定：继承后当代码运行时，通过父类引用调用父类和子类的重写方法，结果实际调用子类的方法
                </p>
                <p>
                  函数重载/方法重载 <i class="txt-en">overload</i>：同一个类中具有
                  同名不同参 的方法，提供多种方式来执行相同行为
                </p>
                <p>
                  <b>绑定</b>
                  <i class="txt-en">binding</i>：把一个方法与其所在的类/对象关联起来
                </p>
                <p>静态绑定：编译时，动态绑定：运行时</p>
                <p>
                  接口 <i class="txt-en">interface</i>/实现
                  <i class="txt-en">implement</i>：实现接口中的所有方法
                </p>
              </div>
            </div>
            <div id="section-060102">
              <h4>1.2 面向对象分析 OOA</h4>
              <div class="sub-contents">
                <p>为了确定问题域，理解问题</p>
                <p>
                  认定(实质性)对象、组织对象、描述对象间的相互作用、确定对象的操作、定义对象的内部信息
                </p>
              </div>
            </div>
            <div id="section-060103">
              <h4>1.3 面向对象设计 OOD</h4>
              <div class="sub-contents">
                <p>定义：将OOA所创建的分析模型转化为设计模型和实现代码</p>
                <p>识别类及对象、定义属性、定义服务、识别关系、识别包</p>
                <p><b>软件设计原则</b></p>
                <p>单一责任原则：仅有一个引起变化的原因</p>
                <p>
                  开放封闭原则：开发是可拓展的，封闭是不可修改的。接口和抽象类
                </p>
                <p>
                  里氏替换原则：任何父类可以出现的地方，子类都可以出现替换。子类可以扩展父类的功能，但不能改变父类原有的功能
                </p>
                <p>
                  依赖倒置原则：细节依赖于抽象，抽象不依赖于细节。高层模块不应该依赖于底层模块，都依赖于底层模块的抽象
                </p>
                <p>
                  <span class="txt-define">例</span>computer类不应该依赖于某个型号的CPU，而应该依赖于CPU的抽象类，有利于解耦
                </p>
                <p>
                  接口分离原则：接口属于客户。依赖于抽象，不依赖于具体。一个类对另一个类的依赖应该建立在最小接口之上
                </p>
                <p>
                  <span class="txt-define">例</span>安全门应分别依赖于防火接口、防水接口、防盗接口，这样既可以创建防火防水防盗的安全门类，也可以创建防火防盗的安全门类
                </p>
                <p>共同封闭原则：变化对包产生影响则对包中所有类产生影响</p>
                <p>共同重用原则：重用包中的一个类，需要重用所有类</p>
                <p>
                  迪米特法则(最少知识原则)：如果两个软件实体无须直接通信，那么就不应当发生直接的相互调用，可以通过第三方转发该调用
                </p>
                <p>
                  合成复用原则：尽量先使用组合或者聚合等关联关系来实现，其次才考虑使用继承关系来实现
                </p>
              </div>
            </div>
            <div id="section-060104">
              <h4>1.4 面向对象程序设计 OOP</h4>
              <div class="sub-contents">
                <p>程序设计规范</p>
                <p>选用 面向对象程序设计语言 OOPL 实现</p>
              </div>
            </div>
            <div id="section-060105">
              <h4>1.5 面向对象测试</h4>
              <div class="sub-contents">
                <p>算法层: 测试类中的每个方法</p>
                <p>类层: 测试一个类中的所有方法和属性</p>
                <p>模板层: 测试一组类之间的交互</p>
                <p>系统层: 测试整个系统</p>
              </div>
            </div>
          </div>
          <h2 id="chapter-07">七、统一建模语言 UML</h2>
          <h3 id="part-0701">
            1. UML <i class="txt-en">Unified Modeling Language</i>
          </h3>
          <div class="part-contents">
            <div id="section-070101">
              <h4>1.1 事物</h4>
              <div class="sub-contents">
                <p>结构事物</p>
                <img class="img-60" style="width: 350px" src="/docs/study/imgs/60-uml.png" />
                <p>行为事物</p>
                <img class="img-61" style="width: 250px" src="/docs/study/imgs/61-uml.png" />
                <p>分组事物</p>
                <p>注释事物</p>
                <img class="img-62" style="width: 250px" src="/docs/study/imgs/62-uml.png" />
              </div>
            </div>
            <div id="section-070102">
              <h4>1.2 关系</h4>
              <div class="sub-contents">
                <p><b>依赖</b>关系：一个事物的语义依赖另一个事物，临时引用</p>
                <img class="img-63" style="width: 250px" src="/docs/study/imgs/63-uml.png" />
                <p><b>关联</b>关系：长期引用，可标注重复度(多重度)/角色</p>
                <p>单向关联</p>
                <p>关联类：多对多</p>
                <img class="img-64" style="width: 250px" src="/docs/study/imgs/64-uml.png" />
                <p>聚集：是强关联关系，整体和部分间的结构关系</p>
                <p><b>聚合</b>：松散绑定，整体消失部分仍存在</p>
                <p><b>组合</b>：生命周期绑定，整体消失部分也消失</p>
                <img class="img-65" style="width: 250px" src="/docs/study/imgs/65-uml.png" />
                <p><b>泛化</b>关系(继承)：一般/特殊的关系，子类/父类之间的关系</p>
                <img class="img-66" style="width: 250px" src="/docs/study/imgs/66-uml.png" />
                <p><b>实现</b>关系：一个类元指定了另一个类元保证执行的契约</p>
                <img class="img-67" style="width: 250px" src="/docs/study/imgs/67-uml.png" />
              </div>
            </div>
          </div>
          <h3 id="part-0702">2. 图</h3>
          <div class="part-contents">
            <div id="section-070201">
              <h4>2.1 类图 <i class="txt-en">Class Diagram</i></h4>
              <div class="sub-contents">
                <p>静态设计视图</p>
                <p>
                  展现了一组对象、接口、协作和它们之间的关系，类包含类名、属性
                  <i class="txt-en">field</i> 和方法 <i class="txt-en">method</i>
                </p>
                <p>斜体：抽象类/方法</p>
                <p>权限修饰符：+public/-private/#protected/~包</p>
                <p>非直接对象/直接对象</p>
                <img class="img-68" style="width: 450px" src="/docs/study/imgs/68-uml.png" />
              </div>
            </div>
            <div id="section-070202">
              <h4>2.2 对象图</h4>
              <div class="sub-contents">
                <p>静态视图或静态进程视图</p>
                <p>
                  某一时刻一组对象(对象名:类名/下划线/属性值)以及之间的关系(链)
                </p>
                <img class="img-69" style="width: 450px" src="/docs/study/imgs/69-uml.png" />
              </div>
            </div>
            <div id="section-070203">
              <h4>2.3 用例图</h4>
              <div class="sub-contents">
                <p>静态用例视图</p>
                <p>对系统的语境/需求建模</p>
                <p>一组用例(椭圆)、参与者(人员)以及之间的关系(箭头)</p>
                <p>包含关系&lt;&lt;include&gt;&gt;：虚线箭头</p>
                <img class="img-70" style="width: 250px" src="/docs/study/imgs/70-uml.png" />
                <p>扩展关系&lt;&lt;extend&gt;&gt;：虚线箭头</p>
                <img class="img-71" style="width: 250px" src="/docs/study/imgs/71-uml.png" />
                <p>泛化关系：实线空心箭头</p>
                <img class="img-72" style="width: 250px" src="/docs/study/imgs/72-uml.png" />
                <p>用例图</p>
                <img class="img-73" style="width: 450px" src="/docs/study/imgs/73-uml.png" />
              </div>
            </div>
            <div id="section-070204">
              <h4>2.4 序列图(顺序图/时序图)</h4>
              <div class="sub-contents">
                <p>动态/交互</p>
                <p>
                  强调消息时间顺序的交互图，是场景的图形化表示，有对象生命线和控制焦点。水平为对象，垂直为按时间顺序的消息
                </p>
                <p>同步/调用消息、异步消息(半箭头)、返回消息(虚线)</p>
                <p>对象需实现的方法</p>
                <img class="img-74" style="width: 450px" src="/docs/study/imgs/74-uml.png" />
              </div>
            </div>
            <div id="section-070205">
              <h4>2.5 通信图(协作图)</h4>
              <div class="sub-contents">
                <p>动态/交互</p>
                <p>
                  强调参加交互的接收和发送消息的对象的结构组织，有路径和顺序号，可嵌套
                </p>
                <img class="img-75" style="width: 450px" src="/docs/study/imgs/75-uml.png" />
              </div>
            </div>
            <div id="section-070206">
              <h4>2.6 状态图</h4>
              <div class="sub-contents">
                <p>动态视图</p>
                <p>
                  展现一个状态机，由状态、活动、转换/迁移、事件组成，强调对象行为的时间顺序
                </p>
                <p>状态：初态-中间态-终态，圆角矩形：状态名+活动</p>
                <p>活动可以在状态内执行，也可以在转换时执行</p>
                <p>组合状态(超状态)+嵌套状态(子状态)/并发状态</p>
                <p>标准事件：entry/exit/do</p>
                <p>时间时间：when/after</p>
                <p>当事件触发/监护条件为真/状态内部活动执行完时，状态变迁</p>
                <p>描述一个对象在多个用例中的行为，对反应型对象建模</p>
                <img class="img-76" style="width: 400px" src="/docs/study/imgs/76-uml.png" />
              </div>
            </div>
            <div id="section-070207">
              <h4>2.7 活动图</h4>
              <div class="sub-contents">
                <p>动态视图</p>
                <p>
                  是一种特殊的状态图，展现了在系统内从一个活动到另一个活动的流程，强调对象间的控制流程，对工作流/操作建模
                </p>
                <p>包含：初态/活动/流/合并分岔/合并汇合/分支/监护表达式</p>
                <img class="img-77" style="width: 700px" src="/docs/study/imgs/77-uml.png" />
              </div>
            </div>
            <div id="section-070208">
              <h4>2.8 构件图(组件图)</h4>
              <div class="sub-contents">
                <p>静态实现视图/物理</p>
                <p>一组构件/组件之间的组织和依赖</p>
                <p>供接口：整圆</p>
                <p>需接口：半圆</p>
                <img class="img-78" style="width: 400px" src="/docs/study/imgs/78-uml.png" />
              </div>
            </div>
            <div id="section-070209">
              <h4>2.9 部署图</h4>
              <div class="sub-contents">
                <p>静态部署视图/物理</p>
                <p>对面向对象系统的物理方面建模的方法</p>
                <p>展现系统的软件和硬件之间的物理关系，在实施阶段使用</p>
                <img class="img-172" style="width: 400px" src="/docs/study/imgs/172-bushu.png" />
              </div>
            </div>
            <div id="section-070210">
              <h4>2.10 下午题</h4>
              <div class="sub-contents">
                <p>类图：依赖、关联(聚合、组合)、泛化</p>
                <p>用例图：包含、扩展、泛化</p>
              </div>
            </div>
            <div id="section-070211">
              <h4>2.11 总结</h4>
              <div class="sub-contents">
                <table>
                  <tbody>
                    <tr>
                      <td>类图</td>
                      <td>展现了一组类、接口、协作和他们之间的静态结构和关系：依赖、泛化、关联</td>
                    </tr>
                    <tr>
                      <td>对象图</td>
                      <td>展现了某一时刻一组对象以及它们之间的关系，一般包含对象和链</td>
                    </tr>
                    <tr>
                      <td>用例图</td>
                      <td>展现了一组用例、参与者以及它们之间的关系：扩展、包含、泛化，描述用户、需求及功能单元之间的关系</td>
                    </tr>
                    <tr>
                      <td>序列图/时序图/顺序图</td>
                      <td>是场景的图形化表示，描述了以时间顺序组织的对象之间的发送消息的交互活动，由对象、生命线、激活、消息组成</td>
                    </tr>
                    <tr>
                      <td>通信图/协作图</td>
                      <td>强调参加交互的各对象结构的信息，由对象、链接、带顺序号的消息构成</td>
                    </tr>
                    <tr>
                      <td>状态图</td>
                      <td>描述对象具有的各种状态、状态之间的转换过程以及触发状态转换的各种事件和条件</td>
                    </tr>
                    <tr>
                      <td>活动图</td>
                      <td>描述满足用例要求所要进行的活动以及活动间的约束条件，有利于识别并行活动</td>
                    </tr>
                    <tr>
                      <td>组件图/构件图</td>
                      <td>描述系统中遵从并实现一组接口的物理的、可替换的软件模块，由构件、接口、关系、供需端口、连接器构成</td>
                    </tr>
                    <tr>
                      <td>部署图</td>
                      <td>由节点以及节点之间的关系组成，描述系统运行时的结构</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <h2 id="chapter-08">八、设计模式</h2>
          <h3 id="part-0801">1. 概念</h3>
          <div class="part-contents">
            <div id="section-080101">
              <h4>
                1.1 软件设计模式 <i class="txt-en">Software Design Pattern</i>
              </h4>
              <div class="sub-contents">
                <p>主要关注软件系统的设计，与具体的实现语言无关</p>
                <p>
                  在特定问题领域中被使用，涉及多种设计元素，以面向对象方式进行设计，遵循设计原则，复用成功的设计和体系结构
                </p>
                <p>
                  基本要素：模式名称、问题(应该在何时使用模式)、解决方案(设计的内容)、效果(模式应用的效果)
                </p>
              </div>
            </div>
            <div id="section-080102">
              <h4>1.2 分类</h4>
              <div class="sub-contents">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>创建型 5</th>
                      <th>结构型 7</th>
                      <th>行为型 11</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th>处理创建对象</th>
                      <th>处理类和对象的组合</th>
                      <th>描述类或对象的交互</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>类</td>
                      <td>
                        <p>工厂方法模式 <i class="txt-en">Factory Method</i></p>
                      </td>
                      <td>
                        <p>适配器模式 <i class="txt-en">Adapter</i></p>
                      </td>
                      <td>
                        <p>解释器模式 <i class="txt-en">Interpreter</i></p>
                        <p>模板方法模式 <i class="txt-en">Template Method</i></p>
                      </td>
                    </tr>
                    <tr>
                      <td>对象</td>
                      <td>
                        <p>抽象工厂模式 <i class="txt-en">Abstract Factory</i></p>
                        <p>生成器模式 <i class="txt-en">Builder</i></p>
                        <p>原型模式 <i class="txt-en">Prototype</i></p>
                        <p>单例模式 <i class="txt-en">Singleton</i></p>
                      </td>
                      <td>
                        <p>适配器模式 <i class="txt-en">Adapter</i></p>
                        <p>桥接模式 <i class="txt-en">Bridge</i></p>
                        <p>组合模式 <i class="txt-en">Composite</i></p>
                        <p>装饰模式 <i class="txt-en">Decorator</i></p>
                        <p>外观模式 <i class="txt-en">Facade</i></p>
                        <p>享元模式 <i class="txt-en">Flyweight</i></p>
                        <p>代理模式 <i class="txt-en">Proxy</i></p>
                      </td>
                      <td>
                        <p>
                          责任链模式 <i class="txt-en">Chain of Responsibility</i>
                        </p>
                        <p>命令模式 <i class="txt-en">Command</i></p>
                        <p>迭代器模式 <i class="txt-en">Iterator</i></p>
                        <p>中介者模式 <i class="txt-en">Mediator</i></p>
                        <p>备忘录模式 <i class="txt-en">Memento</i></p>
                        <p>观察者模式 <i class="txt-en">Observer</i></p>
                        <p>状态模式 <i class="txt-en">State</i></p>
                        <p>策略模式 <i class="txt-en">Strategy</i></p>
                        <p>访问者模式 <i class="txt-en">Visitor</i></p>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>工厂</td>
                      <td>适配桥组装外享代</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <p style="margin-top: 10px"></p>
                <table>
                  <tbody>
                    <tr>
                      <td>设计模式</td>
                      <td>意图</td>
                      <td>用例</td>
                      <td>记忆点</td>
                      <td>优缺点</td>
                    </tr>
                    <tr>
                      <td>工厂方法模式</td>
                      <td>定义一个用于创建对象的接口，让子类决定实例化哪一个类</td>
                      <td></td>
                      <td>子类决定产品</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>抽象工厂模式</td>
                      <td>提供一个创建一系列相关或互相依赖对象的接口，而无须指定它们具体的类</td>
                      <td>不同主题皮肤的 UI 控件</td>
                      <td>同一产品族创建</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>生成器模式</td>
                      <td>将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示</td>
                      <td>build自行车的车架和座椅</td>
                      <td>先分步构建部件Part，再组装产品</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>原型模式</td>
                      <td>用原型实例指定创建对象的种类，并且通过复制这些原型创建新的对象</td>
                      <td>游戏角色克隆、复制图形对象</td>
                      <td>复制、克隆</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>单例模式</td>
                      <td>保证一个类仅有一个实例，并提供一个访问它的全局访问点</td>
                      <td>全局配置、线程池、日志管理</td>
                      <td>仅此一个</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>适配器模式</td>
                      <td>将一个类的接口转换成客户希望的另外一个接口</td>
                      <td>电源适配器</td>
                      <td>接口兼容</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>桥接模式</td>
                      <td>将抽象部分与其实现部分分离，使它们都可以独立地变化</td>
                      <td>手机品牌 + 操作系统</td>
                      <td>多维度的变化需独立扩展和组合</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>组合模式</td>
                      <td>将对象组合成树型结构以表示 "部分-整体" 的层次结构</td>
                      <td>文件目录、菜单结构</td>
                      <td>树形结构</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>装饰模式</td>
                      <td>动态地给一个对象添加一些额外的职责</td>
                      <td>炒饭->加蛋的炒饭</td>
                      <td>新建了一个更大的类，包装增强</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>外观模式</td>
                      <td>为子系统中的一组接口提供一个一致的界面</td>
                      <td>一键启动智能家居</td>
                      <td>封装复杂库的接口</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>享元模式</td>
                      <td>运用共享技术有效地支持大量细粒度的对象</td>
                      <td>字体、棋子、俄罗斯方块</td>
                      <td>可类比单例模式，对象复用</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>代理模式</td>
                      <td>为其他对象提供一种代理以控制对这个对象的访问</td>
                      <td>车票代理售卖处</td>
                      <td>控制访问</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>责任链模式</td>
                      <td>使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将对象连成一条链传递请求</td>
                      <td>请假审批流</td>
                      <td>逐级传递</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>命令模式</td>
                      <td>将一个请求封装为一个对象，从而使得可以用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作</td>
                      <td></td>
                      <td>请求封装</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>解释器模式</td>
                      <td>给定一个语言，定义它的文法的一种表示，并定义一个解释器，使用该表示来解释语言中的句子</td>
                      <td>SQL解析器</td>
                      <td>自定义语法</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>迭代器模式</td>
                      <td>提供一种方法顺序访问一个聚合对象中的各个元素，且不需要暴露该对象的内部表示</td>
                      <td>Java Iterator、数组遍历器</td>
                      <td>循环元素，顺序访问</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>中介者模式</td>
                      <td>用一个中介对象来封装一系列的对象交互，使对象不需要显式地互相医用，从而使其耦合松散，且可以独立地改变它们之间的交互</td>
                      <td>聊天室、航班调度系统</td>
                      <td>中心协调</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>备忘录模式</td>
                      <td>在不破坏封装性的前提下捕获一个对象的内部状态，并在对象之外保存这个状态，可以在之后将对象恢复到原先保存的状态</td>
                      <td>游戏存档、编辑器撤销</td>
                      <td>状态快照</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>观察者模式</td>
                      <td>定义对象之间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它们的对象都得到通知并被自动更新</td>
                      <td></td>
                      <td>发布订阅</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>状态模式</td>
                      <td>允许一个对象在其内部状态改变时改变它的行为</td>
                      <td>电梯运行开关门、订单状态流转</td>
                      <td>状态驱动，不同状态，不同行为</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>策略模式</td>
                      <td>定义一系列的算法，把它们一个个封装起来，并且使它们可以互相替换，使得算法可以独立于使用的客户而变化</td>
                      <td>支付策略、促销活动</td>
                      <td>不同节日，不同活动</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>模板方法模式</td>
                      <td>定义一个操作中的算法骨架，而将一些步骤延迟到子类中，使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤</td>
                      <td></td>
                      <td>固定流程，可扩展步骤</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>访问者模式</td>
                      <td>表示一个作用于某对象结构中的各元素的操作，允许在不改变各元素的类的前提下定义作用于这些元素的新操作</td>
                      <td>双分派</td>
                      <td>不同主人，不同反馈</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-080103">
              <h4>1.3 下午题</h4>
              <div class="sub-contents">
                <p>中介者模式</p>
                <p>策略模式</p>
              </div>
            </div>
          </div>
          <h3 id="part-0802">2. 简单工厂模式</h3>
          <div class="part-contents">
            <div id="section-080201">
              <h4>2.1 概念</h4>
              <div class="sub-contents">
                <p>并不是一种设计模式</p>
                <p>抽象产品是所有产品的父类，定义产品的主要特性和功能</p>
                <p>具体产品则实现抽象产品中声明的抽象方法</p>
                <p>具体工厂负责实现创建产品的静态方法，从而获取产品</p>
                <p>缺点是当增加新产品时需要修改工厂类的代码</p>
              </div>
            </div>
            <div id="section-080202">
              <h4>2.2 类图</h4>
              <div class="sub-contents"></div>
            </div>
            <div id="section-080203">
              <h4>2.3 实现</h4>
              <div class="sub-contents">
                <div class="box-code" style="width: 800px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_jiandan_01"></codeView>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0803">3. 工厂方法模式</h3>
          <div class="part-contents">
            <div id="section-080301">
              <h4>3.1 概念</h4>
              <div class="sub-contents">
                <p>
                  定义一个用于创建对象的接口，由子类决定实例化哪个类。使一个产品类的是实例化延迟到其子类
                </p>
                <p>用于当一个类不知道它所必须创建的对象的类时</p>
                <p>用于当一个类希望由它的子类来指定它所传概念的对象时</p>
                <p>
                  <span class="txt-define">优点</span>无须对原工厂进行任何修改，满足开闭原则
                </p>
                <p>
                  <span class="txt-define">缺点</span>每增加一个产品需增加一个具体产品类和具体工厂类
                </p>
              </div>
            </div>
            <div id="section-080302">
              <h4>3.2 类图</h4>
              <div class="sub-contents">
                <img class="img-176" style="width: 450px" src="/docs/study/imgs/176-moshi.png" />
                <p>生产两种咖啡：美式和拿铁</p>
              </div>
            </div>
            <div id="section-080303">
              <h4>3.3 实现</h4>
              <div class="sub-contents">
                <p>抽象产品 <i class="txt-en">Product</i></p>
                <div class="box-code" style="width: 800px; height: 150px">
                  <codeView :configs="codeConfig('java')" :value="db.code_gongchang_01"></codeView>
                </div>
                <p>具体产品 <i class="txt-en">Concrete Product</i></p>
                <div class="box-code" style="width: 800px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_gongchang_02"></codeView>
                </div>
                <p>抽象工厂 <i class="txt-en">Abstract Factory</i></p>
                <div class="box-code" style="width: 800px; height: 100px">
                  <codeView :configs="codeConfig('java')" :value="db.code_gongchang_03"></codeView>
                </div>
                <p>具体工厂 <i class="txt-en">Concrete Factory</i></p>
                <div class="box-code" style="width: 800px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_gongchang_04"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 800px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_gongchang_05"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>add 60ml Coffee</p>
                  <p>add 250ml Water</p>
                  <p>get AmericanoCoffee</p>
                  <p>add 30ml Coffee</p>
                  <p>add 175ml Milk</p>
                  <p>get LatteCoffee</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0804">4. 抽象工厂模式</h3>
          <div class="part-contents">
            <div id="section-080401">
              <h4>4.1 概念</h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">定义</span>提供创建一系列相关或相互依赖对象的接口, 无需指定具体类
                </p>
                <p>工厂模式只生产同种类产品，同类产品称为同等级产品</p>
                <p>
                  抽象工厂提供了多个创建接口，创建多个不同等级的产品，是综合型的工厂
                </p>
                <p>具体产品与具体工厂间是多对一的关系</p>
                <p>用于一个系统要独立于产品的创建、组合和表示时</p>
                <p>用于一个系统要由多个产品系列中的一个来配置时</p>
                <p>用于强调一系列相关的产品对象的设计以便进行联合使用时</p>
                <p>用于提供一个产品类库只想显示接口而不是实现时</p>
                <p>
                  <span class="txt-define">缺点</span>当产品族中需增加新产品时，需修改所有的工厂类
                </p>
              </div>
            </div>
            <div id="section-080402">
              <h4>4.2 类图</h4>
              <div class="sub-contents">
                <img class="img-177" style="width: 550px" src="/docs/study/imgs/177-moshi.png" />
                <p>生产咖啡的同时，还要生产两种甜点：提拉米苏和抹茶慕斯</p>
              </div>
            </div>
            <div id="section-080403">
              <h4>4.3 实现</h4>
              <div class="sub-contents">
                <p>抽象产品 <i class="txt-en">Product</i></p>
                <div class="box-code" style="width: 800px; height: 100px">
                  <codeView :configs="codeConfig('java')" :value="db.code_chouxiang_01"></codeView>
                </div>
                <p>具体产品 <i class="txt-en">Concrete Product</i></p>
                <div class="box-code" style="width: 800px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_chouxiang_02"></codeView>
                </div>
                <p>抽象工厂 <i class="txt-en">Abstract Factory</i></p>
                <div class="box-code" style="width: 800px; height: 100px">
                  <codeView :configs="codeConfig('java')" :value="db.code_chouxiang_03"></codeView>
                </div>
                <p>具体工厂 <i class="txt-en">Concrete Factory</i></p>
                <div class="box-code" style="width: 800px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_chouxiang_04"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 800px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_chouxiang_05"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>add 60ml Coffee</p>
                  <p>add 250ml Water</p>
                  <p>get AmericanoCoffee</p>
                  <p>get Matcha Mousse</p>
                  <p>add 30ml Coffee</p>
                  <p>add 175ml Milk</p>
                  <p>get LatteCoffee</p>
                  <p>get Tiramisu</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0805">5. 生成器模式</h3>
          <div class="part-contents">
            <div id="section-080501">
              <h4>5.1 概念</h4>
              <div class="sub-contents">
                <p>
                  将一个复杂对象的构建步骤与表示分离，使得同样的构建过程可以创建不同表示
                </p>
                <p>用于复杂对象的创建独立于该对象的组成部分及装配方式时</p>
                <p>
                  <span class="txt-define">优点</span>一般产品类和生成器类是比较稳定的
                </p>
                <p>
                  <span class="txt-define">缺点</span>要求产品具有较多的共同点
                </p>
              </div>
            </div>
            <div id="section-080502">
              <h4>5.2 类图</h4>
              <div class="sub-contents">
                <img class="img-178" style="width: 550px" src="/docs/study/imgs/178-moshi.png" />
                <img class="img-79 img-abs" style="width: 450px" src="/docs/study/imgs/79-sheji.png" />
              </div>
            </div>
            <div id="section-080503">
              <h4>5.3 实现</h4>
              <div class="sub-contents">
                <p>产品类 <i class="txt-en">Product</i>：要创建的复杂对象</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_shengchengqi_01"></codeView>
                </div>
                <p>抽象生成器类 <i class="txt-en">Builder</i>：指定部件接口</p>
                <div class="box-code" style="width: 700px; height: 200px">
                  <codeView :configs="codeConfig('java')" :value="db.code_shengchengqi_02"></codeView>
                </div>
                <p>
                  具体生成器类 <i class="txt-en">ConcreteBuilder</i>：实现 Builder
                  接口，完成复杂产品的各个部件的具体创建方法，并在构造过程完成后，提供产品的实例
                </p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_shengchengqi_04"></codeView>
                </div>
                <p>
                  指挥者类
                  <i class="txt-en">Director</i>：调用具体生成器来创建各部分的对象，只负责保证对象各部分的完整创建或顺序创建
                </p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_shengchengqi_03"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_shengchengqi_05"></codeView>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0806">6. 原型模式</h3>
          <div class="part-contents">
            <div id="section-080601">
              <h4>6.1 概念</h4>
              <div class="sub-contents">
                <p>
                  用一个已创建的原型实例指定创建对象的种类，并且通过复制这个原型创建新的对象
                </p>
                <p>Java中的Object类中提供了 clone() 方法来实现浅克隆</p>
              </div>
            </div>
            <div id="section-080602">
              <h4>6.2 类图</h4>
              <div class="sub-contents">
                <img class="img-179" style="width: 550px" src="/docs/study/imgs/179-moshi.png" />
                <img class="img-80 img-abs" style="width: 550px" src="/docs/study/imgs/80-sheji.png" />
              </div>
            </div>
            <div id="section-080603">
              <h4>6.3 实现</h4>
              <div class="sub-contents">
                <p>抽象原型类：Cloneable/具体原型类/访问类</p>
                <p>用于一个系统要独立于产品的创建、构成和表示时</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_yuanxing_01"></codeView>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0807">7. 单例模式</h3>
          <div class="part-contents">
            <div id="section-080701">
              <h4>7.1 概念</h4>
              <div class="sub-contents">
                <p>保证一个类仅有一个实例，并提供一个访问它的全局访问点</p>
              </div>
            </div>
            <div id="section-080702">
              <h4>7.2 类图</h4>
              <div class="sub-contents">
                <img class="img-180" style="width: 550px" src="/docs/study/imgs/180-moshi.png" />
              </div>
            </div>
            <div id="section-080703">
              <h4>7.3 实现</h4>
              <div class="sub-contents">
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_danli_01"></codeView>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0808">8. 适配器模式</h3>
          <div class="part-contents">
            <div id="section-080801">
              <h4>8.1 概念</h4>
              <div class="sub-contents">
                <p>
                  将类的接口转换成客户希望的另一个接口，处理接口不兼容。使可读取SD卡的电脑，适配成也可以读取TF卡的内容
                </p>
              </div>
            </div>
            <div id="section-080802">
              <h4>8.2 类图</h4>
              <div class="sub-contents">
                <img class="img-181" style="width: 500px" src="/docs/study/imgs/181-moshi.png" />
                <img class="img-182" style="width: 500px" src="/docs/study/imgs/182-moshi.png" />
                <img class="img-81 img-abs" style="width: 450px" src="/docs/study/imgs/81-sheji.png" />
              </div>
            </div>
            <div id="section-080803">
              <h4>8.3 实现</h4>
              <div class="sub-contents">
                <p>客户端</p>
                <div class="box-code" style="width: 700px; height: 200px">
                  <codeView :configs="codeConfig('java')" :value="db.code_shipei_01"></codeView>
                </div>
                <p>
                  目标接口 <i class="txt-en">Target</i>：业务所需的抽象类或接口
                </p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_shipei_02"></codeView>
                </div>
                <p>适配者类 <i class="txt-en">Adaptee</i>：被访问的接口</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_shipei_03"></codeView>
                </div>
                <p>
                  适配器类
                  <i class="txt-en">Adapter</i>：通过继承或引用Adaptee，转成Target
                </p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_shipei_04"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 250px">
                  <codeView :configs="codeConfig('java')" :value="db.code_shipei_05"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>sd card read a msg :hello world SD</p>
                  <p>------------</p>
                  <p>adapter read tf card</p>
                  <p>tf card read msg : hello world tf card</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0809">9. 桥接模式</h3>
          <div class="part-contents">
            <div id="section-080901">
              <h4>9.1 概念</h4>
              <div class="sub-contents">
                <p>
                  将抽象部分与其实现部分分离，可以独立变化。实现在不同操作系统上可打开多种格式视频文件的播放器
                </p>
                <p>
                  当一个类存在两个独立变化的维度，且这两个维度都需要进行扩展时
                </p>
                <p>
                  当一个系统不希望使用继承或因为多层次继承导致系统类的个数急剧增加时
                </p>
                <p>
                  当一个系统需要在构件的抽象化角色和具体化角色之间增加更多的灵活性时。避免在两个层次之间建立静态的继承联系，通过桥接模式可以使它们在抽象层建立一个关联关系
                </p>
              </div>
            </div>
            <div id="section-080902">
              <h4>9.2 类图</h4>
              <div class="sub-contents">
                <img class="img-183" style="width: 550px" src="/docs/study/imgs/183-moshi.png" />
                <img class="img-82 img-abs" style="width: 625px" src="/docs/study/imgs/82-sheji.png" />
              </div>
            </div>
            <div id="section-080903">
              <h4>9.3 实现</h4>
              <div class="sub-contents">
                <p>
                  实现化角色
                  <i class="txt-en">Implementor</i>：定义实现化角色的接口，供扩展抽象化角色调用
                </p>
                <div class="box-code" style="width: 700px; height: 100px">
                  <codeView :configs="codeConfig('java')" :value="db.code_qiao_01"></codeView>
                </div>
                <p>具体实现化角色 <i class="txt-en">ConcreteImplementor</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_qiao_02"></codeView>
                </div>
                <p>
                  抽象化角色
                  <i class="txt-en">Abstraction</i>：定义抽象类，并包含一个对实现化对象的引用
                </p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_qiao_03"></codeView>
                </div>
                <p>扩展抽象化角色 <i class="txt-en">RefinedAbstraction</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_qiao_04"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 200px">
                  <codeView :configs="codeConfig('java')" :value="db.code_qiao_05"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>avi file: video.avi</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0810">10. 组合模式</h3>
          <div class="part-contents">
            <div id="section-081001">
              <h4>10.1 概念</h4>
              <div class="sub-contents">
                <p>
                  将对象组合成树型结构以表示“部分-整体”的层次结构。一个菜单可包含菜单条目，也可以包含有子菜单的菜单
                </p>
              </div>
            </div>
            <div id="section-081002">
              <h4>10.2 类图</h4>
              <div class="sub-contents">
                <img class="img-184" style="width: 500px" src="/docs/study/imgs/184-moshi.png" />
                <img class="img-83 img-abs" style="width: 250px" src="/docs/study/imgs/83-sheji.png" />
              </div>
            </div>
            <div id="section-081003">
              <h4>10.3 实现</h4>
              <div class="sub-contents">
                <p>抽象根节点 <i class="txt-en">Component</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zuhe_01"></codeView>
                </div>
                <p>叶子节点 <i class="txt-en">Leaf</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zuhe_02"></codeView>
                </div>
                <p>树枝节点 <i class="txt-en">Composite</i>：定义子组件的行为</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zuhe_03"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 200px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zuhe_04"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>系统管理</p>
                  <p>--菜单管理</p>
                  <p>----页面访问</p>
                  <p>----展开菜单</p>
                  <p>----编辑菜单</p>
                  <p>----删除菜单</p>
                  <p>----新增菜单</p>
                  <p>--权限管理</p>
                  <p>----页面访问</p>
                  <p>----提交保存</p>
                  <p>--角色管理</p>
                  <p>----页面访问</p>
                  <p>----新增角色</p>
                  <p>----修改角色</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0811">11. 装饰器模式</h3>
          <div class="part-contents">
            <div id="section-081101">
              <h4>11.1 概念</h4>
              <div class="sub-contents">
                <p>
                  在不影响其他对象下，以动态、透明的方式给单个对象增加或改变功能。快餐和配料的随意搭配
                </p>
                <p>
                  桥接模式 注重解耦两个维度的变化，装饰器模式
                  注重给对象动态添加功能
                </p>
              </div>
            </div>
            <div id="section-081102">
              <h4>11.2 类图</h4>
              <div class="sub-contents">
                <img class="img-185" style="width: 500px" src="/docs/study/imgs/185-moshi.png" />
                <img class="img-84 img-abs" style="width: 450px" src="/docs/study/imgs/84-sheji.png" />
              </div>
            </div>
            <div id="section-081103">
              <h4>11.3 实现</h4>
              <div class="sub-contents">
                <p>抽象构件角色 <i class="txt-en">Component</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zhuang_01"></codeView>
                </div>
                <p>具体构件角色 <i class="txt-en">ConcreteComponent</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zhuang_02"></codeView>
                </div>
                <p>抽象装饰角色 <i class="txt-en">Decorator</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zhuang_03"></codeView>
                </div>
                <p>具体装饰角色 <i class="txt-en">ConcreteDecorator</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zhuang_04"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zhuang_05"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>炒饭 10.0元</p>
                  <p>========</p>
                  <p>炒饭 10.0元</p>
                  <p>鸡蛋炒饭 11.0元</p>
                  <p>========</p>
                  <p>炒面 12.0元</p>
                  <p>培根炒面 14.0元</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0812">12. 外观模式</h3>
          <div class="part-contents">
            <div id="section-081201">
              <h4>12.1 概念</h4>
              <div class="sub-contents">
                <p>
                  为多个复杂子系统中的接口提供对外的一个统一的接口或界面。智能控制平台统一控制灯光，电视和空调
                </p>
                <p>
                  <span class="txt-define">缺点</span>不符合开闭原则，当增加一个子系统时需修改外观类的代码
                </p>
                <p>
                  当一个复杂系统的子系统很多时，外观模式可以为系统设计一个简单的接口供外界访问。
                </p>
                <p>
                  当客户端与多个子系统之间存在很大的联系或依赖性，引入外观模式可将它们分离，从而提高子系统的独立性和可移植性。
                </p>
                <p>
                  对分层结构系统构建时，使用外观模式定义子系统中每层的入口点可以简化子系统之间的依赖关系。
                </p>
              </div>
            </div>
            <div id="section-081202">
              <h4>12.2 类图</h4>
              <div class="sub-contents">
                <img class="img-186" style="width: 700px" src="/docs/study/imgs/186-moshi.png" />
                <img class="img-85 img-abs" style="width: 250px" src="/docs/study/imgs/85-sheji.png" />
              </div>
            </div>
            <div id="section-081203">
              <h4>12.3 实现</h4>
              <div class="sub-contents">
                <p>
                  外观角色
                  <i class="txt-en">Facade</i>：为多个子系统对外提供一个共同的接口
                </p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_wai_01"></codeView>
                </div>
                <p>子系统角色 <i class="txt-en">SubSystem</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_wai_02"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_wai_03"></codeView>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0813">13. 享元模式</h3>
          <div class="part-contents">
            <div id="section-081301">
              <h4>13.1 概念</h4>
              <div class="sub-contents">
                <p>
                  运用共享技术有效地支持大量细粒度的对象。俄罗斯方块中的不同形状的方块重复使用
                </p>
                <p>
                  为了使对象可以共享，需要将享元对象的部分状态外部化，分离内部状态和外部状态，使程序逻辑复杂
                </p>
                <p>一个系统有大量相同或者相似的对象，造成内存的大量耗费。</p>
                <p>
                  对象的大部分状态都可以外部化，可以将这些外部状态传入对象中。
                </p>
                <p>
                  在使用享元模式时需要维护一个存储享元对象的享元池，而这需要耗费一定的系统资源，因此，应当在需要多次重复使用享元对象时才值得使用享元模式。
                </p>
                <p>
                  单例模式 注重只需要一个全局唯一对象，享元模式
                  注重有大量相似对象，可以共享以减少内存
                </p>
              </div>
            </div>
            <div id="section-081302">
              <h4>13.2 类图</h4>
              <div class="sub-contents">
                <img class="img-187" style="width: 700px" src="/docs/study/imgs/187-moshi.png" />
                <img class="img-86 img-abs" style="width: 450px" src="/docs/study/imgs/86-sheji.png" />
              </div>
            </div>
            <div id="section-081303">
              <h4>13.3 实现</h4>
              <div class="sub-contents">
                <p>抽象享元角色 <i class="txt-en">Flyweight</i></p>
                <div class="box-code" style="width: 700px; height: 200px">
                  <codeView :configs="codeConfig('java')" :value="db.code_xiang_01"></codeView>
                </div>
                <p>具体享元角色 <i class="txt-en">ConcreteFlyweight</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_xiang_03"></codeView>
                </div>
                <p>非享元角色 <i class="txt-en">UnsharableFlyweight</i></p>
                <p>
                  享元工厂角色 <i class="txt-en">FlyweightFactory</i>：单例工厂
                </p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_xiang_02"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_xiang_04"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>方块形状：I 颜色：灰色</p>
                  <p>方块形状：L 颜色：绿色</p>
                  <p>方块形状：O 颜色：灰色</p>
                  <p>方块形状：O 颜色：红色</p>
                  <p>两次获取到的O图形对象是否是同一个对象：true</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0814">14. 代理模式</h3>
          <div class="part-contents">
            <div id="section-081401">
              <h4>14.1 概念</h4>
              <div class="sub-contents">
                <p>
                  为其他对象提供一个代理以控制对这个对象的访问。可以买火车票的代理站点
                </p>
                <p>在需要比较通用和复杂的对象指针代替简单指针时</p>
                <p>远程代理(Remote)</p>
                <p>虚代理(Virtual)</p>
                <p>保护代理(Protection)</p>
                <p>与装饰器模式的不同点：</p>
                <p>
                  目的不同：装饰器是为了增强目标对象，静态代理是为了保护和隐藏目标对象
                </p>
                <p>
                  获取目标对象构建的地方不同：装饰器是由外界传递进来，可以通过构造方法传递，静态代理是在代理类内部创建，以此来隐藏目标对象
                </p>
                <p>
                  装饰器模式 注重动态地为对象添加新的功能，代理模式
                  注重控制对象的访问
                </p>
              </div>
            </div>
            <div id="section-081402">
              <h4>14.2 类图</h4>
              <div class="sub-contents">
                <img class="img-188" style="width: 600px" src="/docs/study/imgs/188-moshi.png" />
                <img class="img-87 img-abs" style="width: 450px" src="/docs/study/imgs/87-sheji.png" />
              </div>
            </div>
            <div id="section-081403">
              <h4>14.3 实现</h4>
              <div class="sub-contents">
                <p>抽象主题类 <i class="txt-en">Subject</i></p>
                <div class="box-code" style="width: 700px; height: 100px">
                  <codeView :configs="codeConfig('java')" :value="db.code_dai_01"></codeView>
                </div>
                <p>真实主题类 <i class="txt-en">RealSubject</i></p>
                <div class="box-code" style="width: 700px; height: 150px">
                  <codeView :configs="codeConfig('java')" :value="db.code_dai_02"></codeView>
                </div>
                <p>
                  代理类 <i class="txt-en">Proxy</i>:
                  提供了与真实主题相同的接口，其内部含有对真实主题的引用
                </p>
                <div class="box-code" style="width: 700px; height: 200px">
                  <codeView :configs="codeConfig('java')" :value="db.code_dai_03"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 150px">
                  <codeView :configs="codeConfig('java')" :value="db.code_dai_04"></codeView>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0815">15. 责任链模式</h3>
          <div class="part-contents">
            <div id="section-081501">
              <h4>15.1 概念</h4>
              <div class="sub-contents">
                <p>
                  使多个对象都有机会处理请求，避免请求的发送者和接收者之间的耦合关系。请假1天小组长批/3天内部门经理批/7天内总经理批
                </p>
              </div>
            </div>
            <div id="section-081502">
              <h4>15.2 类图</h4>
              <div class="sub-contents">
                <img class="img-189" style="width: 700px" src="/docs/study/imgs/189-moshi.png" />
                <img class="img-88 img-abs" style="width: 650px" src="/docs/study/imgs/88-sheji.png" />
              </div>
            </div>
            <div id="section-081503">
              <h4>15.3 实现</h4>
              <div class="sub-contents">
                <p>抽象处理者角色 <i class="txt-en">Handler</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_ze_01"></codeView>
                </div>
                <p>具体处理者角色 <i class="txt-en">ConcreteHandler</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_ze_02"></codeView>
                </div>
                <p>请假类 <i class="txt-en">Client</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_ze_03"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_ze_04"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>小明请假小明天，身体不适。</p>
                  <p>小组长审批：同意</p>
                  <p>小明请假小明天，身体不适。</p>
                  <p>部门经理审批：同意</p>
                  <p>流程结束！</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0816">16. 命令模式</h3>
          <div class="part-contents">
            <div id="section-081601">
              <h4>16.1 概念</h4>
              <div class="sub-contents">
                <p>
                  将一个请求封装为一个对象，可以用不用的请求对客户进行参数化：对请求排队或记录日志以及支持可撤销的操作
                </p>
              </div>
            </div>
            <div id="section-081602">
              <h4>16.2 类图</h4>
              <div class="sub-contents">
                <img class="img-190" style="width: 600px" src="/docs/study/imgs/190-moshi.png" />
                <img class="img-89 img-abs" style="width: 650px" src="/docs/study/imgs/89-sheji.png" />
              </div>
            </div>
            <div id="section-081603">
              <h4>16.3 实现</h4>
              <div class="sub-contents">
                <p>抽象命令类角色 <i class="txt-en">Command</i></p>
                <div class="box-code" style="width: 700px; height: 150px">
                  <codeView :configs="codeConfig('java')" :value="db.code_mingling_01"></codeView>
                </div>
                <p>具体命令角色 <i class="txt-en">ConcreteCommand</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_mingling_02"></codeView>
                </div>
                <p>实现者/接收者角色 <i class="txt-en">Receiver</i></p>
                <div class="box-code" style="width: 700px; height: 200px">
                  <codeView :configs="codeConfig('java')" :value="db.code_mingling_03"></codeView>
                </div>
                <p>调用者/请求者角色 <i class="txt-en">Invoker</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_mingling_04"></codeView>
                </div>
                <p>订单类</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_mingling_05"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_mingling_06"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>美女服务员：大厨，新订单来了。。。。</p>
                  <p>开始1桌的订单</p>
                  <p>大厨：做了1份西红柿鸡蛋面</p>
                  <p>大厨：做了2份小杯可乐</p>
                  <p>1桌的饭准备完毕！！！</p>
                  <p>开始2桌的订单</p>
                  <p>大厨：做了1份尖椒肉丝盖饭</p>
                  <p>大厨：做了1份小杯雪碧</p>
                  <p>2桌的饭准备完毕！！！</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0817">17. 解释器模式</h3>
          <div class="part-contents">
            <div id="section-081701">
              <h4>17.1 概念</h4>
              <div class="sub-contents">
                <p>
                  给定一个语言，定义它的文法表示，并定义一个解释器，这个解释器使用该标识来解释语言中的句子
                </p>
              </div>
            </div>
            <div id="section-081702">
              <h4>17.2 类图</h4>
              <div class="sub-contents">
                <img class="img-191" style="width: 600px" src="/docs/study/imgs/191-moshi.png" />
                <img class="img-90 img-abs" style="width: 550px" src="/docs/study/imgs/90-sheji.png" />
              </div>
            </div>
            <div id="section-081703">
              <h4>17.3 实现</h4>
              <div class="sub-contents">
                <p>抽象表达式角色 <i class="txt-en">AbstractExpression</i></p>
                <div class="box-code" style="width: 700px; height: 150px">
                  <codeView :configs="codeConfig('java')" :value="db.code_jieshi_01"></codeView>
                </div>
                <p>终结符表达式角色 <i class="txt-en">TerminalExpression</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_jieshi_04"></codeView>
                </div>
                <p>
                  非终结符表达式角色 <i class="txt-en">NonterminalExpression</i>
                </p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_jieshi_02"></codeView>
                </div>
                <p>
                  环境角色 <i class="txt-en">Context</i>：用于存储变量和对应的值
                </p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_jieshi_03"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_jieshi_05"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>(a - ((b - c) + d)) = -2</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0818">18. 迭代器模式</h3>
          <div class="part-contents">
            <div id="section-081801">
              <h4>18.1 概念</h4>
              <div class="sub-contents">
                <p>
                  提供一种方法顺序访问一个聚合对象的各个元素，且不需要暴露该对象的内部表示
                </p>
              </div>
            </div>
            <div id="section-081802">
              <h4>18.2 类图</h4>
              <div class="sub-contents">
                <img class="img-192" style="width: 600px" src="/docs/study/imgs/192-moshi.png" />
                <img class="img-91 img-abs" style="width: 450px" src="/docs/study/imgs/91-sheji.png" />
              </div>
            </div>
            <div id="section-081803">
              <h4>18.3 实现</h4>
              <div class="sub-contents">
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_dei_05"></codeView>
                </div>
                <p>抽象聚合角色 <i class="txt-en">Aggregate</i></p>
                <div class="box-code" style="width: 700px; height: 200px">
                  <codeView :configs="codeConfig('java')" :value="db.code_dei_01"></codeView>
                </div>
                <p>具体聚合角色 <i class="txt-en">ConcreteAggregate</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_dei_02"></codeView>
                </div>
                <p>抽象迭代器角色 <i class="txt-en">Iterator</i></p>
                <div class="box-code" style="width: 700px; height: 200px">
                  <codeView :configs="codeConfig('java')" :value="db.code_dei_03"></codeView>
                </div>
                <p>具体迭代器角色 <i class="txt-en">ConcreteIterator</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_dei_04"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_dei_06"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>Student{name='张三', number='001'}</p>
                  <p>Student{name='李四', number='002'}</p>
                  <p>Student{name='王五', number='003'}</p>
                  <p>Student{name='赵六', number='004'}</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0819">19. 中介者模式</h3>
          <div class="part-contents">
            <div id="section-081901">
              <h4>19.1 概念</h4>
              <div class="sub-contents">
                <p>
                  调停模式。用一个中介对象来封装一系列的对象交互。使各对象不需要显式地相互引用，耦合松散，且可独立改变之间的交互
                </p>
              </div>
            </div>
          </div>
          <div id="section-081902">
            <h4>19.2 类图</h4>
            <div class="sub-contents">
              <img class="img-193" style="width: 600px" src="/docs/study/imgs/193-moshi.png" />
              <img class="img-92 img-abs" style="width: 450px" src="/docs/study/imgs/92-sheji.png" />
            </div>
          </div>
          <div id="section-081903">
            <h4>19.3 实现</h4>
            <div class="sub-contents">
              <p>抽象中介者角色 <i class="txt-en">Mediator</i></p>
              <div class="box-code" style="width: 700px; height: 150px">
                <codeView :configs="codeConfig('java')" :value="db.code_zhong_01"></codeView>
              </div>
              <p>具体中介者角色 <i class="txt-en">ConcreteMediator</i></p>
              <div class="box-code" style="width: 700px; height: 300px">
                <codeView :configs="codeConfig('java')" :value="db.code_zhong_02"></codeView>
              </div>
              <p>抽象同事类角色 <i class="txt-en">Colleague</i></p>
              <div class="box-code" style="width: 700px; height: 200px">
                <codeView :configs="codeConfig('java')" :value="db.code_zhong_03"></codeView>
              </div>
              <p>具体同事类角色 <i class="txt-en">ConcreteColleague</i></p>
              <div class="box-code" style="width: 700px; height: 300px">
                <codeView :configs="codeConfig('java')" :value="db.code_zhong_04"></codeView>
              </div>
              <p>调用</p>
              <div class="box-code" style="width: 700px; height: 300px">
                <codeView :configs="codeConfig('java')" :value="db.code_zhong_05"></codeView>
              </div>
              <p>结果</p>
              <div class="list-result">
                <p>房主张三获取到的信息：我要租三室的房子！！！</p>
                <p>租者李四获取到的信息：我这里有三室的房子，你要租吗？</p>
              </div>
            </div>
          </div>
          <h3 id="part-0820">20. 备忘录模式</h3>
          <div class="part-contents">
            <div id="section-082001">
              <h4>20.1 概念</h4>
              <div class="sub-contents">
                <p>
                  快照模式。在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，以便以后当需要时能将该对象恢复到原先保存的状态。游戏存档，悔棋，数据备份
                </p>
              </div>
            </div>
          </div>
          <div id="section-082002">
            <h4>20.2 类图</h4>
            <div class="sub-contents">
              <img class="img-194" style="width: 600px" src="/docs/study/imgs/194-moshi.png" />
              <img class="img-93 img-abs" style="width: 450px" src="/docs/study/imgs/93-sheji.png" />
            </div>
          </div>
          <div id="section-082003">
            <h4>20.3 实现</h4>
            <div class="sub-contents">
              <p>
                发起人角色
                <i class="txt-en">Originator</i>：记录当前时刻的内部状态信息，提供创建备忘录和恢复备忘录数据的功能，实现其他业务功能，它可以访问备忘录里的所有信息
              </p>
              <div class="box-code" style="width: 700px; height: 300px">
                <codeView :configs="codeConfig('java')" :value="db.code_bei_01"></codeView>
              </div>
              <p>
                备忘录角色
                <i class="txt-en">Memento</i>：负责存储发起人的内部状态，在需要的时候提供这些内部状态给发起人
              </p>
              <div class="box-code" style="width: 700px; height: 300px">
                <codeView :configs="codeConfig('java')" :value="db.code_bei_02"></codeView>
              </div>
              <p>
                管理者角色
                <i class="txt-en">Caretaker</i>：对备忘录进行管理，提供保存与获取备忘录的功能，但其不能对备忘录的内容进行访问与修改
              </p>
              <div class="box-code" style="width: 700px; height: 300px">
                <codeView :configs="codeConfig('java')" :value="db.code_bei_03"></codeView>
              </div>
              <p>调用</p>
              <div class="box-code" style="width: 700px; height: 300px">
                <codeView :configs="codeConfig('java')" :value="db.code_bei_04"></codeView>
              </div>
              <p>结果</p>
              <div class="list-result">
                <p>---------------大战boss前-----------------</p>
                <p>角色生命力：100</p>
                <p>角色攻击力：100</p>
                <p>角色防御力：100</p>
                <p>---------------大战boss后-----------------</p>
                <p>角色生命力：0</p>
                <p>角色攻击力：0</p>
                <p>角色防御力：0</p>
                <p>---------------恢复之前的状态-----------------</p>
                <p>角色生命力：100</p>
                <p>角色攻击力：100</p>
                <p>角色防御力：100</p>
              </div>
            </div>
          </div>
          <h3 id="part-0821">21. 观察者模式</h3>
          <div class="part-contents">
            <div id="section-082101">
              <h4>21.1 概念</h4>
              <div class="sub-contents">
                <p>
                  发布-订阅模式。定义一对多的依赖关系，让多个观察者对象同时监听某一个主题对象，其在状态变化时会通知所有的观察者对象。
                </p>
              </div>
            </div>
          </div>
          <div id="section-082102">
            <h4>21.2 类图</h4>
            <div class="sub-contents">
              <img class="img-195" style="width: 600px" src="/docs/study/imgs/195-moshi.png" />
              <img class="img-94 img-abs" style="width: 450px" src="/docs/study/imgs/94-sheji.png" />
            </div>
          </div>
          <div id="section-082103">
            <h4>21.3 实现</h4>
            <div class="sub-contents">
              <p>抽象主题 <i class="txt-en">Subject</i></p>
              <div class="box-code" style="width: 700px; height: 300px">
                <codeView :configs="codeConfig('java')" :value="db.code_guan_01"></codeView>
              </div>
              <p>具体主题 <i class="txt-en">ConcreteSubject</i></p>
              <div class="box-code" style="width: 700px; height: 300px">
                <codeView :configs="codeConfig('java')" :value="db.code_guan_02"></codeView>
              </div>
              <p>抽象观察者 <i class="txt-en">Observer</i></p>
              <div class="box-code" style="width: 700px; height: 100px">
                <codeView :configs="codeConfig('java')" :value="db.code_guan_03"></codeView>
              </div>
              <p>具体观察者 <i class="txt-en">ConcreteObserver</i></p>
              <div class="box-code" style="width: 700px; height: 300px">
                <codeView :configs="codeConfig('java')" :value="db.code_guan_04"></codeView>
              </div>
              <p>调用</p>
              <div class="box-code" style="width: 700px; height: 300px">
                <codeView :configs="codeConfig('java')" :value="db.code_guan_05"></codeView>
              </div>
              <p>结果</p>
              <div class="list-result">
                <p>通知 孙悟空 Java博客更新了</p>
                <p>通知 猪悟能 Java博客更新了</p>
                <p>通知 沙悟净 Java博客更新了</p>
              </div>
            </div>
          </div>
          <h3 id="part-0822">22. 状态模式</h3>
          <div class="part-contents">
            <div id="section-082201">
              <h4>22.1 概念</h4>
              <div class="sub-contents">
                <p>
                  对有状态的对象，把复杂的“判断逻辑”提取到不同的状态对象中，允许状态对象在其内部状态发生改变时改变其行为
                </p>
              </div>
            </div>
            <div id="section-082202">
              <h4>22.2 类图</h4>
              <div class="sub-contents">
                <img class="img-196" style="width: 600px" src="/docs/study/imgs/196-moshi.png" />
                <img class="img-95 img-abs" style="width: 650px" src="/docs/study/imgs/95-sheji.png" />
              </div>
            </div>
            <div id="section-082203">
              <h4>22.3 实现</h4>
              <div class="sub-contents">
                <p>抽象状态角色 <i class="txt-en">State</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zhuangtai_01"></codeView>
                </div>
                <p>具体状态角色 <i class="txt-en">ConcreteState</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zhuangtai_02"></codeView>
                </div>
                <p>环境角色 <i class="txt-en">Context</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zhuangtai_03"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_zhuangtai_04"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>电梯初始状态为：门关闭</p>
                  <p>电梯门已开启</p>
                  <p>***电梯门已开启，无法运行</p>
                  <p>电梯门已关闭</p>
                  <p>电梯正在运行</p>
                  <p>***电梯正在运行，无法开门</p>
                  <p>电梯已停止</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0823">23. 策略模式</h3>
          <div class="part-contents">
            <div id="section-082301">
              <h4>23.1 概念</h4>
              <div class="sub-contents">
                <p>
                  定义了一系列算法，并将每个算法封装起来，使它们可以相互替换，且算法的变化不会影响使用算法的客户。选择交通/开发工具
                </p>
              </div>
            </div>
            <div id="section-082302">
              <h4>23.2 类图</h4>
              <div class="sub-contents">
                <img class="img-197" style="width: 600px" src="/docs/study/imgs/197-moshi.png" />
                <img class="img-96 img-abs" style="width: 450px" src="/docs/study/imgs/96-sheji.png" />
              </div>
            </div>
            <div id="section-082303">
              <h4>23.3 实现</h4>
              <div class="sub-contents">
                <p>抽象策略类角色 <i class="txt-en">Strategy</i></p>
                <div class="box-code" style="width: 700px; height: 100px">
                  <codeView :configs="codeConfig('java')" :value="db.code_ce_01"></codeView>
                </div>
                <p>具体策略类角色 <i class="txt-en">ConcreteCommand</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_ce_02"></codeView>
                </div>
                <p>环境类角色 <i class="txt-en">Context</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_ce_03"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_ce_04"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>=======春节=======</p>
                  <p>买一送一</p>
                  <p>=======中秋节=======</p>
                  <p>满200元减50元</p>
                  <p>=======圣诞节=======</p>
                  <p>满1000元加一元换购任意200元以下商品</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0824">24. 模板方法模式</h3>
          <div class="part-contents">
            <div id="section-082401">
              <h4>24.1 概念</h4>
              <div class="sub-contents">
                <p>
                  定义一个操作中的算法骨架，而将算法的一些步骤延迟到子类中，使得子类可以不改变该算法结构的情况下重定义该算法的某些特定步骤。倒油、热油、倒蔬菜、倒调料品、翻炒固定步骤的炒菜过程
                </p>
              </div>
            </div>
            <div id="section-082402">
              <h4>24.2 类图</h4>
              <div class="sub-contents">
                <img class="img-198" style="width: 600px" src="/docs/study/imgs/198-moshi.png" />
                <img class="img-97 img-abs" style="width: 450px" src="/docs/study/imgs/97-sheji.png" />
              </div>
            </div>
            <div id="section-082403">
              <h4>24.3 实现</h4>
              <div class="sub-contents">
                <p>抽象类角色 <i class="txt-en">AbstractClass</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_moban_01"></codeView>
                </div>
                <p>具体子类角色 <i class="txt-en">ConcreteClass</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_moban_02"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_moban_03"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>=======炒手撕包菜=======</p>
                  <p>倒油</p>
                  <p>热油</p>
                  <p>下锅的蔬菜是包菜</p>
                  <p>下锅的酱料是辣椒</p>
                  <p>炒啊炒啊炒到熟啊</p>
                  <p>=======炒蒜蓉菜心=======</p>
                  <p>倒油</p>
                  <p>热油</p>
                  <p>下锅的蔬菜是菜心</p>
                  <p>下锅的酱料是蒜蓉</p>
                  <p>炒啊炒啊炒到熟啊</p>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-0825">25. 访问者模式</h3>
          <div class="part-contents">
            <div id="section-082501">
              <h4>25.1 概念</h4>
              <div class="sub-contents">
                <p>
                  封装一些作用于某种数据结构中的各元素的操作，它可以在不改变这个数据结构的前提下定义作用于这些元素的新的操作
                </p>
              </div>
            </div>
            <div id="section-082502">
              <h4>25.2 类图</h4>
              <div class="sub-contents">
                <img class="img-199" style="width: 600px" src="/docs/study/imgs/199-moshi.png" />
                <img class="img-98 img-abs" style="width: 550px" src="/docs/study/imgs/98-sheji.png" />
              </div>
            </div>
            <div id="section-082503">
              <h4>25.3 实现</h4>
              <div class="sub-contents">
                <p>抽象访问者角色 <i class="txt-en">Visitor</i></p>
                <div class="box-code" style="width: 700px; height: 200px">
                  <codeView :configs="codeConfig('java')" :value="db.code_fang_01"></codeView>
                </div>
                <p>具体访问者角色 <i class="txt-en">ConcreteVisitor</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_fang_02"></codeView>
                </div>
                <p>抽象元素角色 <i class="txt-en">Element</i></p>
                <div class="box-code" style="width: 700px; height: 150px">
                  <codeView :configs="codeConfig('java')" :value="db.code_fang_03"></codeView>
                </div>
                <p>具体元素角色 <i class="txt-en">ConcreteElement</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_fang_04"></codeView>
                </div>
                <p>对象结构角色 <i class="txt-en">ObjectStructure</i></p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_fang_05"></codeView>
                </div>
                <p>调用</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('java')" :value="db.code_fang_06"></codeView>
                </div>
                <p>结果</p>
                <div class="list-result">
                  <p>=== 主人喂食宠物 ===</p>
                  <p>主人喂食狗</p>
                  <p>好好吃，汪汪汪。。。</p>
                  <p>主人喂食猫</p>
                  <p>好好吃，喵喵喵。。。</p>
                  <p>=== 其他人喂食宠物 ===</p>
                  <p>其他人喂食狗</p>
                  <p>好好吃，汪汪汪。。。</p>
                  <p>其他人喂食猫</p>
                  <p>好好吃，喵喵喵。。。</p>
                </div>
              </div>
            </div>
          </div>
          <h2 id="chapter-09">
            九、操作系统 <i class="txt-en">Operating System</i>
          </h2>
          <h3 id="part-0901">1. 概述</h3>
          <div class="part-contents">
            <div id="section-090101">
              <h4>1.1 概述</h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">地位</span>应用软件、系统软件、操作系统、计算机硬件
                </p>
                <img src="/docs/study/imgs/99-op.png" style="width: 400px" />
                <p>
                  <span class="txt-define">功能</span>管理系统的硬件、软件、数据资源，控制程序运行，人机之间的接口，应用软件与硬件之间的接口
                </p>
                <p>
                  <span class="txt-define">特征</span>并发性、共享性、虚拟性、不确定性
                </p>
                <p>
                  <span class="txt-define">分类</span>批处理、分时、实时、网络、分布式、微机、嵌入式
                </p>
                <p>UNIX是多用户多任务的分时操作系统</p>
                <p>功能: 进程管理、文件管理、存储管理、设备管理、作业管理</p>
              </div>
            </div>
          </div>
          <h3 id="part-0902">2. 进程管理</h3>
          <div class="part-contents">
            <div id="section-090201">
              <h4>2.1 概念</h4>
              <div class="sub-contents">
                <p>
                  线程 <i class="txt-en">Thread</i>：CPU可独立调度和分配的最小单位
                </p>
                <p>
                  包含在进程中，可与同属一个进程的其他线程共享进程所拥有的全部资源，线程与线程之间是不可见的
                </p>
                <p>
                  共享内存地址空间、代码、数据、文件，不共享程序计数器、寄存器、<b>栈</b>
                </p>
                <p>
                  进程
                  <i class="txt-en">Process</i>：资源分配的最小单位，系统执行的独立单元，由程序、数据、程序控制块(PCB)
                  <i class="txt-en">Process Control Block</i> 组成
                </p>
                <p>
                  三态模型：就绪 <i class="txt-en">Ready</i>、运行
                  <i class="txt-en">Running</i>、阻塞
                  <i class="txt-en">Waiting/Blocked</i>
                </p>
                <img class="img-14" style="width: 250px" src="/docs/study/imgs/14-santai.png" />
                <p>
                  五态模型：创建 <i class="txt-en">New</i>、终止
                  <i class="txt-en">Terminated</i>
                </p>
                <img class="img-118" style="width: 300px" src="/docs/study/imgs/118-wutai.png" />
                <p>高级通信方式：共享存储模式、消息传递模式、管道通信</p>
                <p>管程 <i class="txt-en">Monitor</i></p>
              </div>
            </div>
            <div id="section-090202">
              <h4>2.2 前驱图 <i class="txt-en">Precedence Graph</i></h4>
              <div class="sub-contents">
                <p>有向无循环图</p>
                <p>表示和描述进程之间的先后顺序和执行的依赖关系</p>
                <p>顺序执行：顺序性/封闭性/可再现性</p>
                <p>并发执行：无封闭性，相互制约</p>
                <img class="img-117" style="width: 300px" src="/docs/study/imgs/117-bingfa.png" />
              </div>
            </div>
            <div id="section-090203">
              <h4>2.3 进程通信</h4>
              <div class="sub-contents">
                <p>同步：合作进程间的直接制约，表示两个任务可以同时执行</p>
                <p>互斥：申请临界资源间的间接制约，一个资源在同一时间内只能由一个任务单独使用，需要加锁</p>
              </div>
            </div>
            <div id="section-090204">
              <h4>2.4 信号量PV操作与前驱图</h4>
              <div class="sub-contents">
                <p>临界资源 <i class="txt-en">Critical Resource</i>：各进程间需要以互斥方式对其进行访问的资源</p>
                <p>
                  临界区
                  <i class="txt-en">Critical Section</i>：共享资源访问代码区段
                </p>
                <p>有空即进、无空则等、有限访问、让权等待</p>
                <p>整型信号量：公用信号量-互斥1/私用信号量-同步</p>
                <p>
                  <b>信号量S</b>
                  <i class="txt-en">Semaphore</i>：正数为可用资源数，负数的绝对值为等待资源数
                </p>
                <p>互斥信号量，对临界资源采用互斥访问，初值为1</p>
                <p>同步信号量，对共享资源的访问控制，初值为共享资源个数</p>
                <p>信号量S的编号，由(12,13,23,34)排序决定</p>
                <p>先做的进程 V(S)，后做的进程 P(S)</p>
                <img class="img-17" style="width: 250px" src="/docs/study/imgs/17-pv.png" />
                <p>执行前等待资源<b>P(S)减</b>，S≤0则等待</p>
                <p>执行后释放资源<b>V(S)加</b>，S≤0则唤醒</p>
                <img class="img-16" style="width: 250px" src="/docs/study/imgs/16-pv.png" />
                <p>
                  实现互斥：在临界区中执行PV，确保同一时间内仅有一个进程在临界区中
                </p>
                <p>实现同步：<b>生产者消费者问题</b></p>
              </div>
            </div>
            <div id="section-090205">
              <h4>
                2.5 生产者消费者模式
                <i class="txt-en">Producer-Consumer Pattern</i>
              </h4>
              <div class="sub-contents">
                <p>
                  通过<b>共享缓冲区</b>
                  <i class="txt-en">Bounded Buffer</i>
                  实现生产线程与消费线程的解耦
                </p>
                <p>容量为1的缓冲区</p>
                <img class="img-18" style="width: 300px" src="/docs/study/imgs/18-pv.png" />
                <p>容量为n的缓冲区</p>
                <p>
                  缓冲区+互斥信号量(S<b>临界数1</b>)+同步信号量(S1<b>空位数n</b>+S2<b>产品数0</b>)
                </p>
                <p>生产者：P(S1)等待空位>P(S)请求进入临界区>V(S)离开临界区>V(S2)增加产品数</p>
                <p>消费者：P(S2)减少产品数或等待产品>P(S)>V(S)>V(S1)</p>
              </div>
            </div>
            <div id="section-090206">
              <h4>2.6 死锁</h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">必要条件</span>互斥、请求保持和等待、不可剥夺、环路等待
                </p>
                <p>
                  同类资源分配不当引起死锁：n个进程，每个所需k个资源，至少需要资源数
                  <span class="txt-func">m≥n*(k-1)+1</span>
                </p>
                <p>系统采用轮流分配资源，资源数m小于进程所需资源总数n*k</p>
                <p>
                  死锁处理：鸵鸟策略、死锁预防、死锁避免-<b>银行家算法</b>、死锁检测(允许死锁产生，检测产生再解除)、死锁解除(重新启动系统，资源剥夺，撤销进程)
                </p>
                <p>按顺序调用进程：P4->P2</p>
                <p>总资源数：R1-8/R2-7/R3-4，计算 总可用资源数：R1-1/R2-1/R3-0</p>
                <table>
                  <thead>
                    <tr>
                      <th rowspan="2"></th>
                      <th colspan="3">最大需求资源数</th>
                      <th colspan="3">已分配资源数</th>
                      <th colspan="3">仍需要资源数</th>
                    </tr>
                    <tr>
                      <th>R1</th>
                      <th>R2</th>
                      <th>R3</th>
                      <th>R1</th>
                      <th>R2</th>
                      <th>R3</th>
                      <th>R1</th>
                      <th>R2</th>
                      <th>R3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>P1</td>
                      <td>6</td>
                      <td>4</td>
                      <td>2</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>5</td>
                      <td>3</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>P2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>2</td>
                      <td>1</td>
                      <td>1</td>
                      <td>0</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>P3</td>
                      <td>8</td>
                      <td>1</td>
                      <td>1</td>
                      <td>2</td>
                      <td>1</td>
                      <td>0</td>
                      <td>6</td>
                      <td>0</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>P4</td>
                      <td>2</td>
                      <td>2</td>
                      <td>1</td>
                      <td>1</td>
                      <td>2</td>
                      <td>1</td>
                      <td>1</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>P5</td>
                      <td>3</td>
                      <td>4</td>
                      <td>2</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-090207">
              <h4>2.7 进程资源图</h4>
              <div class="sub-contents">
                <p>描述进程所需资源和资源分配情况</p>
                <p>
                  P进程，R资源：R->P 代表资源R已分配给进程P的资源数，P->R
                  代表进程P还需要请求资源R的资源数
                </p>
                <img class="img-15" style="width: 320px" src="/docs/study/imgs/15-ziyuan.png" />
                <p>阻塞节点：该节点所请求的资源已分配完</p>
                <p>非阻塞节点：可化简</p>
                <p>死锁状态：所有进程都是阻塞节点</p>
              </div>
            </div>
          </div>
          <h3 id="part-0903">3. 存储管理</h3>
          <div class="part-contents">
            <p><span class="txt-define">分类</span>分区管理、页式管理</p>
            <div id="section-090301">
              <h4>3.1 页式存储</h4>
              <div class="sub-contents">
                <p>地址结构：页号+页内地址(4K)</p>
                <p>页面变换表：</p>
                <table>
                  <tbody>
                    <tr>
                      <td>页号</td>
                      <td>物理块号(页帧号)</td>
                    </tr>
                    <tr>
                      <td>逻辑地址</td>
                      <td>物理地址</td>
                    </tr>
                  </tbody>
                </table>
                <p>十六进制 1C20H => 页号1+页内地址C20(12位) => 物理块号3+C20</p>
              </div>
            </div>
            <div id="section-090302">
              <h4>3.2 页面置换算法</h4>
              <div class="sub-contents">
                <p>
                  时间局限性：循环操作。如果程序中的某条指令一旦被执行，则不久的将来该指令可能再次被执行
                </p>
                <p>
                  空间局限性：顺序存储。指一旦程序访问了某个存储单元，则在不久的将来，其附近的存储单元也最有可能被访问
                </p>
                <p>最近最少使用算法：<b>局部性原理</b></p>
                <p>状态位/访问位/修改位</p>
                <p>只淘汰在内存中(1)，先淘汰未访问过的(0)，再淘汰未修改过的(0)</p>
                <table>
                  <thead>
                    <tr>
                      <th>页号</th>
                      <th>页帧号</th>
                      <th>状态位</th>
                      <th>访问位</th>
                      <th>修改位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0</td>
                      <td>6</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td></td>
                      <td>0</td>
                      <td>0</td>
                      <td>0</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>3</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>2</td>
                      <td>1</td>
                      <td>1</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-090303">
              <h4>3.3 段式存储</h4>
              <div class="sub-contents">
                <p>逻辑地址：段号+段内偏移量</p>
                <p>段表：段号+基地址+段长</p>
              </div>
            </div>
            <div id="section-090304">
              <h4>3.4 段页式存储</h4>
              <div class="sub-contents">
                <p>地址结构：段号s + 段内页号p + 页内地址w</p>
                <img class="img-20" style="width: 400px" src="/docs/study/imgs/20-cunchu.png" alt="" srcset="" />
                <p>
                  页的大小为4K(=<span class="txt-func">2<span class="txt-sup">2</span></span>*<span class="txt-func">2<span
                      class="txt-sup">10</span></span>)，每个段<b>最大允许</b>有
                  <span class="txt-func">2<span class="txt-sup">p</span></span>
                  页，最多有
                  <span class="txt-func">2<span class="txt-sup">s</span></span> 段
                </p>
                <p>段表+页表来实现地址映射</p>
              </div>
            </div>
          </div>
          <h3 id="part-0904">4. 设备管理</h3>
          <div class="part-contents">
            <div id="section-090401">
              <h4>4.1 设备分类</h4>
              <div class="sub-contents"></div>
            </div>
            <div id="section-090402">
              <h4>4.2 输入输出</h4>
              <div class="sub-contents">
                <img class="img-21" style="width: 450px" src="/docs/study/imgs/21-shebei.png" alt="" srcset="" />
              </div>
            </div>
            <div id="section-090403">
              <h4>4.3 缓冲技术</h4>
              <div class="sub-contents">
                <p>输入T>传送M>处理C</p>
                <p>单缓冲区：(T+M)*(n-1)+(T+M+C)</p>
                <img class="img-24" style="width: 450px" src="/docs/study/imgs/24-shebei.png" alt="" srcset="" />
                <p>双缓冲区：T*(n-1)+(T+M+C)</p>
                <img class="img-25" style="width: 450px" src="/docs/study/imgs/25-shebei.png" alt="" srcset="" />
              </div>
            </div>
            <div id="section-090404">
              <h4>4.4 磁盘结构</h4>
              <div class="sub-contents">
                <p>
                  磁盘有正反两个盘面，每个盘面有多个同心圆，每个同心圆是一个磁道，每个同心圆又被划分为多个扇区
                </p>
                <p>磁道：圆形的路径，沿着磁盘表面布置；由外到内，从0开始编号</p>
                <p>
                  扇区：每个磁道被划分为多个扇区，扇区是存储数据的最小单位；一般扇区大小为512字节
                </p>
                <img class="img-113" style="width: 300px" src="/docs/study/imgs/113-cipan.png" />
                <p>磁盘容量: 内圈周长*最大位密度*每面磁道数*面数/8</p>
                <p>每面磁道数: (外直径-内直径)*磁道密度/2</p>
                <p>
                  先寻找对应磁道，再等待周期旋转至指定扇区，产生寻道时间和等待时间
                </p>
              </div>
            </div>
            <div id="section-090405">
              <h4>4.5 磁盘调度算法</h4>
              <div class="sub-contents">
                <table>
                  <thead>
                    <tr>
                      <th>算法</th>
                      <th>描述</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>先来先服务 (FCFS)</td>
                      <td>按先后次序访问</td>
                    </tr>
                    <tr>
                      <td>最短寻道时间优先 (SSTF)</td>
                      <td>先访问最近的</td>
                    </tr>
                    <tr>
                      <td>扫描算法 (SCAN) / 电梯调度</td>
                      <td>先访问同一方向的</td>
                    </tr>
                    <tr>
                      <td>单向扫描调度算法 (C-SCAN)</td>
                      <td>转向时访问极值</td>
                    </tr>
                  </tbody>
                </table>
                <p>三级调度</p>
                <p>高：决定处于输入池中的哪个后备作业可以调入主系统做好运行的准备，成为一个或一组就绪进程</p>
                <p>中：决定处于交换区中的就绪进程哪个可以调入内存，以便直接参与对CPU的竞争</p>
                <p>低：决定处于内存中的就绪进程哪个可以占用CPU，最活跃最重要，对系统影响很大</p>
              </div>
            </div>
            <div id="section-090406">
              <h4>4.6 旋转调度算法</h4>
              <div class="sub-contents">
                <p>
                  每个磁道分为10个物理块，磁盘的旋转速度为20ms/圈，每个记录的处理时间4ms
                </p>
                <p>
                  旋转一个扇区所需时间为 20ms/10=2ms，也是读取一个数据块的时间
                </p>
                <p>
                  前9个物理块的时间为
                  读取时间+旋转一圈到原位置准备读取下一个物理块的时间为
                  (2ms+10*2ms)*9=198ms
                </p>
                <p>最后一个物理块的时间为 读取时间+处理时间=2ms+4ms=6ms</p>
                <p>所以总时间为 198ms+6ms=204ms</p>
                <img class="img-22" style="width: 400px" src="/docs/study/imgs/22-shebei.png" />
                <p>修改顺序来优化 =(2ms+4ms)*10=60ms</p>
                <img class="img-23" style="width: 200px" src="/docs/study/imgs/23-shebei.png" />
                <p>磁道距离*移动速度+延迟+传输</p>
              </div>
            </div>
          </div>
          <h3 id="part-0905">5. 文件管理</h3>
          <div class="part-contents">
            <div id="section-090501">
              <h4>5.1 索引文件</h4>
              <div class="sub-contents">
                <p>
                  索引表<地址项><span class="txt-symbol">⇔</span>磁盘<磁盘数据块>
                </p>
                <table>
                  <tbody>
                    <tr>
                      <td>直接地址索引</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>一级间接地址索引</td>
                      <td>索引地址项指向磁盘索引块</td>
                    </tr>
                    <tr>
                      <td>二级间接地址索引</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <p>(磁盘索引块大小1KB / 地址项大小4B) * 磁盘数据块大小1KB</p>
              </div>
            </div>
            <div id="section-090502">
              <h4>5.2 文件目录</h4>
              <div class="sub-contents">
                <p>文件控制块：基本信息类、存取控制信息类、使用信息类</p>
                <p>文件属性：R只读文件、A存档属性、S系统文件、H隐藏文件</p>
                <p>文件目录：文件控制块的有序集合</p>
                <p>目录文件对系统的影响较大</p>
                <p>目录结构：一级/二级/多级目录结构</p>
                <p>文件名：驱动器号、路径、主文件名、扩展名</p>
                <p>树型文件结构：全文件名/绝对路径/相对路径</p>
                <p>绝对路径：从盘符开始</p>
                <p>相对路径：从当前路径开始</p>
              </div>
            </div>
            <div id="section-090503">
              <h4>5.3 空间存储</h4>
              <div class="sub-contents">
                <p>管理方式: 空闲区表、位示图、空闲块链、成组链接法</p>
                <p>
                  位示图
                  <i class="txt-cn">bitmap</i>：用 一位 代表 一个物理块，1则使用，0则空闲
                </p>
                <p>逻辑编号 0/1字 代表物理块 0~31位 32*(n+1)-1</p>
                <p>求所需位示图的字大小</p>
                <img class="img-220" style="width: 400px" src="/docs/study/imgs/220-weishi.png" />
              </div>
            </div>
          </div>
          <h3 id="part-0906">6. 作业管理</h3>
          <div class="part-contents">
            <div id="section-090601">
              <h4>6.1 概念</h4>
              <div class="sub-contents">
                <p>系统为完成一个用户的计算任务(或事务处理)所做的工作总和</p>
                <p>状态：提交、后备、执行、完成</p>
              </div>
            </div>
            <div id="section-090602">
              <h4>6.2 作业调度算法</h4>
              <div class="sub-contents"></div>
            </div>
            <div id="section-090603">
              <h4>6.3 用户界面</h4>
              <div class="sub-contents"></div>
            </div>
          </div>
          <h2 id="chapter-10">十、结构化开发</h2>
          <h3 id="part-1001">1. 系统设计</h3>
          <div class="part-contents">
            <div id="section-100101">
              <h4>1.1 概述</h4>
              <div class="sub-contents">
                <p>
                  抽象、模块化、自顶向下、逐步求精、信息隐蔽、模块独立(低耦合/高内聚)
                </p>
              </div>
            </div>
            <div id="section-100102">
              <h4>1.2 任务</h4>
              <div class="sub-contents">
                <p>体系结构设计、数据设计、接口设计、过程设计</p>
              </div>
            </div>
          </div>
          <h3 id="part-1002">2. 模块设计</h3>
          <div class="part-contents">
            <div id="section-100201">
              <h4>2.1 内聚性</h4>
              <div class="sub-contents">
                <p>内聚由低到高，模块独立性由低到高</p>
                <table>
                  <tbody>
                    <tr>
                      <td>偶然内聚</td>
                      <td>模块内无联系</td>
                    </tr>
                    <tr>
                      <td>逻辑内聚</td>
                      <td>执行若干<b>逻辑相似</b>功能，通过参数确定具体功能</td>
                    </tr>
                    <tr>
                      <td>时间内聚</td>
                      <td>将<b>同时执行</b>的动作组合</td>
                    </tr>
                    <tr>
                      <td>过程内聚</td>
                      <td>完成<b>多个按指定过程</b>执行的组合</td>
                    </tr>
                    <tr>
                      <td>通信内聚</td>
                      <td>
                        处理元素在用一个<b>数据结构</b>上操作，或使用相同输入/产生相同输出数据
                      </td>
                    </tr>
                    <tr>
                      <td>顺序内聚</td>
                      <td>
                        处理元素紧密相关且<b>顺序执行</b>，前一功能输出是下一功能输入
                      </td>
                    </tr>
                    <tr>
                      <td>功能内聚</td>
                      <td>最强内聚，所有元素<b>共同完成</b>一个功能，缺一不可</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-100202">
              <h4>2.2 耦合性</h4>
              <div class="sub-contents">
                <p>耦合由低到高，模块独立性由高到低</p>
                <table>
                  <tbody>
                    <tr>
                      <td>无直接耦合</td>
                      <td>模块间无直接关系</td>
                    </tr>
                    <tr>
                      <td>数据耦合</td>
                      <td>有调用关系，传递<b>简单数据</b></td>
                    </tr>
                    <tr>
                      <td>标记耦合</td>
                      <td>传递<b>数据结构</b></td>
                    </tr>
                    <tr>
                      <td>控制耦合</td>
                      <td>传递<b>控制变量</b></td>
                    </tr>
                    <tr>
                      <td>外部耦合</td>
                      <td>通过软件之<b>外的环境</b>联结</td>
                    </tr>
                    <tr>
                      <td>公共耦合</td>
                      <td>通过<b>公共数据环境</b>相互作用</td>
                    </tr>
                    <tr>
                      <td>内容耦合</td>
                      <td>直接使用另一模块<b>内部数据</b>或转入内部</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <h3 id="part-1003">3. 界面设计</h3>
          <div class="part-contents">
            <div id="section-100301">
              <h4>3.1 原则</h4>
              <div class="sub-contents">
                <p>置界面与用户控制之下</p>
                <p>减少用户的记忆负担</p>
                <p>保持界面的一致性</p>
              </div>
            </div>
          </div>
          <h3 id="part-1004">4. 总结</h3>
          <div class="part-contents">
            <div id="section-100401">
              <h4>4.1 系统结构设计原则</h4>
              <div class="sub-contents">
                <p>分解-协调原则</p>
                <p>自顶向下原则：先确定上层模块，逐层确定下层模块</p>
                <p>信息隐蔽、抽象原则：只规定做什么，不规定怎么做</p>
                <p>一致性原则：保证设计过程规范、标准和文件模式统一</p>
                <p>明确性原则：功能明确，接口明确</p>
                <p>高内聚、低耦合原则</p>
                <p>扇入扇出系数合理原则：适当为3或4，不超7</p>
                <p>规模适当原则：避免过大过小</p>
                <p>作用范围原则：模块作用范围应在其控制范围内</p>
              </div>
            </div>
            <div id="section-100402">
              <h4>4.2 系统文档</h4>
              <div class="sub-contents">
                <table>
                  <thead>
                    <tr>
                      <th>人员</th>
                      <th>阶段</th>
                      <th>文档</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>系统分析与用户</td>
                      <td>系统规划和系统分析</td>
                      <td>
                        可行性研究报告、总体规划报告、系统开发合同、系统方案说明书
                      </td>
                    </tr>
                    <tr>
                      <td>系统开发与项目管理</td>
                      <td>项目期</td>
                      <td>系统开发计划、系统开发月报、系统开发总结报告</td>
                    </tr>
                    <tr>
                      <td>系统开发与系统测试</td>
                      <td></td>
                      <td>
                        系统方案说明书、系统开发合同、系统设计说明书、测试计划
                      </td>
                    </tr>
                    <tr>
                      <td>系统开发与用户</td>
                      <td>系统运行</td>
                      <td>用户手册、操作指南</td>
                    </tr>
                    <tr>
                      <td>系统开发与系统维护</td>
                      <td></td>
                      <td>系统设计说明书、系统开发总结报告</td>
                    </tr>
                    <tr>
                      <td>系统维护与用户</td>
                      <td>运行维护</td>
                      <td>系统运行报告、维护修改建议</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-100403">
              <h4>4.3 数据字典 DD</h4>
              <div class="sub-contents">
                <p>条目：数据流、数据项、数据存储、基本加工</p>
                <p>
                  加工逻辑(小说明)：结构化语言(顺序/选择/重复)、判定表、判定树
                </p>
                <img class="img-29" style="width: 600px" src="/docs/study/imgs/29-dd.png" />
              </div>
            </div>
            <div id="section-100404">
              <h4>4.4 数据流图 DFD <i class="txt-en">Data Flow Diagram</i></h4>
              <div class="sub-contents">
                <p>
                  基本图形元素：数据流 <i class="txt-en">Data Flow</i>、加工
                  <i class="txt-en">Process</i>、数据存储
                  <i class="txt-en">Data Store</i>、外部实体
                  <i class="txt-en">External Agent</i>
                </p>
                <img class="img-30" style="width: 600px" src="/docs/study/imgs/30-dfd.png" alt="" srcset="" />
                <p>
                  数据流：加工➔加工、加工➔数据存储(写)、数据存储➔加工(读)、外部实体➔加工(输入)、加工➔外部实体(输出)
                </p>
                <p>数据流的起点或终点必须有一个是加工</p>
                <p>加工：数据流的转换和处理，必须有输入和输出</p>
                <p>
                  有输出无输入为奇迹，有输入无输出为黑洞，输入不足以产生输出为灰洞
                </p>
                <p>
                  数据存储：存储数据和提供数据，存储加工的输出数据和提供加工的输入数据
                </p>
                <p>外部实体：当前系统之外的人员组织，数据发源地和归宿地</p>
                <p>父图子图平衡：输入输出要保持一致</p>
                <p>
                  顶层数据流图(父图)是整个系统的高度抽象，描述系统的输入输出、外部实体以及之间的数据流
                </p>
                <p>底层数据流图(子图)对父图的逐步细化</p>
                <p>数据守恒：数据总量相同</p>
              </div>
            </div>
          </div>
          <h2 id="chapter-11">十一、软件工程</h2>
          <p>可行性分析与项目开发计划、需求分析、概要设计、详细设计、编码测试、维护</p>
          <h3 id="part-1101">1. 软件开发模型</h3>
          <div class="part-contents">
            <div id="section-110101">
              <h4>1.1 瀑布模型</h4>
              <div class="sub-contents">
                <p>需求分析>设计>编码>测试>运行与维护</p>
                <p>
                  <span class="txt-define">特点</span>结构化方法，以项目的阶段评审和文档控制来指导，<b>需求明确</b>，管理成本低
                </p>
                <p>
                  <span
                    class="txt-define">缺点</span>由于各个阶段的依赖关系，需求变更较大时，会导致整个项目的延迟；测试阶段在开发结束后才进行，可能导致问题的发现和修复较晚；客户参与程度较低，可能导致最终产品与客户需求有较大差距，风险控制弱
                </p>
                <img class="img-212" style="width: 400px" src="/docs/study/imgs/212-pubu.jpg" alt="" srcset="" />
              </div>
            </div>
            <div id="section-110102">
              <h4>1.2 V模型</h4>
              <div class="sub-contents">
                <p>变体，质量保证活动，开发与测试结合，测试贯彻始终，有V选瀑</p>
                <img class="img-213" style="width: 600px" src="/docs/study/imgs/213-v.jpg" alt="" srcset="" />
              </div>
            </div>
            <div id="section-110103">
              <h4>1.3 增量模型</h4>
              <div class="sub-contents">
                <p>
                  将软件系统划分成多个增量，每个增量分别开发、测试和部署，然后按顺序进行整合。<b>首个增量是核心</b>
                </p>
                <p>
                  <span class="txt-define">特点</span>增量划分、迭代开发、重复循环、增量交付
                </p>
                <p>
                  <span class="txt-define">缺点</span>管理成本高，效率低，配置复杂
                </p>
                <img class="img-219" style="width: 700px" src="/docs/study/imgs/219-zengliang.jpg" alt="" srcset="" />
              </div>
            </div>
            <div id="section-110104">
              <h4>1.4 演化模型-原型模型</h4>
              <div class="sub-contents">
                <p>演化模型：迭代的过程模型，适用于需求缺乏准确认识的情况</p>
                <p>创建快速原型，了解需求和反馈。需求不明确，经常变化，规模小</p>
                <p>
                  <span class="txt-define">特点</span>实际可行、具有基本特征、构造方便快速，动态需求
                </p>
                <img class="img-216" style="width: 300px" src="/docs/study/imgs/216-yuanxing.png" alt="" srcset="" />
              </div>
            </div>
            <div id="section-110105">
              <h4>1.5 演化模型-螺旋模型</h4>
              <div class="sub-contents">
                <p>
                  瀑布模型+演化模型，加入风险分析，适用于复杂、大型、高风险的项目
                </p>
                <p>螺旋周期：制定计划、风险分析、实施工程、客户评估</p>
                <p>
                  <span class="txt-define">缺点</span>需要较高的技术和管理能力，且增加成本
                </p>
                <img class="img-214" style="width: 600px" src="/docs/study/imgs/214-luoxuan.jpg" alt="" srcset="" />
              </div>
            </div>
            <div id="section-110106">
              <h4>1.6 喷泉模型</h4>
              <div class="sub-contents">
                <p>
                  以用户需求为动力，以对象作为驱动，<b>面向对象</b>，迭代无间隙
                </p>
                <p>
                  <span class="txt-define">特点</span>迭代性，无间隙性，无边界可同步进行，开发效率高，复用好
                </p>
                <p>过程：分析、设计、实现、维护、演化</p>
                <p>
                  <span class="txt-define">缺点</span>团队成员多，需严格管理文档
                </p>
                <img class="img-215" style="width: 300px" src="/docs/study/imgs/215-penquan.png" alt="" srcset="" />
              </div>
            </div>
            <div id="section-110107">
              <h4>1.7 统一过程模型 (UP/RUP)</h4>
              <div class="sub-contents">
                <p>用例和风险驱动、以架构为中心、迭代且增量</p>
                <p>4个阶段的重要里程碑</p>
                <p>起始阶段 <i class="txt-en">Inception Phase</i>：生命周期目标</p>
                <p>精化阶段 <i class="txt-en">Elaboration Phase</i>：生命周期架构</p>
                <p>构建阶段 <i class="txt-en">Construction Phase</i>：初始运行功能</p>
                <p>移交阶段 <i class="txt-en">Transition Phase</i>：产品发布</p>
                <p>每个阶段有5个核心工作流</p>
              </div>
            </div>
            <div id="section-110108">
              <h4>1.8 敏捷过程 <i class="txt-en">Agile</i></h4>
              <div class="sub-contents">
                <p>通过迭代、协作和快速响应变化来提高团队的效率和灵活性</p>
                <img class="img-218" style="width: 600px" src="/docs/study/imgs/218-agile.jpg" alt="" srcset="" />
                <p>1.极限编程 (XP)：价值观、原则、实践、行为</p>
                <p>4个价值观：沟通、简单性假设、反馈、勇气</p>
                <p>5个原则：快速反馈、简单性假设、逐步修改、提倡更改、优质工作</p>
                <p>12个最佳实践</p>
                <table>
                  <tbody>
                    <tr>
                      <td>计划游戏</td>
                      <td>快速制定计划、随着细节的不断变化而完善</td>
                    </tr>
                    <tr>
                      <td>小型发布</td>
                      <td>系统的设计要能够尽可能早地交付</td>
                    </tr>
                    <tr>
                      <td>隐喻</td>
                      <td>找到合适的比喻传达信息</td>
                    </tr>
                    <tr>
                      <td>简单设计</td>
                      <td>只处理当前的需求，使设计保持简单</td>
                    </tr>
                    <tr>
                      <td>测试先行</td>
                      <td>先写测试代码，然后再编写程序</td>
                    </tr>
                    <tr>
                      <td>重构</td>
                      <td>
                        重新审视需求和设计，重新明确地描述它们以符合新的和现有的需求
                      </td>
                    </tr>
                    <tr>
                      <td>结对编程</td>
                      <td>一个开发，另一个观察审查代码，提高代码质量</td>
                    </tr>
                    <tr>
                      <td>集体代码所有制</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>持续集成</td>
                      <td>可以按日甚至按小时为客户提供可运行的版本</td>
                    </tr>
                    <tr>
                      <td>每周工作40h</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>现场客户</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>编码标准</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <p>
                  2.水晶法
                  <i class="txt-en">Crystal</i>：以人为本，不同项目需要不同策略、约定和方法论
                </p>
                <p>开发式源码：程序开发人员再地域上分布很广</p>
                <p>
                  3.并列争求法
                  <i class="txt-en">Scrum</i>：迭代的增量化工程方法，按需求的优先级别实现产品。30天一次的冲刺为一个<b>冲刺</b>
                </p>
                <p>功能驱动开发 FDD：首席程序员和类程序员</p>
                <img class="img-217" style="width: 600px" src="/docs/study/imgs/217-scrum.jpg" alt="" srcset="" />
                <p>
                  4.自适应软件开发
                  (ASD)：三个非线性开发阶段：猜测、合作、学习。强调开发方法的适应性，为软件的重要性提供基础，适应组织和管理层次
                </p>
                <p>5.敏捷统一过程 (AUP)：在大型上连续，在小型上迭代</p>
                <p>建模、实现、测试、部署、配置及项目管理、环境管理</p>
              </div>
            </div>
          </div>
          <h3 id="part-1102">2. 软件开发方法</h3>
          <div class="part-contents">
            <div id="section-110201">
              <h4>2.1 方法</h4>
              <div class="sub-contents">
                <p>
                  结构化开发方法：结构化分析 <i class="txt-en">Structured Analysis</i>、设计、程序设计，面向数据流的开发方法
                </p>
                <p>核心思想: 需求明确、<b>自顶向下、逐步分解</b></p>
                <p>Jackson方法：面向数据结构的开发方法，适合于小规模项目</p>
                <p>原型法：需求不明确，业务理论不确定，需求经常变化</p>
                <p>
                  面向对象开发方法：更好的复用性，适合于系统项目大，采用统一建模语言
                  UML
                </p>
                <p>面向服务方法：操作、服务、业务流程</p>
              </div>
            </div>
          </div>
          <h3 id="part-1103">3. 软件需求分析</h3>
          <div class="part-contents">
            <div id="section-110301">
              <h4>3.1 需求分析</h4>
              <div class="sub-contents">
                <p>
                  软件需求：指用户解决问题或达到目标所需要的条件或能力，是系统或系统部件要满足合同、标准、规范或其他正式规定文档所需具有的条件或能力，以及反映这些条件或能力的文档说明，涵盖了系统的功能、行为、性能、设计约束等方面
                </p>
                <p>
                  结构化分析结果：一套分层的数据流图、一本数据词典、一组小说明、补充材料
                </p>
                <p>
                  <span class="txt-define">分类</span>包括业务需求、用户需求、系统需求
                </p>
                <p>
                  <span
                    class="txt-define">包含</span>功能需求、性能需求、用户或人的因素、环境需求、界面需求、文档需求、数据需求、资源使用需求、安全保密需求、可靠性需求、软件成本消耗与开发进度需求、其他非功能性需求
                </p>
                <p>
                  <span class="txt-define">工具</span>数据流图与数据字典、决策表与决策树
                </p>
              </div>
            </div>
          </div>
          <h3 id="part-1104">4. 系统设计</h3>
          <div class="part-contents">
            <div id="section-110401">
              <h4>4.1 概述</h4>
              <div class="sub-contents">
                <p>
                  系统设计：指在需求分析的基础上，对软件系统进行整体架构和各个模块的设计。
                </p>
                <p>
                  目标：将需求转化为具体的实现方案，明确软件的结构和功能，并考虑系统的可维护性、可扩展性、可重用性等方面的要求
                </p>
                <p>设计方法：面向数据流(SD)、面向对象(OOD)</p>
                <p>
                  基本原理：抽象化、自顶而下，逐步求精、信息隐蔽、模块独立，高内聚低耦合
                </p>
                <p>
                  原则：保持模块的大小适中、尽可能减少调用的深度、多扇入少扇出、单入口单出口、模块的作用域应在模块之内、功能应该是可预测的
                </p>
              </div>
            </div>
            <div id="section-110402">
              <h4>4.2 设计</h4>
              <div class="sub-contents">
                <p><b>概要设计</b> <i class="txt-en">Architectural Design</i></p>
                <p>
                  主要任务：<b>设计软件系统总体结构</b>，确定系统模块及其功能分工，形成系统结构图。
                </p>
                <p>1.系统总体结构设计</p>
                <p>2.数据结构及数据库设计：概念设计、逻辑设计、物理设计</p>
                <p>
                  3.编写概要设计文档：概要设计说明书、数据库设计说明书、用户手册、修订测试计划
                </p>
                <p>4.概要设计评审</p>
                <p><b>详细设计</b> <i class="txt-en">Detailed Design</i></p>
                <p>主要任务：对各模块进行具体设计，实现概要设计到可实现代码的桥梁。</p>
                <p>1.模块详细设计：算法设计，数据结构设计，数据库物理设计</p>
                <p>2.接口设计</p>
                <p>3.界面设计</p>
              </div>
            </div>
          </div>
          <h3 id="part-1105">5. 软件测试</h3>
          <div class="part-contents">
            <div id="section-110501">
              <h4>5.1 系统测试</h4>
              <div class="sub-contents">
                <p>
                  意义：验证系统是否符合预期的功能需求和性能要求，以及发现系统中的缺陷和风险
                </p>
                <p>目的：希望能以最少的人力和时间发现潜在的错误和缺陷</p>
                <p>包含软件测试、硬件测试、网络测试</p>
                <table>
                  <tbody>
                    <tr>
                      <td>尽早进行测试</td>
                      <td>
                        测试应贯穿在开发的各个阶段，应尽早纠正错误，消除隐患
                      </td>
                    </tr>
                    <tr>
                      <td>委托专门人员进行测试</td>
                      <td>
                        测试工作应由专门人员来进行，避免由原开发软件的人或小组承担
                      </td>
                    </tr>
                    <tr>
                      <td>设计测试方案时要确定预期输出结果</td>
                      <td>
                        在设计测试方案时，不仅要确定输入数据，还要根据系统功能确定预期输出结果
                      </td>
                    </tr>
                    <tr>
                      <td>设计包含不合理、失效的输入条件的测试用例</td>
                      <td>
                        在设计测试用例时，不仅要设计有效、合理的输入条件，也要包含不合理、失效的输入条件
                      </td>
                    </tr>
                    <tr>
                      <td>检验程序做了该做的事和不该做的事</td>
                      <td>
                        在测试程序时，不仅要检验程序是否做了该做的事，还要检验程序是否做了不该做的事
                      </td>
                    </tr>
                    <tr>
                      <td>严格按照测试计划进行测试</td>
                      <td>严格按照测试计划来进行测试，避免测试的随意性</td>
                    </tr>
                    <tr>
                      <td>妥善保存测试计划和测试用例</td>
                      <td>
                        妥善保存测试计划、测试用例，作为软件文档的组成部分，为维护提供方便
                      </td>
                    </tr>
                    <tr>
                      <td>设计可重复使用的测试用例</td>
                      <td>
                        测试例子都是精心设计出来的，可以为重新测试或追加测试提供方便
                      </td>
                    </tr>
                    <tr>
                      <td>目标来自需求分析</td>
                      <td>系统测试阶段的测试目标来自于需求分析阶段</td>
                    </tr>
                  </tbody>
                </table>
                <p>测试方法</p>
                <p>
                  静态测试：人工检测、计算机辅助静态分析。桌前检查、代码走查、代码审查
                </p>
                <p>动态测试：通过运行程序，发现并纠正错误。黑盒、白盒、灰盒</p>
              </div>
            </div>
            <div id="section-110502">
              <h4>5.2 黑盒测试</h4>
              <div class="sub-contents">
                <p>只关注测试对象的输入和输出，而不考虑内部的代码和结构</p>
                <p>
                  等价类划分：将识别的输入域划分为若干个等价类，每个等价类包含具有相同特征和行为的输入。例如数字参可划分正数、零、负数，然后选择代表性数据，不可两个都不合理
                </p>
                <p><b>边界值分析</b>：在输入范围中确认边界，选择上点/离点/内点</p>
                <p>错误推测：凭经验而言，来推测有可能产生问题的地方</p>
                <p>因果图：通过一个结果来反推出导致该结果的原因</p>
              </div>
            </div>
            <div id="section-110503">
              <h4>5.3 白盒测试</h4>
              <div class="sub-contents">
                <p>
                  验证软件的内部逻辑是否正确，并且最大限度地覆盖测试对象的代码路径
                </p>
                <p>技术：逻辑覆盖、循环覆盖、基本路径测试</p>
                <p>逻辑覆盖</p>
                <p>1.语句覆盖：覆盖每个语句，分支不执行语句时可以不覆盖</p>
                <p>2.判定(分支)覆盖：每个判定表达式的结果都要真假覆盖</p>
                <p>3.条件覆盖：逻辑条件的可能值都要真假覆盖 A>0 B>0/A < 0 B < 0</p>
                    <p>4.判定/条件覆盖：条件的整体和部分条件都要真假覆盖</p>
                    <p>5.条件组合覆盖：条件可能值组合覆盖，满足上述三个</p>
                    <p>6.路径覆盖：覆盖被测试程序中的所有可能路径</p>
                    <img class="img-31" style="width: 600px" src="/docs/study/imgs/31-ceshi.png" alt="" srcset="" />
              </div>
            </div>
            <div id="section-110504">
              <h4>5.4 McCabe度量法</h4>
              <div class="sub-contents">
                <p>V(G)=m-n+2 m为有向弧数，n为节点数</p>
                <img class="img-32" style="width: 400px" src="/docs/study/imgs/32-mccabe.png" alt="" srcset="" />
                <p>代码行数是度量软件复杂度的一个主要参数</p>
                <p>伪代码</p>
              </div>
            </div>
            <div id="section-110505">
              <h4>5.5 测试阶段</h4>
              <div class="sub-contents">
                <p>
                  单元测试：是软件开发过程中的测试活动，用于验证软件系统的最小可测试单元（即单元）是否按照预期功能进行工作，依据软件详细设计说明书
                </p>
                <p>
                  特征：模块接口(数据流)、局部数据结构(变量)、重要的执行路径、出错处理、边界条件
                </p>
                <p>过程：编写驱动模块，测试桩模块</p>
                <p>集成测试：依据软件概要设计文档</p>
                <p>方法：自顶向下(不写驱动模块)、自底向上(不写桩模块)、回归测试(变更则重测)、冒烟测试</p>
                <p>确认测试：确认先前发现的缺陷是否已经修复或解决</p>
                <p>系统测试</p>
              </div>
            </div>
          </div>
          <h3 id="part-1106">6. 软件维护</h3>
          <div class="part-contents">
            <div id="section-110601">
              <h4>6.1 运行和维护</h4>
              <div class="sub-contents">
                <p>
                  对软件进行修复和改进，以纠正已经发现的错误或缺陷，并进行功能扩展或性能优化
                </p>
                <p>系统可维护性<b>评价指标</b>：可理解性、可测试性、可修改性</p>
                <p>维护期很长，更复杂，在每个阶段都需要考虑提高可维护性</p>
                <p><b>软件文档</b>是软件可维护性的决定因素：用户文档、系统文档</p>
                <p>高质量文档可以提高开发质量，工作量大，只好不坏</p>
                <p>内容：硬件维护、<b>软件维护</b>、数据维护</p>
                <p>软件可维护性类型：</p>
                <table>
                  <tbody>
                    <tr>
                      <td>正确性维护</td>
                      <td>
                        指改正在系统开发阶段已发生但在系统测试阶段尚未发现的<b>错误</b>
                      </td>
                    </tr>
                    <tr>
                      <td>适应性维护</td>
                      <td>
                        指使应用软件适应信息技术<b>变化</b>和管理需求变化的被动修改
                      </td>
                    </tr>
                    <tr>
                      <td>完/改善性维护</td>
                      <td>
                        对已有的软件系统增加一些在系统分析和设计阶段中没有规定的功能与性能特征，扩充功能，改善性能
                      </td>
                    </tr>
                    <tr>
                      <td>预防性维护</td>
                      <td>
                        为了改进应用软件的可靠性和可维护性，主动增加预防性的新功能，使应用系统适应各类变化而不被淘汰
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <h3 id="part-1107">7. 软件过程改进</h3>
          <div class="part-contents">
            <div id="section-110701">
              <h4>7.1 能力成熟度模型 CMM</h4>
              <div class="sub-contents">
                <table>
                  <tbody>
                    <tr>
                      <td>初始级</td>
                      <td>
                        软件过程的特点是杂乱无章，有时甚至很混，几乎没有明确定义的步骤，项目的成功完全<b>依赖个人努力和英雄式核心任务</b>的作用
                      </td>
                    </tr>
                    <tr>
                      <td>可重复级</td>
                      <td>
                        建立了<b>基本的项目管理过程和实践来跟踪项目</b>费用、进度和功能特性，有必要的过程准则来重复以前在同类项目中的成功
                      </td>
                    </tr>
                    <tr>
                      <td>已定义级</td>
                      <td>
                        管理和工程两方面的软件过程已<b>文档化、标准化</b>，并综合成整个软件开发组织的<b>标准软件</b>过程。所有项目都采用根据实际情况修改后得到的标准软件过程来开发和维护软件
                      </td>
                    </tr>
                    <tr>
                      <td>已管理级</td>
                      <td>
                        指定了软件过程和产品质量的详细度量标准。软件过程的<b>产品质量</b>都被开发组织的成员所理解和控制
                      </td>
                    </tr>
                    <tr>
                      <td>优化级</td>
                      <td>
                        加强了<b>定量分析</b>，通过来自过程质量反馈和来自新观念、新技术的反馈使过程能不断持续地改进
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-110702">
              <h4>7.2 能力成熟度模型集成 CMMI</h4>
              <div class="sub-contents">
                <p>阶段式模型</p>
                <table>
                  <tbody>
                    <tr>
                      <td>初始级</td>
                      <td>过程不可预测且缺乏控制</td>
                    </tr>
                    <tr>
                      <td>已管理级</td>
                      <td>过程为项目服务</td>
                    </tr>
                    <tr>
                      <td>已定义级</td>
                      <td>过程为组织服务</td>
                    </tr>
                    <tr>
                      <td>定量管理级</td>
                      <td>过程已度量和控制</td>
                    </tr>
                    <tr>
                      <td>优化级</td>
                      <td>集中于过程改进</td>
                    </tr>
                  </tbody>
                </table>
                <p>连续式模型：过程域能力等级CL</p>
                <table>
                  <tbody>
                    <tr>
                      <td>未完成级</td>
                      <td>CL0</td>
                      <td>过程域<b>未执行或未得到C</b>L1中定义的目标</td>
                    </tr>
                    <tr>
                      <td>已执行级</td>
                      <td>CL1</td>
                      <td>
                        其共性目标是过程将可标识的<b>输入</b>工作产品<b>转换成</b>可标识的<b>输出</b>工作产品，已实现支持过程域的特定目标
                      </td>
                    </tr>
                    <tr>
                      <td>已管理级</td>
                      <td>CL2</td>
                      <td>
                        其共性目标集中于<b>已管理</b>的过程的制度化，针对单个过程实例的额能力
                      </td>
                    </tr>
                    <tr>
                      <td>已定义级</td>
                      <td>CL3</td>
                      <td>
                        其共性目标集中于<b>已定义</b>的过程的制度化，关注过程的组织标准化和部署
                      </td>
                    </tr>
                    <tr>
                      <td>定量管理级</td>
                      <td>CL4</td>
                      <td>其共性目标集中于可<b>定量管理</b>的过程的制度化</td>
                    </tr>
                    <tr>
                      <td>优化级</td>
                      <td>CL5</td>
                      <td>
                        使用<b>量化手段改变和优化</b>过程域，以满足客户要求的改变和持续改进计划中的过程域的功效
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <h3 id="part-1108">8. 软件项目管理</h3>
          <div class="part-contents">
            <p>
              整合管理、范围管理、时间管理、成本管理、质量管理、人力资源管理、通信管理、风险管理、采购管理、相关方管理
            </p>
            <div id="section-110801">
              <h4>8.1 进度管理</h4>
              <div class="sub-contents">
                <p>甘特图/<b>Gantt图</b></p>
                <p>
                  <span class="txt-define">优点</span>能够清晰地描述每个任务从何时开始、到何时结束，任务的进展情况以及各个任务之间的并行性
                </p>
                <p>
                  <span class="txt-define">缺点</span>不能清晰地反映出各任务之间的依赖关系，难以确定整个项目的关键所在，也不能反映计划中有潜力的部分
                </p>
                <img class="img-28" style="width: 250px" src="/docs/study/imgs/28-gantt.png" alt="" srcset="" />
                <p>项目计划评审技术图/<b>PERT图</b></p>
                <p>
                  <span class="txt-define">缺点</span>不能反映任务之间的并行关系
                </p>
                <img class="img-27" style="width: 150px" src="/docs/study/imgs/27-pert.png" alt="" srcset="" />
                <p>正推取大值，反推取小值</p>
                <img class="img-210" style="width: 650px" src="/docs/study/imgs/210-pert.png" alt="" srcset="" />
                <p>松弛时间：最迟-最早</p>
                <p>关键路径：项目的最短工期</p>
                <p>1➔2➔3➔4➔6➔8➔10➔11</p>
                <p><b>项目活动图</b>：里程碑、活动、活动时间</p>
                <img class="img-26" style="width: 380px" src="/docs/study/imgs/26-pert.png" alt="" srcset="" />
              </div>
            </div>
            <div id="section-110802">
              <h4>8.2 风险管理</h4>
              <div class="sub-contents">
                <p><span class="txt-define">特性</span>不确定性、损失</p>
                <p>
                  <span class="txt-define">分类</span>项目风险、技术风险、商业风险
                </p>
                <p>风险识别：试图系统化地指出对项目计划的威胁，建立风险条目检查表</p>
                <p>风险预测：风险发生的可能性和产生的后果</p>
                <p>
                  风险暴露
                  <i class="txt-en">Risk Exposure</i>
                  = 风险发生概率
                  <i class="txt-en">Risk Probability</i>
                  * 风险影响后果 (本质、范围、时间)
                  <i class="txt-en">Risk Impact</i>
                </p>
                <p>风险评估：定义风险参照水准，成本、进度、性能</p>
                <p>风险控制：风险避免(主动)、风险监控、RMMM计划/风险管理策略</p>
              </div>
            </div>
            <div id="section-110803">
              <h4>8.3 软件质量</h4>
              <div class="sub-contents">
                <p>可靠性：MTTF/(1 + MTTF) 平均无故障时间 ToFailure</p>
                <p>可用性：MTBF/(1 + MTBF) 平均失效间隔时间 BetweenFailure</p>
                <p>可维护性：1/(1 + MTTR) 平均修复时间 ToRepair</p>
                <p>可靠性模型</p>
                <p>
                  串联系统：<span class="txt-func">P=R<span class="txt-sub">1</span>R<span class="txt-sub">2</span>...R<span
                      class="txt-sub">N</span></span>
                </p>
                <p>
                  并联系统：<span class="txt-func">P=1-(1-R<span class="txt-sub">1</span>)(1-R<span
                      class="txt-sub">2</span>)...(1-R<span class="txt-sub">N</span>)</span>
                </p>
              </div>
            </div>
            <div id="section-110804">
              <h4>8.4 软件配置管理 SCM</h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">主要目标</span> 变更标识、变更控制、版本控制、确保变更正确的实现、变更报告
                </p>
                <p>
                  <span class="txt-define">主要内容</span> 版本管理、配置支持、变更支持、过程支持、团队支持、变化报告、审计支持
                </p>
                <p>
                  <span class="txt-define">主要内容</span> 软件配置标识、变更管理、版本控制、系统建立、配置审核、配置状态报告
                </p>
                <p>变更管理、版本控制、系统建立、配置审核、配置状态报告</p>
                <p>配置项/配置基线</p>
                <p>配置数据库：开发库、受控库、产品库</p>
              </div>
            </div>
            <div id="section-110805">
              <h4>8.5 沟通管理</h4>
              <div class="sub-contents">
                <p>无主程序员：n*(n-1)/2</p>
                <p>有主程序员：n-1</p>
              </div>
            </div>
            <div id="section-110806">
              <h4>8.6 成本管理</h4>
              <div class="sub-contents">
                <p>软件项目估算</p>
                <p>COCOMO估算模型：用于估计软件开发项目的成本、进度和资源需求的模型。</p>
                <p>包含基本(静态单变量)、中级(静态多变量)、详细(系统/子系统/模块)</p>
                <p>
                  COCOMOII模型：应用组装模型(对象点)、早期设计阶段模型(功能点)、体系结构阶段模型(代码行)
                </p>
              </div>
            </div>
          </div>
          <h3 id="part-1109">9. 软件质量保证</h3>
          <div class="part-contents">
            <div id="section-110901">
              <h4>9.1 ISO/IEC 9126 软件质量模型</h4>
              <div class="sub-contents">
                <p>功能性：适合性、准确性、互用性、依从性、安全性</p>
                <p>可靠性：成熟性、容错性、易恢复性</p>
                <p>易使用性：易理解性、易学性、易操作性</p>
                <p>效率：时间特性(响应和处理时间、执行吞吐量)、资源特性</p>
                <p>可维护性：易分析性、易改变性、易测试性、稳定性</p>
                <p>可移植性：适应性、一致性、易安装性、易替换性</p>
              </div>
            </div>
            <div id="section-110902">
              <h4>9.2 Mc Call 软件质量模型</h4>
              <div class="sub-contents">
                <p>产品运行：正确性、可靠性、易使用性、效率、完整性</p>
                <p>产品修正：可维护性、灵活性、可测试性</p>
                <p>产品转移：可移植性、复用性、互用性</p>
              </div>
            </div>
          </div>
          <h3 id="part-1110">10. 其他</h3>
          <div class="part-contents">
            <div id="section-111001">
              <h4>10.1 软件评审</h4>
              <div class="sub-contents">
                <p>必要条件：设计质量、程序质量</p>
                <p>
                  模块结构：控制流结构、数据流结构、模块结构与功能结构之间的对应关系
                </p>
                <p>技术评审：揭露质量问题，发现程序中的错误</p>
              </div>
            </div>
            <div id="section-111002">
              <h4>10.2 软件容错技术</h4>
              <div class="sub-contents">
                <p>可屏蔽错误，可自动恢复，出错仍可运行，可容错</p>
                <p>结构冗余：静态/动态/混合</p>
                <p>信息冗余：多加信息。校验码</p>
                <p>时间冗余：重复执行，程序回滚</p>
                <p>冗余附加技术：屏蔽软件错误</p>
                <p>冗余备份程序的存储及调用</p>
                <p>实现错误检测和错误恢复的程序</p>
                <p>实现容错软件所需的固化程序</p>
              </div>
            </div>
            <div id="section-111003">
              <h4>10.3 软件工具</h4>
              <div class="sub-contents">
                <p>
                  软件开发工具：需求分析工具、设计工具、编码与排错工具、测试工具
                </p>
                <p>
                  软件维护工具：版本控制工具、文档分析工具、开发信息库工具、逆向工程工具、再工程工具
                </p>
              </div>
            </div>
            <div id="section-111004">
              <h4>10.4 软件调试</h4>
              <div class="sub-contents">
                <p>试探法、回溯法、对分查找法、归纳法、演绎法</p>
              </div>
            </div>
          </div>
          <h2 id="chapter-12">十二、信息安全</h2>
          <h3 id="part-1201">1. 安全保障</h3>
          <div class="part-contents">
            <div id="section-120101">
              <h4>1.1 各网络层次</h4>
              <div class="sub-contents">
                <p>上三层：PGP、HTTPS、SSL</p>
                <p>传输层：TLS、SET</p>
                <p>网络层：防火墙、IPSec</p>
                <p>数据链路层：链路加密、PPTP、L2TP</p>
                <p>物理层：隔离、屏蔽</p>
              </div>
            </div>
            <div id="section-120102">
              <h4>1.2 网络安全</h4>
              <div class="sub-contents">
                <p>SSL(安全套接层)：传输层安全协议。端口号443</p>
                <p>TLS(传输层安全协议)：是SSL3.0的后续版本</p>
                <p>HTTPS：使用SSL加密算法的HTTP</p>
                <p>MiMe(多用途互联网邮件扩展类型)：扩展电子邮件模板</p>
                <p>PGP(优良保密协议)：基于RSA公钥加密体系的邮件加密软件</p>
                <p>IPSec：加密IP数据报文</p>
                <p>PP2P：加密链路层</p>
                <p>IGMP：管理多播组成员关系的核心协议，因特网主管理协议</p>
                <p>SSH：终端设备与远程站点建立安全连接的协议</p>
                <p>Telnet：应用层网络协议，用于远程登录，不安全</p>
                <p>RFB：远程登录图形化用户界面</p>
                <p>WEP：有线等效保密协议</p>
                <p>内部网关协议：RIP/OSPF/IS-IS/IGRP/EIGRP</p>
                <p>外部网关协议：BGP</p>
                <p>
                  数据库容灾：异地备用数据接管无法正常工作的数据库，确保服务正常运行和信息安全转移。属于系统安全和应用安全
                </p>
                <p>信息安全：机密性(读)、完整性(改)、可用性、可控性、可审查性</p>
                <p>公共端口号：0-1023</p>
              </div>
            </div>
            <div id="section-120103">
              <h4>1.3 防火墙 <i class="txt-en">Firewall</i></h4>
              <div class="sub-contents">
                <p>内网、DMZ/隔离区/非军事化区-放置公用服务器、外网</p>
                <p>发展阶段：包过滤、应用代理网关、状态检测技术</p>
                <p><b>包过滤</b>：处于网络层和数据链路层 TCP-IP</p>
                <p>优点：对用户完全透明，低水平控制</p>
                <p>缺点：无法防范黑客攻击，不支持应用层协议，访问控制粒度太粗糙</p>
                <p><b>应用代理网关</b>：经过应用代理软件转发，彻底隔断内网和外网的通信</p>
                <p>优点：可以检测应用层、网络层和传输层的协议特征，对数据包的检测能力强</p>
                <p>缺点：难以配置，处理速度慢</p>
                <p><b>状态检测技术</b>：结合代理和包过滤防火墙的优点</p>
                <p>防火墙工作层次越高，工作效率越低，安全性越高</p>
              </div>
            </div>
            <div id="section-120104">
              <h4>1.4 访问控制 <i class="txt-en">Access Control</i></h4>
              <div class="sub-contents">
                <p>自主访问控制(DAC)：资源拥有者决定谁可以访问资源，基于访问控制列表（ACL）或权限表</p>
                <p>强制访问控制(MAC)：系统根据安全策略强制控制访问，用户无法改变权限（如军事安全等级）</p>
                <p>基于角色的访问控制(RBAC)：将权限与角色绑定，用户被分配角色以获得权限</p>
              </div>
            </div>
          </div>
          <h3 id="part-1202">2. 网络威胁与攻击</h3>
          <div class="part-contents">
            <div id="section-120201">
              <h4>2.1 病毒</h4>
              <div class="sub-contents">
                <p>
                  <span class="txt-define">特征</span>传播性、隐蔽性、感染性、潜伏性、触发性、破坏性
                </p>
                <p>
                  <span class="txt-define">类型</span>蠕虫 <i class="txt-en">worm</i>、特洛伊木马 <i
                    class="txt-en">trojan</i>、后门病毒 <i class="txt-en">backdoor</i>、
                  宏病毒 <i class="txt-en">macro virus</i>
                </p>
                <p>宏病毒：文本文档、电子表格等</p>
                <p>木马软件: 冰河</p>
              </div>
            </div>
            <div id="section-120202">
              <h4>2.2 网络攻击</h4>
              <div class="sub-contents">
                <p>截获 <i class="txt-en">Interception</i>：非法获取或监听信息。例如窃听网络报文、捕获邮件、被动监听</p>
                <p>篡改/修改 <i class="txt-en">Modification</i>：非法更改信息内容。在传输中修改报文、注入恶意代码</p>
                <p>中断 <i class="txt-en">Interruption</i>：破坏服务或资源可用性。如拒绝服务、物理破坏介质</p>
                <p>伪造/伪装/生成 <i class="txt-en">Fabrication</i>：伪造数据或实体。伪造身份、伪造报文、重放攻击等</p>
                <table>
                  <tbody>
                    <tr>
                      <td>拒绝服务Dos攻击</td>
                      <td>不断向计算机发送请求使得计算机或网络无法正常服务</td>
                    </tr>
                    <tr>
                      <td>重放攻击</td>
                      <td>发送目的主机已接收过的报文，从而破坏认证的正确性</td>
                    </tr>
                    <tr>
                      <td>口令入侵攻击</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>特洛伊木马</td>
                      <td>内部发起连接，外部主机控制并盗取用户信息</td>
                    </tr>
                    <tr>
                      <td>端口欺骗攻击</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>网络监听</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>IP欺骗攻击</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>SQL注入攻击</td>
                      <td>因程序未对用户输入数据的合法性进行判断，获取权限</td>
                    </tr>
                    <tr>
                      <td>入侵检测攻击</td>
                      <td>专家系统、模型检测、简单匹配</td>
                    </tr>
                    <tr>
                      <td>ARP攻击</td>
                      <td>通过伪造IP地址和MAC地址，使网络阻塞</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <h3 id="part-1203">3. 加密和认证技术</h3>
          <div class="part-contents">
            <div id="section-120301">
              <h4>3.1 加密技术和认证技术</h4>
              <div class="sub-contents">
                <p>信息安全：保密性、完整性、可用性、可控性、可审查性</p>
                <p>窃听-加密、篡改-摘要、假冒、否认-数字签名</p>
                <p>公钥：用于加密信息，验证数字签名</p>
                <p>私钥：用于解密信息，创建数字签名</p>
                <p>
                  <b>对称加密</b>
                  <i class="txt-en">Symmetric Encryption</i>：相同的密钥加解密。速度快，适合加密大量明文数据，私钥加密/共享密钥加密
                </p>
                <img class="img-06" style="width: 400px" src="/docs/study/imgs/06-jiami.png" />
                <p>
                  <b>非对称加密</b>
                  <i class="txt-en">Asymmetric Encryption</i>：用接收方的公钥加密，接收方用私钥解密。高安全性，但加密解密速度慢，公钥加密
                </p>
                <img class="img-07" style="width: 400px" src="/docs/study/imgs/07-jiami.png" />
                <p>
                  <b>信息摘要</b>：将明文进行Hash算法发送信息摘要，接收方解密后对比摘要
                </p>
                <img class="img-08" style="width: 400px" src="/docs/study/imgs/08-jiami.png" />
                <p>数据完整性、一致性，不可逆，唯一性</p>
                <p>
                  <b>数字签名</b>
                  <i class="txt-en">Digital Signature</i>：结合非对称和散列函数，发送方私钥加密摘要，公钥解密
                </p>
                <img class="img-09" style="width: 400px" src="/docs/study/imgs/09-jiami.png" />
                <p><b>数字证书</b>：证书颁发机构 CA <i class="txt-en">Certificate Authority</i> 颁布，由CA的私钥加密形成数字证书</p>
                <p>
                  用于身份认证：用CA的公钥验证证书真伪，用发送方的公钥来验证消息的真实性
                </p>
                <p>公开密钥基础建设 PKI <i class="txt-en">Public Key Infrastructure</i>:
                  是信息安全技术的核心，包括加密、数字签名、数据完整性机制、数字信封、双重数字签名等</p>
                <p>保证 机密性-不被偷看、完整性-不被篡改、有效性-不被否认</p>
                <table>
                  <tbody>
                    <tr>
                      <td>对称加密</td>
                      <td>DES <i class="txt-en">Data Encryption Standard</i> AES <i class="txt-en">Advanced Encryption
                          Standard</i> 3DES RC-5 IDEA RC4</td>
                    </tr>
                    <tr>
                      <td>非对称加密</td>
                      <td>DSA <i class="txt-en">Digital Signature Algorithm</i> RSA ECC <i class="txt-en">Elliptic
                          Curves Cryptography</i></td>
                    </tr>
                    <tr>
                      <td>信息摘要</td>
                      <td>Hash函数 MD5-128 SHA</td>
                    </tr>
                  </tbody>
                </table>
                <img class="img-05 img-abs" style="width: 200px" src="/docs/study/imgs/05-sign.png" />
              </div>
            </div>
          </div>
          <h2 id="chapter-13">十三、计算机网络 (66-70)</h2>
          <h3 id="part-1301">1. OSI/RM 七层模型</h3>
          <div class="part-contents">
            <div id="section-130101">
              <h4>1.1 七层模型</h4>
              <div class="sub-contents">
                <table>
                  <thead>
                    <tr>
                      <th>层次</th>
                      <th>名称</th>
                      <th>主要功能</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>7</td>
                      <td>应用层</td>
                      <td>实现具体的应用功能</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>表示层</td>
                      <td>数据的格式与表达、加密、压缩</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>会话层</td>
                      <td>建立、管理和终止会话 <i class="txt-en">Session</i></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>传输层</td>
                      <td>端到端的连接，流量控制、拥塞控制</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>网络层</td>
                      <td>分组传输，路由选择，逻辑寻址(IP地址)</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>数据链路层</td>
                      <td>
                        将比特流封装为帧
                        <i class="txt-en">Frame</i>，进行物理寻址(MAC地址)，CRC校验
                      </td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>物理层</td>
                      <td>二进制传输比特流</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-130102">
              <h4>1.2 网络设备</h4>
              <div class="sub-contents">
                <table>
                  <thead>
                    <tr>
                      <th>层次</th>
                      <th>名称</th>
                      <th>主要功能</th>
                      <th>冲突域</th>
                      <th>广播域</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>应用层</td>
                      <td>网关 <i class="txt-en">Gateway</i></td>
                      <td>不同协议间的转换（如邮件网关、协议网关）</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>应用层防火墙/代理服务器</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>传输层</td>
                      <td>四层交换机 (负载均衡器)</td>
                      <td>基于 TCP/UDP 端口号做转发</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>网络层</td>
                      <td>路由器 <i class="txt-en">Router</i></td>
                      <td>基于 IP 地址转发，实现不同网络之间互联</td>
                      <td>独立</td>
                      <td>独立</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>三层交换机</td>
                      <td>结合二层交换和三层路由，适合大型局域网内部高效互联</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>数据链路层</td>
                      <td>网桥 <i class="txt-en">Bridge</i></td>
                      <td>根据 MAC 地址转发，分割冲突域</td>
                      <td>独立</td>
                      <td>一个</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>交换机 <i class="txt-en">Switch</i></td>
                      <td>基于 MAC 地址表的快速转发，支持全双工通信</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>物理层</td>
                      <td>中继器 <i class="txt-en">Repeater</i></td>
                      <td>信号放大、整形、转发</td>
                      <td>一个</td>
                      <td>一个</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>集线器 <i class="txt-en">Hub</i></td>
                      <td>多端口中继器，广播转发</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-130103">
              <h4>1.3 路由</h4>
              <div class="sub-contents">
                <table>
                  <tbody>
                    <tr>
                      <td>直连网络ID</td>
                      <td>2</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>远程网络ID</td>
                      <td>2</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>主机路由</td>
                      <td>1</td>
                      <td>子网掩码255.255.255.255</td>
                    </tr>
                    <tr>
                      <td>默认路由</td>
                      <td>3</td>
                      <td>目标网络和网络掩码都是0.0.0.0</td>
                    </tr>
                    <tr>
                      <td>持久路由</td>
                      <td></td>
                      <td>route add -p</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <h3 id="part-1302">2. TCP/IP 协议簇</h3>
          <div class="part-contents">
            <div id="section-130201">
              <h4>2.1 展示图</h4>
              <div class="sub-contents">
                <table>
                  <thead>
                    <tr>
                      <th>OSI 模型</th>
                      <th colspan="3">TCP/IP 协议</th>
                      <th>TCP/IP 模型</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>应用层</td>
                      <td rowspan="3">
                        <div class="list-prots" style="width: 400px">
                          <div class="prot-item">
                            <div class="item-name">
                              POP3 <span class="item-port">110</span>
                            </div>
                            <div class="item-desc">邮件收取</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">
                              SMTP <span class="item-port">25</span>
                            </div>
                            <div class="item-desc">邮件传输</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">
                              IMAP <span class="item-port">143</span>
                            </div>
                            <div class="item-desc">邮件传输</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">
                              HTTP <span class="item-port">80</span>
                            </div>
                            <div class="item-desc">网页传输</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">
                              HTTPS <span class="item-port">443</span>
                            </div>
                            <div class="item-desc">网页安全传输</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">
                              FTP <span class="item-port">数据 20/控制 21</span>
                            </div>
                            <div class="item-desc">文件传输</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">
                              SSH <span class="item-port">22</span>
                            </div>
                            <div class="item-desc">远程登录</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">
                              Telnet <span class="item-port">23</span>
                            </div>
                            <div class="item-desc">远程登录</div>
                          </div>
                        </div>
                      </td>
                      <td rowspan="3">
                        <div class="list-prots">
                          <div class="prot-item">
                            <div class="item-name">NFS</div>
                            <div class="item-desc">网络文件服务</div>
                          </div>
                        </div>
                      </td>
                      <td rowspan="3">
                        <div class="list-prots" style="width: 400px">
                          <div class="prot-item">
                            <div class="item-name">
                              DNS <span class="item-port">53</span>
                            </div>
                            <div class="item-desc">域名解析过程</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">
                              DHCP <span class="item-port">67</span>
                            </div>
                            <div class="item-desc">动态IP分配</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">
                              TFTP <span class="item-port">69</span>
                            </div>
                            <div class="item-desc">简单文件传输</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">
                              SNMP <span class="item-port">161</span>
                            </div>
                            <div class="item-desc">简单网络管理</div>
                          </div>
                        </div>
                      </td>
                      <td rowspan="3">应用层</td>
                    </tr>
                    <tr>
                      <td>表示层</td>
                    </tr>
                    <tr>
                      <td>会话层</td>
                    </tr>
                    <tr>
                      <td>传输层</td>
                      <td>
                        <div class="list-prots">
                          <div class="prot-item">
                            <div class="item-name">TCP</div>
                            <div class="item-desc">可靠 面向连接</div>
                          </div>
                        </div>
                      </td>
                      <td></td>
                      <td>
                        <div class="list-prots">
                          <div class="prot-item">
                            <div class="item-name">UDP</div>
                            <div class="item-desc">不可靠 无连接 快速</div>
                          </div>
                        </div>
                      </td>
                      <td>传输层</td>
                    </tr>
                    <tr>
                      <td>网络层</td>
                      <td colspan="3">
                        <div class="list-prots">
                          <div class="prot-item">
                            <div class="item-name">IP</div>
                            <div class="item-desc">IPv4 / IPv6</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">ICMP</div>
                            <div class="item-desc">差错报告与控制</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">IGMP</div>
                            <div class="item-desc">组播管理</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">IPSec</div>
                            <div class="item-desc">加密IP数据报文</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">ARP</div>
                            <div class="item-desc">地址解析 IP->MAC</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">RARP</div>
                            <div class="item-desc">反地址解析 MAC->IP</div>
                          </div>
                        </div>
                      </td>
                      <td>网际层</td>
                    </tr>
                    <tr>
                      <td>数据链路层</td>
                      <td colspan="3" rowspan="2">
                        <div class="list-prots">
                          <div class="prot-item">
                            <div class="item-name">Ethernet</div>
                            <div class="item-desc">以太网</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">Token-Ring</div>
                            <div class="item-desc">令牌环</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">帧中继</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">PPP</div>
                          </div>
                          <div class="prot-item">
                            <div class="item-name">CSMA/CD</div>
                          </div>
                        </div>
                      </td>
                      <td rowspan="2">网络接口层</td>
                    </tr>
                    <tr>
                      <td>物理层</td>
                    </tr>
                  </tbody>
                </table>
                <div class="list-items">
                  <template v-for="item in pageInfos.ports">
                    <h4>{{ item.category }}</h4>
                    <div class="list-ports">
                      <template v-for="port in item.list">
                        <div class="port-item">
                          <div class="item-name">{{ port.name }}</div>
                          <div class="item-type">{{ port.type }}</div>
                          <div class="item-infos">
                            <div class="item-icon">
                              <i class="fa-solid" :class="`fa-${port.icon}`"></i>
                            </div>
                            <div class="item-port">{{ port.port }}</div>
                          </div>
                          <div class="item-full">{{ port.full }}</div>
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
              </div>
            </div>
            <div id="section-130202">
              <h4>2.2 传输层协议</h4>
              <div class="sub-contents">
                <p>都基于IP协议的传输层协议，可以<b>端口寻址</b></p>
                <p>TCP：提供了一个可靠的、面向连接的、全双工的数据传输服务</p>
                <p>
                  可靠传输，连接管理，差错检验和重传，流量控制(可变大小的滑动窗口协议)，拥塞控制
                </p>
                <p>三次握手：SYN>SYN-ACK>ACK</p>
                <p>UDP：无连接，不可靠，高效，开销小，适用于实时应用。</p>
                <p>包头简单，无流量控制，有助于提高传输的高速率性</p>
                <p>VoIP：视频通话，允许某种程度上的数据丢失</p>
              </div>
            </div>
            <div id="section-130204">
              <h4>2.4 网际层协议</h4>
              <div class="sub-contents">
                <p>IP：逻辑寻址，路由选择，数据包分片于重组，IPv4/IPv6</p>
                <p>ICMP：网络诊断与错误报错</p>
                <p>
                  ARP：地址解析协议，IP转MAC，局域网通信，广播发送请求，单播应答响应
                </p>
                <p>RARP：反地址解析协议，MAC转IP，被DHCP取代</p>
              </div>
            </div>
            <div id="section-130203">
              <h4>2.3 应用层协议</h4>
              <div class="sub-contents">
                <p>DHCP：动态主机配置协议，集中管理/分配IP地址</p>
                <p>客户机/服务器模型</p>
                <p>
                  客户端可从服务器获取本机IP地址、DNS服务器地址、DHCP服务器地址和默认网关地址
                </p>
                <p>DHCP无效地址：169.254.x.x(Win)/0.0.0.0(Linux)</p>
                <p>DNS：域名解析</p>
                <p>
                  主机向本地域名服务器的查询采用递归查询：服务器必须回答目标IP与域名的映射关系
                </p>
                <p>
                  本地域名服务器向根域名服务器的查询采用迭代查询：服务器收到一次迭代查询回复一次结果。结果可能为其他DNS服务器的地址
                </p>
              </div>
            </div>
          </div>
          <h3 id="part-1303">3. 网络接入技术</h3>
          <div class="part-contents">
            <div id="section-130301">
              <h4>3.1 分类</h4>
              <div class="sub-contents">
                <p>按分布范围分：局域网 LAN、域域网 MAN、广域网 WAN、因特网</p>
                <img class="img-162" style="width: 700px" src="/docs/study/imgs/162-wan.png" />
                <p>按拓扑结构分：总线型、星型、环型</p>
              </div>
            </div>
            <div id="section-130302">
              <h4>3.2 网络接入技术</h4>
              <div class="sub-contents">
                <p>Wifi</p>
                <p>
                  蓝牙 <i class="txt-en">Bluetooth</i> 覆盖范围最小，通信距离最短
                </p>
                <p>红外</p>
                <p>WAPI</p>
              </div>
            </div>
            <div id="section-130303">
              <h4>3.3 3G/4G/5G</h4>
              <div class="sub-contents">
                <p>3G：WCDMA、CDMA2000、TD-SCDMA、WIMAX</p>
                <p>4G：TD-LTE、FDD-LTE</p>
                <p>5G：理论峰值1Gb/s</p>
              </div>
            </div>
          </div>
          <h3 id="part-1304">4. 网络规划与设计</h3>
          <div class="part-contents">
            <div id="section-130401">
              <h4>4.1 逻辑网络设计</h4>
              <div class="sub-contents">
                <p>
                  通过合理的逻辑架构，定义网络中不同设备之间的交互，建立数据传输和信息交换的路径，以实现网络的连接和数据传输的重要工作
                </p>
                <p>收集需求和要求，分析和理解业务需求</p>
                <p>确定逻辑节点和连接的标准和约束条件</p>
                <p>通过实验验证和分析不同方案，选择最优逻辑拓扑结构</p>
                <p>完成逻辑拓扑的规划，并输出实施方案</p>
              </div>
            </div>
          </div>
          <h3 id="part-1305">5. IP地址</h3>
          <div class="part-contents">
            <div id="section-130501">
              <h4>5.1 概念</h4>
              <div class="sub-contents">
                <p>IP地址中，全0代表的是网络，全1代表的是广播</p>
                <p>回播地址：127网段</p>
                <p>DHCP失效地址：Linux 0.0.0.0 Windows 169.254.x.x</p>
                <p>分为 网络地址+主机地址</p>
                <p>
                  子网掩码：A类占8位，B类占16位，C类占24位，D类组播地址，E类保留
                </p>
              </div>
            </div>
            <div id="section-130502">
              <h4>5.2 子网划分</h4>
              <div class="sub-contents">
                <p>例：将B类IP地址168.195.0.0划分为27个子网，子网掩码为多少</p>
                <p>
                  B类地址则前16位是网络号，后16位会主机号。需要取5个主机位(32>27)。
                </p>
                <p>
                  则子网掩码为 1111 1111 1111 1111 1111 1000 0000 0000 即
                  255.255.248.0
                </p>
                <table>
                  <tbody>
                    <tr>
                      <td>128</td>
                      <td>64</td>
                      <td>32</td>
                      <td>16</td>
                      <td>8</td>
                      <td>4</td>
                      <td>2</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-130503">
              <h4>5.3 IPv6</h4>
              <div class="sub-contents">
                <p>地址长度为128位，IPv4只有32位，地址增大了2^96倍</p>
                <p>合法地址缩写</p>
              </div>
            </div>
          </div>
          <h3 id="part-1306">6. 其他服务</h3>
          <div class="part-contents">
            <div id="section-130601">
              <h4>6.1 电子邮件服务</h4>
              <div class="sub-contents">
                <p>E-mail系统基于客户端/服务器(C/S)模式</p>
                <p>SMTP：简单邮件传输协议，只能传输ASCII码文本和文字附件</p>
                <p>+MIME：多用途Internet邮件扩展类型，扩展电子邮件类型</p>
                <p>+PEM：增强私密邮件保护协议</p>
                <p>POP3：邮件收取协议</p>
                <p>Outlook Express：免费电子邮件客户端</p>
              </div>
            </div>
            <div id="section-130602">
              <h4>6.2 WWW服务/Web相关</h4>
              <div class="sub-contents">
                <p>HTTP状态码：200/404/500</p>
                <p>URL：协议名://主机名.域名.域名后缀.域名分类/目录/网页</p>
                <p>组织模式：com/edu/net</p>
                <p>顶级域：cn/tw/uk/jp</p>
                <p>
                  浏览器输入地址：本地hosts文件>本地DNS缓存>本地DNS服务器>根域名服务器>顶级域名服务器>权限域名服务器
                </p>
                <p>
                  主域名服务器：本地DNS缓存>本地hosts文件>本地数据库>转发域服务器
                </p>
                <p>输入网址>URL解析>检查缓存>DNS查询，获取目标IP></p>
                <p>
                  建立TCP连接三次握手>TLS/SSL握手>浏览器发送请求报文>服务器处理请求，返回响应报文>浏览器解析响应并渲染页面>断开连接
                </p>
                <p>HTTPS过程：</p>
                <img class="img-221" style="width: 588px" src="/docs/study/imgs/221-https.png" />
                <img class="img-159" style="width: 700px" src="/docs/study/imgs/159-https.png" />
                <p>浏览器渲染网页：</p>
                <img class="img-160" style="width: 990px" src="/docs/study/imgs/160-web.png" />
              </div>
            </div>
            <div id="section-130603">
              <h4>6.3 Windows命令</h4>
              <div class="sub-contents">
                <p><b>ipconfig</b>：显示网络适配器</p>
                <p>ipconfig/release：释放</p>
                <p>ipconfig/flushdns：清除/刷新本地DNS缓存</p>
                <p>ipconfig/displaydns：显示本地DNS</p>
                <p>ipconfig/registerdns：注册</p>
                <p>ipconfig/all：显示TCP/IP配置信息，包括DHCP</p>
                <p>ipconfig/renew：重新申请IP地址</p>
                <p><b>ping</b>：127.0.0.1>本机IP>默认网关>远程主机</p>
                <p>msconfig：Win配置的应用程序</p>
                <p>cmd：命令提示符</p>
                <p><b>tracert</b>：路由跟踪实用程序</p>
                <p>traceroute：追踪数据包从源到目的地在IP网络上的路径</p>
                <p><b>netstat</b>：显示网络连接、路由表和网络接口信息</p>
                <p><b>nslookup</b>：域名查询</p>
              </div>
            </div>
            <div id="section-130604">
              <h4>6.4 补充</h4>
              <div class="sub-contents">
                <p>Linux根目录：/</p>
                <p>chmod：更新文件权限</p>
                <p>帧中继：高速分组交换技术</p>
                <p>VLAN</p>
                <p>层次化局域网模型：核心层、汇聚层、接入层</p>
              </div>
            </div>
          </div>
          <h2 id="chapter-14">十四、算法</h2>
          <h3 id="part-1401">1. 基本概念</h3>
          <div class="part-contents">
            <div id="section-140101">
              <h4>1.1 概念</h4>
              <div class="sub-contents">
                <p>有穷性：执行有穷步之后结束，且每一步都在有穷时间内完成</p>
                <p>确定性：算法中每一条指令都必须有确切的含义</p>
                <p>输入和输出</p>
                <p>有效性</p>
              </div>
            </div>
            <div id="section-140102">
              <h4>1.2 效率</h4>
              <div class="sub-contents">
                <p>大O表示法</p>
                <img class="img-148" style="width: 600px" src="/docs/study/imgs/148-fuza.png" />
                <p>时间复杂度</p>
                <p>空间复杂度</p>
                <img class="img-149" style="width: 600px" src="/docs/study/imgs/149-fuza.png" />
              </div>
            </div>
            <div id="section-140103">
              <h4>1.3 下午题</h4>
              <div class="sub-contents">
                <p>希尔排序</p>
                <p>DNA编辑距离</p>
              </div>
            </div>
          </div>
          <h3 id="part-1402">2. 查找算法</h3>
          <div class="part-contents">
            <div id="section-140201">
              <h4>2.1 顺序查找</h4>
              <div class="sub-contents">
                <p>将待查找元素从头到尾与表中元素比较直至找到</p>
                <p>平均查找长度ASL = (n+1)⁄2</p>
              </div>
            </div>
            <div id="section-140202">
              <h4>2.2 二分查找</h4>
              <div class="sub-contents">
                <p>
                  在有序排列的序列中折半范围查找元素。中间值的位置若是小数向下取整
                </p>
                <p>最多比较次数：⌊log2n⌋+1</p>
                <p>平均查找长度ASL ≈ log2(n+1)-1</p>
              </div>
            </div>
            <div id="section-140203">
              <h4>2.3 哈希表查找</h4>
              <div class="sub-contents">
                <p>
                  关键码序列相同的元素，如果该控件已经被占用，则自动转换到该关键码序列的下一个地址空间
                </p>
              </div>
            </div>
            <div id="section-140203">
              <h4>2.3 动态查找</h4>
              <div class="sub-contents">
                <p>
                  查找时没有找到对应元素，则向查找表中插入未找到的元素，或者从查找表中删除某个指定的元素
                </p>
              </div>
            </div>
          </div>
          <h3 id="part-1403">3. 排序算法</h3>
          <div class="part-contents">
            <div id="section-140301">
              <h4>3.1 复杂度 <i class="txt-en">Complexity</i></h4>
              <div class="sub-contents">
                <table>
                  <thead>
                    <tr>
                      <th>算法</th>
                      <th>平均时间复杂度</th>
                      <th>最坏时间复杂度</th>
                      <th>最好时间复杂度</th>
                      <th>空间复杂度</th>
                      <th>稳定性</th>
                      <th>归位</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>直接插入排序</td>
                      <td>
                        <span class="txt-func">O(n<span class="txt-sup">2</span>)</span>
                      </td>
                      <td>
                        <span class="txt-func">O(n<span class="txt-sup">2</span>)</span>
                      </td>
                      <td><span class="txt-func">O(n)</span></td>
                      <td><span class="txt-func">O(1)</span></td>
                      <td>✅</td>
                      <td>❌</td>
                    </tr>
                    <tr>
                      <td>希尔排序</td>
                      <td>
                        <span class="txt-func">O(n<span class="txt-sup">1.3</span>)</span>
                      </td>
                      <td>
                        <span class="txt-func">O(n<span class="txt-sup">2</span>)</span>
                      </td>
                      <td><span class="txt-func">O(n)</span></td>
                      <td><span class="txt-func">O(1)</span></td>
                      <td>❌</td>
                      <td>❌</td>
                    </tr>
                    <tr>
                      <td>简单选择排序</td>
                      <td>
                        <span class="txt-func">O(n<span class="txt-sup">2</span>)</span>
                      </td>
                      <td>
                        <span class="txt-func">O(n<span class="txt-sup">2</span>)</span>
                      </td>
                      <td>
                        <span class="txt-func">
                          O(n<span class="txt-sup">2</span>)
                        </span>
                      </td>
                      <td><span class="txt-func">O(1)</span></td>
                      <td>❌</td>
                      <td>✅</td>
                    </tr>
                    <tr>
                      <td>堆排序</td>
                      <td>
                        <span class="txt-func">O(nlgn)</span>
                      </td>
                      <td>
                        <span class="txt-func">O(nlgn)</span>
                      </td>
                      <td>
                        <span class="txt-func">O(nlgn)</span>
                      </td>
                      <td><span class="txt-func">O(1)</span></td>
                      <td>❌</td>
                      <td>✅</td>
                    </tr>
                    <tr>
                      <td>冒泡排序</td>
                      <td>
                        <span class="txt-func">O(n<span class="txt-sup">2</span>)</span>
                      </td>
                      <td>
                        <span class="txt-func">O(n<span class="txt-sup">2</span>)</span>
                      </td>
                      <td><span class="txt-func">O(n)</span></td>
                      <td><span class="txt-func">O(1)</span></td>
                      <td>✅</td>
                      <td>✅</td>
                    </tr>
                    <tr>
                      <td>快速排序</td>
                      <td>
                        <span class="txt-func">O(nlgn)</span>
                      </td>
                      <td>
                        <span class="txt-func">O(n<span class="txt-sup">2</span>)</span>
                      </td>
                      <td>
                        <span class="txt-func">O(nlgn)</span>
                      </td>
                      <td>
                        <span class="txt-func">O(lgn)</span>
                      </td>
                      <td>❌</td>
                      <td>✅</td>
                    </tr>
                    <tr>
                      <td>归并排序</td>
                      <td>
                        <span class="txt-func">O(nlgn)</span>
                      </td>
                      <td>
                        <span class="txt-func">O(nlgn)</span>
                      </td>
                      <td>
                        <span class="txt-func">O(nlgn)</span>
                      </td>
                      <td><span class="txt-func">O(n)</span></td>
                      <td>✅</td>
                      <td>❌</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div id="section-140302">
              <h4>3.2 排序演示</h4>
              <div class="sub-contents">
                <sortView></sortView>
              </div>
            </div>
          </div>
          <h3 id="part-1404">4. 回溯法 <i class="txt-en">Backtracking</i></h3>
          <div class="part-contents">
            <div id="section-140401">
              <h4>4.1 概念</h4>
              <div class="sub-contents">
                <p>
                  从问题的一个初始解出发，逐步构造问题的解，当不能继续构造时，就进行回溯，返回上一层继续构造
                </p>
              </div>
            </div>
            <div id="section-140402">
              <h4>4.2 N皇后问题</h4>
              <div class="sub-contents">
                <p>
                  给定一个N*N(N=4)棋盘上摆放N个皇后，满足任意两个皇后不处于同一行、同一列、同一斜线上
                </p>
                <img class="img-205" style="width: 300px;" src="/docs/study/imgs/205-huanghou.png" />
                <p>1.逐行放置</p>
                <p>2.合法性检查：是否同列或同斜线(插值的绝对值相等)</p>
                <p>3.回溯：如果本行摆放失败，回溯上一行从新摆放</p>
                <p>4.终止：成功放置n行</p>
                <p>递归求解</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('cpp')" :value="db.code_huisu_01"></codeView>
                </div>
                <p>循环求解</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('cpp')" :value="db.code_huisu_02"></codeView>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-1405">
            5. 分治法 <i class="txt-en">Divide and Conquer</i>
          </h3>
          <div class="part-contents">
            <div id="section-140501">
              <h4>5.1 概念</h4>
              <div class="sub-contents">
                <p>
                  将问题分解成互不重叠的子问题，对子问题进行求解再合并成原问题的解
                </p>
                <p>递归：边界条件、递归模式</p>
                <p>阶乘</p>
                <div class="box-code" style="width: 700px; height: 150px">
                  <codeView :configs="codeConfig('typescript')" :value="db.code_fenzhi_01"></codeView>
                </div>
              </div>
            </div>
            <div id="section-140502">
              <h4>5.2 归并排序</h4>
              <div class="sub-contents">
                <p>分解：将n个元素分成n/2个子序列</p>
                <p>求解：对两个子序列递归排序</p>
                <p>合并：合并两个子序列并排序</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('cpp')" :value="db.code_fenzhi_02"></codeView>
                </div>
              </div>
            </div>
            <div id="section-140503">
              <h4>5.3 最大子段和问题</h4>
              <div class="sub-contents">
                <p>分成子段后三种情况</p>
                <p>1.和左子段的最大子段和相同</p>
                <p>2.和右子段的最大子段和相同</p>
                <p>3.跨区时为 左子段的右边界最大值+右子段的左边界最大值</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('cpp')" :value="db.code_fenzhi_03"></codeView>
                </div>
              </div>
            </div>
          </div>
          <h3 id="part-1406">
            6. 动态规划(DP) <i class="txt-en">Dynamic Programming</i>
          </h3>
          <div class="part-contents">
            <div id="section-140601">
              <h4>6.1 概念</h4>
              <div class="sub-contents">
                <p>
                  通过解决并不相互独立的不全都相同的子问题找到问题的最优解，然后将子问题的解合并起来得到原问题的最优解。通常用于求解具有重叠子问题和最优子结构性质的问题
                </p>
                <p>1.找出最优解的性质</p>
                <p>2.递归地定义最优解的值</p>
                <p>3.自底向上计算出最优值</p>
                <p>4.构造最优解</p>
              </div>
            </div>
            <div id="section-140602">
              <h4>6.2 0-1背包问题</h4>
              <div class="sub-contents">
                <p>
                  给定N个物品，第i个物品的重量w_𝑖，价值𝑣_𝑖
                  ，放入容量为W的背包，怎么保证装入物品的总价值最大
                </p>
                <p>二维步骤：</p>
                <p>1.确定dp数组和下标含义</p>
                <p>
                  dp[i][j] 表示从下标 [1,i] 中任意选取物品放入容量为 j
                  的背包时的最大价值
                </p>
                <p>2.确定递推公式</p>
                <p>
                  case1：确定不放物品 i 时，公式可推此时最大价值为
                  <span class="txt-func">dp[i-1][j]</span>
                </p>
                <p>
                  case2：确定放入物品 i 时，前提条件是背包容量W大于
                  <span class="txt-func">w<span class="txt-sub">𝑖</span></span>，剩余背包容量为
                  <span class="txt-func">j-w<span class="txt-sub">𝑖</span></span>，则问题转换为求 从下标 [1,i-1] 中任意选取物品放入容量为
                  <span class="txt-func">j-w<span class="txt-sub">𝑖</span></span>
                  的背包时的最大价值，即
                  <span class="txt-func">dp[i-1][j-w<span class="txt-sub">𝑖</span>]</span>，则此时最大价值为
                  <span class="txt-func">dp[i-1][j-w<span class="txt-sub">𝑖</span>]+𝑣<span
                      class="txt-sub">𝑖</span></span>
                  ，所以状态转移方程为
                  <span class="txt-func">dp[i][j] = max(dp[i-1][j], dp[i-1][j-w<span class="txt-sub">𝑖</span>]+𝑣<span
                      class="txt-sub">𝑖</span>)</span>
                </p>
                <p>3.dp数组初始化</p>
                <p>dp[0][j] 使用各个容量的背包放入编号0物品的最大价值</p>
                <p>dp[i][0] 背包容量为0是存放各个物品的最大价值</p>
                <p>4.确定遍历顺序</p>
                <p>物品和背包重量</p>
                <p>时间复杂度：O(NW)</p>
                <p>空间复杂度：O(NW)</p>
                <table>
                  <tbody>
                    <tr>
                      <td>W=5</td>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                    </tr>
                    <tr>
                      <td>
                        <span class="txt-func">𝑣<span class="txt-sub">𝑖</span></span>
                      </td>
                      <td>2</td>
                      <td>3</td>
                      <td>5</td>
                      <td>6</td>
                    </tr>
                    <tr>
                      <td>
                        <span class="txt-func">w<span class="txt-sub">𝑖</span></span>
                      </td>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                    </tr>
                  </tbody>
                </table>
                <img class="img-59" style="width: 850px" src="/docs/study/imgs/59-dongtai.png" />
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('cpp')" :value="db.code_dongtai_01"></codeView>
                </div>
              </div>
            </div>
            <div id="section-140603">
              <h4>6.3 矩阵连乘</h4>
              <div class="sub-contents">
                <p>M1(m*n) M2(n*p)</p>
                <p>计算m*n*p次 新矩阵m*p</p>
                <p>时间复杂度：O(n^3)</p>
                <p>空间复杂度：O(n^2)</p>
                <p>最优计算次数</p>
              </div>
            </div>
            <div id="section-140604">
              <h4>6.4 最长公共子串</h4>
              <div class="sub-contents">
                <p>字串个数2^n</p>
              </div>
            </div>
            <div id="section-140605">
              <h4>6.5 路线选择</h4>
              <div class="sub-contents"></div>
            </div>
          </div>
          <h3 id="part-1407">7. 贪心法 <i class="txt-en">Greedy Algorithm</i></h3>
          <div class="part-contents">
            <div id="section-140701">
              <h4>7.1 概念</h4>
              <div class="sub-contents">
                <p>
                  通常适用于具有贪心选择性质的问题，即每一步都选择局部最优解能够得到全局近似最优解。解决具有最优子结构和贪心选择性质的问题
                </p>
              </div>
            </div>
            <div id="section-140702">
              <h4>7.2 部分背包问题</h4>
              <div class="sub-contents">
                <p>物品可以部分放入背包</p>
                <p>按最大 单位重量价值 先归并排序O(nlgn)，再依次放入</p>
                <p>时间复杂度：O(nlgn)</p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('cpp')" :value="db.code_tanxin_01"></codeView>
                </div>
              </div>
            </div>
            <div id="section-140703">
              <h4>7.3 活动选择</h4>
              <div class="sub-contents">
                <p>
                  场地P的个数m，活动a的个数n，活动之间不可同时在同一场地举行，求所需最少场地数
                </p>
                <p>1.按活动的开始时间对a进行快速排序</p>
                <p>
                  2.将活动
                  <span class="txt-func">𝑎<span class="txt-sub">i</span></span>
                  的开始时间与场地
                  <span class="txt-func">𝑃<span class="txt-sub">𝑗</span></span>
                  的最后一个活动的结束时间比较，如果不冲突则放入，如果冲突则考虑下一场地或新场地
                </p>
                <div class="box-code" style="width: 700px; height: 300px">
                  <codeView :configs="codeConfig('cpp')" :value="db.code_tanxin_02"></codeView>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        <!-- 补充信息 -->
        <div class="notes">
          <div v-for="note in visibleNotes" :key="note.id" class="note-card">
            <h4>
              例题
              <i class="fa-solid fa-eye" @click="showModal('note', note)"></i>
            </h4>
            <p v-if="note.type === 'text'">{{ note.content }}</p>
            <div v-if="note.type === 'topic'">
              <noteView :data="note"></noteView>
            </div>
          </div>
        </div>
        <!-- 目录 -->
        <div class="menus">
          <ul>
            <li v-for="item in pageInfos.menus" :key="item.id" :data-id="item.id"
              :class="{ active: activeId === item.id }">
              <a @click="scrollTo(item.id)" :class="`level-${item.level}`">
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <a-modal v-model:open="noteModal" width="80vw" centered :footer="[]">
    <template #title>
      <div style="display:flex; justify-content:start; align-items:center; gap:10px;">
        <span>例题</span>
        <a-button size="small" @click="scrollTo(noteInfos.id)">索引知识点</a-button>
        <a-button size="small" @click="nextNote()">随机下一题</a-button>
      </div>
    </template>
    <div class="box-note">
      <noteView :data="noteInfos"></noteView>
    </div>
  </a-modal>
</template>

<style scoped lang="scss">
@import url("../comps/style.scss");
@import url("../comps/txt.scss");

.list-ports {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .port-item {
    padding: 10px;
    width: 180px;
    color: #fff;
    border: 1px solid #0000008d;
    border-radius: 8px;
    background: #2e3033;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    .item-name {
      padding: 2px 15px;
      width: max-content;
      color: #fff;
      font-weight: 700;
      border-radius: 30px;
      background: #00884a;
    }

    .item-type {
      font-size: 12px;
    }

    .item-infos {
      display: flex;
      align-items: center;
      gap: 10px;

      .item-icon {
        font-size: 24px;
      }

      .item-port {
        padding: 2px 15px;
        font-size: 24px;
        font-weight: 700;
        color: #fff;
        border-radius: 30px;
        background: #e43981;
      }
    }

    .item-full {
      font-size: 10px;
    }
  }
}
</style>
