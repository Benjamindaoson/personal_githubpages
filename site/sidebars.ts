import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  aiEngineering: [
    "intro",
    {
      type: "category",
      label: "01 大模型基础",
      items: [
        "modules/llm-foundations/lesson",
        "modules/llm-foundations/teaching-guide",
        "modules/llm-foundations/lab-python",
        "modules/llm-foundations/lab-js",
        "modules/llm-foundations/project"
      ]
    },
    {
      type: "category",
      label: "02 RAG",
      items: ["modules/rag/lesson"]
    },
    {
      type: "category",
      label: "03 Agent",
      items: ["modules/agents/lesson"]
    }
  ]
};

export default sidebars;
