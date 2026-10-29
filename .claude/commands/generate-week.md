---
description: Write the next 7 days of Daily Learn lessons, validate them, then commit and push to GitHub
argument-hint: "[optional start date YYYY-MM-DD]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git *), Bash(date *), PowerShell
---

Generate the next seven days of Daily Learn content.

## 1. Load the rules
Read `CONTENT_GUIDE.md` in full. Follow it exactly: topic keys, card and quiz format, word counts, quality rules.

## 2. Work out the dates
- Get today's local date (`date +%F` in Bash, or `Get-Date -Format yyyy-MM-dd` in PowerShell).
- List `content/*.json` (ignore `index.json`) and find the latest day file.
- Start date = `$ARGUMENTS` if given; otherwise the day after the latest file; but if that is earlier than today, start today instead (don't backfill missed days).
- The week is the start date plus the next 6 days. Never overwrite an existing day file; if one exists, skip that date and stop at 7 new files.

## 3. Avoid repeats and plan the week
- Read `content/index.json` to see every title ever used. Do not repeat a concept, recipe, album/artist, book, chess opening/theme or philosophy idea already covered. Deeper sequels are fine if clearly titled as such.
- Read the most recent ~10 day files in full to see the rotation and which cards would make good review questions.
- Before writing, draft a 7×6 grid of topics that meets the rotation targets in the guide (6 different topics per day, investing near-daily, wildcard 1–2×) and list the one-line idea for each card. Check the grid against the no-repeat rule, then write.
- Keep investing content progressing toward real buy-side skills (see the guide's Progression rule) — look at what's already been taught and build on it.

## 4. Review questions
About every third day, replace one of that day's quiz questions with a review question about a card from 3–14 days earlier (`"review": true`, `"reviewOf": "<card id>"`). Look at when the last review question appeared so the cadence continues smoothly across weeks. Aim for 2–3 review questions per week. Each review question must be answerable from the referenced card alone.

## 5. Write the files
Write `content/YYYY-MM-DD.json` for each of the 7 days, following the format in the guide. Card ids are `YYYY-MM-DD-N`. Vary the position of correct quiz answers.

## 6. Validate
Run:

```
powershell -NoProfile -ExecutionPolicy Bypass -File tools/build-index.ps1
```

This checks every file and rebuilds `content/index.json`. Fix every ERROR and every word-count WARN, then rerun until it prints OK. Then reread your new cards once for factual accuracy, fixing anything you're not confident about.

## 7. Commit and push
- `git add content/`
- `git commit -m "Add lessons for <first date> to <last date>"`
- `git push`

If there is no remote or the push fails (e.g. authentication), say so clearly and show the user the exact command to run themselves — don't retry in a loop.

## 8. Report
Finish with a short table: date → the six card titles, and note which days have review questions.
