let input;
let output;
var indent=39;
if (!localStorage.request) localStorage.setItem("request",1);
String.prototype.appendString = function(i,a)
{
  return this.substring(0,i)+a+this.substring(i,this.length);
}
function convert()
{
  output=document.getElementsByClassName("ace_layer ace_text-layer")[0].innerText;
  var lastcodeError=0;
  try {
    eval(output)
  }
  catch(e) {
    localStorage.request=0;
    auto.setAttribute("data-tooltip","AutoConvert: OFF");
    auto.getElementsByTagName("i")[0].setAttribute("style","color:grey");
    lastcodeError=1;
    let err=document.createElement("div");
    err.setAttribute("style","width:330px;position:absolute;left: 50%;margin-left: -50px;top: 10px;background-color:#09161c;text-align:center;border:5px #09161c solid;border-left:3px #D13B2E solid;border-radius:5px;animation: fadeInOut 5s");
    err.setAttribute("id","diverr");
    let ic=document.createElement("i");
    ic.setAttribute("class","fa fa-fw fa-bug");
    ic.setAttribute("style","margin-top:6px;font-size:15pt;float:left;color:#D13B2E;margin-left:3px;");
    let text=document.createElement("p");
    text.setAttribute("style","font-family:Sans-Serif;float:left;margin-top: 7px;");
    text.innerHTML="&nbsp;Cannot convert the modexport code&nbsp;&nbsp;";
    let msg=document.createElement("p");
    msg.setAttribute("style","text-align:left;font-size:12px;font-family:Sans-Serif;margin-left:31px;margin-bottom:7px");
    msg.innerHTML="&nbsp;"+e.name+": "+e.message;
    let src=document.createElement("i");
    src.setAttribute("style","float:right;font-size:12px;font-family:Sans-Serif;margin-right:42px");
    src.innerHTML="– StarblastConverter";
    let close=document.createElement("button");
    close.innerHTML="&nbsp;×&nbsp;";
    err.appendChild(ic);
    err.appendChild(text);
    err.appendChild(close);
    err.appendChild(msg);
    err.appendChild(src);
    err.appendChild(document.createElement("br"));
    if (document.getElementsByTagName("style")[2].innerHTML.indexOf("button")==-1) document.getElementsByTagName("style")[2].innerHTML+="button{cursor:pointer;background-color:#09161c;font-size:20pt;border:0px;color:#f0f0f0}button:hover{background: linear-gradient(135deg,#303437 0,#303437 100%)}button:active{outline:none}@keyframes fadeInOut{0%{opacity:0}5%{opacity:1}95%{opacity:1}100%{opacity:0}";
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
  }
  if (lastcodeError!=1) {
    sessionStorage.setItem("output",output.replace(/"(\w+)":/g,"$1:").replace(/[^']+'(.+)'/g,"model=$1").replace(/,typespec:{.+[^}]}/g,""));
    locatehrefJS("/js/resources/ShipEditor/3.js");
  }
  else lastcodeError=0;
}
let auto=document.createElement("a");
auto.setAttribute("href","#");
auto.setAttribute("id","auto");
auto.innerHTML='<i class="fa fa-fw fa-refresh" style="color:#EEE"></i>';
if (localStorage.request==1)
{
  auto.setAttribute("data-tooltip","AutoConvert: ON");
  auto.getElementsByTagName("i")[0].setAttribute("style","color:#EEE");
}
else
{
  auto.setAttribute("data-tooltip","AutoConvert: OFF");
  auto.getElementsByTagName("i")[0].setAttribute("style","color:grey");
}
document.getElementsByClassName("iconsbar editoriconsbar")[0].appendChild(auto);
auto.onmouseover=function() {
  this.getElementsByTagName("i")[0].setAttribute("class","fa fa-fw fa-spin fa-refresh")
}
auto.onmouseout=function() {
  this.getElementsByTagName("i")[0].setAttribute("class","fa fa-fw fa-refresh")
}
auto.addEventListener('click', function()
{
  localStorage.request=1-localStorage.request;
  if (localStorage.request==1)
  {
    auto.setAttribute("data-tooltip","AutoConvert: ON");
    auto.getElementsByTagName("i")[0].setAttribute("style","color:#EEE");
  }
  else
  {
    auto.setAttribute("data-tooltip","AutoConvert: OFF");
    auto.getElementsByTagName("i")[0].setAttribute("style","color:grey");
  }
});
document.getElementById("editor").addEventListener('DOMSubtreeModified', detect=function()
{
  //this.removeEventListener('DOMSubtreeModified',detect);
  if (document.getElementsByClassName("ace_layer ace_text-layer")[0].innerText.indexOf("var ",0) == 0 && localStorage.request==1) convert();
  //this.addEventListener('DOMSubtreeModified',detect);
});
