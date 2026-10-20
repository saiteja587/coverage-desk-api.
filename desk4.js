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
  var layout = function(){ var v = LS.get('d4.layout','compact'); return v==='focus'||v==='full'?v:'compact'; };
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
    full:SVG('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>')
  };

  function setLayout(v){ LS.set('d4.layout', v); apply(); organize(true); }
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
    var lay = [['focus','Focus',IC.focus,'Just the calls'],['compact','Compact',IC.comp,'Tidy default'],['full','Full',IC.full,'Everything open']].map(function(x){
      return '<button class="d4-seg'+(layout()===x[0]?' on':'')+'" data-d4="layout" data-v="'+x[0]+'" title="'+x[3]+'"><i>'+x[2]+'</i><span>'+x[1]+'</span></button>';
    }).join('');
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
    setInterval(function(){ if(!organizing && !menuEl) organize(true); }, 60000);
  }
  apply();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', install); else install();
})();
