---
name: wrap-up-issue
description: Completes the team's "definition of done" ritual for an issue on the Issue Tracker board — moves it to Done, clears its assignee, and appends a one-line summary of what changed to its description, via the app's REST API.
when_to_use: |
  Use when the user signals they've finished work on a specific issue/card on
  the Issue Tracker board and wants it wrapped up — e.g. "wrap up the
  board-layout issue", "I'm done with #3", "close out the API routes issue",
  "mark the login bug as done", "finish up X", "X is done, wrap it up".

  The trigger is the combination of (a) a reference to a specific issue and
  (b) a signal that work on it is complete and should be closed out — not
  just any mention of the word "done".

  Do NOT use for:
  - Marking status only, with no sign the user wants the full ritual (e.g.
    they're just dragging a card or asking "what's the status of X") —
    ask instead of assuming the full wrap-up is wanted.
  - Generic completion talk unrelated to a board issue (e.g. "I'm done for
    the day", "this function is done", "looks good, commit it" — that last
    one is the typecheck-gate hook's territory, not this skill's).
  - Requests to update only one field of an issue (e.g. "reassign #3 to
    Sam", "rename the login bug") — that's a plain PATCH, not a wrap-up.
allowed-tools: Bash(curl *)
---

# Wrap up an issue

The team's definition of done requires three things to happen together whenever
someone finishes work on an issue: the card moves to **Done**, the **assignee is
cleared**, and a **one-line summary** of what changed is appended to the issue's
description. Do all three — don't stop after moving the status.

This app has no numeric issue IDs visible to users (ids are UUIDs, and the board
only shows titles), so when the user refers to an issue by number, hash, or
partial name ("#3", "the board-layout one"), treat that as a hint to match
against issue **titles**, not a literal ID.

## Steps

1. **List the issues**: `curl -s http://localhost:3000/api/issues`
   If this fails to connect, tell the user the dev server isn't running
   (`npm run dev`) and stop — don't guess at issue state.

2. **Identify the target issue** by matching the user's phrasing against the
   `title` field of the returned issues (case-insensitive, substring/keyword
   match is fine).
   - If exactly one issue matches, proceed.
   - If more than one plausible match exists, list the candidate titles and
     ask the user which one they mean — don't guess.
   - If nothing matches, tell the user which titles currently exist and ask
     them to clarify.

3. **Write the one-line summary** yourself, based on the actual work just
   done in this conversation (recent code changes, commits, or discussion) —
   not a generic placeholder like "done". Keep it to one line.

4. **Apply all three changes in a single PATCH**, so the update is atomic:

   ```
   curl -s -X PATCH http://localhost:3000/api/issues/<id> \
     -H "Content-Type: application/json" \
     -d '{"status":"done","assignee":"","description":"<existing description, with the one-line summary appended on a new line>"}'
   ```

   Preserve the issue's existing `description` text — append the summary to
   it (on a new line), don't replace it. If the existing description is
   empty, the summary becomes the whole description.

5. **Confirm** by checking the PATCH response reflects `status: "done"`,
   `assignee: ""`, and the updated `description`. Tell the user what you did
   in one or two sentences and point them at http://localhost:3000 to see the
   board.
