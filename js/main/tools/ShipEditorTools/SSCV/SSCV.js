(function(){
  function disable()
  {
    localStorage.request=0;
    auto.setAttribute("data-tooltip","AutoConvert: OFF");
    auto.getElementsByTagName("i")[0].setAttribute("style","color:grey");
  }
  let input;
  let output;
  if (!localStorage.request) localStorage.setItem("request",1);
  function convert(output)
  {
    var lastcodeError=0;
    try {
      eval(output)
    }
    catch(e) {
      disable();
      lastcodeError=1;
      showErrorBox("bug","Cannot convert the modexport code",e.name+": "+e.message,"– S.S.C.V");
    }
    if (!lastcodeError) {
      try
      {
        output = output.trim();
        let ship = Function("return "+output.replace(/[^]+?[^\\]'((return)*([^]+?[^\\]))'[^]+/,"'$3'"))(), result;
        try {
          ship = JSON.parse(ship);
          delete ship.typespec;
          result = "return "+js2coffee.build("model="+JSON.stringify(ship)).code;
        }
        catch(e) {
          result = js2coffee.build(ship.replace(/(}\)\.call\(this\);*$)/,";x$1")).code.replace(/^\(\-\>\n*/,"").replace(/\n*\s*x\n*\s*return\n*\s*\)\.call\sthis\n*$/,"").replace(/\n*\s*\w+\s*=\s*undefined/g,"").replace(/(\n\s+)/g,function(v){return v.slice(0,v.length-2)}).replace(/_this\s*=\s*this/,"").trim().replace(/\(\n\s+/g,"(").replace(/\n\s+\)/g,")")
        }
        ace.edit("editor").setValue(result.replace(/\n+\s+(?=[^[\]]*\])/g, ",").replace(/\[,/g, "[").replace(/,\]/g, "]").replace(/'(\w+)':/g, "$1:"));
      }
      catch(e)
      {
        console.log(e);
        disable();
        showErrorBox("exclamation-triangle","Sorry, we can't convert your modExport code :(","Please check your code and try again");
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
  let bar = document.getElementsByClassName("iconsbar editoriconsbar")[0], x = bar.childNodes[bar.childNodes.length-2];
  bar.insertBefore(auto,x);
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
    let data=ace.edit("editor").getValue(),c=false;
    try{eval(data);c = true}catch(e){};
    if (c && localStorage.request==1) convert(data);
  });
})();
