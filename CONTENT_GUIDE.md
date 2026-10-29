# Daily Learn — Content Guide

This file is the single source of truth for writing lessons. `/generate-week` reads it before writing anything.

## The learner

- 20 years old, finance & economics student in **Toronto**, aiming for a **buy-side investing** career (equity research, asset management, hedge funds).
- Already knows the basics of accounting and micro/macro from class — skip "what is a stock" level material. Pitch investing/economics at a sharp second-year student who wants to sound good in an interview.
- Runs and lifts weights. Eats **vegetarian** and wants **high-protein** meals.
- Into music discovery, plays guitar, reads, thinks about philosophy, plays chess.
- Canadian context matters: TFSA, RRSP, FHSA, CRA, Bank of Canada, TSX, CAD. Use Canadian spelling and dollars unless the topic is inherently foreign.

## Daily shape

Each day = **6 cards + 6 quiz questions**. One question per card, in card order. On review days (see below), one question is swapped for a review question from an older lesson.

## Topic rotation

Use these exact `topic` keys (they control colour and icon in the app):

| key | What it covers | Target frequency |
|---|---|---|
| `investing` | Valuation, accounting for investors, market structure, famous trades, investor frameworks, interview-style concepts | ~6 per week (almost daily) |
| `economics` | Macro, monetary policy, trade, behavioural econ, economic history, Canadian economy | ~4 per week |
| `canadian-finance` | TFSA/RRSP/FHSA, taxes, credit scores, student loans (OSAP), investing accounts, banking | ~3 per week |
| `running` | Training principles, physiology, workouts, pacing, injury prevention, race prep | ~3–4 per week |
| `weightlifting` | Programming, technique cues, hypertrophy science, recovery | ~3 per week |
| `recipe` | One high-protein **vegetarian** recipe (eggs/dairy OK) with protein per serving | ~3–4 per week |
| `music` | One album or artist to discover, across eras and genres, with a specific track to start on | ~3 per week |
| `guitar` | Theory, technique, a chord/scale/riff to practise, ear training | ~3 per week |
| `philosophy` | One thinker, argument, or concept, made practical | ~3 per week |
| `book` | One book recommendation with why it matters to this learner | ~3 per week |
| `chess` | Openings, tactics, endgame principles, famous games | ~3–4 per week |
| `wildcard` | Anything surprising: science, history, psychology, design, language | ~1–2 per week |

Rules of rotation:
- No topic appears twice in one day. Six different topics every day.
- Over 7 days, every topic appears at least twice except `wildcard` (1–2).
- Mix heavy and light: don't put investing, economics and canadian-finance all on the same day too often.
- Order within a day: open with something punchy, put the recipe or music card mid-way, end on something reflective (philosophy, book, chess) when possible.

## Card format

```json
{
  "id": "2026-10-29-1",
  "topic": "investing",
  "icon": "chart",
  "title": "Short, punchy title (max ~8 words)",
  "body": "100–150 word explanation. Separate paragraphs with a blank line (\\n\\n).",
  "example": "A concrete, specific example: real numbers, a real company, a real workout, real ingredients.",
  "takeaway": "One line the learner could repeat from memory."
}
```

- `id` is `YYYY-MM-DD-N` with N = 1..6. Must be unique forever (bookmarks depend on it).
- `icon` is optional; if omitted the topic's default icon is used. Available icons: `chart`, `globe`, `maple`, `shoe`, `barbell`, `leaf`, `headphones`, `pick`, `column`, `book`, `knight`, `spark`, `coin`, `house`, `scale`, `note`, `target`, `bowl`, `timer`, `brain`.

## Quiz format

```json
{
  "question": "Clear question testing understanding, not trivia recall of a word.",
  "options": ["A", "B", "C", "D"],
  "answer": 2,
  "explanation": "One or two sentences on why the answer is right.",
  "review": false
}
```

- Exactly 4 options, `answer` is the 0-based index of the correct one.
- Vary the position of the correct answer across the day (don't always use index 1).
- Distractors must be plausible — common misconceptions, not jokes.
- **Review questions**: about every 3 days, replace one question with a question about a card from an **earlier** day. Set `"review": true` and `"reviewOf": "YYYY-MM-DD-N"` (the card id). Pick cards from 3–14 days ago, preferably investing/economics/chess concepts worth retaining.

## Day file

`content/YYYY-MM-DD.json`:

```json
{
  "date": "2026-10-29",
  "cards": [ ...6 cards... ],
  "quiz":  [ ...6 questions... ]
}
```

## Index file

`content/index.json` lists every day so the Archive works on GitHub Pages (which can't list folders). After writing day files, add/replace an entry for each and keep the list sorted by date ascending:

```json
{ "days": [ { "date": "2026-10-29", "topics": ["investing", "..."], "titles": ["Card 1 title", "..."] } ] }
```

The app hides future dates, so it's fine to generate days ahead.

## Quality rules

1. **Accurate.** Only state facts you're confident in. No invented statistics, quotes, or study results. If a number varies (e.g. TFSA limit), give the year it applies to.
2. **Specific beats general.** "A 10% FCF yield at a $50 share price means $5 of FCF per share" beats "FCF yield is useful."
3. **Every card must teach one thing.** If it needs two ideas, split it across days.
4. **Practical.** Running/lifting cards include something to try this week. Guitar cards include something to practise. Recipes include a protein number per serving and fit on one card.
5. **Body 100–150 words.** Plain, energetic prose. No bullet lists, no markdown, no emoji.
6. **No repeats.** Before writing, scan existing titles in `content/index.json` (and recent files) and don't repeat a concept, recipe, album, book or opening. Sequels that go deeper are fine if the title makes it clear.
7. **Progression.** Over weeks, investing should build toward real buy-side skills: modelling intuition, reading 10-Ks, thesis writing, risk, position sizing, pitching.
8. **Music & books** must be real, verifiable works. Name a specific track or chapter to start with.
9. **Health content** is general education, not medical advice; keep it evidence-based and conservative.
10. **Valid JSON.** Straight double quotes, escaped inner quotes, no trailing commas.
