import Link from "@docusaurus/Link";
import type { ReactNode } from "react";
import { learningPaths, lessonFormats, productStats, taskBank, type LearningPath, type ProductTask } from "../data/productUx";

type ProductSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

const statusLabel: Record<LearningPath["status"], string> = {
  ready: "已上线",
  building: "建设中",
  updating: "持续更新"
};

const taskTypeLabel: Record<ProductTask["type"], string> = {
  lab: "实验",
  project: "项目",
  assessment: "评测",
  teaching: "教师复用"
};

export function ProductSection({ eyebrow, title, description, children }: ProductSectionProps) {
  return (
    <section className="product-section">
      <div className="product-section__header">
        {eyebrow ? <span className="product-eyebrow">{eyebrow}</span> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function ProductStatGrid() {
  return (
    <div className="product-stats" aria-label="产品指标">
      {productStats.map((stat) => (
        <div className="product-stat" key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
          <p>{stat.detail}</p>
        </div>
      ))}
    </div>
  );
}

export function LearningPathGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "path-grid path-grid--compact" : "path-grid"}>
      {learningPaths.map((path) => (
        <article className="path-card" key={path.id}>
          <div className="path-card__topline">
            <span>{path.eyebrow}</span>
            <small>{statusLabel[path.status]}</small>
          </div>
          <h3>{path.title}</h3>
          <p>{path.outcome}</p>
          <ul>
            {path.units.map((unit) => (
              <li key={unit}>{unit}</li>
            ))}
          </ul>
          <Link className="product-link" to={path.href}>
            进入单元
          </Link>
        </article>
      ))}
    </div>
  );
}

export function FormatRail() {
  return (
    <div className="format-rail">
      {lessonFormats.map((format) => (
        <div className="format-chip" key={format.key}>
          <strong>{format.label}</strong>
          <span>{format.detail}</span>
        </div>
      ))}
    </div>
  );
}

export function TaskBankPreview({ limit, tasks: providedTasks }: { limit?: number; tasks?: ProductTask[] }) {
  const sourceTasks = providedTasks ?? taskBank;
  const tasks = typeof limit === "number" ? sourceTasks.slice(0, limit) : sourceTasks;

  return (
    <div className="task-grid">
      {tasks.map((task) => (
        <article className="task-card" key={task.id}>
          <div className="task-card__meta">
            <span>{taskTypeLabel[task.type]}</span>
            <small>{task.module}</small>
          </div>
          <h3>{task.title}</h3>
          <p>{task.outcome}</p>
          <div className="task-card__footer">
            <span>{task.difficulty}</span>
            <span>{task.duration}</span>
            <Link to={task.href}>打开</Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ProductPreviewPanel() {
  return (
    <div className="product-preview" aria-label="AI 学习产品预览">
      <div className="product-preview__bar">
        <span>AI Engineering</span>
        <span>Roadmap / Tasks / Course</span>
      </div>
      <div className="product-preview__body">
        <div className="preview-lane">
          <strong>路线图</strong>
          <span>大模型基础</span>
          <span>RAG 应用构建</span>
          <span>Agent 工程化</span>
        </div>
        <div className="preview-main">
          <span className="preview-badge">当前单元</span>
          <h3>大模型工程基础</h3>
          <p>概念、代码实验、项目任务、教师指南在同一套结构里组织。</p>
          <div className="preview-progress">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CourseUnitHeader({
  title,
  eyebrow,
  status,
  estimatedTime,
  updated,
  outcomes,
  formats,
  primaryHref,
  secondaryHref
}: {
  title: string;
  eyebrow: string;
  status: string;
  estimatedTime: string;
  updated: string;
  outcomes: string[];
  formats: string[];
  primaryHref?: string;
  secondaryHref?: string;
}) {
  return (
    <header className="course-unit-hero">
      <div>
        <span className="product-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <div className="course-unit-hero__meta">
          <span>{status}</span>
          <span>{estimatedTime}</span>
          <span>更新于 {updated}</span>
        </div>
      </div>
      <div className="course-unit-hero__grid">
        <div>
          <strong>学习产出</strong>
          <ul>
            {outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>素材格式</strong>
          <div className="course-format-list">
            {formats.map((format) => (
              <span key={format}>{format}</span>
            ))}
          </div>
        </div>
      </div>
      {(primaryHref || secondaryHref) && (
        <div className="course-unit-hero__actions">
          {primaryHref ? <Link to={primaryHref}>学习路线</Link> : null}
          {secondaryHref ? <Link to={secondaryHref}>任务库</Link> : null}
        </div>
      )}
    </header>
  );
}
