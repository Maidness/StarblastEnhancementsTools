document.getElementsByTagName("style")[2].innerHTML+="button{cursor:pointer;background-color:#09161c;font-size:20pt;border:0px;color:#f0f0f0}button:hover{background: linear-gradient(135deg,#303437 0,#303437 100%)}button:active{outline:none}@keyframes fadeInOut{0%{opacity:0}5%{opacity:1}95%{opacity:1}100%{opacity:0}";
let a=document.createElement("script");
a.src="https://cdn.jsdelivr.net/gh/Bhpsngum/utilitiesNstuffs@master/getProperVariableName/JS/getProperVariableName.js";
a.type="text/javascript";
document.head.appendChild(a);
Compiler.getModCode = function(src){var code=CoffeeScript.compile(src),shipdata=eval(code);shipdata.typespec=Compiler.compileShip(shipdata);var name=((shipdata.name||"unknown")+"_"+(shipdata.typespec.code||"000")).getProperJSVariableName("strict",!0);return"var "+name+" = '"+JSON.stringify(shipdata).replace(/\\/g,"\\\\").replace(/(\')/g,"\\'")+"';"};
ShipEditor.prototype.modExport = function(){var code,name,shipdata,src;return src=this.editor.getValue(),code=CoffeeScript.compile(src),shipdata=eval(code),null!=shipdata&&(Compiler.getModCode(src))};
showErrorBox = function(icon,title,content,source)
{
  let colors={"bug":"#D13B2E","exclamation-triangle":"#FFFF33"};
	let err=document.createElement("div");
	err.setAttribute("id","diverr");
	let ic=document.createElement("i");
	ic.setAttribute("class","fa fa-fw fa-"+icon);
	ic.setAttribute("style","font-size:15pt;color:"+colors[icon]+";position:absolute;left:7px;top:7px");
	let text=document.createElement("p");
	text.setAttribute("style","margin-left:40px;font-family:Sans-Serif;float:left;margin-right:42px");
	text.innerHTML=title||"";
	let msg=document.createElement("p");
	msg.setAttribute("style","float:left;font-size:12px;font-family:Sans-Serif;margin-left:40px;margin-bottom:7px;margin-right:42px");
	msg.innerHTML=content||"";
	let src=document.createElement("i");
	src.setAttribute("style","float:right;font-size:12px;font-family:Sans-Serif;margin-right:42px;margin-left:40px;margin-top:15px;");
	src.innerHTML=source||"";
	let close=document.createElement("button");
  close.setAttribute("style","position:absolute;right:7px;top:7px");
	close.innerHTML="&nbsp;×&nbsp;";
  err.setAttribute("style","width:"+(Math.max(title.length*8,content*6,source*6)+82).toString()+"px;position:fixed;left: 50%;top:20px;background-color:#09161c;border:5px #09161c solid;border-left:3px "+colors[icon]+" solid;border-radius:5px;animation: fadeInOut 5s");
	err.appendChild(ic);
	err.appendChild(text);
  err.appendChild(document.createElement("br"));
	err.appendChild(msg);
  err.appendChild(document.createElement("br"));
	err.appendChild(src);
  err.appendChild(close);
	document.body.appendChild(err);
	setTimeout(function() {
		try {
			document.body.removeChild(err);
		}
		catch(e){}
	},5000);
	close.addEventListener("click",function() {
		document.body.removeChild(err);
	})
};
