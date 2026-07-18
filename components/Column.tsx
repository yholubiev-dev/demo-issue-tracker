"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Issue, Status } from "@/lib/types";
import IssueCard from "./IssueCard";

interface Props {
  status: Status;
  label: string;
  issues: Issue[];
  numByIssue: Map<string, number>;
  onStatusChange: (id: string, status: Status) => void;
}

export default function Column({ status, label, issues, numByIssue, onStatusChange }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className={`column ${isOver ? "over" : ""}`}>
      <div className="column-header">
        <span className="column-title">{label}</span>
        <span className="column-count">{issues.length}</span>
      </div>
      <div className="column-body">
        {issues.length === 0 && <div className="empty">— nothing herein —</div>}
        <SortableContext items={issues.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {issues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              num={numByIssue.get(issue.id) ?? 0}
              onStatusChange={onStatusChange}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
