# ProjectWorkingStyle

- Keep changes simple, organized, and DRY. Do NOT add new files or big refactors unless strictly needed — fix the root cause with minimal, targeted edits.
- Never commit unless the user explicitly asks. The user builds on feature branches, merges to master themself, and pushes fork master -> org repo (`mulinguae-association`) with a second account.
- Verify before finishing: frontend = `npm run build`; backend = `node --check` on changed files + boot check (`node app.js` on a free port).
- Do not mix unrelated fixes on one branch without flagging it. Prefer smallest possible surface area for a bug fix.
- Prefer small local helpers over new modules. Prefer minimal, focused commits/branches when the user reviews the diff.