/* Reti di Calcolatori — notes reader.
 * Renders Obsidian-flavoured Markdown (wikilinks, callouts, math, mermaid)
 * client-side from notes.json, with search, progress tracking and flashcards. */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const slugify = s => fold(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const stripEmoji = s => s.replace(/[\p{Extended_Pictographic}️‍]/gu, '').trim();

  const store = {
    get(k, d) { try { const v = localStorage.getItem('rdc:' + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('rdc:' + k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  };

  const S = {
    cfg: {}, notes: [], bySlug: {}, byName: {},
    nav: [], order: [], indexNote: null, quizNote: null,
    cards: [], chunks: [], current: null,
    studied: new Set(store.get('studied', [])),
    boxes: store.get('boxes', {}),
  };

  /* ---------------------------------------------------------- markdown */

  const CALLOUT_KIND = {
    note: 'note', abstract: 'info', summary: 'info', tldr: 'info', info: 'info', todo: 'info',
    tip: 'tip', hint: 'tip', important: 'tip', success: 'success', check: 'success', done: 'success',
    question: 'question', help: 'question', faq: 'question', warning: 'warning', caution: 'warning',
    attention: 'warning', failure: 'danger', fail: 'danger', missing: 'danger', danger: 'danger',
    error: 'danger', bug: 'danger', example: 'example', quote: 'note', cite: 'note',
  };
  const CALLOUT_ICON = { note: '✎', info: 'ℹ', tip: '✦', success: '✓', question: '?', warning: '!', danger: '⚠', example: '❖' };

  function tex(src, display) {
    if (!window.katex) return `<code>${esc(src)}</code>`;
    try { return katex.renderToString(src, { displayMode: display, throwOnError: false, output: 'html' }); }
    catch { return `<code>${esc(src)}</code>`; }
  }

  function render(md) {
    const ph = [];
    const put = html => `@@${ph.push(html) - 1}@@`;

    // Obsidian "← [[Index]]" back-links are redundant with the sidebar.
    md = md.replace(/^\s*←\s*\[\[[^\]]*\]\]\s*$/gm, '');

    md = md.replace(/^(`{3,}|~{3,})([\w-]*)[^\n]*\n([\s\S]*?)^\1[ \t]*$/gm, (m, f, lang, code) => {
      code = code.replace(/\n$/, '');
      if (lang === 'mermaid') return put(`<figure class="diagram"><pre class="mermaid" data-src="${esc(code)}">${esc(code)}</pre></figure>`);
      return put(`<pre class="code"${lang ? ` data-lang="${esc(lang)}"` : ''}><code>${esc(code)}</code></pre>`);
    });
    md = md.replace(/`([^`\n]+)`/g, (m, c) => put(`<code>${esc(c)}</code>`));
    md = md.replace(/\$\$([\s\S]+?)\$\$/g, (m, t) => put(tex(t.replace(/^\s*>\s?/gm, ''), true)));
    md = md.replace(/(^|[^\\$\w])\$(?!\s)([^$\n]+?)(?<!\s)\$(?![\w$])/g, (m, pre, t) => pre + put(tex(t, false)));

    md = md.replace(/(!?)\[\[([^\]]+?)\]\]/g, (m, bang, inner) => {
      const [target, alias] = inner.split(/\\?\|/);
      const [name, head] = target.split('#');
      if (bang && /\.(png|jpe?g|gif|svg|webp)$/i.test(name)) {
        return put(`<img src="files/${encodeURIComponent(name.split('/').pop())}" alt="${esc(alias || name)}" loading="lazy">`);
      }
      const note = S.byName[name.trim().toLowerCase()];
      const label = (alias || (head && !name ? head : name)).trim();
      if (!note && name.trim()) return put(`<span class="wl missing" title="Nota non trovata">${esc(label)}</span>`);
      const slug = note ? note.slug : (S.current || '');
      return put(`<a class="wl" href="#/${slug}${head ? '::' + slugify(head) : ''}">${esc(label)}</a>`);
    });

    const callouts = text => {
      const lines = text.split('\n');
      const out = [];
      for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/^>\s*\[!([\w-]+)\]([+-]?)\s*(.*)$/);
        if (!m) { out.push(lines[i]); continue; }
        const body = [];
        while (i + 1 < lines.length && /^>/.test(lines[i + 1])) body.push(lines[++i].replace(/^>\s?/, ''));
        const type = m[1].toLowerCase();
        const kind = CALLOUT_KIND[type] || 'note';
        const title = m[3] || type[0].toUpperCase() + type.slice(1);
        const head = `<span class="co-icon">${CALLOUT_ICON[kind]}</span><span class="co-title">${marked.parseInline(title)}</span>`;
        const inner = body.join('\n').trim() ? `<div class="co-body">${marked.parse(callouts(body.join('\n')))}</div>` : '';
        const html = m[2]
          ? `<details class="callout co-${kind}"${m[2] === '+' ? ' open' : ''}><summary>${head}<span class="co-chev">›</span></summary>${inner}</details>`
          : `<div class="callout co-${kind}"><div class="co-head">${head}</div>${inner}</div>`;
        out.push('', put(html), '');
      }
      return out.join('\n');
    };
    md = callouts(md);

    let html = marked.parse(md, { gfm: true });
    for (let pass = 0; pass < 6 && /@@\d+@@/.test(html); pass++) {
      html = html.replace(/<p>@@(\d+)@@<\/p>/g, (m, i) => ph[i]).replace(/@@(\d+)@@/g, (m, i) => ph[i]);
    }
    return html;
  }

  function plain(md) {
    return md
      .replace(/^```[\s\S]*?^```/gm, ' ')
      .replace(/\[\[([^\]|#]*)(?:#[^\]|]*)?(?:\\?\|([^\]]*))?\]\]/g, (m, a, b) => b || a)
      .replace(/^>\s*\[![\w-]+\][+-]?/gm, '')
      .replace(/[#>*_`|~=]+/g, ' ')
      .replace(/\$([^$]*)\$/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  }

  async function renderMermaid(root) {
    const nodes = $$('pre.mermaid', root);
    if (!nodes.length || !window.mermaid) return;
    const dark = document.documentElement.dataset.theme === 'dark';
    const css = getComputedStyle(document.documentElement);
    mermaid.initialize({
      startOnLoad: false, securityLevel: 'strict', theme: 'base',
      fontFamily: 'Inter, system-ui, sans-serif',
      themeVariables: {
        darkMode: dark,
        background: css.getPropertyValue('--surface').trim(),
        primaryColor: css.getPropertyValue('--surface-2').trim(),
        primaryTextColor: css.getPropertyValue('--ink').trim(),
        primaryBorderColor: css.getPropertyValue('--accent').trim(),
        lineColor: css.getPropertyValue('--muted').trim(),
        textColor: css.getPropertyValue('--ink').trim(),
        cScale0: css.getPropertyValue('--accent-soft').trim(),
        cScale1: css.getPropertyValue('--surface-2').trim(),
        cScale2: css.getPropertyValue('--accent-soft').trim(),
        cScale3: css.getPropertyValue('--surface-2').trim(),
      },
    });
    nodes.forEach(n => { n.removeAttribute('data-processed'); n.textContent = n.dataset.src.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'); });
    try { await mermaid.run({ nodes }); } catch (e) { console.warn('mermaid', e); }
  }

  function enhance(root) {
    const used = {};
    $$('h1, h2, h3, h4', root).forEach(h => {
      let id = slugify(h.textContent) || 'sezione';
      if (used[id]) id += '-' + ++used[id]; else used[id] = 1;
      h.id = id;
      if (h.tagName !== 'H1') {
        const a = document.createElement('a');
        a.className = 'anchor'; a.href = `#/${S.current}::${id}`; a.textContent = '#'; a.setAttribute('aria-label', 'Link alla sezione');
        h.appendChild(a);
      }
    });
    $$('table', root).forEach(t => {
      const w = document.createElement('div'); w.className = 'table-wrap';
      t.replaceWith(w); w.appendChild(t);
    });
    $$('a[href^="http"]', root).forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });
    renderMermaid(root);
  }

  /* ---------------------------------------------------------- data */

  function buildNav(indexMd) {
    const groups = [];
    let h2 = null, group = null;
    const navH2 = new Set();
    for (const line of indexMd.split('\n')) {
      let m;
      if ((m = line.match(/^##\s+(.*)/)) && !line.startsWith('###')) { h2 = m[1]; group = null; continue; }
      if ((m = line.match(/^###\s+(.*)/))) { group = { title: stripEmoji(m[1]), items: [] }; groups.push(group); continue; }
      if (group && (m = line.match(/^\s*[-*]\s+\[\[([^\]|#]+)[^\]]*\]\]\s*(?:[—–-]\s*(.*))?/))) {
        const note = S.byName[m[1].trim().toLowerCase()];
        if (note) { group.items.push(note); note.desc = m[2] || ''; navH2.add(h2); }
      }
    }
    const listed = new Set(groups.flatMap(g => g.items));
    const rest = S.notes.filter(n => !listed.has(n) && n !== S.indexNote);
    if (rest.length) groups.push({ title: 'Altro', items: rest });
    S.nav = groups.filter(g => g.items.length);
    S.order = S.nav.flatMap(g => g.items);
    S.navSections = navH2;
  }

  function buildCards() {
    const cards = [];
    const sources = [S.quizNote, ...S.notes.filter(n => n !== S.quizNote)].filter(Boolean);
    const seen = new Set();
    for (const note of sources) {
      let topic = stripEmoji(note.title);
      let topicNote = note;
      const lines = note.md.split('\n');
      for (let i = 0; i < lines.length; i++) {
        let m;
        if (note === S.quizNote && (m = lines[i].match(/^##\s+(.*)/))) {
          const link = m[1].match(/\[\[([^\]|#]+)/);
          topic = stripEmoji(m[1].replace(/\s*[—–-]\s*\[\[.*$/, '').replace(/\[\[([^\]|]*)[^\]]*\]\]/g, '$1'));
          topicNote = link ? S.byName[link[1].trim().toLowerCase()] || note : note;
          continue;
        }
        if (!(m = lines[i].match(/^>\s*\[!question\][+-]?\s*(.*)$/i))) continue;
        const ans = [];
        while (i + 1 < lines.length && /^>/.test(lines[i + 1])) ans.push(lines[++i].replace(/^>\s?/, ''));
        const q = m[1].trim();
        const id = slugify(q).slice(0, 90);
        if (!q || seen.has(id)) continue;
        seen.add(id);
        cards.push({ id, q, a: ans.join('\n'), topic, note: topicNote });
      }
    }
    S.cards = cards;
  }

  function buildSearch() {
    S.chunks = [];
    for (const note of S.notes) {
      let heading = note.title, id = '', buf = [];
      const flush = () => {
        const text = plain(buf.join('\n'));
        S.chunks.push({ note, heading: stripEmoji(heading), id, text, ftext: fold(text), fhead: fold(heading) });
        buf = [];
      };
      const used = {};
      for (const line of note.md.split('\n')) {
        const m = line.match(/^(#{1,4})\s+(.*)/);
        if (m) {
          flush();
          heading = m[2].replace(/\[\[([^\]|]*)(?:\\?\|([^\]]*))?\]\]/g, (x, a, b) => b || a);
          let hid = slugify(heading) || 'sezione';
          if (used[hid]) hid += '-' + ++used[hid]; else used[hid] = 1;
          id = m[1].length === 1 ? '' : hid;
        } else buf.push(line);
      }
      flush();
    }
  }

  /* ---------------------------------------------------------- chrome */

  function renderNav() {
    const total = S.order.length;
    const done = S.order.filter(n => S.studied.has(n.slug)).length;
    const pct = total ? Math.round(done / total * 100) : 0;
    $('#sideProgress').innerHTML = `
      <div class="sp-row"><span>Avanzamento</span><b>${done}/${total}</b></div>
      <div class="bar"><i style="width:${pct}%"></i></div>`;
    $('#nav').innerHTML = `
      <a class="nav-link nav-home${!S.current ? ' active' : ''}" href="#/">⌂ Home</a>
      <a class="nav-link${S.current === 'quiz' ? ' active' : ''}" href="#/quiz">⚡ Flashcard <span class="count">${S.cards.length}</span></a>
      ${S.nav.map(g => `
        <div class="nav-group">
          <div class="nav-title">${esc(g.title)}</div>
          ${g.items.map(n => `<a class="nav-link${S.current === n.slug ? ' active' : ''}${S.studied.has(n.slug) ? ' done' : ''}" href="#/${n.slug}">
              <span class="tick" aria-hidden="true"></span><span>${esc(n.short)}</span></a>`).join('')}
        </div>`).join('')}`;
  }

  function renderToc(article) {
    const toc = $('#toc');
    const hs = article ? $$('h2, h3', article) : [];
    if (hs.length < 2) { toc.innerHTML = ''; return; }
    toc.innerHTML = `<div class="toc-title">In questa nota</div>` + hs.map(h =>
      `<a class="toc-${h.tagName.toLowerCase()}" href="#/${S.current}::${h.id}" data-id="${h.id}">${esc(stripEmoji(h.textContent.replace(/#$/, '')))}</a>`).join('');
    const links = Object.fromEntries($$('a', toc).map(a => [a.dataset.id, a]));
    S.spy && S.spy.disconnect();
    S.spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          $$('a.on', toc).forEach(a => a.classList.remove('on'));
          links[e.target.id] && links[e.target.id].classList.add('on');
        }
      });
    }, { rootMargin: '-15% 0px -75% 0px' });
    hs.forEach(h => S.spy.observe(h));
  }

  function setStudied(slug, on) {
    on ? S.studied.add(slug) : S.studied.delete(slug);
    store.set('studied', [...S.studied]);
    renderNav();
    const b = $('#studyBtn');
    if (b) { b.classList.toggle('on', on); b.textContent = on ? '✓ Studiata' : 'Segna come studiata'; }
  }

  /* ---------------------------------------------------------- views */

  function viewHome() {
    S.current = null;
    const idx = S.indexNote;
    const total = S.order.length;
    const done = S.order.filter(n => S.studied.has(n.slug)).length;
    const mastered = S.cards.filter(c => (S.boxes[c.id] || 0) >= 3).length;
    const formulas = (S.notes.map(n => n.md).join('\n').match(/\$\$[\s\S]+?\$\$/g) || []).length;
    const last = S.bySlug[store.get('last', '')];
    const next = S.order.find(n => !S.studied.has(n.slug));
    const pct = total ? done / total : 0;
    const R = 34, C = 2 * Math.PI * R;

    // Home shows the index note minus its title and the link list (that becomes the cards).
    let body = '';
    if (idx) {
      const parts = idx.md.split(/^(?=## )/m);
      body = parts.filter(p => !p.startsWith('# ') && ![...S.navSections].some(h => p.startsWith('## ' + h))).join('');
      body = body.replace(/^# .*$/m, '');
    }

    $('#main').innerHTML = `
      <section class="hero">
        <div class="hero-text">
          <div class="eyebrow">Appunti del corso · aggiornati ${esc(S.cfg.built || '')}</div>
          <h1>${esc(S.cfg.title)}</h1>
          <p class="lede">${esc(S.cfg.subtitle || '')}</p>
          <div class="hero-cta">
            ${last ? `<a class="btn primary" href="#/${last.slug}">Riprendi: ${esc(last.short)} →</a>` : next ? `<a class="btn primary" href="#/${next.slug}">Inizia: ${esc(next.short)} →</a>` : ''}
            <a class="btn" href="#/quiz">⚡ Ripassa con le flashcard</a>
          </div>
        </div>
        <div class="ring" aria-label="${Math.round(pct * 100)}% studiato">
          <svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="${R}" class="ring-bg"/><circle cx="40" cy="40" r="${R}" class="ring-fg" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/></svg>
          <div class="ring-label"><b>${Math.round(pct * 100)}%</b><span>studiato</span></div>
        </div>
      </section>
      <section class="stats">
        <div class="stat"><b>${total}</b><span>note</span></div>
        <div class="stat"><b>${formulas}</b><span>formule</span></div>
        <div class="stat"><b>${S.cards.length}</b><span>domande</span></div>
        <div class="stat"><b>${mastered}</b><span>padroneggiate</span></div>
      </section>
      ${S.nav.map((g, gi) => `
        <section class="group">
          <h2 class="group-title"><span class="num">${String(gi + 1).padStart(2, '0')}</span>${esc(g.title)}</h2>
          <div class="cards">
            ${g.items.map(n => `<a class="card${S.studied.has(n.slug) ? ' done' : ''}" href="#/${n.slug}">
              <span class="card-emoji">${esc(n.emoji || '◇')}</span>
              <span class="card-title">${esc(n.short)}</span>
              ${n.desc ? `<span class="card-desc">${esc(n.desc)}</span>` : ''}
              <span class="card-meta">${n.minutes} min${S.studied.has(n.slug) ? ' · ✓ studiata' : ''}</span></a>`).join('')}
          </div>
        </section>`).join('')}
      <article class="prose home-prose">${render(body)}</article>
      <footer class="foot">Generato dalla vault Obsidian · ${S.notes.length} note</footer>`;
    S.current = idx ? idx.slug : null;
    enhance($('.home-prose'));
    S.current = null;
    $('#toc').innerHTML = '';
    renderNav();
    document.title = S.cfg.title + ' — Appunti';
  }

  function viewNote(note, anchor) {
    S.current = note.slug;
    store.set('last', note.slug);
    const i = S.order.indexOf(note);
    const prev = i > 0 ? S.order[i - 1] : null;
    const next = i >= 0 && i < S.order.length - 1 ? S.order[i + 1] : null;
    const backlinks = S.notes.filter(n => n !== note && n !== S.indexNote && n.links.has(note.name.toLowerCase()));
    const group = S.nav.find(g => g.items.includes(note));
    const studied = S.studied.has(note.slug);
    const nCards = S.cards.filter(c => c.note === note).length;

    $('#main').innerHTML = `
      <article class="prose note" id="article">${render(note.md)}</article>
      <section class="note-end">
        <button class="btn${studied ? ' on' : ''}" id="studyBtn">${studied ? '✓ Studiata' : 'Segna come studiata'}</button>
        ${nCards ? `<a class="btn" href="#/quiz?topic=${note.slug}">⚡ ${nCards} flashcard su questa nota</a>` : ''}
      </section>
      ${backlinks.length ? `<section class="backlinks"><div class="bl-title">Citata in</div>${backlinks.map(n => `<a href="#/${n.slug}">${esc(n.emoji || '')} ${esc(n.short)}</a>`).join('')}</section>` : ''}
      <nav class="pager">
        ${prev ? `<a class="prev" href="#/${prev.slug}"><span>← Precedente</span><b>${esc(prev.short)}</b></a>` : '<span></span>'}
        ${next ? `<a class="next" href="#/${next.slug}"><span>Successiva →</span><b>${esc(next.short)}</b></a>` : '<span></span>'}
      </nav>`;

    const article = $('#article');
    const h1 = $('h1', article);
    const meta = document.createElement('div');
    meta.className = 'note-meta';
    meta.innerHTML = `${group ? `<span class="chip">${esc(group.title)}</span>` : ''}<span>${note.minutes} min di lettura</span>${note.tags.map(t => `<span class="tag">#${esc(t.split('/').pop())}</span>`).join('')}`;
    if (h1) h1.after(meta); else article.prepend(meta);

    enhance(article);
    renderToc(article);
    renderNav();
    $('#studyBtn').onclick = () => setStudied(note.slug, !S.studied.has(note.slug));
    document.title = `${note.short} — ${S.cfg.title}`;
    scrollToAnchor(anchor);
  }

  function scrollToAnchor(anchor) {
    if (!anchor) { window.scrollTo(0, 0); return; }
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ block: 'start' });
      el.classList.add('flash');
      setTimeout(() => el.classList.remove('flash'), 1600);
    }
  }

  /* ---------------------------------------------------------- flashcards */

  const Q = { deck: [], i: 0, flipped: false, topic: 'all', onlyWeak: false, session: { ok: 0, ko: 0 } };

  function viewQuiz(params) {
    S.current = 'quiz';
    if (params.get('topic')) Q.topic = params.get('topic');
    const topics = [];
    S.cards.forEach(c => { if (!topics.some(t => t.slug === c.note.slug)) topics.push({ slug: c.note.slug, label: c.topic }); });
    if (Q.topic !== 'all' && !topics.some(t => t.slug === Q.topic)) Q.topic = 'all';

    const pool = S.cards.filter(c => (Q.topic === 'all' || c.note.slug === Q.topic) && (!Q.onlyWeak || (S.boxes[c.id] || 0) < 3));
    // Lowest Leitner box first; shuffle within a box.
    Q.deck = pool.map(c => ({ c, k: (S.boxes[c.id] || 0) + Math.random() * 0.9 })).sort((a, b) => a.k - b.k).map(x => x.c);
    Q.i = 0; Q.flipped = false; Q.session = { ok: 0, ko: 0 };

    const mastered = S.cards.filter(c => (S.boxes[c.id] || 0) >= 3).length;
    $('#main').innerHTML = `
      <section class="quiz">
        <div class="quiz-head">
          <div>
            <div class="eyebrow">Ripasso attivo</div>
            <h1>Flashcard</h1>
            <p class="lede">Rispondi a voce, poi gira la carta. Le carte che sbagli tornano prima.</p>
          </div>
          <div class="quiz-stats"><b>${mastered}</b>/${S.cards.length}<span>padroneggiate</span></div>
        </div>
        <div class="quiz-controls">
          <select id="qTopic" aria-label="Argomento">
            <option value="all">Tutti gli argomenti</option>
            ${topics.map(t => `<option value="${t.slug}"${t.slug === Q.topic ? ' selected' : ''}>${esc(t.label)}</option>`).join('')}
          </select>
          <label class="toggle"><input type="checkbox" id="qWeak"${Q.onlyWeak ? ' checked' : ''}> Solo da ripassare</label>
          <button class="btn ghost" id="qReset" title="Azzera i progressi delle flashcard">Azzera</button>
        </div>
        <div id="qStage"></div>
        <div class="boxes">${[0, 1, 2, 3, 4].map(b => {
          const n = S.cards.filter(c => (S.boxes[c.id] || 0) === b).length;
          return `<div class="box"><i style="height:${S.cards.length ? Math.max(4, n / S.cards.length * 100) : 4}%"></i><span>${b === 0 ? 'nuove' : 'liv. ' + b}</span><b>${n}</b></div>`;
        }).join('')}</div>
      </section>`;
    $('#qTopic').onchange = e => { Q.topic = e.target.value; location.hash = '#/quiz'; viewQuiz(new URLSearchParams()); };
    $('#qWeak').onchange = e => { Q.onlyWeak = e.target.checked; viewQuiz(new URLSearchParams()); };
    let armed = false;
    $('#qReset').onclick = e => {
      if (!armed) { armed = true; e.target.textContent = 'Sicuro? Clicca di nuovo'; setTimeout(() => { armed = false; e.target.textContent = 'Azzera'; }, 3000); return; }
      S.boxes = {}; store.set('boxes', {}); viewQuiz(new URLSearchParams());
    };
    $('#toc').innerHTML = '';
    renderNav();
    drawCard();
    document.title = `Flashcard — ${S.cfg.title}`;
    window.scrollTo(0, 0);
  }

  function drawCard() {
    const stage = $('#qStage');
    if (!stage) return;
    if (!Q.deck.length) { stage.innerHTML = `<div class="flash-empty">Nessuna carta da ripassare qui. 🎯</div>`; return; }
    if (Q.i >= Q.deck.length) {
      const tot = Q.session.ok + Q.session.ko;
      stage.innerHTML = `<div class="flash-done">
        <div class="big">${tot ? Math.round(Q.session.ok / tot * 100) : 0}%</div>
        <p>${Q.session.ok} sapute · ${Q.session.ko} da ripassare</p>
        <button class="btn primary" id="qAgain">Un altro giro</button></div>`;
      $('#qAgain').onclick = () => viewQuiz(new URLSearchParams());
      return;
    }
    const c = Q.deck[Q.i];
    const box = S.boxes[c.id] || 0;
    stage.innerHTML = `
      <div class="qbar"><i style="width:${Q.i / Q.deck.length * 100}%"></i></div>
      <div class="flashcard${Q.flipped ? ' flipped' : ''}" id="qCard" tabindex="0" role="button" aria-label="Gira la carta">
        <div class="fc-top"><span class="chip">${esc(c.topic)}</span><span>${Q.i + 1} / ${Q.deck.length} · liv. ${box}</span></div>
        <div class="fc-q">${marked.parseInline(c.q)}</div>
        <div class="fc-a prose">${Q.flipped ? render(c.a) : '<span class="fc-hint">Premi spazio o clicca per vedere la risposta</span>'}</div>
        ${Q.flipped ? `<a class="fc-src" href="#/${c.note.slug}">Apri la nota →</a>` : ''}
      </div>
      <div class="fc-actions"${Q.flipped ? '' : ' hidden'}>
        <button class="btn ko" id="qKo"><kbd>1</kbd> Da ripassare</button>
        <button class="btn ok" id="qOk"><kbd>2</kbd> Lo so</button>
      </div>`;
    $('#qCard').onclick = e => { if (!e.target.closest('a')) flip(); };
    if (Q.flipped) { $('#qKo').onclick = () => grade(false); $('#qOk').onclick = () => grade(true); }
  }

  function flip() { Q.flipped = !Q.flipped; drawCard(); }
  function grade(ok) {
    const c = Q.deck[Q.i];
    S.boxes[c.id] = ok ? Math.min(4, (S.boxes[c.id] || 0) + 1) : 0;
    store.set('boxes', S.boxes);
    ok ? Q.session.ok++ : Q.session.ko++;
    Q.i++; Q.flipped = false;
    drawCard();
    $$('.box').forEach((el, b) => {
      const n = S.cards.filter(x => (S.boxes[x.id] || 0) === b).length;
      $('b', el).textContent = n;
      $('i', el).style.height = Math.max(4, n / S.cards.length * 100) + '%';
    });
  }

  /* ---------------------------------------------------------- search */

  let results = [], sel = 0;

  function openSearch() {
    $('#search').hidden = false;
    const inp = $('#searchInput');
    inp.value = '';
    runSearch('');
    setTimeout(() => inp.focus(), 0);
  }
  function closeModals() { $('#search').hidden = true; $('#help').hidden = true; }

  function runSearch(q) {
    const terms = fold(q).split(/\s+/).filter(Boolean);
    if (!terms.length) {
      results = S.order.map(n => ({ note: n, heading: n.title, id: '', snippet: n.desc || '' }));
    } else {
      results = S.chunks.map(ch => {
        let score = 0;
        const ftitle = fold(ch.note.title);
        for (const t of terms) {
          const inT = ftitle.includes(t), inH = ch.fhead.includes(t), inX = ch.ftext.includes(t);
          if (!inT && !inH && !inX) return null;
          score += (inT ? 6 : 0) + (inH ? 8 : 0) + (inX ? 1 + Math.min(4, ch.ftext.split(t).length - 2) : 0);
          if (new RegExp('\\b' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b').test(ch.fhead)) score += 6;
        }
        return { note: ch.note, heading: ch.heading, id: ch.id, snippet: snippet(ch.text, ch.ftext, terms), score };
      }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 30);
    }
    sel = 0;
    paintResults(terms);
  }

  function snippet(text, ftext, terms) {
    let at = -1;
    for (const t of terms) { const p = ftext.indexOf(t); if (p >= 0 && (at < 0 || p < at)) at = p; }
    if (at < 0) return text.slice(0, 140);
    const start = Math.max(0, at - 50);
    return (start ? '…' : '') + text.slice(start, start + 160) + (start + 160 < text.length ? '…' : '');
  }

  function highlight(s, terms) {
    let h = esc(s);
    if (!terms.length) return h;
    const f = fold(h);
    const marks = [];
    for (const t of terms) { let p = 0; while ((p = f.indexOf(fold(esc(t)), p)) >= 0) { marks.push([p, p + t.length]); p += t.length; } }
    marks.sort((a, b) => b[0] - a[0]);
    let last = Infinity;
    for (const [a, b] of marks) { if (b > last) continue; h = h.slice(0, a) + '<mark>' + h.slice(a, b) + '</mark>' + h.slice(b); last = a; }
    return h;
  }

  function paintResults(terms) {
    $('#results').innerHTML = results.length ? results.map((r, i) => `
      <li class="${i === sel ? 'sel' : ''}" data-i="${i}">
        <div class="r-head"><span class="r-note">${esc(r.note.emoji || '')} ${esc(r.note.short)}</span>${r.id ? `<span class="r-sep">›</span><span class="r-h">${highlight(r.heading, terms)}</span>` : ''}</div>
        ${r.snippet ? `<div class="r-snip">${highlight(r.snippet, terms)}</div>` : ''}
      </li>`).join('') : `<li class="none">Nessun risultato</li>`;
    $$('#results li[data-i]').forEach(li => {
      li.onclick = () => go(+li.dataset.i);
      li.onmousemove = () => { if (sel !== +li.dataset.i) { sel = +li.dataset.i; $$('#results li').forEach(x => x.classList.toggle('sel', x === li)); } };
    });
    const s = $('#results li.sel'); s && s.scrollIntoView({ block: 'nearest' });
  }

  function go(i) {
    const r = results[i];
    if (!r) return;
    closeModals();
    location.hash = `#/${r.note.slug}${r.id ? '::' + r.id : ''}`;
  }

  /* ---------------------------------------------------------- router */

  function route() {
    closeModals();
    document.body.classList.remove('nav-open');
    const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    const [path, query] = raw.split('?');
    const [slug, anchor] = path.split('::');
    if (!slug) return viewHome();
    if (slug === 'quiz') return viewQuiz(new URLSearchParams(query || ''));
    const note = S.bySlug[slug];
    if (!note) return viewHome();
    if (note === S.indexNote) return viewHome();
    if (S.current === slug && $('#article')) return scrollToAnchor(anchor);
    viewNote(note, anchor);
  }

  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    store.set('theme', t);
    $$('.prose').forEach(renderMermaid);
  }

  function bindChrome() {
    $('#searchBtn').onclick = openSearch;
    $('#helpBtn').onclick = () => { $('#help').hidden = false; };
    $('#themeBtn').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
    $('#focusBtn').onclick = () => document.body.classList.toggle('focus');
    $('#menuBtn').onclick = () => document.body.classList.toggle('nav-open');
    $('#scrim').onclick = () => document.body.classList.remove('nav-open');
    $$('.modal').forEach(m => { m.onclick = e => { if (e.target === m) closeModals(); }; });
    $('#searchInput').oninput = e => runSearch(e.target.value);
    $('#searchInput').onkeydown = e => {
      if (e.key === 'ArrowDown') { sel = Math.min(results.length - 1, sel + 1); paintResults(fold(e.target.value).split(/\s+/).filter(Boolean)); e.preventDefault(); }
      else if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); paintResults(fold(e.target.value).split(/\s+/).filter(Boolean)); e.preventDefault(); }
      else if (e.key === 'Enter') { go(sel); e.preventDefault(); }
    };

    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); return; }
      if (e.key === 'Escape') { closeModals(); document.body.classList.remove('nav-open'); return; }
      if (e.metaKey || e.ctrlKey || e.altKey || /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      if (!$('#search').hidden || !$('#help').hidden) return;
      const inQuiz = S.current === 'quiz' && $('#qStage');
      if (inQuiz && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); if (Q.i < Q.deck.length) flip(); return; }
      if (inQuiz && Q.flipped && e.key === '1') return grade(false);
      if (inQuiz && Q.flipped && e.key === '2') return grade(true);
      const i = S.order.findIndex(n => n.slug === S.current);
      switch (e.key) {
        case '/': e.preventDefault(); openSearch(); break;
        case '?': $('#help').hidden = false; break;
        case 't': $('#themeBtn').click(); break;
        case 'f': document.body.classList.toggle('focus'); break;
        case 'q': location.hash = '#/quiz'; break;
        case 'h': location.hash = '#/'; break;
        case 's': if (S.bySlug[S.current]) setStudied(S.current, !S.studied.has(S.current)); break;
        case '[': if (i > 0) location.hash = '#/' + S.order[i - 1].slug; break;
        case ']': if (i >= 0 && i < S.order.length - 1) location.hash = '#/' + S.order[i + 1].slug; else if (i < 0 && S.order[0]) location.hash = '#/' + S.order[0].slug; break;
      }
    });

    const bar = $('#progress');
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
    }, { passive: true });
    window.addEventListener('hashchange', route);
  }

  /* ---------------------------------------------------------- boot */

  async function boot() {
    bindChrome();
    let data;
    try {
      const r = await fetch('notes.json', { cache: 'no-cache' });
      data = await r.json();
    } catch (e) {
      $('#main').innerHTML = `<div class="loading">Impossibile caricare notes.json — apri il sito tramite un server (es. <code>python3 -m http.server</code>).</div>`;
      return;
    }
    S.cfg = data;
    $('#brandName').textContent = data.title;
    S.notes = data.notes.map(n => {
      const h1 = (n.md.match(/^#\s+(.*)$/m) || [])[1] || n.name;
      const emoji = (h1.match(/^\s*([\p{Extended_Pictographic}][️‍\p{Extended_Pictographic}]*)/u) || [])[1] || '';
      const words = plain(n.md).split(' ').length;
      return {
        ...n, title: h1, emoji,
        short: n.name.replace(/\s*\(.*\)\s*$/, '') || n.name,
        slug: slugify(n.name),
        minutes: Math.max(1, Math.round(words / 200)),
        links: new Set([...n.md.matchAll(/\[\[([^\]|#\\]+)/g)].map(m => m[1].trim().toLowerCase())),
      };
    });
    for (const n of S.notes) {
      S.bySlug[n.slug] = n;
      S.byName[n.name.toLowerCase()] = n;
      n.aliases.forEach(a => { S.byName[a.toLowerCase()] = S.byName[a.toLowerCase()] || n; });
    }
    S.indexNote = S.byName[(data.index || '').toLowerCase()] || null;
    S.quizNote = S.byName[(data.quiz || '').toLowerCase()] || null;
    buildNav(S.indexNote ? S.indexNote.md : '');
    buildCards();
    buildSearch();
    route();
  }

  boot();
})();
