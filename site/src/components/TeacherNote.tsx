import type { ReactNode } from "react";

export default function TeacherNote({ children }: { children: ReactNode }) {
  return (
    <aside className="teacher-note">
      <strong>教师提示</strong>
      <div>{children}</div>
    </aside>
  );
}
