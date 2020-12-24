(function(){
	function text(a,b,...c)
	{
		let i = 0;
		return chrome.i18n.getMessage(a).replace(/%s/g,function(v){
			return c[(i<c.length)?(i++):i]||"";
		})+(b||"");
	}
	function saveOptions(e) {
	  e.preventDefault();
		saving();
	  chrome.storage.sync.set({check: document.getElementById('onlog').options.selectedIndex},saved);
	}
	function restoreOptions() {
		load("check",function(t){
			document.getElementById('onlog').options.selectedIndex=t || 0;
		});
	}
	var img = document.querySelector("img"), saving = function() {
		img.src = "/icons/background/loading.gif";
	}, saved = function() {
		img.src = "/icons/background/done.png";
	}, load = function(key,func) {
		chrome.storage.sync.get([key],function(d){typeof func == "function" && func(d[key])});
	};
	document.addEventListener("DOMContentLoaded", restoreOptions);
	document.querySelector("#main").innerText=text("settings");
	let title=document.createElement("title");
	title.innerText=text("settings")+" - Starblast Enhancements Tools";
	document.head.appendChild(title);
	document.querySelector("#changelog_set").innerHTML=text("changelog_set",'<a href="#" id="full-log" title="'+text("changelog_set_desc")+'">\"'+text("fulllog")+'\"</a>:&nbsp');
	document.querySelector("#onlog").options[0].innerText=text("changelog_set_opt_1");
	document.querySelector("#onlog").options[1].innerText=text("changelog_set_opt_2","changelog.txt");
	document.querySelector("#full-log").addEventListener('click',function(activeTab)
	{
	  load('check',function(t){
			t == 1 && window.open('https://starblast.io/changelog.txt', '_blank')
		});
	});
	document.querySelector("#onlog").addEventListener("change", saveOptions);
})();
