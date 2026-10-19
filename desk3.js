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
