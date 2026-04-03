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
**LangGraph** **语言图谱**\n\n核心工作就是：构建和操作语言的图谱结构。\n\n
- **State (状态/上下文)**：这是贯穿始终的一个“大字典”（或数据类）。所有的部件都在读写这个字典。它就像是在员工之间传递的那份“项目文件夹”。\n\n
- **Node (节点)**：执行具体动作的地方。一个大模型、一个调用 RAG 的函数、一个执行 MCP 工具的函数，都被包装成一个个 Node。\n\n
- **Edge (边/路由)**：决定下一步去哪个 Node。条件分支（比如：大模型是否要求调用工具？是->去工具节点；否->直接输出给用户）就是通过 Edge 实现的\n\n
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
