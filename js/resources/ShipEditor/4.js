(function(){
  var src=ace.edit("editor").getValue(), lasterr = 0, s;
  try {
    s=Compiler.compileShip(eval(CoffeeScript.compile(src)));
  }
  catch(e) {
    lasterr = 1;
    showErrorBox("exclamation-triangle","Failed processing the Ship Code");
  }
  if (!lasterr && !s) showErrorBox("exclamation-triangle","Failed processing the Ship Code");
})();
