// js/directory.js
const DATA_URL = 'data/members.json';
const memberContainer = document.getElementById('member-directory');
const btnGrid = document.getElementById('btn-grid');
const btnList = document.getElementById('btn-list');
const filterSelect = document.getElementById('membership-filter');
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

let members = [];
let currentView = localStorage.getItem('directoryView') || 'grid'; // 'grid' or 'list'

/* Utility: map membership to label and class */
function membershipMeta(level) {
  if (level === 3) return { label: 'Gold', cls: 'gold' };
  if (level === 2) return { label: 'Silver', cls: 'silver' };
  return { label: 'Member', cls: 'member' };
}

/* Render a single member card (returns node) */
function createMemberCard(m) {
  const article = document.createElement('article');
  article.className = 'member-card';
  article.setAttribute('data-membership', m.membership);

  // Image with fallback
  const img = document.createElement('img');
  img.className = 'logo';
  img.alt = `${m.name} logo`;
  img.src = m.image || 'images/placeholder.png';
  img.onerror = () => { img.src = 'images/placeholder.png'; };

  const title = document.createElement('h3');
  title.textContent = m.name;

  const addr = document.createElement('p');
  addr.textContent = m.address;

  const phone = document.createElement('p');
  phone.textContent = '📞 ' + m.phone;

  const link = document.createElement('a');
  link.href = m.url;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = 'Visit Website';

  const badge = document.createElement('span');
  const meta = membershipMeta(m.membership);
  badge.className = 'badge ' + meta.cls;
  badge.textContent = meta.label;

  // Compose
  const top = document.createElement('div');
  top.className = 'card-top';
  top.appendChild(img);

  const textWrap = document.createElement('div');
  textWrap.className = 'body';
  textWrap.appendChild(title);
  textWrap.appendChild(addr);
  textWrap.appendChild(phone);
  textWrap.appendChild(link);
  textWrap.appendChild(document.createElement('br'));
  textWrap.appendChild(badge);

  article.appendChild(top);
  article.appendChild(textWrap);

  return article;
}

/* Render members (with optional filter) */
function renderMembers(filter = 'all') {
  memberContainer.innerHTML = '';
  const list = members.filter(m => (filter === 'all' ? true : String(m.membership) === String(filter)));

  if (list.length === 0) {
    memberContainer.innerHTML = '<p>No members match that filter.</p>';
    return;
  }

  list.forEach(m => {
    const node = createMemberCard(m);
    memberContainer.appendChild(node);
  });

  // apply view class
  if (currentView === 'grid') {
    memberContainer.classList.remove('list-view');
    memberContainer.classList.add('grid-view');
    btnGrid.setAttribute('aria-pressed', 'true');
    btnList.setAttribute('aria-pressed', 'false');
  } else {
    memberContainer.classList.remove('grid-view');
    memberContainer.classList.add('list-view');
    btnGrid.setAttribute('aria-pressed', 'false');
    btnList.setAttribute('aria-pressed', 'true');
  }
}

/* Fetch JSON data */
async function loadMembers() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    members = await res.json();
    renderMembers(filterSelect.value);
  } catch (err) {
    memberContainer.innerHTML = `<p class="error">Unable to load members: ${err.message}</p>`;
    console.error(err);
  }
}

/* Toggle handlers */
btnGrid.addEventListener('click', () => {
  currentView = 'grid';
  localStorage.setItem('directoryView', currentView);
  renderMembers(filterSelect.value);
});
btnList.addEventListener('click', () => {
  currentView = 'list';
  localStorage.setItem('directoryView', currentView);
  renderMembers(filterSelect.value);
});

/* Filter handler */
filterSelect.addEventListener('change', (e) => {
  renderMembers(e.target.value);
});

/* Mobile nav toggle */
navToggle && navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav.classList.toggle('expanded');
});

/* Footer copyright and last modified */
function initFooterDates() {
  const year = document.getElementById('copyright-year');
  const last = document.getElementById('last-modified');
  if (year) year.textContent = new Date().getFullYear();
  if (last) last.textContent = document.lastModified || new Date().toLocaleString();
}

/* Init */
document.addEventListener('DOMContentLoaded', () => {
  initFooterDates();
  loadMembers();
});
