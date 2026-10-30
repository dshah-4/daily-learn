---
description: Write the next 7 days of Daily Learn lessons, validate them, then commit and push to GitHub
argument-hint: "[optional start date YYYY-MM-DD]"
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git *), Bash(date *), PowerShell
---

Generate the next seven days of Daily Learn content.

## 1. Load the rules and the feedback
- Read `CONTENT_GUIDE.md` in full. Follow it exactly: topic pool, variety rules, card and quiz format, word counts, quality rules.
- Read `FEEDBACK.md` in full. Every note under **Notes** must shape this batch. Feedback overrides the guide's defaults on mix, frequency, length and tone (e.g. "more history" → history 2–3× this week; "less chess" → at most once; "cards too long" → shorten the word range in both the guide and `$minWords`/`$maxWords` in `tools/build-index.ps1`). It never overrides accuracy or the JSON format. If a note is ambiguous, pick the most reasonable reading and mention it in the report.

## 2. Work out the dates
- Get today's local date (`date +%F` in Bash, or `Get-Date -Format yyyy-MM-dd` in PowerShell).
- List `content/*.json` (ignore `index.json`) and find the latest day file.
- Start date = `$ARGUMENTS` if given; otherwise the day after the latest file; but if that is earlier than today, start today instead (don't backfill missed days).
- The week is the start date plus the next 6 days. Never overwrite an existing day file; if one exists, skip that date and stop at 7 new files.

## 3. Avoid repeats and plan the week
- Read `content/index.json` to see every title ever used. Do not repeat a concept, recipe, album/artist, book, chess theme, story or fact already covered. Deeper sequels are fine if clearly titled as such.
- Read the most recent ~10 day files in full, to see recent topic mixes, which music genres/eras were used, and which cards would make good review questions.
- Draft a 7×6 grid of topics before writing anything. It must satisfy the guide's variety rules:
  - 6 different topics per day, drawn from the full pool; 2–3 interest topics per day (~40% overall), the rest broadening.
  - No topic on back-to-back days, including against the last existing day before this batch.
  - No two days within the week share more than 3 topics.
  - Investing about 3× (every other day); every other interest at least once; at least 12 different broadening topics.
  - Then apply `FEEDBACK.md` adjustments.
- Shuffle the order of cards within each day so it feels random, not templated.
- Write a one-line idea for each card. Check the grid against the no-repeat rule and the music rule (mostly English-language, varied genres and eras, non-English rarely), then write.
- Keep investing content progressing toward real buy-side skills (see the guide's Progression rule) — look at what's already been taught and build on it.
- Use Imprint, Blinkist and Brilliant only as inspiration for the kinds of topics and the bite-size style. Never copy or paraphrase their content.

## 4. Review questions
About every third day, replace one of that day's quiz questions with a review question about a card from 3–14 days earlier (`"review": true`, `"reviewOf": "<card id>"`). Look at when the last review question appeared so the cadence continues smoothly across weeks. Aim for 2–3 review questions per week. Each review question must be answerable from the referenced card alone.

## 5. Write the files
Write `content/YYYY-MM-DD.json` for each of the 7 days, following the format in the guide. Card ids are `YYYY-MM-DD-N`. Vary the position of correct quiz answers.

## 6. Validate
Run:

```
powershell -NoProfile -ExecutionPolicy Bypass -File tools/build-index.ps1
```

This checks every file, the variety rules and word counts, and rebuilds `content/index.json`. Fix every ERROR and every WARN for the new days, then rerun until it prints OK. Then reread your new cards once for factual accuracy, fixing anything you're not confident about.

## 7. Commit and push
- `git add content/ FEEDBACK.md CONTENT_GUIDE.md tools/`
- `git commit -m "Add lessons for <first date> to <last date>"`
- `git push`

If there is no remote or the push fails (e.g. authentication), say so clearly and show the user the exact command to run themselves — don't retry in a loop.

## 8. Report
Finish with a short table: date → the six card titles with their topics, note which days have review questions, and list how each `FEEDBACK.md` note was applied.
