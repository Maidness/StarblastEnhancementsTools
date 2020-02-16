var code="return "+js2coffee.build(sessionStorage.output).code.replace(/\[[^\]]+\]/g,function(v) {
  return v.replace(/\n/g,"").replace(/\s+/g,",").replace(/,\]/g,"]").replace(/\[,/g,"[");
});
ace.edit("editor").setValue(code);
