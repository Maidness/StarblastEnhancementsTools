(function(){
	var localeset = {}, set = {
		sync: function(name, value) {
			let t = {};
			t[name] = value;
			Object.assign(this.original,t);
			Object.assign(this.changes,t);
			chrome.storage.sync.set(t,null);
		},
		original:{},
		changes:{},
		isChanged:function(){
			for (let i in this.original) {
				if (this.original[i] != this.changes[i]) return !0;
			}
			return !1;
		},
		notif: function() {
			let f = document.querySelector("#lang-warn");
			if (set.isChanged()) f.innerHTML = "&nbsp;"+text("lang_warn","!");
			else f.innerHTML = "";
		},
		set: function(name, value) {
			saving();
			let t = {};
			t[name] = value;
			this.changes[name] = value;
			chrome.storage.sync.set(t,function(){
				set.notif();
				saved();
			});
		}
	}, text = function (a,b,...c)
	{
		let i = 0;
		return ((localeset[a]||{}).message||chrome.i18n.getMessage(a)).replace(/%s/g,function(v){
			return c[(i<c.length)?(i++):i]||"";
		})+(b||"");
	}, img = document.querySelector("img"), saving = function() {
		img.src = "/icons/background/loading.gif";
	}, saved = function(change, origin) {
		img.src = "/icons/background/done.png";
	}, load = function(key,func) {
		chrome.storage.sync.get([key],function(d){typeof func == "function" && func(d[key])});
	};
	document.querySelector("#onlog").addEventListener("change", function(){set.set('check',Math.trunc(Math.max(Math.min(Number(document.getElementById('onlog').options.selectedIndex)||0,1),0)))});
	chrome.storage.sync.get(['locale','check'],function(key) {
		set.sync('check', Math.trunc(Math.min(Math.max(key.check || 0,0),1)));
		document.getElementById('onlog').options.selectedIndex= set.original.check;
		var xhr = new XMLHttpRequest();
		xhr.open('GET',"/_locales/_locales.json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				let e = document.querySelector("#lang-choose"), l_data = JSON.parse(xhr.responseText);
				e.innerHTML='<option id="default"></option>'+l_data.map(i => `<option id="${i.lang}">(${i.lang.replace(/_/g,"-")}) ${i.name} - ${i.native}</option>`).join("");
				let u = l_data.filter(i=> i.lang == key.locale), l;
				if (u.length < 1) {
					set.sync('locale', 'default');
					l = 0;
				}
				else {
					set.sync('locale', key.locale);
					l = l_data.indexOf(u[0]);
				}
				e.options.selectedIndex = l+1;
				var t = document.querySelector("#default"), loaded_lang = function() {
					t.innerHTML = text("default_lang");
					document.querySelector("#language").innerHTML = text("choose_language",":");
					document.querySelector("#main").innerText=text("settings");
					!document.head.querySelector("title") && document.head.appendChild(document.createElement("title"));
					document.head.querySelector("title").innerText=text("settings")+" - Starblast Enhancements Tools";
					document.querySelector("#changelog_set").innerHTML=text("changelog_set",'<a href="#" id="full-log" title="'+text("changelog_set_desc")+'">\"'+text("fulllog")+'\"</a>:&nbsp');
					document.querySelector("#onlog").options[0].innerText=text("changelog_set_opt_1");
					document.querySelector("#onlog").options[1].innerText=text("changelog_set_opt_2","changelog.txt");
					document.querySelector("#full-log").addEventListener('click',function(activeTab)
					{
					  load('check',function(t){
							t == 1 && window.open('https://starblast.io/changelog.txt', '_blank')
						});
					});
					saved();
				}
				if (set.original.locale != 0) {
					var lhr = new XMLHttpRequest();
					lhr.open('GET',"/_locales/"+set.original.locale+"/messages.json");
					lhr.onreadystatechange = function() {
						if (lhr.readyState == 4 && lhr.status == 200) localeset = JSON.parse(lhr.responseText);
						loaded_lang();
					}
					lhr.send(null);
				}
				else loaded_lang();
				e.addEventListener("change",function(){
					set.set('locale',(l_data[Math.trunc(Math.min(Math.max(Number(e.options.selectedIndex)||0,0),l_data.length))-1]||{}).lang || "default");
				});
			}
		};
		xhr.send(null);
	});
})();
