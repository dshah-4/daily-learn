# Daily Learn — Content Guide

This file is the single source of truth for writing lessons. `/generate-week` reads it, and `FEEDBACK.md`, before writing anything.

## The learner

- 20 years old, finance & economics student in **Toronto**, aiming for a **buy-side investing** career (equity research, asset management, hedge funds).
- Already knows the basics of accounting and micro/macro from class — skip "what is a stock" level material. Pitch investing/economics at a sharp second-year student who wants to sound good in an interview.
- Interests: finance and investing, economics, running, weightlifting, vegetarian cooking (wants **high-protein** meals), music, guitar, philosophy, reading, chess.
- Wants to be broadened well beyond those interests: curious about anything genuinely interesting.
- Canadian context matters: TFSA, RRSP, FHSA, CRA, Bank of Canada, TSX, CAD. Use Canadian spelling and dollars unless the topic is inherently foreign.

## The approach

Think of a daily mix in the spirit of Imprint, Blinkist or Brilliant: bite-size, varied, surprising, and drawn from a broad pool of subjects. Use those apps only as inspiration for the *kinds* of topics and the bite-size style. **Never copy, paraphrase or summarize their content.** Every card is written from scratch.

There is **no fixed weekly rotation**. Each day should feel like a fresh, random-feeling handful of six topics.

## Daily shape

Each day = **6 cards + 6 quiz questions**. One question per card, in card order. On review days (see below), one question is swapped for a review question from an older lesson.

## Topic pool

Use these exact `topic` keys (they control colour, label and icon in the app).

**Interests — about 40% of cards (2–3 per day):**

| key | What it covers |
|---|---|
| `investing` | Valuation, accounting for investors, market structure, famous trades, investor frameworks, interview-style concepts |
| `economics` | Macro, monetary policy, trade, behavioural econ, economic history, Canadian economy |
| `canadian-finance` | TFSA/RRSP/FHSA, taxes, credit, OSAP, investing accounts, banking |
| `running` | Training principles, physiology, workouts, pacing, injury prevention, race prep |
| `weightlifting` | Programming, technique cues, hypertrophy science, recovery |
| `recipe` | One high-protein **vegetarian** recipe (eggs/dairy OK) with protein per serving |
| `music` | One album or artist to discover, with a specific track to start on (see Music below) |
| `guitar` | Theory, technique, a chord/scale/riff to practise, ear training |
| `philosophy` | One thinker, argument or concept, made practical |
| `book` | One book recommendation (any genre) with why it's worth reading |
| `chess` | Openings, tactics, endgame principles, famous games |

**Broadening — about 60% of cards (3–4 per day):**

| key | What it covers |
|---|---|
| `psychology` | Biases, motivation, memory, classic experiments, how minds work |
| `history` | Turning points, surprising origins, people and events that shaped the world |
| `science` | Physics, chemistry, biology, space, earth science: the "why" behind everyday things |
| `health` | Sleep, stress, general fitness, habits, how the body works |
| `nutrition` | Nutrients, digestion, food science, evidence on diets (not recipes) |
| `technology` | How tech works, computing history, AI, the internet, engineering |
| `art-design` | Visual design, architecture, painting, typography, film |
| `literature` | Literary works, authors, storytelling devices, poetry |
| `geography` | Places, maps, borders, climates, why things are where they are |
| `language` | Word origins, linguistics, rhetoric, communication and persuasion |
| `productivity` | Focus, time, habits, learning techniques |
| `relationships` | Friendship, communication, conflict, social connection |
| `thinkers` | A famous thinker, scientist or inventor and their key idea |
| `mental-models` | Reusable thinking tools: inversion, second-order effects, base rates |
| `business` | Strategy, business models, famous companies, negotiation, marketing |
| `wildcard` | Anything genuinely interesting that fits nowhere else: animals, oddities, puzzles |

Over a week, investing should appear about 3 times (every other day) so its progression continues, and every other interest at least once. Use at least 12 different broadening topics across a week.

## Variety rules

1. **Six different topics every day.**
2. **No back-to-back topics.** A topic used on one day must not appear the next day. This includes the last day already written before a new batch.
3. **No repeated mixes.** No two days within the same 7-day stretch may share more than 3 topics, and no two days ever have the same set of six.
4. **Random-feeling order.** Shuffle card order day to day. Don't always open or close with the same kind of topic, and don't bunch the interest cards together. A good habit: open with something punchy or surprising.
5. Mix heavy and light: don't stack three dense, number-heavy cards on one day.

The validator (`tools/build-index.ps1`) warns about breaks of rules 2–3 and about days outside 2–3 interest cards.

## Music

- Mostly **English-language** music, ranging widely across genres (rock, pop, hip-hop, R&B, soul, funk, jazz, folk, country, punk, metal, electronic, indie, blues…) and eras (1950s to now).
- Non-English music only occasionally: at most about 1 in 8 music cards.
- Don't follow one genre or decade with the same one the next time music comes up.
- Name a specific track to start with and something specific to listen for.

## Feedback

`FEEDBACK.md` holds the learner's notes ("more history", "less chess", "cards too long"). Read it before planning and follow it. Feedback overrides this guide's defaults on mix, frequency, length and tone, but never the accuracy rules or the JSON format. If feedback changes card length, update the word range below **and** `$minWords`/`$maxWords` in `tools/build-index.ps1`.

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
- `icon` is optional; if omitted the topic's default icon is used. Available icons: `chart`, `globe`, `maple`, `shoe`, `barbell`, `leaf`, `headphones`, `pick`, `column`, `book`, `knight`, `spark`, `coin`, `house`, `scale`, `note`, `target`, `bowl`, `timer`, `brain`, `hourglass`, `flask`, `heart`, `apple`, `chip`, `palette`, `quill`, `compass`, `speech`, `people`, `bulb`, `briefcase`.

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
- **Review questions**: about every 3 days, replace one question with a question about a card from an **earlier** day. Set `"review": true` and `"reviewOf": "YYYY-MM-DD-N"` (the card id). Pick cards from 3–14 days ago, preferably concepts worth retaining (investing, economics, mental models, science).

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

`content/index.json` lists every day so the Archive works on GitHub Pages (which can't list folders). `tools/build-index.ps1` rebuilds it; keep it sorted by date ascending:

```json
{ "days": [ { "date": "2026-10-29", "topics": ["investing", "..."], "titles": ["Card 1 title", "..."] } ] }
```

The app hides future dates, so it's fine to generate days ahead.

## Quality rules

1. **Accurate.** Only state facts you're confident in. No invented statistics, quotes, or study results. If a number varies (e.g. TFSA limit), give the year it applies to.
2. **Specific beats general.** "A 10% FCF yield at a $50 share price means $5 of FCF per share" beats "FCF yield is useful."
3. **Every card must teach one thing.** If it needs two ideas, split it across days.
4. **Practical or memorable.** Running/lifting cards include something to try this week. Guitar cards include something to practise. Recipes include a protein number per serving and fit on one card. Broadening cards end with something to notice, try or retell.
5. **Body 100–150 words.** Plain, energetic prose. No bullet lists, no markdown, no emoji.
6. **No repeats.** Before writing, scan existing titles in `content/index.json` (and recent files) and don't repeat a concept, recipe, album, book, opening, story or fact. Sequels that go deeper are fine if the title makes it clear.
7. **Progression.** Over weeks, investing should build toward real buy-side skills: modelling intuition, reading 10-Ks, thesis writing, risk, position sizing, pitching.
8. **Music & books** must be real, verifiable works. Name a specific track or chapter to start with.
9. **Health and nutrition content** is general education, not medical advice; keep it evidence-based and conservative.
10. **Original.** Written fresh, never copied or closely paraphrased from any app, book or site.
11. **Valid JSON.** Straight double quotes, escaped inner quotes, no trailing commas.
