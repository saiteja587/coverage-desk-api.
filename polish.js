/* Coverage Desk — interface polish layer (2026-10-19)
   Loaded after app.js. Never changes what a button does: it swaps emoji for a custom icon set, tags each
   control by purpose so polish.css can give it the right motion, and adds three small behaviours —
   the coverage ring in the header, count-up on the stat tiles, and press / done feedback on buttons. */
(function(){
  'use strict';
  var S = function(p){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; };
  var ICONS = {
    home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
    import: '<path class="a" d="M12 3v11"/><path class="a" d="m7.5 10 4.5 4.5 4.5-4.5"/><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"/>',
    upload: '<path class="a" d="M12 15V4"/><path class="a" d="m7.5 8 4.5-4.5L16.5 8"/><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M8 6H4.5v1.5A3.5 3.5 0 0 0 8 11"/><path d="M16 6h3.5v1.5A3.5 3.5 0 0 1 16 11"/><path d="M12 13v4"/><path d="M8.5 20h7"/><path d="M9.5 17h5"/>',
    target: '<circle cx="12" cy="12" r="8.5"/><circle class="a" cx="12" cy="12" r="4.5"/><circle class="a" cx="12" cy="12" r="1" fill="currentColor"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    chart: '<path class="b1" d="M4 20V11"/><path class="b2" d="M10 20V4"/><path class="b3" d="M16 20v-7"/><path d="M21 20H3"/>',
    check: '<path class="a" d="m5 12.5 4.5 4.5L19 7.5"/>',
    checkc: '<circle cx="12" cy="12" r="9"/><path class="a" d="m8 12.5 3 3 5-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path class="a" d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>',
    bell: '<path class="a" d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 2h-15l1.5-2Z"/><path d="M10 21h4"/>',
    copy: '<rect x="8" y="3.5" width="8" height="4" rx="1.2"/><path d="M8 5.5H6.5A1.5 1.5 0 0 0 5 7v12.5A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V7a1.5 1.5 0 0 0-1.5-1.5H16"/><path d="M9 12h6M9 16h4"/>',
    note: '<path d="M5 20h4l10-10-4-4L5 16v4Z"/><path d="m13.5 7.5 4 4"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    flask: '<path d="M9.5 3.5h5M10.5 3.5V9L5 18.5A1.8 1.8 0 0 0 6.6 21h10.8a1.8 1.8 0 0 0 1.6-2.5L13.5 9V3.5"/><path class="a" d="M8 15h8"/>',
    building: '<rect x="5" y="3.5" width="14" height="17" rx="1.5"/><path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 20.5v-4h4v4"/>',
    compass: '<circle cx="12" cy="12" r="8.5"/><path class="a" d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
    wrench: '<path class="a" d="M20.5 6.5a4.5 4.5 0 0 1-6 5.5l-7.2 7.2a2 2 0 1 1-2.8-2.8L11.7 9.2a4.5 4.5 0 0 1 5.5-6l-2.7 2.7 1.8 1.8 2.7-2.7Z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path class="a" d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8"/>',
    warn: '<path d="M12 3.5 21.5 20h-19L12 3.5Z"/><path class="a" d="M12 10v4.5M12 17.5v.1"/>',
    refresh: '<g class="a"><path d="M20 11a8 8 0 0 0-14.5-4.2L4 9"/><path d="M4 4v5h5"/><path d="M4 13a8 8 0 0 0 14.5 4.2L20 15"/><path d="M20 20v-5h-5"/></g>',
    plus: '<path class="a" d="M12 5v14M5 12h14"/>',
    close: '<path class="a" d="M6 6l12 12M18 6 6 18"/>',
    chevl: '<path class="a" d="m14.5 6-6 6 6 6"/>',
    chevr: '<path class="a" d="m9.5 6 6 6-6 6"/>',
    user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
    people: '<circle cx="9" cy="9" r="3.3"/><path d="M3 19.5a6 6 0 0 1 12 0"/><circle cx="17" cy="8.5" r="2.6"/><path d="M16 14.2a5 5 0 0 1 5 5"/>',
    bolt: '<path class="a" d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8Z"/>',
    link: '<path class="a" d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path class="a" d="M14 10a4 4 0 0 0-5.7 0l-3 3A4 4 0 0 0 10 18.7l1-1"/>',
    repeat: '<g class="a"><path d="M4 11V9a3 3 0 0 1 3-3h12"/><path d="m16 3 3 3-3 3"/><path d="M20 13v2a3 3 0 0 1-3 3H5"/><path d="m8 21-3-3 3-3"/></g>',
    cap: '<path d="m2.5 9.5 9.5-5 9.5 5-9.5 5-9.5-5Z"/><path d="M6.5 12v4.5c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5V12"/>',
    health: '<path class="a" d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.7a4.3 4.3 0 0 1 7.5 2.6c0 5.6-7.5 10.2-7.5 10.2Z"/>',
    save: '<path d="M5 4h11l3 3v12.5A1.5 1.5 0 0 1 17.5 21h-11A1.5 1.5 0 0 1 5 19.5V4Z"/><path class="a" d="M8 4v5h7V4M8 21v-6h8v6"/>',
    trash: '<path d="M4.5 7h15M10 7V4.5h4V7"/><path d="m6.5 7 1 12.5h9L17.5 7"/><path d="M10 11v5.5M14 11v5.5"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    mic: '<rect class="a" x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/>',
    help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.7 9.5a2.4 2.4 0 1 1 3.4 2.2c-.7.4-1.1.9-1.1 1.7M12 16.8v.1"/>',
    sparkle: '<path class="a" d="M12 3.5 13.8 9l5.7 1.9-5.7 1.9L12 18.5l-1.8-5.7L4.5 10.9 10.2 9 12 3.5Z"/>',
    arrowup: '<path class="a" d="M12 19V5M6 11l6-6 6 6"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    ban: '<circle cx="12" cy="12" r="8.5"/><path d="m6 6 12 12"/>',
    arrowleft: '<path class="a" d="M19 12H5M11 6l-6 6 6 6"/>',
    chat: '<path class="a" d="M4 5.5h16v11H11l-4.5 4v-4H4v-11Z"/>'
  };
  var EMOJI = { '🏠':'home','📥':'import','🏆':'trophy','🎯':'target','🔍':'search','🔎':'search','📊':'chart','📈':'chart','⚖':'chart','✓':'check','✔':'check','✅':'checkc','☀':'sun','🌙':'moon','🔔':'bell','🛎':'bell','📋':'copy','📝':'note','📅':'calendar','🗓':'calendar','🧪':'flask','🏢':'building','🧭':'compass','🔧':'wrench','⚙':'gear','⚠':'warn','↻':'refresh','🔄':'refresh','➕':'plus','＋':'plus','+':'plus','✕':'close','✖':'close','×':'close','‹':'chevl','›':'chevr','➡':'chevr','👤':'user','👥':'people','⚡':'bolt','🔗':'link','🔁':'repeat','⬆':'upload','↑':'arrowup','🎓':'cap','⚕':'health','💾':'save','🗑':'trash','📲':'phone','🎤':'mic','❔':'help','❓':'help','✨':'sparkle','🆕':'sparkle','🔒':'lock','🚫':'ban','←':'arrowleft','💬':'chat','🗨':'chat' };
  var KEYS = Object.keys(EMOJI).sort(function(a, b){ return b.length - a.length; });
  var SEL = 'button, .btn, .tab-btn, .more-menu-item, .bottom-nav-icon, .bottom-nav-fab-icon, .filter-chip, .search-icon, .hint > span:first-child, .shift-note-label-row > span:first-child';
  function iconHTML(name){ return '<span class="ic" data-ic="' + name + '" aria-hidden="true">' + S(ICONS[name]) + '</span>'; }
  window.CDIcon = iconHTML;

  function upgrade(root){
    (root || document).querySelectorAll(SEL).forEach(function(el){
      if(el.getAttribute('data-pz') === '1' || el.closest('textarea,select,option')) return;
      el.setAttribute('data-pz', '1');
      var n = el.firstChild; while(n && n.nodeType === 3 && !n.nodeValue.trim()) n = n.nextSibling;
      if(!n || n.nodeType !== 3) { tag(el); return; }
      var raw = n.nodeValue.replace(/^\s+/, '').replace(/️/g, '');
      var hit = null;
      for(var i = 0; i < KEYS.length; i++){
        var k = KEYS[i]; if(raw.indexOf(k) !== 0) continue;
        var rest = raw.slice(k.length);
        if(k === '+' && !/^\s|^$/.test(rest)) continue;                    // "+5" is not an add icon
        if((k === '←' || k === '×' || k === '↑' || k === '‹' || k === '›' || k === '✓') && rest && !/^\s/.test(rest)) continue;
        hit = k; break;
      }
      if(hit){
        var name = EMOJI[hit];
        n.nodeValue = raw.slice(hit.length).replace(/^\s+/, '');
        var wrap = document.createElement('span'); wrap.innerHTML = iconHTML(name);
        var ic = wrap.firstChild; ic.setAttribute('data-emoji', hit);
        el.insertBefore(ic, n);
        el.setAttribute('data-fn', name);
        if(!n.nodeValue) { /* icon-only button */ el.classList.add('pz-icon-only'); }
      }
      tag(el);
    });
  }
  function tag(el){
    var t = (el.textContent || '').trim().toLowerCase(), cls = (el.className && el.className.baseVal === undefined ? el.className : '') + ' ' + (el.id || '');
    var fn = el.getAttribute('data-fn') || '';
    if(fn === 'close' || fn === 'trash' || /\b(del|delete|remove|clear)\b|-del|-remove|-delete|reset-btn/i.test(cls) || /^(remove|delete|clear)\b/.test(t)) el.classList.add('pz-danger');
    if(fn === 'copy' || /^copy\b|copy list|\bcopy\b/.test(t) || /copy/i.test(cls)) el.classList.add('pz-copy');
    if(fn === 'save' || /^save\b|save changes|finalize/.test(t) || /(^|[^a-z])save/i.test(cls)) el.classList.add('pz-save');
    if(fn === 'refresh' || /refresh|sync/i.test(t + cls)) el.classList.add('pz-sync');
  }

  /* ---- coverage ring: the header logo is a live gauge of how many calls have an owner ---- */
  function ring(){
    var header = document.querySelector('#app .header'); if(!header || header.querySelector('.pz-brand')) return;
    var title = header.firstElementChild; if(!title) return;
    var rows = (typeof state !== 'undefined' && state.rows) || [];
    var total = rows.length, woi = rows.filter(function(r){ return r.woi; }).length;
    var assigned = rows.filter(function(r){ return !r.woi && (r.assignee || '').trim(); }).length;
    var un = total - woi - assigned;
    var brand = document.createElement('div'); brand.className = 'pz-brand';
    var b = document.createElement('button'); b.type = 'button'; b.className = 'pz-ring'; b.setAttribute('data-pz', '1');
    var pct = total ? Math.round(assigned / total * 100) : 0;
    var a1 = total ? assigned / total * 360 : 0, a2 = total ? (assigned + woi) / total * 360 : 0;
    b.style.setProperty('--a1', '0deg'); b.style.setProperty('--a2', '0deg');
    b.title = total ? (assigned + ' of ' + total + ' calls have an owner' + (un ? ' · ' + un + ' unassigned — click to show them' : ' — everyone is covered')) : 'No calls on this date yet';
    b.setAttribute('aria-label', b.title);
    b.innerHTML = '<span class="pz-ring-num">' + (total ? pct : '–') + '</span>';
    if(un > 0) b.classList.add('has-gap');
    if(total && !un) b.classList.add('is-full');
    b.onclick = function(){ if(typeof state === 'undefined' || typeof render !== 'function') return; state.filter = un > 0 ? 'unassigned' : 'all'; render(); };
    header.insertBefore(brand, title); brand.appendChild(b); brand.appendChild(title);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ b.style.setProperty('--a1', a1 + 'deg'); b.style.setProperty('--a2', a2 + 'deg'); }); });
  }

  /* ---- stat tiles count up once when their number changes ---- */
  var seen = {};
  function countUp(){
    document.querySelectorAll('#app .summary .cell, #app .summary-big-cell').forEach(function(c){
      var num = c.querySelector('.num, .summary-big-num'), lbl = c.querySelector('.lbl, .summary-big-lbl'); if(!num || !lbl) return;
      var key = (c.closest('.summary-big-grid') ? 'b:' : 's:') + lbl.textContent.trim(), to = Number(num.textContent.trim());
      if(!isFinite(to) || num.textContent.trim() === '') return;
      var from = seen[key]; seen[key] = to;
      if(from === to) return;
      if(from === undefined) from = 0;
      if(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var t0 = performance.now(), dur = 650;
      (function tick(now){ var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3); num.textContent = String(Math.round(from + (to - from) * e)); if(p < 1 && num.isConnected) requestAnimationFrame(tick); else num.textContent = String(to); })(t0);
    });
  }

  /* ---- a panel springs in only when it first opens, not on every re-render ---- */
  var lastPanel = '';
  function panelEnter(){
    var h = document.querySelector('#app .panel-header-title'), sig = h ? h.textContent : '';
    if(sig && sig !== lastPanel){ var host = h.closest('.panel-header-bar'); host = host && host.parentElement; if(host){ host.classList.remove('pz-enter'); void host.offsetWidth; host.classList.add('pz-enter'); } }
    lastPanel = sig;
  }

  function decorate(){ try{ upgrade(document); ring(); countUp(); panelEnter(); }catch(e){ /* styling must never break the app */ } }

  /* ---- press ripple + "done" feedback ---- */
  document.addEventListener('pointerdown', function(e){
    var b = e.target.closest && e.target.closest('.btn, .tab-btn, .filter-chip, .more-menu-item, .bottom-nav-item, .pz-ring, .row-del, .scroll-to-top-btn');
    if(!b || b.disabled) return;
    var r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 1.6, s = document.createElement('span');
    s.className = 'pz-ripple'; s.style.width = s.style.height = d + 'px'; s.style.left = (e.clientX - r.left - d / 2) + 'px'; s.style.top = (e.clientY - r.top - d / 2) + 'px';
    if(getComputedStyle(b).position === 'static') b.style.position = 'relative';
    b.appendChild(s); setTimeout(function(){ if(s.parentNode) s.parentNode.removeChild(s); }, 650);
  }, { passive: true });
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('.pz-copy, .pz-save');
    if(!b || b.disabled) return;
    var ic = b.querySelector('.ic'); if(!ic) { b.classList.add('pz-done'); setTimeout(function(){ b.classList.remove('pz-done'); }, 1300); return; }
    var name = ic.getAttribute('data-ic'), svg = ic.innerHTML;
    ic.innerHTML = S(ICONS.check); ic.setAttribute('data-ic', 'check'); b.classList.add('pz-done');
    setTimeout(function(){ if(ic.isConnected){ ic.innerHTML = svg; ic.setAttribute('data-ic', name); } b.classList.remove('pz-done'); }, 1300);
  }, true);

  /* hook into render() so every rebuild of the page is decorated */
  function install(){
    if(typeof window.render !== 'function'){ return setTimeout(install, 50); }
    var orig = window.render;
    if(orig.__pz) return;
    var wrapped = function(){ var r = orig.apply(this, arguments); decorate(); return r; };
    wrapped.__pz = true; window.render = wrapped;
    // chrome outside #app (bottom nav, scroll-to-top, install banner)
    upgrade(document); decorate();
  }
  install();
  new MutationObserver(function(m){ for(var i = 0; i < m.length; i++){ if(m[i].addedNodes.length && !(m[i].target.closest && m[i].target.closest('.ic'))){ var go = false; m[i].addedNodes.forEach(function(n){ if(n.nodeType === 1 && !n.classList.contains('ic') && !n.classList.contains('pz-ripple')) go = true; }); if(go){ upgrade(m[i].target); break; } } } }).observe(document.body, { childList: true, subtree: true });
})();
