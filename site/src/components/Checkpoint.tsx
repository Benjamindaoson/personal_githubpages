import type { ReactNode } from "react";

export default function Checkpoint({ children }: { children: ReactNode }) {
  return (
    <aside className="checkpoint">
      <strong>学习检查点</strong>
      <div>{children}</div>
    </aside>
  );
}
