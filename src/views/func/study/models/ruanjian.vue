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
                        <h4>1.2 运算器单元(ALU) <i class="txt-en"></i></h4>
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
                            <p>8进制<span class="txt-symbol">⇒</span>O (0-7)</p>
                            <p><b>16进制</b><span class="txt-symbol">⇒</span>H (0-F)</p>
                            <p><span class="txt-define">转换</span>按权展开求和/整除取余 小数：相乘取整</p>
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
                                        <th>定点整数</th>
                                        <th>定点小数</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>原码</td>
                                        <td>
                                            <span class="txt-func">-(2<span class="txt-sup">n-1</span>-1)</span>
                                            ~
                                            <span class="txt-func">2<span class="txt-sup">n-1</span>-1</span>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>反码</td>
                                        <td>
                                            <span class="txt-func">-(2<span class="txt-sup">n-1</span>-1)</span>
                                            ~
                                            <span class="txt-func">2<span class="txt-sup">n-1</span>-1</span>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>补码</td>
                                        <td>
                                            <span class="txt-func">-2<span class="txt-sup">n-1</span></span>
                                            ~
                                            <span class="txt-func">2<span class="txt-sup">n-1</span>-1</span>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>移码</td>
                                        <td>
                                            <span class="txt-func">-2<span class="txt-sup">n-1</span></span>
                                            ~
                                            <span class="txt-func">2<span class="txt-sup">n-1</span>-1</span>
                                        </td>
                                        <td></td>
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
                            <p><b>码距</b>:两个编码之间至少有多少个二进制位不同</p>
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
                            <p><span class="txt-define">定义</span>数据位之间的特定位置插入k个校验位</p>
                            <p>必须满足 <span class="txt-func">2<span class="txt-sup">K</span>-1 ≥ n+k</span></p>
                        </div>
                    </div>
                    <div id="section-010304">
                        <h4>3.4 循环冗余校验码(CRC) <i class="txt-en">Cyclic Redundancy Check</i></h4>
                        <div class="sub-contents">
                            <p><b>模2运算</b></p>
                            <p>k位+r检验码，码距为2，不能纠错</p>
                        </div>
                    </div>
                </div>
                <h3 id="part-0104">4. 存储系统</h3>
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
                                            <p>相联存储器，按内容存取</p>
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
                            <p>Cache与主存之间的地址映射右硬件自动完成</p>
                            <p>RAM：随机，断电丢失</p>
                            <p>ROM：只读，断电不丢失</p>
                            <p>闪存FLASH：EEPROM，按块为单位，可代替辅存</p>
                            <p>虚拟存储器：主存+辅存</p>
                        </div>
                    </div>
                    <div id="section-010402">
                        <h4>4.2 高速缓存 Cache</h4>
                        <div class="sub-contents">
                            <p>容量与命中率：在合理成本下提高命中率</p>
                            <p>地址映像：主存地址和Cache地址的转换，是由硬件自动完成</p>
                            <p>替换算法：目的是提高命中率</p>
                            <p>冲突次数：全相联映像 < 组相联映像 < 直接相连映像 </p>
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
                                        <td>程序查询方式</td>
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
                                            <p>CPU和I/O设备可<b>并行</b>工作，提升CPU利用率</p>
                                            <p>一次只能读写一个字</p>
                                            <p>由CPU将数据放入内存</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>直接存储器方式(DMA)</td>
                                        <td>
                                            <p>CPU和I/O设备可并行工作</p>
                                            <p>仅在传送数据块的开始和结束时需CPU干预</p>
                                            <p>一次读写一个<b>块</b></p>
                                            <p>由<b>外设直接</b>将数据放入内存</p>
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
                            <p>中断向量：中断服务程序的入口地址</p>
                            <p>中断响应时间：从发出中断请求到开始进入中断处理程序</p>
                            <p>保护断点和现场：堆栈</p>
                        </div>
                    </div>
                </div>
                <div id="part-0106">
                    <h3>6. 计算机体系结构</h3>
                    <div class="part-contents">
                        <div id="section-010601">
                            <h4>6.1 Flynn分类法</h4>
                            <div class="sub-contents">
                            </div>
                        </div>
                        <div id="section-010602">
                            <h4>6.2 指令集架构</h4>
                            <div class="sub-contents">
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>RISC 精简指令集计算机</th>
                                            <th>CISC 复杂指令集计算机</th>
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
                                            <td>硬布线控制逻辑、组合逻辑控制器</td>
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
                                <p>加速比：不采用和采用的时间比</p>
                                <p>操作周期：最长操作时间</p>
                                <p>吞吐率：1/最长操作时间</p>
                                <p>n条指令的吞吐率：n/执行时间</p>
                                <img class="img-04" src="/docs/study/imgs/04-liushui.png" alt="" srcset="">
                            </div>
                        </div>
                        <div id="section-010604">
                            <h4>6.4 操作数寻址</h4>
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
                        <div id="section-010605">
                            <h4>6.5 冯诺依曼结构和哈弗结构</h4>
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
                            <p><b>对称加密</b>：相同的密钥加解密。速度快</p>
                            <p><b>非对称加密</b>：不同的私钥公钥加解密。高安全性</p>
                            <p><b>信息摘要</b>：将明文进行Hash算法发送并对比</p>
                            <p>数据完整性、一致性，不可逆，唯一性</p>
                            <p><b>数字签名</b>：结合非对称和散列函数，私钥加密公钥解密</p>
                            <p><b>数字证书</b>：CA机构颁布</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>对称加密</td>
                                        <td>DES AES 3DES RC-5 IDEA RC4</td>
                                    </tr>
                                    <tr>
                                        <td>非对称加密</td>
                                        <td>RSA ECC DSA</td>
                                    </tr>
                                    <tr>
                                        <td>信息摘要</td>
                                        <td>Hash函数 MD5 SHA</td>
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
                <h2 id="chapter-02">程序设计语言</h2>
                <p>内容...</p>
                <h2 id="chapter-03">数据结构</h2>
                <p>内容...</p>
                <h2 id="chapter-04">知识产权</h2>
                <p>内容...</p>
                <h2 id="chapter-05">数据库</h2>
                <p>内容...</p>
                <h2 id="chapter-06">面向对象</h2>
                <p>内容...</p>
                <h2 id="chapter-07">UML</h2>
                <p>内容...</p>
                <h2 id="chapter-08">设计模式</h2>
                <p>内容...</p>
                <h2 id="chapter-09">结构化开发</h2>
                <p>内容...</p>
                <h2 id="chapter-10">软件工程</h2>
                <p>内容...</p>
                <h2 id="chapter-11">信息安全</h2>
                <p>内容...</p>
                <h2 id="chapter-12">计算机网络</h2>
                <p>内容...</p>
                <h2 id="chapter-13">算法</h2>
                <p>内容...</p>
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

.img-01 {
    position: absolute;
    top: 0;
    right: 20px;
    width: 320px;
    height: unset;
}

.img-02 {
    position: absolute;
    top: 0;
    right: 20px;
    width: 150px;
    height: unset;
}

.img-03 {
    width: 350px;
    height: unset;
}

.img-04 {
    position: absolute;
    top: 0;
    right: 20px;
    width: 450px;
    height: unset;
}

.img-05 {
    position: absolute;
    top: 0;
    right: 20px;
    width: 200px;
    height: unset;
}
</style>
