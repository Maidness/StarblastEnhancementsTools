function E(str){
	return document.createElement(str);
}
let root = chrome.runtime.getURL("");
function locatehrefJS(jspath,haveroot)
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
		if (fileData) location.href='javascript:'+(haveroot?("var root = '"+root+"';"):"")+fileData+"void 0;";
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
	locatehrefJS("/js/resources/ShipEditor/5.js");
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
  let doc=E("a");
  doc.setAttribute("href","https://starblastio.gamepedia.com/Ship_Editor_Tutorial");
  doc.setAttribute("target","_blank");
  doc.setAttribute("data-tooltip","Documentation");
  doc.setAttribute("id","Documentation");
  let i=E("i");
  i.setAttribute("class","fa fa-fw fa-book");
  doc.appendChild(i);
  bar.insertBefore(doc,bar.childNodes[15]);
  let copy=E("a");
  copy.setAttribute("href","#");
  copy.setAttribute("data-tooltip","Copy to Clipboard");
  copy.setAttribute("id","copy");
  let i2=E("i");
  i2.setAttribute("class","fa fa-fw fa-clipboard");
  copy.appendChild(i2);
  copy.addEventListener("click", function() {
		locatehrefJS("/js/resources/ShipEditor/2.js");
		this.setAttribute("data-tooltip","Copied!");
		setTimeout(function(){copy.setAttribute("data-tooltip","Copy to Clipboard")},500);
  })
  bar.insertBefore(copy,bar.childNodes[4]);
  bar.insertBefore(bar.childNodes[0],bar.childNodes[4]);
  let code=E("span");
  code.setAttribute("style","margin-right:20px;font-weight:bold");
  code.innerHTML="Ship Code";
  bar.insertBefore(code,bar.childNodes[0]);
  let modcopy=E("a");
  modcopy.setAttribute("href","#");
  modcopy.setAttribute("id","modcopy");
  modcopy.setAttribute("data-tooltip","Copy Mod Code");
  modcopy.innerHTML='<i class="fa fa-fw fa-copy"></i>';
  bar.insertBefore(modcopy,bar.childNodes[20]);
  modcopy.addEventListener('click', function()
  {
		locatehrefJS("/js/resources/ShipEditor/1.js");
  });
  let s=bar.removeChild(bar.childNodes[7]);
  bar.removeChild(bar.childNodes[11]);
  bar.insertBefore(s,bar.childNodes[18]);
  document.querySelector("#loadModel").setAttribute("data-tooltip","Load Ship");
  document.querySelector("#loadModel").innerHTML='<i class="sbg sbg-fly-full" style="font-size:17pt;margin-left:3px;margin-right:3px"></i>';
  document.querySelector("#modExport").setAttribute("data-tooltip","Mod Export");
  document.querySelector("#modExport").innerHTML='<i class="fa fa-fw fa-download"></i>';
	document.querySelector("#modExport").addEventListener("click", function() {
		locatehrefJS("/js/resources/ShipEditor/4.js");
	});
	let hview= E("a"),heditor=E("a");
	hview.setAttribute("data-tooltip","Hide Preview panel");
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
	function setoption(element)
	{
		let elem=heditor,u=element.getAttribute("data-tooltip").split(" "),id=element.getAttribute("id"),htext=["Show","Hide"],hpos=["Preview","Editor"],d=Math.abs(hpos.indexOf(id||"")),elempos=[render,editor],isHide=Math.abs(htext.indexOf(u[0]||""));
		if (isHide)
		{
			if (d)
			{
				elempos=[editor,render];
				elem=hview;
				bar.setAttribute("style","display:none");
				render.childNodes[1].childNodes[3].setAttribute("style","width:80%;background: transparent;left:50%;transform:translateX(-50%);");
				render.childNodes[1].setAttribute("style","background: url(https://starblast.io/static/img/bg.webp) #000;")
			}
			else preview.setAttribute("style","display:none");
			elempos[0].setAttribute("style","width:0%");
			elempos[1].setAttribute("style","width:100%");
		}
		else
		{
			for (let i of elempos) i.removeAttribute("style");
			bar.removeAttribute("style");
			preview.removeAttribute("style");
			render.childNodes[1].childNodes[3].removeAttribute("style");
			render.childNodes[1].removeAttribute("style");
			elem=element;
		}
		elem.setAttribute("data-tooltip",[htext[Number(!isHide)],hpos[Number(d)],"Panel"].join(" "));
	}
	hview.addEventListener("click",function(){setoption(hview)});
	heditor.addEventListener("click",function(){setoption(heditor)});
	bar.appendChild(heditor);
	preview.insertBefore(hview,preview.childNodes[0]);
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
    let alpha=E("a"),alpha1=E("a"),map=E("i");
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
		map.setAttribute("class","sbg sbg-world");
		document.querySelector("#overlay > div.social").appendChild(map);
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
	locatehrefJS("js/resources/Main/1.js");
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
        let copy=E("button");
        copy.setAttribute("style","margin:10px");
        copy.setAttribute("class","donate-btn");
        copy.setAttribute("id","copylink");
        copy.innerText="Copy link";
        copy.addEventListener("click", function() {
					document.getElementsByClassName("stats textcentered")[0].getElementsByTagName("input")[0].click();
					document.execCommand('copy');
				})
        if (document.getElementsByClassName("stats textcentered")[0]) {
          let stats=document.getElementsByClassName("stats textcentered")[0];
          stats.insertBefore(copy, stats.childNodes[5]);
          stats.insertBefore(E("br"),stats.childNodes[5]);
        }
        break;
			case "Modding Space":
				if (document.getElementsByClassName("modecp")[0]) document.getElementsByClassName("modecp")[0].setAttribute("style","z-index:1;position:fixed;left:0;bottom:0");
				break;
			case "Greetings, Elite Commander":
				let psd=document.querySelector("body > div.modal > div.modalbody > div > div.center");
				if (psd)
				{
					let viewEcp=document.querySelector("#viewEcp");
					let removeEcp=document.querySelector("#removeEcp");
					if (viewEcp) viewEcp.hidden=true;
					if (removeEcp) removeEcp.hidden=true;
					let fakeview=E("button");
					let fakeremove=E("button");
					fakeview.setAttribute("class","ecpinput ecpbtn");
					fakeview.setAttribute("id","viewEcpFake");
					fakeremove.setAttribute("id","removeEcpFake");
					fakeremove.setAttribute("class","ecpinput ecpbtn");
					let ei=E("i"),er=E("i");
					ei.setAttribute("class","fa fa-eye");
					er.setAttribute("class","fa fa-trash");
					fakeview.appendChild(ei);
					fakeremove.appendChild(er);
					function Verify(str,pass)
					{
						let s=prompt(str);
						while (true)
						{
							if (s!=pass)
							{
								if (!s)
								{
									if (s === "") s=prompt("Your password must not be empty!\nPlease try again!");
									else return 0;
								}
								else s=prompt("Sorry, your password is incorrect!\nPlease try again!");
							}
							else return 1;
						}
					}
					function NewPwd(str)
					{
						let npwd="",rnpwd="!",msg=str||"";
						while (npwd!=rnpwd)
						{
							let np=0;
							npwd=prompt(msg+"\nEnter your new password:");
							if (npwd != void 0)
							{
								if (npwd === "") msg="Your new password must not be empty!";
								else np=1;
							}
							else return 0;
							if (np)
							{
								rnpwd=prompt("Confirm your new password:");
								if (rnpwd != void 0)
								{
									if (rnpwd != npwd) msg="Passwords don't match!";
									else
									{
										if (confirm("Are you sure to make changes to your password?"))
										{
											localStorage.setItem("token",npwd);
											return 1;
										}
										else return 0;
									}
								}
								else return 0;
							}
						}
					}
					fakeview.addEventListener("click",function() {
						let key=document.querySelector("#ECPKey");
						let viewEcp=document.querySelector("#viewEcp");
						if (key.value == key.getAttribute("data-value")) viewEcp.click();
						else
						{
							if (localStorage.token === void 0) viewEcp.click();
							else if (Verify("You're about to take action with your ECP\nPlease enter your password to proceed:",localStorage.token)) viewEcp.click();
						}
					});
					fakeremove.addEventListener("click", function(){
						let remove=document.querySelector("#removeEcp");
						if (localStorage.token === void 0) remove.click();
						else if (Verify("You're about to take action with your ECP\nPlease enter your password to proceed:",localStorage.token)) remove.click();
					});
					if (!document.querySelector("#viewEcpFake")) psd.insertBefore(fakeview,psd.childNodes[2]);
					if (!document.querySelector("#removeEcpFake")) psd.appendChild(fakeremove);
					let pwd=E("div"),createPwd=E("button"),changePwd=E("button"),clearPwd=E("button"),forgetPwd=E("button");
					pwd.setAttribute("id","password-panel");
					createPwd.setAttribute("class","donate-btn");
					changePwd.setAttribute("class","donate-btn");
					clearPwd.setAttribute("class","donate-btn");
					forgetPwd.setAttribute("class","donate-btn");
					changePwd.setAttribute("style","margin:10px");
					clearPwd.setAttribute("style","margin:10px");
					forgetPwd.setAttribute("style","margin:10px");
					createPwd.innerText="Create Password Protection";
					changePwd.innerText="Change Password";
					clearPwd.innerText="Clear Password";
					forgetPwd.innerText="Forget password?";
					function add(check)
					{
						pwd.innerHTML="";
						if (check)
						{
							pwd.appendChild(changePwd);
							pwd.appendChild(clearPwd);
							pwd.appendChild(E("br"));
							pwd.appendChild(forgetPwd);
						}
						else pwd.appendChild(createPwd);
					}
					createPwd.addEventListener("click", function() {
						if (NewPwd("Password protection prevents others from taking action (view, remove) with your ECP key in this device")) add(1);
					});
					clearPwd.addEventListener("click", function() {
						if (Verify("Enter your current password",localStorage.token))
						{
							if (confirm("Are you sure to remove the password?"))
							{
								localStorage.removeItem("token");
								add(0);
							}
						}
					});
					changePwd.addEventListener("click", function() {
						if (Verify("Enter your current password",localStorage.token)) NewPwd();
					});
					forgetPwd.addEventListener("click",function() {
						if (Verify("Forgot the password? Type your ECP code as a password to continue",localStorage.ECPKey))
						{
							if (confirm("Do you want to create a new password?")) NewPwd();
							else
							{
								if (confirm("Or do you want to clear your current password?"))
								{
									localStorage.removeItem("token");
									add(0);
								}
							}
						}
					});
					if (localStorage.token === void 0) add(0);
					else add(1);
					if (!document.querySelector("#password-panel")) psd.appendChild(pwd);
				}
				break;
    }
    this.addEventListener('DOMSubtreeModified', change);
  });
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
		locatehrefJS("/js/resources/ShipEditor/2.js");
		this.setAttribute("data-tooltip","Copied!");
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
	if (!localStorage.showtick) localStorage.setItem("showtick",true);
	let sh=E("a");
	sh.setAttribute("href","#");
	sh.setAttribute("id","showtick");
	sh.innerHTML='<i class="fa fa-fw fa-code" style="color:#EEE"></i>';
	if (localStorage.showtick=="true")
	{
	  sh.setAttribute("data-tooltip","Hide in-game tick");
	  sh.getElementsByTagName("i")[0].setAttribute("style","color:#EEE");
	}
	else
	{
	  sh.setAttribute("data-tooltip","Show in-game tick");
	  sh.getElementsByTagName("i")[0].setAttribute("style","color:grey");
	}
	sh.addEventListener('click', function()
	{
	  if (localStorage.showtick=="true")
	  {
			sh.setAttribute("data-tooltip","Show in-game tick");
	    sh.getElementsByTagName("i")[0].setAttribute("style","color:grey");
			localStorage.showtick = false;
	  }
	  else
	  {
			sh.setAttribute("data-tooltip","Hide in-game tick");
			sh.getElementsByTagName("i")[0].setAttribute("style","color:#EEE");
			localStorage.showtick = true;
	  }
	});
	let clear=E("a");
	clear.setAttribute("href","#");
	clear.innerText="Clear Console";
	clear.addEventListener("click", function() {
		locatehrefJS("/js/resources/Modding/3.js")
	});
	consl.appendChild(regc);
	consl.appendChild(space1);
	consl.appendChild(sh);
	consl.appendChild(space);
	consl.appendChild(clear);
	consl.appendChild(bar.firstChild.cloneNode(true));
	consl.appendChild(help);
	let hconsl= E("a"),heditor=E("a");
	hconsl.setAttribute("data-tooltip","Hide Console panel");
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
	function setoption(element)
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
		locatehrefJS("/js/resources/Modding/1.js");
	});
	locatehrefJS("/js/resources/Modding/2.js");
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
	document.getElementsByClassName("modalbody")[0].addEventListener('DOMSubtreeModified', change=function() {
    this.removeEventListener("DOMSubtreeModified",change);
    switch (document.getElementsByClassName("modaltitle")[0].innerText) {
      case "":
				let title=document.getElementsByClassName("modaltitle")[0];
				if (this.innerHTML)
				{
					if (document.getElementsByClassName("alphacentauri")[0]) title.innerText="Alpha Wars events";
					else if (this.innerHTML.indexOf("insert your room link")==-1)
					{
						title.innerText="Your custom game";
						setTimeout(function() {
		          document.getElementsByClassName("textcentered")[1].innerHTML+='<br><button id="copylink" style="margin:0px" class="donate-btn">Copy link</button>';
							document.querySelector("#copylink").addEventListener("click", function() {
								document.getElementsByClassName("textcentered")[1].getElementsByTagName("input")[0].click();
								document.execCommand('copy');
							})
		        },500);
					}
					else title.innerText="Join a game";
				}
        break;
    }
    this.addEventListener('DOMSubtreeModified', change);
  });
	document.getElementsByClassName("choices")[0].removeChild(document.getElementsByClassName("choices")[0].lastElementChild);
}
let checkver = !0;
switch (location.host)
{
	case "starblast.io":
	{
		switch(location.pathname)
		{
			case "/shipeditor/":
				des_shipeditor();
				break;
			case "/modding.html":
				des_modding();
				checkver = !1;
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
				des_main();
				break;
			default:
				des_cmn();
		}
		break;
	}
	case "pleshkov.dev":
	{
		switch (location.pathname)
		{
			case "/starblast/":
			case "/archives/starblast/standalone.html":
				des_standalone();
				checkver = !1;
				break;
		}
		break;
	}
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
	default:
		checkver = !1;
};
checkver && locatehrefJS("/js/checkver.js",!0);
