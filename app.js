/* =========================================================
   SimLab — App Logic
   ---------------------------------------------------------
   The core idea: every content "box" is tagged. As the user
   clicks boxes, we collect their tags into `activeTags`. The
   next round of boxes is scored against those tags, so the
   site quietly learns what each visitor cares about.

   This is the choose-your-own-adventure mechanism — but it
   stays invisible. The user just sees relevant content.
========================================================= */

/* ----- DOM refs ----- */
const contentArea  = document.getElementById('content-area');
const contextArea  = document.getElementById('context-area');
const crumbs       = document.getElementById('breadcrumbs');
const exploreBtn   = document.getElementById('explore-button');
const searchText   = document.getElementById('search-text');
const mainNav      = document.getElementById('main-nav');
const tagline      = document.getElementById('tagline');
const bottomBanner = document.getElementById('bottom-banner');

const SESSION_KEY = 'simlab_session';

/* =========================================================
   STATE
========================================================= */

let historyPath = siteSpecific.topLevel.slice(); // breadcrumb trail (page-level)
let activeTags  = [];                            // accumulated interest profile
let viewLog     = ['Home'];                      // everything the user has seen (for Journey Log)

/* Restore from session storage if present (per-tab persistence) */
const saved = sessionStorage.getItem(SESSION_KEY);
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed.historyPath)) historyPath = parsed.historyPath;
    if (Array.isArray(parsed.activeTags))  activeTags  = parsed.activeTags;
    if (Array.isArray(parsed.viewLog))     viewLog     = parsed.viewLog;
  } catch { /* corrupted state — ignore and start fresh */ }
}

function saveSession() {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ historyPath, activeTags, viewLog })
  );
}

/* =========================================================
   CHROME (header text, footer, nav, tagline)
========================================================= */

function applyText() {
  document.title              = siteSpecific.title;
  tagline.textContent         = siteSpecific.tagline;
  searchText.placeholder      = siteSpecific.searchPlaceholder;
  exploreBtn.textContent      = siteSpecific.exploreLabel;
  bottomBanner.textContent    = siteSpecific.footer;
}

function renderMenu() {
  mainNav.innerHTML = '';
  siteSpecific.menuItems.forEach(item => {
    const a = document.createElement('a');
    a.textContent = item;
    a.onclick = () => navigate(item);
    mainNav.appendChild(a);
  });
}

/* =========================================================
   VIEW LOG ("Journey Log" in the sidebar)
========================================================= */

function recordView(id) {
  if (!viewLog.includes(id)) {
    viewLog.push(id);
    updateSessionBox();
    saveSession();
  }
}

function updateSessionBox() {
  const el = document.getElementById('session-string');
  if (!el) return;
  el.innerHTML = '';

  if (viewLog.length === 0) {
    el.textContent = 'Your trail will appear here as you explore.';
    return;
  }

  viewLog.forEach((id, idx) => {
    const span = document.createElement('span');
    span.textContent =
      contentItems[id]?.label ||
      contentItems[id]?.title ||
      id;
    span.className = 'session-link';
    span.onclick = () => navigate(id);

    el.appendChild(span);
    if (idx < viewLog.length - 1) {
      const sep = document.createElement('span');
      sep.className = 'session-sep';
      sep.textContent = ' › ';
      el.appendChild(sep);
    }
  });
}

/* =========================================================
   TAG-BASED RECOMMENDATION ENGINE
   ---------------------------------------------------------
   This is the heart of the site. Given the user's active
   tags (built up from every box they've clicked), surface
   the 4 most relevant boxes they haven't seen recently.
========================================================= */

function getBoxes() {
  // We only suppress the LAST few items the user clicked,
  // not their entire history — otherwise the site runs out
  // of things to show on longer sessions.
  const recentlyVisited = new Set(historyPath.slice(-5));

  // Eligible candidates: anything that's a "box" (has title)
  // and isn't in the recent trail.
  const candidates = Object.entries(contentItems)
    .filter(([id, item]) =>
      item.title && item.tags && !recentlyVisited.has(id)
    )
    .map(([id, item]) => ({ id, ...item }));

  // Score each candidate by tag overlap with the user's profile.
  const scored = candidates.map(c => ({
    ...c,
    score: c.tags.filter(t => activeTags.includes(t)).length
  }));

  scored.sort((a, b) => b.score - a.score);

  // If anything matched, only show matches. Otherwise show
  // everything (so first-time / cold-start users still see content).
  const hasMatches = scored.some(s => s.score > 0);
  const pool = hasMatches ? scored.filter(s => s.score > 0) : scored;

  // Slight shuffle WITHIN the top tier so repeat visits feel
  // alive without breaking relevance.
  return pickTopWithJitter(pool, 4);
}

/* Pick `n` items, shuffling within score-tiers only */
function pickTopWithJitter(scored, n) {
  const tiers = {};
  scored.forEach(item => {
    const key = item.score ?? 0;
    if (!tiers[key]) tiers[key] = [];
    tiers[key].push(item);
  });

  const result = [];
  Object.keys(tiers)
    .map(Number)
    .sort((a, b) => b - a)
    .forEach(key => {
      const shuffled = tiers[key].sort(() => Math.random() - 0.5);
      shuffled.forEach(item => {
        if (result.length < n) result.push(item);
      });
    });

  return result;
}

/* =========================================================
   NAVIGATION
   ---------------------------------------------------------
   navigate() = jump to a page (resets the journey path)
   render()   = paint the current section + recommendations
========================================================= */

function navigate(section) {
  if (!contentItems[section]) return;

  // Page-level nav resets the breadcrumb but PRESERVES the
  // accumulated tag profile — so a returning user who has
  // explored "challenge" content still sees relevant boxes
  // when they jump to a different page.
  historyPath = ['Home', section].filter((v, i, a) => a.indexOf(v) === i);
  activeTags  = [...new Set([...activeTags, ...(contentItems[section]?.tags || [])])];

  recordView(section);
  saveSession();
  render(section);
}

function render(section) {
  updateBreadcrumbs();

  const page = contentItems[section] || {};
  contextArea.innerHTML = page.context || '';

  contentArea.innerHTML = '';
  const row = document.createElement('div');
  row.className = 'box-row';

  const boxes = getBoxes();

  if (boxes.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'You\'ve explored a lot already — try a top-level section above to start a new thread.';
    row.appendChild(empty);
  } else {
    boxes.forEach((box, idx) => {
      const div = document.createElement('div');
      div.className = 'box';
      div.style.animationDelay = `${idx * 0.06}s`;

      div.innerHTML = `
        <h3>${box.title}</h3>
        <p>${box.text}</p>
        <span class="box-cta">Explore →</span>
      `;

      div.onclick = (e) => {
        // Don't follow the box if the user clicked an inline link inside it.
        if (e.target.closest('[data-nav], a[href^="mailto"]')) return;

        activeTags = [...new Set([...activeTags, ...box.tags])];
        historyPath.push(box.id);
        recordView(box.id);
        saveSession();
        render(section);
      };

      row.appendChild(div);
    });
  }

  contentArea.appendChild(row);
}

/* =========================================================
   BREADCRUMBS — show + allow jumping back
========================================================= */

function updateBreadcrumbs() {
  crumbs.innerHTML = '';

  historyPath.forEach((node, i) => {
    const span = document.createElement('span');
    span.textContent =
      contentItems[node]?.label ||
      contentItems[node]?.title ||
      node;

    span.onclick = () => {
      // Clicking a crumb truncates the trail back to that point.
      historyPath = historyPath.slice(0, i + 1);
      saveSession();
      render(node);
    };

    crumbs.appendChild(span);

    if (i < historyPath.length - 1) {
      const sep = document.createElement('span');
      sep.className = 'crumb-sep';
      sep.textContent = ' › ';
      crumbs.appendChild(sep);
    }
  });
}

/* =========================================================
   SEARCH (keyword routing)
========================================================= */

function handleSearch() {
  const text = searchText.value.toLowerCase().trim();
  searchText.value = '';
  if (!text) return;

  // First try whole-word match, then partial.
  const key =
    Object.keys(keywordMap).find(k => text.split(/\s+/).includes(k)) ||
    Object.keys(keywordMap).find(k => text.includes(k));

  if (key) {
    navigate(keywordMap[key]);
  } else {
    // No match: nudge user toward the About page with a soft message.
    contextArea.innerHTML =
      `Hmm — we couldn't match "<em>${escapeHTML(text)}</em>" to a section. ` +
      `Try a top-level topic, or explore from the cards below.`;
  }
}

function escapeHTML(s) {
  return s.replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

exploreBtn.onclick = handleSearch;
searchText.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

/* =========================================================
   INLINE LINKS — anything with [data-nav="X"] jumps to X
========================================================= */

document.addEventListener('click', e => {
  const link = e.target.closest('[data-nav]');
  if (!link) return;
  e.preventDefault();
  e.stopPropagation();
  navigate(link.dataset.nav);
});

/* =========================================================
   RESET BUTTON (clears session — useful for demos)
========================================================= */

function resetJourney() {
  sessionStorage.removeItem(SESSION_KEY);
  historyPath = siteSpecific.topLevel.slice();
  activeTags  = [];
  viewLog     = ['Home'];
  updateSessionBox();
  render('Home');
}

const resetBtn = document.getElementById('reset-btn');
if (resetBtn) resetBtn.onclick = resetJourney;

/* =========================================================
   INIT
========================================================= */

applyText();
renderMenu();
updateSessionBox();
render(historyPath[historyPath.length - 1]);