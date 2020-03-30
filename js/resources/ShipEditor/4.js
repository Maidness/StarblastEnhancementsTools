var src=ace.edit("editor").getValue();
try {
  var s=Compiler.compileShip(eval(CoffeeScript.compile(src)));
}
catch(e) {
  sessionStorage.removeItem("modexport");
  showErrorBox("exclamation-triangle","Failed processing the Ship Code");
}
