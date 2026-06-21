import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  aiEngineering: [
    "intro",
    {
      type: "category",
      label: "01 大模型基础",
      items: [
        "modules/01-llm-foundations/lesson",
        "modules/01-llm-foundations/teaching-guide",
        "modules/01-llm-foundations/lab-python",
        "modules/01-llm-foundations/lab-js",
        "modules/01-llm-foundations/project"
      ]
    },
    {
      type: "category",
      label: "02 RAG",
      items: ["modules/02-rag/lesson"]
    },
    {
      type: "category",
      label: "03 Agent",
      items: ["modules/03-agents/lesson"]
    }
  ]
};

export default sidebars;
