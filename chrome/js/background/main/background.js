String.prototype.replaceChar =function(i,a)
{
	return this.substring(0,i)+a+this.substring(i+1,this.length);
}
String.prototype.removeChar = function(i)
{
	return this.substring(0,i)+this.substring(i+1,this.length);
}
chrome.runtime.onInstalled.addListener(function() {
  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlPrefix: "https://starblast.io" }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlEquals: "https://dankdmitron.github.io/" }
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ]);
  });
});
document.getElementById("feedback").addEventListener('click', function(activeTab) {
  chrome.tabs.create({url: "https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bhpsngumtrongwikipediatiengvie@gmail.com&su=Bug+Issues+and+Feedback&tf=1"});
});
document.getElementById('options').addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('/html/options/options.html'));
  }
});
function bgd_shipeditor()
{
  document.getElementById("reload").addEventListener('click',function(activeTab)
  {
    chrome.tabs.executeScript({code: 'window.location.reload(true);'});
  });
  contrib("contrib-shipeditor");
	document.getElementById("converter").addEventListener("click", function() {
    window.open(chrome.runtime.getURL('/html/tools/ShipEditorTools/StarblastConverter/StarblastConverter.html'));
  })
  document.getElementById("author").addEventListener("click", function() {
    window.open("https://github.com/GatoCreador887/","_blank");
  })
}
function contrib(s)
{
  document.getElementById(s).addEventListener('click',function(activeTab)
  {
    window.open('https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bhpsngumtrongwikipediatiengvie@gmail.com&su=New+Tools+Ideas+and+Contribution&tf=1', '_blank');
  });
}
function bgd_modding()
{
  contrib("contrib-modding");
  document.getElementById("map").addEventListener("click", function() {
    window.open(chrome.runtime.getURL('/html/tools/moddingtools/MapCreator/mapcreator.html'));
  })
  document.getElementById("author1").addEventListener("click", function() {
    window.open("https://github.com/GatoCreador887/","_blank");
  })
}
function setDisplay(s,m,c,n)
{
  document.getElementById("shipeditor").setAttribute("style","display:"+s);
  document.getElementById("modding").setAttribute("style","display:"+m);
  document.getElementById("changelog").setAttribute("style","display:"+c);
  document.getElementById("none").setAttribute("style","display:"+n);
}
function bgd_none()
{
  document.getElementById("uplog").innerHTML=localStorage.text||"<p style='text-align:center'>Waiting...</p>";
  document.getElementById("full-log").addEventListener('click',function(activeTab)
  {
    if (localStorage.check==1) window.open('https://starblast.io/changelog.txt', '_blank');
    else chrome.tabs.executeScript({code:'document.getElementsByClassName("full-changelog")[0].click();'});
  });
  document.getElementById("inner-options").setAttribute("style","text-align:center;margin-bottom:10px;");
  document.getElementById("inner-options").addEventListener("click", function() {
    chrome.tabs.executeScript({code: 'document.getElementsByClassName("sbg sbg-gears")[0].click();'});
  })
}
function bgd_standalone()
{
  document.getElementById("uplog").innerHTML=localStorage.text||"<p style='text-align:center'>Waiting...</p>";
  document.getElementById("full-log").addEventListener('click',function(activeTab)
  {
    window.open('https://starblast.io/changelog.txt', '_blank');
  });
}
chrome.tabs.getSelected(null, function(tab) {
  var link=tab.url;
  switch(link)
  {
		case "https://starblast.io/shipeditor/#":
    case "https://starblast.io/shipeditor/":
      setDisplay("inline-block","none","none","none");
      bgd_shipeditor();
      break;
    case "https://starblast.io/modding.html":
      setDisplay("none","inline-block","none","none");
      bgd_modding();
      break;
    case "https://starblast.io/changelog.txt":
      setDisplay("none","none","inline-block","none");
      break;
    case "https://dankdmitron.github.io/":
      setDisplay("none","none","none","inline-block");
      bgd_standalone();
      break;
    default:
			if (link.indexOf("https://starblast.io/changelog.txt#")==0) setDisplay("none","none","inline-block","none");
			else
			{
				setDisplay("none","none","none","inline-block");
      	bgd_none();
			}
  }
});
document.getElementById("log").addEventListener("click", function() {
	window.open(chrome.runtime.getURL("/html/Changelog/Changelog.html"));
})
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
    chrome.tabs.getSelected(null, function(tab) {
      var link=tab.url;
      switch (link) {
        case "https://starblast.io/":
        case "https://dankdmitron.github.io/":
          document.getElementById("uplog").innerHTML=localStorage.text||"<p style='text-align:center'>Waiting...</p>";
          break;
        default:
          if (link.indexOf("https://starblast.io/#")==0) document.getElementById("uplog").innerHTML=localStorage.text||"<p style='text-align:center'>Waiting...</p>";
      }
    })
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
	};
	xhr.open("GET", path);
	xhr.send();
}

function handleFileData(fileData) {
	if (fileData) document.getElementById("log").innerText=fileData.match(/v\d\.\d\.\d/g)[0];
}
doGET(chrome.runtime.getURL("Changelog.txt"),handleFileData);
chrome.commands.onCommand.addListener(function(command) {
	if (command=="main_options") {
		chrome.tabs.getSelected(null, function(tab) {
			var link=tab.url;
			switch(link)
			{
				case "https://starblast.io/":
				case "https://starblast.io/mobile.html":
					chrome.tabs.executeScript({code: 'document.getElementsByClassName("sbg sbg-gears")[0].click();'});
					break;
				default:
					if (link.indexOf("https://starblast.io/#")==0) chrome.tabs.executeScript({code: 'document.getElementsByClassName("sbg sbg-gears")[0].click();'});
			}
		})
	}
});
