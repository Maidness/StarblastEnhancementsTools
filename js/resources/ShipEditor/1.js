(function(){
  function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
  }
  var src=ace.edit("editor").getValue(),s;
  var lastcodeError=0;
  try {
    s=Compiler.compileShip(eval(CoffeeScript.compile(src)));
  }
  catch(e) {
    lastcodeError=1;
    showErrorBox("exclamation-triangle","Failed processing the Ship Code");
  }
  if (lastcodeError==0)
  {
    if (!s) showErrorBox("exclamation-triangle","Failed processing the Ship Code");
    else {
      copyToClipboard(Compiler.getModCode(src));
      document.querySelector("#modcopy").setAttribute("data-tooltip","Copied!");
      setTimeout(function(){document.querySelector("#modcopy").setAttribute("data-tooltip","Copy ModExport Code")},500);
    }
  }
  else lastcodeError=0;
})();
