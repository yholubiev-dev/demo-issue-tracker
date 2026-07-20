"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Issue, Status } from "@/lib/types";
import { STATUSES } from "@/lib/types";
import { THEME } from "@/lib/theme";

interface Props {
  issue: Issue;
  onStatusChange: (id: string, status: Status) => void;
  onRemove: (id: string) => void;
}

export default function IssueCard({ issue, onStatusChange, onRemove }: Props) {
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
      <div className="title">{issue.title}</div>
      <div
        className="remove"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onRemove(issue.id)}
      >
        ✕
      </div>
      <select
        value={issue.status}
        onPointerDown={(e) => e.stopPropagation()}
        onChange={(e) => onStatusChange(issue.id, e.target.value as Status)}
      >
        {STATUSES.map((s) => (
          <option key={s.key} value={s.key}>
            {THEME[s.key].name}
          </option>
        ))}
      </select>
    </div>
  );
}
