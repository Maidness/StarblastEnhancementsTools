function text(a,b)
{
	return chrome.i18n.getMessage(a)+(b||"");
}
function saveOptions(e) {
  e.preventDefault();
  localStorage.setItem("check", document.getElementById('onlog').options.selectedIndex);
}
function restoreOptions() {
  document.getElementById('onlog').options.selectedIndex=localStorage.check || 0;
}
document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("main").innerText=text("settings");
let title=document.createElement("title");
title.innerText=text("settings")+" - Starblast Enhancements Tools";
document.head.appendChild(title);
document.getElementById("changelog_set").innerHTML=text("changelog_set").replace(/<[^>]+>/,'<a href="#" id="full-log title="'+text("changelog_set_desc")+'">\"'+text("fulllog")+'\"</a>:&nbsp');
document.getElementById("onlog").options[0].innerText=text("changelog_set_opt_1");
document.getElementById("onlog").options[1].innerText=text("changelog_set_opt_2").replace(/<[^>]+>/,"Changelog.txt");
document.getElementById("full-log").addEventListener('click',function(activeTab)
{
  if (localStorage.check==1) window.open('https://starblast.io/changelog.txt', '_blank');
});
document.getElementById("onlog").addEventListener("change", saveOptions);
