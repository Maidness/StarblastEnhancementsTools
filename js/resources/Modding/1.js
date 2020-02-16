var command=document.getElementById("runstopmod").getAttribute("cmd");
$('#terminal').terminal().exec(command,true);
