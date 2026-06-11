export const infos = {
  topic: "AI",
  desc: "desc",
  contents: [
    {
      chapter: "常用词汇",
      list: [
        {
          part: "LLM",
          list: [
            {
              section: "简述",
              content: `**Large Language Model** **大型语言模型**\n\n核心工作就是：根据上下文，预测下一个字（或词）是什么。`,
            },
            {
              section: "常用LLM产品",
              content: `
#### Frontier Models
- **OpenAI - GPT**
- **Anthropic - Claude**
- **Google - Gemini**
- **xAI - Grok**
#### Open-weight Ecosystem
- **Meta - LLaMA**
- **阿里巴巴 - Qwen**
- **Mistral AI - Mistral/Mixtral**
- **DeepSeek - DeepSeek**
- **Microsoft - Phi**
`,
            },
          ],
        },
        {
          part: "RAG",
          list: [
            {
              section: "简述",
              content: `**Retrieval-Augmented Generation** **检索增强生成**\n\n核心工作就是：结合外部知识库的信息来生成更准确和相关的内容。`,
            },
            {
              section: "链接",
              content: `
[Hugging Face](https://huggingface.co/docs/transformers/model_doc/rag)
`,
            },
          ],
        },
        {
          part: "Cache",
          list: [
            {
              section: "简述",
              content: ``,
            },
          ],
        },
        {
          part: "Prompt",
          list: [
            {
              section: "简述",
              content: ``,
            },
          ],
        },
        {
          part: "MCP",
          list: [
            {
              section: "简述",
              content: `
**Model Context Protocol** **模型上下文协议**\n\n
核心工作就是：统一大型语言模型与外部数据源和工具之间的通信协议
`,
            },
            {
              section: "链接",
              content: `
- [Documentation](https://modelcontextprotocol.io/docs/getting-started/intro)\n
- [OpenAI Doc](https://developers.openai.com/api/docs/guides/tools-connectors-mcp)\n
- [MCP Server](https://mcpservers.org/)
`,
            },
            {
              section: "FastMCP",
              content: `
[Link](https://gofastmcp.com/getting-started/welcome)
`,
            },
          ],
        },
        {
          part: "Skill",
          list: [
            {
              section: "简述",
              content: `**Skill** **技能**\n\n核心工作就是：执行特定的任务或操作。`,
            },
            {
              section: "链接",
              content: `
[Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
`,
            },
          ],
        },
        {
          part: "LangChain/LangFlow/LangGraph",
          list: [
            {
              section: "LangGraph",
              content: `
#### **LangGraph** **语言图谱核心指南**\n\n

**LangGraph** 的核心工作就是：**构建和操作基于语言模型的图谱结构。**
与传统的线性链（Chain）不同，LangGraph 专为构建复杂的、支持循环的 Agent（智能体）而生。

理解 LangGraph，只需要掌握三个最核心的概念：**State（状态）**、**Node（节点）** 和 **Edge（边）**。

---

##### 1. State (状态/上下文)
这是贯穿整个流程始终的一个“大字典”（或数据类）。所有的部件（节点）都在读写这个字典。它就像是在员工之间传递的那份“项目文件夹”，记录着当前任务的所有信息。

\`\`\`python
from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages

# ==========================================
# 定义状态 (State)
# ==========================================
# State 是图在执行过程中传递的数据结构。
# Annotated[list, add_messages] 的作用是告诉 LangGraph：
# 当有新的消息返回时，不要覆盖原来的列表，而是追加 (append) 到消息列表中。
#
# 多轮对话时配合 MemorySaver（见文末 compile），同一条 thread_id 下
# 历史 messages 会自动保留，每轮只需 invoke 一条新的 HumanMessage。
class State(TypedDict):
    messages: Annotated[list, add_messages]
    # 你还可以根据业务需求在这里添加更多状态字段，例如：
    # user_info: dict
    # retry_count: int
\`\`\`

---

##### 2. Node (节点)
执行具体动作的地方。一个大模型、一个调用 RAG 的函数、一个执行 MCP 工具的函数，都被包装成一个个 Node。
**节点的本质是一个 Python 函数**：它接收当前的 \`State\`，执行逻辑后，返回一个**包含状态更新内容的字典**。

\`\`\`python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-3.5-turbo")

# ==========================================
# 定义节点 (Node)
# ==========================================
def chatbot_node(state: State):
    """
    大模型节点：读取当前所有消息，请求模型，并返回新的回复。
    """
    print("--- 正在调用大模型 ---")
    
    # 1. 读取 State 中的内容（查看项目文件夹）
    messages = state["messages"]
    
    # 2. 执行具体动作（处理任务）
    response = llm.invoke(messages)
    
    # 3. 返回状态的增量更新（往项目文件夹里塞入新文件）
    # 注意：因为前面配置了 add_messages，这里的 response 会自动追加到末尾
    return {"messages": [response]}

def tool_node(state: State):
    """
    假设这是一个执行工具的节点
    """
    print("--- 正在执行工具 ---")
    # ... 执行 RAG 或其他 API 调用 ...
    return {"messages": [{"role": "tool", "content": "工具执行结果"}]}
\`\`\`

---

##### 3. Edge (边/路由)
决定下一步去哪个 Node。边是图谱的“交通指挥官”。
边分为两种：
*   **普通边 (Normal Edge)**：无条件的单向通道（比如 A 执行完一定执行 B）。
*   **条件边 (Conditional Edge)**：根据当前的状态，决定下一步的去向（比如：大模型是否要求调用工具？是->去工具节点；否->直接输出给用户）。

\`\`\`python
from langgraph.graph import END

# ==========================================
# 定义条件边路由逻辑 (Conditional Edge)
# ==========================================
def route_tools(state: State):
    """
    路由函数：检查大模型最新的一条回复是否包含工具调用请求
    """
    latest_message = state["messages"][-1]
    
    # 如果大模型想调用工具，走向 "tools" 节点
    if hasattr(latest_message, "tool_calls") and len(latest_message.tool_calls) > 0:
        return "tools"
    
    # 否则，对话结束，走向终点
    return END
\`\`\`

---

##### 4. 组装与编译图谱 (Graph & Memory)
当所有的“文件夹”、“员工”和“交通路线”都定义好后，我们需要把它们组装起来。LangGraph 提供了内置的记忆机制（Checkpointer），让 Agent 能拥有真正的“长期记忆”。

\`\`\`python
from langgraph.graph import StateGraph, START
from langgraph.checkpoint.memory import MemorySaver

# 1. 初始化图谱（将我们定义的 State 结构传入）
graph_builder = StateGraph(State)

# 2. 注册所有节点 (给节点函数起个名字)
graph_builder.add_node("chatbot", chatbot_node)
graph_builder.add_node("tools", tool_node)

# 3. 定义流转路线 (添加边)
# 启动时，直接前往大模型节点
graph_builder.add_edge(START, "chatbot")

# 大模型思考完毕后，通过条件边决定下一步（去调用工具，还是结束）
graph_builder.add_conditional_edges(
    "chatbot",         # 起点节点
    route_tools,       # 路由判断函数
    {"tools": "tools", END: END} # 路由结果对应的目标节点映射
)

# 工具执行完毕后，必须无条件回到大模型节点，让大模型评估结果
graph_builder.add_edge("tools", "chatbot")

# 4. 编译图谱并挂载记忆机制
# MemorySaver 会在内存中按 thread_id 保存对话快照
memory = MemorySaver()
app = graph_builder.compile(checkpointer=memory)
\`\`\`

---

##### 5. 运行调用 (Invoke & Stream)
配置好带有 \`MemorySaver\` 的 Agent 后，调用时只需传入 \`thread_id\`，LangGraph 就会自动帮你管理多轮对话的上下文历史，你每次只需要传入用户**最新的一句话**即可。

\`\`\`python
# 设定一个会话 ID（代表某个特定用户或某次特定对话）
config = {"configurable": {"thread_id": "session_001"}}

# 用户的第一次输入
initial_input = {"messages": [("user", "你好，请查一下今天北京的天气")]}

print("第一次对话:")
for event in app.stream(initial_input, config=config, stream_mode="values"):
    latest_msg = event["messages"][-1]
    latest_msg.pretty_print()

print("\n----------------\n")

# 用户的第二次输入（Agent 会自动“想起来”前面提过的北京）
second_input = {"messages": [("user", "那明天呢？")]}

print("第二次对话 (带着记忆):")
for event in app.stream(second_input, config=config, stream_mode="values"):
    latest_msg = event["messages"][-1]
    latest_msg.pretty_print()
\`\`\`
`,
            },
            {
              section: "官网",
              content: `
[LangGraph](https://docs.langchain.com/oss/python/langgraph/overview)
`,
            },
          ],
        },
        {
          part: "Agent",
          list: [
            {
              section: "简述",
              content: `**Agent** **智能体**\n\n核心工作就是：自主地感知环境、做出决策并执行动作。`,
            },
          ],
        },
      ],
    },
    {
      chapter: "搭建过程",
      list: [
        {
          part: "结构",
          list: [
            {
              section: "施工总览图",
              content: `
- **Step 1**: 部署大脑与嵌入模型（LLM）
\`\`\`Bash 
# 安装 Ollama 
brew install ollama
# 查看版本
ollama version

# 启动 Ollama 服务
ollama serve --port 5000

# 下载大语言模型
ollama pull qwen2.5:7b
# 下载向量化模型 RAG
ollama pull nomic-embed-text

# 列出模型
ollama list
\`\`\`
- **Step 2**: 运行 LangFlow
\`\`\`Bash 
# 安装并运行 langflow
python3 -m pip install langflow
python3 -m langflow run -- --server.port 9701 --server.address 0.0.0.0 --server.headless true
\`\`\`
`,
            },
          ],
        },
      ],
    },
  ],
};
