var src=ace.edit("editor").getValue();
try {
  var s=Compiler.compileShip(eval(CoffeeScript.compile(src)));
}
catch(e) {
  sessionStorage.removeItem("modexport");
  let err=document.createElement("div");
  err.setAttribute("style","width:320px;position:absolute;left: 50%;margin-left: -50px;top: 10px;background-color:#09161c;text-align:center;border:5px #09161c solid;border-left:3px #FFFF33 solid;border-radius:5px;animation: fadeInOut 2s");
  err.setAttribute("id","diverr");
  let ic=document.createElement("i");
  ic.setAttribute("class","fa fa-fw fa-exclamation-triangle");
  ic.setAttribute("style","margin-top:6px;font-size:15pt;float:left;color:#FFFF33;margin-left:3px;");
  let text=document.createElement("p");
  text.setAttribute("style","font-family:Sans-Serif;float:left;margin-top: 7px;");
  text.innerHTML="&nbsp;Failed processing the Ship Code&nbsp;&nbsp;";
  let close=document.createElement("button");
  close.innerHTML="&nbsp;×&nbsp;";
  err.appendChild(ic);
  err.appendChild(text);
  err.appendChild(close);
  err.appendChild(document.createElement("br"));
  if (document.getElementsByTagName("style")[2].innerHTML.indexOf("button")==-1) document.getElementsByTagName("style")[2].innerHTML+="button{cursor:pointer;background-color:#09161c;font-size:20pt;border:0px;color:#f0f0f0}button:hover{background: linear-gradient(135deg,#303437 0,#303437 100%)}button:active{outline:none}@keyframes fadeInOut{0%{opacity:0}5%{opacity:1}95%{opacity:1}100%{opacity:0}";
  document.body.appendChild(err);
  setTimeout(function() {
    try {
      document.body.removeChild(err);
    }
    catch(e){}
  },2000);
  close.addEventListener("click",function() {
    document.body.removeChild(err);
  })
}
