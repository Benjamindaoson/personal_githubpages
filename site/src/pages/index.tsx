import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import {
  FormatRail,
  LearningPathGrid,
  ProductPreviewPanel,
  ProductSection,
  ProductStatGrid,
  TaskBankPreview
} from "../components/LearningProduct";

export default function Home() {
  return (
    <Layout title="AI Engineering Learning Product" description="AI-native curriculum platform for LLM, RAG, and Agent learning">
      <main className="product-page">
        <section className="product-hero">
          <div className="product-hero__content">
            <span className="product-eyebrow">AI Digital Textbook</span>
            <h1>面向开发者和教师的 AI 工程学习产品</h1>
            <p>
              把大模型、RAG、Agent 的概念课、代码实验、项目实战、评测标准和教师复用素材组织成一套可发布、可检索、可接入 Agent 的课程系统。
            </p>
            <div className="product-hero__actions">
              <Link className="button button--primary" to="/roadmap">
                查看路线图
              </Link>
              <Link className="button button--secondary" to="/tasks">
                打开任务库
              </Link>
            </div>
          </div>
          <ProductPreviewPanel />
        </section>

        <ProductStatGrid />

        <ProductSection
          eyebrow="Learning Path"
          title="从概念到可交付项目"
          description="每条路径都面向有编程基础的学生/开发者，同时给教师保留可复用的课堂材料。"
        >
          <LearningPathGrid />
        </ProductSection>

        <ProductSection
          eyebrow="Content Formats"
          title="内容不只是一篇文章"
          description="课程单元按多种素材格式组织，后续可以扩展到视频、Notebook、演示、数据集和交互可视化。"
        >
          <FormatRail />
        </ProductSection>

        <ProductSection
          eyebrow="Task Bank"
          title="任务库优先服务学习产出"
          description="学生看到的是实战任务，教师看到的是可复用的活动、测验和评分标准。"
        >
          <TaskBankPreview limit={4} />
          <div className="product-section__action">
            <Link className="product-link" to="/tasks">
              查看全部任务
            </Link>
          </div>
        </ProductSection>
      </main>
    </Layout>
  );
}
