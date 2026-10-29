/* ===== polish.js ===== */
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
  var collapsed = {};
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
    if(ci>=0){
      var left=0;
      for(var i=0;i<=ci;i++){
        var w = ths[i].offsetWidth; ths[i].classList.add('d2-pin'); ths[i].style.left = left+'px';
        $$('tbody tr', wrap).forEach(function(tr){ var td = tr.children[i]; if(td && !tr.classList.contains('d2-grp')){ td.classList.add('d2-pin'); td.style.left = left+'px'; } });
        left += w;
      }
    }
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
      list.push({name:p.name, team:p.team||'', load:mine.length, clash:clash, absent:absent, advanced:!!p.advanced, prior:prior[p.name]||''});
    });
    var teams = {}; roster.forEach(function(p){ if(p.team) teams[p.team]=1; }); t.forEach(function(n){ teams[n]=1; });
    var teamList = Object.keys(teams).filter(function(n){ return n && n!=='Needs Team Assignment'; }).sort().map(function(n){
      var cnt = rows().filter(function(r){ return r.id!==row.id && r.assignee===n && !r.woi; }).length;
      var members = roster.filter(function(p){ return p.team===n && !t.has(p.name); }).length;
      return {name:n, team:'Team assignment'+(members?' · '+members+' members':''), load:cnt, isTeam:true};
    });
    list.sort(function(a,b){ return (a.absent-b.absent) || ((!!a.clash)-(!!b.clash)) || ((b.prior?1:0)-(a.prior?1:0)) || (a.load-b.load) || a.name.localeCompare(b.name); });
    return teamList.concat(list);
  }
  window.d2Rank = function(row){ return rankHandlers(row); };
  function assignTo(id, name){
    var r = rows().find(function(x){ return x.id===id; }); if(!r) return;
    var sel = $('tr[data-id="'+id+'"] select[data-field="assignee"]');
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
        return head+'<button class="d2-pop-i'+(i===fi?' first':'')+'" data-n="'+esc(h.name)+'"><span class="d2-av">'+esc(h.name.charAt(0).toUpperCase())+'</span><span class="d2-pop-n">'+esc(h.name)+'<small>'+esc(h.team)+(h.prior?' · <span class="d2-prior">↻ handled this '+h.prior+' before</span>':'')+'</small></span><span class="d2-pop-m">'+h.load+' call'+(h.load===1?'':'s')+'</span>'+tag+'</button>';
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
    return out;
  }
  function buildSuggestions(){
    var people = peopleList().filter(function(p){ return !isAbsentP(p); });
    var sim = rows().map(function(r){ return {id:r.id, time:r.time, duration:r.duration, assignee:r.assignee, woi:r.woi}; });
    var un = rows().filter(function(r){ return !r.assignee && live(r) && bd(r.time)!==9999; }).sort(function(a,b){ return bd(a.time)-bd(b.time); });
    var out = [];
    un.forEach(function(r){
      var adv = false; try{ adv = isAdvancedRound(r.round); }catch(e){}
      var pri = priorHandler(r), best=null;
      people.forEach(function(p){
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
      ['Work',[['Alt + T','Timeline'],['Alt + H','Shift handover'],['Alt + S','Suggest assignments'],['Alt + P','Print day sheet'],['Alt + Z','Undo last change'],['Ctrl + S','Save changes']]],
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
    if(hcEl || window.matchMedia('(hover: none)').matches) return;
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
  var roleDefault = function(){ if(window.innerWidth<900) return 'focus'; try{ return CURRENT_ROLE==='admin' ? 'compact' : 'focus'; }catch(e){ return 'compact'; } };
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
    if(innerWidth>=900 && c){ show = c.getBoundingClientRect().top <= 64 && window.scrollY>200; }
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
    if(a==='sec'){ var k=t.dataset.k; openSecs[k]=!openSecs[k]; LS.set('d4.open', JSON.stringify(openSecs)); organize(true); if(openSecs[k]){ var d=$('#d4Drawer'); if(d) d.scrollIntoView({behavior:'smooth',block:'nearest'}); } }
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
  var desktop = function(){ return window.innerWidth>=900; };
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
    var assign = '<section><h4>Assigned to</h4><div class="d5-cur">'+(r.woi?'<span class="d5-muted">Waiting for invite — no owner yet</span>':(r.assignee?'<span class="d5-av big">'+esc(r.assignee.charAt(0).toUpperCase())+'</span><b>'+esc(r.assignee)+'</b>':'<span class="d5-un">Nobody assigned</span>'))+'</div>'
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
  var phone = function(){ return window.innerWidth<900; };
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
    if(it && window.cdOpenFromNotification) window.cdOpenFromNotification({ date: it.date, candidate: it.candidate });
  }
  window.addEventListener('livefeed-change', function(){ if(el) paint(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && el) close(); });

  // phone: the bottom-bar "Alerts" tab opens this inbox instead of the repeat-candidate list
  document.addEventListener('click', function(e){
    var n = e.target.closest && e.target.closest('#navAlerts'); if(!n) return;
    if(window.innerWidth>=900 || !api()) return;
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
  var coarse = function(){ try{ return window.matchMedia('(pointer:coarse)').matches || innerWidth<900; }catch(e){ return innerWidth<900; } };
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
  var nkey = function(n){ try{ return normalizeNameKey(n); }catch(e){ return String(n||'').toLowerCase().trim(); } };
  var ckey = function(n){ try{ return normalizeCompanyKey(n); }catch(e){ return String(n||'').toLowerCase().trim(); } };
  var coName = function(c){ try{ return stripCompanyNoise(c)||c; }catch(e){ return c||''; } };
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
  document.addEventListener('input', function(e){ if(!el || !e.target.classList || !e.target.classList.contains('d12-q')) return; q = e.target.value; clearTimeout(timer); timer = setTimeout(paint, 90); });
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
      var used = {}, day = { date:d, docCount:parsed.length, fresh:[], same:0, changed:[], onlyApp:0 };
      var seenKey = {};
      day.dupes = 0;
      parsed.forEach(function(p){
        var dk = String(p.candidate||'').trim().toLowerCase()+'|'+ck(p.company)+'|'+nk(p.time);
        if(seenKey[dk]){ day.dupes++; return; }
        seenKey[dk] = 1;
        var ex = findExistingCallMatch(p, existing);
        if(!ex){
          var key = d+'|'+String(p.candidate||'').trim().toLowerCase()+'|'+ck(p.company)+'|'+nk(p.time);
          if(dis[key]){ day.hidden = (day.hidden||0)+1; return; }
          day.fresh.push({ p:p, key:key, warn: warnReason(p) }); return;
        }
        used[ex.id] = 1;
        var diffs = [];
        if(!p.woi && !ex.woi && p.time && ex.time && tmin(p.time)!==tmin(ex.time)) diffs.push('time: doc '+p.time+' · app '+ex.time);
        if(p.company && ex.company && !sameCo(p.company, ex.company)) diffs.push('company: doc '+p.company+' · app '+ex.company);
        var explicit = !(p.doubts||[]).some(function(x){ return /Round wasn.t stated/.test(x); });
        if(explicit && p.round && ex.round && rk(p.round)!==rk(ex.round)) diffs.push('round: doc '+p.round+' · app '+ex.round);
        if(diffs.length) day.changed.push({ p:p, ex:ex, diffs:diffs }); else day.same++;
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
    el.querySelector('.d14-body').innerHTML =
      '<div style="font-size:12px;opacity:.75">This is a waiting room. The doc is checked every hour and new calls wait here. Nothing goes into your main calls until you tick calls and press Add. Calls already in the app are never changed or removed.</div>'+
      statusHtml()+
      '<details '+(S.url?'':'open')+' style="font-size:12px"><summary style="cursor:pointer;opacity:.8">Google Doc link'+(S.url?' (saved)':'')+'</summary><input class="d14-url" type="text" value="'+esc(S.url)+'" placeholder="https://docs.google.com/document/d/…" autocomplete="off" style="padding:8px;border-radius:8px;width:100%;box-sizing:border-box;margin-top:6px"><div style="opacity:.7;margin-top:4px">The doc must be shared as “Anyone with the link can view”.</div></details>'+
      '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><button type="button" class="d14-fetch" style="'+btn+'" '+(S.busy?'disabled':'')+'>'+(S.busy?'Reading…':'🔄 Check the doc now')+'</button>'+(S.dismissed.length?'<button type="button" class="d14-restore" style="'+btn+'">Show '+S.dismissed.length+' dismissed again</button>':'')+'</div>'+
      '<details '+(S.err?'open':'')+' style="font-size:12px"><summary style="cursor:pointer;opacity:.8">…or paste the doc text instead</summary><textarea class="d14-paste" placeholder="Copy from the doc and paste here" style="width:100%;box-sizing:border-box;min-height:90px;margin-top:6px;border-radius:8px;padding:8px">'+esc(S.paste)+'</textarea><button type="button" class="d14-usepaste" style="'+btn+';margin-top:6px">Check pasted text</button></details>'+
      (S.err?'<div style="color:var(--coral,#f66);font-size:13px">'+esc(S.err)+'</div>':'')+
      (S.msg?'<div style="font-size:13px;color:var(--teal,#4fd1b0);white-space:pre-line">'+esc(S.msg)+'</div>':'')+
      planHtml()+
      (S.plan && S.plan.days.length ? '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button type="button" class="d14-apply" style="'+btn+';background:var(--teal-dim,rgba(80,200,160,.18))" '+((S.applying||!nSel)?'disabled':'')+'>'+(S.applying?'Adding…':'Add '+nSel+' selected to main calls')+'</button><button type="button" class="d14-dismiss" style="'+btn+'" '+((S.applying||!nSel)?'disabled':'')+'>Dismiss selected</button><button type="button" class="d14-all" style="'+btn+'">Select all new</button><button type="button" class="d14-none" style="'+btn+'">Select none</button></div>' : '');
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
          var b = document.getElementById('openD14'); if(b) b.innerHTML = '📄 Google Doc inbox'+(S.changed?' <span style="color:var(--amber,#e8a33d)">● doc updated</span>':'');
        }).catch(function(){}); };
        setTimeout(chk, 4000); setInterval(chk, 3600000);
      }
    }catch(e){}
    var prev = window.d2ExtraCmds;
    window.d2ExtraCmds = function(){ var base = prev ? prev() : []; return base.concat([['sync google doc tracker upcoming calls import inbox','Google Doc inbox','Review upcoming calls from the tracker doc',openS,'📄']]); };
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();
