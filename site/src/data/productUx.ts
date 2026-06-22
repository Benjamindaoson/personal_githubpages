export type LearningPath = {
  id: "llm" | "rag" | "agent";
  title: string;
  eyebrow: string;
  href: string;
  outcome: string;
  status: "ready" | "building" | "updating";
  units: string[];
  assets: string[];
};

export type ProductTask = {
  id: string;
  type: "lab" | "project" | "assessment" | "teaching";
  title: string;
  module: string;
  difficulty: "入门" | "进阶" | "项目";
  duration: string;
  href: string;
  outcome: string;
};

export type ProductStat = {
  label: string;
  value: string;
  detail: string;
};

export const productStats: ProductStat[] = [
  { label: "学习路径", value: "3", detail: "大模型、RAG、Agent 分层推进" },
  { label: "可复用素材", value: "8+", detail: "代码、图、测验、Rubric、教师指南" },
  { label: "产出导向任务", value: "6", detail: "每个阶段都有可交付实验或项目" }
];

export const learningPaths: LearningPath[] = [
  {
    id: "llm",
    title: "大模型工程基础",
    eyebrow: "Foundation",
    href: "/courses/ai-engineering/modules/llm-foundations/lesson",
    outcome: "能把模型调用、提示词、结构化输出和上下文边界讲清楚，并完成 Python/JS 最小实验。",
    status: "ready",
    units: ["核心概念课", "Python 实验", "JavaScript 实验", "项目实战", "教师指南"],
    assets: ["Mermaid 图", "代码实验", "测验", "Rubric"]
  },
  {
    id: "rag",
    title: "RAG 应用构建",
    eyebrow: "Builder",
    href: "/courses/ai-engineering/modules/rag/lesson",
    outcome: "能设计可引用、可评测的检索增强生成链路，理解切片、检索、上下文拼接和引用质量。",
    status: "ready",
    units: ["概念课", "检索链路任务", "引用质量评测", "失败模式复盘"],
    assets: ["流程图", "评测清单", "项目任务"]
  },
  {
    id: "agent",
    title: "Agent 工程化",
    eyebrow: "Builder",
    href: "/courses/ai-engineering/modules/agents/lesson",
    outcome: "能区分聊天、工作流和工具调用 Agent，并设计状态、护栏、日志和可观测性边界。",
    status: "updating",
    units: ["概念课", "工具调用任务", "状态设计", "可观测性检查"],
    assets: ["架构图", "工具 Schema", "任务轨迹"]
  }
];

export const taskBank: ProductTask[] = [
  {
    id: "llm-python-lab",
    type: "lab",
    title: "Python 最小模型调用实验",
    module: "大模型基础",
    difficulty: "入门",
    duration: "45 min",
    href: "/courses/ai-engineering/modules/llm-foundations/lab-python",
    outcome: "完成一次结构化输出调用，并记录失败样例。"
  },
  {
    id: "llm-js-lab",
    type: "lab",
    title: "JavaScript 模型调用实验",
    module: "大模型基础",
    difficulty: "入门",
    duration: "45 min",
    href: "/courses/ai-engineering/modules/llm-foundations/lab-js",
    outcome: "在前端/Node 场景理解异步调用和输出解析。"
  },
  {
    id: "llm-project",
    type: "project",
    title: "提示词到结构化输出小项目",
    module: "大模型基础",
    difficulty: "项目",
    duration: "2 h",
    href: "/courses/ai-engineering/modules/llm-foundations/project",
    outcome: "交付一个能稳定返回 JSON 的小型 AI 功能。"
  },
  {
    id: "rag-project",
    type: "project",
    title: "课程资料 RAG 问答链路",
    module: "RAG",
    difficulty: "进阶",
    duration: "3 h",
    href: "/courses/ai-engineering/modules/rag/lesson",
    outcome: "把课程片段变成可引用答案，并输出引用证据。"
  },
  {
    id: "llm-assessment",
    type: "assessment",
    title: "大模型基础测验与 Rubric",
    module: "大模型基础",
    difficulty: "入门",
    duration: "30 min",
    href: "/courses/ai-engineering/modules/llm-foundations/project",
    outcome: "用统一标准评估概念掌握和实验质量。"
  },
  {
    id: "teacher-guide",
    type: "teaching",
    title: "教师复用课前/课中/课后指南",
    module: "大模型基础",
    difficulty: "入门",
    duration: "60 min",
    href: "/courses/ai-engineering/modules/llm-foundations/teaching-guide",
    outcome: "直接复用课堂流程、提问点和作业评价方式。"
  }
];

export const lessonFormats = [
  { key: "lesson", label: "概念课", detail: "解释核心模型与工程边界" },
  { key: "python-lab", label: "Python 实验", detail: "用代码验证模型调用" },
  { key: "js-lab", label: "JS 实验", detail: "面向 Web/Node 场景" },
  { key: "project", label: "项目实战", detail: "交付可运行小作品" },
  { key: "teacher-guide", label: "教师指南", detail: "可复用课堂组织材料" },
  { key: "assessment", label: "测验/Rubric", detail: "可评测学习产出" }
];
