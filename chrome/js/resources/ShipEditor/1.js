var src=ace.edit("editor").getValue();
var lastcodeError=0;
try {
  eval(CoffeeScript.compile(src));
}
catch(e) {
  lastcodeError=1;
  let err=document.createElement("div");
  err.setAttribute("style","width:300px;position:absolute;left: 50%;margin-left: -50px;top: 10px;background-color:#09161c;text-align:center;border:5px #09161c solid;border-left:3px #FFFF33 solid;border-radius:5px;animation: fadeInOut 2s");
  err.setAttribute("id","diverr");
  let ic=document.createElement("i");
  ic.setAttribute("class","fa fa-fw fa-exclamation-triangle");
  ic.setAttribute("style","margin-top:6px;font-size:15pt;float:left;color:#FFFF33;margin-left:3px;");
  let text=document.createElement("p");
  text.setAttribute("style","font-family:Sans-Serif;float:left;margin-top: 7px;");
  text.innerHTML="&nbsp;Cannot process the Mod Code&nbsp;&nbsp;";
  let close=document.createElement("button");
  close.setAttribute("style","background-color:#09161c;font-size:20pt;border:0px;color:#f0f0f0");
  close.innerHTML="&nbsp;×&nbsp;";
  err.appendChild(ic);
  err.appendChild(text);
  err.appendChild(close);
  err.appendChild(document.createElement("br"));
  if (document.getElementsByTagName("style")[2].innerHTML.indexOf("button")==-1) document.getElementsByTagName("style")[2].innerHTML+="button:hover{background: linear-gradient(135deg,#303437 0,#303437 100%)}button:active{outline:none}@keyframes fadeInOut{0%{opacity:0}5%{opacity:1}95%{opacity:1}100%{opacity:0}";
  document.body.appendChild(err);
  setTimeout(function() {
    try {
      eval(document.body.removeChild(err));
    }
    catch(e){}
  },2000);
  close.addEventListener("click",function() {
    document.body.removeChild(err);
  })
}
if (lastcodeError==0)
{
  var code=CoffeeScript.compile(src);
  var shipdata=eval(code);
  shipdata.typespec=Compiler.compileShip(shipdata);
  var name=shipdata.name+"_"+shipdata.typespec.code;
  name=name.replace(/(\\s|-)/g,"_");
  sessionStorage.setItem("modexport","var "+name+" = '"+JSON.stringify(shipdata)+"';");
}
else lastcodeError=0;
void 0;
