String.prototype.replaceChar =function(i,a)
{
	return this.substring(0,i)+a+this.substring(i+1,this.length);
}
String.prototype.removeChar = function(i)
{
	return this.substring(0,i)+this.substring(i+1,this.length);
}
document.getElementById("feedback").addEventListener('click', function(activeTab) {
  chrome.tabs.create({url: "https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bhpsngumtrongwikipediatiengvie@gmail.com&su=Bug+Issues+and+Feedback&tf=1"});
});
document.getElementById("translate").addEventListener('click', function(activeTab) {
  chrome.tabs.create({url: "https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bhpsngumtrongwikipediatiengvie@gmail.com&su=Translation+help+(lang:"+navigator.language+")&tf=1"});
});
document.getElementById("options").setAttribute("title",text("settings"));
document.getElementById("feedback").setAttribute("title",text("feedback"));
document.getElementById("translate").setAttribute("title",text("translate"));
document.getElementById('options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    chrome.tabs.create({url: chrome.runtime.getURL('/html/options/options.html')});
  }
});
function text(a,b)
{
	return chrome.i18n.getMessage(a)+(b||"");
}
function bgd_tools(a,b,c)
{
	document.getElementsByTagName("h3")[0].innerText=text("currentmode",": "+a);
	for (var i=0;i<c.name.length;i++) document.getElementById("tools").innerHTML+='<button class="mode-btn" id="'+c.function[i]+'"><a title="'+c.title[i]+'">'+c.toolname[i]+'</a></button><h5>'+text("by").replace(/<author>/,'<a id="author'+(i+1).toString()+'" href="#">'+c.name[i]+'</a></h5>');
	document.getElementById("tools").innerHTML+='<h5 style="margin-bottom:10px;margin-top:10px">'+text("reload").replace(/<([^>]+)>/,"<a id='reload' href='#'><br>$1</a>")+'</h5><h5>'+text("contrib_msg").replace(/<([^>]+)>/,"<a href='#' id='contrib'>$1</a>")+'</h5>';
	for (var i=0;i<c.name.length;i++)
	{
		var url1=chrome.runtime.getURL('/html/tools/'+b+'/'+c.filepath[i]+'/'+c.filepath[i]+'.html');
		var lnk=c.link[i];
		document.getElementById(c.function[i]).addEventListener("click", function() {
			chrome.tabs.create({url: url1});
		});
		document.getElementById("author"+(i+1).toString()).addEventListener("click", function(activeTab) {
			chrome.tabs.create({url: lnk});
		});
	}
	document.getElementById("contrib").addEventListener('click',function(activeTab)
	{
		chrome.tabs.create({url: 'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bhpsngumtrongwikipediatiengvie@gmail.com&su=New+Tools+Ideas+and+Contribution&tf=1'});
	});
	document.getElementById("reload").addEventListener("click", function() {
		chrome.tabs.executeScript({code:'window.location.reload(true);'});
	});
}
function bgd_shipeditor()
{
	var authors=
	{
		name:["GatoCreador887"],
		function:["convert"],
		toolname:["StarblastConverter"],
		filepath:["StarblastConverter"],
		title:["Starblast Modexport code to Ship Editor code"],
		link:["https://github.com/GatoCreador887"]
	}
	bgd_tools("Ship Editor","ShipEditorTools",authors);
}
function bgd_modding()
{
	var authors=
	{
		name:["GatoCreador887"],
		function:["map"],
		toolname:["Map Creator"],
		filepath:["MapCreator"],
		title:["Starblast Custom Map Editor"],
		link:["https://github.com/GatoCreador887"]
	}
	bgd_tools("Modding","moddingtools",authors);
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
  document.getElementById("full-log").addEventListener('click',function(activeTab)
  {
    if (localStorage.check==1) chrome.tabs.create({url: 'https://starblast.io/changelog.txt'});
    else chrome.tabs.executeScript({code:'document.getElementsByClassName("full-changelog")[0].click();'});
  });
  document.getElementById("inner-options").addEventListener("click", function() {
    chrome.tabs.executeScript({code: 'document.getElementsByClassName("sbg sbg-gears")[0].click();'});
  })
}
function bgd_main()
{
	document.getElementById("full-log").innerText=text("fulllog");
	document.getElementById("inner-options").innerText=text("insettings");
	document.getElementById("latest_log").innerText=text("latest_log");
	document.getElementById("uplog").innerHTML=localStorage.text|| ("<p style='text-align:center'>"+text("wait","...")+"</p>");
	document.getElementsByTagName("h4")[0].innerHTML=text("main_h3","...")+'<br>'+text("changelog_h4","! :)");
}
function bgd_mobile()
{
	bgd_main();
  document.getElementById("full-log").addEventListener('click',function(activeTab)
  {
    chrome.tabs.create({url: 'https://starblast.io/changelog.txt'});
  });
  document.getElementById("inner-options").addEventListener("click", function() {
    chrome.tabs.executeScript({code: 'document.getElementsByClassName("sbg sbg-gears")[0].click();'});
  })
}
function bgd_noECP()
{
	document.getElementById("backtogame").addEventListener("click", function() {
		chrome.tabs.executeScript({code:'window.open("https://starblast.io/","_self");'});
	})
}
function bgd_standalone()
{
	bgd_main();
	document.getElementById("inner-options").remove();
  document.getElementById("full-log").addEventListener('click',function(activeTab)
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
		case "dankdmitron.github.io":
			setDisplay(1,1,0);
			bgd_standalone();
			break;
		case "starblast.data.neuronality.com":
			setDisplay(1,0,1);
			bgd_nothing();
			break;
	}
});
document.getElementById("log").addEventListener("click", function() {
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
    if (document.getElementById("uplog")) document.getElementById("uplog").innerHTML=localStorage.text||"<p style='text-align:center'>Waiting...</p>";
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
	if (fileData) document.getElementById("log").innerText=fileData.match(/v\d\.\d\.\d/g)[0];
}
doGET(chrome.runtime.getURL("Changelog.txt"),handleFileData);
