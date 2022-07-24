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
			let f = document.querySelector("#changes-warn");
			if (set.isChanged()) f.innerHTML = text("lang_warn","!");
			else f.innerHTML = "";
		},
		set: function(name, value) {
			saving();
			let t = {};
			t[name] = value;
			Object.assign(this.changes,t);
			chrome.storage.sync.set(t,function(){
				set.notif();
				saved();
			});
		}
	}, clickListener = function (element, handler) {
		var newFunc = function (e) {
			e.preventDefault();
			return "function" == typeof handler && handler.apply(this, arguments)
		}
		if (element) ["click", "auxclick"].forEach(e => element.addEventListener(e, newFunc));
		return newFunc
	}, text = function (a,...c)
	{
		let i = 0;
		let translated_text = (localeset[a]||{}).message||chrome.i18n.getMessage(a);
		if (!translated_text.includes("%s") && c.length > 0) translated_text += "%s";
		return translated_text.replace(/%s/g,function(v){
			return c[(i<c.length)?(i++):i]||"";
		})
	}, img = document.querySelector("#stats"), saving = function() {
		img.src = "/icons/background/loading.gif";
	}, saved = function(change, origin) {
		img.src = "/icons/background/done.png";
	}, load = function(key,func) {
		chrome.storage.sync.get([key],function(d){typeof func == "function" && func(d[key])});
	}, loaded_lang = function() {
		document.querySelector("#default").innerHTML = text("default_lang");
		document.querySelector("#language").innerHTML = text("choose_language");
		document.querySelector("#shortcut-toggle").innerHTML = text("shortcut_toggle");
		document.querySelector("#shortcut-toggle-link").innerHTML = text("open_page");
		document.querySelector("#main").innerText=text("settings");
		!document.head.querySelector("title") && document.head.appendChild(document.createElement("title"));
		document.head.querySelector("title").innerText=text("settings")+" - Starblast Enhancements Tools";
		document.querySelector("#changelog_set").innerHTML=text("changelog_set", '<a href="#" id="full-log" title="'+text("changelog_set_desc")+'">\"'+text("fulllog")+'\"</a>');
		document.querySelector("#onlog").options[0].innerText=text("changelog_set_opt_1");
		document.querySelector("#onlog").options[1].innerText=text("changelog_set_opt_2", "changelog.txt");
		document.querySelector("#feedback").innerHTML = text("feedback");
		document.querySelector("#translate").innerHTML = text("translate");
		document.querySelector("#info").innerHTML = text("info");
		document.querySelector("#buymeacoffee").innerHTML = text("donation");
		document.querySelector("#discordsupport").innerHTML = text("discordsupport");
		document.querySelector("#changelog").innerHTML = text("fulllog");
		document.querySelector("#TJ5a91Ygp04VpyQOFWaI-V7t0qD4wFPt6hdqFVcag").removeAttribute("style");
		clickListener(document.querySelector("#full-log"), function(activeTab)
		{
			load('check',function(t){
				t == 1 && window.open('https://starblast.io/changelog.txt', '_blank')
			});
		});
		clickListener(document.querySelector("#shortcut-toggle-link"), function () {
			const userAgent =
	        typeof navigator === "undefined"
	            ? "some useragent"
	            : navigator.userAgent.toLowerCase();
			chrome.tabs.create({url: (userAgent.includes("edg") ? "edge" : "chrome") + "://extensions/shortcuts", active: true})
		});
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
				if (xhr.readyState == 4 && xhr.status == 200) document.querySelector("#version").innerHTML = "Starblast Enhancements Tools -  SET (v"+JSON.parse(xhr.responseText).version+")";
		}
		xhr.open("GET", chrome.runtime.getURL("manifest.json"));
		xhr.send();
		saved();
	}
	// In case of old browser versions which don't have the remove() function
	Element.prototype.remove = function() {
	    this.parentElement.removeChild(this);
	}
	NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	    for(var i = this.length - 1; i >= 0; i--) {
	        if(this[i] && this[i].parentElement) {
	            this[i].parentElement.removeChild(this[i]);
	        }
	    }
	}
	saving();
	document.querySelector("#onlog").addEventListener("change", function(){set.set('check',Math.trunc(Math.max(Math.min(Number(document.getElementById('onlog').options.selectedIndex)||0,1),0)))});
	chrome.storage.sync.get(['locale','check'],function(key) {
		set.sync('check', Math.trunc(Math.min(Math.max(key.check || 0,0),1)));
		document.getElementById('onlog').options.selectedIndex= set.original.check;
		var xhr = new XMLHttpRequest();
		xhr.open('GET',"/_locales/_locales.json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				let e = document.querySelector("#lang-choose"), l_data = JSON.parse(xhr.responseText).sort((a,b)=>a.name<b.name?-1:1);
				e.innerHTML='<option id="default"></option>'+l_data.map(i => `<option id="${i.lang}">${i.name} - ${i.native}</option>`).join("");
				let u = l_data.filter(i=> i.lang == key.locale), l;
				if (u.length < 1) {
					set.sync('locale', 'default');
					l = 0;
				}
				else {
					set.sync('locale', key.locale);
					l = l_data.indexOf(u[0]) + 1;
				}
				e.options.selectedIndex = l;
				if (set.original.locale != "default") {
					var lhr = new XMLHttpRequest();
					lhr.open('GET',"/_locales/"+set.original.locale+"/messages.json");
					lhr.onreadystatechange = function() {
						if (lhr.readyState == 4 && lhr.status == 200) localeset = JSON.parse(lhr.responseText);
						loaded_lang();
					}
					lhr.onerror = loaded_lang;
					lhr.send(null);
				}
				else loaded_lang();
				e.addEventListener("change",function(){
					let choose = Math.trunc(Math.min(Math.max(Number(e.options.selectedIndex)||0,0),l_data.length));
					set.set('locale',(l_data[choose-1]||{}).lang || "default");
					e.options.selectedIndex = choose;
				});
			}
		};
		xhr.onerror = loaded_lang;
		xhr.send(null);
	});
})();
