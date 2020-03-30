function disable()
{
  localStorage.request=0;
  auto.setAttribute("data-tooltip","AutoConvert: OFF");
  auto.getElementsByTagName("i")[0].setAttribute("style","color:grey");
}
let input;
let output;
var indent=39;
if (!localStorage.request) localStorage.setItem("request",1);
function convert()
{
  output=ace.edit("editor").getValue();
  var lastcodeError=0;
  try {
    eval(output)
  }
  catch(e) {
    disable();
    lastcodeError=1;
    showErrorBox("bug","Cannot convert the modexport code",e.name+": "+e.message,"– StarblastConverter");
  }
  if (!lastcodeError) {
    let lastError=0;
    try
    {
      eval("ship= function(){let ship=["+output.replace(/(^var|^let)/,"").replace(/;$/,"")+"];return ship[0]}");
    }
    catch(e)
    {
      lastError=1;
      disable();
      showErrorBox("exclamation-triangle","Sorry, we can't convert your modExport code :(","Please check your code and try again");
    }
    if (!lastError)
    {
      let cship=JSON.parse(ship());
      delete cship.typespec;
      ace.edit("editor").setValue("return "+js2coffee.build("model="+JSON.stringify(cship)).code.replace(/\n(\s+)'([^']+)':/g,"\n$1$2:").replace(/\[[^\]]+\]/g,function(v) {
        return v.replace(/\n/g,"").replace(/\s+/g,",").replace(/,\]/g,"]").replace(/\[,/g,"[");
      }));
    }
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
};
document.getElementsByClassName("iconsbar editoriconsbar")[0].appendChild(auto);
auto.onmouseover=function() {
  this.getElementsByTagName("i")[0].setAttribute("class","fa fa-fw fa-spin fa-refresh")
};
auto.onmouseout=function() {
  this.getElementsByTagName("i")[0].setAttribute("class","fa fa-fw fa-refresh")
};
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
document.querySelector("#editor").addEventListener('DOMSubtreeModified', detect=function()
{
  if (ace.edit("editor").getValue().indexOf("var ",0) == 0 && localStorage.request==1) convert();
});
