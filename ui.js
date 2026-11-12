/* d17: cached viewport width — reading innerWidth right after DOM writes forces a full layout, so layers use this instead */
window.__d17vw = window.innerWidth; window.addEventListener('resize', function(){ window.__d17vw = window.innerWidth; }, { passive:true });
/* ===== polish.js ===== */
/* Coverage Desk — interface polish layer (2026-10-19)
   Loaded after app.js. Never changes what a button does: it swaps emoji for a custom icon set, tags each
   control by purpose so polish.css can give it the right motion, and adds three small behaviours —
   the coverage ring in the header, count-up on the stat tiles, and press / done feedback on buttons. */
(function(){
  'use strict';
  var S = function(p){ return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>'; };
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
  function iconHTML(name){ return '<span class="ic" style="display:inline-flex;width:1.18em;height:1.18em;flex:none" data-ic="' + name + '" aria-hidden="true">' + S(ICONS[name]) + '</span>'; }

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

;
/* ===== desk2.js ===== */
/* desk2.js — UI layer #2 for Coverage Desk (loaded after polish.js).
   Adds: Right-now strip, handler load bars, 7-day sparkline, Timeline (drag to reassign),
   quick-assign popover, command bar (Alt+K), density toggle, sticky header + pinned candidate,
   round chips + urgency pulse, group-by switcher, undo toast, save-status pill,
   empty state, shift handover card.
   Never edits app.js internals: it decorates after render() and reuses app functions. */
(function(){
  'use strict';
  if(window.__desk2) return; window.__desk2 = true;

  var LS = {
    get:function(k,d){ try{ var v = localStorage.getItem(k); return v===null?d:v; }catch(e){ return d; } },
    set:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  };
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var isAdmin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  var rows = function(){ try{ return state.rows||[]; }catch(e){ return []; } };
  var bd = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var dur = function(r){ try{ return parseDurationMinutes(r.duration)||30; }catch(e){ return 30; } };
  var live = function(r){ return !r.woi && !r.status; };
  var nowBd = function(){ var d=new Date(); return (d.getHours()*60+d.getMinutes()+720)%1440; };
  var isToday = function(){ try{ return state.date===todayDateString(); }catch(e){ return false; } };
  var fmtIn = function(m){ if(m<=0) return m>-60 ? 'now' : Math.abs(Math.round(m/60))+'h ago'; if(m<60) return 'in '+m+'m'; return 'in '+Math.floor(m/60)+'h '+(m%60?m%60+'m':''); };
  var hourLabel = function(bdMin){ var m=(bdMin+720)%1440, h=Math.floor(m/60); return (h%12||12)+(h<12?' AM':' PM'); };
  var teamNamesSet = function(){ try{ return getTeamNames(); }catch(e){ return new Set(); } };
  var isPerson = function(n){ return n && !teamNamesSet().has(n); };

  /* ---------- toasts ---------- */
  function toastHost(){
    var h = $('#d2Toasts'); if(h) return h;
    h = document.createElement('div'); h.id='d2Toasts'; document.body.appendChild(h); return h;
  }
  function toast(msg, opt){
    opt = opt||{};
    var el = document.createElement('div'); el.className='d2-toast';
    el.innerHTML = '<span class="d2-toast-msg">'+esc(msg)+'</span>'+(opt.label?'<button class="d2-toast-btn">'+esc(opt.label)+'</button>':'')+'<button type="button" class="d2-toast-x" aria-label="Dismiss">✕</button><i class="d2-toast-bar"></i>';
    var ms = opt.ms||(opt.label?8000:5000); el.style.setProperty('--ms', ms+'ms');
    var kill = function(){ el.classList.add('out'); setTimeout(function(){ el.remove(); },260); };
    var b = $('.d2-toast-btn',el); if(b) b.onclick=function(){ try{ opt.action&&opt.action(); }finally{ kill(); } };
    var x = $('.d2-toast-x',el); if(x) x.onclick=function(ev){ ev.stopPropagation(); kill(); };
    toastHost().appendChild(el);
    var all = $$('.d2-toast', toastHost()); while(all.length>3){ all.shift().remove(); }
    setTimeout(kill, ms);
    return el;
  }
  window.d2Toast = toast;

  /* ---------- undo ---------- */
  var snap = null, snapDate = null, undoStack = [];
  function describeChange(beforeJson, afterRows){
    var before; try{ before = JSON.parse(beforeJson); }catch(e){ return 'Changed calls'; }
    var bm = {}; before.forEach(function(r){ bm[r.id]=r; });
    var am = {}; afterRows.forEach(function(r){ am[r.id]=r; });
    var added = afterRows.filter(function(r){ return !bm[r.id]; }).length;
    var removed = before.filter(function(r){ return !am[r.id]; }).length;
    var changed = afterRows.filter(function(r){ return bm[r.id] && JSON.stringify(bm[r.id])!==JSON.stringify(r); });
    if(added && !removed && !changed.length) return 'Added '+added+' call'+(added>1?'s':'');
    if(removed && !added && !changed.length) return 'Removed '+removed+' call'+(removed>1?'s':'');
    if(changed.length===1 && !added && !removed){
      var a = changed[0], o = bm[a.id];
      if((o.assignee||'')!==(a.assignee||'')) return a.assignee ? 'Assigned '+a.assignee+' to '+(a.candidate||'call') : 'Unassigned '+(a.candidate||'call');
      return 'Edited '+(a.candidate||'a call');
    }
    return 'Changed '+(added+removed+changed.length)+' calls';
  }
  function trackChange(){
    var cur = JSON.stringify(rows());
    if(snap===null || snapDate!==state.date || !state.dirty){ snap=cur; snapDate=state.date; if(snapDate!==state.date||!state.dirty) {} return; }
    if(cur===snap) return;
    var before = snap; snap = cur;
    if(!isAdmin()) return;
    var msg = describeChange(before, rows());
    undoStack.push({date:state.date, before:before});
    if(undoStack.length>20) undoStack.shift();
    toast(msg, {label:'Undo', action:doUndo});
  }
  function doUndo(){
    var e = undoStack.pop(); if(!e) return;
    if(e.date!==state.date){ toast('That change was on '+e.date+' — switch back to undo it.'); return; }
    try{ state.rows = JSON.parse(e.before); }catch(x){ return; }
    snap = e.before; markDirty(); render();
    toast('Undone — remember to save.', {ms:4000});
  }
  window.d2Undo = doUndo;

  /* ---------- save pill ---------- */
  function pill(){
    var p = $('#d2Pill');
    if(!p){ p=document.createElement('button'); p.id='d2Pill'; document.body.appendChild(p);
      p.onclick=function(){ if(p.dataset.s==='err'||p.dataset.s==='dirty'){ if(isAdmin()) saveAllChanges(); } }; }
    var s, t;
    if(state.needsLogin){ p.style.display='none'; return; }
    p.style.display='';
    if(state.saving){ s='saving'; t='Saving…'; }
    else if(state.saveError){ s='err'; t='Save failed — tap to retry'; }
    else if(state.dirty){ s='dirty'; t=isAdmin()?'Unsaved changes — tap to save':'Unsaved changes'; }
    else { s='ok'; t='All changes saved'; }
    if(p.dataset.s!==s){ p.dataset.s=s; p.innerHTML='<i class="d2-pill-dot"></i><span>'+esc(t)+'</span>'; }
    else { var sp=$('span',p); if(sp && sp.textContent!==t) sp.textContent=t; }
  }

  /* ---------- upcoming + load + sparkline strip ---------- */
  function upcoming(n){
    var nb = nowBd();
    return rows().filter(function(r){ return live(r) && bd(r.time)!==9999 && bd(r.time)>=nb-10; })
      .sort(function(a,b){ return bd(a.time)-bd(b.time); }).slice(0,n);
  }
  function loadStats(){
    var m = {};
    rows().forEach(function(r){
      if(r.woi || !r.assignee || !isPerson(r.assignee)) return;
      var o = m[r.assignee] || (m[r.assignee]={name:r.assignee,n:0,hrs:{}});
      o.n++; var h = Math.floor(bd(r.time)/60); if(bd(r.time)!==9999) o.hrs[h]=(o.hrs[h]||0)+1;
    });
    return Object.keys(m).map(function(k){
      var o=m[k], best=-1, bc=0; Object.keys(o.hrs).forEach(function(h){ if(o.hrs[h]>bc){ bc=o.hrs[h]; best=+h; } });
      o.peak = best<0?'':hourLabel(best*60)+' ('+bc+')'; return o;
    }).sort(function(a,b){ return b.n-a.n; });
  }
  var spark = {at:0, data:null, busy:false};
  function loadSpark(){
    if(spark.busy || Date.now()-spark.at<600000) return;
    if(typeof fetchAllRowsAcrossDates!=='function') return;
    spark.busy = true;
    fetchAllRowsAcrossDates(false).then(function(all){
      var by = {}; (all||[]).forEach(function(r){ if(r._date) by[r._date]=(by[r._date]||0)+1; });
      spark.data = by; spark.at = Date.now(); spark.busy=false; drawSpark();
    }).catch(function(){ spark.busy=false; spark.at=Date.now()-540000; });
  }
  function days7(){
    var out=[], base=state.date;
    for(var i=6;i>=0;i--){ try{ out.push(addDaysToDateStr(base,-i)); }catch(e){} }
    return out;
  }
  function drawSpark(){
    var box = $('#d2Spark'); if(!box || !spark.data) return;
    var ds = days7(), vals = ds.map(function(d){ return d===state.date ? rows().length : (spark.data[d]||0); });
    var max = Math.max.apply(null, vals.concat([1])), W=120, H=30, pts = vals.map(function(v,i){ return [Math.round(i*(W-6)/6)+3, Math.round(H-4-(v/max)*(H-8))]; });
    var avg = vals.slice(0,-1).reduce(function(a,b){return a+b;},0)/Math.max(1,vals.length-1), cur = vals[vals.length-1];
    var diff = Math.round(cur-avg), cls = diff>0?'up':(diff<0?'down':'');
    box.innerHTML = '<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'"><polyline fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" points="'+pts.map(function(p){return p.join(',');}).join(' ')+'"/><circle cx="'+pts[pts.length-1][0]+'" cy="'+pts[pts.length-1][1]+'" r="3" fill="currentColor"/></svg>'
      +'<span class="d2-spark-t"><b>'+cur+'</b> calls <em class="'+cls+'">'+(diff>0?'▲ +':diff<0?'▼ ':'• ')+diff+' vs 6-day avg</em></span>';
    box.title = ds.map(function(d,i){ return d+': '+vals[i]; }).join('\n');
  }

  var D2ICONS = {
    timeline:'<path d="M4 6h9"/><path d="M8 12h11"/><path d="M5 18h8"/><circle cx="16" cy="6" r="1.3"/><circle cx="4.5" cy="12" r="1.3"/><circle cx="17" cy="18" r="1.3"/>',
    handover:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="m8.5 13 2.5 2.5 4.5-5"/>',
    group:'<path d="M4 6h16"/><path d="M7 12h13"/><path d="M10 18h10"/><path d="m4 11 2 1-2 1"/>',
    density:'<path d="M4 6h16"/><path d="M4 10h16"/><path d="M4 14h16"/><path d="M4 18h16"/>',
    cmd:'<path d="M9 9V7a2.5 2.5 0 1 0-2.5 2.5H18A2.5 2.5 0 1 0 15.5 7v10a2.5 2.5 0 1 0 2.5-2.5H6.5A2.5 2.5 0 1 0 9 17V9Z"/>'
  };
  var stripShown = false, railOpen = LS.get('d2.railOpen','0')==='1';
  var loadOpen = LS.get('d2.loadOpen','0')==='1';
  function stripHtml(){
    var allUp = isToday() ? upcoming(60) : [], up = railOpen ? allUp : allUp.slice(0,8);
    var nb = nowBd();
    var chips = up.map(function(r){
      var m = bd(r.time)-nb, un = !r.assignee;
      return '<button class="d2-next '+(un?'un':'')+(m<=15?' soon':'')+'" data-d2-go="'+esc(r.id)+'"><span class="d2-next-t">'+esc(r.time||'?')+'</span><span class="d2-next-c" data-bd="'+bd(r.time)+'">'+fmtIn(m)+'</span><span class="d2-next-n">'+esc(r.candidate||'(no name)')+'</span><span class="d2-next-a">'+(un?'⚠ nobody assigned':esc(r.assignee))+'</span></button>';
    }).join('');
    if(isToday() && !chips) chips = '<span class="d2-quiet">'+(rows().length?'No more calls coming up today ✓':'Nothing scheduled yet')+'</span>';
    var grp = LS.get('d2.group','off');
    var tools =
      '<button class="d2-tool" data-d2="timeline" title="Timeline — drag calls between handlers (Alt+T)"><i data-d2i="timeline"></i><span>Timeline</span></button>'
     +'<button class="d2-tool" data-d2="handover" title="Shift handover card (Alt+H)"><i data-d2i="handover"></i><span>Handover</span></button>'
     +'<label class="d2-tool d2-sel" title="Group the board"><i data-d2i="group"></i><select id="d2Group">'+['off:No grouping','handler:By handler','company:By company','country:By country','hour:By hour'].map(function(o){ var p=o.split(':'); return '<option value="'+p[0]+'"'+(grp===p[0]?' selected':'')+'>'+p[1]+'</option>'; }).join('')+'</select></label>'
     +'<button class="d2-tool" data-d2="density" title="Row density"><i data-d2i="density"></i><span>'+(LS.get('d2.density','comfy')==='compact'?'Compact':'Comfortable')+'</span></button>'
     +'<button class="d2-tool" data-d2="cmd" title="Command bar (Alt+K)"><i data-d2i="cmd"></i><span>Commands</span></button>';
    return '<div class="d2-strip" id="d2Strip">'
      +'<div class="d2-strip-top"><div class="d2-now"><div class="d2-now-h"><i class="d2-live"></i>Right now'+(allUp.length?'<em>'+allUp.length+' coming up</em>':'')+(allUp.length>8?'<button class="d2-more" data-d2="rail">'+(railOpen?'Show fewer':'Show all '+allUp.length)+'</button>':'')+'</div><div class="d2-nexts'+(railOpen?' open':'')+'">'+(isToday()?chips:'<span class="d2-quiet">Live countdown shows on today’s date</span>')+'</div></div>'
      +'<div class="d2-spark" id="d2Spark"></div></div>'
      +'<div class="d2-strip-bot"><div class="d2-tools">'+tools+'</div><button class="d2-loadtoggle" data-d2="load">'+(loadOpen?'Hide':'Show')+' handler load</button></div>'
      +(loadOpen?loadHtml():'')+'</div>';
  }
  function loadHtml(){
    var st = loadStats(); if(!st.length) return '<div class="d2-load"><span class="d2-quiet">No handler has calls yet.</span></div>';
    var max = Math.max.apply(null, st.map(function(s){return s.n;}));
    return '<div class="d2-load">'+st.map(function(s){
      var w = Math.round(s.n/max*100), heavy = s.n>=Math.max(8, max*0.85);
      return '<div class="d2-lrow" data-d2-filter="'+esc(s.name)+'" title="Filter the board to '+esc(s.name)+'"><span class="d2-lname">'+esc(s.name)+'</span><span class="d2-lbar"><i class="'+(heavy?'hot':'')+'" style="width:'+w+'%"></i></span><span class="d2-lnum">'+s.n+'</span><span class="d2-lpeak">'+(s.peak?'peak '+esc(s.peak):'')+'</span></div>';
    }).join('')+'</div>';
  }
  function mountStrip(){
    var old = $('#d2Strip'); if(old) old.remove();
    if(state.needsLogin) return;
    var anchor = $('#tabsWrap'); if(!anchor) return;
    var tmp = document.createElement('div'); tmp.innerHTML = stripHtml();
    var el = tmp.firstChild; if(stripShown) el.classList.add('still'); stripShown = true; anchor.parentNode.insertBefore(el, anchor);
    $$('[data-d2i]',el).forEach(function(i){ var p = D2ICONS[i.getAttribute('data-d2i')]; if(p) i.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'; });
    drawSpark(); loadSpark();
  }
  setInterval(function(){
    var nb = nowBd();
    $$('.d2-next-c').forEach(function(e){ var m = (+e.dataset.bd)-nb; e.textContent = fmtIn(m); e.parentNode.classList.toggle('soon', m<=15); });
    pill();
  }, 20000);
  setInterval(pill, 1500);

  /* ---------- group-by + sticky + chips + urgency ---------- */
  var collapsed = {}, pinSig = '', pinEl = null;
  function groupKey(r, mode){
    if(mode==='handler') return r.woi ? 'Waiting for invite' : (r.assignee||'— Unassigned —');
    if(mode==='company') return (r.company||'(no company)').trim();
    if(mode==='country') return r.country||'(none)';
    if(mode==='hour'){ var b=bd(r.time); return b===9999?'(no time)':hourLabel(Math.floor(b/60)*60); }
    return '';
  }
  function decorateTable(){
    var wrap = $('#tableScrollMain'); if(!wrap) return;
    var tbody = $('tbody', wrap); if(!tbody) return;
    var byId = {}; rows().forEach(function(r){ byId[r.id]=r; });
    var nb = nowBd(), today = isToday();
    $$('tr[data-id]', tbody).forEach(function(tr){
      var r = byId[tr.dataset.id]; if(!r) return;
      var rt = String(r.round||'').toLowerCase();
      var k = /onsite|on-site/.test(rt)||r.onsite ? 'on' : /final|last/.test(rt) ? 'f' : /^(2|3|4|5)/.test(rt)||/2nd|3rd|4th|second|third/.test(rt) ? 'r2' : 'r1';
      tr.classList.add('d2-r-'+k);
      var m = bd(r.time)-nb;
      if(today && live(r) && m<=30 && m>=-10){ tr.classList.add('d2-soon'); if(!r.assignee) tr.classList.add('d2-soon-un'); }
    });
    // pinned columns up to Candidate
    var ths = $$('thead th', wrap), ci = -1;
    ths.forEach(function(th,i){ if(ci<0 && /candidate/i.test(th.textContent)) ci=i; });
    if(ci>=0 && window.__d17vw>=760){   // pinned columns only matter on the wide table; phone shows cards
      // One <style> rule set instead of writing a class + left on every cell of every row (that was ~400 style
      // invalidations per redraw). Widths are read once; the rules are only rewritten when the widths change.
      var widths = [], lefts = [], left = 0, i;
      for(i=0;i<=ci;i++){ widths.push(ths[i].offsetWidth); }
      for(i=0;i<=ci;i++){ lefts.push(left); left += widths[i]; }
      var sig = ci+':'+lefts.join(',');
      if(sig !== pinSig || !pinEl || !pinEl.isConnected){
        pinSig = sig;
        if(!pinEl || !pinEl.isConnected){ pinEl = document.createElement('style'); pinEl.id = 'd2PinStyle'; document.head.appendChild(pinEl); }
        var K = ci+1, W = '#tableScrollMain ';
        var css = W+'thead th:nth-child(-n+'+K+'),'+W+'tbody tr:not(.d2-grp)>:nth-child(-n+'+K+'){position:sticky;z-index:3;background:var(--surface)}'
          + W+'thead th:nth-child(-n+'+K+'){z-index:6;background:var(--surface-2)}'
          + W+'tbody tr.d5-active:not(.d2-grp)>:nth-child(-n+'+K+'){background:color-mix(in srgb,var(--teal) 9%,var(--surface))}';
        for(i=0;i<=ci;i++){ css += W+'thead th:nth-child('+(i+1)+'),'+W+'tbody tr:not(.d2-grp)>:nth-child('+(i+1)+'){left:'+lefts[i]+'px}'; }
        pinEl.textContent = css;
      }
    } else if(pinEl && pinEl.isConnected && window.__d17vw<760){ pinEl.textContent = ''; pinSig = ''; }
    // grouping
    var mode = LS.get('d2.group','off');
    $$('tr.d2-grp', tbody).forEach(function(g){ g.remove(); });
    if(mode!=='off'){
      var trs = $$('tr[data-id]', tbody), groups = {}, order = [];
      trs.forEach(function(tr){ var r = byId[tr.dataset.id]; if(!r) return; var k = groupKey(r,mode); if(!groups[k]){ groups[k]=[]; order.push(k); } groups[k].push(tr); });
      if(mode==='hour'){ /* keep time order */ }
      else order.sort(function(a,b){ return a.indexOf('—')===0?-1: b.indexOf('—')===0?1: a.localeCompare(b); });
      var cols = (trs[0]&&trs[0].children.length)||12;
      order.forEach(function(k){
        var list = groups[k], un = list.filter(function(tr){ var r=byId[tr.dataset.id]; return r && !r.assignee && !r.woi; }).length;
        var h = document.createElement('tr'); h.className='d2-grp'+(collapsed[mode+k]?' closed':''); h.dataset.k = mode+k;
        h.innerHTML = '<td colspan="'+cols+'"><span class="d2-grp-caret">▾</span><b>'+esc(k)+'</b><span class="d2-grp-n">'+list.length+' call'+(list.length>1?'s':'')+'</span>'+(un?'<span class="d2-grp-un">'+un+' unassigned</span>':'')+'</td>';
        tbody.appendChild(h);
        list.forEach(function(tr){ tr.classList.toggle('d2-hidden', !!collapsed[mode+k]); tbody.appendChild(tr); });
      });
    }
  }

  /* ---------- empty state ---------- */
  function decorateEmpty(){
    $$('.d2-empty').forEach(function(e){ e.remove(); });
    if(state.needsLogin || state.dateSwitching || rows().length) return;
    var anchor = $('#d2Strip') || $('#tabsWrap'); if(!anchor) return;
    var el = document.createElement('div'); el.className='d2-empty';
    el.innerHTML = '<div class="d2-empty-art"><span></span><span></span><span></span></div><h3>No calls on '+esc(state.date)+' yet</h3><p>Paste the day’s list to get started, or bring a day back if it should already be here.</p><div class="d2-empty-btns"><button class="btn primary" data-d2="e-import">Import calls</button>'+(isAdmin()?'<button class="btn" data-d2="e-backups">Restore from backup / Excel</button>':'')+'<button class="btn ghost" data-d2="e-prev">Previous day</button></div>';
    anchor.parentNode.insertBefore(el, anchor.nextSibling);
  }

  /* ---------- decorate pipeline ---------- */
  function decorate(){
    try{ document.body.classList.toggle('d2-compact', LS.get('d2.density','comfy')==='compact'); }catch(e){}
    try{ trackChange(); }catch(e){}
    try{ mountStrip(); }catch(e){ console.warn('d2 strip',e); }
    try{ decorateTable(); }catch(e){ console.warn('d2 table',e); }
    try{ decorateEmpty(); }catch(e){}
    try{ pill(); }catch(e){}
    try{ if(tlOpen) renderTimeline(); }catch(e){}
  }
  function install(){
    if(typeof window.render!=='function'){ return setTimeout(install,50); }
    var orig = window.render;
    window.render = function(){ var r = orig.apply(this, arguments); try{ decorate(); }catch(e){ console.warn('d2',e); } return r; };
    try{ decorate(); }catch(e){}
  }

  /* ---------- quick-assign popover ---------- */
  var pop = null;
  function closePop(){ if(pop){ pop.remove(); pop=null; } document.removeEventListener('keydown', popKey, true); }
  function popKey(e){ if(e.key==='Escape'){ closePop(); e.stopPropagation(); } }
  function rankHandlers(row){
    var s = bd(row.time), e = s+dur(row), t = teamNamesSet();
    var byName = {}; rows().forEach(function(r){ if(r.id!==row.id && r.assignee && !r.woi) (byName[r.assignee]=byName[r.assignee]||[]).push(r); });
    var prior = {};
    try{ var po = findPriorOccurrence(row); if(po && po.assignee) prior[po.assignee]='candidate'; }catch(x){}
    try{ var pc = findPriorSameClientOccurrence(row); if(pc && pc.assignee && !prior[pc.assignee]) prior[pc.assignee]='client'; }catch(x){}
    var roster = (state.roster||[]).filter(function(p){ return p && p.name; });
    var seen = {}, list = [];
    roster.forEach(function(p){
      if(seen[p.name]||t.has(p.name)) return; seen[p.name]=1;
      var mine = byName[p.name]||[], clash = null, nextGap = 9999;
      mine.forEach(function(o){ var os=bd(o.time), oe=os+dur(o); if(os<e && oe>s && !clash) clash=o; if(os>=e) nextGap=Math.min(nextGap, os-e); });
      var absent = (state.absentIds||[]).indexOf(p.id)>=0;
      var lr = 0; try{ lr = window.d34Learn ? window.d34Learn(row, p.name) : 0; }catch(x){}
      list.push({name:p.name, team:p.team||'', load:mine.length, clash:clash, absent:absent, advanced:!!p.advanced, prior:prior[p.name]||'', learn:lr});
    });
    var teams = {}; roster.forEach(function(p){ if(p.team) teams[p.team]=1; }); t.forEach(function(n){ teams[n]=1; });
    var teamList = Object.keys(teams).filter(function(n){ return n && n!=='Needs Team Assignment'; }).sort().map(function(n){
      var cnt = rows().filter(function(r){ return r.id!==row.id && r.assignee===n && !r.woi; }).length;
      var members = roster.filter(function(p){ return p.team===n && !t.has(p.name); }).length;
      return {name:n, team:'Team assignment'+(members?' · '+members+' members':''), load:cnt, isTeam:true};
    });
    list.sort(function(a,b){ return (a.absent-b.absent) || ((!!a.clash)-(!!b.clash)) || ((b.learn>=2?b.learn:0)-(a.learn>=2?a.learn:0)) || ((b.prior?1:0)-(a.prior?1:0)) || (a.load-b.load) || a.name.localeCompare(b.name); });
    return teamList.concat(list);
  }
  window.d2Rank = function(row){ return rankHandlers(row); };
  function assignTo(id, name){
    var r = rows().find(function(x){ return x.id===id; }); if(!r) return;
    try{ if(window.d34Rec) window.d34Rec(id, name); }catch(e){}
    var sel = $('tr[data-id="'+id+'"] select[data-field="assignee"]');
    try{ if(sel && window.__cdFillLazy) window.__cdFillLazy(sel); }catch(e){}
    var has = sel && Array.prototype.some.call(sel.options, function(o){ return o.value===name; });
    if(sel && has){ sel.value = name; sel.dispatchEvent(new Event('change',{bubbles:true})); }
    else { r.assignee = name; markDirty(); render(); }
  }
  window.d2OpenAssign = function(id,anchor){ openAssignPop(id,anchor); };
  window.d2AssignTo = function(id,name){ assignTo(id,name); };
  function openAssignPop(id, anchor){
    closePop();
    var row = rows().find(function(x){ return x.id===id; }); if(!row || !isAdmin()) return;
    var list = rankHandlers(row);
    pop = document.createElement('div'); pop.className='d2-pop';
    pop.innerHTML = '<div class="d2-pop-h"><b>Assign</b> '+esc(row.candidate||'call')+' <span>'+esc(row.time||'')+' · '+esc(row.company||'')+'</span></div><input class="d2-pop-q" placeholder="Search handler…" autocomplete="off"><div class="d2-pop-l"></div>'+(row.assignee?'<button class="d2-pop-un">Unassign ('+esc(row.assignee)+')</button>':'');
    document.body.appendChild(pop);
    var L = $('.d2-pop-l',pop), Q = $('.d2-pop-q',pop);
    function paint(){
      var q = Q.value.trim().toLowerCase();
      var f = list.filter(function(h){ return !q || h.name.toLowerCase().indexOf(q)>=0 || h.team.toLowerCase().indexOf(q)>=0; });
      var lastTeam = null, fi = q ? 0 : Math.max(0, f.findIndex(function(h){ return !h.isTeam; }));
      L.innerHTML = f.map(function(h,i){
        var head = (lastTeam!==!!h.isTeam) ? '<div class="d2-pop-sec">'+(h.isTeam?'Teams':'People')+'</div>' : ''; lastTeam = !!h.isTeam;
        if(h.isTeam) return head+'<button class="d2-pop-i team'+(i===fi?' first':'')+'" data-n="'+esc(h.name)+'"><span class="d2-av team">\u25C6</span><span class="d2-pop-n">'+esc(h.name)+'<small>'+esc(h.team)+'</small></span><span class="d2-pop-m">'+h.load+' call'+(h.load===1?'':'s')+'</span><em class="tm">team</em></button>';
        var tag = h.absent ? '<em class="bad">absent</em>' : h.clash ? '<em class="bad">⚠ clashes '+esc(h.clash.time||'')+'</em>' : '<em class="ok">free</em>';
        return head+'<button class="d2-pop-i'+(i===fi?' first':'')+'" data-n="'+esc(h.name)+'"><span class="d2-av">'+esc(h.name.charAt(0).toUpperCase())+'</span><span class="d2-pop-n">'+esc(h.name)+'<small>'+esc(h.team)+(h.prior?' · <span class="d2-prior">↻ handled this '+h.prior+' before</span>':'')+(h.learn>=2?' · <span class="d2-prior">★ you usually pick</span>':'')+'</small></span><span class="d2-pop-m">'+h.load+' call'+(h.load===1?'':'s')+'</span>'+tag+'</button>';
      }).join('') || '<div class="d2-quiet" style="padding:12px">No match</div>';
    }
    paint(); Q.oninput = paint;
    L.onclick = function(e){ var b=e.target.closest('.d2-pop-i'); if(!b) return; var n=b.dataset.n; closePop(); assignTo(id,n); if(tlOpen) setTimeout(renderTimeline,0); };
    var un = $('.d2-pop-un',pop); if(un) un.onclick=function(){ closePop(); assignTo(id,''); };
    Q.onkeydown = function(e){ if(e.key==='Enter'){ var b=$('.d2-pop-i.first',L)||$('.d2-pop-i',L); if(b) b.click(); } };
    var rc = anchor && anchor.getBoundingClientRect ? anchor.getBoundingClientRect() : {left:innerWidth/2-150,bottom:innerHeight/3,top:innerHeight/3,width:0};
    var w = 320, left = Math.max(8, Math.min(innerWidth-w-8, rc.left)), top = rc.bottom+6;
    if(top+380>innerHeight) top = Math.max(8, rc.top-386);
    if(innerWidth<640){ left=8; pop.classList.add('sheet'); top=''; }
    pop.style.left=left+'px'; if(top!=='') pop.style.top=top+'px';
    setTimeout(function(){ Q.focus(); },0);
    document.addEventListener('keydown', popKey, true);
  }
  document.addEventListener('mousedown', function(e){
    if(pop && !e.target.closest('.d2-pop')) closePop();
    var sel = e.target.closest && e.target.closest('select[data-field="assignee"]');
    if(!sel || sel.disabled || !isAdmin()) return;
    var tr = sel.closest('tr[data-id]'); if(!tr) return;
    e.preventDefault(); sel.blur();
    openAssignPop(tr.dataset.id, sel);
  }, true);
  document.addEventListener('keydown', function(e){
    var sel = e.target && e.target.matches && e.target.matches('select[data-field="assignee"]') ? e.target : null;
    if(sel && !sel.disabled && isAdmin() && (e.key==='Enter'||e.key===' ')){ var tr=sel.closest('tr[data-id]'); if(tr){ e.preventDefault(); openAssignPop(tr.dataset.id, sel); } }
  });

  /* ---------- timeline ---------- */
  var tlOpen = false, tlEl = null;
  function openTimeline(){ tlOpen = true; if(!tlEl){ tlEl=document.createElement('div'); tlEl.id='d2Timeline'; document.body.appendChild(tlEl); } document.body.classList.add('d2-lock'); renderTimeline(); }
  function closeTimeline(){ tlOpen=false; if(tlEl){ tlEl.remove(); tlEl=null; } document.body.classList.remove('d2-lock'); }
  var tlSrc = LS.get('d2.tlSrc','all');
  function portalList(){ return (state.portalAssignments||[]).filter(function(p){ return p && (!p.dateKey || p.dateKey===state.date); }); }
  function pKey(n){ try{ return normalizeCandidateForMatch(n); }catch(e){ return String(n||'').toLowerCase().replace(/[^a-z]/g,''); } }
  function cKey(n){ try{ return normalizeCompanyKey(n); }catch(e){ return String(n||'').toLowerCase(); } }
  function sameName(a,b){ try{ return namesEquivalent(a,b); }catch(e){ return String(a||'').toLowerCase()===String(b||'').toLowerCase(); } }
  // match one desk row to a portal record (any team, same date), narrowing by time then company
  function portalFor(r, used){
    var k = pKey(r.candidate); if(!k) return null;
    var m = portalList().filter(function(p){ return pKey(p.candidate)===k; });
    if(!m.length) return null;
    var dated = m.filter(function(p){ return p.dateKey===state.date; }); if(dated.length) m = dated;
    if(m.length>1){ var tm = m.filter(function(p){ return p.time===r.time; }); if(tm.length) m = tm; }
    if(m.length>1){ var ck = cKey(r.company), cm = m.filter(function(p){ return cKey(p.client)===ck; }); if(cm.length) m = cm; }
    if(used){ var free = m.filter(function(p){ return used.indexOf(p)<0; }); if(free.length) m = free; }
    return m[0];
  }
  function tlModel(){
    var src = tlSrc, hasP = !!(state.portalAssignments && state.portalAssignments.length);
    if(!hasP && src!=='desk') src = 'desk';
    var items = [], used = [], stats = {desk:0, fromPortal:0, differ:0, portalOnly:0, portalNoTime:0};
    rows().filter(function(r){ return !r.woi; }).forEach(function(r){
      if(bd(r.time)===9999) return;
      var P = (src!=='desk') ? portalFor(r, used) : null; if(P) used.push(P);
      var lane = r.assignee || '', kind = 'desk', note = '';
      if(src==='portal'){ lane = P ? (P.handler||'') : ''; kind = P?'portal':'desk'; if(!P) note='not in portal'; }
      else if(P){
        var ph = P.handler||'';
        if(!lane && ph){ lane = ph; kind='portal'; stats.fromPortal++; note='Assigned in Portal: '+ph; }
        else if(lane && ph && !sameName(lane, ph)){ kind='differ'; stats.differ++; note='Portal shows: '+ph; }
      }
      stats.desk++;
      items.push({r:r, lane:lane, kind:kind, note:note, start:bd(r.time), len:dur(r), P:P});
    });
    if(src!=='desk' && hasP){
      portalList().forEach(function(p){
        if(used.indexOf(p)>=0 || !p.dateKey) return;
        var b = bd(p.time); if(b===9999){ stats.portalNoTime++; return; }
        stats.portalOnly++;
        items.push({r:{id:'p:'+(p.candidate||'')+b, candidate:p.candidate, company:p.client, time:p.time, round:p.round||'', duration:p.duration||''}, lane:p.handler||p.assignee||'', kind:'ponly', note:'Portal only (not on the desk list)'+(p.status?' — '+p.status:''), start:b, len:(parseDurationMinutes(p.duration)||30), ghost:true});
      });
    }
    return {items:items, stats:stats, src:src, hasP:hasP};
  }
  function renderTimeline(){
    if(!tlEl) return;
    var M = tlModel(), items = M.items;
    var seg = function(k,l){ return '<button class="d2-seg'+(M.src===k?' on':'')+'" data-d2="tl-src" data-v="'+k+'"'+(k!=='desk'&&!M.hasP?' title="Sync the Portal first"':'')+'>'+l+'</button>'; };
    var head = '<div class="d2-tl-h"><b>Timeline · '+esc(state.date)+'</b><div class="d2-segs">'+seg('all','Desk + Portal')+seg('desk','Desk only')+seg('portal','Portal only')+'</div><button class="btn ghost d2-sync" data-d2="tl-sync">'+(state.portalSyncLoading?'Syncing…':'⟳ Sync Portal')+'</button><button class="d2-x" data-d2="tl-close" title="Close (Esc)">✕</button></div>';
    var info = M.hasP ? '<div class="d2-tl-info"><span><i class="k desk"></i>Desk '+M.stats.desk+'</span><span><i class="k portal"></i>Filled from Portal '+M.stats.fromPortal+'</span><span><i class="k differ"></i>Portal differs '+M.stats.differ+'</span><span><i class="k ponly"></i>Portal only '+M.stats.portalOnly+'</span>'+(M.stats.portalNoTime?'<span>'+M.stats.portalNoTime+' portal call(s) without a time</span>':'')+'</div>' : '<div class="d2-tl-info warn">No Portal data loaded yet — tap “Sync Portal” to bring in the Portal’s handlers and any calls missing from the desk list.</div>';
    if(!items.length){ tlEl.innerHTML = '<div class="d2-tl-card">'+head+info+'<div class="d2-empty" style="margin:30px"><h3>No timed calls to plot</h3></div></div>'; return; }
    var minB = Math.floor(Math.min.apply(null, items.map(function(x){return x.start;}))/60)*60;
    var maxB = Math.ceil(Math.max.apply(null, items.map(function(x){return x.start+x.len;}))/60)*60;
    var PX = innerWidth<700 ? 1.6 : 2.2, W = Math.max(600,(maxB-minB)*PX);
    var t = teamNamesSet();
    var names = {}; items.forEach(function(x){ (names[x.lane]=names[x.lane]||[]).push(x); });
    if(isAdmin() && M.src!=='portal' && !names['']) names[''] = [];
    var lanes = Object.keys(names).sort(function(a,b){ if(a==='') return -1; if(b==='') return 1; var ta=t.has(a), tb=t.has(b); if(ta!==tb) return ta?1:-1; return a.localeCompare(b); });
    var conflict = {}; try{ computeConflicts(rows()).forEach(function(id){ conflict[id]=1; }); }catch(e){}
    var hours = ''; for(var h=minB; h<=maxB; h+=60) hours += '<div class="d2-tl-hr" style="left:'+((h-minB)*PX)+'px"><span>'+hourLabel(h)+'</span></div>';
    var body = lanes.map(function(k){
      var list = names[k].slice().sort(function(a,b){ return a.start-b.start; }), ends=[], blocks='';
      list.forEach(function(x){
        var r=x.r, s=x.start, e=s+x.len, row=0; while(ends[row]!==undefined && ends[row]>s) row++; ends[row]=e;
        var rc = /onsite/i.test(r.round||'')||r.onsite?'on':(/^(1|1st)/i.test(r.round||'')||!r.round?'r1':'r2');
        var drag = isAdmin() && !x.ghost && M.src!=='portal';
        blocks += '<div class="d2-tl-b d2-r-'+rc+' k-'+x.kind+(conflict[r.id]?' clash':'')+'" draggable="'+drag+'" data-id="'+esc(r.id)+'"'+(x.ghost?' data-ghost="1"':'')+' style="left:'+((s-minB)*PX)+'px;width:'+Math.max(46,x.len*PX-2)+'px;top:'+(6+row*38)+'px" title="'+esc((r.candidate||'')+' — '+(r.company||'')+'\n'+(r.time||'')+' · '+(r.round||'')+' · '+(r.duration||'')+(k?'\n'+k:'\nUnassigned')+(x.note?'\n'+x.note:''))+'">'+(x.kind==='portal'?'<i class="d2-bd p">P</i>':x.kind==='differ'?'<i class="d2-bd d">≠</i>':x.kind==='ponly'?'<i class="d2-bd o">P</i>':'')+'<b>'+esc(r.candidate||'?')+'</b><small>'+esc(r.company||'')+'</small></div>';
      });
      var lh = 12+Math.max(1,ends.length)*38, un = k==='';
      return '<div class="d2-tl-lane'+(un?' un':'')+'"><div class="d2-tl-name"><span class="d2-av'+(t.has(k)?' team':'')+'">'+(un?'?':esc(k.charAt(0).toUpperCase()))+'</span><span>'+(un?'Unassigned':esc(k))+'<small>'+(un&&!list.length?'drop here to unassign':list.length+' call'+(list.length>1?'s':''))+'</small></span></div><div class="d2-tl-track" data-lane="'+esc(k)+'" style="width:'+W+'px;height:'+lh+'px">'+blocks+'</div></div>';
    }).join('');
    var nb = nowBd(), nowLine = (isToday() && nb>=minB && nb<=maxB) ? '<div class="d2-tl-now" style="margin-left:150px;left:'+((nb-minB)*PX)+'px"><span>now</span></div>' : '';
    var prevScroll = $('.d2-tl-scroll', tlEl); var sl = prevScroll?prevScroll.scrollLeft:0, st = prevScroll?prevScroll.scrollTop:0;
    tlEl.innerHTML = '<div class="d2-tl-card">'+head+info
      +'<div class="d2-tl-scroll"><div class="d2-tl-axis"><div class="d2-tl-corner"></div><div style="position:relative;flex:none;width:'+W+'px;height:26px">'+hours+'</div></div><div class="d2-tl-body" style="--w:'+W+'px">'+body+nowLine+'</div></div></div>';
    var sc = $('.d2-tl-scroll', tlEl); sc.scrollLeft = sl || (isToday()&&nb>minB ? Math.max(0,(nb-minB)*PX-200) : 0); sc.scrollTop = st;
  }
  document.addEventListener('dragstart', function(e){ var b=e.target.closest&&e.target.closest('.d2-tl-b'); if(!b) return; e.dataTransfer.setData('text/plain', b.dataset.id); e.dataTransfer.effectAllowed='move'; b.classList.add('drag'); });
  document.addEventListener('dragend', function(e){ $$('.d2-tl-b.drag,.d2-tl-track.over').forEach(function(x){ x.classList.remove('drag','over'); }); });
  document.addEventListener('dragover', function(e){ var t=e.target.closest&&e.target.closest('.d2-tl-track'); if(!t) return; e.preventDefault(); $$('.d2-tl-track.over').forEach(function(x){ if(x!==t) x.classList.remove('over'); }); t.classList.add('over'); });
  document.addEventListener('drop', function(e){
    var t=e.target.closest&&e.target.closest('.d2-tl-track'); if(!t) return; e.preventDefault();
    var id = e.dataTransfer.getData('text/plain'); var lane = t.dataset.lane;
    var r = rows().find(function(x){ return x.id===id; }); if(!r || (r.assignee||'')===lane) return;
    r.assignee = lane; markDirty(); render(); renderTimeline();
  });

  /* ---------- handover ---------- */
  function handoverData(){
    var rs = rows(), nb = nowBd(), un = rs.filter(function(r){ return !r.assignee && !r.woi && !r.status; });
    var risk = [];
    try{ var c = computeConflicts(rs); rs.forEach(function(r){ if(c.has(r.id)) risk.push({r:r, why:'Double-booked '+(r.assignee||'')}); }); }catch(e){}
    if(isToday()) un.forEach(function(r){ var m=bd(r.time)-nb; if(m<=90 && m>=-10) risk.push({r:r, why:'Starts '+fmtIn(m)+' — nobody assigned'}); });
    var woi = rs.filter(function(r){ return r.woi; });
    var res = rs.filter(function(r){ return r.status; });
    return {un:un, risk:risk, woi:woi, res:res, total:rs.length, assigned:rs.filter(function(r){ return r.assignee; }).length};
  }
  function handoverText(){
    var d = handoverData(), L = [];
    L.push('SHIFT HANDOVER — '+state.date);
    L.push(d.total+' calls · '+d.assigned+' assigned · '+d.un.length+' unassigned · '+d.woi.length+' waiting for invite');
    if(d.un.length){ L.push('', 'UNASSIGNED:'); d.un.slice().sort(function(a,b){return bd(a.time)-bd(b.time);}).forEach(function(r){ L.push('- '+(r.time||'?')+' '+(r.candidate||'')+' — '+(r.company||'')); }); }
    if(d.risk.length){ L.push('', 'AT RISK:'); d.risk.forEach(function(x){ L.push('- '+(x.r.time||'?')+' '+(x.r.candidate||'')+' — '+x.why); }); }
    if(d.woi.length){ L.push('', 'WAITING FOR INVITE:'); d.woi.forEach(function(r){ L.push('- '+(r.candidate||'')+' — '+(r.company||'')); }); }
    if(d.res.length){ L.push('', 'RESCHEDULED / CANCELLED / NO RESPONSE:'); d.res.forEach(function(r){ L.push('- '+(r.candidate||'')+' — '+(r.company||'')+' ('+r.status+')'); }); }
    if(state.shiftNote && state.shiftNote.trim()) L.push('', 'NOTE FOR NEXT SHIFT:', state.shiftNote.trim());
    return L.join('\n');
  }
  var hoEl = null;
  function openHandover(){
    closeHandover();
    var d = handoverData(), li = function(r, extra){ return '<li><b>'+esc(r.time||'?')+'</b> '+esc(r.candidate||'')+' <span>'+esc(r.company||'')+'</span>'+(extra?'<em>'+esc(extra)+'</em>':'')+'</li>'; };
    var sec = function(title, cls, arr){ return '<section class="'+cls+'"><h4>'+title+' <span>'+arr.length+'</span></h4>'+(arr.length?'<ul>'+arr.join('')+'</ul>':'<p class="d2-quiet">Nothing here ✓</p>')+'</section>'; };
    hoEl = document.createElement('div'); hoEl.id='d2Handover';
    hoEl.innerHTML = '<div class="d2-ho-card"><div class="d2-tl-h"><b>Shift handover · '+esc(state.date)+'</b><button class="d2-x" data-d2="ho-close">✕</button></div>'
      +'<div class="d2-ho-stats"><div><b>'+d.total+'</b>calls</div><div><b>'+d.assigned+'</b>assigned</div><div class="'+(d.un.length?'bad':'')+'"><b>'+d.un.length+'</b>unassigned</div><div><b>'+d.woi.length+'</b>waiting invite</div></div>'
      +'<div class="d2-ho-body">'
      +sec('Unassigned','bad', d.un.slice().sort(function(a,b){return bd(a.time)-bd(b.time);}).map(function(r){ return li(r); }))
      +sec('At risk','warn', d.risk.map(function(x){ return li(x.r, x.why); }))
      +sec('Waiting for invite','', d.woi.map(function(r){ return li(r); }))
      +sec('Rescheduled / cancelled','', d.res.map(function(r){ return li(r, r.status); }))
      +'<section><h4>Note for next shift</h4><p class="d2-note">'+(state.shiftNote&&state.shiftNote.trim()?esc(state.shiftNote):'<span class="d2-quiet">No note written yet — add one in the Note for next shift box.</span>')+'</p></section></div>'
      +'<div class="d2-ho-btns"><button class="btn primary" data-d2="ho-copy">Copy as text</button><button class="btn" data-d2="ho-print">Print</button></div></div>';
    document.body.appendChild(hoEl); document.body.classList.add('d2-lock');
  }
  function closeHandover(){ if(hoEl){ hoEl.remove(); hoEl=null; } if(!tlOpen) document.body.classList.remove('d2-lock'); }

  /* ---------- command bar ---------- */
  var cmdEl = null;
  function monthIdx(s){ var m = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'].indexOf(s.slice(0,3).toLowerCase()); return m; }
  function parseDateWords(q){
    q = q.toLowerCase().trim();
    var base = state.date;
    if(q==='today') return todayDateString();
    if(q==='tomorrow') return addDaysToDateStr(todayDateString(),1);
    if(q==='yesterday') return addDaysToDateStr(todayDateString(),-1);
    var m = q.match(/^(\d{4})-(\d{2})-(\d{2})$/); if(m) return q;
    m = q.match(/^(\d{1,2})[-\/ ](\d{1,2})[-\/ ](\d{4})$/); if(m) return m[3]+'-'+m[2].padStart(2,'0')+'-'+m[1].padStart(2,'0');
    m = q.match(/^(\d{1,2})\s*([a-z]{3,})(?:\s*(\d{4}))?$/); if(m && monthIdx(m[2])>=0) return (m[3]||base.slice(0,4))+'-'+String(monthIdx(m[2])+1).padStart(2,'0')+'-'+m[1].padStart(2,'0');
    m = q.match(/^([a-z]{3,})\s*(\d{1,2})(?:\s*(\d{4}))?$/); if(m && monthIdx(m[1])>=0) return (m[3]||base.slice(0,4))+'-'+String(monthIdx(m[1])+1).padStart(2,'0')+'-'+m[2].padStart(2,'0');
    return null;
  }
  function gotoDate(d){ var p=$('#datePicker'); if(!p) return; p.value=d; p.dispatchEvent(new Event('change',{bubbles:true})); }
  function flash(id){ var tr=$('tr[data-id="'+id+'"]'); if(!tr) return false; tr.scrollIntoView({behavior:'smooth',block:'center'}); tr.classList.remove('d2-flash'); void tr.offsetWidth; tr.classList.add('d2-flash'); return true; }
  function cmdItems(q){
    var out = [], ql = q.toLowerCase().trim();
    var act = function(label, hint, fn, ic){ out.push({label:label, hint:hint, fn:fn, ic:ic||'⚡'}); };
    var m = ql.match(/^assign\s+(.+?)\s+to\s+(.+)$/);
    if(m && isAdmin()){
      var cands = rows().filter(function(r){ return (r.candidate||'').toLowerCase().indexOf(m[1])>=0; }).slice(0,3);
      var hs = (state.roster||[]).filter(function(p){ return p.name && p.name.toLowerCase().indexOf(m[2])>=0; }).slice(0,3);
      cands.forEach(function(r){ hs.forEach(function(h){ act('Assign '+r.candidate+' → '+h.name, (r.time||'')+' · '+(r.company||''), function(){ assignTo(r.id,h.name); }, '👤'); }); });
    }
    var dm = ql.replace(/^(go( to)?|open|date)\s+/,''); var dt = dm ? parseDateWords(dm) : null;
    if(dt) act('Go to '+dt, 'Switch the board to this date', function(){ gotoDate(dt); }, '📅');
    var cmds = [
      ['timeline','Open timeline','Drag calls between handlers',openTimeline,'🗓'],
      ['handover','Shift handover card','Copy or print',openHandover,'📋'],
      ['compact','Compact rows','Denser table',function(){ LS.set('d2.density','compact'); render(); },'▤'],
      ['comfortable','Comfortable rows','Roomier table',function(){ LS.set('d2.density','comfy'); render(); },'▥'],
      ['group handler','Group by handler','',function(){ LS.set('d2.group','handler'); render(); },'▾'],
      ['group company','Group by company','',function(){ LS.set('d2.group','company'); render(); },'▾'],
      ['group hour','Group by hour','',function(){ LS.set('d2.group','hour'); render(); },'▾'],
      ['ungroup','Remove grouping','',function(){ LS.set('d2.group','off'); render(); },'▾'],
      ['unassigned','Show only unassigned','',function(){ state.filter='unassigned'; render(); },'⚠'],
      ['all calls','Show all (clear filter)','',function(){ state.filter='all'; state.assigneeFilter=''; render(); },'✱'],
      ['undo','Undo last change','Alt+Z',doUndo,'↶'],
      ['save','Save changes','Ctrl+S',function(){ if(isAdmin()) saveAllChanges(); },'💾']
    ];
    try{ if(window.d2ExtraCmds) cmds = cmds.concat(window.d2ExtraCmds()); }catch(x){}
    cmds.forEach(function(c){ if(!ql || c[0].indexOf(ql)>=0 || c[1].toLowerCase().indexOf(ql)>=0) act(c[1], c[2], c[3], c[4]); });
    if(ql.length>=2){
      rows().filter(function(r){ return ((r.candidate||'')+' '+(r.company||'')+' '+(r.role||'')+' '+(r.assignee||'')).toLowerCase().indexOf(ql)>=0; }).slice(0,6)
        .forEach(function(r){ act(r.candidate||'(no name)', (r.time||'')+' · '+(r.company||'')+' · '+(r.assignee||'unassigned'), function(){ if(!flash(r.id)){ state.filter='all'; state.view='all'; render(); setTimeout(function(){ flash(r.id); },80); } }, '🔎'); });
    }
    return out.slice(0,10);
  }
  function openCmd(){
    if(cmdEl) return closeCmd();
    cmdEl = document.createElement('div'); cmdEl.id='d2Cmd';
    cmdEl.innerHTML = '<div class="d2-cmd-card"><input class="d2-cmd-q" placeholder="Type a command, name or date…  try: assign anil to kumar · go 20 oct · timeline" autocomplete="off"><div class="d2-cmd-l"></div><div class="d2-cmd-f">↑↓ choose · Enter run · Esc close</div></div>';
    document.body.appendChild(cmdEl);
    var Q=$('.d2-cmd-q',cmdEl), Lx=$('.d2-cmd-l',cmdEl), items=[], idx=0;
    function paint(){
      items = cmdItems(Q.value); if(idx>=items.length) idx=0;
      Lx.innerHTML = items.map(function(it,i){ return '<button class="d2-cmd-i'+(i===idx?' on':'')+'" data-i="'+i+'"><span class="d2-cmd-ic">'+it.ic+'</span><span>'+esc(it.label)+'</span><small>'+esc(it.hint||'')+'</small></button>'; }).join('') || '<div class="d2-quiet" style="padding:14px">Nothing matches</div>';
    }
    function run(i){ var it=items[i]; if(!it) return; closeCmd(); try{ it.fn(); }catch(e){ toast('Command failed: '+e.message,{ms:4000}); } }
    Q.oninput=function(){ idx=0; paint(); };
    Q.onkeydown=function(e){ if(e.key==='ArrowDown'){ idx=Math.min(items.length-1,idx+1); paint(); e.preventDefault(); } else if(e.key==='ArrowUp'){ idx=Math.max(0,idx-1); paint(); e.preventDefault(); } else if(e.key==='Enter'){ run(idx); } else if(e.key==='Escape'){ closeCmd(); } };
    Lx.onclick=function(e){ var b=e.target.closest('.d2-cmd-i'); if(b) run(+b.dataset.i); };
    cmdEl.addEventListener('mousedown', function(e){ if(e.target===cmdEl) closeCmd(); });
    paint(); Q.focus();
  }
  function closeCmd(){ if(cmdEl){ cmdEl.remove(); cmdEl=null; } }

  /* ---------- global events ---------- */
  document.addEventListener('click', function(e){
    if(tlEl && e.target===tlEl){ closeTimeline(); return; }       // tap outside closes, like every other pop-up
    if(hoEl && e.target===hoEl){ closeHandover(); return; }
    var t = e.target.closest && e.target.closest('[data-d2],[data-d2-go],[data-d2-filter],.d2-grp');
    if(!t) return;
    if(t.classList.contains('d2-grp')){ var k=t.dataset.k; collapsed[k]=!collapsed[k]; decorateTable(); return; }
    if(t.dataset.d2Go){ if(!flash(t.dataset.d2Go)){ state.filter='all'; state.view='all'; render(); setTimeout(function(){ flash(t.dataset.d2Go); },80); } return; }
    if(t.dataset.d2Filter){ state.assigneeFilter = (state.assigneeFilter===t.dataset.d2Filter)?'':t.dataset.d2Filter; render(); return; }
    switch(t.dataset.d2){
      case 'timeline': openTimeline(); break;
      case 'tl-close': closeTimeline(); break;
      case 'tl-src': tlSrc = t.dataset.v; LS.set('d2.tlSrc', tlSrc); renderTimeline(); break;
      case 'tl-sync': if(typeof fetchPortalSync==='function' && !state.portalSyncLoading){ var pr = fetchPortalSync('today'); renderTimeline(); Promise.resolve(pr).then(function(){ if(tlOpen) renderTimeline(); }); } break;
      case 'handover': openHandover(); break;
      case 'ho-close': closeHandover(); break;
      case 'ho-copy': try{ navigator.clipboard.writeText(handoverText()).then(function(){ toast('Handover copied',{ms:2500}); }); }catch(x){ toast('Copy failed',{ms:2500}); } break;
      case 'ho-print': var w=window.open('','_blank'); if(w){ w.document.write('<pre style="font:14px/1.5 system-ui;white-space:pre-wrap;padding:24px">'+esc(handoverText())+'</pre>'); w.document.close(); w.print(); } break;
      case 'density': LS.set('d2.density', LS.get('d2.density','comfy')==='compact'?'comfy':'compact'); render(); break;
      case 'cmd': openCmd(); break;
      case 'rail': railOpen=!railOpen; LS.set('d2.railOpen', railOpen?'1':'0'); mountStrip(); break;
      case 'load': loadOpen=!loadOpen; LS.set('d2.loadOpen', loadOpen?'1':'0'); mountStrip(); break;
      case 'e-import': var ib=$('#toggleImportHub'); if(ib) ib.click(); break;
      case 'e-backups': var mm=$('#toggleBackups'); if(mm) mm.click(); else { var mb=$('.more-menu-wrap button'); if(mb){ mb.click(); setTimeout(function(){ var b2=$('#toggleBackups'); if(b2) b2.click(); },60); } } break;
      case 'e-prev': var pb=$('#prevDay'); if(pb) pb.click(); break;
    }
  });
  document.addEventListener('click', function(e){
    var lt = e.target.closest && e.target.closest('.lf-toast');
    if(lt && /more alerts/i.test(lt.textContent) && !e.target.closest('button')){ var bell=$('.lf-bell'); if(bell) bell.click(); }
  });
  document.addEventListener('click', function(e){
    var b=e.target.closest&&e.target.closest('.d2-tl-b'); if(b && isAdmin() && !b.dataset.ghost && !e.defaultPrevented){ openAssignPop(b.dataset.id, b); }
  });
  document.addEventListener('change', function(e){ if(e.target && e.target.id==='d2Group'){ LS.set('d2.group', e.target.value); render(); } });
  document.addEventListener('keydown', function(e){
    var typing = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable;
    if(e.key==='Escape'){ if(cmdEl) return closeCmd(); if(pop) return; if(hoEl) return closeHandover(); if(tlOpen) return closeTimeline(); }
    if(e.altKey && !e.ctrlKey && !e.metaKey){
      var k = e.key.toLowerCase();
      if(k==='k'){ e.preventDefault(); openCmd(); }
      else if(k==='t'){ e.preventDefault(); tlOpen?closeTimeline():openTimeline(); }
      else if(k==='h'){ e.preventDefault(); hoEl?closeHandover():openHandover(); }
      else if(k==='z' && !typing){ e.preventDefault(); doUndo(); }
    }
  });

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

;
/* ===== desk3.js ===== */
/* desk3.js — UI layer #3 (loaded after desk2.js).
   Bulk smart-pick, auto-suggest assignments, conflicts rail, late-night meter, stale-sync badge,
   saved views, pinned favourites, candidate hover card, column chooser, night theme,
   keyboard map (?), all-covered celebration, printable day sheet, drag a row onto a team.
   Reuses app functions; never edits app.js. */
(function(){
  'use strict';
  if(window.__desk3) return; window.__desk3 = true;
  var LS = {
    get:function(k,d){ try{ var v=localStorage.getItem(k); return v===null?d:v; }catch(e){ return d; } },
    set:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  };
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var isAdmin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  var rows = function(){ try{ return state.rows||[]; }catch(e){ return []; } };
  var bd = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var dur = function(r){ try{ return parseDurationMinutes(r.duration)||30; }catch(e){ return 30; } };
  var live = function(r){ return !r.woi && !r.status; };
  var toast = function(m,o){ if(window.d2Toast) return window.d2Toast(m,o); };
  var teamSet = function(){ try{ return getTeamNames(); }catch(e){ return new Set(); } };
  var jparse = function(s,d){ try{ var v=JSON.parse(s); return v==null?d:v; }catch(e){ return d; } };
  var nowBd = function(){ var d=new Date(); return (d.getHours()*60+d.getMinutes()+720)%1440; };
  var hourLabel = function(b){ var m=(b+720)%1440,h=Math.floor(m/60); return (h%12||12)+(h<12?' AM':' PM'); };
  var D3ICONS = {
    wand:'<path d="m5 19 10-10"/><path d="m14 4 1 2 2 1-2 1-1 2-1-2-2-1 2-1Z"/><path d="m18 12 .7 1.3L20 14l-1.3.7L18 16l-.7-1.3L16 14l1.3-.7Z"/>',
    views:'<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M4 10h16"/><path d="M9 10v9"/>',
    cols:'<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M9.5 5v14"/><path d="M14.5 5v14"/>',
    moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"/>',
    print:'<path d="M7 9V4h10v5"/><rect x="4" y="9" width="16" height="8" rx="2"/><path d="M7 14h10v6H7z"/>',
    keys:'<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"/>',
    star:'<path d="m12 4 2.4 5 5.4.7-4 3.8 1 5.4L12 16.3 7.2 18.9l1-5.4-4-3.8 5.4-.7L12 4Z"/>'
  };
  var ico = function(n){ return '<i class="d3-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(D3ICONS[n]||'')+'</svg></i>'; };

  /* ================= helpers: handlers, conflicts, load ================= */
  function peopleList(){
    var t = teamSet(), seen = {}, out = [];
    (state.roster||[]).forEach(function(p){ if(p && p.name && !t.has(p.name) && !seen[p.name]){ seen[p.name]=1; out.push(p); } });
    return out;
  }
  function isAbsentP(p){ try{ return (state.absentIds||[]).indexOf(p.id)>=0; }catch(e){ return false; } }
  function overlapsFor(name, r, list){
    var s=bd(r.time), e=s+dur(r);
    return list.filter(function(o){ if(o.id===r.id || o.assignee!==name || o.woi) return false; var os=bd(o.time); return os<e && os+dur(o)>s; });
  }
  function conflictPairs(){
    var t = teamSet(), by = {}, out = [];
    rows().forEach(function(r){ if(r.woi || !r.assignee || t.has(r.assignee) || bd(r.time)===9999) return; (by[r.assignee]=by[r.assignee]||[]).push(r); });
    Object.keys(by).forEach(function(n){
      var l = by[n].sort(function(a,b){ return bd(a.time)-bd(b.time); });
      for(var i=0;i<l.length;i++) for(var j=i+1;j<l.length;j++){ if(bd(l[j].time) < bd(l[i].time)+dur(l[i])) out.push({name:n,a:l[i],b:l[j]}); }
    });
    return out;
  }

  /* ================= 1. bulk smart-pick ================= */
  function decorateBulk(){
    var bar = $('.bulk-bar'); if(!bar || $('#d3BulkPick', bar) || !isAdmin()) return;
    var anchor = $('#bulkApplyBtn', bar); if(!anchor) return;
    var b = document.createElement('button'); b.className='btn'; b.id='d3BulkPick'; b.innerHTML = ico('wand')+'<span>Smart pick…</span>'; b.title='Choose from handlers ranked by free time and load, then assign every selected call';
    anchor.parentNode.insertBefore(b, anchor.nextSibling);
  }
  var pop = null;
  function closePop(){ if(pop){ pop.remove(); pop=null; } }
  function openBulkPop(anchor){
    closePop();
    var ids = Array.from(state.selectedIds||[]); var sel = rows().filter(function(r){ return ids.indexOf(r.id)>=0; });
    if(!sel.length) return;
    var t = teamSet(), people = peopleList(), list = [];
    var teamsObj = {}; (state.roster||[]).forEach(function(p){ if(p.team) teamsObj[p.team]=1; }); t.forEach(function(n){ teamsObj[n]=1; });
    Object.keys(teamsObj).filter(function(n){ return n && n!=='Needs Team Assignment'; }).sort().forEach(function(n){ list.push({name:n, team:true, clash:0, load:rows().filter(function(r){ return r.assignee===n; }).length}); });
    people.forEach(function(p){
      var clash = 0; var simulated = rows().filter(function(r){ return ids.indexOf(r.id)<0; });
      sel.forEach(function(r){ if(overlapsFor(p.name, r, simulated).length) clash++; });
      // overlaps among the selected calls themselves (a person can't take two at once)
      var among = 0; for(var i=0;i<sel.length;i++) for(var j=i+1;j<sel.length;j++){ var a=sel[i],b=sel[j]; if(bd(a.time)<bd(b.time)+dur(b) && bd(b.time)<bd(a.time)+dur(a)) among++; }
      list.push({name:p.name, sub:p.team||'', clash:clash, among:among, absent:isAbsentP(p), load:rows().filter(function(r){ return r.assignee===p.name && ids.indexOf(r.id)<0; }).length});
    });
    list.sort(function(a,b){ return (!!b.team-!!a.team) || ((a.absent?1:0)-(b.absent?1:0)) || (a.clash-b.clash) || (a.load-b.load) || a.name.localeCompare(b.name); });
    pop = document.createElement('div'); pop.className='d2-pop d3-bulkpop';
    pop.innerHTML = '<div class="d2-pop-h"><b>Assign '+sel.length+' call'+(sel.length>1?'s':'')+'</b><span>'+esc(sel.slice(0,3).map(function(r){ return r.candidate||'?'; }).join(', '))+(sel.length>3?' …':'')+'</span></div><input class="d2-pop-q" placeholder="Search handler or team…"><div class="d2-pop-l"></div>';
    document.body.appendChild(pop);
    var L=$('.d2-pop-l',pop), Q=$('.d2-pop-q',pop);
    function paint(){
      var q=Q.value.trim().toLowerCase(), last=null;
      L.innerHTML = list.filter(function(h){ return !q || h.name.toLowerCase().indexOf(q)>=0; }).map(function(h){
        var head = last!==!!h.team ? '<div class="d2-pop-sec">'+(h.team?'Teams':'People')+'</div>' : ''; last=!!h.team;
        var tag = h.team ? '<em class="tm">team</em>' : h.absent ? '<em class="bad">absent</em>' : h.clash ? '<em class="bad">⚠ '+h.clash+' clash'+(h.clash>1?'es':'')+'</em>' : '<em class="ok">free</em>';
        return head+'<button class="d2-pop-i" data-n="'+esc(h.name)+'"><span class="d2-av'+(h.team?' team':'')+'">'+(h.team?'◆':esc(h.name.charAt(0).toUpperCase()))+'</span><span class="d2-pop-n">'+esc(h.name)+'<small>'+esc(h.sub||'')+'</small></span><span class="d2-pop-m">'+h.load+' calls</span>'+tag+'</button>';
      }).join('') || '<div class="d2-quiet" style="padding:12px">No match</div>';
    }
    paint(); Q.oninput=paint;
    L.onclick=function(e){ var b=e.target.closest('.d2-pop-i'); if(!b) return; var n=b.dataset.n; closePop();
      sel.forEach(function(r){ r.assignee=n; r.woi=false; }); state.selectedIds.clear(); markDirty(); render(); toast('Assigned '+sel.length+' call'+(sel.length>1?'s':'')+' to '+n, {ms:3500}); };
    var rc = anchor.getBoundingClientRect(), w=320, left=Math.max(8,Math.min(innerWidth-w-8,rc.left)), top=rc.bottom+6; if(top+380>innerHeight) top=Math.max(8,rc.top-386);
    if(innerWidth<640){ pop.classList.add('sheet'); } else { pop.style.left=left+'px'; pop.style.top=top+'px'; }
    setTimeout(function(){ Q.focus(); },0);
  }

  /* ================= 2. auto-suggest ================= */
  function priorHandler(r){
    var out = [];
    try{ var p = findPriorOccurrence(r); if(p && p.assignee) out.push({n:p.assignee, why:'handled this candidate before'}); }catch(e){}
    try{ var c = findPriorSameClientOccurrence(r); if(c && c.assignee) out.push({n:c.assignee, why:'handled this client before'}); }catch(e){}
    // same client + same kind of role (e.g. another Data Analyst call at this company): whoever handled the latest one
    try{
      var ph = clientPeerHistory(r);
      if(ph && r.role){
        var fam = deskRoleFamily(r.role);
        var hit = (ph.sameRole||[]).find(function(o){ return o.assignee; }) || (fam ? ph.others.find(function(o){ return o.assignee && deskRoleFamily(o.role)===fam; }) : null);
        if(hit) out.push({n:hit.assignee, why:'handled the last '+String(hit.role||r.role).slice(0,40)+' call at this client ('+(hit.date||'')+')'});
      }
    }catch(e){}
    return out;
  }
  function buildSuggestions(){
    var people = peopleList().filter(function(p){ return !isAbsentP(p); });
    var tnS = null; try{ tnS = getTeamNames(); }catch(e){}
    var ownerP = function(r){ try{ var o = window.cdOwnerOf ? window.cdOwnerOf(r) : null; return o ? o.name : ''; }catch(e){ return ''; } };
    var sim = rows().map(function(r){ var op = ownerP(r); return {id:r.id, time:r.time, duration:r.duration, assignee:(op || (tnS && tnS.has(r.assignee) ? '' : r.assignee)), woi:r.woi}; });
    var un = rows().filter(function(r){ var a = (r.assignee||'').trim(); return (!a || (tnS && tnS.has(a))) && !ownerP(r) && live(r) && bd(r.time)!==9999; }).sort(function(a,b){ return bd(a.time)-bd(b.time); });
    var out = [];
    un.forEach(function(r){
      var adv = false; try{ adv = isAdvancedRound(r.round); }catch(e){}
      var pri = priorHandler(r), best=null;
      var rowTeam = (r.assignee||'').trim(), teamOnly = !!(rowTeam && tnS && tnS.has(rowTeam));
      people.forEach(function(p){
        if(teamOnly && p.team && p.team!==rowTeam && !(adv && p.advanced)) return;
        if(overlapsFor(p.name, r, sim).length) return;
        var load = sim.filter(function(x){ return x.assignee===p.name; }).length;
        var score = -load; var why = [];
        pri.forEach(function(h){ if(h.n===p.name){ score += 60; why.push(h.why); } });
        if(adv){ if(p.advanced){ score += 15; why.push('handles 2nd round+'); } else score -= 15; }
        if(!why.length) why.push('free then, fewest calls ('+load+')');
        if(!best || score>best.score) best = {p:p, score:score, why:why.join(' · ')};
      });
      if(best){ out.push({r:r, name:best.p.name, why:best.why}); var s = sim.find(function(x){ return x.id===r.id; }); if(s) s.assignee = best.p.name; }
      else out.push({r:r, name:'', why:'nobody is free at this time'});
    });
    return out;
  }
  var sugEl = null;
  function openSuggest(){
    closeSuggest();
    var items = buildSuggestions();
    sugEl = document.createElement('div'); sugEl.id='d3Suggest'; sugEl.className='d3-overlay';
    var body = items.length ? items.map(function(x,i){
      return '<label class="d3-sug'+(x.name?'':' none')+'"><input type="checkbox" data-i="'+i+'" '+(x.name?'checked':'disabled')+'><span class="d3-sug-t">'+esc(x.r.time||'?')+'</span><span class="d3-sug-c"><b>'+esc(x.r.candidate||'(no name)')+'</b><small>'+esc(x.r.company||'')+'</small></span><span class="d3-sug-a">'+(x.name?'→ <b>'+esc(x.name)+'</b>':'<em>no one free</em>')+'<small>'+esc(x.why)+'</small></span></label>';
    }).join('') : '<div class="d2-empty" style="margin:24px"><h3>Nothing to suggest</h3><p>Every live call already has an owner.</p></div>';
    sugEl.innerHTML = '<div class="d3-card"><div class="d2-tl-h"><b>Suggested assignments</b><span class="d2-quiet">Review, untick any you don’t want, then apply. Nothing is saved until you press Save.</span><button class="d2-x" data-d3="sug-close">✕</button></div><div class="d3-list">'+body+'</div>'+(items.length?'<div class="d2-ho-btns"><button class="btn ghost" data-d3="sug-none">Untick all</button><button class="btn primary" data-d3="sug-apply">Apply selected</button></div>':'')+'</div>';
    document.body.appendChild(sugEl); document.body.classList.add('d2-lock');
    sugEl._items = items;
  }
  window.d3OpenSuggest = function(){ openSuggest(); };
  function closeSuggest(){ if(sugEl){ sugEl.remove(); sugEl=null; } if(!$('#d2Timeline,#d2Handover')) document.body.classList.remove('d2-lock'); }
  function applySuggest(){
    var items = sugEl._items, n=0;
    $$('input[type=checkbox]:checked', sugEl).forEach(function(cb){ var x = items[+cb.dataset.i]; if(x && x.name){ var r = rows().find(function(q){ return q.id===x.r.id; }); if(r){ r.assignee = x.name; n++; } } });
    closeSuggest(); if(n){ markDirty(); render(); toast('Applied '+n+' suggested assignment'+(n>1?'s':''),{ms:3500}); }
  }

  /* ================= strip extras: conflicts, late night, stale sync, views, favourites ================= */
  var views = jparse(LS.get('d3.views','[]'),[]), favs = jparse(LS.get('d3.favs','[]'),[]);
  function saveViews(){ LS.set('d3.views', JSON.stringify(views)); }
  function saveFavs(){ LS.set('d3.favs', JSON.stringify(favs)); }
  function lateNight(){
    var late = rows().filter(function(r){ var b=bd(r.time); return !r.woi && b!==9999 && b>=720 && b<1080; }); // 12:00 AM – 6:00 AM
    var hs = {}; late.forEach(function(r){ if(r.assignee) hs[r.assignee]=1; });
    var n = Object.keys(hs).length;
    return {calls:late.length, handlers:n, ratio: n? late.length/n : late.length};
  }
  function syncAge(){
    var at = state.portalSyncUpdatedAt; if(!at) return null;
    return Math.round((Date.now()-at)/60000);
  }
  function extrasHtml(){
    var chips = [], pairs = conflictPairs();
    chips.push('<button class="d3-chip'+(pairs.length?' bad':' ok')+'" data-d3="conf">'+(pairs.length?'⚠ '+pairs.length+' conflict'+(pairs.length>1?'s':''):'✓ No conflicts')+'</button>');
    var ln = lateNight();
    if(ln.calls){ var cls = ln.ratio>3||!ln.handlers ? 'bad' : ln.ratio>2 ? 'warn' : 'ok'; chips.push('<span class="d3-chip '+cls+'" title="Calls between 12 AM and 6 AM versus handlers covering them">🌙 Late night: '+ln.calls+' calls · '+ln.handlers+' handler'+(ln.handlers===1?'':'s')+'<i class="d3-meter"><b style="width:'+Math.min(100,Math.round(ln.ratio/4*100))+'%"></b></i></span>'); }
    var age = syncAge();
    if(typeof fetchPortalSync==='function'){
      if(age===null) chips.push('<button class="d3-chip warn" data-d3="sync">📡 Portal not synced · tap to sync</button>');
      else if(age>30) chips.push('<button class="d3-chip warn" data-d3="sync">📡 Portal synced '+(age>=60?Math.floor(age/60)+'h '+(age%60)+'m':age+'m')+' ago · tap to refresh</button>');
      else chips.push('<span class="d3-chip ok">📡 Portal synced '+age+'m ago</span>');
    }
    var viewsHtml = '<label class="d2-tool d2-sel" title="Saved views">'+ico('views')+'<select id="d3Views"><option value="">Views…</option>'+views.map(function(v,i){ return '<option value="'+i+'">'+esc(v.name)+'</option>'; }).join('')+'<option value="__save">＋ Save current view…</option>'+(views.length?'<option value="__del">🗑 Delete a view…</option>':'')+'</select></label>';
    var tools = '<button class="d2-tool" data-d3="suggest" title="Suggest handlers for every unassigned call">'+ico('wand')+'<span>Suggest</span></button>'
      +viewsHtml
      +'<button class="d2-tool" data-d3="cols" title="Choose table columns">'+ico('cols')+'<span>Columns</span></button>'
      +'<button class="d2-tool" data-d3="night" title="Night theme">'+ico('moon')+'<span>'+(nightOn()?'Night on':'Night')+'</span></button>'
      +'<button class="d2-tool" data-d3="print" title="Printable day sheet">'+ico('print')+'<span>Print sheet</span></button>'
      +'<button class="d2-tool" data-d3="keys" title="Keyboard shortcuts (?)">'+ico('keys')+'<span>Shortcuts</span></button>';
    var favRow = '<div class="d3-favs">'+ico('star')+(favs.length?favs.map(function(f,i){ var on = (f.t==='h' && state.assigneeFilter===f.v) || (f.t==='c' && state.clientFilter===f.v); return '<button class="d3-fav'+(on?' on':'')+'" data-d3-fav="'+i+'" title="'+(on?'Click to clear':'Filter to '+esc(f.v))+'">'+(f.t==='c'?'🏢 ':'👤 ')+esc(f.v)+'<span class="d3-fav-x" data-d3-favx="'+i+'" title="Unpin">×</span></button>'; }).join(''):'<span class="d2-quiet">Pin handlers or clients you filter by often</span>')+'<button class="d3-fav add" data-d3="favadd">＋ Pin</button></div>';
    return '<div class="d3-extras" id="d3Extras"><div class="d3-chips">'+chips.join('')+'</div><div class="d3-tools">'+tools+'</div>'+favRow+'<div id="d3ConfBox"></div></div>';
  }
  function mountExtras(){
    var old = $('#d3Extras'); var wasConf = old && $('#d3ConfBox .d3-conf', old) ? true : false; if(old) old.remove();
    var strip = $('#d2Strip'); if(!strip || state.needsLogin) return;
    var t = document.createElement('div'); t.innerHTML = extrasHtml(); var el = t.firstChild; strip.appendChild(el);
    if(wasConf || confOpen) renderConf();
  }
  var confOpen = false;
  function renderConf(){
    var box = $('#d3ConfBox'); if(!box) return;
    var pairs = conflictPairs();
    if(!confOpen){ box.innerHTML=''; return; }
    box.innerHTML = '<div class="d3-conf">'+(pairs.length?pairs.map(function(p,i){ return '<div class="d3-conf-r"><span><b>'+esc(p.name)+'</b> is double-booked</span><span class="d3-conf-c">'+esc(p.a.time)+' '+esc(p.a.candidate||'')+' <i>↔</i> '+esc(p.b.time)+' '+esc(p.b.candidate||'')+'</span><button class="btn ghost" data-d3-fix="'+esc(p.b.id)+'">Reassign 2nd</button><button class="btn ghost" data-d3-jump="'+esc(p.a.id)+'">Show</button></div>'; }).join(''):'<div class="d2-quiet" style="padding:8px">No one is double-booked ✓</div>')+'</div>';
  }

  /* ================= views ================= */
  function currentView(){ return {view:state.view||'all', filter:state.filter||'all', assigneeFilter:state.assigneeFilter||'', clientFilter:state.clientFilter||'', roleFilter:state.roleFilter||'', teamFilter:state.teamFilter||'', group:LS.get('d2.group','off'), density:LS.get('d2.density','comfy')}; }
  function applyView(v){
    state.view=v.view; state.filter=v.filter; state.assigneeFilter=v.assigneeFilter; state.clientFilter=v.clientFilter; state.roleFilter=v.roleFilter; if('teamFilter' in state) state.teamFilter=v.teamFilter;
    LS.set('d2.group', v.group||'off'); LS.set('d2.density', v.density||'comfy'); try{ state.selectedIds.clear(); }catch(e){} render();
  }
  document.addEventListener('change', function(e){
    if(!e.target || e.target.id!=='d3Views') return;
    var v = e.target.value; e.target.value='';
    if(v==='__save'){ var n = prompt('Name this view (e.g. "Unassigned only", "Morning check"):'); if(n && n.trim()){ views.push(Object.assign({name:n.trim()}, currentView())); saveViews(); toast('Saved view “'+n.trim()+'”',{ms:2500}); render(); } }
    else if(v==='__del'){ var nm = prompt('Delete which view?\n'+views.map(function(x,i){ return (i+1)+'. '+x.name; }).join('\n')+'\n\nType its number:'); var k=parseInt(nm,10)-1; if(views[k]){ views.splice(k,1); saveViews(); render(); } }
    else if(v!==''){ var vw = views[+v]; if(vw){ applyView(vw); toast('View: '+vw.name,{ms:2000}); } }
  });

  /* ================= favourites ================= */
  function openFavPicker(anchor){
    closePop();
    var hs = peopleList().map(function(p){ return {t:'h',v:p.name,s:p.team||''}; });
    var cs = {}; rows().forEach(function(r){ if(r.company) cs[r.company]=(cs[r.company]||0)+1; });
    var cl = Object.keys(cs).sort().map(function(c){ return {t:'c',v:c,s:cs[c]+' call'+(cs[c]>1?'s':'')}; });
    var all = hs.concat(cl);
    pop = document.createElement('div'); pop.className='d2-pop';
    pop.innerHTML = '<div class="d2-pop-h"><b>Pin a favourite</b><span>Handler or client — one tap to filter</span></div><input class="d2-pop-q" placeholder="Search…"><div class="d2-pop-l"></div>';
    document.body.appendChild(pop);
    var L=$('.d2-pop-l',pop), Q=$('.d2-pop-q',pop);
    function paint(){ var q=Q.value.trim().toLowerCase(); L.innerHTML = all.filter(function(x){ return !q||x.v.toLowerCase().indexOf(q)>=0; }).slice(0,60).map(function(x,i){ var done = favs.some(function(f){ return f.t===x.t&&f.v===x.v; }); return '<button class="d2-pop-i" data-k="'+esc(x.t+'|'+x.v)+'"'+(done?' disabled style="opacity:.45"':'')+'><span class="d2-av'+(x.t==='c'?' team':'')+'">'+(x.t==='c'?'🏢':esc(x.v.charAt(0).toUpperCase()))+'</span><span class="d2-pop-n">'+esc(x.v)+'<small>'+esc(x.s)+'</small></span><span class="d2-pop-m">'+(x.t==='c'?'client':'handler')+'</span><em class="'+(done?'ok':'tm')+'">'+(done?'pinned':'pin')+'</em></button>'; }).join(''); }
    paint(); Q.oninput=paint;
    L.onclick=function(e){ var b=e.target.closest('.d2-pop-i'); if(!b||b.disabled) return; var p=b.dataset.k.split('|'); favs.push({t:p[0],v:p.slice(1).join('|')}); saveFavs(); closePop(); render(); };
    var rc=anchor.getBoundingClientRect(); var left=Math.max(8,Math.min(innerWidth-328,rc.left)), top=rc.bottom+6; if(top+380>innerHeight) top=Math.max(8,rc.top-386);
    if(innerWidth<640) pop.classList.add('sheet'); else { pop.style.left=left+'px'; pop.style.top=top+'px'; }
    setTimeout(function(){ Q.focus(); },0);
  }

  /* ================= column chooser ================= */
  var PINNED_RE = /^(|time|candidate|assigned to|actions)$/i;
  function hiddenCols(){ return jparse(LS.get('d3.cols','[]'),[]); }
  function applyCols(){
    var wrap = $('#tableScrollMain'); var st = $('#d3ColStyle'); if(!st){ st=document.createElement('style'); st.id='d3ColStyle'; document.head.appendChild(st); }
    if(!wrap){ return; }
    var hid = hiddenCols(), css = '';
    $$('thead th', wrap).forEach(function(th,i){ var name=th.textContent.trim(); if(hid.indexOf(name)>=0 && !PINNED_RE.test(name)) css += '#tableScrollMain tr:not(.d2-grp) > :nth-child('+(i+1)+'){display:none}\n'; });
    st.textContent = css;
  }
  function openColChooser(anchor){
    closePop(); var wrap=$('#tableScrollMain'); if(!wrap) return;
    var names = $$('thead th', wrap).map(function(th){ return th.textContent.trim(); }).filter(function(n){ return n && !PINNED_RE.test(n); });
    var hid = hiddenCols();
    pop = document.createElement('div'); pop.className='d2-pop d3-colpop';
    pop.innerHTML = '<div class="d2-pop-h"><b>Table columns</b><span>Untick to hide. Time, Candidate and Assigned To always stay.</span></div><div class="d2-pop-l">'+names.map(function(n){ return '<label class="d3-colrow"><input type="checkbox" data-col="'+esc(n)+'" '+(hid.indexOf(n)<0?'checked':'')+'><span>'+esc(n)+'</span></label>'; }).join('')+'</div><button class="d2-pop-un" data-d3="cols-reset" style="color:var(--text-muted)">Show all columns</button>';
    document.body.appendChild(pop);
    pop.addEventListener('change', function(e){ var c=e.target.closest('input[data-col]'); if(!c) return; var h=hiddenCols(), n=c.dataset.col, i=h.indexOf(n); if(c.checked && i>=0) h.splice(i,1); if(!c.checked && i<0) h.push(n); LS.set('d3.cols', JSON.stringify(h)); applyCols(); try{ window.render(); }catch(x){} });
    var rc=anchor.getBoundingClientRect(); var left=Math.max(8,Math.min(innerWidth-328,rc.left)), top=rc.bottom+6; if(top+380>innerHeight) top=Math.max(8,rc.top-386);
    if(innerWidth<640) pop.classList.add('sheet'); else { pop.style.left=left+'px'; pop.style.top=top+'px'; }
  }

  /* ================= night theme ================= */
  function nightOn(){ return LS.get('d3.night','0')==='1'; }
  function applyNight(){ document.documentElement.toggleAttribute('data-night', nightOn()); }

  /* ================= keyboard map ================= */
  var keysEl=null;
  function openKeys(){
    if(keysEl) return closeKeys();
    var G = [
      ['Navigate',[['1 – 5','Switch tabs'],['Alt + K','Command bar'],['Ctrl + K','Quick search'],['?','This shortcut map']]],
      ['Desk tools',[['T','Open Tools'],['F','Feedback import'],['N','Prep the next call'],['/','Quick search'],['Esc','Close any sheet']]],
      ['Work',[['Alt + T','Timeline'],['Alt + H','Shift handover'],['Alt + S','Suggest assignments'],['Alt + P','Print day sheet'],['Alt + Z','Undo last change'],['Ctrl + S','Save changes']]],
      ['Call list',[['J / K','Move down / up the list'],['Enter','Open call card'],['A','Pick who takes it'],['C','Mark confirmed'],['R','Reschedule helper'],['X','Tick the row (bulk)'],['Ctrl/Shift + click','Select several calls'],['Ctrl + A','Select all shown'],['D','Details dock on / off'],['Alt + ← / →','Previous / next day'],['Alt + V','Clipboard history']]],
      ['Import',[['Alt + N','Import new calls'],['Alt + R','Import reschedules'],['Alt + A','Add assessments'],['Alt + O','Onsite interviews']]]
    ];
    keysEl = document.createElement('div'); keysEl.id='d3Keys'; keysEl.className='d3-overlay';
    keysEl.innerHTML = '<div class="d3-card d3-keys"><div class="d2-tl-h"><b>Keyboard shortcuts</b><button class="d2-x" data-d3="keys-close">✕</button></div><div class="d3-keys-g">'+G.map(function(g){ return '<section><h4>'+g[0]+'</h4>'+g[1].map(function(k){ return '<div class="d3-k"><span>'+k[1]+'</span><kbd>'+k[0]+'</kbd></div>'; }).join('')+'</section>'; }).join('')+'</div></div>';
    document.body.appendChild(keysEl); keysEl.addEventListener('mousedown', function(e){ if(e.target===keysEl) closeKeys(); });
  }
  function closeKeys(){ if(keysEl){ keysEl.remove(); keysEl=null; } }

  /* ================= print sheet ================= */
  function printSheet(){
    var t = teamSet(), by = {}, order = [];
    rows().slice().sort(function(a,b){ return bd(a.time)-bd(b.time); }).forEach(function(r){ var k = r.woi ? 'Waiting for invite' : (r.assignee||'Unassigned'); if(!by[k]){ by[k]=[]; order.push(k); } by[k].push(r); });
    order.sort(function(a,b){ if(a==='Unassigned') return -1; if(b==='Unassigned') return 1; return a.localeCompare(b); });
    var html = '<!doctype html><meta charset="utf-8"><title>Day sheet '+esc(state.date)+'</title><style>body{font:12px/1.4 system-ui,Arial;margin:22px;color:#111}h1{font-size:18px;margin:0 0 2px}p{margin:0 0 14px;color:#555}h2{font-size:13px;margin:16px 0 4px;padding:4px 8px;background:#eee;border-left:4px solid #0c8f7f;display:flex;justify-content:space-between}table{width:100%;border-collapse:collapse}td{padding:3px 6px;border-bottom:1px solid #ddd;vertical-align:top}td:first-child{width:70px;font-family:ui-monospace,monospace;white-space:nowrap}.un{background:#fdeaea}@media print{h2{break-after:avoid}tr{break-inside:avoid}}</style><h1>Coverage Desk — '+esc(state.date)+'</h1><p>'+rows().length+' calls · printed '+new Date().toLocaleString()+'</p>';
    order.forEach(function(k){ html += '<h2 class="'+(k==='Unassigned'?'un':'')+'"><span>'+esc(k)+'</span><span>'+by[k].length+' call'+(by[k].length>1?'s':'')+'</span></h2><table>'+by[k].map(function(r){ return '<tr><td>'+esc(r.time||'—')+'</td><td><b>'+esc(r.candidate||'')+'</b></td><td>'+esc(r.company||'')+'</td><td>'+esc(r.role||'')+'</td><td>'+esc(r.round||'')+'</td><td>'+esc(r.duration||'')+'</td><td>'+esc(r.country||'')+'</td></tr>'; }).join('')+'</table>'; });
    var w = window.open('','_blank'); if(!w){ toast('Allow pop-ups to print the sheet',{ms:3500}); return; }
    w.document.write(html); w.document.close(); setTimeout(function(){ try{ w.focus(); w.print(); }catch(e){} }, 300);
  }

  /* ================= celebration when everything is covered ================= */
  setTimeout(function(){ try{ window.d3Confetti = confetti; }catch(e){} },0);
  var prevUn = null, prevDate = null;
  function confetti(){
    var c = document.createElement('canvas'); c.id='d3Confetti'; c.width=innerWidth; c.height=innerHeight; document.body.appendChild(c);
    var ctx = c.getContext('2d'), cols=['#2dd4bf','#60a5fa','#f59e0b','#a78bfa','#f87171','#34d399'], ps=[];
    for(var i=0;i<140;i++) ps.push({x:innerWidth/2+(Math.random()-.5)*200,y:innerHeight*0.7,vx:(Math.random()-.5)*16,vy:-Math.random()*17-6,s:5+Math.random()*6,c:cols[i%cols.length],r:Math.random()*6,vr:(Math.random()-.5)*.4});
    var t0=performance.now();
    (function f(t){ var dt=t-t0; ctx.clearRect(0,0,c.width,c.height); ps.forEach(function(p){ p.vy+=.45; p.x+=p.vx; p.y+=p.vy; p.vx*=.992; p.r+=p.vr; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r); ctx.fillStyle=p.c; ctx.globalAlpha=Math.max(0,1-dt/2200); ctx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6); ctx.restore(); }); if(dt<2300) requestAnimationFrame(f); else c.remove(); })(t0);
  }
  function checkCelebrate(){
    var live1 = rows().filter(function(r){ return live(r) && !r.assignee; }).length;
    if(prevDate===state.date && prevUn!==null && prevUn>0 && live1===0 && rows().length>3 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){ confetti(); toast('Every call is covered 🎉',{ms:4000}); }
    prevUn = live1; prevDate = state.date;
  }

  /* ================= candidate hover card ================= */
  var hoverT = null, hcEl = null;
  function closeCard(){ clearTimeout(hoverT); if(hcEl){ hcEl.remove(); hcEl=null; } }
  function showCard(td, id){
    var r = rows().find(function(x){ return x.id===id; }); if(!r) return;
    var rc = td.getBoundingClientRect();
    hcEl = document.createElement('div'); hcEl.className='d3-hc';
    var as=[], os=[]; try{ as = assessmentsForCandidate(r.candidate, r.company)||[]; }catch(e){} try{ os = onsitesForCandidate(r.candidate, r.company)||[]; }catch(e){}
    hcEl.innerHTML = '<div class="d3-hc-h"><span class="d2-av">'+esc((r.candidate||'?').charAt(0).toUpperCase())+'</span><div><b>'+esc(r.candidate||'')+'</b><small>'+esc(r.company||'')+(r.role?' · '+esc(r.role):'')+'</small></div></div>'
      +'<div class="d3-hc-g"><span>Today</span><b>'+esc(r.time||'?')+' · '+esc(r.round||'')+' · '+esc(r.assignee||'unassigned')+'</b></div>'
      +(as.length?'<div class="d3-hc-g"><span>Assessments</span><b>'+as.length+' — '+esc(as.slice(0,2).map(function(a){ return a.date+(a.assessment?' ('+a.assessment+')':''); }).join(', '))+'</b></div>':'')
      +(os.length?'<div class="d3-hc-g"><span>Onsites</span><b>'+os.length+' — '+esc(os.slice(0,2).map(function(o){ return o.date+(o.location?' @ '+o.location:''); }).join(', '))+'</b></div>':'')
      +'<div class="d3-hc-hist"><span>History</span><div class="d3-hc-load">Loading earlier calls…</div></div>';
    document.body.appendChild(hcEl);
    var w=300, left=Math.max(8,Math.min(innerWidth-w-8, rc.left)), top=rc.bottom+6; if(top+230>innerHeight) top=Math.max(8,rc.top-236);
    hcEl.style.left=left+'px'; hcEl.style.top=top+'px';
    if(typeof fetchAllRowsAcrossDates==='function'){
      var key=''; try{ key = normalizeNameKey(r.candidate); }catch(e){ key=String(r.candidate||'').toLowerCase(); }
      fetchAllRowsAcrossDates(false).then(function(all){
        if(!hcEl) return; var box = $('.d3-hc-load', hcEl); if(!box) return;
        var h = (all||[]).filter(function(x){ var k2=''; try{ k2=normalizeNameKey(x.candidate); }catch(e){ k2=String(x.candidate||'').toLowerCase(); } return k2===key && !(x._date===state.date && x.time===r.time && x.company===r.company); }).sort(function(a,b){ return String(b._date).localeCompare(String(a._date)); }).slice(0,5);
        box.innerHTML = h.length ? h.map(function(x){ return '<div class="d3-hc-r"><span>'+esc(x._date||'')+'</span><span>'+esc(x.round||'')+'</span><span>'+esc(x.company||'')+'</span><b>'+esc(x.assignee||'—')+'</b></div>'; }).join('') : '<span class="d2-quiet">No earlier calls on file</span>';
      }).catch(function(){ var box=$('.d3-hc-load',hcEl); if(box) box.textContent='History unavailable'; });
    }
  }
  document.addEventListener('mouseover', function(e){
    var td = e.target.closest && e.target.closest('td[data-label="Candidate"]');
    if(!td){ if(hcEl && !e.target.closest('.d3-hc')) closeCard(); return; }
    return; /* d20 popup is the single candidate hover popup now */
    var tr = td.closest('tr[data-id]'); if(!tr) return;
    clearTimeout(hoverT); hoverT = setTimeout(function(){ showCard(td, tr.dataset.id); }, 550);
  });
  document.addEventListener('mouseout', function(e){ var td=e.target.closest&&e.target.closest('td[data-label="Candidate"]'); if(td){ clearTimeout(hoverT); setTimeout(function(){ if(hcEl && !hcEl.matches(':hover')) closeCard(); },180); } });
  document.addEventListener('scroll', closeCard, true);

  /* ================= drag a row onto a team ================= */
  function decorateDrag(){
    $$('#tableScrollMain tbody tr[data-id] td.select-cell').forEach(function(td){
      if($('.d3-grip', td)) return; var g=document.createElement('span'); g.className='d3-grip'; g.draggable=isAdmin(); g.title='Drag onto a team chip (HYD Team, Pradeep Anna Team…) to assign'; g.textContent='⋮⋮'; td.appendChild(g);
    });
  }
  document.addEventListener('dragstart', function(e){
    var g = e.target.closest && e.target.closest('.d3-grip'); if(!g) return;
    var tr = g.closest('tr[data-id]'); e.dataTransfer.setData('text/d3row', tr.dataset.id); e.dataTransfer.effectAllowed='move'; tr.classList.add('d3-dragging'); document.body.classList.add('d3-dragmode');
  });
  document.addEventListener('dragend', function(){ document.body.classList.remove('d3-dragmode'); $$('.d3-dragging,.d3-droptarget').forEach(function(x){ x.classList.remove('d3-dragging','d3-droptarget'); }); });
  document.addEventListener('dragover', function(e){ var c=e.target.closest&&e.target.closest('.team-load-cell[data-team]'); if(!c || !e.dataTransfer.types.includes('text/d3row')) return; e.preventDefault(); $$('.d3-droptarget').forEach(function(x){ if(x!==c) x.classList.remove('d3-droptarget'); }); c.classList.add('d3-droptarget'); });
  document.addEventListener('drop', function(e){
    var c=e.target.closest&&e.target.closest('.team-load-cell[data-team]'); if(!c) return; var id=e.dataTransfer.getData('text/d3row'); if(!id) return; e.preventDefault();
    var r=rows().find(function(x){ return x.id===id; }); if(!r) return; r.assignee=c.dataset.team; r.woi=false; markDirty(); render(); toast('Assigned '+(r.candidate||'call')+' to '+c.dataset.team,{ms:3000});
  });

  /* ================= events ================= */
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('#d3BulkPick'); if(b){ openBulkPop(b); return; }
    var fx = e.target.closest && e.target.closest('[data-d3-favx]'); if(fx){ e.stopPropagation(); favs.splice(+fx.dataset.d3Favx,1); saveFavs(); render(); return; }
    var fv = e.target.closest && e.target.closest('[data-d3-fav]'); if(fv){ var f=favs[+fv.dataset.d3Fav]; if(f){ if(f.t==='h') state.assigneeFilter = state.assigneeFilter===f.v?'':f.v; else state.clientFilter = state.clientFilter===f.v?'':f.v; render(); } return; }
    var fix = e.target.closest && e.target.closest('[data-d3-fix]'); if(fix){ var r=rows().find(function(x){ return x.id===fix.dataset.d3Fix; }); if(r){ r.assignee=''; markDirty(); render(); var sel=$('tr[data-id="'+r.id+'"] select[data-field="assignee"]'); setTimeout(function(){ var s2=$('tr[data-id="'+r.id+'"] select[data-field="assignee"]'); if(s2){ s2.scrollIntoView({block:'center'}); s2.dispatchEvent(new MouseEvent('mousedown',{bubbles:true,cancelable:true})); } },80); } return; }
    var jp = e.target.closest && e.target.closest('[data-d3-jump]'); if(jp){ var tr=$('tr[data-id="'+jp.dataset.d3Jump+'"]'); if(tr){ tr.scrollIntoView({behavior:'smooth',block:'center'}); tr.classList.remove('d2-flash'); void tr.offsetWidth; tr.classList.add('d2-flash'); } return; }
    var t = e.target.closest && e.target.closest('[data-d3]'); if(!t){ if(pop && !e.target.closest('.d2-pop')) closePop(); return; }
    switch(t.dataset.d3){
      case 'suggest': openSuggest(); break;
      case 'sug-close': closeSuggest(); break;
      case 'sug-none': $$('input[type=checkbox]',sugEl).forEach(function(c){ c.checked=false; }); break;
      case 'sug-apply': applySuggest(); break;
      case 'conf': confOpen=!confOpen; renderConf(); break;
      case 'sync': if(typeof fetchPortalSync==='function'){ fetchPortalSync('today'); toast('Syncing Portal…',{ms:2500}); } break;
      case 'cols': openColChooser(t); break;
      case 'cols-reset': LS.set('d3.cols','[]'); closePop(); applyCols(); render(); break;
      case 'night': LS.set('d3.night', nightOn()?'0':'1'); applyNight(); render(); break;
      case 'print': printSheet(); break;
      case 'keys': openKeys(); break;
      case 'keys-close': closeKeys(); break;
      case 'favadd': openFavPicker(t); break;
    }
  });
  document.addEventListener('keydown', function(e){
    var typing = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable;
    if(e.key==='Escape'){ if(sugEl) return closeSuggest(); if(keysEl) return closeKeys(); if(pop) return closePop(); closeCard(); }
    if(e.key==='?' && !typing && !e.ctrlKey && !e.metaKey){ e.preventDefault(); openKeys(); }
    if(e.altKey && !e.ctrlKey && !e.metaKey){ var k=e.key.toLowerCase(); if(k==='s'){ e.preventDefault(); openSuggest(); } else if(k==='p'){ e.preventDefault(); printSheet(); } }
  });

  /* ================= command bar hook ================= */
  window.d2ExtraCmds = function(){ return [
    ['suggest','Suggest assignments','Fill unassigned calls',openSuggest,'✨'],
    ['print sheet','Print day sheet','One page by handler',printSheet,'🖨'],
    ['shortcuts keys help','Keyboard shortcuts','?',openKeys,'⌨'],
    ['night theme','Toggle night theme','',function(){ LS.set('d3.night', nightOn()?'0':'1'); applyNight(); render(); },'🌙'],
    ['conflicts','Show conflicts','Double-booked handlers',function(){ confOpen=true; renderConf(); var b=$('#d3ConfBox'); if(b) b.scrollIntoView({behavior:'smooth',block:'center'}); },'⚠'],
    ['columns','Choose table columns','',function(){ var b=$('[data-d3=cols]'); if(b) openColChooser(b); },'▥'],
    ['sync portal','Sync Portal now','',function(){ if(typeof fetchPortalSync==='function') fetchPortalSync('today'); },'📡']
  ].concat(views.map(function(v){ return ['view '+v.name.toLowerCase(),'View: '+v.name,'Saved view',function(){ applyView(v); },'👁']; })); };

  /* ================= pipeline ================= */
  function decorate(){
    try{ applyNight(); }catch(e){}
    try{ decorateBulk(); }catch(e){}
    try{ mountExtras(); }catch(e){ console.warn('d3 extras',e); }
    try{ applyCols(); }catch(e){}
    try{ decorateDrag(); }catch(e){}
    try{ checkCelebrate(); }catch(e){}
  }
  function install(){
    if(typeof window.render!=='function' || !window.__desk2){ return setTimeout(install,60); }
    var orig = window.render;
    window.render = function(){ var r = orig.apply(this, arguments); try{ decorate(); }catch(e){ console.warn('d3',e); } return r; };
    try{ applyNight(); decorate(); }catch(e){}
  }
  setInterval(function(){ var c=$('#d3Extras .d3-chips'); if(c && !confOpen){ try{ var tmp=document.createElement('div'); tmp.innerHTML=extrasHtml(); var nc=$('.d3-chips',tmp); if(nc) c.innerHTML=nc.innerHTML; }catch(e){} } }, 60000);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

;
/* ===== desk4.js ===== */
/* desk4.js — tidy-up layer (loaded last).
   Turns the long stack of banners, strips and bars into: a one-line info row (Briefing / Tomorrow /
   Shift note / Coverage chart open on demand), one compact action bar (3 main buttons + "More" menu +
   only-problems chips), collapsible Filters, three layout presets (Focus / Compact / Full) and a slim
   sticky bar that appears once you scroll into the table.  Reuses every existing control (clones carry
   the same data-attributes, so the original handlers keep working). */
(function(){
  'use strict';
  if(window.__desk4) return; window.__desk4 = true;
  var LS = {
    get:function(k,d){ try{ var v=localStorage.getItem(k); return v===null?d:v; }catch(e){ return d; } },
    set:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} }
  };
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var rows = function(){ try{ return state.rows||[]; }catch(e){ return []; } };
  var jparse = function(s,d){ try{ var v=JSON.parse(s); return v==null?d:v; }catch(e){ return d; } };
  var mode = function(){ var v = LS.get('d4.layout',''); return (v==='focus'||v==='compact'||v==='full'||v==='auto') ? v : ''; };
  var roleDefault = function(){ if(window.__d17vw<900) return 'focus'; try{ return CURRENT_ROLE==='admin' ? 'compact' : 'focus'; }catch(e){ return 'compact'; } };
  var toMin = function(t){ var p=String(t||'').trim().split(':'); var h=parseInt(p[0],10), m=parseInt(p[1]||'0',10); return (isNaN(h)||isNaN(m)) ? null : (h*60+m)%1440; };
  var autoCfg = function(){ var a = LS.get('d4.auto','12:00,14:30,05:00').split(','); var d=[720,870,300]; return [0,1,2].map(function(i){ var v=toMin(a[i]); return v===null?d[i]:v; }); };
  var inWin = function(n,a,b){ return a<=b ? (n>=a && n<b) : (n>=a || n<b); };
  var autoLayout = function(){ var c=autoCfg(), d=new Date(), n=d.getHours()*60+d.getMinutes(); if(inWin(n,c[0],c[1])) return 'full'; if(inWin(n,c[1],c[2])) return 'focus'; return 'compact'; };
  var layout = function(){ var m = mode(); if(m==='auto') return autoLayout(); if(m) return m; return roleDefault(); };
  var openSecs = jparse(LS.get('d4.open','{}'),{});
  var filtersOpen = false, organizing = false;

  var SVG = function(p){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>'; };
  var IC = {
    brief:SVG('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M8.5 11h7M8.5 15h5"/>'),
    cal:SVG('<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>'),
    note:SVG('<path d="M5 20h4l10-10-4-4L5 16v4Z"/><path d="m13.5 7.5 4 4"/>'),
    chart:SVG('<path d="M5 20V10M12 20V4M19 20v-7"/>'),
    more:SVG('<circle cx="6" cy="12" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="18" cy="12" r="1.4"/>'),
    filt:SVG('<path d="M4 6h16l-6 7v5l-4 2v-7L4 6Z"/>'),
    focus:SVG('<circle cx="12" cy="12" r="3"/><path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4"/>'),
    comp:SVG('<rect x="4" y="5" width="16" height="5" rx="1.5"/><rect x="4" y="13" width="16" height="6" rx="1.5"/>'),
    full:SVG('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>'),
    auto:SVG('<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>'),
    gear:SVG('<circle cx="12" cy="12" r="2.6"/><path d="M12 4v2M12 18v2M4 12h2M18 12h2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4"/>')
  };

  function setLayout(v){ LS.set('d4.layout', v); apply(); organize(true); }
  var lastEff = null;
  function apply(){ document.documentElement.setAttribute('data-d4', layout()); }

  /* ---------- locate the app's own sections ---------- */
  function findSections(){
    var hints = $$('#app .hint');
    var by = function(re){ return hints.find(function(h){ return !h.classList.contains('keyboard-hint') && re.test(h.textContent); }); };
    return {
      brief: by(/briefing/i),
      tomorrow: by(/tomorrow/i),
      note: $('#app .shift-note-box'),
      chart: $('#app .strip-wrap')
    };
  }
  function tomorrowLabel(el){
    if(!el) return '';
    var m = el.textContent.match(/(\d+)\s*scheduled/i); return m ? m[1] : '';
  }

  /* ---------- info row + drawer ---------- */
  function buildInfo(){
    var app = $('#app'); if(!app || (state && state.needsLogin)) return;
    var sec = findSections();
    var old = $('#d4Info'); if(old) old.remove(); var oldD = $('#d4Drawer'); if(oldD) oldD.remove();
    var header = $('#app .header'); if(!header) return;
    var full = layout()==='full';
    var defs = [
      {k:'brief', ic:IC.brief, label:'Briefing', el:sec.brief, dot:true},
      {k:'tomorrow', ic:IC.cal, label:'Tomorrow'+(tomorrowLabel(sec.tomorrow)?' · '+tomorrowLabel(sec.tomorrow):''), el:sec.tomorrow},
      {k:'note', ic:IC.note, label:'Shift note', el:sec.note, dot: !!(state.shiftNote && String(state.shiftNote).trim())},
      {k:'chart', ic:IC.chart, label:'Coverage chart', el:sec.chart}
    ];
    var info = document.createElement('div'); info.id='d4Info';
    var chips = defs.filter(function(d){ return d.el; }).map(function(d){
      var on = full || openSecs[d.k];
      return '<button class="d4-chip'+(on?' on':'')+'" data-d4="sec" data-k="'+d.k+'" aria-pressed="'+(on?'true':'false')+'"><i>'+d.ic+'</i><span>'+esc(d.label)+'</span>'+(d.dot&&!on?'<em class="d4-dot"></em>':'')+'</button>';
    }).join('');
    var md = mode(), effMode = md || layout();
    var lay = [['auto','Auto',IC.auto,'Full when planning, Focus when busy, Compact otherwise (now: '+layout()+')'],['focus','Focus',IC.focus,'Just the calls'],['compact','Compact',IC.comp,'Tidy default'],['full','Full',IC.full,'Everything open']].map(function(x){
      return '<button class="d4-seg'+(effMode===x[0]?' on':'')+'" data-d4="layout" data-v="'+x[0]+'" title="'+x[3]+'"><i>'+x[2]+'</i><span>'+x[1]+'</span></button>';
    }).join('') + (md==='auto' ? '<button class="d4-seg d4-gear" data-d4="autocfg" title="Set the Auto times"><i>'+IC.gear+'</i></button>' : '');
    info.innerHTML = '<div class="d4-chips">'+chips+'</div><div class="d4-layout" role="group" aria-label="Layout">'+lay+'</div>';
    header.parentNode.insertBefore(info, header.nextSibling);
    var drawer = document.createElement('div'); drawer.id='d4Drawer';
    defs.forEach(function(d){
      if(!d.el) return;
      var on = full || openSecs[d.k];
      d.el.classList.add('d4-sec'); d.el.classList.toggle('d4-sec-open', !!on);
      if(on) drawer.appendChild(d.el);
    });
    info.parentNode.insertBefore(drawer, info.nextSibling);
    if(!drawer.children.length) drawer.style.display='none';
  }

  /* ---------- action bar ---------- */
  var PRIMARY = ['timeline','suggest','handover'];
  function toolKey(el){ return el.getAttribute('data-d2') || el.getAttribute('data-d3') || (el.querySelector('select') && el.querySelector('select').id) || ''; }
  function buildBar(){
    var strip = $('#d2Strip'); var old = $('#d4Bar'); if(old) old.remove(); var oc = $('#d4Conf'); if(oc) oc.remove();
    if(!strip) return;
    var tools = $$('#d2Strip .d2-tools > *, #d2Strip .d3-tools > *');
    var prim = [], menu = [];
    tools.forEach(function(t){ var k = toolKey(t); (PRIMARY.indexOf(k)>=0 ? prim : menu).push(t); });
    prim.sort(function(a,b){ return PRIMARY.indexOf(toolKey(a))-PRIMARY.indexOf(toolKey(b)); });
    var bar = document.createElement('div'); bar.id='d4Bar';
    var left = document.createElement('div'); left.className='d4-bar-l';
    prim.forEach(function(t){ var c=t.cloneNode(true); c.classList.add('d4-prim'); left.appendChild(c); });
    var more = document.createElement('button'); more.className='d2-tool d4-more'; more.setAttribute('data-d4','more'); more.setAttribute('aria-haspopup','menu'); more.innerHTML='<i class="d3-ic">'+IC.more+'</i><span>More</span>'; left.appendChild(more);
    bar.appendChild(left);
    var right = document.createElement('div'); right.className='d4-bar-r';
    var chips = $$('#d2Strip .d3-chips > *').filter(function(c){ return !c.classList.contains('ok'); });
    if(chips.length) chips.forEach(function(c){ right.appendChild(c.cloneNode(true)); });
    else { var ok=document.createElement('span'); ok.className='d3-chip ok'; ok.textContent='✓ All clear'; right.appendChild(ok); }
    $$('#d2Strip .d3-fav:not(.add)').forEach(function(f){ right.appendChild(f.cloneNode(true)); });
    bar.appendChild(right);
    var top = $('#d2Strip .d2-strip-top'); (top ? top : strip).insertAdjacentElement(top?'afterend':'afterbegin', bar);
    bar._menu = menu;
    var box = $('#d3ConfBox'); if(box && box.innerHTML.trim()){ var h=document.createElement('div'); h.id='d4Conf'; h.innerHTML = box.innerHTML; bar.insertAdjacentElement('afterend', h); }
  }

  var menuEl = null;
  function closeMenu(){ if(menuEl){ menuEl.remove(); menuEl=null; } }
  function openMenu(btn){
    closeMenu(); var bar = $('#d4Bar'); if(!bar) return;
    menuEl = document.createElement('div'); menuEl.id='d4Menu'; menuEl.setAttribute('role','menu');
    var items = (bar._menu||[]).map(function(t){
      var c = t.cloneNode(true); c.classList.add('d4-mi');
      var s0 = $('select', t), s1 = $('select', c); if(s0 && s1){ s1.selectedIndex = s0.selectedIndex; s1.id = s0.id; }
      return c;
    });
    var sec = document.createElement('div'); sec.className='d4-menu-sec'; sec.textContent='Tools'; menuEl.appendChild(sec);
    items.forEach(function(c){ menuEl.appendChild(c); });
    // extras that live elsewhere
    var lt = $('#d2Strip .d2-loadtoggle'); var add = $('#d2Strip .d3-fav.add');
    var more = document.createElement('div'); more.className='d4-menu-sec'; more.textContent='Show'; menuEl.appendChild(more);
    if(lt){ var b=document.createElement('button'); b.className='d2-tool d4-mi'; b.setAttribute('data-d2','load'); b.innerHTML='<i class="d3-ic">'+IC.chart+'</i><span>'+esc(lt.textContent.trim())+'</span>'; menuEl.appendChild(b); }
    if(add){ var b2=document.createElement('button'); b2.className='d2-tool d4-mi'; b2.setAttribute('data-d3','favadd'); b2.innerHTML='<i class="d3-ic">'+IC.filt+'</i><span>Pin a handler or client…</span>'; menuEl.appendChild(b2); }
    document.body.appendChild(menuEl);
    var rc = btn.getBoundingClientRect(), w = 250;
    var left = Math.max(8, Math.min(innerWidth-w-8, rc.left)), top = rc.bottom+6;
    menuEl.style.left=left+'px'; menuEl.style.top=top+'px';
    var h = menuEl.offsetHeight; if(top+h>innerHeight-8){ menuEl.style.top = Math.max(8, rc.top-h-6)+'px'; }
    if(innerWidth<640) menuEl.classList.add('sheet');
  }

  /* ---------- filters fold ---------- */
  function activeFilters(){
    var n = 0;
    try{ if(state.assigneeFilter) n++; if(state.clientFilter) n++; if(state.roleFilter) n++; if(state.teamFilter) n++; if(state.filter && state.filter!=='all') n++; }catch(e){}
    return n;
  }
  function buildFilters(){
    var fb = $('#app .filter-bar'); var sr = $('#app .search-row'); if(!fb || !sr) return;
    var n = activeFilters(), open = layout()==='full' || filtersOpen || n>0;
    fb.classList.add('d4-fold'); fb.classList.toggle('d4-fold-open', open);
    var old = $('.d4-filter-btn', sr); if(old) old.remove();
    var b = document.createElement('button'); b.className='d4-filter-btn'+(open?' on':''); b.setAttribute('data-d4','filters'); b.setAttribute('aria-expanded', open?'true':'false');
    b.innerHTML = '<i>'+IC.filt+'</i><span>Filters</span>'+(n?'<b>'+n+'</b>':'');
    sr.appendChild(b);
  }

  /* ---------- sticky mini bar ---------- */
  function buildMini(){
    var m = $('#d4Mini'); if(!m){ m=document.createElement('div'); m.id='d4Mini'; document.body.appendChild(m); }
    var un = rows().filter(function(r){ return !r.woi && !r.status && !r.assignee; }).length, total = rows().length;
    var pct = total ? Math.round(rows().filter(function(r){ return !!r.assignee; }).length/total*100) : 0;
    var un2 = un;
    m.innerHTML = '<button class="d4-mini-d" data-d4="top" title="Back to top"><span class="d4-mini-ring" style="--p:'+pct+'"><b>'+pct+'</b></span><span>'+esc(state.date||'')+'</span></button>'
      +'<button class="d4-mini-un'+(un2?' bad':'')+'" data-d4="mini-un">'+(un2? un2+' unassigned':'✓ All assigned')+'</button><span class="d4-mini-sp"></span>'
      +'<button class="d2-tool" data-d2="timeline"><span>Timeline</span></button><button class="d2-tool" data-d3="suggest"><span>Suggest</span></button><button class="d2-tool" data-d2="cmd"><span>Commands</span></button>';
    updateMini();
  }
  function updateMini(){
    var m = $('#d4Mini'); if(!m) return;
    var c = $('#tableScrollMain'); var show = false;
    if(window.__d17vw>=900 && c){ show = c.getBoundingClientRect().top <= 64 && window.scrollY>200; }
    m.classList.toggle('show', show);
  }
  window.addEventListener('scroll', updateMini, {passive:true}); window.addEventListener('resize', updateMini);

  /* ---------- orchestration ---------- */
  function organize(force){
    if(organizing) return; if(!$('#app') || (state && state.needsLogin)) return;
    organizing = true;
    try{
      apply();
      buildInfo();
      buildBar();
      buildFilters();
      buildMini();
      var tsm = $('#tableScrollMain'); if(tsm && tsm.parentElement && tsm.parentElement.id!=='app') tsm.parentElement.classList.add('d4-contents');
    }catch(e){ console.warn('d4',e); }
    finally{ organizing = false; }
  }
  function needs(){ var s=$('#d2Strip'); return !!s && !s.querySelector('#d4Bar'); }
  var moT=null;
  function observe(){
    var app = $('#app'); if(!app){ return setTimeout(observe,80); }
    new MutationObserver(function(){ clearTimeout(moT); moT=setTimeout(function(){ if(organizing) return; if(needs() || !$('#d4Info')) organize(); },40); }).observe(app,{childList:true,subtree:true});
  }

  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-d4]'); if(t===document.documentElement) t=null;
    if(!t){
      if(menuEl && !e.target.closest('#d4Menu')) closeMenu();
      // original handlers (desk2/3) re-render parts of the strip; refresh clones afterwards
      if(e.target.closest && e.target.closest('#d4Bar,#d4Conf,#d4Menu')) setTimeout(function(){ if(!organizing) organize(); },30);
      return;
    }
    var a = t.dataset.d4;
    if(a==='sec'){ var k=t.dataset.k; openSecs[k]=!openSecs[k]; LS.set('d4.open', JSON.stringify(openSecs));
      // on a phone the app's own chart / note start collapsed to a thin bar — opening one from the chip should show it fully
      if(openSecs[k]){ try{ if(k==='chart' && !state.mobileStripExpanded){ state.mobileStripExpanded = true; render(); } if(k==='note' && !state.mobileNoteExpanded){ state.mobileNoteExpanded = true; render(); } }catch(e){} }
      organize(true); if(openSecs[k]){ var d=$('#d4Drawer'); if(d) d.scrollIntoView({behavior:'smooth',block:'nearest'}); } }
    else if(a==='layout'){ setLayout(t.dataset.v); }
    else if(a==='autocfg'){ var cur = LS.get('d4.auto','12:00,14:30,05:00'); var v = prompt('Auto layout times (24-hour, comma separated):\nplanning starts, busy starts, busy ends\n\nPlanning → Full · Busy → Focus · otherwise Compact', cur); if(v){ LS.set('d4.auto', v); lastEff=null; apply(); organize(true); } }
    else if(a==='more'){ menuEl ? closeMenu() : openMenu(t); }
    else if(a==='filters'){ filtersOpen = !filtersOpen; buildFilters(); }
    else if(a==='top'){ window.scrollTo({top:0,behavior:'smooth'}); }
    else if(a==='mini-un'){ try{ state.filter='unassigned'; window.scrollTo({top:0}); render(); }catch(x){} }
  });
  // menu items: close after an action (not while using a <select>)
  document.addEventListener('click', function(e){
    var it = e.target.closest && e.target.closest('#d4Menu .d4-mi'); if(!it) return;
    if(e.target.closest('select') || it.tagName==='LABEL') return;
    setTimeout(closeMenu, 0);
  });
  document.addEventListener('change', function(e){ if(e.target.closest && e.target.closest('#d4Menu')) setTimeout(function(){ closeMenu(); organize(true); },0); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeMenu(); });

  function install(){
    if(typeof window.render!=='function' || !window.__desk3){ return setTimeout(install,60); }
    var orig = window.render;
    window.render = function(){ var r = orig.apply(this, arguments); try{ organize(true); }catch(e){ console.warn('d4',e); } return r; };
    apply(); organize(true); observe();
    setInterval(function(){ if(organizing || menuEl) return; var e = layout(); if(e!==lastEff){ lastEff=e; apply(); } organize(true); }, 60000);
    lastEff = layout();
  }
  apply();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

;
/* ===== desk5.js ===== */
/* desk5.js — row side panel + one "⋯" menu per row (desktop). Loaded after desk4.
   - The 📌 🎯 📡 →2nd/→1st ✕ buttons in each row fold into a single ⋯ menu (originals stay in the DOM,
     hidden, and are clicked by the menu, so the app's own logic is untouched).
   - Click a row (anywhere that isn't a field/button) to open a side panel: details, assign, notes,
     Portal info, history.  ↑/↓ move between rows, Esc closes.  Desktop only (>= 900px). */
(function(){
  'use strict';
  if(window.__desk5) return; window.__desk5 = true;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var isAdmin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  var rows = function(){ try{ return state.rows||[]; }catch(e){ return []; } };
  var __vw = window.innerWidth; window.addEventListener('resize', function(){ __vw = window.innerWidth; }, { passive:true });
  var desktop = function(){ return __vw>=900; };
  var toast = function(m,o){ if(window.d2Toast) window.d2Toast(m,o); };
  var activeId = null;

  /* ================= ⋯ row menu ================= */
  var menu = null;
  function closeMenu(){ if(menu){ menu.remove(); menu=null; } }
  function decorateRows(){
    var wrap = $('#tableScrollMain'); if(!wrap) return;
    wrap.classList.toggle('d5-on', desktop());
    if(!desktop()) return;
    $$('tbody tr[data-id]', wrap).forEach(function(tr){
      var cell = $('td.actions-cell', tr); if(!cell) return;
      var id = tr.dataset.id, btn = $('.d5-rm', cell);
      if(!btn){ btn = document.createElement('button'); btn.className='d5-rm'; btn.type='button'; btn.title='More actions'; btn.setAttribute('aria-haspopup','menu'); btn.dataset.id=id; btn.innerHTML='<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg><i></i>'; cell.appendChild(btn); }
      var pinned = !!$('.pin-toggle.pin-toggle-filled', cell);
      var pb = $('.portal-check-btn', cell), differs = !!(pb && /amber/.test(pb.getAttribute('style')||'')) ;
      btn.classList.toggle('dot-teal', pinned && !differs); btn.classList.toggle('dot-amber', differs);
      btn.title = 'More actions' + (pinned?' · has interviewer/POC notes':'') + (differs?' · Portal differs':'');
    });
    $$('tr.d5-active', wrap).forEach(function(t){ if(t.dataset.id!==activeId) t.classList.remove('d5-active'); });
    if(activeId){ var a = $('tr[data-id="'+activeId+'"]', wrap); if(a) a.classList.add('d5-active'); }
  }
  function openMenu(btn){
    closeMenu();
    var id = btn.dataset.id, tr = btn.closest('tr'), cell = btn.closest('td');
    var pick = function(sel){ return $(sel+'[data-id="'+id+'"]', cell) || $(sel, cell); };
    var items = [];
    items.push({ic:'panel', t:'Open details panel', fn:function(){ openSide(id); }});
    var pin = $('.pin-toggle', cell); if(pin) items.push({ic:'pin', t:'Interviewer, POC & priority', fn:function(){ pin.click(); }});
    var ec = $('.expect-closure-btn', cell); if(ec) items.push({ic:'target', t:'Flag as expected closure', fn:function(){ ec.click(); }});
    var pc = $('.portal-check-btn', cell); if(pc){ var diff = /amber/.test(pc.getAttribute('style')||''); items.push({ic:'portal', t:diff?'Check Portal (differs)':'Check Portal', warn:diff, fn:function(){ pc.click(); }}); }
    var m2 = $('.move-2nd', cell), m1 = $('.move-1st', cell);
    if(m2) items.push({ic:'up', t:'Move to 2nd round & above', fn:function(){ m2.click(); }});
    if(m1) items.push({ic:'down', t:'Move to 1st round', fn:function(){ m1.click(); }});
    var del = $('.row-del', cell); if(del && isAdmin()) items.push({ic:'trash', t:'Delete call', danger:true, fn:function(){ del.click(); }});
    menu = document.createElement('div'); menu.id='d5Menu'; menu.setAttribute('role','menu');
    var ICO = {panel:'<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M14 5v14"/>',pin:'<path d="M12 17v4M8 4h8l-1 6 3 3H6l3-3-1-6Z"/>',target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/>',portal:'<path d="M5 12a7 7 0 0 1 14 0M8 12a4 4 0 0 1 8 0"/><circle cx="12" cy="12" r="1"/>',up:'<path d="M12 19V6M6.5 11.5 12 6l5.5 5.5"/>',down:'<path d="M12 5v13M6.5 12.5 12 18l5.5-5.5"/>',trash:'<path d="M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13"/>'};
    menu.innerHTML = items.map(function(it,i){ return '<button role="menuitem" class="d5-mi'+(it.danger?' danger':'')+(it.warn?' warn':'')+'" data-i="'+i+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+ICO[it.ic]+'</svg><span>'+esc(it.t)+'</span></button>'; }).join('');
    document.body.appendChild(menu);
    menu.onclick = function(e){ var b=e.target.closest('.d5-mi'); if(!b) return; var it=items[+b.dataset.i]; closeMenu(); setTimeout(function(){ try{ it.fn(); }catch(x){} },0); };
    var rc = btn.getBoundingClientRect(), w = 250;
    menu.style.left = Math.max(8, Math.min(innerWidth-w-8, rc.right-w))+'px';
    var top = rc.bottom+6, h = menu.offsetHeight; if(top+h>innerHeight-8) top = Math.max(8, rc.top-h-6); menu.style.top = top+'px';
  }

  /* ================= side panel ================= */
  var side = null, histCache = {};
  function ensureSide(){
    if(side) return side;
    side = document.createElement('aside'); side.id='d5Side'; side.setAttribute('aria-label','Call details');
    document.body.appendChild(side);
    var back = document.createElement('div'); back.id='d5Back'; document.body.appendChild(back);
    back.addEventListener('click', closeSide);
    // phone: drag the grab-bar/header down to dismiss
    var y0=null, dy=0;
    side.addEventListener('touchstart', function(e){ if(desktop()) return; if(!e.target.closest('.d5-grab,.d5-h')) return; y0=e.touches[0].clientY; dy=0; side.style.transition='none'; }, {passive:true});
    side.addEventListener('touchmove', function(e){ if(y0==null) return; dy=Math.max(0,e.touches[0].clientY-y0); side.style.transform='translateY('+dy+'px)'; }, {passive:true});
    side.addEventListener('touchend', function(){ if(y0==null) return; y0=null; side.style.transition=''; side.style.transform=''; if(dy>90) closeSide(); });
    side.addEventListener('input', function(e){
      var f = e.target.closest('[data-f]'); if(!f || !isAdmin()) return; var r = row(activeId); if(!r) return;
      if(f.type==='checkbox') r[f.dataset.f] = f.checked; else r[f.dataset.f] = f.value;
      try{ markDirty(); }catch(x){}
    });
    return side;
  }
  function row(id){ return rows().find(function(r){ return r.id===id; }); }
  function visibleIds(){ return $$('#tableScrollMain tbody tr[data-id]').filter(function(t){ return !t.classList.contains('d2-hidden') && t.offsetParent!==null; }).map(function(t){ return t.dataset.id; }); }
  function openSide(id){
    activeId = id; ensureSide(); document.body.classList.add('d5-side-open'); side.classList.remove('closing'); side.classList.add('open');
    buildSide(true); decorateRows();
  }
  function closeSide(){
    if(!side || !activeId) return; activeId = null; document.body.classList.remove('d5-side-open'); side.classList.remove('open'); decorateRows();
  }
  function tag(t,cls){ return '<span class="d5-tag '+(cls||'')+'">'+esc(t)+'</span>'; }
  function buildSide(force){
    if(!side || !activeId) return;
    var r = row(activeId); if(!r){ closeSide(); return; }
    if(!force && side.contains(document.activeElement) && /^(input|textarea)$/i.test(document.activeElement.tagName)) return;
    var scroll = side.querySelector('.d5-body') ? side.querySelector('.d5-body').scrollTop : 0;
    var ids = visibleIds(), ix = ids.indexOf(activeId);
    var ad = isAdmin();
    var tags = '';
    if(r.woi) tags += tag('Waiting for invite','amber');
    try{ if(isAdvancedRound(r.round)) tags += tag('2nd round+','violet'); }catch(e){}
    if(r.onsite) tags += tag('Onsite','onsite');
    if(r.status) tags += tag(String(r.status).replace(/_/g,' '),'coral');
    if((r.doubts||[]).length) tags += tag('Has doubts','amber');
    if(r.candidateFirstInterview) tags += tag('First interview','teal');
    // assign
    var rank = []; try{ rank = (window.d2Rank ? window.d2Rank(r) : []); }catch(e){}
    var people = rank.filter(function(h){ return !h.isTeam; }).slice(0,6), teams = rank.filter(function(h){ return h.isTeam; });
    var chip = function(h){ var cur = (r.assignee||'')===h.name; return '<button class="d5-pick'+(cur?' cur':'')+(h.clash||h.absent?' warn':'')+'" data-d5-assign="'+esc(h.name)+'" title="'+esc(h.name+(h.isTeam?' (team)':'')+' — '+h.load+' call'+(h.load===1?'':'s')+(h.clash?' · clashes with '+(h.clash.time||'another call'):'')+(h.absent?' · absent':'')+(h.prior?' · handled this '+h.prior+' before':''))+'"><span class="d5-av'+(h.isTeam?' team':'')+'">'+(h.isTeam?'◆':esc(h.name.charAt(0).toUpperCase()))+'</span><span>'+esc(h.name)+'</span>'+(h.prior?'<i title="handled before">↻</i>':'')+(h.clash?'<em>⚠</em>':h.absent?'<em>absent</em>':'')+'</button>'; };
    var assign = '<section><h4>Assigned to</h4>'+(window.d48Line?window.d48Line(r):'')+'<div class="d5-cur">'+(r.woi?'<span class="d5-muted">Waiting for invite — no owner yet</span>':(r.assignee?'<span class="d5-av big">'+esc(r.assignee.charAt(0).toUpperCase())+'</span><b>'+esc(r.assignee)+'</b>':'<span class="d5-un">Nobody assigned</span>'))+'</div>'
      +(ad && !r.woi ? '<div class="d5-picks">'+people.map(chip).join('')+'</div><div class="d5-picks teams">'+teams.map(chip).join('')+'</div><div class="d5-row-btns"><button class="btn ghost" data-d5="more-assign">All handlers…</button>'+(r.assignee?'<button class="btn ghost danger" data-d5-assign="">Unassign</button>':'')+'</div>' : '')+'</section>';
    // facts
    var facts = [['Time',r.time||'—'],['Round',r.round||'—'],['Duration',r.duration||'—'],['Country',r.country||'—'],['Driving person',r.drivingPerson||'—']];
    var fx = '<section><h4>Call</h4><dl class="d5-facts">'+facts.map(function(f){ return '<div><dt>'+f[0]+'</dt><dd>'+esc(f[1])+'</dd></div>'; }).join('')+'</dl></section>';
    // notes
    var inp = function(k,l,ph){ return '<label class="d5-f"><span>'+l+'</span><input data-f="'+k+'" value="'+esc(r[k]||'')+'" placeholder="'+ph+'" '+(ad?'':'disabled')+'></label>'; };
    var notes = '<section><h4>Notes</h4>'+inp('interviewer','Interviewer (client side)','e.g. Sarah from ITV')+inp('technicalPOC','Technical POC','e.g. Gopi, Kishore')+inp('importance','Priority note','e.g. VIP client, urgent')
      +'<label class="d5-chk"><input type="checkbox" data-f="candidateFirstInterview" '+(r.candidateFirstInterview?'checked':'')+' '+(ad?'':'disabled')+'><span>Candidate’s 1st interview</span></label></section>';
    // portal
    var pm = null; try{ pm = findPortalMatch(r); }catch(e){}
    var portal = '<section><h4>Portal</h4>'+(pm ? '<div class="d5-portal"><span>Portal handler</span><b>'+esc(pm.handler||'Unassigned')+'</b>'+((pm.handler && r.assignee && (function(){ try{ return !namesEquivalent(pm.handler,r.assignee); }catch(e){ return false; } })())?'<em class="bad">differs from desk</em>':'<em class="ok">matches</em>')+(pm.status?'<small>'+esc(pm.status)+'</small>':'')+'</div>' : '<div class="d5-muted">No Portal record matched for this call.</div>')+'</section>';
    // linked
    var as=[], os=[]; try{ as = assessmentsForCandidate(r.candidate, r.company)||[]; }catch(e){} try{ os = onsitesForCandidate(r.candidate, r.company)||[]; }catch(e){}
    var linked = (as.length||os.length) ? '<section><h4>Linked</h4>'+as.map(function(a){ return '<div class="d5-li">🧪 Assessment · '+esc(a.date||'')+(a.assessment?' · '+esc(a.assessment):'')+'</div>'; }).join('')+os.map(function(o){ return '<div class="d5-li">🏢 Onsite · '+esc(o.date||'')+(o.location?' @ '+esc(o.location):'')+'</div>'; }).join('')+'</section>' : '';
    var dbt = (r.doubts||[]).length ? '<section class="d5-dbt"><h4>Doubts</h4>'+r.doubts.map(function(d){ return '<p>❔ '+esc(d)+'</p>'; }).join('')+(ad?'<div class="d5-row-btns"><button class="btn ghost" data-d5="edit">✎ Fix it</button><button class="btn" data-d5="resolve">✓ Mark resolved</button></div>':'')+'</section>' : '';
    var cm = window.d10CommentsHtml ? window.d10CommentsHtml(activeId) : '';
    var hist = '<section><h4>History</h4><div class="d5-hist" id="d5Hist">'+(histCache[activeId]||'<span class="d5-muted">Loading earlier calls…</span>')+'</div></section>';
    var foot = '<div class="d5-foot">'+(r.status?'':'')+'<button class="btn ghost m-only" data-d5="edit">✎ Edit all fields</button><button class="btn ghost m-only" data-d5="menu-move">⇄ Move round</button><button class="btn ghost m-only" data-d5="menu-portal">📡 Portal</button><button class="btn ghost" data-d5="menu-pin">Interviewer / POC</button><button class="btn ghost" data-d5="menu-closure">🎯 Expected closure</button>'+(ad?'<button class="btn ghost danger" data-d5="menu-del">Delete</button>':'')+'</div>';
    side.innerHTML = '<div class="d5-grab"><i></i></div><header class="d5-h"><span class="d5-av big">'+esc((r.candidate||'?').charAt(0).toUpperCase())+'</span><div class="d5-ht"><b>'+esc(r.candidate||'(no name)')+'</b><small>'+esc(r.company||'')+(r.role?' · '+esc(r.role):'')+'</small></div>'
      +'<div class="d5-nav"><button data-d5="prev" title="Previous call (↑)" '+(ix<=0?'disabled':'')+'>↑</button><button data-d5="next" title="Next call (↓)" '+(ix<0||ix>=ids.length-1?'disabled':'')+'>↓</button><button data-d5="close" title="Close (Esc)">✕</button></div></header>'
      +'<div class="d5-tags">'+tags+'</div><div class="d5-body">'+dbt+assign+fx+notes+portal+linked+cm+hist+'</div>'+foot;
    var sc = side.querySelector('.d5-body'); if(sc) sc.scrollTop = scroll;
    loadHistory(r);
  }
  function loadHistory(r){
    if(typeof fetchAllRowsAcrossDates!=='function') return;
    var id = r.id;
    fetchAllRowsAcrossDates(false).then(function(all){
      var key=''; try{ key = normalizeNameKey(r.candidate); }catch(e){ key = String(r.candidate||'').toLowerCase(); }
      var h = (all||[]).filter(function(x){ var k2=''; try{ k2=normalizeNameKey(x.candidate); }catch(e){ k2=String(x.candidate||'').toLowerCase(); } return k2===key && !(x._date===state.date && x.time===r.time && x.company===r.company); }).sort(function(a,b){ return String(b._date).localeCompare(String(a._date)); }).slice(0,8);
      histCache[id] = h.length ? h.map(function(x){ return '<div class="d5-hr"><span>'+esc(x._date||'')+'</span><span>'+esc(x.round||'')+'</span><span>'+esc(x.company||'')+'</span><b>'+esc(x.assignee||'—')+'</b></div>'; }).join('') : '<span class="d5-muted">No earlier calls on file.</span>';
      var box = $('#d5Hist'); if(box && activeId===id) box.innerHTML = histCache[id];
    }).catch(function(){ var box=$('#d5Hist'); if(box) box.innerHTML='<span class="d5-muted">History unavailable.</span>'; });
  }

  /* ================= events ================= */
  document.addEventListener('click', function(e){
    var rm = e.target.closest && e.target.closest('.d5-rm'); if(rm){ e.stopPropagation(); menu && menu.dataset.for===rm.dataset.id ? closeMenu() : (openMenu(rm), menu && (menu.dataset.for = rm.dataset.id)); return; }
    if(menu && !e.target.closest('#d5Menu')) closeMenu();
    var a = e.target.closest && e.target.closest('[data-d5]');
    if(a && side && side.contains(a)){
      var k = a.dataset.d5, ids = visibleIds(), ix = ids.indexOf(activeId), r = row(activeId);
      if(k==='close') closeSide();
      else if(k==='prev' && ix>0) go(ids[ix-1]);
      else if(k==='next' && ix>=0 && ix<ids.length-1) go(ids[ix+1]);
      else if(k==='more-assign' && window.d2OpenAssign) window.d2OpenAssign(activeId, a);
      else if(k==='menu-pin'){ var p=$('tr[data-id="'+activeId+'"] .pin-toggle'); if(p) p.click(); }
      else if(k==='menu-closure'){ var c=$('tr[data-id="'+activeId+'"] .expect-closure-btn'); if(c) c.click(); }
      else if(k==='menu-del'){ var d=$('tr[data-id="'+activeId+'"] .row-del'); if(d) d.click(); }
      else if(k==='menu-portal'){ var pq=$('tr[data-id="'+activeId+'"] .portal-check-btn'); if(pq) pq.click(); }
      else if(k==='menu-move'){ var mv=$('tr[data-id="'+activeId+'"] .move-2nd')||$('tr[data-id="'+activeId+'"] .move-1st'); if(mv) mv.click(); }
      else if(k==='resolve'){ if(r){ r.doubts=[]; try{ markDirty(); }catch(x){} render(); toast('Doubt marked resolved'); } }
      else if(k==='edit'){ var eid=activeId; closeSide(); if(window.mOpenRow) window.mOpenRow(eid); }
      return;
    }
    var pick = e.target.closest && e.target.closest('[data-d5-assign]');
    if(pick && side && side.contains(pick) && window.d2AssignTo){ window.d2AssignTo(activeId, pick.dataset.d5Assign); return; }
    // open from a row click (desktop: any row; phone: compact cards only — an expanded card is a form)
    var tr = e.target.closest && e.target.closest('#tableScrollMain tbody tr[data-id]'); if(!tr) return;
    if(!desktop() && !tr.classList.contains('m-card')) return;
    if(e.target.closest('input,select,textarea,button,a,label,.d3-grip,.mini-badge,.flag-icon,.select-cell,.pin-detail-row,.prior-badge')) return;
    if(window.getSelection && String(window.getSelection())) return;
    openSide(tr.dataset.id);
  });
  function go(id){ activeId = id; buildSide(true); decorateRows(); var t=$('tr[data-id="'+id+'"]'); if(t) t.scrollIntoView({block:'nearest',behavior:'smooth'}); }
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape'){ if(menu){ closeMenu(); return; } if(activeId && !$('#d2Cmd,.d2-pop,#d2Timeline,#d2Handover,#d3Suggest')){ closeSide(); } return; }
    if(!activeId) return;
    var typing = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable; if(typing) return;
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){ var ids=visibleIds(), ix=ids.indexOf(activeId), n=ix+(e.key==='ArrowDown'?1:-1); if(n>=0&&n<ids.length){ e.preventDefault(); go(ids[n]); } }
  });
  window.d5OpenSide = function(id){ openSide(id); };
  window.addEventListener('resize', function(){ decorateRows(); });

  function install(){
    if(typeof window.render!=='function' || !window.__desk4){ return setTimeout(install,60); }
    var orig = window.render;
    window.render = function(){ var r = orig.apply(this, arguments); try{ decorateRows(); if(activeId) buildSide(); }catch(e){ console.warn('d5',e); } return r; };
    try{ decorateRows(); }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

;

/* ===== reports-menu (tidy Reports dropdown) ===== */
(function(){
  'use strict';
  if(window.__d6) return; window.__d6 = true;
  var LS = { get:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }, set:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  var DEFAULT_COLLAPSED = ['Tools','Admin','Reference'];
  var query = '';
  var use = function(){ try{ return JSON.parse(LS.get('d6.use','{}'))||{}; }catch(e){ return {}; } };
  var collapsed = function(){ try{ var v = JSON.parse(LS.get('d6.col','null')); return Array.isArray(v) ? v : DEFAULT_COLLAPSED.slice(); }catch(e){ return DEFAULT_COLLAPSED.slice(); } };
  var saveCol = function(a){ LS.set('d6.col', JSON.stringify(a)); };
  var norm = function(s){ return String(s||'').toLowerCase(); };

  document.addEventListener('click', function(e){
    var it = e.target.closest && e.target.closest('.more-menu-dropdown.d6 .more-menu-item[id]');
    if(!it || it.id==='headerLogoutBtn') return;
    var u = use(); u[it.id] = (u[it.id]||0)+1; LS.set('d6.use', JSON.stringify(u));
  }, true);

  function decorate(){
    var dd = $('.more-menu-dropdown:not(.d6)'); 
    // only the Reports dropdown (has Notifications / Desk Tools)
    if(!dd || !$('#toggleNotifications,#openDeskTools', dd)) return;
    dd.classList.add('d6');
    var kids = Array.prototype.slice.call(dd.children), groups = [], cur = null, tail = [];
    kids.forEach(function(k){
      if(k.classList.contains('more-menu-section-label')){ cur = {name:k.textContent.trim(), label:k, items:[]}; groups.push(cur); }
      else if(k.classList.contains('more-menu-divider') || k.id==='headerLogoutBtn'){ tail.push(k); cur = null; }
      else if(cur) cur.items.push(k);
      else { cur = {name:'Today', label:null, items:[k]}; groups.push(cur); }
    });
    // build structure
    var frag = document.createDocumentFragment();
    var search = document.createElement('div'); search.className='d6-search';
    search.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input type="search" placeholder="Find a report or tool…" aria-label="Find a report or tool" autocomplete="off"><kbd>Esc</kbd>';
    frag.appendChild(search);
    // frequent: move up to 5 most-used items (needs a little history)
    var u = use(), all = []; groups.forEach(function(g){ g.items.forEach(function(it){ if(it.id && u[it.id]>=2) all.push(it); }); });
    all.sort(function(a,b){ return u[b.id]-u[a.id]; });
    var top = all.slice(0,5), col = collapsed();
    if(top.length){
      var fg = document.createElement('div'); fg.className='d6-grp d6-freq'; fg.dataset.name='Frequent';
      var fl = document.createElement('div'); fl.className='more-menu-section-label d6-lab'; fl.innerHTML='<span>★ Most used</span>'; fg.appendChild(fl);
      var body = document.createElement('div'); body.className='d6-body'; top.forEach(function(it){ it.dataset.d6home = it.closest('.d6-grp') ? '' : ''; body.appendChild(it); }); fg.appendChild(body); frag.appendChild(fg);
    }
    groups.forEach(function(g){
      var wrap = document.createElement('div'); wrap.className='d6-grp'; wrap.dataset.name=g.name;
      var open = col.indexOf(g.name)<0;
      if(!open) wrap.classList.add('collapsed');
      var lab = document.createElement('button'); lab.type='button'; lab.className='more-menu-section-label d6-lab'; lab.innerHTML='<span>'+g.name+'</span><i>'+g.items.filter(function(x){return top.indexOf(x)<0;}).length+'</i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
      lab.dataset.d6=g.name; wrap.appendChild(lab);
      var b = document.createElement('div'); b.className='d6-body';
      g.items.forEach(function(it){ if(top.indexOf(it)<0) b.appendChild(it); }); wrap.appendChild(b);
      if(!b.children.length) wrap.classList.add('empty');
      frag.appendChild(wrap);
    });
    var empty = document.createElement('div'); empty.className='d6-none'; empty.textContent='Nothing matches that.'; frag.appendChild(empty);
    tail.forEach(function(t){ frag.appendChild(t); });
    dd.innerHTML=''; dd.appendChild(frag);
    var inp = $('.d6-search input', dd);
    inp.value = query;
    var apply = function(){
      query = inp.value; var q = norm(query).trim(), any = false;
      $$('.d6-grp', dd).forEach(function(g){
        var shown = 0;
        $$('.more-menu-item', g).forEach(function(it){
          var hit = !q || norm(it.textContent+' '+(it.getAttribute('title')||'')).indexOf(q)>=0;
          it.hidden = !hit; if(hit) shown++;
        });
        g.classList.toggle('d6-hide', !!q && !shown);
        g.classList.toggle('searching', !!q);
        if(shown) any = true;
      });
      dd.classList.toggle('d6-nomatch', !!q && !any);
    };
    inp.addEventListener('input', apply);
    inp.addEventListener('keydown', function(e){
      e.stopPropagation();
      if(e.key==='Enter'){ var f = $$('.d6-grp:not(.d6-hide) .more-menu-item:not([hidden])', dd)[0]; if(f){ e.preventDefault(); f.click(); } }
      else if(e.key==='ArrowDown'){ var n = $$('.d6-grp:not(.d6-hide) .more-menu-item:not([hidden])', dd)[0]; if(n){ e.preventDefault(); n.focus(); } }
      else if(e.key==='Escape'){ if(inp.value){ inp.value=''; apply(); e.stopPropagation(); } }
    });
    dd.addEventListener('keydown', function(e){
      if(e.target===inp) return;
      var items = $$('.d6-grp:not(.d6-hide):not(.collapsed) .more-menu-item:not([hidden]), .d6-grp.searching:not(.d6-hide) .more-menu-item:not([hidden])', dd);
      var i = items.indexOf(document.activeElement);
      if(e.key==='ArrowDown' && i>=0 && i<items.length-1){ e.preventDefault(); items[i+1].focus(); }
      else if(e.key==='ArrowUp' && i>=0){ e.preventDefault(); (i===0?inp:items[i-1]).focus(); }
    });
    dd.addEventListener('click', function(e){
      var lab = e.target.closest('.d6-lab[data-d6]'); if(!lab) return; e.stopPropagation();
      var name = lab.dataset.d6, c = collapsed(), ix = c.indexOf(name);
      if(ix<0) c.push(name); else c.splice(ix,1); saveCol(c);
      lab.parentNode.classList.toggle('collapsed', ix<0);
    });
    apply();
    if(window.innerWidth>=900){ inp.focus(); try{ inp.setSelectionRange(inp.value.length, inp.value.length); }catch(x){} }
  }

  function install(){
    if(typeof window.render!=='function' || !window.__desk5){ return setTimeout(install,60); }
    var orig = window.render;
    window.render = function(){ var r = orig.apply(this, arguments); try{ if(!$('.more-menu-dropdown')) query=''; decorate(); }catch(e){ console.warn('d6',e); } return r; };
  }
  // menu closing resets the typed query
  document.addEventListener('click', function(e){ if(e.target.closest && e.target.closest('.more-menu-backdrop')) query=''; }, true);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();
/* ===== mobile (compact call cards + bottom sheet) ===== */
(function(){
  'use strict';
  if(window.__m) return; window.__m = true;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var phone = function(){ return window.__d17vw<900; };
  var rowOf = function(id){ try{ return (state.rows||[]).find(function(r){ return r.id===id; }); }catch(e){ return null; } };
  var openIds = {};
  var shortDur = function(d){ var m = String(d||'').match(/\d+/); return m ? m[0]+'m' : ''; };
  var roundTag = function(r){ var t = String(r.round||''); if(/1/.test(t)||!t) return ''; try{ if(isAdvancedRound(t)) return '<em class="m-b v">'+esc(t.replace(/\s*round/i,''))+'</em>'; }catch(e){} return '<em class="m-b">'+esc(t)+'</em>'; };

  var isAdminM = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  function sum(r, tr){
    var as = r.woi ? '<button type="button" class="m-as woi" data-m="assign">⏳ Waiting for invite</button>'
      : r.assignee ? '<button type="button" class="m-as ok" data-m="assign"><i>'+esc(r.assignee.charAt(0).toUpperCase())+'</i>'+esc(r.assignee)+'</button>'
      : '<button type="button" class="m-as none" data-m="assign">＋ Assign</button>';
    var flags = '';
    if(tr.classList.contains('row-conflict')) flags += '<em class="m-b warn">⚠ clash</em>';
    if(r.onsite) flags += '<em class="m-b o">onsite</em>';
    if((r.doubts||[]).length) flags += '<em class="m-b warn">doubt</em>';
    var pb = $('.portal-check-btn', tr); if(pb && /amber/.test(pb.getAttribute('style')||'')) flags += '<em class="m-b warn">📡</em>';
    if($('.pin-toggle-filled', tr)) flags += '<em class="m-b t">★</em>';
    try{ var chh = findSameClientHistory(r), chn = chh.length; if(chn){ var cb = chh[0] && chh[0].status; flags += '<em class="m-b '+(cb?'warn':'t')+'" title="Earlier calls with this client">🏢 '+chn+' earlier'+(cb?' · ⚠ last '+esc(statusBadgeInfo(cb).label.toLowerCase()):'')+'</em>'; } }catch(x){}
    try{ var ccn = window.d10Comments ? window.d10Comments(r.id).length : 0; if(ccn) flags += '<em class="m-b t">💬 '+ccn+'</em>'; }catch(x){}
    var meta = [shortDur(r.duration), r.country].filter(Boolean).join(' · ');
    return '<div class="m-l1"><span class="m-time">'+esc(r.time||'—')+'</span><b class="m-name">'+esc(r.candidate||'(no name)')+'</b>'+roundTag(r)+'</div>'
      +'<div class="m-l2">'+esc([r.company,r.role].filter(Boolean).join(' · '))+'</div>'
      +'<div class="m-l3">'+as+'<span class="m-meta">'+esc(meta)+'</span>'+flags+'</div>'
      +((r.doubts||[]).length ? '<div class="m-dbt"><p>❔ '+esc(r.doubts.join(' '))+'</p><div><button type="button" data-m="fix">✎ Fix</button>'+(isAdminM()?'<button type="button" class="ok" data-m="resolve">✓ Resolved</button>':'')+'</div></div>' : '')
      +'<button type="button" class="m-collapse" data-m="collapse">Done ✓</button>';
  }
  function decorate(){
    var wrap = $('#tableScrollMain'); if(!wrap) return;
    var on = phone();
    document.documentElement.classList.toggle('m-on', on);
    $$('tbody tr[data-id]', wrap).forEach(function(tr){
      var s = $('.m-sum', tr);
      if(!on){ if(s) s.remove(); tr.classList.remove('m-card','m-open'); return; }
      var id = tr.dataset.id, r = rowOf(id); if(!r) return;
      if(!s){ s = document.createElement('td'); s.className='m-sum'; tr.appendChild(s); }
      var op = !!openIds[id];
      tr.classList.toggle('m-open', op); tr.classList.toggle('m-card', !op);
      s.innerHTML = sum(r, tr);
    });
  }
  window.mOpenRow = function(id){ openIds[id]=1; decorate(); var t=$('#tableScrollMain tr[data-id="'+id+'"]'); if(t) setTimeout(function(){ t.scrollIntoView({block:'start',behavior:'smooth'}); },30); };
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('[data-m="fix"],[data-m="resolve"]'); if(!b) return;
    var tr = b.closest('tr'), r = tr && rowOf(tr.dataset.id); if(!r) return;
    e.stopPropagation();
    if(b.dataset.m==='fix'){ window.mOpenRow(r.id); return; }
    r.doubts = []; try{ markDirty(); }catch(x){} render(); if(window.d2Toast) window.d2Toast('Doubt marked resolved');
  }, true);
  document.addEventListener('click', function(e){
    var c = e.target.closest && e.target.closest('[data-m="collapse"]'); if(!c) return;
    var tr = c.closest('tr'); if(tr){ delete openIds[tr.dataset.id]; decorate(); }
  });
  window.addEventListener('resize', function(){ decorate(); });
  function install(){
    if(typeof window.render!=='function' || !window.__d6){ return setTimeout(install,60); }
    var orig = window.render;
    window.render = function(){ var r = orig.apply(this, arguments); try{ decorate(); }catch(e){ console.warn('m',e); } return r; };
    try{ decorate(); }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== swipe-to-dismiss for notifications (phones/tablets) ===== */
(function(){
  'use strict';
  if(window.__sw) return; window.__sw = true;
  // pop-up toasts (Live Feed, undo/assign, desk tools) and the alerts inside the Live Feed panel
  var SEL = '.lf-toast, .d2-toast, .undo-toast, #liveFeedPanel .lf-item, #d8 .d8-item';
  var st = null;
  function targetOf(e){ var t = e.target.closest && e.target.closest(SEL); if(!t) return null;
    // a toast that wraps an .lf-item swipes as the toast
    var outer = t.closest('.lf-toast'); return outer || t; }
  document.addEventListener('touchstart', function(e){
    if(e.touches.length!==1) return;
    var el = targetOf(e); if(!el) return;
    if(e.target.closest('input,textarea,select')) return;
    st = { el: el, x: e.touches[0].clientX, y: e.touches[0].clientY, dx: 0, lock: null, t: Date.now() };
  }, {passive:true});
  document.addEventListener('touchmove', function(e){
    if(!st) return;
    var dx = e.touches[0].clientX - st.x, dy = e.touches[0].clientY - st.y;
    if(st.lock==null && (Math.abs(dx)>8 || Math.abs(dy)>8)) st.lock = Math.abs(dx) > Math.abs(dy)*1.2 ? 'x' : 'y';
    if(st.lock!=='x'){ if(st.lock==='y'){ reset(false); st=null; } return; }
    st.dx = dx;
    var el = st.el; el.style.transition='none'; el.style.transform='translateX('+dx+'px)'; el.style.opacity = String(Math.max(.25, 1-Math.abs(dx)/(el.offsetWidth*1.1)));
  }, {passive:true});
  function reset(animate){ if(!st) return; var el=st.el; el.style.transition = animate?'transform .2s ease, opacity .2s ease':''; el.style.transform=''; el.style.opacity=''; }
  function finish(){
    if(!st) return; var s=st; st=null;
    if(s.lock!=='x') return;
    var el=s.el, w=el.offsetWidth||300, fast = Math.abs(s.dx)/Math.max(1,Date.now()-s.t) > .55;
    if(Math.abs(s.dx) > w*.33 || (fast && Math.abs(s.dx)>40)){
      el.style.transition='transform .18s ease, opacity .18s ease'; el.style.transform='translateX('+(s.dx>0?'110%':'-110%')+')'; el.style.opacity='0';
      setTimeout(function(){ dismiss(el); }, 180);
    } else { st = s; reset(true); st=null; }
  }
  function dismiss(el){
    var item = el.matches('.lf-item,.d8-item') ? el : el.querySelector('.lf-item');
    var id = item && item.getAttribute('data-lf-id');
    if(el.closest('#liveFeedPanel,#d8') && id && window.livefeedRemoveItem){ window.livefeedRemoveItem(id); return; }   // panel / inbox: delete the alert
    if(el.classList.contains('undo-toast')){                                                                     // undo pop-up: swipe = keep the removal, drop the Undo
      try{ if(typeof undoToastTimer!=='undefined') clearTimeout(undoToastTimer); state.lastDeleted = null; render(); }catch(e){ if(el.parentNode) el.parentNode.removeChild(el); }
      return;
    }
    var x = el.querySelector('[data-lf-dismiss],[data-sa-close],[data-dt-close]');
    if(el.parentNode) el.parentNode.removeChild(el);                                                            // toast: just hide the pop-up
  }
  document.addEventListener('touchend', finish, {passive:true});
  document.addEventListener('touchcancel', function(){ if(st){ reset(true); st=null; } }, {passive:true});
})();

/* ===== 2nd-round pipeline (country-wise, for upcoming calls) ===== */
(function(){
  'use strict';
  if(window.__d7) return; window.__d7 = true;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var LS = { get:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }, set:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
  var RANGES = [['today','Today'],['week','Next 7 days'],['month','Next 30 days'],['upcoming','All upcoming'],['past','Past 30 days'],['all','Everything']];
  var el = null, M = { range: LS.get('d7.range','week'), country: '', round: '', cancelled: false, data: null, loading: false };

  function plus(d,n){ try{ return addDaysToDateStr(d,n); }catch(e){ return d; } }
  function inRange(date, r){
    var t = todayDateString();
    if(r==='all') return true;
    if(r==='today') return date===t;
    if(r==='week') return date>=t && date<=plus(t,6);
    if(r==='month') return date>=t && date<=plus(t,29);
    if(r==='upcoming') return date>=t;
    if(r==='past') return date<=t && date>=plus(t,-29);
    return true;
  }
  function country(c){
    var t = String(c||'').trim(); if(!t) return 'Unknown';
    if(/^(us|usa|u\.s\.a?\.?|united states.*|america)$/i.test(t)) return 'USA';
    if(/^(uk|u\.k\.?|united kingdom|england|gb|britain|great britain)$/i.test(t)) return 'UK';
    if(/^(ie|ire|ireland|eire)$/i.test(t)) return 'Ireland';
    if(/^(ca|can|canada)$/i.test(t)) return 'Canada';
    return t.replace(/\b\w/g,function(m){ return m.toUpperCase(); });
  }
  function roundN(r){ var t=String(r||''); if(/final|last/i.test(t)) return 99; var m=t.match(/(\d+)/); return m ? +m[1] : 2; }
  function roundLabel(n){ return n===99 ? 'Final' : n===2 ? '2nd' : n===3 ? '3rd' : '4th+'; }
  function bucket(n){ return n===99 ? 'Final' : n<=2 ? '2nd' : n===3 ? '3rd' : '4th+'; }
  function bdm(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } }

  function load(force){
    M.loading = true; paint();
    var p = (typeof fetchAllRowsAcrossDates==='function') ? fetchAllRowsAcrossDates(!!force) : Promise.resolve([]);
    p.then(function(all){
      all = (all||[]).filter(function(r){ return r._date !== state.date; });
      (state.rows||[]).forEach(function(r){ all.push(Object.assign({}, r, { _date: state.date })); });
      M.data = all; M.loading = false; paint();
    }).catch(function(){ M.data = (state.rows||[]).map(function(r){ return Object.assign({}, r, { _date: state.date }); }); M.loading = false; paint(); });
  }

  function compute(){
    var bad = (typeof RESCHED_STATUSES!=='undefined') ? RESCHED_STATUSES : [];
    var calls = (M.data||[]).filter(function(r){
      if(!r.candidate || !r._date) return false;
      if(!inRange(r._date, M.range)) return false;
      var adv = false; try{ adv = isAdvancedRound(r.round); }catch(e){}
      if(!adv) return false;
      if(!M.cancelled && r.status && bad.indexOf(r.status)>=0) return false;
      return true;
    }).map(function(r){
      var key=''; try{ key = normalizeNameKey(r.candidate); }catch(e){ key = String(r.candidate).toLowerCase(); }
      return { date:r._date, time:r.time||'', candidate:r.candidate, key:key, company:r.company||'', country:country(r.country), round:r.round||'', n:roundN(r.round), assignee:r.assignee||'', woi:!!r.woi };
    });
    var cands = {};
    calls.forEach(function(c){
      var k = c.key + '|' + c.country; // same person, same country → one candidate
      var x = cands[k] || (cands[k] = { key:c.key, name:c.candidate, country:c.country, calls:[], maxN:0 });
      x.calls.push(c); if(c.n > x.maxN) x.maxN = c.n;
    });
    var list = Object.keys(cands).map(function(k){ return cands[k]; });
    list.forEach(function(x){
      x.calls.sort(function(a,b){ return a.date.localeCompare(b.date) || bdm(a.time)-bdm(b.time); });
      var t = todayDateString(), nxt = x.calls.filter(function(c){ return c.date>=t; })[0];
      x.show = nxt || x.calls[x.calls.length-1];
      x.unassigned = x.calls.some(function(c){ return !c.assignee && !c.woi; });
    });
    var by = {}, rounds = { '2nd':0,'3rd':0,'4th+':0,'Final':0 }, comp = {}, days = {};
    list.forEach(function(x){
      var b = by[x.country] || (by[x.country] = { name:x.country, cands:0, calls:0, un:0, woi:0 });
      b.cands++; b.calls += x.calls.length; if(x.unassigned) b.un++; if(x.calls.some(function(c){ return c.woi; })) b.woi++;
      rounds[bucket(x.maxN)]++;
      var ck=''; try{ ck = normalizeCompanyKey(x.show.company); }catch(e){ ck = x.show.company.toLowerCase(); }
      if(ck){ var c = comp[ck] || (comp[ck] = { name: (typeof stripCompanyNoise==='function'?stripCompanyNoise(x.show.company):x.show.company), n:0 }); c.n++; }
    });
    calls.forEach(function(c){ days[c.date] = (days[c.date]||0)+1; });
    var countries = Object.keys(by).map(function(k){ return by[k]; }).sort(function(a,b){ return b.cands-a.cands; });
    var companies = Object.keys(comp).map(function(k){ return comp[k]; }).sort(function(a,b){ return b.n-a.n; }).slice(0,6);
    return { calls:calls, list:list, countries:countries, rounds:rounds, companies:companies, days:days };
  }

  function visible(R){
    return R.list.filter(function(x){ return (!M.country || x.country===M.country) && (!M.round || bucket(x.maxN)===M.round); })
      .sort(function(a,b){ return a.show.date.localeCompare(b.show.date) || bdm(a.show.time)-bdm(b.show.time); });
  }
  function rangeText(){
    var t = todayDateString();
    return M.range==='today' ? t : M.range==='week' ? t+' → '+plus(t,6) : M.range==='month' ? t+' → '+plus(t,29) : M.range==='upcoming' ? 'from '+t : M.range==='past' ? plus(t,-29)+' → '+t : 'all dates on file';
  }
  function summaryText(R){
    var L = ['2nd-round pipeline — ' + (RANGES.filter(function(r){return r[0]===M.range;})[0]||[])[1] + ' (' + rangeText() + ')',
      R.list.length + ' candidates · ' + R.calls.length + ' calls',
      R.countries.map(function(c){ return c.name+' '+c.cands; }).join(' · '),
      'Rounds: ' + Object.keys(R.rounds).filter(function(k){ return R.rounds[k]; }).map(function(k){ return k+' '+R.rounds[k]; }).join(' · ')];
    var un = R.list.filter(function(x){ return x.unassigned; }).length; if(un) L.push('Still to assign: ' + un);
    return L.join('\n');
  }

  function paint(){
    if(!el) return;
    var card = $('.d7-body', el); if(!card) return;
    if(M.loading || !M.data){ card.innerHTML = '<div class="d2-empty" style="margin:30px"><h3>Counting…</h3><p>Reading every saved date.</p></div>'; return; }
    var R = compute(), vis = visible(R), max = Math.max.apply(null, R.countries.map(function(c){ return c.cands; }).concat([1]));
    var dayKeys = Object.keys(R.days).sort().slice(0, 21), dmax = Math.max.apply(null, dayKeys.map(function(k){ return R.days[k]; }).concat([1]));
    var unTotal = R.list.filter(function(x){ return x.unassigned; }).length;
    var html = '';
    html += '<div class="d7-tiles"><div><b>'+R.list.length+'</b><span>candidates in 2nd+ rounds</span></div><div><b>'+R.calls.length+'</b><span>calls</span></div><div><b>'+R.countries.length+'</b><span>countries</span></div><div class="'+(unTotal?'warn':'')+'"><b>'+unTotal+'</b><span>still to assign</span></div></div>';
    html += '<h4>By country <small>tap a country to filter the list</small></h4><div class="d7-bars">' + (R.countries.length ? R.countries.map(function(c){
      return '<button class="d7-bar'+(M.country===c.name?' on':'')+'" data-d7c="'+esc(c.name)+'"><span class="d7-n">'+esc(c.name)+'</span><span class="d7-track"><i style="width:'+Math.max(4,Math.round(c.cands/max*100))+'%"></i></span><span class="d7-v"><b>'+c.cands+'</b> <em>'+c.calls+' call'+(c.calls===1?'':'s')+(c.un?' · '+c.un+' to assign':'')+'</em></span></button>';
    }).join('') : '<div class="d2-quiet" style="padding:8px 0">No 2nd-round or later calls in this period.</div>') + '</div>';
    html += '<h4>By round <small>highest round each candidate has reached</small></h4><div class="d7-chips">' + Object.keys(R.rounds).map(function(k){
      return '<button class="d7-chip'+(M.round===k?' on':'')+'" data-d7r="'+k+'"><b>'+R.rounds[k]+'</b> '+k+'</button>'; }).join('') + '</div>';
    if(dayKeys.length > 1) html += '<h4>Calls per day</h4><div class="d7-days">'+dayKeys.map(function(k){ var n=R.days[k]; return '<div title="'+esc(k)+': '+n+' call'+(n===1?'':'s')+'"><i style="height:'+Math.max(6,Math.round(n/dmax*56))+'px"></i><span>'+esc(k.slice(5))+'</span><b>'+n+'</b></div>'; }).join('')+'</div>';
    if(R.companies.length) html += '<h4>Top clients</h4><div class="d7-chips">'+R.companies.map(function(c){ return '<span class="d7-chip static"><b>'+c.n+'</b> '+esc(c.name)+'</span>'; }).join('')+'</div>';
    html += '<h4>Candidates <small>'+vis.length+(M.country||M.round?' shown ('+[M.country,M.round].filter(Boolean).join(' · ')+')':'')+'</small>'+((M.country||M.round)?' <button class="d7-clear" data-d7="clear">Clear filter</button>':'')+'</h4><div class="d7-list">'+(vis.length ? vis.slice(0,200).map(function(x){
      var s = x.show, more = x.calls.length>1 ? ' <em>+'+(x.calls.length-1)+' more</em>' : '';
      return '<div class="d7-row"><div class="d7-who"><b>'+esc(x.name)+'</b><small>'+esc(s.company||'—')+'</small></div><span class="d7-rd">'+esc(roundLabel(s.n))+'</span><span class="d7-when">'+esc(s.date.slice(5))+' '+esc(s.time||'time n/a')+more+'</span><span class="d7-as'+(s.assignee?'':' none')+'">'+(s.woi?'⏳ WOI':esc(s.assignee||'Unassigned'))+'</span><span class="d7-cn">'+esc(x.country)+'</span></div>';
    }).join('')+(vis.length>200?'<div class="d2-quiet" style="padding:8px">Showing the first 200.</div>':'') : '<div class="d2-quiet" style="padding:10px 0">Nobody matches.</div>')+'</div>';
    card.innerHTML = html;
  }

  function open(){
    close();
    el = document.createElement('div'); el.id='d7'; el.className='d3-overlay';
    el.innerHTML = '<div class="d3-card d7-card"><div class="d2-tl-h"><b>2nd-round pipeline</b><span class="d2-quiet" id="d7sub"></span><button class="d2-x" data-d7="close" aria-label="Close">✕</button></div>'
      +'<div class="d7-ctl"><div class="d7-seg" role="tablist">'+RANGES.map(function(r){ return '<button data-d7range="'+r[0]+'" class="'+(M.range===r[0]?'on':'')+'">'+r[1]+'</button>'; }).join('')+'</div>'
      +'<label class="d7-chk"><input type="checkbox" data-d7="cx" '+(M.cancelled?'checked':'')+'> include cancelled / rescheduled</label>'
      +'<span class="d7-sp"></span><button class="btn ghost" data-d7="copy">Copy summary</button><button class="btn ghost" data-d7="refresh" title="Re-read every date">↻</button></div>'
      +'<div class="d7-body"></div></div>';
    document.body.appendChild(el); document.body.classList.add('d2-lock');
    $('#d7sub', el).textContent = rangeText();
    el.addEventListener('click', onClick);
    if(M.data) paint(); load(false);
  }
  function close(){ if(el){ el.remove(); el=null; } if(!$('#d2Timeline,#d2Handover,#d3Suggest,#d3Keys')) document.body.classList.remove('d2-lock'); }
  function onClick(e){
    var t = e.target;
    if(t===el || t.closest('[data-d7=close]')){ close(); return; }
    var rg = t.closest('[data-d7range]'); if(rg){ M.range = rg.dataset.d7range; LS.set('d7.range', M.range); M.country=''; M.round=''; $$('[data-d7range]', el).forEach(function(b){ b.classList.toggle('on', b===rg); }); $('#d7sub', el).textContent = rangeText(); paint(); return; }
    var c = t.closest('[data-d7c]'); if(c){ M.country = M.country===c.dataset.d7c ? '' : c.dataset.d7c; paint(); return; }
    var r = t.closest('[data-d7r]'); if(r){ M.round = M.round===r.dataset.d7r ? '' : r.dataset.d7r; paint(); return; }
    var a = t.closest('[data-d7]'); if(!a) return;
    var k = a.dataset.d7;
    if(k==='clear'){ M.country=''; M.round=''; paint(); }
    else if(k==='cx'){ M.cancelled = a.checked; paint(); }
    else if(k==='refresh'){ load(true); }
    else if(k==='copy'){
      var txt = summaryText(compute());
      try{ navigator.clipboard.writeText(txt).then(function(){ if(window.d2Toast) window.d2Toast('Summary copied',{ms:2200}); }); }catch(x){ window.prompt('Copy this summary', txt); }
    }
  }
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && el){ e.stopPropagation(); close(); } }, true);
  window.d7Open = open;

  // entry points: Reports menu + command bar
  function injectMenu(){
    var dd = $('.more-menu-dropdown.d6'); if(!dd || $('#openD7', dd)) return;
    var host = $('.d6-grp[data-name="Today"] .d6-body', dd) || $('.d6-body', dd); if(!host) return;
    var b = document.createElement('button'); b.className='more-menu-item'; b.id='openD7'; b.type='button';
    b.title='How many candidates are in 2nd and later rounds — by country, round and day, including future dates';
    b.innerHTML='🌍 2nd-round pipeline';
    b.addEventListener('click', function(){ try{ state.showMoreMenu=false; render(); }catch(x){} open(); });
    host.appendChild(b);
  }
  function install(){
    if(typeof window.render!=='function' || !window.__m){ return setTimeout(install,60); }
    var orig = window.render;
    window.render = function(){ var r = orig.apply(this, arguments); try{ injectMenu(); }catch(e){} return r; };
    var prev = window.d2ExtraCmds;
    window.d2ExtraCmds = function(){ var base = prev ? prev() : []; return base.concat([['pipeline second round country','2nd-round pipeline','By country, round and day',open,'🌍']]); };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== keep the scroll position when the list re-renders ===== */
/* Selecting a call, assigning it, a background refresh… all call render(), which rebuilds the table and used to
   throw the list back to the top. Before each render the first visible call (and its offset) is remembered; after
   it, that call is put back exactly where it was. Changing the date / tab / search / filter still starts at the top. */
(function(){
  'use strict';
  if(window.__keepScroll) return; window.__keepScroll = true;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  function sig(){ try{ return [state.date,state.view,state.filter,state.search,state.clientFilter,state.assigneeFilter,state.roleFilter,state.sortBy].join('|'); }catch(e){ return ''; } }
  function rowsIn(s){ return Array.prototype.slice.call(s.querySelectorAll('tbody tr[data-id]')); }
  function capture(){
    var s = $('#tableScrollMain'); if(!s) return null;
    var cs = getComputedStyle(s), inner = (cs.overflowY==='auto'||cs.overflowY==='scroll') && s.scrollHeight > s.clientHeight + 2;
    var out = { sig: sig(), inner: inner, st: s.scrollTop, sl: s.scrollLeft, wy: window.scrollY };
    var sTop = s.getBoundingClientRect().top;
    var list = rowsIn(s);
    if(inner){
      for(var i=0;i<list.length;i++){ var r = list[i].getBoundingClientRect(); if(r.bottom > sTop + 48){ out.a = { id:list[i].dataset.id, off:r.top - sTop }; break; } }
    }
    if(!inner) for(var j=0;j<list.length;j++){ var q = list[j].getBoundingClientRect(); if(q.bottom > 70){ out.w = { id:list[j].dataset.id, off:q.top }; break; } }
    return out;
  }
  function restore(c){
    if(!c || c.sig !== sig()) return;
    var s = $('#tableScrollMain'); if(!s) return;
    try{
      if(c.inner){
        s.scrollLeft = c.sl;
        var a = c.a && s.querySelector('tbody tr[data-id="'+c.a.id+'"]');
        if(a){ var d = (a.getBoundingClientRect().top - s.getBoundingClientRect().top) - c.a.off; if(Math.abs(d) > 1) s.scrollTop += d; else if(s.scrollTop===0 && c.st>0) s.scrollTop = c.st; }
        else s.scrollTop = c.st;
      } else { s.scrollLeft = c.sl; }
      var w = c.w && s.querySelector('tbody tr[data-id="'+c.w.id+'"]');
      if(w){ var dw = w.getBoundingClientRect().top - c.w.off; if(Math.abs(dw) > 1) window.scrollBy(0, dw); }
      else if(Math.abs(window.scrollY - c.wy) > 1) window.scrollTo(0, c.wy);
    }catch(e){}
  }
  function install(){
    if(typeof window.render!=='function' || !window.__d7){ return setTimeout(install,60); }
    var orig = window.render;
    window.render = function(){
      var c = null; try{ c = capture(); }catch(e){}
      var r = orig.apply(this, arguments);
      try{ restore(c); }catch(e){}
      requestAnimationFrame(function(){ try{ restore(c); }catch(e){} });
      return r;
    };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== alerts inbox (WhatsApp-style notification list + phone-notification setup) ===== */
(function(){
  'use strict';
  if(window.__d8) return; window.__d8 = true;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var el = null, pushState = 'unknown', testMsg = '';
  var ICON = { 'long-gap':'⏳', 'company-handler':'🏢', 'round-continuity':'↻', 'repeat-noshow':'⚠️', 'unassigned':'📞', 'soon':'⏰', 'nonext':'🧭', 'asm-after':'🧪', 'next-after-asm':'➡️', 'moved-up':'📈', 'asm-due':'🧪', 'asm-overdue':'⏰', 'asm-nointerview':'📭', 'onsite':'🏢', 'status':'🔁', 'repeat':'⚠️', 'woi':'⏳', 'closure':'🎯', 'brief':'☀️', 'wrap':'🌙' };
  function api(){ return window.livefeedApi || null; }
  function perm(){ try{ return typeof Notification==='undefined' ? 'unsupported' : Notification.permission; }catch(e){ return 'unsupported'; } }
  function isIOS(){ return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform==='MacIntel' && navigator.maxTouchPoints>1); }
  function standalone(){ try{ return window.matchMedia('(display-mode: standalone)').matches || navigator.standalone; }catch(e){ return false; } }
  function ago(ts){ var m = Math.round((Date.now()-ts)/60000); if(m<1) return 'now'; if(m<60) return m+'m'; var h=Math.round(m/60); if(h<24) return h+'h'; return Math.round(h/24)+'d'; }
  function dayKey(ts){ var d=new Date(ts); return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate(); }
  function dayLabel(ts){ var t=new Date(), y=new Date(Date.now()-86400000), k=dayKey(ts); return k===dayKey(t.getTime()) ? 'Today' : k===dayKey(y.getTime()) ? 'Yesterday' : new Date(ts).toLocaleDateString(undefined,{day:'numeric',month:'short'}); }
  function canAssign(it){
    try{ if(CURRENT_ROLE!=='admin' || !it.handler || it.date!==state.date) return false;
      var r = (state.rows||[]).find(function(x){ return x.id===it.rowId; }); if(!r) return false;
      var a = String(r.assignee||'').trim(); return !a || (state.roster||[]).some(function(p){ return p.team===a; }); }catch(e){ return false; }
  }
  function refreshPush(){
    try{
      if(!('serviceWorker' in navigator) || !('PushManager' in window)){ pushState='unsupported'; return paint(); }
      navigator.serviceWorker.getRegistration().then(function(reg){
        if(!reg){ pushState='noworker'; return paint(); }
        return reg.pushManager.getSubscription().then(function(sub){ pushState = sub ? 'on' : 'off'; paint(); });
      }).catch(function(){ pushState='unknown'; paint(); });
    }catch(e){ pushState='unknown'; }
  }

  function setupCard(){
    var p = perm(), on = p==='granted' && (state.alertsEnabled);
    var head, body, btn = '';
    if(p==='unsupported'){ head='Phone notifications unavailable'; body='This browser can’t show notifications. Open Coverage Desk in Chrome or Safari (added to the Home Screen).'; }
    else if(isIOS() && !standalone()){ head='Add to Home Screen first'; body='On iPhone, notifications only work from the installed app: tap Share → <b>Add to Home Screen</b>, open Coverage Desk from that icon, then come back here.'; }
    else if(p==='denied'){ head='Notifications are blocked'; body='Allow them for Coverage Desk in your phone’s Settings → Notifications (or the browser’s site settings), then reopen the app.'; }
    else if(!on){ head='Get alerts like any other app'; body='Turn on notifications to be alerted about unassigned calls and new alerts — even when the app is closed.'; btn='<button class="d8-btn primary" data-d8="enable">Turn on notifications</button>'; }
    else {
      head='Notifications are on';
      body = pushState==='on' ? 'Alerts reach this phone even with the app closed.' : pushState==='off' ? 'Alerts show while the app is open. Background alerts need re-subscribing — turn Alerts off and on in Reports.' : 'Alerts show while the app is open.';
      btn='<button class="d8-btn" data-d8="test">Send a test notification</button><button class="d8-btn ghost" data-d8="disable">Turn off</button>';
    }
    return '<div class="d8-setup '+(on?'ok':'')+'"><div class="d8-st"><span class="d8-dot"></span><b>'+head+'</b></div><p>'+body+'</p>'+(testMsg?'<p class="d8-test">'+esc(testMsg)+'</p>':'')+(btn?'<div class="d8-sb">'+btn+'</div>':'')+'</div>';
  }

  function paint(){
    if(!el) return;
    var A = api(), items = A ? A.items() : [];
    items.forEach(function(i){ if(i.snoozeUntil && i.snoozeUntil<=Date.now()){ try{ A.wake(i.id); if(window.cdShowNotification) window.cdShowNotification('Reminder: '+i.title, {body:i.body, tag:'cd-snz-'+i.id, data:{kind:'early', date:i.date}}); }catch(e){} } });
    items = A ? A.items().filter(function(i){ return !(i.snoozeUntil && i.snoozeUntil>Date.now()); }) : [];
    var un = items.filter(function(i){ return !i.read; }).length;
    var sc = $('.d8-list', el); var keep = sc ? sc.scrollTop : 0;
    var groups = [], last = '';
    items.sort(function(a,b){ return b.ts-a.ts; }).forEach(function(it){ var l = dayLabel(it.ts); if(l!==last){ groups.push({l:l,items:[]}); last=l; } groups[groups.length-1].items.push(it); });
    var list = groups.length ? groups.map(function(g){
      return '<div class="d8-day">'+esc(g.l)+'</div>'+g.items.map(function(it){
        var icon = ICON[it.type] || '🔔';
        return '<div class="d8-item'+(it.read?'':' unread')+'" data-lf-id="'+esc(it.id)+'" data-d8-open="'+esc(it.id)+'"><span class="d8-av">'+icon+'</span><div class="d8-main"><div class="d8-top"><b>'+esc(it.title)+'</b><time>'+esc(ago(it.ts))+'</time></div><div class="d8-body">'+esc(it.body)+'</div>'
          +'<div class="d8-acts">'+(canAssign(it)?'<button class="d8-act" data-lf-assign="'+esc(it.id)+'">Assign to '+esc(it.handler)+'</button>':'')+'<button class="d8-act soft" data-d8-snooze="'+esc(it.id)+'" data-ms="900000">⏰ 15 min</button><button class="d8-act soft" data-d8-snooze="'+esc(it.id)+'" data-ms="tomorrow">Tomorrow</button>'+(it.key?'<button class="d8-act soft" data-d8-done="'+esc(it.id)+'">✓ Done</button>':'')+'</div>'+'</div>'+(it.read?'':'<i class="d8-un"></i>')+'</div>';
      }).join('');
    }).join('') : '<div class="d8-empty"><div>🔔</div><b>No alerts yet</b><p>You’ll see them here when a candidate comes back after a long gap, a client’s calls all went to one person, or a call reaches a later round.</p></div>';
    el.innerHTML = '<div class="d8-sheet"><div class="d8-h"><b>Alerts</b>'+(un?'<span class="d8-pill">'+un+' new</span>':'')+'<span class="d8-sp"></span>'
      +'<button class="d8-link" data-d8="settings" aria-label="Alert settings">⚙</button>'+(items.length?'<button class="d8-link" data-d8="readall">Mark read</button><button class="d8-link" data-d8="clear">Clear</button>':'')
      +'<button class="d8-x" data-d8="close" aria-label="Close">✕</button></div>'
      +'<div class="d8-list">'+setupCard()+list+(items.length?'<p class="d8-hint">Swipe an alert sideways to remove it.</p>':'')+'</div></div>';
    var nl = $('.d8-list', el); if(nl) nl.scrollTop = keep;
  }
  function open(){
    if(el) return;
    el = document.createElement('div'); el.id='d8'; document.body.appendChild(el);
    document.body.classList.add('d8-open');
    el.addEventListener('click', onClick);
    paint(); refreshPush();
  }
  function close(){
    if(!el) return;
    try{ if(api()) api().markAllRead(); }catch(e){}
    el.remove(); el=null; document.body.classList.remove('d8-open'); testMsg='';
  }
  function onClick(e){
    var t = e.target;
    if(t===el){ close(); return; }
    var d = t.closest('[data-d8]');
    if(d){
      var k = d.dataset.d8;
      if(k==='close') close();
      else if(k==='settings'){ if(window.d11Settings) window.d11Settings(); }
      else if(k==='readall'){ api() && api().markAllRead(); }
      else if(k==='clear'){ if(confirm('Remove all alerts?')) api() && api().clear(); }
      else if(k==='enable'){ Promise.resolve(typeof toggleTimeSensitiveAlerts==='function' ? toggleTimeSensitiveAlerts() : null).then(function(){ refreshPush(); paint(); }); }
      else if(k==='disable'){ Promise.resolve(toggleTimeSensitiveAlerts()).then(function(){ refreshPush(); paint(); }); }
      else if(k==='test'){
        testMsg = 'Sending…'; paint();
        (window.cdShowNotification ? window.cdShowNotification('Coverage Desk — test', { body:'If you can see this in your notification tray, phone notifications are working.', tag:'cd-test' }) : Promise.resolve(false))
          .then(function(ok){ testMsg = ok ? 'Sent — check your notification tray (pull down from the top).' : 'Couldn’t show a notification on this device.'; paint(); });
      }
      return;
    }
    var dn = t.closest('[data-d8-done]'); if(dn){ e.stopPropagation(); if(window.livefeedRemoveItem) window.livefeedRemoveItem(dn.dataset.d8Done); if(window.d2Toast) window.d2Toast('Marked done — won\u2019t remind again',{ms:2500}); paint(); return; }
    var sn = t.closest('[data-d8-snooze]'); if(sn){ e.stopPropagation(); var ms = sn.dataset.ms==='tomorrow' ? (function(){ var d=new Date(); d.setDate(d.getDate()+1); d.setHours(9,0,0,0); return d-Date.now(); })() : (+sn.dataset.ms||900000); if(api() && api().snooze) api().snooze(sn.dataset.d8Snooze, ms); if(window.d2Toast) window.d2Toast(sn.dataset.ms==='tomorrow'?'Snoozed until tomorrow 9 AM':'Snoozed for 15 minutes',{ms:3000}); paint(); return; }
    if(t.closest('[data-lf-assign]')){ setTimeout(paint, 250); return; }   // app handles the assignment itself
    var row = t.closest('[data-d8-open]'); if(!row) return;
    var id = row.dataset.d8Open, it = api() && api().items().filter(function(x){ return x.id===id; })[0];
    if(api()) api().markRead(id);
    close();
    if(it && it.gdoc && window.d14Open){ window.d14Open(); return; }
    if(it && window.cdOpenFromNotification) window.cdOpenFromNotification({ date: it.date, candidate: it.candidate });
  }
  window.addEventListener('livefeed-change', function(){ if(el) paint(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && el) close(); });

  // phone: the bottom-bar "Alerts" tab opens this inbox instead of the repeat-candidate list
  document.addEventListener('click', function(e){
    var n = e.target.closest && e.target.closest('#navAlerts'); if(!n) return;
    if(window.__d17vw>=900 || !api()) return;
    e.stopPropagation(); e.preventDefault(); if(el) close(); else open();
  }, true);
  window.d8Open = open;
  setInterval(function(){ try{ var A=api(); if(A){ A.items().forEach(function(i){ if(i.snoozeUntil && i.snoozeUntil<=Date.now()){ A.wake(i.id); if(window.cdShowNotification) window.cdShowNotification('Reminder: '+i.title,{body:i.body,tag:'cd-snz-'+i.id,data:{kind:'early',date:i.date}}); if(el) paint(); } }); } }catch(e){} }, 20000);

  // unread count on the bottom-bar tab (like a chat-app badge)
  function badge(){
    var n = $('#navAlerts'); if(!n) return;
    var A = api(), c = A ? A.unread() : 0, b = $('.d8-count', n);
    if(!c){ if(b) b.remove(); return; }
    if(!b){ b = document.createElement('span'); b.className='d8-count'; n.appendChild(b); }
    b.textContent = c>9 ? '9+' : String(c);
  }
  window.addEventListener('livefeed-change', badge);
  var origRender;
  function install(){
    if(typeof window.render!=='function' || !window.__keepScroll){ return setTimeout(install,60); }
    origRender = window.render;
    window.render = function(){ var r = origRender.apply(this, arguments); try{ badge(); }catch(e){} return r; };
    badge();
    // opened from a tapped notification while the app was closed: ?cd_date=…&cd_cand=…
    try{
      var q = new URLSearchParams(location.search), dt = q.get('cd_date'), cd = q.get('cd_cand');
      if(q.get('cd_open') === 'gdoc'){
        history.replaceState(null,'',location.pathname);
        var tg = 0, wg = setInterval(function(){ tg++; var rd = (typeof state!=='undefined') && !state.needsLogin && (state.rows||[]).length; if((rd || tg>8) && window.d14Open){ clearInterval(wg); window.d14Open(); } if(tg>40) clearInterval(wg); }, 500);
      }
      if(dt || cd){
        history.replaceState(null,'',location.pathname);
        var tries = 0, wait = setInterval(function(){
          tries++;
          var ready = (typeof state!=='undefined') && !state.needsLogin && (state.rows||[]).length;
          if(ready || tries>40){ clearInterval(wait); if(window.cdOpenFromNotification) window.cdOpenFromNotification({ date: dt||'', candidate: cd||'' }); }
        }, 500);
      }
    }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== mobile quick-assign sheet (simple: tap the assignee pill, pick a person) ===== */
(function(){
  'use strict';
  if(window.__m9) return; window.__m9 = true;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var isAdmin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  var el = null, rid = null, q = '', all = false;

  function rankFor(r){ try{ return window.d2Rank ? window.d2Rank(r) : []; }catch(e){ return []; } }
  function sub(h){
    if(h.absent) return '<em class="bad">absent</em>';
    if(h.clash)  return '<em class="bad">⚠ clash '+esc(h.clash.time||'')+'</em>';
    return '<em class="ok">free</em>';
  }
  function item(h, r){
    var cur = (r.assignee||'')===h.name;
    return '<button type="button" class="m9-i'+(cur?' cur':'')+(h.absent||h.clash?' warn':'')+'" data-m9="'+esc(h.name)+'"><span class="m9-av'+(h.isTeam?' team':'')+'">'+(h.isTeam?'◆':esc(h.name.charAt(0).toUpperCase()))+'</span>'
      +'<span class="m9-n"><b>'+esc(h.name)+'</b><small>'+h.load+' call'+(h.load===1?'':'s')+(h.prior?' · ↻ handled this before':'')+(h.isTeam?' · team':'')+'</small></span>'+(cur?'<span class="m9-ck">✓</span>':sub(h))+'</button>';
  }
  function paint(){
    if(!el) return;
    var r = (state.rows||[]).find(function(x){ return x.id===rid; }); if(!r){ close(); return; }
    var list = rankFor(r), s = q.trim().toLowerCase(), body = '';
    if(s){
      var f = list.filter(function(h){ return h.name.toLowerCase().indexOf(s)>=0 || String(h.team||'').toLowerCase().indexOf(s)>=0; });
      body = f.length ? f.map(function(h){ return item(h,r); }).join('') : '<p class="m9-none">No one matches “'+esc(q)+'”.</p>';
    } else {
      var people = list.filter(function(h){ return !h.isTeam; }), teams = list.filter(function(h){ return h.isTeam; });
      var top = people.slice(0,5), rest = people.slice(5);
      body = '<div class="m9-sec">Suggested</div>'+top.map(function(h){ return item(h,r); }).join('')
        + (teams.length ? '<div class="m9-sec">Teams</div>'+teams.map(function(h){ return item(h,r); }).join('') : '')
        + (rest.length ? (all ? '<div class="m9-sec">Everyone else</div>'+rest.map(function(h){ return item(h,r); }).join('') : '<button type="button" class="m9-more" data-m9x="all">Show everyone ('+rest.length+' more)</button>') : '');
    }
    var keep = $('.m9-list', el) ? $('.m9-list', el).scrollTop : 0;
    el.innerHTML = '<div class="m9-sheet"><div class="m9-grab"><i></i></div><div class="m9-h"><div><b>Assign</b><small>'+esc((r.time||'')+(r.candidate?' · '+r.candidate:'')+(r.company?' · '+r.company:''))+'</small></div><button type="button" class="m9-x" data-m9x="close" aria-label="Close">✕</button></div>'
      +'<input class="m9-q" type="search" placeholder="Search a name…" value="'+esc(q)+'" autocomplete="off" enterkeyhint="search">'
      +'<div class="m9-list">'+body+'</div>'
      +(r.assignee?'<div class="m9-foot"><button type="button" class="m9-un" data-m9x="un">Unassign ('+esc(r.assignee)+')</button></div>':'')+'</div>';
    var l = $('.m9-list', el); if(l) l.scrollTop = keep;
  }
  function open(id){
    rid = id; q = ''; all = false;
    if(!el){ el = document.createElement('div'); el.id='m9'; document.body.appendChild(el); document.body.classList.add('m9-open'); }
    paint();
  }
  function close(){ if(el){ el.remove(); el = null; document.body.classList.remove('m9-open'); } rid = null; }
  window.m9Open = open;

  document.addEventListener('click', function(e){
    var t = e.target; if(!t.closest) return;
    var pill = t.closest('button.m-as[data-m="assign"]');
    if(pill){
      var tr = pill.closest('tr'); if(!tr) return;
      e.stopPropagation(); e.preventDefault();
      if(isAdmin()) open(tr.dataset.id); else if(window.d5OpenSide) window.d5OpenSide(tr.dataset.id);
      return;
    }
    if(!el) return;
    if(t===el){ close(); return; }
    var x = t.closest('[data-m9x]');
    if(x){
      var k = x.dataset.m9x;
      if(k==='close') close();
      else if(k==='all'){ all = true; paint(); }
      else if(k==='un'){ var id0 = rid; close(); if(window.d2AssignTo) window.d2AssignTo(id0,''); if(window.d2Toast) window.d2Toast('Unassigned'); }
      return;
    }
    var p = t.closest('[data-m9]');
    if(p){
      var id = rid, name = p.dataset.m9; close();
      if(window.d2AssignTo) window.d2AssignTo(id, name);
      if(window.d2Toast) window.d2Toast('Assigned to '+name);
    }
  }, true);
  document.addEventListener('input', function(e){ if(el && e.target.classList && e.target.classList.contains('m9-q')){ q = e.target.value; var pos = e.target.selectionStart; paint(); var n = $('.m9-q', el); if(n){ n.focus(); try{ n.setSelectionRange(pos,pos); }catch(x){} } } });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && el) close(); });
})();

/* ===== keep every device fresh: re-check the server when the app comes back / on a timer ===== */
(function(){
  'use strict';
  if(window.__sync) return; window.__sync = true;
  var sigs = {}, busy = false, lastRun = 0;
  var hash = function(str){ var h = 5381, i = str.length; while(i) h = (h*33) ^ str.charCodeAt(--i); return (h>>>0)+':'+str.length; };
  var WATCH = { calls:1, call_status:1, notes:1 };

  function install(){
    if(typeof window.apiCall!=='function' || typeof window.loadDay!=='function'){ return setTimeout(install,100); }
    var orig = window.apiCall;
    window.apiCall = function(resource, opts){
      var p = orig.apply(this, arguments);
      try{
        if(WATCH[resource] && (!opts || !opts.method || opts.method==='GET') && opts && opts.qs){
          var key = resource+'|'+opts.qs;
          p.then(function(d){ try{ sigs[key] = hash(JSON.stringify(d && d.rows || [])); }catch(e){} }, function(){});
        }
      }catch(e){}
      return p;
    };
    document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='visible') poll(true); });
    window.addEventListener('focus', function(){ poll(true); });
    window.addEventListener('pageshow', function(e){ if(e.persisted) poll(true); });
    window.addEventListener('online', function(){ poll(true); });
    setInterval(function(){ poll(false); }, 45000);
  }

  function idle(){
    try{
      if(document.visibilityState!=='visible') return false;
      if(!API_BASE_URL || state.needsLogin || state.dirty || state.saving) return false;
      if(state.offlineQueue && Object.keys(state.offlineQueue).length) return false;
      var a = document.activeElement;
      if(a && /^(input|textarea|select)$/i.test(a.tagName) && a.closest && a.closest('#tableScrollMain,#d5Side,#m9')) return false;
      if(document.getElementById('m9') || document.querySelector('.my-name-picker-overlay')) return false;
      return true;
    }catch(e){ return false; }
  }

  function poll(force){
    var now = Date.now();
    if(busy || now-lastRun < (force?4000:20000) || !idle()) return;
    busy = true; lastRun = now;
    var date = state.date, qs = 'date='+date, before = {};
    Object.keys(WATCH).forEach(function(r){ before[r] = sigs[r+'|'+qs]; });
    Promise.all(Object.keys(WATCH).map(function(r){ return window.apiCall(r, {qs:qs}).catch(function(){ return null; }); }))
      .then(function(){ return new Promise(function(res){ setTimeout(res,30); }); })
      .then(function(){
        var changed = Object.keys(WATCH).some(function(r){ var b = before[r], a = sigs[r+'|'+qs]; return b!==undefined && a!==undefined && a!==b; });
        if(!changed || state.date!==date || !idle()) return;
        return window.loadDay(date).then(function(){ render(); if(window.d2Toast) window.d2Toast('Updated — new changes from another device'); });
      })
      .catch(function(e){ console.warn('sync',e); })
      .then(function(){ busy = false; });
  }
  window.syncNow = function(){ lastRun = 0; poll(true); };
  install();
})();

/* undo pop-up (deleted call): ✕ dismisses it — the removal stays, the Undo goes away */
document.addEventListener('click', function(e){
  var b = e.target.closest && e.target.closest('#undoDismissBtn'); if(!b) return;
  e.stopPropagation();
  try{ if(typeof undoToastTimer!=='undefined') clearTimeout(undoToastTimer); state.lastDeleted = null; render(); }catch(x){ var t=b.closest('.undo-toast'); if(t) t.remove(); }
}, true);

/* ===== Workspace: day board, kanban, smart lists, directory, workload, digest, history + comments, escalation, offline copy ===== */
(function(){
  'use strict';
  if(window.__d10) return; window.__d10 = true;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var LS = { get:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }, set:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
  var isAdmin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  var rows = function(){ try{ return state.rows||[]; }catch(e){ return []; } };
  var toast = function(m,o){ if(window.d2Toast) window.d2Toast(m,o); };
  var tmin = function(t){ try{ return timeToMinutes(t); }catch(e){ return 9999; } };
  var bdm = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var dur = function(r){ try{ return parseDurationMinutes(r.duration)||30; }catch(e){ return 30; } };
  var late = function(r){ var m = tmin(r.time); return m!==9999 && (m>=1320 || m<360); };
  var teams = function(){ try{ return getTeamNames(); }catch(e){ return new Set(); } };
  var coarse = function(){ try{ return window.matchMedia('(pointer:coarse)').matches || window.__d17vw<900; }catch(e){ return window.__d17vw<900; } };
  var asg = function(r){ var a = String(r.assignee||'').trim(); return /^unassigned$/i.test(a) ? '' : a; };
  var nowMin = function(){ var d = new Date(); return d.getHours()*60+d.getMinutes(); };
  var isToday = function(){ try{ return state.date===todayDateString(); }catch(e){ return false; } };
  var el = null, tab = 'board', open = false, dragId = null;
  var TABS = [['board','Day board'],['kanban','Kanban'],['lists','Smart lists'],['directory','Directory'],['workload','Workload'],['digest','Digest'],['history','History']];

  /* ---------- cards ---------- */
  function card(r, clash){
    var tag = r.woi ? '<em class="d10-t amber">WOI</em>' : r.status ? '<em class="d10-t coral">'+esc((window.statusBadgeInfo?statusBadgeInfo(r.status).shortLabel:r.status))+'</em>' : '';
    var rd = String(r.round||''); var rt = (/1/.test(rd)||!rd) ? '' : '<em class="d10-t violet">'+esc(rd.replace(/\s*round/i,''))+'</em>';
    return '<div class="d10-c'+(clash?' clash':'')+(late(r)?' late':'')+'" draggable="'+(isAdmin()&&!coarse()?'true':'false')+'" data-d10c="'+esc(r.id)+'"><div class="d10-c1"><b>'+esc(r.time||'—')+'</b>'+rt+tag+(clash?'<em class="d10-t coral">⚠ clash</em>':'')+'</div><div class="d10-c2">'+esc(r.candidate||'(no name)')+'</div><div class="d10-c3">'+esc([r.company, r.duration].filter(Boolean).join(' · '))+'</div></div>';
  }
  function clashSet(list){
    var s = {}; list.forEach(function(a){ list.forEach(function(b){ if(a.id===b.id||a.woi||b.woi) return; var as=bdm(a.time), bs=bdm(b.time); if(as===9999||bs===9999) return; if(as<bs+dur(b) && bs<as+dur(a)){ s[a.id]=1; s[b.id]=1; } }); });
    return s;
  }
  function sortT(a,b){ return bdm(a.time)-bdm(b.time); }
  function col(title, list, key, opts){
    opts = opts||{};
    var cs = opts.person ? clashSet(list) : {};
    var mins = list.reduce(function(n,r){ return n+dur(r); },0);
    return '<div class="d10-col'+(opts.cls?' '+opts.cls:'')+'" data-d10col="'+esc(key)+'"><div class="d10-ch"><b>'+esc(title)+'</b><span>'+list.length+(opts.person&&list.length?' · '+Math.round(mins/6)/10+'h':'')+'</span></div><div class="d10-cb">'+(list.sort(sortT).map(function(r){ return card(r, !!cs[r.id]); }).join('')||'<p class="d10-empty">Drop a call here</p>')+'</div></div>';
  }

  /* ---------- tabs ---------- */
  function vBoard(){
    var rs = rows(), t = teams(), by = {}, un = [], woi = [];
    rs.forEach(function(r){ if(r.woi) woi.push(r); else if(!asg(r)) un.push(r); else (by[asg(r)]=by[asg(r)]||[]).push(r); });
    var names = Object.keys(by).sort(function(a,b){ return (t.has(a)-t.has(b)) || by[b].length-by[a].length || a.localeCompare(b); });
    return '<p class="d10-hint">'+(coarse()?'Tap a call to assign it.':'Drag a call onto another person to reassign it.')+' Each column is one handler’s day in time order; ⚠ marks overlapping calls.</p><div class="d10-board">'
      + col('Unassigned', un, '', {cls:'un'}) + (woi.length?col('Waiting for invite', woi, '__woi', {cls:'woi'}):'')
      + names.map(function(n){ return col(n, by[n], n, {person:!t.has(n), cls:t.has(n)?'team':''}); }).join('') + '</div>';
  }
  function vKanban(){
    var rs = rows(), c = {un:[], as:[], woi:[], st:[]};
    rs.forEach(function(r){ if(r.status) c.st.push(r); else if(r.woi) c.woi.push(r); else if(asg(r)) c.as.push(r); else c.un.push(r); });
    return '<p class="d10-hint">'+(coarse()?'Tap a call to assign it.':'Drag between columns: Unassigned ⇄ Assigned ⇄ Waiting for invite.')+' Rescheduled / cancelled / no-response calls are set from the call’s ⋯ menu.</p><div class="d10-board k">'
      + col('Unassigned', c.un, '__k_un', {cls:'un'}) + col('Assigned', c.as, '__k_as') + col('Waiting for invite', c.woi, '__k_woi', {cls:'woi'}) + col('Rescheduled · cancelled · no response', c.st, '__k_st', {cls:'ro'}) + '</div>';
  }
  var listDefs = function(){
    var rs = rows(), my = ''; try{ my = localStorage.getItem('coverage-desk-my-name')||''; }catch(e){}
    var n = nowMin(), today = isToday();
    var cf = {}; (function(){ var by={}; rs.forEach(function(r){ if(r.woi||!asg(r)||teams().has(asg(r))) return; (by[asg(r)]=by[asg(r)]||[]).push(r); }); Object.keys(by).forEach(function(k){ var s=clashSet(by[k]); Object.keys(s).forEach(function(id){ cf[id]=1; }); }); })();
    return [
      ['Unassigned', '🟥', rs.filter(function(r){ return !asg(r) && !r.woi && !r.status; })],
      ['Starting in the next 2 hours', '⏰', today ? rs.filter(function(r){ var m=tmin(r.time); return !r.status && m!==9999 && m-n>=-10 && m-n<=120; }) : []],
      ['My calls'+(my?' ('+my+')':''), '🙋', my ? rs.filter(function(r){ return asg(r)===my; }) : []],
      ['2nd round+ with no interviewer noted', '🎙', rs.filter(function(r){ var rd=String(r.round||''); return rd && !/^1/.test(rd) && !String(r.interviewer||'').trim() && !r.status; })],
      ['Late night (10 PM – 6 AM)', '🌙', rs.filter(function(r){ return late(r) && !r.status; })],
      ['Double-booked handlers', '⚠', rs.filter(function(r){ return cf[r.id]; })],
      ['Waiting for invite', '⏳', rs.filter(function(r){ return r.woi; })],
      ['Has an open doubt', '❔', rs.filter(function(r){ return (r.doubts||[]).length; })]
    ];
  };
  var openList = -1;
  function vLists(){
    var defs = listDefs(), my = ''; try{ my = localStorage.getItem('coverage-desk-my-name')||''; }catch(e){}
    return '<p class="d10-hint">Tap a tile to see the calls. Counts are for '+esc(state.date)+'.</p><div class="d10-tiles">'+defs.map(function(d,i){
      return '<button type="button" class="d10-tile'+(i===openList?' on':'')+(d[2].length?'':' zero')+'" data-d10tile="'+i+'"><span>'+d[1]+'</span><b>'+d[2].length+'</b><small>'+esc(d[0])+'</small></button>';
    }).join('')+'</div>'+(openList>=0&&defs[openList]?'<div class="d10-list"><h4>'+esc(defs[openList][0])+'</h4>'+(defs[openList][2].sort(sortT).map(function(r){ return '<button type="button" class="d10-li" data-d10open="'+esc(r.id)+'"><b>'+esc(r.time||'—')+'</b><span>'+esc(r.candidate||'(no name)')+'<small>'+esc([r.company,asg(r)||'unassigned'].filter(Boolean).join(' · '))+'</small></span></button>'; }).join('')||'<p class="d10-empty">'+(openList===2&&!my?'Set your name first (tap your name chip on the main screen).':'Nothing here — all clear.')+'</p>')+'</div>':'');
  }
  var dirQ = '', dirData = null, dirBusy = false;
  function allRows(){ return (typeof fetchAllRowsAcrossDates==='function') ? fetchAllRowsAcrossDates(false) : Promise.resolve([]); }
  function buildDir(all){
    var m = {};
    (all||[]).forEach(function(r){
      ['interviewer','technicalPOC'].forEach(function(k){
        String(r[k]||'').split(/[,;\/&]|\band\b/i).map(function(x){ return x.trim(); }).filter(function(x){ return x.length>1; }).forEach(function(nm){
          var key = nm.toLowerCase(), o = m[key] = m[key] || {name:nm, n:0, co:{}, hr:{}, hand:{}, last:'', kind:{}};
          o.n++; o.kind[k]=1; if(r.company) o.co[r.company]=(o.co[r.company]||0)+1;
          var mm = tmin(r.time); if(mm!==9999){ var h=Math.floor(mm/60); o.hr[h]=(o.hr[h]||0)+1; }
          if(asg(r)) o.hand[asg(r)]=(o.hand[asg(r)]||0)+1; if(String(r._date||'')>o.last) o.last=r._date;
        });
      });
    });
    return Object.keys(m).map(function(k){ return m[k]; }).sort(function(a,b){ return b.n-a.n; });
  }
  var top = function(o,n){ return Object.keys(o).sort(function(a,b){ return o[b]-o[a]; }).slice(0,n); };
  var hl = function(h){ h=+h; return ((h%12)||12)+(h<12?' AM':' PM'); };
  function vDirectory(){
    if(!dirData){ if(!dirBusy){ dirBusy = true; allRows().then(function(a){ dirData = buildDir(a); dirBusy = false; if(open && tab==='directory') paint(); }).catch(function(){ dirData = []; dirBusy=false; if(open) paint(); }); } return '<p class="d10-hint">Loading interviewers from every date…</p>'; }
    var q = dirQ.trim().toLowerCase(), list = dirData.filter(function(o){ return !q || o.name.toLowerCase().indexOf(q)>=0 || Object.keys(o.co).join(' ').toLowerCase().indexOf(q)>=0; });
    return '<p class="d10-hint">Built from the Interviewer and Technical POC notes on your calls (all dates).</p><input class="d10-q" data-d10q="dir" type="search" placeholder="Search interviewer, POC or client…" value="'+esc(dirQ)+'">'
      + (list.length ? '<div class="d10-dir">'+list.slice(0,80).map(function(o){ var hs=top(o.hr,2).map(function(h){ return hl(h); }).join(', '); return '<div class="d10-p"><div class="d10-pn"><b>'+esc(o.name)+'</b><span>'+o.n+' call'+(o.n===1?'':'s')+'</span></div><div class="d10-pm">'+esc(top(o.co,3).join(' · '))+'</div><div class="d10-pm">'+(hs?'Usually around '+esc(hs)+' · ':'')+(top(o.hand,3).length?'Handled by '+esc(top(o.hand,3).join(', ')):'')+(o.last?' · last '+esc(o.last):'')+'</div></div>'; }).join('')+'</div>' : '<p class="d10-empty">'+(dirData.length?'No match.':'No interviewer or POC names have been noted yet — add them from a call’s 📌 / Interviewer & POC field.')+'</p>');
  }
  var wlDays = 7, wlData = null, wlBusy = false;
  function cutoff(n){ var d = new Date(); d.setDate(d.getDate()-n); var p=function(x){ return (x<10?'0':'')+x; }; return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate()); }
  function buildWl(all, days){
    var c = cutoff(days), t = teams(), m = {}, teamCalls = 0;
    (all||[]).forEach(function(r){ if(!r._date || r._date<c || r.woi || r.status) return; if(!asg(r)) return; if(t.has(asg(r))){ teamCalls++; return; } var o = m[asg(r)] = m[asg(r)] || {name:asg(r), n:0, l:0}; o.n++; if(late(r)) o.l++; });
    var list = Object.keys(m).map(function(k){ return m[k]; }).sort(function(a,b){ return b.n-a.n; });
    return {list:list, teamCalls:teamCalls};
  }
  function vWorkload(){
    var ctl = '<div class="d10-seg">'+[7,14,30].map(function(n){ return '<button type="button" data-d10wl="'+n+'" class="'+(wlDays===n?'on':'')+'">'+n+' days</button>'; }).join('')+'</div>';
    if(!wlData || wlData.days!==wlDays){ if(!wlBusy){ wlBusy=true; var dd = wlDays; allRows().then(function(a){ wlData = Object.assign(buildWl(a, dd), {days:dd}); wlBusy=false; if(open && tab==='workload') paint(); }).catch(function(){ wlData={list:[],teamCalls:0,days:dd}; wlBusy=false; if(open) paint(); }); } return ctl+'<p class="d10-hint">Counting calls…</p>'; }
    var L = wlData.list; if(!L.length) return ctl+'<p class="d10-empty">No assigned calls in this period.</p>';
    var max = Math.max.apply(null, L.map(function(o){ return o.n; })), avg = L.reduce(function(s,o){ return s+o.n; },0)/L.length;
    return ctl+'<p class="d10-hint">Calls per person over the last '+wlDays+' days (people only; reschedules/cancels excluded). Purple part = late-night calls. Average: <b>'+avg.toFixed(1)+'</b>.</p><div class="d10-bars">'+L.map(function(o){ var f = o.n>avg*1.4 ? '<em class="bad">heavy</em>' : o.n<avg*0.6 ? '<em class="ok">light</em>' : '';
      return '<div class="d10-bar"><span class="d10-bn">'+esc(o.name)+'</span><span class="d10-bt"><i style="width:'+(o.n/max*100)+'%"><u style="width:'+(o.n?o.l/o.n*100:0)+'%"></u></i></span><span class="d10-bv">'+o.n+(o.l?' <small>('+o.l+' late)</small>':'')+'</span>'+f+'</div>'; }).join('')+'</div>'+(wlData.teamCalls?'<p class="d10-hint">Plus '+wlData.teamCalls+' call(s) assigned to a team rather than a person.</p>':'');
  }
  function digestText(){
    var rs = rows(), t = teams(), n = rs.length, un = rs.filter(function(r){ return !asg(r) && !r.woi && !r.status; }).length, woi = rs.filter(function(r){ return r.woi; }).length;
    var by = {}; rs.forEach(function(r){ if(asg(r) && !r.status && !r.woi) by[asg(r)]=(by[asg(r)]||0)+1; });
    var st = {}; rs.forEach(function(r){ if(r.status) st[r.status]=(st[r.status]||0)+1; });
    var co = {}; rs.forEach(function(r){ if(r.company) co[r.company]=(co[r.company]||0)+1; });
    var cf = Object.keys(clashSet(rs.filter(function(r){ return asg(r) && !t.has(asg(r)); }))).length;
    var lines = ['Coverage Desk — '+state.date, '', 'Total calls: '+n, 'Unassigned: '+un+' · Waiting for invite: '+woi+' · Late night: '+rs.filter(late).length+' · Double-booked: '+cf];
    var sl = Object.keys(st).map(function(k){ return (window.statusBadgeInfo?statusBadgeInfo(k).label:k)+': '+st[k]; }); if(sl.length) lines.push('Outcomes — '+sl.join(' · '));
    lines.push('', 'Workload by handler:'); Object.keys(by).sort(function(a,b){ return by[b]-by[a]; }).forEach(function(k){ lines.push('• '+k+' — '+by[k]); });
    lines.push('', 'Busiest clients: '+top(co,5).map(function(k){ return k+' ('+co[k]+')'; }).join(', '));
    var open = rs.filter(function(r){ return (!asg(r) && !r.woi && !r.status); }).sort(sortT).slice(0,8); if(open.length){ lines.push('', 'Still to assign:'); open.forEach(function(r){ lines.push('• '+(r.time||'?')+' '+(r.candidate||'')+' — '+(r.company||'')); }); }
    return lines.join('\n');
  }
  function vDigest(){ return '<p class="d10-hint">A ready-to-send end-of-shift summary for '+esc(state.date)+'.</p><pre class="d10-pre" id="d10Pre">'+esc(digestText())+'</pre><div class="d10-row"><button type="button" class="d10-b primary" data-d10a="copy">Copy</button>'+(navigator.share?'<button type="button" class="d10-b" data-d10a="share">Share…</button>':'')+'</div>'; }
  function getLog(){ try{ return JSON.parse(LS.get('cd.d10.log','[]'))||[]; }catch(e){ return []; } }
  function vHistory(){
    var L = getLog().slice().reverse();
    return '<p class="d10-hint">Changes made on <b>this device</b> (last 100). Use Undo for the latest one, or restore a full day from a backup.</p><div class="d10-row"><button type="button" class="d10-b primary" data-d10a="undo">↶ Undo last change</button><button type="button" class="d10-b" data-d10a="backups">Open backups</button><button type="button" class="d10-b ghost" data-d10a="clearlog">Clear log</button></div>'
      + (L.length ? '<div class="d10-log">'+L.map(function(e){ var d=new Date(e.at); return '<div><time>'+esc(d.toLocaleDateString(undefined,{day:'numeric',month:'short'})+' '+d.toLocaleTimeString([], {hour:'numeric',minute:'2-digit'}))+'</time><span>'+esc(e.msg)+'<small>'+esc((e.by?e.by+' · ':'')+'call day '+e.date)+'</small></span></div>'; }).join('')+'</div>' : '<p class="d10-empty">No changes recorded yet.</p>');
  }
  function body(){
    if(tab==='board') return vBoard(); if(tab==='kanban') return vKanban(); if(tab==='lists') return vLists();
    if(tab==='directory') return vDirectory(); if(tab==='workload') return vWorkload(); if(tab==='digest') return vDigest(); return vHistory();
  }
  function paint(){
    if(!el) return;
    var sc = $('.d10-body', el), keep = sc ? sc.scrollTop : 0, board = $('.d10-board', el), bl = board ? board.scrollLeft : 0;
    el.innerHTML = '<div class="d10-sheet"><div class="d10-h"><b>Workspace</b><span class="d10-date">'+esc(state.date)+'</span><span class="d10-sp"></span><button type="button" class="d10-x" data-d10a="close" aria-label="Close">✕</button></div><div class="d10-tabs">'+TABS.map(function(t){ return '<button type="button" data-d10t="'+t[0]+'" class="'+(t[0]===tab?'on':'')+'">'+t[1]+'</button>'; }).join('')+'</div><div class="d10-body">'+body()+'</div></div>';
    var s2 = $('.d10-body', el); if(s2) s2.scrollTop = keep; var b2 = $('.d10-board', el); if(b2) b2.scrollLeft = bl;
  }
  function openW(t){
    if(t) tab = t; open = true;
    if(!el){ el = document.createElement('div'); el.id='d10'; document.body.appendChild(el); document.body.classList.add('d10-open'); }
    paint();
  }
  function closeW(){ open = false; if(el){ el.remove(); el = null; } document.body.classList.remove('d10-open'); }
  window.d10Open = openW;

  /* ---------- assign helpers ---------- */
  function chooseAssignee(id, anchor){ if(coarse() && window.m9Open) window.m9Open(id); else if(window.d2OpenAssign) window.d2OpenAssign(id, anchor||document.body); }
  function dropTo(id, key, anchor){
    var r = rows().filter(function(x){ return x.id===id; })[0]; if(!r || !isAdmin()) return;
    var set = function(a, w){ r.assignee = a; r.woi = !!w; try{ markDirty(); }catch(e){} render(); };
    if(key==='' || key==='__k_un'){ if(!asg(r) && !r.woi) return; set('', false); toast('Unassigned '+(r.candidate||'call'),{ms:3000}); }
    else if(key==='__woi' || key==='__k_woi'){ if(r.woi) return; set('', true); toast((r.candidate||'Call')+' → waiting for invite',{ms:3000}); }
    else if(key==='__k_as'){ if(asg(r) && !r.woi) return; chooseAssignee(id, anchor); }
    else if(key==='__k_st'){ toast('Set rescheduled / cancelled from the call’s ⋯ menu.',{ms:3500}); }
    else if(asg(r)!==key){ if(window.d2AssignTo) window.d2AssignTo(id, key); else set(key,false); }
  }

  /* ---------- events ---------- */
  document.addEventListener('click', function(e){
    if(!el) return; var t = e.target; if(!t.closest) return;
    if(t===el){ closeW(); return; }
    var a = t.closest('[data-d10a]');
    if(a){
      var k = a.dataset.d10a;
      if(k==='close') closeW();
      else if(k==='copy'){ var tx = digestText(); (navigator.clipboard?navigator.clipboard.writeText(tx):Promise.reject()).then(function(){ toast('Digest copied'); }).catch(function(){ var p=$('#d10Pre'); if(p){ var r=document.createRange(); r.selectNodeContents(p); var s=getSelection(); s.removeAllRanges(); s.addRange(r); toast('Selected — press copy'); } }); }
      else if(k==='share'){ try{ navigator.share({title:'Coverage Desk digest', text:digestText()}); }catch(x){} }
      else if(k==='undo'){ if(window.d2Undo){ window.d2Undo(); paint(); } }
      else if(k==='backups'){ closeW(); var b = document.getElementById('toggleBackups'); if(b) b.click(); else toast('Open Reports → Backups'); }
      else if(k==='clearlog'){ LS.set('cd.d10.log','[]'); paint(); }
      return;
    }
    var tb = t.closest('[data-d10t]'); if(tb){ tab = tb.dataset.d10t; paint(); return; }
    var wl = t.closest('[data-d10wl]'); if(wl){ wlDays = +wl.dataset.d10wl; wlData = null; paint(); return; }
    var tile = t.closest('[data-d10tile]'); if(tile){ var i = +tile.dataset.d10tile; openList = (openList===i?-1:i); paint(); return; }
    var op = t.closest('[data-d10open]'); if(op){ var id = op.dataset.d10open; closeW(); setTimeout(function(){ if(window.d5OpenSide) window.d5OpenSide(id); var tr = $('#tableScrollMain tr[data-id="'+id+'"]'); if(tr) tr.scrollIntoView({block:'center',behavior:'smooth'}); },60); return; }
    var c = t.closest('[data-d10c]'); if(c && !dragId){ if(isAdmin()) chooseAssignee(c.dataset.d10c, c); else if(window.d5OpenSide){ var cid=c.dataset.d10c; closeW(); window.d5OpenSide(cid); } }
  }, true);
  document.addEventListener('input', function(e){ if(el && e.target.dataset && e.target.dataset.d10q==='dir'){ dirQ = e.target.value; var pos=e.target.selectionStart; paint(); var q=$('.d10-q',el); if(q){ q.focus(); try{ q.setSelectionRange(pos,pos); }catch(x){} } } });
  document.addEventListener('dragstart', function(e){ var c = e.target.closest && e.target.closest('[data-d10c]'); if(!c) return; dragId = c.dataset.d10c; try{ e.dataTransfer.setData('text/plain', dragId); e.dataTransfer.effectAllowed='move'; }catch(x){} c.classList.add('drag'); });
  document.addEventListener('dragend', function(){ dragId = null; $$('.d10-c.drag,.d10-col.over').forEach(function(n){ n.classList.remove('drag','over'); }); });
  document.addEventListener('dragover', function(e){ var c = e.target.closest && e.target.closest('[data-d10col]'); if(!c || !dragId) return; e.preventDefault(); $$('.d10-col.over').forEach(function(n){ if(n!==c) n.classList.remove('over'); }); c.classList.add('over'); });
  document.addEventListener('drop', function(e){ var c = e.target.closest && e.target.closest('[data-d10col]'); if(!c || !dragId) return; e.preventDefault(); var id = dragId; dragId = null; c.classList.remove('over'); dropTo(id, c.dataset.d10col, c); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && el && !$('.d2-pop,#m9')) closeW(); });

  /* ---------- history log (hooks the Undo toast) ---------- */
  function hookToast(){
    if(!window.d2Toast || window.d2Toast.__d10) return setTimeout(hookToast,200);
    var o = window.d2Toast;
    window.d2Toast = function(msg, opt){
      try{ if(opt && opt.label==='Undo'){ var L = getLog(); L.push({at:Date.now(), msg:String(msg), by:(typeof CURRENT_USERNAME!=='undefined'&&CURRENT_USERNAME)||'', date:state.date}); if(L.length>100) L = L.slice(-100); LS.set('cd.d10.log', JSON.stringify(L)); } }catch(e){}
      return o.apply(this, arguments);
    };
    window.d2Toast.__d10 = true;
  }
  hookToast();

  /* ---------- call comments (stored with the day's notes, saved with the normal Save) ---------- */
  var cid = function(id){ return 'callcmt:'+id; };
  window.d10Comments = function(id){ try{ var n = (state.notes||[]).filter(function(x){ return x && x.id===cid(id); })[0]; return n ? (JSON.parse(n.text)||[]) : []; }catch(e){ return []; } };
  window.d10AddComment = function(id, text){
    text = String(text||'').trim(); if(!text) return false;
    var L = window.d10Comments(id); L.push({t:text.slice(0,400), by:(typeof CURRENT_USERNAME!=='undefined'&&CURRENT_USERNAME)||'', at:Date.now()});
    state.notes = state.notes||[]; var n = state.notes.filter(function(x){ return x && x.id===cid(id); })[0];
    if(n) n.text = JSON.stringify(L); else state.notes.push({id:cid(id), text:JSON.stringify(L)});
    try{ markDirty(); }catch(e){} return true;
  };
  window.d10CommentsHtml = function(id){
    var L = window.d10Comments(id);
    return '<section class="d10-cm"><h4>Comments</h4>'+(L.length?L.map(function(c){ var d=new Date(c.at); return '<div class="d10-cmi"><b>'+esc(c.by||'someone')+'</b> <time>'+esc(d.toLocaleDateString(undefined,{day:'numeric',month:'short'})+' '+d.toLocaleTimeString([], {hour:'numeric',minute:'2-digit'}))+'</time><p>'+esc(c.t)+'</p></div>'; }).join(''):'<div class="d5-muted">No comments yet.</div>')
      +'<div class="d10-cmf"><input data-d10cm="'+esc(id)+'" placeholder="e.g. link sent ✓, candidate 10 min late" maxlength="400"><button type="button" class="btn" data-d10cmadd="'+esc(id)+'">Add</button></div></section>';
  };
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('[data-d10cmadd]'); if(!b) return;
    var id = b.dataset.d10cmadd, inp = b.parentNode.querySelector('input'); if(inp && window.d10AddComment(id, inp.value)){ render(); toast('Comment added — tap Save to keep it',{ms:3000}); }
  });
  document.addEventListener('keydown', function(e){ if(e.key==='Enter' && e.target.dataset && e.target.dataset.d10cm){ e.preventDefault(); var b = e.target.parentNode.querySelector('[data-d10cmadd]'); if(b) b.click(); } });

  /* ---------- escalation banner: unassigned calls about to start ---------- */
  var escDismissed = '', escFired = {};
  function escCheck(){
    var b = $('#d9Esc');
    try{
      if(!isToday() || document.visibilityState==='hidden'){ if(b) b.remove(); return; }
      var n = nowMin(), L = rows().filter(function(r){ if(r.woi||asg(r)||r.status) return false; var m=tmin(r.time); return m!==9999 && m-n<=60 && m-n>=-5; }).sort(function(a,b2){ return tmin(a.time)-tmin(b2.time); });
      var key = L.map(function(r){ return r.id; }).join(',');
      if(!L.length || key===escDismissed){ if(b) b.remove(); return; }
      var first = L[0], mins = tmin(first.time)-n, hot = mins<=30;
      if(!b){ b = document.createElement('div'); b.id='d9Esc'; document.body.insertBefore(b, document.body.firstChild); }
      b.className = hot ? 'hot' : '';
      b.innerHTML = '<span class="d9e-i">'+(hot?'🚨':'⚠')+'</span><span class="d9e-t"><b>'+L.length+' call'+(L.length>1?'s':'')+' start'+(L.length>1?'':'s')+' within the hour with nobody assigned</b><small>Next: '+esc(first.candidate||'(no name)')+' at '+esc(first.time||'?')+(mins>0?' — in '+mins+' min':' — starting now')+'</small></span>'+(isAdmin()?'<button type="button" data-d9e="assign">Assign</button>':'')+'<button type="button" data-d9e="x" aria-label="Dismiss">✕</button>';
      b.dataset.id = first.id; b.dataset.key = key;
      if(hot && !escFired[first.id]){ escFired[first.id]=1; try{ if(window.cdShowNotification && state.alertsEnabled) window.cdShowNotification('ESCALATION — '+mins+' min to go, nobody assigned', {body:(first.candidate||'(no name)')+(first.company?' — '+first.company:'')+' at '+(first.time||'?'), tag:'cd-esc-'+first.id, data:{kind:'early', date:state.date}}); }catch(e){} try{ if(navigator.vibrate) navigator.vibrate([200,100,200]); }catch(e){} }
    }catch(e){ if(b) b.remove(); }
  }
  document.addEventListener('click', function(e){
    var x = e.target.closest && e.target.closest('[data-d9e]'); if(!x) return; var b = $('#d9Esc'); if(!b) return;
    if(x.dataset.d9e==='x'){ escDismissed = b.dataset.key; b.remove(); }
    else { chooseAssignee(b.dataset.id, x); }
  });

  /* ---------- offline copy of the day ---------- */
  var okAt = {};
  function installOffline(){
    if(typeof window.apiCall!=='function' || typeof window.loadDay!=='function' || window.loadDay.__d10){ return setTimeout(installOffline,150); }
    var oc = window.apiCall;
    window.apiCall = function(resource, opts){ var p = oc.apply(this, arguments); try{ if(resource==='calls' && opts && opts.qs && (!opts.method||opts.method==='GET')){ var m = /date=([^&]+)/.exec(opts.qs); if(m){ var d = decodeURIComponent(m[1]); p.then(function(){ okAt[d] = Date.now(); }, function(){}); } } }catch(e){} return p; };
    var ol = window.loadDay;
    window.loadDay = function(d){
      var started = Date.now();
      return ol.apply(this, arguments).then(function(r){
        try{
          if(okAt[d] && okAt[d]>=started-50){
            if(rows().length){ LS.set('cd.day.'+d, JSON.stringify({rows:state.rows, notes:state.notes, at:Date.now()})); trim(); }
            state.offlineCopyAt = 0;
          } else if(d===state.date && !state.needsLogin && !rows().length){
            var c = JSON.parse(LS.get('cd.day.'+d,'null'));
            if(c && c.rows && c.rows.length){ state.rows = c.rows; state.notes = c.notes||[]; state.offlineCopyAt = c.at; toast('Offline — showing your saved copy from '+new Date(c.at).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})+'. It refreshes when you’re back online.',{ms:7000}); }
          }
        }catch(e){}
        return r;
      });
    };
    window.loadDay.__d10 = true;
  }
  function trim(){ try{ var ks = []; for(var i=0;i<localStorage.length;i++){ var k = localStorage.key(i); if(k && k.indexOf('cd.day.')===0) ks.push(k); } ks.sort(); while(ks.length>4) localStorage.removeItem(ks.shift()); }catch(e){} }
  window.addEventListener('online', function(){ try{ if(state.offlineCopyAt && window.syncNow){ state.offlineCopyAt = 0; window.loadDay(state.date).then(function(){ render(); toast('Back online — refreshed'); }); } }catch(e){} });

  /* ---------- entry points + repaint on render ---------- */
  function injectMenu(){
    var dd = $('.more-menu-dropdown.d6'); if(!dd || $('#openD10', dd)) return;
    var host = $('.d6-grp[data-name="Today"] .d6-body', dd) || $('.d6-body', dd); if(!host) return;
    var b = document.createElement('button'); b.className='more-menu-item'; b.id='openD10'; b.type='button';
    b.title='Day board, kanban, smart lists, interviewer directory, workload, digest and history'; b.innerHTML='🧭 Workspace';
    b.addEventListener('click', function(){ try{ state.showMoreMenu=false; render(); }catch(x){} openW(); });
    host.insertBefore(b, host.firstChild);
  }
  function install(){
    if(typeof window.render!=='function' || !window.__d8){ return setTimeout(install,80); }
    var orig = window.render;
    window.render = function(){ var r = orig.apply(this, arguments); try{ injectMenu(); escCheck(); if(open && !dragId) paint(); }catch(e){ console.warn('d10',e); } return r; };
    var prev = window.d2ExtraCmds;
    window.d2ExtraCmds = function(){ var base = prev ? prev() : []; return base.concat(TABS.map(function(t){ return ['workspace '+t[1].toLowerCase()+' '+t[0], 'Workspace: '+t[1], 'Board, kanban, lists, directory…', function(){ openW(t[0]); }, '🧭']; })); };
    setInterval(escCheck, 30000); escCheck();
    installOffline();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== Smart reminders: the alert engine (follow-ups, assessments, onsites, outcomes, daily brief) ===== */
(function(){
  'use strict';
  if(window.__d11) return; window.__d11 = true;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var LS = { get:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }, set:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
  var isAdmin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  var api = function(){ return window.livefeedApi && window.livefeedApi.add ? window.livefeedApi : null; };

  var TYPES = [
    ['soon','Calls starting soon','Heads-up ~15 minutes before each start time, with who is on it','Right now'],
    ['unassigned','Unassigned call at 30 and 15 minutes','Reminder that nobody has taken it yet','Right now'],
    ['nonext','Round done, no next step logged','A call happened but nothing was scheduled after it','Follow-ups'],
    ['asm-after','Assessment came up after an interview','','Follow-ups'],
    ['next-after-asm','Next round scheduled after an assessment','','Follow-ups'],
    ['moved-up','Candidate moved up a round','','Follow-ups'],
    ['asm-due','Assessment due today / tomorrow','','Assessments & onsites'],
    ['asm-overdue','Assessment overdue','Date passed and not marked done','Assessments & onsites'],
    ['asm-nointerview','Assessment done, no interview scheduled','','Assessments & onsites'],
    ['onsite','Onsite coming up','Tomorrow and the morning of','Assessments & onsites'],
    ['status','Reschedule / cancel recorded','With the candidate’s track record','Outcomes'],
    ['repeat','Repeat no-show candidate on today’s list','','Outcomes'],
    ['woi','Waiting for invite over 24 hours','','Outcomes'],
    ['closure','Expected-closure candidate has a call today','','Outcomes'],
    ['brief','Morning brief','','Daily'],
    ['wrap','End-of-day wrap-up','','Daily']
  ];
  var BASELINE = {nonext:1,'asm-after':1,'next-after-asm':1,'moved-up':1,status:1,'asm-overdue':1,woi:1};

  function cfg(){ var c; try{ c = JSON.parse(LS.get('cd.d11.cfg','{}'))||{}; }catch(e){ c = {}; } c.on = c.on||{}; if(!c.d1) c.d1=2; if(!c.d2) c.d2=3; if(!c.brief) c.brief='09:30'; if(!c.wrap) c.wrap='21:00'; return c; }
  function saveCfg(c){ LS.set('cd.d11.cfg', JSON.stringify(c)); }

  var tmin = function(t){ try{ return timeToMinutes(t); }catch(e){ return 9999; } };
  var addD = function(d,n){ try{ return addDaysToDateStr(d,n); }catch(e){ return d; } };
  var dayDiff = function(a,b){ return Math.round((Date.parse(b+'T00:00:00Z')-Date.parse(a+'T00:00:00Z'))/86400000); };
  var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var fmtD = function(d){ var m = /(\d{4})-(\d\d)-(\d\d)/.exec(d||''); return m ? (+m[3])+' '+MON[+m[2]-1] : (d||''); };
  var ordn = function(n){ return n>=98?'Final':(n===1?'1st':n===2?'2nd':n===3?'3rd':n+'th'); };
  var roundNum = function(r){ var s = String(r.round||''); if(/final/i.test(s)) return 98; var m = /(\d+)/.exec(s); return m ? +m[1] : (/first/i.test(s)?1:1); };
  var happened = function(r){ return !r.status && !r.woi; };
  var nkey = function(n){ try{ return normalizeNameKey(n); }catch(e){ return String(n||'').toLowerCase().trim(); } };
  var cmatch = function(a,b){ try{ return fuzzyCompanyKeyMatch(a,b); }catch(e){ return String(a||'').toLowerCase()===String(b||'').toLowerCase(); } };
  var coName = function(c){ try{ return stripCompanyNoise(c)||c; }catch(e){ return c||''; } };
  var key = function(){ return Array.prototype.join.call(arguments,'|'); };

  function ensureLoaded(){
    var ps = [];
    try{ if(!state.assessmentsLoaded && typeof loadAssessments==='function') ps.push(loadAssessments().catch(function(){})); }catch(e){}
    try{ if(!state.onsitesLoaded && typeof loadOnsites==='function') ps.push(loadOnsites().catch(function(){})); }catch(e){}
    try{ if(!state.expectedClosuresLoaded && typeof loadExpectedClosures==='function') ps.push(loadExpectedClosures().catch(function(){})); }catch(e){}
    return Promise.all(ps);
  }

  function compute(all, c){
    var out = [], today = todayDateString(), tomorrow = addD(today,1), d = new Date(), nowM = d.getHours()*60+d.getMinutes();
    var push = function(type, k, title, body, extra){ out.push(Object.assign({id:k, key:k, type:type, title:title, body:body, date:today, rowId:'', candidate:'', read:false}, extra||{})); };
    var rowsAll = (all||[]).filter(function(r){ return r && r._date && r.candidate; });
    var by = {}; rowsAll.forEach(function(r){ (by[nkey(r.candidate)] = by[nkey(r.candidate)] || []).push(r); });
    Object.keys(by).forEach(function(k){ by[k].sort(function(a,b){ return String(a._date).localeCompare(String(b._date)) || tmin(a.time)-tmin(b.time); }); });
    var asms = state.assessments||[], onss = state.onsites||[];
    var asmFor = function(cand){ var k = nkey(cand); return asms.filter(function(a){ return nkey(a.candidate)===k; }); };
    var onsFor = function(cand){ var k = nkey(cand); return onss.filter(function(a){ return nkey(a.candidate)===k; }); };
    var todays = rowsAll.filter(function(r){ return r._date===today; });

    /* --- right now --- */
    if(c.on.soon!==false){
      var slots = {};
      todays.forEach(function(r){ if(!happened(r)) return; var m = tmin(r.time); if(m===9999) return; var diff = m-nowM; if(diff>=0 && diff<=15){ (slots[r.time] = slots[r.time]||[]).push(r); } });
      Object.keys(slots).forEach(function(t){
        var L = slots[t], un = L.filter(function(r){ return !r.assignee; }).length, names = L.slice(0,4).map(function(r){ return (r.candidate||'?')+(r.assignee?' → '+r.assignee:' → UNASSIGNED'); });
        push('soon', key('soon',today,t), L.length+' call'+(L.length>1?'s':'')+' at '+t+(un?' — '+un+' unassigned':''), names.join('; ')+(L.length>4?' … +'+(L.length-4)+' more':''), {priority:un?'high':'', candidate:L[0].candidate});
      });
    }
    if(c.on.unassigned!==false){
      todays.forEach(function(r){ if(r.woi||r.assignee||r.status) return; var m = tmin(r.time); if(m===9999) return; var diff = m-nowM;
        if(diff<=30 && diff>15) push('unassigned', key('un30',r.id), 'Nobody assigned — '+diff+' min to go', (r.candidate||'(no name)')+(r.company?' — '+r.company:'')+' at '+r.time+'.', {rowId:r.id, candidate:r.candidate, priority:'high'});
        else if(diff<=15 && diff>=-5) push('unassigned', key('un15',r.id), 'Still nobody assigned — '+Math.max(diff,0)+' min', (r.candidate||'(no name)')+(r.company?' — '+r.company:'')+' at '+r.time+'.', {rowId:r.id, candidate:r.candidate, priority:'high', tag:'cd-alert-'+r.id});
      });
    }

    /* --- follow-ups --- */
    var nonext = [];
    Object.keys(by).forEach(function(k){
      var L = by[k], hp = L.filter(happened); if(!hp.length) return;
      var last = hp[hp.length-1];
      if(last._date>=today) return;
      var rn = roundNum(last); if(rn>=98) return;
      var age = dayDiff(last._date, today), need = rn===1 ? c.d1 : c.d2;
      if(age<need || age>14) return;
      if(L.some(function(r){ return r!==last && (r._date>last._date || (r._date===last._date && tmin(r.time)>tmin(last.time))) && cmatch(r.company, last.company); })) return;
      if(L.some(function(r){ return r._date>last._date && !r.woi; }) ) return; // any later call for this person (any client) counts as a next step
      if(asmFor(last.candidate).some(function(a){ return a.date>=last._date; })) return;
      if(onsFor(last.candidate).some(function(a){ return a.date>=last._date; })) return;
      nonext.push({last:last, age:age});
    });
    if(c.on.nonext!==false){
      nonext.sort(function(a,b){ return a.age-b.age; }).forEach(function(x){ var l = x.last;
        push('nonext', key('nonext',nkey(l.candidate),nkey(coName(l.company)),l._date), 'No next step — '+l.candidate, ordn(roundNum(l))+' round'+(l.company?' at '+coName(l.company):'')+' was '+fmtD(l._date)+' ('+x.age+' day'+(x.age===1?'':'s')+' ago). Nothing scheduled since.', {date:l._date, candidate:l.candidate}); });
    }
    var followCount = nonext.length;

    asms.forEach(function(a){
      var cand = a.candidate; if(!cand) return; var L = by[nkey(cand)]||[];
      var before = L.filter(function(r){ return happened(r) && r._date<=a.date; }), prev = before[before.length-1];
      if(c.on['asm-after']!==false && prev && a.date>=addD(today,-1) && dayDiff(prev._date, a.date)<=14)
        push('asm-after', key('asm',a.id), 'Assessment for '+cand, (a.assessment||'Assessment')+' on '+fmtD(a.date)+(a.time?' at '+a.time:'')+' — after '+ordn(roundNum(prev))+' round'+(prev.company?' at '+coName(prev.company):'')+' on '+fmtD(prev._date)+'.', {date:a.date, candidate:cand});
      var after = L.filter(function(r){ return !r.woi && r._date>a.date; })[0];
      if(c.on['next-after-asm']!==false && after && a.date>=addD(today,-14)){
        push('next-after-asm', key('nxa',a.id,after.id), 'Next round after assessment — '+cand, ordn(roundNum(after))+' round'+(after.company?' at '+coName(after.company):'')+' on '+fmtD(after._date)+(after.time?' at '+after.time:'')+' (assessment was '+fmtD(a.date)+').', {date:after._date, rowId:after.id, candidate:cand});
      }
      if(a.done){
        if(c.on['asm-nointerview']!==false && !after && !onsFor(cand).some(function(o){ return o.date>=a.date; }) && dayDiff(a.date,today)>=3 && dayDiff(a.date,today)<=14)
          push('asm-nointerview', key('adn',a.id), 'Assessment done, nothing next — '+cand, (a.assessment||'Assessment')+' was '+fmtD(a.date)+' ('+dayDiff(a.date,today)+' days ago). No interview or onsite scheduled since.', {date:a.date, candidate:cand});
      } else {
        if(c.on['asm-due']!==false){
          if(a.date===today) push('asm-due', key('due',a.id,'today'), 'Assessment today — '+cand, (a.assessment||'Assessment')+(a.time?' at '+a.time:'')+(a.company?' · '+coName(a.company):'')+((a.handlers||[]).length?' · '+a.handlers.join(', '):' · NO HANDLER'), {date:a.date, candidate:cand, priority:(a.handlers||[]).length?'':'high'});
          else if(a.date===tomorrow && nowM>=15*60) push('asm-due', key('due',a.id,'tomorrow'), 'Assessment tomorrow — '+cand, (a.assessment||'Assessment')+(a.time?' at '+a.time:'')+(a.company?' · '+coName(a.company):'')+((a.handlers||[]).length?' · '+a.handlers.join(', '):' · no handler yet'), {date:a.date, candidate:cand});
        }
        if(c.on['asm-overdue']!==false && a.date<today && dayDiff(a.date,today)<=14)
          push('asm-overdue', key('od',a.id), 'Assessment overdue — '+cand, (a.assessment||'Assessment')+' was '+fmtD(a.date)+' and isn’t marked done.', {date:a.date, candidate:cand});
      }
    });

    if(c.on['moved-up']!==false){
      rowsAll.forEach(function(r){
        if(r._date<addD(today,-1) || r.woi || r.status) return; var rn = roundNum(r); if(rn<2) return;
        var L = by[nkey(r.candidate)]||[];
        var prior = L.filter(function(x){ return x!==r && x._date<r._date && cmatch(x.company, r.company) && happened(x); });
        if(!prior.length) return; var maxPrior = Math.max.apply(null, prior.map(roundNum));
        if(rn>maxPrior) push('moved-up', key('up',nkey(r.candidate),nkey(coName(r.company)),rn), r.candidate+' reached '+ordn(rn)+' round', coName(r.company)+' — '+ordn(rn)+' round on '+fmtD(r._date)+(r.time?' at '+r.time:'')+' (was '+ordn(maxPrior)+').', {date:r._date, rowId:r.id, candidate:r.candidate});
      });
    }

    if(c.on.onsite!==false){
      onss.forEach(function(o){ if(o.status && o.status!=='Scheduled') return;
        var who = (o.handlers||[]).length ? o.handlers.join(', ') : 'NO HANDLER yet', extra = (o.location?' @ '+o.location:'');
        if(o.date===tomorrow && nowM>=15*60) push('onsite', key('os',o.id,'tomorrow'), 'Onsite tomorrow — '+o.candidate, (o.company?coName(o.company)+' · ':'')+(o.time||'')+extra+' · '+who, {date:o.date, candidate:o.candidate});
        else if(o.date===today && nowM>=7*60) push('onsite', key('os',o.id,'today'), 'Onsite today — '+o.candidate, (o.company?coName(o.company)+' · ':'')+(o.time||'')+extra+' · '+who, {date:o.date, candidate:o.candidate, priority:(o.handlers||[]).length?'':'high'});
      });
    }

    /* --- outcomes --- */
    if(c.on.status!==false){
      rowsAll.forEach(function(r){ if(!r.status || r._date<addD(today,-1) || r._date>addD(today,2)) return;
        var bad = 0; try{ bad = (by[nkey(r.candidate)]||[]).filter(function(x){ return x!==r && x.status && (x.status==='rescheduled'||x.status==='cancelled'||x.status==='not_responded'); }).length; }catch(e){}
        var lbl = (window.statusBadgeInfo ? statusBadgeInfo(r.status).label : r.status);
        push('status', key('st',r.id,r.status), lbl+' — '+r.candidate, (r.company?coName(r.company)+' · ':'')+ordn(roundNum(r))+' round on '+fmtD(r._date)+(r.time?' at '+r.time:'')+(bad?' · '+bad+' earlier reschedule/cancel'+(bad>1?'s':'')+' on record':''), {date:r._date, rowId:r.id, candidate:r.candidate, priority:'high'});
      });
    }
    if(c.on.repeat!==false){
      todays.forEach(function(r){ if(!happened(r)) return; var bad = (by[nkey(r.candidate)]||[]).filter(function(x){ return x._date<today && x.status && (x.status==='rescheduled'||x.status==='cancelled'||x.status==='not_responded'); }).length;
        if(bad>=2) push('repeat', key('rns',r.id), 'Repeat no-show on today’s list — '+r.candidate, bad+' earlier reschedule/cancel/no-response outcomes. Call at '+(r.time||'?')+(r.company?' · '+coName(r.company):'')+'.', {rowId:r.id, candidate:r.candidate});
      });
    }
    if(c.on.woi!==false){
      rowsAll.forEach(function(r){ if(!r.woi || r._date>=today || dayDiff(r._date,today)>10) return;
        push('woi', key('woi',r.id), 'Still waiting for invite — '+r.candidate, (r.company?coName(r.company)+' · ':'')+'logged '+fmtD(r._date)+'. Over a day without an invite.', {date:r._date, rowId:r.id, candidate:r.candidate});
      });
    }
    if(c.on.closure!==false){
      var ecs = (state.expectedClosures||[]).map(function(e){ return nkey(e.candidate); });
      todays.forEach(function(r){ if(ecs.indexOf(nkey(r.candidate))>=0 && happened(r)) push('closure', key('clo',r.id), '🎯 Expected closure on the board — '+r.candidate, (r.company?coName(r.company)+' · ':'')+ordn(roundNum(r))+' round at '+(r.time||'?')+'. Follow up after the call.', {rowId:r.id, candidate:r.candidate}); });
    }

    /* --- daily --- */
    var hhmm = function(s){ var m = /(\d{1,2}):(\d\d)/.exec(s||''); return m ? (+m[1])*60+(+m[2]) : 0; };
    if(c.on.brief!==false && nowM>=hhmm(c.brief) && nowM<hhmm(c.brief)+360){
      var live = todays.filter(happened).sort(function(a,b){ return tmin(a.time)-tmin(b.time); });
      var unA = live.filter(function(r){ return !r.assignee; }).length, lt = live.filter(function(r){ var m=tmin(r.time); return m!==9999&&(m>=1320||m<360); }).length;
      var ta = asms.filter(function(a){ return a.date===today && !a.done; }).length, to = onss.filter(function(o){ return o.date===today && (!o.status||o.status==='Scheduled'); }).length;
      push('brief', key('brief',today), '☀️ Today: '+live.length+' call'+(live.length===1?'':'s')+(unA?' · '+unA+' unassigned':' · all assigned'), (live.length?'First at '+live[0].time+'. ':'')+(lt?lt+' late-night. ':'')+(ta?ta+' assessment'+(ta>1?'s':'')+'. ':'')+(to?to+' onsite'+(to>1?'s':'')+'. ':'')+(followCount?followCount+' follow-up'+(followCount>1?'s':'')+' owed (no next step).':'No follow-ups owed.'), {priority:'high'});
    }
    if(c.on.wrap!==false && nowM>=hhmm(c.wrap) && nowM<hhmm(c.wrap)+240){
      var tm = rowsAll.filter(function(r){ return r._date===tomorrow && happened(r); }), tmUn = tm.filter(function(r){ return !r.assignee; }).length;
      var dn = todays.filter(function(r){ return happened(r) && tmin(r.time)<=nowM; }).length, rs = todays.filter(function(r){ return r.status; }).length, unT = todays.filter(function(r){ return happened(r) && !r.assignee; }).length;
      push('wrap', key('wrap',today), '🌙 Wrap-up: '+dn+' call'+(dn===1?'':'s')+' done today', (rs?rs+' rescheduled/cancelled. ':'')+(unT?unT+' today still unassigned. ':'')+'Tomorrow: '+tm.length+' call'+(tm.length===1?'':'s')+(tmUn?' ('+tmUn+' unassigned)':'')+'. '+(followCount?followCount+' follow-up'+(followCount>1?'s':'')+' owed.':'No follow-ups owed.'), {priority:'high'});
    }
    return out;
  }

  var running = false, lastRun = 0;
  function run(force){
    var A = api();
    if(!A || running || !isAdmin() || state.needsLogin || typeof fetchAllRowsAcrossDates!=='function') return;
    if(!force && Date.now()-lastRun < 90000) return;
    running = true; lastRun = Date.now();
    ensureLoaded().then(function(){ return fetchAllRowsAcrossDates(false); }).then(function(all){
      var c = cfg(), alerts = compute(all, c), first = LS.get('cd.d11.init','')!=='1', added = 0;
      alerts.forEach(function(a){
        if(A.hasSeen(a.id)) return;
        if(first && BASELINE[a.type]){ A.markSeen(a.id); return; }
        if(added>=12 && a.type!=='brief' && a.type!=='wrap') return;
        if(A.add(a)) added++;
      });
      if(first) LS.set('cd.d11.init','1');
    }).catch(function(e){ console.warn('d11',e); }).then(function(){ running = false; });
  }
  window.d11Run = function(){ run(true); };
  window.d11Covers = function(t){ try{ return cfg().on[t] !== false; }catch(e){ return false; } };

  /* ---------- settings sheet ---------- */
  var el = null;
  function sheet(){
    var c = cfg(), groups = {}, order = [];
    TYPES.forEach(function(t){ if(!groups[t[3]]){ groups[t[3]] = []; order.push(t[3]); } groups[t[3]].push(t); });
    el.innerHTML = '<div class="d11-sheet"><div class="d11-h"><b>Alert settings</b><button type="button" class="d11-x" data-d11="close" aria-label="Close">✕</button></div><div class="d11-body">'
      + order.map(function(g){ return '<div class="d11-g">'+esc(g)+'</div>'+groups[g].map(function(t){ var on = c.on[t[0]]!==false; return '<label class="d11-r"><span><b>'+esc(t[1])+'</b>'+(t[2]?'<small>'+esc(t[2])+'</small>':'')+'</span><input type="checkbox" data-d11t="'+t[0]+'" '+(on?'checked':'')+'><i></i></label>'; }).join(''); }).join('')
      + '<div class="d11-g">Timing</div><div class="d11-t"><label>No-next-step after<input type="number" min="1" max="10" data-d11n="d1" value="'+c.d1+'"> days (1st round)</label><label>and after<input type="number" min="1" max="14" data-d11n="d2" value="'+c.d2+'"> days (later rounds)</label><label>Morning brief at<input type="time" data-d11n="brief" value="'+esc(c.brief)+'"></label><label>Wrap-up at<input type="time" data-d11n="wrap" value="'+esc(c.wrap)+'"></label></div>'
      + '<div class="d11-row"><button type="button" class="d11-b primary" data-d11="check">Check now</button><button type="button" class="d11-b" data-d11="test">Send a sample alert</button></div><p class="d11-note">Alerts are checked every couple of minutes while the app is open. New ones appear in 🔔 Alerts and as phone notifications when the app is in the background. The first time this runs, existing history is skipped so you only hear about new things.</p></div></div>';
  }
  function openS(){ if(!el){ el = document.createElement('div'); el.id='d11'; document.body.appendChild(el); } sheet(); }
  function closeS(){ if(el){ el.remove(); el = null; } }
  window.d11Settings = openS;
  document.addEventListener('click', function(e){
    var t = e.target; if(!t.closest) return;
    if(el && t===el){ closeS(); return; }
    var b = t.closest('[data-d11]'); if(!b) return; var k = b.dataset.d11;
    if(k==='close') closeS();
    else if(k==='check'){ run(true); if(window.d2Toast) window.d2Toast('Checking now…',{ms:2000}); }
    else if(k==='test'){ var A = api(); if(A){ A.add({id:'d11-test-'+Date.now(), type:'nonext', title:'Sample alert — No next step: Test Candidate', body:'1st round at Sample Co was 2 days ago. Nothing scheduled since.', date:state.date, rowId:'', candidate:'', read:false, priority:'high', key:'sample'}); } }
  });
  document.addEventListener('change', function(e){
    var t = e.target; if(!el || !t.dataset) return;
    var c = cfg();
    if(t.dataset.d11t){ c.on[t.dataset.d11t] = t.checked; saveCfg(c); }
    else if(t.dataset.d11n){ var k = t.dataset.d11n; c[k] = (k==='d1'||k==='d2') ? Math.max(1, Math.min(14, parseInt(t.value,10)||2)) : (t.value||c[k]); saveCfg(c); }
  });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && el) closeS(); });

  /* ---------- wiring ---------- */
  function injectMenu(){
    var dd = $('.more-menu-dropdown.d6'); if(!dd || $('#openD11', dd)) return;
    var host = $('.d6-grp[data-name="Today"] .d6-body', dd) || $('.d6-body', dd); if(!host) return;
    var b = document.createElement('button'); b.className='more-menu-item'; b.id='openD11'; b.type='button'; b.title='Choose which smart reminders you get, and when'; b.innerHTML='🔔 Alert settings';
    b.addEventListener('click', function(){ try{ state.showMoreMenu=false; render(); }catch(x){} openS(); });
    host.appendChild(b);
  }
  function install(){
    if(typeof window.render!=='function' || !window.__d10 || !window.livefeedApi){ return setTimeout(install,150); }
    var orig = window.render;
    window.render = function(){ var r = orig.apply(this, arguments); try{ injectMenu(); }catch(e){} return r; };
    var prev = window.d2ExtraCmds;
    window.d2ExtraCmds = function(){ var base = prev ? prev() : []; return base.concat([['alert settings reminders notifications','Alert settings','Choose smart reminders',openS,'🔔']]); };
    setInterval(function(){ run(false); }, 120000);
    document.addEventListener('visibilitychange', function(){ if(document.visibilityState==='visible') run(false); });
    setTimeout(function(){ run(true); }, 4000);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== Search everything (bottom-menu Search on phones; also Ctrl/Cmd-K → "Search everything") ===== */
(function(){
  'use strict';
  if(window.__d12) return; window.__d12 = true;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };
  var esc = function(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var LS = { get:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }, set:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
  var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var fmtD = function(d){ var m = /(\d{4})-(\d\d)-(\d\d)/.exec(d||''); return m ? (+m[3])+' '+MON[+m[2]-1] : (d||''); };
  var memo = function(fn){ var m = Object.create(null), n = 0; return function(x){ var k = String(x==null?'':x), v = m[k]; if(v===undefined){ if(++n>30000){ m = Object.create(null); n = 0; } v = m[k] = fn(k); } return v; }; };
  var nkey = memo(function(n){ try{ return normalizeNameKey(n); }catch(e){ return String(n||'').toLowerCase().trim(); } });
  var ckey = memo(function(n){ try{ return normalizeCompanyKey(n); }catch(e){ return String(n||'').toLowerCase().trim(); } });
  var coName = memo(function(c){ try{ return stripCompanyNoise(c)||c; }catch(e){ return c||''; } });
  var today = function(){ try{ return todayDateString(); }catch(e){ return ''; } };
  var low = function(s){ return String(s==null?'':s).toLowerCase(); };
  var el = null, q = '', chip = 'all', all = null, loading = false, openMore = {}, loadedAt = 0;
  var CHIPS = [['all','All'],['cand','Candidates'],['calls','Calls'],['client','Clients'],['people','People'],['asm','Assess · Onsite'],['tools','Screens']];

  function ensure(){
    if(all && Date.now()-loadedAt<60000 || loading) return;
    loading = true;
    var ps = [];
    try{ if(!state.assessmentsLoaded && typeof loadAssessments==='function') ps.push(loadAssessments().catch(function(){})); }catch(e){}
    try{ if(!state.onsitesLoaded && typeof loadOnsites==='function') ps.push(loadOnsites().catch(function(){})); }catch(e){}
    ps.push((typeof fetchAllRowsAcrossDates==='function' ? fetchAllRowsAcrossDates(false) : Promise.resolve(state.rows||[])).then(function(r){ all = r||[]; }).catch(function(){ all = (state.rows||[]).map(function(r){ return Object.assign({_date:state.date}, r); }); }));
    Promise.all(ps).then(function(){ loading = false; loadedAt = Date.now(); if(el) paint(); });
  }

  /* ---- matching ---- */
  function tokens(s){ return low(s).split(/\s+/).filter(Boolean); }
  function hit(hay, toks){ var h = low(hay); for(var i=0;i<toks.length;i++){ if(h.indexOf(toks[i])<0) return false; } return true; }
  var sc = function(name, toks){ var n = low(name), s = 0; toks.forEach(function(t){ if(n.indexOf(t)===0) s+=3; else if(n.indexOf(' '+t)>=0) s+=2; else if(n.indexOf(t)>=0) s+=1; }); return s; };

  function search(query){
    var toks = tokens(query), R = {cand:[], calls:[], client:[], people:[], asm:[], tools:[], quick:[], alerts:[]};
    if(!toks.length) return R;
    var rows = all||[], td = today();
    // quick jumps
    var q2 = query.trim().toLowerCase(), dm = /^(\d{1,2})(?:st|nd|rd|th)?\s+([a-z]{3,9})$/.exec(q2); if(dm) q2 = dm[2]+' '+dm[1];
    try{ var jd = typeof parseQuickJumpDate==='function' ? parseQuickJumpDate(q2) : null; if(jd) R.quick.push({ic:'📅', t:'Go to '+fmtD(jd)+' ('+jd+')', s:'Open that day’s calls', act:{k:'date', d:jd}}); }catch(e){}
    var live = rows.filter(function(r){ return r._date===td; });
    var kw = {unassigned:function(r){ return !r.assignee && !r.woi && !r.status; }, woi:function(r){ return r.woi; }, rescheduled:function(r){ return r.status==='rescheduled'; }, cancelled:function(r){ return r.status==='cancelled'; }, late:function(r){ var m=timeToMinutes(r.time); return m!==9999&&(m>=1320||m<360); }, onsite:function(r){ return r.onsite; }};
    if(toks.length===1 && kw[toks[0]]){ var n = live.filter(kw[toks[0]]).length; R.quick.push({ic:'🔎', t:toks[0].charAt(0).toUpperCase()+toks[0].slice(1)+' calls today: '+n, s:'Open the Workspace lists', act:{k:'workspace', tab:'lists'}}); }
    // candidates
    var cm = {};
    rows.forEach(function(r){ if(!r.candidate) return; var k = nkey(r.candidate); (cm[k] = cm[k] || {name:r.candidate, rows:[]}).rows.push(r); });
    Object.keys(cm).forEach(function(k){ var o = cm[k]; if(!hit(o.name, toks) && !o.rows.some(function(r){ return hit(r.candidate+' '+(r.company||'')+' '+(r.role||''), toks) && toks.some(function(t){ return low(r.candidate).indexOf(t)>=0; }); })) return;
      o.rows.sort(function(a,b){ return String(b._date).localeCompare(String(a._date)); }); var l = o.rows[0], bad = o.rows.filter(function(r){ return r.status; }).length;
      R.cand.push({sc:sc(o.name,toks)+Math.min(o.rows.length,5)/10, ic:'👤', t:o.name, s:o.rows.length+' call'+(o.rows.length===1?'':'s')+' · last '+fmtD(l._date)+(l.round?' · '+l.round:'')+(l.company?' · '+coName(l.company):'')+(bad?' · ⚠ '+bad+' didn’t go ahead':''), act:{k:'cand', name:o.name}}); });
    // calls (today ± recent / upcoming first)
    rows.forEach(function(r){ if(!r.candidate && !r.company) return; if(!hit([r.candidate,r.company,r.role,r.assignee,r.time,r.round,r.interviewer,r.technicalPOC,r.country,r._date,fmtD(r._date)].join(' '), toks)) return;
      var diff = (Date.parse(r._date+'T00:00:00Z')-Date.parse(td+'T00:00:00Z'))/86400000, near = diff>=-1 && diff<=7 ? 5 : (diff>=-14 && diff<0 ? 2 : 0);
      R.calls.push({sc:near+sc(r.candidate,toks)+sc(r.company,toks)/2-Math.abs(diff)/100, ic:r.status?'🔁':(r.woi?'⏳':'📞'), t:(r.time||'—')+'  '+(r.candidate||'(no name)'), s:fmtD(r._date)+(r._date===td?' (today)':'')+' · '+[r.company&&coName(r.company), r.round, r.assignee||(r.woi?'waiting for invite':'UNASSIGNED')].filter(Boolean).join(' · ')+(r.status?' · '+(window.statusBadgeInfo?statusBadgeInfo(r.status).label:r.status):''), act:{k:'call', date:r._date, name:r.candidate}}); });
    // clients
    var co = {};
    rows.forEach(function(r){ if(!r.company) return; var k = ckey(r.company); if(!k) return; (co[k] = co[k] || {name:coName(r.company), rows:[], hand:{}}).rows.push(r); if(r.assignee) co[k].hand[r.assignee] = (co[k].hand[r.assignee]||0)+1; });
    Object.keys(co).forEach(function(k){ var o = co[k]; if(!hit(o.name+' '+k, toks)) return; o.rows.sort(function(a,b){ return String(b._date).localeCompare(String(a._date)); });
      var th = Object.keys(o.hand).sort(function(a,b){ return o.hand[b]-o.hand[a]; })[0], cands = {}; o.rows.forEach(function(r){ cands[nkey(r.candidate)] = 1; });
      R.client.push({sc:sc(o.name,toks)+Math.min(o.rows.length,20)/20, ic:'🏢', t:o.name, s:o.rows.length+' calls · '+Object.keys(cands).length+' candidates · last '+fmtD(o.rows[0]._date)+(th?' · mostly '+th:''), act:{k:'client', name:o.name}}); });
    // people
    var pe = {}, teamSet; try{ teamSet = getTeamNames(); }catch(e){ teamSet = new Set(); }
    (state.roster||[]).forEach(function(p){ if(p && p.name && !teamSet.has(p.name)) pe[p.name] = pe[p.name] || {name:p.name, team:p.team||'', n:0, t:0}; });
    rows.forEach(function(r){ if(!r.assignee) return; var o = pe[r.assignee] = pe[r.assignee] || {name:r.assignee, team:'', n:0, t:0}; o.n++; if(r._date===td) o.t++; });
    Object.keys(pe).forEach(function(k){ var o = pe[k]; if(!hit(o.name+' '+o.team, toks)) return; R.people.push({sc:sc(o.name,toks)+o.n/1000, ic:'🧑‍💼', t:o.name, s:(o.team?o.team+' · ':'')+o.t+' today · '+o.n+' calls overall', act:{k:'person', name:o.name}}); });
    // interviewers / POCs
    var iv = {};
    rows.forEach(function(r){ ['interviewer','technicalPOC'].forEach(function(f){ String(r[f]||'').split(/[,;\/&]|\band\b/i).map(function(x){ return x.trim(); }).filter(function(x){ return x.length>1; }).forEach(function(nm){ var o = iv[low(nm)] = iv[low(nm)] || {name:nm, n:0, co:{}}; o.n++; if(r.company) o.co[coName(r.company)] = 1; }); }); });
    Object.keys(iv).forEach(function(k){ var o = iv[k]; if(!hit(o.name, toks)) return; R.people.push({sc:sc(o.name,toks)-0.5, ic:'🎙', t:o.name, s:'Interviewer / POC · '+o.n+' call'+(o.n===1?'':'s')+' · '+Object.keys(o.co).slice(0,3).join(', '), act:{k:'cand', name:o.name}}); });
    // assessments / onsites / closures
    (state.assessments||[]).forEach(function(a){ if(!hit(['assessment',a.candidate,a.company,a.assessment,(a.handlers||[]).join(' '),a.date,fmtD(a.date)].join(' '), toks)) return; R.asm.push({sc:sc(a.candidate,toks)+(a.done?0:1), ic:'🧪', t:'Assessment — '+a.candidate, s:fmtD(a.date)+(a.time?' '+a.time:'')+' · '+[a.company&&coName(a.company), a.assessment, (a.handlers||[]).join(', ')||'no handler', a.done?'done':'pending'].filter(Boolean).join(' · '), act:{k:'panel', panel:'showAssessments', name:a.candidate}}); });
    (state.onsites||[]).forEach(function(o){ if(!hit(['onsite',o.candidate,o.company,o.location,(o.handlers||[]).join(' '),o.date,fmtD(o.date)].join(' '), toks)) return; R.asm.push({sc:sc(o.candidate,toks)+1, ic:'🏢', t:'Onsite — '+o.candidate, s:fmtD(o.date)+(o.time?' '+o.time:'')+' · '+[o.company&&coName(o.company), o.location, (o.handlers||[]).join(', ')||'no handler', o.status].filter(Boolean).join(' · '), act:{k:'panel', panel:'showOnsites', name:o.candidate}}); });
    (state.expectedClosures||[]).forEach(function(e){ if(!hit(['expected closure',e.candidate,e.company,e.note].join(' '), toks)) return; R.asm.push({sc:sc(e.candidate,toks), ic:'🎯', t:'Expected closure — '+e.candidate, s:[e.company&&coName(e.company), e.round, e.note].filter(Boolean).join(' · '), act:{k:'panel', panel:'showExpectedClosures', name:e.candidate}}); });
    // alerts inbox
    try{ (window.livefeedApi ? window.livefeedApi.items() : []).forEach(function(i){ if(hit(i.title+' '+i.body, toks)) R.alerts.push({sc:0, ic:'🔔', t:i.title, s:i.body, act:{k:'cand', name:i.candidate||''}}); }); }catch(e){}
    // tools / screens
    try{ (typeof QUICK_JUMP_COMMANDS!=='undefined' ? QUICK_JUMP_COMMANDS : []).forEach(function(c){ if(hit(c.label+' '+(c.keywords||''), toks)) R.tools.push({sc:sc(c.label,toks), ic:'⚙️', t:c.label.replace(/^\S+\s/,''), s:'Open screen', ic2:c.label.split(' ')[0], act:{k:'tool', cmd:c}}); }); }catch(e){}
    try{ [['Workspace','🧭','board'],['Alert settings','🔔','__s'],['2nd-round pipeline','🌍','__p']].forEach(function(x){ if(hit(x[0]+' workspace board kanban directory workload digest history pipeline settings', toks) && hit(x[0], toks.slice(0,1)) ) R.tools.push({sc:2, ic:x[1], t:x[0], s:'Open', act:{k:'own', id:x[2]}}); }); }catch(e){}
    Object.keys(R).forEach(function(k){ R[k].sort(function(a,b){ return (b.sc||0)-(a.sc||0); }); });
    return R;
  }

  /* ---- UI ---- */
  var GROUPS = [['quick','Quick',null],['cand','Candidates','cand'],['calls','Calls','calls'],['client','Clients','client'],['people','People & interviewers','people'],['asm','Assessments · Onsites · Closures','asm'],['alerts','Alerts','all'],['tools','Screens & tools','tools']];
  function item(r, i, g){ return '<button type="button" class="d12-i" data-d12r="'+g+':'+i+'"><span class="d12-ic">'+r.ic+'</span><span class="d12-t"><b>'+esc(r.t)+'</b><small>'+esc(r.s||'')+'</small></span><span class="d12-go">›</span></button>'; }
  function recents(){ try{ return JSON.parse(LS.get('cd.d12.recent','[]'))||[]; }catch(e){ return []; } }
  function remember(s){ s = String(s||'').trim(); if(s.length<2) return; var L = recents().filter(function(x){ return x!==s; }); L.unshift(s); LS.set('cd.d12.recent', JSON.stringify(L.slice(0,8))); }
  var last = null;
  function paint(){
    if(!el) return;
    var body = '', R = null;
    if(!tokens(q).length){
      var rc = recents(), td = today(), rows = (all||[]).filter(function(r){ return r._date===td; });
      var un = rows.filter(function(r){ return !r.assignee && !r.woi && !r.status; }).length;
      body = (rc.length ? '<div class="d12-g">Recent searches</div><div class="d12-chips">'+rc.map(function(x){ return '<button type="button" class="d12-rc" data-d12q="'+esc(x)+'">'+esc(x)+'</button>'; }).join('')+'<button type="button" class="d12-rc ghost" data-d12a="clear">Clear</button></div>' : '')
        + '<div class="d12-g">Try</div><div class="d12-chips">'+['unassigned','late','woi','tomorrow','assessment','onsite'].map(function(x){ return '<button type="button" class="d12-rc" data-d12q="'+x+'">'+x+'</button>'; }).join('')+'</div>'
        + '<p class="d12-hint">One box for candidates, calls on any date, clients, handlers, interviewers, assessments, onsites, alerts and app screens.<br>Examples: <i>ravi</i> · <i>walgreens</i> · <i>dhruva</i> · <i>5:30 pm</i> · <i>25 oct</i> · <i>sephora 2nd</i></p>'
        + (loading?'<p class="d12-hint">Loading all dates…</p>':'<p class="d12-hint">Searching '+(all?all.length:0)+' calls today and across every date.</p>');
    } else {
      R = search(q); last = R;
      var any = false;
      GROUPS.forEach(function(g){
        var L = R[g[0]]; if(!L.length) return; if(chip!=='all' && g[2] && g[2]!==chip && g[0]!=='quick') return; if(chip!=='all' && !g[2] && g[0]!=='quick') return;
        any = true; var lim = openMore[g[0]] ? 40 : (chip==='all'?4:25);
        body += '<div class="d12-g">'+esc(g[1])+' <span>'+L.length+'</span></div>'+L.slice(0,lim).map(function(r,i){ return item(r,i,g[0]); }).join('')+(L.length>lim?'<button type="button" class="d12-more" data-d12m="'+g[0]+'">Show '+(L.length-lim)+' more</button>':'');
      });
      if(!any) body = '<div class="d12-none"><div>🔍</div><b>Nothing found for “'+esc(q)+'”</b><p>'+(loading?'Still loading all dates…':'Try fewer letters, a different spelling, or just the surname.')+'</p></div>';
    }
    var counts = R ? {cand:R.cand.length, calls:R.calls.length, client:R.client.length, people:R.people.length, asm:R.asm.length, tools:R.tools.length} : {};
    var keepFocus = document.activeElement && document.activeElement.classList && document.activeElement.classList.contains('d12-q');
    var list = $('.d12-list', el), keep = list ? list.scrollTop : 0;
    var inp0 = $('.d12-q', el);
    if(inp0 && list){
      /* Update only the results — the input itself is never replaced, so typing and the keyboard stay steady. */
      if(inp0.value !== q) inp0.value = q;
      var sb = $('.d12-sb', el), clr = $('.d12-clr', el);
      if(q && !clr && sb){ var cb = document.createElement('button'); cb.type='button'; cb.className='d12-clr'; cb.setAttribute('data-d12a','erase'); cb.setAttribute('aria-label','Clear'); cb.textContent='✕'; sb.appendChild(cb); }
      else if(!q && clr) clr.remove();
      var cbar = $('.d12-chipbar', el);
      if(cbar) cbar.innerHTML = CHIPS.map(function(c){ var n = counts[c[0]]; return '<button type="button" class="'+(chip===c[0]?'on':'')+'" data-d12c="'+c[0]+'">'+c[1]+(n?'<em>'+n+'</em>':'')+'</button>'; }).join('');
      list.innerHTML = body; list.scrollTop = keep;
      if(!q && document.activeElement !== inp0) inp0.focus();
      return;
    }
    el.innerHTML = '<div class="d12-sheet"><div class="d12-h"><div class="d12-sb"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input class="d12-q" type="search" inputmode="search" enterkeyhint="search" placeholder="Search anything…" value="'+esc(q)+'" autocomplete="off" autocapitalize="off" spellcheck="false">'+(q?'<button type="button" class="d12-clr" data-d12a="erase" aria-label="Clear">✕</button>':'')+'</div><button type="button" class="d12-cancel" data-d12a="close">Close</button></div>'
      +'<div class="d12-chipbar">'+CHIPS.map(function(c){ var n = counts[c[0]]; return '<button type="button" class="'+(chip===c[0]?'on':'')+'" data-d12c="'+c[0]+'">'+c[1]+(n?'<em>'+n+'</em>':'')+'</button>'; }).join('')+'</div>'
      +'<div class="d12-list">'+body+'</div></div>';
    var l2 = $('.d12-list', el); if(l2) l2.scrollTop = keep;
    if(keepFocus || !q){ var inp = $('.d12-q', el); if(inp){ inp.focus(); try{ var n = inp.value.length; inp.setSelectionRange(n,n); }catch(e){} } }
  }
  function openS(prefill){
    q = prefill || ''; chip = 'all'; openMore = {};
    if(!el){ el = document.createElement('div'); el.id='d12'; document.body.appendChild(el); document.body.classList.add('d12-open'); }
    paint(); ensure();
    setTimeout(function(){ var i = $('.d12-q', el); if(i) i.focus(); }, 60);
  }
  function closeS(){ if(el){ el.remove(); el = null; } document.body.classList.remove('d12-open'); }
  window.d12Open = openS;

  function act(a){
    if(!a) return;
    remember(q);
    var k = a.k;
    if(k==='cand'){ closeS(); if(a.name && typeof openCandidateProfile==='function') openCandidateProfile(a.name); }
    else if(k==='call'){ closeS(); if(typeof cdOpenFromNotification==='function') cdOpenFromNotification({date:a.date, candidate:a.name}); }
    else if(k==='client'){ closeS(); try{ openOnlyPanel('showCompanyScorecard'); openCompanyScorecard(a.name); }catch(e){} }
    else if(k==='person'){ closeS(); try{ closeAllPanels(); state.filter='all'; state.view='all'; state.search=''; state.assigneeFilter=a.name; render(); window.scrollTo({top:0,behavior:'smooth'}); if(window.d2Toast) window.d2Toast('Showing '+a.name+'’s calls — clear it from Filters',{ms:4000}); }catch(e){} }
    else if(k==='date'){ closeS(); if(typeof jumpToDateFromQuickSearch==='function') jumpToDateFromQuickSearch(a.d).then(function(){ try{ closeAllPanels(); render(); }catch(e){} }); }
    else if(k==='panel'){ closeS(); try{ openOnlyPanel(a.panel); render(); }catch(e){} }
    else if(k==='tool'){ closeS(); try{ a.cmd.action(); render(); }catch(e){ console.warn(e); } }
    else if(k==='workspace'){ closeS(); if(window.d10Open) window.d10Open(a.tab); }
    else if(k==='own'){ closeS(); if(a.id==='__s' && window.d11Settings) window.d11Settings(); else if(a.id==='__p' && window.d7Open) window.d7Open(); else if(window.d10Open) window.d10Open(a.id); }
  }

  document.addEventListener('click', function(e){
    var t = e.target; if(!t.closest) return;
    var nv = t.closest('#navSearch'); if(nv){ e.preventDefault(); e.stopPropagation(); if(el) closeS(); else openS(); return; }
    if(!el) return;
    if(t===el){ closeS(); return; }
    var a = t.closest('[data-d12a]'); if(a){ var k = a.dataset.d12a; if(k==='close') closeS(); else if(k==='erase'){ q=''; paint(); } else if(k==='clear'){ LS.set('cd.d12.recent','[]'); paint(); } return; }
    var c = t.closest('[data-d12c]'); if(c){ chip = c.dataset.d12c; paint(); return; }
    var rq = t.closest('[data-d12q]'); if(rq){ q = rq.dataset.d12q; paint(); return; }
    var m = t.closest('[data-d12m]'); if(m){ openMore[m.dataset.d12m] = 1; paint(); return; }
    var r = t.closest('[data-d12r]'); if(r){ var p = r.dataset.d12r.split(':'), L = last && last[p[0]]; if(L && L[+p[1]]) act(L[+p[1]].act); }
  }, true);
  var timer = null;
  document.addEventListener('input', function(e){ if(!el || !e.target.classList || !e.target.classList.contains('d12-q')) return; if(e.isComposing) return; q = e.target.value; clearTimeout(timer); timer = setTimeout(paint, (window.innerWidth<760 ? 160 : 100)); });
  document.addEventListener('keydown', function(e){
    if(!el) return;
    if(e.key==='Escape'){ closeS(); }
    else if(e.key==='Enter' && e.target.classList && e.target.classList.contains('d12-q') && last){ var f = ['quick','cand','calls','client','people','asm','tools'].map(function(k){ return last[k] && last[k][0]; }).filter(Boolean)[0]; if(f) act(f.act); }
  });

  function injectNav(){
    var nav = document.getElementById('bottomNav'); if(!nav || document.getElementById('navSearch')) return;
    var b = document.createElement('button'); b.className='bottom-nav-item'; b.id='navSearch'; b.type='button'; b.dataset.nav='search'; b.setAttribute('aria-label','Search everything');
    b.innerHTML = '<span class="bottom-nav-icon"><svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></span><span class="bottom-nav-label">Search</span>';
    var home = document.getElementById('navHome'); nav.insertBefore(b, home ? home.nextSibling : nav.firstChild);
  }
  function injectAdmin(){
    var dd = $('.more-menu-dropdown.d6'); if(!dd || $('#openAdminFromNav', dd)) return;
    var host = $('.d6-grp[data-name="Today"] .d6-body', dd) || $('.d6-body', dd); if(!host) return;
    var b = document.createElement('button'); b.className='more-menu-item'; b.id='openAdminFromNav'; b.type='button'; b.innerHTML='🔧 Admin tools';
    b.addEventListener('click', function(){ var t = document.getElementById('navTools'); if(t) t.click(); });
    host.insertBefore(b, host.firstChild);
  }
  function install(){
    if(typeof window.render!=='function' || !window.__d11){ return setTimeout(install,150); }
    injectNav();
    var prev = window.d2ExtraCmds;
    window.d2ExtraCmds = function(){ var base = prev ? prev() : []; return base.concat([['search everything find candidate company handler','Search everything','Candidates, calls, clients, people…',function(){ openS(); },'🔍']]); };
    var o = window.render; window.render = function(){ var r = o.apply(this, arguments); try{ injectNav(); injectAdmin(); }catch(e){} return r; };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== d13: Name matches — review / reverse "same person" decisions ===== */
;(function(){
  if(window.__d13) return; window.__d13 = true;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var el = null, rows = [], err = '', q = '';
  function closeS(){ if(el){ el.remove(); el = null; } }
  function sName(id){ var s = (state.studentsMaster||[]).find(function(x){ return x.id===id; }); return s ? s.name : '(removed from Students Master)'; }
  function paint(){
    if(!el) return;
    var ql = q.trim().toLowerCase();
    var list = rows.filter(function(r){ return !ql || (r.candidateName+' '+sName(r.studentId)).toLowerCase().indexOf(ql)>=0; });
    var btn = 'padding:5px 10px;border-radius:8px;border:1px solid var(--border,#333);background:transparent;color:inherit;cursor:pointer;font-size:12px';
    el.querySelector('.d13-body').innerHTML =
      (err ? '<div style="color:var(--coral,#f66);font-size:12px;margin-bottom:6px">'+esc(err)+'</div>' : '') +
      (list.length ? list.map(function(r,i){
        var conf = r.decision==='confirmed';
        return '<div style="display:flex;gap:8px;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px solid var(--border,#2a2f3a)">' +
          '<div style="min-width:0"><div style="font-size:14px;font-weight:600">'+esc(r.candidateName||r.candidateKey)+'</div>' +
          '<div style="font-size:12px;opacity:.75">'+(conf?'✓ marked same person as':'✗ marked different from')+' <b>'+esc(sName(r.studentId))+'</b></div></div>' +
          '<button type="button" data-d13="'+r._i+'" style="'+btn+';white-space:nowrap">'+(conf?'Not the same person':'Same person')+'</button></div>';
      }).join('') : '<div style="opacity:.7;font-size:13px;padding:10px 0">No saved decisions'+(ql?' match that search':' yet')+'.</div>');
  }
  async function flip(i){
    var r = rows[i]; if(!r) return;
    var nd = r.decision==='confirmed' ? 'rejected' : 'confirmed';
    var pair = r.candidateKey+'|'+r.studentId;
    err = '';
    try{
      if(API_BASE_URL) await apiCall('student_match_decisions', {method:'POST', body:{candidateKey:r.candidateKey, candidateName:(r.candidateName||r.candidateKey), studentId:r.studentId, decision:nd}});
      if(nd==='confirmed'){ state.rejectedStudentMatches.delete(pair); state.confirmedStudentMatches.add(pair); }
      else { state.confirmedStudentMatches.delete(pair); state.rejectedStudentMatches.add(pair); }
      r.decision = nd;
      try{ invalidateStudentMatchCache(); }catch(e){}
      try{ render(); }catch(e){}
    }catch(e){ err = 'Could not save: '+((e&&e.message)||e); }
    paint();
  }
  async function openS(){
    closeS();
    el = document.createElement('div');
    el.style.cssText = 'position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:16px';
    el.innerHTML = '<div style="background:var(--surface,#1c2230);color:var(--text,#fff);border:1px solid var(--border,#333);border-radius:14px;max-width:520px;width:100%;max-height:85vh;display:flex;flex-direction:column;padding:16px;gap:8px">' +
      '<div style="font-weight:700;font-size:15px">🔁 Name matches</div>' +
      '<div style="font-size:12px;opacity:.75">Every "same person / different" decision you made against Students Master. Reverse a wrong one here.</div>' +
      '<input class="d13-q" type="text" placeholder="Search a name…" autocomplete="off" style="padding:8px;border-radius:8px">' +
      '<div class="d13-body" style="overflow:auto;flex:1;min-height:80px">Loading…</div>' +
      '<button type="button" class="d13-x" style="'+'padding:8px;border-radius:8px;border:1px solid var(--border,#333);background:transparent;color:inherit;cursor:pointer'+'">Close</button></div>';
    document.body.appendChild(el);
    try{
      var d = await apiCall('student_match_decisions', {});
      rows = (d.rows||[]).slice().reverse().map(function(r,i){ r._i = i; return r; });
      err = '';
    }catch(e){ rows = []; err = 'Could not load decisions: '+((e&&e.message)||e); }
    paint();
  }
  document.addEventListener('click', function(e){
    if(!el) return;
    if(e.target===el || (e.target.classList && e.target.classList.contains('d13-x'))) return closeS();
    var b = e.target.closest && e.target.closest('[data-d13]'); if(b) flip(Number(b.dataset.d13));
  });
  document.addEventListener('input', function(e){ if(el && e.target.classList && e.target.classList.contains('d13-q')){ q = e.target.value; paint(); } });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && el) closeS(); });
  window.d13Open = openS;
  function injectMenu(){
    var dd = $('.more-menu-dropdown.d6'); if(!dd || $('#openD13', dd)) return;
    var host = $('.d6-grp[data-name="Today"] .d6-body', dd) || $('.d6-body', dd); if(!host) return;
    var b = document.createElement('button'); b.className='more-menu-item'; b.id='openD13'; b.type='button'; b.title='Review or reverse same-person decisions'; b.innerHTML='🔁 Name matches';
    b.addEventListener('click', function(){ try{ state.showMoreMenu=false; render(); }catch(x){} openS(); });
    host.appendChild(b);
  }
  function install(){
    if(typeof window.render!=='function' || !window.__d12){ return setTimeout(install,150); }
    var o = window.render; window.render = function(){ var r = o.apply(this, arguments); try{ injectMenu(); }catch(e){} return r; };
    var prev = window.d2ExtraCmds;
    window.d2ExtraCmds = function(){ var base = prev ? prev() : []; return base.concat([['name matches same person students master undo wrong','Name matches','Reverse same-person decisions',openS,'🔁']]); };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== d14: Sync Google Doc — pull upcoming calls from the group's tracker doc (preview first, admin only) ===== */
;(function(){
  if(window.__d14) return; window.__d14 = true;
  var $ = function(s,r){ return (r||document).querySelector(s); };
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var MONTHS = {january:1,february:2,march:3,april:4,may:5,june:6,july:7,august:8,september:9,october:10,november:11,december:12};
  var el = null, S = { url:'', paste:'', busy:false, msg:'', err:'', plan:null, applying:false, results:[], dismissed:[], inbox:null, changed:false };
  var KEY = 'gdoc_sync_url';

  function closeS(){ if(el){ el.remove(); el = null; } }
  function nk(t){ return String(t||'').replace(/\s+/g,'').toUpperCase(); }
  function ck(c){ try{ return normalizeCompanyKey(c); }catch(e){ return String(c||'').toLowerCase().replace(/[^a-z0-9]/g,''); } }
  function tmin(t){ try{ var v = timeToMinutes(t); return (typeof v==='number' && v!==9999) ? v : nk(t); }catch(e){ return nk(t); } }
  function sameCo(a,b){ var x = ck(a), y = ck(b); if(x===y) return true; if(x.length>=5 && y.length>=5 && (x.indexOf(y)>-1 || y.indexOf(x)>-1)) return true; try{ return !!fuzzyCompanyKeyMatch(a,b); }catch(e){ return false; } }
  function rk(r){ try{ return lcRoundKey(r); }catch(e){ return String(r||'').toLowerCase(); } }
  function parseLink(u){
    var m = String(u||'').match(/document\/d\/([A-Za-z0-9_-]{20,})/), t = String(u||'').match(/[?&]tab=(t\.[A-Za-z0-9]+)/);
    return m ? { id:m[1], tab: t ? t[1] : '' } : null;
  }
  function fmtDate(d){ try{ return new Date(d+'T00:00:00').toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short'}); }catch(e){ return d; } }

  /* split the doc text into {date: [lines]} (only dates from `from` on) */
  function sections(text, from){
    var t = String(text||'').replace(/\\\*/g,'').replace(/\*\*+/g,'').replace(/&#10;|&nbsp;|&#160;|&#13;/g,' ');
    var re = /^[^A-Za-z\n]*(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(20\d\d)\s*\(\w+\)/gim, heads = [], m;
    while((m = re.exec(t)) !== null){
      heads.push({ at:m.index, end:m.index+m[0].length, iso: m[3]+'-'+String(MONTHS[m[1].toLowerCase()]).padStart(2,'0')+'-'+String(m[2]).padStart(2,'0') });
    }
    var out = {};
    heads.forEach(function(h,i){
      if(h.iso < from) return;
      var body = t.slice(h.end, i+1<heads.length ? heads[i+1].at : t.length);
      var lines = body.split('\n').map(function(l){ return l.replace(/^\s*\d{1,3}[\.\)]\s*/,'').replace(/\s+/g,' ').trim(); }).filter(function(l){ return l.length>3 && l.charAt(0)!=='[' && l.charAt(0)!=='#'; });
      out[h.iso] = (out[h.iso]||[]).concat(lines);
    });
    return out;
  }

  function warnReason(p){
    var c = String(p.candidate||'');
    if(/reschedul|cancel/i.test(p.raw||'')) return 'mentions reschedule/cancel — check the doc line';
    if((!p.time && !p.woi) || !p.company || c.length>45 || /[-–—(]/.test(c)) return 'could not read this line fully — check it';
    return '';
  }

  async function dayRows(date){
    if(date === state.date) return (state.rows||[]).slice();
    if(!API_BASE_URL) return [];
    var r = await apiCall('calls', {qs:'date='+encodeURIComponent(date)});
    return (r && r.rows) || [];
  }

  async function buildPlan(text){
    var from = todayDateString();
    var secs = sections(text, from), dates = Object.keys(secs).sort(), plan = { from:from, days:[], docLines:0, hidden:0 };
    var dis = {}; (S.dismissed||[]).forEach(function(k){ dis[k] = 1; });
    if(!dates.length) return plan;
    for(var i=0;i<dates.length;i++){
      var d = dates[i], lines = secs[d];
      if(!lines.length) continue;
      var parsed = [];
      try{ parsed = parseImportText(lines.join('\n'), d, '1st') || []; }catch(e){ parsed = []; }
      parsed = parsed.filter(function(p){ return p && p.candidate; });
      if(!parsed.length) continue;
      var existing = await dayRows(d);
      var used = {}, day = { date:d, docCount:parsed.length, fresh:[], same:0, changed:[], onlyApp:0, all:[] };
      var seenKey = {};
      day.dupes = 0;
      parsed.forEach(function(p){
        var dk = String(p.candidate||'').trim().toLowerCase()+'|'+ck(p.company)+'|'+nk(p.time);
        if(seenKey[dk]){ day.dupes++; return; }
        seenKey[dk] = 1;
        var ex = findExistingCallMatch(p, existing);
        if(!ex){
          var key = d+'|'+String(p.candidate||'').trim().toLowerCase()+'|'+ck(p.company)+'|'+nk(p.time);
          if(dis[key]){ day.hidden = (day.hidden||0)+1; day.all.push({ p:p, st:'hidden' }); return; }
          day.fresh.push({ p:p, key:key, warn: warnReason(p) }); day.all.push({ p:p, st:'new' }); return;
        }
        used[ex.id] = 1;
        var diffs = [];
        if(!p.woi && !ex.woi && p.time && ex.time && tmin(p.time)!==tmin(ex.time)) diffs.push('time: doc '+p.time+' · app '+ex.time);
        if(p.company && ex.company && !sameCo(p.company, ex.company)) diffs.push('company: doc '+p.company+' · app '+ex.company);
        var explicit = !(p.doubts||[]).some(function(x){ return /Round wasn.t stated/.test(x); });
        if(explicit && p.round && ex.round && rk(p.round)!==rk(ex.round)) diffs.push('round: doc '+p.round+' · app '+ex.round);
        if(diffs.length){ day.changed.push({ p:p, ex:ex, diffs:diffs }); day.all.push({ p:p, ex:ex, st:'diff', diffs:diffs }); } else { day.same++; day.all.push({ p:p, ex:ex, st:'in' }); }
      });
      day.onlyApp = existing.filter(function(r){ return r && r.candidate && !used[r.id]; }).length;
      plan.days.push(day); plan.docLines += parsed.length; plan.hidden += (day.hidden||0);
    }
    return plan;
  }

  function planHtml(){
    var P = S.plan; if(!P) return '';
    if(!P.days.length) return '<div style="opacity:.75;font-size:13px;padding:8px 0">No calls from '+esc(fmtDate(P.from))+' onwards were found in that text.</div>';
    var tot = P.days.reduce(function(a,d){ return a+d.fresh.length; },0);
    var out = '<div style="font-size:13px;margin:6px 0">'+P.docLines+' calls in the doc from '+esc(fmtDate(P.from))+' on · <b>'+tot+' new</b> · '+P.days.reduce(function(a,d){return a+d.same;},0)+' already in the app · '+P.days.reduce(function(a,d){return a+d.changed.length;},0)+' differ</div>';
    P.days.forEach(function(d,di){
      out += '<details '+(d.fresh.length||d.changed.length?'open':'')+' style="border-top:1px solid var(--border,#2a2f3a);padding:6px 0"><summary style="cursor:pointer;font-size:13px"><b>'+esc(fmtDate(d.date))+'</b> — '+d.docCount+' in doc · <b>'+d.fresh.length+' new</b> · '+d.same+' same'+(d.changed.length?' · <span style="color:var(--amber,#e8a33d)">'+d.changed.length+' differ</span>':'')+(d.onlyApp?' · '+d.onlyApp+' only in app':'')+(d.dupes?' · '+d.dupes+' repeated in doc':'')+'</summary>';
      d.fresh.forEach(function(f,fi){
        var p = f.p;
        out += '<label style="display:flex;gap:8px;align-items:flex-start;padding:5px 2px;font-size:13px"><input type="checkbox" data-d14="'+di+'|'+fi+'" '+(S.sel[di+'|'+fi]?'checked':'')+'><span><b>'+esc(p.time||'no time')+'</b> · '+esc(p.candidate)+' · '+esc(p.company||'?')+' · '+esc(p.round||'')+(p.country?' · '+esc(p.country):'')+(p.woi?' · waiting for invite':'')+(f.warn?' <span style="color:var(--amber,#e8a33d)">⚠ '+esc(f.warn)+'</span>':'')+'</span></label>';
      });
      d.changed.forEach(function(c){
        out += '<div style="font-size:12.5px;padding:4px 2px 4px 26px;opacity:.85">≠ <b>'+esc(c.p.candidate)+'</b> — '+esc(c.diffs.join('; '))+' <i>(not changed)</i></div>';
      });
      out += '</details>';
    });
    return out;
  }

  var ST = { 'new':['＋ New','rgba(80,200,160,.16)'], 'in':['✓ In app','transparent'], 'diff':['≠ Differs','rgba(232,163,61,.16)'], 'hidden':['Dismissed','rgba(127,127,127,.12)'] };
  function sheetRows(){
    var out = [];
    ((S.plan && S.plan.days) || []).forEach(function(d){ (d.all||[]).forEach(function(a, i){ out.push({ date:d.date, i:i+1, a:a }); }); });
    return out;
  }
  function sheetHtml(){
    var P = S.plan; if(!P) return '';
    if(!P.days.length) return '<div style="opacity:.75;font-size:13px;padding:8px 0">No calls from '+esc(fmtDate(P.from))+' onwards were found in the doc.</div>';
    var G = 'display:grid;grid-template-columns:28px 76px minmax(150px,1.4fr) minmax(130px,1.1fr) 64px 64px 118px;gap:0;min-width:680px;align-items:start';
    var th = 'padding:6px 8px;font-weight:600;font-size:11.5px;opacity:.75;white-space:nowrap';
    var td = 'padding:7px 8px;font-size:12.5px;border-top:1px solid var(--border,#2a2f3a);min-width:0;overflow-wrap:anywhere';
    var out = '<div style="font-size:12px;opacity:.75">A read-only copy of the Google Doc. Nothing here changes your calls — to bring a call in, use the Review tab (or Import as usual).</div>';
    P.days.forEach(function(d){
      var nNew = (d.all||[]).filter(function(x){ return x.st==='new'; }).length;
      out += '<details open style="margin-top:6px"><summary style="cursor:pointer;font-size:13px;padding:4px 0"><b>'+esc(fmtDate(d.date))+'</b> — '+(d.all||[]).length+' calls'+(nNew?' · <b>'+nNew+' not in app</b>':' · all in app')+'</summary>'+
        '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;border-radius:10px"><div role="table" style="min-width:680px"><div role="row" style="'+G+'"><div style="'+th+'">#</div><div style="'+th+'">Time</div><div style="'+th+'">Candidate</div><div style="'+th+'">Company</div><div style="'+th+'">Round</div><div style="'+th+'">Country</div><div style="'+th+'">In app?</div></div>';
      (d.all||[]).forEach(function(a, i){
        var p = a.p, st = ST[a.st] || ST['in'];
        var tip = a.diffs ? ' title="'+esc(a.diffs.join('; '))+'"' : '';
        out += '<div role="row" style="'+G+';background:'+st[1]+'"><div style="'+td+';opacity:.55">'+(i+1)+'</div><div style="'+td+';white-space:nowrap;font-weight:600">'+esc(p.time||(p.woi?'WOI':'—'))+'</div><div style="'+td+'">'+esc(p.candidate)+'</div><div style="'+td+'">'+esc(p.company||'—')+'</div><div style="'+td+'">'+esc(p.round||'')+'</div><div style="'+td+'">'+esc(p.country||'')+'</div><div style="'+td+'"'+tip+'>'+st[0]+(a.ex && a.ex.assignee ? '<div style="opacity:.7;font-size:11.5px">'+esc(a.ex.assignee)+'</div>' : '')+(a.diffs?'<div style="opacity:.8;font-size:11.5px">'+esc(a.diffs[0])+'</div>':'')+'</div></div>';
      });
      out += '</div></div></details>';
    });
    out += '<div style="margin-top:8px"><button type="button" class="d14-copy" style="padding:8px 12px;border-radius:8px;border:1px solid var(--border,#333);background:transparent;color:inherit;cursor:pointer;font-size:13px">📋 Copy as sheet (paste into Google Sheets / Excel)</button></div>';
    return out;
  }
  function copySheet(){
    var lines = ['Date\tTime\tCandidate\tCompany\tRound\tCountry\tIn app?'];
    sheetRows().forEach(function(r){ var p = r.a.p; lines.push([r.date, p.time||(p.woi?'WOI':''), p.candidate, p.company||'', p.round||'', p.country||'', (ST[r.a.st]||ST['in'])[0].replace(/^[＋✓≠]\s*/,'')].map(function(x){ return String(x==null?'':x).replace(/[\t\r\n]+/g,' '); }).join('\t')); });
    var txt = lines.join('\n');
    var done = function(ok){ S.msg = ok ? ('Copied '+(lines.length-1)+' rows. Paste into a sheet.') : 'Could not copy automatically.'; S.err=''; paint(); };
    try{ navigator.clipboard.writeText(txt).then(function(){ done(true); }, function(){ done(false); }); }
    catch(e){ done(false); }
  }

  function ago(iso){
    if(!iso) return '';
    try{ return new Date(iso).toLocaleString(undefined,{weekday:'short',hour:'numeric',minute:'2-digit',day:'numeric',month:'short'}); }catch(e){ return ''; }
  }
  function statusHtml(){
    var I = S.inbox, out = '';
    if(!I || !I.fetchedAt){
      out = 'Not checked yet. Press “Check the doc now”.';
    } else {
      out = 'Last checked: <b>'+esc(ago(I.fetchedAt))+'</b>'+(I.changedAt?' · doc last changed: <b>'+esc(ago(I.changedAt))+'</b>':'');
    }
    var errHtml = (I && I.lastError) ? '<div style="color:var(--coral,#f66);margin-top:3px">⚠ The last check failed: '+esc(I.lastError)+' (showing the previous copy)</div>' : '';
    return '<div style="font-size:12.5px;padding:8px 10px;border-radius:8px;background:rgba(127,127,127,.12)">'+out+errHtml+'</div>';
  }
  async function loadInbox(){
    var r = await apiCall('gdoc_inbox', {});
    S.inbox = r || null;
    S.dismissed = (r && r.dismissed) || [];
    if(r && r.url && !S.url) S.url = r.url;
    S.changed = false;
    try{ localStorage.setItem('cd-gdoc-seen', (r && r.hash) || ''); }catch(e){}
    try{ var b = document.getElementById('openD14'); if(b) b.innerHTML = '📄 Google Doc inbox'; }catch(e){}
    return r;
  }

  function paint(){
    if(!el) return;
    var btn = 'padding:8px 12px;border-radius:8px;border:1px solid var(--border,#333);background:transparent;color:inherit;cursor:pointer;font-size:13px';
    var nSel = S.plan ? Object.keys(S.sel).filter(function(k){ return S.sel[k]; }).length : 0;
    try{ el.firstChild.style.maxWidth = S.tab==='sheet' ? '980px' : '640px'; }catch(e){}
    el.querySelector('.d14-body').innerHTML =
      '<div style="font-size:12px;opacity:.75">This is a waiting room. The doc is checked every hour and new calls wait here. Nothing goes into your main calls until you tick calls and press Add. Calls already in the app are never changed or removed.</div>'+
      statusHtml()+
      '<details '+(S.url?'':'open')+' style="font-size:12px"><summary style="cursor:pointer;opacity:.8">Google Doc link'+(S.url?' (saved)':'')+'</summary><input class="d14-url" type="text" value="'+esc(S.url)+'" placeholder="https://docs.google.com/document/d/…" autocomplete="off" style="padding:8px;border-radius:8px;width:100%;box-sizing:border-box;margin-top:6px"><div style="opacity:.7;margin-top:4px">The doc must be shared as “Anyone with the link can view”.</div></details>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><button type="button" class="d14-fetch" style="'+btn+'" '+(S.busy?'disabled':'')+'>'+(S.busy?'Reading…':'🔄 Check the doc now')+'</button>'+(S.dismissed.length?'<button type="button" class="d14-restore" style="'+btn+'">Show '+S.dismissed.length+' dismissed again</button>':'')+'</div>'+
      '<details '+(S.err?'open':'')+' style="font-size:12px"><summary style="cursor:pointer;opacity:.8">…or paste the doc text instead</summary><textarea class="d14-paste" placeholder="Copy from the doc and paste here" style="width:100%;box-sizing:border-box;min-height:90px;margin-top:6px;border-radius:8px;padding:8px">'+esc(S.paste)+'</textarea><button type="button" class="d14-usepaste" style="'+btn+';margin-top:6px">Check pasted text</button></details>'+
      (S.err?'<div style="color:var(--coral,#f66);font-size:13px">'+esc(S.err)+'</div>':'')+
      (S.msg?'<div style="font-size:13px;color:var(--teal,#4fd1b0);white-space:pre-line">'+esc(S.msg)+'</div>':'')+
      (S.plan ? '<div style="display:flex;gap:6px;margin-top:2px"><button type="button" class="d14-tab" data-tab="review" style="'+btn+(S.tab!=='sheet'?';background:var(--teal-dim,rgba(80,200,160,.18));font-weight:700':'')+'">Review new</button><button type="button" class="d14-tab" data-tab="sheet" style="'+btn+(S.tab==='sheet'?';background:var(--teal-dim,rgba(80,200,160,.18));font-weight:700':'')+'">Sheet (whole doc)</button></div>' : '')+
      (S.tab==='sheet' ? sheetHtml() : planHtml())+
      (S.tab!=='sheet' && S.plan && S.plan.days.length ? '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button type="button" class="d14-apply" style="'+btn+';background:var(--teal-dim,rgba(80,200,160,.18))" '+((S.applying||!nSel)?'disabled':'')+'>'+(S.applying?'Adding…':'Add '+nSel+' selected to main calls')+'</button><button type="button" class="d14-dismiss" style="'+btn+'" '+((S.applying||!nSel)?'disabled':'')+'>Dismiss selected</button><button type="button" class="d14-all" style="'+btn+'">Select all new</button><button type="button" class="d14-none" style="'+btn+'">Select none</button></div>' : '');
  }

  function selectDefaults(){
    S.sel = {};
    (S.plan ? S.plan.days : []).forEach(function(d,di){ d.fresh.forEach(function(f,fi){ S.sel[di+'|'+fi] = !f.warn; }); });
  }

  async function runPlan(text){
    S.lastText = text;
    S.busy = true; S.err = ''; S.msg = ''; S.plan = null; paint();
    try{
      S.plan = await buildPlan(text);
      selectDefaults();
      S.msg = '';
    }catch(e){ S.err = 'Could not read the doc: '+((e&&e.message)||e); }
    S.busy = false; paint();
  }

  async function fetchDoc(){
    var info = parseLink(S.url);
    if(!info){ S.err = 'Add the Google Doc link first (open “Google Doc link” above and paste it).'; paint(); return; }
    S.busy = true; S.err = ''; S.msg = ''; paint();
    try{
      await apiCall('gdoc_inbox', {method:'POST', body:{action:'refresh', url:S.url}});
      try{ saveAppSetting(KEY, S.url).catch(function(){}); }catch(e){}
      await loadInbox();
      S.busy = false;
      await runPlan((S.inbox && S.inbox.text) || '');
      if(S.plan && !S.plan.days.length && !S.err){ S.msg = 'The doc was read but no calls from today on were found.'; paint(); }
    }catch(e){
      S.busy = false; S.err = (e && e.message) || 'Could not read the doc.';
      try{ await loadInbox(); }catch(x){}
      paint();
    }
  }

  async function dismissSel(){
    if(!S.plan) return;
    var keys = [];
    S.plan.days.forEach(function(d,di){ d.fresh.forEach(function(f,fi){ if(S.sel[di+'|'+fi]) keys.push(f.key); }); });
    if(!keys.length) return;
    S.busy = true; paint();
    try{
      var r = await apiCall('gdoc_inbox', {method:'POST', body:{action:'dismiss', keys:keys}});
      S.dismissed = (r && r.dismissed) || S.dismissed.concat(keys);
      S.msg = keys.length+' dismissed. They will not come back unless you press “Show dismissed again”.';
    }catch(e){ S.err = 'Could not dismiss: '+((e&&e.message)||e); }
    await runPlanKeepMsg();
  }
  async function restoreDismissed(){
    S.busy = true; paint();
    try{ await apiCall('gdoc_inbox', {method:'POST', body:{action:'restore'}}); S.dismissed = []; S.msg = 'Dismissed calls are back in the list.'; }
    catch(e){ S.err = 'Could not restore: '+((e&&e.message)||e); }
    await runPlanKeepMsg();
  }

  async function apply(){
    if(S.applying) return;
    var jobs = [];
    S.plan.days.forEach(function(d,di){
      var rows = [];
      d.fresh.forEach(function(f,fi){ if(S.sel[di+'|'+fi]) rows.push(f.p); });
      if(rows.length) jobs.push({ date:d.date, rows:rows });
    });
    if(!jobs.length) return;
    S.applying = true; S.err = ''; S.msg = ''; paint();
    var lines = [], failed = false;
    for(var i=0;i<jobs.length;i++){
      var j = jobs[i];
      try{
        if(j.date === state.date){
          await createBackup('pre-gdoc-sync', j.date, state.rows);
          var fresh = j.rows.filter(function(p){ return !findExistingCallMatch(p, state.rows); });
          var routed = await autoRouteRows(fresh.map(function(p){ var r = Object.assign({}, p); delete r._targetDate; return r; }), state.rows);
          state.rows = state.rows.concat(routed);
          markDirty();
          await saveAllChanges();
          if(state.saveError) throw new Error(state.saveError);
          lines.push('✓ '+fmtDate(j.date)+': '+routed.length+' added'+(fresh.length<j.rows.length?' ('+(j.rows.length-fresh.length)+' already there)':''));
        } else {
          var cur = await dayRows(j.date);
          await createBackup('pre-gdoc-sync', j.date, cur);
          var fr = j.rows.filter(function(p){ return !findExistingCallMatch(p, cur); });
          var rt = await autoRouteRows(fr.map(function(p){ var r = Object.assign({}, p); delete r._targetDate; return r; }), cur);
          var merged = cur.concat(rt);
          await apiCall('calls', {method:'POST', body:{date:j.date, rows:merged}});
          var chk = await dayRows(j.date);
          if(chk.length < merged.length) throw new Error('Save could not be verified: the server shows '+chk.length+' calls, expected '+merged.length+'.');
          lines.push('✓ '+fmtDate(j.date)+': '+rt.length+' added'+(fr.length<j.rows.length?' ('+(j.rows.length-fr.length)+' already there)':''));
        }
      }catch(e){
        failed = true;
        lines.push('⚠ '+fmtDate(j.date)+': NOT saved — '+((e&&e.message)||e));
      }
    }
    S.applying = false;
    S.msg = lines.join('\n');
    if(failed) S.err = 'Some days failed — see above. Nothing was lost; run the check again to retry.';
    try{ _allRowsAcrossDatesCacheAt = 0; }catch(e){}
    try{ render(); }catch(e){}
    await runPlanKeepMsg();
  }
  async function runPlanKeepMsg(){
    var keepMsg = S.msg, keepErr = S.err, src = S.lastText;
    if(!src){ paint(); return; }
    try{ S.plan = await buildPlan(src); selectDefaults(); }catch(e){}
    S.busy = false; S.msg = keepMsg; S.err = keepErr; paint();
  }

  async function openS(){
    closeS();
    S = { url:S.url||'', paste:'', busy:false, msg:'', err:'', plan:null, applying:false, sel:{} , lastText:'', dismissed:[], inbox:null, changed:S.changed };
    try{ S.url = (state.appSettings && state.appSettings[KEY]) || ''; }catch(e){}
    el = document.createElement('div');
    el.style.cssText = 'position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:16px';
    el.innerHTML = '<div style="background:var(--surface,#1c2230);color:var(--text,#fff);border:1px solid var(--border,#333);border-radius:14px;max-width:640px;width:100%;max-height:88vh;display:flex;flex-direction:column;padding:16px;gap:10px"><div style="display:flex;align-items:center"><div style="font-weight:700;font-size:15px;flex:1">📄 Google Doc inbox</div><button type="button" class="d14-x" style="background:transparent;border:0;color:inherit;font-size:18px;cursor:pointer" aria-label="Close">✕</button></div><div class="d14-body" style="overflow:auto;display:flex;flex-direction:column;gap:10px"></div></div>';
    document.body.appendChild(el);
    S.busy = true; paint();
    try{
      await loadInbox();
      S.busy = false;
      if(S.inbox && S.inbox.text) await runPlan(S.inbox.text); else paint();
    }catch(e){ S.busy = false; S.err = 'Could not open the inbox: '+((e&&e.message)||e); paint(); }
  }

  document.addEventListener('click', function(e){
    if(!el) return;
    var t = e.target;
    if(t===el || (t.classList && t.classList.contains('d14-x'))) return closeS();
    if(t.classList.contains('d14-fetch')){ S.url = ($('.d14-url', el)||{}).value || S.url; return fetchDoc(); }
    if(t.classList.contains('d14-usepaste')){ S.paste = ($('.d14-paste', el)||{}).value || ''; return runPlan(S.paste); }
    if(t.classList.contains('d14-tab')){ S.tab = t.dataset.tab === 'sheet' ? 'sheet' : 'review'; S.msg=''; return paint(); }
    if(t.classList.contains('d14-copy')) return copySheet();
    if(t.classList.contains('d14-apply')) return apply();
    if(t.classList.contains('d14-dismiss')) return dismissSel();
    if(t.classList.contains('d14-restore')) return restoreDismissed();
    if(t.classList.contains('d14-all')){ if(S.plan) S.plan.days.forEach(function(d,di){ d.fresh.forEach(function(f,fi){ S.sel[di+'|'+fi] = true; }); }); return paint(); }
    if(t.classList.contains('d14-none')){ S.sel = {}; return paint(); }
    if(t.dataset && t.dataset.d14){ S.sel[t.dataset.d14] = t.checked; var b = $('.d14-apply', el); if(b){ var n = Object.keys(S.sel).filter(function(k){ return S.sel[k]; }).length; b.disabled = !n; b.textContent = 'Add '+n+' selected to main calls'; var dm = $('.d14-dismiss', el); if(dm) dm.disabled = !n; } }
  });
  document.addEventListener('input', function(e){
    if(!el) return;
    if(e.target.classList.contains('d14-url')) S.url = e.target.value;
    if(e.target.classList.contains('d14-paste')) S.paste = e.target.value;
  });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && el) closeS(); });
  window.d14Open = openS;

  function injectMenu(){
    var dd = $('.more-menu-dropdown.d6'); if(!dd || $('#openD14', dd) || (typeof CURRENT_ROLE!=='undefined' && CURRENT_ROLE!=='admin')) return;
    var host = $('.d6-grp[data-name="Today"] .d6-body', dd) || $('.d6-body', dd); if(!host) return;
    var b = document.createElement('button'); b.className='more-menu-item'; b.id='openD14'; b.type='button'; b.title='Review upcoming calls found in the Google Doc tracker (nothing is added until you approve)'; b.innerHTML='📄 Google Doc inbox'+(S.changed?' <span style="color:var(--amber,#e8a33d)">● doc updated</span>':'');
    b.addEventListener('click', function(){ try{ state.showMoreMenu=false; render(); }catch(x){} openS(); });
    host.appendChild(b);
  }
  function install(){
    if(typeof window.render!=='function' || !window.__d13){ return setTimeout(install,150); }
    var o = window.render; window.render = function(){ var r = o.apply(this, arguments); try{ injectMenu(); }catch(e){} return r; };
    try{
      if(typeof CURRENT_ROLE!=='undefined' && CURRENT_ROLE==='admin' && API_BASE_URL){
        var chk = function(){ apiCall('gdoc_inbox', {qs:'meta=1'}).then(function(m){
          var seen = ''; try{ seen = localStorage.getItem('cd-gdoc-seen') || ''; }catch(e){}
          S.changed = !!(m && m.hash && m.hash !== seen);
          try{
            if(m && m.lastError && window.livefeedApi){
              var dayK = new Date().toISOString().slice(0,10), errSeen = ''; try{ errSeen = localStorage.getItem('cd-gdoc-err-seen') || ''; }catch(e){}
              if(errSeen !== dayK){
                window.livefeedApi.add({ id:'gdocerr-'+dayK, title:'⚠ Google Doc sync failed', body: String(m.lastError).slice(0,120)+' Open the Google Doc inbox.', priority:'high', gdoc:true, tag:'cd-gdoc-err', date:'', candidate:'' });
                try{ localStorage.setItem('cd-gdoc-err-seen', dayK); }catch(e){}
              }
            }
          }catch(e){}
          try{
            if(S.changed && m.added > 0 && window.livefeedApi){
              window.livefeedApi.add({ id:'gdoc-'+String(m.hash).slice(0,10), title:'📄 Google Doc synced', body: m.added+' new call line'+(m.added===1?'':'s')+' found. Open the Google Doc inbox to review.', priority:'high', gdoc:true, tag:'cd-gdoc', date:'', candidate:'' });
            }
          }catch(e){}
          var b = document.getElementById('openD14'); if(b) b.innerHTML = '📄 Google Doc inbox'+(m && m.lastError ? ' <span style="color:var(--coral,#f66)">● sync failed</span>' : (S.changed?' <span style="color:var(--amber,#e8a33d)">● doc updated</span>':''));
        }).catch(function(){}); };
        setTimeout(chk, 4000); setInterval(chk, 3600000);
      }
    }catch(e){}
    var prev = window.d2ExtraCmds;
    window.d2ExtraCmds = function(){ var base = prev ? prev() : []; return base.concat([['sync google doc tracker upcoming calls import inbox','Google Doc inbox','Review upcoming calls from the tracker doc',openS,'📄']]); };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== d15: One UI / iOS feel — tag pop-ups as sheets, swipe-down to close, light haptics ===== */
;(function(){
  if(window.__d15) return; window.__d15 = true;
  var SEL = '#d2Timeline,#d2Handover,#d2Cmd,.d3-overlay,#d8,#m9,#d10,#d11,#d12,.my-name-picker-overlay';
  var mq = window.matchMedia ? window.matchMedia('(max-width:760px)') : { matches:false };
  var reduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion:reduce)') : { matches:false };

  function tag(n){
    if(!n || n.nodeType!==1 || n.classList.contains('d15-ov')) return;
    var st = n.getAttribute('style') || '';
    var inline = n.parentNode===document.body && /position:\s*fixed;\s*inset:\s*0/.test(st) && /z-index:\s*100000/.test(st);
    var known = false; try{ known = n.matches(SEL); }catch(e){}
    if(!inline && !known) return;
    if(inline) n.classList.add('d15-inline');
    n.classList.add('d15-ov');
  }
  function scan(){ try{ document.querySelectorAll(SEL).forEach(tag); Array.prototype.forEach.call(document.body.children, tag); }catch(e){} }
  try{
    new MutationObserver(function(muts){
      muts.forEach(function(m){ Array.prototype.forEach.call(m.addedNodes, tag); });
    }).observe(document.body, { childList:true });
  }catch(e){}
  scan();

  /* ----- swipe down to close ----- */
  var drag = null;
  function closeOverlay(ov, done){
    try{ document.dispatchEvent(new KeyboardEvent('keydown', { key:'Escape', code:'Escape', bubbles:true })); }catch(e){}
    setTimeout(function(){
      if(document.body.contains(ov) && ov.style.display!=='none'){
        try{ ov.dispatchEvent(new MouseEvent('click', { bubbles:true })); }catch(e){}
      }
      setTimeout(function(){ done(!document.body.contains(ov) || ov.style.display==='none'); }, 160);
    }, 120);
  }
  function reset(d){
    var s = d.sheet; if(!s) return;
    s.style.transition = 'transform .28s var(--d15-spring)'; s.style.transform = '';
    d.ov.style.transition = 'opacity .2s'; d.ov.style.opacity = '';
    setTimeout(function(){ s.style.transition = ''; d.ov.style.transition = ''; }, 320);
  }
  document.addEventListener('touchstart', function(e){
    drag = null;
    if(!mq.matches || e.touches.length!==1) return;
    var t = e.target; if(!t || !t.closest) return;
    var ov = t.closest('.d15-ov'); if(!ov) return;
    var sheet = ov.firstElementChild; if(!sheet || !sheet.contains(t)) return;
    var y0 = e.touches[0].clientY, r = sheet.getBoundingClientRect();
    var inGrab = (y0 - r.top) < 52;
    var blocked = false;
    for(var n=t; n && n!==ov; n=n.parentNode){
      if(n.nodeType===1 && n.scrollHeight>n.clientHeight+1 && n.scrollTop>0){
        var oy = getComputedStyle(n).overflowY; if(oy==='auto' || oy==='scroll'){ blocked = true; break; }
      }
    }
    var tag = (t.tagName||'').toLowerCase();
    if(!inGrab && (tag==='input' || tag==='textarea' || tag==='select')) return;
    drag = { ov:ov, sheet:sheet, x0:e.touches[0].clientX, y0:y0, dy:0, ok: inGrab || !blocked, started:false, t0:Date.now(), h:r.height||600 };
  }, { passive:true });
  document.addEventListener('touchmove', function(e){
    var d = drag; if(!d || !d.ok) return;
    var tt = e.touches[0], dy = tt.clientY - d.y0, dx = tt.clientX - d.x0;
    if(!d.started){
      if(dy>8 && dy>Math.abs(dx)*1.4){ d.started = true; d.sheet.style.transition = 'none'; d.sheet.style.animation = 'none'; d.ov.style.animation = 'none'; }
      else if(dy<-6 || Math.abs(dx)>12){ drag = null; return; }
      else return;
    }
    if(e.cancelable) e.preventDefault();
    d.dy = Math.max(0, dy);
    d.sheet.style.transform = 'translateY(' + d.dy + 'px)';
    d.ov.style.opacity = String(Math.max(.25, 1 - d.dy/(d.h*1.1)));
  }, { passive:false });
  function end(){
    var d = drag; drag = null;
    if(!d || !d.started) return;
    var dt = Math.max(1, Date.now()-d.t0), v = d.dy/dt;
    if(d.dy>110 || (v>.55 && d.dy>40)){
      d.sheet.style.transition = 'transform .22s ease-in'; d.sheet.style.transform = 'translateY(100%)';
      try{ if(navigator.vibrate && !reduce.matches) navigator.vibrate(6); }catch(e){}
      closeOverlay(d.ov, function(closed){ if(!closed){ reset(d); } });
    } else { reset(d); }
  }
  document.addEventListener('touchend', end, { passive:true });
  document.addEventListener('touchcancel', end, { passive:true });

  /* ----- light haptic tick on taps (Android Chrome only; silently nothing elsewhere) ----- */
  var HAP = '.btn,.d2-tool,.d4-chip,.d4-seg,.tab-btn,.bottom-nav-item,.filter-chip,.d3-chip,.more-menu-item,.arrow-btn';
  document.addEventListener('pointerdown', function(e){
    try{
      if(!navigator.vibrate || reduce.matches || e.pointerType!=='touch') return;
      var t = e.target; if(t && t.closest && t.closest(HAP) && !t.closest('[disabled]')) navigator.vibrate(5);
    }catch(x){}
  }, { passive:true });
})();

/* ===== d16: phone Back gesture / Android back button — closes the top pop-up or panel, never the whole app ===== */
;(function(){
  if(window.__d16) return; window.__d16 = true;
  var FLAGS = ['showMoreMenu','showToolsMenu','showImportMenu','showNavAddMenu','showQuickSearchModal','showSwipeAssignPicker','showClipboardPicker','quickActionRowId','showQuickJump','expectClosureRowId'];
  var pushed = 0, ignorePop = 0, fromBack = false, timer = null, lastTopKey = '', stuck = 0;

  function vis(e){ try{ return !!e && e.isConnected && getComputedStyle(e).display!=='none' && getComputedStyle(e).visibility!=='hidden'; }catch(x){ return false; } }
  function loggedIn(){ try{ return typeof state!=='undefined' && !state.needsLogin; }catch(e){ return false; } }

  /* every currently-open layer, top-most LAST */
  function layers(){
    var out = [];
    if(!loggedIn()) return out;
    try{
      if(typeof getActivePanelName==='function' && getActivePanelName()) out.push({ k:'panel:'+getActivePanelName(), close:function(){ closeAllPanels(); render(); } });
    }catch(e){}
    try{
      FLAGS.forEach(function(f){ if(state[f]) out.push({ k:'flag:'+f, close:function(){ state[f] = (f==='quickActionRowId'||f==='expectClosureRowId') ? null : false; render(); } }); });
    }catch(e){}
    try{ var lf = document.getElementById('liveFeedPanel'); if(vis(lf)) out.push({ k:'lf', close:function(){ var b = lf.querySelector('.lf-x,[aria-label="Close"],[data-lf-close]'); if(b) b.click(); else esc(); } }); }catch(e){}
    try{ var m4 = document.getElementById('d4Menu'); if(vis(m4)) out.push({ k:'d4menu', close:esc }); }catch(e){}
    try{
      Array.prototype.forEach.call(document.querySelectorAll('.d15-ov'), function(ov, i){
        if(!vis(ov)) return;
        // the "who are you" picker is a required step, not something Back may dismiss — but Ask Desk reuses its shell
        if(ov.classList.contains('my-name-picker-overlay') && !ov.querySelector('.ask-card')) return;
        out.push({ k:'ov:'+(ov.id||ov.className.split(' ')[0])+':'+i, el:ov, close:function(){ closeOv(ov); } });
      });
    }catch(e){}
    try{ Array.prototype.forEach.call(document.querySelectorAll('.d27-ov'), function(ov, i){ if(!vis(ov)) return; out.push({ k:'d27:'+(ov.id||'x')+':'+i, el:ov, close:function(){ ov.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); } }); }); }catch(e){}
    return out;
  }
  function esc(){ try{ document.dispatchEvent(new KeyboardEvent('keydown', { key:'Escape', code:'Escape', bubbles:true })); }catch(e){} }
  function closeOv(ov){
    esc();
    setTimeout(function(){ if(ov.isConnected && vis(ov)){ try{ ov.dispatchEvent(new MouseEvent('click', { bubbles:true })); }catch(e){} } }, 90);
  }

  function sync(){
    timer = null;
    var n = layers().length;
    if(n > pushed){
      for(var i=pushed;i<n;i++){ try{ history.pushState({ cdBack:1 }, '', location.href); }catch(e){} }
      pushed = n;
    } else if(n < pushed){
      var back = pushed - n; pushed = n;
      ignorePop++; try{ history.go(-back); }catch(e){ ignorePop = 0; }
    }
    fromBack = false;
  }
  function schedule(ms){ if(timer) return; timer = setTimeout(sync, ms==null ? 70 : ms); }

  window.addEventListener('popstate', function(){
    if(ignorePop > 0){ ignorePop--; return; }
    var L = layers();
    if(!L.length){ pushed = 0; return; }               // nothing open: this Back is a normal one (leaves the app)
    pushed = Math.max(0, pushed - 1);
    var top = L[L.length-1];
    var key = top.k;
    stuck = (key === lastTopKey) ? stuck + 1 : 0; lastTopKey = key;
    fromBack = true;
    try{ top.close(); }catch(e){ console.warn('[d16]', e); }
    setTimeout(function(){
      // if that layer refused to close, make sure the next Back can leave instead of trapping the user
      var after = layers();
      if(after.some(function(l){ return l.k === key; })){ if(top.el && top.el.isConnected){ try{ top.el.remove(); }catch(e){} } }
      fromBack = true; schedule(0);
    }, 260);
  });

  /* watch for layers opening / closing */
  try{ new MutationObserver(function(){ schedule(); }).observe(document.body, { childList:true, subtree:true }); }catch(e){}
  var iv = setInterval(function(){ schedule(0); }, 600);
  var st = setInterval(function(){ if(typeof window.render==='function' && !window.__d16r){ window.__d16r = true; var o = window.render; window.render = function(){ var r = o.apply(this, arguments); try{ schedule(); }catch(e){} return r; }; clearInterval(st); } }, 200);
  window.__d16State = function(){ return { pushed:pushed, layers:layers().map(function(l){ return l.k; }) }; };
})();

/* ===== d18: phone flow — full-screen panels (nav bar, push animation), swipe-to-dismiss alerts ===== */
;(function(){
  if(window.__d18) return; window.__d18 = true;
  var lastPanel = '', animT = null;
  var phone = function(){ return window.__d17vw < 760; };
  function name(){ try{ return (typeof state!=='undefined' && !state.needsLogin && typeof getActivePanelName==='function') ? (getActivePanelName()||'') : ''; }catch(e){ return ''; } }
  function apply(){
    var h = document.documentElement, n = phone() ? name() : '';
    var app = document.getElementById('app');
    h.classList.toggle('cd-pm', !!n);
    if(app){
      Array.prototype.forEach.call(app.querySelectorAll('.cd-pm-hide'), function(e){ e.classList.remove('cd-pm-hide'); });
      if(n){
        var bar = app.querySelector('.panel-header-bar');
        if(bar){ var p = bar.previousElementSibling; while(p){ p.classList.add('cd-pm-hide'); p = p.previousElementSibling; } }
      }
    }
    if(n !== lastPanel){
      var opened = !!n && !lastPanel;
      lastPanel = n;
      if(n){
        window.scrollTo(0,0);
        if(phone()){ h.classList.add('cd-pm-anim'); clearTimeout(animT); animT = setTimeout(function(){ h.classList.remove('cd-pm-anim'); }, 420); }
      } else { h.classList.remove('cd-pm-anim'); }
    }
  }
  function install(){
    if(typeof window.render!=='function' || !window.__d16){ return setTimeout(install,150); }
    var o = window.render; window.render = function(){ var r = o.apply(this, arguments); try{ apply(); }catch(e){} return r; };
    window.addEventListener('resize', function(){ try{ apply(); }catch(e){} }, { passive:true });
    try{ apply(); }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();

  /* swipe a live-feed alert up or sideways to dismiss it */
  var sw = null;
  document.addEventListener('touchstart', function(e){
    sw = null; if(e.touches.length!==1) return;
    var t = e.target.closest && e.target.closest('#liveFeedToasts .lf-toast'); if(!t) return;
    sw = { el:t, x:e.touches[0].clientX, y:e.touches[0].clientY, dx:0, dy:0, on:false };
  }, { passive:true });
  document.addEventListener('touchmove', function(e){
    if(!sw) return; var tt = e.touches[0]; sw.dx = tt.clientX - sw.x; sw.dy = tt.clientY - sw.y;
    if(!sw.on){ if(Math.abs(sw.dx)>10 || sw.dy<-10) sw.on = true; else return; }
    sw.el.style.transition = 'none';
    var d = Math.abs(sw.dx) > Math.abs(sw.dy) ? 'translateX('+sw.dx+'px)' : 'translateY('+Math.min(0,sw.dy)+'px)';
    sw.el.style.transform = d; sw.el.style.opacity = String(Math.max(.2, 1 - Math.max(Math.abs(sw.dx), -sw.dy)/220));
  }, { passive:true });
  function swEnd(){
    var s = sw; sw = null; if(!s || !s.on) return;
    var far = Math.abs(s.dx) > 70 || s.dy < -34;
    s.el.style.transition = 'transform .2s, opacity .2s';
    if(far){
      s.el.style.transform = Math.abs(s.dx) > Math.abs(s.dy) ? 'translateX('+(s.dx>0?'110%':'-110%')+')' : 'translateY(-120%)'; s.el.style.opacity = '0';
      setTimeout(function(){ var b = s.el.querySelector('[data-lf-dismiss]'); if(b) b.click(); else s.el.remove(); }, 190);
    } else { s.el.style.transform = ''; s.el.style.opacity = ''; }
  }
  document.addEventListener('touchend', swEnd, { passive:true });
  document.addEventListener('touchcancel', swEnd, { passive:true });
})();

/* ===== d18: alert() becomes a small in-app message instead of a blocking browser popup ===== */
;(function(){
  if(window.__d18alert) return; window.__d18alert = true;
  var el = null, t = null;
  window.alert = function(msg){
    try{
      msg = String(msg==null?'':msg); if(!msg) return;
      if(!el){ el = document.createElement('div'); el.className = 'cd-say'; el.setAttribute('role','status'); document.body.appendChild(el); el.addEventListener('click', function(){ el.style.display='none'; }); }
      el.textContent = msg; el.style.display = ''; el.style.opacity = '1';
      el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
      clearTimeout(t); t = setTimeout(function(){ el.style.opacity = '0'; setTimeout(function(){ if(el) el.style.display='none'; }, 260); }, Math.min(9000, 2800 + msg.length*45));
    }catch(e){ console.log(msg); }
  };
})();

/* ===== d20: hover a candidate's name → their last 10 calls (date, company, round, who handled) ===== */
;(function(){
  if(window.__d20) return; window.__d20 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var pop = null, timer = null, curEl = null;
  function canHover(){ try{ return window.matchMedia('(hover:hover) and (pointer:fine)').matches; }catch(e){ return true; } }
  function hide(){ clearTimeout(timer); timer = null; curEl = null; if(pop){ pop.remove(); pop = null; } }
  function short(d){ try{ return new Date(d+'T00:00:00').toLocaleDateString(undefined,{day:'numeric',month:'short',year:'2-digit'}); }catch(e){ return d||''; } }
  function build(name, el){
    var entry = null; try{ entry = findNotificationEntryForCandidate(name); }catch(e){}
    var occ = entry && entry.occurrences ? entry.occurrences.slice() : [];
    var rowId = el.closest && el.closest('tr') ? el.closest('tr').getAttribute('data-id') : '';
    var row = null; try{ row = (state.rows||[]).find(function(r){ return r.id===rowId; }); }catch(e){}
    var h = '<div style="font-weight:700;font-size:13px;margin-bottom:2px">'+esc(entry ? entry.candidate : name)+'</div>';
    if(row){
      var ow = window.cdOwnerOf ? window.cdOwnerOf(row) : null;
      h += '<div style="font-size:12px;margin:2px 0 4px;display:flex;gap:10px;flex-wrap:wrap"><span><span style="opacity:.6">Team</span> <b>'+esc(row.assignee||'—')+'</b></span><span><span style="opacity:.6">Owner</span> <b>'+(ow?esc(ow.name)+(ow.src==='portal'?' 📡':ow.src==='driving'?' 🚗':''):'<span style="opacity:.6">not set</span>')+'</b></span></div>';
    }
    if(!occ.length){
      return h + '<div style="opacity:.75;font-size:12px">No earlier calls on file for this name.</div>';
    }
    var shown = occ;
    var sub = row ? ((row.company||'')+(row.role?' · '+row.role:'')) : '';
    if(sub) h = h.replace('</div>','</div><div style="opacity:.7;font-size:11.5px;margin-bottom:2px">'+esc(sub)+'</div>');
    var as=[], os=[]; try{ if(row){ as = assessmentsForCandidate(row.candidate,row.company)||[]; os = onsitesForCandidate(row.candidate,row.company)||[]; } }catch(e){}
    if(as.length) h += '<div style="font-size:12px;margin:2px 0">🧪 '+esc(as.slice(0,3).map(function(a){ return a.date+(a.assessment?' ('+a.assessment+')':''); }).join(', '))+'</div>';
    if(os.length) h += '<div style="font-size:12px;margin:2px 0">🏢 '+esc(os.slice(0,3).map(function(o){ return o.date+(o.location?' @ '+o.location:''); }).join(', '))+'</div>';
    h += '<div style="opacity:.7;font-size:11.5px;margin:4px 0 6px">All '+shown.length+' call'+(shown.length===1?'':'s')+' · newest first</div><div class="d20-scroll" style="max-height:min(60vh,420px);overflow:auto;padding-right:4px">';
    h += '<div style="display:grid;grid-template-columns:auto 1fr auto auto;gap:3px 12px;font-size:12.5px;align-items:baseline">';
    shown.forEach(function(o){
      var isThis = row && o.date===state.date && String(o.time||'')===String(row.time||'') && String(o.round||'')===String(row.round||'');
      var st = (o.status ? ' <span style="color:var(--amber,#e5b045)" title="'+esc(o.status)+'">⚠</span>' : '');
      var who = o.assignee ? esc(o.assignee) : '<span style="opacity:.55">unassigned</span>';
      var st0 = isThis ? 'background:rgba(80,200,160,.14);border-radius:6px;' : '';
      h += '<span style="white-space:nowrap;opacity:.8;'+st0+'">'+esc(short(o.date))+(isThis?' · now':'')+'</span>'
        + '<span style="min-width:0;overflow-wrap:anywhere;'+st0+'"><b>'+esc(o.company||'—')+'</b>'+st+'</span>'
        + '<span style="white-space:nowrap;opacity:.85;'+st0+'">'+esc(o.round||'')+'</span>'
        + '<span style="white-space:nowrap;'+st0+'">'+who+'</span>';
    });
    return h + '</div></div>';
  }
  window.d20Html = function(name, rowId){ return build(name, {closest:function(){ return {getAttribute:function(){ return rowId; }}; }}); };
  function show(el){
    var name = (el.value||'').trim(); if(!name || name.length<2) return;
    hide(); curEl = el;
    pop = document.createElement('div'); pop.id = 'd20Hist';
    pop.style.cssText = 'position:fixed;z-index:100010;max-width:min(560px,94vw);min-width:300px;padding:12px 14px;border-radius:12px;background:var(--surface,#1c2230);color:var(--text,#fff);border:1px solid var(--border,#333);box-shadow:0 14px 40px -10px rgba(0,0,0,.6);pointer-events:auto;font-family:inherit';
    pop.innerHTML = build(name, el);
    document.body.appendChild(pop);
    var r = el.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
    var left = Math.max(8, Math.min(r.left, window.innerWidth - pw - 8));
    var top = r.bottom + 6; if(top + ph > window.innerHeight - 8) top = Math.max(8, r.top - ph - 6);
    pop.style.left = left+'px'; pop.style.top = top+'px';
  }
  document.addEventListener('mouseover', function(e){
    if(!canHover()) return;
    var el = e.target && e.target.closest ? e.target.closest('input.cell-input[data-field="candidate"]') : null;
    if(!el){ return; }
    if(el === curEl && pop) return;
    clearTimeout(timer); timer = setTimeout(function(){ try{ show(el); }catch(x){} }, 350);
  }, true);
  document.addEventListener('mouseout', function(e){
    var el = e.target && e.target.closest ? e.target.closest('input.cell-input[data-field="candidate"]') : null;
    if(el){ var to = e.relatedTarget; if(to && (el.contains(to) || (pop && pop.contains(to)))) return; clearTimeout(timer); setTimeout(function(){ if(pop && !pop.matches(':hover') && document.activeElement!==el && !el.matches(':hover')) hide(); }, 160); }
    else if(pop && e.target.closest && e.target.closest('#d20Hist')){ var t2 = e.relatedTarget; if(!t2 || !(pop.contains(t2) || (curEl && curEl.contains(t2)))) setTimeout(function(){ if(pop && !pop.matches(':hover') && curEl && !curEl.matches(':hover')) hide(); }, 160); }
  }, true);
  ['focusin','keydown','scroll','mousedown','touchstart'].forEach(function(ev){ document.addEventListener(ev, function(e){ if(pop && e.target && e.target.nodeType===1 && pop.contains(e.target)) return; if(pop && (ev==='scroll') && e.target===document) {} hide(); }, true); });
  window.addEventListener('blur', hide);
})();


/* ===== d21: dropdown options load on demand (touch/focus) and in idle time after each redraw ===== */
;(function(){
  if(window.__d21) return; window.__d21 = true;
  function fill(e){
    var t = e.target, s = t && t.closest ? t.closest('select[data-lazy]') : null;
    if(s && window.__cdFillLazy) window.__cdFillLazy(s);
  }
  ['pointerdown','mousedown','touchstart','focusin','keydown'].forEach(function(ev){ document.addEventListener(ev, fill, true); });
  var ver = 0;
  var ric = window.requestIdleCallback ? function(f,o){ return window.requestIdleCallback(f,o); } : function(f){ return setTimeout(function(){ f({ timeRemaining:function(){ return 8; } }); }, 60); };
  function schedule(){
    var v = ++ver;
    function slice(){
      if(v !== ver) return;
      var list = document.querySelectorAll('select[data-lazy]'), n = 0;
      for(var i=0; i<list.length && n<6; i++){
        if(document.activeElement === list[i]) continue;
        if(window.__cdFillLazy && window.__cdFillLazy(list[i])) n++;
      }
      if(document.querySelector('select[data-lazy]') && n>0) ric(slice, { timeout:250 });
    }
    ric(slice, { timeout:250 });
  }
  function install(){
    if(typeof window.render!=='function' || !window.__d17vw){ return setTimeout(install,120); }
    var o = window.render;
    window.render = function(){ var r = o.apply(this, arguments); try{ schedule(); }catch(e){} return r; };
    try{ schedule(); }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();


/* shared: who actually owns a call — the person it is assigned to, else the Driving Person / Interview Portal handler */
window.cdOwnerOf = function(r){
  try{
    var tn = getTeamNames(), a = (r.assignee||'').trim();
    if(a && !tn.has(a)) return { name:a, src:'assigned' };
    if(r.drivingPerson) return { name:r.drivingPerson, src:'driving' };
    var m = null; try{ m = findPortalMatch(r); }catch(e){}
    if(m && (m.handler || m.assignee)) return { name:(m.handler||m.assignee), src:'portal' };
  }catch(e){}
  return null;
};
/* ===== d22: phone Home — "Next up" hero + "Needs an owner" quick-assign strip (phones only) ===== */
;(function(){
  if(window.__d22) return; window.__d22 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var bd = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var nowBd = function(){ var d=new Date(); return (d.getHours()*60+d.getMinutes()+720)%1440; };
  var isPhone = function(){ return (window.__d17vw || window.innerWidth) < 760; };
  var live = function(r){ return r && !r.woi && !r.status && r.candidate; };
  function best(r){
    var list = []; try{ list = window.d2Rank ? window.d2Rank(r) : []; }catch(e){}
    var tn = null; try{ tn = getTeamNames(); }catch(e){}
    var ppl = list.filter(function(h){ return !h.isTeam && !(tn && tn.has(h.name)); });
    for(var i=0;i<ppl.length;i++){ if(!ppl[i].absent && !ppl[i].clash) return ppl[i]; }
    return ppl[0] || list[0] || null;
  }
  function rel(mins){
    if(mins <= -1) return Math.abs(mins)+'m ago';
    if(mins < 1) return 'now';
    if(mins < 60) return 'in '+Math.round(mins)+'m';
    return 'in '+Math.floor(mins/60)+'h '+Math.round(mins%60)+'m';
  }
  function build(){
    var rows = (state.rows||[]).filter(live).filter(function(r){ return bd(r.time)!==9999; }).sort(function(a,b){ return bd(a.time)-bd(b.time); });
    if(!rows.length) return '';
    var n = nowBd();
    var next = rows.filter(function(r){ return bd(r.time) >= n-10; })[0];
    var tn2 = null; try{ tn2 = getTeamNames(); }catch(e){}
    var needs = function(r){ try{ var team = !r.assignee || (typeof deskNeedsPerson==='function' && tn2 && deskNeedsPerson(r, tn2)); return team && !window.cdOwnerOf(r); }catch(e){ return !r.assignee; } };
    var need = rows.filter(needs);
    var admin = true; try{ admin = (CURRENT_ROLE==='admin'); }catch(e){}
    var h = '<div class="d22">'+(window.d43Smart ? window.d43Smart() : '');
    var my = ''; try{ my = getMyAssigneeName(); }catch(e){}
    var mineN = my ? rows.filter(function(r){ try{ return namesEquivalent(r.assignee, my); }catch(e){ return r.assignee===my; } }).length : 0;
    var mineOn = !!(my && state.assigneeFilter && (function(){ try{ return namesEquivalent(state.assigneeFilter, my); }catch(e){ return state.assigneeFilter===my; } })());
    var needOn = state.filter==='unassigned';
    h += '<div class="d22-chips"><button type="button" class="d22-ch'+(!mineOn&&!needOn?' on':'')+'" data-d22f="all">All</button>'
      + '<button type="button" class="d22-ch'+(mineOn?' on':'')+'" data-d22f="mine">'+(my?'My calls <em>'+mineN+'</em>':'My calls…')+'</button>'
      + '<button type="button" class="d22-ch warn'+(needOn?' on':'')+'" data-d22f="need">Needs owner <em>'+need.length+'</em></button></div>';
    if(next){
      var nn = needs(next), b = nn ? best(next) : null, mins = bd(next.time)-n;
      h += '<div class="d22-hero'+(nn?' un':'')+(nn&&mins<=5?' hot2':(nn&&mins<=15?' hot':''))+'" data-d22open="'+esc(next.id)+'">'
        + (mins>=0&&mins<=60?'<div class="d22-cd"><i style="width:'+Math.max(2,Math.round((1-mins/60)*100))+'%"></i></div>':'')
        + '<div class="d22-top"><span class="d22-k">Next up</span><span class="d22-when">'+esc(rel(mins))+'</span></div>'
        + '<div class="d22-time">'+esc(next.time||'')+'</div>'
        + '<div class="d22-name">'+esc(next.candidate)+'</div>'
        + '<div class="d22-sub">'+esc([next.company, next.role].filter(Boolean).join(' · '))+'</div>'
        + '<div class="d22-meta">'+(next.round?'<span>'+esc(next.round)+'</span>':'')+(next.country?'<span>'+esc(next.country)+'</span>':'')+(next.duration?'<span>'+esc(next.duration)+'</span>':'')+'</div>'
        + (!nn
            ? '<div class="d22-own">Handled by <b>'+esc((window.cdOwnerOf(next)||{name:next.assignee}).name)+'</b>'+((window.cdOwnerOf(next)||{}).src==='portal'?' <small>(portal)</small>':'')+(next.assignee&&(window.cdOwnerOf(next)||{}).name!==next.assignee?' <small>· '+esc(next.assignee)+'</small>':'')+'</div>'+(admin?'<div class="d22-act"><button type="button" class="d22-b ghost" data-d22pick="'+esc(next.id)+'">Change handler</button></div>':'')
            : '<div class="d22-own warn">'+(next.assignee?esc(next.assignee)+' — no person yet':'No owner yet')+'</div>'+(admin?'<div class="d22-act">'+(b?'<button type="button" class="d22-b" data-d22as="'+esc(next.id)+'" data-d22n="'+esc(b.name)+'">Assign '+esc(b.name)+'</button>':'')+'<button type="button" class="d22-b ghost" data-d22pick="'+esc(next.id)+'">Choose…</button></div>':''))
        + '</div>';
    }
    var strip = need.filter(function(r){ return !next || r.id!==next.id; });
    if(strip.length && admin){
      h += '<div class="d22-sh"><b>Needs an owner</b><span>'+need.length+'</span></div><div class="d22-strip">'
        + strip.slice(0,30).map(function(r){ var b = best(r); var sn = (window.__d26seen = window.__d26seen || {}); var fc = sn[r.id] ? '' : ' fresh'; sn[r.id] = 1;
          return '<div class="d22-card'+fc+'" data-d22open="'+esc(r.id)+'"><div class="d22-ct">'+esc(r.time||'')+'</div><div class="d22-cn">'+esc(r.candidate)+'</div><div class="d22-cs">'+esc(r.company||'')+'</div>'
            + (b?'<button type="button" class="d22-b sm" data-d22as="'+esc(r.id)+'" data-d22n="'+esc(b.name)+'">→ '+esc(b.name.split(' ')[0])+'</button>':'')
            + '<button type="button" class="d22-b sm ghost" data-d22pick="'+esc(r.id)+'">Other</button></div>'; }).join('')+'</div>';
    } else if(!need.length){
      h += '<div class="d22-done">✓ Every live call has an owner</div>';
    }
    return h + '</div>';
  }
  var raf = 0;
  function paint(){
    raf = 0;
    var old = document.getElementById('d22Host');
    if(!isPhone() || state.needsLogin || (typeof getActivePanelName==='function' && getActivePanelName())){ if(old) old.remove(); return; }
    var wrap = document.getElementById('tableScrollMain');
    if(!wrap){
      /* filtered list is empty (no table) — keep the chips so the filter can be switched off */
      var sr = document.querySelector('.search-row');
      if(!sr){ if(old) old.remove(); return; }
      var html0 = ''; try{ html0 = build(); }catch(e){ html0 = ''; }
      var host0 = old || document.createElement('div'); host0.id = 'd22Host';
      if(host0.__h !== html0){ host0.innerHTML = html0; host0.__h = html0; }
      if(host0.previousSibling !== sr) sr.parentNode.insertBefore(host0, sr.nextSibling);
      return;
    }
    var html = ''; try{ html = build(); }catch(e){ html = ''; }
    var host = old || document.createElement('div'); host.id = 'd22Host';
    if(host.__h !== html){ host.innerHTML = html; host.__h = html; }
    var anchor = wrap.closest('.table-wrap, .table-scroll') || wrap;
    if(host.parentNode !== anchor.parentNode || host.nextSibling !== anchor) anchor.parentNode.insertBefore(host, anchor);
  }
  function sched(){ if(!raf) raf = requestAnimationFrame(paint); }
  document.addEventListener('click', function(e){
    var t = e.target; if(!t || !t.closest) return;
    var as = t.closest('[data-d22as]');
    if(as){ e.preventDefault(); e.stopPropagation(); if(window.d2AssignTo) window.d2AssignTo(as.getAttribute('data-d22as'), as.getAttribute('data-d22n')); return; }
    var pk = t.closest('[data-d22pick]');
    if(pk){ e.preventDefault(); e.stopPropagation(); if(window.d2OpenAssign) window.d2OpenAssign(pk.getAttribute('data-d22pick'), pk); return; }
    var op = t.closest('[data-d22open]');
    if(op){ var id = op.getAttribute('data-d22open'); if(window.d23Open) window.d23Open(id); else if(window.d5OpenSide) window.d5OpenSide(id); }
  }, true);
  function install(){
    if(typeof window.render!=='function' || !window.__d17vw){ return setTimeout(install,150); }
    var o = window.render;
    window.render = function(){ var r = o.apply(this, arguments); try{ sched(); }catch(e){} return r; };
    window.addEventListener('resize', sched);
    sched();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();


/* ===== d23: in-app confirm sheet + phone "call sheet" (assign · status · history · edit · delete) ===== */
;(function(){
  if(window.__d23) return; window.__d23 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var admin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  var rowOf = function(id){ return (state.rows||[]).find(function(r){ return String(r.id)===String(id); }); };

  /* ---- confirm sheet: window.cdConfirm(message, {title, ok, danger}) -> Promise<boolean> ---- */
  window.cdConfirm = function(msg, o){
    o = o || {};
    return new Promise(function(res){
      var el = document.createElement('div'); el.className = 'd23-cf';
      el.innerHTML = '<div class="d23-cfc" role="dialog" aria-modal="true"><b>'+esc(o.title||'Are you sure?')+'</b><p>'+esc(msg).replace(/\n/g,'<br>')+'</p><div class="d23-cfb"><button type="button" class="d23-b ghost" data-n>Cancel</button><button type="button" class="d23-b'+(o.danger?' danger':'')+'" data-y>'+esc(o.ok||'Confirm')+'</button></div></div>';
      function done(v){ document.removeEventListener('keydown', key, true); el.remove(); res(v); }
      function key(e){ if(e.key==='Escape'){ e.stopPropagation(); done(false); } }
      el.addEventListener('click', function(e){ if(e.target===el || e.target.closest('[data-n]')) done(false); else if(e.target.closest('[data-y]')) done(true); });
      document.addEventListener('keydown', key, true);
      document.body.appendChild(el);
      var y = el.querySelector('[data-y]'); if(y) y.focus();
    });
  };

  /* ---- call sheet ---- */
  var sh = null, curId = null;
  function close(){ if(sh){ sh.remove(); sh = null; } curId = null; document.body.classList.remove('d23-open'); }
  function history(r){
    var entry = null; try{ entry = findNotificationEntryForCandidate(r.candidate); }catch(e){}
    var occ = (entry && entry.occurrences ? entry.occurrences : []).filter(function(o){ return !(o.date===state.date && String(o.time||'')===String(r.time||'')); }).slice(0,6);
    if(!occ.length) return '<div class="d23-q">No earlier calls on file.</div>';
    return occ.map(function(o){ return '<div class="d23-h"><span>'+esc(o.date||'')+'</span><span>'+esc(o.company||'—')+(o.round?' · '+esc(o.round):'')+'</span><b>'+esc(o.assignee||'—')+'</b></div>'; }).join('');
  }
  var STAT = [['rescheduled','↻ Rescheduled'],['cancelled','✕ Cancelled'],['not_responded','☎ No response'],['no_invite','📨 No invite']];
  function paint(){
    var r = rowOf(curId); if(!r){ close(); return; }
    var rank = []; try{ rank = (window.d2Rank ? window.d2Rank(r) : []).filter(function(h){ return !h.isTeam && !h.absent; }); }catch(e){}
    rank.sort(function(a,b){ return (!!a.clash-!!b.clash) || ((b.learn>=2?b.learn:0)-(a.learn>=2?a.learn:0)) || ((b.prior?1:0)-(a.prior?1:0)) || (a.load-b.load); });
    var ad = admin();
    var h = '<div class="d23-grab"></div><div class="d23-hd"><div><div class="d23-t">'+esc(r.time||(r.woi?'Waiting for invite':''))+'</div><div class="d23-n">'+esc(r.candidate||'')+'</div><div class="d23-s">'+esc([r.company,r.role].filter(Boolean).join(' · '))+'</div></div><button type="button" class="d23-x" data-d23="close" aria-label="Close">✕</button></div>'
      + '<div class="d23-chips">'+[r.round,r.country,r.duration].filter(Boolean).map(function(x){ return '<span>'+esc(x)+'</span>'; }).join('')+(r.status?'<span class="st">'+esc(r.status.replace('_',' '))+'</span>':'')+'</div>';
    var ow = window.cdOwnerOf ? window.cdOwnerOf(r) : null;
    h += '<div class="d23-sec"><span>Team</span><b>'+esc(r.assignee||'Not assigned')+'</b></div><div class="d23-sec" style="margin-top:2px"><span>Owner'+(ow&&ow.src==='portal'?' (portal)':ow&&ow.src==='driving'?' (driving person)':'')+'</span><b>'+esc(ow?ow.name:'Not set')+'</b></div>';
    if(ad){
      h += '<div class="d23-pick">'+rank.slice(0,5).map(function(p){ return '<button type="button" class="d23-p'+(p.name===r.assignee?' on':'')+(p.clash?' clash':'')+'" data-d23as="'+esc(p.name)+'"><b>'+esc(p.name)+'</b><small>'+(p.prior==='candidate'?'handled this candidate':p.prior==='client'?'handled this client':p.load+' call'+(p.load===1?'':'s'))+(p.clash?' · clash':'')+'</small></button>'; }).join('')+'<button type="button" class="d23-p more" data-d23="more"><b>More…</b><small>everyone</small></button></div>';
      h += '<div class="d23-sec"><span>Status</span></div><div class="d23-st">'+STAT.map(function(s){ return '<button type="button" class="d23-sb'+(r.status===s[0]?' on':'')+'" data-d23st="'+s[0]+'">'+s[1]+'</button>'; }).join('')+(r.status?'<button type="button" class="d23-sb clr" data-d23st="">Clear status</button>':'')+'</div>';
    }
    h += '<div class="d23-sec"><span>Earlier calls</span></div><div class="d23-hist">'+history(r)+'</div>';
    h += '<div class="d23-ft">'+(ad?'<button type="button" class="d23-b ghost" data-d23="edit">✎ Edit all fields</button><button type="button" class="d23-b ghost danger" data-d23="del">Delete</button>':'<button type="button" class="d23-b ghost" data-d23="edit">Open details</button>')+'</div>';
    sh.querySelector('.d23-card').innerHTML = h;
  }
  window.d23Open = function(id){
    if(!rowOf(id)) return;
    close(); curId = id;
    sh = document.createElement('div'); sh.id = 'd23'; sh.innerHTML = '<div class="d23-card"></div>';
    document.body.appendChild(sh); document.body.classList.add('d23-open');
    paint();
  };
  document.addEventListener('click', function(e){
    if(!sh) return; var t = e.target; if(!t.closest) return;
    if(t===sh){ close(); return; }
    var b = t.closest('[data-d23]');
    if(b){
      var k = b.getAttribute('data-d23');
      if(k==='close') close();
      else if(k==='more'){ var id = curId; close(); if(window.d2OpenAssign) window.d2OpenAssign(id, b); }
      else if(k==='edit'){ var id2 = curId; close(); if(window.d5OpenSide) window.d5OpenSide(id2); }
      else if(k==='del'){ var r = rowOf(curId); if(!r) return; var id3 = curId; window.cdConfirm('Delete '+(r.candidate||'this call')+(r.company?' ('+r.company+')':'')+' from '+state.date+'?\nYou can undo right after.', {title:'Delete call', ok:'Delete', danger:true}).then(function(ok){ if(ok){ close(); try{ deleteCallRow(id3); }catch(x){} } }); }
      return;
    }
    var as = t.closest('[data-d23as]'); if(as){ var nm = as.getAttribute('data-d23as'), id4 = curId; close(); if(window.d2AssignTo) window.d2AssignTo(id4, nm); return; }
    var st = t.closest('[data-d23st]'); if(st){ var r2 = rowOf(curId); if(!r2) return; var v = st.getAttribute('data-d23st'); r2.status = v; if(!v) r2.statusFields = []; else if(!r2.statusFields) r2.statusFields = []; try{ markDirty(); }catch(x){} close(); render(); }
  }, true);
  document.addEventListener('keydown', function(e){ if(sh && e.key==='Escape'){ close(); } });
})();


/* ===== d24: phone — filter chips (All / My calls / Needs owner), "who are you" chooser, call-card tap → call sheet, in-app confirms ===== */
;(function(){
  if(window.__d24) return; window.__d24 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var phone = function(){ return (window.__d17vw || window.innerWidth) < 760; };

  function chooseMe(){
    var tn = null; try{ tn = getTeamNames(); }catch(e){}
    var people = (state.roster||[]).filter(function(p){ return p && p.name && !(tn && tn.has(p.name)); }).sort(function(a,b){ return a.name.localeCompare(b.name); });
    var el = document.createElement('div'); el.id = 'd23';
    el.innerHTML = '<div class="d23-card"><div class="d23-grab"></div><div class="d23-hd"><div><div class="d23-n">Which one is you?</div><div class="d23-s">“My calls” will show only your calls. You can change this later.</div></div><button type="button" class="d23-x" data-x>✕</button></div><div class="d23-st" style="margin-top:14px">'
      + people.map(function(p){ return '<button type="button" class="d23-sb" data-me="'+esc(p.name)+'">'+esc(p.name)+'<small style="display:block;font-weight:500;color:var(--text-muted)">'+esc(p.team||'')+'</small></button>'; }).join('') + '</div></div>';
    el.addEventListener('click', function(e){
      var m = e.target.closest && e.target.closest('[data-me]');
      if(m){ try{ setMyAssigneeName(m.getAttribute('data-me')); state.assigneeFilter = m.getAttribute('data-me'); state.filter = 'all'; }catch(x){} el.remove(); document.body.classList.remove('d23-open'); render(); return; }
      if(e.target===el || (e.target.closest && e.target.closest('[data-x]'))){ el.remove(); document.body.classList.remove('d23-open'); }
    });
    document.body.appendChild(el); document.body.classList.add('d23-open');
  }

  document.addEventListener('click', function(e){
    var t = e.target; if(!t || !t.closest) return;
    var f = t.closest('[data-d22f]');
    if(f){
      e.preventDefault(); e.stopPropagation();
      var k = f.getAttribute('data-d22f'), my = ''; try{ my = getMyAssigneeName(); }catch(x){}
      if(k==='all'){ state.assigneeFilter = ''; state.filter = 'all'; render(); }
      else if(k==='need'){ state.filter = state.filter==='unassigned' ? 'all' : 'unassigned'; state.assigneeFilter = ''; render(); }
      else if(k==='mine'){
        if(!my){ chooseMe(); return; }
        var on = false; try{ on = !!(state.assigneeFilter && namesEquivalent(state.assigneeFilter, my)); }catch(x){}
        state.assigneeFilter = on ? '' : my; state.filter = 'all'; render();
      }
      return;
    }
    /* tap on a call card (phone) → call sheet */
    if(!phone()) return;
    var sum = t.closest('td.m-sum');
    if(sum && !t.closest('button,a,input,select,textarea,.m-collapse')){
      var tr = sum.closest('tr[data-id]');
      if(tr && !tr.classList.contains('m-open') && window.d23Open){ e.preventDefault(); e.stopPropagation(); window.d23Open(tr.getAttribute('data-id')); }
    }
  }, true);

  /* ---- native confirm() → in-app sheet on phones ----
     A click handler that asks "if(!confirm(msg)) return;" is probed once with confirm() answering "no" (so nothing happens),
     the message is shown in the in-app card, and on OK the same click is replayed with confirm() answering "yes". */
  var nativeConfirm = window.confirm.bind(window), probe = null, pre = false, replaying = false;
  window.confirm = function(msg){
    if(pre){ pre = false; return true; }
    if(probe && !probe.msg){ probe.msg = String(msg==null?'':msg); return false; }
    return nativeConfirm(msg);
  };
  document.addEventListener('click', function(e){
    if(!phone() || replaying || !window.cdConfirm) return;
    var t = e.target; if(!t || !t.closest) return;
    if(t.closest('#d23, .d23-cf, [data-d22f]')) return;
    var btn = t.closest('button,[role=button],.btn'); if(!btn) return;
    probe = { msg:'' }; var p = probe;
    setTimeout(function(){
      probe = null;                                   /* same task only: later (async) confirms stay native */
      if(!p.msg) return;
      var danger = /delete|remove|clear|undo|can.t be undone/i.test(p.msg);
      window.cdConfirm(p.msg, { title: danger ? 'Please confirm' : 'Confirm', ok: danger ? 'Yes, do it' : 'OK', danger: danger }).then(function(ok){
        if(!ok) return;
        replaying = true; pre = true;
        try{ btn.click(); }finally{ setTimeout(function(){ pre = false; replaying = false; }, 0); }
      });
    }, 0);
  }, true);
})();


/* ===== d26: game feel — snap, sound, haptics, combo flare, tension, board-clear victory ===== */
;(function(){
  if(window.__d26) return; window.__d26 = true;
  var reduce = function(){ try{ return matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; } };
  var LS = { g:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }, s:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
  var soundOn = LS.g('cd.d26.snd','1')==='1';
  var ac = null;
  function ctx(){ try{ if(!ac){ var C = window.AudioContext||window.webkitAudioContext; if(!C) return null; ac = new C(); } if(ac.state==='suspended') ac.resume(); return ac; }catch(e){ return null; } }
  function tone(f, t0, dur, type, vol){
    var c = ctx(); if(!c) return; var o = c.createOscillator(), g = c.createGain(), t = c.currentTime + t0;
    o.type = type||'sine'; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol||0.08, t+0.012); g.gain.exponentialRampToValueAtTime(0.0001, t+dur);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t+dur+0.02);
  }
  var fx = {
    snap:function(n){ if(!soundOn) return; var base = 520*Math.pow(1.0595, Math.min(7,(n||1)-1)*2); tone(base,0,.09,'triangle',.07); tone(base*1.5,.06,.12,'sine',.06); },
    undo:function(){ if(!soundOn) return; tone(300,0,.1,'sine',.05); },
    win:function(){ if(!soundOn) return; [523,659,784,1047].forEach(function(f,i){ tone(f,i*.09,.28,'triangle',.08); }); },
    warn:function(){ if(!soundOn) return; tone(220,0,.12,'square',.03); },
    buzz:function(ms){ try{ if(navigator.vibrate) navigator.vibrate(ms||12); }catch(e){} }
  };
  window.d26fx = fx;

  /* sound toggle */
  function toggleBtn(){
    var b = document.getElementById('d26Snd');
    if(!b){ b = document.createElement('button'); b.id='d26Snd'; b.type='button'; b.setAttribute('aria-label','Sound on/off'); document.body.appendChild(b);
      b.onclick = function(){ soundOn = !soundOn; LS.s('cd.d26.snd', soundOn?'1':'0'); b.textContent = soundOn?'🔊':'🔇'; if(soundOn){ fx.snap(1); fx.buzz(10); } }; }
    b.textContent = soundOn?'🔊':'🔇';
  }

  /* ripple + check burst at an element */
  function burst(el){
    if(reduce() || !el) return;
    var r = el.getBoundingClientRect(); if(!r.width) return;
    var b = document.createElement('div'); b.className = 'd26-burst';
    b.style.left = (r.left + r.width/2)+'px'; b.style.top = (r.top + Math.min(r.height/2, 60))+'px';
    var h = '<i class="d26-ring"></i>';
    for(var k=0;k<8;k++){ var a = k/8*Math.PI*2; h += '<i class="d26-dot" style="--dx:'+Math.round(Math.cos(a)*46)+'px;--dy:'+Math.round(Math.sin(a)*46)+'px"></i>'; }
    b.innerHTML = h + '<span class="d26-ck">✓</span>';
    document.body.appendChild(b); setTimeout(function(){ b.remove(); }, 750);
  }
  /* combo flare */
  var combo = 0, comboT = 0, flareEl = null;
  var WORDS = ['','','Nice','Smooth','On fire','Unstoppable','Legendary'];
  function flare(n){
    if(n<2 || reduce()) return;
    if(!flareEl){ flareEl = document.createElement('div'); flareEl.className = 'd26-flare'; document.body.appendChild(flareEl); }
    flareEl.textContent = (WORDS[Math.min(n,WORDS.length-1)]||'Legendary')+' ×'+n;
    flareEl.classList.remove('go'); void flareEl.offsetWidth; flareEl.classList.add('go');
  }
  /* victory overlay */
  function victory(){
    if(reduce()){ return; }
    var o = document.createElement('div'); o.className = 'd26-win';
    o.innerHTML = '<div><span>✓</span><b>Board clear</b><small>Every call has an owner</small></div>';
    document.body.appendChild(o); fx.win(); fx.buzz([20,40,20,40,60]);
    try{ if(window.d3Confetti) window.d3Confetti(); }catch(e){}
    setTimeout(function(){ o.classList.add('out'); setTimeout(function(){ o.remove(); }, 400); }, 1900);
    o.addEventListener('click', function(){ o.remove(); });
  }

  var prev = null, prevDate = '', won = {};
  function track(){
    var d = ''; try{ d = state.date; }catch(e){} if(!d) return;
    var rows = state.rows||[], tn = null; try{ tn = getTeamNames(); }catch(e){}
    var person = function(a){ a = (a||'').trim(); return !!(a && !(tn && tn.has(a))); };
    var cur = {}; rows.forEach(function(r){ cur[r.id] = person(r.assignee); });
    if(prev && prevDate===d){
      var n = 0, last = null;
      Object.keys(cur).forEach(function(id){ if(cur[id] && prev[id]===false){ n++; last = id; } });
      if(n){
        var now = Date.now(); combo = (now - comboT < 7000) ? combo + n : n; comboT = now;
        fx.snap(combo); fx.buzz(combo>=3?[10,30,14]:12);
        var el = document.querySelector('.d22-hero[data-d22open="'+last+'"]') || document.querySelector('tr[data-id="'+last+'"]') || document.querySelector('.d22-hero');
        burst(el); flare(combo);
      }
      var live = rows.filter(function(r){ return !r.woi && !r.status; });
      var un = live.filter(function(r){ return !(r.assignee||'').trim(); }).length;
      if(rows.length>=3 && live.length && un===0 && !won[d]){ won[d] = 1; victory(); }
    } else if(!prev || prevDate!==d){
      var lv = rows.filter(function(r){ return !r.woi && !r.status; });
      if(lv.length && lv.every(function(r){ return (r.assignee||'').trim(); })) won[d] = 1;   /* already clear on open: no replay */
    }
    prev = cur; prevDate = d; toggleBtn();
  }
  var t = 0;
  function install(){
    if(typeof window.render!=='function' || !window.__d17vw){ return setTimeout(install,200); }
    var o = window.render;
    window.render = function(){ var r = o.apply(this, arguments); clearTimeout(t); t = setTimeout(function(){ try{ track(); }catch(e){ console.warn('d26',e); } }, 40); return r; };
    setTimeout(function(){ try{ track(); }catch(e){} }, 600);
  }
  /* tap feedback on the big phone buttons even when nothing is assigned yet */
  document.addEventListener('pointerdown', function(e){
    var b = e.target.closest && e.target.closest('.d22-b, .d22-ch, .d23-p, .d23-sb'); if(b){ fx.buzz(8); }
  }, true);
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();


/* ===== d27: Coverage Desk V2 — version badge, changelog, welcome tour, splash, Command Center ===== */
;(function(){
  if(window.__d27) return; window.__d27 = true;
  var VERSION = 'V3.6', SEEN_KEY = 'cd.v2.seen'; window.__cdVer = VERSION;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var LS = { g:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }, s:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
  var auto = !!navigator.webdriver;                      /* automated test browsers skip splash + tour */
  var bd = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var nowBd = function(){ var d=new Date(); return (d.getHours()*60+d.getMinutes()+720)%1440; };
  var hourLabel = function(m){ var h = Math.floor(((m+720)%1440)/60), ap = h>=12?'PM':'AM'; h = h%12||12; return h+' '+ap; };
  var phone = function(){ return (window.__d17vw || window.innerWidth) < 760; };
  var admin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };

  var LOG = [
    ['V3.6','2026-11-06','Windows desktop',[
      '⌨️ J / K to move through calls, Enter / A / C / R / X act on the row, Alt+← → changes day (full list under ?)',
      '🪟 Details dock: split view that follows the selected call (D)',
      '🖱 Ctrl / Shift-click and Ctrl+A to select many calls; bulk bar can mark Confirmed / No reply / copy messages',
      '🎯 Drag a call grip and drop it on a suggested person; drop a .txt / .csv file anywhere to import',
      '🔴 Taskbar badge shows calls that still need an owner (installed app)',
      '📋 Clipboard history (Alt+V) · 💾 Backup folder · right-click a person name for a menu'
    ]],
    ['V3.5','2026-11-06','Focus modes + edge panel',[
      '🎯 Tools → Focus modes: My calls / Needs owner, do-not-disturb timer',
      '▮ Edge panel on the right edge: next calls + shortcuts',
      '📳 Shake to undo (switch on in Focus modes)',
      '📆 Tools → Calendar file: add calls to your phone calendar (.ics)',
      '☀️ Smart card on the phone home changes with the time of day'
    ]],
    ['V3.4','2026-11-06','Glass look',[
      '🪟 New Apple-style glass look: frosted panels, soft aurora background, pill buttons, glass pop-ups (dark + light)',
      '🔀 Tools → “Look” switches Glass / Classic any time',
      '🎨 Newer tool screens now follow the theme colours'
    ]],
    ['V3.3','2026-11-05','Student profile',[
      '🎓 Search a student → one organised page: details, calls grouped by client with the round path, assessments, onsite, closures and flags',
      '📜 “Full timeline” button keeps the old chronological view',
      '↪ Reschedule paste now understands “postponed / pushed / shifted to <time>”'
    ]],
    ['V3.2','2026-11-05','Cards everywhere',[
      '🧑 Candidate hover: History · Rounds · Tests & flags',
      '🏢 Client hover: History · Rules & stats · Handlers (who runs it smoothest)',
      '🗂 Right-click a call → Call card: Overview · Trail · Prep',
      '👤 Person names in more Tools lists open the person card'
    ]],
    ['V3.1','2026-11-05','Person card',[
      '👤 Hover a driving person or handler for one pop-up: Today · Week · Incentives · Record',
      '📱 Tools → Person card for anyone, on phone or laptop',
      '🖱 Right-click a call → Person card; names in Insights and the incentives leaderboard open it too',
      '🎙 Daily scrum can use Groq Whisper for Telugu'
    ]],
    ['V3.0','2026-11-05','Scrum board and quick actions',[
      '🗣 Daily scrum — yesterday’s calls with feedback, today’s calls by type, and a Telugu mic transcript (Tools → Daily scrum)',
      '📅 Day compare — this day against the same weekday last week',
      '🟠 Calls starting within 30 min that aren’t confirmed get an amber ring (red under 10 min)',
      '🖱 Right-click a call: confirm, copy name / time / reminder, prep card, history',
      '📋 Hover a name or time for a one-tap copy button'
    ]],
    ['V2.9','2026-11-05','TTOP page',[
      '🛰 Tools → TTOP data — read-only view of the TTOP portal (needs the TTOP key in Vercel)'
    ]],
    ['V2.8','2026-11-05','Edit from the coverage chart',[
      '📊 Hover a bar in “Coverage by half hour” — the pop-up now lists every call in that slot',
      '🕒 Change a call’s time right there (type 9:45 PM and press Enter) and reassign from the same pop-up',
      '📱 On a phone, tap a bar to open the same editor as a sheet'
    ]],
    ['V2.7','2026-11-05','Refinements',[
      '🔎 Tools hub — search box, ★ pins that stay on top, and a Recent row for one-tap return',
      '⌨ Shortcuts — T Tools, N prep the next call, / quick search, Esc closes any sheet',
      '◀ Back gesture now closes every tool sheet, not just the older panels',
      '🔕 Quiet alerts — quiet hours, daily limit, skip calls already confirmed',
      '↻ Try-again buttons when a tool can’t load',
      '⚡ Faster start — the Excel library no longer blocks the page from showing',
      'ⓘ Phone — tap the ⓘ beside a candidate or client name to see the same details desktop shows on hover'
    ]],
    ['V2.6','2026-11-05','Notifications that act',[
      '🔔 Notification buttons — Confirmed / No-show / Rescheduled right from the alert; the call updates without opening the app',
      '💰 My incentives card — rank, gap to the next person, last-month change, month-end pace',
      '🧭 Prep card before a call — history at the client, past outcomes, the owner’s last call with them, client rule and handover note',
      '📈 Domain trend — weekly demand by skill with rising / falling labels',
      '🧠 Learned owners — your hand-picked assignments move that person to the top (★) for the client'
    ]],
    ['V2.5','2026-11-04','Desk assistant',[
      '✅ Check before adding — pasting a list now warns about overlaps, duplicates, no-time lines and out-of-hours calls before anything is added',
      '⏰ Next-call card (10 min before your call) with client rule, handover note and last outcome; 🚩 reliability flag on candidates with repeat no-shows',
      '↔ Reschedule cascade warning; 🕘 “Since you left” summary; 📜 change log with Undo and Restore',
      '💬 Reply builder, 🌙 end-of-day wrap, 🗂 carry-forward review, ✉️ email cleaner, 🏷 client scorecard, ⚖️ workload and fatigue, 📝 handover notes, 💾 backup and restore'
    ]],
    ['V2.4','2026-11-04','Hover everywhere',[
      'Hover (desktop) or long-press / Info chips (phone) on a client name shows every earlier call at that client',
      'Hover the handler → their whole day and next free slot; a team → members, who is free; the time → other time zones; the country → local clock, business hours, holidays',
      'Hover the role → who handled it before; the round → the candidate’s journey; the duration → usual length check; a status badge → the reason; the ⚠ → both clashing calls with a fix; the stat cards → the names behind each number',
      '📌 Pin any popup to keep it open while you compare (up to 3)'
    ]],
    ['V2.3','2026-11-02','Round menu',[
      '⚪ Floating round menu (like iOS AssistiveTouch): drag it anywhere, tap it and the shortcuts fan out in a circle — Command, Tools, Search, Quick add, Alerts, Sound, Top',
      'Sound button moved into the round menu so it no longer covers the alerts bell'
    ]],
    ['V2.2','2026-11-02','Desk tools',[
      '🧰 Tools hub (header + Command Center): everything below in one place',
      '📥 Paste a message — opens the reschedule/cancel importer; 📞 Chase list — mark invited / confirmed / no reply, copy chase messages',
      '🔁 Reschedule helper — next free slots for the same owner plus a ready client message; 🔥 Heads-up for stacked handlers and 👯 duplicate calls',
      '📌 Client rules shown on every call; 📊 Insights by client, role and owner; 📈 Weekly report with PDF; 🎤 Quick add by typing or voice; 🔗 Handler links'
    ]],
    ['V2.1','2026-11-02','Automation',[
      'Owners fill themselves from the portal after every sync/import (1st round, and 2nd round when the match is certain); doubtful ones wait in a Confirm list',
      '✨ Fill the day — one button proposes an owner for every unowned call',
      '🏖 Leave calendar — mark days off once; suggestions skip those people',
      '⏰ Reminders — your own calls 30 and 10 minutes before they start',
      'Smart nudges — repeat no-show candidates and long-waiting WOI calls in Needs attention',
      '📋 Copy day summary — WhatsApp-ready wrap-up'
    ]],
    ['V2.0','2026-11-02','Major release',[
      '⌘ Command Center — one screen for the whole day: coverage, hour-by-hour board, what needs attention, team load',
      'New phone home — Next-up card, one-tap suggested owner, My calls / Needs owner chips, call sheet with status and history',
      'Owners everywhere — portal handler / driving person now counts as the owner in popups, cards and “Needs owner”',
      'One hover popup per candidate with team, owner and every earlier call',
      'Domains chart — Data Analyst, Data Engineer, Software… by client, team and country',
      'Calmer loading bar, smoother phone search, in-app confirmation cards',
      'Game feel — assign snap, combo flare, countdown pulse, “Board clear” celebration, sound toggle',
      'Version badge, changelog and this welcome tour'
    ]],
    ['V1.9','2026-11-01','Smarter matching',['Clients matched by company + country','Suggest owner by role (who handled the same role at that client)','Google Doc “Sheet” tab replica','Sync-failed and end-of-day push alerts','Filter by person shows team members with portal names merged']],
    ['V1.8','2026-10-30','Mobile flow',['Phone redesign: full-screen panels, 44px tap targets, icon header row','Back gesture closes panels','UI audit and polish']],
    ['V1.7','2026-10-28','Google Doc sync',['Hourly Google Doc inbox with review-and-add','Name match undo, client role badge, reschedule reply line']],
    ['V1.6','2026-10-23','Search & reminders',['Search everything (Ctrl/Cmd-K, phone Search tab)','Smart reminders','Closure manual handler','Workspace and new tools']],
    ['V1.5','2026-10-19','Pipeline tools',['Assessments and onsites','Check against group list','Desk checks','2nd-round pipeline, company-name matching']],
    ['V1.0','2026-10-01','Foundations',['Expected closures, carry-forward fix, closures month navigation','Background push alerts, live feed and smart alerts','Ask Desk chat, Students Master auto-add']]
  ];

  /* ---------- sheet helper ---------- */
  function sheet(id, html, cls){
    var old = document.getElementById(id); if(old) old.remove();
    var el = document.createElement('div'); el.id = id; el.className = 'd27-ov '+(cls||'');
    el.innerHTML = html; document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d27x]'))) closeEl(el); });
    return el;
  }
  function closeEl(el){ if(el && el.parentNode) el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); }
  document.addEventListener('keydown', function(e){ if(e.key==='Escape'){ var all = document.querySelectorAll('.d27-ov'); if(all.length) closeEl(all[all.length-1]); } });

  /* ---------- splash ---------- */
  function splash(){
    if(auto) return; try{ if(sessionStorage.getItem('cd.v2.splash')) return; sessionStorage.setItem('cd.v2.splash','1'); }catch(e){}
    var s = document.createElement('div'); s.className = 'd27-splash';
    s.innerHTML = '<div><div class="d27-logo"><i></i><b>CD</b></div><h1>Coverage <em>Desk</em></h1><span class="d27-vb">'+VERSION+'</span></div>';
    document.body.appendChild(s);
    setTimeout(function(){ s.classList.add('out'); setTimeout(function(){ s.remove(); }, 500); }, 1300);
  }

  /* ---------- changelog ---------- */
  function openLog(){
    var h = '<div class="d27-card"><div class="d27-hd"><div><small>COVERAGE DESK</small><h2>What’s new</h2></div><button type="button" class="d27-x" data-d27x>✕</button></div><div class="d27-scroll">'
      + LOG.map(function(v,i){ return '<div class="d27-ver'+(i===0?' cur':'')+'"><div class="d27-vh"><b>'+esc(v[0])+'</b><span>'+esc(v[2])+'</span><em>'+esc(v[1])+'</em></div><ul>'+v[3].map(function(x){ return '<li>'+esc(x)+'</li>'; }).join('')+'</ul></div>'; }).join('')
      + '</div><div class="d27-ft"><button type="button" class="d27-btn ghost" data-d27tour>▶ Replay welcome tour</button><button type="button" class="d27-btn" data-d27x>Close</button></div></div>';
    sheet('d27Log', h);
  }

  /* ---------- welcome tour ---------- */
  var SLIDES = [
    ['⌘','Command Center','The whole day on one screen: coverage, an hour-by-hour board, what needs attention right now, and how loaded each team is.'],
    ['📱','A new phone home','A Next-up card with one-tap suggested owners, My calls / Needs owner chips, and a call sheet for status, history and edits.'],
    ['🧭','Owners, everywhere','The portal handler or driving person now counts as the owner — in popups, cards and the Needs-owner list.'],
    ['🤖','Automation','Owners fill from the portal by themselves, Fill the day proposes the rest, leave days are skipped, and your own calls remind you 30 and 10 minutes ahead.'],
    ['✨','Feels alive','Snap, combo flare, countdown pulse and a Board-clear celebration when every call is covered. Sound is optional.']
  ];
  function tour(){
    var i = 0, el = null;
    function paint(){
      var s = SLIDES[i], last = i===SLIDES.length-1;
      el.innerHTML = '<div class="d27-card tour"><div class="d27-tbadge">'+VERSION+'</div><div class="d27-ticon">'+s[0]+'</div><h2>'+esc(s[1])+'</h2><p>'+esc(s[2])+'</p><div class="d27-dots">'+SLIDES.map(function(_,k){ return '<i class="'+(k===i?'on':'')+'"></i>'; }).join('')+'</div><div class="d27-ft"><button type="button" class="d27-btn ghost" data-d27x>Skip</button><button type="button" class="d27-btn" data-d27n>'+(last?'Let’s go':'Next')+'</button></div></div>';
    }
    el = sheet('d27Tour', '', 'center'); paint();
    el.addEventListener('click', function(e){
      if(e.target.closest && e.target.closest('[data-d27n]')){ if(i<SLIDES.length-1){ i++; paint(); } else { closeEl(el); } }
    });
    LS.s(SEEN_KEY, 'V2');
  }

  /* ---------- Command Center ---------- */
  function rank(r){ try{ return (window.d2Rank ? window.d2Rank(r) : []).filter(function(h){ return !h.isTeam && !h.absent; }); }catch(e){ return []; } }
  var pickHour = null;
  function cc(){
    var rows = (state.rows||[]), live = rows.filter(function(r){ return !r.woi && !r.status && r.candidate; });
    var own = function(r){ return window.cdOwnerOf ? window.cdOwnerOf(r) : ((r.assignee||'').trim() ? {name:r.assignee} : null); };
    var tn = null; try{ tn = getTeamNames(); }catch(e){}
    var needs = function(r){ var a = (r.assignee||'').trim(); return (!a || (tn && tn.has(a))) && !own(r); };
    var un = live.filter(needs), cov = live.length ? Math.round((live.length-un.length)/live.length*100) : 100;
    var n = nowBd(), timed = live.filter(function(r){ return bd(r.time)!==9999; }).sort(function(a,b){ return bd(a.time)-bd(b.time); });
    var next = timed.filter(function(r){ return bd(r.time)>=n-10; })[0];
    var cf = 0; try{ cf = computeConflicts(rows).size; }catch(e){}
    var woi = rows.filter(function(r){ return r.woi; }).length;
    /* hours */
    var H = {}; timed.forEach(function(r){ var h = Math.floor(bd(r.time)/60); (H[h] = H[h] || {a:0,u:0,rows:[]}); H[h].rows.push(r); if(needs(r)) H[h].u++; else H[h].a++; });
    var hrs = Object.keys(H).map(Number).sort(function(a,b){ return a-b; }), mx = Math.max(1, Math.max.apply(null, hrs.map(function(h){ return H[h].a+H[h].u; }).concat([1])));
    var curH = Math.floor(n/60); if(pickHour===null) pickHour = H[curH] ? curH : (hrs.filter(function(h){ return h>=curH; })[0] ?? hrs[0]);
    /* team load */
    var team = {}; live.forEach(function(r){ var k = (r.assignee||'').trim() || 'Unassigned'; team[k] = (team[k]||0)+1; });
    var tl = Object.keys(team).sort(function(a,b){ return team[b]-team[a]; }), tmax = Math.max(1, team[tl[0]]||1);
    var ppl = {}; live.forEach(function(r){ var o = own(r); if(o && o.name) ppl[o.name] = (ppl[o.name]||0)+1; });
    var pl = Object.keys(ppl).sort(function(a,b){ return ppl[b]-ppl[a]; }).slice(0,8), pmax = Math.max(1, ppl[pl[0]]||1);
    var mins = next ? bd(next.time)-n : null;
    var h = '<div class="d27-cc"><div class="d27-cch"><div><small>'+esc(state.date)+' · COMMAND CENTER</small><h2>'+(cov===100?'Everything is covered':un.length+' call'+(un.length===1?'':'s')+' need an owner')+'</h2></div><button type="button" class="d27-x" data-d27x aria-label="Close">✕</button></div>'
      + '<div class="d27-kpis">'
      + '<div class="d27-k ring" style="--p:'+cov+'"><b>'+cov+'<small>%</small></b><span>coverage</span></div>'
      + '<div class="d27-k'+(un.length?' bad':'')+'"><b>'+un.length+'</b><span>need owner</span></div>'
      + '<div class="d27-k'+(mins!==null&&mins<=15?' warn':'')+'"><b>'+(mins===null?'—':(mins<1?'now':mins<60?mins+'m':Math.floor(mins/60)+'h '+(mins%60)+'m'))+'</b><span>next call</span></div>'
      + '<div class="d27-k'+(cf?' warn':'')+'"><b>'+cf+'</b><span>conflicts</span></div>'
      + '<div class="d27-k'+(woi?' warn':'')+'"><b>'+woi+'</b><span>waiting invite</span></div></div>';
    h += '<div class="d27-actions">'+(admin()?'<button type="button" class="d27-btn" data-d27fill>✨ Fill the day</button>':'')+'<button type="button" class="d27-btn ghost" data-d27leave>🏖 Leave</button><button type="button" class="d27-btn ghost" data-d27copy>📋 Copy day summary</button></div>';
    var pend = window.d28Pending ? window.d28Pending() : [];
    if(pend.length && admin()){
      h += '<div class="d27-sec"><b>Confirm owners</b><span>'+pend.length+' from the portal</span></div><div class="d27-list">'
        + pend.slice(0,8).map(function(x){ return '<div class="d27-row"><span class="t">'+esc(x.row.time||'')+'</span><span class="n"><b>'+esc(x.row.candidate)+'</b><small>'+esc(x.row.round||'')+' · '+esc(x.row.company||'')+'</small></span><button type="button" class="d27-btn sm" data-d27ok="'+esc(x.row.id)+'">✓ '+esc(String(x.handler).split(' ')[0])+'</button></div>'; }).join('')
        + (pend.length>1?'<button type="button" class="d27-btn ghost" data-d27okall>Accept all '+pend.length+'</button>':'') + '</div>';
    }
    /* hour board */
    h += '<div class="d27-sec"><b>Hour by hour</b><span>tap an hour</span></div><div class="d27-hours">'
      + hrs.map(function(k){ var o = H[k], tot = o.a+o.u; return '<button type="button" class="d27-hr'+(k===pickHour?' on':'')+(k===curH?' now':'')+'" data-d27h="'+k+'"><span class="bar"><i class="u" style="height:'+Math.round(o.u/mx*100)+'%"></i><i class="a" style="height:'+Math.round(o.a/mx*100)+'%"></i></span><b>'+tot+'</b><small>'+hourLabel(k*60)+'</small></button>'; }).join('') + '</div>';
    var sel = (H[pickHour]||{rows:[]}).rows;
    h += '<div class="d27-list">'+(sel.length? sel.map(function(r){ var o = own(r), b = !o ? rank(r)[0] : null;
        return '<div class="d27-row'+(o?'':' un')+'" data-d27open="'+esc(r.id)+'"><span class="t">'+esc(r.time||'')+'</span><span class="n"><b>'+esc(r.candidate)+'</b><small>'+esc([r.company,r.role].filter(Boolean).join(' · '))+'</small></span>'
          + (o ? '<span class="o">'+esc(o.name)+(o.src==='portal'?' 📡':o.src==='driving'?' 🚗':'')+'</span>' : (admin()&&b ? '<button type="button" class="d27-btn sm" data-d27as="'+esc(r.id)+'" data-d27n="'+esc(b.name)+'">→ '+esc(b.name.split(' ')[0])+'</button>' : '<span class="o warn">no owner</span>'))+'</div>'; }).join('') : '<div class="d27-empty">No calls in this hour.</div>')+'</div>';
    /* attention */
    var items = [];
    un.filter(function(r){ return bd(r.time)!==9999 && bd(r.time)-n<=90; }).slice(0,4).forEach(function(r){ var m = bd(r.time)-n; items.push(['🔴', r.candidate+' at '+r.time+' has no owner', m<=0?'starting now':'in '+m+' min', {open:r.id}]); });
    if(cf) items.push(['⚠️', cf+' conflict'+(cf===1?'':'s')+' to resolve','double-booked handlers or clients',{click:'[data-d3="conflicts"], #resolveConflictsBtn'}]);
    if(woi) items.push(['📨', woi+' call'+(woi===1?'':'s')+' waiting for invite','set the time when the invite arrives',{filter:'woi'}]);
    try{ (window.d28Nudges?window.d28Nudges():[]).forEach(function(nu){ items.push([nu.ic, nu.t, nu.s, nu.woi?{filter:'woi'}:(nu.tool?{tool:nu.tool}:{open:nu.id})]); }); }catch(e){}
    h += '<div class="d27-sec"><b>Needs attention</b></div><div class="d27-att">'+(items.length? items.map(function(it,i){ return '<button type="button" class="d27-at" data-d27at="'+i+'"><span>'+it[0]+'</span><span><b>'+esc(it[1])+'</b><small>'+esc(it[2])+'</small></span><em>›</em></button>'; }).join('') : '<div class="d27-empty">✓ Nothing urgent right now.</div>')+'</div>';
    /* load */
    h += '<div class="d27-sec"><b>Team load</b><span>live calls</span></div><div class="d27-load">'+tl.map(function(k){ return '<div><span>'+esc(k)+'</span><i><u style="width:'+Math.round(team[k]/tmax*100)+'%" class="'+(k==='Unassigned'?'bad':'')+'"></u></i><b>'+team[k]+'</b></div>'; }).join('')+'</div>';
    if(pl.length) h += '<div class="d27-sec"><b>Owners</b><span>who has the most</span></div><div class="d27-load">'+pl.map(function(k){ return '<div><span>'+esc(k)+'</span><i><u style="width:'+Math.round(ppl[k]/pmax*100)+'%"></u></i><b>'+ppl[k]+'</b></div>'; }).join('')+'</div>';
    h += '</div>';
    return { html:h, items:items };
  }
  var ccEl = null, ccItems = [];
  function openCC(){
    pickHour = null;
    var r = cc(); ccItems = r.items;
    ccEl = sheet('d27CC', r.html, 'full');
    if(!ccEl.__wired){ ccEl.__wired = true; ccEl.addEventListener('click', onCC); }
  }
  function repaintCC(){ if(!ccEl || !ccEl.isConnected) return; var r = cc(); ccItems = r.items; var sc = ccEl.scrollTop; ccEl.innerHTML = r.html; ccEl.scrollTop = sc; }
  function onCC(e){
    var t = e.target; if(!t.closest) return;
    var h = t.closest('[data-d27h]'); if(h){ pickHour = +h.getAttribute('data-d27h'); repaintCC(); return; }
    var as = t.closest('[data-d27as]'); if(as){ e.stopPropagation(); if(window.d2AssignTo) window.d2AssignTo(as.getAttribute('data-d27as'), as.getAttribute('data-d27n')); setTimeout(repaintCC, 120); return; }
    var op = t.closest('[data-d27open]'); if(op){ var id = op.getAttribute('data-d27open'); if(window.d23Open){ window.d23Open(id); } else if(window.d5OpenSide){ closeEl(ccEl); window.d5OpenSide(id); } return; }
    if(t.closest('[data-d27fill]')){ closeEl(ccEl); if(window.d3OpenSuggest) window.d3OpenSuggest(); return; }
    if(t.closest('[data-d27leave]')){ if(window.d28OpenLeave) window.d28OpenLeave(); return; }
    if(t.closest('[data-d27copy]')){ var tx = window.d28Summary ? window.d28Summary() : ''; var btn = t.closest('[data-d27copy]'); var done = function(){ btn.textContent = '✓ Copied'; setTimeout(function(){ btn.textContent = '📋 Copy day summary'; }, 1800); }; try{ navigator.clipboard.writeText(tx).then(done, function(){ window.prompt('Copy this summary', tx); }); }catch(x){ window.prompt('Copy this summary', tx); } return; }
    var ok = t.closest('[data-d27ok]'); if(ok){ window.d28Confirm([ok.getAttribute('data-d27ok')]).then(repaintCC); return; }
    if(t.closest('[data-d27okall]')){ window.d28Confirm().then(repaintCC); return; }
    var at = t.closest('[data-d27at]');
    if(at){ var it = ccItems[+at.getAttribute('data-d27at')]; if(!it) return; var a = it[3];
      if(a.tool){ closeEl(ccEl); if(window.d29OpenTool) window.d29OpenTool(a.tool); }
      else if(a.open){ if(window.d23Open) window.d23Open(a.open); }
      else if(a.filter){ closeEl(ccEl); try{ state.filter = a.filter; render(); }catch(x){} }
      else if(a.click){ closeEl(ccEl); var b = document.querySelector(a.click); if(b) b.click(); else { try{ state.filter = 'conflict'; render(); }catch(x){} } }
    }
  }

  /* ---------- header badge + buttons ---------- */
  function mount(){
    var header = document.querySelector('#app .header'); if(!header) return;
    var box = document.getElementById('d27Box');
    if(!box){ box = document.createElement('div'); box.id = 'd27Box';
      box.innerHTML = '<button type="button" class="d27-cmd" data-d27cmd>⌘ Command</button><button type="button" class="d27-ver-b" data-d27log title="What’s new">'+VERSION+'</button>'; }
    var brand = header.querySelector('.pz-brand') || header.firstElementChild;
    if(brand && box.parentNode !== header) header.insertBefore(box, brand.nextSibling);
  }
  document.addEventListener('click', function(e){
    var t = e.target; if(!t.closest) return;
    if(t.closest('[data-d27cmd]')){ e.preventDefault(); e.stopPropagation(); openCC(); return; }
    if(t.closest('[data-d27log]')){ e.preventDefault(); e.stopPropagation(); openLog(); return; }
    if(t.closest('[data-d27tour]')){ var l = document.getElementById('d27Log'); if(l) closeEl(l); tour(); return; }
  }, true);
  window.d27OpenCommand = openCC; window.d27OpenLog = openLog; window.d27Tour = tour;

  var rt = 0;
  function install(){
    if(typeof window.render!=='function' || !window.__d17vw){ return setTimeout(install,200); }
    var o = window.render;
    window.render = function(){ var r = o.apply(this, arguments); try{ mount(); }catch(e){} clearTimeout(rt); rt = setTimeout(repaintCC, 80); return r; };
    mount(); splash();
    if(!auto && LS.g(SEEN_KEY,'') !== 'V2') setTimeout(tour, 1700);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();


/* ===== d28: V2.1 automation — auto owners, fill the day, leave calendar, reminders, nudges, day summary ===== */
;(function(){
  if(window.__d28) return; window.__d28 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var LS = { g:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }, s:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
  var role = function(){ try{ return CURRENT_ROLE; }catch(e){ return ''; } };
  var canFill = function(){ return role()==='admin' || role()==='team_lead'; };
  var bd = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var nowBd = function(){ var d=new Date(); return (d.getHours()*60+d.getMinutes()+720)%1440; };
  var toast = function(m,o){ try{ if(window.d2Toast) window.d2Toast(m,o||{ms:4500}); }catch(e){} };

  /* ---------- 1. owners fill themselves ---------- */
  var pending = [];                                      /* doubtful matches waiting for a tap */
  function ownerPlan(){
    var auto = [], conf = [];
    if(!state.portalAssignments || !state.portalAssignments.length) return { auto:auto, conf:conf };
    (state.rows||[]).forEach(function(r){
      if(r.woi || !r.candidate || r.drivingPerson) return;
      var m = null; try{ m = findPortalMatch(r); }catch(e){}
      if(!m) return; var handler = (m.handler||m.assignee||'').trim(); if(!handler) return;
      var adv = false; try{ adv = isAdvancedRound(r.round); }catch(e){}
      if(!adv){ auto.push({row:r, handler:handler}); return; }
      var sameDay = m.dateKey && m.dateKey===state.date, sameTime = m.time && m.time===r.time;
      var cm = true; try{ var mc = m.client||m.company||''; cm = !mc || normalizeCompanyKey(mc)===normalizeCompanyKey(r.company||''); }catch(e){}
      if(sameDay && sameTime && cm) auto.push({row:r, handler:handler}); else conf.push({row:r, handler:handler});
    });
    return { auto:auto, conf:conf };
  }
  var lastSig = '', busy = false;
  async function autoOwners(){
    if(busy || !canFill() || state.needsLogin || state.dateSwitching || state.saving) return;
    var p = ownerPlan(); pending = p.conf;
    var sig = state.date+'|'+(state.rows||[]).length+'|'+(state.portalAssignments?state.portalAssignments.length:0)+'|'+p.auto.length+'|'+p.conf.length;
    if(sig===lastSig) return; lastSig = sig;
    if(!p.auto.length) return;
    busy = true;
    try{
      p.auto.forEach(function(x){ x.row.drivingPerson = x.handler; });
      await saveDrivingPersons();
      toast('📡 Filled '+p.auto.length+' owner'+(p.auto.length===1?'':'s')+' from the portal'+(p.conf.length?' · '+p.conf.length+' to confirm':''));
      lastSig = ''; render();
    }catch(e){ console.warn('auto owners', e); }
    busy = false;
  }
  window.d28Confirm = async function(ids){
    var list = pending.filter(function(x){ return !ids || ids.indexOf(String(x.row.id))>=0; });
    if(!list.length) return 0;
    list.forEach(function(x){ x.row.drivingPerson = x.handler; });
    try{ await saveDrivingPersons(); }catch(e){}
    pending = pending.filter(function(x){ return list.indexOf(x)<0; }); render(); return list.length;
  };
  window.d28Pending = function(){ return pending.slice(); };

  /* ---------- 4. leave calendar ---------- */
  function leave(){ try{ return JSON.parse(LS.g('cd.leave','[]'))||[]; }catch(e){ return []; } }
  function saveLeave(L){ LS.s('cd.leave', JSON.stringify(L)); }
  function applyLeave(){
    if(role()!=='admin' || !state.date || state.needsLogin || state.dateSwitching) return;
    var changed = false;
    leave().forEach(function(l){
      if(state.date>=l.from && state.date<=l.to && (state.absentIds||[]).indexOf(l.id)<0){ state.absentIds = (state.absentIds||[]).concat([l.id]); changed = true; }
    });
    if(changed){ try{ syncNotesFromAbsent(); markDirty(); }catch(e){} render(); }
  }
  function openLeave(){
    var ppl = (state.roster||[]).filter(function(p){ return p && p.name && !(getTeamNames().has(p.name)); }).sort(function(a,b){ return a.name.localeCompare(b.name); });
    var today = state.date, L = leave().filter(function(l){ return l.to>=today; }).sort(function(a,b){ return a.from.localeCompare(b.from); });
    var el = document.createElement('div'); el.id='d28Leave'; el.className='d27-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>TEAM</small><h2>Leave calendar</h2></div><button type="button" class="d27-x" data-d28x>✕</button></div><div class="d27-scroll">'
      + '<div class="d28-form"><select id="d28P">'+ppl.map(function(p){ return '<option value="'+esc(p.id)+'" data-n="'+esc(p.name)+'">'+esc(p.name)+(p.team?' · '+esc(p.team):'')+'</option>'; }).join('')+'</select><label>From <input type="date" id="d28F" value="'+esc(today)+'"></label><label>To <input type="date" id="d28T" value="'+esc(today)+'"></label><button type="button" class="d27-btn" data-d28add>Add leave</button></div>'
      + '<div class="d27-sec"><b>Upcoming</b><span>'+L.length+'</span></div>'
      + (L.length? L.map(function(l,i){ return '<div class="d27-row" style="cursor:default"><span class="t">'+esc(l.from===l.to?l.from:l.from+' → '+l.to)+'</span><span class="n"><b>'+esc(l.name)+'</b></span><button type="button" class="d27-btn sm ghost" data-d28rm="'+i+'">Remove</button></div>'; }).join('') : '<div class="d27-empty">No leave planned.</div>')
      + '<div class="d23-q" style="margin-top:10px">Days off are applied automatically when you open that day, and suggestions skip those people. Stored on this device; once a day is opened it is saved with the day.</div></div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){
      var t = e.target;
      if(t===el || (t.closest && t.closest('[data-d28x]'))){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); return; }
      var add = t.closest && t.closest('[data-d28add]');
      if(add){ var sel = el.querySelector('#d28P'), f = el.querySelector('#d28F').value, to = el.querySelector('#d28T').value || f; if(!sel.value || !f) return; if(to<f) to = f;
        var all = leave(); all.push({id:sel.value, name:sel.options[sel.selectedIndex].getAttribute('data-n'), from:f, to:to}); saveLeave(all); el.remove(); document.body.classList.remove('d27-open'); applyLeave(); openLeave(); return; }
      var rm = t.closest && t.closest('[data-d28rm]');
      if(rm){ var cur = leave().filter(function(l){ return l.to>=today; }).sort(function(a,b){ return a.from.localeCompare(b.from); }), victim = cur[+rm.getAttribute('data-d28rm')]; if(victim){ saveLeave(leave().filter(function(l){ return !(l.id===victim.id && l.from===victim.from && l.to===victim.to); })); }
        el.remove(); document.body.classList.remove('d27-open'); openLeave(); }
    });
  }
  window.d28OpenLeave = openLeave;

  /* ---------- 3. reminders (this device, while the app is open) ---------- */
  var fired = {};
  function remind(){
    if(state.needsLogin || !state.rows || state.date!==(function(){ try{ return todayDateString(); }catch(e){ return ''; } })()) return;
    var my = ''; try{ my = getMyAssigneeName(); }catch(e){} if(!my) return;
    var n = nowBd();
    state.rows.forEach(function(r){
      if(r.woi || r.status || !r.candidate) return;
      var o = window.cdOwnerOf ? window.cdOwnerOf(r) : null, mine = false;
      try{ mine = !!(o && namesEquivalent(o.name, my)); }catch(e){}
      if(!mine) return; var m = bd(r.time); if(m===9999) return; var left = m - n;
      [[30,'30'],[10,'10']].forEach(function(k){
        var key = state.date+'|'+r.id+'|'+k[1];
        if(left<=k[0] && left>k[0]-4 && !fired[key]){ fired[key]=1;
          var msg = '⏰ '+r.candidate+' at '+r.time+' — in '+Math.max(1,Math.round(left))+' min'+(r.company?' · '+r.company:'');
          toast(msg,{ms:9000});
          try{ if(window.d26fx){ window.d26fx.warn(); window.d26fx.buzz([30,60,30]); } }catch(e){}
          try{ if(document.hidden && window.cdShowNotification) window.cdShowNotification('Call in '+Math.max(1,Math.round(left))+' min', {body:r.candidate+' · '+r.time+(r.company?' · '+r.company:''), tag:'cd-call-'+r.id, data:{kind:'call', date:state.date, id:r.id, candidate:r.candidate}}); }catch(e){}
        }
      });
    });
  }
  setInterval(function(){ try{ remind(); }catch(e){} }, 30000);
  window.d28Remind = remind;

  /* ---------- 5/6. nudges + day summary (used by the Command Center) ---------- */
  window.d28Nudges = function(){
    var out = [], rows = state.rows||[];
    rows.forEach(function(r){
      if(r.woi || r.status || !r.candidate) return;
      var f = null; try{ f = findRepeatNoShowFlag(r); }catch(e){}
      if(f && f.count>=2) out.push({ic:'📞', t:'Confirm with '+r.candidate+' before '+r.time, s:f.count+' earlier no-shows / reschedules', id:r.id});
    });
    try{
      var hist = (typeof _allRowsAcrossDatesCache!=='undefined') ? _allRowsAcrossDatesCache : null;
      if(hist && typeof deskWoiOpen==='function'){
        var w = deskWoiOpen(hist, todayDateString(), normalizeNameKey).filter(function(x){ return x.age>=2; });
        if(w.length) out.push({ic:'⏳', t:w.length+' WOI call'+(w.length===1?'':'s')+' waiting 2+ days', s:w.slice(0,3).map(function(x){ return x.candidate; }).join(', ')+(w.length>3?'…':''), woi:true});
      }
    }catch(e){}
    return out.slice(0,5);
  };
  window.d28Summary = function(){
    var rows = state.rows||[], tn = getTeamNames();
    var live = rows.filter(function(r){ return !r.woi && !r.status && r.candidate; });
    var own = function(r){ return window.cdOwnerOf ? window.cdOwnerOf(r) : null; };
    var un = live.filter(function(r){ return !own(r); });
    var st = {}; rows.forEach(function(r){ if(r.status) st[r.status] = (st[r.status]||0)+1; });
    var team = {}; live.forEach(function(r){ var k = (r.assignee||'Unassigned'); team[k] = (team[k]||0)+1; });
    var L = ['*Coverage Desk — '+state.date+'*', 'Calls: '+rows.length+' · live '+live.length+' · covered '+(live.length-un.length)+' ('+(live.length?Math.round((live.length-un.length)/live.length*100):100)+'%)'];
    var ts = Object.keys(team).map(function(k){ return k+' '+team[k]; }); if(ts.length) L.push('By team: '+ts.join(' · '));
    var ss = Object.keys(st).map(function(k){ return k.replace('_',' ')+' '+st[k]; }); if(ss.length) L.push('Status: '+ss.join(' · '));
    var w = rows.filter(function(r){ return r.woi; }).length; if(w) L.push('Waiting for invite: '+w);
    if(un.length){ L.push('', '*Still without an owner ('+un.length+')*'); un.slice(0,20).forEach(function(r){ L.push('• '+(r.time||'')+' '+r.candidate+(r.company?' — '+r.company:'')); }); }
    return L.join('\n');
  };

  /* ---------- run ---------- */
  var t = 0;
  function install(){
    if(typeof window.render!=='function' || !window.__d17vw){ return setTimeout(install,250); }
    var o = window.render;
    window.render = function(){ var r = o.apply(this, arguments); clearTimeout(t); t = setTimeout(function(){ try{ applyLeave(); autoOwners(); }catch(e){ console.warn('d28', e); } }, 400); return r; };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== d29: V2.2 desk tools — paste, chase list, reschedule helper, heads-up, client rules, insights, weekly report, quick add, handler link ===== */
;(function(){
  if(window.__d29) return; window.__d29 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var LS = { g:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }, s:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
  var bd = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var nowBd = function(){ var d=new Date(); return (d.getHours()*60+d.getMinutes()+720)%1440; };
  var admin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  var toast = function(m){ try{ if(window.d2Toast) window.d2Toast(m,{ms:4000}); }catch(e){} };
  var rows = function(){ return state.rows||[]; };
  var own = function(r){ try{ return window.cdOwnerOf ? window.cdOwnerOf(r) : ((r.assignee||'').trim()?{name:r.assignee}:null); }catch(e){ return null; } };
  var live = function(){ return rows().filter(function(r){ return !r.woi && !r.status && r.candidate; }); };
  var first = function(n){ return String(n||'').trim().split(/\s+/)[0]||''; };
  var pad = function(n){ return (n<10?'0':'')+n; };
  var fmtT = function(b){ var c=(b+720)%1440, h=Math.floor(c/60), m=c%60; return (h%12||12)+':'+pad(m)+' '+(h>=12?'PM':'AM'); };
  var dur = function(r){ var d = null; try{ d = parseDurationMinutes(r.duration); }catch(e){} return d>0 ? d : 30; };
  var ck = function(c){ try{ return normalizeCompanyKey(c||''); }catch(e){ return String(c||'').toLowerCase().replace(/[^a-z0-9]/g,''); } };
  var nk = function(c){ try{ return normalizeNameKey(c||''); }catch(e){ return String(c||'').toLowerCase().replace(/[^a-z]/g,''); } };
  var copy = function(tx, btn, label){
    var done = function(){ if(btn){ var o = label||btn.textContent; btn.textContent = '✓ Copied'; setTimeout(function(){ btn.textContent = o; }, 1600); } };
    try{ navigator.clipboard.writeText(tx).then(done, function(){ window.prompt('Copy this', tx); }); }catch(e){ window.prompt('Copy this', tx); }
  };
  function ov(id, title, kicker, body){
    var old = document.getElementById(id); if(old) old.remove();
    var el = document.createElement('div'); el.id = id; el.className = 'd27-ov d29-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>'+esc(kicker)+'</small><h2>'+esc(title)+'</h2></div><button type="button" class="d27-x" data-d29x aria-label="Close">✕</button></div><div class="d29-body">'+body+'</div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d29x]'))) closeOv(el); });
    return el;
  }
  function closeOv(el){ if(el && el.parentNode) el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); }
  function setBody(el, html){ var b = el.querySelector('.d29-body'); if(b){ var s = el.scrollTop; b.innerHTML = html; el.scrollTop = s; } }

  /* ---------- confirmation tracker (per-date note, no new DB column) ---------- */
  var cid = function(){ return state.date+'-confirm-ids'; };
  function getConf(){ var e = (state.notes||[]).find(function(n){ return n && n.id===cid(); }); try{ return e ? (JSON.parse(e.text)||{}) : {}; }catch(x){ return {}; } }
  function setConf(rid, v){
    var m = getConf(); if(v && m[rid]!==v) m[rid] = v; else delete m[rid];
    state.notes = state.notes || [];
    var i = state.notes.findIndex(function(n){ return n && n.id===cid(); }), keys = Object.keys(m);
    if(keys.length){ var tx = JSON.stringify(m); if(i>=0) state.notes[i].text = tx; else state.notes.push({id:cid(), text:tx}); }
    else if(i>=0) state.notes.splice(i,1);
    try{ markDirty(); }catch(e){}
  }
  var CONF = [['invited','📨','Invited'],['confirmed','✅','Confirmed'],['noreply','🔕','No reply']];
  function chaseMsg(r){ return 'Hi '+first(r.candidate)+', a quick reminder: your '+(r.round||'')+' interview with '+(r.company||'the client')+(r.role?' ('+r.role+')':'')+' is today at '+(r.time||'the scheduled time')+'. Please reply to confirm you will be available.'; }
  function chaseHtml(){
    var m = getConf(), n = nowBd();
    var L = live().filter(function(r){ return bd(r.time)!==9999; }).sort(function(a,b){ return bd(a.time)-bd(b.time); });
    var cnt = {confirmed:0, invited:0, noreply:0, none:0}; L.forEach(function(r){ cnt[m[r.id]||'none']++; });
    var h = '<div class="d29-sum"><span><b>'+cnt.confirmed+'</b> confirmed</span><span><b>'+cnt.invited+'</b> invited</span><span class="'+(cnt.noreply?'bad':'')+'"><b>'+cnt.noreply+'</b> no reply</span><span><b>'+cnt.none+'</b> not marked</span></div>';
    var chase = L.filter(function(r){ return m[r.id]!=='confirmed' && bd(r.time)>=n-15; });
    if(chase.length) h += '<div class="d27-actions"><button type="button" class="d27-btn" data-d29chaseall>📋 Copy '+chase.length+' chase message'+(chase.length===1?'':'s')+'</button></div>';
    h += '<div class="d27-list">'+(L.length? L.map(function(r){ var s = m[r.id]||'';
      return '<div class="d29-cr"><div class="d29-crt"><span class="t">'+esc(r.time)+'</span><span class="n"><b>'+esc(r.candidate)+'</b><small>'+esc([r.company,r.round].filter(Boolean).join(' · '))+'</small></span><button type="button" class="d27-btn sm ghost" data-d29chase="'+esc(r.id)+'">📋</button></div>'
        + '<div class="d29-seg">'+CONF.map(function(c){ return '<button type="button" class="'+(s===c[0]?'on '+c[0]:'')+'" data-d29conf="'+esc(r.id)+'" data-v="'+c[0]+'">'+c[1]+' '+c[2]+'</button>'; }).join('')+'</div></div>'; }).join('') : '<div class="d27-empty">No timed calls today.</div>')+'</div>';
    return h;
  }

  /* ---------- reschedule helper ---------- */
  function slotsFor(r, k){
    var o = own(r), who = o && o.name;
    var cal = rows().filter(function(x){ if(x===r || x.woi || x.status || !x.candidate || bd(x.time)===9999) return false; if(who){ var ox = own(x); return ox && ox.name===who; } return (x.assignee||'')===(r.assignee||''); });
    var d = dur(r), t0 = bd(r.time), base = Math.max(nowBd(), t0===9999?0:t0) + 15, out = [];
    for(var s = Math.ceil(base/30)*30; s < 1440 && out.length<k; s += 30){
      var bad = cal.some(function(x){ var b = bd(x.time), e = b+dur(x); return s < e && b < s+d; });
      if(!bad) out.push(s);
    }
    return { who: who, slots: out };
  }
  function reschedMsg(r, s){
    return 'Hi, we need to reschedule '+r.candidate+'’s '+(r.round||'')+' interview for '+(r.company||'your team')+(r.role?' ('+r.role+')':'')+' on '+state.date+' — the earlier slot was '+(r.time||'unconfirmed')+'. Could you confirm '+fmtT(s)+' instead? Please let us know if another time works better.';
  }
  var rsId = null, rsPick = null;
  function reschedHtml(){
    var r = rows().find(function(x){ return x.id===rsId; });
    if(!r){
      var L = live().sort(function(a,b){ return bd(a.time)-bd(b.time); });
      return '<p class="d29-p">Pick the call that has to move.</p><div class="d27-list">'+(L.length? L.map(function(x){ return '<button type="button" class="d27-row" data-d29rspick="'+esc(x.id)+'"><span class="t">'+esc(x.time||'')+'</span><span class="n"><b>'+esc(x.candidate)+'</b><small>'+esc([x.company,x.round].filter(Boolean).join(' · '))+'</small></span><span class="o">›</span></button>'; }).join('') : '<div class="d27-empty">No live calls.</div>')+'</div>';
    }
    var p = slotsFor(r, 6); if(rsPick===null || p.slots.indexOf(rsPick)<0) rsPick = p.slots[0]===undefined ? null : p.slots[0];
    var h = '<div class="d29-rsh"><b>'+esc(r.candidate)+'</b><small>'+esc([r.time,r.company,r.round].filter(Boolean).join(' · '))+'</small><small>'+(p.who?'Free slots for '+esc(p.who):'Free slots (no owner yet — checked against the team)')+'</small></div>';
    h += p.slots.length ? '<div class="d29-seg wrap">'+p.slots.map(function(s){ return '<button type="button" class="'+(s===rsPick?'on':'')+'" data-d29slot="'+s+'">'+fmtT(s)+'</button>'; }).join('')+'</div>' : '<div class="d27-empty">No free slot left today.</div>';
    if(rsPick!==null){
      h += '<textarea class="d29-ta" readonly id="d29rsm">'+esc(reschedMsg(r, rsPick))+'</textarea><div class="d27-actions"><button type="button" class="d27-btn" data-d29rscopy>📋 Copy client message</button>'+(admin()?'<button type="button" class="d27-btn ghost" data-d29rsapply>Move call to '+fmtT(rsPick)+'</button>':'')+'</div>';
    }
    return h + '<div class="d27-actions"><button type="button" class="d27-btn ghost" data-d29rsback>‹ Other call</button></div>';
  }

  /* ---------- heads-up: overload + duplicates ---------- */
  function overload(){
    var by = {}, out = [];
    live().forEach(function(r){ var o = own(r); if(!o || !o.name || bd(r.time)===9999) return; (by[o.name] = by[o.name]||[]).push(r); });
    Object.keys(by).forEach(function(nm){
      var L = by[nm].sort(function(a,b){ return bd(a.time)-bd(b.time); }), msg = null, ids = L.map(function(r){ return r.id; });
      for(var i=0;i<L.length-1;i++){ if(bd(L[i+1].time)-bd(L[i].time) < dur(L[i])+5 && L[i].time!==L[i+1].time){ msg = 'back-to-back '+L[i].time+' → '+L[i+1].time; break; } }
      if(!msg){ for(var a=0;a+2<L.length;a++){ if(bd(L[a+2].time)-bd(L[a].time) <= 120){ msg = '3 calls within 2 hours from '+L[a].time; break; } } }
      if(msg) out.push({ic:'🔥', t:nm+' is stacked', s:msg, id:L[0].id, who:nm});
    });
    return out;
  }
  function dupes(){
    var m = {}, out = [], hist = null;
    live().forEach(function(r){ var k = nk(r.candidate)+'|'+ck(r.company); (m[k] = m[k]||[]).push(r); });
    Object.keys(m).forEach(function(k){ if(m[k].length>1) out.push({ic:'👯', t:'Possible duplicate: '+m[k][0].candidate, s:m[k].length+' entries for '+(m[k][0].company||'same company')+' today', id:m[k][0].id}); });
    try{ hist = (typeof _allRowsAcrossDatesCache!=='undefined') ? _allRowsAcrossDatesCache : null; }catch(e){}
    if(hist){
      var done = {rescheduled:1,cancelled:1,not_responded:1,no_invite:1};
      live().forEach(function(r){
        var k = nk(r.candidate)+'|'+ck(r.company)+'|'+String(r.round||'').toLowerCase();
        var prev = hist.filter(function(h){ return h._date && h._date < state.date && !h.woi && !done[h.status] && (nk(h.candidate)+'|'+ck(h.company)+'|'+String(h.round||'').toLowerCase())===k; })[0];
        if(prev && !out.some(function(o){ return o.id===r.id; })) out.push({ic:'🔁', t:r.candidate+' already had this round', s:(r.company||'')+' · '+(r.round||'')+' on '+prev._date, id:r.id});
      });
    }
    return out;
  }
  function noReplies(){
    var m = getConf(), n = nowBd();
    return live().filter(function(r){ return m[r.id]==='noreply' && bd(r.time)!==9999 && bd(r.time)-n<=60 && bd(r.time)-n>=-10; }).map(function(r){ return {ic:'🔕', t:r.candidate+' has not replied', s:'call at '+r.time+' — chase now', id:r.id}; });
  }
  function heads(){ var o = []; try{ o = noReplies().concat(overload(), dupes()); }catch(e){ console.warn('d29 heads', e); } return o; }
  window.d29Heads = heads;
  var prevNudges = window.d28Nudges;
  window.d28Nudges = function(){
    var base = []; try{ base = prevNudges ? prevNudges() : []; }catch(e){}
    var mon = []; try{ if(new Date().getDay()===1 && !LS.g('cd.wk.'+state.date,'')) mon = [{ic:'📈', t:'Monday — last week’s report is ready', s:'open 🧰 Tools → Weekly report', tool:'week'}]; }catch(e){}
    return base.concat(heads(), mon).slice(0,8);
  };

  /* ---------- client rules ---------- */
  var RULES = {}, rulesLoaded = false;
  async function loadRules(){
    try{ RULES = JSON.parse(LS.g('cd.rules','{}'))||{}; }catch(e){ RULES = {}; }
    try{ var d = await apiCall('app_settings', {qs:'key=client_rules'}); if(d && d.value){ RULES = JSON.parse(d.value)||{}; LS.s('cd.rules', d.value); } }catch(e){}
    inject();
  }
  async function saveRules(){
    var v = JSON.stringify(RULES); LS.s('cd.rules', v);
    try{ await apiCall('app_settings', {method:'POST', body:{key:'client_rules', value:v}}); toast('Client rules saved'); }catch(e){ toast('Saved on this device only — server save failed'); }
  }
  function companies(){
    var m = {}; rows().forEach(function(r){ if(r.company){ var k = ck(r.company); if(k && !m[k]) m[k] = r.company.trim(); } });
    Object.keys(RULES).forEach(function(k){ if(!m[k]) m[k] = k; });
    return m;
  }
  function rulesHtml(){
    var cs = companies(), keys = Object.keys(cs).sort(function(a,b){ return (RULES[b]?1:0)-(RULES[a]?1:0) || cs[a].localeCompare(cs[b]); });
    return '<p class="d29-p">One note per client — shown on every call for that client. '+(admin()?'Tap a client to write or change its rule.':'Only the admin can edit these.')+'</p><div class="d27-list">'
      + (keys.length? keys.map(function(k){ return '<div class="d29-rl"><button type="button" class="d27-row" data-d29rule="'+esc(k)+'"'+(admin()?'':' disabled')+'><span class="n"><b>'+esc(cs[k])+'</b><small>'+(RULES[k]?esc(RULES[k]):'No rule yet')+'</small></span><span class="o">'+(RULES[k]?'✎':'＋')+'</span></button></div>'; }).join('') : '<div class="d27-empty">No clients on this day yet.</div>')+'</div>';
  }
  function ruleEdit(el, k){
    var cs = companies();
    setBody(el, '<p class="d29-p"><b>'+esc(cs[k]||k)+'</b></p><textarea class="d29-ta" id="d29rt" rows="5" placeholder="e.g. Always send the Zoom link 30 min early · No calls after 6 PM · Ask for the TA before rescheduling">'+esc(RULES[k]||'')+'</textarea><div class="d27-actions"><button type="button" class="d27-btn" data-d29rsave="'+esc(k)+'">Save</button>'+(RULES[k]?'<button type="button" class="d27-btn ghost" data-d29rdel="'+esc(k)+'">Remove</button>':'')+'<button type="button" class="d27-btn ghost" data-d29rback>Back</button></div>');
  }

  /* ---------- call-card injection (rule banner + quick actions) ---------- */
  var curId = null;
  var o23 = window.d23Open; if(o23) window.d23Open = function(id){ curId = id; return o23.apply(this, arguments); };
  var o5 = window.d5OpenSide; if(o5) window.d5OpenSide = function(id){ curId = id; return o5.apply(this, arguments); };
  function box(r){
    var t = RULES[ck(r.company)], m = getConf()[r.id], cl = CONF.filter(function(c){ return c[0]===m; })[0];
    return '<div class="d29-box" data-d29for="'+esc(r.id)+'">'+(t?'<div class="d29-rule"><b>📌 '+esc(r.company)+' rule</b><span>'+esc(t)+'</span></div>':'')
      + '<div class="d29-qa"><button type="button" data-d29qa="rs" data-id="'+esc(r.id)+'">🔁 Next free slot</button><button type="button" data-d29qa="cf" data-id="'+esc(r.id)+'">'+(cl?cl[1]+' '+cl[2]:'📞 Confirmation')+'</button></div></div>';
  }
  function rowForSide(side){
    var nm = ((side.querySelector('.d5-ht b')||{}).textContent||'').trim(); if(!nm) return null;
    var tm = (side.querySelector('[data-f="time"]')||{}).value;
    var c = rows().filter(function(r){ return (r.candidate||'').trim()===nm; });
    return (tm && c.filter(function(r){ return r.time===tm; })[0]) || c[0] || null;
  }
  var injT = 0;
  function inject(){
    var c23 = document.querySelector('#d23 .d23-card'), r;
    if(c23 && curId){ r = rows().filter(function(x){ return x.id===curId; })[0]; var ex = c23.querySelector('.d29-box');
      if(r && !r.woi && (!ex || ex.getAttribute('data-d29for')!==String(r.id) || ex.__sig!==(RULES[ck(r.company)]||'')+(getConf()[r.id]||''))){ if(ex) ex.remove(); var a = c23.querySelector('.d23-chips'); if(a){ a.insertAdjacentHTML('afterend', box(r)); var nb = c23.querySelector('.d29-box'); if(nb) nb.__sig = (RULES[ck(r.company)]||'')+(getConf()[r.id]||''); } } }
    var side = document.querySelector('#d5Side .d5-body');
    if(side){ var sd = document.getElementById('d5Side'); r = rowForSide(sd); var ex2 = side.querySelector('.d29-box');
      if(r && !r.woi && (!ex2 || ex2.getAttribute('data-d29for')!==String(r.id) || ex2.__sig!==(RULES[ck(r.company)]||'')+(getConf()[r.id]||''))){ if(ex2) ex2.remove(); side.insertAdjacentHTML('afterbegin', box(r)); var nb2 = side.querySelector('.d29-box'); if(nb2) nb2.__sig = (RULES[ck(r.company)]||'')+(getConf()[r.id]||''); } }
  }
  try{ new MutationObserver(function(){ clearTimeout(injT); injT = setTimeout(inject, 60); }).observe(document.body, {childList:true, subtree:true}); }catch(e){}

  /* ---------- insights ---------- */
  async function insightsHtml(){
    var all = []; try{ all = await fetchAllRowsAcrossDates(); }catch(e){}
    all = (all||[]).filter(function(r){ return r.candidate && !r.woi; });
    if(!all.length) return '<div class="d27-empty">No history loaded yet.</div>';
    function grp(keyFn, label){
      var m = {}; all.forEach(function(r){ var k = keyFn(r); if(!k) return; var o = m[k] || (m[k] = {k:k, name:label(r), n:0, rs:0, cx:0, nr:0}); o.n++; if(r.status==='rescheduled') o.rs++; else if(r.status==='cancelled') o.cx++; else if(r.status==='not_responded'||r.status==='no_invite') o.nr++; });
      return Object.keys(m).map(function(k){ return m[k]; }).filter(function(o){ return o.n>=3; }).sort(function(a,b){ return b.n-a.n; }).slice(0,8);
    }
    var pc = function(a,n){ return n? Math.round(a/n*100)+'%' : '0%'; };
    function tbl(title, L){
      return '<div class="d27-sec"><b>'+title+'</b><span>calls · resched · cancel · no-show</span></div><div class="d27-list">'+(L.length? L.map(function(o){ var bad = (o.rs+o.cx+o.nr)/o.n >= 0.3; return '<div class="d29-ir"><span class="n"><b>'+esc(o.name)+'</b></span><span>'+o.n+'</span><span class="'+(o.rs/o.n>=.2?'bad':'')+'">'+pc(o.rs,o.n)+'</span><span class="'+(o.cx/o.n>=.2?'bad':'')+'">'+pc(o.cx,o.n)+'</span><span class="'+(o.nr/o.n>=.2?'bad':'')+'">'+pc(o.nr,o.n)+'</span></div>'; }).join('') : '<div class="d27-empty">Not enough calls yet (needs 3+).</div>')+'</div>';
    }
    var h = '<p class="d29-p">Based on '+all.length+' calls across all saved days.</p>';
    h += tbl('Clients', grp(function(r){ return ck(r.company); }, function(r){ return r.company; }));
    h += tbl('Roles', grp(function(r){ try{ return deskRoleFamily(r.role); }catch(e){ return ''; } }, function(r){ try{ return deskRoleFamily(r.role); }catch(e){ return ''; } }));
    h += tbl('Owners', grp(function(r){ return (r.drivingPerson||'').trim() || ''; }, function(r){ return r.drivingPerson; }));
    try{
      var perf = await computeClosuresPerformance(); var calls = {};
      all.forEach(function(r){ var w = (r.drivingPerson||r.assignee||'').trim(); if(w) calls[w] = (calls[w]||0)+1; });
      var L = (perf.rows||[]).filter(function(x){ return x.closures>0; }).sort(function(a,b){ return b.closures-a.closures; }).slice(0,8);
      h += '<div class="d27-sec"><b>Closures by handler</b><span>closures · per 100 calls</span></div><div class="d27-list">'+(L.length? L.map(function(x){ var c = calls[x.handler]||0; return '<div class="d29-ir two"><span class="n"><b>'+esc(x.handler)+'</b></span><span>'+x.closures+'</span><span>'+(c? (x.closures/c*100).toFixed(1) : '—')+'</span></div>'; }).join('') : '<div class="d27-empty">No closures matched yet.</div>')+'</div>';
    }catch(e){}
    return h;
  }

  /* ---------- weekly report ---------- */
  var wkStart = null, wkAll = null;
  async function weekHtml(){
    if(!wkAll){ try{ wkAll = await fetchAllRowsAcrossDates(); }catch(e){ wkAll = []; } }
    if(!wkStart) wkStart = deskDateAdd(deskMonday(todayDateString()), -7);
    var rep = deskWeeklyReport(wkAll, wkStart, getTeamNames()), tx = deskWeeklyText(rep);
    LS.s('cd.wk.'+todayDateString(), '1');
    return '<div class="d29-wk"><button type="button" class="d27-btn sm ghost" data-d29wk="-1">‹</button><b>'+esc(rep.start)+' → '+esc(rep.end)+'</b><button type="button" class="d27-btn sm ghost" data-d29wk="1">›</button></div>'
      + '<div class="d29-sum"><span><b>'+(rep.totals.total||0)+'</b> calls</span><span><b>'+(rep.totals.resched||0)+'</b> resched</span><span><b>'+(rep.totals.cancelled||0)+'</b> cancelled</span><span><b>'+rep.woi+'</b> WOI</span></div>'
      + '<textarea class="d29-ta" readonly rows="10" id="d29wkt">'+esc(tx)+'</textarea><div class="d27-actions"><button type="button" class="d27-btn" data-d29wkcopy>📋 Copy for WhatsApp</button><button type="button" class="d27-btn ghost" data-d29wkpdf>🖨 Print / Save PDF</button></div>';
  }
  function weekPdf(){
    var rep = deskWeeklyReport(wkAll||[], wkStart, getTeamNames()), w = window.open('', '_blank'); if(!w){ toast('Allow pop-ups to print'); return; }
    var q = function(x){ return esc(x); };
    w.document.write('<!doctype html><title>Coverage Desk week '+q(rep.start)+'</title><style>body{font:14px system-ui;padding:28px;color:#111}h1{font-size:20px;margin:0 0 4px}table{border-collapse:collapse;width:100%;margin-top:14px}th,td{border:1px solid #bbb;padding:6px 9px;text-align:left}th{background:#eee}td+td,th+th{text-align:right}</style><h1>Coverage Desk — weekly report</h1><div>'+q(rep.start)+' to '+q(rep.end)+' · '+(rep.totals.total||0)+' calls · '+rep.woi+' waiting for invite</div><table><tr><th>Person</th><th>Total</th><th>1st</th><th>Advanced</th><th>Resched</th><th>Cancelled</th><th>No response</th></tr>'
      + rep.rows.map(function(r){ return '<tr><td>'+q(r.name)+'</td><td>'+r.total+'</td><td>'+r.first+'</td><td>'+r.adv+'</td><td>'+r.resched+'</td><td>'+r.cancelled+'</td><td>'+r.noresp+'</td></tr>'; }).join('')+'</table>');
    w.document.close(); setTimeout(function(){ try{ w.print(); }catch(e){} }, 300);
  }

  /* ---------- quick add (type or speak) ---------- */
  var qaDraft = null;
  function parseQuick(tx){
    var s = ' '+tx.replace(/\s+/g,' ').trim()+' ', out = {candidate:'', company:'', role:'', time:'', round:'1st'};
    var tm = s.match(/(\d{1,2})(?:[:.\s](\d{2}))?\s*(a\.?m\.?|p\.?m\.?)/i);
    if(tm){ var h = +tm[1], mi = tm[2]?+tm[2]:0, ap = /p/i.test(tm[3]); if(h>=1&&h<=12&&mi<60){ out.time = h+':'+pad(mi)+' '+(ap?'PM':'AM'); s = s.replace(tm[0],' '); } }
    if(/\b(second|2nd|advanced|final|third|3rd)\b/i.test(s)){ out.round = '2nd Round'; s = s.replace(/\b(second|2nd|advanced|final|third|3rd)\s*(round)?\b/ig,' '); } else s = s.replace(/\b(first|1st)\s*(round)?\b/ig,' ');
    var known = {}; rows().forEach(function(r){ if(r.company) known[r.company.trim()] = 1; });
    var low = s.toLowerCase(), best = '';
    Object.keys(known).forEach(function(c){ if(c.length>best.length && low.indexOf(c.toLowerCase())>=0) best = c; });
    if(best){ out.company = best; s = s.replace(new RegExp(best.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i'),' | '); }
    var rm = s.match(/([A-Za-z\/& ]{0,30}\b(?:engineer|analyst|developer|scientist|manager|architect|administrator|consultant|specialist|tester|designer)\b)/i);
    if(rm){ out.role = rm[1].replace(/^\s*(for|as|a|an|the|at|with|and)\b\s*/i,'').trim(); s = s.replace(rm[1],' | '); }
    var parts = s.split(/[,|]| (?:at|with|for) /i).map(function(x){ return x.replace(/\b(call|interview|schedule|add|new|candidate)\b/ig,'').trim(); }).filter(Boolean);
    out.candidate = (parts[0]||'').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
    if(!out.company && parts[1]) out.company = parts[1].replace(/\b\w/g, function(c){ return c.toUpperCase(); });
    return out;
  }
  function qaHtml(){
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition, d = qaDraft;
    var h = '<p class="d29-p">Type or speak one line, e.g. <i>“Ravi Kumar, Google, 3 pm, data analyst, second round”</i>.</p><textarea class="d29-ta" id="d29qt" rows="3" placeholder="Candidate, company, time, role, round">'+esc(d?d.src:'')+'</textarea>'
      + '<div class="d27-actions">'+(SR?'<button type="button" class="d27-btn ghost" data-d29mic id="d29mic">🎤 Speak</button>':'')+'<button type="button" class="d27-btn" data-d29parse>Read it</button></div>';
    if(d){
      h += '<div class="d29-form">'+[['candidate','Candidate'],['company','Company'],['role','Role'],['time','Time (e.g. 3:00 PM)']].map(function(f){ return '<label>'+f[1]+'<input data-d29f="'+f[0]+'" value="'+esc(d[f[0]])+'"></label>'; }).join('')
        + '<label>Round<select data-d29f="round"><option'+(d.round==='1st'?' selected':'')+'>1st</option><option'+(d.round!=='1st'?' selected':'')+'>2nd Round</option></select></label></div>'
        + (d.warn?'<div class="d29-warn">⚠ '+esc(d.warn)+'</div>':'')
        + '<div class="d27-actions"><button type="button" class="d27-btn" data-d29add>＋ Add this call</button></div>';
    }
    return h;
  }
  function dupWarn(d){
    var k = nk(d.candidate)+'|'+ck(d.company), w = '';
    if(rows().some(function(r){ return r.candidate && (nk(r.candidate)+'|'+ck(r.company))===k; })) w = d.candidate+' at '+d.company+' is already on today’s list.';
    else { try{ var h = _allRowsAcrossDatesCache||[]; var p = h.filter(function(x){ return x._date && (nk(x.candidate)+'|'+ck(x.company))===k; })[0]; if(p) w = d.candidate+' already had a call at '+d.company+' on '+p._date+'.'; }catch(e){} }
    return w;
  }

  /* ---------- handler link ---------- */
  function handlerHtml(){
    var ppl = (state.roster||[]).filter(function(p){ return p && p.name; });
    return '<p class="d29-p">A personal link that opens the app already filtered to one person’s own calls. They sign in with their normal account — no admin rights needed.</p><div class="d27-list">'
      + (ppl.length? ppl.map(function(p){ return '<div class="d27-row" style="cursor:default"><span class="n"><b>'+esc(p.name)+'</b><small>'+esc(p.team||'')+'</small></span><button type="button" class="d27-btn sm" data-d29link="'+esc(p.name)+'">📋 Copy link</button></div>'; }).join('') : '<div class="d27-empty">Roster is empty.</div>')+'</div>';
  }
  (function(){ try{
    var p = new URLSearchParams(location.search).get('handler'); if(!p) return;
    var tries = 0, go = function(){ if(typeof state==='undefined' || typeof setMyAssigneeName!=='function'){ if(tries++<40) setTimeout(go,250); return; }
      try{ setMyAssigneeName(p); state.assigneeFilter = p; state.filter = 'all'; document.documentElement.classList.add('d29-handler'); render(); }catch(e){} };
    go();
  }catch(e){} })();

  window.d29RuleFor = function(c){ return RULES[ck(c)] || ''; };
  window.d29Slots = function(r,k){ return slotsFor(r,k); }; window.d29Fmt = fmtT; window.d29ChaseMsg = chaseMsg;
  /* ---------- hub ---------- */
  var hub = null;
  function hubHtml(){
    var hd = heads();
    var T = [['paste','📥','Paste a message','WhatsApp / email reschedule or cancel'],['chase','📞','Chase list','Invite · confirmed · no reply'],['resched','🔁','Reschedule helper','Next free slot + client message'],['rules','📌','Client rules','Notes shown on every call'],['insights','📊','Insights','Clients, roles, owners, closures'],['week','📈','Weekly report','Copy or save as PDF'],['quick','🎤','Quick add','Type or speak a call'],['handler','🔗','Handler link','Personal link per person'],['reply','💬','Reply builder','Ready WhatsApp messages'],['wrap','🌙','End-of-day wrap','Summary + still open'],['carry','🗂','Carry-forward','Yesterday’s unfinished calls'],['email','✉️','Paste an email','Clean a forwarded email'],['score','🏷','Client scorecard','Reschedule rate, best handler'],['fair','⚖️','Workload','Fairness + fatigue'],['changes','🕘','Changes & undo','What changed, undo'],['backup','💾','Backup & restore','Download or roll back'],['incent','💰','My incentives','Where I am this month'],['prep','🧭','Prep a call','History, outcomes, rule'],['dtrend','📈','Domain trend','Rising / falling skills'],['learn','🧠','Learned owners','What the app picked up'],['notif','🔕','Quiet alerts','Hours, daily cap, skip confirmed'],['ttop','🛰','TTOP data','Read-only view of the TTOP portal'],['person','👤','Person card','Calls, incentives, record for anyone'],['dcmp','📅','Day compare','This day vs same weekday last week'],['scrum','🗣','Daily scrum','Board + Telugu transcript'],['look','🪟','Look: '+(document.documentElement.getAttribute('data-look')==='glass'?'Glass':'Classic'),'Tap to switch Glass / Classic'],['focus','🎯','Focus modes','My calls, needs-owner view, do-not-disturb timer'],['ics','📆','Calendar file','Add calls to your phone calendar (.ics)'],['dock','🪟','Details dock','Split view: call details follow the row you select (D)'],['clip','📋','Clipboard history','Last 10 things you copied (Alt+V)'],['fsb','💾','Backup folder','Save a daily backup into a folder on this PC'],['fbk','💬','Feedback import','Paste 1st-round feedback — it attaches to each call by name + client'],['xlr','📊','Export to Excel','Pick a date range → date, name, country, company, role'],['fbp','🧭','Prep list','Today’s candidates whose feedback says they need prep — with ready messages'],['fbm','📝','Feedback pending','Calls with no feedback yet — chase each person'],['fbs','📈','Feedback summary','Went well vs needs prep, by tag, client and person']];
    window.d29T = T;
    var GR = [['Daily work',['paste','chase','resched','quick','reply','email','carry','wrap']],['Before a call',['prep','fbp','rules','learn']],['Feedback',['fbk','fbm','fbs']],['Reports',['insights','week','dtrend','score','fair','dcmp','incent','ttop','xlr','scrum']],['People',['person','handler']],['Safety',['changes','backup','fsb']],['Look & settings',['look','focus','dock','ics','clip','notif']]], used = {};
    var tile = function(t, g){ return '<button type="button" class="d29-tile" data-d29t="'+t[0]+'" data-d29g="'+esc(g)+'"><span>'+t[1]+'</span><b>'+t[2]+'</b><small>'+t[3]+'</small></button>'; };
    var byK = {}; T.forEach(function(t){ byK[t[0]] = t; });
    var secs = GR.map(function(g){ var L = g[1].filter(function(k){ return byK[k]; }); L.forEach(function(k){ used[k] = 1; }); return L.length ? '<section class="d29-grp"><div class="d29-gh">'+esc(g[0])+'<span>'+L.length+'</span></div><div class="d29-grid">'+L.map(function(k){ return tile(byK[k], g[0]); }).join('')+'</div></section>' : ''; }).join('');
    var rest = T.filter(function(t){ return !used[t[0]]; });
    if(rest.length) secs += '<section class="d29-grp"><div class="d29-gh">More<span>'+rest.length+'</span></div><div class="d29-grid">'+rest.map(function(t){ return tile(t,'More'); }).join('')+'</div></section>';
    return '<div class="d29-groups">'+secs+'</div><div id="d29None" class="d27-empty" hidden>No tool matches that.</div>'
      + '<div class="d27-sec"><b>Heads-up</b><span>'+hd.length+'</span></div><div class="d27-list">'+(hd.length? hd.slice(0,8).map(function(x){ return '<button type="button" class="d27-row" data-d29open="'+esc(x.id)+'"><span class="t">'+x.ic+'</span><span class="n"><b>'+esc(x.t)+'</b><small>'+esc(x.s)+'</small></span><span class="o">›</span></button>'; }).join('') : '<div class="d27-empty">✓ No overloads, duplicates or missing replies.</div>')+'</div>';
  }
  var tool = null;
  function openTool(k){
    if(k==='look'){ var g = document.documentElement.getAttribute('data-look')==='glass'; try{ localStorage.setItem('coverage-desk-look', g?'classic':'glass'); }catch(e){} if(g) document.documentElement.removeAttribute('data-look'); else document.documentElement.setAttribute('data-look','glass'); if(hub){ closeOv(hub); hub = null; } setTimeout(openHub, 60); return; }
    tool = k; if(hub){ closeOv(hub); hub = null; }
    if(k==='paste'){ try{ openOnlyPanel('showRescheduleImport'); render(); }catch(e){ state.showRescheduleImport = true; render(); } return; }
    var M = { chase:['Chase list','CONFIRMATIONS',chaseHtml], resched:['Reschedule helper','NEXT FREE SLOT',reschedHtml], rules:['Client rules','PER CLIENT',rulesHtml], insights:['Insights','HISTORY',null], week:['Weekly report','REPORT',null], quick:['Quick add','NEW CALL',qaHtml], handler:['Handler link','SHARE',handlerHtml] }[k];
    if(!M){ try{ if(window.d33Open) window.d33Open(k); }catch(e){ console.warn('d33', e); } return; }
    if(k==='resched' && !rsId) rsPick = null;
    var el = ov('d29T', M[0], M[1], M[2] ? M[2]() : '<div class="d27-empty">Loading…</div>'); el.__k = k;
    if(k==='insights') insightsHtml().then(function(h){ if(el.isConnected) setBody(el, h); }).catch(function(){ if(el.isConnected) setBody(el, window.d35Fail('insights')); });
    if(k==='week') weekHtml().then(function(h){ if(el.isConnected) setBody(el, h); }).catch(function(){ if(el.isConnected) setBody(el, window.d35Fail('week')); });
    el.addEventListener('click', onTool);
    el.addEventListener('input', function(e){ var f = e.target.closest && e.target.closest('[data-d29f]'); if(f && qaDraft) qaDraft[f.getAttribute('data-d29f')] = f.value; });
  }
  function repaint(el){ var k = el.__k; var fn = { chase:chaseHtml, resched:reschedHtml, rules:rulesHtml, quick:qaHtml, handler:handlerHtml }[k]; if(fn) setBody(el, fn()); }
  var rec = null;
  function onTool(e){
    var el = e.currentTarget, t = e.target; if(!t.closest) return;
    var b;
    if((b = t.closest('[data-d29conf]'))){ setConf(b.getAttribute('data-d29conf'), b.getAttribute('data-v')); repaint(el); return; }
    if((b = t.closest('[data-d29chase]'))){ var r = rows().filter(function(x){ return x.id===b.getAttribute('data-d29chase'); })[0]; if(r) copy(chaseMsg(r), b, '📋'); return; }
    if((b = t.closest('[data-d29chaseall]'))){ var m = getConf(), n = nowBd(); copy(live().filter(function(r){ return bd(r.time)!==9999 && m[r.id]!=='confirmed' && bd(r.time)>=n-15; }).sort(function(a,c){ return bd(a.time)-bd(c.time); }).map(function(r){ return r.candidate+' — '+r.time+'\n'+chaseMsg(r); }).join('\n\n'), b); return; }
    if((b = t.closest('[data-d29rspick]'))){ rsId = b.getAttribute('data-d29rspick'); rsPick = null; repaint(el); return; }
    if((b = t.closest('[data-d29slot]'))){ rsPick = +b.getAttribute('data-d29slot'); repaint(el); return; }
    if(t.closest('[data-d29rsback]')){ rsId = null; rsPick = null; repaint(el); return; }
    if((b = t.closest('[data-d29rscopy]'))){ copy((document.getElementById('d29rsm')||{}).value||'', b); return; }
    if(t.closest('[data-d29rsapply]')){ var rr = rows().filter(function(x){ return x.id===rsId; })[0]; if(rr && rsPick!==null){ rr.time = fmtT(rsPick); try{ markDirty(); render(); }catch(x){} toast('Moved '+rr.candidate+' to '+rr.time); rsId = null; rsPick = null; repaint(el); } return; }
    if((b = t.closest('[data-d29rule]'))){ ruleEdit(el, b.getAttribute('data-d29rule')); return; }
    if((b = t.closest('[data-d29rsave]'))){ var kk = b.getAttribute('data-d29rsave'), v = (document.getElementById('d29rt')||{}).value||''; if(v.trim()) RULES[kk] = v.trim(); else delete RULES[kk]; saveRules(); inject(); repaint(el); return; }
    if((b = t.closest('[data-d29rdel]'))){ delete RULES[b.getAttribute('data-d29rdel')]; saveRules(); inject(); repaint(el); return; }
    if(t.closest('[data-d29rback]')){ repaint(el); return; }
    if((b = t.closest('[data-d35retry]'))){ var rk = b.getAttribute('data-d35retry'); setBody(el, '<div class="d27-empty">Loading…</div>'); (rk==='week'?weekHtml():insightsHtml()).then(function(h){ setBody(el, h); }).catch(function(){ setBody(el, window.d35Fail(rk)); }); return; }
    if((b = t.closest('[data-d29wk]'))){ wkStart = deskDateAdd(wkStart, 7*(+b.getAttribute('data-d29wk'))); weekHtml().then(function(h){ setBody(el, h); }).catch(function(){ setBody(el, window.d35Fail('week')); }); return; }
    if((b = t.closest('[data-d29wkcopy]'))){ copy((document.getElementById('d29wkt')||{}).value||'', b); return; }
    if(t.closest('[data-d29wkpdf]')){ weekPdf(); return; }
    if(t.closest('[data-d29parse]')){ var src = (document.getElementById('d29qt')||{}).value||''; if(!src.trim()) return; qaDraft = parseQuick(src); qaDraft.src = src; qaDraft.warn = qaDraft.candidate ? dupWarn(qaDraft) : ''; repaint(el); return; }
    if(t.closest('[data-d29mic]')){
      var SR = window.SpeechRecognition || window.webkitSpeechRecognition, mic = document.getElementById('d29mic'); if(!SR) return;
      if(rec){ try{ rec.stop(); }catch(x){} rec = null; return; }
      rec = new SR(); rec.lang = 'en-IN'; rec.interimResults = false; rec.maxAlternatives = 1;
      rec.onresult = function(ev){ var tx = ev.results[0][0].transcript; var ta = document.getElementById('d29qt'); if(ta) ta.value = tx; qaDraft = parseQuick(tx); qaDraft.src = tx; qaDraft.warn = qaDraft.candidate ? dupWarn(qaDraft) : ''; repaint(el); };
      rec.onend = function(){ rec = null; var m2 = document.getElementById('d29mic'); if(m2) m2.textContent = '🎤 Speak'; };
      rec.onerror = function(){ toast('Could not hear that — try again'); };
      try{ rec.start(); if(mic) mic.textContent = '● Listening…'; }catch(x){} return;
    }
    if(t.closest('[data-d29add]')){
      var d = qaDraft; if(!d || !d.candidate.trim()){ toast('Add a candidate name'); return; }
      var doAdd = function(){
        rows().push({id:uid(), time:d.time||'', company:d.company||'', candidate:d.candidate.trim(), round:d.round==='1st'?'1st':'2nd Round', duration:'', woi:!d.time, assignee:'', country:'USA', doubts:[], raw:d.src||'', interviewer:'', role:d.role||'', technicalPOC:'', importance:'', onsite:false, candidateFirstInterview:false, drivingPerson:''});
        try{ markDirty(); render(); }catch(x){} toast('Added '+d.candidate); qaDraft = null; repaint(el);
      };
      if(d.warn && window.cdConfirm) window.cdConfirm(d.warn+'\nAdd it anyway?', {title:'Possible duplicate'}).then(function(ok){ if(ok) doAdd(); }); else doAdd();
      return;
    }
    if((b = t.closest('[data-d29link]'))){ copy(location.origin+location.pathname+'?handler='+encodeURIComponent(b.getAttribute('data-d29link')), b); return; }
  }
  function openHub(){ if(hub) closeOv(hub); hub = ov('d29Hub', 'Desk tools', state.date+' · '+(window.__cdVer||'V2.6'), hubHtml()); hub.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-d29t]'); if(t){ openTool(t.getAttribute('data-d29t')); return; }
    var o = e.target.closest && e.target.closest('[data-d29open]'); if(o){ closeOv(hub); hub = null; if(window.d23Open) window.d23Open(o.getAttribute('data-d29open')); }
  }); }
  window.d29OpenTools = openHub; window.d29OpenTool = openTool;

  document.addEventListener('click', function(e){
    var t = e.target; if(!t.closest) return;
    var b = t.closest('[data-d29hub]'); if(b){ e.preventDefault(); e.stopPropagation(); var cc = document.getElementById('d27CC'); if(cc) cc.remove(); openHub(); return; }
    var q = t.closest('[data-d29qa]');
    if(q){ e.preventDefault(); e.stopPropagation(); var id = q.getAttribute('data-id'), k = q.getAttribute('data-d29qa');
      if(k==='rs'){ rsId = id; rsPick = null; openTool('resched'); }
      else { var cur = getConf()[id] || '', ix = (['', 'invited','confirmed','noreply'].indexOf(cur)+1)%4; setConf(id, ['', 'invited','confirmed','noreply'][ix]); inject(); }
    }
  }, true);

  /* ---------- buttons in header box + command center ---------- */
  function mountBtn(){
    var box = document.getElementById('d27Box'); if(box && !box.querySelector('[data-d29hub]')){ var b = document.createElement('button'); b.type = 'button'; b.className = 'd27-cmd d29-hb'; b.setAttribute('data-d29hub',''); b.textContent = '🧰 Tools'; box.insertBefore(b, box.firstChild.nextSibling); }
    var act = document.querySelector('#d27CC .d27-actions'); if(act && !act.querySelector('[data-d29hub]')){ var c = document.createElement('button'); c.type = 'button'; c.className = 'd27-btn ghost'; c.setAttribute('data-d29hub',''); c.textContent = '🧰 More tools'; act.appendChild(c); }
  }
  var rt = 0;
  function install(){
    if(typeof window.render!=='function' || !window.__d17vw){ return setTimeout(install,250); }
    var o = window.render;
    window.render = function(){ var r = o.apply(this, arguments); clearTimeout(rt); rt = setTimeout(function(){ try{ mountBtn(); inject(); if(!rulesLoaded && typeof state!=='undefined' && !state.needsLogin){ rulesLoaded = true; loadRules(); } }catch(e){ console.warn('d29', e); } }, 120); return r; };
    try{ new MutationObserver(function(){ mountBtn(); }).observe(document.body, {childList:true}); }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== d30: round floating menu (iOS AssistiveTouch style) — drag it anywhere, tap to fan out the shortcuts ===== */
;(function(){
  if(window.__d30) return; window.__d30 = true;
  var LS = { g:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }, s:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
  var S = 56, R = 92, orb = null, wrap = null, open = false, pos = null;
  var snd = function(){ var b = document.getElementById('d26Snd'); return !!(b && /🔊/.test(b.textContent)); };
  var ITEMS = [
    ['⌘','Command', function(){ if(window.d27OpenCommand) window.d27OpenCommand(); }],
    ['🧰','Tools', function(){ if(window.d29OpenTools) window.d29OpenTools(); }],
    ['🔎','Search', function(){ if(window.d12Open) window.d12Open(); }],
    ['＋','Quick add', function(){ if(window.d29OpenTool) window.d29OpenTool('quick'); }],
    ['🔔','Alerts', function(){ var b = document.querySelector('.lf-bell'); if(b) b.click(); }],
    ['SND','Sound', function(){ var b = document.getElementById('d26Snd'); if(b) b.click(); }],
    ['⬆','Top', function(){ try{ window.scrollTo({top:0,behavior:'smooth'}); var s = document.getElementById('tableScrollMain'); if(s) s.scrollTo({top:0,behavior:'smooth'}); }catch(e){} }]
  ];
  function load(){ try{ pos = JSON.parse(LS.g('cd.orb','null')); }catch(e){ pos = null; } if(!pos || typeof pos.y!=='number') pos = {side:'left', y:.55}; }
  function place(){
    if(!orb) return; var W = innerWidth, H = innerHeight, y = Math.min(Math.max(pos.y*H, 70), H-S-90);
    orb.style.top = y+'px'; orb.style.left = (pos.side==='right' ? W-S-14 : 14)+'px';
  }
  function center(){ var r = orb.getBoundingClientRect(); return {x:r.left+S/2, y:r.top+S/2}; }
  function fan(){
    var c = center(), W = innerWidth, H = innerHeight, n = ITEMS.length;
    var toC = Math.atan2(H/2-c.y, W/2-c.x);
    var edge = Math.min(c.x, W-c.x, c.y, H-c.y), span = edge < 150 ? Math.PI*0.92 : Math.PI*1.7, RR = edge < 150 ? 118 : R;
    var pts = function(base){ var o = []; for(var i=0;i<n;i++){ var a = base - span/2 + (n===1?0.5:i/(n-1))*span; o.push([Math.cos(a)*RR, Math.sin(a)*RR]); } return o; };
    var fits = function(P){ return P.every(function(p){ var x = c.x+p[0], y = c.y+p[1]; return x>=30 && x<=W-30 && y>=30 && y<=H-30; }); };
    var best = null;
    for(var k=0;k<=36 && !best;k++){ var off = Math.ceil(k/2)*(Math.PI/18)*(k%2?1:-1); var P = pts(toC+off); if(fits(P)) best = P; }
    if(!best) best = pts(toC).map(function(p){ return [Math.min(Math.max(c.x+p[0],34),W-34)-c.x, Math.min(Math.max(c.y+p[1],34),H-34)-c.y]; });
    wrap.querySelectorAll('.d30-i').forEach(function(el,i){ el.style.setProperty('--x', best[i][0]+'px'); el.style.setProperty('--y', best[i][1]+'px'); el.style.transitionDelay = (i*22)+'ms'; });
    wrap.style.left = c.x+'px'; wrap.style.top = c.y+'px';
  }
  function setOpen(v){
    open = v; if(!wrap) return;
    if(v){ var b = wrap.querySelector('[data-d30i="5"] .ic'); if(b) b.textContent = snd()?'🔊':'🔇'; fan(); }
    wrap.classList.toggle('on', v); orb.classList.toggle('on', v);
    try{ if(window.d26fx) window.d26fx.buzz(8); }catch(e){}
  }
  function build(){
    if(document.getElementById('d30Orb')) return;
    load();
    orb = document.createElement('button'); orb.id = 'd30Orb'; orb.type = 'button'; orb.setAttribute('aria-label','Shortcuts menu'); orb.innerHTML = '<i></i>';
    wrap = document.createElement('div'); wrap.id = 'd30Wrap';
    wrap.innerHTML = '<div class="d30-bg"></div>' + ITEMS.map(function(it,i){ return '<button type="button" class="d30-i" data-d30i="'+i+'"><span class="ic">'+(it[0]==='SND'?'🔊':it[0])+'</span><small>'+it[1]+'</small></button>'; }).join('');
    document.body.appendChild(wrap); document.body.appendChild(orb); place();
    wrap.addEventListener('click', function(e){
      var b = e.target.closest('[data-d30i]');
      if(!b){ setOpen(false); return; }
      var it = ITEMS[+b.getAttribute('data-d30i')]; setOpen(false); setTimeout(function(){ try{ it[2](); }catch(x){} }, 120);
    });
    var sx, sy, ox, oy, moved = false, drag = false;
    orb.addEventListener('pointerdown', function(e){ drag = true; moved = false; sx = e.clientX; sy = e.clientY; var r = orb.getBoundingClientRect(); ox = r.left; oy = r.top; try{ orb.setPointerCapture(e.pointerId); }catch(x){} orb.style.transition = 'none'; });
    orb.addEventListener('pointermove', function(e){
      if(!drag) return; var dx = e.clientX-sx, dy = e.clientY-sy;
      if(!moved && Math.hypot(dx,dy) < 6) return; moved = true; if(open) setOpen(false);
      orb.style.left = Math.min(Math.max(ox+dx, 4), innerWidth-S-4)+'px'; orb.style.top = Math.min(Math.max(oy+dy, 60), innerHeight-S-70)+'px';
    });
    function end(e){
      if(!drag) return; drag = false; orb.style.transition = '';
      if(moved){ var r = orb.getBoundingClientRect(); pos = {side: (r.left+S/2) > innerWidth/2 ? 'right' : 'left', y: r.top/innerHeight}; LS.s('cd.orb', JSON.stringify(pos)); place(); }
      else if(e.type==='pointerup'){ setOpen(!open); }
    }
    orb.addEventListener('pointerup', end); orb.addEventListener('pointercancel', end);
    orb.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); setOpen(!open); } });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape' && open) setOpen(false); });
    addEventListener('resize', function(){ place(); if(open) fan(); });
  }
  function install(){ if(typeof window.render!=='function' || !window.__d17vw){ return setTimeout(install,300); } build(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== d31: hover a client name → every earlier call at that client (who, role, round, owner, outcome) ===== */
;(function(){
  if(window.__d31) return; window.__d31 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var pop = null, timer = null, curEl = null, seq = 0;
  var canHover = function(){ try{ return window.matchMedia('(hover:hover) and (pointer:fine)').matches; }catch(e){ return true; } };
  function hide(){ clearTimeout(timer); timer = null; curEl = null; seq++; if(pop){ pop.remove(); pop = null; } }
  function short(d){ try{ return new Date(d+'T00:00:00').toLocaleDateString(undefined,{day:'numeric',month:'short',year:'2-digit'}); }catch(e){ return d||''; } }
  var ST = {rescheduled:['🔁','Rescheduled'], cancelled:['✕','Cancelled'], not_responded:['☎','No response'], no_invite:['📨','No invite']};
  function same(a, b){ try{ return normalizeCompanyKey(a)===normalizeCompanyKey(b) || fuzzyCompanyKeyMatch(a, b); }catch(e){ return false; } }
  function collect(row, name){
    var hist = null; try{ hist = (typeof _allRowsAcrossDatesCache!=='undefined') ? _allRowsAcrossDatesCache : null; }catch(e){}
    var out = [];
    if(hist){
      hist.forEach(function(r){ if(!r || !r.candidate || r.woi || !r.company || !same(r.company, name)) return; try{ if(row && countryConflict(r.country, row.country)) return; }catch(e){} out.push({date:r._date||'', time:r.time||'', candidate:r.candidate, role:r.role||'', round:r.round||'', owner:(r.drivingPerson||r.assignee||''), status:r.status||''}); });
    } else if(state.clientHistory){
      state.clientHistory.forEach(function(en){ if(!same(en.company, name)) return; en.occurrences.forEach(function(o){ try{ if(row && countryConflict(o.country, row.country)) return; }catch(e){} out.push({date:o.date||'', time:o.time||'', candidate:o.candidate||'', role:o.role||'', round:o.round||'', owner:o.assignee||'', status:''}); }); });
    }
    /* today's list is always current */
    (state.rows||[]).forEach(function(r){ if(!r.candidate || r.woi || !r.company || !same(r.company, name)) return; if(out.some(function(o){ return o.date===state.date && o.candidate===r.candidate && o.time===(r.time||'') && o.round===(r.round||''); })) return; out.push({date:state.date, time:r.time||'', candidate:r.candidate, role:r.role||'', round:r.round||'', owner:(r.drivingPerson||r.assignee||''), status:r.status||''}); });
    var seen = {}; out = out.filter(function(o){ var k = [o.date,o.time,o.candidate.toLowerCase(),o.round].join('|'); if(seen[k]) return false; seen[k] = 1; return true; });
    out.sort(function(a,b){ return b.date.localeCompare(a.date) || String(b.time).localeCompare(String(a.time)); });
    return out;
  }
  function build(name, el, loading){
    var tr = el.closest && el.closest('tr'), id = tr ? tr.getAttribute('data-id') : '', row = null;
    try{ row = (state.rows||[]).find(function(r){ return r.id===id; }); }catch(e){}
    var L = collect(row, name), people = {}, bad = 0;
    L.forEach(function(o){ people[o.candidate.trim().toLowerCase()] = 1; if(o.status) bad++; });
    var h = '<div style="font-weight:700;font-size:13px">'+esc(name)+'</div>';
    var rule = ''; try{ rule = window.d29RuleFor ? window.d29RuleFor(name) : ''; }catch(e){}
    if(rule) h += '<div style="margin:6px 0;padding:7px 10px;border-radius:9px;border:1px solid rgba(245,185,66,.6);background:rgba(245,185,66,.13);font-size:12px;line-height:1.4"><b>📌 Client rule</b><br>'+esc(rule)+'</div>';
    if(!L.length) return h + '<div style="opacity:.75;font-size:12px;margin-top:4px">'+(loading?'Loading earlier calls…':'No calls on file for this client.')+'</div>';
    h += '<div style="opacity:.75;font-size:11.5px;margin:3px 0 6px">'+L.length+' call'+(L.length===1?'':'s')+' · '+Object.keys(people).length+' candidate'+(Object.keys(people).length===1?'':'s')+(bad?' · '+bad+' not completed':'')+' · newest first'+(loading?' · loading…':'')+'</div>';
    h += '<div style="max-height:min(60vh,420px);overflow:auto;padding-right:4px"><div style="display:grid;grid-template-columns:auto minmax(0,1.2fr) minmax(0,1.4fr) auto auto;gap:3px 12px;font-size:12.5px;align-items:baseline">';
    var me = row ? (row.candidate||'').trim().toLowerCase() : '';
    L.forEach(function(o){
      var mine = me && o.candidate.trim().toLowerCase()===me, bg = mine ? 'background:rgba(80,200,160,.14);border-radius:6px;' : '';
      var st = o.status && ST[o.status] ? ' <span style="color:var(--amber,#e5b045)" title="'+esc(ST[o.status][1])+'">'+ST[o.status][0]+'</span>' : '';
      h += '<span style="white-space:nowrap;opacity:.8;'+bg+'">'+esc(short(o.date))+(o.date===state.date?' · today':'')+'</span>'
        + '<span style="min-width:0;overflow-wrap:anywhere;'+bg+'"><b>'+esc(o.candidate)+'</b>'+st+'</span>'
        + '<span style="min-width:0;overflow-wrap:anywhere;opacity:.8;'+bg+'">'+esc(o.role||'—')+'</span>'
        + '<span style="white-space:nowrap;opacity:.85;'+bg+'">'+esc(o.round)+'</span>'
        + '<span style="white-space:nowrap;'+bg+'">'+(o.owner?esc(o.owner):'<span style="opacity:.5">—</span>')+'</span>';
    });
    return h + '</div></div>';
  }
  window.d31Collect = collect;
  window.d31Html = function(name, rowId, loading){ return build(name, {closest:function(){ return {getAttribute:function(){ return rowId; }}; }}, !!loading); };
  function show(el){
    var name = (el.value||'').trim(); if(name.length<2) return;
    hide(); curEl = el; var my = ++seq;
    pop = document.createElement('div'); pop.id = 'd31Cl';
    pop.style.cssText = 'position:fixed;z-index:100010;max-width:min(680px,94vw);min-width:320px;padding:12px 14px;border-radius:12px;background:var(--surface,#1c2230);color:var(--text,#fff);border:1px solid var(--border,#333);box-shadow:0 14px 40px -10px rgba(0,0,0,.6);pointer-events:auto;font-family:inherit';
    var cached = false; try{ cached = !!_allRowsAcrossDatesCache; }catch(e){}
    pop.innerHTML = build(name, el, !cached);
    document.body.appendChild(pop); place(el);
    if(!cached && typeof fetchAllRowsAcrossDates==='function'){
      fetchAllRowsAcrossDates().then(function(){ if(my===seq && pop && curEl===el){ pop.innerHTML = build(name, el, false); place(el); } }).catch(function(){});
    }
  }
  function place(el){
    var r = el.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
    pop.style.left = Math.max(8, Math.min(r.left, innerWidth-pw-8))+'px';
    var top = r.bottom+6; if(top+ph > innerHeight-8) top = Math.max(8, r.top-ph-6); pop.style.top = top+'px';
  }
  var SEL = 'input.cell-input[data-field="company"]';
  document.addEventListener('mouseover', function(e){
    if(!canHover()) return; var el = e.target && e.target.closest ? e.target.closest(SEL) : null; if(!el) return;
    if(el===curEl && pop) return; clearTimeout(timer); timer = setTimeout(function(){ try{ show(el); }catch(x){} }, 350);
  }, true);
  document.addEventListener('mouseout', function(e){
    var el = e.target && e.target.closest ? e.target.closest(SEL) : null;
    if(el){ var to = e.relatedTarget; if(to && (el.contains(to) || (pop && pop.contains(to)))) return; clearTimeout(timer); setTimeout(function(){ if(pop && !pop.matches(':hover') && document.activeElement!==el && !el.matches(':hover')) hide(); }, 160); }
    else if(pop && e.target.closest && e.target.closest('#d31Cl')){ var t2 = e.relatedTarget; if(!t2 || !(pop.contains(t2) || (curEl && curEl.contains(t2)))) setTimeout(function(){ if(pop && !pop.matches(':hover') && curEl && !curEl.matches(':hover')) hide(); }, 160); }
  }, true);
  ['focusin','keydown','mousedown','touchstart','scroll'].forEach(function(ev){ document.addEventListener(ev, function(e){ if(pop && e.target && e.target.nodeType===1 && pop.contains(e.target)) return; hide(); }, true); });
  window.addEventListener('blur', hide);
})();

/* ===== d32: V2.4 hover/long-press info popups — handler day, time zones, role history, conflict preview, status reason, round journey, duration check, country clock, team, stat cards + pinning ===== */
;(function(){
  if(window.__d32) return; window.__d32 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var bd = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var nowBd = function(){ var d=new Date(); return (d.getHours()*60+d.getMinutes()+720)%1440; };
  var pad = function(n){ return (n<10?'0':'')+n; };
  var fmtT = function(b){ var c=(b+720)%1440, h=Math.floor(c/60), m=c%60; return (h%12||12)+':'+pad(m)+' '+(h>=12?'PM':'AM'); };
  var dur = function(r){ var d = null; try{ d = parseDurationMinutes(r.duration); }catch(e){} return d>0 ? d : 30; };
  var nk = function(c){ try{ return normalizeNameKey(c||''); }catch(e){ return String(c||'').toLowerCase().replace(/[^a-z]/g,''); } };
  var ck = function(c){ try{ return normalizeCompanyKey(c||''); }catch(e){ return String(c||'').toLowerCase().replace(/[^a-z0-9]/g,''); } };
  var sameCo = function(a,b){ try{ return ck(a)===ck(b) || fuzzyCompanyKeyMatch(a,b); }catch(e){ return ck(a)===ck(b); } };
  var rows = function(){ return state.rows||[]; };
  var rowById = function(id){ return rows().filter(function(r){ return String(r.id)===String(id); })[0] || null; };
  var ownOf = function(r){ try{ return window.cdOwnerOf ? window.cdOwnerOf(r) : null; }catch(e){ return null; } };
  var ownerName = function(r){ var o = ownOf(r); return o && o.name ? o.name : (r.assignee||''); };
  var isTeam = function(n){ try{ return getTeamNames().has(n); }catch(e){ return false; } };
  var hist = function(){ try{ return (typeof _allRowsAcrossDatesCache!=='undefined') ? _allRowsAcrossDatesCache : null; }catch(e){ return null; } };
  var short = function(d){ try{ return new Date(d+'T00:00:00').toLocaleDateString(undefined,{day:'numeric',month:'short',year:'2-digit'}); }catch(e){ return d||''; } };
  var ST = {rescheduled:['🔁','Rescheduled'], cancelled:['✕','Cancelled'], not_responded:['☎','No response'], no_invite:['📨','No invite']};
  var phone = function(){ return (window.__d17vw || window.innerWidth) < 760; };
  var cap = function(h, sub){ return '<div style="font-weight:700;font-size:13px">'+h+'</div>'+(sub?'<div style="opacity:.7;font-size:11.5px;margin:2px 0 6px">'+sub+'</div>':''); };
  var line = function(a, b, c, bg){ return '<div style="display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:3px 12px;font-size:12.5px;align-items:baseline;padding:2px 4px;'+(bg?'background:rgba(80,200,160,.14);border-radius:6px;':'')+'"><span style="white-space:nowrap;opacity:.85">'+a+'</span><span style="min-width:0;overflow-wrap:anywhere">'+b+'</span><span style="white-space:nowrap;opacity:.85">'+(c||'')+'</span></div>'; };
  var rng = function(r){ return bd(r.time)===9999 ? esc(r.time||'?') : esc(r.time)+'–'+fmtT(bd(r.time)+dur(r)); };
  var scroll = function(h){ return '<div style="max-height:min(52vh,360px);overflow:auto;padding-right:4px">'+h+'</div>'; };
  var note = function(t, warn){ return '<div style="margin:6px 0 2px;padding:7px 10px;border-radius:9px;font-size:12px;line-height:1.45;'+(warn?'border:1px solid rgba(245,185,66,.6);background:rgba(245,185,66,.13)':'border:1px solid var(--border,#333);background:rgba(255,255,255,.04)')+'">'+t+'</div>'; };

  /* ---------- people ---------- */
  function leaveHas(name){ try{ var L = JSON.parse(localStorage.getItem('cd.leave')||'[]'); return L.some(function(l){ return l.name===name && l.from<=state.date && l.to>=state.date; }); }catch(e){ return false; } }
  function absent(name){ var p = (state.roster||[]).filter(function(x){ return x.name===name; })[0]; return !!(p && (state.absentIds||[]).indexOf(p.id)>=0) || leaveHas(name); }
  function liveRows(){ return rows().filter(function(r){ return !r.woi && !r.status && r.candidate; }); }
  function callsOf(name){ return liveRows().filter(function(r){ return ownerName(r)===name; }).sort(function(a,b){ return bd(a.time)-bd(b.time); }); }
  function freeAfter(calls, from, d){
    for(var s = Math.ceil(from/30)*30; s < 1440; s += 30){ if(!calls.some(function(x){ var b = bd(x.time); return b!==9999 && s < b+dur(x) && b < s+d; })) return s; }
    return null;
  }
  function handlerHtml(name){
    if(!name) return cap('Not assigned yet','Pick someone to see their day.');
    if(isTeam(name)) return teamHtml(name);
    var L = callsOf(name), n = nowBd(), left = L.filter(function(r){ return bd(r.time)+dur(r)>=n; }).length;
    var h = cap(esc(name)+(absent(name)?' · 🏖 off today':''), L.length+' call'+(L.length===1?'':'s')+' today · '+left+' left');
    var heads = []; try{ heads = (window.d29Heads?window.d29Heads():[]).filter(function(x){ return x.who===name; }); }catch(e){}
    if(heads.length) h += note('🔥 '+esc(heads[0].s), true);
    h += L.length ? scroll(L.map(function(r){ var b = bd(r.time), now = n>=b && n<b+dur(r); return line(rng(r), '<b>'+esc(r.candidate)+'</b> · '+esc(r.company||''), esc(r.round||''), now); }).join('')) : '<div style="opacity:.75;font-size:12px">No live calls.</div>';
    var nf = freeAfter(L, n, 45); h += '<div style="margin-top:6px;font-size:12px"><span style="opacity:.7">Next free (45 min)</span> <b>'+(nf===null?'none today':fmtT(nf))+'</b></div>';
    return h;
  }
  function teamHtml(name){
    var ppl = (state.roster||[]).filter(function(p){ return p.team===name; }), n = nowBd();
    var tl = liveRows().filter(function(r){ return (r.assignee||'')===name && !ownOf(r); }).length;
    var h = cap(esc(name), ppl.length+' member'+(ppl.length===1?'':'s')+(tl?' · '+tl+' call'+(tl===1?'':'s')+' still without a person':''));
    h += ppl.length ? scroll(ppl.map(function(p){
      var L = callsOf(p.name), busy = L.some(function(r){ var b = bd(r.time); return n>=b && n<b+dur(r); }), off = absent(p.name);
      return line('<b>'+esc(p.name)+'</b>', off ? '🏖 off today' : (busy ? '📞 on a call now' : '🟢 free now'), L.length+' call'+(L.length===1?'':'s'));
    }).join('')) : '<div style="opacity:.75;font-size:12px">No members on the roster.</div>';
    return h;
  }

  /* ---------- time zones ---------- */
  var ZONES = [['US Eastern','America/New_York'],['US Central','America/Chicago'],['US Pacific','America/Los_Angeles'],['London','Europe/London'],['Ireland','Europe/Dublin'],['Germany','Europe/Berlin'],['Canada (Toronto)','America/Toronto'],['India','Asia/Kolkata']];
  var CZ = {USA:['US Eastern','America/New_York'], UK:['London','Europe/London'], Ireland:['Ireland','Europe/Dublin'], Canada:['Canada (Toronto)','America/Toronto'], Germany:['Germany','Europe/Berlin']};
  function utcOf(row){
    var m = timeToMinutes(row.time); if(m===9999) return null; var p = state.date.split('-').map(Number);
    return Date.UTC(p[0], p[1]-1, p[2] + (bd(row.time)>=720 ? 1 : 0)) + (m-330)*60000;
  }
  function inZone(ms, tz){
    try{
      var f = new Intl.DateTimeFormat('en-GB',{timeZone:tz, weekday:'short', day:'numeric', month:'short', hour:'numeric', minute:'2-digit', hour12:true, timeZoneName:'short'}), P = {};
      f.formatToParts(new Date(ms)).forEach(function(x){ P[x.type] = x.value; });
      var g = new Intl.DateTimeFormat('en-US',{timeZone:tz, year:'numeric', month:'numeric', day:'numeric', hour:'numeric', hour12:false, weekday:'short'}), Q = {};
      g.formatToParts(new Date(ms)).forEach(function(x){ Q[x.type] = x.value; });
      return {txt:P.hour+':'+P.minute+' '+(P.dayPeriod||'').toUpperCase(), day:P.weekday+' '+P.day+' '+P.month, abbr:P.timeZoneName, hour:(+Q.hour)%24, y:+Q.year, m:+Q.month, d:+Q.day, dow:Q.weekday};
    }catch(e){ return null; }
  }
  function timeHtml(row){
    var ms = utcOf(row); if(!ms) return cap('No time set','Add a time to see it in other zones.');
    var b = bd(row.time), n = nowBd(), mine = CZ[row.country||'USA'] ? CZ[row.country||'USA'][1] : '';
    var sub = row.date===undefined && state.date===(typeof todayDateString==='function'?todayDateString():'') ? (b>=n ? 'starts in '+(b-n<60? (b-n)+' min' : Math.floor((b-n)/60)+'h '+((b-n)%60)+'m') : 'started '+(n-b)+' min ago') : state.date;
    var h = cap('🕒 '+esc(row.time)+' IST', sub);
    h += ZONES.map(function(z){ var v = inZone(ms, z[1]); if(!v) return ''; return line(esc(z[0]), '<b>'+esc(v.txt)+'</b>', esc(v.day), z[1]===mine); }).join('');
    var near = liveRows().filter(function(r){ return r!==row && Math.abs(bd(r.time)-b)<=30; });
    h += '<div style="margin-top:6px;font-size:12px"><span style="opacity:.7">Around this time</span> <b>'+near.length+'</b> other call'+(near.length===1?'':'s')+(near.length? ' · '+esc(near.slice(0,4).map(function(r){ return ownerName(r)||'unassigned'; }).join(', ')):'')+'</div>';
    return h;
  }

  /* ---------- country: local clock, business hours, holidays ---------- */
  function nth(y, m, dow, k){ var d = new Date(Date.UTC(y,m-1,1)), off = (dow - d.getUTCDay() + 7)%7; return 1 + off + 7*(k-1); }
  function lastDow(y, m, dow){ var last = new Date(Date.UTC(y,m,0)).getUTCDate(), d = new Date(Date.UTC(y,m-1,last)); return last - ((d.getUTCDay()-dow+7)%7); }
  function holiday(c, y, m, d){
    var H = [];
    if(m===1 && d===1) H.push('New Year’s Day');
    if(m===12 && d===25) H.push('Christmas Day');
    if(c==='USA'){ if(m===7&&d===4) H.push('Independence Day'); if(m===6&&d===19) H.push('Juneteenth'); if(m===11&&d===11) H.push('Veterans Day'); if(m===11&&d===nth(y,11,4,4)) H.push('Thanksgiving'); if(m===9&&d===nth(y,9,1,1)) H.push('Labor Day'); if(m===5&&d===lastDow(y,5,1)) H.push('Memorial Day'); if(m===1&&d===nth(y,1,1,3)) H.push('MLK Day'); if(m===2&&d===nth(y,2,1,3)) H.push('Presidents’ Day'); if(m===10&&d===nth(y,10,1,2)) H.push('Columbus Day'); }
    if(c==='Canada'){ if(m===7&&d===1) H.push('Canada Day'); if(m===9&&d===nth(y,9,1,1)) H.push('Labour Day'); if(m===10&&d===nth(y,10,1,2)) H.push('Thanksgiving (CA)'); if(m===12&&d===26) H.push('Boxing Day'); }
    if(c==='UK'||c==='Ireland'){ if(m===12&&d===26) H.push('Boxing Day / St Stephen’s Day'); if(m===5&&d===nth(y,5,1,1)) H.push('Early May bank holiday'); if(m===5&&d===lastDow(y,5,1)&&c==='UK') H.push('Spring bank holiday'); if(m===8&&d===lastDow(y,8,1)&&c==='UK') H.push('Summer bank holiday'); if(c==='Ireland'&&m===3&&d===17) H.push('St Patrick’s Day'); }
    if(c==='Germany'){ if(m===5&&d===1) H.push('Labour Day'); if(m===10&&d===3) H.push('German Unity Day'); if(m===12&&d===26) H.push('2nd Christmas Day'); }
    return H.join(', ');
  }
  function countryHtml(row){
    var c = row.country||'USA', z = CZ[c]; if(!z) return cap(esc(c), 'No clock for this value.');
    var ms = utcOf(row); if(!ms) return cap(esc(c), 'Add a time to check business hours.');
    var v = inZone(ms, z[1]); if(!v) return cap(esc(c));
    var out = v.hour < 8 || v.hour >= 19, wk = (v.dow==='Sat'||v.dow==='Sun'), hol = holiday(c, v.y, v.m, v.d);
    var h = cap(esc(c)+' · '+esc(z[0]), 'Call is at '+esc(v.txt)+' local · '+esc(v.day));
    if(hol) h += note('🎌 Public holiday there: '+esc(hol), true);
    if(wk) h += note('📅 It is a weekend there.', true);
    h += out ? note('🌙 Outside normal business hours (8 AM–7 PM local).', true) : note('✅ Within business hours (8 AM–7 PM local).');
    h += '<div style="opacity:.55;font-size:11px;margin-top:4px">Major fixed public holidays only — Easter and regional days are not included.</div>';
    return h;
  }

  /* ---------- history-based ---------- */
  function past(){ var H = hist(); return H ? H.filter(function(r){ return r && r.candidate && !r.woi; }) : null; }
  function isThis(r, row){ return r._date===state.date && r.candidate===row.candidate && (r.time||'')===(row.time||'') && (r.round||'')===(row.round||''); }
  function roleHtml(row, H){
    var role = (row.role||'').trim(); if(!role) return cap('No role on this call', 'Add a role to compare with earlier calls.');
    if(!H) return cap(esc(role), 'Loading history…');
    var al = function(a,b){ try{ return rolesAlike(a,b); }catch(e){ return (a||'').toLowerCase()===(b||'').toLowerCase(); } };
    var M = H.filter(function(r){ return !isThis(r,row) && al(r.role, role); });
    var here = M.filter(function(r){ return sameCo(r.company, row.company); }).sort(function(a,b){ return (b._date||'').localeCompare(a._date||''); });
    var else_ = {}; M.filter(function(r){ return !sameCo(r.company, row.company); }).forEach(function(r){ var k = ck(r.company); (else_[k] = else_[k] || {n:0, name:r.company, last:''}).n++; });
    var h = cap(esc(role), here.length+' earlier at '+esc(row.company||'this client')+' · '+Object.keys(else_).length+' other client'+(Object.keys(else_).length===1?'':'s'));
    var own_ = {}; here.forEach(function(r){ var o = (r.drivingPerson||r.assignee||'').trim(); if(o && !isTeam(o)) own_[o] = (own_[o]||0)+1; });
    var top = Object.keys(own_).sort(function(a,b){ return own_[b]-own_[a]; })[0];
    if(top) h += note('🎯 Most handled here by <b>'+esc(top)+'</b> ('+own_[top]+')');
    h += here.length ? scroll(here.slice(0,15).map(function(r){ var st = ST[r.status]; return line(esc(short(r._date)), '<b>'+esc(r.candidate)+'</b>'+(st?' '+st[0]:''), esc((r.drivingPerson||r.assignee||'—'))); }).join('')) : '<div style="opacity:.75;font-size:12px">Nobody else has had this role at this client yet — may be a new opening.</div>';
    var eo = Object.keys(else_).map(function(k){ return else_[k]; }).sort(function(a,b){ return b.n-a.n; }).slice(0,5);
    if(eo.length) h += '<div style="margin-top:6px;font-size:12px"><span style="opacity:.7">Same role elsewhere</span> '+eo.map(function(o){ return esc(o.name)+' ×'+o.n; }).join(' · ')+'</div>';
    return h;
  }
  function roundHtml(row, H){
    if(!H) return cap(esc(row.round||'Round'), 'Loading history…');
    var J = H.filter(function(r){ return nk(r.candidate)===nk(row.candidate) && sameCo(r.company, row.company); }).sort(function(a,b){ return (a._date||'').localeCompare(b._date||'') || String(a.time).localeCompare(String(b.time)); });
    var h = cap(esc(row.candidate)+' at '+esc(row.company||'this client'), J.length+' call'+(J.length===1?'':'s')+' in total');
    if(J.length<=1) return h + '<div style="opacity:.75;font-size:12px">First call at this client.</div>';
    h += scroll(J.map(function(r){ var st = ST[r.status]; return line(esc(short(r._date)), '<b>'+esc(r.round||'—')+'</b>'+(st?' '+st[0]+' '+st[1]:''), esc(r.drivingPerson||r.assignee||'—'), isThis(r,row)); }).join(''));
    var dead = J.filter(function(r){ return r.status; }).length; if(dead) h += note('⚠ '+dead+' of these did not go ahead as planned.', true);
    return h;
  }
  function median(a){ a = a.slice().sort(function(x,y){ return x-y; }); return a.length ? a[Math.floor(a.length/2)] : null; }
  function durHtml(row, H){
    var me = null; try{ me = parseDurationMinutes(row.duration); }catch(e){}
    var h = cap('⏱ '+(row.duration?esc(row.duration):'No duration'), me ? me+' minutes' : '');
    if(!H) return h + '<div style="opacity:.75;font-size:12px">Loading history…</div>';
    var adv = false; try{ adv = isAdvancedRound(row.round); }catch(e){}
    var P = H.filter(function(r){ var d = null; try{ d = parseDurationMinutes(r.duration); }catch(e){} var a = false; try{ a = isAdvancedRound(r.round); }catch(e){} return d && a===adv && !isThis(r,row); });
    var here = P.filter(function(r){ return sameCo(r.company, row.company); }).map(function(r){ return parseDurationMinutes(r.duration); });
    var all = P.map(function(r){ return parseDurationMinutes(r.duration); });
    var mh = median(here), ma = median(all);
    h += '<div style="font-size:12.5px;line-height:1.7">'+(mh?'At '+esc(row.company||'this client')+': typically <b>'+mh+' min</b> <span style="opacity:.7">('+here.length+' calls)</span><br>':'')+(ma?'All '+(adv?'2nd round+':'1st round')+' calls: typically <b>'+ma+' min</b> <span style="opacity:.7">('+all.length+' calls)</span>':'')+'</div>';
    var ref = mh || ma;
    if(me && ref){ if(me >= ref*1.5 || me >= ref+30) h += note('⚠ Much longer than usual — double-check the duration and the handler’s next call.', true); else if(me <= ref*0.5) h += note('Shorter than usual.'); else h += note('✅ In line with the usual length.'); }
    else if(!me) h += note('No duration on this call — conflict checks assume 30 min.', true);
    return h;
  }
  function statusHtml(row){
    var st = ST[row.status]; if(!st) return cap('No status');
    var F = (row.statusFields||[]).filter(function(f){ return (f.value||'').trim(); });
    var h = cap(st[0]+' '+esc(st[1]), esc(row.candidate)+' · '+esc(row.time||''));
    h += F.length ? F.map(function(f){ return line('<span style="opacity:.7">'+esc(f.label)+'</span>', esc(f.value), ''); }).join('') : '<div style="opacity:.75;font-size:12px">No reason was entered.</div>';
    var other = rows().filter(function(r){ return r!==row && !r.woi && nk(r.candidate)===nk(row.candidate); });
    if(other.length) h += '<div style="margin-top:6px;font-size:12px"><span style="opacity:.7">Same candidate today</span> '+other.map(function(r){ return esc(r.time||'?')+' '+esc(r.company||'')+(r.status?' ('+esc(r.status.replace('_',' '))+')':''); }).join(' · ')+'</div>';
    return h;
  }
  function conflictHtml(row){
    var P = []; try{ P = computeConflictPairs(rows()).filter(function(p){ return p.a.id===row.id || p.b.id===row.id; }); }catch(e){}
    if(!P.length) return cap('No conflict', 'This call is clear.');
    var h = cap('⚠ Conflict on '+esc(row.candidate), P.length+' clash'+(P.length===1?'':'es'));
    P.forEach(function(p){
      var o = p.a.id===row.id ? p.b : p.a, cand = p.kind==='candidate';
      h += note(cand ? '<b>'+esc(p.assignee)+'</b> is booked on two calls at once.' : '<b>'+esc(p.assignee)+'</b> is double-booked.', true);
      [row, o].forEach(function(r, i){ h += line(rng(r), '<b>'+esc(r.candidate)+'</b> · '+esc(r.company||''), esc(r.duration||''), i===0); });
      if(cand){ var oc = rows().filter(function(x){ return x!==row && !x.woi && !x.status && ownerName(x)===ownerName(row); }), nf = freeAfter(oc, Math.max(nowBd(), bd(o.time)+dur(o)), dur(row)); h += '<div style="margin-top:6px;font-size:12px"><span style="opacity:.7">Move one to</span> <b>'+(nf===null?'—':fmtT(nf))+'</b> <span style="opacity:.7">(next time the owner is free)</span></div>'; }
      else { var free = []; try{ free = findFreePeopleAtTime(row.time, isAdvancedRound(row.round)); }catch(e){} h += '<div style="margin-top:6px;font-size:12px"><span style="opacity:.7">Free at '+esc(row.time)+'</span> '+(free.length? '<b>'+esc(free.slice(0,6).join(', '))+'</b>' : '<b>nobody</b>')+'</div>'; }
    });
    return h;
  }
  function candHtml(row){ return window.d20Html ? window.d20Html(row.candidate, row.id) : ''; }
  function clientHtml(row){
    if(!window.d31Collect) return window.d31Html ? window.d31Html(row.company, row.id, !hist()) : '';
    var name = row.company || '', L = [], people = {}, bad = 0;
    try{ L = window.d31Collect(row, name) || []; }catch(e){}
    L.forEach(function(o){ people[(o.candidate||'').trim().toLowerCase()] = 1; if(o.status) bad++; });
    var h = '<div class="d36-hd"><b>'+esc(name)+'</b><small>Client history</small></div>';
    var rule = ''; try{ rule = window.d29RuleFor ? window.d29RuleFor(name) : ''; }catch(e){}
    if(rule) h += '<div class="d36-rule"><b>📌 Client rule</b><span>'+esc(rule)+'</span></div>';
    if(!L.length) return h + '<div class="d27-empty">'+(!hist() ? 'Loading earlier calls…' : 'No calls on file for this client.')+'</div>';
    var pc = Object.keys(people).length;
    h += '<div class="d36-sum"><span><b>'+L.length+'</b> call'+(L.length===1?'':'s')+'</span><span><b>'+pc+'</b> candidate'+(pc===1?'':'s')+'</span>'+(bad?'<span class="bad"><b>'+bad+'</b> not completed</span>':'')+'</div>';
    var me = (row.candidate||'').trim().toLowerCase();
    h += '<div class="d36-list">'+L.slice(0,60).map(function(o){
      var mine = me && (o.candidate||'').trim().toLowerCase()===me, st = o.status && ST[o.status] ? ST[o.status] : null;
      return '<div class="d36-it'+(mine?' me':'')+'"><div class="d36-l1"><b>'+esc(o.candidate)+'</b>'+(st?'<em>'+st[0]+' '+esc(st[1])+'</em>':'')+'</div>'
        + '<div class="d36-l2">'+esc(short(o.date))+(o.date===state.date?' · today':'')+(o.round?' · '+esc(o.round):'')+(o.role?' · '+esc(o.role):'')+'</div>'
        + '<div class="d36-l3">'+(o.owner?'👤 '+esc(o.owner):'<span style="opacity:.5">no owner</span>')+'</div></div>';
    }).join('')+(L.length>60?'<div class="d27-empty">Showing the latest 60 of '+L.length+'.</div>':'')+'</div>';
    return h;
  }

  /* ---------- stat cards ---------- */
  function statHtml(kind){
    var R = rows(), L = [];
    if(kind==='unassigned'){ L = R.filter(function(r){ return !r.woi && r.candidate && !(r.assignee||'').trim(); }).sort(function(a,b){ return bd(a.time)-bd(b.time); }); return cap('Unassigned', L.length+' call'+(L.length===1?'':'s')) + (L.length? scroll(L.slice(0,25).map(function(r){ return line(esc(r.time||'?'), '<b>'+esc(r.candidate)+'</b> · '+esc(r.company||''), esc(r.round||'')); }).join('')) : '<div style="opacity:.75;font-size:12px">✓ Everything has a team.</div>'); }
    if(kind==='woi'){ L = R.filter(function(r){ return r.woi && r.candidate; }); return cap('Waiting for invite', L.length+' call'+(L.length===1?'':'s')) + (L.length? scroll(L.slice(0,25).map(function(r){ return line('⏳', '<b>'+esc(r.candidate)+'</b> · '+esc(r.company||''), esc(r.assignee||'')); }).join('')) : '<div style="opacity:.75;font-size:12px">None waiting.</div>'); }
    if(kind==='conflict'){ var P = []; try{ P = computeConflictPairs(R); }catch(e){} return cap('Conflicts', P.length+' clash'+(P.length===1?'':'es')) + (P.length? scroll(P.slice(0,15).map(function(p){ return note('<b>'+esc(p.assignee)+'</b>'+(p.kind==='candidate'?' (candidate)':'')+'<br>'+esc(p.a.time||'?')+' '+esc(p.a.candidate)+' ↔ '+esc(p.b.time||'?')+' '+esc(p.b.candidate), true); }).join('')) : '<div style="opacity:.75;font-size:12px">✓ No conflicts.</div>'); }
    var by = {}; R.filter(function(r){ return !r.woi && r.candidate; }).forEach(function(r){ var k = kind==='assigned' ? (ownerName(r)||'') : (r.assignee||'Unassigned'); if(kind==='assigned' && !k) return; by[k] = (by[k]||0)+1; });
    var ks = Object.keys(by).sort(function(a,b){ return by[b]-by[a]; }), st = {}; R.forEach(function(r){ if(r.status) st[r.status] = (st[r.status]||0)+1; });
    var h = cap(kind==='assigned' ? 'Assigned — by owner' : 'Total calls — by team', ks.length+' '+(kind==='assigned'?'people':'groups'));
    h += scroll(ks.map(function(k){ return line(esc(k), '<div style="height:6px;border-radius:3px;background:var(--teal,#2dd4bf);width:'+Math.round(by[k]/by[ks[0]]*100)+'%;opacity:.7"></div>', '<b>'+by[k]+'</b>'); }).join(''));
    if(kind==='all' && Object.keys(st).length) h += '<div style="margin-top:6px;font-size:12px"><span style="opacity:.7">Status</span> '+Object.keys(st).map(function(k){ return esc(ST[k]?ST[k][1]:k)+' '+st[k]; }).join(' · ')+'</div>';
    return h;
  }

  /* ---------- registry ---------- */
  var NEEDS_HIST = {role:1, round:1, dur:1};
  function content(kind, row, el, H){
    switch(kind){
      case 'handler': { var hn = el && el.value !== undefined ? (el.value||'') : (row?ownerName(row):''); if(hn && !isTeam(hn) && window.d40Person) return window.d40Person(hn); return handlerHtml(hn); }
      case 'team': return teamHtml(el.getAttribute('data-team'));
      case 'time': return row ? timeHtml(row) : '';
      case 'country': return row ? countryHtml(row) : '';
      case 'role': return row ? roleHtml(row, H) : '';
      case 'round': return row ? roundHtml(row, H) : '';
      case 'dur': return row ? durHtml(row, H) : '';
      case 'status': return row ? statusHtml(row) : '';
      case 'conflict': return row ? conflictHtml(row) : '';
      case 'cand': return row ? candHtml(row) : '';
      case 'client': return row ? clientHtml(row) : '';
      case 'owner': { var on = (el && el.value) || (row?ownerName(row):''); if(on && !isTeam(on) && window.d40Person) return window.d40Person(on); return row ? handlerHtml(ownerName(row)) : ''; }
      case 'stat': return statHtml(el.getAttribute('data-d32stat'));
    }
    return '';
  }
  var TARGETS = [
    ['select.cell-input[data-field="assignee"]','handler'], ['select.driving-person-select','owner'], ['.team-load-cell[data-team]','team'], ['input.cell-input[data-field="time"]','time'],
    ['select.cell-input[data-field="country"]','country'], ['input.cell-input[data-field="role"]','role'], ['input.cell-input[data-field="round"]','round'],
    ['input.cell-input[data-field="duration"]','dur'], ['td .prior-badge','status'], ['td.time .flag-icon','conflict'], ['.summary .cell','stat']
  ];
  function statKind(el){ if(el.classList.contains('assigned')) return 'assigned'; return el.getAttribute('data-f') || 'all'; }
  function find(e){
    var t = e.target; if(!t || !t.closest) return null;
    for(var i=0;i<TARGETS.length;i++){ var el = t.closest(TARGETS[i][0]); if(el){
      if(TARGETS[i][1]==='stat') el.setAttribute('data-d32stat', statKind(el));
      if(TARGETS[i][1]==='status'){ var trr = el.closest('tr'); var rr = trr && rowById(trr.getAttribute('data-id')); if(!rr || !rr.status) return null; }
      if(TARGETS[i][1]==='conflict' && !el.textContent.trim().match(/⚠/)) return null;
      return {el:el, kind:TARGETS[i][1]}; } }
    return null;
  }
  function rowOfEl(el){ var tr = el.closest && el.closest('tr'); return tr ? rowById(tr.getAttribute('data-id')) : null; }

  /* ---------- desktop popup ---------- */
  var pop = null, timer = null, cur = null, seq = 0;
  var canHover = function(){ try{ return window.matchMedia('(hover:hover) and (pointer:fine)').matches; }catch(e){ return true; } };
  function hide(){ clearTimeout(timer); timer = null; cur = null; seq++; if(pop){ pop.remove(); pop = null; } }
  function place(el){
    var r = el.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
    pop.style.left = Math.max(8, Math.min(r.left, innerWidth-pw-8))+'px';
    var top = r.bottom+6; if(top+ph > innerHeight-8) top = Math.max(8, r.top-ph-6); pop.style.top = top+'px';
  }
  function paintInto(box, hit, row, H){ box.innerHTML = content(hit.kind, row, hit.el, H) || ''; }
  function show(hit){
    hide(); cur = hit.el; var my = ++seq, row = rowOfEl(hit.el);
    pop = document.createElement('div'); pop.id = 'd32Pop';
    pop.style.cssText = 'position:fixed;z-index:100010;max-width:min(560px,94vw);min-width:300px;padding:12px 34px 12px 14px;border-radius:12px;background:var(--surface,#1c2230);color:var(--text,#fff);border:1px solid var(--border,#333);box-shadow:0 14px 40px -10px rgba(0,0,0,.6);pointer-events:auto;font-family:inherit';
    var H = NEEDS_HIST[hit.kind] ? past() : null;
    pop.innerHTML = content(hit.kind, row, hit.el, H) || ''; if(!pop.innerHTML){ pop = null; return; }
    document.body.appendChild(pop); place(hit.el);
    if(NEEDS_HIST[hit.kind] && !H && typeof fetchAllRowsAcrossDates==='function') fetchAllRowsAcrossDates().then(function(){ if(my===seq && pop){ paintInto(pop, hit, row, past()); place(hit.el); } }).catch(function(){});
  }
  document.addEventListener('mouseover', function(e){
    if(!canHover()) return; var hit = find(e); if(!hit) return;
    if(hit.el===cur && pop) return; clearTimeout(timer); timer = setTimeout(function(){ try{ show(hit); }catch(x){ console.warn('d32', x); } }, 380);
  }, true);
  document.addEventListener('mouseout', function(e){
    var hit = find(e);
    if(hit){ var to = e.relatedTarget; if(to && (hit.el.contains(to) || (pop && pop.contains(to)))) return; clearTimeout(timer); setTimeout(function(){ if(pop && !pop.matches(':hover') && !hit.el.matches(':hover') && document.activeElement!==hit.el) hide(); }, 160); }
    else if(pop && e.target.closest && e.target.closest('#d32Pop')){ var t2 = e.relatedTarget; if(!t2 || !(pop.contains(t2) || (cur && cur.contains(t2)))) setTimeout(function(){ if(pop && !pop.matches(':hover') && cur && !cur.matches(':hover')) hide(); }, 160); }
  }, true);
  ['focusin','keydown','mousedown','touchstart','scroll'].forEach(function(ev){ document.addEventListener(ev, function(e){ if(pop && e.target && e.target.nodeType===1 && pop.contains(e.target)) return; hide(); }, true); });

  /* ---------- pin any popup ---------- */
  var PINNABLE = '#d20Hist, #d31Cl, #d32Pop';
  function pinsBox(){ var b = document.getElementById('d32Pins'); if(!b){ b = document.createElement('div'); b.id = 'd32Pins'; document.body.appendChild(b); } return b; }
  function addPinBtn(){
    document.querySelectorAll(PINNABLE).forEach(function(p){ if(!p.querySelector('[data-d32pin]')){ var b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-d32pin',''); b.title = 'Pin this so it stays open'; b.textContent = '📌'; p.insertBefore(b, p.firstChild); } });
  }
  try{ new MutationObserver(function(){ addPinBtn(); }).observe(document.body, {childList:true}); }catch(e){}
  document.addEventListener('click', function(e){
    var t = e.target; if(!t.closest) return;
    var pb = t.closest('[data-d32pin]');
    if(pb){ e.preventDefault(); e.stopPropagation(); var src = pb.closest(PINNABLE); if(!src) return; var box = pinsBox();
      while(box.children.length>=3) box.removeChild(box.firstChild);
      var c = document.createElement('div'); c.className = 'd32-pin'; var inner = src.cloneNode(true); inner.removeAttribute('id'); inner.removeAttribute('style'); inner.className = 'd32-pin-in';
      var pbtn = inner.querySelector('[data-d32pin]'); if(pbtn) pbtn.remove();
      c.appendChild(inner); var x = document.createElement('button'); x.type = 'button'; x.className = 'd32-pin-x'; x.setAttribute('data-d32unpin',''); x.textContent = '✕'; c.insertBefore(x, c.firstChild); box.appendChild(c); src.remove(); hide(); return; }
    var up = t.closest('[data-d32unpin]'); if(up){ var card = up.closest('.d32-pin'); if(card) card.remove(); }
  }, true);

  /* ---------- phone: long-press a name on a card + info chips in the call sheet ---------- */
  function sheet(html, onReload){
    var old = document.getElementById('d32Sheet'); if(old) old.remove();
    var el = document.createElement('div'); el.id = 'd32Sheet'; el.className = 'd27-ov d32-sheet';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div></div><button type="button" class="d27-x" data-d32x aria-label="Close">✕</button></div><div class="d29-body d32-body"></div></div>';
    el.querySelector('.d32-body').innerHTML = html; document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d32x]'))){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); } });
    return el;
  }
  function openInfo(kind, row){
    if(!row) return; window.__d41ctx = {kind:kind, id:row.id};
    var H = NEEDS_HIST[kind] ? past() : null, el = sheet(content(kind, row, null, H) || '<div style="opacity:.75">Nothing to show.</div>');
    if((NEEDS_HIST[kind] || kind==='client') && !hist() && typeof fetchAllRowsAcrossDates==='function') fetchAllRowsAcrossDates().then(function(){ if(el.isConnected) el.querySelector('.d32-body').innerHTML = content(kind, row, null, past()); }).catch(function(){});
  }
  window.d32OpenInfo = function(kind, id){ openInfo(kind, rowById(id)); };
  var lp = null, lpFired = 0;
  document.addEventListener('touchstart', function(e){
    var t = e.target; if(!t.closest) return; var n = t.closest('.d22-cn, .d22-cs'); if(!n) return;
    try{ var q0 = e.touches[0]; if(icHit(t, q0.clientX)) return; }catch(x){}
    var card = n.closest('[data-d22open]'); if(!card) return; var kind = n.classList.contains('d22-cn') ? 'cand' : 'client', id = card.getAttribute('data-d22open'), x0 = e.touches[0].clientX, y0 = e.touches[0].clientY;
    clearTimeout(lp); lp = setTimeout(function(){ lpFired = Date.now(); try{ if(navigator.vibrate) navigator.vibrate(12); }catch(x){} openInfo(kind, rowById(id)); }, 480);
    var cancel = function(ev){ if(ev.type==='touchmove'){ var q = ev.touches[0]; if(Math.hypot(q.clientX-x0, q.clientY-y0) < 10) return; } clearTimeout(lp); n.removeEventListener('touchmove', cancel); n.removeEventListener('touchend', cancel); n.removeEventListener('touchcancel', cancel); };
    n.addEventListener('touchmove', cancel, {passive:true}); n.addEventListener('touchend', cancel); n.addEventListener('touchcancel', cancel);
  }, {passive:true, capture:true});
  ['click','pointerup','touchend'].forEach(function(ev){ document.addEventListener(ev, function(e){ if(Date.now()-lpFired < 700 && e.target.closest && e.target.closest('.d22-cn, .d22-cs, [data-d22open]')){ e.stopPropagation(); e.preventDefault(); } }, true); });
  document.addEventListener('contextmenu', function(e){ if(e.target.closest && e.target.closest('.d22-cn, .d22-cs')) e.preventDefault(); }, true);

  /* the visible ⓘ at the right end of a name on a phone card — caught on touchend so the card underneath does not open too */
  var IC_SEL = '.d22-cn, .d22-cs, td.m-sum .m-l1, td.m-sum .m-l2', ihit = null;
  function icHit(t, x){
    if(!t || !t.closest || !window.matchMedia('(max-width:759px)').matches) return null;
    var n = t.closest(IC_SEL); if(!n) return null;
    var card = n.closest('[data-d22open]'), tr = n.closest('tr[data-id]'); if(!card && !tr) return null;
    var r = n.getBoundingClientRect(); if(x < r.right - 40) return null;
    if(n.classList.contains('m-l2') && !n.textContent.trim()) return null;
    return { kind: (n.classList.contains('d22-cn') || n.classList.contains('m-l1')) ? 'cand' : 'client', id: card ? card.getAttribute('data-d22open') : tr.getAttribute('data-id') };
  }
  window.d36Ic = icHit;
  function icOpen(h){ lpFired = Date.now(); clearTimeout(lp); openInfo(h.kind, rowById(h.id)); }
  document.addEventListener('touchstart', function(e){ var q = e.touches && e.touches[0]; ihit = q ? icHit(e.target, q.clientX) : null; if(ihit){ ihit.t0 = Date.now(); lpFired = ihit.t0; clearTimeout(lp); } }, {capture:true, passive:true});
  document.addEventListener('touchend', function(e){
    if(!ihit) return; var h = ihit; ihit = null; if(Date.now() - h.t0 > 500) return;
    e.preventDefault(); e.stopPropagation(); icOpen(h);
  }, true);
  document.addEventListener('touchmove', function(){ ihit = null; }, {capture:true, passive:true});
  ['pointerup','mouseup','click'].forEach(function(ev){ document.addEventListener(ev, function(e){
    if(Date.now() - lpFired < 700 && e.target.closest && e.target.closest(IC_SEL+', [data-d22open], tr[data-id]')){ e.stopPropagation(); e.preventDefault(); return; }
    if(ev==='click' && e.pointerType!=='touch'){ var h = icHit(e.target, e.clientX); if(h){ e.preventDefault(); e.stopPropagation(); icOpen(h); } }
  }, true); });

  var curId = null, o23 = window.d23Open; if(o23) window.d23Open = function(id){ curId = id; return o23.apply(this, arguments); };
  var CH = [['cand','👤','Candidate'],['client','🏢','Client'],['owner','🙋','Owner’s day'],['time','🕒','Time zones'],['country','🌍','Country'],['role','🎯','Role'],['round','🪜','Rounds'],['dur','⏱','Duration'],['status','ℹ️','Status'],['conflict','⚠','Conflict']];
  function injectChips(){
    var c = document.querySelector('#d23 .d23-card'); if(!c || !curId) return; var r = rowById(curId); if(!r || r.woi) return;
    var ex = c.querySelector('.d32-info'); if(ex && ex.getAttribute('data-for')===String(r.id)) return; if(ex) ex.remove();
    var list = CH.filter(function(x){ return (x[0]!=='status' || r.status) && (x[0]!=='conflict' || (function(){ try{ return computeConflicts(rows()).has(r.id); }catch(e){ return false; } })()); });
    var box = document.createElement('div'); box.className = 'd32-info'; box.setAttribute('data-for', r.id);
    box.innerHTML = '<div class="d32-it">Info</div><div class="d32-chips">'+list.map(function(x){ return '<button type="button" data-d32i="'+x[0]+'">'+x[1]+' '+x[2]+'</button>'; }).join('')+'</div>';
    var a = c.querySelector('.d23-sec'); if(a) c.insertBefore(box, a); else c.appendChild(box);
  }
  var it = 0; try{ new MutationObserver(function(){ clearTimeout(it); it = setTimeout(injectChips, 80); }).observe(document.body, {childList:true, subtree:true}); }catch(e){}
  document.addEventListener('click', function(e){ var b = e.target.closest && e.target.closest('[data-d32i]'); if(b){ e.preventDefault(); e.stopPropagation(); openInfo(b.getAttribute('data-d32i'), rowById(curId)); } }, true);
})();

/* ===== d33: V2.5 desk assistant — pre-import check, next-call card, reschedule cascade, reliability flags, handover notes, reply builder, wrap, carry-forward, email cleaner, client scorecard, workload, change log + undo, backup ===== */
;(function(){
  if(window.__d33) return; window.__d33 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var LS = { g:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }, s:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
  var J = function(k,d){ try{ var v = JSON.parse(LS.g(k,'')); return v==null?d:v; }catch(e){ return d; } };
  var bd = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var nowBd = function(){ var d=new Date(); return (d.getHours()*60+d.getMinutes()+720)%1440; };
  var pad = function(n){ return (n<10?'0':'')+n; };
  var fmtT = function(b){ var c=(b+720)%1440, h=Math.floor(c/60), m=c%60; return (h%12||12)+':'+pad(m)+' '+(h>=12?'PM':'AM'); };
  var dur = function(r){ var d = null; try{ d = parseDurationMinutes(r.duration); }catch(e){} return d>0 ? d : 30; };
  var nk = function(c){ try{ return normalizeNameKey(c||''); }catch(e){ return String(c||'').toLowerCase().replace(/[^a-z]/g,''); } };
  var ck = function(c){ try{ return normalizeCompanyKey(c||''); }catch(e){ return String(c||'').toLowerCase().replace(/[^a-z0-9]/g,''); } };
  var sameCo = function(a,b){ try{ return ck(a)===ck(b) || fuzzyCompanyKeyMatch(a,b); }catch(e){ return ck(a)===ck(b); } };
  var rows = function(){ return state.rows||[]; };
  var rowById = function(id){ return rows().filter(function(r){ return String(r.id)===String(id); })[0] || null; };
  var ownOf = function(r){ try{ return window.cdOwnerOf ? window.cdOwnerOf(r) : null; }catch(e){ return null; } };
  var ownerName = function(r){ var o = ownOf(r); return o && o.name ? o.name : (r.assignee||''); };
  var isTeam = function(n){ try{ return getTeamNames().has(n); }catch(e){ return false; } };
  var live = function(){ return rows().filter(function(r){ return !r.woi && !r.status && r.candidate; }); };
  var hist = function(){ try{ return (typeof _allRowsAcrossDatesCache!=='undefined') ? _allRowsAcrossDatesCache : null; }catch(e){ return null; } };
  var short = function(d){ try{ return new Date(d+'T00:00:00').toLocaleDateString(undefined,{day:'numeric',month:'short',year:'2-digit'}); }catch(e){ return d||''; } };
  var first = function(n){ return String(n||'').trim().split(/\s+/)[0]||''; };
  var admin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  var todayStr = function(){ try{ return todayDateString(); }catch(e){ return state.date; } };
  var ST = {rescheduled:['🔁','Rescheduled'], cancelled:['✕','Cancelled'], not_responded:['☎','No response'], no_invite:['📨','No invite']};
  var loading = function(){ return !!(state.needsLogin || state.dateSwitching || state.loading || state.saving); };
  var copy = function(tx, btn){ var lb = btn && btn.textContent; var done = function(){ if(btn){ btn.textContent = '✓ Copied'; setTimeout(function(){ btn.textContent = lb; }, 1600); } }; try{ navigator.clipboard.writeText(tx).then(done, function(){ window.prompt('Copy this', tx); }); }catch(e){ window.prompt('Copy this', tx); } };
  var toast = function(m){ try{ if(window.d2Toast) window.d2Toast(m,{ms:4000}); }catch(e){} };
  function ensureHist(cb){ if(hist()) return cb(hist()); if(typeof fetchAllRowsAcrossDates!=='function') return cb(null); fetchAllRowsAcrossDates().then(function(h){ cb(h||hist()); }).catch(function(){ cb(null); }); }
  function ov(id, title, kicker, body){
    var old = document.getElementById(id); if(old) old.remove();
    var el = document.createElement('div'); el.id = id; el.className = 'd27-ov d33-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>'+esc(kicker)+'</small><h2>'+esc(title)+'</h2></div><button type="button" class="d27-x" data-d33x aria-label="Close">✕</button></div><div class="d29-body d33-body">'+body+'</div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d33x]'))) closeOv(el); });
    return el;
  }
  function closeOv(el){ if(el && el.parentNode) el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); }
  function body(el, html){ var b = el.querySelector('.d33-body'); if(b){ var sc = el.scrollTop; b.innerHTML = html; el.scrollTop = sc; } }
  var sum = function(items){ return '<div class="d29-sum">'+items.map(function(i){ return '<span class="'+(i[2]||'')+'"><b>'+i[0]+'</b> '+i[1]+'</span>'; }).join('')+'</div>'; };
  var row3 = function(a,b,c){ return '<div class="d27-row" style="cursor:default"><span class="t">'+a+'</span><span class="n">'+b+'</span><span class="o">'+(c||'')+'</span></div>'; };
  var banner = function(id, html, ms){
    var old = document.getElementById(id); if(old) old.remove();
    var el = document.createElement('div'); el.id = id; el.className = 'd33-bar'; el.innerHTML = html; document.body.appendChild(el);
    el.addEventListener('click', function(e){ if(e.target.closest('[data-d33bx]')) el.remove(); });
    if(ms) setTimeout(function(){ if(el.isConnected) el.remove(); }, ms);
    return el;
  };

  /* ================= handover notes (per-date note entry) ================= */
  var hid = function(){ return state.date+'-handover-ids'; };
  function getHO(){ var e = (state.notes||[]).filter(function(n){ return n && n.id===hid(); })[0]; try{ return e ? (JSON.parse(e.text)||{}) : {}; }catch(x){ return {}; } }
  function setHO(rid, text){
    var m = getHO(); if(text && text.trim()) m[rid] = text.trim(); else delete m[rid];
    state.notes = state.notes || []; var i = state.notes.findIndex(function(n){ return n && n.id===hid(); });
    if(Object.keys(m).length){ var tx = JSON.stringify(m); if(i>=0) state.notes[i].text = tx; else state.notes.push({id:hid(), text:tx}); } else if(i>=0) state.notes.splice(i,1);
    try{ markDirty(); }catch(e){}
  }

  /* ================= reliability flags ================= */
  var REL = null, relAt = 0;
  function badStatus(r){ if(r.status==='not_responded' || r.status==='no_invite') return true; if(r.status==='rescheduled' || r.status==='cancelled'){ try{ return /candidate/i.test(JSON.stringify(r.statusFields||[])); }catch(e){ return false; } } return false; }
  function buildRel(){
    var H = hist(); if(!H) return; var m = {};
    H.forEach(function(r){ if(!r || !r.candidate || r.woi || !r._date || r._date>=state.date) return; var k = nk(r.candidate); if(!k) return; var o = m[k] || (m[k] = {n:0, bad:0, last:''}); o.n++; if(badStatus(r)){ o.bad++; o.last = (o.last && o.last>r._date) ? o.last : r._date; } });
    REL = m; relAt = Date.now();
  }
  function decorate(){
    if(!REL) return;
    var put = function(host, name){ var o = REL[nk(name)]; if(!o || o.bad<2) return; if(host.querySelector('.d33-rel')) return; var s = document.createElement('span'); s.className = 'd33-rel'; s.title = o.bad+' of '+o.n+' earlier calls were a no-show / candidate-side reschedule (last '+o.last+')'; s.textContent = '🚩'+o.bad; host.insertBefore(s, host.firstChild); };
    document.querySelectorAll('#tableScrollMain tbody tr[data-id]').forEach(function(tr){ var td = tr.querySelector('td[data-label="Candidate"]'), inp = td && td.querySelector('input[data-field="candidate"]'); if(td && inp) put(td, inp.value); });
    document.querySelectorAll('.d22-card .d22-cn').forEach(function(n){ put(n, n.textContent.replace(/^🚩\d+/, '')); });
  }
  window.d33Build = function(){ buildRel(); decorate(); };
  window.d33Rel = function(name){ return REL ? REL[nk(name)] || null : null; };

  /* ================= change log, since-you-left, cascade ================= */
  var FIELDS = ['time','status','assignee','drivingPerson','company','round','duration','candidate','role','country','woi'];
  var prevMap = null, prevDate = null, prevCopy = null;
  var FL = {time:'Time', status:'Status', assignee:'Team', drivingPerson:'Owner', company:'Client', round:'Round', duration:'Duration', candidate:'Candidate', role:'Role', country:'Country', woi:'Waiting for invite'};
  function snap(){ var m = {}, cp = {}; rows().forEach(function(r){ var o = {}; FIELDS.forEach(function(f){ o[f] = r[f]==null ? '' : String(r[f]); }); m[r.id] = o; cp[r.id] = JSON.stringify(r); }); return {m:m, cp:cp}; }
  function audit(){ return J('cd.audit', []); }
  function pushAudit(list){ if(!list.length) return; var a = list.concat(audit()).slice(0, 300); LS.s('cd.audit', JSON.stringify(a)); }
  function diffNow(){
    if(loading()) { prevMap = null; return; }
    var cur = snap();
    if(!prevMap || prevDate!==state.date){ prevMap = cur.m; prevCopy = cur.cp; prevDate = state.date; return; }
    var ids = Object.keys(cur.m), old = Object.keys(prevMap), common = ids.filter(function(i){ return prevMap[i]; });
    if(old.length && common.length < old.length*0.5){ prevMap = cur.m; prevCopy = cur.cp; return; }
    var L = [], t = Date.now(), timeChanged = [];
    common.forEach(function(id){ FIELDS.forEach(function(f){ if(prevMap[id][f]!==cur.m[id][f]){ var r = rowById(id); L.push({k:'chg', t:t, d:state.date, id:id, c:r?r.candidate:'', f:f, a:prevMap[id][f], b:cur.m[id][f]}); if(f==='time') timeChanged.push(id); } }); });
    ids.filter(function(i){ return !prevMap[i]; }).forEach(function(id){ var r = rowById(id); if(r && r.candidate) L.push({k:'add', t:t, d:state.date, id:id, c:r.candidate}); });
    if(common.length >= old.length*0.5) old.filter(function(i){ return !cur.m[i]; }).forEach(function(id){ var p = null; try{ p = JSON.parse(prevCopy[id]); }catch(e){} if(p && p.candidate) L.push({k:'del', t:t, d:state.date, id:id, c:p.candidate, row:p}); });
    prevMap = cur.m; prevCopy = cur.cp;
    pushAudit(L);
    timeChanged.forEach(cascade);
  }
  function cascade(id){
    var r = rowById(id); if(!r || r.woi || r.status) return; var msg = [];
    try{ computeCandidateOverlaps(rows()).forEach(function(p){ if(p.a.id===id || p.b.id===id) msg.push(r.candidate+' now overlaps another call of theirs'); }); }catch(e){}
    try{ computeConflictPairs(rows()).forEach(function(p){ if(p.kind!=='candidate' && (p.a.id===id || p.b.id===id)) msg.push((p.assignee||'The handler')+' is now double-booked'); }); }catch(e){}
    if(!msg.length) return;
    banner('d33Casc', '<span>⚠ Moving <b>'+esc(r.candidate)+'</b> to '+esc(r.time)+' created a clash: '+esc(msg[0])+'.</span><button type="button" data-d33fix="'+esc(id)+'">Fix</button><button type="button" data-d33bx>✕</button>', 20000);
  }
  var tdiff = 0;
  function afterRender(){ clearTimeout(tdiff); tdiff = setTimeout(function(){ try{ diffNow(); decorate(); saveSeen(); }catch(e){ console.warn('d33', e); } }, 600); }

  /* since you left */
  function sigOf(r){ return FIELDS.map(function(f){ return r[f]==null?'':String(r[f]); }).join('|'); }
  var seenChecked = false, lastSave = 0, leftDiff = null;
  function saveSeen(force){
    if(loading() || !rows().length) return; if(!force && Date.now()-lastSave < 15000) return; lastSave = Date.now();
    var m = {}; rows().forEach(function(r){ m[r.id] = {s:sigOf(r), c:r.candidate||'', t:r.time||'', co:r.company||''}; });
    LS.s('cd.seen.'+state.date, JSON.stringify({ts:Date.now(), m:m}));
  }
  function checkLeft(){
    if(seenChecked || loading() || !rows().length) return; seenChecked = true;
    var o = J('cd.seen.'+state.date, null); if(!o || !o.m || Date.now()-o.ts < 30*60000) return;
    var add = [], chg = [], del = [];
    rows().forEach(function(r){ var p = o.m[r.id]; if(!p){ if(r.candidate) add.push(r); } else if(p.s!==sigOf(r)) chg.push({r:r, p:p}); });
    Object.keys(o.m).forEach(function(id){ if(!rowById(id) && o.m[id].c) del.push(o.m[id]); });
    if(!add.length && !chg.length && !del.length) return;
    leftDiff = {ts:o.ts, add:add, chg:chg, del:del};
    var ago = Math.round((Date.now()-o.ts)/60000), agoTxt = ago<90 ? ago+' min' : Math.round(ago/60)+' h';
    banner('d33Left', '<span>🕘 Since you were here ('+agoTxt+' ago): <b>'+add.length+'</b> new · <b>'+chg.length+'</b> changed · <b>'+del.length+'</b> removed</span><button type="button" data-d33t="changes">Review</button><button type="button" data-d33bx>✕</button>', 25000);
  }

  /* ================= next-call card ================= */
  var shown = {};
  function nextCard(){
    if(document.hidden || loading()) return; var me = ''; try{ me = getMyAssigneeName(); }catch(e){} if(!me) return;
    var n = nowBd();
    var r = live().filter(function(x){ return ownerName(x)===me && bd(x.time)!==9999 && bd(x.time)-n<=10 && bd(x.time)-n>=-2 && !shown[state.date+x.id]; }).sort(function(a,b){ return bd(a.time)-bd(b.time); })[0];
    if(!r) return; shown[state.date+r.id] = 1;
    var rule = ''; try{ rule = window.d29RuleFor ? window.d29RuleFor(r.company) : ''; }catch(e){}
    var ho = getHO()[r.id] || '', rel = window.d33Rel(r.candidate);
    var last = ''; var H = hist(); if(H){ var p = H.filter(function(x){ return x && x._date && x._date<state.date && nk(x.candidate)===nk(r.candidate) && sameCo(x.company, r.company); }).sort(function(a,b){ return b._date.localeCompare(a._date); })[0]; if(p) last = short(p._date)+' · '+(p.round||'')+(p.status&&ST[p.status]?' · '+ST[p.status][1]:''); }
    var m = bd(r.time)-n;
    banner('d33Next', '<div class="d33-nx"><div><small>'+(m<=0?'STARTING NOW':'IN '+m+' MIN')+'</small><b>'+esc(r.candidate)+'</b><span>'+esc([r.time,r.company,r.round].filter(Boolean).join(' · '))+'</span>'
      + (rule?'<em>📌 '+esc(rule)+'</em>':'')+(ho?'<em>📝 '+esc(ho)+'</em>':'')+(last?'<em>Last time: '+esc(last)+'</em>':'')+(rel&&rel.bad>=2?'<em>🚩 '+rel.bad+' earlier no-shows / reschedules</em>':'')+(window.d48Next?window.d48Next(r):'')
      + '</div><div class="d33-nxb"><button type="button" data-d34prep="'+esc(r.id)+'">🧭 Prep</button><button type="button" data-d33chase="'+esc(r.id)+'">📋 Chase msg</button><button type="button" data-d33open="'+esc(r.id)+'">Open</button><button type="button" data-d33bx>✕</button></div></div>', 120000);
    try{ if(window.d26fx) window.d26fx.buzz(18); }catch(e){}
  }

  /* ================= call-card injection: handover note + reply ================= */
  var curId = null, o23 = window.d23Open; if(o23) window.d23Open = function(id){ curId = id; return o23.apply(this, arguments); };
  function rowForSide(side){ var nm = ((side.querySelector('.d5-ht b')||{}).textContent||'').trim(); if(!nm) return null; var tm = (side.querySelector('[data-f="time"]')||{}).value; var c = rows().filter(function(r){ return (r.candidate||'').trim()===nm; }); return (tm && c.filter(function(r){ return r.time===tm; })[0]) || c[0] || null; }
  function hoBox(r){ var rel = window.d33Rel(r.candidate); return '<div class="d33-ho" data-for="'+esc(r.id)+'">'+(rel&&rel.bad>=2?'<div class="d33-relnote">🚩 '+rel.bad+' of '+rel.n+' earlier calls were no-shows / candidate reschedules — confirm early.</div>':'')+'<label>📝 Handover note<textarea data-d33ho="'+esc(r.id)+'" rows="2" placeholder="e.g. prefers Teams · send resume first">'+esc(getHO()[r.id]||'')+'</textarea></label><div class="d29-qa"><button type="button" data-d34prep="'+esc(r.id)+'">🧭 Prep card</button><button type="button" data-d33rp="'+esc(r.id)+'">💬 Reply builder</button></div></div>'; }
  function inject(){
    var c = document.querySelector('#d23 .d23-card');
    if(c && curId){ var r = rowById(curId); var ex = c.querySelector('.d33-ho'); if(r && !r.woi && (!ex || ex.getAttribute('data-for')!==String(r.id))){ if(ex) ex.remove(); var a = c.querySelector('.d23-sec'); var tmp = document.createElement('div'); tmp.innerHTML = hoBox(r); if(a) c.insertBefore(tmp.firstChild, a); else c.appendChild(tmp.firstChild); } }
    var side = document.querySelector('#d5Side .d5-body');
    if(side){ var r2 = rowForSide(document.getElementById('d5Side')); var ex2 = side.querySelector('.d33-ho'); if(r2 && !r2.woi && (!ex2 || ex2.getAttribute('data-for')!==String(r2.id))){ if(ex2) ex2.remove(); side.insertAdjacentHTML('afterbegin', hoBox(r2)); } }
  }
  var inj = 0; try{ new MutationObserver(function(){ clearTimeout(inj); inj = setTimeout(inject, 90); }).observe(document.body, {childList:true, subtree:true}); }catch(e){}
  document.addEventListener('change', function(e){ var t = e.target.closest && e.target.closest('[data-d33ho]'); if(t) setHO(t.getAttribute('data-d33ho'), t.value); }, true);
  document.addEventListener('focusout', function(e){ var t = e.target.closest && e.target.closest('[data-d33ho]'); if(t) setHO(t.getAttribute('data-d33ho'), t.value); }, true);

  /* ================= reply builder ================= */
  function tpl(r){
    var d = state.date, sl = []; try{ sl = window.d29Slots(r, 2).slots.map(fmtT); }catch(e){}
    var who = first(r.candidate), co = r.company||'the client', rl = r.role?' ('+r.role+')':'', rd = r.round||'';
    return [
      ['✅ Confirmed','Hi, confirming '+r.candidate+'’s '+rd+' interview with '+co+rl+' on '+d+' at '+(r.time||'the scheduled time')+' IST. Please share the meeting link if it has not been sent yet.'],
      ['🔁 Reschedule','Hi, '+r.candidate+' is unable to attend the '+(r.time||'')+' IST slot for '+co+rl+'. Could we move it to '+(sl.length? sl.join(' or ')+' IST today' : 'another time')+'? Please let us know what works.'],
      ['☎ No-show','Hi, '+r.candidate+' did not join the '+(r.time||'')+' IST '+rd+' interview with '+co+' despite reminders. Please advise whether we should reschedule.'],
      ['✕ Cancelled','Hi, the '+(r.time||'')+' IST interview for '+r.candidate+' with '+co+' stands cancelled. Apologies for the inconvenience.'],
      ['📨 Need invite','Hi, we have not received the calendar invite for '+r.candidate+'’s '+rd+' interview with '+co+rl+'. Could you please share it?'],
      ['⏰ Running late','Hi, '+r.candidate+' will join a few minutes late for the '+(r.time||'')+' IST interview with '+co+'. Thank you for your patience.'],
      ['👤 To candidate','Hi '+who+', a quick reminder: your '+rd+' interview with '+co+rl+' is today at '+(r.time||'the scheduled time')+' IST. Please reply to confirm you will be available.']
    ];
  }
  var rpId = null, rpIdx = 0;
  function replyHtml(){
    var r = rowById(rpId);
    if(!r){ var L = live().sort(function(a,b){ return bd(a.time)-bd(b.time); }); return '<p class="d29-p">Pick the call.</p><div class="d27-list">'+(L.length? L.map(function(x){ return '<button type="button" class="d27-row" data-d33rpick="'+esc(x.id)+'"><span class="t">'+esc(x.time||'')+'</span><span class="n"><b>'+esc(x.candidate)+'</b><small>'+esc([x.company,x.round].filter(Boolean).join(' · '))+'</small></span><span class="o">›</span></button>'; }).join('') : '<div class="d27-empty">No live calls.</div>')+'</div>'; }
    var T = tpl(r);
    return '<div class="d29-rsh"><b>'+esc(r.candidate)+'</b><small>'+esc([r.time,r.company,r.round].filter(Boolean).join(' · '))+'</small></div><div class="d29-seg wrap">'+T.map(function(t,i){ return '<button type="button" class="'+(i===rpIdx?'on':'')+'" data-d33rpt="'+i+'">'+esc(t[0])+'</button>'; }).join('')+'</div><textarea class="d29-ta" id="d33rpm" rows="6">'+esc(T[rpIdx][1])+'</textarea><div class="d27-actions"><button type="button" class="d27-btn" data-d33rpcopy>📋 Copy message</button><button type="button" class="d27-btn ghost" data-d33rpback>‹ Other call</button></div>';
  }

  /* ================= end-of-day wrap ================= */
  function wrapHtml(){
    var tx = ''; try{ tx = deskEodText(state.date, rows(), getTeamNames(), {}); }catch(e){ tx = (window.d28Summary?window.d28Summary():''); }
    var woi = rows().filter(function(r){ return r.woi && r.candidate; });
    if(woi.length) tx += '\n\n⏳ Still waiting for invite ('+woi.length+'):\n'+woi.slice(0,15).map(function(r){ return '• '+r.candidate+(r.company?' — '+r.company:''); }).join('\n');
    return '<p class="d29-p">Edit anything you like, then copy it to WhatsApp.</p><textarea class="d29-ta" id="d33wr" rows="14">'+esc(tx)+'</textarea><div class="d27-actions"><button type="button" class="d27-btn" data-d33wrcopy>📋 Copy wrap-up</button><button type="button" class="d27-btn ghost" data-d33t="carry">🗂 Carry-forward</button></div>';
  }

  /* ================= carry-forward ================= */
  var carry = null;
  function dismissed(){ return J('cd.carry.x', {}); }
  function carryKey(r){ return nk(r.candidate)+'|'+ck(r.company); }
  async function loadCarry(){
    var prev = ''; try{ prev = deskDateAdd(state.date, -1); }catch(e){ return []; }
    var data = null; try{ data = await apiCall('calls', {qs:'date='+prev}); }catch(e){ return null; }
    var dx = dismissed(), have = {}; rows().forEach(function(r){ have[carryKey(r)] = 1; });
    var out = (data && data.rows || []).filter(function(r){ return r.candidate && !r.woi && (r.status==='rescheduled'||r.status==='not_responded'||r.status==='no_invite') && !have[carryKey(r)] && !dx[prev+'|'+carryKey(r)]; });
    return out.map(function(r){ r._prev = prev; return r; });
  }
  function carryHtml(L){
    if(L===null) return '<div class="d27-empty">Could not load yesterday’s calls.</div>';
    if(!L.length) return '<div class="d27-empty">✓ Nothing from yesterday is waiting.</div>';
    return '<p class="d29-p">Yesterday’s calls that were rescheduled or got no response and are not on today’s list yet.</p><div class="d27-list">'+L.map(function(r,i){ var st = ST[r.status]; return '<div class="d29-cr"><div class="d29-crt"><span class="t">'+esc(r.time||'')+'</span><span class="n"><b>'+esc(r.candidate)+'</b><small>'+esc([r.company,r.round,st?st[1]:''].filter(Boolean).join(' · '))+'</small></span></div><div class="d29-seg"><button type="button" data-d33cmove="'+i+'">➡ Move to today (WOI)</button><button type="button" data-d33cskip="'+i+'">Dismiss</button></div></div>'; }).join('')+'</div>';
  }

  /* ================= paste an email ================= */
  var emailTxt = '';
  function cleanEmail(t){
    var L = String(t).replace(/\r/g,'').split('\n'), out = [];
    for(var i=0;i<L.length;i++){ var l = L[i].trim();
      if(/^(-- ?|_{5,}|-{5,})$/.test(l) || /^(regards|thanks|thank you|best|sent from my)/i.test(l)) break;
      if(!l || /^>/.test(l) || /^(from|to|cc|bcc|sent|date|subject|reply-to):/i.test(l) || /^on .{5,120} wrote:?$/i.test(l)) continue;
      out.push(l.replace(/^[•*\-]\s+/, '')); }
    return out;
  }
  function emailHtml(){
    var lines = cleanEmail(emailTxt), ok = [], bad = [];
    lines.forEach(function(l){ var p = []; try{ p = parseImportText(l, state.date, '1st'); }catch(e){} var good = (p||[]).some(function(r){ return r.candidate && r.company && (r.woi || timeToMinutes(r.time)!==9999); }); if(good) ok.push(l); else { var hdr = null; try{ hdr = parseDateSectionHeader(l, state.date); }catch(e){} if(hdr) ok.push(l); else if(/\d{1,2}([:.]\d{2})?\s*(am|pm)/i.test(l)) bad.push(l); } });
    emailTxt && (window.__d33mail = ok.join('\n'));
    return '<p class="d29-p">Paste the whole email (forwarded or not). Quotes, headers and signatures are removed; only lines the importer can read are kept.</p><textarea class="d29-ta" id="d33em" rows="7" placeholder="Paste the email here">'+esc(emailTxt)+'</textarea><div class="d27-actions"><button type="button" class="d27-btn" data-d33emread>Read it</button></div>'
      + (emailTxt ? sum([[ok.length,'calls readable'],[bad.length,'need a look',bad.length?'bad':'']]) + (ok.length? '<div class="d27-sec"><b>Will import</b></div><div class="d27-list">'+ok.slice(0,12).map(function(l){ return '<div class="d27-row" style="cursor:default"><span class="n"><small style="white-space:normal">'+esc(l)+'</small></span></div>'; }).join('')+'</div><div class="d27-actions"><button type="button" class="d27-btn" data-d33emgo>📥 Send to Import</button></div>' : '') + (bad.length? '<div class="d27-sec"><b>Could not read — check these</b></div><div class="d27-list">'+bad.map(function(l){ return '<div class="d27-row" style="cursor:default"><span class="n"><small style="white-space:normal">⚠ '+esc(l)+'</small></span></div>'; }).join('')+'</div>' : '') : '');
  }

  /* ================= client scorecard ================= */
  var scoreCo = null, scoreQ = '';
  function median(a){ a = a.slice().sort(function(x,y){ return x-y; }); return a.length ? a[Math.floor(a.length/2)] : null; }
  function scoreHtml(H){
    if(!H) return '<div class="d27-empty">Loading history…</div>';
    var rowsH = H.filter(function(r){ return r && r.candidate && !r.woi && r.company; });
    if(!scoreCo){
      var by = {}; rowsH.forEach(function(r){ var k = ck(r.company); (by[k] = by[k] || {name:r.company, n:0}).n++; });
      var ks = Object.keys(by).filter(function(k){ return !scoreQ || by[k].name.toLowerCase().indexOf(scoreQ.toLowerCase())>=0; }).sort(function(a,b){ return by[b].n-by[a].n; }).slice(0,30);
      return '<input class="d29-ta" id="d33sq" style="min-height:42px" placeholder="Search a client" value="'+esc(scoreQ)+'"><div class="d27-list">'+ks.map(function(k){ return '<button type="button" class="d27-row" data-d33sc="'+esc(by[k].name)+'"><span class="n"><b>'+esc(by[k].name)+'</b></span><span class="o">'+by[k].n+' calls ›</span></button>'; }).join('')+'</div>';
    }
    var R = rowsH.filter(function(r){ return sameCo(r.company, scoreCo); }), n = R.length, rs = R.filter(function(r){ return r.status==='rescheduled'; }).length, cx = R.filter(function(r){ return r.status==='cancelled'; }).length, nr = R.filter(function(r){ return r.status==='not_responded'||r.status==='no_invite'; }).length;
    var pc = function(a){ return n ? Math.round(a/n*100)+'%' : '0%'; }, ppl = {}; R.forEach(function(r){ ppl[nk(r.candidate)] = 1; });
    var ds = R.map(function(r){ var d = null; try{ d = parseDurationMinutes(r.duration); }catch(e){} return d; }).filter(Boolean), md = median(ds);
    var hrs = {}; R.forEach(function(r){ var b = bd(r.time); if(b!==9999){ var h = Math.floor(b/60); hrs[h] = (hrs[h]||0)+1; } });
    var bh = Object.keys(hrs).sort(function(a,b){ return hrs[b]-hrs[a]; })[0];
    var hand = {}; R.forEach(function(r){ var o = (r.drivingPerson||r.assignee||'').trim(); if(!o || isTeam(o)) return; var h = hand[o] || (hand[o] = {n:0, bad:0}); h.n++; if(r.status) h.bad++; });
    var best = Object.keys(hand).filter(function(k){ return hand[k].n>=3; }).sort(function(a,b){ return hand[a].bad/hand[a].n - hand[b].bad/hand[b].n || hand[b].n-hand[a].n; })[0];
    var rule = ''; try{ rule = window.d29RuleFor ? window.d29RuleFor(scoreCo) : ''; }catch(e){}
    var rec = R.slice().sort(function(a,b){ return (b._date||'').localeCompare(a._date||''); }).slice(0,8);
    return '<div class="d27-actions"><button type="button" class="d27-btn ghost" data-d33sback>‹ All clients</button></div><h3 style="margin:4px 0 8px">'+esc(scoreCo)+'</h3>'+(rule?'<div class="d29-rule" style="margin-bottom:10px"><b>📌 Client rule</b><span>'+esc(rule)+'</span></div>':'')
      + sum([[n,'calls'],[Object.keys(ppl).length,'candidates'],[pc(rs),'rescheduled',rs/n>=.2?'bad':''],[pc(cx),'cancelled',cx/n>=.2?'bad':''],[pc(nr),'no response',nr/n>=.2?'bad':'']])
      + '<div class="d29-p">'+(md?'Usual length <b>'+md+' min</b> · ':'')+(bh!==undefined?'busiest hour <b>'+fmtT(bh*60)+'</b> IST · ':'')+(best?'best handler <b>'+esc(best)+'</b> ('+hand[best].n+' calls, '+Math.round(hand[best].bad/hand[best].n*100)+'% issues)':'no handler with 3+ calls yet')+'</div>'
      + '<div class="d27-sec"><b>Latest calls</b></div><div class="d27-list">'+rec.map(function(r){ var st = ST[r.status]; return row3(esc(short(r._date)), '<b>'+esc(r.candidate)+'</b><small>'+esc([r.round,r.role].filter(Boolean).join(' · '))+'</small>', (st?st[0]+' ':'')+esc(r.drivingPerson||r.assignee||'')); }).join('')+'</div>';
  }

  /* ================= workload ================= */
  var wlStart = null;
  function points(r){ var p = 1, a = false; try{ a = isAdvancedRound(r.round); }catch(e){} if(a) p += 1; if(dur(r)>=60) p += .5; var b = bd(r.time); if(b!==9999 && b>=480 && b<1080) p += .5; return p; }
  function workHtml(H){
    var out = '';
    var chains = [], by = {}; live().forEach(function(r){ var o = ownerName(r); if(!o || isTeam(o) || bd(r.time)===9999) return; (by[o] = by[o]||[]).push(r); });
    Object.keys(by).forEach(function(nm){ var L = by[nm].sort(function(a,b){ return bd(a.time)-bd(b.time); }), s = null, e = null;
      L.forEach(function(r){ var b = bd(r.time), en = b+dur(r); if(s===null){ s = b; e = en; } else if(b-e<=15){ e = Math.max(e,en); } else { if(e-s>=180) chains.push([nm,s,e]); s = b; e = en; } }); if(s!==null && e-s>=180) chains.push([nm,s,e]); });
    out += '<div class="d27-sec"><b>Fatigue today</b><span>3h+ back-to-back</span></div><div class="d27-list">'+(chains.length? chains.map(function(c){ return row3('🥵','<b>'+esc(c[0])+'</b><small>'+fmtT(c[1])+' → '+fmtT(c[2])+' without a real break</small>',''); }).join('') : '<div class="d27-empty">✓ Nobody is on a 3h+ run.</div>')+'</div>';
    if(!H) return out + '<div class="d27-empty">Loading the week…</div>';
    if(!wlStart) wlStart = deskMonday(todayStr());
    var end = deskDateAdd(wlStart, 6), W = H.filter(function(r){ return r && r.candidate && !r.woi && r._date && r._date>=wlStart && r._date<=end; }), pp = {};
    W.forEach(function(r){ var o = (r.drivingPerson||r.assignee||'').trim(); if(!o || isTeam(o)) return; var x = pp[o] || (pp[o] = {n:0, pts:0, adv:0, lng:0}); x.n++; x.pts += points(r); try{ if(isAdvancedRound(r.round)) x.adv++; }catch(e){} if(dur(r)>=60) x.lng++; });
    var ks = Object.keys(pp).sort(function(a,b){ return pp[b].pts-pp[a].pts; }), avg = ks.length ? ks.reduce(function(t,k){ return t+pp[k].pts; },0)/ks.length : 0, mx = ks.length ? pp[ks[0]].pts : 1;
    out += '<div class="d29-wk"><button type="button" class="d27-btn sm ghost" data-d33wl="-1">‹</button><b>Week '+esc(wlStart)+' → '+esc(end)+'</b><button type="button" class="d27-btn sm ghost" data-d33wl="1">›</button></div><p class="d29-p">Points: 1 per call, +1 for 2nd round+, +0.5 for 60 min+, +0.5 for late-night (8 PM–6 AM IST).</p><div class="d27-load">';
    out += ks.length? ks.map(function(k){ var x = pp[k], hi = avg && x.pts>=avg*1.4; return '<div><span>'+esc(k)+(hi?' 🔥':'')+'</span><i><u style="width:'+Math.round(x.pts/mx*100)+'%" class="'+(hi?'bad':'')+'"></u></i><b>'+x.pts+'</b></div>'; }).join('') : '<div class="d27-empty">No calls this week.</div>';
    return out + '</div>'+(ks.length?'<p class="d29-p">Average '+avg.toFixed(1)+' points. 🔥 = 40% or more above average.</p>':'');
  }

  /* ================= changes & undo ================= */
  var chTab = 'left';
  function changesHtml(){
    var tabs = '<div class="d29-seg"><button type="button" class="'+(chTab==='left'?'on':'')+'" data-d33ctab="left">Since you left</button><button type="button" class="'+(chTab==='log'?'on':'')+'" data-d33ctab="log">Recent changes</button></div>';
    if(chTab==='left'){
      if(!leftDiff) return tabs+'<div class="d27-empty">Nothing new since you last had the app open (or you were away under 30 min).</div>';
      var d = leftDiff, h = tabs + sum([[d.add.length,'new'],[d.chg.length,'changed'],[d.del.length,'removed']]);
      h += '<div class="d27-list">' + d.add.map(function(r){ return row3('🆕','<b>'+esc(r.candidate)+'</b><small>'+esc([r.time,r.company].filter(Boolean).join(' · '))+'</small>',''); }).join('')
        + d.chg.map(function(x){ var ch = FIELDS.filter(function(f){ return String(x.r[f]==null?'':x.r[f])!==undefined; }); return row3('✏️','<b>'+esc(x.r.candidate)+'</b><small>'+esc([x.r.time,x.r.status?(ST[x.r.status]?ST[x.r.status][1]:x.r.status):'',ownerName(x.r)].filter(Boolean).join(' · '))+'</small>',''); }).join('')
        + d.del.map(function(p){ return row3('🗑','<b>'+esc(p.c)+'</b><small>'+esc([p.t,p.co].filter(Boolean).join(' · '))+'</small>','removed'); }).join('') + '</div>';
      return h;
    }
    var A = audit().filter(function(a){ return a.d===state.date; }).slice(0, 40);
    return tabs+'<p class="d29-p">Edits made in this browser on '+esc(state.date)+'. Undo puts the old value back.</p><div class="d27-list">'+(A.length? A.map(function(a,i){
      var when = new Date(a.t).toLocaleTimeString([], {hour:'numeric', minute:'2-digit'}), label, can = false, btn = '';
      if(a.k==='chg'){ label = '<b>'+esc(a.c)+'</b><small>'+esc(FL[a.f]||a.f)+': '+esc(a.a||'—')+' → '+esc(a.b||'—')+'</small>'; var r = rowById(a.id); can = !!r && String(r[a.f]==null?'':r[a.f])===a.b; btn = can ? '<button type="button" class="d27-btn sm" data-d33undo="'+i+'">↶ Undo</button>' : ''; }
      else if(a.k==='add'){ label = '<b>'+esc(a.c)+'</b><small>call added</small>'; }
      else { label = '<b>'+esc(a.c)+'</b><small>call removed</small>'; var back = !rowById(a.id) && a.row; btn = back ? '<button type="button" class="d27-btn sm" data-d33undo="'+i+'">↶ Restore</button>' : ''; }
      return '<div class="d27-row" style="cursor:default"><span class="t">'+when+'</span><span class="n">'+label+'</span><span class="o">'+btn+'</span></div>';
    }).join('') : '<div class="d27-empty">No edits recorded yet in this browser.</div>')+'</div>';
  }
  function undo(i){
    var A = audit().filter(function(a){ return a.d===state.date; }).slice(0,40), a = A[i]; if(!a) return;
    if(a.k==='chg'){ var r = rowById(a.id); if(!r) return; if(a.f==='woi') r.woi = a.a==='true'; else r[a.f] = a.a; }
    else if(a.k==='del' && a.row && !rowById(a.id)){ rows().push(a.row); }
    try{ markDirty(); render(); }catch(e){} toast('Undone');
  }

  /* ================= backup & restore ================= */
  var snaps = null;
  function backupHtml(){
    var h = '<p class="d29-p">The app already keeps an automatic snapshot before every import. You can also download everything, or roll today back.</p><div class="d27-actions"><button type="button" class="d27-btn" data-d33bk="dl">⬇ Download full backup</button><label class="d27-btn ghost" style="cursor:pointer">⬆ Restore from file<input type="file" accept="application/json,.json" data-d33bk="file" hidden></label></div>';
    h += '<div class="d27-sec"><b>Snapshots of '+esc(state.date)+'</b><span>'+(snaps?snaps.length:'…')+'</span></div><div class="d27-list">';
    h += snaps===null ? '<div class="d27-empty">Loading…</div>' : snaps.length ? snaps.slice(0,15).map(function(b){ return '<div class="d27-row" style="cursor:default"><span class="n"><b>'+esc(new Date(b.created_at).toLocaleString([], {day:'numeric',month:'short',hour:'numeric',minute:'2-digit'}))+'</b><small>'+esc(b.reason||'')+'</small></span><button type="button" class="d27-btn sm" data-d33snap="'+esc(b.id)+'">Restore</button></div>'; }).join('') : '<div class="d27-empty">No snapshots for this day.</div>';
    return h + '</div>';
  }

  /* ================= hub dispatcher ================= */
  var cur = null;
  function open(k){
    var M = {
      reply:['Reply builder','MESSAGES', replyHtml], wrap:['End-of-day wrap','SUMMARY', wrapHtml], carry:['Carry-forward','YESTERDAY', function(){ return '<div class="d27-empty">Loading…</div>'; }],
      email:['Paste an email','CLEAN & READ', emailHtml], score:['Client scorecard','CLIENT', function(){ return scoreHtml(hist()); }], fair:['Workload','FAIRNESS', function(){ return workHtml(hist()); }],
      changes:['Changes & undo','HISTORY', changesHtml], backup:['Backup & restore','SAFETY', backupHtml]
    }[k];
    if(!M) return window.d34Open ? window.d34Open(k) : false; cur = k;
    if(k==='reply' && !rpId) rpIdx = 0;
    var el = ov('d33T', M[0], M[1], M[2]()); el.__k = k;
    el.addEventListener('click', onTool);
    if(k==='carry') loadCarry().then(function(L){ carry = L; if(el.isConnected) body(el, carryHtml(L)); });
    if(k==='score' || k==='fair') ensureHist(function(H){ if(el.isConnected) body(el, k==='score'? scoreHtml(H) : workHtml(H)); });
    if(k==='backup'){ snaps = null; if(typeof loadBackupsList==='function') loadBackupsList(state.date).then(function(L){ snaps = L; if(el.isConnected) body(el, backupHtml()); }); }
    return true;
  }
  window.d33Open = open;
  function repaint(el){ var k = el.__k; var fn = {reply:replyHtml, wrap:wrapHtml, email:emailHtml, changes:changesHtml, backup:backupHtml, score:function(){ return scoreHtml(hist()); }, fair:function(){ return workHtml(hist()); }, carry:function(){ return carryHtml(carry); }}[k]; if(fn) body(el, fn()); }
  async function onTool(e){
    var el = e.currentTarget, t = e.target; if(!t.closest) return; var b;
    if((b = t.closest('[data-d33rpick]'))){ rpId = b.getAttribute('data-d33rpick'); rpIdx = 0; repaint(el); return; }
    if((b = t.closest('[data-d33rpt]'))){ rpIdx = +b.getAttribute('data-d33rpt'); repaint(el); return; }
    if((b = t.closest('[data-d33rpcopy]'))){ copy((document.getElementById('d33rpm')||{}).value||'', b); return; }
    if(t.closest('[data-d33rpback]')){ rpId = null; repaint(el); return; }
    if((b = t.closest('[data-d33wrcopy]'))){ copy((document.getElementById('d33wr')||{}).value||'', b); LS.s('cd.wrap.'+state.date, '1'); return; }
    if((b = t.closest('[data-d33t]'))){ open(b.getAttribute('data-d33t')); return; }
    if((b = t.closest('[data-d33cmove]'))){ var r = carry && carry[+b.getAttribute('data-d33cmove')]; if(!r) return; var c = JSON.parse(JSON.stringify(r)); delete c._prev; delete c._date; c.id = uid(); c.status = ''; c.statusFields = []; c.woi = true; c.time = ''; c.drivingPerson = ''; rows().push(c); try{ markDirty(); render(); }catch(x){} carry = carry.filter(function(x){ return x!==r; }); toast('Moved '+r.candidate+' to today (waiting for invite)'); repaint(el); return; }
    if((b = t.closest('[data-d33cskip]'))){ var r2 = carry && carry[+b.getAttribute('data-d33cskip')]; if(!r2) return; var dx = dismissed(); dx[r2._prev+'|'+carryKey(r2)] = 1; LS.s('cd.carry.x', JSON.stringify(dx)); carry = carry.filter(function(x){ return x!==r2; }); repaint(el); return; }
    if(t.closest('[data-d33emread]')){ emailTxt = (document.getElementById('d33em')||{}).value||''; repaint(el); return; }
    if(t.closest('[data-d33emgo]')){ var txt = window.__d33mail||''; if(!txt) return; closeOv(el); try{ closeAllPanels(); state.showImport = true; state.showRescheduleImport = false; render(); }catch(x){} var tries = 0; (function put(){ var ta = document.getElementById('importText'); if(ta){ ta.value = txt; ta.dispatchEvent(new Event('input',{bubbles:true})); } else if(tries++<20) setTimeout(put,150); })(); return; }
    if((b = t.closest('[data-d33sc]'))){ scoreCo = b.getAttribute('data-d33sc'); repaint(el); return; }
    if(t.closest('[data-d33sback]')){ scoreCo = null; repaint(el); return; }
    if((b = t.closest('[data-d33wl]'))){ wlStart = deskDateAdd(wlStart, 7*(+b.getAttribute('data-d33wl'))); repaint(el); return; }
    if((b = t.closest('[data-d33ctab]'))){ chTab = b.getAttribute('data-d33ctab'); repaint(el); return; }
    if((b = t.closest('[data-d33undo]'))){ undo(+b.getAttribute('data-d33undo')); setTimeout(function(){ prevMap = null; diffNow(); repaint(el); }, 200); return; }
    if((b = t.closest('[data-d33snap]'))){
      var id = b.getAttribute('data-d33snap'), bk = (snaps||[]).filter(function(x){ return String(x.id)===String(id); })[0], lb = bk ? new Date(bk.created_at).toLocaleString() : 'this snapshot';
      var go = window.cdConfirm ? await window.cdConfirm('Restore '+state.date+' from '+lb+'? Today’s current calls are backed up first, so this can be undone.', {title:'Restore snapshot'}) : confirm('Restore from '+lb+'?'); if(!go) return;
      try{ await createBackup('pre-restore', state.date, state.rows); var rs = await restoreBackup(id); state.rows = rs.rows; markDirty(); render(); await saveAllChanges(); toast('Restored '+rs.rows.length+' calls'); closeOv(el); }catch(x){ toast('Restore failed: '+x.message); }
      return; }
    if((b = t.closest('[data-d33bk]')) && b.getAttribute('data-d33bk')==='dl'){ try{ downloadFullBackup(); }catch(x){} return; }
  }
  document.addEventListener('change', async function(e){
    var f = e.target.closest && e.target.closest('input[data-d33bk="file"]'); if(!f || !f.files || !f.files[0]) return;
    var el = document.getElementById('d33T'); var file = f.files[0]; f.value = '';
    try{
      var data = JSON.parse(await file.text()), day = data.days && data.days[state.date];
      if(!day || !Array.isArray(day.rows)){ toast('That file has no calls for '+state.date); return; }
      var go = window.cdConfirm ? await window.cdConfirm('Replace '+state.date+' ('+rows().length+' calls) with the '+day.rows.length+' calls in this file? Current calls are backed up first.', {title:'Restore from file'}) : confirm('Restore?'); if(!go) return;
      await createBackup('pre-restore', state.date, state.rows); state.rows = day.rows; if(Array.isArray(day.notes)) state.notes = day.notes; markDirty(); render(); await saveAllChanges(); toast('Restored '+day.rows.length+' calls'); if(el) closeOv(el);
    }catch(x){ toast('Could not read that backup file'); }
  }, true);

  /* ================= global click wiring ================= */
  document.addEventListener('click', function(e){
    var t = e.target; if(!t.closest) return; var b;
    if((b = t.closest('[data-d33rp]'))){ e.preventDefault(); e.stopPropagation(); rpId = b.getAttribute('data-d33rp'); rpIdx = 0; open('reply'); return; }
    if((b = t.closest('[data-d33fix]'))){ var id = b.getAttribute('data-d33fix'); var bar = document.getElementById('d33Casc'); if(bar) bar.remove(); var tmp = document.createElement('button'); tmp.setAttribute('data-d29qa','rs'); tmp.setAttribute('data-id', id); document.body.appendChild(tmp); tmp.click(); tmp.remove(); return; }
    if((b = t.closest('[data-d33chase]'))){ var r = rowById(b.getAttribute('data-d33chase')); if(r && window.d29ChaseMsg) copy(window.d29ChaseMsg(r), b); return; }
    if((b = t.closest('[data-d33open]'))){ var nx = document.getElementById('d33Next'); if(nx) nx.remove(); if(window.d23Open) window.d23Open(b.getAttribute('data-d33open')); return; }
    if((b = t.closest('#d33Left [data-d33t]'))){ var lf = document.getElementById('d33Left'); if(lf) lf.remove(); chTab = 'left'; open('changes'); return; }
  }, true);

  /* ================= pre-import check ================= */
  function importIssues(){
    var ta = document.getElementById('importText'); if(!ta || !ta.value.trim()) return [];
    var P = []; try{ P = parseImportText(ta.value, state.date, state.importDefaultRound || '1st'); }catch(e){ return []; }
    var dEl = document.getElementById('importDate'), target = (dEl && dEl.value) || state.date;
    var cur = P.filter(function(r){ return !r._targetDate || r._targetDate===target; }).filter(function(r){ return r.candidate; });
    var out = [], board = target===state.date ? rows().filter(function(r){ return r.candidate && !r.woi && !r.status; }) : [];
    var range = function(r){ var m = timeToMinutes(r.time); return m===9999 ? null : [m, m+dur(r)]; };
    cur.forEach(function(r, i){
      var rg = range(r);
      if(!r.woi && !rg) out.push(['🕒', r.candidate+' has no readable time', 'Line will be added without a time.']);
      for(var j=i+1;j<cur.length;j++){ var o = cur[j]; if(nk(o.candidate)!==nk(r.candidate)) continue; var og = range(o);
        if(rg && og && rg[0]<og[1] && og[0]<rg[1]) out.push(['⏱', r.candidate+' is booked twice at once', (r.time||'?')+' ('+(r.duration||'30 min?')+') and '+(o.time||'?')+' ('+(o.duration||'30 min?')+') in this paste.']);
        else if(sameCo(r.company,o.company) && (r.round||'')===(o.round||'')) out.push(['👯', r.candidate+' appears twice for '+(r.company||'the same client'), 'Same round, in this paste.']); }
      board.forEach(function(x){ if(nk(x.candidate)!==nk(r.candidate)) return; var xg = range(x);
        if(rg && xg && timeToMinutes(r.time)===timeToMinutes(x.time) && sameCo(r.company,x.company)) out.push(['👯', r.candidate+' is already on the board', 'Same client and time ('+x.time+').']);
        else if(rg && xg && rg[0]<xg[1] && xg[0]<rg[1]) out.push(['⏱', r.candidate+' would overlap an existing call', (r.time)+' vs '+x.time+' at '+(x.company||'another client')+'.']); });
      var o2 = null, ms = timeToMinutes(r.time);
      if(rg){ var CZ = {USA:'America/New_York', UK:'Europe/London', Ireland:'Europe/Dublin', Canada:'America/Toronto', Germany:'Europe/Berlin'}[r.country||'USA']; if(CZ){ try{ var p = target.split('-').map(Number), ms2 = Date.UTC(p[0],p[1]-1,p[2]+(bd(r.time)>=720?1:0)) + (ms-330)*60000, h = +new Intl.DateTimeFormat('en-US',{timeZone:CZ, hour:'numeric', hour12:false}).format(new Date(ms2)) % 24; if(h<7 || h>=20) out.push(['🌙', r.candidate+' is outside business hours there', (r.country||'USA')+' local time is about '+(h%12||12)+(h>=12?' PM':' AM')+'.']); }catch(x){} } }
    });
    var H = hist(); if(H){ var seen = {}; cur.forEach(function(r){ if(r.woi) return; var k = nk(r.candidate)+'|'+ck(r.company)+'|'+String(r.round||'').toLowerCase(); if(seen[k]) return; seen[k] = 1;
      var prev = H.filter(function(h){ return h && h._date && h._date<state.date && !h.woi && !h.status && (nk(h.candidate)+'|'+ck(h.company)+'|'+String(h.round||'').toLowerCase())===k; })[0];
      if(prev) out.push(['🔁', r.candidate+' already had this round', (r.company||'')+' · '+(r.round||'')+' on '+prev._date+'.']); }); }
    return out.slice(0, 12);
  }
  var bypass = false;
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('#runImport'); if(!b || bypass) return;
    var iss = []; try{ iss = importIssues(); }catch(x){ console.warn('d33 check', x); }
    if(!iss.length) return;
    e.stopImmediatePropagation(); e.preventDefault();
    var el = ov('d33Chk', 'Check before adding', iss.length+' thing'+(iss.length===1?'':'s')+' to look at',
      '<div class="d27-list">'+iss.map(function(i){ return '<div class="d27-row" style="cursor:default"><span class="t">'+i[0]+'</span><span class="n"><b>'+esc(i[1])+'</b><small style="white-space:normal">'+esc(i[2])+'</small></span></div>'; }).join('')+'</div><div class="d27-actions"><button type="button" class="d27-btn" data-d33addany>Add anyway</button><button type="button" class="d27-btn ghost" data-d33x>Go back and edit</button></div>');
    el.addEventListener('click', function(ev){ if(ev.target.closest('[data-d33addany]')){ closeOv(el); bypass = true; var rb = document.getElementById('runImport'); if(rb) rb.click(); setTimeout(function(){ bypass = false; }, 400); } });
  }, true);

  /* ================= nudges + install ================= */
  var pn = window.d28Nudges;
  window.d28Nudges = function(){
    var base = []; try{ base = pn ? pn() : []; }catch(e){}
    var ex = [];
    try{ if(nowBd()>=1260 && !LS.g('cd.wrap.'+state.date,'')) ex.push({ic:'🌙', t:'End-of-day wrap is ready', s:'open 🧰 Tools → End-of-day wrap', tool:'wrap'}); }catch(e){}
    return base.concat(ex).slice(0, 9);
  };
  var rt = 0;
  function install(){
    if(typeof window.render!=='function' || !window.__d17vw){ return setTimeout(install,300); }
    var o = window.render;
    window.render = function(){ var r = o.apply(this, arguments); afterRender(); setTimeout(checkLeft, 1200); return r; };
    setInterval(function(){ try{ nextCard(); }catch(e){} }, 30000);
    setInterval(function(){ saveSeen(true); }, 20000);
    document.addEventListener('visibilitychange', function(){ if(document.hidden) saveSeen(true); else { seenChecked = false; setTimeout(checkLeft, 800); } });
    addEventListener('pagehide', function(){ saveSeen(true); });
    var kick = function(){ ensureHist(function(){ buildRel(); decorate(); }); };
    setTimeout(function(){ if('requestIdleCallback' in window) requestIdleCallback(kick, {timeout:8000}); else kick(); }, 6000);
    setInterval(function(){ if(Date.now()-relAt > 600000) ensureHist(function(){ buildRel(); decorate(); }); }, 120000);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== d34: V2.6 — notification buttons, learned owners, my incentives, prep card, domain trend ===== */
;(function(){
  if(window.__d34) return; window.__d34 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var LS = { g:function(k,d){ try{ var v=localStorage.getItem(k); return v==null?d:v; }catch(e){ return d; } }, s:function(k,v){ try{ localStorage.setItem(k,v); }catch(e){} } };
  var J = function(k,d){ try{ var v = JSON.parse(LS.g(k,'')); return v==null?d:v; }catch(e){ return d; } };
  var bd = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var nk = function(c){ try{ return normalizeNameKey(c||''); }catch(e){ return String(c||'').toLowerCase().replace(/[^a-z]/g,''); } };
  var ck = function(c){ try{ return normalizeCompanyKey(c||''); }catch(e){ return String(c||'').toLowerCase().replace(/[^a-z0-9]/g,''); } };
  var sameCo = function(a,b){ try{ return ck(a)===ck(b) || fuzzyCompanyKeyMatch(a,b); }catch(e){ return ck(a)===ck(b); } };
  var rows = function(){ return state.rows||[]; };
  var rowById = function(id){ return rows().filter(function(r){ return String(r.id)===String(id); })[0] || null; };
  var ownOf = function(r){ try{ return window.cdOwnerOf ? window.cdOwnerOf(r) : null; }catch(e){ return null; } };
  var ownerName = function(r){ var o = ownOf(r); return o && o.name ? o.name : (r.assignee||''); };
  var isTeam = function(n){ try{ return getTeamNames().has(n); }catch(e){ return false; } };
  var hist = function(){ try{ return (typeof _allRowsAcrossDatesCache!=='undefined') ? _allRowsAcrossDatesCache : null; }catch(e){ return null; } };
  var short = function(d){ try{ return new Date(d+'T00:00:00').toLocaleDateString(undefined,{day:'numeric',month:'short',year:'2-digit'}); }catch(e){ return d||''; } };
  var admin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  var toast = function(m){ try{ if(window.d2Toast) window.d2Toast(m,{ms:4000}); }catch(e){} };
  var ST = {rescheduled:['🔁','Rescheduled'], cancelled:['✕','Cancelled'], not_responded:['☎','No response'], no_invite:['📨','No invite']};
  var inr = function(n){ try{ return '₹'+Number(n||0).toLocaleString('en-IN'); }catch(e){ return '₹'+n; } };
  function ensureHist(cb){ if(hist()) return cb(hist()); if(typeof fetchAllRowsAcrossDates!=='function') return cb(null); fetchAllRowsAcrossDates().then(function(h){ cb(h||hist()); }).catch(function(){ cb(null); }); }
  function ov(id, title, kicker, body){
    var old = document.getElementById(id); if(old) old.remove();
    var el = document.createElement('div'); el.id = id; el.className = 'd27-ov d34-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>'+esc(kicker)+'</small><h2>'+esc(title)+'</h2></div><button type="button" class="d27-x" data-d34x aria-label="Close">✕</button></div><div class="d29-body d34-body">'+body+'</div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d34x]'))) closeOv(el); });
    return el;
  }
  function closeOv(el){ if(el && el.parentNode) el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); }
  function setBody(el, html){ var b = el.querySelector('.d34-body'); if(b){ var sc = el.scrollTop; b.innerHTML = html; el.scrollTop = sc; } }
  var sum = function(items){ return '<div class="d29-sum">'+items.map(function(i){ return '<span class="'+(i[2]||'')+'"><b>'+i[0]+'</b> '+i[1]+'</span>'; }).join('')+'</div>'; };
  var row3 = function(a,b,c){ return '<div class="d27-row" style="cursor:default"><span class="t">'+a+'</span><span class="n">'+b+'</span><span class="o">'+(c||'')+'</span></div>'; };

  /* ================= notification buttons ================= */
  var oShow = window.cdShowNotification;
  if(typeof oShow==='function'){
    window.cdShowNotification = function(title, opts){
      opts = opts || {}; var d = opts.data || {};
      if(!opts.actions && d.date && (d.id || d.candidate) && d.kind!=='gdoc'){ try{ if(!('maxActions' in Notification) || Notification.maxActions>0) opts.actions = [{action:'st:confirmed', title:'✅ Confirmed'},{action:'st:not_responded', title:'☎ No-show'},{action:'st:rescheduled', title:'🔁 Rescheduled'}]; }catch(e){} }
      return oShow.call(this, title, opts);
    };
  }
  /* leave sign-in details where the service worker can reach them */
  var lastStash = '';
  function stash(){
    try{
      if(!('indexedDB' in window) || typeof API_BASE_URL==='undefined' || !API_BASE_URL) return;
      var v = JSON.stringify({base:API_BASE_URL, pw:(typeof ADMIN_PASSWORD!=='undefined'?ADMIN_PASSWORD:''), user:(typeof CURRENT_USERNAME!=='undefined'?CURRENT_USERNAME:'')});
      if(v===lastStash || state.needsLogin) return; lastStash = v;
      var r = indexedDB.open('cd-sw', 1);
      r.onupgradeneeded = function(){ r.result.createObjectStore('kv'); };
      r.onsuccess = function(){ try{ r.result.transaction('kv','readwrite').objectStore('kv').put(JSON.parse(v), 'auth'); }catch(e){} };
    }catch(e){}
  }
  try{
    if('serviceWorker' in navigator) navigator.serviceWorker.addEventListener('message', function(e){
      if(!e.data || e.data.type!=='cd-refresh') return;
      if(e.data.date && e.data.date!==state.date) return;
      if(state.dirty){ toast('A call was updated from a notification — save or reload to see it'); return; }
      try{ loadDay(state.date).then(function(){ render(); toast('Updated from the notification'); }); }catch(x){}
    });
  }catch(e){}

  /* ================= learned owners ================= */
  var LEARN = J('cd.learn', {c:{}, f:{}}), learnLoaded = false, saveT = 0;
  var fam = function(r){ try{ return deskRoleFamily(r.role||''); }catch(e){ return ''; } };
  window.d34Learn = function(row, person){
    var k = ck(row.company); if(!k) return 0; var n = 0;
    n += ((LEARN.c[k]||{})[person]||0);
    var f = fam(row); if(f) n += 0.5*(((LEARN.f[k+'|'+f]||{})[person])||0);
    return n;
  };
  function learnSave(){
    LS.s('cd.learn', JSON.stringify(LEARN)); clearTimeout(saveT);
    saveT = setTimeout(function(){ if(!admin()) return; try{ apiCall('app_settings', {method:'POST', body:{key:'assign_learn', value:JSON.stringify(LEARN)}}).catch(function(){}); }catch(e){} }, 4000);
  }
  var lastRec = '';
  function record(id, person){
    var r = rowById(id); if(!r || !person || isTeam(person) || !r.company) return;
    var key = id+'|'+person+'|'+Math.floor(Date.now()/2000); if(key===lastRec) return; lastRec = key;
    var k = ck(r.company); (LEARN.c[k] = LEARN.c[k] || {})[person] = ((LEARN.c[k]||{})[person]||0)+1;
    var f = fam(r); if(f){ var fk = k+'|'+f; (LEARN.f[fk] = LEARN.f[fk] || {})[person] = ((LEARN.f[fk]||{})[person]||0)+1; }
    learnSave();
  }
  document.addEventListener('change', function(e){
    var sel = e.target.closest && e.target.closest('select[data-field="assignee"]'); if(!sel) return;
    var tr = sel.closest('tr'); if(!tr) return; record(tr.getAttribute('data-id'), sel.value);
  }, true);
  window.d34Rec = record;
  async function loadLearn(){
    if(learnLoaded) return; learnLoaded = true;
    try{ var d = await apiCall('app_settings', {qs:'key=assign_learn'}); if(d && d.value){ var S = JSON.parse(d.value)||{}; ['c','f'].forEach(function(t){ Object.keys(S[t]||{}).forEach(function(k){ Object.keys(S[t][k]).forEach(function(p){ LEARN[t][k] = LEARN[t][k] || {}; LEARN[t][k][p] = Math.max(LEARN[t][k][p]||0, S[t][k][p]); }); }); }); LS.s('cd.learn', JSON.stringify(LEARN)); } }catch(e){}
  }
  function learnHtml(){
    var names = {}; rows().forEach(function(r){ if(r.company) names[ck(r.company)] = r.company; });
    var L = Object.keys(LEARN.c).map(function(k){ var o = LEARN.c[k], ps = Object.keys(o).sort(function(a,b){ return o[b]-o[a]; }); return {k:k, name:names[k]||k, ps:ps, o:o}; }).filter(function(x){ return x.ps.length && x.o[x.ps[0]]>=1; }).sort(function(a,b){ return b.o[b.ps[0]]-a.o[a.ps[0]]; });
    return '<p class="d29-p">Every time you hand a client’s call to someone by hand, the app remembers. After 2 picks for the same client that person moves to the top of the suggestions with a ★. Counts only learn from assignments you make yourself.</p>'
      + (admin()?'':'<p class="d29-p">Only the admin’s picks are shared across devices.</p>')
      + '<div class="d27-list">'+(L.length? L.slice(0,40).map(function(x){ var top = x.ps[0]; return '<div class="d27-row" style="cursor:default"><span class="n"><b>'+esc(x.name)+'</b><small>'+x.ps.slice(0,3).map(function(p){ return esc(p)+' ×'+x.o[p]; }).join(' · ')+'</small></span><span class="o">'+(x.o[top]>=2?'★ ':'')+esc(top)+' <button type="button" class="d27-btn sm ghost" data-d34forget="'+esc(x.k)+'">Forget</button></span></div>'; }).join('') : '<div class="d27-empty">Nothing learned yet — assign a few calls by hand.</div>')+'</div>'
      + (L.length? '<div class="d27-actions"><button type="button" class="d27-btn ghost" data-d34forgetall>Forget everything</button></div>' : '');
  }

  /* ================= my incentives ================= */
  var incPerson = null, incData = null;
  function monthKeyOf(d){ return d.getFullYear()+'-'+pad2(d.getMonth()+1); }
  function pad2(n){ return (n<10?'0':'')+n; }
  async function fetchMonth(key){ try{ var r = await apiCall('portal_sync', {qs:'type=incentives&cached=1&month='+encodeURIComponent(key)}); return r && r.data ? {d:r.data, at:r.generatedAt||null} : null; }catch(e){ return null; } }
  async function loadInc(){
    var now = new Date(), cur = monthKeyOf(now), p = new Date(now.getFullYear(), now.getMonth()-1, 1);
    var A = await Promise.all([fetchMonth(cur), fetchMonth(monthKeyOf(p))]);
    var closures = null; try{ closures = await computeClosuresPerformance(); }catch(e){}
    incData = {cur:A[0], prev:A[1], key:cur, now:now, closures:closures}; return incData;
  }
  window.d34IncData = function(){ return (incData && Date.now()-incData.now.getTime()<600000) ? Promise.resolve(incData) : loadInc(); };
  function incHtml(){
    if(!incData) return '<div class="d27-empty">Loading…</div>';
    var C = incData.cur && incData.cur.d, P = incData.prev && incData.prev.d;
    if(!C || !(C.byHandler||[]).length) return '<div class="d27-empty">No incentive data saved for this month yet. Open Reports → Incentives and press Refresh once — or check your connection.<br><button type="button" class="d27-btn" style="margin-top:12px" data-d35retry="d34:incent">↻ Try again</button></div>';
    var H = C.byHandler.slice().sort(function(a,b){ return Number(b.total||0)-Number(a.total||0); });
    var names = H.map(function(h){ return h.handler; });
    if(!incPerson){ var me = ''; try{ me = getMyAssigneeName(); }catch(e){} var hit = me && names.filter(function(n){ try{ return namesEquivalent(n, me); }catch(e){ return n===me; } })[0]; incPerson = hit || names[0]; }
    var picker = '<select class="d29-ta" id="d34ip" style="min-height:42px;margin-top:0">'+names.map(function(n){ return '<option'+(n===incPerson?' selected':'')+'>'+esc(n)+'</option>'; }).join('')+'</select>';
    var i = names.indexOf(incPerson), me2 = H[i], tot = Number(me2.total||0), rank = i+1;
    var team = H.filter(function(h){ return (h.team||h.teamCode)===(me2.team||me2.teamCode); }), teamTot = team.reduce(function(t,h){ return t+Number(h.total||0); },0);
    var up = i>0 ? H[i-1] : null, down = H[i+1] || null;
    var pm = null; if(P){ pm = (P.byHandler||[]).filter(function(h){ return h.handler===incPerson; })[0]; }
    var now = incData.now, day = now.getDate(), dim = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate(), proj = day ? Math.round(tot/day*dim) : tot;
    var target = Number((state.appSettings||{}).incentive_monthly_target||0), grand = Number(C.grandTotal||0);
    var cl = null; try{ cl = ((incData.closures||{}).rows||[]).filter(function(r){ try{ return namesEquivalent(r.handler, incPerson); }catch(e){ return r.handler===incPerson; } })[0]; }catch(e){}
    var h = picker + '<div class="d34-big"><small>'+esc(new Date(incData.now).toLocaleString(undefined,{month:'long', year:'numeric'}))+' · so far</small><b>'+inr(tot)+'</b><span>#'+rank+' of '+H.length+(me2.team?' · '+esc(me2.team):'')+'</span></div>';
    h += sum([[inr(me2.promotion),'promotion'],[inr(me2.selection),'selection'],[Number(me2.records||0),'records']]);
    h += '<div class="d27-list">';
    if(up) h += row3('⬆','<b>'+inr(Number(up.total||0)-tot)+' to pass '+esc(up.handler)+'</b><small>currently #'+(rank-1)+'</small>','');
    else h += row3('🏆','<b>You are #1 this month</b>'+(down?'<small>lead of '+inr(tot-Number(down.total||0))+' over '+esc(down.handler)+'</small>':''),'');
    if(pm) { var dlt = tot-Number(pm.total||0); h += row3(dlt>=0?'📈':'📉','<b>'+(dlt>=0?'+':'−')+inr(Math.abs(dlt))+' vs last month</b><small>last month '+inr(pm.total)+' (full month)</small>',''); }
    h += row3('🧮','<b>On pace for '+inr(proj)+'</b><small>day '+day+' of '+dim+' at the current rate</small>','');
    if(teamTot) h += row3('👥','<b>'+Math.round(tot/teamTot*100)+'% of the team’s '+inr(teamTot)+'</b><small>'+team.length+' handlers</small>','');
    if(cl) h += row3('🏆','<b>'+cl.closures+' closure'+(cl.closures===1?'':'s')+' credited</b><small>all time, matched to calls</small>','');
    if(target && grand) h += row3('🎯','<b>Everyone together: '+Math.round(grand/target*100)+'% of the '+inr(target)+' target</b><small>'+inr(grand)+' so far</small>','');
    h += '</div><div class="d27-sec"><b>Leaderboard</b></div><div class="d27-load">'+H.slice(0,10).map(function(x){ var mx = Number(H[0].total||1); return '<div><span'+(x.handler===incPerson?' style="color:var(--teal);font-weight:700"':'')+'>'+esc(x.handler)+'</span><i><u style="width:'+Math.round(Number(x.total||0)/mx*100)+'%"></u></i><b>'+inr(x.total)+'</b></div>'; }).join('')+'</div>';
    var at = incData.cur.at; return h + '<p class="d29-p">'+(at?'Saved '+esc(new Date(at).toLocaleString())+' · ':'')+'Refresh in Reports → Incentives for the latest.</p>';
  }

  /* ================= prep card ================= */
  var prepId = null;
  function prepHtml(r, H){
    if(!r) return '<div class="d27-empty">Call not found.</div>';
    var h = '<div class="d29-rsh"><b>'+esc(r.candidate)+'</b><small>'+esc([r.time,r.company,r.role,r.round].filter(Boolean).join(' · '))+'</small><small>Owner: <b>'+esc(ownerName(r)||'not set')+'</b></small></div>';
    var rule = ''; try{ rule = window.d29RuleFor ? window.d29RuleFor(r.company) : ''; }catch(e){}
    if(rule) h += '<div class="d29-rule" style="margin-bottom:10px"><b>📌 '+esc(r.company)+' rule</b><span>'+esc(rule)+'</span></div>';
    var ho = ''; try{ var e = (state.notes||[]).filter(function(n){ return n && n.id===state.date+'-handover-ids'; })[0]; ho = e ? (JSON.parse(e.text)||{})[r.id] || '' : ''; }catch(x){}
    if(ho) h += '<div class="d29-rule" style="margin-bottom:10px"><b>📝 Handover note</b><span>'+esc(ho)+'</span></div>';
    if(!H) return h + '<div class="d27-empty">Loading history…</div>';
    var me = nk(r.candidate), P = H.filter(function(x){ return x && x.candidate && !x.woi && x._date && !(x._date===state.date && x.candidate===r.candidate && (x.time||'')===(r.time||'') && (x.round||'')===(r.round||'')); });
    var mine = P.filter(function(x){ return nk(x.candidate)===me; }).sort(function(a,b){ return b._date.localeCompare(a._date); });
    var here = mine.filter(function(x){ return sameCo(x.company, r.company); }), elsewhere = mine.filter(function(x){ return !sameCo(x.company, r.company); });
    var bad = mine.filter(function(x){ return x.status; }).length, noshow = mine.filter(function(x){ return x.status==='not_responded' || x.status==='no_invite'; }).length;
    h += sum([[here.length,'calls at this client'],[elsewhere.length,'elsewhere'],[bad,'did not go ahead', bad>=2?'bad':''],[noshow,'no-shows', noshow>=2?'bad':'']]);
    h += '<div class="d27-sec"><b>This candidate at '+esc(r.company||'this client')+'</b></div><div class="d27-list">'+(here.length? here.slice(0,8).map(function(x){ var st = ST[x.status]; return row3(esc(short(x._date)), '<b>'+esc(x.round||'—')+'</b><small>'+esc(x.drivingPerson||x.assignee||'—')+(st?' · '+st[0]+' '+st[1]:' · went ahead')+'</small>',''); }).join('') : '<div class="d27-empty">First call at this client.</div>')+'</div>';
    var o = ownerName(r), lastWithOwner = o && !isTeam(o) ? mine.filter(function(x){ return (x.drivingPerson||x.assignee)===o; })[0] : null;
    if(o && !isTeam(o)) h += '<div class="d27-sec"><b>'+esc(o)+'’s last call with them</b></div><div class="d27-list">'+(lastWithOwner? row3(esc(short(lastWithOwner._date)), '<b>'+esc(lastWithOwner.company||'')+'</b><small>'+esc(lastWithOwner.round||'')+(ST[lastWithOwner.status]?' · '+ST[lastWithOwner.status][1]:'')+'</small>','') : '<div class="d27-empty">'+(o&&!isTeam(o)?esc(o)+' has not handled this candidate before.':'No owner yet.')+'</div>')+'</div>';
    var last = here[0] && (here[0].drivingPerson||here[0].assignee); if(last && last!==o && !isTeam(last)) h += '<p class="d29-p">Last time at this client it was handled by <b>'+esc(last)+'</b>'+(ST[here[0].status]?' ('+esc(ST[here[0].status][1])+')':'')+'.</p>';
    var al = function(a,b){ try{ return rolesAlike(a,b); }catch(e){ return false; } };
    var same = r.role ? P.filter(function(x){ return x.candidate && nk(x.candidate)!==me && sameCo(x.company, r.company) && al(x.role, r.role); }) : [];
    if(same.length){ var who = {}; same.forEach(function(x){ var w = (x.drivingPerson||x.assignee||'').trim(); if(w && !isTeam(w)) who[w] = (who[w]||0)+1; }); var top = Object.keys(who).sort(function(a,b){ return who[b]-who[a]; })[0]; h += '<p class="d29-p">'+same.length+' other candidate'+(same.length===1?'':'s')+' interviewed for this role here'+(top?' — mostly handled by <b>'+esc(top)+'</b>':'')+'.</p>'; }
    h += window.d48Block ? window.d48Block(r.candidate,'d27-sec') : '';
    var rel = window.d33Rel ? window.d33Rel(r.candidate) : null; if(rel && rel.bad>=2) h += '<div class="d33-relnote">🚩 '+rel.bad+' of '+rel.n+' earlier calls were no-shows or candidate-side reschedules — confirm early.</div>';
    return h;
  }

  /* ================= domain trend ================= */
  var dtWeeks = 12, dtSel = null;
  var DCOL = ['#4cc9f0','#f72585','#ffd166','#06d6a0','#b388ff','#ff9f1c','#90be6d','#e76f51'];
  function dtData(H){
    var today = todayDateString(), w0 = deskMonday(deskDateAdd(today, -7*(dtWeeks-1))), weeks = [];
    for(var i=0;i<dtWeeks;i++) weeks.push(deskDateAdd(w0, 7*i));
    var by = {}, tot = new Array(dtWeeks).fill(0);
    H.forEach(function(r){ if(!r || !r.candidate || r.woi || !r._date || r._date<w0) return; var idx = Math.floor((new Date(r._date+'T00:00:00Z')-new Date(w0+'T00:00:00Z'))/604800000); if(idx<0||idx>=dtWeeks) return;
      var d = deskDomain(r.role); if(/^(No role given|Other \/ unclassified)$/.test(d)) return; (by[d] = by[d] || new Array(dtWeeks).fill(0))[idx]++; tot[idx]++; });
    var list = Object.keys(by).map(function(k){ var v = by[k], sumAll = v.reduce(function(a,b){ return a+b; },0), last = v[dtWeeks-2], base = (v[dtWeeks-6]+v[dtWeeks-5]+v[dtWeeks-4]+v[dtWeeks-3])/4, cur = v[dtWeeks-1];
      var chg = base>0 ? (last-base)/base : (last>0?1:0), tag = (last>=3 && chg>=.25) ? 'rising' : (base>=3 && chg<=-.25) ? 'falling' : 'steady'; return {name:k, v:v, n:sumAll, last:last, base:base, cur:cur, chg:chg, tag:tag}; }).sort(function(a,b){ return b.n-a.n; });
    return {weeks:weeks, list:list, today:today};
  }
  function chartSvg(D, show){
    var W = 640, Hh = 220, L = 34, R = 12, T = 12, B = 26, n = D.weeks.length, mx = 1;
    show.forEach(function(d){ d.v.forEach(function(x){ if(x>mx) mx = x; }); });
    var X = function(i){ return L + i*(W-L-R)/(n-1); }, Y = function(v){ return T + (Hh-T-B)*(1 - v/mx); };
    var g = '';
    [0,.5,1].forEach(function(f){ var y = Y(mx*f); g += '<line x1="'+L+'" x2="'+(W-R)+'" y1="'+y+'" y2="'+y+'" stroke="currentColor" stroke-opacity=".12"/><text x="'+(L-6)+'" y="'+(y+4)+'" text-anchor="end" font-size="10" fill="currentColor" opacity=".6">'+Math.round(mx*f)+'</text>'; });
    D.weeks.forEach(function(w, i){ if(i%2===0 || i===n-1) g += '<text x="'+X(i)+'" y="'+(Hh-8)+'" text-anchor="middle" font-size="10" fill="currentColor" opacity=".6">'+w.slice(5)+'</text>'; });
    show.forEach(function(d, k){ var c = DCOL[D.list.indexOf(d)%DCOL.length]; var pts = d.v.map(function(v,i){ return X(i)+','+Y(v); }).join(' ');
      g += '<polyline fill="none" stroke="'+c+'" stroke-width="2.2" stroke-linejoin="round" points="'+pts+'"/>'+d.v.map(function(v,i){ return i===n-1 ? '<circle cx="'+X(i)+'" cy="'+Y(v)+'" r="3.5" fill="'+c+'"/>' : ''; }).join(''); });
    return '<svg viewBox="0 0 '+W+' '+Hh+'" width="100%" role="img" aria-label="Calls per week by domain" style="color:var(--text)">'+g+'</svg>';
  }
  function dtHtml(H){
    if(!H) return '<div class="d27-empty">Reading every saved day…</div>';
    var D = dtData(H); if(!D.list.length) return '<div class="d27-empty">No calls with a recognisable domain in these weeks.</div>';
    var show = dtSel ? D.list.filter(function(d){ return d.name===dtSel; }) : D.list.slice(0,6);
    var ris = D.list.filter(function(d){ return d.tag==='rising'; }), fal = D.list.filter(function(d){ return d.tag==='falling'; });
    var h = '<div class="d29-seg wrap">'+[8,12,26].map(function(w){ return '<button type="button" class="'+(dtWeeks===w?'on':'')+'" data-d34dw="'+w+'">'+w+' weeks</button>'; }).join('')+(dtSel?'<button type="button" data-d34dsel="">Show top 6</button>':'')+'</div>';
    h += sum([[ris.length,'rising'],[fal.length,'falling',fal.length?'bad':''],[D.list.length,'domains']]);
    h += chartSvg(D, show);
    h += '<div class="d29-legend">'+show.map(function(d){ return '<span><i style="background:'+DCOL[D.list.indexOf(d)%DCOL.length]+'"></i>'+esc(d.name)+'</span>'; }).join('')+'</div>';
    h += '<p class="d29-p">Weeks start Monday; the last point is the week so far. Rising / falling compares the last full week with the average of the 4 weeks before it (needs at least 3 calls and a 25% change).</p>';
    h += '<div class="d27-list">'+D.list.map(function(d){ var t = d.tag==='rising'?'▲ rising':d.tag==='falling'?'▼ falling':'● steady', cls = d.tag==='rising'?'color:#06d6a0':d.tag==='falling'?'color:#ff6b6b':'opacity:.7';
      return '<button type="button" class="d27-row" data-d34dsel="'+esc(d.name)+'"><span class="n"><b>'+esc(d.name)+'</b><small>'+d.last+' last week · avg '+d.base.toFixed(1)+' before · '+d.cur+' this week</small></span><span class="o" style="'+cls+'">'+t+(d.base>0?' '+(d.chg>=0?'+':'')+Math.round(d.chg*100)+'%':'')+'</span></button>'; }).join('')+'</div>';
    return h;
  }

  /* ================= hub dispatcher ================= */
  function open(k){
    var el;
    if(k==='learn'){ el = ov('d34T','Learned owners','SUGGESTIONS',learnHtml()); el.__k = k; }
    else if(k==='incent'){ el = ov('d34T','My incentives','THIS MONTH','<div class="d27-empty">Loading…</div>'); el.__k = k; loadInc().then(function(){ if(el.isConnected) setBody(el, incHtml()); }).catch(function(){ if(el.isConnected) setBody(el, window.d35Fail('d34:incent')); }); }
    else if(k==='prep'){ prepId = null; el = ov('d34T','Prep a call','BEFORE THE CALL', prepPick()); el.__k = k; }
    else if(k==='dtrend'){ el = ov('d34T','Domain trend','DEMAND BY WEEK', dtHtml(hist())); el.__k = k; ensureHist(function(H){ if(el.isConnected) setBody(el, H ? dtHtml(H) : window.d35Fail('d34:dtrend')); }); }
    else return window.d35Open ? window.d35Open(k) : false;
    el.addEventListener('click', onTool); el.addEventListener('change', function(e){ if(e.target.id==='d34ip'){ incPerson = e.target.value; setBody(el, incHtml()); } });
    return true;
  }
  window.d34Open = open;
  function prepPick(){ var L = rows().filter(function(r){ return !r.woi && !r.status && r.candidate; }).sort(function(a,b){ return bd(a.time)-bd(b.time); });
    return '<p class="d29-p">Pick the call.</p><div class="d27-list">'+(L.length? L.map(function(x){ return '<button type="button" class="d27-row" data-d34prep="'+esc(x.id)+'"><span class="t">'+esc(x.time||'')+'</span><span class="n"><b>'+esc(x.candidate)+'</b><small>'+esc([x.company,x.round].filter(Boolean).join(' · '))+'</small></span><span class="o">›</span></button>'; }).join('') : '<div class="d27-empty">No live calls.</div>')+'</div>'; }
  function openPrep(id){
    var r = rowById(id); if(!r) return;
    var el = document.getElementById('d34T') && document.getElementById('d34T').__k==='prep' ? document.getElementById('d34T') : ov('d34T','Prep card','BEFORE THE CALL','');
    el.__k = 'prep'; el.addEventListener('click', onTool);
    setBody(el, prepHtml(r, hist())); if(!hist()) ensureHist(function(H){ if(el.isConnected) setBody(el, H ? prepHtml(r, H) : window.d35Fail('d34:prep:'+r.id)); });
  }
  window.d34Prep = openPrep;
  window.d34PrepHtml = function(r){ var H = hist(); return H ? prepHtml(r, H) : ''; };
  async function onTool(e){
    var el = e.currentTarget, t = e.target; if(!t.closest) return; var b;
    if((b = t.closest('[data-d35retry]'))){ var rk = b.getAttribute('data-d35retry'); if(rk.indexOf('d34:prep:')===0){ openPrep(rk.slice(9)); } else if(rk==='d34:dtrend'){ setBody(el,'<div class="d27-empty">Reading every saved day…</div>'); ensureHist(function(H){ setBody(el, H ? dtHtml(H) : window.d35Fail(rk)); }); } else { setBody(el,'<div class="d27-empty">Loading…</div>'); loadInc().then(function(){ setBody(el, incHtml()); }).catch(function(){ setBody(el, window.d35Fail(rk)); }); } return; }
    if((b = t.closest('[data-d34forget]'))){ delete LEARN.c[b.getAttribute('data-d34forget')]; Object.keys(LEARN.f).forEach(function(k){ if(k.indexOf(b.getAttribute('data-d34forget')+'|')===0) delete LEARN.f[k]; }); learnSave(); setBody(el, learnHtml()); return; }
    if(t.closest('[data-d34forgetall]')){ LEARN = {c:{}, f:{}}; learnSave(); setBody(el, learnHtml()); return; }
    if((b = t.closest('[data-d34dw]'))){ dtWeeks = +b.getAttribute('data-d34dw'); setBody(el, dtHtml(hist())); return; }
    if((b = t.closest('[data-d34dsel]'))){ dtSel = b.getAttribute('data-d34dsel') || null; setBody(el, dtHtml(hist())); return; }
  }
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('[data-d34prep]'); if(!b) return;
    e.preventDefault(); e.stopPropagation(); var nx = document.getElementById('d33Next'); if(nx) nx.remove(); openPrep(b.getAttribute('data-d34prep'));
  }, true);

  /* ================= install ================= */
  var rt = 0;
  function install(){
    if(typeof window.render!=='function' || !window.__d17vw){ return setTimeout(install,300); }
    var o = window.render;
    window.render = function(){ var r = o.apply(this, arguments); clearTimeout(rt); rt = setTimeout(function(){ try{ stash(); if(!state.needsLogin) loadLearn(); }catch(e){} }, 800); return r; };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* ===== d35: V2.7 — hub search + pins, shortcuts, quiet alerts, retry states ===== */
;(function(){
  if(window.__d35) return; window.__d35 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var LSg = function(k,d){ try{ var v = JSON.parse(localStorage.getItem(k)); return v==null?d:v; }catch(e){ return d; } };
  var LSs = function(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} };
  var phone = function(){ return (window.__d17vw||innerWidth)<760; };

  /* ---------- retry state ---------- */
  window.d35Fail = function(k){ return '<div class="d27-empty">Couldn’t load this just now — check your connection.<br><button type="button" class="d27-btn" style="margin-top:12px" data-d35retry="'+esc(k)+'">↻ Try again</button></div>'; };

  /* ---------- hub: search, pins, recent ---------- */
  var FAV = 'cd.tools.fav', REC = 'cd.tools.recent';
  function decorate(hub){
    var body = hub.querySelector('.d29-body'); if(!body) return;
    var grid = body.querySelector('.d29-grid'); if(!grid || body.querySelector('.d35-q')) return;
    var grid0 = grid, groups = body.querySelector('.d29-groups'), anchor = groups || grid;
    var fav = LSg(FAV,[]), rec = LSg(REC,[]);
    var tiles = Array.prototype.slice.call(body.querySelectorAll('.d29-tile'));
    var pinSec = null, pinGrid = null;
    if(groups){ pinSec = document.createElement('section'); pinSec.className = 'd29-grp d35-pinsec'; pinSec.innerHTML = '<div class="d29-gh">★ Pinned<span></span></div><div class="d29-grid"></div>'; pinGrid = pinSec.querySelector('.d29-grid'); groups.insertBefore(pinSec, groups.firstChild); }
    var by = {}; tiles.forEach(function(t){ t.__home = t.parentNode; by[t.getAttribute('data-d29t')] = t;
      var s = document.createElement('i'); s.className = 'd35-star'; s.setAttribute('data-d35star', t.getAttribute('data-d29t')); s.setAttribute('role','button'); s.setAttribute('aria-label','Pin to top'); s.textContent = '☆'; t.appendChild(s); });
    var bar = document.createElement('div'); bar.className = 'd35-bar';
    bar.innerHTML = '<input class="d35-q" type="search" placeholder="Search tools…  (Enter opens the first)" autocomplete="off"><div class="d35-chips"></div>';
    body.insertBefore(bar, anchor);
    var chips = bar.querySelector('.d35-chips');
    function name(k){ var t = by[k]; return t ? t.querySelector('b').textContent : ''; }
    function order(){
      fav = LSg(FAV,[]);
      if(groups){ tiles.forEach(function(t){ if(fav.indexOf(t.getAttribute('data-d29t'))<0) t.__home.appendChild(t); }); fav.forEach(function(k){ if(by[k]) pinGrid.appendChild(by[k]); }); pinSec.style.display = pinGrid.children.length ? '' : 'none'; pinSec.querySelector('.d29-gh span').textContent = pinGrid.children.length; }
      else fav.slice().reverse().forEach(function(k){ if(by[k]) grid.insertBefore(by[k], grid.firstChild); });
      tiles.forEach(function(t){ var k = t.getAttribute('data-d29t'), on = fav.indexOf(k)>=0; t.classList.toggle('d35-fav', on); t.querySelector('.d35-star').textContent = on ? '★' : '☆'; });
      var r = LSg(REC,[]).filter(function(k){ return by[k]; }).slice(0,3);
      chips.innerHTML = r.length ? '<small>Recent</small>'+r.map(function(k,i){ return '<button type="button" class="d35-chip" data-d29t="'+k+'">'+(i===0?'↩ ':'')+esc(name(k))+'</button>'; }).join('') : '';
    }
    order();
    var q = bar.querySelector('.d35-q');
    function filt(){ var v = q.value.trim().toLowerCase(); tiles.forEach(function(t){ t.style.display = (!v || (t.innerText+' '+(t.getAttribute('data-d29g')||'')).toLowerCase().indexOf(v)>=0) ? '' : 'none'; }); chips.style.display = v ? 'none' : ''; var any = false; body.querySelectorAll('.d29-grp').forEach(function(g){ var nv = Array.prototype.filter.call(g.querySelectorAll('.d29-tile'), function(t){ return t.style.display!=='none'; }).length, vis = nv>0, cs = g.querySelector('.d29-gh span'); if(cs) cs.textContent = nv; g.style.display = (vis && !(g===pinSec && !pinGrid.children.length)) ? '' : 'none'; if(vis) any = true; }); var nn = document.getElementById('d29None'); if(nn) nn.hidden = any || !v; }
    q.addEventListener('input', filt);
    q.addEventListener('keydown', function(e){ if(e.key==='Enter'){ var f = tiles.filter(function(t){ return t.style.display!=='none'; })[0]; if(f) f.click(); } });
    hub.addEventListener('click', function(e){ var s = e.target.closest && e.target.closest('[data-d35star]'); if(!s) return; e.stopPropagation(); e.preventDefault();
      var k = s.getAttribute('data-d35star'), f = LSg(FAV,[]), i = f.indexOf(k); if(i>=0) f.splice(i,1); else f.push(k); LSs(FAV,f); order(); }, true);
    if(!phone()) setTimeout(function(){ try{ q.focus(); }catch(e){} }, 60);
  }
  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-d29t]'); if(!t || e.target.closest('[data-d35star]')) return;
    var k = t.getAttribute('data-d29t'), r = LSg(REC,[]).filter(function(x){ return x!==k; }); r.unshift(k); LSs(REC, r.slice(0,5));
  }, true);
  try{ new MutationObserver(function(){ var h = document.getElementById('d29Hub'); if(h) decorate(h); }).observe(document.body, {childList:true}); }catch(e){}

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', function(e){
    if(e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return;
    if(typeof state==='undefined' || state.needsLogin) return;
    var el = e.target, typing = el && (/^(input|textarea|select)$/i.test(el.tagName) || el.isContentEditable);
    if(typing) return;
    if(document.querySelector('.d27-ov,.d15-ov,.d3-overlay,#d2Cmd,.d2-pop,.my-name-picker-overlay')) return;
    var k = e.key;
    if(k==='t' || k==='T'){ if(window.d29OpenTools){ e.preventDefault(); window.d29OpenTools(); } }
    else if(k==='f' || k==='F'){ if(window.d46Open){ e.preventDefault(); window.d46Open(); } }
    else if(k==='n' || k==='N'){ var b = document.querySelector('#d33Next [data-d34prep]'); if(b){ e.preventDefault(); b.click(); } else if(window.d2Toast) window.d2Toast('No call coming up soon',{ms:2500}); }
    else if(k==='/'){ e.preventDefault(); try{ document.dispatchEvent(new KeyboardEvent('keydown',{key:'k',ctrlKey:true,bubbles:true})); }catch(x){} }
  });

  /* ---------- quiet alerts ---------- */
  var QK = 'cd.qn';
  var Q = function(){ return Object.assign({quiet:false, from:'22:00', to:'07:00', cap:0, skipConfirmed:true}, LSg(QK,{})); };
  var mins = function(s){ var m = /^(\d{1,2}):(\d{2})$/.exec(s||''); return m ? (+m[1])*60+(+m[2]) : 0; };
  function inQuiet(q){ if(!q.quiet) return false; var n = new Date(), c = n.getHours()*60+n.getMinutes(), a = mins(q.from), b = mins(q.to); return a<=b ? (c>=a && c<b) : (c>=a || c<b); }
  function confirmedCall(d){
    try{ if(!d || !d.id || !d.date) return false; var id = d.date+'-confirm-ids';
      var n = (state.notes||[]).filter(function(x){ return x && x.id===id; })[0]; if(!n) return false; return (JSON.parse(n.text)||{})[d.id]==='confirmed'; }catch(e){ return false; }
  }
  var oShow = window.cdShowNotification;
  if(typeof oShow==='function') window.cdShowNotification = function(title, opts){
    try{
      var q = Q(), tag = (opts && opts.tag) || '', d = (opts && opts.data) || {};
      var priority = /^cd-(esc|test)/.test(tag);
      if(!priority){
        if(q.skipConfirmed && d.kind==='call' && confirmedCall(d)) return Promise.resolve(false);
        if(inQuiet(q)) return Promise.resolve(false);
        if(q.cap>0){ var day = new Date().toDateString(), c = LSg('cd.qn.count',{}); if(c.day!==day) c = {day:day, n:0}; if(c.n>=q.cap) return Promise.resolve(false); c.n++; LSs('cd.qn.count', c); }
      }
    }catch(e){}
    return oShow.call(this, title, opts);
  };
  window.d35Open = function(k){
    if(k!=='notif') return false;
    var old = document.getElementById('d35T'); if(old) old.remove();
    var q = Q();
    var el = document.createElement('div'); el.id = 'd35T'; el.className = 'd27-ov d35-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>REMINDERS</small><h2>Quiet alerts</h2></div><button type="button" class="d27-x" data-d35x aria-label="Close">✕</button></div><div class="d29-body">'
      + '<p class="d29-p">Control when the app pings you. Escalations (a call close with nobody assigned) always come through.</p>'
      + '<label class="d35-row"><input type="checkbox" id="d35sc"'+(q.skipConfirmed?' checked':'')+'><span><b>Skip calls already marked Confirmed</b><small>No “call in 10 min” for them</small></span></label>'
      + '<label class="d35-row"><input type="checkbox" id="d35qh"'+(q.quiet?' checked':'')+'><span><b>Quiet hours</b><small>No reminders between these times</small></span></label>'
      + '<div class="d35-two"><label>From<input type="time" id="d35f" value="'+esc(q.from)+'"></label><label>To<input type="time" id="d35t" value="'+esc(q.to)+'"></label></div>'
      + '<label class="d35-row"><span style="flex:1"><b>Daily limit</b><small>Max reminders per day on this device (0 = no limit)</small></span><input type="number" min="0" max="200" id="d35cap" value="'+(+q.cap||0)+'" style="width:84px"></label>'
      + '<p class="d29-p" id="d35ok"></p></div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    function save(){ var n = {quiet:el.querySelector('#d35qh').checked, from:el.querySelector('#d35f').value||'22:00', to:el.querySelector('#d35t').value||'07:00', cap:Math.max(0, parseInt(el.querySelector('#d35cap').value,10)||0), skipConfirmed:el.querySelector('#d35sc').checked}; LSs(QK, n); el.querySelector('#d35ok').textContent = 'Saved on this device.'; }
    el.addEventListener('change', save);
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d35x]'))){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); } });
    return true;
  };
})();

/* ===== d37: V2.8 — edit calls straight from the "Coverage by half hour" bars (hover on desktop, tap on phone) ===== */
;(function(){
  if(window.__d37) return; window.__d37 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var canHover = function(){ try{ return window.matchMedia('(hover:hover) and (pointer:fine)').matches; }catch(e){ return true; } };
  var admin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  var toast = function(m){ try{ if(window.d2Toast) window.d2Toast(m,{ms:3500}); }catch(e){} };
  var bucketOf = function(t){ try{ var m = timeToMinutes(t); return m===9999 ? '?' : String(Math.floor(m/30)); }catch(e){ return '?'; } };
  var ownerName = function(r){ try{ var o = window.cdOwnerOf ? window.cdOwnerOf(r) : null; return o && o.name ? o.name : (r.assignee||''); }catch(e){ return r.assignee||''; } };
  var pop = null, cur = null, showT = 0, hideT = 0, titleBar = null, openAs = null;

  function normTime(v){
    v = String(v||'').trim().toLowerCase().replace(/\./g,':').replace(/\s+/g,'');
    var m = /^(\d{1,2})(?::?(\d{2}))?(am|pm|a|p)?$/.exec(v); if(!m) return null;
    var h = +m[1], mi = m[2] ? +m[2] : 0, ap = m[3];
    if(mi>59 || h>24) return null;
    if(!ap){ if(h>=13 && h<=23){ ap = 'pm'; h -= 12; } else if(h===0){ ap = 'am'; h = 12; } else ap = 'pm'; }
    else ap = ap[0]==='a' ? 'am' : 'pm';
    if(h<1 || h>12) return null;
    return h+':'+(mi<10?'0':'')+mi+' '+ap.toUpperCase();
  }
  function listFor(b){ return (state.rows||[]).filter(function(r){ return r && r.candidate && bucketOf(r.time)===b; }).sort(function(x,y){ var a = timeToMinutes(x.time), c = timeToMinutes(y.time); return (a-c) || String(x.candidate).localeCompare(String(y.candidate)); }); }
  function label(b){ try{ return b==='?' ? 'Unknown time' : halfHourBucketLabel(+b*30); }catch(e){ return b; } }

  function picker(r){
    var list = []; try{ list = window.d2Rank ? window.d2Rank(r) : []; }catch(e){}
    var h = '<div class="d37-pk"><input class="d37-q" data-d37q placeholder="Search handler or team…" autocomplete="off">'
      + '<div class="d37-pl">'
      + (r.assignee ? '<button type="button" class="d37-p un" data-d37p="">✕ Unassign ('+esc(r.assignee)+')</button>' : '')
      + list.map(function(x){
        var flags = (x.absent?'<em class="bad">absent</em>':'')+(x.clash?'<em class="bad">clash</em>':'')+(x.learn>=2?'<em class="ok">★ usual</em>':'')+(x.prior?'<em class="ok">↻ before</em>':'');
        return '<button type="button" class="d37-p'+(x.isTeam?' team':'')+'" data-d37p="'+esc(x.name)+'" data-s="'+esc((x.name+' '+(x.team||'')).toLowerCase())+'"><span class="d37-pn"><b>'+(x.isTeam?'◆ ':'')+esc(x.name)+'</b><small>'+esc(x.team||'')+'</small></span><span class="d37-pf">'+flags+'</span><span class="d37-pm">'+x.load+' call'+(x.load===1?'':'s')+'</span></button>';
      }).join('')+'</div></div>';
    return h;
  }
  function html(){
    var L = listFor(cur.b), ed = admin();
    var h = '<div class="d37-hd"><div><small>COVERAGE · IST</small><b>'+esc(label(cur.b))+'</b> <span>'+L.length+' call'+(L.length===1?'':'s')+'</span></div><button type="button" class="d37-x" data-d37x aria-label="Close">✕</button></div>';
    var sm = (cur.title||'').split('\n').filter(function(x){ return /^(HYD|Pradeep|Development|Marketing)/.test(x); });
    if(sm.length) h += '<div class="d37-sm">'+sm.map(function(x){ return '<span>'+esc(x)+'</span>'; }).join('')+'</div>';
    h += '<div class="d37-l">'+(L.length ? L.map(function(r){
      var own = ownerName(r);
      return '<div class="d37-r'+(r.woi?' woi':'')+'" data-id="'+esc(r.id)+'"><div class="d37-n"><b>'+esc(r.candidate)+'</b><small>'+esc([r.company, r.round, r.woi?'WOI':''].filter(Boolean).join(' · '))+'</small></div>'
        + (ed ? '<input class="d37-t" data-d37t value="'+esc(r.time||'')+'" aria-label="Time" inputmode="text" autocomplete="off">' : '<span class="d37-t ro">'+esc(r.time||'')+'</span>')
        + (ed ? '<button type="button" class="d37-a'+(own?'':' none')+(openAs===String(r.id)?' on':'')+'" data-d37a>'+esc(own||'Assign')+' '+(openAs===String(r.id)?'▴':'▾')+'</button>' : '<span class="d37-a ro">'+esc(own||'—')+'</span>')
        + (ed && openAs===String(r.id) ? picker(r) : '') + '</div>';
    }).join('') : '<div class="d27-empty">No calls in this slot any more.</div>')+'</div>';
    h += '<div class="d37-ft">'+(ed ? 'Change the time and press Enter, or tap the name to reassign. Press Esc or ✕ to close.' : 'View only.')+' <button type="button" class="d37-jump" data-d37j>Jump to these calls</button></div>';
    return h;
  }
  function paint(){ if(!pop || !cur) return; var act = document.activeElement, keep = act && pop.contains(act) && act.classList.contains('d37-t') ? act.closest('.d37-r').getAttribute('data-id') : null; pop.innerHTML = html(); if(keep){ var i = pop.querySelector('.d37-r[data-id="'+keep+'"] .d37-t'); if(i){ try{ i.focus(); }catch(e){} } } }

  function place(bar){
    var phone = !canHover() || (window.__d17vw||innerWidth)<760;
    pop.classList.toggle('sheet', phone);
    pop.style.left = pop.style.top = pop.style.right = pop.style.width = '';   /* centred by CSS */
  }
  function open(bar, mode){
    var b = bar.getAttribute('data-bucket'); if(b==null) return;
    var title = bar.getAttribute('title') || bar.getAttribute('data-d37title') || '';
    if(bar.hasAttribute('title')){ bar.setAttribute('data-d37title', title); bar.removeAttribute('title'); titleBar = bar; }
    cur = {b:b, bar:bar, title:title, mode:mode};
    if(!pop){ pop = document.createElement('div'); pop.id = 'd37Pop'; pop.className = 'd37-pop'; document.body.appendChild(pop);
      pop.addEventListener('mouseenter', function(){ clearTimeout(hideT); });
      pop.addEventListener('mouseleave', function(){ if(cur && cur.mode==='hover') schedHide(); });
      pop.addEventListener('input', function(e){ var q = e.target.closest && e.target.closest('[data-d37q]'); if(!q) return; var v = q.value.trim().toLowerCase(); q.closest('.d37-pk').querySelectorAll('.d37-p[data-s]').forEach(function(b){ b.style.display = (!v || b.getAttribute('data-s').indexOf(v)>=0) ? '' : 'none'; }); }); pop.addEventListener('click', onClick); pop.addEventListener('focusin', function(){ if(cur){ cur.mode = 'pinned'; clearTimeout(hideT); } }); pop.addEventListener('change', onChange); pop.addEventListener('keydown', onKey);
    }
    paint(); place(bar);
    pop.classList.add('on');
  }
  function close(){ openAs = null; clearTimeout(showT); clearTimeout(hideT); if(pop){ pop.remove(); pop = null; } if(titleBar && titleBar.isConnected){ var t = titleBar.getAttribute('data-d37title'); if(t) titleBar.setAttribute('title', t); } titleBar = null; cur = null; document.body.classList.remove('d37-open'); }
  function schedHide(){ clearTimeout(hideT); hideT = setTimeout(function(){ if(!cur || cur.mode==='pinned') return; if(pop && pop.contains(document.activeElement) && document.activeElement.tagName==='INPUT') return; if(document.querySelector('.d2-pop')) return; close(); }, 1600); }

  function applyTime(id, raw, input){
    var r = (state.rows||[]).filter(function(x){ return String(x.id)===String(id); })[0]; if(!r) return;
    var n = normTime(raw);
    if(!n){ toast('Type a time like 9:45 PM'); if(input) input.value = r.time||''; return; }
    if(n===r.time) return;
    var old = r.time; r.time = n;
    try{ markDirty(); }catch(e){}
    try{ render(); }catch(e){}
    toast(r.candidate+': '+old+' → '+n+(bucketOf(n)!==cur.b ? ' (moved out of this slot)' : ''));
    paint(); if(cur) place(cur.bar);
  }
  function onChange(e){ var i = e.target.closest && e.target.closest('[data-d37t]'); if(i) applyTime(i.closest('.d37-r').getAttribute('data-id'), i.value, i); }
  function onKey(e){ if(e.key==='Enter' && e.target.matches && e.target.matches('[data-d37t]')){ e.preventDefault(); applyTime(e.target.closest('.d37-r').getAttribute('data-id'), e.target.value, e.target); } if(e.key==='Escape'){ e.stopPropagation(); if(openAs){ openAs = null; paint(); } else close(); } }
  function onClick(e){
    var t = e.target; if(!t.closest) return;
    if(cur) cur.mode = 'pinned'; clearTimeout(hideT);
    if(t.closest('[data-d37x]')){ close(); return; }
    var a = t.closest('[data-d37a]'); if(a){ var id = a.closest('.d37-r').getAttribute('data-id'); openAs = (openAs===String(id)) ? null : String(id); paint(); if(cur) place(cur.bar); var q = pop && pop.querySelector('[data-d37q]'); if(q){ try{ q.focus({preventScroll:true}); }catch(x){} var rr = q.closest('.d37-r'); if(rr && rr.scrollIntoView) rr.scrollIntoView({block:'nearest'}); } return; }
    var pk = t.closest('[data-d37p]'); if(pk){ var rid = pk.closest('.d37-r').getAttribute('data-id'), nm = pk.getAttribute('data-d37p'); openAs = null; if(nm){ if(window.d2AssignTo) window.d2AssignTo(rid, nm); } else { var rw = (state.rows||[]).filter(function(x){ return String(x.id)===String(rid); })[0]; if(rw){ rw.assignee = ''; try{ markDirty(); render(); }catch(x){} } } paint(); if(cur) place(cur.bar); return; }
    if(t.closest('[data-d37j]')){ var b = cur && cur.b; close(); var row = document.querySelector('tr[data-bucket="'+(window.CSS&&CSS.escape?CSS.escape(b):b)+'"]'); if(row){ row.scrollIntoView({behavior:'smooth', block:'center'}); } return; }
  }

  /* desktop hover */
  document.addEventListener('mouseover', function(e){
    if(!canHover()) return; var t = e.target; if(!t || !t.closest) return;
    var bar = t.closest('.hour[data-bucket]'); if(!bar) return;
    clearTimeout(hideT); clearTimeout(showT);
    if(cur && (cur.bar===bar || cur.mode==='pinned')) return;
    showT = setTimeout(function(){ open(bar, 'hover'); }, 220);
  });
  document.addEventListener('mouseout', function(e){
    if(!canHover()) return; var t = e.target; if(!t || !t.closest) return;
    var bar = t.closest('.hour[data-bucket]'); if(!bar) return;
    clearTimeout(showT);
    var to = e.relatedTarget; if(to && to.closest && (to.closest('#d37Pop') || to.closest('.hour[data-bucket]')===bar)) return;
    if(cur && cur.mode==='hover') schedHide();
  });
  /* click on a bar keeps its old behaviour (jump) on desktop; on touch it opens the editor instead */
  document.addEventListener('click', function(e){
    var t = e.target; if(!t || !t.closest) return;
    var bar = t.closest('.hour[data-bucket]');
    if(bar){ var touch = !canHover(); if(touch){ e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation(); open(bar, 'tap'); } else { close(); } return; }
    if(pop && !t.closest('#d37Pop') && !t.closest('.d2-pop')) close();
  }, true);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && pop){ if(openAs){ openAs = null; paint(); return; } close(); } });
  window.addEventListener('scroll', function(e){ if(e.target && e.target.nodeType===1 && e.target.closest && e.target.closest('#d37Pop')) return; if(cur && cur.mode==='hover') close(); }, true);

  /* keep the list honest when something else changes the calls (assigning from the picker, etc.) */
  function hook(){
    if(typeof window.render!=='function' || !window.__d17vw) return setTimeout(hook, 300);
    var o = window.render, tm = 0;
    window.render = function(){ var r = o.apply(this, arguments); if(pop && cur){ clearTimeout(tm); tm = setTimeout(function(){ if(!pop||!cur) return; var bar = document.querySelector('.hour[data-bucket="'+cur.b+'"]'); if(bar){ cur.bar = bar; if(bar.hasAttribute('title')){ cur.title = bar.getAttribute('title')||cur.title; bar.setAttribute('data-d37title', cur.title); bar.removeAttribute('title'); titleBar = bar; } } paint(); if(cur.bar) place(cur.bar); }, 60); } return r; };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', hook); else hook();
  window.d37Open = function(bar){ open(bar, 'tap'); };
})();

/* ===== d38: V2.9 — TTOP page (read-only view of the other team's portal data) ===== */
(function(){
  if(window.__d38) return; window.__d38 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var LK = 'cd.ttop.table';
  var S = { tables:null, table:'', rows:[], total:null, q:'', err:'', busy:false, sel:null, cols:[] };
  var el = null;
  var isPhone = function(){ return (window.__d17vw||innerWidth) < 760; };
  function LS(k,v){ try{ if(v===undefined) return localStorage.getItem(k); localStorage.setItem(k,v); }catch(e){} return null; }
  function fmt(v, long){
    if(v==null || v==='') return '<span class="d38-nil">—</span>';
    if(typeof v==='object') v = JSON.stringify(v);
    v = String(v);
    if(/^\d{4}-\d\d-\d\dT\d\d:\d\d/.test(v)){ var d = new Date(v); if(!isNaN(d)) v = d.toLocaleString('en-IN',{timeZone:'Asia/Kolkata',day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',hour12:true}); }
    if(!long && v.length>70) v = v.slice(0,70)+'…';
    return esc(v);
  }
  function visibleCols(){
    var seen = {}; S.rows.slice(0,50).forEach(function(r){ Object.keys(r).forEach(function(k){ if(r[k]!=null && r[k]!=='') seen[k]=1; }); });
    var all = S.cols.length ? S.cols : Object.keys(S.rows[0]||{});
    var c = all.filter(function(k){ return seen[k]; });
    return c.length ? c : all;
  }
  function filtered(){
    var q = S.q.trim().toLowerCase(); if(!q) return S.rows;
    return S.rows.filter(function(r){ for(var k in r){ var v = r[k]; if(v==null) continue; if((typeof v==='object'?JSON.stringify(v):String(v)).toLowerCase().indexOf(q)>=0) return true; } return false; });
  }
  function title(r){
    var pref = ['candidate_name','candidate','name','title','company','company_name','email','id'];
    for(var i=0;i<pref.length;i++) if(r[pref[i]]) return String(r[pref[i]]);
    var k = Object.keys(r)[0]; return k ? String(r[k]) : '';
  }
  function paint(){
    if(!el) return;
    var b = el.querySelector('.d38-body'); if(!b) return;
    var h = '';
    if(S.err){
      h = '<div class="d27-empty">'+esc(S.err)+'</div><button type="button" class="d27-btn" data-d38="retry">Try again</button>'
        + '<p class="d29-p">If you know a table name, open it directly:</p><div class="d38-bar"><input data-d38m placeholder="table name, e.g. incentives" autocomplete="off"><button type="button" class="d27-btn" data-d38="manual">Open</button></div>';
      if(/not connected|not_configured/i.test(S.err)) h = '<div class="d27-empty">TTOP is not connected yet.</div><p class="d29-p">Add <b>TTOP_SUPABASE_URL</b> and <b>TTOP_SUPABASE_KEY</b> in Vercel → Settings → Environment Variables, then redeploy.</p>';
      b.innerHTML = h; return;
    }
    if(!S.tables){ b.innerHTML = '<div class="d27-empty">Loading TTOP…</div>'; return; }
    if(!S.tables.length){ b.innerHTML = '<div class="d27-empty">Connected, but this key can’t see any tables.</div><p class="d29-p">The TTOP owner needs to allow read-only access (a view or a read policy) for the tables you should see.</p>'; return; }
    var opts = S.tables.map(function(t){ return '<option value="'+esc(t.name)+'"'+(t.name===S.table?' selected':'')+'>'+esc(t.name)+'</option>'; }).join('');
    h += '<div class="d38-bar"><select data-d38s>'+opts+'</select><input type="search" data-d38q placeholder="Search this table…" value="'+esc(S.q)+'" autocomplete="off"><button type="button" class="d27-btn" data-d38="reload">↻</button></div>';
    var L = filtered();
    h += '<div class="d38-meta">'+(S.busy?'Loading… ':'')+L.length+(S.q?' matching of ':' of ')+S.rows.length+' loaded'+(S.total!=null?' · '+S.total+' in TTOP':'')+' · read-only</div>';
    if(!L.length && !S.busy){
      h += '<div class="d27-empty">'+(S.rows.length?'Nothing matches.':'No rows visible. If you expected data, the owner’s access rules may be hiding this table from a read-only key.')+'</div>';
    } else if(isPhone()){
      h += '<div class="d27-list">'+L.slice(0,300).map(function(r,i){
        var ks = visibleCols().filter(function(k){ return String(r[k]||'')!==title(r); }).slice(0,3);
        return '<button type="button" class="d27-row" data-d38r="'+S.rows.indexOf(r)+'"><span class="n"><b>'+fmt(title(r))+'</b><small>'+ks.map(function(k){ return esc(k)+': '+fmt(r[k]); }).join(' · ')+'</small></span><span class="o">›</span></button>';
      }).join('')+'</div>';
    } else {
      var cols = visibleCols();
      h += '<div class="d38-tw"><table class="d38-t"><thead><tr>'+cols.map(function(c){ return '<th>'+esc(c)+'</th>'; }).join('')+'</tr></thead><tbody>'
        + L.slice(0,500).map(function(r){ return '<tr data-d38r="'+S.rows.indexOf(r)+'">'+cols.map(function(c){ return '<td>'+fmt(r[c])+'</td>'; }).join('')+'</tr>'; }).join('')+'</tbody></table></div>';
    }
    if(S.total!=null && S.rows.length < S.total) h += '<button type="button" class="d27-btn d38-more" data-d38="more">Load more</button>';
    b.innerHTML = h;
  }
  function detail(i){
    var r = S.rows[i]; if(!r) return;
    var b = el.querySelector('.d38-body');
    b.innerHTML = '<button type="button" class="d27-btn" data-d38="back">‹ Back</button><div class="d38-kv">'
      + Object.keys(r).map(function(k){ return '<div><small>'+esc(k)+'</small><div>'+fmt(r[k],true)+'</div></div>'; }).join('')+'</div>';
    S.sel = i;
  }
  function load(more){
    if(!S.table) return;
    S.busy = true; if(!more){ S.rows = []; S.total = null; } paint();
    var off = more ? S.rows.length : 0;
    window.apiCall('ttop',{qs:'action=rows&table='+encodeURIComponent(S.table)+'&limit=300&offset='+off}).then(function(j){
      S.busy = false; S.err = '';
      S.rows = more ? S.rows.concat(j.rows||[]) : (j.rows||[]); S.total = j.total;
      var t = S.tables.filter(function(x){ return x.name===S.table; })[0]; S.cols = t ? t.columns : [];
      paint();
    }).catch(function(e){ S.busy = false; S.err = String((e&&e.message)||e).replace(/^ttop:\s*/,''); paint(); });
  }
  function boot(){
    S.err = ''; S.tables = null; paint();
    window.apiCall('ttop',{qs:'action=tables'}).then(function(j){
      S.tables = j.tables||[];
      var last = LS(LK);
      S.table = (S.tables.some(function(t){ return t.name===last; }) ? last : (S.tables[0]&&S.tables[0].name)) || '';
      paint(); if(S.table) load(false);
    }).catch(function(e){ S.err = String((e&&e.message)||e).replace(/^ttop:\s*/,''); paint(); });
  }
  function close(){ if(el&&el.parentNode) el.remove(); el = null; if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); }
  function open(){
    var old = document.getElementById('d38T'); if(old) old.remove();
    el = document.createElement('div'); el.id = 'd38T'; el.className = 'd27-ov d38-ov';
    el.innerHTML = '<div class="d27-card d38-card"><div class="d27-hd"><div><small>READ-ONLY</small><h2>TTOP data</h2></div><button type="button" class="d27-x" data-d38x aria-label="Close">✕</button></div><div class="d29-body d38-body"></div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){
      var t = e.target;
      if(t===el || (t.closest && t.closest('[data-d38x]'))) return close();
      var a = t.closest && t.closest('[data-d38]'); if(a){ var k = a.getAttribute('data-d38'); if(k==='retry') boot(); else if(k==='reload') load(false); else if(k==='more') load(true); else if(k==='back') paint(); else if(k==='manual'){ var mi = el.querySelector('[data-d38m]'); var nm = mi && mi.value.trim(); if(/^[A-Za-z0-9_]+$/.test(nm||'')){ S.tables=[{name:nm,columns:[]}]; S.table=nm; S.err=''; S.q=''; load(false); } } return; }
      var r = t.closest && t.closest('[data-d38r]'); if(r) detail(+r.getAttribute('data-d38r'));
    });
    el.addEventListener('change', function(e){ if(e.target.hasAttribute('data-d38s')){ S.table = e.target.value; LS(LK,S.table); S.q = ''; load(false); } });
    el.addEventListener('input', function(e){ if(e.target.hasAttribute('data-d38q')){ S.q = e.target.value; var pos = e.target.selectionStart; paint(); var i = el.querySelector('[data-d38q]'); if(i){ i.focus(); try{ i.setSelectionRange(pos,pos); }catch(x){} } } });
    boot();
    return true;
  }
  var prev = window.d35Open;
  window.d35Open = function(k){ if(k==='ttop') return open(); return typeof prev==='function' ? prev(k) : false; };
  window.d38Open = open;
})();

/* ===== d39: V3.0 — not-confirmed ring, right-click menu, copy chips, call history, day compare, daily scrum board ===== */
(function(){
  if(window.__d39) return; window.__d39 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var bd = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var nowBd = function(){ var d=new Date(); return (d.getHours()*60+d.getMinutes()+720)%1440; };
  var admin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  var phone = function(){ return (window.__d17vw||innerWidth) < 760; };
  var rows = function(){ return (typeof state!=='undefined' && state.rows) || []; };
  var rowById = function(id){ return rows().filter(function(r){ return String(r.id)===String(id); })[0]; };
  var today = function(){ try{ return todayDateString(); }catch(e){ return ''; } };
  function toast(t){ var b = document.getElementById('d39Toast'); if(!b){ b = document.createElement('div'); b.id = 'd39Toast'; document.body.appendChild(b); } b.textContent = t; b.classList.add('on'); clearTimeout(b._t); b._t = setTimeout(function(){ b.classList.remove('on'); }, 1800); }
  function copy(t){ var done = function(){ toast('Copied'); }; try{ navigator.clipboard.writeText(t).then(done, function(){ fb(); }); }catch(e){ fb(); } function fb(){ var a = document.createElement('textarea'); a.value = t; a.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(a); a.select(); try{ document.execCommand('copy'); done(); }catch(x){} a.remove(); } }
  function getConf(date){ var e = ((state.notes)||[]).filter(function(n){ return n && n.id===(date||state.date)+'-confirm-ids'; })[0]; try{ return e ? (JSON.parse(e.text)||{}) : {}; }catch(x){ return {}; } }
  function setConf(rid, v){
    var m = getConf(); if(v && m[rid]!==v) m[rid] = v; else delete m[rid];
    state.notes = state.notes || []; var id = state.date+'-confirm-ids';
    var i = state.notes.findIndex(function(n){ return n && n.id===id; }), keys = Object.keys(m);
    if(keys.length){ var tx = JSON.stringify(m); if(i>=0) state.notes[i].text = tx; else state.notes.push({id:id, text:tx}); } else if(i>=0) state.notes.splice(i,1);
    try{ markDirty(); }catch(e){}
  }
  var ZONE = {USA:'America/New_York', UK:'Europe/London', Ireland:'Europe/Dublin', Canada:'America/Toronto', Germany:'Europe/Berlin'};
  function timeText(r){
    if(!r || !r.time) return '';
    var m = timeToMinutes(r.time), out = r.time+' IST';
    var p = (r.date||state.date||'').split('-').map(Number); if(m===9999 || p.length<3 || !ZONE[r.country||'USA']) return out;
    try{ var ms = Date.UTC(p[0],p[1]-1,p[2],0,m) - 330*60000, z = ZONE[r.country||'USA'];
      var t = new Intl.DateTimeFormat('en-GB',{timeZone:z,hour:'numeric',minute:'2-digit',hour12:true}).format(new Date(ms));
      return out+' / '+t.toUpperCase()+' '+(r.country||'USA')+' time'; }catch(e){ return out; }
  }

  /* ---------- 1. not-confirmed ring ---------- */
  function ring(){
    try{
      var els = document.querySelectorAll('tr[data-id].d39-r1, tr[data-id].d39-r2, [data-d22open].d39-r1, [data-d22open].d39-r2');
      els.forEach(function(e){ e.classList.remove('d39-r1','d39-r2'); });
      if(typeof state==='undefined' || state.date!==today()) return;
      var n = nowBd(), cf = getConf(), hit = {};
      rows().forEach(function(r){
        if(r.woi || r.status || !r.candidate || cf[r.id]==='confirmed') return;
        var d = bd(r.time)-n; if(bd(r.time)===9999 || d>30 || d<-10) return;
        hit[r.id] = d<=10 ? 'd39-r2' : 'd39-r1';
      });
      Object.keys(hit).forEach(function(id){
        document.querySelectorAll('tr[data-id="'+id+'"], [data-d22open="'+id+'"]').forEach(function(e){ e.classList.add(hit[id]); });
      });
    }catch(e){}
  }
  window.d39Ring = ring;

  /* ---------- 2. call history ---------- */
  var HL = {time:'Time', status:'Status', assignee:'Team', drivingPerson:'Owner', company:'Client', round:'Round', duration:'Duration', candidate:'Candidate', role:'Role', country:'Country', woi:'Waiting for invite'};
  function ago(t){ var s = Math.max(1, Math.round((Date.now()-t)/60000)); return s<60 ? s+' min ago' : s<1440 ? Math.round(s/60)+' h ago' : Math.round(s/1440)+' d ago'; }
  function historyHtml(r){
    var A = []; try{ A = JSON.parse(localStorage.getItem('cd.audit')||'[]'); }catch(e){}
    A = A.filter(function(a){ return String(a.id)===String(r.id) && a.k==='chg'; });
    var h = '<div class="d36-hd"><b>'+esc(r.candidate||'')+'</b><small>'+esc([r.company, r.time].filter(Boolean).join(' · '))+'</small></div>';
    var sf = (r.statusFields||[]).filter(function(f){ return (f.value||'').trim(); });
    if(r.status) h += '<div class="d36-rule"><b>Status: '+esc(String(r.status).replace(/_/g,' '))+'</b><span>'+(sf.length ? sf.map(function(f){ return esc(f.label)+': '+esc(f.value); }).join(' · ') : 'no reason entered')+'</span></div>';
    var cf = getConf()[r.id]; if(cf) h += '<div class="d36-rule"><b>Confirmation</b><span>'+esc(cf)+'</span></div>';
    if(!A.length) return h + '<div class="d27-empty">No edits recorded for this call on this device yet.</div><p class="d29-p">The trail starts when changes are made while this app is open.</p>';
    return h + '<div class="d36-list">'+A.map(function(a){
      return '<div class="d36-it"><div class="d36-l1"><b>'+esc(HL[a.f]||a.f)+'</b><em>'+ago(a.t)+'</em></div><div class="d36-l2">'+esc(a.a||'—')+'  →  <b>'+esc(a.b||'—')+'</b></div></div>';
    }).join('')+'</div><p class="d29-p">Edits made on this device only.</p>';
  }
  function overlay(id, title, kicker, body, cls){
    var old = document.getElementById(id); if(old) old.remove();
    var el = document.createElement('div'); el.id = id; el.className = 'd27-ov d39-ov '+(cls||'');
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>'+esc(kicker)+'</small><h2>'+esc(title)+'</h2></div><button type="button" class="d27-x" data-d39x aria-label="Close">✕</button></div><div class="d29-body d39-body"></div></div>';
    el.querySelector('.d39-body').innerHTML = body;
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d39x]'))){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); } });
    return el;
  }

  /* ---------- 3. right-click menu ---------- */
  var menu = null;
  function closeMenu(){ if(menu){ menu.remove(); menu = null; } }
  function openMenu(x, y, r){
    closeMenu();
    var cf = getConf()[r.id], A = admin();
    var items = [];
    if(A && !r.woi){ items.push(['conf','✅','Mark confirmed'+(cf==='confirmed'?' (on)':'')], ['noreply','🔕','Mark no reply'+(cf==='noreply'?' (on)':'')]); }
    items.push(['cname','📋','Copy candidate name'], ['ctime','🕒','Copy time (IST + client zone)'], ['cmsg','💬','Copy reminder message']);
    items.push(['prep','🧭','Prep card'], ['hist','🕘','History of this call']); items.unshift(['ccard','🗂','Call card']); if(window.cdOwnerOf && window.cdOwnerOf(r)) items.push(['pcard','👤','Person card']);
    menu = document.createElement('div'); menu.id = 'd39Menu';
    menu.innerHTML = '<div class="d39-mh">'+esc(r.candidate||'Call')+'<small>'+esc(r.time||'')+'</small></div>'+items.map(function(i){ return '<button type="button" data-d39m="'+i[0]+'"><span>'+i[1]+'</span>'+esc(i[2])+'</button>'; }).join('');
    document.body.appendChild(menu);
    var w = menu.offsetWidth, h = menu.offsetHeight;
    menu.style.left = Math.max(6, Math.min(x, innerWidth-w-6))+'px'; menu.style.top = Math.max(6, Math.min(y, innerHeight-h-6))+'px';
    menu.__r = r;
  }
  document.addEventListener('contextmenu', function(e){
    if(phone()) return; var t = e.target; if(!t.closest) return;
    var tr = t.closest('tbody tr[data-id]'); if(!tr) return;
    if(t.closest('textarea') || (t.closest('input') && /text|search/.test(t.closest('input').type||'text') && t.closest('input').selectionStart!==t.closest('input').selectionEnd)) return;
    var r = rowById(tr.getAttribute('data-id')); if(!r) return;
    e.preventDefault(); openMenu(e.clientX, e.clientY, r);
  }, false);
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('[data-d39m]');
    if(!b){ if(menu && !(e.target.closest && e.target.closest('#d39Menu'))) closeMenu(); return; }
    var r = menu && menu.__r, k = b.getAttribute('data-d39m'); closeMenu(); if(!r) return;
    if(k==='conf'){ setConf(r.id, 'confirmed'); try{ render(); }catch(x){} ring(); }
    else if(k==='noreply'){ setConf(r.id, 'noreply'); try{ render(); }catch(x){} ring(); }
    else if(k==='cname') copy(r.candidate||'');
    else if(k==='ctime') copy(timeText(r));
    else if(k==='cmsg') copy(window.d29ChaseMsg ? window.d29ChaseMsg(r) : (r.candidate||'')+' – '+timeText(r));
    else if(k==='prep'){ if(window.d34Open){ window.d34Open('prep'); } if(window.d34Prep) window.d34Prep(r.id); }
    else if(k==='hist') overlay('d39H','Call history','THIS CALL', historyHtml(r));
    else if(k==='ccard'){ if(window.d41Call) window.d41Call(r.id); }
    else if(k==='pcard'){ var ow = window.cdOwnerOf && window.cdOwnerOf(r); if(ow && window.d40Open) window.d40Open(ow.name); }
  }, true);
  ['scroll','keydown','resize'].forEach(function(ev){ window.addEventListener(ev, function(e){ if(menu && !(ev==='keydown' && e.key!=='Escape')) closeMenu(); }, true); });

  /* ---------- 4. copy chip on hover ---------- */
  var chip = null, chipT = 0;
  function hideChip(){ clearTimeout(chipT); if(chip){ chip.remove(); chip = null; } }
  document.addEventListener('mouseover', function(e){
    if(phone()) return; var t = e.target; if(!t.closest) return;
    if(t.closest('#d39Chip')) { clearTimeout(chipT); return; }
    var inp = t.closest('tbody tr[data-id] input.cell-input[data-field="candidate"], tbody tr[data-id] input.cell-input[data-field="time"]');
    if(!inp){ if(chip){ clearTimeout(chipT); chipT = setTimeout(hideChip, 250); } return; }
    if(chip && chip.__el===inp) return;
    clearTimeout(chipT); chipT = setTimeout(function(){
      hideChip(); var tr = inp.closest('tr'), r = rowById(tr.getAttribute('data-id')); if(!r) return;
      var isT = inp.getAttribute('data-field')==='time', txt = isT ? timeText(r) : (r.candidate||''); if(!txt) return;
      chip = document.createElement('button'); chip.type = 'button'; chip.id = 'd39Chip'; chip.title = 'Copy: '+txt; chip.textContent = '📋'; chip.__el = inp; chip.__txt = txt;
      document.body.appendChild(chip); var b = inp.getBoundingClientRect();
      chip.style.left = Math.min(innerWidth-34, b.right-26)+'px'; chip.style.top = (b.top+(b.height-24)/2)+'px';
      chip.addEventListener('mouseleave', function(){ chipT = setTimeout(hideChip, 250); });
      chip.addEventListener('click', function(ev){ ev.preventDefault(); ev.stopPropagation(); copy(chip.__txt); hideChip(); });
    }, 350);
  }, true);
  window.addEventListener('scroll', hideChip, true);

  /* ---------- 5. day compare ---------- */
  function dayStats(L){
    var o = {total:0, first:0, adv:0, un:0, woi:0, b:{}};
    L.forEach(function(r){ if(!r.candidate) return; if(r.woi){ o.woi++; return; } o.total++; if(typeof isAdvancedRound==='function' && isAdvancedRound(r.round)) o.adv++; else o.first++; if(!(r.assignee||'').trim()) o.un++; var m = bd(r.time); if(m!==9999){ var k = Math.floor(m/60); o.b[k] = (o.b[k]||0)+1; } });
    return o;
  }
  function cmpHtml(A, B, da, db){
    var peak = function(S){ var best = null; Object.keys(S.b).forEach(function(k){ if(best===null || S.b[k]>S.b[best]) best = k; }); return best; };
    var hl = function(k){ var h = (+k+12)%24; var ap = h>=12?'PM':'AM'; var hh = h%12||12; return hh+' '+ap; };
    var delta = function(a,b){ var d = a-b; return '<em class="'+(d>0?'up':d<0?'dn':'')+'">'+(d>0?'+':'')+d+'</em>'; };
    var h = '<div class="d39-cmp"><div class="d39-ch"><span></span><b>'+esc(da)+'</b><b>'+esc(db)+'</b><span></span></div>';
    [['Calls','total'],['1st round','first'],['2nd round +','adv'],['Unassigned','un'],['Waiting for invite','woi']].forEach(function(x){ h += '<div class="d39-cr"><span>'+x[0]+'</span><b>'+A[x[1]]+'</b><b>'+B[x[1]]+'</b>'+delta(A[x[1]],B[x[1]])+'</div>'; });
    var pa = peak(A), pb = peak(B);
    h += '<div class="d39-cr"><span>Busiest hour</span><b>'+(pa===null?'—':hl(pa)+' ('+A.b[pa]+')')+'</b><b>'+(pb===null?'—':hl(pb)+' ('+B.b[pb]+')')+'</b><em></em></div></div>';
    var mx = 1; for(var i=0;i<24;i++) mx = Math.max(mx, A.b[i]||0, B.b[i]||0);
    var bars = '';
    for(var k=0;k<24;k++){ if(!(A.b[k]||B.b[k])) continue; bars += '<div class="d39-br"><span>'+hl(k)+'</span><div><i class="a" style="width:'+Math.round((A.b[k]||0)/mx*100)+'%"></i><i class="b" style="width:'+Math.round((B.b[k]||0)/mx*100)+'%"></i></div><b>'+(A.b[k]||0)+' · '+(B.b[k]||0)+'</b></div>'; }
    return h + '<p class="d29-p">By hour (IST business day). <span class="d39-key a"></span>'+esc(da)+' <span class="d39-key b"></span>'+esc(db)+'</p>'+(bars||'<div class="d27-empty">No timed calls.</div>');
  }
  function openCmp(){
    var d1 = state.date, d0 = (typeof deskDateAdd==='function') ? deskDateAdd(d1,-7) : d1;
    var el = overlay('d39C','Day compare','SAME WEEKDAY LAST WEEK','<div class="d27-empty">Loading '+esc(d0)+'…</div>');
    var A = dayStats(rows());
    var go = function(L){ var B = dayStats(L.filter(function(r){ return r._date===d0; })); if(el.isConnected) el.querySelector('.d39-body').innerHTML = cmpHtml(A, B, d1, d0); };
    if(typeof fetchAllRowsAcrossDates==='function') fetchAllRowsAcrossDates().then(function(L){ go(L||[]); }).catch(function(){ if(el.isConnected) el.querySelector('.d39-body').innerHTML = (window.d35Fail?window.d35Fail('d39:cmp'):'Could not load.'); });
  }

  /* ---------- 6. daily scrum board ---------- */
  var SC = {rec:null, listening:false, recog:null, timer:0, dirty:false, idx:[], engine:(function(){ try{ return localStorage.getItem('cd.scrum.eng')||'groq'; }catch(e){ return 'groq'; } })(), lang:(function(){ try{ return localStorage.getItem('cd.scrum.lang')||'te'; }catch(e){ return 'te'; } })(), rg:null, cfg:null};
  var TECH = /(develop|engineer|data|devops|qa\b|test|java|python|\.net|cloud|sql|analyst|architect|sap|salesforce|software|full.?stack|ml\b|ai\b|security|network|sre|platform|backend|frontend)/i;
  var yday = function(){ var t = today(); return (typeof deskDateAdd==='function') ? deskDateAdd(t,-1) : t; };
  function newRec(L){
    var t = today(), y = yday();
    var pick = function(d){ return L.filter(function(r){ return r._date===d && r.candidate && !r.woi; }).sort(function(a,b){ return bd(a.time)-bd(b.time); }); };
    var tr = state.date===t && rows().length ? rows().filter(function(r){ return r.candidate && !r.woi; }).sort(function(a,b){ return bd(a.time)-bd(b.time); }) : pick(t);
    return { date:t, yesterday: pick(y).map(function(r){ var sf = (r.statusFields||[]).filter(function(f){ return (f.value||'').trim(); }).map(function(f){ return f.label+': '+f.value; }).join(' · ');
        return {id:r.id, time:r.time, candidate:r.candidate, company:r.company||'', round:r.round||'', status:r.status||'', note:sf, feedback:''}; }),
      today: tr.map(function(r){ return {id:r.id, time:r.time, candidate:r.candidate, company:r.company||'', round:r.round||'', role:r.role||'', type: TECH.test(r.role||'') ? 'technical' : 'theoretical'}; }),
      transcript:'', summary:'' };
  }
  function scrumHtml(){
    var R = SC.rec, T = R.today, tech = T.filter(function(c){ return c.type==='technical'; }).length, th = T.filter(function(c){ return c.type==='theoretical'; }).length;
    var h = '<div class="d39-sc"><div class="d39-scl">';
    h += '<div class="d39-sh">Yesterday’s calls <small>'+R.yesterday.length+'</small></div>';
    h += R.yesterday.length ? R.yesterday.map(function(c,i){ return '<div class="d39-cc"><div class="d39-c1"><b>'+esc(c.candidate)+'</b><small>'+esc([c.time,c.company,c.round].filter(Boolean).join(' · '))+'</small>'+(c.status?'<em>'+esc(c.status.replace(/_/g,' '))+'</em>':'')+'</div>'+(c.note?'<div class="d39-c2">'+esc(c.note)+'</div>':'')+'<textarea data-d39fb="'+i+'" rows="2" placeholder="How did it go / feedback…">'+esc(c.feedback)+'</textarea></div>'; }).join('') : '<div class="d27-empty">No calls found for yesterday.</div>';
    h += '<div class="d39-sh">Today’s calls <small>'+T.length+' · '+tech+' technical · '+th+' theoretical</small></div>';
    h += T.length ? T.map(function(c,i){ return '<div class="d39-cc"><div class="d39-c1"><b>'+esc(c.candidate)+'</b><small>'+esc([c.time,c.company,c.round,c.role].filter(Boolean).join(' · '))+'</small><select data-d39ty="'+i+'"><option value="technical"'+(c.type==='technical'?' selected':'')+'>Technical</option><option value="theoretical"'+(c.type==='theoretical'?' selected':'')+'>Theoretical</option><option value="other"'+(c.type==='other'?' selected':'')+'>Other</option></select></div></div>'; }).join('') : '<div class="d27-empty">No calls on the board for today.</div>';
    h += '</div><div class="d39-scr"><div class="d39-sh">Transcript <small id="d39St">'+(SC.listening?'🔴 listening…':'stopped')+'</small></div>'
      + '<div class="d39-sbar"><button type="button" class="d27-btn" data-d39s="mic">'+(SC.listening?'⏹ Stop':'🎙 Start listening')+'</button><button type="button" class="d27-btn" data-d39s="save">💾 Save record</button><button type="button" class="d27-btn" data-d39s="copy">📋 Copy</button><button type="button" class="d27-btn" data-d39s="past">🗂 Past</button></div>'
      + '<div class="d39-eng"><label>Engine <select data-d39eng><option value="groq"'+(SC.engine==='groq'?' selected':'')+'>Groq Whisper (accurate)</option><option value="browser"'+(SC.engine==='browser'?' selected':'')+'>Browser (free, basic)</option></select></label><label>Output <select data-d39lang><option value="te"'+(SC.lang==='te'?' selected':'')+'>Telugu text</option><option value="en"'+(SC.lang==='en'?' selected':'')+'>English translation</option></select></label></div>'
      + '<textarea id="d39Tx" rows="14" placeholder="Telugu speech appears here while you talk. You can type or fix anything.">'+esc(R.transcript)+'</textarea>'
      + '<div class="d39-sh">Decisions / action items</div><textarea id="d39Sm" rows="4" placeholder="Notes for the record…">'+esc(R.summary)+'</textarea>'
      + '<p class="d29-p" id="d39Ms">Speech is typed from this device’s microphone (Chrome). No audio is stored. Tell the team the scrum is being transcribed.</p></div></div>';
    return h;
  }
  function sync(el){
    var tx = el.querySelector('#d39Tx'), sm = el.querySelector('#d39Sm'); if(tx) SC.rec.transcript = tx.value; if(sm) SC.rec.summary = sm.value;
    el.querySelectorAll('[data-d39fb]').forEach(function(t){ var c = SC.rec.yesterday[+t.getAttribute('data-d39fb')]; if(c) c.feedback = t.value; });
    el.querySelectorAll('[data-d39ty]').forEach(function(s){ var c = SC.rec.today[+s.getAttribute('data-d39ty')]; if(c) c.type = s.value; });
  }
  function stopMic(){
    SC.listening = false; try{ if(SC.recog){ SC.recog.onend = null; SC.recog.stop(); } }catch(e){} SC.recog = null;
    var g = SC.rg; if(g){ g.on = false; clearTimeout(g.t); try{ if(g.rec && g.rec.state!=='inactive') g.rec.stop(); }catch(e){} setTimeout(function(){ try{ g.stream.getTracks().forEach(function(t){ t.stop(); }); }catch(e){} }, 1500); }
  }
  /* Groq Whisper: record the mic in ~25 s standalone chunks, send each to the server (which forwards to Groq and keeps nothing). */
  function stamp(){ var d = new Date(); return '['+('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)+'] '; }
  function b64(blob){ return new Promise(function(res, rej){ var f = new FileReader(); f.onload = function(){ res(String(f.result).split(',')[1]||''); }; f.onerror = rej; f.readAsDataURL(blob); }); }
  function startGroq(el){
    var ms = el.querySelector('#d39Ms'), tx = el.querySelector('#d39Tx');
    if(!navigator.mediaDevices || !window.MediaRecorder){ if(ms) ms.textContent = 'This browser can’t record audio. Use Chrome.'; return; }
    navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false, noiseSuppression:false, autoGainControl:true}}).then(function(stream){
      var g = SC.rg = {on:true, stream:stream, rec:null, t:0, q:Promise.resolve(), sent:0, done:0, err:0};
      SC.listening = true; paintBtns(el);
      var mime = ['audio/webm;codecs=opus','audio/webm','audio/mp4'].filter(function(m){ try{ return MediaRecorder.isTypeSupported(m); }catch(e){ return false; } })[0] || '';
      var info = function(extra){ if(ms) ms.textContent = 'Groq Whisper · '+g.done+'/'+g.sent+' pieces transcribed'+(extra?' · '+extra:''); };
      function send(blob){
        if(blob.size < 3000) return; g.sent++; info('working…');
        g.q = g.q.then(function(){ return b64(blob); }).then(function(a){
          return apiCall('stt',{method:'POST', timeoutMs:60000, body:{audio:a, mime:blob.type||mime, mode: SC.lang==='en' ? 'translate' : 'transcribe'}});
        }).then(function(j){
          g.done++; var t = (j && j.text || '').trim();
          if(t && tx){ var cur = tx.value; tx.value = cur + (cur && !/\n$/.test(cur) ? '\n' : '') + stamp() + t; tx.scrollTop = tx.scrollHeight; SC.rec.transcript = tx.value; SC.dirty = true; }
          info();
        }).catch(function(e){ g.done++; g.err++; info('a piece failed: '+String((e&&e.message)||e).replace(/^stt:\s*/,'').slice(0,90)); });
      }
      function cycle(){
        if(!g.on || !el.isConnected){ return; }
        var chunks = [], rec;
        try{ rec = new MediaRecorder(stream, mime ? {mimeType:mime} : undefined); }catch(e){ if(ms) ms.textContent = 'Could not start recording.'; SC.listening = false; paintBtns(el); return; }
        g.rec = rec;
        rec.ondataavailable = function(ev){ if(ev.data && ev.data.size) chunks.push(ev.data); };
        rec.onstop = function(){ send(new Blob(chunks, {type: rec.mimeType || mime || 'audio/webm'})); if(g.on) cycle(); else { SC.listening = false; paintBtns(el); } };
        rec.start(); g.t = setTimeout(function(){ try{ if(rec.state!=='inactive') rec.stop(); }catch(e){} }, 25000);
      }
      cycle(); info('listening, first text in ~25 s');
    }).catch(function(e){ if(ms) ms.textContent = (e && e.name==='NotAllowedError') ? 'Microphone is blocked. Allow it in the address bar, then press Start.' : 'Could not open the microphone.'; });
  }
  function startMic(el){
    if(SC.engine==='groq' && SC.cfg!==false) return startGroq(el);
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    var ms = el.querySelector('#d39Ms');
    if(!SR){ if(ms) ms.textContent = 'This browser can’t transcribe speech. Use Chrome on the laptop.'; return; }
    var rec = new SR(); rec.lang = 'te-IN'; rec.continuous = true; rec.interimResults = true; SC.recog = rec; SC.listening = true;
    var tx = el.querySelector('#d39Tx'), base = tx.value;
    rec.onresult = function(ev){
      var fin = '', interim = '';
      for(var i=ev.resultIndex;i<ev.results.length;i++){ var r = ev.results[i]; if(r.isFinal) fin += r[0].transcript; else interim += r[0].transcript; }
      if(fin){ var d = new Date(), stamp = '['+('0'+d.getHours()).slice(-2)+':'+('0'+d.getMinutes()).slice(-2)+'] '; base += (base && !/\n$/.test(base) ? '\n' : '')+stamp+fin.trim(); }
      tx.value = base + (interim ? (base?'\n':'')+interim : ''); tx.scrollTop = tx.scrollHeight; SC.rec.transcript = base; SC.dirty = true;
    };
    rec.onerror = function(ev){ if(ms) ms.textContent = ev.error==='not-allowed' ? 'Microphone is blocked. Allow it in the address bar, then press Start.' : ev.error==='no-speech' ? 'Waiting for speech…' : 'Mic problem: '+ev.error; if(ev.error==='not-allowed'){ SC.listening = false; paintBtns(el); } };
    rec.onend = function(){ if(SC.listening && el.isConnected){ try{ rec.start(); }catch(e){} } else { SC.listening = false; paintBtns(el); } };
    try{ rec.start(); }catch(e){ if(ms) ms.textContent = 'Could not start the microphone.'; SC.listening = false; }
    paintBtns(el);
  }
  function paintBtns(el){ var b = el.querySelector('[data-d39s="mic"]'), s = el.querySelector('#d39St'); if(b) b.textContent = SC.listening ? '⏹ Stop' : '🎙 Start listening'; if(s) s.textContent = SC.listening ? '🔴 listening…' : 'stopped'; }
  function saveRec(el){
    sync(el); var r = SC.rec, ms = el.querySelector('#d39Ms');
    var calls = [apiCall('app_settings',{method:'POST',body:{key:'scrum_'+r.date, value:JSON.stringify(r)}})];
    if(SC.idx.indexOf(r.date)<0) SC.idx.unshift(r.date);
    calls.push(apiCall('app_settings',{method:'POST',body:{key:'scrum_index', value:JSON.stringify(SC.idx.slice(0,120))}}));
    Promise.all(calls).then(function(){ SC.dirty = false; if(ms) ms.textContent = 'Saved as '+r.date+'.'; toast('Scrum saved'); }).catch(function(e){ if(ms) ms.textContent = 'Could not save: '+((e&&e.message)||e); });
  }
  function scrumText(){
    var r = SC.rec, L = ['Daily scrum — '+r.date, '', 'YESTERDAY'];
    r.yesterday.forEach(function(c){ L.push('• '+c.candidate+' ('+[c.time,c.company,c.round].filter(Boolean).join(', ')+')'+(c.status?' ['+c.status+']':'')+(c.feedback?' — '+c.feedback:'')); });
    L.push('', 'TODAY ('+r.today.length+' calls)'); r.today.forEach(function(c){ L.push('• '+c.time+' '+c.candidate+' — '+c.company+' · '+c.type); });
    L.push('', 'NOTES', r.summary||'', '', 'TRANSCRIPT', r.transcript||''); return L.join('\n');
  }
  function openPast(el){
    var body = el.querySelector('.d39-body'); sync(el);
    var go = function(){ body.innerHTML = '<button type="button" class="d27-btn" data-d39s="back">‹ Back</button><div class="d27-list">'+(SC.idx.length ? SC.idx.map(function(d){ return '<button type="button" class="d27-row" data-d39ld="'+esc(d)+'"><span class="n"><b>'+esc(d)+'</b></span><span class="o">›</span></button>'; }).join('') : '<div class="d27-empty">No saved scrums yet.</div>')+'</div>'; };
    apiCall('app_settings',{qs:'key=scrum_index'}).then(function(d){ try{ SC.idx = JSON.parse(d.value)||[]; }catch(e){} go(); }).catch(function(){ go(); });
  }
  function openScrum(){
    var el = overlay('d39S','Daily scrum','11:30 AM BOARD','<div class="d27-empty">Loading calls…</div>','d39-wide');
    var show = function(L){ SC.rec = newRec(L||[]);
      apiCall('app_settings',{qs:'key=scrum_'+SC.rec.date}).then(function(d){ if(d && d.value){ try{ var saved = JSON.parse(d.value); if(saved && saved.date===SC.rec.date) SC.rec = saved; }catch(e){} } }).catch(function(){}).then(function(){ if(el.isConnected) el.querySelector('.d39-body').innerHTML = scrumHtml(); });
    };
    if(typeof fetchAllRowsAcrossDates==='function') fetchAllRowsAcrossDates().then(show).catch(function(){ show([]); }); else show([]);
    el.addEventListener('click', function(e){
      var b = e.target.closest && e.target.closest('[data-d39s]'); var k = b && b.getAttribute('data-d39s');
      if(k==='mic'){ if(SC.listening){ stopMic(); paintBtns(el); } else startMic(el); }
      else if(k==='save') saveRec(el);
      else if(k==='copy'){ sync(el); copy(scrumText()); }
      else if(k==='past') openPast(el);
      else if(k==='back'){ el.querySelector('.d39-body').innerHTML = scrumHtml(); }
      var ld = e.target.closest && e.target.closest('[data-d39ld]');
      if(ld){ var d = ld.getAttribute('data-d39ld'); apiCall('app_settings',{qs:'key=scrum_'+d}).then(function(x){ try{ SC.rec = JSON.parse(x.value); }catch(e){} el.querySelector('.d39-body').innerHTML = scrumHtml(); }).catch(function(){ toast('Could not load'); }); }
      if(e.target===el || (e.target.closest && e.target.closest('[data-d39x]'))){ stopMic(); }
    });
    el.addEventListener('input', function(){ SC.dirty = true; });
    el.addEventListener('change', function(e){
      var t = e.target; if(!t.getAttribute) return;
      if(t.hasAttribute('data-d39eng')){ SC.engine = t.value; try{ localStorage.setItem('cd.scrum.eng', t.value); }catch(x){} if(SC.listening){ stopMic(); paintBtns(el); } }
      if(t.hasAttribute('data-d39lang')){ SC.lang = t.value; try{ localStorage.setItem('cd.scrum.lang', t.value); }catch(x){} }
    });
    apiCall('stt',{}).then(function(j){ SC.cfg = !!(j && j.configured); var ms = el.querySelector('#d39Ms'); if(!SC.cfg){ SC.engine = 'browser'; var s2 = el.querySelector('[data-d39eng]'); if(s2) s2.value = 'browser'; if(ms) ms.textContent = 'Groq Whisper is not switched on yet (GROQ_API_KEY missing). Using the free browser engine.'; } }).catch(function(){});
  }

  var prev = window.d35Open;
  window.d35Open = function(k){ if(k==='dcmp'){ openCmp(); return true; } if(k==='scrum'){ openScrum(); return true; } return typeof prev==='function' ? prev(k) : false; };
  window.d39TimeText = timeText; window.d39HistoryHtml = historyHtml; window.d39Conf = getConf; window.d39SetConf = setConf;
  window.d39History = function(id){ var r = rowById(id); if(r) overlay('d39H','Call history','THIS CALL', historyHtml(r)); };

  function hook(){
    if(typeof window.render!=='function' || !window.__d17vw) return setTimeout(hook, 300);
    var o = window.render, tm = 0;
    window.render = function(){ var r = o.apply(this, arguments); clearTimeout(tm); tm = setTimeout(ring, 120); return r; };
    setInterval(ring, 30000); setTimeout(ring, 400);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', hook); else hook();
})();

/* ===== d40: V3.1 — person card: hover (or tap) any person's name for Today / Week / Incentives / Record ===== */
(function(){
  if(window.__d40) return; window.__d40 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var bd = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var rows = function(){ return (typeof state!=='undefined' && state.rows) || []; };
  var today = function(){ try{ return todayDateString(); }catch(e){ return ''; } };
  var phone = function(){ return (window.__d17vw||innerWidth) < 760; };
  var inr = function(n){ try{ return '₹'+Number(n||0).toLocaleString('en-IN'); }catch(e){ return '₹'+n; } };
  var same = function(a,b){ a = String(a||'').trim(); b = String(b||'').trim(); if(!a||!b) return false; if(a.toLowerCase()===b.toLowerCase()) return true; try{ return namesEquivalent(a,b); }catch(e){ return false; } };
  var ownerOf = function(r){ try{ var o = window.cdOwnerOf && window.cdOwnerOf(r); return o && o.name ? o.name : (r.assignee||''); }catch(e){ return r.assignee||''; } };
  var durMin = function(r){ var m = String(r.duration||'').match(/\d+/); return m ? +m[0] : 30; };
  var fmtBd = function(m){ var t = (m+720)%1440, h = Math.floor(t/60), mi = t%60, ap = h>=12?'PM':'AM'; return (h%12||12)+':'+('0'+mi).slice(-2)+' '+ap; };
  var ICON = {rescheduled:'🔁', cancelled:'✕', not_responded:'☎', no_invite:'📨'};
  var row3 = function(a,b,c){ return '<div class="d40-r"><span class="t">'+a+'</span><span class="n">'+b+'</span><span class="o">'+(c||'')+'</span></div>'; };
  var sum = function(items){ return '<div class="d40-sum">'+items.map(function(i){ return '<span class="'+(i[2]||'')+'"><b>'+i[0]+'</b> '+i[1]+'</span>'; }).join('')+'</div>'; };
  var loading = '<div class="d40-empty">Loading…</div>';
  var TABS = [['today','Today'],['week','Week'],['inc','Incentives'],['rec','Record']];

  function personInfo(name){
    var p = (state.roster||[]).filter(function(x){ return same(x.name,name); })[0] || null, off = false;
    try{ off = !!(p && (state.absentIds||[]).indexOf(p.id)>=0); }catch(e){}
    return {team: p ? (p.team||'') : '', off: off};
  }
  function todayHtml(name){
    var isToday = state.date===today(), n = isToday ? (function(){ var d=new Date(); return (d.getHours()*60+d.getMinutes()+720)%1440; })() : 0;
    var L = rows().filter(function(r){ return r.candidate && !r.woi && same(ownerOf(r),name); }).sort(function(a,b){ return bd(a.time)-bd(b.time); });
    var live = L.filter(function(r){ return !r.status; }), left = live.filter(function(r){ return bd(r.time)+durMin(r)>=n; }), out = L.length-live.length;
    var h = sum([[L.length,'call'+(L.length===1?'':'s')+' · '+esc(state.date)],[left.length,'left'],[out,'rescheduled / cancelled', out?'bad':'']]);
    if(!L.length) return h+'<div class="d40-empty">No calls on this day.</div>';
    h += '<div class="d40-list">'+L.map(function(r){
      var b = bd(r.time), now = isToday && !r.status && n>=b && n<b+durMin(r);
      return '<div class="d40-r'+(now?' now':'')+(r.status?' dim':'')+'"><span class="t">'+esc(r.time||'')+'</span><span class="n"><b>'+esc(r.candidate)+'</b><small>'+esc([r.company,r.round,r.role].filter(Boolean).join(' · '))+'</small></span><span class="o">'+(r.status?(ICON[r.status]||esc(r.status)):(now?'● now':''))+'</span></div>';
    }).join('')+'</div>';
    var t = Math.max(n,0), ok = null; for(var i=0;i<live.length;i++){ var s = bd(live[i].time), e = s+durMin(live[i]); if(e<t) continue; if(s-t>=45){ ok = t; break; } t = Math.max(t,e); }
    if(ok===null && t<=1440-45) ok = t;
    return h+'<div class="d40-foot">Next free (45 min): <b>'+(ok===null?'none today':esc(fmtBd(ok)))+'</b></div>';
  }
  function allRows(){ return typeof fetchAllRowsAcrossDates==='function' ? fetchAllRowsAcrossDates().then(function(L){ return L||[]; }) : Promise.resolve([]); }
  function weekHtml(name){
    return allRows().then(function(A){
      var mon = deskMonday(today()), days = [], i, byDay = {}, cl = {};
      for(i=0;i<7;i++) days.push(deskDateAdd(mon,i));
      var mine = A.filter(function(r){ return r.candidate && !r.woi && days.indexOf(r._date)>=0 && same(ownerOf(r),name); });
      mine.forEach(function(r){ byDay[r._date] = (byDay[r._date]||0)+1; var k = r.company||'—'; cl[k] = (cl[k]||0)+1; });
      var mx = 1; days.forEach(function(d){ mx = Math.max(mx, byDay[d]||0); });
      var names = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      var h = sum([[mine.length,'calls this week'],[mine.filter(function(r){ return r.status; }).length,'rescheduled / cancelled']]);
      h += '<div class="d40-list">'+days.map(function(d,i){ var c = byDay[d]||0; return '<div class="d40-bar'+(d===today()?' now':'')+'"><span>'+names[i]+' '+d.slice(8)+'</span><i><u style="width:'+Math.round(c/mx*100)+'%"></u></i><b>'+c+'</b></div>'; }).join('')+'</div>';
      var top = Object.keys(cl).sort(function(a,b){ return cl[b]-cl[a]; }).slice(0,4);
      if(top.length) h += '<div class="d40-foot">Most calls with: '+top.map(function(k){ return '<b>'+esc(k)+'</b> ('+cl[k]+')'; }).join(' · ')+'</div>';
      return h;
    });
  }
  function incHtml(name){
    if(!window.d34IncData) return '<div class="d40-empty">Incentives are not available yet.</div>';
    return window.d34IncData().then(function(D){
      var C = D && D.cur && D.cur.d; if(!C || !(C.byHandler||[]).length) return '<div class="d40-empty">No incentive data saved for this month yet. Open Reports → Incentives and press Refresh once.</div>';
      var H = C.byHandler.slice().sort(function(a,b){ return Number(b.total||0)-Number(a.total||0); });
      var i = -1; H.forEach(function(x,k){ if(i<0 && same(x.handler,name)) i = k; });
      if(i<0) return '<div class="d40-empty">'+esc(name)+' has no incentive entry this month.</div>';
      var m = H[i], tot = Number(m.total||0), P = D.prev && D.prev.d, pm = P ? (P.byHandler||[]).filter(function(h){ return same(h.handler,name); })[0] : null;
      var now = D.now, day = now.getDate(), dim = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate(), proj = day ? Math.round(tot/day*dim) : tot;
      var h = '<div class="d40-big"><small>'+esc(now.toLocaleString(undefined,{month:'long',year:'numeric'}))+' · so far</small><b>'+inr(tot)+'</b><span>#'+(i+1)+' of '+H.length+'</span></div>';
      h += sum([[inr(m.promotion),'promotion'],[inr(m.selection),'selection'],[Number(m.records||0),'records']]);
      h += '<div class="d40-list">';
      if(i>0) h += row3('⬆','<b>'+inr(Number(H[i-1].total||0)-tot)+' to pass '+esc(H[i-1].handler)+'</b>','');
      else h += row3('🏆','<b>#1 this month</b>','');
      if(pm){ var d = tot-Number(pm.total||0); h += row3(d>=0?'📈':'📉','<b>'+(d>=0?'+':'−')+inr(Math.abs(d))+' vs last month</b><small>last month '+inr(pm.total)+'</small>',''); }
      h += row3('🧮','<b>On pace for '+inr(proj)+'</b><small>day '+day+' of '+dim+'</small>','')+'</div>';
      return h;
    });
  }
  function recHtml(name){
    var pInc = window.d34IncData ? window.d34IncData().catch(function(){ return null; }) : Promise.resolve(null);
    return Promise.all([allRows(), pInc]).then(function(R){
      var A = R[0], D = R[1], from = deskDateAdd(today(),-29);
      var mine = A.filter(function(r){ return r.candidate && !r.woi && r._date>=from && r._date<=today() && same(ownerOf(r),name); });
      var st = {}; mine.forEach(function(r){ if(r.status) st[r.status] = (st[r.status]||0)+1; });
      var bad = Object.keys(st).reduce(function(t,k){ return t+st[k]; },0), rate = mine.length ? Math.round(bad/mine.length*100) : 0;
      var h = sum([[mine.length,'calls · 30 days'],[bad,'did not go ahead', bad?'bad':''],[rate+'%','of their calls']]);
      var keys = Object.keys(st); 
      if(keys.length) h += '<div class="d40-list">'+keys.map(function(k){ return row3(ICON[k]||'•','<b>'+esc(k.replace(/_/g,' '))+'</b>','<b>'+st[k]+'</b>'); }).join('')+'</div>';
      var cl = null; try{ cl = ((D&&D.closures||{}).rows||[]).filter(function(r){ return same(r.handler,name); })[0]; }catch(e){}
      if(cl) h += '<div class="d40-list">'+row3('🏆','<b>'+cl.closures+' closure'+(cl.closures===1?'':'s')+' credited</b><small>all time, matched to calls</small>','')+'</div>';
      var rc = {}; mine.forEach(function(r){ var k = r.role||''; if(k) rc[k] = (rc[k]||0)+1; });
      var tr = Object.keys(rc).sort(function(a,b){ return rc[b]-rc[a]; }).slice(0,4);
      if(tr.length) h += '<div class="d40-foot">Usually handles: '+tr.map(function(k){ return '<b>'+esc(k)+'</b> ('+rc[k]+')'; }).join(' · ')+'</div>';
      return h;
    });
  }
  function tabBody(name, tab){ return tab==='today' ? todayHtml(name) : tab==='week' ? weekHtml(name) : tab==='inc' ? incHtml(name) : recHtml(name); }
  window.d40Person = function(name, tab){
    tab = tab || 'today'; var pi = personInfo(name);
    return '<div class="d40-card" data-d40n="'+esc(name)+'" data-d40tab="'+tab+'"><div class="d40-hd"><b>'+esc(name)+'</b><small>'+esc(pi.team||'')+(pi.off?' · 🏖 off today':'')+'</small></div>'
      + '<div class="d40-tabs">'+TABS.map(function(t){ return '<button type="button" data-d40t="'+t[0]+'" class="'+(t[0]===tab?'on':'')+'">'+t[1]+'</button>'; }).join('')+'</div>'
      + '<div class="d40-body">'+todayHtml(name)+'</div></div>';
  };
  document.addEventListener('click', function(e){
    var t = e.target.closest && e.target.closest('[data-d40t]'); if(!t) return;
    e.preventDefault(); e.stopPropagation();
    var card = t.closest('.d40-card'), name = card.getAttribute('data-d40n'), tab = t.getAttribute('data-d40t');
    card.setAttribute('data-d40tab', tab); card.querySelectorAll('[data-d40t]').forEach(function(b){ b.classList.toggle('on', b===t); });
    var body = card.querySelector('.d40-body'); body.innerHTML = loading;
    Promise.resolve().then(function(){ return tabBody(name, tab); }).then(function(h){ if(card.isConnected && card.getAttribute('data-d40tab')===tab) body.innerHTML = h; })
      .catch(function(){ if(card.isConnected) body.innerHTML = '<div class="d40-empty">Could not load. Close and try again.</div>'; });
  }, true);

  /* ---- generic hover / tap on any [data-d40p] name ---- */
  var pop = null, timer = null, curEl = null;
  function hide(){ clearTimeout(timer); curEl = null; if(pop){ pop.remove(); pop = null; } }
  function show(el){
    hide(); var name = el.getAttribute('data-d40p'); if(!name) return; curEl = el;
    pop = document.createElement('div'); pop.id = 'd40Pop'; pop.innerHTML = window.d40Person(name); document.body.appendChild(pop);
    var r = el.getBoundingClientRect(), w = pop.offsetWidth, h = pop.offsetHeight;
    pop.style.left = Math.max(8, Math.min(r.left, innerWidth-w-8))+'px'; var top = r.bottom+6; if(top+h>innerHeight-8) top = Math.max(8, r.top-h-6); pop.style.top = top+'px';
  }
  document.addEventListener('mouseover', function(e){
    if(phone()) return; var t = e.target; if(!t.closest) return; var el = t.closest('[data-d40p]'); if(!el) return;
    if(el===curEl && pop) return; clearTimeout(timer); timer = setTimeout(function(){ show(el); }, 380);
  }, true);
  document.addEventListener('mouseout', function(e){
    var t = e.target; if(!t.closest) return; var inEl = t.closest('[data-d40p]'), inPop = t.closest('#d40Pop'); if(!inEl && !inPop) return;
    var to = e.relatedTarget; if(to && ((inEl && inEl.contains(to)) || (pop && pop.contains(to)))) return;
    clearTimeout(timer); setTimeout(function(){ if(pop && !pop.matches(':hover') && !(curEl && curEl.matches(':hover'))) hide(); }, 200);
  }, true);
  ['mousedown','scroll','keydown','touchstart'].forEach(function(ev){ document.addEventListener(ev, function(e){ if(pop && e.target && e.target.nodeType===1 && pop.contains(e.target)) return; hide(); }, true); });
  function sheet(name){
    var old = document.getElementById('d40S'); if(old) old.remove();
    var el = document.createElement('div'); el.id = 'd40S'; el.className = 'd27-ov d40-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>PERSON</small><h2>'+esc(name)+'</h2></div><button type="button" class="d27-x" data-d40x aria-label="Close">✕</button></div><div class="d29-body">'+window.d40Person(name)+'</div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d40x]'))){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); } });
  }
  window.d40Open = sheet;
  document.addEventListener('click', function(e){
    var el = e.target.closest && e.target.closest('[data-d40p]'); if(!el || !phone()) return;
    e.preventDefault(); e.stopPropagation(); sheet(el.getAttribute('data-d40p'));
  }, true);

  /* ---- Tools hub: pick a person ---- */
  function picker(){
    var old = document.getElementById('d40P'); if(old) old.remove();
    var ppl = (state.roster||[]).filter(function(p){ return p && p.name; }).sort(function(a,b){ return (a.team||'').localeCompare(b.team||'') || a.name.localeCompare(b.name); });
    var el = document.createElement('div'); el.id = 'd40P'; el.className = 'd27-ov d40-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>PEOPLE</small><h2>Person card</h2></div><button type="button" class="d27-x" data-d40x aria-label="Close">✕</button></div><div class="d29-body"><input class="d40-q" placeholder="Search a person…" autocomplete="off"><div class="d27-list d40-pl">'+ppl.map(function(p){ return '<button type="button" class="d27-row" data-d40pick="'+esc(p.name)+'"><span class="n"><b>'+esc(p.name)+'</b><small>'+esc(p.team||'')+'</small></span><span class="o">›</span></button>'; }).join('')+'</div></div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('input', function(e){ if(!e.target.classList.contains('d40-q')) return; var q = e.target.value.toLowerCase(); el.querySelectorAll('[data-d40pick]').forEach(function(b){ b.style.display = b.textContent.toLowerCase().indexOf(q)>=0 ? '' : 'none'; }); });
    el.addEventListener('click', function(e){
      if(e.target===el || (e.target.closest && e.target.closest('[data-d40x]'))){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); return; }
      var b = e.target.closest && e.target.closest('[data-d40pick]'); if(b){ var n = b.getAttribute('data-d40pick'); el.remove(); sheet(n); }
    });
  }
  var prev = window.d35Open;
  window.d35Open = function(k){ if(k==='person'){ picker(); return true; } return typeof prev==='function' ? prev(k) : false; };

  /* decorate names that live in rendered lists (Insights owners, incentives leaderboard) */
  function decorate(){
    document.querySelectorAll('.d27-load > div > span:first-child:not([data-d40p])').forEach(function(s){
      var n = s.textContent.trim(); if(!n) return; var ok = (state.roster||[]).some(function(p){ return same(p.name,n); });
      if(ok){ s.setAttribute('data-d40p', n); s.style.cursor = 'help'; }
    });
  }
  try{ new MutationObserver(function(){ clearTimeout(decorate._t); decorate._t = setTimeout(decorate, 150); }).observe(document.body, {childList:true, subtree:true}); }catch(e){}
})();

/* ===== d41: V3.2 — tabs on candidate & client cards, call card, person names in more places ===== */
(function(){
  if(window.__d41) return; window.__d41 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var nk = function(c){ try{ return normalizeNameKey(c||''); }catch(e){ return String(c||'').toLowerCase().replace(/[^a-z]/g,''); } };
  var rows = function(){ return (typeof state!=='undefined' && state.rows) || []; };
  var rowById = function(id){ return rows().filter(function(r){ return String(r.id)===String(id); })[0] || null; };
  var ICON = {rescheduled:'🔁', cancelled:'✕', not_responded:'☎', no_invite:'📨'};
  var loading = '<div class="d41-empty">Loading…</div>';
  var ownerOf = function(r){ try{ var o = window.cdOwnerOf && window.cdOwnerOf(r); return o && o.name ? o.name : (r.assignee||''); }catch(e){ return r.assignee||''; } };
  var adv = function(rd){ try{ return isAdvancedRound(rd); }catch(e){ return /2|3|final|second|third/i.test(rd||''); } };
  var short = function(d){ var p = String(d||'').split('-'); return p.length===3 ? p[2]+'/'+p[1] : d||''; };
  var sum = function(items){ return '<div class="d41-sum">'+items.map(function(i){ return '<span class="'+(i[2]||'')+'"><b>'+i[0]+'</b> '+i[1]+'</span>'; }).join('')+'</div>'; };
  function allRows(){ return typeof fetchAllRowsAcrossDates==='function' ? fetchAllRowsAcrossDates().then(function(L){ return L||[]; }) : Promise.resolve([]); }
  var pname = function(n){ return '<span data-d40p="'+esc(n)+'" style="cursor:help">'+esc(n)+'</span>'; };

  /* ---------- candidate panes ---------- */
  function roundsHtml(name){
    return allRows().then(function(A){
      var k = nk(name), L = A.filter(function(r){ return r.candidate && nk(r.candidate)===k && !r.woi; }).sort(function(a,b){ return String(a._date).localeCompare(String(b._date)); });
      if(!L.length) return '<div class="d41-empty">No other calls found for this candidate.</div>';
      var cos = {}; L.forEach(function(r){ if(r.company) cos[r.company.toLowerCase()] = 1; });
      var h = sum([[L.length,'call'+(L.length===1?'':'s')],[Object.keys(cos).length,'client'+(Object.keys(cos).length===1?'':'s')],[L.filter(function(r){ return adv(r.round); }).length,'2nd round +']]);
      return h+'<div class="d41-list">'+L.map(function(r){
        var o = ownerOf(r);
        return '<div class="d41-r"><span class="t">'+esc(short(r._date))+'</span><span class="n"><b>'+esc(r.company||'—')+'</b><small>'+esc([r.round,r.role,r.time].filter(Boolean).join(' · '))+'</small></span><span class="o">'+(r.status?(ICON[r.status]||esc(r.status)):'')+(o?' '+pname(o):'')+'</span></div>';
      }).join('')+'</div>';
    });
  }
  function testsHtml(name, row){
    var h = '', as = [], os = [];
    try{ as = assessmentsForCandidate(name, row && row.company) || []; }catch(e){}
    try{ os = onsitesForCandidate(name, row && row.company) || []; }catch(e){}
    h += '<div class="d41-sec">Assessments</div>'+(as.length ? '<div class="d41-list">'+as.map(function(a){ return '<div class="d41-r"><span class="t">'+esc(short(a.date))+'</span><span class="n"><b>'+esc(a.assessment||'Assessment')+'</b><small>'+esc(a.company||'')+'</small></span><span class="o">'+esc(a.done?'done':(a.status||'pending'))+'</span></div>'; }).join('')+'</div>' : '<div class="d41-empty">None on file.</div>');
    h += '<div class="d41-sec">Onsite</div>'+(os.length ? '<div class="d41-list">'+os.map(function(o){ return '<div class="d41-r"><span class="t">'+esc(short(o.date))+'</span><span class="n"><b>'+esc(o.company||'Onsite')+'</b><small>'+esc(o.location||'')+'</small></span><span class="o"></span></div>'; }).join('')+'</div>' : '<div class="d41-empty">None on file.</div>');
    var flags = [];
    try{ if(row && row.candidate){ var key = nk(row.candidate)+'|'+(typeof normalizeCompanyKey==='function'?normalizeCompanyKey(row.company||''):''); if(typeof expectedClosureKeys!=='undefined' && expectedClosureKeys.has(key)) flags.push('🎯 Flagged as an expected closure'); } }catch(e){}
    try{ var rn = row ? findRepeatNoShowFlag(row) : null; if(rn) flags.push('⚠ '+rn.count+' earlier rescheduled / cancelled / no-response outcomes'); }catch(e){}
    if(flags.length) h += '<div class="d41-sec">Flags</div>'+flags.map(function(f){ return '<div class="d41-note">'+esc(f)+'</div>'; }).join('');
    if(row) h += '<button type="button" class="d27-btn d41-btn" data-d41prep="'+esc(row.id)+'">🧭 Open prep card</button>';
    return h;
  }
  /* ---------- client panes ---------- */
  function collectFor(name, row){
    var L = []; try{ L = window.d31Collect ? (window.d31Collect(row || {company:name, candidate:'', country:''}, name) || []) : []; }catch(e){} return L;
  }
  function statsHtml(name, row){
    return allRows().then(function(){
      var L = collectFor(name, row), rule = ''; try{ rule = window.d29RuleFor ? window.d29RuleFor(name) : ''; }catch(e){}
      var h = rule ? '<div class="d41-note">📌 <b>Client rule</b><br>'+esc(rule)+'</div>' : '<div class="d41-empty">No client rule saved. Add one in Tools → Client rules.</div>';
      if(!L.length) return h+'<div class="d41-empty">No calls on file for this client.</div>';
      var cand = {}, bad = 0, a2 = 0, roles = {}, days = {};
      L.forEach(function(o){ cand[nk(o.candidate)] = 1; if(o.status) bad++; if(adv(o.round)) a2++; if(o.role) roles[o.role] = (roles[o.role]||0)+1; days[o.date] = 1; });
      h += sum([[L.length,'calls'],[Object.keys(cand).length,'candidates'],[Math.round(bad/L.length*100)+'%','did not go ahead', bad?'bad':''],[a2,'2nd round +']]);
      var tr = Object.keys(roles).sort(function(a,b){ return roles[b]-roles[a]; }).slice(0,5);
      if(tr.length) h += '<div class="d41-sec">Roles they hire for</div><div class="d41-list">'+tr.map(function(k){ return '<div class="d41-r"><span class="t"></span><span class="n"><b>'+esc(k)+'</b></span><span class="o"><b>'+roles[k]+'</b></span></div>'; }).join('')+'</div>';
      return h+'<div class="d41-foot">Across '+Object.keys(days).length+' day'+(Object.keys(days).length===1?'':'s')+' on file.</div>';
    });
  }
  function whoHtml(name, row){
    return allRows().then(function(){
      var L = collectFor(name, row), by = {};
      L.forEach(function(o){ var k = o.owner || ''; if(!k) return; try{ if(getTeamNames().has(k)) return; }catch(e){} by[k] = by[k] || {n:0, bad:0}; by[k].n++; if(o.status) by[k].bad++; });
      var ks = Object.keys(by).sort(function(a,b){ return by[b].n-by[a].n; });
      if(!ks.length) return '<div class="d41-empty">No handler information for this client yet.</div>';
      var best = ks.filter(function(k){ return by[k].n>=3; }).sort(function(a,b){ return by[a].bad/by[a].n-by[b].bad/by[b].n || by[b].n-by[a].n; })[0];
      var h = best ? '<div class="d41-note">⭐ Smoothest so far: <b>'+pname(best)+'</b> — '+by[best].n+' calls, '+Math.round(by[best].bad/by[best].n*100)+'% did not go ahead</div>' : '<div class="d41-empty">Need 3+ calls per handler to suggest the smoothest one.</div>';
      return h+'<div class="d41-list">'+ks.slice(0,10).map(function(k){ return '<div class="d41-r"><span class="t"></span><span class="n"><b>'+pname(k)+'</b><small>'+Math.round(by[k].bad/by[k].n*100)+'% did not go ahead</small></span><span class="o"><b>'+by[k].n+'</b> calls</span></div>'; }).join('')+'</div>';
    });
  }
  var KINDS = {
    cand: [['hist','History'],['rounds','Rounds'],['tests','Tests & flags']],
    client: [['hist','History'],['stats','Rules & stats'],['who','Handlers']]
  };
  var ACT = {cand:'hist', client:'hist'};
  function paneHtml(kind, tab, name, row){
    if(kind==='cand') return tab==='rounds' ? roundsHtml(name) : testsHtml(name, row);
    return tab==='stats' ? statsHtml(name, row) : whoHtml(name, row);
  }
  function show(container, kind, tab, name, row){
    ACT[kind] = tab;
    container.querySelectorAll(':scope > .d41-tabs [data-d41t]').forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-d41t')===tab); });
    container.querySelectorAll(':scope > .d41-pane').forEach(function(p){ p.style.display = p.getAttribute('data-d41p')===tab ? '' : 'none'; });
    if(tab==='hist') return;
    var pane = container.querySelector(':scope > .d41-pane[data-d41p="'+tab+'"]');
    if(!pane){ pane = document.createElement('div'); pane.className = 'd41-pane'; pane.setAttribute('data-d41p', tab); container.appendChild(pane); }
    if(pane.__done) return; pane.innerHTML = loading;
    Promise.resolve().then(function(){ return paneHtml(kind, tab, name, row); }).then(function(h){ if(pane.isConnected){ pane.innerHTML = h; pane.__done = true; } }).catch(function(){ if(pane.isConnected) pane.innerHTML = '<div class="d41-empty">Could not load.</div>'; });
  }
  function wrap(container, kind, name, row){
    if(!container || container.querySelector(':scope > .d41-tabs') || !name) return;
    var orig = document.createElement('div'); orig.className = 'd41-pane'; orig.setAttribute('data-d41p','hist');
    while(container.firstChild) orig.appendChild(container.firstChild);
    var bar = document.createElement('div'); bar.className = 'd41-tabs';
    bar.innerHTML = KINDS[kind].map(function(t){ return '<button type="button" data-d41t="'+t[0]+'">'+t[1]+'</button>'; }).join('');
    container.appendChild(bar); container.appendChild(orig);
    bar.addEventListener('click', function(e){ var b = e.target.closest && e.target.closest('[data-d41t]'); if(!b) return; e.preventDefault(); e.stopPropagation(); show(container, kind, b.getAttribute('data-d41t'), name, row); });
    bar.addEventListener('mousedown', function(e){ e.stopPropagation(); });
    show(container, kind, ACT[kind]||'hist', name, row);
    container.insertBefore(bar, container.firstChild);
  }
  var seenObs = new WeakSet();
  function rewrapOnChange(container, fn){
    if(seenObs.has(container)) return; seenObs.add(container);
    try{ new MutationObserver(function(){ if(!container.querySelector(':scope > .d41-tabs')) fn(); }).observe(container, {childList:true}); }catch(e){}
  }
  function firstLine(el){ var f = el.firstElementChild; while(f && (f.tagName==='BUTTON' || f.classList.contains('d41-tabs'))) f = f.nextElementSibling; return f ? f.textContent.trim().split('\n')[0] : ''; }
  function hookPopup(el){
    var kind = el.id==='d20Hist' ? 'cand' : 'client';
    var go = function(){
      var name = firstLine(el), row = null;
      if(kind==='cand') row = rows().filter(function(r){ return r.candidate===name; })[0] || null; else row = rows().filter(function(r){ return r.company===name; })[0] || null;
      wrap(el, kind, name, row);
    };
    go(); rewrapOnChange(el, go);
  }
  function hookSheet(el){
    var body = el.querySelector('.d32-body'); var ctx = window.__d41ctx; if(!body || !ctx || (ctx.kind!=='cand' && ctx.kind!=='client')) return;
    var row = rowById(ctx.id); if(!row) return; var name = ctx.kind==='cand' ? row.candidate : row.company;
    var go = function(){ wrap(body, ctx.kind, name, row); };
    go(); rewrapOnChange(body, go);
  }
  try{ new MutationObserver(function(muts){
    muts.forEach(function(m){ m.addedNodes.forEach(function(n){
      if(n.nodeType!==1) return;
      if(n.id==='d20Hist' || n.id==='d31Cl') hookPopup(n);
      else if(n.id==='d32Sheet') hookSheet(n);
    }); });
  }).observe(document.body, {childList:true}); }catch(e){}
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('[data-d41prep]'); if(!b) return;
    e.preventDefault(); e.stopPropagation(); if(window.d34Open) window.d34Open('prep'); if(window.d34Prep) window.d34Prep(b.getAttribute('data-d41prep'));
  }, true);

  /* ---------- call card ---------- */
  function overviewHtml(r){
    var o = ownerOf(r), cf = ''; try{ cf = (window.d39Conf ? window.d39Conf()[r.id] : '') || ''; }catch(e){}
    var sf = (r.statusFields||[]).filter(function(f){ return (f.value||'').trim(); });
    var kv = [['Candidate',r.candidate],['Client',r.company],['Role',r.role],['Round',r.round],['Time',window.d39TimeText ? window.d39TimeText(r) : r.time],['Duration',r.duration],['Country',r.country||'USA'],['Team',r.assignee],['Owner',o],['Confirmation',cf],['Waiting for invite',r.woi?'yes':''],['Status',r.status?String(r.status).replace(/_/g,' '):''],['Reason',sf.map(function(f){ return f.label+': '+f.value; }).join(' · ')],['Doubts',(r.doubts||[]).join(' ')]];
    return '<div class="d41-kv">'+kv.filter(function(x){ return x[1]; }).map(function(x){ return '<div><small>'+esc(x[0])+'</small><div>'+(x[0]==='Owner' ? pname(x[1]) : esc(x[1]))+'</div></div>'; }).join('')+'</div>';
  }
  function callTab(r, tab){
    if(tab==='ov') return overviewHtml(r);
    if(tab==='trail') return window.d39HistoryHtml ? window.d39HistoryHtml(r) : '<div class="d41-empty">Not available.</div>';
    if(!window.d34PrepHtml) return '<div class="d41-empty">Not available.</div>';
    var h = window.d34PrepHtml(r);
    if(h) return h;
    return allRows().then(function(){ return window.d34PrepHtml(r) || '<div class="d41-empty">No earlier history to prepare from.</div>'; });
  }
  window.d41Call = function(id){
    var r = rowById(id); if(!r) return;
    var old = document.getElementById('d41C'); if(old) old.remove();
    var el = document.createElement('div'); el.id = 'd41C'; el.className = 'd27-ov d41-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>'+esc([r.time,r.company].filter(Boolean).join(' · '))+'</small><h2>'+esc(r.candidate||'Call')+'</h2></div><button type="button" class="d27-x" data-d41x aria-label="Close">✕</button></div><div class="d29-body"><div class="d41-tabs">'+[['ov','Overview'],['trail','Trail'],['prep','Prep']].map(function(t,i){ return '<button type="button" data-d41c="'+t[0]+'" class="'+(i===0?'on':'')+'">'+t[1]+'</button>'; }).join('')+'</div><div class="d41-cb"></div></div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    var cb = el.querySelector('.d41-cb'), cur = 'ov';
    var paint = function(tab){ cur = tab; cb.innerHTML = loading; Promise.resolve().then(function(){ return callTab(r, tab); }).then(function(h){ if(el.isConnected && cur===tab) cb.innerHTML = h; }).catch(function(){ if(el.isConnected) cb.innerHTML = '<div class="d41-empty">Could not load.</div>'; }); };
    paint('ov');
    el.addEventListener('click', function(e){
      if(e.target===el || (e.target.closest && e.target.closest('[data-d41x]'))){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); return; }
      var b = e.target.closest && e.target.closest('[data-d41c]'); if(!b) return;
      el.querySelectorAll('[data-d41c]').forEach(function(x){ x.classList.toggle('on', x===b); }); paint(b.getAttribute('data-d41c'));
    });
  };

  /* ---------- person names in more Tools lists ---------- */
  function decorate(){
    var ppl = (state.roster||[]).map(function(p){ return p && p.name; }).filter(Boolean);
    if(!ppl.length) return;
    document.querySelectorAll('.d27-ov:not(#d40S):not(#d40P) .n > b, .d27-ov .d27-row > b, .d27-ov .d27-load span:first-child').forEach(function(s){
      if(s.hasAttribute('data-d40p') || s.querySelector('[data-d40p]')) return;
      var n = s.textContent.trim(); if(!n) return;
      if(ppl.some(function(p){ return p.toLowerCase()===n.toLowerCase(); })){ s.setAttribute('data-d40p', n); s.style.cursor = 'help'; }
    });
  }
  try{ new MutationObserver(function(){ clearTimeout(decorate._t); decorate._t = setTimeout(decorate, 200); }).observe(document.body, {childList:true, subtree:true}); }catch(e){}
})();

/* ===== d42: V3.3 — organised student profile (opens from Search everything / any candidate tap) ===== */
(function(){
  if(window.__d42) return; window.__d42 = true;
  var esc = function(x){ return String(x==null?'':x).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var nk = function(c){ try{ return normalizeNameKey(c||''); }catch(e){ return String(c||'').toLowerCase().replace(/[^a-z]/g,''); } };
  var today = function(){ try{ return todayDateString(); }catch(e){ return ''; } };
  var adv = function(rd){ try{ return isAdvancedRound(rd); }catch(e){ return /2|3|final|second|third/i.test(rd||''); } };
  var ICON = {rescheduled:'🔁', cancelled:'✕', not_responded:'☎', no_invite:'📨'};
  var LBL = {rescheduled:'Rescheduled', cancelled:'Cancelled', not_responded:'No response', no_invite:'No invite'};
  var sameCo = function(a,b){ try{ return fuzzyCompanyKeyMatch(a,b) || normalizeCompanyKey(a)===normalizeCompanyKey(b); }catch(e){ return String(a||'').toLowerCase()===String(b||'').toLowerCase(); } };
  var longDate = function(d){ try{ var p = String(d).split('-').map(Number); return new Date(Date.UTC(p[0],p[1]-1,p[2])).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric',timeZone:'UTC'}); }catch(e){ return d||''; } };
  var chip = function(t, cls){ return '<span class="d42-chip'+(cls?' '+cls:'')+'">'+t+'</span>'; };
  var orig = window.openCandidateProfile;

  function studentInfo(name){
    var m = null; try{ m = findStudentMasterMatchWithConfidence(name); }catch(e){}
    return m && m.student ? m : null;
  }
  function build(name, data, focusCo){
    var calls = (data.calls||[]).slice().sort(function(a,b){ return (String(a._date)+String(businessDayMinutes(a.time)).padStart(5,'0')).localeCompare(String(b._date)+String(businessDayMinutes(b.time)).padStart(5,'0')); });
    var closures = data.closures||[], t = today();
    var as = []; try{ as = assessmentsForCandidate(name) || []; }catch(e){}
    var os = []; try{ os = onsitesForCandidate(name) || []; }catch(e){}
    // group by client
    var groups = [];
    calls.forEach(function(c){ var g = groups.filter(function(g){ return sameCo(g.key, c.company||''); })[0]; if(!g){ g = {key:c.company||'', name:c.company||'No company', calls:[]}; groups.push(g); } g.calls.push(c); });
    groups.sort(function(a,b){ if(focusCo){ var fa = sameCo(a.key,focusCo), fb = sameCo(b.key,focusCo); if(fa!==fb) return fa?-1:1; } return String(b.calls[b.calls.length-1]._date).localeCompare(String(a.calls[a.calls.length-1]._date)); });
    var live = calls.filter(function(c){ return !c.status; }), bad = calls.length-live.length;
    var upcoming = calls.filter(function(c){ return !c.status && String(c._date)>=t; })[0];
    var furthest = calls.filter(function(c){ return !c.status; }).filter(function(c){ return adv(c.round); }).length;
    var h = '<div class="d42-sum">'
      + chip('<b>'+calls.length+'</b> call'+(calls.length===1?'':'s'))
      + chip('<b>'+groups.length+'</b> client'+(groups.length===1?'':'s'))
      + (furthest ? chip('<b>'+furthest+'</b> 2nd round +') : '')
      + (bad ? chip('<b>'+bad+'</b> did not go ahead','bad') : '')
      + (as.length ? chip('<b>'+as.length+'</b> assessment'+(as.length===1?'':'s')) : '')
      + (os.length ? chip('<b>'+os.length+'</b> onsite') : '')
      + (closures.length ? chip('🏆 <b>'+closures.length+'</b> closure'+(closures.length===1?'':'s'),'ok') : '')
      + '</div>';
    if(calls.length) h += '<div class="d42-meta">First call '+esc(longDate(calls[0]._date))+' · latest '+esc(longDate(calls[calls.length-1]._date))+'</div>';
    if(upcoming) h += '<div class="d42-next"><small>NEXT UP</small><b>'+esc(longDate(upcoming._date))+' · '+esc(upcoming.time||'')+'</b><span>'+esc([upcoming.company, upcoming.round, upcoming.role].filter(Boolean).join(' · '))+'</span></div>';
    // details
    var si = studentInfo(name), d = [];
    if(si){ var s = si.student; Object.keys(s).forEach(function(k){ if(k==='id'||k==='name'||s[k]==null||s[k]==='') return; if(typeof s[k]==='object') return; d.push([k.replace(/([A-Z])/g,' $1').replace(/^./,function(x){ return x.toUpperCase(); }), s[k]]); }); }
    h += '<div class="d42-sec"><b>Details</b></div>';
    h += si ? '<div class="d42-kv"><div><small>'+(si.exact?'Name in master':'Closest match in master (check)')+'</small><div>'+esc(si.student.name||name)+'</div></div>'+d.map(function(x){ return '<div><small>'+esc(x[0])+'</small><div>'+esc(x[1])+'</div></div>'; }).join('')+'</div>' : '<div class="d42-empty">Not found in Students Master.</div>';
    // by client
    h += window.d48Block ? window.d48Block(name,'d42-sec') : '';
    h += '<div class="d42-sec"><b>Calls by client</b><span>'+groups.length+'</span></div>';
    if(!groups.length) h += '<div class="d42-empty">No calls on file.</div>';
    groups.forEach(function(g){
      var seen = [], rds = []; g.calls.forEach(function(c){ var r = (c.round||'').trim(); if(r && !c.status && seen.indexOf(r)<0){ seen.push(r); rds.push(r); } });
      h += '<div class="d42-co"><div class="d42-coh"><b>'+esc(g.name)+(focusCo && sameCo(g.key,focusCo)?' <em class="d42-here">this call</em>':'')+'</b><small>'+g.calls.length+' call'+(g.calls.length===1?'':'s')+(rds.length?' · '+esc(rds.join(' → ')):'')+'</small></div>';
      h += g.calls.map(function(c){
        var own = c.drivingPerson || c.assignee || '';
        return '<div class="d42-r'+(c.status?' dim':'')+(String(c._date)===t?' now':'')+'"><span class="t">'+esc(String(c._date).slice(5).split('-').reverse().join('/'))+'<small>'+esc(c.time||'')+'</small></span><span class="n"><b>'+esc(c.round||'Call')+'</b><small>'+esc([c.role, own].filter(Boolean).join(' · '))+'</small></span><span class="o">'+(c.status?(ICON[c.status]||'')+' '+esc(LBL[c.status]||c.status):'')+'</span></div>'
          + (c.status && (c.statusFields||[]).some(function(f){ return (f.value||'').trim(); }) ? '<div class="d42-why">'+esc((c.statusFields||[]).filter(function(f){ return (f.value||'').trim(); }).map(function(f){ return f.label+': '+f.value; }).join(' · '))+'</div>' : '');
      }).join('')+'</div>';
    });
    // assessments / onsites
    h += '<div class="d42-sec"><b>Assessments</b><span>'+as.length+'</span></div>';
    h += as.length ? as.map(function(a){ return '<div class="d42-r"><span class="t">'+esc(String(a.date||'').slice(5).split('-').reverse().join('/'))+'<small>'+esc(a.time||'')+'</small></span><span class="n"><b>'+esc(a.assessment||'Assessment')+'</b><small>'+esc([a.company,a.role].filter(Boolean).join(' · '))+((a.handlers||[]).length?' · 👤 '+esc(a.handlers.join(', ')):'')+'</small></span><span class="o">'+(a.done?'✓ done':'pending')+'</span></div>'; }).join('') : '<div class="d42-empty">None.</div>';
    h += '<div class="d42-sec"><b>Onsite</b><span>'+os.length+'</span></div>';
    h += os.length ? os.map(function(o){ return '<div class="d42-r"><span class="t">'+esc(String(o.date||'').slice(5).split('-').reverse().join('/'))+'</span><span class="n"><b>'+esc(o.company||'Onsite')+'</b><small>'+esc(o.location||'')+'</small></span><span class="o"></span></div>'; }).join('') : '<div class="d42-empty">None.</div>';
    // closures + flags
    h += '<div class="d42-sec"><b>Closures & flags</b></div>';
    var fl = [];
    closures.forEach(function(c){ fl.push('🏆 Closure'+(c.company?' — '+esc(c.company):'')+(c.createdAt?' · '+esc(String(c.createdAt).slice(0,10)):'')); });
    try{ (state.expectedClosures||[]).forEach(function(c){ if(nk(c.candidate)===nk(name)) fl.push('🎯 Expected closure'+(c.company?' — '+esc(c.company):'')+(c.note?': '+esc(c.note):'')); }); }catch(e){}
    if(bad>=2) fl.push('⚠ '+bad+' earlier calls did not go ahead (rescheduled / cancelled / no response)');
    h += fl.length ? fl.map(function(f){ return '<div class="d42-note">'+f+'</div>'; }).join('') : '<div class="d42-empty">Nothing flagged.</div>';
    h += '<div class="d42-act"><button type="button" class="d27-btn" data-d42tl>📜 Full timeline</button><button type="button" class="d27-btn" data-d42cl>🏆 Record closure</button></div>';
    return h;
  }
  function open(name, focusCo){
    var old = document.getElementById('d42P'); if(old) old.remove();
    var el = document.createElement('div'); el.id = 'd42P'; el.className = 'd27-ov d42-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>STUDENT PROFILE</small><h2>'+esc(name)+'</h2></div><button type="button" class="d27-x" data-d42x aria-label="Close">✕</button></div><div class="d29-body d42-body"><div class="d42-empty">Gathering everything for '+esc(name)+'…</div></div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){
      if(e.target===el || (e.target.closest && e.target.closest('[data-d42x]'))){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); return; }
      if(e.target.closest && e.target.closest('[data-d42tl]')){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); if(orig) orig(name, {__d42:1}); return; }
      if(e.target.closest && e.target.closest('[data-d42cl]')){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); if(orig) orig(name, {openClosureForm:true}); }
    });
    var body = el.querySelector('.d42-body');
    Promise.resolve().then(function(){ return computeCandidateProfile(name, false); }).then(function(d){ if(el.isConnected) body.innerHTML = build(name, d||{calls:[],closures:[]}, focusCo); })
      .catch(function(){ if(el.isConnected) body.innerHTML = '<div class="d42-empty">Could not load this student. Close and try again.</div>'; });
  }
  window.d42Profile = open;
  if(typeof orig==='function'){
    window.openCandidateProfile = function(name, opts){
      if(opts && (opts.openClosureForm || opts.__d42)) return orig.apply(this, arguments);
      try{ open(name, opts && opts.scopeCompany); }catch(e){ return orig.apply(this, arguments); }
    };
  }
})();

/* ===== d43: V3.5 — phone gestures (swipe, long-press, pull-to-refresh / pull-to-search), focus modes, edge panel, shake undo, calendar file, smart card ===== */
(function(){
  'use strict';
  if(window.__d43) return; window.__d43 = true;
  var KG = 'cd.g43', KD = 'cd.dnd';
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function LSg(k,d){ try{ var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } }
  function LSs(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  function G(){ return Object.assign({swipe:true, press:true, pull:true, edge:true, shake:false}, LSg(KG,{})); }
  function phone(){ return window.innerWidth < 760; }
  function admin(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } }
  function toast(m){ try{ if(window.d2Toast) window.d2Toast(m); }catch(e){} }
  function rowById(id){ return (state.rows||[]).filter(function(r){ return String(r.id)===String(id); })[0]; }
  function overlayOpen(){ return !!document.querySelector('.d27-ov, #d43Sh, #d43Panel.on, #quickJumpOverlay, .my-name-picker-overlay'); }
  function best(r){
    var list = []; try{ list = window.d2Rank ? window.d2Rank(r) : []; }catch(e){}
    var tn = null; try{ tn = getTeamNames(); }catch(e){}
    var ppl = list.filter(function(h){ return !h.isTeam && !(tn && tn.has(h.name)); });
    for(var i=0;i<ppl.length;i++){ if(!ppl[i].absent && !ppl[i].clash) return ppl[i]; }
    return ppl[0] || null;
  }
  function owner(r){ try{ return window.cdOwnerOf ? window.cdOwnerOf(r) : null; }catch(e){ return null; } }
  function nowBd(){ var d = new Date(); return (d.getHours()*60+d.getMinutes()+720)%1440; }
  function bd(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } }
  function live(r){ return !r.woi && !r.status; }
  function needsOwner(r){ return live(r) && !r.assignee; }

  /* ---------- do not disturb (gate on top of quiet hours) ---------- */
  var oShow = window.cdShowNotification;
  if(typeof oShow==='function') window.cdShowNotification = function(title, opts){
    try{ var tag = (opts && opts.tag) || ''; if(!/^cd-(esc|test)/.test(tag) && Date.now() < (+localStorage.getItem(KD)||0)) return Promise.resolve(false); }catch(e){}
    return oShow.call(this, title, opts);
  };
  function dndLeft(){ var t = (+localStorage.getItem(KD)||0) - Date.now(); return t>0 ? t : 0; }
  function untilHour(h){ var d = new Date(); d.setHours(h,0,0,0); if(d.getTime() <= Date.now()) d.setDate(d.getDate()+1); return d.getTime(); }
  function dndText(){ var t = dndLeft(); if(!t) return 'Off'; var d = new Date(Date.now()+t); return 'until '+d.toLocaleTimeString([], {hour:'numeric', minute:'2-digit'}); }

  /* ---------- Focus modes panel ---------- */
  function ov(id, title, kicker, body){
    var old = document.getElementById(id); if(old) old.remove();
    var el = document.createElement('div'); el.id = id; el.className = 'd27-ov d43-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>'+esc(kicker)+'</small><h2>'+esc(title)+'</h2></div><button type="button" class="d27-x" data-d43c aria-label="Close">✕</button></div><div class="d29-body">'+body+'</div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d43c]'))){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); } });
    return el;
  }
  function focusHtml(){
    var g = G(), my = ''; try{ my = getMyAssigneeName(); }catch(e){}
    var mode = state.filter==='unassigned' ? 'need' : (my && state.assigneeFilter && state.assigneeFilter===my ? 'mine' : 'all');
    var seg = function(k,l,sub){ return '<button type="button" class="d43-md'+(mode===k?' on':'')+'" data-d43m="'+k+'"><b>'+l+'</b><small>'+sub+'</small></button>'; };
    var tog = function(k,l,sub){ return '<label class="d43-tg"><span><b>'+l+'</b><small>'+sub+'</small></span><input type="checkbox" data-d43g="'+k+'"'+(g[k]?' checked':'')+'></label>'; };
    return '<div class="d43-sec">Show me</div><div class="d43-modes">'+seg('all','Everything','All calls')+seg('mine','My calls','Only '+(my||'mine'))+seg('need','Needs owner','Unassigned only')+'</div>'
      + '<div class="d43-sec">Do not disturb <em>'+esc(dndText())+'</em></div><div class="d43-chips">'
      + [['60','1 hour'],['120','2 hours'],['19','Until 7 PM'],['7','Until 7 AM'],['0','Off']].map(function(x){ return '<button type="button" class="d43-chip" data-d43d="'+x[0]+'">'+x[1]+'</button>'; }).join('')
      + '</div><p class="d29-p">Silences call reminders on this device. Urgent escalations still come through. <a href="#" data-d43q>Quiet hours &amp; daily cap →</a></p>'
      + '<div class="d43-sec">Phone extras</div>'
      + tog('edge','Edge panel','Thin handle on the right edge → next calls and shortcuts')
      + tog('shake','Shake to undo','Shake the phone to undo the last change');
  }
  function openFocus(){
    var el = ov('d43F', 'Focus modes', 'WHAT YOU SEE · WHEN YOU’RE ALERTED', focusHtml());
    el.addEventListener('click', function(e){
      var m = e.target.closest('[data-d43m]');
      if(m){
        var k = m.getAttribute('data-d43m'), my = ''; try{ my = getMyAssigneeName(); }catch(x){}
        if(k==='mine' && !my){ toast('Set “My calls” name first (Filters → My calls)'); return; }
        state.filter = k==='need' ? 'unassigned' : 'all'; state.assigneeFilter = k==='mine' ? my : '';
        try{ render(); }catch(x){} el.querySelector('.d29-body').innerHTML = focusHtml(); return;
      }
      var d = e.target.closest('[data-d43d]');
      if(d){ var v = +d.getAttribute('data-d43d'); var until = !v ? 0 : (v>=60 ? Date.now()+v*60000 : untilHour(v));
        try{ localStorage.setItem(KD, String(until)); }catch(x){} toast(until ? 'Do not disturb '+dndText() : 'Alerts back on'); el.querySelector('.d29-body').innerHTML = focusHtml(); return; }
      if(e.target.closest('[data-d43q]')){ e.preventDefault(); el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); if(window.d29OpenTool) window.d29OpenTool('notif'); }
    });
    el.addEventListener('change', function(e){
      var c = e.target.closest('[data-d43g]'); if(!c) return;
      var k = c.getAttribute('data-d43g'), g = G(); g[k] = c.checked; LSs(KG, g);
      if(k==='shake' && c.checked) askMotion().then(function(ok){ if(!ok){ g.shake = false; LSs(KG,g); c.checked = false; toast('Motion access was not allowed'); } });
      edgeSync();
    });
  }
  window.d43Focus = openFocus;

  /* ---------- shake to undo ---------- */
  function askMotion(){
    try{ if(typeof DeviceMotionEvent!=='undefined' && typeof DeviceMotionEvent.requestPermission==='function') return DeviceMotionEvent.requestPermission().then(function(r){ return r==='granted'; }).catch(function(){ return false; }); }catch(e){}
    return Promise.resolve(typeof DeviceMotionEvent!=='undefined');
  }
  var lastJ = 0, jn = 0, lastAsk = 0;
  window.addEventListener('devicemotion', function(e){
    if(!G().shake || !phone()) return;
    var a = e.accelerationIncludingGravity; if(!a) return;
    var m = Math.sqrt((a.x||0)*(a.x||0)+(a.y||0)*(a.y||0)+(a.z||0)*(a.z||0));
    if(Math.abs(m-9.8) < 16) return;
    var t = Date.now(); if(t-lastJ > 120 && t-lastJ < 700) jn++; else jn = 1; lastJ = t;
    if(jn >= 3 && t-lastAsk > 5000){ jn = 0; lastAsk = t;
      if(!window.d2Undo) return;
      (window.cdConfirm ? window.cdConfirm('Undo the last change?', {title:'Shake to undo'}) : Promise.resolve(true)).then(function(ok){ if(ok){ try{ window.d2Undo(); toast('Undone'); }catch(x){} } });
    }
  });

  /* ---------- edge panel ---------- */
  var handle = null, panel = null;
  function nextCalls(){
    var n = nowBd();
    return (state.rows||[]).filter(function(r){ return live(r) && bd(r.time)!==9999 && bd(r.time) >= n-10; }).sort(function(a,b){ return bd(a.time)-bd(b.time); }).slice(0,3);
  }
  function panelHtml(){
    var nx = nextCalls(), n = nowBd();
    var h = '<div class="d43-pt">Next calls</div>' + (nx.length ? nx.map(function(r){ var o = owner(r), m = bd(r.time)-n;
      return '<button type="button" class="d43-pc" data-d43o="'+esc(r.id)+'"><b>'+esc(r.time||'')+'</b><span>'+esc(r.candidate||'')+'<small>'+esc(o?o.name:(r.assignee||'no owner yet'))+' · '+(m<=0?'now':(m<60?'in '+Math.round(m)+'m':'in '+Math.floor(m/60)+'h'))+'</small></span></button>'; }).join('') : '<div class="d43-pe">Nothing coming up</div>');
    var need = (state.rows||[]).filter(needsOwner).length;
    h += '<div class="d43-pt">Shortcuts</div><div class="d43-pg">'
      + [['focus','🎯','Focus'],['chase','📞','Chase list'],['resched','🔁','Reschedule'],['person','👤','Person'],['ics','📆','Calendar'],['undo','↩︎','Undo']].map(function(x){ return '<button type="button" data-d43k="'+x[0]+'"><span>'+x[1]+'</span>'+x[2]+'</button>'; }).join('') + '</div>';
    var fav = LSg('cd.tools.fav',[]), T = window.d29T || [];
    var pin = fav.map(function(k){ var t = T.filter(function(x){ return x[0]===k; })[0]; return t ? '<button type="button" data-d43k="'+k+'"><span>'+t[1]+'</span>'+esc(t[2])+'</button>' : ''; }).join('');
    if(pin) h += '<div class="d43-pt">Your pinned tools</div><div class="d43-pg">'+pin+'</div>';
    if(need && admin()) h += '<button type="button" class="d43-need" data-d43k="need">'+need+' call'+(need>1?'s':'')+' still need an owner →</button>';
    return h;
  }
  function openPanel(){
    if(!panel){ panel = document.createElement('div'); panel.id = 'd43Panel'; document.body.appendChild(panel);
      panel.addEventListener('click', function(e){
        if(e.target===panel){ closePanel(); return; }
        var o = e.target.closest('[data-d43o]'); if(o){ var id = o.getAttribute('data-d43o'); closePanel(); if(window.d23Open) window.d23Open(id); return; }
        var k = e.target.closest('[data-d43k]'); if(!k) return; var a = k.getAttribute('data-d43k'); closePanel();
        if(a==='focus') openFocus(); else if(a==='undo'){ if(window.d2Undo){ window.d2Undo(); toast('Undone'); } }
        else if(a==='need'){ state.filter = 'unassigned'; try{ render(); }catch(x){} }
        else if(window.d29OpenTool) window.d29OpenTool(a);
      });
      var x0 = 0; panel.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; }, {passive:true});
      panel.addEventListener('touchend', function(e){ if(e.changedTouches[0].clientX - x0 > 60) closePanel(); }, {passive:true});
    }
    panel.innerHTML = '<div class="d43-pbody">'+panelHtml()+'</div>';
    requestAnimationFrame(function(){ panel.classList.add('on'); });
  }
  function closePanel(){ if(panel) panel.classList.remove('on'); }
  function edgeSync(){
    var want = phone() && G().edge;
    if(want && !handle){
      handle = document.createElement('div'); handle.id = 'd43Edge'; handle.setAttribute('role','button'); handle.setAttribute('aria-label','Open side panel'); document.body.appendChild(handle);
      var x0 = 0, y0 = 0; handle.addEventListener('touchstart', function(e){ x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, {passive:true});
      handle.addEventListener('touchend', function(e){ var c = e.changedTouches[0]; if(x0 - c.clientX > 24 || (Math.abs(c.clientX-x0) < 8 && Math.abs(c.clientY-y0) < 8)) openPanel(); }, {passive:true});
      handle.addEventListener('click', openPanel);
    } else if(!want && handle){ handle.remove(); handle = null; closePanel(); }
    if(handle) handle.style.display = (document.querySelector('.d27-ov') || state.needsLogin) ? 'none' : '';
  }
  window.addEventListener('resize', edgeSync);
  setInterval(edgeSync, 1500);

  /* ---------- calendar file (.ics) ---------- */
  function ids(){ var s = {}; (state.rows||[]).forEach(function(r){ var o = owner(r); var n = o ? o.name : r.assignee; if(n) s[n] = 1; }); return Object.keys(s).sort(); }
  function pad(n){ return (n<10?'0':'')+n; }
  function utc(d){ return d.getUTCFullYear()+pad(d.getUTCMonth()+1)+pad(d.getUTCDate())+'T'+pad(d.getUTCHours())+pad(d.getUTCMinutes())+'00Z'; }
  function parseT(t){ var m = /(\d{1,2}):(\d{2})\s*(AM|PM)/i.exec(t||''); if(!m) return null; var h = +m[1]%12; if(/pm/i.test(m[3])) h += 12; return [h, +m[2]]; }
  function durMin(s){ var m = /(\d+(?:\.\d+)?)\s*(hr|hour|h)/i.exec(s||''); if(m) return Math.round(+m[1]*60); m = /(\d+)/.exec(s||''); return m ? +m[1] : 30; }
  function icsEsc(s){ return String(s||'').replace(/\\/g,'\\\\').replace(/;/g,'\;').replace(/,/g,'\\,').replace(/\r?\n/g,'\\n'); }
  function buildIcs(rowsIn, who){
    var L = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Coverage Desk//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:Coverage Desk'+(who?' – '+icsEsc(who):'')], n = 0;
    rowsIn.forEach(function(r){
      if(r.woi || r.status==='cancelled') return;
      var o = owner(r), nm = o ? o.name : r.assignee; if(who && nm!==who) return;
      var tm = parseT(r.time), dt = r._date || state.date, p = /^(\d{4})-(\d{2})-(\d{2})/.exec(dt||''); if(!tm || !p) return;
      var s = new Date(Date.UTC(+p[1], +p[2]-1, +p[3], tm[0], tm[1]) - 330*60000), e = new Date(s.getTime()+durMin(r.duration)*60000);
      L.push('BEGIN:VEVENT','UID:cd-'+String(r.id||n)+'-'+dt+'@coverage-desk','DTSTAMP:'+utc(new Date()),'DTSTART:'+utc(s),'DTEND:'+utc(e),
        'SUMMARY:'+icsEsc((r.candidate||'Call')+' – '+(r.company||'')+(r.round?' ('+r.round+')':'')),
        'DESCRIPTION:'+icsEsc([r.role&&('Role: '+r.role), r.round&&('Round: '+r.round), r.country&&('Country: '+r.country), nm&&('Handler: '+nm), r.status&&('Status: '+r.status)].filter(Boolean).join('\n')),
        'BEGIN:VALARM','TRIGGER:-PT10M','ACTION:DISPLAY','DESCRIPTION:Call in 10 minutes','END:VALARM','END:VEVENT'); n++;
    });
    L.push('END:VCALENDAR'); return {text:L.join('\r\n'), n:n};
  }
  function openIcs(){
    var my = ''; try{ my = getMyAssigneeName(); }catch(e){}
    var opts = ids();
    var el = ov('d43I', 'Calendar file', 'ADD CALLS TO YOUR PHONE CALENDAR',
      '<p class="d29-p">Makes a <b>.ics</b> file. Open it on your phone and tap <b>Add all</b> — each call lands in your own calendar with a 10-minute reminder. Times are converted from IST automatically.</p>'
      + '<div class="d43-sec">Whose calls</div><select id="d43iw" class="d43-sel"><option value="">Everyone</option>'+opts.map(function(n){ return '<option'+(n===my?' selected':'')+'>'+esc(n)+'</option>'; }).join('')+'</select>'
      + '<div class="d43-sec">Which days</div><select id="d43id" class="d43-sel"><option value="day">Just '+esc(state.date)+'</option><option value="week">Next 7 days</option></select>'
      + '<button type="button" class="d27-btn d43-go" id="d43ig">Download .ics</button><div id="d43im" class="d29-p"></div>');
    el.querySelector('#d43ig').addEventListener('click', function(){
      var who = el.querySelector('#d43iw').value, sc = el.querySelector('#d43id').value, msg = el.querySelector('#d43im'); msg.textContent = 'Building…';
      var get = sc==='day' ? Promise.resolve((state.rows||[]).map(function(r){ return Object.assign({}, r, {_date:r._date||state.date}); }))
        : Promise.resolve(window.fetchAllRowsAcrossDates ? fetchAllRowsAcrossDates() : fetchAllRowsAcrossDates).then(function(all){
            var d0 = state.date, d1 = typeof deskDateAdd==='function' ? deskDateAdd(d0, 7) : d0; return (all||[]).filter(function(r){ return r._date && r._date>=d0 && r._date<d1; }); });
      get.then(function(rows){
        var o = buildIcs(rows, who);
        if(!o.n){ msg.textContent = 'No calls found for that choice.'; return; }
        var blob = new Blob([o.text], {type:'text/calendar'}), a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = 'coverage-desk-'+(who?who.replace(/\W+/g,'-').toLowerCase()+'-':'')+state.date+'.ics';
        document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 1500);
        msg.textContent = o.n+' call'+(o.n>1?'s':'')+' in the file. Open it to add them to your calendar.';
      }).catch(function(){ msg.textContent = 'Could not build the file. Try again.'; });
    });
  }
  window.d43Ics = openIcs; window.d43BuildIcs = buildIcs;

  /* ---------- smart card on the phone home ---------- */
  window.d43Smart = function(){
    try{
      var rows = (state.rows||[]).filter(function(r){ return !r.woi; }); if(!rows.length) return '';
      var h = new Date().getHours(), need = rows.filter(needsOwner).length, ad = admin(), liveN = rows.filter(live).length;
      if(h < 12) return '<div class="d43-smart" data-d43s="brief"><span>☀️</span><div><b>Good morning</b><small>'+rows.length+' calls today'+(ad&&need?' · '+need+' need an owner':'')+'</small></div><i>Briefing →</i></div>';
      if(h >= 21 || !liveN) return '<div class="d43-smart" data-d43s="wrap"><span>🌙</span><div><b>'+(liveN?'Late shift':'All calls done')+'</b><small>Wrap up the day · summary + what is still open</small></div><i>Wrap →</i></div>';
      if(ad && need) return '<div class="d43-smart warn" data-d43s="need"><span>🔔</span><div><b>'+need+' call'+(need>1?'s':'')+' still need an owner</b><small>Swipe a call right to pick who takes it</small></div><i>Show →</i></div>';
      var nx = nextCalls()[0]; if(nx) return '<div class="d43-smart" data-d43s="next" data-d43o="'+esc(nx.id)+'"><span>⏱</span><div><b>Next: '+esc(nx.candidate||'')+'</b><small>'+esc(nx.time||'')+' · all calls covered</small></div><i>Open →</i></div>';
    }catch(e){}
    return '';
  };
  document.addEventListener('click', function(e){
    var s = e.target.closest && e.target.closest('[data-d43s]'); if(!s) return;
    var k = s.getAttribute('data-d43s');
    if(k==='brief'){ var b = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function(x){ return /^\s*Briefing/.test(x.textContent); })[0]; if(b) b.click(); }
    else if(k==='wrap'){ if(window.d29OpenTool) window.d29OpenTool('wrap'); }
    else if(k==='need'){ state.filter = 'unassigned'; try{ render(); }catch(x){} }
    else if(k==='next'){ if(window.d23Open) window.d23Open(s.getAttribute('data-d43o')); }
  });

  /* ---------- tools hub hooks ---------- */
  var prev = window.d35Open;
  window.d35Open = function(k){ if(k==='focus'){ openFocus(); return true; } if(k==='ics'){ openIcs(); return true; } return typeof prev==='function' ? prev(k) : false; };
  edgeSync();
})();

/* ===== d44: V3.6 — desktop: row keys, details dock, Ctrl/Shift multi-select, drag-to-person, file drop, taskbar badge, clipboard history, backup folder ===== */
(function(){
  'use strict';
  if(window.__d44) return; window.__d44 = true;
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function LSg(k,d){ try{ var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } }
  function LSs(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  function wide(){ return window.innerWidth >= 760; }
  function admin(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } }
  function canImport(){ try{ return CURRENT_ROLE!=='user' && CURRENT_ROLE!=='team_lead'; }catch(e){ return true; } }
  function toast(m){ try{ if(window.d2Toast) window.d2Toast(m); }catch(e){} }
  function rowById(id){ return (state.rows||[]).filter(function(r){ return String(r.id)===String(id); })[0]; }
  function owner(r){ try{ return window.cdOwnerOf ? window.cdOwnerOf(r) : null; }catch(e){ return null; } }
  function typing(t){ return t && (/^(input|textarea|select)$/i.test(t.tagName) || t.isContentEditable); }
  function overlay(){ return document.querySelector('.d27-ov,.d15-ov,.d3-overlay,#d2Cmd,.d2-pop,.my-name-picker-overlay,#quickJumpOverlay'); }
  function visRows(){ return Array.prototype.slice.call(document.querySelectorAll('#tableScrollMain tbody tr[data-id]')).filter(function(tr){ return !tr.classList.contains('d2-grp') && tr.offsetParent !== null; }); }

  /* ---------- row cursor + keyboard ---------- */
  var curId = null;
  function markCursor(scroll){
    document.querySelectorAll('tr.d44-cur').forEach(function(x){ x.classList.remove('d44-cur'); });
    if(!curId) return; var tr = document.querySelector('#tableScrollMain tbody tr[data-id="'+String(curId).replace(/"/g,'')+'"]');
    if(tr){ tr.classList.add('d44-cur'); if(scroll) tr.scrollIntoView({block:'nearest', behavior:'smooth'}); }
  }
  function setCursor(id, scroll){ curId = id; markCursor(scroll); dockPaint(); }
  function move(dir){
    var L = visRows(); if(!L.length) return;
    var i = L.findIndex(function(tr){ return tr.getAttribute('data-id')===String(curId); });
    i = i<0 ? (dir>0 ? 0 : L.length-1) : Math.max(0, Math.min(L.length-1, i+dir));
    setCursor(L[i].getAttribute('data-id'), true);
  }
  document.addEventListener('keydown', function(e){
    if(!wide() || e.defaultPrevented || typeof state==='undefined' || state.needsLogin) return;
    if(typing(e.target) && !(e.key==='Escape' && (function(t){ var b = t.getBoundingClientRect(); return b.width < 6 || b.height < 6 || getComputedStyle(t).visibility==='hidden' || (t.tagName==='TEXTAREA' && !t.value); })(e.target))) return;
    var k = e.key;
    if(e.altKey && !e.ctrlKey && !e.metaKey && (k==='ArrowLeft' || k==='ArrowRight')){
      var b = document.getElementById(k==='ArrowLeft' ? 'prevDay' : 'nextDay'); if(b){ e.preventDefault(); b.click(); } return;
    }
    if(k==='Escape' && !e.ctrlKey && !e.altKey && !e.metaKey){ if(!document.querySelector('.d27-ov,.d15-ov,.d3-overlay,#d2Cmd,#quickJumpOverlay,.my-name-picker-overlay') && state.selectedIds && state.selectedIds.size){ state.selectedIds.clear(); try{ render(); }catch(x){} } return; }
    if(overlay()) return;
    if((e.ctrlKey||e.metaKey) && !e.altKey && (k==='a' || k==='A')){
      var L = visRows(); if(!L.length || !admin()) return; e.preventDefault();
      L.forEach(function(tr){ state.selectedIds.add(tr.getAttribute('data-id')); }); try{ render(); }catch(x){} toast(L.length+' calls selected · Esc to clear'); return;
    }
    if(e.ctrlKey || e.metaKey || e.altKey) return;
    if(k==='j' || k==='J' || k==='ArrowDown' && e.shiftKey){ e.preventDefault(); move(1); return; }
    if(k==='k' || k==='K' || k==='ArrowUp' && e.shiftKey){ e.preventDefault(); move(-1); return; }
    if(k==='d' || k==='D'){ e.preventDefault(); dockToggle(); return; }
    var r = curId ? rowById(curId) : null;
    if(!r) return;
    if(k==='Enter'){ e.preventDefault(); if(window.d41Call) window.d41Call(r.id); }
    else if(k==='x' || k==='X'){ e.preventDefault(); if(!admin()) return; if(state.selectedIds.has(r.id)) state.selectedIds.delete(r.id); else state.selectedIds.add(r.id); try{ render(); }catch(x){} }
    else if(k==='a' || k==='A'){ if(!admin()) return; var s = document.querySelector('tr[data-id="'+r.id+'"] select.driving-person-select') || document.querySelector('tr[data-id="'+r.id+'"] select[data-field="assignee"]'); if(s){ e.preventDefault(); s.focus(); try{ s.showPicker(); }catch(x){} } }
    else if(k==='c' || k==='C'){ if(!admin() || r.woi || !window.d39SetConf) return; e.preventDefault(); window.d39SetConf(r.id, 'confirmed'); try{ render(); }catch(x){} toast((window.d39Conf()[r.id]==='confirmed'?'Confirmed ✓ ':'Confirmation cleared ')+(r.candidate||'')); }
    else if(k==='r' || k==='R'){ if(!window.d29OpenTool) return; e.preventDefault(); window.d29OpenTool('resched'); setTimeout(function(){ var b = document.querySelector('[data-d29rspick="'+r.id+'"]'); if(b) b.click(); }, 450); }
  });
  document.addEventListener('click', function(e){
    if(!wide()) return; var tr = e.target.closest && e.target.closest('#tableScrollMain tbody tr[data-id]');
    if(!tr || tr.classList.contains('d2-grp')) return;
    var id = tr.getAttribute('data-id'), interactive = e.target.closest('input,select,textarea,button,a,label,.cell-input');
    if((e.ctrlKey || e.metaKey || e.shiftKey) && !interactive && admin()){
      e.preventDefault(); e.stopPropagation();
      var L = visRows().map(function(x){ return x.getAttribute('data-id'); });
      if(e.shiftKey && curId && L.indexOf(String(curId))>=0){
        var a = L.indexOf(String(curId)), b = L.indexOf(id), lo = Math.min(a,b), hi = Math.max(a,b);
        L.slice(lo, hi+1).forEach(function(x){ state.selectedIds.add(x); });
      } else { if(state.selectedIds.has(id)) state.selectedIds.delete(id); else state.selectedIds.add(id); }
      curId = id; try{ render(); }catch(x){} return;
    }
    if(!interactive) setCursor(id, false);
  }, true);
  document.addEventListener('mousedown', function(e){ if(e.shiftKey && e.target.closest && e.target.closest('#tableScrollMain tbody tr[data-id]') && !typing(e.target)) e.preventDefault(); }, true);

  /* ---------- bulk bar extras ---------- */
  function bulkExtras(){
    var bar = document.querySelector('.bulk-bar'); if(!bar || bar.querySelector('.d44-bx')) return;
    var s = document.createElement('span'); s.className = 'd44-bx';
    s.innerHTML = '<button type="button" class="btn" data-d44b="confirmed">✅ Confirmed</button><button type="button" class="btn" data-d44b="noreply">🔕 No reply</button><button type="button" class="btn" data-d44b="copy">💬 Copy messages</button><button type="button" class="btn" data-d44b="clear">✕ Clear</button>';
    bar.appendChild(s);
  }
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('[data-d44b]'); if(!b) return;
    var k = b.getAttribute('data-d44b'), ids = Array.from(state.selectedIds), R = ids.map(rowById).filter(Boolean);
    if(k==='clear'){ state.selectedIds.clear(); try{ render(); }catch(x){} return; }
    if(k==='copy'){
      var t = R.map(function(r){ return window.d29ChaseMsg ? window.d29ChaseMsg(r) : (r.candidate||'')+' – '+(r.time||''); }).join('\n\n');
      try{ navigator.clipboard.writeText(t); toast('Copied '+R.length+' message'+(R.length>1?'s':'')); }catch(x){ toast('Could not copy'); } return;
    }
    if(!window.d39SetConf) return; var C = window.d39Conf(), n = 0;
    R.forEach(function(r){ if(!r.woi && C[r.id]!==k){ window.d39SetConf(r.id, k); n++; } });
    state.selectedIds.clear(); try{ render(); }catch(x){} toast(n+' marked '+(k==='confirmed'?'confirmed':'no reply'));
  });

  /* ---------- details dock (split view) ---------- */
  var dock = null, KDK = 'cd.dock';
  function dockOn(){ return !!LSg(KDK,false); }
  function dockToggle(){ LSs(KDK, !dockOn()); dockSync(); if(dockOn() && !curId){ var L = visRows(); if(L.length) setCursor(L[0].getAttribute('data-id'), false); } toast('Details dock '+(dockOn()?'on · J / K to move':'off')); }
  function strip(html, sel){ var d = document.createElement('div'); d.innerHTML = html; var f = d.firstElementChild; if(f && f.matches(sel)) f.remove(); return d.innerHTML; }
  function dockPaint(){
    if(!dock || !dockOn()) return;
    var r = curId ? rowById(curId) : null;
    if(!r){ dock.innerHTML = '<div class="d44-dh"><b>Details</b><button type="button" data-d44dx aria-label="Close">✕</button></div><div class="d44-db"><p class="d29-p">Click a call, or press <kbd>J</kbd> / <kbd>K</kbd>, to see its details here.</p></div>'; return; }
    var o = owner(r), cf = ''; try{ cf = window.d39Conf()[r.id] || ''; }catch(e){}
    var prep = ''; try{ prep = strip(window.d34PrepHtml ? window.d34PrepHtml(r) : '', '.d29-rsh'); }catch(e){}
    var hist = ''; try{ hist = strip(window.d39HistoryHtml ? window.d39HistoryHtml(r) : '', '.d36-hd'); }catch(e){}
    dock.innerHTML = '<div class="d44-dh"><div><b>'+esc(r.candidate||'Call')+'</b><small>'+esc([r.time, r.company, r.round].filter(Boolean).join(' · '))+'</small></div><button type="button" data-d44dx aria-label="Close dock">✕</button></div>'
      + '<div class="d44-db"><div class="d44-facts"><span>Role<b>'+esc(r.role||'—')+'</b></span><span>With<b>'+esc(o?o.name:(r.assignee||'no owner yet'))+'</b></span><span>Status<b>'+esc(r.woi?'waiting for invite':(r.status?String(r.status).replace(/_/g,' '):(cf||'live')))+'</b></span><span>Country<b>'+esc(r.country||'—')+'</b></span></div>'
      + '<div class="d44-acts"><button type="button" class="d27-btn" data-d44a="card">Call card</button><button type="button" class="d27-btn" data-d44a="stu">Student</button>'+(o?'<button type="button" class="d27-btn" data-d44a="person">'+esc(o.name)+'</button>':'')+'<button type="button" class="d27-btn" data-d44a="resched">Reschedule</button></div>'
      + (prep?'<div class="d44-sec">Prep</div>'+prep:'') + (hist?'<div class="d44-sec">History</div>'+hist:'') + '</div>';
  }
  function dockSync(){
    var on = dockOn() && wide();
    if(on && !dock){ dock = document.createElement('aside'); dock.id = 'd44Dock'; document.body.appendChild(dock); }
    if(!on && dock){ dock.remove(); dock = null; }
    document.body.classList.toggle('d44-dock-on', !!on);
    if(on) dockPaint();
  }
  document.addEventListener('click', function(e){
    if(e.target.closest && e.target.closest('[data-d44dx]')){ LSs(KDK,false); dockSync(); return; }
    var a = e.target.closest && e.target.closest('[data-d44a]'); if(!a) return;
    var r = rowById(curId); if(!r) return; var k = a.getAttribute('data-d44a');
    if(k==='card' && window.d41Call) window.d41Call(r.id);
    else if(k==='stu' && window.d42Profile) window.d42Profile(r.candidate, r.company);
    else if(k==='person'){ var o = owner(r); if(o && window.d40Open) window.d40Open(o.name); }
    else if(k==='resched' && window.d29OpenTool){ window.d29OpenTool('resched'); setTimeout(function(){ var b = document.querySelector('[data-d29rspick="'+r.id+'"]'); if(b) b.click(); }, 450); }
  });

  /* ---------- render hook: cursor, dock, bulk extras, taskbar badge ---------- */
  var lastBadge = -1;
  function badge(){
    try{
      /* taskbar/app-icon count removed on request — only clear any old badge once */
      if(lastBadge===0) return; lastBadge = 0;
      if(navigator.clearAppBadge) navigator.clearAppBadge();
    }catch(e){}
  }
  var oR = window.render;
  window.render = function(){ var r = oR.apply(this, arguments); try{ markCursor(false); bulkExtras(); dockSync(); badge(); }catch(e){} return r; };
  window.addEventListener('resize', dockSync);

  /* ---------- drag a call onto a person ---------- */
  var dd = null;
  document.addEventListener('dragstart', function(e){
    var g = e.target.closest && e.target.closest('.d3-grip'); if(!g || !admin()) return;
    var tr = g.closest('tr[data-id]'); var r = tr && rowById(tr.getAttribute('data-id')); if(!r) return;
    var list = []; try{ list = window.d2Rank ? window.d2Rank(r) : []; }catch(x){}
    var tn = null; try{ tn = getTeamNames(); }catch(x){}
    var ppl = list.filter(function(h){ return !h.isTeam && !(tn && tn.has(h.name)); }).slice(0, 8);
    if(!ppl.length) return;
    clearDrop(); dd = document.createElement('div'); dd.id = 'd44Drop';
    dd.innerHTML = '<small>Drop on a person to assign</small><div>'+ppl.map(function(h){ return '<span class="d44-dp'+(h.absent||h.clash?' bad':'')+'" data-d44p="'+esc(h.name)+'">'+esc(h.name)+(h.absent?' · away':(h.clash?' · clash':''))+'</span>'; }).join('')+'</div>';
    document.body.appendChild(dd);
  });
  function clearDrop(){ if(dd){ dd.remove(); dd = null; } }
  document.addEventListener('dragend', clearDrop);
  document.addEventListener('dragover', function(e){ var c = e.target.closest && e.target.closest('[data-d44p]'); if(c && e.dataTransfer && e.dataTransfer.types.indexOf('text/d3row')>=0){ e.preventDefault(); document.querySelectorAll('.d44-dp.over').forEach(function(x){ if(x!==c) x.classList.remove('over'); }); c.classList.add('over'); } });
  document.addEventListener('drop', function(e){
    var c = e.target.closest && e.target.closest('[data-d44p]'); if(!c) return;
    var id = e.dataTransfer.getData('text/d3row'); if(!id) return; e.preventDefault();
    var name = c.getAttribute('data-d44p'); clearDrop();
    if(window.d2AssignTo){ window.d2AssignTo(id, name); toast('Assigned to '+name+' · Alt+Z to undo'); }
  });

  /* ---------- drop a text file to import ---------- */
  var fz = null, fzN = 0;
  function hasFiles(e){ return e.dataTransfer && Array.prototype.indexOf.call(e.dataTransfer.types||[], 'Files') >= 0; }
  document.addEventListener('dragenter', function(e){
    if(!wide() || !hasFiles(e) || !canImport() || state.needsLogin) return; fzN++;
    if(!fz){ fz = document.createElement('div'); fz.id = 'd44Fz'; fz.innerHTML = '<div><b>Drop to import</b><small>.txt · .csv · .tsv with your call list</small></div>'; document.body.appendChild(fz); }
  });
  document.addEventListener('dragleave', function(e){ if(!fz) return; fzN = Math.max(0, fzN-1); if(!fzN || !e.relatedTarget){ fz.remove(); fz = null; fzN = 0; } });
  document.addEventListener('dragover', function(e){ if(hasFiles(e) && canImport() && !(e.target.closest && e.target.closest('input[type=file]'))) e.preventDefault(); });
  document.addEventListener('drop', function(e){
    if(fz){ fz.remove(); fz = null; fzN = 0; }
    if(!hasFiles(e) || !canImport() || (e.target.closest && e.target.closest('input[type=file]'))) return;
    e.preventDefault();
    var f = e.dataTransfer.files && e.dataTransfer.files[0]; if(!f) return;
    if(!/\.(txt|csv|tsv|text)$/i.test(f.name) && !/^text\//.test(f.type)){ toast('Drop a .txt / .csv / .tsv file — or paste the text into Import'); return; }
    var fr = new FileReader();
    fr.onload = function(){
      try{ closeAllPanels(); state.showImport = true; state.showRescheduleImport = false; render(); }catch(x){}
      setTimeout(function(){ var ta = document.getElementById('importText'); if(ta){ ta.value = String(fr.result||'').replace(/\t/g,' – '); ta.dispatchEvent(new Event('input',{bubbles:true})); toast('Loaded '+f.name+' — check it, then Import'); } }, 350);
    };
    fr.readAsText(f);
  });

  /* ---------- right-click on person names ---------- */
  var cm = null;
  function closeCm(){ if(cm){ cm.remove(); cm = null; } }
  document.addEventListener('contextmenu', function(e){
    if(!wide()) return; var el = e.target.closest && e.target.closest('[data-d40p]'); if(!el) return;
    var name = el.getAttribute('data-d40p'); if(!name) return; e.preventDefault(); closeCm();
    cm = document.createElement('div'); cm.id = 'd44Cm'; cm.className = 'd44-cm';
    var it = [['card','👤','Person card'],['filter','🎯','Show only '+name+'’s calls'],['copy','⧉','Copy name']];
    cm.innerHTML = it.map(function(i){ return '<button type="button" data-d44m="'+i[0]+'" data-n="'+esc(name)+'"><span>'+i[1]+'</span>'+esc(i[2])+'</button>'; }).join('');
    document.body.appendChild(cm);
    var w = cm.offsetWidth, h = cm.offsetHeight; cm.style.left = Math.min(e.clientX, innerWidth-w-8)+'px'; cm.style.top = Math.min(e.clientY, innerHeight-h-8)+'px';
  });
  document.addEventListener('click', function(e){
    var b = e.target.closest && e.target.closest('[data-d44m]');
    if(b){ var k = b.getAttribute('data-d44m'), n = b.getAttribute('data-n'); closeCm();
      if(k==='card' && window.d40Open) window.d40Open(n);
      else if(k==='filter'){ try{ document.querySelectorAll('.d27-ov').forEach(function(x){ x.remove(); }); document.body.classList.remove('d27-open'); state.assigneeFilter = n; state.filter = 'all'; render(); }catch(x){} }
      else if(k==='copy'){ try{ navigator.clipboard.writeText(n); toast('Copied'); }catch(x){} }
      return; }
    if(cm && !e.target.closest('#d44Cm')) closeCm();
  }, true);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeCm(); });
  window.addEventListener('scroll', closeCm, true);

  /* ---------- clipboard history ---------- */
  var KC = 'cd.clip';
  (function(){
    try{
      var cb = navigator.clipboard; if(!cb || !cb.writeText || cb.__d44) return;
      var o = cb.writeText.bind(cb);
      cb.writeText = function(t){ try{ var s = String(t==null?'':t); if(s.trim() && s.length < 6000){ var A = LSg(KC,[]).filter(function(x){ return x.t !== s; }); A.unshift({t:s, at:Date.now()}); LSs(KC, A.slice(0,10)); } }catch(e){} return o(t); };
      cb.__d44 = true;
    }catch(e){}
  })();
  function ago(ms){ var m = Math.round((Date.now()-ms)/60000); return m<1?'just now':(m<60?m+' min ago':Math.round(m/60)+' h ago'); }
  function ov(id, title, kicker, body){
    var old = document.getElementById(id); if(old) old.remove();
    var el = document.createElement('div'); el.id = id; el.className = 'd27-ov d43-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>'+esc(kicker)+'</small><h2>'+esc(title)+'</h2></div><button type="button" class="d27-x" data-d44c aria-label="Close">✕</button></div><div class="d29-body">'+body+'</div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d44c]'))){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); } });
    return el;
  }
  function openClip(){
    var A = LSg(KC,[]);
    var el = ov('d44Clip', 'Clipboard history', 'THE LAST 10 THINGS YOU COPIED FROM THE DESK',
      A.length ? '<div class="d27-list">'+A.map(function(c,i){ return '<button type="button" class="d27-row d44-clip" data-d44cp="'+i+'"><span><b>'+esc(c.t.split('\n')[0].slice(0,90))+'</b><small>'+(c.t.split('\n').length>1?c.t.split('\n').length+' lines · ':'')+ago(c.at)+'</small></span><em>Copy again</em></button>'; }).join('')+'</div><div class="d27-actions"><button type="button" class="d27-btn ghost" data-d44cc>Clear history</button></div>'
        : '<div class="d27-empty">Nothing yet. Messages you copy from the app (chase messages, replies, reports) are kept here for re-use.</div>');
    el.addEventListener('click', function(e){
      var b = e.target.closest('[data-d44cp]');
      if(b){ var c = LSg(KC,[])[+b.getAttribute('data-d44cp')]; if(c){ try{ navigator.clipboard.writeText(c.t); toast('Copied again'); }catch(x){} } return; }
      if(e.target.closest('[data-d44cc]')){ LSs(KC,[]); el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); toast('History cleared'); }
    });
  }
  window.d44Clip = openClip;
  document.addEventListener('keydown', function(e){ if(e.altKey && !e.ctrlKey && !e.metaKey && (e.key==='v'||e.key==='V') && !typing(e.target) && wide()){ e.preventDefault(); openClip(); } });

  /* ---------- backup folder (File System Access) ---------- */
  var DB = 'cd-fs', ST = 'h';
  function idb(){ return new Promise(function(res, rej){ var q = indexedDB.open(DB,1); q.onupgradeneeded = function(){ q.result.createObjectStore(ST); }; q.onsuccess = function(){ res(q.result); }; q.onerror = function(){ rej(q.error); }; }); }
  function hGet(){ return idb().then(function(d){ return new Promise(function(res){ var r = d.transaction(ST).objectStore(ST).get('dir'); r.onsuccess = function(){ res(r.result||null); }; r.onerror = function(){ res(null); }; }); }).catch(function(){ return null; }); }
  function hSet(h){ return idb().then(function(d){ return new Promise(function(res){ var t = d.transaction(ST,'readwrite'); t.objectStore(ST).put(h,'dir'); t.oncomplete = function(){ res(); }; t.onerror = function(){ res(); }; }); }); }
  function writeBackup(h){
    return backupAllData().then(function(b){
      var name = 'coverage-desk-backup-'+state.date+'.json';
      return h.getFileHandle(name, {create:true}).then(function(fh){ return fh.createWritable(); }).then(function(w){ return w.write(JSON.stringify(b,null,2)).then(function(){ return w.close(); }); }).then(function(){ LSs('cd.fsb.last', new Date().toISOString().slice(0,10)); return name; });
    });
  }
  function openFsb(){
    var ok = typeof window.showDirectoryPicker==='function';
    var el = ov('d44Fsb', 'Backup folder', 'SAVE A DAILY BACKUP STRAIGHT INTO A FOLDER ON THIS PC',
      ok ? '<p class="d29-p">Pick a folder once (for example <b>Documents\\Coverage Desk backups</b>). Back up now, or let it save automatically the first time you open the desk each day. <span id="d44fsbs"></span></p><div class="d27-actions"><button type="button" class="d27-btn" id="d44fsbPick">Choose folder…</button><button type="button" class="d27-btn" id="d44fsbNow">Back up now</button></div><div id="d44fsbm" class="d29-p"></div>'
         : '<div class="d27-empty">This browser can’t write to folders. Use Edge or Chrome on a computer. (Tools → Backup still downloads a file.)</div>');
    if(!ok) return;
    var m = el.querySelector('#d44fsbm'), s = el.querySelector('#d44fsbs');
    hGet().then(function(h){ s.textContent = h ? 'Folder: '+h.name+'. Last backup: '+(LSg('cd.fsb.last','')||'never')+'.' : 'No folder chosen yet.'; });
    el.querySelector('#d44fsbPick').addEventListener('click', function(){
      window.showDirectoryPicker({mode:'readwrite'}).then(function(h){ return hSet(h).then(function(){ s.textContent = 'Folder: '+h.name+'.'; m.textContent = 'Folder saved.'; }); }).catch(function(){});
    });
    el.querySelector('#d44fsbNow').addEventListener('click', function(){
      m.textContent = 'Backing up…';
      hGet().then(function(h){
        if(!h){ m.textContent = 'Choose a folder first.'; return; }
        return Promise.resolve(h.requestPermission ? h.requestPermission({mode:'readwrite'}) : 'granted').then(function(p){
          if(p!=='granted'){ m.textContent = 'Permission was not given.'; return; }
          return writeBackup(h).then(function(n){ m.textContent = 'Saved '+n+'.'; s.textContent = 'Folder: '+h.name+'. Last backup: today.'; });
        });
      }).catch(function(err){ m.textContent = 'Could not save: '+(err && err.message || err); });
    });
  }
  window.d44Fsb = openFsb;
  setTimeout(function(){
    try{
      if(typeof window.showDirectoryPicker!=='function' || !wide() || !admin() || state.needsLogin) return;
      if(LSg('cd.fsb.last','') === new Date().toISOString().slice(0,10)) return;
      hGet().then(function(h){ if(!h || !h.queryPermission) return; return h.queryPermission({mode:'readwrite'}).then(function(p){ if(p==='granted') return writeBackup(h).then(function(){ toast('Daily backup saved to '+h.name); }); }); }).catch(function(){});
    }catch(e){}
  }, 25000);

  /* ---------- hub hooks ---------- */
  var prev = window.d35Open;
  window.d35Open = function(k){
    if(k==='dock'){ dockToggle(); return true; }
    if(k==='clip'){ openClip(); return true; }
    if(k==='fsb'){ openFsb(); return true; }
    return typeof prev==='function' ? prev(k) : false;
  };
  dockSync(); markCursor(false);
})();

/* ===== V3.7 (d45): keep full-width note rows readable while the table is scrolled sideways ===== */
(function(){
  var raf = 0;
  document.addEventListener('scroll', function(e){
    var t = e.target; if(!t || t.id !== 'tableScrollMain') return;
    if(raf) return;
    raf = requestAnimationFrame(function(){ raf = 0; try{ t.style.setProperty('--d45sl', Math.round(t.scrollLeft) + 'px'); }catch(x){} });
  }, true);
})();

/* ===== V3.8 (d46): feedback import — paste "Name / Client / Feedback" blocks, attach to each call ===== */
(function(){
  'use strict';
  var esc = function(t){ return String(t==null?'':t).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var rows = function(){ return (typeof state!=='undefined' && state.rows) || []; };
  var rowById = function(id){ return rows().filter(function(r){ return String(r.id)===String(id); })[0]; };
  var admin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  function toast(t){ try{ if(window.d2Toast) return window.d2Toast(t); }catch(e){} var b = document.getElementById('d39Toast'); if(!b){ b = document.createElement('div'); b.id = 'd39Toast'; document.body.appendChild(b); } b.textContent = t; b.classList.add('on'); clearTimeout(b._t); b._t = setTimeout(function(){ b.classList.remove('on'); }, 2200); }
  function noteId(){ return state.date + '-feedback'; }
  function getFb(){
    var e = ((state.notes)||[]).filter(function(n){ return n && n.id===noteId(); })[0];
    try{ return e ? (JSON.parse(e.text)||{}) : {}; }catch(x){ return {}; }
  }
  function putFb(m){
    state.notes = state.notes || []; var id = noteId();
    var i = state.notes.findIndex(function(n){ return n && n.id===id; }), keys = Object.keys(m);
    if(keys.length){ var tx = JSON.stringify(m); if(i>=0) state.notes[i].text = tx; else state.notes.push({id:id, text:tx}); }
    else if(i>=0) state.notes.splice(i,1);
    try{ markDirty(); }catch(e){}
  }
  function setFb(rid, text){ var m = getFb(), r = rowById(rid) || {}; if(text && String(text).trim()) m[rid] = {t:String(text).trim(), at:Date.now(), c:r.candidate||'', co:r.company||'', rd:r.round||'', a:r.assignee||'', p:r.drivingPerson||''}; else delete m[rid]; putFb(m); try{ if(window.d48Changed) window.d48Changed(); }catch(e){} }

  /* ---------- parser ---------- */
  function parse(text){
    var recs = [], cur = null;
    String(text||'').replace(/\r/g,'').split('\n').forEach(function(L){
      var s = L.trim(), m = s.match(/^name\s*[:\-–]\s*(.*)$/i);
      if(m){ cur = {name:m[1].trim(), client:'', lines:[]}; recs.push(cur); return; }
      if(!cur) return;
      var c = s.match(/^(?:client|company)\s*[:\-–]\s*(.*)$/i);
      if(c && !cur.client){ cur.client = c[1].trim(); return; }
      if(s) cur.lines.push(s);
    });
    return recs.map(function(r){
      var fb = r.lines.join('\n').replace(/^feedback\s*[:\-–]\s*/i,'').trim();
      return {name:r.name, client:r.client, fb:fb};
    }).filter(function(r){ return r.name; });
  }

  /* ---------- matching ---------- */
  function toks(n){ return String(n||'').toLowerCase().replace(/[^a-z ]/g,' ').split(/\s+/).filter(function(t){ return t.length>1; }); }
  function nameScore(a, b){
    var ka = normalizeNameKey(a), kb = normalizeNameKey(b); if(!ka || !kb) return 0;
    if(ka===kb) return 3;
    var ta = toks(a), tb = toks(b), shared = ta.filter(function(t){ return tb.indexOf(t)>=0; }).length;
    if(shared>=2 || (shared>=1 && Math.min(ta.length,tb.length)===1)) return 2;
    if(Math.min(ka.length,kb.length)>=6 && (ka.indexOf(kb)>=0 || kb.indexOf(ka)>=0)) return 2;
    try{ if(levenshteinDistance(ka,kb)<=2) return 2; }catch(e){}
    return 0;
  }
  function coMatch(a, b){ try{ return !!a && !!b && assessCompanyMatch(a, b); }catch(e){ return false; } }
  function firstRound(r){ return /^(1st|first)/i.test(String(r.round||'')); }
  function pick(list){ return list.filter(firstRound)[0] || list[0]; }
  function match(rec){
    var all = rows(), best = null, byName = [], byCo = [];
    all.forEach(function(r){
      var n = nameScore(rec.name, r.candidate), c = coMatch(rec.client, r.company);
      if(n>=2 && c) byName.push({r:r, k:'exact', s:n+2});
      else if(n>=2) byName.push({r:r, k:'name', s:n});
      else if(c) byCo.push(r);
    });
    var ex = byName.filter(function(x){ return x.k==='exact'; });
    if(ex.length) return {row:pick(ex.map(function(x){ return x.r; })), kind:'exact'};
    if(byName.length) return {row:pick(byName.map(function(x){ return x.r; })), kind:'name'};
    if(byCo.length===1) return {row:byCo[0], kind:'client'};
    if(byCo.length>1){ var f = byCo.filter(firstRound); if(f.length===1) return {row:f[0], kind:'client'}; }
    return null;
  }

  /* ---------- overlay helper ---------- */
  function ov(id, title, kicker, body){
    var old = document.getElementById(id); if(old) old.remove();
    var el = document.createElement('div'); el.id = id; el.className = 'd27-ov d43-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>'+esc(kicker)+'</small><h2>'+esc(title)+'</h2></div><button type="button" class="d27-x" data-d46c aria-label="Close">✕</button></div><div class="d29-body">'+body+'</div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d46c]'))) close(el); });
    return el;
  }
  function close(el){ if(el) el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); }

  /* ---------- import tool ---------- */
  var R = [];
  function chip(k){ return k==='exact' ? '<span class="d46-chip ok">name + client</span>' : k==='name' ? '<span class="d46-chip mid">name only</span>' : '<span class="d46-chip low">client only — check</span>'; }
  function list(el){
    var box = el.querySelector('#d46List'); if(!box) return;
    var fb = getFb();
    if(!R.length){ box.innerHTML = ''; el.querySelector('#d46Go').disabled = true; return; }
    box.innerHTML = R.map(function(x,i){
      var r = x.m && x.m.row, had = r && fb[r.id];
      return '<label class="d46-it'+(r?'':' off')+'"><input type="checkbox" data-d46i="'+i+'"'+(x.on?' checked':'')+(r?'':' disabled')+'><span class="d46-main"><b>'+esc(x.name)+'</b> <small>'+esc(x.client||'—')+'</small>'
        +'<span class="d46-fbt">'+esc(x.fb||'(no feedback text)')+'</span>'
        +(r ? '<span class="d46-to">→ '+esc(r.time||'')+' · '+esc(r.candidate)+' · '+esc(r.company||'')+(r.round?' · '+esc(r.round):'')+' '+chip(x.m.kind)+(had?' <span class="d46-chip low">replaces earlier feedback</span>':'')+'</span>' : '<span class="d46-to miss">No call found on '+esc(state.date)+' for this name / client</span>')
        +'</span></label>';
    }).join('');
    var n = R.filter(function(x){ return x.on && x.m && x.fb; }).length;
    var go = el.querySelector('#d46Go'); go.disabled = !n; go.textContent = 'Add feedback to '+n+' call'+(n===1?'':'s');
  }
  function openImport(){
    var el = ov('d46Imp', 'Feedback import', 'PASTE NAME / CLIENT / FEEDBACK BLOCKS · MATCHED TO CALLS ON '+state.date,
      '<textarea id="d46Txt" class="d46-ta" rows="8" placeholder="Name: …&#10;Client: …&#10;Feedback: …&#10;&#10;Name: …"></textarea>'
      +'<div class="d46-bar"><button type="button" class="d27-btn" id="d46Match">Match to calls</button><span id="d46Sum" class="d46-sum"></span></div>'
      +'<div id="d46List" class="d46-list"></div>'
      +'<div class="d46-bar"><button type="button" class="d27-btn d46-go" id="d46Go" disabled>Add feedback</button></div>');
    R = [];
    el.addEventListener('click', function(e){
      if(e.target.closest('#d46Match')){
        var recs = parse(el.querySelector('#d46Txt').value);
        R = recs.map(function(r){ var m = match(r); return {name:r.name, client:r.client, fb:r.fb, m:m, on: !!(m && r.fb && m.kind!=='client')}; });
        el.querySelector('#d46Sum').textContent = R.length ? (R.filter(function(x){ return x.m; }).length+' of '+R.length+' matched') : 'No "Name:" lines found';
        list(el); return;
      }
      if(e.target.closest('#d46Go')){
        var n = 0; R.forEach(function(x){ if(x.on && x.m && x.fb){ setFb(x.m.row.id, x.fb); n++; } });
        close(el); try{ render(); }catch(x){} setTimeout(badges, 200); toast('Feedback added to '+n+' call'+(n===1?'':'s')); return;
      }
    });
    el.addEventListener('change', function(e){ var c = e.target.closest('[data-d46i]'); if(c){ R[+c.getAttribute('data-d46i')].on = c.checked; list(el); } });
  }
  window.d46Open = openImport;

  /* ---------- badge on the call row + viewer ---------- */
  function badges(){
    if(window.d48Badges) return window.d48Badges();
    try{
      document.querySelectorAll('.d46-fb').forEach(function(b){ b.remove(); });
      var m = getFb(); if(!Object.keys(m).length) return;
      document.querySelectorAll('tr[data-id]').forEach(function(tr){
        var f = m[tr.getAttribute('data-id')]; if(!f) return;
        var td = tr.children[2] || tr.children[0]; if(!td) return;
        var b = document.createElement('button'); b.type = 'button'; b.className = 'd46-fb'; b.setAttribute('data-d46v', tr.getAttribute('data-id'));
        b.title = 'Feedback: '+f.t; b.textContent = '💬'; td.appendChild(b);
      });
    }catch(e){}
  }
  function openView(rid){
    var r = rowById(rid), f = getFb()[rid]; if(!f) return;
    var el = ov('d46View', 'Feedback', (r ? (r.candidate||'')+' · '+(r.company||'') : 'CALL').toUpperCase(),
      '<textarea id="d46Edit" class="d46-ta" rows="6"'+(admin()?'':' readonly')+'>'+esc(f.t)+'</textarea>'
      +'<div class="d46-bar"><button type="button" class="d27-btn" id="d46Copy">Copy</button>'
      +(admin()?'<button type="button" class="d27-btn d46-go" id="d46Save">Save</button><button type="button" class="d27-btn" id="d46Del">Remove</button>':'')+'</div>');
    el.addEventListener('click', function(e){
      if(e.target.closest('#d46Copy')){ try{ navigator.clipboard.writeText(el.querySelector('#d46Edit').value); toast('Copied'); }catch(x){} }
      else if(e.target.closest('#d46Save')){ setFb(rid, el.querySelector('#d46Edit').value); close(el); badges(); toast('Saved'); }
      else if(e.target.closest('#d46Del')){ setFb(rid, ''); close(el); badges(); toast('Feedback removed'); }
    });
  }
  document.addEventListener('click', function(e){ var b = e.target.closest && e.target.closest('[data-d46v]'); if(b){ e.stopPropagation(); e.preventDefault(); (window.d48View||openView)(b.getAttribute('data-d46v')); } }, true);

  var oR = window.render, tm = 0;
  window.render = function(){ var r = oR.apply(this, arguments); clearTimeout(tm); tm = setTimeout(badges, 150); return r; };
  var prev = window.d35Open;
  window.d35Open = function(k){ if(k==='fbk'){ openImport(); return true; } return typeof prev==='function' ? prev(k) : false; };
  setTimeout(badges, 600);
  window.d46Test = {parse:parse, match:match, getFb:getFb, setFb:setFb};
})();

/* ===== V3.9 (d47): export calls to Excel for a date range ===== */
(function(){
  'use strict';
  var esc = function(t){ return String(t==null?'':t).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  function ymd(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  function addDays(s, n){ var p = s.split('-').map(Number), d = new Date(p[0],p[1]-1,p[2]+n); return ymd(d); }
  function toast(t){ try{ if(window.d2Toast) return window.d2Toast(t); }catch(e){} }
  var EXTRA = [['time','Time'],['round','Round'],['assignee','Assigned to'],['status','Status']];
  var STAT = { rescheduled:'Rescheduled', cancelled:'Cancelled', not_responded:'Not Responded', no_invite:'Didn’t Receive Invite' };
  function ov(){
    var old = document.getElementById('d47Ov'); if(old) old.remove();
    var el = document.createElement('div'); el.id = 'd47Ov'; el.className = 'd27-ov d43-ov';
    var t = state.date || ymd(new Date());
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>DOWNLOAD CALLS AS AN EXCEL FILE</small><h2>Export to Excel</h2></div><button type="button" class="d27-x" data-d47c aria-label="Close">✕</button></div><div class="d29-body">'
      +'<div class="d47-dates"><label>From<input type="date" id="d47From" value="'+esc(t.slice(0,8)+'01')+'"></label><label>To<input type="date" id="d47To" value="'+esc(t)+'"></label></div>'
      +'<div class="d47-quick"><button type="button" class="d27-btn" data-d47q="today">Today</button><button type="button" class="d27-btn" data-d47q="7">Last 7 days</button><button type="button" class="d27-btn" data-d47q="month">This month</button><button type="button" class="d27-btn" data-d47q="last">Last month</button></div>'
      +'<div class="d47-cols"><b>Columns</b><span>Date of interview · Candidate name · Country · Company · Role</span><div>Also add: '+EXTRA.map(function(x){ return '<label class="d47-x"><input type="checkbox" data-d47x="'+x[0]+'"> '+x[1]+'</label>'; }).join('')+'</div></div>'
      +'<div id="d47Sum" class="d46-sum"></div>'
      +'<div class="d46-bar"><button type="button" class="d27-btn d46-go" id="d47Go">Download Excel</button></div></div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d47c]'))){ el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); } });
    return el;
  }
  function pickRows(all, a, b){
    var C = ['','cancelled'];
    return all.filter(function(r){ var d = r._date || ''; return d>=a && d<=b && r.candidate; }).sort(function(x,y){
      if(x._date!==y._date) return x._date<y._date?-1:1;
      var tx = 9999, ty = 9999; try{ tx = timeToMinutes(x.time); ty = timeToMinutes(y.time); }catch(e){}
      return tx-ty;
    });
  }
  function open(){
    if(typeof XLSX==='undefined'){ alert('The Excel library did not load (network / ad-blocker?) — refresh the page and try again.'); return; }
    var el = ov(), all = null, loading = null;
    function load(force){ if(!loading || force) loading = fetchAllRowsAcrossDates(!!force).then(function(r){ all = r||[]; return all; }); return loading; }
    function sum(){
      var a = el.querySelector('#d47From').value, b = el.querySelector('#d47To').value, s = el.querySelector('#d47Sum');
      if(!a || !b){ s.textContent = 'Pick both dates'; return; }
      if(a>b){ s.textContent = '“From” is after “To”'; return; }
      s.textContent = 'Counting…';
      load().then(function(rs){ var n = pickRows(rs,a,b), days = {}; n.forEach(function(r){ days[r._date]=1; }); if(el.isConnected) s.textContent = n.length+' calls on '+Object.keys(days).length+' day'+(Object.keys(days).length===1?'':'s'); }).catch(function(){ s.textContent = 'Could not load calls — check your connection'; });
    }
    el.addEventListener('change', function(e){ if(e.target.type==='date') sum(); });
    el.addEventListener('click', function(e){
      var q = e.target.closest('[data-d47q]');
      if(q){
        var k = q.getAttribute('data-d47q'), t = ymd(new Date()), f = el.querySelector('#d47From'), g = el.querySelector('#d47To');
        if(k==='today'){ f.value = g.value = t; }
        else if(k==='7'){ f.value = addDays(t,-6); g.value = t; }
        else if(k==='month'){ f.value = t.slice(0,8)+'01'; g.value = t; }
        else { var p = t.split('-').map(Number), first = new Date(p[0],p[1]-2,1), last = new Date(p[0],p[1]-1,0); f.value = ymd(first); g.value = ymd(last); }
        sum(); return;
      }
      if(e.target.closest('#d47Go')){
        var a = el.querySelector('#d47From').value, b = el.querySelector('#d47To').value;
        if(!a || !b || a>b){ toast('Check the dates'); return; }
        var extra = [].slice.call(el.querySelectorAll('[data-d47x]:checked')).map(function(c){ return c.getAttribute('data-d47x'); });
        var btn = e.target.closest('#d47Go'); btn.disabled = true; btn.textContent = 'Preparing…';
        load(true).then(function(rs){
          var n = pickRows(rs,a,b);
          if(!n.length){ toast('No calls in that range'); btn.disabled = false; btn.textContent = 'Download Excel'; return; }
          var data = n.map(function(r){
            var o = {'Date of interview': r._date, 'Candidate name': r.candidate||'', 'Country': r.country||'', 'Company': r.company||'', 'Role': r.role||''};
            extra.forEach(function(k){ var lab = EXTRA.filter(function(x){ return x[0]===k; })[0][1]; o[lab] = k==='status' ? (STAT[r.status]||r.status||'') : (r[k]||''); });
            return o;
          });
          var ws = XLSX.utils.json_to_sheet(data), cols = Object.keys(data[0]);
          ws['!cols'] = cols.map(function(c){ var w = c.length; data.forEach(function(r){ w = Math.max(w, String(r[c]).length); }); return {wch: Math.min(48, w+2)}; });
          ws['!autofilter'] = {ref: ws['!ref']};
          var wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Calls');
          XLSX.writeFile(wb, 'Coverage-Desk-'+a+(a===b?'':'_to_'+b)+'.xlsx');
          toast(n.length+' calls downloaded'); btn.disabled = false; btn.textContent = 'Download Excel';
        }).catch(function(){ toast('Could not load calls'); btn.disabled = false; btn.textContent = 'Download Excel'; });
      }
    });
    sum();
  }
  window.d47Open = open;
  var prev = window.d35Open;
  window.d35Open = function(k){ if(k==='xlr'){ open(); return true; } return typeof prev==='function' ? prev(k) : false; };
  window.d47Test = {pickRows:pickRows};
})();

/* ===== V4.0 (d48): feedback intelligence — history per candidate, tags, heads-up pop-up, prep list, pending chase, summary ===== */
(function(){
  'use strict';
  var esc = function(t){ return String(t==null?'':t).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var rows = function(){ return (typeof state!=='undefined' && state.rows) || []; };
  var rowById = function(id){ return rows().filter(function(r){ return String(r.id)===String(id); })[0]; };
  var nk = function(n){ try{ return normalizeNameKey(n); }catch(e){ return String(n||'').toLowerCase().replace(/[^a-z]/g,''); } };
  var bd = function(t){ try{ return businessDayMinutes(t); }catch(e){ return 9999; } };
  var nowBd = function(){ var d = new Date(); return (d.getHours()*60+d.getMinutes()+720)%1440; };
  var sd = function(d){ try{ return new Date(d+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short'}); }catch(e){ return d||''; } };
  var snip = function(t,n){ t = String(t||'').replace(/\s+/g,' ').trim(); return t.length>n ? t.slice(0,n-1)+'…' : t; };
  function toast(t){ try{ if(window.d2Toast) return window.d2Toast(t,{ms:2200}); }catch(e){} }
  function copy(t){ try{ navigator.clipboard.writeText(t); toast('Copied'); }catch(e){ try{ var a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); document.execCommand('copy'); a.remove(); toast('Copied'); }catch(x){} } }

  /* ---------- tags ---------- */
  var TAGS = [
    ['good','Went well','good',/\b(went well|managed (it |the call |this )?(very )?well|handled (the call |it )?(very )?well|did well|good (call|performance)|looking forward)\b/i],
    ['prep','Needs prep','warn',/\b(needs? (more )?(prep|preps|preparation|practice|to practice|mock)|mock interviews?|practice more|prep needed|need preps?)\b/i],
    ['comm','Communication','warn',/\b(pace|speaking|fluen\w*|pronounc\w*|nervous\w*|panic\w*|confidence|reading out|time gap|slow down|unclear)\b/i],
    ['tech','Technical gap','warn',/\b(basic questions|technical terms|couldn.?t answer|could not answer|struggl\w*|lack of knowledge|weak in)\b/i],
    ['tool','Tool / connection','warn',/\b(tool (was )?slow|our tool|power cut|network|connection|audio|internet|lag(ging)?|another ai tool)\b/i],
    ['noshow','Cancelled / no-show','info',/\b(cancel+ed|no[- ]?show|not responding|did not join|didn.?t join|left the meeting)\b/i],
    ['client','Client side','info',/\b(client (is )?(looking|asked|wants)|gc holders?|\bopt\b|h1b|visa|check with (their|the) team|group meeting)\b/i]
  ];
  function tagsOf(t){ return TAGS.filter(function(g){ return g[3].test(t||''); }).map(function(g){ return {k:g[0], l:g[1], c:g[2]}; }); }
  function sevOf(list){ var any = {good:0,warn:0,info:0}; list.forEach(function(e){ tagsOf(e.t).forEach(function(g){ any[g.c]++; }); }); return any.warn ? 'warn' : any.good ? 'good' : 'info'; }
  function chips(list){ var seen = {}, h = ''; list.forEach(function(e){ tagsOf(e.t).forEach(function(g){ if(!seen[g.k]){ seen[g.k] = 1; h += '<span class="d48-chip '+g.c+'">'+esc(g.l)+'</span>'; } }); }); return h; }
  function weak(e){ return tagsOf(e.t).some(function(g){ return g.c==='warn'; }); }

  /* ---------- data: every feedback note across days ---------- */
  var cache = null, loading = null, lastDate = null;
  function parseNote(d, text){
    var o; try{ o = JSON.parse(text)||{}; }catch(e){ return []; }
    return Object.keys(o).map(function(rid){ var e = o[rid]||{}; return {d:d, rid:rid, t:e.t||'', at:e.at||0, c:e.c||'', co:e.co||'', rd:e.rd||'', a:e.a||'', p:e.p||''}; });
  }
  function fill(e){ if(e.c) return; var r = e.d===state.date ? rowById(e.rid) : null; if(r){ e.c = r.candidate||''; e.co = r.company||''; e.rd = r.round||''; e.a = r.assignee||''; e.p = r.drivingPerson||''; } }
  function entries(){
    var base = (cache||[]).filter(function(e){ return e.d!==state.date; });
    var n = ((state.notes)||[]).filter(function(x){ return x && x.id===state.date+'-feedback'; })[0];
    var loc = n ? parseNote(state.date, n.text) : []; loc.forEach(fill);
    return base.concat(loc).filter(function(e){ return e.t && e.c; });
  }
  function forCand(name){ var k = nk(name); if(!k) return []; return entries().filter(function(e){ return nk(e.c)===k; }).sort(function(a,b){ return (b.d+String(b.at)).localeCompare(a.d+String(a.at)); }); }
  function load(force){
    if(loading && !force) return loading;
    loading = Promise.resolve().then(function(){ return apiCall('notes', {qs:'suffix=feedback'}); }).then(function(res){
      var out = []; ((res&&res.rows)||[]).forEach(function(n){ out = out.concat(parseNote(n.d, n.text)); });
      if(out.some(function(e){ return !e.c; })){
        return fetchAllRowsAcrossDates(false).then(function(all){ var m = {}; (all||[]).forEach(function(r){ m[r._date+'|'+r.id] = r; });
          out.forEach(function(e){ if(!e.c){ var r = m[e.d+'|'+e.rid]; if(r){ e.c = r.candidate||''; e.co = r.company||''; e.rd = r.round||''; e.a = r.assignee||''; e.p = r.drivingPerson||''; } } }); return out; }).catch(function(){ return out; });
      }
      return out;
    }).catch(function(){ return []; }).then(function(out){ cache = out; try{ badges(); }catch(e){} return out; });
    return loading;
  }
  window.d48Changed = function(){ setTimeout(function(){ badges(); }, 50); };

  /* ---------- blocks ---------- */
  var who = function(e){ var w = (e.p||e.a||'').trim(); return w ? 'call taken by <b>'+esc(w)+'</b>' : ''; };
  function entryHtml(e, own){
    return '<div class="d48-en'+(own?' own':'')+'"><div class="d48-meta"><b>'+esc(sd(e.d))+'</b> · '+esc([e.co,e.rd].filter(Boolean).join(' · '))+(who(e)?' · '+who(e):'')+(e.at?' · <span>added '+esc(new Date(e.at).toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}))+'</span>':'')+'</div>'
      +'<div class="d48-tx">'+esc(e.t)+'</div><div class="d48-tg">'+chips([e])+'</div></div>';
  }
  window.d48Block = function(name, cls){
    var L = forCand(name); if(!L.length) return '';
    return '<div class="'+(cls||'d27-sec')+'"><b>💬 Feedback on earlier calls</b><span>'+L.length+'</span></div><div class="d48-chips">'+chips(L)+'</div>'+L.slice(0,4).map(function(e){ return entryHtml(e); }).join('');
  };
  window.d48Next = function(r){
    var L = forCand(r.candidate).filter(function(e){ return !(e.d===state.date && String(e.rid)===String(r.id)); }); if(!L.length) return '';
    var e = L[0]; return '<em class="d48-em '+sevOf([e])+'">💬 '+esc(sd(e.d))+(who(e)?' · '+who(e).replace(/<[^>]+>/g,''):'')+': '+esc(snip(e.t,140))+'</em>';
  };
  window.d48Line = function(r){
    var L = forCand(r.candidate); if(!L.length) return '';
    var e = L[0]; return '<div class="d48-line '+sevOf(L)+'"><b>💬 Last feedback</b> · '+esc(sd(e.d))+(who(e)?' · '+who(e):'')+'<span>'+esc(snip(e.t,170))+'</span><div class="d48-tg">'+chips(L.slice(0,3))+'</div></div>';
  };

  /* ---------- badges on call rows ---------- */
  function badges(){
    try{
      document.querySelectorAll('.d46-fb').forEach(function(b){ b.remove(); });
      var all = entries(); if(!all.length) return;
      var by = {}; all.forEach(function(e){ (by[nk(e.c)] = by[nk(e.c)] || []).push(e); });
      document.querySelectorAll('tr[data-id]').forEach(function(tr){
        var r = rowById(tr.getAttribute('data-id')); if(!r) return;
        var L = by[nk(r.candidate)]; if(!L || !L.length) return;
        var td = tr.children[2] || tr.children[0]; if(!td) return;
        L = L.slice().sort(function(a,b){ return (b.d+String(b.at)).localeCompare(a.d+String(a.at)); });
        var own = L.some(function(e){ return e.d===state.date && String(e.rid)===String(r.id); }), sv = sevOf(L);
        var b = document.createElement('button'); b.type = 'button'; b.className = 'd46-fb sev-'+sv+(own?'':' prior'); b.setAttribute('data-d46v', r.id);
        b.title = (own?'Feedback on this call':'Earlier feedback')+' — '+sd(L[0].d)+(L[0].co?' · '+L[0].co:'')+': '+L[0].t; b.textContent = '💬'+(L.length>1?L.length:'');
        td.appendChild(b);
      });
    }catch(e){}
  }
  window.d48Badges = badges;

  /* ---------- viewer (history + edit this call's feedback) ---------- */
  function ov(id, title, kicker, body){
    var old = document.getElementById(id); if(old) old.remove();
    var el = document.createElement('div'); el.id = id; el.className = 'd27-ov d43-ov';
    el.innerHTML = '<div class="d27-card"><div class="d27-hd"><div><small>'+esc(kicker)+'</small><h2>'+esc(title)+'</h2></div><button type="button" class="d27-x" data-d48c aria-label="Close">✕</button></div><div class="d29-body">'+body+'</div></div>';
    document.body.appendChild(el); document.body.classList.add('d27-open');
    el.addEventListener('click', function(e){ if(e.target===el || (e.target.closest && e.target.closest('[data-d48c]'))) shut(el); });
    return el;
  }
  function shut(el){ if(el) el.remove(); if(!document.querySelector('.d27-ov')) document.body.classList.remove('d27-open'); }
  var admin = function(){ try{ return CURRENT_ROLE==='admin'; }catch(e){ return true; } };
  window.d48View = function(rid){
    var r = rowById(rid); if(!r) return; var L = forCand(r.candidate); if(!L.length) return;
    var mine = L.filter(function(e){ return e.d===state.date && String(e.rid)===String(rid); })[0];
    var body = '<div class="d48-chips">'+chips(L)+'</div>'
      +(mine ? '<div class="d48-sec">This call</div><div class="d48-meta">'+esc(sd(mine.d))+' · '+esc([mine.co,mine.rd].filter(Boolean).join(' · '))+(who(mine)?' · '+who(mine):'')+'</div><textarea id="d48Edit" class="d46-ta" rows="5"'+(admin()?'':' readonly')+'>'+esc(mine.t)+'</textarea><div class="d46-bar"><button type="button" class="d27-btn" id="d48Copy">Copy</button>'+(admin()?'<button type="button" class="d27-btn d46-go" id="d48Save">Save</button><button type="button" class="d27-btn" id="d48Del">Remove</button>':'')+'</div>' : '')
      +(L.filter(function(e){ return e!==mine; }).length ? '<div class="d48-sec">'+(mine?'Earlier feedback':'Feedback on earlier calls')+'</div>'+L.filter(function(e){ return e!==mine; }).map(function(e){ return entryHtml(e); }).join('') : '');
    var el = ov('d46View','Feedback',(r.candidate||'').toUpperCase(), body);
    el.addEventListener('click', function(e){
      if(e.target.closest('#d48Copy')) copy(el.querySelector('#d48Edit').value);
      else if(e.target.closest('#d48Save')){ var f = window.d46Test; f.setFb(rid, el.querySelector('#d48Edit').value); shut(el); badges(); toast('Saved'); }
      else if(e.target.closest('#d48Del')){ window.d46Test.setFb(rid, ''); shut(el); badges(); toast('Feedback removed'); }
    });
  };

  /* ---------- heads-up pop-up before a call ---------- */
  var shown = {};
  function pop(){
    try{
      if(document.hidden || typeof state==='undefined' || state.needsLogin || state.date!==todayDateString() || document.getElementById('d48Pop')) return;
      var me = ''; try{ me = getMyAssigneeName(); }catch(e){}
      var n = nowBd();
      var r = rows().filter(function(x){ var m = bd(x.time)-n; return x.candidate && !x.woi && !x.status && m<=15 && m>=-2 && !shown[state.date+x.id] && forCand(x.candidate).filter(function(e){ return !(e.d===state.date && String(e.rid)===String(x.id)); }).length; })
        .sort(function(a,b){ return bd(a.time)-bd(b.time); })[0];
      if(!r) return;
      var o = ''; try{ o = window.cdOwnerOf ? window.cdOwnerOf(r) : (r.drivingPerson||r.assignee||''); }catch(e){}
      if(me && o===me && document.getElementById('d33Next')) return;
      shown[state.date+r.id] = 1;
      var L = forCand(r.candidate).filter(function(e){ return !(e.d===state.date && String(e.rid)===String(r.id)); }), e = L[0], m = bd(r.time)-n;
      var el = document.createElement('div'); el.id = 'd48Pop'; el.className = 'd48-pop '+sevOf(L);
      el.innerHTML = '<div class="d48-ph"><small>💬 HEADS-UP · '+(m<=0?'STARTING NOW':'IN '+m+' MIN')+'</small><button type="button" data-d48x aria-label="Dismiss">✕</button></div>'
        +'<b>'+esc(r.candidate)+'</b><span class="d48-ps">'+esc([r.time,r.company,r.round].filter(Boolean).join(' · '))+(o?' · '+esc(o):'')+'</span>'
        +'<div class="d48-tg">'+chips(L.slice(0,3))+'</div>'
        +'<div class="d48-pt"><small>'+esc(sd(e.d))+(who(e)?' · '+who(e):'')+'</small>'+esc(snip(e.t,230))+'</div>'
        +'<div class="d48-pb"><button type="button" data-d48p="'+esc(r.id)+'">🧭 Prep</button><button type="button" data-d48o="'+esc(r.id)+'">All feedback</button></div>';
      document.body.appendChild(el);
      el.addEventListener('click', function(ev){
        if(ev.target.closest('[data-d48x]')) el.remove();
        else if(ev.target.closest('[data-d48p]')){ el.remove(); if(window.d34Prep) window.d34Prep(r.id); }
        else if(ev.target.closest('[data-d48o]')){ el.remove(); window.d48View(r.id); }
      });
      setTimeout(function(){ if(el.isConnected) el.remove(); }, 90000);
    }catch(e){}
  }

  /* ---------- tools ---------- */
  var ADV = {prep:'practise with a few mock interviews', comm:'speak slowly and clearly and keep a steady pace', tech:'revise the core and basic technical questions', tool:'check your internet, audio and tools before the call'};
  function msgFor(r, e){
    var first = String(r.candidate||'').split(/\s+/)[0] || 'there', ks = tagsOf(e.t).filter(function(g){ return ADV[g.k]; }).map(function(g){ return ADV[g.k]; });
    return 'Hi '+first+', quick prep note before your '+(r.company||'')+' call ('+(r.time||'')+' IST). Feedback from your earlier call: '+snip(e.t,300)+(ks.length?' Please focus on: '+ks.join('; ')+'.':'')+' All the best!';
  }
  function prepListHtml(){
    var L = rows().filter(function(r){ return r.candidate && !r.woi && !r.status; }).sort(function(a,b){ return bd(a.time)-bd(b.time); }), out = [];
    L.forEach(function(r){ var F = forCand(r.candidate).filter(function(e){ return !(e.d===state.date && String(e.rid)===String(r.id)); }); var w = F.filter(weak)[0]; if(w) out.push({r:r, e:w, F:F}); });
    if(!out.length) return '<div class="d27-empty">Nobody on '+esc(state.date)+' has earlier feedback saying they need prep.</div>';
    return '<div class="d46-bar"><button type="button" class="d27-btn d46-go" data-d48a="all">Copy all messages</button><span class="d46-sum">'+out.length+' candidate'+(out.length===1?'':'s')+' · '+esc(state.date)+'</span></div>'
      +out.map(function(x,i){ return '<div class="d48-card"><div class="d48-meta"><b>'+esc(x.r.time||'')+'</b> · <b>'+esc(x.r.candidate)+'</b> · '+esc(x.r.company||'')+'</div><div class="d48-tg">'+chips(x.F.slice(0,3))+'</div><div class="d48-tx">'+esc(snip(x.e.t,200))+'</div><div class="d48-meta">'+esc(sd(x.e.d))+(who(x.e)?' · '+who(x.e):'')+'</div><button type="button" class="d27-btn" data-d48m="'+i+'">Copy message</button></div>'; }).join('');
  }
  function pendingData(range, firstOnly){
    var t = todayDateString(), a = t, b = t;
    if(range==='yesterday'){ a = b = deskDateAdd(t,-1); } else if(range==='3'){ a = deskDateAdd(t,-2); }
    return fetchAllRowsAcrossDates(false).then(function(all){
      var have = {}, haveCo = {}; entries().forEach(function(e){ have[e.d+'|'+e.rid] = 1; haveCo[e.d+'|'+nk(e.c)] = 1; });
      return (all||[]).filter(function(r){ var d = r._date||''; return d>=a && d<=b && r.candidate && !r.woi && !r.status && (!firstOnly || /^(1st|first)/i.test(r.round||'')) && !have[d+'|'+r.id] && !haveCo[d+'|'+nk(r.candidate)]; })
        .sort(function(x,y){ return x._date===y._date ? bd(x.time)-bd(y.time) : (x._date<y._date?-1:1); });
    });
  }
  function pendingHtml(list, range, firstOnly){
    var chipsH = '<div class="d29-seg wrap">'+[['yesterday','Yesterday'],['today','Today'],['3','Last 3 days']].map(function(x){ return '<button type="button" class="'+(range===x[0]?'on':'')+'" data-d48r="'+x[0]+'">'+x[1]+'</button>'; }).join('')+'<button type="button" class="'+(firstOnly?'on':'')+'" data-d48f="1">1st rounds only</button></div>';
    if(!list) return chipsH+'<div class="d27-empty">Reading every saved day…</div>';
    if(!list.length) return chipsH+'<div class="d27-empty">✅ Every call in this range has feedback.</div>';
    var g = {}; list.forEach(function(r){ var w = (r.drivingPerson||r.assignee||'Unassigned').trim()||'Unassigned'; (g[w] = g[w]||[]).push(r); });
    var names = Object.keys(g).sort(function(a,b){ return g[b].length-g[a].length; });
    return chipsH+'<div class="d46-bar"><button type="button" class="d27-btn d46-go" data-d48a="chase">Copy all chase messages</button><span class="d46-sum">'+list.length+' without feedback · '+names.length+' people</span></div>'
      +names.map(function(w,i){ return '<div class="d48-card"><div class="d48-meta"><b>'+esc(w)+'</b> · '+g[w].length+'</div>'+g[w].map(function(r){ return '<div class="d48-tx">'+esc(sd(r._date))+' · '+esc(r.time||'')+' · '+esc(r.candidate)+' · '+esc(r.company||'')+'</div>'; }).join('')+'<button type="button" class="d27-btn" data-d48c2="'+i+'">Copy chase message</button></div>'; }).join('');
  }
  function chaseMsg(w, L){ return 'Hi '+(w==='Unassigned'?'team':w.split(/\s+/)[0])+', please share the feedback for these calls:\n'+L.map(function(r,i){ return (i+1)+'. '+sd(r._date)+' '+(r.time||'')+' – '+r.candidate+' ('+(r.company||'')+')'; }).join('\n')+'\nThank you!'; }
  function summaryHtml(period, data){
    var chipsH = '<div class="d29-seg wrap">'+[['week','This week'],['7','Last 7 days'],['month','This month'],['all','All']].map(function(x){ return '<button type="button" class="'+(period===x[0]?'on':'')+'" data-d48s="'+x[0]+'">'+x[1]+'</button>'; }).join('')+'</div>';
    if(!data.n) return chipsH+'<div class="d27-empty">No feedback in this period.</div>';
    var bar = function(l,n,c){ return '<div class="d48-bar"><span>'+esc(l)+'</span><i class="'+c+'" style="width:'+Math.max(4,Math.round(100*n/data.n))+'%"></i><b>'+n+'</b></div>'; };
    return chipsH+'<div class="d46-bar"><button type="button" class="d27-btn d46-go" data-d48a="sum">Copy summary</button><span class="d46-sum">'+data.n+' feedbacks · '+data.good+' went well · '+data.weak+' need work</span></div>'
      +'<div class="d27-sec"><b>By tag</b></div>'+TAGS.map(function(g){ return data.tag[g[0]] ? bar(g[1], data.tag[g[0]], g[2]) : ''; }).join('')
      +'<div class="d27-sec"><b>By client</b><span>top 8</span></div>'+data.co.slice(0,8).map(function(x){ return '<div class="d48-row"><b>'+esc(x[0])+'</b><span>'+x[1].n+' feedback'+(x[1].n===1?'':'s')+(x[1].w?' · <em class="warn">'+x[1].w+' need work</em>':'')+'</span></div>'; }).join('')
      +'<div class="d27-sec"><b>By person who took the call</b></div>'+data.pe.slice(0,10).map(function(x){ return '<div class="d48-row"><b>'+esc(x[0])+'</b><span>'+x[1].n+' feedback'+(x[1].n===1?'':'s')+(x[1].w?' · <em class="warn">'+x[1].w+' need work</em>':'')+'</span></div>'; }).join('');
  }
  function summaryData(period){
    var t = todayDateString(), a = '0000-00-00';
    if(period==='week') a = deskMonday(t); else if(period==='7') a = deskDateAdd(t,-6); else if(period==='month') a = t.slice(0,8)+'01';
    var L = entries().filter(function(e){ return e.d>=a; }), D = {n:L.length, good:0, weak:0, tag:{}, co:{}, pe:{}};
    L.forEach(function(e){ var ts = tagsOf(e.t), w = ts.some(function(g){ return g.c==='warn'; }); if(ts.some(function(g){ return g.k==='good'; })) D.good++; if(w) D.weak++;
      ts.forEach(function(g){ D.tag[g.k] = (D.tag[g.k]||0)+1; });
      var c = e.co||'—', p = (e.p||e.a||'—'); (D.co[c] = D.co[c]||{n:0,w:0}).n++; if(w) D.co[c].w++; (D.pe[p] = D.pe[p]||{n:0,w:0}).n++; if(w) D.pe[p].w++; });
    var srt = function(o){ return Object.keys(o).map(function(k){ return [k,o[k]]; }).sort(function(x,y){ return y[1].n-x[1].n; }); };
    D.co = srt(D.co); D.pe = srt(D.pe); return D;
  }
  function openTool(k){
    var el;
    if(k==='fbp'){
      el = ov('d48T','Prep list','TODAY’S CANDIDATES WHO NEED PREP','<div class="d27-empty">Loading feedback…</div>');
      var paint = function(){ if(!el.isConnected) return; el.querySelector('.d29-body').innerHTML = prepListHtml(); };
      paint(); load().then(paint);
      el.addEventListener('click', function(e){
        var out = []; rows().filter(function(r){ return r.candidate && !r.woi && !r.status; }).sort(function(a,b){ return bd(a.time)-bd(b.time); }).forEach(function(r){ var F = forCand(r.candidate).filter(function(x){ return !(x.d===state.date && String(x.rid)===String(r.id)); }); var w = F.filter(weak)[0]; if(w) out.push({r:r,e:w}); });
        var m = e.target.closest('[data-d48m]'); if(m){ var x = out[+m.getAttribute('data-d48m')]; if(x) copy(msgFor(x.r,x.e)); return; }
        if(e.target.closest('[data-d48a="all"]')) copy(out.map(function(x){ return x.r.candidate+':\n'+msgFor(x.r,x.e); }).join('\n\n'));
      });
    } else if(k==='fbm'){
      var st = {range:'yesterday', first:true, list:null, groups:[]}; el = ov('d48T','Feedback pending','CALLS WITH NO FEEDBACK YET', pendingHtml(null,st.range,st.first));
      var run = function(){ st.list = null; el.querySelector('.d29-body').innerHTML = pendingHtml(null,st.range,st.first);
        Promise.all([load(), pendingData(st.range, st.first)]).then(function(res){ if(!el.isConnected) return; st.list = res[1]; var g = {}; st.list.forEach(function(r){ var w = (r.drivingPerson||r.assignee||'Unassigned').trim()||'Unassigned'; (g[w] = g[w]||[]).push(r); }); st.groups = Object.keys(g).sort(function(a,b){ return g[b].length-g[a].length; }).map(function(w){ return [w,g[w]]; }); el.querySelector('.d29-body').innerHTML = pendingHtml(st.list,st.range,st.first); })
          .catch(function(){ if(el.isConnected) el.querySelector('.d29-body').innerHTML = '<div class="d27-empty">Could not load calls — check your connection.</div>'; }); };
      run();
      el.addEventListener('click', function(e){
        var r = e.target.closest('[data-d48r]'); if(r){ st.range = r.getAttribute('data-d48r'); run(); return; }
        if(e.target.closest('[data-d48f]')){ st.first = !st.first; run(); return; }
        var c = e.target.closest('[data-d48c2]'); if(c){ var g = st.groups[+c.getAttribute('data-d48c2')]; if(g) copy(chaseMsg(g[0],g[1])); return; }
        if(e.target.closest('[data-d48a="chase"]')) copy(st.groups.map(function(g){ return chaseMsg(g[0],g[1]); }).join('\n\n'));
      });
    } else if(k==='fbs'){
      var per = 'week'; el = ov('d48T','Feedback summary','WHAT THE FEEDBACK SAYS','<div class="d27-empty">Loading…</div>');
      var show = function(){ if(el.isConnected) el.querySelector('.d29-body').innerHTML = summaryHtml(per, summaryData(per)); };
      show(); load().then(show);
      el.addEventListener('click', function(e){
        var s = e.target.closest('[data-d48s]'); if(s){ per = s.getAttribute('data-d48s'); show(); return; }
        if(e.target.closest('[data-d48a="sum"]')){ var D = summaryData(per); copy('Feedback summary ('+per+'): '+D.n+' feedbacks · '+D.good+' went well · '+D.weak+' need work\n'+TAGS.filter(function(g){ return D.tag[g[0]]; }).map(function(g){ return '• '+g[1]+': '+D.tag[g[0]]; }).join('\n')+'\nTop clients: '+D.co.slice(0,5).map(function(x){ return x[0]+' ('+x[1].n+')'; }).join(', ')); }
      });
    } else return false;
    return true;
  }
  window.d48Open = openTool;
  var prev = window.d35Open;
  window.d35Open = function(k){ if(k==='fbp'||k==='fbm'||k==='fbs'){ openTool(k); return true; } return typeof prev==='function' ? prev(k) : false; };

  var oR = window.render, tm = 0;
  window.render = function(){ var r = oR.apply(this, arguments); clearTimeout(tm); tm = setTimeout(function(){ if(state.date!==lastDate){ lastDate = state.date; load(true); } badges(); }, 160); return r; };
  setTimeout(function(){ load(); }, 2500); setInterval(pop, 60000); setTimeout(pop, 5000);
  window.d48Test = {tagsOf:tagsOf, entries:entries, load:load, forCand:forCand, pop:pop};
})();

/* ===== V4.1 (d49): always-reachable horizontal scrollbar for the calls table (mouse) + phone search sheet follows the keyboard ===== */
(function(){
  'use strict';
  var bar = null, inner = null, main = null, lock = 0, raf = 0;
  var fine = false; try{ fine = window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches; }catch(e){}
  function ensure(){
    main = document.getElementById('tableScrollMain'); if(!main) return false;
    if(!bar){
      bar = document.createElement('div'); bar.id = 'd49Hs'; bar.setAttribute('aria-hidden','true'); bar.innerHTML = '<div></div>'; inner = bar.firstChild; document.body.appendChild(bar);
      bar.addEventListener('scroll', function(){ if(lock){ lock = 0; return; } if(main && Math.abs(main.scrollLeft-bar.scrollLeft)>1){ lock = 1; main.scrollLeft = bar.scrollLeft; } });
    }
    if(!main.__d49){ main.__d49 = 1; main.addEventListener('scroll', function(){ if(!bar) return; if(lock){ lock = 0; return; } if(Math.abs(bar.scrollLeft-main.scrollLeft)>1){ lock = 1; bar.scrollLeft = main.scrollLeft; } }, {passive:true}); }
    return true;
  }
  function update(){
    raf = 0;
    if(!fine){ return; }
    if(!ensure() || !main.offsetParent){ if(bar) bar.style.display = 'none'; return; }
    var r = main.getBoundingClientRect(), scrollable = main.scrollWidth > main.clientWidth + 2, vh = window.innerHeight;
    var show = scrollable && r.top < vh - 70 && r.bottom > vh - 2 && !document.body.classList.contains('d27-open');
    if(!show){ bar.style.display = 'none'; return; }
    bar.style.display = 'block'; bar.style.left = Math.round(r.left)+'px'; bar.style.width = Math.round(r.width)+'px';
    inner.style.width = main.scrollWidth+'px';
    if(Math.abs(bar.scrollLeft-main.scrollLeft)>1) bar.scrollLeft = main.scrollLeft;
  }
  function sched(){ if(!raf) raf = requestAnimationFrame(update); }
  window.addEventListener('scroll', sched, {passive:true}); window.addEventListener('resize', sched);
  try{ new MutationObserver(sched).observe(document.body, {childList:true, subtree:true}); }catch(e){}
  setInterval(sched, 1500);

  /* phone / tablet: Search-everything sheet shrinks and moves with the on-screen keyboard (so results never hide behind it) */
  function vv(){
    var el = document.getElementById('d12'), v = window.visualViewport; if(!el || !v) return;
    el.style.top = Math.round(v.offsetTop)+'px'; el.style.height = Math.round(v.height)+'px'; el.style.bottom = 'auto';
  }
  if(window.visualViewport){ visualViewport.addEventListener('resize', vv); visualViewport.addEventListener('scroll', vv); }
  try{ new MutationObserver(function(){ if(document.getElementById('d12')) vv(); }).observe(document.body, {childList:true}); }catch(e){}
})();
