import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  const issues = store.list();
  if (issues.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const issue = issues[Math.floor(Math.random() * issues.length)];
  return NextResponse.json(issue);
}
