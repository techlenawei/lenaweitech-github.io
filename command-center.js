// Lenawei Command Center - All-Frontend Pro Features (No Backend Required)

// ====== Persistent User Sessions ======
(function(){
  // Restore theme
  let theme = localStorage.getItem('lenawei_theme');
  if (theme === 'dark') document.body.classList.add('dark-mode');
  // Restore contrast
  if(localStorage.getItem('lenawei_contrast')==="1") document.body.classList.add('high-contrast');
  // Restore language
  let lang = localStorage.getItem('lenawei_lang');
  if (lang && document.getElementById('lang-switch')) {
    document.getElementById('lang-switch').value = lang;
    document.getElementById('lang-switch').onchange();
  }
  // Restore last section
  let lastHash = localStorage.getItem('lenawei_section');
  if(lastHash) location.hash = lastHash;
})();

// ====== Command Palette (Ctrl+K or /) ======
document.addEventListener('keydown', function(e){
  if ((e.ctrlKey && e.key==='k') || (e.key==='/' && document.activeElement.tagName!=="INPUT")) {
    e.preventDefault();
    openCommandPalette();
  }
});
window.openCommandPalette = function() {
  let cp = document.getElementById('cmdPalette');
  if (!cp) return;
  cp.style.display = '';
  let input = document.getElementById('cmdpInput');
  input.value = '';
  filterCmd('');
  input.focus();
};
if(document.getElementById('cmdpInput')) {
  document.getElementById('cmdpInput').oninput = function() { filterCmd(this.value); };
}
function filterCmd(q) {
  let arr = window.commands.filter(c=>c.label.toLowerCase().includes(q.toLowerCase()));
  let cl = document.getElementById('cmdpList');
  cl.innerHTML = arr.map((c,i)=>`<li tabindex="0" data-idx="${i}">${c.label}</li>`).join("");
  if (arr.length) selectCmd(0);
  Array.from(cl.children).forEach((li,i)=>{
    li.onclick = ()=>{ arr[i].action(); closeCmdPalette(); };
    li.onkeydown = function(e){
      if (e.key==="Enter") { arr[i].action(); closeCmdPalette();}
      else if (e.key==="ArrowDown" && i<arr.length-1) selectCmd(i+1);
      else if (e.key==="ArrowUp" && i>0) selectCmd(i-1);
    }
  });
}
function selectCmd(idx) {
  let cl = document.getElementById('cmdpList');
  Array.from(cl.children).forEach((li,i)=>{
    li.classList.toggle('selected', i===idx);
    if(i===idx) li.focus();
  });
}
function closeCmdPalette() {
  document.getElementById("cmdPalette").style.display = "none";
}

// ====== Notification Center ======
window.addNotification = function(msg) {
  let n = JSON.parse(localStorage.getItem('lenawei_notifications')||'[]');
  n.unshift({msg, time:new Date().toLocaleTimeString(), read:false});
  localStorage.setItem('lenawei_notifications', JSON.stringify(n.slice(0,40)));
  renderNotifications();
};
function renderNotifications(){
  let n = JSON.parse(localStorage.getItem('lenawei_notifications')||'[]');
  document.getElementById('notif-badge').innerText = n.filter(x=>!x.read).length;
  document.getElementById('notif-list').innerHTML = n.map(x=>`<li class="${x.read?'':'unread'}">${x.msg} <span style="float:right;color:#999;">${x.time}</span></li>`).join('');
}
document.getElementById("notification-bell").onclick = function(e){
  let c = document.getElementById("notif-center");
  c.style.display = (c.style.display==="none"||!c.style.display)?"block":"none";
  renderNotifications();
};
document.getElementById("notif-mark-read").onclick = function(){
  let n = JSON.parse(localStorage.getItem('lenawei_notifications')||'[]');
  n.forEach(x=>x.read=true);
  localStorage.setItem('lenawei_notifications', JSON.stringify(n));
  renderNotifications();
};
window.addEventListener('click', e=>{
  if(!document.getElementById("notification-bell").contains(e.target))
    document.getElementById("notif-center").style.display = "none";
});

// ====== Onboarding Tour ======
if(!localStorage.getItem("lenawei_onboarded")) {
  setTimeout(()=>window.showOnboarding(), 800);
  localStorage.setItem("lenawei_onboarded","1");
}

// ====== Language Picker ======
if(document.getElementById('lang-switch')) {
  document.getElementById('lang-switch').onchange = function() {
    let lang = this.value;
    localStorage.setItem("lenawei_lang", lang);
    // Simple demo: update a few fields only
    let t = {
      en: { welcome: "Welcome to Lenawei Command Center!", finance: "Finance Table", team: "Team & Roles" },
      sw: { welcome: "Karibu Lenawei Command Center!", finance: "Jedwali la Fedha", team: "Timu & Majukumu" },
      fr: { welcome: "Bienvenue au Centre de Commande Lenawei!", finance: "Tableau Financier", team: "Équipe & Rôles" }
    };
    document.getElementById('welcomeBanner').innerText = t[lang].welcome;
    document.getElementById('finance-section').querySelector('h2').innerText = t[lang].finance;
    document.getElementById('team-section').querySelector('h2').innerText = t[lang].team;
  }
}

// ====== Accessibility / High-Contrast ======
if(document.getElementById('contrastToggle')) {
  document.getElementById('contrastToggle').onclick = function(){
    document.body.classList.toggle('high-contrast');
    localStorage.setItem('lenawei_contrast', document.body.classList.contains('high-contrast')?"1":"0");
  };
}

// ====== Audit Log Modal (Frontend Only) ======
window.auditEntries = JSON.parse(localStorage.getItem('lenawei_audit')||'[]');
window.addAudit = function(msg) {
  auditEntries.unshift({msg, time:new Date().toLocaleString()});
  localStorage.setItem('lenawei_audit', JSON.stringify(auditEntries.slice(0,100)));
};
window.showAuditLog = function() {
  document.getElementById('auditModal').style.display = '';
  document.getElementById('auditList').innerHTML = auditEntries.map(e=>`<li>${e.msg} <span style="float:right;color:#999;">${e.time}</span></li>`).join('');
};

// ====== Avatars / User Cards ======
// Just use CSS/HTML for avatars as shown in the .avatar classes

// ====== Undo/Redo System (Kanban & Finance - Simple, Demo Only) ======
let kanbanHistory = [], financeHistory = [];
window.saveKanbanState = function() {
  let state = [];
  document.querySelectorAll('.kanban-col').forEach(col=>{
    let arr = [];
    col.querySelectorAll('.kanban-task').forEach(task => arr.push(task.textContent));
    state.push(arr);
  });
  kanbanHistory.push(JSON.stringify(state));
  if(kanbanHistory.length>30) kanbanHistory.shift();
};
window.undoKanban = function() {
  if(kanbanHistory.length<2) return;
  kanbanHistory.pop();
  let state = JSON.parse(kanbanHistory[kabanHistory.length-1]);
  document.querySelectorAll('.kanban-col').forEach((col,i)=>{
    col.innerHTML = `<h3>${col.querySelector('h3').textContent}</h3>`;
    state[i].forEach(txt=>{
      let div = document.createElement('div');
      div.className = "kanban-task";
      div.textContent = txt;
      col.appendChild(div);
    });
  });
  addNotification("Kanban: Undo performed.");
};
window.saveFinanceState = function() {
  let arr = [];
  document.querySelectorAll('#financeTableBody tr').forEach(tr=>{
    arr.push(tr.cells[1].innerText);
  });
  financeHistory.push(arr.slice());
  if(financeHistory.length>30) financeHistory.shift();
};
window.undoFinance = function() {
  if(financeHistory.length<2) return;
  financeHistory.pop();
  let arr = financeHistory[financeHistory.length-1];
  document.querySelectorAll('#financeTableBody tr').forEach((tr,i)=>{
    tr.cells[1].innerText = arr[i];
  });
  addNotification("Finance: Undo performed.");
};

// ====== Keyboard Shortcuts (Help, Undo, Quick Add) ======
document.addEventListener('keydown', function(e){
  if(e.key==="z" && e.ctrlKey) window.undoKanban();
  if(e.key==="y" && e.ctrlKey) window.undoFinance();
  if(e.key==="?" && !cmdOpen) window.showOnboarding();
  if(e.key==="n" && !cmdOpen) document.getElementById('chatInput').focus();
  if(e.key==="g" && !cmdOpen && e.shiftKey) location.hash="#gds-section-command";
});

// ====== Section Filtering (Demo) ======
window.filterSection = function(section, term) {
  let list = document.querySelector(`#${section} ul`);
  if(!list) return;
  Array.from(list.children).forEach(li=>{
    li.style.display = li.textContent.toLowerCase().includes(term.toLowerCase()) ? "" : "none";
  });
};

// ====== Bulk Actions (Demo for Gallery) ======
window.bulkDeleteGallery = function() {
  let imgs = document.querySelectorAll('.gallery-carousel img.selected');
  imgs.forEach(img => img.remove());
  addNotification(`Deleted ${imgs.length} gallery photo(s).`);
};
// To select images for demo: click to toggle .selected (add that logic in gallery JS)

// ====== Contextual Tooltips ======
document.querySelectorAll('[data-tooltip]').forEach(el=>{
  el.addEventListener('mouseenter', function(){
    let tip = document.createElement('div');
    tip.className = "context-tooltip";
    tip.innerText = el.getAttribute('data-tooltip');
    tip.style.position = "absolute";
    tip.style.background = "#222";
    tip.style.color = "#fff";
    tip.style.padding = "4px 10px";
    tip.style.borderRadius = "5px";
    tip.style.top = (el.getBoundingClientRect().top+window.scrollY+28)+"px";
    tip.style.left = (el.getBoundingClientRect().left+window.scrollX)+"px";
    tip.style.zIndex = 2000;
    tip.id = "tip-"+Math.random();
    document.body.appendChild(tip);
    el._tipId = tip.id;
  });
  el.addEventListener('mouseleave', function(){
    if(el._tipId) {
      let t = document.getElementById(el._tipId);
      if(t) t.remove();
    }
  });
});

// ====== Save last visited section ======
window.addEventListener('hashchange', function(){
  localStorage.setItem('lenawei_section', location.hash);
});

// ====== Example: Add commands for the palette ======
window.commands = [
  { label: "Go to Features & Suggestions", action(){ location.hash="#features-section"; }},
  { label: "Go to Gallery", action(){ location.hash="#gallery-section"; }},
  { label: "Go to Finance Table", action(){ location.hash="#finance-section"; }},
  { label: "Go to Team & Roles", action(){ location.hash="#team-section"; }},
  { label: "Go to Kanban/Task Board", action(){ location.hash="#kanban-section"; }},
  { label: "Go to Calendar", action(){ location.hash="#calendar-section"; }},
  { label: "Go to Chat", action(){ location.hash="#chat-section"; }},
  { label: "Go to Quotes", action(){ location.hash="#quote-section"; }},
  { label: "Go to Resource Library", action(){ location.hash="#resource-section"; }},
  { label: "Open GDS Command Center", action(){ location.hash="#gds-section-command"; }},
  { label: "Switch Theme", action(){ document.getElementById('themeToggle').click(); }},
  { label: "Show Audit Log", action(){ showAuditLog(); }},
  { label: "Show Onboarding Tour", action(){ showOnboarding(); }},
  { label: "Logout", action(){ document.getElementById('logoutBtn').click(); }},
];