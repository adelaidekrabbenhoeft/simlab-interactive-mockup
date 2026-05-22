
const contentArea = document.getElementById('content-area');
const contextArea = document.getElementById('context-area');
const crumbs = document.getElementById('breadcrumbs');
const exploreBtn = document.getElementById('explore-button');
const searchText = document.getElementById('search-text');
const mainNav = document.getElementById('main-nav');
const tagline = document.getElementById('tagline');
const bottomBanner = document.getElementById('bottom-banner');

const SESSION_KEY = 'simlab_session';

/* =======================
   STATE
======================= */

let historyPath = siteSpecific.topLevel.slice();
let activeTags = [];

/* ✅ store IDS, not labels */
let viewLog = ['Home'];

/* restore session */
const saved = sessionStorage.getItem(SESSION_KEY);
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed.historyPath)) historyPath = parsed.historyPath;
    if (Array.isArray(parsed.activeTags)) activeTags = parsed.activeTags;
    if (Array.isArray(parsed.viewLog)) viewLog = parsed.viewLog;
  } catch {}
}

function saveSession() {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ historyPath, activeTags, viewLog })
  );
}

/* =======================
   TEXT INIT
======================= */

function applyText() {
  document.title = siteSpecific.title;
  tagline.textContent = siteSpecific.tagline;
  searchText.placeholder = siteSpecific.searchPlaceholder;
  exploreBtn.textContent = siteSpecific.exploreLabel;
  bottomBanner.textContent = siteSpecific.footer;
}

/* =======================
   MENU
======================= */

function renderMenu() {
  mainNav.innerHTML = '';
  siteSpecific.menuItems.forEach(item => {
    const a = document.createElement('a');
    a.textContent = item;
    a.onclick = () => navigate(item);
    mainNav.appendChild(a);
  });
}

/* =======================
   VIEW TRACKING (CLICKABLE)
======================= */

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

  viewLog.forEach((id, idx) => {
    const span = document.createElement('span');
    span.textContent =
      contentItems[id]?.label ||
      contentItems[id]?.title ||
      id;

    span.className = 'session-link';
    span.onclick = () => navigate(id);

    el.appendChild(span);
    if (idx < viewLog.length - 1) el.append(' | ');
  });
}

/* =======================
   TAG MATCHING
======================= */

function getBoxes() {
  const visited = new Set(historyPath);

  const candidates = Object.entries(contentItems)
    .filter(([id, item]) =>
      item.title &&
      item.tags &&
      !visited.has(id)
    )
    .map(([id, item]) => ({ id, ...item }));

  const scored = candidates.map(c => ({
    ...c,
    score: c.tags.filter(t => activeTags.includes(t)).length
  }));

  scored.sort((a, b) => b.score - a.score);

  const pool = scored.some(s => s.score > 0)
    ? scored.filter(s => s.score > 0)
    : scored;

  return shuffle(pool).slice(0, 4);
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

/* =======================
   NAVIGATION
======================= */

function navigate(section) {
  if (!contentItems[section]) return;

  historyPath = ['Home', section];
  activeTags = contentItems[section]?.tags || [];

  recordView(section);
  saveSession();
  render(section);
}

/* =======================
   RENDER
======================= */

function render(section) {
  updateBreadcrumbs();

  const page = contentItems[section] || {};
  contextArea.textContent = page.context || '';

  contentArea.innerHTML = '';
  const row = document.createElement('div');
  row.className = 'box-row';

  getBoxes().forEach(box => {
    const div = document.createElement('div');
    div.className = 'box';

    div.innerHTML = `
      <h3>${box.title}</h3>
      <p>${box.text}</p>
    `;

    div.onclick = () => {
      activeTags = [...new Set([...activeTags, ...box.tags])];
      historyPath.push(box.id);
      recordView(box.id);
      saveSession();
      render(section);
    };

    row.appendChild(div);
  });

  contentArea.appendChild(row);
}

/* =======================
   BREADCRUMBS
======================= */

function updateBreadcrumbs() {
  crumbs.innerHTML = '';

  historyPath.forEach((node, i) => {
    const span = document.createElement('span');
    span.textContent =
      contentItems[node]?.label ||
      contentItems[node]?.title ||
      node;

    span.onclick = () => {
      historyPath = historyPath.slice(0, i + 1);
      recordView(node);
      saveSession();
      render(node);
    };

    crumbs.appendChild(span);
    if (i < historyPath.length - 1) crumbs.append(' > ');
  });
}

/* =======================
   SEARCH
======================= */

function handleSearch() {
  const text = searchText.value.toLowerCase().trim();
  searchText.value = '';
  if (!text) return;

  const key = Object.keys(keywordMap).find(k => text.includes(k));
  if (key) navigate(keywordMap[key]);
}

exploreBtn.onclick = handleSearch;
searchText.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

/* =======================
   INTERNAL LINKS
======================= */

document.addEventListener('click', e => {
  const link = e.target.closest('[data-nav]');
  if (!link) return;
  e.preventDefault();
  navigate(link.dataset.nav);
});

/* =======================
   INIT
======================= */

applyText();
renderMenu();
updateSessionBox();
render(historyPath[historyPath.length - 1]);
