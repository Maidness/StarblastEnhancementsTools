(function(){
  var command=document.querySelector("#runstopmod").getAttribute("cmd");
  $('#terminal').terminal().exec(command,true);
})();
