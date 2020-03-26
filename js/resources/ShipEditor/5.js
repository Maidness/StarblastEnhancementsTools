document.getElementsByTagName("style")[2].innerHTML+="button{cursor:pointer;background-color:#09161c;font-size:20pt;border:0px;color:#f0f0f0}button:hover{background: linear-gradient(135deg,#303437 0,#303437 100%)}button:active{outline:none}@keyframes fadeInOut{0%{opacity:0}5%{opacity:1}95%{opacity:1}100%{opacity:0}";
String.prototype.getProperJSVariableName=function(mode){let declare=["var","let"];CustomError=function(e,r){var t=new Error(r);return t.name=e,t};let inp=""==this?"_":this.replace(/^(\d)/g,"_$1").replace(/(=|\n|\r|\s|;)/g,"_"),s;switch(mode||""){case"":s="";break;case"strict":s="'use strict';";break;default:throw new CustomError("ModeError","Invalid javascript mode '"+mode+"'")}try{for(let i of declare)eval(s+i+" "+inp)}catch(e){let err=0;try{for(let i of declare)eval(s+i+" _"+inp)}catch(er){err=1;for(let i=0;i<inp.length;i++){let reserved=0,illegalchar=0,errors=0;try{for(let index of declare)eval(s+index+" "+inp.substring(0,i+1))}catch(e){reserved=1,illegalchar=1,errors=1}try{for(let index of declare)eval(s+index+" "+inp[i])}catch(e){reserved=0}!reserved&&errors&&illegalchar&&(inp=inp.substring(0,i)+"_"+inp.substring(i+1,inp.length))}}0==err&&(inp="_"+inp)}return inp};
Compiler.getModCode = function(src){var code=CoffeeScript.compile(src),shipdata=eval(code);shipdata.typespec=Compiler.compileShip(shipdata);var name=(shipdata.name||"unknown"+"_"+shipdata.typespec.code).getProperJSVariableName("strict");return"var "+name+" = '"+JSON.stringify(shipdata).replace(/\\/g,"\\\\").replace(/(\')/g,"\\'")+"';"};
ShipEditor.prototype.modExport = function(){var code,name,shipdata,src;return src=this.editor.getValue(),code=CoffeeScript.compile(src),shipdata=eval(code),null!=shipdata&&(Compiler.getModCode(src))};
showErrorBox = function(icon,title,content,source)
{
  let colors={"bug":"#D13B2E","exclamation-triangle":"#FFFF33"};
	let err=document.createElement("div");
	err.setAttribute("style","width:400px;position:absolute;left: 50%;margin-left: -50px;top: 10px;background-color:#09161c;text-align:center;border:5px #09161c solid;border-left:3px "+colors[icon]+" solid;border-radius:5px;animation: fadeInOut 5s");
	err.setAttribute("id","diverr");
	let ic=document.createElement("i");
	ic.setAttribute("class","fa fa-fw fa-"+icon);
	ic.setAttribute("style","margin-top:6px;font-size:15pt;float:left;color:"+colors[icon]+";margin-left:3px;");
	let text=document.createElement("p");
	text.setAttribute("style","font-family:Sans-Serif;float:left;margin-top: 7px;");
	text.innerHTML=title||"";
	let msg=document.createElement("p");
	msg.setAttribute("style","text-align:left;font-size:12px;font-family:Sans-Serif;margin-left:31px;margin-bottom:7px");
	msg.innerHTML=content||"";
	let src=document.createElement("i");
	src.setAttribute("style","float:right;font-size:12px;font-family:Sans-Serif;margin-right:42px");
	src.innerHTML=source||"";
	let close=document.createElement("button");
	close.innerHTML="&nbsp;×&nbsp;";
	err.appendChild(ic);
	err.appendChild(text);
	err.appendChild(close);
	err.appendChild(msg);
	err.appendChild(src);
	err.appendChild(document.createElement("br"));
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
