document.getElementsByTagName("style")[2].innerHTML+="button{cursor:pointer;background-color:#09161c;font-size:20pt;border:0px;color:#f0f0f0}button:hover{background: linear-gradient(135deg,#303437 0,#303437 100%)}button:active{outline:none}@keyframes fadeInOut{0%{opacity:0}5%{opacity:1}95%{opacity:1}100%{opacity:0}";
String.prototype.getProperJSVariableName=function(mode){let declare=["var","let"];CustomError=function(e,r){var t=new Error(r);return t.name=e,t};let inp=""==this?"_":this.replace(/^(\d)/g,"_$1").replace(/(=|\n|\r|\s|;)/g,"_"),s;switch(mode||""){case"":s="";break;case"strict":s="'use strict';";break;default:throw new CustomError("ModeError","Invalid javascript mode '"+mode+"'")}try{for(let i of declare)eval(s+i+" "+inp)}catch(e){let err=0;try{for(let i of declare)eval(s+i+" _"+inp)}catch(er){err=1;for(let i=0;i<inp.length;i++){let reserved=0,illegalchar=0,errors=0;try{for(let index of declare)eval(s+index+" "+inp.substring(0,i+1))}catch(e){reserved=1,illegalchar=1,errors=1}try{for(let index of declare)eval(s+index+" "+inp[i])}catch(e){reserved=0}!reserved&&errors&&illegalchar&&(inp=inp.substring(0,i)+"_"+inp.substring(i+1,inp.length))}}0==err&&(inp="_"+inp)}return inp};
Compiler.getModCode = function(src){var code=CoffeeScript.compile(src),shipdata=eval(code);shipdata.typespec=Compiler.compileShip(shipdata);var name=((shipdata.name||"unknown")+"_"+(shipdata.typespec.code||"000")).getProperJSVariableName("strict");return"var "+name+" = '"+JSON.stringify(shipdata).replace(/\\/g,"\\\\").replace(/(\')/g,"\\'")+"';"};
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
	},500000);
	close.addEventListener("click",function() {
		document.body.removeChild(err);
	})
};
