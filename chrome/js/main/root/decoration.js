function locatehrefJS(jspath)
{
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
		if (fileData) location.href='javascript:'+fileData;
	}
	doGET(chrome.runtime.getURL(jspath),handleFileData);
}
function des_modding()
{
  let icon=document.createElement("link");
  icon.setAttribute("rel","icon");
  icon.setAttribute("type","image/png");
  icon.setAttribute("href","https://starblast.io/static/img/icon64.png");
  document.head.appendChild(icon);
  //Can't access cross-domain iframe in Modding, so the decoration stops here
}
function des_shipeditor()
{
  function copyToClipboard(text) {
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
  }
  document.getElementsByTagName("title")[0].innerText="Starblast Ship Editor";
  let icon=document.createElement("link");
  icon.setAttribute("rel","icon");
  icon.setAttribute("type","image/png");
  icon.setAttribute("href","https://starblast.io/static/img/icon64.png");
  document.head.appendChild(icon);
  document.getElementsByClassName("loadship")[0].setAttribute("data-tooltip","Load Ship From File");
  let a=document.getElementsByClassName("header")[0];
  a.innerHTML=a.innerHTML.substring(0,a.innerHTML.lastIndexOf('>')+1);
  let title=document.createElement("h");
  title.setAttribute("style","font-weight: bold;");
  title.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;SHIP EDITOR\n          ";
  a.appendChild(title);
  let head=document.createElement("div");
  head.setAttribute("style","float:right");
  a.getElementsByTagName("a")[0].setAttribute("style","position:relative;margin:5px");
  head.appendChild(a.getElementsByTagName("a")[0]);
  let item=head.firstChild.cloneNode(head.childNodes[0]);
  head.insertBefore(item,head.childNodes[0]);
  item.setAttribute("href","https://starblastio.gamepedia.com/Ship_Editor_Tutorial");
  item.setAttribute("target","wiki_documentation");
  item.getElementsByTagName("i")[0].setAttribute("class","sbg sbg-help-full");
  item.setAttribute("style","position:relative");
  item.innerHTML=item.innerHTML.substring(0,item.innerHTML.lastIndexOf('>')+1)+" Ship Editor Tutorial\n        ";
  a.appendChild(head);
  let bar=document.getElementsByClassName("iconsbar editoriconsbar")[0];
  bar.removeChild(bar.childNodes[5]);
  let d=bar.removeChild(bar.childNodes[10]);
  bar.insertBefore(d,bar.childNodes[15]);
  let doc=document.createElement("a");
  doc.setAttribute("href","https://starblastio.gamepedia.com/Ship_Editor_Tutorial");
  doc.setAttribute("target","_blank");
  doc.setAttribute("data-tooltip","Documentation");
  doc.setAttribute("id","Documentation");
  let i=document.createElement("i");
  i.setAttribute("class","fa fa-fw fa-book");
  doc.appendChild(i);
  bar.insertBefore(doc,bar.childNodes[15]);
  let copy=document.createElement("a");
  copy.setAttribute("href","#");
  copy.setAttribute("data-tooltip","Copy to Clipboard");
  copy.setAttribute("id","copy");
  let i2=document.createElement("i");
  i2.setAttribute("class","fa fa-fw fa-copy");
  copy.appendChild(i2);
  copy.addEventListener("click", function() {
    locatehrefJS("/js/resources/ShipEditor/2.js");
    copyToClipboard(sessionStorage.rawcode);
  })
  bar.insertBefore(copy,bar.childNodes[4]);
  bar.insertBefore(bar.childNodes[0],bar.childNodes[4]);
  let code=document.createElement("span");
  code.setAttribute("style","margin-right:20px;font-weight:bold");
  code.innerHTML="Ship Code";
  bar.insertBefore(code,bar.childNodes[0]);
  let modcopy=document.createElement("a");
  modcopy.setAttribute("href","#");
  modcopy.setAttribute("id","modcopy");
  modcopy.setAttribute("data-tooltip","Copy Mod Code");
  modcopy.innerHTML='<i class="fa fa-fw fa-copy"></i>';
  bar.insertBefore(modcopy,bar.childNodes[20]);
  modcopy.addEventListener('click', function()
  {
    locatehrefJS("/js/resources/ShipEditor/1.js");
    copyToClipboard(sessionStorage.modexport);
  });
  let s=bar.removeChild(bar.childNodes[7]);
  bar.removeChild(bar.childNodes[11]);
  bar.insertBefore(s,bar.childNodes[18]);
  document.getElementById("loadModel").setAttribute("data-tooltip","Load Ship");
  document.getElementById("loadModel").innerHTML='<i class="sbg sbg-fly-full" style="font-size:17pt;margin-left:3px;margin-right:3px"></i>';
  document.getElementById("modExport").setAttribute("data-tooltip","Mod Export");
  document.getElementById("modExport").innerHTML='<i class="fa fa-fw fa-download"></i>';
	document.getElementById("modExport").addEventListener("click", function() {
		locatehrefJS("/js/resources/ShipEditor/1.js");
	});
  console.log("StarblastConverter: initialization completed");
}
function des_main()
{
  if (localStorage.ECPVerified=="yes")
  {
    let add=document.createElement("div");
    add.setAttribute("class","textcentered community changelog-new");
    add.setAttribute("data-translate-base","developer");
    add.setAttribute("lang","en");
    add.setAttribute("style","display:block;");
    let alpha=document.createElement("a");
    let alpha1=document.createElement("a");
    alpha.appendChild(document.createElement("i"));
    alpha1.appendChild(document.createElement("i"));
    alpha.appendChild(document.createElement("br"));
    alpha1.appendChild(document.createElement("br"));
    alpha.setAttribute("href","https://starblast.io/shipeditor/");
    alpha.firstElementChild.setAttribute("class","sbg sbg-fly-full");
    alpha.innerHTML+="Ship Editor";
    alpha1.setAttribute("href","https://starblast.io/modding.html");
    alpha1.firstElementChild.setAttribute("class","sbg sbg-modding");
    alpha1.innerHTML+="Mod Editor";
    alpha.setAttribute("target","_blank");
    alpha1.setAttribute("target","_blank");
    add.appendChild(alpha);
    add.appendChild(alpha1);
    document.getElementsByClassName("bottom-left")[0].insertBefore(add,document.getElementsByClassName("bottom-left")[0].childNodes[2]);
    let al=document.createElement("a");
    al.setAttribute("href","https://dankdmitron.github.io/");
    al.setAttribute("alt","Starblast Standalone by Dank Dmitron");
    al.setAttribute("style","text-decoration:underline");
    al.innerText="Starblast Standalone";
		let more=document.getElementsByClassName("changelog-new")[1].getElementsByTagName("div")[0].getElementsByTagName("p")[0];
		if (typeof more!='undefined')
		{
    	more.appendChild(document.createElement("br"));
    	more.appendChild(document.createElement("br"));
    	more.appendChild(al);
		}
  }
  var modeicon={
    team:"👥",
    survival:"☠️",
    deathmatch:"🏆",
    invasion:"🛸",
    modding:"🛠️",
    private:"🔒"
  }
  var modid={
    intrusion: "Alien Intrusion",
    useries: "U-Series",
    racing: "Racing",
    prototypes: "Prototypes",
    nauticseries: "Nautic Series",
    battleroyale: "Battle Royale"
  }
  let synctitle=document.head.getElementsByTagName("title")[0];
  synctitle.innerText="Starblast";
  document.getElementsByClassName("textprogress")[0].addEventListener("DOMSubtreeModified", setmapname=function() {
    var title=this.innerText;
    if (title.indexOf("Warping to system ")!=-1) {
        this.removeEventListener("DOMSubtreeModified",setmapname);
        title=title.replace(/Warping to system /,"");
        setTimeout(function() {
          var xhr = new XMLHttpRequest();
        	xhr.open('GET', '/simstatus.json', true);
        	xhr.onreadystatechange = function() {
          	if (xhr.readyState === 4)  {
            		var text=xhr.responseText;
                var b=0;
        			  eval("var data="+text);
  				      for (var i=0;i<data.length;i++) {
                    for (var j=0;j<data[i].systems.length;j++) {
                      	if (data[i].systems[j].name==title)
                        {
                          switch(data[i].systems[j].mode)
                          {
                            case "modding":
                              synctitle.innerText="Starblast – "+modeicon[data[i].systems[j].mode]+title+" System ("+modid[data[i].systems[j].mod_id]+")";
                              break;
                            default:
                              synctitle.innerText="Starblast – "+modeicon[data[i].systems[j].mode]+title+" System";
                          }
                          b=1;
                        }
  					        }
                }
                if (b!=1) synctitle.innerText="Starblast – "+modeicon['private']+title+" System";
            }
        	};
        	xhr.send(null);
        },1000);
    }
  })
  document.getElementsByClassName("modalbody")[0].addEventListener('DOMSubtreeModified', change=function() {
    this.removeEventListener("DOMSubtreeModified",change);
    switch (document.getElementsByClassName("modaltitle")[0].innerText) {
      case "Changelog":
        this.innerHTML=this.innerHTML.replace(/\*\s([^<]+)(<br>)+/g,function(v) {
          v=v.substring(v.indexOf("*")+1,v.indexOf("<br>"));
          v=v.replaceChar(v.indexOf(" ")+1,v[v.indexOf(" ")+1].toUpperCase());
          return "<ul><li>"+v+"</li></ul>";
        }).replace(/^<p (.+)<\/p>$/g,"<div $1</div>").replace(/(-\s[^<]+)(<br>)+/g, function(v) {
          v=v.substring(0,v.indexOf("<br>"));
          v=v.replaceChar(v.indexOf(" ")+1,v[v.indexOf(" ")+1].toUpperCase());
          return '<p style="margin-inline-start:40px">'+v+"</p>";
        }).replace(/(\+\s[^<]+)(<br>)+/g,'<p style="margin-inline-start:80px">$1</p>');
        break;
      case "INFO":
        this.innerHTML=this.innerHTML.replace(/\*/g,"•");
        break;
      case "Your custom game":
        let copy=document.createElement("button");
        copy.setAttribute("style","margin:10px");
        copy.setAttribute("class","donate-btn");
        copy.setAttribute("id","copylink");
        copy.innerText="Copy link";
        copy.addEventListener("click", function() {
					document.getElementsByClassName("stats textcentered")[0].getElementsByTagName("input")[0].click();
					document.execCommand('copy');
				})
        if (typeof document.getElementsByClassName("stats textcentered")[0]!='undefined') {
          let stats=document.getElementsByClassName("stats textcentered")[0];
          stats.insertBefore(copy, stats.childNodes[5]);
          stats.insertBefore(document.createElement("br"),stats.childNodes[5]);
        }
        break;
    }
    this.addEventListener('DOMSubtreeModified', change);
  });
}
function des_standalone()
{
  let icon=document.createElement("link");
  icon.setAttribute("rel","icon");
  icon.setAttribute("type","image/png");
  icon.setAttribute("href","https://starblast.io/static/img/icon64.png");
  document.head.appendChild(icon);
  document.head.getElementsByTagName("title")[0].innerText="Starblast Standalone";
}
function des_changelog()
{
  let icon=document.createElement("link");
  icon.setAttribute("rel","icon");
  icon.setAttribute("type","image/png");
  icon.setAttribute("href","https://starblast.io/static/img/icon64.png");
  document.head.appendChild(icon);
  let a=document.createElement("title");
  a.innerText="Starblast Changelog";
  document.head.appendChild(a);
}
function des_moddingdata()
{
  let a=document.getElementsByClassName("header")[0];
  a.innerHTML=a.innerHTML.substring(0,a.innerHTML.lastIndexOf('>')+1);
  let title=document.createElement("h");
  title.setAttribute("style","font-weight: bold;");
  title.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;MODDING\n          ";
  a.appendChild(title);
  document.getElementsByClassName("iconsbar editoriconsbar")[0].setAttribute("style","margin-right:20px;font-weight:bold");
  let sp=document.createElement("span");
  sp.setAttribute("class","separator");
  document.getElementsByClassName("iconsbar editoriconsbar")[0].appendChild(sp);
}
function des_stats()
{
  let icon=document.createElement("link");
  icon.setAttribute("rel","icon");
  icon.setAttribute("type","image/png");
  icon.setAttribute("href","https://starblast.io/static/img/icon64.png");
  document.head.appendChild(icon);
  let a=document.createElement("title");
  a.innerText="Starblast Map Status";
  document.head.appendChild(a);
}
function des_client()
{
	document.getElementsByClassName("modalbody")[0].addEventListener('DOMSubtreeModified', change=function() {
    this.removeEventListener("DOMSubtreeModified",change);
    switch (document.getElementsByClassName("modaltitle")[0].innerText) {
      case "":
        let copy=document.createElement("button");
        copy.setAttribute("style","margin:10px");
        copy.setAttribute("class","donate-btn");
        copy.setAttribute("id","copylink");
        copy.innerText="Copy link";
        copy.addEventListener("click", function() {
					document.getElementsByClassName("stats textcentered")[0].getElementsByTagName("input")[0].click();
					document.execCommand('copy');
				})
				document.getElementsByClassName("modaltitle")[0].innerText="Your custom game";
        setTimeout(function() {
          document.getElementsByClassName("textcentered")[1].innerHTML+='<br><button id="copylink" style="margin:0px" class="donate-btn">Copy link</button>';
					document.getElementById("copylink").addEventListener("click", function() {
						document.getElementsByClassName("textcentered")[1].getElementsByTagName("input")[0].click();
						document.execCommand('copy');
					})
        },500);
				console.log(document.getElementsByClassName("textcentered")[1]);
        break;
    }
    this.addEventListener('DOMSubtreeModified', change);
  });
	document.getElementsByClassName("choices")[0].removeChild(document.getElementsByClassName("choices")[0].lastElementChild);
}
switch(location.href)
{
  case "https://starblast.io/shipeditor/#":
  case "https://starblast.io/shipeditor/":
    des_shipeditor();
    break;
  case "https://starblast.io/modding.html":
    des_modding();
    break;
  case "https://starblast.io/changelog.txt":
    des_changelog();
    break;
  case "https://dankdmitron.github.io/":
    des_standalone();
    break;
  case "https://starblast.io/mobile.html":
    break;
  case "https://starblast.data.neuronality.com/modding/moddingcontent.html":
    des_moddingdata();
    break;
  case "https://starblast.io/simstatus.json":
    des_stats();
    break;
  case "https://starblast.io/app.html?ecp":
		des_client();
    break;
  default:
    des_main();
    break;
}
