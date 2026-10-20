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
    el.innerHTML = '<span class="d2-toast-msg">'+esc(msg)+'</span>'+(opt.label?'<button class="d2-toast-btn">'+esc(opt.label)+'</button>':'')+'<i class="d2-toast-bar"></i>';
    var ms = opt.ms||10000; el.style.setProperty('--ms', ms+'ms');
    var kill = function(){ el.classList.add('out'); setTimeout(function(){ el.remove(); },260); };
    var b = $('.d2-toast-btn',el); if(b) b.onclick=function(){ try{ opt.action&&opt.action(); }finally{ kill(); } };
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
  function setAssignee(r, name){
    var sel = $('tr[data-id="'+r.id+'"] select[data-field="assignee"]');
    r.assignee = name;
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
  var roleDefault = function(){ try{ return CURRENT_ROLE==='admin' ? 'compact' : 'focus'; }catch(e){ return 'compact'; } };
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
  window.d4Organize = function(){ organize(true); };
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
    if(!desktop()) return;
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
    var hist = '<section><h4>History</h4><div class="d5-hist" id="d5Hist">'+(histCache[activeId]||'<span class="d5-muted">Loading earlier calls…</span>')+'</div></section>';
    var foot = '<div class="d5-foot">'+(r.status?'':'')+'<button class="btn ghost" data-d5="menu-pin">Interviewer / POC</button><button class="btn ghost" data-d5="menu-closure">🎯 Expected closure</button>'+(ad?'<button class="btn ghost danger" data-d5="menu-del">Delete</button>':'')+'</div>';
    side.innerHTML = '<header class="d5-h"><span class="d5-av big">'+esc((r.candidate||'?').charAt(0).toUpperCase())+'</span><div class="d5-ht"><b>'+esc(r.candidate||'(no name)')+'</b><small>'+esc(r.company||'')+(r.role?' · '+esc(r.role):'')+'</small></div>'
      +'<div class="d5-nav"><button data-d5="prev" title="Previous call (↑)" '+(ix<=0?'disabled':'')+'>↑</button><button data-d5="next" title="Next call (↓)" '+(ix<0||ix>=ids.length-1?'disabled':'')+'>↓</button><button data-d5="close" title="Close (Esc)">✕</button></div></header>'
      +'<div class="d5-tags">'+tags+'</div><div class="d5-body">'+assign+fx+notes+portal+linked+hist+'</div>'+foot;
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
      return;
    }
    var pick = e.target.closest && e.target.closest('[data-d5-assign]');
    if(pick && side && side.contains(pick) && window.d2AssignTo){ window.d2AssignTo(activeId, pick.dataset.d5Assign); return; }
    // open from a row click
    if(!desktop()) return;
    var tr = e.target.closest && e.target.closest('#tableScrollMain tbody tr[data-id]'); if(!tr) return;
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
  window.addEventListener('resize', function(){ if(!desktop()) closeSide(); decorateRows(); });

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
