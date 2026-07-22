import { NextResponse } from "next/server";
import { store } from "@/lib/store";

/**
 * Returns a single, uniformly-random issue from the store.
 * Responds 404 if the store currently holds no issues.
 * Note: this route is a static sibling of `[id]/route.ts`; Next.js matches
 * the static `random` segment before the dynamic `[id]` one, so it is never
 * shadowed.
 */
export async function GET() {
  const issues = store.list();
  if (issues.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const issue = issues[Math.floor(Math.random() * issues.length)];
  return NextResponse.json(issue);
}
