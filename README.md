# Daily Learn

Six bite-size lesson cards and a six-question quiz every day. Plain HTML/CSS/JS, no build step, installable as a PWA.

```
index.html  styles.css  app.js     the app
sw.js  manifest.webmanifest  icons/   PWA bits
content/YYYY-MM-DD.json            one file per day
content/index.json                 list of days (for the Archive tab)
CONTENT_GUIDE.md                   rules for writing lessons
.claude/commands/generate-week.md  the /generate-week slash command
tools/build-index.ps1              validates content + rebuilds index.json
tools/serve.ps1                    local preview server
```

## Preview locally

The app fetches JSON, so it needs `http://` (opening `index.html` directly won't work). Double-click `serve.cmd`, or run it from a terminal:

```powershell
.\serve.cmd
```

Open http://localhost:8080. Add `?date=2026-11-02` to preview a different day.

## Add more lessons

In Claude Code, from this folder, run:

```
/generate-week
```

It reads `CONTENT_GUIDE.md`, checks past titles to avoid repeats, writes the next 7 days, validates them, and commits + pushes. GitHub Pages redeploys automatically about a minute later.

## Publish on GitHub Pages (one-time)

1. **Create the repo.** Go to https://github.com/new. Name it `daily-learn`, set it to **Public** (Pages is free for public repos), and **don't** tick "Add a README". Click **Create repository**.
2. **Connect and push.** In this folder:
   ```powershell
   git remote add origin https://github.com/YOUR-USERNAME/daily-learn.git
   git push -u origin main
   ```
   The first push opens a browser window to sign in to GitHub (Git Credential Manager ships with Git for Windows). After that, pushes just work.
3. **Turn on Pages.** On the repo page: **Settings → Pages**. Under *Build and deployment*, set **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, then **Save**.
4. **Wait ~1–2 minutes**, refresh the Pages settings screen, and you'll see your URL: `https://YOUR-USERNAME.github.io/daily-learn/`. You can watch the deploy under the repo's **Actions** tab.
5. **Install on your phone.**
   - iPhone: open the URL in **Safari** → Share → **Add to Home Screen**.
   - Android: open in **Chrome** → ⋮ menu → **Add to Home screen / Install app**.

## Notes

- Progress (streak, scores, saved cards) lives in `localStorage` on each device. On iPhone the home-screen app has its own storage, separate from Safari, so use one or the other.
- The streak counts days on which you finished a quiz (any day's lesson).
- Future-dated files are hidden from Today and the Archive until their date arrives, so generating ahead is safe.
- A public repo means the lesson files are publicly viewable. That's harmless here, but keep anything personal out of them.
