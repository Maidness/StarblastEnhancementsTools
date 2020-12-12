String.prototype.replaceChar =function(i,a)
{
	return this.substring(0,i)+a+this.substring(i+1,this.length);
}
String.prototype.removeChar = function(i)
{
	return this.substring(0,i)+this.substring(i+1,this.length);
}
document.querySelector("#feedback").addEventListener('click', function(activeTab) {
  chrome.tabs.create({url: "https://docs.google.com/forms/d/e/1FAIpQLSf9CpBf3y2-xB3IdhktvYOWgUJB_cgUuaFPUH3UxonHs64pyQ/viewform?usp=sf_link"});
});
document.querySelector("#translate").addEventListener('click', function(activeTab) {
  chrome.tabs.create({url: "https://docs.google.com/spreadsheets/d/1IZlrb7kOPK04CqrbIQctfAPoz9qZRkkZzFqj5nIGTaU/edit#gid=0"});
});
document.querySelector("#options").setAttribute("title",text("settings"));
document.querySelector("#feedback").setAttribute("title",text("feedback"));
document.querySelector("#translate").setAttribute("title",text("translate"));
document.getElementById('options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    chrome.tabs.create({url: chrome.runtime.getURL('/html/options/options.html')});
  }
});
function text(a,b,...c)
{
	let i = 0;
	return chrome.i18n.getMessage(a).replace(/%s/g,function(v){
		return c[(i<c.length)?(i++):i]||"";
	})+(b||"");
}
function bgd_tools(ModeName, authorlist)
{
	document.getElementsByTagName("h3")[0].innerText=text("currentmode",": "+ModeName);
	for (var i=0;i<authorlist.name.length;i++) document.querySelector("#tools").innerHTML+='<button class="mode-btn" id="'+authorlist.function[i]+'"><a title="'+authorlist.title[i]+'">'+authorlist.toolname[i]+'</a></button><h5>'+text("by",null,'<a id="author'+(i+1).toString()+'" href="#">'+authorlist.name[i]+'</a></h5>');
	document.querySelector("#tools").innerHTML+='<h5 style="margin-bottom:10px;margin-top:10px">'+text("reload").replace(/<([^>]+)>/,"<a id='reload' href='#'><br>$1</a>")+'</h5><h5>'+text("contrib_msg").replace(/<([^>]+)>/,"<a href='#' id='contrib'>$1</a>")+'</h5>';
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
}
function bgd_shipeditor()
{
	var authors=
	{
		name:[],
		function:[],
		toolname:[],
		title:[],
		link:[],
		author:[],
	}
	bgd_tools("Ship Editor",authors);
}
function bgd_modding()
{
	var authors=
	{
		name:["Bhpsngum"],
		function:["map"],
		toolname:["Map Editor"],
		title:["Starblast Map Editor"],
		link:["https://bhpsngum.github.io/starblast/mapeditor/"],
		author:["https://github.com/Bhpsngum"]
	}
	bgd_tools("Modding", authors);
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
function setDisplay(t,c,n)
{
	if (localStorage.ECPVerified=="yes")
	{
		setChild("tools",t);
		setChild("noECP",1);
	}
	else
	{
		setChild("tools",1);
		setChild("noECP", !(c && n));
	}
  setChild("changelog",c);
  setChild("none",n);
}
function bgd_none()
{
	bgd_main();
  document.querySelector("#full-log").addEventListener('click',function(activeTab)
  {
    if (localStorage.check==1) chrome.tabs.create({url: 'https://starblast.io/changelog.txt'});
    else chrome.tabs.executeScript({code:'document.getElementsByClassName("full-changelog")[0].click();'});
  });
  document.querySelector("#inner-options").addEventListener("click", function() {
    chrome.tabs.executeScript({code: 'document.getElementsByClassName("sbg sbg-gears")[0].click();'});
  })
}
function bgd_main()
{
	document.querySelector("#full-log").innerText=text("fulllog");
	document.querySelector("#inner-options").innerText=text("insettings");
	document.querySelector("#latest_log").innerText=text("latest_log");
	document.querySelector("#uplog").innerHTML=localStorage.text|| ("<p style='text-align:center'>"+text("wait","...")+"</p>");
	document.getElementsByTagName("h4")[0].innerHTML=text("main_h3","...")+'<br>'+text("changelog_h4","! :)");
}
function bgd_mobile()
{
	bgd_main();
  document.querySelector("#full-log").addEventListener('click',function(activeTab)
  {
    chrome.tabs.create({url: 'https://starblast.io/changelog.txt'});
  });
  document.querySelector("#inner-options").addEventListener("click", function() {
    chrome.tabs.executeScript({code: 'document.getElementsByClassName("sbg sbg-gears")[0].click();'});
  })
}
function bgd_noECP()
{
	document.querySelector("#backtogame").addEventListener("click", function() {
		chrome.tabs.executeScript({code:'window.open("https://starblast.io/","_self");'});
	})
}
function bgd_standalone()
{
	bgd_main();
	document.querySelector("#inner-options").remove();
  document.querySelector("#full-log").addEventListener('click',function(activeTab)
  {
    chrome.tabs.create({url: 'https://starblast.io/changelog.txt'});
  });
}
chrome.tabs.executeScript({code: "chrome.storage.sync.set({key: localStorage.ECPVerified||'no'},null);"});
chrome.storage.sync.get(['key'], function(result) {
	localStorage.setItem("ECPVerified",result.key);
});
function bgd_nothing()
{
	document.getElementsByTagName("h3")[0].innerText=text("changelog_h3","...");
	document.getElementsByTagName("h4")[0].innerText=text("changelog_h4","! :)");
}
chrome.tabs.getSelected(null, function(tab) {
  var link=tab.url;
	var host=link.replace(/.+\:\/\/([^/]+).+/g,"$1");
	var pathname=link.replace(/.+\:\/\/[^/]+(.+)/g,"$1").replace(/([^#?]+).*/g,"$1");
	switch (host)
	{
		case "starblast.io":
		{
			switch (pathname)
			{
				case "/shipeditor/":
					setDisplay(0,1,1);
        	if (localStorage.ECPVerified=="yes") bgd_shipeditor();
					else bgd_noECP();
					break;
				case "/modding.html":
					setDisplay(0,1,1);
					if (localStorage.ECPVerified=="yes") bgd_modding();
					else bgd_noECP();
					break;
				case "/":
					setDisplay(1,1,0);
					bgd_none();
					break;
				case "/mobile.html":
					setDisplay(1,1,0);
					bgd_mobile();
					break;
				default:
					setDisplay(1,0,1);
					bgd_nothing();
			}
			break;
		}
		case "pleshkov.dev":
		{
			switch (pathname)
			{
				case "/starblast/":
				case "/archives/starblast/standalone.html":
					setDisplay(1,1,0);
					bgd_standalone();
					break;
				default:
					setDisplay(1,0,1);
					bgd_nothing();
			}
			break;
		}
		case "starblast.data.neuronality.com":
			setDisplay(1,0,1);
			bgd_nothing();
			break;
	}
});
document.querySelector("#log").addEventListener("click", function() {
	chrome.tabs.create({url: chrome.runtime.getURL("/html/Changelog/Changelog.html")});
});
var xhr = new XMLHttpRequest();
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
    if (document.querySelector("#uplog")) document.querySelector("#uplog").innerHTML=localStorage.text||"<p style='text-align:center'>Waiting...</p>";
	}
};
xhr.send(null);
function doGET(path, callback) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
					// The request is done; did it work?
					if (xhr.status == 200) {
							// ***Yes, use `xhr.responseText` here***
							callback(xhr.responseText);
					} else {
							// ***No, tell the callback the call failed***
							callback(null);
					}
			}
	}
  xhr.open("GET", path);
	xhr.send();
}

function handleFileData(fileData) {
	fileData.replace(/\d+\.\d+\.\d+/, function(version) {
		document.querySelector("#log").innerText = "v" + version;
	});
}
doGET(chrome.runtime.getURL("Changelog.txt"),handleFileData);
