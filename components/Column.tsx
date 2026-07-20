"use client";

import type { CSSProperties } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Issue, Status } from "@/lib/types";
import { THEME } from "@/lib/theme";
import IssueCard from "./IssueCard";

interface Props {
  status: Status;
  issues: Issue[];
  onStatusChange: (id: string, status: Status) => void;
  onRemove: (id: string) => void;
}

export default function Column({ status, issues, onStatusChange, onRemove }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const theme = THEME[status];
  const style = { "--hue": theme.hue, "--glow": theme.glow } as CSSProperties;

  return (
    <div ref={setNodeRef} className={`column ${isOver ? "over" : ""}`} style={style}>
      <div className="column-header">
        <div>
          <div className="name">{theme.name}</div>
          <div className="sub">{theme.sub}</div>
        </div>
        <div className="count">{issues.length}</div>
      </div>

      <div className="column-body">
        <SortableContext items={issues.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} onStatusChange={onStatusChange} onRemove={onRemove} />
          ))}
        </SortableContext>
        {issues.length === 0 && (
          <div className="empty">
            <div className="icon">🔥</div>
            No souls here yet
          </div>
        )}
      </div>
    </div>
  );
}
