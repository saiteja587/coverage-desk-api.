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
    var roster = (state.roster||[]).filter(function(p){ return p && p.name; });
    var seen = {}, list = [];
    roster.forEach(function(p){
      if(seen[p.name]||t.has(p.name)) return; seen[p.name]=1;
      var mine = byName[p.name]||[], clash = null, nextGap = 9999;
      mine.forEach(function(o){ var os=bd(o.time), oe=os+dur(o); if(os<e && oe>s && !clash) clash=o; if(os>=e) nextGap=Math.min(nextGap, os-e); });
      var absent = false; try{ absent = typeof isAbsent==='function' && isAbsent(p.name, state.date); }catch(x){}
      list.push({name:p.name, team:p.team||'', load:mine.length, clash:clash, absent:absent, advanced:!!p.advanced});
    });
    var teams = {}; roster.forEach(function(p){ if(p.team) teams[p.team]=1; }); t.forEach(function(n){ teams[n]=1; });
    var teamList = Object.keys(teams).filter(function(n){ return n && n!=='Needs Team Assignment'; }).sort().map(function(n){
      var cnt = rows().filter(function(r){ return r.id!==row.id && r.assignee===n && !r.woi; }).length;
      var members = roster.filter(function(p){ return p.team===n && !t.has(p.name); }).length;
      return {name:n, team:'Team assignment'+(members?' · '+members+' members':''), load:cnt, isTeam:true};
    });
    list.sort(function(a,b){ return (a.absent-b.absent) || ((!!a.clash)-(!!b.clash)) || (a.load-b.load) || a.name.localeCompare(b.name); });
    return teamList.concat(list);
  }
  function assignTo(id, name){
    var r = rows().find(function(x){ return x.id===id; }); if(!r) return;
    var sel = $('tr[data-id="'+id+'"] select[data-field="assignee"]');
    var has = sel && Array.prototype.some.call(sel.options, function(o){ return o.value===name; });
    if(sel && has){ sel.value = name; sel.dispatchEvent(new Event('change',{bubbles:true})); }
    else { r.assignee = name; markDirty(); render(); }
  }
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
        return head+'<button class="d2-pop-i'+(i===fi?' first':'')+'" data-n="'+esc(h.name)+'"><span class="d2-av">'+esc(h.name.charAt(0).toUpperCase())+'</span><span class="d2-pop-n">'+esc(h.name)+'<small>'+esc(h.team)+'</small></span><span class="d2-pop-m">'+h.load+' call'+(h.load===1?'':'s')+'</span>'+tag+'</button>';
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
