# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Standard `npm run dev` / `build` / `typecheck` (see `package.json`). There are no tests and no linter configured.

## Architecture

This is a Next.js 15 (App Router) kanban-style issue tracker. All state is held in a single in-memory `IssueStore` singleton (`lib/store.ts`) — there is no database. The store is pinned to `globalThis` to survive hot-reloads in dev, but **all data resets on process restart**.

### Data flow

```
lib/types.ts      — Issue, Status types and STATUSES constant
lib/store.ts      — IssueStore class; singleton exported as `store`
app/api/…         — Next.js Route Handlers that read/write the store
components/Board  — client component; owns all React state, fetches via /api/*
components/Column — renders one status column, receives issues as props
components/IssueCard — single card with inline status dropdown
```

### API routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/issues` | list all issues |
| POST | `/api/issues` | create issue (`{ title, status?, description? }`) |
| GET | `/api/issues/random` | get one random issue (404 if store is empty) |
| GET | `/api/issues/[id]` | get one |
| PATCH | `/api/issues/[id]` | update fields |
| DELETE | `/api/issues/[id]` | delete |
| PUT | `/api/columns/[status]/reorder` | reorder a column (`{ orderedIds: string[] }`) |

`app/api/issues/random/route.ts` is a static sibling of `app/api/issues/[id]/route.ts`; Next.js resolves the static segment first, so `random` is never captured as an `:id`. If more static sub-paths are added under `/api/issues/`, keep this in mind.

### Drag-and-drop

`Board.tsx` uses `@dnd-kit/core` + `@dnd-kit/sortable`. `onDragOver` does an optimistic local status move; `onDragEnd` fires the reorder API call and reconciles final order. The `findContainer` helper maps either a status key or an issue id to a `Status`.

### Statuses

Five fixed statuses defined in `lib/types.ts`: `backlog → todo → in_progress → testing → done`. Adding a new status requires updating the `Status` union and the `STATUSES` array in `lib/types.ts`, plus the `byStatus` record initializer in `components/Board.tsx` (its keys are constructed by hand, not derived from `STATUSES`). Everything else — column rendering, the status dropdown, drag-and-drop — derives from the `STATUSES` array.
