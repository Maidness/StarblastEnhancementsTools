function E(str){
	return document.createElement(str);
}
let root = chrome.runtime.getURL("");
function executeJS(jspath, mainscope)
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
								callback("");
						}
				}
		};
		xhr.open("GET", path);
		xhr.send();
	}

	function handleFileData(fileData) {
		if (fileData) {
      if (mainscope) location.href="javascript:(function(){"+fileData+"})();void 0;";
      else Function(fileData)();
    }
	}
	doGET(chrome.runtime.getURL(jspath),handleFileData);
}
function des_modding()
{
  let icon=E("link");
  icon.setAttribute("rel","icon");
  icon.setAttribute("type","image/png");
  icon.setAttribute("href","https://starblast.io/static/img/icon64.png");
  document.head.appendChild(icon);
  //Can't access cross-domain iframe in Modding, so the decoration stops here
}
function des_shipeditor()
{
  function copyToClipboard(text) {
		var dummy = E("textarea");
	  document.body.appendChild(dummy);
	  dummy.value = text;
	  dummy.select();
	  document.execCommand('copy');
	  document.body.removeChild(dummy);
  }
	document.getElementsByTagName("style")[2].innerHTML+="button{cursor:pointer;background-color:#09161c;font-size:20pt;border:0px;color:#f0f0f0}button:hover{background: linear-gradient(135deg,#303437 0,#303437 100%)}button:active{outline:none}@keyframes fadeInOut{0%{opacity:0}5%{opacity:1}95%{opacity:1}100%{opacity:0}";
	for (let i of document.head.querySelectorAll("script")) {
		if (i.src.includes("js2coffee")) i.remove();
	}
	let srcs = [
		"https://cdn.jsdelivr.net/gh/js2coffee/js2coffee@master/dist/js2coffee.js",
		"https://cdn.rawgit.com/jashkenas/coffeescript/1.9.2/extras/coffee-script.js",
		"https://cdn.jsdelivr.net/gh/Bhpsngum/utilitiesNstuffs@master/getProperVariableName/JS/getProperVariableName.min.js"
	], loadscripts = function(src,onload,onerror) {
		let A = document.createElement("script");
		A.src=src;
		A.onload = onload;
		A.onerror = onerror;
		document.head.appendChild(A);
	}
	for (let src of srcs) loadscripts(src);
	loadscripts("https://javascriptcompressor.com/scripts/my.js",function(){loadscripts("https://javascriptcompressor.com/scripts/Packer.js")});
	executeJS("/js/resources/ShipEditor/3.js", true);
  document.getElementsByTagName("title")[0].innerText="Starblast Ship Editor";
  des_cmn();
  document.getElementsByClassName("loadship")[0].setAttribute("data-tooltip","Load Ship From File");
  let a=document.getElementsByClassName("header")[0];
  a.innerHTML=a.innerHTML.substring(0,a.innerHTML.lastIndexOf('>')+1);
  let title=E("h");
  title.setAttribute("style","font-weight: bold;");
  title.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;SHIP EDITOR\n          ";
  a.appendChild(title);
  let head=E("div");
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
	let main=document.querySelector("body > div.wrapper > div.centerpanel");
	let render=main.querySelector(".renderpanelcontainer"),editor=main.querySelector(".editorpanel");
	let bar=editor.childNodes[1],preview=render.childNodes[1].childNodes[1];
  bar.removeChild(bar.childNodes[5]);
  let d=bar.removeChild(bar.childNodes[10]);
  bar.insertBefore(d,bar.childNodes[15]);
  let copy=E("a");
  copy.setAttribute("href","#");
  copy.setAttribute("data-tooltip","Copy to Clipboard");
  copy.setAttribute("id","copy");
  let i2=E("i");
  i2.setAttribute("class","fa fa-fw fa-clipboard");
  copy.appendChild(i2);
  copy.addEventListener("click", function() {
		executeJS("/js/resources/ShipEditor/2.js");
		this.setAttribute("data-tooltip","Copying...");
		setTimeout(function(){copy.setAttribute("data-tooltip","Copy to Clipboard")},500);
  });
  bar.insertBefore(copy,bar.childNodes[4]);
  bar.insertBefore(bar.childNodes[0],bar.childNodes[4]);
  let code=E("span");
  code.setAttribute("style","margin-right:20px;font-weight:bold");
  code.innerHTML="Ship Code";
  bar.insertBefore(code,bar.childNodes[0]);
  let modcopy=E("a");
  modcopy.setAttribute("href","#");
  modcopy.setAttribute("id","modcopy");
  modcopy.setAttribute("data-tooltip","Copy ModExport Code");
  modcopy.innerHTML='<i class="fa fa-fw fa-copy"></i>';
  bar.insertBefore(modcopy,bar.childNodes[20]);
  modcopy.addEventListener('click', function()
  {
		executeJS("/js/resources/ShipEditor/1.js", true);
  });
  let s=bar.removeChild(bar.childNodes[7]);
  bar.insertBefore(bar.removeChild(bar.childNodes[11]),bar.childNodes[19]);
  bar.insertBefore(s,bar.childNodes[18]);
  document.querySelector("#loadModel").setAttribute("data-tooltip","Load Ship");
  document.querySelector("#loadModel").innerHTML='<i class="sbg sbg-fly-full" style="font-size:17pt;margin-left:3px;margin-right:3px"></i>';
  document.querySelector("#modExport").setAttribute("data-tooltip","Mod Export");
  document.querySelector("#modExport").innerHTML='<i class="fa fa-fw fa-download"></i>';
	document.querySelector("#modExport").addEventListener("click", function() {
		executeJS("/js/resources/ShipEditor/4.js", true);
	});
	let dummyspan = E("span");
	dummyspan.setAttribute("class","separator");
	bar.appendChild(dummyspan);
	let hview= E("a"),heditor=E("a");
	hview.setAttribute("data-tooltip","Hide Preview Panel");
	hview.setAttribute("id","Preview");
	hview.setAttribute("style","float:left");
	hview.setAttribute("href","#");
	heditor.setAttribute("data-tooltip","Hide Editor Panel");
	heditor.setAttribute("id","Editor");
	heditor.setAttribute("style","float:right");
	heditor.setAttribute("href","#");
	let ih=E("i");
	ih.setAttribute("class","fa fa-fw fa-backward");
	heditor.appendChild(ih);
	let ie=E("i");
	ie.setAttribute("class","fa fa-fw fa-forward");
	hview.appendChild(ie);
	for (let i=0;i<2;i++) {
		let spg = E("span");
		spg.setAttribute("class","separator");
		bar.appendChild(spg);
	}
	var barstyle = "z-index:10;left: 0;right:auto", previewstyle = "right: 0;left:auto";
	var setWidth = function () {
		bar.setAttribute("style",barstyle+";width: max-content");
		let t = window.getComputedStyle(document.body).width.replace("px",""),x =  window.getComputedStyle(bar).width.replace("px","");
		if (x < t/2 - 30) bar.setAttribute("style",barstyle+";width: "+(t/2 - 30)+"px");
		preview.setAttribute("style",previewstyle+";width: "+Math.min(t/2,t-x-30)+"px");
	}
	var globalresized = false;
	window.addEventListener("resize",function(){
		if (!globalresized) setWidth();
	});
	setTimeout(setWidth,500);
	var setoption = function (element)
	{
		let elem=heditor,u=element.getAttribute("data-tooltip").split(" "),id=element.getAttribute("id"),htext=["Show","Hide"],hpos=["Preview","Editor"],d=Math.abs(hpos.indexOf(id||"")),elempos=[render,editor],isHide=Math.abs(htext.indexOf(u[0]||""));
		if (globalresized = isHide, globalresized)
		{
			if (d)
			{
				elempos=[editor,render];
				elem=hview;
				bar.setAttribute("style","display:none");
				preview.setAttribute("style","width:100vw");
				preview.childNodes[2].setAttribute("style",prestyle+"display:none");
				render.childNodes[1].childNodes[3].setAttribute("style","width:100vw;background: transparent;left:50%;transform:translate(-50%,-50%);");
				render.childNodes[1].setAttribute("style","background: url(https://starblast.io/static/img/bg.webp) #000;")
			}
			else {
				preview.setAttribute("style","display:none");
				bar.setAttribute("style","width:98vw");
			}
			elempos[0].setAttribute("style","width:0%");
			elempos[1].setAttribute("style","width:100%");
		}
		else
		{
			for (let i of elempos) i.removeAttribute("style");
			setWidth();
			preview.childNodes[2].setAttribute("style",prestyle);
			render.childNodes[1].childNodes[3].removeAttribute("style");
			render.childNodes[1].removeAttribute("style");
			elem=element;
		}
		executeJS("/js/resources/common/1.js", true);
		elem.setAttribute("data-tooltip",[htext[Number(!isHide)],hpos[Number(d)],"Panel"].join(" "));
	}
	hview.addEventListener("click",function(){setoption(hview)});
	heditor.addEventListener("click",function(){setoption(heditor)});
	bar.appendChild(heditor);
	preview.insertBefore(hview,preview.childNodes[0]);
	let prestyle = preview.childNodes[2].getAttribute("style").replace(/([^;])\s*$/,"$1;");
	let u = E("select"), conversion_list = ["Original","Generation II"];
	localStorage.setItem("export-type",Math.min(Math.max(parseInt(localStorage.getItem("export-type"))||1,1),2));
	u.setAttribute("style","font-family:Lato,Sans-Serif;font-size:1em;padding:3px 5px;color:white;background:hsl(200,60%,15%);border:1px solid hsl(200,60%,10%);box-sizing:border-box");
	u.setAttribute("id","export-type");
	u.addEventListener("change",function(){
		localStorage.setItem("export-type",u.options.selectedIndex);
	});
	u.innerHTML+="<option disabled>Select exporting type</option>"+conversion_list.map(i=>"<option>"+i+"</option>").join("");
	u.options.selectedIndex = localStorage.getItem("export-type");
	bar.insertBefore(u, bar.childNodes[23]);
	if (window.Clipboard && window.ClipboardItem) {
		executeJS("/js/resources/ShipEditor/5.js", true);
		let copyImg=E("a");
	  copyImg.setAttribute("href","#");
	  copyImg.setAttribute("data-tooltip","Copy Image (.PNG format)");
	  copyImg.setAttribute("id","copyImg");
		copyImg.innerHTML+='<span class="fa-stack" style="width:auto;height:auto"><i class="fa fa-fw fa-clipboard" style="float:left"></i><i class="fa fa-fw fa-picture-o" style="float:right;font-size: 0.75em;position: absolute;top: '+5/14+'em;left: '+9/14+'em;background-color: grey;"></i></span>';
	  copyImg.addEventListener("click", function() {
			executeJS("/js/resources/ShipEditor/6.js", true);
			this.setAttribute("data-tooltip","Copying...");
			setTimeout(function(){copyImg.setAttribute("data-tooltip","Copy Image (.PNG format)")},500);
	  });
		bar.insertBefore(copyImg,bar.childNodes[7]);
		bar.insertBefore(bar.childNodes[6].cloneNode(true),bar.childNodes[8]);
	}
}
function des_main()
{
  if (localStorage.ECPVerified=="yes")
  {
    let add=E("div");
    add.setAttribute("class","textcentered community changelog-new");
    add.setAttribute("data-translate-base","developer");
    add.setAttribute("lang","en");
    add.setAttribute("style","display:block;");
    let alpha=E("a"),alpha1=E("a");
    alpha.appendChild(E("i"));
    alpha1.appendChild(E("i"));
    alpha.appendChild(E("br"));
    alpha1.appendChild(E("br"));
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
    let al=E("a");
    al.setAttribute("href","https://dankdmitron.github.io/");
    al.setAttribute("alt","Starblast Standalone by Dank Dmitron");
    al.setAttribute("style","text-decoration:underline");
    al.innerText="Starblast Standalone";
		let oal=E("p");
		oal.setAttribute("style","text-align:center;");
		oal.appendChild(al);
		let more=document.getElementsByClassName("changelog-new")[0].getElementsByTagName("div")[0];
		more.appendChild(oal);
  }
	executeJS("js/resources/Main/1.js", true);
  executeJS("js/resources/Main/2.js", true);
}
function des_standalone()
{
  des_cmn();
  document.head.getElementsByTagName("title")[0].innerText="Starblast Standalone";
}
function des_changelog()
{
  des_cmn();
  let a=E("title");
  a.innerText="Starblast Changelog";
  document.head.appendChild(a);
}
function des_moddingdata()
{
	des_cmn();
	let main=document.querySelector("body > div.wrapper > div.centerpanel");
	let terminal=main.querySelector(".runpanelcontainer"),editor=main.querySelector(".editorpanel");
	let bar=editor.childNodes[1],consl=terminal.childNodes[1].childNodes[1];
  let a=document.getElementsByClassName("header")[0];
  a.innerHTML=a.innerHTML.substring(0,a.innerHTML.lastIndexOf('>')+1);
  let title=E("h");
  title.setAttribute("style","font-weight: bold;");
  title.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;MODDING\n          ";
  a.appendChild(title);
  bar.setAttribute("style","margin-right:20px;font-weight:bold");
  let sp=E("span");
  sp.setAttribute("class","separator");
	bar.appendChild(sp);
	let copy=E("a");
	copy.setAttribute("data-tooltip","Copy Mod Code");
	copy.setAttribute("href","#");
	copy.setAttribute("id","copy");
	let i=E("i");
	i.setAttribute("class","fa fa-fw fa-clipboard");
	copy.appendChild(i);
	copy.addEventListener("click", function() {
		executeJS("/js/resources/ShipEditor/2.js");
		this.setAttribute("data-tooltip","Copying...");
		setTimeout(function(){copy.setAttribute("data-tooltip","Copy Mod Code")},500);
	});
	let test=E("a");
	test.setAttribute("style","display:none");
	test.setAttribute("id","test");
	test.setAttribute("data-tooltip","Open Game Frame");
	test.setAttribute("href","#");
	let i3=E("i");
	i3.setAttribute("class","fa fa-fw fa-gamepad");
	test.appendChild(i3);
	test.addEventListener("click",function() {
		location.href='javascript:$("#terminal").terminal().exec("test",true);void 0;';
	});
	consl.setAttribute("style","text-align:right");
	document.head.getElementsByTagName("style")[0].innerHTML+='select{font-family:Lato,Sans-Serif;font-size:1em;padding:3px 5px;color:white;background:hsl(200,60%,15%);border:1px solid hsl(200,60%,10%);vertical-align:middle;width:150px;box-sizing:border-box}'
	var reg=["Asia","America","Europe"];
	let regc=E("select");
	regc.setAttribute("id","region-select");
	regc.innerHTML+='<option disabled>Select region</option>';
	for (var h=0;h<=2;h++) regc.innerHTML+='<option id="'+reg[h]+'">'+reg[h]+'</option>';
	regc.options.selectedIndex=reg.indexOf(document.getElementsByClassName("terminal-output")[0].getElementsByTagName("div")[3].innerText.replace(/Region\sset\sto\s/g,""))+1;
	regc.addEventListener("change",function() {
		location.href='javascript:$("#terminal").terminal().exec("region '+reg[regc.options.selectedIndex-1]+'",true);void 0;';
	});
	let help=E("a");
	help.setAttribute("href","#");
	help.innerText="Console Help";
	help.addEventListener("click", function() {
		location.href='javascript:$("#terminal").terminal().exec("help",true);void 0;';
	});
	let space=E("span");
	space.setAttribute("class","separator");
	let space1=E("span");
	space1.setAttribute("class","separator");
	executeJS("/js/resources/Modding/4.js", true);
	let sh=E("a");
	sh.setAttribute("href","#");
	sh.setAttribute("id","terminal_ingame_log");
	sh.innerHTML='<i class="fa fa-fw fa-code"></i>';
	let clear=E("a");
	clear.setAttribute("href","#");
	clear.innerText="Clear Console";
	clear.addEventListener("click", function() {
		executeJS("/js/resources/Modding/3.js", true)
	});
	consl.appendChild(regc);
	consl.appendChild(space1);
	consl.appendChild(sh);
	consl.appendChild(space);
	consl.appendChild(clear);
	consl.appendChild(bar.firstChild.cloneNode(true));
	consl.appendChild(help);
	let hconsl= E("a"),heditor=E("a");
	hconsl.setAttribute("data-tooltip","Hide Console Panel");
	hconsl.setAttribute("id","Console");
	hconsl.setAttribute("style","float:left");
	hconsl.setAttribute("href","#");
	heditor.setAttribute("data-tooltip","Hide Editor Panel");
	heditor.setAttribute("id","Editor");
	heditor.setAttribute("style","float:right");
	heditor.setAttribute("href","#");
	let ih=E("i");
	ih.setAttribute("class","fa fa-fw fa-backward");
	heditor.appendChild(ih);
	let ie=E("i");
	ie.setAttribute("class","fa fa-fw fa-forward");
	hconsl.appendChild(ie);
	var setoption = function (element)
	{
		let elem=heditor,u=element.getAttribute("data-tooltip").split(" "),id=element.getAttribute("id"),htext=["Show","Hide"],hpos=["Console","Editor"],d=Math.abs(hpos.indexOf(id||"")),elempos=[terminal,editor],isHide=Math.abs(htext.indexOf(u[0]||""));
		if (isHide)
		{
			if (d)
			{
				elempos=[editor,terminal];
				elem=hconsl;
				bar.setAttribute("style","display:none");
			}
			else document.querySelector("#fieldview").setAttribute("style","display:none");
			elempos[0].setAttribute("style","width:0%");
			elempos[1].setAttribute("style","width:100%");
		}
		else
		{
			for (let i of elempos) i.removeAttribute("style");
			document.querySelector("#fieldview").removeAttribute("style");
			bar.removeAttribute("style");
			elem=element;
		}
		executeJS("/js/resources/common/1.js", true);
		elem.setAttribute("data-tooltip",[htext[Number(!isHide)],hpos[Number(d)],"Panel"].join(" "));
	}
	hconsl.addEventListener("click",function(){setoption(hconsl)});
	heditor.addEventListener("click",function(){setoption(heditor)});
	bar.appendChild(heditor);
	consl.insertBefore(hconsl,consl.childNodes[0]);
	bar.insertBefore(copy,bar.childNodes[7]);
	bar.removeChild(document.querySelector("#runmod"));
	let run=E("a");
	run.setAttribute("id","runstopmod");
	run.setAttribute("data-tooltip","Run Mod");
	run.setAttribute("cmd","start");
	run.setAttribute("href",'#');
	let i2=E("i");
	i2.setAttribute("class","fa fa-fw fa-play");
	run.appendChild(i2);
	bar.insertBefore(run, bar.childNodes[10]);
	bar.insertBefore(test, bar.childNodes[12]);
	run.addEventListener("click", function() {
		executeJS("/js/resources/Modding/1.js", true);
	});
	executeJS("/js/resources/Modding/2.js", true);
}
function des_cmn()
{
	let icon=E("link");
  icon.setAttribute("rel","icon");
  icon.setAttribute("type","image/png");
  icon.setAttribute("href","https://starblast.io/static/img/icon64.png");
  document.head.appendChild(icon);
}
function des_client()
{
	document.getElementsByClassName("choices")[0].removeChild(document.getElementsByClassName("choices")[0].lastElementChild);
	executeJS("/js/resources/Main/4.js", true);
	executeJS("js/resources/Main/3.js", true);
}

switch (location.host)
{
	case "starblast.io":
	{
		switch(location.pathname)
		{
			case "/shipeditor/":
			case "/shipeditor/index.html":
				des_shipeditor();
				break;
			case "/modding.html":
				des_modding();
				break;
			case "/changelog.txt":
				des_changelog();
				break;
			case "/mobile.html":
				break;
			case "/app.html":
				des_client();
				break;
			case "/":
			case "/index.html":
			case "/beta":
			case "/beta/index.html":
				des_main();
				break;
			default:
				des_cmn();
		}
		break;
	}
	case "starblast.pleshkov.dev":
	case "starblast.dankdmitron.dev":
		switch (location.pathname) {
			case "/app":
			case "/app/index.html":
				des_standalone();
				break;
		}
		break;
	case "starblast.data.neuronality.com":
	{
		switch (location.pathname)
		{
			case "/modding/moddingcontent.html":
				des_moddingdata();
				break;
			default:
				des_cmn();
		}
		break;
	}
};
