'use strict';

/* =========================================================
   Daily Learn — plain JS, no build step.
   Content: content/index.json + content/YYYY-MM-DD.json
   State:   localStorage key "dailylearn.v1"
   ========================================================= */

const TOPICS = {
  investing:          { label: 'Investing',      color: '#2ee59d', icon: 'chart' },
  economics:          { label: 'Economics',      color: '#4d8dff', icon: 'globe' },
  'canadian-finance': { label: 'CDN Finance',    color: '#ff4d5e', icon: 'maple' },
  running:            { label: 'Running',        color: '#ff8a3d', icon: 'shoe' },
  weightlifting:      { label: 'Lifting',        color: '#9b6bff', icon: 'barbell' },
  recipe:             { label: 'Recipe',         color: '#ffd23f', icon: 'leaf' },
  music:              { label: 'Music',          color: '#ff5fb7', icon: 'headphones' },
  guitar:             { label: 'Guitar',         color: '#22d3c5', icon: 'pick' },
  philosophy:         { label: 'Philosophy',     color: '#e8d5b5', icon: 'column' },
  book:               { label: 'Book Pick',      color: '#b6f03c', icon: 'book' },
  chess:              { label: 'Chess',          color: '#d9dce3', icon: 'knight' },
  wildcard:           { label: 'Wildcard',       color: '#7cf0ff', icon: 'spark' },
};
const FALLBACK_TOPIC = { label: 'Lesson', color: '#f4f4f6', icon: 'spark' };
const topicOf = (key) => TOPICS[key] || FALLBACK_TOPIC;

/* 48×48 line icons, stroked with currentColor. Cards may set "icon" to any key here. */
const ICONS = {
  chart: '<path d="M6 41h36M6 41V7"/><path d="M12 32l9-9 7 6 12-14"/><path d="M33 15h7v7"/>',
  globe: '<circle cx="24" cy="24" r="17"/><path d="M7 24h34M24 7c-7 7-7 27 0 34M24 7c7 7 7 27 0 34"/>',
  maple: '<path d="M24 5l3 7 4-2-1 10 5-5 2 4 5-1-2 6 3 2-9 6 1 3-9.5-1.5V43h-3v-8.5L13 36l1-3-9-6 3-2-2-6 5 1 2-4 5 5-1-10 4 2z"/>',
  shoe: '<path d="M5 34c0-6 2-13 4-18l7 2c1 3 4 5 8 5l6 1c6 1 11 4 13 9v4H5z"/><path d="M5 37h38M18 22l3-3M23 23l3-3"/>',
  barbell: '<path d="M4 24h5M18 24h12M39 24h5"/><rect x="9" y="13" width="5" height="22" rx="1.5"/><rect x="34" y="13" width="5" height="22" rx="1.5"/><rect x="14" y="17" width="4" height="14" rx="1.5"/><rect x="30" y="17" width="4" height="14" rx="1.5"/>',
  leaf: '<path d="M10 39C8 22 18 9 40 8c0 20-12 31-30 31z"/><path d="M10 39c8-10 15-17 24-23"/>',
  headphones: '<path d="M8 31v-7a16 16 0 0 1 32 0v7"/><rect x="6" y="28" width="9" height="13" rx="3"/><rect x="33" y="28" width="9" height="13" rx="3"/>',
  pick: '<path d="M24 43C14 33 8 23 9 15c1-6 7-8 15-8s14 2 15 8c1 8-5 18-15 28z"/><path d="M18 17h12M19 23h10"/>',
  column: '<path d="M7 13h34L24 5zM9 38h30M6 43h36M13 17v17M20 17v17M28 17v17M35 17v17M9 13v4h30v-4"/>',
  book: '<path d="M24 12c-5-4-12-5-18-4v28c6-1 13 0 18 4 5-4 12-5 18-4V8c-6-1-13 0-18 4zM24 12v28"/>',
  knight: '<path d="M13 42h23M16 42c0-7 2-11 6-15-4 1-7 1-9-1l8-12c3-4 8-6 11-4 5 3 6 11 5 19-1 5-2 9-3 13"/><circle cx="26" cy="17" r="1.5"/>',
  spark: '<path d="M24 5l4 13 13 6-13 6-4 13-4-13-13-6 13-6z"/>',
  coin: '<circle cx="24" cy="24" r="17"/><path d="M29 18c-1-2-3-3-5-3-3 0-5 2-5 4s2 3 5 4 6 2 6 5-3 4-6 4c-2 0-4-1-5-3M24 11v4M24 33v4"/>',
  house: '<path d="M7 22L24 8l17 14M11 19v21h26V19M20 40V29h8v11"/>',
  scale: '<path d="M24 6v34M14 41h20M10 12h28M10 12L4 26a6 6 0 0 0 12 0zM38 12l-6 14a6 6 0 0 0 12 0z"/>',
  note: '<path d="M18 36V10l20-4v26"/><circle cx="13" cy="36" r="5"/><circle cx="33" cy="32" r="5"/>',
  target: '<circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="10"/><circle cx="24" cy="24" r="3"/>',
  bowl: '<path d="M6 24h36a18 15 0 0 1-36 0zM16 41h16M18 18c0-3 3-3 3-6M26 18c0-3 3-3 3-6"/>',
  timer: '<circle cx="24" cy="27" r="15"/><path d="M24 27v-7M20 6h8M24 6v6"/>',
  brain: '<path d="M20 8a6 6 0 0 0-6 6 6 6 0 0 0-5 9 6 6 0 0 0 3 10 6 6 0 0 0 8 7V8zM28 8a6 6 0 0 1 6 6 6 6 0 0 1 5 9 6 6 0 0 1-3 10 6 6 0 0 1-8 7V8z"/>',
};
const icon = (name) =>
  `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.spark}</svg>`;

/* ---------- Dates (always local time) ---------- */
const pad = (n) => String(n).padStart(2, '0');
const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const pretty = (s, opts = { weekday: 'short', month: 'short', day: 'numeric' }) => parse(s).toLocaleDateString('en-CA', opts);

// ?date=YYYY-MM-DD lets you preview another day while testing.
const override = new URLSearchParams(location.search).get('date');
const TODAY = override && /^\d{4}-\d{2}-\d{2}$/.test(override) ? override : fmt(new Date());

/* ---------- State ---------- */
const STORE_KEY = 'dailylearn.v1';
const state = loadState();

function loadState() {
  const base = { completed: {}, activity: [], saved: {}, progress: {} };
  try { return { ...base, ...JSON.parse(localStorage.getItem(STORE_KEY) || '{}') }; }
  catch { return base; }
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch { /* storage full or blocked */ }
}

function streaks() {
  const days = new Set(state.activity);
  let d = parse(TODAY);
  if (!days.has(fmt(d))) d = addDays(d, -1); // today not done yet: streak still alive from yesterday
  let current = 0;
  while (days.has(fmt(d))) { current++; d = addDays(d, -1); }

  let best = 0, run = 0, prev = null;
  for (const s of [...days].sort()) {
    run = prev && fmt(addDays(parse(prev), 1)) === s ? run + 1 : 1;
    best = Math.max(best, run);
    prev = s;
  }
  return { current, best };
}

/* ---------- Content loading ---------- */
const lessonCache = new Map();
let indexCache = null;

async function loadLesson(date) {
  if (lessonCache.has(date)) return lessonCache.get(date);
  const res = await fetch(`content/${date}.json`, { cache: 'no-cache' });
  if (!res.ok) return null;
  const lesson = await res.json();
  lesson.date = lesson.date || date;
  lesson.cards.forEach((c, i) => { c.id = c.id || `${date}-${i + 1}`; });
  lessonCache.set(date, lesson);
  return lesson;
}

async function loadIndex() {
  if (indexCache) return indexCache;
  try {
    const res = await fetch('content/index.json', { cache: 'no-cache' });
    const data = await res.json();
    indexCache = (data.days || []).filter((d) => d.date <= TODAY).sort((a, b) => b.date.localeCompare(a.date));
  } catch { indexCache = []; }
  return indexCache;
}

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const paras = (s) => String(s ?? '').split(/\n\s*\n/).map((p) => `<p class="body">${esc(p)}</p>`).join('');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

function mix(hex, amount, base = '#0b0b0f') {
  const h = (x) => [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16));
  const [a, b] = [h(hex), h(base)];
  return '#' + a.map((v, i) => pad(Math.round(v * amount + b[i] * (1 - amount)).toString(16))).join('');
}

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 1600);
}

function setThemeColor(c) { $('meta[name="theme-color"]').setAttribute('content', c); }

function updateStreakBadge() {
  const { current } = streaks();
  $('#streak-count').textContent = current;
  $('#streak').classList.toggle('lit', state.activity.includes(TODAY));
}

/* =========================================================
   Tabs
   ========================================================= */
let currentTab = 'today';
const view = $('#view');

document.querySelectorAll('.tab').forEach((btn) =>
  btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach((b) => b.classList.toggle('active', b.dataset.tab === tab));
  view.style.animation = 'none'; void view.offsetWidth; view.style.animation = '';
  window.scrollTo(0, 0);
  render();
}

function render() {
  updateStreakBadge();
  if (currentTab === 'today') return renderToday();
  if (currentTab === 'archive') return renderArchive();
  return renderSaved();
}

/* ---------- Today ---------- */
async function renderToday() {
  const lesson = await loadLesson(TODAY).catch(() => null);
  const done = state.completed[TODAY];
  const seen = state.progress[TODAY] ?? -1;
  const { current, best } = streaks();
  const doneDays = Object.keys(state.completed).length;
  const pcts = Object.values(state.completed).map((c) => c.score / c.total);
  const avg = pcts.length ? Math.round((pcts.reduce((a, b) => a + b, 0) / pcts.length) * 100) + '%' : '—';

  let hero;
  if (lesson) {
    const items = lesson.cards.map((c, i) => {
      const t = topicOf(c.topic);
      return `<li class="${i <= seen || done ? 'done' : ''}" style="--c:${t.color}">
        <span class="dot">${icon(c.icon || t.icon)}</span>
        <div><div class="k">${esc(t.label)}</div><div class="t">${esc(c.title)}</div></div>
      </li>`;
    }).join('');
    const cta = done
      ? `<div class="done-badge">✓ Done today · ${done.score}/${done.total} on the quiz</div>
         <button class="btn secondary" data-act="start">Revisit cards</button>
         <button class="btn secondary" data-act="quiz">Retake quiz</button>`
      : seen >= 0 && seen < lesson.cards.length - 1
        ? `<button class="btn" data-act="resume">Continue · card ${seen + 2} of ${lesson.cards.length}</button>`
        : seen >= lesson.cards.length - 1
          ? `<button class="btn" data-act="quiz">Take the quiz</button>`
          : `<button class="btn" data-act="start">Start today's six</button>`;
    hero = `<div class="hero"><ul class="lineup">${items}</ul>${cta}</div>`;
  } else {
    const idx = await loadIndex();
    const latest = idx[0];
    hero = `<div class="hero"><div class="empty">
      <strong>No lesson for today yet</strong>
      Run <code>/generate-week</code> in Claude Code to add the next seven days.
    </div>${latest ? `<button class="btn secondary" data-open="${latest.date}">Open latest (${pretty(latest.date)})</button>` : ''}</div>`;
  }

  const week = Array.from({ length: 7 }, (_, i) => {
    const d = fmt(addDays(parse(TODAY), i - 6));
    const lbl = parse(d).toLocaleDateString('en-CA', { weekday: 'narrow' });
    return `<div class="d ${state.activity.includes(d) ? 'on' : ''} ${d === TODAY ? 'today' : ''}">${lbl}<i></i></div>`;
  }).join('');

  view.innerHTML = `
    <p class="h-eyebrow">${pretty(TODAY, { weekday: 'long', month: 'long', day: 'numeric' })}</p>
    <h1 class="h-display">${done ? 'Nice work.<br>See you tomorrow.' : 'Six ideas.<br>Five minutes.'}</h1>
    ${hero}
    <h2 class="h-section">Your progress</h2>
    <div class="stats">
      <div class="stat"><b>${current}</b><span>Streak</span></div>
      <div class="stat"><b>${best}</b><span>Best</span></div>
      <div class="stat"><b>${doneDays}</b><span>Days</span></div>
      <div class="stat"><b>${avg}</b><span>Avg</span></div>
    </div>
    <div class="week">${week}</div>`;

  view.onclick = async (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    const openDate = e.target.closest('[data-open]')?.dataset.open;
    if (openDate) return openLesson(await loadLesson(openDate));
    if (!act || !lesson) return;
    if (act === 'start') openLesson(lesson, 0);
    if (act === 'resume') openLesson(lesson, seen + 1);
    if (act === 'quiz') openLesson(lesson, lesson.cards.length);
  };
}

/* ---------- Archive ---------- */
async function renderArchive() {
  const days = await loadIndex();
  if (!days.length) {
    view.innerHTML = `<h1 class="h-display">Archive</h1><div class="empty"><strong>Nothing here yet</strong>Past days will show up here.</div>`;
    return;
  }
  const rows = days.map((d) => {
    const c = state.completed[d.date];
    const pips = (d.topics || []).map((t) => `<i style="--c:${topicOf(t).color}"></i>`).join('');
    const more = d.titles && d.titles.length > 1 ? ` + ${d.titles.length - 1} more` : '';
    return `<button class="row" data-date="${d.date}">
      <div class="main">
        <div class="title">${d.date === TODAY ? 'Today' : pretty(d.date)}</div>
        <div class="sub">${esc((d.titles || [])[0] || '')}${more}</div>
        <div class="pips">${pips}</div>
      </div>
      ${c ? `<span class="score">${c.score}/${c.total}</span>` : '<span class="score none">Not done</span>'}
    </button>`;
  }).join('');
  view.innerHTML = `<p class="h-eyebrow">${days.length} day${days.length === 1 ? '' : 's'}</p><h1 class="h-display">Archive</h1><div class="list">${rows}</div>`;
  view.onclick = async (e) => {
    const date = e.target.closest('[data-date]')?.dataset.date;
    if (!date) return;
    const lesson = await loadLesson(date).catch(() => null);
    lesson ? openLesson(lesson, 0) : toast('Could not load that day');
  };
}

/* ---------- Saved ---------- */
let savedFilter = 'all';
function renderSaved() {
  const all = Object.values(state.saved).sort((a, b) => b.savedAt - a.savedAt);
  const topics = [...new Set(all.map((c) => c.topic))];
  if (savedFilter !== 'all' && !topics.includes(savedFilter)) savedFilter = 'all';
  const list = savedFilter === 'all' ? all : all.filter((c) => c.topic === savedFilter);

  const chips = topics.length > 1
    ? `<div class="filter"><button class="chip ${savedFilter === 'all' ? 'on' : ''}" data-filter="all">All</button>${
      topics.map((t) => `<button class="chip ${savedFilter === t ? 'on' : ''}" style="--c:${topicOf(t).color}" data-filter="${t}">${esc(topicOf(t).label)}</button>`).join('')}</div>`
    : '';

  const rows = list.map((c) => {
    const t = topicOf(c.topic);
    return `<div class="row saved-card" style="--c:${t.color}" data-id="${esc(c.id)}" role="button" tabindex="0">
      <div class="main">
        <div class="tag-sm">${esc(t.label)}</div>
        <div class="title">${esc(c.title)}</div>
        <div class="sub">${esc(c.takeaway)}</div>
      </div>
      <button class="remove" data-remove="${esc(c.id)}" aria-label="Remove from saved">
        <svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4.5L6 21z"/></svg>
      </button>
    </div>`;
  }).join('');

  view.innerHTML = `<p class="h-eyebrow">${all.length} card${all.length === 1 ? '' : 's'}</p><h1 class="h-display">Saved</h1>${chips}
    ${all.length ? `<div class="list">${rows}</div>` : `<div class="empty"><strong>No saved cards</strong>Tap the bookmark on any card to keep it here.</div>`}`;

  view.onclick = (e) => {
    const f = e.target.closest('[data-filter]')?.dataset.filter;
    if (f) { savedFilter = f; return renderSaved(); }
    const rm = e.target.closest('[data-remove]')?.dataset.remove;
    if (rm) { delete state.saved[rm]; saveState(); toast('Removed'); return renderSaved(); }
    const id = e.target.closest('[data-id]')?.dataset.id;
    if (id && state.saved[id]) openSingle(state.saved[id]);
  };
}

/* =========================================================
   Player: cards → quiz → results
   ========================================================= */
const playerEl = $('#player');
const stage = $('#stage');
const segmentsEl = $('#segments');
const bookmarkBtn = $('#bookmark-btn');
const P = { lesson: null, single: null, step: 0, q: 0, answers: [] };
// step: 0..n-1 = cards, n = quiz, n+1 = results

function openLesson(lesson, step = 0) {
  if (!lesson) return toast('Could not load lesson');
  Object.assign(P, { lesson, single: null, step, q: 0, answers: [] });
  const n = lesson.cards.length;
  segmentsEl.innerHTML = lesson.cards.map(() => '<i></i>').join('') + '<i class="quiz"></i>';
  $('#player-date').textContent = lesson.date === TODAY ? 'Today' : pretty(lesson.date);
  showPlayer();
  step >= n ? renderQuiz(0) : renderCard(0);
}

function openSingle(card) {
  Object.assign(P, { lesson: null, single: card, step: 0 });
  segmentsEl.innerHTML = '<i class="done"></i>';
  $('#player-date').textContent = card.date ? pretty(card.date) : 'Saved';
  showPlayer();
  renderCard(0);
}

function showPlayer() {
  playerEl.hidden = false;
  document.body.style.overflow = 'hidden';
  if (!history.state?.player) history.pushState({ player: true }, '');
}

function closePlayer(fromPop = false) {
  if (playerEl.hidden) return;
  playerEl.hidden = true;
  stage.innerHTML = '';
  document.body.style.overflow = '';
  setThemeColor('#0e0e12');
  if (!fromPop && history.state?.player) history.back();
  render();
}
window.addEventListener('popstate', () => closePlayer(true));
$('#close-btn').addEventListener('click', () => closePlayer());

function setSegments() {
  if (P.single) return;
  const n = P.lesson.cards.length;
  [...segmentsEl.children].forEach((seg, i) => {
    seg.classList.toggle('done', i < n ? i <= P.step : P.step > n);
  });
}

function setBackground(color) {
  playerEl.style.setProperty('--card-bg', color);
  setThemeColor(color);
}

/* Swap the visible screen, sliding in the direction of travel. */
function show(html, dir, cssVars = '') {
  const old = stage.querySelector('.screen:not(.leaving)');
  const el = document.createElement('div');
  el.className = 'screen';
  el.setAttribute('style', cssVars);
  el.innerHTML = html;
  stage.appendChild(el);
  if (old) {
    old.classList.add('leaving');
    if (reduceMotion || !dir) old.remove();
    else {
      const ease = 'cubic-bezier(.2,.8,.2,1)';
      old.animate([{ transform: 'none', opacity: 1 }, { transform: `translateX(${-dir * 28}%)`, opacity: 0 }], { duration: 260, easing: ease })
        .onfinish = () => old.remove();
      el.animate([{ transform: `translateX(${dir * 28}%)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 320, easing: ease });
    }
  }
  return el;
}

function renderCard(dir) {
  const card = P.single || P.lesson.cards[P.step];
  const t = topicOf(card.topic);
  const n = P.single ? 1 : P.lesson.cards.length;
  setBackground(mix(t.color, 0.17));
  bookmarkBtn.hidden = false;
  bookmarkBtn.classList.toggle('on', !!state.saved[card.id]);

  const hint = P.single ? 'Saved card' : P.step === n - 1 ? `Tap to start the quiz · ${P.step + 1} / ${n}` : `Tap or swipe · ${P.step + 1} / ${n}`;
  show(`<article class="card">
      <div class="card-head"><span class="tag">${esc(t.label)}</span><div class="card-icon">${icon(card.icon || t.icon)}</div></div>
      <h2>${esc(card.title)}</h2>
      ${paras(card.body)}
      <div class="example"><span class="lbl">Example</span>${esc(card.example)}</div>
      <div class="takeaway"><span class="lbl">Takeaway</span>${esc(card.takeaway)}</div>
      <div class="hint">${hint}</div>
    </article>`, dir, `--c:${t.color}`);

  if (!P.single) {
    state.progress[P.lesson.date] = Math.max(state.progress[P.lesson.date] ?? -1, P.step);
    saveState();
    setSegments();
  }
}

function next() {
  if (P.single || !P.lesson) return;
  const n = P.lesson.cards.length;
  if (P.step < n - 1) { P.step++; renderCard(1); }
  else if (P.step === n - 1) { P.step = n; P.q = 0; P.answers = []; renderQuiz(1); }
}
function prev() {
  if (P.single || !P.lesson) return;
  const n = P.lesson.cards.length;
  if (P.step > 0 && P.step < n) { P.step--; renderCard(-1); }
  else if (P.step === n && P.q === 0 && P.answers[0] === undefined) { P.step = n - 1; renderCard(-1); }
}

/* ---------- Quiz ---------- */
function renderQuiz(dir) {
  const quiz = P.lesson.quiz || [];
  P.step = P.lesson.cards.length;
  if (!quiz.length) return renderResults(dir);
  const q = quiz[P.q];
  setBackground('#16161d');
  bookmarkBtn.hidden = true;
  setSegments();

  const opts = q.options.map((o, i) =>
    `<button class="option" data-i="${i}"><span class="letter">${'ABCD'[i]}</span><span>${esc(o)}</span></button>`).join('');
  const el = show(`<div class="quiz">
      <div class="quiz-meta"><span>Question ${P.q + 1} of ${quiz.length}</span>${q.review ? '<span class="review-pill">Review</span>' : ''}</div>
      <h2>${esc(q.question)}</h2>
      <div class="options">${opts}</div>
      <div class="after"></div>
    </div>`, dir);

  el.querySelector('.options').addEventListener('click', (e) => {
    const btn = e.target.closest('.option');
    if (!btn || P.answers[P.q] !== undefined) return;
    const pick = Number(btn.dataset.i);
    const right = pick === q.answer;
    P.answers[P.q] = pick;
    el.querySelectorAll('.option').forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add('correct');
      else if (i === pick) b.classList.add('wrong');
      else b.classList.add('dim');
    });
    if (!right && navigator.vibrate) navigator.vibrate(40);
    const last = P.q === quiz.length - 1;
    el.querySelector('.after').innerHTML = `
      <div class="feedback ${right ? 'good' : 'bad'}"><b>${right ? 'Correct' : 'Not quite'}</b>${esc(q.explanation || '')}</div>
      <button class="btn" data-next>${last ? 'See my score' : 'Next question'}</button>`;
    const nextBtn = el.querySelector('[data-next]');
    nextBtn.addEventListener('click', () => { last ? renderResults(1) : (P.q++, renderQuiz(1)); });
    nextBtn.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
  });
}

/* ---------- Results ---------- */
function renderResults(dir) {
  const quiz = P.lesson.quiz || [];
  const total = quiz.length;
  const score = quiz.reduce((s, q, i) => s + (P.answers[i] === q.answer ? 1 : 0), 0);
  const date = P.lesson.date;
  P.step = P.lesson.cards.length + 1;

  const prevDone = state.completed[date];
  state.completed[date] = { score, total, best: Math.max(score, prevDone?.best ?? 0), at: Date.now() };
  if (!state.activity.includes(TODAY)) state.activity.push(TODAY);
  state.progress[date] = P.lesson.cards.length - 1;
  saveState();
  setSegments();
  setBackground('#16161d');
  bookmarkBtn.hidden = true;

  const ratio = total ? score / total : 1;
  const [headline, line] = ratio === 1 ? ['Perfect score', 'Every idea landed. Brilliant.']
    : ratio >= 0.67 ? ['Strong day', 'Most of it stuck — skim the misses tomorrow.']
    : ratio >= 0.34 ? ['Good effort', 'Revisit the cards once more to lock it in.']
    : ['Keep going', 'Learning happens in the review. Try the cards again.'];
  const { current } = streaks();
  const C = 2 * Math.PI * 76;

  const el = show(`<div class="confetti"></div>
    <div class="results-inner">
      <div class="ring">
        <svg viewBox="0 0 170 170"><circle class="track" cx="85" cy="85" r="76"/><circle class="bar" cx="85" cy="85" r="76" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg>
        <div class="num"><div>${score}/${total}<small>correct</small></div></div>
      </div>
      <h2>${headline}</h2>
      <p>${line}<br>🔥 ${current}-day streak</p>
      <div class="actions">
        <button class="btn" data-done>Done</button>
        <button class="btn secondary" data-review>Review cards</button>
      </div>
    </div>`, dir);
  el.classList.add('results');

  setTimeout(() => { el.querySelector('.bar').style.strokeDashoffset = String(C * (1 - ratio)); }, 60);
  if (ratio >= 0.83 && !reduceMotion) confetti(el.querySelector('.confetti'));
  el.querySelector('[data-done]').addEventListener('click', () => closePlayer());
  el.querySelector('[data-review]').addEventListener('click', () => { P.step = 0; renderCard(-1); });
  updateStreakBadge();
}

function confetti(box) {
  const colors = Object.values(TOPICS).map((t) => t.color);
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('i');
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[i % colors.length];
    p.style.animationDuration = 1.6 + Math.random() * 1.6 + 's';
    p.style.animationDelay = Math.random() * 0.5 + 's';
    box.appendChild(p);
  }
}

/* ---------- Bookmark ---------- */
bookmarkBtn.addEventListener('click', () => {
  const card = P.single || P.lesson?.cards[P.step];
  if (!card) return;
  if (state.saved[card.id]) { delete state.saved[card.id]; toast('Removed from Saved'); }
  else {
    state.saved[card.id] = { ...card, date: card.date || P.lesson?.date, savedAt: Date.now() };
    toast('Saved');
  }
  saveState();
  bookmarkBtn.classList.toggle('on', !!state.saved[card.id]);
});

/* ---------- Gestures: tap left/right, swipe, keyboard ---------- */
let touch = null;
stage.addEventListener('pointerdown', (e) => { touch = { x: e.clientX, y: e.clientY }; });
stage.addEventListener('pointercancel', () => { touch = null; });
stage.addEventListener('pointerup', (e) => {
  if (!touch) return;
  const dx = e.clientX - touch.x, dy = e.clientY - touch.y;
  touch = null;
  const inQuiz = P.lesson && P.step >= P.lesson.cards.length;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) return dx < 0 ? (!inQuiz && next()) : prev();
  if (inQuiz || Math.abs(dx) > 10 || Math.abs(dy) > 10) return;
  if (e.target.closest('button, a') || getSelection().toString()) return;
  const r = stage.getBoundingClientRect();
  (e.clientX - r.left) / r.width < 0.3 ? prev() : next();
});
document.addEventListener('keydown', (e) => {
  if (playerEl.hidden) return;
  const inQuiz = P.lesson && P.step >= P.lesson.cards.length;
  if (e.key === 'Escape') closePlayer();
  else if (e.key === 'ArrowLeft') prev();
  else if ((e.key === 'ArrowRight' || e.key === ' ') && !inQuiz) { e.preventDefault(); next(); }
});

/* ---------- Boot ---------- */
render();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
