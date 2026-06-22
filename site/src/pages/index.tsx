import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";

export default function Home() {
  return (
    <Layout title="AI Digital Textbook" description="AI-native multimodal curriculum platform">
      <main>
        <section className="hero">
          <div className="container padding-vert--xl">
            <h1>AI Digital Textbook</h1>
            <p>面向开发者学生和教师的大模型、RAG、Agent 工程化教材系统。</p>
            <Link className="button button--primary" to="/courses/ai-engineering/intro">
              进入学习路径
            </Link>
          </div>
        </section>
        <section className="container padding-vert--lg">
          <div className="row">
            <div className="col col--4">
              <h2>大模型基础</h2>
              <p>理解 token、上下文、提示词、结构化输出和模型调用边界。</p>
            </div>
            <div className="col col--4">
              <h2>RAG</h2>
              <p>构建检索、重排、引用和评测完整链路。</p>
            </div>
            <div className="col col--4">
              <h2>Agent</h2>
              <p>设计工具调用、状态、计划、护栏和可观测性。</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
