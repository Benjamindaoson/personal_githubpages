import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import { LearningPathGrid, ProductSection } from "../components/LearningProduct";
import { learningPaths } from "../data/productUx";

export default function RoadmapPage() {
  return (
    <Layout title="AI 工程学习路线图" description="大模型、RAG、Agent 的 AI 工程学习路线">
      <main className="product-page product-page--narrow">
        <section className="page-hero">
          <span className="product-eyebrow">Roadmap</span>
          <h1>AI 工程学习路线图</h1>
          <p>路线图不是目录，而是学习顺序、任务产出和可复用素材的合约。先理解大模型边界，再构建 RAG，最后进入 Agent 工程化。</p>
        </section>

        <LearningPathGrid compact />

        <ProductSection
          eyebrow="Sequencing"
          title="推荐学习顺序"
          description="每个阶段都对应一个真实可交付结果，方便学生自学，也方便教师拆成课堂活动。"
        >
          <div className="roadmap-timeline">
            {learningPaths.map((path, index) => (
              <article className="roadmap-step" key={path.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{path.title}</h3>
                  <p>{path.outcome}</p>
                  <strong>素材：{path.assets.join(" / ")}</strong>
                  <Link to={path.href}>进入阶段</Link>
                </div>
              </article>
            ))}
          </div>
        </ProductSection>
      </main>
    </Layout>
  );
}
