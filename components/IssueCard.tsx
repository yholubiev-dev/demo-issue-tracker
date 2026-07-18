"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Issue, Status } from "@/lib/types";
import { STATUSES } from "@/lib/types";

interface Props {
  issue: Issue;
  num: number;
  onStatusChange: (id: string, status: Status) => void;
}

export default function IssueCard({ issue, num, onStatusChange }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: issue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`card ${isDragging ? "dragging" : ""}`}
      {...attributes}
      {...listeners}
    >
      <div className="card-num">№ {num}</div>
      <div className="card-title">{issue.title}</div>
      <div className="card-disposition">
        <span className="card-disposition-label">Disposition</span>
        <select
          value={issue.status}
          onPointerDown={(e) => e.stopPropagation()}
          onChange={(e) => onStatusChange(issue.id, e.target.value as Status)}
        >
          {STATUSES.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
