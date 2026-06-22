import Layout from "@theme/Layout";
import { ProductSection, TaskBankPreview } from "../components/LearningProduct";
import { taskBank, type ProductTask } from "../data/productUx";

const sections: Array<{ type: ProductTask["type"]; title: string; description: string }> = [
  { type: "lab", title: "代码实验", description: "用 Python/JS 把概念变成可观察的模型调用行为。" },
  { type: "project", title: "项目实战", description: "每个项目都要求交付一个可运行、可评估的小作品。" },
  { type: "assessment", title: "评测与 Rubric", description: "把学习结果变成可复盘、可批改、可改进的证据。" },
  { type: "teaching", title: "教师复用", description: "面向课堂组织、提问、讨论和课后作业的材料。" }
];

export default function TasksPage() {
  return (
    <Layout title="AI 工程任务库" description="AI engineering labs, projects, assessments, and teaching assets">
      <main className="product-page product-page--narrow">
        <section className="page-hero">
          <span className="product-eyebrow">Task Bank</span>
          <h1>AI 工程任务库</h1>
          <p>任务库把课程内容按教师可复用和学生可交付来组织，后续可以接入进度记录、搜索、推荐和自适应 Agent。</p>
        </section>

        {sections.map((section) => (
          <ProductSection key={section.type} eyebrow={section.type} title={section.title} description={section.description}>
            <TaskBankPreviewForType type={section.type} />
          </ProductSection>
        ))}
      </main>
    </Layout>
  );
}

function TaskBankPreviewForType({ type }: { type: ProductTask["type"] }) {
  const tasks = taskBank.filter((task) => task.type === type);
  return <TaskBankPreview tasks={tasks} />;
}
