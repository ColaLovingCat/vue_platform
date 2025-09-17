<script lang="ts" setup>
import { onMounted, ref, reactive, computed, watch } from 'vue'

import * as db from './ruanjian'

// name
defineOptions({
    name: 'custom-name'
})

const pageInfos = reactive({
    menus: [] as any[],
    notes: [] as any[],
})

const nos = ['A', 'B', 'C', 'D']

const contentRef = ref<HTMLElement>()

const activeId = ref<string>("")
const visibleNotes = ref<any[]>([])

onMounted(() => {
    pageInfos.notes = [...db.notes]
    refreshMenus()
    observeNotes()
})

const refreshMenus = () => {
    if (!contentRef.value) return

    const headers = contentRef.value.querySelectorAll('h1, h2, h3, h4')
    const menus: typeof pageInfos.menus = []

    headers.forEach(header => {
        // 先取自身的 id，没有的话取父级的 id
        let id = header.id || header.parentElement?.id || ""
        const text = header.textContent?.trim() || ""

        let level = 1
        switch (header.tagName.toLowerCase()) {
            case 'h1': level = 1; break
            case 'h2': level = 2; break
            case 'h3': level = 3; break
            case 'h4': level = 4; break
        }

        if (id) menus.push({ id, text, level })
    })

    pageInfos.menus = menus

    // 更新滚动监听（目录高亮）
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id
                    activeId.value = id

                    // 让对应的菜单项始终可见
                    const el = document.querySelector(`.menus li[data-id="${id}"]`)
                    if (el) {
                        el.scrollIntoView({
                            block: "nearest", // 保证只滚动到刚好可见，不会整个容器跳动
                            behavior: "smooth"
                        })
                    }
                }
            })
        },
        { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    )

    // 监听 div[id]（不监听 h1/h2/h3/h4）
    contentRef.value.querySelectorAll("div[id]").forEach(el => observer.observe(el))
}

// 监听 notes 是否在视口
const observeNotes = () => {
    if (!contentRef.value) return

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                const id = entry.target.id
                if (!id) return
                if (entry.isIntersecting) {
                    // 进入视口，加入
                    const notes = pageInfos.notes.filter(n => n.id === id)
                    if (notes) {
                        notes.map((note: any) => {
                            if (!visibleNotes.value.includes(note))
                                visibleNotes.value.push(note)
                        })
                    }
                } else {
                    // 离开视口，移除
                    visibleNotes.value = visibleNotes.value.filter(n => n.id !== id)
                }
            })
        },
        { threshold: 0.2 } // 至少 20% 出现在视口才算可见
    )

    pageInfos.notes.forEach(note => {
        const el = document.getElementById(note.id)
        if (el) observer.observe(el)
    })
}

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}
</script>

<template>
    <div class="study-contents">
        <div class="left">
            <div class="content" ref="contentRef">
                <div class="header">
                    <h1 id="main-title">软件设计师</h1>
                    <p class="desc">
                        是负责软件系统设计、架构、实现和维护的专业技术人员，其工作涵盖需求分析、系统设计、代码实现、性能优化及文档编写等软件生命周期全过程，并组织和指导程序员进行程序编写与调试。</p>
                </div>
                <h2 id="chapter-01">一、计算机系统 (3-7)</h2>
                <h3 id="part-0101">1. 中央处理单元</h3>
                <div class="part-contents">
                    <div id="section-010101">
                        <h4>1.1 CPU <i class="txt-en">Central Processing Unit</i></h4>
                        <div class="sub-contents">
                            <p><span class="txt-define">功能</span>程序控制：执行存储在内存中的指令序列、操作控制、时间控制、数据处理</p>
                            <p><span class="txt-define">组成</span>运算器、控制器、寄存器组、总线</p>
                        </div>
                    </div>
                    <div id="section-010102">
                        <h4>1.2 运算器单元(ALU) <i class="txt-en">Arithmetic and Logic Unit</i></h4>
                        <div class="sub-contents">
                            <p><span class="txt-define">功能</span>执行具体的算术运算、逻辑运算和逻辑测试，并返回结果</p>
                            <p><b>算术逻辑单元(ALU)</b> ：执行算术运算、逻辑运算</p>
                            <p><b>累加寄存器(AC)</b> <i class="txt-en">Accumulator Register</i>：为ALU提供数据和暂存运算结果</p>
                            <p><b>数据缓冲寄存器(DR)</b> ：内存<span class="txt-symbol">⇔</span>CPU之间进行数据中转</p>
                            <p><b>状态条件寄存器(PSW)</b> ：更新指令执行的状态标志和控制标志，保存和记录特定的状态信息和条件</p>
                            <img class="img-01" src="/docs/study/imgs/01-cpu.png" alt="" srcset="">
                        </div>
                    </div>
                    <div id="section-010103">
                        <h4>1.3 控制器单元(CU) <i class="txt-en">Control Unit</i></h4>
                        <div class="sub-contents">
                            <p><span class="txt-define">功能</span>生成控制信号，保证程序指令有序正确的执行并处理异常事件，实现自动化和稳定性</p>
                            <p><b>程序计数器(PC)</b> <i class="txt-en">Program Counter</i>：存储当前执行的指令地址和指令计数，指示下一条要执行的指定地址</p>
                            <p>
                                <b>指令寄存器(IR)</b> <i class="txt-en">Instruction Register</i>：内存
                                <span class="txt-symbol">⇒</span>DR<span class="txt-symbol">⇒</span>
                                IR暂存执行的指令(操作码+地址码)
                            </p>
                            <p><b>指令译码器(ID)</b> ：分析指令的操作码和操作数，确定操作类型</p>
                            <p><b>地址寄存器(AR)</b> ：保存访问的内存单元的地址</p>
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
                                        <td>10</td>
                                        <td>9</td>
                                        <td>8</td>
                                        <td>7</td>
                                        <td>6</td>
                                        <td>5</td>
                                        <td>4</td>
                                        <td>3</td>
                                        <td>2</td>
                                        <td>1</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>1024</td>
                                        <td>512</td>
                                        <td>256</td>
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
                            <p>8进制<span class="txt-symbol">⇒</span>O (0-7)</p>
                            <p><b>16进制</b><span class="txt-symbol">⇒</span>H (0-F)</p>
                            <p><span class="txt-define">转换</span>按权展开求和/整除取余 小数：相乘取整</p>
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
                            <img class="img-02" src="/docs/study/imgs/02-jinzhi.png" alt="" srcset="">
                        </div>
                    </div>
                    <div id="section-010202">
                        <h4>2.2 定点数</h4>
                        <div class="sub-contents">
                            <p><b>原码</b> 最高位为符号位，0正1负</p>
                            <p><b>反码</b> 正数相同，负数按位求反</p>
                            <p><b>补码</b> 正数相同，负数反码加1</p>
                            <p><b>移码</b> 补码符号位取反</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>码制</th>
                                        <th>-45</th>
                                        <th>定点整数</th>
                                        <th>定点小数</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>原码</td>
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
                        </div>
                    </div>
                    <div id="section-010203">
                        <h4>2.3 浮点数</h4>
                        <div class="sub-contents">
                            <p>
                                <span class="txt-define">定义</span>用 [阶符S+阶码E] + [数符+尾数F] 表示
                                <span class="txt-func">N=(-1)<span class="txt-sup">S</span>*2<span
                                        class="txt-sup">𝐸</span>∗𝐹</span>
                            </p>
                            <p>阶码决定数值范围，尾数决定精度</p>
                            <p>运算时先<b>对阶</b>：将小阶向大阶对齐，尾数右移</p>
                            <p>R位阶码移码+M位尾数补码 可表示范围:</p>
                            <img class="img-03" src="/docs/study/imgs/03-fanwei.png" alt="" srcset="">
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
                            <p><span class="txt-define">定义</span>将编码中1的个数变为奇数或偶数，可以检测 奇数个错误，码距2，不能纠错</p>
                        </div>
                    </div>
                    <div id="section-010303">
                        <h4>3.3 海明码</h4>
                        <div class="sub-contents">
                            <p><span class="txt-define">定义</span>数据位n之间的特定位置插入k个校验位。利用多组数位的奇偶性来检错和纠错</p>
                            <p>必须满足 <span class="txt-func">2<span class="txt-sup">K</span>-1 ≥ n+k</span></p>
                        </div>
                    </div>
                    <div id="section-010304">
                        <h4>3.4 循环冗余校验码(CRC) <i class="txt-en">Cyclic Redundancy Check</i></h4>
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
                                        <td>寄存器</td>
                                        <td>CPU</td>
                                    </tr>
                                    <tr>
                                        <td>Cache</td>
                                        <td>
                                            <p>SRAM 静态随机存储器</p>
                                            <p>按内容存取</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>内存(主存)</td>
                                        <td>
                                            <p>DRAM 动态随机存储器</p>
                                            <p>周期性刷新，断电丢失</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>外存(辅存)</td>
                                        <td>硬盘、光盘、U盘</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>Cache与主存之间的地址映射由<b>硬件自动</b>完成</p>
                            <p>辅存与主存之间的地址映射由<b>硬件和软件</b>结合完成</p>
                            <p>相联存储器：按<b>内容</b>存取</p>
                            <p>闪存FLASH：按<b>块</b>为单位，可代替辅存</p>
                            <p>虚拟存储器：主存+辅存</p>
                        </div>
                    </div>
                    <div id="section-010402">
                        <h4>4.2 高速缓存 Cache</h4>
                        <div class="sub-contents">
                            <p>容量与命中率：在合理成本下提高命中率</p>
                            <p>地址映像：主存地址和Cache地址的转换，是由<b>硬件自动</b>完成</p>
                            <p>替换算法：目的是提高命中率</p>
                            <p>地址映像方法<b>冲突次数</b>：全相联映像 < 组相联映像 < 直接相连映像 </p>
                        </div>
                    </div>
                    <div id="section-010403">
                        <h4>4.3 操作数寻址</h4>
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
                    <div id="section-010404">
                        <h4>4.4 分类</h4>
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
                                            <p>连接主存和外设，仅在传送开始和结束时需<b>CPU干预</b></p>
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
                            <p><span class="txt-define">定义</span>暂停当前程序，执行中断服务程序，完成后返回源程序</p>
                            <p><b>中断向量</b>：提供中断服务程序的入口地址</p>
                            <p><b>中断响应时间</b>：从发出中断请求到开始进入中断处理程序</p>
                            <p><b>保存现场</b>：返回执行源程序</p>
                            <p>保存断点和现场：堆栈</p>
                        </div>
                    </div>
                </div>
                <div id="part-0106">
                    <h3>6. 计算机体系结构 <i class="txt-en">Computer Architecture</i></h3>
                    <div class="part-contents">
                        <p>计算机体系结构：指计算机的概念性结构和功能属性</p>
                        <p>计算机体系结构的逻辑实现，包括机器内的数据流和控制流的组成以及逻辑设计等</p>
                        <p>计算机实现：计算机组织的物理实现</p>
                        <div id="section-010601">
                            <h4>6.1 Flynn分类法</h4>
                            <div class="sub-contents">
                                <p>单指令流、单数据流 SISD</p>
                                <p>单指令流、多数据流 SIMD</p>
                                <p>多指令流、单数据流 MISD</p>
                                <p>多指令流、多数据流 MIMD</p>
                            </div>
                        </div>
                        <div id="section-010602">
                            <h4>6.2 指令集架构</h4>
                            <div class="sub-contents">
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>RISC 精简指令集计算机 <i class="txt-en">Reduced</i></th>
                                            <th>CISC 复杂指令集计算机 <i class="txt-en">Complex</i></th>
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
                        <div id="section-010603">
                            <h4>6.3 流水线技术</h4>
                            <div class="sub-contents">
                                <p>执行时间：首条总时间+(n-1)*最长操作时间</p>
                                <p><b>加速比</b>：不采用和采用的时间比</p>
                                <p>操作周期：最长操作时间</p>
                                <p>吞吐率：1/最长操作时间</p>
                                <p><b>n条指令的吞吐率 TP <i class="txt-en">Though Put rate</i>：n/单条指令的执行时间+(n-1)*最长的时间段</b></p>
                                <img class="img-04" src="/docs/study/imgs/04-liushui.png" alt="" srcset="">
                            </div>
                        </div>
                        <div id="section-010604">
                            <h4>6.4 冯诺依曼结构和哈弗结构</h4>
                            <div class="sub-contents">
                            </div>
                        </div>
                    </div>
                </div>
                <h3 id="part-0107">7. 总线</h3>
                <div class="part-contents">
                    <div id="section-010701">
                        <h4>7.1 总线</h4>
                        <div class="sub-contents">
                            <p><span class="txt-define">定义</span>负责传输数据地址和控制信号，减少信号线的数量</p>
                            <p>系统总线：数据总线(双向)、地址总线(单向)、控制总线</p>
                            <p>数据总线的宽度为字长，地址总线的宽带为内存容量的指数</p>
                            <p>PCI-并行内总线 SCSI-并行外总线 RS232-串行外总线</p>
                            <p>带宽：总线的最大数据传输率</p>
                            <p>带宽=时钟频率*总线宽度/时钟周期</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-0108">8. 加密和认证技术</h3>
                <div class="part-contents">
                    <div id="section-010801">
                        <h4>8.1 加密技术和认证技术</h4>
                        <div class="sub-contents">
                            <p>窃听-加密、篡改-摘要、假冒、否认-数字签名</p>
                            <p><b>对称加密</b>：相同的密钥加解密。速度快，适合加密大量明文数据，私钥加密/共享密钥加密</p>
                            <img class="img-06" src="/docs/study/imgs/06-jiami.png" alt="" srcset="">
                            <p><b>非对称加密</b>：用接收方的公钥加密，接收方用私钥解密。高安全性，但加密解密速度慢，公钥加密</p>
                            <img class="img-07" src="/docs/study/imgs/07-jiami.png" alt="" srcset="">
                            <p><b>信息摘要</b>：将明文进行Hash算法发送信息摘要，接收方解密后对比摘要</p>
                            <img class="img-08" src="/docs/study/imgs/08-jiami.png" alt="" srcset="">
                            <p>数据完整性、一致性，不可逆，唯一性</p>
                            <p><b>数字签名</b>：结合非对称和散列函数，发送方私钥加密摘要，公钥解密</p>
                            <img class="img-09" src="/docs/study/imgs/09-jiami.png" alt="" srcset="">
                            <p><b>数字证书</b>：CA权威机构颁布，由CA的私钥加密形成数字证书</p>
                            <p>用于身份认证：用CA的公钥验证证书真伪，用发送方的公钥来验证消息的真实性</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>对称加密</td>
                                        <td>DES AES 3DES RC-5 IDEA RC4</td>
                                    </tr>
                                    <tr>
                                        <td>非对称加密</td>
                                        <td>DSA RSA ECC</td>
                                    </tr>
                                    <tr>
                                        <td>信息摘要</td>
                                        <td>Hash函数 MD5-128 SHA</td>
                                    </tr>
                                </tbody>
                            </table>
                            <img class="img-05" src="/docs/study/imgs/05-sign.png" alt="" srcset="">
                        </div>
                    </div>
                    <div id="section-010802">
                        <h4>8.2 可靠性模型</h4>
                        <div class="sub-contents">
                            <p>串联系统：<span class="txt-func">P=R<span class="txt-sub">1</span>R<span
                                        class="txt-sub">2</span>...R<span class="txt-sub">N</span></span></p>
                            <p>并联系统：<span class="txt-func">P=1-(1-R<span class="txt-sub">1</span>)(1-R<span
                                        class="txt-sub">2</span>)...(1-R<span class="txt-sub">N</span>)</span></p>
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
                            <p>解释程序：和源程序一起参与到运行过程中</p>
                            <p>脚本语言=动态语言==弱类型语言=解释型语言：PHP/Javascript/Python</p>
                            <p>编译程序：不参与运行，生成源程序的目标程序，进行优化</p>
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
                                        <td>字符串/整型/浮点值/布尔值/数组等，合理分配存储单元；表达式计算的合法性检查；规定取值范围</td>
                                    </tr>
                                    <tr>
                                        <td>运算符</td>
                                        <td>算术、逻辑、比较、赋值</td>
                                    </tr>
                                    <tr>
                                        <td>控制结构</td>
                                        <td>顺序、选择 if-else/switch-case、循环 for/do-while、跳转 continue/break</td>
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
                                        <td>传值调用和传址调用</td>
                                    </tr>
                                </tbody>
                            </table>
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
                            <p><b>词法分析</b> <i class="txt-en">Lexical Analysis</i>：线性分解源程序为词法单元 <i
                                    class="txt-en">Token</i> 序列(关键字/标识符/常数/运算符/分隔符)，以及字符符号是否符合规定</p>
                            <p><b>语法分析</b> <i class="txt-en">Parsing</i>：构建语法树，检查所有语法错误，进行结构分析。如缺少右括号，没有分号等</p>
                            <p>自上而下 递归向下/预测分析 自下而上 移进-归约/算符优先</p>
                            <p><b>语义分析</b> <i class="txt-en">Semantic
                                    Analysis</i>：只能检查静态语义错误，进行类型分析和检查。如变量未声明、重复声明，函数参数类型不对等</p>
                            <p><b>中间代码生成</b> <i class="txt-en">Intermediate Code
                                    Generation</i>：有后缀式、三元式、四元式、三地址码、树图等。有利于进行与具体机器无关的优化处理和可移植性</p>
                            <p>代码优化 <i class="txt-en">Optimization</i></p>
                            <p><b>目标代码生成</b> <i class="txt-en">Code Generation</i>：与目标机器的体系结构相关，包含分配寄存器，指令选择、代码布局等</p>
                            <p><b>符号表管理</b>：不断收集记录和使用的相关符号类型和特征等必要信息，辅助语义的正确性检查和代码生成</p>
                            <p>出错处理</p>
                            <img class="img-11" src="/docs/study/imgs/11-bianyi.png" alt="" srcset="">
                        </div>
                    </div>
                    <div id="section-020203">
                        <h4>2.3 正规式</h4>
                        <div class="sub-contents">
                            <p>例：由a、b构造且仅包含偶数个a的串的集合
                                <span class="txt-func">(b<span class="txt-sup">*</span>(ab<span
                                        class="txt-sup">*</span>a))<span class="txt-sup">*</span></span>
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
                                        <td><span class="txt-func">a<span class="txt-sup">*</span></span></td>
                                        <td>闭包，任意个元素，包含空集：{Φ,a,aa,aaa,...}</td>
                                    </tr>
                                    <tr>
                                        <td><span class="txt-func">(a|b)<span class="txt-sup">*</span></span></td>
                                        <td>任意个可选元素：{Φ,a,b,aa,ab,bb,aaa,...}</td>
                                    </tr>
                                    <tr>
                                        <td><span class="txt-func">a(a|b)<span class="txt-sup">*</span></span></td>
                                        <td>以a为开头：{a,aa,ab,aaa,...}</td>
                                    </tr>
                                    <tr>
                                        <td><span class="txt-func">(a|b)<span class="txt-sup">*</span>abb</span></td>
                                        <td>以abb为结尾：{aabb,babb,aaabb,ababb,...}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="section-020204">
                        <h4>2.4 有限自动机</h4>
                        <div class="sub-contents">
                            <p>词法分析的工具，正确识别正规集</p>
                            <p>确定的有限自动机 (DFA)</p>
                            <p>不确定的有限自动机 (NFA)：状态转移不确定</p>
                            <p>下图可表示以1为结尾的正规集</p>
                            <img class="img-12" src="/docs/study/imgs/12-youxian.png" alt="" srcset="">
                        </div>
                    </div>
                    <div id="section-020205">
                        <h4>2.5 上下文无关文法 CFG</h4>
                        <div class="sub-contents">
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
                            <p>逆运算：从左向右，遇到数字入栈，遇到运算符取两个数字进行运算</p>
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
                <h2 id="chapter-03">数据结构</h2>
                <h2 id="chapter-04">四、知识产权</h2>
                <h3 id="part-0401">1. 知识产权</h3>
                <div class="part-contents">
                    <div id="section-040101">
                        <h4>1.1 概念</h4>
                        <div class="sub-contents">
                            <p><span class="txt-define">特征</span>无形性、专有性、<b>地域性</b>、时间性、可复制性</p>
                            <p>地域性：仅在授权国家或地区管辖范围内有效，需在不同国家或地区分别申请</p>
                            <p>许可使用：独占(自己也不能用)、独家(排他)、普通、强制、法定</p>
                            <p>翻译权：重构</p>
                            <p>烟草必须使用注册商标</p>
                            <p>工业产权：专利权、商标权、地理标志、工业品外观设计、集成电路布图设计</p>
                        </div>
                    </div>
                    <div id="section-040102">
                        <h4>1.2 著作权</h4>
                        <div class="sub-contents">
                            <p><b>人身权</b>包括：发表权(终生+死亡后50年)、署名权、修改权和作品完整权；其余为财产权(受时间限制)</p>
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
                            <p>商标注册：先注册先得，同时注册先使用先得，同时注册使用需协商</p>
                            <p>商标时间性：保护期10年，到期6个月申请延续10年，可无限延续</p>
                        </div>
                    </div>
                    <div id="section-040105">
                        <h4>1.5 商业秘密权</h4>
                        <div class="sub-contents">
                            <p>《反不正当竞争法》</p>
                            <p>指不为公众所知悉，未公开的、能为权利人带来经济利益、具有实用性并经权利人采取保密措施的技术信息和经营信息</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-0402">2. 计算机软件著作权</h3>
                <div class="part-contents">
                    <div id="section-040201">
                        <h4>2.1 概念</h4>
                        <div class="sub-contents">
                            <p>主体：享有著作权的人 (公民、法人、其他组织)</p>
                            <p>《中华人民共和国著作权法》 (人大) 和《计算机软件保护条例》(国务院) 规定</p>
                            <p>客体：计算机程序 (源程序+目标程序) 及其 有关软件文档 (程序设计说明书、流程图和用户手册等)</p>
                            <p>侵权：甲擅自复制乙发表的OA软件售卖，丙公司未知情下购买使用</p>
                        </div>
                    </div>
                    <div id="section-040202">
                        <h4>2.2 权利</h4>
                        <div class="sub-contents">
                            <p>人身权 = 发表权 + 开发者身份权(署名权，无时间限制)</p>
                            <p>财产权 = 使用、复制、修改、发行、翻译、注释、传播、出租、使用获利等</p>
                            <p>保护期：软件开发完成之日 +50年，除<b>开发者身份权</b>外其余权力全部终止</p>
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
                <h2 id="chapter-05">数据库</h2>
                <h2 id="chapter-06">面向对象</h2>
                <h2 id="chapter-07">UML</h2>
                <h2 id="chapter-08">设计模式</h2>
                <h2 id="chapter-09">九、操作系统 <i class="txt-en">Operating System</i></h2>
                <h3 id="part-0901">1. 概述</h3>
                <div class="part-contents">
                    <div id="section-090101">
                        <h4>1.1 概述</h4>
                        <div class="sub-contents">
                            <p><span class="txt-define">地位</span>应用软件、系统软件、操作系统、计算机硬件</p>
                            <p><span class="txt-define">特征</span>并发性、共享性、虚拟性、不确定性</p>
                            <p><span class="txt-define">分类</span>批处理、分时、实时、网络、分布式、微机、嵌入式</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-0902">2. 进程管理</h3>
                <div class="part-contents">
                    <div id="section-090201">
                        <h4>2.1 概念</h4>
                        <div class="sub-contents">
                            <p>线程 <i class="txt-en">Thread</i>：CPU可独立调度和分配的最小单位</p>
                            <p>可与同属一个进程的其他线程共享进程所拥有的全部资源，线程与线程之间是不可见的</p>
                            <p>进程 <i class="txt-en">Process</i>：资源分配的最小单位，系统执行的独立单元，由程序、数据、程序控制块(PCB) 组成</p>
                            <p>三态模型：就绪
                                <i class="txt-en">Ready</i>、运行
                                <i class="txt-en">Running</i>、阻塞
                                <i class="txt-en">Waiting/Blocked</i>
                            </p>
                            <img class="img-14" src="/docs/study/imgs/14-santai.png" alt="" srcset="">
                            <p>五态模型：创建
                                <i class="txt-en">New</i>、终止
                                <i class="txt-en">Terminated</i>
                            </p>
                        </div>
                    </div>
                    <div id="section-090202">
                        <h4>2.2 前驱图 <i class="txt-en">Precedence Graph</i></h4>
                        <div class="sub-contents">
                            <p>表示和描述进程之间的先后顺序和执行的依赖关系</p>
                            <p>顺序执行：顺序性/封闭性/可再现性</p>
                            <p>并发执行：无封闭性，相互制约</p>
                        </div>
                    </div>
                    <div id="section-090203">
                        <h4>2.3 同步与互斥</h4>
                        <div class="sub-contents">
                            <p>同步：合作进程间的直接制约</p>
                            <p>互斥：申请临界资源间的间接制约</p>
                        </div>
                    </div>
                    <div id="section-090204">
                        <h4>2.4 信号量PV操作与前驱图</h4>
                        <div class="sub-contents">
                            <p>临界资源：各进程间需要以互斥方式对其进行访问的资源</p>
                            <p>临界区 <i class="txt-en">Critical Section</i>：共享资源访问代码区段</p>
                            <p>整型信号量：公用信号量-互斥1/私用信号量-同步</p>
                            <p>信号量S <i class="txt-en">Semaphore</i>：正数为可用资源数，负数的绝对值为等待资源数</p>
                            <img class="img-16" style="width: 250px;" src="/docs/study/imgs/16-pv.png" alt="" srcset="">
                            <p>执行前等待资源P(S)减，S≤0则等待</p>
                            <p>执行后释放资源V(S)加，S≤0则唤醒</p>
                            <img class="img-17" style="width: 250px;" src="/docs/study/imgs/17-pv.png" alt="" srcset="">
                            <p>信号量S的编号，由(12,13,23,34)排序决定</p>
                            <p>实现互斥：在临界区中执行PV，确保同一时间内仅有一个进程在临界区中</p>
                            <p>实现同步：<b>生产者消费者问题</b></p>
                        </div>
                    </div>
                    <div id="section-090205">
                        <h4>2.5 生产者消费者模式 <i class="txt-en">Producer-Consumer Pattern</i></h4>
                        <div class="sub-contents">
                            <p>通过<b>共享缓冲区</b> <i class="txt-en">Bounded Buffer</i> 实现生产线程与消费线程的解耦</p>
                            <p>容量为1的缓冲区</p>
                            <img class="img-18" style="width: 300px;" src="/docs/study/imgs/18-pv.png" alt="" srcset="">
                            <p>容量为n的缓冲区</p>
                            <p>缓冲区+互斥信号量S+同步信号量(S1可放产品数n+S2产品数0)</p>
                            <p>生产者：P(S1)>P(S)>V(S)>V(S2)</p>
                            <p>消费者：P(S2)>P(S)>V(S)>V(S1)</p>
                        </div>
                    </div>
                    <div id="section-090206">
                        <h4>2.6 死锁</h4>
                        <div class="sub-contents">
                            <p><span class="txt-define">条件</span>互斥、保持和等待、不剥夺、环路等待</p>
                            <p>同类资源分配不当引起死锁，所需资源数 <span class="txt-func">m≥n*(k-1)+1</span></p>
                            <p>系统采用轮流分配资源，资源数m小于进程所需资源总数n*k</p>
                            <p>死锁处理：避免策略-<b>银行家算法</b></p>
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
                            <p>P进程，R资源：R->P 代表资源R已分配给进程P，P->R 代表进程P还需要请求资源R</p>
                            <img class="img-15" src="/docs/study/imgs/15-ziyuan.png" alt="" srcset="">
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
                            <p>页面变换表：页号+物理块号(页帧号)</p>
                            <p>逻辑地址转换物理地址</p>
                            <p>十六进制 1C20H => 页号1+页内地址C20(12位) => 物理块号3+C20</p>
                        </div>
                    </div>
                    <div id="section-090302">
                        <h4>3.2 页面置换算法</h4>
                        <div class="sub-contents">
                            <p>时间局限性：循环操作。如果程序中的某条指令一旦被执行，则不久的将来该指令可能再次被执行</p>
                            <p>空间局限性：顺序存储。指一旦程序访问了某个存储单元，则在不久的将来，其附近的存储单元也最有可能被访问</p>
                            <p>最近最少使用算法：局部性原理</p>
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
                            <p>地址结构：段号s+段内页号p+页内地址w</p>
                            <img class="img-20" style="width: 400px;" src="/docs/study/imgs/20-cunchu.png" alt=""
                                srcset="">
                            <p>最多有2^𝑠段，每个段最大允许有2^𝑝页，页的大小为4K(=2^2* 2^10)</p>
                            <p>段表+页表来实现地址映射</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-0904">4. 设备管理</h3>
                <div class="part-contents">
                    <div id="section-090401">
                        <h4>4.1 设备分类</h4>
                        <div class="sub-contents">
                        </div>
                    </div>
                    <div id="section-090402">
                        <h4>4.2 输入输出</h4>
                        <div class="sub-contents">
                            <img class="img-21" style="width: 450px;" src="/docs/study/imgs/21-shebei.png" alt=""
                                srcset="">
                        </div>
                    </div>
                    <div id="section-090403">
                        <h4>4.3 虚设备与Spooling技术</h4>
                        <div class="sub-contents">
                            <p>输入T>传送M>处理C</p>
                            <p>单缓冲区：(T+M)*(n-1)+(T+M+C)</p>
                            <img class="img-24" style="width: 450px;" src="/docs/study/imgs/24-shebei.png" alt=""
                                srcset="">
                            <p>双缓冲区：T*(n-1)+(T+M+C)</p>
                            <img class="img-25" style="width: 450px;" src="/docs/study/imgs/25-shebei.png" alt=""
                                srcset="">
                        </div>
                    </div>
                    <div id="section-090404">
                        <h4>4.4 磁盘结构</h4>
                        <div class="sub-contents">
                            <p>磁盘有正反两个盘面，每个盘面有多个同心圆，每个同心圆是一个磁道，每个同心圆又被划分为多个扇区</p>
                            <p>先寻找对应磁道，再等待周期旋转至指定扇区，产生寻道时间和等待时间</p>
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
                                        <td>扫描算法 (SCAN)</td>
                                        <td>先访问同一方向的</td>
                                    </tr>
                                    <tr>
                                        <td>单向扫描调度算法 (CSCAN)</td>
                                        <td>转向时访问极值</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div id="section-090406">
                        <h4>4.6 旋转调度算法</h4>
                        <div class="sub-contents">
                            <p>旋转速度20ms/圈，处理时间4ms，扇区数10 =(2+4)*10+(10-4/2)*2*(10-1)</p>
                            <p>旋转一个扇区所需时间为 20ms/10=2ms，处理一个扇区的同时磁头移动了 4ms/2ms=2个扇区</p>
                            <img class="img-22" style="width: 200px;" src="/docs/study/imgs/22-shebei.png" alt=""
                                srcset="">
                            <p>修改顺序来优化 =(2+4)*10</p>
                            <img class="img-23" style="width: 200px;" src="/docs/study/imgs/23-shebei.png" alt=""
                                srcset="">
                            <p>磁道距离*移动速度+延迟+传输</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-0905">5. 文件管理</h3>
                <div class="part-contents">
                    <div id="section-090501">
                        <h4>5.1 索引文件</h4>
                        <div class="sub-contents">
                            <p>索引表<地址项><span class="txt-symbol">⇔</span>磁盘<磁盘数据块>
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
                        <h4>5.2 树形文件</h4>
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
                            <p>位示图 <i class="txt-cn">bitmap</i>：对每个物理空间用一位标识，1则使用，0则空闲</p>
                            <p>逻辑编号 0/1字 代表物理块 0~31位 32*(n+1)-1</p>
                            <p>求所需位示图的字大小</p>
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
                        <div class="sub-contents">
                        </div>
                    </div>
                    <div id="section-090603">
                        <h4>6.3 用户界面</h4>
                        <div class="sub-contents">
                        </div>
                    </div>
                </div>
                <h2 id="chapter-10">十、结构化开发</h2>

                <h2 id="chapter-11">十一、软件工程</h2>
                <h3 id="part-1101">1. 软件开发模型</h3>
                <div class="part-contents">
                    <div id="section-110101">
                        <h4>1.1 瀑布模型</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                    <div id="section-110102">
                        <h4>1.2 V模型</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                    <div id="section-110103">
                        <h4>1.3 增量模型</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                    <div id="section-110104">
                        <h4>1.4 演化模型-原型模型</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                    <div id="section-110105">
                        <h4>1.5 演化模型-螺旋模型</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                    <div id="section-110106">
                        <h4>1.6 喷泉模型</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                    <div id="section-110107">
                        <h4>1.7 统一过程模型 (UP/RUP)</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-1102">2. 软件开发方法</h3>
                <div class="part-contents">
                    <div id="section-110201">
                        <h4>2.1 方法</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-1103">3. 软件需求分析</h3>
                <div class="part-contents">
                    <div id="section-110301">
                        <h4>3.1 需求分析</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-1104">4. 软件设计</h3>
                <div class="part-contents">
                    <div id="section-110401">
                        <h4>4.1 需求分析</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-1105">5. 软件测试</h3>
                <div class="part-contents">
                    <div id="section-110501">
                        <h4>5.1 需求分析</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-1106">6. 软件维护</h3>
                <div class="part-contents">
                    <div id="section-110601">
                        <h4>6.1 需求分析</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
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
                                        <td>软件过程的特点是杂乱无章，有时甚至很混，几乎没有明确定义的步骤，项目的成功完全依赖个人努力和英雄式核心任务的作用</td>
                                    </tr>
                                    <tr>
                                        <td>可重复级</td>
                                        <td>建立了基本的项目管理过程和实践来跟踪项目费用、进度和功能特性，有必要的过程准则来重复以前在同类项目中的成功</td>
                                    </tr>
                                    <tr>
                                        <td>已定义级</td>
                                        <td>管理和工程两方面的软件过程已文档化、标准化，并综合成整个软件开发组织的标准软件过程。所有项目都采用根据实际情况修改后得到的标准软件过程来开发和维护软件
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>已管理级</td>
                                        <td>指定了软件过程和产品质量的详细度量标准。软件过程的产品质量都被开发组织的成员所理解和控制</td>
                                    </tr>
                                    <tr>
                                        <td>优化级</td>
                                        <td>加强了定量分析，通过来自过程质量反馈和来自新观念、新技术的反馈使过程能不断持续地改进</td>
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
                                        <td>过程域未执行或未得到CL1中定义的目标</td>
                                    </tr>
                                    <tr>
                                        <td>已执行级</td>
                                        <td>CL1</td>
                                        <td>其共性目标是过程将可标识的输入工作产品转换成可标识的输出工作产品，已实现支持过程域的特定目标</td>
                                    </tr>
                                    <tr>
                                        <td>已管理级</td>
                                        <td>CL2</td>
                                        <td>其共性目标集中于已管理的过程的制度化，针对单个过程实例的额能力</td>
                                    </tr>
                                    <tr>
                                        <td>已定义级</td>
                                        <td>CL3</td>
                                        <td>其共性目标集中于已定义的过程的制度化，关注过程的组织标准化和部署</td>
                                    </tr>
                                    <tr>
                                        <td>定量管理级</td>
                                        <td>CL4</td>
                                        <td>其共性目标集中于可定量管理的过程的制度化</td>
                                    </tr>
                                    <tr>
                                        <td>优化级</td>
                                        <td>CL5</td>
                                        <td>使用量化手段改变和优化过程域，以满足客户要求的改变和持续改进计划中的过程域的功效</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <h3 id="part-1108">8. 软件项目管理</h3>
                <div class="part-contents">
                    <p>整合管理、范围管理、时间管理、成本管理、质量管理、人力资源管理、通信管理、风险管理、采购管理、相关方管理</p>
                    <div id="section-110801">
                        <h4>8.1 时间管理</h4>
                        <div class="sub-contents">
                            <p>甘特图/<b>Gantt图</b></p>
                            <img class="img-28" style="width: 250px;" src="/docs/study/imgs/28-gantt.png" alt=""
                                srcset="">
                            <p>能够清晰地描述每个任务从何时开始、到何时结束，任务的进展情况以及各个任务之间的并行性。但是它不能清晰地反映出各任务之间的依赖关系，难以确定整个项目的关键所在，也不能反映计划中有潜力的部分
                            </p>
                            <p>项目计划评审技术图/<b>PERT图</b>：不能反映任务之间的并行关系</p>
                            <img class="img-27" style="width: 150px;" src="/docs/study/imgs/27-pert.png" alt=""
                                srcset="">
                            <p>正推取大值，反推取小值</p>
                            <p>松弛时间：最迟-最早</p>
                            <p>关键路径：项目的最短工期</p>
                            <p><b>项目活动图</b>：里程碑、活动、活动时间</p>
                            <img class="img-26" style="width: 380px;" src="/docs/study/imgs/26-pert.png" alt=""
                                srcset="">
                            <p>画项目活动图</p>
                        </div>
                    </div>
                    <div id="section-110801">
                        <h4>8.1 风险管理</h4>
                        <div class="sub-contents">
                            <p><span class="txt-define">特性</span>不确定性、损失</p>
                            <p><span class="txt-define">分类</span>项目风险、技术风险、商业风险</p>
                            <p>风险识别：建立风险条目检查表</p>
                            <p>风险预测：风险暴露=发生概率*影响后果(本质、范围、时间)</p>
                            <p>风险评估：定义风险参照水准，成本、进度、性能</p>
                            <p>风险控制：风险避免(主动)、风险监控、RMMM计划/风险管理策略</p>
                            <p>风险曝光度 <i class="txt-en">Risk Exposure</i>：计算方法是风险出现的概率乘以风险可能造成的损失</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-1109">9. 软件质量保证</h3>
                <div class="part-contents">
                    <div id="section-110901">
                        <h4>9.1 功能性</h4>
                        <div class="sub-contents">
                            <p>适合性、准确性、互用性、依从性、安全性</p>
                        </div>
                    </div>
                    <div id="section-110902">
                        <h4>9.2 可靠性</h4>
                        <div class="sub-contents">
                            <p>成熟性、容错性、易恢复性</p>
                        </div>
                    </div>
                    <div id="section-110903">
                        <h4>9.3 易使用性</h4>
                        <div class="sub-contents">
                            <p>易理解性、易学性、易操作性</p>
                        </div>
                    </div>
                    <div id="section-110904">
                        <h4>9.4 效率</h4>
                        <div class="sub-contents">
                            <p>时间特性、资源特性</p>
                        </div>
                    </div>
                    <div id="section-110905">
                        <h4>9.5 可维护性</h4>
                        <div class="sub-contents">
                            <p>易分析性、易改变性、易测试性、稳定性</p>
                        </div>
                    </div>
                    <div id="section-110906">
                        <h4>9.6 可移植性</h4>
                        <div class="sub-contents">
                            <p>适应性、一致性、易安装性、易替换性</p>
                        </div>
                    </div>
                </div>
                <h2 id="chapter-12">十二、信息安全</h2>
                <h3 id="part-1201">1. 安全保障</h3>
                <div class="part-contents">
                    <div id="section-120101">
                        <h4>1.1 各网络层次</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                    <div id="section-120102">
                        <h4>1.2 网络安全</h4>
                        <div class="sub-contents">
                            <p>SSL(安全套接层)：传输层安全协议。端口号443</p>
                            <p>TLS(传输层安全协议)：是SSL3.0的后续版本</p>
                            <p>HTTPS：使用SSL加密算法的HTTP</p>
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
                            <p>数据库容灾：异地备用数据接管无法正常工作的数据库，确保服务正常运行和信息安全转移。属于系统安全和应用安全</p>
                            <p>信息安全：机密性(读)、完整性(改)、可用性、可控性、可审查性</p>
                            <p>公共端口号：0-1023</p>
                        </div>
                    </div>
                    <div id="section-120103">
                        <h4>1.3 防火墙</h4>
                        <div class="sub-contents">
                            <p>内网、DMZ/隔离区/非军事化区-放置公用服务器、外网</p>
                            <p>发展阶段：包过滤、应用代理网关、状态检测技术</p>
                            <p>包过滤：处于网络层和数据链路层 TCP-IP</p>
                            <p>优点：对用户完全透明，低水平控制</p>
                            <p>缺点：无法防范黑客攻击，不支持应用层协议</p>
                            <p>应用代理网关：经过应用代理软件转发</p>
                            <p>优点：可以检测应用层、网络层和传输层，检测能力强</p>
                            <p>缺点：处理速度慢</p>
                            <p>防火墙工作层次越高，工作效率越低，安全性越高</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-1202">2. 网络威胁与攻击</h3>
                <div class="part-contents">
                    <div id="section-120201">
                        <h4>2.1 病毒</h4>
                        <div class="sub-contents">
                            <p><span class="txt-define">特征</span>传播性、隐蔽性、感染性、潜伏性、触发性、破坏性</p>
                            <p><span class="txt-define">类型</span>蠕虫病毒、特洛伊木马、后门病毒、宏病毒</p>
                            <p>宏病毒：文本文档、电子表格等</p>
                        </div>
                    </div>
                    <div id="section-120202">
                        <h4>2.2 网络攻击</h4>
                        <div class="sub-contents">
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
                <h2 id="chapter-13">十三、计算机网络</h2>
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
                                        <td>将比特流封装为帧 <i class="txt-en">Frame</i>，进行物理寻址(MAC地址)，CRC校验</td>
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
                                            <div class="list-prots" style="width: 400px;">
                                                <div class="prot-item">
                                                    <div class="item-name">POP3 <span class="item-port">110</span></div>
                                                    <div class="item-desc">邮件收取</div>
                                                </div>
                                                <div class="prot-item">
                                                    <div class="item-name">SMTP <span class="item-port">25</span></div>
                                                    <div class="item-desc">邮件传输</div>
                                                </div>
                                                <div class="prot-item">
                                                    <div class="item-name">IMAP <span class="item-port">143</span></div>
                                                    <div class="item-desc">邮件传输</div>
                                                </div>
                                                <div class="prot-item">
                                                    <div class="item-name">HTTP <span class="item-port">80</span></div>
                                                    <div class="item-desc">网页传输</div>
                                                </div>
                                                <div class="prot-item">
                                                    <div class="item-name">HTTPS <span class="item-port">443</span>
                                                    </div>
                                                    <div class="item-desc">网页安全传输</div>
                                                </div>
                                                <div class="prot-item">
                                                    <div class="item-name">FTP <span class="item-port">数据 20/控制
                                                            21</span>
                                                    </div>
                                                    <div class="item-desc">文件传输</div>
                                                </div>
                                                <div class="prot-item">
                                                    <div class="item-name">SSH <span class="item-port">22</span>
                                                    </div>
                                                    <div class="item-desc">远程登录</div>
                                                </div>
                                                <div class="prot-item">
                                                    <div class="item-name">Telnet <span class="item-port">23</span>
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
                                            <div class="list-prots" style="width: 400px;">
                                                <div class="prot-item">
                                                    <div class="item-name">DNS <span class="item-port">53</span></div>
                                                    <div class="item-desc">域名解析过程</div>
                                                </div>
                                                <div class="prot-item">
                                                    <div class="item-name">DHCP <span class="item-port">67</span>
                                                    </div>
                                                    <div class="item-desc">动态IP分配</div>
                                                </div>
                                                <div class="prot-item">
                                                    <div class="item-name">TFTP <span class="item-port">69</span></div>
                                                    <div class="item-desc">简单文件传输</div>
                                                </div>
                                                <div class="prot-item">
                                                    <div class="item-name">SNMP <span class="item-port">161</span></div>
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
                        </div>
                    </div>
                    <div id="section-130202">
                        <h4>2.2 传输层协议</h4>
                        <div class="sub-contents">
                            <p>都基于IP协议的传输层协议，可以端口寻址</p>
                            <p>TCP：提供了一个可靠的、面向连接的、全双工的数据传输服务</p>
                            <p>可靠传输，连接管理，差错检验和重传，流量控制(可变大小的滑动窗口协议)，拥塞控制</p>
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
                            <p>ARP：地址解析协议，IP转MAC，局域网通信，广播发送请求，单播应答响应</p>
                            <p>RARP：反地址解析协议，MAC转IP，被DHCP取代</p>
                        </div>
                    </div>
                    <div id="section-130203">
                        <h4>2.3 应用层协议</h4>
                        <div class="sub-contents">
                            <p>DHCP：动态主机配置协议，集中管理/分配IP地址</p>
                            <p>客户机/服务器模型</p>
                            <p>客户端可从服务器获取本机IP地址、DNS服务器地址、DHCP服务器地址和默认网关地址</p>
                            <p>DHCP无效地址：169.254.x.x(Win)/0.0.0.0(Linux)</p>
                            <p>DNS：域名解析</p>
                            <p>主机向本地域名服务器的查询采用递归查询：服务器必须回答目标IP与域名的映射关系</p>
                            <p>本地域名服务器向根域名服务器的查询采用迭代查询：服务器收到一次迭代查询回复一次结果。结果可能为其他DNS服务器的地址</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-1303">3. 计算机网络分类</h3>
                <div class="part-contents">
                    <div id="section-130301">
                        <h4>3.1 按分布范围分</h4>
                        <div class="sub-contents">
                            <p>局域网 LAN</p>
                            <p>域域网 MAN</p>
                            <p>广域网 WAN</p>
                            <p>因特网</p>
                        </div>
                    </div>
                    <div id="section-130302">
                        <h4>3.2 按拓扑结构分</h4>
                        <div class="sub-contents">
                            <p>总线型</p>
                            <p>星型</p>
                            <p>环型</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-1304">4. 网络规划与设计</h3>
                <div class="part-contents">
                    <div id="section-130401">
                        <h4>4.1 逻辑网络设计</h4>
                        <div class="sub-contents">
                            <p>xxx</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-1305">5. IP地址</h3>
                <div class="part-contents">
                    <div id="section-130501">
                        <h4>5.1 概念</h4>
                        <div class="sub-contents">
                            <p>IP地址中，全0代表的是网络，全1代表的是广播</p>
                            <p>分为 网络地址+主机地址</p>
                            <p>子网掩码：A类占8位，B类占16位，C类占24位</p>
                        </div>
                    </div>
                    <div id="section-130502">
                        <h4>5.2 子网划分</h4>
                        <div class="sub-contents">
                            <p>例：将B类IP地址168.195.0.0划分为27个子网，子网掩码为多少</p>
                            <p>B类地址则前16位是网络号，后16位会主机号。需要取5个主机位(32>27)。</p>
                            <p>则子网掩码为 1111 1111 1111 1111 1111 1000 0000 0000 即 255.255.248.0</p>
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
                        <h4>6.2 Web</h4>
                        <div class="sub-contents">
                            <p>HTTP状态码：200/404/500</p>
                            <p>URL：协议名://主机名.域名.域名后缀.域名分类/目录/网页</p>
                            <p>组织模式：com/edu/net</p>
                            <p>顶级域：cn/tw/uk/jp</p>
                            <p>浏览器输入地址：本地hosts文件>本地DNS缓存>本地DNS服务器>根域名服务器>顶级域名服务器>权限域名服务器</p>
                            <p>主域名服务器：本地DNS缓存>本地hosts文件>本地数据库>转发域服务器</p>
                            <p>输入网址>URL解析>检查缓存>DNS查询，获取目标IP></p>
                            <p>建立TCP连接三次握手>TLS/SSL握手>浏览器发送请求报文>服务器处理请求，返回响应报文>浏览器解析响应并渲染页面>断开连接</p>
                        </div>
                    </div>
                    <div id="section-130603">
                        <h4>6.3 网络接入技术</h4>
                        <div class="sub-contents">
                            <p>Wifi</p>
                            <p>蓝牙 <i class="txt-en">Bluetooth</i> 覆盖范围最小，通信距离最短</p>
                            <p>红外</p>
                            <p>WAPI</p>
                        </div>
                    </div>
                    <div id="section-130604">
                        <h4>6.4 Windows命令</h4>
                        <div class="sub-contents">
                            <p>ipconfig/release：释放</p>
                            <p>ipconfig/flushdns：清除/刷新本地DNS缓存</p>
                            <p>ipconfig/displaydns：显示本地DNS</p>
                            <p>ipconfig/registerdns：注册</p>
                            <p>ipconfig：显示网络适配器</p>
                            <p>ipconfig/all：显示TCP/IP配置信息，包括DHCP</p>
                            <p>ipconfig/renew：重新申请IP地址</p>
                            <p>ping：127.0.0.1>本机IP>默认网关>远程主机</p>
                            <p>msconfig：Win配置的应用程序</p>
                            <p>cmd：命令提示符</p>
                            <p>tracert：路由跟踪实用程序</p>
                            <p>traceroute：追踪数据包从源到目的地在IP网络上的路径</p>
                            <p>netstat：显示网络连接、路由表和网络接口信息</p>
                            <p>nslookup：域名查询</p>
                        </div>
                    </div>
                    <div id="section-130605">
                        <h4>6.5 补充</h4>
                        <div class="sub-contents">
                            <p>Linux根目录：/</p>
                            <p>chmod：更新文件权限</p>
                            <p>帧中继：高速分组交换技术</p>
                            <p>VLAN</p>
                            <p>层次化局域网模型：核心层、汇聚层、接入层</p>
                        </div>
                    </div>
                </div>
                <h2 id="chapter-14">算法</h2>
            </div>
        </div>
        <div class="right">
            <!-- 补充信息 -->
            <div class="notes">
                <div v-for="note in visibleNotes" :key="note.id" class="note-card">
                    <h4>[{{ note.title }}]</h4>
                    <p v-if="note.type === 'text'">{{ note.content }}</p>
                    <div v-if="note.type === 'topic'">
                        <p class="question">{{ note.question }}</p>
                        <template v-if="note.imgs.length > 0">
                            <img v-for="img in note.imgs" :src="`/docs/study/imgs/${img}`" alt="" srcset="">
                        </template>
                        <div class="list-opts" v-for="opts in note.options">
                            <div class="opt-item" v-for="(opt, index) in opts">
                                {{ nos[index] }}. {{ opt }}
                            </div>
                        </div>
                        <details>
                            <summary>查看答案</summary>
                            <p class="answer">{{ note.answer }}</p>
                        </details>
                    </div>
                </div>
            </div>
            <!-- 目录 -->
            <div class="menus">
                <ul>
                    <li v-for="item in pageInfos.menus" :key="item.id" :data-id="item.id"
                        :class="{ active: activeId === item.id }">
                        <a @click="scrollTo(item.id)" :class="`level-${item.level}`">{{ item.text }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import url('./style.scss');

img {
    height: unset;
}

.img-01 {
    position: absolute;
    top: 0;
    right: 20px;
    width: 320px;
}

.img-02 {
    position: absolute;
    top: 0;
    right: 20px;
    width: 150px;
}

.img-03 {
    width: 350px;
}

.img-04 {
    position: absolute;
    top: 0;
    right: 20px;
    width: 450px;
}

.img-05 {
    position: absolute;
    top: 0;
    right: 20px;
    width: 200px;
}

.img-06,
.img-07,
.img-08,
.img-09 {
    width: 400px;
}

.img-11 {
    position: absolute;
    top: 0;
    right: 20px;
    width: 380px;
}

.img-12 {
    width: 300px;
}

.img-13 {
    position: absolute;
    top: 0;
    right: 20px;
    width: 250px;
}

.img-14 {
    width: 250px;
}

.img-15 {
    width: 320px;
}
</style>
