(function(){
	var tcn = document.querySelector("#yNA2uO7zWlVmJtHssWVn-M9iPIPUa7yh3KnkZ1SCc");
	String.prototype.replaceChar =function(i,a)
	{
		return this.substring(0,i)+a+this.substring(i+1,this.length);
	}
	String.prototype.removeChar = function(i)
	{
		return this.substring(0,i)+this.substring(i+1,this.length);
	}
	var localeset = {};
	function text(a,b,...c)
	{
		let i = 0;
		return ((localeset[a]||{}).message||chrome.i18n.getMessage(a)).replace(/%s/g,function(v){
			return c[(i<c.length)?(i++):i]||"";
		})+(b||"");
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
	function setChild(a,b)
	{
		if (b) document.getElementById(a).remove();
	}
	function setDisplay(id,...params)
	{
		var xhr = new XMLHttpRequest();
		xhr.open('GET', chrome.runtime.getURL("/html/popup/"+id+".html"), true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4)  {
				let x = ["buttons","infos"];
				(document.querySelector("#"+x[x.indexOf(id)])||tcn).innerHTML = xhr.responseText;
				typeof deco[id] == "function" && deco[id](...params);
			}
		};
		xhr.send(null);
	}
	var deco = {
		infos: function() {
			document.querySelector("#log").addEventListener("click", function() {
				chrome.tabs.create({url: chrome.runtime.getURL("/html/Changelog/Changelog.html")});
			});
			let tb = document.querySelector("#translate-contributors");
			tb.addEventListener("click", function() {
				chrome.tabs.create({url: "https://github.com/Bhpsngum/StarblastEnhancementsTools/blob/master/README.md#translators"});
			});
			tb.innerHTML = text("translators_message",null,text("translators")||"various contributors");
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
					if (xhr.readyState == 4 && xhr.status == 200) document.querySelector("#log").innerHTML = "v"+xhr.responseText.split("\n")[0].split("/")[0];
			}
		  xhr.open("GET", chrome.runtime.getURL("Changelog.txt"));
			xhr.send();
		},
		buttons: function() {
			document.querySelector("#feedback").addEventListener('click', function(activeTab) {
			  chrome.tabs.create({url: "https://bhpsngum.github.io/redirect?id=SETFeedback"});
			});
			document.querySelector("#translate").addEventListener('click', function(activeTab) {
			  chrome.tabs.create({url: "https://bhpsngum.github.io/redirect?id=SET_Translate"});
			});
			document.querySelector("#info").addEventListener('click', function(activeTab) {
			  chrome.tabs.create({url: "https://github.com/bhpsngum/StarblastEnhancementsTools/blob/master/README.md"});
			});
			document.querySelector("#options").setAttribute("title",text("settings"));
			document.querySelector("#feedback").setAttribute("title",text("feedback"));
			document.querySelector("#translate").setAttribute("title",text("translate"));
			document.querySelector("#info").setAttribute("title",text("info"));
			document.getElementById('options').addEventListener('click', function() {
			  if (chrome.runtime.openOptionsPage) {
			    chrome.runtime.openOptionsPage();
			  } else {
			    chrome.tabs.create({url: chrome.runtime.getURL('/html/options/options.html')});
			  }
			});
		},
		tools: function(ModeName) {
			var authors = {
				Modding: {
					name:["Bhpsngum","Bhpsngum"],
					function:["map","modsarchive"],
					toolname:["Map Editor","Mods Archive"],
					title:["Starblast Map Editor","Starblast Mods Archive"],
					link:["https://bhpsngum.github.io/starblast/mapeditor/","https://bhpsngum.github.io/starblast/mods/"],
					author:["https://github.com/Bhpsngum","https://github.com/Bhpsngum"]
				},
				"Ship Editor": {
					name:["Bhpsngum"],
					function:["sscv"],
					toolname:["S.S.C.V"],
					title:["Starblast Mod Export Code Converters"],
					link:["https://bhpsngum.github.io/starblast/sscv/"],
					author:["https://github.com/Bhpsngum"],
				}
			}
			let authorlist = authors[ModeName];
			document.getElementsByTagName("h3")[0].innerText=text("currentmode",": "+ModeName);
			for (var i=0;i<authorlist.name.length;i++) {
				document.querySelector("#toolboxes").innerHTML+=`<div id="${authorlist.function[i]}-box" class="toolbox"></div>`;
				document.querySelector("#"+authorlist.function[i]+"-box").innerHTML+='<button class="mode-btn" id="'+authorlist.function[i]+'"><a title="'+authorlist.title[i]+'">'+authorlist.toolname[i]+'</a></button><h5>'+text("by",null,'<a id="author'+(i+1).toString()+'" href="#">'+authorlist.name[i]+'</a>')+'</h5>';
			}
			tcn.innerHTML+='<h5 style="margin-bottom:10px;margin-top:10px">'+text("reload").replace(/<([^>]+)>/,"<a id='reload' href='#'><br>$1</a>")+'</h5><h5>'+text("contrib_msg").replace(/<([^>]+)>/,"<a href='#' id='contrib'>$1</a>")+'</h5>';
			for (var i=0;i<authorlist.name.length;i++)
			{
				let link=authorlist.link[i],author=authorlist.author[i];
				document.getElementById(authorlist.function[i]).addEventListener("click", function() {
					chrome.tabs.create({url: link});
				});
				document.querySelector("#author"+(i+1).toString()).addEventListener("click", function(activeTab) {
					chrome.tabs.create({url: author});
				});
			}
			document.querySelector("#contrib").addEventListener('click',function(activeTab)
			{
				chrome.tabs.create({url: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bhpsngumtrongwikipediatiengvie@gmail.com&su=New+Tools+Ideas+and+Contribution&tf=1'});
			});
			document.querySelector("#reload").addEventListener("click", function() {
				chrome.tabs.executeScript({code:'window.location.reload(true);'});
			});
		},
		none: function() {
			document.getElementsByTagName("h3")[0].innerText=text("changelog_h3","...");
			document.getElementsByTagName("h4")[0].innerText=text("changelog_h4","! :)");
		},
		game: function(mode) {
			document.querySelector("#full-log").innerText=text("fulllog");
			document.querySelector("#inner-options").innerText=text("insettings");
			document.querySelector("#latest_log").innerText=text("latest_log");
			document.querySelector("#uplog").innerHTML=localStorage.text|| ("<p style='text-align:center'>"+text("wait","...")+"</p>");
			document.getElementsByTagName("h4")[0].innerHTML=text("main_h3","...")+'<br>'+text("changelog_h4","! :)");
			var t,s;
			switch (mode) {
				case "mobile":
					t = !0;
					s = !0;
					break;
				case "standalone":
					t = !0;
					s = !1;
					document.querySelector("#inner-options").remove();
					break;
				default:
					t = !1;
					s = !0;
			}
			document.querySelector("#full-log").addEventListener('click',function() {
				if (!t) chrome.storage.sync.get(['check'],function(x){
					if (x.check == 1) chrome.tabs.create({url: 'https://starblast.io/changelog.txt'});
					else chrome.tabs.executeScript({code:'document.getElementsByClassName("full-changelog")[0].click();'});
				});
				else chrome.tabs.executeScript({code:'document.getElementsByClassName("full-changelog")[0].click();'});
			});
			s && document.querySelector("#inner-options").addEventListener("click", function() {
				chrome.tabs.executeScript({code: 'document.getElementsByClassName("sbg sbg-gears")[0].click();'});
			});
			var xhr = new XMLHttpRequest(), uplog = document.querySelector("#uplog");
			uplog.innerHTML = "<p style='text-align:center'>"+text("wait")+"...</p>"
			xhr.open('GET', 'https://starblast.io/changelog.txt', true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4)  {
					var text=xhr.responseText;
					var hey=text.match(/\n\d{4}[-]\d{2}[-]\d{2}/);
					text=text.substring(0,text.indexOf(hey)+1);
			    text=text.replace(/(\d{4}[-]\d{2}[-]\d{2})/g,'<h3 style="text-align:left;padding-top:10px">$1</h3>');
			    text=text.replace(/[*].+/g,function(v) {
			      v=v.removeChar(0);
			      v=v.replaceChar(v.indexOf(" ")+1,v[v.indexOf(" ")+1].toUpperCase());
			      return "<ul><li>"+v+"</li></ul>";
			    });
			    text=text.replace(/[\n]\s*[-]\s.+/g,function(v) {
			      v=v.replace(/([\n])\s*[-]\s/g,"$1&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp- ");
			      return v.replaceChar(v.indexOf("- ")+2,v[v.indexOf("- ")+2].toUpperCase());
			    });
			    text=text.replace(/([\n])\s*([+]\s.+)/g,"$1&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp$2");
			    localStorage.setItem("text",text.replace(/[\n]+/g,'<p>'));
			    uplog.innerHTML=localStorage.text;
				}
			};
			xhr.send(null);
		},
		noECP: function() {
			document.querySelector("#backtogame").addEventListener("click", function() {
				chrome.tabs.executeScript({code:'window.open("https://starblast.io/","_self");'});
			})
		}
	}
	chrome.tabs.executeScript({code: "chrome.storage.sync.set({key:localStorage.ECPVerified||'no'},null);"});
	var key;
	var handleUI = function() {
		chrome.storage.sync.get(['key'],function(res){
			key = res.key || "no";
			chrome.tabs.getSelected(null, function(tab) {
				var link=tab.url;
				var host=link.replace(/.+\:\/\/([^/]+).+/g,"$1");
				var pathname=link.replace(/.+\:\/\/[^/]+(.+)/g,"$1").replace(/([^#?]+).*/g,"$1");
				setDisplay("buttons");
				setDisplay("infos");
				switch (host)
				{
					case "starblast.io":
					{
						switch (pathname)
						{
							case "/shipeditor/":
								if (key=="yes") setDisplay("tools","Ship Editor");
								else setDisplay("noECP");
								break;
							case "/modding.html":
								if (key=="yes") setDisplay("tools","Modding");
								else setDisplay("noECP");
								break;
							case "/":
								setDisplay("game");
								break;
							case "/mobile.html":
								setDisplay("game","mobile");
								break;
							default:
								setDisplay("none");
						}
						break;
					}
					case "pleshkov.dev":
					{
						switch (pathname)
						{
							case "/starblast/":
							case "/archives/starblast/standalone.html":
								setDisplay("game","standalone");
								break;
							default:
								setDisplay("none");
						}
						break;
					}
					case "starblast.data.neuronality.com":
					case "bhpsngum.github.io":
					case "starblast-shipyard.github.io":
					case "starblastio.gamepedia.com":
						setDisplay("none");
						break;
				}
			});
		});
	}
	var loadUI = function() {
		document.querySelector("#wait").innerText = text("wait","...");
		setTimeout(handleUI,500);
	}
	chrome.storage.sync.get(['locale'],function(key) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET',"/_locales/"+(key.locale || "default")+"/messages.json");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) localeset = JSON.parse(xhr.responseText);
			loadUI();
		}
		xhr.onerror = loadUI;
		xhr.send(null);
	});
})();
