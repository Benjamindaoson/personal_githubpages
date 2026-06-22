import type { Config } from "@docusaurus/types";
import type { Options as PresetOptions } from "@docusaurus/preset-classic";

const repository = process.env.GITHUB_REPOSITORY ?? "local/aidigitaltextbook";
const [owner, repo] = repository.split("/");
const projectName = repo ?? "aidigitaltextbook";
const siteUrl = process.env.PAGES_BASE_URL ?? `https://${owner}.github.io`;

const config: Config = {
  title: "AI Digital Textbook",
  tagline: "大模型、RAG 与 Agent 的 AI 原生教材系统",
  url: siteUrl,
  baseUrl: `/${projectName}/`,
  organizationName: owner,
  projectName,
  onBrokenLinks: "throw",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
      onBrokenMarkdownImages: "throw"
    }
  },
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN"]
  },
  presets: [
    [
      "classic",
      {
        docs: {
          path: "../curriculum/ai-engineering",
          routeBasePath: "courses/ai-engineering",
          sidebarPath: "./sidebars.ts"
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css"
        }
      } satisfies PresetOptions
    ]
  ],
  themeConfig: {
    navbar: {
      title: "AI Digital Textbook",
      items: [
        { to: "/", label: "首页", position: "left" },
        { to: "/roadmap", label: "路线图", position: "left" },
        { to: "/tasks", label: "任务库", position: "left" },
        { to: "/courses/ai-engineering/intro", label: "课程", position: "left" },
        { to: "/admin", label: "上传后台", position: "right" }
      ]
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} AI Digital Textbook`
    }
  }
};

export default config;
